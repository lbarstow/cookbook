import React from 'react';

const RecipeShowPane= (props) =>{

  // need to put in  a better way to format my body
   const hasDescription = props.description && props.description.trim() === "";
   const hasServings = props.servings && props.servings.trim() === "";
   const hasSource = props.source && props.source.trim() === "";

  return(
    <div >
      <h4>{props.title}</h4>
      {hasSource && <span>From: {props.source}</span>}
      {hasServings && <span>Makes: {props.servings}</span>}
      {hasDescription && <p>Description: {props.description}</p>}
      <p>{props.body}</p>
      <span>Added on {props.date} by {props.author}</span>
    </div>
  );
}
export default RecipeShowPane;
