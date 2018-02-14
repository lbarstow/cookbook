import React from 'react';

const RecipeShowPane= (props) =>{
  //consts that will be false if the field is null or empty
  //used in return so that i don't have elements with no text
  const hasDescription = props.description && props.description.trim() !== "";
  const hasServings = props.servings && props.servings.trim() !== "";
  const hasSource = props.source && props.source.trim() !== "";

  //changes all \n line breaks to <br/> so that body can be displayed properly
  const body = props.body.split('\n').map((line, key) => {
    return <span key={key}>{line}<br/></span>});

  return(
    <div className="recipe-contents">
      <h4>{props.title}</h4>
      {hasSource && <span>From: {props.source}</span>}
      {hasServings && <span>Makes: {props.servings}</span>}
      {hasDescription && <p>Description: {props.description}</p>}
      <p>{body}</p>
      <span>Added on {props.date} by {props.author}</span>
    </div>
  );
}
export default RecipeShowPane;
