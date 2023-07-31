import { useDispatch } from 'react-redux'
import { setAccount, setType } from '../store/wallet/wallet.slice'

import useVerifySign from './useVerifySign'
import { customAPI } from '../services/api'
import { setToken } from '../store/auth/auth.slice'
import useToast from './useToast'
import useCurrnetProvider from './useCurrentProvider'

const useWallet = () => {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { addNetwork, switchNetwork } = useCurrnetProvider()

  const { mutation } = useVerifySign()

  const handleKaikas = () => {
    console.log('handleTokenpocket clicked')
    if (typeof window.klaytn !== 'undefined') {
      getAccount('kaikas')
    } else {
      toast.error('Please install Kaikas extension')
    }
  }

  const handleMetaMask = (walletType) => {
    if (window.ethereum.isTokenPocket) {
      toast.error(
        'Please remove Tokenpocket extension to continue with metamask'
      )
    } else if (walletType === 'metamask' && window.ethereum.isMetaMask) {
      getAccount('metamask')
    } else {
      toast.error('Please install MetaMask')
    }
  }

  const handleTokenPocket = (walletType) => {
    if (window.ethereum.isMetaMask) {
      toast.error(
        'Please remove Metamask extension to continue with tokenpocket'
      )
    } else if (walletType === 'tokenpocket' && window.ethereum.isTokenPocket) {
      getAccount('tokenpocket')
    } else {
      toast.error('Please install Tokenpocket')
    }
  }

  const handleClick = (type) => {
    if (type === 'metamask') handleMetaMask(type)
    else if (type === 'kaikas') handleKaikas()
    else if (type === 'tokenpocket') handleTokenPocket()
  }

  const getAccountsByType = async (walletType) => {
    let accounts
    try {
      if (walletType === 'metamask' && window.ethereum.isMetaMask)
        accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
      else if (walletType === 'tokenpocket' && window.ethereum.isTokenPocket)
        accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
      else if (walletType === 'kaikas') accounts = await window.klaytn.enable()
      return accounts
    } catch (err) {
      console.log(err)
    }
  }

  const getSignatureByType = async (message, account, type) => {
    let signature

    try {
      if (type === 'metamask')
        signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, account]
        })
      else if (type === 'tokenpocket')
        signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, account]
        })
      else if (type === 'kaikas')
        signature = await window.caver.klay.sign(message, account)

      return signature
    } catch (err) {
      console.log(err)
    }
  }

  async function getAccount(type) {
    try {
      const accounts = await getAccountsByType(type)

      const account = accounts[0]
      const nonce = await customAPI
        .get(`/api/user/nonce?wallet_address=${account}`)
        .then((res) => res?.data?.data?.nonce)

      const message = `Nonce: ${nonce}`

      const signature = await getSignatureByType(message, account, type)
      const walletType =
        type === 'metamask' || type === 'tokenpocket' ? 'metamask' : type

      mutation.mutate(
        {
          data: { wallet_address: account, signature: signature },
          type: walletType
        },
        {
          onSuccess: (e) => {
            dispatch(setToken(e?.data?.data?.token))
            dispatch(setAccount(account))
            dispatch(setType(type))
            handleNetwork()

            setTimeout(() => window.location.reload(), 300)
          }
        }
      )
    } catch (err) {
      console.log(err)
      hanldeLogout()
    }
  }

  const hanldeLogout = () => {
    dispatch(setToken(null))
    dispatch(setAccount(null))
    setTimeout(() => window.location.reload(), 300)
  }

  const handleNetwork = async () => {
    try {
      switchNetwork()
      // tokenRegister();
    } catch (err) {
      if (err.code === 4902) {
        addNetwork()
      }
    }
  }

  return {
    connectWallet: handleClick,
    handleNetwork
  }
}

export default useWallet
