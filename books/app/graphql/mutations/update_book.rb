# frozen_string_literal: true
module Mutations
  class UpdateBook < BaseMutation
    argument :input, Types::UpdateBookInput, required: true
    type Types::BookType

    def resolve(input:)
      attrs = input.to_h
      book = Book.find(attrs.delete(:id))

      # keep only provided fields; ignore nil/blank so partial update is safe
      update_attrs = attrs.compact
                          .delete_if { |_, v| v.respond_to?(:strip) && v.strip == "" }

      book.update!(update_attrs) unless update_attrs.empty?
      book
    rescue ActiveRecord::RecordNotFound => e
      raise GraphQL::ExecutionError, e.message
    rescue ActiveRecord::RecordInvalid => e
      raise GraphQL::ExecutionError, e.record.errors.full_messages.join(", ")
    end
  end
end
