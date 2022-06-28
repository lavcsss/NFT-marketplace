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


  $(document).on('click', '#followers', function () {
    var url = document.getElementById("followers_path").innerText;
    
    $.ajax({
      url: url,
      type: "get",
      dataType: "script",
      data: {}
    })
  })



  $(document).on('click', '#following', function () {
    var url = document.getElementById("following_path").innerText;
    $.ajax({
      url: url,
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
  var moretext = "Read more";
  var lesstext = "Read less";

  $('.textControl').each(function() {
     var content = $(this).html();

     if(content.length > showChar) {

           var c = content.substr(0, showChar) + "...";
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
});

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
}