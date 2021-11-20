import React from "react";
import classes from './Card.module.css'


const Card = (props) => {
    //const classes = 'card ' + props.className; //tell react that you can set class name in the custom compo
    //'card is a default class, no big deal
    return <div className={`${classes.card} ${props.className}` } >{props.children}</div>;
};

export default Card;