class Api::V1::RecipesController < ApplicationController
  serialization_scope :current_user

  def show
    recipe = Recipe.find(params[:id])
    puts recipe.body
    render json: recipe, serializer: RecipeShowSerializer
  end
end
