class RecipesController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  def index
    @recipes = Recipe.all
  end
  def show
    @recipe = Recipe.find(params[:id])
  end

end
