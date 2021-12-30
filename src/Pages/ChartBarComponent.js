import React from 'react';
import { SwagiApiService } from '../SwagiApiService';
import { ChartComponent, BarComponent } from '../Element';

export class ChartBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            planetsAndPopulationData: null
        };

        this.swagiApiService = new SwagiApiService();
    }

    async componentDidMount() {
        const response = await this.swagiApiService.getChartBarData();

        this.setState({ planetsAndPopulationData: response.planetsAndPopulationData, isLoaded: true });
    }


    render() {
        const { error, isLoaded, planetsAndPopulationData } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>ChartBar...</div>;
        } else {
            const maxPopulation = Math.max(...planetsAndPopulationData.map(planetAndPopulation => planetAndPopulation.number));

            return (
                <ChartComponent planetsAndPopulations={planetsAndPopulationData} maxPopulation={maxPopulation}></ChartComponent>
            );
        }
    }

}