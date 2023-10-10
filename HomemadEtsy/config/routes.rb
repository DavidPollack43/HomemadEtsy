Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
      # User routes
      resources :users, only: [:create] # Sign up a new user

      # Session routes
      resource :session, only: [:create, :destroy] # Log in and Log out

      # Product routes
      resources :products, except: [:new, :edit] do 
        # This gives you all CRUD routes for products except new and edit which are typically not needed for APIs
      end

      # Order routes
      resources :orders, except: [:new, :edit] do
        # This gives you all CRUD routes for orders except new and edit
      end
  end
end
