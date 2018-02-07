class AddAuthorToRecipe < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :author_id, :integer
  end
end
