import Event from '../models/event';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getEvents(req, res) {
  Event.find().sort('-scheduledDate').exec((err, events) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ events });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getUserEvents(req, res) {
  Event.find({ owner: req.params.cuid }).sort('-schduledDate').exec((err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ event });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addEvent(req, res) {
  if (!req.body.event.eventName || !req.body.event.game || !req.body.event.scheduledDate || !req.body.event.slots || !req.body.event.owner) {
    res.status(403).end();
  }

  const newEvent = new Event(req.body.post);

  // Let's sanitize inputs
  newEvent.eventName = sanitizeHtml(newEvent.eventName);
  newEvent.game = sanitizeHtml(newEvent.game);
  newEvent.scheduledDate = sanitizeHtml(newEvent.scheduledDate);
  newEvent.slots = sanitizeHtml(newEvent.slots);
  newEvent.owner = sanitizeHtml(newEvent.owner);
  newEvent.slug = slug(newEvent.eventName.toLowerCase(), { lowercase: true });
  newEvent.cuid = cuid();
  newEvent.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ event: saved });
  })
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getEvent(req, res) {
  Event.findOne({ cuid: req.params.cuid }).exec((err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ event });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteEvent(req, res) {
  Event.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}