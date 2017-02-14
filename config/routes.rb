Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do
      resources :forms, only: [:index, :show, :new, :create, :destroy, :update]
      resources :families, only: [:index]
      resources :weeks, only: [:index, :create, :destroy]
    end
  end
  root to: 'site#index'
  devise_for :users, :controllers => { :registrations => "users/registrations" }
end
