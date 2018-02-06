class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.string :servings_made
      t.string :description
      t.string :source
      t.timestamps
    end
  end
end
