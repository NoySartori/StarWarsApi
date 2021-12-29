
export const Chart = ({ children, width, height }) => (
    <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
    >
        {children}
    </svg>
)

export const Bar = ({ x, y, width, height, planetName, planetPopulationSum }) => (
    <>
        <text>${planetPopulationSum}</text>
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={'#D3D3D3'}
        />
        <text>${planetName}</text>
    </>
)





