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
    return current_user.id.to_i
  end
end
