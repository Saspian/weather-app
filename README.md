# Weather App

This is a simple responsive web app which tells you the current weather condition, hourly forecasts and upto 10 days of weather forecasting. In order to see the information user has to agree to share there current location. The weather information is fetched from a free API from [weatherapi.com](https://www.weatherapi.com/).

The project is made using React framework with Vite. For the styling I've used Tailwind CSS and Material-UI as a component library.

# To start the project

Clone this repository, `cd weather-app`

### Create `.env` file

I have included the API key for weatherapi. Please create `.env` file on root directory and paste the following

```nodejs
VITE_WEATHER_API=https://api.weatherapi.com/v1/forecast.json
VITE_WEATHER_API_KEY=fa24ef20e5ea49d4b7380025242703
```

> This is my free weather api access key. It will expire on April 25, 2024. Please use your own access key after.

### Run `npm i`

This will install all the dependencies for this project.
Node and NPM versions used at the time of development `node v16.16.0` and `npm 8.11.0`

### Run `npm run dev`

This will run the app in `http://localhost:5173/`. Simply paste this url or right click on the link appear on the console.

### Snapshots

![screenshot1](https://raw.githubusercontent.com/Saspian/weather-app/main/src/assets/1.png)
![screenshot2](https://raw.githubusercontent.com/Saspian/weather-app/main/src/assets/2.png)
![screenshot3](https://raw.githubusercontent.com/Saspian/weather-app/main/src/assets/3.png)
![screenshot4](https://raw.githubusercontent.com/Saspian/weather-app/main/src/assets/4.png)
![screenshot5](https://raw.githubusercontent.com/Saspian/weather-app/main/src/assets/5.png)
![screenshot6](https://raw.githubusercontent.com/Saspian/weather-app/main/src/assets/6.png)
