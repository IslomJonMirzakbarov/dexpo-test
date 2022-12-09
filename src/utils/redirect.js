export const redirectTx = (tx) =>
  import.meta.env.PROD
    ? `https://scope.klaytn.com/tx/${tx}?tabId=txList`
    : `https://baobab.scope.klaytn.com/tx/${tx}?tabId=txList`;

export const redirectAccount = (tx) =>
  import.meta.env.PROD
    ? `https://scope.klaytn.com/account/${tx}?tabId=txList`
    : `https://baobab.scope.klaytn.com/account/${tx}?tabId=txList`;
