import React from "react";

const DiaryCard = ({ entry, onEdit, onDelete }) => {
  const formattedDate = new Date(entry.date).toLocaleDateString();


  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-4 transition hover:shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-bold text-blue-700">{entry.title}</h3>
        <span className="text-sm text-gray-400">{formattedDate}</span>
      </div>
      <p className="text-gray-700 mb-5 whitespace-pre-wrap">{entry.content}</p>
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(entry)}
          className="px-4 py-2 text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(entry._id)}
          className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DiaryCard;
