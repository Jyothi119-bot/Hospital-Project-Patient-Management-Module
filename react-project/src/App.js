import React, { useState, useEffect } from "react";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import "./index.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Load data from localStorage on first render
  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(savedPatients);
  }, []);

  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, id: Date.now(), doctor: "" }]);
  };

  const updatePatient = (updatedPatient) => {
    setPatients(
      patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setSelectedPatient(null);
  };

  const deletePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
    setSelectedPatient(null);
  };

  // ✅ Manual save button function
  const saveToLocalStorage = () => {
    localStorage.setItem("patients", JSON.stringify(patients));
    alert("✅ Data saved successfully!");
  };

  return (
    <div className="container">
      <h1>🏥 Hospital Patient Management</h1>
      <PatientForm onAdd={addPatient} />

      {/* ✅ Save Button */}
      <button onClick={saveToLocalStorage} style={{ marginBottom: "15px" }}>
        💾 Save Data
      </button>

      {selectedPatient ? (
        <PatientDetails
          patient={selectedPatient}
          onBack={() => setSelectedPatient(null)}
          onUpdate={updatePatient}
          onDelete={deletePatient}
        />
      ) : (
        <PatientList
          patients={patients}
          onSelect={setSelectedPatient}
          onUpdate={updatePatient}
          onDelete={deletePatient}
        />
      )}
    </div>
  );
}

export default App;
