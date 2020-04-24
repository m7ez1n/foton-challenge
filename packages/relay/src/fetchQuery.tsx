import { CacheConfig, RequestNode, UploadableMap, Variables } from 'relay-runtime';

import fetchWithRetries from './fetchWithRetries';

import { getHeaders, getRequestBody, handleData, isMutation } from './helpers';

export const PLATFORM = {
  APP: 'APP',
  WEB: 'WEB',
};

const fetchQuery = async (
  request: RequestNode,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables: UploadableMap | null,
) => {
  const body = getRequestBody(request, variables, uploadables);
  const token = localStorage.getItem('token');

  const headers = {
    appplatform: PLATFORM.WEB,
    ...getHeaders(uploadables),
    authorization: token ? `JWT ${token}` : null,
  };

  try {
    const response = await fetchWithRetries(process.env.GRAPHQL_URL, {
      method: 'POST',
      headers,
      body,
      fetchTimeout: 20000,
      retryDelays: [1000, 3000, 5000],
    });

    const data = await handleData(response);

    if (isMutation(request) && data.errors) {
      throw data;
    }

    if (!data.data) {
      throw data.errors;
    }

    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('err:', err);

    const timeoutRegexp = new RegExp(/Still no successful response after/);
    const serverUnavailableRegexp = new RegExp(/Failed to fetch/);
    if (timeoutRegexp.test(err.message) || serverUnavailableRegexp.test(err.message)) {
      throw new Error('Serviço indisponível. Tente novamente mais tarde.');
    }

    throw err;
  }
};

export default fetchQuery;
