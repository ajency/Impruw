<div class="form-group">
    <label for="inputAddress1" class="col-sm-2 control-label">
        {{ __('Old Password') }}
    </label>
    <div class="col-sm-10 col-sm-offset-2">
        <input type="password" class="form-control" id="currentpass" name="currentpass"
        placeholder="Old Password" required parsley-trigger="blur" parsley-validation-minlength="0"
        parsley-minlength="6" 
        parsley-required-message="{{ __('Please enter current password') }}">
        <div class="p-messages">
        </div>
    </div>
</div>
<div class="form-group">
    <label for="inputAddress1" class="col-sm-2 control-label">
        {{ __('New Password') }}
    </label>
    <div class="col-sm-10 col-sm-offset-2">
        <input type="password" class="form-control" id="newpass1" name="newpass1"
            placeholder="{{ __('New Password') }}" 
            required parsley-trigger="blur" 
            parsley-validation-minlength="0"
            parsley-minlength="6" parsley-equalto="#newpass1" 
            parsley-required-message="{{ __('Please enter new password') }}">
        <div class="p-messages">
        </div>
    </div>
</div>
<div class="form-group">
    <label for="inputAddress1" class="col-sm-2 control-label">
        {{ __('Confirm Password') }}
    </label>
    <div class="col-sm-10 col-sm-offset-2">
        <input type="password" class="form-control" id="newpass2" name="newpass2"
        placeholder="{{ __('Confirm Password') }}" 
        required parsley-trigger="blur" 
        parsley-validation-minlength="0"
        parsley-minlength="6" parsley-equalto="#newpass1" 
        parsley-required-message="{{ __('Please Retype new password') }}">
        <div class="p-messages">
        </div>
    </div>
</div>
<div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
        <button type="button" id="btn_updatepassword" name="btn_updatepassword"
        class="btn btn-wide aj-imp-submit">
            Change Password
        </button>
        <img src='{{THEMEURL}}/images/loader.gif' width="38" height="30" id="changepassubmit_loader"
        style="display:none" />
    </div>
</div>