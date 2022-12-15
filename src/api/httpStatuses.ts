export default {
  success:        { code: 200, message: 'SUCCESS' },
  created:        { code: 201, message: 'CREATED' },
  accepted:       { code: 202, message: 'ACCEPTED' },
  deleted:        { code: 204, message: 'DELETED' },
  badReguest:     { code: 400, message: 'BAD_REQUEST' },
  unauthorized:   { code: 401, message: 'UNAUTHORIZED' },
  notFound:       { code: 404, message: 'NOT_FOUND' },
  gatewayTimeout: { code: 408, message: 'GATEWAY_TIMEOUT' },
  conflict:       { code: 409, message: 'CONFLICT' },
  internal:       { code: 500, message: 'INTERNAL_SERVER_ERROR' },
  notImplemented: { code: 501, message: 'NOT_IMPLEMENTED' },
  unavailable:    { code: 503, message: 'SERVICE_UNAVAILABLE' }
};
