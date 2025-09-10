class AddAuthorAndPublishedYearToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :author, :string
    add_column :books, :published_year, :integer
  end
end
