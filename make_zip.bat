@echo off
echo Packaging Nool Credit into zip file...

if exist "..\nool-credit.zip" del "..\nool-credit.zip"

powershell -Command "$items = Get-ChildItem -Path . -Exclude 'node_modules', '.git', '.vscode', 'target', 'backend' | Where-Object { $_.Name -ne 'node_modules' }; Compress-Archive -Path $items.FullName -DestinationPath '..\nool-credit.zip' -Force"

echo.
echo ✅ Project successfully packaged into nool-credit.zip! You can submit this file.
pause
