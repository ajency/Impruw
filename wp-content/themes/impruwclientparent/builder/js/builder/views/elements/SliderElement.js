define(['builderelement','tpl!builder/templates/elements/BasicElement.tpl', 'global'], 
function(BuilderElement, template, global){

  var SliderElement =   BuilderElement.extend({

               //class name for view
               className           : 'aj-imp-elem-slider element',
               
               //define template for control
               template            : template,
               
               //set height to be assigned to placeholder and helper
               placeHolderHeight   : 60,
               
               //
               events : {
                   'mouseenter'                 : 'elementMouseEnter',
                   'mouseleave'                 : 'elementMouseLeave',
                   'click > .aj-imp-delete-btn' : 'destroyElement'
               },
               
               /**
                * Initialize view 
                * 
                * @param {type} options
                * @returns {undefined}
                */
               initialize : function(options){
                   
                   //drop mode
                  if (_.isUndefined(options.config)) {
                      this.id = this.type() + '-' + global.generateRandomId();
                      this.$el.attr('id', this.id);
                  } else {
                      this.setProperties(options.config);
                  }
                  this.generateMarkup({icon : '', name : 'Slider Element'});
               
                  this.setContextMenu();
                   
               }
               
           });
           
           return SliderElement;
       });
 
   