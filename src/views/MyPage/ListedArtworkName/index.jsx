import moment from "moment";
import React, { useEffect } from "react";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import useNftAPI from "../../../hooks/useNftApi";

import styles from "./style.module.scss";

const src =
   "https://images.unsplash.com/photo-1653393139347-91df2b722c33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";

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

   // if (!list?.data?.items[0]?.market) {
   //    console.log("lfkdl");
   //    return "loading...";
   // } else {
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
               {!list?.data?.items[0]?.market
                  ? "loading..."
                  : list?.data?.items.map((item) => (
                       <tr className={styles.TableBodyRow}>
                          <td>
                             <img src={item?.nft?.token_image} alt="img" />
                          </td>
                          <td>{item?.nft?.token_name}</td>
                          <td className={styles.ThirdOne}>
                             <div className={styles.CycPrice}>
                                CYC {item?.market?.price}
                             </div>
                             <div className={styles.UsdPrice}>$ 0</div>
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
      </div>
   );
   // }
};

export default ListedArtworkBottom;
