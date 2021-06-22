import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Frame } from 'types';
import Chart from 'react-apexcharts';
import GoIcon from './img/go-icon.png';
import StopIcon from './img/stop-icon.png';
import CompanyIcon from './img/Ariadnemaps.png';
import { processData } from './util/process';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  num: number;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    num: 0,
  };

  componentDidMount() {
    const series = this.props.data.series as Frame[];
    if (series.length == 0 || series[0].fields[0].values.buffer.length == 0) return;

    const buffer = series[0].fields[0].values.buffer;
    const num = processData(buffer);
    this.setState({ num });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series !== this.props.data.series) {
      const series = this.props.data.series as Frame[];
      if (series.length == 0 || series[0].fields[0].values.buffer.length == 0) {
        this.setState({ num: 0 });
        return;
      }

      const buffer = series[0].fields[0].values.buffer;
      const num = processData(buffer);
      this.setState({ num });
    }
  }

  render() {
    const {
      width,
      height,
      options: { threshold },
    } = this.props;
    const { num } = this.state;

    const min = height > width ? width : height;

    return (
      <div style={{ position: 'relative' }}>
        <Chart
          options={{
            plotOptions: {
              radialBar: {
                hollow: {
                  margin: 15,
                  size: '80%',
                  image: num < threshold ? GoIcon : StopIcon,
                  imageWidth: min / 2,
                  imageHeight: min / 2,
                  imageClipped: false,
                },
                dataLabels: {
                  name: {
                    show: false,
                    color: '#fff',
                  },
                  value: {
                    show: false,
                    color: '#333',
                    offsetY: 70,
                    fontSize: '22px',
                  },
                },
              },
            },
          }}
          series={[num < threshold ? num / (threshold / 100) : 100]}
          type="radialBar"
          width={width}
          height={height}
        />

        <img src={CompanyIcon} style={{ width: 100, height: 40, position: 'absolute', bottom: 10, right: 0 }} />
      </div>
    );
  }
}
