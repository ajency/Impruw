define([], function(){
	return  {
				elements : [{
						type   : 'BuilderRow',
						draggable: false,
						editable : false,
						elements : [{
							type 			: 'BuilderRowColumn',
							currentClass 	: 12,
                            className       : 'topStrip', 
							elements  	: [{
								type 		: 'ContainerElement',
								className 	: 'head container',
								elements    : [{
									type  	  : 'BuilderRow',
									className : 'row logobar',
									draggable : false,
									editable  : false,
									elements  : [{
										type      	 : 'BuilderRowColumn',
										className 	 : 'logo col-xs-12',
										currentClass : 4,
										elements  	 : [{
                                                type      	 : 'TitleElement',
                                                className 	 : 'logo-title',
                                                editable     : true,
                                                draggable    : false
                                            }]
									},{
										type      	 : 'BuilderRowColumn',
										className 	 : 'col-xs-12',
										currentClass : 8,
										elements  	 : []
									}]
								},
                                {
									type  	  : 'BuilderRow',
									draggable : false,
									editable  : false,
									elements  : [{
										type      	 : 'BuilderRowColumn',
										currentClass : 12,
										elements  	 : [{
                                                type      	 : 'MenuElement',
                                                className 	 : 'slimmenu menubar',
                                                editable     : false,
                                                draggable    : false
                                            }]
									}]
								}]
							}]
						}]
				}]
			}	
});