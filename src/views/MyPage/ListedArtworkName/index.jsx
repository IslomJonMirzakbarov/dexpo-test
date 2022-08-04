import React from "react";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";

import styles from "./style.module.scss";

const src =
   "https://images.unsplash.com/photo-1653393139347-91df2b722c33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";

const ListedArtworkBottom = () => {
   return (
      <div className={styles.Container}>
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

            <tbody className={styles.TableBody}>
               {/* will be map func */}
               <tr className={styles.TableBodyRow}>
                  <td>
                     <img src={src} alt="" />
                  </td>
                  <td>Mystery woman #1233</td>
                  <td className={styles.ThirdOne}>
                     <div className={styles.CycPrice}>CYC 155,222,000</div>
                     <div className={styles.UsdPrice}>$ 133,122.06</div>
                  </td>
                  <td>2022.04.13 17:48:29</td>
                  <td>
                     <PrimaryButton className={styles.BtnCancel}>Cancel</PrimaryButton>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default ListedArtworkBottom;
