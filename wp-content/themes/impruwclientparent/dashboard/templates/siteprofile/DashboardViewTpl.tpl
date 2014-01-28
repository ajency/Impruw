
<header class="aj-imp-dash-header row">
<div class="aj-imp-dash-title col-sm-12">
	<h2 class="aj-imp-page-head"><%= __('My Dashboard') %></h2>
</div>
</header>
<div class="row">
	<div class="aj-imp-dash-content col-md-12">
		<h4 class="aj-imp-sub-head">
			<small><%= __('Your website is ready') %>: <a target="_BLANK" href="<%= SITEURL %>"><%= SITEURL %></a>&nbsp;
		</h4>
		<a target="_BLANK" href="<%= SITEURL %>/site-builder" class="btn btn-xs"><%= __('Edit Site') %></a></small>
		<hr>
		<h3 class="aj-imp-sub-head-thin"><%= __('Hi! Good to see you here. Lets get you started on Impruw.') %></h3>
		<br> <br>
	</div>
</div>
<div class="row">
	<div class="aj-imp-dash-content col-md-6">
		<div class="aj-imp-dash-widget">
			<h6 class="aj-imp-sub-head"><%= __('My Site Profile') %></h6>
			<div class="aj-imp-widget-container panel panel-default">
				<div class="panel-body">
					<div class="aj-imp-widget-head row">
						<div class="col-sm-12">
							<h6 class="aj-imp-sub-head">
								<small><%= __('Filling your Website profile is an essential step. Let us explain why?') %></small>
							</h6>
						</div>
					</div>
					<div class="aj-imp-widget-content row">
						<div class="col-sm-12">
							<p><%= __('It lets you add your') %></p>		
							
							<ul>
								<li><%= __('Business details such as your logo, address etc') %></li>
								<li><%= __('Add your facebook/ twitter page urls.') %></li>
								<li><%= __('Select the people that are allowed to edit your website') %></li>
							</ul>
							</p>
							<p><%= __('We know how tedious it is to keep filling the same content over and over again every time you decide to change the design of your website so we like making things simpler. Fill in your website details once and that\'s it, your job is done.') %></p>
							<a href="#site-profile"><%= __('Click here to update your website profile') %></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="aj-imp-dash-content col-md-6">
		<div class="aj-imp-dash-widget">
			<h6 class="aj-imp-sub-head"><%= __('Rooms') %></h6>
			<div class="aj-imp-widget-container panel panel-default">
				<div class="panel-body">
					<div class="aj-imp-widget-head row">
						<div class="col-sm-12">
							<h6 class="aj-imp-sub-head">
								<small><%= __('Add your room types, tariff and packages - at one place') %></small>
							</h6>
						</div>
					</div>
					<div class="aj-imp-widget-content row">
						<div class="col-sm-12">
							<p><%= __('Impruw has been specifically designed to suit your business needs and therefore you can') %>
							
							<ul>
								<li><%= __('Add tariff according to your chosen date range') %></li>
								<li><%= __('Add facilities and add ons to your room') %></li>
								<li><%= __('Create room types of your choice') %></li>
							</ul>
							</p>
							<p><%= __('We want to make sure that you are able to create a business website that is completely yours - with your chosen room types to adding your unique business policies.') %></p>
							<a href="#add-room"><%= __('Click here to add rooms') %></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="aj-imp-dash-content col-md-6">
		<div class="aj-imp-dash-widget">
			<h6 class="aj-imp-sub-head"><%= __('Site Builder') %></h6>
			<div class="aj-imp-widget-container panel panel-default">
				<div class="panel-body">
					<div class="aj-imp-widget-head row">
						<div class="col-sm-12">
							<h6 class="aj-imp-sub-head">
								<small><%= __('Drag, drop and create a site in less than 30 minutes.') %></small>
							</h6>
						</div>
					</div>
					<div class="aj-imp-widget-content row">
						<div class="col-sm-12">
							<p><%= __('Our site builder makes it fast and easy to create a professional website in under 30 minutes. Our drag and drop editor allows you to add your content anywhere you want on the site. Simply add rows and drag - drop text or forms or images in the row.') %></p>
							<p><%= __('Customize your site with additional functionality like social media, contact forms and more.') %></p>
							<a href="<%= SITEURL%>/site-builder" target = "_blank"><%= __('Click here to edit your website') %></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="aj-imp-dash-content col-md-6">
		<div class="aj-imp-dash-widget">
			<h6 class="aj-imp-sub-head"><%= __('User Profile') %></h6>
			<div class="aj-imp-widget-container panel panel-default">
				<div class="panel-body">
					<div class="aj-imp-widget-head row">
						<div class="col-sm-12">
							<h6 class="aj-imp-sub-head">
								<small><%= __('Complete your User Profile') %></small>
							</h6>
						</div>
					</div>
					<div class="aj-imp-widget-content row">
						<div class="col-sm-12">
							<p><%= __('It\'s always nice to put a face to a name, so upload your profile picture.') %></p>
							<p><%= __('You can also change your password or your preferred language here.') %></p>
							<a href="#user-profile"><%= __('Click here to complete your user profile') %></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
