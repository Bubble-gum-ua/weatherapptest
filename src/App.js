import './App.css';
import {DetailPage} from "./Components/DetailPage/DetailPage";
import {Route, Switch} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCurrentByAsk} from "./Components/Redux/Card-reducers";
import {MainBody} from "./Components/MainBody/MainBody";


function App() {

    const cities = useSelector(state => state.cities.cities)
    const dispatch = useDispatch()


    useEffect(() => {
        const localDataCards = localStorage.getItem('cityCards')
        if (localDataCards && localDataCards !== '[]') {
            let citiesId = JSON.parse(localDataCards).reverse().join()
            dispatch(getCurrentByAsk(citiesId))
        }
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('cityCards', JSON.stringify(cities.map((el) => el.id)))
    }, [cities])

    return (
        <div className="App" >
            <Switch>
                <Route path="/city/:name"> <DetailPage/> </Route>
                <Route exact path="/"> <MainBody cities={cities}/> </Route>
            </Switch>
        </div>
    );
}

export default App;
