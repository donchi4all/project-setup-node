export declare type PaginationParams = {
  page: number;
  limit: number;
};

export declare type SortParams = {
  key: string;
  order: 'ASC' | 'DESC';
};

export declare type FilterParams = Array<{
  key: string;
  values: Array<string>
}>;

export declare type ListResponseMetaType = {
  page?: number,
  pageCount?: number,
  lastPage?: number,
  total?: number,
  skipped?: number,

  next?: string,
  previous?: string,
  perPage?: number,
}

/**
 * can be extended to include other filter options unique to models
 */
export declare type ListOptionType = {
  // only when useCursor is set to false
  page?: number, 
  limit?: number,

  from?: string,
  to?: string,
  skip?: number,

  orderBy?: string,

  search?: string,
  filter?: string,

  useCursor?: boolean,
  next?: string,
  download?: boolean

  accountId?: string
}

/**
 * JUST FOR "tsoa" NPM PACKAGE
 * ---
 * This type we need to implement in necessary files like a duplicate!
 * Do not use it from a global declaration!
 * ---
 * If the type OmitCustom comes from a dependency ("src/types/omit.d.ts"),
 * we have to create an interface or a type in our own code that has the same structure.
 * Tsoa can not utilize interfaces or types from external dependencies.
 * Read more at https://github.com/lukeautry/tsoa/blob/master/docs/ExternalInterfacesExplanation.MD
 */

export type PaginationCollection<T> = {
  data: Array<T>,
  meta: any
}