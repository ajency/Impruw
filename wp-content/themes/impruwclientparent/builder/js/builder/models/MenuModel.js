/**
 * The Builder Editor View. 
 * This is the editor view for the builder
 * Most imp file
 */
 
define(['underscore', 'backbone',  'global'],
		function( _ , Backbone, global){

			var MenuModel = Backbone.Model.extend({

				//property to cross check if menu collecion is fetched before or not
				fetched : false,

				url : function(){
					return AJAXURL + '?action=get_site_menu' + (!this.isNew() ?'&menu-id=' + this.get('id') : '');
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

                },

                /**
                 * Update menu Item model
                 */
                updateMenuItem : function(data){

                    if(!_.isObject(data))
                        throw 'data argument must be a object';

                    var items = this.get('items');

                    items[data.ID] = data;
                    
                    this.set('items',items);

                },

			});

			return MenuModel;

		});