/**
 * The Main Dashboard View. 
 * 
 */
 
define(['underscore', 'jquery', 'backbone','leftview','sitemodel'],
		function( _ , $, Backbone, LeftColumnView, SiteModel){

			
			var DashboardMainView = Backbone.View.extend({

				el 			: 'body',

				initialize : function(){
					//set left column view
                    this.leftColumn = new LeftColumnView();
				},

				show : function(view,data_id){
					
					var editRoomModel;
					//console.log('collection check ... ')
					//console.log(getAppInstance())
					
					if(!_.isUndefined(data_id)){
						if(!_.isUndefined(data_id.roomId))
						if(!_.isUndefined(getAppInstance().roomCollection)){
							editRoomModel = getAppInstance().roomCollection.get(data_id.roomId)	
							
						}
						
					}
					
				 
					var self = this;

					if(view === 'failed'){
						this.showErrorView();
						return;
					}

					var calledView = getAppInstance().ViewManager.findByCustom(view);

                    //if not present create new
                    if (_.isUndefined(calledView)) {
                    	
                    	var newViewFn = _.bind(function(RView){
						 	
							 if(!_.isUndefined(editRoomModel)){
								 calledView = new RView(editRoomModel);
								//calledView.render(editRoomModel);
								 calledView.render(); 
							}
							 else {
								 calledView = new RView();
								 //	else
								 calledView.render(); 
								getAppInstance().ViewManager.add(calledView, view);
							 }
							
							this.makeVisible(calledView);
						
						}, this)

                    	require([view], newViewFn );
                        
                    }
                    else{
                    	 
                    	 
                    	 if(!_.isUndefined(editRoomModel)){
	                    	var newViewFn2 = _.bind(function(RView2){
						 		 	calledView = new RView2(editRoomModel);
							 
									 calledView.render(); 
									 this.makeVisible(calledView);								  
								 
							}, this)
	
							require([view], newViewFn2 );
                    	 }
                    	 else{
                    		 this.makeVisible(calledView);
                    	 }
                    	 
                    }

				},

				/**
				* This view is loaded if the main view fails to load the actual view
				*/
				showErrorView : function(){
					
					var ErrorView = Backbone.View.extend({id: 'error-view', className : 'alert alert-error'});
					
					this.errorview = new ErrorView;
					
					this.errorview.$el.html('<br /><p>Failed to load view. Please try again</p>');

					this.makeVisible('errorview');

				},
				
				makeVisible : function(view){
					 
 					this.$el.find('.aj-imp-right').addClass('aj-imp-loader');
					
					this.$el.find('.aj-imp-right').html(view.$el);
					
					this.$el.find('.aj-imp-right').removeClass('aj-imp-loader')
					
				}
				

			});	


			return DashboardMainView;

		});