#!/bin/bash
# Restarts Spotify with the debugging port and rendering flags the QA scripts need, then waits for the theme.
# Works for Vantagraph and Vantagraph Custom. Close the port afterwards by restarting Spotify normally.
cd "$(dirname "$0")"
powershell -NoProfile -Command "Stop-Process -Name Spotify -Force -ErrorAction SilentlyContinue; Start-Sleep 2; Start-Process (Join-Path \$env:APPDATA 'Spotify\Spotify.exe') -ArgumentList '--remote-debugging-port=9222','--disable-backgrounding-occluded-windows','--disable-renderer-backgrounding','--disable-background-timer-throttling'"
for i in $(seq 1 30); do node ev.js "!!document.querySelector('#main-view') && !!(window.VantagraphData || window.VantagraphCustomData)" 2>/dev/null | grep -q true && break; sleep 2; done; sleep 6
