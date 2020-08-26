import Gateways from '.';
import {AxiosResponse} from 'axios';

export class HttpServiceBase {
  async GET(Url: string, param: any) {
    const response = await this.Try(() =>
      Gateways.get(Url, {
        params: param,
      }),
    );

    return response?.data ?? [];
  }
  async POST(Url: string, data: any, param: any) {
    const formData = new FormData();

    const keys = Object.keys(data);

    keys.forEach((key) => {
      formData.append(key, data[key]);
    });

    const response = await this.Try(() =>
      Gateways.post(Url, formData, {
        params: param,
      }),
    );
    return response?.data ?? [];
  }
  async DELETE(Url: string, param: any) {
    const response = await this.Try(() =>
      Gateways.delete(Url, {
        params: param,
      }),
    );
    return response?.data ?? {};
  }
  async PUT(Url: string, data: any, param: any) {
    const formData = new FormData();

    const keys = Object.keys(data);

    keys.forEach((key) => {
      formData.append(key, data[key]);
    });

    const response = await this.Try(() =>
      Gateways.put(Url, formData, {
        params: param,
      }),
    );
    return response?.data ?? [];
  }
  private Try = async (action: () => Promise<AxiosResponse<any>>) => {
    try {
      return await action();
    } catch (error) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      throw error;
    }
  };
}
