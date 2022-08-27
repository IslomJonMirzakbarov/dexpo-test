import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import DSelect from '../../components/DSelect';
import styles from './style.module.scss';
import SearchField from '../../components/Autocomplete';
import NFTCard from '../../components/NFTCard';
import CPagination from '../../components/CPagination';
import { useNavigate } from 'react-router-dom';
import useMarketAPI from '../../hooks/useMarketAPI';
import { priceTypeChar } from '../../constants';
import NFTCardSkeleton from '../../components/NFTCard/index.skeleton';
import NoItemsFound from '../../components/NoItems';
import { marketFilterList } from '../../constants/marketFilter';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';

const Collections = () => {
  const navigate = useNavigate();

  const { account } = useSelector((store) => store.wallet);

  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const [input, setInput] = useState();

  const { data, isLoading } = useMarketAPI({
    page,
    type: filter?.value,
    search
  });

  const noItems = !data?.items?.length || data?.items?.length === 0;
  const mockData = Array(8).fill(12);

  const debounced = useCallback(
    debounce((val) => setSearch(val), 300),
    []
  );

  useEffect(() => {
    debounced(input);
  }, [input]);

  const handleChange = (e) => setInput(e.target.value);

  const handleSelect = (item) => setFilter(item);

  const handleNavigate = (tokenId, address, wallet) => {
    const loweredWallet = wallet?.toLowerCase();
    const loweredAccount = account?.toLowerCase();

    if (!loweredWallet?.includes(loweredAccount))
      return navigate(`/marketplace/${tokenId}/${address}`);
    return navigate(`/user/nft/${tokenId}/${address}`);
  };

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
            Marketplace
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={5}
        >
          <SearchField
            isDark={true}
            isBackdrop={false}
            placeholder="Search items & creators"
            value={input}
            onChange={handleChange}
          />
          <DSelect
            label="Filter"
            value={filter}
            items={marketFilterList}
            onSelect={(item) => handleSelect(item)}
          />
        </Box>
        <Box display="flex" my={4}>
          <Grid container spacing={3}>
            {isLoading
              ? mockData.map((_, i) => (
                  <Grid item key={i} lg={12 / 5}>
                    <NFTCardSkeleton />
                  </Grid>
                ))
              : data?.items?.map(({ nft, artist, market, collection }, i) => (
                  <Grid item key={i} lg={12 / 5}>
                    <NFTCard
                      img={nft.token_image}
                      name={nft.token_name}
                      price={market?.price}
                      startDate={market?.start_date}
                      endDate={market?.end_date}
                      leftDays={null}
                      artistName={artist.artist_name}
                      description={nft.token_name}
                      priceType={priceTypeChar?.[market?.type]}
                      hasAction={!!market?.price}
                      purchaseCount={nft.like_count}
                      tokenId={nft?.token_id}
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
                ))}
          </Grid>
        </Box>
        {!isLoading && noItems && <NoItemsFound />}
        {data?.totalPages > 1 && (
          <CPagination
            count={data?.totalPages}
            page={page}
            setCurrentPage={setPage}
          />
        )}
      </Container>
    </Paper>
  );
};

export default Collections;
