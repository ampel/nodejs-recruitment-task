export class PaginationAttributesError extends Error {
  constructor(message?: string) {
    super(message || 'The pagination attributes are invalid.');
    Object.setPrototypeOf(this, PaginationAttributesError.prototype);
  }
}