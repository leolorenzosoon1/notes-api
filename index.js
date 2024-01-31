import express from "express";
import notesRouter from "./routes/notes.js";
const app = express();
const port = 3000;
app.use(express.json()); //accept JSON body
app.get("/", async (req, res) => {
    try {
        res.send("Notes-api is running");
    }
    catch (error) {
        console.error("Error initializing lowdb:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.use("/notes", notesRouter);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
