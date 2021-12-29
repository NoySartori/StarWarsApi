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
            return (
                <>

                    <Chart height={500} width={500}>
                        {planetsAndPopulationData.map((planetsAndPopulationData, index) => {
                            const barHeight = planetsAndPopulationData.number;
                            const barWidth = 50;
                            const barMargin = 30;


                            return (
                                <Bar
                                    x={index * (barWidth + barMargin)}
                                    y={500 - barHeight}
                                    width={barWidth}
                                    height={500}
                                    planetName={planetsAndPopulationData.name}
                                    planetPopulationSum={planetsAndPopulationData.number}
                                />
                            );
                        })}
                    </Chart>
                </>

            );
        }
    }

}