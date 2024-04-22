# Asteroid Guard Web App

App is available [here](https://cool-sunburst-c819e9.netlify.app/)

## Description

Asteroid Guard is an online service for monitoring asteroids approaching Earth based on **NASA API** data. 

The project is developed on **JavaScript** using the **React** library. 

### Key Features

- View asteroids approaching Earth today or select another date using the built-in calendar. Data is available for approximately 100 years into the past and 180 years into the future.
- Access basic information about each asteroid, including name, size, potential danger, distance to Earth, and date/time of closest approach. The size of the asteroid icon is relative and depends on the diameter. The distance to Earth can be displayed in km or in LD (lunar distances).
- Explore detailed information about each asteroid's known approaches to Earth.
- Save asteroids to favorites for quick access. User settings are saved in local storage.
- Remove asteroids from favorites or view detailed information from the favorites page.

## Running the project

### Prerequisites

- Node and npm installed globally
- You also need NASA API key, which can be obtained from https://api.nasa.gov/. Once you have the key, create a copy of the file `.env` with a name `.env.local`, and provide the value for the env variable.

Installation:

* `npm install`

To Start Server:

* `npm run dev`

To Visit App:

* http://localhost:5173/
