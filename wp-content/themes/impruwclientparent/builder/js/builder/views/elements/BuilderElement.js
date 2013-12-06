define(['backbone','jquery','underscore', 'global'], 
		function(Backbone, $, _,  global){

			var BuilderElement = Backbone.View.extend({
               
                /**
                 * Draggable property
                 */  
                draggable   : true,
                
                /**
                 * Editable property
                 */
                editable    : true,
                
                //extra classes for an element
                extraClasses : '',
                
                /**
                 * Parent property
                 */
                parent : null,
                
                /**
                 * All child controls will override this function;
                 * @returns {undefined}
                 */
				render : function(){
                   
                    return this;
				
                },
                
                /**
                 * Generate the json string for element
                 * @returns {undefined}
                 */
                returnJSON : function(){
                   
                   var ele =  {
                                 type           : this.getType(),
                                 draggable      : this.isDraggable(),
                                 editable       : this.isEditable(),
                                 extraClasses   : this.getExtraClasses()
                              };
                   
                   return ele;
                },
                
                /**
                 * 
                 * @returns {undefined}
                 */
                void : function(evt){
                   evt.preventDefault();
                   return false;
                },
                
                /**
                 * 
                 */
                showContextMenu : function(evt){
                   
                     evt.preventDefault();
                     
                     evt.stopPropagation(); //!important
                     
                     if(this.$el.next('.popover').hasClass('in')){
                        
                        this.$el.popover('hide');
                        
                        //reset to null if clicked again
                        window.prevpopover = null;
                        
                     }
                     else{
                        //hide any previously opened popover
                        if(!_.isNull(window.prevpopover))
                              window.prevpopover.popover('hide');
                           
                         this.$el.popover('show');
                         window.prevpopover = this.$el;
                     }
                },
                
                /**
                 * Set context menu for element
                 * @returns {undefined}
                 */
                setContextMenu : function(disAllow){
                   
                   if(_.isUndefined(disAllow))
                      disAllow = {};
                   
                   this.$el.popover({
                        html        : true,
                        title       : this.getType() + ' settings',
                        content     : this.getSettingsMarkup(disAllow),
                        placement   : 'auto',
                        trigger     : 'manual'
                   });
                   
                   this.$el.on('shown.bs.popover', function(evt){
                        $(evt.target).next('.popover').find('input[type="checkbox"]').checkbox();
                   });
                },
                
                /**
                 * Returns the element type
                 * @returns String
                 */
                getType : function(){
                  
                  return this.elementType;
                   
                },
                
                /**
                 * Returns extra classes assigned to the element
                 * @returns string
                 */
                getExtraClasses : function(){
                   
                   return this.extraClasses;
                   
                },
                
                /**
                 * Returns the setting markup
                 * @returns {String}
                 */
                getSettingsMarkup : function(disAllow){
                   
                   var html = '';
                   
                   if(_.isUndefined(disAllow['isDraggable']))
                     html += this.getDraggableSettingMarkup();
                   
                   if(_.isUndefined(disAllow['isEditable']))
                     html += this.getEditableSettingMarkup();
                   
                   if(_.isUndefined(disAllow['className']))
                     html += this.getClassnameSettingMarkup();
                   
                   if(_.isUndefined(disAllow['type']))
                     html += this.getMarkupStyleSettingMarkup();
                   
                   html += '<div class="form-group">\
                                 <input value="Save" type="button" class="btn btn-primary updateProperties"/>\
                           </div>';
                     
                   return html;
                },
                
                /**
                 * Return draggable setting markup
                 * @returns {String}
                 */
                getDraggableSettingMarkup : function(){
                  
                   return '<div class="form-group">\
                                 <label class="checkbox" for="isDraggable">\
                                   <input type="checkbox" '+ (this.isDraggable() ? 'checked="checked"' : '') +' name="isDraggable" data-toggle="checkbox">Draggable?\
                                 </label>\
                           </div>';
                },
                
                /**
                 * Return editable setting markup
                 * @returns {String}
                 */
                getEditableSettingMarkup : function(){
                  
                   return '<div class="form-group">\
                                 <label class="checkbox" for="isEditable">\
                                   <input type="checkbox" '+ (this.isEditable() ? 'checked="checked"' : '') +' name="isEditable" data-toggle="checkbox">Is Editable?\
                                 </label>\
                           </div>';
                },
                
                /**
                 * Return classname setting markup
                 * @returns {String}
                 */
                getClassnameSettingMarkup : function (){
                   
                   return '<div class="form-group">\
                                 <input type="text" name="className" class="form-control" placeholder="Classname" value="'+ this.extraClasses +'">\
                           </div>';
                },
                
                /**
                 * Return matkup style setting markup
                 * @returns {String}
                 */
                getMarkupStyleSettingMarkup : function(){
                   
                   return '<div class="form-group">\
                                 <select name="markupStyle" class="form-control"><option value="Style 1">Style 1</option><option value="Style 1">Style 1</option></select>\
                           </div>';
                },
                
                /**
                 * Updates the properties of the element
                 * @returns void
                 */
                updateProperties : function(evt){
                   
                   var pcontent = $(evt.target).closest('.popover');
                   
                   var id = pcontent.closest('.popover').prev().attr('id');
                   
                   var element = this.getElementByID(id);
                   
                   if(!_.isObject(element))
                      return;
                   
                   //set extra classes
                   if($(pcontent).find('input[name="className"]').length > 0){
                     
                      element.extraClasses += $(pcontent).find('input[name="className"]').val();
                   
                   }
                   
                   //set is draggable
                   if($(pcontent).find('input[name="isDraggable"]').length > 0){
                     
                        if($(pcontent).find('input[name="isDraggable"]').is(':checked'))
                           element.draggable = true;
                     
                   }
                   
                   //set is draggable
                   if($(pcontent).find('input[name="isEditable"]').length > 0){
                     
                        if($(pcontent).find('input[name="isEditable"]').is(':checked'))
                           element.editable = true;
                     
                   }
                   
                   log(element.isDraggable());
                   log(element.isEditable());
                   
                },
                
                /**
                 * Returns the elemnet object by ID
                 * @returns View object or false
                 */
                getElementByID : function(id){
                   
                   //is id passed?
                   if(_.isUndefined(id))
                      return false;
                   
                   //does this element has child elemnts property
                   if(_.isUndefined(this.elements) || !_.isArray(this.elements))
                      return false;
                   
                   //does the element has any child elements
                   if(_.isArray(this.elements) && this.elements.length === 0)
                      return false;
                   
                   var element = false;
                   
                   for(var k = 0,len=this.elements.length; k < len; k++){
                      
                      if(this.elements[k].id === id){
                         element = this.elements[k];
                         break;
                      } 
                      
                   }
                   
                   return element;
                },
                
                /**
                 * Loads the template reading the template file
                 * @returns {void}
                 */
                loadTemplate : function(){
                   
                   this.$el.append(this.template);
                   
                },
                
                /**
                 * checks the type of element
                 * @param {type} type : type to check
                 * @returns {Boolean}
                 */           
                is : function(type){
                    
                    return type === this.type;
                
                },

                /**
                 * Sets the classes for element
                 * @returns {undefined}
                 */
                setClasses : function(){

                    this.$el.addClass(this.className);

                    if(this.isDraggable())
                        this.$el.addClass('aj-draggable');

                    if(this.isEditable())
                        this.$el.addClass('aj-editable');

                },
                
                /**
                 * Set various handlers for element
                 * Drag handler or edit handler
                 * @returns {undefined}
                 */
                setHandlers : function(){
                     
                     if(this.isDraggable()){
                          
                           this.$el.append('<div class="aj-imp-drag-handle">\
                                                <p title="Move">\
                                                    <span class="icon-uniF140"></span>\
                                                </p>\
                                            </div>');
                     }
                    
                     this.setEditHandlers();
                    
                 },
                 
                /**
                  * Set a edit handler
                  */
                setEditHandlers : function(){
                    
                },
                
               /**
                *  Sets the classes for content
                * @returns {undefined}
                */
                setContentClass : function(){
                    
                   if(!_.isUndefined(this.contentClasses))
                      this.$el.children('.content').children().first().addClass(this.contentClasses);
                   
                },
                 
                /**
                 * Updated the default properties for the element
                 * @param {type} config
                 * @returns {void}
                 */
                setProperties : function(config){

                    if(!_.isUndefined(config.draggable))
                        this.draggable = config.draggable;
                    
                    if(!_.isUndefined(config.editable))
                        this.editable  = config.editable;

                    if(!_.isUndefined(config.className))
                        this.className  = config.className;

                },

                /**
                 * Checks if element is editable
                 * @returns {Boolean}
                 */
                isEditable : function(){

                    return this.editable;

                },
                
                /**
                 * check if element is draggable
                 * @returns {Boolean}
                 */
                isDraggable : function(){

                    return this.draggable;

                },
                  
                /**
                 * Returns the parent of the selected view
                 * 
                 * @returns {undefined}
                 */        
                getParent : function(){
                    
                    if(_.isNull(this.parent) || !_.isObject(this.parent))
                        return false;
                    
                    return this.parent;
                },
                                        
                /**
                 * Set the parent element for the element
                 * @param {type} parent
                 * @returns {undefined}
                 */        
                setParent : function(parent){
                    
                    this.parent = parent;
                    
                },

				/**
                 * Generates the Control markup to drop
                 * @returns {unresolved}
                 */
				generateMarkup : function(){
					
                    if(_.isUndefined(this.template))
                        return '';

                    var html = _.template(this.template);

					this.$el.html(html);
                    
                    this.setContentClass();
                    
                    this.setHandlers();
                    
					return this.$el;
				},

                /**
                * returns the content mode markup
                */
                getContentMarkup : function(){

                    var content = this.$el.children('.content');
                    $(content).find('*[contenteditable="true"]').removeAttr('contenteditable');
                    return $(content).html();

                },
                        
                /**
                 * Listen to mouse enter event
                 * @param {type} evt
                 * @returns void
                 */
                elementMouseEnter : function(evt){
                    
                    evt.stopPropagation();

                    if(window.editorMode == 'content')
                        this.$el.children('.aj-element-setting-tooltip,.aj-imp-drag-handle').show();

                    //remove hover style if row is a child of column
                    if(this.parent.type === 'column'){

                         evt.stop = true;

                         this.parent.parent.rowMouseLeave(evt);
                         
                    }
                },
                
                /**
                 * Listen to mouse leave event
                 * @param {type} evt
                 * @returns void
                 */        
                elementMouseLeave : function(evt){
                    
                    evt.stopPropagation();

                    if(window.editorMode == 'content')
                       this.$el.children('.aj-element-setting-tooltip,.aj-imp-drag-handle').hide();

                    if(this.parent.type === 'column'){

                       this.parent.parent.rowMouseEnter(evt);

                    }
                    
                },        
                        
                /**
                 * Removes the element from the column
                 * @returns {undefined}
                 */        
                destroyElement : function(evt){
                    
                    evt.stopPropagation();
                    
                    if(!confirm("Are you sure?"))
                        return;

                    var self = this;
                    
                    //remove itself from list of elments
                    _.each(this.parent.elements, function(element, index){
                    
                        if(element.id === self.id){
                            
                            self.parent.elements.splice(index,1);
                        
                        }
                        
                    });
                    
                    //update the parent UI
                    this.parent.updateEmptyView();
                    
                    //remove element and clear memory
                    this.removeElement(evt);
                    
                    //adjust the column height. Anonymous function call
                    (function(self){
                        
                        setTimeout(function(){
                            
                            self.parent.parent.trigger('adjust_column_dimension');
                        
                        },1200);
                        
                    })(this); 
                    
                },
                        
                /**
                 * Removes the element form the builder UI
                 * 
                 * Call the destroy fucntion which unbinds/deletes all events attached
                 * with control
                 * @param {object} evt
                 * @returns void
                 */        
                removeElement : function(evt){
                	
                    evt.preventDefault();
                    
                    evt.stopPropagation();
                    
                    var self = this;
                    
                	this.$el.fadeOut(1000, function(){
                    
                        self.destroy();
                    
                    });
                },

				/**
                 * Remove the control from memory
                 *  
                 * @returns {undefined}
                 */
				destroy : function() {

				    if (_.isFunction(this.beforeClose)) {
				    
                        this.beforeClose();
				    
                    }

				    this.off(); //unbind all events of the view being closed

				    this.remove(); // Remove view from DOM

				    this.undelegateEvents();

				    delete this.$el; // Delete the jQuery wrapped object variable

				    delete this.el;
				}

			});

			return BuilderElement;

		});