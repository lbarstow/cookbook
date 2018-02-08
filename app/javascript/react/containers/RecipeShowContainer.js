import React, {Component} from 'react';
import RecipeShowPane from '../components/RecipeShowPane';

class RecipeShowContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      original: {},
      variations: [],
      title: '',
      body: '',

    };
  }
  selectedRecipe() {
    return this.state.restaurants.find((restaurant) =>
      (restaurant.id === this.state.selectedId)
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

      this.setState({
        original: responseBody.recipe,
        variations: responseBody.variations,
        title: responseBody.recipe.title,
        body: responseBody.recipe.body

      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let id = document.getElementById('show').getAttribute('data-id');
    return(
      <div className="recipe-show-pane">
        <RecipeShowPane
          title={this.state.original.title}
          servings={this.state.original.servings_made}
          body={this.state.original.body}
          servings={this.state.original.servings_made}
          description={this.state.original.description}
          source={this.state.original.source}
          date={this.state.original.created_at}
        />
      </div>
    )
  }
}
export default RecipeShowContainer;
