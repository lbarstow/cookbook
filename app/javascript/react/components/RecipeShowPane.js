import React from 'react';

const RecipeShowPane= (props) =>{
  let formattedBody = props.body
  // need to put in  a better way to format my body


  return(
    <div>
      <h4>{props.title}</h4>
      <p>Makes: {props.servings}</p>
      <p>From: {props.source}</p>
      <p>{props.description}</p>
      <pre>{props.body}</pre>
      <span>Added on {props.date}</span>
    </div>
  );
}
export default RecipeShowPane;
