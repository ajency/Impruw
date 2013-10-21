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

					//accept droppable controls
					this.$el.find(this.builderId).droppable({
														accept : '*[data-control]',
														hoverClass: "ui-state-highlight",
														greedy : true,
														drop: function( event, ui ) {

															var cClass = ui.draggable.attr('data-control');
															
															if(_.isUndefined(Controls[cClass]))
																return;

															var control = new Controls[cClass];
															$(event.target).append(control.generateBuilderMarkup(self));
																										
														}
													});

					// sort the rows internally
					self.$el.find(self.builderId).sortable({revert	: 'invalid'});	

				}

			});	


			return BuilderMainView;

		});