import express from "express";
import { getDB, getNoteById, getNoteIndex, updateNote, paramsValidator, createNote, deleteNote, } from "../utils/notes.js";
const app = express();
const router = express.Router();
router.get("/", async (req, res) => {
    const { notes } = await getDB();
    return res.send({
        message: "Successfully retrieved Data",
        success: true,
        data: notes,
    });
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const note = await getNoteById(id);
    if (!note)
        return res
            .status(404)
            .send({ success: false, message: "Note does not exist" });
    return res.send({
        success: true,
        message: "Successfully retrieved Note",
        data: note,
    });
});
router.post("/", async (req, res) => {
    const { body } = req;
    const { message, success } = await createNote(body);
    if (!success)
        return res.status(400).send({ message, success });
    return res.send({ message, success });
}); //create new Note
router.put("/:id", async (req, res) => {
    const { params, body } = req;
    const { id } = params;
    console.log("%c Line:54 🍖 body", "color:#3f7cff", body);
    const { isValid, message } = paramsValidator({ ...body, id }, "update");
    if (!isValid)
        return res.status(400).send({ message, success: false });
    const index = await getNoteIndex(id);
    if (index === -1)
        return res
            .status(404)
            .send({ message: "Note does not exist", success: false });
    updateNote(index, { ...body, id });
    return res.send({ message: "Updated Note", success: true });
});
router.delete("/:id", async (req, res) => {
    const { params, body } = req;
    const { id } = params;
    const { isValid, message } = paramsValidator({ ...body, id }, "update");
    if (!isValid)
        return res.status(400).send({ message, success: false });
    const index = await getNoteIndex(id);
    if (index === -1)
        return res
            .status(404)
            .send({ message: "Note does not exist", success: false });
    deleteNote(index, { ...body, id });
    return res.send({ message: "Deleted Note", success: true });
});
export default router;
