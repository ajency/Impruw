<?php
/**
 * Template Name: Assisted setup
 */
get_header();

?>
<div id="main-content">
   <form class="form-horizontal clearfix" method="post"  name="frm_assisted_setup" id="frm_assisted_setup"  data-parsley-validate >
     <?php
     $ajax_nonce = wp_create_nonce("new_user_assisted_setup");
     echo "<script> var ajax_nonce ='" . $ajax_nonce . "' </script>";
     ?>
   <div class="container aj-imp-register-form">
      <h1>Let's talk shop.</h1>
      <h3>Please select how and when you want to be contacted</h3>
      <br><br>
      <div class="row fw-content-wrap">
         <div class="col-1">
            <h1 style="text-align: center; font-weight: bolder;">1</h1>
         </div>
         <div class="col-11">
            <h3>Please select how and when you want to be contacted</h3>
            <div class="row fw-content-wrap">
               <div class="col-4">
                  <h2><input name="assisted_setup_contact_mode" type="radio" value="by_email" required />spencer@impruw.com</h2>
               </div>
               <div class="col-2">
                  <h2><input name="assisted_setup_contact_mode" type="radio" id = "assisted_setup_contact_phone" value="by_phone" />By phone</h2>
               </div>
               <div class="col-4">
                  <input name="phone_number" type="text" placeholder="Phone no" data-parsley-type="number"/>
               </div>
            </div>
         </div>
      </div>
      <br><br>
      <div class="row fw-content-wrap">
         <div class="col-1">
            <h1 style="text-align: center; font-weight: bolder;">2</h1>
         </div>
         <div class="col-11">
            <h3>We will contact you within 24 hours to discuss your new website and our payment process</h3>
         </div>
      </div>
      <br><br>
      <div class="row fw-content-wrap">
         <div class="col-1">
            <h1 style="text-align: center; font-weight: bolder;">3</h1>
         </div>
         <div class="col-11">
            <h3>After payment has been received we will build your website and transfer it to your domain in 48 hours or less </h3>
         </div>
      </div>
      <br><br>
      <input type="hidden" name="language" value="<?php echo $_GET['language']; ?>">
      <input type="hidden" name ="site_id" value="<?php echo $_GET['site']; ?>">
      <input type="hidden" name ="user_id" value="<?php echo $_GET['user']; ?>">
      <button class="hb-button hb-carrot no-three-d aj-imp-submit" id="btn_assisted_setup_info" name="btn_assisted_setup_info">Take me to my dashboard</button>
   </div>
   </button>
   </div>
   </form>

</div>
<?php
get_footer();
