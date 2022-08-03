import classNames from "classnames";
import React, { useState } from "react";

import styles from "./style.module.scss";

const Btns = {
   ARTIST_STATUS: "Artist Status",
   COLLECTION_STATUS: "Collection Status",
   SELL_REQUEST: "Sell Request",
};

const src =
   "https://images.unsplash.com/photo-1653393139347-91df2b722c33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";

const MyApplicationBottom = () => {
   const [active, setActive] = useState("ARTIST_STATUS");

   return (
      <div className={styles.Container}>
         <div className={styles.ButtonsBox}>
            {Object.keys(Btns).map((key) => {
               return (
                  <div
                     className={classNames(styles.Button, {
                        [styles.Active]: active === key,
                     })}
                     onClick={() => setActive(key)}
                  >
                     {Btns[key]}
                  </div>
               );
            })}
         </div>

         <table className={styles.Table}>
            <thead className={styles.TableHead}>
               <tr className={styles.TableHeadRow}>
                  <th>Item</th>
                  <th>Artist name & Artwork name</th>
                  <th>Status</th>
                  <th>Date</th>
               </tr>
            </thead>

            <tbody className={styles.TableBody}>
               {/* will be map func */}
               <tr className={styles.TableBodyRow}>
                  <td>
                     <img src={src} alt="" />
                  </td>
                  <td>Tristian Eaton (Gemma #1233)</td>
                  <td>Under Review</td>
                  <td>2022.04.13 17:48:29</td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default MyApplicationBottom;
