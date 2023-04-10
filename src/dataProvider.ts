import { DataProvider, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'https://my.api.com/';
const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter)
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { headers, json } = await httpClient(url);
    return {
      data: json,
      total: parseInt((headers.get('content-range') || '0').split('/').pop() || '0', 10)
    };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params}`);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids })
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id
      })
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { headers, json } = await httpClient(url);
    return {
      data: json,
      total: parseInt((headers.get('content-range') ?? '0').split('/').pop() || '0', 10)
    };
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options: fetchUtils.Options = {
      method: 'PUT',
      body: JSON.stringify(params.data)
    };
    const { json } = await httpClient(url, options);
    return { data: json };
  },

  updateMany: async (resource, params) => {
    const query = { filter: JSON.stringify({ id: params.ids }) };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const options: fetchUtils.Options = {
      method: 'PUT',
      body: JSON.stringify(params.data)
    };
    const { json } = await httpClient(url, options);
    return { data: json };
  },

  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const options: fetchUtils.Options = {
      method: 'POST',
      body: JSON.stringify(params.data)
    };
    const { json } = await httpClient(url, options);
    return {
      data: { ...params.data, id: json.id }
    };
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options: fetchUtils.Options = { method: 'DELETE' };
    const { json } = await httpClient(url, options);
    return { data: json };
  },

  deleteMany: async (resource, params) => {
    const query = { filter: JSON.stringify({ id: params.ids }) };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const options: fetchUtils.Options = { method: 'DELETE' };
    const { json } = await httpClient(url, options);
    return { data: json };
  }
};