# frozen_string_literal: true
module Mutations
  class DeleteBook < BaseMutation
    argument :input, Types::DeleteBookInput, required: true
    type Types::BookType

    def resolve(input:)
      book = Book.find(input[:id])
      book.destroy!
      book
    rescue ActiveRecord::RecordNotFound => e
      raise GraphQL::ExecutionError, e.message
    end
  end
end
