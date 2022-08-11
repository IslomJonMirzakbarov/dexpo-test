import React from "react";
import moment from "moment";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import useNftAPI from "../../../hooks/useNftApi";

import styles from "./style.module.scss";
import { Box } from "@mui/material";
import Loader from "../../../components/Loader";
import classNames from "classnames";

const ListedArtworkBottom = () => {
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
      {loadChecker ? (
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
              : list?.data?.items.map((item) => (
                  <tr className={styles.TableBodyRow}>
                    <td>
                      <img src={item?.nft?.token_image} alt="img" />
                    </td>
                    <td>{item?.nft?.token_name}</td>

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
                ))}
          </tbody>
        </table>
      )}
    </Box>
  );
};

export default ListedArtworkBottom;
