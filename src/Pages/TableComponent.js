import React from 'react';
import { SwagiApiService } from '../SwagiApiService';

const borderStyle = {
    border: '1px solid black'
}

export class TableComponent extends React.Component {
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

                <table style={{
                    border: '1px solid black',
                    height: '40vh'
                }}>
                    <tr style={borderStyle}>
                        <td style={borderStyle}>Vehicle name with the largest sum</td>
                        <td style={borderStyle}>{topVehicle.name}</td>
                    </tr>
                    <tr style={borderStyle}>
                        <td style={borderStyle}>Related home planets and their respective
                            population</td>
                        <td style={borderStyle}>
                            {JSON.stringify(topVehicle.planetsAndPopulation)}
                        </td>
                    </tr>
                    <tr style={borderStyle}>
                        <td style={borderStyle}>Related pilot names</td>
                        <td style={borderStyle}>{JSON.stringify(topVehicle.pilotNames)}</td>
                    </tr>
                </table>




            );
        }
    }
}