import React from "react"

export class ChartComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ transform: 'rotate(-90deg)', width: '250px', transformOrigin: '100% 50%' }}>
                {this.props.planetsAndPopulations.map(planetAndPopulation => {
                    return (
                        <BarComponent name={planetAndPopulation.name} number={planetAndPopulation.number} heightPercentage={planetAndPopulation.number / this.props.maxPopulation}></BarComponent>
                    )
                })}
            </div>
        )
    }
}

const barTexts = {
    transform: 'rotate(90deg)',
    display: 'inline-block',
    // marginTop: '50px',
    marginBottom: '50px',
    width: '50px'
};

export class BarComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {


        return (
            <div>
                <div style={barTexts}>{this.props.name}</div>
                <div style={{ display: 'inline-block', height: '30px', width: this.props.heightPercentage * 0.2 * 100 + "%", backgroundColor: 'blue' }}>
                </div>
                <div style={barTexts}>{this.props.number}</div>
            </div>
        )
    }
}
