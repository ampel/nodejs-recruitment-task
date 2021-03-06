import { EventsService } from '../events.service';
import { EventsMockService } from './events-mock.service';
import { EventsMockData } from '../../mock-data/event';
import { DateAfterError } from '../../errors/date-after.error';
import { DateFormatError } from '../../errors/date-format.error';
import { PaginationAttributesError } from '../../errors/pagination-attributes.error';
import { EventNotFoundError } from '../../errors/event-not-found.error';

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

  describe('getEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.getEvent).toBeDefined();
      expect(typeof eventsService.getEvent).toBe('function');
    });

    it('is able to find an element with the given id', async () => {
      const result = await eventsService.getEvent(
        '090677c2-aece-4b94-af8c-9f23e7a23920',
      );
      expect(result).toEqual({
        id: '090677c2-aece-4b94-af8c-9f23e7a23920',
        title: 'Pearl Living',
        startDate: '2020-01-02T09:00:00.000Z',
        endDate: '2020-01-02T11:00:00.000Z',
      });
    });

    it('should return an error when an element with the given id does not exist', async () => {
      const result = eventsService.getEvent(
        '8d500910-4e00-4b3f-87cb-a1488ca42c35',
      );
      await expect(result).rejects.toThrow(EventNotFoundError);
    });
  });

  describe('createEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.createEvent).toBeDefined();
      expect(typeof eventsService.createEvent).toBe('function');
    });

    it('is able to create a new event', async () => {
      const result = await eventsService.createEvent(
        '2020-01-01T06:00:00.000Z',
        '2020-01-01T07:00:00.000Z',
        'Lorem ipsum',
      );
      expect(result).toEqual({
        id: expect.any(String),
        title: 'Lorem ipsum',
        startDate: '2020-01-01T06:00:00.000Z',
        endDate: '2020-01-01T07:00:00.000Z',
      });

      const event = await eventsService.getEvent(result.id);
      expect(event).toEqual(result);
    });

    it('should return an error when data are invalid', async () => {
      const result = eventsService.createEvent(
        '2020-01-01T06:00:00.000Z',
        '2020-01-01T05:00:00.000Z',
        'Lorem ipsum',
      );
      await expect(result).rejects.toThrow(DateAfterError);
    });
  });

  describe('removeEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.removeEvent).toBeDefined();
      expect(typeof eventsService.removeEvent).toBe('function');
    });

    it('is able to remove an event', async () => {
      const result = await eventsService.removeEvent(
        '090677c2-aece-4b94-af8c-9f23e7a23920',
      );
      expect(result).toBeUndefined();

      const event = eventsService.getEvent(
        '8d500910-4e00-4b3f-87cb-a1488ca42c35',
      );
      await expect(event).rejects.toThrow(EventNotFoundError);
    });

    it('should return an error when an element with the given id does not exist', async () => {
      const result = eventsService.getEvent(
        '8d500910-4e00-4b3f-87cb-a1488ca42c35',
      );
      await expect(result).rejects.toThrow(EventNotFoundError);
    });
  });
});
