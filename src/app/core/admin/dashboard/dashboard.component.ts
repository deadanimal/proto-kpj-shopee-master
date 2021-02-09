import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from '@angular/router';

import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Chart
  private chart: any
  private chart1: any
  private chart2: any
  private clicked: any = true
  private clicked1: any = false

  constructor(
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.getCharts()
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart) {
          console.log('Chart disposed')
          this.chart.dispose()
        }
        if (this.chart1) {
          console.log('Chart disposed')
          this.chart1.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartDashboard1()
      this.getChartDashboard2()
      this.getChartDashboard3()
    })
  }

  getChartDashboard1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdashboard1", am4charts.XYChart);

    // some extra padding for range labels
    chart.paddingBottom = 50;

    chart.cursor = new am4charts.XYCursor();
    chart.scrollbarX = new am4core.Scrollbar();

    // will use this to store colors of the same items
    let colors = {};

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataItems.template.text = "{realName}";
    categoryAxis.adapter.add("tooltipText", function(tooltipText, target){
      let abc = categoryAxis.tooltipDataItem.dataContext as any;
      return abc.realName;
    })

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.min = 0;

    // single column series for all data
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.columns.template.width = am4core.percent(80);
    columnSeries.tooltipText = "{provider}: {realName}, {valueY}";
    columnSeries.dataFields.categoryX = "category";
    columnSeries.dataFields.valueY = "value";

    // second value axis for quantity
    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    valueAxis2.syncWithAxis = valueAxis;
    valueAxis2.tooltip.disabled = true;

    // quantity line series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.tooltipText = "{valueY}";
    lineSeries.dataFields.categoryX = "category";
    lineSeries.dataFields.valueY = "quantity";
    lineSeries.yAxis = valueAxis2;
    lineSeries.bullets.push(new am4charts.CircleBullet());
    lineSeries.stroke = chart.colors.getIndex(13);
    lineSeries.fill = lineSeries.stroke;
    lineSeries.strokeWidth = 2;
    lineSeries.snapTooltip = true;

    // when data validated, adjust location of data item based on count
    lineSeries.events.on("datavalidated", function(){
    lineSeries.dataItems.each(function(dataItem){
      let wasd = dataItem.dataContext as any;
      // if count divides by two, location is 0 (on the grid)
      if(wasd.count / 2 == Math.round(wasd.count / 2)){
      dataItem.setLocation("categoryX", 0);
      }
      // otherwise location is 0.5 (middle)
      else{
        dataItem.setLocation("categoryX", 0.5);
      }
    })
    })

    // fill adapter, here we save color value to colors object so that each time the item has the same name, the same color is used
    columnSeries.columns.template.adapter.add("fill", function(fill, target) {
    let qwert = target.dataItem.dataContext as any;
    let name = qwert.realName;
    if (!colors[name]) {
      colors[name] = chart.colors.next();
    }
    target.stroke = colors[name];
    return colors[name];
    })


    let rangeTemplate = categoryAxis.axisRanges.template;
    rangeTemplate.tick.disabled = false;
    rangeTemplate.tick.location = 0;
    rangeTemplate.tick.strokeOpacity = 0.6;
    rangeTemplate.tick.length = 60;
    rangeTemplate.grid.strokeOpacity = 0.5;
    rangeTemplate.label.tooltip = new am4core.Tooltip();
    rangeTemplate.label.tooltip.dy = -10;
    rangeTemplate.label.cloneTooltip = false;

    ///// DATA
    let chartData = [];
    let lineSeriesData = [];

    let data =
    {
    "Weekly User": {
      "Revenue": 10,
      "Net Income": 35,
      "quantity":430
    },
    "Monthly User": {
      "Revenue": 15,
      "Net Income": 21,
      "quantity":210
    },
    }

    // process data ant prepare it for the chart
    for (var providerName in data) {
    let providerData = data[providerName];

    // add data of one provider to temp array
    let tempArray = [];
    let count = 0;
    // add items
    for (var itemName in providerData) {
      if(itemName != "quantity"){
      count++;
      // we generate unique category for each column (providerName + "_" + itemName) and store realName
      tempArray.push({ category: providerName + "_" + itemName, realName: itemName, value: providerData[itemName], provider: providerName})
      }
    }
    // sort temp array
    tempArray.sort(function(a, b) {
      if (a.value > b.value) {
      return 1;
      }
      else if (a.value < b.value) {
      return -1
      }
      else {
      return 0;
      }
    })

    // add quantity and count to middle data item (line series uses it)
    let lineSeriesDataIndex = Math.floor(count / 2);
    tempArray[lineSeriesDataIndex].quantity = providerData.quantity;
    tempArray[lineSeriesDataIndex].count = count;
    // push to the final data
    am4core.array.each(tempArray, function(item) {
      chartData.push(item);
    })

    // create range (the additional label at the bottom)
    let range = categoryAxis.axisRanges.create();
    range.category = tempArray[0].category;
    range.endCategory = tempArray[tempArray.length - 1].category;
    range.label.text = tempArray[0].provider;
    range.label.dy = 30;
    range.label.truncate = true;
    range.label.fontWeight = "bold";
    range.label.tooltipText = tempArray[0].provider;

    range.label.adapter.add("maxWidth", function(maxWidth, target){
      let range = target.dataItem as any;
      let startPosition = categoryAxis.categoryToPosition(range.category, 0);
      let endPosition = categoryAxis.categoryToPosition(range.endCategory, 1);
      let startX = categoryAxis.positionToCoordinate(startPosition);
      let endX = categoryAxis.positionToCoordinate(endPosition);
      return endX - startX;
    })
    }

    chart.data = chartData;


    // last tick
    let range = categoryAxis.axisRanges.create();
    range.category = chart.data[chart.data.length - 1].category;
    range.label.disabled = true;
    range.tick.location = 1;
    range.grid.location = 1;
  }

  getChartDashboard2() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdashboard2", am4charts.PieChart);

    // Add data
    chart.data = [ {
      "country": "Direct",
      "litres": 501.9
    }, {
      "country": "Display",
      "litres": 301.9
    }, {
      "country": "Organic Search",
      "litres": 201.1
    }, {
      "country": "Referral",
      "litres": 165.8
    }, {
      "country": "Social",
      "litres": 139.9
    }, 
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }

  getChartDashboard3() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdashboard3", am4charts.XYChart);

    // some extra padding for range labels
    chart.paddingBottom = 50;

    chart.cursor = new am4charts.XYCursor();
    chart.scrollbarX = new am4core.Scrollbar();

    // will use this to store colors of the same items
    let colors = {};

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataItems.template.text = "{realName}";
    categoryAxis.adapter.add("tooltipText", function(tooltipText, target){
      let try1 = categoryAxis.tooltipDataItem.dataContext as any;
      return try1.realName;
    })

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.min = 0;

    // single column series for all data
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.columns.template.width = am4core.percent(80);
    columnSeries.tooltipText = "{provider}: {realName}, {valueY}";
    columnSeries.dataFields.categoryX = "category";
    columnSeries.dataFields.valueY = "value";

    // second value axis for quantity
    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    valueAxis2.syncWithAxis = valueAxis;
    valueAxis2.tooltip.disabled = true;

    // quantity line series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.tooltipText = "{valueY}";
    lineSeries.dataFields.categoryX = "category";
    lineSeries.dataFields.valueY = "quantity";
    lineSeries.yAxis = valueAxis2;
    lineSeries.bullets.push(new am4charts.CircleBullet());
    lineSeries.stroke = chart.colors.getIndex(13);
    lineSeries.fill = lineSeries.stroke;
    lineSeries.strokeWidth = 2;
    lineSeries.snapTooltip = true;

    // when data validated, adjust location of data item based on count
    lineSeries.events.on("datavalidated", function(){
    lineSeries.dataItems.each(function(dataItem){
      // if count divides by two, location is 0 (on the grid)
      let try2 = dataItem.dataContext as any
      if(try2.count / 2 == Math.round(try2.count / 2)){
      dataItem.setLocation("categoryX", 0);
      }
      // otherwise location is 0.5 (middle)
      else{
        dataItem.setLocation("categoryX", 0.5);
      }
    })
    })

    // fill adapter, here we save color value to colors object so that each time the item has the same name, the same color is used
    columnSeries.columns.template.adapter.add("fill", function(fill, target) {
    let try3 = target.dataItem.dataContext as any;
    let name = try3.realName;
    if (!colors[name]) {
      colors[name] = chart.colors.next();
    }
    target.stroke = colors[name];
    return colors[name];
    })


    let rangeTemplate = categoryAxis.axisRanges.template;
    rangeTemplate.tick.disabled = false;
    rangeTemplate.tick.location = 0;
    rangeTemplate.tick.strokeOpacity = 0.6;
    rangeTemplate.tick.length = 60;
    rangeTemplate.grid.strokeOpacity = 0.5;
    rangeTemplate.label.tooltip = new am4core.Tooltip();
    rangeTemplate.label.tooltip.dy = -10;
    rangeTemplate.label.cloneTooltip = false;

    ///// DATA
    let chartData = [];
    let lineSeriesData = [];

    let data =
    {
    "2017": {
      "item 1": 10,
      "item 2": 35,
      "item 3": 5,
      "item 4": 20,
      "quantity":430
    },
    "2018": {
      "item 1": 15,
      "item 3": 21,
      "quantity":210
    },
    "2019": {
      "item 2": 25,
      "item 3": 11,
      "item 4": 17,
      "quantity":265
    },
    "2020": {
      "item 3": 12,
      "item 4": 15,
      "quantity":98
    }
    }

    // process data ant prepare it for the chart
    for (var providerName in data) {
    let providerData = data[providerName];

    // add data of one provider to temp array
    let tempArray = [];
    let count = 0;
    // add items
    for (var itemName in providerData) {
      if(itemName != "quantity"){
      count++;
      // we generate unique category for each column (providerName + "_" + itemName) and store realName
      tempArray.push({ category: providerName + "_" + itemName, realName: itemName, value: providerData[itemName], provider: providerName})
      }
    }
    // sort temp array
    tempArray.sort(function(a, b) {
      if (a.value > b.value) {
      return 1;
      }
      else if (a.value < b.value) {
      return -1
      }
      else {
      return 0;
      }
    })

    // add quantity and count to middle data item (line series uses it)
    let lineSeriesDataIndex = Math.floor(count / 2);
    tempArray[lineSeriesDataIndex].quantity = providerData.quantity;
    tempArray[lineSeriesDataIndex].count = count;
    // push to the final data
    am4core.array.each(tempArray, function(item) {
      chartData.push(item);
    })

    // create range (the additional label at the bottom)
    let range = categoryAxis.axisRanges.create();
    range.category = tempArray[0].category;
    range.endCategory = tempArray[tempArray.length - 1].category;
    range.label.text = tempArray[0].provider;
    range.label.dy = 30;
    range.label.truncate = true;
    range.label.fontWeight = "bold";
    range.label.tooltipText = tempArray[0].provider;

    range.label.adapter.add("maxWidth", function(maxWidth, target){
      let range = target.dataItem as any;
      let startPosition = categoryAxis.categoryToPosition(range.category, 0);
      let endPosition = categoryAxis.categoryToPosition(range.endCategory, 1);
      let startX = categoryAxis.positionToCoordinate(startPosition);
      let endX = categoryAxis.positionToCoordinate(endPosition);
      return endX - startX;
    })
    }

    chart.data = chartData;


    // last tick
    let range = categoryAxis.axisRanges.create();
    range.category = chart.data[chart.data.length - 1].category;
    range.label.disabled = true;
    range.tick.location = 1;
    range.grid.location = 1;
  }

}
