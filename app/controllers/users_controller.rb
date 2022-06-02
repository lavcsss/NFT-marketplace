class UsersController < ApplicationController
  before_action :authenticate_user, except: [:show]
  before_action :set_user, only: [:show, :follow, :unfollow, :like, :unlike, :report, :load_tabs]
  skip_before_action :is_approved
  skip_before_action :verify_authenticity_token, only: [:report]

  def my_items
    @user = current_user
    build_data
    render "show"
  end

  def show
    build_data
  end

  def build_data
    @reportees = @user.reports.pluck(:created_by_id)
    @page_no = params[:page_no] || 1
    @tab = params[:tab]
    @data = @user.get_collections(@tab, params[:filters], @page_no, @user.address)
    @followers_count = @user.followers.count
    @followees_count = @user.followees.count
    @liked = @user.likes
    @on_sale_collections = @user.on_sale_collections
    @created_collections = @user.created_collections
    @collectibles = @user.collectibles
    @my_collections = @user.my_collections
    @activity = @user.activity
    @following = @user._following
    @followers = @user._followers
  end

  def edit
  end

  def update
    current_user.assign_attributes(user_params)
    if current_user.valid?
      current_user.save
    else
      @error = [current_user.errors.full_messages].compact
    end
  end

  def follow
    Follow.find_or_create_by({follower_id: current_user.id, followee_id: @user.id})
    redirect_to user_path(@user.address), notice: 'Following successful'
  end

  def unfollow
    follow = Follow.where({follower_id: current_user.id, followee_id: @user.id}).first
    follow.destroy if follow.present?
    redirect_to user_path(@user.address), notice: 'Unfollowed successful'
  end

  def like
    render json: {success: @user.like_collection(params)}
  end

  def unlike
    render json: {success:  @user.unlike_collection(params)}
  end

  def report
    reportees = @user.reports.pluck(:created_by_id)
    unless reportees.include?(current_user.id)
      @user.reports.create({message: params[:message], created_by: current_user})
    end
    # redirect_to user_path(@user.address)
    render json: {message: "User reported successfully"}
  end

  def following
  end

  def create_contract
    @nft_contract = current_user.nft_contracts.create(name: params[:name], symbol: params[:symbol], address: params[:contract_address], contract_type: params[:contract_type], description: params[:description])
    @nft_contract.attachment.attach(params[:file]) if params[:file].present?
    @nft_contract.cover.attach(params[:cover]) if params[:cover].present?
    collection = current_user.collections.unscoped.where(address: params[:collection_id]).first
    collection.update_attribute('nft_contract_id', @nft_contract.id) if collection
  end

  def load_tabs
    @page_no = params[:page_no] || 1
    @tab = params[:tab]
    @data = @user.get_collections(@tab, params[:filters], @page_no, current_user.address)
    @followers_count = @user.followers.count
    @followees_count = @user.followees.count
    @liked = @user.likes
  end

  private

  def user_params
    params.require(:user).permit(:name, :bio, :attachment, :twitter_link, :personal_url, :banner)
  end

  def set_user
    @user = User.find_by(address: params[:id])
    redirect_to root_path unless @user.present?
  end
end
