import { Button, Dialog } from '@mui/material'
import cls from './style.module.scss'
import contactUsImg from '../../../../assets/images/contactUs.png'

export default function ContactUsModal({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <div className={cls.box}>
        <div className={cls.img}>
          <img src={contactUsImg} alt='contact us' />
        </div>
        <div className={cls.contactInfo}>
          <h4>Purchase Inquiry</h4>
          <div className={cls.info}>
            <div className={cls.element}>
              <p>Number</p>
              <p>
                <a href='tel: 010-8266-0208'>010-8266-0208</a>
              </p>
            </div>
            <div className={cls.element}>
              <p>Mail</p>
              <p>
                <a href='mailto: cs@dexpo.world'>cs@dexpo.world</a>
              </p>
            </div>
          </div>
        </div>
        <Button
          className={cls.button}
          variant='containedSecondary'
          fullWidth
          sx={{ height: 55 }}
          onClick={handleClose}
        >
          Contact us
        </Button>
      </div>
    </Dialog>
  )
}
