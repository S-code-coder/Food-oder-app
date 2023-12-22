import React from "react";
import mealsImage from "../../asset/meal.jpg"
import classes from "./Header.module.css";
import HeadereCartButton from "./HeaderCartButton"

const Header = props =>{
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1>DEE-MEALS</h1>
               <HeadereCartButton />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A Restuarant"/>
            </div>
        </React.Fragment>
    )
}

export default Header;