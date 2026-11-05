@echo off
chcp 65001 >nul
title Y8 Ashi Game Portal Launcher
echo ========================================================
echo   🕹️ Y8 ASHI GAMES - ศูนย์รวมเกมออนไลน์เล่นฟรีบนเว็บ 🕹️
echo ========================================================
echo.

if not exist "node_modules" (
  echo 📦 กำลังติดตั้งแพ็กเกจครั้งแรก...
  call npm install
)

echo 🚀 กำลังเปิดเว็บรวมเกม Y8 Ashi Portal...
start http://localhost:5173/
call npm run dev
pause

