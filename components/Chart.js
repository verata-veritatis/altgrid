import React, { Component } from 'react'
import ReactApexCharts from 'react-apexcharts'
import { defaultData } from './Default'

class ApexChart extends React.Component {
    constructor(props) {
      super(props);
      if (this.props.activeData === undefined) {
        this.props.activeData = defaultData
      }
      this.state = {
        series: this.props.activeData,
        options: {
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#5aa66f',
                downward: '#9e433f'
              },
              wick: {
                useFillColor: true
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          chart: {
            type: 'candlestick',
            height: '100%',
            toolbar: {
              show: false
            }
          },
          title: {
            text: '',
            align: 'center',
            style: {
              color: '#d3d4d5',
              fontSize: '18px'
            }
          },
          grid: {
            show: false,
            borderColor: '#515358',
          },
          legend: {
            show: false
          },
          xaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            tooltip: {
              enabled: true
            },
            type: 'datetime',
            labels: {
              show: false,
              style: {
                colors: ['#d3d4d5', '#d3d4d5', '#d3d4d5', '#d3d4d5', '#d3d4d5', '#d3d4d5', '#d3d4d5', '#d3d4d5']
              }
            }
          },
          yaxis: {
            tooltip: {
              enabled: true
            },
            labels: {
              show: false,
              style: {
                colors: ['#d3d4d5', '#d3d4d5', '#d3d4d5', '#d3d4d5', '#d3d4d5', '#d3d4d5', '#d3d4d5', '#d3d4d5']
              }
            }
          },
          tooltip: {
            enabled: true,
            enabledOnSeries: true,
            fillSeriesColor: true,
            theme: 'dark',
          }
        },
      
      
      };
    }

    componentDidUpdate(prevProps) {
      if (prevProps != this.props) {
        this.setState({
          series: this.props.activeData
        })
      }
    }

    render() {
      return (
        <div id="chart">
            <ReactApexCharts options={this.state.options} series={this.state.series} type="candlestick" />
        </div>
      )
    }
}

export default ApexChart