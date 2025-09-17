import { Repository, Sequelize, Model } from 'sequelize-typescript';

import Secret from '../secret';
import config from '../../config';
import { Op, OrderItem } from 'sequelize';
import Models from '../../api/models';
import { ListOptionType } from 'pagination';
import { startOfDay, endOfDay } from '../../utils';
import { LoggerDecorator, LoggerInterface } from '../logger';

type FilteringObjectType = {
  [key: string]: Array<string>;
};

type ListResponseMetaType = {
  page?: number;
  pageCount?: number;
  totalPages?: number;
  skipped?: number;

  next?: string;
  previous?: string | number;
  limit?: number;
};

export type PaginationCollection<T> = {
  data: Array<T>;
  last?: boolean;
  meta: ListResponseMetaType;
};
class Database {
  @LoggerDecorator('Database')
  private log: LoggerInterface;
  private sequelize: Sequelize;

  public init(): void {
    this.sequelize = new Sequelize({
      ...Secret.Db,
      pool: { max: 5 },
      models: Object.values(Models),
      logging: false,
    });
  }

  public async rawQuery(queryString: string): Promise<[unknown[], unknown]> {
    try {
      return this.sequelize.query(queryString);
    } catch (err) {
      this.log.error('Fail raw query', err);
    }
  }

  public getSequelize() {
    if (!this.sequelize) {
      this.init();
    }

    return this.sequelize;
  }

  public applySearch(search: string, searchableColumns: Array<string>) {
    search = search && search.trim().replace(/('|%|_)/g, '\\$1'); // Escape the special chars

    return (
      search && {
        [Op.or]: searchableColumns.map((column) => {
          return { [column]: { [Op.like]: `%${search}%` } };
        }),
      }
    );
  }

  public applyFilter(filter: string, filterableColumns: Array<string> = []): FilteringObjectType {
    const filterCriteria = filter.split(';');

    return (
      filter &&
      filterCriteria.reduce((result, item) => {
        const [key, value] = item.split(':');
        if (!filterableColumns.includes(key)) return result;

        return {
          ...result,
          [key]: { [Op.in]: value.split(',') },
        };
      }, {} as any)
    );
  }

  public applyDateRange(from: string, to: string) {
    return {
      ...(from && { createdAt: { [Op.gte]: startOfDay(from) } }),
      ...(to && { createdAt: { [Op.lte]: endOfDay(to) } }),
    };
  }

  public applyOrder(orderBy: string): OrderItem[] {
    const [column, direction] = orderBy?.split(':') ?? [];

    return (
      (column && [[column, direction || 'DESC']]) || [
        ['createdAt', 'DESC'],
        ['id', 'DESC'],
      ]
    );
  }

  public paginate(useCursor: boolean, query: object, options: ListOptionType) {
    return useCursor
      ? this.paginateWithCursor(query, options)
      : this.paginateDefault(query, options);
  }

  public paginateWithCursor(query: any, { next, limit }: ListOptionType) {
    const decodedNext = next && Buffer.from(next, 'base64').toString('ascii').split('#');
    const createdAt = decodedNext && (new Date(`${decodedNext[1]} GMT`) ?? undefined);
    const id = decodedNext && (decodedNext[0] ?? undefined);
    limit = limit || config.defaults.pageLimit;

    query['limit'] = limit + 1;
    query['where'] = {
      ...(query['where'] ?? {}),
      ...(decodedNext && {
        [Op.and]: {
          createdAt: { [Op.lte]: createdAt },
          [Op.and]: {
            id: { [Op.lte]: id },
            [Op.or]: { createdAt: { [Op.lte]: createdAt } },
          },
        },
      }),
    };

    return query;
  }

  public paginateDefault(query: any, { page, limit, skip }: ListOptionType) {
    limit = limit || config.defaults.pageLimit;
    query['limit'] = limit;
    query['offset'] = (page - 1) * limit;

    return query;
  }

  public extractPaginationMeta(useCursor: boolean, data: any) {
    let meta: ListResponseMetaType;

    return { meta, data };
  }
}

const database = new Database();

export default database;
export const sequelize = database.getSequelize();
