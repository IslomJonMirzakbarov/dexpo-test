import { Box, Modal, Typography } from '@mui/material'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import { useTranslation } from 'react-i18next'

const ScrollModal = ({ open, handleClose, description }) => {
  const { t } = useTranslation()
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
            width: '745px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            height: '70vh',
            margin: '100px',
            '@media (max-width: 600px)': {
              margin: '20px'
            },
            position: 'relative',
            borderRadius: '7px'
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <Box
            sx={{
              width: '100%',
              height: '60px',
              background: '#F4F4F4',
              border: '1px solid #DEDEDE',
              borderRadius: '7px 7px 0px 0px',
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0'
            }}
          >
            <Typography
              variant='h4'
              textTransform='uppercase'
              fontWeight={700}
              marginLeft='26px'
              marginTop='15px'
              fontSize={20}
              sx={{
                '@media (max-width: 600px)': {
                  fontSize: '20px !important'
                }
              }}
            >
              {t('artwork_details')}
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: '50px',
              height: 'calc(100% - 50px)',
              overflowY: 'scroll',
              paddingRight: '8px'
            }}
          >
            <Typography
              id='modal-description'
              variant='body1'
              fontWeight={400}
              fontSize={18}
              sx={{
                '@media (max-width: 600px)': {
                  fontSize: '16px !important'
                }
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            ></Typography>
          </Box>
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
            '@media (max-width: 600px)': {
              right: 15
            },
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
