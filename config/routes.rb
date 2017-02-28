Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do
      resources :lesson_periods, only: [:index, :show, :create, :destroy, :update]
      resources :families, only: [:index, :submit]
      resources :weeks, only: [:index, :update]
      resources :forms, only: [:index, :show, :update]
      resources :instruments, only: [:index, :create, :destroy]
      resources :teachers, only: [:index, :create, :destroy, :update]
    end
  end
  root to: 'site#index'
  devise_for :users, :controllers => { :registrations => "users/registrations" }
end
