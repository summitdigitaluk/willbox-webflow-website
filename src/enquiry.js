//Make sure the content behind the modal does not scroll
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import {
  createSelectFromArray,
  arrayIsEmpty,
  isDate,
  dateObjectToUniversalDate,
  setEnquiryButton,
} from '$utils/helper-functions';

//Global variables
//var enquiry = $('#enquiry');
//var ribbon = $('#enquiry-ribbon');
const modalDoesNotExist = $('.modal').length < 1;

//Monitor billing type to display hire period selector
$(document).on('change', '#billing', function () {
  var val = $(this).val().toLowerCase();
  if (val === 'hire') {
    //console.log('Show date range');
    $('#date-picker').removeClass('hidden');
  } else {
    $('#date-picker').addClass('hidden');
  }
  if ($('[data-enquiry="add-to-enquiry"] .icon-check').length) {
    $('[data-enquiry="add-to-enquiry"]').html(
      '<span class="button-text icon-add">Add to Enquiry</span>'
    );
  }
});

//Increase qty
$('.increase[data-for="enquiry-ribbon"]').on('click', function (e) {
  e.preventDefault();
  var $this = $(this);
  var $parent = $this.parent();
  var $counter = $parent.siblings('.counter');
  var val = $counter.val();
  if (val >= 1) {
    //Value of counter is 1, changing to 2
    //Enable the decrease button again
    $parent
      .siblings('.interaction-button-wrapper')
      .find('.decrease')
      .prop('disabled', false)
      .removeAttr('disabled');
  }
  if (val < 99) {
    var newVal = +val + 1;
    $counter.val(newVal).trigger('change');
  }
});

//Decrease qty
$('.decrease[data-for="enquiry-ribbon"]').on('click', function (e) {
  e.preventDefault();
  var $this = $(this);
  var $parent = $this.parent();
  var $counter = $parent.siblings('.counter');
  var val = $counter.val();
  if (val > 1) {
    if (val === 2) {
      //Value of counter is 2, changing to 1
      //Cannot have zero qty so disable the decrease button again
      $this.prop('disabled', true).attr('disabled', '');
    }
    var newVal = +val - 1;
    $counter.val(newVal).trigger('change');
  }
});

//Load the enquiry
//If there is an enquiry in local storage use that
if (localStorage.getItem('enquiry')) {
  var enquiryArr = JSON.parse(localStorage.getItem('enquiry'));
}
//Else start a new one
else {
  var enquiryArr = [];
  localStorage.setItem('enquiry', JSON.stringify(enquiryArr));
  //console.log(localStorage.getItem('enquiry'));
}

//Open "Add to Enquiry" modal with correct product details
$(document).on('click', '[data-enquiry="add-to-enquiry-modal"]', function (e) {
  e.preventDefault();
  //Hide the date picker
  $('#variant-select').addClass('hidden');
  $('#date-picker').addClass('hidden');
  //Make sure the "add to enquiry" button text is correct
  if ($('[data-enquiry="add-to-enquiry"] .icon-check').length) {
    $('[data-enquiry="add-to-enquiry"]').html(
      '<span class="button-text icon-add">Add to Enquiry</span>'
    );
  }
  var $this = $(this),
    card = $this.closest('.content_card'),
    name = card.find('.product_singular_name')
      ? card.find('.product_singular_name').text() !== ''
        ? card.find('.product_singular_name').text()
        : card.find('.content_card_title').text()
      : card.find('.content_card_title').text(),
    variantOptions = card.find('[data-node-type="commerce-add-to-cart-option-select"]').children(),
    img = card.find('.content_card-image').attr('src');

  var variants = [];
  $.each(variantOptions, function (i) {
    if (this.value !== '') {
      variants.push(this.text);
    }
  });

  //console.log('img',img);
  $('[data-enquiry="img"]').html(img);
  $('[data-enquiry="singular-name"]').html(name);
  if (arrayIsEmpty(variants) === false) {
    createSelectFromArray(variants, 'variant', 'variant-label');
    $('#variant-select').removeClass('hidden');
  }
  //Set default quantity to 1
  $('#qty').val(1);
  //Set the qty decrease button to be disabled
  $('.decrease[data-for="enquiry-ribbon"]').prop('disabled', true).attr('disabled', '');
  //Get available billing options
  var modalBillingArr = [];
  var modalBillingOptions = card.find('[data-enquiry="billing"]');
  modalBillingOptions.each(function () {
    modalBillingArr.push($(this).text());
  });
  createSelectFromArray(modalBillingArr, 'billing', 'billing-label');
  //If the only billing option is Hire OR the first billing option is Hire then we need to show the date picker
  if (modalBillingArr[0] === 'Hire') {
    $('#date-picker').removeClass('hidden');
  }
  openModal('add-to-enquiry');
});

