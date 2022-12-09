import {
  arrayIsEmpty,
  isDate,
  dateObjectToUkDate,
  addLeadingZero,
  checkboxIsChecked,
  updateEnquiryData,
  oneDayInSeconds,
  minHirePeriodInDays,
  setEnquiryButton,
  datePickerTemplate,
  moveItemsInObject,
  objectLength,
} from '$utils/helper-functions';

import './date-picker.js';

/*//Load the enquiry
//If there is an enquiry in local storage use that
if(localStorage.getItem('enquiry')) {
  var enquiryArr = JSON.parse(localStorage.getItem('enquiry'));
  //If there is an enquiry in local storage add the data to the form
  updateEnquiryData();
  //Check if the enquiry has any data. Change the page title if it does
  if (arrayIsEmpty(enquiryArr) === false) {
    $('#enquiry-title').html('Complete your Enquiry');
  }
}
//Else start a new one
else {
  var enquiryArr = [];
  localStorage.setItem('enquiry',JSON.stringify(enquiryArr));
  console.log(localStorage.getItem('enquiry'));
}*/

function disableInput(num) {
  var attr = num <= 1 ? ' disabled' : '';
  return attr;
}

//Enquiry submission page
//Hire Periods on the Enquiry Form
(function () {
  //Get up to date enquiry
  var enquiryArr = JSON.parse(localStorage.getItem('enquiry'));
  var sameHirePeriodForAllItems = true,
    loopStartDate,
    loopEndDate;
  const thereAreEnquiryItems = arrayIsEmpty(enquiryArr) === false;
  if (thereAreEnquiryItems) {
    var atLeastOneHire = false;
    var atLeastOnePurchase = false;
    var numberOfEnquiryItems = enquiryArr.length;
    var count = 0;
    //Loop through the items and display them on the page with date pickers
    for (let i = 0; i < enquiryArr.length; i++) {
      count += 1;
      var obj = enquiryArr[i];
      if (obj.billing === 'hire') {
        //Only do this bit once
        if (atLeastOneHire === false) {
          atLeastOneHire = true;
        }
        const theSelectedDatesArrayIsNotEmpty = arrayIsEmpty(obj.selectedDates) === false;
        if (theSelectedDatesArrayIsNotEmpty) {
          function createDates(selectedDatesArr) {
            var dates = '';
            $.each(selectedDatesArr, function (index, value) {
              var date = new Date(value);
              if (isDate(date)) {
                index === 0
                  ? dates += '<span data-date-id="' + obj.id + '-0">' + dateObjectToUkDate(date) + '</span> - '
                  : dates += '<span data-date-id="' + obj.id + '-1">' + dateObjectToUkDate(date) + '</span>';
                if (sameHirePeriodForAllItems === true) {
                  if (i > 0) {
                    if (index === 0 && loopStartDate !== value) {
                      sameHirePeriodForAllItems = false;
                    } else if (index === 1 && loopEndDate !== value) {
                      sameHirePeriodForAllItems = false;
                    }
                  } else {
                    if (index === 0) {
                      loopStartDate = value;
                    } else {
                      loopEndDate = value;
                    }
                  }
                }
              }
            });
            dates =
              '<div class="hire-period-details text-black-16">' +
                '<div>' + dates + '</div>' +
                '<a class="change-dates" href="#">Change Dates</a>' +
              '</div>';
            return dates;
          }

          function createDateInputs(selectedDatesArr) {
            var dates = '';
            $.each(selectedDatesArr, function (index, value) {
              var date = new Date(value);
              if (isDate(date)) {
                var year = date.getFullYear();
                var month = addLeadingZero(date.getMonth() + 1);
                var day = addLeadingZero(date.getDate());
                dates +=
                  '<div class="date-picker"><input type="text" class="calendar-field w-input" data-toggle="datepicker" autocomplete="off" maxlength="256" placeholder="Select Date" ' +
                  'id="' + obj.id + '-' + index + '" ' +
                  'data-id="' + obj.id + '" ' +
                  'data-index="' + index + '" ' +
                  'value="' + day + '-' + month + '-' + year + '" ' +
                  'readonly><div class="icon-calendar"></div></div>';
              }
            });
            dates = '<div class="date-picker-wrapper with-confirm">' + dates + '</div>';
            return dates;
          }

          var name = obj.variant !== 'n/a' ? obj.variant + ' ' + obj.name : obj.name;

          $('#hireItemsList').append(
            '<div id="' + obj.id + '" class="enquiry-item">' +
              '<div class="enquiry-item-column details">' +
                '<div class="enquiry-item-image-wrapper">' +
                  '<div class="enquiry-item-image-inner"><img src="' + obj.img + '" loading="lazy" alt="" class="enquiry-item-image"><div class="inner-shadow show-on-mobile-portrait"></div></div>' +
                '</div>' +
                '<div class="enquiry-details">' +
                  '<div class="enquiry-details-inner">' +
                    '<div class="enquiry-item-title">' + name + '</div>' +
                    createDates(obj.selectedDates) +
                  '</div>' +
                  '<div class="hire-period-dates with-confirm" style="display:none;">' +
                    createDateInputs(obj.selectedDates) +
                    '<div class="interaction-button-wrapper"><a data-for="enquiry-form" data-id="' + obj.id + '" class="save-dates interaction-button w-inline-block"><div class="interaction-button-inner"><img loading="lazy" src="https://assets-global.website-files.com/624d4f43e7b206386b75086e/63230f71299e7f9af52085d7_date-picker-confirm.svg" alt="" class="icon"></div></a></div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="enquiry-item-column counter">' +
                '<label class="enquiry-item-label">Qty:</label>' +
                '<div class="enquiry-counter">' +
                  '<div class="counter-input-wrapper">' +
                    '<div class="interaction-button-wrapper"><a href="#" class="interaction-button decrease w-inline-block"'+disableInput(obj.qty)+' data-for="enquiry-form"><div class="interaction-button-inner"><img src="https://assets.website-files.com/624d4f43e7b206386b75086e/626c6c68910685550a1bd19c_icon%20quantity%20less.svg" loading="lazy" alt="" class="icon"></div></a></div>' +
                    '<input type="number" class="input counter w-input" maxlength="2" pattern="[0-9]{2}" min="1" max="99" data-id="'+obj.id+'" value="'+obj.qty+'">' +
                    '<div class="interaction-button-wrapper"><a href="#" class="interaction-button increase w-inline-block" data-for="enquiry-form"><div class="interaction-button-inner"><img src="https://assets.website-files.com/624d4f43e7b206386b75086e/626c6c026ae0603c4b631668_icon%20quantity%20more.svg" loading="lazy" alt="" class="icon"></div></a></div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="remove-button-wrapper">' +
                '<div class="interaction-button-wrapper"><a href="#" class="interaction-button remove-item w-inline-block" data-id="'+obj.id+'"><div class="interaction-button-inner remove-item"><div class="icon remove w-embed"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path fill="#a6a6a6" d="M18,1.81l-1.81-1.81-7.19,7.19L1.81,0,0,1.81l7.19,7.19L0,16.19l1.81,1.81,7.19-7.19,7.19,7.19,1.81-1.81-7.19-7.19L18,1.81Z"></path></svg></div></div></a></div>' +
              '</div>' +
            '</div>'
          );

          function updateDateInEnquiry(_id, _index, _date) {
            //Change date on the page
            $('[data-date-id="' + _id + '-' + _index + '"]').text(dateObjectToUkDate(_date));
            //Add new start date to the enquiry
            var index = parseInt(_index);
            //console.log(index);
            for (let i in enquiryArr) {
              if (enquiryArr[i].id === _id) {
                //Convert UK date dd-mm-yyy to Universal date yyyy-mm-ddT00:00:00.000Z
                var date = _date.toISOString();
                enquiryArr[i].selectedDates[index] = date;
                break;
              }
            }
            localStorage.setItem('enquiry', JSON.stringify(enquiryArr));
            updateEnquiryData();
          }

          //Activate each datepicker with the correct start date
          $.each(obj.selectedDates, function (index, value) {
            //console.log(index, value);
            $('#' + obj.id + '-' + index).datepicker({
              date: new Date(value),
              template:
                index === 0
                  ? datePickerTemplate('Select a start date')
                  : datePickerTemplate('Select an end date'),
              pick: function (e) {
                //Only run when on the day view
                if (e.view === 'day') {
                  var $this = $(this);
                  var id = $this.attr('data-id');
                  var index = $this.attr('data-index');
                  if (index === '0') {
                    //Get the start date and end date values to compare
                    var startDate = e.date;
                    var startDateEpoch = e.date.getTime();
                    var minEndDate = new Date(startDateEpoch + (oneDayInSeconds * minHirePeriodInDays));
                    var endDateInput = $('#' + id + '-1');
                    var endDate = endDateInput.datepicker('getDate');
                    //console.log('startDate',startDate);
                    //console.log('endDate',endDate);
                    //Add new start date to the enquiry
                    updateDateInEnquiry(id, index, startDate);
                    //Disable end date picker dates before the "new" start date
                    endDateInput.datepicker('setStartDate', minEndDate);
                    if (isDate(endDate)) {
                      //End date has been set
                      //If the start date is after the end date, clear the end date and open the datepicker
                      if (
                        startDate >=
                        new Date(endDate.getTime() - (oneDayInSeconds * minHirePeriodInDays))
                      ) {
                        endDateInput.datepicker('setDate', minEndDate);
                        endDateInput.datepicker('show');
                        //Disable end date picker dates before the "new" start date
                        updateDateInEnquiry(id, '1', minEndDate);
                      }
                    } else {
                      //Assume no date selected
                      endDateInput.datepicker('setDate', minEndDate);
                      endDateInput.datepicker('show');
                    }
                  } else {
                    //Assume this is the end date input
                    //Get the start date and end date values to compare
                    var startDateInput = $('#' + id + '-0');
                    //If the start date is after the end date, alert the user
                    //First check if a start date has been selected
                    if (startDateInput.val() !== '') {
                      var endDate = e.date;
                      var startDate = startDateInput.datepicker('getDate');
                      if (endDate < startDate) {
                        e.preventDefault(); // Prevent picking the date
                        alert('End date cannot be before the start date');
                        return;
                      }
                      if (endDate === startDate) {
                        e.preventDefault(); // Prevent picking the date
                        alert('Minimum hire period is 1 day');
                        return;
                      }
                    } else {
                      startDateInput.datepicker('show');
                    }
                    updateDateInEnquiry(id, index, endDate);
                  }
                }
              },
            });
          });
        }
      } else {
        //Only do this bit once
        if (atLeastOnePurchase === false) {
          atLeastOnePurchase = true;
        }

        var name = obj.variant !== 'n/a' ? obj.variant + ' ' + obj.name : obj.name;

        //Must be a purchase product
        $('#purchaseItemsList').append(
          '<div id="' + obj.id + '" class="enquiry-item">' +
            '<div class="enquiry-item-column details">' +
              '<div class="enquiry-item-image-wrapper">' +
                '<div class="enquiry-item-image-inner"><img src="' + obj.img + '" loading="lazy" alt="" class="enquiry-item-image"><div class="inner-shadow show-on-mobile-portrait"></div></div>' +
              '</div>' +
              '<div class="enquiry-details">' +
                '<div class="enquiry-details-inner">' +
                  '<div class="enquiry-item-title">' + name + '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="enquiry-item-column counter">' +
              '<label class="enquiry-item-label">Qty:</label>' +
              '<div class="enquiry-counter">' +
                '<div class="counter-input-wrapper">' +
                  '<div class="interaction-button-wrapper"><a href="#" class="interaction-button decrease w-inline-block"' + disableInput(obj.qty) + ' data-for="enquiry-form"><div class="interaction-button-inner"><img src="https://assets.website-files.com/624d4f43e7b206386b75086e/626c6c68910685550a1bd19c_icon%20quantity%20less.svg" loading="lazy" alt="" class="icon"></div></a></div>' +
                  '<input type="number" class="input counter w-input" maxlength="2" pattern="[0-9]{2}" min="1" max="99" data-id="' + obj.id + '" value="' + obj.qty + '">' +
                  '<div class="interaction-button-wrapper"><a href="#" class="interaction-button increase w-inline-block" data-for="enquiry-form"><div class="interaction-button-inner"><img src="https://assets.website-files.com/624d4f43e7b206386b75086e/626c6c026ae0603c4b631668_icon%20quantity%20more.svg" loading="lazy" alt="" class="icon"></div></a></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="remove-button-wrapper">' +
              '<div class="interaction-button-wrapper"><a href="#" class="interaction-button remove-item w-inline-block" data-id="' + obj.id + '"><div class="interaction-button-inner remove-item"><div class="icon remove w-embed"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path fill="#a6a6a6" d="M18,1.81l-1.81-1.81-7.19,7.19L1.81,0,0,1.81l7.19,7.19L0,16.19l1.81,1.81,7.19-7.19,7.19,7.19,1.81-1.81-7.19-7.19L18,1.81Z"></path></svg></div></div></a></div>' +
            '</div>' +
          '</div>'
        );
      }
      if (count === numberOfEnquiryItems) {
        //This is the last enquiry item
        //console.log('Last hire item');
        //Remove any "dummy" date pickers used for styling
        $('.enquiry-item:not([id])').remove();
        if (atLeastOneHire === false) {
          $('#hireItems').remove();
        }
        if (atLeastOnePurchase === false) {
          $('#purchaseItems').remove();
        }
      }
    }
    $('.change-dates').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.parent().hide();
      $this.closest('.enquiry-details').find('.hire-period-dates').css({ 'display' : 'flex' });
    });
    $('.save-dates').on('click', function (e) {
      e.preventDefault();
      var $target = $('#' + $(this).attr('data-id'));
      $target.find('.hire-period-dates').hide();
      $target.find('.hire-period-details').show();
    });
    function updateQtyInEnquiry(_id, _qty) {
      for (let i in enquiryArr) {
        if (enquiryArr[i].id === _id) {
          enquiryArr[i].qty = _qty;
          break;
        }
      }
      localStorage.setItem('enquiry', JSON.stringify(enquiryArr));
      updateEnquiryData();
    }

    function removeFromEnquiry(_id) {
      let storedNumber;
      for (let i in enquiryArr) {
        if (enquiryArr[i].id === _id) {
          storedNumber = i;
        }
      }
      let totalLength = enquiryArr.length;

      moveItemsInObject(enquiryArr, storedNumber, totalLength).join(',');
      enquiryArr.pop();

      localStorage.setItem('enquiry', JSON.stringify(enquiryArr));
      updateEnquiryData();
      let enquiryItem = $('#' + _id);
      let itemsList = enquiryItem.parent();
      enquiryItem.removeClass('visible').addClass('removing');
      setTimeout(function () {
        enquiryItem.remove();
        if (itemsList.children().length < 1) {
          itemsList.closest('.form-section').remove();
        }
      }, 200);
      if (arrayIsEmpty(enquiryArr)) {
        setEnquiryButton('get-a-quote');
      } else {
        setEnquiryButton('complete-enquiry');
      }
    }
    //Increase qty
    $('.increase[data-for="enquiry-form"]').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var $parent = $this.parent();
      var $counter = $parent.siblings('.counter');
      var id = $counter.attr('data-id');
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
        $counter.val(newVal);
        //Update enquiry with new qty
        updateQtyInEnquiry(id, newVal);
        setEnquiryButton('complete-enquiry');
      }
    });
    //Decrease qty
    $('.decrease[data-for="enquiry-form"]').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var $parent = $this.parent();
      var $counter = $parent.siblings('.counter');
      var id = $counter.attr('data-id');
      var val = $counter.val();
      if (val > 1) {
        if (val === 2) {
          //Value of counter is 2, changing to 1
          //Cannot have zero qty so disable the decrease button again
          $this.prop('disabled', true).attr('disabled', '');
        }
        var newVal = +val - 1;
        $counter.val(newVal);
        //Update enquiry with new qty
        updateQtyInEnquiry(id, newVal);
        setEnquiryButton('complete-enquiry');
      }
    });
    $('.counter').on('change', function (e) {
      e.preventDefault();
      var $this = $(this);
      var id = $this.attr('data-id');
      var val = $this.val();
      if (val >= 1 && val < 100) {
        updateQtyInEnquiry(id, val);
        setEnquiryButton('complete-enquiry');
      } else {
        $this.val(1);
      }
    });
    $('.interaction-button.remove-item').on('click', function (e) {
      e.preventDefault();
      if (confirm('Confirm, OK to remove this item?')) {
        var id = $(this).attr('data-id');
        removeFromEnquiry(id);
      }
    });
    if (sameHirePeriodForAllItems === true) {
      //Hide the Change Dates links and show the Same Hire Period date pickers
      $('.hire-period-details').hide();
      $('#same_hire_period').attr('checked', 'checked');
      $('#same_hire_period').prop('checked', true);
      $('#hire-start')
        .datepicker({
          date: new Date(loopStartDate),
          template: datePickerTemplate('Select a start date'),
        })
        .val(dateObjectToUkDate(loopStartDate))
        .attr('readonly', '');
      $('#hire-end')
        .datepicker({
          date: new Date(loopEndDate),
          template: datePickerTemplate('Select an end date'),
        })
        .val(dateObjectToUkDate(loopEndDate))
        .attr('readonly', '');
      $('#same-hire-period-dates').css({ 'display' : 'flex' });
    }
    /*setTimeout(function(){
      $('#hireItemsList,#purchaseItemsList').removeClass('loading');
    },350);*/
    $('#enquiry-form-wrapper,#hireItemsList,#purchaseItemsList').removeClass('loading');
  } else {
    //Nothing in the enquiry
    //Remove the Hire Items and Purchase Items tables
    $('#hireItems,#purchaseItems,#tab-items-show-hide').remove();
    $('#enquiry-form-wrapper').removeClass('loading');
  }
}());

