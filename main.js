let express = require("express"),
  ect = require("ect"); // шаблонизатор

let app = express();

// статические файлы
app.use(express.static('frontend'));

app.set("views", "./backend/urls");
app.set("view engine", "ect");
let ectRenderer = ect({
  root: __dirname + "/backend/urls",
  ext : ".html"});
app.engine("html", ectRenderer.render); // подключение шаблонизатора ECT

if(app.get("env") === "development") {
  // отключение кэширования для вьюх
  ectRenderer.options.cache = false;
  // подключение livereload
  app.use(require("connect-livereload")());
}

app.use(require("./backend/routing").appRouter);  // маршрутизация

// 500
app.use((err, req, res, next) => {
  if(app.get("env") === "development") {
    res.status(500).render(err);
  }
  else {
    res.status(500).render("500.html");
  }
});
// 404
app.use((req, res, next) => { res.status(404).render("404.html"); });

app.listen(8205, function () {
});
