import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { Box, Button } from '@mui/material'

import useNftAPI from '../../../hooks/useNftApi'
import Loader from '../../../components/Loader'
import NoItemsYet from '../../../assets/icons/no-items-yet.svg?component'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'
import SellModal from '../../../components/Modals/SellModal'
import { sellReqStatuses } from '../../../constants/sellRequestStatuses'
import { awaitStatus } from '../../../components/Modals/SellModal/Pending/ConditionAwaitLabel'
import useCurrentProvider from '../../../hooks/useCurrentProvider'
import numFormat from '../../../utils/numFormat'
import { useTranslation } from 'react-i18next'
import CPagination from '../../../components/CPagination'

const TableRow = ({ item, navigateClick, price_usd, handleClick, type }) => {
  const { t } = useTranslation()
  const isListed = type === 'L'
  const formattedDate = isListed
    ? moment.unix(item?.market?.created_at).format('YYYY-MM-DD HH:mm:ss')
    : moment(item?.multi?.created_at).format('YYYY-MM-DD HH:mm:ss')
  const exchangedPrice =
    (isListed ? item?.market?.price : item?.multi?.price) * price_usd
  return (
    <tr
      className={styles.TableBodyRow}
      key={isListed ? item?.nft?.token_id : item?.multi?.nft_id}
    >
      <td onClick={navigateClick}>
        <img
          src={isListed ? item?.nft?.token_image : item?.multi?.token_image}
          alt="img"
        />
      </td>

      <td onClick={navigateClick}>
        {isListed ? item?.nft?.token_name : item?.multi?.token_name}
      </td>

      <td>{isListed ? item?.nft?.token_quantity : item?.multi?.amount}</td>

      <td className={styles.ThirdOne}>
        <Box className={styles.CycPrice}>
          {
            <NumberFormat
              value={numFormat(
                isListed ? item?.market?.price : item?.multi?.price
              )}
              displayType={'text'}
              thousandSeparator={true}
              prefix="CYCON "
            />
          }
        </Box>
        <Box className={styles.UsdPrice}>
          <NumberFormat
            value={numFormat(exchangedPrice)}
            displayType={'text'}
            thousandSeparator={true}
            prefix="￦"
          />
        </Box>
      </td>

      <td>{formattedDate}</td>

      <td>
        <Button className={styles.BtnCancel} onClick={() => handleClick(item)}>
          {t('Cancel')}
        </Button>
      </td>
    </tr>
  )
}

const Btns = {
  SINGLE: 'Single',
  MULTIPLE: 'Multiple',
}

