define(['builder/views/controls/BuilderControl', 'text!builder/templates/controls/layout/BuilderRow.hbs', 'global'], 
		function(BuilderControl, template, global){

			var BuilderRow = BuilderControl.extend({

                //create a div element with class "row"
				className : 'row',

				//define template for control
				template 	: template,

				//set name for row. Will be used to generate unique ID for each control
				name 		: 'row',
                
                //number of columns
                columns     : 2,

				//register events
				events : {
					'mouseover'            	           : 'controlMouseEnter',
                    'mouseout  '                       : 'controlMouseOut',
                    'mousemove .column'                : 'columnMouseMove',
                    'click .aj-imp-delete-btn'         : 'removeControl'
				},

                //used to identify drag direction(right / left)
                prevX : -1,

               /**
                 * Generates the Control markup to drop 
                 * @returns {unresolved}
                 */
                generateBuilderMarkup : function(){
                    
                    var self = this;

                    //set random ID for control
                    this.$el.attr('id' , this.name + '-' + global.generateRandomId());

                    this.$el.html(_.template(this.template));

                    //set divder left
                    this.$el.find('.aj-imp-col-divider').css('left', (Math.ceil(100 / this.columns)) +'%');

                    //enable draggable
                    this.$el.find('.aj-imp-col-divider').draggable({
                                                                    axis: 'x',
                                                                    containment : 'parent',
                                                                    drag : function(e, ui){
                                                                        //console.log(e.pageX);
                                                                        if(self.prevX == -1) {
                                                                            self.prevX = e.pageX;    
                                                                            return false;
                                                                        }
                                                                        
                                                                        if(self.prevX > e.pageX) {
                                                                            //ui.helper.closest('.row').find('.column').last();
                                                                        }
                                                                        
                                                                        else if(self.prevX < e.pageX) { // dragged right
                                                                           
                                                                        }
                                                                        
                                                                        self.prevX = e.pageX;
                                                                    }
                                                                });

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
                
                /**
                 * Listen to column mousemove event. 
                 * 
                 * If the current column has class "filled" do not do anything. the column child elements will handle the mouseover action
                 * @param {type} evt
                 * @returns {unresolved}
                 */
                columnMouseMove : function(evt){

                    if(!$(evt.target).hasClass('filled'))
                        return;

                    this.controlMouseOut();
                    this.$el.find('.aj-imp-col-divider').show();
                },
                
                /**
                 * Listen to mouse out event
                 * @param {type} evt
                 * @returns void
                 */        
                controlMouseOut : function(evt){
                    this.$el.css('border', '1px solid transparent');
                    this.$el.find('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider').hide();
                }

			});

			return BuilderRow;

		});