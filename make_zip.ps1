$destination = Join-Path -Path $PSScriptRoot -ChildPath "..\nool-credit.zip"
Write-Host "Creating zip package at: $destination (excluding node_modules)" -ForegroundColor Cyan

# Remove old zip if exists
if (Test-Path $destination) { Remove-Item $destination -Force }

# Get items to zip, explicitly excluding node_modules, .git, target etc
$items = Get-ChildItem -Path $PSScriptRoot -Exclude "node_modules", ".git", ".vscode", "target", "backend" | Where-Object { $_.Name -ne "node_modules" }

Compress-Archive -Path $items.FullName -DestinationPath $destination -Force
Write-Host "✅ Project successfully packaged into nool-credit.zip! You can submit this file." -ForegroundColor Green
