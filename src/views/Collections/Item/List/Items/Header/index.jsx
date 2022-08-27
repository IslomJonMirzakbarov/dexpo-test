import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from '../style.module.scss';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import FormControl from '@mui/material/FormControl';
import SearchField from '../../../../../../components/Autocomplete';
import DSelect from '../../../../../../components/DSelect';

const sortTypes = [
  {
    label: 'Recently published',
    value: 'recently'
  },
  {
    label: 'Price: low to high',
    value: 'price-des'
  },
  {
    label: 'Price: high to low',
    value: 'price-asc'
  },
  {
    label: 'Common',
    value: 'common'
  },
  {
    label: 'Rare',
    value: 'rare'
  }
];

const useStyles = makeStyles((theme) => ({
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '250px',
    border: '1px solid transparent'
  },
  active: {
    borderColor: theme.palette.primary.main,
    '& svg': {
      color: theme.palette.primary.main
    }
  }
}));

const CollectionHeader = ({
  sort = '',
  searchInput = '',
  handleChangeSort,
  handleChangeSearch
}) => {
  const classes = useStyles();

  return (
    <Box
      className={styles.header}
      display="flex"
      justifyContent="space-between"
    >
      <Paper component="form" className={classNames(classes.search)}>
        <SearchField
          placeholder="Search Items, Creators"
          inputProps={{ 'aria-label': 'search nfts' }}
          value={searchInput}
          onChange={handleChangeSearch}
          isDark={true}
        />
      </Paper>
      <FormControl>
        <DSelect
          label="Filter"
          isDark={false}
          hasGradient={true}
          value={sort}
          items={sortTypes}
          onSelect={handleChangeSort}
        />
      </FormControl>
    </Box>
  );
};

export default CollectionHeader;
