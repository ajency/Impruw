/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * configure require
 *
 * @param {type} param
 */
require.config({
    urlArgs : "ver=" + (new Date()).getTime(), //to avoid file caching
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
        //Views
        mainview			: 'views/DashboardMainView',
        leftview			: 'views/LeftColumnView',
        siteprofileview		: 'views/siteprofile/SiteProfileView',
        userprofileview		: 'views/userprofile/UserProfileView',
        //Models
        sitemodel			: 'models/SiteModel',
        usermodel			: 'models/UserModel',
        //templates
        siteprofileviewtpl 	: 'templates/siteprofile/SiteProfileViewTpl'
        
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
            deps : ['bootstrap']
        }
    }
});

function log(object){
    console.log(object);
}


//init the app
require(['backbone',
         'routers/DashboardRouter','sitemodel','usermodel'], function( Backbone, Router, SiteModel, UserModel) {

        $(document).ready(function(){   
        	 
			window.impruwSite = new SiteModel(SITEID);
			window.impruwUser = new UserModel(USERDATA);
			/*window.impruwSite.getSiteProfile({
				success:function(){
					dashboard = new Router();
				}
			});*/
			
			dashboard = new Router();
            Backbone.history.start();
            
           
            
        });

});


