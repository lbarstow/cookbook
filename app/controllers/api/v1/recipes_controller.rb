class Api::V1::RecipesController < ApplicationController
  serialization_scope :current_user

  def show
    recipe = Recipe.find(params[:id])
    variations = recipe.variations
    current = current_user
    puts "JSON"
    render json: recipe, serializer: RecipeShowSerializer


  end
end
