import axios from 'axios';
import JwtService from './jwtService';

export const API_URL = '/api/v1/';

const ApiService = {
    init() {
        axios.defaults.baseURL = API_URL;
    },

    setHeader() {
        axios.defaults.headers.common.Authorization = `Bearer ${JwtService.getToken()}`;
    },

    query(resource: any, params: any) {
        this.init();
        this.setHeader();
        return axios.get(resource, params).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    get(resource: any, slug = '') {
        this.init();
        this.setHeader();
        return axios.get(`${resource}/${slug}`).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resource: any, params: any) {
        this.init();
        this.setHeader();
        return axios.post(`${resource}`, params);
    },

    update(resource: any, slug: any, params: any) {
        this.init();
        this.setHeader();
        return axios.put(`${resource}/${slug}`, params);
    },

    put(resource: any, params: any) {
        this.init();
        this.setHeader();
        return axios.put(`${resource}`, params);
    },

    delete(resource: any) {
        this.init();
        this.setHeader();
        return axios.delete(resource).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },
};

export default ApiService;
