# 🚀 Локальный запуск KIMI Free API

Этот документ описывает, как запустить KIMI Free API локально на вашем компьютере.

## 📋 Предварительные требования

- **Node.js** версии 18 или выше
- **Yarn** или **npm** для управления пакетами
- **Git** для клонирования репозитория

## 🔧 Установка

### 1. Клонирование репозитория
```bash
git clone https://github.com/LLM-Red-Team/kimi-free-api.git
cd kimi-free-api
```

### 2. Установка зависимостей
```bash
# С Yarn (рекомендуется)
yarn install

# Или с npm
npm install
```

## 🚀 Запуск

### Способ 1: Использование скриптов (рекомендуется)

#### Linux/macOS:
```bash
# Сделать скрипт исполняемым
chmod +x scripts/start-local.sh

# Запустить
./scripts/start-local.sh
```

#### Windows:
```bash
scripts\start-local.bat
```

### Способ 2: Использование npm/yarn команд

#### Сборка проекта:
```bash
yarn build
# или
npm run build
```

#### Запуск в локальном режиме:
```bash
yarn start:local
# или
npm run start:local
```

#### Режим разработки с автоперезагрузкой:
```bash
yarn dev:local
# или
npm run dev:local
```

### Способ 3: Ручной запуск с переменными окружения

```bash
# Linux/macOS
SERVER_ENV=local SERVER_HOST=127.0.0.1 SERVER_PORT=8000 yarn start

# Windows (PowerShell)
$env:SERVER_ENV="local"; $env:SERVER_HOST="127.0.0.1"; $env:SERVER_PORT="8000"; yarn start

# Windows (CMD)
set SERVER_ENV=local
set SERVER_HOST=127.0.0.1
set SERVER_PORT=8000
yarn start
```

## 🌐 Доступ к API

После успешного запуска API будет доступен по адресу:

- **Основная страница:** http://localhost:8000
- **API endpoint:** http://localhost:8000/v1/chat/completions
- **Проверка токенов:** http://localhost:8000/token/check
- **Список моделей:** http://localhost:8000/models

## 🔑 Настройка аутентификации

Для использования API вам понадобится `refresh_token` от KIMI:

1. Перейдите на [kimi.moonshot.cn](https://kimi.moonshot.cn)
2. Откройте Developer Tools (F12)
3. Перейдите в Application > Local Storage
4. Найдите `refresh_token` и скопируйте его значение

### Пример использования с curl:

```bash
curl -X POST http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_REFRESH_TOKEN" \
  -d '{
    "model": "kimi",
    "messages": [
      {
        "role": "user",
        "content": "Привет! Как дела?"
      }
    ]
  }'
```

## ⚙️ Конфигурация

### Основные настройки
Файл `configs/local/service.yml`:
```yaml
name: kimi-free-api-local
host: '127.0.0.1'
port: 8000
urlPrefix: ''
bindAddress: 'localhost:8000'
```

### Системные настройки
Файл `configs/local/system.yml`:
```yaml
requestLog: true
tmpDir: ./tmp
logDir: ./logs
logWriteInterval: 200
logFileExpires: 2626560000
publicDir: ./public
tmpFileExpires: 86400000
```

### Переменные окружения
Файл `.env.local`:
```bash
SERVER_ENV=local
SERVER_HOST=127.0.0.1
SERVER_PORT=8000
NODE_ENV=development
```

## 🔍 Логирование

Логи сохраняются в директории `logs/` с ежедневной ротацией:
- Формат: `YYYY-MM-DD.log`
- Уровни: INFO, WARN, ERROR, SUCCESS
- Включает время, уровень, источник и сообщение

## 🐛 Устранение неполадок

### Порт уже занят
```bash
# Проверить, что использует порт 8000
lsof -i :8000  # Linux/macOS
netstat -an | findstr :8000  # Windows

# Изменить порт в конфигурации
SERVER_PORT=8001 yarn start:local
```

### Ошибки сборки
```bash
# Очистить кэш и переустановить зависимости
rm -rf node_modules yarn.lock
yarn install
yarn build
```

### Проблемы с правами доступа
```bash
# Linux/macOS
sudo chmod +x scripts/start-local.sh
```

## 📱 Тестирование API

### Простой тест с помощью браузера
Откройте http://localhost:8000 в браузере - вы должны увидеть приветственную страницу.

### Тест с помощью Postman
1. Создайте новый POST запрос
2. URL: `http://localhost:8000/v1/chat/completions`
3. Headers: `Authorization: Bearer YOUR_TOKEN`
4. Body (JSON):
```json
{
  "model": "kimi",
  "messages": [
    {
      "role": "user",
      "content": "Тест API"
    }
  ]
}
```

## 🔄 Обновление

Для обновления до последней версии:
```bash
git pull origin master
yarn install
yarn build
```

## 📞 Поддержка

Если у вас возникли проблемы:
1. Проверьте логи в директории `logs/`
2. Убедитесь, что все зависимости установлены
3. Проверьте, что порт 8000 свободен
4. Создайте issue в репозитории GitHub

---

**Удачного использования! 🎉**