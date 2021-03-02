import React from "react";
import {currentWeatherApi} from "../Api/Api";
import {setError, toggleIsLoading} from "./mainReducer";

const ADD_CARD = "ADD_CARD";
const DELETE_CARD = "DELETE_CARD";
const UPDATE_BODY = "UPDATE_BODY";
const SET_DETAILS_PAGE = "SET_DETAILS_PAGE";

const initialState = {
    cities: [],
    detailsPage: {}
}

export const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BODY:
            const cardsNum = state.cities.findIndex(el => el.id === action.card.id)
            state.cities[cardsNum] = action.card
            return {
                ...state,
                cities: [...state.cities]
            }
        case  ADD_CARD: {
            return {
                ...state,
                cities: [action.card, ...state.cities]
            }
        }
        case  DELETE_CARD: {
            return {
                ...state,
                cities: state.cities.filter(el => el.id !== action.citiesId)
            }
        }
        case  SET_DETAILS_PAGE: {
            return {
                ...state,
                detailsPage: action.detailsPage
            }
        }
        default:
            return state;
    }
};


export const addCard = (card) => ({type: ADD_CARD, card});
export const updateBody = (card) => ({type: UPDATE_BODY, card});
export const setDetailPage = (detailsPage) => ({type: SET_DETAILS_PAGE, detailsPage});
export const deleteCard = (citiesId) => ({type: DELETE_CARD, citiesId});


export const getCity = (name, action) => {
    return async (dispatch,getState) => {
        try {
            dispatch(toggleIsLoading(true))
            let result = await currentWeatherApi.getCurrentData(name)
            if (action === "ADD") {
                const isCopyName = getState().cities.cities.find(el => el.id === result.id)
                isCopyName ? dispatch(setError("City was picked")) : dispatch(addCard(result))
            } else if (action === "UPDATE") {
                dispatch(updateBody(result))
            }
            dispatch(toggleIsLoading(false))
        } catch (err) {
            dispatch(setError("Not found. Try again."))
            dispatch(toggleIsLoading(false))
        }
    }
}

export const getCurrentByAsk = (citiesId) => async (dispatch) => {
    try {
        dispatch(toggleIsLoading(true))
        let result = await currentWeatherApi.getCurrentWeatherByAsk(citiesId)
        result.list.forEach(el => dispatch(addCard(el)))
        dispatch(toggleIsLoading(false))
    } catch (err) {
        dispatch(setError("Error"))
        dispatch(toggleIsLoading(false))
    }
}

export const getDetails = (lat, lon) => async (dispatch) => {
    try {
        dispatch(toggleIsLoading(true))
        let result = await currentWeatherApi.getWeatherByHours(lat, lon)
        dispatch(setDetailPage(result))
        dispatch(toggleIsLoading(false))
    } catch (err) {
        dispatch(setError("Error"))
        dispatch(toggleIsLoading(false))
    }
}

