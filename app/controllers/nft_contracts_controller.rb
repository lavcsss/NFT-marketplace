class NftContractsController < ApplicationController
  skip_before_action :authenticate_user
  skip_before_action :is_approved
  skip_before_action :verify_authenticity_token


  def show
    params[:page_no] ||= 1
    @contract = NftContract.where.not(symbol:"Shared").where(address: params[:id]).first
    unless @contract.present?
      redirect_path = request.referer.present? ? request.referer : root_path
      redirect_to redirect_path, alert: 'Invalid contract address!' and return  
    end
    @tokens = @contract.collections.order(:created_at).reverse_order.paginate(page: params[:page_no] || 1, per_page: 15)
  end

  def collections_list
    @contract = NftContract.where(address: params[:id]).first
    @tokens = @contract.collections.order(:created_at).reverse_order.paginate(page: params[:page_no], per_page: 15)
  end
  
end