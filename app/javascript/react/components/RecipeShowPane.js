import React from 'react';

const RecipeShowPane= (props) =>{

  return(
    <div>
      <h4>{props.title}</h4>
      <p>Makes: {props.servings}</p>
      <p>From: {props.source}</p>
      <p>{props.description}</p>
      <p>{props.body}</p>
      <span>Added on {props.date}</span>
    </div>
  );
}
export default RecipeShowPane;
