import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import './weatherGrid.css';
import DayBox from './dayBox.js'

class WeatherGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      isLoaded: false,
      day1: {},
      day2: {},
      day3: {},
      day4: {},
      day5: {}
    };
  }

  componentDidMount() {
    const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

    // city hardcoded to vancouver for now
    const REQUEST_URI = this.uriBuilder("vancouver", API_KEY);

    fetch(REQUEST_URI)
      .then(res => res.json())
      .then(
        (result) => {
          if (result["cod"] < 300) {
            let parsedData = this.parseData(result.list);
            this.setState({
              isLoading: false,
              isLoaded: true,
              day1: parsedData[0],
              day2: parsedData[1],
              day3: parsedData[2],
              day4: parsedData[3],
              day5: parsedData[4]
            });
          } else {
            this.setState({
              isLoading: false,
              isLoaded: false,
              error: result["message"]
            });
          }
        },
        (error) => {
          this.setState({
            isLoading: false,
            isLoaded: false,
            error
          });
        }
      )
  }

  uriBuilder(city, apiKey) {
    let requestUri = "https://api.openweathermap.org/data/2.5/forecast?units=metric";
    return requestUri + "&q=" + city + "&appid=" + apiKey;
  }

  parseData(list) {
    let i;
    let resIndex = 0;
    let res = [];

    // 12pm results
    for (i = 4; i < list.length; i += 8) {
      let currData = list[i];
      let dayData = {};
      let currDate = new Date(currData["dt"] * 1000);

      dayData["date"] = currDate.toDateString();
      dayData["forecast"] = currData["weather"][0]["main"];
      dayData["description"] = currData["weather"][0]["description"];
      dayData["temp"] = Math.round(currData["main"]["temp"]);

      res[resIndex] = dayData;
      resIndex++;
    }

    return res;
  }

  render() {
    const { error, isLoading, isLoaded, day1, day2, day3, day4, day5 } = this.state;

    const renderContent = () => {
      if (isLoading) {
        return <div className="loading">Loading...</div>;
      }

      if (!isLoaded) {
        return <div className="error">Data failed to load. Reason: {error}</div>;
      } else {
        return <Box display="flex" justifyContent="center" bgcolor="background.paper">
          <DayBox data={day1} />
          <DayBox data={day2} />
          <DayBox data={day3} />
          <DayBox data={day4} />
          <DayBox data={day5} />
        </Box>;
      }
    }

    return (
      <div>{renderContent()}</div>
    )
  }
}

export default WeatherGrid;