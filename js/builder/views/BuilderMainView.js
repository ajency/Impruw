/**
 * The Main Builder Router. 
 * This is the main router for the builder
 */
 
define(['underscore', 'jquery', 'backbone', 'builder/views/BuilderEditorView'],
		function( _ , $, Backbone,  BuilderEditorView){

			
			var BuilderMainView = Backbone.View.extend({

				el : '.aj-imp-builder',

				initialize : function(){
                    
                    _.bindAll(this, 'handleInitialLoader');
                    
					this.builderId = '';
				},

				render : function(){

					var self = this;

					//setup select picker
					this.$el.find('.aj-imp-builder-top-nav select').selectpicker({style: 'btn-mini btn-default', menuStyle: 'dropdown'});
					
					this.builder = new BuilderEditorView();
					this.builder.render();

					this.$el.find('.aj-imp-browser-body').html(this.builder.$el);
                    
                    this.handleInitialLoader();
                    
					//enable dragsort
					this.builder.enableDropSort();
					
					return this;
				},
                
                /**
                 * 
                 * @returns {undefined}
                 */
                handleInitialLoader : function(){
                    
                    this.$el.find('.aj-imp-browser-body').css('background-image','url(images/empty-drag-bg.svg)')
                    //remove the initial loader
                    this.$el.find('#editor-initial-loader').remove();
                    
                }

			});	


			return BuilderMainView;

		});