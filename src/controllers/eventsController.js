import { events } from "../database/memory.js";

export const createEvents= (req, res) => {
  const { name, venue, category } = req.body;

  const newEvent = {
    id: events.length + 1,
    name,
    venue,
    category,
  };

  events.push(newEvent);
  res.status(201).json({ message: "Event added", event: newEvent });
};

export const getEvents = (req, res) => {
  let result = [...events];

  if (req.query.category)
    result = result.filter(p => p.category === req.query.category);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const end = page * limit;

  res.json({
    page,
    total: result.length,
    events: result.slice(start, end),
  });
};

export const getEventById = (req, res) => {
  const id = Number(req.params.id);
  const event = events.find(p => p.id === id);

  if (!event)
    return res.status(404).json({ message: "event not found" });

  res.json(event);
};
export const updateEvent = (req, res) => {
  const id = Number(req.params.id);
  const event = events.find(p => p.id === id);

  if (!event)
    return res.status(404).json({ message: "event not found" });

  Object.assign(event, req.body);

  res.json({ message: "Updated", event });
};

export const deleteEvent = (req, res) => {
  const id = Number(req.params.id);

  const index = events.findIndex(p => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: "event not found" });

  events.splice(index, 1);

  res.json({ message: "event deleted" });
};
