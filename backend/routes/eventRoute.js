const express = require("express");
const router = express.Router();
const { 
  createEvent, 
  updateEventStatus, 
  deleteEvent,
  getAllEvents,
  getOrganizerAnalytics,
  updateEvent,
  getEventById,
  getOrganizerEvents
} = require("../controllers/eventController");
const authenticate = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorization"); // Fix import path

// Public routes
router.get("/", getAllEvents); // Get all events (public)
router.get("/:id", getEventById); // Get single event (public)

// Protected routes
router.post("/", authenticate, authorizeRoles("Organizer"), createEvent); // Create event (organizer)
router.put("/:id", authenticate, authorizeRoles("Organizer"), updateEvent); // Update event (organizer)
router.delete("/:id", authenticate, authorizeRoles("Organizer", "System Admin"), deleteEvent); // Delete event (organizer/admin)
router.put("/:id/status", authenticate, authorizeRoles("System Admin"), updateEventStatus); // Update event status (admin)

// Organizer-specific routes
router.get("/user/events", authenticate, authorizeRoles("Organizer"), getOrganizerEvents); // Get organizer's events
router.get("/user/events/analytics", authenticate, authorizeRoles("Organizer"), getOrganizerAnalytics); // Get analytics

module.exports = router;