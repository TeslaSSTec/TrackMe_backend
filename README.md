## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Необходимые параметры для .env файла к Docker Compose

| Переменная   | Описание               | Обязательна | Ограничения  |
|--------------|------------------------|-------------|--------------|
| `PG_HOST`    | Адрес базы данных      | *           | -            |
| `PG_PORT`    | Порт для подключения   | *           | -            |
| `PG_USER`    | Имя пользователя БД    | *           | -            |
| `PG_PASS`    | Пароль пользователя БД | *           | -            |
| `PG_NAME`    | Имя базы данных        | *           | -            |
| `JWT_SECRET` | Секретный ключ JWT     | *           | 60+ символов |

## Запуск в docker

```shell
docker compose -f compose.yaml -p backend up -d --build
```

## Запуск сервера локально

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
