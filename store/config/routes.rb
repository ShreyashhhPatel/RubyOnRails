Rails.application.routes.draw do
  resource :session
  resources :passwords, param: :token
  resources :products
  resources :products do
  resources :subscribers, only: [ :create ]
  resource :unsubscribe, only: [ :show ]

  end
  root "products#index"

  # get "/products", to: "products#index"
  # get "/products/new", to: "products#new"
  # post "/products", to: "products#create"
  # get "/products/:id", to: "products#show"
  # get "/products/:id/edit", to: "products#edit"
  # patch "/products/:id", to: "products#update"
  # put "/products/:id", to: "products#update"
  # delete "/products/:id", to: "products#destroy"
end

