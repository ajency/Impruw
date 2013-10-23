define(['builder/views/controls/BuilderControl', 'global'], 
		function(BuilderControl, global){
            
            var BuilderRowColumn = BuilderControl.extend({

                initialize : function(){
                    
                },
                        
                render : function(col){
                    this.$el.html('<div class="clearfix">\
                                        &nbsp;\
                                        <div class="aj-imp-drag-elements-message"><span class="glyphicon glyphicon-transfer"></span>Drag Elements Here</div>\
                                    </div>');
                    this.$el.addClass('col-sm-' + col);
                    return this;
                }
            });
            
            
            return BuilderRowColumn;
  
});

