Rails.application.routes.draw do
  resources :users, only: [:create]
  resource :session, only: [:create, :destroy]
  get "listings/own_listings", to: "listings#own_listings", as: "own_listing"
  resources :listings, defaults: { format: :json }, only: [:index, :show, :create]

  resources :reservations, defaults: { format: :json}, only: [:index, :create, :destroy] do
    get "approve"
    get "deny"
  end

  get '/main', to: "static_pages#main", as: "main"
  root to: "static_pages#landing_page"
end
