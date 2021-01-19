import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import './dayBox.css';
import AtmosphereIcon from './resources/atmosphere.svg';
import ClearIcon from './resources/clear.svg';
import CloudsIcon from './resources/clouds.svg';
import DrizzleIcon from './resources/drizzle.svg';
import RainIcon from './resources/rain.svg';
import SnowIcon from './resources/snow.svg';
import ThunderstormIcon from './resources/thunderstorm.svg';

class DayBox extends Component {
  render() {
    const data = this.props.data;
    let icon;

    switch (data.forecast) {
      case "Clear":
        icon = ClearIcon;
        break;

      case "Clouds":
        icon = CloudsIcon;
        break;
        
      case "Drizzle":
        icon = DrizzleIcon;
        break;

      case "Rain":
        icon = RainIcon;
        break;

      case "Snow":
        icon = SnowIcon;
        break;

      case "Thunderstorm":
        icon = ThunderstormIcon;
        break;

      default:
        // Atmosphere
        icon = AtmosphereIcon;  
    }

    return (
      <Box p={1} m={1} border={1} bgcolor="grey.300">
        <div className="date">{data.date}</div>
        <img className="icon" src={icon} alt={data.forecast}></img>
        <div className="description">{data.description}</div>
        <div className="temp">{data.temp}°C</div>
      </Box>
    )
  }
}

export default DayBox;