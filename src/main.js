import { arrayIsEmpty, setEnquiryButton } from '$utils/helper-functions';

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

window.addEventListener('load', () => {
  if (/Mobile|Tablet|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //console.log('Mobile device detected. Do not download ElfSight');
    $('#elfsight-google-reviews').remove();
  } else {
    //console.log('Non-mobile device detected. Download ElfSight');
    $.getScript('https://apps.elfsight.com/p/platform.js')
      .done(function (script, textStatus) {
        //console.log(textStatus);
      })
      .fail(function (jqxhr, settings, exception) {
        $('#elfsight-google-reviews').remove();
      });
  }
});
