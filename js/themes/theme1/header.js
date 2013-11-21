define([], function(){
	return  {
				elements : [{
						type  : 'BuilderRow',
						elements : [{
							type 			: 'BuilderRowColumn',
							currentClass 	: 12,
							elements  	: [{
								type  : 'ContainerElement',
								className 	: 'container other-classname',
								locked 		: true,
								nonSortable : true,
								nonDroppable: true,
								elements    : [{
									type 		: 'BuilderRow',
									movable 	: false,
									className 	: 'row some-other-class',
									elements 	: [{
										type      : 'BuilderRowColumn',
										className : 'topStrip',
										currentClass : 12,
										sortable  : false,
										movable   : false,
										elements  : [{
											type 		: 'ContainerElement',
											className 	: 'head container',
											movable 	: false,
											sortable    : false,
											elements    : [{
												type  	  : 'BuilderRow',
												className : 'row logobar',
												movable   : false,
												elements  : [{
													type      : 'BuilderRowColumn',
													className : 'logo col-xs-12',
													currentClass : 6,
													movable   : false,
													sortable  : false,
													elements  : [{
														type 		: 'TitleElement',
														className 	: 'img-responsive'
													},{
														type      : 'BuilderRowColumn',
														className : 'cta col-xs-12',
														currentClass : 6
													}]
												}]
											}]
										}]
									}]
								},{
									type      : 'BuilderRow',
									movable : false,
									columns : [{
										type      : 'BuilderRowColumn',
										className : 'col-xs-12',
										elements  : {
											type : 'MenuElement',
											className : 'slimmenu menubar'
										}
									}]
								}]
						}]
					}]
				}]
			}	
});