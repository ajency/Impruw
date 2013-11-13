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

                mode        : 'layout',


				initialize  : function(){
                        
                    _.bindAll(this, 'enableDropSort','getRows','is','holdOnWhileSwitching', 'removeSwitchLoader','switchMode',
                                    'switchToLayout', 'switchToContent');    

				},
                
                /**
                 * Check the view type
                 * 
                 * @param {type} type
                 * @returns {Boolean}
                 */        
                is : function(type){

                    return type === 'editor';

                },        

                /**
                *  Render function for view 
                */
				render : function(){
                        
                        var self = this;
					
						//enable controls drag
						$( "#controls-drag" ).draggable({
							 handle: "p.desc",
							 addClasses: false
						});
                        
                        /** Controls Draggable */
                        $('*[data-element]').draggable({
                                                        connectToSortable   : "#aj-imp-builder-drag-drop,.column",
                                                        helper				: 'clone',
                                                        revert 				: 'invalid',
                                                        start  				: function (e, t) {
                                                                                    var ele = t.helper.attr('data-element');
                                                                                    if(ele === 'BuilderRow' || ele === 'BuilderRowColumn')
                                                                                        t.helper.width(286);
                                                                                    else
                                                                                        t.helper.width(92).height(80);
                                                                              }                           
                                                    });
						

						return this;
				},

                /**
                *
                **/
                switchMode : function(){

                    this.holdOnWhileSwitching();
                   
                    if(this.mode === 'layout'){

                        this.switchToContent();
                    
                    }
                    else if(this.mode === 'content'){
                    
                        this.switchToLayout();
                    
                    }

                },

                /**
                *  Switch to layout mode
                */
                switchToLayout : function(){

                    //
                    this.$el.attr('id','aj-imp-builder-drag-drop').parent().removeClass('aj-imp-preview');
                    this.removeSwitchLoader();
                    this.mode = 'layout';
                },

                /**
                * Show the loader while switching modes
                */
                holdOnWhileSwitching : function(){

                    var switcher = $('<div class="element-drop-loader" id="editor-initial-loader">\
                                        <p>switching mode... Please wait... </p>\
                                    </div>');

                    switcher.height(this.$el.height()).css('top',0);

                    this.$el.append(switcher);

                },

                /**
                * removes the switch loader
                */
                removeSwitchLoader : function(){

                    this.$el.find('#editor-initial-loader').fadeOut('slow', function(){
                        
                        $(this).remove();
                    
                    });

                },

                /**
                *  Switch to content mode
                */
                switchToContent : function(){
                    this.$el.find('.layout').hide();
                    this.$el.find('.content').show(); 
                    this.$el.removeAttr('id').parent().addClass('aj-imp-preview').css('background-image','url()');
                    this.removeSwitchLoader();
                    this.mode = 'content';

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
                                                           row.appendColumnResizer();
                                                        },
                                         sort       : function(event , ui){
                                                            var pHeight = ui.helper.attr('data-placeholder-height');
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