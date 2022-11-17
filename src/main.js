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



//Flag specific files to only load on desktop
//Flag which files should or should not be cached
//Add possibility for callbacks
//Detect which domain currently on and serve the local files if on webflow.io. Ignore if external.
/*
Example array
[{
  source: 'fileName.js',
  cache: true,
  ignoreOnMobile: true,
  success: example(),
  fail: anotherExample(),
}]
*/

/*$.ajax({
  type: "GET",
  url: url,
  success: callback,
  dataType: "script",
  cache: true
});*/

function loadJsFiles(arr) {
  const files = arr;
  //Load JS files from CDN when on https://willbox.summit-digital.co.uk or https://www.willbox.co.uk and locally when not
  const isDevSite = () => { return window.location.origin.indexOf('webflow.io') > -1 ? true : false };
  let localFiles = [];
  let externalFiles = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i]['source'].indexOf('//') > -1) {
      //Is an external script
      externalFiles.push(files[i]);
    }
    else {
      //Not an external script. Load from CDN or localhost
      localFiles.push(files[i]);
    }
    
    /*$.each(files[i], function(index,value) {   
      item = value.split('=');
      if (item[0] == key) {
        console.log('index '+index+' is '+key);
        // Starting at current index position, remove one element
        kvp.splice(index,1);
        // Break loop
        return false;
      }
    });*/




    /*if(files[i].slice(-3).indexOf('.js') > -1) {
      var src = origin === 'external'
      	? 'https://cdn.jsdelivr.net/gh/summitdigitaluk/willbox-webflow-website@1.0.3/dist/'
      	  + files[i]
          //+ '?v='
          //+ ms
      	: 'http://localhost:3000/' + files[i];
      jsFiles.push(src);
    }*/
  }
  //console.log('localFiles',localFiles);
  //console.log('externalFiles',externalFiles);
  
  if (arrayIsEmpty(localFiles) === false) {
    var count = 0;
    function getScriptsInOrder(_index) {
      var index = _index ? _index : 0;
      /*$.getScript(jsFiles[index]).done(function(script,textStatus) {
        count += 1;
        if (count < jsFiles.length) {
          getScriptsInOrder(count);
        }
      });*/
      if (
        /Mobile|Tablet|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        localFiles[index]['fail'];
      } else {
        $.ajax({
          type: 'GET',
          url: isDevSite
            ? 'https://cdn.jsdelivr.net/gh/summitdigitaluk/willbox-webflow-website@1.0.6/dist/' + localFiles[index]['source']
            : 'http://localhost:3000/' + localFiles[index]['source'],
          dataType: 'script',
          cache: isDevSite() ? false : true,
        })
          .done(function (script, textStatus) {
            if (localFiles[index]['success'] !== null) localFiles[index]['success']();
            count += 1;
            if (count < localFiles.length) {
              getScriptsInOrder(count);
            }
          })
          .fail(function (jqxhr, settings, exception) {
            localFiles[index]['fail']();
          });
      }
    }
    getScriptsInOrder();
  }
  if (arrayIsEmpty(externalFiles) === false) {
    var count = 0;
    function getScriptsInOrder(_index) {
      var index = _index ? _index : 0;
      if (
        /Mobile|Tablet|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        externalFiles[index]['fail']();
      } else {
        $.ajax({
          type: 'GET',
          url: externalFiles[index]['source'],
          dataType: 'script',
          cache: isDevSite() ? false : true,
        })
          .done(function (script, textStatus) {
            if (externalFiles[index]['success'] !== null) externalFiles[index]['success']();
            count += 1;
            if (count < externalFiles.length) {
              getScriptsInOrder(count);
            }
          })
          .fail(function (jqxhr, settings, exception) {
            externalFiles[index]['fail']();
          });
      }
    }
    getScriptsInOrder();
  }
}

loadJsFiles([
  {
    source: 'https://apps.elfsight.com/p/platform.js',
    ignoreOnMobile: true,
    success: null,
    fail: () => {
      $('#elfsight-google-reviews').remove();
    },
  },
  {
    source: 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',
    ignoreOnMobile: false,
    success: () => {
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
    },
    fail: () => {
      $('#accreditations').remove();
    },
  },
]);

/*

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



<!-- Start Accreditations Carousel custom code -->
<script defer type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
<script>
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
    autoplaySpeed: 2000
  });
</script>
<!-- End Accreditations Carousel custom code -->



function loadFiles(arr) {
  var files = arr;
  var ms = Date.now();
  //Load files from Summit website when on https://willbox.summit-digital.co.uk
  var origin = window.location.origin.indexOf('summit-digital.co.uk') > -1 ? 'external' : 'local';
  var jsFiles = [];
  for (let i = 0; i < files.length; i++) {
    if(files[i].slice(-3).indexOf('.js') > -1) {
      var src = origin === 'external'
      	? 'https://cdn.jsdelivr.net/gh/summitdigitaluk/willbox-webflow-website@1.0.3/dist/'
      	  + files[i]
          //+ '?v='
          //+ ms
      	: 'http://localhost:3000/' + files[i];
      jsFiles.push(src);
    }
    else if(files[i].slice(-4).indexOf('.css') > -1) {
      var linkEle = document.createElement('link');
      linkEle.href = origin === 'external'
        ? 'https://cdn.jsdelivr.net/gh/summitdigitaluk/willbox-webflow-website@1.0.3/dist/'
          + files[i]
          //+ '?v='
          //+ ms
        : 'http://localhost:3000/' + files[i]; 
      linkEle.rel = 'stylesheet';
      linkEle.type = 'text/css';
      document.head.appendChild(linkEle);
    }
  }
  if (arrayIsEmpty(jsFiles) === false) {
    var count = 0;
    function getScriptsInOrder(_index) {
      var index = _index ? _index : 0;
      $.getScript(jsFiles[index]).done(function(script,textStatus) {
        count++;
        if (count < jsFiles.length) {
          getScriptsInOrder(count);
        }
      });
    }
    getScriptsInOrder();
  }
}
/*loadFiles([
  "main.css"
]);

*/