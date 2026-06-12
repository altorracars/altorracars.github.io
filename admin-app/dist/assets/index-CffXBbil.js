(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function cy(n){let e={...n};const t=new Set;function r(){return e}function s(o){const c=typeof o=="function"?o(e):o;c&&(e={...e,...c},t.forEach(l=>l(e)))}function i(o){return t.add(o),()=>t.delete(o)}return{get:r,set:s,subscribe:i}}const H=cy({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),Pp="altorra-crm-theme";function ly(){let n=localStorage.getItem(Pp);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,H.set({theme:n})}function uy(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(Pp,n),H.set({theme:n}),n}var oh={};/**
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
 */const kp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},dy=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Ul={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,p=i>>2,m=(i&3)<<4|c>>4;let g=(c&15)<<2|h>>6,T=h&63;l||(T=64,o||(g=64)),r.push(t[p],t[m],t[g],t[T])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(kp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):dy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new hy;const g=i<<2|c>>4;if(r.push(g),h!==64){const T=c<<4&240|h>>2;if(r.push(T),m!==64){const R=h<<6&192|m;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class hy extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const fy=function(n){const e=kp(n);return Ul.encodeByteArray(e,!0)},xp=function(n){return fy(n).replace(/\./g,"")},Np=function(n){try{return Ul.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Dp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const py=()=>Dp().__FIREBASE_DEFAULTS__,my=()=>{if(typeof process>"u"||typeof oh>"u")return;const n=oh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},gy=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Np(n[1]);return e&&JSON.parse(e)},Ca=()=>{try{return py()||my()||gy()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Vp=n=>{var e,t;return(t=(e=Ca())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},_y=n=>{const e=Vp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Op=()=>{var n;return(n=Ca())===null||n===void 0?void 0:n.config},Lp=n=>{var e;return(e=Ca())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class li{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function je(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function vy(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(je())}function yy(){var n;const e=(n=Ca())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function by(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function wy(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Iy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ey(){const n=je();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Mp(){return!yy()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Pa(){try{return typeof indexedDB=="object"}catch{return!1}}function Ty(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const Ay="FirebaseError";class $t extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Ay,Object.setPrototypeOf(this,$t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ys.prototype.create)}}class ys{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Sy(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new $t(s,c,r)}}function Sy(n,e){return n.replace(Ry,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Ry=/\{\$([^}]+)}/g;function Cy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ui(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(ah(i)&&ah(o)){if(!ui(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function ah(n){return n!==null&&typeof n=="object"}/**
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
 */function Ni(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ks(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Ws(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Py(n,e){const t=new ky(n,e);return t.subscribe.bind(t)}class ky{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");xy(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Cc),s.error===void 0&&(s.error=Cc),s.complete===void 0&&(s.complete=Cc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function xy(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Cc(){}/**
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
 */const Ny=1e3,Dy=2,Vy=4*60*60*1e3,Oy=.5;function Ly(n,e=Ny,t=Dy){const r=e*Math.pow(t,n),s=Math.round(Oy*r*(Math.random()-.5)*2);return Math.min(Vy,r+s)}/**
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
 */function Re(n){return n&&n._delegate?n._delegate:n}class Ut{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Kn="[DEFAULT]";/**
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
 */class My{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new li;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Uy(e))try{this.getOrInitializeService({instanceIdentifier:Kn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Kn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Kn){return this.instances.has(e)}getOptions(e=Kn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Fy(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Kn){return this.component?this.component.multipleInstances?e:Kn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Fy(n){return n===Kn?void 0:n}function Uy(n){return n.instantiationMode==="EAGER"}/**
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
 */class By{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new My(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var me;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(me||(me={}));const $y={debug:me.DEBUG,verbose:me.VERBOSE,info:me.INFO,warn:me.WARN,error:me.ERROR,silent:me.SILENT},qy=me.INFO,jy={[me.DEBUG]:"log",[me.VERBOSE]:"log",[me.INFO]:"info",[me.WARN]:"warn",[me.ERROR]:"error"},zy=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=jy[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ka{constructor(e){this.name=e,this._logLevel=qy,this._logHandler=zy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in me))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?$y[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,me.DEBUG,...e),this._logHandler(this,me.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,me.VERBOSE,...e),this._logHandler(this,me.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,me.INFO,...e),this._logHandler(this,me.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,me.WARN,...e),this._logHandler(this,me.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,me.ERROR,...e),this._logHandler(this,me.ERROR,...e)}}const Gy=(n,e)=>e.some(t=>n instanceof t);let ch,lh;function Hy(){return ch||(ch=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ky(){return lh||(lh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Fp=new WeakMap,Wc=new WeakMap,Up=new WeakMap,Pc=new WeakMap,Bl=new WeakMap;function Wy(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(yn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Fp.set(t,n)}).catch(()=>{}),Bl.set(e,n),e}function Qy(n){if(Wc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Wc.set(n,e)}let Qc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Wc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Up.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return yn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Yy(n){Qc=n(Qc)}function Jy(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(kc(this),e,...t);return Up.set(r,e.sort?e.sort():[e]),yn(r)}:Ky().includes(n)?function(...e){return n.apply(kc(this),e),yn(Fp.get(this))}:function(...e){return yn(n.apply(kc(this),e))}}function Xy(n){return typeof n=="function"?Jy(n):(n instanceof IDBTransaction&&Qy(n),Gy(n,Hy())?new Proxy(n,Qc):n)}function yn(n){if(n instanceof IDBRequest)return Wy(n);if(Pc.has(n))return Pc.get(n);const e=Xy(n);return e!==n&&(Pc.set(n,e),Bl.set(e,n)),e}const kc=n=>Bl.get(n);function Zy(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=yn(o);return r&&o.addEventListener("upgradeneeded",l=>{r(yn(o.result),l.oldVersion,l.newVersion,yn(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const eb=["get","getKey","getAll","getAllKeys","count"],tb=["put","add","delete","clear"],xc=new Map;function uh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(xc.get(e))return xc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=tb.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||eb.includes(t)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return xc.set(e,i),i}Yy(n=>({...n,get:(e,t,r)=>uh(e,t)||n.get(e,t,r),has:(e,t)=>!!uh(e,t)||n.has(e,t)}));/**
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
 */class nb{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(rb(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function rb(n){const e=n.getComponent();return e?.type==="VERSION"}const Yc="@firebase/app",dh="0.11.0";/**
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
 */const Yt=new ka("@firebase/app"),sb="@firebase/app-compat",ib="@firebase/analytics-compat",ob="@firebase/analytics",ab="@firebase/app-check-compat",cb="@firebase/app-check",lb="@firebase/auth",ub="@firebase/auth-compat",db="@firebase/database",hb="@firebase/data-connect",fb="@firebase/database-compat",pb="@firebase/functions",mb="@firebase/functions-compat",gb="@firebase/installations",_b="@firebase/installations-compat",vb="@firebase/messaging",yb="@firebase/messaging-compat",bb="@firebase/performance",wb="@firebase/performance-compat",Ib="@firebase/remote-config",Eb="@firebase/remote-config-compat",Tb="@firebase/storage",Ab="@firebase/storage-compat",Sb="@firebase/firestore",Rb="@firebase/vertexai",Cb="@firebase/firestore-compat",Pb="firebase",kb="11.3.0";/**
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
 */const Jc="[DEFAULT]",xb={[Yc]:"fire-core",[sb]:"fire-core-compat",[ob]:"fire-analytics",[ib]:"fire-analytics-compat",[cb]:"fire-app-check",[ab]:"fire-app-check-compat",[lb]:"fire-auth",[ub]:"fire-auth-compat",[db]:"fire-rtdb",[hb]:"fire-data-connect",[fb]:"fire-rtdb-compat",[pb]:"fire-fn",[mb]:"fire-fn-compat",[gb]:"fire-iid",[_b]:"fire-iid-compat",[vb]:"fire-fcm",[yb]:"fire-fcm-compat",[bb]:"fire-perf",[wb]:"fire-perf-compat",[Ib]:"fire-rc",[Eb]:"fire-rc-compat",[Tb]:"fire-gcs",[Ab]:"fire-gcs-compat",[Sb]:"fire-fst",[Cb]:"fire-fst-compat",[Rb]:"fire-vertex","fire-js":"fire-js",[Pb]:"fire-js-all"};/**
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
 */const Ko=new Map,Nb=new Map,Xc=new Map;function hh(n,e){try{n.container.addComponent(e)}catch(t){Yt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Jt(n){const e=n.name;if(Xc.has(e))return Yt.debug(`There were multiple attempts to register component ${e}.`),!1;Xc.set(e,n);for(const t of Ko.values())hh(t,n);for(const t of Nb.values())hh(t,n);return!0}function bs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function wt(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Db={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},bn=new ys("app","Firebase",Db);/**
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
 */class Vb{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ut("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw bn.create("app-deleted",{appName:this._name})}}/**
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
 */const ws=kb;function Bp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Jc,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw bn.create("bad-app-name",{appName:String(s)});if(t||(t=Op()),!t)throw bn.create("no-options");const i=Ko.get(s);if(i){if(ui(t,i.options)&&ui(r,i.config))return i;throw bn.create("duplicate-app",{appName:s})}const o=new By(s);for(const l of Xc.values())o.addComponent(l);const c=new Vb(t,r,o);return Ko.set(s,c),c}function $l(n=Jc){const e=Ko.get(n);if(!e&&n===Jc&&Op())return Bp();if(!e)throw bn.create("no-app",{appName:n});return e}function Ct(n,e,t){var r;let s=(r=xb[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Yt.warn(c.join(" "));return}Jt(new Ut(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Ob="firebase-heartbeat-database",Lb=1,di="firebase-heartbeat-store";let Nc=null;function $p(){return Nc||(Nc=Zy(Ob,Lb,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(di)}catch(t){console.warn(t)}}}}).catch(n=>{throw bn.create("idb-open",{originalErrorMessage:n.message})})),Nc}async function Mb(n){try{const t=(await $p()).transaction(di),r=await t.objectStore(di).get(qp(n));return await t.done,r}catch(e){if(e instanceof $t)Yt.warn(e.message);else{const t=bn.create("idb-get",{originalErrorMessage:e?.message});Yt.warn(t.message)}}}async function fh(n,e){try{const r=(await $p()).transaction(di,"readwrite");await r.objectStore(di).put(e,qp(n)),await r.done}catch(t){if(t instanceof $t)Yt.warn(t.message);else{const r=bn.create("idb-set",{originalErrorMessage:t?.message});Yt.warn(r.message)}}}function qp(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Fb=1024,Ub=30;class Bb{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new qb(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ph();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Ub){const o=jb(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Yt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ph(),{heartbeatsToSend:r,unsentEntries:s}=$b(this._heartbeatsCache.heartbeats),i=xp(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Yt.warn(t),""}}}function ph(){return new Date().toISOString().substring(0,10)}function $b(n,e=Fb){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),mh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),mh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class qb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Pa()?Ty().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Mb(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return fh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return fh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function mh(n){return xp(JSON.stringify({version:2,heartbeats:n})).length}function jb(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function zb(n){Jt(new Ut("platform-logger",e=>new nb(e),"PRIVATE")),Jt(new Ut("heartbeat",e=>new Bb(e),"PRIVATE")),Ct(Yc,dh,n),Ct(Yc,dh,"esm2017"),Ct("fire-js","")}zb("");function ql(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function jp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Gb=jp,zp=new ys("auth","Firebase",jp());/**
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
 */const Wo=new ka("@firebase/auth");function Hb(n,...e){Wo.logLevel<=me.WARN&&Wo.warn(`Auth (${ws}): ${n}`,...e)}function Co(n,...e){Wo.logLevel<=me.ERROR&&Wo.error(`Auth (${ws}): ${n}`,...e)}/**
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
 */function xt(n,...e){throw jl(n,...e)}function Lt(n,...e){return jl(n,...e)}function Gp(n,e,t){const r=Object.assign(Object.assign({},Gb()),{[e]:t});return new ys("auth","Firebase",r).create(e,{appName:n.name})}function wn(n){return Gp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function jl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return zp.create(n,...e)}function oe(n,e,...t){if(!n)throw jl(e,...t)}function Ht(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Co(e),new Error(e)}function Xt(n,e){n||Ht(e)}/**
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
 */function Zc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Kb(){return gh()==="http:"||gh()==="https:"}function gh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Wb(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Kb()||wy()||"connection"in navigator)?navigator.onLine:!0}function Qb(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Di{constructor(e,t){this.shortDelay=e,this.longDelay=t,Xt(t>e,"Short delay should be less than long delay!"),this.isMobile=vy()||Iy()}get(){return Wb()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function zl(n,e){Xt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Hp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Yb={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Jb=new Di(3e4,6e4);function wr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Nn(n,e,t,r,s={}){return Kp(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Ni(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:l},i);return by()||(h.referrerPolicy="no-referrer"),Hp.fetch()(Wp(n,n.config.apiHost,t,c),h)})}async function Kp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Yb),e);try{const s=new Zb(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw uo(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw uo(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw uo(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw uo(n,"user-disabled",o);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Gp(n,p,h);xt(n,p)}}catch(s){if(s instanceof $t)throw s;xt(n,"network-request-failed",{message:String(s)})}}async function xa(n,e,t,r,s={}){const i=await Nn(n,e,t,r,s);return"mfaPendingCredential"in i&&xt(n,"multi-factor-auth-required",{_serverResponse:i}),i}function Wp(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?zl(n.config,s):`${n.config.apiScheme}://${s}`}function Xb(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Zb{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Lt(this.auth,"network-request-failed")),Jb.get())})}}function uo(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Lt(n,e,r);return s.customData._tokenResponse=t,s}function _h(n){return n!==void 0&&n.enterprise!==void 0}class ew{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Xb(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function tw(n,e){return Nn(n,"GET","/v2/recaptchaConfig",wr(n,e))}/**
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
 */async function nw(n,e){return Nn(n,"POST","/v1/accounts:delete",e)}async function Qp(n,e){return Nn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function ei(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function rw(n,e=!1){const t=Re(n),r=await t.getIdToken(e),s=Gl(r);oe(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:ei(Dc(s.auth_time)),issuedAtTime:ei(Dc(s.iat)),expirationTime:ei(Dc(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Dc(n){return Number(n)*1e3}function Gl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Co("JWT malformed, contained fewer than 3 sections"),null;try{const s=Np(t);return s?JSON.parse(s):(Co("Failed to decode base64 JWT payload"),null)}catch(s){return Co("Caught error parsing JWT payload as JSON",s?.toString()),null}}function vh(n){const e=Gl(n);return oe(e,"internal-error"),oe(typeof e.exp<"u","internal-error"),oe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function hi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof $t&&sw(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function sw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class iw{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class el{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ei(this.lastLoginAt),this.creationTime=ei(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Qo(n){var e;const t=n.auth,r=await n.getIdToken(),s=await hi(n,Qp(t,{idToken:r}));oe(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Yp(i.providerUserInfo):[],c=aw(n.providerData,o),l=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!c?.length,p=l?h:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new el(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(n,m)}async function ow(n){const e=Re(n);await Qo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function aw(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Yp(n){return n.map(e=>{var{providerId:t}=e,r=ql(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function cw(n,e){const t=await Kp(n,{},async()=>{const r=Ni({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=Wp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Hp.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function lw(n,e){return Nn(n,"POST","/v2/accounts:revokeToken",wr(n,e))}/**
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
 */class Hr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){oe(e.idToken,"internal-error"),oe(typeof e.idToken<"u","internal-error"),oe(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):vh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){oe(e.length!==0,"internal-error");const t=vh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(oe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await cw(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Hr;return r&&(oe(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(oe(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(oe(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Hr,this.toJSON())}_performRefresh(){return Ht("not implemented")}}/**
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
 */function cn(n,e){oe(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Kt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=ql(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new iw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new el(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await hi(this,this.stsTokenManager.getToken(this.auth,e));return oe(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return rw(this,e)}reload(){return ow(this)}_assign(e){this!==e&&(oe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Kt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){oe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Qo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(wt(this.auth.app))return Promise.reject(wn(this.auth));const e=await this.getIdToken();return await hi(this,nw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,c,l,h,p;const m=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,T=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,R=(o=t.photoURL)!==null&&o!==void 0?o:void 0,P=(c=t.tenantId)!==null&&c!==void 0?c:void 0,A=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,L=(h=t.createdAt)!==null&&h!==void 0?h:void 0,C=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:N,emailVerified:$,isAnonymous:k,providerData:U,stsTokenManager:I}=t;oe(N&&I,e,"internal-error");const v=Hr.fromJSON(this.name,I);oe(typeof N=="string",e,"internal-error"),cn(m,e.name),cn(g,e.name),oe(typeof $=="boolean",e,"internal-error"),oe(typeof k=="boolean",e,"internal-error"),cn(T,e.name),cn(R,e.name),cn(P,e.name),cn(A,e.name),cn(L,e.name),cn(C,e.name);const w=new Kt({uid:N,auth:e,email:g,emailVerified:$,displayName:m,isAnonymous:k,photoURL:R,phoneNumber:T,tenantId:P,stsTokenManager:v,createdAt:L,lastLoginAt:C});return U&&Array.isArray(U)&&(w.providerData=U.map(E=>Object.assign({},E))),A&&(w._redirectEventId=A),w}static async _fromIdTokenResponse(e,t,r=!1){const s=new Hr;s.updateFromServerResponse(t);const i=new Kt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Qo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];oe(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Yp(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Hr;c.updateFromIdToken(r);const l=new Kt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new el(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,h),l}}/**
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
 */const yh=new Map;function Wt(n){Xt(n instanceof Function,"Expected a class definition");let e=yh.get(n);return e?(Xt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,yh.set(n,e),e)}/**
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
 */class Jp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Jp.type="NONE";const bh=Jp;/**
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
 */function Po(n,e,t){return`firebase:${n}:${e}:${t}`}class Kr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Po(this.userKey,s.apiKey,i),this.fullPersistenceKey=Po("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Kt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Kr(Wt(bh),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Wt(bh);const o=Po(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const p=await h._get(o);if(p){const m=Kt._fromJSON(e,p);h!==i&&(c=m),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Kr(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Kr(i,e,r))}}/**
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
 */function wh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(tm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Xp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(rm(e))return"Blackberry";if(sm(e))return"Webos";if(Zp(e))return"Safari";if((e.includes("chrome/")||em(e))&&!e.includes("edge/"))return"Chrome";if(nm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Xp(n=je()){return/firefox\//i.test(n)}function Zp(n=je()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function em(n=je()){return/crios\//i.test(n)}function tm(n=je()){return/iemobile/i.test(n)}function nm(n=je()){return/android/i.test(n)}function rm(n=je()){return/blackberry/i.test(n)}function sm(n=je()){return/webos/i.test(n)}function Hl(n=je()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function uw(n=je()){var e;return Hl(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function dw(){return Ey()&&document.documentMode===10}function im(n=je()){return Hl(n)||nm(n)||sm(n)||rm(n)||/windows phone/i.test(n)||tm(n)}/**
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
 */function om(n,e=[]){let t;switch(n){case"Browser":t=wh(je());break;case"Worker":t=`${wh(je())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ws}/${r}`}/**
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
 */class hw{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function fw(n,e={}){return Nn(n,"GET","/v2/passwordPolicy",wr(n,e))}/**
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
 */const pw=6;class mw{constructor(e){var t,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:pw,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class gw{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ih(this),this.idTokenSubscription=new Ih(this),this.beforeStateQueue=new hw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=zp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Wt(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Kr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Qp(this,{idToken:e}),r=await Kt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(wt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&l?.user&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return oe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Qo(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Qb()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(wt(this.app))return Promise.reject(wn(this));const t=e?Re(e):null;return t&&oe(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&oe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return wt(this.app)?Promise.reject(wn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return wt(this.app)?Promise.reject(wn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Wt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await fw(this),t=new mw(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ys("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await lw(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Wt(e)||this._popupRedirectResolver;oe(t,this,"argument-error"),this.redirectPersistenceManager=await Kr.create(this,[Wt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(oe(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return oe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=om(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(wt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Hb(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Is(n){return Re(n)}class Ih{constructor(e){this.auth=e,this.observer=null,this.addObserver=Py(t=>this.observer=t)}get next(){return oe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Na={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _w(n){Na=n}function am(n){return Na.loadJS(n)}function vw(){return Na.recaptchaEnterpriseScript}function yw(){return Na.gapiScript}function bw(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class ww{constructor(){this.enterprise=new Iw}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Iw{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Ew="recaptcha-enterprise",cm="NO_RECAPTCHA";class Tw{constructor(e){this.type=Ew,this.auth=Is(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{tw(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new ew(l);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(l=>{c(l)})})}function s(i,o,c){const l=window.grecaptcha;_h(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(cm)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new ww().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&_h(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=vw();l.length!==0&&(l+=c),am(l).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function Eh(n,e,t,r=!1,s=!1){const i=new Tw(n);let o;if(s)o=cm;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Th(n,e,t,r,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Eh(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Eh(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
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
 */function Aw(n,e){const t=bs(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ui(i,e??{}))return s;xt(s,"already-initialized")}return t.initialize({options:e})}function Sw(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Wt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Rw(n,e,t){const r=Is(n);oe(r._canInitEmulator,r,"emulator-config-failed"),oe(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=lm(e),{host:o,port:c}=Cw(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),Pw()}function lm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Cw(n){const e=lm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Ah(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Ah(o)}}}function Ah(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Pw(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Kl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ht("not implemented")}_getIdTokenResponse(e){return Ht("not implemented")}_linkToIdToken(e,t){return Ht("not implemented")}_getReauthenticationResolver(e){return Ht("not implemented")}}async function kw(n,e){return Nn(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function xw(n,e){return xa(n,"POST","/v1/accounts:signInWithPassword",wr(n,e))}/**
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
 */async function Nw(n,e){return xa(n,"POST","/v1/accounts:signInWithEmailLink",wr(n,e))}async function Dw(n,e){return xa(n,"POST","/v1/accounts:signInWithEmailLink",wr(n,e))}/**
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
 */class fi extends Kl{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new fi(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new fi(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Th(e,t,"signInWithPassword",xw);case"emailLink":return Nw(e,{email:this._email,oobCode:this._password});default:xt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Th(e,r,"signUpPassword",kw);case"emailLink":return Dw(e,{idToken:t,email:this._email,oobCode:this._password});default:xt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Wr(n,e){return xa(n,"POST","/v1/accounts:signInWithIdp",wr(n,e))}/**
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
 */const Vw="http://localhost";class ur extends Kl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ur(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):xt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=ql(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new ur(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Wr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Wr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Wr(e,t)}buildRequest(){const e={requestUri:Vw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ni(t)}return e}}/**
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
 */function Ow(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Lw(n){const e=Ks(Ws(n)).link,t=e?Ks(Ws(e)).deep_link_id:null,r=Ks(Ws(n)).deep_link_id;return(r?Ks(Ws(r)).link:null)||r||t||e||n}class Wl{constructor(e){var t,r,s,i,o,c;const l=Ks(Ws(e)),h=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,m=Ow((s=l.mode)!==null&&s!==void 0?s:null);oe(h&&p&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=p,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Lw(e);try{return new Wl(t)}catch{return null}}}/**
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
 */class Es{constructor(){this.providerId=Es.PROVIDER_ID}static credential(e,t){return fi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Wl.parseLink(t);return oe(r,"argument-error"),fi._fromEmailAndCode(e,r.code,r.tenantId)}}Es.PROVIDER_ID="password";Es.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Es.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class um{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Vi extends um{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class fn extends Vi{constructor(){super("facebook.com")}static credential(e){return ur._fromParams({providerId:fn.PROVIDER_ID,signInMethod:fn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return fn.credentialFromTaggedObject(e)}static credentialFromError(e){return fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return fn.credential(e.oauthAccessToken)}catch{return null}}}fn.FACEBOOK_SIGN_IN_METHOD="facebook.com";fn.PROVIDER_ID="facebook.com";/**
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
 */class pn extends Vi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ur._fromParams({providerId:pn.PROVIDER_ID,signInMethod:pn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return pn.credentialFromTaggedObject(e)}static credentialFromError(e){return pn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return pn.credential(t,r)}catch{return null}}}pn.GOOGLE_SIGN_IN_METHOD="google.com";pn.PROVIDER_ID="google.com";/**
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
 */class mn extends Vi{constructor(){super("github.com")}static credential(e){return ur._fromParams({providerId:mn.PROVIDER_ID,signInMethod:mn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return mn.credentialFromTaggedObject(e)}static credentialFromError(e){return mn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return mn.credential(e.oauthAccessToken)}catch{return null}}}mn.GITHUB_SIGN_IN_METHOD="github.com";mn.PROVIDER_ID="github.com";/**
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
 */class gn extends Vi{constructor(){super("twitter.com")}static credential(e,t){return ur._fromParams({providerId:gn.PROVIDER_ID,signInMethod:gn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return gn.credentialFromTaggedObject(e)}static credentialFromError(e){return gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return gn.credential(t,r)}catch{return null}}}gn.TWITTER_SIGN_IN_METHOD="twitter.com";gn.PROVIDER_ID="twitter.com";/**
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
 */class es{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Kt._fromIdTokenResponse(e,r,s),o=Sh(r);return new es({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Sh(r);return new es({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Sh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Yo extends $t{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Yo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Yo(e,t,r,s)}}function dm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Yo._fromErrorAndOperation(n,i,e,r):i})}async function Mw(n,e,t=!1){const r=await hi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return es._forOperation(n,"link",r)}/**
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
 */async function Fw(n,e,t=!1){const{auth:r}=n;if(wt(r.app))return Promise.reject(wn(r));const s="reauthenticate";try{const i=await hi(n,dm(r,s,e,n),t);oe(i.idToken,r,"internal-error");const o=Gl(i.idToken);oe(o,r,"internal-error");const{sub:c}=o;return oe(n.uid===c,r,"user-mismatch"),es._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&xt(r,"user-mismatch"),i}}/**
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
 */async function hm(n,e,t=!1){if(wt(n.app))return Promise.reject(wn(n));const r="signIn",s=await dm(n,r,e),i=await es._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Uw(n,e){return hm(Is(n),e)}/**
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
 */async function Bw(n){const e=Is(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function $w(n,e,t){return wt(n.app)?Promise.reject(wn(n)):Uw(Re(n),Es.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Bw(n),r})}/**
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
 */function qw(n,e){return Re(n).setPersistence(e)}function jw(n,e,t,r){return Re(n).onIdTokenChanged(e,t,r)}function zw(n,e,t){return Re(n).beforeAuthStateChanged(e,t)}function Gw(n,e,t,r){return Re(n).onAuthStateChanged(e,t,r)}function Hw(n){return Re(n).signOut()}const Jo="__sak";/**
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
 */class fm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Jo,"1"),this.storage.removeItem(Jo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Kw=1e3,Ww=10;class pm extends fm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=im(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);dw()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ww):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Kw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}pm.type="LOCAL";const mm=pm;/**
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
 */class gm extends fm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}gm.type="SESSION";const _m=gm;/**
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
 */function Qw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Da{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Da(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),l=await Qw(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Da.receivers=[];/**
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
 */function Ql(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Yw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const h=Ql("",20);s.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const g=m;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(p),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Mt(){return window}function Jw(n){Mt().location.href=n}/**
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
 */function vm(){return typeof Mt().WorkerGlobalScope<"u"&&typeof Mt().importScripts=="function"}async function Xw(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Zw(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function eI(){return vm()?self:null}/**
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
 */const ym="firebaseLocalStorageDb",tI=1,Xo="firebaseLocalStorage",bm="fbase_key";class Oi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Va(n,e){return n.transaction([Xo],e?"readwrite":"readonly").objectStore(Xo)}function nI(){const n=indexedDB.deleteDatabase(ym);return new Oi(n).toPromise()}function tl(){const n=indexedDB.open(ym,tI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Xo,{keyPath:bm})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Xo)?e(r):(r.close(),await nI(),e(await tl()))})})}async function Rh(n,e,t){const r=Va(n,!0).put({[bm]:e,value:t});return new Oi(r).toPromise()}async function rI(n,e){const t=Va(n,!1).get(e),r=await new Oi(t).toPromise();return r===void 0?null:r.value}function Ch(n,e){const t=Va(n,!0).delete(e);return new Oi(t).toPromise()}const sI=800,iI=3;class wm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await tl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>iI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return vm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Da._getInstance(eI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Xw(),!this.activeServiceWorker)return;this.sender=new Yw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Zw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await tl();return await Rh(e,Jo,"1"),await Ch(e,Jo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Rh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>rI(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ch(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Va(s,!1).getAll();return new Oi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),sI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}wm.type="LOCAL";const oI=wm;new Di(3e4,6e4);/**
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
 */function aI(n,e){return e?Wt(e):(oe(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Yl extends Kl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Wr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Wr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Wr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function cI(n){return hm(n.auth,new Yl(n),n.bypassAuthState)}function lI(n){const{auth:e,user:t}=n;return oe(t,e,"internal-error"),Fw(t,new Yl(n),n.bypassAuthState)}async function uI(n){const{auth:e,user:t}=n;return oe(t,e,"internal-error"),Mw(t,new Yl(n),n.bypassAuthState)}/**
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
 */class Im{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return cI;case"linkViaPopup":case"linkViaRedirect":return uI;case"reauthViaPopup":case"reauthViaRedirect":return lI;default:xt(this.auth,"internal-error")}}resolve(e){Xt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Xt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const dI=new Di(2e3,1e4);class zr extends Im{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,zr.currentPopupAction&&zr.currentPopupAction.cancel(),zr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return oe(e,this.auth,"internal-error"),e}async onExecution(){Xt(this.filter.length===1,"Popup operations only handle one event");const e=Ql();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Lt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Lt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,zr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Lt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,dI.get())};e()}}zr.currentPopupAction=null;/**
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
 */const hI="pendingRedirect",ko=new Map;class fI extends Im{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ko.get(this.auth._key());if(!e){try{const r=await pI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ko.set(this.auth._key(),e)}return this.bypassAuthState||ko.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function pI(n,e){const t=_I(e),r=gI(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function mI(n,e){ko.set(n._key(),e)}function gI(n){return Wt(n._redirectPersistence)}function _I(n){return Po(hI,n.config.apiKey,n.name)}async function vI(n,e,t=!1){if(wt(n.app))return Promise.reject(wn(n));const r=Is(n),s=aI(r,e),o=await new fI(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const yI=10*60*1e3;class bI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!wI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Em(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Lt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=yI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ph(e))}saveEventToCache(e){this.cachedEventUids.add(Ph(e)),this.lastProcessedEventTime=Date.now()}}function Ph(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Em({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function wI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Em(n);default:return!1}}/**
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
 */async function II(n,e={}){return Nn(n,"GET","/v1/projects",e)}/**
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
 */const EI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,TI=/^https?/;async function AI(n){if(n.config.emulator)return;const{authorizedDomains:e}=await II(n);for(const t of e)try{if(SI(t))return}catch{}xt(n,"unauthorized-domain")}function SI(n){const e=Zc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!TI.test(t))return!1;if(EI.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const RI=new Di(3e4,6e4);function kh(){const n=Mt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function CI(n){return new Promise((e,t)=>{var r,s,i;function o(){kh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{kh(),t(Lt(n,"network-request-failed"))},timeout:RI.get()})}if(!((s=(r=Mt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Mt().gapi)===null||i===void 0)&&i.load)o();else{const c=bw("iframefcb");return Mt()[c]=()=>{gapi.load?o():t(Lt(n,"network-request-failed"))},am(`${yw()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw xo=null,e})}let xo=null;function PI(n){return xo=xo||CI(n),xo}/**
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
 */const kI=new Di(5e3,15e3),xI="__/auth/iframe",NI="emulator/auth/iframe",DI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},VI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function OI(n){const e=n.config;oe(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?zl(e,NI):`https://${n.config.authDomain}/${xI}`,r={apiKey:e.apiKey,appName:n.name,v:ws},s=VI.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Ni(r).slice(1)}`}async function LI(n){const e=await PI(n),t=Mt().gapi;return oe(t,n,"internal-error"),e.open({where:document.body,url:OI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:DI,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Lt(n,"network-request-failed"),c=Mt().setTimeout(()=>{i(o)},kI.get());function l(){Mt().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
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
 */const MI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},FI=500,UI=600,BI="_blank",$I="http://localhost";class xh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function qI(n,e,t,r=FI,s=UI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},MI),{width:r.toString(),height:s.toString(),top:i,left:o}),h=je().toLowerCase();t&&(c=em(h)?BI:t),Xp(h)&&(e=e||$I,l.scrollbars="yes");const p=Object.entries(l).reduce((g,[T,R])=>`${g}${T}=${R},`,"");if(uw(h)&&c!=="_self")return jI(e||"",c),new xh(null);const m=window.open(e||"",c,p);oe(m,n,"popup-blocked");try{m.focus()}catch{}return new xh(m)}function jI(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const zI="__/auth/handler",GI="emulator/auth/handler",HI=encodeURIComponent("fac");async function Nh(n,e,t,r,s,i){oe(n.config.authDomain,n,"auth-domain-config-required"),oe(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ws,eventId:s};if(e instanceof um){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Cy(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))o[p]=m}if(e instanceof Vi){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),h=l?`#${HI}=${encodeURIComponent(l)}`:"";return`${KI(n)}?${Ni(c).slice(1)}${h}`}function KI({config:n}){return n.emulator?zl(n,GI):`https://${n.authDomain}/${zI}`}/**
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
 */const Vc="webStorageSupport";class WI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=_m,this._completeRedirectFn=vI,this._overrideRedirectResult=mI}async _openPopup(e,t,r,s){var i;Xt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Nh(e,t,r,Zc(),s);return qI(e,o,Ql())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Nh(e,t,r,Zc(),s);return Jw(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Xt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await LI(e),r=new bI(e);return t.register("authEvent",s=>(oe(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Vc,{type:Vc},s=>{var i;const o=(i=s?.[0])===null||i===void 0?void 0:i[Vc];o!==void 0&&t(!!o),xt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=AI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return im()||Zp()||Hl()}}const QI=WI;var Dh="@firebase/auth",Vh="1.9.0";/**
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
 */class YI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){oe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function JI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function XI(n){Jt(new Ut("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;oe(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:om(n)},h=new gw(r,s,i,l);return Sw(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Jt(new Ut("auth-internal",e=>{const t=Is(e.getProvider("auth").getImmediate());return(r=>new YI(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ct(Dh,Vh,JI(n)),Ct(Dh,Vh,"esm2017")}/**
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
 */const ZI=5*60,eE=Lp("authIdTokenMaxAge")||ZI;let Oh=null;const tE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>eE)return;const s=t?.token;Oh!==s&&(Oh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function nE(n=$l()){const e=bs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Aw(n,{popupRedirectResolver:QI,persistence:[oI,mm,_m]}),r=Lp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=tE(i.toString());zw(t,o,()=>o(t.currentUser)),jw(t,c=>o(c))}}const s=Vp("auth");return s&&Rw(t,`http://${s}`),t}function rE(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}_w({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Lt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",rE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});XI("Browser");var Lh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var In,Tm;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,v){function w(){}w.prototype=v.prototype,I.D=v.prototype,I.prototype=new w,I.prototype.constructor=I,I.C=function(E,b,S){for(var y=Array(arguments.length-2),ce=2;ce<arguments.length;ce++)y[ce-2]=arguments[ce];return v.prototype[b].apply(E,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,v,w){w||(w=0);var E=Array(16);if(typeof v=="string")for(var b=0;16>b;++b)E[b]=v.charCodeAt(w++)|v.charCodeAt(w++)<<8|v.charCodeAt(w++)<<16|v.charCodeAt(w++)<<24;else for(b=0;16>b;++b)E[b]=v[w++]|v[w++]<<8|v[w++]<<16|v[w++]<<24;v=I.g[0],w=I.g[1],b=I.g[2];var S=I.g[3],y=v+(S^w&(b^S))+E[0]+3614090360&4294967295;v=w+(y<<7&4294967295|y>>>25),y=S+(b^v&(w^b))+E[1]+3905402710&4294967295,S=v+(y<<12&4294967295|y>>>20),y=b+(w^S&(v^w))+E[2]+606105819&4294967295,b=S+(y<<17&4294967295|y>>>15),y=w+(v^b&(S^v))+E[3]+3250441966&4294967295,w=b+(y<<22&4294967295|y>>>10),y=v+(S^w&(b^S))+E[4]+4118548399&4294967295,v=w+(y<<7&4294967295|y>>>25),y=S+(b^v&(w^b))+E[5]+1200080426&4294967295,S=v+(y<<12&4294967295|y>>>20),y=b+(w^S&(v^w))+E[6]+2821735955&4294967295,b=S+(y<<17&4294967295|y>>>15),y=w+(v^b&(S^v))+E[7]+4249261313&4294967295,w=b+(y<<22&4294967295|y>>>10),y=v+(S^w&(b^S))+E[8]+1770035416&4294967295,v=w+(y<<7&4294967295|y>>>25),y=S+(b^v&(w^b))+E[9]+2336552879&4294967295,S=v+(y<<12&4294967295|y>>>20),y=b+(w^S&(v^w))+E[10]+4294925233&4294967295,b=S+(y<<17&4294967295|y>>>15),y=w+(v^b&(S^v))+E[11]+2304563134&4294967295,w=b+(y<<22&4294967295|y>>>10),y=v+(S^w&(b^S))+E[12]+1804603682&4294967295,v=w+(y<<7&4294967295|y>>>25),y=S+(b^v&(w^b))+E[13]+4254626195&4294967295,S=v+(y<<12&4294967295|y>>>20),y=b+(w^S&(v^w))+E[14]+2792965006&4294967295,b=S+(y<<17&4294967295|y>>>15),y=w+(v^b&(S^v))+E[15]+1236535329&4294967295,w=b+(y<<22&4294967295|y>>>10),y=v+(b^S&(w^b))+E[1]+4129170786&4294967295,v=w+(y<<5&4294967295|y>>>27),y=S+(w^b&(v^w))+E[6]+3225465664&4294967295,S=v+(y<<9&4294967295|y>>>23),y=b+(v^w&(S^v))+E[11]+643717713&4294967295,b=S+(y<<14&4294967295|y>>>18),y=w+(S^v&(b^S))+E[0]+3921069994&4294967295,w=b+(y<<20&4294967295|y>>>12),y=v+(b^S&(w^b))+E[5]+3593408605&4294967295,v=w+(y<<5&4294967295|y>>>27),y=S+(w^b&(v^w))+E[10]+38016083&4294967295,S=v+(y<<9&4294967295|y>>>23),y=b+(v^w&(S^v))+E[15]+3634488961&4294967295,b=S+(y<<14&4294967295|y>>>18),y=w+(S^v&(b^S))+E[4]+3889429448&4294967295,w=b+(y<<20&4294967295|y>>>12),y=v+(b^S&(w^b))+E[9]+568446438&4294967295,v=w+(y<<5&4294967295|y>>>27),y=S+(w^b&(v^w))+E[14]+3275163606&4294967295,S=v+(y<<9&4294967295|y>>>23),y=b+(v^w&(S^v))+E[3]+4107603335&4294967295,b=S+(y<<14&4294967295|y>>>18),y=w+(S^v&(b^S))+E[8]+1163531501&4294967295,w=b+(y<<20&4294967295|y>>>12),y=v+(b^S&(w^b))+E[13]+2850285829&4294967295,v=w+(y<<5&4294967295|y>>>27),y=S+(w^b&(v^w))+E[2]+4243563512&4294967295,S=v+(y<<9&4294967295|y>>>23),y=b+(v^w&(S^v))+E[7]+1735328473&4294967295,b=S+(y<<14&4294967295|y>>>18),y=w+(S^v&(b^S))+E[12]+2368359562&4294967295,w=b+(y<<20&4294967295|y>>>12),y=v+(w^b^S)+E[5]+4294588738&4294967295,v=w+(y<<4&4294967295|y>>>28),y=S+(v^w^b)+E[8]+2272392833&4294967295,S=v+(y<<11&4294967295|y>>>21),y=b+(S^v^w)+E[11]+1839030562&4294967295,b=S+(y<<16&4294967295|y>>>16),y=w+(b^S^v)+E[14]+4259657740&4294967295,w=b+(y<<23&4294967295|y>>>9),y=v+(w^b^S)+E[1]+2763975236&4294967295,v=w+(y<<4&4294967295|y>>>28),y=S+(v^w^b)+E[4]+1272893353&4294967295,S=v+(y<<11&4294967295|y>>>21),y=b+(S^v^w)+E[7]+4139469664&4294967295,b=S+(y<<16&4294967295|y>>>16),y=w+(b^S^v)+E[10]+3200236656&4294967295,w=b+(y<<23&4294967295|y>>>9),y=v+(w^b^S)+E[13]+681279174&4294967295,v=w+(y<<4&4294967295|y>>>28),y=S+(v^w^b)+E[0]+3936430074&4294967295,S=v+(y<<11&4294967295|y>>>21),y=b+(S^v^w)+E[3]+3572445317&4294967295,b=S+(y<<16&4294967295|y>>>16),y=w+(b^S^v)+E[6]+76029189&4294967295,w=b+(y<<23&4294967295|y>>>9),y=v+(w^b^S)+E[9]+3654602809&4294967295,v=w+(y<<4&4294967295|y>>>28),y=S+(v^w^b)+E[12]+3873151461&4294967295,S=v+(y<<11&4294967295|y>>>21),y=b+(S^v^w)+E[15]+530742520&4294967295,b=S+(y<<16&4294967295|y>>>16),y=w+(b^S^v)+E[2]+3299628645&4294967295,w=b+(y<<23&4294967295|y>>>9),y=v+(b^(w|~S))+E[0]+4096336452&4294967295,v=w+(y<<6&4294967295|y>>>26),y=S+(w^(v|~b))+E[7]+1126891415&4294967295,S=v+(y<<10&4294967295|y>>>22),y=b+(v^(S|~w))+E[14]+2878612391&4294967295,b=S+(y<<15&4294967295|y>>>17),y=w+(S^(b|~v))+E[5]+4237533241&4294967295,w=b+(y<<21&4294967295|y>>>11),y=v+(b^(w|~S))+E[12]+1700485571&4294967295,v=w+(y<<6&4294967295|y>>>26),y=S+(w^(v|~b))+E[3]+2399980690&4294967295,S=v+(y<<10&4294967295|y>>>22),y=b+(v^(S|~w))+E[10]+4293915773&4294967295,b=S+(y<<15&4294967295|y>>>17),y=w+(S^(b|~v))+E[1]+2240044497&4294967295,w=b+(y<<21&4294967295|y>>>11),y=v+(b^(w|~S))+E[8]+1873313359&4294967295,v=w+(y<<6&4294967295|y>>>26),y=S+(w^(v|~b))+E[15]+4264355552&4294967295,S=v+(y<<10&4294967295|y>>>22),y=b+(v^(S|~w))+E[6]+2734768916&4294967295,b=S+(y<<15&4294967295|y>>>17),y=w+(S^(b|~v))+E[13]+1309151649&4294967295,w=b+(y<<21&4294967295|y>>>11),y=v+(b^(w|~S))+E[4]+4149444226&4294967295,v=w+(y<<6&4294967295|y>>>26),y=S+(w^(v|~b))+E[11]+3174756917&4294967295,S=v+(y<<10&4294967295|y>>>22),y=b+(v^(S|~w))+E[2]+718787259&4294967295,b=S+(y<<15&4294967295|y>>>17),y=w+(S^(b|~v))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+v&4294967295,I.g[1]=I.g[1]+(b+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+b&4294967295,I.g[3]=I.g[3]+S&4294967295}r.prototype.u=function(I,v){v===void 0&&(v=I.length);for(var w=v-this.blockSize,E=this.B,b=this.h,S=0;S<v;){if(b==0)for(;S<=w;)s(this,I,S),S+=this.blockSize;if(typeof I=="string"){for(;S<v;)if(E[b++]=I.charCodeAt(S++),b==this.blockSize){s(this,E),b=0;break}}else for(;S<v;)if(E[b++]=I[S++],b==this.blockSize){s(this,E),b=0;break}}this.h=b,this.o+=v},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var v=1;v<I.length-8;++v)I[v]=0;var w=8*this.o;for(v=I.length-8;v<I.length;++v)I[v]=w&255,w/=256;for(this.u(I),I=Array(16),v=w=0;4>v;++v)for(var E=0;32>E;E+=8)I[w++]=this.g[v]>>>E&255;return I};function i(I,v){var w=c;return Object.prototype.hasOwnProperty.call(w,I)?w[I]:w[I]=v(I)}function o(I,v){this.h=v;for(var w=[],E=!0,b=I.length-1;0<=b;b--){var S=I[b]|0;E&&S==v||(w[b]=S,E=!1)}this.g=w}var c={};function l(I){return-128<=I&&128>I?i(I,function(v){return new o([v|0],0>v?-1:0)}):new o([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return m;if(0>I)return A(h(-I));for(var v=[],w=1,E=0;I>=w;E++)v[E]=I/w|0,w*=4294967296;return new o(v,0)}function p(I,v){if(I.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(I.charAt(0)=="-")return A(p(I.substring(1),v));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=h(Math.pow(v,8)),E=m,b=0;b<I.length;b+=8){var S=Math.min(8,I.length-b),y=parseInt(I.substring(b,b+S),v);8>S?(S=h(Math.pow(v,S)),E=E.j(S).add(h(y))):(E=E.j(w),E=E.add(h(y)))}return E}var m=l(0),g=l(1),T=l(16777216);n=o.prototype,n.m=function(){if(P(this))return-A(this).m();for(var I=0,v=1,w=0;w<this.g.length;w++){var E=this.i(w);I+=(0<=E?E:4294967296+E)*v,v*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(R(this))return"0";if(P(this))return"-"+A(this).toString(I);for(var v=h(Math.pow(I,6)),w=this,E="";;){var b=$(w,v).g;w=L(w,b.j(v));var S=((0<w.g.length?w.g[0]:w.h)>>>0).toString(I);if(w=b,R(w))return S+E;for(;6>S.length;)S="0"+S;E=S+E}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function R(I){if(I.h!=0)return!1;for(var v=0;v<I.g.length;v++)if(I.g[v]!=0)return!1;return!0}function P(I){return I.h==-1}n.l=function(I){return I=L(this,I),P(I)?-1:R(I)?0:1};function A(I){for(var v=I.g.length,w=[],E=0;E<v;E++)w[E]=~I.g[E];return new o(w,~I.h).add(g)}n.abs=function(){return P(this)?A(this):this},n.add=function(I){for(var v=Math.max(this.g.length,I.g.length),w=[],E=0,b=0;b<=v;b++){var S=E+(this.i(b)&65535)+(I.i(b)&65535),y=(S>>>16)+(this.i(b)>>>16)+(I.i(b)>>>16);E=y>>>16,S&=65535,y&=65535,w[b]=y<<16|S}return new o(w,w[w.length-1]&-2147483648?-1:0)};function L(I,v){return I.add(A(v))}n.j=function(I){if(R(this)||R(I))return m;if(P(this))return P(I)?A(this).j(A(I)):A(A(this).j(I));if(P(I))return A(this.j(A(I)));if(0>this.l(T)&&0>I.l(T))return h(this.m()*I.m());for(var v=this.g.length+I.g.length,w=[],E=0;E<2*v;E++)w[E]=0;for(E=0;E<this.g.length;E++)for(var b=0;b<I.g.length;b++){var S=this.i(E)>>>16,y=this.i(E)&65535,ce=I.i(b)>>>16,fe=I.i(b)&65535;w[2*E+2*b]+=y*fe,C(w,2*E+2*b),w[2*E+2*b+1]+=S*fe,C(w,2*E+2*b+1),w[2*E+2*b+1]+=y*ce,C(w,2*E+2*b+1),w[2*E+2*b+2]+=S*ce,C(w,2*E+2*b+2)}for(E=0;E<v;E++)w[E]=w[2*E+1]<<16|w[2*E];for(E=v;E<2*v;E++)w[E]=0;return new o(w,0)};function C(I,v){for(;(I[v]&65535)!=I[v];)I[v+1]+=I[v]>>>16,I[v]&=65535,v++}function N(I,v){this.g=I,this.h=v}function $(I,v){if(R(v))throw Error("division by zero");if(R(I))return new N(m,m);if(P(I))return v=$(A(I),v),new N(A(v.g),A(v.h));if(P(v))return v=$(I,A(v)),new N(A(v.g),v.h);if(30<I.g.length){if(P(I)||P(v))throw Error("slowDivide_ only works with positive integers.");for(var w=g,E=v;0>=E.l(I);)w=k(w),E=k(E);var b=U(w,1),S=U(E,1);for(E=U(E,2),w=U(w,2);!R(E);){var y=S.add(E);0>=y.l(I)&&(b=b.add(w),S=y),E=U(E,1),w=U(w,1)}return v=L(I,b.j(v)),new N(b,v)}for(b=m;0<=I.l(v);){for(w=Math.max(1,Math.floor(I.m()/v.m())),E=Math.ceil(Math.log(w)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),S=h(w),y=S.j(v);P(y)||0<y.l(I);)w-=E,S=h(w),y=S.j(v);R(S)&&(S=g),b=b.add(S),I=L(I,y)}return new N(b,I)}n.A=function(I){return $(this,I).h},n.and=function(I){for(var v=Math.max(this.g.length,I.g.length),w=[],E=0;E<v;E++)w[E]=this.i(E)&I.i(E);return new o(w,this.h&I.h)},n.or=function(I){for(var v=Math.max(this.g.length,I.g.length),w=[],E=0;E<v;E++)w[E]=this.i(E)|I.i(E);return new o(w,this.h|I.h)},n.xor=function(I){for(var v=Math.max(this.g.length,I.g.length),w=[],E=0;E<v;E++)w[E]=this.i(E)^I.i(E);return new o(w,this.h^I.h)};function k(I){for(var v=I.g.length+1,w=[],E=0;E<v;E++)w[E]=I.i(E)<<1|I.i(E-1)>>>31;return new o(w,I.h)}function U(I,v){var w=v>>5;v%=32;for(var E=I.g.length-w,b=[],S=0;S<E;S++)b[S]=0<v?I.i(S+w)>>>v|I.i(S+w+1)<<32-v:I.i(S+w);return new o(b,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Tm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,In=o}).apply(typeof Lh<"u"?Lh:typeof self<"u"?self:typeof window<"u"?window:{});var ho=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Am,Qs,Sm,No,nl,Rm,Cm,Pm;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,f){return a==Array.prototype||a==Object.prototype||(a[d]=f.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ho=="object"&&ho];for(var d=0;d<a.length;++d){var f=a[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(a,d){if(d)e:{var f=r;a=a.split(".");for(var _=0;_<a.length-1;_++){var V=a[_];if(!(V in f))break e;f=f[V]}a=a[a.length-1],_=f[a],d=d(_),d!=_&&d!=null&&e(f,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var f=0,_=!1,V={next:function(){if(!_&&f<a.length){var M=f++;return{value:d(M,a[M]),done:!1}}return _=!0,{done:!0,value:void 0}}};return V[Symbol.iterator]=function(){return V},V}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function h(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function p(a,d,f){return a.call.apply(a.bind,arguments)}function m(a,d,f){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var V=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(V,_),a.apply(d,V)}}return function(){return a.apply(d,arguments)}}function g(a,d,f){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:m,g.apply(null,arguments)}function T(a,d){var f=Array.prototype.slice.call(arguments,1);return function(){var _=f.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function R(a,d){function f(){}f.prototype=d.prototype,a.aa=d.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(_,V,M){for(var Q=Array(arguments.length-2),Ae=2;Ae<arguments.length;Ae++)Q[Ae-2]=arguments[Ae];return d.prototype[V].apply(_,Q)}}function P(a){const d=a.length;if(0<d){const f=Array(d);for(let _=0;_<d;_++)f[_]=a[_];return f}return[]}function A(a,d){for(let f=1;f<arguments.length;f++){const _=arguments[f];if(l(_)){const V=a.length||0,M=_.length||0;a.length=V+M;for(let Q=0;Q<M;Q++)a[V+Q]=_[Q]}else a.push(_)}}class L{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function C(a){return/^[\s\xa0]*$/.test(a)}function N(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function $(a){return $[" "](a),a}$[" "]=function(){};var k=N().indexOf("Gecko")!=-1&&!(N().toLowerCase().indexOf("webkit")!=-1&&N().indexOf("Edge")==-1)&&!(N().indexOf("Trident")!=-1||N().indexOf("MSIE")!=-1)&&N().indexOf("Edge")==-1;function U(a,d,f){for(const _ in a)d.call(f,a[_],_,a)}function I(a,d){for(const f in a)d.call(void 0,a[f],f,a)}function v(a){const d={};for(const f in a)d[f]=a[f];return d}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,d){let f,_;for(let V=1;V<arguments.length;V++){_=arguments[V];for(f in _)a[f]=_[f];for(let M=0;M<w.length;M++)f=w[M],Object.prototype.hasOwnProperty.call(_,f)&&(a[f]=_[f])}}function b(a){var d=1;a=a.split(":");const f=[];for(;0<d&&a.length;)f.push(a.shift()),d--;return a.length&&f.push(a.join(":")),f}function S(a){c.setTimeout(()=>{throw a},0)}function y(){var a=x;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class ce{constructor(){this.h=this.g=null}add(d,f){const _=fe.get();_.set(d,f),this.h?this.h.next=_:this.g=_,this.h=_}}var fe=new L(()=>new X,a=>a.reset());class X{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let ve,Fe=!1,x=new ce,z=()=>{const a=c.Promise.resolve(void 0);ve=()=>{a.then(q)}};var q=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(f){S(f)}var d=fe;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}Fe=!1};function Z(){this.s=this.s,this.C=this.C}Z.prototype.s=!1,Z.prototype.ma=function(){this.s||(this.s=!0,this.N())},Z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function j(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}j.prototype.h=function(){this.defaultPrevented=!0};var he=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};c.addEventListener("test",f,d),c.removeEventListener("test",f,d)}catch{}return a}();function O(a,d){if(j.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(k){e:{try{$(d.nodeName);var V=!0;break e}catch{}V=!1}V||(d=null)}}else f=="mouseover"?d=a.fromElement:f=="mouseout"&&(d=a.toElement);this.relatedTarget=d,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:B[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&O.aa.h.call(this)}}R(O,j);var B={2:"touch",3:"pen",4:"mouse"};O.prototype.h=function(){O.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Y="closure_listenable_"+(1e6*Math.random()|0),ae=0;function re(a,d,f,_,V){this.listener=a,this.proxy=null,this.src=d,this.type=f,this.capture=!!_,this.ha=V,this.key=++ae,this.da=this.fa=!1}function ne(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Te(a){this.src=a,this.g={},this.h=0}Te.prototype.add=function(a,d,f,_,V){var M=a.toString();a=this.g[M],a||(a=this.g[M]=[],this.h++);var Q=Ue(a,d,_,V);return-1<Q?(d=a[Q],f||(d.fa=!1)):(d=new re(d,this.src,M,!!_,V),d.fa=f,a.push(d)),d};function ke(a,d){var f=d.type;if(f in a.g){var _=a.g[f],V=Array.prototype.indexOf.call(_,d,void 0),M;(M=0<=V)&&Array.prototype.splice.call(_,V,1),M&&(ne(d),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Ue(a,d,f,_){for(var V=0;V<a.length;++V){var M=a[V];if(!M.da&&M.listener==d&&M.capture==!!f&&M.ha==_)return V}return-1}var nt="closure_lm_"+(1e6*Math.random()|0),Fn={};function Un(a,d,f,_,V){if(Array.isArray(d)){for(var M=0;M<d.length;M++)Un(a,d[M],f,_,V);return null}return f=ud(f),a&&a[Y]?a.K(d,f,h(_)?!!_.capture:!1,V):Rs(a,d,f,!1,_,V)}function Rs(a,d,f,_,V,M){if(!d)throw Error("Invalid event type");var Q=h(V)?!!V.capture:!!V,Ae=uc(a);if(Ae||(a[nt]=Ae=new Te(a)),f=Ae.add(d,f,_,Q,M),f.proxy)return f;if(_=Vv(),f.proxy=_,_.src=a,_.listener=f,a.addEventListener)he||(V=Q),V===void 0&&(V=!1),a.addEventListener(d.toString(),_,V);else if(a.attachEvent)a.attachEvent(ld(d.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Vv(){function a(f){return d.call(a.src,a.listener,f)}const d=Ov;return a}function cd(a,d,f,_,V){if(Array.isArray(d))for(var M=0;M<d.length;M++)cd(a,d[M],f,_,V);else _=h(_)?!!_.capture:!!_,f=ud(f),a&&a[Y]?(a=a.i,d=String(d).toString(),d in a.g&&(M=a.g[d],f=Ue(M,f,_,V),-1<f&&(ne(M[f]),Array.prototype.splice.call(M,f,1),M.length==0&&(delete a.g[d],a.h--)))):a&&(a=uc(a))&&(d=a.g[d.toString()],a=-1,d&&(a=Ue(d,f,_,V)),(f=-1<a?d[a]:null)&&lc(f))}function lc(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[Y])ke(d.i,a);else{var f=a.type,_=a.proxy;d.removeEventListener?d.removeEventListener(f,_,a.capture):d.detachEvent?d.detachEvent(ld(f),_):d.addListener&&d.removeListener&&d.removeListener(_),(f=uc(d))?(ke(f,a),f.h==0&&(f.src=null,d[nt]=null)):ne(a)}}}function ld(a){return a in Fn?Fn[a]:Fn[a]="on"+a}function Ov(a,d){if(a.da)a=!0;else{d=new O(d,this);var f=a.listener,_=a.ha||a.src;a.fa&&lc(a),a=f.call(_,d)}return a}function uc(a){return a=a[nt],a instanceof Te?a:null}var dc="__closure_events_fn_"+(1e9*Math.random()>>>0);function ud(a){return typeof a=="function"?a:(a[dc]||(a[dc]=function(d){return a.handleEvent(d)}),a[dc])}function We(){Z.call(this),this.i=new Te(this),this.M=this,this.F=null}R(We,Z),We.prototype[Y]=!0,We.prototype.removeEventListener=function(a,d,f,_){cd(this,a,d,f,_)};function rt(a,d){var f,_=a.F;if(_)for(f=[];_;_=_.F)f.push(_);if(a=a.M,_=d.type||d,typeof d=="string")d=new j(d,a);else if(d instanceof j)d.target=d.target||a;else{var V=d;d=new j(_,a),E(d,V)}if(V=!0,f)for(var M=f.length-1;0<=M;M--){var Q=d.g=f[M];V=Wi(Q,_,!0,d)&&V}if(Q=d.g=a,V=Wi(Q,_,!0,d)&&V,V=Wi(Q,_,!1,d)&&V,f)for(M=0;M<f.length;M++)Q=d.g=f[M],V=Wi(Q,_,!1,d)&&V}We.prototype.N=function(){if(We.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var f=a.g[d],_=0;_<f.length;_++)ne(f[_]);delete a.g[d],a.h--}}this.F=null},We.prototype.K=function(a,d,f,_){return this.i.add(String(a),d,!1,f,_)},We.prototype.L=function(a,d,f,_){return this.i.add(String(a),d,!0,f,_)};function Wi(a,d,f,_){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var V=!0,M=0;M<d.length;++M){var Q=d[M];if(Q&&!Q.da&&Q.capture==f){var Ae=Q.listener,He=Q.ha||Q.src;Q.fa&&ke(a.i,Q),V=Ae.call(He,_)!==!1&&V}}return V&&!_.defaultPrevented}function dd(a,d,f){if(typeof a=="function")f&&(a=g(a,f));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:c.setTimeout(a,d||0)}function hd(a){a.g=dd(()=>{a.g=null,a.i&&(a.i=!1,hd(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class Lv extends Z{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:hd(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Cs(a){Z.call(this),this.h=a,this.g={}}R(Cs,Z);var fd=[];function pd(a){U(a.g,function(d,f){this.g.hasOwnProperty(f)&&lc(d)},a),a.g={}}Cs.prototype.N=function(){Cs.aa.N.call(this),pd(this)},Cs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var hc=c.JSON.stringify,Mv=c.JSON.parse,Fv=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function fc(){}fc.prototype.h=null;function md(a){return a.h||(a.h=a.i())}function gd(){}var Ps={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function pc(){j.call(this,"d")}R(pc,j);function mc(){j.call(this,"c")}R(mc,j);var Bn={},_d=null;function Qi(){return _d=_d||new We}Bn.La="serverreachability";function vd(a){j.call(this,Bn.La,a)}R(vd,j);function ks(a){const d=Qi();rt(d,new vd(d))}Bn.STAT_EVENT="statevent";function yd(a,d){j.call(this,Bn.STAT_EVENT,a),this.stat=d}R(yd,j);function st(a){const d=Qi();rt(d,new yd(d,a))}Bn.Ma="timingevent";function bd(a,d){j.call(this,Bn.Ma,a),this.size=d}R(bd,j);function xs(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},d)}function Ns(){this.g=!0}Ns.prototype.xa=function(){this.g=!1};function Uv(a,d,f,_,V,M){a.info(function(){if(a.g)if(M)for(var Q="",Ae=M.split("&"),He=0;He<Ae.length;He++){var be=Ae[He].split("=");if(1<be.length){var Qe=be[0];be=be[1];var Ye=Qe.split("_");Q=2<=Ye.length&&Ye[1]=="type"?Q+(Qe+"="+be+"&"):Q+(Qe+"=redacted&")}}else Q=null;else Q=M;return"XMLHTTP REQ ("+_+") [attempt "+V+"]: "+d+`
`+f+`
`+Q})}function Bv(a,d,f,_,V,M,Q){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+V+"]: "+d+`
`+f+`
`+M+" "+Q})}function Cr(a,d,f,_){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+qv(a,f)+(_?" "+_:"")})}function $v(a,d){a.info(function(){return"TIMEOUT: "+d})}Ns.prototype.info=function(){};function qv(a,d){if(!a.g)return d;if(!d)return null;try{var f=JSON.parse(d);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var _=f[a];if(!(2>_.length)){var V=_[1];if(Array.isArray(V)&&!(1>V.length)){var M=V[0];if(M!="noop"&&M!="stop"&&M!="close")for(var Q=1;Q<V.length;Q++)V[Q]=""}}}}return hc(f)}catch{return d}}var Yi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},wd={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},gc;function Ji(){}R(Ji,fc),Ji.prototype.g=function(){return new XMLHttpRequest},Ji.prototype.i=function(){return{}},gc=new Ji;function sn(a,d,f,_){this.j=a,this.i=d,this.l=f,this.R=_||1,this.U=new Cs(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Id}function Id(){this.i=null,this.g="",this.h=!1}var Ed={},_c={};function vc(a,d,f){a.L=1,a.v=to(zt(d)),a.m=f,a.P=!0,Td(a,null)}function Td(a,d){a.F=Date.now(),Xi(a),a.A=zt(a.v);var f=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),Fd(f.i,"t",_),a.C=0,f=a.j.J,a.h=new Id,a.g=nh(a.j,f?d:null,!a.m),0<a.O&&(a.M=new Lv(g(a.Y,a,a.g),a.O)),d=a.U,f=a.g,_=a.ca;var V="readystatechange";Array.isArray(V)||(V&&(fd[0]=V.toString()),V=fd);for(var M=0;M<V.length;M++){var Q=Un(f,V[M],_||d.handleEvent,!1,d.h||d);if(!Q)break;d.g[Q.key]=Q}d=a.H?v(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),ks(),Uv(a.i,a.u,a.A,a.l,a.R,a.m)}sn.prototype.ca=function(a){a=a.target;const d=this.M;d&&Gt(a)==3?d.j():this.Y(a)},sn.prototype.Y=function(a){try{if(a==this.g)e:{const Ye=Gt(this.g);var d=this.g.Ba();const xr=this.g.Z();if(!(3>Ye)&&(Ye!=3||this.g&&(this.h.h||this.g.oa()||Gd(this.g)))){this.J||Ye!=4||d==7||(d==8||0>=xr?ks(3):ks(2)),yc(this);var f=this.g.Z();this.X=f;t:if(Ad(this)){var _=Gd(this.g);a="";var V=_.length,M=Gt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){$n(this),Ds(this);var Q="";break t}this.h.i=new c.TextDecoder}for(d=0;d<V;d++)this.h.h=!0,a+=this.h.i.decode(_[d],{stream:!(M&&d==V-1)});_.length=0,this.h.g+=a,this.C=0,Q=this.h.g}else Q=this.g.oa();if(this.o=f==200,Bv(this.i,this.u,this.A,this.l,this.R,Ye,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Ae,He=this.g;if((Ae=He.g?He.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!C(Ae)){var be=Ae;break t}}be=null}if(f=be)Cr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,bc(this,f);else{this.o=!1,this.s=3,st(12),$n(this),Ds(this);break e}}if(this.P){f=!0;let St;for(;!this.J&&this.C<Q.length;)if(St=jv(this,Q),St==_c){Ye==4&&(this.s=4,st(14),f=!1),Cr(this.i,this.l,null,"[Incomplete Response]");break}else if(St==Ed){this.s=4,st(15),Cr(this.i,this.l,Q,"[Invalid Chunk]"),f=!1;break}else Cr(this.i,this.l,St,null),bc(this,St);if(Ad(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ye!=4||Q.length!=0||this.h.h||(this.s=1,st(16),f=!1),this.o=this.o&&f,!f)Cr(this.i,this.l,Q,"[Invalid Chunked Response]"),$n(this),Ds(this);else if(0<Q.length&&!this.W){this.W=!0;var Qe=this.j;Qe.g==this&&Qe.ba&&!Qe.M&&(Qe.j.info("Great, no buffering proxy detected. Bytes received: "+Q.length),Sc(Qe),Qe.M=!0,st(11))}}else Cr(this.i,this.l,Q,null),bc(this,Q);Ye==4&&$n(this),this.o&&!this.J&&(Ye==4?Xd(this.j,this):(this.o=!1,Xi(this)))}else oy(this.g),f==400&&0<Q.indexOf("Unknown SID")?(this.s=3,st(12)):(this.s=0,st(13)),$n(this),Ds(this)}}}catch{}finally{}};function Ad(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function jv(a,d){var f=a.C,_=d.indexOf(`
`,f);return _==-1?_c:(f=Number(d.substring(f,_)),isNaN(f)?Ed:(_+=1,_+f>d.length?_c:(d=d.slice(_,_+f),a.C=_+f,d)))}sn.prototype.cancel=function(){this.J=!0,$n(this)};function Xi(a){a.S=Date.now()+a.I,Sd(a,a.I)}function Sd(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=xs(g(a.ba,a),d)}function yc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}sn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?($v(this.i,this.A),this.L!=2&&(ks(),st(17)),$n(this),this.s=2,Ds(this)):Sd(this,this.S-a)};function Ds(a){a.j.G==0||a.J||Xd(a.j,a)}function $n(a){yc(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,pd(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function bc(a,d){try{var f=a.j;if(f.G!=0&&(f.g==a||wc(f.h,a))){if(!a.K&&wc(f.h,a)&&f.G==3){try{var _=f.Da.g.parse(d)}catch{_=null}if(Array.isArray(_)&&_.length==3){var V=_;if(V[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)ao(f),io(f);else break e;Ac(f),st(18)}}else f.za=V[1],0<f.za-f.T&&37500>V[2]&&f.F&&f.v==0&&!f.C&&(f.C=xs(g(f.Za,f),6e3));if(1>=Pd(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else jn(f,11)}else if((a.K||f.g==a)&&ao(f),!C(d))for(V=f.Da.g.parse(d),d=0;d<V.length;d++){let be=V[d];if(f.T=be[0],be=be[1],f.G==2)if(be[0]=="c"){f.K=be[1],f.ia=be[2];const Qe=be[3];Qe!=null&&(f.la=Qe,f.j.info("VER="+f.la));const Ye=be[4];Ye!=null&&(f.Aa=Ye,f.j.info("SVER="+f.Aa));const xr=be[5];xr!=null&&typeof xr=="number"&&0<xr&&(_=1.5*xr,f.L=_,f.j.info("backChannelRequestTimeoutMs_="+_)),_=f;const St=a.g;if(St){const lo=St.g?St.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(lo){var M=_.h;M.g||lo.indexOf("spdy")==-1&&lo.indexOf("quic")==-1&&lo.indexOf("h2")==-1||(M.j=M.l,M.g=new Set,M.h&&(Ic(M,M.h),M.h=null))}if(_.D){const Rc=St.g?St.g.getResponseHeader("X-HTTP-Session-Id"):null;Rc&&(_.ya=Rc,Se(_.I,_.D,Rc))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),_=f;var Q=a;if(_.qa=th(_,_.J?_.ia:null,_.W),Q.K){kd(_.h,Q);var Ae=Q,He=_.L;He&&(Ae.I=He),Ae.B&&(yc(Ae),Xi(Ae)),_.g=Q}else Yd(_);0<f.i.length&&oo(f)}else be[0]!="stop"&&be[0]!="close"||jn(f,7);else f.G==3&&(be[0]=="stop"||be[0]=="close"?be[0]=="stop"?jn(f,7):Tc(f):be[0]!="noop"&&f.l&&f.l.ta(be),f.v=0)}}ks(4)}catch{}}var zv=class{constructor(a,d){this.g=a,this.map=d}};function Rd(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Cd(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Pd(a){return a.h?1:a.g?a.g.size:0}function wc(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function Ic(a,d){a.g?a.g.add(d):a.h=d}function kd(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Rd.prototype.cancel=function(){if(this.i=xd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function xd(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const f of a.g.values())d=d.concat(f.D);return d}return P(a.i)}function Gv(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var d=[],f=a.length,_=0;_<f;_++)d.push(a[_]);return d}d=[],f=0;for(_ in a)d[f++]=a[_];return d}function Hv(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var d=[];a=a.length;for(var f=0;f<a;f++)d.push(f);return d}d=[],f=0;for(const _ in a)d[f++]=_;return d}}}function Nd(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var f=Hv(a),_=Gv(a),V=_.length,M=0;M<V;M++)d.call(void 0,_[M],f&&f[M],a)}var Dd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Kv(a,d){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var _=a[f].indexOf("="),V=null;if(0<=_){var M=a[f].substring(0,_);V=a[f].substring(_+1)}else M=a[f];d(M,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function qn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof qn){this.h=a.h,Zi(this,a.j),this.o=a.o,this.g=a.g,eo(this,a.s),this.l=a.l;var d=a.i,f=new Ls;f.i=d.i,d.g&&(f.g=new Map(d.g),f.h=d.h),Vd(this,f),this.m=a.m}else a&&(d=String(a).match(Dd))?(this.h=!1,Zi(this,d[1]||"",!0),this.o=Vs(d[2]||""),this.g=Vs(d[3]||"",!0),eo(this,d[4]),this.l=Vs(d[5]||"",!0),Vd(this,d[6]||"",!0),this.m=Vs(d[7]||"")):(this.h=!1,this.i=new Ls(null,this.h))}qn.prototype.toString=function(){var a=[],d=this.j;d&&a.push(Os(d,Od,!0),":");var f=this.g;return(f||d=="file")&&(a.push("//"),(d=this.o)&&a.push(Os(d,Od,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Os(f,f.charAt(0)=="/"?Yv:Qv,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Os(f,Xv)),a.join("")};function zt(a){return new qn(a)}function Zi(a,d,f){a.j=f?Vs(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function eo(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Vd(a,d,f){d instanceof Ls?(a.i=d,Zv(a.i,a.h)):(f||(d=Os(d,Jv)),a.i=new Ls(d,a.h))}function Se(a,d,f){a.i.set(d,f)}function to(a){return Se(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Vs(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Os(a,d,f){return typeof a=="string"?(a=encodeURI(a).replace(d,Wv),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Wv(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Od=/[#\/\?@]/g,Qv=/[#\?:]/g,Yv=/[#\?]/g,Jv=/[#\?@]/g,Xv=/#/g;function Ls(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function on(a){a.g||(a.g=new Map,a.h=0,a.i&&Kv(a.i,function(d,f){a.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}n=Ls.prototype,n.add=function(a,d){on(this),this.i=null,a=Pr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(d),this.h+=1,this};function Ld(a,d){on(a),d=Pr(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function Md(a,d){return on(a),d=Pr(a,d),a.g.has(d)}n.forEach=function(a,d){on(this),this.g.forEach(function(f,_){f.forEach(function(V){a.call(d,V,_,this)},this)},this)},n.na=function(){on(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),f=[];for(let _=0;_<d.length;_++){const V=a[_];for(let M=0;M<V.length;M++)f.push(d[_])}return f},n.V=function(a){on(this);let d=[];if(typeof a=="string")Md(this,a)&&(d=d.concat(this.g.get(Pr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)d=d.concat(a[f])}return d},n.set=function(a,d){return on(this),this.i=null,a=Pr(this,a),Md(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},n.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function Fd(a,d,f){Ld(a,d),0<f.length&&(a.i=null,a.g.set(Pr(a,d),P(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var f=0;f<d.length;f++){var _=d[f];const M=encodeURIComponent(String(_)),Q=this.V(_);for(_=0;_<Q.length;_++){var V=M;Q[_]!==""&&(V+="="+encodeURIComponent(String(Q[_]))),a.push(V)}}return this.i=a.join("&")};function Pr(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function Zv(a,d){d&&!a.j&&(on(a),a.i=null,a.g.forEach(function(f,_){var V=_.toLowerCase();_!=V&&(Ld(this,_),Fd(this,V,f))},a)),a.j=d}function ey(a,d){const f=new Ns;if(c.Image){const _=new Image;_.onload=T(an,f,"TestLoadImage: loaded",!0,d,_),_.onerror=T(an,f,"TestLoadImage: error",!1,d,_),_.onabort=T(an,f,"TestLoadImage: abort",!1,d,_),_.ontimeout=T(an,f,"TestLoadImage: timeout",!1,d,_),c.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else d(!1)}function ty(a,d){const f=new Ns,_=new AbortController,V=setTimeout(()=>{_.abort(),an(f,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:_.signal}).then(M=>{clearTimeout(V),M.ok?an(f,"TestPingServer: ok",!0,d):an(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(V),an(f,"TestPingServer: error",!1,d)})}function an(a,d,f,_,V){try{V&&(V.onload=null,V.onerror=null,V.onabort=null,V.ontimeout=null),_(f)}catch{}}function ny(){this.g=new Fv}function ry(a,d,f){const _=f||"";try{Nd(a,function(V,M){let Q=V;h(V)&&(Q=hc(V)),d.push(_+M+"="+encodeURIComponent(Q))})}catch(V){throw d.push(_+"type="+encodeURIComponent("_badmap")),V}}function no(a){this.l=a.Ub||null,this.j=a.eb||!1}R(no,fc),no.prototype.g=function(){return new ro(this.l,this.j)},no.prototype.i=function(a){return function(){return a}}({});function ro(a,d){We.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(ro,We),n=ro.prototype,n.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,Fs(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||c).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ms(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Fs(this)),this.g&&(this.readyState=3,Fs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ud(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ud(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?Ms(this):Fs(this),this.readyState==3&&Ud(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ms(this))},n.Qa=function(a){this.g&&(this.response=a,Ms(this))},n.ga=function(){this.g&&Ms(this)};function Ms(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Fs(a)}n.setRequestHeader=function(a,d){this.u.append(a,d)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=d.next();return a.join(`\r
`)};function Fs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ro.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Bd(a){let d="";return U(a,function(f,_){d+=_,d+=":",d+=f,d+=`\r
`}),d}function Ec(a,d,f){e:{for(_ in f){var _=!1;break e}_=!0}_||(f=Bd(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):Se(a,d,f))}function Le(a){We.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(Le,We);var sy=/^https?$/i,iy=["POST","PUT"];n=Le.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,d,f,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():gc.g(),this.v=this.o?md(this.o):md(gc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(M){$d(this,M);return}if(a=f||"",f=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var V in _)f.set(V,_[V]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const M of _.keys())f.set(M,_.get(M));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(f.keys()).find(M=>M.toLowerCase()=="content-type"),V=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(iy,d,void 0))||_||V||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[M,Q]of f)this.g.setRequestHeader(M,Q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{zd(this),this.u=!0,this.g.send(a),this.u=!1}catch(M){$d(this,M)}};function $d(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,qd(a),so(a)}function qd(a){a.A||(a.A=!0,rt(a,"complete"),rt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,rt(this,"complete"),rt(this,"abort"),so(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),so(this,!0)),Le.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?jd(this):this.bb())},n.bb=function(){jd(this)};function jd(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Gt(a)!=4||a.Z()!=2)){if(a.u&&Gt(a)==4)dd(a.Ea,0,a);else if(rt(a,"readystatechange"),Gt(a)==4){a.h=!1;try{const Q=a.Z();e:switch(Q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var _;if(_=Q===0){var V=String(a.D).match(Dd)[1]||null;!V&&c.self&&c.self.location&&(V=c.self.location.protocol.slice(0,-1)),_=!sy.test(V?V.toLowerCase():"")}f=_}if(f)rt(a,"complete"),rt(a,"success");else{a.m=6;try{var M=2<Gt(a)?a.g.statusText:""}catch{M=""}a.l=M+" ["+a.Z()+"]",qd(a)}}finally{so(a)}}}}function so(a,d){if(a.g){zd(a);const f=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||rt(a,"ready");try{f.onreadystatechange=_}catch{}}}function zd(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Gt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Gt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),Mv(d)}};function Gd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function oy(a){const d={};a=(a.g&&2<=Gt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(C(a[_]))continue;var f=b(a[_]);const V=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const M=d[V]||[];d[V]=M,M.push(f)}I(d,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Us(a,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||d}function Hd(a){this.Aa=0,this.i=[],this.j=new Ns,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Us("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Us("baseRetryDelayMs",5e3,a),this.cb=Us("retryDelaySeedMs",1e4,a),this.Wa=Us("forwardChannelMaxRetries",2,a),this.wa=Us("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Rd(a&&a.concurrentRequestLimit),this.Da=new ny,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Hd.prototype,n.la=8,n.G=1,n.connect=function(a,d,f,_){st(0),this.W=a,this.H=d||{},f&&_!==void 0&&(this.H.OSID=f,this.H.OAID=_),this.F=this.X,this.I=th(this,null,this.W),oo(this)};function Tc(a){if(Kd(a),a.G==3){var d=a.U++,f=zt(a.I);if(Se(f,"SID",a.K),Se(f,"RID",d),Se(f,"TYPE","terminate"),Bs(a,f),d=new sn(a,a.j,d),d.L=2,d.v=to(zt(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(d.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=d.v,f=!0),f||(d.g=nh(d.j,null),d.g.ea(d.v)),d.F=Date.now(),Xi(d)}eh(a)}function io(a){a.g&&(Sc(a),a.g.cancel(),a.g=null)}function Kd(a){io(a),a.u&&(c.clearTimeout(a.u),a.u=null),ao(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function oo(a){if(!Cd(a.h)&&!a.s){a.s=!0;var d=a.Ga;ve||z(),Fe||(ve(),Fe=!0),x.add(d,a),a.B=0}}function ay(a,d){return Pd(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=xs(g(a.Ga,a,d),Zd(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const V=new sn(this,this.j,a);let M=this.o;if(this.S&&(M?(M=v(M),E(M,this.S)):M=this.S),this.m!==null||this.O||(V.H=M,M=null),this.P)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var _=this.i[f];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(d+=_,4096<d){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=Qd(this,V,d),f=zt(this.I),Se(f,"RID",a),Se(f,"CVER",22),this.D&&Se(f,"X-HTTP-Session-Id",this.D),Bs(this,f),M&&(this.O?d="headers="+encodeURIComponent(String(Bd(M)))+"&"+d:this.m&&Ec(f,this.m,M)),Ic(this.h,V),this.Ua&&Se(f,"TYPE","init"),this.P?(Se(f,"$req",d),Se(f,"SID","null"),V.T=!0,vc(V,f,null)):vc(V,f,d),this.G=2}}else this.G==3&&(a?Wd(this,a):this.i.length==0||Cd(this.h)||Wd(this))};function Wd(a,d){var f;d?f=d.l:f=a.U++;const _=zt(a.I);Se(_,"SID",a.K),Se(_,"RID",f),Se(_,"AID",a.T),Bs(a,_),a.m&&a.o&&Ec(_,a.m,a.o),f=new sn(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),d&&(a.i=d.D.concat(a.i)),d=Qd(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Ic(a.h,f),vc(f,_,d)}function Bs(a,d){a.H&&U(a.H,function(f,_){Se(d,_,f)}),a.l&&Nd({},function(f,_){Se(d,_,f)})}function Qd(a,d,f){f=Math.min(a.i.length,f);var _=a.l?g(a.l.Na,a.l,a):null;e:{var V=a.i;let M=-1;for(;;){const Q=["count="+f];M==-1?0<f?(M=V[0].g,Q.push("ofs="+M)):M=0:Q.push("ofs="+M);let Ae=!0;for(let He=0;He<f;He++){let be=V[He].g;const Qe=V[He].map;if(be-=M,0>be)M=Math.max(0,V[He].g-100),Ae=!1;else try{ry(Qe,Q,"req"+be+"_")}catch{_&&_(Qe)}}if(Ae){_=Q.join("&");break e}}}return a=a.i.splice(0,f),d.D=a,_}function Yd(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;ve||z(),Fe||(ve(),Fe=!0),x.add(d,a),a.v=0}}function Ac(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=xs(g(a.Fa,a),Zd(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Jd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=xs(g(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,st(10),io(this),Jd(this))};function Sc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Jd(a){a.g=new sn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=zt(a.qa);Se(d,"RID","rpc"),Se(d,"SID",a.K),Se(d,"AID",a.T),Se(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&Se(d,"TO",a.ja),Se(d,"TYPE","xmlhttp"),Bs(a,d),a.m&&a.o&&Ec(d,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=to(zt(d)),f.m=null,f.P=!0,Td(f,a)}n.Za=function(){this.C!=null&&(this.C=null,io(this),Ac(this),st(19))};function ao(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Xd(a,d){var f=null;if(a.g==d){ao(a),Sc(a),a.g=null;var _=2}else if(wc(a.h,d))f=d.D,kd(a.h,d),_=1;else return;if(a.G!=0){if(d.o)if(_==1){f=d.m?d.m.length:0,d=Date.now()-d.F;var V=a.B;_=Qi(),rt(_,new bd(_,f)),oo(a)}else Yd(a);else if(V=d.s,V==3||V==0&&0<d.X||!(_==1&&ay(a,d)||_==2&&Ac(a)))switch(f&&0<f.length&&(d=a.h,d.i=d.i.concat(f)),V){case 1:jn(a,5);break;case 4:jn(a,10);break;case 3:jn(a,6);break;default:jn(a,2)}}}function Zd(a,d){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*d}function jn(a,d){if(a.j.info("Error code "+d),d==2){var f=g(a.fb,a),_=a.Xa;const V=!_;_=new qn(_||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Zi(_,"https"),to(_),V?ey(_.toString(),f):ty(_.toString(),f)}else st(2);a.G=0,a.l&&a.l.sa(d),eh(a),Kd(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),st(2)):(this.j.info("Failed to ping google.com"),st(1))};function eh(a){if(a.G=0,a.ka=[],a.l){const d=xd(a.h);(d.length!=0||a.i.length!=0)&&(A(a.ka,d),A(a.ka,a.i),a.h.i.length=0,P(a.i),a.i.length=0),a.l.ra()}}function th(a,d,f){var _=f instanceof qn?zt(f):new qn(f);if(_.g!="")d&&(_.g=d+"."+_.g),eo(_,_.s);else{var V=c.location;_=V.protocol,d=d?d+"."+V.hostname:V.hostname,V=+V.port;var M=new qn(null);_&&Zi(M,_),d&&(M.g=d),V&&eo(M,V),f&&(M.l=f),_=M}return f=a.D,d=a.ya,f&&d&&Se(_,f,d),Se(_,"VER",a.la),Bs(a,_),_}function nh(a,d,f){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Le(new no({eb:f})):new Le(a.pa),d.Ha(a.J),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function rh(){}n=rh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function co(){}co.prototype.g=function(a,d){return new ft(a,d)};function ft(a,d){We.call(this),this.g=new Hd(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!C(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!C(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new kr(this)}R(ft,We),ft.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ft.prototype.close=function(){Tc(this.g)},ft.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=hc(a),a=f);d.i.push(new zv(d.Ya++,a)),d.G==3&&oo(d)},ft.prototype.N=function(){this.g.l=null,delete this.j,Tc(this.g),delete this.g,ft.aa.N.call(this)};function sh(a){pc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const f in d){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}R(sh,pc);function ih(){mc.call(this),this.status=1}R(ih,mc);function kr(a){this.g=a}R(kr,rh),kr.prototype.ua=function(){rt(this.g,"a")},kr.prototype.ta=function(a){rt(this.g,new sh(a))},kr.prototype.sa=function(a){rt(this.g,new ih)},kr.prototype.ra=function(){rt(this.g,"b")},co.prototype.createWebChannel=co.prototype.g,ft.prototype.send=ft.prototype.o,ft.prototype.open=ft.prototype.m,ft.prototype.close=ft.prototype.close,Pm=function(){return new co},Cm=function(){return Qi()},Rm=Bn,nl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Yi.NO_ERROR=0,Yi.TIMEOUT=8,Yi.HTTP_ERROR=6,No=Yi,wd.COMPLETE="complete",Sm=wd,gd.EventType=Ps,Ps.OPEN="a",Ps.CLOSE="b",Ps.ERROR="c",Ps.MESSAGE="d",We.prototype.listen=We.prototype.K,Qs=gd,Le.prototype.listenOnce=Le.prototype.L,Le.prototype.getLastError=Le.prototype.Ka,Le.prototype.getLastErrorCode=Le.prototype.Ba,Le.prototype.getStatus=Le.prototype.Z,Le.prototype.getResponseJson=Le.prototype.Oa,Le.prototype.getResponseText=Le.prototype.oa,Le.prototype.send=Le.prototype.ea,Le.prototype.setWithCredentials=Le.prototype.Ha,Am=Le}).apply(typeof ho<"u"?ho:typeof self<"u"?self:typeof window<"u"?window:{});const Mh="@firebase/firestore",Fh="4.7.7";/**
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
 */class it{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}it.UNAUTHENTICATED=new it(null),it.GOOGLE_CREDENTIALS=new it("google-credentials-uid"),it.FIRST_PARTY=new it("first-party-uid"),it.MOCK_USER=new it("mock-user");/**
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
 */let Ts="11.3.0";/**
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
 */const dr=new ka("@firebase/firestore");function Fr(){return dr.logLevel}function G(n,...e){if(dr.logLevel<=me.DEBUG){const t=e.map(Jl);dr.debug(`Firestore (${Ts}): ${n}`,...t)}}function ot(n,...e){if(dr.logLevel<=me.ERROR){const t=e.map(Jl);dr.error(`Firestore (${Ts}): ${n}`,...t)}}function pi(n,...e){if(dr.logLevel<=me.WARN){const t=e.map(Jl);dr.warn(`Firestore (${Ts}): ${n}`,...t)}}function Jl(n){if(typeof n=="string")return n;try{/**
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
 */function ee(n="Unexpected state"){const e=`FIRESTORE (${Ts}) INTERNAL ASSERTION FAILED: `+n;throw ot(e),new Error(e)}function te(n,e){n||ee()}function ue(n,e){return n}/**
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
 */const F={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class K extends $t{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Ft{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class sE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class iE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(it.UNAUTHENTICATED))}shutdown(){}}class oE{constructor(e){this.t=e,this.currentUser=it.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){te(this.o===void 0);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new Ft;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ft,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{G("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(G("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ft)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(G("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(te(typeof r.accessToken=="string"),new sE(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return te(e===null||typeof e=="string"),new it(e)}}class aE{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=it.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class cE{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new aE(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(it.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Uh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class lE{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,wt(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){te(this.o===void 0);const r=i=>{i.error!=null&&G("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,G("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{G("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):G("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new Uh(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(te(typeof t.token=="string"),this.R=t.token,new Uh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function uE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function rl(){return new TextEncoder}/**
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
 */class km{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=uE(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function le(n,e){return n<e?-1:n>e?1:0}function sl(n,e){const t=rl().encode(n),r=rl().encode(e);for(let s=0;s<Math.min(t.length,r.length);s++){const i=le(t[s],r[s]);if(i!==0)return i}return le(t.length,r.length)}function ts(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function xm(n){return n+"\0"}/**
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
 */const Bh=-62135596800,$h=1e6;class De{static now(){return De.fromMillis(Date.now())}static fromDate(e){return De.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*$h);return new De(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new K(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new K(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Bh)throw new K(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new K(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/$h}_compareTo(e){return this.seconds===e.seconds?le(this.nanoseconds,e.nanoseconds):le(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-Bh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class se{static fromTimestamp(e){return new se(e)}static min(){return new se(new De(0,0))}static max(){return new se(new De(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const qh="__name__";class Nt{constructor(e,t,r){t===void 0?t=0:t>e.length&&ee(),r===void 0?r=e.length-t:r>e.length-t&&ee(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Nt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Nt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Nt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return le(e.length,t.length)}static compareSegments(e,t){const r=Nt.isNumericId(e),s=Nt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Nt.extractNumericId(e).compare(Nt.extractNumericId(t)):sl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return In.fromString(e.substring(4,e.length-2))}}class we extends Nt{construct(e,t,r){return new we(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new K(F.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new we(t)}static emptyPath(){return new we([])}}const dE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ne extends Nt{construct(e,t,r){return new Ne(e,t,r)}static isValidIdentifier(e){return dE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ne.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===qh}static keyField(){return new Ne([qh])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new K(F.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new K(F.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new K(F.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new K(F.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ne(t)}static emptyPath(){return new Ne([])}}/**
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
 */class J{constructor(e){this.path=e}static fromPath(e){return new J(we.fromString(e))}static fromName(e){return new J(we.fromString(e).popFirst(5))}static empty(){return new J(we.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&we.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return we.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new J(new we(e.slice()))}}/**
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
 */const mi=-1;class Zo{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function il(n){return n.fields.find(e=>e.kind===2)}function Wn(n){return n.fields.filter(e=>e.kind!==2)}Zo.UNKNOWN_ID=-1;class Do{constructor(e,t){this.fieldPath=e,this.kind=t}}class gi{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new gi(0,_t.min())}}function hE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=se.fromTimestamp(r===1e9?new De(t+1,0):new De(t,r));return new _t(s,J.empty(),e)}function Nm(n){return new _t(n.readTime,n.key,mi)}class _t{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new _t(se.min(),J.empty(),mi)}static max(){return new _t(se.max(),J.empty(),mi)}}function Xl(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=J.comparator(n.documentKey,e.documentKey),t!==0?t:le(n.largestBatchId,e.largestBatchId))}/**
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
 */const Dm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Vm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Ir(n){if(n.code!==F.FAILED_PRECONDITION||n.message!==Dm)throw n;G("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ee(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):D.reject(t)}static resolve(e){return new D((t,r)=>{t(e)})}static reject(e){return new D((t,r)=>{r(e)})}static waitFor(e){return new D((t,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},l=>r(l))}),o=!0,i===s&&t()})}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next(s=>s?D.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new D((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next(p=>{o[h]=p,++c,c===i&&r(o)},p=>s(p))}})}static doWhile(e,t){return new D((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}/**
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
 */const mt="SimpleDb";class Oa{static open(e,t,r,s){try{return new Oa(t,e.transaction(s,r))}catch(i){throw new ti(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new Ft,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new ti(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const s=Zl(r.target.error);this.m.reject(new ti(e,s))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(G(mt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new pE(t)}}class En{static delete(e){return G(mt,"Removing database:",e),Xn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Pa())return!1;if(En.v())return!0;const e=je(),t=En.C(e),r=0<t&&t<10,s=Om(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,En.C(je())===12.2&&ot("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(G(mt,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new ti(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new K(F.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new K(F.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new ti(e,o))},s.onupgradeneeded=i=>{G(mt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.O.B(o,s.transaction,i.oldVersion,this.version).next(()=>{G(mt,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.N(e);const c=Oa.open(this.db,e,i?"readonly":"readwrite",r),l=s(c).next(h=>(c.S(),h)).catch(h=>(c.abort(h),D.reject(h))).toPromise();return l.catch(()=>{}),await c.p,l}catch(c){const l=c,h=l.name!=="FirebaseError"&&o<3;if(G(mt,"Transaction failed with error:",l.message,"Retrying:",h),this.close(),!h)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Om(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class fE{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return Xn(this.q.delete())}}class ti extends K{constructor(e,t){super(F.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Dn(n){return n.name==="IndexedDbTransactionError"}class pE{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(G(mt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(G(mt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Xn(r)}add(e){return G(mt,"ADD",this.store.name,e,e),Xn(this.store.add(e))}get(e){return Xn(this.store.get(e)).next(t=>(t===void 0&&(t=null),G(mt,"GET",this.store.name,e,t),t))}delete(e){return G(mt,"DELETE",this.store.name,e),Xn(this.store.delete(e))}count(){return G(mt,"COUNT",this.store.name),Xn(this.store.count())}G(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new D((o,c)=>{i.onerror=l=>{c(l.target.error)},i.onsuccess=l=>{o(l.target.result)}})}{const i=this.cursor(r),o=[];return this.j(i,(c,l)=>{o.push(l)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new D((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}J(e,t){G(mt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.j(s,(i,o,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.j(s,t)}X(e){const t=this.cursor({});return new D((r,s)=>{t.onerror=i=>{const o=Zl(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}j(e,t){const r=[];return new D((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const l=new fE(c),h=t(c.primaryKey,c.value,l);if(h instanceof D){const p=h.catch(m=>(l.done(),D.reject(m)));r.push(p)}l.isDone?s():l.K===null?c.continue():c.continue(l.K)}}).next(()=>D.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Xn(n){return new D((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=Zl(r.target.error);t(s)}})}let jh=!1;function Zl(n){const e=En.C(je());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new K("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return jh||(jh=!0,setTimeout(()=>{throw r},0)),r}}return n}const ni="IndexBackfiller";class mE{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){G(ni,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();G(ni,`Documents written: ${t}`)}catch(t){Dn(t)?G(ni,"Ignoring IndexedDB error during index backfill: ",t):await Ir(t)}await this.te(6e4)})}}class gE{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let s=t,i=!0;return D.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return G(ni,`Processing collection: ${o}`),this.ie(e,o,s).next(c=>{s-=c,r.add(o)});i=!1})).next(()=>t-s)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.se(s,i)).next(c=>(G(ni,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}se(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=Nm(i);Xl(o,r)>0&&(r=o)}),new _t(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class It{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}It.ae=-1;/**
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
 */const or=-1;function La(n){return n==null}function _i(n){return n===0&&1/n==-1/0}function _E(n){return typeof n=="number"&&Number.isInteger(n)&&!_i(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const ea="";function et(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=zh(e)),e=vE(n.get(t),e);return zh(e)}function vE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case ea:t+="";break;default:t+=i}}return t}function zh(n){return n+ea+""}function Vt(n){const e=n.length;if(te(e>=2),e===2)return te(n.charAt(0)===ea&&n.charAt(1)===""),we.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(ea,i);switch((o<0||o>t)&&ee(),n.charAt(o+1)){case"":const c=n.substring(i,o);let l;s.length===0?l=c:(s+=c,l=s,s=""),r.push(l);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:ee()}i=o+2}return new we(r)}/**
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
 */const Qn="remoteDocuments",Li="owner",Nr="owner",vi="mutationQueues",yE="userId",Rt="mutations",Gh="batchId",nr="userMutationsIndex",Hh=["userId","batchId"];/**
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
 */function Vo(n,e){return[n,et(e)]}function Lm(n,e,t){return[n,et(e),t]}const bE={},ns="documentMutations",ta="remoteDocumentsV14",wE=["prefixPath","collectionGroup","readTime","documentId"],Oo="documentKeyIndex",IE=["prefixPath","collectionGroup","documentId"],Mm="collectionGroupIndex",EE=["collectionGroup","readTime","prefixPath","documentId"],yi="remoteDocumentGlobal",ol="remoteDocumentGlobalKey",rs="targets",Fm="queryTargetsIndex",TE=["canonicalId","targetId"],ss="targetDocuments",AE=["targetId","path"],eu="documentTargetsIndex",SE=["path","targetId"],na="targetGlobalKey",ar="targetGlobal",bi="collectionParents",RE=["collectionId","parent"],is="clientMetadata",CE="clientId",Ma="bundles",PE="bundleId",Fa="namedQueries",kE="name",tu="indexConfiguration",xE="indexId",al="collectionGroupIndex",NE="collectionGroup",ra="indexState",DE=["indexId","uid"],Um="sequenceNumberIndex",VE=["uid","sequenceNumber"],sa="indexEntries",OE=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Bm="documentKeyIndex",LE=["indexId","uid","orderedDocumentKey"],Ua="documentOverlays",ME=["userId","collectionPath","documentId"],cl="collectionPathOverlayIndex",FE=["userId","collectionPath","largestBatchId"],$m="collectionGroupOverlayIndex",UE=["userId","collectionGroup","largestBatchId"],nu="globals",BE="name",qm=[vi,Rt,ns,Qn,rs,Li,ar,ss,is,yi,bi,Ma,Fa],$E=[...qm,Ua],jm=[vi,Rt,ns,ta,rs,Li,ar,ss,is,yi,bi,Ma,Fa,Ua],zm=jm,ru=[...zm,tu,ra,sa],qE=ru,jE=[...ru,nu];/**
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
 */class ll extends Vm{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function ze(n,e){const t=ue(n);return En.M(t.ue,e)}/**
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
 */function Kh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Vn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Gm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Pe{constructor(e,t){this.comparator=e,this.root=t||Ke.EMPTY}insert(e,t){return new Pe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ke.BLACK,null,null))}remove(e){return new Pe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ke.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new fo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new fo(this.root,e,this.comparator,!1)}getReverseIterator(){return new fo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new fo(this.root,e,this.comparator,!0)}}class fo{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ke{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ke.RED,this.left=s??Ke.EMPTY,this.right=i??Ke.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ke(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ke.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ke.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ke.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ke.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ee();const e=this.left.check();if(e!==this.right.check())throw ee();return e+(this.isRed()?0:1)}}Ke.EMPTY=null,Ke.RED=!0,Ke.BLACK=!1;Ke.EMPTY=new class{constructor(){this.size=0}get key(){throw ee()}get value(){throw ee()}get color(){throw ee()}get left(){throw ee()}get right(){throw ee()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ke(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ee{constructor(e){this.comparator=e,this.data=new Pe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Wh(this.data.getIterator())}getIteratorFrom(e){return new Wh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ee)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ee(this.comparator);return t.data=e,t}}class Wh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Dr(n){return n.hasNext()?n.getNext():void 0}/**
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
 */class lt{constructor(e){this.fields=e,e.sort(Ne.comparator)}static empty(){return new lt([])}unionWith(e){let t=new Ee(Ne.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new lt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ts(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Hm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class $e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Hm("Invalid base64 string: "+i):i}}(e);return new $e(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new $e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return le(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}$e.EMPTY_BYTE_STRING=new $e("");const zE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Zt(n){if(te(!!n),typeof n=="string"){let e=0;const t=zE.exec(n);if(te(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ce(n.seconds),nanos:Ce(n.nanos)}}function Ce(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function en(n){return typeof n=="string"?$e.fromBase64String(n):$e.fromUint8Array(n)}/**
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
 */const Km="server_timestamp",Wm="__type__",Qm="__previous_value__",Ym="__local_write_time__";function Ba(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Wm])===null||t===void 0?void 0:t.stringValue)===Km}function $a(n){const e=n.mapValue.fields[Qm];return Ba(e)?$a(e):e}function wi(n){const e=Zt(n.mapValue.fields[Ym].timestampValue);return new De(e.seconds,e.nanos)}/**
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
 */class GE{constructor(e,t,r,s,i,o,c,l,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h}}const ia="(default)";class hr{constructor(e,t){this.projectId=e,this.database=t||ia}static empty(){return new hr("","")}get isDefaultDatabase(){return this.database===ia}isEqual(e){return e instanceof hr&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const su="__type__",Jm="__max__",vn={mapValue:{fields:{__type__:{stringValue:Jm}}}},iu="__vector__",os="value",Lo={nullValue:"NULL_VALUE"};function An(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ba(n)?4:Xm(n)?9007199254740991:qa(n)?10:11:ee()}function Bt(n,e){if(n===e)return!0;const t=An(n);if(t!==An(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return wi(n).isEqual(wi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Zt(s.timestampValue),c=Zt(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return en(s.bytesValue).isEqual(en(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return Ce(s.geoPointValue.latitude)===Ce(i.geoPointValue.latitude)&&Ce(s.geoPointValue.longitude)===Ce(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ce(s.integerValue)===Ce(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ce(s.doubleValue),c=Ce(i.doubleValue);return o===c?_i(o)===_i(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return ts(n.arrayValue.values||[],e.arrayValue.values||[],Bt);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Kh(o)!==Kh(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!Bt(o[l],c[l])))return!1;return!0}(n,e);default:return ee()}}function Ii(n,e){return(n.values||[]).find(t=>Bt(t,e))!==void 0}function Sn(n,e){if(n===e)return 0;const t=An(n),r=An(e);if(t!==r)return le(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return le(n.booleanValue,e.booleanValue);case 2:return function(i,o){const c=Ce(i.integerValue||i.doubleValue),l=Ce(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Qh(n.timestampValue,e.timestampValue);case 4:return Qh(wi(n),wi(e));case 5:return sl(n.stringValue,e.stringValue);case 6:return function(i,o){const c=en(i),l=en(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),l=o.split("/");for(let h=0;h<c.length&&h<l.length;h++){const p=le(c[h],l[h]);if(p!==0)return p}return le(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,o){const c=le(Ce(i.latitude),Ce(o.latitude));return c!==0?c:le(Ce(i.longitude),Ce(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Yh(n.arrayValue,e.arrayValue);case 10:return function(i,o){var c,l,h,p;const m=i.fields||{},g=o.fields||{},T=(c=m[os])===null||c===void 0?void 0:c.arrayValue,R=(l=g[os])===null||l===void 0?void 0:l.arrayValue,P=le(((h=T?.values)===null||h===void 0?void 0:h.length)||0,((p=R?.values)===null||p===void 0?void 0:p.length)||0);return P!==0?P:Yh(T,R)}(n.mapValue,e.mapValue);case 11:return function(i,o){if(i===vn.mapValue&&o===vn.mapValue)return 0;if(i===vn.mapValue)return 1;if(o===vn.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=o.fields||{},p=Object.keys(h);l.sort(),p.sort();for(let m=0;m<l.length&&m<p.length;++m){const g=sl(l[m],p[m]);if(g!==0)return g;const T=Sn(c[l[m]],h[p[m]]);if(T!==0)return T}return le(l.length,p.length)}(n.mapValue,e.mapValue);default:throw ee()}}function Qh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return le(n,e);const t=Zt(n),r=Zt(e),s=le(t.seconds,r.seconds);return s!==0?s:le(t.nanos,r.nanos)}function Yh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Sn(t[s],r[s]);if(i)return i}return le(t.length,r.length)}function as(n){return ul(n)}function ul(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Zt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return en(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return J.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ul(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${ul(t.fields[o])}`;return s+"}"}(n.mapValue):ee()}function Mo(n){switch(An(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=$a(n);return e?16+Mo(e):16;case 5:return 2*n.stringValue.length;case 6:return en(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Mo(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Vn(r.fields,(i,o)=>{s+=i.length+Mo(o)}),s}(n.mapValue);default:throw ee()}}function fr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function dl(n){return!!n&&"integerValue"in n}function Ei(n){return!!n&&"arrayValue"in n}function Jh(n){return!!n&&"nullValue"in n}function Xh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Fo(n){return!!n&&"mapValue"in n}function qa(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[su])===null||t===void 0?void 0:t.stringValue)===iu}function ri(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Vn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ri(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ri(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Xm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Jm}const Zm={mapValue:{fields:{[su]:{stringValue:iu},[os]:{arrayValue:{}}}}};function HE(n){return"nullValue"in n?Lo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?fr(hr.empty(),J.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?qa(n)?Zm:{mapValue:{}}:ee()}function KE(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?fr(hr.empty(),J.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Zm:"mapValue"in n?qa(n)?{mapValue:{}}:vn:ee()}function Zh(n,e){const t=Sn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function ef(n,e){const t=Sn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
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
 */class Ze{constructor(e){this.value=e}static empty(){return new Ze({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Fo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ri(t)}setAll(e){let t=Ne.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=ri(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Fo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Bt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Fo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Vn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ze(ri(this.value))}}function eg(n){const e=[];return Vn(n.fields,(t,r)=>{const s=new Ne([t]);if(Fo(r)){const i=eg(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new lt(e)}/**
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
 */class Me{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Me(e,0,se.min(),se.min(),se.min(),Ze.empty(),0)}static newFoundDocument(e,t,r,s){return new Me(e,1,t,se.min(),r,s,0)}static newNoDocument(e,t){return new Me(e,2,t,se.min(),se.min(),Ze.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,se.min(),se.min(),Ze.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(se.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ze.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ze.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=se.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Rn{constructor(e,t){this.position=e,this.inclusive=t}}function tf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=J.comparator(J.fromName(o.referenceValue),t.key):r=Sn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function nf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Bt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ti{constructor(e,t="asc"){this.field=e,this.dir=t}}function WE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class tg{}class ge extends tg{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new QE(e,t,r):t==="array-contains"?new XE(e,r):t==="in"?new ag(e,r):t==="not-in"?new ZE(e,r):t==="array-contains-any"?new eT(e,r):new ge(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new YE(e,r):new JE(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Sn(t,this.value)):t!==null&&An(this.value)===An(t)&&this.matchesComparison(Sn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ie extends tg{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new Ie(e,t)}matches(e){return cs(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function cs(n){return n.op==="and"}function hl(n){return n.op==="or"}function ou(n){return ng(n)&&cs(n)}function ng(n){for(const e of n.filters)if(e instanceof Ie)return!1;return!0}function fl(n){if(n instanceof ge)return n.field.canonicalString()+n.op.toString()+as(n.value);if(ou(n))return n.filters.map(e=>fl(e)).join(",");{const e=n.filters.map(t=>fl(t)).join(",");return`${n.op}(${e})`}}function rg(n,e){return n instanceof ge?function(r,s){return s instanceof ge&&r.op===s.op&&r.field.isEqual(s.field)&&Bt(r.value,s.value)}(n,e):n instanceof Ie?function(r,s){return s instanceof Ie&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&rg(o,s.filters[c]),!0):!1}(n,e):void ee()}function sg(n,e){const t=n.filters.concat(e);return Ie.create(t,n.op)}function ig(n){return n instanceof ge?function(t){return`${t.field.canonicalString()} ${t.op} ${as(t.value)}`}(n):n instanceof Ie?function(t){return t.op.toString()+" {"+t.getFilters().map(ig).join(" ,")+"}"}(n):"Filter"}class QE extends ge{constructor(e,t,r){super(e,t,r),this.key=J.fromName(r.referenceValue)}matches(e){const t=J.comparator(e.key,this.key);return this.matchesComparison(t)}}class YE extends ge{constructor(e,t){super(e,"in",t),this.keys=og("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class JE extends ge{constructor(e,t){super(e,"not-in",t),this.keys=og("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function og(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>J.fromName(r.referenceValue))}class XE extends ge{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ei(t)&&Ii(t.arrayValue,this.value)}}class ag extends ge{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ii(this.value.arrayValue,t)}}class ZE extends ge{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ii(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ii(this.value.arrayValue,t)}}class eT extends ge{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ei(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ii(this.value.arrayValue,r))}}/**
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
 */class tT{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.le=null}}function pl(n,e=null,t=[],r=[],s=null,i=null,o=null){return new tT(n,e,t,r,s,i,o)}function pr(n){const e=ue(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>fl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),La(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>as(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>as(r)).join(",")),e.le=t}return e.le}function Mi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!WE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!rg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!nf(n.startAt,e.startAt)&&nf(n.endAt,e.endAt)}function oa(n){return J.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function aa(n,e){return n.filters.filter(t=>t instanceof ge&&t.field.isEqual(e))}function rf(n,e,t){let r=Lo,s=!0;for(const i of aa(n,e)){let o=Lo,c=!0;switch(i.op){case"<":case"<=":o=HE(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Lo}Zh({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Zh({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function sf(n,e,t){let r=vn,s=!0;for(const i of aa(n,e)){let o=vn,c=!0;switch(i.op){case">=":case">":o=KE(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=vn}ef({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];ef({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
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
 */class Er{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function nT(n,e,t,r,s,i,o,c){return new Er(n,e,t,r,s,i,o,c)}function Fi(n){return new Er(n)}function of(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function au(n){return n.collectionGroup!==null}function Qr(n){const e=ue(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Ee(Ne.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new Ti(i,r))}),t.has(Ne.keyField().canonicalString())||e.he.push(new Ti(Ne.keyField(),r))}return e.he}function Et(n){const e=ue(n);return e.Pe||(e.Pe=rT(e,Qr(n))),e.Pe}function rT(n,e){if(n.limitType==="F")return pl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ti(s.field,i)});const t=n.endAt?new Rn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Rn(n.startAt.position,n.startAt.inclusive):null;return pl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ml(n,e){const t=n.filters.concat([e]);return new Er(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ca(n,e,t){return new Er(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ja(n,e){return Mi(Et(n),Et(e))&&n.limitType===e.limitType}function cg(n){return`${pr(Et(n))}|lt:${n.limitType}`}function Ur(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>ig(s)).join(", ")}]`),La(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>as(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>as(s)).join(",")),`Target(${r})`}(Et(n))}; limitType=${n.limitType})`}function Ui(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):J.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Qr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,l){const h=tf(o,c,l);return o.inclusive?h<=0:h<0}(r.startAt,Qr(r),s)||r.endAt&&!function(o,c,l){const h=tf(o,c,l);return o.inclusive?h>=0:h>0}(r.endAt,Qr(r),s))}(n,e)}function sT(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function lg(n){return(e,t)=>{let r=!1;for(const s of Qr(n)){const i=iT(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function iT(n,e,t){const r=n.field.isKeyField()?J.comparator(e.key,t.key):function(i,o,c){const l=o.data.field(i),h=c.data.field(i);return l!==null&&h!==null?Sn(l,h):ee()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return ee()}}/**
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
 */class nn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Vn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Gm(this.inner)}size(){return this.innerSize}}/**
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
 */const oT=new Pe(J.comparator);function gt(){return oT}const ug=new Pe(J.comparator);function Ys(...n){let e=ug;for(const t of n)e=e.insert(t.key,t);return e}function dg(n){let e=ug;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Ot(){return si()}function hg(){return si()}function si(){return new nn(n=>n.toString(),(n,e)=>n.isEqual(e))}const aT=new Pe(J.comparator),cT=new Ee(J.comparator);function pe(...n){let e=cT;for(const t of n)e=e.add(t);return e}const lT=new Ee(le);function uT(){return lT}/**
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
 */function cu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_i(e)?"-0":e}}function fg(n){return{integerValue:""+n}}function pg(n,e){return _E(e)?fg(e):cu(n,e)}/**
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
 */class za{constructor(){this._=void 0}}function dT(n,e,t){return n instanceof Ai?function(s,i){const o={fields:{[Wm]:{stringValue:Km},[Ym]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ba(i)&&(i=$a(i)),i&&(o.fields[Qm]=i),{mapValue:o}}(t,e):n instanceof ls?gg(n,e):n instanceof us?_g(n,e):function(s,i){const o=mg(s,i),c=af(o)+af(s.Ie);return dl(o)&&dl(s.Ie)?fg(c):cu(s.serializer,c)}(n,e)}function hT(n,e,t){return n instanceof ls?gg(n,e):n instanceof us?_g(n,e):t}function mg(n,e){return n instanceof ds?function(r){return dl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Ai extends za{}class ls extends za{constructor(e){super(),this.elements=e}}function gg(n,e){const t=vg(e);for(const r of n.elements)t.some(s=>Bt(s,r))||t.push(r);return{arrayValue:{values:t}}}class us extends za{constructor(e){super(),this.elements=e}}function _g(n,e){let t=vg(e);for(const r of n.elements)t=t.filter(s=>!Bt(s,r));return{arrayValue:{values:t}}}class ds extends za{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function af(n){return Ce(n.integerValue||n.doubleValue)}function vg(n){return Ei(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class yg{constructor(e,t){this.field=e,this.transform=t}}function fT(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof ls&&s instanceof ls||r instanceof us&&s instanceof us?ts(r.elements,s.elements,Bt):r instanceof ds&&s instanceof ds?Bt(r.Ie,s.Ie):r instanceof Ai&&s instanceof Ai}(n.transform,e.transform)}class pT{constructor(e,t){this.version=e,this.transformResults=t}}class at{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new at}static exists(e){return new at(void 0,e)}static updateTime(e){return new at(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Uo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ga{}function bg(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new lu(n.key,at.none()):new As(n.key,n.data,at.none());{const t=n.data,r=Ze.empty();let s=new Ee(Ne.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new rn(n.key,r,new lt(s.toArray()),at.none())}}function mT(n,e,t){n instanceof As?function(s,i,o){const c=s.value.clone(),l=lf(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof rn?function(s,i,o){if(!Uo(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=lf(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(wg(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function ii(n,e,t,r){return n instanceof As?function(i,o,c,l){if(!Uo(i.precondition,o))return c;const h=i.value.clone(),p=uf(i.fieldTransforms,l,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof rn?function(i,o,c,l){if(!Uo(i.precondition,o))return c;const h=uf(i.fieldTransforms,l,o),p=o.data;return p.setAll(wg(i)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(i,o,c){return Uo(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function gT(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=mg(r.transform,s||null);i!=null&&(t===null&&(t=Ze.empty()),t.set(r.field,i))}return t||null}function cf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ts(r,s,(i,o)=>fT(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class As extends Ga{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class rn extends Ga{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function wg(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function lf(n,e,t){const r=new Map;te(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,hT(o,c,t[s]))}return r}function uf(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,dT(i,o,e))}return r}class lu extends Ga{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ig extends Ga{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class uu{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&mT(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=ii(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=ii(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=hg();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const l=bg(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(se.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),pe())}isEqual(e){return this.batchId===e.batchId&&ts(this.mutations,e.mutations,(t,r)=>cf(t,r))&&ts(this.baseMutations,e.baseMutations,(t,r)=>cf(t,r))}}class du{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){te(e.mutations.length===r.length);let s=function(){return aT}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new du(e,t,r,s)}}/**
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
 */class hu{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class _T{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Be,_e;function vT(n){switch(n){case F.OK:return ee();case F.CANCELLED:case F.UNKNOWN:case F.DEADLINE_EXCEEDED:case F.RESOURCE_EXHAUSTED:case F.INTERNAL:case F.UNAVAILABLE:case F.UNAUTHENTICATED:return!1;case F.INVALID_ARGUMENT:case F.NOT_FOUND:case F.ALREADY_EXISTS:case F.PERMISSION_DENIED:case F.FAILED_PRECONDITION:case F.ABORTED:case F.OUT_OF_RANGE:case F.UNIMPLEMENTED:case F.DATA_LOSS:return!0;default:return ee()}}function Eg(n){if(n===void 0)return ot("GRPC error has no .code"),F.UNKNOWN;switch(n){case Be.OK:return F.OK;case Be.CANCELLED:return F.CANCELLED;case Be.UNKNOWN:return F.UNKNOWN;case Be.DEADLINE_EXCEEDED:return F.DEADLINE_EXCEEDED;case Be.RESOURCE_EXHAUSTED:return F.RESOURCE_EXHAUSTED;case Be.INTERNAL:return F.INTERNAL;case Be.UNAVAILABLE:return F.UNAVAILABLE;case Be.UNAUTHENTICATED:return F.UNAUTHENTICATED;case Be.INVALID_ARGUMENT:return F.INVALID_ARGUMENT;case Be.NOT_FOUND:return F.NOT_FOUND;case Be.ALREADY_EXISTS:return F.ALREADY_EXISTS;case Be.PERMISSION_DENIED:return F.PERMISSION_DENIED;case Be.FAILED_PRECONDITION:return F.FAILED_PRECONDITION;case Be.ABORTED:return F.ABORTED;case Be.OUT_OF_RANGE:return F.OUT_OF_RANGE;case Be.UNIMPLEMENTED:return F.UNIMPLEMENTED;case Be.DATA_LOSS:return F.DATA_LOSS;default:return ee()}}(_e=Be||(Be={}))[_e.OK=0]="OK",_e[_e.CANCELLED=1]="CANCELLED",_e[_e.UNKNOWN=2]="UNKNOWN",_e[_e.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",_e[_e.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",_e[_e.NOT_FOUND=5]="NOT_FOUND",_e[_e.ALREADY_EXISTS=6]="ALREADY_EXISTS",_e[_e.PERMISSION_DENIED=7]="PERMISSION_DENIED",_e[_e.UNAUTHENTICATED=16]="UNAUTHENTICATED",_e[_e.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",_e[_e.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",_e[_e.ABORTED=10]="ABORTED",_e[_e.OUT_OF_RANGE=11]="OUT_OF_RANGE",_e[_e.UNIMPLEMENTED=12]="UNIMPLEMENTED",_e[_e.INTERNAL=13]="INTERNAL",_e[_e.UNAVAILABLE=14]="UNAVAILABLE",_e[_e.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const yT=new In([4294967295,4294967295],0);function df(n){const e=rl().encode(n),t=new Tm;return t.update(e),new Uint8Array(t.digest())}function hf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new In([t,r],0),new In([s,i],0)]}class fu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Js(`Invalid padding: ${t}`);if(r<0)throw new Js(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Js(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Js(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=In.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(In.fromNumber(r)));return s.compare(yT)===1&&(s=new In([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=df(e),[r,s]=hf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);if(!this.Re(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new fu(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ee===0)return;const t=df(e),[r,s]=hf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Js extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ha{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Bi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ha(se.min(),s,new Pe(le),gt(),pe())}}class Bi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Bi(r,t,pe(),pe(),pe())}}/**
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
 */class Bo{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class Tg{constructor(e,t){this.targetId=e,this.ge=t}}class Ag{constructor(e,t,r=$e.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class ff{constructor(){this.pe=0,this.ye=pf(),this.we=$e.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=pe(),t=pe(),r=pe();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:ee()}}),new Bi(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=pf()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,te(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class bT{constructor(e){this.ke=e,this.qe=new Map,this.Qe=gt(),this.$e=po(),this.Ue=po(),this.Ke=new Pe(le)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:ee()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(oa(i))if(r===0){const o=new J(i.path);this.ze(t,o,Me.newNoDocument(o,se.min()))}else te(r===1);else{const o=this.et(t);if(o!==r){const c=this.tt(e),l=c?this.nt(c,e,o):1;if(l!==0){this.Ye(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,h)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=en(r).toUint8Array()}catch(l){if(l instanceof Hm)return pi("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new fu(o,s,i)}catch(l){return pi(l instanceof Js?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const o=this.ke.it(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,o)=>{const c=this.Xe(o);if(c){if(i.current&&oa(c.target)){const l=new J(c.target.path);this._t(l).has(o)||this.ut(o,l)||this.ze(o,l,Me.newNoDocument(l,e))}i.ve&&(t.set(o,i.Fe()),i.Me())}});let r=pe();this.Ue.forEach((i,o)=>{let c=!0;o.forEachWhile(l=>{const h=this.Xe(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.Qe.forEach((i,o)=>o.setReadTime(e));const s=new Ha(e,t,this.Ke,this.Qe,r);return this.Qe=gt(),this.$e=po(),this.Ue=po(),this.Ke=new Pe(le),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new ff,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new Ee(le),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new Ee(le),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||G("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new ff),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function po(){return new Pe(J.comparator)}function pf(){return new Pe(J.comparator)}const wT={asc:"ASCENDING",desc:"DESCENDING"},IT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ET={and:"AND",or:"OR"};class TT{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function gl(n,e){return n.useProto3Json||La(e)?e:{value:e}}function hs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Sg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function AT(n,e){return hs(n,e.toTimestamp())}function ct(n){return te(!!n),se.fromTimestamp(function(t){const r=Zt(t);return new De(r.seconds,r.nanos)}(n))}function pu(n,e){return _l(n,e).canonicalString()}function _l(n,e){const t=function(s){return new we(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Rg(n){const e=we.fromString(n);return te(Lg(e)),e}function la(n,e){return pu(n.databaseId,e.path)}function cr(n,e){const t=Rg(e);if(t.get(1)!==n.databaseId.projectId)throw new K(F.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new K(F.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new J(kg(t))}function Cg(n,e){return pu(n.databaseId,e)}function Pg(n){const e=Rg(n);return e.length===4?we.emptyPath():kg(e)}function vl(n){return new we(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function kg(n){return te(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function mf(n,e,t){return{name:la(n,e),fields:t.value.mapValue.fields}}function ST(n,e,t){const r=cr(n,e.name),s=ct(e.updateTime),i=e.createTime?ct(e.createTime):se.min(),o=new Ze({mapValue:{fields:e.fields}}),c=Me.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function RT(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:ee()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,p){return h.useProto3Json?(te(p===void 0||typeof p=="string"),$e.fromBase64String(p||"")):(te(p===void 0||p instanceof Buffer||p instanceof Uint8Array),$e.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){const p=h.code===void 0?F.UNKNOWN:Eg(h.code);return new K(p,h.message||"")}(o);t=new Ag(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=cr(n,r.document.name),i=ct(r.document.updateTime),o=r.document.createTime?ct(r.document.createTime):se.min(),c=new Ze({mapValue:{fields:r.document.fields}}),l=Me.newFoundDocument(s,i,o,c),h=r.targetIds||[],p=r.removedTargetIds||[];t=new Bo(h,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=cr(n,r.document),i=r.readTime?ct(r.readTime):se.min(),o=Me.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Bo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=cr(n,r.document),i=r.removedTargetIds||[];t=new Bo([],i,s,null)}else{if(!("filter"in e))return ee();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new _T(s,i),c=r.targetId;t=new Tg(c,o)}}return t}function ua(n,e){let t;if(e instanceof As)t={update:mf(n,e.key,e.value)};else if(e instanceof lu)t={delete:la(n,e.key)};else if(e instanceof rn)t={update:mf(n,e.key,e.data),updateMask:DT(e.fieldMask)};else{if(!(e instanceof Ig))return ee();t={verify:la(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof Ai)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ls)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof us)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ds)return{fieldPath:o.field.canonicalString(),increment:c.Ie};throw ee()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:AT(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee()}(n,e.precondition)),t}function yl(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?at.updateTime(ct(i.updateTime)):i.exists!==void 0?at.exists(i.exists):at.none()}(e.currentDocument):at.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let l=null;if("setToServerValue"in c)te(c.setToServerValue==="REQUEST_TIME"),l=new Ai;else if("appendMissingElements"in c){const p=c.appendMissingElements.values||[];l=new ls(p)}else if("removeAllFromArray"in c){const p=c.removeAllFromArray.values||[];l=new us(p)}else"increment"in c?l=new ds(o,c.increment):ee();const h=Ne.fromServerFormat(c.fieldPath);return new yg(h,l)}(n,s)):[];if(e.update){e.update.name;const s=cr(n,e.update.name),i=new Ze({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const h=l.fieldPaths||[];return new lt(h.map(p=>Ne.fromServerFormat(p)))}(e.updateMask);return new rn(s,i,o,t,r)}return new As(s,i,t,r)}if(e.delete){const s=cr(n,e.delete);return new lu(s,t)}if(e.verify){const s=cr(n,e.verify);return new Ig(s,t)}return ee()}function CT(n,e){return n&&n.length>0?(te(e!==void 0),n.map(t=>function(s,i){let o=s.updateTime?ct(s.updateTime):ct(i);return o.isEqual(se.min())&&(o=ct(i)),new pT(o,s.transformResults||[])}(t,e))):[]}function xg(n,e){return{documents:[Cg(n,e.path)]}}function Ng(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Cg(n,s);const i=function(h){if(h.length!==0)return Og(Ie.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(p=>function(g){return{field:Br(g.field),direction:kT(g.dir)}}(p))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=gl(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ht:t,parent:s}}function Dg(n){let e=Pg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){te(r===1);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=function(m){const g=Vg(m);return g instanceof Ie&&ou(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(g=>function(R){return new Ti($r(R.field),function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(m){let g;return g=typeof m=="object"?m.value:m,La(g)?null:g}(t.limit));let l=null;t.startAt&&(l=function(m){const g=!!m.before,T=m.values||[];return new Rn(T,g)}(t.startAt));let h=null;return t.endAt&&(h=function(m){const g=!m.before,T=m.values||[];return new Rn(T,g)}(t.endAt)),nT(e,s,o,i,c,"F",l,h)}function PT(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Vg(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=$r(t.unaryFilter.field);return ge.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=$r(t.unaryFilter.field);return ge.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=$r(t.unaryFilter.field);return ge.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=$r(t.unaryFilter.field);return ge.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ee()}}(n):n.fieldFilter!==void 0?function(t){return ge.create($r(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ee()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ie.create(t.compositeFilter.filters.map(r=>Vg(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ee()}}(t.compositeFilter.op))}(n):ee()}function kT(n){return wT[n]}function xT(n){return IT[n]}function NT(n){return ET[n]}function Br(n){return{fieldPath:n.canonicalString()}}function $r(n){return Ne.fromServerFormat(n.fieldPath)}function Og(n){return n instanceof ge?function(t){if(t.op==="=="){if(Xh(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NAN"}};if(Jh(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Xh(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NOT_NAN"}};if(Jh(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Br(t.field),op:xT(t.op),value:t.value}}}(n):n instanceof Ie?function(t){const r=t.getFilters().map(s=>Og(s));return r.length===1?r[0]:{compositeFilter:{op:NT(t.op),filters:r}}}(n):ee()}function DT(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Lg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Qt{constructor(e,t,r,s,i=se.min(),o=se.min(),c=$e.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Qt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Mg{constructor(e){this.Tt=e}}function VT(n,e){let t;if(e.document)t=ST(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=J.fromSegments(e.noDocument.path),s=gr(e.noDocument.readTime);t=Me.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return ee();{const r=J.fromSegments(e.unknownDocument.path),s=gr(e.unknownDocument.version);t=Me.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new De(s[0],s[1]);return se.fromTimestamp(i)}(e.readTime)),t}function gf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:da(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,o){return{name:la(i,o.key),fields:o.data.value.mapValue.fields,updateTime:hs(i,o.version.toTimestamp()),createTime:hs(i,o.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:mr(e.version)};else{if(!e.isUnknownDocument())return ee();r.unknownDocument={path:t.path.toArray(),version:mr(e.version)}}return r}function da(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function mr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function gr(n){const e=new De(n.seconds,n.nanoseconds);return se.fromTimestamp(e)}function Zn(n,e){const t=(e.baseMutations||[]).map(i=>yl(n.Tt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>yl(n.Tt,i)),s=De.fromMillis(e.localWriteTimeMs);return new uu(e.batchId,s,t,r)}function Xs(n){const e=gr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?gr(n.lastLimboFreeSnapshotVersion):se.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){return te(i.documents.length===1),Et(Fi(Pg(i.documents[0])))}(n.query):function(i){return Et(Dg(i))}(n.query),new Qt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,$e.fromBase64String(n.resumeToken))}function Fg(n,e){const t=mr(e.snapshotVersion),r=mr(e.lastLimboFreeSnapshotVersion);let s;s=oa(e.target)?xg(n.Tt,e.target):Ng(n.Tt,e.target).ht;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:pr(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function Ug(n){const e=Dg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ca(e,e.limit,"L"):e}function Oc(n,e){return new hu(e.largestBatchId,yl(n.Tt,e.overlayMutation))}function _f(n,e){const t=e.path.lastSegment();return[n,et(e.path.popLast()),t]}function vf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:mr(r.readTime),documentKey:et(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
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
 */class OT{getBundleMetadata(e,t){return yf(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:gr(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return yf(e).put(function(s){return{bundleId:s.id,createTime:mr(ct(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return bf(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:Ug(i.bundledQuery),readTime:gr(i.readTime)}}(r)})}saveNamedQuery(e,t){return bf(e).put(function(s){return{name:s.name,readTime:mr(ct(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function yf(n){return ze(n,Ma)}function bf(n){return ze(n,Fa)}/**
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
 */class Ka{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new Ka(e,r)}getOverlay(e,t){return $s(e).get(_f(this.userId,t)).next(r=>r?Oc(this.serializer,r):null)}getOverlays(e,t){const r=Ot();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const c=new hu(t,o);s.push(this.Et(e,c))}),D.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(et(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push($s(e).J(cl,c))}),D.waitFor(i)}getOverlaysForCollection(e,t,r){const s=Ot(),i=et(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return $s(e).G(cl,o).next(c=>{for(const l of c){const h=Oc(this.serializer,l);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=Ot();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return $s(e).Z({index:$m,range:c},(l,h,p)=>{const m=Oc(this.serializer,h);i.size()<s||m.largestBatchId===o?(i.set(m.getKey(),m),o=m.largestBatchId):p.done()}).next(()=>i)}Et(e,t){return $s(e).put(function(s,i,o){const[c,l,h]=_f(i,o.mutation.key);return{userId:i,collectionPath:l,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:ua(s.Tt,o.mutation)}}(this.serializer,this.userId,t))}}function $s(n){return ze(n,Ua)}/**
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
 */class LT{dt(e){return ze(e,nu)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?$e.fromUint8Array(r):$e.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class er{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(Ce(e.integerValue));else if("doubleValue"in e){const r=Ce(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),_i(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=Zt(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(en(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?Xm(e)?this.ft(t,Number.MAX_SAFE_INTEGER):qa(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):ee()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const s of Object.keys(r))this.wt(s,t),this.Rt(r[s],t)}vt(e,t){var r,s;const i=e.fields||{};this.ft(t,53);const o=os,c=((s=(r=i[o].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.length)||0;this.ft(t,15),t.gt(Ce(c)),this.wt(o,t),this.Rt(i[o],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const s of r)this.Rt(s,t)}Dt(e,t){this.ft(t,37),J.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}er.xt=new er;/**
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
 */const Vr=255;function MT(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function wf(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const o=MT(255&r[i]);if(s+=o,o!==8)break}return s}(n);return Math.ceil(e/8)}class FT{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const s=t.codePointAt(0);this.Nt(240|s>>>18),this.Nt(128|63&s>>>12),this.Nt(128|63&s>>>6),this.Nt(128|63&s)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const s=t.codePointAt(0);this.kt(240|s>>>18),this.kt(128|63&s>>>12),this.kt(128|63&s>>>6),this.kt(128|63&s)}}this.qt()}Ut(e){const t=this.Kt(e),r=wf(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Gt(e){const t=this.Kt(e),r=wf(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}zt(){this.jt(Vr),this.jt(255)}Ht(){this.Jt(Vr),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===Vr?(this.jt(Vr),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===Vr?(this.Jt(Vr),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class UT{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class BT{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class qs{constructor(){this.Zt=new FT,this.Xt=new UT(this.Zt),this.en=new BT(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
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
 */class tr{constructor(e,t,r,s){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=s}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new tr(this.indexId,this.documentKey,this.arrayValue,r)}}function ln(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=If(n.arrayValue,e.arrayValue),t!==0?t:(t=If(n.directionalValue,e.directionalValue),t!==0?t:J.comparator(n.documentKey,e.documentKey)))}function If(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class Ef{constructor(e){this.rn=new Ee((t,r)=>Ne.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(te(e.collectionGroup===this.collectionId),this.an)return!1;const t=il(e);if(t!==void 0&&!this.cn(t))return!1;const r=Wn(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.cn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const l=r[i];if(!this.ln(c,l)||!this.hn(this.sn[o++],l))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.sn.length||!this.hn(this.sn[o++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new Ee(Ne.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Do(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Do(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Do(r.field,r.dir==="asc"?0:1)));return new Zo(Zo.UNKNOWN_ID,this.collectionId,t,gi.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function Bg(n){var e,t;if(te(n instanceof ge||n instanceof Ie),n instanceof ge){if(n instanceof ag){const s=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>ge.create(n.field,"==",i)))||[];return Ie.create(s,"or")}return n}const r=n.filters.map(s=>Bg(s));return Ie.create(r,n.op)}function $T(n){if(n.getFilters().length===0)return[];const e=Il(Bg(n));return te($g(e)),bl(e)||wl(e)?[e]:e.getFilters()}function bl(n){return n instanceof ge}function wl(n){return n instanceof Ie&&ou(n)}function $g(n){return bl(n)||wl(n)||function(t){if(t instanceof Ie&&hl(t)){for(const r of t.getFilters())if(!bl(r)&&!wl(r))return!1;return!0}return!1}(n)}function Il(n){if(te(n instanceof ge||n instanceof Ie),n instanceof ge)return n;if(n.filters.length===1)return Il(n.filters[0]);const e=n.filters.map(r=>Il(r));let t=Ie.create(e,n.op);return t=ha(t),$g(t)?t:(te(t instanceof Ie),te(cs(t)),te(t.filters.length>1),t.filters.reduce((r,s)=>mu(r,s)))}function mu(n,e){let t;return te(n instanceof ge||n instanceof Ie),te(e instanceof ge||e instanceof Ie),t=n instanceof ge?e instanceof ge?function(s,i){return Ie.create([s,i],"and")}(n,e):Tf(n,e):e instanceof ge?Tf(e,n):function(s,i){if(te(s.filters.length>0&&i.filters.length>0),cs(s)&&cs(i))return sg(s,i.getFilters());const o=hl(s)?s:i,c=hl(s)?i:s,l=o.filters.map(h=>mu(h,c));return Ie.create(l,"or")}(n,e),ha(t)}function Tf(n,e){if(cs(e))return sg(e,n.getFilters());{const t=e.filters.map(r=>mu(n,r));return Ie.create(t,"or")}}function ha(n){if(te(n instanceof ge||n instanceof Ie),n instanceof ge)return n;const e=n.getFilters();if(e.length===1)return ha(e[0]);if(ng(n))return n;const t=e.map(s=>ha(s)),r=[];return t.forEach(s=>{s instanceof ge?r.push(s):s instanceof Ie&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:Ie.create(r,n.op)}/**
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
 */class qT{constructor(){this.Tn=new gu}addToCollectionParentIndex(e,t){return this.Tn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(_t.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(_t.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class gu{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ee(we.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ee(we.comparator)).toArray()}}/**
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
 */const Af="IndexedDbIndexManager",mo=new Uint8Array(0);class jT{constructor(e,t){this.databaseId=t,this.In=new gu,this.En=new nn(r=>pr(r),(r,s)=>Mi(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const i={collectionId:r,parent:et(s)};return Sf(e).put(i)}return D.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[xm(t),""],!1,!0);return Sf(e).G(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push(Vt(o.parent))}return r})}addFieldIndex(e,t){const r=js(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Lr(e);return i.next(c=>{o.put(vf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=js(e),s=Lr(e),i=Or(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=js(e),r=Or(e),s=Lr(e);return t.J().next(()=>r.J()).next(()=>s.J())}createTargetIndexes(e,t){return D.forEach(this.dn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new Ef(r).Pn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Or(e);let s=!0;const i=new Map;return D.forEach(this.dn(t),o=>this.An(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=pe();const c=[];return D.forEach(i,(l,h)=>{G(Af,`Using index ${function(N){return`id=${N.indexId}|cg=${N.collectionGroup}|f=${N.fields.map($=>`${$.fieldPath}:${$.kind}`).join(",")}`}(l)} to execute ${pr(t)}`);const p=function(N,$){const k=il($);if(k===void 0)return null;for(const U of aa(N,k.fieldPath))switch(U.op){case"array-contains-any":return U.value.arrayValue.values||[];case"array-contains":return[U.value]}return null}(h,l),m=function(N,$){const k=new Map;for(const U of Wn($))for(const I of aa(N,U.fieldPath))switch(I.op){case"==":case"in":k.set(U.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return k.set(U.fieldPath.canonicalString(),I.value),Array.from(k.values())}return null}(h,l),g=function(N,$){const k=[];let U=!0;for(const I of Wn($)){const v=I.kind===0?rf(N,I.fieldPath,N.startAt):sf(N,I.fieldPath,N.startAt);k.push(v.value),U&&(U=v.inclusive)}return new Rn(k,U)}(h,l),T=function(N,$){const k=[];let U=!0;for(const I of Wn($)){const v=I.kind===0?sf(N,I.fieldPath,N.endAt):rf(N,I.fieldPath,N.endAt);k.push(v.value),U&&(U=v.inclusive)}return new Rn(k,U)}(h,l),R=this.Rn(l,h,g),P=this.Rn(l,h,T),A=this.Vn(l,h,m),L=this.mn(l.indexId,p,R,g.inclusive,P,T.inclusive,A);return D.forEach(L,C=>r.H(C,t.limit).next(N=>{N.forEach($=>{const k=J.fromSegments($.documentKey);o.has(k)||(o=o.add(k),c.push(k))})}))}).next(()=>c)}return D.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=$T(Ie.create(e.filters,"and")).map(r=>pl(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,s,i,o,c){const l=(t!=null?t.length:1)*Math.max(r.length,i.length),h=l/(t!=null?t.length:1),p=[];for(let m=0;m<l;++m){const g=t?this.fn(t[m/h]):mo,T=this.gn(e,g,r[m%h],s),R=this.pn(e,g,i[m%h],o),P=c.map(A=>this.gn(e,g,A,!0));p.push(...this.createRange(T,R,P))}return p}gn(e,t,r,s){const i=new tr(e,J.empty(),t,r);return s?i:i.nn()}pn(e,t,r,s){const i=new tr(e,J.empty(),t,r);return s?i.nn():i}An(e,t){const r=new Ef(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)r.un(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const s=this.dn(t);return D.forEach(s,i=>this.An(e,i).next(o=>{o?r!==0&&o.fields.length<function(l){let h=new Ee(Ne.comparator),p=!1;for(const m of l.filters)for(const g of m.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?p=!0:h=h.add(g.field));for(const m of l.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(p?1:0)}(i)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&r===2?1:r)}yn(e,t){const r=new qs;for(const s of Wn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.tn(s.kind);er.xt.At(i,o)}return r.Yt()}fn(e){const t=new qs;return er.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new qs;return er.xt.At(fr(this.databaseId,t),r.tn(function(i){const o=Wn(i);return o.length===0?0:o[o.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let s=[];s.push(new qs);let i=0;for(const o of Wn(e)){const c=r[i++];for(const l of s)if(this.Sn(t,o.fieldPath)&&Ei(c))s=this.bn(s,o,c);else{const h=l.tn(o.kind);er.xt.At(c,h)}}return this.Dn(s)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const l=new qs;l.seed(c.Yt()),er.xt.At(o,l.tn(t.kind)),i.push(l)}return i}Sn(e,t){return!!e.filters.find(r=>r instanceof ge&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=js(e),s=Lr(e);return(t?r.G(al,IDBKeyRange.bound(t,t)):r.G()).next(i=>{const o=[];return D.forEach(i,c=>s.get([c.indexId,this.uid]).next(l=>{o.push(function(p,m){const g=m?new gi(m.sequenceNumber,new _t(gr(m.readTime),new J(Vt(m.documentKey)),m.largestBatchId)):gi.empty(),T=p.fields.map(([R,P])=>new Do(Ne.fromServerFormat(R),P));return new Zo(p.indexId,p.collectionGroup,T,g)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:le(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=js(e),i=Lr(e);return this.vn(e).next(o=>s.G(al,IDBKeyRange.bound(t,t)).next(c=>D.forEach(c,l=>i.put(vf(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return D.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?D.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),D.forEach(c,l=>this.Cn(e,s,l).next(h=>{const p=this.Fn(i,l);return h.isEqual(p)?D.resolve():this.Mn(e,i,l,h,p)}))))})}xn(e,t,r,s){return Or(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,s){return Or(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const s=Or(e);let i=new Ee(ln);return s.Z({index:Bm,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(o,c)=>{i=i.add(new tr(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>i)}Fn(e,t){let r=new Ee(ln);const s=this.yn(t,e);if(s==null)return r;const i=il(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Ei(o))for(const c of o.arrayValue.values||[])r=r.add(new tr(t.indexId,e.key,this.fn(c),s))}else r=r.add(new tr(t.indexId,e.key,mo,s));return r}Mn(e,t,r,s,i){G(Af,"Updating index entries for document '%s'",t.key);const o=[];return function(l,h,p,m,g){const T=l.getIterator(),R=h.getIterator();let P=Dr(T),A=Dr(R);for(;P||A;){let L=!1,C=!1;if(P&&A){const N=p(P,A);N<0?C=!0:N>0&&(L=!0)}else P!=null?C=!0:L=!0;L?(m(A),A=Dr(R)):C?(g(P),P=Dr(T)):(P=Dr(T),A=Dr(R))}}(s,i,ln,c=>{o.push(this.xn(e,t,r,c))},c=>{o.push(this.On(e,t,r,c))}),D.waitFor(o)}vn(e){let t=1;return Lr(e).Z({index:Um,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>ln(o,c)).filter((o,c,l)=>!c||ln(o,l[c-1])!==0);const s=[];s.push(e);for(const o of r){const c=ln(o,e),l=ln(o,t);if(c===0)s[0]=e.nn();else if(c>0&&l<0)s.push(o),s.push(o.nn());else if(l>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Nn(s[o],s[o+1]))return[];const c=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,mo,[]],l=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,mo,[]];i.push(IDBKeyRange.bound(c,l))}return i}Nn(e,t){return ln(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Rf)}getMinOffset(e,t){return D.mapArray(this.dn(t),r=>this.An(e,r).next(s=>s||ee())).next(Rf)}}function Sf(n){return ze(n,bi)}function Or(n){return ze(n,sa)}function js(n){return ze(n,tu)}function Lr(n){return ze(n,ra)}function Rf(n){te(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;Xl(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new _t(e.readTime,e.documentKey,t)}/**
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
 */const Cf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},qg=41943040;class Xe{static withCacheSize(e){return new Xe(e,Xe.DEFAULT_COLLECTION_PERCENTILE,Xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */function jg(n,e,t){const r=n.store(Rt),s=n.store(ns),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=r.Z({range:o},(p,m,g)=>(c++,g.delete()));i.push(l.next(()=>{te(c===1)}));const h=[];for(const p of t.mutations){const m=Lm(e,p.key.path,t.batchId);i.push(s.delete(m)),h.push(p.key)}return D.waitFor(i).next(()=>h)}function fa(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw ee();e=n.noDocument}return JSON.stringify(e).length}/**
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
 */Xe.DEFAULT_COLLECTION_PERCENTILE=10,Xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Xe.DEFAULT=new Xe(qg,Xe.DEFAULT_COLLECTION_PERCENTILE,Xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Xe.DISABLED=new Xe(-1,0,0);class Wa{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Bn={}}static It(e,t,r,s){te(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new Wa(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return un(e).Z({index:nr,range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=qr(e),o=un(e);return o.add({}).next(c=>{te(typeof c=="number");const l=new uu(c,t,r,s),h=function(T,R,P){const A=P.baseMutations.map(C=>ua(T.Tt,C)),L=P.mutations.map(C=>ua(T.Tt,C));return{userId:R,batchId:P.batchId,localWriteTimeMs:P.localWriteTime.toMillis(),baseMutations:A,mutations:L}}(this.serializer,this.userId,l),p=[];let m=new Ee((g,T)=>le(g.canonicalString(),T.canonicalString()));for(const g of s){const T=Lm(this.userId,g.key.path,c);m=m.add(g.key.path.popLast()),p.push(o.put(h)),p.push(i.put(T,bE))}return m.forEach(g=>{p.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Bn[c]=l.keys()}),D.waitFor(p).next(()=>l)})}lookupMutationBatch(e,t){return un(e).get(t).next(r=>r?(te(r.userId===this.userId),Zn(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?D.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Bn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return un(e).Z({index:nr,range:s},(o,c,l)=>{c.userId===this.userId&&(te(c.batchId>=r),i=Zn(this.serializer,c)),l.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=or;return un(e).Z({index:nr,range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,or],[this.userId,Number.POSITIVE_INFINITY]);return un(e).G(nr,t).next(r=>r.map(s=>Zn(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Vo(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return qr(e).Z({range:s},(o,c,l)=>{const[h,p,m]=o,g=Vt(p);if(h===this.userId&&t.path.isEqual(g))return un(e).get(m).next(T=>{if(!T)throw ee();te(T.userId===this.userId),i.push(Zn(this.serializer,T))});l.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(le);const s=[];return t.forEach(i=>{const o=Vo(this.userId,i.path),c=IDBKeyRange.lowerBound(o),l=qr(e).Z({range:c},(h,p,m)=>{const[g,T,R]=h,P=Vt(T);g===this.userId&&i.path.isEqual(P)?r=r.add(R):m.done()});s.push(l)}),D.waitFor(s).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Vo(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new Ee(le);return qr(e).Z({range:o},(l,h,p)=>{const[m,g,T]=l,R=Vt(g);m===this.userId&&r.isPrefixOf(R)?R.length===s&&(c=c.add(T)):p.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],s=[];return t.forEach(i=>{s.push(un(e).get(i).next(o=>{if(o===null)throw ee();te(o.userId===this.userId),r.push(Zn(this.serializer,o))}))}),D.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return jg(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),D.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return D.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return qr(e).Z({range:r},(i,o,c)=>{if(i[0]===this.userId){const l=Vt(i[1]);s.push(l)}else c.done()}).next(()=>{te(s.length===0)})})}containsKey(e,t){return zg(e,this.userId,t)}Qn(e){return Gg(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:or,lastStreamToken:""})}}function zg(n,e,t){const r=Vo(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return qr(n).Z({range:i,Y:!0},(c,l,h)=>{const[p,m,g]=c;p===e&&m===s&&(o=!0),h.done()}).next(()=>o)}function un(n){return ze(n,Rt)}function qr(n){return ze(n,ns)}function Gg(n){return ze(n,vi)}/**
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
 */class _r{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new _r(0)}static Kn(){return new _r(-1)}}/**
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
 */class zT{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new _r(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>se.fromTimestamp(new De(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Gn(e,s)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Mr(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(te(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return Mr(e).Z((o,c)=>{const l=Xs(c);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(e,l)))}).next(()=>D.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Mr(e).Z((r,s)=>{const i=Xs(s);t(i)})}Wn(e){return Pf(e).get(na).next(t=>(te(t!==null),t))}Gn(e,t){return Pf(e).put(na,t)}zn(e,t){return Mr(e).put(Fg(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=pr(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Mr(e).Z({range:s,index:Fm},(o,c,l)=>{const h=Xs(c);Mi(t,h.target)&&(i=h,l.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=_n(e);return t.forEach(o=>{const c=et(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))}),D.waitFor(s)}removeMatchingKeys(e,t,r){const s=_n(e);return D.forEach(t,i=>{const o=et(i.path);return D.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=_n(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=_n(e);let i=pe();return s.Z({range:r,Y:!0},(o,c,l)=>{const h=Vt(o[1]),p=new J(h);i=i.add(p)}).next(()=>i)}containsKey(e,t){const r=et(t.path),s=IDBKeyRange.bound([r],[xm(r)],!1,!0);let i=0;return _n(e).Z({index:eu,Y:!0,range:s},([o,c],l,h)=>{o!==0&&(i++,h.done())}).next(()=>i>0)}lt(e,t){return Mr(e).get(t).next(r=>r?Xs(r):null)}}function Mr(n){return ze(n,rs)}function Pf(n){return ze(n,ar)}function _n(n){return ze(n,ss)}/**
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
 */const kf="LruGarbageCollector",Hg=1048576;function xf([n,e],[t,r]){const s=le(n,t);return s===0?le(e,r):s}class GT{constructor(e){this.Hn=e,this.buffer=new Ee(xf),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();xf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Kg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){G(kf,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Dn(t)?G(kf,"Ignoring IndexedDB error during garbage collection: ",t):await Ir(t)}await this.er(3e5)})}}class HT{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return D.resolve(It.ae);const r=new GT(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(G("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(Cf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(G("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Cf):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,o,c,l,h;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(G("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(i=m,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(h=Date.now(),Fr()<=me.DEBUG&&G("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(h-l)+`ms
Total Duration: ${h-p}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function Wg(n,e){return new HT(n,e)}/**
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
 */class KT{constructor(e,t){this.db=e,this.garbageCollector=Wg(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,s)=>t(s))}addReference(e,t,r){return go(e,r)}removeReference(e,t,r){return go(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return go(e,t)}ar(e,t){return function(s,i){let o=!1;return Gg(s).X(c=>zg(s,c,i).next(l=>(l&&(o=!0),D.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this._r(e,(o,c)=>{if(c<=t){const l=this.ar(e,o).next(h=>{if(!h)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,se.min()),_n(e).delete(function(m){return[0,et(m.path)]}(o))))});s.push(l)}}).next(()=>D.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return go(e,t)}_r(e,t){const r=_n(e);let s,i=It.ae;return r.Z({index:eu},([o,c],{path:l,sequenceNumber:h})=>{o===0?(i!==It.ae&&t(new J(Vt(s)),i),i=h,s=l):i=It.ae}).next(()=>{i!==It.ae&&t(new J(Vt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function go(n,e){return _n(n).put(function(r,s){return{targetId:0,path:et(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
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
 */class Qg{constructor(){this.changes=new nn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class WT{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return zn(e).put(r)}removeEntry(e,t,r){return zn(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],da(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=Me.newInvalidDocument(t);return zn(e).Z({index:Oo,range:IDBKeyRange.only(zs(t))},(s,i)=>{r=this.cr(t,i)}).next(()=>r)}lr(e,t){let r={size:0,document:Me.newInvalidDocument(t)};return zn(e).Z({index:Oo,range:IDBKeyRange.only(zs(t))},(s,i)=>{r={document:this.cr(t,i),size:fa(i)}}).next(()=>r)}getEntries(e,t){let r=gt();return this.hr(e,t,(s,i)=>{const o=this.cr(s,i);r=r.insert(s,o)}).next(()=>r)}Pr(e,t){let r=gt(),s=new Pe(J.comparator);return this.hr(e,t,(i,o)=>{const c=this.cr(i,o);r=r.insert(i,c),s=s.insert(i,fa(o))}).next(()=>({documents:r,Tr:s}))}hr(e,t,r){if(t.isEmpty())return D.resolve();let s=new Ee(Vf);t.forEach(l=>s=s.add(l));const i=IDBKeyRange.bound(zs(s.first()),zs(s.last())),o=s.getIterator();let c=o.getNext();return zn(e).Z({index:Oo,range:i},(l,h,p)=>{const m=J.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&Vf(c,m)<0;)r(c,null),c=o.getNext();c&&c.isEqual(m)&&(r(c,h),c=o.hasNext()?o.getNext():null),c?p.W(zs(c)):p.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),da(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return zn(e).G(IDBKeyRange.bound(c,l,!0)).next(h=>{i?.incrementDocumentReadCount(h.length);let p=gt();for(const m of h){const g=this.cr(J.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);g.isFoundDocument()&&(Ui(t,g)||s.has(g.key))&&(p=p.insert(g.key,g))}return p})}getAllFromCollectionGroup(e,t,r,s){let i=gt();const o=Df(t,r),c=Df(t,_t.max());return zn(e).Z({index:Mm,range:IDBKeyRange.bound(o,c,!0)},(l,h,p)=>{const m=this.cr(J.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&p.done()}).next(()=>i)}newChangeBuffer(e){return new QT(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Nf(e).get(ol).next(t=>(te(!!t),t))}ur(e,t){return Nf(e).put(ol,t)}cr(e,t){if(t){const r=VT(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(se.min())))return r}return Me.newInvalidDocument(e)}}function Yg(n){return new WT(n)}class QT extends Qg{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new nn(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new Ee((i,o)=>le(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Er.get(i);if(t.push(this.Ir.removeEntry(e,i,c.readTime)),o.isValidDocument()){const l=gf(this.Ir.serializer,o);s=s.add(i.path.popLast());const h=fa(l);r+=h-c.size,t.push(this.Ir.addEntry(e,i,l))}else if(r-=c.size,this.trackRemovals){const l=gf(this.Ir.serializer,o.convertToNoDocument(se.min()));t.push(this.Ir.addEntry(e,i,l))}}),s.forEach(i=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Ir.updateMetadata(e,r)),D.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:s})=>(s.forEach((i,o)=>{this.Er.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function Nf(n){return ze(n,yi)}function zn(n){return ze(n,ta)}function zs(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Df(n,e){const t=e.documentKey.path.toArray();return[n,da(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Vf(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=le(t[i],r[i]),s)return s;return s=le(t.length,r.length),s||(s=le(t[t.length-2],r[r.length-2]),s||le(t[t.length-1],r[r.length-1]))}/**
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
 */class YT{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Jg{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&ii(r.mutation,s,lt.empty(),De.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,pe()).next(()=>r))}getLocalViewOfDocuments(e,t,r=pe()){const s=Ot();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=Ys();return i.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=Ot();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,pe()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=gt();const o=si(),c=function(){return si()}();return t.forEach((l,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof rn)?i=i.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),ii(p.mutation,h,p.mutation.getFieldMask(),De.now())):o.set(h.key,lt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((h,p)=>o.set(h,p)),t.forEach((h,p)=>{var m;return c.set(h,new YT(p,(m=o.get(h))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){const r=si();let s=new Pe((o,c)=>o-c),i=pe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const h=t.get(l);if(h===null)return;let p=r.get(l)||lt.empty();p=c.applyToLocalView(h,p),r.set(l,p);const m=(s.get(c.batchId)||pe()).add(l);s=s.insert(c.batchId,m)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,p=l.value,m=hg();p.forEach(g=>{if(!i.has(g)){const T=bg(t.get(g),r.get(g));T!==null&&m.set(g,T),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return D.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(o){return J.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):au(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(Ot());let c=mi,l=i;return o.next(h=>D.forEach(h,(p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(p)?D.resolve():this.remoteDocumentCache.getEntry(e,p).next(g=>{l=l.insert(p,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,l,h,pe())).next(p=>({batchId:c,changes:dg(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new J(t)).next(r=>{let s=Ys();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=Ys();return this.indexManager.getCollectionParents(e,i).next(c=>D.forEach(c,l=>{const h=function(m,g){return new Er(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(p=>{p.forEach((m,g)=>{o=o.insert(m,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>{i.forEach((l,h)=>{const p=h.getKey();o.get(p)===null&&(o=o.insert(p,Me.newInvalidDocument(p)))});let c=Ys();return o.forEach((l,h)=>{const p=i.get(l);p!==void 0&&ii(p.mutation,h,lt.empty(),De.now()),Ui(t,h)&&(c=c.insert(l,h))}),c})}}/**
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
 */class JT{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return D.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:ct(s.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:Ug(s.bundledQuery),readTime:ct(s.readTime)}}(t)),D.resolve()}}/**
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
 */class XT{constructor(){this.overlays=new Pe(J.comparator),this.Rr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Ot();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=Ot(),i=t.length+1,o=new J(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Pe((h,p)=>h-p);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=Ot(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const c=Ot(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,p)=>c.set(h,p)),!(c.size()>=s)););return D.resolve(c)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new hu(t,r));let i=this.Rr.get(t);i===void 0&&(i=pe(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
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
 */class ZT{constructor(){this.sessionToken=$e.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
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
 */class _u{constructor(){this.Vr=new Ee(Ge.mr),this.gr=new Ee(Ge.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new Ge(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new Ge(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new J(new we([])),r=new Ge(t,e),s=new Ge(t,e+1),i=[];return this.gr.forEachInRange([r,s],o=>{this.wr(o),i.push(o.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new J(new we([])),r=new Ge(t,e),s=new Ge(t,e+1);let i=pe();return this.gr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Ge(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ge{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return J.comparator(e.key,t.key)||le(e.Cr,t.Cr)}static pr(e,t){return le(e.Cr,t.Cr)||J.comparator(e.key,t.key)}}/**
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
 */class eA{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new Ee(Ge.mr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new uu(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Mr=this.Mr.add(new Ge(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(o)}lookupMutationBatch(e,t){return D.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?or:this.Fr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ge(t,0),s=new Ge(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],o=>{const c=this.Or(o.Cr);i.push(c)}),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(le);return t.forEach(s=>{const i=new Ge(s,0),o=new Ge(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,o],c=>{r=r.add(c.Cr)})}),D.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;J.isDocumentKey(i)||(i=i.child(""));const o=new Ge(new J(i),0);let c=new Ee(le);return this.Mr.forEachWhile(l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Cr)),!0)},o),D.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){te(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return D.forEach(t.mutations,s=>{const i=new Ge(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new Ge(t,0),s=this.Mr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class tA{constructor(e){this.kr=e,this.docs=function(){return new Pe(J.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let r=gt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Me.newInvalidDocument(s))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=gt();const o=t.path,c=new J(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:p}}=l.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Xl(Nm(p),r)<=0||(s.has(p.key)||Ui(t,p))&&(i=i.insert(p.key,p.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){ee()}qr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new nA(this)}getSize(e){return D.resolve(this.size)}}class nA extends Qg{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
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
 */class rA{constructor(e){this.persistence=e,this.Qr=new nn(t=>pr(t),Mi),this.lastRemoteSnapshotVersion=se.min(),this.highestTargetId=0,this.$r=0,this.Ur=new _u,this.targetCount=0,this.Kr=_r.Un()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),D.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new _r(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.zn(t),D.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),D.waitFor(i).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Ur.containsKey(t))}}/**
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
 */class vu{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new It(0),this.zr=!1,this.zr=!0,this.jr=new ZT,this.referenceDelegate=e(this),this.Hr=new rA(this),this.indexManager=new qT,this.remoteDocumentCache=function(s){return new tA(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new Mg(t),this.Yr=new JT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new XT,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new eA(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){G("MemoryPersistence","Starting transaction:",e);const s=new sA(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return D.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class sA extends Vm{constructor(e){super(),this.currentSequenceNumber=e}}class Qa{constructor(e){this.persistence=e,this.ti=new _u,this.ni=null}static ri(e){return new Qa(e)}get ii(){if(this.ni)return this.ni;throw ee()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),D.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.ii,r=>{const s=J.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,se.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return D.or([()=>D.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class pa{constructor(e,t){this.persistence=e,this.oi=new nn(r=>et(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Wg(this,t)}static ri(e,t){return new pa(e,t)}Zr(){}Xr(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return D.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?D.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,o=>this.ar(e,o,t).next(c=>{c||(r++,i.removeEntry(o,se.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Mo(e.data.value)),t}ar(e,t,r){return D.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class iA{constructor(e){this.serializer=e}B(e,t,r,s){const i=new Oa("createOrUpgrade",t);r<1&&s>=1&&(function(l){l.createObjectStore(Li)}(e),function(l){l.createObjectStore(vi,{keyPath:yE}),l.createObjectStore(Rt,{keyPath:Gh,autoIncrement:!0}).createIndex(nr,Hh,{unique:!0}),l.createObjectStore(ns)}(e),Of(e),function(l){l.createObjectStore(Qn)}(e));let o=D.resolve();return r<3&&s>=3&&(r!==0&&(function(l){l.deleteObjectStore(ss),l.deleteObjectStore(rs),l.deleteObjectStore(ar)}(e),Of(e)),o=o.next(()=>function(l){const h=l.store(ar),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:se.min().toTimestamp(),targetCount:0};return h.put(na,p)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(l,h){return h.store(Rt).G().next(m=>{l.deleteObjectStore(Rt),l.createObjectStore(Rt,{keyPath:Gh,autoIncrement:!0}).createIndex(nr,Hh,{unique:!0});const g=h.store(Rt),T=m.map(R=>g.put(R));return D.waitFor(T)})}(e,i))),o=o.next(()=>{(function(l){l.createObjectStore(is,{keyPath:CE})})(e)})),r<5&&s>=5&&(o=o.next(()=>this._i(i))),r<6&&s>=6&&(o=o.next(()=>(function(l){l.createObjectStore(yi)}(e),this.ai(i)))),r<7&&s>=7&&(o=o.next(()=>this.ui(i))),r<8&&s>=8&&(o=o.next(()=>this.ci(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.li(i))),r<11&&s>=11&&(o=o.next(()=>{(function(l){l.createObjectStore(Ma,{keyPath:PE})})(e),function(l){l.createObjectStore(Fa,{keyPath:kE})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(l){const h=l.createObjectStore(Ua,{keyPath:ME});h.createIndex(cl,FE,{unique:!1}),h.createIndex($m,UE,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(l){const h=l.createObjectStore(ta,{keyPath:wE});h.createIndex(Oo,IE),h.createIndex(Mm,EE)}(e)).next(()=>this.hi(e,i)).next(()=>e.deleteObjectStore(Qn))),r<14&&s>=14&&(o=o.next(()=>this.Pi(e,i))),r<15&&s>=15&&(o=o.next(()=>function(l){l.createObjectStore(tu,{keyPath:xE,autoIncrement:!0}).createIndex(al,NE,{unique:!1}),l.createObjectStore(ra,{keyPath:DE}).createIndex(Um,VE,{unique:!1}),l.createObjectStore(sa,{keyPath:OE}).createIndex(Bm,LE,{unique:!1})}(e))),r<16&&s>=16&&(o=o.next(()=>{t.objectStore(ra).clear()}).next(()=>{t.objectStore(sa).clear()})),r<17&&s>=17&&(o=o.next(()=>{(function(l){l.createObjectStore(nu,{keyPath:BE})})(e)})),o}ai(e){let t=0;return e.store(Qn).Z((r,s)=>{t+=fa(s)}).next(()=>{const r={byteSize:t};return e.store(yi).put(ol,r)})}_i(e){const t=e.store(vi),r=e.store(Rt);return t.G().next(s=>D.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,or],[i.userId,i.lastAcknowledgedBatchId]);return r.G(nr,o).next(c=>D.forEach(c,l=>{te(l.userId===i.userId);const h=Zn(this.serializer,l);return jg(e,i.userId,h).next(()=>{})}))}))}ui(e){const t=e.store(ss),r=e.store(Qn);return e.store(ar).get(na).next(s=>{const i=[];return r.Z((o,c)=>{const l=new we(o),h=function(m){return[0,et(m)]}(l);i.push(t.get(h).next(p=>p?D.resolve():(m=>t.put({targetId:0,path:et(m),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>D.waitFor(i))})}ci(e,t){e.createObjectStore(bi,{keyPath:RE});const r=t.store(bi),s=new gu,i=o=>{if(s.add(o)){const c=o.lastSegment(),l=o.popLast();return r.put({collectionId:c,parent:et(l)})}};return t.store(Qn).Z({Y:!0},(o,c)=>{const l=new we(o);return i(l.popLast())}).next(()=>t.store(ns).Z({Y:!0},([o,c,l],h)=>{const p=Vt(c);return i(p.popLast())}))}li(e){const t=e.store(rs);return t.Z((r,s)=>{const i=Xs(s),o=Fg(this.serializer,i);return t.put(o)})}hi(e,t){const r=t.store(Qn),s=[];return r.Z((i,o)=>{const c=t.store(ta),l=function(m){return m.document?new J(we.fromString(m.document.name).popFirst(5)):m.noDocument?J.fromSegments(m.noDocument.path):m.unknownDocument?J.fromSegments(m.unknownDocument.path):ee()}(o).path.toArray(),h={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))}).next(()=>D.waitFor(s))}Pi(e,t){const r=t.store(Rt),s=Yg(this.serializer),i=new vu(Qa.ri,this.serializer.Tt);return r.G().next(o=>{const c=new Map;return o.forEach(l=>{var h;let p=(h=c.get(l.userId))!==null&&h!==void 0?h:pe();Zn(this.serializer,l).keys().forEach(m=>p=p.add(m)),c.set(l.userId,p)}),D.forEach(c,(l,h)=>{const p=new it(h),m=Ka.It(this.serializer,p),g=i.getIndexManager(p),T=Wa.It(p,this.serializer,g,i.referenceDelegate);return new Jg(s,T,m,g).recalculateAndSaveOverlaysForDocumentKeys(new ll(t,It.ae),l).next()})})}}function Of(n){n.createObjectStore(ss,{keyPath:AE}).createIndex(eu,SE,{unique:!0}),n.createObjectStore(rs,{keyPath:"targetId"}).createIndex(Fm,TE,{unique:!0}),n.createObjectStore(ar)}const dn="IndexedDbPersistence",Lc=18e5,Mc=5e3,Fc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",oA="main";class yu{constructor(e,t,r,s,i,o,c,l,h,p,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=i,this.window=o,this.document=c,this.Ii=h,this.Ei=p,this.di=m,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=g=>Promise.resolve(),!yu.D())throw new K(F.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new KT(this,s),this.gi=t+oA,this.serializer=new Mg(l),this.pi=new En(this.gi,this.di,new iA(this.serializer)),this.jr=new LT,this.Hr=new zT(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Yg(this.serializer),this.Yr=new OT,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,p===!1&&ot(dn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new K(F.FAILED_PRECONDITION,Fc);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new It(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>_o(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if(Dn(e))return G(dn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return G(dn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return Gs(e).get(Nr).next(t=>D.resolve(this.Ni(t)))}Bi(e){return _o(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,Lc)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=ze(t,is);return r.G().next(s=>{const i=this.qi(s,Lc),o=s.filter(c=>i.indexOf(c)===-1);return D.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?D.resolve(!0):Gs(e).get(Nr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Mc)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new K(F.FAILED_PRECONDITION,Fc);return!1}}return!(!this.networkEnabled||!this.inForeground)||_o(e).G().next(r=>this.qi(r,Mc).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&G(dn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[Li,is],e=>{const t=new ll(e,It.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>_o(e).G().next(t=>this.qi(t,Lc).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return Wa.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new jT(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return Ka.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){G(dn,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(l){return l===17?jE:l===16?qE:l===15?ru:l===14?zm:l===13?jm:l===12?$E:l===11?qm:void ee()}(this.di);let o;return this.pi.runTransaction(e,s,i,c=>(o=new ll(c,this.Gr?this.Gr.next():It.ae),t==="readwrite-primary"?this.Fi(o).next(l=>!!l||this.Mi(o)).next(l=>{if(!l)throw ot(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new K(F.FAILED_PRECONDITION,Dm);return r(o)}).next(l=>this.Oi(o).next(()=>l)):this.ji(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ji(e){return Gs(e).get(Nr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Mc)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new K(F.FAILED_PRECONDITION,Fc)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Gs(e).put(Nr,t)}static D(){return En.D()}xi(e){const t=Gs(e);return t.get(Nr).next(r=>this.Ni(r)?(G(dn,"Releasing primary lease."),t.delete(Nr)):D.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(ot(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;Mp()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return G(dn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return ot(dn,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){ot("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Gs(n){return ze(n,Li)}function _o(n){return ze(n,is)}function aA(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class bu{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=pe(),s=pe();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new bu(e,t.fromCache,r,s)}}/**
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
 */class cA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Xg{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return Mp()?8:Om(je())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new cA;return this._s(e,t,o).next(c=>{if(i.result=c,this.Xi)return this.us(e,t,o,c.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(Fr()<=me.DEBUG&&G("QueryEngine","SDK will not create cache indexes for query:",Ur(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),D.resolve()):(Fr()<=me.DEBUG&&G("QueryEngine","Query:",Ur(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(Fr()<=me.DEBUG&&G("QueryEngine","The SDK decides to create cache indexes for query:",Ur(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Et(t))):D.resolve())}rs(e,t){if(of(t))return D.resolve(null);let r=Et(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=ca(t,null,"F"),r=Et(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=pe(...i);return this.ns.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const h=this.cs(t,c);return this.ls(t,h,o,l.readTime)?this.rs(e,ca(t,null,"F")):this.hs(e,h,t,l)}))})))}ss(e,t,r,s){return of(t)||s.isEqual(se.min())?D.resolve(null):this.ns.getDocuments(e,r).next(i=>{const o=this.cs(t,i);return this.ls(t,o,r,s)?D.resolve(null):(Fr()<=me.DEBUG&&G("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ur(t)),this.hs(e,o,t,hE(s,mi)).next(c=>c))})}cs(e,t){let r=new Ee(lg(e));return t.forEach((s,i)=>{Ui(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return Fr()<=me.DEBUG&&G("QueryEngine","Using full collection scan to execute query:",Ur(t)),this.ns.getDocumentsMatchingQuery(e,t,_t.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */const wu="LocalStore",lA=3e8;class uA{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new Pe(le),this.Is=new nn(i=>pr(i),Mi),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Jg(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function Zg(n,e,t,r){return new uA(n,e,t,r)}async function e_(n,e){const t=ue(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let l=pe();for(const h of s){o.push(h.batchId);for(const p of h.mutations)l=l.add(p.key)}for(const h of i){c.push(h.batchId);for(const p of h.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(h=>({Rs:h,removedBatchIds:o,addedBatchIds:c}))})})}function dA(n,e){const t=ue(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,l,h,p){const m=h.batch,g=m.keys();let T=D.resolve();return g.forEach(R=>{T=T.next(()=>p.getEntry(l,R)).next(P=>{const A=h.docVersions.get(R);te(A!==null),P.version.compareTo(A)<0&&(m.applyToRemoteDocument(P,h),P.isValidDocument()&&(P.setReadTime(h.commitVersion),p.addEntry(P)))})}),T.next(()=>c.mutationQueue.removeMutationBatch(l,m))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=pe();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function t_(n){const e=ue(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function hA(n,e){const t=ue(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const c=[];e.targetChanges.forEach((p,m)=>{const g=s.get(m);if(!g)return;c.push(t.Hr.removeMatchingKeys(i,p.removedDocuments,m).next(()=>t.Hr.addMatchingKeys(i,p.addedDocuments,m)));let T=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?T=T.withResumeToken($e.EMPTY_BYTE_STRING,se.min()).withLastLimboFreeSnapshotVersion(se.min()):p.resumeToken.approximateByteSize()>0&&(T=T.withResumeToken(p.resumeToken,r)),s=s.insert(m,T),function(P,A,L){return P.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=lA?!0:L.addedDocuments.size+L.modifiedDocuments.size+L.removedDocuments.size>0}(g,T,p)&&c.push(t.Hr.updateTargetData(i,T))});let l=gt(),h=pe();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))}),c.push(fA(i,o,e.documentUpdates).next(p=>{l=p.Vs,h=p.fs})),!r.isEqual(se.min())){const p=t.Hr.getLastRemoteSnapshotVersion(i).next(m=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(p)}return D.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(t.Ts=s,i))}function fA(n,e,t){let r=pe(),s=pe();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=gt();return t.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(se.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):G(wu,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{Vs:o,fs:s}})}function pA(n,e){const t=ue(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=or),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function mA(n,e){const t=ue(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,D.resolve(s)):t.Hr.allocateTargetId(r).next(o=>(s=new Qt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function El(n,e,t){const r=ue(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Dn(o))throw o;G(wu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function Lf(n,e,t){const r=ue(n);let s=se.min(),i=pe();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,h,p){const m=ue(l),g=m.Is.get(p);return g!==void 0?D.resolve(m.Ts.get(g)):m.Hr.getTargetData(h,p)}(r,o,Et(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,c.targetId).next(l=>{i=l})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,t?s:se.min(),t?i:pe())).next(c=>(gA(r,sT(e),c),{documents:c,gs:i})))}function gA(n,e,t){let r=n.Es.get(e)||se.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class Mf{constructor(){this.activeTargetIds=uT()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class n_{constructor(){this.ho=new Mf,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new Mf,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class _A{To(e){}shutdown(){}}/**
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
 */const Ff="ConnectivityMonitor";class Uf{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){G(Ff,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){G(Ff,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let vo=null;function Tl(){return vo===null?vo=function(){return 268435456+Math.round(2147483648*Math.random())}():vo++,"0x"+vo.toString(16)}/**
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
 */const Uc="RestConnection",vA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class yA{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===ia?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const o=Tl(),c=this.bo(e,t.toUriEncodedString());G(Uc,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(l,s,i),this.vo(e,c,l,r).then(h=>(G(Uc,`Received RPC '${e}' ${o}: `,h),h),h=>{throw pi(Uc,`RPC '${e}' ${o} failed with error: `,h,"url: ",c,"request:",r),h})}Co(e,t,r,s,i,o){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ts}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=vA[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
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
 */class bA{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
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
 */const Je="WebChannelConnection";class wA extends yA{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=Tl();return new Promise((o,c)=>{const l=new Am;l.setWithCredentials(!0),l.listenOnce(Sm.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case No.NO_ERROR:const p=l.getResponseJson();G(Je,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(p)),o(p);break;case No.TIMEOUT:G(Je,`RPC '${e}' ${i} timed out`),c(new K(F.DEADLINE_EXCEEDED,"Request time out"));break;case No.HTTP_ERROR:const m=l.getStatus();if(G(Je,`RPC '${e}' ${i} failed with status:`,m,"response text:",l.getResponseText()),m>0){let g=l.getResponseJson();Array.isArray(g)&&(g=g[0]);const T=g?.error;if(T&&T.status&&T.message){const R=function(A){const L=A.toLowerCase().replace(/_/g,"-");return Object.values(F).indexOf(L)>=0?L:F.UNKNOWN}(T.status);c(new K(R,T.message))}else c(new K(F.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new K(F.UNAVAILABLE,"Connection failed."));break;default:ee()}}finally{G(Je,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);G(Je,`RPC '${e}' ${i} sending request:`,s),l.send(t,"POST",h,r,15)})}Wo(e,t,r){const s=Tl(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Pm(),c=Cm(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Do(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const p=i.join("");G(Je,`Creating RPC '${e}' stream ${s}: ${p}`,l);const m=o.createWebChannel(p,l);let g=!1,T=!1;const R=new bA({Fo:A=>{T?G(Je,`Not sending because RPC '${e}' stream ${s} is closed:`,A):(g||(G(Je,`Opening RPC '${e}' stream ${s} transport.`),m.open(),g=!0),G(Je,`RPC '${e}' stream ${s} sending:`,A),m.send(A))},Mo:()=>m.close()}),P=(A,L,C)=>{A.listen(L,N=>{try{C(N)}catch($){setTimeout(()=>{throw $},0)}})};return P(m,Qs.EventType.OPEN,()=>{T||(G(Je,`RPC '${e}' stream ${s} transport opened.`),R.Qo())}),P(m,Qs.EventType.CLOSE,()=>{T||(T=!0,G(Je,`RPC '${e}' stream ${s} transport closed`),R.Uo())}),P(m,Qs.EventType.ERROR,A=>{T||(T=!0,pi(Je,`RPC '${e}' stream ${s} transport errored:`,A),R.Uo(new K(F.UNAVAILABLE,"The operation could not be completed")))}),P(m,Qs.EventType.MESSAGE,A=>{var L;if(!T){const C=A.data[0];te(!!C);const N=C,$=N?.error||((L=N[0])===null||L===void 0?void 0:L.error);if($){G(Je,`RPC '${e}' stream ${s} received error:`,$);const k=$.status;let U=function(w){const E=Be[w];if(E!==void 0)return Eg(E)}(k),I=$.message;U===void 0&&(U=F.INTERNAL,I="Unknown error status: "+k+" with message "+$.message),T=!0,R.Uo(new K(U,I)),m.close()}else G(Je,`RPC '${e}' stream ${s} received:`,C),R.Ko(C)}}),P(c,Rm.STAT_EVENT,A=>{A.stat===nl.PROXY?G(Je,`RPC '${e}' stream ${s} detected buffering proxy`):A.stat===nl.NOPROXY&&G(Je,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{R.$o()},0),R}}/**
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
 */function IA(){return typeof window<"u"?window:null}function $o(){return typeof document<"u"?document:null}/**
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
 */function Ya(n){return new TT(n,!0)}/**
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
 */class r_{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&G("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
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
 */const Bf="PersistentStream";class s_{constructor(e,t,r,s,i,o,c,l){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new r_(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===F.RESOURCE_EXHAUSTED?(ot(t.toString()),ot("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===F.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new K(F.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return G(Bf,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(G(Bf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class EA extends s_{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=RT(this.serializer,e),r=function(i){if(!("targetChange"in i))return se.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?se.min():o.readTime?ct(o.readTime):se.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=vl(this.serializer),t.addTarget=function(i,o){let c;const l=o.target;if(c=oa(l)?{documents:xg(i,l)}:{query:Ng(i,l).ht},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Sg(i,o.resumeToken);const h=gl(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(se.min())>0){c.readTime=hs(i,o.snapshotVersion.toTimestamp());const h=gl(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=PT(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=vl(this.serializer),t.removeTarget=e,this.I_(t)}}class TA extends s_{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return te(!!e.streamToken),this.lastStreamToken=e.streamToken,te(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){te(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=CT(e.writeResults,e.commitTime),r=ct(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=vl(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ua(this.serializer,r))};this.I_(t)}}/**
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
 */class AA{}class SA extends AA{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new K(F.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.So(e,_l(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new K(F.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Co(e,_l(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new K(F.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class RA{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(ot(t),this.N_=!1):G("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
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
 */const vr="RemoteStore";class CA{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(o=>{r.enqueueAndForget(async()=>{Tr(this)&&(G(vr,"Restarting streams for network reachability change."),await async function(l){const h=ue(l);h.W_.add(4),await $i(h),h.j_.set("Unknown"),h.W_.delete(4),await Ja(h)}(this))})}),this.j_=new RA(r,s)}}async function Ja(n){if(Tr(n))for(const e of n.G_)await e(!0)}async function $i(n){for(const e of n.G_)await e(!1)}function i_(n,e){const t=ue(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),Au(t)?Tu(t):Ss(t).c_()&&Eu(t,e))}function Iu(n,e){const t=ue(n),r=Ss(t);t.K_.delete(e),r.c_()&&o_(t,e),t.K_.size===0&&(r.c_()?r.P_():Tr(t)&&t.j_.set("Unknown"))}function Eu(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(se.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ss(n).y_(e)}function o_(n,e){n.H_.Ne(e),Ss(n).w_(e)}function Tu(n){n.H_=new bT({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),Ss(n).start(),n.j_.B_()}function Au(n){return Tr(n)&&!Ss(n).u_()&&n.K_.size>0}function Tr(n){return ue(n).W_.size===0}function a_(n){n.H_=void 0}async function PA(n){n.j_.set("Online")}async function kA(n){n.K_.forEach((e,t)=>{Eu(n,e)})}async function xA(n,e){a_(n),Au(n)?(n.j_.q_(e),Tu(n)):n.j_.set("Unknown")}async function NA(n,e,t){if(n.j_.set("Online"),e instanceof Ag&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.K_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.K_.delete(c),s.H_.removeTarget(c))}(n,e)}catch(r){G(vr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ma(n,r)}else if(e instanceof Bo?n.H_.We(e):e instanceof Tg?n.H_.Ze(e):n.H_.je(e),!t.isEqual(se.min()))try{const r=await t_(n.localStore);t.compareTo(r)>=0&&await function(i,o){const c=i.H_.ot(o);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const p=i.K_.get(h);p&&i.K_.set(h,p.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,h)=>{const p=i.K_.get(l);if(!p)return;i.K_.set(l,p.withResumeToken($e.EMPTY_BYTE_STRING,p.snapshotVersion)),o_(i,l);const m=new Qt(p.target,l,h,p.sequenceNumber);Eu(i,m)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){G(vr,"Failed to raise snapshot:",r),await ma(n,r)}}async function ma(n,e,t){if(!Dn(e))throw e;n.W_.add(1),await $i(n),n.j_.set("Offline"),t||(t=()=>t_(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{G(vr,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await Ja(n)})}function c_(n,e){return e().catch(t=>ma(n,t,e))}async function qi(n){const e=ue(n),t=Cn(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:or;for(;DA(e);)try{const s=await pA(e.localStore,r);if(s===null){e.U_.length===0&&t.P_();break}r=s.batchId,VA(e,s)}catch(s){await ma(e,s)}l_(e)&&u_(e)}function DA(n){return Tr(n)&&n.U_.length<10}function VA(n,e){n.U_.push(e);const t=Cn(n);t.c_()&&t.S_&&t.b_(e.mutations)}function l_(n){return Tr(n)&&!Cn(n).u_()&&n.U_.length>0}function u_(n){Cn(n).start()}async function OA(n){Cn(n).C_()}async function LA(n){const e=Cn(n);for(const t of n.U_)e.b_(t.mutations)}async function MA(n,e,t){const r=n.U_.shift(),s=du.from(r,e,t);await c_(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await qi(n)}async function FA(n,e){e&&Cn(n).S_&&await async function(r,s){if(function(o){return vT(o)&&o!==F.ABORTED}(s.code)){const i=r.U_.shift();Cn(r).h_(),await c_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await qi(r)}}(n,e),l_(n)&&u_(n)}async function $f(n,e){const t=ue(n);t.asyncQueue.verifyOperationInProgress(),G(vr,"RemoteStore received new credentials");const r=Tr(t);t.W_.add(3),await $i(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await Ja(t)}async function UA(n,e){const t=ue(n);e?(t.W_.delete(2),await Ja(t)):e||(t.W_.add(2),await $i(t),t.j_.set("Unknown"))}function Ss(n){return n.J_||(n.J_=function(t,r,s){const i=ue(t);return i.M_(),new EA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:PA.bind(null,n),No:kA.bind(null,n),Lo:xA.bind(null,n),p_:NA.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),Au(n)?Tu(n):n.j_.set("Unknown")):(await n.J_.stop(),a_(n))})),n.J_}function Cn(n){return n.Y_||(n.Y_=function(t,r,s){const i=ue(t);return i.M_(),new TA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:OA.bind(null,n),Lo:FA.bind(null,n),D_:LA.bind(null,n),v_:MA.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await qi(n)):(await n.Y_.stop(),n.U_.length>0&&(G(vr,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
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
 */class Su{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ft,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Su(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new K(F.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ru(n,e){if(ot("AsyncQueue",`${e}: ${n}`),Dn(n))return new K(F.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Yr{static emptySet(e){return new Yr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||J.comparator(t.key,r.key):(t,r)=>J.comparator(t.key,r.key),this.keyedMap=Ys(),this.sortedSet=new Pe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Yr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Yr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class qf{constructor(){this.Z_=new Pe(J.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):ee():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class fs{constructor(e,t,r,s,i,o,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new fs(e,t,Yr.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ja(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class BA{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class $A{constructor(){this.queries=jf(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=ue(t),i=s.queries;s.queries=jf(),i.forEach((o,c)=>{for(const l of c.ta)l.onError(r)})})(this,new K(F.ABORTED,"Firestore shutting down"))}}function jf(){return new nn(n=>cg(n),ja)}async function Cu(n,e){const t=ue(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new BA,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Ru(o,`Initialization of query '${Ur(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&ku(t)}async function Pu(n,e){const t=ue(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.ta.indexOf(e);o>=0&&(i.ta.splice(o,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function qA(n,e){const t=ue(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.ta)c.oa(s)&&(r=!0);o.ea=s}}r&&ku(t)}function jA(n,e,t){const r=ue(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function ku(n){n.ia.forEach(e=>{e.next()})}var Al,zf;(zf=Al||(Al={}))._a="default",zf.Cache="cache";class xu{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new fs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=fs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==Al.Cache}}/**
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
 */class d_{constructor(e){this.key=e}}class h_{constructor(e){this.key=e}}class zA{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=pe(),this.mutatedKeys=pe(),this.ya=lg(e),this.wa=new Yr(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new qf,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,m)=>{const g=s.get(p),T=Ui(this.query,m)?m:null,R=!!g&&this.mutatedKeys.has(g.key),P=!!T&&(T.hasLocalMutations||this.mutatedKeys.has(T.key)&&T.hasCommittedMutations);let A=!1;g&&T?g.data.isEqual(T.data)?R!==P&&(r.track({type:3,doc:T}),A=!0):this.va(g,T)||(r.track({type:2,doc:T}),A=!0,(l&&this.ya(T,l)>0||h&&this.ya(T,h)<0)&&(c=!0)):!g&&T?(r.track({type:0,doc:T}),A=!0):g&&!T&&(r.track({type:1,doc:g}),A=!0,(l||h)&&(c=!0)),A&&(T?(o=o.add(T),i=P?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{wa:o,Da:r,ls:c,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((p,m)=>function(T,R){const P=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee()}};return P(T)-P(R)}(p.type,m.type)||this.ya(p.doc,m.doc)),this.Ca(r),s=s!=null&&s;const c=t&&!s?this.Fa():[],l=this.pa.size===0&&this.current&&!s?1:0,h=l!==this.ga;return this.ga=l,o.length!==0||h?{snapshot:new fs(this.query,e.wa,i,o,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new qf,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=pe(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new h_(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new d_(r))}),t}Oa(e){this.fa=e.gs,this.pa=pe();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return fs.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const Nu="SyncEngine";class GA{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class HA{constructor(e){this.key=e,this.Ba=!1}}class KA{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new nn(c=>cg(c),ja),this.qa=new Map,this.Qa=new Set,this.$a=new Pe(J.comparator),this.Ua=new Map,this.Ka=new _u,this.Wa={},this.Ga=new Map,this.za=_r.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function WA(n,e,t=!0){const r=v_(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await f_(r,e,t,!0),s}async function QA(n,e){const t=v_(n);await f_(t,e,!0,!1)}async function f_(n,e,t,r){const s=await mA(n.localStore,Et(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await YA(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&i_(n.remoteStore,s),c}async function YA(n,e,t,r,s){n.Ha=(m,g,T)=>async function(P,A,L,C){let N=A.view.ba(L);N.ls&&(N=await Lf(P.localStore,A.query,!1).then(({documents:I})=>A.view.ba(I,N)));const $=C&&C.targetChanges.get(A.targetId),k=C&&C.targetMismatches.get(A.targetId)!=null,U=A.view.applyChanges(N,P.isPrimaryClient,$,k);return Hf(P,A.targetId,U.Ma),U.snapshot}(n,m,g,T);const i=await Lf(n.localStore,e,!0),o=new zA(e,i.gs),c=o.ba(i.documents),l=Bi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,l);Hf(n,t,h.Ma);const p=new GA(e,t,o);return n.ka.set(e,p),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),h.snapshot}async function JA(n,e,t){const r=ue(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(o=>!ja(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await El(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Iu(r.remoteStore,s.targetId),Sl(r,s.targetId)}).catch(Ir)):(Sl(r,s.targetId),await El(r.localStore,s.targetId,!0))}async function XA(n,e){const t=ue(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Iu(t.remoteStore,r.targetId))}async function ZA(n,e,t){const r=y_(n);try{const s=await function(o,c){const l=ue(o),h=De.now(),p=c.reduce((T,R)=>T.add(R.key),pe());let m,g;return l.persistence.runTransaction("Locally write mutations","readwrite",T=>{let R=gt(),P=pe();return l.ds.getEntries(T,p).next(A=>{R=A,R.forEach((L,C)=>{C.isValidDocument()||(P=P.add(L))})}).next(()=>l.localDocuments.getOverlayedDocuments(T,R)).next(A=>{m=A;const L=[];for(const C of c){const N=gT(C,m.get(C.key).overlayedDocument);N!=null&&L.push(new rn(C.key,N,eg(N.value.mapValue),at.exists(!0)))}return l.mutationQueue.addMutationBatch(T,h,L,c)}).next(A=>{g=A;const L=A.applyToLocalDocumentSet(m,P);return l.documentOverlayCache.saveOverlays(T,A.batchId,L)})}).then(()=>({batchId:g.batchId,changes:dg(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,l){let h=o.Wa[o.currentUser.toKey()];h||(h=new Pe(le)),h=h.insert(c,l),o.Wa[o.currentUser.toKey()]=h}(r,s.batchId,t),await ji(r,s.changes),await qi(r.remoteStore)}catch(s){const i=Ru(s,"Failed to persist write");t.reject(i)}}async function p_(n,e){const t=ue(n);try{const r=await hA(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Ua.get(i);o&&(te(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Ba=!0:s.modifiedDocuments.size>0?te(o.Ba):s.removedDocuments.size>0&&(te(o.Ba),o.Ba=!1))}),await ji(t,r,e)}catch(r){await Ir(r)}}function Gf(n,e,t){const r=ue(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,o)=>{const c=o.view.sa(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const l=ue(o);l.onlineState=c;let h=!1;l.queries.forEach((p,m)=>{for(const g of m.ta)g.sa(c)&&(h=!0)}),h&&ku(l)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function e0(n,e,t){const r=ue(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ua.get(e),i=s&&s.key;if(i){let o=new Pe(J.comparator);o=o.insert(i,Me.newNoDocument(i,se.min()));const c=pe().add(i),l=new Ha(se.min(),new Map,new Pe(le),o,c);await p_(r,l),r.$a=r.$a.remove(i),r.Ua.delete(e),Du(r)}else await El(r.localStore,e,!1).then(()=>Sl(r,e,t)).catch(Ir)}async function t0(n,e){const t=ue(n),r=e.batch.batchId;try{const s=await dA(t.localStore,e);g_(t,r,null),m_(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ji(t,s)}catch(s){await Ir(s)}}async function n0(n,e,t){const r=ue(n);try{const s=await function(o,c){const l=ue(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let p;return l.mutationQueue.lookupMutationBatch(h,c).next(m=>(te(m!==null),p=m.keys(),l.mutationQueue.removeMutationBatch(h,m))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p)).next(()=>l.localDocuments.getDocuments(h,p))})}(r.localStore,e);g_(r,e,t),m_(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ji(r,s)}catch(s){await Ir(s)}}function m_(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function g_(n,e,t){const r=ue(n);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function Sl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||__(n,r)})}function __(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(Iu(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),Du(n))}function Hf(n,e,t){for(const r of t)r instanceof d_?(n.Ka.addReference(r.key,e),r0(n,r)):r instanceof h_?(G(Nu,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||__(n,r.key)):ee()}function r0(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(G(Nu,"New document in limbo: "+t),n.Qa.add(r),Du(n))}function Du(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new J(we.fromString(e)),r=n.za.next();n.Ua.set(r,new HA(t)),n.$a=n.$a.insert(t,r),i_(n.remoteStore,new Qt(Et(Fi(t.path)),r,"TargetPurposeLimboResolution",It.ae))}}async function ji(n,e,t){const r=ue(n),s=[],i=[],o=[];r.ka.isEmpty()||(r.ka.forEach((c,l)=>{o.push(r.Ha(l,e,t).then(h=>{var p;if((h||t)&&r.isPrimaryClient){const m=h?!h.fromCache:(p=t?.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(h){s.push(h);const m=bu.Yi(l.targetId,h);i.push(m)}}))}),await Promise.all(o),r.La.p_(s),await async function(l,h){const p=ue(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>D.forEach(h,g=>D.forEach(g.Hi,T=>p.persistence.referenceDelegate.addReference(m,g.targetId,T)).next(()=>D.forEach(g.Ji,T=>p.persistence.referenceDelegate.removeReference(m,g.targetId,T)))))}catch(m){if(!Dn(m))throw m;G(wu,"Failed to update sequence numbers: "+m)}for(const m of h){const g=m.targetId;if(!m.fromCache){const T=p.Ts.get(g),R=T.snapshotVersion,P=T.withLastLimboFreeSnapshotVersion(R);p.Ts=p.Ts.insert(g,P)}}}(r.localStore,i))}async function s0(n,e){const t=ue(n);if(!t.currentUser.isEqual(e)){G(Nu,"User change. New user:",e.toKey());const r=await e_(t.localStore,e);t.currentUser=e,function(i,o){i.Ga.forEach(c=>{c.forEach(l=>{l.reject(new K(F.CANCELLED,o))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ji(t,r.Rs)}}function i0(n,e){const t=ue(n),r=t.Ua.get(e);if(r&&r.Ba)return pe().add(r.key);{let s=pe();const i=t.qa.get(e);if(!i)return s;for(const o of i){const c=t.ka.get(o);s=s.unionWith(c.view.Sa)}return s}}function v_(n){const e=ue(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=p_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=i0.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=e0.bind(null,e),e.La.p_=qA.bind(null,e.eventManager),e.La.Ja=jA.bind(null,e.eventManager),e}function y_(n){const e=ue(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=t0.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=n0.bind(null,e),e}class Si{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ya(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return Zg(this.persistence,new Xg,e.initialUser,this.serializer)}Xa(e){return new vu(Qa.ri,this.serializer)}Za(e){return new n_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Si.provider={build:()=>new Si};class o0 extends Si{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){te(this.persistence.referenceDelegate instanceof pa);const r=this.persistence.referenceDelegate.garbageCollector;return new Kg(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?Xe.withCacheSize(this.cacheSizeBytes):Xe.DEFAULT;return new vu(r=>pa.ri(r,t),this.serializer)}}class a0 extends Si{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await y_(this.ru.syncEngine),await qi(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return Zg(this.persistence,new Xg,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new Kg(r,e.asyncQueue,t)}nu(e,t){const r=new gE(t,this.persistence);return new mE(e.asyncQueue,r)}Xa(e){const t=aA(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Xe.withCacheSize(this.cacheSizeBytes):Xe.DEFAULT;return new yu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,IA(),$o(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new n_}}class ga{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Gf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=s0.bind(null,this.syncEngine),await UA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new $A}()}createDatastore(e){const t=Ya(e.databaseInfo.databaseId),r=function(i){return new wA(i)}(e.databaseInfo);return function(i,o,c,l){return new SA(i,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new CA(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Gf(this.syncEngine,t,0),function(){return Uf.D()?new Uf:new _A}())}createSyncEngine(e,t){return function(s,i,o,c,l,h,p){const m=new KA(s,i,o,c,l,h);return p&&(m.ja=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=ue(s);G(vr,"RemoteStore shutting down."),i.W_.add(5),await $i(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}ga.provider={build:()=>new ga};/**
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
 */class Vu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):ot("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Pn="FirestoreClient";class c0{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=it.UNAUTHENTICATED,this.clientId=km.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{G(Pn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(G(Pn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ft;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Ru(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Bc(n,e){n.asyncQueue.verifyOperationInProgress(),G(Pn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await e_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Kf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await l0(n);G(Pn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>$f(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>$f(e.remoteStore,s)),n._onlineComponents=e}async function l0(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){G(Pn,"Using user provided OfflineComponentProvider");try{await Bc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===F.FAILED_PRECONDITION||s.code===F.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;pi("Error using user provided cache. Falling back to memory cache: "+t),await Bc(n,new Si)}}else G(Pn,"Using default OfflineComponentProvider"),await Bc(n,new o0(void 0));return n._offlineComponents}async function b_(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(G(Pn,"Using user provided OnlineComponentProvider"),await Kf(n,n._uninitializedComponentsProvider._online)):(G(Pn,"Using default OnlineComponentProvider"),await Kf(n,new ga))),n._onlineComponents}function u0(n){return b_(n).then(e=>e.syncEngine)}async function _a(n){const e=await b_(n),t=e.eventManager;return t.onListen=WA.bind(null,e.syncEngine),t.onUnlisten=JA.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=QA.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=XA.bind(null,e.syncEngine),t}function d0(n,e,t={}){const r=new Ft;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,h){const p=new Vu({next:g=>{p.su(),o.enqueueAndForget(()=>Pu(i,m));const T=g.docs.has(c);!T&&g.fromCache?h.reject(new K(F.UNAVAILABLE,"Failed to get document because the client is offline.")):T&&g.fromCache&&l&&l.source==="server"?h.reject(new K(F.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new xu(Fi(c.path),p,{includeMetadataChanges:!0,Ta:!0});return Cu(i,m)}(await _a(n),n.asyncQueue,e,t,r)),r.promise}function h0(n,e,t={}){const r=new Ft;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,h){const p=new Vu({next:g=>{p.su(),o.enqueueAndForget(()=>Pu(i,m)),g.fromCache&&l.source==="server"?h.reject(new K(F.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new xu(c,p,{includeMetadataChanges:!0,Ta:!0});return Cu(i,m)}(await _a(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function w_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const Wf=new Map;/**
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
 */function I_(n,e,t){if(!t)throw new K(F.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function f0(n,e,t,r){if(e===!0&&r===!0)throw new K(F.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Qf(n){if(!J.isDocumentKey(n))throw new K(F.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Yf(n){if(J.isDocumentKey(n))throw new K(F.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Xa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ee()}function Tt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new K(F.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Xa(n);throw new K(F.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function p0(n,e){if(e<=0)throw new K(F.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */const m0="firestore.googleapis.com",Jf=!0;class Xf{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new K(F.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=m0,this.ssl=Jf}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Jf;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=qg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Hg)throw new K(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}f0("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=w_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new K(F.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new K(F.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new K(F.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ou{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Xf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new K(F.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new K(F.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Xf(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new iE;switch(r.type){case"firstParty":return new cE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new K(F.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Wf.get(t);r&&(G("ComponentProvider","Removing Datastore"),Wf.delete(t),r.terminate())}(this),Promise.resolve()}}/**
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
 */class qt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new qt(this.firestore,e,this._query)}}class tt{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Tn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new tt(this.firestore,e,this._key)}}class Tn extends qt{constructor(e,t,r){super(e,t,Fi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new tt(this.firestore,null,new J(e))}withConverter(e){return new Tn(this.firestore,e,this._path)}}function Ve(n,e,...t){if(n=Re(n),I_("collection","path",e),n instanceof Ou){const r=we.fromString(e,...t);return Yf(r),new Tn(n,null,r)}{if(!(n instanceof tt||n instanceof Tn))throw new K(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(we.fromString(e,...t));return Yf(r),new Tn(n.firestore,null,r)}}function Oe(n,e,...t){if(n=Re(n),arguments.length===1&&(e=km.newId()),I_("doc","path",e),n instanceof Ou){const r=we.fromString(e,...t);return Qf(r),new tt(n,null,new J(r))}{if(!(n instanceof tt||n instanceof Tn))throw new K(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(we.fromString(e,...t));return Qf(r),new tt(n.firestore,n instanceof Tn?n.converter:null,new J(r))}}/**
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
 */const Zf="AsyncQueue";class ep{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new r_(this,"async_queue_retry"),this.Su=()=>{const r=$o();r&&G(Zf,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=$o();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=$o();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new Ft;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!Dn(e))throw e;G(Zf,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw ot("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=Su.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&ee()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function tp(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class kn extends Ou{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new ep,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ep(e),this._firestoreClient=void 0,await e}}}function g0(n,e,t){t||(t=ia);const r=bs(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(ui(i,e))return s;throw new K(F.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new K(F.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Hg)throw new K(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function Za(n){if(n._terminated)throw new K(F.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||_0(n),n._firestoreClient}function _0(n){var e,t,r;const s=n._freezeSettings(),i=function(c,l,h,p){return new GE(c,l,h,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,w_(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new c0(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const l=c?._online.build();return{_offline:c?._offline.build(l),_online:l}}(n._componentsProvider))}/**
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
 */class ps{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ps($e.fromBase64String(e))}catch(t){throw new K(F.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ps($e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class ec{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new K(F.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ne(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class tc{constructor(e){this._methodName=e}}/**
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
 */class Lu{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new K(F.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new K(F.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return le(this._lat,e._lat)||le(this._long,e._long)}}/**
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
 */class Mu{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
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
 */const v0=/^__.*__$/;class y0{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new rn(e,this.data,this.fieldMask,t,this.fieldTransforms):new As(e,this.data,t,this.fieldTransforms)}}class E_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new rn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function T_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee()}}class Fu{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new Fu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return va(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(T_(this.Lu)&&v0.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class b0{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ya(e)}ju(e,t,r,s=!1){return new Fu({Lu:e,methodName:t,zu:r,path:Ne.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function zi(n){const e=n._freezeSettings(),t=Ya(n._databaseId);return new b0(n._databaseId,!!e.ignoreUndefinedProperties,t)}function A_(n,e,t,r,s,i={}){const o=n.ju(i.merge||i.mergeFields?2:0,e,t,s);Bu("Data must be an object, but it was:",o,r);const c=R_(r,o);let l,h;if(i.merge)l=new lt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const g=Rl(e,m,t);if(!o.contains(g))throw new K(F.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);P_(p,g)||p.push(g)}l=new lt(p),h=o.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,h=o.fieldTransforms;return new y0(new Ze(c),l,h)}class Gi extends tc{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Gi}}class Uu extends tc{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new ds(e.serializer,pg(e.serializer,this.Ju));return new yg(e.path,t)}isEqual(e){return e instanceof Uu&&this.Ju===e.Ju}}function w0(n,e,t,r){const s=n.ju(1,e,t);Bu("Data must be an object, but it was:",s,r);const i=[],o=Ze.empty();Vn(r,(l,h)=>{const p=$u(e,l,t);h=Re(h);const m=s.Uu(p);if(h instanceof Gi)i.push(p);else{const g=Hi(h,m);g!=null&&(i.push(p),o.set(p,g))}});const c=new lt(i);return new E_(o,c,s.fieldTransforms)}function I0(n,e,t,r,s,i){const o=n.ju(1,e,t),c=[Rl(e,r,t)],l=[s];if(i.length%2!=0)throw new K(F.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Rl(e,i[g])),l.push(i[g+1]);const h=[],p=Ze.empty();for(let g=c.length-1;g>=0;--g)if(!P_(h,c[g])){const T=c[g];let R=l[g];R=Re(R);const P=o.Uu(T);if(R instanceof Gi)h.push(T);else{const A=Hi(R,P);A!=null&&(h.push(T),p.set(T,A))}}const m=new lt(h);return new E_(p,m,o.fieldTransforms)}function S_(n,e,t,r=!1){return Hi(t,n.ju(r?4:3,e))}function Hi(n,e){if(C_(n=Re(n)))return Bu("Unsupported field value:",e,n),R_(n,e);if(n instanceof tc)return function(r,s){if(!T_(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let l=Hi(c,s.Ku(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Re(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return pg(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=De.fromDate(r);return{timestampValue:hs(s.serializer,i)}}if(r instanceof De){const i=new De(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:hs(s.serializer,i)}}if(r instanceof Lu)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ps)return{bytesValue:Sg(s.serializer,r._byteString)};if(r instanceof tt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:pu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Mu)return function(o,c){return{mapValue:{fields:{[su]:{stringValue:iu},[os]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw c.Wu("VectorValues must only contain numeric values.");return cu(c.serializer,h)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${Xa(r)}`)}(n,e)}function R_(n,e){const t={};return Gm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Vn(n,(r,s)=>{const i=Hi(s,e.qu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function C_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof De||n instanceof Lu||n instanceof ps||n instanceof tt||n instanceof tc||n instanceof Mu)}function Bu(n,e,t){if(!C_(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=Xa(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function Rl(n,e,t){if((e=Re(e))instanceof ec)return e._internalPath;if(typeof e=="string")return $u(n,e);throw va("Field path arguments must be of type string or ",n,!1,void 0,t)}const E0=new RegExp("[~\\*/\\[\\]]");function $u(n,e,t){if(e.search(E0)>=0)throw va(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ec(...e.split("."))._internalPath}catch{throw va(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function va(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new K(F.INVALID_ARGUMENT,c+n+l)}function P_(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class qu{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new tt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new T0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(nc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class T0 extends qu{data(){return super.data()}}function nc(n,e){return typeof e=="string"?$u(n,e):e instanceof ec?e._internalPath:e._delegate._internalPath}/**
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
 */function k_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new K(F.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ju{}class rc extends ju{}function ht(n,e,...t){let r=[];e instanceof ju&&r.push(e),r=r.concat(t),function(i){const o=i.filter(l=>l instanceof zu).length,c=i.filter(l=>l instanceof sc).length;if(o>1||o>0&&c>0)throw new K(F.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class sc extends rc{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new sc(e,t,r)}_apply(e){const t=this._parse(e);return x_(e._query,t),new qt(e.firestore,e.converter,ml(e._query,t))}_parse(e){const t=zi(e.firestore);return function(i,o,c,l,h,p,m){let g;if(h.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new K(F.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){rp(m,p);const R=[];for(const P of m)R.push(np(l,i,P));g={arrayValue:{values:R}}}else g=np(l,i,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||rp(m,p),g=S_(c,o,m,p==="in"||p==="not-in");return ge.create(h,p,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function xn(n,e,t){const r=e,s=nc("where",n);return sc._create(s,r,t)}class zu extends ju{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new zu(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ie.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)x_(o,l),o=ml(o,l)}(e._query,t),new qt(e.firestore,e.converter,ml(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Gu extends rc{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Gu(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new K(F.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new K(F.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ti(i,o)}(e._query,this._field,this._direction);return new qt(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Er(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function At(n,e="asc"){const t=e,r=nc("orderBy",n);return Gu._create(r,t)}class Hu extends rc{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Hu(e,t,r)}_apply(e){return new qt(e.firestore,e.converter,ca(e._query,this._limit,this._limitType))}}function vt(n){return p0("limit",n),Hu._create("limit",n,"F")}class Ku extends rc{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Ku(e,t,r)}_apply(e){const t=S0(e,this.type,this._docOrFields,this._inclusive);return new qt(e.firestore,e.converter,function(s,i){return new Er(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function A0(...n){return Ku._create("startAfter",n,!1)}function S0(n,e,t,r){if(t[0]=Re(t[0]),t[0]instanceof qu)return function(i,o,c,l,h){if(!l)throw new K(F.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const p=[];for(const m of Qr(i))if(m.field.isKeyField())p.push(fr(o,l.key));else{const g=l.data.field(m.field);if(Ba(g))throw new K(F.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const T=m.field.canonicalString();throw new K(F.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${T}' (used as the orderBy) does not exist.`)}p.push(g)}return new Rn(p,h)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=zi(n.firestore);return function(o,c,l,h,p,m){const g=o.explicitOrderBy;if(p.length>g.length)throw new K(F.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const T=[];for(let R=0;R<p.length;R++){const P=p[R];if(g[R].field.isKeyField()){if(typeof P!="string")throw new K(F.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof P}`);if(!au(o)&&P.indexOf("/")!==-1)throw new K(F.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${P}' contains a slash.`);const A=o.path.child(we.fromString(P));if(!J.isDocumentKey(A))throw new K(F.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${A}' is not because it contains an odd number of segments.`);const L=new J(A);T.push(fr(c,L))}else{const A=S_(l,h,P);T.push(A)}}return new Rn(T,m)}(n._query,n.firestore._databaseId,s,e,t,r)}}function np(n,e,t){if(typeof(t=Re(t))=="string"){if(t==="")throw new K(F.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!au(e)&&t.indexOf("/")!==-1)throw new K(F.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(we.fromString(t));if(!J.isDocumentKey(r))throw new K(F.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return fr(n,new J(r))}if(t instanceof tt)return fr(n,t._key);throw new K(F.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Xa(t)}.`)}function rp(n,e){if(!Array.isArray(n)||n.length===0)throw new K(F.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function x_(n,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new K(F.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new K(F.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class R0{convertValue(e,t="none"){switch(An(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(en(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ee()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Vn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[os].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Ce(o.doubleValue));return new Mu(i)}convertGeoPoint(e){return new Lu(Ce(e.latitude),Ce(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=$a(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(wi(e));default:return null}}convertTimestamp(e){const t=Zt(e);return new De(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=we.fromString(e);te(Lg(r));const s=new hr(r.get(1),r.get(3)),i=new J(r.popFirst(5));return s.isEqual(t)||ot(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function N_(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
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
 */class Zs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class D_ extends qu{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new qo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(nc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class qo extends D_{data(e={}){return super.data(e)}}class V_{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Zs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new qo(this._firestore,this._userDataWriter,r.key,r,new Zs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new K(F.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const l=new qo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Zs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new qo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Zs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),p=o.indexOf(c.doc.key)),{type:C0(c.type),doc:l,oldIndex:h,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function C0(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee()}}/**
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
 */function Ar(n){n=Tt(n,tt);const e=Tt(n.firestore,kn);return d0(Za(e),n._key).then(t=>L_(e,n,t))}class Wu extends R0{constructor(e){super(),this.firestore=e}convertBytes(e){return new ps(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new tt(this.firestore,null,t)}}function tn(n){n=Tt(n,qt);const e=Tt(n.firestore,kn),t=Za(e),r=new Wu(e);return k_(n._query),h0(t,n._query).then(s=>new V_(e,r,n,s))}function O_(n,e,t){n=Tt(n,tt);const r=Tt(n.firestore,kn),s=N_(n.converter,e,t);return Qu(r,[A_(zi(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,at.none())])}function yt(n,e,t,...r){n=Tt(n,tt);const s=Tt(n.firestore,kn),i=zi(s);let o;return o=typeof(e=Re(e))=="string"||e instanceof ec?I0(i,"updateDoc",n._key,e,t,r):w0(i,"updateDoc",n._key,e),Qu(s,[o.toMutation(n._key,at.exists(!0))])}function On(n,e){const t=Tt(n.firestore,kn),r=Oe(n),s=N_(n.converter,e);return Qu(t,[A_(zi(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,at.exists(!1))]).then(()=>r)}function Ln(n,...e){var t,r,s;n=Re(n);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||tp(e[o])||(i=e[o],o++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(tp(e[o])){const m=e[o];e[o]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let l,h,p;if(n instanceof tt)h=Tt(n.firestore,kn),p=Fi(n._key.path),l={next:m=>{e[o]&&e[o](L_(h,n,m))},error:e[o+1],complete:e[o+2]};else{const m=Tt(n,qt);h=Tt(m.firestore,kn),p=m._query;const g=new Wu(h);l={next:T=>{e[o]&&e[o](new V_(h,g,m,T))},error:e[o+1],complete:e[o+2]},k_(n._query)}return function(g,T,R,P){const A=new Vu(P),L=new xu(T,A,R);return g.asyncQueue.enqueueAndForget(async()=>Cu(await _a(g),L)),()=>{A.su(),g.asyncQueue.enqueueAndForget(async()=>Pu(await _a(g),L))}}(Za(h),p,c,l)}function Qu(n,e){return function(r,s){const i=new Ft;return r.asyncQueue.enqueueAndForget(async()=>ZA(await u0(r),s,i)),i.promise}(Za(n),e)}function L_(n,e,t){const r=t.docs.get(e._key),s=new Wu(n);return new D_(n,s,e._key,r,new Zs(t.hasPendingWrites,t.fromCache),e.converter)}class P0{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=M_(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function k0(n){return new P0(n)}class x0{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=ga.provider,this._offlineComponentProvider={build:t=>new a0(t,e?.cacheSizeBytes,this.forceOwnership)}}}function M_(n){return new x0(n?.forceOwnership)}/**
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
 */function sp(){return new Gi("deleteField")}function jt(n){return new Uu("increment",n)}(function(e,t=!0){(function(s){Ts=s})(ws),Jt(new Ut("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new kn(new oE(r.getProvider("auth-internal")),new lE(o,r.getProvider("app-check-internal")),function(h,p){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new K(F.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new hr(h.options.projectId,p)}(o,s),o);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Ct(Mh,Fh,e),Ct(Mh,Fh,"esm2017")})();var N0="firebase",D0="11.3.0";/**
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
 */Ct(N0,D0,"app");/**
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
 */const Cl=new Map,F_={activated:!1,tokenObservers:[]},V0={initialized:!1,enabled:!1};function qe(n){return Cl.get(n)||Object.assign({},F_)}function O0(n,e){return Cl.set(n,e),Cl.get(n)}function ic(){return V0}/**
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
 */const U_="https://content-firebaseappcheck.googleapis.com/v1",L0="exchangeRecaptchaV3Token",M0="exchangeDebugToken",ip={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},F0=24*60*60*1e3;/**
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
 */class U0{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new li,this.pending.promise.catch(t=>{}),await B0(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new li,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function B0(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */const $0={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},ut=new ys("appCheck","AppCheck",$0);/**
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
 */function op(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function Yu(n){if(!qe(n).activated)throw ut.create("use-before-activation",{appName:n.name})}function B_(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let o="";return t&&(o+=yo(t)+"d:"),r&&(o+=yo(r)+"h:"),o+=yo(s)+"m:"+yo(i)+"s",o}function yo(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
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
 */async function Ju({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const m=await s.getHeartbeatsHeader();m&&(r["X-Firebase-Client"]=m)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,i)}catch(m){throw ut.create("fetch-network-error",{originalErrorMessage:m?.message})}if(o.status!==200)throw ut.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(m){throw ut.create("fetch-parse-error",{originalErrorMessage:m?.message})}const l=c.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw ut.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const h=Number(l[1])*1e3,p=Date.now();return{token:c.token,expireTimeMillis:p+h,issuedAtTimeMillis:p}}function q0(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${U_}/projects/${t}/apps/${r}:${L0}?key=${s}`,body:{recaptcha_v3_token:e}}}function $_(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${U_}/projects/${t}/apps/${r}:${M0}?key=${s}`,body:{debug_token:e}}}/**
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
 */const j0="firebase-app-check-database",z0=1,Ri="firebase-app-check-store",q_="debug-token";let bo=null;function j_(){return bo||(bo=new Promise((n,e)=>{try{const t=indexedDB.open(j0,z0);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(ut.create("storage-open",{originalErrorMessage:(s=r.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Ri,{keyPath:"compositeKey"})}}}catch(t){e(ut.create("storage-open",{originalErrorMessage:t?.message}))}}),bo)}function G0(n){return G_(H_(n))}function H0(n,e){return z_(H_(n),e)}function K0(n){return z_(q_,n)}function W0(){return G_(q_)}async function z_(n,e){const r=(await j_()).transaction(Ri,"readwrite"),i=r.objectStore(Ri).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=l=>{o()},r.onerror=l=>{var h;c(ut.create("storage-set",{originalErrorMessage:(h=l.target.error)===null||h===void 0?void 0:h.message}))}})}async function G_(n){const t=(await j_()).transaction(Ri,"readonly"),s=t.objectStore(Ri).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{const l=c.target.result;i(l?l.value:void 0)},t.onerror=c=>{var l;o(ut.create("storage-get",{originalErrorMessage:(l=c.target.error)===null||l===void 0?void 0:l.message}))}})}function H_(n){return`${n.options.appId}-${n.name}`}/**
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
 */const Ci=new ka("@firebase/app-check");/**
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
 */async function Q0(n){if(Pa()){let e;try{e=await G0(n)}catch(t){Ci.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function $c(n,e){return Pa()?H0(n,e).catch(t=>{Ci.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function Y0(){let n;try{n=await W0()}catch{}if(n)return n;{const e=crypto.randomUUID();return K0(e).catch(t=>Ci.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
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
 */function Xu(){return ic().enabled}async function Zu(){const n=ic();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function J0(){const n=Dp(),e=ic();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new li;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(Y0())}/**
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
 */const X0={error:"UNKNOWN_ERROR"};function Z0(n){return Ul.encodeString(JSON.stringify(n),!1)}async function Pl(n,e=!1){const t=n.app;Yu(t);const r=qe(t);let s=r.token,i;if(s&&!Gr(s)&&(r.token=void 0,s=void 0),!s){const l=await r.cachedTokenPromise;l&&(Gr(l)?s=l:await $c(t,void 0))}if(!e&&s&&Gr(s))return{token:s.token};let o=!1;if(Xu()){r.exchangeTokenPromise||(r.exchangeTokenPromise=Ju($_(t,await Zu()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),o=!0);const l=await r.exchangeTokenPromise;return await $c(t,l),r.token=l,{token:l.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),o=!0),s=await qe(t).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"?Ci.warn(l.message):Ci.error(l),i=l}let c;return s?i?Gr(s)?c={token:s.token,internalError:i}:c=cp(i):(c={token:s.token},r.token=s,await $c(t,s)):c=cp(i),o&&Q_(t,c),c}async function eS(n){const e=n.app;Yu(e);const{provider:t}=qe(e);if(Xu()){const r=await Zu(),{token:s}=await Ju($_(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function K_(n,e,t,r){const{app:s}=n,i=qe(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&Gr(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),ap(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>ap(n))}function W_(n,e){const t=qe(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function ap(n){const{app:e}=n,t=qe(e);let r=t.tokenRefresher;r||(r=tS(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function tS(n){const{app:e}=n;return new U0(async()=>{const t=qe(e);let r;if(t.token?r=await Pl(n,!0):r=await Pl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=qe(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},ip.RETRIAL_MIN_WAIT,ip.RETRIAL_MAX_WAIT)}function Q_(n,e){const t=qe(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Gr(n){return n.expireTimeMillis-Date.now()>0}function cp(n){return{token:Z0(X0),error:n}}/**
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
 */class nS{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=qe(this.app);for(const t of e)W_(this.app,t.next);return Promise.resolve()}}function rS(n,e){return new nS(n,e)}function sS(n){return{getToken:e=>Pl(n,e),getLimitedUseToken:()=>eS(n),addTokenListener:e=>K_(n,"INTERNAL",e),removeTokenListener:e=>W_(n.app,e)}}const iS="@firebase/app-check",oS="0.8.11";/**
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
 */const aS="https://www.google.com/recaptcha/api.js";function cS(n,e){const t=new li,r=qe(n);r.reCAPTCHAState={initialized:t};const s=lS(n),i=op(!1);return i?lp(n,e,i,s,t):hS(()=>{const o=op(!1);if(!o)throw new Error("no recaptcha");lp(n,e,o,s,t)}),t.promise}function lp(n,e,t,r,s){t.ready(()=>{dS(n,e,t,r),s.resolve(t)})}function lS(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function uS(n){Yu(n);const t=await qe(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=qe(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function dS(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{qe(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{qe(n).reCAPTCHAState.succeeded=!1}}),i=qe(n);i.reCAPTCHAState=Object.assign(Object.assign({},i.reCAPTCHAState),{widgetId:s})}function hS(n){const e=document.createElement("script");e.src=aS,e.onload=n,document.head.appendChild(e)}/**
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
 */class ed{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;pS(this._throttleData);const s=await uS(this._app).catch(o=>{throw ut.create("recaptcha-error")});if(!(!((e=qe(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw ut.create("recaptcha-error");let i;try{i=await Ju(q0(this._app,s),this._heartbeatServiceProvider)}catch(o){throw!((t=o.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=fS(Number((r=o.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),ut.create("throttled",{time:B_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,i}initialize(e){this._app=e,this._heartbeatServiceProvider=bs(e,"heartbeat"),cS(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof ed?this._siteKey===e._siteKey:!1}}function fS(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+F0,httpStatus:n};{const t=e?e.backoffCount:0,r=Ly(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function pS(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw ut.create("throttled",{time:B_(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
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
 */function mS(n=$l(),e){n=Re(n);const t=bs(n,"app-check");if(ic().initialized||J0(),Xu()&&Zu().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw ut.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return gS(n,e.provider,e.isTokenAutoRefreshEnabled),qe(n).isTokenAutoRefreshEnabled&&K_(r,"INTERNAL",()=>{}),r}function gS(n,e,t){const r=O0(n,Object.assign({},F_));r.activated=!0,r.provider=e,r.cachedTokenPromise=Q0(n).then(s=>(s&&Gr(s)&&(r.token=s,Q_(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const _S="app-check",up="app-check-internal";function vS(){Jt(new Ut(_S,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return rS(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(up).initialize()})),Jt(new Ut(up,n=>{const e=n.getProvider("app-check").getImmediate();return sS(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),Ct(iS,oS)}vS();/**
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
 */const yS="type.googleapis.com/google.protobuf.Int64Value",bS="type.googleapis.com/google.protobuf.UInt64Value";function Y_(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function ya(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>ya(e));if(typeof n=="function"||typeof n=="object")return Y_(n,e=>ya(e));throw new Error("Data cannot be encoded in JSON: "+n)}function ms(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case yS:case bS:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>ms(e)):typeof n=="function"||typeof n=="object"?Y_(n,e=>ms(e)):n}/**
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
 */const td="functions";/**
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
 */const dp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class dt extends $t{constructor(e,t,r){super(`${td}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,dt.prototype)}}function wS(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function ba(n,e){let t=wS(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!dp[o])return new dt("internal","internal");t=dp[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=ms(s))}}catch{}return t==="ok"?null:new dt(t,r,s)}/**
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
 */class IS{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,wt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
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
 */const kl="us-central1",ES=/^data: (.*?)(?:\n|$)/;function TS(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new dt("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class AS{constructor(e,t,r,s,i=kl,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new IS(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=kl}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function SS(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function RS(n,e,t){const r=s=>PS(n,e,s,{});return r.stream=(s,i)=>xS(n,e,s,i),r}async function CS(n,e,t,r){t["Content-Type"]="application/json";let s;try{s=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}async function J_(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function PS(n,e,t,r){const s=n._url(e);return kS(n,s,t,r)}async function kS(n,e,t,r){t=ya(t);const s={data:t},i=await J_(n,r),o=r.timeout||7e4,c=TS(o),l=await Promise.race([CS(e,s,i,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!l)throw new dt("cancelled","Firebase Functions instance was deleted.");const h=ba(l.status,l.json);if(h)throw h;if(!l.json)throw new dt("internal","Response is not valid JSON object.");let p=l.json.data;if(typeof p>"u"&&(p=l.json.result),typeof p>"u")throw new dt("internal","Response is missing data field.");return{data:ms(p)}}function xS(n,e,t,r){const s=n._url(e);return NS(n,s,t,r||{})}async function NS(n,e,t,r){var s;t=ya(t);const i={data:t},o=await J_(n,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:o,signal:r?.signal})}catch(T){if(T instanceof Error&&T.name==="AbortError"){const P=new dt("cancelled","Request was cancelled.");return{data:Promise.reject(P),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(P)}}}}}}const R=ba(0,null);return{data:Promise.reject(R),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(R)}}}}}}let l,h;const p=new Promise((T,R)=>{l=T,h=R});(s=r?.signal)===null||s===void 0||s.addEventListener("abort",()=>{const T=new dt("cancelled","Request was cancelled.");h(T)});const m=c.body.getReader(),g=DS(m,l,h,r?.signal);return{stream:{[Symbol.asyncIterator](){const T=g.getReader();return{async next(){const{value:R,done:P}=await T.read();return{value:R,done:P}},async return(){return await T.cancel(),{done:!0,value:void 0}}}}},data:p}}function DS(n,e,t,r){const s=(o,c)=>{const l=o.match(ES);if(!l)return;const h=l[1];try{const p=JSON.parse(h);if("result"in p){e(ms(p.result));return}if("message"in p){c.enqueue(ms(p.message));return}if("error"in p){const m=ba(0,p);c.error(m),t(m);return}}catch(p){if(p instanceof dt){c.error(p),t(p);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return l();async function l(){if(r?.aborted){const h=new dt("cancelled","Request was cancelled");return o.error(h),t(h),Promise.resolve()}try{const{value:h,done:p}=await n.read();if(p){c.trim()&&s(c.trim(),o),o.close();return}if(r?.aborted){const g=new dt("cancelled","Request was cancelled");o.error(g),t(g),await n.cancel();return}c+=i.decode(h,{stream:!0});const m=c.split(`
`);c=m.pop()||"";for(const g of m)g.trim()&&s(g.trim(),o);return l()}catch(h){const p=h instanceof dt?h:ba(0,null);o.error(p),t(p)}}},cancel(){return n.cancel()}})}const hp="@firebase/functions",fp="0.12.2";/**
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
 */const VS="auth-internal",OS="app-check-internal",LS="messaging-internal";function MS(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(VS),o=t.getProvider(LS),c=t.getProvider(OS);return new AS(s,i,o,c,r)};Jt(new Ut(td,e,"PUBLIC").setMultipleInstances(!0)),Ct(hp,fp,n),Ct(hp,fp,"esm2017")}/**
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
 */function FS(n=$l(),e=kl){const r=bs(Re(n),td).getImmediate({identifier:e}),s=_y("functions");return s&&US(r,...s),r}function US(n,e,t){SS(Re(n),e,t)}function Sr(n,e,t){return RS(Re(n),e)}MS();const BS={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},$S="altorra-crm",oc=Bp(BS,$S);mS(oc,{provider:new ed("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const wa=nE(oc),de=g0(oc,{localCache:k0({tabManager:M_({})})}),Rr=FS(oc,"us-central1");function Pt(n){const e=H.get().permissions||[];return e.includes("*")||e.includes(n)}function qS(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function jS(n){try{const e=await Ar(Oe(de,"usuarios",n.uid)),t=e.exists()?e.data():null;H.set({user:n,profile:t,permissions:qS(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),H.set({user:n,profile:null,permissions:[],ready:!0})}}function zS(){qw(wa,mm).catch(()=>{}),Gw(wa,n=>{n?jS(n):H.set({user:null,profile:null,permissions:[],ready:!0})})}const GS={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function HS(n,e){H.set({authError:null});try{await $w(wa,String(n).trim(),e)}catch(t){const r=GS[t&&t.code]||"No se pudo iniciar sesión.";throw H.set({authError:r}),t}}async function KS(){if(H.get().mock){H.set({user:null,profile:null,permissions:[]});return}await Hw(wa)}function qc(){const{profile:n,user:e}=H.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function WS(){const{profile:n}=H.get();return n&&(n.cargo||n.roleName)||"Asesor"}const QS=["bandeja","pipeline","agenda","reportes","contactos","config"];function X_(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return QS.includes(e)?e:"bandeja"}function YS(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function JS(n){const e=()=>n(X_());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function u(n,e={},t=[]){const r=document.createElement(n);for(const[s,i]of Object.entries(e))i==null||i===!1||(s==="class"?r.className=i:s==="html"?r.innerHTML=i:s==="text"?r.textContent=i:s==="dataset"?Object.assign(r.dataset,i):s==="style"&&typeof i=="object"?Object.assign(r.style,i):s.startsWith("on")&&typeof i=="function"?r.addEventListener(s.slice(2).toLowerCase(),i):r.setAttribute(s,i===!0?"":String(i)));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function ye(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let Jr=null;function Z_(n){Jr&&!Jr.contains(n.target)&&Ia()}function ev(n){n.key==="Escape"&&Ia()}function Ia(){Jr&&(Jr.remove(),Jr=null,document.removeEventListener("mousedown",Z_,!0),window.removeEventListener("keydown",ev,!0))}function Dt(n,e,t,r={}){Ia();const s=u("div",{class:"popover",role:"menu"});r.title&&s.append(u("div",{class:"popover__title",text:r.title})),e.forEach(o=>{if(o.divider){s.append(u("div",{class:"popover__divider"}));return}const c=u("button",{class:"popover__item"+(o.active?" is-active":""),type:"button",role:"menuitem"},[o.icon?u("span",{class:"popover__icon",text:o.icon}):null,u("span",{class:"u-grow u-truncate",text:o.label}),o.hint?u("span",{class:"popover__hint u-caption",text:o.hint}):null]);c.addEventListener("click",l=>{l.stopPropagation(),Ia(),t(o)}),s.append(c)}),document.body.append(s),XS(s,n),Jr=s,setTimeout(()=>{document.addEventListener("mousedown",Z_,!0),window.addEventListener("keydown",ev,!0)},0);const i=s.querySelector(".popover__item");i&&i.focus()}function XS(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,s=n.offsetHeight;let i=t.bottom+6,o=t.right-r;o<8&&(o=8),o+r>window.innerWidth-8&&(o=window.innerWidth-r-8),i+s>window.innerHeight-8&&(i=t.top-s-6),n.style.top=`${Math.max(8,i)}px`,n.style.left=`${Math.max(8,o)}px`}function gs(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function ZS(n){return String(n||"").replace(/\D/g,"")}function tv(n,e){const t=ZS(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function nv(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function _s(n){const e=nv(n);return e===1/0?1/0:e/864e5}function lr(n){const e=nv(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const s=Math.floor(r/24);return s===1?"ayer":s<7?`hace ${s} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function eR(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function jc(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),s=t%60;return s?`${r} h ${s} min`:`${r} h`}function Yn(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function Ea(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const tR="0.4.1",nR=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0},{id:"config",label:"Disponibilidad",icon:"⚙️",ready:!0,perm:"calendar.config"}],zc={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos",config:"Disponibilidad de citas"};function rR(n){const e={},t=u("div",{class:"sidebar__brand"},[u("span",{class:"sidebar__logo",text:"ALTORRA"}),u("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=u("nav",{class:"sidebar__nav","aria-label":"Secciones"});nR.filter(P=>!P.perm||Pt(P.perm)).forEach(P=>{const A=u("button",{class:"navitem",type:"button",disabled:!P.ready},[u("span",{class:"navitem__icon","aria-hidden":"true",text:P.icon}),u("span",{class:"navitem__label",text:P.label}),P.ready?null:u("span",{class:"navitem__soon",text:"Pronto"})]);P.ready&&A.addEventListener("click",()=>YS(P.id)),e[P.id]=A,r.append(A)});const s=u("aside",{class:"sidebar"},[t,r,u("div",{class:"sidebar__foot u-caption u-faint"},[`v${tR} · Fase 4`])]),i=u("h1",{class:"topbar__h",text:zc.bandeja}),o=u("span",{class:"topbar__crumb u-caption u-faint",text:H.get().mock?"modo demo":"tiempo real"}),c=u("div",{class:"topbar__title"},[i,o]),l=u("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[u("span",{"aria-hidden":"true",text:H.get().theme==="dark"?"☀️":"🌙"})]);l.addEventListener("click",()=>{const P=uy();l.firstChild.textContent=P==="dark"?"☀️":"🌙"});const h=u("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:gs(qc())}),u("span",{class:"usermenu__meta"},[u("span",{class:"usermenu__name u-truncate",text:qc()}),u("span",{class:"usermenu__role u-caption u-faint u-truncate",text:WS()})])]);h.addEventListener("click",()=>{Dt(h,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],P=>{P.value==="logout"&&KS()},{title:qc()})});const p=u("header",{class:"topbar"},[c,u("div",{class:"topbar__actions u-row"},[l,h])]),m=u("main",{class:"outlet",id:"outlet"}),g=u("div",{id:"detail-root"}),T=u("div",{class:"app-shell"},[s,u("div",{class:"app-main"},[p,m]),g]);ye(n),n.removeAttribute("aria-busy"),n.append(T);function R(P){Object.entries(e).forEach(([A,L])=>{const C=A===P;L.classList.toggle("is-active",C),C?L.setAttribute("aria-current","page"):L.removeAttribute("aria-current")}),i.textContent=zc[P]||zc.bandeja}return{outlet:m,detailRoot:g,setActive:R}}function sR(n){const e=u("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=u("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=u("div",{class:"login__error",role:"alert",hidden:!0}),s=u("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),i=u("form",{class:"login__form"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Correo"}),e]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Contraseña"}),t]),r,s]);i.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,s.disabled=!0,s.textContent="Entrando…";try{await HS(e.value,t.value)}catch{r.textContent=H.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,s.disabled=!1,s.textContent="Entrar"}});const o=u("div",{class:"login surface"},[u("div",{class:"login__brand"},[u("span",{class:"login__logo",text:"ALTORRA"}),u("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),u("h1",{class:"login__title",text:"Bienvenido"}),u("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),i,u("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);ye(n),n.removeAttribute("aria-busy"),n.append(u("div",{class:"login-wrap"},[o])),setTimeout(()=>e.focus(),50)}const iR=()=>document.getElementById("toast-root"),pp={ok:"✓",error:"⚠",info:"ℹ"};function W(n,e="info",t=3200){const r=iR();if(!r)return;const s=document.createElement("div");s.className=`toast toast--${e}`,s.setAttribute("role",e==="error"?"alert":"status");const i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.textContent=pp[e]||pp.info;const o=document.createElement("span");o.className="u-grow",o.textContent=n,s.append(i,o),r.appendChild(s);const c=()=>{s.classList.add("is-leaving"),s.addEventListener("animationend",()=>s.remove(),{once:!0})},l=setTimeout(c,t);s.addEventListener("click",()=>{clearTimeout(l),c()})}const oR=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],aR=["cita","test_drive","test-drive","visita","agendar","peritaje"],cR=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],lR=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],uR={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function ac(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return lR.some(s=>e.includes(s)||t.includes(s))?r="pqr":t.includes("cita")||aR.some(s=>e.includes(s))?r="cita":cR.some(s=>e.includes(s))&&(r="solicitud"),{type:r,...uR[r]}}function nd(n){const e=String(n.sourceDetail||"").toLowerCase();return oR.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const dR={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function Pi(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...dR[t]}}const hR=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],fR=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],wo={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function rv(n){const e=vs(n.status),{type:t}=ac(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(wo[t]||wo.lead));const s=r-Date.now(),i=wo[t]||wo.lead;let o="ok";return e?o="ok":s<=0?o="late":s<i*.25&&(o="warn"),{state:o,dueAt:r,remainingMs:s,closed:e}}const xl=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"convertido",label:"Convertido",badge:"ok"},{id:"descartado",label:"Descartado",badge:""}],pR=[{id:"inalcanzable",label:"Inalcanzable (no responde)"},{id:"no_califica",label:"No califica (sin presupuesto/intención)"},{id:"duplicado",label:"Duplicado"},{id:"ya_compro_en_otra_parte",label:"Ya compró en otra parte"},{id:"spam_prueba",label:"Spam / prueba"}],mR={calificado:{id:"calificado",label:"Calificado (v2)",badge:"ok"},no_calificado:{id:"no_calificado",label:"No calificado (v2)",badge:""},perdido:{id:"perdido",label:"Perdido (v2)",badge:"danger"}},gR=xl.reduce((n,e)=>(n[e.id]=e,n),{});function jo(n){return gR[n]||mR[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function vs(n){return n==="convertido"||n==="descartado"||n==="perdido"||n==="no_calificado"}function sv(n){return!n.status||n.status==="nuevo"}const Nl={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},rr=n=>Math.max(0,Math.min(1,n));function _R(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return nd(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),rr(t)}function vR(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const s=(r.match(/\d[\d.,]{5,}/g)||[]).map(i=>parseInt(i.replace(/\D/g,""),10)).filter(i=>i>0);s.length&&(e=Math.max(e,Math.max(...s)/5e7))}return rr(e)}function yR(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(_s(r)>30||e.add(String(r).slice(0,10)))}return rr(e.size/8)}function iv(n,e=[],t=null){const r=Array.isArray(e)?e:[],s={intent:_R(n),interactions:rr(r.length/6),recency:n.lastActivityAt?rr(1-_s(n.lastActivityAt)/30):0,frequency:yR(r),economic:vR(r),age:n.createdAt?rr(_s(n.createdAt)/60):0,engagement:t&&Number(t.score)?rr(t.score/100):0};let i=0;for(const c of Object.keys(Nl))i+=s[c]*Nl[c];const o=Math.round(i*100);return{score:o,rating:bR(o),factors:s}}function bR(n){return n>=70?"hot":n>=40?"warm":"cold"}const Xr={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},mp={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},wR=Nl;function ov(n,e={}){const t=Number(e.score)||0,{type:r}=ac(n),s=_s(n.createdAt),i=_s(n.lastActivityAt),o=sv(n),c=vs(n.status),l=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&o,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&o&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:nd(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:o&&s<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&i>=2&&i<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:i>=30&&i!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],p=l.filter(m=>m.when).sort((m,g)=>g.priority-m.priority)[0]||l[l.length-1];return{id:p.id,label:p.label,reason:p.reason,icon:p.icon,priority:p.priority}}function av(n,e=[]){const{score:t,rating:r,factors:s}=iv(n,e,null);return{...n,_score:t,_rating:r,_factors:s,_type:ac(n),_channel:Pi(n),_sla:rv(n),_nba:ov(n,{score:t})}}function Io(n){return n.map(e=>av(e))}const Dl=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function cv(n,e,t){switch(e){case"calientes":return sv(n)&&!vs(n.status)&&(n._rating==="hot"||nd(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!vs(n.status);case"todo":default:return!0}}function IR(n,e){const t={};for(const r of Dl)t[r.id]=0;for(const r of n)for(const s of Dl)cv(r,s.id,e)&&t[s.id]++;return t}const Eo={late:0,warn:1,ok:2};function ER(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return Eo[t]!==Eo[r]?Eo[t]-Eo[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function TR(n,{type:e,channel:t,status:r}){return n.filter(s=>!(e&&s._type.type!==e||t&&s._channel.key!==t||r&&(s.status||"nuevo")!==r))}function AR(n,e){const t=Ea(e).trim();return t?n.filter(r=>Ea([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function SR(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function RR(n,{queue:e,uid:t,filters:r,search:s,showClosed:i=!1}){let o=n.filter(l=>cv(l,e,t));o=TR(o,r),o=AR(o,s);let c=0;if(!i&&!r.status){const l=o.filter(h=>!vs(h.status)&&!h.archived);c=o.length-l.length,o=l}return o.sort(ER),{rows:o,hiddenClosed:c}}const yr=()=>new Date().toISOString(),rd=n=>({id:n.id,...n.data()});function CR({pageSize:n=40,onData:e,onError:t}){let r=null;const s=ht(Ve(de,"leads"),At("createdAt","desc"),vt(n));return{unsubscribe:Ln(s,o=>{const c=o.docs.map(rd);r=o.docs[o.docs.length-1]||null,e(c,{hasMore:o.size>=n})},o=>{t&&t(o)}),getLastDoc:()=>r}}async function PR({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=ht(Ve(de,"leads"),At("createdAt","desc"),A0(e),vt(n)),r=await tn(t);return{rows:r.docs.map(rd),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function kR(){const e=(await tn(Ve(de,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return H.set({team:e}),e}async function xR(n,e){await yt(Oe(de,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:yr(),updatedBy:br(),_version:jt(1)})}async function NR(n,e,t={},r={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const s=yr();await yt(Oe(de,"leads",n),{...r,status:e,lastActivityAt:s,updatedAt:s,updatedBy:br(),_version:jt(1)}),await On(Ve(de,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:br(),createdAt:s,_version:1})}async function gp(n,{type:e="nota",subject:t="",body:r="",direction:s="outbound",name:i=""}){await On(Ve(de,"activities"),{type:e,subject:t,body:r,status:"closed",direction:s,relatedTo:{type:"lead",id:n,name:i},ownerId:br(),createdAt:yr(),_version:1})}async function DR(n,{subject:e,dueAt:t,name:r=""}){await On(Ve(de,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:br(),createdAt:yr(),_version:1})}async function VR(){const n=new Date;n.setHours(23,59,59,999);const e=ht(Ve(de,"activities"),xn("dueAt","<=",n.toISOString()),At("dueAt","desc"),vt(80));return(await tn(e)).docs.map(rd).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,s)=>String(r.dueAt).localeCompare(String(s.dueAt)))}async function OR(n){await yt(Oe(de,"activities",n),{status:"closed",closedAt:yr(),closedBy:br()})}async function LR(n,e=!0){await yt(Oe(de,"leads",n),{archived:e,archivedAt:e?yr():null,updatedAt:yr(),updatedBy:br(),_version:jt(1)})}async function MR(n){return(await Sr(Rr,"crmPurgeLead")({leadId:n})).data}function br(){const n=H.get().user;return n?n.uid:null}async function FR(n){const e=H.get().user?H.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await On(Ve(de,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const sr=n=>new Date(Date.now()-n*6e4).toISOString(),xe=n=>sr(n*60),ie=n=>sr(n*60*24),UR=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],sd=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:sr(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:sr(18),lastActivityAt:sr(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:sr(5),contactId:"email_casalcedo_outlook_com",createdAt:xe(1),lastActivityAt:xe(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:xe(-1),contactId:"email_diana_r_hotmail_com",createdAt:xe(5),lastActivityAt:xe(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:xe(-3),contactId:"phone_573044455667",createdAt:xe(8),lastActivityAt:xe(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:ie(-1),contactId:"email_lauraortiz_gmail_com",createdAt:ie(1),lastActivityAt:xe(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ie(-1),contactId:"email_pnarango_empresa_co",createdAt:ie(2),lastActivityAt:ie(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ie(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:ie(4),lastActivityAt:ie(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:ie(-2),contactId:"email_afcuesta_gmail_com",createdAt:ie(6),lastActivityAt:ie(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ie(-10),contactId:"email_cata_rios_gmail_com",createdAt:ie(12),lastActivityAt:ie(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:xe(-2),contactId:"email_glopa_gmail_com",createdAt:xe(3),lastActivityAt:xe(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:ie(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:ie(10),lastActivityAt:ie(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:ie(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:ie(15),lastActivityAt:ie(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:ie(19),contactId:"email_hdloaiza_gmail_com",createdAt:ie(20),lastActivityAt:ie(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:ie(24),contactId:"email_pasuarez_gmail_com",createdAt:ie(25),lastActivityAt:ie(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:ie(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:ie(22),lastActivityAt:ie(9),_version:4}],BR={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:sr(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:xe(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:xe(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:xe(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:ie(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:xe(20),_version:1}]},ki={};sd.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";ki[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});ki.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:ie(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:ie(3),lastActivityAt:ie(3),_version:1};const zo={},Ta=()=>sd.map(n=>({...n})),Vl=()=>UR.map(n=>({...n})),$R=n=>(BR[n]||[]).map(e=>({...e})),qR=n=>ki[n]?{...ki[n]}:null,jR=()=>Object.values(ki).map(n=>({...n})),_p=n=>(zo[n]||[]).map(e=>({...e}));function zR(n,e){zo[n]||(zo[n]=[]),zo[n].unshift({id:"n"+Date.now(),...e})}let GR=100;const oi=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:xe(2),createdAt:xe(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:xe(20),createdAt:ie(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"visita_test_drive",stageName:"Visita / Test drive",status:"open",amount:68e6,currency:"COP",probability:.5,weightedAmount:34e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:ie(18),createdAt:ie(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.7,weightedAmount:945e5,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:xe(6),createdAt:ie(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:0,currency:"COP",probability:.2,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:xe(1),createdAt:xe(1),_version:1},{id:"d9",name:"Patricia Lemus · Toyota Hilux 2020",contactName:"Patricia Lemus",contactId:"phone_573009871234",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:132e6,currency:"COP",probability:.35,weightedAmount:462e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"walkin",lastActivityAt:xe(3),createdAt:ie(2),_version:2},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:ie(3),createdAt:ie(10),_version:6,tipoPago:"financiado",wonAt:ie(3),postventa:{entrega:!0,traspaso_runt:!1,tramites:!1},commissionSnapshot:{amount:78e6,tipoPago:"financiado",ownerId:"u_ana",wonAt:ie(3)},recibeVehiculo:{marca:"chevrolet",modelo:"Spark GT",placa:"XYZ789",valorEstimado:28e6}},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:ie(5),createdAt:ie(15),_version:7,tipoPago:"contado",wonAt:ie(5),postventa:{entrega:!0,traspaso_runt:!0,tramites:!0},commissionSnapshot:{amount:112e6,tipoPago:"contado",ownerId:"u_luis",wonAt:ie(5)}},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:ie(9),createdAt:ie(22),_version:4}],Ol=()=>oi.map(n=>({...n}));function HR(n){const e="d"+ ++GR;return oi.unshift({id:e,...n}),e}function KR(n,e){const t=oi.findIndex(r=>r.id===n);t>=0&&(oi[t]={...oi[t],...e})}const Gn=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},Ll=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:Gn(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:Gn(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:Gn(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:Gn(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:Gn(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:Gn(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:Gn(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],WR=()=>Ll.map(n=>({...n}));function QR(n){Ll.push({id:"ag"+(Ll.length+1),...n})}let YR=100;function lv(n){const e="lm"+ ++YR,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),s=(n.prefijoPais||"+57").replace(/\D/g,""),i=r?"+"+(r.startsWith(s)?r:s+r):"",o=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:o,phone:i,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:o?"email_"+o.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return sd.unshift(c),e}function JR(){const n={},e=(m,g,T)=>u("label",{class:"field"},[u("span",{class:"field__label",text:m}),g,null]);n.nombre=u("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=u("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=u("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=u("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=u("select",{class:"select"},hR.map(m=>u("option",{value:m.id},[`${m.icon} ${m.label}`]))),n.interes=u("select",{class:"select"},fR.map(m=>u("option",{value:m.id},[m.label]))),n.trafico=u("select",{class:"select"},[u("option",{value:""},["— Tráfico —"]),u("option",{value:"organico"},["Orgánico"]),u("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=u("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=u("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=u("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=u("input",{type:"checkbox",checked:!0});const t=u("div",{class:"login__error",role:"alert",hidden:!0}),r=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),s=u("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),i=u("form",{class:"nl-form"},[e("Nombre *",n.nombre),u("div",{class:"nl-row"},[u("label",{class:"field",style:{flex:"0 0 auto"}},[u("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),u("label",{class:"field u-grow"},[u("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),u("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),u("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),u("label",{class:"nl-consent"},[n.consent,u("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,u("div",{class:"nl-actions"},[r,s])]),o=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"＋ Nuevo lead"}),u("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),i]),c=u("div",{class:"modal-overlay"},[o]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const l=()=>{c.remove(),window.removeEventListener("keydown",h)},h=m=>{m.key==="Escape"&&l()};window.addEventListener("keydown",h),c.addEventListener("mousedown",m=>{m.target===c&&l()}),r.addEventListener("click",l),i.addEventListener("submit",async m=>{m.preventDefault(),t.hidden=!0;const g={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!g.nombre)return p("Escribe el nombre del cliente.");if(!g.email&&!g.telefono)return p("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");s.disabled=!0,s.textContent="Guardando…";try{H.get().mock?(lv(g),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await FR(g),W("✓ Lead agregado a la Bandeja","ok"),l()}catch{s.disabled=!1,s.textContent="Agregar lead",p("No se pudo agregar. Intenta de nuevo.")}});function p(m){return t.textContent=m,t.hidden=!1,!1}}const Ml="altorra_friction_v1",XR=300;function Aa(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),s=JSON.parse(localStorage.getItem(Ml)||"[]");for(s.push({task:n,ms:r,at:new Date().toISOString(),...t});s.length>XR;)s.shift();localStorage.setItem(Ml,JSON.stringify(s))}catch{}}function ZR(){try{const n=JSON.parse(localStorage.getItem(Ml)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,s]of Object.entries(e)){const i=[...s].sort((o,c)=>o-c);t[r]={n:s.length,mediana_s:+(i[Math.floor(i.length/2)]/1e3).toFixed(1),p90_s:+(i[Math.floor(i.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=ZR);const eC=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],tC="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function nC(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=H.get().user||{},r=u("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),s=u("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),i=u("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),o=u("input",{type:"checkbox"}),c=u("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function l(){c.replaceChildren(...eC.map(N=>{const $=u("button",{class:"chip"+(e.fuente===N.id?" chip--active":""),type:"button"},[`${N.icon} ${N.label}`]);return $.addEventListener("click",()=>{e.fuente=N.id,l()}),$}))}l();const h=u("button",{class:"chip",type:"button"},["Orgánico"]);h.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",h.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const p=u("div",{class:"login__error",role:"alert",hidden:!0}),m=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),g=u("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),T=u("form",{class:"nl-form"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Nombre *"}),r]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),s]),u("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,h]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Nota"}),i]),u("label",{class:"nl-consent"},[o,u("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",u("em",{text:tC})])]),p,u("div",{class:"nl-actions"},[m,g])]),R=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"⚡ Lead rápido"}),u("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),T]),P=u("div",{class:"modal-overlay"},[R]);document.body.appendChild(P),setTimeout(()=>r.focus(),30);const A=()=>{P.remove(),window.removeEventListener("keydown",L)},L=N=>{N.key==="Escape"&&A()};window.addEventListener("keydown",L),P.addEventListener("mousedown",N=>{N.target===P&&A()}),m.addEventListener("click",A),T.addEventListener("submit",N=>{N.preventDefault(),p.hidden=!0;const $={nombre:r.value.trim(),telefono:s.value.trim(),fuente:e.fuente,medio:e.medio,nota:i.value.trim(),consentVerbal:o.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!$.nombre)return C("Escribe el nombre.");if(!$.telefono||$.telefono.replace(/\D/g,"").length<7)return C("Escribe un teléfono válido.");if(!$.ownerId&&!H.get().mock)return C("Sesión sin usuario — recarga el portal.");if(H.get().mock){lv({nombre:$.nombre,telefono:$.telefono,canal:$.fuente,trafico:$.medio,consentGiven:$.consentVerbal,notas:$.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),W("⚡ Lead registrado (mock)","ok"),A();return}On(Ve(de,"lead_intake"),$).catch(k=>{console.error("[quick-lead] rechazo del servidor:",k),W('El lead "'+$.nombre+'" fue RECHAZADO al sincronizar: '+(k.code||k.message),"error")}),W(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),Aa("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),A()});function C(N){return p.textContent=N,p.hidden=!1,!1}}const rC="ventas",Ki=[{id:"cuadrando_cita",label:"Cuadrando cita",prob:.2},{id:"cita_fijada",label:"Cita fijada",prob:.35},{id:"visita_test_drive",label:"Visita / Test drive",prob:.5},{id:"negociacion",label:"Negociación",prob:.7},{id:"apartado",label:"Apartado",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],Go={id:"perdido",label:"Perdido",prob:0,lost:!0},To={_exit_visita_test_drive:["huboTestDrive"],apartado:["montoApartado","venceEl"],vendido:["tipoPago"],perdido:["lostReason"]},Hs=Ki.map(n=>n.id);function vp(n,e){if(n===e)return{ok:!0,needsReason:!1,gates:[]};const t=i=>i===Go.id||Hs.includes(i);if(!t(n)||!t(e))return{ok:!1,error:"etapa_desconocida"};if(n==="vendido")return{ok:!1,error:"vendido_es_terminal"};if(e===Go.id)return{ok:!0,needsReason:!1,gates:To.perdido.slice()};if(n===Go.id)return{ok:!0,needsReason:!0,gates:[]};const r=Hs.indexOf(n),s=Hs.indexOf(e);if(s>r){const i=[];for(let o=r;o<s;o++){Hs[o]==="visita_test_drive"&&i.push(...To._exit_visita_test_drive);const c=Hs[o+1];To[c]&&i.push(...To[c])}return{ok:!0,needsReason:!1,gates:[...new Set(i)]}}return{ok:!0,needsReason:!0,gates:[],recalcVehicle:n==="apartado"}}const yp=[{id:"precio",label:"Precio"},{id:"financiacion_negada",label:"Financiación negada"},{id:"compro_en_otro_lado",label:"Compró en otro lado"},{id:"no_responde",label:"No responde"},{id:"cambio_de_opinion",label:"Cambió de opinión"},{id:"error_de_registro",label:"Error de registro"},{id:"otro",label:"Otro motivo"}],ai=Ki.filter(n=>!n.won),uv=[...Ki,Go].reduce((n,e)=>(n[e.id]=e,n),{});function jr(n){return uv[n]||Ki[0]}function ci(n){const e=uv[n];return e?e.prob:0}function id(n){return Math.round((Number(n.amount)||0)*ci(n.stageId))}function dv(n){return n.reduce((e,t)=>e+(t.status==="open"?id(t):0),0)}function sC(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function iC(n,e=14){return n.status==="open"&&_s(n.lastActivityAt)>e}function oC(n){const e={};for(const t of ai)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}const hv=[{id:"entrega",label:"Entrega del vehículo",dueDays:3},{id:"traspaso_runt",label:"Traspaso / RUNT",dueDays:15},{id:"tramites",label:"Trámites (SOAT, impuestos, GPS)",dueDays:15}];function aC(n){const e={};for(const r of n||[])!r||r.status!=="open"||!r.vehicleId||(e[r.vehicleId]=e[r.vehicleId]||[]).push(r.id||null);const t=[];for(const r of Object.keys(e))e[r].length>1&&t.push({vehicleId:r,dealIds:e[r]});return t}function fv(n){if(!n||n.status!=="won")return!1;const e=n.postventa||{};return hv.every(t=>e[t.id]===!0)}function pv(n,e={}){const t=e.vehicleId!==void 0?e.vehicleId||"":n.vehicleOfInterestId||"",r=Ki[0];return{name:(n.fullName||"Oportunidad")+(t?" · "+(e.vehicleName||t):""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:t||null,vehicleName:e.vehicleName||t||"",sinVehiculoAun:!t,pipelineId:rC,stageId:r.id,stageName:r.label,status:"open",amount:Number(e.amount)||0,currency:"COP",probability:r.prob,weightedAmount:Math.round((Number(e.amount)||0)*r.prob),expectedCloseDate:null,ownerId:e.ownerId!==void 0?e.ownerId:n.ownerId||null,ownerName:e.ownerName!==void 0?e.ownerName:n.ownerName||null,source:n.source||"web",nextStep:e.nota||""}}const Mn=()=>new Date().toISOString(),mv=n=>({id:n.id,...n.data()}),kt=()=>H.get().user?H.get().user.uid:null;function cC(n,e,t){return On(Ve(de,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:kt(),createdAt:Mn(),_version:1})}function lC({pageSize:n=100,onData:e,onError:t}){const r=ht(Ve(de,"deals"),xn("status","==","open"),At("lastActivityAt","desc"),vt(n));return Ln(r,s=>e(s.docs.map(mv)),s=>t&&t(s))}async function uC(n,e={}){const t=Mn(),r=pv(n,e),s=await On(Ve(de,"deals"),{...r,lastActivityAt:t,createdAt:t,updatedAt:t,createdBy:kt(),updatedBy:kt(),_version:1});return await yt(Oe(de,"leads",n.id),{status:"convertido",convertedTo:{dealId:s.id,prevStatus:n.status||"contactado"},lastActivityAt:t,updatedAt:t,updatedBy:kt(),_version:jt(1)}),await cC(s.id,r.contactName,"Oportunidad creada desde lead"),s.id}async function dC(n){return(await Sr(Rr,"anularConversion")({dealId:n})).data}async function gv(){return(await tn(ht(Ve(de,"vehiculos"),xn("estado","in",["disponible","apartado"]),vt(60)))).docs.map(e=>{const t=e.data(),r=t.estado==="apartado";return{id:e.id,label:[t.marca,t.modelo,t.year].filter(Boolean).join(" ")+(r?" · ⚠ apartado":""),precio:Number(t.precioOferta||t.precio)||0,apartado:r}}).sort((e,t)=>e.label.localeCompare(t.label,"es"))}async function bp(n,e,t={},r={}){const s=Mn(),i=jr(e),o={...r,stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:s,updatedAt:s,updatedBy:kt(),_version:jt(1)};t.status==="lost"&&e!=="perdido"&&(o.status="open"),await yt(Oe(de,"deals",n),o)}async function hC(n,e,t={}){const r=Mn(),s=Math.max(0,Math.round(Number(e)||0));await yt(Oe(de,"deals",n),{amount:s,weightedAmount:Math.round(s*ci(t.stageId)),updatedAt:r,updatedBy:kt(),_version:jt(1)})}async function fC(n,e={},t={}){const r=Mn();await yt(Oe(de,"deals",n),{...t,status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:r,updatedAt:r,updatedBy:kt(),_version:jt(1)})}async function pC(n,e,t={}){const r=Mn();await yt(Oe(de,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"otro"),lastActivityAt:r,updatedAt:r,updatedBy:kt(),_version:jt(1)})}function mC({pageSize:n=100,onData:e,onError:t}){const r=ht(Ve(de,"deals"),xn("status","==","won"),At("lastActivityAt","desc"),vt(n));return Ln(r,s=>e(s.docs.map(mv)),s=>t&&t(s))}async function gC(n,e,t){const r=Mn();await yt(Oe(de,"deals",n),{["postventa."+e]:t===!0,lastActivityAt:r,updatedAt:r,updatedBy:kt(),_version:jt(1)});try{await yt(Oe(de,"activities","postventa_"+n+"_"+e),t?{status:"closed",closedAt:r,closedBy:kt()}:{status:"open",closedAt:null,closedBy:null})}catch{}}async function _C(n,e){const t=Mn();await yt(Oe(de,"deals",n),{recibeVehiculo:{marca:String(e.marca||"").trim(),modelo:String(e.modelo||"").trim(),year:Number(e.year)||null,placa:String(e.placa||"").trim().toUpperCase(),valorEstimado:Number(e.valorEstimado)||0},lastActivityAt:t,updatedAt:t,updatedBy:kt(),_version:jt(1)})}async function vC(n){return(await Sr(Rr,"crmCrearBorradorRetoma")({dealId:n})).data}const Gc="__sin_vehiculo__";function _v(n,{onDone:e}={}){const t=performance.now(),r=H.get().team||[],s=u("select",{class:"select"},[u("option",{value:""},["Cargando inventario…"])]),i=u("input",{class:"input",type:"number",min:"0",step:"100000",placeholder:"Valor estimado (COP) *"}),o=u("select",{class:"select"},r.length?r.map(C=>u("option",{value:C.uid,selected:C.uid===n.ownerId?"":void 0},[C.nombre])):[u("option",{value:n.ownerId||""},[n.ownerName||"Yo"])]),c=u("input",{class:"input",type:"text",placeholder:"Nota de contexto (opcional)"}),l=u("div",{class:"login__error",role:"alert",hidden:!0}),h=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),p=u("button",{class:"btn btn--gold",type:"submit"},["🎯 Crear negocio"]),m=u("form",{class:"nl-form"},[u("p",{class:"u-caption u-muted",style:{margin:"0"}},["✓ Hablaste con él · ✓ tiene presupuesto o forma de pago en mente · ✓ busca un carro concreto o una categoría"]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo *"}),s]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Valor estimado (COP) *"}),i]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor responsable *"}),o]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Nota"}),c]),l,u("div",{class:"nl-actions"},[h,p])]),g=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"Calificar → crear negocio"}),u("span",{class:"u-caption u-faint",text:(n.fullName||"Cliente")+" pasa al Pipeline; el lead queda congelado como histórico."})]),m]),T=u("div",{class:"modal-overlay"},[g]);document.body.appendChild(T);const R=()=>{T.remove(),window.removeEventListener("keydown",P)},P=C=>{C.key==="Escape"&&R()};window.addEventListener("keydown",P),T.addEventListener("mousedown",C=>{C.target===T&&R()}),h.addEventListener("click",R);let A=[];(H.get().mock?Promise.resolve([]):gv()).then(C=>{A=C,s.replaceChildren(u("option",{value:""},["— Elige un vehículo —"]),...C.map(N=>u("option",{value:N.id},[N.label+(N.precio?" · $"+N.precio.toLocaleString("es-CO"):"")])),u("option",{value:Gc},["Sin vehículo aún (buscando / retoma)"]))}).catch(()=>{s.replaceChildren(u("option",{value:Gc},["Sin vehículo aún"]))}),s.addEventListener("change",()=>{const C=A.find(N=>N.id===s.value);C&&C.precio&&!i.value&&(i.value=String(C.precio))}),m.addEventListener("submit",async C=>{C.preventDefault(),l.hidden=!0;const N=s.value,$=Math.round(Number(i.value)||0);if(!N)return L('Elige un vehículo o marca "Sin vehículo aún".');if(!($>0))return L("El valor estimado es obligatorio (alimenta el pronóstico).");const k=o.value||n.ownerId;if(!k)return L("El negocio necesita un asesor responsable.");const U=r.find(w=>w.uid===k)?.nombre||n.ownerName||null,I=A.find(w=>w.id===N),v={vehicleId:N===Gc?null:N,vehicleName:I?I.label:"",amount:$,ownerId:k,ownerName:U,nota:c.value.trim()};p.disabled=!0,p.textContent="Creando…";try{if(H.get().mock){HR(pv(n,v)),W("🎯 Negocio creado (mock)","ok"),Aa("conversion",t,{mock:!0}),R(),e&&e({mock:!0});return}const w=await uC(n,v);Aa("conversion",t,{}),R(),yC(w,n),e&&e({dealId:w})}catch(w){p.disabled=!1,p.textContent="🎯 Crear negocio",L(w&&w.code==="permission-denied"?"Recarga el portal: tu versión está desactualizada.":"No se pudo crear el negocio. Intenta de nuevo.")}});function L(C){return l.textContent=C,l.hidden=!1,!1}}function yC(n,e){const t=u("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),r=u("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[u("span",{text:`🎯 Negocio creado para ${(e.fullName||"el cliente").split(/\s+/)[0]}`}),t]);document.body.appendChild(r);const s=setTimeout(()=>r.remove(),1e4);t.addEventListener("click",async()=>{clearTimeout(s),t.disabled=!0,t.textContent="Anulando…";try{await dC(n),W("↩ Conversión anulada — el lead volvió a la Bandeja","ok")}catch(i){W("No se pudo anular: "+(i&&i.message||""),"error")}r.remove()})}const hn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'};function bC(){const n=(t,r)=>{const s=new Date;return s.setDate(s.getDate()+t),s.setHours(r,0,0,0),s.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function vv(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=Pt("crm.edit"),r=H.get().user&&H.get().user.uid,s=u("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),i=u("label",{class:"search","aria-label":"Buscar"},[u("span",{html:hn.search,"aria-hidden":"true"}),u("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),o=u("div",{class:"inbox__filters"}),c=t?u("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>nC());const l=t?u("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;l&&l.addEventListener("click",()=>JR());const h=u("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);h.addEventListener("click",()=>U());const p=u("div",{class:"inbox__pendientes",hidden:!0}),m=u("div",{class:"inbox__toolbar"},[i,o,c,l,h]),g=u("div",{class:"inbox__list",role:"list",tabindex:"-1"}),T=u("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),R=u("section",{class:"inbox"},[T,s,m,p,g]);ye(n),n.append(R);const P=i.querySelector("input");P.addEventListener("input",()=>{e.search=P.value,ce()});async function A(O,B){if(E(O.id,{ownerId:B?B.uid:null,ownerName:B?B.nombre:null}),H.get().mock){W(B?`Asignado a ${B.nombre}`:"Sin asignar","ok");return}try{await xR(O.id,B),W(B?`Asignado a ${B.nombre}`:"Sin asignar","ok")}catch{W("No se pudo asignar","error")}}async function L(O,B,Y={}){if(E(O.id,{status:B,...Y,lastActivityAt:new Date().toISOString()}),H.get().mock){W(`Estado → ${jo(B).label}`,"ok");return}try{await NR(O.id,B,O,Y),W(`Estado → ${jo(B).label}`,"ok")}catch{W("No se pudo cambiar el estado","error")}}function C(O,B){const Y=tv(O.phone,wC(O));if(!Y){W("Este lead no tiene teléfono","error");return}window.open(Y,"_blank","noopener"),!H.get().mock&&t&&gp(O.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:O.fullName}).catch(()=>{}),$(O,B)}function N(O,B){!H.get().mock&&t&&gp(O.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:O.fullName}).catch(()=>{}),W("📞 Llamada registrada","ok"),$(O,B)}function $(O,B){if(!t)return;const Y=performance.now();Dt(B||document.body,bC(),ae=>{if(Aa("proximo_paso",Y,{preset:ae.label}),!!ae.value){if(ae.value==="abrir360"){x(O.id);return}if(H.get().mock){W("Próximo paso anotado (mock)","ok");return}DR(O.id,{subject:ae.value.subject,dueAt:ae.value.dueAt,name:O.fullName}).then(()=>W("✓ Próximo paso: "+ae.label,"ok")).catch(()=>W("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(O.fullName||"el cliente").split(/\s+/)[0]+"?"})}let k=!1;async function U(){k=!k,p.hidden=!k,k&&await I()}async function I(){if(ye(p),H.get().mock){p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let O=[];try{O=await VR()}catch{ye(p),p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(ye(p),p.append(u("div",{class:"inbox__listhead"},[u("span",{class:"u-muted u-caption",text:`📋 ${O.length} pendiente${O.length===1?"":"s"} (hoy y vencidos)`})])),!O.length){p.append(u("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const B=Date.now();O.forEach(Y=>{const ae=new Date(Y.dueAt).getTime()<B,re=u("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),ne=u("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),Te=u("div",{class:"lead-card",style:{alignItems:"center"}},[u("span",{class:`badge badge--${ae?"danger":"gold"}`,text:ae?"VENCIDO":"HOY"}),u("div",{class:"u-grow"},[u("div",{class:"lead-card__name",text:(Y.type==="cita"?"📅 ":"")+Y.subject}),u("div",{class:"u-caption u-muted",text:`${Y.relatedTo&&Y.relatedTo.name?Y.relatedTo.name+" · ":""}${lr(Y.dueAt)}`})]),u("div",{class:"u-row u-row--tight"},[ne,t?re:null])]);ne.addEventListener("click",()=>{Y.relatedTo&&Y.relatedTo.id&&x(Y.relatedTo.id)}),re.addEventListener("click",async()=>{re.disabled=!0;try{await OR(Y.id),W("✓ Hecho","ok"),await I(),Y.relatedTo&&Y.relatedTo.id&&$({id:Y.relatedTo.id,fullName:Y.relatedTo.name||""},h)}catch{re.disabled=!1,W("No se pudo completar","error")}}),p.append(Te)})}function v(O){if(O.status==="convertido"){W("Ya es un negocio: gestiónalo en el Pipeline","info");return}_v(O,{onDone:()=>E(O.id,{status:"convertido"})})}function w(){H.set({leads:e.leads})}function E(O,B){const Y=e.leads.findIndex(ae=>ae.id===O);Y!==-1&&(e.leads[Y]=av({...e.leads[Y],...B}),w(),b())}function b(){S(),y(),ce()}function S(){const O=IR(e.leads,r);ye(s),Dl.forEach(B=>{const Y=e.queue===B.id,ae=u("button",{class:"chip"+(Y?" chip--active":""),role:"tab","aria-selected":String(Y),type:"button"},[u("span",{"aria-hidden":"true",text:B.icon}),u("span",{text:B.label}),u("span",{class:"chip__count",text:String(O[B.id]||0)})]);ae.addEventListener("click",()=>{e.queue=B.id,b()}),s.append(ae)})}function y(){if(ye(o),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...xl.map(B=>[B.id,B.label])]}].forEach(B=>{const Y=e.filters[B.key],ae=Y?(B.items.find(ne=>ne[0]===Y)||[,B.label])[1]:B.label,re=u("button",{class:"chip"+(Y?" chip--active":""),type:"button","aria-haspopup":"menu"},[u("span",{text:ae}),u("span",{"aria-hidden":"true",text:"▾"})]);re.addEventListener("click",()=>{Dt(re,B.items.map(([ne,Te])=>({value:ne,label:Te,active:ne===Y})),ne=>{e.filters[B.key]=ne.value,b()},{title:B.label})}),o.append(re)}),e.filters.type||e.filters.channel||e.filters.status){const B=u("button",{class:"chip",type:"button"},["✕ Limpiar"]);B.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},b()}),o.append(B)}}function ce(){if(e.loading)return Z();if(e.error)return q("⚠️","No se pudo cargar",e.error);const{rows:O,hiddenClosed:B}=RR(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(ye(g),!O.length&&!B){const re=e.search||e.filters.type||e.filters.channel||e.filters.status;g.append(z("🗂️",re?"Sin resultados":"¡Bandeja al día!",re?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const Y=B||e.showClosed?u("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${B} ocultos · ver todos`]):null;Y&&Y.addEventListener("click",()=>{e.showClosed=!e.showClosed,ce()});const ae=u("div",{class:"inbox__listhead"},[u("span",{class:"u-muted u-caption",text:`${O.length} ${O.length===1?"cliente":"clientes"} activos`}),u("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),Y]);if(g.append(ae),!O.length&&B){g.append(z("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${B} cerrados ocultos).`));return}if(O.forEach(re=>g.append(fe(re))),e.hasMore&&e.queue==="todo"&&!e.search){const re=u("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);re.addEventListener("click",()=>j(re)),g.append(u("div",{class:"inbox__more"},[re]))}}function fe(O){const B=Xr[O._rating],Y=jo(O.status),ae=!!(O.convertedTo&&O.convertedTo.dealId)||O.status==="convertido",re=SR(O),ne=re&&re.state!=="ok"?u("span",{class:`badge badge--${re.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${re.mins<120?re.mins+" min":jc(re.mins*6e4)} sin contacto`]):null,Te=O._sla,ke=`sla-dot sla-dot--${Te.state}`,Ue=Te.closed?"Cerrado":Te.state==="late"?`SLA vencido hace ${jc(Te.remainingMs)}`:`Responder en ${jc(Te.remainingMs)}`,nt=[O._type.icon+" "+O._type.label,O.sourceDetail,O.vehicleOfInterestId?"🚗 "+O.vehicleOfInterestId:""].filter(Boolean).join(" · "),Fn=u("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":O.id,"aria-label":`${O.fullName}, ${B.label}`},[u("span",{class:ke,title:Ue,"aria-label":Ue}),u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:gs(O.fullName)}),u("div",{class:"lead-card__main u-grow"},[u("div",{class:"lead-card__top"},[u("span",{class:"lead-card__name u-truncate",text:O.fullName}),u("span",{class:`temp ${B.cls}`,title:`Score ${O._score}/100`},[`${B.icon} ${O._score}`])]),u("div",{class:"lead-card__what u-truncate u-muted",text:nt}),u("div",{class:"lead-card__meta u-caption"},[u("span",{class:"lead-card__chan",text:`${O._channel.icon} ${O._channel.label}`}),u("span",{class:"lead-card__dot",text:"·"}),u("span",{text:lr(O.createdAt)}),u("span",{class:"lead-card__dot",text:"·"}),ae?u("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},[O.convertedTo&&O.convertedTo.outcome==="perdido"?"✖ Negocio perdido → Pipeline":O.convertedTo&&O.convertedTo.outcome==="vendido"?"🏆 VENDIDO":`🎯 ${O.convertedTo&&O.convertedTo.stageName||"Convertido"} → Pipeline`]):u("span",{class:`badge badge--${Y.badge||""}`.trim(),text:Y.label}),O.archived?u("span",{class:"badge",text:"🗄 Archivado"}):null,ne?u("span",{class:"lead-card__dot",text:"·"}):null,ne,O.ownerName?u("span",{class:"lead-card__dot",text:"·"}):null,O.ownerName?u("span",{class:"u-faint",text:"👤 "+O.ownerName}):null]),u("div",{class:"lead-card__nba"},[u("span",{"aria-hidden":"true",text:O._nba.icon}),u("span",{class:"u-muted",text:"Próx: "}),u("strong",{text:O._nba.label})])]),u("div",{class:"lead-card__actions"},[X("wa",hn.wa,"WhatsApp","btn--wa"),t?X("call",hn.call,"Registrar llamada"):null,t?X("assign",hn.person,"Asignar"):null,t&&!ae?X("status",hn.flag,"Cambiar estado"):null,t&&!ae?X("convert",hn.convert,"Convertir a oportunidad"):null,t?X("more",hn.more,"Más acciones"):null,X("open",hn.expand,"Abrir 360")])]);return Fn.addEventListener("click",Un=>{const Rs=Un.target.closest("[data-action]");if(Rs){Fe(Rs.dataset.action,O,Rs);return}x(O.id)}),Fn.addEventListener("keydown",Un=>{Un.key==="Enter"?x(O.id):Un.key.toLowerCase()==="w"&&C(O)}),Fn}function X(O,B,Y,ae=""){return u("button",{class:`icon-btn ${ae}`.trim(),type:"button","data-action":O,title:Y,"aria-label":Y},[u("span",{html:B,"aria-hidden":"true"})])}const ve={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",descartado:"No va: inalcanzable, no califica, spam… (pide la razón)"};function Fe(O,B,Y){if(O==="open")return x(B.id);if(O==="wa")return C(B,Y);if(O==="call")return N(B,Y);if(O==="convert")return v(B);if(O==="pipeline"){window.location.hash="#/pipeline";return}if(O==="assign"){const ae=H.get().team||[],re=[{value:null,label:"Sin asignar",icon:"⊘",active:!B.ownerId},...ae.map(ne=>({value:ne,label:ne.nombre,hint:ne.cargo,icon:"👤",active:B.ownerId===ne.uid}))];return Dt(Y,re,ne=>A(B,ne.value),{title:"Asignar a"})}if(O==="status"){if(B.convertedTo&&B.convertedTo.dealId){W("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const ae=xl.filter(re=>re.id!=="convertido").map(re=>({value:re.id,label:re.label,hint:ve[re.id]||"",active:(B.status||"nuevo")===re.id}));return Dt(Y,ae,re=>{if(re.value==="descartado"){Dt(Y,pR.map(ne=>({value:ne.id,label:ne.label})),ne=>L(B,"descartado",{discardReason:ne.value}),{title:"¿Por qué se descarta?"});return}L(B,re.value)},{title:"Cambiar estado"})}if(O==="more"){const ae=[B.archived?{value:"unarchive",label:"Restaurar de archivados",icon:"↩️"}:{value:"archive",label:"Archivar",icon:"🗄",hint:"Sale de las vistas; reversible"},Pt("crm.delete")?{value:"purge",label:"Eliminar definitivo",icon:"🗑",hint:"Solo pruebas/spam — borra TODO su rastro"}:null].filter(Boolean);return Dt(Y,ae,async re=>{if(re.value==="archive"||re.value==="unarchive"){const ne=re.value==="archive";if(E(B.id,{archived:ne}),H.get().mock){W(ne?"🗄 Archivado":"↩️ Restaurado","ok");return}try{await LR(B.id,ne),W(ne?"🗄 Archivado":"↩️ Restaurado","ok")}catch{E(B.id,{archived:!ne}),W("No se pudo archivar","error")}return}if(re.value==="purge"){if(!navigator.onLine){W("Eliminar definitivo necesita señal.","error");return}if(!window.confirm('🗑 ¿Eliminar DEFINITIVAMENTE a "'+B.fullName+`"?

Borra el lead, sus actividades, negocios y su contacto si queda huérfano. Esto es SOLO para pruebas/spam — un cliente real se ARCHIVA.`)||!window.confirm("Última confirmación: esta acción NO se puede deshacer. ¿Eliminar?"))return;if(H.get().mock){W("Eliminado (mock)","ok");return}try{const ne=await MR(B.id);W(`🗑 Eliminado: ${ne.activities} actividades, ${ne.deals} negocios${ne.contactDeleted?", contacto":""}`,"ok")}catch(ne){W(ne.message&&ne.message.includes("Super Admin")?"Solo el Super Admin puede eliminar.":"No se pudo eliminar: "+(ne.message||ne.code),"error")}}},{title:"Más acciones"})}}function x(O){H.set({detailLeadId:O})}function z(O,B,Y){return u("div",{class:"state"},[u("div",{class:"state__icon","aria-hidden":"true",text:O}),u("div",{class:"state__title",text:B}),u("div",{class:"state__msg",text:Y})])}function q(O,B,Y){ye(g),g.append(z(O,B,Y))}function Z(){ye(g);for(let O=0;O<6;O++)g.append(u("div",{class:"lead-card lead-card--skeleton"},[u("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),u("div",{class:"u-grow u-stack",style:{gap:"8px"}},[u("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),u("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function j(O){if(e.cursor){O.disabled=!0,O.textContent="Cargando…";try{const{rows:B,lastDoc:Y,hasMore:ae}=await PR({after:e.cursor}),re=Io(B),ne=new Set(e.leads.map(Te=>Te.id));e.leads.push(...re.filter(Te=>!ne.has(Te.id))),e.cursor=Y,e.hasMore=ae,w(),b()}catch{W("No se pudo cargar más","error"),O.disabled=!1,O.textContent="Cargar más"}}}function he(){if(H.get().mock){H.set({team:Vl()}),e.leads=Io(Ta()),e.loading=!1,e.hasMore=!1,w(),b(),e.dirtyHandler=()=>{e.leads=Io(Ta()),w(),b()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}kR().catch(()=>{}),e.sub=CR({pageSize:40,onData:(O,B)=>{e.leads=Io(O),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=B.hasMore,e.loading=!1,e.error=null,w(),b()},onError:O=>{console.error("[inbox] error de suscripción:",O),e.loading=!1,e.error=O&&O.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",b()}})}return b(),he(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function wC(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}function IC(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null,view:"kanban",won:[],wonSub:null,wonLoading:!0,wonError:null,collisionByDeal:new Map},t=Pt("crm.edit"),r=new Set,s=u("div",{class:"pipeline__bar"}),i=u("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),o=u("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),c=u("section",{class:"pipeline"},[o,s,i]);ye(n),n.append(c);function l(x,z){const q=e.deals.findIndex(Z=>Z.id===x);q!==-1&&(e.deals[q]={...e.deals[q],...z},H.get().mock&&KR(x,z),A())}async function h(x,z){if(x.stageId===z)return;const q=vp(x.stageId,z);if(!q.ok){W(q.error==="vendido_es_terminal"?"Un negocio vendido no se mueve (anulación = admin).":"Movimiento no válido","error");return}const Z=[...q.gates];q.needsReason&&Z.push("regressReason");const j=async he=>{const O=jr(z),B=x.stageId;if(l(x.id,{stageId:z,stageName:O.label,probability:O.prob,...he,lastActivityAt:new Date().toISOString()}),H.get().mock){W("Etapa → "+O.label,"ok");return}try{await bp(x.id,z,x,he),m(x,B,O.label)}catch(Y){l(x.id,{stageId:B,stageName:jr(B).label,probability:ci(B)}),W(Y&&Y.code==="permission-denied"?"Movimiento rechazado por las reglas — recarga el portal si tu versión es vieja.":"No se pudo mover","error")}};if(!Z.length)return j({});g(x,z,Z,j)}let p=null;function m(x,z,q){p&&p.remove();const Z=u("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),j=u("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[u("span",{text:`${(x.contactName||x.name||"Negocio").split(" · ")[0]} → ${q}`}),Z]);document.body.appendChild(j),p=j;const he=setTimeout(()=>{j.remove(),p===j&&(p=null)},1e4);Z.addEventListener("click",async()=>{clearTimeout(he),j.remove(),p===j&&(p=null);const O=jr(z);if(l(x.id,{stageId:z,stageName:O.label,probability:O.prob}),!H.get().mock)try{await bp(x.id,z,x,{regressReason:"Deshacer (arrastre accidental)"})}catch{W("No se pudo deshacer","error")}})}function g(x,z,q,Z){const j={},he=[],O=(ke,Ue)=>u("label",{class:"field"},[u("span",{class:"field__label",text:ke}),Ue]);if(q.includes("huboTestDrive")&&(j.huboTestDrive=u("select",{class:"select"},[u("option",{value:"si"},["Sí, hubo test drive"]),u("option",{value:"no"},["No alcanzó a probarlo"])]),he.push(O("¿Hubo test drive?",j.huboTestDrive))),q.includes("montoApartado")){j.montoApartado=u("input",{class:"input",type:"number",min:"0",step:"50000",placeholder:"500000"});const ke=new Date(Date.now()+72*3600*1e3);j.venceEl=u("input",{class:"input",type:"date",value:ke.toISOString().slice(0,10)}),he.push(O("Monto del apartado (COP) *",j.montoApartado),O("Vence el (default 72h)",j.venceEl))}if(q.includes("tipoPago")&&(j.tipoPago=u("select",{class:"select"},[u("option",{value:"contado"},["De contado"]),u("option",{value:"financiado"},["Financiado"])]),j.estadoCredito=u("select",{class:"select"},[u("option",{value:""},["— Estado del crédito —"]),u("option",{value:"pre_aprobado"},["Pre-aprobado"]),u("option",{value:"en_estudio"},["En estudio"]),u("option",{value:"aprobado"},["Aprobado"]),u("option",{value:"rechazado"},["Rechazado"])]),he.push(O("Forma de pago *",j.tipoPago),O("Crédito (si aplica)",j.estadoCredito))),q.includes("lostReason")&&(j.lostReason=u("select",{class:"select"},yp.map(ke=>u("option",{value:ke.id},[ke.label]))),he.push(O("¿Por qué se perdió? *",j.lostReason))),q.includes("regressReason")&&(j.regressReason=u("input",{class:"input",type:"text",placeholder:"¿Qué pasó? (obligatorio al retroceder)"}),he.push(O("Razón del retroceso *",j.regressReason))),z==="vendido"){j.retomaCheck=u("input",{type:"checkbox",class:"checkbox"}),j.retomaMarca=u("input",{class:"input",type:"text",placeholder:"Marca *"}),j.retomaModelo=u("input",{class:"input",type:"text",placeholder:"Modelo"}),j.retomaYear=u("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),j.retomaPlaca=u("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),j.retomaValor=u("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"});const ke=u("div",{class:"nl-form",hidden:!0,style:{marginTop:"8px"}},[j.retomaMarca,j.retomaModelo,j.retomaYear,j.retomaPlaca,j.retomaValor]);j.retomaCheck.addEventListener("change",()=>{ke.hidden=!j.retomaCheck.checked}),he.push(u("div",{},[u("label",{class:"u-row u-row--tight",style:{cursor:"pointer"}},[j.retomaCheck,u("span",{text:"🚙 Recibe vehículo en parte de pago (retoma)"})]),ke]))}const B=u("div",{class:"login__error",role:"alert",hidden:!0}),Y=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),ae=u("button",{class:"btn btn--gold",type:"submit"},["Mover a "+jr(z).label]),re=u("form",{class:"nl-form"},[...he,B,u("div",{class:"nl-actions"},[Y,ae])]),ne=u("div",{class:"modal-overlay"},[u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:jr(z).label})]),re])]);document.body.appendChild(ne),r.add(ne);const Te=()=>{r.delete(ne),ne.remove()};Y.addEventListener("click",Te),ne.addEventListener("mousedown",ke=>{ke.target===ne&&Te()}),re.addEventListener("submit",ke=>{ke.preventDefault();const Ue={};if(j.huboTestDrive&&(Ue.huboTestDrive=j.huboTestDrive.value==="si"),j.montoApartado){const nt=Math.round(Number(j.montoApartado.value)||0);if(!(nt>0)){B.textContent="El monto del apartado es obligatorio.",B.hidden=!1;return}Ue.montoApartado=nt,Ue.venceEl=new Date((j.venceEl.value||new Date().toISOString().slice(0,10))+"T18:00:00-05:00").toISOString()}if(j.tipoPago&&(Ue.tipoPago=j.tipoPago.value,j.estadoCredito&&j.estadoCredito.value&&(Ue.estadoCredito=j.estadoCredito.value)),j.lostReason&&(Ue.lostReason=j.lostReason.value),j.regressReason){const nt=j.regressReason.value.trim();if(!nt){B.textContent="Escribe la razón del retroceso.",B.hidden=!1;return}Ue.regressReason=nt}if(j.retomaCheck&&j.retomaCheck.checked){const nt=j.retomaMarca.value.trim();if(!nt){B.textContent="La marca del vehículo recibido es obligatoria.",B.hidden=!1;return}Ue.recibeVehiculo={marca:nt,modelo:j.retomaModelo.value.trim(),year:Number(j.retomaYear.value)||null,placa:j.retomaPlaca.value.trim().toUpperCase(),valorEstimado:Math.round(Number(j.retomaValor.value)||0)}}Te(),Z(Ue)})}async function T(x,z){if(l(x.id,{amount:z}),!H.get().mock)try{await hC(x.id,z,x)}catch{W("No se pudo guardar el monto","error")}}async function R(x){if(!(Number(x.amount)>0)){W("Ponle el monto al negocio antes de marcarlo ganado (con ese valor se congela la comisión).","error");return}const z=vp(x.stageId,"vendido");if(!z.ok){W("Movimiento no válido","error");return}const q={status:x.status,stageId:x.stageId},Z=async j=>{if(l(x.id,{status:"won",...j}),H.get().mock){W("🎉 ¡Venta ganada!","ok");return}try{await fC(x.id,x,j),W("🎉 ¡Venta ganada!","ok")}catch{l(x.id,q),W("No se pudo marcar — revisa los datos requeridos","error")}};if(!z.gates.length)return Z({});g(x,"vendido",z.gates,Z)}async function P(x,z){const q={status:x.status,lostReason:x.lostReason||null};if(l(x.id,{status:"lost",lostReason:z}),H.get().mock){W("Marcado perdido","info");return}try{await pC(x.id,z,x),W("Marcado perdido","info")}catch{l(x.id,q),W("Error","error")}}function A(){if(e.loading)return ve();if(e.error)return X("⚠️","No se pudo cargar",e.error);const x=e.deals.filter(q=>q.status==="open");e.collisionByDeal=new Map;for(const q of aC(x))for(const Z of q.dealIds)e.collisionByDeal.set(Z,q.dealIds.length);if(L(x),e.view==="postventa")return ce();if(i.classList.remove("pipeline__board--list"),ye(i),!x.length){i.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🎯"}),u("div",{class:"state__title",text:"Embudo vacío"}),u("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const z=oC(x);ai.forEach(q=>{const Z=z[q.id]||[],j=Z.reduce((O,B)=>O+(Number(B.amount)||0),0),he=u("div",{class:"pcol","data-stage":q.id},[u("div",{class:"pcol__head"},[u("div",{class:"u-row u-row--tight"},[u("span",{class:"pcol__dot",style:{background:EC(q.id)}}),u("strong",{text:q.label}),u("span",{class:"pcol__count",text:String(Z.length)})]),u("span",{class:"u-caption u-faint",text:`${Math.round(q.prob*100)}% · ${Yn(j)||"$0"}`})]),u("div",{class:"pcol__drop","data-stage":q.id,role:"list"},Z.map($))]);v(he.querySelector(".pcol__drop"),q.id),i.append(he)})}function L(x){const z=dv(x),q=sC(x);ye(s);const Z=e.wonLoading?null:e.won.length,j=(he,O)=>{const B=u("button",{class:"btn btn--sm "+(e.view===he?"btn--gold":"btn--ghost"),type:"button","aria-pressed":e.view===he?"true":"false"},[O]);return B.addEventListener("click",()=>C(he)),B};s.append(u("div",{class:"pipeline__views",role:"group","aria-label":"Vista"},[j("kanban","🎯 Embudo"),j("postventa","🏁 Post-venta"+(Z===null||Z===0?"":" ("+Z+")"))]),N("Oportunidades",String(x.length)),N("Valor del embudo",Yn(q)||"$0"),N("Forecast ponderado",Yn(z)||"$0",!0))}function C(x){e.view!==x&&(e.view=x,x==="postventa"&&w(),A())}function N(x,z,q){return u("div",{class:"pstat"+(q?" pstat--hi":"")},[u("span",{class:"u-caption u-faint",text:x}),u("strong",{class:"pstat__v",text:z})])}function $(x){const z=iC(x),q=u("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[x.amount?Yn(x.amount):"+ monto"]),Z=u("article",{class:"deal-card"+(z?" is-rotting":""),draggable:"true",tabindex:"0","data-id":x.id,"data-stage":x.stageId,role:"listitem","aria-label":`${x.name}, ${Math.round(ci(x.stageId)*100)}%`},[u("div",{class:"deal-card__top"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:gs(x.contactName)}),u("span",{class:"deal-card__name u-grow u-truncate",text:x.name}),z?u("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),x.vehicleName?u("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+x.vehicleName}):null,e.collisionByDeal.has(x.id)?u("div",{class:"deal-card__collision u-caption",title:"Otro negocio activo persigue este mismo carro. Coordinen quién va primero.",text:"🥊 "+e.collisionByDeal.get(x.id)+" negocios por este carro"}):null,u("div",{class:"deal-card__row"},[q,u("span",{class:"badge badge--gold",text:`${Math.round(ci(x.stageId)*100)}%`})]),u("div",{class:"deal-card__foot u-caption u-faint"},[u("span",{class:"u-grow u-truncate",text:x.ownerName?"👤 "+x.ownerName:"Sin asesor"}),u("span",{text:lr(x.lastActivityAt)})]),u("div",{class:"deal-card__actions"},t?[k("stage","↔","Mover etapa"),k("won","✓","Marcar ganado"),k("lost","✕","Marcar perdido"),k("open","⤢","Abrir 360")]:[k("open","⤢","Abrir 360")])]);return Z.addEventListener("dragstart",j=>{e.dragId=x.id,Z.classList.add("is-dragging");try{j.dataTransfer.setData("text/plain",x.id),j.dataTransfer.effectAllowed="move"}catch{}}),Z.addEventListener("dragend",()=>{e.dragId=null,Z.classList.remove("is-dragging")}),Z.addEventListener("click",j=>{const he=j.target.closest("[data-action]");if(he)return U(he.dataset.action,x,he)}),Z}function k(x,z,q){return u("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":x,title:q,"aria-label":q,draggable:"false"},[z])}function U(x,z,q){if(x==="open")return H.set({detailLeadId:z.leadId});if(x==="amount")return I(z,q);if(x==="stage")return Dt(q,ai.map(Z=>({value:Z.id,label:Z.label,hint:Math.round(Z.prob*100)+"%",active:Z.id===z.stageId})),Z=>h(z,Z.value),{title:"Mover a etapa"});if(x==="won")return R(z);if(x==="lost")return Dt(q,yp.map(Z=>({value:Z.id,label:Z.label})),Z=>P(z,Z.value),{title:"Motivo de pérdida"})}function I(x,z){const q=u("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:x.amount||"","aria-label":"Monto en COP"});z.replaceWith(q),q.focus(),q.select();const Z=()=>{const j=parseInt(String(q.value).replace(/\D/g,""),10)||0;T(x,j)};q.addEventListener("keydown",j=>{j.key==="Enter"?(j.preventDefault(),Z()):j.key==="Escape"&&A()}),q.addEventListener("blur",Z)}function v(x,z){x.addEventListener("dragover",q=>{q.preventDefault(),x.classList.add("is-over"),q.dataTransfer&&(q.dataTransfer.dropEffect="move")}),x.addEventListener("dragleave",()=>x.classList.remove("is-over")),x.addEventListener("drop",q=>{q.preventDefault(),x.classList.remove("is-over");const Z=e.dragId||q.dataTransfer&&q.dataTransfer.getData("text/plain"),j=e.deals.find(he=>he.id===Z);j&&h(j,z)})}function w(){if(H.get().mock){e.won=Ol().filter(x=>x.status==="won"),e.wonLoading=!1,e.wonError=null;return}e.wonSub||(e.wonSub=mC({pageSize:100,onData:x=>{e.won=x.slice().sort((z,q)=>String(q.wonAt||q.lastActivityAt||"").localeCompare(String(z.wonAt||z.lastActivityAt||""))),e.wonLoading=!1,e.wonError=null,A()},onError:x=>{if(e.wonSub)try{e.wonSub()}catch{}e.wonSub=null,e.wonLoading=!1,e.wonError=x&&x.code==="permission-denied"?"Sin permiso para ver los ganados.":"Revisa tu conexión.",e.view==="postventa"&&A()}}))}function E(x,z){const q=e.won.findIndex(Z=>Z.id===x);q!==-1&&(e.won[q]={...e.won[q],...z},A())}async function b(x,z,q){const Z=x.postventa||{};if(E(x.id,{postventa:{...Z,[z]:q}}),!H.get().mock)try{await gC(x.id,z,q)}catch{E(x.id,{postventa:Z}),W("No se pudo guardar el checklist","error")}}async function S(x,z){z.disabled=!0,z.textContent="Creando…";try{const q=await vC(x.id);E(x.id,{retomaVehicleId:q.vehicleId}),W("Borrador #"+q.vehicleId+" creado en inventario","ok")}catch(q){z.disabled=!1,z.textContent="Crear borrador en inventario",W(q&&q.message?q.message:"No se pudo crear el borrador","error")}}function y(x){const z=u("input",{class:"input",type:"text",placeholder:"Marca *"}),q=u("input",{class:"input",type:"text",placeholder:"Modelo"}),Z=u("input",{class:"input",type:"number",min:"1980",max:"2035",placeholder:"Año"}),j=u("input",{class:"input",type:"text",placeholder:"Placa",maxlength:"8"}),he=u("input",{class:"input",type:"number",min:"0",step:"500000",placeholder:"Valor estimado (COP)"}),O=u("div",{class:"login__error",role:"alert",hidden:!0}),B=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),Y=u("button",{class:"btn btn--gold",type:"submit"},["Guardar retoma"]),ae=u("form",{class:"nl-form"},[z,q,Z,j,he,O,u("div",{class:"nl-actions"},[B,Y])]),re=u("div",{class:"modal-overlay"},[u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"🚙 Vehículo recibido (retoma)"})]),ae])]);document.body.appendChild(re),r.add(re);const ne=()=>{r.delete(re),re.remove()};B.addEventListener("click",ne),re.addEventListener("mousedown",Te=>{Te.target===re&&ne()}),ae.addEventListener("submit",async Te=>{if(Te.preventDefault(),!z.value.trim()){O.textContent="La marca es obligatoria.",O.hidden=!1;return}const ke={marca:z.value.trim(),modelo:q.value.trim(),year:Number(Z.value)||null,placa:j.value.trim().toUpperCase(),valorEstimado:Math.round(Number(he.value)||0)};ne();const Ue=x.recibeVehiculo||null;if(E(x.id,{recibeVehiculo:ke}),!H.get().mock)try{await _C(x.id,ke)}catch{E(x.id,{recibeVehiculo:Ue}),W("No se pudo guardar","error")}})}function ce(){if(ye(i),i.classList.add("pipeline__board--list"),e.wonError){const x=u("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Reintentar"]);x.addEventListener("click",()=>{e.wonError=null,e.wonLoading=!0,w(),A()}),i.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"⚠️"}),u("div",{class:"state__title",text:"No se pudieron cargar los ganados"}),u("div",{class:"state__msg",text:e.wonError}),x]));return}if(e.wonLoading){i.append(u("div",{class:"state"},[u("div",{class:"state__msg",text:"Cargando ganados…"})]));return}if(!e.won.length){i.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🏁"}),u("div",{class:"state__title",text:"Sin ventas ganadas aún"}),u("div",{class:"state__msg",text:"Cuando marques un negocio como ganado, su checklist de entrega vivirá aquí."})]));return}e.won.forEach(x=>i.append(fe(x)))}function fe(x){const z=fv(x),q=x.commissionSnapshot&&x.commissionSnapshot.amount||x.amount||0,Z=(x.wonAt||x.lastActivityAt||"").slice(0,10),j=hv.map(B=>{const Y=!!(x.postventa&&x.postventa[B.id]),ae=u("input",{type:"checkbox",class:"checkbox"});return ae.checked=Y,t||(ae.disabled=!0),ae.addEventListener("change",()=>b(x,B.id,ae.checked)),u("label",{class:"pv-item"+(Y?" is-done":"")},[ae,u("span",{text:B.label})])}),he=x.recibeVehiculo;let O;if(he&&(he.marca||he.placa)){const B=[u("span",{class:"u-caption u-muted",text:"🚙 Retoma: "+[he.marca,he.modelo,he.placa].filter(Boolean).join(" ")+(he.valorEstimado?" · "+Yn(he.valorEstimado):"")})];if(x.retomaVehicleId)B.push(u("span",{class:"badge badge--gold",text:"Borrador #"+x.retomaVehicleId+" ✓"}));else if(t){const Y=u("button",{class:"btn btn--soft btn--sm",type:"button"},["Crear borrador en inventario"]);Y.addEventListener("click",()=>S(x,Y)),B.push(Y)}O=u("div",{class:"pv-retoma"},B)}else if(t){const B=u("button",{class:"btn btn--ghost btn--sm",type:"button"},["＋ Retoma"]);B.addEventListener("click",()=>y(x)),O=u("div",{class:"pv-retoma"},[B])}return u("article",{class:"deal-card deal-card--pv","data-id":x.id},[u("div",{class:"deal-card__top"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:gs(x.contactName)}),u("span",{class:"deal-card__name u-grow u-truncate",text:x.name}),u("span",{class:"badge "+(z?"badge--gold":""),title:z?"Checklist completo: entra a liquidación de comisiones (F42)":"La comisión se liquida cuando el checklist esté completo",text:z?"✓ Liquidable":"⏳ Pendiente"})]),u("div",{class:"u-caption u-muted"},[u("span",{text:(x.vehicleName?"🚗 "+x.vehicleName+" · ":"")+Yn(q)}),u("span",{class:"u-faint",text:(x.tipoPago?" · "+x.tipoPago:"")+(Z?" · ganado "+Z:"")})]),u("div",{class:"pv-checklist"},j),O||null,u("div",{class:"deal-card__foot u-caption u-faint"},[u("span",{class:"u-grow u-truncate",text:x.ownerName?"👤 "+x.ownerName:"Sin asesor"})])])}function X(x,z,q){ye(i),i.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:x}),u("div",{class:"state__title",text:z}),u("div",{class:"state__msg",text:q})]))}function ve(){ye(s),ye(i),ai.slice(0,5).forEach(()=>{i.append(u("div",{class:"pcol"},[u("div",{class:"pcol__head"},[u("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),u("div",{class:"pcol__drop"},[1,2].map(()=>u("div",{class:"deal-card",style:{pointerEvents:"none"}},[u("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function Fe(){if(H.get().mock){e.deals=Ol().filter(x=>x.status==="open"),e.loading=!1,w(),A();return}e.sub=lC({pageSize:150,onData:x=>{e.deals=x,e.loading=!1,e.error=null,A()},onError:x=>{e.loading=!1,e.error=x&&x.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",A()}}),w()}return A(),Fe(),function(){if(e.sub&&e.sub(),e.sub=null,e.wonSub&&e.wonSub(),e.wonSub=null,r.forEach(z=>{try{z.remove()}catch{}}),r.clear(),p){try{p.remove()}catch{}p=null}}}function EC(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const TC=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],wp=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function xi(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function yv(n,e){const r=(new Date(n,e,1).getDay()+6)%7,s=new Date(n,e+1,0).getDate(),i=[];for(let c=0;c<r;c++)i.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=s;c++)i.push({date:new Date(n,e,c),inMonth:!0});for(;i.length%7!==0;){const c=i[i.length-1].date;i.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const o=[];for(let c=0;c<i.length;c+=7)o.push(i.slice(c,c+7));return o}function AC(n,e){const t=yv(n,e),r=t[0][0].date,i=t[t.length-1][6].date,o=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);return{startISO:r.toISOString(),endISO:o.toISOString()}}function SC(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=xi(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,s)=>new Date(r.dueAt)-new Date(s.dueAt));return e}function Ip(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function RC(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const CC=n=>({id:n.id,...n.data()});function PC(n,e,t,r){const s=ht(Ve(de,"activities"),xn("dueAt",">=",n),xn("dueAt","<",e),At("dueAt","asc"));return Ln(s,i=>t(i.docs.map(CC)),i=>r&&r(i))}async function Jn(n,e,t){return(await Sr(Rr,"crmCitaAction")({action:n,solicitudId:e||null,payload:t||{}})).data}async function kC(n){const e=await Ar(Oe(de,"solicitudes",n));return e.exists()?{id:e.id,...e.data()}:null}async function bv(){const n=await Ar(Oe(de,"config","availability"));return n.exists()?n.data():{}}async function wv(){const n=await Ar(Oe(de,"config","bookedSlots"));return n.exists()?n.data():{}}const xC=["super_admin","admin","editor","asesor","moderator"];let Ao=null;async function Iv(){if(Ao)return Ao;const n=H.get(),e=new Map;try{(await tn(ht(Ve(de,"usuarios"),vt(50)))).docs.forEach(r=>{const s=r.data();s.bloqueado!==!0&&(!xC.includes(s.rol)&&!s.roleId||e.set(r.id,{uid:r.id,nombre:s.nombre||s.email||r.id,rol:s.rol||s.roleId||""}))})}catch{try{const r=await Ar(Oe(de,"config","crmIntake"));(r.exists()&&Array.isArray(r.data().rotation)?r.data().rotation:[]).forEach(i=>{const o=typeof i=="string"?i:i.uid;o&&e.set(o,{uid:o,nombre:typeof i=="object"&&i.nombre||o,rol:""})})}catch{}}return n.user&&!e.has(n.user.uid)&&e.set(n.user.uid,{uid:n.user.uid,nombre:n.profile&&n.profile.nombre||n.user.email||"Yo",rol:n.profile&&n.profile.rol||""}),Ao=Array.from(e.values()),Ao}const NC={pendiente:"🕐 Pendiente (sin confirmar)",confirmada:"✅ Confirmada",reprogramada:"🔁 Reprogramada (re-confirmar)",completada:"🏁 Completada",cancelada:"✖ Cancelada",no_show:"🚫 No asistió",caducada:"⏳ Caducada (no confirmó)"},DC=["pendiente","confirmada","reprogramada"],VC="";function OC(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Ev(n,e,t){const r=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:n}),e?u("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=u("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{overlay:s,card:r,close:i}}function Hn(n,e){return e?u("div",{class:"cita-row"},[u("span",{class:"cita-row__k u-caption u-muted",text:n}),u("span",{class:"cita-row__v",text:String(e)})]):null}function LC(n,e,t){if(!t)return[];if(Array.isArray(n.blockedDates)&&n.blockedDates.includes(t))return[];const r=new Date(t+"T12:00:00Z").getUTCDay();if(!(Array.isArray(n.days)?n.days:[1,2,3,4,5,6]).includes(r))return[];const s=Array.isArray(e[t])?e[t]:[],i=n.blockedHours&&n.blockedHours[t]||[],o=[],c=n.interval||60;for(let l=(n.startHour??9)*60;l<(n.endHour??17)*60;l+=c){const h=`${String(Math.floor(l/60)).padStart(2,"0")}:${String(l%60).padStart(2,"0")}`;!s.includes(h)&&!i.includes(h)&&o.push(h)}return o}function Tv(n,e,{fecha:t,hora:r}={}){const s=u("input",{class:"input",type:"date",min:OC(),value:t||""}),i=u("select",{class:"select"},[u("option",{value:"",text:"— hora —"})]);function o(){const c=LC(n,e,s.value);i.replaceChildren(u("option",{value:"",text:c.length?"— hora —":"Sin horarios ese día"}),...c.map(l=>u("option",{value:l,text:l}))),r&&c.includes(r)&&(i.value=r)}return s.addEventListener("change",o),t&&o(),{dateIn:s,hourSel:i,value:()=>({fecha:s.value,hora:i.value})}}async function Av(n){const e=u("select",{class:"select"},[u("option",{value:"",text:"Cargando…"})]),t=await Iv();e.replaceChildren(u("option",{value:"",text:"— asesor —"}),...t.map(s=>u("option",{value:s.uid,text:s.nombre})));const r=H.get().user;return e.value=n&&t.some(s=>s.uid===n)?n:r&&t.some(s=>s.uid===r.uid)?r.uid:"",e._advisors=t,e}async function Sv(n){const e=u("select",{class:"select"},[u("option",{value:VC,text:"Sin vehículo asignado"})]);try{const t=await gv();e.append(...t.map(r=>u("option",{value:r.id,text:r.label}))),n&&(e.value=n),e._vehicles=t}catch{e._vehicles=[]}return e}function MC(n,e){const t=String(n.whatsapp||n.telefono||"").replace(/\D/g,"");if(!t)return null;const r=t.length===10&&t.startsWith("3")?"57"+t:t.startsWith("57")?t:String(n.prefijoPais||"57").replace(/\D/g,"")+t,s=`Hola ${n.nombre||""}! Te escribo de ALTORRA CARS por tu cita del ${n.fecha||""} a las ${n.hora||""}`+(n.vehiculo?` para ver el ${n.vehiculo}`:"")+`. Confírmala aquí 👉 ${e}`;return`https://wa.me/${r}?text=${encodeURIComponent(s)}`}async function FC(n,{onLead:e}={}){const t=n.sourceSolicitudId;if(!t)return;if(H.get().mock){W("En demo las citas web no tienen acciones.","info");return}let r;try{r=await kC(t)}catch{r=null}if(!r){W("No se pudo cargar la cita.","error");return}const s=Pt("crm.edit"),i=DC.includes(r.estado),o=u("div",{class:"nl-form"}),c=u("div",{class:"login__error",role:"alert",hidden:!0}),l=T=>{c.textContent=T,c.hidden=!1},{close:h}=Ev("Cita · "+(r.nombre||"Cliente"),NC[r.estado]||r.estado,[o]);function p(){return u("div",{class:"cita-info"},[Hn("Cuándo",(r.fecha||"")+(r.hora?" · "+r.hora:"")),Hn("Tipo",r.tipo),Hn("Vehículo",r.vehiculo),Hn("Teléfono",(r.prefijoPais||"")+" "+(r.whatsapp||r.telefono||"")),Hn("Asesor",r.assignedToName||r.assignedTo),r.confirmedAt?Hn("Confirmó",(r.confirmedVia||"")+" · "+String(r.confirmedAt).slice(0,16).replace("T"," ")):null,r._tupleConflict?u("div",{class:"cita-conflict",text:"⚠️ El cliente confirmó pero el horario CHOCA con otra cita del asesor — reprograma una de las dos."}):null,r._requiereReagendar?u("div",{class:"cita-conflict",text:"🚗 El carro de esta cita ya no está disponible — ofrece otro o reagenda."}):null,Hn("Notas",r.comentarios||r.mensaje)])}async function m(T,R){c.hidden=!0;try{await R(),W(T,"ok"),h(),e&&r._leadId&&e(r._leadId)}catch(P){l(P&&P.message||"No se pudo completar la acción.")}}async function g(){if(o.replaceChildren(p(),c),!s||!i){if(r._leadId){const C=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Ver cliente (360)"});C.addEventListener("click",()=>{h(),H.set({detailLeadId:r._leadId})}),o.append(C)}return}const T=u("div",{class:"cita-actions"}),R=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"📲 Pedir confirmación por WhatsApp"});R.addEventListener("click",async()=>{R.disabled=!0;try{const C=await Jn("getConfirmLink",r.id),N=MC(r,C.url);if(!N){l("La cita no tiene teléfono."),R.disabled=!1;return}window.open(N,"_blank","noopener"),W("Mensaje listo en WhatsApp — el cliente confirma tocando el link.","ok"),R.disabled=!1}catch(C){l(C&&C.message||"No se pudo generar el link."),R.disabled=!1}});const P=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"✓ Confirmar (asignar asesor)"});P.addEventListener("click",async()=>{o.replaceChildren(p(),c,u("p",{class:"u-caption u-muted",text:"Confirmar reserva el bloque del asesor (y del carro si aplica)."}));const C=await Av(r.assignedTo),N=await Sv(r.vehicleAssignedId||r.vehiculoId),$=u("select",{class:"select"},[u("option",{value:"manual",text:"El cliente confirmó (llamada/persona)"}),u("option",{value:"whatsapp",text:"El cliente confirmó por WhatsApp"}),u("option",{value:"email",text:"El cliente confirmó por email"})]),k=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"✓ Confirmar cita"}),U=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});U.addEventListener("click",g),k.addEventListener("click",()=>{if(!C.value){l("Elige el asesor.");return}const I=(C._advisors||[]).find(w=>w.uid===C.value)?.nombre||null,v=(N._vehicles||[]).find(w=>w.id===N.value);m("✅ Cita confirmada",()=>Jn("confirm",r.id,{asesorId:C.value,asesorName:I,canal:$.value,vehicleId:N.value||null,vehicleName:v?v.label:null}))}),o.append(u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor *"}),C]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo"}),N]),u("label",{class:"field"},[u("span",{class:"field__label",text:"¿Cómo confirmó?"}),$]),u("div",{class:"nl-actions"},[U,k]))});const A=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🔁 Reprogramar"});A.addEventListener("click",async()=>{o.replaceChildren(p(),c,u("p",{class:"u-caption u-muted",text:"Al reprogramar, el link viejo de confirmación deja de servir y el cliente debe re-confirmar."}));let C,N;try{[C,N]=await Promise.all([bv(),wv()])}catch{l("No se pudo cargar la disponibilidad — revisa tu conexión y reintenta.");return}const $=Tv(C,N,{}),k=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"🔁 Mover cita"}),U=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});U.addEventListener("click",g),k.addEventListener("click",()=>{const{fecha:I,hora:v}=$.value();if(!I||!v){l("Elige fecha y hora.");return}m("🔁 Cita reprogramada — pídele re-confirmar por WhatsApp",()=>Jn("reschedule",r.id,{fecha:I,hora:v}))}),o.append(u("div",{class:"cfg-row"},[$.dateIn,$.hourSel]),u("div",{class:"nl-actions"},[U,k]))});const L=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"✖ Cancelar cita"});if(L.addEventListener("click",()=>{o.replaceChildren(p(),c);const C=u("input",{class:"input",type:"text",placeholder:"Motivo (le llega al cliente por email)"}),N=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Confirmar cancelación"}),$=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});$.addEventListener("click",g),N.addEventListener("click",()=>m("✖ Cita cancelada (cupo liberado)",()=>Jn("cancel",r.id,{motivo:C.value.trim()}))),o.append(C,u("div",{class:"nl-actions"},[$,N]))}),T.append(R,P,A,L),r.estado!=="pendiente"){const C=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🏁 Completada"});C.addEventListener("click",()=>m("🏁 Cita completada",()=>Jn("complete",r.id)));const N=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🚫 No asistió"});N.addEventListener("click",()=>m("🚫 No-show registrado — mañana 9am te recuerda llamarlo",()=>Jn("no_show",r.id))),T.append(C,N)}if(r._leadId){const C=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"👤 Ver cliente (360)"});C.addEventListener("click",()=>{h(),H.set({detailLeadId:r._leadId})}),T.append(C)}o.append(T)}await g()}async function UC(n,{onDone:e}={}){if(H.get().mock){const A=new Date(Date.now()+864e5).toISOString();QR({type:"cita",subject:"Cita con "+(n.fullName||""),dueAt:A,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}),W("📅 Cita agendada (demo)","ok");return}const t=u("div",{class:"login__error",role:"alert",hidden:!0}),r=A=>{t.textContent=A,t.hidden=!1},s=u("div",{class:"nl-form"},[u("p",{class:"u-caption u-muted",text:"La cita manual nace CONFIRMADA y reserva el bloque del asesor (y del carro). Necesitas señal."})]),{close:i}=Ev("📅 Agendar cita",n.fullName||"Cliente",[s]);let o,c,l,h;try{[o,c,l,h]=await Promise.all([bv(),wv(),Av(n.ownerId),Sv(n.vehicleOfInterestId)])}catch{s.append(t),r("No se pudo cargar la disponibilidad — revisa tu conexión y vuelve a abrir el diálogo.");return}const p=Tv(o,c,{}),m=u("select",{class:"select"},[u("option",{value:"visita",text:"Visita al concesionario"}),u("option",{value:"test_drive",text:"Test drive"}),u("option",{value:"llamada",text:"Llamada agendada"})]),g=u("select",{class:"select"},[u("option",{value:"30",text:"30 min"}),u("option",{value:"60",text:"1 hora",selected:""}),u("option",{value:"90",text:"1h 30"})]),T=u("input",{class:"input",type:"text",placeholder:"Nota (opcional)"}),R=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"📅 Crear cita confirmada"}),P=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});P.addEventListener("click",i),R.addEventListener("click",async()=>{t.hidden=!0;const{fecha:A,hora:L}=p.value();if(!A||!L)return r("Elige fecha y hora.");if(!l.value)return r("Elige el asesor que atiende.");R.disabled=!0,R.textContent="Creando…";const C=(l._advisors||[]).find($=>$.uid===l.value)?.nombre||null,N=(h._vehicles||[]).find($=>$.id===h.value);try{await Jn("create",null,{leadId:n.id||null,contactId:n.contactId||null,nombre:n.fullName||"Cliente",telefono:n.phone||null,email:n.email||null,fecha:A,hora:L,duracionMin:parseInt(g.value,10)||60,asesorId:l.value,asesorName:C,vehicleId:h.value||null,vehicleName:N?N.label:null,tipo:m.value,nota:T.value.trim()}),W("📅 Cita creada y confirmada — ya está en la Agenda","ok"),i(),e&&e()}catch($){R.disabled=!1,R.textContent="📅 Crear cita confirmada",r($&&$.message||"No se pudo crear la cita.")}}),s.append(u("div",{class:"cfg-row"},[p.dateIn,p.hourSel]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor *"}),l]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo"}),h]),u("div",{class:"cfg-row"},[m,g]),T,t,u("div",{class:"nl-actions"},[P,R]))}function BC(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=u("div",{class:"agenda__head"}),s=u("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["✅ Toca una cita para confirmarla (asignando asesor), pedir confirmación por WhatsApp, reprogramarla o cancelarla. ","Si el cliente no confirma, caduca sola 3h antes y libera el cupo. El ",u("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario clásico"})," sigue de respaldo hasta el cambio definitivo."]),i=u("div",{class:"agenda__weekdays"},TC.map(A=>u("span",{class:"agenda__wd",text:A}))),o=u("div",{class:"agenda__grid"}),c=u("section",{class:"agenda"},[r,s,i,o]);ye(n),n.append(c);function l(A){let L=t.month+A,C=t.year;L<0?(L=11,C--):L>11&&(L=0,C++),t.year=C,t.month=L,P()}function h(){t.year=e.getFullYear(),t.month=e.getMonth(),P()}function p(){ye(r);const A=u("div",{class:"u-row u-row--tight"},[m("‹","Mes anterior",()=>l(-1)),u("button",{class:"btn btn--soft btn--sm",type:"button",onclick:h},["Hoy"]),m("›","Mes siguiente",()=>l(1))]);r.append(u("h2",{class:"agenda__title",text:`${wp[t.month]} ${t.year}`}),A)}function m(A,L,C){const N=u("button",{class:"icon-btn",type:"button","aria-label":L},[A]);return N.addEventListener("click",C),N}function g(){if(p(),ye(o),t.error){o.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"⚠️"}),u("div",{class:"state__title",text:"No se pudo cargar la agenda"}),u("div",{class:"state__msg",text:t.error})]));return}const A=SC(t.events);yv(t.year,t.month).forEach(C=>{C.forEach(N=>{const $=xi(N.date),k=A[$]||[],U=RC(N.date,e),I=u("div",{class:"agenda__day"+(N.inMonth?"":" is-out")+(U?" is-today":""),role:"gridcell"},[u("div",{class:"agenda__daynum",text:String(N.date.getDate())})]),v=u("div",{class:"agenda__events"});if(k.slice(0,3).forEach(w=>v.append(T(w))),k.length>3){const w=u("button",{class:"agenda__more",type:"button"},[`+${k.length-3} más`]);w.addEventListener("click",()=>Dt(w,k.map(E=>({value:E,label:`${Ip(E.dueAt)} · ${E.relatedTo?.name||E.subject||"Cita"}`})),E=>R(E.value),{title:`${N.date.getDate()} ${wp[t.month]}`})),v.append(w)}I.append(v),o.append(I)})})}function T(A){const L=A.type==="cita"?A.estadoCita||"pendiente":null,C="agenda__chip"+(L?" agenda__chip--"+L:"")+(A.status==="closed"?" is-closed":""),N=u("button",{class:C,type:"button",title:A.subject||"Cita"},[u("span",{class:"agenda__chip-time",text:Ip(A.dueAt)}),u("span",{class:"u-truncate",text:A.relatedTo?.name||A.subject||"Cita"})]);return N.addEventListener("click",()=>R(A)),N}function R(A){if(A.type==="cita"&&A.sourceSolicitudId){FC(A,{onLead:C=>H.set({detailLeadId:C})});return}const L=A.relatedTo&&A.relatedTo.id;L&&H.set({detailLeadId:L})}function P(){if(g(),t.sub&&(t.sub(),t.sub=null),H.get().mock){t.events=WR(),t.loading=!1,g();return}const{startISO:A,endISO:L}=AC(t.year,t.month);t.sub=PC(A,L,C=>{t.events=C,t.loading=!1,t.error=null,g()},C=>{t.loading=!1,t.error=C&&C.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",g()})}return P(),function(){t.sub&&t.sub(),t.sub=null}}const $C=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},cc=n=>n.status==="won",Rv=n=>n.status==="lost",od=n=>n.status==="open",ad=n=>n.status==="convertido";function Ep(n,e){return e?n.filter(t=>$C(t.createdAt)>=e):n.slice()}function qC(n,e){const t=n.length,r=n.filter(ad).length,s=e.filter(cc),i=e.filter(Rv),o=s.reduce((l,h)=>l+(Number(h.amount)||0),0),c=s.length+i.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:s.length,lost:i.length,winRate:c?s.length/c:0,wonValue:o}}function jC(n,e){const t=e.filter(od),r=n.filter(i=>!vs(i.status)),s=r.filter(i=>{const o=rv(i);return!o.closed&&(o.state==="warn"||o.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:dv(t),slaRisk:s}}function zC(n,e){const t=new Set(e.filter(cc).map(h=>h.id)),r=n.filter(h=>h.status==="contactado"||h.status==="calificado"||h.status==="convertido"),s=n.filter(h=>h.status==="calificado"||h.status==="convertido"),i=n.filter(ad),o=i.filter(h=>h.convertedTo&&t.has(h.convertedTo.dealId)),c=n.length||1,l=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:s.length},{key:"convertidos",label:"Convertidos",count:i.length},{key:"ganados",label:"Ganados",count:o.length}];return l.map((h,p)=>({...h,pctTop:h.count/c,convFromPrev:p===0?1:l[p-1].count?h.count/l[p-1].count:0}))}function GC(n,e){const t={},r=s=>t[s.key]||(t[s.key]={key:s.key,label:s.label,icon:s.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(s=>{const i=r(Pi(s));i.leads++,ad(s)&&i.convertidos++}),e.forEach(s=>{const i=r(Pi(s));i.deals++,cc(s)&&(i.won++,i.revenue+=Number(s.amount)||0)}),Object.values(t).map(s=>({...s,convRate:s.leads?s.convertidos/s.leads:0})).sort((s,i)=>i.leads-s.leads||i.revenue-s.revenue)}function HC(n){const e=n.filter(od);return ai.map(t=>{const r=e.filter(s=>s.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((s,i)=>s+(Number(i.amount)||0),0),weighted:r.reduce((s,i)=>s+id(i),0)}})}function KC(n,e,t=[]){const r={},s=(i,o)=>r[i]||(r[i]={ownerId:i,ownerName:o,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(i=>s(i.uid,i.nombre)),n.forEach(i=>{const o=i.ownerId||"_none";s(o,i.ownerName||(o==="_none"?"Sin asignar":o)).leads++}),e.forEach(i=>{const o=i.ownerId||"_none",c=s(o,i.ownerName||(o==="_none"?"Sin asignar":o));c.deals++,cc(i)?c.won++:Rv(i)?c.lost++:od(i)&&(c.pipelineWeighted+=id(i))}),Object.values(r).filter(i=>i.leads||i.deals).map(i=>({...i,winRate:i.won+i.lost?i.won/(i.won+i.lost):0})).sort((i,o)=>o.won-i.won||o.pipelineWeighted-i.pipelineWeighted||o.leads-i.leads)}function WC(n,e=30){const t=[],r={},s=new Date;for(let i=e-1;i>=0;i--){const o=new Date(s.getFullYear(),s.getMonth(),s.getDate()-i),c={key:xi(o),date:o,count:0};t.push(c),r[c.key]=c}return n.forEach(i=>{if(!i.createdAt)return;const o=r[xi(new Date(i.createdAt))];o&&o.count++}),t}function QC(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")}function YC(n=6){const e=[],t=new Date;for(let r=0;r<n;r++){const s=new Date(t.getFullYear(),t.getMonth()-r,1),i=s.getFullYear()+"-"+String(s.getMonth()+1).padStart(2,"0"),o=s.toLocaleDateString("es-CO",{month:"long",year:"numeric"});e.push({key:i,label:o.charAt(0).toUpperCase()+o.slice(1)})}return e}function JC(n,e,t=[]){const r=(n||[]).filter(i=>i.status==="won"&&QC(i.wonAt||i.lastActivityAt)===e),s={};return r.forEach(i=>{const o=i.commissionSnapshot||{},c=o.ownerId||i.ownerId||"_none",l=(t.find(g=>g.uid===c)||{}).nombre,h=s[c]||(s[c]={ownerId:c,ownerName:l||i.ownerName||(c==="_none"?"Sin asignar":c),vendidos:0,liquidables:0,pendientes:0,baseLiquidable:0,basePendiente:0,deals:[]}),p=Number(o.amount!=null?o.amount:i.amount)||0,m=fv(i);h.vendidos++,m?(h.liquidables++,h.baseLiquidable+=p):(h.pendientes++,h.basePendiente+=p),h.deals.push({id:i.id,name:i.name||"",base:p,liquidable:m,tipoPago:o.tipoPago||i.tipoPago||""})}),Object.values(s).sort((i,o)=>o.baseLiquidable-i.baseLiquidable||o.vendidos-i.vendidos)}const Tp=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function XC(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const Cv=n=>({id:n.id,...n.data()});async function Ap(n,e){return(await tn(ht(Ve(de,n),At("createdAt","desc"),vt(e)))).docs.map(Cv)}async function ZC({pageSize:n=500}={}){if(H.get().mock){const i=Ol();return{leads:Ta(),deals:i,wons:i.filter(o=>o.status==="won"),capped:!1}}const[e,t,r]=await Promise.all([Ap("leads",n),Ap("deals",n),tn(ht(Ve(de,"deals"),xn("status","==","won"),At("lastActivityAt","desc"),vt(300)))]);return{leads:e.filter(i=>!i.archived),deals:t,wons:r.docs.map(Cv),capped:e.length>=n||t.length>=n}}const eP="http://www.w3.org/2000/svg";function Hc(n,e={},t=[]){const r=document.createElementNS(eP,n);for(const[s,i]of Object.entries(e))i==null||i===!1||r.setAttribute(s,String(i));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function tP(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(s=>Number(s.value)||0)),r=u("div",{class:"reportes__bars",role:"list"});return n.forEach(s=>{const i=s.pct!=null?s.pct:t?(Number(s.value)||0)/t:0,o=Math.max(0,Math.min(100,i*100));r.append(u("div",{class:"reportes__bar",role:"listitem"},[u("span",{class:"reportes__bar-label u-truncate",text:s.label}),u("span",{class:"reportes__bar-track","aria-hidden":"true"},[u("span",{class:"reportes__bar-fill",style:{width:o+"%",background:s.color||"var(--grad-gold)"}})]),u("span",{class:"reportes__bar-val u-mono",text:s.display!=null?s.display:String(s.value)})]))}),r}function nP(n){const s=n.map(R=>Number(R.value)||0),i=Math.max(...s,0),o=Math.max(1,i),c=n.length,l=R=>c<=1?600/2:6+R*(600-2*6)/(c-1),h=R=>134-R/o*(140-2*6),p=n.map((R,P)=>`${l(P).toFixed(1)},${h(s[P]).toFixed(1)}`).join(" "),m=`6,134 ${p} ${594 .toFixed(1)},134`,g=s.reduce((R,P)=>R+P,0),T=(n[s.indexOf(i)]||{}).label||"";return Hc("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${g} en total; pico de ${i}${T?" el "+T:""}.`},[Hc("polygon",{points:m,fill:"var(--gold-300)",opacity:"0.30"}),Hc("polyline",{points:p,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const bt=n=>Math.round((n||0)*100)+"%",pt=n=>Yn(n)||"$0",Kc=n=>`${n.getDate()}/${n.getMonth()+1}`;function rP(n){const e=YC(6),t={leads:[],deals:[],wons:[],loading:!0,error:null,capped:!1,days:30,month:e[0].key};let r=!0;const s=u("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),i=u("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),o=u("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);i.addEventListener("click",E),o.addEventListener("click",w);const c=u("div",{class:"reportes__toolbar"},[s,u("div",{class:"u-row u-row--tight"},[i,o])]),l=u("div",{class:"reportes__body"}),h=u("section",{class:"reportes"},[c,l]);ye(n),n.append(h);function p(){ye(s),Tp.forEach(b=>{const S=t.days===b.value,y=u("button",{class:"chip",type:"button","aria-pressed":S?"true":"false"},[b.label]);y.addEventListener("click",()=>{t.days=b.value,g()}),s.append(y)})}function m(){const b=XC(t.days),S=Ep(t.leads,b),y=Ep(t.deals,b);return{pLeads:S,pDeals:y,pk:qC(S,y),ck:jC(t.leads,t.deals),fn:zC(S,t.deals),src:GC(S,y),stg:HC(t.deals),own:KC(S,y,H.get().mock?Vl():H.get().team||[]),tr:WC(t.leads,30),com:JC(t.wons,t.month,H.get().mock?Vl():H.get().team||[])}}function g(){if(p(),t.loading)return v();if(t.error)return I("⚠️","No se pudieron cargar los reportes",t.error);if(!t.leads.length&&!t.deals.length)return I("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const b=m();ye(l),t.capped&&l.append(u("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),l.append(T("Del período",[R("Leads nuevos",String(b.pk.leadsNew)),R("Tasa de conversión",bt(b.pk.convRate),`${b.pk.convertidos} de ${b.pk.leadsNew}`),R("Win rate",bt(b.pk.winRate),`${b.pk.won} ganadas · ${b.pk.lost} perdidas`),R("Valor ganado",pt(b.pk.wonValue),null,!0)]),T("Estado actual",[R("Leads activos",String(b.ck.leadsActive)),R("Oportunidades abiertas",String(b.ck.dealsOpen)),R("Pipeline ponderado",pt(b.ck.pipelineWeighted),null,!0),R("SLA en riesgo",String(b.ck.slaRisk),b.ck.slaRisk?"requieren atención":"al día")]),P(b.fn),A(b.src),L(b.stg),C(b.tr),N(b.own),$(b.com))}function T(b,S){return u("div",{class:"reportes__section"},[u("h2",{class:"reportes__sec-title",text:b}),u("div",{class:"reportes__kpis"},S)])}function R(b,S,y,ce){return u("div",{class:"reportes__kpi"+(ce?" reportes__kpi--hi":"")},[u("span",{class:"reportes__kpi-label u-caption u-faint",text:b}),u("strong",{class:"reportes__kpi-val",text:S}),y?u("span",{class:"reportes__kpi-sub u-caption u-faint",text:y}):null])}function P(b){const S=b.map((y,ce)=>({label:y.label,value:y.count,pct:y.pctTop,display:ce===0?String(y.count):`${y.count} · ${bt(y.convFromPrev)}`,color:"var(--grad-gold)"}));return k("Embudo de ventas","De lead a venta — dónde se pierde el avance",tP(S,{max:b[0]?b[0].count:1}))}function A(b){const S=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],y=b.map(fe=>[`${fe.icon||""} ${fe.label}`.trim(),String(fe.leads),bt(fe.convRate),String(fe.deals),String(fe.won),pt(fe.revenue)]),ce=b.length?null:"Sin leads en el período.";return k("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",U(S,y,ce))}function L(b){const S=["Etapa","Prob.","Oport.","Valor","Ponderado"],y=b.map(X=>[X.label,bt(X.prob),String(X.count),pt(X.value),pt(X.weighted)]),ce=b.reduce((X,ve)=>({count:X.count+ve.count,value:X.value+ve.value,weighted:X.weighted+ve.weighted}),{count:0,value:0,weighted:0}),fe=["Total","",String(ce.count),pt(ce.value),pt(ce.weighted)];return k("Forecast por etapa","Pipeline abierto actual (no depende del período)",U(S,y,null,fe))}function C(b){const S=b.reduce((X,ve)=>X+ve.count,0),y=b.map(X=>({label:Kc(X.date),value:X.count})),ce=b.length?`${Kc(b[0].date)} – ${Kc(b[b.length-1].date)}`:"",fe=u("div",{class:"reportes__chart"},[nP(y),u("div",{class:"reportes__axis u-caption u-faint"},[u("span",{text:ce}),u("span",{text:`${S} leads`})])]);return k("Tendencia de captación","Nuevos leads · últimos 30 días",fe)}function N(b){const S=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],y=b.map(fe=>[fe.ownerName,String(fe.leads),String(fe.deals),String(fe.won),bt(fe.winRate),pt(fe.pipelineWeighted)]),ce=b.length?null:"Sin actividad asignada en el período.";return k("Rendimiento del equipo","Por asesor, en el período seleccionado",U(S,y,ce))}function $(b){const S=u("select",{class:"select","aria-label":"Mes de liquidación",style:{maxWidth:"220px"}},e.map(z=>{const q=u("option",{value:z.key},[z.label]);return z.key===t.month&&(q.selected=!0),q}));S.addEventListener("change",()=>{t.month=S.value,g()});const y=["Asesor","Vendidos","✓ Liquidables","Base liquidable","⏳ Pendientes","Base pendiente"],ce=b.map(z=>[z.ownerName,String(z.vendidos),String(z.liquidables),pt(z.baseLiquidable),String(z.pendientes),pt(z.basePendiente)]),fe=b.reduce((z,q)=>({v:z.v+q.vendidos,l:z.l+q.liquidables,bl:z.bl+q.baseLiquidable,p:z.p+q.pendientes,bp:z.bp+q.basePendiente}),{v:0,l:0,bl:0,p:0,bp:0}),X=b.length?["Total",String(fe.v),String(fe.l),pt(fe.bl),String(fe.p),pt(fe.bp)]:null,ve=b.length?null:"Sin ventas ganadas en el mes seleccionado.",Fe=b.flatMap(z=>z.deals.map(q=>[q.name||q.id,z.ownerName,pt(q.base),q.tipoPago||"—",q.liquidable?"✓ liquidable":"⏳ checklist pendiente"])),x=u("div",{},[u("div",{class:"u-row",style:{marginBottom:"10px"}},[S]),U(y,ce,ve,X),Fe.length?u("details",{style:{marginTop:"10px"}},[u("summary",{class:"u-caption u-muted",text:"Detalle por negocio ("+Fe.length+")"}),U(["Negocio","Asesor","Base","Pago","Estado"],Fe,null)]):null]);return k("Comisiones del mes",'"Si no está en el CRM, no entra a liquidación" — solo vendidos con checklist post-venta completo (F42)',x)}function k(b,S,y){return u("div",{class:"reportes__section"},[u("div",{class:"reportes__sec-head"},[u("h2",{class:"reportes__sec-title",text:b}),S?u("span",{class:"reportes__sec-cap u-caption u-faint",text:S}):null]),y])}function U(b,S,y,ce){if(!S.length&&y)return u("div",{class:"reportes__empty u-caption u-faint",text:y});const fe=u("thead",{},[u("tr",{},b.map((Fe,x)=>u("th",{class:x===0?"":"is-num",scope:"col",text:Fe})))]),X=u("tbody",{},S.map(Fe=>u("tr",{},Fe.map((x,z)=>u("td",{class:z===0?"":"is-num",text:x}))))),ve=[fe,X];return ce&&ve.push(u("tfoot",{},[u("tr",{},ce.map((Fe,x)=>x===0?u("th",{scope:"row",text:Fe}):u("td",{class:"is-num",text:Fe})))])),u("div",{class:"reportes__tablewrap"},[u("table",{class:"reportes__table"},ve)])}function I(b,S,y){ye(l),l.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:b}),u("div",{class:"state__title",text:S}),u("div",{class:"state__msg",text:y})]))}function v(){ye(l);const b=u("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>u("div",{class:"reportes__kpi"},[u("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));l.append(u("div",{class:"reportes__section"},[b])),l.append(u("div",{class:"reportes__section"},[u("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function w(){if(t.loading||t.error){W("Aún no hay datos para exportar","info");return}const b=m(),S=(Tp.find(X=>X.value===t.days)||{}).label||"",y=[],ce=X=>{y.push([]),y.push([X])};y.push(["Reporte Altorra CRM"]),y.push(["Período",S]),y.push(["Generado",new Date().toLocaleString("es-CO")]),ce("KPIs del período"),y.push(["Métrica","Valor"]),y.push(["Leads nuevos",b.pk.leadsNew]),y.push(["Conversión",bt(b.pk.convRate)]),y.push(["Win rate",bt(b.pk.winRate)]),y.push(["Ganadas",b.pk.won]),y.push(["Perdidas",b.pk.lost]),y.push(["Valor ganado (COP)",b.pk.wonValue]),y.push(["Leads activos (ahora)",b.ck.leadsActive]),y.push(["Oportunidades abiertas (ahora)",b.ck.dealsOpen]),y.push(["Pipeline ponderado COP (ahora)",b.ck.pipelineWeighted]),y.push(["SLA en riesgo (ahora)",b.ck.slaRisk]),ce("Embudo"),y.push(["Etapa","Cantidad","Conversión desde anterior"]),b.fn.forEach((X,ve)=>y.push([X.label,X.count,ve===0?"":bt(X.convFromPrev)])),ce("Rendimiento por canal"),y.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),b.src.forEach(X=>y.push([X.label,X.leads,bt(X.convRate),X.deals,X.won,X.revenue])),ce("Forecast por etapa (pipeline actual)"),y.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),b.stg.forEach(X=>y.push([X.label,bt(X.prob),X.count,X.value,X.weighted])),ce("Rendimiento del equipo"),y.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),b.own.forEach(X=>y.push([X.ownerName,X.leads,X.deals,X.won,bt(X.winRate),X.pipelineWeighted]));const fe=(e.find(X=>X.key===t.month)||{}).label||t.month;ce("Comisiones del mes — "+fe+" (F42: solo checklist completo entra a liquidación)"),y.push(["Asesor","Vendidos","Liquidables","Base liquidable (COP)","Pendientes","Base pendiente (COP)"]),b.com.forEach(X=>y.push([X.ownerName,X.vendidos,X.liquidables,X.baseLiquidable,X.pendientes,X.basePendiente])),y.push([]),y.push(["Negocio","Asesor","Base (COP)","Pago","Estado"]),b.com.forEach(X=>X.deals.forEach(ve=>y.push([ve.name||ve.id,X.ownerName,ve.base,ve.tipoPago||"",ve.liquidable?"liquidable":"checklist pendiente"]))),oP(`altorra-reportes-${xi(new Date)}.csv`,iP(y)),W("Reporte exportado","ok")}async function E(){t.loading=!0,t.error=null,g();try{const b=await ZC();if(!r)return;t.leads=b.leads,t.deals=b.deals,t.wons=b.wons||[],t.capped=!!b.capped,t.loading=!1}catch(b){if(!r)return;t.loading=!1,t.error=b&&b.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}g()}return E(),function(){r=!1}}function sP(n){let e=n==null?"":String(n);return/^[=+\-@\t\r]/.test(e)&&!/^-?\d+([.,]\d+)?$/.test(e)&&(e="'"+e),/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function iP(n){return"\uFEFF"+n.map(e=>e.map(sP).join(",")).join(`\r
`)}function oP(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=n,document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}function Pv(n,e){const t=String(n||"").trim();if(!t)return"";const r=t.replace(/[^\d+]/g,"").startsWith("+");let s=t.replace(/\D/g,"");if(!s)return"";const i=String(e||"").replace(/\D/g,"");return i&&!r&&!s.startsWith(i)?s=i+s:!i&&!r&&s.length===10&&s.startsWith("3")&&(s="57"+s),"+"+s}function Sp(n){return String(n||"").replace(/[^a-z0-9]/gi,"_").slice(0,480)}function aP({email:n,phone:e,prefijoPais:t}){const r=[],s=String(n||"").trim().toLowerCase();s&&r.push(Sp("email:"+s));const i=Pv(e,t);return i&&r.push(Sp("phone:"+i)),r}const Sa=n=>({id:n.id,...n.data()});async function cP({pageSize:n=500}={}){if(H.get().mock)return{contacts:jR(),leads:Ta()};const[e,t]=await Promise.all([tn(ht(Ve(de,"contacts"),At("createdAt","desc"),vt(n))).then(r=>r.docs.map(Sa)),tn(ht(Ve(de,"leads"),At("createdAt","desc"),vt(n))).then(r=>r.docs.map(Sa))]);return{contacts:e.filter(r=>!r._mergedInto&&!r._suppressed),leads:t}}async function Ra(n){if(!n)return null;const e=await Ar(Oe(de,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function lP(n,e,t){const r=ht(Ve(de,"activities"),xn("relatedTo.id","==",n),At("createdAt","desc"),vt(50));return Ln(r,s=>e(s.docs.map(Sa)),s=>t&&t(s))}function uP(n,e,t){const r=ht(Ve(de,"contacts",n,"crmNotes"),At("createdAt","desc"),vt(50));return Ln(r,s=>e(s.docs.map(Sa)),s=>t&&t(s))}async function dP({email:n,phone:e},t){for(const r of aP({email:n,phone:e})){const s=await Ar(Oe(de,"dedup",r));if(s.exists()&&s.data().contactId!==t)return{key:r,contactId:s.data().contactId}}return null}async function hP(n,e,t){const r=Oe(de,"contacts",n),s=async i=>{const o={...e,updatedAt:new Date().toISOString(),_version:i+1};return e.phone!==void 0&&(o.phone=Pv(e.phone,"+57")||null),yt(r,o)};try{return await s(t._version||0),{ok:!0}}catch(i){if(!i||i.code!=="permission-denied")throw i;const o=await Ra(n);if(!o)throw i;if(Object.keys(e).some(l=>String(o[l]??"")!==String(t[l]??""))){const l=new Error("conflict");throw l.code="conflict",l.fresh=o,l}return await s(o._version||0),{ok:!0,retried:!0}}}async function fP(n,e){return(await Sr(Rr,"crmMergeContacts")({survivorId:n,mergedId:e})).data}async function pP(n){return(await Sr(Rr,"crmSuppressContact")({contactId:n})).data}async function mP(n){return(await Sr(Rr,"crmCancelSuppression")({contactId:n})).data}async function gP(n,e){const t=H.get().user;await On(Ve(de,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:H.get().profile&&H.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const _P=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],vP={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function Rp(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function yP(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=u("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,R()});const s=u("div",{class:"search"},[u("span",{"aria-hidden":"true",text:"🔎"}),r]),i={},o=u("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});_P.forEach(C=>{const N=u("button",{class:"chip",type:"button","aria-pressed":C.id===e.filter?"true":"false"},[C.label]);N.addEventListener("click",()=>{e.filter=C.id,Object.entries(i).forEach(([$,k])=>k.setAttribute("aria-pressed",$===C.id?"true":"false")),R()}),i[C.id]=N,o.append(N)});const c=u("span",{class:"contactos__count u-caption u-faint"}),l=u("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);l.addEventListener("click",L);const h=u("div",{class:"contactos__toolbar"},[s,o,u("div",{class:"u-row u-row--tight"},[c,l])]),p=u("div",{class:"contactos__list"}),m=u("section",{class:"contactos"},[h,p]);ye(n),n.append(m);function g(){const C={};for(const N of e.leads){if(!N.contactId)continue;const $=C[N.contactId];(!$||new Date(N.createdAt)>new Date($.createdAt))&&(C[N.contactId]=N)}return C}function T(C){H.set({leads:e.leads,detailLeadId:C.id})}function R(){if(e.loading)return A("⏳","Cargando contactos…","");if(e.error)return A("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return A("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const C=g(),N=Ea(e.q),$=e.contacts.filter(k=>e.filter!=="todos"&&Rp(k)!==e.filter?!1:N?Ea(`${k.fullName||""} ${k.email||""} ${k.phone||""}`).includes(N):!0);if(c.textContent=`${$.length} de ${e.contacts.length}`,ye(p),!$.length){p.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔍"}),u("div",{class:"state__title",text:"Sin resultados"}),u("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}$.forEach(k=>p.append(P(k,C[k.id])))}function P(C,N){const $=Rp(C),k=vP[$],U=Pi(C),I=Number(C.score)>0&&Xr[C.rating],v=u("div",{class:"contact-row__badges"},[u("span",{class:`badge badge--${k.badge}`,text:k.label}),u("span",{class:"badge",text:`${U.icon} ${U.label}`}),I?u("span",{class:`temp ${Xr[C.rating].cls}`,text:`${Xr[C.rating].icon} ${C.score}`}):null]),w=[C.email,C.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",E=Array.isArray(C.tags)&&C.tags.length?u("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+C.tags.join(", ")}):null,b=[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:gs(C.fullName)}),u("div",{class:"contact-row__main"},[u("span",{class:"contact-row__name u-truncate",text:C.fullName||"Sin nombre"}),u("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:w,text:w}),E]),v,u("span",{class:"contact-row__time u-caption u-faint",text:lr(C.lastActivityAt)})];if(N){const S=u("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${C.fullName||"contacto"}`},b);return S.addEventListener("click",()=>T(N)),S}return u("div",{class:"contact-row contact-row--nolead"},b)}function A(C,N,$){c.textContent="",ye(p),p.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:C}),u("div",{class:"state__title",text:N}),$?u("div",{class:"state__msg",text:$}):null]))}async function L(){e.loading=!0,e.error=null,R();try{const C=await cP();if(!t)return;e.contacts=C.contacts,e.leads=C.leads,e.loading=!1}catch(C){if(!t)return;e.loading=!1,e.error=C&&C.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}R()}return L(),function(){t=!1}}function bP(n,e,t){const r=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:n}),e?u("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=u("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{close:i}}function wP(n,{onChanged:e}={}){if(!n){W("El contacto aún no carga.","error");return}if(H.get().mock){W("En demo no se edita el directorio.","info");return}if(n._mergedInto){W("Este contacto está fusionado en otro.","info");return}const t=u("div",{class:"nl-form"}),r=u("div",{class:"login__error",role:"alert",hidden:!0}),s=P=>{r.textContent=P,r.hidden=!1},{close:i}=bP("✏️ Editar contacto",n.fullName||"",[t]),o=n.suppressionStatus==="pendiente_supresion",c=u("input",{class:"input",type:"text",value:n.fullName||"",maxlength:"80"}),l=u("input",{class:"input",type:"email",value:n.email||"",placeholder:"correo@ejemplo.com"}),h=u("input",{class:"input",type:"tel",value:n.phone||"",placeholder:"+57 300 000 0000"}),p=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar cambios"}),m=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});m.addEventListener("click",i);async function g(P){r.hidden=!0;const A={};if(c.value.trim()!==(n.fullName||"")&&(A.fullName=c.value.trim()),l.value.trim().toLowerCase()!==(n.email||"")&&(A.email=l.value.trim().toLowerCase()||null),h.value.trim()!==(n.phone||"")&&(A.phone=h.value.trim()||null),!Object.keys(A).length){i();return}p.disabled=!0,p.textContent="Guardando…";try{if(A.email!==void 0||A.phone!==void 0){const L=await dP({email:A.email!==void 0?A.email:n.email,phone:A.phone!==void 0?A.phone:n.phone},n.id);if(L)return p.disabled=!1,p.textContent="Guardar cambios",T(L)}await hP(n.id,A,P||n),W("✓ Contacto actualizado","ok"),i(),e&&e()}catch(L){if(p.disabled=!1,p.textContent="Guardar cambios",L&&L.code==="conflict"&&L.fresh){s("Alguien actualizó este contacto mientras editabas. Valores actuales: "+(L.fresh.fullName||"—")+" · "+(L.fresh.email||"sin email")+" · "+(L.fresh.phone||"sin tel")+'. Pulsa "Guardar" de nuevo para PISAR con lo tuyo, o Cancelar para conservar lo del server.'),p.disabled=!1,p.onclick=()=>g(L.fresh);return}s(L&&L.message||"No se pudo guardar.")}}p.addEventListener("click",()=>g(null));async function T(P){const A=await Ra(P.contactId).catch(()=>null),L=A&&A.fullName||P.contactId;if(!Pt("*")){s("Ese email/teléfono YA pertenece a otro contacto ("+L+"). Pídele al Super Admin fusionarlos — no se crean duplicados.");return}t.replaceChildren(u("p",{},["Ese dato ya pertenece a ",u("strong",{text:L}),". Son la misma persona → fusiónalos. Elige quién SOBREVIVE (el otro queda como histórico apuntando aquí):"]),r);const C=(N,$,k)=>{const U=u("button",{class:"btn btn--soft btn--sm",type:"button",text:N});return U.addEventListener("click",async()=>{if(confirm("¿Fusionar definitivamente? Re-apunta leads, negocios y notas. No se puede deshacer.")){U.disabled=!0;try{const I=await fP($,k);W(`🔗 Fusionados: ${I.counts?I.counts.leads:0} lead(s), ${I.counts?I.counts.deals:0} negocio(s)`,"ok"),i(),e&&e()}catch(I){U.disabled=!1,s(I&&I.message||"No se pudo fusionar.")}}}),U};t.append(u("div",{class:"cita-actions"},[C("Sobrevive ESTE ("+(n.fullName||"actual")+")",n.id,P.contactId),C("Sobrevive el OTRO ("+L+")",P.contactId,n.id),u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar",onclick:i})]))}function R(){if(!Pt("crm.delete"))return null;const P=u("div",{class:"cfg-card",style:{borderColor:"var(--danger, #e5484d)"}});if(P.append(u("h3",{class:"cfg-card__title",text:"🛡 Privacidad (Ley 1581)"})),o){P.append(u("p",{class:"u-caption",text:"⏳ Supresión programada: se ejecuta el "+String(n.suppressionExecuteAfter||"").slice(0,16).replace("T"," ")+". Hasta entonces es reversible."}));const A=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"↩️ Cancelar supresión"});A.addEventListener("click",async()=>{A.disabled=!0;try{const L=await mP(n.id);W(L.duplicates&&L.duplicates.length?"↩️ Supresión cancelada — OJO: nació un duplicado durante la espera, fusiónalos.":"↩️ Supresión cancelada","ok"),i(),e&&e()}catch(L){A.disabled=!1,s(L&&L.message||"No se pudo cancelar.")}}),P.append(A)}else{P.append(u("p",{class:"u-caption u-muted",text:"Derecho de supresión: borra los datos personales (nombre, contacto, notas) de forma DEFINITIVA tras 72h de gracia. El historial comercial (montos, fechas, carro) se conserva anónimo. Las copias ya enviadas por Telegram/email quedan fuera del alcance técnico."}));const A=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🗑 Solicitar supresión definitiva…"});A.addEventListener("click",async()=>{const L=prompt("DOBLE CONFIRMACIÓN: escribe SUPRIMIR para programar el borrado de datos personales de "+(n.fullName||"este contacto")+" (72h de gracia, reversible hasta entonces).");if(L!=="SUPRIMIR"){L!==null&&W("Texto incorrecto — no se hizo nada.","info");return}A.disabled=!0;try{const C=await pP(n.id);W("🛡 Supresión programada para "+String(C.executeAfter||"").slice(0,16).replace("T"," "),"ok"),i(),e&&e()}catch(C){A.disabled=!1,s(C&&C.message||"No se pudo programar.")}}),P.append(A)}return P}o?t.append(u("p",{class:"cita-conflict",text:"⏳ Este contacto tiene una supresión Ley 1581 programada — no se puede editar (cancélala primero si fue un error)."}),r,R(),u("div",{class:"nl-actions"},[m])):t.append(u("label",{class:"field"},[u("span",{class:"field__label",text:"Nombre"}),c]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Email"}),l]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Teléfono"}),h]),r,u("div",{class:"nl-actions"},[m,p]),R())}const IP={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function EP(n){let e=null,t=null,r=null,s="resumen",i={lead:null,contact:null,activities:[],notes:[]};const o=u("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=u("div",{class:"detail-overlay",hidden:!0},[o]);n.append(c),c.addEventListener("mousedown",k=>{k.target===c&&l()}),window.addEventListener("keydown",k=>{k.key==="Escape"&&e&&l()}),H.subscribe(k=>{k.detailLeadId!==e&&p(k.detailLeadId)});function l(){H.set({detailLeadId:null})}function h(){t&&(t(),t=null),r&&(r(),r=null)}function p(k){if(h(),e=k,!k){c.hidden=!0,document.body.classList.remove("has-detail"),ye(o);return}s="resumen",c.hidden=!1,document.body.classList.add("has-detail"),m(k)}function m(k){const U=(H.get().leads||[]).find(I=>I.id===k);if(i={lead:U||null,contact:null,activities:[],notes:[],loadError:null},g(),!!U)if(H.get().mock)i.contact=qR(U.contactId),i.activities=$R(k),i.notes=_p(U.contactId),g();else{const I=v=>{i.loadError=v&&v.code==="permission-denied"?"Sin permiso de CRM (crm.read) para ver la ficha completa.":"No se pudo cargar parte de la ficha — revisa tu conexión.",g()};Ra(U.contactId).then(v=>{i.contact=v,g()}).catch(I),t=lP(k,v=>{i.activities=v,g()},I),U.contactId&&(r=uP(U.contactId,v=>{i.notes=v,g()},I))}}function g(){ye(o);const k=i.lead;if(!k){o.append(T(null)),o.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔍"}),u("div",{class:"state__title",text:"Lead no disponible"}),u("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}o.append(T(k)),o.append(R());const U=u("div",{class:"detail__body"});i.loadError&&U.append(u("div",{class:"u-caption",role:"alert",style:{padding:"8px 12px",borderRadius:"8px",margin:"0 0 10px",background:"rgba(229,115,26,0.12)",border:"1px solid rgba(229,115,26,0.45)"},text:"⚠️ "+i.loadError})),s==="resumen"?U.append(P(k)):s==="comms"?U.append(L()):s==="score"?U.append(C(k)):s==="notas"&&U.append(N(k)),o.append(U)}function T(k){const U=u("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(U.addEventListener("click",l),!k)return u("div",{class:"detail__header"},[u("div",{class:"u-grow"}),U]);const I=$(k),v=Xr[I.rating],w=jo(k.status),E=ac(k),b=Pi(k),S=u("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);S.addEventListener("click",()=>{const ve=tv(k.phone,`Hola ${String(k.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!ve)return W("Sin teléfono","error");window.open(ve,"_blank","noopener")});const y=Pt("crm.edit"),ce=y&&k.status!=="convertido"?u("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;ce&&ce.addEventListener("click",()=>_v(k,{}));const fe=y?u("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;fe&&fe.addEventListener("click",()=>UC(k,{}));const X=y?u("button",{class:"icon-btn",type:"button","aria-label":"Editar contacto",title:"Editar contacto"},["✏️"]):null;return X&&X.addEventListener("click",()=>wP(i.contact,{onChanged:()=>{k.contactId&&Ra(k.contactId).then(ve=>{i.contact=ve,g()}).catch(()=>W("No se pudo recargar el contacto","error"))}})),u("div",{class:"detail__header"},[u("div",{class:"u-row u-grow",style:{minWidth:"0"}},[u("span",{class:"avatar","aria-hidden":"true",text:gs(k.fullName)}),u("div",{class:"u-grow",style:{minWidth:"0"}},[u("h2",{class:"detail__name u-truncate",text:k.fullName}),u("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[u("span",{class:`temp ${v.cls}`,text:`${v.icon} ${v.label} · ${I.score}`}),u("span",{class:`badge badge--${w.badge||""}`.trim(),text:w.label}),u("span",{class:"badge",text:`${E.icon} ${E.label}`}),u("span",{class:"badge",text:`${b.icon} ${b.label}`})])])]),u("div",{class:"u-row u-row--tight"},[ce,fe,X,S,U])])}function R(){const k=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],U=u("div",{class:"detail__tabs",role:"tablist"});return k.forEach(([I,v])=>{const w=u("button",{class:"detail__tab"+(s===I?" is-active":""),role:"tab","aria-selected":String(s===I),type:"button"},[v]);w.addEventListener("click",()=>{s=I,g()}),U.append(w)}),U}function P(k){const U=i.contact,I=U&&U.consent?U.consent:null,v=[["Correo",k.email||"—"],["Teléfono",k.phone||"—"],["Interés",k.sourceDetail||"—"],["Vehículo",k.vehicleOfInterestId||"—"],["Asesor",k.ownerName||"Sin asignar"],["Origen",k.source||"—"],["Capturado",eR(k.createdAt)],["Última actividad",lr(k.lastActivityAt)]],w=ov(k,{score:$(k).score});return u("div",{class:"u-stack"},[u("div",{class:"detail-card detail-card--nba"},[u("span",{class:"detail-card__icon","aria-hidden":"true",text:w.icon}),u("div",{class:"u-grow"},[u("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),u("strong",{text:w.label}),u("div",{class:"u-caption u-faint",text:w.reason})])]),u("dl",{class:"kv"},v.flatMap(([E,b])=>[u("dt",{text:E}),u("dd",{class:"u-truncate",text:b})])),I?A(I):null])}function A(k){const U=I=>I?"✅":"⛔";return u("div",{class:"detail-card"},[u("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),u("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[u("span",{class:"u-caption",text:`${U(k.email)} Email`}),u("span",{class:"u-caption",text:`${U(k.whatsapp)} WhatsApp`}),u("span",{class:"u-caption",text:`${U(k.calls)} Llamadas`})]),u("div",{class:"u-caption u-faint",text:`Política ${k.policyVersion||"v1"} · origen ${k.source||"—"}`})])}function L(){if(!i.activities.length)return u("div",{class:"state"},[u("div",{class:"state__icon",text:"📭"}),u("div",{class:"state__title",text:"Sin comunicaciones"}),u("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const k=u("ol",{class:"timeline"});return i.activities.forEach(U=>{k.append(u("li",{class:"timeline__item timeline__item--"+(U.direction||"inbound")},[u("span",{class:"timeline__icon","aria-hidden":"true",text:IP[U.type]||"•"}),u("div",{class:"u-grow"},[u("div",{class:"u-spread"},[u("strong",{class:"u-truncate",text:U.subject||U.type||"Actividad"}),u("span",{class:"u-caption u-faint",text:lr(U.createdAt)})]),U.body?u("div",{class:"u-caption u-muted",text:U.body}):null])]))}),k}function C(k){const U=$(k),I=Xr[U.rating],v=Object.keys(mp).map(w=>{const E=Math.round((U.factors[w]||0)*100);return u("div",{class:"factor"},[u("div",{class:"u-spread u-caption"},[u("span",{text:mp[w]}),u("span",{class:"u-faint",text:`${E}% · peso ${Math.round(wR[w]*100)}%`})]),u("div",{class:"factor__track"},[u("div",{class:"factor__fill",style:{width:E+"%"}})])])});return u("div",{class:"u-stack"},[u("div",{class:"scorehero"},[u("div",{class:`scorehero__num ${I.cls}`,text:String(U.score)}),u("div",{class:"u-stack",style:{gap:"2px"}},[u("strong",{text:`${I.icon} ${I.label}`}),u("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),u("div",{class:"u-stack",style:{gap:"10px"}},v)])}function N(k){const U=Pt("crm.edit")||Pt("crm.create"),I=u("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),v=u("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);v.addEventListener("click",async()=>{const E=I.value.trim();if(!E)return;v.disabled=!0;const b={body:E,authorName:"Tú",createdAt:new Date().toISOString()};try{H.get().mock?(zR(k.contactId,b),i.notes=_p(k.contactId),g()):(await gP(k.contactId,E),I.value=""),W("Nota agregada","ok")}catch{W("No se pudo guardar la nota","error")}finally{v.disabled=!1}});const w=u("div",{class:"u-stack"});return i.notes.length||w.append(u("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),i.notes.forEach(E=>w.append(u("div",{class:"detail-card"},[u("div",{class:"u-caption u-muted",text:E.body}),u("div",{class:"u-caption u-faint",text:`${E.authorName||"Asesor"} · ${lr(E.createdAt)}`})]))),u("div",{class:"u-stack"},[U?u("div",{class:"u-stack",style:{gap:"8px"}},[I,u("div",{class:"u-row",style:{justifyContent:"flex-end"}},[v])]):null,w])}function $(k){return iv(k,i.activities||[],i.contact)}}const kv={days:[1,2,3,4,5,6],startHour:9,endHour:17,interval:60,maxPerSlot:1,bufferMin:15,blockedDates:[],blockedDateLabels:{},blockedHours:{}},TP=[["2026-01-01","Año Nuevo"],["2026-01-12","Reyes Magos"],["2026-03-23","San José"],["2026-04-02","Jueves Santo"],["2026-04-03","Viernes Santo"],["2026-05-01","Día del Trabajo"],["2026-05-18","Ascensión"],["2026-06-08","Corpus Christi"],["2026-06-15","Sagrado Corazón"],["2026-06-29","San Pedro y San Pablo"],["2026-07-20","Independencia"],["2026-08-07","Batalla de Boyacá"],["2026-08-17","Asunción de la Virgen"],["2026-10-12","Día de la Raza"],["2026-11-02","Todos los Santos"],["2026-11-16","Independencia de Cartagena"],["2026-12-08","Inmaculada Concepción"],["2026-12-25","Navidad"]],xv=()=>Oe(de,"config","availability"),Nv=()=>Oe(de,"crm_config","advisorOverrides");function AP(n,e){return Ln(xv(),t=>{n({...kv,...t.exists()?t.data():{}})},t=>e&&e(t))}async function SP(n,e){await O_(xv(),{...n,updatedAt:new Date().toISOString(),updatedBy:e||null},{merge:!0})}function RP(n,e){return Ln(Nv(),t=>{n(t.exists()&&t.data().overrides||{})},t=>e&&e(t))}async function CP(n,e){await O_(Nv(),{overrides:n,updatedAt:new Date().toISOString(),updatedBy:e||null})}const PP=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],So=()=>{const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function kP(n){const e={av:{...kv},overrides:{},advisors:[],sub:null,subOv:null,loaded:!1},t=Pt("calendar.config"),r=u("section",{class:"cfg"});if(ye(n),n.append(r),!t){r.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔒"}),u("div",{class:"state__title",text:"Sin permiso"}),u("div",{class:"state__msg",text:"Solo quien administra la disponibilidad (permiso calendar.config) puede editar esto."})]));return}async function s(g,T){if(H.get().mock){Object.assign(e.av,g),m(),W(T+" (demo)","ok");return}try{await SP(g,H.get().user&&H.get().user.uid),W(T,"ok")}catch(R){W("No se pudo guardar: "+(R.message||R.code),"error")}}function i(){const g=e.av,T=PP.map((k,U)=>{const I=u("input",{type:"checkbox"});return I.checked=(g.days||[]).includes(U),I.dataset.dow=String(U),u("label",{class:"cfg-day"},[I,u("span",{text:k})])}),R=(k,U,I)=>{const v=u("select",{class:"select"});for(let w=U;w<=I;w++)v.append(u("option",{value:String(w),text:String(w).padStart(2,"0")+":00"}));return v.value=String(k),v},P=R(g.startHour,6,20),A=R(g.endHour,7,21),L=u("select",{class:"select"},[u("option",{value:"30",text:"Cada 30 min"}),u("option",{value:"60",text:"Cada hora"})]);L.value=String(g.interval||60);const C=u("input",{class:"input",type:"number",min:"1",max:"5",value:String(g.maxPerSlot||1)}),N=u("input",{class:"input",type:"number",min:"0",max:"60",step:"5",value:String(g.bufferMin!=null?g.bufferMin:15)}),$=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar horario"});return $.addEventListener("click",()=>{const k=T.map(v=>v.querySelector("input")).filter(v=>v.checked).map(v=>parseInt(v.dataset.dow,10)).sort(),U=parseInt(P.value,10),I=parseInt(A.value,10);if(!k.length){W("Elige al menos un día.","error");return}if(U>=I){W("La hora de cierre debe ser mayor que la de apertura.","error");return}s({days:k,startHour:U,endHour:I,interval:parseInt(L.value,10)||60,maxPerSlot:Math.max(1,parseInt(C.value,10)||1),bufferMin:Math.max(0,parseInt(N.value,10)||0)},"✓ Horario guardado")}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"🕘 Horario de atención"}),u("p",{class:"u-caption u-muted",text:"Esto es lo que el cliente ve en la web al pedir cita — los cambios aplican al instante."}),u("div",{class:"cfg-days"},T),u("div",{class:"cfg-grid"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Abre"}),P]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Cierra"}),A]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Citas web"}),L]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Citas por horario"}),C]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Colchón (min)"}),N])]),$])}function o(){const g=e.av,T=g.blockedDateLabels||{},R=So(),P=u("div",{class:"cfg-chips"}),A=(g.blockedDates||[]).slice().sort();A.length||P.append(u("span",{class:"u-caption u-muted",text:"Sin fechas bloqueadas — la web ofrece todos los días laborales."})),A.forEach(k=>{const U=k<R,I=u("button",{class:"cfg-chip__x",type:"button","aria-label":"Quitar",text:"✕"});I.addEventListener("click",()=>{const v=A.filter(w=>w!==k);s({blockedDates:v,blockedDateLabels:{[k]:sp()}},"✓ Fecha desbloqueada: "+k)}),P.append(u("span",{class:"cfg-chip"+(U?" is-past":"")},[u("span",{text:k+(T[k]?" · "+T[k]:"")}),I]))});const L=u("input",{class:"input",type:"date",min:R}),C=u("input",{class:"input",type:"text",placeholder:"Motivo (opcional)",maxlength:"40"}),N=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear fecha"});N.addEventListener("click",()=>{const k=L.value;if(!k){W("Elige una fecha.","error");return}if(A.includes(k)){W("Esa fecha ya está bloqueada.","error");return}const U={...T};C.value.trim()&&(U[k]=C.value.trim()),s({blockedDates:[...A,k].sort(),blockedDateLabels:U},"✓ Fecha bloqueada: "+k)});const $=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🇨🇴 Cargar festivos de Colombia 2026"});return $.addEventListener("click",()=>{const k=TP.filter(([I])=>I>=R&&!A.includes(I));if(!k.length){W("Los festivos que faltan de 2026 ya están cargados.","ok");return}const U={...T};k.forEach(([I,v])=>{U[I]=v}),s({blockedDates:[...A,...k.map(([I])=>I)].sort(),blockedDateLabels:U},`✓ ${k.length} festivo(s) bloqueados`)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"📅 Fechas bloqueadas (festivos y cierres)"}),u("p",{class:"u-caption u-muted",text:"En estas fechas la web NO ofrece citas. Las fechas pasadas se limpian solas cada madrugada."}),P,u("div",{class:"cfg-row"},[L,C,N]),$])}function c(){const g=e.av,T=[],R=g.interval||60;for(let P=g.startHour*60;P<g.endHour*60;P+=R)T.push(String(Math.floor(P/60)).padStart(2,"0")+":"+String(P%60).padStart(2,"0"));return T}function l(){const T=e.av.blockedHours||{},R=u("div",{class:"cfg-bh"}),P=Object.entries(T).sort(([N],[$])=>N.localeCompare($));P.length||R.append(u("span",{class:"u-caption u-muted",text:"Sin horas bloqueadas."})),P.forEach(([N,$])=>{const k=($||[]).slice().sort().map(U=>{const I=u("button",{class:"cfg-chip__x",type:"button",text:"✕"});return I.addEventListener("click",()=>{const v=(T[N]||[]).filter(w=>w!==U);s({blockedHours:{[N]:v.length?v:sp()}},`✓ ${N} ${U} desbloqueada`)}),u("span",{class:"cfg-chip"},[u("span",{text:U}),I])});R.append(u("div",{class:"cfg-bh__day"},[u("strong",{text:N}),u("div",{class:"cfg-chips"},k)]))});const A=u("input",{class:"input",type:"date",min:So()}),L=u("select",{class:"select"},c().map(N=>u("option",{value:N,text:N}))),C=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear hora"});return C.addEventListener("click",()=>{const N=A.value,$=L.value;if(!N){W("Elige una fecha.","error");return}const k=T[N]||[];if(k.includes($)){W("Esa hora ya está bloqueada.","error");return}s({blockedHours:{...T,[N]:[...k,$].sort()}},`✓ ${N} ${$} bloqueada`)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"⏰ Horas bloqueadas (un horario puntual)"}),R,u("div",{class:"cfg-row"},[A,L,C])])}async function h(g,T){if(H.get().mock){e.overrides=g,m(),W(T+" (demo)","ok");return}try{await CP(g,H.get().user&&H.get().user.uid),W(T,"ok")}catch(R){W("No se pudo guardar: "+(R.message||R.code),"error")}}function p(){const g=e.overrides||{},T=u("div",{class:"cfg-advisors"});return e.advisors.length||T.append(u("span",{class:"u-caption u-muted",text:"Cargando asesores…"})),e.advisors.forEach(R=>{const P=g[R.uid],A=u("div",{class:"cfg-advisor"});if(A.append(u("div",{class:"cfg-advisor__name"},[u("strong",{text:R.nombre}),P?u("span",{class:"cfg-advisor__badge is-off",text:`🏖 ${P.reason||"ausente"} · ${P.from} → ${P.to}`}):u("span",{class:"cfg-advisor__badge",text:"✅ disponible"})])),P){const L=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Quitar ausencia"});L.addEventListener("click",()=>{const C={...g};delete C[R.uid],h(C,`✓ ${R.nombre} disponible de nuevo`)}),A.append(L)}else{const L=u("input",{class:"input",type:"date",min:So()}),C=u("input",{class:"input",type:"date",min:So()}),N=u("select",{class:"select"},[u("option",{value:"vacaciones",text:"Vacaciones"}),u("option",{value:"incapacidad",text:"Incapacidad"}),u("option",{value:"otro",text:"Otro"})]),$=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Marcar ausencia"});$.addEventListener("click",()=>{if(!L.value||!C.value||L.value>C.value){W("Revisa el rango de fechas.","error");return}h({...g,[R.uid]:{name:R.nombre,from:L.value,to:C.value,reason:N.value}},`✓ Ausencia de ${R.nombre} registrada`)}),A.append(u("div",{class:"cfg-row"},[L,C,N,$]))}T.append(A)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"👤 Excepciones por asesor"}),u("p",{class:"u-caption u-muted",text:"Un asesor ausente no recibe leads de la rotación ni citas confirmadas a su nombre en esas fechas."}),T])}function m(){ye(r),r.append(u("div",{class:"cfg-cols"},[i(),o()]),u("div",{class:"cfg-cols"},[l(),p()]))}return H.get().mock?(e.loaded=!0,m()):(e.sub=AP(g=>{e.av=g,e.loaded=!0,m()},()=>{W("No se pudo cargar la configuración.","error")}),e.subOv=RP(g=>{e.overrides=g,e.loaded&&m()},()=>{})),Iv().then(g=>{e.advisors=g,e.loaded&&m()}),function(){e.sub&&e.sub(),e.sub=null,e.subOv&&e.subOv(),e.subOv=null}}const Dv=document.getElementById("app");ly();const xP=new URLSearchParams(location.search).get("mock")==="1",NP={bandeja:vv,pipeline:IC,agenda:BC,reportes:rP,contactos:yP,config:kP};let Ro=null,Zr=null,ir=null,Fl=null,Ho=null;function Cp(n){if(!Zr||n===Fl)return;ir&&(ir(),ir=null),H.get().detailLeadId&&H.set({detailLeadId:null}),ir=(NP[n]||vv)(Zr.outlet)||null,Zr.setActive(n),Fl=n}function DP(){Zr=rR(Dv),EP(Zr.detailRoot),Cp(X_()),Ho=JS(Cp)}function VP(){ir&&(ir(),ir=null),Ho&&(Ho(),Ho=null),Zr=null,Fl=null}function OP(n){n.ready&&(n.user&&Ro!=="app"?(Ro="app",DP()):!n.user&&Ro!=="login"&&(VP(),Ro="login",n.detailLeadId&&H.set({detailLeadId:null}),sR(Dv)))}H.subscribe(OP);xP?H.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):zS();
