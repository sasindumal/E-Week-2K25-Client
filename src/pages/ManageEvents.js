import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./management.css";
import { Trash, Pencil, RefreshCw, Square, Calendar, Clock, MapPin, Users, Trophy, Medal, Award } from "lucide-react";

const ManageEvents = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [finishedEvents, setFinishedEvents] = useState([]);
  const [updatingEventId, setUpdatingEventId] = useState(null);
  const [fadingOutIds, setFadingOutIds] = useState([]);

  const handleClick = () => {
    navigate("/admin/EventForm");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`${BASE_URL}/api/createEvents/deleteEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete event");
      }

      setFadingOutIds((prev) => [...prev, id]);

      setTimeout(() => {
        setEvents((prev) => prev.filter((event) => event._id !== id));
        setLiveEvents((prev) => prev.filter((event) => event._id !== id));
        setFinishedEvents((prev) => prev.filter((event) => event._id !== id));
        setFadingOutIds((prev) => prev.filter((fadeId) => fadeId !== id));
      }, 700);

    } catch (error) {
      console.error("Delete event error:", error);
      alert("Failed to delete event: " + error.message);
    }
  };

  useEffect(() => {
    console.log("ManageEvents page accessed");
  }, []);

  const handleChangetoLive = async (id) => {
    setUpdatingEventId(id);
    setFadingOutIds((prev) => [...prev, id]);

    setTimeout(async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/createEvents/ChangeToLive`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId: id }),
        });

        const data = await response.json();

        if (response.ok) {
          fetchLiveEvents();
          fetchUpcomingEvents();
        } else {
          console.error("Error updating event:", data.message || data.error);
        }
      } catch (err) {
        console.error("Network error:", err.message);
      } finally {
        setUpdatingEventId(null);
        setFadingOutIds((prev) => prev.filter((eid) => eid !== id));
      }
    }, 700);
  };

  const handleEndEdit = async (id) => {
    navigate("/admin/SetResult", { state: { eventId: id } });
  }

  const handleEdit = (id) => {
    navigate("/admin/EditableEventForm", { state: { eventId: id } });
  };  

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/createEvents/UpcomingEvents`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchLiveEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/createEvents/LiveEvents`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setLiveEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchFinishedEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/createEvents/FinishedEvents`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFinishedEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchLiveEvents();
    fetchFinishedEvents();
    fetchUpcomingEvents();
  }, []);

  const getStatusBadge = (status) => {
    const statusStyles = {
      upcoming: "bg-blue-500",
      live: "bg-green-500",
      finished: "bg-gray-500"
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${statusStyles[status] || 'bg-gray-400'}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const EventCard = ({ event, type, onEdit, onDelete, onChangeToLive, onEndEvent, isUpdating, isFading }) => (
    <div className={`event-card ${isFading ? 'fade-out' : ''}`}>
      <div className="event-card-header">
        <div className="event-title-section">
          <h3 className="event-title">{event.title}</h3>
          {getStatusBadge(event.status)}
        </div>
        <div className="event-category">
          {event.category && (
            <span className="category-badge">{event.category}</span>
          )}
        </div>
      </div>
      
      <div className="event-details">
        <div className="event-detail-item">
          <Calendar size={16} />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="event-detail-item">
          <Clock size={16} />
          <span>{event.time}</span>
        </div>
        <div className="event-detail-item">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>
        {event.eventType && (
          <div className="event-detail-item">
            <Users size={16} />
            <span>{event.eventType}</span>
          </div>
        )}
      </div>

      {event.description && (
        <div className="event-description">
          <p>{event.description}</p>
        </div>
      )}

      {type === 'finished' && (
        <div className="event-results">
          <h4 className="results-title">Results</h4>
          <div className="results-grid">
            {event.winners && (
              <div className="result-item winner">
                <Trophy size={16} className="result-icon" />
                <span className="result-label">Winner:</span>
                <span className="result-value">{event.winners}</span>
              </div>
            )}
            {event.firstRunnerUp && (
              <div className="result-item first-runner">
                <Medal size={16} className="result-icon" />
                <span className="result-label">1st Runner-up:</span>
                <span className="result-value">{event.firstRunnerUp}</span>
              </div>
            )}
            {event.secondRunnerUp && (
              <div className="result-item second-runner">
                <Award size={16} className="result-icon" />
                <span className="result-label">2nd Runner-up:</span>
                <span className="result-value">{event.secondRunnerUp}</span>
              </div>
            )}
            {event.thirdRunnerUp && (
              <div className="result-item third-runner">
                <Award size={16} className="result-icon" />
                <span className="result-label">3rd Runner-up:</span>
                <span className="result-value">{event.thirdRunnerUp}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="event-actions">
        <button 
          className="action-btn edit-btn" 
          title="Edit Event" 
          onClick={() => onEdit(event._id)}
        >
          <Pencil size={16} />
          Edit
        </button>
        <button 
          className="action-btn delete-btn" 
          title="Delete Event" 
          onClick={() => onDelete(event._id)}
        >
          <Trash size={16} />
          Delete
        </button>
        {type === 'upcoming' && (
          <button
            className="action-btn live-btn"
            title="Change to Live"
            onClick={() => onChangeToLive(event._id)}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <span className="spinner"></span>
            ) : (
              <>
                <RefreshCw size={16} />
                Go Live
              </>
            )}
          </button>
        )}
        {type === 'live' && (
          <button 
            className="action-btn end-btn" 
            title="End Event & Set Results" 
            onClick={() => onEndEvent(event._id)}
          >
            <Square size={16} />
            End Event
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0f" }}>
      <Sidebar activeEvents={liveEvents.length} />

      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">Event Management</h1>
          <p className="page-subtitle">
            Manage all your E-Week 2025 events - Create, edit, and track event progress
          </p>
          <button onClick={handleClick} className="create-event-btn">
            <span>+</span>
            Create New Event
          </button>
        </div>

        <div className="events-dashboard">
          {/* Live Events Section */}
          <section className="events-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="status-indicator live"></span>
                Live Events
                <span className="event-count">{liveEvents.length}</span>
              </h2>
            </div>
            <div className="events-grid">
              {liveEvents.length > 0 ? (
                liveEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    type="live"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onEndEvent={handleEndEdit}
                    isFading={fadingOutIds.includes(event._id)}
                  />
                ))
              ) : (
                <div className="no-events">
                  <p>No live events at the moment</p>
                </div>
              )}
            </div>
          </section>

          {/* Upcoming Events Section */}
          <section className="events-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="status-indicator upcoming"></span>
                Upcoming Events
                <span className="event-count">{events.length}</span>
              </h2>
            </div>
            <div className="events-grid">
              {events.length > 0 ? (
                events.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    type="upcoming"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onChangeToLive={handleChangetoLive}
                    isUpdating={updatingEventId === event._id}
                    isFading={fadingOutIds.includes(event._id)}
                  />
                ))
              ) : (
                <div className="no-events">
                  <p>No upcoming events scheduled</p>
                </div>
              )}
            </div>
          </section>

          {/* Finished Events Section */}
          <section className="events-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="status-indicator finished"></span>
                Finished Events
                <span className="event-count">{finishedEvents.length}</span>
              </h2>
            </div>
            <div className="events-grid">
              {finishedEvents.length > 0 ? (
                finishedEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    type="finished"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isFading={fadingOutIds.includes(event._id)}
                  />
                ))
              ) : (
                <div className="no-events">
                  <p>No finished events yet</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
