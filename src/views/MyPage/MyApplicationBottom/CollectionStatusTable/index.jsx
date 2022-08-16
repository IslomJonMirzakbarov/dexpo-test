import React from "react";
import classNames from "classnames";
import moment from "moment";
import CollectionStatusSvg from "../../../../assets/icons/collection-status-svg.svg?component";
import useCollectionAPI from "../../../../hooks/useCollectionApi";

import styles from "./style.module.scss";

const CollectionStatusTable = () => {
  const { collections } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: "desc",
    size: 200,
  });
  return (
    <table className={styles.Table}>
      <thead className={styles.TableHead}>
        <tr className={styles.TableHeadRow}>
          <th>Collection logo & Name</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody className={styles.TableBody}>
        {collections?.data?.items.length > 0 &&
          collections?.data?.items.map((item) => {
            const itemStatus =
              item.status === "IDLE" || item.status === "PENDING"
                ? "Under Review"
                : item.status === "REJECT"
                ? "Rejected"
                : "Approved";
            return (
              <tr className={styles.TableBodyRow}>
                <td>
                  <img
                    src={item?.logo_url}
                    alt="collection logo"
                    className={styles.Svg}
                  />
                  {item.name}
                </td>
                <td
                  className={classNames(
                    styles.UnderReview,
                    { [styles.Approved]: item?.status === "COMPLETE" },
                    { [styles.Rejected]: item?.status === "REJECT" }
                  )}
                >
                  {itemStatus}
                </td>
                <td>{moment(item.created_at).format("YYYY.MM.DD hh:mm:ss")}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default CollectionStatusTable;
