import React, {Component} from 'react';
import RecipeShowPane from '../components/RecipeShowPane';
import RecipeVariationForm from '../components/RecipeVariationForm';
import VariationTab from '../components/VariationTab';

class RecipeShowContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      originalID: {},
      recipes: [],
      selectedId: null,
      currentRecipe: {title: '',
                    description: '',
                    body: '',
                    servings_made: '',
                    source: '',
                    date: '',
                    author: ''},

      readOnly:true,
      edit: false,
      uID: 0,
      errors: [],
      changes: {}
    };
    this.recipeById = this.recipeById.bind(this);
    this.addVariation = this.addVariation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editVariation = this.editVariation.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.tabClick = this.tabClick.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.cancelChange = this.cancelChange.bind(this);
  }

  //takes in an integer, sets currentRecipe in state to be a copy of
  recipeById(id) {
    let recipe = this.state.recipes.find((recipe) =>
      (recipe.id === id)
    )
    let recipeCopy = JSON.parse(JSON.stringify(recipe));
    this.setState({currentRecipe: recipeCopy});
  }

  cancelChange(){
    this.recipeById(this.state.selectedId)
    this.setState({readOnly: true, edit: false, errors: [], changes: {}})
  }

  addVariation(event){
    event.preventDefault();
    this.setState({readOnly: false, edit: false});
  }

  editVariation(event){
    event.preventDefault();
    this.setState({readOnly: false, edit: true});
  }

  handleChange(event){
    event.preventDefault();
    let field = event.target.name;
    let val = event.target.value;
    let recipe = this.state.currentRecipe;
    //used for storing the contents of each field- unchanged or not
    recipe[field] = val;
    //used for storing only the fields that have been changed
    let newChange = JSON.parse(JSON.stringify(this.state.changes));
    let originalVal = this.state.recipes.find((item) =>
      (item.id === this.state.selectedId)
    )
    if(val === originalVal[field]){
      delete newChange[field]
    }else{
      newChange[field] = val;
    }
    this.setState({currentRecipe: recipe, changes: newChange});
  }

  handleFormSubmit(event){
    event.preventDefault();
    console.log("submit")
    console.log(this.state.changes)
    let formPayload =
      {body: this.state.currentRecipe.body,
      title: this.state.currentRecipe.title,
      description: this.state.currentRecipe.description,
      servings_made: this.state.currentRecipe.servings_made,
      source: this.state.currentRecipe.source,
      author_id: parseInt(this.state.uID),
      parent_recipe_id: this.state.originalID};
    let errors = [];
    if (Object.keys(this.state.changes).length === 0){
      errors.push("No Changes to Submit")
    }
    if (formPayload.body === null || formPayload.body === ''){
      errors.push("Your recipe needs a body")
    }
    if (formPayload.title === null || formPayload.title === ''){
      errors.push("Your recipe needs a title")
    }

    if (errors.length === 0) {
      //add correct route when i figure out how to get it
      fetch(`/api/v1/recipes`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(formPayload),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        let recipeRef = JSON.parse(JSON.stringify(response.recipe))
        let newrecipes = this.state.recipes.concat(recipeRef);
        this.setState({errors: [], recipes: newrecipes, currentRecipe: recipeRef,
          selectedId: parseInt(recipeRef.id),changes: {}, readOnly: true});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors})
    }
  }

  submitEdit(event){
    event.preventDefault();
    let formPayload = JSON.parse(JSON.stringify(this.state.changes));
    let errors = [];
    let id = this.state.selectedId;
    if (Object.keys(formPayload).length === 0){
      errors.push("No Changes to Submit")
    }
    if (formPayload.body === null || formPayload.body === ''){
      errors.push("Your recipe needs a body")
    }
    if (formPayload.title === null || formPayload.title === ''){
      errors.push("Your recipe needs a title")
    }
    if (errors.length === 0) {
      fetch(`/api/v1/recipes/${id}`, {
        credentials: 'same-origin',
        method: 'PATCH',
        body: JSON.stringify(formPayload),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        console.log(response.recipe);
        let index = this.state.recipes.findIndex(item => item.id === response.recipe.id);
        let updatedRecipes = this.state.recipes;
        updatedRecipes[index] = JSON.parse(JSON.stringify(response.recipe));
        this.setState({errors: []});
        this.setState({currentRecipe: JSON.parse(JSON.stringify(response.recipe))});
        this.setState({recipes: updatedRecipes});
        this.setState({selectedId: parseInt(response.recipe.id)});
        this.setState({changes: {},readOnly: true,edit: false});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({errors: errors})
    }
  }

  //called when a VariationTab is clicked. finds id and recipe associated with
  //that tab and changes state accordingly
  tabClick(event) {
    event.preventDefault()
    if(this.state.readOnly){
      let id = parseInt(event.target.id);
      this.recipeById(id);
      this.setState({selectedId: id, changes: {}});
    };
  }

  componentDidMount(){
    let id = document.getElementById('show').getAttribute('data-id');
    fetch(`/api/v1/recipes/${id}`, {credentials: 'same-origin'})
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    }).then(responseBody => {
      let recipes = Array.from(responseBody.recipe.allrecipes);
      recipes.unshift(responseBody.recipe.original);
      id = parseInt(id)

      this.setState({
        originalID: id,
        recipes: recipes,
        selectedId: id,
        uID: responseBody.recipe.user
      });
      this.recipeById(recipes[0].id)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    console.log("current")
    console.log(this.state.currentRecipe)
    console.log("selected")
    console.log(this.state.selectedId)
    let errorHTML = this.state.errors.map((error, index) => {
      return <li key={index}>{error}</li>
    });

    let showPane;
    let edit
    if (this.state.readOnly){
      showPane=
      <div className="recipe-show-pane">
        <a href="/recipes">
          <button className="variation-button" >
            Back to Recipes
          </button>
        </a>
        {this.state.uID &&
        <button className="variation-button" onClick={this.addVariation}>
          Create A Variation
        </button>}
        {((this.state.currentRecipe.author_id === this.state.uID) && this.state.uID) &&
        <button className="variation-button" onClick={this.editVariation}>
          Edit this Version
        </button>}
        <RecipeShowPane
          title={this.state.currentRecipe.title}
          servings={this.state.currentRecipe.servings_made}
          body={this.state.currentRecipe.body}
          description={this.state.currentRecipe.description}
          source={this.state.currentRecipe.source}
          date={this.state.currentRecipe.date}
          author={this.state.currentRecipe.author}
        />
      </div>

    }else{
      //uses the edit boolean from state to select the correct onSubmit and
      //button text so that the same component can be used for post and patch
      let changeFunct = this.handleFormSubmit;
      let text = "Submit Variation"
      if (this.state.edit){
        changeFunct = this.submitEdit;
        text = "Submit Edit"
      }
      showPane=
        <div className="recipe-show-pane">
        {errorHTML.length > 0 && <ul>{errorHTML}</ul>}
        <RecipeVariationForm
          title={this.state.currentRecipe.title}
          servings={this.state.currentRecipe.servings_made}
          body={this.state.currentRecipe.body}
          description={this.state.currentRecipe.description}
          source={this.state.currentRecipe.source}
          date={this.state.currentRecipe.date}
          author={this.state.currentRecipe.author}
          onClick={changeFunct}
          handleChange={this.handleChange}
          buttonText={text}
          cancel={this.cancelChange}
        />
        </div>

    }
    let recipes = this.state.recipes
    let tabs = recipes.map((recipe) => {
      return(
        <VariationTab
          title={recipe.title}
          key={recipe.id}
          id={recipe.id}
          onClick={this.tabClick}
          isSelected={this.state.selectedId === recipe.id}
        />)
    })
    return(
      <div className="recipe-show-container small-11 columns small-centered">
        <div className="variation-tabs">
          {tabs}
        </div>
        {showPane}
      </div>
    )
  }
}
export default RecipeShowContainer;
