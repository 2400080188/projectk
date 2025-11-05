import React, { useState } from "react";

export default function AdminDashboard({ onAddCity }) {
  const [name, setName] = useState("");
  const [population, setPopulation] = useState("");
  const [services, setServices] = useState("");
  const [amenities, setAmenities] = useState("");
  const [msg, setMsg] = useState("");

  function submit(e) {
    e.preventDefault();
    setMsg("");
    if (!name) return setMsg("City name required");
    const payload = {
      name,
      population: parseInt(population || "0", 10),
      services: services.split(",").map(s => s.trim()).filter(Boolean),
      amenities: amenities.split(",").map(a => a.trim()).filter(Boolean)
    };
    onAddCity(payload);
    setMsg("Added city: " + name);
    setName("");
    setPopulation("");
    setServices("");
    setAmenities("");
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h3>Admin Dashboard</h3>
      <form className="form" onSubmit={submit}>
        <div style={{ marginTop: 8 }}>
          <label>City name</label>
          <input className="input" placeholder="City name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Population</label>
          <input className="input" placeholder="Population" value={population} onChange={e => setPopulation(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Services (comma separated)</label>
          <input className="input" placeholder="Services, comma separated" value={services} onChange={e => setServices(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Amenities (comma separated)</label>
          <input className="input" placeholder="Amenities, comma separated" value={amenities} onChange={e => setAmenities(e.target.value)} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn" style={{ marginRight: 8 }}>
            Add City
          </button>
        </div>
      </form>
      <div style={{ marginTop: 12 }}>{msg}</div>
    </div>
  );
}
