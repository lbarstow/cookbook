import React, {Component} from 'react';
import RecipeShowPane from '../components/RecipeShowPane';

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
                    author: ''}


    };
  }
  selectedRecipe() {
    return this.state.recipes.find((recipe) =>
      (recipe.id === this.state.selectedId)
    )
  }
  componentDidMount(){
    let id = document.getElementById('show').getAttribute('data-id');
    fetch(`/api/v1/recipes/${id}`)
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
        originalID: id,
        recipes: recipes,
        selectedId: parseInt(id),
        currentRecipe: recipes[0]
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    console.log(this.state.recipes)
    console.log(this.state.currentRecipe)
    let id = document.getElementById('show').getAttribute('data-id');
    return(
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
      </div>
    )
  }
}
export default RecipeShowContainer;
