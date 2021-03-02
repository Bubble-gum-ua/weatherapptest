import React from "react";
import {CityCard} from "../CardComponent/CardComponent";
import "./MainBody.css";

import {SearchFormItem} from "./SearchFormItem";
import {Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    }
});

export const MainBody = React.memo(props => {
    const classes = useStyles();

    let cardAdd = props.cities.map(cities =>
        <Grid item xs={4}>
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

    return (
        <div className="mainWrap">
            <h1>Welcome to the weather widget!</h1>
            <h3>Click below to set your city</h3>
            <SearchFormItem/>
            <Grid container className={classes.root} spacing={2}>
                {cardAdd}
            </Grid>
        </div>
    )
})






