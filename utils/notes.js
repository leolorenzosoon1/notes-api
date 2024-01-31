import { JSONFilePreset } from "lowdb/node";
import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";
const { pick } = lodash;
const MAX_TITLE_LENGTH = 100;
const MAX_BODY_LENGTH = 1000;
const getDB = async () => {
    const defaultData = {
        notes: [],
    };
    const db = await JSONFilePreset("db.json", defaultData);
    const { data: { notes }, } = db;
    return { notes, db };
};
const getNoteById = async (id) => {
    const { notes = [] } = await getDB();
    return notes.find((val) => {
        return val.id == id;
    });
};
const getNoteIndex = async (id) => {
    const { notes } = await getDB();
    return notes.findIndex((val, index, arr) => {
        return val.id == id;
    });
};
const paramsValidator = (data, action) => {
    const keys = Object.keys(data);
    let isValid = false;
    if (["update", "delete", "search"].some((e) => e.includes(action))) {
        if (!keys.includes("id"))
            return { isValid, message: "Missing ID" };
    }
    if (action === "create") {
        if (!["title"].every((e) => keys.includes(e)))
            return { isValid, message: "Missing Title" };
        if (!data.title || (data.title && !data.title.trim().length))
            return { isValid, message: "Empty Title" };
        if (data.title && data.title.length > MAX_TITLE_LENGTH)
            return { isValid, message: "Title Character Count Exceeded" };
        if (data.body && data.body.length > MAX_BODY_LENGTH)
            return { isValid, message: "Body Character Count Exceeded" };
    }
    return { isValid: true };
};
const createNote = async (data) => {
    const { notes, db } = await getDB();
    const { isValid, message } = paramsValidator(data, "create");
    if (!isValid)
        return {
            message,
            success: false,
        };
    const { body = "", title = "" } = pick(data, "body", "title");
    const note = await getNoteById(data.id ?? "");
    if (note)
        return { message: "ID already exists", success: false };
    await db.update(({ notes }) => notes.push({ body, title, id: uuidv4() }));
    return { message: "Note has been created!", success: true };
};
const updateNote = async (index, data) => {
    const { notes: tempNotes, db } = await getDB();
    const note = await getNoteById(data.id);
    data = pick(data, "body", "title", "id");
    const notes = tempNotes.splice(index, 1, { ...note, ...data });
    const res = await db.update((data) => {
        return { ...data, notes };
    });
    return res;
};
const deleteNote = async (index, data) => {
    const { notes: tempNotes, db } = await getDB();
    data = pick(data, "body", "title", "id");
    const notes = tempNotes.splice(index, 1);
    const res = await db.update((data) => {
        return { ...data, notes };
    });
    return res;
};
export { getNoteById, getNoteIndex, updateNote, paramsValidator, createNote, getDB, deleteNote, };
