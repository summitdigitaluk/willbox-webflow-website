"use strict";(()=>{var fe=(i,e,t)=>{$(".select-wrapper--"+e).remove();var a=document.createElement("div");a.classList.add("select-wrapper","select-wrapper--"+e);var r=document.createElement("select");r.id=e,r.name=e,r.classList.add("form-select","w-select");for(let l=0;l<i.length;l++){var n=document.createElement("option");n.text=i[l],n.value=i[l],r.add(n)}var s=document.createElement("div");s.classList.add("select-icon"),$(a).prepend(r).append(s).insertAfter("#"+t)};var b=i=>!Array.isArray(i)||!i.length,E=i=>i instanceof Date&&Object.prototype.toString.call(i)==="[object Date]"&&!isNaN(i.getTime()),R=i=>(i<10&&(i="0"+i),i);var A=(i,e)=>{var t=new Date(i),a=t.getFullYear(),r=R(t.getMonth()+1),n=t.getDate();return e?a+"-"+r+"-"+n:a+""+r+n},ve=i=>{if(E(i))return i.toLocaleString("en-GB",{day:"numeric",month:"numeric",year:"numeric"});var e=new Date(i);return e.toLocaleString("en-GB",{day:"numeric",month:"numeric",year:"numeric"})};var Ye=i=>{var e=JSON.parse(localStorage.getItem("enquiry"));if(b(e)===!1){for(var a=[],r=0;r<e.length;r++){var n=e[r],s={};for(var l in n)if(n.hasOwnProperty(l)){if(l==="billing"||l==="name"||l==="variant"||l==="qty")s[l]=n[l];else if(l==="selectedDates"){if(i===!0){var o=JSON.parse(localStorage.getItem("selectedDates"));b(o)===!1&&$.each(o,function(h,p){var d=new Date(p);if(E(d)){var u=d.getFullYear(),g=R(d.getMonth()+1),f=R(d.getDate());h===0?s.hireStart=f+"-"+g+"-"+u:s.hireEnd=f+"-"+g+"-"+u}})}else if(!b(n[l])){var o=n[l];$.each(o,function(h,p){var d=new Date(p);if(E(d)){var u=d.getFullYear(),g=R(d.getMonth()+1),f=R(d.getDate());h===0?s.hireStart=f+"-"+g+"-"+u:s.hireEnd=f+"-"+g+"-"+u}})}}}a.push(s)}$("#enquiry_data").val(JSON.stringify(a))}else $("#enquiry_data").val("")};var Ae=i=>{if(i==="complete-enquiry"){var e=JSON.parse(localStorage.getItem("enquiry")),t=0;for(let a=0;a<e.length;a++)t+=parseInt(e[a].qty);$('[data-enquiry="total"]').text(t),$('[data-enquiry="get-a-quote"]').attr("href","/complete-your-enquiry?reason=NewHireSalesQuote")}else $('[data-enquiry="get-a-quote"]').attr("href","/complete-your-enquiry");$('[data-enquiry="get-a-quote"] .'+i).show().siblings().hide()},W=i=>{var e='<div class="datepicker-container"><div class="datepicker-title">'+i+'</div><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>';return e};$=$&&$.hasOwnProperty("default")?$.default:$;function Xe(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")}function Pe(i,e){for(var t=0;t<e.length;t++){var a=e[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,a.key,a)}}function et(i,e,t){return e&&Pe(i.prototype,e),t&&Pe(i,t),i}var Oe={autoShow:!1,autoHide:!1,autoPick:!1,inline:!1,container:null,trigger:null,language:"",format:"mm/dd/yyyy",date:null,startDate:null,endDate:null,startView:0,weekStart:0,yearFirst:!1,yearSuffix:"",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],itemTag:"li",mutedClass:"muted",pickedClass:"picked",disabledClass:"disabled",highlightedClass:"highlighted",template:'<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',offset:10,zIndex:1e3,filter:null,show:null,hide:null,pick:null},We=typeof window!="undefined",Ge=We?window:{},Fe=We?"ontouchstart"in Ge.document.documentElement:!1,D="datepicker",M="click.".concat(D),Ve="focus.".concat(D),ge="hide.".concat(D),te="keyup.".concat(D),me="pick.".concat(D),Le="resize.".concat(D),Be="scroll.".concat(D),ye="show.".concat(D),He="touchstart.".concat(D),x="".concat(D,"-hide"),we={},q={DAYS:0,MONTHS:1,YEARS:2},tt=Object.prototype.toString;function at(i){return tt.call(i).slice(8,-1).toLowerCase()}function G(i){return typeof i=="string"}var De=Number.isNaN||Ge.isNaN;function Je(i){return typeof i=="number"&&!De(i)}function X(i){return typeof i=="undefined"}function L(i){return at(i)==="date"&&!De(i.getTime())}function Q(i,e){for(var t=arguments.length,a=new Array(t>2?t-2:0),r=2;r<t;r++)a[r-2]=arguments[r];return function(){for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return i.apply(e,a.concat(s))}}function S(i){return'[data-view="'.concat(i,'"]')}function it(i){return i%4===0&&i%100!==0||i%400===0}function $e(i,e){return[31,it(i)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function P(i,e,t){return Math.min(t,$e(i,e))}var rt=/(y|m|d)+/g;function nt(i){var e=String(i).toLowerCase(),t=e.match(rt);if(!t||t.length===0)throw new Error("Invalid date format.");return i={source:e,parts:t},$.each(t,function(a,r){switch(r){case"dd":case"d":i.hasDay=!0;break;case"mm":case"m":i.hasMonth=!0;break;case"yyyy":case"yy":i.hasYear=!0;break}}),i}function st(i){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,t=$(i),a=t.css("position"),r=a==="absolute",n=e?/auto|scroll|hidden/:/auto|scroll/,s=t.parents().filter(function(l,o){var c=$(o);return r&&c.css("position")==="static"?!1:n.test(c.css("overflow")+c.css("overflow-y")+c.css("overflow-x"))}).eq(0);return a==="fixed"||!s.length?$(i.ownerDocument||document):s}function pe(i){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1,t=String(Math.abs(i)),a=t.length,r="";for(i<0&&(r+="-");a<e;)a+=1,r+="0";return r+t}var ot=/\d+/g,lt={show:function(){this.built||this.build(),!this.shown&&(this.trigger(ye).isDefaultPrevented()||(this.shown=!0,this.$picker.removeClass(x).on(M,$.proxy(this.click,this)),this.showView(this.options.startView),this.inline||(this.$scrollParent.on(Be,$.proxy(this.place,this)),$(window).on(Le,this.onResize=Q(this.place,this)),$(document).on(M,this.onGlobalClick=Q(this.globalClick,this)),$(document).on(te,this.onGlobalKeyup=Q(this.globalKeyup,this)),Fe&&$(document).on(He,this.onTouchStart=Q(this.touchstart,this)),this.place())))},hide:function(){!this.shown||this.trigger(ge).isDefaultPrevented()||(this.shown=!1,this.$picker.addClass(x).off(M,this.click),this.inline||(this.$scrollParent.off(Be,this.place),$(window).off(Le,this.onResize),$(document).off(M,this.onGlobalClick),$(document).off(te,this.onGlobalKeyup),Fe&&$(document).off(He,this.onTouchStart)))},toggle:function(){this.shown?this.hide():this.show()},update:function(){var e=this.getValue();e!==this.oldValue&&(this.setDate(e,!0),this.oldValue=e)},pick:function(e){var t=this.$element,a=this.date;this.trigger(me,{view:e||"",date:a}).isDefaultPrevented()||(a=this.formatDate(this.date),this.setValue(a),this.isInput&&(t.trigger("input"),t.trigger("change")))},reset:function(){this.setDate(this.initialDate,!0),this.setValue(this.initialValue),this.shown&&this.showView(this.options.startView)},getMonthName:function(e,t){var a=this.options,r=a.monthsShort,n=a.months;return $.isNumeric(e)?e=Number(e):X(t)&&(t=e),t===!0&&(n=r),n[Je(e)?e:this.date.getMonth()]},getDayName:function(e,t,a){var r=this.options,n=r.days;return $.isNumeric(e)?e=Number(e):(X(a)&&(a=t),X(t)&&(t=e)),a?n=r.daysMin:t&&(n=r.daysShort),n[Je(e)?e:this.date.getDay()]},getDate:function(e){var t=this.date;return e?this.formatDate(t):new Date(t)},setDate:function(e,t){var a=this.options.filter;if(L(e)||G(e)){if(e=this.parseDate(e),$.isFunction(a)&&a.call(this.$element,e,"day")===!1)return;this.date=e,this.viewDate=new Date(e),t||this.pick(),this.built&&this.render()}},setStartDate:function(e){L(e)||G(e)?this.startDate=this.parseDate(e):this.startDate=null,this.built&&this.render()},setEndDate:function(e){L(e)||G(e)?this.endDate=this.parseDate(e):this.endDate=null,this.built&&this.render()},parseDate:function(e){var t=this.format,a=[];return L(e)||(G(e)&&(a=e.match(ot)||[]),e=e?new Date(e):new Date,L(e)||(e=new Date),a.length===t.parts.length&&($.each(a,function(r,n){var s=parseInt(n,10);switch(t.parts[r]){case"yy":e.setFullYear(2e3+s);break;case"yyyy":e.setFullYear(n.length===2?2e3+s:s);break;case"mm":case"m":e.setMonth(s-1);break}}),$.each(a,function(r,n){var s=parseInt(n,10);switch(t.parts[r]){case"dd":case"d":e.setDate(s);break}}))),new Date(e.getFullYear(),e.getMonth(),e.getDate())},formatDate:function(e){var t=this.format,a="";if(L(e)){var r=e.getFullYear(),n=e.getMonth(),s=e.getDate(),l={d:s,dd:pe(s,2),m:n+1,mm:pe(n+1,2),yy:String(r).substring(2),yyyy:pe(r,4)};a=t.source,$.each(t.parts,function(o,c){a=a.replace(c,l[c])})}return a},destroy:function(){this.unbind(),this.unbuild(),this.$element.removeData(D)}},ct={click:function(e){var t=$(e.target),a=this.options,r=this.date,n=this.viewDate,s=this.format;if(e.stopPropagation(),e.preventDefault(),!t.hasClass("disabled")){var l=t.data("view"),o=n.getFullYear(),c=n.getMonth(),h=n.getDate();switch(l){case"years prev":case"years next":{o=l==="years prev"?o-10:o+10,n.setFullYear(o),n.setDate(P(o,c,h)),this.renderYears();break}case"year prev":case"year next":o=l==="year prev"?o-1:o+1,n.setFullYear(o),n.setDate(P(o,c,h)),this.renderMonths();break;case"year current":s.hasYear&&this.showView(q.YEARS);break;case"year picked":s.hasMonth?this.showView(q.MONTHS):(t.siblings(".".concat(a.pickedClass)).removeClass(a.pickedClass).data("view","year"),this.hideView()),this.pick("year");break;case"year":o=parseInt(t.text(),10),r.setDate(P(o,c,h)),r.setFullYear(o),n.setDate(P(o,c,h)),n.setFullYear(o),s.hasMonth?this.showView(q.MONTHS):(t.addClass(a.pickedClass).data("view","year picked").siblings(".".concat(a.pickedClass)).removeClass(a.pickedClass).data("view","year"),this.hideView()),this.pick("year");break;case"month prev":case"month next":c=l==="month prev"?c-1:c+1,c<0?(o-=1,c+=12):c>11&&(o+=1,c-=12),n.setFullYear(o),n.setDate(P(o,c,h)),n.setMonth(c),this.renderDays();break;case"month current":s.hasMonth&&this.showView(q.MONTHS);break;case"month picked":s.hasDay?this.showView(q.DAYS):(t.siblings(".".concat(a.pickedClass)).removeClass(a.pickedClass).data("view","month"),this.hideView()),this.pick("month");break;case"month":c=$.inArray(t.text(),a.monthsShort),r.setFullYear(o),r.setDate(P(o,c,h)),r.setMonth(c),n.setFullYear(o),n.setDate(P(o,c,h)),n.setMonth(c),s.hasDay?this.showView(q.DAYS):(t.addClass(a.pickedClass).data("view","month picked").siblings(".".concat(a.pickedClass)).removeClass(a.pickedClass).data("view","month"),this.hideView()),this.pick("month");break;case"day prev":case"day next":case"day":l==="day prev"?c-=1:l==="day next"&&(c+=1),h=parseInt(t.text(),10),r.setDate(1),r.setFullYear(o),r.setMonth(c),r.setDate(h),n.setDate(1),n.setFullYear(o),n.setMonth(c),n.setDate(h),this.renderDays(),l==="day"&&this.hideView(),this.pick("day");break;case"day picked":this.hideView(),this.pick("day");break}}},globalClick:function(e){for(var t=e.target,a=this.element,r=this.$trigger,n=r[0],s=!0;t!==document;){if(t===n||t===a){s=!1;break}t=t.parentNode}s&&this.hide()},keyup:function(){this.update()},globalKeyup:function(e){var t=e.target,a=e.key,r=e.keyCode;this.isInput&&t!==this.element&&this.shown&&(a==="Tab"||r===9)&&this.hide()},touchstart:function(e){var t=e.target;this.isInput&&t!==this.element&&!$.contains(this.$picker[0],t)&&(this.hide(),this.element.blur())}},dt={render:function(){this.renderYears(),this.renderMonths(),this.renderDays()},renderWeek:function(){var e=this,t=[],a=this.options,r=a.weekStart,n=a.daysMin;r=parseInt(r,10)%7,n=n.slice(r).concat(n.slice(0,r)),$.each(n,function(s,l){t.push(e.createItem({text:l}))}),this.$week.html(t.join(""))},renderYears:function(){var e=this.options,t=this.startDate,a=this.endDate,r=e.disabledClass,n=e.filter,s=e.yearSuffix,l=this.viewDate.getFullYear(),o=new Date,c=o.getFullYear(),h=this.date.getFullYear(),p=-5,d=6,u=[],g=!1,f=!1,m;for(m=p;m<=d;m+=1){var y=new Date(l+m,1,1),v=!1;t&&(v=y.getFullYear()<t.getFullYear(),m===p&&(g=v)),!v&&a&&(v=y.getFullYear()>a.getFullYear(),m===d&&(f=v)),!v&&n&&(v=n.call(this.$element,y,"year")===!1);var k=l+m===h,T=k?"year picked":"year";u.push(this.createItem({picked:k,disabled:v,text:l+m,view:v?"year disabled":T,highlighted:y.getFullYear()===c}))}this.$yearsPrev.toggleClass(r,g),this.$yearsNext.toggleClass(r,f),this.$yearsCurrent.toggleClass(r,!0).html("".concat(l+p+s," - ").concat(l+d).concat(s)),this.$years.html(u.join(""))},renderMonths:function(){var e=this.options,t=this.startDate,a=this.endDate,r=this.viewDate,n=e.disabledClass||"",s=e.monthsShort,l=$.isFunction(e.filter)&&e.filter,o=r.getFullYear(),c=new Date,h=c.getFullYear(),p=c.getMonth(),d=this.date.getFullYear(),u=this.date.getMonth(),g=[],f=!1,m=!1,y;for(y=0;y<=11;y+=1){var v=new Date(o,y,1),k=!1;t&&(f=v.getFullYear()===t.getFullYear(),k=f&&v.getMonth()<t.getMonth()),!k&&a&&(m=v.getFullYear()===a.getFullYear(),k=m&&v.getMonth()>a.getMonth()),!k&&l&&(k=l.call(this.$element,v,"month")===!1);var T=o===d&&y===u,C=T?"month picked":"month";g.push(this.createItem({disabled:k,picked:T,highlighted:o===h&&v.getMonth()===p,index:y,text:s[y],view:k?"month disabled":C}))}this.$yearPrev.toggleClass(n,f),this.$yearNext.toggleClass(n,m),this.$yearCurrent.toggleClass(n,f&&m).html(o+e.yearSuffix||""),this.$months.html(g.join(""))},renderDays:function(){var e=this.$element,t=this.options,a=this.startDate,r=this.endDate,n=this.viewDate,s=this.date,l=t.disabledClass,o=t.filter,c=t.months,h=t.weekStart,p=t.yearSuffix,d=n.getFullYear(),u=n.getMonth(),g=new Date,f=g.getFullYear(),m=g.getMonth(),y=g.getDate(),v=s.getFullYear(),k=s.getMonth(),T=s.getDate(),C,w,I,le=[],H=d,V=u,ce=!1;u===0?(H-=1,V=11):V-=1,C=$e(H,V);var Ie=new Date(d,u,1);for(I=Ie.getDay()-parseInt(h,10)%7,I<=0&&(I+=7),a&&(ce=Ie.getTime()<=a.getTime()),w=C-(I-1);w<=C;w+=1){var de=new Date(H,V,w),j=!1;a&&(j=de.getTime()<a.getTime()),!j&&o&&(j=o.call(e,de,"day")===!1),le.push(this.createItem({disabled:j,highlighted:H===f&&V===m&&de.getDate()===y,muted:!0,picked:H===v&&V===k&&w===T,text:w,view:"day prev"}))}var Ee=[],K=d,J=u,ue=!1;u===11?(K+=1,J=0):J+=1,C=$e(d,u),I=42-(le.length+C);var ze=new Date(d,u,C);for(r&&(ue=ze.getTime()>=r.getTime()),w=1;w<=I;w+=1){var he=new Date(K,J,w),Ze=K===v&&J===k&&w===T,z=!1;r&&(z=he.getTime()>r.getTime()),!z&&o&&(z=o.call(e,he,"day")===!1),Ee.push(this.createItem({disabled:z,picked:Ze,highlighted:K===f&&J===m&&he.getDate()===y,muted:!0,text:w,view:"day next"}))}var Me=[];for(w=1;w<=C;w+=1){var Z=new Date(d,u,w),Y=!1;a&&(Y=Z.getTime()<a.getTime()),!Y&&r&&(Y=Z.getTime()>r.getTime()),!Y&&o&&(Y=o.call(e,Z,"day")===!1);var Ne=d===v&&u===k&&w===T,Qe=Ne?"day picked":"day";Me.push(this.createItem({disabled:Y,picked:Ne,highlighted:d===f&&u===m&&Z.getDate()===y,text:w,view:Y?"day disabled":Qe}))}this.$monthPrev.toggleClass(l,ce),this.$monthNext.toggleClass(l,ue),this.$monthCurrent.toggleClass(l,ce&&ue).html(t.yearFirst?"".concat(d+p," ").concat(c[u]):"".concat(c[u]," ").concat(d).concat(p)),this.$days.html(le.join("")+Me.join("")+Ee.join(""))}},_e="".concat(D,"-top-left"),ut="".concat(D,"-top-right"),Ue="".concat(D,"-bottom-left"),ht="".concat(D,"-bottom-right"),ft=[_e,ut,Ue,ht].join(" "),ee=function(){function i(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};Xe(this,i),this.$element=$(e),this.element=e,this.options=$.extend({},Oe,we[t.language],$.isPlainObject(t)&&t),this.$scrollParent=st(e,!0),this.built=!1,this.shown=!1,this.isInput=!1,this.inline=!1,this.initialValue="",this.initialDate=null,this.startDate=null,this.endDate=null,this.init()}return et(i,[{key:"init",value:function(){var t=this.$element,a=this.options,r=a.startDate,n=a.endDate,s=a.date;this.$trigger=$(a.trigger),this.isInput=t.is("input")||t.is("textarea"),this.inline=a.inline&&(a.container||!this.isInput),this.format=nt(a.format);var l=this.getValue();this.initialValue=l,this.oldValue=l,s=this.parseDate(s||l),r&&(r=this.parseDate(r),s.getTime()<r.getTime()&&(s=new Date(r)),this.startDate=r),n&&(n=this.parseDate(n),r&&n.getTime()<r.getTime()&&(n=new Date(r)),s.getTime()>n.getTime()&&(s=new Date(n)),this.endDate=n),this.date=s,this.viewDate=new Date(s),this.initialDate=new Date(this.date),this.bind(),(a.autoShow||this.inline)&&this.show(),a.autoPick&&this.pick()}},{key:"build",value:function(){if(!this.built){this.built=!0;var t=this.$element,a=this.options,r=$(a.template);this.$picker=r,this.$week=r.find(S("week")),this.$yearsPicker=r.find(S("years picker")),this.$yearsPrev=r.find(S("years prev")),this.$yearsNext=r.find(S("years next")),this.$yearsCurrent=r.find(S("years current")),this.$years=r.find(S("years")),this.$monthsPicker=r.find(S("months picker")),this.$yearPrev=r.find(S("year prev")),this.$yearNext=r.find(S("year next")),this.$yearCurrent=r.find(S("year current")),this.$months=r.find(S("months")),this.$daysPicker=r.find(S("days picker")),this.$monthPrev=r.find(S("month prev")),this.$monthNext=r.find(S("month next")),this.$monthCurrent=r.find(S("month current")),this.$days=r.find(S("days")),this.inline?$(a.container||t).append(r.addClass("".concat(D,"-inline"))):($(document.body).append(r.addClass("".concat(D,"-dropdown"))),r.addClass(x).css({zIndex:parseInt(a.zIndex,10)})),this.renderWeek()}}},{key:"unbuild",value:function(){!this.built||(this.built=!1,this.$picker.remove())}},{key:"bind",value:function(){var t=this.options,a=this.$element;$.isFunction(t.show)&&a.on(ye,t.show),$.isFunction(t.hide)&&a.on(ge,t.hide),$.isFunction(t.pick)&&a.on(me,t.pick),this.isInput&&a.on(te,$.proxy(this.keyup,this)),this.inline||(t.trigger?this.$trigger.on(M,$.proxy(this.toggle,this)):this.isInput?a.on(Ve,$.proxy(this.show,this)):a.on(M,$.proxy(this.show,this)))}},{key:"unbind",value:function(){var t=this.$element,a=this.options;$.isFunction(a.show)&&t.off(ye,a.show),$.isFunction(a.hide)&&t.off(ge,a.hide),$.isFunction(a.pick)&&t.off(me,a.pick),this.isInput&&t.off(te,this.keyup),this.inline||(a.trigger?this.$trigger.off(M,this.toggle):this.isInput?t.off(Ve,this.show):t.off(M,this.show))}},{key:"showView",value:function(t){var a=this.$yearsPicker,r=this.$monthsPicker,n=this.$daysPicker,s=this.format;if(s.hasYear||s.hasMonth||s.hasDay)switch(Number(t)){case q.YEARS:r.addClass(x),n.addClass(x),s.hasYear?(this.renderYears(),a.removeClass(x),this.place()):this.showView(q.DAYS);break;case q.MONTHS:a.addClass(x),n.addClass(x),s.hasMonth?(this.renderMonths(),r.removeClass(x),this.place()):this.showView(q.YEARS);break;default:a.addClass(x),r.addClass(x),s.hasDay?(this.renderDays(),n.removeClass(x),this.place()):this.showView(q.MONTHS)}}},{key:"hideView",value:function(){!this.inline&&this.options.autoHide&&this.hide()}},{key:"place",value:function(){if(!this.inline){var t=this.$element,a=this.options,r=this.$picker,n=$(document).outerWidth(),s=$(document).outerHeight(),l=t.outerWidth(),o=t.outerHeight(),c=r.width(),h=r.height(),p=t.offset(),d=p.left,u=p.top,g=parseFloat(a.offset),f=_e;De(g)&&(g=10),u>h&&u+o+h>s?(u-=h+g,f=Ue):u+=o+g,d+c>n&&(d+=l-c,f=f.replace("left","right")),r.removeClass(ft).addClass(f).css({top:u,left:d})}}},{key:"trigger",value:function(t,a){var r=$.Event(t,a);return this.$element.trigger(r),r}},{key:"createItem",value:function(t){var a=this.options,r=a.itemTag,n={text:"",view:"",muted:!1,picked:!1,disabled:!1,highlighted:!1},s=[];return $.extend(n,t),n.muted&&s.push(a.mutedClass),n.highlighted&&s.push(a.highlightedClass),n.picked&&s.push(a.pickedClass),n.disabled&&s.push(a.disabledClass),"<".concat(r,' class="').concat(s.join(" "),'" data-view="').concat(n.view,'">').concat(n.text,"</").concat(r,">")}},{key:"getValue",value:function(){var t=this.$element;return this.isInput?t.val():t.text()}},{key:"setValue",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",a=this.$element;this.isInput?a.val(t):(!this.inline||this.options.container)&&a.text(t)}}],[{key:"setDefaults",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};$.extend(Oe,we[t.language],$.isPlainObject(t)&&t)}}]),i}();$.extend&&$.extend(ee.prototype,dt,ct,lt);$.fn&&(Re=$.fn.datepicker,$.fn.datepicker=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];var n;return this.each(function(s,l){var o=$(l),c=e==="destroy",h=o.data(D);if(!h){if(c)return;var p=$.extend({},o.data(),$.isPlainObject(e)&&e);h=new ee(l,p),o.data(D,h)}if(G(e)){var d=h[e];$.isFunction(d)&&(n=d.apply(h,a),c&&o.removeData(D))}}),X(n)?this:n},$.fn.datepicker.Constructor=ee,$.fn.datepicker.languages=we,$.fn.datepicker.setDefaults=ee.setDefaults,$.fn.datepicker.noConflict=function(){return $.fn.datepicker=Re,this});var Re;var N=[];localStorage.getItem("selectedDates")&&(ke=JSON.parse(localStorage.getItem("selectedDates")),b(ke)===!1&&(N=ke));var ke;function ae(i,e){N=[i,e],localStorage.setItem("selectedDates",JSON.stringify(N)),$("#enquiry_data").length&&Ye(!0)}$.fn.datepicker.setDefaults({format:"dd-mm-yyyy",language:"en-GB",autoHide:!0,startDate:new Date,pick:function(i){if(i.view==="day"){var e=$(this),t=e.attr("id");if(t==="hire-start"){var a=i.date,r=i.date.getTime(),n=new Date(r+864e5*28),s=$("#hire-end"),l=s.datepicker("getDate");s.datepicker("setStartDate",n),E(l)?a>=new Date(l.getTime()-864e5*28)?(s.datepicker("setDate",n),s.datepicker("show"),ae(a,n)):ae(a,l):(s.datepicker("setDate",n),s.datepicker("show"),ae(a,n))}else if(t==="hire-end"){var o=$("#hire-start");if(o.val()!==""){var l=i.date,a=o.datepicker("getDate");if(l<a){i.preventDefault(),alert("End date cannot be before the start date");return}if(l===a){i.preventDefault(),alert("Minimum hire period is 1 day");return}ae(a,l)}else o.datepicker("show")}}}});var vt=b(N)===!1;vt?($("#hire-start").datepicker({date:new Date(N[0]),template:W("Select a start date")}).val(ve(N[0])).attr("readonly",""),$("#hire-end").datepicker({date:new Date(N[1]),template:W("Select an end date")}).val(ve(N[1])).attr("readonly","")):($("#hire-start").datepicker({template:W("Select a start date")}).attr("readonly",""),$("#hire-end").datepicker({startDate:new Date(new Date().getTime()+864e5*28),template:W("Select an end date")}).attr("readonly",""));function pt(i){if(Array.isArray(i)){for(var e=0,t=Array(i.length);e<i.length;e++)t[e]=i[e];return t}else return Array.from(i)}var xe=!1;typeof window!="undefined"&&(Ce={get passive(){xe=!0}},window.addEventListener("testPassive",null,Ce),window.removeEventListener("testPassive",null,Ce));var Ce,ie=typeof window!="undefined"&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||window.navigator.platform==="MacIntel"&&window.navigator.maxTouchPoints>1),F=[],re=!1,je=-1,_=void 0,O=void 0,U=void 0,Ke=function(e){return F.some(function(t){return!!(t.options.allowTouchMove&&t.options.allowTouchMove(e))})},ne=function(e){var t=e||window.event;return Ke(t.target)||t.touches.length>1?!0:(t.preventDefault&&t.preventDefault(),!1)},gt=function(e){if(U===void 0){var t=!!e&&e.reserveScrollBarGap===!0,a=window.innerWidth-document.documentElement.clientWidth;if(t&&a>0){var r=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);U=document.body.style.paddingRight,document.body.style.paddingRight=r+a+"px"}}_===void 0&&(_=document.body.style.overflow,document.body.style.overflow="hidden")},mt=function(){U!==void 0&&(document.body.style.paddingRight=U,U=void 0),_!==void 0&&(document.body.style.overflow=_,_=void 0)},yt=function(){return window.requestAnimationFrame(function(){if(O===void 0){O={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var e=window,t=e.scrollY,a=e.scrollX,r=e.innerHeight;document.body.style.position="fixed",document.body.style.top=-t,document.body.style.left=-a,setTimeout(function(){return window.requestAnimationFrame(function(){var n=r-window.innerHeight;n&&t>=r&&(document.body.style.top=-(t+n))})},300)}})},wt=function(){if(O!==void 0){var e=-parseInt(document.body.style.top,10),t=-parseInt(document.body.style.left,10);document.body.style.position=O.position,document.body.style.top=O.top,document.body.style.left=O.left,window.scrollTo(t,e),O=void 0}},$t=function(e){return e?e.scrollHeight-e.scrollTop<=e.clientHeight:!1},Dt=function(e,t){var a=e.targetTouches[0].clientY-je;return Ke(e.target)?!1:t&&t.scrollTop===0&&a>0||$t(t)&&a<0?ne(e):(e.stopPropagation(),!0)},qe=function(e,t){if(!e){console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");return}if(!F.some(function(r){return r.targetElement===e})){var a={targetElement:e,options:t||{}};F=[].concat(pt(F),[a]),ie?yt():gt(t),ie&&(e.ontouchstart=function(r){r.targetTouches.length===1&&(je=r.targetTouches[0].clientY)},e.ontouchmove=function(r){r.targetTouches.length===1&&Dt(r,e)},re||(document.addEventListener("touchmove",ne,xe?{passive:!1}:void 0),re=!0))}};var Te=function(e){if(!e){console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");return}F=F.filter(function(t){return t.targetElement!==e}),ie&&(e.ontouchstart=null,e.ontouchmove=null,re&&F.length===0&&(document.removeEventListener("touchmove",ne,xe?{passive:!1}:void 0),re=!1)),ie?wt():mt()};var kt=$(".modal").length<1;$(document).on("change","#billing",function(){var i=$(this).val().toLowerCase();i==="hire"?$("#date-picker").removeClass("hidden"):$("#date-picker").addClass("hidden"),$('[data-enquiry="add-to-enquiry"] .icon-check').length&&$('[data-enquiry="add-to-enquiry"]').html('<span class="button-text icon-add">Add to Enquiry</span>')});$('.increase[data-for="enquiry-ribbon"]').on("click",function(i){i.preventDefault();var e=$(this),t=e.parent(),a=t.siblings(".counter"),r=a.val();if(r>=1&&t.siblings(".interaction-button-wrapper").find(".decrease").prop("disabled",!1).removeAttr("disabled"),r<99){var n=+r+1;a.val(n).trigger("change")}});$('.decrease[data-for="enquiry-ribbon"]').on("click",function(i){i.preventDefault();var e=$(this),t=e.parent(),a=t.siblings(".counter"),r=a.val();if(r>1){r===2&&e.prop("disabled",!0).attr("disabled","");var n=+r-1;a.val(n).trigger("change")}});localStorage.getItem("enquiry")?oe=JSON.parse(localStorage.getItem("enquiry")):(oe=[],localStorage.setItem("enquiry",JSON.stringify(oe)));var oe;$(document).on("click",'[data-enquiry="add-to-enquiry-modal"]',function(i){i.preventDefault(),$("#variant-select").addClass("hidden"),$("#date-picker").addClass("hidden"),$('[data-enquiry="add-to-enquiry"] .icon-check').length&&$('[data-enquiry="add-to-enquiry"]').html('<span class="button-text icon-add">Add to Enquiry</span>');var e=$(this),t=e.closest(".content_card"),a=t.find(".product_singular_name")&&t.find(".product_singular_name").text()!==""?t.find(".product_singular_name").text():t.find(".content_card_title").text(),r=t.find('[data-node-type="commerce-add-to-cart-option-select"]').children(),n=t.find(".content_card-image").attr("src"),s=[];$.each(r,function(c){this.value!==""&&s.push(this.text)}),$('[data-enquiry="img"]').html(n),$('[data-enquiry="singular-name"]').html(a),b(s)===!1&&(fe(s,"variant","variant-label"),$("#variant-select").removeClass("hidden")),$("#qty").val(1),$('.decrease[data-for="enquiry-ribbon"]').prop("disabled",!0).attr("disabled","");var l=[],o=t.find('[data-enquiry="billing"]');o.each(function(){l.push($(this).text())}),fe(l,"billing","billing-label"),l[0]==="Hire"&&$("#date-picker").removeClass("hidden"),St("add-to-enquiry")});function St(i){if(document.getElementById(i)){var e=document.getElementById(i);qe(e,{reserveScrollBarGap:!0}),e.scroll(0,0);var t=$("#"+i);t.removeClass("closed").addClass("opening").css("display","flex");let a=t.find(".modal-background");a.fadeIn(350),setTimeout(function(){t.removeClass("opening").addClass("open"),$(".loading").removeClass("loading"),a.on("click",function(){B(i)})},350)}}function B(i){if(document.getElementById(i)){var e=$("#"+i);e.removeClass("open").addClass("closing"),e.find(".modal-background").fadeOut(200),setTimeout(function(){e.removeClass("closing").hide().addClass("closed");var t=document.getElementById(i);Te(t)},200)}}$(".close-modal").each(function(){$(this).on("click",function(i){i.preventDefault();var e=$(i.target).closest(".modal").attr("id");B(e)})});$(".add-to-enquiry .form-select, .add-to-enquiry .input.counter, .add-to-enquiry .calendar-field").each(function(){$(this).on("change",function(){$('[data-enquiry="add-to-enquiry"] .icon-check').length&&$('[data-enquiry="add-to-enquiry"]').html('<span class="button-text icon-add">Add to Enquiry</span>')})});$('[data-enquiry="add-to-enquiry"]').on("click",function(i){i.preventDefault();var e=!0,t=JSON.parse(localStorage.getItem("enquiry")),a="",r="",n="",s="",l="",o=[],c="";if(a=$('[data-enquiry="singular-name"]').length&&$('[data-enquiry="singular-name"]').text()!==""?$('[data-enquiry="singular-name"]').text():$('[data-enquiry="name"]').text(),r=$("#variant").length&&!$("#variant-select").hasClass("hidden")?$("#variant"):$('.product-sidebar [data-node-type="commerce-add-to-cart-option-select"]').length?$('[data-node-type="commerce-add-to-cart-option-select"]'):null,n=r!==null?n.id==="variant"?r.val():r.children('[value="'+r.val()+'"]').text():"n/a",s=$(".counter").val()>0?$(".counter").val():"1",l=$("#billing").val().toLowerCase(),c=kt?$('[data-enquiry="img"]').eq(0).attr("src"):$('[data-enquiry="img"]').text(),o=E($("#hire-start").datepicker("getDate"))&&E($("#hire-end").datepicker("getDate"))?[$("#hire-start").datepicker("getDate"),$("#hire-end").datepicker("getDate")]:[],localStorage.setItem("selectedDates",JSON.stringify(o)),r!==null){if(n===""||n.indexOf("Select")>-1){e=!1,r.siblings(".form-error").length||$('<div class="form-error">Please select a product to add</div>').insertAfter(r),r.trigger("focus");return}r.siblings(".form-error").remove()}if(b(t)===!1){var p=!1;for(let k=0;k<t.length&&!p;k++)if(t[k].billing===l){var d=t[k];for(var u in d)if(d.hasOwnProperty(u)&&u==="id"){var g=d[u],f;if(l==="hire"?f=o[0]&&o[1]?a.toLowerCase().replace(/[^\w]/g,"")+n.toLowerCase().replace(/[^\w]/g,"")+"startdate"+A(o[0])+"enddate"+A(o[1]):a.toLowerCase().replace(/[^\w]/g,"")+n.toLowerCase().replace(/[^\w]/g,"")+"noselecteddates":f=a.toLowerCase().replace(/[^\w]/g,"")+n.toLowerCase().replace(/[^\w]/g,""),g===f)if(l==="hire"){var m=d.selectedDates;let T=b(m)===!1,C=b(m)===!0,w=b(o)===!1,I=b(o)===!0;if((T&&w||C&&I)&&(C&&I||m[0]===o[0].toISOString()&&m[1]===o[1].toISOString())){p=!0;var y=(parseInt(d.qty,10)+parseInt(s,10)).toString();d.qty=y,localStorage.setItem("enquiry",JSON.stringify(t)),B("add-to-enquiry"),se({name:a,img:c,variant:n})}}else{p=!0;var y=(parseInt(d.qty,10)+parseInt(s,10)).toString();d.qty=y,localStorage.setItem("enquiry",JSON.stringify(t)),B("add-to-enquiry"),se({name:a,img:c,variant:n})}}}if(!p){if(l==="hire")var v={billing:l,id:o[0]&&o[1]?a.toLowerCase().replace(/[^\w]/g,"")+n.toLowerCase().replace(/[^\w]/g,"")+"startdate"+A(o[0])+"enddate"+A(o[1]):a.toLowerCase().replace(/[^\w]/g,"")+n.toLowerCase().replace(/[^\w]/g,"")+"noselecteddates",name:a,img:c,variant:n,qty:s,selectedDates:o[0]&&o[1]?o:[]};else var v={billing:l,id:a.toLowerCase().replace(/[^\w]/g,"")+n.toLowerCase().replace(/[^\w]/g,""),name:a,img:c,variant:n,qty:s};t.push(v),localStorage.setItem("enquiry",JSON.stringify(t)),B("add-to-enquiry"),se({name:a,img:c,variant:n})}}else{if(l==="hire")var v={billing:l,id:o[0]&&o[1]?a.toLowerCase().replace(/[^\w]/g,"")+n.toLowerCase().replace(/[^\w]/g,"")+"startdate"+A(o[0])+"enddate"+A(o[1]):a.toLowerCase().replace(/[^\w]/g,"")+n.toLowerCase().replace(/[^\w]/g,"")+"noselecteddates",name:a,img:c,variant:n,qty:s,selectedDates:o[0]&&o[1]?o:[]};else var v={billing:l,id:a.toLowerCase().replace(/[^\w]/g,"")+n.toLowerCase().replace(/[^\w]/g,""),name:a,img:c,variant:n,qty:s};t.push(v),localStorage.setItem("enquiry",JSON.stringify(t)),B("add-to-enquiry"),se({name:a,img:c,variant:n})}$(this).html('<span class="button-text icon-check">Added</span>'),Ae("complete-enquiry")});function se(i){var e=$($("#product-added").eq(0).html()),t=e.find(".product-added-image"),a=e.find(".product-added-title"),r=i.variant!=="n/a"?i.variant+" "+i.name:i.name;a.html(r),t.attr("src",i.img),$("#complete-enquiry").append(e),setTimeout(function(){e.removeClass("hidden")},50),setTimeout(function(){e.addClass("hidden"),setTimeout(function(){e.remove()},350)},5e3)}$("#filter-fleet-list").on("click",function(i){i.preventDefault(),$("#filter-column").fadeIn(200);var e=document.querySelector("#filter-column");qe(e),e.scroll(0,0)});$("#filter-column-close").on("click",function(i){i.preventDefault(),$("#filter-column").fadeOut(200),setTimeout(function(){var e=document.querySelector("#filter-column");Te(e)},200)});})();
/*!
 * Datepicker v1.0.10
 * https://fengyuanchen.github.io/datepicker
 *
 * Copyright 2014-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2020-09-29T14:46:10.983Z
 */
/*!
 * NOTE
 * This is a modified version of datepicker to remove the jquery dependency as it is included with Webflow
 * Edited by Carl Burden
 */
