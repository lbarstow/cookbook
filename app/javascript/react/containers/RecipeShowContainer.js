import React, {Component} from 'react';
import RecipeShowPane from '../components/RecipeShowPane';
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
      readOnly:false,
      uID: 0


    };

    this.recipeById = this.recipeById.bind(this)
    this.tabClick = this.tabClick.bind(this)
  }
  //takes in an integer, returns the recipe from the this.recipes.state with an id that matches the input
  recipeById(id) {
    return this.state.recipes.find((recipe) =>
      (recipe.id === id)
    )
  }
  addVariation(event){
    event.preventDefault();
    console.log("will add variation")
  }
  editVariation(event){
    event.preventDefault();
    console.log("will edit this variation")
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
          <div className="variation-button" onClick={this.addVariation}>
            Add A Variation
          </div>
          {this.state.currentRecipe.author_id === this.state.uID &&
            <div className="variation-button" onClick={this.editVariation}>
            Edit this Version
          </div>}
        </div>
        <div className="banana">
        {tabs}
        </div>

      </div>
    )
  }
}
export default RecipeShowContainer;
