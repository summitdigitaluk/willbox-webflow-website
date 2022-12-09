const isDevSite = () => {
  return window.location.origin.indexOf('webflow.io') > -1 ? true : false;
};

const deviceIsMobile = () => {
  if (
    /Mobile|Tablet|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  }
  return false;
};

function loadFiles(_options) {
  if (!_options.hasOwnProperty('files')) {
    console.log('Please format loadFiles() options correctly');
    return;
  }
  let count = 0;
  const cdnUrl = 'https://cdn.jsdelivr.net/gh/summitdigitaluk/willbox-webflow-website@1.0.11/dist/';
  const files = _options['files'];

  //Check which options have been specified
  const globalScrollTrigger = _options.hasOwnProperty('globalScrollTrigger') ? _options['globalScrollTrigger'] : false;
  const globalScrollTriggerRootMargin = _options.hasOwnProperty('globalScrollTriggerRootMargin') ? _options['globalScrollTriggerRootMargin'] : false;

  window.Webflow ||= [];
  window.Webflow.push(() => {
    //Load JS files from CDN when on staging site or live site and locally when not
    function getScriptsInOrder(_index) {
      const getNextFile = () => {
        count += 1;
        if (count < files.length) {
          getScriptsInOrder(count);
        }
      };

      let index = _index ? _index : 0;
      let file = files[index];
      const url = file.hasOwnProperty('url') ? file['url'] : false;
      const elementMustExist = file.hasOwnProperty('elementMustExist') ? file['elementMustExist'] : false;
      const elementExists = elementMustExist !== false ? ($(elementMustExist).length > 0 ? true : false) : true;
      const scrollTrigger = file.hasOwnProperty('scrollTrigger') ? file['scrollTrigger'] : false;
      const scrollTriggerRootMargin = file.hasOwnProperty('scrollTriggerRootMargin') ? file['scrollTriggerRootMargin'] : false;
      const ignoreOnMobile = file.hasOwnProperty('ignoreOnMobile') ? file['ignoreOnMobile'] : false;
      let loader = file.hasOwnProperty('loader') ? file['loader'] : false;
      const success = file.hasOwnProperty('success') ? file['success'] : false;
      const fail = file.hasOwnProperty('fail') ? file['fail'] : false;

      if (url !== false) {
        const fileUrl = () => {
          if (url.indexOf('//') > -1) {
            //File is externally hosted
            return url;
          }
          //File is not external so get from jsDelivr or localhost
          if (isDevSite()) {
            //webflow.io
            return 'http://localhost:3000/' + url;
          }
          //Must be on live or staging site
          return cdnUrl + url;
        };
        if (url.slice(-4).indexOf('.css') > -1) {
          let linkEle = document.createElement('link');
          linkEle.href = fileUrl();
          linkEle.rel = 'stylesheet';
          linkEle.type = 'text/css';
          document.body.appendChild(linkEle);
          getNextFile();
        } else {
          if (elementMustExist === false || elementExists === true) {
            if (loader !== false && elementExists === true) {
              loader = true;
              $(elementMustExist).addClass('loading');
            }
            if (ignoreOnMobile === true && deviceIsMobile()) {
              if (fail !== false) fail();
              getNextFile();
            } else {
              if (globalScrollTrigger !== false || scrollTrigger !== false) {
                let observerScrollTrigger =
                  globalScrollTrigger !== false
                    ? document.querySelectorAll(globalScrollTrigger)
                    : document.querySelectorAll(scrollTrigger);
                let config = {
                  rootMargin:
                    globalScrollTriggerRootMargin !== false
                      ? globalScrollTriggerRootMargin
                      : scrollTriggerRootMargin !== false
                      ? scrollTriggerRootMargin
                      : '0px 0px 50px 0px',
                  threshold: 0,
                };
                let observer = new IntersectionObserver(function (entries, self) {
                  entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                      $.ajax({
                        type: 'GET',
                        url: fileUrl(),
                        dataType: 'script',
                        cache: isDevSite() ? false : true,
                      })
                        .done(function (script, textStatus) {
                          self.unobserve(entry.target);
                          if (loader === true) {
                            $(elementMustExist).removeClass('loading');
                          }
                          if (success !== false) success();
                          if (globalScrollTrigger !== false) {
                            getNextFile();
                          }
                        })
                        .fail(function (jqxhr, settings, exception) {
                          if (fail !== false) fail();
                          if (globalScrollTrigger !== false) {
                            getNextFile();
                          }
                        });
                    }
                  });
                }, config);
                observerScrollTrigger.forEach(function (ele) {
                  observer.observe(ele);
                });
                getNextFile();
              } else {
                $.ajax({
                  type: 'GET',
                  url: fileUrl(),
                  dataType: 'script',
                  cache: isDevSite() ? false : true,
                })
                  .done(function (script, textStatus) {
                    if (loader === true) {
                      $(elementMustExist).removeClass('loading');
                    }
                    if (success !== false) success();
                    getNextFile();
                  })
                  .fail(function (jqxhr, settings, exception) {
                    if (fail !== false) fail();
                    getNextFile();
                  });
              }
            }
          } else {
            getNextFile();
          }
        }
      } else {
        getNextFile();
      }
    }
    getScriptsInOrder();
  });
}

loadFiles({
  files: [
    {
      url: 'main.js',
    },
    {
      url: 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsslider@1/cmsslider.js',
      elementMustExist: '.slider-testimonials',
      scrollTrigger: '.slider-testimonials',
      success: () => {
        setTimeout(function () {
          $(window).trigger('resize');
        }, 100);
      },
    },
    {
      url: 'https://apps.elfsight.com/p/platform.js',
      elementMustExist: '#elfsight-google-reviews',
      scrollTrigger: '#elfsight-google-reviews',
      scrollTriggerRootMargin: '50% 0px 0px 0px',
      ignoreOnMobile: true,
      loader: true,
      fail: () => {
        $('#elfsight-google-reviews').remove();
      },
    },
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',
      elementMustExist: '#accreditations',
      scrollTrigger: '#accreditations',
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
  ],
});
