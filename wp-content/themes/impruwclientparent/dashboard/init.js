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
        jquery      			: 'lib/jquery.min',
        jqueryui    			: 'lib/jquery.ui.min',
        bootstrap   			: 'lib/bootstrap.min',
        bootstrapselect 		: 'lib/bootstrapselect',
        underscore  			: 'lib/underscore.min',
        backbone    			: 'lib/backbone.min',
        text        			: 'lib/text',
        moment      			: 'lib/moment.min',
        cookie      			: 'lib/cookie.min',
        string      			: 'lib/underscore.string.min',
        numerals    			: 'lib/numerals.min',
        checkbox    			: 'lib/flatui-checkbox',
        radio       			: 'lib/flatui-radio',
        nestable            	: 'lib/nestable',
        marionette      		: 'lib/backbone.marionette.min',
        plupload        		: 'lib/plupload.full.min',
        tpl                     : 'lib/tpl',
        parsley                 : 'lib/parsley/parsley',
        
        //Views
        mainview				: 'views/DashboardMainView',
        leftview				: 'views/LeftColumnView',
        dashboardview	        : 'views/dashboard/DashboardView',
        siteprofileview			: 'views/siteprofile/SiteProfileView',
        userprofileview			: 'views/userprofile/UserProfileView',
        addroomview				: 'views/rooms/AddRoomView',
        supportview             : 'views/SupportView',
        
        addtaxmodal				: 'views/modals/AddTax',
        addplanmodal			: 'views/modals/AddPlan',
        addtariffmodal			: 'views/modals/AddTariff',
        addaddonmodal			: 'views/modals/AddAddOn',
        adddaterangemodal		: 'views/modals/AddDaterange',
        
        roomlistview			: 'views/rooms/RoomListView',
       
        modal                   : 'views/modals/Modal',
        mediamanager    		: 'views/modals/media/MediaManager',
        mediasingle     		: 'views/modals/media/SingleMedia',

        //Models
        sitemodel				: 'models/SiteModel',
        usermodel				: 'models/UserModel',
        roommodel				: 'models/RoomModel',
        mediamodel				: 'models/MediaModel',

        //Collections
        mediacollection			: 'collections/MediaCollection',
        roomcollection			: 'collections/RoomCollection',	
        
        //templates
        siteprofileviewtpl 		: 'templates/siteprofile/SiteProfileViewTpl',
        addtaxviewtpl       	: 'templates/modal/AddTax'
        
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
        'plupload': {
            deps : ['jqueryui'],
            exports : 'plupload'
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


/**
 * Returns the main application object instance
 * @return {[type]} [description]
 */
function getAppInstance(){

    return ImpruwDashboard;

}

/**
 * 
 * @param property
 */
function appHasProperty(property){
	
	var app = getAppInstance();
	
	return _.isUndefined(app[property]) !== true;
	
}

/**
 * Form Data
 * @param  {[type]} form [description]
 * @return {[type]}      [description]
 */
function getFormData(form) {

    if (_.isUndefined(form))
        return false;

    var serializedData = $(form).serializeArray();

    var data = {};

    _.each(serializedData, function(ele, key) {

        if(_.endsWith(ele.name,'[]')){

            var name = ele.name.replace('[]','');

            if(!_.isArray(data[name]))
                data[name] = [];

            data[name].push(ele.value); 
        }
        else{
            data[ele.name] = ele.value;
        }
    });

    return data;

}



/**
 * Function to initialize parsley validation for a form
 * @param formelement
 */

 function parsleyInitialize(formelement){
	
 	
	formelement.parsley({
		errors: {
			
			errorsWrapper: '<span class="help-block" style="display:block"></span>',
	    	  
	    	errorElem: '<span style="display:block"></span>',
	    	
		    container: function (element) {
    		    		var $container = element.parent().parent().find(".p-messages");
    		    		if ($container.length === 0) {
    	                   $container = $("<div class='p-messages'></div>").insertAfter(element);
    		    		}
    		    		return $container;
		    }
		   
		},
        listeners: {
           onFieldSuccess: function ( elem, constraints, ParsleyField ) { 
        	   
        	   if(elem.parent().hasClass('input-group'))
        		   elem.parent().parent().parent().removeClass("has-error").addClass("has-success");
        	   else
        		   elem.parent().parent().removeClass("has-error").addClass("has-success");
              elem.parent().parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
              elem.after('<span class="validation-icon input-icon fui-check-inverted"></span>') 
           } ,
           
           onFieldError: function ( elem, constraints, ParsleyField ) { 
        	    
        	   if(elem.parent().hasClass('input-group'))
        		   elem.parent().parent().parent().removeClass("has-success").addClass("has-error");
        	   else	
        		   elem.parent().parent().removeClass("has-success").addClass("has-error"); 
               
               elem.parent().parent().find('.fui-check-inverted,.fui-cross-inverted').remove();
               elem.after('<span class="validation-icon input-icon fui-cross-inverted"></span>') 
            }  
       }
	});
	
}

require(['backbone','marionette',
         'routers/DashboardRouter','sitemodel','usermodel'], 
         function( Backbone, Marionette, Router, SiteModel, UserModel) {

         $(document).ready(function(){   

            Backbone.emulateHTTP = true;
            
            ImpruwDashboard = new Backbone.Marionette.Application();
            
            getAppInstance().reqres.setHandler('get-image-url', function(attachmentId, size, callback){

                var responseFn =    _.bind(function(response){
                                        
                                        if(response.code === 'OK')
                                            this.fn(response.url);

                                    }, {fn : callback});

                $.get(  AJAXURL,
                        {
                            action : 'get_image_url',
                            attId  : attachmentId,
                            size   : size
                        },
                        responseFn,
                        'json');
            });


            getAppInstance().addInitializer(function(){
            	
                getAppInstance().ViewManager = new Backbone.ChildViewContainer();
                getAppInstance().impruwUser    = new UserModel(USERDATA);   

            });
             
            
            getAppInstance().addInitializer(function(){
                
                new Router();
                Backbone.history.start();

            });

            getAppInstance().start();

         });

}); 
  


