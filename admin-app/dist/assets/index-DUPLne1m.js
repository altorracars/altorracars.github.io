(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function wb(n){let e={...n};const t=new Set;function r(){return e}function s(a){const c=typeof a=="function"?a(e):a;c&&(e={...e,...c},t.forEach(u=>u(e)))}function i(a){return t.add(a),()=>t.delete(a)}return{get:r,set:s,subscribe:i}}const j=wb({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),wm="altorra-crm-theme";function Ib(){let n=localStorage.getItem(wm);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,j.set({theme:n})}function Eb(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(wm,n),j.set({theme:n}),n}var $h={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Im=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Tb=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},hu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|d>>6,_=d&63;u||(_=64,a||(g=64)),r.push(t[f],t[p],t[g],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Im(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Tb(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||p==null)throw new Ab;const g=i<<2|c>>4;if(r.push(g),d!==64){const _=c<<4&240|d>>2;if(r.push(_),p!==64){const v=d<<6&192|p;r.push(v)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ab extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Sb=function(n){const e=Im(n);return hu.encodeByteArray(e,!0)},uo=function(n){return Sb(n).replace(/\./g,"")},Em=function(n){try{return hu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rb=()=>Tm().__FIREBASE_DEFAULTS__,kb=()=>{if(typeof process>"u"||typeof $h>"u")return;const n=$h.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Cb=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Em(n[1]);return e&&JSON.parse(e)},Ho=()=>{try{return Rb()||kb()||Cb()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Am=n=>{var e,t;return(t=(e=Ho())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Sm=n=>{const e=Am(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Rm=()=>{var n;return(n=Ho())===null||n===void 0?void 0:n.config},km=n=>{var e;return(e=Ho())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xb(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[uo(JSON.stringify(t)),uo(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Pb(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(He())}function Nb(){var n;const e=(n=Ho())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Db(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Vb(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ob(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Lb(){const n=He();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Cm(){return!Nb()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ko(){try{return typeof indexedDB=="object"}catch{return!1}}function Mb(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fb="FirebaseError";class Ut extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Fb,Object.setPrototypeOf(this,Ut.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ps.prototype.create)}}class Ps{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Ub(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new Ut(s,c,r)}}function Ub(n,e){return n.replace(Bb,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Bb=/\{\$([^}]+)}/g;function $b(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ii(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(qh(i)&&qh(a)){if(!Ii(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function qh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function si(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ii(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function qb(n,e){const t=new jb(n,e);return t.subscribe.bind(t)}class jb{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");zb(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Yc),s.error===void 0&&(s.error=Yc),s.complete===void 0&&(s.complete=Yc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function zb(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Yc(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gb=1e3,Hb=2,Kb=4*60*60*1e3,Wb=.5;function Qb(n,e=Gb,t=Hb){const r=e*Math.pow(t,n),s=Math.round(Wb*r*(Math.random()-.5)*2);return Math.min(Kb,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(n){return n&&n._delegate?n._delegate:n}class Mt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yb{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new wi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xb(e))try{this.getOrInitializeService({instanceIdentifier:rr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=rr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rr){return this.instances.has(e)}getOptions(e=rr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Jb(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=rr){return this.component?this.component.multipleInstances?e:rr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Jb(n){return n===rr?void 0:n}function Xb(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zb{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Yb(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ge||(ge={}));const ew={debug:ge.DEBUG,verbose:ge.VERBOSE,info:ge.INFO,warn:ge.WARN,error:ge.ERROR,silent:ge.SILENT},tw=ge.INFO,nw={[ge.DEBUG]:"log",[ge.VERBOSE]:"log",[ge.INFO]:"info",[ge.WARN]:"warn",[ge.ERROR]:"error"},rw=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=nw[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Wo{constructor(e){this.name=e,this._logLevel=tw,this._logHandler=rw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ge))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?ew[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ge.DEBUG,...e),this._logHandler(this,ge.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ge.VERBOSE,...e),this._logHandler(this,ge.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ge.INFO,...e),this._logHandler(this,ge.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ge.WARN,...e),this._logHandler(this,ge.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ge.ERROR,...e),this._logHandler(this,ge.ERROR,...e)}}const sw=(n,e)=>e.some(t=>n instanceof t);let jh,zh;function iw(){return jh||(jh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function aw(){return zh||(zh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const xm=new WeakMap,vl=new WeakMap,Pm=new WeakMap,Jc=new WeakMap,fu=new WeakMap;function ow(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Pn(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&xm.set(t,n)}).catch(()=>{}),fu.set(e,n),e}function cw(n){if(vl.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});vl.set(n,e)}let yl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return vl.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Pm.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Pn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function lw(n){yl=n(yl)}function uw(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Xc(this),e,...t);return Pm.set(r,e.sort?e.sort():[e]),Pn(r)}:aw().includes(n)?function(...e){return n.apply(Xc(this),e),Pn(xm.get(this))}:function(...e){return Pn(n.apply(Xc(this),e))}}function dw(n){return typeof n=="function"?uw(n):(n instanceof IDBTransaction&&cw(n),sw(n,iw())?new Proxy(n,yl):n)}function Pn(n){if(n instanceof IDBRequest)return ow(n);if(Jc.has(n))return Jc.get(n);const e=dw(n);return e!==n&&(Jc.set(n,e),fu.set(e,n)),e}const Xc=n=>fu.get(n);function hw(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=Pn(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Pn(a.result),u.oldVersion,u.newVersion,Pn(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const fw=["get","getKey","getAll","getAllKeys","count"],pw=["put","add","delete","clear"],Zc=new Map;function Gh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Zc.get(e))return Zc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=pw.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||fw.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),s&&u.done]))[0]};return Zc.set(e,i),i}lw(n=>({...n,get:(e,t,r)=>Gh(e,t)||n.get(e,t,r),has:(e,t)=>!!Gh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(gw(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function gw(n){const e=n.getComponent();return e?.type==="VERSION"}const bl="@firebase/app",Hh="0.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=new Wo("@firebase/app"),_w="@firebase/app-compat",vw="@firebase/analytics-compat",yw="@firebase/analytics",bw="@firebase/app-check-compat",ww="@firebase/app-check",Iw="@firebase/auth",Ew="@firebase/auth-compat",Tw="@firebase/database",Aw="@firebase/data-connect",Sw="@firebase/database-compat",Rw="@firebase/functions",kw="@firebase/functions-compat",Cw="@firebase/installations",xw="@firebase/installations-compat",Pw="@firebase/messaging",Nw="@firebase/messaging-compat",Dw="@firebase/performance",Vw="@firebase/performance-compat",Ow="@firebase/remote-config",Lw="@firebase/remote-config-compat",Mw="@firebase/storage",Fw="@firebase/storage-compat",Uw="@firebase/firestore",Bw="@firebase/vertexai",$w="@firebase/firestore-compat",qw="firebase",jw="11.3.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl="[DEFAULT]",zw={[bl]:"fire-core",[_w]:"fire-core-compat",[yw]:"fire-analytics",[vw]:"fire-analytics-compat",[ww]:"fire-app-check",[bw]:"fire-app-check-compat",[Iw]:"fire-auth",[Ew]:"fire-auth-compat",[Tw]:"fire-rtdb",[Aw]:"fire-data-connect",[Sw]:"fire-rtdb-compat",[Rw]:"fire-fn",[kw]:"fire-fn-compat",[Cw]:"fire-iid",[xw]:"fire-iid-compat",[Pw]:"fire-fcm",[Nw]:"fire-fcm-compat",[Dw]:"fire-perf",[Vw]:"fire-perf-compat",[Ow]:"fire-rc",[Lw]:"fire-rc-compat",[Mw]:"fire-gcs",[Fw]:"fire-gcs-compat",[Uw]:"fire-fst",[$w]:"fire-fst-compat",[Bw]:"fire-vertex","fire-js":"fire-js",[qw]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho=new Map,Gw=new Map,Il=new Map;function Kh(n,e){try{n.container.addComponent(e)}catch(t){ln.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Yt(n){const e=n.name;if(Il.has(e))return ln.debug(`There were multiple attempts to register component ${e}.`),!1;Il.set(e,n);for(const t of ho.values())Kh(t,n);for(const t of Gw.values())Kh(t,n);return!0}function Dr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Et(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Nn=new Ps("app","Firebase",Hw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Mt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Nn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=jw;function Nm(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:wl,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Nn.create("bad-app-name",{appName:String(s)});if(t||(t=Rm()),!t)throw Nn.create("no-options");const i=ho.get(s);if(i){if(Ii(t,i.options)&&Ii(r,i.config))return i;throw Nn.create("duplicate-app",{appName:s})}const a=new Zb(s);for(const u of Il.values())a.addComponent(u);const c=new Kw(t,r,a);return ho.set(s,c),c}function Qo(n=wl){const e=ho.get(n);if(!e&&n===wl&&Rm())return Nm();if(!e)throw Nn.create("no-app",{appName:n});return e}function St(n,e,t){var r;let s=(r=zw[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ln.warn(c.join(" "));return}Yt(new Mt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ww="firebase-heartbeat-database",Qw=1,Ei="firebase-heartbeat-store";let el=null;function Dm(){return el||(el=hw(Ww,Qw,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ei)}catch(t){console.warn(t)}}}}).catch(n=>{throw Nn.create("idb-open",{originalErrorMessage:n.message})})),el}async function Yw(n){try{const t=(await Dm()).transaction(Ei),r=await t.objectStore(Ei).get(Vm(n));return await t.done,r}catch(e){if(e instanceof Ut)ln.warn(e.message);else{const t=Nn.create("idb-get",{originalErrorMessage:e?.message});ln.warn(t.message)}}}async function Wh(n,e){try{const r=(await Dm()).transaction(Ei,"readwrite");await r.objectStore(Ei).put(e,Vm(n)),await r.done}catch(t){if(t instanceof Ut)ln.warn(t.message);else{const r=Nn.create("idb-set",{originalErrorMessage:t?.message});ln.warn(r.message)}}}function Vm(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jw=1024,Xw=30;class Zw{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new tI(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Qh();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Xw){const a=nI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ln.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Qh(),{heartbeatsToSend:r,unsentEntries:s}=eI(this._heartbeatsCache.heartbeats),i=uo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return ln.warn(t),""}}}function Qh(){return new Date().toISOString().substring(0,10)}function eI(n,e=Jw){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Yh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Yh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class tI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ko()?Mb().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Yw(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Yh(n){return uo(JSON.stringify({version:2,heartbeats:n})).length}function nI(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rI(n){Yt(new Mt("platform-logger",e=>new mw(e),"PRIVATE")),Yt(new Mt("heartbeat",e=>new Zw(e),"PRIVATE")),St(bl,Hh,n),St(bl,Hh,"esm2017"),St("fire-js","")}rI("");function pu(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Om(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const sI=Om,Lm=new Ps("auth","Firebase",Om());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=new Wo("@firebase/auth");function iI(n,...e){fo.logLevel<=ge.WARN&&fo.warn(`Auth (${Vr}): ${n}`,...e)}function za(n,...e){fo.logLevel<=ge.ERROR&&fo.error(`Auth (${Vr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(n,...e){throw mu(n,...e)}function Kt(n,...e){return mu(n,...e)}function Mm(n,e,t){const r=Object.assign(Object.assign({},sI()),{[e]:t});return new Ps("auth","Firebase",r).create(e,{appName:n.name})}function Dn(n){return Mm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function mu(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Lm.create(n,...e)}function oe(n,e,...t){if(!n)throw mu(e,...t)}function sn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw za(e),new Error(e)}function un(n,e){n||sn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function El(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function aI(){return Jh()==="http:"||Jh()==="https:"}function Jh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(aI()||Vb()||"connection"in navigator)?navigator.onLine:!0}function cI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(e,t){this.shortDelay=e,this.longDelay=t,un(t>e,"Short delay should be less than long delay!"),this.isMobile=Pb()||Ob()}get(){return oI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(n,e){un(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;sn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;sn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;sn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uI=new Ki(3e4,6e4);function Or(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function jn(n,e,t,r,s={}){return Um(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Hi(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},i);return Db()||(d.referrerPolicy="no-referrer"),Fm.fetch()(Bm(n,n.config.apiHost,t,c),d)})}async function Um(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},lI),e);try{const s=new hI(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Aa(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Aa(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Aa(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Aa(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Mm(n,f,d);Ft(n,f)}}catch(s){if(s instanceof Ut)throw s;Ft(n,"network-request-failed",{message:String(s)})}}async function Yo(n,e,t,r,s={}){const i=await jn(n,e,t,r,s);return"mfaPendingCredential"in i&&Ft(n,"multi-factor-auth-required",{_serverResponse:i}),i}function Bm(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?gu(n.config,s):`${n.config.apiScheme}://${s}`}function dI(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class hI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Kt(this.auth,"network-request-failed")),uI.get())})}}function Aa(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Kt(n,e,r);return s.customData._tokenResponse=t,s}function Xh(n){return n!==void 0&&n.enterprise!==void 0}class fI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return dI(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function pI(n,e){return jn(n,"GET","/v2/recaptchaConfig",Or(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mI(n,e){return jn(n,"POST","/v1/accounts:delete",e)}async function $m(n,e){return jn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function gI(n,e=!1){const t=Te(n),r=await t.getIdToken(e),s=_u(r);oe(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:di(tl(s.auth_time)),issuedAtTime:di(tl(s.iat)),expirationTime:di(tl(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function tl(n){return Number(n)*1e3}function _u(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return za("JWT malformed, contained fewer than 3 sections"),null;try{const s=Em(t);return s?JSON.parse(s):(za("Failed to decode base64 JWT payload"),null)}catch(s){return za("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Zh(n){const e=_u(n);return oe(e,"internal-error"),oe(typeof e.exp<"u","internal-error"),oe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ti(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ut&&_I(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function _I({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=di(this.lastLoginAt),this.creationTime=di(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function po(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Ti(n,$m(t,{idToken:r}));oe(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?qm(i.providerUserInfo):[],c=bI(n.providerData,a),u=n.isAnonymous,d=!(n.email&&i.passwordHash)&&!c?.length,f=u?d:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new Tl(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function yI(n){const e=Te(n);await po(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bI(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function qm(n){return n.map(e=>{var{providerId:t}=e,r=pu(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wI(n,e){const t=await Um(n,{},async()=>{const r=Hi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=Bm(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Fm.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function II(n,e){return jn(n,"POST","/v2/accounts:revokeToken",Or(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){oe(e.idToken,"internal-error"),oe(typeof e.idToken<"u","internal-error"),oe(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Zh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){oe(e.length!==0,"internal-error");const t=Zh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(oe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await wI(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new ss;return r&&(oe(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(oe(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(oe(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ss,this.toJSON())}_performRefresh(){return sn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yn(n,e){oe(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class an{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=pu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Tl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Ti(this,this.stsTokenManager.getToken(this.auth,e));return oe(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return gI(this,e)}reload(){return yI(this)}_assign(e){this!==e&&(oe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new an(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){oe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await po(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Et(this.auth.app))return Promise.reject(Dn(this.auth));const e=await this.getIdToken();return await Ti(this,mI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,c,u,d,f;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,_=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,v=(a=t.photoURL)!==null&&a!==void 0?a:void 0,S=(c=t.tenantId)!==null&&c!==void 0?c:void 0,T=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,D=(d=t.createdAt)!==null&&d!==void 0?d:void 0,k=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:x,emailVerified:L,isAnonymous:C,providerData:M,stsTokenManager:E}=t;oe(x&&E,e,"internal-error");const y=ss.fromJSON(this.name,E);oe(typeof x=="string",e,"internal-error"),yn(p,e.name),yn(g,e.name),oe(typeof L=="boolean",e,"internal-error"),oe(typeof C=="boolean",e,"internal-error"),yn(_,e.name),yn(v,e.name),yn(S,e.name),yn(T,e.name),yn(D,e.name),yn(k,e.name);const w=new an({uid:x,auth:e,email:g,emailVerified:L,displayName:p,isAnonymous:C,photoURL:v,phoneNumber:_,tenantId:S,stsTokenManager:y,createdAt:D,lastLoginAt:k});return M&&Array.isArray(M)&&(w.providerData=M.map(R=>Object.assign({},R))),T&&(w._redirectEventId=T),w}static async _fromIdTokenResponse(e,t,r=!1){const s=new ss;s.updateFromServerResponse(t);const i=new an({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await po(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];oe(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?qm(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new ss;c.updateFromIdToken(r);const u=new an({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Tl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef=new Map;function on(n){un(n instanceof Function,"Expected a class definition");let e=ef.get(n);return e?(un(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ef.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}jm.type="NONE";const tf=jm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(n,e,t){return`firebase:${n}:${e}:${t}`}class is{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ga(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ga("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?an._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new is(on(tf),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||on(tf);const a=Ga(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){const p=an._fromJSON(e,f);d!==i&&(c=p),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new is(i,e,r):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new is(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nf(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Km(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Qm(e))return"Blackberry";if(Ym(e))return"Webos";if(Gm(e))return"Safari";if((e.includes("chrome/")||Hm(e))&&!e.includes("edge/"))return"Chrome";if(Wm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function zm(n=He()){return/firefox\//i.test(n)}function Gm(n=He()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Hm(n=He()){return/crios\//i.test(n)}function Km(n=He()){return/iemobile/i.test(n)}function Wm(n=He()){return/android/i.test(n)}function Qm(n=He()){return/blackberry/i.test(n)}function Ym(n=He()){return/webos/i.test(n)}function vu(n=He()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function EI(n=He()){var e;return vu(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function TI(){return Lb()&&document.documentMode===10}function Jm(n=He()){return vu(n)||Wm(n)||Ym(n)||Qm(n)||/windows phone/i.test(n)||Km(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xm(n,e=[]){let t;switch(n){case"Browser":t=nf(He());break;case"Worker":t=`${nf(He())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Vr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SI(n,e={}){return jn(n,"GET","/v2/passwordPolicy",Or(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RI=6;class kI{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:RI,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CI{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new rf(this),this.idTokenSubscription=new rf(this),this.beforeStateQueue=new AI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Lm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=on(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await is.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await $m(this,{idToken:e}),r=await an._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Et(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&u?.user&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return oe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await po(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=cI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Et(this.app))return Promise.reject(Dn(this));const t=e?Te(e):null;return t&&oe(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&oe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Et(this.app)?Promise.reject(Dn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Et(this.app)?Promise.reject(Dn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(on(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await SI(this),t=new kI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ps("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await II(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&on(e)||this._popupRedirectResolver;oe(t,this,"argument-error"),this.redirectPersistenceManager=await is.create(this,[on(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(oe(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return oe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Xm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Et(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&iI(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Ns(n){return Te(n)}class rf{constructor(e){this.auth=e,this.observer=null,this.addObserver=qb(t=>this.observer=t)}get next(){return oe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function xI(n){Jo=n}function Zm(n){return Jo.loadJS(n)}function PI(){return Jo.recaptchaEnterpriseScript}function NI(){return Jo.gapiScript}function DI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class VI{constructor(){this.enterprise=new OI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class OI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const LI="recaptcha-enterprise",eg="NO_RECAPTCHA";class MI{constructor(e){this.type=LI,this.auth=Ns(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{pI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new fI(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(u=>{c(u)})})}function s(i,a,c){const u=window.grecaptcha;Xh(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(eg)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new VI().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&Xh(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=PI();u.length!==0&&(u+=c),Zm(u).then(()=>{s(c,i,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function sf(n,e,t,r=!1,s=!1){const i=new MI(n);let a;if(s)a=eg;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function af(n,e,t,r,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await sf(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await sf(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FI(n,e){const t=Dr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Ii(i,e??{}))return s;Ft(s,"already-initialized")}return t.initialize({options:e})}function UI(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(on);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function BI(n,e,t){const r=Ns(n);oe(r._canInitEmulator,r,"emulator-config-failed"),oe(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=tg(e),{host:a,port:c}=$I(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),qI()}function tg(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function $I(n){const e=tg(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:of(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:of(a)}}}function of(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function qI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return sn("not implemented")}_getIdTokenResponse(e){return sn("not implemented")}_linkToIdToken(e,t){return sn("not implemented")}_getReauthenticationResolver(e){return sn("not implemented")}}async function jI(n,e){return jn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zI(n,e){return Yo(n,"POST","/v1/accounts:signInWithPassword",Or(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GI(n,e){return Yo(n,"POST","/v1/accounts:signInWithEmailLink",Or(n,e))}async function HI(n,e){return Yo(n,"POST","/v1/accounts:signInWithEmailLink",Or(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai extends yu{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Ai(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Ai(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return af(e,t,"signInWithPassword",zI);case"emailLink":return GI(e,{email:this._email,oobCode:this._password});default:Ft(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return af(e,r,"signUpPassword",jI);case"emailLink":return HI(e,{idToken:t,email:this._email,oobCode:this._password});default:Ft(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function as(n,e){return Yo(n,"POST","/v1/accounts:signInWithIdp",Or(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KI="http://localhost";class wr extends yu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new wr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ft("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=pu(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new wr(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return as(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,as(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,as(e,t)}buildRequest(){const e={requestUri:KI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Hi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WI(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function QI(n){const e=si(ii(n)).link,t=e?si(ii(e)).deep_link_id:null,r=si(ii(n)).deep_link_id;return(r?si(ii(r)).link:null)||r||t||e||n}class bu{constructor(e){var t,r,s,i,a,c;const u=si(ii(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,p=WI((s=u.mode)!==null&&s!==void 0?s:null);oe(d&&f&&p,"argument-error"),this.apiKey=d,this.operation=p,this.code=f,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(a=u.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=QI(e);try{return new bu(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(){this.providerId=Ds.PROVIDER_ID}static credential(e,t){return Ai._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=bu.parseLink(t);return oe(r,"argument-error"),Ai._fromEmailAndCode(e,r.code,r.tenantId)}}Ds.PROVIDER_ID="password";Ds.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ds.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi extends ng{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn extends Wi{constructor(){super("facebook.com")}static credential(e){return wr._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Tn.credential(e.oauthAccessToken)}catch{return null}}}Tn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Tn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An extends Wi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return wr._fromParams({providerId:An.PROVIDER_ID,signInMethod:An.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return An.credentialFromTaggedObject(e)}static credentialFromError(e){return An.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return An.credential(t,r)}catch{return null}}}An.GOOGLE_SIGN_IN_METHOD="google.com";An.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends Wi{constructor(){super("github.com")}static credential(e){return wr._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Sn.credentialFromTaggedObject(e)}static credentialFromError(e){return Sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Sn.credential(e.oauthAccessToken)}catch{return null}}}Sn.GITHUB_SIGN_IN_METHOD="github.com";Sn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn extends Wi{constructor(){super("twitter.com")}static credential(e,t){return wr._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Rn.credential(t,r)}catch{return null}}}Rn.TWITTER_SIGN_IN_METHOD="twitter.com";Rn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await an._fromIdTokenResponse(e,r,s),a=cf(r);return new hs({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=cf(r);return new hs({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function cf(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo extends Ut{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,mo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new mo(e,t,r,s)}}function rg(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?mo._fromErrorAndOperation(n,i,e,r):i})}async function YI(n,e,t=!1){const r=await Ti(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return hs._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JI(n,e,t=!1){const{auth:r}=n;if(Et(r.app))return Promise.reject(Dn(r));const s="reauthenticate";try{const i=await Ti(n,rg(r,s,e,n),t);oe(i.idToken,r,"internal-error");const a=_u(i.idToken);oe(a,r,"internal-error");const{sub:c}=a;return oe(n.uid===c,r,"user-mismatch"),hs._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Ft(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sg(n,e,t=!1){if(Et(n.app))return Promise.reject(Dn(n));const r="signIn",s=await rg(n,r,e),i=await hs._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function XI(n,e){return sg(Ns(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ZI(n){const e=Ns(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function eE(n,e,t){return Et(n.app)?Promise.reject(Dn(n)):XI(Te(n),Ds.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&ZI(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tE(n,e){return Te(n).setPersistence(e)}function nE(n,e,t,r){return Te(n).onIdTokenChanged(e,t,r)}function rE(n,e,t){return Te(n).beforeAuthStateChanged(e,t)}function sE(n,e,t,r){return Te(n).onAuthStateChanged(e,t,r)}function ig(n){return Te(n).signOut()}const go="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(go,"1"),this.storage.removeItem(go),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iE=1e3,aE=10;class og extends ag{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Jm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);TI()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,aE):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},iE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}og.type="LOCAL";const cg=og;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg extends ag{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}lg.type="SESSION";const ug=lg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oE(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Xo(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async d=>d(t.origin,i)),u=await oE(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Xo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wu(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const d=wu("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===d)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wt(){return window}function lE(n){Wt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dg(){return typeof Wt().WorkerGlobalScope<"u"&&typeof Wt().importScripts=="function"}async function uE(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function dE(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function hE(){return dg()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hg="firebaseLocalStorageDb",fE=1,_o="firebaseLocalStorage",fg="fbase_key";class Qi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Zo(n,e){return n.transaction([_o],e?"readwrite":"readonly").objectStore(_o)}function pE(){const n=indexedDB.deleteDatabase(hg);return new Qi(n).toPromise()}function Al(){const n=indexedDB.open(hg,fE);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(_o,{keyPath:fg})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(_o)?e(r):(r.close(),await pE(),e(await Al()))})})}async function lf(n,e,t){const r=Zo(n,!0).put({[fg]:e,value:t});return new Qi(r).toPromise()}async function mE(n,e){const t=Zo(n,!1).get(e),r=await new Qi(t).toPromise();return r===void 0?null:r.value}function uf(n,e){const t=Zo(n,!0).delete(e);return new Qi(t).toPromise()}const gE=800,_E=3;class pg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Al(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>_E)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return dg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Xo._getInstance(hE()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await uE(),!this.activeServiceWorker)return;this.sender=new cE(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||dE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Al();return await lf(e,go,"1"),await uf(e,go),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>lf(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>mE(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>uf(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Zo(s,!1).getAll();return new Qi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),gE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}pg.type="LOCAL";const vE=pg;new Ki(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yE(n,e){return e?on(e):(oe(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu extends yu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return as(e,this._buildIdpRequest())}_linkToIdToken(e,t){return as(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return as(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function bE(n){return sg(n.auth,new Iu(n),n.bypassAuthState)}function wE(n){const{auth:e,user:t}=n;return oe(t,e,"internal-error"),JI(t,new Iu(n),n.bypassAuthState)}async function IE(n){const{auth:e,user:t}=n;return oe(t,e,"internal-error"),YI(t,new Iu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return bE;case"linkViaPopup":case"linkViaRedirect":return IE;case"reauthViaPopup":case"reauthViaRedirect":return wE;default:Ft(this.auth,"internal-error")}}resolve(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EE=new Ki(2e3,1e4);class ns extends mg{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ns.currentPopupAction&&ns.currentPopupAction.cancel(),ns.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return oe(e,this.auth,"internal-error"),e}async onExecution(){un(this.filter.length===1,"Popup operations only handle one event");const e=wu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Kt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Kt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ns.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Kt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,EE.get())};e()}}ns.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TE="pendingRedirect",Ha=new Map;class AE extends mg{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ha.get(this.auth._key());if(!e){try{const r=await SE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ha.set(this.auth._key(),e)}return this.bypassAuthState||Ha.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function SE(n,e){const t=CE(e),r=kE(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function RE(n,e){Ha.set(n._key(),e)}function kE(n){return on(n._redirectPersistence)}function CE(n){return Ga(TE,n.config.apiKey,n.name)}async function xE(n,e,t=!1){if(Et(n.app))return Promise.reject(Dn(n));const r=Ns(n),s=yE(r,e),a=await new AE(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PE=10*60*1e3;class NE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!DE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!gg(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Kt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=PE&&this.cachedEventUids.clear(),this.cachedEventUids.has(df(e))}saveEventToCache(e){this.cachedEventUids.add(df(e)),this.lastProcessedEventTime=Date.now()}}function df(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function gg({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function DE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return gg(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VE(n,e={}){return jn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,LE=/^https?/;async function ME(n){if(n.config.emulator)return;const{authorizedDomains:e}=await VE(n);for(const t of e)try{if(FE(t))return}catch{}Ft(n,"unauthorized-domain")}function FE(n){const e=El(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!LE.test(t))return!1;if(OE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UE=new Ki(3e4,6e4);function hf(){const n=Wt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function BE(n){return new Promise((e,t)=>{var r,s,i;function a(){hf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{hf(),t(Kt(n,"network-request-failed"))},timeout:UE.get()})}if(!((s=(r=Wt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Wt().gapi)===null||i===void 0)&&i.load)a();else{const c=DI("iframefcb");return Wt()[c]=()=>{gapi.load?a():t(Kt(n,"network-request-failed"))},Zm(`${NI()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ka=null,e})}let Ka=null;function $E(n){return Ka=Ka||BE(n),Ka}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qE=new Ki(5e3,15e3),jE="__/auth/iframe",zE="emulator/auth/iframe",GE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},HE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function KE(n){const e=n.config;oe(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?gu(e,zE):`https://${n.config.authDomain}/${jE}`,r={apiKey:e.apiKey,appName:n.name,v:Vr},s=HE.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Hi(r).slice(1)}`}async function WE(n){const e=await $E(n),t=Wt().gapi;return oe(t,n,"internal-error"),e.open({where:document.body,url:KE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:GE,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Kt(n,"network-request-failed"),c=Wt().setTimeout(()=>{i(a)},qE.get());function u(){Wt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},YE=500,JE=600,XE="_blank",ZE="http://localhost";class ff{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function eT(n,e,t,r=YE,s=JE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},QE),{width:r.toString(),height:s.toString(),top:i,left:a}),d=He().toLowerCase();t&&(c=Hm(d)?XE:t),zm(d)&&(e=e||ZE,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[_,v])=>`${g}${_}=${v},`,"");if(EI(d)&&c!=="_self")return tT(e||"",c),new ff(null);const p=window.open(e||"",c,f);oe(p,n,"popup-blocked");try{p.focus()}catch{}return new ff(p)}function tT(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nT="__/auth/handler",rT="emulator/auth/handler",sT=encodeURIComponent("fac");async function pf(n,e,t,r,s,i){oe(n.config.authDomain,n,"auth-domain-config-required"),oe(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Vr,eventId:s};if(e instanceof ng){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",$b(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Wi){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${sT}=${encodeURIComponent(u)}`:"";return`${iT(n)}?${Hi(c).slice(1)}${d}`}function iT({config:n}){return n.emulator?gu(n,rT):`https://${n.authDomain}/${nT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl="webStorageSupport";class aT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ug,this._completeRedirectFn=xE,this._overrideRedirectResult=RE}async _openPopup(e,t,r,s){var i;un((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await pf(e,t,r,El(),s);return eT(e,a,wu())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await pf(e,t,r,El(),s);return lE(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(un(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await WE(e),r=new NE(e);return t.register("authEvent",s=>(oe(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(nl,{type:nl},s=>{var i;const a=(i=s?.[0])===null||i===void 0?void 0:i[nl];a!==void 0&&t(!!a),Ft(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=ME(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Jm()||Gm()||vu()}}const oT=aT;var mf="@firebase/auth",gf="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){oe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function uT(n){Yt(new Mt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;oe(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Xm(n)},d=new CI(r,s,i,u);return UI(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Yt(new Mt("auth-internal",e=>{const t=Ns(e.getProvider("auth").getImmediate());return(r=>new cT(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),St(mf,gf,lT(n)),St(mf,gf,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dT=5*60,hT=km("authIdTokenMaxAge")||dT;let _f=null;const fT=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>hT)return;const s=t?.token;_f!==s&&(_f=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function pT(n=Qo()){const e=Dr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=FI(n,{popupRedirectResolver:oT,persistence:[vE,cg,ug]}),r=km("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=fT(i.toString());rE(t,a,()=>a(t.currentUser)),nE(t,c=>a(c))}}const s=Am("auth");return s&&BI(t,`http://${s}`),t}function mT(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}xI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Kt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",mT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});uT("Browser");var vf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Vn,_g;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,y){function w(){}w.prototype=y.prototype,E.D=y.prototype,E.prototype=new w,E.prototype.constructor=E,E.C=function(R,I,P){for(var A=Array(arguments.length-2),le=2;le<arguments.length;le++)A[le-2]=arguments[le];return y.prototype[I].apply(R,A)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,y,w){w||(w=0);var R=Array(16);if(typeof y=="string")for(var I=0;16>I;++I)R[I]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(I=0;16>I;++I)R[I]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=E.g[0],w=E.g[1],I=E.g[2];var P=E.g[3],A=y+(P^w&(I^P))+R[0]+3614090360&4294967295;y=w+(A<<7&4294967295|A>>>25),A=P+(I^y&(w^I))+R[1]+3905402710&4294967295,P=y+(A<<12&4294967295|A>>>20),A=I+(w^P&(y^w))+R[2]+606105819&4294967295,I=P+(A<<17&4294967295|A>>>15),A=w+(y^I&(P^y))+R[3]+3250441966&4294967295,w=I+(A<<22&4294967295|A>>>10),A=y+(P^w&(I^P))+R[4]+4118548399&4294967295,y=w+(A<<7&4294967295|A>>>25),A=P+(I^y&(w^I))+R[5]+1200080426&4294967295,P=y+(A<<12&4294967295|A>>>20),A=I+(w^P&(y^w))+R[6]+2821735955&4294967295,I=P+(A<<17&4294967295|A>>>15),A=w+(y^I&(P^y))+R[7]+4249261313&4294967295,w=I+(A<<22&4294967295|A>>>10),A=y+(P^w&(I^P))+R[8]+1770035416&4294967295,y=w+(A<<7&4294967295|A>>>25),A=P+(I^y&(w^I))+R[9]+2336552879&4294967295,P=y+(A<<12&4294967295|A>>>20),A=I+(w^P&(y^w))+R[10]+4294925233&4294967295,I=P+(A<<17&4294967295|A>>>15),A=w+(y^I&(P^y))+R[11]+2304563134&4294967295,w=I+(A<<22&4294967295|A>>>10),A=y+(P^w&(I^P))+R[12]+1804603682&4294967295,y=w+(A<<7&4294967295|A>>>25),A=P+(I^y&(w^I))+R[13]+4254626195&4294967295,P=y+(A<<12&4294967295|A>>>20),A=I+(w^P&(y^w))+R[14]+2792965006&4294967295,I=P+(A<<17&4294967295|A>>>15),A=w+(y^I&(P^y))+R[15]+1236535329&4294967295,w=I+(A<<22&4294967295|A>>>10),A=y+(I^P&(w^I))+R[1]+4129170786&4294967295,y=w+(A<<5&4294967295|A>>>27),A=P+(w^I&(y^w))+R[6]+3225465664&4294967295,P=y+(A<<9&4294967295|A>>>23),A=I+(y^w&(P^y))+R[11]+643717713&4294967295,I=P+(A<<14&4294967295|A>>>18),A=w+(P^y&(I^P))+R[0]+3921069994&4294967295,w=I+(A<<20&4294967295|A>>>12),A=y+(I^P&(w^I))+R[5]+3593408605&4294967295,y=w+(A<<5&4294967295|A>>>27),A=P+(w^I&(y^w))+R[10]+38016083&4294967295,P=y+(A<<9&4294967295|A>>>23),A=I+(y^w&(P^y))+R[15]+3634488961&4294967295,I=P+(A<<14&4294967295|A>>>18),A=w+(P^y&(I^P))+R[4]+3889429448&4294967295,w=I+(A<<20&4294967295|A>>>12),A=y+(I^P&(w^I))+R[9]+568446438&4294967295,y=w+(A<<5&4294967295|A>>>27),A=P+(w^I&(y^w))+R[14]+3275163606&4294967295,P=y+(A<<9&4294967295|A>>>23),A=I+(y^w&(P^y))+R[3]+4107603335&4294967295,I=P+(A<<14&4294967295|A>>>18),A=w+(P^y&(I^P))+R[8]+1163531501&4294967295,w=I+(A<<20&4294967295|A>>>12),A=y+(I^P&(w^I))+R[13]+2850285829&4294967295,y=w+(A<<5&4294967295|A>>>27),A=P+(w^I&(y^w))+R[2]+4243563512&4294967295,P=y+(A<<9&4294967295|A>>>23),A=I+(y^w&(P^y))+R[7]+1735328473&4294967295,I=P+(A<<14&4294967295|A>>>18),A=w+(P^y&(I^P))+R[12]+2368359562&4294967295,w=I+(A<<20&4294967295|A>>>12),A=y+(w^I^P)+R[5]+4294588738&4294967295,y=w+(A<<4&4294967295|A>>>28),A=P+(y^w^I)+R[8]+2272392833&4294967295,P=y+(A<<11&4294967295|A>>>21),A=I+(P^y^w)+R[11]+1839030562&4294967295,I=P+(A<<16&4294967295|A>>>16),A=w+(I^P^y)+R[14]+4259657740&4294967295,w=I+(A<<23&4294967295|A>>>9),A=y+(w^I^P)+R[1]+2763975236&4294967295,y=w+(A<<4&4294967295|A>>>28),A=P+(y^w^I)+R[4]+1272893353&4294967295,P=y+(A<<11&4294967295|A>>>21),A=I+(P^y^w)+R[7]+4139469664&4294967295,I=P+(A<<16&4294967295|A>>>16),A=w+(I^P^y)+R[10]+3200236656&4294967295,w=I+(A<<23&4294967295|A>>>9),A=y+(w^I^P)+R[13]+681279174&4294967295,y=w+(A<<4&4294967295|A>>>28),A=P+(y^w^I)+R[0]+3936430074&4294967295,P=y+(A<<11&4294967295|A>>>21),A=I+(P^y^w)+R[3]+3572445317&4294967295,I=P+(A<<16&4294967295|A>>>16),A=w+(I^P^y)+R[6]+76029189&4294967295,w=I+(A<<23&4294967295|A>>>9),A=y+(w^I^P)+R[9]+3654602809&4294967295,y=w+(A<<4&4294967295|A>>>28),A=P+(y^w^I)+R[12]+3873151461&4294967295,P=y+(A<<11&4294967295|A>>>21),A=I+(P^y^w)+R[15]+530742520&4294967295,I=P+(A<<16&4294967295|A>>>16),A=w+(I^P^y)+R[2]+3299628645&4294967295,w=I+(A<<23&4294967295|A>>>9),A=y+(I^(w|~P))+R[0]+4096336452&4294967295,y=w+(A<<6&4294967295|A>>>26),A=P+(w^(y|~I))+R[7]+1126891415&4294967295,P=y+(A<<10&4294967295|A>>>22),A=I+(y^(P|~w))+R[14]+2878612391&4294967295,I=P+(A<<15&4294967295|A>>>17),A=w+(P^(I|~y))+R[5]+4237533241&4294967295,w=I+(A<<21&4294967295|A>>>11),A=y+(I^(w|~P))+R[12]+1700485571&4294967295,y=w+(A<<6&4294967295|A>>>26),A=P+(w^(y|~I))+R[3]+2399980690&4294967295,P=y+(A<<10&4294967295|A>>>22),A=I+(y^(P|~w))+R[10]+4293915773&4294967295,I=P+(A<<15&4294967295|A>>>17),A=w+(P^(I|~y))+R[1]+2240044497&4294967295,w=I+(A<<21&4294967295|A>>>11),A=y+(I^(w|~P))+R[8]+1873313359&4294967295,y=w+(A<<6&4294967295|A>>>26),A=P+(w^(y|~I))+R[15]+4264355552&4294967295,P=y+(A<<10&4294967295|A>>>22),A=I+(y^(P|~w))+R[6]+2734768916&4294967295,I=P+(A<<15&4294967295|A>>>17),A=w+(P^(I|~y))+R[13]+1309151649&4294967295,w=I+(A<<21&4294967295|A>>>11),A=y+(I^(w|~P))+R[4]+4149444226&4294967295,y=w+(A<<6&4294967295|A>>>26),A=P+(w^(y|~I))+R[11]+3174756917&4294967295,P=y+(A<<10&4294967295|A>>>22),A=I+(y^(P|~w))+R[2]+718787259&4294967295,I=P+(A<<15&4294967295|A>>>17),A=w+(P^(I|~y))+R[9]+3951481745&4294967295,E.g[0]=E.g[0]+y&4294967295,E.g[1]=E.g[1]+(I+(A<<21&4294967295|A>>>11))&4294967295,E.g[2]=E.g[2]+I&4294967295,E.g[3]=E.g[3]+P&4294967295}r.prototype.u=function(E,y){y===void 0&&(y=E.length);for(var w=y-this.blockSize,R=this.B,I=this.h,P=0;P<y;){if(I==0)for(;P<=w;)s(this,E,P),P+=this.blockSize;if(typeof E=="string"){for(;P<y;)if(R[I++]=E.charCodeAt(P++),I==this.blockSize){s(this,R),I=0;break}}else for(;P<y;)if(R[I++]=E[P++],I==this.blockSize){s(this,R),I=0;break}}this.h=I,this.o+=y},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var y=1;y<E.length-8;++y)E[y]=0;var w=8*this.o;for(y=E.length-8;y<E.length;++y)E[y]=w&255,w/=256;for(this.u(E),E=Array(16),y=w=0;4>y;++y)for(var R=0;32>R;R+=8)E[w++]=this.g[y]>>>R&255;return E};function i(E,y){var w=c;return Object.prototype.hasOwnProperty.call(w,E)?w[E]:w[E]=y(E)}function a(E,y){this.h=y;for(var w=[],R=!0,I=E.length-1;0<=I;I--){var P=E[I]|0;R&&P==y||(w[I]=P,R=!1)}this.g=w}var c={};function u(E){return-128<=E&&128>E?i(E,function(y){return new a([y|0],0>y?-1:0)}):new a([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return p;if(0>E)return T(d(-E));for(var y=[],w=1,R=0;E>=w;R++)y[R]=E/w|0,w*=4294967296;return new a(y,0)}function f(E,y){if(E.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(E.charAt(0)=="-")return T(f(E.substring(1),y));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=d(Math.pow(y,8)),R=p,I=0;I<E.length;I+=8){var P=Math.min(8,E.length-I),A=parseInt(E.substring(I,I+P),y);8>P?(P=d(Math.pow(y,P)),R=R.j(P).add(d(A))):(R=R.j(w),R=R.add(d(A)))}return R}var p=u(0),g=u(1),_=u(16777216);n=a.prototype,n.m=function(){if(S(this))return-T(this).m();for(var E=0,y=1,w=0;w<this.g.length;w++){var R=this.i(w);E+=(0<=R?R:4294967296+R)*y,y*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(v(this))return"0";if(S(this))return"-"+T(this).toString(E);for(var y=d(Math.pow(E,6)),w=this,R="";;){var I=L(w,y).g;w=D(w,I.j(y));var P=((0<w.g.length?w.g[0]:w.h)>>>0).toString(E);if(w=I,v(w))return P+R;for(;6>P.length;)P="0"+P;R=P+R}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function v(E){if(E.h!=0)return!1;for(var y=0;y<E.g.length;y++)if(E.g[y]!=0)return!1;return!0}function S(E){return E.h==-1}n.l=function(E){return E=D(this,E),S(E)?-1:v(E)?0:1};function T(E){for(var y=E.g.length,w=[],R=0;R<y;R++)w[R]=~E.g[R];return new a(w,~E.h).add(g)}n.abs=function(){return S(this)?T(this):this},n.add=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],R=0,I=0;I<=y;I++){var P=R+(this.i(I)&65535)+(E.i(I)&65535),A=(P>>>16)+(this.i(I)>>>16)+(E.i(I)>>>16);R=A>>>16,P&=65535,A&=65535,w[I]=A<<16|P}return new a(w,w[w.length-1]&-2147483648?-1:0)};function D(E,y){return E.add(T(y))}n.j=function(E){if(v(this)||v(E))return p;if(S(this))return S(E)?T(this).j(T(E)):T(T(this).j(E));if(S(E))return T(this.j(T(E)));if(0>this.l(_)&&0>E.l(_))return d(this.m()*E.m());for(var y=this.g.length+E.g.length,w=[],R=0;R<2*y;R++)w[R]=0;for(R=0;R<this.g.length;R++)for(var I=0;I<E.g.length;I++){var P=this.i(R)>>>16,A=this.i(R)&65535,le=E.i(I)>>>16,pe=E.i(I)&65535;w[2*R+2*I]+=A*pe,k(w,2*R+2*I),w[2*R+2*I+1]+=P*pe,k(w,2*R+2*I+1),w[2*R+2*I+1]+=A*le,k(w,2*R+2*I+1),w[2*R+2*I+2]+=P*le,k(w,2*R+2*I+2)}for(R=0;R<y;R++)w[R]=w[2*R+1]<<16|w[2*R];for(R=y;R<2*y;R++)w[R]=0;return new a(w,0)};function k(E,y){for(;(E[y]&65535)!=E[y];)E[y+1]+=E[y]>>>16,E[y]&=65535,y++}function x(E,y){this.g=E,this.h=y}function L(E,y){if(v(y))throw Error("division by zero");if(v(E))return new x(p,p);if(S(E))return y=L(T(E),y),new x(T(y.g),T(y.h));if(S(y))return y=L(E,T(y)),new x(T(y.g),y.h);if(30<E.g.length){if(S(E)||S(y))throw Error("slowDivide_ only works with positive integers.");for(var w=g,R=y;0>=R.l(E);)w=C(w),R=C(R);var I=M(w,1),P=M(R,1);for(R=M(R,2),w=M(w,2);!v(R);){var A=P.add(R);0>=A.l(E)&&(I=I.add(w),P=A),R=M(R,1),w=M(w,1)}return y=D(E,I.j(y)),new x(I,y)}for(I=p;0<=E.l(y);){for(w=Math.max(1,Math.floor(E.m()/y.m())),R=Math.ceil(Math.log(w)/Math.LN2),R=48>=R?1:Math.pow(2,R-48),P=d(w),A=P.j(y);S(A)||0<A.l(E);)w-=R,P=d(w),A=P.j(y);v(P)&&(P=g),I=I.add(P),E=D(E,A)}return new x(I,E)}n.A=function(E){return L(this,E).h},n.and=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],R=0;R<y;R++)w[R]=this.i(R)&E.i(R);return new a(w,this.h&E.h)},n.or=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],R=0;R<y;R++)w[R]=this.i(R)|E.i(R);return new a(w,this.h|E.h)},n.xor=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],R=0;R<y;R++)w[R]=this.i(R)^E.i(R);return new a(w,this.h^E.h)};function C(E){for(var y=E.g.length+1,w=[],R=0;R<y;R++)w[R]=E.i(R)<<1|E.i(R-1)>>>31;return new a(w,E.h)}function M(E,y){var w=y>>5;y%=32;for(var R=E.g.length-w,I=[],P=0;P<R;P++)I[P]=0<y?E.i(P+w)>>>y|E.i(P+w+1)<<32-y:E.i(P+w);return new a(I,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,_g=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Vn=a}).apply(typeof vf<"u"?vf:typeof self<"u"?self:typeof window<"u"?window:{});var Sa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var vg,ai,yg,Wa,Sl,bg,wg,Ig;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,h,m){return o==Array.prototype||o==Object.prototype||(o[h]=m.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Sa=="object"&&Sa];for(var h=0;h<o.length;++h){var m=o[h];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=t(this);function s(o,h){if(h)e:{var m=r;o=o.split(".");for(var b=0;b<o.length-1;b++){var O=o[b];if(!(O in m))break e;m=m[O]}o=o[o.length-1],b=m[o],h=h(b),h!=b&&h!=null&&e(m,o,{configurable:!0,writable:!0,value:h})}}function i(o,h){o instanceof String&&(o+="");var m=0,b=!1,O={next:function(){if(!b&&m<o.length){var U=m++;return{value:h(U,o[U]),done:!1}}return b=!0,{done:!0,value:void 0}}};return O[Symbol.iterator]=function(){return O},O}s("Array.prototype.values",function(o){return o||function(){return i(this,function(h,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(o){var h=typeof o;return h=h!="object"?h:o?Array.isArray(o)?"array":h:"null",h=="array"||h=="object"&&typeof o.length=="number"}function d(o){var h=typeof o;return h=="object"&&o!=null||h=="function"}function f(o,h,m){return o.call.apply(o.bind,arguments)}function p(o,h,m){if(!o)throw Error();if(2<arguments.length){var b=Array.prototype.slice.call(arguments,2);return function(){var O=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(O,b),o.apply(h,O)}}return function(){return o.apply(h,arguments)}}function g(o,h,m){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function _(o,h){var m=Array.prototype.slice.call(arguments,1);return function(){var b=m.slice();return b.push.apply(b,arguments),o.apply(this,b)}}function v(o,h){function m(){}m.prototype=h.prototype,o.aa=h.prototype,o.prototype=new m,o.prototype.constructor=o,o.Qb=function(b,O,U){for(var Q=Array(arguments.length-2),ke=2;ke<arguments.length;ke++)Q[ke-2]=arguments[ke];return h.prototype[O].apply(b,Q)}}function S(o){const h=o.length;if(0<h){const m=Array(h);for(let b=0;b<h;b++)m[b]=o[b];return m}return[]}function T(o,h){for(let m=1;m<arguments.length;m++){const b=arguments[m];if(u(b)){const O=o.length||0,U=b.length||0;o.length=O+U;for(let Q=0;Q<U;Q++)o[O+Q]=b[Q]}else o.push(b)}}class D{constructor(h,m){this.i=h,this.j=m,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function k(o){return/^[\s\xa0]*$/.test(o)}function x(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function L(o){return L[" "](o),o}L[" "]=function(){};var C=x().indexOf("Gecko")!=-1&&!(x().toLowerCase().indexOf("webkit")!=-1&&x().indexOf("Edge")==-1)&&!(x().indexOf("Trident")!=-1||x().indexOf("MSIE")!=-1)&&x().indexOf("Edge")==-1;function M(o,h,m){for(const b in o)h.call(m,o[b],b,o)}function E(o,h){for(const m in o)h.call(void 0,o[m],m,o)}function y(o){const h={};for(const m in o)h[m]=o[m];return h}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function R(o,h){let m,b;for(let O=1;O<arguments.length;O++){b=arguments[O];for(m in b)o[m]=b[m];for(let U=0;U<w.length;U++)m=w[U],Object.prototype.hasOwnProperty.call(b,m)&&(o[m]=b[m])}}function I(o){var h=1;o=o.split(":");const m=[];for(;0<h&&o.length;)m.push(o.shift()),h--;return o.length&&m.push(o.join(":")),m}function P(o){c.setTimeout(()=>{throw o},0)}function A(){var o=N;let h=null;return o.g&&(h=o.g,o.g=o.g.next,o.g||(o.h=null),h.next=null),h}class le{constructor(){this.h=this.g=null}add(h,m){const b=pe.get();b.set(h,m),this.h?this.h.next=b:this.g=b,this.h=b}}var pe=new D(()=>new X,o=>o.reset());class X{constructor(){this.next=this.g=this.h=null}set(h,m){this.h=h,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,$e=!1,N=new le,H=()=>{const o=c.Promise.resolve(void 0);ye=()=>{o.then(z)}};var z=()=>{for(var o;o=A();){try{o.h.call(o.g)}catch(m){P(m)}var h=pe;h.j(o),100>h.h&&(h.h++,o.next=h.g,h.g=o)}$e=!1};function Z(){this.s=this.s,this.C=this.C}Z.prototype.s=!1,Z.prototype.ma=function(){this.s||(this.s=!0,this.N())},Z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function G(o,h){this.type=o,this.g=this.target=h,this.defaultPrevented=!1}G.prototype.h=function(){this.defaultPrevented=!0};var fe=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,h=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const m=()=>{};c.addEventListener("test",m,h),c.removeEventListener("test",m,h)}catch{}return o}();function F(o,h){if(G.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var m=this.type=o.type,b=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=h,h=o.relatedTarget){if(C){e:{try{L(h.nodeName);var O=!0;break e}catch{}O=!1}O||(h=null)}}else m=="mouseover"?h=o.fromElement:m=="mouseout"&&(h=o.toElement);this.relatedTarget=h,b?(this.clientX=b.clientX!==void 0?b.clientX:b.pageX,this.clientY=b.clientY!==void 0?b.clientY:b.pageY,this.screenX=b.screenX||0,this.screenY=b.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:q[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&F.aa.h.call(this)}}v(F,G);var q={2:"touch",3:"pen",4:"mouse"};F.prototype.h=function(){F.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Y="closure_listenable_"+(1e6*Math.random()|0),ce=0;function se(o,h,m,b,O){this.listener=o,this.proxy=null,this.src=h,this.type=m,this.capture=!!b,this.ha=O,this.key=++ce,this.da=this.fa=!1}function re(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Re(o){this.src=o,this.g={},this.h=0}Re.prototype.add=function(o,h,m,b,O){var U=o.toString();o=this.g[U],o||(o=this.g[U]=[],this.h++);var Q=qe(o,h,b,O);return-1<Q?(h=o[Q],m||(h.fa=!1)):(h=new se(h,this.src,U,!!b,O),h.fa=m,o.push(h)),h};function Ne(o,h){var m=h.type;if(m in o.g){var b=o.g[m],O=Array.prototype.indexOf.call(b,h,void 0),U;(U=0<=O)&&Array.prototype.splice.call(b,O,1),U&&(re(h),o.g[m].length==0&&(delete o.g[m],o.h--))}}function qe(o,h,m,b){for(var O=0;O<o.length;++O){var U=o[O];if(!U.da&&U.listener==h&&U.capture==!!m&&U.ha==b)return O}return-1}var lt="closure_lm_"+(1e6*Math.random()|0),Wn={};function Qn(o,h,m,b,O){if(Array.isArray(h)){for(var U=0;U<h.length;U++)Qn(o,h[U],m,b,O);return null}return m=Gd(m),o&&o[Y]?o.K(h,m,d(b)?!!b.capture:!1,O):Ms(o,h,m,!1,b,O)}function Ms(o,h,m,b,O,U){if(!h)throw Error("Invalid event type");var Q=d(O)?!!O.capture:!!O,ke=Nc(o);if(ke||(o[lt]=ke=new Re(o)),m=ke.add(h,m,b,Q,U),m.proxy)return m;if(b=Ky(),m.proxy=b,b.src=o,b.listener=m,o.addEventListener)fe||(O=Q),O===void 0&&(O=!1),o.addEventListener(h.toString(),b,O);else if(o.attachEvent)o.attachEvent(zd(h.toString()),b);else if(o.addListener&&o.removeListener)o.addListener(b);else throw Error("addEventListener and attachEvent are unavailable.");return m}function Ky(){function o(m){return h.call(o.src,o.listener,m)}const h=Wy;return o}function jd(o,h,m,b,O){if(Array.isArray(h))for(var U=0;U<h.length;U++)jd(o,h[U],m,b,O);else b=d(b)?!!b.capture:!!b,m=Gd(m),o&&o[Y]?(o=o.i,h=String(h).toString(),h in o.g&&(U=o.g[h],m=qe(U,m,b,O),-1<m&&(re(U[m]),Array.prototype.splice.call(U,m,1),U.length==0&&(delete o.g[h],o.h--)))):o&&(o=Nc(o))&&(h=o.g[h.toString()],o=-1,h&&(o=qe(h,m,b,O)),(m=-1<o?h[o]:null)&&Pc(m))}function Pc(o){if(typeof o!="number"&&o&&!o.da){var h=o.src;if(h&&h[Y])Ne(h.i,o);else{var m=o.type,b=o.proxy;h.removeEventListener?h.removeEventListener(m,b,o.capture):h.detachEvent?h.detachEvent(zd(m),b):h.addListener&&h.removeListener&&h.removeListener(b),(m=Nc(h))?(Ne(m,o),m.h==0&&(m.src=null,h[lt]=null)):re(o)}}}function zd(o){return o in Wn?Wn[o]:Wn[o]="on"+o}function Wy(o,h){if(o.da)o=!0;else{h=new F(h,this);var m=o.listener,b=o.ha||o.src;o.fa&&Pc(o),o=m.call(b,h)}return o}function Nc(o){return o=o[lt],o instanceof Re?o:null}var Dc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Gd(o){return typeof o=="function"?o:(o[Dc]||(o[Dc]=function(h){return o.handleEvent(h)}),o[Dc])}function Ze(){Z.call(this),this.i=new Re(this),this.M=this,this.F=null}v(Ze,Z),Ze.prototype[Y]=!0,Ze.prototype.removeEventListener=function(o,h,m,b){jd(this,o,h,m,b)};function ut(o,h){var m,b=o.F;if(b)for(m=[];b;b=b.F)m.push(b);if(o=o.M,b=h.type||h,typeof h=="string")h=new G(h,o);else if(h instanceof G)h.target=h.target||o;else{var O=h;h=new G(b,o),R(h,O)}if(O=!0,m)for(var U=m.length-1;0<=U;U--){var Q=h.g=m[U];O=la(Q,b,!0,h)&&O}if(Q=h.g=o,O=la(Q,b,!0,h)&&O,O=la(Q,b,!1,h)&&O,m)for(U=0;U<m.length;U++)Q=h.g=m[U],O=la(Q,b,!1,h)&&O}Ze.prototype.N=function(){if(Ze.aa.N.call(this),this.i){var o=this.i,h;for(h in o.g){for(var m=o.g[h],b=0;b<m.length;b++)re(m[b]);delete o.g[h],o.h--}}this.F=null},Ze.prototype.K=function(o,h,m,b){return this.i.add(String(o),h,!1,m,b)},Ze.prototype.L=function(o,h,m,b){return this.i.add(String(o),h,!0,m,b)};function la(o,h,m,b){if(h=o.i.g[String(h)],!h)return!0;h=h.concat();for(var O=!0,U=0;U<h.length;++U){var Q=h[U];if(Q&&!Q.da&&Q.capture==m){var ke=Q.listener,Ye=Q.ha||Q.src;Q.fa&&Ne(o.i,Q),O=ke.call(Ye,b)!==!1&&O}}return O&&!b.defaultPrevented}function Hd(o,h,m){if(typeof o=="function")m&&(o=g(o,m));else if(o&&typeof o.handleEvent=="function")o=g(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(o,h||0)}function Kd(o){o.g=Hd(()=>{o.g=null,o.i&&(o.i=!1,Kd(o))},o.l);const h=o.h;o.h=null,o.m.apply(null,h)}class Qy extends Z{constructor(h,m){super(),this.m=h,this.l=m,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Kd(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Fs(o){Z.call(this),this.h=o,this.g={}}v(Fs,Z);var Wd=[];function Qd(o){M(o.g,function(h,m){this.g.hasOwnProperty(m)&&Pc(h)},o),o.g={}}Fs.prototype.N=function(){Fs.aa.N.call(this),Qd(this)},Fs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Vc=c.JSON.stringify,Yy=c.JSON.parse,Jy=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function Oc(){}Oc.prototype.h=null;function Yd(o){return o.h||(o.h=o.i())}function Jd(){}var Us={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Lc(){G.call(this,"d")}v(Lc,G);function Mc(){G.call(this,"c")}v(Mc,G);var Yn={},Xd=null;function ua(){return Xd=Xd||new Ze}Yn.La="serverreachability";function Zd(o){G.call(this,Yn.La,o)}v(Zd,G);function Bs(o){const h=ua();ut(h,new Zd(h))}Yn.STAT_EVENT="statevent";function eh(o,h){G.call(this,Yn.STAT_EVENT,o),this.stat=h}v(eh,G);function dt(o){const h=ua();ut(h,new eh(h,o))}Yn.Ma="timingevent";function th(o,h){G.call(this,Yn.Ma,o),this.size=h}v(th,G);function $s(o,h){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},h)}function qs(){this.g=!0}qs.prototype.xa=function(){this.g=!1};function Xy(o,h,m,b,O,U){o.info(function(){if(o.g)if(U)for(var Q="",ke=U.split("&"),Ye=0;Ye<ke.length;Ye++){var we=ke[Ye].split("=");if(1<we.length){var et=we[0];we=we[1];var tt=et.split("_");Q=2<=tt.length&&tt[1]=="type"?Q+(et+"="+we+"&"):Q+(et+"=redacted&")}}else Q=null;else Q=U;return"XMLHTTP REQ ("+b+") [attempt "+O+"]: "+h+`
`+m+`
`+Q})}function Zy(o,h,m,b,O,U,Q){o.info(function(){return"XMLHTTP RESP ("+b+") [ attempt "+O+"]: "+h+`
`+m+`
`+U+" "+Q})}function Ur(o,h,m,b){o.info(function(){return"XMLHTTP TEXT ("+h+"): "+tb(o,m)+(b?" "+b:"")})}function eb(o,h){o.info(function(){return"TIMEOUT: "+h})}qs.prototype.info=function(){};function tb(o,h){if(!o.g)return h;if(!h)return null;try{var m=JSON.parse(h);if(m){for(o=0;o<m.length;o++)if(Array.isArray(m[o])){var b=m[o];if(!(2>b.length)){var O=b[1];if(Array.isArray(O)&&!(1>O.length)){var U=O[0];if(U!="noop"&&U!="stop"&&U!="close")for(var Q=1;Q<O.length;Q++)O[Q]=""}}}}return Vc(m)}catch{return h}}var da={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},nh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Fc;function ha(){}v(ha,Oc),ha.prototype.g=function(){return new XMLHttpRequest},ha.prototype.i=function(){return{}},Fc=new ha;function gn(o,h,m,b){this.j=o,this.i=h,this.l=m,this.R=b||1,this.U=new Fs(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new rh}function rh(){this.i=null,this.g="",this.h=!1}var sh={},Uc={};function Bc(o,h,m){o.L=1,o.v=ga(nn(h)),o.m=m,o.P=!0,ih(o,null)}function ih(o,h){o.F=Date.now(),fa(o),o.A=nn(o.v);var m=o.A,b=o.R;Array.isArray(b)||(b=[String(b)]),yh(m.i,"t",b),o.C=0,m=o.j.J,o.h=new rh,o.g=Mh(o.j,m?h:null,!o.m),0<o.O&&(o.M=new Qy(g(o.Y,o,o.g),o.O)),h=o.U,m=o.g,b=o.ca;var O="readystatechange";Array.isArray(O)||(O&&(Wd[0]=O.toString()),O=Wd);for(var U=0;U<O.length;U++){var Q=Qn(m,O[U],b||h.handleEvent,!1,h.h||h);if(!Q)break;h.g[Q.key]=Q}h=o.H?y(o.H):{},o.m?(o.u||(o.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,h)):(o.u="GET",o.g.ea(o.A,o.u,null,h)),Bs(),Xy(o.i,o.u,o.A,o.l,o.R,o.m)}gn.prototype.ca=function(o){o=o.target;const h=this.M;h&&rn(o)==3?h.j():this.Y(o)},gn.prototype.Y=function(o){try{if(o==this.g)e:{const tt=rn(this.g);var h=this.g.Ba();const qr=this.g.Z();if(!(3>tt)&&(tt!=3||this.g&&(this.h.h||this.g.oa()||Sh(this.g)))){this.J||tt!=4||h==7||(h==8||0>=qr?Bs(3):Bs(2)),$c(this);var m=this.g.Z();this.X=m;t:if(ah(this)){var b=Sh(this.g);o="";var O=b.length,U=rn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Jn(this),js(this);var Q="";break t}this.h.i=new c.TextDecoder}for(h=0;h<O;h++)this.h.h=!0,o+=this.h.i.decode(b[h],{stream:!(U&&h==O-1)});b.length=0,this.h.g+=o,this.C=0,Q=this.h.g}else Q=this.g.oa();if(this.o=m==200,Zy(this.i,this.u,this.A,this.l,this.R,tt,m),this.o){if(this.T&&!this.K){t:{if(this.g){var ke,Ye=this.g;if((ke=Ye.g?Ye.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!k(ke)){var we=ke;break t}}we=null}if(m=we)Ur(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,qc(this,m);else{this.o=!1,this.s=3,dt(12),Jn(this),js(this);break e}}if(this.P){m=!0;let Vt;for(;!this.J&&this.C<Q.length;)if(Vt=nb(this,Q),Vt==Uc){tt==4&&(this.s=4,dt(14),m=!1),Ur(this.i,this.l,null,"[Incomplete Response]");break}else if(Vt==sh){this.s=4,dt(15),Ur(this.i,this.l,Q,"[Invalid Chunk]"),m=!1;break}else Ur(this.i,this.l,Vt,null),qc(this,Vt);if(ah(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),tt!=4||Q.length!=0||this.h.h||(this.s=1,dt(16),m=!1),this.o=this.o&&m,!m)Ur(this.i,this.l,Q,"[Invalid Chunked Response]"),Jn(this),js(this);else if(0<Q.length&&!this.W){this.W=!0;var et=this.j;et.g==this&&et.ba&&!et.M&&(et.j.info("Great, no buffering proxy detected. Bytes received: "+Q.length),Wc(et),et.M=!0,dt(11))}}else Ur(this.i,this.l,Q,null),qc(this,Q);tt==4&&Jn(this),this.o&&!this.J&&(tt==4?Dh(this.j,this):(this.o=!1,fa(this)))}else yb(this.g),m==400&&0<Q.indexOf("Unknown SID")?(this.s=3,dt(12)):(this.s=0,dt(13)),Jn(this),js(this)}}}catch{}finally{}};function ah(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function nb(o,h){var m=o.C,b=h.indexOf(`
`,m);return b==-1?Uc:(m=Number(h.substring(m,b)),isNaN(m)?sh:(b+=1,b+m>h.length?Uc:(h=h.slice(b,b+m),o.C=b+m,h)))}gn.prototype.cancel=function(){this.J=!0,Jn(this)};function fa(o){o.S=Date.now()+o.I,oh(o,o.I)}function oh(o,h){if(o.B!=null)throw Error("WatchDog timer not null");o.B=$s(g(o.ba,o),h)}function $c(o){o.B&&(c.clearTimeout(o.B),o.B=null)}gn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(eb(this.i,this.A),this.L!=2&&(Bs(),dt(17)),Jn(this),this.s=2,js(this)):oh(this,this.S-o)};function js(o){o.j.G==0||o.J||Dh(o.j,o)}function Jn(o){$c(o);var h=o.M;h&&typeof h.ma=="function"&&h.ma(),o.M=null,Qd(o.U),o.g&&(h=o.g,o.g=null,h.abort(),h.ma())}function qc(o,h){try{var m=o.j;if(m.G!=0&&(m.g==o||jc(m.h,o))){if(!o.K&&jc(m.h,o)&&m.G==3){try{var b=m.Da.g.parse(h)}catch{b=null}if(Array.isArray(b)&&b.length==3){var O=b;if(O[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<o.F)Ia(m),ba(m);else break e;Kc(m),dt(18)}}else m.za=O[1],0<m.za-m.T&&37500>O[2]&&m.F&&m.v==0&&!m.C&&(m.C=$s(g(m.Za,m),6e3));if(1>=uh(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else Zn(m,11)}else if((o.K||m.g==o)&&Ia(m),!k(h))for(O=m.Da.g.parse(h),h=0;h<O.length;h++){let we=O[h];if(m.T=we[0],we=we[1],m.G==2)if(we[0]=="c"){m.K=we[1],m.ia=we[2];const et=we[3];et!=null&&(m.la=et,m.j.info("VER="+m.la));const tt=we[4];tt!=null&&(m.Aa=tt,m.j.info("SVER="+m.Aa));const qr=we[5];qr!=null&&typeof qr=="number"&&0<qr&&(b=1.5*qr,m.L=b,m.j.info("backChannelRequestTimeoutMs_="+b)),b=m;const Vt=o.g;if(Vt){const Ta=Vt.g?Vt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ta){var U=b.h;U.g||Ta.indexOf("spdy")==-1&&Ta.indexOf("quic")==-1&&Ta.indexOf("h2")==-1||(U.j=U.l,U.g=new Set,U.h&&(zc(U,U.h),U.h=null))}if(b.D){const Qc=Vt.g?Vt.g.getResponseHeader("X-HTTP-Session-Id"):null;Qc&&(b.ya=Qc,Ce(b.I,b.D,Qc))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-o.F,m.j.info("Handshake RTT: "+m.R+"ms")),b=m;var Q=o;if(b.qa=Lh(b,b.J?b.ia:null,b.W),Q.K){dh(b.h,Q);var ke=Q,Ye=b.L;Ye&&(ke.I=Ye),ke.B&&($c(ke),fa(ke)),b.g=Q}else Ph(b);0<m.i.length&&wa(m)}else we[0]!="stop"&&we[0]!="close"||Zn(m,7);else m.G==3&&(we[0]=="stop"||we[0]=="close"?we[0]=="stop"?Zn(m,7):Hc(m):we[0]!="noop"&&m.l&&m.l.ta(we),m.v=0)}}Bs(4)}catch{}}var rb=class{constructor(o,h){this.g=o,this.map=h}};function ch(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function lh(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function uh(o){return o.h?1:o.g?o.g.size:0}function jc(o,h){return o.h?o.h==h:o.g?o.g.has(h):!1}function zc(o,h){o.g?o.g.add(h):o.h=h}function dh(o,h){o.h&&o.h==h?o.h=null:o.g&&o.g.has(h)&&o.g.delete(h)}ch.prototype.cancel=function(){if(this.i=hh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function hh(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let h=o.i;for(const m of o.g.values())h=h.concat(m.D);return h}return S(o.i)}function sb(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var h=[],m=o.length,b=0;b<m;b++)h.push(o[b]);return h}h=[],m=0;for(b in o)h[m++]=o[b];return h}function ib(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var h=[];o=o.length;for(var m=0;m<o;m++)h.push(m);return h}h=[],m=0;for(const b in o)h[m++]=b;return h}}}function fh(o,h){if(o.forEach&&typeof o.forEach=="function")o.forEach(h,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,h,void 0);else for(var m=ib(o),b=sb(o),O=b.length,U=0;U<O;U++)h.call(void 0,b[U],m&&m[U],o)}var ph=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ab(o,h){if(o){o=o.split("&");for(var m=0;m<o.length;m++){var b=o[m].indexOf("="),O=null;if(0<=b){var U=o[m].substring(0,b);O=o[m].substring(b+1)}else U=o[m];h(U,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function Xn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Xn){this.h=o.h,pa(this,o.j),this.o=o.o,this.g=o.g,ma(this,o.s),this.l=o.l;var h=o.i,m=new Hs;m.i=h.i,h.g&&(m.g=new Map(h.g),m.h=h.h),mh(this,m),this.m=o.m}else o&&(h=String(o).match(ph))?(this.h=!1,pa(this,h[1]||"",!0),this.o=zs(h[2]||""),this.g=zs(h[3]||"",!0),ma(this,h[4]),this.l=zs(h[5]||"",!0),mh(this,h[6]||"",!0),this.m=zs(h[7]||"")):(this.h=!1,this.i=new Hs(null,this.h))}Xn.prototype.toString=function(){var o=[],h=this.j;h&&o.push(Gs(h,gh,!0),":");var m=this.g;return(m||h=="file")&&(o.push("//"),(h=this.o)&&o.push(Gs(h,gh,!0),"@"),o.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&o.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&o.push("/"),o.push(Gs(m,m.charAt(0)=="/"?lb:cb,!0))),(m=this.i.toString())&&o.push("?",m),(m=this.m)&&o.push("#",Gs(m,db)),o.join("")};function nn(o){return new Xn(o)}function pa(o,h,m){o.j=m?zs(h,!0):h,o.j&&(o.j=o.j.replace(/:$/,""))}function ma(o,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);o.s=h}else o.s=null}function mh(o,h,m){h instanceof Hs?(o.i=h,hb(o.i,o.h)):(m||(h=Gs(h,ub)),o.i=new Hs(h,o.h))}function Ce(o,h,m){o.i.set(h,m)}function ga(o){return Ce(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function zs(o,h){return o?h?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Gs(o,h,m){return typeof o=="string"?(o=encodeURI(o).replace(h,ob),m&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function ob(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var gh=/[#\/\?@]/g,cb=/[#\?:]/g,lb=/[#\?]/g,ub=/[#\?@]/g,db=/#/g;function Hs(o,h){this.h=this.g=null,this.i=o||null,this.j=!!h}function _n(o){o.g||(o.g=new Map,o.h=0,o.i&&ab(o.i,function(h,m){o.add(decodeURIComponent(h.replace(/\+/g," ")),m)}))}n=Hs.prototype,n.add=function(o,h){_n(this),this.i=null,o=Br(this,o);var m=this.g.get(o);return m||this.g.set(o,m=[]),m.push(h),this.h+=1,this};function _h(o,h){_n(o),h=Br(o,h),o.g.has(h)&&(o.i=null,o.h-=o.g.get(h).length,o.g.delete(h))}function vh(o,h){return _n(o),h=Br(o,h),o.g.has(h)}n.forEach=function(o,h){_n(this),this.g.forEach(function(m,b){m.forEach(function(O){o.call(h,O,b,this)},this)},this)},n.na=function(){_n(this);const o=Array.from(this.g.values()),h=Array.from(this.g.keys()),m=[];for(let b=0;b<h.length;b++){const O=o[b];for(let U=0;U<O.length;U++)m.push(h[b])}return m},n.V=function(o){_n(this);let h=[];if(typeof o=="string")vh(this,o)&&(h=h.concat(this.g.get(Br(this,o))));else{o=Array.from(this.g.values());for(let m=0;m<o.length;m++)h=h.concat(o[m])}return h},n.set=function(o,h){return _n(this),this.i=null,o=Br(this,o),vh(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[h]),this.h+=1,this},n.get=function(o,h){return o?(o=this.V(o),0<o.length?String(o[0]):h):h};function yh(o,h,m){_h(o,h),0<m.length&&(o.i=null,o.g.set(Br(o,h),S(m)),o.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],h=Array.from(this.g.keys());for(var m=0;m<h.length;m++){var b=h[m];const U=encodeURIComponent(String(b)),Q=this.V(b);for(b=0;b<Q.length;b++){var O=U;Q[b]!==""&&(O+="="+encodeURIComponent(String(Q[b]))),o.push(O)}}return this.i=o.join("&")};function Br(o,h){return h=String(h),o.j&&(h=h.toLowerCase()),h}function hb(o,h){h&&!o.j&&(_n(o),o.i=null,o.g.forEach(function(m,b){var O=b.toLowerCase();b!=O&&(_h(this,b),yh(this,O,m))},o)),o.j=h}function fb(o,h){const m=new qs;if(c.Image){const b=new Image;b.onload=_(vn,m,"TestLoadImage: loaded",!0,h,b),b.onerror=_(vn,m,"TestLoadImage: error",!1,h,b),b.onabort=_(vn,m,"TestLoadImage: abort",!1,h,b),b.ontimeout=_(vn,m,"TestLoadImage: timeout",!1,h,b),c.setTimeout(function(){b.ontimeout&&b.ontimeout()},1e4),b.src=o}else h(!1)}function pb(o,h){const m=new qs,b=new AbortController,O=setTimeout(()=>{b.abort(),vn(m,"TestPingServer: timeout",!1,h)},1e4);fetch(o,{signal:b.signal}).then(U=>{clearTimeout(O),U.ok?vn(m,"TestPingServer: ok",!0,h):vn(m,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(O),vn(m,"TestPingServer: error",!1,h)})}function vn(o,h,m,b,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),b(m)}catch{}}function mb(){this.g=new Jy}function gb(o,h,m){const b=m||"";try{fh(o,function(O,U){let Q=O;d(O)&&(Q=Vc(O)),h.push(b+U+"="+encodeURIComponent(Q))})}catch(O){throw h.push(b+"type="+encodeURIComponent("_badmap")),O}}function _a(o){this.l=o.Ub||null,this.j=o.eb||!1}v(_a,Oc),_a.prototype.g=function(){return new va(this.l,this.j)},_a.prototype.i=function(o){return function(){return o}}({});function va(o,h){Ze.call(this),this.D=o,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}v(va,Ze),n=va.prototype,n.open=function(o,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=h,this.readyState=1,Ws(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(h.body=o),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ks(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Ws(this)),this.g&&(this.readyState=3,Ws(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;bh(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function bh(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var h=o.value?o.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!o.done}))&&(this.response=this.responseText+=h)}o.done?Ks(this):Ws(this),this.readyState==3&&bh(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Ks(this))},n.Qa=function(o){this.g&&(this.response=o,Ks(this))},n.ga=function(){this.g&&Ks(this)};function Ks(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Ws(o)}n.setRequestHeader=function(o,h){this.u.append(o,h)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],h=this.h.entries();for(var m=h.next();!m.done;)m=m.value,o.push(m[0]+": "+m[1]),m=h.next();return o.join(`\r
`)};function Ws(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(va.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function wh(o){let h="";return M(o,function(m,b){h+=b,h+=":",h+=m,h+=`\r
`}),h}function Gc(o,h,m){e:{for(b in m){var b=!1;break e}b=!0}b||(m=wh(m),typeof o=="string"?m!=null&&encodeURIComponent(String(m)):Ce(o,h,m))}function Me(o){Ze.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}v(Me,Ze);var _b=/^https?$/i,vb=["POST","PUT"];n=Me.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,h,m,b){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);h=h?h.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Fc.g(),this.v=this.o?Yd(this.o):Yd(Fc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(o),!0),this.B=!1}catch(U){Ih(this,U);return}if(o=m||"",m=new Map(this.headers),b)if(Object.getPrototypeOf(b)===Object.prototype)for(var O in b)m.set(O,b[O]);else if(typeof b.keys=="function"&&typeof b.get=="function")for(const U of b.keys())m.set(U,b.get(U));else throw Error("Unknown input type for opt_headers: "+String(b));b=Array.from(m.keys()).find(U=>U.toLowerCase()=="content-type"),O=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(vb,h,void 0))||b||O||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[U,Q]of m)this.g.setRequestHeader(U,Q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ah(this),this.u=!0,this.g.send(o),this.u=!1}catch(U){Ih(this,U)}};function Ih(o,h){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=h,o.m=5,Eh(o),ya(o)}function Eh(o){o.A||(o.A=!0,ut(o,"complete"),ut(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ut(this,"complete"),ut(this,"abort"),ya(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ya(this,!0)),Me.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Th(this):this.bb())},n.bb=function(){Th(this)};function Th(o){if(o.h&&typeof a<"u"&&(!o.v[1]||rn(o)!=4||o.Z()!=2)){if(o.u&&rn(o)==4)Hd(o.Ea,0,o);else if(ut(o,"readystatechange"),rn(o)==4){o.h=!1;try{const Q=o.Z();e:switch(Q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var m;if(!(m=h)){var b;if(b=Q===0){var O=String(o.D).match(ph)[1]||null;!O&&c.self&&c.self.location&&(O=c.self.location.protocol.slice(0,-1)),b=!_b.test(O?O.toLowerCase():"")}m=b}if(m)ut(o,"complete"),ut(o,"success");else{o.m=6;try{var U=2<rn(o)?o.g.statusText:""}catch{U=""}o.l=U+" ["+o.Z()+"]",Eh(o)}}finally{ya(o)}}}}function ya(o,h){if(o.g){Ah(o);const m=o.g,b=o.v[0]?()=>{}:null;o.g=null,o.v=null,h||ut(o,"ready");try{m.onreadystatechange=b}catch{}}}function Ah(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function rn(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<rn(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var h=this.g.responseText;return o&&h.indexOf(o)==0&&(h=h.substring(o.length)),Yy(h)}};function Sh(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function yb(o){const h={};o=(o.g&&2<=rn(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let b=0;b<o.length;b++){if(k(o[b]))continue;var m=I(o[b]);const O=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const U=h[O]||[];h[O]=U,U.push(m)}E(h,function(b){return b.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Qs(o,h,m){return m&&m.internalChannelParams&&m.internalChannelParams[o]||h}function Rh(o){this.Aa=0,this.i=[],this.j=new qs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Qs("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Qs("baseRetryDelayMs",5e3,o),this.cb=Qs("retryDelaySeedMs",1e4,o),this.Wa=Qs("forwardChannelMaxRetries",2,o),this.wa=Qs("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new ch(o&&o.concurrentRequestLimit),this.Da=new mb,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Rh.prototype,n.la=8,n.G=1,n.connect=function(o,h,m,b){dt(0),this.W=o,this.H=h||{},m&&b!==void 0&&(this.H.OSID=m,this.H.OAID=b),this.F=this.X,this.I=Lh(this,null,this.W),wa(this)};function Hc(o){if(kh(o),o.G==3){var h=o.U++,m=nn(o.I);if(Ce(m,"SID",o.K),Ce(m,"RID",h),Ce(m,"TYPE","terminate"),Ys(o,m),h=new gn(o,o.j,h),h.L=2,h.v=ga(nn(m)),m=!1,c.navigator&&c.navigator.sendBeacon)try{m=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!m&&c.Image&&(new Image().src=h.v,m=!0),m||(h.g=Mh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),fa(h)}Oh(o)}function ba(o){o.g&&(Wc(o),o.g.cancel(),o.g=null)}function kh(o){ba(o),o.u&&(c.clearTimeout(o.u),o.u=null),Ia(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function wa(o){if(!lh(o.h)&&!o.s){o.s=!0;var h=o.Ga;ye||H(),$e||(ye(),$e=!0),N.add(h,o),o.B=0}}function bb(o,h){return uh(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=h.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=$s(g(o.Ga,o,h),Vh(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const O=new gn(this,this.j,o);let U=this.o;if(this.S&&(U?(U=y(U),R(U,this.S)):U=this.S),this.m!==null||this.O||(O.H=U,U=null),this.P)e:{for(var h=0,m=0;m<this.i.length;m++){t:{var b=this.i[m];if("__data__"in b.map&&(b=b.map.__data__,typeof b=="string")){b=b.length;break t}b=void 0}if(b===void 0)break;if(h+=b,4096<h){h=m;break e}if(h===4096||m===this.i.length-1){h=m+1;break e}}h=1e3}else h=1e3;h=xh(this,O,h),m=nn(this.I),Ce(m,"RID",o),Ce(m,"CVER",22),this.D&&Ce(m,"X-HTTP-Session-Id",this.D),Ys(this,m),U&&(this.O?h="headers="+encodeURIComponent(String(wh(U)))+"&"+h:this.m&&Gc(m,this.m,U)),zc(this.h,O),this.Ua&&Ce(m,"TYPE","init"),this.P?(Ce(m,"$req",h),Ce(m,"SID","null"),O.T=!0,Bc(O,m,null)):Bc(O,m,h),this.G=2}}else this.G==3&&(o?Ch(this,o):this.i.length==0||lh(this.h)||Ch(this))};function Ch(o,h){var m;h?m=h.l:m=o.U++;const b=nn(o.I);Ce(b,"SID",o.K),Ce(b,"RID",m),Ce(b,"AID",o.T),Ys(o,b),o.m&&o.o&&Gc(b,o.m,o.o),m=new gn(o,o.j,m,o.B+1),o.m===null&&(m.H=o.o),h&&(o.i=h.D.concat(o.i)),h=xh(o,m,1e3),m.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),zc(o.h,m),Bc(m,b,h)}function Ys(o,h){o.H&&M(o.H,function(m,b){Ce(h,b,m)}),o.l&&fh({},function(m,b){Ce(h,b,m)})}function xh(o,h,m){m=Math.min(o.i.length,m);var b=o.l?g(o.l.Na,o.l,o):null;e:{var O=o.i;let U=-1;for(;;){const Q=["count="+m];U==-1?0<m?(U=O[0].g,Q.push("ofs="+U)):U=0:Q.push("ofs="+U);let ke=!0;for(let Ye=0;Ye<m;Ye++){let we=O[Ye].g;const et=O[Ye].map;if(we-=U,0>we)U=Math.max(0,O[Ye].g-100),ke=!1;else try{gb(et,Q,"req"+we+"_")}catch{b&&b(et)}}if(ke){b=Q.join("&");break e}}}return o=o.i.splice(0,m),h.D=o,b}function Ph(o){if(!o.g&&!o.u){o.Y=1;var h=o.Fa;ye||H(),$e||(ye(),$e=!0),N.add(h,o),o.v=0}}function Kc(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=$s(g(o.Fa,o),Vh(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Nh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=$s(g(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,dt(10),ba(this),Nh(this))};function Wc(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Nh(o){o.g=new gn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var h=nn(o.qa);Ce(h,"RID","rpc"),Ce(h,"SID",o.K),Ce(h,"AID",o.T),Ce(h,"CI",o.F?"0":"1"),!o.F&&o.ja&&Ce(h,"TO",o.ja),Ce(h,"TYPE","xmlhttp"),Ys(o,h),o.m&&o.o&&Gc(h,o.m,o.o),o.L&&(o.g.I=o.L);var m=o.g;o=o.ia,m.L=1,m.v=ga(nn(h)),m.m=null,m.P=!0,ih(m,o)}n.Za=function(){this.C!=null&&(this.C=null,ba(this),Kc(this),dt(19))};function Ia(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Dh(o,h){var m=null;if(o.g==h){Ia(o),Wc(o),o.g=null;var b=2}else if(jc(o.h,h))m=h.D,dh(o.h,h),b=1;else return;if(o.G!=0){if(h.o)if(b==1){m=h.m?h.m.length:0,h=Date.now()-h.F;var O=o.B;b=ua(),ut(b,new th(b,m)),wa(o)}else Ph(o);else if(O=h.s,O==3||O==0&&0<h.X||!(b==1&&bb(o,h)||b==2&&Kc(o)))switch(m&&0<m.length&&(h=o.h,h.i=h.i.concat(m)),O){case 1:Zn(o,5);break;case 4:Zn(o,10);break;case 3:Zn(o,6);break;default:Zn(o,2)}}}function Vh(o,h){let m=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(m*=2),m*h}function Zn(o,h){if(o.j.info("Error code "+h),h==2){var m=g(o.fb,o),b=o.Xa;const O=!b;b=new Xn(b||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||pa(b,"https"),ga(b),O?fb(b.toString(),m):pb(b.toString(),m)}else dt(2);o.G=0,o.l&&o.l.sa(h),Oh(o),kh(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),dt(2)):(this.j.info("Failed to ping google.com"),dt(1))};function Oh(o){if(o.G=0,o.ka=[],o.l){const h=hh(o.h);(h.length!=0||o.i.length!=0)&&(T(o.ka,h),T(o.ka,o.i),o.h.i.length=0,S(o.i),o.i.length=0),o.l.ra()}}function Lh(o,h,m){var b=m instanceof Xn?nn(m):new Xn(m);if(b.g!="")h&&(b.g=h+"."+b.g),ma(b,b.s);else{var O=c.location;b=O.protocol,h=h?h+"."+O.hostname:O.hostname,O=+O.port;var U=new Xn(null);b&&pa(U,b),h&&(U.g=h),O&&ma(U,O),m&&(U.l=m),b=U}return m=o.D,h=o.ya,m&&h&&Ce(b,m,h),Ce(b,"VER",o.la),Ys(o,b),b}function Mh(o,h,m){if(h&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=o.Ca&&!o.pa?new Me(new _a({eb:m})):new Me(o.pa),h.Ha(o.J),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Fh(){}n=Fh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ea(){}Ea.prototype.g=function(o,h){return new bt(o,h)};function bt(o,h){Ze.call(this),this.g=new Rh(h),this.l=o,this.h=h&&h.messageUrlParams||null,o=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(o?o["X-WebChannel-Content-Type"]=h.messageContentType:o={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(o?o["X-WebChannel-Client-Profile"]=h.va:o={"X-WebChannel-Client-Profile":h.va}),this.g.S=o,(o=h&&h.Sb)&&!k(o)&&(this.g.m=o),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!k(h)&&(this.g.D=h,o=this.h,o!==null&&h in o&&(o=this.h,h in o&&delete o[h])),this.j=new $r(this)}v(bt,Ze),bt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},bt.prototype.close=function(){Hc(this.g)},bt.prototype.o=function(o){var h=this.g;if(typeof o=="string"){var m={};m.__data__=o,o=m}else this.u&&(m={},m.__data__=Vc(o),o=m);h.i.push(new rb(h.Ya++,o)),h.G==3&&wa(h)},bt.prototype.N=function(){this.g.l=null,delete this.j,Hc(this.g),delete this.g,bt.aa.N.call(this)};function Uh(o){Lc.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var h=o.__sm__;if(h){e:{for(const m in h){o=m;break e}o=void 0}(this.i=o)&&(o=this.i,h=h!==null&&o in h?h[o]:void 0),this.data=h}else this.data=o}v(Uh,Lc);function Bh(){Mc.call(this),this.status=1}v(Bh,Mc);function $r(o){this.g=o}v($r,Fh),$r.prototype.ua=function(){ut(this.g,"a")},$r.prototype.ta=function(o){ut(this.g,new Uh(o))},$r.prototype.sa=function(o){ut(this.g,new Bh)},$r.prototype.ra=function(){ut(this.g,"b")},Ea.prototype.createWebChannel=Ea.prototype.g,bt.prototype.send=bt.prototype.o,bt.prototype.open=bt.prototype.m,bt.prototype.close=bt.prototype.close,Ig=function(){return new Ea},wg=function(){return ua()},bg=Yn,Sl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},da.NO_ERROR=0,da.TIMEOUT=8,da.HTTP_ERROR=6,Wa=da,nh.COMPLETE="complete",yg=nh,Jd.EventType=Us,Us.OPEN="a",Us.CLOSE="b",Us.ERROR="c",Us.MESSAGE="d",Ze.prototype.listen=Ze.prototype.K,ai=Jd,Me.prototype.listenOnce=Me.prototype.L,Me.prototype.getLastError=Me.prototype.Ka,Me.prototype.getLastErrorCode=Me.prototype.Ba,Me.prototype.getStatus=Me.prototype.Z,Me.prototype.getResponseJson=Me.prototype.Oa,Me.prototype.getResponseText=Me.prototype.oa,Me.prototype.send=Me.prototype.ea,Me.prototype.setWithCredentials=Me.prototype.Ha,vg=Me}).apply(typeof Sa<"u"?Sa:typeof self<"u"?self:typeof window<"u"?window:{});const yf="@firebase/firestore",bf="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ft.UNAUTHENTICATED=new ft(null),ft.GOOGLE_CREDENTIALS=new ft("google-credentials-uid"),ft.FIRST_PARTY=new ft("first-party-uid"),ft.MOCK_USER=new ft("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vs="11.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir=new Wo("@firebase/firestore");function Qr(){return Ir.logLevel}function K(n,...e){if(Ir.logLevel<=ge.DEBUG){const t=e.map(Eu);Ir.debug(`Firestore (${Vs}): ${n}`,...t)}}function pt(n,...e){if(Ir.logLevel<=ge.ERROR){const t=e.map(Eu);Ir.error(`Firestore (${Vs}): ${n}`,...t)}}function Si(n,...e){if(Ir.logLevel<=ge.WARN){const t=e.map(Eu);Ir.warn(`Firestore (${Vs}): ${n}`,...t)}}function Eu(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(n="Unexpected state"){const e=`FIRESTORE (${Vs}) INTERNAL ASSERTION FAILED: `+n;throw pt(e),new Error(e)}function ne(n,e){n||te()}function he(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends Ut{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class _T{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ft.UNAUTHENTICATED))}shutdown(){}}class vT{constructor(e){this.t=e,this.currentUser=ft.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ne(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Qt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Qt,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Qt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ne(typeof r.accessToken=="string"),new gT(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ne(e===null||typeof e=="string"),new ft(e)}}class yT{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=ft.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class bT{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new yT(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ft.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class wf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class wT{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,Et(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){ne(this.o===void 0);const r=i=>{i.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,K("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new wf(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ne(typeof t.token=="string"),this.R=t.token,new wf(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IT(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rl(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=IT(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function de(n,e){return n<e?-1:n>e?1:0}function kl(n,e){const t=Rl().encode(n),r=Rl().encode(e);for(let s=0;s<Math.min(t.length,r.length);s++){const i=de(t[s],r[s]);if(i!==0)return i}return de(t.length,r.length)}function fs(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function Tg(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const If=-62135596800,Ef=1e6;class Oe{static now(){return Oe.fromMillis(Date.now())}static fromDate(e){return Oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Ef);return new Oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new W($.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new W($.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<If)throw new W($.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W($.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ef}_compareTo(e){return this.seconds===e.seconds?de(this.nanoseconds,e.nanoseconds):de(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-If;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{static fromTimestamp(e){return new ie(e)}static min(){return new ie(new Oe(0,0))}static max(){return new ie(new Oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tf="__name__";class qt{constructor(e,t,r){t===void 0?t=0:t>e.length&&te(),r===void 0?r=e.length-t:r>e.length-t&&te(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return qt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof qt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=qt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return de(e.length,t.length)}static compareSegments(e,t){const r=qt.isNumericId(e),s=qt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?qt.extractNumericId(e).compare(qt.extractNumericId(t)):kl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Vn.fromString(e.substring(4,e.length-2))}}class Ee extends qt{construct(e,t,r){return new Ee(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new W($.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Ee(t)}static emptyPath(){return new Ee([])}}const ET=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ve extends qt{construct(e,t,r){return new Ve(e,t,r)}static isValidIdentifier(e){return ET.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ve.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Tf}static keyField(){return new Ve([Tf])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W($.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new W($.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W($.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new W($.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ve(t)}static emptyPath(){return new Ve([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.path=e}static fromPath(e){return new J(Ee.fromString(e))}static fromName(e){return new J(Ee.fromString(e).popFirst(5))}static empty(){return new J(Ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new J(new Ee(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri=-1;class vo{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function Cl(n){return n.fields.find(e=>e.kind===2)}function sr(n){return n.fields.filter(e=>e.kind!==2)}vo.UNKNOWN_ID=-1;class Qa{constructor(e,t){this.fieldPath=e,this.kind=t}}class ki{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ki(0,kt.min())}}function TT(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=ie.fromTimestamp(r===1e9?new Oe(t+1,0):new Oe(t,r));return new kt(s,J.empty(),e)}function Ag(n){return new kt(n.readTime,n.key,Ri)}class kt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new kt(ie.min(),J.empty(),Ri)}static max(){return new kt(ie.max(),J.empty(),Ri)}}function Tu(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=J.comparator(n.documentKey,e.documentKey),t!==0?t:de(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sg="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Rg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lr(n){if(n.code!==$.FAILED_PRECONDITION||n.message!==Sg)throw n;K("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&te(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new V((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof V?t:V.resolve(t)}catch(t){return V.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):V.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):V.reject(t)}static resolve(e){return new V((t,r)=>{t(e)})}static reject(e){return new V((t,r)=>{r(e)})}static waitFor(e){return new V((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=V.resolve(!1);for(const r of e)t=t.next(s=>s?V.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new V((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(f=>{a[d]=f,++c,c===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new V((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It="SimpleDb";class ec{static open(e,t,r,s){try{return new ec(t,e.transaction(s,r))}catch(i){throw new hi(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new Qt,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new hi(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const s=Au(r.target.error);this.m.reject(new hi(e,s))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(K(It,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new ST(t)}}class On{static delete(e){return K(It,"Removing database:",e),cr(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Ko())return!1;if(On.v())return!0;const e=He(),t=On.C(e),r=0<t&&t<10,s=kg(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,On.C(He())===12.2&&pt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(K(It,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;t(a)},s.onblocked=()=>{r(new hi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?r(new W($.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?r(new W($.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):r(new hi(e,a))},s.onupgradeneeded=i=>{K(It,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.O.B(a,s.transaction,i.oldVersion,this.version).next(()=>{K(It,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let a=0;for(;;){++a;try{this.db=await this.N(e);const c=ec.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next(d=>(c.S(),d)).catch(d=>(c.abort(d),V.reject(d))).toPromise();return u.catch(()=>{}),await c.p,u}catch(c){const u=c,d=u.name!=="FirebaseError"&&a<3;if(K(It,"Transaction failed with error:",u.message,"Retrying:",d),this.close(),!d)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function kg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class AT{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return cr(this.q.delete())}}class hi extends W{constructor(e,t){super($.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function zn(n){return n.name==="IndexedDbTransactionError"}class ST{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(K(It,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(K(It,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),cr(r)}add(e){return K(It,"ADD",this.store.name,e,e),cr(this.store.add(e))}get(e){return cr(this.store.get(e)).next(t=>(t===void 0&&(t=null),K(It,"GET",this.store.name,e,t),t))}delete(e){return K(It,"DELETE",this.store.name,e),cr(this.store.delete(e))}count(){return K(It,"COUNT",this.store.name),cr(this.store.count())}G(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new V((a,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{a(u.target.result)}})}{const i=this.cursor(r),a=[];return this.j(i,(c,u)=>{a.push(u)}).next(()=>a)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new V((s,i)=>{r.onerror=a=>{i(a.target.error)},r.onsuccess=a=>{s(a.target.result)}})}J(e,t){K(It,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.j(s,(i,a,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.j(s,t)}X(e){const t=this.cursor({});return new V((r,s)=>{t.onerror=i=>{const a=Au(i.target.error);s(a)},t.onsuccess=i=>{const a=i.target.result;a?e(a.primaryKey,a.value).next(c=>{c?a.continue():r()}):r()}})}j(e,t){const r=[];return new V((s,i)=>{e.onerror=a=>{i(a.target.error)},e.onsuccess=a=>{const c=a.target.result;if(!c)return void s();const u=new AT(c),d=t(c.primaryKey,c.value,u);if(d instanceof V){const f=d.catch(p=>(u.done(),V.reject(p)));r.push(f)}u.isDone?s():u.K===null?c.continue():c.continue(u.K)}}).next(()=>V.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function cr(n){return new V((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=Au(r.target.error);t(s)}})}let Af=!1;function Au(n){const e=On.C(He());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new W("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Af||(Af=!0,setTimeout(()=>{throw r},0)),r}}return n}const fi="IndexBackfiller";class RT{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){K(fi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();K(fi,`Documents written: ${t}`)}catch(t){zn(t)?K(fi,"Ignoring IndexedDB error during index backfill: ",t):await Lr(t)}await this.te(6e4)})}}class kT{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let s=t,i=!0;return V.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(a=>{if(a!==null&&!r.has(a))return K(fi,`Processing collection: ${a}`),this.ie(e,a,s).next(c=>{s-=c,r.add(a)});i=!1})).next(()=>t-s)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(e,a).next(()=>this.se(s,i)).next(c=>(K(fi,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>a.size)}))}se(e,t){let r=e;return t.changes.forEach((s,i)=>{const a=Ag(i);Tu(a,r)>0&&(r=a)}),new kt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}xt.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr=-1;function tc(n){return n==null}function Ci(n){return n===0&&1/n==-1/0}function CT(n){return typeof n=="number"&&Number.isInteger(n)&&!Ci(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yo="";function at(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Sf(e)),e=xT(n.get(t),e);return Sf(e)}function xT(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case yo:t+="";break;default:t+=i}}return t}function Sf(n){return n+yo+""}function zt(n){const e=n.length;if(ne(e>=2),e===2)return ne(n.charAt(0)===yo&&n.charAt(1)===""),Ee.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const a=n.indexOf(yo,i);switch((a<0||a>t)&&te(),n.charAt(a+1)){case"":const c=n.substring(i,a);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,a),s+="\0";break;case"":s+=n.substring(i,a+1);break;default:te()}i=a+2}return new Ee(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir="remoteDocuments",Yi="owner",jr="owner",xi="mutationQueues",PT="userId",Ot="mutations",Rf="batchId",hr="userMutationsIndex",kf=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(n,e){return[n,at(e)]}function Cg(n,e,t){return[n,at(e),t]}const NT={},ps="documentMutations",bo="remoteDocumentsV14",DT=["prefixPath","collectionGroup","readTime","documentId"],Ja="documentKeyIndex",VT=["prefixPath","collectionGroup","documentId"],xg="collectionGroupIndex",OT=["collectionGroup","readTime","prefixPath","documentId"],Pi="remoteDocumentGlobal",xl="remoteDocumentGlobalKey",ms="targets",Pg="queryTargetsIndex",LT=["canonicalId","targetId"],gs="targetDocuments",MT=["targetId","path"],Su="documentTargetsIndex",FT=["path","targetId"],wo="targetGlobalKey",_r="targetGlobal",Ni="collectionParents",UT=["collectionId","parent"],_s="clientMetadata",BT="clientId",nc="bundles",$T="bundleId",rc="namedQueries",qT="name",Ru="indexConfiguration",jT="indexId",Pl="collectionGroupIndex",zT="collectionGroup",Io="indexState",GT=["indexId","uid"],Ng="sequenceNumberIndex",HT=["uid","sequenceNumber"],Eo="indexEntries",KT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Dg="documentKeyIndex",WT=["indexId","uid","orderedDocumentKey"],sc="documentOverlays",QT=["userId","collectionPath","documentId"],Nl="collectionPathOverlayIndex",YT=["userId","collectionPath","largestBatchId"],Vg="collectionGroupOverlayIndex",JT=["userId","collectionGroup","largestBatchId"],ku="globals",XT="name",Og=[xi,Ot,ps,ir,ms,Yi,_r,gs,_s,Pi,Ni,nc,rc],ZT=[...Og,sc],Lg=[xi,Ot,ps,bo,ms,Yi,_r,gs,_s,Pi,Ni,nc,rc,sc],Mg=Lg,Cu=[...Mg,Ru,Io,Eo],eA=Cu,tA=[...Cu,ku];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl extends Rg{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function Ke(n,e){const t=he(n);return On.M(t.ue,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cf(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Gn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Fg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,t){this.comparator=e,this.root=t||Je.EMPTY}insert(e,t){return new Pe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Je.BLACK,null,null))}remove(e){return new Pe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Je.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ra(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ra(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ra(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ra(this.root,e,this.comparator,!0)}}class Ra{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Je{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Je.RED,this.left=s??Je.EMPTY,this.right=i??Je.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Je(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Je.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Je.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Je.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw te();const e=this.left.check();if(e!==this.right.check())throw te();return e+(this.isRed()?0:1)}}Je.EMPTY=null,Je.RED=!0,Je.BLACK=!1;Je.EMPTY=new class{constructor(){this.size=0}get key(){throw te()}get value(){throw te()}get color(){throw te()}get left(){throw te()}get right(){throw te()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Je(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.comparator=e,this.data=new Pe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new xf(this.data.getIterator())}getIteratorFrom(e){return new xf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Se)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Se(this.comparator);return t.data=e,t}}class xf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function zr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.fields=e,e.sort(Ve.comparator)}static empty(){return new gt([])}unionWith(e){let t=new Se(Ve.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new gt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return fs(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Ug("Invalid base64 string: "+i):i}}(e);return new ze(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new ze(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return de(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ze.EMPTY_BYTE_STRING=new ze("");const nA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function dn(n){if(ne(!!n),typeof n=="string"){let e=0;const t=nA.exec(n);if(ne(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:xe(n.seconds),nanos:xe(n.nanos)}}function xe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function hn(n){return typeof n=="string"?ze.fromBase64String(n):ze.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bg="server_timestamp",$g="__type__",qg="__previous_value__",jg="__local_write_time__";function ic(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[$g])===null||t===void 0?void 0:t.stringValue)===Bg}function ac(n){const e=n.mapValue.fields[qg];return ic(e)?ac(e):e}function Di(n){const e=dn(n.mapValue.fields[jg].timestampValue);return new Oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rA{constructor(e,t,r,s,i,a,c,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d}}const To="(default)";class Er{constructor(e,t){this.projectId=e,this.database=t||To}static empty(){return new Er("","")}get isDefaultDatabase(){return this.database===To}isEqual(e){return e instanceof Er&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xu="__type__",zg="__max__",xn={mapValue:{fields:{__type__:{stringValue:zg}}}},Pu="__vector__",vs="value",Xa={nullValue:"NULL_VALUE"};function Mn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ic(n)?4:Gg(n)?9007199254740991:oc(n)?10:11:te()}function Jt(n,e){if(n===e)return!0;const t=Mn(n);if(t!==Mn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Di(n).isEqual(Di(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=dn(s.timestampValue),c=dn(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return hn(s.bytesValue).isEqual(hn(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return xe(s.geoPointValue.latitude)===xe(i.geoPointValue.latitude)&&xe(s.geoPointValue.longitude)===xe(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return xe(s.integerValue)===xe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=xe(s.doubleValue),c=xe(i.doubleValue);return a===c?Ci(a)===Ci(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return fs(n.arrayValue.values||[],e.arrayValue.values||[],Jt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Cf(a)!==Cf(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!Jt(a[u],c[u])))return!1;return!0}(n,e);default:return te()}}function Vi(n,e){return(n.values||[]).find(t=>Jt(t,e))!==void 0}function Fn(n,e){if(n===e)return 0;const t=Mn(n),r=Mn(e);if(t!==r)return de(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return de(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=xe(i.integerValue||i.doubleValue),u=xe(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return Pf(n.timestampValue,e.timestampValue);case 4:return Pf(Di(n),Di(e));case 5:return kl(n.stringValue,e.stringValue);case 6:return function(i,a){const c=hn(i),u=hn(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=de(c[d],u[d]);if(f!==0)return f}return de(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=de(xe(i.latitude),xe(a.latitude));return c!==0?c:de(xe(i.longitude),xe(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Nf(n.arrayValue,e.arrayValue);case 10:return function(i,a){var c,u,d,f;const p=i.fields||{},g=a.fields||{},_=(c=p[vs])===null||c===void 0?void 0:c.arrayValue,v=(u=g[vs])===null||u===void 0?void 0:u.arrayValue,S=de(((d=_?.values)===null||d===void 0?void 0:d.length)||0,((f=v?.values)===null||f===void 0?void 0:f.length)||0);return S!==0?S:Nf(_,v)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===xn.mapValue&&a===xn.mapValue)return 0;if(i===xn.mapValue)return 1;if(a===xn.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const g=kl(u[p],f[p]);if(g!==0)return g;const _=Fn(c[u[p]],d[f[p]]);if(_!==0)return _}return de(u.length,f.length)}(n.mapValue,e.mapValue);default:throw te()}}function Pf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return de(n,e);const t=dn(n),r=dn(e),s=de(t.seconds,r.seconds);return s!==0?s:de(t.nanos,r.nanos)}function Nf(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Fn(t[s],r[s]);if(i)return i}return de(t.length,r.length)}function ys(n){return Vl(n)}function Vl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=dn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return hn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return J.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Vl(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Vl(t.fields[a])}`;return s+"}"}(n.mapValue):te()}function Za(n){switch(Mn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ac(n);return e?16+Za(e):16;case 5:return 2*n.stringValue.length;case 6:return hn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Za(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Gn(r.fields,(i,a)=>{s+=i.length+Za(a)}),s}(n.mapValue);default:throw te()}}function Tr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Ol(n){return!!n&&"integerValue"in n}function Oi(n){return!!n&&"arrayValue"in n}function Df(n){return!!n&&"nullValue"in n}function Vf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function eo(n){return!!n&&"mapValue"in n}function oc(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[xu])===null||t===void 0?void 0:t.stringValue)===Pu}function pi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Gn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=pi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=pi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Gg(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===zg}const Hg={mapValue:{fields:{[xu]:{stringValue:Pu},[vs]:{arrayValue:{}}}}};function sA(n){return"nullValue"in n?Xa:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Tr(Er.empty(),J.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?oc(n)?Hg:{mapValue:{}}:te()}function iA(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Tr(Er.empty(),J.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Hg:"mapValue"in n?oc(n)?{mapValue:{}}:xn:te()}function Of(n,e){const t=Fn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Lf(n,e){const t=Fn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.value=e}static empty(){return new st({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!eo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=pi(t)}setAll(e){let t=Ve.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=pi(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());eo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Jt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];eo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Gn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new st(pi(this.value))}}function Kg(n){const e=[];return Gn(n.fields,(t,r)=>{const s=new Ve([t]);if(eo(r)){const i=Kg(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new gt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Fe(e,0,ie.min(),ie.min(),ie.min(),st.empty(),0)}static newFoundDocument(e,t,r,s){return new Fe(e,1,t,ie.min(),r,s,0)}static newNoDocument(e,t){return new Fe(e,2,t,ie.min(),ie.min(),st.empty(),0)}static newUnknownDocument(e,t){return new Fe(e,3,t,ie.min(),ie.min(),st.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ie.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=st.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=st.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ie.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Fe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Fe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e,t){this.position=e,this.inclusive=t}}function Mf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=J.comparator(J.fromName(a.referenceValue),t.key):r=Fn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ff(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Jt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,t="asc"){this.field=e,this.dir=t}}function aA(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{}class _e extends Wg{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new oA(e,t,r):t==="array-contains"?new uA(e,r):t==="in"?new e_(e,r):t==="not-in"?new dA(e,r):t==="array-contains-any"?new hA(e,r):new _e(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new cA(e,r):new lA(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Fn(t,this.value)):t!==null&&Mn(this.value)===Mn(t)&&this.matchesComparison(Fn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return te()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ae extends Wg{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new Ae(e,t)}matches(e){return bs(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function bs(n){return n.op==="and"}function Ll(n){return n.op==="or"}function Nu(n){return Qg(n)&&bs(n)}function Qg(n){for(const e of n.filters)if(e instanceof Ae)return!1;return!0}function Ml(n){if(n instanceof _e)return n.field.canonicalString()+n.op.toString()+ys(n.value);if(Nu(n))return n.filters.map(e=>Ml(e)).join(",");{const e=n.filters.map(t=>Ml(t)).join(",");return`${n.op}(${e})`}}function Yg(n,e){return n instanceof _e?function(r,s){return s instanceof _e&&r.op===s.op&&r.field.isEqual(s.field)&&Jt(r.value,s.value)}(n,e):n instanceof Ae?function(r,s){return s instanceof Ae&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&Yg(a,s.filters[c]),!0):!1}(n,e):void te()}function Jg(n,e){const t=n.filters.concat(e);return Ae.create(t,n.op)}function Xg(n){return n instanceof _e?function(t){return`${t.field.canonicalString()} ${t.op} ${ys(t.value)}`}(n):n instanceof Ae?function(t){return t.op.toString()+" {"+t.getFilters().map(Xg).join(" ,")+"}"}(n):"Filter"}class oA extends _e{constructor(e,t,r){super(e,t,r),this.key=J.fromName(r.referenceValue)}matches(e){const t=J.comparator(e.key,this.key);return this.matchesComparison(t)}}class cA extends _e{constructor(e,t){super(e,"in",t),this.keys=Zg("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class lA extends _e{constructor(e,t){super(e,"not-in",t),this.keys=Zg("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Zg(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>J.fromName(r.referenceValue))}class uA extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Oi(t)&&Vi(t.arrayValue,this.value)}}class e_ extends _e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Vi(this.value.arrayValue,t)}}class dA extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(Vi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Vi(this.value.arrayValue,t)}}class hA extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Oi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Vi(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fA{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.le=null}}function Fl(n,e=null,t=[],r=[],s=null,i=null,a=null){return new fA(n,e,t,r,s,i,a)}function Ar(n){const e=he(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ml(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),tc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>ys(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>ys(r)).join(",")),e.le=t}return e.le}function Ji(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!aA(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Yg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ff(n.startAt,e.startAt)&&Ff(n.endAt,e.endAt)}function Ao(n){return J.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function So(n,e){return n.filters.filter(t=>t instanceof _e&&t.field.isEqual(e))}function Uf(n,e,t){let r=Xa,s=!0;for(const i of So(n,e)){let a=Xa,c=!0;switch(i.op){case"<":case"<=":a=sA(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,c=!1;break;case"!=":case"not-in":a=Xa}Of({value:r,inclusive:s},{value:a,inclusive:c})<0&&(r=a,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const a=t.position[i];Of({value:r,inclusive:s},{value:a,inclusive:t.inclusive})<0&&(r=a,s=t.inclusive);break}}return{value:r,inclusive:s}}function Bf(n,e,t){let r=xn,s=!0;for(const i of So(n,e)){let a=xn,c=!0;switch(i.op){case">=":case">":a=iA(i.value),c=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,c=!1;break;case"!=":case"not-in":a=xn}Lf({value:r,inclusive:s},{value:a,inclusive:c})>0&&(r=a,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const a=t.position[i];Lf({value:r,inclusive:s},{value:a,inclusive:t.inclusive})>0&&(r=a,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function pA(n,e,t,r,s,i,a,c){return new Mr(n,e,t,r,s,i,a,c)}function Xi(n){return new Mr(n)}function $f(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Du(n){return n.collectionGroup!==null}function os(n){const e=he(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Se(Ve.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new Li(i,r))}),t.has(Ve.keyField().canonicalString())||e.he.push(new Li(Ve.keyField(),r))}return e.he}function Pt(n){const e=he(n);return e.Pe||(e.Pe=mA(e,os(n))),e.Pe}function mA(n,e){if(n.limitType==="F")return Fl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Li(s.field,i)});const t=n.endAt?new Un(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Un(n.startAt.position,n.startAt.inclusive):null;return Fl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Ul(n,e){const t=n.filters.concat([e]);return new Mr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ro(n,e,t){return new Mr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function cc(n,e){return Ji(Pt(n),Pt(e))&&n.limitType===e.limitType}function t_(n){return`${Ar(Pt(n))}|lt:${n.limitType}`}function Yr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Xg(s)).join(", ")}]`),tc(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>ys(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>ys(s)).join(",")),`Target(${r})`}(Pt(n))}; limitType=${n.limitType})`}function Zi(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):J.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of os(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,u){const d=Mf(a,c,u);return a.inclusive?d<=0:d<0}(r.startAt,os(r),s)||r.endAt&&!function(a,c,u){const d=Mf(a,c,u);return a.inclusive?d>=0:d>0}(r.endAt,os(r),s))}(n,e)}function gA(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function n_(n){return(e,t)=>{let r=!1;for(const s of os(n)){const i=_A(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function _A(n,e,t){const r=n.field.isKeyField()?J.comparator(e.key,t.key):function(i,a,c){const u=a.data.field(i),d=c.data.field(i);return u!==null&&d!==null?Fn(u,d):te()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return te()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Gn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Fg(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vA=new Pe(J.comparator);function Tt(){return vA}const r_=new Pe(J.comparator);function oi(...n){let e=r_;for(const t of n)e=e.insert(t.key,t);return e}function s_(n){let e=r_;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Gt(){return mi()}function i_(){return mi()}function mi(){return new pn(n=>n.toString(),(n,e)=>n.isEqual(e))}const yA=new Pe(J.comparator),bA=new Se(J.comparator);function me(...n){let e=bA;for(const t of n)e=e.add(t);return e}const wA=new Se(de);function IA(){return wA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ci(e)?"-0":e}}function a_(n){return{integerValue:""+n}}function o_(n,e){return CT(e)?a_(e):Vu(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(){this._=void 0}}function EA(n,e,t){return n instanceof Mi?function(s,i){const a={fields:{[$g]:{stringValue:Bg},[jg]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ic(i)&&(i=ac(i)),i&&(a.fields[qg]=i),{mapValue:a}}(t,e):n instanceof ws?l_(n,e):n instanceof Is?u_(n,e):function(s,i){const a=c_(s,i),c=qf(a)+qf(s.Ie);return Ol(a)&&Ol(s.Ie)?a_(c):Vu(s.serializer,c)}(n,e)}function TA(n,e,t){return n instanceof ws?l_(n,e):n instanceof Is?u_(n,e):t}function c_(n,e){return n instanceof Es?function(r){return Ol(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Mi extends lc{}class ws extends lc{constructor(e){super(),this.elements=e}}function l_(n,e){const t=d_(e);for(const r of n.elements)t.some(s=>Jt(s,r))||t.push(r);return{arrayValue:{values:t}}}class Is extends lc{constructor(e){super(),this.elements=e}}function u_(n,e){let t=d_(e);for(const r of n.elements)t=t.filter(s=>!Jt(s,r));return{arrayValue:{values:t}}}class Es extends lc{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function qf(n){return xe(n.integerValue||n.doubleValue)}function d_(n){return Oi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_{constructor(e,t){this.field=e,this.transform=t}}function AA(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof ws&&s instanceof ws||r instanceof Is&&s instanceof Is?fs(r.elements,s.elements,Jt):r instanceof Es&&s instanceof Es?Jt(r.Ie,s.Ie):r instanceof Mi&&s instanceof Mi}(n.transform,e.transform)}class SA{constructor(e,t){this.version=e,this.transformResults=t}}class it{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new it}static exists(e){return new it(void 0,e)}static updateTime(e){return new it(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function to(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class uc{}function f_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new dc(n.key,it.none()):new Os(n.key,n.data,it.none());{const t=n.data,r=st.empty();let s=new Se(Ve.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new mn(n.key,r,new gt(s.toArray()),it.none())}}function RA(n,e,t){n instanceof Os?function(s,i,a){const c=s.value.clone(),u=zf(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof mn?function(s,i,a){if(!to(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=zf(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(p_(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function gi(n,e,t,r){return n instanceof Os?function(i,a,c,u){if(!to(i.precondition,a))return c;const d=i.value.clone(),f=Gf(i.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof mn?function(i,a,c,u){if(!to(i.precondition,a))return c;const d=Gf(i.fieldTransforms,u,a),f=a.data;return f.setAll(p_(i)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,a,c){return to(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function kA(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=c_(r.transform,s||null);i!=null&&(t===null&&(t=st.empty()),t.set(r.field,i))}return t||null}function jf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&fs(r,s,(i,a)=>AA(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Os extends uc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class mn extends uc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function p_(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function zf(n,e,t){const r=new Map;ne(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,TA(a,c,t[s]))}return r}function Gf(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,EA(i,a,e))}return r}class dc extends uc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class m_ extends uc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&RA(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=gi(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=gi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=i_();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=f_(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(ie.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),me())}isEqual(e){return this.batchId===e.batchId&&fs(this.mutations,e.mutations,(t,r)=>jf(t,r))&&fs(this.baseMutations,e.baseMutations,(t,r)=>jf(t,r))}}class Lu{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){ne(e.mutations.length===r.length);let s=function(){return yA}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Lu(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CA{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var je,ve;function xA(n){switch(n){case $.OK:return te();case $.CANCELLED:case $.UNKNOWN:case $.DEADLINE_EXCEEDED:case $.RESOURCE_EXHAUSTED:case $.INTERNAL:case $.UNAVAILABLE:case $.UNAUTHENTICATED:return!1;case $.INVALID_ARGUMENT:case $.NOT_FOUND:case $.ALREADY_EXISTS:case $.PERMISSION_DENIED:case $.FAILED_PRECONDITION:case $.ABORTED:case $.OUT_OF_RANGE:case $.UNIMPLEMENTED:case $.DATA_LOSS:return!0;default:return te()}}function g_(n){if(n===void 0)return pt("GRPC error has no .code"),$.UNKNOWN;switch(n){case je.OK:return $.OK;case je.CANCELLED:return $.CANCELLED;case je.UNKNOWN:return $.UNKNOWN;case je.DEADLINE_EXCEEDED:return $.DEADLINE_EXCEEDED;case je.RESOURCE_EXHAUSTED:return $.RESOURCE_EXHAUSTED;case je.INTERNAL:return $.INTERNAL;case je.UNAVAILABLE:return $.UNAVAILABLE;case je.UNAUTHENTICATED:return $.UNAUTHENTICATED;case je.INVALID_ARGUMENT:return $.INVALID_ARGUMENT;case je.NOT_FOUND:return $.NOT_FOUND;case je.ALREADY_EXISTS:return $.ALREADY_EXISTS;case je.PERMISSION_DENIED:return $.PERMISSION_DENIED;case je.FAILED_PRECONDITION:return $.FAILED_PRECONDITION;case je.ABORTED:return $.ABORTED;case je.OUT_OF_RANGE:return $.OUT_OF_RANGE;case je.UNIMPLEMENTED:return $.UNIMPLEMENTED;case je.DATA_LOSS:return $.DATA_LOSS;default:return te()}}(ve=je||(je={}))[ve.OK=0]="OK",ve[ve.CANCELLED=1]="CANCELLED",ve[ve.UNKNOWN=2]="UNKNOWN",ve[ve.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ve[ve.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ve[ve.NOT_FOUND=5]="NOT_FOUND",ve[ve.ALREADY_EXISTS=6]="ALREADY_EXISTS",ve[ve.PERMISSION_DENIED=7]="PERMISSION_DENIED",ve[ve.UNAUTHENTICATED=16]="UNAUTHENTICATED",ve[ve.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ve[ve.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ve[ve.ABORTED=10]="ABORTED",ve[ve.OUT_OF_RANGE=11]="OUT_OF_RANGE",ve[ve.UNIMPLEMENTED=12]="UNIMPLEMENTED",ve[ve.INTERNAL=13]="INTERNAL",ve[ve.UNAVAILABLE=14]="UNAVAILABLE",ve[ve.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PA=new Vn([4294967295,4294967295],0);function Hf(n){const e=Rl().encode(n),t=new _g;return t.update(e),new Uint8Array(t.digest())}function Kf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Vn([t,r],0),new Vn([s,i],0)]}class Fu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ci(`Invalid padding: ${t}`);if(r<0)throw new ci(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ci(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ci(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=Vn.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(Vn.fromNumber(r)));return s.compare(PA)===1&&(s=new Vn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=Hf(e),[r,s]=Kf(t);for(let i=0;i<this.hashCount;i++){const a=this.Ae(r,s,i);if(!this.Re(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Fu(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ee===0)return;const t=Hf(e),[r,s]=Kf(t);for(let i=0;i<this.hashCount;i++){const a=this.Ae(r,s,i);this.Ve(a)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ci extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,ea.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new hc(ie.min(),s,new Pe(de),Tt(),me())}}class ea{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ea(r,t,me(),me(),me())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class __{constructor(e,t){this.targetId=e,this.ge=t}}class v_{constructor(e,t,r=ze.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Wf{constructor(){this.pe=0,this.ye=Qf(),this.we=ze.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=me(),t=me(),r=me();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:te()}}),new ea(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=Qf()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,ne(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class NA{constructor(e){this.ke=e,this.qe=new Map,this.Qe=Tt(),this.$e=ka(),this.Ue=ka(),this.Ke=new Pe(de)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:te()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(Ao(i))if(r===0){const a=new J(i.path);this.ze(t,a,Fe.newNoDocument(a,ie.min()))}else ne(r===1);else{const a=this.et(t);if(a!==r){const c=this.tt(e),u=c?this.nt(c,e,a):1;if(u!==0){this.Ye(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=hn(r).toUint8Array()}catch(u){if(u instanceof Ug)return Si("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Fu(a,s,i)}catch(u){return Si(u instanceof ci?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.ke.it(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,a)=>{const c=this.Xe(a);if(c){if(i.current&&Ao(c.target)){const u=new J(c.target.path);this._t(u).has(a)||this.ut(a,u)||this.ze(a,u,Fe.newNoDocument(u,e))}i.ve&&(t.set(a,i.Fe()),i.Me())}});let r=me();this.Ue.forEach((i,a)=>{let c=!0;a.forEachWhile(u=>{const d=this.Xe(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.Qe.forEach((i,a)=>a.setReadTime(e));const s=new hc(e,t,this.Ke,this.Qe,r);return this.Qe=Tt(),this.$e=ka(),this.Ue=ka(),this.Ke=new Pe(de),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new Wf,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new Se(de),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new Se(de),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||K("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new Wf),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function ka(){return new Pe(J.comparator)}function Qf(){return new Pe(J.comparator)}const DA={asc:"ASCENDING",desc:"DESCENDING"},VA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},OA={and:"AND",or:"OR"};class LA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Bl(n,e){return n.useProto3Json||tc(e)?e:{value:e}}function Ts(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function y_(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function MA(n,e){return Ts(n,e.toTimestamp())}function mt(n){return ne(!!n),ie.fromTimestamp(function(t){const r=dn(t);return new Oe(r.seconds,r.nanos)}(n))}function Uu(n,e){return $l(n,e).canonicalString()}function $l(n,e){const t=function(s){return new Ee(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function b_(n){const e=Ee.fromString(n);return ne(C_(e)),e}function ko(n,e){return Uu(n.databaseId,e.path)}function vr(n,e){const t=b_(e);if(t.get(1)!==n.databaseId.projectId)throw new W($.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new W($.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new J(E_(t))}function w_(n,e){return Uu(n.databaseId,e)}function I_(n){const e=b_(n);return e.length===4?Ee.emptyPath():E_(e)}function ql(n){return new Ee(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function E_(n){return ne(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Yf(n,e,t){return{name:ko(n,e),fields:t.value.mapValue.fields}}function FA(n,e,t){const r=vr(n,e.name),s=mt(e.updateTime),i=e.createTime?mt(e.createTime):ie.min(),a=new st({mapValue:{fields:e.fields}}),c=Fe.newFoundDocument(r,s,i,a);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function UA(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:te()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(ne(f===void 0||typeof f=="string"),ze.fromBase64String(f||"")):(ne(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ze.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const f=d.code===void 0?$.UNKNOWN:g_(d.code);return new W(f,d.message||"")}(a);t=new v_(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=vr(n,r.document.name),i=mt(r.document.updateTime),a=r.document.createTime?mt(r.document.createTime):ie.min(),c=new st({mapValue:{fields:r.document.fields}}),u=Fe.newFoundDocument(s,i,a,c),d=r.targetIds||[],f=r.removedTargetIds||[];t=new no(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=vr(n,r.document),i=r.readTime?mt(r.readTime):ie.min(),a=Fe.newNoDocument(s,i),c=r.removedTargetIds||[];t=new no([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=vr(n,r.document),i=r.removedTargetIds||[];t=new no([],i,s,null)}else{if(!("filter"in e))return te();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new CA(s,i),c=r.targetId;t=new __(c,a)}}return t}function Co(n,e){let t;if(e instanceof Os)t={update:Yf(n,e.key,e.value)};else if(e instanceof dc)t={delete:ko(n,e.key)};else if(e instanceof mn)t={update:Yf(n,e.key,e.data),updateMask:GA(e.fieldMask)};else{if(!(e instanceof m_))return te();t={verify:ko(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof Mi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ws)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Is)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Es)return{fieldPath:a.field.canonicalString(),increment:c.Ie};throw te()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:MA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:te()}(n,e.precondition)),t}function jl(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?it.updateTime(mt(i.updateTime)):i.exists!==void 0?it.exists(i.exists):it.none()}(e.currentDocument):it.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(a,c){let u=null;if("setToServerValue"in c)ne(c.setToServerValue==="REQUEST_TIME"),u=new Mi;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new ws(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new Is(f)}else"increment"in c?u=new Es(a,c.increment):te();const d=Ve.fromServerFormat(c.fieldPath);return new h_(d,u)}(n,s)):[];if(e.update){e.update.name;const s=vr(n,e.update.name),i=new st({mapValue:{fields:e.update.fields}});if(e.updateMask){const a=function(u){const d=u.fieldPaths||[];return new gt(d.map(f=>Ve.fromServerFormat(f)))}(e.updateMask);return new mn(s,i,a,t,r)}return new Os(s,i,t,r)}if(e.delete){const s=vr(n,e.delete);return new dc(s,t)}if(e.verify){const s=vr(n,e.verify);return new m_(s,t)}return te()}function BA(n,e){return n&&n.length>0?(ne(e!==void 0),n.map(t=>function(s,i){let a=s.updateTime?mt(s.updateTime):mt(i);return a.isEqual(ie.min())&&(a=mt(i)),new SA(a,s.transformResults||[])}(t,e))):[]}function T_(n,e){return{documents:[w_(n,e.path)]}}function A_(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=w_(n,s);const i=function(d){if(d.length!==0)return k_(Ae.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(f=>function(g){return{field:Jr(g.field),direction:qA(g.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Bl(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ht:t,parent:s}}function S_(n){let e=I_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ne(r===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const g=R_(p);return g instanceof Ae&&Nu(g)?g.getFilters():[g]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(g=>function(v){return new Li(Xr(v.field),function(T){switch(T){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(v.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(p){let g;return g=typeof p=="object"?p.value:p,tc(g)?null:g}(t.limit));let u=null;t.startAt&&(u=function(p){const g=!!p.before,_=p.values||[];return new Un(_,g)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const g=!p.before,_=p.values||[];return new Un(_,g)}(t.endAt)),pA(e,s,a,i,c,"F",u,d)}function $A(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return te()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function R_(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Xr(t.unaryFilter.field);return _e.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Xr(t.unaryFilter.field);return _e.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Xr(t.unaryFilter.field);return _e.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Xr(t.unaryFilter.field);return _e.create(a,"!=",{nullValue:"NULL_VALUE"});default:return te()}}(n):n.fieldFilter!==void 0?function(t){return _e.create(Xr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return te()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ae.create(t.compositeFilter.filters.map(r=>R_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return te()}}(t.compositeFilter.op))}(n):te()}function qA(n){return DA[n]}function jA(n){return VA[n]}function zA(n){return OA[n]}function Jr(n){return{fieldPath:n.canonicalString()}}function Xr(n){return Ve.fromServerFormat(n.fieldPath)}function k_(n){return n instanceof _e?function(t){if(t.op==="=="){if(Vf(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NAN"}};if(Df(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Vf(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NOT_NAN"}};if(Df(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Jr(t.field),op:jA(t.op),value:t.value}}}(n):n instanceof Ae?function(t){const r=t.getFilters().map(s=>k_(s));return r.length===1?r[0]:{compositeFilter:{op:zA(t.op),filters:r}}}(n):te()}function GA(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function C_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,t,r,s,i=ie.min(),a=ie.min(),c=ze.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new cn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new cn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new cn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new cn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(e){this.Tt=e}}function HA(n,e){let t;if(e.document)t=FA(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=J.fromSegments(e.noDocument.path),s=Rr(e.noDocument.readTime);t=Fe.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return te();{const r=J.fromSegments(e.unknownDocument.path),s=Rr(e.unknownDocument.version);t=Fe.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new Oe(s[0],s[1]);return ie.fromTimestamp(i)}(e.readTime)),t}function Jf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:xo(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,a){return{name:ko(i,a.key),fields:a.data.value.mapValue.fields,updateTime:Ts(i,a.version.toTimestamp()),createTime:Ts(i,a.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Sr(e.version)};else{if(!e.isUnknownDocument())return te();r.unknownDocument={path:t.path.toArray(),version:Sr(e.version)}}return r}function xo(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Sr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Rr(n){const e=new Oe(n.seconds,n.nanoseconds);return ie.fromTimestamp(e)}function lr(n,e){const t=(e.baseMutations||[]).map(i=>jl(n.Tt,i));for(let i=0;i<e.mutations.length-1;++i){const a=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];a.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>jl(n.Tt,i)),s=Oe.fromMillis(e.localWriteTimeMs);return new Ou(e.batchId,s,t,r)}function li(n){const e=Rr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Rr(n.lastLimboFreeSnapshotVersion):ie.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){return ne(i.documents.length===1),Pt(Xi(I_(i.documents[0])))}(n.query):function(i){return Pt(S_(i))}(n.query),new cn(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,ze.fromBase64String(n.resumeToken))}function P_(n,e){const t=Sr(e.snapshotVersion),r=Sr(e.lastLimboFreeSnapshotVersion);let s;s=Ao(e.target)?T_(n.Tt,e.target):A_(n.Tt,e.target).ht;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Ar(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function N_(n){const e=S_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ro(e,e.limit,"L"):e}function rl(n,e){return new Mu(e.largestBatchId,jl(n.Tt,e.overlayMutation))}function Xf(n,e){const t=e.path.lastSegment();return[n,at(e.path.popLast()),t]}function Zf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Sr(r.readTime),documentKey:at(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KA{getBundleMetadata(e,t){return ep(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:Rr(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return ep(e).put(function(s){return{bundleId:s.id,createTime:Sr(mt(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return tp(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:N_(i.bundledQuery),readTime:Rr(i.readTime)}}(r)})}saveNamedQuery(e,t){return tp(e).put(function(s){return{name:s.name,readTime:Sr(mt(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function ep(n){return Ke(n,nc)}function tp(n){return Ke(n,rc)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new fc(e,r)}getOverlay(e,t){return Js(e).get(Xf(this.userId,t)).next(r=>r?rl(this.serializer,r):null)}getOverlays(e,t){const r=Gt();return V.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,a)=>{const c=new Mu(t,a);s.push(this.Et(e,c))}),V.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(a=>s.add(at(a.getCollectionPath())));const i=[];return s.forEach(a=>{const c=IDBKeyRange.bound([this.userId,a,r],[this.userId,a,r+1],!1,!0);i.push(Js(e).J(Nl,c))}),V.waitFor(i)}getOverlaysForCollection(e,t,r){const s=Gt(),i=at(t),a=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Js(e).G(Nl,a).next(c=>{for(const u of c){const d=rl(this.serializer,u);s.set(d.getKey(),d)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=Gt();let a;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Js(e).Z({index:Vg,range:c},(u,d,f)=>{const p=rl(this.serializer,d);i.size()<s||p.largestBatchId===a?(i.set(p.getKey(),p),a=p.largestBatchId):f.done()}).next(()=>i)}Et(e,t){return Js(e).put(function(s,i,a){const[c,u,d]=Xf(i,a.mutation.key);return{userId:i,collectionPath:u,documentId:d,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:Co(s.Tt,a.mutation)}}(this.serializer,this.userId,t))}}function Js(n){return Ke(n,sc)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WA{dt(e){return Ke(e,ku)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?ze.fromUint8Array(r):ze.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(xe(e.integerValue));else if("doubleValue"in e){const r=xe(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),Ci(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=dn(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(hn(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?Gg(e)?this.ft(t,Number.MAX_SAFE_INTEGER):oc(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):te()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const s of Object.keys(r))this.wt(s,t),this.Rt(r[s],t)}vt(e,t){var r,s;const i=e.fields||{};this.ft(t,53);const a=vs,c=((s=(r=i[a].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.length)||0;this.ft(t,15),t.gt(xe(c)),this.wt(a,t),this.Rt(i[a],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const s of r)this.Rt(s,t)}Dt(e,t){this.ft(t,37),J.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}ur.xt=new ur;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gr=255;function QA(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function np(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const a=QA(255&r[i]);if(s+=a,a!==8)break}return s}(n);return Math.ceil(e/8)}class YA{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const s=t.codePointAt(0);this.Nt(240|s>>>18),this.Nt(128|63&s>>>12),this.Nt(128|63&s>>>6),this.Nt(128|63&s)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const s=t.codePointAt(0);this.kt(240|s>>>18),this.kt(128|63&s>>>12),this.kt(128|63&s>>>6),this.kt(128|63&s)}}this.qt()}Ut(e){const t=this.Kt(e),r=np(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Gt(e){const t=this.Kt(e),r=np(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}zt(){this.jt(Gr),this.jt(255)}Ht(){this.Jt(Gr),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===Gr?(this.jt(Gr),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===Gr?(this.Jt(Gr),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class JA{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class XA{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class Xs{constructor(){this.Zt=new YA,this.Xt=new JA(this.Zt),this.en=new XA(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,t,r,s){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=s}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new dr(this.indexId,this.documentKey,this.arrayValue,r)}}function bn(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=rp(n.arrayValue,e.arrayValue),t!==0?t:(t=rp(n.directionalValue,e.directionalValue),t!==0?t:J.comparator(n.documentKey,e.documentKey)))}function rp(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e){this.rn=new Se((t,r)=>Ve.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(ne(e.collectionGroup===this.collectionId),this.an)return!1;const t=Cl(e);if(t!==void 0&&!this.cn(t))return!1;const r=sr(e);let s=new Set,i=0,a=0;for(;i<r.length&&this.cn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.ln(c,u)||!this.hn(this.sn[a++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(a>=this.sn.length||!this.hn(this.sn[a++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new Se(Ve.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Qa(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Qa(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Qa(r.field,r.dir==="asc"?0:1)));return new vo(vo.UNKNOWN_ID,this.collectionId,t,ki.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(n){var e,t;if(ne(n instanceof _e||n instanceof Ae),n instanceof _e){if(n instanceof e_){const s=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>_e.create(n.field,"==",i)))||[];return Ae.create(s,"or")}return n}const r=n.filters.map(s=>D_(s));return Ae.create(r,n.op)}function ZA(n){if(n.getFilters().length===0)return[];const e=Hl(D_(n));return ne(V_(e)),zl(e)||Gl(e)?[e]:e.getFilters()}function zl(n){return n instanceof _e}function Gl(n){return n instanceof Ae&&Nu(n)}function V_(n){return zl(n)||Gl(n)||function(t){if(t instanceof Ae&&Ll(t)){for(const r of t.getFilters())if(!zl(r)&&!Gl(r))return!1;return!0}return!1}(n)}function Hl(n){if(ne(n instanceof _e||n instanceof Ae),n instanceof _e)return n;if(n.filters.length===1)return Hl(n.filters[0]);const e=n.filters.map(r=>Hl(r));let t=Ae.create(e,n.op);return t=Po(t),V_(t)?t:(ne(t instanceof Ae),ne(bs(t)),ne(t.filters.length>1),t.filters.reduce((r,s)=>Bu(r,s)))}function Bu(n,e){let t;return ne(n instanceof _e||n instanceof Ae),ne(e instanceof _e||e instanceof Ae),t=n instanceof _e?e instanceof _e?function(s,i){return Ae.create([s,i],"and")}(n,e):ip(n,e):e instanceof _e?ip(e,n):function(s,i){if(ne(s.filters.length>0&&i.filters.length>0),bs(s)&&bs(i))return Jg(s,i.getFilters());const a=Ll(s)?s:i,c=Ll(s)?i:s,u=a.filters.map(d=>Bu(d,c));return Ae.create(u,"or")}(n,e),Po(t)}function ip(n,e){if(bs(e))return Jg(e,n.getFilters());{const t=e.filters.map(r=>Bu(n,r));return Ae.create(t,"or")}}function Po(n){if(ne(n instanceof _e||n instanceof Ae),n instanceof _e)return n;const e=n.getFilters();if(e.length===1)return Po(e[0]);if(Qg(n))return n;const t=e.map(s=>Po(s)),r=[];return t.forEach(s=>{s instanceof _e?r.push(s):s instanceof Ae&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:Ae.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e0{constructor(){this.Tn=new $u}addToCollectionParentIndex(e,t){return this.Tn.add(t),V.resolve()}getCollectionParents(e,t){return V.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return V.resolve()}deleteFieldIndex(e,t){return V.resolve()}deleteAllFieldIndexes(e){return V.resolve()}createTargetIndexes(e,t){return V.resolve()}getDocumentsMatchingTarget(e,t){return V.resolve(null)}getIndexType(e,t){return V.resolve(0)}getFieldIndexes(e,t){return V.resolve([])}getNextCollectionGroupToUpdate(e){return V.resolve(null)}getMinOffset(e,t){return V.resolve(kt.min())}getMinOffsetFromCollectionGroup(e,t){return V.resolve(kt.min())}updateCollectionGroup(e,t,r){return V.resolve()}updateIndexEntries(e,t){return V.resolve()}}class $u{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Se(Ee.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Se(Ee.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap="IndexedDbIndexManager",Ca=new Uint8Array(0);class t0{constructor(e,t){this.databaseId=t,this.In=new $u,this.En=new pn(r=>Ar(r),(r,s)=>Ji(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const i={collectionId:r,parent:at(s)};return op(e).put(i)}return V.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[Tg(t),""],!1,!0);return op(e).G(s).next(i=>{for(const a of i){if(a.collectionId!==t)break;r.push(zt(a.parent))}return r})}addFieldIndex(e,t){const r=Zs(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const a=Kr(e);return i.next(c=>{a.put(Zf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=Zs(e),s=Kr(e),i=Hr(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Zs(e),r=Hr(e),s=Kr(e);return t.J().next(()=>r.J()).next(()=>s.J())}createTargetIndexes(e,t){return V.forEach(this.dn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new sp(r).Pn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Hr(e);let s=!0;const i=new Map;return V.forEach(this.dn(t),a=>this.An(e,a).next(c=>{s&&(s=!!c),i.set(a,c)})).next(()=>{if(s){let a=me();const c=[];return V.forEach(i,(u,d)=>{K(ap,`Using index ${function(x){return`id=${x.indexId}|cg=${x.collectionGroup}|f=${x.fields.map(L=>`${L.fieldPath}:${L.kind}`).join(",")}`}(u)} to execute ${Ar(t)}`);const f=function(x,L){const C=Cl(L);if(C===void 0)return null;for(const M of So(x,C.fieldPath))switch(M.op){case"array-contains-any":return M.value.arrayValue.values||[];case"array-contains":return[M.value]}return null}(d,u),p=function(x,L){const C=new Map;for(const M of sr(L))for(const E of So(x,M.fieldPath))switch(E.op){case"==":case"in":C.set(M.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return C.set(M.fieldPath.canonicalString(),E.value),Array.from(C.values())}return null}(d,u),g=function(x,L){const C=[];let M=!0;for(const E of sr(L)){const y=E.kind===0?Uf(x,E.fieldPath,x.startAt):Bf(x,E.fieldPath,x.startAt);C.push(y.value),M&&(M=y.inclusive)}return new Un(C,M)}(d,u),_=function(x,L){const C=[];let M=!0;for(const E of sr(L)){const y=E.kind===0?Bf(x,E.fieldPath,x.endAt):Uf(x,E.fieldPath,x.endAt);C.push(y.value),M&&(M=y.inclusive)}return new Un(C,M)}(d,u),v=this.Rn(u,d,g),S=this.Rn(u,d,_),T=this.Vn(u,d,p),D=this.mn(u.indexId,f,v,g.inclusive,S,_.inclusive,T);return V.forEach(D,k=>r.H(k,t.limit).next(x=>{x.forEach(L=>{const C=J.fromSegments(L.documentKey);a.has(C)||(a=a.add(C),c.push(C))})}))}).next(()=>c)}return V.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=ZA(Ae.create(e.filters,"and")).map(r=>Fl(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,s,i,a,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),d=u/(t!=null?t.length:1),f=[];for(let p=0;p<u;++p){const g=t?this.fn(t[p/d]):Ca,_=this.gn(e,g,r[p%d],s),v=this.pn(e,g,i[p%d],a),S=c.map(T=>this.gn(e,g,T,!0));f.push(...this.createRange(_,v,S))}return f}gn(e,t,r,s){const i=new dr(e,J.empty(),t,r);return s?i:i.nn()}pn(e,t,r,s){const i=new dr(e,J.empty(),t,r);return s?i.nn():i}An(e,t){const r=new sp(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let a=null;for(const c of i)r.un(c)&&(!a||c.fields.length>a.fields.length)&&(a=c);return a})}getIndexType(e,t){let r=2;const s=this.dn(t);return V.forEach(s,i=>this.An(e,i).next(a=>{a?r!==0&&a.fields.length<function(u){let d=new Se(Ve.comparator),f=!1;for(const p of u.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?f=!0:d=d.add(g.field));for(const p of u.orderBy)p.field.isKeyField()||(d=d.add(p.field));return d.size+(f?1:0)}(i)&&(r=1):r=0})).next(()=>function(a){return a.limit!==null}(t)&&s.length>1&&r===2?1:r)}yn(e,t){const r=new Xs;for(const s of sr(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const a=r.tn(s.kind);ur.xt.At(i,a)}return r.Yt()}fn(e){const t=new Xs;return ur.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new Xs;return ur.xt.At(Tr(this.databaseId,t),r.tn(function(i){const a=sr(i);return a.length===0?0:a[a.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let s=[];s.push(new Xs);let i=0;for(const a of sr(e)){const c=r[i++];for(const u of s)if(this.Sn(t,a.fieldPath)&&Oi(c))s=this.bn(s,a,c);else{const d=u.tn(a.kind);ur.xt.At(c,d)}}return this.Dn(s)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const s=[...e],i=[];for(const a of r.arrayValue.values||[])for(const c of s){const u=new Xs;u.seed(c.Yt()),ur.xt.At(a,u.tn(t.kind)),i.push(u)}return i}Sn(e,t){return!!e.filters.find(r=>r instanceof _e&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=Zs(e),s=Kr(e);return(t?r.G(Pl,IDBKeyRange.bound(t,t)):r.G()).next(i=>{const a=[];return V.forEach(i,c=>s.get([c.indexId,this.uid]).next(u=>{a.push(function(f,p){const g=p?new ki(p.sequenceNumber,new kt(Rr(p.readTime),new J(zt(p.documentKey)),p.largestBatchId)):ki.empty(),_=f.fields.map(([v,S])=>new Qa(Ve.fromServerFormat(v),S));return new vo(f.indexId,f.collectionGroup,_,g)}(c,u))})).next(()=>a)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:de(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=Zs(e),i=Kr(e);return this.vn(e).next(a=>s.G(Pl,IDBKeyRange.bound(t,t)).next(c=>V.forEach(c,u=>i.put(Zf(u.indexId,this.uid,a,r)))))}updateIndexEntries(e,t){const r=new Map;return V.forEach(t,(s,i)=>{const a=r.get(s.collectionGroup);return(a?V.resolve(a):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),V.forEach(c,u=>this.Cn(e,s,u).next(d=>{const f=this.Fn(i,u);return d.isEqual(f)?V.resolve():this.Mn(e,i,u,d,f)}))))})}xn(e,t,r,s){return Hr(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,s){return Hr(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const s=Hr(e);let i=new Se(bn);return s.Z({index:Dg,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(a,c)=>{i=i.add(new dr(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>i)}Fn(e,t){let r=new Se(bn);const s=this.yn(t,e);if(s==null)return r;const i=Cl(t);if(i!=null){const a=e.data.field(i.fieldPath);if(Oi(a))for(const c of a.arrayValue.values||[])r=r.add(new dr(t.indexId,e.key,this.fn(c),s))}else r=r.add(new dr(t.indexId,e.key,Ca,s));return r}Mn(e,t,r,s,i){K(ap,"Updating index entries for document '%s'",t.key);const a=[];return function(u,d,f,p,g){const _=u.getIterator(),v=d.getIterator();let S=zr(_),T=zr(v);for(;S||T;){let D=!1,k=!1;if(S&&T){const x=f(S,T);x<0?k=!0:x>0&&(D=!0)}else S!=null?k=!0:D=!0;D?(p(T),T=zr(v)):k?(g(S),S=zr(_)):(S=zr(_),T=zr(v))}}(s,i,bn,c=>{a.push(this.xn(e,t,r,c))},c=>{a.push(this.On(e,t,r,c))}),V.waitFor(a)}vn(e){let t=1;return Kr(e).Z({index:Ng,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((a,c)=>bn(a,c)).filter((a,c,u)=>!c||bn(a,u[c-1])!==0);const s=[];s.push(e);for(const a of r){const c=bn(a,e),u=bn(a,t);if(c===0)s[0]=e.nn();else if(c>0&&u<0)s.push(a),s.push(a.nn());else if(u>0)break}s.push(t);const i=[];for(let a=0;a<s.length;a+=2){if(this.Nn(s[a],s[a+1]))return[];const c=[s[a].indexId,this.uid,s[a].arrayValue,s[a].directionalValue,Ca,[]],u=[s[a+1].indexId,this.uid,s[a+1].arrayValue,s[a+1].directionalValue,Ca,[]];i.push(IDBKeyRange.bound(c,u))}return i}Nn(e,t){return bn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(cp)}getMinOffset(e,t){return V.mapArray(this.dn(t),r=>this.An(e,r).next(s=>s||te())).next(cp)}}function op(n){return Ke(n,Ni)}function Hr(n){return Ke(n,Eo)}function Zs(n){return Ke(n,Ru)}function Kr(n){return Ke(n,Io)}function cp(n){ne(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;Tu(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new kt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},O_=41943040;class rt{static withCacheSize(e){return new rt(e,rt.DEFAULT_COLLECTION_PERCENTILE,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L_(n,e,t){const r=n.store(Ot),s=n.store(ps),i=[],a=IDBKeyRange.only(t.batchId);let c=0;const u=r.Z({range:a},(f,p,g)=>(c++,g.delete()));i.push(u.next(()=>{ne(c===1)}));const d=[];for(const f of t.mutations){const p=Cg(e,f.key.path,t.batchId);i.push(s.delete(p)),d.push(f.key)}return V.waitFor(i).next(()=>d)}function No(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw te();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */rt.DEFAULT_COLLECTION_PERCENTILE=10,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,rt.DEFAULT=new rt(O_,rt.DEFAULT_COLLECTION_PERCENTILE,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),rt.DISABLED=new rt(-1,0,0);class pc{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Bn={}}static It(e,t,r,s){ne(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new pc(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return wn(e).Z({index:hr,range:r},(s,i,a)=>{t=!1,a.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=Zr(e),a=wn(e);return a.add({}).next(c=>{ne(typeof c=="number");const u=new Ou(c,t,r,s),d=function(_,v,S){const T=S.baseMutations.map(k=>Co(_.Tt,k)),D=S.mutations.map(k=>Co(_.Tt,k));return{userId:v,batchId:S.batchId,localWriteTimeMs:S.localWriteTime.toMillis(),baseMutations:T,mutations:D}}(this.serializer,this.userId,u),f=[];let p=new Se((g,_)=>de(g.canonicalString(),_.canonicalString()));for(const g of s){const _=Cg(this.userId,g.key.path,c);p=p.add(g.key.path.popLast()),f.push(a.put(d)),f.push(i.put(_,NT))}return p.forEach(g=>{f.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Bn[c]=u.keys()}),V.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return wn(e).get(t).next(r=>r?(ne(r.userId===this.userId),lr(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?V.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Bn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return wn(e).Z({index:hr,range:s},(a,c,u)=>{c.userId===this.userId&&(ne(c.batchId>=r),i=lr(this.serializer,c)),u.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=gr;return wn(e).Z({index:hr,range:t,reverse:!0},(s,i,a)=>{r=i.batchId,a.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,gr],[this.userId,Number.POSITIVE_INFINITY]);return wn(e).G(hr,t).next(r=>r.map(s=>lr(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Ya(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return Zr(e).Z({range:s},(a,c,u)=>{const[d,f,p]=a,g=zt(f);if(d===this.userId&&t.path.isEqual(g))return wn(e).get(p).next(_=>{if(!_)throw te();ne(_.userId===this.userId),i.push(lr(this.serializer,_))});u.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Se(de);const s=[];return t.forEach(i=>{const a=Ya(this.userId,i.path),c=IDBKeyRange.lowerBound(a),u=Zr(e).Z({range:c},(d,f,p)=>{const[g,_,v]=d,S=zt(_);g===this.userId&&i.path.isEqual(S)?r=r.add(v):p.done()});s.push(u)}),V.waitFor(s).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Ya(this.userId,r),a=IDBKeyRange.lowerBound(i);let c=new Se(de);return Zr(e).Z({range:a},(u,d,f)=>{const[p,g,_]=u,v=zt(g);p===this.userId&&r.isPrefixOf(v)?v.length===s&&(c=c.add(_)):f.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],s=[];return t.forEach(i=>{s.push(wn(e).get(i).next(a=>{if(a===null)throw te();ne(a.userId===this.userId),r.push(lr(this.serializer,a))}))}),V.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return L_(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),V.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return V.resolve();const r=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),s=[];return Zr(e).Z({range:r},(i,a,c)=>{if(i[0]===this.userId){const u=zt(i[1]);s.push(u)}else c.done()}).next(()=>{ne(s.length===0)})})}containsKey(e,t){return M_(e,this.userId,t)}Qn(e){return F_(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:gr,lastStreamToken:""})}}function M_(n,e,t){const r=Ya(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let a=!1;return Zr(n).Z({range:i,Y:!0},(c,u,d)=>{const[f,p,g]=c;f===e&&p===s&&(a=!0),d.done()}).next(()=>a)}function wn(n){return Ke(n,Ot)}function Zr(n){return Ke(n,ps)}function F_(n){return Ke(n,xi)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new kr(0)}static Kn(){return new kr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n0{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new kr(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>ie.fromTimestamp(new Oe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Gn(e,s)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Wr(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(ne(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return Wr(e).Z((a,c)=>{const u=li(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))}).next(()=>V.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Wr(e).Z((r,s)=>{const i=li(s);t(i)})}Wn(e){return up(e).get(wo).next(t=>(ne(t!==null),t))}Gn(e,t){return up(e).put(wo,t)}zn(e,t){return Wr(e).put(P_(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=Ar(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Wr(e).Z({range:s,index:Pg},(a,c,u)=>{const d=li(c);Ji(t,d.target)&&(i=d,u.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=kn(e);return t.forEach(a=>{const c=at(a.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,a))}),V.waitFor(s)}removeMatchingKeys(e,t,r){const s=kn(e);return V.forEach(t,i=>{const a=at(i.path);return V.waitFor([s.delete([r,a]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=kn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=kn(e);let i=me();return s.Z({range:r,Y:!0},(a,c,u)=>{const d=zt(a[1]),f=new J(d);i=i.add(f)}).next(()=>i)}containsKey(e,t){const r=at(t.path),s=IDBKeyRange.bound([r],[Tg(r)],!1,!0);let i=0;return kn(e).Z({index:Su,Y:!0,range:s},([a,c],u,d)=>{a!==0&&(i++,d.done())}).next(()=>i>0)}lt(e,t){return Wr(e).get(t).next(r=>r?li(r):null)}}function Wr(n){return Ke(n,ms)}function up(n){return Ke(n,_r)}function kn(n){return Ke(n,gs)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dp="LruGarbageCollector",U_=1048576;function hp([n,e],[t,r]){const s=de(n,t);return s===0?de(e,r):s}class r0{constructor(e){this.Hn=e,this.buffer=new Se(hp),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();hp(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class B_{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){K(dp,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){zn(t)?K(dp,"Ignoring IndexedDB error during garbage collection: ",t):await Lr(t)}await this.er(3e5)})}}class s0{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return V.resolve(xt.ae);const r=new r0(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(K("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(lp)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(K("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),lp):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,a,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(K("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(d=Date.now(),Qr()<=ge.DEBUG&&K("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function $_(n,e){return new s0(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(e,t){this.db=e,this.garbageCollector=$_(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,s)=>t(s))}addReference(e,t,r){return xa(e,r)}removeReference(e,t,r){return xa(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return xa(e,t)}ar(e,t){return function(s,i){let a=!1;return F_(s).X(c=>M_(s,c,i).next(u=>(u&&(a=!0),V.resolve(!u)))).next(()=>a)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this._r(e,(a,c)=>{if(c<=t){const u=this.ar(e,a).next(d=>{if(!d)return i++,r.getEntry(e,a).next(()=>(r.removeEntry(a,ie.min()),kn(e).delete(function(p){return[0,at(p.path)]}(a))))});s.push(u)}}).next(()=>V.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return xa(e,t)}_r(e,t){const r=kn(e);let s,i=xt.ae;return r.Z({index:Su},([a,c],{path:u,sequenceNumber:d})=>{a===0?(i!==xt.ae&&t(new J(zt(s)),i),i=d,s=u):i=xt.ae}).next(()=>{i!==xt.ae&&t(new J(zt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function xa(n,e){return kn(n).put(function(r,s){return{targetId:0,path:at(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(){this.changes=new pn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Fe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?V.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a0{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return er(e).put(r)}removeEntry(e,t,r){return er(e).delete(function(i,a){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],xo(a),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=Fe.newInvalidDocument(t);return er(e).Z({index:Ja,range:IDBKeyRange.only(ei(t))},(s,i)=>{r=this.cr(t,i)}).next(()=>r)}lr(e,t){let r={size:0,document:Fe.newInvalidDocument(t)};return er(e).Z({index:Ja,range:IDBKeyRange.only(ei(t))},(s,i)=>{r={document:this.cr(t,i),size:No(i)}}).next(()=>r)}getEntries(e,t){let r=Tt();return this.hr(e,t,(s,i)=>{const a=this.cr(s,i);r=r.insert(s,a)}).next(()=>r)}Pr(e,t){let r=Tt(),s=new Pe(J.comparator);return this.hr(e,t,(i,a)=>{const c=this.cr(i,a);r=r.insert(i,c),s=s.insert(i,No(a))}).next(()=>({documents:r,Tr:s}))}hr(e,t,r){if(t.isEmpty())return V.resolve();let s=new Se(mp);t.forEach(u=>s=s.add(u));const i=IDBKeyRange.bound(ei(s.first()),ei(s.last())),a=s.getIterator();let c=a.getNext();return er(e).Z({index:Ja,range:i},(u,d,f)=>{const p=J.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;c&&mp(c,p)<0;)r(c,null),c=a.getNext();c&&c.isEqual(p)&&(r(c,d),c=a.hasNext()?a.getNext():null),c?f.W(ei(c)):f.done()}).next(()=>{for(;c;)r(c,null),c=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const a=t.path,c=[a.popLast().toArray(),a.lastSegment(),xo(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return er(e).G(IDBKeyRange.bound(c,u,!0)).next(d=>{i?.incrementDocumentReadCount(d.length);let f=Tt();for(const p of d){const g=this.cr(J.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(Zi(t,g)||s.has(g.key))&&(f=f.insert(g.key,g))}return f})}getAllFromCollectionGroup(e,t,r,s){let i=Tt();const a=pp(t,r),c=pp(t,kt.max());return er(e).Z({index:xg,range:IDBKeyRange.bound(a,c,!0)},(u,d,f)=>{const p=this.cr(J.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);i=i.insert(p.key,p),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(e){return new o0(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return fp(e).get(xl).next(t=>(ne(!!t),t))}ur(e,t){return fp(e).put(xl,t)}cr(e,t){if(t){const r=HA(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(ie.min())))return r}return Fe.newInvalidDocument(e)}}function j_(n){return new a0(n)}class o0 extends q_{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new pn(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new Se((i,a)=>de(i.canonicalString(),a.canonicalString()));return this.changes.forEach((i,a)=>{const c=this.Er.get(i);if(t.push(this.Ir.removeEntry(e,i,c.readTime)),a.isValidDocument()){const u=Jf(this.Ir.serializer,a);s=s.add(i.path.popLast());const d=No(u);r+=d-c.size,t.push(this.Ir.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=Jf(this.Ir.serializer,a.convertToNoDocument(ie.min()));t.push(this.Ir.addEntry(e,i,u))}}),s.forEach(i=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Ir.updateMetadata(e,r)),V.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:s})=>(s.forEach((i,a)=>{this.Er.set(i,{size:a,readTime:r.get(i).readTime})}),r))}}function fp(n){return Ke(n,Pi)}function er(n){return Ke(n,bo)}function ei(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function pp(n,e){const t=e.documentKey.path.toArray();return[n,xo(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function mp(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=de(t[i],r[i]),s)return s;return s=de(t.length,r.length),s||(s=de(t[t.length-2],r[r.length-2]),s||de(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c0{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z_{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&gi(r.mutation,s,gt.empty(),Oe.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,me()).next(()=>r))}getLocalViewOfDocuments(e,t,r=me()){const s=Gt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=oi();return i.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Gt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,me()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=Tt();const a=mi(),c=function(){return mi()}();return t.forEach((u,d)=>{const f=r.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof mn)?i=i.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),gi(f.mutation,d,f.mutation.getFieldMask(),Oe.now())):a.set(d.key,gt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>a.set(d,f)),t.forEach((d,f)=>{var p;return c.set(d,new c0(f,(p=a.get(d))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,t){const r=mi();let s=new Pe((a,c)=>a-c),i=me();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=r.get(u)||gt.empty();f=c.applyToLocalView(d,f),r.set(u,f);const p=(s.get(c.batchId)||me()).add(u);s=s.insert(c.batchId,p)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,p=i_();f.forEach(g=>{if(!i.has(g)){const _=f_(t.get(g),r.get(g));_!==null&&p.set(g,_),i=i.add(g)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,p))}return V.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return J.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Du(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):V.resolve(Gt());let c=Ri,u=i;return a.next(d=>V.forEach(d,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?V.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,me())).next(f=>({batchId:c,changes:s_(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new J(t)).next(r=>{let s=oi();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=oi();return this.indexManager.getCollectionParents(e,i).next(c=>V.forEach(c,u=>{const d=function(p,g){return new Mr(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(f=>{f.forEach((p,g)=>{a=a.insert(p,g)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,Fe.newInvalidDocument(f)))});let c=oi();return a.forEach((u,d)=>{const f=i.get(u);f!==void 0&&gi(f.mutation,d,gt.empty(),Oe.now()),Zi(t,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l0{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return V.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:mt(s.createTime)}}(t)),V.resolve()}getNamedQuery(e,t){return V.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:N_(s.bundledQuery),readTime:mt(s.readTime)}}(t)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u0{constructor(){this.overlays=new Pe(J.comparator),this.Rr=new Map}getOverlay(e,t){return V.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Gt();return V.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),V.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),V.resolve()}getOverlaysForCollection(e,t,r){const s=Gt(),i=t.length+1,a=new J(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return V.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Pe((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let f=i.get(d.largestBatchId);f===null&&(f=Gt(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=Gt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=s)););return V.resolve(c)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Mu(t,r));let i=this.Rr.get(t);i===void 0&&(i=me(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d0{constructor(){this.sessionToken=ze.EMPTY_BYTE_STRING}getSessionToken(e){return V.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(){this.Vr=new Se(We.mr),this.gr=new Se(We.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new We(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new We(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new J(new Ee([])),r=new We(t,e),s=new We(t,e+1),i=[];return this.gr.forEachInRange([r,s],a=>{this.wr(a),i.push(a.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new J(new Ee([])),r=new We(t,e),s=new We(t,e+1);let i=me();return this.gr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new We(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class We{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return J.comparator(e.key,t.key)||de(e.Cr,t.Cr)}static pr(e,t){return de(e.Cr,t.Cr)||J.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h0{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new Se(We.mr)}checkEmpty(e){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Ou(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Mr=this.Mr.add(new We(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return V.resolve(a)}lookupMutationBatch(e,t){return V.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return V.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?gr:this.Fr-1)}getAllMutationBatches(e){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new We(t,0),s=new We(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],a=>{const c=this.Or(a.Cr);i.push(c)}),V.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Se(de);return t.forEach(s=>{const i=new We(s,0),a=new We(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,a],c=>{r=r.add(c.Cr)})}),V.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;J.isDocumentKey(i)||(i=i.child(""));const a=new We(new J(i),0);let c=new Se(de);return this.Mr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(u.Cr)),!0)},a),V.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ne(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return V.forEach(t.mutations,s=>{const i=new We(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new We(t,0),s=this.Mr.firstAfterOrEqual(r);return V.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,V.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f0{constructor(e){this.kr=e,this.docs=function(){return new Pe(J.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return V.resolve(r?r.document.mutableCopy():Fe.newInvalidDocument(t))}getEntries(e,t){let r=Tt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Fe.newInvalidDocument(s))}),V.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Tt();const a=t.path,c=new J(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Tu(Ag(f),r)<=0||(s.has(f.key)||Zi(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return V.resolve(i)}getAllFromCollectionGroup(e,t,r,s){te()}qr(e,t){return V.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new p0(this)}getSize(e){return V.resolve(this.size)}}class p0 extends q_{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),V.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m0{constructor(e){this.persistence=e,this.Qr=new pn(t=>Ar(t),Ji),this.lastRemoteSnapshotVersion=ie.min(),this.highestTargetId=0,this.$r=0,this.Ur=new qu,this.targetCount=0,this.Kr=kr.Un()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),V.resolve()}getLastRemoteSnapshotVersion(e){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return V.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),V.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new kr(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,V.resolve()}updateTargetData(e,t){return this.zn(t),V.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,V.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),V.waitFor(i).next(()=>s)}getTargetCount(e){return V.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return V.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),V.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),V.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),V.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return V.resolve(r)}containsKey(e,t){return V.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new xt(0),this.zr=!1,this.zr=!0,this.jr=new d0,this.referenceDelegate=e(this),this.Hr=new m0(this),this.indexManager=new e0,this.remoteDocumentCache=function(s){return new f0(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new x_(t),this.Yr=new l0(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new u0,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new h0(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){K("MemoryPersistence","Starting transaction:",e);const s=new g0(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return V.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class g0 extends Rg{constructor(e){super(),this.currentSequenceNumber=e}}class mc{constructor(e){this.persistence=e,this.ti=new qu,this.ni=null}static ri(e){return new mc(e)}get ii(){if(this.ni)return this.ni;throw te()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),V.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),V.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),V.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.ii,r=>{const s=J.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,ie.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return V.or([()=>V.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class Do{constructor(e,t){this.persistence=e,this.oi=new pn(r=>at(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=$_(this,t)}static ri(e,t){return new Do(e,t)}Zr(){}Xr(e){return V.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return V.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?V.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,a=>this.ar(e,a,t).next(c=>{c||(r++,i.removeEntry(a,ie.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),V.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),V.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),V.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),V.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Za(e.data.value)),t}ar(e,t,r){return V.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return V.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _0{constructor(e){this.serializer=e}B(e,t,r,s){const i=new ec("createOrUpgrade",t);r<1&&s>=1&&(function(u){u.createObjectStore(Yi)}(e),function(u){u.createObjectStore(xi,{keyPath:PT}),u.createObjectStore(Ot,{keyPath:Rf,autoIncrement:!0}).createIndex(hr,kf,{unique:!0}),u.createObjectStore(ps)}(e),gp(e),function(u){u.createObjectStore(ir)}(e));let a=V.resolve();return r<3&&s>=3&&(r!==0&&(function(u){u.deleteObjectStore(gs),u.deleteObjectStore(ms),u.deleteObjectStore(_r)}(e),gp(e)),a=a.next(()=>function(u){const d=u.store(_r),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:ie.min().toTimestamp(),targetCount:0};return d.put(wo,f)}(i))),r<4&&s>=4&&(r!==0&&(a=a.next(()=>function(u,d){return d.store(Ot).G().next(p=>{u.deleteObjectStore(Ot),u.createObjectStore(Ot,{keyPath:Rf,autoIncrement:!0}).createIndex(hr,kf,{unique:!0});const g=d.store(Ot),_=p.map(v=>g.put(v));return V.waitFor(_)})}(e,i))),a=a.next(()=>{(function(u){u.createObjectStore(_s,{keyPath:BT})})(e)})),r<5&&s>=5&&(a=a.next(()=>this._i(i))),r<6&&s>=6&&(a=a.next(()=>(function(u){u.createObjectStore(Pi)}(e),this.ai(i)))),r<7&&s>=7&&(a=a.next(()=>this.ui(i))),r<8&&s>=8&&(a=a.next(()=>this.ci(e,i))),r<9&&s>=9&&(a=a.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(a=a.next(()=>this.li(i))),r<11&&s>=11&&(a=a.next(()=>{(function(u){u.createObjectStore(nc,{keyPath:$T})})(e),function(u){u.createObjectStore(rc,{keyPath:qT})}(e)})),r<12&&s>=12&&(a=a.next(()=>{(function(u){const d=u.createObjectStore(sc,{keyPath:QT});d.createIndex(Nl,YT,{unique:!1}),d.createIndex(Vg,JT,{unique:!1})})(e)})),r<13&&s>=13&&(a=a.next(()=>function(u){const d=u.createObjectStore(bo,{keyPath:DT});d.createIndex(Ja,VT),d.createIndex(xg,OT)}(e)).next(()=>this.hi(e,i)).next(()=>e.deleteObjectStore(ir))),r<14&&s>=14&&(a=a.next(()=>this.Pi(e,i))),r<15&&s>=15&&(a=a.next(()=>function(u){u.createObjectStore(Ru,{keyPath:jT,autoIncrement:!0}).createIndex(Pl,zT,{unique:!1}),u.createObjectStore(Io,{keyPath:GT}).createIndex(Ng,HT,{unique:!1}),u.createObjectStore(Eo,{keyPath:KT}).createIndex(Dg,WT,{unique:!1})}(e))),r<16&&s>=16&&(a=a.next(()=>{t.objectStore(Io).clear()}).next(()=>{t.objectStore(Eo).clear()})),r<17&&s>=17&&(a=a.next(()=>{(function(u){u.createObjectStore(ku,{keyPath:XT})})(e)})),a}ai(e){let t=0;return e.store(ir).Z((r,s)=>{t+=No(s)}).next(()=>{const r={byteSize:t};return e.store(Pi).put(xl,r)})}_i(e){const t=e.store(xi),r=e.store(Ot);return t.G().next(s=>V.forEach(s,i=>{const a=IDBKeyRange.bound([i.userId,gr],[i.userId,i.lastAcknowledgedBatchId]);return r.G(hr,a).next(c=>V.forEach(c,u=>{ne(u.userId===i.userId);const d=lr(this.serializer,u);return L_(e,i.userId,d).next(()=>{})}))}))}ui(e){const t=e.store(gs),r=e.store(ir);return e.store(_r).get(wo).next(s=>{const i=[];return r.Z((a,c)=>{const u=new Ee(a),d=function(p){return[0,at(p)]}(u);i.push(t.get(d).next(f=>f?V.resolve():(p=>t.put({targetId:0,path:at(p),sequenceNumber:s.highestListenSequenceNumber}))(u)))}).next(()=>V.waitFor(i))})}ci(e,t){e.createObjectStore(Ni,{keyPath:UT});const r=t.store(Ni),s=new $u,i=a=>{if(s.add(a)){const c=a.lastSegment(),u=a.popLast();return r.put({collectionId:c,parent:at(u)})}};return t.store(ir).Z({Y:!0},(a,c)=>{const u=new Ee(a);return i(u.popLast())}).next(()=>t.store(ps).Z({Y:!0},([a,c,u],d)=>{const f=zt(c);return i(f.popLast())}))}li(e){const t=e.store(ms);return t.Z((r,s)=>{const i=li(s),a=P_(this.serializer,i);return t.put(a)})}hi(e,t){const r=t.store(ir),s=[];return r.Z((i,a)=>{const c=t.store(bo),u=function(p){return p.document?new J(Ee.fromString(p.document.name).popFirst(5)):p.noDocument?J.fromSegments(p.noDocument.path):p.unknownDocument?J.fromSegments(p.unknownDocument.path):te()}(a).path.toArray(),d={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(c.put(d))}).next(()=>V.waitFor(s))}Pi(e,t){const r=t.store(Ot),s=j_(this.serializer),i=new ju(mc.ri,this.serializer.Tt);return r.G().next(a=>{const c=new Map;return a.forEach(u=>{var d;let f=(d=c.get(u.userId))!==null&&d!==void 0?d:me();lr(this.serializer,u).keys().forEach(p=>f=f.add(p)),c.set(u.userId,f)}),V.forEach(c,(u,d)=>{const f=new ft(d),p=fc.It(this.serializer,f),g=i.getIndexManager(f),_=pc.It(f,this.serializer,g,i.referenceDelegate);return new z_(s,_,p,g).recalculateAndSaveOverlaysForDocumentKeys(new Dl(t,xt.ae),u).next()})})}}function gp(n){n.createObjectStore(gs,{keyPath:MT}).createIndex(Su,FT,{unique:!0}),n.createObjectStore(ms,{keyPath:"targetId"}).createIndex(Pg,LT,{unique:!0}),n.createObjectStore(_r)}const In="IndexedDbPersistence",sl=18e5,il=5e3,al="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",v0="main";class zu{constructor(e,t,r,s,i,a,c,u,d,f,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=i,this.window=a,this.document=c,this.Ii=d,this.Ei=f,this.di=p,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=g=>Promise.resolve(),!zu.D())throw new W($.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new i0(this,s),this.gi=t+v0,this.serializer=new x_(u),this.pi=new On(this.gi,this.di,new _0(this.serializer)),this.jr=new WA,this.Hr=new n0(this.referenceDelegate,this.serializer),this.remoteDocumentCache=j_(this.serializer),this.Yr=new KA,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,f===!1&&pt(In,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new W($.FAILED_PRECONDITION,al);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new xt(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Pa(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if(zn(e))return K(In,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return K(In,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return ti(e).get(jr).next(t=>V.resolve(this.Ni(t)))}Bi(e){return Pa(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,sl)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=Ke(t,_s);return r.G().next(s=>{const i=this.qi(s,sl),a=s.filter(c=>i.indexOf(c)===-1);return V.forEach(a,c=>r.delete(c.clientId)).next(()=>a)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?V.resolve(!0):ti(e).get(jr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,il)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new W($.FAILED_PRECONDITION,al);return!1}}return!(!this.networkEnabled||!this.inForeground)||Pa(e).G().next(r=>this.qi(r,il).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||a&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&K(In,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[Yi,_s],e=>{const t=new Dl(e,xt.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>Pa(e).G().next(t=>this.qi(t,sl).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return pc.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new t0(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return fc.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){K(In,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(u){return u===17?tA:u===16?eA:u===15?Cu:u===14?Mg:u===13?Lg:u===12?ZT:u===11?Og:void te()}(this.di);let a;return this.pi.runTransaction(e,s,i,c=>(a=new Dl(c,this.Gr?this.Gr.next():xt.ae),t==="readwrite-primary"?this.Fi(a).next(u=>!!u||this.Mi(a)).next(u=>{if(!u)throw pt(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new W($.FAILED_PRECONDITION,Sg);return r(a)}).next(u=>this.Oi(a).next(()=>u)):this.ji(a).next(()=>r(a)))).then(c=>(a.raiseOnCommittedEvent(),c))}ji(e){return ti(e).get(jr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,il)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new W($.FAILED_PRECONDITION,al)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ti(e).put(jr,t)}static D(){return On.D()}xi(e){const t=ti(e);return t.get(jr).next(r=>this.Ni(r)?(K(In,"Releasing primary lease."),t.delete(jr)):V.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(pt(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;Cm()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return K(In,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return pt(In,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){pt("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function ti(n){return Ke(n,Yi)}function Pa(n){return Ke(n,_s)}function y0(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=me(),s=me();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Gu(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b0{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return Cm()?8:kg(He())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new b0;return this._s(e,t,a).next(c=>{if(i.result=c,this.Xi)return this.us(e,t,a,c.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(Qr()<=ge.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",Yr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),V.resolve()):(Qr()<=ge.DEBUG&&K("QueryEngine","Query:",Yr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(Qr()<=ge.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",Yr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Pt(t))):V.resolve())}rs(e,t){if($f(t))return V.resolve(null);let r=Pt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Ro(t,null,"F"),r=Pt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=me(...i);return this.ns.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.cs(t,c);return this.ls(t,d,a,u.readTime)?this.rs(e,Ro(t,null,"F")):this.hs(e,d,t,u)}))})))}ss(e,t,r,s){return $f(t)||s.isEqual(ie.min())?V.resolve(null):this.ns.getDocuments(e,r).next(i=>{const a=this.cs(t,i);return this.ls(t,a,r,s)?V.resolve(null):(Qr()<=ge.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Yr(t)),this.hs(e,a,t,TT(s,Ri)).next(c=>c))})}cs(e,t){let r=new Se(n_(e));return t.forEach((s,i)=>{Zi(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return Qr()<=ge.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",Yr(t)),this.ns.getDocumentsMatchingQuery(e,t,kt.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu="LocalStore",w0=3e8;class I0{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new Pe(de),this.Is=new pn(i=>Ar(i),Ji),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new z_(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function H_(n,e,t,r){return new I0(n,e,t,r)}async function K_(n,e){const t=he(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let u=me();for(const d of s){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Rs:d,removedBatchIds:a,addedBatchIds:c}))})})}function E0(n,e){const t=he(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){const p=d.batch,g=p.keys();let _=V.resolve();return g.forEach(v=>{_=_.next(()=>f.getEntry(u,v)).next(S=>{const T=d.docVersions.get(v);ne(T!==null),S.version.compareTo(T)<0&&(p.applyToRemoteDocument(S,d),S.isValidDocument()&&(S.setReadTime(d.commitVersion),f.addEntry(S)))})}),_.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=me();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function W_(n){const e=he(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function T0(n,e){const t=he(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const c=[];e.targetChanges.forEach((f,p)=>{const g=s.get(p);if(!g)return;c.push(t.Hr.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.Hr.addMatchingKeys(i,f.addedDocuments,p)));let _=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?_=_.withResumeToken(ze.EMPTY_BYTE_STRING,ie.min()).withLastLimboFreeSnapshotVersion(ie.min()):f.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(f.resumeToken,r)),s=s.insert(p,_),function(S,T,D){return S.resumeToken.approximateByteSize()===0||T.snapshotVersion.toMicroseconds()-S.snapshotVersion.toMicroseconds()>=w0?!0:D.addedDocuments.size+D.modifiedDocuments.size+D.removedDocuments.size>0}(g,_,f)&&c.push(t.Hr.updateTargetData(i,_))});let u=Tt(),d=me();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(A0(i,a,e.documentUpdates).next(f=>{u=f.Vs,d=f.fs})),!r.isEqual(ie.min())){const f=t.Hr.getLastRemoteSnapshotVersion(i).next(p=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return V.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ts=s,i))}function A0(n,e,t){let r=me(),s=me();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=Tt();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(ie.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):K(Hu,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Vs:a,fs:s}})}function S0(n,e){const t=he(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=gr),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function R0(n,e){const t=he(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,V.resolve(s)):t.Hr.allocateTargetId(r).next(a=>(s=new cn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function Kl(n,e,t){const r=he(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!zn(a))throw a;K(Hu,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function _p(n,e,t){const r=he(n);let s=ie.min(),i=me();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,f){const p=he(u),g=p.Is.get(f);return g!==void 0?V.resolve(p.Ts.get(g)):p.Hr.getTargetData(d,f)}(r,a,Pt(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(a,c.targetId).next(u=>{i=u})}).next(()=>r.Ps.getDocumentsMatchingQuery(a,e,t?s:ie.min(),t?i:me())).next(c=>(k0(r,gA(e),c),{documents:c,gs:i})))}function k0(n,e,t){let r=n.Es.get(e)||ie.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class vp{constructor(){this.activeTargetIds=IA()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Q_{constructor(){this.ho=new vp,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new vp,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C0{To(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yp="ConnectivityMonitor";class bp{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){K(yp,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){K(yp,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Na=null;function Wl(){return Na===null?Na=function(){return 268435456+Math.round(2147483648*Math.random())}():Na++,"0x"+Na.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol="RestConnection",x0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class P0{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===To?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const a=Wl(),c=this.bo(e,t.toUriEncodedString());K(ol,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(u,s,i),this.vo(e,c,u,r).then(d=>(K(ol,`Received RPC '${e}' ${a}: `,d),d),d=>{throw Si(ol,`RPC '${e}' ${a} failed with error: `,d,"url: ",c,"request:",r),d})}Co(e,t,r,s,i,a){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Vs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=x0[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N0{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt="WebChannelConnection";class D0 extends P0{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=Wl();return new Promise((a,c)=>{const u=new vg;u.setWithCredentials(!0),u.listenOnce(yg.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Wa.NO_ERROR:const f=u.getResponseJson();K(nt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),a(f);break;case Wa.TIMEOUT:K(nt,`RPC '${e}' ${i} timed out`),c(new W($.DEADLINE_EXCEEDED,"Request time out"));break;case Wa.HTTP_ERROR:const p=u.getStatus();if(K(nt,`RPC '${e}' ${i} failed with status:`,p,"response text:",u.getResponseText()),p>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const _=g?.error;if(_&&_.status&&_.message){const v=function(T){const D=T.toLowerCase().replace(/_/g,"-");return Object.values($).indexOf(D)>=0?D:$.UNKNOWN}(_.status);c(new W(v,_.message))}else c(new W($.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new W($.UNAVAILABLE,"Connection failed."));break;default:te()}}finally{K(nt,`RPC '${e}' ${i} completed.`)}});const d=JSON.stringify(s);K(nt,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",d,r,15)})}Wo(e,t,r){const s=Wl(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Ig(),c=wg(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Do(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");K(nt,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=a.createWebChannel(f,u);let g=!1,_=!1;const v=new N0({Fo:T=>{_?K(nt,`Not sending because RPC '${e}' stream ${s} is closed:`,T):(g||(K(nt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),K(nt,`RPC '${e}' stream ${s} sending:`,T),p.send(T))},Mo:()=>p.close()}),S=(T,D,k)=>{T.listen(D,x=>{try{k(x)}catch(L){setTimeout(()=>{throw L},0)}})};return S(p,ai.EventType.OPEN,()=>{_||(K(nt,`RPC '${e}' stream ${s} transport opened.`),v.Qo())}),S(p,ai.EventType.CLOSE,()=>{_||(_=!0,K(nt,`RPC '${e}' stream ${s} transport closed`),v.Uo())}),S(p,ai.EventType.ERROR,T=>{_||(_=!0,Si(nt,`RPC '${e}' stream ${s} transport errored:`,T),v.Uo(new W($.UNAVAILABLE,"The operation could not be completed")))}),S(p,ai.EventType.MESSAGE,T=>{var D;if(!_){const k=T.data[0];ne(!!k);const x=k,L=x?.error||((D=x[0])===null||D===void 0?void 0:D.error);if(L){K(nt,`RPC '${e}' stream ${s} received error:`,L);const C=L.status;let M=function(w){const R=je[w];if(R!==void 0)return g_(R)}(C),E=L.message;M===void 0&&(M=$.INTERNAL,E="Unknown error status: "+C+" with message "+L.message),_=!0,v.Uo(new W(M,E)),p.close()}else K(nt,`RPC '${e}' stream ${s} received:`,k),v.Ko(k)}}),S(c,bg.STAT_EVENT,T=>{T.stat===Sl.PROXY?K(nt,`RPC '${e}' stream ${s} detected buffering proxy`):T.stat===Sl.NOPROXY&&K(nt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{v.$o()},0),v}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V0(){return typeof window<"u"?window:null}function ro(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gc(n){return new LA(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&K("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wp="PersistentStream";class J_{constructor(e,t,r,s,i,a,c,u){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new Y_(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===$.RESOURCE_EXHAUSTED?(pt(t.toString()),pt("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===$.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new W($.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return K(wp,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(K(wp,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class O0 extends J_{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=UA(this.serializer,e),r=function(i){if(!("targetChange"in i))return ie.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?ie.min():a.readTime?mt(a.readTime):ie.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=ql(this.serializer),t.addTarget=function(i,a){let c;const u=a.target;if(c=Ao(u)?{documents:T_(i,u)}:{query:A_(i,u).ht},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=y_(i,a.resumeToken);const d=Bl(i,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(ie.min())>0){c.readTime=Ts(i,a.snapshotVersion.toTimestamp());const d=Bl(i,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=$A(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=ql(this.serializer),t.removeTarget=e,this.I_(t)}}class L0 extends J_{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return ne(!!e.streamToken),this.lastStreamToken=e.streamToken,ne(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){ne(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=BA(e.writeResults,e.commitTime),r=mt(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=ql(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Co(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M0{}class F0 extends M0{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new W($.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.So(e,$l(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===$.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W($.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Co(e,$l(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===$.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new W($.UNKNOWN,a.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class U0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(pt(t),this.N_=!1):K("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr="RemoteStore";class B0{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(a=>{r.enqueueAndForget(async()=>{Fr(this)&&(K(Cr,"Restarting streams for network reachability change."),await async function(u){const d=he(u);d.W_.add(4),await ta(d),d.j_.set("Unknown"),d.W_.delete(4),await _c(d)}(this))})}),this.j_=new U0(r,s)}}async function _c(n){if(Fr(n))for(const e of n.G_)await e(!0)}async function ta(n){for(const e of n.G_)await e(!1)}function X_(n,e){const t=he(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),Yu(t)?Qu(t):Ls(t).c_()&&Wu(t,e))}function Ku(n,e){const t=he(n),r=Ls(t);t.K_.delete(e),r.c_()&&Z_(t,e),t.K_.size===0&&(r.c_()?r.P_():Fr(t)&&t.j_.set("Unknown"))}function Wu(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ie.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ls(n).y_(e)}function Z_(n,e){n.H_.Ne(e),Ls(n).w_(e)}function Qu(n){n.H_=new NA({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),Ls(n).start(),n.j_.B_()}function Yu(n){return Fr(n)&&!Ls(n).u_()&&n.K_.size>0}function Fr(n){return he(n).W_.size===0}function ev(n){n.H_=void 0}async function $0(n){n.j_.set("Online")}async function q0(n){n.K_.forEach((e,t)=>{Wu(n,e)})}async function j0(n,e){ev(n),Yu(n)?(n.j_.q_(e),Qu(n)):n.j_.set("Unknown")}async function z0(n,e,t){if(n.j_.set("Online"),e instanceof v_&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.K_.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.K_.delete(c),s.H_.removeTarget(c))}(n,e)}catch(r){K(Cr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Vo(n,r)}else if(e instanceof no?n.H_.We(e):e instanceof __?n.H_.Ze(e):n.H_.je(e),!t.isEqual(ie.min()))try{const r=await W_(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.H_.ot(a);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.K_.get(d);f&&i.K_.set(d,f.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,d)=>{const f=i.K_.get(u);if(!f)return;i.K_.set(u,f.withResumeToken(ze.EMPTY_BYTE_STRING,f.snapshotVersion)),Z_(i,u);const p=new cn(f.target,u,d,f.sequenceNumber);Wu(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){K(Cr,"Failed to raise snapshot:",r),await Vo(n,r)}}async function Vo(n,e,t){if(!zn(e))throw e;n.W_.add(1),await ta(n),n.j_.set("Offline"),t||(t=()=>W_(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{K(Cr,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await _c(n)})}function tv(n,e){return e().catch(t=>Vo(n,t,e))}async function na(n){const e=he(n),t=Bn(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:gr;for(;G0(e);)try{const s=await S0(e.localStore,r);if(s===null){e.U_.length===0&&t.P_();break}r=s.batchId,H0(e,s)}catch(s){await Vo(e,s)}nv(e)&&rv(e)}function G0(n){return Fr(n)&&n.U_.length<10}function H0(n,e){n.U_.push(e);const t=Bn(n);t.c_()&&t.S_&&t.b_(e.mutations)}function nv(n){return Fr(n)&&!Bn(n).u_()&&n.U_.length>0}function rv(n){Bn(n).start()}async function K0(n){Bn(n).C_()}async function W0(n){const e=Bn(n);for(const t of n.U_)e.b_(t.mutations)}async function Q0(n,e,t){const r=n.U_.shift(),s=Lu.from(r,e,t);await tv(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await na(n)}async function Y0(n,e){e&&Bn(n).S_&&await async function(r,s){if(function(a){return xA(a)&&a!==$.ABORTED}(s.code)){const i=r.U_.shift();Bn(r).h_(),await tv(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await na(r)}}(n,e),nv(n)&&rv(n)}async function Ip(n,e){const t=he(n);t.asyncQueue.verifyOperationInProgress(),K(Cr,"RemoteStore received new credentials");const r=Fr(t);t.W_.add(3),await ta(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await _c(t)}async function J0(n,e){const t=he(n);e?(t.W_.delete(2),await _c(t)):e||(t.W_.add(2),await ta(t),t.j_.set("Unknown"))}function Ls(n){return n.J_||(n.J_=function(t,r,s){const i=he(t);return i.M_(),new O0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:$0.bind(null,n),No:q0.bind(null,n),Lo:j0.bind(null,n),p_:z0.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),Yu(n)?Qu(n):n.j_.set("Unknown")):(await n.J_.stop(),ev(n))})),n.J_}function Bn(n){return n.Y_||(n.Y_=function(t,r,s){const i=he(t);return i.M_(),new L0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:K0.bind(null,n),Lo:Y0.bind(null,n),D_:W0.bind(null,n),v_:Q0.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await na(n)):(await n.Y_.stop(),n.U_.length>0&&(K(Cr,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Qt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new Ju(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W($.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Xu(n,e){if(pt("AsyncQueue",`${e}: ${n}`),zn(n))return new W($.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{static emptySet(e){return new cs(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||J.comparator(t.key,r.key):(t,r)=>J.comparator(t.key,r.key),this.keyedMap=oi(),this.sortedSet=new Pe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof cs)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new cs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(){this.Z_=new Pe(J.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):te():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class As{constructor(e,t,r,s,i,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new As(e,t,cs.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&cc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X0{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class Z0{constructor(){this.queries=Tp(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=he(t),i=s.queries;s.queries=Tp(),i.forEach((a,c)=>{for(const u of c.ta)u.onError(r)})})(this,new W($.ABORTED,"Firestore shutting down"))}}function Tp(){return new pn(n=>t_(n),cc)}async function Zu(n,e){const t=he(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new X0,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=Xu(a,`Initialization of query '${Yr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&td(t)}async function ed(n,e){const t=he(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.ta.indexOf(e);a>=0&&(i.ta.splice(a,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function eS(n,e){const t=he(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.ta)c.oa(s)&&(r=!0);a.ea=s}}r&&td(t)}function tS(n,e,t){const r=he(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function td(n){n.ia.forEach(e=>{e.next()})}var Ql,Ap;(Ap=Ql||(Ql={}))._a="default",Ap.Cache="cache";class nd{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new As(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=As.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==Ql.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(e){this.key=e}}class iv{constructor(e){this.key=e}}class nS{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=me(),this.mutatedKeys=me(),this.ya=n_(e),this.wa=new cs(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new Ep,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const g=s.get(f),_=Zi(this.query,p)?p:null,v=!!g&&this.mutatedKeys.has(g.key),S=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let T=!1;g&&_?g.data.isEqual(_.data)?v!==S&&(r.track({type:3,doc:_}),T=!0):this.va(g,_)||(r.track({type:2,doc:_}),T=!0,(u&&this.ya(_,u)>0||d&&this.ya(_,d)<0)&&(c=!0)):!g&&_?(r.track({type:0,doc:_}),T=!0):g&&!_&&(r.track({type:1,doc:g}),T=!0,(u||d)&&(c=!0)),T&&(_?(a=a.add(_),i=S?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{wa:a,Da:r,ls:c,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const a=e.Da.X_();a.sort((f,p)=>function(_,v){const S=T=>{switch(T){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return te()}};return S(_)-S(v)}(f.type,p.type)||this.ya(f.doc,p.doc)),this.Ca(r),s=s!=null&&s;const c=t&&!s?this.Fa():[],u=this.pa.size===0&&this.current&&!s?1:0,d=u!==this.ga;return this.ga=u,a.length!==0||d?{snapshot:new As(this.query,e.wa,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new Ep,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=me(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new iv(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new sv(r))}),t}Oa(e){this.fa=e.gs,this.pa=me();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return As.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const rd="SyncEngine";class rS{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class sS{constructor(e){this.key=e,this.Ba=!1}}class iS{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.La={},this.ka=new pn(c=>t_(c),cc),this.qa=new Map,this.Qa=new Set,this.$a=new Pe(J.comparator),this.Ua=new Map,this.Ka=new qu,this.Wa={},this.Ga=new Map,this.za=kr.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function aS(n,e,t=!0){const r=dv(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await av(r,e,t,!0),s}async function oS(n,e){const t=dv(n);await av(t,e,!0,!1)}async function av(n,e,t,r){const s=await R0(n.localStore,Pt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await cS(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&X_(n.remoteStore,s),c}async function cS(n,e,t,r,s){n.Ha=(p,g,_)=>async function(S,T,D,k){let x=T.view.ba(D);x.ls&&(x=await _p(S.localStore,T.query,!1).then(({documents:E})=>T.view.ba(E,x)));const L=k&&k.targetChanges.get(T.targetId),C=k&&k.targetMismatches.get(T.targetId)!=null,M=T.view.applyChanges(x,S.isPrimaryClient,L,C);return Rp(S,T.targetId,M.Ma),M.snapshot}(n,p,g,_);const i=await _p(n.localStore,e,!0),a=new nS(e,i.gs),c=a.ba(i.documents),u=ea.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(c,n.isPrimaryClient,u);Rp(n,t,d.Ma);const f=new rS(e,t,a);return n.ka.set(e,f),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),d.snapshot}async function lS(n,e,t){const r=he(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(a=>!cc(a,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Kl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Ku(r.remoteStore,s.targetId),Yl(r,s.targetId)}).catch(Lr)):(Yl(r,s.targetId),await Kl(r.localStore,s.targetId,!0))}async function uS(n,e){const t=he(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ku(t.remoteStore,r.targetId))}async function dS(n,e,t){const r=hv(n);try{const s=await function(a,c){const u=he(a),d=Oe.now(),f=c.reduce((_,v)=>_.add(v.key),me());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",_=>{let v=Tt(),S=me();return u.ds.getEntries(_,f).next(T=>{v=T,v.forEach((D,k)=>{k.isValidDocument()||(S=S.add(D))})}).next(()=>u.localDocuments.getOverlayedDocuments(_,v)).next(T=>{p=T;const D=[];for(const k of c){const x=kA(k,p.get(k.key).overlayedDocument);x!=null&&D.push(new mn(k.key,x,Kg(x.value.mapValue),it.exists(!0)))}return u.mutationQueue.addMutationBatch(_,d,D,c)}).next(T=>{g=T;const D=T.applyToLocalDocumentSet(p,S);return u.documentOverlayCache.saveOverlays(_,T.batchId,D)})}).then(()=>({batchId:g.batchId,changes:s_(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,u){let d=a.Wa[a.currentUser.toKey()];d||(d=new Pe(de)),d=d.insert(c,u),a.Wa[a.currentUser.toKey()]=d}(r,s.batchId,t),await ra(r,s.changes),await na(r.remoteStore)}catch(s){const i=Xu(s,"Failed to persist write");t.reject(i)}}async function ov(n,e){const t=he(n);try{const r=await T0(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Ua.get(i);a&&(ne(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.Ba=!0:s.modifiedDocuments.size>0?ne(a.Ba):s.removedDocuments.size>0&&(ne(a.Ba),a.Ba=!1))}),await ra(t,r,e)}catch(r){await Lr(r)}}function Sp(n,e,t){const r=he(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,a)=>{const c=a.view.sa(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const u=he(a);u.onlineState=c;let d=!1;u.queries.forEach((f,p)=>{for(const g of p.ta)g.sa(c)&&(d=!0)}),d&&td(u)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function hS(n,e,t){const r=he(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ua.get(e),i=s&&s.key;if(i){let a=new Pe(J.comparator);a=a.insert(i,Fe.newNoDocument(i,ie.min()));const c=me().add(i),u=new hc(ie.min(),new Map,new Pe(de),a,c);await ov(r,u),r.$a=r.$a.remove(i),r.Ua.delete(e),sd(r)}else await Kl(r.localStore,e,!1).then(()=>Yl(r,e,t)).catch(Lr)}async function fS(n,e){const t=he(n),r=e.batch.batchId;try{const s=await E0(t.localStore,e);lv(t,r,null),cv(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ra(t,s)}catch(s){await Lr(s)}}async function pS(n,e,t){const r=he(n);try{const s=await function(a,c){const u=he(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(p=>(ne(p!==null),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(r.localStore,e);lv(r,e,t),cv(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ra(r,s)}catch(s){await Lr(s)}}function cv(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function lv(n,e,t){const r=he(n);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function Yl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||uv(n,r)})}function uv(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(Ku(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),sd(n))}function Rp(n,e,t){for(const r of t)r instanceof sv?(n.Ka.addReference(r.key,e),mS(n,r)):r instanceof iv?(K(rd,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||uv(n,r.key)):te()}function mS(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(K(rd,"New document in limbo: "+t),n.Qa.add(r),sd(n))}function sd(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new J(Ee.fromString(e)),r=n.za.next();n.Ua.set(r,new sS(t)),n.$a=n.$a.insert(t,r),X_(n.remoteStore,new cn(Pt(Xi(t.path)),r,"TargetPurposeLimboResolution",xt.ae))}}async function ra(n,e,t){const r=he(n),s=[],i=[],a=[];r.ka.isEmpty()||(r.ka.forEach((c,u)=>{a.push(r.Ha(u,e,t).then(d=>{var f;if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:(f=t?.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){s.push(d);const p=Gu.Yi(u.targetId,d);i.push(p)}}))}),await Promise.all(a),r.La.p_(s),await async function(u,d){const f=he(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>V.forEach(d,g=>V.forEach(g.Hi,_=>f.persistence.referenceDelegate.addReference(p,g.targetId,_)).next(()=>V.forEach(g.Ji,_=>f.persistence.referenceDelegate.removeReference(p,g.targetId,_)))))}catch(p){if(!zn(p))throw p;K(Hu,"Failed to update sequence numbers: "+p)}for(const p of d){const g=p.targetId;if(!p.fromCache){const _=f.Ts.get(g),v=_.snapshotVersion,S=_.withLastLimboFreeSnapshotVersion(v);f.Ts=f.Ts.insert(g,S)}}}(r.localStore,i))}async function gS(n,e){const t=he(n);if(!t.currentUser.isEqual(e)){K(rd,"User change. New user:",e.toKey());const r=await K_(t.localStore,e);t.currentUser=e,function(i,a){i.Ga.forEach(c=>{c.forEach(u=>{u.reject(new W($.CANCELLED,a))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ra(t,r.Rs)}}function _S(n,e){const t=he(n),r=t.Ua.get(e);if(r&&r.Ba)return me().add(r.key);{let s=me();const i=t.qa.get(e);if(!i)return s;for(const a of i){const c=t.ka.get(a);s=s.unionWith(c.view.Sa)}return s}}function dv(n){const e=he(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=ov.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=_S.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=hS.bind(null,e),e.La.p_=eS.bind(null,e.eventManager),e.La.Ja=tS.bind(null,e.eventManager),e}function hv(n){const e=he(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=fS.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=pS.bind(null,e),e}class Fi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=gc(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return H_(this.persistence,new G_,e.initialUser,this.serializer)}Xa(e){return new ju(mc.ri,this.serializer)}Za(e){return new Q_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Fi.provider={build:()=>new Fi};class vS extends Fi{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){ne(this.persistence.referenceDelegate instanceof Do);const r=this.persistence.referenceDelegate.garbageCollector;return new B_(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?rt.withCacheSize(this.cacheSizeBytes):rt.DEFAULT;return new ju(r=>Do.ri(r,t),this.serializer)}}class yS extends Fi{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await hv(this.ru.syncEngine),await na(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return H_(this.persistence,new G_,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new B_(r,e.asyncQueue,t)}nu(e,t){const r=new kT(t,this.persistence);return new RT(e.asyncQueue,r)}Xa(e){const t=y0(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?rt.withCacheSize(this.cacheSizeBytes):rt.DEFAULT;return new zu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,V0(),ro(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new Q_}}class Oo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Sp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=gS.bind(null,this.syncEngine),await J0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Z0}()}createDatastore(e){const t=gc(e.databaseInfo.databaseId),r=function(i){return new D0(i)}(e.databaseInfo);return function(i,a,c,u){return new F0(i,a,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new B0(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Sp(this.syncEngine,t,0),function(){return bp.D()?new bp:new C0}())}createSyncEngine(e,t){return function(s,i,a,c,u,d,f){const p=new iS(s,i,a,c,u,d);return f&&(p.ja=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=he(s);K(Cr,"RemoteStore shutting down."),i.W_.add(5),await ta(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Oo.provider={build:()=>new Oo};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):pt("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n="FirestoreClient";class bS{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=ft.UNAUTHENTICATED,this.clientId=Eg.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{K($n,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(K($n,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Qt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Xu(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function cl(n,e){n.asyncQueue.verifyOperationInProgress(),K($n,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await K_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function kp(n,e){n.asyncQueue.verifyOperationInProgress();const t=await wS(n);K($n,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Ip(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Ip(e.remoteStore,s)),n._onlineComponents=e}async function wS(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){K($n,"Using user provided OfflineComponentProvider");try{await cl(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===$.FAILED_PRECONDITION||s.code===$.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Si("Error using user provided cache. Falling back to memory cache: "+t),await cl(n,new Fi)}}else K($n,"Using default OfflineComponentProvider"),await cl(n,new vS(void 0));return n._offlineComponents}async function fv(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(K($n,"Using user provided OnlineComponentProvider"),await kp(n,n._uninitializedComponentsProvider._online)):(K($n,"Using default OnlineComponentProvider"),await kp(n,new Oo))),n._onlineComponents}function IS(n){return fv(n).then(e=>e.syncEngine)}async function Lo(n){const e=await fv(n),t=e.eventManager;return t.onListen=aS.bind(null,e.syncEngine),t.onUnlisten=lS.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=oS.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=uS.bind(null,e.syncEngine),t}function ES(n,e,t={}){const r=new Qt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const f=new id({next:g=>{f.su(),a.enqueueAndForget(()=>ed(i,p));const _=g.docs.has(c);!_&&g.fromCache?d.reject(new W($.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&g.fromCache&&u&&u.source==="server"?d.reject(new W($.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new nd(Xi(c.path),f,{includeMetadataChanges:!0,Ta:!0});return Zu(i,p)}(await Lo(n),n.asyncQueue,e,t,r)),r.promise}function TS(n,e,t={}){const r=new Qt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const f=new id({next:g=>{f.su(),a.enqueueAndForget(()=>ed(i,p)),g.fromCache&&u.source==="server"?d.reject(new W($.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new nd(c,f,{includeMetadataChanges:!0,Ta:!0});return Zu(i,p)}(await Lo(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pv(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cp=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mv(n,e,t){if(!t)throw new W($.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function AS(n,e,t,r){if(e===!0&&r===!0)throw new W($.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function xp(n){if(!J.isDocumentKey(n))throw new W($.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Pp(n){if(J.isDocumentKey(n))throw new W($.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function vc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":te()}function Rt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new W($.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=vc(n);throw new W($.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function SS(n,e){if(e<=0)throw new W($.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RS="firestore.googleapis.com",Np=!0;class Dp{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W($.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=RS,this.ssl=Np}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Np;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=O_;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<U_)throw new W($.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}AS("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=pv((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new W($.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new W($.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new W($.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ad{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Dp({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W($.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W($.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Dp(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new _T;switch(r.type){case"firstParty":return new bT(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W($.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Cp.get(t);r&&(K("ComponentProvider","Removing Datastore"),Cp.delete(t),r.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Xt(this.firestore,e,this._query)}}class ot{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ln(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ot(this.firestore,e,this._key)}}class Ln extends Xt{constructor(e,t,r){super(e,t,Xi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ot(this.firestore,null,new J(e))}withConverter(e){return new Ln(this.firestore,e,this._path)}}function Ie(n,e,...t){if(n=Te(n),mv("collection","path",e),n instanceof ad){const r=Ee.fromString(e,...t);return Pp(r),new Ln(n,null,r)}{if(!(n instanceof ot||n instanceof Ln))throw new W($.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ee.fromString(e,...t));return Pp(r),new Ln(n.firestore,null,r)}}function be(n,e,...t){if(n=Te(n),arguments.length===1&&(e=Eg.newId()),mv("doc","path",e),n instanceof ad){const r=Ee.fromString(e,...t);return xp(r),new ot(n,null,new J(r))}{if(!(n instanceof ot||n instanceof Ln))throw new W($.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ee.fromString(e,...t));return xp(r),new ot(n.firestore,n instanceof Ln?n.converter:null,new J(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vp="AsyncQueue";class Op{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new Y_(this,"async_queue_retry"),this.Su=()=>{const r=ro();r&&K(Vp,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=ro();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=ro();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new Qt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!zn(e))throw e;K(Vp,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw pt("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=Ju.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&te()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function Lp(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class fn extends ad{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Op,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Op(e),this._firestoreClient=void 0,await e}}}function kS(n,e,t){t||(t=To);const r=Dr(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(Ii(i,e))return s;throw new W($.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new W($.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<U_)throw new W($.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function yc(n){if(n._terminated)throw new W($.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||CS(n),n._firestoreClient}function CS(n){var e,t,r;const s=n._freezeSettings(),i=function(c,u,d,f){return new rA(c,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,pv(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new bS(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const u=c?._online.build();return{_offline:c?._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ss(ze.fromBase64String(e))}catch(t){throw new W($.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ss(ze.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new W($.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new W($.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new W($.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return de(this._lat,e._lat)||de(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xS=/^__.*__$/;class PS{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new mn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Os(e,this.data,t,this.fieldTransforms)}}class gv{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new mn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function _v(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw te()}}class ld{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new ld(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return Mo(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(_v(this.Lu)&&xS.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class NS{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||gc(e)}ju(e,t,r,s=!1){return new ld({Lu:e,methodName:t,zu:r,path:Ve.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function sa(n){const e=n._freezeSettings(),t=gc(n._databaseId);return new NS(n._databaseId,!!e.ignoreUndefinedProperties,t)}function vv(n,e,t,r,s,i={}){const a=n.ju(i.merge||i.mergeFields?2:0,e,t,s);dd("Data must be an object, but it was:",a,r);const c=bv(r,a);let u,d;if(i.merge)u=new gt(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const g=Jl(e,p,t);if(!a.contains(g))throw new W($.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);Iv(f,g)||f.push(g)}u=new gt(f),d=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=a.fieldTransforms;return new PS(new st(c),u,d)}class ia extends wc{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ia}}class ud extends wc{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new Es(e.serializer,o_(e.serializer,this.Ju));return new h_(e.path,t)}isEqual(e){return e instanceof ud&&this.Ju===e.Ju}}function DS(n,e,t,r){const s=n.ju(1,e,t);dd("Data must be an object, but it was:",s,r);const i=[],a=st.empty();Gn(r,(u,d)=>{const f=hd(e,u,t);d=Te(d);const p=s.Uu(f);if(d instanceof ia)i.push(f);else{const g=aa(d,p);g!=null&&(i.push(f),a.set(f,g))}});const c=new gt(i);return new gv(a,c,s.fieldTransforms)}function VS(n,e,t,r,s,i){const a=n.ju(1,e,t),c=[Jl(e,r,t)],u=[s];if(i.length%2!=0)throw new W($.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Jl(e,i[g])),u.push(i[g+1]);const d=[],f=st.empty();for(let g=c.length-1;g>=0;--g)if(!Iv(d,c[g])){const _=c[g];let v=u[g];v=Te(v);const S=a.Uu(_);if(v instanceof ia)d.push(_);else{const T=aa(v,S);T!=null&&(d.push(_),f.set(_,T))}}const p=new gt(d);return new gv(f,p,a.fieldTransforms)}function yv(n,e,t,r=!1){return aa(t,n.ju(r?4:3,e))}function aa(n,e){if(wv(n=Te(n)))return dd("Unsupported field value:",e,n),bv(n,e);if(n instanceof wc)return function(r,s){if(!_v(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let u=aa(c,s.Ku(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Te(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return o_(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Oe.fromDate(r);return{timestampValue:Ts(s.serializer,i)}}if(r instanceof Oe){const i=new Oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ts(s.serializer,i)}}if(r instanceof od)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ss)return{bytesValue:y_(s.serializer,r._byteString)};if(r instanceof ot){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Wu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Uu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof cd)return function(a,c){return{mapValue:{fields:{[xu]:{stringValue:Pu},[vs]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Vu(c.serializer,d)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${vc(r)}`)}(n,e)}function bv(n,e){const t={};return Fg(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Gn(n,(r,s)=>{const i=aa(s,e.qu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function wv(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Oe||n instanceof od||n instanceof Ss||n instanceof ot||n instanceof wc||n instanceof cd)}function dd(n,e,t){if(!wv(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=vc(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function Jl(n,e,t){if((e=Te(e))instanceof bc)return e._internalPath;if(typeof e=="string")return hd(n,e);throw Mo("Field path arguments must be of type string or ",n,!1,void 0,t)}const OS=new RegExp("[~\\*/\\[\\]]");function hd(n,e,t){if(e.search(OS)>=0)throw Mo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new bc(...e.split("."))._internalPath}catch{throw Mo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Mo(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new W($.INVALID_ARGUMENT,c+n+u)}function Iv(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ot(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new LS(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ic("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class LS extends fd{data(){return super.data()}}function Ic(n,e){return typeof e=="string"?hd(n,e):e instanceof bc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ev(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new W($.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class pd{}class Ec extends pd{}function Qe(n,e,...t){let r=[];e instanceof pd&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof md).length,c=i.filter(u=>u instanceof Tc).length;if(a>1||a>0&&c>0)throw new W($.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Tc extends Ec{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Tc(e,t,r)}_apply(e){const t=this._parse(e);return Tv(e._query,t),new Xt(e.firestore,e.converter,Ul(e._query,t))}_parse(e){const t=sa(e.firestore);return function(i,a,c,u,d,f,p){let g;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new W($.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Fp(p,f);const v=[];for(const S of p)v.push(Mp(u,i,S));g={arrayValue:{values:v}}}else g=Mp(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Fp(p,f),g=yv(c,a,p,f==="in"||f==="not-in");return _e.create(d,f,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function qn(n,e,t){const r=e,s=Ic("where",n);return Tc._create(s,r,t)}class md extends pd{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new md(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ae.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const u of c)Tv(a,u),a=Ul(a,u)}(e._query,t),new Xt(e.firestore,e.converter,Ul(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class gd extends Ec{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new gd(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new W($.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new W($.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Li(i,a)}(e._query,this._field,this._direction);return new Xt(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new Mr(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function ct(n,e="asc"){const t=e,r=Ic("orderBy",n);return gd._create(r,t)}class _d extends Ec{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new _d(e,t,r)}_apply(e){return new Xt(e.firestore,e.converter,Ro(e._query,this._limit,this._limitType))}}function yt(n){return SS("limit",n),_d._create("limit",n,"F")}class vd extends Ec{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new vd(e,t,r)}_apply(e){const t=FS(e,this.type,this._docOrFields,this._inclusive);return new Xt(e.firestore,e.converter,function(s,i){return new Mr(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function MS(...n){return vd._create("startAfter",n,!1)}function FS(n,e,t,r){if(t[0]=Te(t[0]),t[0]instanceof fd)return function(i,a,c,u,d){if(!u)throw new W($.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const f=[];for(const p of os(i))if(p.field.isKeyField())f.push(Tr(a,u.key));else{const g=u.data.field(p.field);if(ic(g))throw new W($.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const _=p.field.canonicalString();throw new W($.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${_}' (used as the orderBy) does not exist.`)}f.push(g)}return new Un(f,d)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=sa(n.firestore);return function(a,c,u,d,f,p){const g=a.explicitOrderBy;if(f.length>g.length)throw new W($.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const _=[];for(let v=0;v<f.length;v++){const S=f[v];if(g[v].field.isKeyField()){if(typeof S!="string")throw new W($.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof S}`);if(!Du(a)&&S.indexOf("/")!==-1)throw new W($.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${S}' contains a slash.`);const T=a.path.child(Ee.fromString(S));if(!J.isDocumentKey(T))throw new W($.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${T}' is not because it contains an odd number of segments.`);const D=new J(T);_.push(Tr(c,D))}else{const T=yv(u,d,S);_.push(T)}}return new Un(_,p)}(n._query,n.firestore._databaseId,s,e,t,r)}}function Mp(n,e,t){if(typeof(t=Te(t))=="string"){if(t==="")throw new W($.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Du(e)&&t.indexOf("/")!==-1)throw new W($.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Ee.fromString(t));if(!J.isDocumentKey(r))throw new W($.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Tr(n,new J(r))}if(t instanceof ot)return Tr(n,t._key);throw new W($.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${vc(t)}.`)}function Fp(n,e){if(!Array.isArray(n)||n.length===0)throw new W($.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Tv(n,e){const t=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new W($.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W($.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class US{convertValue(e,t="none"){switch(Mn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(hn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw te()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Gn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[vs].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>xe(a.doubleValue));return new cd(i)}convertGeoPoint(e){return new od(xe(e.latitude),xe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ac(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Di(e));default:return null}}convertTimestamp(e){const t=dn(e);return new Oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Ee.fromString(e);ne(C_(r));const s=new Er(r.get(1),r.get(3)),i=new J(r.popFirst(5));return s.isEqual(t)||pt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Av(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Sv extends fd{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new so(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ic("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class so extends Sv{data(e={}){return super.data(e)}}class Rv{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ui(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new so(this._firestore,this._userDataWriter,r.key,r,new ui(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new W($.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const u=new so(s._firestore,s._userDataWriter,c.doc.key,c.doc,new ui(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new so(s._firestore,s._userDataWriter,c.doc.key,c.doc,new ui(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,f=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:BS(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function BS(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return te()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hn(n){n=Rt(n,ot);const e=Rt(n.firestore,fn);return ES(yc(e),n._key).then(t=>kv(e,n,t))}class yd extends US{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ss(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ot(this.firestore,null,t)}}function Nt(n){n=Rt(n,Xt);const e=Rt(n.firestore,fn),t=yc(e),r=new yd(e);return Ev(n._query),TS(t,n._query).then(s=>new Rv(e,r,n,s))}function Ac(n,e,t){n=Rt(n,ot);const r=Rt(n.firestore,fn),s=Av(n.converter,e,t);return Sc(r,[vv(sa(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,it.none())])}function Xe(n,e,t,...r){n=Rt(n,ot);const s=Rt(n.firestore,fn),i=sa(s);let a;return a=typeof(e=Te(e))=="string"||e instanceof bc?VS(i,"updateDoc",n._key,e,t,r):DS(i,"updateDoc",n._key,e),Sc(s,[a.toMutation(n._key,it.exists(!0))])}function bd(n){return Sc(Rt(n.firestore,fn),[new dc(n._key,it.none())])}function Bt(n,e){const t=Rt(n.firestore,fn),r=be(n),s=Av(n.converter,e);return Sc(t,[vv(sa(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,it.exists(!1))]).then(()=>r)}function $t(n,...e){var t,r,s;n=Te(n);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Lp(e[a])||(i=e[a],a++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Lp(e[a])){const p=e[a];e[a]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[a+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[a+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let u,d,f;if(n instanceof ot)d=Rt(n.firestore,fn),f=Xi(n._key.path),u={next:p=>{e[a]&&e[a](kv(d,n,p))},error:e[a+1],complete:e[a+2]};else{const p=Rt(n,Xt);d=Rt(p.firestore,fn),f=p._query;const g=new yd(d);u={next:_=>{e[a]&&e[a](new Rv(d,g,p,_))},error:e[a+1],complete:e[a+2]},Ev(n._query)}return function(g,_,v,S){const T=new id(S),D=new nd(_,T,v);return g.asyncQueue.enqueueAndForget(async()=>Zu(await Lo(g),D)),()=>{T.su(),g.asyncQueue.enqueueAndForget(async()=>ed(await Lo(g),D))}}(yc(d),f,c,u)}function Sc(n,e){return function(r,s){const i=new Qt;return r.asyncQueue.enqueueAndForget(async()=>dS(await IS(r),s,i)),i.promise}(yc(n),e)}function kv(n,e,t){const r=t.docs.get(e._key),s=new yd(n);return new Sv(n,s,e._key,r,new ui(t.hasPendingWrites,t.fromCache),e.converter)}class $S{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Cv(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function qS(n){return new $S(n)}class jS{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Oo.provider,this._offlineComponentProvider={build:t=>new yS(t,e?.cacheSizeBytes,this.forceOwnership)}}}function Cv(n){return new jS(n?.forceOwnership)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(){return new ia("deleteField")}function Zt(n){return new ud("increment",n)}(function(e,t=!0){(function(s){Vs=s})(Vr),Yt(new Mt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new fn(new vT(r.getProvider("auth-internal")),new wT(a,r.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new W($.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Er(d.options.projectId,f)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),St(yf,bf,e),St(yf,bf,"esm2017")})();var zS="firebase",GS="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */St(zS,GS,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl=new Map,xv={activated:!1,tokenObservers:[]},HS={initialized:!1,enabled:!1};function Ge(n){return Xl.get(n)||Object.assign({},xv)}function KS(n,e){return Xl.set(n,e),Xl.get(n)}function Rc(){return HS}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pv="https://content-firebaseappcheck.googleapis.com/v1",WS="exchangeRecaptchaV3Token",QS="exchangeDebugToken",Bp={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},YS=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JS{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new wi,this.pending.promise.catch(t=>{}),await XS(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new wi,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function XS(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZS={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},_t=new Ps("appCheck","AppCheck",ZS);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $p(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function wd(n){if(!Ge(n).activated)throw _t.create("use-before-activation",{appName:n.name})}function Nv(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let a="";return t&&(a+=Da(t)+"d:"),r&&(a+=Da(r)+"h:"),a+=Da(s)+"m:"+Da(i)+"s",a}function Da(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Id({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const p=await s.getHeartbeatsHeader();p&&(r["X-Firebase-Client"]=p)}const i={method:"POST",body:JSON.stringify(e),headers:r};let a;try{a=await fetch(n,i)}catch(p){throw _t.create("fetch-network-error",{originalErrorMessage:p?.message})}if(a.status!==200)throw _t.create("fetch-status-error",{httpStatus:a.status});let c;try{c=await a.json()}catch(p){throw _t.create("fetch-parse-error",{originalErrorMessage:p?.message})}const u=c.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw _t.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const d=Number(u[1])*1e3,f=Date.now();return{token:c.token,expireTimeMillis:f+d,issuedAtTimeMillis:f}}function eR(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Pv}/projects/${t}/apps/${r}:${WS}?key=${s}`,body:{recaptcha_v3_token:e}}}function Dv(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Pv}/projects/${t}/apps/${r}:${QS}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tR="firebase-app-check-database",nR=1,Ui="firebase-app-check-store",Vv="debug-token";let Va=null;function Ov(){return Va||(Va=new Promise((n,e)=>{try{const t=indexedDB.open(tR,nR);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(_t.create("storage-open",{originalErrorMessage:(s=r.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Ui,{keyPath:"compositeKey"})}}}catch(t){e(_t.create("storage-open",{originalErrorMessage:t?.message}))}}),Va)}function rR(n){return Mv(Fv(n))}function sR(n,e){return Lv(Fv(n),e)}function iR(n){return Lv(Vv,n)}function aR(){return Mv(Vv)}async function Lv(n,e){const r=(await Ov()).transaction(Ui,"readwrite"),i=r.objectStore(Ui).put({compositeKey:n,value:e});return new Promise((a,c)=>{i.onsuccess=u=>{a()},r.onerror=u=>{var d;c(_t.create("storage-set",{originalErrorMessage:(d=u.target.error)===null||d===void 0?void 0:d.message}))}})}async function Mv(n){const t=(await Ov()).transaction(Ui,"readonly"),s=t.objectStore(Ui).get(n);return new Promise((i,a)=>{s.onsuccess=c=>{const u=c.target.result;i(u?u.value:void 0)},t.onerror=c=>{var u;a(_t.create("storage-get",{originalErrorMessage:(u=c.target.error)===null||u===void 0?void 0:u.message}))}})}function Fv(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi=new Wo("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oR(n){if(Ko()){let e;try{e=await rR(n)}catch(t){Bi.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function ll(n,e){return Ko()?sR(n,e).catch(t=>{Bi.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function cR(){let n;try{n=await aR()}catch{}if(n)return n;{const e=crypto.randomUUID();return iR(e).catch(t=>Bi.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(){return Rc().enabled}async function Td(){const n=Rc();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function lR(){const n=Tm(),e=Rc();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new wi;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(cR())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uR={error:"UNKNOWN_ERROR"};function dR(n){return hu.encodeString(JSON.stringify(n),!1)}async function Zl(n,e=!1){const t=n.app;wd(t);const r=Ge(t);let s=r.token,i;if(s&&!rs(s)&&(r.token=void 0,s=void 0),!s){const u=await r.cachedTokenPromise;u&&(rs(u)?s=u:await ll(t,void 0))}if(!e&&s&&rs(s))return{token:s.token};let a=!1;if(Ed()){r.exchangeTokenPromise||(r.exchangeTokenPromise=Id(Dv(t,await Td()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const u=await r.exchangeTokenPromise;return await ll(t,u),r.token=u,{token:u.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),s=await Ge(t).exchangeTokenPromise}catch(u){u.code==="appCheck/throttled"?Bi.warn(u.message):Bi.error(u),i=u}let c;return s?i?rs(s)?c={token:s.token,internalError:i}:c=jp(i):(c={token:s.token},r.token=s,await ll(t,s)):c=jp(i),a&&$v(t,c),c}async function hR(n){const e=n.app;wd(e);const{provider:t}=Ge(e);if(Ed()){const r=await Td(),{token:s}=await Id(Dv(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function Uv(n,e,t,r){const{app:s}=n,i=Ge(s),a={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,a],i.token&&rs(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),qp(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>qp(n))}function Bv(n,e){const t=Ge(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function qp(n){const{app:e}=n,t=Ge(e);let r=t.tokenRefresher;r||(r=fR(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function fR(n){const{app:e}=n;return new JS(async()=>{const t=Ge(e);let r;if(t.token?r=await Zl(n,!0):r=await Zl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=Ge(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},Bp.RETRIAL_MIN_WAIT,Bp.RETRIAL_MAX_WAIT)}function $v(n,e){const t=Ge(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function rs(n){return n.expireTimeMillis-Date.now()>0}function jp(n){return{token:dR(uR),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pR{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=Ge(this.app);for(const t of e)Bv(this.app,t.next);return Promise.resolve()}}function mR(n,e){return new pR(n,e)}function gR(n){return{getToken:e=>Zl(n,e),getLimitedUseToken:()=>hR(n),addTokenListener:e=>Uv(n,"INTERNAL",e),removeTokenListener:e=>Bv(n.app,e)}}const _R="@firebase/app-check",vR="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yR="https://www.google.com/recaptcha/api.js";function bR(n,e){const t=new wi,r=Ge(n);r.reCAPTCHAState={initialized:t};const s=wR(n),i=$p(!1);return i?zp(n,e,i,s,t):TR(()=>{const a=$p(!1);if(!a)throw new Error("no recaptcha");zp(n,e,a,s,t)}),t.promise}function zp(n,e,t,r,s){t.ready(()=>{ER(n,e,t,r),s.resolve(t)})}function wR(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function IR(n){wd(n);const t=await Ge(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=Ge(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function ER(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{Ge(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Ge(n).reCAPTCHAState.succeeded=!1}}),i=Ge(n);i.reCAPTCHAState=Object.assign(Object.assign({},i.reCAPTCHAState),{widgetId:s})}function TR(n){const e=document.createElement("script");e.src=yR,e.onload=n,document.head.appendChild(e)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;SR(this._throttleData);const s=await IR(this._app).catch(a=>{throw _t.create("recaptcha-error")});if(!(!((e=Ge(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw _t.create("recaptcha-error");let i;try{i=await Id(eR(this._app,s),this._heartbeatServiceProvider)}catch(a){throw!((t=a.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=AR(Number((r=a.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),_t.create("throttled",{time:Nv(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):a}return this._throttleData=null,i}initialize(e){this._app=e,this._heartbeatServiceProvider=Dr(e,"heartbeat"),bR(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Ad?this._siteKey===e._siteKey:!1}}function AR(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+YS,httpStatus:n};{const t=e?e.backoffCount:0,r=Qb(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function SR(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw _t.create("throttled",{time:Nv(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RR(n=Qo(),e){n=Te(n);const t=Dr(n,"app-check");if(Rc().initialized||lR(),Ed()&&Td().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw _t.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return kR(n,e.provider,e.isTokenAutoRefreshEnabled),Ge(n).isTokenAutoRefreshEnabled&&Uv(r,"INTERNAL",()=>{}),r}function kR(n,e,t){const r=KS(n,Object.assign({},xv));r.activated=!0,r.provider=e,r.cachedTokenPromise=oR(n).then(s=>(s&&rs(s)&&(r.token=s,$v(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const CR="app-check",Gp="app-check-internal";function xR(){Yt(new Mt(CR,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return mR(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(Gp).initialize()})),Yt(new Mt(Gp,n=>{const e=n.getProvider("app-check").getImmediate();return gR(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),St(_R,vR)}xR();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PR="type.googleapis.com/google.protobuf.Int64Value",NR="type.googleapis.com/google.protobuf.UInt64Value";function qv(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function Fo(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>Fo(e));if(typeof n=="function"||typeof n=="object")return qv(n,e=>Fo(e));throw new Error("Data cannot be encoded in JSON: "+n)}function Rs(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case PR:case NR:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>Rs(e)):typeof n=="function"||typeof n=="object"?qv(n,e=>Rs(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sd="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class vt extends Ut{constructor(e,t,r){super(`${Sd}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,vt.prototype)}}function DR(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Uo(n,e){let t=DR(n),r=t,s;try{const i=e&&e.error;if(i){const a=i.status;if(typeof a=="string"){if(!Hp[a])return new vt("internal","internal");t=Hp[a],r=a}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=Rs(s))}}catch{}return t==="ok"?null:new vt(t,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VR{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Et(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu="us-central1",OR=/^data: (.*?)(?:\n|$)/;function LR(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new vt("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class MR{constructor(e,t,r,s,i=eu,a=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=a,this.emulatorOrigin=null,this.contextProvider=new VR(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=eu}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function FR(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function UR(n,e,t){const r=s=>$R(n,e,s,{});return r.stream=(s,i)=>jR(n,e,s,i),r}async function BR(n,e,t,r){t["Content-Type"]="application/json";let s;try{s=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}async function jv(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function $R(n,e,t,r){const s=n._url(e);return qR(n,s,t,r)}async function qR(n,e,t,r){t=Fo(t);const s={data:t},i=await jv(n,r),a=r.timeout||7e4,c=LR(a),u=await Promise.race([BR(e,s,i,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new vt("cancelled","Firebase Functions instance was deleted.");const d=Uo(u.status,u.json);if(d)throw d;if(!u.json)throw new vt("internal","Response is not valid JSON object.");let f=u.json.data;if(typeof f>"u"&&(f=u.json.result),typeof f>"u")throw new vt("internal","Response is missing data field.");return{data:Rs(f)}}function jR(n,e,t,r){const s=n._url(e);return zR(n,s,t,r||{})}async function zR(n,e,t,r){var s;t=Fo(t);const i={data:t},a=await jv(n,r);a["Content-Type"]="application/json",a.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:a,signal:r?.signal})}catch(_){if(_ instanceof Error&&_.name==="AbortError"){const S=new vt("cancelled","Request was cancelled.");return{data:Promise.reject(S),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(S)}}}}}}const v=Uo(0,null);return{data:Promise.reject(v),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(v)}}}}}}let u,d;const f=new Promise((_,v)=>{u=_,d=v});(s=r?.signal)===null||s===void 0||s.addEventListener("abort",()=>{const _=new vt("cancelled","Request was cancelled.");d(_)});const p=c.body.getReader(),g=GR(p,u,d,r?.signal);return{stream:{[Symbol.asyncIterator](){const _=g.getReader();return{async next(){const{value:v,done:S}=await _.read();return{value:v,done:S}},async return(){return await _.cancel(),{done:!0,value:void 0}}}}},data:f}}function GR(n,e,t,r){const s=(a,c)=>{const u=a.match(OR);if(!u)return;const d=u[1];try{const f=JSON.parse(d);if("result"in f){e(Rs(f.result));return}if("message"in f){c.enqueue(Rs(f.message));return}if("error"in f){const p=Uo(0,f);c.error(p),t(p);return}}catch(f){if(f instanceof vt){c.error(f),t(f);return}}},i=new TextDecoder;return new ReadableStream({start(a){let c="";return u();async function u(){if(r?.aborted){const d=new vt("cancelled","Request was cancelled");return a.error(d),t(d),Promise.resolve()}try{const{value:d,done:f}=await n.read();if(f){c.trim()&&s(c.trim(),a),a.close();return}if(r?.aborted){const g=new vt("cancelled","Request was cancelled");a.error(g),t(g),await n.cancel();return}c+=i.decode(d,{stream:!0});const p=c.split(`
`);c=p.pop()||"";for(const g of p)g.trim()&&s(g.trim(),a);return u()}catch(d){const f=d instanceof vt?d:Uo(0,null);a.error(f),t(f)}}},cancel(){return n.cancel()}})}const Kp="@firebase/functions",Wp="0.12.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HR="auth-internal",KR="app-check-internal",WR="messaging-internal";function QR(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(HR),a=t.getProvider(WR),c=t.getProvider(KR);return new MR(s,i,a,c,r)};Yt(new Mt(Sd,e,"PUBLIC").setMultipleInstances(!0)),St(Kp,Wp,n),St(Kp,Wp,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YR(n=Qo(),e=eu){const r=Dr(Te(n),Sd).getImmediate({identifier:e}),s=Sm("functions");return s&&JR(r,...s),r}function JR(n,e,t){FR(Te(n),e,t)}function en(n,e,t){return UR(Te(n),e)}QR();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zv="firebasestorage.googleapis.com",Gv="storageBucket",XR=2*60*1e3,ZR=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be extends Ut{constructor(e,t,r=0){super(ul(e),`Firebase Storage: ${t} (${ul(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Be.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return ul(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Ue;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Ue||(Ue={}));function ul(n){return"storage/"+n}function Rd(){const n="An unknown error occurred, please check the error payload for server response.";return new Be(Ue.UNKNOWN,n)}function ek(n){return new Be(Ue.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function tk(n){return new Be(Ue.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function nk(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Be(Ue.UNAUTHENTICATED,n)}function rk(){return new Be(Ue.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function sk(n){return new Be(Ue.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function ik(){return new Be(Ue.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function ak(){return new Be(Ue.CANCELED,"User canceled the upload/download.")}function ok(n){return new Be(Ue.INVALID_URL,"Invalid URL '"+n+"'.")}function ck(n){return new Be(Ue.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function lk(){return new Be(Ue.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Gv+"' property when initializing the app?")}function uk(){return new Be(Ue.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function dk(){return new Be(Ue.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function hk(n){return new Be(Ue.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function tu(n){return new Be(Ue.INVALID_ARGUMENT,n)}function Hv(){return new Be(Ue.APP_DELETED,"The Firebase app was deleted.")}function fk(n){return new Be(Ue.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function _i(n,e){return new Be(Ue.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ni(n){throw new Be(Ue.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=At.makeFromUrl(e,t)}catch{return new At(e,"")}if(r.path==="")return r;throw ck(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(L){L.path.charAt(L.path.length-1)==="/"&&(L.path_=L.path_.slice(0,-1))}const a="(/(.*))?$",c=new RegExp("^gs://"+s+a,"i"),u={bucket:1,path:3};function d(L){L.path_=decodeURIComponent(L.path)}const f="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",_=new RegExp(`^https?://${p}/${f}/b/${s}/o${g}`,"i"),v={bucket:1,path:3},S=t===zv?"(?:storage.googleapis.com|storage.cloud.google.com)":t,T="([^?#]*)",D=new RegExp(`^https?://${S}/${s}/${T}`,"i"),x=[{regex:c,indices:u,postModify:i},{regex:_,indices:v,postModify:d},{regex:D,indices:{bucket:1,path:2},postModify:d}];for(let L=0;L<x.length;L++){const C=x[L],M=C.regex.exec(e);if(M){const E=M[C.indices.bucket];let y=M[C.indices.path];y||(y=""),r=new At(E,y),C.postModify(r);break}}if(r==null)throw ok(e);return r}}class pk{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mk(n,e,t){let r=1,s=null,i=null,a=!1,c=0;function u(){return c===2}let d=!1;function f(...T){d||(d=!0,e.apply(null,T))}function p(T){s=setTimeout(()=>{s=null,n(_,u())},T)}function g(){i&&clearTimeout(i)}function _(T,...D){if(d){g();return}if(T){g(),f.call(null,T,...D);return}if(u()||a){g(),f.call(null,T,...D);return}r<64&&(r*=2);let x;c===1?(c=2,x=0):x=(r+Math.random())*1e3,p(x)}let v=!1;function S(T){v||(v=!0,g(),!d&&(s!==null?(T||(c=2),clearTimeout(s),p(0)):T||(c=1)))}return p(0),i=setTimeout(()=>{a=!0,S(!0)},t),S}function gk(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _k(n){return n!==void 0}function vk(n){return typeof n=="object"&&!Array.isArray(n)}function kd(n){return typeof n=="string"||n instanceof String}function Qp(n){return Cd()&&n instanceof Blob}function Cd(){return typeof Blob<"u"}function Yp(n,e,t,r){if(r<e)throw tu(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw tu(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kc(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Kv(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var yr;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(yr||(yr={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yk(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bk{constructor(e,t,r,s,i,a,c,u,d,f,p,g=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=u,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=p,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((_,v)=>{this.resolve_=_,this.reject_=v,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Oa(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=c=>{const u=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,d)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const c=i.getErrorCode()===yr.NO_ERROR,u=i.getStatus();if(!c||yk(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===yr.ABORT;r(!1,new Oa(!1,null,f));return}const d=this.successCodes_.indexOf(u)!==-1;r(!0,new Oa(d,i))})},t=(r,s)=>{const i=this.resolve_,a=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());_k(u)?i(u):i()}catch(u){a(u)}else if(c!==null){const u=Rd();u.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,u)):a(u)}else if(s.canceled){const u=this.appDelete_?Hv():ak();a(u)}else{const u=ik();a(u)}};this.canceled_?t(!1,new Oa(!1,null,!0)):this.backoffId_=mk(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&gk(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Oa{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function wk(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function Ik(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Ek(n,e){e&&(n["X-Firebase-GMPID"]=e)}function Tk(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Ak(n,e,t,r,s,i,a=!0){const c=Kv(n.urlParams),u=n.url+c,d=Object.assign({},n.headers);return Ek(d,e),wk(d,t),Ik(d,i),Tk(d,r),new bk(u,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sk(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Rk(...n){const e=Sk();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Cd())return new Blob(n);throw new Be(Ue.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function kk(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ck(n){if(typeof atob>"u")throw hk("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class dl{constructor(e,t){this.data=e,this.contentType=t||null}}function xk(n,e){switch(n){case Ht.RAW:return new dl(Wv(e));case Ht.BASE64:case Ht.BASE64URL:return new dl(Qv(n,e));case Ht.DATA_URL:return new dl(Nk(e),Dk(e))}throw Rd()}function Wv(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,a=n.charCodeAt(++t);r=65536|(i&1023)<<10|a&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function Pk(n){let e;try{e=decodeURIComponent(n)}catch{throw _i(Ht.DATA_URL,"Malformed data URL.")}return Wv(e)}function Qv(n,e){switch(n){case Ht.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw _i(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Ht.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw _i(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=Ck(e)}catch(s){throw s.message.includes("polyfill")?s:_i(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class Yv{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw _i(Ht.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=Vk(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function Nk(n){const e=new Yv(n);return e.base64?Qv(Ht.BASE64,e.rest):Pk(e.rest)}function Dk(n){return new Yv(n).contentType}function Vk(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(e,t){let r=0,s="";Qp(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Qp(this.data_)){const r=this.data_,s=kk(r,e,t);return s===null?null:new Cn(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Cn(r,!0)}}static getBlob(...e){if(Cd()){const t=e.map(r=>r instanceof Cn?r.data_:r);return new Cn(Rk.apply(null,t))}else{const t=e.map(a=>kd(a)?xk(Ht.RAW,a).data:a.data_);let r=0;t.forEach(a=>{r+=a.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(a=>{for(let c=0;c<a.length;c++)s[i++]=a[c]}),new Cn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jv(n){let e;try{e=JSON.parse(n)}catch{return null}return vk(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ok(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Lk(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function Xv(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mk(n,e){return e}class ht{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||Mk}}let La=null;function Fk(n){return!kd(n)||n.length<2?n:Xv(n)}function Zv(){if(La)return La;const n=[];n.push(new ht("bucket")),n.push(new ht("generation")),n.push(new ht("metageneration")),n.push(new ht("name","fullPath",!0));function e(i,a){return Fk(a)}const t=new ht("name");t.xform=e,n.push(t);function r(i,a){return a!==void 0?Number(a):a}const s=new ht("size");return s.xform=r,n.push(s),n.push(new ht("timeCreated")),n.push(new ht("updated")),n.push(new ht("md5Hash",null,!0)),n.push(new ht("cacheControl",null,!0)),n.push(new ht("contentDisposition",null,!0)),n.push(new ht("contentEncoding",null,!0)),n.push(new ht("contentLanguage",null,!0)),n.push(new ht("contentType",null,!0)),n.push(new ht("metadata","customMetadata",!0)),La=n,La}function Uk(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new At(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function Bk(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const a=t[i];r[a.local]=a.xform(r,e[a.server])}return Uk(r,n),r}function ey(n,e,t){const r=Jv(e);return r===null?null:Bk(n,r,t)}function $k(n,e,t,r){const s=Jv(e);if(s===null||!kd(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const a=encodeURIComponent;return i.split(",").map(d=>{const f=n.bucket,p=n.fullPath,g="/b/"+a(f)+"/o/"+a(p),_=kc(g,t,r),v=Kv({alt:"media",token:d});return _+v})[0]}function qk(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class xd{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ty(n){if(!n)throw Rd()}function jk(n,e){function t(r,s){const i=ey(n,s,e);return ty(i!==null),i}return t}function zk(n,e){function t(r,s){const i=ey(n,s,e);return ty(i!==null),$k(i,s,n.host,n._protocol)}return t}function ny(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=rk():s=nk():t.getStatus()===402?s=tk(n.bucket):t.getStatus()===403?s=sk(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function ry(n){const e=ny(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=ek(n.path)),i.serverResponse=s.serverResponse,i}return t}function Gk(n,e,t){const r=e.fullServerUrl(),s=kc(r,n.host,n._protocol),i="GET",a=n.maxOperationRetryTime,c=new xd(s,i,zk(n,t),a);return c.errorHandler=ry(e),c}function Hk(n,e){const t=e.fullServerUrl(),r=kc(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function a(u,d){}const c=new xd(r,s,a,i);return c.successCodes=[200,204],c.errorHandler=ry(e),c}function Kk(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function Wk(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=Kk(null,e)),r}function Qk(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function c(){let x="";for(let L=0;L<2;L++)x=x+Math.random().toString().slice(2);return x}const u=c();a["Content-Type"]="multipart/related; boundary="+u;const d=Wk(e,r,s),f=qk(d,t),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+d.contentType+`\r
\r
`,g=`\r
--`+u+"--",_=Cn.getBlob(p,r,g);if(_===null)throw uk();const v={name:d.fullPath},S=kc(i,n.host,n._protocol),T="POST",D=n.maxUploadRetryTime,k=new xd(S,T,jk(n,t),D);return k.urlParams=v,k.headers=a,k.body=_.uploadData(),k.errorHandler=ny(e),k}class Yk{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=yr.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=yr.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=yr.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s){if(this.sent_)throw ni("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ni("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ni("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ni("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ni("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Jk extends Yk{initXhr(){this.xhr_.responseType="text"}}function Pd(){return new Jk}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(e,t){this._service=e,t instanceof At?this._location=t:this._location=At.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new xr(e,t)}get root(){const e=new At(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Xv(this._location.path)}get storage(){return this._service}get parent(){const e=Ok(this._location.path);if(e===null)return null;const t=new At(this._location.bucket,e);return new xr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw fk(e)}}function Xk(n,e,t){n._throwIfRoot("uploadBytes");const r=Qk(n.storage,n._location,Zv(),new Cn(e,!0),t);return n.storage.makeRequestWithTokens(r,Pd).then(s=>({metadata:s,ref:n}))}function Zk(n){n._throwIfRoot("getDownloadURL");const e=Gk(n.storage,n._location,Zv());return n.storage.makeRequestWithTokens(e,Pd).then(t=>{if(t===null)throw dk();return t})}function eC(n){n._throwIfRoot("deleteObject");const e=Hk(n.storage,n._location);return n.storage.makeRequestWithTokens(e,Pd)}function tC(n,e){const t=Lk(n._location.path,e),r=new At(n._location.bucket,t);return new xr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nC(n){return/^[A-Za-z]+:\/\//.test(n)}function rC(n,e){return new xr(n,e)}function sy(n,e){if(n instanceof Nd){const t=n;if(t._bucket==null)throw lk();const r=new xr(t,t._bucket);return e!=null?sy(r,e):r}else return e!==void 0?tC(n,e):n}function sC(n,e){if(e&&nC(e)){if(n instanceof Nd)return rC(n,e);throw tu("To use ref(service, url), the first argument must be a Storage instance.")}else return sy(n,e)}function Jp(n,e){const t=e?.[Gv];return t==null?null:At.makeFromBucketSpec(t,n)}function iC(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:s}=r;s&&(n._overrideAuthToken=typeof s=="string"?s:xb(s,n.app.options.projectId))}class Nd{constructor(e,t,r,s,i){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=zv,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=XR,this._maxUploadRetryTime=ZR,this._requests=new Set,s!=null?this._bucket=At.makeFromBucketSpec(s,this._host):this._bucket=Jp(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=At.makeFromBucketSpec(this._url,e):this._bucket=Jp(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Yp("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Yp("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Et(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new xr(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new pk(Hv());{const a=Ak(e,this._appId,r,s,t,this._firebaseVersion,i);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Xp="@firebase/storage",Zp="0.13.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iy="storage";function ay(n,e,t){return n=Te(n),Xk(n,e,t)}function oy(n){return n=Te(n),Zk(n)}function aC(n){return n=Te(n),eC(n)}function Dd(n,e){return n=Te(n),sC(n,e)}function oC(n=Qo(),e){n=Te(n);const r=Dr(n,iy).getImmediate({identifier:e}),s=Sm("storage");return s&&cC(r,...s),r}function cC(n,e,t,r={}){iC(n,e,t,r)}function lC(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Nd(t,r,s,e,Vr)}function uC(){Yt(new Mt(iy,lC,"PUBLIC").setMultipleInstances(!0)),St(Xp,Zp,""),St(Xp,Zp,"esm2017")}uC();const dC={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},hC="altorra-crm",oa=Nm(dC,hC);RR(oa,{provider:new Ad("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const $i=pT(oa),ee=kS(oa,{localCache:qS({tabManager:Cv({})})}),tn=YR(oa,"us-central1"),Vd=oC(oa);function Le(n){const e=j.get().permissions||[];return e.includes("*")||e.includes(n)}function fC(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function pC(n){try{const e=await Hn(be(ee,"usuarios",n.uid)),t=e.exists()?e.data():null;if(t&&t.bloqueado===!0){await ig($i),j.set({user:null,profile:null,permissions:[],ready:!0,authError:"Cuenta bloqueada. Contacta al administrador."});return}j.set({user:n,profile:t,permissions:fC(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),j.set({user:n,profile:null,permissions:[],ready:!0})}}function mC(){tE($i,cg).catch(()=>{}),sE($i,n=>{n?pC(n):j.set({user:null,profile:null,permissions:[],ready:!0})})}const gC={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function _C(n,e){j.set({authError:null});try{await eE($i,String(n).trim(),e)}catch(t){const r=gC[t&&t.code]||"No se pudo iniciar sesión.";throw j.set({authError:r}),t}}async function vC(){if(j.get().mock){j.set({user:null,profile:null,permissions:[]});return}await ig($i)}function hl(){const{profile:n,user:e}=j.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function yC(){const{profile:n}=j.get();return n&&(n.cargo||n.roleName)||"Asesor"}const bC=["bandeja","pipeline","agenda","reportes","contactos","config","resenas","banners","marcas","atributos","respaldos"];function cy(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return bC.includes(e)?e:"bandeja"}function wC(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function IC(n){const e=()=>n(cy());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function l(n,e={},t=[]){const r=document.createElement(n);for(const[s,i]of Object.entries(e))i==null||i===!1||(s==="class"?r.className=i:s==="html"?r.innerHTML=i:s==="text"?r.textContent=i:s==="dataset"?Object.assign(r.dataset,i):s==="style"&&typeof i=="object"?Object.assign(r.style,i):s.startsWith("on")&&typeof i=="function"?r.addEventListener(s.slice(2).toLowerCase(),i):r.setAttribute(s,i===!0?"":String(i)));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function ue(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let ls=null;function ly(n){ls&&!ls.contains(n.target)&&Bo()}function uy(n){n.key==="Escape"&&Bo()}function Bo(){ls&&(ls.remove(),ls=null,document.removeEventListener("mousedown",ly,!0),window.removeEventListener("keydown",uy,!0))}function jt(n,e,t,r={}){Bo();const s=l("div",{class:"popover",role:"menu"});r.title&&s.append(l("div",{class:"popover__title",text:r.title})),e.forEach(a=>{if(a.divider){s.append(l("div",{class:"popover__divider"}));return}const c=l("button",{class:"popover__item"+(a.active?" is-active":""),type:"button",role:"menuitem"},[a.icon?l("span",{class:"popover__icon",text:a.icon}):null,l("span",{class:"u-grow u-truncate",text:a.label}),a.hint?l("span",{class:"popover__hint u-caption",text:a.hint}):null]);c.addEventListener("click",u=>{u.stopPropagation(),Bo(),t(a)}),s.append(c)}),document.body.append(s),EC(s,n),ls=s,setTimeout(()=>{document.addEventListener("mousedown",ly,!0),window.addEventListener("keydown",uy,!0)},0);const i=s.querySelector(".popover__item");i&&i.focus()}function EC(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,s=n.offsetHeight;let i=t.bottom+6,a=t.right-r;a<8&&(a=8),a+r>window.innerWidth-8&&(a=window.innerWidth-r-8),i+s>window.innerHeight-8&&(i=t.top-s-6),n.style.top=`${Math.max(8,i)}px`,n.style.left=`${Math.max(8,a)}px`}function ks(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function TC(n){return String(n||"").replace(/\D/g,"")}function dy(n,e){const t=TC(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function hy(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function Cs(n){const e=hy(n);return e===1/0?1/0:e/864e5}function br(n){const e=hy(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const s=Math.floor(r/24);return s===1?"ayer":s<7?`hace ${s} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function AC(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function fl(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),s=t%60;return s?`${r} h ${s} min`:`${r} h`}function ar(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function $o(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const SC="0.4.1",RC=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0},{id:"config",label:"Disponibilidad",icon:"⚙️",ready:!0,perm:"calendar.config"},{id:"resenas",label:"Reseñas",icon:"⭐",ready:!0,perm:"reviews.read"},{id:"banners",label:"Banners",icon:"🖼️",ready:!0,perm:"banners.read"},{id:"marcas",label:"Marcas",icon:"🏷️",ready:!0,perm:"brands.read"},{id:"atributos",label:"Atributos",icon:"🧩",ready:!0,perm:["settings.theme","settings.seo","settings.backup"]},{id:"respaldos",label:"Respaldos",icon:"💾",ready:!0,perm:"settings.backup"}],pl={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos",config:"Disponibilidad de citas",resenas:"Reseñas del sitio",banners:"Banners del sitio",marcas:"Marcas del inventario",atributos:"Atributos del inventario",respaldos:"Respaldos del CRM e inventario"};function kC(n){const e={},t=l("div",{class:"sidebar__brand"},[l("span",{class:"sidebar__logo",text:"ALTORRA"}),l("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=l("nav",{class:"sidebar__nav","aria-label":"Secciones"});RC.filter(S=>!S.perm||[].concat(S.perm).some(Le)).forEach(S=>{const T=l("button",{class:"navitem",type:"button",disabled:!S.ready},[l("span",{class:"navitem__icon","aria-hidden":"true",text:S.icon}),l("span",{class:"navitem__label",text:S.label}),S.ready?null:l("span",{class:"navitem__soon",text:"Pronto"})]);S.ready&&T.addEventListener("click",()=>wC(S.id)),e[S.id]=T,r.append(T)});const s=l("aside",{class:"sidebar"},[t,r,l("div",{class:"sidebar__foot u-caption u-faint"},[`v${SC} · Fase 4`])]),i=l("h1",{class:"topbar__h",text:pl.bandeja}),a=l("span",{class:"topbar__crumb u-caption u-faint",text:j.get().mock?"modo demo":"tiempo real"}),c=l("div",{class:"topbar__title"},[i,a]),u=l("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[l("span",{"aria-hidden":"true",text:j.get().theme==="dark"?"☀️":"🌙"})]);u.addEventListener("click",()=>{const S=Eb();u.firstChild.textContent=S==="dark"?"☀️":"🌙"});const d=l("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(hl())}),l("span",{class:"usermenu__meta"},[l("span",{class:"usermenu__name u-truncate",text:hl()}),l("span",{class:"usermenu__role u-caption u-faint u-truncate",text:yC()})])]);d.addEventListener("click",()=>{jt(d,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],S=>{S.value==="logout"&&vC()},{title:hl()})});const f=l("header",{class:"topbar"},[c,l("div",{class:"topbar__actions u-row"},[u,d])]),p=l("main",{class:"outlet",id:"outlet"}),g=l("div",{id:"detail-root"}),_=l("div",{class:"app-shell"},[s,l("div",{class:"app-main"},[f,p]),g]);ue(n),n.removeAttribute("aria-busy"),n.append(_);function v(S){Object.entries(e).forEach(([T,D])=>{const k=T===S;D.classList.toggle("is-active",k),k?D.setAttribute("aria-current","page"):D.removeAttribute("aria-current")}),i.textContent=pl[S]||pl.bandeja}return{outlet:p,detailRoot:g,setActive:v}}function CC(n){const e=l("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=l("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=l("div",{class:"login__error",role:"alert",hidden:!0}),s=l("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),i=l("form",{class:"login__form"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Correo"}),e]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Contraseña"}),t]),r,s]);i.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,s.disabled=!0,s.textContent="Entrando…";try{await _C(e.value,t.value)}catch{r.textContent=j.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,s.disabled=!1,s.textContent="Entrar"}});const a=l("div",{class:"login surface"},[l("div",{class:"login__brand"},[l("span",{class:"login__logo",text:"ALTORRA"}),l("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),l("h1",{class:"login__title",text:"Bienvenido"}),l("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),i,l("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);ue(n),n.removeAttribute("aria-busy"),n.append(l("div",{class:"login-wrap"},[a])),setTimeout(()=>e.focus(),50)}const xC=()=>document.getElementById("toast-root"),em={ok:"✓",error:"⚠",info:"ℹ"};function B(n,e="info",t=3200){const r=xC();if(!r)return;const s=document.createElement("div");s.className=`toast toast--${e}`,s.setAttribute("role",e==="error"?"alert":"status");const i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.textContent=em[e]||em.info;const a=document.createElement("span");a.className="u-grow",a.textContent=n,s.append(i,a),r.appendChild(s);const c=()=>{s.classList.add("is-leaving"),s.addEventListener("animationend",()=>s.remove(),{once:!0})},u=setTimeout(c,t);s.addEventListener("click",()=>{clearTimeout(u),c()})}const PC=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],NC=["cita","test_drive","test-drive","visita","agendar","peritaje"],DC=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],VC=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],OC={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function Cc(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return VC.some(s=>e.includes(s)||t.includes(s))?r="pqr":t.includes("cita")||NC.some(s=>e.includes(s))?r="cita":DC.some(s=>e.includes(s))&&(r="solicitud"),{type:r,...OC[r]}}function Od(n){const e=String(n.sourceDetail||"").toLowerCase();return PC.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const LC={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function qi(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...LC[t]}}const MC=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],FC=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],Ma={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function fy(n){const e=xs(n.status),{type:t}=Cc(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(Ma[t]||Ma.lead));const s=r-Date.now(),i=Ma[t]||Ma.lead;let a="ok";return e?a="ok":s<=0?a="late":s<i*.25&&(a="warn"),{state:a,dueAt:r,remainingMs:s,closed:e}}const nu=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"convertido",label:"Convertido",badge:"ok"},{id:"descartado",label:"Descartado",badge:""}],UC=[{id:"inalcanzable",label:"Inalcanzable (no responde)"},{id:"no_califica",label:"No califica (sin presupuesto/intención)"},{id:"duplicado",label:"Duplicado"},{id:"ya_compro_en_otra_parte",label:"Ya compró en otra parte"},{id:"spam_prueba",label:"Spam / prueba"}],BC={calificado:{id:"calificado",label:"Calificado (v2)",badge:"ok"},no_calificado:{id:"no_calificado",label:"No calificado (v2)",badge:""},perdido:{id:"perdido",label:"Perdido (v2)",badge:"danger"}},$C=nu.reduce((n,e)=>(n[e.id]=e,n),{});function io(n){return $C[n]||BC[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function xs(n){return n==="convertido"||n==="descartado"||n==="perdido"||n==="no_calificado"}function py(n){return!n.status||n.status==="nuevo"}const ru={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},fr=n=>Math.max(0,Math.min(1,n));function qC(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return Od(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),fr(t)}function jC(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const s=(r.match(/\d[\d.,]{5,}/g)||[]).map(i=>parseInt(i.replace(/\D/g,""),10)).filter(i=>i>0);s.length&&(e=Math.max(e,Math.max(...s)/5e7))}return fr(e)}function zC(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(Cs(r)>30||e.add(String(r).slice(0,10)))}return fr(e.size/8)}function my(n,e=[],t=null){const r=Array.isArray(e)?e:[],s={intent:qC(n),interactions:fr(r.length/6),recency:n.lastActivityAt?fr(1-Cs(n.lastActivityAt)/30):0,frequency:zC(r),economic:jC(r),age:n.createdAt?fr(Cs(n.createdAt)/60):0,engagement:t&&Number(t.score)?fr(t.score/100):0};let i=0;for(const c of Object.keys(ru))i+=s[c]*ru[c];const a=Math.round(i*100);return{score:a,rating:GC(a),factors:s}}function GC(n){return n>=70?"hot":n>=40?"warm":"cold"}const us={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},tm={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},HC=ru;function gy(n,e={}){const t=Number(e.score)||0,{type:r}=Cc(n),s=Cs(n.createdAt),i=Cs(n.lastActivityAt),a=py(n),c=xs(n.status),u=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&a,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&a&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:Od(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:a&&s<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&i>=2&&i<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:i>=30&&i!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],f=u.filter(p=>p.when).sort((p,g)=>g.priority-p.priority)[0]||u[u.length-1];return{id:f.id,label:f.label,reason:f.reason,icon:f.icon,priority:f.priority}}function _y(n,e=[]){const{score:t,rating:r,factors:s}=my(n,e,null);return{...n,_score:t,_rating:r,_factors:s,_type:Cc(n),_channel:qi(n),_sla:fy(n),_nba:gy(n,{score:t})}}function Fa(n){return n.map(e=>_y(e))}const su=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function vy(n,e,t){switch(e){case"calientes":return py(n)&&!xs(n.status)&&(n._rating==="hot"||Od(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!xs(n.status);case"todo":default:return!0}}function KC(n,e){const t={};for(const r of su)t[r.id]=0;for(const r of n)for(const s of su)vy(r,s.id,e)&&t[s.id]++;return t}const Ua={late:0,warn:1,ok:2};function WC(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return Ua[t]!==Ua[r]?Ua[t]-Ua[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function QC(n,{type:e,channel:t,status:r}){return n.filter(s=>!(e&&s._type.type!==e||t&&s._channel.key!==t||r&&(s.status||"nuevo")!==r))}function YC(n,e){const t=$o(e).trim();return t?n.filter(r=>$o([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function JC(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function XC(n,{queue:e,uid:t,filters:r,search:s,showClosed:i=!1}){let a=n.filter(u=>vy(u,e,t));a=QC(a,r),a=YC(a,s);let c=0;if(!i&&!r.status){const u=a.filter(d=>!xs(d.status)&&!d.archived);c=a.length-u.length,a=u}return a.sort(WC),{rows:a,hiddenClosed:c}}const Pr=()=>new Date().toISOString(),Ld=n=>({id:n.id,...n.data()});function ZC({pageSize:n=40,onData:e,onError:t}){let r=null;const s=Qe(Ie(ee,"leads"),ct("createdAt","desc"),yt(n));return{unsubscribe:$t(s,a=>{const c=a.docs.map(Ld);r=a.docs[a.docs.length-1]||null,e(c,{hasMore:a.size>=n})},a=>{t&&t(a)}),getLastDoc:()=>r}}async function ex({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=Qe(Ie(ee,"leads"),ct("createdAt","desc"),MS(e),yt(n)),r=await Nt(t);return{rows:r.docs.map(Ld),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function tx(){const e=(await Nt(Ie(ee,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return j.set({team:e}),e}async function nx(n,e){await Xe(be(ee,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:Pr(),updatedBy:Nr(),_version:Zt(1)})}async function rx(n,e,t={},r={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const s=Pr();await Xe(be(ee,"leads",n),{...r,status:e,lastActivityAt:s,updatedAt:s,updatedBy:Nr(),_version:Zt(1)}),await Bt(Ie(ee,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:Nr(),createdAt:s,_version:1})}async function nm(n,{type:e="nota",subject:t="",body:r="",direction:s="outbound",name:i=""}){await Bt(Ie(ee,"activities"),{type:e,subject:t,body:r,status:"closed",direction:s,relatedTo:{type:"lead",id:n,name:i},ownerId:Nr(),createdAt:Pr(),_version:1})}async function sx(n,{subject:e,dueAt:t,name:r=""}){await Bt(Ie(ee,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:Nr(),createdAt:Pr(),_version:1})}async function ix(){const n=new Date;n.setHours(23,59,59,999);const e=Qe(Ie(ee,"activities"),qn("dueAt","<=",n.toISOString()),ct("dueAt","desc"),yt(80));return(await Nt(e)).docs.map(Ld).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,s)=>String(r.dueAt).localeCompare(String(s.dueAt)))}async function ax(n){await Xe(be(ee,"activities",n),{status:"closed",closedAt:Pr(),closedBy:Nr()})}async function ox(n,e=!0){await Xe(be(ee,"leads",n),{archived:e,archivedAt:e?Pr():null,updatedAt:Pr(),updatedBy:Nr(),_version:Zt(1)})}async function cx(n){return(await en(tn,"crmPurgeLead")({leadId:n})).data}function Nr(){const n=j.get().user;return n?n.uid:null}async function lx(n){const e=j.get().user?j.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await Bt(Ie(ee,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const pr=n=>new Date(Date.now()-n*6e4).toISOString(),De=n=>pr(n*60),ae=n=>pr(n*60*24),ux=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],Md=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:pr(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:pr(18),lastActivityAt:pr(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:pr(5),contactId:"email_casalcedo_outlook_com",createdAt:De(1),lastActivityAt:De(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:De(-1),contactId:"email_diana_r_hotmail_com",createdAt:De(5),lastActivityAt:De(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:De(-3),contactId:"phone_573044455667",createdAt:De(8),lastActivityAt:De(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:ae(-1),contactId:"email_lauraortiz_gmail_com",createdAt:ae(1),lastActivityAt:De(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ae(-1),contactId:"email_pnarango_empresa_co",createdAt:ae(2),lastActivityAt:ae(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ae(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:ae(4),lastActivityAt:ae(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:ae(-2),contactId:"email_afcuesta_gmail_com",createdAt:ae(6),lastActivityAt:ae(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ae(-10),contactId:"email_cata_rios_gmail_com",createdAt:ae(12),lastActivityAt:ae(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:De(-2),contactId:"email_glopa_gmail_com",createdAt:De(3),lastActivityAt:De(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:ae(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:ae(10),lastActivityAt:ae(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:ae(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:ae(15),lastActivityAt:ae(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:ae(19),contactId:"email_hdloaiza_gmail_com",createdAt:ae(20),lastActivityAt:ae(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:ae(24),contactId:"email_pasuarez_gmail_com",createdAt:ae(25),lastActivityAt:ae(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:ae(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:ae(22),lastActivityAt:ae(9),_version:4}],dx={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:pr(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:De(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:ae(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:De(20),_version:1}]},ji={};Md.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";ji[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});ji.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:ae(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:ae(3),lastActivityAt:ae(3),_version:1};const ao={},zi=()=>Md.map(n=>({...n})),iu=()=>ux.map(n=>({...n})),hx=n=>(dx[n]||[]).map(e=>({...e})),fx=n=>ji[n]?{...ji[n]}:null,px=()=>Object.values(ji).map(n=>({...n})),rm=n=>(ao[n]||[]).map(e=>({...e}));function mx(n,e){ao[n]||(ao[n]=[]),ao[n].unshift({id:"n"+Date.now(),...e})}let gx=100;const vi=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:De(2),createdAt:De(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:De(20),createdAt:ae(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"visita_test_drive",stageName:"Visita / Test drive",status:"open",amount:68e6,currency:"COP",probability:.5,weightedAmount:34e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:ae(18),createdAt:ae(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.7,weightedAmount:945e5,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:De(6),createdAt:ae(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:0,currency:"COP",probability:.2,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:De(1),createdAt:De(1),_version:1},{id:"d9",name:"Patricia Lemus · Toyota Hilux 2020",contactName:"Patricia Lemus",contactId:"phone_573009871234",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:132e6,currency:"COP",probability:.35,weightedAmount:462e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"walkin",lastActivityAt:De(3),createdAt:ae(2),_version:2},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:ae(3),createdAt:ae(10),_version:6,tipoPago:"financiado",wonAt:ae(3),postventa:{entrega:!0,traspaso_runt:!1,tramites:!1},commissionSnapshot:{amount:78e6,tipoPago:"financiado",ownerId:"u_ana",wonAt:ae(3)},recibeVehiculo:{marca:"chevrolet",modelo:"Spark GT",placa:"XYZ789",valorEstimado:28e6}},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:ae(5),createdAt:ae(15),_version:7,tipoPago:"contado",wonAt:ae(5),postventa:{entrega:!0,traspaso_runt:!0,tramites:!0},commissionSnapshot:{amount:112e6,tipoPago:"contado",ownerId:"u_luis",wonAt:ae(5)}},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:ae(9),createdAt:ae(22),_version:4}],au=()=>vi.map(n=>({...n}));function _x(n){const e="d"+ ++gx;return vi.unshift({id:e,...n}),e}function vx(n,e){const t=vi.findIndex(r=>r.id===n);t>=0&&(vi[t]={...vi[t],...e})}const tr=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},ou=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:tr(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:tr(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:tr(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:tr(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:tr(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:tr(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:tr(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],yx=()=>ou.map(n=>({...n}));function bx(n){ou.push({id:"ag"+(ou.length+1),...n})}let wx=100;function yy(n){const e="lm"+ ++wx,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),s=(n.prefijoPais||"+57").replace(/\D/g,""),i=r?"+"+(r.startsWith(s)?r:s+r):"",a=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:a,phone:i,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:a?"email_"+a.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return Md.unshift(c),e}function Ix(){const n={},e=(p,g,_)=>l("label",{class:"field"},[l("span",{class:"field__label",text:p}),g,null]);n.nombre=l("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=l("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=l("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=l("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=l("select",{class:"select"},MC.map(p=>l("option",{value:p.id},[`${p.icon} ${p.label}`]))),n.interes=l("select",{class:"select"},FC.map(p=>l("option",{value:p.id},[p.label]))),n.trafico=l("select",{class:"select"},[l("option",{value:""},["— Tráfico —"]),l("option",{value:"organico"},["Orgánico"]),l("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=l("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=l("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=l("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=l("input",{type:"checkbox",checked:!0});const t=l("div",{class:"login__error",role:"alert",hidden:!0}),r=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),s=l("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),i=l("form",{class:"nl-form"},[e("Nombre *",n.nombre),l("div",{class:"nl-row"},[l("label",{class:"field",style:{flex:"0 0 auto"}},[l("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),l("label",{class:"field u-grow"},[l("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),l("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),l("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),l("label",{class:"nl-consent"},[n.consent,l("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,l("div",{class:"nl-actions"},[r,s])]),a=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"＋ Nuevo lead"}),l("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),i]),c=l("div",{class:"modal-overlay"},[a]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const u=()=>{c.remove(),window.removeEventListener("keydown",d)},d=p=>{p.key==="Escape"&&u()};window.addEventListener("keydown",d),c.addEventListener("mousedown",p=>{p.target===c&&u()}),r.addEventListener("click",u),i.addEventListener("submit",async p=>{p.preventDefault(),t.hidden=!0;const g={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!g.nombre)return f("Escribe el nombre del cliente.");if(!g.email&&!g.telefono)return f("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");s.disabled=!0,s.textContent="Guardando…";try{j.get().mock?(yy(g),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await lx(g),B("✓ Lead agregado a la Bandeja","ok"),u()}catch{s.disabled=!1,s.textContent="Agregar lead",f("No se pudo agregar. Intenta de nuevo.")}});function f(p){return t.textContent=p,t.hidden=!1,!1}}const cu="altorra_friction_v1",Ex=300;function qo(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),s=JSON.parse(localStorage.getItem(cu)||"[]");for(s.push({task:n,ms:r,at:new Date().toISOString(),...t});s.length>Ex;)s.shift();localStorage.setItem(cu,JSON.stringify(s))}catch{}}function Tx(){try{const n=JSON.parse(localStorage.getItem(cu)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,s]of Object.entries(e)){const i=[...s].sort((a,c)=>a-c);t[r]={n:s.length,mediana_s:+(i[Math.floor(i.length/2)]/1e3).toFixed(1),p90_s:+(i[Math.floor(i.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=Tx);const Ax=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],Sx="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function Rx(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=j.get().user||{},r=l("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),s=l("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),i=l("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),a=l("input",{type:"checkbox"}),c=l("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function u(){c.replaceChildren(...Ax.map(x=>{const L=l("button",{class:"chip"+(e.fuente===x.id?" chip--active":""),type:"button"},[`${x.icon} ${x.label}`]);return L.addEventListener("click",()=>{e.fuente=x.id,u()}),L}))}u();const d=l("button",{class:"chip",type:"button"},["Orgánico"]);d.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",d.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const f=l("div",{class:"login__error",role:"alert",hidden:!0}),p=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),g=l("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),_=l("form",{class:"nl-form"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre *"}),r]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),s]),l("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,d]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Nota"}),i]),l("label",{class:"nl-consent"},[a,l("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",l("em",{text:Sx})])]),f,l("div",{class:"nl-actions"},[p,g])]),v=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"⚡ Lead rápido"}),l("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),_]),S=l("div",{class:"modal-overlay"},[v]);document.body.appendChild(S),setTimeout(()=>r.focus(),30);const T=()=>{S.remove(),window.removeEventListener("keydown",D)},D=x=>{x.key==="Escape"&&T()};window.addEventListener("keydown",D),S.addEventListener("mousedown",x=>{x.target===S&&T()}),p.addEventListener("click",T),_.addEventListener("submit",x=>{x.preventDefault(),f.hidden=!0;const L={nombre:r.value.trim(),telefono:s.value.trim(),fuente:e.fuente,medio:e.medio,nota:i.value.trim(),consentVerbal:a.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!L.nombre)return k("Escribe el nombre.");if(!L.telefono||L.telefono.replace(/\D/g,"").length<7)return k("Escribe un teléfono válido.");if(!L.ownerId&&!j.get().mock)return k("Sesión sin usuario — recarga el portal.");if(j.get().mock){yy({nombre:L.nombre,telefono:L.telefono,canal:L.fuente,trafico:L.medio,consentGiven:L.consentVerbal,notas:L.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),B("⚡ Lead registrado (mock)","ok"),T();return}Bt(Ie(ee,"lead_intake"),L).catch(C=>{console.error("[quick-lead] rechazo del servidor:",C),B('El lead "'+L.nombre+'" fue RECHAZADO al sincronizar: '+(C.code||C.message),"error")}),B(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),qo("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),T()});function k(x){return f.textContent=x,f.hidden=!1,!1}}const kx="ventas",ca=[{id:"cuadrando_cita",label:"Cuadrando cita",prob:.2},{id:"cita_fijada",label:"Cita fijada",prob:.35},{id:"visita_test_drive",label:"Visita / Test drive",prob:.5},{id:"negociacion",label:"Negociación",prob:.7},{id:"apartado",label:"Apartado",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],oo={id:"perdido",label:"Perdido",prob:0,lost:!0},Ba={_exit_visita_test_drive:["huboTestDrive"],apartado:["montoApartado","venceEl"],vendido:["tipoPago"],perdido:["lostReason"]},ri=ca.map(n=>n.id);function sm(n,e){if(n===e)return{ok:!0,needsReason:!1,gates:[]};const t=i=>i===oo.id||ri.includes(i);if(!t(n)||!t(e))return{ok:!1,error:"etapa_desconocida"};if(n==="vendido")return{ok:!1,error:"vendido_es_terminal"};if(e===oo.id)return{ok:!0,needsReason:!1,gates:Ba.perdido.slice()};if(n===oo.id)return{ok:!0,needsReason:!0,gates:[]};const r=ri.indexOf(n),s=ri.indexOf(e);if(s>r){const i=[];for(let a=r;a<s;a++){ri[a]==="visita_test_drive"&&i.push(...Ba._exit_visita_test_drive);const c=ri[a+1];Ba[c]&&i.push(...Ba[c])}return{ok:!0,needsReason:!1,gates:[...new Set(i)]}}return{ok:!0,needsReason:!0,gates:[],recalcVehicle:n==="apartado"}}const im=[{id:"precio",label:"Precio"},{id:"financiacion_negada",label:"Financiación negada"},{id:"compro_en_otro_lado",label:"Compró en otro lado"},{id:"no_responde",label:"No responde"},{id:"cambio_de_opinion",label:"Cambió de opinión"},{id:"error_de_registro",label:"Error de registro"},{id:"otro",label:"Otro motivo"}],yi=ca.filter(n=>!n.won),by=[...ca,oo].reduce((n,e)=>(n[e.id]=e,n),{});function es(n){return by[n]||ca[0]}function bi(n){const e=by[n];return e?e.prob:0}function Fd(n){return Math.round((Number(n.amount)||0)*bi(n.stageId))}function wy(n){return n.reduce((e,t)=>e+(t.status==="open"?Fd(t):0),0)}function Cx(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function xx(n,e=14){return n.status==="open"&&Cs(n.lastActivityAt)>e}function Px(n){const e={};for(const t of yi)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}const Iy=[{id:"entrega",label:"Entrega del vehículo",dueDays:3},{id:"traspaso_runt",label:"Traspaso / RUNT",dueDays:15},{id:"tramites",label:"Trámites (SOAT, impuestos, GPS)",dueDays:15}];function Nx(n){const e={};for(const r of n||[])!r||r.status!=="open"||!r.vehicleId||(e[r.vehicleId]=e[r.vehicleId]||[]).push(r.id||null);const t=[];for(const r of Object.keys(e))e[r].length>1&&t.push({vehicleId:r,dealIds:e[r]});return t}function Ey(n){if(!n||n.status!=="won")return!1;const e=n.postventa||{};return Iy.every(t=>e[t.id]===!0)}function Ty(n,e={}){const t=e.vehicleId!==void 0?e.vehicleId||"":n.vehicleOfInterestId||"",r=ca[0];return{name:(n.fullName||"Oportunidad")+(t?" · "+(e.vehicleName||t):""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:t||null,vehicleName:e.vehicleName||t||"",sinVehiculoAun:!t,pipelineId:kx,stageId:r.id,stageName:r.label,status:"open",amount:Number(e.amount)||0,currency:"COP",probability:r.prob,weightedAmount:Math.round((Number(e.amount)||0)*r.prob),expectedCloseDate:null,ownerId:e.ownerId!==void 0?e.ownerId:n.ownerId||null,ownerName:e.ownerName!==void 0?e.ownerName:n.ownerName||null,source:n.source||"web",nextStep:e.nota||""}}const Kn=()=>new Date().toISOString(),Ay=n=>({id:n.id,...n.data()}),Lt=()=>j.get().user?j.get().user.uid:null;function Dx(n,e,t){return Bt(Ie(ee,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:Lt(),createdAt:Kn(),_version:1})}function Vx({pageSize:n=100,onData:e,onError:t}){const r=Qe(Ie(ee,"deals"),qn("status","==","open"),ct("lastActivityAt","desc"),yt(n));return $t(r,s=>e(s.docs.map(Ay)),s=>t&&t(s))}async function Ox(n,e={}){const t=Kn(),r=Ty(n,e),s=await Bt(Ie(ee,"deals"),{...r,lastActivityAt:t,createdAt:t,updatedAt:t,createdBy:Lt(),updatedBy:Lt(),_version:1});return await Xe(be(ee,"leads",n.id),{status:"convertido",convertedTo:{dealId:s.id,prevStatus:n.status||"contactado"},lastActivityAt:t,updatedAt:t,updatedBy:Lt(),_version:Zt(1)}),await Dx(s.id,r.contactName,"Oportunidad creada desde lead"),s.id}async function Lx(n){return(await en(tn,"anularConversion")({dealId:n})).data}async function Sy(){return(await Nt(Qe(Ie(ee,"vehiculos"),qn("estado","in",["disponible","apartado"]),yt(60)))).docs.map(e=>{const t=e.data(),r=t.estado==="apartado";return{id:e.id,label:[t.marca,t.modelo,t.year].filter(Boolean).join(" ")+(r?" · ⚠ apartado":""),precio:Number(t.precioOferta||t.precio)||0,apartado:r}}).sort((e,t)=>e.label.localeCompare(t.label,"es"))}async function am(n,e,t={},r={}){const s=Kn(),i=es(e),a={...r,stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:s,updatedAt:s,updatedBy:Lt(),_version:Zt(1)};t.status==="lost"&&e!=="perdido"&&(a.status="open"),await Xe(be(ee,"deals",n),a)}async function Mx(n,e,t={}){const r=Kn(),s=Math.max(0,Math.round(Number(e)||0));await Xe(be(ee,"deals",n),{amount:s,weightedAmount:Math.round(s*bi(t.stageId)),updatedAt:r,updatedBy:Lt(),_version:Zt(1)})}async function Fx(n,e={},t={}){const r=Kn();await Xe(be(ee,"deals",n),{...t,status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:r,updatedAt:r,updatedBy:Lt(),_version:Zt(1)})}async function Ux(n,e,t={}){const r=Kn();await Xe(be(ee,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"otro"),lastActivityAt:r,updatedAt:r,updatedBy:Lt(),_version:Zt(1)})}function Bx({pageSize:n=100,onData:e,onError:t}){const r=Qe(Ie(ee,"deals"),qn("status","==","won"),ct("lastActivityAt","desc"),yt(n));return $t(r,s=>e(s.docs.map(Ay)),s=>t&&t(s))}async function $x(n,e,t){const r=Kn();await Xe(be(ee,"deals",n),{["postventa."+e]:t===!0,lastActivityAt:r,updatedAt:r,updatedBy:Lt(),_version:Zt(1)});try{await Xe(be(ee,"activities","postventa_"+n+"_"+e),t?{status:"closed",closedAt:r,closedBy:Lt()}:{status:"open",closedAt:null,closedBy:null})}catch{}}async function qx(n,e){const t=Kn();await Xe(be(ee,"deals",n),{recibeVehiculo:{marca:String(e.marca||"").trim(),modelo:String(e.modelo||"").trim(),year:Number(e.year)||null,placa:String(e.placa||"").trim().toUpperCase(),valorEstimado:Number(e.valorEstimado)||0},lastActivityAt:t,updatedAt:t,updatedBy:Lt(),_version:Zt(1)})}async function jx(n){return(await en(tn,"crmCrearBorradorRetoma")({dealId:n})).data}const ml="__sin_vehiculo__";function Ry(n,{onDone:e}={}){const t=performance.now(),r=j.get().team||[],s=l("select",{class:"select"},[l("option",{value:""},["Cargando inventario…"])]),i=l("input",{class:"input",type:"number",min:"0",step:"100000",placeholder:"Valor estimado (COP) *"}),a=l("select",{class:"select"},r.length?r.map(k=>l("option",{value:k.uid,selected:k.uid===n.ownerId?"":void 0},[k.nombre])):[l("option",{value:n.ownerId||""},[n.ownerName||"Yo"])]),c=l("input",{class:"input",type:"text",placeholder:"Nota de contexto (opcional)"}),u=l("div",{class:"login__error",role:"alert",hidden:!0}),d=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),f=l("button",{class:"btn btn--gold",type:"submit"},["🎯 Crear negocio"]),p=l("form",{class:"nl-form"},[l("p",{class:"u-caption u-muted",style:{margin:"0"}},["✓ Hablaste con él · ✓ tiene presupuesto o forma de pago en mente · ✓ busca un carro concreto o una categoría"]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo *"}),s]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Valor estimado (COP) *"}),i]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor responsable *"}),a]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Nota"}),c]),u,l("div",{class:"nl-actions"},[d,f])]),g=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"Calificar → crear negocio"}),l("span",{class:"u-caption u-faint",text:(n.fullName||"Cliente")+" pasa al Pipeline; el lead queda congelado como histórico."})]),p]),_=l("div",{class:"modal-overlay"},[g]);document.body.appendChild(_);const v=()=>{_.remove(),window.removeEventListener("keydown",S)},S=k=>{k.key==="Escape"&&v()};window.addEventListener("keydown",S),_.addEventListener("mousedown",k=>{k.target===_&&v()}),d.addEventListener("click",v);let T=[];(j.get().mock?Promise.resolve([]):Sy()).then(k=>{T=k,s.replaceChildren(l("option",{value:""},["— Elige un vehículo —"]),...k.map(x=>l("option",{value:x.id},[x.label+(x.precio?" · $"+x.precio.toLocaleString("es-CO"):"")])),l("option",{value:ml},["Sin vehículo aún (buscando / retoma)"]))}).catch(()=>{s.replaceChildren(l("option",{value:ml},["Sin vehículo aún"]))}),s.addEventListener("change",()=>{const k=T.find(x=>x.id===s.value);k&&k.precio&&!i.value&&(i.value=String(k.precio))}),p.addEventListener("submit",async k=>{k.preventDefault(),u.hidden=!0;const x=s.value,L=Math.round(Number(i.value)||0);if(!x)return D('Elige un vehículo o marca "Sin vehículo aún".');if(!(L>0))return D("El valor estimado es obligatorio (alimenta el pronóstico).");const C=a.value||n.ownerId;if(!C)return D("El negocio necesita un asesor responsable.");const M=r.find(w=>w.uid===C)?.nombre||n.ownerName||null,E=T.find(w=>w.id===x),y={vehicleId:x===ml?null:x,vehicleName:E?E.label:"",amount:L,ownerId:C,ownerName:M,nota:c.value.trim()};f.disabled=!0,f.textContent="Creando…";try{if(j.get().mock){_x(Ty(n,y)),B("🎯 Negocio creado (mock)","ok"),qo("conversion",t,{mock:!0}),v(),e&&e({mock:!0});return}const w=await Ox(n,y);qo("conversion",t,{}),v(),zx(w,n),e&&e({dealId:w})}catch(w){f.disabled=!1,f.textContent="🎯 Crear negocio",D(w&&w.code==="permission-denied"?"Recarga el portal: tu versión está desactualizada.":"No se pudo crear el negocio. Intenta de nuevo.")}});function D(k){return u.textContent=k,u.hidden=!1,!1}}function zx(n,e){const t=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),r=l("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[l("span",{text:`🎯 Negocio creado para ${(e.fullName||"el cliente").split(/\s+/)[0]}`}),t]);document.body.appendChild(r);const s=setTimeout(()=>r.remove(),1e4);t.addEventListener("click",async()=>{clearTimeout(s),t.disabled=!0,t.textContent="Anulando…";try{await Lx(n),B("↩ Conversión anulada — el lead volvió a la Bandeja","ok")}catch(i){B("No se pudo anular: "+(i&&i.message||""),"error")}r.remove()})}const En={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'};function Gx(){const n=(t,r)=>{const s=new Date;return s.setDate(s.getDate()+t),s.setHours(r,0,0,0),s.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function ky(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=Le("crm.edit"),r=j.get().user&&j.get().user.uid,s=l("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),i=l("label",{class:"search","aria-label":"Buscar"},[l("span",{html:En.search,"aria-hidden":"true"}),l("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),a=l("div",{class:"inbox__filters"}),c=t?l("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>Rx());const u=t?l("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;u&&u.addEventListener("click",()=>Ix());const d=l("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);d.addEventListener("click",()=>M());const f=l("div",{class:"inbox__pendientes",hidden:!0}),p=l("div",{class:"inbox__toolbar"},[i,a,c,u,d]),g=l("div",{class:"inbox__list",role:"list",tabindex:"-1"}),_=l("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),v=l("section",{class:"inbox"},[_,s,p,f,g]);ue(n),n.append(v);const S=i.querySelector("input");S.addEventListener("input",()=>{e.search=S.value,le()});async function T(F,q){if(R(F.id,{ownerId:q?q.uid:null,ownerName:q?q.nombre:null}),j.get().mock){B(q?`Asignado a ${q.nombre}`:"Sin asignar","ok");return}try{await nx(F.id,q),B(q?`Asignado a ${q.nombre}`:"Sin asignar","ok")}catch{B("No se pudo asignar","error")}}async function D(F,q,Y={}){if(R(F.id,{status:q,...Y,lastActivityAt:new Date().toISOString()}),j.get().mock){B(`Estado → ${io(q).label}`,"ok");return}try{await rx(F.id,q,F,Y),B(`Estado → ${io(q).label}`,"ok")}catch{B("No se pudo cambiar el estado","error")}}function k(F,q){const Y=dy(F.phone,Hx(F));if(!Y){B("Este lead no tiene teléfono","error");return}window.open(Y,"_blank","noopener"),!j.get().mock&&t&&nm(F.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:F.fullName}).catch(()=>{}),L(F,q)}function x(F,q){!j.get().mock&&t&&nm(F.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:F.fullName}).catch(()=>{}),B("📞 Llamada registrada","ok"),L(F,q)}function L(F,q){if(!t)return;const Y=performance.now();jt(q||document.body,Gx(),ce=>{if(qo("proximo_paso",Y,{preset:ce.label}),!!ce.value){if(ce.value==="abrir360"){N(F.id);return}if(j.get().mock){B("Próximo paso anotado (mock)","ok");return}sx(F.id,{subject:ce.value.subject,dueAt:ce.value.dueAt,name:F.fullName}).then(()=>B("✓ Próximo paso: "+ce.label,"ok")).catch(()=>B("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(F.fullName||"el cliente").split(/\s+/)[0]+"?"})}let C=!1;async function M(){C=!C,f.hidden=!C,C&&await E()}async function E(){if(ue(f),j.get().mock){f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let F=[];try{F=await ix()}catch{ue(f),f.append(l("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(ue(f),f.append(l("div",{class:"inbox__listhead"},[l("span",{class:"u-muted u-caption",text:`📋 ${F.length} pendiente${F.length===1?"":"s"} (hoy y vencidos)`})])),!F.length){f.append(l("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const q=Date.now();F.forEach(Y=>{const ce=new Date(Y.dueAt).getTime()<q,se=l("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),re=l("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),Re=l("div",{class:"lead-card",style:{alignItems:"center"}},[l("span",{class:`badge badge--${ce?"danger":"gold"}`,text:ce?"VENCIDO":"HOY"}),l("div",{class:"u-grow"},[l("div",{class:"lead-card__name",text:(Y.type==="cita"?"📅 ":"")+Y.subject}),l("div",{class:"u-caption u-muted",text:`${Y.relatedTo&&Y.relatedTo.name?Y.relatedTo.name+" · ":""}${br(Y.dueAt)}`})]),l("div",{class:"u-row u-row--tight"},[re,t?se:null])]);re.addEventListener("click",()=>{Y.relatedTo&&Y.relatedTo.id&&N(Y.relatedTo.id)}),se.addEventListener("click",async()=>{se.disabled=!0;try{await ax(Y.id),B("✓ Hecho","ok"),await E(),Y.relatedTo&&Y.relatedTo.id&&L({id:Y.relatedTo.id,fullName:Y.relatedTo.name||""},d)}catch{se.disabled=!1,B("No se pudo completar","error")}}),f.append(Re)})}function y(F){if(F.status==="convertido"){B("Ya es un negocio: gestiónalo en el Pipeline","info");return}Ry(F,{onDone:()=>R(F.id,{status:"convertido"})})}function w(){j.set({leads:e.leads})}function R(F,q){const Y=e.leads.findIndex(ce=>ce.id===F);Y!==-1&&(e.leads[Y]=_y({...e.leads[Y],...q}),w(),I())}function I(){P(),A(),le()}function P(){const F=KC(e.leads,r);ue(s),su.forEach(q=>{const Y=e.queue===q.id,ce=l("button",{class:"chip"+(Y?" chip--active":""),role:"tab","aria-selected":String(Y),type:"button"},[l("span",{"aria-hidden":"true",text:q.icon}),l("span",{text:q.label}),l("span",{class:"chip__count",text:String(F[q.id]||0)})]);ce.addEventListener("click",()=>{e.queue=q.id,I()}),s.append(ce)})}function A(){if(ue(a),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...nu.map(q=>[q.id,q.label])]}].forEach(q=>{const Y=e.filters[q.key],ce=Y?(q.items.find(re=>re[0]===Y)||[,q.label])[1]:q.label,se=l("button",{class:"chip"+(Y?" chip--active":""),type:"button","aria-haspopup":"menu"},[l("span",{text:ce}),l("span",{"aria-hidden":"true",text:"▾"})]);se.addEventListener("click",()=>{jt(se,q.items.map(([re,Re])=>({value:re,label:Re,active:re===Y})),re=>{e.filters[q.key]=re.value,I()},{title:q.label})}),a.append(se)}),e.filters.type||e.filters.channel||e.filters.status){const q=l("button",{class:"chip",type:"button"},["✕ Limpiar"]);q.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},I()}),a.append(q)}}function le(){if(e.loading)return Z();if(e.error)return z("⚠️","No se pudo cargar",e.error);const{rows:F,hiddenClosed:q}=XC(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(ue(g),!F.length&&!q){const se=e.search||e.filters.type||e.filters.channel||e.filters.status;g.append(H("🗂️",se?"Sin resultados":"¡Bandeja al día!",se?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const Y=q||e.showClosed?l("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${q} ocultos · ver todos`]):null;Y&&Y.addEventListener("click",()=>{e.showClosed=!e.showClosed,le()});const ce=l("div",{class:"inbox__listhead"},[l("span",{class:"u-muted u-caption",text:`${F.length} ${F.length===1?"cliente":"clientes"} activos`}),l("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),Y]);if(g.append(ce),!F.length&&q){g.append(H("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${q} cerrados ocultos).`));return}if(F.forEach(se=>g.append(pe(se))),e.hasMore&&e.queue==="todo"&&!e.search){const se=l("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);se.addEventListener("click",()=>G(se)),g.append(l("div",{class:"inbox__more"},[se]))}}function pe(F){const q=us[F._rating],Y=io(F.status),ce=!!(F.convertedTo&&F.convertedTo.dealId)||F.status==="convertido",se=JC(F),re=se&&se.state!=="ok"?l("span",{class:`badge badge--${se.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${se.mins<120?se.mins+" min":fl(se.mins*6e4)} sin contacto`]):null,Re=F._sla,Ne=`sla-dot sla-dot--${Re.state}`,qe=Re.closed?"Cerrado":Re.state==="late"?`SLA vencido hace ${fl(Re.remainingMs)}`:`Responder en ${fl(Re.remainingMs)}`,lt=[F._type.icon+" "+F._type.label,F.sourceDetail,F.vehicleOfInterestId?"🚗 "+F.vehicleOfInterestId:""].filter(Boolean).join(" · "),Wn=l("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":F.id,"aria-label":`${F.fullName}, ${q.label}`},[l("span",{class:Ne,title:qe,"aria-label":qe}),l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(F.fullName)}),l("div",{class:"lead-card__main u-grow"},[l("div",{class:"lead-card__top"},[l("span",{class:"lead-card__name u-truncate",text:F.fullName}),l("span",{class:`temp ${q.cls}`,title:`Score ${F._score}/100`},[`${q.icon} ${F._score}`])]),l("div",{class:"lead-card__what u-truncate u-muted",text:lt}),l("div",{class:"lead-card__meta u-caption"},[l("span",{class:"lead-card__chan",text:`${F._channel.icon} ${F._channel.label}`}),l("span",{class:"lead-card__dot",text:"·"}),l("span",{text:br(F.createdAt)}),l("span",{class:"lead-card__dot",text:"·"}),ce?l("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},[F.convertedTo&&F.convertedTo.outcome==="perdido"?"✖ Negocio perdido → Pipeline":F.convertedTo&&F.convertedTo.outcome==="vendido"?"🏆 VENDIDO":`🎯 ${F.convertedTo&&F.convertedTo.stageName||"Convertido"} → Pipeline`]):l("span",{class:`badge badge--${Y.badge||""}`.trim(),text:Y.label}),F.archived?l("span",{class:"badge",text:"🗄 Archivado"}):null,re?l("span",{class:"lead-card__dot",text:"·"}):null,re,F.ownerName?l("span",{class:"lead-card__dot",text:"·"}):null,F.ownerName?l("span",{class:"u-faint",text:"👤 "+F.ownerName}):null]),l("div",{class:"lead-card__nba"},[l("span",{"aria-hidden":"true",text:F._nba.icon}),l("span",{class:"u-muted",text:"Próx: "}),l("strong",{text:F._nba.label})])]),l("div",{class:"lead-card__actions"},[X("wa",En.wa,"WhatsApp","btn--wa"),t?X("call",En.call,"Registrar llamada"):null,t?X("assign",En.person,"Asignar"):null,t&&!ce?X("status",En.flag,"Cambiar estado"):null,t&&!ce?X("convert",En.convert,"Convertir a oportunidad"):null,t?X("more",En.more,"Más acciones"):null,X("open",En.expand,"Abrir 360")])]);return Wn.addEventListener("click",Qn=>{const Ms=Qn.target.closest("[data-action]");if(Ms){$e(Ms.dataset.action,F,Ms);return}N(F.id)}),Wn.addEventListener("keydown",Qn=>{Qn.key==="Enter"?N(F.id):Qn.key.toLowerCase()==="w"&&k(F)}),Wn}function X(F,q,Y,ce=""){return l("button",{class:`icon-btn ${ce}`.trim(),type:"button","data-action":F,title:Y,"aria-label":Y},[l("span",{html:q,"aria-hidden":"true"})])}const ye={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",descartado:"No va: inalcanzable, no califica, spam… (pide la razón)"};function $e(F,q,Y){if(F==="open")return N(q.id);if(F==="wa")return k(q,Y);if(F==="call")return x(q,Y);if(F==="convert")return y(q);if(F==="pipeline"){window.location.hash="#/pipeline";return}if(F==="assign"){const ce=j.get().team||[],se=[{value:null,label:"Sin asignar",icon:"⊘",active:!q.ownerId},...ce.map(re=>({value:re,label:re.nombre,hint:re.cargo,icon:"👤",active:q.ownerId===re.uid}))];return jt(Y,se,re=>T(q,re.value),{title:"Asignar a"})}if(F==="status"){if(q.convertedTo&&q.convertedTo.dealId){B("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const ce=nu.filter(se=>se.id!=="convertido").map(se=>({value:se.id,label:se.label,hint:ye[se.id]||"",active:(q.status||"nuevo")===se.id}));return jt(Y,ce,se=>{if(se.value==="descartado"){jt(Y,UC.map(re=>({value:re.id,label:re.label})),re=>D(q,"descartado",{discardReason:re.value}),{title:"¿Por qué se descarta?"});return}D(q,se.value)},{title:"Cambiar estado"})}if(F==="more"){const ce=[q.archived?{value:"unarchive",label:"Restaurar de archivados",icon:"↩️"}:{value:"archive",label:"Archivar",icon:"🗄",hint:"Sale de las vistas; reversible"},Le("crm.delete")?{value:"purge",label:"Eliminar definitivo",icon:"🗑",hint:"Solo pruebas/spam — borra TODO su rastro"}:null].filter(Boolean);return jt(Y,ce,async se=>{if(se.value==="archive"||se.value==="unarchive"){const re=se.value==="archive";if(R(q.id,{archived:re}),j.get().mock){B(re?"🗄 Archivado":"↩️ Restaurado","ok");return}try{await ox(q.id,re),B(re?"🗄 Archivado":"↩️ Restaurado","ok")}catch{R(q.id,{archived:!re}),B("No se pudo archivar","error")}return}if(se.value==="purge"){if(!navigator.onLine){B("Eliminar definitivo necesita señal.","error");return}if(!window.confirm('🗑 ¿Eliminar DEFINITIVAMENTE a "'+q.fullName+`"?

Borra el lead, sus actividades, negocios y su contacto si queda huérfano. Esto es SOLO para pruebas/spam — un cliente real se ARCHIVA.`)||!window.confirm("Última confirmación: esta acción NO se puede deshacer. ¿Eliminar?"))return;if(j.get().mock){B("Eliminado (mock)","ok");return}try{const re=await cx(q.id);B(`🗑 Eliminado: ${re.activities} actividades, ${re.deals} negocios${re.contactDeleted?", contacto":""}`,"ok")}catch(re){B(re.message&&re.message.includes("Super Admin")?"Solo el Super Admin puede eliminar.":"No se pudo eliminar: "+(re.message||re.code),"error")}}},{title:"Más acciones"})}}function N(F){j.set({detailLeadId:F})}function H(F,q,Y){return l("div",{class:"state"},[l("div",{class:"state__icon","aria-hidden":"true",text:F}),l("div",{class:"state__title",text:q}),l("div",{class:"state__msg",text:Y})])}function z(F,q,Y){ue(g),g.append(H(F,q,Y))}function Z(){ue(g);for(let F=0;F<6;F++)g.append(l("div",{class:"lead-card lead-card--skeleton"},[l("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),l("div",{class:"u-grow u-stack",style:{gap:"8px"}},[l("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),l("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function G(F){if(e.cursor){F.disabled=!0,F.textContent="Cargando…";try{const{rows:q,lastDoc:Y,hasMore:ce}=await ex({after:e.cursor}),se=Fa(q),re=new Set(e.leads.map(Re=>Re.id));e.leads.push(...se.filter(Re=>!re.has(Re.id))),e.cursor=Y,e.hasMore=ce,w(),I()}catch{B("No se pudo cargar más","error"),F.disabled=!1,F.textContent="Cargar más"}}}function fe(){if(j.get().mock){j.set({team:iu()}),e.leads=Fa(zi()),e.loading=!1,e.hasMore=!1,w(),I(),e.dirtyHandler=()=>{e.leads=Fa(zi()),w(),I()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}tx().catch(()=>{}),e.sub=ZC({pageSize:40,onData:(F,q)=>{e.leads=Fa(F),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=q.hasMore,e.loading=!1,e.error=null,w(),I()},onError:F=>{console.error("[inbox] error de suscripción:",F),e.loading=!1,e.error=F&&F.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",I()}})}return I(),fe(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function Hx(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}function Kx(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null,view:"kanban",won:[],wonSub:null,wonLoading:!0,wonError:null,collisionByDeal:new Map},t=Le("crm.edit"),r=new Set,s=l("div",{class:"pipeline__bar"}),i=l("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),a=l("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),c=l("section",{class:"pipeline"},[a,s,i]);ue(n),n.append(c);function u(N,H){const z=e.deals.findIndex(Z=>Z.id===N);z!==-1&&(e.deals[z]={...e.deals[z],...H},j.get().mock&&vx(N,H),T())}async function d(N,H){if(N.stageId===H)return;const z=sm(N.stageId,H);if(!z.ok){B(z.error==="vendido_es_terminal"?"Un negocio vendido no se mueve (anulación = admin).":"Movimiento no válido","error");return}const Z=[...z.gates];z.needsReason&&Z.push("regressReason");const G=async fe=>{const F=es(H),q=N.stageId;if(u(N.id,{stageId:H,stageName:F.label,probability:F.prob,...fe,lastActivityAt:new Date().toISOString()}),j.get().mock){B("Etapa → "+F.label,"ok");return}try{await am(N.id,H,N,fe),p(N,q,F.label)}catch(Y){u(N.id,{stageId:q,stageName:es(q).label,probability:bi(q)}),B(Y&&Y.code==="permission-denied"?"Movimiento rechazado por las reglas — recarga el portal si tu versión es vieja.":"No se pudo mover","error")}};if(!Z.length)return G({});g(N,H,Z,G)}let f=null;function p(N,H,z){f&&f.remove();const Z=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),G=l("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[l("span",{text:`${(N.contactName||N.name||"Negocio").split(" · ")[0]} → ${z}`}),Z]);document.body.appendChild(G),f=G;const fe=setTimeout(()=>{G.remove(),f===G&&(f=null)},1e4);Z.addEventListener("click",async()=>{clearTimeout(fe),G.remove(),f===G&&(f=null);const F=es(H);if(u(N.id,{stageId:H,stageName:F.label,probability:F.prob}),!j.get().mock)try{await am(N.id,H,N,{regressReason:"Deshacer (arrastre accidental)"})}catch{B("No se pudo deshacer","error")}})}function g(N,H,z,Z){const G={},fe=[],F=(Ne,qe)=>l("label",{class:"field"},[l("span",{class:"field__label",text:Ne}),qe]);if(z.includes("huboTestDrive")&&(G.huboTestDrive=l("select",{class:"select"},[l("option",{value:"si"},["Sí, hubo test drive"]),l("option",{value:"no"},["No alcanzó a probarlo"])]),fe.push(F("¿Hubo test drive?",G.huboTestDrive))),z.includes("montoApartado")){G.montoApartado=l("input",{class:"input",type:"number",min:"0",step:"50000",placeholder:"500000"});const Ne=new Date(Date.now()+72*3600*1e3);G.venceEl=l("input",{class:"input",type:"date",value:Ne.toISOString().slice(0,10)}),fe.push(F("Monto del apartado (COP) *",G.montoApartado),F("Vence el (default 72h)",G.venceEl))}if(z.includes("tipoPago")&&(G.tipoPago=l("select",{class:"select"},[l("option",{value:"contado"},["De contado"]),l("option",{value:"financiado"},["Financiado"])]),G.estadoCredito=l("select",{class:"select"},[l("option",{value:""},["— Estado del crédito —"]),l("option",{value:"pre_aprobado"},["Pre-aprobado"]),l("option",{value:"en_estudio"},["En estudio"]),l("option",{value:"aprobado"},["Aprobado"]),l("option",{value:"rechazado"},["Rechazado"])]),fe.push(F("Forma de pago *",G.tipoPago),F("Crédito (si aplica)",G.estadoCredito))),z.includes("lostReason")&&(G.lostReason=l("select",{class:"select"},im.map(Ne=>l("option",{value:Ne.id},[Ne.label]))),fe.push(F("¿Por qué se perdió? *",G.lostReason))),z.includes("regressReason")&&(G.regressReason=l("input",{class:"input",type:"text",placeholder:"¿Qué pasó? (obligatorio al retroceder)"}),fe.push(F("Razón del retroceso *",G.regressReason))),H==="vendido"){G.retomaCheck=l("input",{type:"checkbox",class:"checkbox"}),G.retomaMarca=l("input",{class:"input",type:"text",placeholder:"Marca *"}),G.retomaModelo=l("input",{class:"input",type:"text",placeholder:"Modelo"}),G.retomaYear=l("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),G.retomaPlaca=l("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),G.retomaValor=l("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"});const Ne=l("div",{class:"nl-form",hidden:!0,style:{marginTop:"8px"}},[G.retomaMarca,G.retomaModelo,G.retomaYear,G.retomaPlaca,G.retomaValor]);G.retomaCheck.addEventListener("change",()=>{Ne.hidden=!G.retomaCheck.checked}),fe.push(l("div",{},[l("label",{class:"u-row u-row--tight",style:{cursor:"pointer"}},[G.retomaCheck,l("span",{text:"🚙 Recibe vehículo en parte de pago (retoma)"})]),Ne]))}const q=l("div",{class:"login__error",role:"alert",hidden:!0}),Y=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),ce=l("button",{class:"btn btn--gold",type:"submit"},["Mover a "+es(H).label]),se=l("form",{class:"nl-form"},[...fe,q,l("div",{class:"nl-actions"},[Y,ce])]),re=l("div",{class:"modal-overlay"},[l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:es(H).label})]),se])]);document.body.appendChild(re),r.add(re);const Re=()=>{r.delete(re),re.remove()};Y.addEventListener("click",Re),re.addEventListener("mousedown",Ne=>{Ne.target===re&&Re()}),se.addEventListener("submit",Ne=>{Ne.preventDefault();const qe={};if(G.huboTestDrive&&(qe.huboTestDrive=G.huboTestDrive.value==="si"),G.montoApartado){const lt=Math.round(Number(G.montoApartado.value)||0);if(!(lt>0)){q.textContent="El monto del apartado es obligatorio.",q.hidden=!1;return}qe.montoApartado=lt,qe.venceEl=new Date((G.venceEl.value||new Date().toISOString().slice(0,10))+"T18:00:00-05:00").toISOString()}if(G.tipoPago&&(qe.tipoPago=G.tipoPago.value,G.estadoCredito&&G.estadoCredito.value&&(qe.estadoCredito=G.estadoCredito.value)),G.lostReason&&(qe.lostReason=G.lostReason.value),G.regressReason){const lt=G.regressReason.value.trim();if(!lt){q.textContent="Escribe la razón del retroceso.",q.hidden=!1;return}qe.regressReason=lt}if(G.retomaCheck&&G.retomaCheck.checked){const lt=G.retomaMarca.value.trim();if(!lt){q.textContent="La marca del vehículo recibido es obligatoria.",q.hidden=!1;return}qe.recibeVehiculo={marca:lt,modelo:G.retomaModelo.value.trim(),year:Number(G.retomaYear.value)||null,placa:G.retomaPlaca.value.trim().toUpperCase(),valorEstimado:Math.round(Number(G.retomaValor.value)||0)}}Re(),Z(qe)})}async function _(N,H){if(u(N.id,{amount:H}),!j.get().mock)try{await Mx(N.id,H,N)}catch{B("No se pudo guardar el monto","error")}}async function v(N){if(!(Number(N.amount)>0)){B("Ponle el monto al negocio antes de marcarlo ganado (con ese valor se congela la comisión).","error");return}const H=sm(N.stageId,"vendido");if(!H.ok){B("Movimiento no válido","error");return}const z={status:N.status,stageId:N.stageId},Z=async G=>{if(u(N.id,{status:"won",...G}),j.get().mock){B("🎉 ¡Venta ganada!","ok");return}try{await Fx(N.id,N,G),B("🎉 ¡Venta ganada!","ok")}catch{u(N.id,z),B("No se pudo marcar — revisa los datos requeridos","error")}};if(!H.gates.length)return Z({});g(N,"vendido",H.gates,Z)}async function S(N,H){const z={status:N.status,lostReason:N.lostReason||null};if(u(N.id,{status:"lost",lostReason:H}),j.get().mock){B("Marcado perdido","info");return}try{await Ux(N.id,H,N),B("Marcado perdido","info")}catch{u(N.id,z),B("Error","error")}}function T(){if(e.loading)return ye();if(e.error)return X("⚠️","No se pudo cargar",e.error);const N=e.deals.filter(z=>z.status==="open");e.collisionByDeal=new Map;for(const z of Nx(N))for(const Z of z.dealIds)e.collisionByDeal.set(Z,z.dealIds.length);if(D(N),e.view==="postventa")return le();if(i.classList.remove("pipeline__board--list"),ue(i),!N.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🎯"}),l("div",{class:"state__title",text:"Embudo vacío"}),l("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const H=Px(N);yi.forEach(z=>{const Z=H[z.id]||[],G=Z.reduce((F,q)=>F+(Number(q.amount)||0),0),fe=l("div",{class:"pcol","data-stage":z.id},[l("div",{class:"pcol__head"},[l("div",{class:"u-row u-row--tight"},[l("span",{class:"pcol__dot",style:{background:Wx(z.id)}}),l("strong",{text:z.label}),l("span",{class:"pcol__count",text:String(Z.length)})]),l("span",{class:"u-caption u-faint",text:`${Math.round(z.prob*100)}% · ${ar(G)||"$0"}`})]),l("div",{class:"pcol__drop","data-stage":z.id,role:"list"},Z.map(L))]);y(fe.querySelector(".pcol__drop"),z.id),i.append(fe)})}function D(N){const H=wy(N),z=Cx(N);ue(s);const Z=e.wonLoading?null:e.won.length,G=(fe,F)=>{const q=l("button",{class:"btn btn--sm "+(e.view===fe?"btn--gold":"btn--ghost"),type:"button","aria-pressed":e.view===fe?"true":"false"},[F]);return q.addEventListener("click",()=>k(fe)),q};s.append(l("div",{class:"pipeline__views",role:"group","aria-label":"Vista"},[G("kanban","🎯 Embudo"),G("postventa","🏁 Post-venta"+(Z===null||Z===0?"":" ("+Z+")"))]),x("Oportunidades",String(N.length)),x("Valor del embudo",ar(z)||"$0"),x("Forecast ponderado",ar(H)||"$0",!0))}function k(N){e.view!==N&&(e.view=N,N==="postventa"&&w(),T())}function x(N,H,z){return l("div",{class:"pstat"+(z?" pstat--hi":"")},[l("span",{class:"u-caption u-faint",text:N}),l("strong",{class:"pstat__v",text:H})])}function L(N){const H=xx(N),z=l("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[N.amount?ar(N.amount):"+ monto"]),Z=l("article",{class:"deal-card"+(H?" is-rotting":""),draggable:"true",tabindex:"0","data-id":N.id,"data-stage":N.stageId,role:"listitem","aria-label":`${N.name}, ${Math.round(bi(N.stageId)*100)}%`},[l("div",{class:"deal-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(N.contactName)}),l("span",{class:"deal-card__name u-grow u-truncate",text:N.name}),H?l("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),N.vehicleName?l("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+N.vehicleName}):null,e.collisionByDeal.has(N.id)?l("div",{class:"deal-card__collision u-caption",title:"Otro negocio activo persigue este mismo carro. Coordinen quién va primero.",text:"🥊 "+e.collisionByDeal.get(N.id)+" negocios por este carro"}):null,l("div",{class:"deal-card__row"},[z,l("span",{class:"badge badge--gold",text:`${Math.round(bi(N.stageId)*100)}%`})]),l("div",{class:"deal-card__foot u-caption u-faint"},[l("span",{class:"u-grow u-truncate",text:N.ownerName?"👤 "+N.ownerName:"Sin asesor"}),l("span",{text:br(N.lastActivityAt)})]),l("div",{class:"deal-card__actions"},t?[C("stage","↔","Mover etapa"),C("won","✓","Marcar ganado"),C("lost","✕","Marcar perdido"),C("open","⤢","Abrir 360")]:[C("open","⤢","Abrir 360")])]);return Z.addEventListener("dragstart",G=>{e.dragId=N.id,Z.classList.add("is-dragging");try{G.dataTransfer.setData("text/plain",N.id),G.dataTransfer.effectAllowed="move"}catch{}}),Z.addEventListener("dragend",()=>{e.dragId=null,Z.classList.remove("is-dragging")}),Z.addEventListener("click",G=>{const fe=G.target.closest("[data-action]");if(fe)return M(fe.dataset.action,N,fe)}),Z}function C(N,H,z){return l("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":N,title:z,"aria-label":z,draggable:"false"},[H])}function M(N,H,z){if(N==="open")return j.set({detailLeadId:H.leadId});if(N==="amount")return E(H,z);if(N==="stage")return jt(z,yi.map(Z=>({value:Z.id,label:Z.label,hint:Math.round(Z.prob*100)+"%",active:Z.id===H.stageId})),Z=>d(H,Z.value),{title:"Mover a etapa"});if(N==="won")return v(H);if(N==="lost")return jt(z,im.map(Z=>({value:Z.id,label:Z.label})),Z=>S(H,Z.value),{title:"Motivo de pérdida"})}function E(N,H){const z=l("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:N.amount||"","aria-label":"Monto en COP"});H.replaceWith(z),z.focus(),z.select();const Z=()=>{const G=parseInt(String(z.value).replace(/\D/g,""),10)||0;_(N,G)};z.addEventListener("keydown",G=>{G.key==="Enter"?(G.preventDefault(),Z()):G.key==="Escape"&&T()}),z.addEventListener("blur",Z)}function y(N,H){N.addEventListener("dragover",z=>{z.preventDefault(),N.classList.add("is-over"),z.dataTransfer&&(z.dataTransfer.dropEffect="move")}),N.addEventListener("dragleave",()=>N.classList.remove("is-over")),N.addEventListener("drop",z=>{z.preventDefault(),N.classList.remove("is-over");const Z=e.dragId||z.dataTransfer&&z.dataTransfer.getData("text/plain"),G=e.deals.find(fe=>fe.id===Z);G&&d(G,H)})}function w(){if(j.get().mock){e.won=au().filter(N=>N.status==="won"),e.wonLoading=!1,e.wonError=null;return}e.wonSub||(e.wonSub=Bx({pageSize:100,onData:N=>{e.won=N.slice().sort((H,z)=>String(z.wonAt||z.lastActivityAt||"").localeCompare(String(H.wonAt||H.lastActivityAt||""))),e.wonLoading=!1,e.wonError=null,T()},onError:N=>{if(e.wonSub)try{e.wonSub()}catch{}e.wonSub=null,e.wonLoading=!1,e.wonError=N&&N.code==="permission-denied"?"Sin permiso para ver los ganados.":"Revisa tu conexión.",e.view==="postventa"&&T()}}))}function R(N,H){const z=e.won.findIndex(Z=>Z.id===N);z!==-1&&(e.won[z]={...e.won[z],...H},T())}async function I(N,H,z){const Z=N.postventa||{};if(R(N.id,{postventa:{...Z,[H]:z}}),!j.get().mock)try{await $x(N.id,H,z)}catch{R(N.id,{postventa:Z}),B("No se pudo guardar el checklist","error")}}async function P(N,H){H.disabled=!0,H.textContent="Creando…";try{const z=await jx(N.id);R(N.id,{retomaVehicleId:z.vehicleId}),B("Borrador #"+z.vehicleId+" creado en inventario","ok")}catch(z){H.disabled=!1,H.textContent="Crear borrador en inventario",B(z&&z.message?z.message:"No se pudo crear el borrador","error")}}function A(N){const H=l("input",{class:"input",type:"text",placeholder:"Marca *"}),z=l("input",{class:"input",type:"text",placeholder:"Modelo"}),Z=l("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),G=l("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),fe=l("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"}),F=l("div",{class:"login__error",role:"alert",hidden:!0}),q=l("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),Y=l("button",{class:"btn btn--gold",type:"submit"},["Guardar retoma"]),ce=l("form",{class:"nl-form"},[H,z,Z,G,fe,F,l("div",{class:"nl-actions"},[q,Y])]),se=l("div",{class:"modal-overlay"},[l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:"🚙 Vehículo recibido (retoma)"})]),ce])]);document.body.appendChild(se),r.add(se);const re=()=>{r.delete(se),se.remove()};q.addEventListener("click",re),se.addEventListener("mousedown",Re=>{Re.target===se&&re()}),ce.addEventListener("submit",async Re=>{if(Re.preventDefault(),!H.value.trim()){F.textContent="La marca es obligatoria.",F.hidden=!1;return}const Ne={marca:H.value.trim(),modelo:z.value.trim(),year:Number(Z.value)||null,placa:G.value.trim().toUpperCase(),valorEstimado:Math.round(Number(fe.value)||0)};re();const qe=N.recibeVehiculo||null;if(R(N.id,{recibeVehiculo:Ne}),!j.get().mock)try{await qx(N.id,Ne)}catch{R(N.id,{recibeVehiculo:qe}),B("No se pudo guardar","error")}})}function le(){if(ue(i),i.classList.add("pipeline__board--list"),e.wonError){const N=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Reintentar"]);N.addEventListener("click",()=>{e.wonError=null,e.wonLoading=!0,w(),T()}),i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"⚠️"}),l("div",{class:"state__title",text:"No se pudieron cargar los ganados"}),l("div",{class:"state__msg",text:e.wonError}),N]));return}if(e.wonLoading){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando ganados…"})]));return}if(!e.won.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🏁"}),l("div",{class:"state__title",text:"Sin ventas ganadas aún"}),l("div",{class:"state__msg",text:"Cuando marques un negocio como ganado, su checklist de entrega vivirá aquí."})]));return}e.won.forEach(N=>i.append(pe(N)))}function pe(N){const H=Ey(N),z=N.commissionSnapshot&&N.commissionSnapshot.amount||N.amount||0,Z=(N.wonAt||N.lastActivityAt||"").slice(0,10),G=Iy.map(q=>{const Y=!!(N.postventa&&N.postventa[q.id]),ce=l("input",{type:"checkbox",class:"checkbox"});return ce.checked=Y,t||(ce.disabled=!0),ce.addEventListener("change",()=>I(N,q.id,ce.checked)),l("label",{class:"pv-item"+(Y?" is-done":"")},[ce,l("span",{text:q.label})])}),fe=N.recibeVehiculo;let F;if(fe&&(fe.marca||fe.placa)){const q=[l("span",{class:"u-caption u-muted",text:"🚙 Retoma: "+[fe.marca,fe.modelo,fe.placa].filter(Boolean).join(" ")+(fe.valorEstimado?" · "+ar(fe.valorEstimado):"")})];if(N.retomaVehicleId)q.push(l("span",{class:"badge badge--gold",text:"Borrador #"+N.retomaVehicleId+" ✓"}));else if(t){const Y=l("button",{class:"btn btn--soft btn--sm",type:"button"},["Crear borrador en inventario"]);Y.addEventListener("click",()=>P(N,Y)),q.push(Y)}F=l("div",{class:"pv-retoma"},q)}else if(t){const q=l("button",{class:"btn btn--ghost btn--sm",type:"button"},["＋ Retoma"]);q.addEventListener("click",()=>A(N)),F=l("div",{class:"pv-retoma"},[q])}return l("article",{class:"deal-card deal-card--pv","data-id":N.id},[l("div",{class:"deal-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(N.contactName)}),l("span",{class:"deal-card__name u-grow u-truncate",text:N.name}),l("span",{class:"badge "+(H?"badge--gold":""),title:H?"Checklist completo: entra a liquidación de comisiones (F42)":"La comisión se liquida cuando el checklist esté completo",text:H?"✓ Liquidable":"⏳ Pendiente"})]),l("div",{class:"u-caption u-muted"},[l("span",{text:(N.vehicleName?"🚗 "+N.vehicleName+" · ":"")+ar(z)}),l("span",{class:"u-faint",text:(N.tipoPago?" · "+N.tipoPago:"")+(Z?" · ganado "+Z:"")})]),l("div",{class:"pv-checklist"},G),F||null,l("div",{class:"deal-card__foot u-caption u-faint"},[l("span",{class:"u-grow u-truncate",text:N.ownerName?"👤 "+N.ownerName:"Sin asesor"})])])}function X(N,H,z){ue(i),i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:N}),l("div",{class:"state__title",text:H}),l("div",{class:"state__msg",text:z})]))}function ye(){ue(s),ue(i),yi.slice(0,5).forEach(()=>{i.append(l("div",{class:"pcol"},[l("div",{class:"pcol__head"},[l("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),l("div",{class:"pcol__drop"},[1,2].map(()=>l("div",{class:"deal-card",style:{pointerEvents:"none"}},[l("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function $e(){if(j.get().mock){e.deals=au().filter(N=>N.status==="open"),e.loading=!1,w(),T();return}e.sub=Vx({pageSize:150,onData:N=>{e.deals=N,e.loading=!1,e.error=null,T()},onError:N=>{e.loading=!1,e.error=N&&N.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",T()}}),w()}return T(),$e(),function(){if(e.sub&&e.sub(),e.sub=null,e.wonSub&&e.wonSub(),e.wonSub=null,r.forEach(H=>{try{H.remove()}catch{}}),r.clear(),f){try{f.remove()}catch{}f=null}}}function Wx(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const Qx=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],om=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function Gi(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function Cy(n,e){const r=(new Date(n,e,1).getDay()+6)%7,s=new Date(n,e+1,0).getDate(),i=[];for(let c=0;c<r;c++)i.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=s;c++)i.push({date:new Date(n,e,c),inMonth:!0});for(;i.length%7!==0;){const c=i[i.length-1].date;i.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const a=[];for(let c=0;c<i.length;c+=7)a.push(i.slice(c,c+7));return a}function Yx(n,e){const t=Cy(n,e),r=t[0][0].date,i=t[t.length-1][6].date,a=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);return{startISO:r.toISOString(),endISO:a.toISOString()}}function Jx(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=Gi(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,s)=>new Date(r.dueAt)-new Date(s.dueAt));return e}function cm(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function Xx(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const xy=n=>({id:n.id,...n.data()});function Zx(n,e,t,r){const s=Qe(Ie(ee,"activities"),qn("dueAt",">=",n),qn("dueAt","<",e),ct("dueAt","asc"));return $t(s,i=>t(i.docs.map(xy)),i=>r&&r(i))}async function or(n,e,t){return(await en(tn,"crmCitaAction")({action:n,solicitudId:e||null,payload:t||{}})).data}async function eP(n){const e=await Hn(be(ee,"solicitudes",n));return e.exists()?{id:e.id,...e.data()}:null}async function Py(){const n=await Hn(be(ee,"config","availability"));return n.exists()?n.data():{}}async function Ny(){const n=await Hn(be(ee,"config","bookedSlots"));return n.exists()?n.data():{}}async function tP(){const n=Qe(Ie(ee,"leads"),ct("createdAt","desc"),yt(300));return(await Nt(n)).docs.map(xy)}const nP=["super_admin","admin","editor","asesor","moderator"];let $a=null;async function Dy(){if($a)return $a;const n=j.get(),e=new Map;try{(await Nt(Qe(Ie(ee,"usuarios"),yt(50)))).docs.forEach(r=>{const s=r.data();s.bloqueado!==!0&&(!nP.includes(s.rol)&&!s.roleId||e.set(r.id,{uid:r.id,nombre:s.nombre||s.email||r.id,rol:s.rol||s.roleId||""}))})}catch{try{const r=await Hn(be(ee,"config","crmIntake"));(r.exists()&&Array.isArray(r.data().rotation)?r.data().rotation:[]).forEach(i=>{const a=typeof i=="string"?i:i.uid;a&&e.set(a,{uid:a,nombre:typeof i=="object"&&i.nombre||a,rol:""})})}catch{}}return n.user&&!e.has(n.user.uid)&&e.set(n.user.uid,{uid:n.user.uid,nombre:n.profile&&n.profile.nombre||n.user.email||"Yo",rol:n.profile&&n.profile.rol||""}),$a=Array.from(e.values()),$a}const rP={pendiente:"🕐 Pendiente (sin confirmar)",confirmada:"✅ Confirmada",reprogramada:"🔁 Reprogramada (re-confirmar)",completada:"🏁 Completada",cancelada:"✖ Cancelada",no_show:"🚫 No asistió",caducada:"⏳ Caducada (no confirmó)"},sP=["pendiente","confirmada","reprogramada"],iP="";function aP(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Ud(n,e,t){const r=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:n}),e?l("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=l("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",a)},a=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",a),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{overlay:s,card:r,close:i}}function nr(n,e){return e?l("div",{class:"cita-row"},[l("span",{class:"cita-row__k u-caption u-muted",text:n}),l("span",{class:"cita-row__v",text:String(e)})]):null}function oP(n,e,t){if(!t)return[];if(Array.isArray(n.blockedDates)&&n.blockedDates.includes(t))return[];const r=new Date(t+"T12:00:00Z").getUTCDay();if(!(Array.isArray(n.days)?n.days:[1,2,3,4,5,6]).includes(r))return[];const s=Array.isArray(e[t])?e[t]:[],i=n.blockedHours&&n.blockedHours[t]||[],a=[],c=n.interval||60;for(let u=(n.startHour??9)*60;u<(n.endHour??17)*60;u+=c){const d=`${String(Math.floor(u/60)).padStart(2,"0")}:${String(u%60).padStart(2,"0")}`;!s.includes(d)&&!i.includes(d)&&a.push(d)}return a}function Vy(n,e,{fecha:t,hora:r}={}){const s=l("input",{class:"input",type:"date",min:aP(),value:t||""}),i=l("select",{class:"select"},[l("option",{value:"",text:"— hora —"})]);function a(){const c=oP(n,e,s.value);i.replaceChildren(l("option",{value:"",text:c.length?"— hora —":"Sin horarios ese día"}),...c.map(u=>l("option",{value:u,text:u}))),r&&c.includes(r)&&(i.value=r)}return s.addEventListener("change",a),t&&a(),{dateIn:s,hourSel:i,value:()=>({fecha:s.value,hora:i.value})}}async function Oy(n){const e=l("select",{class:"select"},[l("option",{value:"",text:"Cargando…"})]),t=await Dy();e.replaceChildren(l("option",{value:"",text:"— asesor —"}),...t.map(s=>l("option",{value:s.uid,text:s.nombre})));const r=j.get().user;return e.value=n&&t.some(s=>s.uid===n)?n:r&&t.some(s=>s.uid===r.uid)?r.uid:"",e._advisors=t,e}async function Ly(n){const e=l("select",{class:"select"},[l("option",{value:iP,text:"Sin vehículo asignado"})]);try{const t=await Sy();e.append(...t.map(r=>l("option",{value:r.id,text:r.label}))),n&&(e.value=n),e._vehicles=t}catch{e._vehicles=[]}return e}function cP(n,e){const t=String(n.whatsapp||n.telefono||"").replace(/\D/g,"");if(!t)return null;const r=t.length===10&&t.startsWith("3")?"57"+t:t.startsWith("57")?t:String(n.prefijoPais||"57").replace(/\D/g,"")+t,s=`Hola ${n.nombre||""}! Te escribo de ALTORRA CARS por tu cita del ${n.fecha||""} a las ${n.hora||""}`+(n.vehiculo?` para ver el ${n.vehiculo}`:"")+`. Confírmala aquí 👉 ${e}`;return`https://wa.me/${r}?text=${encodeURIComponent(s)}`}async function lP(n,{onLead:e}={}){const t=n.sourceSolicitudId;if(!t)return;if(j.get().mock){B("En demo las citas web no tienen acciones.","info");return}let r;try{r=await eP(t)}catch{r=null}if(!r){B("No se pudo cargar la cita.","error");return}const s=Le("crm.edit"),i=sP.includes(r.estado),a=l("div",{class:"nl-form"}),c=l("div",{class:"login__error",role:"alert",hidden:!0}),u=_=>{c.textContent=_,c.hidden=!1},{close:d}=Ud("Cita · "+(r.nombre||"Cliente"),rP[r.estado]||r.estado,[a]);function f(){return l("div",{class:"cita-info"},[nr("Cuándo",(r.fecha||"")+(r.hora?" · "+r.hora:"")),nr("Tipo",r.tipo),nr("Vehículo",r.vehiculo),nr("Teléfono",(r.prefijoPais||"")+" "+(r.whatsapp||r.telefono||"")),nr("Asesor",r.assignedToName||r.assignedTo),r.confirmedAt?nr("Confirmó",(r.confirmedVia||"")+" · "+String(r.confirmedAt).slice(0,16).replace("T"," ")):null,r._tupleConflict?l("div",{class:"cita-conflict",text:"⚠️ El cliente confirmó pero el horario CHOCA con otra cita del asesor — reprograma una de las dos."}):null,r._requiereReagendar?l("div",{class:"cita-conflict",text:"🚗 El carro de esta cita ya no está disponible — ofrece otro o reagenda."}):null,nr("Notas",r.comentarios||r.mensaje)])}async function p(_,v){c.hidden=!0;try{await v(),B(_,"ok"),d(),e&&r._leadId&&e(r._leadId)}catch(S){u(S&&S.message||"No se pudo completar la acción.")}}async function g(){if(a.replaceChildren(f(),c),!s||!i){if(r._leadId){const k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Ver cliente (360)"});k.addEventListener("click",()=>{d(),j.set({detailLeadId:r._leadId})}),a.append(k)}return}const _=l("div",{class:"cita-actions"}),v=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"📲 Pedir confirmación por WhatsApp"});v.addEventListener("click",async()=>{v.disabled=!0;try{const k=await or("getConfirmLink",r.id),x=cP(r,k.url);if(!x){u("La cita no tiene teléfono."),v.disabled=!1;return}window.open(x,"_blank","noopener"),B("Mensaje listo en WhatsApp — el cliente confirma tocando el link.","ok"),v.disabled=!1}catch(k){u(k&&k.message||"No se pudo generar el link."),v.disabled=!1}});const S=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✓ Confirmar (asignar asesor)"});S.addEventListener("click",async()=>{a.replaceChildren(f(),c,l("p",{class:"u-caption u-muted",text:"Confirmar reserva el bloque del asesor (y del carro si aplica)."}));const k=await Oy(r.assignedTo),x=await Ly(r.vehicleAssignedId||r.vehiculoId),L=l("select",{class:"select"},[l("option",{value:"manual",text:"El cliente confirmó (llamada/persona)"}),l("option",{value:"whatsapp",text:"El cliente confirmó por WhatsApp"}),l("option",{value:"email",text:"El cliente confirmó por email"})]),C=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"✓ Confirmar cita"}),M=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",g),C.addEventListener("click",()=>{if(!k.value){u("Elige el asesor.");return}const E=(k._advisors||[]).find(w=>w.uid===k.value)?.nombre||null,y=(x._vehicles||[]).find(w=>w.id===x.value);p("✅ Cita confirmada",()=>or("confirm",r.id,{asesorId:k.value,asesorName:E,canal:L.value,vehicleId:x.value||null,vehicleName:y?y.label:null}))}),a.append(l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor *"}),k]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),x]),l("label",{class:"field"},[l("span",{class:"field__label",text:"¿Cómo confirmó?"}),L]),l("div",{class:"nl-actions"},[M,C]))});const T=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🔁 Reprogramar"});T.addEventListener("click",async()=>{a.replaceChildren(f(),c,l("p",{class:"u-caption u-muted",text:"Al reprogramar, el link viejo de confirmación deja de servir y el cliente debe re-confirmar."}));let k,x;try{[k,x]=await Promise.all([Py(),Ny()])}catch{u("No se pudo cargar la disponibilidad — revisa tu conexión y reintenta.");return}const L=Vy(k,x,{}),C=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"🔁 Mover cita"}),M=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",g),C.addEventListener("click",()=>{const{fecha:E,hora:y}=L.value();if(!E||!y){u("Elige fecha y hora.");return}p("🔁 Cita reprogramada — pídele re-confirmar por WhatsApp",()=>or("reschedule",r.id,{fecha:E,hora:y}))}),a.append(l("div",{class:"cfg-row"},[L.dateIn,L.hourSel]),l("div",{class:"nl-actions"},[M,C]))});const D=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✖ Cancelar cita"});if(D.addEventListener("click",()=>{a.replaceChildren(f(),c);const k=l("input",{class:"input",type:"text",placeholder:"Motivo (le llega al cliente por email)"}),x=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Confirmar cancelación"}),L=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});L.addEventListener("click",g),x.addEventListener("click",()=>p("✖ Cita cancelada (cupo liberado)",()=>or("cancel",r.id,{motivo:k.value.trim()}))),a.append(k,l("div",{class:"nl-actions"},[L,x]))}),_.append(v,S,T,D),r.estado!=="pendiente"){const k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🏁 Completada"});k.addEventListener("click",()=>p("🏁 Cita completada",()=>or("complete",r.id)));const x=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🚫 No asistió"});x.addEventListener("click",()=>p("🚫 No-show registrado — mañana 9am te recuerda llamarlo",()=>or("no_show",r.id))),_.append(k,x)}if(r._leadId){const k=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"👤 Ver cliente (360)"});k.addEventListener("click",()=>{d(),j.set({detailLeadId:r._leadId})}),_.append(k)}a.append(_)}await g()}async function uP({onDone:n}={}){const e=l("div",{class:"nl-form"}),{close:t}=Ud("＋ Nueva cita","Elige para quién es",[e]),r=l("input",{class:"input",type:"search",placeholder:"Buscar por nombre o teléfono…",autocomplete:"off"}),s=l("div",{class:"cita-pick"}),i=l("p",{class:"u-caption u-faint",text:"El walk-in agenda sin quedar en el CRM — para registrarlo como cliente usa ⚡ Lead rápido en la Bandeja."});let a=[];function c(){const p=r.value.trim().toLowerCase(),g=p?a.filter(_=>(_.fullName||"").toLowerCase().includes(p)||String(_.phone||"").replace(/\D/g,"").includes(p.replace(/\D/g,"")||"\0")).slice(0,8):a.slice(0,8);s.replaceChildren(...g.map(_=>{const v=l("button",{class:"cita-pick__row",type:"button"},[l("strong",{text:_.fullName||"Sin nombre"}),l("span",{class:"u-caption u-muted",text:[_.phone,_.status].filter(Boolean).join(" · ")})]);return v.addEventListener("click",()=>{t(),lu(_,{onDone:n})}),v})),g.length||s.append(l("span",{class:"u-caption u-muted",text:p?"Nadie coincide — ¿es un walk-in nuevo?":"Cargando clientes…"}))}r.addEventListener("input",c),c(),j.get().mock?(a=zi(),c()):tP().then(p=>{a=p,c()}).catch(()=>s.replaceChildren(l("span",{class:"u-caption u-muted",text:"No se pudieron cargar los clientes — usa el camino de walk-in."})));const u=l("input",{class:"input",type:"text",placeholder:"Nombre *",autocomplete:"off"}),d=l("input",{class:"input",type:"tel",placeholder:"Teléfono (opcional)",inputmode:"tel",autocomplete:"off"}),f=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"🚶 Agendar walk-in"});f.addEventListener("click",()=>{const p=u.value.trim();if(!p){B("El nombre es obligatorio.","error"),u.focus();return}t(),lu({id:null,fullName:p,phone:d.value.trim()||null},{onDone:n})}),e.append(l("label",{class:"field"},[l("span",{class:"field__label",text:"👤 Cliente existente"}),r]),s,l("div",{class:"cita-pick__sep u-caption u-faint",text:"— o —"}),l("label",{class:"field"},[l("span",{class:"field__label",text:"🚶 Walk-in / persona nueva"}),u]),d,f,i),r.focus()}async function lu(n,{onDone:e}={}){if(j.get().mock){const T=new Date(Date.now()+864e5).toISOString();bx({type:"cita",subject:"Cita con "+(n.fullName||""),dueAt:T,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}),B("📅 Cita agendada (demo)","ok");return}const t=l("div",{class:"login__error",role:"alert",hidden:!0}),r=T=>{t.textContent=T,t.hidden=!1},s=l("div",{class:"nl-form"},[l("p",{class:"u-caption u-muted",text:"La cita manual nace CONFIRMADA y reserva el bloque del asesor (y del carro). Necesitas señal."})]),{close:i}=Ud("📅 Agendar cita",n.fullName||"Cliente",[s]);let a,c,u,d;try{[a,c,u,d]=await Promise.all([Py(),Ny(),Oy(n.ownerId),Ly(n.vehicleOfInterestId)])}catch{s.append(t),r("No se pudo cargar la disponibilidad — revisa tu conexión y vuelve a abrir el diálogo.");return}const f=Vy(a,c,{}),p=l("select",{class:"select"},[l("option",{value:"visita",text:"Visita al concesionario"}),l("option",{value:"test_drive",text:"Test drive"}),l("option",{value:"llamada",text:"Llamada agendada"})]),g=l("select",{class:"select"},[l("option",{value:"30",text:"30 min"}),l("option",{value:"60",text:"1 hora",selected:""}),l("option",{value:"90",text:"1h 30"})]),_=l("input",{class:"input",type:"text",placeholder:"Nota (opcional)"}),v=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"📅 Crear cita confirmada"}),S=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});S.addEventListener("click",i),v.addEventListener("click",async()=>{t.hidden=!0;const{fecha:T,hora:D}=f.value();if(!T||!D)return r("Elige fecha y hora.");if(!u.value)return r("Elige el asesor que atiende.");v.disabled=!0,v.textContent="Creando…";const k=(u._advisors||[]).find(L=>L.uid===u.value)?.nombre||null,x=(d._vehicles||[]).find(L=>L.id===d.value);try{await or("create",null,{leadId:n.id||null,contactId:n.contactId||null,nombre:n.fullName||"Cliente",telefono:n.phone||null,email:n.email||null,fecha:T,hora:D,duracionMin:parseInt(g.value,10)||60,asesorId:u.value,asesorName:k,vehicleId:d.value||null,vehicleName:x?x.label:null,tipo:p.value,nota:_.value.trim()}),B("📅 Cita creada y confirmada — ya está en la Agenda","ok"),i(),e&&e()}catch(L){v.disabled=!1,v.textContent="📅 Crear cita confirmada",r(L&&L.message||"No se pudo crear la cita.")}}),s.append(l("div",{class:"cfg-row"},[f.dateIn,f.hourSel]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Asesor *"}),u]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),d]),l("div",{class:"cfg-row"},[p,g]),_,t,l("div",{class:"nl-actions"},[S,v]))}function dP(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=l("div",{class:"agenda__head"}),s=l("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["✅ Toca una cita para confirmarla (asignando asesor), pedir confirmación por WhatsApp, reprogramarla o cancelarla. ","Si el cliente no confirma, caduca sola 3h antes y libera el cupo. El ",l("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario clásico"})," sigue de respaldo hasta el cambio definitivo."]),i=l("div",{class:"agenda__weekdays"},Qx.map(T=>l("span",{class:"agenda__wd",text:T}))),a=l("div",{class:"agenda__grid"}),c=l("section",{class:"agenda"},[r,s,i,a]);ue(n),n.append(c);function u(T){let D=t.month+T,k=t.year;D<0?(D=11,k--):D>11&&(D=0,k++),t.year=k,t.month=D,S()}function d(){t.year=e.getFullYear(),t.month=e.getMonth(),S()}function f(){ue(r);const T=l("div",{class:"u-row u-row--tight"},[p("‹","Mes anterior",()=>u(-1)),l("button",{class:"btn btn--soft btn--sm",type:"button",onclick:d},["Hoy"]),p("›","Mes siguiente",()=>u(1))]);if(Le("crm.edit")){const D=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nueva cita"});D.addEventListener("click",()=>uP({})),T.append(D)}r.append(l("h2",{class:"agenda__title",text:`${om[t.month]} ${t.year}`}),T)}function p(T,D,k){const x=l("button",{class:"icon-btn",type:"button","aria-label":D},[T]);return x.addEventListener("click",k),x}function g(){if(f(),ue(a),t.error){a.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"⚠️"}),l("div",{class:"state__title",text:"No se pudo cargar la agenda"}),l("div",{class:"state__msg",text:t.error})]));return}const T=Jx(t.events);Cy(t.year,t.month).forEach(k=>{k.forEach(x=>{const L=Gi(x.date),C=T[L]||[],M=Xx(x.date,e),E=l("div",{class:"agenda__day"+(x.inMonth?"":" is-out")+(M?" is-today":""),role:"gridcell"},[l("div",{class:"agenda__daynum",text:String(x.date.getDate())})]),y=l("div",{class:"agenda__events"});if(C.slice(0,3).forEach(w=>y.append(_(w))),C.length>3){const w=l("button",{class:"agenda__more",type:"button"},[`+${C.length-3} más`]);w.addEventListener("click",()=>jt(w,C.map(R=>({value:R,label:`${cm(R.dueAt)} · ${R.relatedTo?.name||R.subject||"Cita"}`})),R=>v(R.value),{title:`${x.date.getDate()} ${om[t.month]}`})),y.append(w)}E.append(y),a.append(E)})})}function _(T){const D=T.type==="cita"?T.estadoCita||"pendiente":null,k="agenda__chip"+(D?" agenda__chip--"+D:"")+(T.status==="closed"?" is-closed":""),x=l("button",{class:k,type:"button",title:T.subject||"Cita"},[l("span",{class:"agenda__chip-time",text:cm(T.dueAt)}),l("span",{class:"u-truncate",text:T.relatedTo?.name||T.subject||"Cita"})]);return x.addEventListener("click",()=>v(T)),x}function v(T){if(T.type==="cita"&&T.sourceSolicitudId){lP(T,{onLead:k=>j.set({detailLeadId:k})});return}const D=T.relatedTo&&T.relatedTo.id;D&&j.set({detailLeadId:D})}function S(){if(g(),t.sub&&(t.sub(),t.sub=null),j.get().mock){t.events=yx(),t.loading=!1,g();return}const{startISO:T,endISO:D}=Yx(t.year,t.month);t.sub=Zx(T,D,k=>{t.events=k,t.loading=!1,t.error=null,g()},k=>{t.loading=!1,t.error=k&&k.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",g()})}return S(),function(){t.sub&&t.sub(),t.sub=null}}const hP=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},xc=n=>n.status==="won",My=n=>n.status==="lost",Bd=n=>n.status==="open",$d=n=>n.status==="convertido";function lm(n,e){return e?n.filter(t=>hP(t.createdAt)>=e):n.slice()}function fP(n,e){const t=n.length,r=n.filter($d).length,s=e.filter(xc),i=e.filter(My),a=s.reduce((u,d)=>u+(Number(d.amount)||0),0),c=s.length+i.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:s.length,lost:i.length,winRate:c?s.length/c:0,wonValue:a}}function pP(n,e){const t=e.filter(Bd),r=n.filter(i=>!xs(i.status)),s=r.filter(i=>{const a=fy(i);return!a.closed&&(a.state==="warn"||a.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:wy(t),slaRisk:s}}function mP(n,e){const t=new Set(e.filter(xc).map(d=>d.id)),r=n.filter(d=>d.status==="contactado"||d.status==="calificado"||d.status==="convertido"),s=n.filter(d=>d.status==="calificado"||d.status==="convertido"),i=n.filter($d),a=i.filter(d=>d.convertedTo&&t.has(d.convertedTo.dealId)),c=n.length||1,u=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:s.length},{key:"convertidos",label:"Convertidos",count:i.length},{key:"ganados",label:"Ganados",count:a.length}];return u.map((d,f)=>({...d,pctTop:d.count/c,convFromPrev:f===0?1:u[f-1].count?d.count/u[f-1].count:0}))}function gP(n,e){const t={},r=s=>t[s.key]||(t[s.key]={key:s.key,label:s.label,icon:s.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(s=>{const i=r(qi(s));i.leads++,$d(s)&&i.convertidos++}),e.forEach(s=>{const i=r(qi(s));i.deals++,xc(s)&&(i.won++,i.revenue+=Number(s.amount)||0)}),Object.values(t).map(s=>({...s,convRate:s.leads?s.convertidos/s.leads:0})).sort((s,i)=>i.leads-s.leads||i.revenue-s.revenue)}function _P(n){const e=n.filter(Bd);return yi.map(t=>{const r=e.filter(s=>s.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((s,i)=>s+(Number(i.amount)||0),0),weighted:r.reduce((s,i)=>s+Fd(i),0)}})}function vP(n,e,t=[]){const r={},s=(i,a)=>r[i]||(r[i]={ownerId:i,ownerName:a,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(i=>s(i.uid,i.nombre)),n.forEach(i=>{const a=i.ownerId||"_none";s(a,i.ownerName||(a==="_none"?"Sin asignar":a)).leads++}),e.forEach(i=>{const a=i.ownerId||"_none",c=s(a,i.ownerName||(a==="_none"?"Sin asignar":a));c.deals++,xc(i)?c.won++:My(i)?c.lost++:Bd(i)&&(c.pipelineWeighted+=Fd(i))}),Object.values(r).filter(i=>i.leads||i.deals).map(i=>({...i,winRate:i.won+i.lost?i.won/(i.won+i.lost):0})).sort((i,a)=>a.won-i.won||a.pipelineWeighted-i.pipelineWeighted||a.leads-i.leads)}function yP(n,e=30){const t=[],r={},s=new Date;for(let i=e-1;i>=0;i--){const a=new Date(s.getFullYear(),s.getMonth(),s.getDate()-i),c={key:Gi(a),date:a,count:0};t.push(c),r[c.key]=c}return n.forEach(i=>{if(!i.createdAt)return;const a=r[Gi(new Date(i.createdAt))];a&&a.count++}),t}function bP(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")}function wP(n=6){const e=[],t=new Date;for(let r=0;r<n;r++){const s=new Date(t.getFullYear(),t.getMonth()-r,1),i=s.getFullYear()+"-"+String(s.getMonth()+1).padStart(2,"0"),a=s.toLocaleDateString("es-CO",{month:"long",year:"numeric"});e.push({key:i,label:a.charAt(0).toUpperCase()+a.slice(1)})}return e}function IP(n,e,t=[]){const r=(n||[]).filter(i=>i.status==="won"&&bP(i.wonAt||i.lastActivityAt)===e),s={};return r.forEach(i=>{const a=i.commissionSnapshot||{},c=a.ownerId||i.ownerId||"_none",u=(t.find(g=>g.uid===c)||{}).nombre,d=s[c]||(s[c]={ownerId:c,ownerName:u||i.ownerName||(c==="_none"?"Sin asignar":c),vendidos:0,liquidables:0,pendientes:0,baseLiquidable:0,basePendiente:0,deals:[]}),f=Number(a.amount!=null?a.amount:i.amount)||0,p=Ey(i);d.vendidos++,p?(d.liquidables++,d.baseLiquidable+=f):(d.pendientes++,d.basePendiente+=f),d.deals.push({id:i.id,name:i.name||"",base:f,liquidable:p,tipoPago:a.tipoPago||i.tipoPago||""})}),Object.values(s).sort((i,a)=>a.baseLiquidable-i.baseLiquidable||a.vendidos-i.vendidos)}const um=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function EP(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const Fy=n=>({id:n.id,...n.data()});async function dm(n,e){return(await Nt(Qe(Ie(ee,n),ct("createdAt","desc"),yt(e)))).docs.map(Fy)}async function TP({pageSize:n=500}={}){if(j.get().mock){const i=au();return{leads:zi(),deals:i,wons:i.filter(a=>a.status==="won"),capped:!1}}const[e,t,r]=await Promise.all([dm("leads",n),dm("deals",n),Nt(Qe(Ie(ee,"deals"),qn("status","==","won"),ct("lastActivityAt","desc"),yt(300)))]);return{leads:e.filter(i=>!i.archived),deals:t,wons:r.docs.map(Fy),capped:e.length>=n||t.length>=n}}const AP="http://www.w3.org/2000/svg";function gl(n,e={},t=[]){const r=document.createElementNS(AP,n);for(const[s,i]of Object.entries(e))i==null||i===!1||r.setAttribute(s,String(i));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function SP(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(s=>Number(s.value)||0)),r=l("div",{class:"reportes__bars",role:"list"});return n.forEach(s=>{const i=s.pct!=null?s.pct:t?(Number(s.value)||0)/t:0,a=Math.max(0,Math.min(100,i*100));r.append(l("div",{class:"reportes__bar",role:"listitem"},[l("span",{class:"reportes__bar-label u-truncate",text:s.label}),l("span",{class:"reportes__bar-track","aria-hidden":"true"},[l("span",{class:"reportes__bar-fill",style:{width:a+"%",background:s.color||"var(--grad-gold)"}})]),l("span",{class:"reportes__bar-val u-mono",text:s.display!=null?s.display:String(s.value)})]))}),r}function RP(n){const s=n.map(v=>Number(v.value)||0),i=Math.max(...s,0),a=Math.max(1,i),c=n.length,u=v=>c<=1?600/2:6+v*(600-2*6)/(c-1),d=v=>134-v/a*(140-2*6),f=n.map((v,S)=>`${u(S).toFixed(1)},${d(s[S]).toFixed(1)}`).join(" "),p=`6,134 ${f} ${594 .toFixed(1)},134`,g=s.reduce((v,S)=>v+S,0),_=(n[s.indexOf(i)]||{}).label||"";return gl("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${g} en total; pico de ${i}${_?" el "+_:""}.`},[gl("polygon",{points:p,fill:"var(--gold-300)",opacity:"0.30"}),gl("polyline",{points:f,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const Ct=n=>Math.round((n||0)*100)+"%",wt=n=>ar(n)||"$0",_l=n=>`${n.getDate()}/${n.getMonth()+1}`;function kP(n){const e=wP(6),t={leads:[],deals:[],wons:[],loading:!0,error:null,capped:!1,days:30,month:e[0].key};let r=!0;const s=l("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),i=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),a=l("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);i.addEventListener("click",R),a.addEventListener("click",w);const c=l("div",{class:"reportes__toolbar"},[s,l("div",{class:"u-row u-row--tight"},[i,a])]),u=l("div",{class:"reportes__body"}),d=l("section",{class:"reportes"},[c,u]);ue(n),n.append(d);function f(){ue(s),um.forEach(I=>{const P=t.days===I.value,A=l("button",{class:"chip",type:"button","aria-pressed":P?"true":"false"},[I.label]);A.addEventListener("click",()=>{t.days=I.value,g()}),s.append(A)})}function p(){const I=EP(t.days),P=lm(t.leads,I),A=lm(t.deals,I);return{pLeads:P,pDeals:A,pk:fP(P,A),ck:pP(t.leads,t.deals),fn:mP(P,t.deals),src:gP(P,A),stg:_P(t.deals),own:vP(P,A,j.get().mock?iu():j.get().team||[]),tr:yP(t.leads,30),com:IP(t.wons,t.month,j.get().mock?iu():j.get().team||[])}}function g(){if(f(),t.loading)return y();if(t.error)return E("⚠️","No se pudieron cargar los reportes",t.error);if(!t.leads.length&&!t.deals.length)return E("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const I=p();ue(u),t.capped&&u.append(l("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),u.append(_("Del período",[v("Leads nuevos",String(I.pk.leadsNew)),v("Tasa de conversión",Ct(I.pk.convRate),`${I.pk.convertidos} de ${I.pk.leadsNew}`),v("Win rate",Ct(I.pk.winRate),`${I.pk.won} ganadas · ${I.pk.lost} perdidas`),v("Valor ganado",wt(I.pk.wonValue),null,!0)]),_("Estado actual",[v("Leads activos",String(I.ck.leadsActive)),v("Oportunidades abiertas",String(I.ck.dealsOpen)),v("Pipeline ponderado",wt(I.ck.pipelineWeighted),null,!0),v("SLA en riesgo",String(I.ck.slaRisk),I.ck.slaRisk?"requieren atención":"al día")]),S(I.fn),T(I.src),D(I.stg),k(I.tr),x(I.own),L(I.com))}function _(I,P){return l("div",{class:"reportes__section"},[l("h2",{class:"reportes__sec-title",text:I}),l("div",{class:"reportes__kpis"},P)])}function v(I,P,A,le){return l("div",{class:"reportes__kpi"+(le?" reportes__kpi--hi":"")},[l("span",{class:"reportes__kpi-label u-caption u-faint",text:I}),l("strong",{class:"reportes__kpi-val",text:P}),A?l("span",{class:"reportes__kpi-sub u-caption u-faint",text:A}):null])}function S(I){const P=I.map((A,le)=>({label:A.label,value:A.count,pct:A.pctTop,display:le===0?String(A.count):`${A.count} · ${Ct(A.convFromPrev)}`,color:"var(--grad-gold)"}));return C("Embudo de ventas","De lead a venta — dónde se pierde el avance",SP(P,{max:I[0]?I[0].count:1}))}function T(I){const P=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],A=I.map(pe=>[`${pe.icon||""} ${pe.label}`.trim(),String(pe.leads),Ct(pe.convRate),String(pe.deals),String(pe.won),wt(pe.revenue)]),le=I.length?null:"Sin leads en el período.";return C("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",M(P,A,le))}function D(I){const P=["Etapa","Prob.","Oport.","Valor","Ponderado"],A=I.map(X=>[X.label,Ct(X.prob),String(X.count),wt(X.value),wt(X.weighted)]),le=I.reduce((X,ye)=>({count:X.count+ye.count,value:X.value+ye.value,weighted:X.weighted+ye.weighted}),{count:0,value:0,weighted:0}),pe=["Total","",String(le.count),wt(le.value),wt(le.weighted)];return C("Forecast por etapa","Pipeline abierto actual (no depende del período)",M(P,A,null,pe))}function k(I){const P=I.reduce((X,ye)=>X+ye.count,0),A=I.map(X=>({label:_l(X.date),value:X.count})),le=I.length?`${_l(I[0].date)} – ${_l(I[I.length-1].date)}`:"",pe=l("div",{class:"reportes__chart"},[RP(A),l("div",{class:"reportes__axis u-caption u-faint"},[l("span",{text:le}),l("span",{text:`${P} leads`})])]);return C("Tendencia de captación","Nuevos leads · últimos 30 días",pe)}function x(I){const P=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],A=I.map(pe=>[pe.ownerName,String(pe.leads),String(pe.deals),String(pe.won),Ct(pe.winRate),wt(pe.pipelineWeighted)]),le=I.length?null:"Sin actividad asignada en el período.";return C("Rendimiento del equipo","Por asesor, en el período seleccionado",M(P,A,le))}function L(I){const P=l("select",{class:"select","aria-label":"Mes de liquidación",style:{maxWidth:"220px"}},e.map(H=>{const z=l("option",{value:H.key},[H.label]);return H.key===t.month&&(z.selected=!0),z}));P.addEventListener("change",()=>{t.month=P.value,g()});const A=["Asesor","Vendidos","✓ Liquidables","Base liquidable","⏳ Pendientes","Base pendiente"],le=I.map(H=>[H.ownerName,String(H.vendidos),String(H.liquidables),wt(H.baseLiquidable),String(H.pendientes),wt(H.basePendiente)]),pe=I.reduce((H,z)=>({v:H.v+z.vendidos,l:H.l+z.liquidables,bl:H.bl+z.baseLiquidable,p:H.p+z.pendientes,bp:H.bp+z.basePendiente}),{v:0,l:0,bl:0,p:0,bp:0}),X=I.length?["Total",String(pe.v),String(pe.l),wt(pe.bl),String(pe.p),wt(pe.bp)]:null,ye=I.length?null:"Sin ventas ganadas en el mes seleccionado.",$e=I.flatMap(H=>H.deals.map(z=>[z.name||z.id,H.ownerName,wt(z.base),z.tipoPago||"—",z.liquidable?"✓ liquidable":"⏳ checklist pendiente"])),N=l("div",{},[l("div",{class:"u-row",style:{marginBottom:"10px"}},[P]),M(A,le,ye,X),$e.length?l("details",{style:{marginTop:"10px"}},[l("summary",{class:"u-caption u-muted",text:"Detalle por negocio ("+$e.length+")"}),M(["Negocio","Asesor","Base","Pago","Estado"],$e,null)]):null]);return C("Comisiones del mes",'"Si no está en el CRM, no entra a liquidación" — solo vendidos con checklist post-venta completo (F42)',N)}function C(I,P,A){return l("div",{class:"reportes__section"},[l("div",{class:"reportes__sec-head"},[l("h2",{class:"reportes__sec-title",text:I}),P?l("span",{class:"reportes__sec-cap u-caption u-faint",text:P}):null]),A])}function M(I,P,A,le){if(!P.length&&A)return l("div",{class:"reportes__empty u-caption u-faint",text:A});const pe=l("thead",{},[l("tr",{},I.map(($e,N)=>l("th",{class:N===0?"":"is-num",scope:"col",text:$e})))]),X=l("tbody",{},P.map($e=>l("tr",{},$e.map((N,H)=>l("td",{class:H===0?"":"is-num",text:N}))))),ye=[pe,X];return le&&ye.push(l("tfoot",{},[l("tr",{},le.map(($e,N)=>N===0?l("th",{scope:"row",text:$e}):l("td",{class:"is-num",text:$e})))])),l("div",{class:"reportes__tablewrap"},[l("table",{class:"reportes__table"},ye)])}function E(I,P,A){ue(u),u.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:I}),l("div",{class:"state__title",text:P}),l("div",{class:"state__msg",text:A})]))}function y(){ue(u);const I=l("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>l("div",{class:"reportes__kpi"},[l("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));u.append(l("div",{class:"reportes__section"},[I])),u.append(l("div",{class:"reportes__section"},[l("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function w(){if(t.loading||t.error){B("Aún no hay datos para exportar","info");return}const I=p(),P=(um.find(X=>X.value===t.days)||{}).label||"",A=[],le=X=>{A.push([]),A.push([X])};A.push(["Reporte Altorra CRM"]),A.push(["Período",P]),A.push(["Generado",new Date().toLocaleString("es-CO")]),le("KPIs del período"),A.push(["Métrica","Valor"]),A.push(["Leads nuevos",I.pk.leadsNew]),A.push(["Conversión",Ct(I.pk.convRate)]),A.push(["Win rate",Ct(I.pk.winRate)]),A.push(["Ganadas",I.pk.won]),A.push(["Perdidas",I.pk.lost]),A.push(["Valor ganado (COP)",I.pk.wonValue]),A.push(["Leads activos (ahora)",I.ck.leadsActive]),A.push(["Oportunidades abiertas (ahora)",I.ck.dealsOpen]),A.push(["Pipeline ponderado COP (ahora)",I.ck.pipelineWeighted]),A.push(["SLA en riesgo (ahora)",I.ck.slaRisk]),le("Embudo"),A.push(["Etapa","Cantidad","Conversión desde anterior"]),I.fn.forEach((X,ye)=>A.push([X.label,X.count,ye===0?"":Ct(X.convFromPrev)])),le("Rendimiento por canal"),A.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),I.src.forEach(X=>A.push([X.label,X.leads,Ct(X.convRate),X.deals,X.won,X.revenue])),le("Forecast por etapa (pipeline actual)"),A.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),I.stg.forEach(X=>A.push([X.label,Ct(X.prob),X.count,X.value,X.weighted])),le("Rendimiento del equipo"),A.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),I.own.forEach(X=>A.push([X.ownerName,X.leads,X.deals,X.won,Ct(X.winRate),X.pipelineWeighted]));const pe=(e.find(X=>X.key===t.month)||{}).label||t.month;le("Comisiones del mes — "+pe+" (F42: solo checklist completo entra a liquidación)"),A.push(["Asesor","Vendidos","Liquidables","Base liquidable (COP)","Pendientes","Base pendiente (COP)"]),I.com.forEach(X=>A.push([X.ownerName,X.vendidos,X.liquidables,X.baseLiquidable,X.pendientes,X.basePendiente])),A.push([]),A.push(["Negocio","Asesor","Base (COP)","Pago","Estado"]),I.com.forEach(X=>X.deals.forEach(ye=>A.push([ye.name||ye.id,X.ownerName,ye.base,ye.tipoPago||"",ye.liquidable?"liquidable":"checklist pendiente"]))),PP(`altorra-reportes-${Gi(new Date)}.csv`,xP(A)),B("Reporte exportado","ok")}async function R(){t.loading=!0,t.error=null,g();try{const I=await TP();if(!r)return;t.leads=I.leads,t.deals=I.deals,t.wons=I.wons||[],t.capped=!!I.capped,t.loading=!1}catch(I){if(!r)return;t.loading=!1,t.error=I&&I.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}g()}return R(),function(){r=!1}}function CP(n){let e=n==null?"":String(n);return/^[=+\-@\t\r]/.test(e)&&!/^-?\d+([.,]\d+)?$/.test(e)&&(e="'"+e),/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function xP(n){return"\uFEFF"+n.map(e=>e.map(CP).join(",")).join(`\r
`)}function PP(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=n,document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}function Uy(n,e){const t=String(n||"").trim();if(!t)return"";const r=t.replace(/[^\d+]/g,"").startsWith("+");let s=t.replace(/\D/g,"");if(!s)return"";const i=String(e||"").replace(/\D/g,"");return i&&!r&&!s.startsWith(i)?s=i+s:!i&&!r&&s.length===10&&s.startsWith("3")&&(s="57"+s),"+"+s}function hm(n){return String(n||"").replace(/[^a-z0-9]/gi,"_").slice(0,480)}function NP({email:n,phone:e,prefijoPais:t}){const r=[],s=String(n||"").trim().toLowerCase();s&&r.push(hm("email:"+s));const i=Uy(e,t);return i&&r.push(hm("phone:"+i)),r}const jo=n=>({id:n.id,...n.data()});async function DP({pageSize:n=500}={}){if(j.get().mock)return{contacts:px(),leads:zi()};const[e,t]=await Promise.all([Nt(Qe(Ie(ee,"contacts"),ct("createdAt","desc"),yt(n))).then(r=>r.docs.map(jo)),Nt(Qe(Ie(ee,"leads"),ct("createdAt","desc"),yt(n))).then(r=>r.docs.map(jo))]);return{contacts:e.filter(r=>!r._mergedInto&&!r._suppressed),leads:t}}async function zo(n){if(!n)return null;const e=await Hn(be(ee,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function VP(n,e,t){const r=Qe(Ie(ee,"activities"),qn("relatedTo.id","==",n),ct("createdAt","desc"),yt(50));return $t(r,s=>e(s.docs.map(jo)),s=>t&&t(s))}function OP(n,e,t){const r=Qe(Ie(ee,"contacts",n,"crmNotes"),ct("createdAt","desc"),yt(50));return $t(r,s=>e(s.docs.map(jo)),s=>t&&t(s))}async function LP({email:n,phone:e},t){for(const r of NP({email:n,phone:e})){const s=await Hn(be(ee,"dedup",r));if(s.exists()&&s.data().contactId!==t)return{key:r,contactId:s.data().contactId}}return null}async function MP(n,e,t){const r=be(ee,"contacts",n),s=async i=>{const a={...e,updatedAt:new Date().toISOString(),_version:i+1};return e.phone!==void 0&&(a.phone=Uy(e.phone,"+57")||null),Xe(r,a)};try{return await s(t._version||0),{ok:!0}}catch(i){if(!i||i.code!=="permission-denied")throw i;const a=await zo(n);if(!a)throw i;if(Object.keys(e).some(u=>String(a[u]??"")!==String(t[u]??""))){const u=new Error("conflict");throw u.code="conflict",u.fresh=a,u}return await s(a._version||0),{ok:!0,retried:!0}}}async function FP(n,e){return(await en(tn,"crmMergeContacts")({survivorId:n,mergedId:e})).data}async function UP(n){return(await en(tn,"crmSuppressContact")({contactId:n})).data}async function BP(n){return(await en(tn,"crmCancelSuppression")({contactId:n})).data}async function $P(n,e){const t=j.get().user;await Bt(Ie(ee,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:j.get().profile&&j.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const qP=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],jP={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function fm(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function zP(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=l("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,v()});const s=l("div",{class:"search"},[l("span",{"aria-hidden":"true",text:"🔎"}),r]),i={},a=l("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});qP.forEach(k=>{const x=l("button",{class:"chip",type:"button","aria-pressed":k.id===e.filter?"true":"false"},[k.label]);x.addEventListener("click",()=>{e.filter=k.id,Object.entries(i).forEach(([L,C])=>C.setAttribute("aria-pressed",L===k.id?"true":"false")),v()}),i[k.id]=x,a.append(x)});const c=l("span",{class:"contactos__count u-caption u-faint"}),u=l("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);u.addEventListener("click",D);const d=l("div",{class:"contactos__toolbar"},[s,a,l("div",{class:"u-row u-row--tight"},[c,u])]),f=l("div",{class:"contactos__list"}),p=l("section",{class:"contactos"},[d,f]);ue(n),n.append(p);function g(){const k={};for(const x of e.leads){if(!x.contactId)continue;const L=k[x.contactId];(!L||new Date(x.createdAt)>new Date(L.createdAt))&&(k[x.contactId]=x)}return k}function _(k){j.set({leads:e.leads,detailLeadId:k.id})}function v(){if(e.loading)return T("⏳","Cargando contactos…","");if(e.error)return T("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return T("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const k=g(),x=$o(e.q),L=e.contacts.filter(C=>e.filter!=="todos"&&fm(C)!==e.filter?!1:x?$o(`${C.fullName||""} ${C.email||""} ${C.phone||""}`).includes(x):!0);if(c.textContent=`${L.length} de ${e.contacts.length}`,ue(f),!L.length){f.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔍"}),l("div",{class:"state__title",text:"Sin resultados"}),l("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}L.forEach(C=>f.append(S(C,k[C.id])))}function S(k,x){const L=fm(k),C=jP[L],M=qi(k),E=Number(k.score)>0&&us[k.rating],y=l("div",{class:"contact-row__badges"},[l("span",{class:`badge badge--${C.badge}`,text:C.label}),l("span",{class:"badge",text:`${M.icon} ${M.label}`}),E?l("span",{class:`temp ${us[k.rating].cls}`,text:`${us[k.rating].icon} ${k.score}`}):null]),w=[k.email,k.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",R=Array.isArray(k.tags)&&k.tags.length?l("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+k.tags.join(", ")}):null,I=[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ks(k.fullName)}),l("div",{class:"contact-row__main"},[l("span",{class:"contact-row__name u-truncate",text:k.fullName||"Sin nombre"}),l("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:w,text:w}),R]),y,l("span",{class:"contact-row__time u-caption u-faint",text:br(k.lastActivityAt)})];if(x){const P=l("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${k.fullName||"contacto"}`},I);return P.addEventListener("click",()=>_(x)),P}return l("div",{class:"contact-row contact-row--nolead"},I)}function T(k,x,L){c.textContent="",ue(f),f.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:k}),l("div",{class:"state__title",text:x}),L?l("div",{class:"state__msg",text:L}):null]))}async function D(){e.loading=!0,e.error=null,v();try{const k=await DP();if(!t)return;e.contacts=k.contacts,e.leads=k.leads,e.loading=!1}catch(k){if(!t)return;e.loading=!1,e.error=k&&k.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}v()}return D(),function(){t=!1}}function GP(n,e,t){const r=l("div",{class:"modal"},[l("div",{class:"modal__head"},[l("h2",{class:"modal__title",text:n}),e?l("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=l("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",a)},a=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",a),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{close:i}}function HP(n,{onChanged:e}={}){if(!n){B("El contacto aún no carga.","error");return}if(j.get().mock){B("En demo no se edita el directorio.","info");return}if(n._mergedInto){B("Este contacto está fusionado en otro.","info");return}const t=l("div",{class:"nl-form"}),r=l("div",{class:"login__error",role:"alert",hidden:!0}),s=S=>{r.textContent=S,r.hidden=!1},{close:i}=GP("✏️ Editar contacto",n.fullName||"",[t]),a=n.suppressionStatus==="pendiente_supresion",c=l("input",{class:"input",type:"text",value:n.fullName||"",maxlength:"80"}),u=l("input",{class:"input",type:"email",value:n.email||"",placeholder:"correo@ejemplo.com"}),d=l("input",{class:"input",type:"tel",value:n.phone||"",placeholder:"+57 300 000 0000"}),f=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar cambios"}),p=l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});p.addEventListener("click",i);async function g(S){r.hidden=!0;const T={};if(c.value.trim()!==(n.fullName||"")&&(T.fullName=c.value.trim()),u.value.trim().toLowerCase()!==(n.email||"")&&(T.email=u.value.trim().toLowerCase()||null),d.value.trim()!==(n.phone||"")&&(T.phone=d.value.trim()||null),!Object.keys(T).length){i();return}f.disabled=!0,f.textContent="Guardando…";try{if(T.email!==void 0||T.phone!==void 0){const D=await LP({email:T.email!==void 0?T.email:n.email,phone:T.phone!==void 0?T.phone:n.phone},n.id);if(D)return f.disabled=!1,f.textContent="Guardar cambios",_(D)}await MP(n.id,T,S||n),B("✓ Contacto actualizado","ok"),i(),e&&e()}catch(D){if(f.disabled=!1,f.textContent="Guardar cambios",D&&D.code==="conflict"&&D.fresh){s("Alguien actualizó este contacto mientras editabas. Valores actuales: "+(D.fresh.fullName||"—")+" · "+(D.fresh.email||"sin email")+" · "+(D.fresh.phone||"sin tel")+'. Pulsa "Guardar" de nuevo para PISAR con lo tuyo, o Cancelar para conservar lo del server.'),f.disabled=!1,f.onclick=()=>g(D.fresh);return}s(D&&D.message||"No se pudo guardar.")}}f.addEventListener("click",()=>g(null));async function _(S){const T=await zo(S.contactId).catch(()=>null),D=T&&T.fullName||S.contactId;if(!Le("*")){s("Ese email/teléfono YA pertenece a otro contacto ("+D+"). Pídele al Super Admin fusionarlos — no se crean duplicados.");return}t.replaceChildren(l("p",{},["Ese dato ya pertenece a ",l("strong",{text:D}),". Son la misma persona → fusiónalos. Elige quién SOBREVIVE (el otro queda como histórico apuntando aquí):"]),r);const k=(x,L,C)=>{const M=l("button",{class:"btn btn--soft btn--sm",type:"button",text:x});return M.addEventListener("click",async()=>{if(confirm("¿Fusionar definitivamente? Re-apunta leads, negocios y notas. No se puede deshacer.")){M.disabled=!0;try{const E=await FP(L,C);B(`🔗 Fusionados: ${E.counts?E.counts.leads:0} lead(s), ${E.counts?E.counts.deals:0} negocio(s)`,"ok"),i(),e&&e()}catch(E){M.disabled=!1,s(E&&E.message||"No se pudo fusionar.")}}}),M};t.append(l("div",{class:"cita-actions"},[k("Sobrevive ESTE ("+(n.fullName||"actual")+")",n.id,S.contactId),k("Sobrevive el OTRO ("+D+")",S.contactId,n.id),l("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar",onclick:i})]))}function v(){if(!Le("crm.delete"))return null;const S=l("div",{class:"cfg-card",style:{borderColor:"var(--danger, #e5484d)"}});if(S.append(l("h3",{class:"cfg-card__title",text:"🛡 Privacidad (Ley 1581)"})),a){S.append(l("p",{class:"u-caption",text:"⏳ Supresión programada: se ejecuta el "+String(n.suppressionExecuteAfter||"").slice(0,16).replace("T"," ")+". Hasta entonces es reversible."}));const T=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"↩️ Cancelar supresión"});T.addEventListener("click",async()=>{T.disabled=!0;try{const D=await BP(n.id);B(D.duplicates&&D.duplicates.length?"↩️ Supresión cancelada — OJO: nació un duplicado durante la espera, fusiónalos.":"↩️ Supresión cancelada","ok"),i(),e&&e()}catch(D){T.disabled=!1,s(D&&D.message||"No se pudo cancelar.")}}),S.append(T)}else{S.append(l("p",{class:"u-caption u-muted",text:"Derecho de supresión: borra los datos personales (nombre, contacto, notas) de forma DEFINITIVA tras 72h de gracia. El historial comercial (montos, fechas, carro) se conserva anónimo. Las copias ya enviadas por Telegram/email quedan fuera del alcance técnico."}));const T=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑 Solicitar supresión definitiva…"});T.addEventListener("click",async()=>{const D=prompt("DOBLE CONFIRMACIÓN: escribe SUPRIMIR para programar el borrado de datos personales de "+(n.fullName||"este contacto")+" (72h de gracia, reversible hasta entonces).");if(D!=="SUPRIMIR"){D!==null&&B("Texto incorrecto — no se hizo nada.","info");return}T.disabled=!0;try{const k=await UP(n.id);B("🛡 Supresión programada para "+String(k.executeAfter||"").slice(0,16).replace("T"," "),"ok"),i(),e&&e()}catch(k){T.disabled=!1,s(k&&k.message||"No se pudo programar.")}}),S.append(T)}return S}a?t.append(l("p",{class:"cita-conflict",text:"⏳ Este contacto tiene una supresión Ley 1581 programada — no se puede editar (cancélala primero si fue un error)."}),r,v(),l("div",{class:"nl-actions"},[p])):t.append(l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre"}),c]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Email"}),u]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Teléfono"}),d]),r,l("div",{class:"nl-actions"},[p,f]),v())}const KP={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function WP(n){let e=null,t=null,r=null,s="resumen",i={lead:null,contact:null,activities:[],notes:[]};const a=l("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=l("div",{class:"detail-overlay",hidden:!0},[a]);n.append(c),c.addEventListener("mousedown",C=>{C.target===c&&u()}),window.addEventListener("keydown",C=>{C.key==="Escape"&&e&&u()}),j.subscribe(C=>{C.detailLeadId!==e&&f(C.detailLeadId)});function u(){j.set({detailLeadId:null})}function d(){t&&(t(),t=null),r&&(r(),r=null)}function f(C){if(d(),e=C,!C){c.hidden=!0,document.body.classList.remove("has-detail"),ue(a);return}s="resumen",c.hidden=!1,document.body.classList.add("has-detail"),p(C)}function p(C){const M=(j.get().leads||[]).find(E=>E.id===C);if(i={lead:M||null,contact:null,activities:[],notes:[],loadError:null},g(),!!M)if(j.get().mock)i.contact=fx(M.contactId),i.activities=hx(C),i.notes=rm(M.contactId),g();else{const E=y=>{i.loadError=y&&y.code==="permission-denied"?"Sin permiso de CRM (crm.read) para ver la ficha completa.":"No se pudo cargar parte de la ficha — revisa tu conexión.",g()};zo(M.contactId).then(y=>{i.contact=y,g()}).catch(E),t=VP(C,y=>{i.activities=y,g()},E),M.contactId&&(r=OP(M.contactId,y=>{i.notes=y,g()},E))}}function g(){ue(a);const C=i.lead;if(!C){a.append(_(null)),a.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔍"}),l("div",{class:"state__title",text:"Lead no disponible"}),l("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}a.append(_(C)),a.append(v());const M=l("div",{class:"detail__body"});i.loadError&&M.append(l("div",{class:"u-caption",role:"alert",style:{padding:"8px 12px",borderRadius:"8px",margin:"0 0 10px",background:"rgba(229,115,26,0.12)",border:"1px solid rgba(229,115,26,0.45)"},text:"⚠️ "+i.loadError})),s==="resumen"?M.append(S(C)):s==="comms"?M.append(D()):s==="score"?M.append(k(C)):s==="notas"&&M.append(x(C)),a.append(M)}function _(C){const M=l("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(M.addEventListener("click",u),!C)return l("div",{class:"detail__header"},[l("div",{class:"u-grow"}),M]);const E=L(C),y=us[E.rating],w=io(C.status),R=Cc(C),I=qi(C),P=l("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);P.addEventListener("click",()=>{const ye=dy(C.phone,`Hola ${String(C.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!ye)return B("Sin teléfono","error");window.open(ye,"_blank","noopener")});const A=Le("crm.edit"),le=A&&C.status!=="convertido"?l("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;le&&le.addEventListener("click",()=>Ry(C,{}));const pe=A?l("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;pe&&pe.addEventListener("click",()=>lu(C,{}));const X=A?l("button",{class:"icon-btn",type:"button","aria-label":"Editar contacto",title:"Editar contacto"},["✏️"]):null;return X&&X.addEventListener("click",()=>HP(i.contact,{onChanged:()=>{C.contactId&&zo(C.contactId).then(ye=>{i.contact=ye,g()}).catch(()=>B("No se pudo recargar el contacto","error"))}})),l("div",{class:"detail__header"},[l("div",{class:"u-row u-grow",style:{minWidth:"0"}},[l("span",{class:"avatar","aria-hidden":"true",text:ks(C.fullName)}),l("div",{class:"u-grow",style:{minWidth:"0"}},[l("h2",{class:"detail__name u-truncate",text:C.fullName}),l("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[l("span",{class:`temp ${y.cls}`,text:`${y.icon} ${y.label} · ${E.score}`}),l("span",{class:`badge badge--${w.badge||""}`.trim(),text:w.label}),l("span",{class:"badge",text:`${R.icon} ${R.label}`}),l("span",{class:"badge",text:`${I.icon} ${I.label}`})])])]),l("div",{class:"u-row u-row--tight"},[le,pe,X,P,M])])}function v(){const C=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],M=l("div",{class:"detail__tabs",role:"tablist"});return C.forEach(([E,y])=>{const w=l("button",{class:"detail__tab"+(s===E?" is-active":""),role:"tab","aria-selected":String(s===E),type:"button"},[y]);w.addEventListener("click",()=>{s=E,g()}),M.append(w)}),M}function S(C){const M=i.contact,E=M&&M.consent?M.consent:null,y=[["Correo",C.email||"—"],["Teléfono",C.phone||"—"],["Interés",C.sourceDetail||"—"],["Vehículo",C.vehicleOfInterestId||"—"],["Asesor",C.ownerName||"Sin asignar"],["Origen",C.source||"—"],["Capturado",AC(C.createdAt)],["Última actividad",br(C.lastActivityAt)]],w=gy(C,{score:L(C).score});return l("div",{class:"u-stack"},[l("div",{class:"detail-card detail-card--nba"},[l("span",{class:"detail-card__icon","aria-hidden":"true",text:w.icon}),l("div",{class:"u-grow"},[l("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),l("strong",{text:w.label}),l("div",{class:"u-caption u-faint",text:w.reason})])]),l("dl",{class:"kv"},y.flatMap(([R,I])=>[l("dt",{text:R}),l("dd",{class:"u-truncate",text:I})])),E?T(E):null])}function T(C){const M=E=>E?"✅":"⛔";return l("div",{class:"detail-card"},[l("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),l("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[l("span",{class:"u-caption",text:`${M(C.email)} Email`}),l("span",{class:"u-caption",text:`${M(C.whatsapp)} WhatsApp`}),l("span",{class:"u-caption",text:`${M(C.calls)} Llamadas`})]),l("div",{class:"u-caption u-faint",text:`Política ${C.policyVersion||"v1"} · origen ${C.source||"—"}`})])}function D(){if(!i.activities.length)return l("div",{class:"state"},[l("div",{class:"state__icon",text:"📭"}),l("div",{class:"state__title",text:"Sin comunicaciones"}),l("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const C=l("ol",{class:"timeline"});return i.activities.forEach(M=>{C.append(l("li",{class:"timeline__item timeline__item--"+(M.direction||"inbound")},[l("span",{class:"timeline__icon","aria-hidden":"true",text:KP[M.type]||"•"}),l("div",{class:"u-grow"},[l("div",{class:"u-spread"},[l("strong",{class:"u-truncate",text:M.subject||M.type||"Actividad"}),l("span",{class:"u-caption u-faint",text:br(M.createdAt)})]),M.body?l("div",{class:"u-caption u-muted",text:M.body}):null])]))}),C}function k(C){const M=L(C),E=us[M.rating],y=Object.keys(tm).map(w=>{const R=Math.round((M.factors[w]||0)*100);return l("div",{class:"factor"},[l("div",{class:"u-spread u-caption"},[l("span",{text:tm[w]}),l("span",{class:"u-faint",text:`${R}% · peso ${Math.round(HC[w]*100)}%`})]),l("div",{class:"factor__track"},[l("div",{class:"factor__fill",style:{width:R+"%"}})])])});return l("div",{class:"u-stack"},[l("div",{class:"scorehero"},[l("div",{class:`scorehero__num ${E.cls}`,text:String(M.score)}),l("div",{class:"u-stack",style:{gap:"2px"}},[l("strong",{text:`${E.icon} ${E.label}`}),l("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),l("div",{class:"u-stack",style:{gap:"10px"}},y)])}function x(C){const M=Le("crm.edit")||Le("crm.create"),E=l("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),y=l("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);y.addEventListener("click",async()=>{const R=E.value.trim();if(!R)return;y.disabled=!0;const I={body:R,authorName:"Tú",createdAt:new Date().toISOString()};try{j.get().mock?(mx(C.contactId,I),i.notes=rm(C.contactId),g()):(await $P(C.contactId,R),E.value=""),B("Nota agregada","ok")}catch{B("No se pudo guardar la nota","error")}finally{y.disabled=!1}});const w=l("div",{class:"u-stack"});return i.notes.length||w.append(l("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),i.notes.forEach(R=>w.append(l("div",{class:"detail-card"},[l("div",{class:"u-caption u-muted",text:R.body}),l("div",{class:"u-caption u-faint",text:`${R.authorName||"Asesor"} · ${br(R.createdAt)}`})]))),l("div",{class:"u-stack"},[M?l("div",{class:"u-stack",style:{gap:"8px"}},[E,l("div",{class:"u-row",style:{justifyContent:"flex-end"}},[y])]):null,w])}function L(C){return my(C,i.activities||[],i.contact)}}const By={days:[1,2,3,4,5,6],startHour:9,endHour:17,interval:60,maxPerSlot:1,bufferMin:15,blockedDates:[],blockedDateLabels:{},blockedHours:{}},QP=[["2026-01-01","Año Nuevo"],["2026-01-12","Reyes Magos"],["2026-03-23","San José"],["2026-04-02","Jueves Santo"],["2026-04-03","Viernes Santo"],["2026-05-01","Día del Trabajo"],["2026-05-18","Ascensión"],["2026-06-08","Corpus Christi"],["2026-06-15","Sagrado Corazón"],["2026-06-29","San Pedro y San Pablo"],["2026-07-20","Independencia"],["2026-08-07","Batalla de Boyacá"],["2026-08-17","Asunción de la Virgen"],["2026-10-12","Día de la Raza"],["2026-11-02","Todos los Santos"],["2026-11-16","Independencia de Cartagena"],["2026-12-08","Inmaculada Concepción"],["2026-12-25","Navidad"]],$y=()=>be(ee,"config","availability"),qy=()=>be(ee,"crm_config","advisorOverrides");function YP(n,e){return $t($y(),t=>{n({...By,...t.exists()?t.data():{}})},t=>e&&e(t))}async function JP(n,e){await Ac($y(),{...n,updatedAt:new Date().toISOString(),updatedBy:e||null},{merge:!0})}function XP(n,e){return $t(qy(),t=>{n(t.exists()&&t.data().overrides||{})},t=>e&&e(t))}async function ZP(n,e){await Ac(qy(),{overrides:n,updatedAt:new Date().toISOString(),updatedBy:e||null})}const eN=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],qa=()=>{const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function tN(n){const e={av:{...By},overrides:{},advisors:[],sub:null,subOv:null,loaded:!1},t=Le("calendar.config"),r=l("section",{class:"cfg"});if(ue(n),n.append(r),!t){r.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔒"}),l("div",{class:"state__title",text:"Sin permiso"}),l("div",{class:"state__msg",text:"Solo quien administra la disponibilidad (permiso calendar.config) puede editar esto."})]));return}async function s(g,_){if(j.get().mock){Object.assign(e.av,g),p(),B(_+" (demo)","ok");return}try{await JP(g,j.get().user&&j.get().user.uid),B(_,"ok")}catch(v){B("No se pudo guardar: "+(v.message||v.code),"error")}}function i(){const g=e.av,_=eN.map((C,M)=>{const E=l("input",{type:"checkbox"});return E.checked=(g.days||[]).includes(M),E.dataset.dow=String(M),l("label",{class:"cfg-day"},[E,l("span",{text:C})])}),v=(C,M,E)=>{const y=l("select",{class:"select"});for(let w=M;w<=E;w++)y.append(l("option",{value:String(w),text:String(w).padStart(2,"0")+":00"}));return y.value=String(C),y},S=v(g.startHour,6,20),T=v(g.endHour,7,21),D=l("select",{class:"select"},[l("option",{value:"30",text:"Cada 30 min"}),l("option",{value:"60",text:"Cada hora"})]);D.value=String(g.interval||60);const k=l("input",{class:"input",type:"number",min:"1",max:"5",value:String(g.maxPerSlot||1)}),x=l("input",{class:"input",type:"number",min:"0",max:"60",step:"5",value:String(g.bufferMin!=null?g.bufferMin:15)}),L=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar horario"});return L.addEventListener("click",()=>{const C=_.map(y=>y.querySelector("input")).filter(y=>y.checked).map(y=>parseInt(y.dataset.dow,10)).sort(),M=parseInt(S.value,10),E=parseInt(T.value,10);if(!C.length){B("Elige al menos un día.","error");return}if(M>=E){B("La hora de cierre debe ser mayor que la de apertura.","error");return}s({days:C,startHour:M,endHour:E,interval:parseInt(D.value,10)||60,maxPerSlot:Math.max(1,parseInt(k.value,10)||1),bufferMin:Math.max(0,parseInt(x.value,10)||0)},"✓ Horario guardado")}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"🕘 Horario de atención"}),l("p",{class:"u-caption u-muted",text:"Esto es lo que el cliente ve en la web al pedir cita — los cambios aplican al instante."}),l("div",{class:"cfg-days"},_),l("div",{class:"cfg-grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Abre"}),S]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Cierra"}),T]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Citas web"}),D]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Citas por horario"}),k]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Colchón (min)"}),x])]),L])}function a(){const g=e.av,_=g.blockedDateLabels||{},v=qa(),S=l("div",{class:"cfg-chips"}),T=(g.blockedDates||[]).slice().sort();T.length||S.append(l("span",{class:"u-caption u-muted",text:"Sin fechas bloqueadas — la web ofrece todos los días laborales."})),T.forEach(C=>{const M=C<v,E=l("button",{class:"cfg-chip__x",type:"button","aria-label":"Quitar",text:"✕"});E.addEventListener("click",()=>{const y=T.filter(w=>w!==C);s({blockedDates:y,blockedDateLabels:{[C]:Up()}},"✓ Fecha desbloqueada: "+C)}),S.append(l("span",{class:"cfg-chip"+(M?" is-past":"")},[l("span",{text:C+(_[C]?" · "+_[C]:"")}),E]))});const D=l("input",{class:"input",type:"date",min:v}),k=l("input",{class:"input",type:"text",placeholder:"Motivo (opcional)",maxlength:"40"}),x=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear fecha"});x.addEventListener("click",()=>{const C=D.value;if(!C){B("Elige una fecha.","error");return}if(T.includes(C)){B("Esa fecha ya está bloqueada.","error");return}const M={..._};k.value.trim()&&(M[C]=k.value.trim()),s({blockedDates:[...T,C].sort(),blockedDateLabels:M},"✓ Fecha bloqueada: "+C)});const L=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🇨🇴 Cargar festivos de Colombia 2026"});return L.addEventListener("click",()=>{const C=QP.filter(([E])=>E>=v&&!T.includes(E));if(!C.length){B("Los festivos que faltan de 2026 ya están cargados.","ok");return}const M={..._};C.forEach(([E,y])=>{M[E]=y}),s({blockedDates:[...T,...C.map(([E])=>E)].sort(),blockedDateLabels:M},`✓ ${C.length} festivo(s) bloqueados`)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"📅 Fechas bloqueadas (festivos y cierres)"}),l("p",{class:"u-caption u-muted",text:"En estas fechas la web NO ofrece citas. Las fechas pasadas se limpian solas cada madrugada."}),S,l("div",{class:"cfg-row"},[D,k,x]),L])}function c(){const g=e.av,_=[],v=g.interval||60;for(let S=g.startHour*60;S<g.endHour*60;S+=v)_.push(String(Math.floor(S/60)).padStart(2,"0")+":"+String(S%60).padStart(2,"0"));return _}function u(){const _=e.av.blockedHours||{},v=l("div",{class:"cfg-bh"}),S=Object.entries(_).sort(([x],[L])=>x.localeCompare(L));S.length||v.append(l("span",{class:"u-caption u-muted",text:"Sin horas bloqueadas."})),S.forEach(([x,L])=>{const C=(L||[]).slice().sort().map(M=>{const E=l("button",{class:"cfg-chip__x",type:"button",text:"✕"});return E.addEventListener("click",()=>{const y=(_[x]||[]).filter(w=>w!==M);s({blockedHours:{[x]:y.length?y:Up()}},`✓ ${x} ${M} desbloqueada`)}),l("span",{class:"cfg-chip"},[l("span",{text:M}),E])});v.append(l("div",{class:"cfg-bh__day"},[l("strong",{text:x}),l("div",{class:"cfg-chips"},C)]))});const T=l("input",{class:"input",type:"date",min:qa()}),D=l("select",{class:"select"},c().map(x=>l("option",{value:x,text:x}))),k=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear hora"});return k.addEventListener("click",()=>{const x=T.value,L=D.value;if(!x){B("Elige una fecha.","error");return}const C=_[x]||[];if(C.includes(L)){B("Esa hora ya está bloqueada.","error");return}s({blockedHours:{..._,[x]:[...C,L].sort()}},`✓ ${x} ${L} bloqueada`)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"⏰ Horas bloqueadas (un horario puntual)"}),v,l("div",{class:"cfg-row"},[T,D,k])])}async function d(g,_){if(j.get().mock){e.overrides=g,p(),B(_+" (demo)","ok");return}try{await ZP(g,j.get().user&&j.get().user.uid),B(_,"ok")}catch(v){B("No se pudo guardar: "+(v.message||v.code),"error")}}function f(){const g=e.overrides||{},_=l("div",{class:"cfg-advisors"});return e.advisors.length||_.append(l("span",{class:"u-caption u-muted",text:"Cargando asesores…"})),e.advisors.forEach(v=>{const S=g[v.uid],T=l("div",{class:"cfg-advisor"});if(T.append(l("div",{class:"cfg-advisor__name"},[l("strong",{text:v.nombre}),S?l("span",{class:"cfg-advisor__badge is-off",text:`🏖 ${S.reason||"ausente"} · ${S.from} → ${S.to}`}):l("span",{class:"cfg-advisor__badge",text:"✅ disponible"})])),S){const D=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Quitar ausencia"});D.addEventListener("click",()=>{const k={...g};delete k[v.uid],d(k,`✓ ${v.nombre} disponible de nuevo`)}),T.append(D)}else{const D=l("input",{class:"input",type:"date",min:qa()}),k=l("input",{class:"input",type:"date",min:qa()}),x=l("select",{class:"select"},[l("option",{value:"vacaciones",text:"Vacaciones"}),l("option",{value:"incapacidad",text:"Incapacidad"}),l("option",{value:"otro",text:"Otro"})]),L=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Marcar ausencia"});L.addEventListener("click",()=>{if(!D.value||!k.value||D.value>k.value){B("Revisa el rango de fechas.","error");return}d({...g,[v.uid]:{name:v.nombre,from:D.value,to:k.value,reason:x.value}},`✓ Ausencia de ${v.nombre} registrada`)}),T.append(l("div",{class:"cfg-row"},[D,k,x,L]))}_.append(T)}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"👤 Excepciones por asesor"}),l("p",{class:"u-caption u-muted",text:"Un asesor ausente no recibe leads de la rotación ni citas confirmadas a su nombre en esas fechas."}),_])}function p(){ue(r),r.append(l("div",{class:"cfg-cols"},[i(),a()]),l("div",{class:"cfg-cols"},[u(),f()]))}return j.get().mock?(e.loaded=!0,p()):(e.sub=YP(g=>{e.av=g,e.loaded=!0,p()},()=>{B("No se pudo cargar la configuración.","error")}),e.subOv=XP(g=>{e.overrides=g,e.loaded&&p()},()=>{})),Dy().then(g=>{e.advisors=g,e.loaded&&p()}),function(){e.sub&&e.sub(),e.sub=null,e.subOv&&e.subOv(),e.subOv=null}}function Dt(n,e,t){try{if(j.get().mock)return;const r=j.get().user;Bt(Ie(ee,"auditLog"),{action:n,target:e||"",details:t||"",user:r&&r.email||"unknown",timestamp:new Date().toISOString()}).catch(()=>{})}catch{}}const pm={google_maps:"Google Maps",sitio_web:"Sitio Web",usuario_registrado:"Usuario Registrado"};function co(n){return(n||"NN").split(" ").map(e=>e.charAt(0)).join("").substring(0,2).toUpperCase()}function nN(n,e){const t=Qe(Ie(ee,"resenas"),ct("createdAt","desc"));return $t(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})))},r=>e&&e(r))}async function rN(n,e){const t=new Date().toISOString(),r={name:e.name,location:e.location||"Cartagena",rating:e.rating,vehicle:e.vehicle||"",text:e.text,source:e.source||"sitio_web",verified:!!e.verified,featured:!!e.featured,avatar:co(e.name),updatedAt:t};n?(await Xe(be(ee,"resenas",n),r),Dt("review_update","resena "+r.name,r.name)):(r.createdAt=t,await Bt(Ie(ee,"resenas"),r),Dt("review_create","resena "+r.name,r.name))}async function sN(n,e){await bd(be(ee,"resenas",n)),Dt("review_delete","resena "+(e||n),"")}const iN=[{_docId:"m1",name:"Carlos Pérez",location:"Cartagena",rating:5,vehicle:"Mazda CX-30 2023",text:"Excelente atención, el carro quedó impecable y el papeleo fue rapidísimo.",source:"google_maps",verified:!0,featured:!0,avatar:"CP",createdAt:"2026-06-01T10:00:00.000Z"},{_docId:"m2",name:"Laura Gómez",location:"Turbaco",rating:4,vehicle:"",text:"Buen servicio y asesoría honesta. El proceso de financiación tardó un poco.",source:"sitio_web",verified:!0,featured:!1,avatar:"LG",createdAt:"2026-05-20T15:30:00.000Z"},{_docId:"m3",name:"Andrés Llanos",location:"Cartagena",rating:5,vehicle:"Chevrolet Onix 2024",text:"Me recibieron mi carro usado como parte de pago sin vueltas. Recomendado.",source:"usuario_registrado",verified:!1,featured:!1,avatar:"AL",createdAt:"2026-05-02T09:10:00.000Z"}],aN="★",oN="☆",mm=n=>aN.repeat(Math.max(0,Math.min(5,n)))+oN.repeat(5-Math.max(0,Math.min(5,n)));function cN(n){const e={reviews:[],sub:null,loaded:!1},t=Le("reviews.create"),r=Le("reviews.edit"),s=Le("reviews.delete"),i=l("section",{class:"rev"});ue(n),n.append(i);function a(p){const g=!!p,_={name:l("input",{class:"input",type:"text",maxlength:"80",placeholder:"Nombre del cliente *"}),location:l("input",{class:"input",type:"text",maxlength:"60",placeholder:"Ciudad (default: Cartagena)"}),rating:l("select",{class:"select"},[5,4,3,2,1].map(k=>l("option",{value:String(k),text:mm(k)+"  ("+k+")"}))),vehicle:l("input",{class:"input",type:"text",maxlength:"80",placeholder:"Vehículo (opcional)"}),text:l("textarea",{class:"input rev-modal__text",maxlength:"600",rows:"4",placeholder:"Texto de la reseña *"}),source:l("select",{class:"select"},Object.entries(pm).map(([k,x])=>l("option",{value:k,text:x}))),verified:l("input",{type:"checkbox"}),featured:l("input",{type:"checkbox"})};g?(_.name.value=p.name||"",_.location.value=p.location||"",_.rating.value=String(parseInt(p.rating,10)||5),_.vehicle.value=p.vehicle||"",_.text.value=p.text||"",_.source.value=p.source||"sitio_web",_.verified.checked=p.verified!==!1,_.featured.checked=!!p.featured):(_.source.value="sitio_web",_.verified.checked=!0);const v=l("button",{class:"btn btn--gold",type:"button",text:g?"Guardar cambios":"Crear reseña"}),S=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),T=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:g?"Editar reseña":"Nueva reseña"}),l("div",{class:"rev-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Cliente *"}),_.name]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Ubicación"}),_.location]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Calificación"}),_.rating]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Vehículo"}),_.vehicle])]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Reseña *"}),_.text]),l("div",{class:"rev-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Fuente"}),_.source]),l("label",{class:"rev-check"},[_.verified,l("span",{text:"Verificada (cliente real)"})]),l("label",{class:"rev-check"},[_.featured,l("span",{text:"⭐ Destacada en el sitio"})])]),l("div",{class:"rev-modal__actions"},[S,v])])]),D=()=>T.remove();S.addEventListener("click",D),T.addEventListener("click",k=>{k.target===T&&D()}),v.addEventListener("click",async()=>{const k=_.name.value.trim(),x=_.text.value.trim();if(!k||!x){B("Completa nombre y texto de la reseña.","error");return}const L={name:k,text:x,location:_.location.value.trim(),rating:parseInt(_.rating.value,10)||5,vehicle:_.vehicle.value.trim(),source:_.source.value,verified:_.verified.checked,featured:_.featured.checked};if(j.get().mock){if(g){const C=e.reviews.findIndex(M=>M._docId===p._docId);C>=0&&(e.reviews[C]={...e.reviews[C],...L,avatar:co(k)})}else e.reviews.unshift({...L,_docId:"m"+Date.now(),avatar:co(k),createdAt:new Date().toISOString()});f(),D(),B(g?"Reseña actualizada (demo)":"Reseña creada (demo)","ok");return}v.disabled=!0,v.textContent="Guardando…";try{await rN(g?p._docId:null,L),D(),B(g?"✓ Reseña actualizada":"✓ Reseña creada — ya está en el sitio","ok")}catch(C){v.disabled=!1,v.textContent=g?"Guardar cambios":"Crear reseña",B("No se pudo guardar: "+(C.message||C.code),"error")}}),document.body.append(T),_.name.focus()}function c(p){const g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),_=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),v=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Eliminar esta reseña?"}),l("p",{class:"u-caption u-muted",text:`"${(p.text||"").slice(0,120)}…" — ${p.name}. Desaparece del sitio público al instante. No se puede deshacer.`}),l("div",{class:"rev-modal__actions"},[_,g])])]),S=()=>v.remove();_.addEventListener("click",S),v.addEventListener("click",T=>{T.target===v&&S()}),g.addEventListener("click",async()=>{if(j.get().mock){e.reviews=e.reviews.filter(T=>T._docId!==p._docId),f(),S(),B("Reseña eliminada (demo)","ok");return}g.disabled=!0;try{await sN(p._docId,p.name),S(),B("✓ Reseña eliminada","ok")}catch(T){g.disabled=!1,B("No se pudo eliminar: "+(T.message||T.code),"error")}}),document.body.append(v)}function u(){const p=e.reviews.length,g=p?(e.reviews.reduce((S,T)=>S+(parseInt(T.rating,10)||0),0)/p).toFixed(1):"0.0",_=e.reviews.filter(S=>S.featured).length,v=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nueva reseña"}):null;return v&&v.addEventListener("click",()=>a(null)),l("div",{class:"rev-head"},[l("div",{class:"rev-stats"},[l("div",{class:"rev-stat"},[l("strong",{text:String(p)}),l("span",{class:"u-caption u-muted",text:"reseñas"})]),l("div",{class:"rev-stat"},[l("strong",{text:g+" ★"}),l("span",{class:"u-caption u-muted",text:"promedio"})]),l("div",{class:"rev-stat"},[l("strong",{text:String(_)}),l("span",{class:"u-caption u-muted",text:"destacadas"})])]),v])}function d(p){const g=[];if(r){const _=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️ Editar"});_.addEventListener("click",()=>a(p)),g.push(_)}if(s){const _=l("button",{class:"btn btn--soft btn--sm rev-card__del",type:"button",text:"🗑","aria-label":"Eliminar"});_.addEventListener("click",()=>c(p)),g.push(_)}return l("article",{class:"rev-card"},[l("div",{class:"rev-card__top"},[l("span",{class:"avatar avatar--sm","aria-hidden":"true",text:p.avatar||co(p.name)}),l("div",{class:"rev-card__who"},[l("strong",{class:"u-truncate",text:(p.name||"")+(p.verified?" ✔":"")}),l("span",{class:"u-caption u-faint",text:p.location||"—"})]),l("span",{class:"rev-card__stars","aria-label":(p.rating||0)+" de 5",text:mm(parseInt(p.rating,10)||0)})]),p.text?l("p",{class:"rev-card__text",text:"“"+p.text+"”"}):null,l("div",{class:"rev-card__meta"},[p.vehicle?l("span",{class:"chip",text:"🚗 "+p.vehicle}):null,l("span",{class:"chip",text:pm[p.source]||p.source||"—"}),p.featured?l("span",{class:"chip chip--gold",text:"⭐ Destacada"}):null]),g.length?l("div",{class:"rev-card__actions"},g):null])}function f(){if(ue(i),i.append(u()),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando reseñas…"})]));return}if(!e.reviews.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"💬"}),l("div",{class:"state__title",text:"Sin reseñas"}),l("div",{class:"state__msg",text:t?'Agrega la primera con "＋ Nueva reseña".':"Aún no hay reseñas registradas."})]));return}i.append(l("div",{class:"rev-grid"},e.reviews.map(d)))}return j.get().mock?(e.reviews=iN.map(p=>({...p})),e.loaded=!0,f()):(f(),e.sub=nN(p=>{e.reviews=p,e.loaded=!0,f()},()=>B("No se pudieron cargar las reseñas.","error"))),function(){e.sub&&e.sub(),e.sub=null}}function jy(n,{maxWidth:e=1920,quality:t=.85}={}){return new Promise((r,s)=>{const i=URL.createObjectURL(n),a=new Image;a.onload=()=>{URL.revokeObjectURL(i);const c=Math.min(1,e/a.naturalWidth),u=Math.round(a.naturalWidth*c),d=Math.round(a.naturalHeight*c),f=document.createElement("canvas");f.width=u,f.height=d,f.getContext("2d").drawImage(a,0,0,u,d),f.toBlob(p=>{p?r(p):s(new Error("No se pudo comprimir la imagen."))},"image/webp",t)},a.onerror=()=>{URL.revokeObjectURL(i),s(new Error("Archivo de imagen inválido."))},a.src=i})}const uu={promocional:{label:"Promocionales (home)",hint:"Franja entre secciones del home. La web muestra MÁXIMO 3 activos, en orden ascendente."},home_promo:{label:"Carrusel financiación (home)",hint:"Carrusel grande del home con cifra de tasa y pills. Todos los activos rotan, en orden."}};function lN(n,e){const t=Qe(Ie(ee,"banners"),ct("order","asc"));return $t(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})).filter(s=>uu[s.position]))},r=>e&&e(r))}async function uN(n,e){if(!["image/jpeg","image/png","image/webp"].includes(n.type))throw new Error("Formato no válido. Usa JPG, PNG o WebP.");if(n.size>10*1024*1024)throw new Error("Imagen demasiado grande (máx 10MB).");e&&e("Comprimiendo a WebP…");const r=await jy(n,{maxWidth:1920,quality:.85});e&&e("Subiendo…");const s=n.name.replace(/[^a-zA-Z0-9._-]/g,"_").replace(/\.[^.]+$/,""),i="banners/"+Date.now()+"_"+s+".webp",a=await ay(Dd(Vd,i),r,{contentType:"image/webp"});return oy(a.ref)}async function dN(n,e,t){const r=new Date().toISOString(),s=e._userEmail||"unknown",i={title:e.title,subtitle:e.subtitle||"",position:e.position,order:e.order||0,link:e.link||"",cta:e.cta||"",active:!!e.active,updatedAt:r,updatedBy:s,_version:n?(t&&t._version||0)+1:1};e.image&&(i.image=e.image),e.position==="home_promo"&&(i.badge=e.badge||"",i.eyebrow=e.eyebrow||"",i.rateValue=e.rateValue||"",i.rateLabel=e.rateLabel||"",i.pills=(e.pills||[]).map(a=>(a||"").trim()).filter(Boolean).slice(0,3)),n?(await Xe(be(ee,"banners",n),i),Dt("banner_update","banner",i.title)):(i.createdAt=r,i.createdBy=s,await Bt(Ie(ee,"banners"),i),Dt("banner_create","banner",i.title))}async function hN(n){await Xe(be(ee,"banners",n._docId),{active:!n.active,updatedAt:new Date().toISOString(),_version:(n._version||0)+1})}async function fN(n){if(await bd(be(ee,"banners",n._docId)),Dt("banner_delete","banner",n.title||n._docId),n.image&&n.image.indexOf("firebasestorage")!==-1)try{await aC(Dd(Vd,n.image))}catch{}}const pN=[{_docId:"b1",title:"Feria de usados junio",subtitle:"Hasta 10% de descuento",position:"promocional",order:1,link:"busqueda.html",cta:"Ver ofertas",active:!0,image:"",_version:2,createdAt:"2026-06-01T10:00:00.000Z"},{_docId:"b2",title:"Financiación 90%",subtitle:"Tu carro con cuota inicial mínima",position:"home_promo",order:1,link:"simulador-credito.html",cta:"Simular crédito",active:!0,image:"",badge:"NUEVO",eyebrow:"Financiación ALTORRA",rateValue:"1.2%",rateLabel:"tasa mensual desde",pills:["Aprobación 24h","Sin codeudor","Tasa fija"],_version:1,createdAt:"2026-05-15T09:00:00.000Z"},{_docId:"b3",title:"Banner pausado",subtitle:"No visible en la web",position:"promocional",order:2,link:"",cta:"",active:!1,image:"",_version:1,createdAt:"2026-05-10T08:00:00.000Z"}];function mN(n){const e={banners:[],sub:null,loaded:!1},t=Le("banners.create"),r=Le("banners.edit"),s=Le("banners.delete"),i=l("section",{class:"ban"});ue(n),n.append(i);function a(p){const g=!!p;let _=p&&p.image||"";const v={title:l("input",{class:"input",type:"text",maxlength:"90",placeholder:"Título *"}),subtitle:l("input",{class:"input",type:"text",maxlength:"140",placeholder:"Subtítulo"}),position:l("select",{class:"select"},Object.entries(uu).map(([w,R])=>l("option",{value:w,text:R.label}))),order:l("input",{class:"input",type:"number",min:"0",max:"99",value:"0"}),link:l("input",{class:"input",type:"text",maxlength:"200",placeholder:"Enlace (ej: busqueda.html)"}),cta:l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Texto del botón"}),active:l("input",{type:"checkbox"}),badge:l("input",{class:"input",type:"text",maxlength:"20",placeholder:"Badge (ej: NUEVO)"}),eyebrow:l("input",{class:"input",type:"text",maxlength:"60",placeholder:"Antetítulo"}),rateValue:l("input",{class:"input",type:"text",maxlength:"12",placeholder:"Cifra (ej: 1.2%)"}),rateLabel:l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Etiqueta de la cifra"}),pills:[0,1,2].map(w=>l("input",{class:"input",type:"text",maxlength:"30",placeholder:"Pill "+(w+1)}))},S=l("input",{type:"file",accept:"image/jpeg,image/png,image/webp",class:"ban-file"}),T=l("div",{class:"ban-drop"}),D=l("span",{class:"u-caption u-muted",text:""});function k(){ue(T),_?T.append(l("img",{src:_,alt:"Vista previa",class:"ban-drop__img"}),l("span",{class:"u-caption u-muted",text:"Click para cambiar la imagen"})):T.append(l("span",{text:"🖼️"}),l("span",{class:"u-caption u-muted",text:"Click para subir (JPG/PNG/WebP → se comprime a WebP). Recomendado 1200×400+."}))}k(),T.addEventListener("click",()=>S.click()),S.addEventListener("change",async()=>{const w=S.files&&S.files[0];if(S.value="",!!w){if(j.get().mock){_="data:demo",k(),B("Imagen simulada (demo)","ok");return}try{D.textContent="Comprimiendo…",_=await uN(w,R=>{D.textContent=R}),D.textContent="✓ Imagen subida",k()}catch(R){D.textContent="",B(R.message||"No se pudo subir la imagen.","error")}}});const x=l("div",{class:"ban-hp"},[l("p",{class:"u-caption u-muted",text:"Campos del carrusel de financiación:"}),l("div",{class:"ban-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Badge"}),v.badge]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Antetítulo"}),v.eyebrow]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Cifra"}),v.rateValue]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Etiqueta cifra"}),v.rateLabel])]),l("div",{class:"ban-modal__grid ban-modal__grid--3"},v.pills.map((w,R)=>l("label",{class:"field"},[l("span",{class:"field__label",text:"Pill "+(R+1)}),w])))]),L=()=>{x.style.display=v.position.value==="home_promo"?"":"none"};v.position.addEventListener("change",L),g?(v.title.value=p.title||"",v.subtitle.value=p.subtitle||"",v.position.value=p.position,v.position.disabled=!0,v.order.value=String(p.order||0),v.link.value=p.link||"",v.cta.value=p.cta||"",v.active.checked=p.active!==!1,v.badge.value=p.badge||"",v.eyebrow.value=p.eyebrow||"",v.rateValue.value=p.rateValue||"",v.rateLabel.value=p.rateLabel||"",(p.pills||[]).forEach((w,R)=>{v.pills[R]&&(v.pills[R].value=w)})):v.active.checked=!0,L();const C=l("button",{class:"btn btn--gold",type:"button",text:g?"Guardar cambios":"Crear banner"}),M=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),E=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:g?"Editar banner":"Nuevo banner"}),T,S,D,l("div",{class:"ban-modal__grid"},[l("label",{class:"field"},[l("span",{class:"field__label",text:"Título *"}),v.title]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Subtítulo"}),v.subtitle]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Ubicación"}),v.position]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Orden (menor = primero)"}),v.order]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Enlace"}),v.link]),l("label",{class:"field"},[l("span",{class:"field__label",text:"Botón (CTA)"}),v.cta])]),x,l("label",{class:"rev-check"},[v.active,l("span",{text:"Activo (visible en la web)"})]),l("div",{class:"rev-modal__actions"},[M,C])])]),y=()=>E.remove();M.addEventListener("click",y),E.addEventListener("click",w=>{w.target===E&&y()}),C.addEventListener("click",async()=>{const w=v.title.value.trim();if(!w){B("El título es obligatorio.","error");return}if(!g&&!_){B("Sube la imagen del banner.","error");return}const R={title:w,subtitle:v.subtitle.value.trim(),position:v.position.value,order:parseInt(v.order.value,10)||0,link:v.link.value.trim(),cta:v.cta.value.trim(),active:v.active.checked,image:!g||_!==p.image?_:"",badge:v.badge.value,eyebrow:v.eyebrow.value,rateValue:v.rateValue.value,rateLabel:v.rateLabel.value,pills:v.pills.map(I=>I.value),_userEmail:j.get().user&&j.get().user.email||"unknown"};if(j.get().mock){if(g){const I=e.banners.findIndex(P=>P._docId===p._docId);I>=0&&(e.banners[I]={...e.banners[I],...R,image:_,_version:(e.banners[I]._version||0)+1})}else e.banners.push({...R,image:_,_docId:"b"+Date.now(),_version:1}),e.banners.sort((I,P)=>(I.order||0)-(P.order||0));f(),y(),B(g?"Banner actualizado (demo)":"Banner creado (demo)","ok");return}C.disabled=!0,C.textContent="Guardando…";try{await dN(g?p._docId:null,R,p),y(),B(g?"✓ Banner actualizado":"✓ Banner creado — ya está en el home","ok")}catch(I){C.disabled=!1,C.textContent=g?"Guardar cambios":"Crear banner",B("No se pudo guardar: "+(I.message||I.code),"error")}}),document.body.append(E),v.title.focus()}function c(p){const g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),_=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),v=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Eliminar este banner?"}),l("p",{class:"u-caption u-muted",text:`"${p.title}" desaparece de la web al instante (su imagen también se borra). No se puede deshacer — si solo quieres pausarlo, usa Ocultar.`}),l("div",{class:"rev-modal__actions"},[_,g])])]),S=()=>v.remove();_.addEventListener("click",S),v.addEventListener("click",T=>{T.target===v&&S()}),g.addEventListener("click",async()=>{if(j.get().mock){e.banners=e.banners.filter(T=>T._docId!==p._docId),f(),S(),B("Banner eliminado (demo)","ok");return}g.disabled=!0;try{await fN(p),S(),B("✓ Banner eliminado","ok")}catch(T){g.disabled=!1,B("No se pudo eliminar: "+(T.message||T.code),"error")}}),document.body.append(v)}function u(p){const g=[];if(r){const _=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️ Editar"});_.addEventListener("click",()=>a(p));const v=l("button",{class:"btn btn--soft btn--sm",type:"button",text:p.active?"🙈 Ocultar":"👁 Mostrar"});v.addEventListener("click",async()=>{if(j.get().mock){p.active=!p.active,f(),B(p.active?"Banner visible (demo)":"Banner pausado (demo)","ok");return}try{await hN(p),B(p.active?"✓ Banner pausado":"✓ Banner visible","ok")}catch(S){B("No se pudo cambiar: "+(S.message||S.code),"error")}}),g.push(_,v)}if(s){const _=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑","aria-label":"Eliminar"});_.addEventListener("click",()=>c(p)),g.push(_)}return l("article",{class:"ban-card"+(p.active?"":" is-off")},[l("div",{class:"ban-card__thumb"},[p.image&&p.image!=="data:demo"?l("img",{src:p.image,alt:p.title||"",loading:"lazy"}):l("span",{class:"u-caption u-faint",text:p.image==="data:demo"?"🖼️ (demo)":"Sin imagen"})]),l("div",{class:"ban-card__body"},[l("div",{class:"ban-card__head"},[l("span",{class:"chip"+(p.active?" chip--gold":""),text:p.active?"Activo":"Pausado"}),l("span",{class:"u-caption u-faint",text:"Orden "+(p.order||0)})]),l("strong",{class:"u-truncate",text:p.title||"Sin título"}),p.subtitle?l("span",{class:"u-caption u-muted u-truncate",text:p.subtitle}):null,g.length?l("div",{class:"ban-card__actions"},g):null])])}function d(p){const g=uu[p],_=e.banners.filter(S=>S.position===p),v=_.filter(S=>S.active).length;return l("div",{class:"ban-group"},[l("div",{class:"ban-group__head"},[l("h3",{class:"ban-group__title",text:g.label+` (${v} activos)`}),l("p",{class:"u-caption u-muted",text:g.hint})]),_.length?l("div",{class:"ban-grid"},_.map(u)):l("div",{class:"state"},[l("div",{class:"state__msg",text:"Sin banners en esta ubicación."})])])}function f(){ue(i);const p=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nuevo banner"}):null;if(p&&p.addEventListener("click",()=>a(null)),i.append(l("div",{class:"rev-head"},[l("span",{class:"u-caption u-muted",text:"Lo que ves aquí es lo que la web muestra — los cambios aplican al instante."}),p])),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando banners…"})]));return}i.append(d("promocional"),d("home_promo"))}return j.get().mock?(e.banners=pN.map(p=>({...p})),e.loaded=!0,f()):(f(),e.sub=lN(p=>{e.banners=p,e.loaded=!0,f()},()=>B("No se pudieron cargar los banners.","error"))),function(){e.sub&&e.sub(),e.sub=null}}const Go={};["Audi","BMW","Chevrolet","FIAT","Ford","Honda","Hyundai","Jeep","Kia","Mazda","Mitsubishi","Nissan","Renault","Suzuki","Toyota","Volkswagen"].forEach(n=>{Go[n.toLowerCase()]="multimedia/Logos/"+n+".webp"});Go.fiat="multimedia/Logos/FIAT.webp";function zy(n){return n?(n.indexOf("multimedia/Logo/")===0&&(n=n.replace("multimedia/Logo/","multimedia/Logos/")),n.indexOf("multimedia/Logos/")>=0&&/\.png$/i.test(n)&&(n=n.replace(/\.png$/i,".webp")),n):""}function gm(n){const e=zy(n.logo);if(e&&e.indexOf("http")===0)return e;if(e&&e.indexOf("multimedia/Logos/")>=0&&/\.webp$/i.test(e))return"/"+e.replace(/^\//,"");const t=Go[n.id]||Go[(n.nombre||"").toLowerCase()];return t?"/"+t:e||""}function ts(n){return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")}function gN(n,e){const t=Qe(Ie(ee,"marcas"),ct("nombre","asc"));return $t(t,r=>{n(r.docs.map(s=>({...s.data(),_docId:s.id})))},r=>e&&e(r))}async function _N(){const n=await Nt(Ie(ee,"vehiculos")),e={};return n.forEach(t=>{const r=t.data().marca;r&&(e[r]=(e[r]||0)+1)}),e}async function vN(n,e){if(!["image/jpeg","image/png","image/webp","image/svg+xml"].includes(n.type))throw new Error("Formato no válido. Usa JPG, PNG, WebP o SVG.");const r=n.name.replace(/[^a-zA-Z0-9._-]/g,"_").replace(/\.[^.]+$/,"");let s=n,i="svg";n.type!=="image/svg+xml"&&(e&&e("Comprimiendo a WebP…"),s=await jy(n,{maxWidth:512,quality:.9}),i="webp"),e&&e("Subiendo logo…");const a="cars/brand_logo_"+Date.now()+"_"+r+"."+i,c=await ay(Dd(Vd,a),s,{contentType:i==="svg"?"image/svg+xml":"image/webp"});return oy(c.ref)}async function yN(n,e,t){const r=!!n,s=r?n:ts(e.nombre);if(!s)throw new Error("Nombre inválido.");const i={id:s,nombre:e.nombre,descripcion:e.nombre,logo:zy(e.logo||""),updatedAt:new Date().toISOString(),updatedBy:e._userEmail||"unknown",_type:"marca",_version:r?(t&&t._version||0)+1:1};return r?(await Xe(be(ee,"marcas",s),i),Dt("brand_update","marca "+s,i.nombre)):(await Ac(be(ee,"marcas",s),i),Dt("brand_create","marca "+s,i.nombre)),s}async function bN(n){await bd(be(ee,"marcas",n._docId)),Dt("brand_delete","marca "+n._docId,"")}const wN=[{_docId:"chevrolet",id:"chevrolet",nombre:"Chevrolet",descripcion:"Chevrolet",logo:"multimedia/Logos/Chevrolet.webp",_version:3},{_docId:"mazda",id:"mazda",nombre:"Mazda",descripcion:"Mazda",logo:"multimedia/Logos/Mazda.webp",_version:1},{_docId:"renault",id:"renault",nombre:"Renault",descripcion:"Renault",logo:"",_version:1}],IN={chevrolet:9,mazda:5,renault:0};function EN(n){const e={brands:[],counts:{},sub:null,loaded:!1},t=Le("brands.create"),r=Le("brands.edit"),s=Le("brands.delete"),i=l("section",{class:"brd"});ue(n),n.append(i);function a(f){const p=!!f;let g=f&&f.logo||"";const _=l("input",{class:"input",type:"text",maxlength:"40",placeholder:"Nombre de la marca *"}),v=l("span",{class:"u-caption u-faint",text:p?"ID: "+f.id+" (fijo)":"ID: —"});p?_.value=f.nombre||"":_.addEventListener("input",()=>{v.textContent="ID: "+(ts(_.value)||"—")});const S=l("input",{type:"file",accept:"image/jpeg,image/png,image/webp,image/svg+xml",class:"ban-file"}),T=l("div",{class:"ban-drop brd-drop"}),D=l("span",{class:"u-caption u-muted",text:""});function k(){ue(T);const E=g?gm({id:p?f.id:ts(_.value),nombre:_.value,logo:g}):"";E&&E!=="data:demo"?T.append(l("img",{src:E,alt:"Logo",class:"brd-drop__img"}),l("span",{class:"u-caption u-muted",text:"Click para cambiar el logo"})):g==="data:demo"?T.append(l("span",{text:"🏷️ (demo)"})):T.append(l("span",{text:"🏷️"}),l("span",{class:"u-caption u-muted",text:"Click para subir logo (JPG/PNG/WebP/SVG → WebP 512px)"}))}k(),T.addEventListener("click",()=>S.click()),S.addEventListener("change",async()=>{const E=S.files&&S.files[0];if(S.value="",!!E){if(j.get().mock){g="data:demo",k(),B("Logo simulado (demo)","ok");return}try{g=await vN(E,y=>{D.textContent=y}),D.textContent="✓ Logo subido",k()}catch(y){D.textContent="",B(y.message||"No se pudo subir el logo.","error")}}});const x=l("button",{class:"btn btn--gold",type:"button",text:p?"Guardar cambios":"Crear marca"}),L=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),C=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"dialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:p?"Editar marca: "+f.nombre:"Nueva marca"}),T,S,D,l("label",{class:"field"},[l("span",{class:"field__label",text:"Nombre *"}),_,v]),l("div",{class:"rev-modal__actions"},[L,x])])]),M=()=>C.remove();L.addEventListener("click",M),C.addEventListener("click",E=>{E.target===C&&M()}),x.addEventListener("click",async()=>{const E=_.value.trim();if(!E){B("El nombre es obligatorio.","error");return}if(!p&&e.brands.some(w=>w.id===ts(E))){B("Ya existe una marca con ese ID ("+ts(E)+").","error");return}const y={nombre:E,logo:g,_userEmail:j.get().user&&j.get().user.email||"unknown"};if(j.get().mock){if(p){const w=e.brands.findIndex(R=>R._docId===f._docId);w>=0&&(e.brands[w]={...e.brands[w],nombre:E,logo:g,_version:(e.brands[w]._version||0)+1})}else{const w=ts(E);e.brands.push({_docId:w,id:w,nombre:E,logo:g,_version:1}),e.brands.sort((R,I)=>R.nombre.localeCompare(I.nombre))}d(),M(),B(p?"Marca actualizada (demo)":"Marca creada (demo)","ok");return}x.disabled=!0,x.textContent="Guardando…";try{await yN(p?f._docId:null,y,f),M(),B(p?"✓ Marca actualizada":"✓ Marca creada","ok")}catch(w){x.disabled=!1,x.textContent=p?"Guardar cambios":"Crear marca",B("No se pudo guardar: "+(w.message||w.code),"error")}}),document.body.append(C),_.focus()}function c(f){const p=e.counts[f.id]||0,g=l("button",{class:"btn btn--danger",type:"button",text:"Eliminar definitivamente"}),_=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),v=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:'¿Eliminar la marca "'+f.nombre+'"?'}),p>0?l("p",{class:"u-caption brd-warn",text:`⚠️ Hay ${p} vehículo(s) con esta marca — sus filtros y página de marca quedarían huérfanos. Reasigna o vende esos vehículos antes de borrar.`}):l("p",{class:"u-caption u-muted",text:"Sin vehículos asociados. Desaparece de los filtros públicos al instante."}),l("div",{class:"rev-modal__actions"},[_,g])])]),S=()=>v.remove();_.addEventListener("click",S),v.addEventListener("click",T=>{T.target===v&&S()}),g.addEventListener("click",async()=>{if(j.get().mock){e.brands=e.brands.filter(T=>T._docId!==f._docId),d(),S(),B("Marca eliminada (demo)","ok");return}g.disabled=!0;try{await bN(f),S(),B("✓ Marca eliminada","ok")}catch(T){g.disabled=!1,B("No se pudo eliminar: "+(T.message||T.code),"error")}}),document.body.append(v)}function u(f){const p=e.counts[f.id]||0,g=gm(f),_=[];if(r){const v=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"✏️","aria-label":"Editar"});v.addEventListener("click",()=>a(f)),_.push(v)}if(s){const v=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑","aria-label":"Eliminar"});v.addEventListener("click",()=>c(f)),_.push(v)}return l("article",{class:"brd-card"},[l("div",{class:"brd-card__logo"},[g&&g!=="data:demo"?l("img",{src:g,alt:"",loading:"lazy"}):l("span",{class:"u-caption u-faint",text:"Sin logo"})]),l("strong",{class:"u-truncate",text:f.nombre}),l("span",{class:"u-caption u-muted",text:p+(p===1?" vehículo":" vehículos")}),_.length?l("div",{class:"brd-card__actions"},_):null])}function d(){ue(i);const f=t?l("button",{class:"btn btn--gold btn--sm",type:"button",text:"＋ Nueva marca"}):null;if(f&&f.addEventListener("click",()=>a(null)),i.append(l("div",{class:"rev-head"},[l("span",{class:"u-caption u-muted",text:e.brands.length+" marcas — alimentan los filtros y páginas de marca del sitio."}),f])),!e.loaded){i.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando marcas…"})]));return}if(!e.brands.length){i.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🏷️"}),l("div",{class:"state__title",text:"Sin marcas"})]));return}i.append(l("div",{class:"brd-grid"},e.brands.map(u)))}return j.get().mock?(e.brands=wN.map(f=>({...f})),e.counts={...IN},e.loaded=!0,d()):(d(),e.sub=gN(f=>{e.brands=f,e.loaded=!0,d()},()=>B("No se pudieron cargar las marcas.","error")),_N().then(f=>{e.counts=f,e.loaded&&d()}).catch(()=>{})),function(){e.sub&&e.sub(),e.sub=null}}const TN=["settings.theme","settings.seo","settings.backup"],qd=[{key:"tipos",title:"Tipos de vehículo",desc:"Nuevo, Usado, etc.",field:"tipo"},{key:"categorias",title:"Categorías",desc:"Sedan, SUV, Pickup, etc.",field:"categoria"},{key:"transmisiones",title:"Transmisiones",desc:"Automática, Mecánica, etc.",field:"transmision"},{key:"combustibles",title:"Combustibles",desc:"Gasolina, Diesel, Eléctrico, etc.",field:"combustible"},{key:"direcciones",title:"Direcciones",desc:"Eléctrica, Hidráulica, etc.",field:"direccion"},{key:"tracciones",title:"Tracciones",desc:"Delantera, 4x4, AWD, etc.",field:"traccion"},{key:"colores",title:"Colores",desc:"Blanco, Negro, Rojo, etc.",field:"color"},{key:"canalesVenta",title:"Canales de venta",desc:"Presencial, WhatsApp, Redes — los usa el CRM al registrar ventas.",field:null},{key:"featSeguridad",title:"Características: Seguridad",desc:"ABS, Airbags, Alarma, etc.",field:"caracteristicas"},{key:"featConfort",title:"Características: Confort",desc:"Aire acondicionado, Asientos cuero, etc.",field:"caracteristicas"},{key:"featTecnologia",title:"Características: Tecnología",desc:"Pantalla táctil, Bluetooth, etc.",field:"caracteristicas"},{key:"featExterior",title:"Características: Exterior",desc:"Luces LED, Rines aluminio, etc.",field:"caracteristicas"},{key:"featInterior",title:"Características: Interior",desc:"Vidrios eléctricos, Tapizado, etc.",field:"caracteristicas"}],Gy={tipos:[{value:"nuevo",label:"Nuevo"},{value:"usado",label:"Usado"}],categorias:[{value:"sedan",label:"Sedan"},{value:"suv",label:"SUV"},{value:"hatchback",label:"Hatchback"},{value:"pickup",label:"Pickup"}],transmisiones:[{value:"automatica",label:"Automatica"},{value:"mecanica",label:"Mecanica"}],combustibles:[{value:"gasolina",label:"Gasolina"},{value:"diesel",label:"Diesel"},{value:"electrico",label:"Electrico"},{value:"hibrido",label:"Hibrido"}],direcciones:[{value:"Electrica",label:"Electrica"},{value:"Hidraulica",label:"Hidraulica"},{value:"Mecanica",label:"Mecanica"},{value:"Electrohidraulica",label:"Electrohidraulica"}],tracciones:[{value:"Delantera",label:"Delantera"},{value:"Trasera",label:"Trasera"},{value:"4x4",label:"4x4"},{value:"AWD",label:"AWD"}],colores:[{value:"Blanco",label:"Blanco"},{value:"Negro",label:"Negro"},{value:"Gris",label:"Gris"},{value:"Plata",label:"Plata"},{value:"Rojo",label:"Rojo"},{value:"Azul",label:"Azul"},{value:"Verde",label:"Verde"},{value:"Beige",label:"Beige"}],canalesVenta:[{value:"presencial",label:"Visita presencial"},{value:"whatsapp",label:"WhatsApp"},{value:"redes",label:"Redes sociales"},{value:"referido",label:"Referido"},{value:"otro",label:"Otro"}],featSeguridad:[{value:"Sistema de frenos ABS",label:"ABS"},{value:"Airbags frontales",label:"Airbags frontales"},{value:"Airbags laterales",label:"Airbags laterales"},{value:"Alarma",label:"Alarma"},{value:"Bloqueo central",label:"Bloqueo central"},{value:"Control de estabilidad",label:"Control estabilidad"},{value:"Control de traccion",label:"Control traccion"},{value:"Sensor de reversa",label:"Sensor reversa"},{value:"Camara de reversa",label:"Camara reversa"},{value:"Camara 360",label:"Camara 360"}],featConfort:[{value:"Aire acondicionado",label:"Aire acondicionado"},{value:"Climatizador automatico",label:"Climatizador auto"},{value:"Asientos en cuero",label:"Asientos en cuero"},{value:"Asientos calefactados",label:"Asientos calefactados"},{value:"Asiento electrico",label:"Asiento electrico"},{value:"Volante multifuncional",label:"Volante multifuncional"},{value:"Tapizado en cuero",label:"Tapizado en cuero"},{value:"Techo panoramico",label:"Techo panoramico"}],featTecnologia:[{value:"Pantalla tactil",label:"Pantalla tactil"},{value:"Bluetooth",label:"Bluetooth"},{value:"USB / Auxiliar",label:"USB / Auxiliar"},{value:"Android Auto",label:"Android Auto"},{value:"Apple CarPlay",label:"Apple CarPlay"},{value:"GPS / Navegacion",label:"GPS / Navegacion"},{value:"Radio AM/FM",label:"Radio AM/FM"},{value:"Computador de viaje",label:"Computador de viaje"},{value:"Keyless entry",label:"Keyless entry"},{value:"Boton de encendido",label:"Boton de encendido"}],featExterior:[{value:"Luces LED",label:"Luces LED"},{value:"Luces DRL",label:"Luces DRL"},{value:"Rines de aluminio",label:"Rines de aluminio"},{value:"Barras de techo",label:"Barras de techo"},{value:"Exploradoras",label:"Exploradoras"},{value:"Espejos electricos",label:"Espejos electricos"}],featInterior:[{value:"Vidrios electricos",label:"Vidrios electricos"},{value:"Cierre centralizado",label:"Cierre centralizado"},{value:"Tablero digital",label:"Tablero digital"},{value:"Guantera refrigerada",label:"Guantera refrigerada"},{value:"Apoyabrazos central",label:"Apoyabrazos central"}]};async function AN(){const n=await Hn(be(ee,"config","listas")),e=n.exists()?n.data():{},t={};return qd.forEach(({key:r})=>{const s=Array.isArray(e[r])&&e[r].length?e[r]:Gy[r];t[r]=s.map(i=>typeof i=="string"?{value:i,label:i}:{value:i.value,label:i.label||i.value})}),t}async function SN(n,e,t){await Ac(be(ee,"config","listas"),{[n]:e,updatedAt:new Date().toISOString(),updatedBy:t},{merge:!0}),Dt("list_update","lista "+n,e.length+" opciones")}async function RN(){const n=await Nt(Ie(ee,"vehiculos")),e={};qd.forEach(r=>{r.field&&r.field!=="caracteristicas"&&(e[r.field]={})});const t={};return n.forEach(r=>{const s=r.data();Object.keys(e).forEach(i=>{s[i]&&(e[i][s[i]]=(e[i][s[i]]||0)+1)}),(Array.isArray(s.caracteristicas)?s.caracteristicas:[]).forEach(i=>{t[i]=(t[i]||0)+1})}),{fields:e,features:t}}function _m(n,e,t){return!n.field||!e?0:n.field==="caracteristicas"?e.features[t]||0:e.fields[n.field]&&e.fields[n.field][t]||0}const kN=(()=>{const n=JSON.parse(JSON.stringify(Gy));return n.transmisiones.push({value:"triptonica",label:"Triptónica"}),n})(),CN={fields:{tipo:{usado:7,nuevo:2},categoria:{suv:4,sedan:3,pickup:2},transmision:{automatica:6,mecanica:3},combustible:{gasolina:8,hibrido:1},direccion:{Electrica:5,Hidraulica:4},traccion:{Delantera:6,"4x4":3},color:{Blanco:3,Negro:3,Gris:2,Rojo:1}},features:{"Aire acondicionado":8,Bluetooth:7,"Camara de reversa":5,"Luces LED":6,"Vidrios electricos":9}};function xN(n){const e={lists:null,counts:null,loaded:!1},t=TN.some(Le),r=l("section",{class:"lst"});if(ue(n),n.append(r),!t){r.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔒"}),l("div",{class:"state__title",text:"Sin permiso"}),l("div",{class:"state__msg",text:"Solo quien administra el sitio (permisos settings.*) puede editar los atributos del inventario."})]));return}function s(d,f,p){const g=l("input",{class:"input",type:"text",value:f?f.value:"",placeholder:"Valor (ej: hibrido)"}),_=l("input",{class:"input",type:"text",value:f?f.label:"",placeholder:"Etiqueta (ej: Híbrido)"}),v=f?_m(d,e.counts,f.value):0,S=v>0?l("span",{class:"lst-row__use u-caption u-faint",text:v+" veh."}):null,T=l("button",{class:"lst-row__x",type:"button","aria-label":"Quitar opción",text:"✕"}),D=l("div",{class:"lst-row"},[g,_,S,T]);return g.addEventListener("input",p),_.addEventListener("input",p),T.addEventListener("click",()=>{D.remove(),p()}),D}function i(d,f){const p=l("button",{class:"btn btn--danger",type:"button",text:"Guardar de todas formas"}),g=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),_=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Quitar opciones que el inventario usa?"}),l("p",{class:"u-caption lst-warn",text:"⚠️ Estas opciones siguen asignadas a vehículos publicados — al quitarlas, esos vehículos quedan con un valor que ya no existe en los filtros de la web:"}),l("ul",{class:"lst-warn__list"},d.map(S=>l("li",{class:"u-caption",text:`${S.label||S.value} — ${S.n} vehículo(s)`}))),l("div",{class:"rev-modal__actions"},[g,p])])]),v=()=>_.remove();g.addEventListener("click",v),_.addEventListener("click",S=>{S.target===_&&v()}),p.addEventListener("click",()=>{v(),f()}),document.body.append(_)}function a(d){const f=e.lists[d.key],p=l("div",{class:"lst-rows"}),g=l("span",{class:"lst-dirty u-caption",text:"● sin guardar"}),_=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar",disabled:!0});function v(){_.disabled=!1,g.classList.add("is-on")}f.forEach(x=>p.append(s(d,x,v)));const S=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"＋ Agregar opción"});S.addEventListener("click",()=>{const x=s(d,null,v);p.append(x),x.querySelector("input").focus()});function T(){const x=[];for(const L of p.children){const[C,M]=L.querySelectorAll("input"),E=C.value.trim(),y=M.value.trim();if(!(!E&&!y)){if(!E)return B("Hay una opción sin valor — complétala o quítala.","error"),C.focus(),null;if(x.some(w=>w.value===E))return B(`Valor duplicado: "${E}".`,"error"),C.focus(),null;x.push({value:E,label:y||E})}}return x.length?x:(B("La lista no puede quedar vacía — la web volvería a los valores de fábrica.","error"),null)}async function D(x){if(j.get().mock){e.lists[d.key]=x,c(d),B(`Lista "${d.title}" guardada (demo)`,"ok");return}_.disabled=!0,_.textContent="Guardando…";try{await SN(d.key,x,j.get().user&&j.get().user.email||"unknown"),e.lists[d.key]=x,c(d),B(`✓ Lista "${d.title}" guardada`,"ok")}catch(L){_.disabled=!1,_.textContent="Guardar",B("No se pudo guardar: "+(L.message||L.code),"error")}}return _.addEventListener("click",()=>{const x=T();if(!x)return;const L=e.lists[d.key].filter(C=>x.every(M=>M.value!==C.value)).map(C=>({...C,n:_m(d,e.counts,C.value)})).filter(C=>C.n>0);L.length?i(L,()=>D(x)):D(x)}),l("div",{class:"cfg-card lst-card"},[l("div",{class:"lst-card__head"},[l("h3",{class:"cfg-card__title",text:d.title}),g]),l("p",{class:"u-caption u-muted",text:d.desc}),p,l("div",{class:"lst-card__foot"},[S,_])])}function c(d){const f=a(d);f.dataset.list=d.key;const p=r.querySelector(`[data-list="${d.key}"]`);p&&p.replaceWith(f)}function u(){if(ue(r),r.append(l("div",{class:"rev-head"},[l("span",{class:"u-caption u-muted",text:"13 listas alimentan el formulario de vehículos, los filtros públicos de la web y el CRM. Cada lista se guarda por separado; la web recoge el cambio en ≤5 min sin tocar nada."})])),!e.loaded){r.append(l("div",{class:"state"},[l("div",{class:"state__msg",text:"Cargando atributos…"})]));return}r.append(l("div",{class:"lst-grid"},qd.map(d=>{const f=a(d);return f.dataset.list=d.key,f})))}j.get().mock?(e.lists=JSON.parse(JSON.stringify(kN)),e.counts=CN,e.loaded=!0,u()):(u(),Promise.all([AN(),RN().catch(()=>null)]).then(([d,f])=>{e.lists=d,e.counts=f,e.loaded=!0,u()}).catch(()=>B("No se pudieron cargar los atributos.","error")))}function PN(n){return"crm-backups/daily/"+n+"/export.json.gz"}async function NN(){const e=await en(tn,"crmExport")({});return Dt("backup_export",e.data&&e.data.path,JSON.stringify(e.data&&e.data.counts||{})),e.data}async function DN(n){return(await en(tn,"crmRestore")({path:n,dryRun:!0})).data}async function VN(n,e){const r=await en(tn,"crmRestore")({path:n,dryRun:!1,collections:e&&e.length?e:null});return Dt("backup_restore",n,(e||[]).join(",")||"todas"),r.data}const ON={ok:!0,path:"crm-backups/2026-06-12T13-00-00-000Z/export.json.gz",counts:{contacts:42,leads:12,deals:9,activities:130,solicitudes:25,subscriptions:8,vehiculos:11,marcas:18},capped:[],bytes:48211},vm={exportedAt:"2026-06-12T10:00:00.000Z",plan:{contacts:{total:42,toCreate:0,toOverwrite:42,currentNotInBackup:1},leads:{total:12,toCreate:1,toOverwrite:11,currentNotInBackup:0},deals:{total:9,toCreate:0,toOverwrite:9,currentNotInBackup:0},activities:{total:130,toCreate:4,toOverwrite:126,currentNotInBackup:2},solicitudes:{total:25,toCreate:0,toOverwrite:25,currentNotInBackup:0},subscriptions:{total:8,toCreate:0,toOverwrite:8,currentNotInBackup:0},vehiculos:{total:11,toCreate:2,toOverwrite:9,currentNotInBackup:0},marcas:{total:18,toCreate:0,toOverwrite:18,currentNotInBackup:0}}},ym=()=>{const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function LN(n){const e={lastExport:null,path:"",plan:null,exportedAt:null,restored:null},t=l("section",{class:"bak"});if(ue(n),n.append(t),!Le("settings.backup")){t.append(l("div",{class:"state"},[l("div",{class:"state__icon",text:"🔒"}),l("div",{class:"state__title",text:"Sin permiso"}),l("div",{class:"state__msg",text:"Solo quien administra los respaldos (permiso settings.backup) puede ver esto. El servidor además exige Super Admin para ejecutarlos."})]));return}function r(d){return l("div",{class:"bak-counts"},Object.entries(d).map(([f,p])=>l("span",{class:"bak-pill u-caption",text:`${f}: ${p}`})))}function s(){const d=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Crear respaldo ahora"}),f=l("div",{class:"bak-out"});return e.lastExport&&f.append(l("p",{class:"u-caption",text:"✓ Respaldo creado ("+Math.round(e.lastExport.bytes/1024)+" KB). Guarda este path para restaurarlo:"}),l("code",{class:"bak-path",text:e.lastExport.path}),r(e.lastExport.counts),e.lastExport.capped&&e.lastExport.capped.length?l("p",{class:"u-caption lst-warn",text:"⚠️ Colecciones al tope de 5000 docs (export incompleto): "+e.lastExport.capped.join(", ")}):null),d.addEventListener("click",async()=>{if(j.get().mock){e.lastExport=ON,u(),B("Respaldo creado (demo)","ok");return}d.disabled=!0,d.textContent="Exportando…";try{e.lastExport=await NN(),u(),B("✓ Respaldo creado","ok")}catch(p){d.disabled=!1,d.textContent="Crear respaldo ahora",B("No se pudo exportar: "+(p.message||p.code),"error")}}),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"💾 Crear respaldo ahora"}),l("p",{class:"u-caption u-muted",text:"Cada madrugada (5:00 am) el sistema respalda solo el CRM y el inventario (vehículos y marcas incluidos) a almacenamiento privado. Este botón crea uno EXTRA ya mismo — hazlo antes de cualquier operación delicada."}),d,f])}function i(){const d=l("input",{class:"input",type:"date",max:ym(),value:ym()}),f=l("button",{class:"btn btn--soft btn--sm",type:"button",text:"Usar el diario de esa fecha"}),p=l("input",{class:"input bak-path-in",type:"text",placeholder:"crm-backups/…/export.json.gz",value:e.path}),g=l("button",{class:"btn btn--gold btn--sm",type:"button",text:"Ver plan (simulacro — no escribe nada)"}),_=l("div",{class:"bak-out"});return f.addEventListener("click",()=>{if(!d.value){B("Elige una fecha.","error");return}p.value=PN(d.value)}),g.addEventListener("click",async()=>{const v=p.value.trim();if(v.indexOf("crm-backups/")!==0){B("El path debe empezar con crm-backups/…","error");return}if(e.path=v,e.restored=null,j.get().mock){e.plan=vm.plan,e.exportedAt=vm.exportedAt,u(),B("Plan calculado (demo)","ok");return}g.disabled=!0,g.textContent="Calculando plan…";try{const S=await DN(v);e.plan=S.plan,e.exportedAt=S.exportedAt,u()}catch(S){g.disabled=!1,g.textContent="Ver plan (simulacro — no escribe nada)",B("No se pudo leer el respaldo: "+(S.message||S.code),"error")}}),e.plan&&_.append(a()),e.restored&&_.append(l("p",{class:"u-caption",text:"✓ Restauración completada:"}),r(e.restored)),l("div",{class:"cfg-card"},[l("h3",{class:"cfg-card__title",text:"♻️ Restaurar desde un respaldo"}),l("p",{class:"u-caption u-muted",text:"Paso 1: pega el path de un respaldo (o usa el diario por fecha). Paso 2: revisa el plan. Solo entonces puedes restaurar. No borra docs que el respaldo no conozca."}),l("div",{class:"cfg-row"},[d,f]),l("div",{class:"cfg-row bak-row-path"},[p,g]),_])}function a(){const d={},f=Object.entries(e.plan).map(([g,_])=>{const v=l("input",{type:"checkbox"});return v.checked=!0,d[g]=v,l("label",{class:"bak-plan__row"},[v,l("strong",{class:"bak-plan__col",text:g}),l("span",{class:"u-caption u-muted",text:`${_.total} en respaldo · ${_.toCreate} nuevos · ${_.toOverwrite} se sobrescriben · ${_.currentNotInBackup} actuales fuera del respaldo (quedan)`})])}),p=l("button",{class:"btn btn--danger btn--sm",type:"button",text:"Restaurar seleccionadas…"});return p.addEventListener("click",()=>{const g=Object.entries(d).filter(([,_])=>_.checked).map(([_])=>_);if(!g.length){B("Selecciona al menos una colección.","error");return}c(g)}),l("div",{class:"bak-plan"},[l("p",{class:"u-caption",text:`Plan del respaldo del ${e.exportedAt} (simulacro — nada escrito aún):`}),...f,l("p",{class:"u-caption u-faint",text:"Si restauras TODAS, también se restauran los docs de configuración (cupos, disponibilidad, calendario y listas de atributos)."}),p])}function c(d){const f=d.length===Object.keys(e.plan).length,p=d.reduce((T,D)=>T+(e.plan[D]?e.plan[D].toOverwrite:0),0),g=l("button",{class:"btn btn--danger",type:"button",text:"Sí, restaurar"}),_=l("button",{class:"btn btn--soft",type:"button",text:"Cancelar"}),v=l("div",{class:"rev-modal__overlay"},[l("div",{class:"rev-modal rev-modal--sm",role:"alertdialog","aria-modal":"true"},[l("h3",{class:"rev-modal__title",text:"¿Restaurar "+(f?"TODO el respaldo":d.join(", "))+"?"}),l("p",{class:"u-caption lst-warn",text:`⚠️ Se sobrescriben ${p} documento(s) con la versión del ${e.exportedAt}. Lo editado después de esa hora EN ESAS COLECCIONES se pierde.`}),f?l("p",{class:"u-caption u-muted",text:"Incluye los docs de configuración (cupos, disponibilidad, calendario, listas)."}):null,l("div",{class:"rev-modal__actions"},[_,g])])]),S=()=>v.remove();_.addEventListener("click",S),v.addEventListener("click",T=>{T.target===v&&S()}),g.addEventListener("click",async()=>{if(j.get().mock){e.restored=Object.fromEntries(d.map(T=>[T,e.plan[T].total])),e.plan=null,S(),u(),B("Restauración simulada (demo)","ok");return}g.disabled=!0,g.textContent="Restaurando…";try{const T=await VN(e.path,f?null:d);e.restored=T.restored,e.plan=null,S(),u(),B("✓ Restauración completada","ok")}catch(T){g.disabled=!1,g.textContent="Sí, restaurar",B("No se pudo restaurar: "+(T.message||T.code),"error")}}),document.body.append(v)}function u(){ue(t),t.append(l("div",{class:"rev-head"},[l("span",{class:"u-caption u-muted",text:"Red de seguridad del CRM y el inventario. El servidor exige Super Admin; el restore siempre pasa por un simulacro primero."})])),t.append(l("div",{class:"cfg-cols"},[s(),i()]))}u()}const Hy=document.getElementById("app");Ib();const MN=new URLSearchParams(location.search).get("mock")==="1",FN={bandeja:ky,pipeline:Kx,agenda:dP,reportes:kP,contactos:zP,config:tN,resenas:cN,banners:mN,marcas:EN,atributos:xN,respaldos:LN};let ja=null,ds=null,mr=null,du=null,lo=null;function bm(n){if(!ds||n===du)return;mr&&(mr(),mr=null),j.get().detailLeadId&&j.set({detailLeadId:null}),mr=(FN[n]||ky)(ds.outlet)||null,ds.setActive(n),du=n}function UN(){ds=kC(Hy),WP(ds.detailRoot),bm(cy()),lo=IC(bm)}function BN(){mr&&(mr(),mr=null),lo&&(lo(),lo=null),ds=null,du=null}function $N(n){n.ready&&(n.user&&ja!=="app"?(ja="app",UN()):!n.user&&ja!=="login"&&(BN(),ja="login",n.detailLeadId&&j.set({detailLeadId:null}),CC(Hy)))}j.subscribe($N);MN?j.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):mC();
