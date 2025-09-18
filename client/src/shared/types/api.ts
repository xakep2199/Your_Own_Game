export interface ServerResponseType<T = any> {
  data: T;
  message?: string;
  success: boolean;
}
