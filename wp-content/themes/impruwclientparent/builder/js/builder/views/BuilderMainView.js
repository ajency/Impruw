/**
 * The Main Builder Router.
 * This is the main router for the builder
 */

define(['underscore', 'jquery', 'backbone', 'builder/views/BuilderEditorView'],
    function(_, $, Backbone, BuilderEditorView) {


        var BuilderMainView = Backbone.View.extend({

            el: '.aj-imp-builder',

            events: {
                'click label.editormode'        : 'switchMode',
                'click #generate-markup'        : 'generateMarkup',
                'click #generate-json'          : 'generateJSON',
                'click #choose-template li a'   : 'updateTemplate',
                'click #publish-page'           : 'generateJSON',
                'click #save-initial-layout'    : 'saveInitialLayout',
                'click #load-theme-page'        : 'setThemePage',
                'change select[name="current_page_id"]' : 'setThemePage'
            },


            initialize: function() {

                _.bindAll(this, 'handleInitialLoader', 'switchMode', 'renderView', 'updateTemplate');

                this.builderId = '';

                var pid = $.cookie('current_page_id');

                if(_.isUndefined(pid)){
                    pid = $('select[name="current_page_id"]').val();
                    $.cookie('current_page_id', pid, { expires: 7 });
                }
            },

            /**
             * Show the builder
             * @return {[type]} [description]
             */
            render: function() {

                var self = this;

                //setup select picker
                this.$el.find('.aj-imp-builder-top-nav select').selectpicker({
                                                                    style: 'btn-mini btn-default',
                                                                    menuStyle: 'dropdown'
                                                                });

                this.renderView();

            },

            /**
             * Sets the cookie for the selected theme and page
             */
            setThemePage : function(evt){

                evt.preventDefault();

                var button = $(evt.target);

                var page   = button.parent().find('select[name="current_page_id"]').val();
            
                $.cookie('current_page_id', page, { expires: 7 });

                window.location.reload();
            },

            /**
             * Generates the json
             *
             * @returns void
             */
            generateJSON: function(evt) {

                evt.preventDefault();

                var self = this;

                if (_.isUndefined(this.builder))
                    return;

                self.builder.generateJSON();
                self.builder.sendJSONToServer(evt);
        
            },

            /**
             * This function saves the initial layout for the page
             * makes a call to  Editors SaveInitialLayout function
             * @return {[type]} [description]
             */
            saveInitialLayout : function(evt){
                evt.preventDefault();
                this.builder.saveInitialLayout(evt);
            },

            /**
             * Update the template
             * @return {[type]} [description]
             */
            updateTemplate: function() {

                //void definition

            },

            renderView: function(config) {

                this.builder = new BuilderEditorView();

                this.builder.render();


                this.$el.find('.aj-imp-browser-body').html(this.builder.$el);

                //remove loader
               // this.handleInitialLoader();

                //enable dragsort
                this.builder.enableDropSort();

                return self;

            },

            generateMarkup: function(event) {

                event.preventDefault();

                this.builder.generateActualMarkup();

            },

            /**
             * trigger the mode siwtcher for builder editor
             */
            switchMode: function(evt) {
            	
                this.builder.switchMode(evt);

            },

            /**
             *
             * @returns {undefined}
             */
            handleInitialLoader: function() {

                //remove the initial loader
                this.$el.find('#editor-initial-loader').remove();

            }

        });


        return BuilderMainView;

    });