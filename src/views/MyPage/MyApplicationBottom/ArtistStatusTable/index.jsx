import moment from "moment";
import React from "react";

import styles from "./style.module.scss";

const ArtistStatusTable = ({ artist }) => {
   const fdate = moment(artist?.data?.created_at).format("YYYY.MM.DD hh:mm:ss");
   const artistStatus = artist?.data?.status;
   return (
      <table className={styles.Table}>
         <thead className={styles.TableHead}>
            <tr className={styles.TableHeadRow}>
               <th>Email address</th>
               <th>Status</th>
               <th>Date</th>
            </tr>
         </thead>

         <tbody className={styles.TableBody}>
            <tr className={styles.TableBodyRow}>
               <td>{artist?.data?.artist_email}</td>
               <td
                  className={
                     artistStatus === "COMPLETE"
                        ? styles.Approved
                        : artistStatus === "IDLE" || artistStatus === "PENDING"
                        ? styles.UnderReview
                        : styles.Rejected
                  }
               >
                  {artistStatus}
               </td>
               <td>{fdate}</td>
            </tr>
         </tbody>
      </table>
   );
};

export default ArtistStatusTable;
