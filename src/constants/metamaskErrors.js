export const metamaskError = {
  4001: 'User denied transaction signature.',
  '-32603': 'Not enough CYCON Amount',
  default: 'Metamask error'
}

export function getRPCErrorMessage(err) {
  if (err) return err?.message?.toUpperCase()

  var open = err.stack.indexOf('{')
  var close = err.stack.lastIndexOf('}')
  var j_s = err.stack.substring(open, close + 1)
  console.log(j_s, err)
  var j = JSON.parse(j_s)

  if (j?.message === 'execution reverted: Lack of balance') {
    return 'Not enough CYCON Amount'
  } else {
    return j?.message?.toUpperCase()
  }
}

// import React, { useMemo } from 'react';
// import { useSelector } from 'react-redux';
// import useKaikas from './useKaikas';
// import useWeb3 from './useWeb3';

// const useCurrnetProvider = () => {
//   const { type } = useSelector((store) => store.wallet);

//   const {
//     bid,
//     sell,
//     faucet,
//     cancel,
//     balance,
//     purchase,
//     addNetwork,
//     makeApprove,
//     tokenRegister,
//     switchNetwork,
//     cancelAuction,
//     createAuction,
//     checkAllowance,
//     makeApprove721,
//     checkAllowance721
//   } = useWeb3();
//   const {
//     bid: bidKaikas,
//     sell: sellKaikas,
//     faucet: faucetKaikas,
//     cancel: cancelKaikas,
//     balance: balanceKaikas,
//     purchase: purchaseKaikas,
//     addNetwork: addNetworkKaikas,
//     makeApprove: makeApproveKaikas,
//     tokenRegister: tokenRegisterKaikas,
//     switchNetwork: switchNetworkKaikas,
//     cancelAuction: cancelAuctionKaikas,
//     createAuction: createAuctionKaikas,
//     checkAllowance: checkAllowanceKaikass,
//     makeApprove721: makeApprove721Kaikas,
//     checkAllowance721: checkAllowance721Kaikas
//   } = useKaikas();
//   const isMetamask = useMemo(() => type?.includes('metamask'), [type]);
//   console.log(type, isMetamask);

//   return {
//     bid: isMetamask ? bid : bidKaikas,
//     sell: isMetamask ? sell : sellKaikas,
//     faucet: isMetamask ? faucet : faucetKaikas,
//     cancel: isMetamask ? cancel : cancelKaikas,
//     balance: isMetamask ? balance : balanceKaikas,
//     purchase: isMetamask ? purchase : purchaseKaikas,
//     addNetwork: isMetamask ? addNetwork : addNetworkKaikas,
//     makeApprove: isMetamask ? makeApprove : makeApproveKaikas,
//     tokenRegister: isMetamask ? tokenRegister : tokenRegisterKaikas,
//     switchNetwork: isMetamask ? switchNetwork : switchNetworkKaikas,
//     cancelAuction: isMetamask ? cancelAuction : cancelAuctionKaikas,
//     createAuction: isMetamask ? createAuction : createAuctionKaikas,
//     checkAllowance: isMetamask ? checkAllowance : checkAllowanceKaikass,
//     makeApprove721: isMetamask ? makeApprove721 : makeApprove721Kaikas,
//     checkAllowance721: isMetamask ? checkAllowance721 : checkAllowance721Kaikas
//   };
// };

// export default useCurrnetProvider;
