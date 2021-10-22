import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios';

abstract class Request {
    protected abstract baseUrl: string;
    protected abstract collection: string;
    protected abstract headers: Record<string, string>;

    private async req<T>(method: Method, url: string, params: any): Promise<T> {
        const response = await axios.request<T>(this.getOptions(method, url, params));
        return response.data;
    }

    protected get<T>(url: string, params?: any): Promise<T> {
        return this.req('GET', url, params);
    }

    protected post<T>(url: string, params?: any): Promise<T> {
        return this.req('POST', url, params);
    }

    private getOptions(method: Method, url: string, params?: any): AxiosRequestConfig {
        return ({
            method,
            params,
            headers: this.headers,
            url: this.getFullPath(url)
        })
    }

    private getFullPath(url: string): string {
        return `${this.getURL()}${url}`;
    }

    private getURL(): string {
        return `${this.baseUrl}${this.collection}`;
    }
}

export default Request;