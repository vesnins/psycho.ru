# Бэкенд проекта
Содержит:
- модуль роутинга [routing.js](routing.js);
- модуль работы с письмами [mail.js](mail.js);
- модуль выставления 301 для "старых" страниц [seoRedirector](seoRedirector);
- папку [models](models) с модулем БД и моделями её таблиц;
- папку [urls](urls) содержащую постраничную структуру сайта.

## Логика
Любой запрос попадает сначала в `seoRedirector`, а затем в `routing`.  
При наличии обработчика запроса производится его исполнение.  
Если модуль-обработчик не найден, производится вызов `next`, возврат в `main.js` и далее (в общем случае) обработка заканчивается на 404.