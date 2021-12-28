import React from 'react';
import { SwagiApiService } from '../SwagiApiService';

export class TablePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            vehiclesList: []
        };

        this.swagiApiService = new SwagiApiService();
    }

    async componentDidMount() {
        const response = await this.swagiApiService.getAllVehicles();
        if (response.message === "ok") {
            this.setState({
                vehiclesList: response.results,
                isLoaded: true
            });
        } else {
            this.setState({
                error: response.message
            });
        }
    }

    render() {
        const { error, isLoaded, vehiclesList } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            const vehicleElements = [];

            for (let vehicle of vehiclesList) {
                vehicleElements.push(<li>{vehicle.name}</li>)
            }

            return (
                <ul>
                    {vehicleElements}
                </ul>
            );
        }
    }
}