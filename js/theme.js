(function ($) {
  
  // set the default foundation breakpoints and variables
  var breakpoints = {
    sm : 640,
    md : 1025,
    lg : 1441,
    xl : 1921
  },
  winWidth,
  winHeight,
  docWidth,
  docHeight;
  
  
  /**
   * Page initialization
   * Called on resize, page load, or to reset the page
   */ 
  function init(){
    setVars();
    setPositions();
  }
  
  function setVars(){ 
    docHeight = $(document).outerHeight(),
    docWidth  = $(document).outerWidth(),
    winHeight = $(window).height(),
    winWidth  = $(window).width();
  }
  
  /**
   * Sets any positioning on the page
   */
  function setPositions(){
    // Place positioning code here
  }

  /**
   * Swap out svg files for PNGs on unsupporting devices. Modrnizr determines
   * what an unsupporting device is by adding the .no-svg class to the html
   * tag.
   */
  function svgToPng() {
    $('.no-svg .js__svg-image').each(function() {
      var src = $(this).attr('src');
      src = src.replace("svg", "png");
      $(this).attr('src', src);
    });
  }

  
  function toggleNav(){
    $(".nav-toggle, .off-canvas, body").toggleClass("open");
  }
  
  /**
   * Helper function to delay firing resize events until the user actually
   * stops resizing their browser.
   */
  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();
  
  Drupal.behaviors.STARTER = {
    attach: function(context, settings) {
      
      // Initialize plugins/page  
      $(document).foundation();
      svgToPng();
      
      // Initialize page
      init();
      
      /**
       * Event listeners
       */
   
      $(".js__nav-toggle").on("click", function(e){
         e.stopPropagation();
         toggleNav();
       });

      $(window).resize(function() {
        waitForFinalEvent(function() {
          init();
          // close the nav if it's open
          if($("body").hasClass("open")){
            toggleNav();
          }
        }, 200, "global");
      });
    }
  };
  
  

}(jQuery));

