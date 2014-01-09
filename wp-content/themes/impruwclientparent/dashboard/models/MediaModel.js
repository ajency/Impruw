/**
 * The Builder Editor View.
 * This is the editor view for the builder
 * Most imp file
 */

define(['underscore', 'backbone'],
    function(_, Backbone) {

        var MediaModel = Backbone.Model.extend({

            //property to cross check if menu collecion is fetched before or not
            fetched: false,


            url: function() {
                return AJAXURL + '?action=impruw_media' + (!this.isNew() ? '&media-id=' + this.get('id') : '');
            },

            /**
             * Checks if the collection is fetched or not
             * @returns {Boolean}
             */
            isFetched: function() {

                return this.fetched;
            },

            /**
             * Set the fetched property for collection
             * Used to decide whether to triger the fetch or not
             * @param {boolean} set
             * @returns void
             */
            setFetched: function(set) {

                if (_.isBoolean(set))
                    this.fetched = set;

            }
        });

        return MediaModel;

    });