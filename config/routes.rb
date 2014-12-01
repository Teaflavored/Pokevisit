Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :users, defaults: { format: :json }, only: [:index, :update]
  resource :session, only: [:create, :destroy]
  get "listings/own_listings", to: "listings#own_listings", as: "own_listing"
  resources :listings, defaults: { format: :json }, only: [:index, :show, :create, :update]
  resources :user_images, defaults: { format: :json }, only: [:update, :index]
  resources :reservations, defaults: { format: :json}, only: [:index, :create, :destroy] do
    get "approve"
    get "deny"
  end

  resources :listing_images, defaults: { format: :json}, only: [:create]

  get '/main', to: "static_pages#main", as: "main"
  root to: "static_pages#landing_page"
end
