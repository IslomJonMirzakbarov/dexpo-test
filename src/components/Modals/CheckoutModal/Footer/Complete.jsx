import React from 'react';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 0,
    cursor: 'default',
    padding: '15px'
  }
}));
const CompleteFooter = ({ tokenId, contractAddress }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClick = () => navigate(`/user/nft/${tokenId}/${contractAddress}`);

  return (
    <Button
      fullWidth
      className={classes.button}
      variant="containedSecondary1"
      onClick={handleClick}
    >
      <Typography variant="placeholder" fontWeight={600}>
        View Item
      </Typography>
    </Button>
  );
};

export default CompleteFooter;
