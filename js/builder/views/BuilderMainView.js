/**
 * The Main Builder Router. 
 * This is the main router for the builder
 */
 
define(['underscore', 'jquery', 'backbone', 'global', 'builder/views/Controls'],
		function( _ , $, Backbone, global, Controls){

			console.log(Controls);

			var BuilderMainView = Backbone.View.extend({

				el : '.aj-imp-builder',

				initialize : function(){

					this.builderId = '#aj-imp-builder-drag-drop';
				},

				events : {
					//'mouseover #aj-imp-builder-drag-drop' : 'handleRowDragging'
				},

				render : function(){

					var self = this;

					//setup select picker
					this.$el.find('.aj-imp-builder-top-nav select').selectpicker({style: 'btn-mini btn-default', menuStyle: 'dropdown'});
					
					//enable controls drag
					$( "#controls-drag" ).draggable({
						 handle: "p.desc",
						 addClasses: false
					});
					
					/** Controls Draggable */
					$('*[data-control]').draggable({
														addClasses			: false,
														helper				:  'clone',
														revert 				: 'invalid',
														drag  				: 	function (e, t) {
																		      		t.helper.width(286);
																		      	}
													});

					this.$el.find(this.builderId).droppable({
														accept : '*[data-control]',
														hoverClass: "ui-state-highlight",
														greedy : true,
														drop: function( event, ui ) {

															var cClass = ui.draggable.attr('data-control');
															
															if(_.isUndefined(Controls[cClass]))
																return;

															//self.showDropControlLoader();
															var control = new Controls[cClass];
															$(event.target).append(control.generateBuilderMarkup(self));
																											
														}
													});

					this.$el.find(this.builderId).sortable();
					
					//border
					this.$el.find( this.builderId + ' .column').css('border', '1px dashed #ccc' ).css('min-height',100);
					this.$el.find( this.builderId + ' .row').css({'background':'#ccc','margin-bottom' : 20, 'min-height' : '10px'});
				},

				handleRowDragging : function(evt){
					log("dsds");
					if(this.$el.hasClass('ui-state-highlight')){
						this.$el.find(this.builderId).animate({'height': +120});
					}

				}

			});	


			return BuilderMainView;

		});