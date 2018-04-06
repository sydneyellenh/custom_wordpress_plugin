<?php
/*
Plugin Name:  MBC Countdown Clock
Plugin URI:   matchbookcreative.com
Description:  Basic countdown clock to be used on Matchbook websites
Version:      1.0
Author:       Sydney Haggard
Author URI:   semicolonsandcoffee.com
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  mbccc
Domain Path:  /languages
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

register_activation_hook( __FILE__, 'mbc-countdown-clock' );
register_deactivation_hook( __FILE__, 'mbc-countdown-clock' );


function mbc_cdc_shortcode() {
	?>
    <div class="mbc-cdc-clock-onpage">
        <p style="display: none;"><input type="hidden" name="cdc_datepicker" class="datepicker" id="mbc-cdc-date" value="<?php echo esc_attr( get_option( 'cdc_datepicker' ) ); ?>"></p>
        <p style="display: none;"><input type="hidden" step="1" name="cdc_timepicker" id="mbc-cdc-timepicker" value="<?php echo esc_attr( get_option( 'cdc_timepicker' ) ); ?>"></p>


        <div>
            <table>
                <tr>
                    <th>Days</th>
                    <th>Hours</th>
                    <th>Minutes</th>
                    <th>Seconds</th>
                </tr>
                <tr>
                    <td><span id="mbc-cdc-onpage-days" class="animate bounceInUp">  </span></td>
                    <td><span id="mbc-cdc-onpage-hours" class="animate bounceInUp">  </span></td>
                    <td><span id="mbc-cdc-onpage-minutes" class="animate bounceInUp">  </span></td>
                    <td><span id="mbc-cdc-onpage-seconds" class="animate bounceInUp">  </span></td>
                </tr>
            </table>
        </div>
    </div>

	<?php

    wp_enqueue_script('cdc-settings');
}

add_shortcode( 'mbc_countdown_clock', 'mbc_cdc_shortcode');

//function wp_enqueue_cdc_scripts_and_styles(){

	wp_enqueue_script('cdc-picker', plugin_dir_url( __FILE__ ) .'mbc_datepicker.js', array(), 1.0, true);
	wp_enqueue_script('cdc-settings', plugin_dir_url( __FILE__ ) .'mbc_cdc_settings.js', array(), 1.0, true);
	wp_enqueue_style('cdc-datepicker-css', plugin_dir_url( __FILE__ )  .'/mbc_datepicker.css', false, 1.1,  'all');
    wp_enqueue_style('cdc-css', plugin_dir_url( __FILE__ )  .'/mbc-cdc-style.css', false, 1.1,  'all');
    wp_enqueue_style('animate-css', plugin_dir_url( __FILE__ )  .'/animate.css', false, 1.1,  'all');

//}
//
//add_action( 'wp_enqueue_scripts', 'wp_enqueue_cdc_scripts_and_styles' );


function addMenu(){
	add_menu_page('Countdown Clock', 'Countdown Clock', 4, 'countdown-clock', 'countdownMenu');
}
add_action('admin_menu', 'addMenu');


if (is_admin ()) {
    add_action('adminMenu', 'add_myMenu');
    add_action('admin_init', 'register_mySettings');
}

function register_mySettings(){
    add_option('mbccdc_datepicker', 'Date Picker');
    add_option('mbccdc_timepicker', 'Time  Picker');
    register_setting('mbccdc', 'cdc_datepicker');
	register_setting('mbccdc', 'cdc_timepicker');
}

function countdownMenu(){
?>
    <div id="mbc-countdown-dash">
        <div class="mbc-cdc-header">
            <h1>Timer Settings</h1>
        </div>

        <div class="mbc-cdc-display">
            <form method="post" action="options.php">
            <?php settings_fields('mbccdc');
                  do_settings_sections('mbccdc');?>

                <p>Countdown To Date:<input type="text" name="cdc_datepicker" class="datepicker" id="mbc-cdc-date" value="<?php echo esc_attr( get_option( 'cdc_datepicker' ) ); ?>"></p>

                <p>Countdown To Time:<input type="time" step="1" name="cdc_timepicker" id="mbc-cdc-timepicker" value="<?php echo esc_attr( get_option( 'cdc_timepicker' ) ); ?>"></p>

               <input type="submit" value="Save Changes" id="mbccdc-submit" />

            </form>

            <div class="mbc-cdc-clock-preview">
                <div><span id="mbc-cdc-preview-days">  </span></div>
                <div><span id="mbc-cdc-preview-hours">  </span></div>
                <div><span id="mbc-cdc-preview-minutes">  </span></div>
                <div><span id="mbc-cdc-preview-seconds">  </span></div>
            </div>
        </div>

        </div>

<?php
}




