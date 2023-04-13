# Weather App

A simple React-based weather app that allows users to search for weather information for a specific location, with the ability to add more than 1 weather card to their weather listing.

## Description

This is a basic weather app that displays weather information for a specified location. It uses the OpenWeatherMap ( https://openweathermap.org/api ) and Wirefreethought ( https://wirefreethought.github.io/geodb-cities-api-docs/ )APIs to fetch the weather data and the latitude and longitude of the location.

## Installation

To run this application, you will need:

- Node.js (version 12 or later)

1. Clone this repository to your local machine:

```bash
git clone https://github.com/MatthewOlaka/weather_app.git
```

2. Navigate to the project directory:

```bash
cd weather_app
```

3. Install the dependencies:

```bash
npm install
```

# Create .env file

Create a .env file in the root directory of the project and add your API keys for OpenWeatherMap and Wirefreethought as follows:

```.env
REACT_APP_API_KEY=<your_OpenWeatherMap_API_key>
REACT_APP_RAPID_API_KEY=<your_wirefreethought_API_key>
```

## Usage

### Start the application:

```bash
npm start
```

Open the application in your browser at http://localhost:3000.

Enter a location in the search box or select a location from the dropdown list.

The weather information for the selected location will be displayed.




