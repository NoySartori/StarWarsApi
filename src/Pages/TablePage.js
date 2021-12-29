import React from 'react';
import { SwagiApiService } from '../SwagiApiService';

export class TablePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            topVehicle: null
        };

        this.swagiApiService = new SwagiApiService();
    }

    async componentDidMount() {
        const response = await this.swagiApiService.getSummarizedData();

        this.setState({ topVehicle: response.topVehicle, isLoaded: true });
    }

    render() {
        const { error, isLoaded, topVehicle } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <table>
                    <tr>
                        <td>Vehile name with the largest sum</td>
                        <td>{topVehicle.name}</td>
                    </tr>
                    <tr>
                        <td>Related home planets and their respective
                            population</td>
                        <td>
                            {JSON.stringify(topVehicle.planetsAndPopulation)}
                        </td>
                    </tr>
                    <tr>
                        <td>Related pilot names</td>
                        <td>{JSON.stringify(topVehicle.pilotNames)}</td>
                    </tr>
                </table>
            );
        }
    }
}