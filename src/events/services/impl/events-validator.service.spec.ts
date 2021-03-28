import { EventsValidatorService } from './events-validator.service';
import { DateAfterError } from '../../errors/date-after.error';
import { DateConflictError } from '../../errors/date-conflict.error';
import { DateFormatError } from '../../errors/date-format.error';
import { PaginationAttributesError } from '../../errors/pagination-attributes.error';
import { EventsMockData } from '../../mock-data/event';

describe('EventsValidatorService', () => {
  describe('validateEventsFilters()', () => {
    it('is defined of type function', () => {
      expect(EventsValidatorService.validateEventsFilters).toBeDefined();
      expect(typeof EventsValidatorService.validateEventsFilters).toBe(
        'function',
      );
    });

    it('should not return an error when the dates have the ISO8601 format', () => {
      const result = EventsValidatorService.validateEventsFilters(
        '2020-01-03T15:00:00.000Z',
        '2020-01-04T15:00:00.000Z',
      );
      expect(result).toBeTruthy();
    });

    it('should return an error when the dateFrom is not compatible with the ISO8601 format', () => {
      try {
        EventsValidatorService.validateEventsFilters(
          '2020-01-03 15:00',
          '2020-01-04T15:00:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateFormatError);
      }
    });

    it('should return an error when the dateTo is not compatible with the ISO8601 format', () => {
      try {
        EventsValidatorService.validateEventsFilters(
          '2020-01-03T15:00:00.000Z',
          '2020-01-04 15:00',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateFormatError);
      }
    });
  });

  describe('validateEventForm()', () => {
    it('is defined of type function', () => {
      expect(EventsValidatorService.validateEventForm).toBeDefined();
      expect(typeof EventsValidatorService.validateEventForm).toBe('function');
    });

    it('should not return an error when the dates have the ISO8601 format and the conflict does not exist', () => {
      const result = EventsValidatorService.validateEventForm(
        [...EventsMockData],
        '2020-01-01T06:00:00.000Z',
        '2020-01-01T07:00:00.000Z',
      );
      expect(result).toBeTruthy();
    });

    it('should return an error when the date is not compatible with the ISO8601 format', () => {
      try {
        EventsValidatorService.validateEventForm(
          [...EventsMockData],
          '2020-01-01 06:00',
          '2020-01-01T07:00:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateFormatError);
      }
    });

    it('should return an error when the dateTo is before the dateFrom', () => {
      try {
        EventsValidatorService.validateEventForm(
          [...EventsMockData],
          '2020-01-01T08:00:00.000Z',
          '2020-01-01T07:00:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateAfterError);
      }
    });

    it('should return an error when there is a date conflict', () => {
      try {
        EventsValidatorService.validateEventForm(
          [...EventsMockData],
          '2020-01-01T08:00:00.000Z',
          '2020-01-01T10:00:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateConflictError);
      }
    });
  });

  describe('validateDate()', () => {
    it('is defined of type function', () => {
      expect(EventsValidatorService.validateDate).toBeDefined();
      expect(typeof EventsValidatorService.validateDate).toBe('function');
    });

    it('should not return an error when the value has the ISO8601 format', () => {
      const result = EventsValidatorService.validateDate(
        '2020-01-03T15:00:00.000Z',
      );
      expect(result).toBeTruthy();
    });

    it('should not return an error when the value is compatible with the ISO8601 format', () => {
      const result = EventsValidatorService.validateDate('2020-01-03T15:00Z');
      expect(result).toBeTruthy();
    });

    it('should return an error when the value is not compatible with the ISO8601 format', () => {
      try {
        EventsValidatorService.validateDate('2020-01-03 15:00');
      } catch (e) {
        expect(e).toBeInstanceOf(DateFormatError);
      }
    });
  });

  describe('validateDateAfter()', () => {
    it('is defined of type function', () => {
      expect(EventsValidatorService.validateDateAfter).toBeDefined();
      expect(typeof EventsValidatorService.validateDateAfter).toBe('function');
    });

    it('should not return an error when the dateBefore value is before the dateAfter value', () => {
      const result = EventsValidatorService.validateDateAfter(
        '2020-01-03T15:00:00.000Z',
        '2020-01-04T15:00:00.000Z',
      );
      expect(result).toBeTruthy();
    });

    it('should return an error when the dateBefore value is not before the dateAfter value', () => {
      try {
        EventsValidatorService.validateDateAfter(
          '2020-01-03T15:00:00.000Z',
          '2020-01-02T15:00:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateAfterError);
      }
    });

    it('should return an error when the dateBefore value is equal to the dateAfter value', () => {
      try {
        EventsValidatorService.validateDateAfter(
          '2020-01-03T15:00:00.000Z',
          '2020-01-03T15:00:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateAfterError);
      }
    });
  });

  describe('validateDateConflict()', () => {
    it('is defined of type function', () => {
      expect(EventsValidatorService.validateDateConflict).toBeDefined();
      expect(typeof EventsValidatorService.validateDateConflict).toBe(
        'function',
      );
    });

    it('should not return an error when the dates are before the startDate', () => {
      const result = EventsValidatorService.validateDateConflict(
        [...EventsMockData],
        '2020-01-01T06:00:00.000Z',
        '2020-01-01T07:00:00.000Z',
      );
      expect(result).toBeTruthy();
    });

    it('should not return an error when the dates are after the endDate', () => {
      const result = EventsValidatorService.validateDateConflict(
        [...EventsMockData],
        '2021-12-31T21:00:00.000Z',
        '2021-12-31T23:00:00.000Z',
      );
      expect(result).toBeTruthy();
    });

    it('should not return an error when the dateFrom is equal to the endDate', () => {
      const result = EventsValidatorService.validateDateConflict(
        [...EventsMockData],
        '2020-01-01T11:00:00.000Z',
        '2020-01-01T11:30:00.000Z',
      );
      expect(result).toBeTruthy();
    });

    it('should not return an error when the dateTo is equal to the startDate', () => {
      try {
        EventsValidatorService.validateDateConflict(
          [...EventsMockData],
          '2020-01-01T06:00:00.000Z',
          '2020-01-01T09:00:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateConflictError);
      }
    });

    it('should return an error when the dateTo is after the startDate', () => {
      try {
        EventsValidatorService.validateDateConflict(
          [...EventsMockData],
          '2020-01-01T06:00:00.000Z',
          '2020-01-01T10:00:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateConflictError);
      }
    });

    it('should return an error when the dates are between the startDate and the endDate', () => {
      try {
        EventsValidatorService.validateDateConflict(
          [...EventsMockData],
          '2020-01-01T09:30:00.000Z',
          '2020-01-01T10:00:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateConflictError);
      }
    });

    it('should return an error when the dateFrom is before the endDate', () => {
      try {
        EventsValidatorService.validateDateConflict(
          [...EventsMockData],
          '2020-01-01T10:00:00.000Z',
          '2020-01-01T11:30:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateConflictError);
      }
    });

    it('should return an error when the startDate and the endDate are between the dateFrom and the dateTo', () => {
      try {
        EventsValidatorService.validateDateConflict(
          [...EventsMockData],
          '2020-01-01T06:00:00.000Z',
          '2020-01-01T11:30:00.000Z',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(DateConflictError);
      }
    });
  });

  describe('validatePaginationAttributes()', () => {
    it('is defined of type function', () => {
      expect(EventsValidatorService.validatePaginationAttributes).toBeDefined();
      expect(typeof EventsValidatorService.validatePaginationAttributes).toBe(
        'function',
      );
    });

    it('should not return an error when the offset and limit parameters are greater than 0', () => {
      const result = EventsValidatorService.validatePaginationAttributes(1, 10);
      expect(result).toBeTruthy();
    });

    it('should return an error when the offset is not greater than 0', () => {
      try {
        EventsValidatorService.validatePaginationAttributes(0, 10);
      } catch (e) {
        expect(e).toBeInstanceOf(PaginationAttributesError);
      }
    });

    it('should return an error when the limit is not greater than 0', () => {
      try {
        EventsValidatorService.validatePaginationAttributes(1, 0);
      } catch (e) {
        expect(e).toBeInstanceOf(PaginationAttributesError);
      }
    });
  });
});
