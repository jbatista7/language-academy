!function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function s(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?s(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):s(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function l(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=function(e,t){if(e){if("string"==typeof e)return a(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?a(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0,s=function(){};return{s:s,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,l=!0,o=!1;return{s:function(){i=e[Symbol.iterator]()},n:function(){var e=i.next();return l=e.done,e},e:function(e){o=!0,r=e},f:function(){try{l||null==i.return||i.return()}finally{if(o)throw r}}}}var o=86400,u=function(e,t){if(null===e)return null;if("number"!=typeof t.step)return e;var i,n=e%(60*t.step);return(n-=(null!==(i=t.minTime())&&void 0!==i?i:0)%(60*t.step))>=30*t.step?e+=60*t.step-n:e-=n,function(e,t){if(e==o&&t.show2400)return e;return e%o}(e,t)};var c,m={appendTo:"body",className:null,closeOnWindowScroll:!1,disableTextInput:!1,disableTimeRanges:[],disableTouchKeyboard:!1,durationTime:null,forceRoundTime:!1,lang:{},listWidth:null,maxTime:null,minTime:null,noneOption:!1,orientation:"l",roundingFunction:u,scrollDefault:null,selectOnBlur:!1,show2400:!1,showDuration:!1,showOn:["click","focus"],showOnFocus:!0,step:30,stopScrollPropagation:!1,timeFormat:"g:ia",typeaheadHighlight:!0,useSelect:!1,wrapHours:!0},p={am:"am",pm:"pm",AM:"AM",PM:"PM",decimal:".",mins:"mins",hr:"hr",hrs:"hrs"},f={bubbles:!0,cancelable:!1,detail:null},h=function(){function n(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t(this,n),this._handleFormatValue=this._handleFormatValue.bind(this),this._handleKeyUp=this._handleKeyUp.bind(this),this.targetEl=e;var s=n.extractAttrOptions(e,Object.keys(m));this.settings=this.parseSettings(r(r(r({},m),i),s))}var s,a,u;return s=n,u=[{key:"extractAttrOptions",value:function(e,t){var i,n={},s=l(t);try{for(s.s();!(i=s.n()).done;){var r=i.value;r in e.dataset&&(n[r]=e.dataset[r])}}catch(e){s.e(e)}finally{s.f()}return n}},{key:"isVisible",value:function(e){var t=e[0];return t.offsetWidth>0&&t.offsetHeight>0}},{key:"hideAll",value:function(){var e,t=l(document.getElementsByClassName("ui-timepicker-input"));try{for(t.s();!(e=t.n()).done;){var i=e.value.timepickerObj;i&&i.hideMe()}}catch(e){t.e(e)}finally{t.f()}}}],(a=[{key:"hideMe",value:function(){if(this.settings.useSelect)this.targetEl.blur();else if(this.list&&n.isVisible(this.list)){this.settings.selectOnBlur&&this._selectValue(),this.list.hide();var e=new CustomEvent("hideTimepicker",f);this.targetEl.dispatchEvent(e)}}},{key:"_findRow",value:function(e){if(!e&&0!==e)return!1;var t=!1;return e=this.settings.roundingFunction(e,this.settings),!!this.list&&(this.list.find("li").each((function(i,n){var s=parseInt(n.dataset.time);if(!isNaN(s))return s==e?(t=n,!1):void 0})),t)}},{key:"_hideKeyboard",value:function(){return(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&this.settings.disableTouchKeyboard}},{key:"_setTimeValue",value:function(e,t){if("INPUT"===this.targetEl.nodeName){null===e&&""==this.targetEl.value||(this.targetEl.value=e);var i=this;i.settings.useSelect&&"select"!=t&&i.list&&i.list.val(i._roundAndFormatTime(i.anytime2int(e)))}var n=new CustomEvent("selectTime",f);if(this.selectedValue!=e){this.selectedValue=e;var s=new CustomEvent("changeTime",f),r=new CustomEvent("change",Object.assign(f,{detail:"timepicker"}));return"select"==t?(this.targetEl.dispatchEvent(n),this.targetEl.dispatchEvent(s),this.targetEl.dispatchEvent(r)):-1==["error","initial"].indexOf(t)&&this.targetEl.dispatchEvent(s),!0}return-1==["error","initial"].indexOf(t)&&this.targetEl.dispatchEvent(n),!1}},{key:"_getTimeValue",value:function(){return"INPUT"===this.targetEl.nodeName?this.targetEl.value:this.selectedValue}},{key:"_selectValue",value:function(){var e=this;e.settings;var t=e.list.find(".ui-timepicker-selected");if(t.hasClass("ui-timepicker-disabled"))return!1;if(!t.length)return!0;var i=t.get(0).dataset.time;if(i){var n=parseInt(i);isNaN(n)||(i=n)}return null!==i&&("string"!=typeof i&&(i=e._int2time(i)),e._setTimeValue(i,"select")),!0}},{key:"anytime2int",value:function(t){return"number"==typeof t?t:"string"==typeof t?this.time2int(t):"object"===e(t)&&t instanceof Date?3600*t.getHours()+60*t.getMinutes()+t.getSeconds():"function"==typeof t?t():null}},{key:"time2int",value:function(e){if(""===e||null==e)return null;if("now"===e)return this.anytime2int(new Date);if("string"!=typeof e)return e;"a"!=(e=e.toLowerCase().replace(/[\s\.]/g,"")).slice(-1)&&"p"!=e.slice(-1)||(e+="m");var t=/^(([^0-9]*))?([0-9]?[0-9])(([0-5][0-9]))?(([0-5][0-9]))?(([^0-9]*))$/;e.match(/\W/)&&(t=/^(([^0-9]*))?([0-9]?[0-9])(\W+([0-5][0-9]?))?(\W+([0-5][0-9]))?(([^0-9]*))$/);var i=e.match(t);if(!i)return null;var n=parseInt(1*i[3],10),s=i[2]||i[9],r=n,a=1*i[5]||0,l=1*i[7]||0;if(s||2!=i[3].length||"0"!=i[3][0]||(s="am"),n<=12&&s){var u=(s=s.trim())==this.settings.lang.pm||s==this.settings.lang.PM;r=12==n?u?12:0:n+(u?12:0)}else if(3600*n+60*a+l>=o+(this.settings.show2400?1:0)){if(!1===this.settings.wrapHours)return null;r=n%24}var c=3600*r+60*a+l;if(n<12&&!s&&this.settings._twelveHourTime&&this.settings.scrollDefault()){var m=c-this.settings.scrollDefault();m<0&&m>=-43200&&(c=(c+43200)%o)}return c}},{key:"intStringDateOrFunc2func",value:function(e){var t=this;return null==e?function(){return null}:"function"==typeof e?function(){return t.anytime2int(e())}:function(){return t.anytime2int(e)}}},{key:"parseSettings",value:function(e){if(e.lang=r(r({},p),e.lang),this.settings=e,e.listWidth&&(e.listWidth=this.anytime2int(e.listWidth)),e.minTime=this.intStringDateOrFunc2func(e.minTime),e.maxTime=this.intStringDateOrFunc2func(e.maxTime),e.durationTime=this.intStringDateOrFunc2func(e.durationTime),e.scrollDefault?e.scrollDefault=this.intStringDateOrFunc2func(e.scrollDefault):e.scrollDefault=e.minTime,"string"==typeof e.timeFormat&&e.timeFormat.match(/[gh]/)&&(e._twelveHourTime=!0),!1===e.showOnFocus&&-1!=e.showOn.indexOf("focus")&&e.showOn.splice(e.showOn.indexOf("focus"),1),e.disableTimeRanges||(e.disableTimeRanges=[]),e.disableTimeRanges.length>0){for(var t in e.disableTimeRanges)e.disableTimeRanges[t]=[this.anytime2int(e.disableTimeRanges[t][0]),this.anytime2int(e.disableTimeRanges[t][1])];for(e.disableTimeRanges=e.disableTimeRanges.sort((function(e,t){return e[0]-t[0]})),t=e.disableTimeRanges.length-1;t>0;t--)e.disableTimeRanges[t][0]<=e.disableTimeRanges[t-1][1]&&(e.disableTimeRanges[t-1]=[Math.min(e.disableTimeRanges[t][0],e.disableTimeRanges[t-1][0]),Math.max(e.disableTimeRanges[t][1],e.disableTimeRanges[t-1][1])],e.disableTimeRanges.splice(t,1))}return e}},{key:"_disableTextInputHandler",value:function(e){switch(e.keyCode){case 13:case 9:return;default:e.preventDefault()}}},{key:"_int2duration",value:function(e,t){e=Math.abs(e);var i,n,s=Math.round(e/60),r=[];return s<60?r=[s,this.settings.lang.mins]:(i=Math.floor(s/60),n=s%60,30==t&&30==n&&(i+=this.settings.lang.decimal+5),r.push(i),r.push(1==i?this.settings.lang.hr:this.settings.lang.hrs),30!=t&&n&&(r.push(n),r.push(this.settings.lang.mins))),r.join(" ")}},{key:"_roundAndFormatTime",value:function(e){if(null!==(e=this.settings.roundingFunction(e,this.settings)))return this._int2time(e)}},{key:"_int2time",value:function(e){if("number"!=typeof e)return null;var t=parseInt(e%60),i=parseInt(e/60%60),n=parseInt(e/3600%24),s=new Date(1970,0,2,n,i,t,0);if(isNaN(s.getTime()))return null;if("function"==typeof this.settings.timeFormat)return this.settings.timeFormat(s);for(var r,a,l="",u=0;u<this.settings.timeFormat.length;u++)switch(a=this.settings.timeFormat.charAt(u)){case"a":l+=s.getHours()>11?this.settings.lang.pm:this.settings.lang.am;break;case"A":l+=s.getHours()>11?this.settings.lang.PM:this.settings.lang.AM;break;case"g":l+=0==(r=s.getHours()%12)?"12":r;break;case"G":r=s.getHours(),e===o&&(r=this.settings.show2400?24:0),l+=r;break;case"h":0!=(r=s.getHours()%12)&&r<10&&(r="0"+r),l+=0===r?"12":r;break;case"H":r=s.getHours(),e===o&&(r=this.settings.show2400?24:0),l+=r>9?r:"0"+r;break;case"i":l+=(i=s.getMinutes())>9?i:"0"+i;break;case"s":l+=(t=s.getSeconds())>9?t:"0"+t;break;case"\\":u++,l+=this.settings.timeFormat.charAt(u);break;default:l+=a}return l}},{key:"_setSelected",value:function(){var e=this.list;e.find("li").removeClass("ui-timepicker-selected");var t=this.anytime2int(this._getTimeValue());if(null!==t){var i=this._findRow(t);if(i){var n=i.getBoundingClientRect(),s=e.get(0).getBoundingClientRect(),r=n.top-s.top;if(r+n.height>s.height||r<0){var a=e.scrollTop()+(n.top-s.top)-n.height;e.scrollTop(a)}var l=parseInt(i.dataset.time);(this.settings.forceRoundTime||l===t)&&i.classList.add("ui-timepicker-selected")}}}},{key:"_isFocused",value:function(e){return e===document.activeElement}},{key:"_handleFormatValue",value:function(e){e&&"timepicker"==e.detail||this._formatValue(e)}},{key:"_formatValue",value:function(e,t){if(""!==this.targetEl.value){if(!this._isFocused(this.targetEl)||e&&"change"==e.type){var i=this.settings,n=this.anytime2int(this.targetEl.value);if(null!==n){var s=!1;null!==i.minTime&&null!==i.maxTime&&(n<i.minTime()||n>i.maxTime())&&(s=!0);var r,a=l(i.disableTimeRanges);try{for(a.s();!(r=a.n()).done;){var o=r.value;if(n>=o[0]&&n<o[1]){s=!0;break}}}catch(e){a.e(e)}finally{a.f()}if(i.forceRoundTime){var u=i.roundingFunction(n,i);u!=n&&(n=u,t=null)}var c=this._int2time(n);if(s){this._setTimeValue(c);var m=new CustomEvent("timeRangeError",f);this.targetEl.dispatchEvent(m)}else this._setTimeValue(c,t)}else{var p=new CustomEvent("timeFormatError",f);this.targetEl.dispatchEvent(p)}}}else this._setTimeValue(null,t)}},{key:"_generateNoneElement",value:function(t,i){var n,s,r,a;return"object"==e(t)?(n=t.label,s=t.className,r=t.value):"string"==typeof t?(n=t,r=""):$.error("Invalid noneOption value"),i?(a=document.createElement("option")).value=r:(a=document.createElement("li")).dataset.time=String(r),a.innerText=n,a.classList.add(s),a}},{key:"_handleKeyUp",value:function(e){var t=this;if(!this.list||!n.isVisible(this.list)||this.settings.disableTextInput)return!0;if("paste"!==e.type&&"cut"!==e.type)switch(e.keyCode){case 96:case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:case 105:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 65:case 77:case 80:case 186:case 8:case 46:this.settings.typeaheadHighlight?this._setSelected():this.list.hide()}else setTimeout((function(){t.settings.typeaheadHighlight?t._setSelected():t.list.hide()}),0)}}])&&i(s.prototype,a),u&&i(s,u),n}();!function(){if("function"==typeof window.CustomEvent)return!1;window.CustomEvent=function(e,t){t||(t={}),t=Object.assign(f,t);var i=document.createEvent("CustomEvent");return i.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),i}}(),c=function(t){var i={init:function(e){return this.each((function(){var s=t(this),a=new h(this,e),l=a.settings;if(l.lang,this.timepickerObj=a,s.addClass("ui-timepicker-input"),l.useSelect)n(s);else{if(s.prop("autocomplete","off"),l.showOn)for(var o in l.showOn)s.on(l.showOn[o]+".timepicker",i.show);s.on("change.timepicker",a._handleFormatValue),s.on("keydown.timepicker",r),s.on("keyup.timepicker",a._handleKeyUp),l.disableTextInput&&s.on("keydown.timepicker",a._disableTextInputHandler),s.on("cut.timepicker",a._handleKeyUp),s.on("paste.timepicker",a._handleKeyUp),a._formatValue(null,"initial")}}))},show:function(e){var i=t(this),r=i[0].timepickerObj,a=r.settings;if(e&&e.preventDefault(),a.useSelect)r.list.trigger("focus");else{r._hideKeyboard()&&i.trigger("blur");var l=r.list;if(!i.prop("readonly")&&(n(i),l=r.list,!h.isVisible(l))){i.is("input")&&(r.selectedValue=i.val()),r._setSelected(),h.hideAll(),"number"==typeof a.listWidth&&l.width(i.outerWidth()*a.listWidth),l.show();var o={};a.orientation.match(/r/)?o.left=i.offset().left+i.outerWidth()-l.outerWidth()+parseInt(l.css("marginLeft").replace("px",""),10):a.orientation.match(/l/)?o.left=i.offset().left+parseInt(l.css("marginLeft").replace("px",""),10):a.orientation.match(/c/)&&(o.left=i.offset().left+(i.outerWidth()-l.outerWidth())/2+parseInt(l.css("marginLeft").replace("px",""),10)),"t"==(a.orientation.match(/t/)?"t":a.orientation.match(/b/)?"b":i.offset().top+i.outerHeight(!0)+l.outerHeight()>t(window).height()+t(window).scrollTop()?"t":"b")?(l.addClass("ui-timepicker-positioned-top"),o.top=i.offset().top-l.outerHeight()+parseInt(l.css("marginTop").replace("px",""),10)):(l.removeClass("ui-timepicker-positioned-top"),o.top=i.offset().top+i.outerHeight()+parseInt(l.css("marginTop").replace("px",""),10)),l.offset(o);var u=l.find(".ui-timepicker-selected");if(!u.length){var c=r.anytime2int(r._getTimeValue());null!==c?u=t(r._findRow(c)):a.scrollDefault()&&(u=t(r._findRow(a.scrollDefault())))}if(u.length&&!u.hasClass("ui-timepicker-disabled")||(u=l.find("li:not(.ui-timepicker-disabled):first")),u&&u.length){var m=l.scrollTop()+u.position().top-u.outerHeight();l.scrollTop(m)}else l.scrollTop(0);return a.stopScrollPropagation&&t(document).on("wheel.ui-timepicker",".ui-timepicker-wrapper",(function(e){e.preventDefault();var i=t(this).scrollTop();t(this).scrollTop(i+e.originalEvent.deltaY)})),t(document).on("mousedown.ui-timepicker",s),window.addEventListener("resize",s),a.closeOnWindowScroll&&t(document).on("scroll.ui-timepicker",s),i.trigger("showTimepicker"),this}}},hide:function(e){var t=this[0].timepickerObj;return t&&t.hideMe(),h.hideAll(),this},option:function(i,s){return"string"==typeof i&&void 0===s?this[0].timepickerObj.settings[i]:this.each((function(){var r=t(this),a=r[0].timepickerObj,l=a.settings,o=a.list;"object"==e(i)?l=t.extend(l,i):"string"==typeof i&&(l[i]=s),l=a.parseSettings(l),a.settings=l,a._formatValue({type:"change"},"initial"),o&&(o.remove(),a.list=null),l.useSelect&&n(r)}))},getSecondsFromMidnight:function(){var e=this[0].timepickerObj;return e.anytime2int(e._getTimeValue())},getTime:function(e){var t=this[0].timepickerObj,i=t._getTimeValue();if(!i)return null;var n=t.anytime2int(i);if(null===n)return null;e||(e=new Date);var s=new Date(e);return s.setHours(n/3600),s.setMinutes(n%3600/60),s.setSeconds(n%60),s.setMilliseconds(0),s},isVisible:function(){var e=this[0].timepickerObj;return!!(e&&e.list&&h.isVisible(e.list))},setTime:function(e){var t=this[0].timepickerObj,i=t.settings;if(i.forceRoundTime)var n=t._roundAndFormatTime(t.anytime2int(e));else n=t._int2time(t.anytime2int(e));return e&&null===n&&i.noneOption&&(n=e),t._setTimeValue(n,"initial"),t._formatValue({type:"change"},"initial"),t&&t.list&&t._setSelected(),this},remove:function(){var e=this;if(e.hasClass("ui-timepicker-input")){var t=e[0].timepickerObj,i=t.settings;return e.removeAttr("autocomplete","off"),e.removeClass("ui-timepicker-input"),e.removeData("timepicker-obj"),e.off(".timepicker"),t.list&&t.list.remove(),i.useSelect&&e.show(),t.list=null,this}}};function n(e){var n,s,r,a=e[0].timepickerObj,l=a.list,c=a.settings;if(l&&l.length&&(l.remove(),a.list=null),c.useSelect){l=t("<select></select>",{class:"ui-timepicker-select"}),e.attr("name")&&l.attr("name","ui-timepicker-"+e.attr("name"));var m=l}else l=t("<ul></ul>",{class:"ui-timepicker-list"}),(m=t("<div></div>",{class:"ui-timepicker-wrapper",tabindex:-1})).css({display:"none",position:"absolute"}).append(l);if(c.noneOption)if(!0===c.noneOption&&(c.noneOption=c.useSelect?"Time...":"None"),t.isArray(c.noneOption)){for(var p in c.noneOption)if(parseInt(p,10)==p){var f=a._generateNoneElement(c.noneOption[p],c.useSelect);l.append(f)}}else f=a._generateNoneElement(c.noneOption,c.useSelect),l.append(f);c.className&&m.addClass(c.className),null===c.minTime&&null===c.durationTime||!c.showDuration||("function"==typeof c.step||c.step,m.addClass("ui-timepicker-with-duration"),m.addClass("ui-timepicker-step-"+c.step));var h=null!==(n=c.durationTime())&&void 0!==n?n:c.minTime(),d=null!==(s=c.minTime())&&void 0!==s?s:0,g=null!==(r=c.maxTime())&&void 0!==r?r:d+o-1;g<d&&(g+=o),86399===g&&"string"===t.type(c.timeFormat)&&c.show2400&&(g=o);var v=c.disableTimeRanges,y=0,b=v.length,k=c.step;"function"!=typeof k&&(k=function(){return c.step}),p=d;for(var T=0;p<=g;p+=60*k(++T)){var w,O=p,_=a._int2time(O);if(c.useSelect?(w=t("<option></option>",{value:_})).text(_):((w=t("<li></li>")).addClass(O%o<43200?"ui-timepicker-am":"ui-timepicker-pm"),w.attr("data-time",u(O,c)),w.text(_)),(null!==c.minTime()||null!==c.durationTime())&&c.showDuration){var E=a._int2duration(p-h,c.step);if(c.useSelect)w.text(w.text()+" ("+E+")");else{var S=t("<span></span>",{class:"ui-timepicker-duration"});S.text(" ("+E+")"),w.append(S)}}y<b&&(O>=v[y][1]&&(y+=1),v[y]&&O>=v[y][0]&&O<v[y][1]&&(c.useSelect?w.prop("disabled",!0):w.addClass("ui-timepicker-disabled"))),l.append(w)}if(m.data("timepicker-input",e),a.list=m,c.useSelect)e.val()&&l.val(a._roundAndFormatTime(a.anytime2int(e.val()))),l.on("focus",(function(){t(this).data("timepicker-input").trigger("showTimepicker")})),l.on("blur",(function(){t(this).data("timepicker-input").trigger("hideTimepicker")})),l.on("change",(function(){a._setTimeValue(t(this).val(),"select")})),a._setTimeValue(l.val(),"initial"),e.hide().after(l);else{var j=c.appendTo;"string"==typeof j?j=t(j):"function"==typeof j&&(j=j(e)),j.append(m),a._setSelected(),l.on("mousedown click","li",(function(n){e.off("focus.timepicker"),e.on("focus.timepicker-ie-hack",(function(){e.off("focus.timepicker-ie-hack"),e.on("focus.timepicker",i.show)})),a._hideKeyboard()||e[0].focus(),l.find("li").removeClass("ui-timepicker-selected"),t(this).addClass("ui-timepicker-selected"),a._selectValue()&&(e.trigger("hideTimepicker"),l.on("mouseup.timepicker click.timepicker","li",(function(e){l.off("mouseup.timepicker click.timepicker"),m.hide()})))}))}}function s(e){if("focus"!=e.type||e.target!=window){var i=t(e.target);i.closest(".ui-timepicker-input").length||i.closest(".ui-timepicker-wrapper").length||(h.hideAll(),t(document).unbind(".ui-timepicker"),t(window).unbind(".ui-timepicker"))}}function r(e){var n=t(this),s=n[0].timepickerObj,r=s.list;if(!r||!h.isVisible(r)){if(40!=e.keyCode)return!0;i.show.call(n.get(0)),r=s.list,s._hideKeyboard()||n.trigger("focus")}switch(e.keyCode){case 13:return s._selectValue()&&(s._formatValue({type:"change"}),s.hideMe()),e.preventDefault(),!1;case 38:var a=r.find(".ui-timepicker-selected");return a.length?a.is(":first-child")||(a.removeClass("ui-timepicker-selected"),a.prev().addClass("ui-timepicker-selected"),a.prev().position().top<a.outerHeight()&&r.scrollTop(r.scrollTop()-a.outerHeight())):(r.find("li").each((function(e,i){if(t(i).position().top>0)return a=t(i),!1})),a.addClass("ui-timepicker-selected")),!1;case 40:return 0===(a=r.find(".ui-timepicker-selected")).length?(r.find("li").each((function(e,i){if(t(i).position().top>0)return a=t(i),!1})),a.addClass("ui-timepicker-selected")):a.is(":last-child")||(a.removeClass("ui-timepicker-selected"),a.next().addClass("ui-timepicker-selected"),a.next().position().top+2*a.outerHeight()>r.outerHeight()&&r.scrollTop(r.scrollTop()+a.outerHeight())),!1;case 27:r.find("li").removeClass("ui-timepicker-selected"),s.hideMe();break;case 9:s.hideMe();break;default:return!0}}t.fn.timepicker=function(n){return this.length?i[n]?this.hasClass("ui-timepicker-input")?i[n].apply(this,Array.prototype.slice.call(arguments,1)):this:"object"!==e(n)&&n?void t.error("Method "+n+" does not exist on jQuery.timepicker"):i.init.apply(this,arguments):this},t.fn.timepicker.defaults=m},"object"===("undefined"==typeof exports?"undefined":e(exports))&&exports&&"object"===("undefined"==typeof module?"undefined":e(module))&&module&&module.exports===exports?c(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],c):c(jQuery)}();
