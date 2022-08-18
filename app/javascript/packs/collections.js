$(document).ready(function () {

  $(document).on("change", "#collection-put-on-sale", function () {
    if (!$(this).is(":checked")) {
      $('#collection_instant_sale_enabled').prop("checked", false).change();
      $('#collection-unlock-on-purchase').prop("checked", false).change();
    }
  })

  $(document).on("change", "#collection_instant_sale_enabled", function () {
    if ($(this).is(":checked")) {
      $("#instPrice").removeClass("hide")
    } else {
      $("#instPrice").addClass("hide")
    }
  });

  $(document).on("change", "#collection-unlock-on-purchase", function () {
    if ($(this).is(":checked")) {
      $(".unlock-description-section").removeClass("hide")
    } else {
      $(".unlock-description-section").addClass("hide")
    }
  });

  $(document).on("change", "input[name=chooseCollection]", function () {
    var collectionType = $("input[name=chooseCollection]").filter(":checked").val();
    if(collectionType=="create"){
      $('.Own_contract_partials').removeClass("hide")
    }else{
      $('.Own_contract_partials').addClass("hide")
    }
  });


  // Collection Attribute Add/Remove section
  function updateJsonField() {
    var data = {}
    $.each($(".collection-attribute-section .collection-attribute-entry"), function (i, collection) {
      var attrKey = $(collection).find(".attr-key").val()
      var attrVal = $(collection).find(".attr-val").val()
      if (attrKey.length > 0 && attrVal.length > 0) {
        data[attrKey] = attrVal
      }
    })
    $(".collection-data-val").val(JSON.stringify(data))
  }

  function processAttribute(_this) {
    var inputKey = _this.closest(".collection-attribute-entry").find(".attr-key").val()
    var inputVal = _this.closest(".collection-attribute-entry").find(".attr-val").val()

    if (inputKey.length > 0 && inputVal.length > 0) {
      var totalEntry = $(".collection-attribute-section .collection-attribute-entry").length
      var nonEmptyKey = $('.attr-key').filter(function () {
        return this.value === ''
      });
      var nonEmptyval = $('.attr-val').filter(function () {
        return this.value === ''
      });

      if (nonEmptyKey.length <= 1 && nonEmptyval.length <= 1) {
        var collectionAttrLength = $(".collection-attribute-entry").length
        var clonedDiv = $('.collection-attribute-entry-base').clone()
        clonedDiv.removeClass('hide collection-attribute-entry-base')
        clonedDiv.find(".attr-key").attr("name", "collection[attributes][" + collectionAttrLength + "][key]")
        clonedDiv.find(".attr-val").attr("name", "collection[attributes][" + collectionAttrLength + "][val]")
        clonedDiv.appendTo(".collection-attribute-section")
      }
    }

    if (inputKey.length === 0 || inputVal.length === 0) {
      var emptyKey = $('.attr-key').filter(function () {
        return this.value === ''
      });
      var emptyval = $('.attr-val').filter(function () {
        return this.value === ''
      });

      if (emptyKey.length == 3 || emptyval.length === 3) {
        var totalEntry = $(".collection-attribute-section .collection-attribute-entry").length
        var collections = $(".collection-attribute-section .collection-attribute-entry")
        var currentCollection = collections[totalEntry - 1]
        currentCollection.remove()
      }
    }

    updateJsonField()
  }

  // Collection Attribute Add/Remove section end

  $(document).on("keyup", ".attr-key", function () {
    processAttribute($(this))
  })

  $(document).on("keyup", ".attr-val", function () {
    processAttribute($(this))
  })

  $(document).on("click", ".triggerCollectionValidation", function (e) {
    e.preventDefault()
    var form = $("#collectionCreateForm")[0]
    var source = $("#collection_source").val();
    if (source == "opensea" || form.checkValidity()) {
      const mintType = $("input[name=chooseMintType]").filter(":checked").val();
      if(mintType == undefined) {
        return toastr.error('Please select minting type')
      } else {
        if ($('#collection_instant_sale_enabled').is(":checked") && (!validFloat($("#instant-price").val()))) {
          return toastr.error('Please enter valid instant price')
        } else if ($('#no_of_copies').length && !validNum($('#no_of_copies').val())) {
          return toastr.error('Please enter valid no of copies')
        } else if ($('#no_of_copies').length && $("#no_of_copies")[0].validationMessage !== "") {
          return toastr.error("Number of copies " + $("#no_of_copies")[0].validationMessage.toLowerCase())
        } else {
          $("#submitCollection").click();
          $("#collectionCreateForm :input").prop("disabled", true);
        }
      }
    } else {
      var collectionType = $("input[name=chooseCollection]").filter(":checked").val();
      if ($('#file-1').val() === '') {
        return toastr.error('Please select collection file')
      } else if ($("#collection-category option:selected").length === 0) {
        return toastr.error('Please select categories')
      } else if (collectionType === undefined) {
        return toastr.error('Please select collection type')
      } else if ($('#collection-name').val() === '') {
        return toastr.error('Please provide collection name')
      } else if ($('#description').val() === '') {
        return toastr.error('Please provide collection description')
      } else if ($('#no_of_copies').length && !validNum($('#no_of_copies').val())) {
        return toastr.error('Please enter valid no of copies')
      } else {
        toastr.error('Please fill all required fields.')
      }
    }
  })



  $(document).on("click", ".collection-submit", function (e) {
    e.preventDefault()
    $(this).text("In Progress");
    $(this).closest(".row").find("status-icon").html('<div class="follow-step-2-icon"><div class="loader"></div></div>')
    $(".collection-submit-btn").click()
  })

  $(document).on("click", ".default-btn", function (e) {
    e.preventDefault()
  })

  $(document).on("click", ".createOwnErc721Form", function () {
    startContractDeploy($('#collection_contract_type').val())
  });

  $(document).on("click", ".own-contract-close", function (){
    $('#nft_contract_name').val('');
    $('#nft_contract_symbol').val('');
  })

  window.startContractDeploy = function startContractDeploy(contractType) {
    var name = $('#nft_contract_name').val();
    var symbol = $('#nft_contract_symbol').val();
    var desc = $('#nft_contract_desc').val();
    var imageElement = document.getElementById('nft_contract_attachment').files
    var image = null
    var cover_imageElement = document.getElementById('nft_contract_cover').files
    var cover_image = null
    if(imageElement.length>0){
      image = imageElement[0]
    }
    if(cover_imageElement.length>0){
      cover_image = cover_imageElement[0]
    }
    var collectionId = $('#collection_id').val();
    if (!name || !symbol || !image || !desc) {
      toastr.info('Provide valid name, image, description and symbol')
      $.magnificPopup.close();
      $.magnificPopup.open({
        closeOnBgClick: false ,
		    enableEscapeKey: false,
        items: {
          src: '#createOwnErc721'
        },
        type: 'inline'
      });
    } else {
      var compiled_details = getContractABIAndBytecode('', contractType, false); //shared=false
      console.log(compiled_details)
      var abi = compiled_details['compiled_contract_details']['abi_factory']
      var bytecode = compiled_details['compiled_contract_details']['bytecode']
      console.log(abi, bytecode, name, symbol, contractType, collectionId)
      contractDeployInit()
      deployContract(abi, bytecode, name, symbol, contractType, collectionId, image, desc, cover_image);
    }
  }

  window.contractDeployInit = function contractDeployInit() {
     $.magnificPopup.close();
     $.magnificPopup.open({
      closeOnBgClick: false ,
		  enableEscapeKey: false,
      items: {
        src: '#deployContract'
      },
      type: 'inline'
    });
    $('.deployProgress').removeClass('hide')
    $('.deployDone').addClass('hide')
    $('.deployRetry').addClass('hide')
    $('.signStart').addClass('grey').removeClass('hide')
    $('.signProgress').addClass('hide')
    $('.signRetry').addClass('hide')
    $('.signDone').addClass('hide')
  }

  window.contractDeploySuccess = function contractDeploySuccess(contractAddress, contractType) {
    console.log("Contract Address: " + contractAddress);
    $('.deployProgress').addClass('hide')
    $('.deployProgress').addClass('hide')
    $('.deployDone').addClass('disabledLink').removeClass('hide')

    //  OPEN SIGN METHOD
    // $('.signDone').addClass('hide')
    // $('.signStart').addClass('hide')
    // $('.signProgress').removeClass('hide')
    console.log(contractAddress, contractType)
    var MintType = $("input[name=chooseMintType]").filter(":checked").val()
    if (MintType == 'lazy') {
      initLazyMint()
    } else {
      initCollectionCreate(contractAddress, contractType)
    }
  }

  window.contractDeployFailed = function contractDeployFailed(errorMsg) {
    toastr.error(errorMsg)
    $('.deployProgress').addClass('hide')
    $('.deployDone').addClass('hide')
    $('.deployRetry').removeClass('hide').addClass('grey')
  }

  $(document).on("click", ".deployRetry", function () {
    startContractDeploy($('#collection_contract_type').val())
  })

  window.initCollectionCreate = function initCollectionCreate(contractAddress, contractType) {
    var existingToken = $("#collection_token").val()
    collectionCreateInit(false, existingToken)
    var sharedCollection = ($("input[name=chooseCollection]").filter(":checked").val() === 'nft')
    approveNFT(contractType, contractAddress, sharedCollection, 'collection', existingToken)
  }

  window.initLazyMint = function initLazyMint()
  {
    approveCollection($('#collection_id').val());
    if ($('#collection_instant_sale_enabled').is(":checked")){
     collectionCreateInit(true)
     console.log('Signing using metamask')
     initsignFixedPriceProcess(true)
    }else{
      toastr.success('Collection created succcessfully.')
      window.location.href = '/collections/' + $('#collection_id').val()
    }
  }

  window.collectionCreateInit = function collectionCreateInit(lazy_minting=false, existingToken=null) {
    if ($('#collection_instant_sale_enabled').is(":checked")) {
      $('.signFixedPrice').removeClass('hide')
    } else {
      $('.signFixedPrice').addClass('hide')
    }
    show_modal('#collectionStepModal')
    if (existingToken) {
      $('.mintFlow').addClass('hide')
    }
    if(lazy_minting){
      $('.mintFlow').addClass('hide')
      $('.approveFlow').addClass('hide')
    }
    $("#deployContract").modal("hide")
    $("#collectionStepModal").modal("show")

    $('.allProgress').addClass('hide')
    $('.allDone').addClass('hide')
    $('.allRetry').addClass('hide')
    $('.allStart').removeClass('hide').addClass('grey')
    $('.approveProgress').removeClass('hide')
  }

  window.collectionApproveSuccess = function collectionApproveSuccess(contractType, existingToken=null) {
    mintCollectionCreate(contractType, existingToken)
  }

  function mintCollectionCreate(contractType, existingToken=null) {
    $('.allProgress').addClass('hide')
    $('.allDone').addClass('hide')
    $('.allRetry').addClass('hide')
    $('.allStart').addClass('hide').addClass('grey')
    $('.approveDone').removeClass('hide').removeClass('grey').addClass('disabledLink')
    $('.mintProgress').removeClass('hide')
    $('.signFixPriceStart').removeClass('hide').addClass('grey')
    if (existingToken) {
      if ($('#collection_instant_sale_enabled').is(":checked")) {
        initsignFixedPriceProcess()
      } else {
        toastr.success('Collection created succcessfully.')
        window.location.href = '/collections/' + $('#collection_id').val()
      }
    } else {
      // TODO: WHILE CHANGE NFT TO SHARED/OWNER THS HAS TO BE CHANGED
      var sharedCollection = ($("input[name=chooseCollection]").filter(":checked").val() === 'nft')
      if (contractType === 'nft721') {
        createCollectible721($('#collection_contract_address').val(), $('#collection_token_uri').val(),
          $('#collection_royalty_fee').val(), $('#collection_id').val(), sharedCollection)
      } else if (contractType === 'nft1155') {
        createCollectible1155($('#collection_contract_address').val(), $('#collection_supply').val(),
          $('#collection_token_uri').val(), $('#collection_royalty_fee').val(), $('#collection_id').val(), sharedCollection)
      }
    }
  }

  window.collectionApproveFailed = function collectionApproveFailed(errorMsg) {
    toastr.error(errorMsg)
    $('.allProgress').addClass('hide')
    $('.allDone').addClass('hide')
    $('.allRetry').addClass('hide')
    $('.allStart').removeClass('hide').addClass('grey')
    $('.approveRetry').removeClass('hide')
  }

  $(document).on("click", ".approveRetry", function () {
    if ($('#priceChange').length) {
      initApproveResale()
    } else {
      initCollectionCreate($('#collection_contract_address').val(), $('#collection_contract_type').val())
    }
  })

  $(document).on("click", ".mintRetry", function () {
    mintCollectionCreate($('#collection_contract_type').val())
  })

  window.collectionMintSuccess = function collectionMintSuccess(collectionId) {
    if ($('#collection_instant_sale_enabled').is(":checked")) {
      $('.mintProgress').addClass('hide')
      $('.mintDone').removeClass('hide')
      initsignFixedPriceProcess()
    } else {
      toastr.success('Collection created succcessfully.')
      window.location.href = '/collections/' + collectionId
    }
  }

  window.collectionMintFailed = function collectionMintFailed(errorMsg, contractType) {
    toastr.error(errorMsg)
    $('.allProgress').addClass('hide')
    $('.allDone').addClass('hide')
    $('.allRetry').addClass('hide')
    $('.allStart').removeClass('hide').addClass('grey')
    $('.approveDone').removeClass('hide').removeClass('grey').addClass('disabledLink')
    $('.mintStart').addClass('hide')
    $('.mintRetry').removeClass('hide')
  }

  window.initsignFixedPriceProcess = function initsignFixedPriceProcess(is_lazy_minting=false) {
    hideAll()
    $('.convertDone').removeClass('hide')
    $('.approveDone').removeClass('hide')
    $('.mintDone').removeClass('hide')
    $('.signFixPriceProgress').removeClass('hide')
    var pay_token_address = $('#collection_erc20_token_id option:selected, this').attr('address')
    var details = fetchCollectionDetails(null, pay_token_address)
    if (details) {
      // tokenID is 0 for Lazy-minting blocks
      const tokenId = is_lazy_minting ? 0 : details['token_id']  
      console.log(details['unit_price'], details['pay_token_decimal'], details['pay_token_address'],
        details['token_id'], details['asset_address'], details['collection_id'], details['is_eth_payment'])
      if (details['is_eth_payment']){
        console.log(details['is_eth_payment']);
        var paymentCoin = "0x0000000000000000000000000000000000000000";
        var ethDecimals = 18;
        signSellOrder(details['unit_price'], ethDecimals, paymentCoin,
        tokenId, details['asset_address'], details['collection_id'],
        )
      }else{
        signSellOrder(details['unit_price'], details['pay_token_decimal'], details['pay_token_address'],
        tokenId, details['asset_address'], details['collection_id'])
      }
    } else {
      bidSignFixedFailed('Unable to fetch tokan details. Please try again later')
    }
  }

function updateOwnContractCollection(collectionId) {
  var request = $.ajax({
    url: `/collections/${collectionId}/update_state`,
    type: "POST",
    async: false,
    dataType: "script"
  });
}

  window.bidSignFixedSuccess = function bidSignFixedSuccess(collectionId) {
    toastr.success('Collection created succcessfully.')
    window.location.href = '/collections/' + collectionId
  }

  window.bidSignFixedFailed = function bidSignFailed(errorMsg, collectionId='') {
    toastr.error(errorMsg)
    hideAll()
    $('.convertDone').removeClass('hide')
    $('.approveDone').removeClass('hide')
    $('.mintDone').removeClass('hide')
    $('.signFixPriceRetry').removeClass('hide')
    if (collectionId != ''){
      updateOwnContractCollection(collectionId)
    }
  }

  $(document).on("click", ".signFixPriceRetry", function () {
    if($('#priceChange').length){
      initsignFixedPriceUpdate()
    }else{
      initsignFixedPriceProcess($("input[name=chooseMintType]").filter(":checked").val() === 'lazy')
    }
  })

  // BIDDING MODEL STARTS HERE
  // Process and Approve section
  $(document).on("click", ".triggerBiddingValidation", function (e) {
    clearToastr();
    e.preventDefault()
    var form = $("#biddingForm")[0]
    if ($('#bid_qty').length && !validNum($('#bid_qty').val())) {
      return toastr.error('Please enter valid quantity');
    } else if (!validFloat($('#bid_amt').val())) {
      return toastr.error('Please enter valid price')
    } else if (form.checkValidity()) {
      $("#biddingForm :input").prop("disabled", true);
      var contractAddress = $('#bid_currency :selected').attr('address');
      var decimals = $('#bid_currency :selected').attr('decimals');
      initBidProcess(contractAddress, decimals);
    } else if ($("#bid_qty")[0].validationMessage !== "") {
      return toastr.error($("#bid_qty")[0].validationMessage)
    }
  })

  // TODO: WHILE ADDING NEW CURRENCIES HAVE TO MAKE LOGIC TO FETCH DECIMALS HERE
  window.initBidProcess = async function isApprovedNFT(contractAddress, contractDecimal) {
    var curErc20Balance = $('#erc20_balance').text()
    var ethBalance = await window.ethBalance();
    var totalAmt = $("#bid-total-amt-dp").attr('bidAmt')
    var symbol = $('#bid_currency :selected').text();
    if (isGreaterThanOrEqualTo(curErc20Balance, totalAmt)) {
      $('.convertEth').addClass("hide")
      initApproveBidProcess(contractAddress)
    } else if (symbol === 'WETH' && isGreaterThanOrEqualTo(ethBalance, totalAmt)) {
      convertEthToWeth(totalAmt)
    } else {
      $("#biddingForm :input").prop("disabled", false);
      $.magnificPopup.close();
      return toastr.error('Not enough balance')
    }
  }

  window.bidConvertSuccess = function bidConvertSuccess(transactionHash) {
    $('.convertProgress').addClass('hide')
    $('.convertDone').removeClass('hide')
    var contractAddress = $('#bid_currency option:selected, this').attr('address')
    initApproveBidProcess(contractAddress)
  }

  window.bidConvertFailed = function bidConvertFailed(errorMsg) {
    toastr.error(errorMsg)
    hideAll()
    $('.allStart').removeClass('hide').addClass('grey')
    $('.convertRetry').removeClass('hide')
  }

  window.initApproveBidProcess = function initApproveBidProcess(contractAddress, decimals = 18) {
    hideAll()
    $('.convertDone').removeClass('hide')
    $('.approvebidProgress').removeClass('hide')
    $('.signbidStart').removeClass('hide')
    $.magnificPopup.close();
    $.magnificPopup.open({
      closeOnBgClick: false ,
      enableEscapeKey: false,
      items: {
        src: '#placeBid'
      },
      type: 'inline',
      callbacks: {
        close: function(){
          $("#biddingForm :input").prop("disabled", false);
        }
      }
    });
    approveERC20(contractAddress, 'erc20', $("#bid-total-amt-dp").attr('bidAmt'), decimals)
  }

  window.bidApproveSuccess = function bidApproveSuccess(transactionHash, contractAddress) {
    $('.approvebidProgress').addClass('hide')
    $('.approvebidDone').removeClass('hide')
    var contractAddress = $('#bid_currency option:selected, this').attr('address')
    initSignBidProcess(contractAddress)
  }

  window.bidApproveFailed = function bidApproveFailed(errorMsg) {
    toastr.error(errorMsg)
    hideAll()
    $('.convertDone').removeClass('hide')
    $('.approvebidRetry').removeClass('hide')
    $('.signbidStart').removeClass('hide')
  }

  $(document).on("click", ".approvebidRetry", function () {
    var contractAddress = $('#bid_currency option:selected, this').attr('address')
    initApproveBidProcess(contractAddress)
  })

  window.initSignBidProcess = function initSignBidProcess(contractAddress) {
    hideAll()
    $('.convertDone').removeClass('hide')
    $('.approvebidDone').removeClass('hide')
    $('.signbidProgress').removeClass('hide')
    var details = fetchCollectionDetails(null, contractAddress)
    if (details) {
      console.log(details['asset_address'], details['token_id'], $("#bid_qty").val(), $("#bid-total-amt-dp").attr('bidAmt'),
        details['pay_token_address'], details['pay_token_decimal'], details['collection_id'], $("#bid-total-amt-dp").attr('bidPayAmt'))
      bidAsset(details['asset_address'], details['token_id'], $("#bid_qty").val(), $("#bid-total-amt-dp").attr('bidAmt'),
        details['pay_token_address'], details['pay_token_decimal'], details['collection_id'], $("#bid-total-amt-dp").attr('bidPayAmt'))
    } else {
      bidSignFailed('Unable to fetch tokan details. Please try again later')
    }
  }

  window.bidSignSuccess = function bidSignSuccess(collectionId) {
    toastr.success('Bidding succces.')
    window.location.href = '/collections/' + collectionId
  }

  window.bidSignFailed = function bidSignFailed(errorMsg) {
    toastr.error(errorMsg)
    hideAll()
    $('.convertDone').removeClass('hide')
    $('.approvebidDone').removeClass('hide')
    $('.signbidRetry').removeClass('hide')
  }

  $(document).on("click", ".signbidRetry", function () {
    var contractAddress = $('#bid_currency option:selected, this').attr('address')
    initSignBidProcess(contractAddress)
  })


  // BUYING MODEL STARTS HERE
  $(document).on("click", ".triggerBuyValidation", function (e) {
    console.log("Collection1: " + gon.collection_data)
    clearToastr();
    e.preventDefault()
    if (!validNum($('#buy_qty').val())) {
      return toastr.error('Please enter valid quantity');
    } else if (!isLessThanOrEqualTo($('#buy_qty').val(), $('#buy_qty').attr('maxQuantity'))) {
      return toastr.error('Maximum quantity available is ' + $('#buy_qty').attr('maxQuantity'))
    } else {
      $("#buyForm :input").prop("disabled", true);
      initBuyProcess();
    }
  })

  $(document).on("click", ".triggerFiatBuyValidation", function (e) {
    clearToastr();
    e.preventDefault()
    if (!validNum($('#buy_qty').val())) {
      return toastr.error('Please enter valid quantity');
    } else if (!isLessThanOrEqualTo($('#buy_qty').val(), $('#buy_qty').attr('maxQuantity'))) {
      return toastr.error('Maximum quantity available is ' + $('#buy_qty').attr('maxQuantity'))
    } else {
      initStripePayment();
    }
  })


  window.initStripePayment = async function initStripePayment(){
    $('#Fiat-modal').addClass('hide');
    $(".loading-gif").show();
    var collectionId = $('#collection_id').val();
    var qty = $('#buy_qty').val().replace(/[^0-9]/g, '') || 0;
    $.ajax({
      url: `/collections/${collectionId}/create_product_price`,
      type: "POST",
      async: false,
      data: {"quantity": qty},
      dataType: "json",
      global: false
    })
    .done(function(msg) { 
      setTimeout(function(){
        if (msg['status'] == 'success'){
        createStripeSession(msg['price_id']['id'], msg['payment_id']);
        }
        else{
          $.magnificPopup.close();
          $(".loading-gif").hide();
          toastr.error("Something Went Wrong! Please contact support");
        }
      }, 2000);  
    })
    .fail(function(jqXHR, textStatus) {
      $.magnificPopup.close();
      $(".loading-gif").hide();
      toastr.error("Something Went Wrong! Please contact support");
    });
  }

  window.createStripeSession = async function createStripeSession(price_id, payment_id){
    var collectionId = $('#collection_id').val();
    $.ajax({
      url: `/collections/${collectionId}/create_stripe_session`,
      type: "POST",
      async: false,
      data: {"price_id": price_id, "payment_id": payment_id},
      dataType: "json",
      global: false
    }).done(function(msg){
      if (msg['status'] == 'success'){
        window.location = msg['session_url'];
      }else{
        $.magnificPopup.close();
        $(".loading-gif").hide();
        toastr.error("Something Went Wrong! Please contact support");
      }
    }).fail(function(jqXHR, textStatus) {
      $.magnificPopup.close();
      $(".loading-gif").hide();
      toastr.error("Something Went Wrong! Please contact support");
    });
  
  };

  $(document).on("click", "#fiat-payment-validate", function (e) {
    $(".loading-gif").show();
    var collectionId = $('#collection_id').val();
    var token = getUrlParameter('token');
    $.ajax({
      url: `/collections/${collectionId}/validate_fiat_payment`,
      type: "POST",
      async: false,
      data: {token: token},
      dataType: "json",
    })
    .done(function(msg) { 
      setTimeout(function(){
      if (msg['status'] == 'success'){
          $(".loading-gif").show();
          $("#loader-text").replaceWith("<h1 id='loader-text'>Transferring your NFT. Please wait ... </h1>");
          $("#buy_qty").val(1);
          calculateBuy($('#BuyerserviceFee').text());
          initBuyFiatProcess($("#buyContractAddress").text(), 
                             $("#buyContractDecimals").text(), msg['quantity'], msg['payment_amt'],
                             msg['is_eth_payment']);
      }
      else if (msg['status'] == 'cancelled'){
        $.magnificPopup.close();
        $(".loading-gif").hide();
        toastr.warning('Your payment has been cancelled.')
      }
      else{
        $.magnificPopup.close();
        $(".loading-gif").hide();
        toastr.error('Invalid Payment Request! Please contact support')
      }
    }, 2000);  
    })
    .fail(function(jqXHR, textStatus) {
      return false;
    });
  });


  window.initBuyFiatProcess = async function initBuyFiatProcess(contractAddress, contractDecimals, fiatQty,
     paymentAmt, isEthPayment=false) {
    var paymentDetails = fetchCollectionDetails(null, contractAddress)
    if (isEthPayment == true){
      paymentDetails['pay_token_address'] = '0x0000000000000000000000000000000000000000';
      paymentDetails['pay_token_decimal'] = 18;
    }
    console.log(paymentDetails['owner_address'], toNum(paymentDetails['asset_type']), paymentDetails['asset_address'],
      paymentDetails['token_id'], toNum(paymentDetails['unit_price']), toNum(fiatQty), toNum(paymentAmt),
      paymentDetails['pay_token_address'], toNum(paymentDetails['pay_token_decimal']),
      paymentDetails['seller_sign'], paymentDetails['collection_id'], isEthPayment)
    if($('#is_collection_lazy_minted').val() == "true"){
      MintAndTransferAsset(paymentDetails['owner_address'], toNum(paymentDetails['asset_type']), paymentDetails['asset_address'],
        paymentDetails['token_id'], toNum(paymentDetails['unit_price']), toNum(fiatQty), toNum(paymentAmt),
        paymentDetails['pay_token_address'], toNum(paymentDetails['pay_token_decimal']),
        paymentDetails['seller_sign'], paymentDetails['collection_id'], paymentDetails['token_uri'], 
        paymentDetails['royalty'],paymentDetails['shared'],paymentDetails['total'], isEthPayment)
    }else{
      buyAndTransferAsset(paymentDetails['owner_address'], toNum(paymentDetails['asset_type']), paymentDetails['asset_address'],
      paymentDetails['token_id'], toNum(paymentDetails['unit_price']), toNum(fiatQty), toNum(paymentAmt),
      paymentDetails['pay_token_address'], toNum(paymentDetails['pay_token_decimal']),
      paymentDetails['seller_sign'], paymentDetails['collection_id'], isEthPayment)
    }
  }

 
  window.initBuyProcess = async function initBuyProcess() {
    var curErc20Balance = $('#erc20_balance').text()
    var ethBalance = await window.ethBalance();
    var totalAmt = $("#buy-total-amt-dp").attr('buyAmt'); 
    var isEthPayment = $('#is_eth_payment').attr('is_eth_payment');
    if (isEthPayment === 'false'){
      if (isGreaterThanOrEqualTo(curErc20Balance, totalAmt)) {
        $('.convertEth').addClass("hide")
        initApproveBuyProcess($("#buyContractAddress").text(), $("#buyContractDecimals").text())
      } else if (isGreaterThanOrEqualTo(ethBalance, totalAmt)) {
        convertEthToWeth(totalAmt, 'Buy')
      } else {
        $("#buyForm :input").prop("disabled", false);
        // $("#placeBuy").modal("hide");
        $.magnificPopup.close();
        return toastr.error('Not enough balance');
      }
    }else{
      if (isGreaterThanOrEqualTo(ethBalance, totalAmt)) {
        initEthBuyProcess();
      }else{
        $("#buyForm :input").prop("disabled", false);
        $.magnificPopup.close();
        return toastr.error('Not enough balance');
      }
    }
  }

  window.buyConvertSuccess = function buyConvertSuccess(transactionHash) {
    $('.convertProgress').addClass('hide')
    $('.convertDone').removeClass('hide')
    initApproveBuyProcess($("#buyContractAddress").text(), $("#buyContractDecimals").text())
  }

  window.buyConvertFailed = function buyConvertFailed(errorMsg) {
    toastr.error(errorMsg)
    hideAll()
    $('.allStart').removeClass('hide').addClass('grey')
    $('.convertRetry').removeClass('hide')
  }

  window.initApproveBuyProcess = function initApproveBuyProcess(contractAddress, contractDecimals) {
    hideAll()
    $('.convertDone').removeClass('hide')
    $('.approvebuyProgress').removeClass('hide')
    $('.purchaseStart').removeClass('hide')
    $.magnificPopup.close();
    $.magnificPopup.open({
      closeOnBgClick: false ,
      enableEscapeKey: false,
      items: {
        src: '#placeBuy'
      },
      type: 'inline',
      callbacks: {
        close: function(){
          $("#buyForm :input").prop("disabled", false);
        }
      }
    });
    $('.purchaseAndMintStart').removeClass('hide')
    $("#Buy-modal").modal("hide")
    $("#placeBuy").modal("show")
    approveERC20(contractAddress, 'erc20', $("#buy-total-amt-dp").attr('buyAmt'), contractDecimals, 'Buy')
  }

  window.initEthBuyProcess = function initEthBuyProcess() {
    $('.convertEth').addClass('hide');
    $('.approveBuy').addClass('hide');
    $.magnificPopup.close();
    $.magnificPopup.open({
      closeOnBgClick: false ,
      enableEscapeKey: false,
      items: {
        src: '#placeBuy'
      },
      type: 'inline',
      callbacks: {
        close: function(){
          $("#buyForm :input").prop("disabled", false);
        }
      }
    });
    $("#placeBuy").modal("show");
    $(".purchaseStart").hide();
    $(".purchaseDone").hide();
    $(".purchaseRetry").hide();
    $(".allProgress").removeClass('hide');
    initPurchaseProcess('', true);
  }

  window.buyApproveSuccess = function buyApproveSuccess(transactionHash, contractAddress) {
    console.log("buyApproveSuccess")
    console.log(contractAddress)
    $('.approvebuyProgress').addClass('hide')
    $('.approvebuyDone').removeClass('hide')
    initPurchaseProcess(contractAddress)
  }

  window.buyApproveFailed = function buyApproveFailed(errorMsg) {
    toastr.error(errorMsg)
    hideAll()
    $('.convertDone').removeClass('hide')
    $('.approvebuyRetry').removeClass('hide')
    $('.purchaseStart').removeClass('hide')
    $('.purchaseAndMintStart').removeClass('hide')
  }

  $(document).on("click", ".approvebuyRetry", function () {
    initApproveBuyProcess($("#buyContractAddress").text(), $("#buyContractDecimals").text())
  })

  window.initPurchaseProcess = function initPurchaseBuyProcess(contractAddress, isEthPayment=false) {
    if (!isEthPayment){
      hideAll();
      $('.convertDone').removeClass('hide')
      $('.approvebuyDone').removeClass('hide')
      $('.purchaseProgress').removeClass('hide')
      $('.purchaseAndMintProgress').removeClass('hide')
    }
    console.log("initPurchaseProcess")
    console.log(contractAddress)
    var paymentDetails = fetchCollectionDetails(null, contractAddress)
    if (isEthPayment){
      paymentDetails['pay_token_address'] = '0x0000000000000000000000000000000000000000';
      paymentDetails['pay_token_decimal'] = 18;
    }
    console.log(paymentDetails['owner_address'], toNum(paymentDetails['asset_type']), 
      paymentDetails['asset_address'],
      paymentDetails['token_id'], toNum(paymentDetails['unit_price']), toNum($('#buy_qty').val()), 
      toNum($("#buy-total-amt-dp").attr('buyAmt')),
      paymentDetails['pay_token_address'], toNum(paymentDetails['pay_token_decimal']),
      paymentDetails['seller_sign'], paymentDetails['collection_id'])
    if($('#is_collection_lazy_minted').val()=="true"){
      MintAndBuyAsset(paymentDetails['owner_address'], toNum(paymentDetails['asset_type']),
        paymentDetails['asset_address'],
        paymentDetails['token_id'], toNum(paymentDetails['unit_price']), toNum($('#buy_qty').val()),
        toNum($("#buy-total-amt-dp").attr('buyAmt')),
        paymentDetails['pay_token_address'], toNum(paymentDetails['pay_token_decimal']),
        paymentDetails['seller_sign'], paymentDetails['collection_id'], paymentDetails['token_uri'], 
        paymentDetails['royalty'],paymentDetails['shared'],paymentDetails['total'], 
        isEthPayment)
    }else{
      buyAsset(paymentDetails['owner_address'],
      toNum(paymentDetails['asset_type']), paymentDetails['asset_address'],
      paymentDetails['token_id'], toNum(paymentDetails['unit_price']),
      toNum($('#buy_qty').val()), toNum($("#buy-total-amt-dp").attr('buyAmt')),
      paymentDetails['pay_token_address'], paymentDetails['pay_token_decimal'],
      paymentDetails['seller_sign'],
      paymentDetails['collection_id'], isEthPayment)
    }
  }




  window.buyPurchaseSuccess = function buyPurchaseSuccess(collectionId) {
    $('.convertDone').removeClass('hide')
    $('.approvebuyDone').removeClass('hide')
    $('.purchaseProgress').addClass('hide')
    $('.purchaseMintAndProgress').addClass('hide')
    $('.purchaseDone').removeClass('hide')
    $('.purchaseAndMintDone').removeClass('hide')
    toastr.success('Purchase succces.')
    window.location.href = '/collections/' + collectionId
  }

  window.buyMintAndPurchaseFailed = function buyMintAndPurchaseFailed(errorMsg) {
    toastr.error(errorMsg)
    hideAll()
    $('.convertDone').removeClass('hide')
    $('.approvebuyDone').removeClass('hide')
    $('.purchaseRetry').removeClass('hide')
  }

  window.buyPurchaseFailed = function buyPurchaseFailed(errorMsg) {
    toastr.error(errorMsg)
    hideAll()
    $('.convertDone').removeClass('hide')
    $('.approvebuyDone').removeClass('hide')
    $('.purchaseRetry').removeClass('hide')
  }

  window.buyWithEthPurchaseFailed = function buyWithEthPurchaseFailed(errorMsg) {
    toastr.error(errorMsg)
    $(".allProgress").addClass('hide');
    $(".purchaseRetry").removeClass('hide');
    $('.purchaseRetry').show();
  }

  $(document).on("click", ".purchaseRetry", function () {
    initPurchaseProcess($("#buyContractAddress").text())
  })


  $(document).on("click", ".execButton", function (e) {
    clearToastr();
    $('.bidExecDetail').text($(this).attr('bidDetail'))
    $('#bidByUser').text($(this).attr('bidUser'))
    $('.executeBidSymbol').text($(this).attr('bidSymbol'))
    $('#contractAddress').text($(this).attr('contractAddress'))
    $('#erc20ContractAddress').text($(this).attr('erc20ContractAddress'))
    $('#bidId').val($(this).attr('bidId'))
    calculateBidExec($(this))
    // $("#bidDetail").modal("show")
    show_modal('#bidDetail')
  })

  // EXECUTING BID MODEL HERE
  $(document).on("click", ".triggerExecuteBidValidation", function (e) {
    clearToastr();
    e.preventDefault();
    // $("#bidDetail").modal("hide")
    // $("#executeBid").modal("show");
    show_modal('#executeBid')
    initApproveExecBidProcess();
  })

  window.initApproveExecBidProcess = function initApproveExecBidProcess() {
    var contractType = $('#contractType').text()
    var contractAddress = $('#contractAddress').text()
    approveNFT(contractType, contractAddress, gon.collection_data['contract_shared'], 'executeBid')
  }

  window.approveBidSuccess = function approveBidSuccess() {
    hideAll()
    $('.approveExecbidDone').removeClass('hide')
    $('.acceptBidProgress').removeClass('hide')
    initAcceptBidProcess()
  }

  window.approveBidFailed = function approveBidFailed(errorMsg) {
    toastr.error(errorMsg)
    hideAll()
    $('.approveExecbidRetry').removeClass('hide')
    $('.approveBidStart').removeClass('hide')
  }

  $(document).on("click", ".approveExecBidRetry", function () {
    initApproveExecBidProcess()
  })

  window.initAcceptBidProcess = function initAcceptBidProcess() {
    var contractAddress = $('#erc20ContractAddress').text();
    var paymentDetails = fetchCollectionDetails($('#bidId').val(), contractAddress);
    console.log(paymentDetails['buyer_address'], toNum(paymentDetails['asset_type']), paymentDetails['asset_address'],
      paymentDetails['token_id'], toNum(paymentDetails['amount']), toNum(paymentDetails['quantity']),
      paymentDetails['pay_token_address'], toNum(paymentDetails['pay_token_decimal']),
      paymentDetails['buyer_sign'], paymentDetails['collection_id'])
      var lazyMint = $('#is_collection_lazy_minted').val()
    if(lazyMint=="true"){
      $('.MintAndacceptBidProgress').removeClass('hide')
      MintAndAcceptBid(paymentDetails['buyer_address'], toNum(paymentDetails['asset_type']), paymentDetails['asset_address'],
        paymentDetails['token_id'], toNum(paymentDetails['amount_with_fee']), toNum(paymentDetails['quantity']),
        paymentDetails['pay_token_address'], toNum(paymentDetails['pay_token_decimal']),
        paymentDetails['buyer_sign'], paymentDetails['collection_id'], paymentDetails['bid_id'],paymentDetails['token_uri'],paymentDetails['royalty'],paymentDetails['shared'],paymentDetails['total'])
    } else {  
      executeBid(paymentDetails['buyer_address'], toNum(paymentDetails['asset_type']), paymentDetails['asset_address'],
      paymentDetails['token_id'], toNum(paymentDetails['amount_with_fee']), toNum(paymentDetails['quantity']),
      paymentDetails['pay_token_address'], toNum(paymentDetails['pay_token_decimal']),
      paymentDetails['buyer_sign'], paymentDetails['collection_id'], paymentDetails['bid_id'])
    }
  }

  window.acceptBidSuccess = function acceptBidSuccess(collectionId) {
    hideAll()
    $('.allDone').removeClass('hide')
    toastr.success('Bid accept succces.')
    window.location.href = '/collections/' + collectionId
  }

  window.acceptBidFailed = function acceptBidFailed(errorMsg) {
    toastr.error(errorMsg)
    hideAll()
    $('.approveExecbidDone').removeClass('hide')
    $('.acceptBidRetry').removeClass('hide')
  }

  $(document).on("click", ".acceptBidRetry", function () {
    hideAll()
    $('.approveExecbidDone').removeClass('hide')
    $('.acceptBidProgress').removeClass('hide')
    initAcceptBidProcess()
  })


  // BUYING MODEL STARTS HERE
  $(document).on("click", ".triggerBurn", function (e) {
    clearToastr();
    e.preventDefault() 
    if ($('.burnQuantity').length && !validNum($('.burnQuantity').val())) {
      return toastr.error('Please enter valid quantity')
    } else {
      var form = $("#tokenBurnForm")[0]
      if (form.checkValidity()) {
         initBurnProcess($('.burnQuantity').val());
      } else if ($("#burn_qty")[0].validationMessage !== "") {
        return toastr.error($("#burn_qty")[0].validationMessage)
      }
    }
  })

  window.initBurnProcess = function initBurnProcess() {
    var paymentDetails = fetchCollectionDetails()
    var qnty = -1
    if($('#collection_ismultiple').val() == "true")
    {
      qnty = parseInt($('.burnQuantity').val())
      if(!qnty) {
        return toastr.error("Please enter token count.")
      }
      if(0 > qnty) {
        return toastr.error("Negative values not allowed")
      }
      if(qnty > paymentDetails['owned_tokens'] ){
        window.location.reload()
        return toastr.error("Please try again! Can't burn more than owned tokens.")
      }
    }
    show_modal('#burnToken');
    qnty = qnty ==-1 ?  paymentDetails['owned_tokens'] : qnty 
    console.log(paymentDetails['contract_type'], paymentDetails['asset_address'],
      paymentDetails['token_id'], qnty, paymentDetails['collection_id'], paymentDetails['shared'])
    burnNFT(paymentDetails['contract_type'], paymentDetails['asset_address'],
      paymentDetails['token_id'], qnty, paymentDetails['collection_id'], paymentDetails['shared'])
  }

  window.burnSuccess = function burnSuccess(transactionHash) {
    $('.burnProgress').addClass('hide')
    $('.burnDone').removeClass('hide')
    toastr.success('Burned successfully.')
    window.location.href = '/'
  }

  window.burnFailed = function burnFailed(errorMsg) {
    toastr.error(errorMsg)
    $('.burnProgress').addClass('hide')
    $('.burnRetry').removeClass('hide')
  }

  $(document).on("click", ".burnRetry", function () {
    initBurnProcess($('.burnQuantity').val());
  })


  // TRANSFERRING MODEL STARTS HERE
  $(document).on("click", ".triggerTransfer", function (e) {
    clearToastr();
    e.preventDefault()
    var form = $("#tokenTransferForm")[0]
    if ($('#address').val().length == 0) {
      return toastr.error('Please enter user address');
    } else if ($('#transfer_qty').length && !validNum($('#transfer_qty').val())) {
      return toastr.error('Please enter valid quantity')
    } else if (form.checkValidity()) {
      var address = fetchTransferDetails()
      if (address) {
        show_modal('#transferToken');
        initTransferProcess($('.transferAddress').val(), $('.transferQuantity').val());
      } else {
        return toastr.error('Invalid user address. Please provide address of the user registered in the application')
      }
    } else if ($("#transfer_qty")[0].validationMessage !== "") {
      return toastr.error($("#transfer_qty")[0].validationMessage)
    }
  })

  function fetchTransferDetails() {
    var resp = false
    $.ajax({
      url: '/collections/' + $('#collection_id').val() + '/fetch_transfer_user',
      type: 'GET',
      async: false,
      data: {address: $('.transferAddress').val()},
      success: function (data) {
        if (data.errors) {
          toastr.error(data['error'])
        } else {
          resp = data['address']
        }
      }
    });
    return resp;
  }

  window.initTransferProcess = function initTransferProcess(recipientAddress, transferQty) {
    var paymentDetails = fetchCollectionDetails()
    console.log(paymentDetails['contract_type'], paymentDetails['asset_address'], recipientAddress,
      paymentDetails['token_id'], transferQty, paymentDetails['collection_id'])
    console.log(gon.collection_data['contract_shared'])
    if (recipientAddress.toLowerCase() == paymentDetails['owner_address']) {
      toastr.error("You can't transfer your own tokens to you. Please try to transfer to another user.");
      $.magnificPopup.close();
    } else {
      directTransferNFT(paymentDetails['contract_type'], paymentDetails['asset_address'], recipientAddress,
        paymentDetails['token_id'], transferQty, gon.collection_data['contract_shared'], paymentDetails['collection_id'])
    }
  }

  window.directTransferSuccess = function directTransferSuccess(transactionHash, collectionId) {
    $('.transferProgress').addClass('hide')
    $('.transferDone').removeClass('hide')
    toastr.success('Transferred successfully.')
    window.location.href = '/collections/' + collectionId
  }

  window.directTransferFailed = function directTransferFailed(errorMsg) {
    toastr.error(errorMsg)
    $('.transferProgress').addClass('hide')
    $('.transferRetry').removeClass('hide')
  }

  $(document).on("click", ".transferRetry", function () {
    initTransferProcess($('.transferAddress').val(), $('.transferQuantity').val());
  })


  // PRICECHANGE MODEL STARTS HERE

  $(document).on("click", ".triggerPriceChange", function (e) {
    e.preventDefault()
    initApproveResale()
  })

  window.initApproveResale = function initApproveResale() {
    if ($('#collection-put-on-sale').is(":checked") || ($('#collection_instant_sale_enabled').is(":checked"))) {
      if ($('#collection_instant_sale_enabled').is(":checked")) {
        if (!validFloat($("#instant-price").val())) {
          return toastr.error('Please enter valid instant price')
        } else if ($('#instant-price').val() !== $('#instant-price').attr('prevVal')) {
          $('.signFixedPrice').removeClass('hide')
        }
      } 
      show_modal('#priceChange')
      if ($('#collection-put-on-sale').is(":checked") && $('#is_collection_lazy_minted').val() != 'true') {
        $('.approveRetry').addClass('hide')
        $('.approveProgress').removeClass('hide')
        var details = fetchCollectionDetails()
        approveResaleNFT(details['contract_type'], details['asset_address'], details['shared'])
      } else {
        hideAll()
        $('.approveFlow').addClass('hide')
        initsignFixedPriceUpdate()
      }
    } else {
      $("#submitPriceChange").click()
    }
  }

  window.approveResaleSuccess = function approveResaleSuccess() {
    hideAll()
    $('.approveDone').removeClass('hide')
    if ($('#collection_instant_sale_enabled').is(":checked")) {
      initsignFixedPriceUpdate()
    } else {
      $("#submitPriceChange").click()
    }
  }

  window.approveResaleFailed = function approveResaleFailed(errorMsg) {
    toastr.error(errorMsg)
    $('.approveProgress').addClass('hide')
    $('.approveRetry').removeClass('hide')
  }

  window.initsignFixedPriceUpdate = function initsignFixedPriceUpdate() {
    hideAll()
    $('.approveDone').removeClass('hide')
    $('.signFixedPrice').removeClass('hide')
    $('.signFixPriceRetry').addClass('hide')
    $('.signFixPriceProgress').removeClass('hide')
    var pay_token_address = $('#collection_erc20_token_id option:selected, this').attr('address')
    var pay_token_decimal = $('#collection_erc20_token_id option:selected, this').attr('decimals')
    var details = fetchCollectionDetails(null, pay_token_address)
    if (details) {
      if (details['is_eth_payment'] || pay_token_address === '0x0000000000000000000000000000000000000000'){
        var paymentCoin = "0x0000000000000000000000000000000000000000";
        signSellOrder($('#instant-price').val(), null, paymentCoin,
        details['token_id'], details['asset_address'], details['collection_id'], 'update'
        )
      }else{
        signSellOrder($('#instant-price').val(), pay_token_decimal, pay_token_address,
        details['token_id'], details['asset_address'], details['collection_id'], 'update');
      }      
    } else {
      bidSignFixedFailed('Unable to fetch token details. Please try again later')
    }
  }

  window.updateSignFixedSuccess = function updateSignFixedSuccess(collectionId) {
    $("#submitPriceChange").click()
  }

  window.updateSignFixedFailed = function updateSignFailed(errorMsg) {
    toastr.error(errorMsg)
    hideAll()
    $('.approveDone').removeClass('hide')
    $('.signFixPriceRetry').removeClass('hide')
  }

  // COMMON METHODS FOR BIDDING MODEL
  function hideAll() {
    $('.allProgress').addClass('hide')
    $('.allDone').addClass('hide')
    $('.allRetry').addClass('hide')
    $('.allStart').addClass('hide')
  }

  $('#createOwnErc721, #deployContract, #collectionStepModal').on('hidden.bs.modal', function () {
    $("#collectionCreateForm :input").prop("disabled", false);
  })

  $(document).on("click", ".collectionModalClose", function () {
    $("#collectionCreateForm :input").prop("disabled", false);
  })  

  function convertEthToWeth(totalAmt, callBackType = 'Bid') {
    $('.allRetry').addClass('hide')
    $('.convertProgress').removeClass('hide')
    // $("#" + callBackType + "-modal").modal("hide")
    // $("#place" + callBackType).modal("show")
    $.magnificPopup.close();
    $.magnificPopup.open({
      closeOnBgClick: false ,
		  enableEscapeKey: false,
      items: {
        src: "#place" + callBackType
      },
      type: 'inline'
    });
    convertWETH(totalAmt, callBackType)
  }

  $(document).on("click", ".convertRetry", function () {
    if ($("#bid-total-amt-dp").attr('bidAmt') === undefined) {
      convertEthToWeth($("#buy-total-amt-dp").attr('buyAmt'), 'Buy')
    } else {
      convertEthToWeth($("#bid-total-amt-dp").attr('bidAmt'), 'Bid')
    }
  })

  $(document).on("click", ".buy-now", function () {
    loadTokenBalance($('#buyContractAddress').text(), $('#buyContractDecimals').text());
  })

  $(document).on("click", ".bid-now", function () {
    var sym = $('#bid_currency :selected').text();
    var contractAddress = $('#bid_currency :selected').attr('address');
    var decimals = $('#bid_currency :selected').attr('decimals');
    loadTokenBalance(contractAddress, decimals, sym);
  })

  window.loadTokenBalance = async function loadTokenBalance(contractAddress, decimals, symbol) {
    var assetBalance = await tokenBalance(contractAddress, decimals);
    $('.ercCurBalance').text(assetBalance);
    $('#erc20_balance').text(assetBalance)
    $("#biding-asset-balance").text(mergeAmountSymbol(assetBalance, symbol));
  }

  function fetchCollectionDetails(bidId, erc20Address) {
    var resp = false
    var erc20Address;
    $.ajax({
      url: '/collections/' + $('#collection_id').val() + '/fetch_details',
      type: 'GET',
      async: false,
      data: {bid_id: bidId, erc20_address: erc20Address},
      success: function (respVal) {
        resp = respVal['data']
      }
    });
    return resp;
  }

  window.calculateBid = async function calculateBid(feePercentage) {
    var sym = $('#bid_currency :selected').text();
    var contractAddress = $('#bid_currency :selected').attr('address');
    var decimals = $('#bid_currency :selected').attr('decimals');
    if ($('#bid_qty').val()) {
      var qty = $('#bid_qty').val().replace(/[^0-9]/g, '') || 0;
    } else {
      var qty = 1;
    }
    var price = $('#bid_amt').val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1') || 0;
    var payAmt = multipliedBy(price, qty)
    var serviceFee = percentageOf(feePercentage, payAmt);
    var totalAmt = plusNum(payAmt, serviceFee);
    $("#bid-amt-dp").html(mergeAmountSymbol(serviceFee, sym))
    $("#bid-total-amt-dp").html(mergeAmountSymbol(totalAmt, sym));
    var biddingAssetBalance = await tokenBalance(contractAddress, decimals) || 0;
    $('#erc20_balance').text(biddingAssetBalance);
    $("#biding-asset-balance").text(mergeAmountSymbol(biddingAssetBalance, sym));
    $("#bid-total-amt-dp").attr('bidAmt', totalAmt);
    $("#bid-total-amt-dp").attr('bidPayAmt', payAmt);
  }

  window.calculateBuy = function calculateBuy(feePercentage) {
    var price = $('#buy_price').attr('price');
    var qty = $('#buy_qty').val().replace(/[^0-9]/g, '') || 0;
    var payAmt = multipliedBy(price, qty)
    var serviceFee = percentageOf(feePercentage, payAmt);
    var totalAmt = plusNum(payAmt, serviceFee);
    $("#buy-amt-dp").html(numToString(serviceFee))
    $("#buy-total-amt-dp").html(numToString(totalAmt));
    $("#buy-total-amt-dp").attr('buyAmt', numToString(totalAmt));
  }


  window.calculateBidExec = function calculateBuy(thisBid) {
    var payAmt = thisBid.attr('price');
    var qty = thisBid.attr('qty');
    var serviceFee = $('#SellerserviceFee').text();
    var serviceFee = percentageOf(serviceFee, payAmt);
    var totalAmt = minusNum(payAmt, serviceFee);
    $("#execServiceFee").html(numToString(serviceFee));
    if ($('#executeBidRoyaltyFee').attr('royaltyPercentage')) {
      var royaltyFeePer = $('#executeBidRoyaltyFee').attr('royaltyPercentage')
      var royaltyFee = percentageOf(royaltyFeePer, payAmt)
      $("#executeBidRoyaltyFee").html(royaltyFee);
      var totalAmt = minusNum(totalAmt, royaltyFee);
    }
    $("#executeBidFinalAmt").html(numToString(totalAmt));
  }

  $(document).on("click", ".change-price", function () {
    $(".change-price-modal-title").text($(this).text())
  })

  // Collection - Detail page buy and Place bid button action
  $(document).on("click", ".show-login-message", function (e) {
    toastr.error('Please connect your wallet to proceed.')
    e.preventDefault();
  });

  $(document).on("click", ".createContractClose", function (e) {
    $("#collectionCreateForm :input").prop("disabled", false);
  });
  $(document).on('click', '.chooseCollectionType', function (e) {
    if($(this).val() == 'create') {
      // $('#lazy_minting').hide()
      $('#chooseMintType_mint').prop('checked', true)
    }else {
      // $('#lazy_minting').show()
    }
  });
})
