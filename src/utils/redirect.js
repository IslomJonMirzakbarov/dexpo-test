export const redirectTx = (tx) =>
  `${import.meta.env.VITE_KLAYTN_URL}tx/${tx}?tabId=txList`;

export const redirectAccount = (tx) =>
  `${import.meta.env.VITE_KLAYTN_URL}account/${tx}?tabId=txList`;
