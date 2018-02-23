import {
    Chart, LabelIntersectAction, DataLabel, ColumnSeries, Category, ILoadedEventArgs,
    EdgeLabelPlacement, IPointRenderEventArgs, ChartTheme, Tooltip, AxisPosition
} from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors } from './theme-color';
Chart.Inject(ColumnSeries, Category, DataLabel, Tooltip);

let labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
/**
 * Sample for Smart Axis Labels
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            interval: 1,
            majorGridLines: { width: 0 },
            labelIntersectAction: 'Hide'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
            {
                labelStyle: { size: '0px' },
                majorTickLines: { width: 0 },
                majorGridLines: { width: 0 },
                lineStyle: { width: 0 },
            },

        //Initializing Chart Series
        series: [
            {
                type: 'Column', name: 'Users',
                dataSource: [{ x: 'South Korea', y: 39 }, { x: 'India', y: 61 },
                { x: 'Pakistan', y: 20 }, { x: 'Germany', y: 65 },
                { x: 'Australia', y: 16 }, { x: 'Italy', y: 29 },
                { x: 'France', y: 45 }, { x: 'Saudi Arabia', y: 10 },
                { x: 'Russia', y: 41 }, { x: 'Mexico', y: 31 },
                { x: 'Brazil', y: 76 }, { x: 'China', y: 51 }],
                xName: 'x', width: 2,
                yName: 'y', marker: {
                    dataLabel: {
                        visible: true,
                        position: Browser.isDevice ? 'Outer' : 'Top',
                        font: { fontWeight: '600', color: Browser.isDevice ? '#404041' : '#ffffff' }
                    }
                }
            },
        ],
        //Initializing Chart title
        title: 'Internet Users in Millions',
        //Initializing User Interaction Tooltip
        tooltip: { enable: true },
        pointRender: labelRender,
        legendSettings: { visible: false },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    chart.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.primaryXAxis.labelIntersectAction = <LabelIntersectAction>mode.value;
            chart.refresh();
        }
    });
    mode.appendTo('#selmode');

    let edgeMode: DropDownList = new DropDownList({
        index: 0,
        width: 120,
        change: () => {
            chart.primaryXAxis.edgeLabelPlacement = <EdgeLabelPlacement>edgeMode.value;
            chart.dataBind();
        }
    });
    edgeMode.appendTo('#edgemode');

    let labelMode: DropDownList = new DropDownList({
        index: 0,
        width: 120,
        change: () => {
            chart.primaryXAxis.labelPosition = <AxisPosition>labelMode.value;
            chart.refresh();
        }
    });
    labelMode.appendTo('#position');
};