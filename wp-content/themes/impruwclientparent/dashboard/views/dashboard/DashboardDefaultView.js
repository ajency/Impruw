/**
 * The DashDefaultView.
 * 
 */

define([ 'underscore', 'jquery', 'backbone', 
		'text!templates/siteprofile/DashboardDefaultViewTpl.tpl',
		 ,'bootstrap' ], 
		function(_, $, Backbone, DashboardDefaultViewTpl,bootstrap) {

	var DashboardDefaultView = Backbone.View.extend({

		id : 'dashboard-default',

		events : {
			 
		},

		initialize : function(args) {
			
			//_.bindAll(this , 'saveProfileSuccess', 'saveProfileFailure','parsleyInitialize');			
				
			if(_.isUndefined(args.site))
				this.showInvalidCallView();
			
			this.site = args.site;
			
			//ImpruwDashboard.vent.on("user-profile-updated", this.updatedProfileView);

		},
		 
		 
		/**
		 * 
		 * @param data
		 */
		updatedProfileView : function(data){
			
			var name = data.fullname;
			this.$el.find('inout[name="full-name"]').val(name);
			
			
		},
		
		render : function() {

			var self = this;

			//g = this.site;
			var template = _.template(DashboardDefaultViewTpl);

			var html = template({
				site : this.site
			});

			this.$el.html(html);

			/*//set custom selectbox & checkbox
			this.$el.find('select').selectpicker();
			this.$el.find('input[type="checkbox"]').checkbox();			
			
			//initialize parsley validation for the forms
			this.parsleyInitialize(this.$el.find('#form-siteprofile-business'));
			this.parsleyInitialize(this.$el.find('#form-siteprofile-social'));*/
			$(".aj-imp-long-form-actions").affix()
			return this;
		} 
		 

	});

	return DashboardDefaultView;

});