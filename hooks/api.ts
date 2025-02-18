export const HOST = 'uaht.io';
export const BASE = `https://${HOST}`;
export const ADDRESS = '0x0d9447e16072b636b4a1e8f2b8c644e58f3eaa6a';
export const DAO_ADDRESS = '0x08b491bc7848c6af42c3882794a93d70c04e5816';
export const CONTRACT = `https://polygonscan.com/token/${ADDRESS}`;
export const DAO_CONTRACT = `https://polygonscan.com/address/${DAO_ADDRESS}`;
export const CODE = 'https://github.com/starscrowding/UAHT';
export const TELEGRAM = 'https://t.me/uaht_io';
export const GIST = 'cf613fccf7a5c5a7d46b51b6fd1bfb87';
export const RESERVE = `https://api.github.com/gists/${GIST}`;
export const RESERVE_URL = `https://gist.github.com/${GIST}`;
export const INFO = `https://t.me/uaht_info`;
export const FAQ = `${CODE}/blob/dev/FAQ.md`;
export const DAO = 'https://t.me/uaht_group';
export const TOKEN_LIST = `${BASE}/tokenlist.json`;
export const WALLET_CONNECT = 'abf8b212906905d826da0549a00a0fd2';
export const ENDPOINT = {
  token: {
    set: '/api/token/set',
  },
};

export const api = async (url: RequestInfo, params?: RequestInit) => {
  return fetch(url, params).then(res => res.json());
};

export const post = async (url: RequestInfo, body: any, params?: RequestInit) => {
  return await api(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...params,
  });
};

export const fetcher = (...args: any) => api.apply(null, args);
