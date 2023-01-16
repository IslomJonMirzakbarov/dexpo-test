import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import NFTCard from "../../../../../components/NFTCard";
import styles from "../../style.module.scss";

const OriginalCollection = ({ collections, ref, matches, settings }) => {
  const navigate = useNavigate();
  const { price_krw } = useSelector((store) => store.wallet);
  return (
    <Box className={styles.collection} ref={ref}>
      {collections?.length < 5 && !matches ? (
        collections?.map(
          ({ nft, originalNft, artist, market, collection }, c) => {
            return (
              <Box key={c} className={styles.card}>
                <NFTCard
                  collection={collection}
                  img={nft.token_image}
                  name={nft.token_name}
                  price={originalNft?.price / price_krw}
                  startDate={market?.start_date}
                  endDate={market?.end_date}
                  leftDays={null}
                  artistName={artist.artist_name}
                  description={nft.token_name}
                  hasAction={false}
                  isSold={originalNft.is_sold}
                  purchaseCount={nft.like_count}
                  hasOriginal
                  tokenId={nft?.token_id}
                  isOriginalNft
                  contractAddress={collection?.contract_address}
                  onClick={() => {
                    navigate(
                      `/marketplace/original/${nft?.token_id}/${collection?.contract_address}`
                    );
                  }}
                  onAction={() => {
                    navigate(
                      `/marketplace/original/${nft?.token_id}/${collection?.contract_address}`
                    );
                  }}
                />
              </Box>
            );
          }
        )
      ) : (
        <Slider {...settings}>
          {collections?.map(
            ({ nft, originalNft, artist, market, collection }, c) => (
              <div className={styles.card} key={c}>
                <NFTCard
                  className={styles.card_item}
                  collection={collection}
                  img={nft.token_image}
                  name={nft.token_name}
                  price={originalNft?.price / price_krw}
                  startDate={market?.start_date}
                  endDate={market?.end_date}
                  leftDays={null}
                  artistName={artist.artist_name}
                  description={nft.token_name}
                  hasAction={false}
                  isSold={originalNft.is_sold}
                  purchaseCount={nft.like_count}
                  hasOriginal
                  tokenId={nft?.token_id}
                  isOriginalNft
                  contractAddress={collection?.contract_address}
                  onClick={() => {
                    navigate(
                      `/marketplace/original/${nft?.token_id}/${collection?.contract_address}`
                    );
                  }}
                  onAction={() => {
                    navigate(
                      `/marketplace/original/${nft?.token_id}/${collection?.contract_address}`
                    );
                  }}
                />
              </div>
            )
          )}
        </Slider>
      )}
    </Box>
  );
};

export default OriginalCollection;
