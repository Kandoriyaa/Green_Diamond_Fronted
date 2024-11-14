
var ww = document.body.clientWidth, wh = document.body.clientHeight;
var mobilePort = 800, ipadView = 1024, wideScreen = 1600;


$(document).ready( function(){

// Slide Menu
$('.menuClick').on('click', function(){
    if($('body').hasClass('slide-menu')){
        $('body').removeClass('slide-menu');
    }else  $('body').addClass('slide-menu');    
});
if (ww < 1081){ 
    $('body').addClass('slide-menu')
}

$('.menuClickRight').on('click', function() {
    if ($('.slideMenuRight').hasClass('slide-menu-right')) {
        $('.slideMenuRight').removeClass('slide-menu-right');
    } else {
        $('.slideMenuRight').addClass('slide-menu-right');
    }
    $('.slideMenu').removeClass('slide-menu');
});

// $('.menuClick').on('click', function(){
//     $('body').toggleClass('slide-menu');  
// });

// if (ww < 1081){ 
//     $('body').addClass('slide-menu')
// }
// if (ww > 1081){ 
//     $('body').removeClass('slide-menu')
// }

// if (ww > 1081){ 
// 	$('.menuClick').on('click', function(){
// 		if($('body').hasClass('slide-menu')){
// 			$('body').removeClass('slide-menu');
// 		}else  $('body').addClass('slide-menu');    
// 	});
// }

// if (ww < 1080){ 
//     $('.menuClick').on('click', function(){
// 		if($('body').hasClass('slide-menu')){
// 			$('body').removeClass('slide-menu');
// 		}else  $('body').addClass('slide-menu');    
// 	});
// }

// Slide Up and Down accordion
if( $(".accordionMenu").length){
	$('.accordionMenu .accord-detail').hide();
	//$(".accordionMenu .accord-detail:first").show(); 
	//$(".accordionMenu .acclink:first").addClass("active");	
	$('.accordionMenu .acclink').click(function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next().slideUp();
		} else {				
			$('.accordionMenu .acclink').removeClass('active');
			$('.accordionMenu .accord-detail').slideUp();

			$(this).addClass('active');			   
			$(this).next().slideDown();
		}
		return false;
	});
};

// Sticky Header with blur
// window.onscroll = function() {
//     if (ww > 1023){ 
//     var geturl = window.location.href;
//     if (window.scrollY > 44) {
//         $('.header').css({
//             'background-color':'rgb(250 250 250 / 90%)',
//             'backdrop-filter': 'blur(10px)',            
//             'transition-duration':'0.5s'
//         },300)
//         $(".header").addClass("sticky");
//     }else{
//         $('.header').css({
//             'background-color':'rgb(242 241 234 / 0%)',
//             'backdrop-filter': 'blur(0px)',            
//             'transition-duration':'0.5s'            
//         },300)
//         $(".header").removeClass("sticky");
//     }
//     }
// };


// Add Class in Table
if( $(".tableData").length > 0){
	$('.tableData').each(function(){
		$(this).wrap('<div class="tableOut"></div>');
		$(this).find('tr').each(function(){
		$(this).find('td:first').addClass('firstTd');
		$(this).find('td:last').addClass('lastTd');
		$(this).find('th:first').addClass('firstTh');
		$(this).find('th:last').addClass('lastTh');
		});
		$(this).find('tbody tr:first').addClass('firstTr');
		$(this).find('tr:last').addClass('lastTr');
			
		$(this).find('tr:odd').addClass('oddRow');
		$(this).find('tr:even').addClass('evenRow');
		$(this).find('tr:nth-child(2)').find('th:first').removeClass('firstTh');
	});	
};
	
// Responsive Table
if( $(".responsiveTable").length){
	$(".responsiveTable").each(function(){		
	$(this).find('td').removeAttr('width');
	//$(this).find('td').removeAttr('align');
	var head_col_count =  $(this).find('tr th').length;
	// loop which replaces td
	for ( i=0; i <= head_col_count; i++ )  {
		// head column label extraction
		var head_col_label = $(this).find('tr th:nth-child('+ i +')').text();
		// replaces td with <div class="column" data-label="label">
		$(this).find('tr td:nth-child('+ i +')').attr("data-label", head_col_label);

        //$(this).find('tr').addClass("responsiveTr");

	}
	});
};

// Table Data Sorting
$(document).ready(function(){
	$('th').click(function(){
		var table = $(this).parents('table').eq(0)
		var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
		this.asc = !this.asc
		if (!this.asc){rows = rows.reverse()}
		for (var i = 0; i < rows.length; i++){table.append(rows[i])}
	})
	function comparer(index) {
		return function(a, b) {
			var valA = getCellValue(a, index), valB = getCellValue(b, index)
			return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
		}
	}
	function getCellValue(row, index){ return $(row).children('td').eq(index).text() }
});

// Click to Open Div show hide Popup
$('.addEmployee').on('click', function (e) {
	e.preventDefault();
	$(this).toggleClass("open");
	$('#addEmployeePopup').fadeToggle("fast", "linear");
	return false;
});

    // Click to Open Div show hide Popup
$('.ViewHistory').on('click', function (e) {
	e.preventDefault();
	$(this).toggleClass("open");
	$('#ViewHistory').fadeToggle("fast", "linear");
	return false;
});


$(document).ready(function(){

//Responsive Tabing Script
$('.restab').responsiveTabs({
	startCollapsed: 'accordion'
	//  rotate: false
	// ,startCollapsed: 'tab' //accordion
	// ,collapsible: 'tab' //accordion
	//,scrollToAccordion: true
});


});



$(document).ready(function(){

if($('.datepicker').length){
	$.datepicker.setDefaults({
	  showOn: "both"
	  ,dateFormat:"mm/dd/yy"
	  ,changeMonth: true
	  ,changeYear: true
	  //,buttonImage: "images/calendar.png"
	 //,buttonImageOnly: true
	  ,shortYearCutoff: 50
	  ,buttonText: "<span class='sprite calIcon'></span>"
	  ,beforeShow: function (textbox, instance) {
		instance.dpDiv.css({
			marginTop: /*(textbox.offsetHeight)*/ 0 + 'px'
			,marginLeft: 0 + 'px'
		});
		}
	});

	$( ".datepicker" ).datepicker({
	   dateFormat:"mm/dd/yy"
	   ,showOn: "both"
	   ,buttonText: "<span class='sprite calIcon'></span>"
	   ,shortYearCutoff: 50
	 //,buttonImage: "images/calendar.png"
	 //,buttonImageOnly: true
	   ,beforeShow: function (textbox, instance) {
		instance.dpDiv.css({
			marginTop: /*(textbox.offsetHeight)*/ 0 + 'px'
				,marginLeft: 0 + 'px'
			});
		}
	  });	
}

if( $(".datetimepicker").length){
	$( ".datetimepicker" ).datetimepicker({
	   dateFormat:"mm-dd-yy", 
	   showOn: "both",
	   buttonText: "<span class='sprite calIcon'></span>",
	   //buttonImage: "images/calendar.png"
	   //buttonImageOnly: true,
	   beforeShow: function (textbox, instance) {
	   instance.dpDiv.css({
			marginTop: /*(textbox.offsetHeight)*/ 15 + 'px',
			marginLeft: -13 + 'px'
			});
		}
	  });
}	
});

// alert("hi");

});

var maxF = $('.ci-footer').outerHeight();
var maxR = $('.ci-colRight').outerHeight();