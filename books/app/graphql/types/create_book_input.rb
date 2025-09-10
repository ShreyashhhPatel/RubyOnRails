# frozen_string_literal: true
module Types
  class CreateBookInput < Types::BaseInputObject
    argument :title, String, required: true
    argument :author, String, required: false
    argument :published_year, Integer, required: false
  end
end
