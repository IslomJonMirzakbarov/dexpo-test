import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
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

const Collections = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useMarketAPI({ page, type: filter?.value });

  const noItems = !data?.items?.length || data?.items?.length === 0;
  const mockData = Array(8).fill(12);

  const handleSelect = (item) => setFilter(item);

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
                      description={nft.token_description}
                      priceType={priceTypeChar?.[market?.type]}
                      hasAction={!!market?.price}
                      purchaseCount={nft.like_count}
                      onClick={() =>
                        navigate(
                          `/marketplace/${nft.token_id}/${collection?.contract_address}`
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
