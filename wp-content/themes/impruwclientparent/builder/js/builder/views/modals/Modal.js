/**
 *  Menu Manager .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['backbone', 'tpl!builder/templates/modal/modal.tpl', 'global'],

    function(Backbone, outerTemplate, global) {


        var Modal = Backbone.View.extend({

            id: 'id',

            forElement: null,

            outerTemplate: outerTemplate,

            className: 'modal wide-modal',

            open: function() {
                this.$el.modal('show');
                SiteBuilder.vent.trigger(this.id + '-open');
            },

            hide: function() {
                this.$el.modal('hide');
                SiteBuilder.vent.trigger(this.id + '-hide');
            }

        });

        return Modal;


    });