Rails.application.routes.draw do
  resources :users, only: [:create]
  resource :session, only: [:create, :destroy]
  resources :listings, defaults: { format: :json }, only: [:index, :show]

  get '/main', to: "static_pages#main", as: "main"
  root to: "static_pages#landing_page"
end
