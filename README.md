# Zvezdolet Frontend

## Клиентская часть сервиса по поиску видео

Доступен по адресу [https://zvezdolet.ddns.net](https://zvezdolet.ddns.net)

Стэк:

- NextJS – React-фреймворк
- Tanstack Query - библиотека для получения и кэширования данных с сервера
- Tailwind CSS - фреймворк для стилизации
- Docker - платформа для контейнеризации

Для запуска требуется создать `.env` файл:

```sh
NEXT_PUBLIC_BACKEND_URL=URL_HERE
```

Для запуска в `dev` режиме:

```sh
yarn # для установки модулей
yarn dev # для запуска
```

Поднять `production` сборку можно через Docker командой:

```sh
docker compose up -d --build
```
