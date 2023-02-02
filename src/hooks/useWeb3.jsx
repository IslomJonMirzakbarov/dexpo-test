import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import { useSelector } from 'react-redux'
import { ERC20_ABI } from '../utils/abi/ERC20ABI'
import { FIXED_MARKET_ABI } from '../utils/abi/FixedMarketABI'
import { AUCTION_MARKET_ABI } from '../utils/abi/AuctionMarketABI'
import { ERC721 } from '../utils/abi/ERC721ABI'
import { FAUCET_ABI } from '../utils/abi/FaucetABI'
import SingleABI from '../utils/abi/SingleABI'
import MultipleABI from '../utils/abi/MultipleABI'
import { FIXED_MULTI_MARKET_ABI } from '../utils/abi/FixedMultiMarketABI'

const web3 = new Web3(Web3.givenProvider)

export const conAddress = import.meta.env.VITE_ERC20_HASH
export const symbol = 'CONX'
export const fixedContract = import.meta.env.VITE_FIXED_MARKET_HASH
export const multiNftContract = '0x74f0c46692147Ac0F0E291326CAd1fE88cCcdDcC'
export const auctionContract = import.meta.env.VITE_AUCTION_MARKET_HASH
export const faucetContractEnv = import.meta.env.VITE_FAUCET_CONTRACT
export const approveAmount = import.meta.env.VITE_APPROVE_AMOUNT
export const tokenImg =
  'https://dexpo.s3.ap-northeast-2.amazonaws.com/1662393423341_con-token.png'
export const chainId = import.meta.env.VITE_CHAIN_ID
export const chainName = import.meta.env.VITE_CHAIN_NAME
export const rpcUrl = import.meta.env.VITE_RPC_URL
export const conName = import.meta.env.VITE_CON_NAME

