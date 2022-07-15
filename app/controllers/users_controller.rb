class UsersController < ApplicationController
  before_action :authenticate_user, except: [:show, :followers_list, :following_list, :show_tabs]
  before_action :set_user, only: [:show, :follow, :unfollow, :like, :unlike, :report,]
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
    @tab = "about"
    @data = @user.get_collections("listings", params[:filters], @page_no, @user.address)
    @followers_count = @user.followers.count
    @followees_count = @user.followees.count
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
    render json: {status: "success", following_count:  @user.followees.count, followers_count: @user.followers.count}
  end

  def unfollow
    follow = Follow.where({follower_id: current_user.id, followee_id: @user.id}).first
    follow.destroy if follow.present?
    render json: {status: "success", following_count:  @user.followees.count, followers_count: @user.followers.count}
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


  def show_tabs
    params[:page_no] ||= 1
    @user = User.find_by(address: params[:id].strip!)
    @page_no = params[:page_no]
    @tab = params[:tab]
    @data = @user.get_collections(@tab, params[:filters], @page_no, @user.address)
    @followers_count = @user.followers.count
    @followees_count = @user.followees.count
  end

  private

  def user_params
    params.require(:user).permit(:name, :bio, :attachment, :twitter_link, :personal_url, :banner, :youtube_link, :facebook_link)
  end

  def set_user
    @user = User.find_by(address: params[:id])
    redirect_to root_path unless @user.present?
  end
end
