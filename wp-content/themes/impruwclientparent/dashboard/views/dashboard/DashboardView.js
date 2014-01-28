/**
 * The DashDefaultView.
 * 
 */

define([ 'underscore', 'jquery', 'backbone', 
		'text!templates/siteprofile/DashboardViewTpl.tpl',
		 ,'bootstrap' ], 
		function(_, $, Backbone, DashboardDefaultViewTpl,bootstrap) {

	var DashboardDefaultView = Backbone.View.extend({

		id : 'dashboard-default',

		render : function() {

			var self = this;

			//g = this.site;
			var template = _.template(DashboardDefaultViewTpl);
			
			console.log(template);

			var html = template({
				site : this.site
			});

			this.$el.html(html);
			return this;
		} 
		 

	});

	return DashboardDefaultView;

});