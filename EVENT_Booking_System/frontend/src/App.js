import React, { useState, useEffect } from "react";
import CreateEvent from "./CreateEvent";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from backend
  const fetchEvents = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        // Filter out any leftover Tech Fest events just in case
        const filteredEvents = data.filter(
          (event) => !event.title.includes("Tech Fest")
        );

        // Optional: sort by date ascending
        const sortedEvents = filteredEvents.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setEvents(sortedEvents);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Book event
  const handleBookEvent = async (event) => {
    if (event.ticketsBooked >= event.totalTickets) {
      alert("Sorry, this event is sold out!");
      return;
    }

    const userEmail = prompt("Enter your email to book this event:");
    if (!userEmail) return;

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event._id, userEmail }),
      });
      if (!res.ok) throw new Error("Booking failed!");

      alert(`Booking successful! Confirmation email sent to ${userEmail}`);
      fetchEvents(); // refresh to update tickets left
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "#f0f4f8",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1E90FF, #6A5ACD)",
          color: "#fff",
          textAlign: "center",
          padding: "40px 20px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
           Event Booking System
        </h1>
        <p style={{ fontSize: "1.2rem" }}>Book your events seamlessly!</p>
      </div>

      {/* Create Event Form */}
      <CreateEvent onEventCreated={fetchEvents} />

      {/* Event List */}
      <h2 style={{ color: "#333", margin: "30px 0 15px 0" }}>Upcoming Events</h2>
      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Friendly Empty State */}
      {!loading && events.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#555" }}>
          🎉 No events yet. Create your first awesome event now!
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {events.map((event) => {
          const ticketsLeft = event.totalTickets - (event.ticketsBooked || 0);
          const soldOut = ticketsLeft <= 0;
          const percentLeft = Math.max(
            0,
            ((ticketsLeft / event.totalTickets) * 100).toFixed(0)
          );

          return (
            <div
              key={event._id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={{ color: "#1E90FF", marginBottom: "10px" }}>{event.title}</h3>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <FaCalendarAlt style={{ marginRight: "5px", color: "#6A5ACD" }} />
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <FaMapMarkerAlt style={{ marginRight: "5px", color: "#FF6347" }} />
                {event.venue}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <FaTicketAlt style={{ marginRight: "5px", color: "#32CD32" }} />
                {ticketsLeft}/{event.totalTickets} tickets left
              </p>

              {/* Progress Bar */}
              <div
                style={{
                  background: "#eee",
                  borderRadius: "5px",
                  height: "10px",
                  overflow: "hidden",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: `${percentLeft}%`,
                    height: "100%",
                    background: soldOut ? "#FF6347" : "#1E90FF",
                    transition: "width 0.3s",
                  }}
                ></div>
              </div>

              <button
                onClick={() => handleBookEvent(event)}
                disabled={soldOut}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  background: soldOut ? "#aaa" : "#6A5ACD",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: soldOut ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) => {
                  if (!soldOut) e.target.style.background = "#483D8B";
                }}
                onMouseOut={(e) => {
                  if (!soldOut) e.target.style.background = "#6A5ACD";
                }}
              >
                {soldOut ? "Sold Out" : "Book Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
