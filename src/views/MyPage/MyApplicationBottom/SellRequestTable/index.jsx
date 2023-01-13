import React from "react";
import useCollectionAPI from "../../../../hooks/useCollectionApi";
import CollectionStatusSvg from "../../../../assets/icons/collection-status-svg.svg?component";

import styles from "./style.module.scss";
import classNames from "classnames";
import moment from "moment";
import { useTranslation } from "react-i18next";

const SellRequestTable = () => {
  const { sellRequestList } = useCollectionAPI({
    isDetail: true,
    size: 200,
    page: 1,
    orderBy: "desc",
  });
  const sellRequestItems = sellRequestList?.data?.items;
  const { t } = useTranslation();
  return (
    <table className={styles.Table}>
      <thead className={styles.TableHead}>
        <tr className={styles.TableHeadRow}>
          <th>{t("Logo")}</th>
          <th>{t("Collection name")}</th>
          <th>{t("Market Status")}</th>
          <th>{t("Date")}</th>
        </tr>
      </thead>

      <tbody className={styles.TableBody}>
        {sellRequestItems?.length > 0 &&
          sellRequestItems.map((item) => {
            const itemStatus =
              item?.market_status === "IDLE" ||
              item?.market_status === "PENDING"
                ? "Under Review"
                : item?.market_status === "REJECT"
                ? "Rejected"
                : "Approved";
            return (
              <tr className={styles.TableBodyRow}>
                <td>
                  {item?.logo_url ? (
                    <img
                      src={item?.logo_url}
                      alt="collection logo"
                      className={styles.Svg}
                    />
                  ) : (
                    <CollectionStatusSvg className={styles.Svg} />
                  )}
                </td>
                <td>{item?.name}</td>
                <td
                  className={classNames(
                    styles.UnderReview,
                    { [styles.Approved]: item?.market_status === "COMPLETE" },
                    { [styles.Rejected]: item?.market_status === "REJECT" }
                  )}
                >
                  {t(itemStatus)}
                </td>
                <td>
                  {item?.market_status_timestamp &&
                    moment(
                      new Date(item?.market_status_timestamp * 1000)
                    ).format("YYYY.MM.DD HH:mm:ss")}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default SellRequestTable;
