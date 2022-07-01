import { Button } from "@mui/material"
import classes from "../style.module.scss"
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../../constants/connectors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNonce, setSignature, walletActions } from "../../../store/wallet/wallet.slice";
import useUserNonce from '../../../hooks/useUserNonce'

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
  const { activate, account, library } = useWeb3React();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { data } = useUserNonce(account)

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      
      dispatch(setSignature(signature))
    } catch (error) {
      setError(error);
    }
  };

  const handleClick = (type) => {
    if(type === 'metamask') activate(connectors.injected)
  }

  useEffect(() => {
    const nonce = data?.data?.nonce
    if(!nonce) return

    setMessage(String(nonce))
    dispatch(setNonce(String(nonce)))
  },[data])

  useEffect(() => {
    if(!message) return

    signMessage()
  },[message])

  return (
    <div className={classes.form}>
      <div className={classes.formArea}>
        <div className={classes.wallets}>
          <p>
            <b>Connect your wallet</b> one of available provider by importing or creating new one.
          </p>
          { error && <p style={{ color: 'red' }}>{error}</p> }
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
