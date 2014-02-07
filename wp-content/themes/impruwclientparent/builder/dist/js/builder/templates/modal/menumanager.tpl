<div class="modal-body">
	<ul class="nav nav-tabs">
		<li class="active"><a href="#<%= menu.get('slug') %>" data-toggle="tab"><%= menu.get('name') %></a></li>
	</ul>
	<div class="tab-content">
		<div class="tab-pane active" id="<%= menu.get('slug') %>">
			<div class="row aj-imp-menu-edit">
				<div class="col-md-6 aj-imp-add-menu-item">
					<h4><%= menu.get('name') %></h4>
					<p class="desc">
						<%= menu.get('description') %>
					</p>
					<a class="aj-imp-add-link" href="#<%= menu.get('slug') %>-add-menu" data-toggle="collapse">Add Menu Item</a>
					<div id="<%= menu.get('slug') %>-add-menu" class="collapse add-menu-form">
						<form class="form-horizontal well" parsley-validate>
							<div class="form-group">
								<label class="col-sm-4 control-label">Menu Link Label</label>
								<div class="col-sm-8">
									<input type="text" name="item-title" parsley-required="true" class="required form-control">
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-4 control-label">Menu Link</label>
								<div class="col-sm-8">
									<input type="text" name="item-url" parsley-type="url" parsley-required="true" class="form-control required">
								</div>
							</div>
							<div class="form-group form-actions">
								<div class="col-sm-offset-4 col-sm-8">
									<input type="hidden" value="0" name="item-id"/>
									<input type="hidden" name="menu-id" value="<%= menu.get('id') %>" />
									<button type="button" class="btn btn-embossed">Cancel</button>
									<button type="button" class="btn btn-embossed save-btn add-new-menu-item">Save</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="col-md-6 aj-imp-menu-item-list">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><%= menu.get('name') %></h3>
						</div>
						<ol class="list-group ui-sortable sortable-menu">
							<% _.each(menu.get('items'), function(item, index){ %>
								<li class="list-group-item" id="menu-item-<%= item.ID %>">
									<div>	
										<div class="row menu-item">
											<div class="col-sm-1 menu-dragger">
												<span class="icon-uniF160"></span>
											</div>
											<div class="col-sm-8 menu-name">
												<%= item.title %>
											</div>
											<div class="col-sm-3 menu-edit">
												<a href="#<%= menu.get('slug') %>-item-<%= item.ID %>" data-toggle="collapse">
													<span class="glyphicon glyphicon-edit"></span> Edit
												</a>
											</div>
										</div>
										<div id="<%= menu.get('slug') %>-item-<%= item.ID %>" class="collapse menu-item-edit">
											<form class="form-horizontal">
												<div class="form-group">
													<label class="col-sm-4 control-label">Menu Link Label</label>
													<div class="col-sm-8">
														<input value="<%= item.title %>" parsley-type="url" parsley-required="true" type="text" name="item-title" class="form-control">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-4 control-label">Menu Link</label>
													<div class="col-sm-8">
														<input value="<%= item.url %>" parsley-required="true" type="text" name="item-url" class="form-control">
													</div>
												</div>
												<div class="form-group form-actions">
													<div class="col-sm-offset-4 col-sm-8 action-div">
														<input type="hidden" value="<%= item.ID %>" name="item-id"/>
														<input type="hidden" name="menu-id" value="<%= menu.get('id') %>" />
														<button type="button" class="btn update-new-menu-item">Save</button>
														<button type="button" class="btn remove-menu-item"><span class="glyphicon glyphicon-trash"></span></button>
													</div>
												</div>
											</form>
										</div>
									</div>
									<% if(!_.isUndefined(item.subMenu) && _.isArray(item.subMenu)){ %>
										<ol class="">
											<% _.each(item.subMenu, function(sitem, index){ %>
												<li class="list-group-item" id="menu-item-<%= item.ID %>">
													<div>	
														<div class="row menu-item">
															<div class="col-sm-1 menu-dragger">
																<span class="icon-uniF160"></span>
															</div>
															<div class="col-sm-8 menu-name">
																<%= sitem.title %>
															</div>
															<div class="col-sm-3 menu-edit">
																<a href="#<%= menu.get('slug') %>-item-<%= sitem.ID %>" data-toggle="collapse">
																	<span class="glyphicon glyphicon-edit"></span> Edit
																</a>
															</div>
														</div>
														<div id="<%= menu.get('slug') %>-item-<%= sitem.ID %>" class="collapse menu-item-edit">
															<form class="form-horizontal">
																<div class="form-group">
																	<label class="col-sm-4 control-label">Menu Link Label</label>
																	<div class="col-sm-8">
																		<input value="<%= sitem.title %>" parsley-type="url" parsley-required="true" type="text" name="item-title" class="form-control">
																	</div>
																</div>
																<div class="form-group">
																	<label class="col-sm-4 control-label">Menu Link</label>
																	<div class="col-sm-8">
																		<input value="<%= sitem.url %>" parsley-required="true" type="text" name="item-url" class="form-control">
																	</div>
																</div>
																<div class="form-group form-actions">
																	<div class="col-sm-offset-4 col-sm-8 action-div">
																		<input type="hidden" value="<%= sitem.ID %>" name="item-id"/>
																		<input type="hidden" name="menu-id" value="<%= menu.get('id') %>" />
																		<button type="button" class="btn update-new-menu-item">Save</button>
																		<button type="button" class="btn remove-menu-item"><span class="glyphicon glyphicon-trash"></span></button>
																	</div>
																</div>
															</form>
														</div>
													</div>
												</li>
											<% }) %>	
										</ol>
									<% } %>	
								</li>	
							<% }) %>
						</ol>
					</div>
					<br />
					<button type="button" class="btn save-btn " id="update-menu-order">Update Menu Order</button>
				</div>
			</div>
		</div>
	</div>
</div>

