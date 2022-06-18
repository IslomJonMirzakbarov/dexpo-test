import React from 'react'
import { Box , Button, ButtonGroup }from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root:{
        height:'55vh'
    },
    box: {
        width: '50%',
        height: '100%',
        '& img':{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
    },
    title:{
        margin: '20px 70px',
        fontSize: 42,
        width: '70%',
    },
    description:{
        fontSize: 20,
        width: '70%',
        margin: '20px 70px'
    },
    buttonGroup:{
        margin: '20px 70px',
        width: '100%',
    }
})

const CarouselItem = ({item}) => {
    const classes = useStyles()
    return (
        <Box 
            className={classes.root}
            display="flex" 
            alignItems="center" 
            justifyContent="space-between"
        >
            <Box 
                className={classes.box}
                display="flex" 
                justifyContent="center" 
                flexDirection="column"
            >
                <h2 className={classes.title}>{item.name}</h2>
                <p className={classes.description}>{item.description}</p>
                <ButtonGroup className={classes.buttonGroup}>
                    <Button variant='contained'>
                        Create
                    </Button>
                    <Button variant='outlined'>
                        Explore
                    </Button>
                </ButtonGroup>
            </Box>
            <Box className={classes.box}>
                <img src={item.img} alt={item.name}/>
            </Box>
        </Box>
    )
}

export default CarouselItem