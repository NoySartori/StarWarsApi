import React from 'react';
import { SwagiApiService } from '../SwagiApiService';
import { Chart, Bar } from '../Element';

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
            const barWidth = 50
            const barMargin = 30;

            const maxPopulation = Math.max(...planetsAndPopulationData.map(planetAndPopulation => planetAndPopulation.number));
            const chartHeight = maxPopulation + 20;
            const chartWidth = planetsAndPopulationData.length * (barWidth + barMargin);

            return (
                <>

                    <Chart height={chartHeight} width={chartWidth}>
                        {planetsAndPopulationData.map((planetAndPopulation, index) => {

                            const barHeight = planetAndPopulation.number;

                            return (
                                <Bar
                                    key={planetAndPopulation.name}
                                    x={index * (barWidth + barMargin)}
                                    y={chartHeight - barHeight}
                                    width={barWidth}
                                    height={barHeight}
                                    planetName={planetAndPopulation.name}
                                    planetPopulationSum={planetAndPopulation.number}
                                />
                            );
                        })}
                    </Chart>
                </>

            );
        }
    }

}