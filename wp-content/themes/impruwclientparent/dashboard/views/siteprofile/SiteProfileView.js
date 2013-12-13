/**
 * The SiteProfile View. 
 * 
 */
 
define(['underscore', 'jquery', 'backbone', 'text!templates/siteprofile/SiteProfileViewTpl.tpl'],
		function( _ , $, Backbone,  SiteProfileViewTpl ){

			
			var SiteProfileView = Backbone.View.extend({

				id 			: 'site-profile',

				events      : { 'click #btn_savesitedetails':'saveProfile',
					'click #add_another_email':'addAnotherEmailElement',
					'click .del_email':'delEmailElement',
					'click #add_another_phone' : 'addAnotherPhoneElement',
					'click .del_phone':'delPhoneElement'				},

				initialize : function(args){
                    
					this.site = args.site;
                  
				},

				render : function(){

					var self = this;
					
					g = this.site;
					var template = _.template(SiteProfileViewTpl);
					
					var html = template( { site : this.site } );
					
					this.$el.html(html);
					
					return this;
				},
				
				
				/**
				 * Function to save site profile 
				*/
				saveProfile : function(){
					
					window.impruwSite.saveSiteProfile(); 
				},
				
				
				/**
				 * Function to add additional email element to site profile form
				 */
				addAnotherEmailElement : function(){
					 
					$('.div_email:last').clone().find("input").val("").end().appendTo('.div_email:last');
					$('.div_email:last').find(".del_email").show();
				 
				},
				
				
				/**
				 * Function to delete additional email element from site profile form
				*/
				delEmailElement: function(el){
					 
					 $(el.target).parent().remove() ;
					 
				},
				
				/**
				 * Function to add additional phone element to site profile form
				 */
				addAnotherPhoneElement : function(){
					
					$('.div_phone:last').clone().find("input").val("").end().appendTo('.div_phone:last');
					$('.div_phonel:last').find(".del_phone").show();
					
				}, 
				
				
				/**
				 * Function to delete additional phone element from site profile form
				 * @param el
				 */
				delPhoneElement: function(el){
					 
					 $(el.target).parent().remove() ;
					 
				},
				
                
			});	


			return SiteProfileView;

		});