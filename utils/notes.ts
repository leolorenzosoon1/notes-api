import { iNote, ParamsDictionary } from "../types";
import express, { Request, Response } from "express";
import { JSONFilePreset } from "lowdb/node";
import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";
const { pick } = lodash;

const MAX_TITLE_LENGTH = 100;
const MAX_BODY_LENGTH = 1000;

const getDB = async () => {
  const defaultData: { notes: iNote[] } = {
    notes: [],
  };
  const db = await JSONFilePreset("db.json", defaultData);

  const {
    data: { notes },
  } = db;

  return { notes, db };
};

const getNoteById = async (id: string) => {
  const { notes = [] } = await getDB();

  return notes.find((val) => {
    return val.id == id;
  });
};

const getNoteIndex = async (id: string) => {
  const { notes } = await getDB();

  return notes.findIndex((val, index, arr) => {
    return val.id == id;
  });
};

const paramsValidator = (data: iNote, action: string) => {
  const keys = Object.keys(data);
  let isValid = false;

  const { title = "", body = "" } = data;

  if (["update", "delete", "search"].some((e) => e.includes(action))) {
    if (!keys.includes("id")) return { isValid, message: "Missing ID" };
    if (
      (!keys.includes("body") && !keys.includes("title")) ||
      (keys.includes("body") &&
        keys.includes("title") &&
        !title.length &&
        !body.length)
    )
      return { isValid, message: "No Body or Title Provided" };
  }

  if (action === "create") {
    if (!["title"].every((e) => keys.includes(e)))
      return { isValid, message: "Missing Title" };
    if (!data.title || (title && !title.trim().length))
      return { isValid, message: "Empty Title" };
    if (data.title && title.length > MAX_TITLE_LENGTH)
      return { isValid, message: "Title Character Count Exceeded" };
    if (data.body && body.length > MAX_BODY_LENGTH)
      return { isValid, message: "Body Character Count Exceeded" };
  }

  return { isValid: true };
};

const createNote = async (data: iNote) => {
  const { notes, db } = await getDB();
  const { isValid, message } = paramsValidator(data, "create");

  if (!isValid)
    return {
      message,
      success: false,
    };

  const { body = "", title = "" } = pick(data, "body", "title");
  const note = await getNoteById(data.id ?? "");
  if (note) return { message: "ID already exists", success: false };
  await db.update(({ notes }) => notes.push({ body, title, id: uuidv4() }));
  return { message: "Note has been created!", success: true };
};

const updateNote = async (index: number, data: iNote) => {
  const { notes: tempNotes, db } = await getDB();

  const note = await getNoteById(data.id);
  data = pick(data, "body", "title", "id");
  const notes = tempNotes.splice(index, 1, { ...note, ...data });
  const res = await db.update((data) => {
    return { ...data, notes };
  });

  return res;
};

const deleteNote = async (index: number, data: iNote) => {
  const { notes: tempNotes, db } = await getDB();
  data = pick(data, "body", "title", "id");

  const notes = tempNotes.splice(index, 1);
  const res = await db.update((data) => {
    return { ...data, notes };
  });

  return res;
};
export {
  getNoteById,
  getNoteIndex,
  updateNote,
  paramsValidator,
  createNote,
  getDB,
  deleteNote,
};
