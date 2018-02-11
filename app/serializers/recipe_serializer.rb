class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :description, :date, :author, :author_id, :source, :servings_made

  def author
    if !object.author_id.nil?
      return "#{object.author.name}"
    end
    return "Deleted User"
  end
  def date
    date = object.created_at.strftime("%B %e, %Y")
    return "#{date}"
  end


end
