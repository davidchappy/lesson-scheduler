Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do
      resources :forms, only: [:index, :new, :create, :destroy, :update]
    end
  end
  root to: 'site#index'
  devise_for :users, :controllers => { :registrations => "users/registrations" }
end
