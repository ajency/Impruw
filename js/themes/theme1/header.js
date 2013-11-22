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
								type 		: 'ContainerElement',
								className 	: 'head container',
								draggable 	: false,
								editable    : false,
								elements    : [{
									type  	  : 'BuilderRow',
									className : 'row logobar',
									draggable : false,
									editable    : true,
									elements  : [{
										type      	 : 'BuilderRowColumn',
										className 	 : 'logo col-xs-12',
										currentClass : 6,
										editable     : false,
										elements  	 : []
									},{
										type      	 : 'BuilderRowColumn',
										className 	 : 'col-xs-12',
										currentClass : 6,
										editable     : false,
										elements  	 : []
									}]
								}]
							}]
						}]
				}]
			}	
});