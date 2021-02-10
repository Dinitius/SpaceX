import React from 'react';
import Header from './components/Header/Header'
import'./style.css';
import Main from "./components/Main/Main";
import Features from "./components/Features/Features";
import Calendar from "./components/Calendar/Calendar";
import Details from "./components/Details/Details";
import Footer from "./components/Footer/Footer";
import FetchData from "./service/FetchData";


class App extends React.Component {
    fetchData = new FetchData();
    state = {
        rocket: 'Falcon 1',
        features: null,
        rocketsNames: [],
        company: null,
    }

    componentDidMount() {
        this.updateRocketInfo();
        this.updateCompany();
    }

    updateRocketInfo() {
        this.fetchData.getRocket()
            .then(data => {
                this.setState({ rocketsNames: data.map(item => item.name) });
                this.setState({ rockets: data });
                return data;
            })
            .then(data => data.find(item => item.name === this.state.rocket))
            .then(features => this.setState({ features }))
    }

    changeRocket = (rocket) => {
        this.setState({ rocket }, this.updateRocketInfo);
    }

    updateCompany = () => {
       this.fetchData.getCompany()
           .then(company => this.setState({company}))
    }

    render() {
        return (
            <>
                <Header rockets={this.state.rocketsNames} changeRocket={this.changeRocket}/>
                <Main rocket={this.state.rocket}/>
                {this.state.features && <Features {...this.state.features}/>}
                {/*/!*<Calendar />*!/*/}
                {/*/!*<Details />*!/*/}
                {this.state.company && <Footer {...this.state.company.links} />}
            </>
        )
    }
}
export default App;
