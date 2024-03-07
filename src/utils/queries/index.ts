import _ from 'lodash';
import { Op, Sequelize, WhereOptions } from 'sequelize';
import { IPagination, IQuery, IQueryData } from './interface';
import { Model, FindAndCountOptions } from 'sequelize';
import { Workbook } from 'exceljs';
import fs from 'fs';
import puppeteer from 'puppeteer';
import secret from './../../modules/secret';


export enum ExportEnum {
    PDF = 'pdf',
    EXCEL = 'excel',
}

const buildProjection = async (projections: string) => {
    const projection = projections.split(','); // Projection should be comma separated. eg. name,location
    const num = projection.length;
    const last = num - 1;
    const select: any = {};
    for (const n in projection) {
        if (typeof projection[n] === 'string') {
            select[projection[n]] = 1;
            if ((n as any) * 1 === last) {
                return select;
            }
        } else {
            if ((n as any) * 1 === last) {
                return select;
            }
        }
    }
};

export const getAllQuery1 = async ({ queries, model, populate }: IQueryData) => {
    let query: IQuery;

    if (queries.search) {
        query = queries.search;
        // Clean appId and userId

        const resp = await model.search(query);
        return JSON.parse(JSON.stringify(resp));
    } else {
        query = queries;
        const _query: any = {};
        const projection = query.select; // Projection should be comma separated. eg. name,location
        let ourProjection: IQuery;

        if (projection) {
            ourProjection = await buildProjection(projection);
            delete query.select;
        }
        let limit = query.limit * 1;
        if (limit) {
            delete query.limit;
        }
        const page = query.page * 1 || 0;
        if (page || page === 0) {
            delete query.page;
        }

        const from = query.from;
        let to = query.to;
        if (from) {
            query.createdAt = {};
            query.createdAt = { [Op.gte]: from };
            delete query.from;
            if (to) {
                delete query.to;
            } else {
                to = new Date().toISOString();
            }
            query.createdAt = { ...query.createdAt, [Op.lte]: to };
        } else {
            query.createdAt = {};
            query.createdAt = {
                [Op.gte]: new Date('1989-03-15T00:00:00').toISOString()
            };
            if (to) {
                delete query.to;
            } else {
                to = new Date().toISOString();
            }
            query.createdAt = { ...query.createdAt, [Op.lte]: to };
        }

        const sort = query.sort; // -fieldName: means descending while fieldName without the minus mean ascending bith by fieldName. eg, '-fieldName1 fieldName2'
        if (sort) {
            delete query.sort;
        }

        // let populate = query.populate; // Samples: 'name location' will populate name and location references. only supports this for now | 'name', 'firstname' will populate name reference and only pick the firstname attribute
        // if (populate) {
        //     delete query.populate;
        // }
        if (limit) {
            _query.limit = limit;
        } else {
            limit = 50;
            _query.limit = limit;
        }
        if (page) {
            _query.offset = page * limit;
        }
        _query.where = query;
        let totalResult = await model.count(_query);
        const total = await model.count({});

        _query.order = [['createdAt', 'DESC']];

        if (populate) {
            if (populate.length) {
                _query.include = populate;
            } else {
                _query.include = [populate];
            }
        }

        if (sort) {
            _query.order = [];
            const splitSort = sort.split(' ');
            for (const n in splitSort) {
                if (typeof splitSort[n] === 'string') {
                    if (splitSort[n][0] === '-') {
                        _query.order.push([splitSort[n].substr('1'), 'DESC']);
                    } else {
                        _query.order.push([splitSort[n], 'ASC']);
                    }
                }
            }
        }

        if (projection) {
            ourProjection._id = 1;
            _query.attributes = _.keys(ourProjection);
            const resp = await model.findAll(_query);
            const pagination: IPagination = {
                limit: 50,
                total: 0,
                totalResult: 0,
                isLastPage: true,
                pages: 0,
                currentPage: 1
            };
            const pages = Math.ceil((totalResult * 1) / (limit * 1));
            pagination.limit = limit * 1;
            pagination.total = total;
            pagination.totalResult = totalResult;
            // pagination.lastId = ourLastId;
            pagination.isLastPage = totalResult =
                page !== 0 && page + 1 === pages
                    ? true
                    : totalResult <= limit
                        ? true
                        : false;
            pagination.pages = Math.ceil((totalResult * 1) / (limit * 1));
            pagination.currentPage = page + 1;
            const data = {
                data: resp,
                pagination
            };
            return data;
        } else {
            const resp = await model.findAll(_query);
            const pagination: IPagination = {
                limit: 50,
                total: 0,
                totalResult: 0,
                isLastPage: true,
                pages: 0,
                currentPage: 1
            };
            const pages = Math.ceil((totalResult * 1) / (limit * 1));
            pagination.limit = limit * 1;
            pagination.total = total;
            // pagination.lastId = ourLastId;
            pagination.totalResult = totalResult;
            pagination.isLastPage =
                page !== 0 && page + 1 === pages
                    ? true
                    : totalResult <= limit
                        ? true
                        : false;
            pagination.pages = pages;
            pagination.currentPage = page + 1;

            const data = {
                data: resp,
                pagination
            };
            return data;
        }
    }
};

