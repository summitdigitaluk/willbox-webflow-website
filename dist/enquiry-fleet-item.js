"use strict";(()=>{var o=(e,t,c)=>{$(".select-wrapper--"+t).remove();var n=document.createElement("div");n.classList.add("select-wrapper","select-wrapper--"+t);var r=document.createElement("select");r.id=t,r.name=t,r.classList.add("form-select","w-select");for(let a=0;a<e.length;a++){var i=document.createElement("option");i.text=e[a],i.value=e[a],r.add(i)}var l=document.createElement("div");l.classList.add("select-icon"),$(n).prepend(r).append(l).insertAfter("#"+c)};Array.prototype.move=function(e,t){return this.splice(t,0,this.splice(e,1)[0]),this};var v=24*60*60*1e3;var s=[],u=$('[data-enquiry="billing"] > div');u.each(function(){s.push($(this).text())});o(s,"billing","billing-label");var d=$("#billing").val().toLowerCase();d==="hire"&&$("#date-picker").removeClass("hidden");$(".add-to-enquiry .loading").removeClass("loading");$(".lightbox-main-link").on("click",function(e){e.preventDefault(),$(".lightbox-gallery-item").eq(0).find(".w-lightbox").trigger("click")});})();