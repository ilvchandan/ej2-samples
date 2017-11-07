import {
    Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, LineSeries, MomentumIndicator, StripLine, ChartTheme
} from '@syncfusion/ej2-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(
    CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
    MomentumIndicator, StripLine
);

/**
 * Mementum Sample
 */
this.default = (): void => {

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            intervalType: 'Months', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6,
            skeleton: 'yMd',
            crosshairTooltip: { enable: true }
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            title: 'Price',
            labelFormat: '${value}',
            plotOffset: 25,
            minimum: 50, maximum: 170,
            interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 },
        },
        //Initializing Rows
        rows: [
            {
                height: '40%'
            }, {
                height: '60%'
            }
        ],
        //Initializing Axes
        axes: [{
            name: 'secondary',
            opposedPosition: true, rowIndex: 0,
            majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: 80, maximum: 120, interval: 20,
            majorTickLines: { width: 0 }, title: 'Momentum', stripLines: [
                {
                    start: 80, end: 120, text: '', color: 'black', visible: true,
                    opacity: 0.03, zIndex: 'Behind'
                }]
        }],
        //Initializing Chart Series
        series: [{
            dataSource: chartData, width: 2,
            xName: 'x', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
            name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
            type: 'Candle', animation: { enable: true }
        }],
        indicators: [{
            type: 'Momentum', field: 'Close', seriesName: 'Apple Inc', yAxisName: 'secondary', fill: '#6063ff',
            period: 3, animation: { enable: true }, upperLine: { color: '#e74c3d' }
        }],
        //Initializing UserInteraction Zoom, Tooltip and Crosshair
        zoomSettings:
        {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableSelectionZooming: true,
            mode: 'X'
        },
        tooltip: {
            enable: true, shared: true
        },
        crosshair: { enable: true, lineType: 'Vertical' },
        chartArea: { border: { width: 0 } },
        //Initializing Primary Y Axis
        title: 'AAPL 2012-2017',
        width : Browser.isDevice ? '100%' : '80%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        legendSettings: { visible: false }
    });
    chart.appendTo('#container');
};