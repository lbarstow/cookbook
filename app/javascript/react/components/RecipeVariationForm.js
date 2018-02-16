import React from 'react'

const RecipeVariationForm = (props) => {
  return (
    <form onSubmit={props.onClick}>

      <label>Title:
      <input
        type="text"
        name="title"
        value={props.title}
        onChange={props.handleChange}
        />
        </label>
      <div className="row">
      <div className="small-4 columns">
        <input
          placeholder="Add Servings Made"
          type="text"
          name="servings_made"
          value={props.servings}
          onChange={props.handleChange}
        />
      </div>
      <div className="small-8 columns">
        <input
          placeholder="Add A Source"
          className="small-3-columns"
          type="text"
          name="source"
          value={props.source}
          onChange={props.handleChange}
        />
      </div>
      </div>
        <input
          placeholder="Add a Description"
          type="text"
          name="description"
          value={props.description}
          onChange={props.handleChange}
        />
      <textarea
        rows="7"
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
