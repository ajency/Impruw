/**
 * The Main Builder Router.
 * This is the main router for the builder
 */

define(['underscore', 'jquery', 'backbone', 'builder/views/BuilderEditorView'],
    function(_, $, Backbone, BuilderEditorView) {


        var BuilderMainView = Backbone.View.extend({

            el: '.aj-imp-builder',

            events: {

                'click label.editormode': 'switchMode',
                'click #generate-markup': 'generateMarkup',
                'click #generate-json': 'generateJSON',
                'click #choose-template li a': 'updateTemplate',
                'click #publish-page': 'generateJSON'
            },


            initialize: function() {

                _.bindAll(this, 'handleInitialLoader', 'switchMode', 'renderView', 'updateTemplate');

                this.builderId = '';

            },

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

            updateTemplate: function() {

                //void definition

            },

            renderView: function(config) {

                this.builder = new BuilderEditorView();

                this.builder.render();


                this.$el.find('.aj-imp-browser-body').html(this.builder.$el);

                //remove loader
                this.handleInitialLoader();

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

                //this.$el.find('.aj-imp-browser-body').css('background-image','url(images/empty-drag-bg.svg)')

                //remove the initial loader
                this.$el.find('#editor-initial-loader').remove();

            }

        });


        return BuilderMainView;

    });