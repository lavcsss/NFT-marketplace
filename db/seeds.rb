# Admin User
CHAIN_ID = Rails.env.development? ? 4 : 1
AdminUser.find_or_create_by(email: "admin@crosstowernft.com")
  .update(password: "4a1ec2de-3513-4d19-8077-767c4a6c5129", first_name: "Admin", last_name: "User", password_confirmation: "4a1ec2de-3513-4d19-8077-767c4a6c5129")

Fee.find_or_create_by(fee_type: 'buyer').update(name: 'Service Charge', percentage: '2.5')
Fee.find_or_create_by(fee_type: 'seller').update(name: 'Service Charge', percentage: '2.5')


["Art", "Animation", "Games", "Music", "Videos", "Memes", "Metaverses"].each { |c| Category.find_or_create_by(name: c) }

#Creating ERC20 Token List
Erc20Token.find_or_create_by(chain_id: CHAIN_ID, symbol: 'WETH')
  .update(address: '0xc778417E063141139Fce010982780140Aa0cD5Ab', name: 'Wrapped Ether', decimals: 18)

### CREATING SHARED NFT CONTRACT ADDRESSES
NftContract.find_or_create_by(contract_type: 'nft721', symbol: 'Shared')
  .update(name: 'NFT', address: '0xea00f782e1Bd1BBA2b809F20D5d8503181b2e796')
NftContract.find_or_create_by(contract_type: 'nft1155', symbol: 'Shared')
  .update(name: 'NFT', address: '0x769e095A8efdE9bfb4714490975e3959E121636e')

  # SEEDING CELEBRITY USER DATA
  celebrity_data = JSON.parse(File.read('app/assets/static/celebrity.json'))
  celebrity_data.each do |item|
    Celebrity.find_or_create_by(title: item["title"]).update(asset: item["asset"],
       description: item["description"], redirect_link: item["redirect_link"])
  end