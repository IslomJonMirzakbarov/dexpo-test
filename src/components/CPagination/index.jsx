import { Box, Pagination } from '@mui/material';

const CPagination = ({ setCurrentPage = () => {}, ...props }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
      <Pagination
        color="primary"
        shape="rounded"
        onChange={(e, val) => setCurrentPage(val)}
        hidePrevButton
        hideNextButton
        {...props}
      />
    </Box>
  );
};

export default CPagination;
