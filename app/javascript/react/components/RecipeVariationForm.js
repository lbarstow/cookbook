import React from 'react'

const RecipeVariationForm = (props) => {
  return (
    <form onSubmit={props.onClick}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={props.title}
        onChange={props.handleChange}
        />
      <label>Servings Made:</label>
      <input
        type="text"
        name="servings_made"
        value={props.servings}
        onChange={props.handleChange}
      />
      <label>
        Source:
        <input
          type="text"
          name="source"
          value={props.source}
          onChange={props.handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={props.description}
          onChange={props.handleChange}
        />
      </label>
      <textarea
        name="body"
        value={props.body}
        onChange={props.handleChange}
      />
      <button type="submit"> {props.buttonText}</button>
      <button type="button" onClick={props.cancel}>Cancel</button>
    </form>
  )
}

export default RecipeVariationForm;
