import { Button } from "@mui/material"
import classes from "../style.module.scss"

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
                <li key={wallet.key}>
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