$('#same_hire_period').on('change', function (e) {
  if (checkboxIsChecked($(this)) === true) {
    $('.hire-period-details').hide();
    $('#same-hire-period-dates').css({ 'display' : 'flex' });
    updateEnquiryData(true);
  } else {
    $('#same-hire-period-dates').hide();
    $('.hire-period-details').show();
    updateEnquiryData();
  }
});

$('#same_delivery_address').on('change', function (e) {
  if (checkboxIsChecked($(this)) === true) {
    $('#delivery-address-show-hide').addClass('hidden');
  } else {
    $('#delivery-address-show-hide').removeClass('hidden');
    initSmoothScrolling('#delivery-address-show-hide');
  }
});

//Are you hiring or purchasing for a company?
$('input[name="is_a_company"]').on('change', function () {
  //Clear these answers
  $('[name="placed_order"],[name="know_account_num"],[name="vat_registered"]').removeAttr('checked');
  $('[name="placed_order"],[name="know_account_num"],[name="vat_registered"]').prop('checked', false);
  $('#account_num,#vat_num').val('');
  if ($(this).val() === 'YES') {
    $('#company_name').attr('required', true);
    $('#know-account-num-show-hide,#vat-registered-show-hide').addClass('hidden');
    $(
      '#company-details-show-hide, #company-name-billing-show-hide, #company-name-delivery-show-hide'
    ).removeClass('hidden');
    initSmoothScrolling('#company-details-show-hide');
  } else {
    $('#company_name').removeAttr('required').val('');
    $('#company-details-show-hide').addClass('hidden');
    if ($('#company_name_billing').val() !== '') {
      $('#company-name-billing-show-hide').addClass('hidden');
    }
    if ($('#company_name_delivery').val() !== '') {
      $('#company-name-delivery-show-hide').addClass('hidden');
    }
  }
});

