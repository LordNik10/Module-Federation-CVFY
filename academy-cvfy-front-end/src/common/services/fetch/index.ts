import config from 'config/config';
import { useToken } from 'common/hooks/useToken';
import CustomError from '../customError';

interface IParams {
  headers: Record<string, string>;
  method: string;
  body: any;
}

export async function callFetch(
  endpoint: string,
  {
    baseUrl = config.endPointUrl,
    body = null,
    method = 'GET',
    isAuth = config.fetchAuthDefaultValue,
    overrideParams = {} as { [key: string]: any },
  } = {},
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getToken, clearToken } = useToken();
  const params: IParams = {
    headers: {
      'Content-Type': 'application/json',
      ...overrideParams.headers,
    },
    method,
    body: {},
    ...overrideParams,
  };

  if (method === 'GET' && !!body) {
    throw new CustomError({
      description: 'Request with GET method cannot have body.',
    });
  }

  if (
    method !== 'GET' &&
    params.headers['Content-Type'] === 'application/json'
  ) {
    params.body = JSON.stringify(body);
  } else {
    params.body = body;
  }

  if (isAuth) {
    const token = getToken();
    if (!token) {
      return {
        ok: false,
        status: 401,
        headers: { get: () => {} },
        json: () => {},
      };
    }
    params.headers.Token = token;
  }

  const res = await fetch(`${baseUrl}/${endpoint}`, params);

  if (!res.ok) {
    if (res.status === 401 && isAuth) {
      clearToken();
    }
    throw new CustomError({
      message: res.statusText,
      statusCode: res.status,
      description: res.statusText,
    });
  }
  return res;
}
