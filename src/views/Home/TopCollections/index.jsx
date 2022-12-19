import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

import useTopCollections from "../../../hooks/useTopCollectionsAPI";
import CollectionCard from "./CollectionCard";
import CollectionCardSkeleton from "./CollectionCard/index.skeleton";
import styles from "./style.module.scss";

const TopCollections = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { collections, connectCollections, isLoading } = useTopCollections();

  useEffect(() => {
    if (!collections && inView) return connectCollections();
  }, [inView]);

  const collections1 = collections?.items?.slice(0, 3);
  const collections2 = collections?.items?.slice(3, 6);
  const collections3 = collections?.items?.slice(6, 9);

  const mockedColls = Array(3).fill(1);

  return (
    <Paper variant="div" className={styles.container}>
      <Container maxWidth>
        <Box display="flex" justifyContent="center" className={styles.filter}>
          <Typography variant="h2" fontWeight={700}>
            Top Collections
          </Typography>
        </Box>
        <Grid container spacing={2} mt={2} className={styles.grid} ref={ref}>
          <Grid item lg={4} sm={12} className={styles.gridContainer}>
            {isLoading
              ? mockedColls?.map((_, i) => (
                  <Box key={i} mt={2} pr={2} className={styles.gridItem}>
                    <CollectionCardSkeleton />
                  </Box>
                ))
              : collections1?.map(({ collection }, i) => (
                  <Box key={i} mt={2} pr={2} className={styles.gridItem}>
                    <CollectionCard
                      index={i + 1}
                      name={collection.name}
                      price={collection.floor_price}
                      src={collection.logo_url}
                      onClick={() =>
                        navigate(`/collections/${collection.contract_address}`)
                      }
                    />
                  </Box>
                ))}
          </Grid>
          <Grid item lg={4} sm={12} className={styles.gridContainer}>
            {isLoading
              ? mockedColls?.map((_, i) => (
                  <Box key={i} mt={2} pr={2} className={styles.gridItem}>
                    <CollectionCardSkeleton />
                  </Box>
                ))
              : collections2?.map(({ collection }, i) => (
                  <Box key={i} mt={2} pr={2} className={styles.gridItem}>
                    <CollectionCard
                      index={i + 4}
                      name={collection.name}
                      price={collection.floor_price}
                      src={collection.logo_url}
                      onClick={() =>
                        navigate(`/collections/${collection.contract_address}`)
                      }
                    />
                  </Box>
                ))}
          </Grid>
          <Grid item lg={4} sm={12} className={styles.gridContainer}>
            {isLoading
              ? mockedColls?.map((_, i) => (
                  <Box key={i} mt={2} pr={2} className={styles.gridItem}>
                    <CollectionCardSkeleton />
                  </Box>
                ))
              : collections3?.map(({ collection }, i) => (
                  <Box key={i} mt={2} pr={2} className={styles.gridItem}>
                    <CollectionCard
                      index={i + 7}
                      name={collection.name}
                      price={collection.floor_price}
                      src={collection.logo_url}
                      onClick={() =>
                        navigate(`/collections/${collection.contract_address}`)
                      }
                    />
                  </Box>
                ))}
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          mt={10}
          className={styles.footer}
        >
          <Button
            variant="containedPrimary"
            onClick={() => navigate("/rankings")}
            sx={{ width: 180, height: 55, padding: 0 }}
          >
            Go To Rankings
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default TopCollections;
