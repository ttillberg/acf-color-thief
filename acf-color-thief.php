<?php

/*
Plugin Name: Advanced Custom Fields: Color Thief
Plugin URI: –
Description: Grabs the dominant color or a representative color palette from an image. Uses javascript and canvas.
Version: 1.0.0
Author: Christoph Jeworutzki, Theo Tillberg
Author URI: https://intmagic.com/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

// exit if accessed directly
if (! defined('ABSPATH')) {
    exit;
}


// check if class already exists
if (!class_exists('acf_plugin_color_thief')) :

class acf_plugin_color_thief
{
    
    /*
    *  __construct
    *
    *  This function will setup the class functionality
    *
    *  @type	function
    *  @date	17/02/2016
    *  @since	1.0.0
    *
    *  @param	n/a
    *  @return	n/a
    */
    
    public function __construct()
    {
        
        // vars
        $this->settings = array(
            'version'	=> '1.0.0',
            'url'		=> plugin_dir_url(__FILE__),
            'path'		=> plugin_dir_path(__FILE__)
        );
        
        
        // set text domain
        // https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
        load_plugin_textdomain('acf-color_thief', false, plugin_basename(dirname(__FILE__)) . '/lang');
        
        
        // include field
        add_action('acf/include_field_types', array($this, 'include_field_types')); // v5
        add_action('acf/register_fields', array($this, 'include_field_types')); // v4
    }
    
    
    /*
    *  include_field_types
    *
    *  This function will include the field type class
    *
    *  @type	function
    *  @date	17/02/2016
    *  @since	1.0.0
    *
    *  @param	$version (int) major ACF version. Defaults to false
    *  @return	n/a
    */
    
    public function include_field_types($version = false)
    {
        
        // support empty $version
        if (!$version || $verion < 5) {
            // throw new \Exception("Plugin only available for ACF5", 1);
        }
        
        
        // include
        include_once('fields/acf-color_thief-v5.php');
    }
}


// initialize
new acf_plugin_color_thief();


// class_exists check
endif;
