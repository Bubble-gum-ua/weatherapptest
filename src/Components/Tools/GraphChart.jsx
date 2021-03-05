import React from 'react'
import {Chart} from 'react-google-charts'
import Grid from '@material-ui/core/Grid'
import {convertTime} from "./Converter";
import {Preloader} from "./Preloader";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "600px",
        textAlign: "center"
    }
}));

export const GraphChart = React.memo((props) => {
        let {detailCard} = props
        const dataRound = (value) => {
            return Math.round(value)
        }
        const classes = useStyles();

        let dataHourly = detailCard.hourly?.map(el => {
            let hour = convertTime(el.dt)
            let temp = dataRound(el.temp)
            let array = [hour, temp]
            return array
        })

        let data = [['Hour', 'Temperature']]

        if (dataHourly) {
            for (let i = 0; i < 24; i++) {
                data.push(dataHourly[i])
            }
        }

        return (
            <Grid item style={{textAlign: 'center'}} className={classes.root}>
                <Chart
                    width={"100%"}
                    height={"100%"}
                    chartType='ColumnChart'
                    loader={<div><Preloader/></div>}
                    data={data}
                    options={{
                        hAxis: {title: 'Hour'},
                        vAxis: {title: 'Temperature'},
                        legend: 'none',
                        title: "Hourly temperature changing",
                        backgroundColor: 'transparent',
                        series: {
                            0: {color: '#d7d120'},
                        },
                    }}
                />
            </Grid>
        )
    }
)
