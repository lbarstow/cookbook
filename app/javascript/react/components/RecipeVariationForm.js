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
      <label>Servings Made:
      <input

        type="text"
        name="servings_made"
        value={props.servings}
        onChange={props.handleChange}
      />
      </label>
      </div>
      <div className="small-8 columns">
      <label>
        Source:
        <input
          className="small-3-columns"
          type="text"
          name="source"
          value={props.source}
          onChange={props.handleChange}
        />
      </label>
      </div>
      </div>
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
