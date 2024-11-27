export interface ApiResponse<T> {
  data?: T;
  status?: number;
  reason?: string;
  timeStamp: string;
}
