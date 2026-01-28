import React, { useState } from "react";

function CreateEvent({ onEventCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Convert date to ISO format
    const formattedDate = new Date(date).toISOString();

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          date: formattedDate,
          venue,
          totalTickets: Number(totalTickets),
          bookedTickets: 0,
          userEmail,
        }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to create event");
      }

      alert("🎉 Event created successfully!");

      setTitle("");
      setDescription("");
      setDate("");
      setVenue("");
      setTotalTickets("");
      setUserEmail("");

      onEventCreated && onEventCreated();
    } catch (err) {
      console.error(err);
      setError("❌ Backend not reachable or CORS issue. Make sure server is running.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "linear-gradient(135deg, #ffffff, #eef6ff)",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
        marginBottom: "30px",
      }}
    >
      <h2 style={{ color: "#1E90FF", marginBottom: "15px" }}>
        Create New Event
      </h2>

      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={inputStyle}
      />

      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ ...inputStyle, height: "70px" }}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Venue"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        required
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Total Tickets"
        value={totalTickets}
        onChange={(e) => setTotalTickets(e.target.value)}
        required
        min="1"
        style={inputStyle}
      />

      <input
        type="email"
        placeholder="Your Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
        style={inputStyle}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "12px",
          background: "#1E90FF",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          fontWeight: "bold",
          width: "100%",
          cursor: "pointer",
        }}
      >
        {loading ? "Creating Event..." : "Create Event"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
    </form>
  );
}

export default CreateEvent;
