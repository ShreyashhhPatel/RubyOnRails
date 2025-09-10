# frozen_string_literal: true
module Mutations
  class CreateBook < BaseMutation
    argument :input, Types::CreateBookInput, required: true
    type Types::BookType

    def resolve(input:)
      attrs = input.to_h
      book = Book.create!(
        title: attrs[:title],
        author: attrs[:author],
        published_year: attrs[:published_year]
      )
      book
    rescue ActiveRecord::RecordInvalid => e
      raise GraphQL::ExecutionError, e.record.errors.full_messages.join(", ")
    end
  end
end
