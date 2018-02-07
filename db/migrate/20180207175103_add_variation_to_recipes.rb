class AddVariationToRecipes < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :parent_recipe_id, :integer
  end
end
