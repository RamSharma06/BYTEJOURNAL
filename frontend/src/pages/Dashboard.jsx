import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import DiaryCard from "../components/DiaryCard";
import toast from "react-hot-toast";

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", date: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch entries from the database
  const fetchEntries = async () => {
    try {
      const res = await api.get("/diary");
        // Make sure data is coming through
      setEntries(res.data || []);  // Make sure data is in the expected format
      setLoading(false);
    } catch (err) {
      navigate("/login");
    }
  };


  //ise check krna hai!!
const [user, setUser] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth"); // or "/auth" depending on your backend
      setUser(res.data); // save user data in state
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  fetchUser();
}, []);

  useEffect(() => {
    fetchEntries();  // Call fetchEntries on component mount
  }, []);

  useEffect(() => {
    // This useEffect will run every time the `entries` state changes (i.e., after adding/updating/deleting an entry)
    if (!loading) {
      fetchEntries();
    }
  }, [entries, loading]);  // Trigger this effect when `entries` or `loading` changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.date) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/diary/${editingId}`, form);
        toast.success("Entry updated");
        setEditingId(null);
      } else {
        await api.post("/diary", form);
        toast.success("Entry added");
      }

      setForm({ title: "", content: "", date: "" });
      setLoading(true); // Set loading to true to trigger refetch of entries

    } catch (err) {
      toast.error("Error saving diary");
    }
  };

  const handleEdit = (entry) => {
    setForm({
      title: entry.title,
      content: entry.content,
      date: entry.date.slice(0, 10),
    });
    setEditingId(entry._id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this entry?");
    if (!confirm) return;

    try {
      await api.delete(`/diary/${id}`);
      toast.success("Entry deleted");
      setLoading(true); // Set loading to true to trigger refetch of entries
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleLogout = async () => {
    await api.get("/auth/logout");
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-700"> {user ? `Welcome, ${user.name}` : "Welcome!"}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 mb-8 space-y-5 border border-gray-200"
      >
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Write something..."
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {editingId ? "Update Entry" : "Add Entry"}
        </button>
      </form>

      {loading ? (
        <Loader />
      ) : entries.length > 0 ? (
        <div className="space-y-4">
          {entries.map((entry) => (
            <DiaryCard
              key={entry._id}
              entry={entry}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl mt-8">
          You don't have any entries yet. Add your first entry!
        </p>
      )}
    </div>
  );
}

export default Dashboard;
