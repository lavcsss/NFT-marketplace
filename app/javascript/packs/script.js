import { ethers } from "ethers";

$(document).ready(function(){

	window.ethers = ethers;
//   setProvider();

  if (window.ethers && window.ethers.providers.Web3Provider) {
     checkNetwork();
  }

 function setProvider() {
    window.provider = new ethers.providers.Web3Provider(window.ethereum);
  }

	async function checkNetwork() {
    if (window.ethers && window.ethers.providers.Web3Provider) {
        const network = await getNetworkType();
        if (parseInt(network['chainId']) === 5){
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
		var validFileSize = coverImg ? 30: 15;
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
					imagePreview.css({ 'height': '610px' });
					$('.formbold-drop-file').hide();
					// document.getElementById("drop-img").className = "drop-file-img";  

				} else if (coverImg) {
					return toastr.error('Invalid file type!');
				} else if (audExt.includes(ftype)) {
					$('.coverUpload').removeClass("hide");
					$('#file-2').prop('required', true);
					previewSection.hide();
					previewSection.fadeIn(650);
					imagePreview.html('<audio width="300" height="300" controls controlslist="nodownload noplaybackrate"><source src="mov_bbb.mp4" id="audio_here"> </audio>');
					imagePreview.css({ 'height': '55px' });
					$('#audio_here')[0].src = URL.createObjectURL(input.files[0]);
					$('#audio_here').parent()[0].load();
					$('.codrops-header_innertab').css('height', '300px');
				} else if (vidExt.includes(ftype)) {
					$('.coverUpload').removeClass("hide");
					$('#file-2').prop('required', true);
					previewSection.hide();
					previewSection.fadeIn(650);
					imagePreview.html('<video width="300" height="200" controls controlslist="nodownload noremoteplayback noplaybackrate" disablepictureinpicture="disablepictureinpicture"><source src="mov_bbb.mp4" id="video_here"> </video>');
					imagePreview.css({ 'height': '225px' });
					$('#video_here')[0].src = URL.createObjectURL(input.files[0]);
					$('#video_here').parent()[0].load();
					$('.codrops-header_innertab').css('height', '300px');
				} else {
					return toastr.error('Invalid file type!');
				}
				imagePreview.css({ 
					'width': '540px', 
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
				$("#validation-info").css('display', 'none');
				$('#drop-img').css('display', 'none');

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
		closePreviewSmall(imagePreview,closePreviewBtn,fileId)
	});

	$('#close-cover-button-contract').click(function(){
		var imagePreview = $('#imageCover-contract');
		var closePreviewBtn = $('#close-cover-button-contract');
		var fileId = $('#nft_contract_cover');
		closePreviewSmall(imagePreview,closePreviewBtn,fileId)
	});

	function closePreviewSmall(imagePreview, closePreviewBtn, fileId){
		fileId.val('');
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
		fileId.css('display', 'block');
	}

	function closePreview(previewSection, imagePreview, closePreviewBtn, placeholder, fileId, chooseFile, isCoverPreview=false) {
		fileId.val('');
		placeholder.fadeIn(100);
		fileId.fadeIn(100);
		chooseFile.fadeIn(100);
		chooseFile.html('Browse');
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
		if (!isCoverPreview){
			$("#validation-info").css('display', 'block');
			$('.formbold-drop-file').show();
		}
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
		$("#validation-info").css('display', 'none');
		$('.codrops-header_innertab').css('height', '300px');
		$('#drop-img').css('display', 'none');
		closePreview(previewSection, imagePreview, closePreviewBtn, placeholder, fileId, chooseFile, true);
	});

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

	window.show_modal = async function show_modal(id, showCloseBtn=true) {
		$.magnificPopup.open({
			closeOnBgClick: false ,
			enableEscapeKey: false,
			showCloseBtn:showCloseBtn,
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
