class Recipe < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true
  validates :author, presence: true, on: :create
  belongs_to :author, class_name: "User", optional: true

  belongs_to :parent_recipe, class_name: "Recipe", optional: true
  has_many :variations, foreign_key: :parent_recipe_id, class_name: "Recipe"
end