//Have you ever placed an order with Willbox?
$('input[name="placed_order"]').on('change', function () {
  $('[name="know_account_num"],[name="vat_registered"]').removeAttr('checked');
  $('[name="know_account_num"],[name="vat_registered"]').prop('checked', false);
  $('#account_num,#vat_num').val('');
  if ($(this).val() === 'YES') {
    $('#account-num-show-hide,#vat-registered-show-hide, #vat-num-show-hide').addClass('hidden');
    $('#know-account-num-show-hide').removeClass('hidden');
    initSmoothScrolling('#know-account-num-show-hide');
  } else {
    $('#account-num-show-hide,#know-account-num-show-hide, #vat-num-show-hide').addClass('hidden');
    $('#vat-registered-show-hide').removeClass('hidden');
    initSmoothScrolling('#vat-registered-show-hide');
  }
});

//Do you know your Willbox account number?
$('input[name="know_account_num"]').on('change', function () {
  $('[name="vat_registered"]').removeAttr('checked');
  $('[name="vat_registered"]').prop('checked', false);
  $('#account_num,#vat_num').val('');
  if ($(this).val() === 'YES') {
    $('#account-num-show-hide').removeClass('hidden');
    $('#vat-registered-show-hide, #know-vat-num-show-hide, #vat-num-show-hide').addClass('hidden');
  } else {
    $('#account-num-show-hide').addClass('hidden');
    $('#vat-registered-show-hide').removeClass('hidden');
    initSmoothScrolling('#vat-registered-show-hide');
  }
});

