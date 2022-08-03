import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import CollectionDetailImage from './Image';
import CollectionDetailsInfo from './Info';
import NumberFormat from 'react-number-format';
import styles from './style.module.scss';
import Countdown from '../../../components/Countdown';
import { makeStyles, useTheme } from '@mui/styles';
import ValueTable from './ValueTable';
import moment from 'moment';
import HistoryTable from './HistoryTable';
import tokenImg from '../../../assets/images/con-token.png';
import CheckoutModal from '../../../components/Modals/CheckoutModal';
import { useDispatch } from 'react-redux';
import { togglePopupByKey } from '../../../store/popup/popup.slice';
import { priceTypeChar } from '../../../constants';
import MoreCollections from './MoreCollections';

const DATE_FORMAT = 'DD-MM-yyyy hh:mm:ss';

const useStyles = makeStyles({
  priceBox: {
    marginTop: 61
  },
  box: {
    width: '50%'
  },
  button: {
    padding: '16px 0',
    marginTop: 17
  }
});

const CollectionDetailsContainer = ({
  data,
  history,
  moreNFTs,
  parsedPrice = 58.4,
  status,
  onConfirm
}) => {
  const { nft, artist, market, collection } = data;

  const dispatch = useDispatch();

  const classes = useStyles();
  const theme = useTheme();

  const handleClick = () => dispatch(togglePopupByKey('checkoutPopup'));
  const endDate = useMemo(() => {
    const newDate = new Date(market?.end_date * 1000);

    return moment(newDate).format(DATE_FORMAT);
  }, [market?.end_date]);

  return (
    <Paper className={styles.container}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={5}>
            <CollectionDetailImage
              price={nft?.like_count}
              img={nft?.token_image}
              alt="nft picture"
              isPurchased={false}
            />
          </Grid>
          <Grid item lg={7}>
            <CollectionDetailsInfo
              artistName={artist?.artist_name}
              youtubeURL={artist?.youtube_url}
              nftName={nft?.token_name}
              description={nft?.token_description}
              type={priceTypeChar?.[market?.type]}
            />
            <Box display="flex" justifyContent="space-between" my={3}>
              <Box className={classes.box} mr={3}>
                <ValueTable
                  smartContract={collection?.contract_address}
                  tokenID={nft?.token_id}
                  tokenStandard={nft?.standard}
                  blockchain="Klaytn"
                  addrressCreator={nft?.creator_address}
                  addrressOwner={nft?.owner_address}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
                alignItems="end"
                className={classes.box}
              >
                {market?.end_date ? <Countdown date={endDate} /> : <Box />}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="end"
                  sx={{ width: '100%' }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    className={classes.priceBox}
                  >
                    <img src={tokenImg} alt="token" width={28} height={28} />
                    <Typography
                      ml={1}
                      fontSize={30}
                      fontWeight={600}
                      lineHeight="45px"
                    >
                      <NumberFormat
                        value={market?.price}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </Typography>
                  </Box>
                  <Typography
                    variant="placeholder"
                    fontWeight={500}
                    color={theme.palette.grey[1000]}
                  >
                    ( ${' '}
                    <NumberFormat
                      value={parsedPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                    )
                  </Typography>
                  <Button
                    className={classes.button}
                    variant="containedSecondary"
                    fullWidth
                    onClick={handleClick}
                  >
                    Purchase Artwork
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={12}>
            <HistoryTable data={history} />
          </Grid>
        </Grid>
      </Container>
      <MoreCollections
        data={moreNFTs}
        title="More Artworks From This Collection"
      />
      <CheckoutModal
        artistName={artist?.artist_name}
        name={nft?.token_name}
        type={priceTypeChar?.[market?.type]}
        price={market?.price}
        exchangedPrice={12321200}
        img={nft?.token_image}
        collectionName={collection?.name}
        status={status}
        onClick={onConfirm}
      />
    </Paper>
  );
};

export default CollectionDetailsContainer;
