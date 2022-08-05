import moment from "moment";
import React from "react";

import styles from "./style.module.scss";

const src =
   "https://images.unsplash.com/photo-1653393139347-91df2b722c33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";

const ArtistStatusTable = ({ artist }) => {
   // console.log(artist);
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
