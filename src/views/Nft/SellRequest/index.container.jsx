import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import styles from './style.module.scss'
import { makeStyles, useTheme } from '@mui/styles'
import ValueTable from '../../Collections/Details/ValueTable'
import HistoryTable from '../../Collections/Details/HistoryTable'
import CollectionDetailsInfo from '../../Collections/Details/Info'
import CollectionDetailImage from '../../Collections/Details/Image'
import Countdown from '../../../components/Countdown'
import NumberFormat from 'react-number-format'
import TokenImg from '../../../assets/images/con-token.svg?component'
import { DATE_FORMAT, priceTypeChar } from '../../../constants'
import PriceInput from '../../../components/PriceInput'
import SellModal from '../../../components/Modals/SellModal'
import moment from 'moment'
import DModal from '../../../components/DModal'
import { marketStatuses } from '../../../constants/marketStatuses'
import { useSelector } from 'react-redux'
import CalendarIcon from '../../../assets/icons/calendar.svg'
import numFormat from '../../../utils/numFormat'
import { useTranslation } from 'react-i18next'
import QuantityInput from '../../../components/QuantityInput'

const auctionLabel = 'Please enter auction starting price'
const fixedLabel = 'Please enter the selling price.'

const useStyles = makeStyles({
  priceBox: {
    marginTop: 61
  },
  box: {
    maxWidth: '50%',
    width: '50%'
  },
  button: {
    padding: '16px 0',
    marginTop: 17,
    '&:hover': {
      boxShadow: '5px 5px 52px 2px rgba(0, 0, 0, 0.1)'
    }
  },
  timeInput: {
    width: '48%'
  },
  datetime: {
    cursor: 'pointer',
    transition: '0.4s ease-in-out all',
    borderRadius: 7,

    '&:focus, &:hover': {
      'box-shadow': ' -1px 1px 16px 7px rgba(0, 0, 0, 0.06)'
    },

    '& input': {
      fontSize: '10px',
      padding: '10px 12px!important'
    },

    '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
      opacity: 1,
      background: `url(${CalendarIcon}) no-repeat`,
      width: 18,
      height: 19,
      cursor: 'pointer'
    },

    '& fieldset': {
      width: '100%',
      border: '1px solid #dedede !important',
      'border-radius': '7px',
      '&:focus, &:hover': {
        border: ' none!important',
        outline: 'none'
      }
    }
  }
})

