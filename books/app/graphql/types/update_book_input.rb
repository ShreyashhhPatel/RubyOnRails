# frozen_string_literal: true
module Types
  class UpdateBookInput < Types::BaseInputObject
    argument :id, ID, required: true
    argument :title, String, required: false
    argument :author, String, required: false
    argument :published_year, Integer, required: false
  end
end
