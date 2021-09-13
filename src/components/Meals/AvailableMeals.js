import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  
  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch('https://food-order-app-bdcc7-default-rtdb.firebaseio.com/meals.json');
      const data = await res.json();

      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }

      setMeals(loadedMeals);
    }

    fetchMeals();
  }, []);
  
  const mealsItems = meals.map((meal) =>
    <MealItem 
      key={meal.id}
      id={meal.id}
      name={meal.name} 
      description={meal.description} 
      price={meal.price} 
    />
  );
  
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsItems}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;