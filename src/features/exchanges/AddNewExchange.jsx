// src/features/users/AddNewUser.jsx
import React, { useState } from "react";

export const AddNewExchange = ({ onAdd }) => {
  const [form, setForm] = useState({ name: "", description: "", budget: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim() || !form.budget.trim())
      return;
    onAdd(form);
    setForm({ name: "", description: "", budget: "" });
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
          placeholder="Enter Exchange name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control form-control-lg bg-light border-0 rounded-pill px-4"
          placeholder="Enter description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="col">
        <input
          type="number"
          className="form-control form-control-lg bg-light border-0 rounded-pill px-4"
          placeholder="Enter Budget"
          name="budget"
          min="0"
          value={form.budget}
          onChange={handleChange}
        />
      </div>
      <div className="col-auto">
        <button
          type="submit"
          className="btn btn-lg text-white rounded-pill px-4 font-weight-bold btn-danger"
          disabled={
            !form.name.trim() || !form.description.trim() || !form.budget.trim()
          }
        >
          Add New Exchange
        </button>
      </div>
    </form>
  );
};
