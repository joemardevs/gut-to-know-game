export default interface MiddlewareError extends Error {
  statusCode?: number;
}
