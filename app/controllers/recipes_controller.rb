class RecipesController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    @recipes = Recipe.where(parent_recipe_id: nil)
  end

  def show
    @recipe = Recipe.find(params[:id])
    @variations = @recipe.variations
    @id = params[:id]
  end

  def new
    @recipe = Recipe.new
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.author_id = current_user.id
    if @recipe.save
      redirect_to @recipe, notice: 'Your recipe has been added.'
    else
      render action: 'new'
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :body, :servings_made,
       :description, :source)
  end

end
