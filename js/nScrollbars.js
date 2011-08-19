(function( $ ){	
	$.fn.jScrollbars = function( options ) {
			this.addClass("hasjScrollBars");

	    	var settings = {
	    			'scrollY' : 'right',
	    			'scrollX' : 'bottom',
	    	    	'hideBars' : 'on',
	    	    	'barSize' : '5px',
	    	    	'barDistance' : '5px',
	    	    	'zoom' : true,
	    	    	'zoomAmount' : '200%',
	    	    	'visibility' : '0.2',
	    	    	'fadeVisibility' : '0.7',
	    	    	'barBackground':'#000',
	    	    	'background':'',
	    	    	
	    	    };
	    	return this.each(function() {  
		        if ( options ) { 
		            $.extend( settings, options );
		          }
		        

		        
		        $(this).css({"overflow":"hidden"});
		        
		        var FactorY = (  $(this).height() / $(this).children(":first").height() );
		        var FactorX = (  $(this).width() / $(this).children(":first").width() );
		        var barHeight = $(this).height() * FactorY;
		        var barWidth = $(this).width() * FactorX;
		        
		        if(barWidth >= $(this).width()) var hideX = "display:none;"; else var hideX = "";
		        if(barHeight >= $(this).height()) var hideY = "display:none;"; else var hideY = "";
		        
		        
		        function scrollbars_refesh_vars(){
		        	
			        FactorY = (  $(this).height() / $(this).children(":first").height() );
			        FactorX = (  $(this).width() / $(this).children(":first").width() );
			        barHeight = $(this).height() * FactorY;
			        barWidth = $(this).width() * FactorX;
			        
			        if(barWidth >= $(this).width()) var hideX = "display:none;"; else var hideX = "";
			        if(barHeight >= $(this).height()) var hideY = "display:none;"; else var hideY = "";
		        	
		        }
		        
		        
		        settings.visibility = ""+parseFloat(settings.visibility);
		        settings.fadeVisibility = ""+parseFloat(settings.fadeVisibility);
		        settings.barSize = parseFloat(settings.barSize);
		        settings.barDistance = parseFloat(settings.barDistance);
		        
		        
		        $(this).children('.jScrollBarY').remove();
		        $(this).children('.jScrollBarX').remove();
		        
		        if(settings.scrollY == "right")	        	
		        	$(this).append("<div class='jScrollBarY' style='filter:alpha(opacity="+(settings.visibility*10)+");opacity:"+settings.visibility+";"+hideY+"cursor:pointer;border:0px solid grey;height:100%;position:absolute;top:0px;right:"+settings.barDistance+"px;background:"+settings.background+";'><div class='jScrollerY' style='height:"+(FactorY*100)+"%;min-width:"+settings.barSize+"px;background:"+settings.barBackground+";top:0;'></div></div>");
		        else if(settings.scrollY == "left")
		        	$(this).append("<div class='jScrollBarY' style='filter:alpha(opacity="+(settings.visibility*10)+");opacity:"+settings.visibility+";"+hideY+"cursor:pointer;border:0px solid grey;height:100%;position:absolute;top:0px;left:"+settings.barDistance+"px;background:"+settings.background+";'><div class='jScrollerY' style='height:"+(FactorY*100)+"%;min-width:"+settings.barSize+"px;background:"+settings.barBackground+";top:0;'></div></div>");
		        
		        if(settings.scrollX == "top")
		        	$(this).append("<div class='jScrollBarX' style='filter:alpha(opacity="+(settings.visibility*10)+");opacity:"+settings.visibility+";"+hideX+"cursor:pointer;border:0px solid grey;width:100%;position:absolute;top:"+settings.barDistance+"px;left:0px;background:"+settings.background+";'><div class='jScrollerX' style='width:"+(FactorX*100)+"%;min-height:"+settings.barSize+"px;background:"+settings.barBackground+";left:0;'></div></div>");
		        else if(settings.scrollX == "bottom")
		        	$(this).append("<div class='jScrollBarX' style='filter:alpha(opacity="+(settings.visibility*10)+");opacity:"+settings.visibility+";"+hideX+"cursor:pointer;border:0px solid grey;width:100%;position:absolute;bottom:"+settings.barDistance+"px;left:0px;background:"+settings.background+";'><div class='jScrollerX' style='width:"+(FactorX*100)+"%;min-height:"+settings.barSize+"px;background:"+settings.barBackground+";left:0;'></div></div>");

		        $(".hasjScrollBars").hover(
		        		function(){
		        			$(this).children(".jScrollBarY").stop().animate({"opacity":settings.fadeVisibility});
		        			$(this).children(".jScrollBarX").stop().animate({"opacity":settings.fadeVisibility});
		        		},
		        		function(){
		        				$(this).children(".jScrollBarY").stop().animate({"opacity":settings.visibility});
		        				$(this).children(".jScrollBarX").stop().animate({"opacity":settings.visibility});
		        		}
		        );		        
		        
		        $( ".jScrollerX" ).draggable({ 
		        	containment: "parent",
		        	scroll: false,
		        	drag: function(){			        	
						   $(this).parent().parent().children(":first").css({"marginLeft":($(this).parent().offset().left - $(this).offset().left)/FactorX+"px"}); 
					}	        
	        	});
		        
		        $( ".jScrollerY" ).draggable({ 
		        	containment: "parent",
		        	scroll: false,
		        	drag: function(){										        		
		        		$(this).parent().parent().children(":first").css({"marginTop":($(this).parent().offset().top - $(this).offset().top)/FactorY+"px"}); 
						}
		        });
		        
		        
				
				
		        $(".hasjScrollBars").mousewheel(function(objEvent, intDelta){
				  if($(this).children(".jScrollBarY").is(":visible")== true){

		        	if (intDelta > 0 ){
				       //alert("!");
				    	if(parseFloat($(this).children(".jScrollBarY").children(".jScrollerY").css('top')) > 0){
				    		$(this).children(".jScrollBarY").children(".jScrollerY").css({"top": (parseFloat($(this).children(".jScrollBarY").children(".jScrollerY").css('top'))-1)});
				    		$(this).children(":first").css({"marginTop":-((parseFloat($(this).children(".jScrollBarY").children(".jScrollerY").css('top'))-1)/FactorY)+"px"}); 
				    	}else{
				    		$(this).children(".jScrollBarY").children(".jScrollerY").css({"top": 0});
				    		$(this).children(":first").css({"marginTop":0+"px"}); 
				    	}
				    }	
				    else if (intDelta < 0  && parseFloat($(this).children(".jScrollBarY").children(".jScrollerY").css('top')) < parseFloat($(this).children(".jScrollBarY").height())-parseFloat($(this).children(".jScrollBarY").children(".jScrollerY").height())){
						
	        			$(this).children(".jScrollBarY").children(".jScrollerY").css({"top": (parseFloat($(this).children(".jScrollBarY").children(".jScrollerY").css('top'))+1)});
	        			$(this).children(":first").css({"marginTop":-((parseFloat($(this).children(".jScrollBarY").children(".jScrollerY").css('top'))+1)/FactorY)+"px"}); 
					}}
				});
		        
		        
		      
		        $( ".jScrollBarY" ).click( 
		        		function(e){			
		        			
		        			var newpos = e.pageY-($(this).children(".jScrollerY").height()/2)-($(this).offset().top);
		        			
		        			if(newpos < 0){newpos = 0;}
		        			if(newpos > $(this).height()-$(this).children(".jScrollerY").height()){newpos = $(this).height()-$(this).children(".jScrollerY").height();}
		        			
		        			$(this).children(".jScrollerY").stop().animate({"top": newpos});
		        			$(this).parent().children(":first").stop().animate({"marginTop":-(newpos/FactorY)+"px"}); 
						}
		        );
		        
		        $( ".jScrollBarX" ).click( 
		        		function(e){			
		        			
		        			var newpos = e.pageX-($(this).children(".jScrollerX").width()/2)-($(this).offset().left);
		        			
		        			if(newpos < 0){newpos = 0;}
		        			if(newpos > $(this).width()-$(this).children(".jScrollerX").width()){newpos = $(this).width()-$(this).children(".jScrollerX").width();}
		        			
		        			$(this).children(".jScrollerX").stop().animate({"left": newpos});
		        			$(this).parent().children(":first").stop().animate({"marginLeft":-(newpos/FactorX)+"px"}); 
						}
		        );
		        
	    	
	    	
	    	});
	};
})( jQuery );