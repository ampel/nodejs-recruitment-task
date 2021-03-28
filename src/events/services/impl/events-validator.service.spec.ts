import { EventsValidatorService } from "./events-validator.service";
import { DateFormatError } from "../../errors/date-format.error";
import { PaginationAttributesError } from "../../errors/pagination-attributes.error";

describe('EventsValidatorService', () => {
  describe('validateEventsFilters()', () => {
    it('is defined of type function', () => {
      expect(EventsValidatorService.validateEventsFilters).toBeDefined();
      expect(typeof EventsValidatorService.validateEventsFilters).toBe('function');
    });

    it('should not return an error when the dates have the ISO8601 format', () => {
      const result = EventsValidatorService.validateEventsFilters('2020-01-03T15:00:00.000Z', '2020-01-04T15:00:00.000Z');
      expect(result).toBeTruthy();
    });

    it('should return an error when the dateFrom is not compatible with the ISO8601 format', () => {
      try {
        EventsValidatorService.validateEventsFilters('2020-01-03 15:00', '2020-01-04T15:00:00.000Z');
      } catch (e) {
        expect(e).toBeInstanceOf(DateFormatError);
      }
    });

    it('should return an error when the dateTo is not compatible with the ISO8601 format', () => {
      try {
        EventsValidatorService.validateEventsFilters('2020-01-03T15:00:00.000Z', '2020-01-04 15:00');
      } catch (e) {
        expect(e).toBeInstanceOf(DateFormatError);
      }
    });
  });

  describe('validateDate()', () => {
    it('is defined of type function', () => {
      expect(EventsValidatorService.validateDate).toBeDefined();
      expect(typeof EventsValidatorService.validateDate).toBe('function');
    });

    it('should not return an error when the value has the ISO8601 format', () => {
      const result = EventsValidatorService.validateDate('2020-01-03T15:00:00.000Z');
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

  describe('validatePaginationAttributes()', () => {
    it('is defined of type function', () => {
      expect(EventsValidatorService.validatePaginationAttributes).toBeDefined();
      expect(typeof EventsValidatorService.validatePaginationAttributes).toBe('function');
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
