import { Typography } from '@mui/material';
import classes from '../style.module.scss';
import useWallet from '../../../hooks/useWallet';

const wallets = [
  {
    name: 'MetaMask',
    key: 'metamask',
    img: 'https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png',
    isPopular: true
  },
  {
    name: 'Kaikas',
    key: 'kaikas',
    img: 'https://3237190568-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzvgdDSwmwvJE7FLb6FCc%2Ficon%2FzKemLV4grODY1vlxlTrU%2Fsymbol_multi_solid.png?alt=media&token=53643768-91b6-41cb-8a9f-52d6b1194550',
    isPopular: false
  }
];

const LoginForm = () => {
  const { connectWallet } = useWallet();

  return (
    <div className={classes.form}>
      <div className={classes.formArea}>
        <div className={classes.wallets}>
          <Typography variant="h2">Connect your wallet</Typography>
          <Typography variant="p">
            Connect your wallet one of available provider by importing or
            creating new one.
          </Typography>
          <ul>
            {wallets.map((wallet) => (
              <li key={wallet.key} onClick={() => connectWallet(wallet.key)}>
                <div className={classes.content}>
                  <div className={classes.info}>
                    <img src={wallet.img} alt={wallet.name} width={30} />
                    <Typography variant="placeholder" mt={2}>
                      {wallet.name}
                    </Typography>
                  </div>
                  {wallet.isPopular && <p>Popular</p>}
                </div>
                <div className={classes.overlay}></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
