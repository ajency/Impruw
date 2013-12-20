/**
 * The Builder Editor View. 
 * This is the editor view for the builder
 * Most imp file
 */
 
define(['underscore', 'backbone',  'global'],
		function( _ , Backbone, global){

			var MediaModel = Backbone.Model.extend({

				//property to cross check if menu collecion is fetched before or not
				fetched : false,


				url : function(){
					return AJAXURL + '?action=get_media' + (!this.isNew() ?'&menu-id=' + this.get('id') : '');
				},

               /**
                 * Checks if the collection is fetched or not
                 * @returns {Boolean}
                 */
				isFetched : function(){
					
					return this.fetched;
				},
                
                /**
                 * Set the fetched property for collection
                 * Used to decide whether to triger the fetch or not
                 * @param {boolean} set
                 * @returns void
                 */
                setFetched : function(set){

                   if(_.isBoolean(set))
                      this.fetched = set;

                }
			});

			return MediaModel;

		});