module Types
  class BookType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :author, String, null: true
    field :published_year, Integer, null: true  # client sees publishedYear
  end
end
