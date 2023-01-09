import moment from "moment";
import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

const ArtistStatusTable = ({ artist }) => {
  const { t } = useTranslation();
  const fdate =
    artist?.data?.timestamp &&
    moment(artist?.data?.timestamp * 1000).format("YYYY.MM.DD HH:mm:ss");

  const artistStatus = artist?.data?.status;
  const ArtistStatus =
    artistStatus === "IDLE" || artistStatus === "PENDING"
      ? t("Under Review")
      : artistStatus === "REJECT"
      ? t("Rejected")
      : t("Approved");
  return (
    <table className={styles.Table}>
      <thead className={styles.TableHead}>
        <tr className={styles.TableHeadRow}>
          <th>{t('Email address')}</th>
          <th>{t('Status')}</th>
          <th>{t('Date')}</th>
        </tr>
      </thead>

      {artist?.data?.artist_email && (
        <tbody className={styles.TableBody}>
          <tr className={styles.TableBodyRow}>
            <td>{artist?.data?.artist_email}</td>
            <td
              className={classNames(
                styles.UnderReview,
                { [styles.Approved]: artistStatus === "COMPLETE" },
                { [styles.Rejected]: artistStatus === "REJECT" }
              )}
            >
              {ArtistStatus}
            </td>
            <td>{fdate}</td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default ArtistStatusTable;
