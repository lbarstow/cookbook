import React from 'react';

const RecipeShowPane= (props) =>{

  // need to put in  a better way to format my body

  return(
    <div className="recipe-pane">
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
