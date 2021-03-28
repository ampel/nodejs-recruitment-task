import { EventsService } from '../events.service';
import { EventsMockService } from './events-mock.service';
import { EventsMockData } from '../../mock-data/event';
import { DateFormatError } from "../../errors/date-format.error";
import { PaginationAttributesError } from "../../errors/pagination-attributes.error";

describe('EventsMockService', () => {
  let eventsService: EventsService;

  beforeEach(() => {
    eventsService = new EventsMockService([...EventsMockData]);
  });

  describe('getEvents()', () => {
    it('is defined of type function', () => {
      expect(eventsService.getEvents).toBeDefined();
      expect(typeof eventsService.getEvents).toBe('function');
    });

    it('is able to filter data using the date parameters and paginate them', async () => {
      const result = await eventsService.getEvents(
        '2020-01-02T12:00:00.000Z',
        '2020-01-06T20:00:00.000Z',
        1,
        10,
      );
      expect(result).toHaveProperty('totalCount');
      expect(result).toHaveProperty('events');
      expect(result.totalCount).toEqual(15);
      expect(result.events).toHaveLength(10);
      expect(result.events[0]).toEqual({
        id: '934964cf-7812-4ce1-a1cb-a45cfa927bb4',
        title: 'Living Feasts',
        startDate: '2020-01-02T12:00:00.000Z',
        endDate: '2020-01-02T14:00:00.000Z',
      });
    });

    it('should return an error when the dateFrom format is invalid', async () => {
      const result = eventsService.getEvents(
        '2020-01-00T09:00:00.000Z',
        '2021-12-31T20:00:00.000Z',
        1,
        10,
      );
      await expect(result).rejects.toThrow(DateFormatError);
    });

    it('should return an error when the dateTo format is invalid', async () => {
      const result = eventsService.getEvents(
        '2020-01-02T12:00:00.000Z',
        '2021-12-00T20:00:00.000Z',
        1,
        10,
      );
      await expect(result).rejects.toThrow(DateFormatError);
    });

    it('should return an error when the pagination attributes are invalid', async () => {
      const result = eventsService.getEvents(
        '2020-01-02T12:00:00.000Z',
        '2020-01-06T20:00:00.000Z',
        0,
        10,
      );
      await expect(result).rejects.toThrow(PaginationAttributesError);
    });
  });

  describe('createEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.createEvent).toBeDefined();
      expect(typeof eventsService.createEvent).toBe('function');
    });
  });

  describe('getEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.getEvent).toBeDefined();
      expect(typeof eventsService.getEvent).toBe('function');
    });
  });

  describe('removeEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.removeEvent).toBeDefined();
      expect(typeof eventsService.removeEvent).toBe('function');
    });
  });
});