export const getSingleQuery = ({ params, queries, model }: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const _query: any = {};
            const id: string = params.id;
            const query = queries;
            let populate;
            if (query) {
                populate = query.populate; // Samples: 'name location' will populate name and location references. only supports this for now | 'name', 'firstname' will populate name reference and only pick the firstname attribute
            }
            _query.where = model.where = { _id: id };
            const resp = await model.findOne(_query);

            if (!resp) {
                resolve(resp);
            }
            resolve(resp.toJSON());
        } catch (error) {
            reject(error);
        }
    });
};

export const createQuery = ({ body, model }: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = body;
            if (data && data.secure) {
                delete data.secure;
            }

            let resp;
            if (data.length) {
                resp = await model.bulkCreate(data);
            } else {
                resp = await model.create(data);
            }
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
};

export const updateManyQuery = ({ body, queries, model }: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = queries;
            const _query: any = {};
            // Clean appId and userId

            const data = body;
            if (data && data.secure) {
                delete data.secure;
            }
            _query.where = query;
            const resp = await model.update(data, _query);
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
};

export const updateOneQuery = ({ body, params, model }: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const _query: any = {};
            const id = params.id;
            const data = body;
            if (data && data.secure) {
                delete data.secure;
            }
            _query.where = model.where = { _id: id };
            const resp = await model.update(data, _query);
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
};




// async function buildProjection1(select: string): Promise<any> {
//     if (!select) {
//         return null;
//     }

//     const fields = select.split(',').map((field) => field.trim());
//     const projection = fields.reduce((acc, field) => {
//         acc[field] = 1;
//         return acc;
//     }, {});

//     return projection;
// }

function buildSearchConditions(search: string): any[] {
    const fields = search.split(',').map((field) => field.trim());
    const conditions = fields.map((field) => ({
        [field]: {
            [Op.like]: `%${search}%`,
        },
    }));
    return conditions;
}




export const getAllQuery2 = async <T extends Model>(
    { queries, model, populate }: IQueryData
): Promise<{ data: T[]; pagination: IPagination }> => {
    const result: { data: T[]; pagination: IPagination } = {
        data: [],
        pagination: {
            limit: 50,
            total: 0,
            totalResult: 0,
            isLastPage: true,
            pages: 0,
            currentPage: 1,
        },
    };

    let query: IQuery;
    let { limit, page, search, from, to } = queries;

    if (search) {
        query = search;
        const resp = await model.search(query);
        result.data = JSON.parse(JSON.stringify(resp));
        return result;
    } else {
        query = queries;
        const _query: FindAndCountOptions = {
            where: {},
            order: [['createdAt', 'DESC']],
        };

        if (limit) {
            _query.limit = Number(limit);
            delete query.limit;
        } else {
            _query.limit = 50;
        }

        if (page || page === 0) {
            _query.offset = Number(page) * _query.limit;
            delete query.page;
        }

        if (from) {
            _query.where = {
                ...(to
                    ? {
                        createdAt: {
                            [Op.and]: [
                                { [Op.gte]: from },
                                { [Op.lte]: to },
                            ],
                        },
                    }
                    : {
                        createdAt: { [Op.gte]: from },
                    }),
            };
            delete query.from;
            delete query.to;
        } else {
            _query.where = {
                ...(to
                    ? {
                        createdAt: {
                            [Op.lte]: to,
                        },
                    }
                    : {}),
            };
            if (!to) {
                to = new Date().toISOString();
            }
            _query.where.createdAt = {
                [Op.gte]: new Date('1989-03-15T00:00:00').toISOString(),
                [Op.lte]: to,
            };
            delete query.to;
        }

        if (populate) {
            if (Array.isArray(populate)) {
                _query.include = populate;
            } else {
                _query.include = [populate];
            }
        }

        const { rows: data, count: totalResult } = await model.findAndCountAll(_query) as { rows: T[]; count: number };
        result.data = data;

        const pages = Math.ceil(totalResult / _query.limit);
        result.pagination.limit = _query.limit;
        result.pagination.total = await model.count();
        result.pagination.totalResult = totalResult;
        result.pagination.isLastPage =
            page !== 0 && page + 1 === pages
                ? true
                : totalResult <= _query.limit
                    ? true
                    : false;
        result.pagination.pages = pages;
        result.pagination.currentPage = page + 1;

        return result;
    }
};




