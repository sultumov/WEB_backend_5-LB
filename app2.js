const express = require("express");
const hbs = require("hbs");
const app = express();
const fs = require("fs");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require("multer")
const upload = multer();

app.set("view options", { layout: "layouts/layout" });
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use("/main", urlencodedParser, function (request, response) {
    response.render("main2.hbs");
});

app.use("/", urlencodedParser, function (request, response) {
    response.redirect("/main");
});

var arr = new Array("Название 1", "15", "2", "Название 2", "10", "3");

app.post("/getData", upload.fields([]), (request, response) => {
    if (!request.body)
        return response.sendStatus(400);
    response.send(arr[request.body.data - 1]);
});

var table = `<tr>`
for (let i = 0; i < arr.length; i++) {
    table +=`<td> ${arr[i]}</td>`;
    if(arr.length/2==i){
        table+='</tr><tr>'
    }
}
table += '</tr>'

app.get("/getTable", (request, response) => {
    response.send(table);
});

app.listen(3000, function () {
    console.log("Сервер запущен. Порт 3000")
});