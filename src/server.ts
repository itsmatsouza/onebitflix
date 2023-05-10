import express from "express";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";

const app = express();

app.use(adminJs.options.rootPath, adminJsRouter);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await sequelize.authenticate().then(() => {
    console.log("DB Connection Successfully");
  });
  console.log(`Server started successfully at port ${PORT}`);
});
