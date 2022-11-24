//Create select field from an array of strings
export const createSelectFromArray = (arr, id, insert_after_id) => {
  //Delete existing select field so we don't keep duplicating
  $('.select-wrapper--' + id).remove();
  var d = document.createElement('div');
  d.classList.add('select-wrapper', 'select-wrapper--' + id);
  //Select list
  var s = document.createElement('select');
  s.id = id;
  s.name = id;
  s.classList.add('form-select', 'w-select');
  for (let i = 0; i < arr.length; i++) {
    var o = document.createElement('option');
    o.text = arr[i];
    o.value = arr[i];
    s.add(o);
  }
  //Select Icon
  var i = document.createElement('div');
  i.classList.add('select-icon');
  $(d)
    .prepend(s)
    .append(i)
    .insertAfter('#' + insert_after_id);
};

export const objectIsEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      //There is a least one key value pair in the object
      return false;
    }
  }
  return true;
};

export const objectLength = (object) => {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
};

export const arrayIsEmpty = (arr) => {
  if (!Array.isArray(arr) || !arr.length) {
    // Array does not exist, is not an array, or is empty
    return true;
  }
  return false;
};

export const isDate = (dateObj) => {
  if (
    dateObj instanceof Date &&
    Object.prototype.toString.call(dateObj) === '[object Date]' &&
    !isNaN(dateObj.getTime())
  ) {
    return true;
  }
  return false;
};
export const addLeadingZero = (i) => {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
};

export const ukDateToUniversalDate = (str) => {
  //Input date must be a string formatted dd-mm-yyyy
  var arr = str.split('');
  var universalDateFormat =
    arr[6] +
    '' +
    arr[7] +
    '' +
    arr[8] +
    '' +
    arr[9] +
    '-' +
    arr[3] +
    '' +
    arr[4] +
    '-' +
    arr[0] +
    '' +
    arr[1];
  //Return string with format yyyy-mm-dd
  return universalDateFormat;
};

export const dateObjectToUniversalDate = (dateObj, includeHyphens) => {
  var date = new Date(dateObj);
  var year = date.getFullYear();
  var month = addLeadingZero(date.getMonth() + 1);
  var day = date.getDate();
  if (includeHyphens) {
    return year + '-' + month + '-' + day;
  }
  return year + '' + month + '' + day;
};

export const dateObjectToUkDate = (dateObj) => {
  if (isDate(dateObj)) {
    return dateObj.toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
  }
  //Assume date is string
  var date = new Date(dateObj);
  return date.toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
};

//Move items around in an object
export const moveItemsInObject = (from, to) => {
  this.splice(to, 0, this.splice(from, 1)[0]);
  return this;
};

export const checkboxIsChecked = ($jQueryObj) => {
  if ($jQueryObj.prop('checked') === true || $jQueryObj.is(':checked')) {
    return true;
  }
  return false;
};

export const updateEnquiryData = (sameDates) => {
  var enquiryArr = JSON.parse(localStorage.getItem('enquiry'));
  const thereAreEnquiryItems = arrayIsEmpty(enquiryArr) === false;
  if (thereAreEnquiryItems) {
    var _tidyArr = [];
    //Loop through the enquiry data and create a clean version to submit in the hidden field
    for (var i = 0; i < enquiryArr.length; i++) {
      var item = enquiryArr[i];
      var newItem = {};
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          if (key === 'billing' || key === 'name' || key === 'variant' || key === 'qty') {
            newItem[key] = item[key];
          } else if (key === 'selectedDates') {
            //Check to see if the "same hire period" checkbox is selected
            if (sameDates === true) {
              var selectedDatesArr = JSON.parse(localStorage.getItem('selectedDates'));
              const thereAreSelectedDatesStored = arrayIsEmpty(selectedDatesArr) === false;
              if (thereAreSelectedDatesStored) {
                $.each(selectedDatesArr, function (index, value) {
                  var date = new Date(value);
                  if (isDate(date)) {
                    var year = date.getFullYear();
                    var month = addLeadingZero(date.getMonth() + 1);
                    var day = addLeadingZero(date.getDate());
                    index === 0
                      ? newItem['hireStart'] = day + '-' + month + '-' + year
                      : newItem['hireEnd'] = day + '-' + month + '-' + year;
                  }
                });
              }
            } else {
              if (!arrayIsEmpty(item[key])) {
                var selectedDatesArr = item[key];
                $.each(selectedDatesArr, function (index, value) {
                  var date = new Date(value);
                  if (isDate(date)) {
                    var year = date.getFullYear();
                    var month = addLeadingZero(date.getMonth() + 1);
                    var day = addLeadingZero(date.getDate());
                    index === 0
                      ? newItem['hireStart'] = day + '-' + month + '-' + year
                      : newItem['hireEnd'] = day + '-' + month + '-' + year;
                  }
                });
              }
            }
          }
        }
      }
      _tidyArr.push(newItem);
    }
    $('#enquiry_data').val(JSON.stringify(_tidyArr));
  } else {
    $('#enquiry_data').val('');
  }
};

export const oneDayInSeconds = 24 * 60 * 60 * 1000;
export const minHirePeriodInDays = 28;

//Change the button in the navigation to say 'Complete Enquiry' when the page loads
export const setEnquiryButton = (_class) => {
  if (_class === 'complete-enquiry') {
    var enquiryArr = JSON.parse(localStorage.getItem('enquiry'));
    var total = 0;
    //Get total qty of items in the enquiry
    for (let i = 0; i < enquiryArr.length; i++) {
      //console.log(enquiryArr[i]['qty']);
      total += parseInt(enquiryArr[i]['qty']);
    }
    $('[data-enquiry="total"]').text(total);
    $('[data-enquiry="get-a-quote"]').attr(
      'href',
      '/complete-your-enquiry?reason=NewHireSalesQuote'
    );
  } else {
    $('[data-enquiry="get-a-quote"]').attr('href', '/complete-your-enquiry');
  }
  $('[data-enquiry="get-a-quote"] .' + _class)
    .show()
    .siblings()
    .hide();
};

export const datePickerTemplate = (str) => {
  var template =
    '<div class="datepicker-container">' +
      '<div class="datepicker-title">' + str + '</div>' +
      '<div class="datepicker-panel" data-view="years picker">' +
        '<ul>' +
          '<li data-view="years prev">&lsaquo;</li>' +
          '<li data-view="years current"></li>' +
          '<li data-view="years next">&rsaquo;</li>' +
        '</ul>' +
        '<ul data-view="years"></ul>' +
      '</div>' +
      '<div class="datepicker-panel" data-view="months picker">' +
        '<ul>' +
          '<li data-view="year prev">&lsaquo;</li>' +
          '<li data-view="year current"></li>' +
          '<li data-view="year next">&rsaquo;</li>' +
        '</ul>' +
        '<ul data-view="months"></ul>' +
      '</div>' +
      '<div class="datepicker-panel" data-view="days picker">' +
        '<ul>' +
          '<li data-view="month prev">&lsaquo;</li>' +
          '<li data-view="month current"></li>' +
          '<li data-view="month next">&rsaquo;</li>' +
        '</ul>' +
        '<ul data-view="week"></ul>' +
        '<ul data-view="days"></ul>' +
      '</div>' +
    '</div>';
  return template;
};

export const isDevSite = () => {
  return window.location.origin.indexOf('webflow.io') > -1 ? true : false;
};

export const deviceIsMobile = () => {
  if (
    /Mobile|Tablet|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  }
  return false;
};
