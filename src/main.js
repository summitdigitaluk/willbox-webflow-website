//Make sure the content behind the Mega Nav or a modal does not scroll
import 'body-scroll-lock';
import 'owl.carousel';

import { arrayIsEmpty, setEnquiryButton } from '$utils/helper-functions';

//Click outside current mega nav closes it
$(document).on('click', function (event) {
  //console.log($(event.target));
  //Click outside a currently open mega nav slide to close it (exclude the mega nav background)
  if (
    //Mega Nav is open
    $('.mega-nav-button.active').length &&
    //Click was outside a '.mega-nav-slide' or WAS on the Mega Nav background
    (
      !$(event.target).closest('.mega-nav-slide').length ||
      $(event.target).closest('.mega-nav-background').length
    )
    &&
    (
      //Click was not to open a different Mega Nav
      !$(event.target).closest('.mega-nav-button-inner').length ||
      //Click was to close currently open Mega Nav
      ($(event.target).closest('.mega-nav-button-inner').length && $(event.target).closest('.mega-nav-button.active').length)
    )
  ) {
    console.log('Click was outside the Slider');
    //Get ID of open Mega Nav
    var id = $('.mega-nav-button.active').find('.mega-nav-slide').attr('id');
    //Close the Mega Nav
    $('.mega-nav-button.active').removeClass('active');
    //Re-enable page scrolling
    var target = document.getElementById(id);
    bodyScrollLock.enableBodyScroll(target);
    $('body').removeClass('fixed');
  }
  //Click on button inner when another slide is active opens this slide and closes the active one
  else if (
    //Mega Nav is open
    $('.mega-nav-button.active').length &&
    //Click was not on the active button
    !$(event.target).closest('.mega-nav-button.active').length &&
    //Click was on a Mega Nav button
    $(event.target).closest('.mega-nav-button-inner').length

  ) {
    console.log('Open another mega nav');
    $(event.target).closest('.mega-nav-button').addClass('active').siblings().removeClass('active');
    //Make the first thumbnail visible
    $(event.target).closest('.mega-nav-button').find('.mega-nav-image').eq(0).css({'opacity':'1'});
    //Stop the page scrolling
    //Get ID of open Mega Nav
    var id = $('.mega-nav-button.active').find('.mega-nav-slide').attr('id');
    var target = document.getElementById(id);
    bodyScrollLock.disableBodyScroll(target);
    $('body').addClass('fixed');
  }
  //Click on button inner when slide is not active opens the slide
  else if (
    (!$(event.target).closest('.mega-nav-button.active').length && $(event.target).closest('.mega-nav-button-inner').length)
    ||
    (!$(event.target).closest('.mega-nav-button.active').length && $(event.target).closest('.mega-nav-button-inner').length)
  ) {
    console.log('Open the mega nav');
    $(event.target).closest('.mega-nav-button').addClass('active');
    //Make the first thumbnail visible
    $(event.target).closest('.mega-nav-button').find('.mega-nav-image').eq(0).css({'opacity':'1'});
    //Stop the page scrolling
    //Get ID of open Mega Nav
    var id = $('.mega-nav-button.active').find('.mega-nav-slide').attr('id');
    var target = document.getElementById(id);
    bodyScrollLock.disableBodyScroll(target);
    $('body').addClass('fixed');
  }
});

(function () {
  var enquiryArr = JSON.parse(localStorage.getItem('enquiry'));
  const theArrayIsNotEmpty = arrayIsEmpty(enquiryArr) === false;
  if (theArrayIsNotEmpty) {
    setEnquiryButton('complete-enquiry');
  } else {
    setEnquiryButton('get-a-quote');
  }
})();

