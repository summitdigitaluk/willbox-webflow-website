if($('#wf-form-Revenue-Calculator').length) {
  //Disable the enter button
  $('#wf-form-Revenue-Calculator').bind('keypress keydown keyup',function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        $('#calculate-revenue-button').trigger('click');
    }
  });
  //Revenue Calculator
  $('#calculate-revenue-button').on('click',function(){
    //Get values of user inputs
    var siteArea = $('#site_area').val();
    var unit = $('#unit').val();
    var region = $('#region').val();
    //Calculate revenue
    var singleStack = Math.ceil(((siteArea * 0.5) * unit * region) / 12);
    var doubleStack =  Math.ceil(singleStack + (singleStack * 0.75));
    $('#revenue-loader').addClass('loading');
    $('#revenue-message').hide();
    $('#revenue-double').html(doubleStack.toLocaleString("en-US"));
    $('#revenue-single').html(singleStack.toLocaleString("en-US"));
    setTimeout(function(){
      $('#revenue').removeClass('hidden');
      $('#revenue-loader').removeClass('loading');
    },500);
  });
}