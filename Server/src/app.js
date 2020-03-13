import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import Valuta from "./router/valuta";
import valuta from "./router/valuta";

const app = express();

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));
app.use(cors());

app.use(valuta);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
