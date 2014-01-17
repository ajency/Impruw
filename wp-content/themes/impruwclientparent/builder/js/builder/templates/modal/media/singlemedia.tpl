<div class="">
  <a class="thumbnail" href="#"  style="height:128px;">
    <% if(type === 'slider'){ %>
        <div class="imgthumb">
            <label for="checkbox2" class="checkbox checked">                        
                <input data-toggle="checkbox" type="checkbox" name="selected-image" value="<%= media.get('id') %>"/>
            </label>
        </div>
    <% } %>
	<div class="imgthumb">
		<img src="<%= media.get('sizes').thumbnail.url %>" class="img-responsive" >
	</div>
  </a>
  <div class="ticker">
    <span class="glyphicon glyphicon-ok"></span>
    <span class="glyphicon glyphicon-minus"></span>
  </div>
</div>
<div id="image-edit-<%= media.get('id') %>" class="hidden">
    <h5>Image Details</h5>
    <div class="row">
        <div class="col-sm-5 imgthumb">
            <img src="<%= media.get('sizes').thumbnail.url %>" class="img-responsive">
        </div>
        <div class="col-sm-7 imginfo">
            <h6><%= media.get('title') %></h6>
            <div class="info">
                <%= media.get('dateFormatted') %><br>
                <%= media.get('width') %> × <%= media.get('height') %><br>
                <a href="#" class="delete-image"><span class="glyphicon glyphicon-trash"></span> Delete</a>
            </div>
        </div>
    </div>
    <form class="clearfix">
        <div class="form-group">
           <div class="col-sm-12">
                <label>Size: </label>
                <select class="image-size" >
                    <% _.each(media.get('sizes'), function(ele, key){ %>
                    <option value="<%= key %>"><%= key + '( ' +(ele.width + ' x ' + ele.height) + ' )' %></option>
                    <% }) %>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-6">
                <input type="text" value="<%= media.get('title') %>" name="title" class="form-control" placeholder="Title">
            </div>
            <div class="col-sm-6">
                <input type="text" value="<%= media.get('link') %>" name="link" class="form-control" placeholder="Link">
            </div>
        </div>
        <div class="clearfix" style="margin-bottom: 0.5em;"></div>
        <div class="form-group">
            <div class="col-sm-12">
                    <input class="form-control" name="caption" placeholder="Caption" <%= media.get('caption') %> />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                    <textarea class="form-control" name="description" placeholder="Description"><%= media.get('description') %></textarea>
            </div>
        </div>
        <div class="aj-imp-img-save">
            <button type="button" class="btn-link save-image-details">Save</button>
        </div>
    </form>  
</div>