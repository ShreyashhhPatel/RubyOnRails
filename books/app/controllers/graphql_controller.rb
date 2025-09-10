# frozen_string_literal: true
class GraphqlController < ApplicationController
  protect_from_forgery with: :null_session, unless: -> { request.local? }

  def execute
    query = params[:query]
    variables = prepare_variables(params[:variables])
    operation_name = params[:operationName]

    result = BooksSchema.execute(
      query,
      variables: variables,
      context: {},
      operation_name: operation_name
    )
    render json: result
  rescue => e
    Rails.logger.error("[GraphQL] #{e.class}: #{e.message}\n#{e.backtrace&.first(10)&.join("\n")}")
    render json: { errors: [{ message: e.message }] }, status: :internal_server_error
  end

  private

  def prepare_variables(variables_param)
    case variables_param
    when String
      variables_param.present? ? JSON.parse(variables_param) : {}
    when Hash, ActionController::Parameters
      variables_param
    when nil
      {}
    else
      {}
    end
  end
end
