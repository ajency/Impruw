define(['builder/views/controls/BuilderControl', 'builder/views/controls/layout/BuilderRowColumn', 'text!builder/templates/controls/layout/BuilderRow.hbs','global'], 
		function(BuilderControl, BuilderRowColumn, template, global){

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
                    'click .aj-imp-delete-btn'         : 'removeControl',
                    'click .aj-imp-col-sel ul li a'    : 'addColumnsToRow' 
				},

                //used to identify drag direction(right / left)
                prevX : -1,

               /**
                 * Generates the Control markup to drop 
                 * @returns {unresolved}
                 */
                generateBuilderMarkup : function(){
                    
                    var self = this;

                    //
                    this.gridX = Math.floor(this.$el.width / this.column);

                    //set random ID for control
                    this.$el.attr('id' , this.name + '-' + global.generateRandomId());
                    
                    var colClass = 12 / self.columns;
                    
                    //append columns
                    _.each(_.range(this.columns), function(){
                         
                         var column = new BuilderRowColumn();  
                         column.render(colClass);
                         self.$el.append(column.$el);
                     
                    }); 
                    
                    //append column edit popover + drag handle + delete button
                    this.$el.append(_.template(this.template));
                    
                     
                    //set divder left
                    this.$el.find('.aj-imp-col-divider').css('left', (Math.ceil(100 / this.columns)) +'%');

                    return this.$el;
                },
                
                /**
                 * Devides the parent row into nmber of columns
                 * @returns {undefined}
                 */        
                addColumnsToRow : function(evt){
                    
                    evt.preventDefault();
                    
                    //if same column count is clicked ignore
                    if($(evt.target).parent().hasClass('active'))
                        return;
                    
                    var self = this;
                    
                    this.$el.find('div[class^="col-"]').remove();
                    
                    //set active 
                    $(evt.target).parent().addClass('active').siblings().removeClass('active');
                    
                    //add new columns
                    this.columns = parseInt($(evt.target).text());
                    
                    _.each(_.range(this.columns), function(){
                        
                        var colClass = 12 / self.columns;
                        
                        self.$el.append('<div class="col-sm-'+colClass+' column">\
                                            <div class="clearfix">\
                                                &nbsp;\
                                                <div class="aj-imp-drag-elements-message"><span class="glyphicon glyphicon-transfer"></span>Drag Elements Here</div>\
                                            </div>\
                                        </div>');
                    });    
                },
                
                /**
                 * Listen to mouse enter event
                 * @param {type} evt
                 * @returns void
                 */
                controlMouseEnter : function(evt){
                    this.$el.css('border', '1px solid #ff7e00');
                    this.$el.find('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').show();
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
                    this.$el.find('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').hide();
                }

			});

			return BuilderRow;

		});