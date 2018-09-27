/**
 * @author Theo Tillberg, Christoph Jeworutzki
 */
(function($) {
  if (acf && typeof acf.add_action !== "undefined") {
    acf.add_action("load append", function($el) {
      acf.get_fields({ type: "color_thief" }, $el).each(function() {
        initialize_field($(this));
      });
    });
  } else {
    throw "plugin only compatible with ACF5";
  }

  function initialize_field($el) {
    // hook up the colour selector to the input field
    var $palette = $el.find(".pipette").pipette();

    // We need to store a reference to the target image
    // field as a scope variable to re-iterate everytime a
    // potential change in its sub-tree has been detected.
    // e.g. when a new <img /> has been appended etc.
    var imageField;

    // get target type from options (sibling only for the moment, row and
    // global to come) this will define the behaviour of the colour picker
    var target_type = $palette.data("target-type");

    if (target_type == "sibling") {
      // Look up the name of the target image
      // configured inside of the acf field settings.
      var imageFieldName = $palette.data("target-image-field-name");

      // Attempt to retrieve the corresponding sibling field. If the target
      // field name was omitted we'll just take whatever image comes first.
      // This can be problematic if there's more than one image field.
      imageField = acf.findFields({ sibling: $el, name: imageFieldName });
      imageField = imageField.first();
      // ... and look up the actual image element
      var img = imageField.find("img");
      img = img.length && img[0];

      // Fetch palette from image and amend the palette UI. It's
      // worth noting this doesn't necessarily change the input value
      getImagePalette(img).then(function(palette) {
        $palette.pipette("setPalette", palette);
      });

      // For normal image fields
      imageField.find("img[data-name=image]").on("load", onImageUpdate);

      // HACK: using this to trigger image-update within a custom acf-field plugin
      imageField.on("load-fix", onImageUpdate);
    }

    function onImageUpdate($image) {
      // look up for the actual image tag, the bellow data-attribute
      // typically defines acf image field <img> tags
      var img = imageField.find("img[data-name=image]");
      img = img.length && img[0];

      // generate a new palette
      getImagePalette(img).then(function(palette) {
        if (palette && palette.length) {
          // apply the new palette
          $palette.pipette("setPalette", palette);
        }
      });
    }
  }

  function getImagePalette(img, paletteSize) {
    return new Promise(function(resolve, reject) {
      paletteSize = paletteSize || 5;
      if (!img || !img.src) {
        // we need the source to carry on, skip otherwise
        return;
      }
      // the following technique was added to allow images load from Vimeo's CDN
      var image = new Image();
      image.crossOrigin = "anonymous";

      image.onload = function(event) {
        // call color theif to extract the palette
        var palette = new ColorThief()
          .getPalette(image, paletteSize)
          .map(function(rgb) {
            return rgbtoHEX(rgb[0], rgb[1], rgb[2]);
          });

        resolve(palette);
      };
      image.src = img.src;
    });
  }

  function rgbtoHEX(r, g, b) {
    return "#" + ((r << 16) | (g << 8) | b).toString(16).toUpperCase();
  }
})(jQuery);
