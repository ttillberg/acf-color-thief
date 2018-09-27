/**
 * Pipette - Minimal colour selector for jQuery
 *
 * @author Theo Tillberg
 *
 *
 * @example 
 *    // initialise the plugin
 *    $input = $('input.my-palette')
 *      .pipette({ palette: ['#FF0000', '#00FF00', '#0000CC'] })
 *
 *    // replace colours afterwards
 *    $input.pipette('setPalette', ['#FF8800', '#23FF00', '#0000CC'])
 *
 *    // ... or you can specify an input value that differs to the displayed colour
 *    $input.pipette('setPalette', [
 *      { hex: '#FF0000', value: 'redish' },
 *      { hex: '#FF0099', value: 'debug-colour' }
 *      { hex: '#00000000', value: 'transparent' }
 *     ])
  
 *    $input.pipette('setValue', 'redish')
 */

(function($) {
  var methods = {
    /**
     * constructor
     */
    init: function(options) {
      options = options || {};
      this.$pipette = $("<div/>")
        .addClass("pipette")
        .insertBefore(this);

      this.value = options.value || this.val();

      if (Array.isArray(options.palette)) {
        methods.setPalette.call(this, options.palette);
      }
      return this;
    },

    /**
     * Applies a palette and sets default value if undefined
     */
    setPalette: function(palette, value) {
      // normalises the palette with { hex, value } items
      this.palette = (palette || []).map(function(item) {
        if (typeof item === "string") {
          return { hex: item, value: item };
        } else {
          return item;
        }
      });
      // sets value if available
      this.value = value || this.value;

      // defaults value to first palette item if undefined
      // TODO: this should pbly be optional
      if (!this.value && this.palette.length) {
        this.value = this.palette[0].value;
        this.val(this.value);
      }

      var $pipette = this.$pipette;
      var $container = $pipette.find(".pipette__container");

      if (!$container.length) {
        $container = $("<div />")
          .addClass("pipette__container")
          .on("mouseenter", function() {
            $pipette.addClass("--hover");
          })
          .on("mouseleave", function() {
            $pipette.removeClass("--hover");
          });
        $pipette.html($container);
      } else {
      }

      $container.empty();

      this.palette.forEach(
        function(item, index) {
          var $el = $("<div />")
            .addClass("pipette__color")
            .data("value", item.value)
            .css({
              backgroundColor: item.hex
            })
            .on(
              "click",
              function() {
                if ($pipette.hasClass("--hover")) {
                  $pipette.removeClass("--hover");
                  methods.setValue.call(this, item.value);
                } else {
                  $pipette.addClass("--hover");
                }
              }.bind(this)
            );

          $container.append($el);
        }.bind(this)
      );
      methods._updateSelectedValue.call(this);
    },

    setValue: function(value) {
      this.value = value;
      this.val(value);
      methods._updateSelectedValue.call(this);
    },

    _updateSelectedValue: function() {
      var $container = this.$pipette.find(".pipette__container");
      var $items = $container.find(".pipette__color");

      var hasSelection = false;

      $items.each(
        function(i, el) {
          var $el = $(el);
          if (this.value === $el.data("value")) {
            hasSelection = true;
            $el.addClass("pipette__color--selected");
          } else {
            $el.removeClass("pipette__color--selected");
          }
        }.bind(this)
      );
      if (!hasSelection) {
        this.$pipette.addClass("pipette--no-selection");
        // use css variable to make items fit perfectly. FIXME: /w flex
        $container[0].style.setProperty(
          "--default-width",
          (50 / $items.length).toFixed(2) + "px"
        );
      } else {
        this.$pipette.removeClass("pipette--no-selection");
      }
    }
  };

  $.fn.pipette = function(args) {
    if (methods[args]) {
      return methods[args].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof args === "object" || !args) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + args + " does not exist on jQuery.tooltip");
    }
  };
})(jQuery);
