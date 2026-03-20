Rails.application.routes.draw do
  # Devise — registration disabled, admin login only
  devise_for :users, skip: [:registrations]

  # Public — read only, no account required
  root "home#index"
  get "/decouvrir", to: "pages#decouvrir"
  get "/materiel", to: "pages#materiel"
  get "/soins", to: "pages#soins"
  get "/nourriture", to: "pages#nourriture"
  get "/azukari", to: "pages#azukari"
  resources :kois, only: [:index, :show]
  resources :messages, only: [:create]

  # Admin — protected by Admin::BaseController
  namespace :admin do
    root "kois#index"
    resources :kois
    resources :messages, only: [:index, :show, :update]
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
