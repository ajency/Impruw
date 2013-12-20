define([], function(){
	return  {
				elements : [{
						type   : 'BuilderRow',
						draggable: false,
						editable : false,
						elements : [{
							type 			: 'BuilderRowColumn',
							currentClass 	: 12,
							elements  	: [{
                                                type      	 : 'TitleElement',
                                                className 	 : 'logo-title',
                                                editable     : true,
                                                draggable    : false
                                          },{
                                                type      	 : 'MenuElement',
                                                className 	 : 'slimmenu menubar',
                                                editable     : false,
                                                draggable    : false
                                            }]
								
							}]
						}]
			};	
});