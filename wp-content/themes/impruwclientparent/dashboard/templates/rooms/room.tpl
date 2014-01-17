<tr>
	<td>
		<div class="room-details">
			<h4><%=room.get('roomType')%></h4>
			<p class="desc"><%= _(room.get('roomDesc')).prune(150) %> </p>
			<div class="row info-strip">
				<div class="col-md-4 strip">
					<span><%=room.get('inventory')    %></span> Rooms
				</div>
				<div class="col-md-4 strip">
					<span><%=room.get('checkinformat')    %></span> Hour Format
				</div>
				<div class="col-md-4 strip">
					<span><%=room.get('checkintime')    %></span> Time
				</div>
			</div>
		</div>
	</td>
	<td><% console.log(room.get('daterangetariff'))    %>
		<div class="tariff">
		
		<% _.each(room.get('daterangetariff'),function(dateRangeTariff,index){  
		 console.log(dateRangeTariff.planId) 
		 %>
		 <div class="row tariff-plan">
				<div class="col-sm-6 plan">
					<h6><%=dateRangeTariff.planName%></h6>
					<%=dateRangeTariff.fromDate%> to <%=dateRangeTariff.toDate%>
				</div>
				<div class="col-sm-3 weekday">
					Weekday
					<div class="price">$<%=dateRangeTariff.weekdayTariff%></div>
				</div>
				<div class="col-sm-3 weekend">
					Weekend
					<div class="price">$<%=dateRangeTariff.weekEndTariff%></div>
				</div>
			</div>
		 <% 
		  }) %>
			
			 
			<div class="view-all">
				<a href="#">View All</a>
			</div>
		</div>
	</td>
	<td class="actions"><a href="#edit-room/id=<%=room.get('id') %>" class="btn btn-xs"><span
			class="glyphicon glyphicon-pencil"></span> Edit</a> <a href="#"
		class="btn btn-danger btn-xs"><span
			class="glyphicon glyphicon-trash"></span> Delete</a>
	</td>
</tr>