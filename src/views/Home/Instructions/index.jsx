import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import detail1Img from '../../../assets/icons/what-is-dexpo.svg';
import detail2Img from '../../../assets/icons/how-buy.svg';
import detail3Img from '../../../assets/icons/discount.svg';
import detail4Img from '../../../assets/icons/edit.svg';
import detailBg from '../../../assets/images/detail-bg.png';

const data = [
  {
    title: 'What is DEXPO NFT Marketplace ?',
    description: `World Art DEXPO NFT Marketplace is a platform
    built to gather like-minded creators, artists, and crypto
    enthusiasts to create, trade, and share top NFTs.
    Platform Features: Users can mint, list, purchase, and bid
    on NFTs by using CYCON coins around the world.
    `,
    icon: detail1Img
  },
  {
    title: 'How do I create an NFT ?',
    description: `For NFTs with a fixed price, click the [Purchase Artwork]
    button on the Marketplace Details page and complete
    the transaction. For NFTs on auction, If another user exceeds
    the bid price you offered, the amount of
    CYCON that has already been bid will be returned.  `,
    icon: detail2Img
  },
  {
    title: 'How do I sell an NFT ?',
    description: `To list an NFT for sale, first of all artists need approval
    from our admin. This process usually takes 1-2 hours.
    After successful approval, your NFT will list immediately on
    the Marketplace as either an auction or fixed price sale.
    `,
    icon: detail3Img
  },
  {
    title: 'How do I buy an NFT ?',
    description: `Once you are approved as an artist, click
    [Create NFT] and choose your file to upload
    We currently support JPG and PNG. Please note that your
    NFT cannot be changed or revised once created.
    `,
    icon: detail4Img
  }
];

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${detailBg})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    borderRadius: 0,
    padding: '115px 0',
    color: theme.palette.common.white
  },
  description: {
    maxWidth: 500
  },
  title: {
    fontFamily: 'Poppins',
    textAlign: 'center'
  },
  imgBox: {
    backgroundColor: theme.palette.common.black,
    borderRadius: 7,
    width: 108,
    height: 108,
    display: ' flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Instructions = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Container>
        <Grid container spacing={3}>
          {data.map((item, i) => (
            <Grid item lg={6} key={i} px={3} mt={5}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box className={classes.imgBox}>
                  <img src={item.icon} alt={'icon'} />
                </Box>
                <Typography
                  mt={3}
                  variant="h4"
                  className={classes.title}
                  fontWeight={700}
                >
                  {item.title}
                </Typography>
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
          ))}
        </Grid>
      </Container>
    </Paper>
  );
};

export default Instructions;