const ListedArtworkBottom = () => {
  const navigate = useNavigate()
  const { price_usd } = useSelector((store) => store.wallet)
  const [openModal, setOpenModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isLoading, setIsLoading] = useState(awaitStatus.INITIAL)
  const [active, setActive] = useState('SINGLE')

  const handleToggleModal = () => setOpenModal((prev) => !prev)

  const [page, setPage] = useState(1)
  const { list, refetchList, loadingList } = useNftAPI({
    isGetList: true,
    type: active === 'MULTIPLE' ? 'MULTI_LISTED' : 'LISTED',
    size: 10,
    page: page,
  })

  const handlePaginate = (p) => {
    setPage(p)
  }

  const requestType = list?.data?.items[0]?.request_type
  useEffect(() => {
    if (requestType !== 'LISTED' && requestType !== 'MULTI_LISTED') {
      refetchList({
        isGetList: true,
        size: 10,
        page: page,
      })
    }
  }, [list, page, refetchList, requestType])

  useEffect(() => {
    refetchList({
      isGetList: true,
      type: active === 'MULTIPLE' ? 'MULTI_LISTED' : 'LISTED',
      size: 10,
      page: page,
    })
  }, [active, page, refetchList])

  const { cancel, cancelMultipleNft, cancelAuction } = useCurrentProvider()

  useEffect(() => {
    if (!openModal) setIsLoading(awaitStatus.INITIAL)
  }, [openModal])

  const handleCancel = async (
    isFixedContract,
    contract_address,
    id,
    selectedItem
  ) => {
    setIsLoading(awaitStatus.PENDING)
    if (selectedItem?.request_type === 'MULTI_LISTED' && !isFixedContract) {
      try {
        const res = await cancelMultipleNft(selectedItem?.multi?.nft_id)
        if (!!res) {
          setIsLoading(awaitStatus.COMPLETE)
          refetchList()
        }
      } catch (err) {
        console.log(err.message)
        setIsLoading(awaitStatus.ERROR)
      }
    } else {
      try {
        let res
        if (isFixedContract && selectedItem?.request_type === 'LISTED') {
          res = await cancel(contract_address, id)
        } else {
          res = await cancelAuction(contract_address, id)
        }

        if (!!res) {
          setIsLoading(awaitStatus.COMPLETE)
          refetchList()
        }
      } catch (err) {
        console.log(err.message)
        setIsLoading(awaitStatus.ERROR)
      }
    }
  }

  const handleConfirm = () => {
    const { market, collection, nft } = selectedItem
    const isFixed = market?.type.includes('F')
    const contractAddress = collection?.contract_address
    const id = nft?.token_id

    handleCancel(isFixed, contractAddress, id, selectedItem)
  }

  const handleClick = (item) => {
    setSelectedItem(item)
    setOpenModal(true)
  }

  const data = list?.data?.items
  const { t } = useTranslation()
  return (
    <Box className={styles.Container}>
      <SellModal
        open={openModal}
        onClose={handleToggleModal}
        onClick={handleConfirm}
        status={sellReqStatuses.CANCEL}
        isCanceling={isLoading}
      />

      <Box className={styles.ButtonsBox}>
        {Object.keys(Btns).map((key) => {
          return (
            <Box
              key={key}
              className={classNames(styles.Button, {
                [styles.Active]: active === key,
              })}
              onClick={() => {
                setActive(key)
                setPage(1)
              }}
            >
              {t(Btns[key])}
            </Box>
          )
        })}
      </Box>

      {data?.length === 0 ? (
        <Box className={styles.NoItemsContainer}>
          <NoItemsYet />
          <Box className={styles.NoItemsText}>{t('No items yet')}</Box>
        </Box>
      ) : loadingList ||
        (requestType !== 'LISTED' && requestType !== 'MULTI_LISTED') ? (
        <Loader page="my-page" />
      ) : (
        <table className={styles.Table}>
          <thead className={styles.TableHead}>
            <tr className={styles.TableHeadRow}>
              <th>{t('Item')}</th>
              <th>{t('Artwork name')}</th>
              <th>{t('Quantity')}</th>
              <th>{t('Unit Price')}</th>
              <th>{t('Date')}</th>
              <th></th>
            </tr>
          </thead>

          <tbody
            className={classNames(styles.TableBody, {
              [styles.LoaderPos]: true,
            })}
          >
            {data?.length === 0
              ? null
              : data.map((item) => {
                  const navigateClick = () => {
                    if (item?.request_type === 'MULTI_LISTED') {
                      navigate(
                        `/marketplace/${item?.multi?.token_id}/${item?.multi?.contract_address}`
                      )
                    } else {
                      navigate(
                        `/marketplace/${item?.nft?.token_id}/${item?.collection?.contract_address}`
                      )
                    }
                  }
                  const typeNft =
                    item?.request_type === 'MULTI_LISTED' ? 'M' : 'L'
                  if (typeNft === 'L' && item?.collection?.type === 'M') {
                    return null
                  }
                  return (
                    <TableRow
                      navigateClick={navigateClick}
                      item={item}
                      price_usd={price_usd}
                      handleClick={handleClick}
                      type={typeNft}
                    />
                  )
                })}
          </tbody>
        </table>
      )}

      {list?.data?.totalPages > 1 && (
        <CPagination
          count={list?.data?.totalPages}
          page={page}
          setCurrentPage={handlePaginate}
          hidePrevButton={false}
          hideNextButton={false}
          showFirstButton={true}
          showLastButton={true}
          siblingCount={1}
        />
      )}
    </Box>
  )
}

export default ListedArtworkBottom
