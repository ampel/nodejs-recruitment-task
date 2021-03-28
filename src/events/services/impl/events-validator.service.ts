import validator from "validator";
import { DateFormatError } from "../../errors/date-format.error";
import { PaginationAttributesError } from "../../errors/pagination-attributes.error";

export class EventsValidatorService {
  static validateEventsFilters(dateFrom: string, dateTo: string): boolean {
    return (
      this.validateDate(dateFrom, 'The dateFrom format is invalid.') &&
      this.validateDate(dateTo, 'The dateTo format is invalid.')
    );
  }

  static validateDate(date: string, message?: string): boolean {
    if (!validator.isISO8601(date)) {
      throw new DateFormatError(message);
    }

    return true;
  }

  static validatePaginationAttributes(offset: number, limit: number): boolean {
    if (offset < 1) {
      throw new PaginationAttributesError(
        'The offset value should be greater than 0.',
      );
    }
    if (limit < 1) {
      throw new PaginationAttributesError(
        'The limit value should be greater than 0.',
      );
    }

    return true;
  }
}
