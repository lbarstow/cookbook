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
    this.setState({readOnly: true, edit: false})
  }
  addVariation(event){
    event.preventDefault();
    this.setState({readOnly: false});
  }
  editVariation(event){
    event.preventDefault();
    this.setState({readOnly: false});
    this.setState({edit: true});
  }
  handleChange(event){
    event.preventDefault();
    let recipe = this.state.currentRecipe;
    let field = event.target.name;
    let val = event.target.value;
    //used for storing the contents of each field- unchanged or not
    recipe[field] = val;
    this.setState({currentRecipe: recipe});
    //used for storing only the fields that have been changed
    let newChange = this.state.changes;
    newChange[field] = val;
    this.setState({changes: newChange});
  }

  handleFormSubmit(event){
    event.preventDefault();
    console.log("submit")
    let formPayload =
      {body: this.state.currentRecipe.body,
      title: this.state.currentRecipe.title,
      description: this.state.currentRecipe.description,
      servings_made: this.state.currentRecipe.servings_made,
      source: this.state.currentRecipe.source,
      author_id: parseInt(this.state.uID),
      parent_recipe_id: this.state.originalID
    };
    let errors = [];
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
        this.setState({ errors: [] });
        let newrecipes = this.state.recipes.concat(JSON.parse(JSON.stringify(response.recipe)));
        this.setState({recipes: newrecipes});
        this.setState({currentRecipe: JSON.parse(JSON.stringify(response.recipe))});
        this.setState({selectedId: parseInt(response.recipe.id)});
        this.setState({changes: {}});
        this.setState({readOnly: true});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors})
    }
  }

  submitEdit(event){
    event.preventDefault();
    let formPayload = this.state.changes;
    let errors = [];
    let id = this.state.selectedId;
    if (formPayload.body === null || formPayload.body === ''){
      errors.push("Your recipe needs a body")
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
        this.setState({changes: {}});
        this.setState({readOnly: true});
        this.setState({edit: false});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors})
    }
  }

  //called when a VariationTab is clicked. finds id and recipe associated with
  //that tab and changes state accordingly
  tabClick(event) {
    event.preventDefault()
    let id = parseInt(event.target.id);
    this.recipeById(id);
    this.setState({selectedId: id})
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
    let id = document.getElementById('show').getAttribute('data-id');
    console.log(this.state.recipes)
    let showPane;
    if (this.state.readOnly){
      showPane=
      <div className="recipe-show-pane">
        <RecipeShowPane
          title={this.state.currentRecipe.title}
          servings={this.state.currentRecipe.servings_made}
          body={this.state.currentRecipe.body}
          description={this.state.currentRecipe.description}
          source={this.state.currentRecipe.source}
          date={this.state.currentRecipe.date}
          author={this.state.currentRecipe.author}
        />
        <button className="variation-button" onClick={this.addVariation}>
          Add A Variation
        </button>
        {this.state.currentRecipe.author_id === this.state.uID &&
          <button className="variation-button" onClick={this.editVariation}>
          Edit this Version
        </button>}
      </div>

    }else{
      //uses the edit boolean from state to select the correct onSubmit and
      //button text so that the same component can be used for post and patch
      let changeFunct = this.handleFormSubmit;
      let text = "Add Variation"
      if (this.state.edit){
        changeFunct = this.submitEdit;
        text = "Submit Edit"
      }
      showPane=
        <div className="recipe-show-pane">
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
      <div className="recipe-show-container">
        <div className="variation-tabs">
          {tabs}
        </div>
        {showPane}
      </div>
    )
  }
}
export default RecipeShowContainer;
