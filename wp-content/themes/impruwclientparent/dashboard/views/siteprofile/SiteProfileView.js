/**
 * The SiteProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone', 
		'text!templates/siteprofile/SiteProfileViewTpl.tpl', 'sitemodel','parsley'], 
		function(_, $, Backbone, SiteProfileViewTpl, SiteModel) {

	var SiteProfileView = Backbone.View.extend({

		id : 'site-profile',

		events : {
			'click #btn_savesitedetails'	: 'saveProfile',
			'click #add_another_email' 		: 'addAnotherEmailElement',
			'click .del_email'				: 'delEmailElement',
			'click #add_another_phone' 		: 'addAnotherPhoneElement',
			'click .del_phone' 				: 'delPhoneElement',
			'click .filepopup'				: 'showFilePopup',
			'click #remove_businesslogo'	: 'removeBusinessLogo',
			'click a.re-try'				: 'render'
		},

		initialize : function(args) {
			_.bindAll(this ,'renderForm','renderError', 'saveProfileSuccess', 'saveProfileFailure','parsleyInitialize');

			//ensure site model property is set
			if(!getAppInstance().siteModel)
				getAppInstance().siteModel = new SiteModel();

			//set ID
			getAppInstance().siteModel.set(SITEID);

			this.listenTo(getAppInstance().siteModel, 'model-fetch-failed', this.renderError);

		},

		/**
		 * Render the view
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		render : function(evt) {

			if(!_.isUndefined(evt))
				evt.preventDefault();

			//trigger fetch
			getAppInstance().siteModel.fetch({
				success : this.renderForm
			});
			 
			return this;
		},

		/**
		 * Render the form for the User
		 * @return {[type]} [description]
		 */
		renderForm : function(model, resp, options){

			if(resp.code !== 'OK')
				return;

			var template = _.template(SiteProfileViewTpl);

			var html = template({
				site : model
			});

			this.$el.html(html);

			//trigger app level request
			if(model.get('businessLogoId') !== false){

				var cbFn = _.bind(function(url){
					if(url !== false)
						this.$el.find('#businesslogo_img').attr('src', url);
				}, this);

				getAppInstance().request('get-image-url', model.get('businessLogoId'), 'full', cbFn);

			}

			//set custom selectbox & checkbox
			this.$el.find('select').selectpicker();
			this.$el.find('input[type="checkbox"]').checkbox();	

			//initialize parsley validation for the forms
			this.parsleyInitialize(this.$el.find('#form-siteprofile'));


			// Long Form Actions
			$(".aj-imp-long-form-actions").affix({
				offset: { top: 200 }
			});

			if( $(window).width()< 768){
				$(".aj-imp-long-form-actions").affix({
					offset: { top: function () {
				        return (this.top = $('.aj-imp-left').outerHeight(true))
				      } 
				  	}					
				});
			}

			// Long form dyanamic width
			$(window).load(function() { 
				var w = $('.aj-imp-right').width();
				$('.aj-imp-long-form-actions.affix').width(w);

				var m = $('.aj-imp-left').width();
				$('.aj-imp-long-form-actions.affix').css('margin-left', (m));

				if( $(window).width()< 768){
					var w = $('window').width();
					$('.aj-imp-long-form-actions.affix').width(w);

					$('.aj-imp-long-form-actions.affix').css('margin-left', (0));
				}
			});
			$(window).scroll(function() { 
				var w = $('.aj-imp-right').width();
				$('.aj-imp-long-form-actions.affix').width(w);

				var m = $('.aj-imp-left').width();
				$('.aj-imp-long-form-actions.affix').css('margin-left', (m));

				if( $(window).width()< 768){
					var w = $('window').width();
					$('.aj-imp-long-form-actions.affix').width(w);

					$('.aj-imp-long-form-actions.affix').css('margin-left', (0));
				}
			});
			$(window).resize(function() { 
				var w = $('.aj-imp-right').width();
				$('.aj-imp-long-form-actions.affix').width(w);

				var m = $('.aj-imp-left').width();
				$('.aj-imp-long-form-actions.affix').css('margin-left', (m));

				if( $(window).width()< 768){
					var w = $('window').width();
					$('.aj-imp-long-form-actions.affix').width(w);

					$('.aj-imp-long-form-actions.affix').css('margin-left', (0));
				}
			});

			/* js for dashboard --scroll indicators */
			$.fn.justtext = function() {
				   return $(this).clone()
				           .children()
				           .remove()
				           .end()
				           .text();
			};
			
			// Global var to cache info about indicators for easy access. 
			var indicators = [];
			var rawIndicators = "";
			var $articles = $(".scroll-indicator-container");
			// Create a bubble for each article
			$articles.each(_.bind(function(i) {
				var iInverse = $articles.length - i - 1;
				var margins = 'margin: ' + (i+0.5) + 'em 0 ' + (iInverse+0.5) + 'em 0;'; 
				rawIndicators +=  '<a class="indicator indicator--upcoming" style="' + margins + '" href="#' + this.id + '"><span class="indicator-tooltip">' + this.$el.find(".scroll-ref").justtext() + '</span></a>';
			}, this));

			this.$el.append(rawIndicators);

			  // Utility function to calculate the proper top coordinate for a bubble when it's on the move (position: absolute)
			  var getNodeTopPos = function(indicator, target) {
				var indMargTop = parseInt(indicator.css("margin-top").replace("px", ""));
				var targCenter =  target.outerHeight(false)/2;
				var indCenter = indicator.outerHeight(false)/2;
				return target.offset().top - indMargTop + targCenter - indCenter;
			  }


			  // 
			  // INITIAL SET UP OF INDICATOR OBJECT
			  //

			  var calcIndicatorInfo = function(){

				indicators = []
				$(".indicator").each(function(){
				  
				  var o = {
					$indicator: $(this),
					$target: $( $(this).attr("href") ),
					$targetTitle: $( $(this).attr("href") + " .scroll-ref" )
				  };

				  // When it's abs positioned (on the move), this is the top pos
				  o.absPos = getNodeTopPos(o.$indicator, o.$targetTitle); 

				  // When it's abs positioned, at this scroll pos we should make the indicator fixed to the bottom
				  o.absBottomStop = window.innerHeight - (o.absPos + o.$indicator.outerHeight(true));

				  // Top / bottom stops for being 'viewable'
				  o.viewableTopStop = o.$target.offset().top - window.innerHeight;
				  o.viewableBottomStop = o.$target.offset().top + o.$target.outerHeight();
				  indicators[indicators.length] = o;
				  
				});
			  };

			  //
			  // ON RESIZE FUNCTION - UPDATE THE CACHED POSITON VALUES
			  //

			  var initIndicators = function() {
				calcIndicatorInfo();
				// Bug fix - without timeout scroll top reports 0, even when it scrolls down the page to last page loaded position
				// http://stackoverflow.com/questions/16239520/chrome-remembers-scroll-position
				setTimeout(function(){
				  var st = $(document).scrollTop();
				  $(indicators).each(function(){
					if(st<=this.absPos && st>=(-1*this.absBottomStop))
					  this.$indicator.removeClass("indicator--upcoming").removeClass("indicator--passed").addClass("indicator--active")
						  .css({ "top" : this.absPos });
					else if(st>=(-1*this.absBottomStop)) 
					  this.$indicator.removeClass("indicator--active").removeClass("indicator--upcoming").addClass("indicator--passed").css({ "top" : "" });
					else
					  this.$indicator.removeClass("indicator--active").removeClass("indicator--passed").addClass("indicator--upcoming").css({ "top" : "" });
					
					if(st>=this.viewableTopStop && st<=(this.viewableBottomStop))
					  this.$indicator.addClass("indicator--viewing");
					else
					  this.$indicator.removeClass("indicator--viewing");
				  });
				}, 0);
			  }

			  //
			  // SCROLL FUNCTION - UPDATE ALL OF THE INDICATORS
			  //

			  var adjustIndicators = function() {
				var st = $(document).scrollTop();

				// The indicators that SHOULD be scrolling
				var anticipated = _.filter(indicators, function(o) { return (st<=o.absPos && st>=(-1*o.absBottomStop)) });

				// The $ elements that are indeed scrolling
				var active$ = $(".indicator--active");

				// Anything in anticipated that isn't in active should be activated ...
				var needsActivation = _.filter(anticipated, function(o) { return !_.contains(active$, o.$indicator[0]); })

				// ... And anything thats in active that isn't in anticipated needs to be stopped. 
				var anticipatedEls = _.pluck(anticipated, "$indicator");
				var needsDeactivation = _.filter(active$, function(o) { 
				  return !_.find(anticipatedEls, function(e){ return e[0] == o }); 
				});

				// Do the Activation
				_.each(needsActivation, function(o) {
				  o.$indicator
					.removeClass("indicator--upcoming").removeClass("indicator--passed")
					.addClass("indicator--active")
					.css({ "top" : o.absPos })
				});

				_.each(needsDeactivation, function(i$){
				  var indicator = _.find(indicators, function(i) {
					return i.$indicator[0] == i$;
				  });
				  if(st>=indicator.absPos) {
					// Went off top. now passed. 
					indicator.$indicator.removeClass("indicator--active").addClass("indicator--passed").css({ "top" : "" });
				  }
				  else {
					// Went off bottom. now upcoming. 
					indicator.$indicator.removeClass("indicator--active").addClass("indicator--upcoming").css({ "top" : "" });
				  }
				});

				$(indicators).each(function(){
				  if(st>=this.viewableTopStop && st<=(this.viewableBottomStop))
					this.$indicator.addClass("indicator--viewing");
				  else
					this.$indicator.removeClass("indicator--viewing");
				});

			  }

			  //
			  // BIND EVENTS
			  //

			  $(document).scroll(function() {
				adjustIndicators();
			  });
			  $(window).resize(function() {
				initIndicators();
				adjustIndicators();
			  });
			  
			  initIndicators();
			  adjustIndicators();
			  
			  $(".indicator").click(function(){
				initIndicators();
				adjustIndicators();
			  })

		},

		/**
		 * Render the form error for the User
		 * @return {[type]} [description]
		 */
		renderError : function(response){
			
			this.$el.html(response.message + '. <a href="#" class="re-try">Try again</a>');

		},

		/**
		 * Open media manager
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		showFilePopup : function(evt){

			var popupFn = _.bind(function(_, MediaManager) {

                 var mediamanager = getAppInstance().ViewManager.findByCustom("media-manager");

                 //if not present create new
                 if (_.isUndefined(mediamanager)) {
                     mediamanager = new MediaManager();
                     ImpruwDashboard.ViewManager.add(mediamanager, "media-manager");
                 }

                 //start listening to event
                 this.listenTo(getAppInstance().vent,'image-selected', this.businessLogoSelected);


                 mediamanager.open();

             }, this);

            require(['underscore', 'mediamanager'], popupFn);
			
		},
		
		businessLogoSelected : function(image, size){
			
			//stop listening to image-selected event
            this.stopListening(ImpruwDashboard.vent, 'image-selected', this.updateSelf);

            if (!_.isObject(image))
                throw 'Invalid <image> datatype. Must be an Object';

            this.dataSource = {};

            this.dataSource.attachmentID    = image.get('id');
            this.dataSource.size            = size;

            this.$el.find('.fileinput-preview').find('#businesslogo_img').removeClass('hidden');
            this.$el.find('.fileinput-preview').find('#hdn_businesslogo_id').val(image.get('id'));
            this.$el.find('.fileinput-preview').find('#businesslogo_img').attr('src', image.get('sizes')[size].url);
            this.$el.find('.fileinput-preview').attr('src', image.get('sizes')[size].url);
            
            this.$el.find('#select_businesslogo').addClass('fileinput-exists');
            this.$el.find('#change_businesslogo').removeClass('fileinput-exists');
            this.$el.find('#remove_businesslogo').removeClass('fileinput-exists');
			
		},
		
		
		
		
		/**
		 * 
		 */
		removeBusinessLogo : function(evt){
			
			evt.preventDefault();

			var evt_ =  evt;
			
			$('#hdn_businesslogo_id').val('');
			//$(this.target).parent().parent().find('.fileinput-preview').find('#businesslogo_img').attr('src','');
			
			$('#businesslogo_img').attr('src','');
			
			var data = 	{ 
				'action'  : 'remove_business_logo'				 	
			};

			removeBusinessLogo = window.impruwSite.removeSiteBusinessLogo(data, {
																	event : evt_,
																	success : self.saveProfileSuccess,
																	failure : self.saveProfileFailure
																});		
			
		},
		
		
		/**
		 * 
		 * @param data
		 */
		updatedProfileView : function(data){
			
			var name = data.fullname;
			this.$el.find('inout[name="full-name"]').val(name);
			
			
		},
		


		 
		
		/**
		 * Function to save site profile
		 * @param evt
		 */
		saveProfile : function(evt) {
			
			if (this.$el.find('#form-siteprofile').parsley('validate')){

				var formData = getFormData(this.$el.find('#form-siteprofile'));
				log(formData);
				getAppInstance().siteModel.save(formData);
			}
				
		},
		
		/**
		 * Function to show success message on save site profile success
		 * @param response
		 */
		saveProfileSuccess : function(response,evnt){
			  
			 $(evnt.target).offsetParent().find('#siteprofilesave_status').removeClass('has-error').addClass('has-success')
			 
			 $(evnt.target).offsetParent().find('#siteprofilesave_status').show()
			 
			 $('html, body').animate({
			        scrollTop: $(evnt.target).offsetParent().find('#siteprofilesave_status').offset().top
			    }, 1000);
			 
		},
		
		/**
		 * Function to show error message on save site profile failure
		 * @param response
		 */
		saveProfileFailure : function(response){
			
			$(evnt.target).offsetParent().find('#siteprofilesave_status').removeClass('has-success').addClass('has-error');
			
			$(evnt.target).offsetParent().find('#siteprofilesave_status').show();
			
			$('html, body').animate({
		        scrollTop: $(evnt.target).offsetParent().find('#siteprofilesave_status').offset().top
		    }, 1000);
			
		},

		/**
		 * Function to add additional email element to site profile form
		 */
		addAnotherEmailElement : function(e) { 

			e.preventDefault();
			
			this.$el.find('.div_email:last').clone().find("input").val("").end().appendTo('.div_email:last');
			this.$el.find('.div_email:last').find(".del_email").show();
 

		},

		/**
		 * Function to delete additional email element from site profile form
		 */
		delEmailElement : function(el) {

			el.preventDefault();

			$(el.target).parent().remove();

		},

		/**
		 * Function to add additional phone element to site profile form
		 */
		addAnotherPhoneElement : function(e) {
			
			e.preventDefault();

			this.$el.find('.div_phone:last').clone().find("input").val("").end().appendTo('.div_phone:last');
			this.$el.find('.div_phonel:last').find(".del_phone").show();

		},

		/**
		 * Function to delete additional phone element from site profile form
		 * 
		 * @param el
		 */
		delPhoneElement : function(el) {
			el.preventDefault();
			$(el.target).parent().remove();
		},
		
		
		/**
		 * Function to initialize parsley validation for a form
		 * @param formelement
		 */
		
		parsleyInitialize : function(formelement){
			
		 	
			formelement.parsley({
	    		errors: {
	    			
	    			errorsWrapper: '<span class="help-block" style="display:block"></span>',
	    	    	  
	    	    	errorElem: '<span style="display:block"></span>',
	    	    	
	    		    container: function (element) {
		    		    		var $container = element.parent().parent().find(".p-messages");
		    		    		if ($container.length === 0) {
		    	                   $container = $("<div class='p-messages'></div>").insertAfter(element);
		    		    		}
		    		    		return $container;
	    		    }
	    		   
	    		},
	            listeners: {
	               onFieldSuccess: function ( elem, constraints, ParsleyField ) { 
	            	   
	            	   if(elem.parent().hasClass('input-group'))
	            		   elem.parent().parent().parent().removeClass("has-error").addClass("has-success");
	            	   else
	            		   elem.parent().parent().removeClass("has-error").addClass("has-success");
	                  elem.parent().parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
	                  elem.after('<span class="validation-icon input-icon fui-check-inverted"></span>') 
	               } ,
	               
	               onFieldError: function ( elem, constraints, ParsleyField ) { 
	            	    
	            	   if(elem.parent().hasClass('input-group'))
	            		   elem.parent().parent().parent().removeClass("has-success").addClass("has-error");
	            	   else	
	            		   elem.parent().parent().removeClass("has-success").addClass("has-error"); 
	                   
	                   elem.parent().parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
	                   elem.after('<span class="validation-icon input-icon fui-cross-inverted"></span>') 
	                }  
	           }
			});
			
		}		
		

	});

	return SiteProfileView;

});