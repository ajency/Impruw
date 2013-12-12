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
				
				saveProfile : function(){
					window.impruwSite.saveSiteProfile();
				},
				
				addAnotherEmailElement : function(){
					//alert("Add another email element");
					//var clone = $('#email').clone().attr('id', newId());
					//$("#div_email").last().append(clone);
					//$("#div_email").last().append('<input type="email" class="form-control"   name="email[]"  placeholder="youremail@site.com"  value=""> <span id="del_email">Delete</span>')
					//$('.div_email:last').clone().appendTo('.div_email:last');
					$('.div_email:last').clone().find("input").val("").end().appendTo('.div_email:last');
					$('.div_email:last').find(".del_email").show();
					//console.log($('.div_email').html());
				},
				delEmailElement: function(el)
				{
					 
					 $(el.target).parent().remove() ;
					//$(this).parent().remove();
					//console.log($(this))
				},
				
				addAnotherPhoneElement : function(){
					$('.div_phone:last').clone().find("input").val("").end().appendTo('.div_phone:last');
					$('.div_phonel:last').find(".del_phone").show();
					
				}, 
				delPhoneElement: function(el)
				{
					 
					 $(el.target).parent().remove() ;
					//$(this).parent().remove();
					//console.log($(this))
				},
				
                
			});	


			return SiteProfileView;

		});