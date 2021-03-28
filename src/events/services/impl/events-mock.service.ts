import { EventsService } from '../events.service';
import { Event } from '../../models/event';
import { EventPaginator } from '../../types/event-paginator.type';
import { EventsValidatorService } from './events-validator.service';
import { QueryBuilderArrayService } from '../../../core/services/impl/query-builder-array.service';
import { QueryBuilderOperator } from '../../../core/enums/query-builder-operator.enum';
import { EventNotFoundError } from '../../errors/event-not-found.error';

export class EventsMockService implements EventsService {
  constructor(private _events: Event[]) {}

  getEvents(
    dateFrom: string,
    dateTo: string,
    offset: number,
    limit: number,
  ): Promise<EventPaginator> {
    try {
      EventsValidatorService.validateEventsFilters(dateFrom, dateTo);
      EventsValidatorService.validatePaginationAttributes(offset, limit);
    } catch (e) {
      return Promise.reject(e);
    }

    const builder = new QueryBuilderArrayService<Event>(this._events);
    builder.whereDate('startDate', QueryBuilderOperator.GTE, dateFrom);
    builder.whereDate('endDate', QueryBuilderOperator.LTE, dateTo);

    return Promise.resolve({
      totalCount: builder.count(),
      events: builder.paginate(offset, limit),
    });
  }

  getEvent(id: string): Promise<Event> {
    const builder = new QueryBuilderArrayService<Event>(this._events);
    const event = builder.find('id', id);

    if (event === undefined) {
      return Promise.reject(new EventNotFoundError());
    }

    return Promise.resolve(event);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createEvent(dateFrom: string, dateTo: string, title: string): Promise<Event> {
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
