export function Res<
  T extends
    | 200
    | 201
    | 204
    | 301
    | 302
    | 400
    | 401
    | 403
    | 404
    | 405
    | 409
    | 429
    | 500
    | 502
    | 503
    | 511
    | (number & {}),
>(success: boolean, status: T, message?: string) {
  const statusMessages: Record<number, string> = {
    200: "OK",
    201: "Created",
    204: "No Content",
    301: "Moved Permanently",
    302: "Found",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    409: "Conflict",
    429: "Too Many Requests",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    511: "Network Authentication Required",
  }

  return {
    success,
    status,
    message: message ?? statusMessages[status] ?? "Unknown Status",
  }
}
