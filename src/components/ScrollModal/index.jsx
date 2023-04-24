import { Box, Modal, Typography } from '@mui/material'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'

const ScrollModal = ({ open, handleClose, description }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        onClick={handleClose}
      >
        <Box
          sx={{
            width: '70vw',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: 'scroll',
            height: '70vh',
            margin: '100px'
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <Typography
            id='modal-description'
            variant='body1'
            fontWeight={400}
            fontSize={18}
            dangerouslySetInnerHTML={{ __html: description }}
          ></Typography>
        </Box>

        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: 'rgb(31, 31, 31)',
            borderRadius: '25%',
            position: 'fixed',
            top: 35,
            right: 35,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={handleClose}
        >
          <HighlightOffRoundedIcon
            sx={{
              width: 30,
              height: 30,
              color: '#fff'
            }}
          />
        </Box>
      </Box>
    </Modal>
  )
}

export default ScrollModal
