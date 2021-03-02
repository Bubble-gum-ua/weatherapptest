import React from "react";
import {Button, CardContent, Grid, makeStyles, Paper} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded'
import {useDispatch} from "react-redux";
import {deleteCard, getCity} from "../Redux/Card-reducers";
import {getFlag, getImage} from "../Api/Api";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        cursor: 'pointer',


    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        cursor: 'pointer',
        maxWidth: "300px",
        backgroundColor:"rgb(166, 217, 155)"
    },
    button: {
        backgroundColor: "blue",
        cursor: "pointer"
    }
}));

export const CityCard = React.memo((props) => {

    let {name, main, wind, icon, cityId, weather,sys} = props
    const country = sys.country
        .split("")
        .map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join("");

    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch();

    const deleteCardS = () => {
        dispatch(deleteCard(cityId))
    }

    const refreshCard = () => {
        dispatch(getCity(name, 'UPDATE'))
    }

    const redirect = () => {
        history.push(`/city/${name}`)
    }
    const dataRound = (value) => {
        return Math.round(value)
    }
    return (
        <div className={classes.root}>
            <CardContent>
                <Paper className={classes.paper} >
                    <h3> {name} <img alt="countryIco" src={getFlag(country)}/></h3>
                    <Grid container spacing={2} onClick={redirect}>
                        <Grid item xs={6}>
                            <div>Temperature: {dataRound(main.temp)} °C</div>
                            <div>Sky: {weather[0].main} </div>
                            <div>Wind: {dataRound(wind.speed)} m/s</div>
                        </Grid>
                        <Grid item xs={6}>
                            <img alt="weatherIco" src={getImage(icon)}/>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={refreshCard}
                        startIcon={<RefreshRoundedIcon/>}>
                        Reload Data
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={deleteCardS}
                        className={classes.button}
                        startIcon={<DeleteIcon/>}
                    >
                        Delete
                    </Button>
                </Paper>
            </CardContent>
        </div>
    );
})


