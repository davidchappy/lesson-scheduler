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

  // Scroll body when adding new lesson period
  // $("body").on('click', '.add-lesson-period', function(e) {
  //   $('html, body').animate({
  //       scrollTop: $("#siteFooter").offset().top
  //   }, 500);
  // })

  // $("body").on('click', '.submit-new-lesson-period', function(e) {
  //   $('html, body').animate({
  //       scrollTop: $("#siteFooter").offset().top
  //   }, 500);  })

  $("body").on('click', '.edit-lesson-period', function(event) {
    $(this).parents(".lesson-period-header").toggleClass('editing');
  });

  $("body").on('click', '#nav-help-icon', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $("#pup-Help").toggle();
  });

  $("html").on('click', 'body', function(event) {
    $("#pup-Help").hide();
  });

  $(window).on('load', function() {
    $('#welcomeMessage').modal('show');
  });
});
