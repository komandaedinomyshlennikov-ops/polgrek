# UTM и сегменты входа (фаза 4)

Персонализация hero на `polgrek.site` по query-параметрам.

## Параметр `s` (рекомендуется)

| Ссылка | Сегмент | H1 / тема | Книга по умолчанию |
|--------|---------|-----------|-------------------|
| `/?s=burnout` | burnout | Выгорание, выходные не восстанавливают | RESET |
| `/?s=fog40` | fog40 | Туман / память после 40 | Мозг на 100+ |
| `/?s=stress` | stress | Стресс и тревога | Стресс и мозг |
| `/?s=energy` | energy | Усталость к обеду | Анатомия энергии |
| `/?s=money` | money | Решения вечером / импульсы | Мозг и деньги |
| `/?s=bio` | bio | Биохакинг без хайпа | Биохакинг мозга |

Синоним: `?segment=burnout`.

## UTM (для постов)

Пример:

```
https://polgrek.site/?s=burnout&utm_source=telegram&utm_medium=social&utm_campaign=reset_launch
```

Если `s` нет, сегмент угадывается из `utm_campaign` / `utm_content` (ключевые слова: `reset`, `burnout`, `stress`, `energy`, `money`, `biohack`, `fog`, `40`…).

## Что меняется на сайте

1. Eyebrow, H1, lead, hero-card  
2. Предзаполнение чек-листа  
3. Карточка Netflix «Почему…» с бейджем «Под ваш заход»  
4. Подсветка двери-проблемы  
5. Отрывок mid-page под выбранную книгу  

## Цели Метрики (JS-события)

| Идентификатор | Когда |
|---------------|--------|
| `segment_land` | Заход с ненулевым сегментом |
| `self_check` | ≥3 галочки в чек-листе |
| `problem_select` | Клик по карточке проблемы |
| `scroll_50` | Скролл ≥50% home |
| `scroll_75` | Скролл ≥75% home |

Visit params: `segment`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `lang`, `page`.
