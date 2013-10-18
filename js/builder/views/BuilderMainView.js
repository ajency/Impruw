/**
 * The Main Builder Router. 
 * This is the main router for the builder
 */
 
define(['underscore', 'jquery', 'backbone', 'global'],
		function( _ , $, Backbone, global){

			var BuilderMainView = Backbone.View.extend({

				el : '.aj-imp-builder',

				initialize : function(){

					this.builderId = '#aj-imp-builder-drag-drop';
	
				},

				render : function(){

					//setup select picker
					this.$el.find('.aj-imp-builder-top-nav select').selectpicker({style: 'btn-mini btn-default', menuStyle: 'dropdown'});
					
					//enable controls drag
					$( "#controls-drag" ).draggable({
						 handle: "p.desc",
						 addClasses: false
					});
					
					/** Controls Draggable */
					$('.builder-control').draggable({
														addClasses			: false,
														handle 				: '.drag',
													 	helper				:  'clone',
														revert 				: 'invalid',
														connectToSortable	: '#aj-imp-builder-drag-drop',
														drag  				: 	function (e, t) {
																		      		t.helper.width(82);
																		      	}
													});

					this.$el.find(this.builderId).droppable({
														accept : '.builder-control',
														hoverClass: "ui-state-highlight",
														greedy : false,
														drop: function( event, ui ) {

															var row = ui.draggable.find('.view .row').clone();
															
															$(row).attr('id','row-'+global.getRandomId());
															$(row).css({'background':'#ccc','margin-bottom' : 20});

															row.append('<div class="aj-imp-drag-handle">\
																			<a href="#" title="Move">\
																				<span class="glyphicon glyphicon-move"></span>\
																			</a>\
																		</div>\
																		<div class="aj-imp-delete-btn">\
																			<a href="#" title="Delete">\
																				<span class="glyphicon glyphicon-trash"></span>\
																			</a>\
																		</div>');

															$(event.target).append($(row));
														}
													});
					
					//enable top level container  sorting
					/*
					this.$el.find( this.builderId).sortable({
																			addClasses 	: false,
																			revert 		: 'invalid',
																			handle 		: '.aj-imp-drag-handle'
																		});*/

					

					//border
					this.$el.find( this.builderId + ' .column').css('border', '1px dashed #ccc' ).css('min-height',100);
					this.$el.find( this.builderId + ' .row').css({'background':'#ccc','margin-bottom' : 20, 'min-height' : '10px'});
				}

			});	


			return BuilderMainView;

		});