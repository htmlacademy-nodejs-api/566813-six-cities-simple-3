# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлен актуальный LTS релиз Node.js**. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`. Затем, в терминале, перейдите в директорию с проектом и _единожды_ запустите команду:

```bash
npm install
```

Команда запустит процесс установки зависимостей проекта из **npm**.

### Сценарии

В `package.json` предопределено несколько сценариев.

#### Скомпилировать проект

```bash
npm run compile
```

Создаст директорию `dist` и скомпилирует проект.

#### Удалить скомпилированный проект

```bash
npm run clean
```

Удаляет директорию `dist`. Используется перед компиляцией.

#### Собрать проект

```bash
npm run build
```

Выполняет сборку проекта: удаляет ранее скомпилированный проект и компилирует заново.

#### Проверить линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Линтер проверяет файлы только внутри директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.

#### Запустить ts-модуль без компиляции

```bash
npm run ts -- <Путь к модулю с ts-кодом>
```

Пакет `ts-node` позволяет выполнить TS-код в Node.js без предварительной компиляции. Используется только на этапе разработки.

#### Запустить проект

```bash
npm start
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

#### Запустить проект в режиме разработки

```bash
npm run start:dev
```

Запуск проекта в режиме разработки производится без предварительной компиляции. Вывод логов производится с выделением цветом. Используется только на этапе разработки.
Хапуск производится с использованием nodemon — это утилиты командной строки, разработанная @rem. Она заключает в оболочку приложение Node, наблюдает за файловой системой и автоматически перезапускает процесс. 

#### Запустить сервер тестовых данных

```bash
npm run mock:server
```

Будет запущен сервер тестовых данных (json-server), который предоставляет данные из подготовленного файла с тестовыми данными. Порт по умолчанию 3123.


## Структура проекта

### Директория `src`

Исходный код проекта: компоненты, модули и так далее. Структура директории `src` может быть произвольной.

### Файл `Readme.md`

Инструкции по работе с учебным репозиторием.

### Файл `Contributing.md`

Советы и инструкции по внесению изменений в учебный репозиторий.

### Остальное

Все остальные файлы в проекте являются служебными. Пожалуйста, не удаляйте и не изменяйте их самовольно. Только если того требует задание или наставник.

## Запуск CLI - интерфейса коммандной строки
### Запуск приложения
```bash
npm run ts  ./src/cli.ts
```
### Узнать версию приложения
```bash
npm run ts ./src/cli.ts -- --version 
```
### Справка
```bash
npm run ts ./src/cli.ts -- --help
```
### Импорт данных из TSV-файла
```bash
npm run ts ./src/cli.ts -- --import <path> 
```
### Генерация тестовых данных и сохранение в TSV-файл
```bash
npm run ts ./src/cli.ts -- --generate <n> <path> <url> <path> 
```

## Использование REST API интерфейса приложения
Приложение предоставляет REST API интерфейс. Описание методов приведено в файле specification/specification.yml
Примеры запросов представлены в файле queries.http в корне проекта.


## Переменные окружения

PORT - порт для входящих соединений<br>
SALT - модификатор хэш-функции, необходимый для вычисления хэша пароля<br>
DB_USER - имя пользователя для доступа к базе данных<br>
DB_PASSWORD - пароль пользователя для доступа к базе данных<br>
DB_HOST - адрес хостинга базы данных<br>
DB_PORT - порт базы данных<br>
DB_NAME - название базы данных<br>
JWT_SECRET - модификатор хэш-функции, необходимый для вычисления хэша JWT-токена<br>
STATIC_DIRECTORY_PATH - имя директории для хранения статичных файлов<br>
UPLOAD_DIRECTORY - имя директории для хранения загружаемых файлов<br>
DEFAULT_USER_PASSWORD - пароль пользователя по умолчанию (используется при генерации и импорте данных)<br>

Пример файла с переменными окружения расположен в корне проекта - .env.example

