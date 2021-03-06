/** 
 * Роутинг url-запросов
 * @module */

/**
 * Главный парсер url-запросов
 */
exports.appRouter = (req, res, next) => {
  let rootPath = "./urls";  // папка с представлениями и логикой страниц
  // полный путь к модулю, например "о компании", будет иметь вид
  // ./urls+/about
  let modulePath = `${rootPath}${req.path}`;
  if(req.path === "/") {  // главная страница
    modulePath = `${rootPath}/index`;
  }
  else if(/^\/library/.test(req.path)) // библиотека
  {
    // все запросы, начинающеися с /library отправляем в модуль библиотеки
    modulePath = `${rootPath}/library`;
  }

  let route;  // переменная с модулем для обработки запроса
  try {
      route = require(modulePath);  // попытка загрузить модуль
  }
  catch(ex) {
    // модуль не найден, продолжим выполнение запроса без ошибки
    // потому что совсем скоро он попадет в 404
    return next();
  }

  route.render(req, res, next); // модуль найден, рендерим ответ
}