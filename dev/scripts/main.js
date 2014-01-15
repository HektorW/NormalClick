
require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery'
  }
});

require([
  'jquery', 
  'NormalClick'
], function($, NormalClick) {
  
  $('.click').each(function(index, element) {
    var $click = $(element),
        $toggle = $click.siblings('.toggle');

    $click.click(function() {
      $toggle.toggleClass('gone');
    })
  });

});

