// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ApiResponse<T> {
    success: boolean;
    data: T;
    messages?: string[] | null;
    exception? : ExceptionDetailsResponse | null;
  }

interface ExceptionDetailsResponse {
    message: string;
    stackTrace?: string | null;
    innerExceptionMessage?: string | null;
}