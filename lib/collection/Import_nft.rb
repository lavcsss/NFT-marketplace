class Collection
  module ImportNft
    def update_imported_nft
      response = verify_collection
      return 'No response' if response.blank?

      save_imported_information(response)
    end

    def save_imported_information(response)
      if collection_type == 'single' && owner.address.downcase != response.downcase
        import721 response
      elsif collection_type == 'multiple'
        import1155 response
      end
    end

    private

    def import721(address)
      user = User.find_by_address(address.downcase)
      self.state = :import_invalid
      self.put_on_sale = false
      self.instant_sale_price = nil
      self.instant_sale_enabled = false
      self.owner = user.present? ? user : owner
      self.save!
    end

    def import1155(tokens)
      if tokens.blank?
        self.state = :import_invalid
        self.owned_tokens = 0
        self.put_on_sale = false
        self.instant_sale_price = nil
        self.instant_sale_enabled = false
      else
        self.owned_tokens = tokens
      end

      self.save!
    end

    def verify_collection
      Utils::Web3.new.check_ownership(
        collection_type,
        nft_contract.address,
        owner.address,
        token
      )
    end
  end
end
