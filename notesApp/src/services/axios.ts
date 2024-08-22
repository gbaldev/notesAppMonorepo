import axios, {AxiosInstance, CancelTokenSource} from 'axios';
import HttpRequests from '../models/HttpRequest';
import Note from '../models/Note';

const GET_DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
};

type NavigationHandler = () => void;

class AxiosImpl implements HttpRequests {
  private axiosInstance: AxiosInstance;
  public signal: CancelTokenSource;
  private unauthorizedHandler: NavigationHandler | null = null;

  constructor() {
    this.axiosInstance = axios.create();
    this.signal = axios.CancelToken.source();
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response && error.response.status === 401) {
          if (this.unauthorizedHandler) {
            console.log({error}, {response: error.response});
            this.unauthorizedHandler();
          }
        }
        return Promise.reject(error);
      },
    );
  }

  setUnauthorizedHandler(handler: NavigationHandler) {
    this.unauthorizedHandler = handler;
  }

  cancelRequest = (reason: string) => {
    this.signal.cancel(reason);
    this.signal = axios.CancelToken.source();
  };

  setAxiosInstance = (axiosIns: AxiosInstance) => {
    this.axiosInstance = axiosIns;
  };

  setAuthHeader = (authHeader: string) => {
    this.axiosInstance.defaults.headers.common.Authorization = authHeader;
  };

  get = async (url: string, headers = GET_DEFAULT_HEADERS) => {
    const {data: _data} = await this.axiosInstance.request({
      method: 'get',
      headers,
      url,
    });
    return _data;
  };

  post = async (
    url: string,
    data: Partial<Note> | Partial<Note>[],
    headers = GET_DEFAULT_HEADERS,
  ) => {
    const {data: _data} = await this.axiosInstance.request({
      method: 'post',
      headers,
      url,
      data,
    });
    return _data;
  };

  delete = async (url: string, headers = GET_DEFAULT_HEADERS) => {
    const {data: _data} = await this.axiosInstance.request({
      method: 'delete',
      headers,
      url,
    });
    return _data;
  };

  put = async (
    url: string,
    data: Partial<Note> | Partial<Note>[],
    headers = GET_DEFAULT_HEADERS,
  ) => {
    const {data: _data} = await this.axiosInstance.request({
      method: 'put',
      headers,
      url,
      data,
    });
    return _data;
  };

  patch = async () => {
    // TO-DO patch implementation
  };
}

export default AxiosImpl;
