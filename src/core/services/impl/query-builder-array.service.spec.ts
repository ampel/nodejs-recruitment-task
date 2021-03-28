import { QueryBuilderArrayService } from './query-builder-array.service';
import { QueryBuilderOperator } from '../../enums/query-builder-operator.enum';

type Item = {
  id: number;
  price: number;
};

describe('QueryBuilderArrayService', () => {
  let queryBuilderService: QueryBuilderArrayService<Item>;

  beforeEach(() => {
    queryBuilderService = new QueryBuilderArrayService([
      { id: 101, price: 1000, date: '2020-01-01T09:00:00.000Z' },
      { id: 102, price: 1200, date: '2020-01-02T12:00:00.000Z' },
      { id: 103, price: 1400, date: '2020-01-03T15:00:00.000Z' },
      { id: 104, price: 1600, date: '2020-01-04T18:00:00.000Z' },
      { id: 105, price: 1800, date: '2020-01-05T21:00:00.000Z' },
    ]);
  });

  describe('find()', () => {
    it('is defined of type function', () => {
      expect(queryBuilderService.find).toBeDefined();
      expect(typeof queryBuilderService.find).toBe('function');
    });

    it('is able to return first element with the given id', () => {
      const result = queryBuilderService.find('id', 102);
      expect(result).toEqual({
        id: 102,
        price: 1200,
        date: '2020-01-02T12:00:00.000Z',
      });
    });

    it('should return an empty value when an element does not exist', () => {
      const result = queryBuilderService.find('id', 100);
      expect(result).toBeUndefined();
    });
  });

  describe('where()', () => {
    it('is defined of type function', () => {
      expect(queryBuilderService.where).toBeDefined();
      expect(typeof queryBuilderService.where).toBe('function');
    });

    it('is able to filter elements with value equal to the given value', () => {
      const result = queryBuilderService.where(
        'price',
        QueryBuilderOperator.EQ,
        1400,
      );
      expect(result.all()).toHaveLength(1);
      expect(result.all()).toEqual([
        { id: 103, price: 1400, date: '2020-01-03T15:00:00.000Z' },
      ]);
    });

    it('is able to filter elements with value greater than the given value', () => {
      const result = queryBuilderService.where(
        'price',
        QueryBuilderOperator.GT,
        1400,
      );
      expect(result.all()).toHaveLength(2);
      expect(result.all()).toEqual([
        { id: 104, price: 1600, date: '2020-01-04T18:00:00.000Z' },
        { id: 105, price: 1800, date: '2020-01-05T21:00:00.000Z' },
      ]);
    });

    it('is able to filter elements with value greater than or equal to the given value', () => {
      const result = queryBuilderService.where(
        'price',
        QueryBuilderOperator.GTE,
        1400,
      );
      expect(result.all()).toHaveLength(3);
      expect(result.all()).toEqual([
        { id: 103, price: 1400, date: '2020-01-03T15:00:00.000Z' },
        { id: 104, price: 1600, date: '2020-01-04T18:00:00.000Z' },
        { id: 105, price: 1800, date: '2020-01-05T21:00:00.000Z' },
      ]);
    });

    it('is able to filter elements with value less than the given value', () => {
      const result = queryBuilderService.where(
        'price',
        QueryBuilderOperator.LT,
        1400,
      );
      expect(result.all()).toHaveLength(2);
      expect(result.all()).toEqual([
        { id: 101, price: 1000, date: '2020-01-01T09:00:00.000Z' },
        { id: 102, price: 1200, date: '2020-01-02T12:00:00.000Z' },
      ]);
    });

    it('is able to filter elements with value less than or equal to the given value', () => {
      const result = queryBuilderService.where(
        'price',
        QueryBuilderOperator.LTE,
        1400,
      );
      expect(result.all()).toHaveLength(3);
      expect(result.all()).toEqual([
        { id: 101, price: 1000, date: '2020-01-01T09:00:00.000Z' },
        { id: 102, price: 1200, date: '2020-01-02T12:00:00.000Z' },
        { id: 103, price: 1400, date: '2020-01-03T15:00:00.000Z' },
      ]);
    });
  });

  describe('whereDate()', () => {
    it('is defined of type function', () => {
      expect(queryBuilderService.whereDate).toBeDefined();
      expect(typeof queryBuilderService.whereDate).toBe('function');
    });

    it('is able to filter elements with value equal to the given value', () => {
      const result = queryBuilderService.whereDate(
        'date',
        QueryBuilderOperator.EQ,
        'Fri, 03 Jan 2020 15:00:00 GMT',
      );
      expect(result.all()).toHaveLength(1);
      expect(result.all()).toEqual([
        { id: 103, price: 1400, date: '2020-01-03T15:00:00.000Z' },
      ]);
    });

    it('is able to filter elements with value greater than the given value', () => {
      const result = queryBuilderService.whereDate(
        'date',
        QueryBuilderOperator.GT,
        'Fri, 03 Jan 2020 15:00:00 GMT',
      );
      expect(result.all()).toHaveLength(2);
      expect(result.all()).toEqual([
        { id: 104, price: 1600, date: '2020-01-04T18:00:00.000Z' },
        { id: 105, price: 1800, date: '2020-01-05T21:00:00.000Z' },
      ]);
    });

    it('is able to filter elements with value greater than or equal to the given value', () => {
      const result = queryBuilderService.whereDate(
        'date',
        QueryBuilderOperator.GTE,
        'Fri, 03 Jan 2020 15:00:00 GMT',
      );
      expect(result.all()).toHaveLength(3);
      expect(result.all()).toEqual([
        { id: 103, price: 1400, date: '2020-01-03T15:00:00.000Z' },
        { id: 104, price: 1600, date: '2020-01-04T18:00:00.000Z' },
        { id: 105, price: 1800, date: '2020-01-05T21:00:00.000Z' },
      ]);
    });

    it('is able to filter elements with value less than the given value', () => {
      const result = queryBuilderService.whereDate(
        'date',
        QueryBuilderOperator.LT,
        'Fri, 03 Jan 2020 15:00:00 GMT',
      );
      expect(result.all()).toHaveLength(2);
      expect(result.all()).toEqual([
        { id: 101, price: 1000, date: '2020-01-01T09:00:00.000Z' },
        { id: 102, price: 1200, date: '2020-01-02T12:00:00.000Z' },
      ]);
    });

    it('is able to filter elements with value less than or equal to the given value', () => {
      const result = queryBuilderService.whereDate(
        'date',
        QueryBuilderOperator.LTE,
        'Fri, 03 Jan 2020 15:00:00 GMT',
      );
      expect(result.all()).toHaveLength(3);
      expect(result.all()).toEqual([
        { id: 101, price: 1000, date: '2020-01-01T09:00:00.000Z' },
        { id: 102, price: 1200, date: '2020-01-02T12:00:00.000Z' },
        { id: 103, price: 1400, date: '2020-01-03T15:00:00.000Z' },
      ]);
    });
  });

  describe('all()', () => {
    it('is defined of type function', () => {
      expect(queryBuilderService.all).toBeDefined();
      expect(typeof queryBuilderService.all).toBe('function');
    });

    it('is able to return all elements in the collection', () => {
      const result = queryBuilderService.all();
      expect(result).toEqual([
        { id: 101, price: 1000, date: '2020-01-01T09:00:00.000Z' },
        { id: 102, price: 1200, date: '2020-01-02T12:00:00.000Z' },
        { id: 103, price: 1400, date: '2020-01-03T15:00:00.000Z' },
        { id: 104, price: 1600, date: '2020-01-04T18:00:00.000Z' },
        { id: 105, price: 1800, date: '2020-01-05T21:00:00.000Z' },
      ]);
    });
  });

  describe('paginate()', () => {
    it('is defined of type function', () => {
      expect(queryBuilderService.paginate).toBeDefined();
      expect(typeof queryBuilderService.paginate).toBe('function');
    });

    it('is able to return elements of the collection relative to the given offset and limit', () => {
      const result = queryBuilderService.paginate(2, 2);
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: 102, price: 1200, date: '2020-01-02T12:00:00.000Z' },
        { id: 103, price: 1400, date: '2020-01-03T15:00:00.000Z' },
      ]);
    });

    it('should return elements when the limit is greater than the number of element in the collection', () => {
      const result = queryBuilderService.paginate(2, 10);
      expect(result).toHaveLength(4);
      expect(result).toEqual([
        { id: 102, price: 1200, date: '2020-01-02T12:00:00.000Z' },
        { id: 103, price: 1400, date: '2020-01-03T15:00:00.000Z' },
        { id: 104, price: 1600, date: '2020-01-04T18:00:00.000Z' },
        { id: 105, price: 1800, date: '2020-01-05T21:00:00.000Z' },
      ]);
    });

    it('should return an empty collection when the offset is greater than the number of element in the collection', () => {
      const result = queryBuilderService.paginate(10, 2);
      expect(result).toHaveLength(0);
    });
  });

  describe('count()', () => {
    it('is defined of type function', () => {
      expect(queryBuilderService.count).toBeDefined();
      expect(typeof queryBuilderService.count).toBe('function');
    });

    it('is able to return the number of elements in the collection', () => {
      const result = queryBuilderService.count();
      expect(result).toEqual(5);
    });
  });
});
