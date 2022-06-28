Rails.application.routes.draw do

  namespace :admin do
    devise_for :admin_users, controllers: {
      sessions: 'admin/admin_users/sessions',
    }
    resources :users do
      collection do
        get :reports
      end

      member do
        get :collections
        get :approve
        get :deny
        get :enable
        get :verify
      end
    end
    resources :categories
    resources :fees
    resources :featured_users, except: [:edit, :update]
    resources :featured_collections, except: [:edit, :update]
    resources :transactions, only: [:index]

    get 'dashboard', to: 'dashboard#index'
    root to: 'dashboard#index'
  end

  resources :users, except: [:index, :create, :destroy] do
    collection do
      get :following
      get :follow
      get :unfollow
      get :load_tabs
      post :like
      post :unlike
      post :bid
      post :report
      post :create_contract
      post :follow
      post :unfollow
    end
  end
  resources :nft_contracts, only: [:show]
  resources :collections, only: [:new, :show, :create]  do
    member do
      get :remove_from_sale
      get :fetch_details
      get :fetch_transfer_user
      post :bid
      post :buy
      post :sell
      post :update_token_id
      post :change_price
      post :transfer_token
      post :sign_metadata_hash
      post :sign_metadata_with_creator
      post :sign_fixed_price
      post :approve
      post :owner_transfer
      post :burn
      post :save_contract_nonce_value
      post :get_nonce_value
      post :save_nonce_value
      post :get_contract_sign_nonce
      post :update_state
    end
  end

  resources :sessions, only: [:create, :destroy] do
    collection do
      get :valid_user
    end
  end
  resources :likes, only: [:create, :update]
  resources :bids
  resources :fees

  ### CUSTOM ROUTES
  get 'dashboard', to: 'dashboard#index'
  get 'top_buy_sell', to: 'dashboard#top_buyers_and_sellers'
  get 'owncollections', to: 'dashboard#collectionitemlists'
  get 'my_items', to: 'users#my_items'
  get 'activities', to: 'activities#index'
  get 'load_more_activities', to: 'activities#load_more'
  get 'search', to: 'dashboard#search'
  get 'celebrity', to: 'dashboard#celebrity'
  get 'notifications', to: 'dashboard#notifications'
  get 'contract_abi', to: 'dashboard#contract_abi'
  get 'category_filter', to: 'dashboard#set_categories_by_filter'
  get 'gas_price', to: 'dashboard#gas_price'
  get 'collections', to: 'dashboard#collections'
  post '/filter_by', to: 'dashboard#filter_by'
  put 'read_notifications', to: 'dashboard#read_notifications'
  get 'followers_list', to: 'users#followers_list'
  get 'following_list', to: 'users#following_list'
  get 'celebrity_list', to: 'dashboard#celebrity_list'
  get 'collections_list', to: 'nft_contracts#collections_list'
  

  ### STATIC PAGES
  get 'about', to: 'static#about'
  get 'faq', to: 'static#faq'
  get 'terms_conditions', to: 'static#terms_conditions'
  get 'privacy', to: 'static#privacypolicy'
  get 'sitemap', to: 'static#sitemap', defaults: {format: 'xml' }

  ### ROOT PAGE
  root to: "dashboard#index"

  ### THIRD-PARTY ROUTES
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
end
