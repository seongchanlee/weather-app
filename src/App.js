import './App.css';
import WeatherGrid from './weatherGrid.js';

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-md-3 center">
          <div className="title">5-Day Forecast.</div>
          <div className="locationTime">Vancouver, Canada @ 12:00 PM</div>
          <WeatherGrid />
        </div>
      </div>
    </div>
  );
}

export default App;
