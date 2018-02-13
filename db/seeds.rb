# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if User.all.length < 1
  User.create(name: "Laura", email: "l@l.com", password: "password")
end

if Recipe.all.length < 1
  Recipe.create(title: "tea", body: "add boiling water to a mug with a tea bag", author_id: 1)
end
