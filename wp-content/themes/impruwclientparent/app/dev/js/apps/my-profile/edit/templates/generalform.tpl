<div class="form-group">
    <label for="name" class="col-sm-2 control-label">
        {{ __('Name') }}
    </label>
    <div class="col-sm-10 col-sm-offset-2">
        <input type="text" class="form-control" id="display_name" name="display_name"
        placeholder="Name" value="{{display_name}}" 
        required required-message="{{ __('Please enter firstname lastname') }}" 
        minlength="3" minlength-message="{{ __('Name should be atleast 3 characters long') }}"
        regexp="^[a-zA-Z ]+$" regexp-message="{{ __('Please enter valid name ex. John Parker') }}" />
        <div class="p-messages">
        </div>
    </div>
</div>
<div class="form-group">
    <label for="inputEmail1" class="col-sm-2 control-label">
        Email
    </label>
    <div class="col-sm-10 col-sm-offset-2">
        <input type="email" class="form-control" id="user_email" name="user_email"
        placeholder="Email" value='{{ user_email }}' 
        parsley-trigger="blur"
        required required-message="{{ __('Please enter email Id') }}" 
        remote="{{AJAXURL}}?action=check_email_exists" remote-message="Email id is already registered"/>
        <div class="p-messages">
        </div>
    </div>
</div>
<div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
        <label for="checkbox2" class="checkbox checked">
            <input type="checkbox" data-toggle="checkbox" checked="checked"
            name="new_feature_alert" value="1">
            {{ __('Let me know about new features and tips!') }}
        </label>
    </div>
</div>
<div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-wide aj-imp-submit" name="btn_saveusergeneral"
        id="btn_saveusergeneral">
            Update
        </button>
        <img src='{{THEMEURL}}/images/loader.gif' width="38" height="30" id="userprofilesubmitm_loader"
        style="display:none" />
    </div>
</div>