# Casablanca Racing 🏁
> Игра в стиле гонки

https://casablanca-racing.herokuapp.com/

## Установка и запуск

Для работы воспользуйтесь следующими командами:

- `npm install` — установка стабильной версии,
- `npm start` — запуск версии для разработчика,
- `npm lint` — проверка ошибок линтера,
- `npm lint-fix` — исправление ошибок линтера и prettier'а,
- `npm test` - прогон тестов.

Для запуска BackEnd надо добавить файл c именем dev.env в папку backend
с параметрами :

POSTGRES_DATABASE==\********\
POSTGRES_HOST==\********\
POSTGRES_PORT==\********\
PGADMIN_DEFAULT_EMAIL==\********\
PGADMIN_DEFAULT_PASSWORD=\=\********\\
POSTGRES_USER=\********\
POSTGRES_PASSWORD=\********\
MONGO_INITDB_ROOT_USERNAME=\********\
MONGO_INITDB_ROOT_PASSWORD=\********\
ME_CONFIG_MONGODB_ADMINUSERNAME=\********\
ME_CONFIG_MONGODB_ADMINPASSWORD=\********\
BASE_MONGODB=mongodb://<Login>:<Password>@<address>:<port>/<db_name>?authSource=admin

## Игра

### Описание
Игра представляет собой гонки с препятствиями. Цель игры пройти наибольшее количество уровней, управляя автомобилем 🚙 с помощью стрелок на клавиатуре и объезжаю встречные автомобили 🚗. С каждым новым уровнем скорость движения автомобиля увеличивается.

### Управление
Движения вверх/вправо/влево/вниз - с помощью стрелок клавиатуры, пауза с помощью кнопки `Esc`.

## Проект

В проекте ипользовались следующие технологии (библиотеки):
- React
- Redux
- TypeScript
- Canvas
- PostCSS
- Webpack
- Docker
- ESLint
- Prettier
- Jest
- Service Worker
- Fullscreen API
