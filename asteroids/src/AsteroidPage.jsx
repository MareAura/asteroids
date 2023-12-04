import React from 'react'
import { useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

function AsteroidPage() {

    let { asteroidId } = useParams()

    useEffect(() => {
        axios
                .get(
                    `https://www.neowsapp.com/rest/v1/neo/${asteroidId}?api_key=3O93YcjVXfreFogJawULO4fHalcOlw8GYPn9BVut`
                )
                .then((response) => {
                    const asteroidData = response.data
                    console.log(asteroidData)
                });
      }, [])
    
  return (
    <div>AsteroidPage</div>
  )
}

export default AsteroidPage