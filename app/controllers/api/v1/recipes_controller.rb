class Api::V1::RecipesController < ApplicationController
  def show
    recipe = Recipe.find(params[:id])
    variations = recipe.variations
    current = current_user

    render json: {recipe: recipe, variations: variations}
  end
end