function openModal(id) {
  if (document.getElementById(id)) {
    //Stop the page scrolling
    var targetElement = document.getElementById(id);
    disableBodyScroll(targetElement, {
      reserveScrollBarGap: true,
    });
    //Scroll modal body to top if previously scrolled modal on another viewing
    targetElement.scroll(0, 0);

    var $modal = $('#' + id);
    $modal.removeClass('closed').addClass('opening').css('display', 'flex');

    //Animate the background fading in
    let $modalBg = $modal.find('.modal-background');
    $modalBg.fadeIn(350);

    //Animate the modal opening
    setTimeout(function () {
      $modal.removeClass('opening').addClass('open');
      $('.loading').removeClass('loading');
      $modalBg.on('click', function () {
        closeModal(id);
      });
    }, 350);
  }
}

function closeModal(id) {
  if (document.getElementById(id)) {
    var $modal = $('#' + id);
    //Animate the modal closing
    $modal.removeClass('open').addClass('closing');
    //Animate the background fading out
    $modal.find('.modal-background').fadeOut(200);
    //Enable page to scroll again
    setTimeout(function () {
      $modal.removeClass('closing').hide().addClass('closed');
      //Re-enable page scrolling
      var targetElement = document.getElementById(id);
      enableBodyScroll(targetElement);
    }, 200);
  }
}

$('.close-modal').each(function () {
  $(this).on('click', function (e) {
    e.preventDefault();
    //Indentify which modal to close
    var modalId = $(e.target).closest('.modal').attr('id');
    closeModal(modalId);
  });
});

//Make sure the Add to Enquiry button always shows the correct text
$(
  '.add-to-enquiry .form-select, .add-to-enquiry .input.counter, .add-to-enquiry .calendar-field'
).each(function () {
  $(this).on('change', function () {
    if ($('[data-enquiry="add-to-enquiry"] .icon-check').length) {
      $('[data-enquiry="add-to-enquiry"]').html(
        '<span class="button-text icon-add">Add to Enquiry</span>'
      );
    }
  });
});

