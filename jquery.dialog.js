/*
 * Codaset Dialog : A sexy, ajax only jQuery dialog window.
 * Original implementation: http://codaset.com/joelmoss/codaset-dialog/
 * With thanks to http://fancybox.net/
 *
 * Copyright (c) 2009 Joel Moss & Codaset.com
 * Licensed under the MIT licenses.
 */

;(function($) {

	var isIE = ($.browser.msie && parseInt($.browser.version.substr(0,1)) < 8);

  $.dialog = {
    
    active: false,
    
    options: {
      className: 'dialog'
    },
    
    init: function(){
      this.build();
      this.events();
    },
    
    build: function(){
    	var html = '';
    	html += '<div id="dialog_overlay"></div>';
      html += '<div id="dialog_wrap">';
      html += '<div id="dialog_loading"><div></div></div>';
      html += '<div id="dialog_outer">';
      html += '<div id="dialog_inner">';
      html += '<div id="dialog_close"></div>';
      html += '<div id="dialog_bg"><div id="dialog_bg_n"></div><div id="dialog_bg_ne"></div><div id="dialog_bg_e"></div><div id="dialog_bg_se"></div><div id="dialog_bg_s"></div><div id="dialog_bg_sw"></div><div id="dialog_bg_w"></div><div id="dialog_bg_nw"></div></div>';
      html += '<div id="dialog_content"><div id="dialog_ajax"></div></div>';
      html += '<div id="dialog_title">';
      html += '<table cellspacing="0" cellpadding="0" border="0"><tr><td class="dialog_title" id="dialog_title_left"></td><td class="dialog_title" id="dialog_title_main"><div></div></td><td class="dialog_title" id="dialog_title_right"></td></tr></table>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';

    	$(html).appendTo('body');
    	
  		if (isIE) {
  			$("#dialog_inner").prepend('<iframe class="dialog_bigIframe" scrolling="no" frameborder="0"></iframe>');
  		}
  		
  		$("#dialog_overlay").css('opacity', 0.2);
    },
    
    events: function(){
      $('.' + this.options.className).live('click', function(event){
        event.preventDefault();
        $.dialog.open($(this).attr('href'), $(this).attr('title') || '');
      });
      
      $(window).resize(function(){
        if ($("#dialog_outer").is(':visible'))
          $("#dialog_outer").center(true);
      });
      
			$(document).keydown(function(e) {
				if ((e.charCode || e.keyCode) == 27) {
					$.dialog.close();
				}
			});
      
      $("#dialog_overlay").click($.dialog.close);
    },
    
    resize: function(animate){
      var width = $('#dialog_ajax').children().width(),
          height = $('#dialog_ajax').children().height(),
          styles = {
            width: (width+40) + 'px',
            height: (height+40) + 'px'
          };
          
      $("#dialog_content").css({
        width: (width+20) + 'px',
        height: height + 'px'
      });
          
      if (animate) {
        $("#dialog_outer").animate(styles, function(){
          $(this).center(true);
        });
      } else {
        $("#dialog_outer").css(styles).center();
      }
    },
    
    open: function(url, title){
      $.dialog.active = true;
      
			if (isIE) {
				$('embed, object, select').css('visibility', 'hidden');
			}

			$("#dialog_overlay").fadeIn('fast');
			$("#dialog_loading").center().fadeIn('fast');
			
			$.get(url, function(data){
			  if (!$.dialog.active) {
			    return;
		    }
			  
  			if (isIE) {
  				$("#dialog_content")[0].style.removeExpression("height");
  				$("#dialog_content")[0].style.removeExpression("width");
  			}

  			$('#dialog_ajax').html(data);
  			$("#dialog_outer").css({
  			  width: 0,
  			  height: 0,
  				visibility: 'hidden'
  			}).center().show();
  			
  			$("#dialog_content").show();
        var width = $('#dialog_ajax').children().width(),
            height = $('#dialog_ajax').children().height();
            
        $("#dialog_content").css({
          width: (width+20) + 'px',
          height: height + 'px'
        });
        $("#dialog_outer").hide().css({
          width: (width+60) + 'px',
          height: (height+40) + 'px',
          visibility: 'visible'
        }).center().fadeIn('normal', function(){
          $("#dialog_loading").hide();
          $("#dialog_close").one('click', $.dialog.close).fadeIn();
        });
        
        if (title != '') {
          $('#dialog_title').fadeIn().find('div').text(title);
        }
			});
    },
    
    close: function(){
      $.dialog.active = false;
      
			if (isIE) {
				$('embed, object, select').css('visibility', 'visible');
			}
			
			$("#dialog_loading").hide();
			$('#dialog_title').fadeOut('fast');
			$("#dialog_close").fadeOut('fast');
			$("#dialog_content").fadeOut('fast');
			$("#dialog_outer").fadeOut('fast', function(){
        $(this).css({
  			  width: 0,
  			  height: 0,
  				visibility: 'hidden'
  			});
			});
      $('#dialog_overlay').fadeOut('fast');
    },
    
  };
  
  $(document).ready(function() {
    $.dialog.init();
  });

})(jQuery);