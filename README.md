# 🚀 ITStorm — демонстрационный проект. Агентство вымышленное, все данные используются для демонстрации функционала.


**ITStorm (АйтиШторм)** — это демонстрационное веб-приложение.  
Проект представляет собой сайт вымышленного digital-агентства, предоставляющего услуги в сфере:
- продвижения в сети,
- создания сайтов и брендов,
- копирайтинга и маркетинга,
- разработки визуальной концепции и инфопродуктов.

Бэкенд и база данных (Node.js + MongoDB) были готовы изначально.  
Моя задача состояла в **разработке фронтенд-части** на **Angular**  
и **интеграции с уже существующей базой данных MongoDB** через API.

---

## 🧰 Используемые технологии

### 🖥 Frontend
- **Angular 14**
- **Angular Material**
- **RxJS 7.5**
- **NgxMask** — маска ввода для телефона  
- **Owl Carousel** — готовый слайдер  
- **Angular Animations** — кастомная анимация слайдера  
- **Lazy Loading** — ленивая загрузка модулей  
- **Angular Material Snackbar** — всплывающие уведомления  
---

## ⚙️ Установка и запуск

### 🔧 1. Клонировать репозиторий
```bash
git clone https://github.com/BazhenovDev/ITStorm.git
cd ITStorm
```

### 📦 2. Установить зависимости и применить миграции

```bash
# Установка зависимостей backend
cd backend
npm install

# Применяем готовые миграции MongoDB
migrate-mongo up

# Установка зависимостей frontend
cd ../frontend
npm install
```

### 🚀 3. Запуск проекта
```bash
# Backend:
cd ../backend
npm start
# Сервер будет доступен на http://localhost:3000

# Frontend:
cd ../frontend
ng serve -o
# После сборки проект автоматически откроется в браузере.
```

## 💬 Основной функционал фронтенда
### 🏠 Главная страница
- Кастомный слайдер с анимацией через Angular Animations
- Owl Carousel для слайдера с отзывами
- Модальные окна для заявки на услуги и консультации
- Карточки с описанием услуг

### 📰 Каталог статей
- Фильтрация по типу статей
- Пагинация
- Просмотр отдельной статьи
- Для авторизованных пользователей: возможность комментировать, ставить лайки/дизлайки и жалобы на комментарии
- Для гостей: только чтение статей и комментариев

### 💾 Работа с базой данных
- Фронтенд интегрирован с MongoDB через готовый backend API
- Используются готовые миграции MongoDB (`migrate-mongo up`)
- Для демонстрации используется фиктивная база данных

### 🔐 Авторизация
- Регистрация и вход пользователей
- Хранение токена `x-auth` в localStorage
- Интерсептор для обновления токена при истечении срока действия

### 🌍 Дополнительные возможности
- Snackbar уведомления (Angular Material)
- ngx-mask для маски номера телефона

## 📁 Структура проекта

```text
itstorm/
│
├── backend/                # Готовая серверная часть (Node.js, Express, MongoDB)
│   ├─ migrations/         
│   ├─ public/              
│   ├─ src/                 
│   ├─ app.js               
│   └─ migrate-mongo.config.js
│
├── frontend/src/           # Разработанная мной часть (Angular)
│   ├─ app/
│   │ ├─ core/ 
│   │ │   └─ auth/          # Логика авторизации, сервисы и компоненты аутентификации 
│   │ ├─ shared/ 
│   │ │   ├─ card-info/     # Компонент карточки статьи/услуги 
│   │ │   ├─ comment/       # Компонент комментариев 
│   │ │   ├─ layout/        # Layout приложения (шапка, футер, контейнеры)
│   │ │   ├─ modal/         # Компоненты с модальными окнами 
│   │ │   ├─ pipes/         # Кастомные пайпы 
│   │ │   ├─ services/      # Сервисы приложения 
│   │ │   ├─ sliders/       # Компоненты слайдеров 
│   │ │   ├─ utils/         # Утилиты приложения
│   │ │   └─ shared.module.ts # Модуль shared для импорта общих компонентов 
│   │ ├─ views/ 
│   │ │   ├─ articles/      # Модуль статей (страницы со статьями, отдельная статья)
│   │ │   ├─ main/          # Компонент главной страницы 
│   │ │   └─ user/          # Модуль авторизации
│   │ ├─ app.component.html
│   │ ├─ app.component.ts
│   │ ├─ app.component.scss
│   │ ├─ app.module.ts
│   │ └─ app-routing.module.ts
│
│   ├─ assets/              # Общие стили, шрифты, картинки
│   ├─ constants/           # Постоянные значения, константы приложения
│   ├─ environments/        # Конфигурации окружений (dev, prod) 
│   └─ types/               # Определения типов данных и интерфейсы

```

## 📸 Скриншоты приложения

<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/1.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/2.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/3.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/4.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/5.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/6.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/7.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/8.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/9.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/10.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/11.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/12.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/13.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/14.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/15.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/16.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/17.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/18.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/19.png">
<img width="1470" alt="" src="https://github.com/BazhenovDev/ITStorm/blob/main/frontend/src/assets/screenshots/20.png">
