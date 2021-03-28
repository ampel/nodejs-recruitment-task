import { QueryBuilderOperator } from "../../enums/query-builder-operator.enum";
import { QueryBuilderService } from "../query-builder.service";

export class QueryBuilderArrayService<T>
  implements QueryBuilderService<Array<T>> {
  constructor(private _collection: Array<T>) {}

  find(field: string, value: any): T {
    return this._collection.find((item: T) => item[field] === value);
  }

  where(
    field: string,
    operator: QueryBuilderOperator,
    value: any,
  ): QueryBuilderArrayService<T> {
    this._collection = this._collection.filter((item: T): boolean => {
      switch (operator) {
        case QueryBuilderOperator.GT:
          return item[field] > value;
        case QueryBuilderOperator.GTE:
          return item[field] >= value;
        case QueryBuilderOperator.LT:
          return item[field] < value;
        case QueryBuilderOperator.LTE:
          return item[field] <= value;
        default:
          return item[field] === value;
      }
    });

    return this;
  }

  whereDate(
    field: string,
    operator: QueryBuilderOperator,
    value: Date | string,
  ): QueryBuilderArrayService<T> {
    const date2 = this.convertDate(value);

    this._collection = this._collection.filter((item: T): boolean => {
      const date1 = this.convertDate(item[field]);

      switch (operator) {
        case QueryBuilderOperator.GT:
          return date1 > date2;
        case QueryBuilderOperator.GTE:
          return date1 >= date2;
        case QueryBuilderOperator.LT:
          return date1 < date2;
        case QueryBuilderOperator.LTE:
          return date1 <= date2;
        default:
          return date1 === date2;
      }
    });

    return this;
  }

  all(): Array<T> {
    return this._collection;
  }

  paginate(offset: number, limit: number): Array<T> {
    return this._collection.slice(offset - 1, offset - 1 + limit);
  }

  count(): number {
    return this._collection.length;
  }

  private convertDate(value: Date | string): number {
    return (value instanceof Date ? value : new Date(value)).valueOf();
  }
}
