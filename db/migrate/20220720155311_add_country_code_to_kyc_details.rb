class AddCountryCodeToKycDetails < ActiveRecord::Migration[6.1]
  def change
    add_column :kyc_details, :country_code, :string
  end
end
