define(['builder/views/controls/BuilderControl', 'text!builder/templates/controls/layout/BuilderRow.hbs', 'global'], 
		function(BuilderControl, template, global){

			var BuilderRow = BuilderControl.extend({

				className : 'row',

				//define template for control
				template 	: template,

				//set name for row. Will be used to generate unique ID for each control
				name 		: 'row',

                columns : 2,

				//register events
				events : {
					'mouseover'            	      : 'controlMouseEnter',
                    'mouseout  '                      : 'controlMouseOut',
                    'click .aj-imp-delete-btn'        : 'removeControl'
				},

                /**
                * Generates the Control markup to drop
                */
                generateBuilderMarkup : function(builder){
                    
                    var self = this;

                    //set ID from control
                    this.$el.attr('id' , this.name + '-' + global.generateRandomId());

                    this.$el.html(_.template(this.template));

                    //set divder left
                    this.$el.find('.aj-imp-col-divider').css('left', (Math.ceil(100 / this.columns)) +'%');

                    
                    //make it draggable
                    /*
                    this.$el.draggable({
                                            addClasses          : false,
                                            
                                            handle              : '.aj-imp-drag-handle',
                                            
                                            revert              : 'invalid',

                                            drag                :   function (e, t) {
                                                                        t.helper.css('z-index',1000);
                                                                    },

                                            stop                :   function(e,t){
                                                                        t.helper.css('z-index', self.zIndex);
                                                                        builder.$el.find(builder.builderId).find('.row').css({top:0,left:0});
                                                                        //builder.$el.find(builder.builderId).sortable('destroy');
                                                                        
                                                                    },

                                            start                :  function(e,t){
                                                                        self.zIndex = 10;
                                                                        //builder.$el.find(builder.builderId).droppable( 'destory' );
                                                                        //builder.$el.find(builder.builderId).sortable();
                                                                    }                                                
                                        });*/

                    return this.$el;
                },
                
                /**
                 * Listen to mouse enter event
                 * @param {type} evt
                 * @returns void
                 */
                controlMouseEnter : function(evt){
                    this.$el.css('border', '1px solid #ff7e00');
                    this.$el.find('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider').show();
                },

                columnMouseEnter : function(){

                },
                
                /**
                 * Listen to mouse out event
                 * @param {type} evt
                 * @returns void
                 */        
                controlMouseOut : function(evt){
                    this.$el.css('border', '1px solid transparent');
                    this.$el.find('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider').hide();
                },

                removeControl : function(evt){
                	evt.preventDefault();

                    var self = this;
                    if(!confirm("Are you sure?"))
                        return;

                	this.$el.slideToggle(1000);
                }

			});

			return BuilderRow;

		});