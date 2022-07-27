class DashboardController < ApplicationController
  skip_before_action :authenticate_user
  skip_before_action :is_approved

  def index
    @likes = current_user ? current_user.likes.pluck(:collection_id) : []
    @hot_bids = Collection.top_bids(30).with_attached_attachment
    @featured_users = FeaturedUser.limit(5).map(&:user)
    @featured_collections = FeaturedCollection.limit(5).map(&:collection).compact
    @own_contract = NftContract.where.not(owner_id: nil).limit(5)
    @featured_users = User.where(id: FeaturedUser.all.map(&:user_id))
    @hot_collections = Collection.on_sale.reorder(likes_count: 'desc').limit(18)
    top_buyers_and_sellers
  end

  def set_categories_by_filter
    params[:page_no] ||= 1
    filter_query = ""
    @category_collections = params[:query].present? ? Collection.search("*#{build_elastic_search_str(params[:query].strip)}*").records.on_sale : Collection.on_sale
    if params[:category].present?
      for category in params[:category]
        if params[:category].find_index(category) == 0
          filter_query = filter_query + "category like '%#{category}%'"
        else
          filter_query = filter_query + " OR category like '%#{category}%'"
        end
      end
      @category_collections = @category_collections.where(filter_query)
    end
    @category_collections = @category_collections.paginate(page: params[:page_no] || 1, per_page: 15)
    @category_collections = @category_collections.reorder(likes_count: 'desc',)
    @category_collections = @category_collections.order(:id)
  end

  def celebrity_list
    if params[:search].present?
      @celebrity_data = Celebrity.where("title like :search OR description like :search", search: "%#{params[:search]}%") 
    else
      @celebrity_data = Celebrity.all()
    end 
  end

  def top_buyers_and_sellers
    @top_sellers = User.top_seller(params[:days]).with_attached_attachment
    @top_buyers = User.top_buyer(params[:days]).with_attached_attachment
  end

  def search
    @users = User.search("*#{build_elastic_search_str(params[:query])}*").records
    set_categories_by_filter
    #@artists =  User.joins(:created_collections).with_attached_attachment.group('collections.creator_id').order('name DESC') 
    @artists =  User.joins(:created_collections).with_attached_attachment.group('collections.creator_id').order('COUNT(collections.creator_id) DESC')
    @own_contract = NftContract.where.not(owner_id: nil)

  end

  def filter_by
    filter_query = ""
    params[:category] = [] if params[:category].nil?
    session[:category]  = params[:category]
    render json: {filter_data: "success"}
  end   
   
  def notifications
    # Notification.unread(current_user).update_all(is_read: true) if Notification.unread(current_user).present?
    @notifications = current_user.notifications
  end

  def read_notifications
    Notification.unread(current_user).update_all(is_read: true) if Notification.unread(current_user).present?
  end

  def contract_abi
    shared = ActiveModel::Type::Boolean.new.cast(params[:shared])
    abi = if params[:contract_address].present? && params[:type] == 'erc20'
            Utils::Abi.weth
          # elsif params[:contract_address].present? && (params[:type] == 'erc20')
            # { abi: Api::Etherscan.new.contract_abi(params[:contract_address]), bytecode: '' }
          elsif params[:contract_address].present? && (params[:type] == 'trade')
            Utils::Abi.trade
          elsif params[:contract_address].present? && (params[:type] == 'trade_proxy')
            Utils::Abi.trade_proxy
          elsif(shared)
            if params[:type] == 'nft721'
              Utils::Abi.shared_nft721
            elsif params[:type] == 'nft1155'
              Utils::Abi.shared_nft1155
            end
          elsif(!shared)
            if params[:type] == 'nft721'
              Utils::Abi.nft721
            elsif params[:type] == 'nft1155'
              Utils::Abi.nft1155
            end
          else
            {}
          end
    render json: {compiled_contract_details: abi}
  end

  def gas_price
    gas_price = Api::Gasprice.gas_price
    render json: {gas_price: gas_price}
  end

  def collectionitemlists
    params[:page] ||= 1
    @own_contract = NftContract.where.not(owner_id: nil).paginate(page: params[:page] || 1, per_page: 20)
  end

  def collections
    params[:page] ||= 1
    @own_contract = NftContract.where.not(owner_id: nil).paginate(page: params[:page] || 1, per_page: 20)
  end
  
  private

  def build_elastic_search_str(string)
    return nil if string.nil?
    es_string = ''
    str_arr = string.strip.split("")
    str_arr.each_with_index do |char, index|
      if ['^', '/', '(', ')', '-', '~', '{', '}', '[', ']', ':', '"'].include?(char)
        if str_arr[index - 1] == '\\' then es_string += char else es_string += '\\' + char end
      else
        es_string += char
      end
    end
    es_string
  end
end
