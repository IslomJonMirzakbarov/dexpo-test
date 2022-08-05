import moment from "moment";
import React, { useEffect, useState } from "react";
import CollectionStatusSvg from "../../../../assets/icons/collection-status-svg.svg?component";
import useCollectionAPI from "../../../../hooks/useCollectionApi";

import styles from "./style.module.scss";

const CollectionStatusTable = () => {
   // here, there is one bug (applying pagination logic into scroll: useQuery fetching not triggering or lacking...), later will be fixed
   const [page, setPage] = useState(1);
   const [data, setData] = useState([]);

   const { collections } = useCollectionAPI({
      isDetail: true,
      page,
      orderBy: "desc",
      size: 10,
   });

   useEffect(() => {
      async function fetchData() {
         if (collections?.data?.items) {
            setData([...data, ...(await collections?.data?.items)]);
         }
      }
      fetchData();
   }, []);

   const handleScroll = (e) => {
      const bottom =
         e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) {
         console.log("bottom ...");
         setPage(page + 1);
      }
   };

   return (
      <table
         className={styles.Table}
         onScroll={(e) => {
            handleScroll(e);
         }}
      >
         <thead className={styles.TableHead}>
            <tr className={styles.TableHeadRow}>
               <th>Collection logo & Name</th>
               <th>Status</th>
               <th>Date</th>
            </tr>
         </thead>

         <tbody className={styles.TableBody}>
            {data.length > 0 &&
               data.map((item) => (
                  <tr className={styles.TableBodyRow}>
                     <td>
                        <CollectionStatusSvg className={styles.Svg} />
                        {item.name}
                     </td>
                     <td
                        className={
                           item?.status === "COMPLETE"
                              ? styles.Approved
                              : item?.status === "IDLE" ||
                                item?.status === "PENDING"
                              ? styles.UnderReview
                              : styles.Rejected
                        }
                     >
                        {item.status}
                     </td>
                     <td>
                        {moment(item.created_at).format("YYYY.MM.DD hh:mm:ss")}
                     </td>
                  </tr>
               ))}
         </tbody>
      </table>
   );
};

export default CollectionStatusTable;
