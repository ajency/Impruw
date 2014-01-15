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

            /**
             * URL property for model
             * @return {[type]} [description]
             */
            url: function() {
                return AJAXURL;
            },

            /**
             * @override Override sync 
             * @param  {[type]} method  [description]
             * @param  {[type]} model   [description]
             * @param  {[type]} options [description]
             * @return {[type]}         [description]
             */
            sync: function( method, model, options ) {
                
                if('update' === method){

                    options = options || {};
                    options.context = this;

                    // Set the action and ID.
                    options.data = _.extend( options.data || {}, {
                        action:  'save-attachment',
                        id:      this.id,
                        nonce:   this.get('nonces').update,
                        post_id: 0
                    });

                    // Record the values of the changed attributes.
                    if ( model.hasChanged() ) {
                        options.data.changes = {};

                        _.each( model.changed, function( value, key ) {
                            options.data.changes[ key ] = this.get( key );
                        }, this );
                    }

                    var responseFn = _.bind(function(response){

                                        if(this.success)
                                            this.success(response);
                                        
                                    }, options);

                    $.post( this.url(),
                            options.data,
                            responseFn);

                } else if ( 'delete' === method ) {
                    options = options || {};

                    if ( ! options.wait )
                        this.destroyed = true;

                    options.context = this;
                    options.data = _.extend( options.data || {}, {
                        action:   'delete-post',
                        id:       this.id,
                        _wpnonce: this.get('nonces')['delete']
                    });

                    var responseFn = _.bind(function(response){

                                        if(response == 1)
                                            this.success();
                                        
                                    }, options);

                    $.post( this.url(),
                            options.data,
                            responseFn);

                // Otherwise, fall back to `Backbone.sync()`.
                } else {
                    return Backbone.Model.prototype.sync.apply( this, arguments );
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

        return MediaModel;

    });