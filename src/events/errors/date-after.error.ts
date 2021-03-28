export class DateAfterError extends Error {
  constructor(message?: string) {
    super(message || 'The given date must be after the required date.');
    Object.setPrototypeOf(this, DateAfterError.prototype);
  }
}
