@echo off
echo ========================================================
echo  🚀 Starting Nool Credit Frontend (React + Vite)
echo ========================================================
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)
echo Launching Vite Dev Server...
call npm run dev
pause
