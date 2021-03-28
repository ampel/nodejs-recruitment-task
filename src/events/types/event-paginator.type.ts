import { Paginator } from '../../core/types/paginator.type';
import { Event } from '../models/event';

export type EventPaginator = Paginator & {
  events: Event[];
};
