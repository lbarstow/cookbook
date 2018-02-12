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
      uID: 0


    };

    this.recipeById = this.recipeById.bind(this);
    this.addVariation = this.addVariation.bind(this);
    this.editVariation = this.editVariation.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.tabClick = this.tabClick.bind(this);
  }
  //takes in an integer, returns the recipe from the this.recipes.state with an id that matches the input
  recipeById(id) {
    return this.state.recipes.find((recipe) =>
      (recipe.id === id)
    )
  }
  addVariation(event){
    event.preventDefault();
    this.setState({readOnly: false});

    alert("I'll let you add a new variation");
  }
  editVariation(event){
    event.preventDefault();
    this.setState({readOnly: true});
    alert("I'll let you edit this version");
  }
  handleFormSubmit(event){
    event.preventDefault();
    console.log("submit")
    this.setState({readOnly: true});
    alert("I'll let you edit this version");
  }
  //called when a VariationTab is clicked. finds id and recipe associated with
  //that tab and changes state accordingly
  tabClick(event) {
    event.preventDefault()
    let id = parseInt(event.target.id);

    let selectedVariaiton = this.recipeById(id);
    this.setState({selectedId: id, currentRecipe: selectedVariaiton})
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

      this.setState({
        originalID: parseInt(id),
        recipes: recipes,
        selectedId: parseInt(id),
        currentRecipe: recipes[0],
        uID: responseBody.recipe.user
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let id = document.getElementById('show').getAttribute('data-id');
    console.log(this.state.currentRecipe)
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
        onClick={this.handleFormSubmit}
        handleChange={this.editVariation}
      />
      </div>

    }
    let tabs = this.state.recipes.map((recipe) => {
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
          {showPane}
        <div className="banana">
        {tabs}
        </div>

      </div>
    )
  }
}
export default RecipeShowContainer;
