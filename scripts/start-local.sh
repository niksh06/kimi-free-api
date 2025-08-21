#!/bin/bash

# Скрипт для запуска KIMI Free API в локальном режиме

echo "🚀 Запуск KIMI Free API в локальном режиме..."

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Установите Node.js для продолжения."
    exit 1
fi

# Проверяем наличие yarn
if ! command -v yarn &> /dev/null; then
    echo "⚠️  Yarn не найден, используем npm..."
    PACKAGE_MANAGER="npm"
else
    PACKAGE_MANAGER="yarn"
fi

echo "📦 Установка зависимостей..."
$PACKAGE_MANAGER install

echo "🔨 Сборка проекта..."
$PACKAGE_MANAGER run build

echo "🌍 Запуск сервера на localhost:8000..."
echo "📱 API будет доступен по адресу: http://localhost:8000"
echo "🔑 Для тестирования используйте endpoint: http://localhost:8000/v1/chat/completions"
echo ""
echo "Для остановки сервера нажмите Ctrl+C"
echo ""

# Запускаем сервер в локальном режиме
SERVER_ENV=local SERVER_HOST=127.0.0.1 SERVER_PORT=8000 $PACKAGE_MANAGER start