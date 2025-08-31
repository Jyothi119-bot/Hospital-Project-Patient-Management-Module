import React, { useState } from "react";

function PatientForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    problem: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age) return alert("Name & Age required!");
    onAdd(form);
    setForm({ name: "", age: "", gender: "", contact: "", problem: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>➕ Register Patient</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" />
      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" />
      <input name="problem" value={form.problem} onChange={handleChange} placeholder="Problem" />
      <button type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm;