//Update enquiryArr, add to localStorage and show in the ribbon
$('[data-enquiry="add-to-enquiry"]').on('click', function (e) {
  e.preventDefault();
  var formIsValid = true;

  //Get up to date enquiry
  var enquiryArr = JSON.parse(localStorage.getItem('enquiry'));

  //Reset variables
  var name = '',
    variantEle = '',
    variant = '',
    qty = '',
    billing = '',
    selectedDates = [],
    img = '';

  //Get the product details
  name = $('[data-enquiry="singular-name"]').length
    ? $('[data-enquiry="singular-name"]').text() !== ''
      ? $('[data-enquiry="singular-name"]').text()
      : $('[data-enquiry="name"]').text()
    : $('[data-enquiry="name"]').text();
  variantEle =
    $('#variant').length && !$('#variant-select').hasClass('hidden')
      ? $('#variant')
      : $('.product-sidebar [data-node-type="commerce-add-to-cart-option-select"]').length
      ? $('[data-node-type="commerce-add-to-cart-option-select"]')
      : null;
  variant =
    variantEle !== null
      ? variant.id === 'variant'
        ? variantEle.val()
        : variantEle.children('[value="' + variantEle.val() + '"]').text()
      : 'n/a';
  //console.log('variant',variant);
  qty = $('.counter').val() > 0 ? $('.counter').val() : '1';
  billing = $('#billing').val().toLowerCase();
  img = modalDoesNotExist
    ? $('[data-enquiry="img"]').eq(0).attr('src')
    : $('[data-enquiry="img"]').text();
  selectedDates =
    isDate($('#hire-start').datepicker('getDate')) && isDate($('#hire-end').datepicker('getDate'))
      ? [$('#hire-start').datepicker('getDate'), $('#hire-end').datepicker('getDate')]
      : [];
  localStorage.setItem('selectedDates', JSON.stringify(selectedDates));

  //Check if variants actually exist
  if (variantEle !== null) {
    if (variant === '' || variant.indexOf('Select') > -1) {
      //No variant selected
      formIsValid = false;
      if (!variantEle.siblings('.form-error').length) {
        $('<div class="form-error">Please select a product to add</div>').insertAfter(variantEle);
      }
      variantEle.trigger('focus');
      return;
    }
    //Variant has been selected
    variantEle.siblings('.form-error').remove();
  }

  //Check if product is already in the enquiry
  //Loop through array, only checking for a match if the billing type matches first
  //First check if object is empty
  const theArrayIsNotEmpty = arrayIsEmpty(enquiryArr) === false;
  if (theArrayIsNotEmpty) {
    var itemExists = false;
    for (let i = 0; i < enquiryArr.length; i++) {
      if (itemExists) break;
      //Only check items which match the billing type
      if (enquiryArr[i]['billing'] === billing) {
        var obj = enquiryArr[i];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (key === 'id') {
              var itemInStorage = obj[key];
              var id;
              if (billing === 'hire') {
                id =
                  selectedDates[0] && selectedDates[1]
                    ? name.toLowerCase().replace(/[^\w]/g, '') +
                      variant.toLowerCase().replace(/[^\w]/g, '') +
                      'startdate' +
                      dateObjectToUniversalDate(selectedDates[0]) +
                      'enddate' +
                      dateObjectToUniversalDate(selectedDates[1])
                    : name.toLowerCase().replace(/[^\w]/g, '') +
                      variant.toLowerCase().replace(/[^\w]/g, '') +
                      'noselecteddates';
              } else {
                id =
                  name.toLowerCase().replace(/[^\w]/g, '') +
                  variant.toLowerCase().replace(/[^\w]/g, '');
              }
              //console.log(itemInStorage);
              //console.log(id);
              if (itemInStorage === id) {
                //console.log('match');
                //Product name and variant already exists in enquiry
                //If product is for hire, need to check if hire period is the same as the one stored before flagging itemExists, otherwise need to add as an additional product with different hire dates
                if (billing === 'hire') {
                  var selectedDatesInStorage = obj['selectedDates'];
                  const theSelectedDatesInStorageArrayIsNotEmpty = arrayIsEmpty(selectedDatesInStorage) === false;
                  const theSelectedDatesInStorageArrayIsEmpty = arrayIsEmpty(selectedDatesInStorage) === true;
                  const theSelectedDatesArrayIsNotEmpty = arrayIsEmpty(selectedDates) === false;
                  const theSelectedDatesArrayIsEmpty = arrayIsEmpty(selectedDates) === true;
                  if (
                    //Either we have a start date and an end date OR neither have a start/end date
                    (
                      theSelectedDatesInStorageArrayIsNotEmpty && theSelectedDatesArrayIsNotEmpty ||
                      theSelectedDatesInStorageArrayIsEmpty && theSelectedDatesArrayIsEmpty
                    ) &&
                    //Compare the dates to see if they match
                    (
                      theSelectedDatesInStorageArrayIsEmpty && theSelectedDatesArrayIsEmpty ||
                      selectedDatesInStorage[0] === selectedDates[0].toISOString() && selectedDatesInStorage[1] === selectedDates[1].toISOString()
                    )
                  ) {
                    //The dates stored match the dates selected
                    //console.log('This product is already in the enquiry, increase the qty');
                    itemExists = true;
                    //Increase qty of item
                    var newQty = (parseInt(obj['qty'], 10) + parseInt(qty, 10)).toString();
                    obj['qty'] = newQty;
                    localStorage.setItem('enquiry', JSON.stringify(enquiryArr));
                    closeModal('add-to-enquiry');
                    //updateRibbon({id:id,qty:newQty});
                    productAdded({ name: name, img: img, variant: variant });
                  }
                } else {
                  //console.log('This product is already in the enquiry, increase the qty');
                  itemExists = true;
                  //Increase qty of item
                  var newQty = (parseInt(obj['qty'], 10) + parseInt(qty, 10)).toString();
                  obj['qty'] = newQty;
                  localStorage.setItem('enquiry', JSON.stringify(enquiryArr));
                  closeModal('add-to-enquiry');
                  //updateRibbon({id:id,qty:newQty});
                  productAdded({ name: name, img: img, variant: variant });
                }
              }
            }
          }
        }
      }
    }
    if (!itemExists) {
      //Product does not exist in enquiry
      //Add item to billing array
      if (billing === 'hire') {
        var item = {
          billing: billing,
          id:
            selectedDates[0] && selectedDates[1]
              ? name.toLowerCase().replace(/[^\w]/g, '') + variant.toLowerCase().replace(/[^\w]/g, '') + 'startdate' + dateObjectToUniversalDate(selectedDates[0]) + 'enddate' + dateObjectToUniversalDate(selectedDates[1])
              : name.toLowerCase().replace(/[^\w]/g, '') + variant.toLowerCase().replace(/[^\w]/g, '') + 'noselecteddates',
          name: name,
          img: img,
          variant: variant,
          qty: qty,
          selectedDates: selectedDates[0] && selectedDates[1] ? selectedDates : [],
        };
      } else {
        var item = {
          billing: billing,
          id: name.toLowerCase().replace(/[^\w]/g, '') + variant.toLowerCase().replace(/[^\w]/g, ''),
          name: name,
          img: img,
          variant: variant,
          qty: qty,
        };
      }
      enquiryArr.push(item);
      localStorage.setItem('enquiry', JSON.stringify(enquiryArr));
      closeModal('add-to-enquiry');
      //addToRibbon(item);
      productAdded({ name: name, img: img, variant: variant });
    }
  } else {
    //Array is empty so no products exist in enquiry
    //Add item to billing array
    if (billing === 'hire') {
      var item = {
        billing: billing,
        id:
          selectedDates[0] && selectedDates[1]
            ? name.toLowerCase().replace(/[^\w]/g, '') + variant.toLowerCase().replace(/[^\w]/g, '') + 'startdate' + dateObjectToUniversalDate(selectedDates[0]) + 'enddate' + dateObjectToUniversalDate(selectedDates[1])
            : name.toLowerCase().replace(/[^\w]/g, '') + variant.toLowerCase().replace(/[^\w]/g, '') + 'noselecteddates',
        name: name,
        img: img,
        variant: variant,
        qty: qty,
        selectedDates: selectedDates[0] && selectedDates[1] ? selectedDates : [],
      };
    } else {
      var item = {
        billing: billing,
        id: name.toLowerCase().replace(/[^\w]/g, '') + variant.toLowerCase().replace(/[^\w]/g, ''),
        name: name,
        img: img,
        variant: variant,
        qty: qty,
      };
    }
    enquiryArr.push(item);
    localStorage.setItem('enquiry', JSON.stringify(enquiryArr));
    closeModal('add-to-enquiry');
    //addToRibbon(item);
    productAdded({ name: name, img: img, variant: variant });
  }
  $(this).html('<span class="button-text icon-check">Added</span>');
  //console.log(localStorage.getItem('enquiry'));
  setEnquiryButton('complete-enquiry');
});

function productAdded(data) {
  var template = $($('#product-added').eq(0).html()),
    img = template.find('.product-added-image'),
    title = template.find('.product-added-title'),
    name = data.variant !== 'n/a' ? data.variant + ' ' + data.name : data.name;

  title.html(name);
  img.attr('src', data.img);

  $('#complete-enquiry').append(template);
  setTimeout(function () {
    template.removeClass('hidden');
  }, 50);
  setTimeout(function () {
    template.addClass('hidden');
    setTimeout(function () {
      template.remove();
    }, 350);
  }, 5000);
}

$('#filter-fleet-list').on('click', function (e) {
  e.preventDefault();
  $('#filter-column').fadeIn(200);
  var targetElement = document.querySelector('#filter-column');
  disableBodyScroll(targetElement);
  //Scroll modal body to top if previously scrolled modal on another viewing
  targetElement.scroll(0, 0);
});

$('#filter-column-close').on('click', function (e) {
  e.preventDefault();
  $('#filter-column').fadeOut(200);
  setTimeout(function () {
    var targetElement = document.querySelector('#filter-column');
    enableBodyScroll(targetElement);
  }, 200);
});
