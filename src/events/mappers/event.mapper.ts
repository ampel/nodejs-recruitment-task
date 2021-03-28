import { v4 as uuidv4 } from 'uuid';
import { Event } from '../models/event';

export class EventMapper {
  static toDomain(title: string, startDate: string, endDate: string): Event {
    return {
      id: uuidv4(),
      title: title,
      startDate: this.convertDate(startDate),
      endDate: this.convertDate(endDate),
    };
  }

  private static convertDate(date: string): string {
    return new Date(date).toISOString();
  }
}
