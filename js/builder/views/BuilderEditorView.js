/**
 * The Builder Editor View. 
 * This is the editor view for the builder
 * Most imp file
 */
 
define(['underscore', 'jquery', 'backbone', 'global', 'builder/views/Controls'],
		function( _ , $, Backbone, global, Controls){

			var BuilderEditorView = Backbone.View.extend({

				el          : '#aj-imp-builder-drag-drop',

				className   : 'container',
                
                rows        : [],

				initialize  : function(){


				},

				render : function(){

					
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

						return this;
				},

				/**
				 * Binds the droppable  / sortable
				 */
				enableDropSort : function(){
                    
                    var self = this;
                    
					// sort the rows internally
					this.$el.sortable({'revert'	: 'invalid', 'handle' : '.aj-imp-drag-handle'});

					this.$el.find('.columns').sortable({'revert'	: 'invalid'});

					//accept droppable controls
					this.$el.droppable({
											accept : '*[data-control]',
											hoverClass: "ui-state-highlight",
											greedy : true,
											drop: function( event, ui ) {

												var cClass = ui.draggable.attr('data-control');
												
												if(_.isUndefined(Controls[cClass]))
													return;

												var control = new Controls[cClass]({parent: self});
                                                self.rows.push(control);
                                                self.$el.sortable({'revert'	: 'invalid', 'handle' : '.aj-imp-drag-handle'});
												$(event.target).prepend(control.generateBuilderMarkup());									
											}
										});
                                        
                     //this.$el.sortable({'revert'	: 'invalid', 'handle' : '.aj-imp-drag-handle'});
                     //this.$el.sortable('serialize');
				},
                
                /**
                 * Returns current rows for the Editor.Top Level rows
                 * 
                 * @returns {unresolved}
                 */
                getRows : function(){
                    
                    return this.rows;
                    
                }

			});	


			return BuilderEditorView;

		});