//Are you VAT registered?
$('input[name="vat_registered"]').on('change', function () {
  if ($(this).val() === 'YES') {
    $('#vat-num-show-hide').removeClass('hidden');
  } else {
    $('#vat-num-show-hide').addClass('hidden');
    if ($('#reason_for_enquiry').val() === 'New Hire/Sales Quote') {
      initSmoothScrolling('#address');
    } else {
      initSmoothScrolling('#notes-show-hide');
    }
  }
});

//Do you know your VAT number?
/*$('input[name="know_vat_number"]').on('change',function(){
  if($(this).val() === 'YES') {
    
  }
  else {
    $('#vat-num-show-hide').addClass('hidden');
  }
});*/

//Highlight active tab
$('.tab-group-tab').on('click', function (e) {
  if (!$(this).hasClass('active')) {
    $(this).parent().siblings().find('.active').removeClass('active');
    $(this).addClass('active');
  }
});

//Highlight the tabs on page scroll
(function () {
  let oldValue = 0;
  let newValue = 0;
  var scrollingUp = false;
  var scrollingDown = false;
  window.addEventListener('scroll', (e) => {
    newValue = window.pageYOffset;
    if (oldValue < newValue) {
      //console.log("Page going up");
      scrollingUp = false;
      scrollingDown = true;
    } else if (oldValue > newValue) {
      //console.log("Page going down");
      scrollingUp = true;
      scrollingDown = false;
    }
    oldValue = newValue;
  });
  var rootMarginTop =
    $('#navigation').css('position') === 'static'
      ? ($('.tab-group').eq(0).outerHeight(false) + 30 - 59) * -1
      : ($('#navigation').outerHeight(false) + $('.tab-group').eq(0).outerHeight(false) + 30 - 59) *
        -1;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (scrollingUp) {
            var id = entry.target.id;
            var $allTabs = $('.tab-group-tab');
            var $tab = $('.tab-group-tab[href="#' + id + '"]');
            var $nextTab = $('.tab-group-tab[href="#' + id + '"]').parent().next().find('.tab-group-tab');
            if ($nextTab.hasClass('active')) {
              $allTabs.removeClass('active');
              $tab.addClass('active');
            }
          }
        } else {
          if (scrollingDown) {
            var id = entry.target.id;
            var $allTabs = $('.tab-group-tab');
            var $tab = $('.tab-group-tab[href="#' + id + '"]');
            if ($tab.hasClass('active') && $tab.parent().index() !== $allTabs.length - 1) {
              $allTabs.removeClass('active');
              $tab.parent().next().find('.tab-group-tab').addClass('active');
            }
          }
        }
      });
    },
    {
      root: null,
      rootMargin: rootMarginTop + 'px 0px 0px 0px',
      threshold: 0.25,
    }
  );
  document.querySelectorAll('.tab-section').forEach(function (ele) {
    observer.observe(ele);
  });
})();

