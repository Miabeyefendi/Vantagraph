# If Spotify got minimized, show it again off-screen without activating it.
Add-Type @"
using System; using System.Runtime.InteropServices;
public class WU { [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr h); [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int n); [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr h, IntPtr a, int x, int y, int cx, int cy, uint f); }
"@
$p = Get-Process Spotify | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if ($p -and [WU]::IsIconic($p.MainWindowHandle)) { [void][WU]::ShowWindow($p.MainWindowHandle, 4); [void][WU]::SetWindowPos($p.MainWindowHandle, [IntPtr]::Zero, -6000, 0, 2562, 1394, 0x14); "unminimized" } else { "ok" }
