import React, { Component } from 'react';
import styled from '@emotion/styled';
import mediaqueries from '@styles/media';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ContainerMain = styled.div`
  max-width: $width;
  padding: 0 1.5rem;
  margin-left: auto;
  margin-right: auto;
  color: ${p => p.theme.colors.articleText};
`;

const LargeFont = styled.span`
  font-size: large;
  font-weight: 600;
  color: ${p => p.theme.colors.articleText};
`;

const ExtraLargeFontH1 = styled.h1`
  font-size: large;
  font-weight: 600;
  color: ${p => p.theme.colors.articleText};
`;

const ChartContainer = styled.div`
  display: 'inline-block';
  'vertical-align': top;
  width: '100%';
  ${mediaqueries.phablet`
    width: '50%';
  `}
}`;

const ProgressContainer = styled.div`
  position: relative;
  color: ${p => p.theme.colors.articleText};
  height: 42px;
  width: 550px;
  border: 1px solid ${p => p.theme.colors.success};
  background-color: ${p => p.theme.colors.background};
  @media (max-width: 767px) {
    width: 350px;
  }

  :before {
    content: attr(data-label);
    font-size: 1.2em;
    font-weight: bold;
    color: ${p => p.theme.colors.articleText};
    position: absolute;
    text-align: center;
    top: 8px;
    left: 0;
    right: 0;
  }

  .value {
    background-color: ${p => p.theme.colors.success};
    display: inline-block;
    height: 100%;
  }
`;

const Filler = props => {
  return <div className='value' style={{ width: `${props.percentage}%` }} />;
};

const ProgressBar = props => {
  return (
    <ProgressContainer data-label={`${props.percentage}%`}>
      <Filler percentage={props.percentage} />
    </ProgressContainer>
  );
};

export default class CodeStats extends Component {
  state = {
    loading: false,
    error: false,
    xps: {
      total_xp: '',
      new_xp: '',
      lang_data: '',
      curr_level: '',
      perc_level: '',
      start_date: '',
      last_date: '',
      days_summary: ''
    }
  };

  componentDidMount() {
    this.getCodeStats();
  }

  render() {
    const {
      total_xp,
      new_xp,
      lang_data,
      curr_level,
      perc_level,
      start_date,
      last_date,
      days_summary
    } = this.state.xps;

    const days_options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Days of Week'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [
        {
          name: 'XPs',
          colorByPoint: true,
          data: days_summary
        }
      ]
    };

    const lang_options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Programming Languages'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [
        {
          name: 'XPs',
          colorByPoint: true,
          data: lang_data
        }
      ]
    };

    return (
      <ContainerMain>
        <ExtraLargeFontH1>USAGE SUMMARY</ExtraLargeFontH1>
        <br />
        <div>
          {this.state.loading ? (
            <p>Please hold on, data is loading!</p>
          ) : total_xp ? (
            <>
              <p>
                <strong>Using Code::Stats Since:</strong> {start_date}
                <br />
                <strong>Last coded on:</strong> {last_date}
              </p>
              <br />
              <LargeFont>{`Level ${curr_level} (${total_xp} XP) (+${new_xp})`}</LargeFont>
              <br />
              <br />
              <ProgressBar percentage={perc_level} />
              <br />
              <strong>Additional Stats can be found at </strong>
              <a href='https://codestats.net/users/sadanand-singh'>Code::Stats</a>
              <br />
              <br />
              <ExtraLargeFontH1>USAGE PATTERN</ExtraLargeFontH1>

              <br />
              <ChartContainer>
                <HighchartsReact highcharts={Highcharts} options={lang_options} />
              </ChartContainer>
              <br />
              <ChartContainer>
                <HighchartsReact highcharts={Highcharts} options={days_options} />
              </ChartContainer>
            </>
          ) : (
            <p>Oh noes, error fetching data! 😔</p>
          )}
        </div>
      </ContainerMain>
    );
  }

  summaryDays = data => {
    const dates = Object.keys(data).sort();
    var day_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var day_ids = [];
    dates.forEach((a, i) => day_ids.push({ day: day_names[new Date(a).getDay()], xp: data[a] }));

    var result = day_ids.reduce(function(result, item) {
      result[item.day] = (result[item.day] || []).concat(item.xp);
      return result;
    }, {});

    var sum_data = function(d) {
      var vals = [];
      Object.keys(d).forEach(function(k) {
        vals.push({ name: k, y: d[k].reduce((a, b) => a + b) });
      });
      return vals;
    };

    result = sum_data(result);
    return result;
  };

  summaryLanguages = lang_data => {
    const data = Object.keys(lang_data).map(function(key, index) {
      lang_data[key] = lang_data[key]['xps'];
    });
    var sortable = [];
    for (var lang in lang_data) {
      sortable.push([lang, lang_data[lang]]);
    }

    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    var tops = sortable.slice(0, 5);
    var rest = sortable.slice(5);
    var res_xps = rest.map(x => x[1]);
    const rest_sum = res_xps.reduce((a, b) => a + b);
    var lang_names = tops.map(x => x[0]);
    var xp_values = tops.map(x => x[1]);
    lang_names.push('Others');
    xp_values.push(rest_sum);
    var data_new = [];
    lang_names.forEach((a, i) => data_new.push({ name: a, y: xp_values[i] }));
    return data_new;
  };

  getLevel = xps => {
    return parseInt(Math.floor(0.025 * Math.sqrt(xps)));
  };

  getPercentage = xps => {
    const curr_level = this.getLevel(xps);
    const target_xp = (curr_level + 1) * (curr_level + 1) * 1600 + 1;
    const curr_xp = curr_level * curr_level * 1600 - 1;
    const have_xp = xps - curr_xp;
    const need_xp = target_xp - curr_xp;
    return parseInt(Math.floor((100 * have_xp) / need_xp));
  };

  getCodeStats = () => {
    this.setState({ loading: true });
    axios
      .get(`https://codestats.net/api/users/sadanand-singh`)
      .then(xps => {
        const {
          data: { total_xp: total_xp, new_xp: new_xp, languages: langs, dates: dates_data }
        } = xps;
        const curr_level = this.getLevel(total_xp);
        const perc_level = this.getPercentage(total_xp);
        const dates = Object.keys(dates_data).sort();
        const start_date = dates[0];
        const last_date = dates[dates.length - 1];
        const lang_data = this.summaryLanguages(langs);
        const days_summary = this.summaryDays(dates_data);
        this.setState({
          loading: false,
          xps: {
            ...this.state.xps,
            total_xp,
            new_xp,
            lang_data,
            curr_level,
            perc_level,
            start_date,
            last_date,
            days_summary
          }
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };
}
