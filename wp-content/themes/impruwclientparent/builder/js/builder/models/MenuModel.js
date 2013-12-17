/**
 * The Builder Editor View. 
 * This is the editor view for the builder
 * Most imp file
 */
 
define(['underscore', 'backbone',  'global'],
		function( _ , Backbone, global){

			var MenuModel = Backbone.Model.extend({

				defaults : function(){
					return {

					};
				},

				url : function(){
					return AJAXURL + '?action=menu_manager';
				},
				
				validate : function(){
					
				}

			});

			return MenuModel;

		});