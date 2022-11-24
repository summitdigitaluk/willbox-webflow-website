import { createSelectFromArray } from '$utils/helper-functions';

import './date-picker.js';
import './enquiry.js';

//Display select field for variants on a Fleet product page
/*var variantOptions = $('[data-node-type="commerce-add-to-cart-option-select"]').children();
var variantArr = [];
$.each(variantOptions,function(i){
  if(this.value !== ''){
    variantArr.push(this.text);
  }
});
createSelectFromArray(variantArr,'variant','variant-label');*/

//Display select for billing type on a Fleet product page
var billingArr = [];
var billingOptions = $('[data-enquiry="billing"] > div');
billingOptions.each(function () {
  billingArr.push($(this).text());
});
createSelectFromArray(billingArr, 'billing', 'billing-label');

//Set default quantity to 1
//$('#qty').val(1);

//Show the date picker if the only billing option is to Hire
var val = $('#billing').val().toLowerCase();
if (val === 'hire') {
  $('#date-picker').removeClass('hidden');
}

$('.add-to-enquiry .loading').removeClass('loading');

//Make Lightbox Open from the main image
$('.lightbox-main-link').on('click', function (e) {
  e.preventDefault();
  $('.lightbox-gallery-item').eq(0).find('.w-lightbox').trigger('click');
});

//Detect select change to update slick
/*console.log($('[data-node-type="commerce-add-to-cart-option-select"]'));
$('[data-node-type="commerce-add-to-cart-option-select"]').on('change',function(e){
  console.log('changed');
});*/
/*
$('#option-set-c1dc75c71dc8be14a9dc7ed3935116df').on('mousedown',function(e){
  console.log('mousedown');
});
document.getElementById('option-set-c1dc75c71dc8be14a9dc7ed3935116df').addEventListener('change', function(){
  // handle change
  console.log('changed');
});*/
/*
setTimeout(function(){
  $('[data-node-type="commerce-add-to-cart-option-select"]').attr('data-change','select-here');
  function doTheThing() {
    console.log('changed');
  }
},5000);
*/
/*
$('[data-node-type="commerce-add-to-cart-option-select"]').on('change',function(){
  console.log('getSlick');
  $('.slick-slider').slick('getSlick');
  $('.slick-thumbnails').slick('getSlick');
  console.log('unslick');
  $('.slick-slider').slick('unslick');
  $('.slick-thumbnails').slick('unslick');
  console.log('getSlick');
  $('.slick-slider').slick('getSlick');
  $('.slick-thumbnails').slick('getSlick');
  console.log('new slick');
  $('.slick-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: true,
    asNavFor: '.slick-thumbnails',
    draggable: false
  });
  $('.slick-thumbnails').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slick-slider',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    draggable: false,
    infinite: false
  });
  console.log('done');
});
*/
