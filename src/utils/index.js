export const truncateAddress = (address, page) => {
  if (page === 'my-page') {
    if (!address) return ''
    const match = address.match(
      /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    )
    if (!match) return address
    return `${match[1]}…${match[2]}`
  } else {
    if (!address) return 'No Account'
    const match = address.match(
      /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    )
    if (!match) return address
    return `${match[1]}…${match[2]}`
  }
}

export const toHex = (num) => {
  const val = Number(num)
  return '0x' + val.toString(16)
}

export const urlToIpfs = (url) => {
  const arrUrl = url.split('/')
  const cid = arrUrl[arrUrl.length - 1]

  return `https://ipfs.io/ipfs/${cid}`
}

export const isMainnet = () => import.meta.env.VITE_NETWORK_ENV === 'mainnet'
