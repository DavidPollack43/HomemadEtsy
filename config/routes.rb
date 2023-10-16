Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
      # User routes
      resources :users, only: [:create] # Sign up a new user

      # Session routes
      resource :session, only: [:create, :destroy, :show] # Log in and Log out

      # Product routes
      resources :products, except: [:new, :edit] do 
      end

      # Order routes
      resources :orders, except: [:new, :edit, :update] do
      end

      resources :cart_items, except: [:new, :edit, :show]
  end

  get '*path', to: "static_pages#frontend_index"
end
