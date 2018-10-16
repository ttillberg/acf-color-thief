=== Advanced Custom Fields: Color Thief Field ===
Contributors: Christoph Jeworutzki, Theo Tillberg
Tags: acf, acf-pro, palette, image, extract, colours, colors, color
Requires at least: 3.5
Tested up to: 3.8.1
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Extracts and creates a colour palette from an uploaded image.

== Description ==

Configure the field by specifying the name of an adjacent image field from which the palette should be extracted. The colour palette will update whenever the image changes. If no colour has previously been chosen, the first one from the palette gets selected by default.

= Compatibility =

This ACF field type is compatible with:
* ACF 5

== Installation ==

1.  Copy the `acf-color-thief` folder into your `wp-content/plugins` folder
2.  Activate the Color Thief plugin via the plugins admin page
3.  Create a new field via ACF and select the Color Thief type
4.  Configure the field by specifying the name of the sibling field (must be an image field)

== Changelog ==

= 1.0.0 = Copied and adapted code from Christoph Jeworutzki
= 1.0.1 = Fixed CORS issue for CDN hosted images
* Initial Release.
