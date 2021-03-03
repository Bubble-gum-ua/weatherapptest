import React from "react";
import {CityCard} from "../CardComponent/CardComponent";
import "./MainBody.css";
import {SearchFormItem} from "./SearchFormItem";
import {Grid, makeStyles} from "@material-ui/core";
import {useSelector} from "react-redux";
import {Preloader} from "../Tools/Preloader";
import MainIco from "../Assets/day.svg"



const useStyles = makeStyles({
    root: {
        minWidth: 275,
    }
});

export const MainBody = React.memo(props => {
    const classes = useStyles();

    let cardAdd = props.cities.map(cities =>
        <Grid item>
            <Grid item>
                <CityCard name={cities.name}
                          main={cities.main}
                          cityId={cities.id}
                          wind={cities.wind}
                          weather={cities.weather}
                          icon={cities.weather[0].icon}
                          sys={cities.sys}/>
            </Grid>
        </Grid>
    )
    const isLoading = useSelector(state => state.main.isLoading)

    return (
        <div className="mainWrap">
            <h1>Welcome to the weather widget! <img src={MainIco} alt="mainIco"/></h1>
            <h3>Click below to set your city</h3>
            <SearchFormItem/>
            {isLoading && <div><Preloader/></div>}
            <Grid container className={classes.root} spacing={2}>
                {cardAdd}
            </Grid>
        </div>
    )
})






