class Api::V1::RecipesController < ApplicationController
  serialization_scope :current_user
  skip_before_action :verify_authenticity_token

  def show
    recipe = Recipe.find(params[:id])
    puts recipe.body
    render json: recipe, serializer: RecipeShowSerializer
  end

  def create
    recipe = Recipe.new(recipe_params)

    if recipe.save
      render json: recipe, serializer: RecipeSerializer
    else
      render json: {error: recipe.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    recipe = Recipe.find(params[:id])
    recipe.update(update_params)
    render json: recipe, serializer: RecipeSerializer
  end

  private
  def recipe_params
    params.require(:recipe).permit(:title, :body, :servings_made,
      :description, :source, :author_id, :parent_recipe_id)
  end
  def update_params
    params.require(:recipe).permit(:title, :body, :servings_made,
      :description, :source)
  end
end
