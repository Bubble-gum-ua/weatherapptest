import React, {useEffect} from "react";
import {Button, Grid, makeStyles} from "@material-ui/core";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getDetails} from "../Redux/Card-reducers";
import {getFlag, getImage} from "../Api/Api";
import {convertTime} from "../Tools/Converter";
import {GraphChart} from "../Tools/GraphChart";
import "./DetailPage.css"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: "left",
        marginLeft: "15px"
    },
    content: {
        marginTop: "30px",
        background: "rgb(48,107,101,0.8)",
        color: "white",
        padding: "15px",
        boxShadow: "2px 2px 5px 2px rgb(169, 169, 101)",
        maxWidth: "200px"
    },
    button: {
        background: "rgb(48,107,101,0.8)",
        color: "white",
        fontSize: "18px"
    },
    graph: {
        background: "rgb(48,107,101,0.8)",
        marginTop: "40px",
        maxWidth: "600px"
    },
    flag:{
        width:"50px"
    }
}));


export const DetailPage = React.memo((props) => {
        const history = useHistory()
        const dispatch = useDispatch()
        const classes = useStyles();


        const cities = useSelector(state => state.cities.cities)
        const detailCard = useSelector(state => state.cities.detailsPage)

        const city = cities.find(el => el.name === cities[0].name)
        const icon = city.weather[0].icon

        const country = city.sys.country
            .split("")
            .map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
            .join("");
        let sunrise = convertTime(city.sys.sunrise);
        let sunset = convertTime(city.sys.sunset);

        useEffect(() => {
            if (city) {
                dispatch(getDetails(city.coord.lat, city.coord.lon))
            }
        }, [city, dispatch])

        const redirectToMAin = () => {
            history.push(`/`)
        }
        const dataRound = (value) => {
            return Math.round(value)
        }
        return (
            <div className="mainContentWrapp">
                <h1>{city.name}</h1>
                <img alt="countryIco" src={getFlag(country)} className={classes.flag}/>
                <h2> Temperature: {dataRound(city.main.temp)} °C</h2>
                <Button onClick={redirectToMAin} className={classes.button}>
                    Back to all cards
                </Button>
                <Grid container spacing={4} className={classes.root}>
                    <Grid item xs={5}>
                        <div className={classes.content}>
                            <div>Feels like: {dataRound(city.main.feels_like)} C</div>
                            <div>Humidity: {city.main.humidity} %</div>
                            <div>Pressure: {city.main.pressure}</div>
                            <div>Max temperature: {dataRound(city.main.temp_max)} °C</div>
                            <div>Min temperature: {dataRound(city.main.temp_min)} °C</div>
                            <div>Wind: {city.wind.speed} m/s {city.wind.deg} degree</div>
                            <div>Sunrise: {sunrise}</div>
                            <div>Sunset: {sunset}</div>
                            <img alt="weatherIco" src={getImage(icon)}/>
                        </div>
                    </Grid>
                    <Grid item xs={3} className={classes.graph}>
                        <GraphChart detailCard={detailCard}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
)
