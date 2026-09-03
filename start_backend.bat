@echo off
echo ========================================================
echo  🚀 Starting Nool Credit Backend (Spring Boot 3.2)
echo ========================================================
cd /d "%~dp0backend"
call mvn spring-boot:run
pause
