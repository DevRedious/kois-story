Rails.application.routes.draw do
  app_role = ENV.fetch("KOIS_APP_ROLE", "all")
  public_routes = app_role != "admin"
  admin_routes = app_role != "public"

  # Devise — registration disabled, admin login only
  devise_for :users, skip: [ :registrations ] if admin_routes
  post "/users/local_admin_sign_in", to: "local_admin_sessions#create", as: :local_admin_session if admin_routes

  if public_routes
    # Public — read only, no account required
    root "home#index"
    get "/decouvrir", to: "pages#decouvrir"
    get "/materiel", to: "pages#materiel"
    get "/soins", to: "pages#soins"
    get "/nourriture", to: "pages#nourriture"
    get "/azukari", to: "pages#azukari"
    get "/a-propos", to: "pages#a_propos"
    get "/mentions-legales", to: "pages#mentions_legales"
    get "/cgv", to: "pages#cgv"
    get "/politique-de-confidentialite", to: "pages#politique_confidentialite"
    resources :kois, only: [ :index, :show ]
    resources :messages, only: [ :create ]
  end

  if admin_routes
    root "admin/dashboard#index" unless public_routes

    # Admin — protected by Admin::BaseController
    namespace :admin do
      root "dashboard#index"
      get :dashboard, to: "dashboard#index"
      resources :kois
      resources :messages, only: [ :index, :show, :update ] do
        patch :bulk_update, on: :collection
      end
      resources :products
      resources :orders, only: [ :index, :show, :edit, :update ] do
        patch :bulk_update, on: :collection
      end
      resources :payments, only: [ :index, :show, :edit, :update ]
      resources :clients, only: [ :index, :show, :edit, :update ]
      get :newsletter, to: "newsletter#index"
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
