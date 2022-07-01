import { useNavigate } from "react-router-dom"
import BackButton from "../BackButton"
import IconGenerator from "../IconPicker/IconGenerator"
import styles from "./style.module.scss"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import classnames from 'classnames'
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles(theme => ({
    paper: { 
      padding: '2px 4px', 
      display: 'flex', 
      alignItems: 'center', 
      width: 200,
      border:'1px solid #c1c1c1',
      transition:'0.4s ease-in-out',
      zIndex: 11,
      position: 'relative'
    },
    active: {
      width: 400,
      borderColor: theme.palette.primary.main,
      '& svg':{
        color: theme.palette.primary.main,
      }
    },
    input: {
      marginLeft: 5,
      flex: 1
    },
    overlay:{
      transition:'0.4s ease-in-out all'
    },
    overlayOn: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
      height: '100vh',
      width: '100vw',
      backdropFilter: 'blur(4px)',
      backgroundColor: 'rgba(0,0,0,0.3)'
    }
  })
)

const SearchField = () => {
  const classes = useStyles()
  const [focused, setFocused] = useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  return (
      <>
        <Paper
          component="form"
          className={
            classnames(
              classes.paper,
              { 
                [classes.active]: focused 
              }
            )
          }
        >
          <InputBase
            className={classes.input}
            placeholder="Search NFTs Artists"
            inputProps={{ 'aria-label': 'search nfts' }}
            onFocus={onFocus} 
            onBlur={onBlur}
          />
          <SearchIcon />
        </Paper>

        <Box className={classnames(classes.overlay,`${focused && classes.overlayOn}`)}></Box>
      </>
    )
}

const Header = ({
  title = "",
  subtitle,
  extra,
  children,
  loader,
  backButtonLink,
  icon,
  sticky,
  ...props
}) => {

  const navigate = useNavigate()

  return (
    <div className={`${styles.header} ${sticky ? styles.sticky : ''}`}  {...props}>
      <div className={styles.leftSide} onClick={() => navigate('/')}> 
        {backButtonLink && <BackButton link={backButtonLink} />}

        {icon && <IconGenerator className={styles.icon} icon={icon} />}

        <div className={styles.titleBlock}>
          {title && <div className={styles.title}>{title}</div>}
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>

        <div className={styles.line} />

        <div>
          {children}
        </div>
        
        <div className={styles.search}>
          <SearchField />
        </div>
      </div>

      <div style={styles.rightSide}>{extra}</div>
    </div>
  )
}

export default Header
