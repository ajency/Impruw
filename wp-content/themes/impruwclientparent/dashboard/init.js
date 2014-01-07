/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var _urlArg = "ver=" + (location.host === 'localhost' ? (new Date()).getTime() : '1.0'); //to avoid file caching

/**
 * configure require
 *
 * @param {type} param
 */
require.config({
    urlArgs : _urlArg,
    baseUrl: THEMEURL + '/dashboard/',
    paths: {
        jquery      		: 'lib/jquery.min',
        jqueryui    		: 'lib/jquery.ui.min',
        bootstrap   		: 'lib/bootstrap.min',
        bootstrapselect 	: 'lib/bootstrapselect',
        underscore  		: 'lib/underscore.min',
        backbone    		: 'lib/backbone.min',
        text        		: 'lib/text',
        moment      		: 'lib/moment.min',
        cookie      		: 'lib/cookie.min',
        string      		: 'lib/underscore.string.min',
        numerals    		: 'lib/numerals.min',
        checkbox    		: 'lib/flatui-checkbox',
        radio       		: 'lib/flatui-radio',
        nestable            : 'lib/nestable',
        marionette      	: 'lib/backbone.marionette.min',

        //Views
        mainview			: 'views/DashboardMainView',
        leftview			: 'views/LeftColumnView',
        siteprofileview		: 'views/siteprofile/SiteProfileView',
        userprofileview		: 'views/userprofile/UserProfileView',
        addroomview			: 'views/rooms/AddRoomView',
        addtaxmodal			: 'views/modals/AddTax',
        addplanmodal		: 'views/modals/AddPlan',
        addaddonmodal		: 'views/modals/AddAddOn',

        //Models
        sitemodel			: 'models/SiteModel',
        usermodel			: 'models/UserModel',
        roommodel			: 'models/RoomModel',

        //templates
        siteprofileviewtpl 	: 'templates/siteprofile/SiteProfileViewTpl',
        addtaxviewtpl       : 'templates/modal/AddTax'
        
    },
    waitSeconds: 15,
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'string' : {
            deps : ['underscore']
        },
        'checkbox' :{
            deps : ['jquery']
        },
        'radio' :{
            deps : ['jquery']
        },
        'moment' : {
            deps : ['jquery'],
            exports : 'moment'
        },
        'jqueryui' : {
            deps : ['jquery']    
        },
        'bootstrap' : {
            deps : ['jquery']    
        },
        'bootstrapselect' : {
            deps : ['jquery','bootstrap']
     
        },
        'marionette' : {
        	deps : ['backbone'],
        	exports : 'Marionette'
        }
        
    }
});

function log(object){
    console.log(object);
}


//init the app
/*require(['backbone',
         'routers/DashboardRouter','sitemodel','usermodel','jquery'], function( Backbone, Router, SiteModel, UserModel,$) {

        $(document).ready(function(){   
        	 
			window.impruwSite = new SiteModel(SITEID);
			window.impruwUser = new UserModel(USERDATA);
			 
			/*window.impruwSite.getSiteProfile({
				success:function(){
					dashboard = new Router();
				}
			});* /
			
			dashboard = new Router();
            Backbone.history.start();
            
           
            
        });

});*/

  require(['backbone','marionette',
         'routers/DashboardRouter','sitemodel','usermodel','jquery'], 
         function( Backbone, Marionette, Router, SiteModel, UserModel,$) {

         $(document).ready(function(){   

             window.impruwSite = new SiteModel(SITEID);
             window.impruwUser = new UserModel(USERDATA);

             /*window.impruwSite.getSiteProfile({
                 success:function(){
                     dashboard = new Router();
                 }
             });*/

             ImpruwDashboard = new Backbone.Marionette.Application();
             ImpruwDashboard.addInitializer(function(){
                 new Router();
                 Backbone.history.start();
             });

             ImpruwDashboard.start();

         });

}); 
  


