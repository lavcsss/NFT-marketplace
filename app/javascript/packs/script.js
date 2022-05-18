import { ethers } from "ethers";

$(document).ready(function(){

	window.ethers = ethers;
  setProvider();

  if (window.ethers && window.ethers.providers.Web3Provider) {
     checkNetwork();
  }

 function setProvider() {
    window.provider = new ethers.providers.Web3Provider(window.ethereum);
  }

	async function checkNetwork() {
    if (window.ethers && window.ethers.providers.Web3Provider) {
        const network = await provider.getNetwork();
        console.log("network name  " + network["name"])
        if (network["name"] === 'rinkeby'){
           $(".loading-gif-network").hide();
            loadBalance();
        } else {
           $(".loading-gif-network").show();
        }
    }
	}

	window.addEventListener("ajax:before", (e) => {
		$(".loading-gif").show();
		$('body').css('overflow','hidden');
	});

	window.addEventListener("ajax:complete", (e) => {
		$(".loading-gif").hide();
		$('body').css('overflow','auto');
	});

	$(document).on("change", ".localeChange", function () {
		window.location.href = "/?locale=" + $(".localeChange option:selected").val()
	})

	$('#header-carousel').owlCarousel({
		loop: true,
		margin: 10,
		dots: false,
		nav: true,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	});

	// toastr.options = {
	// 	newestOnTop: true,
	// 	progressBar: true
	// }

	// $( ".cross" ).hide();
	// //$( ".menu" ).hide();
	// $( ".hamburger" ).click(function() {
	// 	$( ".menu" ).slideToggle( "slow", function() {
	// 		$( ".hamburger" ).hide();
	// 		$( ".cross" ).show();
	// 	});
	// });

	// $( ".cross" ).click(function() {
	// 	$( ".menu" ).slideToggle( "slow", function() {
	// 		$( ".cross" ).hide();
	// 		$( ".hamburger" ).show();
	// 	});
	// });

	// // header carousel 

	// $('.filters ul li').click(function(){
	//   $('.filters ul li').removeClass('active');
	//   $(this).addClass('active');
	  
	//   var data = $(this).attr('data-filter');
	//   $grid.isotope({
	//     filter: data
	//   })
	// });

	// var $grid = $(".grid").isotope({
	//   itemSelector: ".all",
	//   percentPosition: true,
	//   masonry: {
	//     columnWidth: ".all"
	//   }
	// });

	function readURL(input, previewId) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();
	        reader.onload = function(e) {
	            $(previewId).css('background-image', 'url('+e.target.result +')');
	            $(previewId).hide();
	            $(previewId).fadeIn(650);
	        }
	        reader.readAsDataURL(input.files[0]);
	    }
	}
	
	$("#imageUpload").change(function() {
	  readURL(this, '#imagePreview');
	});

	$("#bannerUpload").change(function() {
		readURL(this, '#bannerPreview');
	});

	function readURLSingle(input, file, previewSection, imagePreview, closePreviewBtn, placeholder, fileId, chooseFile, coverImg) {
		var ftype = file.type;
		var fsize = file.size / 1024 / 1024; // in MBs
		var validFileSize = coverImg ? 30 : 100;
    if (fsize > validFileSize) {
			return toastr.error(`Invalid file size!. Must be less than ${validFileSize}MB`);
		}
		var imgExt = ['image/png', 'image/jpeg', 'image/gif'];
		var audExt = ['audio/mp3', 'audio/webm', 'audio/mpeg'];
		var vidExt = ['video/mp4', 'video/webm'];
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				if (imgExt.includes(ftype)) {
					previewSection.css('background-image', 'url('+e.target.result +')');
					previewSection.css({ 
						'width': '100%', 
						'height': '225px',
						'border-radius': '15px', 
						'background-size': 'cover',
						'background-repeat': 'no-repeat',
						'background-position': 'center',
						'margin-left': 'auto',
						'margin-right': 'auto',
					});
					previewSection.hide();
					previewSection.fadeIn(650);
					imagePreview.css('background-image', 'url('+e.target.result +')');
					imagePreview.css({ 'height': '225px' });
				} else if (coverImg) {
					return toastr.error('Invalid file type!');
				} else if (audExt.includes(ftype)) {
					$('.coverUpload').removeClass("hide");
					$('#file-2').prop('required', true);
					previewSection.hide();
					previewSection.fadeIn(650);
					imagePreview.html('<audio width="300" height="300" controls><source src="mov_bbb.mp4" id="audio_here"> </audio>');
					imagePreview.css({ 'height': '55px' });
					$('#audio_here')[0].src = URL.createObjectURL(input.files[0]);
					$('#audio_here').parent()[0].load();
				} else if (vidExt.includes(ftype)) {
					$('.coverUpload').removeClass("hide");
					$('#file-2').prop('required', true);
					previewSection.hide();
					previewSection.fadeIn(650);
					imagePreview.html('<video width="300" height="200" controls><source src="mov_bbb.mp4" id="video_here"> </video>');
					imagePreview.css({ 'height': '225px' });
					$('#video_here')[0].src = URL.createObjectURL(input.files[0]);
					$('#video_here').parent()[0].load();
				} else {
					return toastr.error('Invalid file type!');
				}
				imagePreview.css({ 
					'width': '300px', 
					'background-size': 'cover',
					'background-repeat': 'no-repeat',
					'background-position': 'center',
					'margin-left': 'auto',
					'margin-right': 'auto',
					'border-radius': '15px'
				});
				closePreviewBtn.css('display', 'inline-block');
				placeholder.fadeOut(100);
				fileId.fadeOut(100);
				chooseFile.fadeOut(100);
				imagePreview.hide();
				imagePreview.fadeIn(650);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	$("#file-1").change(function(e) {
		var file = e.currentTarget.files[0];
		var previewSection = $('#my-preview-section');
		var imagePreview = $('#imagePreviewRes');
		var closePreviewBtn = $('#close-preview-button');
		var placeholder = $('#placeholder');
		var fileId = $('#file-1');
		var chooseFile = $('#choose_file_selected');
		readURLSingle(this, file, previewSection, imagePreview, closePreviewBtn, placeholder, fileId, chooseFile, false);
	});

	$("#file-2").change(function(e) {
		var file = e.currentTarget.files[0];
		var previewSection = $('#my-preview-section');
		var imagePreview = $('#imagePreviewRes2');
		var closePreviewBtn = $('#close-preview-button2');
		var placeholder = $('#placeholder2');
		var fileId = $('#file-2');
		var chooseFile = $('#choose_file_selected2');
		readURLSingle(this, file, previewSection, imagePreview, closePreviewBtn, placeholder, fileId, chooseFile, true);
	});

	$("#nft_contract_attachment").change(function(e) {
		var file = e.currentTarget.files[0];
		var imagePreview = $('#imagePreview-contract');
		var closePreviewBtn = $('#close-preview-button-contract');
		var fileId = $('#nft_contract_attachment');
		ShowPreviewSmall(this,file,imagePreview,closePreviewBtn,fileId)
	});

	$("#nft_contract_cover").change(function(e) {
		var file = e.currentTarget.files[0];
		var imagePreview = $('#imageCover-contract');
		var closePreviewBtn = $('#close-cover-button-contract');
		var fileId = $('#nft_contract_cover');
		ShowPreviewSmall(this,file,imagePreview,closePreviewBtn,fileId)
	});

	function ShowPreviewSmall(input,file,imagePreview,closePreviewBtn,fileId){
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(event){
			imagePreview.css('background-image', 'url('+event.target.result +')');
			imagePreview.css({ 'height': '225px' });
			imagePreview.css({ 
						'width': '300px', 
						'background-size': 'cover',
						'background-repeat': 'no-repeat',
						'background-position': 'center',
						'margin-left': 'auto',
						'margin-right': 'auto',
						'border-radius': '15px'
					});
			}
			reader.readAsDataURL(file);
			closePreviewBtn.css('display', 'inline-block');
			fileId.fadeOut(100);
			imagePreview.hide();
			imagePreview.fadeIn(650);
		}
	}

	$('#close-preview-button-contract').click(function(){
		var imagePreview = $('#imagePreview-contract');
		var closePreviewBtn = $('#close-preview-button-contract');
		var fileId = $('#nft_contract_attachment');
		ClosePreviewSmall(imagePreview,closePreviewBtn,fileId)
	});

	$('#close-cover-button-contract').click(function(){
		var imagePreview = $('#imageCover-contract');
		var closePreviewBtn = $('#close-cover-button-contract');
		var fileId = $('#nft_contract_cover');
		ClosePreviewSmall(imagePreview,closePreviewBtn,fileId)
	});

	function closePreview(previewSection, imagePreview, closePreviewBtn, placeholder, fileId, chooseFile) {
		fileId.val('');
		placeholder.fadeIn(100);
		fileId.fadeIn(100);
		chooseFile.fadeIn(100);
		chooseFile.html('Choose file');
		imagePreview.css({ 
			'width': 'auto', 
			'height': 'auto', 
			'background-size': 'cover',
			'background-repeat': 'no-repeat',
			'background-position': 'center',
			'margin-left': 'auto',
			'margin-right': 'auto'
		});
		closePreviewBtn.css('display', 'none');
		imagePreview.css('background-image', 'none');
		imagePreview.html('');
		previewSection.css('background-image', 'none');
		previewSection.html('');
	}

	$('#close-preview-button').click(function(){
		var previewSection = $('#my-preview-section');
		var imagePreview = $('#imagePreviewRes');
		var closePreviewBtn = $('#close-preview-button');
		var placeholder = $('#placeholder');
		var fileId = $('#file-1');
		var chooseFile = $('#choose_file_selected');
		closePreview(previewSection, imagePreview, closePreviewBtn, placeholder, fileId, chooseFile);
		$('.coverUpload').addClass("hide");
		$('#file-2').prop('required', false);
	});

	$('#close-preview-button2').click(function(){
		var previewSection = $('#my-preview-section');
		var imagePreview = $('#imagePreviewRes2');
		var closePreviewBtn = $('#close-preview-button2');
		var placeholder = $('#placeholder2');
		var fileId = $('#file-2');
		var chooseFile = $('#choose_file_selected2');
		closePreview(previewSection, imagePreview, closePreviewBtn, placeholder, fileId, chooseFile);
	});

	// $('input[name=chooseCollection]').change(function(){
	//     var value = $( 'input[name=chooseCollection]:checked' ).val();
	//     alert(value);
	// });

	$('#token-maximize').click(function(){
		$('.token-section').addClass('main-div-js-element');
		$('.display-section-heart-maximize').css('display','none');
		$('.display-section-heart-minimize').css('display','block');
		$('.heading-token-details-mm').css('display','block');
		$('.token-image').addClass('img-div-js-element');
		$('.token-image img').addClass('img-js-element');
		$('.image_get_attachment').addClass('height-auto-token');
	});

	$('#token-minimize').click(function(){
		$('.token-section').removeClass('main-div-js-element');
		$('.display-section-heart-maximize').css('display','flex');
		$('.display-section-heart-minimize').css('display','none');
		$('.heading-token-details-mm').css('display','none');
		$('.token-image').removeClass('img-div-js-element');
		$('.token-image img').removeClass('img-js-element');
		$('.image_get_attachment').removeClass('height-auto-token');
	});

	// search input field

	// $("#searchInput").focus(function () {
  
	//     $("#searchInput").css({
	//       "display": "inline",
	//       "width": "90%",
	//       "border": "1px solid #40585d",
	//       "opacity": "1",
	//       "padding": "8px 20px 8px 20px",
	//       "background-image": "none",
	//       "box-shadow": "0 0 1px black"
	//     });
	//     $("#submitsearch").css("display", "inline");
	   
	//     $("#searchInput").prop("placeholder", "");
 //    });


 	// menu 

 	// $('.testValActivity').click(function(){
 	// 	setTimeout(function(){
 	// 		var testActivityHeight = $('.force-overflow-activity.testActivityHeight').height();
 	// 		if (testActivityHeight > 450) {
	// 			$(".scrollbar-activity.parentActivityHeight").addClass("introFollowing");
	// 		}
 	// 	}, 500);
 	// });

 	// $('.testValFollowing').click(function(){
 	// 	setTimeout(function(){
    //   		var testFollow = $('.force-overflow.following').height();
	// 		if (testFollow > 450) {
	// 			$(".scrollbar.custom-display-scrollbar.following").addClass("introFollowing");
	// 		}
    // 	}, 500);
 	// });

 	// $('.testValFollower').click(function(){
 	// 	setTimeout(function(){
    //   		var testFollowOne = $('.force-overflow.followers').height();
	// 		if (testFollowOne > 450) {
	// 			$(".scrollbar.custom-display-scrollbar.followers").addClass("introFollowing");
	// 		}
    // 	}, 500);
 	// });

 	// $(".chosen-select").chosen();
 	// var randomCustom = $('#randomCustom').height();
 	// $('#sticky-collection').css('height',randomCustom);
  //   if (testFollow > 450) {
  //    $(".scrollbar.custom-display-scrollbar.following").addClass("introFollowing");
  //   }

    // const img = new Image();
	// img.onload = function() {
	//   //alert(this.width + 'x' + this.height);
	//   var imgWidth = this.width;
	//   var imgHeight = this.height;
	//   if (imgWidth > 450) {
	//     $('img.img-responsive.inTermImage').css({
	//       'width' : '51%',
	//     });
	//   }
	//   // $('.token-image').css({
	//   // });
	// }
	// var inTermImage = $('.inTermImage').attr('src');
	// img.src = inTermImage;

	// var tokenImage = $('.token-image').height();

	// if (tokenImage > 450) {
	// 	$('img.img-responsive.inTermImage').css({
	// 	  'width' : '60%',
	// 	});
	// }

	// $(document).on('change', '.topUsers',function(){
	// 	$.ajax({
	// 		url: '/top_buy_sell',
	// 		dataType: 'script',
	// 		data: {user_type: this.id, days: $(this).val()},
	// 		type: 'GET'
	// 	})
	// });

	// // Hot bids carousel
	// $('#hot-bids-carousel').owlCarousel({
	// 	loop: true,
	// 	dots: false,
	// 	nav: true,
	// 	margin: 10,
	// 	responsive: {
	// 		0: {
	// 			items: 1
	// 		},
	// 		600: {
	// 			items: 2
	// 		},
	// 		767: {
	// 			items: 3
	// 		},
	// 		991: {
	// 			items: 4
	// 		},
	// 		1330: {
	// 			items: 5
	// 		}
	// 	}
	// });

	// async function checkNetwork(){
	// 	if (window.web3 && window.web3.eth && window.ethereum) {
	// 		var network = await web3.eth.net.getNetworkType()
	// 		if (network === 'rinkeby'){
	// 			$(".loading-gif-network").hide();
	// 			loadBalance()
	// 		} else {
	// 			$(".loading-gif-network").show();
	// 		}
	// 	}
	// }

	function loadBalance() {
	if (window.ethers && window.ethers.providers.Web3Provider) {
			window.updateEthBalance();
		}
	}

	window.clearToastr = async function clearToastr() {
		$('.toast').remove();
	}

	setInterval(function() {
		checkNetwork()
	}, 10000);

	window.show_modal = async function show_modal(id) {
		$.magnificPopup.open({
			closeOnBgClick: false ,
			enableEscapeKey: false,
			items: {
				src: id
			},
			type: 'inline'
		});
	}

	$(".readmore-btn").click(function(){
		$(".short_content").css("display","none");
		$('.full_content').css("display","block");
		$(this).css("display","none");
		$('.readless-btn').css("display","block");
		var randomCustom = $('#randomCustom').height();
		$('#sticky-collection').css('height', randomCustom);
	});
	$(".readless-btn").click(function(){
		$(".full_content").css("display","none");
		$('.short_content').css("display","block");
		$(this).css("display","none");
		$('.readmore-btn').css("display","block");
		var randomCustom = $('#randomCustom').height();
		$('#sticky-collection').css('height', randomCustom);
	});

	var randomCustom = $('#randomCustom').height();
	$('#sticky-collection').css('height', randomCustom);

	setTimeout(function(){
		$('.alter-gif-loader').css('display','none');
		$('body').removeClass('overflow-hidden-custom');
	}, 500);

});
