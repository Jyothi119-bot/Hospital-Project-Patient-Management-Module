import React, { useState } from "react";
import Pagination from "./Pagination";

function PatientList({ patients, onSelect, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [page, setPage] = useState(1);

  const patientsPerPage = 10;
  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterGender ? p.gender === filterGender : true)
  );

  const startIndex = (page - 1) * patientsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + patientsPerPage);

  const assignDoctor = (id, doctor) => {
    const updated = patients.map((p) =>
      p.id === id ? { ...p, doctor } : p
    );
    onUpdate(updated.find((p) => p.id === id));
  };

  return (
    <div className="card">
      <h2>📋 Patient List</h2>
      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
        <option value="">Filter by Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Age</th><th>Gender</th><th>Problem</th>
            <th>Doctor</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.problem}</td>
              <td>
                <select
                  value={p.doctor}
                  onChange={(e) => assignDoctor(p.id, e.target.value)}
                >
                  <option value="">Assign Doctor</option>
                  <option>Dr. Jyothi</option>
                  <option>Dr. Sowjanya</option>
                  <option>Dr. Vinayak</option>
                </select>
              </td>
              <td>
                <button onClick={() => onSelect(p)}>Details</button>
                <button onClick={() => onDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        total={filtered.length}
        perPage={patientsPerPage}
        current={page}
        onChange={setPage}
      />
    </div>
  );
}

export default PatientList;
