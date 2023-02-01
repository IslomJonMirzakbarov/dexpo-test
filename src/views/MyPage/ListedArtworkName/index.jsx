import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Box, Button, CircularProgress } from "@mui/material";

import useNftAPI from "../../../hooks/useNftApi";
import Loader from "../../../components/Loader";
import NoItemsYet from "../../../assets/icons/no-items-yet.svg?component";
import useWeb3 from "../../../hooks/useWeb3";

import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import SellModal from "../../../components/Modals/SellModal";
import { sellReqStatuses } from "../../../constants/sellRequestStatuses";
import { awaitStatus } from "../../../components/Modals/SellModal/Pending/ConditionAwaitLabel";
import useCurrnetProvider from "../../../hooks/useCurrentProvider";
import numFormat from "../../../utils/numFormat";
import { useTranslation } from "react-i18next";

const TableRow = ({
  item,
  navigateClick,
  dateConverter,
  price_usd,
  handleClick,
}) => {
  const exchangedPrice = item?.market?.price * price_usd;
  const { t } = useTranslation();
  return (
    <tr className={styles.TableBodyRow} key={item?.nft?.token_id}>
      <td onClick={navigateClick}>
        <img src={item?.nft?.token_image} alt="img" />
      </td>
      <td onClick={navigateClick}>{item?.nft?.token_name}</td>

      <td>{item?.nft?.token_quantity}</td>

      <td className={styles.ThirdOne}>
        <Box className={styles.CycPrice}>
          {
            <NumberFormat
              value={numFormat(item?.market?.price)}
              displayType={"text"}
              thousandSeparator={true}
              prefix="CYCON "
            />
          }
        </Box>
        <Box className={styles.UsdPrice}>
          <NumberFormat
            value={numFormat(exchangedPrice)}
            displayType={"text"}
            thousandSeparator={true}
            prefix="￦"
          />
        </Box>
      </td>

      <td>{dateConverter(item?.market?.created_at)}</td>
      <td>
        <Button className={styles.BtnCancel} onClick={() => handleClick(item)}>
          {t("Cancel")}
        </Button>
      </td>
    </tr>
  );
};

const ListedArtworkBottom = () => {
  const navigate = useNavigate();
  const { price_usd } = useSelector((store) => store.wallet);

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(awaitStatus.INITIAL);

  const handleToggleModal = () => setOpenModal((prev) => !prev);

  const { list, refetchList } = useNftAPI({
    isGetList: true,
    type: "LISTED",
    size: 20000,
  });

  const { cancel, cancelAuction } = useCurrnetProvider();

  useEffect(() => {
    if (!openModal) setIsLoading(awaitStatus.INITIAL);
  }, [openModal]);

  const handleCancel = async (isFixedContract, contract_address, id) => {
    setIsLoading(awaitStatus.PENDING);
    try {
      let res;

      if (isFixedContract) res = await cancel(contract_address, id);
      else res = await cancelAuction(contract_address, id);

      if (!!res) {
        setIsLoading(awaitStatus.COMPLETE);
        refetchList();
      }
    } catch (err) {
      console.log(err.message);
      setIsLoading(awaitStatus.ERROR);
    }
  };

  const handleConfirm = () => {
    const { market, collection, nft } = selectedItem;
    const isFixed = market.type.includes("F");
    const contractAddress = collection.contract_address;
    const id = nft.token_id;

    handleCancel(isFixed, contractAddress, id);
  };

  const handleClick = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const dateConverter = (stringNum) => {
    const date = new Date(Number(stringNum) * 1000);
    const fdate = moment(date).format("YYYY.MM.DD hh:mm:ss");
    return fdate;
  };

  const loadChecker = list?.data?.items[0]?.request_type !== "LISTED";
  const { t } = useTranslation();
  return (
    <Box className={styles.Container}>
      <SellModal
        open={openModal}
        onClose={handleToggleModal}
        onClick={handleConfirm}
        status={sellReqStatuses.CANCEL}
        isCanceling={isLoading}
      />

      {list?.data?.items.length === 0 ? (
        <Box className={styles.NoItemsContainer}>
          <NoItemsYet />
          <Box className={styles.NoItemsText}>{t("No items yet")}</Box>
        </Box>
      ) : loadChecker ? (
        <Loader page="my-page" />
      ) : (
        <table className={styles.Table}>
          <thead className={styles.TableHead}>
            <tr className={styles.TableHeadRow}>
              <th>{t("Item")}</th>
              <th>{t("Artwork name")}</th>
              <th>{t("Quantity")}</th>
              <th>{t("Unit Price")}</th>
              <th>{t("Date")}</th>
              <th></th>
            </tr>
          </thead>

          <tbody
            className={classNames(styles.TableBody, {
              [styles.LoaderPos]: true,
            })}
          >
            {list?.data?.items.length === 0
              ? null
              : list?.data?.items.map((item) => {
                  const navigateClick = () =>
                    navigate(
                      `/marketplace/${item?.nft?.token_id}/${item?.collection?.contract_address}`
                    );
                  return (
                    <TableRow
                      navigateClick={navigateClick}
                      item={item}
                      dateConverter={dateConverter}
                      price_usd={price_usd}
                      handleClick={handleClick}
                    />
                  );
                })}
          </tbody>
        </table>
      )}
    </Box>
  );
};

export default ListedArtworkBottom;
