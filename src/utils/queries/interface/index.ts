export interface IQuery {
    [key: string]: any;
}

export interface IQueryData {
    queries: IQuery;
    model: any;
    populate?: any;
}

export interface IPagination {
    limit: number;
    total: number;
    totalResult: number;
    isLastPage: boolean;
    pages: number;
    currentPage: number;
    downloadUrl?:string;
}
