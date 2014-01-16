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
			<div class="row">
				<div class="col-md-9 selectable-images">
					<div class="row thumbnails">
					
					</div>
				</div>
				<div class="col-md-3 img-details">
					<h5>Image Details</h5>
					<div class="row">
						<div class="col-sm-5 imgthumb">
							<img src="http://placehold.it/350x150" class="img-responsive">
						</div>
						<div class="col-sm-7 imginfo">
							<h6>ImageName.jpg</h6>
							<div class="info">
								January 16th, 2014<br>
								350 × 150<br>
								<a href="#" class="editlink"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
								<a href="#" class="deletelink"><span class="glyphicon glyphicon-trash"></span> Delete</a>
							</div>
						</div>
					</div>
					<form class="clearfix">
		                
                    	<div class="form-group">
                            <div class="col-sm-6">
                                <label>Alignment: </label>
                                <select>
                                    <option>None</option>
                                    <option>Left</option>
                                    <option>Right</option>
                                    <option>Center</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label>Size: </label>
                                <select class="image-size">
                                    <option>Full</option>
                                    <option>Medium</option>
                                    <option>Small</option>
                                    <option>Thumbnail</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-6">
                                <input type="text" value="" name="title" class="form-control" placeholder="Title">
                            </div>
                            <div class="col-sm-6">
                                <input type="text" value="" name="link" class="form-control" placeholder="Link">
                            </div>
                        </div>
                        <div class="clearfix" style="margin-bottom: 0.5em;"></div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <input type="text" value="" class="form-control" name="alt" placeholder="Alt Text">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                    <input class="form-control" name="caption" placeholder="Caption" value="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                    <textarea class="form-control" name="description" placeholder="Description"></textarea>
                            </div>
                        </div>
		                <div class="aj-imp-img-save">
		                    <button type="button" class="btn btn-primary save-image-details">Save Details</button>
		                    <button type="button" class="btn btn-primary cancel-image-details">Cancel</button>
		                </div>
		            </form>  
				</div>
			</div>
		</div>
	</div>
</div>	

