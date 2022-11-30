import { Box, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import NumberFormat from "react-number-format";
import { CTableCell, CTableRow } from "../../../components/CTable";
import styles from "./style.module.scss";
import CollectionItemImg from "../../../assets/icons/profile-img-icon.svg?component";
import defaultImg from "/src/assets/images/artist-default.png";
import ConTokenImg from "../../../assets/images/con-token.svg?component";

const TableItem = ({
  img,
  name,
  index,
  volume,
  type, // 'down' | 'up'
  percent,
  floorPrice,
  itemsCount,
  ownersCount,
  isArtists = false,
  onClick,
  isResponsive,
}) => {
  return (
    <CTableRow onClick={onClick}>
      <CTableCell>
        <Box display="flex" alignItems="center">
          <Typography>
            {index < 10 && "0"}
            {index}
          </Typography>
          {img ? (
            <img
              src={img}
              className={styles.img}
              alt={name}
              width={40}
              height={40}
            />
          ) : (
            <img
              src={defaultImg}
              alt="Name"
              width={40}
              height={40}
              className={styles.img}
            />
          )}
          <Typography className="placeholder" fontWeight={600}>
            {name}
          </Typography>
        </Box>
      </CTableCell>
      {isResponsive ? (
        <CTableCell>
          <Box display="flex" alignItems="center" mb={1} justifyContent="end">
            <ConTokenImg
              style={{
                width: 25,
                height: 25,
              }}
            />
            <Typography variant="placeholder" fontWeight={600} ml={1}>
              <NumberFormat
                value={volume}
                displayType={"text"}
                decimalScale={6}
                thousandSeparator={true}
              />
            </Typography>
          </Box>
          <Typography
            variant="placeholder"
            fontWeight={600}
            className={classNames(styles.percent, styles[type])}
          >
            <NumberFormat
              value={percent}
              displayType={"text"}
              decimalScale={6}
              thousandSeparator={true}
            />
          </Typography>
        </CTableCell>
      ) : (
        <>
          <CTableCell>
            <Box display="flex" alignItems="center">
              <ConTokenImg
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Typography variant="placeholder" fontWeight={600} ml={1}>
                <NumberFormat
                  value={volume}
                  displayType={"text"}
                  decimalScale={6}
                  thousandSeparator={true}
                />
              </Typography>
            </Box>
          </CTableCell>
          {!isArtists && (
            <CTableCell>
              <Typography
                variant="placeholder"
                fontWeight={600}
                className={classNames(styles.percent, styles[type])}
              >
                <NumberFormat
                  value={percent}
                  displayType={"text"}
                  decimalScale={6}
                  thousandSeparator={true}
                />
              </Typography>
            </CTableCell>
          )}
          {!isArtists && (
            <CTableCell>
              <Box display="flex" alignItems="center">
                <ConTokenImg
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
                <Typography variant="placeholder" fontWeight={600} ml={1}>
                  <NumberFormat
                    value={floorPrice}
                    displayType={"text"}
                    decimalScale={6}
                    thousandSeparator={true}
                  />
                </Typography>
              </Box>
            </CTableCell>
          )}
          <CTableCell>
            <Typography variant="placeholder" fontWeight={600}>
              {ownersCount}
            </Typography>
          </CTableCell>
          <CTableCell>
            <Typography variant="placeholder" fontWeight={600}>
              {itemsCount}
            </Typography>
          </CTableCell>
        </>
      )}
    </CTableRow>
  );
};

export default TableItem;
