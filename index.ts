import express, { Request, Response } from "express";
import { JSONFilePreset } from "lowdb/node";

import { iNote, ParamsDictionary} from "./types"

import notesRouter from "./routes/notes.js"
const app = express();
const port = 3000;
// const defaultData = { notes: [] };

// const db = await JSONFilePreset("db.json", defaultData);

app.use(express.json()); //accept JSON body
// app.use(express.urlencoded({ extended: true }));



app.get("/", async (req: Request, res: Response) => {
  try {
    const defaultData = { notes: [] };

    // const db = await JSONFilePreset("db.json", defaultData);
    // console.log("%c Line:11 🍇 db", "color:#b03734", db);
    // const { data } = db;
    // const { notes } = data;
    // console.log("%c Line:16 🍞 notes", "color:#ea7e5c", notes);

    res.send("Hello, this is the home page!");
  } catch (error) {
    console.error("Error initializing lowdb:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/about", (req: Request, res: Response) => {
  res.send("This is the about page...");
});


app.use("/notes", notesRouter)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
