Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do
      resources :app, only: [:index]
      resources :forms, only: [:index, :show, :update]
      resources :lesson_periods, only: [:index, :show, :create, :destroy, :update]
      resources :weeks, only: [:update]
      resources :instruments, only: [:index, :create, :destroy, :update]
      resources :teachers, only: [:index, :create, :destroy, :update]
      resources :app_settings, only: [:index, :create, :destroy, :update]
      resources :admin_portal, only: [:index]
    end
  end
  root to: 'site#index'
  devise_scope :user do
    get '/users', to: 'devise/sessions#new'
  end
  devise_for :users, :controllers => { :registrations => "users/registrations" }
end
