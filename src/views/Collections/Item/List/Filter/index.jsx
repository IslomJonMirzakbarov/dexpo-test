import { Box, Button, InputBase, Paper } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React from 'react'
import styles from './style.module.scss'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    accordion: {
        marginBottom: '10px'
    },
    input: {
        width: 100,
        border: '1px solid #c1c1c1',
        padding: '0 5px',
        borderRadius: 4
    }
}))

const CollectionFilter = () => {
    const classes = useStyles()
    return (
        <Paper variant="div" className={styles.container}>
             <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>Status</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="All Items" />
                        <FormControlLabel control={<Checkbox />} label="Epic" />
                        <FormControlLabel control={<Checkbox />} label="Rare" />
                        <FormControlLabel control={<Checkbox />} label="Standard" />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="price-filter"
                    id="price-filter"
                >
                <Typography>Price filter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box 
                        display="flex" 
                        alignItems="center"
                        justifyContent="space-between"
                        mb={2}
                    >
                        <InputBase 
                            placeholder='Min' 
                            type="number"
                            className={classes.input}
                        />
                        <Typography variant="h5">
                            -
                        </Typography>
                        <InputBase 
                            placeholder='Max' 
                            type="number"
                            className={classes.input}
                        />
                    </Box>
                    <Button variant='outlined' fullWidth>Submit</Button>
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
}

export default CollectionFilter