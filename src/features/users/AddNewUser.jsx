// src/features/users/AddNewUser.jsx
import React, { useState } from "react";

export const AddNewUser = ({ onAdd }) => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    onAdd(form);
    setForm({ name: "", email: "" });
  };

  return (
    <form
      className="row align-items-center mb-4"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="col">
        <input
          type="text"
          className="form-control form-control-lg bg-light border-0 rounded-pill px-4"
          placeholder="Enter name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col">
        <input
          type="email"
          className="form-control form-control-lg bg-light border-0 rounded-pill px-4"
          placeholder="Enter email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-auto">
        <button
          type="submit"
          className="btn btn-lg text-white rounded-pill px-4 font-weight-bold app-btn-bg-color"
          disabled={!form.name.trim() || !form.email.trim()}
        >
          Add New User
        </button>
      </div>
    </form>
  );
};
