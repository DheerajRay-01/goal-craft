    interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export function apiResponse<T>(
  success: boolean,
  message: string,
  status: number = 200,
  data?: T
): Response {
  const body: ApiResponse<T> = {
    success,
    message,
    ...(data !== undefined && { data }),
  };

  return Response.json(body, { status });
}
