class RecipeShowSerializer < ActiveModel::Serializer
  attributes :id, :allrecipes, :original

  def allrecipes
    variations = object.variations
    parsed = ActiveModel::Serializer::ArraySerializer.new(
    variations, each_serializer: RecipeSerializer)
  end

  def original
    RecipeSerializer.new(object)
  end



end
