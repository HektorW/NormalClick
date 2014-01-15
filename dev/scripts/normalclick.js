(function(factory) {
  if(typeof define !== 'undefined' && define.amd) {
    define(['jquery'], factory);
  } else {
    window.NormalClick = factory(window.jQuery);
  }
}(function($) {

  var NormalClick = {

    

  };

  return NormalClick;
}));