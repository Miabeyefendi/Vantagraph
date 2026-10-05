# Park the Spotify window off-screen without activating it (so Chromium keeps
# rendering), and put it back exactly where it was. usage: win-park.ps1 park|restore
param([string]$mode = "park")
$ErrorActionPreference = "Stop"
$state = Join-Path $PSScriptRoot "win-placement.txt"
Add-Type @"
using System; using System.Runtime.InteropServices;
public class WP {
  [StructLayout(LayoutKind.Sequential)] public struct POINT { public int X; public int Y; }
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int L; public int T; public int R; public int B; }
  [StructLayout(LayoutKind.Sequential)] public struct PLACEMENT { public int length; public int flags; public int showCmd; public POINT minPos; public POINT maxPos; public RECT normal; }
  [DllImport("user32.dll")] public static extern bool GetWindowPlacement(IntPtr h, ref PLACEMENT p);
  [DllImport("user32.dll")] public static extern bool SetWindowPlacement(IntPtr h, ref PLACEMENT p);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr h, IntPtr after, int x, int y, int cx, int cy, uint flags);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int cmd);
}
"@
$p = Get-Process Spotify | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if (-not $p) { "no spotify window"; exit 1 }
$h = $p.MainWindowHandle
$pl = New-Object WP+PLACEMENT
$pl.length = [Runtime.InteropServices.Marshal]::SizeOf($pl)
if ($mode -eq "park") {
  [void][WP]::GetWindowPlacement($h, [ref]$pl)
  "$($pl.showCmd) $($pl.normal.L) $($pl.normal.T) $($pl.normal.R) $($pl.normal.B)" | Out-File -Encoding ascii $state
  # SW_SHOWNOACTIVATE = 4 (restore a minimized window without focusing it), then move off-screen
  [void][WP]::ShowWindow($h, 4)
  $w = [Math]::Max(1200, $pl.normal.R - $pl.normal.L); $hh = [Math]::Max(800, $pl.normal.B - $pl.normal.T)
  # SWP_NOACTIVATE 0x10 | SWP_NOZORDER 0x4
  [void][WP]::SetWindowPos($h, [IntPtr]::Zero, -6000, 0, 2562, 1394, 0x14)
  "parked (was showCmd=$($pl.showCmd) normal=$($pl.normal.L),$($pl.normal.T),$($pl.normal.R),$($pl.normal.B))"
} else {
  if (-not (Test-Path $state)) { "no saved placement"; exit 1 }
  $v = (Get-Content $state).Split(" ") | ForEach-Object { [int]$_ }
  [void][WP]::GetWindowPlacement($h, [ref]$pl)
  $pl.showCmd = $v[0]; $pl.normal.L = $v[1]; $pl.normal.T = $v[2]; $pl.normal.R = $v[3]; $pl.normal.B = $v[4]; $pl.flags = 0
  # SetWindowPlacement with showCmd 2 (minimized) would activate; use 7 (SW_SHOWMINNOACTIVE) for minimized
  if ($pl.showCmd -eq 2) { $pl.showCmd = 7 }
  [void][WP]::SetWindowPlacement($h, [ref]$pl)
  "restored to showCmd=$($pl.showCmd) normal=$($v[1]),$($v[2]),$($v[3]),$($v[4])"
}
