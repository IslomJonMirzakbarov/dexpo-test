import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import CollectionDetailImage from './Image'
import CollectionDetailsInfo from './Info'
import NumberFormat from 'react-number-format'
import styles from './style.module.scss'
import { makeStyles, useTheme } from '@mui/styles'
import moment from 'moment'
import TokenImg from '../../../assets/images/con-token.svg?component'
import AddIcon from '../../../assets/icons/add.svg?component'
import { DATE_FORMAT, priceTypeChar } from '../../../constants'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DModal from '../../../components/DModal'
import { getPurchaseLabel } from './util'
import numFormat from '../../../utils/numFormat'
import NftInfo from './NftInfo'
import ContactUsModal from './ContactUsModal'

const useStyles = makeStyles((theme) => ({
  priceBox: {
    marginTop: 61
  },
  boxWrapper: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  },
  box: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  button: {
    padding: '16px 0',
    marginTop: 17,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20
    },
    '&:hover': {
      boxShadow: '5px 5px 52px 2px rgba(0, 0, 0, 0.1)'
    }
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  table: {
    [theme.breakpoints.down('sm')]: {
      overflowX: 'scroll'
    }
  }
}))

const CollectionDetailsContainer = ({
  id,
  contract_address,
  data,
  history,
  moreNFTs,
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
  onTimeOut,
  bidPriceControl,
  isAuctionEnded,
  setRefetchInterval,
  isAuctionNotStarted,
  isAuctionBeingFinished,
  orginalNftDetail
}) => {
  const navigate = useNavigate()

  const theme = useTheme()
  const classes = useStyles()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [openContactInfo, setOpenContactInfo] = useState(false)
  const { nft, artist, market, collection } = data || {}
  // const { token } = useSelector((store) => store.auth)
  const { price_krw } = useSelector((store) => store.wallet)
  const [openImg, setOpenImg] = useState(false)
  // console.log('openContactInfo', openContactInfo)
  // const handleClick = () => {
  //   if (token) toggle()
  //   else navigate('/login')
  // }
  // const endDate = useMemo(() => {
  //   const newDate = new Date(market?.end_date * 1000)

  //   return moment(newDate).format(DATE_FORMAT)
  // }, [market?.end_date])

  // const isBidHistory = isAuction && bidHistory?.length > 0
  const exchangedPrice = orginalNftDetail?.price / price_krw

  // const btnLabel = getPurchaseLabel({
  //   isSoldOut,
  //   isAuction,
  //   isAuctionEnded,
  //   isAuctionNotStarted,
  //   isAuctionBeingFinished
  // })

  // const auctionStartDate = moment(market?.start_date * 1000).format(
  //   'yyyy.MM.DD'
  // )

  // const auctionStartTime = moment(market?.start_date * 1000).format('HH:mm')

  return (
    <Paper className={styles.container}>
      <Container>
        <Grid container spacing={!matches ? 3 : 0}>
          <Grid item lg={5} sm={12}>
            <CollectionDetailImage
              price={nft?.like_count}
              img={nft?.token_image}
              isLiked={nft?.is_liked}
              alt='nft picture'
              isPurchased={nft?.is_liked}
              tokenId={nft?.token_id}
              contractAddress={collection?.contract_address}
              onClick={(img) => setOpenImg(img)}
              setRefetchInterval={setRefetchInterval}
              isSoldOut={isSoldOut}
              onLike={() => onLike(nft?.is_liked)}
              artistName={artist?.artist_name}
              youtubeURL={artist?.youtube_url}
              isResponsive={matches}
              artistWallet={nft?.creator_address}
            />
          </Grid>
          <Grid item lg={7} sm={12} className={classes.grid}>
            <CollectionDetailsInfo
              id={id}
              contract_address={contract_address}
              collection={collection}
              artistName={artist?.artist_name}
              youtubeURL={artist?.youtube_url}
              nftName={nft?.token_name}
              // isOriginal={nft?.has_original}
              description={nft?.token_description}
              type={priceTypeChar?.[market?.type]}
              isResponsive={matches}
              artistWallet={nft?.creator_address}
            />
            <Box
              display='flex'
              justifyContent='space-between'
              mt={3}
              className={classes.boxWrapper}
            >
              <Box className={classes.box} mr={3}></Box>
              <Box
                display='flex'
                justifyContent='space-between'
                flexDirection='column'
                alignItems='end'
                className={classes.box}
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='end'
                  sx={{ width: '100%' }}
                >
                  {orginalNftDetail?.price && (
                    <>
                      <Box
                        display='flex'
                        alignItems='center'
                        className={classes.priceBox}
                      >
                        <TokenImg style={{ width: 28, height: 28 }} />
                        <Typography
                          ml={1}
                          variant='body2'
                          fontSize='30px!important'
                          fontWeight={600}
                          lineHeight='45px'
                        >
                          <NumberFormat
                            value={numFormat(exchangedPrice)}
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
                          value={numFormat(orginalNftDetail?.price)}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix='￦'
                        />
                        )
                      </Typography>
                    </>
                  )}

                  <Button
                    className={classes.button}
                    variant='containedSecondary'
                    fullWidth
                    sx={{ height: 55 }}
                    onClick={() => setOpenContactInfo((prev) => !prev)}
                  >
                    Contact us
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <NftInfo
          orginalNftDetail={orginalNftDetail}
          setOpentImage={(url) => setOpenImg(url)}
        />
        <Typography className={styles.AccordionTitle}>구매 확인사항</Typography>

        <Accordion
          defaultExpanded={true}
          square={true}
          style={{ margin: 0, boxShadow: 'none' }}
        >
          <AccordionSummary
            className={styles.AccordionSummary}
            expandIcon={<AddIcon className={styles.AddIcon} />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={styles.AccordionSummaryText}>
              결제 후 취소/환불 불가 안내
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.AccordionDetails}>
            <Typography className={styles.AccordionDetailsText}>
              WAD는 블록체인 기술을 이용하여 작품을 거래하므로, 결제가 완료된
              이후에는 구매 취소 또는 환불이 되지 않습니다.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* <Accordion square={true} style={{ margin: 0, boxShadow: 'none' }}>
          <AccordionSummary
            className={styles.AccordionSummary}
            expandIcon={<AddIcon className={styles.AddIcon} />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={styles.AccordionSummaryText}>
              에디션 구매 가이드
            </Typography>
          </AccordionSummary>
        </Accordion> */}
      </Container>

      <DModal
        isExpandedImg
        img={openImg}
        open={openImg}
        onClose={() => setOpenImg(false)}
      />
      <ContactUsModal
        open={openContactInfo}
        handleClose={() => setOpenContactInfo((prev) => !prev)}
      />
    </Paper>
  )
}

export default CollectionDetailsContainer
