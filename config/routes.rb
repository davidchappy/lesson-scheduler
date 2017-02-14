Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do
      resources :forms, only: [:index, :new, :create, :destroy, :update]
      resources :families, only: [:index]
      resources :teachers, only: [:index, :show]
      resources :instruments, only: [:index, :show]
      resources :weeks, only: [:index, :create, :destroy]
    end
  end
  root to: 'site#index'
  devise_for :users, :controllers => { :registrations => "users/registrations" }
end
