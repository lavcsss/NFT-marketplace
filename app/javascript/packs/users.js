
   $(document).ready(function(){
    $(".close-top-notify").click(function(){
      $(".main").addClass("close-nav");
    });
  });

  $(document).ready(function(){
     $(".follow-no-user").click(function(){  
        toastr.error('Please connect your wallet to proceed.');
     })
  }
  );
  
  $(document).ready(function(){
     $(".copy_address").click(function(){
        var copyText = document.getElementById("address").innerText;
        var dummyText = document.createElement('input');
        document.body.appendChild(dummyText);
        dummyText.value = copyText;
        dummyText.select();
        document.execCommand("copy", false);
        dummyText.remove();
        toastr.success('Address Copied Successfully!')
     });

     $(document).on("click", "#kyc-submit", function (e) {
         e.preventDefault()
         var form = $("#kycDetailCreateForm")[0]
         var country = $('#country').val();
         var name = $('#name').val();
         var email = $('#email_id').val();
         var address = $('#address').val();
         var mobile_no = $('.PhoneInputInput').val();
         if (form.checkValidity()){
            var isValidEmail = validateEmail($('#email_id').val());
            if (!isValidEmail){
               return toastr.error('Please enter an valid email id');
            }else if (address.length < 10){
               return toastr.error('Address is too short (minimum is 10 characters)');
            }
            else{
            $(".loading-gif").show();
            setTimeout(function() {
               $("#submitKycDetail").trigger("click");
               calculateBuyFiatAmt();
               $(".loading-gif").hide();
               toastr.success("User details saved, successfully")
               window.show_modal('#Fiat-modal', false)
            }, 1000);
            }
         }else{
         if (address === ''){
            toastr.error('Please enter your address');
         }if (mobile_no === ''){
         toastr.error('Please enter your mobile number');
         }if (email === ''){
            toastr.error('Please enter your email id');
         }if (name === ''){
            toastr.error('Please enter your name');
         }if (country  == 'ZZ'){
            toastr.error('Please select a country');
         }
         }
     });

  });

  window.openTabs = function openTabs(evt, tabName, ) {
        var i, tabcontent, tablinks, activityElement, current_tab ;
        tabcontent = document.getElementsByClassName("tabcontent");
        current_tab = document.getElementsByClassName(tabName);
        for(var i = 0; i < current_tab.length; i++){
            if (current_tab[i].classList.contains('active')){
               return '';
            }
         }
        for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
        if (tabName != "activity-mob")
        {   
            activityElement = document.getElementById("activity-mob");
            activityElement.classList.add('active');
        }
        else{
        activityElement = document.getElementById("activity-mob");
        activityElement.classList.remove('active');
        }
        fetchTabContent(tabName);
  }

  window.fetchTabContent = function fetchTabContent(tabName, page_no=1){
   var load_tabs = document.getElementById("load_tabs").innerText;
    if (!['About', 'following', 'followers', 'activity', 'following-mob', 'followers-mob'].includes(tabName)){
        if (page_no === 1){
        $(".loading-gif").show();
        setTimeout(function(){
            $.ajax({
                url: load_tabs,
                type: "get",
                data: {"tab": tabName, page_no: page_no},
                dataType: "script",
            })
        }, 200);
         }else{
         $.ajax({
            url: load_tabs,
            type: "get",
            data: {"tab": tabName, page_no: page_no},
            dataType: "script",
         })}
    }else if (['following', 'followers', 'activity', 'following-mob', 'followers-mob'].includes(tabName)){
      $.ajax({
         url: load_tabs,
         type: "get",
         data: {"tab": tabName, page_no: page_no},
         dataType: "script",
     })
    }
  }
  
  
  $(document).ready(function(){
     $(document).mouseup(e => {
        if ($('#activity').is(e.target) || $("#activity-tab").is(e.target))
        {  
           $("#activity").toggleClass("active");
           $("#following").removeClass("active");
           $('#following-dropdown').removeClass("active");
           $("#followers").removeClass("active");
           $('#followers-dropdown').removeClass("active");
        }
        else if ($('#following').is(e.target))
        {  
           $("#following").toggleClass("active");
           $("#activity").removeClass("active");
           $('#activity-dropdown').removeClass("active");
           $("#followers").removeClass("active");
           $('#followers-dropdown').removeClass("active");

        }
        else if ($('#followers').is(e.target))
        {  
           $("#followers").toggleClass("active");
           $("#activity").removeClass("active");
           $('#activity-dropdown').removeClass("active");
           $("#following").removeClass("active");
           $('#following-dropdown').removeClass("active");
        }
        else 
        {  
           $("#activity").removeClass("active");
           $('#activity-dropdown').removeClass("active");
           $("#following").removeClass("active");
           $('#following-dropdown').removeClass("active");
           $("#followers").removeClass("active");
           $('#followers-dropdown').removeClass("active");
        }
     });
     
     $(document).on("click", ".close-btn", function (e) {
      $(".User_following-list").removeClass("active");
     })

     $(document).on("click", ".user-dashboard-load-more", function (e) {
         var tabs = document.getElementById("current_tab").innerText.trim();
         if (tabs == 'nft_collections'){
            $(".loading-gif").show();
         }
         fetchTabContent(tabs, $(this).data("page-no"))
     })

  });

  window.followUser = function followUser(view){

     var followPath = document.getElementById("follow_path").innerText;
     var request =  $.ajax({
     url: followPath,
     type: "post",
     dataType: "json",
     })
     request.done(function (response) {
        if(response.status = 'success'){
           if (view == "web-view"){
              $(".follow-tag").replaceWith('<a onclick="unFollowUser(\'web-view\')" class="unfollow-tag"><span class="edit-profile follow-btn unfollow-btn">Unfollow</span></a>');
           }
           else{
              $(".follow-tag").replaceWith('<a onclick="unFollowUser(\'mob-view\')" class="unfollow-tag">Unfollow </a>')
           }
           updateCount("following-count", response.following_count);
           updateCount("followers-count", response.followers_count);
           toastr.success('Following successful')
        }});
        request.fail(function () {
        toastr.error('Something Went Wrong!')
        }); 
  }

  window.unFollowUser = function unFollowUser(view){

     var unFollowPath = document.getElementById("unfollow_path").innerText;
     var request =  $.ajax({
     url: unFollowPath,
     type: "post",
     dataType: "json",
     })
     request.done(function (response) {
        if(response.status = 'success'){
           if (view == "web-view"){
              $(".unfollow-tag").replaceWith('<a onclick="followUser(\'web-view\')" class="follow-tag"><span class="edit-profile follow-btn">Follow</span></a>');
           }
           else{
              $(".unfollow-tag").replaceWith('<a onclick="followUser(\'mob-view\')" class="follow-tag">Follow </a>')  
           }
           updateCount("following-count", response.following_count);
           updateCount("followers-count", response.followers_count);
           toastr.success('Unfollowed successful')
        }});
        request.fail(function () {
        toastr.error('Something Went Wrong!')
        }); 
  }
  
  function updateCount(className, count){
     var html = `<span class="${className}"> (${count})</span>`;
     $(`.${className}`).replaceWith(`${html}`);
  }
  
  

 