//Submit enquiry
$('#wf-form-enquiry').on('submit', function (e) {
  //Basic validation is first handled by the HTML5 form attribute [required],
  //but we also need to check that we are safe to remove the inputs we need
  //to omit from the submission

  //Array of elements to validate
  //NOTE: They are in reverse order so that .tigger('focus') focusses on the top-most input missing a value
  //console.log('Validating');
  var formIsValid = true;
  var selectedReason = $('#reason_for_enquiry').val();
  if (
    selectedReason === 'Container Conversions' ||
    selectedReason === 'Self Storage' ||
    selectedReason === 'General Enquiry'
  ) {
    var inputsToValidate = [
      { id: 'email_address', message: 'Please enter an email address' },
      { id: 'phone_number', message: 'Please enter a phone number' },
      { id: 'last_name', message: 'Please enter a last name' },
      { id: 'first_name', message: 'Please enter a first name' },
    ];
    $.each(inputsToValidate, function (index, value) {
      if (!$('#' + value.id).val()) {
        formIsValid = false;
        if (!$('#' + value.id).siblings('.form-error').length) {
          $('<div class="form-error">' + value.message + '</div>').insertAfter('#' + value.id);
        }
        $('#' + value.id).trigger('focus');
      } else {
        $('#' + value.id)
          .siblings('.form-error')
          .remove();
      }
    });
  } else {
    //Must be a Hire/Sales enquiry
    var inputsToValidate = [
      { id: 'postcode_billing', message: 'Please enter a billing postcode' },
      { id: 'addressline1_billing', message: 'Please enter a billing address' },
      { id: 'email_address', message: 'Please enter an email address' },
      { id: 'phone_number', message: 'Please enter a phone number' },
      { id: 'last_name', message: 'Please enter a last name' },
      { id: 'first_name', message: 'Please enter a first name' },
    ];
    $.each(inputsToValidate, function (index, value) {
      if (!$('#' + value.id).val()) {
        formIsValid = false;
        $('#search_address_billing').hide();
        $('#billing-address').css({ 'display': 'flex', 'margin-top': '0px' });
        if (!$('#' + value.id).siblings('.form-error').length) {
          $('<div class="form-error">' + value.message + '</div>').insertAfter('#' + value.id);
        }
        $('#' + value.id).trigger('focus');
        initSmoothScrolling('#' + value.id);
      } else {
        $('#' + value.id)
          .siblings('.form-error')
          .remove();
      }
    });

    //Validate that a selection has been made for "Are you hiring or purchasing for a company?"
    if (
      checkboxIsChecked($('#is_a_company-YES')) === false &&
      checkboxIsChecked($('#is_a_company-NO')) === false
    ) {
      //No selection has been made for these radio buttons
      formIsValid = false;
      if (!$('#is_a_company-YES').closest('.button-row').siblings('.form-error').length) {
        $('<div class="form-error">Please select one of these options</div>').insertAfter($('#is_a_company-YES').closest('.button-row'));
      }
      initSmoothScrolling('#is_a_company_section');
      //$('input[for="is_a_company-YES"]').trigger('focus');
    } else {
      $('#is_a_company-YES').closest('.button-row').siblings('.form-error').remove();
    }

    //Check if the delivery address is the same as the billling address
    if (formIsValid) {
      if (checkboxIsChecked($('#same_delivery_address')) === true) {
        //Copy all the billing address details to the delivery address fields
        $('#company_name_delivery').val($('#company_name_billing').val());
        $('#addressline1_delivery').val($('#addressline1_billing').val());
        $('#addressline2_delivery').val($('#addressline2_billing').val());
        $('#addressline3_delivery').val($('#addressline3_billing').val());
        $('#county_delivery').val($('#county_billing').val());
        $('#posttown_delivery').val($('#posttown_billing').val());
        $('#postcode_delivery').val($('#postcode_billing').val());
      } else {
        //Validate that the first line and postcode have a value
        var inputsToValidate = [
          { id: 'postcode_delivery', message: 'Please enter a delivery postcode' },
          { id: 'addressline1_delivery', message: 'Please enter a delivery address' },
        ];
        $.each(inputsToValidate, function (index, value) {
          if (!$('#' + value.id).val()) {
            formIsValid = false;
            $('#search_address_delivery').hide();
            $('#delivery-address-show-hide').removeClass('hidden');
            $('#delivery-address')
              .removeClass('hidden')
              .css({ 'display': 'flex', 'margin-top': '0px' });
            if (!$('#' + value.id).siblings('.form-error').length) {
              $('<div class="form-error">' + value.message + '</div>').insertAfter('#' + value.id);
            }
            $('#' + value.id).trigger('focus');
            initSmoothScrolling('#' + value.id);
          } else {
            $('#' + value.id)
              .siblings('.form-error')
              .remove();
          }
        });
      }
    }
  }
  if (formIsValid) {
    //Remove these inputs so their values do not submit with the form
    $(
      'input[name="placed_order"],' +
        'input[name="know_account_num"],' +
        'input[name="vat_registered"],' +
        '#postcoder_search_billing,' +
        '#postcoder_search_delivery,' +
        '.calendar-field,' +
        '.input.counter'
    ).remove();
    //Check if company name has been filled in
    if (!$('#company_name').val()) {
      //Company name has not been filled in. Use first name and last name instead.
      var companyName = $('#first_name').val() + ' ' + $('#last_name').val();
      $('#company_name').val(companyName);
    }
    /* BEGIN ADD ENQUIRY DATA IN TEXTAREAS */
    //Add the enquiry as a hidden textarea to submit it as plaintext with correct linebreak formatting
    if (document.getElementById('enquiry_data').value !== '') {
      var data = JSON.parse(document.getElementById('enquiry_data').value);
      var output = {
        hire: [],
        purchase: []
      };
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var $node = data[i]['billing'];
        var $var = '';
        const lastKey = objectLength(item);
        var step = 0;
        for (var key in item) {
          if (item.hasOwnProperty(key)) {
            if (key !== 'billing') {
              $var += `${key}: ${item[key]}`;
            }
            //Add commas unless on the last item
            if (step > 0 && step !== lastKey - 1) {
              $var += `,\n`;
            }
            step += 1;
          }
        }
        output[$node].push($var);
      }
      //Add Hire items to a textarea
      if (arrayIsEmpty(output['hire']) === false) {
        const textarea = document.createElement('textarea');
        textarea.name = 'Hire items';
        textarea.hidden = true;
        for (var key in output) {
          if (key === 'hire') {
            if (arrayIsEmpty(output[key]) === false) {
              textarea.value += 'Hire items:\n\n';
              for (var i = 0; i < output[key].length; i++) {
                textarea.value += output[key][i];
                if (i < output[key].length - 1) {
                  textarea.value += `\n\n`;
                }
              }
            }
          }
        }
        document.getElementById('wf-form-enquiry').append(textarea);
      }
      //Add purchase items to a textarea
      if (arrayIsEmpty(output['purchase']) === false) {
        const textarea = document.createElement('textarea');
        textarea.name = 'Purchase items';
        textarea.hidden = true;
        for (var key in output) {
          if (key === 'purchase') {
            if (arrayIsEmpty(output[key]) === false) {
              textarea.value += 'Purchase items:\n\n';
              for (var i = 0; i < output[key].length; i++) {
                textarea.value += output[key][i];
                if (i < output[key].length - 1) {
                  textarea.value += `\n\n`;
                }
              }
            }
          }
        }
        document.getElementById('wf-form-enquiry').append(textarea);
      }
    } else {
      document.getElementById('enquiry_data').remove();
      console.log('Removed enquiry input');
    }
    /* END ADD ENQUIRY DATA IN TEXTAREAS */
    //Clear the stored enquiry
    let enquiryArr = [];
    localStorage.setItem('enquiry', JSON.stringify(enquiryArr));
    //Clear the stored dates
    let defaultDates = [];
    localStorage.setItem('selectedDates', JSON.stringify(defaultDates));
    //Reset the enquiry button status
    setEnquiryButton('get-a-quote');
    //Set the form name so that it submits to the correct table in the Webflow Dashboard
    selectedReason = selectedReason.replace('/', ' or ');
    $('#wf-form-enquiry').attr('data-name', selectedReason).attr('aria-label', selectedReason);
    console.log(selectedReason);
    alert('This form is valid... apparently');
    return false;
    //SUBMIT
    //return true;
  }
  alert('This form is not valid');
  //STOP SUBMIT
  //Focus has already been done by the validation
  return false;
});

$('#manual-address-billing').on('click', function (e) {
  e.preventDefault();
  $('#search_address_billing').hide();
  $('#billing-address').css({ 'display': 'flex', 'margin-top': '0px' });
});

