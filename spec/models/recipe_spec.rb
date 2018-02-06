require 'rails_helper'

RSpec.describe Recipe, type: :model do
  it "accepts all expected fields" do
    recipe = Recipe.new(title: "I'll Say the Name",
                        description: "This describes a recipe",
                        source: "recipe source",
                        servings_made: "makes 4",
                        body: "I'm a body!! YAY!")
    expect(recipe).to be_valid
  end
  it "requires a body" do
    recipe_1 = Recipe.new(title: "I'll Say the Name")
    recipe_2 = Recipe.new(title: "I'll Say the Name", body: "I'm a body!! YAY!")
    expect(recipe_1).to_not be_valid
    expect(recipe_1.errors[:body]).to_not be_blank
    expect(recipe_2).to be_valid
    expect(recipe_2.errors[:body]).to be_blank
  end
  it "requires a title" do
    recipe_1 = Recipe.new(body: "I'm a body!! YAY!")
    recipe_2 = Recipe.new(title: "I'll Say the Name", body: "I'm a body!! YAY!")
    expect(recipe_1).to_not be_valid
    expect(recipe_1.errors[:title]).to_not be_blank
    expect(recipe_2).to be_valid
    expect(recipe_2.errors[:title]).to be_blank
  end
end
