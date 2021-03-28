export class DateFormatError extends Error {
  constructor(message?: string) {
    super(message || 'The date format is invalid.');
    Object.setPrototypeOf(this, DateFormatError.prototype);
  }
}