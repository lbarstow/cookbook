Rails.application.routes.draw do
  root 'recipes#index'
  devise_for :users
  resources :recipes, only: [:index, :show, :new, :create]
  namespace :api do
   namespace :v1 do
     resources :recipes, only: [:show, :create, :update]
   end
 end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
