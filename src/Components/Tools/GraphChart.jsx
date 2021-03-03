import React from 'react'
import {Chart} from 'react-google-charts'
import Grid from '@material-ui/core/Grid'
import {convertTime} from "./Converter";
import {Preloader} from "./Preloader";


export const GraphChart = React.memo((props) => {
        let {detailCard} = props
        const dataRound = (value) => {
            return Math.round(value)
        }

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
            <Grid item style={{textAlign: 'center'}}>
                <Chart
                    width={'600px'}
                    height={'400px'}
                    chartType='ColumnChart'
                    loader={<div><Preloader/></div>}
                    data={data}
                    options={{
                        hAxis: {title: 'Hour'},
                        vAxis: {title: 'Temperature'},
                        legend: 'none',
                        title: "Hourly temperature changing",
                        backgroundColor: 'transparent',
                        colors: ["white", "white",],
                        series: {
                            0: {color: '#d7d120'},
                        }
                    }}
                />
            </Grid>
        )
    }
)
