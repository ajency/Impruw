<div class="modal-body">
	<ul class="nav nav-tabs">
		<li class="active"><a href="#upload" data-toggle="tab">Upload</a></li>
		<li><a href="#images" data-toggle="tab">Images</a></li>
	</ul>
	<div class="tab-content">
		<div class="tab-pane active" id="upload">
			<div class="aj-imp-upload-media">
				<span class="icon-uniF10C"></span>
				<div class="aj-imp-upload-message" id="choosefiles">
					<span class="glyphicon glyphicon-cloud-upload"></span> Upload Images from your Computer
				</div>
				<span class="small-text">Upload Multiple Images by holding CTRL</span>
				<div class="clear"></div>
				<br />
				<div id="progress" class="progress progress-striped active " style="width:30%;margin:0px auto;display:none">
				  <div class="progress-bar"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
				    <span class="sr-only">0% Complete</span>
				  </div>
				</div>
				<div id="uplaod-details">
					<div class="panel-group" id="image-accordion">

					</div>
				</div>
			</div>
		</div>
		<div class="tab-pane " id="images">
			<form>
				<div class="row">
					<div class="col-md-12 panel-group selectable-images" >

					</div>
					<div class="btn btn-primary" id="create-slider">Done</div>
				</div>
			</form>
		</div>
	</div>
</div>

