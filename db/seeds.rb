# Admin User
CHAIN_ID = Rails.env.development? ? 4 : 1
AdminUser.find_or_create_by(email: "admin@crosstowernft.com")
  .update(password: "4a1ec2de-3513-4d19-8077-767c4a6c5129", first_name: "Admin", last_name: "User", password_confirmation: "4a1ec2de-3513-4d19-8077-767c4a6c5129")

Fee.find_or_create_by(fee_type: 'buyer').update(name: 'Service Charge', percentage: '2.5')
Fee.find_or_create_by(fee_type: 'seller').update(name: 'Service Charge', percentage: '2.5')


["Art", "Animation", "Games", "Music", "Videos", "Memes", "Metaverses"].each { |c| Category.find_or_create_by(name: c) }

#Creating ERC20 Token List
Erc20Token.find_or_create_by(chain_id: CHAIN_ID, symbol: 'WETH')
  .update(address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', name: 'Wrapped Ether', decimals: 18)

### CREATING SHARED NFT CONTRACT ADDRESSES
NftContract.find_or_create_by(contract_type: 'nft721', symbol: 'Shared')
  .update(name: 'NFT', address: '0x2c3A85e3A5077DC320C8aD535fD9246A74f89643')
NftContract.find_or_create_by(contract_type: 'nft1155', symbol: 'Shared')
  .update(name: 'NFT', address: '0x3B5034A11716acd1b2119F9B626CF0B80d3b769E')

  # SEEDING CELEBRITY USER DATA
  celebrity_data = JSON.parse(File.read('app/assets/static/celebrity.json'))
  celebrity_data.each do |item|
    Celebrity.find_or_create_by(title: item["title"]).update(asset: item["asset"],
       description: item["description"], redirect_link: item["redirect_link"])
  end
