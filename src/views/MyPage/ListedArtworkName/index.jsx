import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Box } from "@mui/material";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import useNftAPI from "../../../hooks/useNftApi";
import Loader from "../../../components/Loader";
import NoItemsYet from "../../../assets/icons/no-items-yet.svg?component";

import styles from "./style.module.scss";

const ListedArtworkBottom = () => {
  const navigate = useNavigate();
  const { list } = useNftAPI({
    isGetList: true,
    type: "LISTED",
    size: 20000,
  });
  const dateConverter = (stringNum) => {
    const date = new Date(Number(stringNum) * 1000);
    const fdate = moment(date).format("YYYY.MM.DD hh:mm:ss");
    return fdate;
  };

  const loadChecker = list?.data?.items[0]?.request_type !== "LISTED";

  return (
    <Box className={styles.Container}>
      {list?.data?.items.length === 0 ? (
        <Box className={styles.NoItemsContainer}>
          <NoItemsYet />
          <Box className={styles.NoItemsText}>No items yet</Box>
        </Box>
      ) : loadChecker ? (
        <Loader page="my-page" />
      ) : (
        <table className={styles.Table}>
          <thead className={styles.TableHead}>
            <tr className={styles.TableHeadRow}>
              <th>Item</th>
              <th>Artwork name</th>
              <th>Unit Price</th>
              <th>Date</th>
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
                      `/user/nft/${item?.nft?.token_id}/${item?.collection?.contract_address}`
                    );
                  return (
                    <tr
                      className={styles.TableBodyRow}
                      key={item?.nft?.token_id}
                    >
                      <td onClick={navigateClick}>
                        <img src={item?.nft?.token_image} alt="img" />
                      </td>
                      <td onClick={navigateClick}>{item?.nft?.token_name}</td>

                      <td className={styles.ThirdOne}>
                        <Box className={styles.CycPrice}>
                          CYC {item?.market?.price}
                        </Box>
                        <Box className={styles.UsdPrice}>$ 0</Box>
                      </td>

                      <td>{dateConverter(item?.market?.created_at)}</td>
                      <td>
                        <PrimaryButton className={styles.BtnCancel}>
                          Cancel
                        </PrimaryButton>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      )}
    </Box>
  );
};

export default ListedArtworkBottom;
