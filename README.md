# Zvezdolet Frontend

## Клиентская часть сервиса по поиску видео

Стэк:

- NextJS – React-фреймворк
- Tanstack Query - библиотека для получения и кэширования данных с сервера
- Tailwind CSS - фреймворк для стилизации
- Docker - платформа для контейнеризации

Для запуска требуется создать `.env` файл:

```sh
NEXT_PUBLIC_BACKEND_URL=URL_HERE
```

Поднять сервис можно через Docker командой:

```sh
docker compose up -d --build
```
