import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import CollectionDetailImage from './Image';
import CollectionDetailsInfo from './Info';
import NumberFormat from 'react-number-format';
import styles from './style.module.scss';
import Countdown from '../../../components/Countdown';
import { makeStyles, useTheme } from '@mui/styles';
import ValueTable from './ValueTable';
import moment from 'moment';
import HistoryTable from './HistoryTable';
import TokenImg from '../../../assets/images/con-token.svg?component';
import CheckoutModal from '../../../components/Modals/CheckoutModal';
import { DATE_FORMAT, priceTypeChar } from '../../../constants';
import MoreCollections from './MoreCollections';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DModal from '../../../components/DModal';
import { getPurchaseLabel } from './util';

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
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

const CollectionDetailsContainer = ({
  data,
  history,
  moreNFTs,
  parsedPrice = 58.4,
  status,
  onConfirm,
  isSoldOut,
  txHash,
  openModal,
  toggle,
  error,
  isDisabled,
  onLike,
  isAuction,
  bidPrice,
  setBidPrice,
  bidHistory,
  bidPriceControl,
  isAuctionEnded,
  setRefetchInterval,
  isAuctionNotStarted
}) => {
  const navigate = useNavigate();

  const { nft, artist, market, collection } = data || {};
  const { token } = useSelector((store) => store.auth);
  const [openImg, setOpenImg] = useState(false);

  const theme = useTheme();
  const classes = useStyles();

  const handleClick = () => {
    if (token) toggle();
    else navigate('/login');
  };
  const endDate = useMemo(() => {
    const newDate = new Date(market?.end_date * 1000);

    return moment(newDate).format(DATE_FORMAT);
  }, [market?.end_date]);

  const isBidHistory = isAuction && bidHistory?.length > 0;

  const btnLabel = getPurchaseLabel({
    isSoldOut,
    isAuction,
    isAuctionEnded,
    isAuctionNotStarted
  });

  const auctionStartDate = moment(market?.start_date * 1000).format(
    'DD.MM.yyyy'
  );

  const auctionStartTime = moment(market?.start_date * 1000).format('HH:mm');

  return (
    <Paper className={styles.container}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={5}>
            <CollectionDetailImage
              setRefetchInterval={setRefetchInterval}
              price={nft?.like_count}
              img={nft?.token_image}
              alt="nft picture"
              isSoldOut={isSoldOut}
              isPurchased={nft?.is_liked}
              tokenId={nft?.token_id}
              contractAddress={collection?.contract_address}
              onClick={() => setOpenImg(true)}
              onLike={() => onLike(nft?.is_liked)}
            />
          </Grid>
          <Grid item lg={7} className={classes.grid}>
            <CollectionDetailsInfo
              artistName={artist?.artist_name}
              youtubeURL={artist?.youtube_url}
              nftName={nft?.token_name}
              description={nft?.token_description}
              type={priceTypeChar?.[market?.type]}
            />
            <Box display="flex" justifyContent="space-between">
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
                {isAuction && endDate ? (
                  isAuctionNotStarted ? (
                    <Typography variant="placeholder" fontWeight={500}>
                      Auction will start on{' '}
                      <Typography
                        variant="placeholder"
                        color="primary"
                        fontWeight={500}
                      >
                        {auctionStartDate}
                      </Typography>{' '}
                      at{' '}
                      <Typography
                        variant="placeholder"
                        color="primary"
                        fontWeight={500}
                      >
                        {auctionStartTime}
                      </Typography>
                    </Typography>
                  ) : (
                    <Countdown date={endDate} />
                  )
                ) : (
                  <Box />
                )}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="end"
                  sx={{ width: '100%' }}
                >
                  {market?.price && (
                    <>
                      <Box
                        display="flex"
                        alignItems="center"
                        className={classes.priceBox}
                      >
                        <TokenImg style={{ width: 28, height: 28 }} />
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
                    </>
                  )}
                  <Button
                    className={classes.button}
                    variant="containedSecondary"
                    fullWidth
                    onClick={handleClick}
                    disabled={isSoldOut || isDisabled}
                    sx={{ height: 55 }}
                  >
                    {btnLabel}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {isBidHistory && (
          <Grid container>
            <Grid item lg={12}>
              <HistoryTable data={bidHistory} title="BID History" />
            </Grid>
          </Grid>
        )}
        <Grid container>
          <Grid item lg={12}>
            <HistoryTable data={history} />
          </Grid>
        </Grid>
      </Container>
      <MoreCollections
        data={moreNFTs}
        title="More Artworks From This Collection"
        contractAddress={collection?.contract_address}
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
        txHash={txHash}
        openModal={openModal}
        toggle={toggle}
        error={error}
        tokenId={nft?.token_id}
        contractAddress={collection?.contract_address}
        bidPrice={bidPrice}
        setBidPrice={setBidPrice}
        bidPriceControl={bidPriceControl}
        endDate={endDate}
      />
      <DModal
        isExpandedImg
        img={nft?.token_image}
        open={openImg}
        onClose={() => setOpenImg(false)}
      />
    </Paper>
  );
};

export default CollectionDetailsContainer;