//Quality of life DEV functions
$('#removeEnquiry').on('click', function (e) {
  e.preventDefault();
  localStorage.removeItem('enquiry');
  window.location.reload();
});
$('#addEnquiry').on('click', function (e) {
  e.preventDefault();
  localStorage.setItem(
    'enquiry',
    '[{"billing":"hire","id":"refrigeratedcontainernastartdate2022119enddate20221231","name":"Refrigerated Container","img":"https://assets-global.website-files.com/624f4fe3fe9e978f68b9adfe/62dab2ee8a990f3699aea2fe_Willbox%20Containers%20-%2010%27%20Reefer-WBXU_EXTERNAL_MACHINE_UNIT_1024px.jpg","variant":"n/a","qty":"3","selectedDates":["2022-11-09T00:00:00.000Z","2022-12-31T00:00:00.000Z"]},{"billing":"hire","id":"platformcontainernastartdate2022119enddate20221231","name":"Platform Container","img":"https://assets-global.website-files.com/624f4fe3fe9e978f68b9adfe/62daafb47a56d7ecd863ff31_Willbox%20Containers%20-%2020%27%20Platform%20-%20WBXU_VIEW_002_1024px.jpg","variant":"n/a","qty":"1","selectedDates":["2022-11-09T00:00:00.000Z","2022-12-31T00:00:00.000Z"]},{"billing":"purchase","id":"securestoragecontainer20ft","name":"Secure Storage Container","img":"https://assets-global.website-files.com/624f4fe3fe9e978f68b9adfe/62dab9f28a990f9bd7aef157_Willbox%20Containers%20-%2020%27-WBXU_EXTERNAL_1024px.jpg","variant":"20ft","qty":"3"},{"billing":"hire","id":"sleepercabinnastartdate2022119enddate20221231","name":"Sleeper Cabin","img":"https://assets-global.website-files.com/624f4fe3fe9e978f68b9adfe/62dab068a16b1a6a3b958275_Willbox%20Containers%20-%2020%27%20Double%20Sleeper%20Cabin%20-%20WBXU_INTERNAL_1024px.jpg","variant":"n/a","qty":"2","selectedDates":["2022-11-09T00:00:00.000Z","2022-12-31T00:00:00.000Z"]},{"billing":"hire","id":"dryingroomnastartdate2022119enddate20221231","name":"Drying Room","img":"https://assets-global.website-files.com/624f4fe3fe9e978f68b9adfe/62daae81152ea2ae4e0c17f5_Willbox%20Containers%20-%2010%27%20Drying%20Room%20-WBXU_INTERNAL_1024px.jpg","variant":"n/a","qty":"2","selectedDates":["2022-11-09T00:00:00.000Z","2022-12-31T00:00:00.000Z"]},{"billing":"purchase","id":"securestoragecontainer45ft","name":"Secure Storage Container","img":"https://assets-global.website-files.com/624f4fe3fe9e978f68b9adfe/62dab9f28a990f9bd7aef157_Willbox%20Containers%20-%2020%27-WBXU_EXTERNAL_1024px.jpg","variant":"45ft","qty":"4"},{"billing":"purchase","id":"securestoragecontainer10ft","name":"Secure Storage Container","img":"https://assets-global.website-files.com/624f4fe3fe9e978f68b9adfe/62dab9f28a990f9bd7aef157_Willbox%20Containers%20-%2020%27-WBXU_EXTERNAL_1024px.jpg","variant":"10ft","qty":"2"}]'
  );
  window.location.reload();
});

loadJsFiles([
  {
    source: 'https://apps.elfsight.com/p/platform.js',
    condition: () => {
      if ($('#elfsight-google-reviews').length > 0) {
        return true;
      }
    },
    ignoreOnMobile: true,
    success: null,
    fail: () => {
      $('#elfsight-google-reviews').remove();
    },
  },
]);

$('.collection-list-partners.w-dyn-items').owlCarousel({
  margin: 20,
  nav: false,
  items: 4,
  loop: true,
  autoWidth: true,
  center: true,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayTimeout: 3000,
  autoplaySpeed: 2000,
});
