import axios from 'axios';
import { ServerResponse } from '@/types/ServerResponse.ts';
import { md5 } from 'js-md5';
import { getTimeStamp } from '@/utils/getTimeStamp.ts';

export class HttpService {
  private static currentTimeStamp = getTimeStamp();
  private static readonly RETRY_COUNT = 3;
  private static api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  });

  public static initInterceptors(): void {
    this.api.interceptors.request.use((config) => {
      config.headers.set(
        'X-Auth',
        md5(`${import.meta.env.VITE_SERVER_AUTH}_${this.currentTimeStamp}`),
      );
      return config;
    });

    this.api.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        console.error(error.response?.status);

        const originalRequest = error.config;

        if ((originalRequest._retryCount ?? 0) < this.RETRY_COUNT) {
          originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;

          return this.api.request(originalRequest);
        }

        throw error;
      },
    );
  }

  public static async request<T>(action: string, params: unknown): Promise<T> {
    const response = await this.api.post<ServerResponse<T>>('/', {
      action,
      params,
    });

    return response.data.result;
  }
}

HttpService.initInterceptors();
