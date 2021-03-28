export class DateConflictError extends Error {
  constructor(message?: string) {
    super(message || 'Date conflict.');
    Object.setPrototypeOf(this, DateConflictError.prototype);
  }
}
