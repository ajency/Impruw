/**
 *  Media .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['builder/views/modals/Modal','text!builder/templates/modal/media.hbs', 
        'mediamodel','mediacollection', 'global','parsley'], 
		
        function(Modal, template, MediaModel, MediaCollection, global){


            var Media = Modal.extend({

                className : 'media',

                template : template,

                events   : {
                    'click .refetch-media'          : 'fetchMedia'
                },

                /**
                 * Initialize the manager 
                 */
                initialize : function(args){

                    
                }

            });

            return MediaManager;
			
        });
  
    


