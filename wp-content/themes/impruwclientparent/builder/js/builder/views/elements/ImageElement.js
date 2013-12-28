define(['builder/views/elements/BuilderElement','text!builder/templates/elements/ImageElement.hbs', 'global'], 
		function(BuilderElement, template, global){

			var ImageElement = BuilderElement.extend({

                className           : 'aj-imp-elem-image element',
                
                //define template for control
				template            : template,
                
                //element type
                elementType          : 'ImageElement',
                
                //identify element type
                type                : 'image',
                
                //set height to be assigned to placeholder and helper
                placeHolderHeight   : 100,

                //datasource
                dataSource          : null,

                //
                events : {
                    'mouseenter'                        : 'elementMouseEnter',
                    'mouseleave'                        : 'elementMouseLeave',
                    'click > .aj-imp-delete-btn'        : 'destroyElement',
                    'contextmenu'                       : 'showContextMenu',
                    'click'                             : 'showMediaManager'
                },
                
                /**
                 * Initialize view 
                 * 
                 * @param {type} options
                 * @returns {undefined}
                 */
                initialize : function(options){
                 
                    _.bindAll(this, 'elementMouseEnter','elementMouseLeave','updateSelf');
                    
                    //drop mode
                    if(_.isUndefined(options.config)){
                        this.id = this.type + '-' + global.generateRandomId();
                        this.$el.attr('id' , this.id); 
                    }
                    else{
                        this.setProperties(options.config);
                    }
                    this.generateMarkup();
                    this.setParent(options.parent);
                    this.setContextMenu();
                    
                },
                        
                /**
                 * Generates the markup for column 
                 * and triggers the column droppable function
                 * 
                 * @param {type} col
                 * @returns {_L2.Anonym$0}
                 */        
                render : function(){
                    
                    return this;
                },

                /**
                 * retunrs the JSOn
                 */
                generateJSON : function(){

                    var json = this.returnJSON();

                    if(!_.isNull(this.dataSource)){
                        json.data = {};
                        json.data.attachmentID = this.dataSource.get('id');
                        json.data.size         = 'medium';
                    }

                    return json;
                },

                /**
                 * Show the media manager modal 
                 */
                showMediaManager : function(){

                   var self = this; 

                   require(['underscore','mediamanager'], function( _ , MediaManager){
                        
                        var mediamanager = SiteBuilder.ViewManager.findByCustom("media-manager");

                        if(_.isUndefined(mediamanager)){
                            mediamanager = new MediaManager();
                            SiteBuilder.ViewManager.add(mediamanager, "media-manager");
                        }

                        //start listening to event
                        SiteBuilder.vent.on('image-selected', self.updateSelf);

                        mediamanager.open(self);
                        
                   });

                },
                
                /**
                 * Update self
                 * @returns {undefined}
                 */
                updateSelf : function(image){
                    
                    SiteBuilder.vent.off('image-selected', self.updateSelf);

                    if(!_.isObject(image))
                        return;

                    this.dataSource = image;

                    this.$el.find('img').attr('src', this.dataSource.get('sizes').medium.url); 
                   
                }
                
            });
            
            return ImageElement;
        });
  
    

