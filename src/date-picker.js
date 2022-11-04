import { arrayIsEmpty, dateObjectToUkDate, isDate, updateEnquiryData, oneDayInSeconds, minHirePeriodInDays, datePickerTemplate } from '$utils/helper-functions';
/*!
 * Datepicker v1.0.10
 * https://fengyuanchen.github.io/datepicker
 *
 * Copyright 2014-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2020-09-29T14:46:10.983Z
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).jQuery)}(this,(function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}t=t&&t.hasOwnProperty("default")?t.default:t;var a={autoShow:!1,autoHide:!1,autoPick:!1,inline:!1,container:null,trigger:null,language:"",format:"mm/dd/yyyy",date:null,startDate:null,endDate:null,startView:0,weekStart:0,yearFirst:!1,yearSuffix:"",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],itemTag:"li",mutedClass:"muted",pickedClass:"picked",disabledClass:"disabled",highlightedClass:"highlighted",template:'<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',offset:10,zIndex:1e3,filter:null,show:null,hide:null,pick:null},s="undefined"!=typeof window,n=s?window:{},r=!!s&&"ontouchstart"in n.document.documentElement,h="datepicker",o="click.".concat(h),l="focus.".concat(h),c="hide.".concat(h),d="keyup.".concat(h),u="pick.".concat(h),p="resize.".concat(h),f="scroll.".concat(h),g="show.".concat(h),y="touchstart.".concat(h),v="".concat(h,"-hide"),m={},w=0,k=1,D=2,b=Object.prototype.toString;function C(t){return"string"==typeof t}var $=Number.isNaN||n.isNaN;function x(t){return"number"==typeof t&&!$(t)}function F(t){return void 0===t}function M(t){return"date"===(e=t,b.call(e).slice(8,-1).toLowerCase())&&!$(t.getTime());var e}function Y(t,e){for(var i=arguments.length,a=new Array(i>2?i-2:0),s=2;s<i;s++)a[s-2]=arguments[s];return function(){for(var i=arguments.length,s=new Array(i),n=0;n<i;n++)s[n]=arguments[n];return t.apply(e,a.concat(s))}}function V(t){return'[data-view="'.concat(t,'"]')}function T(t){return t%4==0&&t%100!=0||t%400==0}function I(t,e){return[31,T(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function S(t,e,i){return Math.min(i,I(t,e))}var P=/(y|m|d)+/g;function N(e){var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=t(e),s=a.css("position"),n="absolute"===s,r=i?/auto|scroll|hidden/:/auto|scroll/,h=a.parents().filter((function(e,i){var a=t(i);return(!n||"static"!==a.css("position"))&&r.test(a.css("overflow")+a.css("overflow-y")+a.css("overflow-x"))})).eq(0);return"fixed"!==s&&h.length?h:t(e.ownerDocument||document)}function j(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=String(Math.abs(t)),a=i.length,s="";for(t<0&&(s+="-");a<e;)a+=1,s+="0";return s+i}var q=/\d+/g,A={show:function(){this.built||this.build(),this.shown||this.trigger(g).isDefaultPrevented()||(this.shown=!0,this.$picker.removeClass(v).on(o,t.proxy(this.click,this)),this.showView(this.options.startView),this.inline||(this.$scrollParent.on(f,t.proxy(this.place,this)),t(window).on(p,this.onResize=Y(this.place,this)),t(document).on(o,this.onGlobalClick=Y(this.globalClick,this)),t(document).on(d,this.onGlobalKeyup=Y(this.globalKeyup,this)),r&&t(document).on(y,this.onTouchStart=Y(this.touchstart,this)),this.place()))},hide:function(){this.shown&&(this.trigger(c).isDefaultPrevented()||(this.shown=!1,this.$picker.addClass(v).off(o,this.click),this.inline||(this.$scrollParent.off(f,this.place),t(window).off(p,this.onResize),t(document).off(o,this.onGlobalClick),t(document).off(d,this.onGlobalKeyup),r&&t(document).off(y,this.onTouchStart))))},toggle:function(){this.shown?this.hide():this.show()},update:function(){var t=this.getValue();t!==this.oldValue&&(this.setDate(t,!0),this.oldValue=t)},pick:function(t){var e=this.$element,i=this.date;this.trigger(u,{view:t||"",date:i}).isDefaultPrevented()||(i=this.formatDate(this.date),this.setValue(i),this.isInput&&(e.trigger("input"),e.trigger("change")))},reset:function(){this.setDate(this.initialDate,!0),this.setValue(this.initialValue),this.shown&&this.showView(this.options.startView)},getMonthName:function(e,i){var a=this.options,s=a.monthsShort,n=a.months;return t.isNumeric(e)?e=Number(e):F(i)&&(i=e),!0===i&&(n=s),n[x(e)?e:this.date.getMonth()]},getDayName:function(e,i,a){var s=this.options,n=s.days;return t.isNumeric(e)?e=Number(e):(F(a)&&(a=i),F(i)&&(i=e)),a?n=s.daysMin:i&&(n=s.daysShort),n[x(e)?e:this.date.getDay()]},getDate:function(t){var e=this.date;return t?this.formatDate(e):new Date(e)},setDate:function(e,i){var a=this.options.filter;if(M(e)||C(e)){if(e=this.parseDate(e),t.isFunction(a)&&!1===a.call(this.$element,e,"day"))return;this.date=e,this.viewDate=new Date(e),i||this.pick(),this.built&&this.render()}},setStartDate:function(t){M(t)||C(t)?this.startDate=this.parseDate(t):this.startDate=null,this.built&&this.render()},setEndDate:function(t){M(t)||C(t)?this.endDate=this.parseDate(t):this.endDate=null,this.built&&this.render()},parseDate:function(e){var i=this.format,a=[];return M(e)||(C(e)&&(a=e.match(q)||[]),M(e=e?new Date(e):new Date)||(e=new Date),a.length===i.parts.length&&(t.each(a,(function(t,a){var s=parseInt(a,10);switch(i.parts[t]){case"yy":e.setFullYear(2e3+s);break;case"yyyy":e.setFullYear(2===a.length?2e3+s:s);break;case"mm":case"m":e.setMonth(s-1)}})),t.each(a,(function(t,a){var s=parseInt(a,10);switch(i.parts[t]){case"dd":case"d":e.setDate(s)}})))),new Date(e.getFullYear(),e.getMonth(),e.getDate())},formatDate:function(e){var i=this.format,a="";if(M(e)){var s=e.getFullYear(),n=e.getMonth(),r=e.getDate(),h={d:r,dd:j(r,2),m:n+1,mm:j(n+1,2),yy:String(s).substring(2),yyyy:j(s,4)};a=i.source,t.each(i.parts,(function(t,e){a=a.replace(e,h[e])}))}return a},destroy:function(){this.unbind(),this.unbuild(),this.$element.removeData(h)}},O={click:function(e){var i=t(e.target),a=this.options,s=this.date,n=this.viewDate,r=this.format;if(e.stopPropagation(),e.preventDefault(),!i.hasClass("disabled")){var h=i.data("view"),o=n.getFullYear(),l=n.getMonth(),c=n.getDate();switch(h){case"years prev":case"years next":o="years prev"===h?o-10:o+10,n.setFullYear(o),n.setDate(S(o,l,c)),this.renderYears();break;case"year prev":case"year next":o="year prev"===h?o-1:o+1,n.setFullYear(o),n.setDate(S(o,l,c)),this.renderMonths();break;case"year current":r.hasYear&&this.showView(D);break;case"year picked":r.hasMonth?this.showView(k):(i.siblings(".".concat(a.pickedClass)).removeClass(a.pickedClass).data("view","year"),this.hideView()),this.pick("year");break;case"year":o=parseInt(i.text(),10),s.setDate(S(o,l,c)),s.setFullYear(o),n.setDate(S(o,l,c)),n.setFullYear(o),r.hasMonth?this.showView(k):(i.addClass(a.pickedClass).data("view","year picked").siblings(".".concat(a.pickedClass)).removeClass(a.pickedClass).data("view","year"),this.hideView()),this.pick("year");break;case"month prev":case"month next":(l="month prev"===h?l-1:l+1)<0?(o-=1,l+=12):l>11&&(o+=1,l-=12),n.setFullYear(o),n.setDate(S(o,l,c)),n.setMonth(l),this.renderDays();break;case"month current":r.hasMonth&&this.showView(k);break;case"month picked":r.hasDay?this.showView(w):(i.siblings(".".concat(a.pickedClass)).removeClass(a.pickedClass).data("view","month"),this.hideView()),this.pick("month");break;case"month":l=t.inArray(i.text(),a.monthsShort),s.setFullYear(o),s.setDate(S(o,l,c)),s.setMonth(l),n.setFullYear(o),n.setDate(S(o,l,c)),n.setMonth(l),r.hasDay?this.showView(w):(i.addClass(a.pickedClass).data("view","month picked").siblings(".".concat(a.pickedClass)).removeClass(a.pickedClass).data("view","month"),this.hideView()),this.pick("month");break;case"day prev":case"day next":case"day":"day prev"===h?l-=1:"day next"===h&&(l+=1),c=parseInt(i.text(),10),s.setDate(1),s.setFullYear(o),s.setMonth(l),s.setDate(c),n.setDate(1),n.setFullYear(o),n.setMonth(l),n.setDate(c),this.renderDays(),"day"===h&&this.hideView(),this.pick("day");break;case"day picked":this.hideView(),this.pick("day")}}},globalClick:function(t){for(var e=t.target,i=this.element,a=this.$trigger[0],s=!0;e!==document;){if(e===a||e===i){s=!1;break}e=e.parentNode}s&&this.hide()},keyup:function(){this.update()},globalKeyup:function(t){var e=t.target,i=t.key,a=t.keyCode;this.isInput&&e!==this.element&&this.shown&&("Tab"===i||9===a)&&this.hide()},touchstart:function(e){var i=e.target;this.isInput&&i!==this.element&&!t.contains(this.$picker[0],i)&&(this.hide(),this.element.blur())}},W={render:function(){this.renderYears(),this.renderMonths(),this.renderDays()},renderWeek:function(){var e=this,i=[],a=this.options,s=a.weekStart,n=a.daysMin;s=parseInt(s,10)%7,n=n.slice(s).concat(n.slice(0,s)),t.each(n,(function(t,a){i.push(e.createItem({text:a}))})),this.$week.html(i.join(""))},renderYears:function(){var t,e=this.options,i=this.startDate,a=this.endDate,s=e.disabledClass,n=e.filter,r=e.yearSuffix,h=this.viewDate.getFullYear(),o=(new Date).getFullYear(),l=this.date.getFullYear(),c=[],d=!1,u=!1;for(t=-5;t<=6;t+=1){var p=new Date(h+t,1,1),f=!1;i&&(f=p.getFullYear()<i.getFullYear(),-5===t&&(d=f)),!f&&a&&(f=p.getFullYear()>a.getFullYear(),6===t&&(u=f)),!f&&n&&(f=!1===n.call(this.$element,p,"year"));var g=h+t===l,y=g?"year picked":"year";c.push(this.createItem({picked:g,disabled:f,text:h+t,view:f?"year disabled":y,highlighted:p.getFullYear()===o}))}this.$yearsPrev.toggleClass(s,d),this.$yearsNext.toggleClass(s,u),this.$yearsCurrent.toggleClass(s,!0).html("".concat(h+-5+r," - ").concat(h+6).concat(r)),this.$years.html(c.join(""))},renderMonths:function(){var e,i=this.options,a=this.startDate,s=this.endDate,n=this.viewDate,r=i.disabledClass||"",h=i.monthsShort,o=t.isFunction(i.filter)&&i.filter,l=n.getFullYear(),c=new Date,d=c.getFullYear(),u=c.getMonth(),p=this.date.getFullYear(),f=this.date.getMonth(),g=[],y=!1,v=!1;for(e=0;e<=11;e+=1){var m=new Date(l,e,1),w=!1;a&&(w=(y=m.getFullYear()===a.getFullYear())&&m.getMonth()<a.getMonth()),!w&&s&&(w=(v=m.getFullYear()===s.getFullYear())&&m.getMonth()>s.getMonth()),!w&&o&&(w=!1===o.call(this.$element,m,"month"));var k=l===p&&e===f,D=k?"month picked":"month";g.push(this.createItem({disabled:w,picked:k,highlighted:l===d&&m.getMonth()===u,index:e,text:h[e],view:w?"month disabled":D}))}this.$yearPrev.toggleClass(r,y),this.$yearNext.toggleClass(r,v),this.$yearCurrent.toggleClass(r,y&&v).html(l+i.yearSuffix||""),this.$months.html(g.join(""))},renderDays:function(){var t,e,i,a=this.$element,s=this.options,n=this.startDate,r=this.endDate,h=this.viewDate,o=this.date,l=s.disabledClass,c=s.filter,d=s.months,u=s.weekStart,p=s.yearSuffix,f=h.getFullYear(),g=h.getMonth(),y=new Date,v=y.getFullYear(),m=y.getMonth(),w=y.getDate(),k=o.getFullYear(),D=o.getMonth(),b=o.getDate(),C=[],$=f,x=g,F=!1;0===g?($-=1,x=11):x-=1,t=I($,x);var M=new Date(f,g,1);for((i=M.getDay()-parseInt(u,10)%7)<=0&&(i+=7),n&&(F=M.getTime()<=n.getTime()),e=t-(i-1);e<=t;e+=1){var Y=new Date($,x,e),V=!1;n&&(V=Y.getTime()<n.getTime()),!V&&c&&(V=!1===c.call(a,Y,"day")),C.push(this.createItem({disabled:V,highlighted:$===v&&x===m&&Y.getDate()===w,muted:!0,picked:$===k&&x===D&&e===b,text:e,view:"day prev"}))}var T=[],S=f,P=g,N=!1;11===g?(S+=1,P=0):P+=1,t=I(f,g),i=42-(C.length+t);var j=new Date(f,g,t);for(r&&(N=j.getTime()>=r.getTime()),e=1;e<=i;e+=1){var q=new Date(S,P,e),A=S===k&&P===D&&e===b,O=!1;r&&(O=q.getTime()>r.getTime()),!O&&c&&(O=!1===c.call(a,q,"day")),T.push(this.createItem({disabled:O,picked:A,highlighted:S===v&&P===m&&q.getDate()===w,muted:!0,text:e,view:"day next"}))}var W=[];for(e=1;e<=t;e+=1){var z=new Date(f,g,e),J=!1;n&&(J=z.getTime()<n.getTime()),!J&&r&&(J=z.getTime()>r.getTime()),!J&&c&&(J=!1===c.call(a,z,"day"));var E=f===k&&g===D&&e===b,G=E?"day picked":"day";W.push(this.createItem({disabled:J,picked:E,highlighted:f===v&&g===m&&z.getDate()===w,text:e,view:J?"day disabled":G}))}this.$monthPrev.toggleClass(l,F),this.$monthNext.toggleClass(l,N),this.$monthCurrent.toggleClass(l,F&&N).html(s.yearFirst?"".concat(f+p," ").concat(d[g]):"".concat(d[g]," ").concat(f).concat(p)),this.$days.html(C.join("")+W.join("")+T.join(""))}},z="".concat(h,"-top-left"),J="".concat(h,"-top-right"),E="".concat(h,"-bottom-left"),G="".concat(h,"-bottom-right"),H=[z,J,E,G].join(" "),K=function(){function s(i){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e(this,s),this.$element=t(i),this.element=i,this.options=t.extend({},a,m[n.language],t.isPlainObject(n)&&n),this.$scrollParent=N(i,!0),this.built=!1,this.shown=!1,this.isInput=!1,this.inline=!1,this.initialValue="",this.initialDate=null,this.startDate=null,this.endDate=null,this.init()}var n,r,p;return n=s,r=[{key:"init",value:function(){var e=this.$element,i=this.options,a=i.startDate,s=i.endDate,n=i.date;this.$trigger=t(i.trigger),this.isInput=e.is("input")||e.is("textarea"),this.inline=i.inline&&(i.container||!this.isInput),this.format=function(e){var i=String(e).toLowerCase(),a=i.match(P);if(!a||0===a.length)throw new Error("Invalid date format.");return e={source:i,parts:a},t.each(a,(function(t,i){switch(i){case"dd":case"d":e.hasDay=!0;break;case"mm":case"m":e.hasMonth=!0;break;case"yyyy":case"yy":e.hasYear=!0}})),e}(i.format);var r=this.getValue();this.initialValue=r,this.oldValue=r,n=this.parseDate(n||r),a&&(a=this.parseDate(a),n.getTime()<a.getTime()&&(n=new Date(a)),this.startDate=a),s&&(s=this.parseDate(s),a&&s.getTime()<a.getTime()&&(s=new Date(a)),n.getTime()>s.getTime()&&(n=new Date(s)),this.endDate=s),this.date=n,this.viewDate=new Date(n),this.initialDate=new Date(this.date),this.bind(),(i.autoShow||this.inline)&&this.show(),i.autoPick&&this.pick()}},{key:"build",value:function(){if(!this.built){this.built=!0;var e=this.$element,i=this.options,a=t(i.template);this.$picker=a,this.$week=a.find(V("week")),this.$yearsPicker=a.find(V("years picker")),this.$yearsPrev=a.find(V("years prev")),this.$yearsNext=a.find(V("years next")),this.$yearsCurrent=a.find(V("years current")),this.$years=a.find(V("years")),this.$monthsPicker=a.find(V("months picker")),this.$yearPrev=a.find(V("year prev")),this.$yearNext=a.find(V("year next")),this.$yearCurrent=a.find(V("year current")),this.$months=a.find(V("months")),this.$daysPicker=a.find(V("days picker")),this.$monthPrev=a.find(V("month prev")),this.$monthNext=a.find(V("month next")),this.$monthCurrent=a.find(V("month current")),this.$days=a.find(V("days")),this.inline?t(i.container||e).append(a.addClass("".concat(h,"-inline"))):(t(document.body).append(a.addClass("".concat(h,"-dropdown"))),a.addClass(v).css({zIndex:parseInt(i.zIndex,10)})),this.renderWeek()}}},{key:"unbuild",value:function(){this.built&&(this.built=!1,this.$picker.remove())}},{key:"bind",value:function(){var e=this.options,i=this.$element;t.isFunction(e.show)&&i.on(g,e.show),t.isFunction(e.hide)&&i.on(c,e.hide),t.isFunction(e.pick)&&i.on(u,e.pick),this.isInput&&i.on(d,t.proxy(this.keyup,this)),this.inline||(e.trigger?this.$trigger.on(o,t.proxy(this.toggle,this)):this.isInput?i.on(l,t.proxy(this.show,this)):i.on(o,t.proxy(this.show,this)))}},{key:"unbind",value:function(){var e=this.$element,i=this.options;t.isFunction(i.show)&&e.off(g,i.show),t.isFunction(i.hide)&&e.off(c,i.hide),t.isFunction(i.pick)&&e.off(u,i.pick),this.isInput&&e.off(d,this.keyup),this.inline||(i.trigger?this.$trigger.off(o,this.toggle):this.isInput?e.off(l,this.show):e.off(o,this.show))}},{key:"showView",value:function(t){var e=this.$yearsPicker,i=this.$monthsPicker,a=this.$daysPicker,s=this.format;if(s.hasYear||s.hasMonth||s.hasDay)switch(Number(t)){case D:i.addClass(v),a.addClass(v),s.hasYear?(this.renderYears(),e.removeClass(v),this.place()):this.showView(w);break;case k:e.addClass(v),a.addClass(v),s.hasMonth?(this.renderMonths(),i.removeClass(v),this.place()):this.showView(D);break;default:e.addClass(v),i.addClass(v),s.hasDay?(this.renderDays(),a.removeClass(v),this.place()):this.showView(k)}}},{key:"hideView",value:function(){!this.inline&&this.options.autoHide&&this.hide()}},{key:"place",value:function(){if(!this.inline){var e=this.$element,i=this.options,a=this.$picker,s=t(document).outerWidth(),n=t(document).outerHeight(),r=e.outerWidth(),h=e.outerHeight(),o=a.width(),l=a.height(),c=e.offset(),d=c.left,u=c.top,p=parseFloat(i.offset),f=z;$(p)&&(p=10),u>l&&u+h+l>n?(u-=l+p,f=E):u+=h+p,d+o>s&&(d+=r-o,f=f.replace("left","right")),a.removeClass(H).addClass(f).css({top:u,left:d})}}},{key:"trigger",value:function(e,i){var a=t.Event(e,i);return this.$element.trigger(a),a}},{key:"createItem",value:function(e){var i=this.options,a=i.itemTag,s={text:"",view:"",muted:!1,picked:!1,disabled:!1,highlighted:!1},n=[];return t.extend(s,e),s.muted&&n.push(i.mutedClass),s.highlighted&&n.push(i.highlightedClass),s.picked&&n.push(i.pickedClass),s.disabled&&n.push(i.disabledClass),"<".concat(a,' class="').concat(n.join(" "),'" data-view="').concat(s.view,'">').concat(s.text,"</").concat(a,">")}},{key:"getValue",value:function(){var t=this.$element;return this.isInput?t.val():t.text()}},{key:"setValue",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=this.$element;this.isInput?e.val(t):this.inline&&!this.options.container||e.text(t)}}],p=[{key:"setDefaults",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.extend(a,m[e.language],t.isPlainObject(e)&&e)}}],r&&i(n.prototype,r),p&&i(n,p),s}();if(t.extend&&t.extend(K.prototype,W,O,A),t.fn){var L=t.fn.datepicker;t.fn.datepicker=function(e){for(var i=arguments.length,a=new Array(i>1?i-1:0),s=1;s<i;s++)a[s-1]=arguments[s];var n;return this.each((function(i,s){var r=t(s),o="destroy"===e,l=r.data(h);if(!l){if(o)return;var c=t.extend({},r.data(),t.isPlainObject(e)&&e);l=new K(s,c),r.data(h,l)}if(C(e)){var d=l[e];t.isFunction(d)&&(n=d.apply(l,a),o&&r.removeData(h))}})),F(n)?this:n},t.fn.datepicker.Constructor=K,t.fn.datepicker.languages=m,t.fn.datepicker.setDefaults=K.setDefaults,t.fn.datepicker.noConflict=function(){return t.fn.datepicker=L,this}}}));

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
