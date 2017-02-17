jQuery( document ).ready(function( $ ) {
  // Turn possible discount green when same as current discount
  $("body").on('click', '.select-week', function(event) {
    var possibleDiscount = $("#possibleDiscount .header-large");
    var currentDiscount = $("#currentDiscount .header-large");
    if(possibleDiscount.text() == currentDiscount.text()) {
      possibleDiscount.addClass('max-discount');
    } else {
      possibleDiscount.removeClass('max-discount');
    }
  });

  // Toggle selected class when clicking weeks
  $("body").on('click', '.select-week', function(event) {
    event.preventDefault();
    var target = event.target;
    $(target).toggleClass('selected');
  });

  $("body").on('click', '#add-student', function(e) {
    console.log("Clicked");
    $('html, body').animate({
        scrollTop: $("#siteFooter").offset().top
    }, 1000);
  })
});
