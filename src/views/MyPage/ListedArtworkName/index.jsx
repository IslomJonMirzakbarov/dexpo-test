import React from "react";
import moment from "moment";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import useNftAPI from "../../../hooks/useNftApi";

import styles from "./style.module.scss";

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

   const loadChecker =
      list?.data?.items[0] &&
      !Object.keys(list?.data?.items[0]).includes("market");

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
               {loadChecker
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
};

export default ListedArtworkBottom;
