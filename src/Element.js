import React from "react"

const barGraphStyle = {
    padding: '0',
    width: '100%',
    display: '-webkit-flex',
    display: '-ms-flexbox',
    display: 'flex',
    alignItems: 'flex-end',
    height: '95vh',
    margin: '0'
};



export class ChartComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul style={barGraphStyle}>
                {this.props.planetsAndPopulations.map(planetAndPopulation => {
                    const heightPercentage = planetAndPopulation.number / this.props.maxPopulation;
                    return (
                        <BarComponent name={planetAndPopulation.name} number={planetAndPopulation.number} heightPercentage={heightPercentage}></BarComponent>
                    )
                })}
            </ul>
        )
    }
}

const barGraphLiStyle = {
    display: 'block',
    // padding: '1.5625rem 0',
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'bottom',
    borderRadius: '4px 4px 0 0',
    maxWidth: '20%',
    height: '100%',
    margin: '0 1.8% 0 0',
    flex: '1 1 15%',
    border: '1px solid #1779ba',
    background: 'linear-gradient(#2196e3, #1779ba 70%)'
};

const descriptionStyle = {
    fontWeight: '800',
    opacity: '0.5',
    textTransform: 'uppercase',
    width: '100%',
    fontSize: '14px',
    bottom: '20px',
    position: 'absolute',
    fontSize: '1rem',
    overflow: 'hidden'
};

const percentStyle = {
    fontSize: '1.875rem',
    // letterSpacing: '-3px',
    opacity: '0.4',
    width: '100%',
    fontSize: '1.875rem',
    position: 'absolute'
};

export class BarComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // scale down 60%
        const fixedHeightPercentage = this.props.heightPercentage * 0.6 * 100;
        return (
            <li style={Object.assign({}, barGraphLiStyle, { height: 'calc(80px + ' + fixedHeightPercentage + '%)' })}>
                <div style={percentStyle}>{this.props.number}</div>
                <div style={descriptionStyle}>{this.props.name}</div>
            </li>
        )
    }
}
