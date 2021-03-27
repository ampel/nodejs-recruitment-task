import { EventsService } from '../events.service';
import { Event } from '../../models/event';

export class EventsMockService implements EventsService {
  constructor(private _events: Event[]) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createEvent(dateFrom: string, dateTo: string, title: string): Promise<Event> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getEvent(id: string): Promise<Event> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }

  getEvents(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dateFrom: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dateTo: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    offset: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit: number,
  ): Promise<{ totalCount: number; events: Event[] }> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeEvent(id: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }
}
