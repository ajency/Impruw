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
									elements  : [{
										type      	 : 'BuilderRowColumn',
										className 	 : 'logo col-xs-12',
										currentClass : 6,
										editable     : false,
										elements  	 : [{
													type 		: 'TitleElement',
													className 	: 'img-responsive'
												},{
													type      : 'BuilderRowColumn',
													className : 'cta col-xs-12',
													currentClass : 6
												}]
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