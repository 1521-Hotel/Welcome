// JavaScript Document
// Author Name: Saptarang
// Themeforest: http://themeforest.net/user/saptarang?ref=saptarang
// Creation Date: 9 Nov, 2016

( function ( $ ) {
'use strict';

	//full height divs
	var winW = $(window).innerWidth();
	var canvas = $('body');
	if( winW >= 769 ) {
		var winH = $(window).innerHeight();
		$('.slideshow, .slideshow img, .content').css("height", winH);
	} else {
		var navClone = $('.nav').clone();
		$('.slideshow').append(navClone);
		$('.container-wide > .nav').hide();
		$('.slideshow').css('overflow', 'visible');
		$('.nav').css('top', '100%');
	}
	var lastWidth = $(window).width();
	$(window).resize(function(){
		if($(window).width()!=lastWidth){
			lastWidth = $(window).width();
			location.href = location.href;
		}
	});
	
	// Menu
	$('.nav a').on("click", function(event){
		var hasClass = $(this).hasClass('active');
		if( hasClass ) {
			event.preventDefault();
		} else {
			var aHash = $(this).attr('href');
			var thisHash = $(aHash).position().top;
			event.preventDefault();
			$(".content-wrapper").animate({
				scrollTop: thisHash
			}, 1000 );
			$('.content-wrapper > div').removeClass('visible');
			$(aHash).addClass('visible');
			// active class
			$('.nav a').removeClass('active');
			$(this).addClass('active');
		}
	});
	
	// WOW - animated content
	var wow = new WOW(
		{
			animateClass: 'animated', // default
			offset:       0,          // default
			mobile:       false,       // set false if you dont want animation on mobile phones
			live:         true        // default
		}
	);
	wow.init();
	
	// OWL CAROUSEL
	$("#Slider").owlCarousel({
		autoPlay: 15000, //Set AutoPlay speed
		items : 1,
		itemsDesktop : [1400,1],
		itemsDesktopSmall : [979,1],
		itemsTablet : [768,1],
		itemsMobile : [600,1],
		navigation : false, // Show next and prev buttons
		navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		pagination: true,
		transitionStyle : "fade"
	});
	
	// Input placeholder in IE
	$('input, textarea').placeholder();
	
	// Slider Validation
	$( "#cfSlide" ).slider({
		value:1,
		min: 1,
		max: 30,
		step: 1,
		slide: function( event, ui ) {
			$( "#cfsVal" ).val( ui.value );
			var sval = $( "#cfsVal" ).val();
			if( sval == 30 ) {
				$('#cfSubmit').removeAttr("disabled");
			} else {
				$('#cfSubmit').attr('disabled', 'disabled');
			}
		}
	});
	
	// Contact form
	$("#cfSubmit").on("click", function() { 
		var proceed = true;
		var output = '';
		$("#cForm input[required], #cForm textarea[required]").each(function(){
			$(this).css('border-color',''); 
			if( !$.trim( $(this).val() ) ){ 
				$(this).css('border-color','red');  
				proceed = false;
			}
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if( $(this).attr("type")=="email" && !email_reg.test( $.trim( $(this).val() ) ) ){
				$(this).css('border-color','red'); 
				proceed = false;              
			}   
		});
		if( proceed ){
			var post_data = {
			'name'     		: $('input[name=name]').val(), 
			'email'    		: $('input[name=email]').val(), 
			'phone'  		: $('input[name=phone]').val(),
			'message'       : $('textarea[name=message]').val(),
			'domain'		: $(location).attr('href')
		}
		
		//Ajax post data to server
		$.post('form/contact.php', post_data, function(response){  
			if(response.type == 'error'){ 
				//load json data from server and output message     
				output = '<div class="alert alert-error alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+response.text+'</div>';
			}else{
				output = '<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+response.text+'</div>';
				//reset values in all input fields
				$("#cForm  input[required=true], #cForm textarea[required=true]").val(''); 
				$(".cfs_response").slideUp(); //hide form after success
			}
				$(".cfs_response").hide().html(output).slideDown();
			}, 'json');
		}
	});
	
	//reset previously set border colors and hide all message on .keyup()
	$("#cForm  input[required=true], #cForm textarea[required=true]").keyup(function() { 
		$(this).css('border-color',''); 
		$(".cfs_response").slideUp();
	});
	
} ( jQuery ) );