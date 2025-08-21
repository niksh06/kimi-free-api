@echo off
chcp 65001 >nul

echo 🚀 Запуск KIMI Free API в локальном режиме...

REM Проверяем наличие Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js не найден. Установите Node.js для продолжения.
    pause
    exit /b 1
)

REM Проверяем наличие yarn
yarn --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Yarn не найден, используем npm...
    set PACKAGE_MANAGER=npm
) else (
    set PACKAGE_MANAGER=yarn
)

echo 📦 Установка зависимостей...
%PACKAGE_MANAGER% install

echo 🔨 Сборка проекта...
%PACKAGE_MANAGER% run build

echo 🌍 Запуск сервера на localhost:8000...
echo 📱 API будет доступен по адресу: http://localhost:8000
echo 🔑 Для тестирования используйте endpoint: http://localhost:8000/v1/chat/completions
echo.
echo Для остановки сервера нажмите Ctrl+C
echo.

REM Запускаем сервер в локальном режиме
set SERVER_ENV=local
set SERVER_HOST=127.0.0.1
set SERVER_PORT=8000
%PACKAGE_MANAGER% start

pause