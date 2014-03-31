<tr>
	<td colspan="4" class="no-mar table-responsive">

		<table class="table table-vc">
			<tbody data-link="row" class="rowlink">
				<tr>
					<td width="5%"><a href="#rowlink<%=daterange.id%>"
						data-toggle="collapse"><span
						class="glyphicon glyphicon-chevron-down"></span>
					</a>
					</td>
					<td width="30%"><span class="label label-info">From:</span><%=daterange.from_date%>
						<span class="label label-info">To:</span>
						<%=daterange.to_date%></td>
					<td width="35%"><span class="label label-info">Weekday:</span> from<strong>
							- </strong> <span class="label label-info">Weekend:</span> from<strong>
							- </strong></td>
					<td width="30%" class="rowlink-skip"><a href="javascript:void(0)"
						class="edit-link editdaterange_lnk"
						daterange-id="<%=daterange.id%>"><span
							class="glyphicon glyphicon-pencil "></span> Edit</a> <a
						href="javascript:void(0)"
						class="edit-link canceleditdaterange_lnk hidden"
						daterange-id="<%=daterange.id%>"><span
							class="glyphicon glyphicon-ban-circle"></span>Cancel</a> <a
						href="javascript:void(0)" class="delete-link deletedaterange_lnk"
						daterange-id="<%=daterange.id%>"><span
							class="glyphicon glyphicon-trash "></span> Delete</a></td>
				</tr>

			</tbody>
		</table>
		<div id="rowlink<%=daterange.id%>" class="inner collapse">
			<div class="form-table table-responsive">
				<table class="table table-bordered table-hover"
					id="planlist_<%=daterange.id%>">
					<thead>
						<tr>
							<th>Plan Name</th>
							<th>Plan Description</th>
							<th>Weekday Tariff</th>
							<th>Weekend Tariff</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody data-link="row" class="rowlink">
					<%
					if(_.isArray(daterange.plans)){
						if(daterange.plans.length>0){
							_.each(daterange.plans,function(plan,index){
							%>
								<tr class="plan-row-<%=plan.plan_id %>" >
										<td class="block-plan-name" >
																
											 <a href="#plan1" data-toggle="modal"><%=plan.label %></a>
										 </td>
										 <td class="block-plan-description">
												<%=plan.description %> 
										 </td>
										 <td class = "block-plan-weekday-tariff" >
												 -
										 </td>
										 <td class="block-plan-weekend-tariff" >
												 -
										 </td>
										 <td class="block-plan-tariff-action">
												<a href="javascript:void(0)" class="editplan_link" planid="<%=plan.plan_id %>"    ><span class="glyphicon glyphicon-pencil"></span> Edit Plan</a>
												<a href="javascript:void(0)" class="addtariff_link " planid="<%=plan.plan_id %>"    ><span class="glyphicon glyphicon-plus"></span> Add Tariff</a>
												<a href="javascript:void(0)" class="edit-link edittariff-link hidden"  planid="<%=plan.plan_id %>" ><span class="glyphicon glyphicon-pencil"></span> Edit Tariff</a>	
																			 
										</td>
								 </tr>
							
							<%
							})
						}
						else{
						%>
						<tr>
							<td colspan="5">No plans added yet</td>
						</tr>
						<%
						}
					}					
					%>
					
						

					</tbody>
				</table>
			</div>
			<div class="add-text">
				Add Another Plan
				<button type="button" daterange-id="<%=daterange.id%>"
					class="btn add-btn btn-sm btn_addplanmodal" data-toggle="modal"
					data-target="#add-plantype">
					<i class="glyphicon glyphicon-plus btn_addplanmodal"
						daterange-id="<%=daterange.id%>"></i>
				</button>
			</div>
		</div></td>
</tr>
