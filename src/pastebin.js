
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

function loadJsFiles(arr) {
  const files = arr;
  //Load JS files from CDN when on https://willbox.summit-digital.co.uk or https://www.willbox.co.uk and locally when not
  var count = 0;
  function getScriptsInOrder(_index) {
    var index = _index ? _index : 0;
    if (files[index]['condition']() === true) {
      if (files[index]['ignoreOnMobile'] === true && deviceIsMobile()) {
        files[index]['fail']();
      } else {
        $.ajax({
          type: 'GET',
          url:
            files[index]['source'].indexOf('//') > -1 //File is an externally hosted script
              ? files[index]['source']
              : //File is not external so get from jsDelivr or localhost
              isDevSite() //webflow.io
              ? 'http://localhost:3000/' + files[index]['source']
              : 'https://cdn.jsdelivr.net/gh/summitdigitaluk/willbox-webflow-website@1.0.7/dist/' +
                files[index]['source'],
          dataType: 'script',
          cache: isDevSite() ? false : true,
        })
          .done(function (script, textStatus) {
            //console.log('textStatus', textStatus);
            if (files[index]['success'] !== null) files[index]['success']();
            count += 1;
            if (count < files.length) {
              getScriptsInOrder(count);
            }
          })
          .fail(function (jqxhr, settings, exception) {
            files[index]['fail']();
          });
      }
    }
  }
  getScriptsInOrder();
}












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







function arrayIsEmpty(arr) {
  if (!Array.isArray(arr) || !arr.length) {
    // Array does not exist, is not an array, or is empty
    return true;
  }
  return false;
}
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
]);*/










//Stop Mega Nav closing when right clicking a link or button in the Mega Nav
//This code was abandoned
var keepMegaNavOpen = false;
document.addEventListener('contextmenu', function(event) {
  if(
    event.target.className.indexOf('mega-nav-link') > -1 ||
    event.target.className.indexOf('w-button') > -1
  ) {
    keepMegaNavOpen = true;
  }
});
$('.mega-nav-button').on('mouseenter',function(){
  $(this).addClass('active');
  keepMegaNavOpen = false;
});
$('.mega-nav-button').on('mouseleave',function(){
  if(keepMegaNavOpen === false) {
    $(this).removeClass('active');
  }
});
