"use strict";function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(t,e):void 0}}function _iterableToArray(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function _regeneratorRuntime(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */_regeneratorRuntime=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function u(t,e,r,o){var a=e&&e.prototype instanceof d?e:d,i=Object.create(a.prototype),c=new x(o||[]);return n(i,"_invoke",{value:S(t,r,c)}),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f={};function d(){}function v(){}function h(){}var y={};l(y,a,(function(){return this}));var p=Object.getPrototypeOf,m=p&&p(p(E([])));m&&m!==e&&r.call(m,a)&&(y=m);var g=h.prototype=d.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function o(n,a,i,c){var l=s(t[n],t,a);if("throw"!==l.type){var u=l.arg,f=u.value;return f&&"object"==_typeof(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,i,c)}),(function(t){o("throw",t,i,c)})):e.resolve(f).then((function(t){u.value=t,i(u)}),(function(t){return o("throw",t,i,c)}))}c(l.arg)}var a;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return a=a?a.then(n,n):n()}})}function S(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return T()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=w(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var l=s(t,e,r);if("normal"===l.type){if(n=r.done?"completed":"suspendedYield",l.arg===f)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n="completed",r.method="throw",r.arg=l.arg)}}}function w(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=s(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function E(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:T}}function T(){return{value:void 0,done:!0}}return v.prototype=h,n(g,"constructor",{value:h,configurable:!0}),n(h,"constructor",{value:v,configurable:!0}),v.displayName=l(h,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,l(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},b(_.prototype),l(_.prototype,i,(function(){return this})),t.AsyncIterator=_,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new _(u(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},b(g),l(g,c,"Generator"),l(g,a,(function(){return this})),l(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=E,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function asyncGeneratorStep(t,e,r,n,o,a,i){try{var c=t[a](i),l=c.value}catch(t){return void r(t)}c.done?e(l):Promise.resolve(l).then(n,o)}function _asyncToGenerator(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){asyncGeneratorStep(a,n,o,i,c,"next",t)}function c(t){asyncGeneratorStep(a,n,o,i,c,"throw",t)}i(void 0)}))}}var activeNav=["0px","51px"],ICON_URLS={lightMode:"./assets/images/sun-moon.svg",darkMode:"./assets/images/moon.svg"},ACTIVE_CLASS="active";window.onload=function(){main(),loadSkillsData(),loadProjectsData()};var main=function(){var t=document.getElementById("icon"),e=document.querySelector(".about__skills"),r=document.querySelectorAll(".animate"),n=document.querySelector(".nav__items"),o=document.querySelector(".hamburger"),a=document.querySelector("form.form"),i=document.querySelector(".skills__filter");observer(countingSkills,e).observe(e),r.forEach((function(t){return observer(sectionTransition,t).observe(t)})),i.addEventListener("change",filteredSkills),a.addEventListener("submit",submitContactForm),t.addEventListener("click",toggleTheme),o.addEventListener("click",toggleNavbar),n.addEventListener("click",addNavIndicator),n.addEventListener("mouseout",resetNavIndicator),n.addEventListener("mouseenter",showNavIndicator,!0)},loadSkillsData=function(){var t=_asyncToGenerator(_regeneratorRuntime().mark((function t(e){var r,n,o,a;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("./data/skills.json");case 3:return r=t.sent,t.next=6,r.json();case 6:n=t.sent,o=e?n.filter((function(t){return t.level===(null==e?void 0:e[0])||t.level===(null==e?void 0:e[1])||t.level===(null==e?void 0:e[2])})):n,a=null==o?void 0:o.reduce((function(t,e){var r=null==e?void 0:e.category;return t[r]||(t[r]=[]),t[r].push(e.name),t}),{}),handleSkillsData(a),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e){return t.apply(this,arguments)}}(),loadProjectsData=function(){var t=_asyncToGenerator(_regeneratorRuntime().mark((function t(){var e,r;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("./data/projects.json");case 3:return e=t.sent,t.next=6,e.json();case 6:r=t.sent,displayProjects(r),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(){return t.apply(this,arguments)}}(),observer=function(t,e){return new IntersectionObserver((function(r){r.forEach((function(r){r.isIntersecting&&t(e)}))}))},toggleTheme=function(t){var e=document.body.classList,r=t.target;e.toggle("night"),e.contains("night")?(r.src=ICON_URLS.lightMode,r.alt="light mode"):(r.src=ICON_URLS.darkMode,r.alt="dark mode")},toggleNavbar=function(){var t=document.querySelector(".nav__items");document.querySelector(".hamburger").classList.toggle(ACTIVE_CLASS),t.classList.toggle(ACTIVE_CLASS)},addNavIndicator=function(t){isMobile()&&toggleNavbar();var e=document.querySelector(".nav__marker"),r=document.querySelectorAll(".nav__link"),n=t.target,o=n.offsetLeft+"px",a=n.offsetWidth+"px";e.style.left=o,e.style.width=a,activeNav=[o,a],r.forEach((function(t){t.classList.contains(ACTIVE_CLASS)&&t.classList.remove(ACTIVE_CLASS)})),n.classList.add(ACTIVE_CLASS)},showNavIndicator=function(t){var e=document.querySelector(".nav__marker"),r=t.target,n=r.offsetLeft+"px",o=r.offsetWidth+"px";e.style.left=n,e.style.width=o},resetNavIndicator=function(){var t=document.querySelector(".nav__marker");t.style.left=activeNav[0],t.style.width=activeNav[1]},countingSkills=function(){var t=document.querySelectorAll(".count");t.forEach((function(t){var e=0,r=parseInt(t.getAttribute("data-val")),n=Math.floor(1e3/r),o=setInterval((function(){e+=1,t.textContent=e+"+",e==r&&clearInterval(o)}),n)}))},sectionTransition=function(t){t.style.opacity=1,t.style.transform="translateY(0)",t.style.visibility="visible"},handleSkillsData=function(t){var e=t.language,r=t.framework,n=t.tool,o=document.querySelector(".languages-container"),a=document.querySelector(".frameworks-container"),i=document.querySelector(".tools-container");o.innerHTML="",a.innerHTML="",i.innerHTML="",displaySkills(o,e),displaySkills(a,r),displaySkills(i,n)},submitContactForm=function(){var t=_asyncToGenerator(_regeneratorRuntime().mark((function t(e){var r,n,o,a,i,c,l;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),r=document.querySelector(".toastMessage"),n=e.target,o=n.name.value,a=n.email.value,i=n.message.value,c=n.subject.value,l={name:o,email:a,message:i,subject:c},t.prev=8,t.next=11,fetch("https://server-ebon-delta.vercel.app/send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});case 11:if(!t.sent.ok){t.next=18;break}r.style.display="block",r.innerText="".concat(o,", your form was submitted successfully."),n.reset(),t.next=19;break;case 18:throw new Error("Submission failed.");case 19:t.next=26;break;case 21:t.prev=21,t.t0=t.catch(8),r.style.display="block",r.innerText=t.t0.message,console.log("Error: sending contact info error",t.t0);case 26:setTimeout((function(){r.style.display="none",r.innerText=""}),3e3);case 27:case"end":return t.stop()}}),t,null,[[8,21]])})));return function(e){return t.apply(this,arguments)}}(),filteredSkills=function(){var t=document.querySelectorAll(".input-filter-checkbox"),e=[];_toConsumableArray(t).forEach((function(t){t.checked&&e.push(t.value)})),loadSkillsData(e)},displaySkills=function(t,e){e?null==e||e.forEach((function(e){var r=document.createElement("li");r.className="skills__category-item",r.textContent=e,t.appendChild(r)})):t.appendChild(document.createTextNode("No data found"))},displayProjects=function(t){document.getElementById("project__content").innerHTML+=t.map((function(t){var e=t.image,r=t.name,n=t.technologies,o=t.description,a=t.codeLink,i=t.productionLink;return'<div class="project">\n        <div class="project__img">\n          <img src='.concat(e,' alt="').concat(r,'" loading="lazy"/>\n        </div>\n        <div class="project__name">\n          <h4>').concat(r,'</h4>\n        </div>\n        <div class="project__technologies">\n          <ul>\n            ').concat(n.map((function(t){return"<li>".concat(t,"</li>")})).join(""),'\n          </ul>\n        </div>\n        <div class="project__description">\n          <p>\n           ').concat(o,'\n          </p>\n        </div>\n        <div class="project__button">\n        ').concat(null!=a&&a.client?'<a\n          href="'.concat(null==a?void 0:a.client,'"\n          target="_blank"\n        >\n         Client link\n        </a>'):"","\n\n          ").concat(null!=a&&a.server?'<a\n            href="'.concat(null==a?void 0:a.server,'"\n            target="_blank"\n          >\n           Server link\n          </a>'):"","\n\n          <a href='").concat(i,'\' target="_blank">\n            live site\n          </a>\n        </div>\n      </div>')})).join("")},isMobile=function(){return window.innerWidth<=640};
//# sourceMappingURL=script.js.map