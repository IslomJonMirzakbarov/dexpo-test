import { Button } from "@mui/material"
import classes from "../style.module.scss"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNonce, setSignature, setAccount} from "../../../store/wallet/wallet.slice";
import useUserNonce from '../../../hooks/useUserNonce'
import useVerifySign from "../../../hooks/useVerifySign";

const wallets = [
  {
    name:'MetaMask',
    key:'metamask',
    img:'https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png',
    isPopular:true
  },
  {
    name:'Kaikas',
    key:'kaikas',
    img:"https://www.yadawallets.com/wp-content/uploads/2021/10/Kaikas-wallet-logo.png",
    isPopular:false
  }
]


const LoginForm = () => {
  const dispatch = useDispatch()

  const { mutation } = useVerifySign()
  const [accountWallet, setAccountWallet] = useState("")
  const [message, setMessage] = useState("");
  const [sign, setSignatureState] = useState("");

  const { data } = useUserNonce(accountWallet)

  const handleMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      getAccount()
    } else {
      alert('Please install MetaMask');
    }
  }

  const handleClick = (type) => {
    if(type === 'metamask') {
      handleMetaMask()
    }
  }

  async function getAccount() {
    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
    });
    const account = accounts[0];

    dispatch(setAccount(account))
    setAccountWallet(account)
  }

  useEffect(() => {
    const nonce = data?.data?.nonce
    if(!nonce) return

    setMessage(`Nonce: ${nonce}`)
    dispatch(setNonce(nonce))
  },[data])

  useEffect(() => {
    if(!message) return 

    handleSign()
  }, [message])
  
  useEffect(() => {
    if(!sign) return

    mutation.mutate({
      wallet_address: accountWallet,
      signature: sign
    })
  },[sign])

  const handleSign = async () => {
    const signature = await window.ethereum.request({method: 'personal_sign', params: [message, accountWallet]});
    dispatch(setSignature(signature))
    setSignatureState(signature)
  }



  return (
    <div className={classes.form}>
      <div className={classes.formArea}>
        <div className={classes.wallets}>
          <p>
            <b>Connect your wallet</b> one of available provider by importing or creating new one.
          </p>
          <ul>
            {
              wallets.map(wallet => 
                <li key={wallet.key} onClick={() => handleClick(wallet.key)}>
                  <div className={classes.info}>
                    <img src={wallet.img} alt={wallet.name} width={50}/>
                    <span>{wallet.name}</span>
                  </div>  
                  {wallet.isPopular && <Button>Popular</Button>}
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
