import { QueryBuilderOperator } from "../enums/query-builder-operator.enum";

export interface QueryBuilderService<T> {
  /**
   * Finds an element for which the value of the field is equal to the entered value
   */
  find(field: string, value: any): any;

  /**
   * Filters the collection based on the given field and value
   */
  where(
    field: string,
    operator: QueryBuilderOperator,
    value: any,
  ): QueryBuilderService<T>;

  /**
   * Filters the collection by dates based on the given field and value
   */
  whereDate(
    field: string,
    operator: QueryBuilderOperator,
    value: Date | string,
  ): QueryBuilderService<T>;

  /**
   * Gets all elements that are currently in the collection
   */
  all(): T;

  /**
   * Gets elements of the collection relative to the given offset and limit
   */
  paginate(offset: number, limit: number): T;

  /**
   * Gets the current number of elements in the collection
   */
  count(): number;
}