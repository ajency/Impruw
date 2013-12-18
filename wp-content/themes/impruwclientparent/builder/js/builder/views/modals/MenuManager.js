/**
 *  Menu Manager .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['builder/views/modals/Modal','text!builder/templates/modal/menu.hbs', 
        'menumodel','menucollection', 'global','nestable'], 
		
        function(Modal, template, MenuModel, MenuCollection, global){


            var MenuManager = Modal.extend({

                id       : 'menu-manager',

                template : template,

                events   : {
                    'click .refetch-menus' : 'fetchMenus'
                },

                /**
                 * Initialize the manager 
                 */
                initialize : function(args){

                    var html = _.template(this.outerTemplate,{title : 'Menu Manager'});

                    this.$el.html(html);
                    
                    //append to body
                    $('body').append(this.$el);

                    this.$el.modal();

                    this.$el.on('hidden.bs.modal', function(evt){

                        if(!$('#controls-drag').is(':visible'))
                            $('#controls-drag').show();

                    });

                    //set collection
                    this.menus = new MenuCollection();

                    this.fetchMenus();
                    

                },
                
                /**
                 * Triggers the fetch of MenuCollection
                 * Check if the collection is already fetched. If yes, ignores
                 * @returns {undefined}
                 */
                fetchMenus : function(){

                    if(this.menus.isFetched())
                        return;

                    var self = this;

                    //show initial fetch loader
                    this.$el.find('.modal-body').html('fetching menus... please wait...');

                    this.menus.fetch({
                        success : function(collection, response){
                            
                           var markup = 'No Menu found. Please contact administartor';
                           if(collection.length === 0){
                               self.$el.find('.modal-body').html(markup);
                               return;
                           }
                           
                           self.menus.setFetched(true);
                           markup = _.template(self.template,{menus : collection.models});
                           
                           self.$el.find('.modal-body').html(markup);
                           
                           //make collapsable
                           self.$el.find('*[data-toggle="collapse"]').collapse();

                           // activate Nestable for list 1
                           self.$el.find('.sortable-menu').nestedSortable({
                                                                        handle   : 'div',
                                                                        items    : '.list-group-item',
                                                                        listType : 'div.list-group',
                                                                        toleranceElement : '> div'
                                                                    });

                        },
                        error : function(){
                            self.$el.find('.modal-body').html('Failed to fetch menus from server. <a href="#" class="refetch-menus">Click here</a>Please try again.');
                        }
                    })

                }                

            });

            return MenuManager;
			
        });
  
    

