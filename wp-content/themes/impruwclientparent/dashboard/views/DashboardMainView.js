/**
 * The Main Dashboard View. 
 * 
 */
 
define(['underscore', 'jquery', 'backbone','leftview','sitemodel'],
		function( _ , $, Backbone, LeftColumnView, SiteModel){

			
			var DashboardMainView = Backbone.View.extend({

				el 			: 'body',

				events      : { 
                
				},


				initialize : function(){
                    
					//set left column view
                    this.leftColumn = new LeftColumnView();
                    this.site		= window.impruwSite;
					this.user 		= window.impruwUser
                  
				},

				render : function(){

					var self = this;
					
				},
                
				show : function(view){
					
					var self = this;
					
					try{
						 
						self.makeVisible(view);
					}
					catch(e){
						if(_.isUndefined(this[view])){
							
							require([view], function(RView){
								
								self[view] = new RView({site : self.site});
								self[view].render();
								self.makeVisible(view);
								
							});
							
						}
					}
					
					
					
					
					/*if(_.isUndefined(this[view])){
						
						require([view], function(RView){
							
							self[view] = new RView({site : self.site});
							self[view].render();
							self.makeVisible(view);
							
						});
						
					}
					else{
						self.makeVisible(view);
					}*/
					
				},
				
				
				showUserProfile : function(view){
					
					var self = this;
					
					try{
						 
						self.makeVisible(view);
					}
					catch(e){
						if(_.isUndefined(this[view])){
							
							require([view], function(RView){
								
								self[view] = new RView({user : self.user});
								self[view].render();
								self.makeVisible(view);
								
							});
							
						}
					}
				},
				
				
				makeVisible : function(view){

					this.$el.find('.aj-imp-right').addClass('aj-imp-loader');
					
					this.$el.find('.aj-imp-right').html(this[view].$el);
					
					this.$el.find('.aj-imp-right').removeClass('aj-imp-loader')
					
				}
				

			});	


			return DashboardMainView;

		});