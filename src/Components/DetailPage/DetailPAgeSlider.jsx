import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {DetailPage} from "./DetailPage";
import {useHistory} from "react-router";
import {useSelector} from "react-redux";
import {getFlag} from "../Api/Api";




const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',

    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        textAlign: "center",
        cursor: "pointer"
    },
    root: {
        textAlign: "center",
        background: " none"
    },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function FullScreenDialog() {

    const cities = useSelector(state => state.cities.cities)

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const history = useHistory()
    const city = cities.find(el => el.name === cities[0].name)
    const country = city.sys.country
        .split("")
        .map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join("");
    const handleClose = () => {
        setOpen(false)
        history.push(`/`)
    };

    return (
        <div className="dialogPAge">
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}
                    className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title} onClick={handleClose}>
                            {city.name} <img alt="countryIco" src={getFlag(country)} className={classes.flag}/>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DetailPage/>
            </Dialog>
        </div>
    );
}