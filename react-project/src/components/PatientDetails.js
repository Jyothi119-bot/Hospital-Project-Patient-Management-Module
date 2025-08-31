import React, { useState } from "react";

function PatientDetails({ patient, onBack, onUpdate, onDelete }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(patient);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(form);
    setEdit(false);
  };

  return (
    <div className="card">
      <button onClick={onBack}>⬅ Back</button>
      {edit ? (
        <>
          <h2>Edit Patient</h2>
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="age" value={form.age} onChange={handleChange} type="number" />
          <input name="contact" value={form.contact} onChange={handleChange} />
          <input name="problem" value={form.problem} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h2>Patient Details</h2>
          <p><b>Name:</b> {patient.name}</p>
          <p><b>Age:</b> {patient.age}</p>
          <p><b>Gender:</b> {patient.gender}</p>
          <p><b>Contact:</b> {patient.contact}</p>
          <p><b>Problem:</b> {patient.problem}</p>
          <p><b>Doctor:</b> {patient.doctor || "Not Assigned"}</p>
          <button onClick={() => setEdit(true)}>Edit</button>
          <button onClick={() => onDelete(patient.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default PatientDetails;
