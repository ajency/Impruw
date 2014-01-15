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
	<td>
		<div class="tariff">
			<div class="row tariff-plan">
				<div class="col-sm-6 plan">
					<h6>American Plan</h6>
					10/12/2013 to 30/03/2014
				</div>
				<div class="col-sm-3 weekday">
					Weekday
					<div class="price">$120</div>
				</div>
				<div class="col-sm-3 weekend">
					Weekend
					<div class="price">$150</div>
				</div>
			</div>
			<div class="row tariff-plan">
				<div class="col-sm-6 plan">
					<h6>American Plan</h6>
					10/12/2013 to 30/03/2014
				</div>
				<div class="col-sm-3 weekday">
					Weekday
					<div class="price">$120</div>
				</div>
				<div class="col-sm-3 weekend">
					Weekend
					<div class="price">$150</div>
				</div>
			</div>
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