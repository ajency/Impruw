<div class="panel-heading">
	  <a class="accordion-toggle collapsed" href="#">
		<div class="aj-imp-image-item row">
            <% if(type === 'slider'){ %>
                <div class="imgthumb col-sm-1">
                    <label for="checkbox2" class="checkbox checked">                        
                        <input data-toggle="checkbox" type="checkbox" name="selected-image" value="<%= media.get('id') %>"/>
                    </label>
                </div>
            <% } %>
			<div class="imgthumb col-sm-1">
				<img src="<%= media.get('sizes').thumbnail.url %>" class="img-responsive" style="height:auto;">
			</div>
			<div class="imgname col-sm-5">
				<%= media.get('title') %>
			</div>
            <div class="imgdate col-sm-2">
                <%= media.get('dateFormatted') %>
            </div>
			<div class="imgactions col-sm-3">
               <button class="btn" title="Edit Image"><span class="glyphicon glyphicon-edit"></span><a data-toggle="collapse" data-parent="#image-accordion" href="#image-edit-<%= media.get('id') %>">Edit Image</a></button>
				<button class="btn" title="Delete Image"><span class="glyphicon glyphicon-remove-sign"></span></button>
			</div>
		</div>
	  </a>
  </div>
<div id="image-edit-<%= media.get('id') %>" class="panel-collapse collapse" style="height: auto;">
	<div class="panel-body">
	    <div class="aj-imp-edit-image well">
            <form>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="aj-imp-crop-link">
                            <img src="<%= media.get('sizes').thumbnail.url %>" class="thumbnail-img img-responsive">
                            <div class="aj-imp-crop-link-overlay">
                                <a href="#">
                                        <span class="glyphicon glyphicon-edit"></span> Edit Image
                                </a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <label>Alignment: </label>
                                <select>
                                    <option>None</option>
                                    <option>Left</option>
                                    <option>Right</option>
                                    <option>Center</option>
                                </select>
                            </div>
                            <div class="col-sm-12">
                                <label>Size: </label>
                                <select class="image-size">
                                    <% _.each(media.get('sizes'), function(ele, key){ %>
                                    <option value="<%= key %>"><%= key + '( ' +(ele.width + ' x ' + ele.height) + ' )' %></option>
                                    <% }) %>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="aj-imp-img-form col-sm-8">
                        <div class="row">
                            <div class="col-sm-6">
                                    <input type="text" value="<%= media.get('title') %>" name="image-title" class="form-control" placeholder="Title">
                            </div>
                            <div class="col-sm-6">
                                    <input type="text" value="<%= media.get('link') %>" name="image-link" class="form-control" placeholder="Link">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <input type="text" value="<%= media.get('alt') %>" class="form-control" name="image-alt" placeholder="Alt Text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                    <textarea class="form-control"= name="image-caption" placeholder="Caption"><%= media.get('caption') %></textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                    <textarea class="form-control"= name="image-description" placeholder="Description"><%= media.get('description') %></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="aj-imp-img-save">
                	<input type="hidden" id="media-id" name="media-id" value="<%= media.get('id') %>"/>
                    <% if(type !== 'slider'){ %>
                     <button class="btn select-image" title="Select" type="button"><span class="glyphicon"></span> Select</button>
                    <% } %>
                    <button type="button" class="btn btn-primary save-image-details">Save Details</button>
                    <button type="button" class="btn btn-primary cancel-image-details">Cancel</button>
                </div>
            </form>    
	  	</div>
	</div>
</div>