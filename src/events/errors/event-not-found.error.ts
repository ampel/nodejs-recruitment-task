export class EventNotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'Event not found.');
    Object.setPrototypeOf(this, EventNotFoundError.prototype);
  }
}