$('#manual-address-delivery').on('click', function (e) {
  e.preventDefault();
  $('#search_address_delivery').hide();
  $('#delivery-address').css({ 'display': 'flex', 'margin-top': '0px' });
});

function containerConversionsAndSelfStorage(_setReason, _reason) {
  //$('#postcode_billing,#addressline1_billing').removeAttr('required');
  $('#tab-group,#address,#items-show-hide').addClass('hidden');
  $(
    '#reason-for-enquiry-show-hide,' +
    '#upload-file-show-hide'
  ).removeClass('hidden');
  $('#label-is-a-company').html('Are you enquiring on behalf of a company?*');
  $('#label-notes').html('Your project requirements');
  $('#notes').attr('placeholder', 'Please provide a brief summary of your project to discuss.');
  if (_setReason === true) {
    if (_reason === 'ContainerConversions') {
      $('#reason_for_enquiry').val('Container Conversions');
    } else {
      $('#reason_for_enquiry').val('Self Storage');
    }
  }
}
function generalEnquiry(_setReason) {
  $('#enquiry-title').html('Get in touch');
  //$('#postcode_billing,#addressline1_billing').removeAttr('required');
  $('#tab-group,#address,#upload-file-show-hide,#items-show-hide').addClass('hidden');
  $('#reason-for-enquiry-show-hide').removeClass('hidden');
  $('#label-is-a-company').html('Are you enquiring on behalf of a company?*');
  $('#label-notes').html('Question/Query');
  $('#notes').attr('placeholder', 'Please provide a brief summary of your project to discuss.');
  if (_setReason === true) {
    $('#reason_for_enquiry').val('General Enquiry');
  }
}
function hireSales(_setReason) {
  //$('#postcode_billing,#addressline1_billing').attr('required','');
  $('#upload-file-show-hide').addClass('hidden');
  $(
    '#tab-group,' +
      '#placed-order-show-hide,' +
      '#know-account-num-show-hide,' +
      '#vat-registered-show-hide,' +
      '#address,' +
      '#items-show-hide'
  ).removeClass('hidden');
  $('#label-is-a-company').html('Are you hiring or purchasing for a company?*');
  $('#label-notes').html('Questions/Queries');
  $('#notes').attr(
    'placeholder',
    'Enter any additional information relevant to your enquiry or questions you may have about hiring/purchasing with us.'
  );
  if (_setReason === true) {
    $('#reason_for_enquiry').val('New Hire/Sales Quote');
  }
}

$('#reason_for_enquiry').on('change', function () {
  if ($(this).val() === 'Container Conversions' || $(this).val() === 'Self Storage') {
    containerConversionsAndSelfStorage();
    if ($(this).val() === 'Container Conversions') {
      replaceQueryInURL('reason', 'ContainerConversions');
    } else {
      replaceQueryInURL('reason', 'SelfStorage');
    }
  } else if ($(this).val() === 'General Enquiry') {
    generalEnquiry();
    replaceQueryInURL('reason', 'GeneralEnquiry');
  } else {
    hireSales();
    replaceQueryInURL('reason', 'NewHireSalesQuote');
  }
});

(function () {
  var url = window.location.href;
  var arr = url.split('?');
  //console.log(arr);
  //Check if URL already has at least one query which is not either empty, a category, a tag or an author
  if (arr.length > 1 && arr[1] !== '') {
    //console.log('Found at least one query');
    const sliceUrl = new Map(
      location.search
        .slice(1)
        .split('&')
        .map((kv) => kv.split('='))
    );
    if (sliceUrl.has('reason') === true) {
      var reason = sliceUrl.get('reason');
      if (reason === 'ContainerConversions' || reason === 'SelfStorage') {
        if (reason === 'ContainerConversions') {
          containerConversionsAndSelfStorage(true, 'ContainerConversions');
        } else {
          containerConversionsAndSelfStorage(true, 'SelfStorage');
        }
      } else if (reason === 'GeneralEnquiry') {
        generalEnquiry(true);
      } else {
        hireSales(true);
        $('#reason-for-enquiry-show-hide').hide();
        //Load the enquiry
        //If there is an enquiry in local storage use that
        if (localStorage.getItem('enquiry')) {
          var enquiryArr = JSON.parse(localStorage.getItem('enquiry'));
          //Check if the enquiry has any data. Change the page title if it does
          if (arrayIsEmpty(enquiryArr) === false) {
            $('#enquiry-title').html('Complete your Enquiry');
            updateEnquiryData();
          }
        }
      }
    }
  } else {
    //console.log('No valid queries');
    hireSales(true);
    //$('#reason-for-enquiry-show-hide').hide();
    //Load the enquiry
    //If there is an enquiry in local storage use that
    if (localStorage.getItem('enquiry')) {
      var enquiryArr = JSON.parse(localStorage.getItem('enquiry'));
      //Check if the enquiry has any data. Change the page title if it does
      if (arrayIsEmpty(enquiryArr) === false) {
        $('#enquiry-title').html('Complete your Enquiry');
        updateEnquiryData();
      }
    }
  }
})();

function replaceQueryInURL(key, value) {
  key = encodeURI(key);
  value = encodeURI(value);
  var kvp = document.location.search.substr(1).split('&');
  var i = kvp.length;
  var x;
  var queryFound = false;
  while ((i -= 1)) {
    x = kvp[i].split('=');
    if (x[0] === key) {
      x[1] = value;
      kvp[i] = x.join('=');
      queryFound = true;
      break;
    }
  }
  if (queryFound === false) {
    kvp[0] = key + '=' + value;
  }
  var updatedQuery = kvp.join('&');
  if (history.replaceState) {
    window.history.replaceState(null, null, window.location.pathname + '?' + updatedQuery);
  }
}

