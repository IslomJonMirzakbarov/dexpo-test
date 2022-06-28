import { Button } from "@mui/material"
import classes from "../style.module.scss"
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../../constants/connectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { walletActions } from "../../../store/wallet/wallet.slice";
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
  const { activate, account, } = useWeb3React();
  const { data } = useUserNonce(account)

  const handleClick = (type) => {
    if(type === 'metamask') activate(connectors.injected)
  }

  console.log(account);

  useEffect(() => {
    // if(!account) return
    console.log(data);
    // dispatch(walletActions.setAccount(account))
  },[data])

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