const useWeb3 = () => {
  const { account } = useSelector((store) => store.wallet)
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    if (!account) return

    getUserBalance(account)
  }, [account])

  const tokenRegister = async () => {
    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: conAddress, // The address that the token is at.
            symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token,
            image: tokenImg
          }
        }
      })
      if (wasAdded) {
        console.log('Conx added successfully')
      } else {
        console.log('Fail on adding conx')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getUserBalance = async (acc) => {
    try {
      const contractERC20 = new web3.eth.Contract(ERC20_ABI, conAddress)

      const balance = await contractERC20.methods.balanceOf(acc).call()
      const res = web3.utils.fromWei(balance)

      setBalance(res)
      return res
    } catch (err) {
      console.log(err)
    }

    return 0
  }

  const checkAllowance = async (isFixed = true, type) => {
    const contract = isFixed
      ? type === 'M'
        ? multiNftContract
        : fixedContract
      : auctionContract
    const contractRC20 = new web3.eth.Contract(ERC20_ABI, conAddress)
    const allowance = await contractRC20.methods
      .allowance(account, contract)
      .call()

    return allowance
  }

  const checkAllowance721 = async (
    contract_address,
    isFixed = true,
    standard
  ) => {
    const contract = isFixed
      ? standard === 'M'
        ? multiNftContract
        : fixedContract
      : auctionContract
    const contractRC721 = new web3.eth.Contract(ERC721, contract_address)
    const allowance = await contractRC721.methods
      .isApprovedForAll(account, contract)
      .call()

    return allowance
  }

  const makeApprove721 = async (contract_address, isFixed = true, standard) => {
    const contract = isFixed
      ? standard === 'M'
        ? multiNftContract
        : fixedContract
      : auctionContract
    const contractERC721 = new web3.eth.Contract(ERC721, contract_address)
    const gasLimitApprove = await contractERC721.methods
      .setApprovalForAll(contract, true)
      .estimateGas({
        from: account
      })

    const approve = await contractERC721.methods
      .setApprovalForAll(contract, true)
      .send({
        from: account,
        gas: gasLimitApprove
      })

    return approve
  }

  const makeApprove = async (isFixed = true, type) => {
    const contract = isFixed
      ? type === 'M'
        ? multiNftContract
        : fixedContract
      : auctionContract
    const contractRC20 = new web3.eth.Contract(ERC20_ABI, conAddress)
    const gasLimitApprove = await contractRC20.methods
      .approve(contract, approveAmount)
      .estimateGas({
        from: account
      })

    const approve = await contractRC20.methods
      .approve(contract, approveAmount)
      .send({
        from: account,
        gas: gasLimitApprove
      })

    return approve
  }

  const sellMultipleNft = async (
    contract_address,
    tokenId,
    price,
    quantity
  ) => {
    const fixedMarket = new web3.eth.Contract(
      FIXED_MULTI_MARKET_ABI,
      multiNftContract
    )

    const gasLimit = await fixedMarket.methods
      .place(
        contract_address,
        tokenId,
        quantity,
        Web3.utils.toWei(String(price), 'ether')
      )
      .estimateGas({
        from: account
      })

    const result = await fixedMarket.methods
      .place(
        contract_address,
        tokenId,
        quantity,
        Web3.utils.toWei(String(price), 'ether')
      )
      .send({
        from: account,
        gas: gasLimit
      })

    return result
  }

  const sell = async (contract_address, tokenId, price, standard) => {
    const fixedMarket = new web3.eth.Contract(FIXED_MARKET_ABI, fixedContract)

    const gasLimit = await fixedMarket.methods
      .place(
        contract_address,
        tokenId,
        Web3.utils.toWei(String(price), 'ether')
      )
      .estimateGas({
        from: account
      })

    const result = await fixedMarket.methods
      .place(
        contract_address,
        tokenId,
        Web3.utils.toWei(String(price), 'ether')
      )
      .send({
        from: account,
        gas: gasLimit
      })

    return result
  }

  const purchaseMultiNft = async (nftId, quantity) => {
    const fixedMarket = new web3.eth.Contract(
      FIXED_MULTI_MARKET_ABI,
      multiNftContract
    )

    const gasLimit = await fixedMarket.methods
      .buy(+nftId, +quantity)
      .estimateGas({
        from: account
      })

    const result = await fixedMarket.methods.buy(+nftId, +quantity).send({
      from: account,
      gas: gasLimit
    })

    return result
  }

  const purchase = async (contract_address, tokenId) => {
    const fixedMarket = new web3.eth.Contract(FIXED_MARKET_ABI, fixedContract)

    const gasLimit = await fixedMarket.methods
      .buy(contract_address, tokenId)
      .estimateGas({
        from: account
      })

    const result = await fixedMarket.methods
      .buy(contract_address, tokenId)
      .send({
        from: account,
        gas: gasLimit
      })

    return result
  }

  const cancelMultipleNft = async (nftId) => {
    const fixedMarket = new web3.eth.Contract(
      FIXED_MULTI_MARKET_ABI,
      multiNftContract
    )

    const gasLimit = await fixedMarket.methods.unPlace(nftId).estimateGas({
      from: account
    })

    const result = await fixedMarket.methods.unPlace(nftId).send({
      from: account,
      gas: gasLimit
    })

    return result
  }

  const cancel = async (contract_address, tokenId) => {
    const fixedMarket = new web3.eth.Contract(FIXED_MARKET_ABI, fixedContract)

    const gasLimit = await fixedMarket.methods
      .unPlace(contract_address, tokenId)
      .estimateGas({
        from: account
      })

    const result = await fixedMarket.methods
      .unPlace(contract_address, tokenId)
      .send({
        from: account,
        gas: gasLimit
      })

    return result
  }

  const cancelAuction = async (contract_address, tokenId) => {
    const auctionMarket = new web3.eth.Contract(
      AUCTION_MARKET_ABI,
      auctionContract
    )

    const gasLimit = await auctionMarket.methods
      .cancelAuction(contract_address, tokenId)
      .estimateGas({
        from: account
      })

    const result = await auctionMarket.methods
      .cancelAuction(contract_address, tokenId)
      .send({
        from: account,
        gas: gasLimit
      })

    return result
  }

  const createAuction = async (
    contractAddress,
    tokenId,
    startPrice,
    startDate,
    endDate
  ) => {
    const price = Web3.utils.toWei(startPrice, 'ether')
    const auctionMarket = new web3.eth.Contract(
      AUCTION_MARKET_ABI,
      auctionContract
    )

    const gasLimit = await auctionMarket.methods
      .createAuction(contractAddress, tokenId, price, startDate, endDate)
      .estimateGas({
        from: account
      })

    const result = await auctionMarket.methods
      .createAuction(contractAddress, tokenId, price, startDate, endDate)
      .send({
        from: account,
        gas: gasLimit
      })

    return result
  }

  const bid = async (contract_address, tokenId, price) => {
    const weidPrice = Web3.utils.toWei(String(price), 'ether')
    const auctionMarket = new web3.eth.Contract(
      AUCTION_MARKET_ABI,
      auctionContract
    )

    const gasLimit = await auctionMarket.methods
      .bid(contract_address, tokenId, weidPrice)
      .estimateGas({
        from: account
      })

    const result = await auctionMarket.methods
      .bid(contract_address, tokenId, weidPrice)
      .send({
        from: account,
        gas: gasLimit
      })

    return result
  }

  const faucet = async (inputAccount) => {
    try {
      const faucetContract = new web3.eth.Contract(
        FAUCET_ABI,
        faucetContractEnv
      )
      const isClaimedWallet = await faucetContract.methods
        .isClaimed(inputAccount)
        .call()

      if (isClaimedWallet)
        return {
          success: false,
          message: 'Token was already claimed by this wallet address',
          data: null
        }

      const gasLimit = await faucetContract.methods
        .claimToken(inputAccount)
        .estimateGas({
          from: account
        })

      const result = await faucetContract.methods
        .claimToken(inputAccount)
        .send({
          from: account,
          gas: gasLimit
        })

      return {
        success: true,
        message: 'Token was successfuly claimed',
        data: result
      }
    } catch (err) {
      console.log(err)

      return {
        success: false,
        message: 'Transaction error',
        data: null
      }
    }
  }

  const addNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainName: chainName,
          chainId: web3.utils.toHex(chainId),
          nativeCurrency: { name: conName, decimals: 18, symbol: conName },
          rpcUrls: [rpcUrl]
        }
      ]
    })
  }

  const switchNetwork = async () => {
    await web3.currentProvider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: web3.utils.toHex(chainId),
          chainName: chainName,
          rpcUrls: [rpcUrl],
          nativeCurrency: {
            name: conName,
            decimals: 18,
            symbol: conName
          }
        }
      ]
    })
  }

  const mint = async (
    metadata,
    tokenQuantity = 1,
    contractAddress,
    collectionType = 'S'
  ) => {
    const isMultiple = collectionType === 'M'
    const contract = isMultiple
      ? new web3.eth.Contract(MultipleABI, contractAddress)
      : new web3.eth.Contract(SingleABI, contractAddress)
    try {
      const gasPrice = await web3.eth.getGasPrice()
      const estimatedGas = isMultiple
        ? await contract.methods
            .mint(account, tokenQuantity, metadata)
            .estimateGas({
              gasPrice,
              from: account
            })
        : await contract.methods.mint(account, metadata).estimateGas({
            gasPrice,
            from: account
          })
      const res = isMultiple
        ? await contract.methods.mint(account, tokenQuantity, metadata).send({
            gasPrice,
            from: account,
            gas: estimatedGas
          })
        : await contract.methods.mint(account, metadata).send({
            gasPrice,
            from: account,
            gas: estimatedGas
          })
      return res
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const getTransactionReceipt = async (tx) => {
    try {
      const response = await web3.eth.getTransactionReceipt(tx)

      return response
    } catch (err) {
      console.log(err)

      return null
    }
  }

  return {
    bid,
    mint,
    sell,
    faucet,
    cancel,
    balance,
    purchase,
    addNetwork,
    makeApprove,
    tokenRegister,
    switchNetwork,
    cancelAuction,
    createAuction,
    getUserBalance,
    checkAllowance,
    makeApprove721,
    checkAllowance721,
    getTransactionReceipt,
    purchaseMultiNft,
    sellMultipleNft,
    cancelMultipleNft
  }
}

export default useWeb3
