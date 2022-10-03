module Utils
  class Abi
    def self.nft721
      {
        abi: [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"tokenURIPrefix","type":"string"},{"internalType":"address","name":"operator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"}],"name":"tokenBaseURI","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"createCollectible","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getCreator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mintAndTransfer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"royaltyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],
        abi_factory: [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"contractAddress","type":"address"}],"name":"Deployed","type":"event"},{"inputs":[{"internalType":"bytes32","name":"_salt","type":"bytes32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"tokenURIPrefix","type":"string"},{"internalType":"address","name":"operator","type":"address"}],"name":"deploy","outputs":[{"internalType":"address","name":"addr","type":"address"}],"stateMutability":"nonpayable","type":"function"}],
        bytecode: ''
      }
    end

    def self.nft1155
      {
        abi: [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"tokenURIPrefix","type":"string"},{"internalType":"address","name":"operator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"}],"name":"tokenBaseURI","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_royaltyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"supply","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"burnBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getCreator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"uri","type":"string"},{"internalType":"uint256","name":"supply","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"_supply","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"},{"internalType":"uint256","name":"qty","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mintAndTransfer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"royaltyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenURIPrefix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],
        abi_factory: [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"contractAddress","type":"address"}],"name":"Deployed","type":"event"},{"inputs":[{"internalType":"bytes32","name":"_salt","type":"bytes32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"tokenURIPrefix","type":"string"},{"internalType":"address","name":"operator","type":"address"}],"name":"deploy","outputs":[{"internalType":"address","name":"addr","type":"address"}],"stateMutability":"nonpayable","type":"function"}],
        bytecode: ''
      }
    end

    def self.shared_nft721
      {
        abi: [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"_transferProxy","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"}],"name":"tokenBaseURI","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"uint256","name":"fee","type":"uint256"},{"components":[{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint256","name":"nonce","type":"uint256"}],"internalType":"struct CrossTowerNFT721V2.Sign","name":"sign","type":"tuple"}],"name":"createCollectible","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getCreator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mintAndTransfer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"royaltyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
        bytecode: ''
       }
    end

    def self.shared_nft1155
      {
        abi: [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"_transferProxy","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"}],"name":"tokenBaseURI","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"supply","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"burnBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getCreator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"uri","type":"string"},{"internalType":"uint256","name":"supply","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"components":[{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint256","name":"nonce","type":"uint256"}],"internalType":"struct CrossTowerNFT1155V2.Sign","name":"sign","type":"tuple"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"_supply","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"},{"internalType":"uint256","name":"qty","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mintAndTransfer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"royaltyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenURIPrefix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
        bytecode:''
       }
    end

    def self.weth
      {
        abi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}],
        bytecode: ''
      }
    end

    def self.trade
      {
        abi: [
          {
            "inputs": [
              {
                "internalType": "uint8",
                "name": "_buyerFee",
                "type": "uint8"
              },
              {
                "internalType": "uint8",
                "name": "_sellerFee",
                "type": "uint8"
              },
              {
                "internalType": "contract TransferProxy",
                "name": "_transferProxy",
                "type": "address"
              },
              {
                "internalType": "contract TransferProxy",
                "name": "_deprecatedProxy",
                "type": "address"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "assetOwner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
              }
            ],
            "name": "BuyAndTransferAsset",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "assetOwner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
              }
            ],
            "name": "BuyAsset",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint8",
                "name": "buyerFee",
                "type": "uint8"
              }
            ],
            "name": "BuyerFee",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "assetOwner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
              }
            ],
            "name": "ExecuteBid",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint8",
                "name": "sellerFee",
                "type": "uint8"
              }
            ],
            "name": "SellerFee",
            "type": "event"
          },
          {
            "inputs": [],
            "name": "DeprecatedProxy",
            "outputs": [
              {
                "internalType": "contract TransferProxy",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Trade.BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Trade.Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "_import",
                "type": "bool"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "ownerSign",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "sign",
                "type": "tuple"
              }
            ],
            "name": "buyAndTransferAsset",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Trade.BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Trade.Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "_import",
                "type": "bool"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "ownerSign",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "sign",
                "type": "tuple"
              }
            ],
            "name": "buyAndTransferAssetWithEth",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Trade.BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Trade.Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "_import",
                "type": "bool"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "sign",
                "type": "tuple"
              }
            ],
            "name": "buyAsset",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Trade.BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Trade.Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "_import",
                "type": "bool"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "sign",
                "type": "tuple"
              }
            ],
            "name": "buyAssetWithEth",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "buyerServiceFee",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Trade.BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Trade.Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "_import",
                "type": "bool"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "sign",
                "type": "tuple"
              }
            ],
            "name": "executeBid",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Trade.BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Trade.Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "ownerSign",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "sign",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "isShared",
                "type": "bool"
              }
            ],
            "name": "mintAndBuyAsset",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Trade.BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Trade.Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "ownerSign",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "sign",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "isShared",
                "type": "bool"
              }
            ],
            "name": "mintAndBuyAssetWithEth",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Trade.BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Trade.Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "ownerSign",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "sign",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "isShared",
                "type": "bool"
              }
            ],
            "name": "mintAndExecuteBid",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Trade.BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Trade.Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "ownerSign",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "sign",
                "type": "tuple"
              }
            ],
            "name": "mintAndTransferAsset",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum Trade.BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Trade.Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "ownerSign",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Trade.Sign",
                "name": "sign",
                "type": "tuple"
              }
            ],
            "name": "mintAndTransferAssetWithEth",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "sellerServiceFee",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint8",
                "name": "_buyerFee",
                "type": "uint8"
              }
            ],
            "name": "setBuyerServiceFee",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint8",
                "name": "_sellerFee",
                "type": "uint8"
              }
            ],
            "name": "setSellerServiceFee",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "transferOwnership",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "transferProxy",
            "outputs": [
              {
                "internalType": "contract TransferProxy",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ],
        bytecode: ''
      }
    end

    def self.trade_proxy
      {
        abi: [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_trade",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_transferProxy",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_depreciatedTransferProxy",
                "type": "address"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Sign",
                "name": "ownerSign",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "_import",
                "type": "bool"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Sign",
                "name": "sign",
                "type": "tuple"
              }
            ],
            "name": "_buyAndTransferAsset",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "erc20Address",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "enum BuyingAssetType",
                    "name": "nftType",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint256",
                    "name": "unitPrice",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "supply",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "qty",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "isDeprecatedProxy",
                    "type": "bool"
                  },
                  {
                    "internalType": "bool",
                    "name": "isErc20Payment",
                    "type": "bool"
                  }
                ],
                "internalType": "struct Order",
                "name": "order",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Sign",
                "name": "ownerSign",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Sign",
                "name": "sign",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "isShared",
                "type": "bool"
              }
            ],
            "name": "_mintAndTransferAsset",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "erc20",
                "type": "address"
              }
            ],
            "name": "checkBalance",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
              }
            ],
            "name": "depositErc20",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "depreciatedTransferProxy",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "trade",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "tradeOperator",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "transferOwnership",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "transferProxy",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_trade",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_transferProxy",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_depreciatedTransferProxy",
                "type": "address"
              }
            ],
            "name": "updateOperators",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "newOperator",
                "type": "address"
              }
            ],
            "name": "updateTradeOperator",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
              }
            ],
            "name": "withdrawErc20",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "withdrawEth",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "stateMutability": "payable",
            "type": "receive"
          }
        ],
        bytecode: ''
      }
    end
  end
end