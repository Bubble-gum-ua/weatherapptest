import React from "react";
import {useFormik} from "formik";
import {getCity} from "../Redux/Card-reducers";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    button: {
        color: "white",
        background: "blue"
    },
    form: {
        background: "rgb(54,102,191,0.8)",
        margin: "15px",
        padding: "15px"
    }
});

export const SearchFormItem = React.memo(()=>{
    const classes = useStyles();
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.main.isLoading)
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            dispatch(getCity(values.name, 'ADD'))
            formik.resetForm()
        },
    })
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <Input
                    placeholder='Type here the city name' {...formik.getFieldProps('name')}
                    onChange={formik.handleChange} value={formik.values.name}
                />
                <Button className={classes.button} type='submit' disabled={isLoading || !formik.values.name}
                        variant='contained' color='primary'> Add City</Button>
            </form>
        </div>
    )
})

