<p class="desc" style="cursor:move">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>
<div class="aj-imp-add-row builder-element" data-element="builderrow" data-placeholder-height="120">
    <a href="#">
        <span class="glyphicon glyphicon-align-justify"></span>
        Add New Row
        <span class="glyphicon glyphicon-fullscreen pull-right"></span>
    </a>
</div>
<ul class="nav nav-tabs" id="builder-box-tabs">
    <li class="active"><a href="#content" data-toggle="tab">Content</a></li>
    <?php if(is_single_room_edit()): ?>
       <li><a href="#room-elements" data-toggle="tab">Room Elements</a></li>
    <?php endif; ?>
</ul>
<div class="tab-content">
    <div class="tab-pane active" id="content">
        <ul class="aj-imp-builder-items clearfix">
            <li data-element="logoelement">
                <a href="#" class="drag builder-element"  >
                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                    <div class="aj-imp-builder-title">Logo</div>
                </a>
            </li>
            <li data-element="titleelement">
                <a href="#" class="drag builder-element"  data-placeholder-height="60">
                    <div class="aj-imp-builder-icon" data-icon="&#xf13c;"></div>
                    <div class="aj-imp-builder-title">Title</div>
                </a>
            </li>
            <li data-element="imageelement">
                <a href="#" class="drag builder-element" data-placeholder-height="120">
                    <div class="aj-imp-builder-icon" data-icon="&#xf10e;"></div>
                    <div class="aj-imp-builder-title">Image</div>
                </a>
            </li>
            <li data-element="textelement">
                <a href="#" class="drag builder-element" data-placeholder-height="50">
                    <div class="aj-imp-builder-icon" data-icon="&#xf111;"></div>
                    <div class="aj-imp-builder-title">Text</div>
                </a>
            </li>
            <li data-element="menuelement">
                <a href="#" class="drag builder-element" data-placeholder-height="50">
                    <div class="aj-imp-builder-icon" data-icon="&#xf112;"></div>
                    <div class="aj-imp-builder-title">Menu</div>
                </a>
            </li>
            <li data-element="socialelement">
                <a href="#" class="drag builder-element" data-placeholder-height="50">
                    <div class="aj-imp-builder-icon" data-icon="&#xf10c;"></div>
                    <div class="aj-imp-builder-title">Social</div>
                </a>
            </li>
            <li data-element="sliderelement">
                <a href="#" class="drag builder-element" data-placeholder-height="400">
                    <div class="aj-imp-builder-icon" data-icon="&#xf10c;"></div>
                    <div class="aj-imp-builder-title">Slider</div>
                </a>
            </li>
            <li data-element="addresselement">
                <a href="#" class="drag builder-element" data-placeholder-height="100">
                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                    <div class="aj-imp-builder-title">Address</div>
                </a>
            </li>
            <li data-element="imagetextelement">
                <a href="#" class="drag builder-element" data-placeholder-height="100">
                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                    <div class="aj-imp-builder-title">Image With Text</div>
                </a>
            </li>
            <li data-element="contactformelement">
                <a href="#" class="drag builder-element" data-placeholder-height="100">
                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                    <div class="aj-imp-builder-title">Contact Form</div>
                </a>
            </li>
            <li data-element="mapelement">
                <a href="#" class="drag builder-element" data-placeholder-height="100">
                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                    <div class="aj-imp-builder-title">Map</div>
                </a>
            </li>
            <li data-element="roomlistelement">
                <a href="#" class="drag builder-element" data-placeholder-height="100">
                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                    <div class="aj-imp-builder-title">Room</div>
                </a>
            </li>
        </ul>
    </div>
    <div class="tab-pane" id="room-elements">
        <ul class="aj-imp-builder-items clearfix">
            <li data-element="roomtitle">
                <a href="#" class="drag builder-element" data-placeholder-height="100">
                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                    <div class="aj-imp-builder-title">Room Title</div>
                </a>
            </li>
            <li data-element="roomdescription">
                <a href="#" class="drag builder-element" data-placeholder-height="100">
                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                    <div class="aj-imp-builder-title">Room Description</div>
                </a>
            </li>
            <li data-element="roomfacilities">
                <a href="#" class="drag builder-element" data-placeholder-height="100">
                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                    <div class="aj-imp-builder-title">Facilities</div>
                </a>
            </li>
            <li data-element="roomgallery">
                <a href="#" class="drag builder-element" data-placeholder-height="100">
                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                    <div class="aj-imp-builder-title">Gallery</div>
                </a>
            </li>
        </ul>
    </div>
</div>