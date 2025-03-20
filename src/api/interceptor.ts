import axios, { AxiosInstance } from "axios";

export const AxiosProvider = {
    useFactory: (): AxiosInstance => {
      return axios.create({
        baseURL: 'https://api.mailersend.com/v1/email',
        headers: {
          'api-key': process.env.VUE_APP_API_KEY_EMAIL || '',
          'Content-Type': 'application/json',
        },
      });
    },
  };