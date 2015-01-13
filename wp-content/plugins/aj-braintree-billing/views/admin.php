<?php
/**
 * Represents the view for the administration dashboard.
 *
 * This includes the header, options, and other information that should provide
 * The User Interface to the end user.
 *
 * @package   ajency-braintree
 * @author    Team Ajency <team@ajency.in>
 * @license   GPL-2.0+
 * @link      http://ajency.in
 * @copyright 11-28-2014 Ajency.in
 */
?>
<?php
	global $wpdb;
?>
<div class="wrap">

	<?php 
		screen_icon(); 
		$ajbilling_object_type = ajbilling_is_object_type_set();

		if ($ajbilling_object_type['status'] && $ajbilling_object_type['object_type'] === 'site') {
			$hide_default_view = '';
		}
		else{
			$hide_default_view = 'hidden';
		}
	?>
	<!--<h2><?php //echo esc_html( get_admin_page_title() ); ?></h2>-->

	<!-- TODO: Provide markup for your options page here. -->
	<div class="wrap ajbilling-object-type">
		<table class="form-table">
			<tbody>
				<tr>
					<th class="row-title">Object Type :</th>
					<td>
						<?php 
						if($ajbilling_object_type['status']){?>
							<label><?php echo strtoupper($ajbilling_object_type['object_type']);?></label>
						<?php }
						else{?>
							<div class='object_type_section'>
								<select id="ajbilling_object_type">
									<option value="-1">Select Object Type</option>
									<option value="site">Site</option>
									<option value="user">User</option>
								</select>
								<span class="description">Decides whether to store all plan settings as site options or as user meta</span>
							</div>

							<?php }?>
						
						<div class='object-validation-error'></div>
					</td>
					<td>
						<?php if (!$ajbilling_object_type['status']){?>
							<input class="button-primary" type="button" name="" value="Save Object type" id="ajbilling_save_object_type"/>
						<?php }?>
					</td>
				</tr>

			</tbody>
		</table>
	
	</div> <!-- .wrap -->
	<div class="<?php echo 'wrap '.$hide_default_view ; ?> ajbilling-plan-listing">

		<div id="icon-options-general" class="icon32" ></div>
		<div>
		<h2>Site Plans <a href="admin.php?page=ajency-braintree-add-plan&amp;edit_planid=-1" class="add-new-h2">Add New</a></h2> 
		</div>

		<div id="plan-listing">
			<table class="widefat">
			<thead>
				<tr>
					<th >Site Plan ID</th>
					<th >Braintree Plan ID</th>
					<th >Plan Name</th>
					<th >Amount</th>
					<th >Status</th>
					<th >Currency</th>
					<th >One time Fee</th>
					<th >Billing Frequency(months)</th>
					<th ></th>
				</tr>
			</thead>
				
			<tbody>
				<?php
				$table = $wpdb->base_prefix.'aj_billing_plans'; 
				$sqlQuery = "SELECT * FROM $table";

				$site_plans = $wpdb->get_results($sqlQuery, OBJECT);

				// echo "<pre>";
				// print_r($site_plans);
				// echo "<pre>";

				foreach ($site_plans as $site_plan) {
					$site_plan_id = $site_plan->id;
					$braintree_plan_ids = maybe_unserialize($site_plan->braintree_plan_id);
					$site_plan_title = $site_plan->title;
					$site_plan_status = $site_plan->status;
					if ($braintree_plan_ids=="") {?>
					<tr>
							<td><?php echo $site_plan_id; ?></td>
							<td><?php echo "N/A";?></td>
							<td><?php echo $site_plan_title;?></td>
							<td><?php echo "N/A";?></td>
							<td><?php echo $site_plan_status;?></td>
							<td><?php echo "N/A";?></td>
							<td><?php echo "N/A";?></td>
							<td><?php echo "N/A";?></td>
							<td><a href="admin.php?page=ajency-braintree-add-plan&amp;edit_planid=<?php echo $site_plan_id?>">Edit</a></td>
					</tr>		
					<?php }
					else{

						foreach ($braintree_plan_ids as $braintree_plan_id) 
						{
							$braintree_plan = aj_braintree_get_plan($braintree_plan_id);
							$braintree_plan_amt = $braintree_plan;
							// echo "<pre>";
							// print_r($braintree_plan);
							// echo "<pre>";
						?>
						<tr>
							<td><?php echo $site_plan_id; ?></td>
							<td><?php echo $braintree_plan_id;?></td>
							<td><?php echo $site_plan_title;?></td>
							<td><?php echo $braintree_plan->price;?></td>
							<td><?php echo $site_plan_status;?></td>
							<td><?php echo $braintree_plan->currencyIsoCode;?></td>
							<td><?php echo $braintree_plan->description;?></td>
							<td><?php echo $braintree_plan->billingFrequency;?></td>
							<td><a href="admin.php?page=ajency-braintree-add-plan&amp;edit_planid=<?php echo $site_plan_id?>">Edit</a></td>
						</tr>
					<?php } 

					}
					
				} ?>



			</tbody>
				
			</table>

			<br class="clear">
		</div> <!-- #poststuff -->

	</div> <!-- .wrap -->
