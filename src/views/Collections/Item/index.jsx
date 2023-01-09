import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import CollectionInfo from "./Info";
import CollectionList from "./List";
import styles from "./style.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { securedAPI } from "../../../services/api";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

import CollectionInfoSkeleton from "./Info/index.skeleton";
import CPagination from "../../../components/CPagination";
import useNftAPI from "../../../hooks/useNftApi";
import { getPaginationDetailsByPathname } from "../../../utils/paginationQueries";
import { sortTypes } from "./List/Items/Header";

const getCollectionDetail = (token, id) =>
  securedAPI(token)
    .get("/api/collection/detail", {
      params: {
        contract_address: id,
      },
    })
    .then((res) => res.data);

const CollectionItem = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { token } = useSelector((store) => store.auth);
  const { search } = useLocation();

  const urlDetails = getPaginationDetailsByPathname(search);

  const [searchInput, setSearchInput] = useState(urlDetails?.search);

  const page = useMemo(
    () => (urlDetails?.page > 0 ? urlDetails?.page : 1),
    [urlDetails?.page]
  );

  const sort = useMemo(() => {
    const seletedFilter = sortTypes.find((item) =>
      item.value.includes(urlDetails?.sort)
    );
    return seletedFilter;
  }, [urlDetails?.sort]);

  const handleChangeSearch = (e) => {
    setSearchInput(e.target.value);
    navigate(
      `/collections/${id}?page=1${sort ? `&sort=${sort.value}` : ""}${
        searchInput ? `&search=${e.target.value}` : ""
      }`
    );
  };

  const handleSelect = (item) => {
    navigate(
      `/collections/${id}?page=${page}&sort=${item.value}${
        searchInput ? `&search=${searchInput}` : ""
      }`
    );
  };

  const handlePaginate = (next) => {
    navigate(
      `/collections/${id}?page=${next}${sort ? `&sort=${sort?.value}` : ""}${
        searchInput ? `&search=${searchInput}` : ""
      }`
    );
  };

  const { data, isLoading } = useQuery(
    `GET-COLLECTION-ITEM-${id}`,
    () => getCollectionDetail(token, id),
    {
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    }
  );

  const { nftListCollection, loadingListByCollection } = useNftAPI({
    isGetListByCollection: true,
    contractAddress: id,
    size: 20,
    type: sort?.value,
    search_query: searchInput,
    page,
  });

  const innerData = data?.data;
  const innerList = nftListCollection?.data?.items;
  const totalPages = nftListCollection?.data?.totalPages;
  const noItems = !innerList?.length || innerList?.length === 0;
  const isGuest = search?.includes("user=false");

  return (
    <div className={styles.container}>
      <Box className={styles.info}>
        {isLoading ? (
          <CollectionInfoSkeleton />
        ) : (
          <CollectionInfo
            key={id}
            artistName={innerData?.artist?.artist_name}
            collectionName={innerData?.collection?.name}
            artistImg={innerData?.collection?.logo_url}
            items={innerData?.items}
            owners={innerData?.owners}
            totalVol={innerData?.tradeVolume}
            floorPrice={innerData?.collection?.floor_price}
          />
        )}
      </Box>
      <Box className={styles.list}>
        <CollectionList
          isLoading={loadingListByCollection}
          data={innerList}
          contract_address={id}
          isGuest={isGuest}
          sort={sort}
          noItems={!loadingListByCollection && noItems}
          searchInput={searchInput}
          handleChangeSearch={handleChangeSearch}
          handleChangeSort={handleSelect}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {totalPages > 1 && (
          <CPagination
            page={page ? Number(page) : 1}
            setCurrentPage={handlePaginate}
            count={totalPages}
          />
        )}
      </Box>
    </div>
  );
};

export default CollectionItem;
