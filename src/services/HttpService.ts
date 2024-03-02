import axios from 'axios';
import { ServerResponse } from '@/types/ServerResponse.ts';
import { md5 } from 'js-md5';
import { getTimeStamp } from '@/utils/getTimeStamp.ts';

class Cache {
  private static storage = sessionStorage;
  private static prefix = 'axios-cache';

  public static has(action: string, params: unknown): boolean {
    return Boolean(
      this.storage.getItem(
        `${this.prefix}:${action}_${JSON.stringify(params)}`,
      ),
    );
  }

  public static get<T>(action: string, params: unknown): T | undefined {
    const item = this.storage.getItem(
      `${this.prefix}:${action}_${JSON.stringify(params)}`,
    );

    if (!item) {
      return;
    }

    return JSON.parse(item) as T;
  }

  public static add(action: string, params: unknown, response: unknown): void {
    this.storage.setItem(
      `${this.prefix}:${action}_${JSON.stringify(params)}`,
      JSON.stringify(response),
    );
  }
}

export class HttpService {
  private static readonly currentTimeStamp = getTimeStamp();
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
        console.error('Server response error status -', error.response?.status);

        const originalRequest = error.config;
        const currentRetryCount = originalRequest._retryCount ?? 0;

        if (
          error.response?.status === 500 &&
          currentRetryCount < this.RETRY_COUNT
        ) {
          originalRequest._retryCount = currentRetryCount + 1;

          return this.api.request(originalRequest);
        }

        throw error;
      },
    );
  }

  public static async request<T>(
    action: string,
    params: unknown,
    transformResponse?: (response: T) => T,
  ): Promise<T> {
    if (Cache.has(action, params)) {
      return Cache.get<T>(action, params)!;
    }

    const response = await this.api.post<ServerResponse<T>>('/', {
      action,
      params,
    });

    const result = transformResponse
      ? transformResponse(response.data.result)
      : response.data.result;

    Cache.add(action, params, result);

    return result;
  }
}

HttpService.initInterceptors();
