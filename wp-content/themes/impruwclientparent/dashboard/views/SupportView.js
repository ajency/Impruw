/**
 * The UserProfile View.
 * 
 */

define([ 'underscore', 'jquery', 'backbone',
		'tpl!templates/support.tpl'], 
		function(_, $,Backbone, template) {

		var SupportView = Backbone.View.extend({

			id : 'support',

		 	render : function() {

				var html = template(); 

				this.$el.html(html);
				
				return this;
			}

		});

		return SupportView;

});