/**
 * The Builder Editor View. 
 * This is the editor view for the builder
 * Most imp file
 */
 
define(['underscore', 'backbone', 'global'],
		function( _ , Backbone, global){

			var MenuCollection = Backbone.Collection.extend({

				//property to cross check if menu collecion is fetched before or not
				fetched : false,
                
                /**
                 * Url to fetch all menus for the Site
                 * @returns {String}
                 */
				url : function(){
					return AJAXURL + '?action=get_site_menus';
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

			return MenuCollection;

		});