import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DSelect from '../../../components/DSelect';
import CollectionCard from './CollectionCard';
import styles from './style.module.scss';

const mockList = [
  {
    label: 'last 24 hours',
    value: 24
  },
  {
    label: 'last 7 days',
    value: 7
  },
  {
    label: 'last 30 days',
    value: 30
  }
];

const TopCollections = ({ collections = [] }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(mockList[0]);

  const handleSelect = (item) => setFilter(item);

  const collections1 = collections?.slice(0, 3);
  const collections2 = collections?.slice(3, 6);
  const collections3 = collections?.slice(6);

  return (
    <Paper variant="div" className={styles.container}>
      <Container maxWidth>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2">Top Collections</Typography>
        </Box>
        <Box display="flex" justifyContent="end" mt={2}>
          <DSelect
            label="last 24 hours"
            isDark={true}
            value={filter}
            items={mockList}
            onSelect={(item) => handleSelect(item)}
          />
        </Box>
        <Grid container spacing={2} mt={2}>
          <Grid item lg={4}>
            {collections1?.map(({ collection }, i) => (
              <Box key={i} mt={2} pr={2}>
                <CollectionCard
                  index={i + 1}
                  name={collection.name}
                  price={collection.floor_price}
                  src={collection.logo_url}
                />
              </Box>
            ))}
          </Grid>
          <Grid item lg={4}>
            {collections2?.map(({ collection }, i) => (
              <Box key={i} mt={2}>
                <CollectionCard
                  index={i + 3}
                  name={collection.name}
                  price={collection.floor_price}
                  src={collection.logo_url}
                />
              </Box>
            ))}
          </Grid>
          <Grid item lg={4}>
            {collections3?.map(({ collection }, i) => (
              <Box key={i} mt={2} pl={2}>
                <CollectionCard
                  index={i + 6}
                  name={collection.name}
                  price={collection.floor_price}
                  src={collection.logo_url}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" mt={10}>
          <Button
            variant="containedPrimary"
            onClick={() => navigate('/rankings')}
          >
            Go To Rankings
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default TopCollections;
