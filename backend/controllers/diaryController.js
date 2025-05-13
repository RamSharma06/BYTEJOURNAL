import Diary from "../models/Diary.model.js";

export const createEntry = async (req, res) => {
  // Corrected: Changed res.body to req.body
  const { title, content, date } = req.body;  // Added date to handle default value
  const userId = req.user;

  try {
    // Handle creating a new diary entry
    const newEntry = await Diary.create({
      user: userId,
      title,
      content,
      date: date || new Date(), // Fallback if date is missing
    });

    // Corrected: used res instead of req
    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error creating diary entry:", error);  // Added more detailed error logging
    res.status(500).json({ msg: "Error creating diary entry" });
  }
};

export const getEntries = async (req, res) => {
  try {
    // Fetch entries of the logged-in user sorted by date (newest first)
    const entries = await Diary.find({ user: req.user }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error("Error fetching diary entries:", error);  // Added more detailed error logging
    res.status(500).json({ msg: "Error fetching diary entries" });
  }
};

export const updateEntry = async (req, res) => {
  const { title, content } = req.body;

  try {
    // Find and update the diary entry based on ID and user
    const entry = await Diary.findByIdAndUpdate(
      { _id: req.params.id, user: req.user },
      { title, content },
      { new: true }
    );

    if (!entry) return res.status(404).json({ msg: "Entry not found" });
    res.json(entry);
  } catch (error) {
    console.error("Error updating diary entry:", error);  // Added more detailed error logging
    res.status(500).json({ msg: "Error updating entry" });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    // Find and delete the diary entry based on ID and user
    const entry = await Diary.findOneAndDelete({ _id: req.params.id, user: req.user });
    
    if (!entry) return res.status(404).json({ msg: "Entry not found" });
    res.json({ msg: "Entry deleted" });
  } catch (error) {
    console.error("Error deleting diary entry:", error);  // Added more detailed error logging
    res.status(500).json({ msg: "Error deleting entry" });
  }
};
