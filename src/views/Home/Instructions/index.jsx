import { Box, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const data = [
  {
    title: 'What is DEXPO NFT Marketplace ?',
    description: `DEXPO NFT Marketplace brings together artists, creators, and crypto enthusiasts on a single platform to create and trade top NFTs.
    Marketplace: Mint, purchase, and bid on NFTs from creators around the world`,
    icon: '❓'
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
    icon: '🛠'
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
    icon: '💰'
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
    icon: '💡'
  },
]

const useStyles = makeStyles({
  description:{
    maxWidth: 500
  },
  title:{
    fontFamily:'Inter',
    textAlign: 'center'
  }
})

const Instructions = () => {
  const classes = useStyles()
  return (
    <Container>
      <Grid container my={10}>
        <Grid item lg={12} display="flex" justifyContent="center"> 
          <Typography variant="h2">
            Create and sell your NFTs
          </Typography>
        </Grid>
        {
          data.map((item,i) =>
            <Grid 
              item 
              lg={3} 
              key={i} 
              px={3} 
              mt={5}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3">{item.icon}</Typography>
                <Typography variant="h4" className={classes.title}>{item.title}</Typography>
                <Typography 
                  variant="p" 
                  textAlign="center" 
                  className={classes.description}
                  mt={2}
                >
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          )
        }
      </Grid>
    </Container>
  );
};

export default Instructions;
