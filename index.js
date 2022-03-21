/*
 * @Author: naman jain(namanj975@gmail.com)
 * @Date: 2021-12-28 18:46:13
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2022-03-21 17:51:36
 */

import { connectDb } from "./db/connection";
import initialProcess from "./initialProcessHandler";
import express from "express";
import configuration from "./appConfig.js";
import appRoutes from "./routes/index";
import dbEvents from "./db/dbEvents";
import dbLogger from "./db/dbLogger";
import colors from "colors";
colors.setTheme(configuration.loggerColor); // for setting the logger theme
console.log("in index".rainbow);
const app = express();
app.set("appPort", configuration.port);
app.set("views", "./errorTemplates");
app.set("view engine", "pug");
app.all("/", (req, res) => {
  console.log("this without mount called", req.method);
  res.send("Hello World!");
});
app.all("/api/*", (req, res, next) => {
  console.log("api route initiated validation required", req.method, req.url);
  next();
});
app.locals.title = "my app";
app.locals.message = "Something is misssing!!";
app.listen(app.get("appPort"), (val) => {
  console.log(
    `Example app listening at http://localhost:${app.get("appPort")}`
  );
});

let initiateProcess = async () => {
  try {
    connectDb()
      .then((result) => {
        console.log("db result", result);
      })
      .catch((err) => console.log(err));
    await initialProcess();
  } catch (err) {
    console.log("error occured while initiating the main process", err);
  }
};

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    //If any error encountered after response headers has been sent then express default error handler deal with it.
    return next(err);
  }
  console.log("error occured in the app", err, app.get("views"));
  res.status(500);
  res.render(
    "error",
    { title: "error occured 500", message: err },
    function (err, html) {
      console.log({ html },err);
      res.send(html)
    }
  );
}
app.use(errorHandler);
app.use("/api/v1", appRoutes);
process.on("unhandledRejection", (reason, promise) => {
  console.log("unhandled promise rejection has been caught", reason);
});

process.on("uncaughtException", function (err) {
  console.error("Exceptions has been caught", err);
});

initiateProcess();
