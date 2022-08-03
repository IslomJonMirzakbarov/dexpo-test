import React from "react";
import CollectionStatusSvg from "../../../../assets/icons/collection-status-svg.svg?component";

import styles from "./style.module.scss";

const src =
   "https://images.unsplash.com/photo-1653393139347-91df2b722c33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";

const CollectionStatusTable = () => {
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
            {/* will be map func */}
            <tr className={styles.TableBodyRow}>
               <td>
                  <CollectionStatusSvg className={styles.Svg} />
                  alpha keytauri (AK)
               </td>
               <td>Under Review</td>
               <td>2022.04.13 17:48:29</td>
            </tr>
         </tbody>
      </table>
   );
};

export default CollectionStatusTable;
