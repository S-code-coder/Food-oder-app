import React, { useState, useEffect } from "react";
import AvailableMealItem from "./AvailableMealsItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import useFetch from "../hooks/useFetch-hook";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
 const {error,loading,sendRequest:sendMealsRequest} = useFetch()

 useEffect(()=>{
  const transformedTask = data =>{
    let loadedTask = [];
    for(const taskKey in data){
      loadedTask.push({id:taskKey,name:data[taskKey].name,description:data[taskKey].description,price:data[taskKey].price})
    }

    setMeals(loadedTask)
  }
  
  sendMealsRequest({url:"https://react-data-435f8-default-rtdb.firebaseio.com/meals.json"},transformedTask)
 },[sendMealsRequest])

 

  let MealsList;
  if (meals.length === 0) {
    MealsList = <p>Found No Meals</p>;
  }
  if (meals.length > 0) {
    MealsList = meals.map((meal) => (
      <AvailableMealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }
  if (loading) {
    MealsList = <p>loading...</p>;
  }
  if (error) {
    MealsList = <p>{error}</p>;
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{MealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
