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

				url : function(){
					return AJAXURL + '?action=get_site_menus';
				},

				isFetched : function(){
					
					return this.fetched;

				}

			});

			return MenuCollection;

		});