//Smooth scroll to the relevant section
function initSmoothScrolling(_target) {
  //console.log($('#navigation').css('position') === 'static' ? ($('.tab-group').eq(0).outerHeight(false) + 30) * -1 : ($('#navigation').outerHeight(false) + $('.tab-group').eq(0).outerHeight(false) + 30) * -1);
  var duration = 700;
  var pageUrl = location.hash ? stripHash(location.href) : location.href;
  delegatedLinkHijacking();
  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);
    function onClick(e) {
      //console.log(e.target);
      if (!isInPageLink(e.target)) return;
      e.stopPropagation();
      e.preventDefault();
      jump(e.target.hash, {
        duration: duration,
        offset:
          $('#navigation').css('position') === 'static'
            ? ($('.tab-group').eq(0).outerHeight(false) + 30) * -1
            : ($('#navigation').outerHeight(false) +
                $('.tab-group').eq(0).outerHeight(false) +
                30) *
              -1,
        callback: function () {
          setFocus(e.target.hash);
        },
      });
    }
  }
  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' && n.hash.length > 0 && stripHash(n.href) === pageUrl;
  }
  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));
    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }
      //element.focus();
    }
  }
  function jump(target, options) {
    var start = window.pageYOffset,
      opt = {
        duration: options.duration,
        offset: options.offset || 0,
        callback: options.callback,
        easing: options.easing || easeInOutQuad,
      },
      distance =
        typeof target === 'string'
          ? opt.offset + document.querySelector(target).getBoundingClientRect().top
          : target,
      duration = typeof opt.duration === 'function' ? opt.duration(distance) : opt.duration,
      timeStart,
      timeElapsed;
    requestAnimationFrame(function (time) {
      timeStart = time;
      loop(time);
    });
    function loop(time) {
      timeElapsed = time - timeStart;
      window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
      if (timeElapsed < duration) requestAnimationFrame(loop);
      else end();
    }
    function end() {
      window.scrollTo(0, start + distance);
      if (typeof opt.callback === 'function') opt.callback();
    }
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t -= 1;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  }
  if (_target) {
    jump(_target, {
      duration: duration,
      offset:
        $('#navigation').css('position') === 'static'
          ? ($('.tab-group').eq(0).outerHeight(false) + 30) * -1
          : ($('#navigation').outerHeight(false) + $('.tab-group').eq(0).outerHeight(false) + 30) *
            -1,
      callback: function () {
        setFocus(_target);
      },
    });
  }
}
initSmoothScrolling();

/* Postcoder | Postcode Lookup */
class PostcoderAutocomplete {
  constructor(t) {
    (this.config = t), this.init();
  }
  init = () => {
    (this.suggestionendpoint = "https://ws.postcoder.com/pcw/autocomplete/find?apikey=" + this.config.apikey),
      (this.retrieveendpoint = "https://ws.postcoder.com/pcw/autocomplete/retrieve?apikey=" + this.config.apikey),
      (this.cache = []),
      (this.suggestionhierarchy = []),
      (this.suggestions = []),
      (this.searchterm = ""),
      (this.selectedoptiontext = ""),
      (this.pathfilter = ""),
      (this.selectedIndex = -1),
      (this.no_results_message = "No addresses found"),
      (this.inputdelay = 300),
      (this.suggestionlist = document.querySelector(this.config.suggestions)),
      (this.input = document.querySelector(this.config.searchterm)),
      (this.searchwrap = document.querySelector(this.config.searchwrap)),
      this.input.setAttribute("type", "search"),
      this.input.setAttribute("autocomplete", "off"),
      this.input.setAttribute("autocapitalize", "off"),
      this.input.setAttribute("autocorrect", "off"),
      this.input.setAttribute("spellcheck", "false"),
      this.input.addEventListener("input", this.handleInput),
      this.input.addEventListener("focus", this.handleFocus),
      this.input.addEventListener("keydown", this.handleKeyDown),
      this.suggestionlist.addEventListener("click", this.handleSuggestionClick),
      document.body.addEventListener("click", this.handleDocumentClick),
      (this.addresslines = 0);
    for (let t = 1; t <= 4; t++) "" !== this.config["addressline" + t] && this.addresslines++;
  };
  getSuggestions = (t) => {
    if (((this.searchterm = encodeURIComponent(this.input.value.trim())), this.searchterm.length < 3)) return void this.hideSuggestions();
    let e = this.suggestionendpoint + "&country=" + this.getCountry() + "&query=" + this.searchterm + "&identifier=" + this.config.identifier;
    this.pathfilter ? (e += "&pathfilter=" + this.pathfilter) : (this.selectedoptiontext = this.searchterm);
    let s = this.cache.findIndex((t) => t.url === e);
    s >= 0
      ? ((this.suggestions = this.cache[s].suggestions), this.addSuggestionHierarchy(s), this.showSuggestions())
      : fetch(e)
          .then((t) => {
            if (!t.ok) throw t;
            return t.json();
          })
          .then((t) => {
            (this.suggestions = t), this.addCache(e), this.addSuggestionHierarchy(this.cache.length - 1), this.showSuggestions();
          })
          .catch((t) => {
            "function" == typeof t.text
              ? t.text().then((e) => {
                  console.log("Postcoder request error " + t.status + " : " + e);
                })
              : console.log(t);
          });
  };
  addCache = (t) => {
    let e = {};
    (e.url = t), (e.suggestions = this.suggestions), (e.label = this.selectedoptiontext), this.cache.push(e);
  };
  newSuggestionsReset = () => {
    this.hideSuggestions(), (this.pathfilter = ""), (this.suggestionlist.scrollTop = 0), (this.selectedIndex = -1);
  };
  suggestionsHierarchyReset = () => {
    this.suggestionhierarchy = [];
  };
  addSuggestionHierarchy = (t) => {
    this.suggestionhierarchy.push(t);
  };
  handleSuggestionClick = (t) => {
    t.stopPropagation();
    let e = t.target;
    for (; "li" !== e.tagName.toLowerCase(); ) e = e.parentNode;
    this.selectSuggestion(e);
  };
  selectSuggestion = (t) => {
    (this.selectedoptiontext = t.innerHTML),
      "CACHE" == t.getAttribute("data-type")
        ? ((this.suggestions = this.cache[t.getAttribute("data-id")].suggestions), this.suggestionhierarchy.pop(), this.showSuggestions())
        : "ADD" == t.getAttribute("data-type")
        ? this.retrieve(t.getAttribute("data-id"))
        : ((this.pathfilter = t.getAttribute("data-id")), this.getSuggestions());
  };
  retrieve = (t) => {
    var e = this.retrieveendpoint + "&country=" + this.getCountry() + "&query=" + this.searchterm + "&id=" + t + "&lines=" + this.addresslines + "&exclude=organisation,country&identifier=" + this.config.identifier;
    fetch(e)
      .then((t) => {
        if (!t.ok) throw t;
        return t.json();
      })
      .then((t) => {
        (this.cache[e] = t[0]), this.processResult(t[0]);
      })
      .catch((t) => {
        "function" == typeof t.text
          ? t.text().then((e) => {
              console.log("Postcoder request error " + t.status + " : " + e);
            })
          : console.log(t);
      });
  };
  showSuggestions = () => {
    if ((this.newSuggestionsReset(), 0 === this.suggestions.length)) {
      let t = document.createElement("li");
      (t.innerHTML = this.no_results_message), this.suggestionlist.appendChild(t);
    } else {
      if (this.suggestionhierarchy.length > 1) {
        let t = this.suggestionhierarchy[this.suggestionhierarchy.length - 2],
          e = document.createElement("li");
        e.classList.add("header"), (e.innerHTML = '<i class="arrow left"></i> ' + unescape(this.cache[t].label)), e.setAttribute("data-id", t), e.setAttribute("data-type", "CACHE"), this.suggestionlist.appendChild(e);
      }
      for (let t = 0; t < this.suggestions.length; t++) {
        let e = document.createElement("li"),
          s = this.suggestions[t].summaryline + ' <span class="location">' + this.suggestions[t].locationsummary + "</span>";
        if (this.suggestions[t].count > 1) {
          s += ' <span class="count">(' + (this.suggestions[t].count > 100 ? "100+" : this.suggestions[t].count) + " addresses)</span>";
        }
        (e.innerHTML = s), e.setAttribute("data-id", this.suggestions[t].id), e.setAttribute("data-type", this.suggestions[t].type), this.suggestionlist.appendChild(e);
      }
    }
  };
  getCountry = () => (void 0 !== this.config.countrycode && "" !== this.config.countrycode ? this.config.countrycode : document.querySelector(this.config.country).value);
  processResult = (t) => {
    this.hideSuggestions(),
    (this.searchwrap.style.display = "none");
    var e = this.config.searchterm.indexOf('billing') > -1 ? document.getElementById("billing-address") : document.getElementById("delivery-address");
    (e.style.display = "flex"), (e.style.marginTop = 0);
    let s = ["organisation", "addressline1", "addressline2", "addressline3", "addressline4", "posttown", "county", "postcode"];
    for (let e = 0; e < s.length; e++) {
      let i = this.config[s[e]];
      void 0 !== i && "" !== i && (document.querySelector(i).value = void 0 !== t[s[e]] ? t[s[e]] : "");
      console.log('i', i);
      console.log('t[s[e]]', t[s[e]]);
      if ($('input[name="is_a_company"]').val() === 'YES') {
        if (i === '#company_name_billing' || i === '#company_name_delivery') {
          $('#company-name-billing-show-hide, #company-name-delivery-show-hide').removeClass(
            'hidden'
          );
        }
      }
    }
  };
  handleDocumentClick = (t) => {
    this.suggestionlist.contains(t.target) || this.input.contains(t.target) || this.hideSuggestions();
  };
  hideSuggestions = () => {
    this.suggestionlist.innerHTML = "";
  };
  handleKeyDown = (t) => {
    const { key: e } = t;
    switch (e) {
      case "Up":
      case "Down":
      case "ArrowUp":
      case "ArrowDown": {
        const s = "ArrowUp" === e || "Up" === e ? this.selectedIndex - 1 : this.selectedIndex + 1;
        t.preventDefault(), this.handleArrows(s);
        break;
      }
      case "Tab":
        this.handleTab(t);
        break;
      case "Enter":
        this.selectSuggestion(this.suggestionlist.querySelectorAll("li")[this.selectedIndex]);
        break;
      case "Esc":
      case "Escape":
        this.hideSuggestions(), this.setValue();
        break;
      default:
        return;
    }
  };
  handleArrows = (t) => {
    let e = this.suggestions.length;
    this.suggestionhierarchy.length > 1 && e++,
      this.suggestionlist.querySelectorAll("li").length > 0 &&
        (this.selectedIndex >= 0 && this.suggestionlist.querySelectorAll("li")[this.selectedIndex].classList.remove("selected"),
        (this.selectedIndex = ((t % e) + e) % e),
        this.suggestionlist.querySelectorAll("li")[this.selectedIndex].classList.add("selected"),
        this.suggestionlist.querySelectorAll("li")[this.selectedIndex].scrollIntoView(!1));
  };
  handleTab = (t) => {
    this.selectedIndex >= 0 ? (t.preventDefault(), this.selectSuggestion(this.suggestionlist.querySelectorAll("li")[this.selectedIndex])) : this.hideSuggestions();
  };
  handleInput = () => {
    this.suggestionsHierarchyReset(), clearTimeout(this.debounce), (this.debounce = setTimeout(() => this.getSuggestions(), this.inputdelay));
  };
  handleFocus = () => {
    this.suggestions.length > 0 ? this.showSuggestions() : this.getSuggestions();
  };
}

