import validator from 'validator';
import { DateAfterError } from '../../errors/date-after.error';
import { DateConflictError } from '../../errors/date-conflict.error';
import { DateFormatError } from '../../errors/date-format.error';
import { PaginationAttributesError } from '../../errors/pagination-attributes.error';
import { Event } from '../../models/event';

export class EventsValidatorService {
  static validateEventsFilters(dateFrom: string, dateTo: string): boolean {
    return (
      this.validateDate(dateFrom, 'The dateFrom format is invalid.') &&
      this.validateDate(dateTo, 'The dateTo format is invalid.')
    );
  }

  static validateEventForm(
    events: Event[],
    dateFrom: string,
    dateTo: string,
  ): boolean {
    return (
      this.validateDate(dateFrom, 'The dateFrom format is invalid.') &&
      this.validateDate(dateTo, 'The dateTo format is invalid.') &&
      this.validateDateAfter(
        dateFrom,
        dateTo,
        'The dateTo must be after the dateFrom date.',
      ) &&
      this.validateDateConflict(
        events,
        dateFrom,
        dateTo,
        'The given dates are in conflict with the dates of events.',
      )
    );
  }

  static validateDate(date: string, message?: string): boolean {
    if (!validator.isISO8601(date)) {
      throw new DateFormatError(message);
    }

    return true;
  }

  static validateDateAfter(
    dateBefore: string,
    dateAfter: string,
    message?: string,
  ): boolean {
    if (!(dateBefore < dateAfter)) {
      throw new DateAfterError(message);
    }

    return true;
  }

  static validateDateConflict(
    events: Event[],
    dateFrom: string,
    dateTo: string,
    message?: string,
  ): boolean {
    const from = this.convertDate(dateFrom);
    const to = this.convertDate(dateTo);

    const result = events.every((event: Event): boolean => {
      const start = this.convertDate(event.startDate);
      const end = this.convertDate(event.endDate);

      return to < start || end <= from;
    });

    if (!result) {
      throw new DateConflictError(message);
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

  private static convertDate(value: Date | string): number {
    return (value instanceof Date ? value : new Date(value)).valueOf();
  }
}
