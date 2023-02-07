import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { securedAPI } from '../services/api'

const getMultiNFTOffers = (token, { contract_address, token_id, page, size }) =>
  securedAPI(token)
    .get(`/api/nft/multiNftOffers`, {
      params: {
        contract_address,
        token_id,
        page,
        size
      }
    })
    .then((res) => res?.data?.data)

const useMultiNFTOffers = ({
  contractAddress,
  tokenId,
  page = 1,
  size = 10
}) => {
  const { token } = useSelector((store) => store.auth)

  const { data, isLoading, refetch } = useQuery(
    `GET-MULTIPLE-NFT-${contractAddress}-${tokenId}-${page}-${size}`,
    () =>
      getMultiNFTOffers(token, {
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

export default useMultiNFTOffers
