import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DSelect from "../../components/DSelect";
import styles from "./style.module.scss";
import SearchField from "../../components/Autocomplete";
import NFTCard from "../../components/NFTCard";
import CPagination from "../../components/CPagination";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import useMarketAPI from "../../hooks/useMarketAPI";
import { priceTypeChar } from "../../constants";
import NFTCardSkeleton from "../../components/NFTCard/index.skeleton";
import NoItemsFound from "../../components/NoItems";
import {
  marketFilterList,
  orginalNftFilterList,
} from "../../constants/marketFilter";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { makeStyles, useTheme } from "@mui/styles";
import { getPaginationDetailsByPathname } from "../../utils/paginationQueries";
import CustomSwitch from "../../components/CustomSwitch";
import useOriginalNftAPI from "../../hooks/useOriginalNftAPI";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  filter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-end",
      width: "100%",
      marginTop: 15,
    },
  },
  search: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      width: "100%",
      marginBottom: 0,
    },
  },
}));

const OriginalNftList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { price_krw } = useSelector((store) => store.wallet);
  const urlDetails = getPaginationDetailsByPathname(location.search);

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [search, setSearch] = useState(urlDetails?.search);
  const [input, setInput] = useState(
    urlDetails?.search
      ? decodeURIComponent(urlDetails?.search)
      : urlDetails?.search
  );

  const filter = useMemo(() => {
    if (urlDetails?.filter) {
      const seletedFilter = orginalNftFilterList.find((item) =>
        item.value.includes(urlDetails?.filter)
      );
      return seletedFilter;
    }
    return "";
  }, [urlDetails?.filter]);

  const page = useMemo(
    () => (urlDetails?.page > 0 ? urlDetails?.page : 1),
    [urlDetails?.page]
  );

  const { data, isLoading } = useOriginalNftAPI({
    page,
    search,
    type: filter?.value,
  });

  const noItems = !data?.items?.length || data?.items?.length === 0;
  const mockData = Array(8).fill(12);

  const debounced = useCallback(
    debounce((val) => setSearch(val), 300),
    []
  );

  const handleSelect = (item) => {
    navigate(
      `/originalNft?page=1&filter=${item.value}${
        search ? `&search=${search}` : ""
      }`
    );
  };

  useEffect(() => {
    debounced(input);
  }, [input]);

  const handleSwitchClick = (index) => {
    if (index === 1) {
      navigate(`/originalNft`);
    }
    if (index === 2) {
      navigate(`/marketplace`);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    navigate({
      pathname: "/originalNft",
      search: createSearchParams({
        page: 1,
        search: e.target.value,
        filter: filter?.value || "",
      }).toString(),
    });
  };

  const handleNavigate = (tokenId, address) => {
    return navigate(`/marketplace/original/${tokenId}/${address}`);
  };

  const handlePaginate = (next) => {
    navigate(
      `/originalNft?page=${next}${filter ? `&filter=${filter?.value}` : ""}${
        search ? `&search=${search}` : ""
      }`
    );
  };
  const { t } = useTranslation();
  return (
    <Paper className={styles.container}>
      <Container maxWidth>
        <Box display="flex" justifyContent="center">
          <Typography
            variant="h2"
            fontWeight={700}
            fontSize="40px!important"
            lineHeight="60px"
          >
            {t("Marketplace")}
          </Typography>
        </Box>
        <Box className={styles.SwitchFilterBox} mt={5}>
          <Box className={styles.SwitchBox}>
            <CustomSwitch handleClick={handleSwitchClick} activeOption={1} />
            <Typography className={styles.SwitchText}>
              <Typography>*</Typography>
              <Typography>
                {t("Purchase Original Artworks with CYCON")}
              </Typography>
            </Typography>
          </Box>
          <Box className={classes.filter}>
            <SearchField
              isDark={true}
              isBackdrop={false}
              placeholder={t("Search items & creators")}
              value={input}
              onChange={handleChange}
              paperClass={classes.search}
            />
            <DSelect
              label="Filter"
              value={filter}
              items={orginalNftFilterList}
              onSelect={(item) => handleSelect(item)}
            />
          </Box>
        </Box>
        <Box display="flex" my={4}>
          <Grid container spacing={matches ? 0 : 3}>
            {isLoading
              ? mockData.map((_, i) => (
                  <Grid
                    item
                    key={i}
                    lg={12 / 5}
                    my={matches ? 2 : 0}
                    sx={{ width: "100%" }}
                  >
                    <NFTCardSkeleton />
                  </Grid>
                ))
              : data?.items?.map(
                  ({ nft, artist, market, collection, originalNft }, i) => (
                    <Grid
                      item
                      key={i}
                      lg={12 / 5}
                      sm={1}
                      my={matches ? 2 : 0}
                      sx={{ width: "100%" }}
                    >
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
                        // priceType={priceTypeChar?.[market?.type]}
                        hasAction={false}
                        isSold={originalNft.is_sold}
                        purchaseCount={nft.like_count}
                        hasOriginal
                        tokenId={nft?.token_id}
                        isOriginalNft
                        contractAddress={collection?.contract_address}
                        onClick={() =>
                          handleNavigate(
                            nft.token_id,
                            collection?.contract_address,
                            market?.seller_address
                          )
                        }
                        onAction={() =>
                          handleNavigate(
                            nft.token_id,
                            collection?.contract_address,
                            market?.seller_address
                          )
                        }
                      />
                    </Grid>
                  )
                )}
          </Grid>
        </Box>
        {!isLoading && noItems && <NoItemsFound />}
        {data?.totalPages > 1 && (
          <CPagination
            count={data?.totalPages}
            page={page ? Number(page) : 1}
            setCurrentPage={handlePaginate}
            hidePrevButton={false}
            hideNextButton={false}
            showFirstButton={true}
            showLastButton={true}
            siblingCount={1}
          />
        )}
      </Container>
    </Paper>
  );
};

export default OriginalNftList;