export const getAllQuery = async <T extends Model>(
    { queries, model, populate, searchColumns }: IQueryData & { searchColumns: string[] }
): Promise<{ data: T[]; pagination: IPagination }> => {

    const formatDate = (date: Date) => date.toISOString();

    const result: { data: T[]; pagination: IPagination } = {
        data: [],
        pagination: {
            limit: 50,
            total: 0,
            totalResult: 0,
            isLastPage: true,
            pages: 0,
            currentPage: 1,
        },
    };

    let query: IQuery;
    let { limit, page, search, from, to, downloadFormat, ...otherConditions } = queries;


    const _query: FindAndCountOptions = {
        where: {} as any,
        order: [['updatedAt', 'DESC']],
    };

    if (limit) {
        _query.limit = Number(limit);
        // delete query.limit;
    } else {
        _query.limit = 50;
    }

    if (page || page === 0) {
        _query.offset = Number(page) * _query.limit;
        // delete query.page;
    }


    if (from && to) {

        // If 'from' is provided, set it to the start of the day
        const fromDate = new Date(from);
        // fromDate.setHours(0, 0, 0, 0);

        // If 'to' is provided, set it to the end of the day
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        _query.where = {
            ...({
                updatedAt: {
                    [Op.between]: [formatDate(fromDate), formatDate(toDate)],
                }
            })
        };
    }
    else if (from) {
        const fromDate = new Date(from);
        fromDate.setHours(0, 0, 0, 0);

        _query.where = {
            ...({
                updatedAt: {
                    [Op.lte]: formatDate(fromDate),
                }
            })
        };

    }
    else if (to) {
        // If only to is provided, set it to the end of the day
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        _query.where = {
            ...({
                updatedAt: {
                    [Op.lte]: formatDate(toDate),
                }
            })
        };
    }


    if (search && searchColumns && searchColumns.length > 0) {
        const searchQuery = searchColumns.map((column) => ({
            [column]: { [Op.like]: `%${search}%` },
        }));
        _query.where = {
            [Op.or]: searchQuery
        }

    }

    if (populate) {
        if (Array.isArray(populate)) {
            _query.include = populate;
        } else {
            _query.include = [populate];
        }
    }
    ;

    if (otherConditions) {
        const otherQuery = _query.where;
        const mergedQuery = {
            ...otherQuery,
            ...otherConditions, // Spread the properties of the `query` object into `mergedQuery`
        };
        _query.where = mergedQuery;
    }

    const { rows: data, count: totalResult } = await model.findAndCountAll(_query) as { rows: T[]; count: number };
    result.data = data;

    const pages = Math.ceil(totalResult / _query.limit);
    result.pagination.limit = _query.limit;
    result.pagination.total = await model.count({
        where: {
            ...(otherConditions && otherConditions?.tenantId && { tenantId: otherConditions.tenantId }),
            deletedAt: null
        },
    });
    result.pagination.totalResult = totalResult;
    result.pagination.isLastPage =
        page !== 0 && page + 1 === pages
            ? true
            : totalResult <= _query.limit
                ? true
                : false;
    result.pagination.pages = pages;
    result.pagination.currentPage = page + 1;

    if (downloadFormat === ExportEnum.EXCEL) {
        // Generate Excel file and attach download url
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet();

        // const headers = Object.keys(data[0].toJSON() ?? []);
        const headers = Object.keys(data[0]?.toJSON() ?? {});

        // generate columns from searchColumns
        worksheet.columns = headers.map(column => ({
            header: column?.toUpperCase(),
            key: column
        }));

        worksheet.addRows(data);
        const filePath = `files/export_${Date.now()}.xlsx`;
        await workbook.xlsx.writeFile(filePath);

        result.pagination.downloadUrl = `${secret.App.host}/${filePath}`;
    }

    if (downloadFormat === ExportEnum.PDF) {
        // const headers = Object.keys(data[0].toJSON() ?? []);
        const headers = Object.keys(data[0]?.toJSON() ?? {});

        // Generate PDF file and attach download url
        const html = convertToHtml(data, headers); // function to convert data to HTML

        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        await page.setContent(html);

        const buffer = await page.pdf({
            format: 'A4'
        });

        await browser.close();

        const filePath = `files/export_${Date.now()}.pdf`;

        fs.writeFileSync(filePath, buffer);
        result.pagination.downloadUrl = `${secret.App.host}/${filePath}`
    }


    return result;
};


const convertToHtml = (data: any, searchColumns: string[]) => {
    let html = `<table>`;

    // add header row 
    html += `<tr>`;
    searchColumns.forEach(column => {
        html += `<th>${column}</th>`;
    });
    html += `</tr>`;

    // add data rows
    data.forEach((row: { [x: string]: any; }) => {
        html += `<tr>`;
        searchColumns.forEach(column => {
            html += `<td>${row[column]}</td>`;
        });
        html += `</tr>`;
    });

    html += `</table>`;

    return html;
}