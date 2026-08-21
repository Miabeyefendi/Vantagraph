# ═══════════════════════════════════════════════════════════
#  Vantagraph - Icon Build Script
#  Reads SVG files from icons/ directory, converts to base64,
#  and injects into vantagraph-icons.js between markers.
#
#  Usage: powershell -ExecutionPolicy Bypass -File build-icons.ps1
# ═══════════════════════════════════════════════════════════

$iconsDir = Join-Path $PSScriptRoot "icons"
$targetFile = Join-Path $PSScriptRoot "Extensions\vantagraph-icons.js"
$startMarker = "// __ICON_DATA_START__"
$endMarker = "// __ICON_DATA_END__"

# 1. Collect SVG files only
$svgFiles = Get-ChildItem -Path $iconsDir -Filter "*.svg" | Sort-Object Name
$count = $svgFiles.Count

if ($count -eq 0) {
    Write-Host "[ERROR] No SVG files found in $iconsDir" -ForegroundColor Red
    exit 1
}

Write-Host "[Vantagraph] Found $count SVG files in icons/" -ForegroundColor Cyan

# 2. Build ICON_DATA entries
$entries = @()
foreach ($svg in $svgFiles) {
    $bytes = [System.IO.File]::ReadAllBytes($svg.FullName)
    $b64 = [Convert]::ToBase64String($bytes)
    $dataUri = "data:image/svg+xml;base64,$b64"
    $entries += "    `"$($svg.Name)`": `"$dataUri`""
    Write-Host "  + $($svg.Name) ($([math]::Round($svg.Length/1024, 1)) KB)" -ForegroundColor DarkGray
}

# 3. Build replacement block
$iconBlock = @()
$iconBlock += "$startMarker"
$iconBlock += "  // !! AUTO-GENERATED -- DO NOT EDIT MANUALLY !!"
$iconBlock += "  // !! Files: $count SVGs !!"
$iconBlock += "  const ICON_DATA = {"
$iconBlock += ($entries -join ",`r`n")
$iconBlock += "  };"
$iconBlock += "  $endMarker"

$newBlock = $iconBlock -join "`r`n"

# 4. Read target file and replace between markers
$content = Get-Content $targetFile -Raw

$pattern = "(?s)$([regex]::Escape($startMarker)).*?$([regex]::Escape($endMarker))"
if ($content -match $pattern) {
    $newContent = $content -replace $pattern, $newBlock
    Set-Content -Path $targetFile -Value $newContent -NoNewline
    Write-Host "`n[Vantagraph] Successfully injected $count icons into vantagraph-icons.js" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Could not find markers in $targetFile" -ForegroundColor Red
    Write-Host "  Expected: $startMarker ... $endMarker" -ForegroundColor Yellow
    exit 1
}
