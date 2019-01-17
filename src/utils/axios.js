import axios from 'axios';

export default (url, options = {}) => {
  const {method = 'GET', data = {}} = options;

  return axios({
    method,
    baseURL: `${NODE_API_DOMAIN}:${NODE_API_PORT}/api`,
    url,
    data: method !== 'GET' ? data : undefined,
    params: method === 'GET' ? data : undefined
  });
};
