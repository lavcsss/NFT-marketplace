class Erc20Token < ApplicationRecord

  def self.select_options(collection=nil)
    #all.map { |token| [token.symbol.upcase, token.id, {address: token.address, decimals: token.decimals}] }
    if collection.nil?
      all
    else
      all.where(id=collection.erc20_token_id) unless collection.erc20_token_id.nil?
    end
  end

  def currency_symbol
    symbol.upcase
  end

end
