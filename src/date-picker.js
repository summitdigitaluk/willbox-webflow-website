import {
  arrayIsEmpty,
  dateObjectToUkDate,
  isDate,
  updateEnquiryData,
  oneDayInSeconds,
  minHirePeriodInDays,
  datePickerTemplate,
} from '$utils/helper-functions';

import './datepicker.js';

//Set default dates for the date picker (not applicable for the enquiry form)
var defaultDates = [];
if (localStorage.getItem('selectedDates')) {
  var storedDates = JSON.parse(localStorage.getItem('selectedDates'));
  const theArrayIsNotEmpty = arrayIsEmpty(storedDates) === false;
  if (theArrayIsNotEmpty) {
    defaultDates = storedDates;
  }
}
function setDefaultDates(_startDate, _endDate) {
  //Set the defaultDates
  defaultDates = [_startDate, _endDate];
  localStorage.setItem('selectedDates', JSON.stringify(defaultDates));
  //When on the enquiry page, update the enquiry with new dates
  if ($('#enquiry_data').length) {
    updateEnquiryData(true);
  }
}
//Set default options for the date picker
$.fn.datepicker.setDefaults({
  format: 'dd-mm-yyyy',
  language: 'en-GB',
  autoHide: true, //Hide picker as soon as a date is selected
  startDate: new Date(), //Make sure user can't select a date in the past
  pick: function (e) {
    //Do this when you choose a date
    //Only run when on the day view
    if (e.view === 'day') {
      var $this = $(this);
      var id = $this.attr('id');
      //var index = $this.attr('data-index');
      if (id === 'hire-start') {
        //Get the start date and end date values to compare
        var startDate = e.date;
        var startDateEpoch = e.date.getTime();
        var minEndDate = new Date(startDateEpoch + (oneDayInSeconds * minHirePeriodInDays));
        var endDateInput = $('#hire-end');
        var endDate = endDateInput.datepicker('getDate');
        //console.log('startDate',startDate);
        //console.log('endDate',endDate);
        //Disable end date picker dates a minimum number of hire days after the "new" start date
        endDateInput.datepicker('setStartDate', minEndDate);
        if (isDate(endDate)) {
          //End date has already been set
          //If the start date is less than the minimum hire period from the end date, clear the end date and open the datepicker
          if (startDate >= new Date(endDate.getTime() - (oneDayInSeconds * minHirePeriodInDays))) {
            endDateInput.datepicker('setDate', minEndDate);
            endDateInput.datepicker('show');
            setDefaultDates(startDate, minEndDate);
          } else {
            setDefaultDates(startDate, endDate);
          }
        } else {
          //Assume no date selected
          endDateInput.datepicker('setDate', minEndDate);
          endDateInput.datepicker('show');
          setDefaultDates(startDate, minEndDate);
        }
      } else if (id === 'hire-end') {
        //Get the start date and end date values to compare
        var startDateInput = $('#hire-start');
        //If the start date is after the end date, alert the user
        //First check if a start date has been selected
        if (startDateInput.val() !== '') {
          var endDate = e.date;
          var startDate = startDateInput.datepicker('getDate');
          //console.log('endDate', endDate);
          //console.log('startDate', startDate);
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
          setDefaultDates(startDate, endDate);
        } else {
          startDateInput.datepicker('show');
        }
      }
    }
  },
});

//Set default dates for the date picker
const thereAreDefaultDates = arrayIsEmpty(defaultDates) === false;
if (thereAreDefaultDates) {
  $('#hire-start')
    .datepicker({
      date: new Date(defaultDates[0]),
      template: datePickerTemplate('Select a start date'),
    })
    .val(dateObjectToUkDate(defaultDates[0]))
    .attr('readonly', '');
  $('#hire-end')
    .datepicker({
      date: new Date(defaultDates[1]),
      template: datePickerTemplate('Select an end date'),
    })
    .val(dateObjectToUkDate(defaultDates[1]))
    .attr('readonly', '');
} else {
  $('#hire-start')
    .datepicker({
      template: datePickerTemplate('Select a start date'),
    })
    .attr('readonly', '');
  $('#hire-end')
    .datepicker({
      startDate: new Date(new Date().getTime() + (oneDayInSeconds * minHirePeriodInDays)), //Make sure user can't select a date less than 4 weeks from today
      template: datePickerTemplate('Select an end date'),
    })
    .attr('readonly', '');
}
