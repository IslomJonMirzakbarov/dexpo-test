import { Box } from '@mui/system'
import styles from './style.module.scss'
import classNames from 'classnames'

const CustomSwitch = ({ handleClick, activeOption, SwitchOptions }) => {
  return (
    <Box className={styles.SwitchContainer}>
      <Box
        className={classNames(styles.ToggleItem, {
          [styles.active]: activeOption === 1
        })}
        onClick={() => handleClick(1)}
      >
        <Box className={styles.Text}>Original</Box>
      </Box>
      <Box
        className={classNames(styles.ToggleItem, {
          [styles.activeNft]: activeOption === 2
        })}
        onClick={() => handleClick(2)}
      >
        <Box className={styles.Text}>Nft</Box>
      </Box>
    </Box>
  )
}

export default CustomSwitch
