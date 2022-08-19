import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import styles from './style.module.scss';
import { makeStyles } from '@mui/styles';
import ValueTable from '../../Collections/Details/ValueTable';
import HistoryTable from '../../Collections/Details/HistoryTable';
import CollectionDetailsInfo from '../../Collections/Details/Info';
import CollectionDetailImage from '../../Collections/Details/Image';
import Countdown from '../../../components/Countdown';
import NumberFormat from 'react-number-format';
import tokenImg from '../../../assets/images/con-token.png';
import { priceType, priceTypeChar } from '../../../constants';

import { utils } from 'react-modern-calendar-datepicker';
import PriceInput from '../../../components/PriceInput';
import DRangePicker from '../../../components/DRangePicker';
import SellModal from '../../../components/Modals/SellModal';
import { useTheme } from '@emotion/react';
import moment from 'moment';
import DModal from '../../../components/DModal';
import { marketStatuses } from '../../../constants/marketStatuses';

const DATE_FORMAT = 'yyyy-MM-DD hh:mm:ss';

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

const NFTSellRequestContainer = ({
  previewImgSrc,
  history,
  types,
  type,
  handleChangeType,
  control,
  openModal,
  toggle,
  status,
  handleClick,
  handleConfirm,
  parsedPrice = 58.4,
  isApprove,
  isListing,
  isCanceling,
  error,
  nft,
  artist,
  collection,
  market,
  sellPrice,
  isCancel,
  isDisabled,
  submitLabel,
  marketStatus,
  onLike,
  handleChangeDate,
  sdValue,
  edValue
}) => {
  const theme = useTheme();

  const classes = useStyles();

  const [openImg, setOpenImg] = useState(false);

  const isAuction = priceType.AUCTION.key.includes(type?.value);

  const isTypeHidden = isDisabled || marketStatuses.IDLE.includes(marketStatus);

  const endDate = useMemo(() => {
    const newDate = new Date(market?.end_date * 1000);

    return moment(newDate).format(DATE_FORMAT);
  }, [market?.end_date]);

  const Inputs = () => (
    <Box display="flex" flexDirection="column" sx={{ width: '100%' }}>
      {!!type && <PriceInput control={control} name="price" />}
      {isAuction && (
        <Box mt="15px" display="flex" sx={{ width: '100%' }}>
          <DRangePicker
            minimumDate={utils().getToday()}
            placeholderText="Please select an auction period"
            onChange={handleChangeDate}
            value={{
              from: sdValue,
              to: edValue
            }}
          />
        </Box>
      )}
    </Box>
  );

  const SetPrice = () => (
    <>
      <Box display="flex" alignItems="center" className={classes.priceBox}>
        <img src={tokenImg} alt="token" width={28} height={28} />
        <Typography ml={1} fontSize={30} fontWeight={600} lineHeight="45px">
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
  );

  return (
    <Paper className={styles.container}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={5}>
            <CollectionDetailImage
              previewImgSrc={previewImgSrc}
              price={nft?.like_count}
              img={nft?.token_image}
              alt="nft picture"
              isPurchased={nft?.is_liked}
              onClick={() => setOpenImg(true)}
              onLike={() => onLike(nft?.is_liked)}
            />
          </Grid>
          <Grid
            item
            lg={7}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <CollectionDetailsInfo
              artistName={artist?.artist_name}
              youtubeURL={artist?.youtube_url}
              nftName={nft?.token_name}
              description={nft?.token_description}
              type={priceTypeChar?.[market?.type]}
              isArtwork={!isCancel}
              sellType={type}
              types={types}
              handleChangeType={handleChangeType}
              hideSelect={isTypeHidden}
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
                {market?.end_date && <Countdown date={endDate} />}
                {!isCancel && <Inputs />}
                {!market?.end_date && isCancel && <Box />}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="end"
                  sx={{ width: '100%' }}
                >
                  {isCancel && market?.price && <SetPrice />}
                  <Button
                    className={classes.button}
                    variant={isCancel ? 'outlined' : 'containedSecondary'}
                    fullWidth
                    onClick={isCancel ? toggle : handleClick}
                    disabled={isDisabled}
                  >
                    {submitLabel}
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
      <SellModal
        open={openModal}
        onClose={toggle}
        status={status}
        artistName={artist?.artist_name}
        name={nft?.token_name}
        type={priceTypeChar?.[market?.type]}
        price={market?.price}
        exchangedPrice={12321200}
        img={nft?.token_image}
        collectionName={collection?.name}
        onClick={handleConfirm}
        isApprove={isApprove}
        isListing={isListing}
        error={error}
        sellPrice={sellPrice}
        isCanceling={isCanceling}
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

export default NFTSellRequestContainer;
