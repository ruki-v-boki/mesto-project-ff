(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-35",headers:{authorization:"7263799d-0cc7-4c40-bf32-62633bf1c840","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))},n=function(){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t)},r=function(n,r,o){var c=r.classList.contains("card__like-button_is-active")?"DELETE":"PUT";return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:c,headers:e.headers}).then(t)};function o(e,t,n,r,o,c){var a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=a.querySelector(".card__image"),i=a.querySelector(".card__title"),l=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button"),d=a.querySelector(".card__likes-counter"),p=e.likes.some((function(e){return e._id===o}));return u.src=e.link,u.alt="На картинке изображено: ".concat(e.name),i.textContent=e.name,d.textContent=e.likes.length,a.dataset.cardId=e._id,s.addEventListener("click",(function(){t(e._id,s,d).then((function(e){s.classList.toggle("card__like-button_is-active"),d.textContent=e.likes.length,d.textContent<1?d.style.display="none":d.style.display="block"})).catch((function(e){return console.error("Упс, лайнуть не удалось: ".concat(e))}))})),u.addEventListener("click",(function(){n(e.name,e.link)})),l.addEventListener("click",(function(){r(e._id)})),o!==c&&(l.style.display="none"),p&&s.classList.add("card__like-button_is-active"),0===e.likes.length?d.style.display="none":d.style.display="block",a}var c=function(e){e.classList.add("popup_is-opened"),e.addEventListener("mousedown",u),document.addEventListener("keydown",i)},a=function(e){e.classList.remove("popup_is-opened"),e.removeEventListener("mousedown",u),document.removeEventListener("keydown",i)};function u(e){e.target===e.currentTarget&&a(e.currentTarget)}function i(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&a(t)}}function l(e,t,n){Array.from(e).some((function(e){return!e.validity.valid}))?(t.classList.add(n),t.disabled=!0):(t.classList.remove(n),t.disabled=!1)}function s(e,t){var n=e.querySelectorAll(t.inputSelector),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){var r=e.querySelector(".".concat(n.id,"-error"));n.setCustomValidity(""),n.classList.remove(t.inputErrorClass),r&&(r.textContent="",r.classList.remove(t.errorClass))})),r.classList.add(t.inactiveButtonClass),r.disabled=!0}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p=document.querySelector(".profile__title"),f=document.querySelector(".profile__description"),_=document.querySelector(".profile__image"),y=document.querySelector(".places__list"),m=document.querySelectorAll(".popup"),v=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_new-avatar"),S=document.querySelector(".popup_type_image"),q=S.querySelector(".popup__image"),L=S.querySelector(".popup__caption"),C=document.querySelector(".popup_type_delete-card"),E=document.querySelectorAll(".popup__close"),g=document.querySelectorAll(".popup__button"),k=document.querySelector(".profile__edit-button"),x=document.querySelector(".profile__add-button"),A=document.forms["edit-profile"],w=A.querySelector(".popup__input_type_name"),T=A.querySelector(".popup__input_type_description"),U=document.forms["new-place"],I=U.querySelector(".popup__input_type_card-name"),j=U.querySelector(".popup__input_type_url"),B=document.forms["new-avatar"],O=B.querySelector(".popup__input_type_url"),D=document.forms["confirm-delete"],P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function M(e,t){e?(t.classList.add("popup__button_loading"),t.textContent="Сохранение"):(t.classList.remove("popup__button_loading"),t.textContent=t.dataset.originalText)}function N(e,t){c(S),q.alt="На картинке изображено: ".concat(e),L.textContent=e,q.src=t}function J(e){C.dataset.cardId=e,c(C),D.elements["delete-button"].focus()}E.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return a(t)}))})),k.addEventListener("click",(function(){w.value=p.textContent,T.value=f.textContent,c(v),s(A,P),w.focus()})),x.addEventListener("click",(function(){I.value="",j.value="",c(h),s(U,P),I.focus()})),_.addEventListener("click",(function(){O.value="",c(b),s(B,P),O.focus()})),A.addEventListener("submit",(function(n){n.preventDefault();var r=A.querySelector(".popup__button"),o={name:w.value,about:T.value};M(!0,r),function(n){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(n)}).then(t)}(o).then((function(e){p.textContent=e.name,f.textContent=e.about,a(v)})).catch((function(e){return console.error("Упс, ошибочка обновления профиля: ".concat(e))})).finally((function(){return M(!1,r)}))})),U.addEventListener("submit",(function(n){n.preventDefault();var c,u=U.querySelector(".popup__button"),i={name:I.value,link:j.value};M(!0,u),(c=i,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(c)}).then(t)).then((function(e){y.prepend(o(e,r,N,J)),U.reset(),a(h)})).catch((function(e){return console.error("Упс, ошибочка вышла: ".concat(e))})).finally((function(){return M(!1,u)}))})),B.addEventListener("submit",(function(n){n.preventDefault();var r=B.querySelector(".popup__button"),o={avatar:O.value};M(!0,r),function(n){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(n)}).then(t)}(o).then((function(e){_.style.backgroundImage="url(".concat(e.avatar,")"),a(b)})).catch((function(e){return console.error("Упс, ошибочка загрузки аватара: ".concat(e))})).finally((function(){return M(!1,r)}))})),D.addEventListener("submit",(function(n){n.preventDefault();var r=D.querySelector(".popup__button"),o=C.dataset.cardId,c=document.querySelector('[data-card-id="'.concat(o,'"]'));M(!0,r),function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(o).then((function(){c.remove(),a(C)})).catch((function(e){return console.error("Ошибка удаления:",e)})).finally((function(){return M(!1,r)}))})),g.forEach((function(e){e.dataset.originalText=e.textContent})),m.forEach((function(e){e.classList.add("popup_is-animated")})),n().then((function(e){p.textContent=e.name,f.textContent=e.about,_.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){return console.error("Упс, ошибочка вышла: ".concat(e))})),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){var n=t.querySelectorAll(e.inputSelector),r=t.querySelector(e.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error")),c=t.dataset.errorMessage;t.validity.patternMismatch?t.setCustomValidity(c):t.setCustomValidity(""),t.validity.valid?(t.classList.remove(n),o.classList.remove(r),o.textContent=""):(t.classList.add(n),o.classList.add(r),o.textContent=t.validationMessage)}(t,o,e.inputErrorClass,e.errorClass),l(n,r,e.inactiveButtonClass)}))})),l(n,r,e.inactiveButtonClass)}))}(P),Promise.all([fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t),n()]).then((function(e){var t,n,c=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],u=c[1];a.forEach((function(e){var t=u._id,n=e.owner._id;y.append(o(e,r,N,J,t,n))}))})).catch((function(e){return console.error("Упс, ошибочка вышла: ".concat(e))}))})();
//# sourceMappingURL=main.js.map