/**
 * The MediaCollection.
 * This class contains all necessary functions for handling media related tasks
 */

define(['underscore', 'backbone', 'global', 'mediamodel'],
    function(_, Backbone, global, MediaModel) {

        var MediaCollection = Backbone.Collection.extend({

            //model property
            model: MediaModel,

            //property to cross check if menu collecion is fetched before or not
            fetched: false,

            /**
             * Url to fetch all menus for the Site
             * @returns {String}
             */
            url: function() {
                return AJAXURL + '?action=query_attachments';
            },

            /**
             * Pasrse JSOn response to check if code is OK
             */
            parse: function(response) {

                if (response.code === "OK") {
                    return response.data;
                }
                else if (response.code === "ERROR"){
                    getAppInstance().vent.trigger('media-fetch-failed', response);
                }

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

        return MediaCollection;

    });