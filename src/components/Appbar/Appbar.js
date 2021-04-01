import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import covidIcon from './coviIcon.svg';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontFamily:"'Lato', sans-serif",
        color:'red'
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{
                backgroundColor:"#706c61"
            }}>
                <Toolbar >
                    <Typography variant="h5" className={classes.title}>
                        Covid Tracker
                    </Typography>
                    <img src={covidIcon} width={60} alt=""/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
