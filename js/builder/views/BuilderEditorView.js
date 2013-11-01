/**
 * The Builder Editor View. 
 * This is the editor view for the builder
 * Most imp file
 */
 
define(['underscore', 'jquery', 'backbone', 'global', 'builder/views/Elements'],
		function( _ , $, Backbone, global, Elements){

			var BuilderEditorView = Backbone.View.extend({

				el          : '#aj-imp-builder-drag-drop',

				className   : 'container',
                
                rows        : [],

				initialize  : function(){
                        
                    _.bindAll(this, 'enableDropSort','getRows');    

				},

				render : function(){
                        
                        var self = this;
					
						//enable controls drag
						$( "#controls-drag" ).draggable({
							 handle: "p.desc",
							 addClasses: false
						});
                        
                        /** Controls Draggable */
                        $('*[data-element="BuilderRow"]').draggable({
                                                        connectToSortable   : "#aj-imp-builder-drag-drop,.column",
                                                        helper				: 'clone',
                                                        revert 				: 'invalid',
                                                        drag  				: function (e, t) {
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
                    
                    this.$el.sortable({
                                        revert      : 'invalid',
                                        items       : '> .row',        
                                        connectWith : '#aj-imp-builder-drag-drop,.column',
                                        opacity     : .65,
                                        handle      : '.aj-imp-drag-handle',
                                        receive     : function(event, ui) {
                                                           var row = new Elements['BuilderRow']({parent: self});
                                                           self.rows.push(row);
                                                           $(event.target).find('*[data-element="BuilderRow"]').replaceWith(row.generateBuilderMarkup());
                                                           row.sortableColumns();
                                                        },
                                         sort       : function(event , ui){
                                                            var pHeight = ui.helper.attr('data-placeholder-height');
                                                            log(pHeight);
                                                            ui.placeholder.height(parseInt(pHeight));
                                                        }                                         
                                    }).disableSelection(); 
                                        
                                         
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