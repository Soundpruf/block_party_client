
export const renderChartData = (props) => {
    const genreData = {
        labels: props.labels,
        series: props.series,
        donut: true,
        donutWidth: 60,
        donutSolid: true,
        startAngle: 270,
        total: 200,
        showLabel: true
    }

    return genreData

}