//Billing Address Lookup
new PostcoderAutocomplete({
  apikey: 'PCWEU-XDJ5U-HQZHX-92AZF',
  identifier: 'willbox_enquiry_billing_address', //Track API usage in the Postcoder account
  searchterm: '#postcoder_search_billing', // query selector of the searchterm input field
  suggestions: '#suggestion_list_billing', // query selector for preview datalist
  searchwrap: '#search_address_billing', // query selector for the wrapper which will hide the autosearch field when selecting a suggested address
  country: '', // Country select list; leave blank if not using a country select list
  countrycode: 'uk', // Hard code if not using a country select list; leave blank otherwise
  organisation: '#company_name_billing', // Leave blank if form does not have a separate organisation field
  addressline1: '#addressline1_billing',
  addressline2: '#addressline2_billing', // Leave blank if form does not have an addressline2
  addressline3: '#addressline3_billing', // Leave blank if form does not have an addressline3
  //addressline4: '',  // Leave blank if form does not have an addressline4
  county: '#county_billing', // Leave blank if form does not have a county
  posttown: '#posttown_billing',
  postcode: '#postcode_billing',
});

//Delivery Address Lookup
new PostcoderAutocomplete({
  apikey: 'PCWEU-XDJ5U-HQZHX-92AZF',
  identifier: 'willbox_enquiry_delivery_address', //Track API usage in the Postcoder account
  searchterm: '#postcoder_search_delivery', // query selector of the searchterm input field
  suggestions: '#suggestion_list_delivery', // query selector for preview datalist
  searchwrap: '#search_address_delivery', // query selector for the wrapper which will hide the autosearch field when selecting a suggested address
  country: '', // Country select list; leave blank if not using a country select list
  countrycode: 'uk', // Hard code if not using a country select list; leave blank otherwise
  organisation: '#company_name_delivery', // Leave blank if form does not have a separate organisation field
  addressline1: '#addressline1_delivery',
  addressline2: '#addressline2_delivery', // Leave blank if form does not have an addressline2
  addressline3: '#addressline3_delivery', // Leave blank if form does not have an addressline3
  //addressline4: '',  // Leave blank if form does not have an addressline4
  county: '#county_delivery', // Leave blank if form does not have a county
  posttown: '#posttown_delivery',
  postcode: '#postcode_delivery',
});
