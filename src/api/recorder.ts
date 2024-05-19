/* eslint-disable no-debugger */
import axios, { AxiosInstance } from 'axios';
import { WORKERS } from './config';
import { formatYear } from '@/utils';

class RecorderApi {
  firebaseIdToken?: string;

  usersWorker: AxiosInstance;

  constructor() {
    this.usersWorker = this.createAxiosInstance(WORKERS.USERS_WORKER);
  }

  createAxiosInstance(baseURL: string): AxiosInstance {
    const instance = axios.create({
      baseURL,
      headers: {},
    });

    return instance;
  }

  generateHistory = async ({
    currentYear,
    location,
  }: {
    currentYear: number;
    location: string;
  }) => {
    const { data } = await this.usersWorker.post('/scroll-to-history', {
      currentYear: formatYear(currentYear),
      location,
      imageCount: 4,
    });

    return data.map((item: any) => ({
      ...item,
      location: location,
      currentYear: currentYear,
    }));
  };
}

const recorderApi = new RecorderApi();

export default recorderApi;
