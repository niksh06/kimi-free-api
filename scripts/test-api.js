#!/usr/bin/env node

/**
 * Простой тест API для KIMI Free API
 * Запуск: node scripts/test-api.js
 */

const http = require('http');

const API_BASE = 'http://localhost:8000';

// Тест 1: Проверка доступности сервера
async function testServerHealth() {
    console.log('🔍 Тест 1: Проверка доступности сервера...');
    
    try {
        const response = await makeRequest('GET', '/');
        if (response.statusCode === 200) {
            console.log('✅ Сервер доступен');
            return true;
        } else {
            console.log(`❌ Сервер недоступен. Статус: ${response.statusCode}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Ошибка подключения: ${error.message}`);
        return false;
    }
}

// Тест 2: Проверка endpoint'а моделей
async function testModelsEndpoint() {
    console.log('\n🔍 Тест 2: Проверка endpoint\'а моделей...');
    
    try {
        const response = await makeRequest('GET', '/models');
        if (response.statusCode === 200) {
            console.log('✅ Endpoint моделей работает');
            try {
                const data = JSON.parse(response.data);
                console.log(`📋 Доступно моделей: ${data.data?.length || 0}`);
            } catch (e) {
                console.log('⚠️  Не удалось распарсить ответ');
            }
            return true;
        } else {
            console.log(`❌ Endpoint моделей не работает. Статус: ${response.statusCode}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Ошибка: ${error.message}`);
        return false;
    }
}

// Тест 3: Проверка endpoint'а чата (без токена)
async function testChatEndpoint() {
    console.log('\n🔍 Тест 3: Проверка endpoint\'а чата...');
    
    try {
        const response = await makeRequest('POST', '/v1/chat/completions', {
            model: 'kimi',
            messages: [{ role: 'user', content: 'test' }]
        });
        
        if (response.statusCode === 401) {
            console.log('✅ Endpoint чата работает (ожидаемая ошибка аутентификации)');
            return true;
        } else {
            console.log(`⚠️  Неожиданный статус: ${response.statusCode}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Ошибка: ${error.message}`);
        return false;
    }
}

// Вспомогательная функция для HTTP запросов
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 8000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (data) {
            const postData = JSON.stringify(data);
            options.headers['Content-Length'] = Buffer.byteLength(postData);
        }

        const req = http.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: responseData
                });
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// Основная функция тестирования
async function runTests() {
    console.log('🚀 Запуск тестов KIMI Free API...\n');
    
    const tests = [
        testServerHealth,
        testModelsEndpoint,
        testChatEndpoint
    ];
    
    let passed = 0;
    let total = tests.length;
    
    for (const test of tests) {
        try {
            const result = await test();
            if (result) passed++;
        } catch (error) {
            console.log(`❌ Тест упал с ошибкой: ${error.message}`);
        }
    }
    
    console.log(`\n📊 Результаты тестирования:`);
    console.log(`✅ Пройдено: ${passed}/${total}`);
    console.log(`❌ Провалено: ${total - passed}/${total}`);
    
    if (passed === total) {
        console.log('\n🎉 Все тесты пройдены! API работает корректно.');
    } else {
        console.log('\n⚠️  Некоторые тесты провалены. Проверьте логи сервера.');
    }
}

// Запуск тестов
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { runTests };