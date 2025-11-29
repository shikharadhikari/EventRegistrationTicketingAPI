import { tickets, events } from "../database/memory.js";

export const createTicket = (req, res) => {
  const { eventId, quantity } = req.body;

  const event = events.find(e => e.id === Number(eventId));
  if (!event)
    return res.status(404).json({ message: "Event not found" });

  const newTicket = {
    id: tickets.length + 1,
    eventId: Number(eventId),
    quantity: quantity || 1,
    status: "booked",
    createdAt: new Date().toISOString()
  };

  tickets.push(newTicket);
  res.status(201).json({ message: "Ticket booked", ticket: newTicket });
};


export const getTickets = (req, res) => {
  res.json({ total: tickets.length, tickets });
};


export const getTicketById = (req, res) => {
  const id = Number(req.params.id);
  const ticket = tickets.find(t => t.id === id);

  if (!ticket)
    return res.status(404).json({ message: "Ticket not found" });

  res.json(ticket);
};


export const deleteTicket = (req, res) => {
  const id = Number(req.params.id);
  const index = tickets.findIndex(t => t.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Ticket not found" });

  tickets.splice(index, 1);

  res.json({ message: "Ticket cancelled" });
};
