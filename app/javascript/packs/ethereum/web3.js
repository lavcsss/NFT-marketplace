import Web3 from 'web3';
import axios from "axios";

const tokenURIPrefix = gon.tokenURIPrefix
const transferProxyContractAddress = gon.transferProxyContractAddress
const wethAddress = gon.wethAddress
const tradeContractAddress = gon.tradeContractAddress

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    await ethereum.request({method: 'eth_accounts'})
  }
}

async function createUserSession(address, balance, destroySession) {
  const config = {
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  const resp = await axios.post(`/sessions`, {
    address: address,
    balance: balance,
    destroy_session: destroySession
  }, config)
    .then((response) => {
      return resp
    })
    .catch(err => {
    })
  return resp;
}

async function destroyUserSession(address) {
  const config = {
    data: {},
    headers: {
      'X-CSRF-TOKEN': $('[name="csrf-token"]')[0].content,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  const resp = axios.delete(`/sessions/${address}`, config)
    .then(response => response)
    .catch(err => {})
  return resp
}

function updateTokenId(tokenId, collectionId, txId) {
  var request = $.ajax({
    url: `/collections/${collectionId}/update_token_id`,
    async: false,
    type: "POST",
    data: {tokenId : tokenId, collectionId: collectionId, tx_id: txId},
    dataType: "script"
  });
  request.done(function (msg) {
  });
  request.fail(function (jqXHR, textStatus) {
  });
}

function saveContractNonceValue(collectionId, sign) {
  var request = $.ajax({
    url: `/collections/${collectionId}/save_contract_nonce_value`,
    async: false,
    type: "POST",
    data: {signature : sign},
    dataType: "script"
  });
  request.done(function (msg) {
  });
  request.fail(function (jqXHR, textStatus) {
  });
}


function createContract(formData) {
  var request = $.ajax({
    url: '/users/create_contract',
    async: false,
    type: "POST",
    data: formData,
    dataType: "script",
    processData: false,
    contentType: false,
    cache: false,
  });
  request.done(function (msg) {
  });
  request.fail(function (jqXHR, textStatus) {
  });
}

function updateCollectionBuy(collectionId, quantity, transactionHash) {
  var request = $.ajax({
    url: '/collections/' + collectionId + '/buy',
    type: 'POST',
    async: false,
    data: {quantity: quantity, transaction_hash: transactionHash},
    dataType: "script",
    success: function (respVal) {
    }
  });
}

function updateCollectionSell(collectionId, buyerAddress, bidId, transactionHash) {
  var request = $.ajax({
    url: '/collections/' + collectionId + '/sell',
    type: 'POST',
    async: false,
    data: {address: buyerAddress, bid_id: bidId, transaction_hash: transactionHash},
    dataType: "script",
    success: function (respVal) {
    }
  });
}

function updateOwnerTransfer(collectionId, recipientAddress, transactionHash, transferQuantity) {
  var request = $.ajax({
    url: '/collections/' + collectionId + '/owner_transfer',
    type: 'POST',
    async: false,
    data: {recipient_address: recipientAddress, transaction_hash: transactionHash, transaction_quantity: transferQuantity},
    dataType: "script",
    success: function (respVal) {
    }
  });
}

function updateBurn(collectionId, transactionHash, burnQuantity) {
  var request = $.ajax({
    url: '/collections/' + collectionId + '/burn',
    type: 'POST',
    async: false,
    data: {transaction_hash: transactionHash, transaction_quantity: burnQuantity},
    dataType: "script",
    success: function (respVal) {
    }
  });
}

async function isValidUser(address, token) {
  const config = {
    headers: {
      'X-CSRF-TOKEN': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  const resp = await axios.get(`/sessions/valid_user`, {params: {address: address, authenticity_token: token}}, config)
    .then((response) => {
      return response.data
    })
    .catch(err => {
    })
  return resp;
}

function placeBid(collectionId, sign, quantity, bidDetails) {
  var request = $.ajax({
    url: `/collections/${collectionId}/bid`,
    type: "POST",
    async: false,
    data: {sign: sign, quantity: quantity, details: bidDetails},
    dataType: "script"
  });
  request.done(function (msg) {
  });
  request.fail(function (jqXHR, textStatus) {
  });
}

function signMetadataHash(collectionId, contractAddress) {
  var sign;
  var request = $.ajax({
    url: `/collections/${collectionId}/sign_metadata_hash`,
    type: "POST",
    async: false,
    data: {contract_address: contractAddress},
    dataType: "json"
  });
  request.done(function (msg) {
    sign = {sign: msg['signature'], nonce: msg['nonce']}
  });
  request.fail(function (jqXHR, textStatus) {
  });
  return sign
}

function updateSignature(collectionId, sign) {
  var request = $.ajax({
    url: `/collections/${collectionId}/sign_fixed_price`,
    type: "POST",
    async: false,
    data: {sign: sign},
    dataType: "script"
  });
  request.done(function (msg) {  });
  request.fail(function (jqXHR, textStatus) {
  });
}

function getNonceValue(collectionId) {
  var nonce;
  var request = $.ajax({
    url: `/collections/${collectionId}/get_nonce_value`,
    type: "POST",
    async: false,
    data: {},
    dataType: "json"
  });
  request.done(function (data) {
    nonce = data['nonce']
  });
  request.fail(function (jqXHR, textStatus) {
  });
  return nonce
}

function save_NonceValue(collectionId, sign, nonce) {
  var request = $.ajax({
    url: `/collections/${collectionId}/save_nonce_value`,
    type: "POST",
    async: false,
    data: {sign: sign, nonce: nonce},
    dataType: "script"
  });
  request.done(function (msg) {
  });
  request.fail(function (jqXHR, textStatus) {
  });
}

function getContractSignNonce(collectionId, sign) {
  var nonce;
  var request = $.ajax({
    url: `/collections/${collectionId}/get_contract_sign_nonce`,
    type: "POST",
    async: false,
    data: {sign: sign},
    dataType: "json"
  });
  request.done(function (data) {
    nonce = data['nonce']
  });
  request.fail(function (jqXHR, textStatus) {
  });
  return nonce
}

window.getContractABIAndBytecode = function getContractABIAndBytecode(contractAddress, type, shared = true) {
  var res;
  var request = $.ajax({
    async: false,
    url: '/contract_abi',
    type: "GET",
    data: {contract_address: contractAddress, type: type, shared: shared},
    dataType: "json"
  });

  request.done(function (msg) {
    res = msg;
  });

  request.fail(function (jqXHR, textStatus) {
  });
  return res;
}

function splitSign(sign, nonce) {
  sign = sign.slice(2)
  var r = `0x${sign.slice(0, 64)}`
  var s = `0x${sign.slice(64, 128)}`
  var v = web3.utils.toDecimal(`0x${sign.slice(128, 130)}`)
  return [v, r, s, nonce]
}


async function load721Contract(contractAddress) {
  return await new window.web3.eth.Contract([ { "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "tokenURI", "type": "string" }, { "internalType": "uint256", "name": "fee", "type": "uint256" } ], "name": "createCollectible", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getFee", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getOwner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "baseURI_", "type": "string" } ], "name": "setBaseURI", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "tokenByIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenCounter", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "tokenOfOwnerByIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ], contractAddress);
}

async function load1155Contract(contractAddress){
  return await new window.web3.eth.Contract([ { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "string", "name": "uri", "type": "string" } ], "name": "_setTokenURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_tokenURIPrefix", "type": "string" } ], "name": "_setTokenURIPrefix", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "inputs": [ { "internalType": "string", "name": "uri", "type": "string" }, { "internalType": "uint256", "name": "supply", "type": "uint256" }, { "internalType": "uint256", "name": "fee", "type": "uint256" } ], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" } ], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "URI", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" } ], "name": "balanceOfBatch", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "creators", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getFee", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getOwner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "royalties", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenURIPrefix", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" } ], contractAddress);
}

async function loadTransferProxyContract() {
  return await new window.web3.eth.Contract([{"inputs":[{"internalType":"contract IERC1155","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"erc1155safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"erc20safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC721","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"erc721safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}], "0xa08a50477D051a9f380b9E7F62a62707750B61c0");
}

window.getContract = async function getContract(contractAddress, type, shared = true) {
  var res = getContractABIAndBytecode(contractAddress, type, shared);
  var contractObj = await new window.web3.eth.Contract(res['compiled_contract_details']['abi'], contractAddress);
  return contractObj
}

window.createCollectible721 = async function createCollectible721(contractAddress, tokenURI, royaltyFee, collectionId, sharedCollection) {
  try {
    var account = window.ethereum.selectedAddress
    window.contract721 = await getContract(contractAddress, 'nft721', sharedCollection);
    var gasPrices = await gasPrice();
    if (sharedCollection) {
      var sign = await signMetadataHash(collectionId, contractAddress);
      await saveContractNonceValue(collectionId, sign)
      var signStruct = splitSign(sign['sign'], sign['nonce']);
      var txn = await window.contract721.methods.createCollectible(tokenURI, royaltyFee, signStruct).send({
        from: account,
        gas: 516883,
        gasPrice: String(gasPrices)
      });
    } else {
      var txn = await window.contract721.methods.createCollectible(tokenURI, royaltyFee).send({
        from: account,
        gas: 516883,
        gasPrice: String(gasPrices)
      });
    }
    var tokenId = txn.events.Transfer.returnValues['tokenId'];
    await updateTokenId(tokenId, collectionId, txn.transactionHash)
    return window.collectionMintSuccess(collectionId)
  } catch (err) {
    console.error(err);
    return window.collectionMintFailed(err['message'])
  }
}

window.createCollectible1155 = async function createCollectible1155(contractAddress, supply, tokenURI, royaltyFee, collectionId, sharedCollection) {
  try {
    var account = window.ethereum.selectedAddress
    window.contract1155 = await getContract(contractAddress, 'nft1155', sharedCollection);
    var gasPrices = await gasPrice();
    if (sharedCollection) {
      var sign = await signMetadataHash(collectionId, contractAddress);
      await saveContractNonceValue(collectionId, sign)
      var signStruct = splitSign(sign['sign'], sign['nonce']);
      var txn = await window.contract1155.methods.mint(tokenURI, supply, royaltyFee, signStruct).send({
        from: account,
        gas: 516883,
        gasPrice: String(gasPrices)
      });
    } else {
      var txn = await window.contract1155.methods.mint(tokenURI, supply, royaltyFee).send({
        from: account,
        gas: 516883,
        gasPrice: String(gasPrices)
      });
    }
    var tokenId = txn.events.TransferSingle.returnValues['id'];
    await updateTokenId(tokenId, collectionId, txn.transactionHash)
    return window.collectionMintSuccess(collectionId)
  } catch (err) {
    console.error(err);
    return window.collectionMintFailed(err['message'])
  }
}

window.deployContract = async function deployContract(abi, bytecode, name, symbol, contractType, collectionId, attachment, description, cover) {
  const contractDeploy = new window.web3.eth.Contract(abi);
  var contractAddress;
  var account = getCurrentAccount()
  contractDeploy.deploy({
    data: bytecode,
    arguments: [name, symbol, tokenURIPrefix]
  }).send({
    from: account,
  }).then((deployment) => {
    contractAddress = deployment.options.address;
    $('#nft_contract_address').val(contractAddress);
    let formData = new FormData()
    formData.append('file', attachment)
    formData.append('name', name)
    formData.append('symbol', symbol)
    formData.append('contract_address', contractAddress)
    formData.append('contract_type', contractType)
    formData.append('collection_id', collectionId)
    formData.append('description', description)
    formData.append('cover', cover)
    createContract(formData);
    window.contractDeploySuccess(contractAddress, contractType)
  }).catch((err) => {
    console.error(err);
    window.contractDeployFailed(err['message'])
  });
}

window.approveNFT = async function approveNFT(contractType, contractAddress, sharedCollection, sendBackTo = 'collection') {
  try {
    var account = window.ethereum.selectedAddress
    window.contract = await getContract(contractAddress, contractType, sharedCollection);
    var isApproved = await window.contract.methods.isApprovedForAll(account, transferProxyContractAddress).call();
    if (!isApproved) {
      var receipt = await window.contract.methods.setApprovalForAll(transferProxyContractAddress, true).send({from: account});
    }
    if (sendBackTo == 'executeBid') {
      return window.approveBidSuccess()
    } else {
      return window.collectionApproveSuccess(contractType);
    }
  } catch (err) {
    console.error(err);
    if (sendBackTo == 'executeBid') {
      return window.approveBidFailed(err['message'])
    } else {
      return window.collectionApproveFailed(err['message'])
    }
  }
}

window.approveResaleNFT = async function approveResaleNFT(contractType, contractAddress, sharedCollection) {
  try {
    var account = window.ethereum.selectedAddress
    window.contract = await getContract(contractAddress, contractType, sharedCollection);
    var isApproved = await window.contract.methods.isApprovedForAll(account, transferProxyContractAddress).call();
    if (!isApproved) {
      var receipt = await window.contract.methods.setApprovalForAll(transferProxyContractAddress, true).send({from: account});
    }
    return window.approveResaleSuccess(contractType);
  } catch (err) {
    console.error(err);
    return window.approveResaleFailed(err['message'])
  }
}

//TODO: OPTIMIZE
window.isApprovedNFT = async function isApprovedNFT(contractType, contractAddress) {
  try {
    var contract = await getContract(contractAddress, contractType);
    var account = window.ethereum.selectedAddress
    var isApproved = await contract.methods.isApprovedForAll(account, transferProxyContractAddress).call();
    return isApproved;
  } catch (err) {
    console.error(err);
  }
}

window.burnNFT = async function burnNFT(contractType, contractAddress, tokenId, supply = 1, collectionId, sharedCollection) {
  try {
    var contract = await getContract(contractAddress, contractType, sharedCollection);
    var account = window.ethereum.selectedAddress
    if (contractType == 'nft721') {
      var receipt = await contract.methods.burn(tokenId).send({from: account});
    } else if (contractType == 'nft1155') {
      var receipt = await contract.methods.burn(tokenId, supply).send({from: account});
    }
    await updateBurn(collectionId, receipt.transactionHash, supply)
    return window.burnSuccess(receipt.transactionHash);
  } catch (err) {
    console.error(err);
    return window.burnFailed(err['message'])
  }
}

window.directTransferNFT = async function directTransferNFT(contractType, contractAddress, recipientAddress, tokenId, supply = 1, shared, collectionId) {
  try {
    var contract = await getContract(contractAddress, contractType, shared);
    var account = window.ethereum.selectedAddress
    if (contractType == 'nft721') {
      var receipt = await contract.methods.safeTransferFrom(account, recipientAddress, tokenId).send({from: account});
    } else if (contractType == 'nft1155') {
      // TODO: Analyse and use proper one in future
      var tempData = "0x6d6168616d000000000000000000000000000000000000000000000000000000"
      var receipt = await contract.methods.safeTransferFrom(account, recipientAddress, tokenId, supply, tempData).send({from: account});
    }
    await updateOwnerTransfer(collectionId, recipientAddress, receipt.transactionHash, supply)
    return window.directTransferSuccess(receipt.transactionHash, collectionId);
  } catch (err) {
    console.error(err);
    return window.directTransferFailed(err['message']);
  }
}

window.approveERC20 = async function approveERC20(contractAddress, contractType, amount, decimals = 18, sendBackTo = 'Bid') {
  try {
    amount = roundNumber(mulBy(amount, 10 ** decimals), 0);
    var compiledContractDetails = getContractABIAndBytecode(contractAddress, contractType, gon.collection_data['contract_shared']);
    var abi = compiledContractDetails['compiled_contract_details']['abi'];
    var contract = await new window.web3.eth.Contract(abi, contractAddress);
    var account = window.ethereum.selectedAddress
    const balance = await contract.methods.allowance(account, transferProxyContractAddress).call();
    amount = BigInt(parseInt(balance) + parseInt(amount)).toString()
    var receipt = await contract.methods.approve(transferProxyContractAddress, amount).send({from: account});
    if (sendBackTo == 'Buy') {
      return window.buyApproveSuccess(receipt.transactionHash, contractAddress)
    } else {
      return window.bidApproveSuccess(receipt.transactionHash, contractAddress)
    }
  } catch (err) {
    console.error(err);
    if (sendBackTo == 'Buy') {
      return window.buyApproveFailed(err['message'])
    } else {
      return window.bidApproveFailed(err['message'])
    }
  }
}

window.approvedTokenBalance = async function approvedTokenBalance(contractAddress) {
  var contract = await getContract(contractAddress, 'erc20', false);
  var account = window.ethereum.selectedAddress
  var balance = await contract.methods.allowance(account, transferProxyContractAddress).call();
  return balance;
}

window.convertWETH = async function convertWETH(amount, sendBackTo = 'Bid', decimals = 18) {
  try {
    amount = roundNumber(mulBy(amount, 10 ** decimals), 0);
    var compiledContractDetails = getContractABIAndBytecode(wethAddress, 'erc20');
    var abi = compiledContractDetails['compiled_contract_details']['abi'];
    var contract = await new window.web3.eth.Contract(abi, wethAddress);
    var account = window.ethereum.selectedAddress
    var receipt = await contract.methods.deposit().send({from: account, value: amount});
    if (sendBackTo == 'Buy') {
      return window.buyConvertSuccess(receipt.transactionHash)
    } else {
      return window.bidConvertSuccess(receipt.transactionHash)
    }
  } catch (err) {
    console.error(err);
    if (sendBackTo == 'Buy') {
      return window.bidConvertFailed(err['message'])
    } else {
      return window.bidConvertFailed(err['message'])
    }

  }
}

window.updateBuyerServiceFee = async function updateBuyerServiceFee(buyerFeePermille) {
  try {
    var compiledContractDetails = getContractABIAndBytecode(tradeContractAddress, 'trade');
    var abi = compiledContractDetails['compiled_contract_details']['abi'];
    var contract = await new window.web3.eth.Contract(abi, tradeContractAddress);
    var account = window.ethereum.selectedAddress
    var receipt = await contract.methods.setBuyerServiceFee(buyerFeePermille).send({from: account});
    return window.bidConvertSuccess(receipt.transactionHash)
  } catch (err) {
    console.error(err);
    return window.bidConvertFailed(err['message'])
  }
}

window.updateSellerServiceFee = async function updateSellerServiceFee(sellerFeePermille) {
  try {
    var compiledContractDetails = getContractABIAndBytecode(tradeContractAddress, 'trade');
    var abi = compiledContractDetails['compiled_contract_details']['abi'];
    var contract = await new window.web3.eth.Contract(abi, tradeContractAddress);
    var account = window.ethereum.selectedAddress
    var receipt = await contract.methods.setSellerServiceFee(sellerFeePermille).send({from: account});
    return window.bidConvertSuccess(receipt.transactionHash)
  } catch (err) {
    console.error(err);
    return window.bidConvertFailed(err['message'])
  }
}

window.bidAsset = async function bidAsset(assetAddress, tokenId, qty = 1, amount, payingTokenAddress, decimals = 18, collectionId, bidPayAmt) {
  try {
    var amountInDec = roundNumber(mulBy(amount, 10 ** decimals), 0);
    var nonce_value = await getNonceValue(collectionId);
    var messageHash = window.web3.utils.soliditySha3(assetAddress, tokenId, payingTokenAddress, amountInDec, qty, nonce_value);
    var account = window.ethereum.selectedAddress
    const signature = await window.web3.eth.personal.sign(messageHash, account);
    await placeBid(collectionId, signature, qty, {
      asset_address: assetAddress,
      token_id: tokenId,
      quantity: qty,
      amount: bidPayAmt,
      amount_with_fee: amount,
      payment_token_address: payingTokenAddress,
      payment_token_decimals: decimals
    })
    await save_NonceValue(collectionId, signature, nonce_value) 
    return window.bidSignSuccess(collectionId)
  } catch (err) {
    console.error(err);
    return window.bidSignFailed(err['message'])
  }
}

window.signMessage = async function signMessage(msg) {
  try {
    var account = window.ethereum.selectedAddress
    var sign = await window.web3.eth.personal.sign(msg, account);
    return sign;
  } catch (err) {
    return ""
  }
}

window.signSellOrder = async function signSellOrder(amount, decimals, paymentAssetAddress, tokenId, assetAddress, collectionId, sendBackTo='') {
  try {
    amount = roundNumber(mulBy(amount, 10 ** decimals), 0);
    var nonce_value = await getNonceValue(collectionId);
    var messageHash = window.web3.utils.soliditySha3(assetAddress, tokenId, paymentAssetAddress, amount, nonce_value);
    var account = window.ethereum.selectedAddress
    const fixedPriceSignature = await window.web3.eth.personal.sign(messageHash, account);
    await updateSignature(collectionId, fixedPriceSignature)
    await save_NonceValue(collectionId, fixedPriceSignature, nonce_value)
    if (sendBackTo == 'update') {
      return window.updateSignFixedSuccess(collectionId)
    } else {
      return window.bidSignFixedSuccess(collectionId)
    }
  } catch (err) {
    console.error(err);
    if(sendBackTo == 'update'){
      return window.updateSignFixedFailed(err['message'])
    }else{
      return window.bidSignFixedFailed(err['message'])
    }
  }
}

// buyingAssetType = 1 # 721
// buyingAssetType = 0 # 1155
window.buyAsset = async function buyAsset(assetOwner, buyingAssetType, buyingAssetAddress, tokenId, unitPrice, buyingAssetQty,
                                          paymentAmt, paymentAssetAddress, decimals, sellerSign, collectionId) {
  try {
    paymentAmt = roundNumber(mulBy(paymentAmt, 10 ** decimals), 0);
    unitPrice = roundNumber(mulBy(unitPrice, 10 ** decimals), 0);
    var compiledContractDetails = getContractABIAndBytecode(tradeContractAddress, 'trade');
    var abi = compiledContractDetails['compiled_contract_details']['abi'];
    var contract = await new window.web3.eth.Contract(abi, tradeContractAddress);
    var nonce_value = await getContractSignNonce(collectionId, sellerSign);
    var account = window.ethereum.selectedAddress
    var orderStruct = [
      assetOwner,
      account,
      paymentAssetAddress,
      buyingAssetAddress,
      buyingAssetType,
      unitPrice,
      paymentAmt,
      tokenId,
      buyingAssetQty
    ]
    var gasPrices = await gasPrice();
    var receipt = await contract.methods.buyAsset(
      orderStruct,
      splitSign(sellerSign, nonce_value)
    ).send({from: account, gas: 516883, gasPrice: String(gasPrices)});
    await updateCollectionBuy(collectionId, buyingAssetQty, receipt.transactionHash)
    return window.buyPurchaseSuccess(collectionId)
  } catch (err) {
    console.error(err);
    return window.buyPurchaseFailed(err['message'])
  }
}

window.executeBid = async function executeBid(buyer, buyingAssetType, buyingAssetAddress, tokenId, paymentAmt, buyingAssetQty, paymentAssetAddress, decimals, buyerSign, collectionId, bidId) {
  try {
    paymentAmt = roundNumber(mulBy(paymentAmt, 10 ** decimals), 0);
    var unitPrice = 1;
    var compiledContractDetails = getContractABIAndBytecode(tradeContractAddress, 'trade');
    var abi = compiledContractDetails['compiled_contract_details']['abi'];
    var contract = await new window.web3.eth.Contract(abi, tradeContractAddress);
    var nonce_value = await getContractSignNonce(collectionId, buyerSign);
    var account = window.ethereum.selectedAddress
    var gasPrices = await gasPrice();
    var orderStruct = [
      account,
      buyer,
      paymentAssetAddress,
      buyingAssetAddress,
      buyingAssetType,
      unitPrice,
      paymentAmt,
      tokenId,
      buyingAssetQty
    ]
    var receipt = await contract.methods.executeBid(
      orderStruct,
      splitSign(buyerSign, nonce_value)
    ).send({from: account, gas: 516883, gasPrice: String(gasPrices)});
    await updateCollectionSell(collectionId, buyer, bidId, receipt.transactionHash)
    return window.acceptBidSuccess(collectionId)
  } catch (err) {
    console.error(err);
    return window.acceptBidFailed(err['message'])
  }
}

function getCurrentAccount() {
  return window.ethereum.selectedAddress
}

window.ethBalance = async function ethBalance() {
  var account = window.ethereum.selectedAddress
  var bal = await window.web3.eth.getBalance(account);
  var ethBal = roundNumber(web3.utils.fromWei(bal, 'ether'), 4);
  return ethBal;
}

window.updateEthBalance = async function updateEthBalance() {
  var ethBal = await window.ethBalance()
  $('.curBalance').html(ethBal + 'ETH')
  $('.curEthBalance').text(ethBal)
}

window.tokenBalance = async function tokenBalance(contractAddress, decimals) {
  var abi = [{
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }]
  var contract = await new window.web3.eth.Contract(abi, contractAddress);
  var account = window.ethereum.selectedAddress
  var balance = await contract.methods.balanceOf(account).call();
  balance = roundNumber(divBy(balance, (10 ** decimals)), 4)
  return balance
}

window.getNetworkType = async function getNetworkType() {
  var type = await web3.eth.net.getNetworkType();
  return type;
}

function showTermsCondition(account, ethBal, networkType) {
  var account = account || window.ethereum.selectedAddress
  $.magnificPopup.open({
    closeOnBgClick: false ,
		enableEscapeKey: false,
    items: {
      src: '#terms-and-condition'
    },
    type: 'inline'
  });
  $("#account").val(account)
  $("#eth_balance_tc").val(ethBal)
  $("#network_type").val(networkType)
}

async function load(shoulDestroySession = false) {
  if (window.ethereum) {
    await loadWeb3();
    var account = window.ethereum.selectedAddress
    var networkType = await getNetworkType();
    var ethBal = await ethBalance();
    const isValidUserResp = await isValidUser(account, '')
    if (isValidUserResp.user_exists) {
      await createUserSession(account, ethBal, shoulDestroySession)
      if (shoulDestroySession) {
        window.location.href = '/'
      } else {
        return true
      }
    } else {
      if (gon.session) {
        if (account) {
          await destroySession()
        }
        window.location.href = '/'
      } else {
        showTermsCondition(account, ethBal, networkType)
        return false
      }
    }
  }
}

window.disconnect = async function disconnect(address) {
  await destroySession()
  window.location.href = '/'
}

async function destroySession() {
  if (gon.session) {
    await destroyUserSession(window.ethereum.selectedAddress)
  }
}

window.connect = async function connect(address) {
  if(typeof web3 === 'undefined' && mobileCheck()) {
    window.open(`https://metamask.app.link/dapp/` + location.hostname, '_blank').focus();
    return
  }else if (typeof web3 !== 'undefined') { 
    const status = await load();
    if (status) {
      window.location.href = '/'
    }
  } else {
    toastr.error('Please install Metamask Extension to your browser. <a target="_blank" href="https://metamask.io/download.html">Download Here</a>')
  }
}

window.proceedWithLoad = async function proceedWithLoad() {
  var account = $("#account").val()
  const ethBal = $("#eth_balance").text()
  const networkType = $("#network_type").val()
  if ($("#condition1").is(":checked") && $("#condition2").is(":checked")) {
    await createUserSession(account, ethBal, networkType)
    window.location.href = '/'
  } else {
    toastr.error('Please accept the conditions to proceed')
  }
}

window.loadUser = async function loadUser() {
  if (window.ethereum && gon.session) {
    load();
  }
}

async function loadAddress() {
  await loadWeb3();
}

$(function () {
  loadAddress();
});

if (window.ethereum){
  window.ethereum.on('accountsChanged', function (acc) {
    if (window.ethereum && gon.session) {
      load(true);
    }
  })
}

function gasPrice(){
  var init_gasPrice = '400000000000';
  try {
  var request = $.ajax({
    url: `/gas_price`,
    async: false,
    type: "GET"
  });
  request.done(function (msg) {
    if (msg['gas_price'] != '')
    {
      init_gasPrice = msg['gas_price']['fastest'] * 10**8;
    }
  });
  request.fail(function (jqXHR, textStatus) {
   });
} catch (err) {
  console.error(err);
}
 return init_gasPrice;
}

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

