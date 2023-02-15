import { Box, Pagination } from '@mui/material'

const CPagination = ({ setCurrentPage = () => {}, mt = 10, ...props }) => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' mt={mt}>
      <Pagination
        color='primary'
        shape='rounded'
        onChange={(e, val) => setCurrentPage(val)}
        hidePrevButton
        hideNextButton
        {...props}
      />
    </Box>
  )
}

export default CPagination
