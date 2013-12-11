/**
 * The SiteProfile View. 
 * 
 */
 
define(['underscore', 'jquery', 'backbone', 'text!templates/siteprofile/SiteProfileViewTpl.tpl'],
		function( _ , $, Backbone,  SiteProfileViewTpl ){

			
			var SiteProfileView = Backbone.View.extend({

				id 			: 'site-profile',

				events      : { 
                
				},

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
				}
                
			});	


			return SiteProfileView;

		});