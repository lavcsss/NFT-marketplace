import {symbol} from "prop-types";

$(document).ready(function () {
  $(document).on('click', '.view-notification', function () {
    $.ajax({
      url: "/notifications",
      type: "get",
      dataType: "script",
      data: {}
    })
  })



  $(document).on('click', '.notify-inbox-message .close-icon', function () {
    $("body").removeClass("open-modal");
    $(".notify-inbox-message").removeClass("open-modal");
  });

  

  $(document).on('click', '.dark-theme-slider', function () {
    lightSelected = $(this).hasClass('lightTheme');
    document.getElementById('themeChange').setAttribute('href', lightSelected ? 'dark' : '');
  });

  $(document).on('click', '.copyUserAddress', function () {
    var copyText = document.getElementById("userAddress");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    toastr.success('Copied successfully.')
  });

  $(document).on("click", ".dashboard-load-more", function (e) {
    $.ajax({
      url: "/category_filter",
      type: "get",
      dataType: "script",
      data: {page_no: $(this).data("page-no"), category: $(this).data("category"), sort_by: $(this).data("sort-by")}
    })
  });

  $(document).on("click", ".collection-load-more", function (e) {
    $.ajax({
      url: "/collections_list",
      type: "get",
      dataType: "script",
      data: {page_no: $(this).data("page-no"), id: $("#collection_address").val()}
    })
  });




  $(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      $(".dashboard-load-more").click()
      $(".user-load-more").click()
    }
  });

  $(".scrollbar-activity").scroll(function() {
    if ($(".scrollbar-activity").scrollTop() > $(".overall-activities").height() - $(".scrollbar-activity").height()) {
      $(".common-activity-load-more").click()
    }

  })

  $(document).on("click", ".user-load-more", function (e) {
    $.ajax({
      url: "/users/load_tabs",
      type: "get",
      dataType: "script",
      data: {id: $(this).data("id"), page_no: $(this).data("page-no"), tab: $(this).data("tab")}
    })
  });

  $(document).on("click", ".common-activity-load-more", function (e) {
    $.ajax({
      url: "/load_more_activities",
      type: "get",
      dataType: "script",
      data: {id: $(this).data("id"), page_no: $(this).data("page-no"), tab: $(this).data("tab")}
    })
  });

  $(document).on("click", ".dashboard-sort-by", function(e) {
    e.preventDefault()
    var dataParam = {}
    if ($(".top-filter li.active a").data("name")) {
      dataParam["category"] = $(".top-filter li.active a").data("name")
    }

    if ($(this).data("name")) {
      dataParam["sort_by"] = $(this).data("name")
    }

    $.ajax({
      url: "/category_filter",
      type: "get",
      dataType: "script",
      data: dataParam
    })
  })
  preventNegativeNumbers(document.getElementById('royalties'));
  preventNegativeNumbers(document.getElementById('instant-price'));
  preventNegativeNumbers(document.getElementsByClassName('only-numbers'));
});

$(document).ready(function() {
  $(function () {
     $(".morelink").trigger( "click");
  });
  var showChar = 130;  
  var moretext = "...Read more";
  var lesstext = "Read less";

  $('.textControl').each(function() {
     var content = $(this).html();

     if(content.length > showChar) {

           var c = content.substr(0, showChar);
           var h = content.substr(showChar, content.length - showChar);
           var html = c + '<span class="morecontent"><span>' + h + '</span><a href="" class="morelink">' + lesstext + '</a></span>';
           $(this).html(html);
     }
  });

  $(".morelink").click(function(){
     if($(this).hasClass("less")) {
           $(this).removeClass("less");
           $(this).html(lesstext);
     } else {
           $(this).addClass("less");
           $(this).html(moretext);
     }
     $(this).parent().prev().toggle();
     $(this).prev().toggle();
     return false;
  });

  $("#rzp-button-order").click(function(e){
    var options = {
    "key": "rzp_test_SvWnVt5D4Uc3AY",
    "amount": 1000, // 2000 paise = INR 20 NOTE:  change to dynamic plan's price
    "name": "Razorpay",
    "description": "NFT Services.",
    "image": "",
    "handler": function (response){
      $('#Fiat-modal').addClass('hide')
      $('.progress').show()
      // $(".triggerInrBuyValidation").click()
      // show_modal('#Follow-steps') 
      $('#Fiat-modal').removeClass('hide')
      $.ajax({
        url: "",
        type: "POST",
        data: {},
        success:function(data) {
          window.href = "";
        }
      });
    },
    "prefill": {
      "name": "test prof"
    },
    "notes": {
    }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
  });

});



window.getUrlParameter = function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.href);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, '    '));
};

function preventNegativeNumbers(inputs){
  if(!inputs) {return;}
  inputs = 'HTMLCollection' === inputs.constructor.name ? Array.from(inputs) : Array.of(inputs)
  inputs.forEach(negativeNumberPrevent)
}

function negativeNumberPrevent(input) {
  input.addEventListener('keypress', function(e) {
    var key = !isNaN(e.charCode) ? e.charCode : e.keyCode;
    function keyAllowed() {
      var keys = [8,9,13,16,17,18,19,20,27,46,48,49,50,
                  51,52,53,54,55,56,57,91,92,93];
      if (key && keys.indexOf(key) === -1)
        return false;
      else
        return true;
    }
    if (!keyAllowed())
      e.preventDefault();
  }, false);
  
  // EDIT: Disallow pasting non-number content
  input.addEventListener('paste', function(e) {
    var pasteData = e.clipboardData.getData('text/plain');
    if (pasteData.match(/[^0-9]/))
      e.preventDefault();
  }, false);

     
  window.validDecimalPoint = function validDecimalPoint(e){
    return e.charCode === 0 || ((e.charCode >= 48 && e.charCode <= 57) || (e.charCode == 46 && document.getElementById("instant-price").value.indexOf('.') < 0));
  }
  
  window.validateEmail = function validEmail(emailId){
      return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId));
  }

  window.validateMobileNumber = function validateMobileNumber(e){
    var value = document.getElementById("mobile_no").value;
    var numberAlone = value.replace(/[^0-9]/g,'');
    var numberValidation = (e.charCode >= 48 && e.charCode <= 57) && (numberAlone.length <= 12);
    var specialcharValidation = [40, 41, 43, 45, 32].includes(e.charCode);
    return (numberValidation || specialcharValidation);
  }

  window.blockSpecialChar = function blockSpecialChar(e){
      var k;
      document.all ? k = e.keyCode : k = e.which;
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 44 && k <= 57));
  }

}