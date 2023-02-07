import React from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { securedAPI } from '../services/api'

const getHistory = (token, { contract_address, token_id, page, size }) =>
  securedAPI(token)
    .get(`/api/nft/history`, {
      params: {
        contract_address,
        token_id,
        page,
        size
      }
    })
    .then((res) => res?.data?.data)

const useNFTHistoryAPI = ({
  contractAddress,
  tokenId,
  page = 1,
  size = 10
}) => {
  const { token } = useSelector((store) => store.auth)

  const { data, isLoading, refetch } = useQuery(
    `GET-NFT-HISTORY-${contractAddress}-${tokenId}-${page}-${size}`,
    () =>
      getHistory(token, {
        contract_address: contractAddress,
        token_id: tokenId,
        page,
        size
      }),
    {
      enabled: !!contractAddress && !!tokenId
    }
  )

  return { data, isLoading, refetch }
}

export default useNFTHistoryAPI
