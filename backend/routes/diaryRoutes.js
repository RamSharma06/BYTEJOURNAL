import express from "express";
import {createEntry, getEntries, updateEntry, deleteEntry} from"../controllers/diaryController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEntry);
router.get("/", protect, getEntries);
router.put("/:id", protect, updateEntry);
router.delete("/:id", protect, deleteEntry);

export default router;
