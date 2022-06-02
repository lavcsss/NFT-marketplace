class DashboardController < ApplicationController
  skip_before_action :authenticate_user
  skip_before_action :is_approved

  def index
    set_categories_by_filter
    @likes = current_user ? current_user.likes.pluck(:collection_id) : []
    @hot_bids = Collection.top_bids(30).with_attached_attachment
    @featured_users = FeaturedUser.limit(5).map(&:user)
    @featured_collections = FeaturedCollection.limit(5).map(&:collection).compact
    @own_contract = NftContract.where.not(owner_id: nil).limit(5)
    @featured_users = User.where(id: FeaturedUser.all.map(&:user_id))
    # @hot_collections = Collection.group(:owner).count
    top_buyers_and_sellers
  end

  def set_categories_by_filter
    params[:page_no] ||= 1
    @category_collections = params[:query].present? ? Collection.search("*#{build_elastic_search_str(params[:query].strip)}*").records.on_sale : Collection.on_sale

    @category_collections = @category_collections.get_with_sort_option(params[:sort_by]) if params[:sort_by]
    @category_collections = @category_collections.where("category like ?", "%#{params[:category]}%") if params[:category].present?
    @category_collections = @category_collections.on_sale.with_attached_attachment.paginate(page: params[:page_no] || 1)
    @category_collections = @category_collections.reorder(likes_count: 'desc').limit(18)
  end

  def top_buyers_and_sellers
    @top_sellers = User.top_seller(params[:days]).with_attached_attachment
    @top_buyers = User.top_buyer(params[:days]).with_attached_attachment
  end

  def search
    @users = User.search("*#{build_elastic_search_str(params[:query])}*").records
    params[:page_no] ||= 1
    filter_query = ""
    session[:category] = [] if session[:category] .nil?

      for category in session[:category]
        if session[:category].find_index(category) == 0
          filter_query = filter_query + "category like '%#{category}%'"
        else
          filter_query = filter_query + " OR category like '%#{category}%'"
        end
      end
    
      
    @collections = params[:query].present? ? Collection.search("*#{build_elastic_search_str(params[:query].strip)}*").records.on_sale : Collection.on_sale
    @collections = @collections.where("category like ?", "%#{params[:category]}%") if params[:category].present?
    @collections = @collections.on_sale.with_attached_attachment.paginate(page: params[:page_no] || 1)
    @collections= @collections.where(filter_query)
    @collections = @collections.reorder(likes_count: 'desc')
    #@artists =  User.joins(:created_collections).with_attached_attachment.group('collections.creator_id').order('name DESC') 
    @artists =  User.joins(:created_collections).with_attached_attachment.group('collections.creator_id').order('COUNT(collections.creator_id) DESC')
    @own_contract = NftContract.where.not(owner_id: nil)

  end

  def filter_by
    filter_query = ""
    params[:category] = [] if params[:category].nil?
    session[:category]  =params[:category]
    
    render json: {filter_data: "success"}
  end   
   
  def notifications
    Notification.unread(current_user).update_all(is_read: true) if Notification.unread(current_user).present?
    @notifications = current_user.notifications
  end

  def contract_abi
    shared = ActiveModel::Type::Boolean.new.cast(params[:shared])
    abi = if params[:contract_address].present? && params[:type] == 'erc20'
            Utils::Abi.weth
          # elsif params[:contract_address].present? && (params[:type] == 'erc20')
            # { abi: Api::Etherscan.new.contract_abi(params[:contract_address]), bytecode: '' }
          elsif params[:contract_address].present? && (params[:type] == 'trade')
            Utils::Abi.trade
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
