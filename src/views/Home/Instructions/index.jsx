import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const data = [
  {
    title: 'What is DEXPO NFT Marketplace ?',
    description: `DEXPO NFT Marketplace brings together artists, creators, and crypto enthusiasts on a single platform to create and trade top NFTs.
    Marketplace: Mint, purchase, and bid on NFTs from creators around the world`,
    icon: 'src/assets/images/detail1.png'
  },
  {
    title: 'How do I create an NFT ?',
    description: `Click [Create] and choose
    your file to upload. We
    currently support JPG, PNG,
    GIF, Please note that your
    NFT cannot be changed or
    revised once created. To
    create a revised/new NFT, you
    will have to start the process
    again.`,
    icon: 'src/assets/images/detail2.png'
  },
  {
    title: 'How do I sell an NFT ?',
    description: `To list an NFT for sale, our
    team will first of all approve
    the content to make sure it’s
    appropriate for listing. This
    process usually takes 4-8
    hours. Upon successful
    approval, your NFT will list
    immediately on the
    Marketplace as either an
    auction or fixed price sale,
    according to your preference.`,
    icon: 'src/assets/images/detail3.png'
  },
  {
    title: 'How do I buy an NFT ?',
    description: `For NFTs with a fixed price, click the
    [purchase artwork] button on the product
    page and complete the transaction. Once
    the transaction is successful, we will
    transfer the NFT to your wallet and the
    seller will receive the funds. For NFTs on
    auction, place your bid price, and confirm
    the offer. In the event of someone placing
    a higher bid than you, your funds will be
    unlocked. To join the auction again, you’ll
    have to place a new bid.`,
    icon: 'src/assets/images/detail4.png'
  },
]

const useStyles = makeStyles(theme => ({
  container:{
    backgroundImage: 'url(src/assets/images/detail-bg.png)',
    backgroundPosition: "center center",
    backgroundSize: 'cover',
    borderRadius: 0,
    padding: '115px 0',
    color: theme.palette.common.white
  },
  description:{
    maxWidth: 500
  },
  title:{
    fontFamily:'Poppins',
    textAlign: 'center'
  }
}))

const Instructions = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.container}>
      <Container>
        <Grid container spacing={3}>
          {
            data.map((item,i) =>
              <Grid 
                item 
                lg={6} 
                key={i} 
                px={3} 
                mt={5}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <img src={item.icon} alt={'icon'} width={108} height={108}/>
                  <Typography mt={3} variant="h4" className={classes.title} fontWeight={700}>{item.title}</Typography>
                  <Typography 
                    variant="p" 
                    textAlign="center" 
                    className={classes.description}
                    mt={1}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            )
          }
        </Grid>
      </Container>
    </Paper>
  );
};

export default Instructions;