const NFTSellRequestContainer = ({
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
  onBack,
  handleChangeStartingDate,
  handleChangeEndingDate,
  sdValue,
  edValue,
  isAuction,
  bidHistory,
  quantity,
  handleChangeQuantity,
  balance
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const classes = useStyles()

  const { newNftSrc } = useSelector((store) => store.nft)

  const [openImg, setOpenImg] = useState(false)
  const { price_krw, account } = useSelector((store) => store.wallet)

  const isTypeHidden = isDisabled || marketStatuses.IDLE.includes(marketStatus)

  const isBidHistory = isAuction && bidHistory?.length > 0

  const endDate = useMemo(() => {
    const newDate = new Date(market?.end_date * 1000)

    return moment(newDate).format(DATE_FORMAT)
  }, [market?.end_date])

  const exchangedPrice = price_krw * (market?.price || sellPrice)

  const SetPrice = () => (
    <>
      <Box display='flex' alignItems='center' className={classes.priceBox}>
        <TokenImg
          style={{
            width: 28,
            height: 28
          }}
        />

        <Typography ml={1} fontSize={30} fontWeight={600} lineHeight='45px'>
          <NumberFormat
            value={numFormat(market?.price)}
            displayType={'text'}
            thousandSeparator={true}
          />
        </Typography>
      </Box>
      <Typography
        variant='placeholder'
        fontWeight={500}
        color={theme.palette.grey[1000]}
      >
        (
        <NumberFormat
          value={numFormat(exchangedPrice)}
          displayType={'text'}
          thousandSeparator={true}
          prefix='￦'
        />
        )
      </Typography>
    </>
  )

  const ownerAddress = useMemo(
    () =>
      account
        ? nft?.holders.find(
            (item) => item?.owner_address?.toLowerCase() === account
          )?.owner_address
        : '',
    [account, nft]
  )

  return (
    <Paper className={styles.container}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={5}>
            <CollectionDetailImage
              price={nft?.like_count}
              img={nft?.token_image}
              isLiked={nft?.is_liked}
              alt='nft picture'
              isPurchased={nft?.is_liked}
              tokenId={nft?.token_id}
              contractAddress={collection?.contract_address}
              onClick={() => setOpenImg(true)}
            />
          </Grid>
          <Grid
            item
            lg={7}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
          >
            <CollectionDetailsInfo
              collection={collection}
              artistWallet={artist?.wallet_address}
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
            <Box display='flex' justifyContent='space-between' mt={3} gap={3}>
              <Box className={classes.box}>
                <ValueTable
                  smartContract={collection?.contract_address}
                  tokenID={nft?.token_id}
                  tokenStandard={nft?.standard}
                  blockchain='Klaytn'
                  addrressCreator={nft?.creator_address}
                  addrressOwner={ownerAddress}
                  sellerAddress={market?.seller_address}
                />
              </Box>
              <Box
                display='flex'
                justifyContent='space-between'
                flexDirection='column'
                alignItems='end'
                className={classes.box}
              >
                {nft?.standard === 'M' && !isCancel && !!type && (
                  <QuantityInput
                    available={balance}
                    handleChange={handleChangeQuantity}
                    value={quantity}
                  />
                )}
                {nft?.standard === 'M' && (
                  <>
                    <div className={styles.totalList}>
                      <div className={styles.total}>
                        <span>Total minted</span>
                        <span>{nft?.total_minted}</span>
                      </div>
                      <div className={styles.total}>
                        <span>Total listed</span>
                        <span>{nft?.total_listed}</span>
                      </div>
                      <div className={styles.total}>
                        <span>Current sales</span>
                        <span>{nft?.total_sales}</span>
                      </div>
                    </div>
                  </>
                )}
                {market?.end_date && <Countdown date={endDate} />}
                {!isCancel && (
                  <Box
                    display='flex'
                    flexDirection='column'
                    sx={{ width: '100%' }}
                    className={styles.dates}
                  >
                    {!!type && (
                      <PriceInput
                        control={control}
                        name='price'
                        label={t(isAuction ? auctionLabel : fixedLabel)}
                        exchangedPrice={price_krw * sellPrice}
                      />
                    )}
                    {isAuction && (
                      <>
                        <Box mt='15px' display='flex' alignItems='center'>
                          <TextField
                            label={t('Starting Date')}
                            type='datetime-local'
                            value={sdValue}
                            className={classes.datetime}
                            onChange={handleChangeStartingDate}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                          &nbsp;~&nbsp;
                          <TextField
                            label={t('Ending Date')}
                            type='datetime-local'
                            value={edValue}
                            className={classes.datetime}
                            onChange={handleChangeEndingDate}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </Box>
                      </>
                    )}
                  </Box>
                )}

                {!market?.end_date && isCancel && <Box />}
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='end'
                  sx={{ width: '100%' }}
                >
                  {isCancel && market?.price && <SetPrice key={submitLabel} />}
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
        {isBidHistory && (
          <Grid container>
            <Grid item lg={12}>
              <HistoryTable data={bidHistory} title='BID History' />
            </Grid>
          </Grid>
        )}
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
        exchangedPrice={exchangedPrice}
        img={nft?.token_image}
        collectionName={collection?.name}
        onClick={handleConfirm}
        isApprove={isApprove}
        isListing={isListing}
        error={error}
        sellPrice={sellPrice}
        isCanceling={isCanceling}
        onBack={onBack}
        quantity={quantity}
        nftStandard={nft.standard}
      />
      <DModal
        isExpandedImg
        img={newNftSrc || nft?.token_image}
        open={openImg}
        onClose={() => setOpenImg(false)}
      />
    </Paper>
  )
}

export default NFTSellRequestContainer
