import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import useKaikas from './useKaikas'
import useWeb3 from './useWeb3'
import useTokenPocket from './useTokenPocket'

const useCurrnetProvider = () => {
  const { type } = useSelector((store) => store.wallet)

  const metamask = useWeb3()
  const kaikas = useKaikas()
  const tokenpocket = useTokenPocket()

  const selected = useMemo(() => {
    if (!type) return
    return type.includes('metamask')
      ? metamask
      : type.includes('tokenpocket')
      ? tokenpocket
      : kaikas
  }, [type])

  return { ...selected }
}

export default useCurrnetProvider
