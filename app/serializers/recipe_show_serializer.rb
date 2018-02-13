class RecipeShowSerializer < ActiveModel::Serializer
  attributes :id, :allrecipes, :original, :user

  def allrecipes
    variations = object.variations
    parsed = ActiveModel::Serializer::CollectionSerializer.new(
    variations, each_serializer: RecipeSerializer)
  end

  def original
    RecipeSerializer.new(object)
  end

  def user
    uid= scope.id.to_i
    return uid
  end
end
