(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function _y(n){let e={...n};const t=new Set;function r(){return e}function i(o){const c=typeof o=="function"?o(e):o;c&&(e={...e,...c},t.forEach(l=>l(e)))}function s(o){return t.add(o),()=>t.delete(o)}return{get:r,set:i,subscribe:s}}const G=_y({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),Zf="altorra-crm-theme";function yy(){let n=localStorage.getItem(Zf);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,G.set({theme:n})}function vy(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(Zf,n),G.set({theme:n}),n}var Fd={};/**
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
 */const ep=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Iy=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},yl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,c=o?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,p=s>>2,g=(s&3)<<4|c>>4;let T=(c&15)<<2|d>>6,A=d&63;l||(A=64,o||(T=64)),r.push(t[p],t[g],t[T],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ep(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Iy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const g=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||g==null)throw new wy;const T=s<<2|c>>4;if(r.push(T),d!==64){const A=c<<4&240|d>>2;if(r.push(A),g!==64){const k=d<<6&192|g;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class wy extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ey=function(n){const e=ep(n);return yl.encodeByteArray(e,!0)},tp=function(n){return Ey(n).replace(/\./g,"")},np=function(n){try{return yl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function rp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ty=()=>rp().__FIREBASE_DEFAULTS__,by=()=>{if(typeof process>"u"||typeof Fd>"u")return;const n=Fd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ay=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&np(n[1]);return e&&JSON.parse(e)},oa=()=>{try{return Ty()||by()||Ay()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ry=n=>{var e,t;return(t=(e=oa())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},ip=()=>{var n;return(n=oa())===null||n===void 0?void 0:n.config},sp=n=>{var e;return(e=oa())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Ki{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function De(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Sy(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(De())}function Py(){var n;const e=(n=oa())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Cy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ky(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Dy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function xy(){const n=De();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function op(){return!Py()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function aa(){try{return typeof indexedDB=="object"}catch{return!1}}function Ny(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
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
 */const Vy="FirebaseError";class Bt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Vy,Object.setPrototypeOf(this,Bt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ti.prototype.create)}}class ti{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Oy(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Bt(i,c,r)}}function Oy(n,e){return n.replace(Ly,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Ly=/\{\$([^}]+)}/g;function My(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Wi(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Ud(s)&&Ud(o)){if(!Wi(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Ud(n){return n!==null&&typeof n=="object"}/**
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
 */function gs(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ci(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function ki(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Fy(n,e){const t=new Uy(n,e);return t.subscribe.bind(t)}class Uy{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");By(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=dc),i.error===void 0&&(i.error=dc),i.complete===void 0&&(i.complete=dc);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function By(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function dc(){}/**
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
 */const $y=1e3,jy=2,qy=4*60*60*1e3,zy=.5;function Gy(n,e=$y,t=jy){const r=e*Math.pow(t,n),i=Math.round(zy*r*(Math.random()-.5)*2);return Math.min(qy,r+i)}/**
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
 */function be(n){return n&&n._delegate?n._delegate:n}class Vt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const xn="[DEFAULT]";/**
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
 */class Ky{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Ki;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Hy(e))try{this.getOrInitializeService({instanceIdentifier:xn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=xn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=xn){return this.instances.has(e)}getOptions(e=xn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Wy(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=xn){return this.component?this.component.multipleInstances?e:xn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Wy(n){return n===xn?void 0:n}function Hy(n){return n.instantiationMode==="EAGER"}/**
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
 */class Qy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ky(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ie;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ie||(ie={}));const Yy={debug:ie.DEBUG,verbose:ie.VERBOSE,info:ie.INFO,warn:ie.WARN,error:ie.ERROR,silent:ie.SILENT},Jy=ie.INFO,Xy={[ie.DEBUG]:"log",[ie.VERBOSE]:"log",[ie.INFO]:"info",[ie.WARN]:"warn",[ie.ERROR]:"error"},Zy=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Xy[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ca{constructor(e){this.name=e,this._logLevel=Jy,this._logHandler=Zy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ie))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Yy[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ie.DEBUG,...e),this._logHandler(this,ie.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ie.VERBOSE,...e),this._logHandler(this,ie.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ie.INFO,...e),this._logHandler(this,ie.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ie.WARN,...e),this._logHandler(this,ie.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ie.ERROR,...e),this._logHandler(this,ie.ERROR,...e)}}const ev=(n,e)=>e.some(t=>n instanceof t);let Bd,$d;function tv(){return Bd||(Bd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function nv(){return $d||($d=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ap=new WeakMap,kc=new WeakMap,cp=new WeakMap,hc=new WeakMap,vl=new WeakMap;function rv(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(on(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&ap.set(t,n)}).catch(()=>{}),vl.set(e,n),e}function iv(n){if(kc.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});kc.set(n,e)}let Dc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return kc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||cp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return on(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function sv(n){Dc=n(Dc)}function ov(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(fc(this),e,...t);return cp.set(r,e.sort?e.sort():[e]),on(r)}:nv().includes(n)?function(...e){return n.apply(fc(this),e),on(ap.get(this))}:function(...e){return on(n.apply(fc(this),e))}}function av(n){return typeof n=="function"?ov(n):(n instanceof IDBTransaction&&iv(n),ev(n,tv())?new Proxy(n,Dc):n)}function on(n){if(n instanceof IDBRequest)return rv(n);if(hc.has(n))return hc.get(n);const e=av(n);return e!==n&&(hc.set(n,e),vl.set(e,n)),e}const fc=n=>vl.get(n);function cv(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),c=on(o);return r&&o.addEventListener("upgradeneeded",l=>{r(on(o.result),l.oldVersion,l.newVersion,on(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const lv=["get","getKey","getAll","getAllKeys","count"],uv=["put","add","delete","clear"],pc=new Map;function jd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(pc.get(e))return pc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=uv.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||lv.includes(t)))return;const s=async function(o,...c){const l=this.transaction(o,i?"readwrite":"readonly");let d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return pc.set(e,s),s}sv(n=>({...n,get:(e,t,r)=>jd(e,t)||n.get(e,t,r),has:(e,t)=>!!jd(e,t)||n.has(e,t)}));/**
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
 */class dv{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(hv(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function hv(n){const e=n.getComponent();return e?.type==="VERSION"}const xc="@firebase/app",qd="0.11.0";/**
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
 */const Ot=new ca("@firebase/app"),fv="@firebase/app-compat",pv="@firebase/analytics-compat",mv="@firebase/analytics",gv="@firebase/app-check-compat",_v="@firebase/app-check",yv="@firebase/auth",vv="@firebase/auth-compat",Iv="@firebase/database",wv="@firebase/data-connect",Ev="@firebase/database-compat",Tv="@firebase/functions",bv="@firebase/functions-compat",Av="@firebase/installations",Rv="@firebase/installations-compat",Sv="@firebase/messaging",Pv="@firebase/messaging-compat",Cv="@firebase/performance",kv="@firebase/performance-compat",Dv="@firebase/remote-config",xv="@firebase/remote-config-compat",Nv="@firebase/storage",Vv="@firebase/storage-compat",Ov="@firebase/firestore",Lv="@firebase/vertexai",Mv="@firebase/firestore-compat",Fv="firebase",Uv="11.3.0";/**
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
 */const Nc="[DEFAULT]",Bv={[xc]:"fire-core",[fv]:"fire-core-compat",[mv]:"fire-analytics",[pv]:"fire-analytics-compat",[_v]:"fire-app-check",[gv]:"fire-app-check-compat",[yv]:"fire-auth",[vv]:"fire-auth-compat",[Iv]:"fire-rtdb",[wv]:"fire-data-connect",[Ev]:"fire-rtdb-compat",[Tv]:"fire-fn",[bv]:"fire-fn-compat",[Av]:"fire-iid",[Rv]:"fire-iid-compat",[Sv]:"fire-fcm",[Pv]:"fire-fcm-compat",[Cv]:"fire-perf",[kv]:"fire-perf-compat",[Dv]:"fire-rc",[xv]:"fire-rc-compat",[Nv]:"fire-gcs",[Vv]:"fire-gcs-compat",[Ov]:"fire-fst",[Mv]:"fire-fst-compat",[Lv]:"fire-vertex","fire-js":"fire-js",[Fv]:"fire-js-all"};/**
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
 */const Po=new Map,$v=new Map,Vc=new Map;function zd(n,e){try{n.container.addComponent(e)}catch(t){Ot.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function fn(n){const e=n.name;if(Vc.has(e))return Ot.debug(`There were multiple attempts to register component ${e}.`),!1;Vc.set(e,n);for(const t of Po.values())zd(t,n);for(const t of $v.values())zd(t,n);return!0}function _s(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ut(n){return n==null?!1:n.settings!==void 0}/**
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
 */const jv={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},an=new ti("app","Firebase",jv);/**
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
 */class qv{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Vt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw an.create("app-deleted",{appName:this._name})}}/**
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
 */const ni=Uv;function lp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Nc,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw an.create("bad-app-name",{appName:String(i)});if(t||(t=ip()),!t)throw an.create("no-options");const s=Po.get(i);if(s){if(Wi(t,s.options)&&Wi(r,s.config))return s;throw an.create("duplicate-app",{appName:i})}const o=new Qy(i);for(const l of Vc.values())o.addComponent(l);const c=new qv(t,r,o);return Po.set(i,c),c}function up(n=Nc){const e=Po.get(n);if(!e&&n===Nc&&ip())return lp();if(!e)throw an.create("no-app",{appName:n});return e}function Nt(n,e,t){var r;let i=(r=Bv[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ot.warn(c.join(" "));return}fn(new Vt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const zv="firebase-heartbeat-database",Gv=1,Hi="firebase-heartbeat-store";let mc=null;function dp(){return mc||(mc=cv(zv,Gv,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Hi)}catch(t){console.warn(t)}}}}).catch(n=>{throw an.create("idb-open",{originalErrorMessage:n.message})})),mc}async function Kv(n){try{const t=(await dp()).transaction(Hi),r=await t.objectStore(Hi).get(hp(n));return await t.done,r}catch(e){if(e instanceof Bt)Ot.warn(e.message);else{const t=an.create("idb-get",{originalErrorMessage:e?.message});Ot.warn(t.message)}}}async function Gd(n,e){try{const r=(await dp()).transaction(Hi,"readwrite");await r.objectStore(Hi).put(e,hp(n)),await r.done}catch(t){if(t instanceof Bt)Ot.warn(t.message);else{const r=an.create("idb-set",{originalErrorMessage:t?.message});Ot.warn(r.message)}}}function hp(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Wv=1024,Hv=30;class Qv{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Jv(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Kd();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>Hv){const o=Xv(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ot.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Kd(),{heartbeatsToSend:r,unsentEntries:i}=Yv(this._heartbeatsCache.heartbeats),s=tp(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Ot.warn(t),""}}}function Kd(){return new Date().toISOString().substring(0,10)}function Yv(n,e=Wv){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Wd(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Wd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Jv{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return aa()?Ny().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Kv(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Gd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Gd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Wd(n){return tp(JSON.stringify({version:2,heartbeats:n})).length}function Xv(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Zv(n){fn(new Vt("platform-logger",e=>new dv(e),"PRIVATE")),fn(new Vt("heartbeat",e=>new Qv(e),"PRIVATE")),Nt(xc,qd,n),Nt(xc,qd,"esm2017"),Nt("fire-js","")}Zv("");function Il(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function fp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const eI=fp,pp=new ti("auth","Firebase",fp());/**
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
 */const Co=new ca("@firebase/auth");function tI(n,...e){Co.logLevel<=ie.WARN&&Co.warn(`Auth (${ni}): ${n}`,...e)}function lo(n,...e){Co.logLevel<=ie.ERROR&&Co.error(`Auth (${ni}): ${n}`,...e)}/**
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
 */function dt(n,...e){throw wl(n,...e)}function _t(n,...e){return wl(n,...e)}function mp(n,e,t){const r=Object.assign(Object.assign({},eI()),{[e]:t});return new ti("auth","Firebase",r).create(e,{appName:n.name})}function cn(n){return mp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function wl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return pp.create(n,...e)}function Y(n,e,...t){if(!n)throw wl(e,...t)}function Ct(n){const e="INTERNAL ASSERTION FAILED: "+n;throw lo(e),new Error(e)}function Lt(n,e){n||Ct(e)}/**
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
 */function Oc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function nI(){return Hd()==="http:"||Hd()==="https:"}function Hd(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function rI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(nI()||ky()||"connection"in navigator)?navigator.onLine:!0}function iI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class ys{constructor(e,t){this.shortDelay=e,this.longDelay=t,Lt(t>e,"Short delay should be less than long delay!"),this.isMobile=Sy()||Dy()}get(){return rI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function El(n,e){Lt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class gp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ct("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ct("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ct("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const sI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const oI=new ys(3e4,6e4);function rr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function vn(n,e,t,r,i={}){return _p(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const c=gs(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:l},s);return Cy()||(d.referrerPolicy="no-referrer"),gp.fetch()(yp(n,n.config.apiHost,t,c),d)})}async function _p(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},sI),e);try{const i=new cI(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Qs(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Qs(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Qs(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Qs(n,"user-disabled",o);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw mp(n,p,d);dt(n,p)}}catch(i){if(i instanceof Bt)throw i;dt(n,"network-request-failed",{message:String(i)})}}async function la(n,e,t,r,i={}){const s=await vn(n,e,t,r,i);return"mfaPendingCredential"in s&&dt(n,"multi-factor-auth-required",{_serverResponse:s}),s}function yp(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?El(n.config,i):`${n.config.apiScheme}://${i}`}function aI(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class cI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(_t(this.auth,"network-request-failed")),oI.get())})}}function Qs(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=_t(n,e,r);return i.customData._tokenResponse=t,i}function Qd(n){return n!==void 0&&n.enterprise!==void 0}class lI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return aI(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function uI(n,e){return vn(n,"GET","/v2/recaptchaConfig",rr(n,e))}/**
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
 */async function dI(n,e){return vn(n,"POST","/v1/accounts:delete",e)}async function vp(n,e){return vn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Mi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function hI(n,e=!1){const t=be(n),r=await t.getIdToken(e),i=Tl(r);Y(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Mi(gc(i.auth_time)),issuedAtTime:Mi(gc(i.iat)),expirationTime:Mi(gc(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function gc(n){return Number(n)*1e3}function Tl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return lo("JWT malformed, contained fewer than 3 sections"),null;try{const i=np(t);return i?JSON.parse(i):(lo("Failed to decode base64 JWT payload"),null)}catch(i){return lo("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Yd(n){const e=Tl(n);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Qi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Bt&&fI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function fI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class pI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Lc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Mi(this.lastLoginAt),this.creationTime=Mi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ko(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Qi(n,vp(t,{idToken:r}));Y(i?.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Ip(s.providerUserInfo):[],c=gI(n.providerData,o),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!c?.length,p=l?d:!1,g={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new Lc(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(n,g)}async function mI(n){const e=be(n);await ko(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function gI(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Ip(n){return n.map(e=>{var{providerId:t}=e,r=Il(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function _I(n,e){const t=await _p(n,{},async()=>{const r=gs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=yp(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",gp.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function yI(n,e){return vn(n,"POST","/v2/accounts:revokeToken",rr(n,e))}/**
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
 */class Pr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Yd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const t=Yd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await _I(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new Pr;return r&&(Y(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Y(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Y(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Pr,this.toJSON())}_performRefresh(){return Ct("not implemented")}}/**
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
 */function Wt(n,e){Y(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class kt{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Il(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new pI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Lc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Qi(this,this.stsTokenManager.getToken(this.auth,e));return Y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return hI(this,e)}reload(){return mI(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new kt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ko(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ut(this.auth.app))return Promise.reject(cn(this.auth));const e=await this.getIdToken();return await Qi(this,dI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,c,l,d,p;const g=(r=t.displayName)!==null&&r!==void 0?r:void 0,T=(i=t.email)!==null&&i!==void 0?i:void 0,A=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,k=(o=t.photoURL)!==null&&o!==void 0?o:void 0,x=(c=t.tenantId)!==null&&c!==void 0?c:void 0,P=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,q=(d=t.createdAt)!==null&&d!==void 0?d:void 0,V=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:L,emailVerified:$,isAnonymous:N,providerData:F,stsTokenManager:v}=t;Y(L&&v,e,"internal-error");const y=Pr.fromJSON(this.name,v);Y(typeof L=="string",e,"internal-error"),Wt(g,e.name),Wt(T,e.name),Y(typeof $=="boolean",e,"internal-error"),Y(typeof N=="boolean",e,"internal-error"),Wt(A,e.name),Wt(k,e.name),Wt(x,e.name),Wt(P,e.name),Wt(q,e.name),Wt(V,e.name);const m=new kt({uid:L,auth:e,email:T,emailVerified:$,displayName:g,isAnonymous:N,photoURL:k,phoneNumber:A,tenantId:x,stsTokenManager:y,createdAt:q,lastLoginAt:V});return F&&Array.isArray(F)&&(m.providerData=F.map(I=>Object.assign({},I))),P&&(m._redirectEventId=P),m}static async _fromIdTokenResponse(e,t,r=!1){const i=new Pr;i.updateFromServerResponse(t);const s=new kt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await ko(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];Y(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Ip(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,c=new Pr;c.updateFromIdToken(r);const l=new kt({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Lc(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(l,d),l}}/**
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
 */const Jd=new Map;function Dt(n){Lt(n instanceof Function,"Expected a class definition");let e=Jd.get(n);return e?(Lt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Jd.set(n,e),e)}/**
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
 */class wp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}wp.type="NONE";const Xd=wp;/**
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
 */function uo(n,e,t){return`firebase:${n}:${e}:${t}`}class Cr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=uo(this.userKey,i.apiKey,s),this.fullPersistenceKey=uo("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?kt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Cr(Dt(Xd),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||Dt(Xd);const o=uo(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const p=await d._get(o);if(p){const g=kt._fromJSON(e,p);d!==s&&(c=g),s=d;break}}catch{}const l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Cr(s,e,r):(s=l[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(o)}catch{}})),new Cr(s,e,r))}}/**
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
 */function Zd(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ap(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ep(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Sp(e))return"Blackberry";if(Pp(e))return"Webos";if(Tp(e))return"Safari";if((e.includes("chrome/")||bp(e))&&!e.includes("edge/"))return"Chrome";if(Rp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Ep(n=De()){return/firefox\//i.test(n)}function Tp(n=De()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function bp(n=De()){return/crios\//i.test(n)}function Ap(n=De()){return/iemobile/i.test(n)}function Rp(n=De()){return/android/i.test(n)}function Sp(n=De()){return/blackberry/i.test(n)}function Pp(n=De()){return/webos/i.test(n)}function bl(n=De()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function vI(n=De()){var e;return bl(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function II(){return xy()&&document.documentMode===10}function Cp(n=De()){return bl(n)||Rp(n)||Pp(n)||Sp(n)||/windows phone/i.test(n)||Ap(n)}/**
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
 */function kp(n,e=[]){let t;switch(n){case"Browser":t=Zd(De());break;case"Worker":t=`${Zd(De())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ni}/${r}`}/**
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
 */class wI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,c)=>{try{const l=e(s);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function EI(n,e={}){return vn(n,"GET","/v2/passwordPolicy",rr(n,e))}/**
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
 */const TI=6;class bI{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:TI,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class AI{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new eh(this),this.idTokenSubscription=new eh(this),this.beforeStateQueue=new wI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=pp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Dt(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Cr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await vp(this,{idToken:e}),r=await kt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ut(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&l?.user&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ko(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=iI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ut(this.app))return Promise.reject(cn(this));const t=e?be(e):null;return t&&Y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ut(this.app)?Promise.reject(cn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ut(this.app)?Promise.reject(cn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Dt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await EI(this),t=new bI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ti("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await yI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Dt(e)||this._popupRedirectResolver;Y(t,this,"argument-error"),this.redirectPersistenceManager=await Cr.create(this,[Dt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=kp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(ut(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&tI(`Error while retrieving App Check token: ${t.error}`),t?.token}}function ri(n){return be(n)}class eh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Fy(t=>this.observer=t)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ua={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function RI(n){ua=n}function Dp(n){return ua.loadJS(n)}function SI(){return ua.recaptchaEnterpriseScript}function PI(){return ua.gapiScript}function CI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class kI{constructor(){this.enterprise=new DI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class DI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const xI="recaptcha-enterprise",xp="NO_RECAPTCHA";class NI{constructor(e){this.type=xI,this.auth=ri(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{uI(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new lI(l);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,o(d.siteKey)}}).catch(l=>{c(l)})})}function i(s,o,c){const l=window.grecaptcha;Qd(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(d=>{o(d)}).catch(()=>{o(xp)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new kI().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(c=>{if(!t&&Qd(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=SI();l.length!==0&&(l+=c),Dp(l).then(()=>{i(c,s,o)}).catch(d=>{o(d)})}}).catch(c=>{o(c)})})}}async function th(n,e,t,r=!1,i=!1){const s=new NI(n);let o;if(i)o=xp;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function nh(n,e,t,r,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await th(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await th(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
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
 */function VI(n,e){const t=_s(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Wi(s,e??{}))return i;dt(i,"already-initialized")}return t.initialize({options:e})}function OI(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Dt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function LI(n,e,t){const r=ri(n);Y(r._canInitEmulator,r,"emulator-config-failed"),Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Np(e),{host:o,port:c}=MI(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),FI()}function Np(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function MI(n){const e=Np(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:rh(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:rh(o)}}}function rh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function FI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Al{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ct("not implemented")}_getIdTokenResponse(e){return Ct("not implemented")}_linkToIdToken(e,t){return Ct("not implemented")}_getReauthenticationResolver(e){return Ct("not implemented")}}async function UI(n,e){return vn(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function BI(n,e){return la(n,"POST","/v1/accounts:signInWithPassword",rr(n,e))}/**
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
 */async function $I(n,e){return la(n,"POST","/v1/accounts:signInWithEmailLink",rr(n,e))}async function jI(n,e){return la(n,"POST","/v1/accounts:signInWithEmailLink",rr(n,e))}/**
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
 */class Yi extends Al{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Yi(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Yi(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return nh(e,t,"signInWithPassword",BI);case"emailLink":return $I(e,{email:this._email,oobCode:this._password});default:dt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return nh(e,r,"signUpPassword",UI);case"emailLink":return jI(e,{idToken:t,email:this._email,oobCode:this._password});default:dt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function kr(n,e){return la(n,"POST","/v1/accounts:signInWithIdp",rr(n,e))}/**
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
 */const qI="http://localhost";class Wn extends Al{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Wn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):dt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Il(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Wn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return kr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,kr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,kr(e,t)}buildRequest(){const e={requestUri:qI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=gs(t)}return e}}/**
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
 */function zI(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function GI(n){const e=Ci(ki(n)).link,t=e?Ci(ki(e)).deep_link_id:null,r=Ci(ki(n)).deep_link_id;return(r?Ci(ki(r)).link:null)||r||t||e||n}class Rl{constructor(e){var t,r,i,s,o,c;const l=Ci(ki(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,g=zI((i=l.mode)!==null&&i!==void 0?i:null);Y(d&&p&&g,"argument-error"),this.apiKey=d,this.operation=g,this.code=p,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=GI(e);try{return new Rl(t)}catch{return null}}}/**
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
 */class ii{constructor(){this.providerId=ii.PROVIDER_ID}static credential(e,t){return Yi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Rl.parseLink(t);return Y(r,"argument-error"),Yi._fromEmailAndCode(e,r.code,r.tenantId)}}ii.PROVIDER_ID="password";ii.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ii.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Vp{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class vs extends Vp{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Xt extends vs{constructor(){super("facebook.com")}static credential(e){return Wn._fromParams({providerId:Xt.PROVIDER_ID,signInMethod:Xt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xt.credentialFromTaggedObject(e)}static credentialFromError(e){return Xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xt.credential(e.oauthAccessToken)}catch{return null}}}Xt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Xt.PROVIDER_ID="facebook.com";/**
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
 */class Zt extends vs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Wn._fromParams({providerId:Zt.PROVIDER_ID,signInMethod:Zt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Zt.credentialFromTaggedObject(e)}static credentialFromError(e){return Zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Zt.credential(t,r)}catch{return null}}}Zt.GOOGLE_SIGN_IN_METHOD="google.com";Zt.PROVIDER_ID="google.com";/**
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
 */class en extends vs{constructor(){super("github.com")}static credential(e){return Wn._fromParams({providerId:en.PROVIDER_ID,signInMethod:en.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return en.credentialFromTaggedObject(e)}static credentialFromError(e){return en.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return en.credential(e.oauthAccessToken)}catch{return null}}}en.GITHUB_SIGN_IN_METHOD="github.com";en.PROVIDER_ID="github.com";/**
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
 */class tn extends vs{constructor(){super("twitter.com")}static credential(e,t){return Wn._fromParams({providerId:tn.PROVIDER_ID,signInMethod:tn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return tn.credentialFromTaggedObject(e)}static credentialFromError(e){return tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return tn.credential(t,r)}catch{return null}}}tn.TWITTER_SIGN_IN_METHOD="twitter.com";tn.PROVIDER_ID="twitter.com";/**
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
 */class Lr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await kt._fromIdTokenResponse(e,r,i),o=ih(r);return new Lr({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=ih(r);return new Lr({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function ih(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Do extends Bt{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Do.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Do(e,t,r,i)}}function Op(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Do._fromErrorAndOperation(n,s,e,r):s})}async function KI(n,e,t=!1){const r=await Qi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Lr._forOperation(n,"link",r)}/**
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
 */async function WI(n,e,t=!1){const{auth:r}=n;if(ut(r.app))return Promise.reject(cn(r));const i="reauthenticate";try{const s=await Qi(n,Op(r,i,e,n),t);Y(s.idToken,r,"internal-error");const o=Tl(s.idToken);Y(o,r,"internal-error");const{sub:c}=o;return Y(n.uid===c,r,"user-mismatch"),Lr._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&dt(r,"user-mismatch"),s}}/**
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
 */async function Lp(n,e,t=!1){if(ut(n.app))return Promise.reject(cn(n));const r="signIn",i=await Op(n,r,e),s=await Lr._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function HI(n,e){return Lp(ri(n),e)}/**
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
 */async function QI(n){const e=ri(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function YI(n,e,t){return ut(n.app)?Promise.reject(cn(n)):HI(be(n),ii.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&QI(n),r})}/**
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
 */function JI(n,e){return be(n).setPersistence(e)}function XI(n,e,t,r){return be(n).onIdTokenChanged(e,t,r)}function ZI(n,e,t){return be(n).beforeAuthStateChanged(e,t)}function ew(n,e,t,r){return be(n).onAuthStateChanged(e,t,r)}function tw(n){return be(n).signOut()}const xo="__sak";/**
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
 */class Mp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(xo,"1"),this.storage.removeItem(xo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const nw=1e3,rw=10;class Fp extends Mp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Cp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);II()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,rw):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},nw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Fp.type="LOCAL";const Up=Fp;/**
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
 */class Bp extends Mp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Bp.type="SESSION";const $p=Bp;/**
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
 */function iw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class da{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new da(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async d=>d(t.origin,s)),l=await iw(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}da.receivers=[];/**
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
 */function Sl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class sw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,l)=>{const d=Sl("",20);i.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(g){const T=g;if(T.data.eventId===d)switch(T.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(T.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function yt(){return window}function ow(n){yt().location.href=n}/**
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
 */function jp(){return typeof yt().WorkerGlobalScope<"u"&&typeof yt().importScripts=="function"}async function aw(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function cw(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function lw(){return jp()?self:null}/**
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
 */const qp="firebaseLocalStorageDb",uw=1,No="firebaseLocalStorage",zp="fbase_key";class Is{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ha(n,e){return n.transaction([No],e?"readwrite":"readonly").objectStore(No)}function dw(){const n=indexedDB.deleteDatabase(qp);return new Is(n).toPromise()}function Mc(){const n=indexedDB.open(qp,uw);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(No,{keyPath:zp})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(No)?e(r):(r.close(),await dw(),e(await Mc()))})})}async function sh(n,e,t){const r=ha(n,!0).put({[zp]:e,value:t});return new Is(r).toPromise()}async function hw(n,e){const t=ha(n,!1).get(e),r=await new Is(t).toPromise();return r===void 0?null:r.value}function oh(n,e){const t=ha(n,!0).delete(e);return new Is(t).toPromise()}const fw=800,pw=3;class Gp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Mc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>pw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return jp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=da._getInstance(lw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await aw(),!this.activeServiceWorker)return;this.sender=new sw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||cw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Mc();return await sh(e,xo,"1"),await oh(e,xo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>sh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>hw(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>oh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=ha(i,!1).getAll();return new Is(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),fw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Gp.type="LOCAL";const mw=Gp;new ys(3e4,6e4);/**
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
 */function gw(n,e){return e?Dt(e):(Y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Pl extends Al{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return kr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return kr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return kr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function _w(n){return Lp(n.auth,new Pl(n),n.bypassAuthState)}function yw(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),WI(t,new Pl(n),n.bypassAuthState)}async function vw(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),KI(t,new Pl(n),n.bypassAuthState)}/**
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
 */class Kp{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return _w;case"linkViaPopup":case"linkViaRedirect":return vw;case"reauthViaPopup":case"reauthViaRedirect":return yw;default:dt(this.auth,"internal-error")}}resolve(e){Lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Iw=new ys(2e3,1e4);class Rr extends Kp{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Rr.currentPopupAction&&Rr.currentPopupAction.cancel(),Rr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){Lt(this.filter.length===1,"Popup operations only handle one event");const e=Sl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(_t(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(_t(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Rr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_t(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Iw.get())};e()}}Rr.currentPopupAction=null;/**
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
 */const ww="pendingRedirect",ho=new Map;class Ew extends Kp{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ho.get(this.auth._key());if(!e){try{const r=await Tw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ho.set(this.auth._key(),e)}return this.bypassAuthState||ho.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Tw(n,e){const t=Rw(e),r=Aw(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function bw(n,e){ho.set(n._key(),e)}function Aw(n){return Dt(n._redirectPersistence)}function Rw(n){return uo(ww,n.config.apiKey,n.name)}async function Sw(n,e,t=!1){if(ut(n.app))return Promise.reject(cn(n));const r=ri(n),i=gw(r,e),o=await new Ew(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const Pw=10*60*1e3;class Cw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!kw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Wp(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(_t(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Pw&&this.cachedEventUids.clear(),this.cachedEventUids.has(ah(e))}saveEventToCache(e){this.cachedEventUids.add(ah(e)),this.lastProcessedEventTime=Date.now()}}function ah(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Wp({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function kw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Wp(n);default:return!1}}/**
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
 */async function Dw(n,e={}){return vn(n,"GET","/v1/projects",e)}/**
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
 */const xw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Nw=/^https?/;async function Vw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Dw(n);for(const t of e)try{if(Ow(t))return}catch{}dt(n,"unauthorized-domain")}function Ow(n){const e=Oc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Nw.test(t))return!1;if(xw.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const Lw=new ys(3e4,6e4);function ch(){const n=yt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Mw(n){return new Promise((e,t)=>{var r,i,s;function o(){ch(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ch(),t(_t(n,"network-request-failed"))},timeout:Lw.get()})}if(!((i=(r=yt().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=yt().gapi)===null||s===void 0)&&s.load)o();else{const c=CI("iframefcb");return yt()[c]=()=>{gapi.load?o():t(_t(n,"network-request-failed"))},Dp(`${PI()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw fo=null,e})}let fo=null;function Fw(n){return fo=fo||Mw(n),fo}/**
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
 */const Uw=new ys(5e3,15e3),Bw="__/auth/iframe",$w="emulator/auth/iframe",jw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},qw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function zw(n){const e=n.config;Y(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?El(e,$w):`https://${n.config.authDomain}/${Bw}`,r={apiKey:e.apiKey,appName:n.name,v:ni},i=qw.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${gs(r).slice(1)}`}async function Gw(n){const e=await Fw(n),t=yt().gapi;return Y(t,n,"internal-error"),e.open({where:document.body,url:zw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:jw,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=_t(n,"network-request-failed"),c=yt().setTimeout(()=>{s(o)},Uw.get());function l(){yt().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
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
 */const Kw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ww=500,Hw=600,Qw="_blank",Yw="http://localhost";class lh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Jw(n,e,t,r=Ww,i=Hw){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},Kw),{width:r.toString(),height:i.toString(),top:s,left:o}),d=De().toLowerCase();t&&(c=bp(d)?Qw:t),Ep(d)&&(e=e||Yw,l.scrollbars="yes");const p=Object.entries(l).reduce((T,[A,k])=>`${T}${A}=${k},`,"");if(vI(d)&&c!=="_self")return Xw(e||"",c),new lh(null);const g=window.open(e||"",c,p);Y(g,n,"popup-blocked");try{g.focus()}catch{}return new lh(g)}function Xw(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Zw="__/auth/handler",eE="emulator/auth/handler",tE=encodeURIComponent("fac");async function uh(n,e,t,r,i,s){Y(n.config.authDomain,n,"auth-domain-config-required"),Y(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ni,eventId:i};if(e instanceof Vp){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",My(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,g]of Object.entries({}))o[p]=g}if(e instanceof vs){const p=e.getScopes().filter(g=>g!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),d=l?`#${tE}=${encodeURIComponent(l)}`:"";return`${nE(n)}?${gs(c).slice(1)}${d}`}function nE({config:n}){return n.emulator?El(n,eE):`https://${n.authDomain}/${Zw}`}/**
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
 */const _c="webStorageSupport";class rE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=$p,this._completeRedirectFn=Sw,this._overrideRedirectResult=bw}async _openPopup(e,t,r,i){var s;Lt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await uh(e,t,r,Oc(),i);return Jw(e,o,Sl())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await uh(e,t,r,Oc(),i);return ow(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Lt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Gw(e),r=new Cw(e);return t.register("authEvent",i=>(Y(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(_c,{type:_c},i=>{var s;const o=(s=i?.[0])===null||s===void 0?void 0:s[_c];o!==void 0&&t(!!o),dt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Vw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Cp()||Tp()||bl()}}const iE=rE;var dh="@firebase/auth",hh="1.9.0";/**
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
 */class sE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function oE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function aE(n){fn(new Vt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;Y(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:kp(n)},d=new AI(r,i,s,l);return OI(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),fn(new Vt("auth-internal",e=>{const t=ri(e.getProvider("auth").getImmediate());return(r=>new sE(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Nt(dh,hh,oE(n)),Nt(dh,hh,"esm2017")}/**
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
 */const cE=5*60,lE=sp("authIdTokenMaxAge")||cE;let fh=null;const uE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>lE)return;const i=t?.token;fh!==i&&(fh=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function dE(n=up()){const e=_s(n,"auth");if(e.isInitialized())return e.getImmediate();const t=VI(n,{popupRedirectResolver:iE,persistence:[mw,Up,$p]}),r=sp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=uE(s.toString());ZI(t,o,()=>o(t.currentUser)),XI(t,c=>o(c))}}const i=Ry("auth");return i&&LI(t,`http://${i}`),t}function hE(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}RI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=_t("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",hE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});aE("Browser");var ph=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ln,Hp;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,y){function m(){}m.prototype=y.prototype,v.D=y.prototype,v.prototype=new m,v.prototype.constructor=v,v.C=function(I,E,b){for(var w=Array(arguments.length-2),te=2;te<arguments.length;te++)w[te-2]=arguments[te];return y.prototype[E].apply(I,w)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,y,m){m||(m=0);var I=Array(16);if(typeof y=="string")for(var E=0;16>E;++E)I[E]=y.charCodeAt(m++)|y.charCodeAt(m++)<<8|y.charCodeAt(m++)<<16|y.charCodeAt(m++)<<24;else for(E=0;16>E;++E)I[E]=y[m++]|y[m++]<<8|y[m++]<<16|y[m++]<<24;y=v.g[0],m=v.g[1],E=v.g[2];var b=v.g[3],w=y+(b^m&(E^b))+I[0]+3614090360&4294967295;y=m+(w<<7&4294967295|w>>>25),w=b+(E^y&(m^E))+I[1]+3905402710&4294967295,b=y+(w<<12&4294967295|w>>>20),w=E+(m^b&(y^m))+I[2]+606105819&4294967295,E=b+(w<<17&4294967295|w>>>15),w=m+(y^E&(b^y))+I[3]+3250441966&4294967295,m=E+(w<<22&4294967295|w>>>10),w=y+(b^m&(E^b))+I[4]+4118548399&4294967295,y=m+(w<<7&4294967295|w>>>25),w=b+(E^y&(m^E))+I[5]+1200080426&4294967295,b=y+(w<<12&4294967295|w>>>20),w=E+(m^b&(y^m))+I[6]+2821735955&4294967295,E=b+(w<<17&4294967295|w>>>15),w=m+(y^E&(b^y))+I[7]+4249261313&4294967295,m=E+(w<<22&4294967295|w>>>10),w=y+(b^m&(E^b))+I[8]+1770035416&4294967295,y=m+(w<<7&4294967295|w>>>25),w=b+(E^y&(m^E))+I[9]+2336552879&4294967295,b=y+(w<<12&4294967295|w>>>20),w=E+(m^b&(y^m))+I[10]+4294925233&4294967295,E=b+(w<<17&4294967295|w>>>15),w=m+(y^E&(b^y))+I[11]+2304563134&4294967295,m=E+(w<<22&4294967295|w>>>10),w=y+(b^m&(E^b))+I[12]+1804603682&4294967295,y=m+(w<<7&4294967295|w>>>25),w=b+(E^y&(m^E))+I[13]+4254626195&4294967295,b=y+(w<<12&4294967295|w>>>20),w=E+(m^b&(y^m))+I[14]+2792965006&4294967295,E=b+(w<<17&4294967295|w>>>15),w=m+(y^E&(b^y))+I[15]+1236535329&4294967295,m=E+(w<<22&4294967295|w>>>10),w=y+(E^b&(m^E))+I[1]+4129170786&4294967295,y=m+(w<<5&4294967295|w>>>27),w=b+(m^E&(y^m))+I[6]+3225465664&4294967295,b=y+(w<<9&4294967295|w>>>23),w=E+(y^m&(b^y))+I[11]+643717713&4294967295,E=b+(w<<14&4294967295|w>>>18),w=m+(b^y&(E^b))+I[0]+3921069994&4294967295,m=E+(w<<20&4294967295|w>>>12),w=y+(E^b&(m^E))+I[5]+3593408605&4294967295,y=m+(w<<5&4294967295|w>>>27),w=b+(m^E&(y^m))+I[10]+38016083&4294967295,b=y+(w<<9&4294967295|w>>>23),w=E+(y^m&(b^y))+I[15]+3634488961&4294967295,E=b+(w<<14&4294967295|w>>>18),w=m+(b^y&(E^b))+I[4]+3889429448&4294967295,m=E+(w<<20&4294967295|w>>>12),w=y+(E^b&(m^E))+I[9]+568446438&4294967295,y=m+(w<<5&4294967295|w>>>27),w=b+(m^E&(y^m))+I[14]+3275163606&4294967295,b=y+(w<<9&4294967295|w>>>23),w=E+(y^m&(b^y))+I[3]+4107603335&4294967295,E=b+(w<<14&4294967295|w>>>18),w=m+(b^y&(E^b))+I[8]+1163531501&4294967295,m=E+(w<<20&4294967295|w>>>12),w=y+(E^b&(m^E))+I[13]+2850285829&4294967295,y=m+(w<<5&4294967295|w>>>27),w=b+(m^E&(y^m))+I[2]+4243563512&4294967295,b=y+(w<<9&4294967295|w>>>23),w=E+(y^m&(b^y))+I[7]+1735328473&4294967295,E=b+(w<<14&4294967295|w>>>18),w=m+(b^y&(E^b))+I[12]+2368359562&4294967295,m=E+(w<<20&4294967295|w>>>12),w=y+(m^E^b)+I[5]+4294588738&4294967295,y=m+(w<<4&4294967295|w>>>28),w=b+(y^m^E)+I[8]+2272392833&4294967295,b=y+(w<<11&4294967295|w>>>21),w=E+(b^y^m)+I[11]+1839030562&4294967295,E=b+(w<<16&4294967295|w>>>16),w=m+(E^b^y)+I[14]+4259657740&4294967295,m=E+(w<<23&4294967295|w>>>9),w=y+(m^E^b)+I[1]+2763975236&4294967295,y=m+(w<<4&4294967295|w>>>28),w=b+(y^m^E)+I[4]+1272893353&4294967295,b=y+(w<<11&4294967295|w>>>21),w=E+(b^y^m)+I[7]+4139469664&4294967295,E=b+(w<<16&4294967295|w>>>16),w=m+(E^b^y)+I[10]+3200236656&4294967295,m=E+(w<<23&4294967295|w>>>9),w=y+(m^E^b)+I[13]+681279174&4294967295,y=m+(w<<4&4294967295|w>>>28),w=b+(y^m^E)+I[0]+3936430074&4294967295,b=y+(w<<11&4294967295|w>>>21),w=E+(b^y^m)+I[3]+3572445317&4294967295,E=b+(w<<16&4294967295|w>>>16),w=m+(E^b^y)+I[6]+76029189&4294967295,m=E+(w<<23&4294967295|w>>>9),w=y+(m^E^b)+I[9]+3654602809&4294967295,y=m+(w<<4&4294967295|w>>>28),w=b+(y^m^E)+I[12]+3873151461&4294967295,b=y+(w<<11&4294967295|w>>>21),w=E+(b^y^m)+I[15]+530742520&4294967295,E=b+(w<<16&4294967295|w>>>16),w=m+(E^b^y)+I[2]+3299628645&4294967295,m=E+(w<<23&4294967295|w>>>9),w=y+(E^(m|~b))+I[0]+4096336452&4294967295,y=m+(w<<6&4294967295|w>>>26),w=b+(m^(y|~E))+I[7]+1126891415&4294967295,b=y+(w<<10&4294967295|w>>>22),w=E+(y^(b|~m))+I[14]+2878612391&4294967295,E=b+(w<<15&4294967295|w>>>17),w=m+(b^(E|~y))+I[5]+4237533241&4294967295,m=E+(w<<21&4294967295|w>>>11),w=y+(E^(m|~b))+I[12]+1700485571&4294967295,y=m+(w<<6&4294967295|w>>>26),w=b+(m^(y|~E))+I[3]+2399980690&4294967295,b=y+(w<<10&4294967295|w>>>22),w=E+(y^(b|~m))+I[10]+4293915773&4294967295,E=b+(w<<15&4294967295|w>>>17),w=m+(b^(E|~y))+I[1]+2240044497&4294967295,m=E+(w<<21&4294967295|w>>>11),w=y+(E^(m|~b))+I[8]+1873313359&4294967295,y=m+(w<<6&4294967295|w>>>26),w=b+(m^(y|~E))+I[15]+4264355552&4294967295,b=y+(w<<10&4294967295|w>>>22),w=E+(y^(b|~m))+I[6]+2734768916&4294967295,E=b+(w<<15&4294967295|w>>>17),w=m+(b^(E|~y))+I[13]+1309151649&4294967295,m=E+(w<<21&4294967295|w>>>11),w=y+(E^(m|~b))+I[4]+4149444226&4294967295,y=m+(w<<6&4294967295|w>>>26),w=b+(m^(y|~E))+I[11]+3174756917&4294967295,b=y+(w<<10&4294967295|w>>>22),w=E+(y^(b|~m))+I[2]+718787259&4294967295,E=b+(w<<15&4294967295|w>>>17),w=m+(b^(E|~y))+I[9]+3951481745&4294967295,v.g[0]=v.g[0]+y&4294967295,v.g[1]=v.g[1]+(E+(w<<21&4294967295|w>>>11))&4294967295,v.g[2]=v.g[2]+E&4294967295,v.g[3]=v.g[3]+b&4294967295}r.prototype.u=function(v,y){y===void 0&&(y=v.length);for(var m=y-this.blockSize,I=this.B,E=this.h,b=0;b<y;){if(E==0)for(;b<=m;)i(this,v,b),b+=this.blockSize;if(typeof v=="string"){for(;b<y;)if(I[E++]=v.charCodeAt(b++),E==this.blockSize){i(this,I),E=0;break}}else for(;b<y;)if(I[E++]=v[b++],E==this.blockSize){i(this,I),E=0;break}}this.h=E,this.o+=y},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var y=1;y<v.length-8;++y)v[y]=0;var m=8*this.o;for(y=v.length-8;y<v.length;++y)v[y]=m&255,m/=256;for(this.u(v),v=Array(16),y=m=0;4>y;++y)for(var I=0;32>I;I+=8)v[m++]=this.g[y]>>>I&255;return v};function s(v,y){var m=c;return Object.prototype.hasOwnProperty.call(m,v)?m[v]:m[v]=y(v)}function o(v,y){this.h=y;for(var m=[],I=!0,E=v.length-1;0<=E;E--){var b=v[E]|0;I&&b==y||(m[E]=b,I=!1)}this.g=m}var c={};function l(v){return-128<=v&&128>v?s(v,function(y){return new o([y|0],0>y?-1:0)}):new o([v|0],0>v?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return g;if(0>v)return P(d(-v));for(var y=[],m=1,I=0;v>=m;I++)y[I]=v/m|0,m*=4294967296;return new o(y,0)}function p(v,y){if(v.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(v.charAt(0)=="-")return P(p(v.substring(1),y));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var m=d(Math.pow(y,8)),I=g,E=0;E<v.length;E+=8){var b=Math.min(8,v.length-E),w=parseInt(v.substring(E,E+b),y);8>b?(b=d(Math.pow(y,b)),I=I.j(b).add(d(w))):(I=I.j(m),I=I.add(d(w)))}return I}var g=l(0),T=l(1),A=l(16777216);n=o.prototype,n.m=function(){if(x(this))return-P(this).m();for(var v=0,y=1,m=0;m<this.g.length;m++){var I=this.i(m);v+=(0<=I?I:4294967296+I)*y,y*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(k(this))return"0";if(x(this))return"-"+P(this).toString(v);for(var y=d(Math.pow(v,6)),m=this,I="";;){var E=$(m,y).g;m=q(m,E.j(y));var b=((0<m.g.length?m.g[0]:m.h)>>>0).toString(v);if(m=E,k(m))return b+I;for(;6>b.length;)b="0"+b;I=b+I}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function k(v){if(v.h!=0)return!1;for(var y=0;y<v.g.length;y++)if(v.g[y]!=0)return!1;return!0}function x(v){return v.h==-1}n.l=function(v){return v=q(this,v),x(v)?-1:k(v)?0:1};function P(v){for(var y=v.g.length,m=[],I=0;I<y;I++)m[I]=~v.g[I];return new o(m,~v.h).add(T)}n.abs=function(){return x(this)?P(this):this},n.add=function(v){for(var y=Math.max(this.g.length,v.g.length),m=[],I=0,E=0;E<=y;E++){var b=I+(this.i(E)&65535)+(v.i(E)&65535),w=(b>>>16)+(this.i(E)>>>16)+(v.i(E)>>>16);I=w>>>16,b&=65535,w&=65535,m[E]=w<<16|b}return new o(m,m[m.length-1]&-2147483648?-1:0)};function q(v,y){return v.add(P(y))}n.j=function(v){if(k(this)||k(v))return g;if(x(this))return x(v)?P(this).j(P(v)):P(P(this).j(v));if(x(v))return P(this.j(P(v)));if(0>this.l(A)&&0>v.l(A))return d(this.m()*v.m());for(var y=this.g.length+v.g.length,m=[],I=0;I<2*y;I++)m[I]=0;for(I=0;I<this.g.length;I++)for(var E=0;E<v.g.length;E++){var b=this.i(I)>>>16,w=this.i(I)&65535,te=v.i(E)>>>16,Ae=v.i(E)&65535;m[2*I+2*E]+=w*Ae,V(m,2*I+2*E),m[2*I+2*E+1]+=b*Ae,V(m,2*I+2*E+1),m[2*I+2*E+1]+=w*te,V(m,2*I+2*E+1),m[2*I+2*E+2]+=b*te,V(m,2*I+2*E+2)}for(I=0;I<y;I++)m[I]=m[2*I+1]<<16|m[2*I];for(I=y;I<2*y;I++)m[I]=0;return new o(m,0)};function V(v,y){for(;(v[y]&65535)!=v[y];)v[y+1]+=v[y]>>>16,v[y]&=65535,y++}function L(v,y){this.g=v,this.h=y}function $(v,y){if(k(y))throw Error("division by zero");if(k(v))return new L(g,g);if(x(v))return y=$(P(v),y),new L(P(y.g),P(y.h));if(x(y))return y=$(v,P(y)),new L(P(y.g),y.h);if(30<v.g.length){if(x(v)||x(y))throw Error("slowDivide_ only works with positive integers.");for(var m=T,I=y;0>=I.l(v);)m=N(m),I=N(I);var E=F(m,1),b=F(I,1);for(I=F(I,2),m=F(m,2);!k(I);){var w=b.add(I);0>=w.l(v)&&(E=E.add(m),b=w),I=F(I,1),m=F(m,1)}return y=q(v,E.j(y)),new L(E,y)}for(E=g;0<=v.l(y);){for(m=Math.max(1,Math.floor(v.m()/y.m())),I=Math.ceil(Math.log(m)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),b=d(m),w=b.j(y);x(w)||0<w.l(v);)m-=I,b=d(m),w=b.j(y);k(b)&&(b=T),E=E.add(b),v=q(v,w)}return new L(E,v)}n.A=function(v){return $(this,v).h},n.and=function(v){for(var y=Math.max(this.g.length,v.g.length),m=[],I=0;I<y;I++)m[I]=this.i(I)&v.i(I);return new o(m,this.h&v.h)},n.or=function(v){for(var y=Math.max(this.g.length,v.g.length),m=[],I=0;I<y;I++)m[I]=this.i(I)|v.i(I);return new o(m,this.h|v.h)},n.xor=function(v){for(var y=Math.max(this.g.length,v.g.length),m=[],I=0;I<y;I++)m[I]=this.i(I)^v.i(I);return new o(m,this.h^v.h)};function N(v){for(var y=v.g.length+1,m=[],I=0;I<y;I++)m[I]=v.i(I)<<1|v.i(I-1)>>>31;return new o(m,v.h)}function F(v,y){var m=y>>5;y%=32;for(var I=v.g.length-m,E=[],b=0;b<I;b++)E[b]=0<y?v.i(b+m)>>>y|v.i(b+m+1)<<32-y:v.i(b+m);return new o(E,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Hp=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=p,ln=o}).apply(typeof ph<"u"?ph:typeof self<"u"?self:typeof window<"u"?window:{});var Ys=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qp,Di,Yp,po,Fc,Jp,Xp,Zp;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,h){return a==Array.prototype||a==Object.prototype||(a[u]=h.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ys=="object"&&Ys];for(var u=0;u<a.length;++u){var h=a[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(a,u){if(u)e:{var h=r;a=a.split(".");for(var _=0;_<a.length-1;_++){var S=a[_];if(!(S in h))break e;h=h[S]}a=a[a.length-1],_=h[a],u=u(_),u!=_&&u!=null&&e(h,a,{configurable:!0,writable:!0,value:u})}}function s(a,u){a instanceof String&&(a+="");var h=0,_=!1,S={next:function(){if(!_&&h<a.length){var C=h++;return{value:u(C,a[C]),done:!1}}return _=!0,{done:!0,value:void 0}}};return S[Symbol.iterator]=function(){return S},S}i("Array.prototype.values",function(a){return a||function(){return s(this,function(u,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function d(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function p(a,u,h){return a.call.apply(a.bind,arguments)}function g(a,u,h){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var S=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(S,_),a.apply(u,S)}}return function(){return a.apply(u,arguments)}}function T(a,u,h){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:g,T.apply(null,arguments)}function A(a,u){var h=Array.prototype.slice.call(arguments,1);return function(){var _=h.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function k(a,u){function h(){}h.prototype=u.prototype,a.aa=u.prototype,a.prototype=new h,a.prototype.constructor=a,a.Qb=function(_,S,C){for(var B=Array(arguments.length-2),pe=2;pe<arguments.length;pe++)B[pe-2]=arguments[pe];return u.prototype[S].apply(_,B)}}function x(a){const u=a.length;if(0<u){const h=Array(u);for(let _=0;_<u;_++)h[_]=a[_];return h}return[]}function P(a,u){for(let h=1;h<arguments.length;h++){const _=arguments[h];if(l(_)){const S=a.length||0,C=_.length||0;a.length=S+C;for(let B=0;B<C;B++)a[S+B]=_[B]}else a.push(_)}}class q{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function V(a){return/^[\s\xa0]*$/.test(a)}function L(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function $(a){return $[" "](a),a}$[" "]=function(){};var N=L().indexOf("Gecko")!=-1&&!(L().toLowerCase().indexOf("webkit")!=-1&&L().indexOf("Edge")==-1)&&!(L().indexOf("Trident")!=-1||L().indexOf("MSIE")!=-1)&&L().indexOf("Edge")==-1;function F(a,u,h){for(const _ in a)u.call(h,a[_],_,a)}function v(a,u){for(const h in a)u.call(void 0,a[h],h,a)}function y(a){const u={};for(const h in a)u[h]=a[h];return u}const m="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(a,u){let h,_;for(let S=1;S<arguments.length;S++){_=arguments[S];for(h in _)a[h]=_[h];for(let C=0;C<m.length;C++)h=m[C],Object.prototype.hasOwnProperty.call(_,h)&&(a[h]=_[h])}}function E(a){var u=1;a=a.split(":");const h=[];for(;0<u&&a.length;)h.push(a.shift()),u--;return a.length&&h.push(a.join(":")),h}function b(a){c.setTimeout(()=>{throw a},0)}function w(){var a=Rt;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class te{constructor(){this.h=this.g=null}add(u,h){const _=Ae.get();_.set(u,h),this.h?this.h.next=_:this.g=_,this.h=_}}var Ae=new q(()=>new Ce,a=>a.reset());class Ce{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let et,At=!1,Rt=new te,cr=()=>{const a=c.Promise.resolve(void 0);et=()=>{a.then(za)}};var za=()=>{for(var a;a=w();){try{a.h.call(a.g)}catch(h){b(h)}var u=Ae;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}At=!1};function ft(){this.s=this.s,this.C=this.C}ft.prototype.s=!1,ft.prototype.ma=function(){this.s||(this.s=!0,this.N())},ft.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ne(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}Ne.prototype.h=function(){this.defaultPrevented=!0};var Ga=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const h=()=>{};c.addEventListener("test",h,u),c.removeEventListener("test",h,u)}catch{}return a}();function O(a,u){if(Ne.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var h=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(N){e:{try{$(u.nodeName);var S=!0;break e}catch{}S=!1}S||(u=null)}}else h=="mouseover"?u=a.fromElement:h=="mouseout"&&(u=a.toElement);this.relatedTarget=u,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:j[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&O.aa.h.call(this)}}k(O,Ne);var j={2:"touch",3:"pen",4:"mouse"};O.prototype.h=function(){O.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var W="closure_listenable_"+(1e6*Math.random()|0),ae=0;function ne(a,u,h,_,S){this.listener=a,this.proxy=null,this.src=u,this.type=h,this.capture=!!_,this.ha=S,this.key=++ae,this.da=this.fa=!1}function me(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ve(a){this.src=a,this.g={},this.h=0}Ve.prototype.add=function(a,u,h,_,S){var C=a.toString();a=this.g[C],a||(a=this.g[C]=[],this.h++);var B=ur(a,u,_,S);return-1<B?(u=a[B],h||(u.fa=!1)):(u=new ne(u,this.src,C,!!_,S),u.fa=h,a.push(u)),u};function lr(a,u){var h=u.type;if(h in a.g){var _=a.g[h],S=Array.prototype.indexOf.call(_,u,void 0),C;(C=0<=S)&&Array.prototype.splice.call(_,S,1),C&&(me(u),a.g[h].length==0&&(delete a.g[h],a.h--))}}function ur(a,u,h,_){for(var S=0;S<a.length;++S){var C=a[S];if(!C.da&&C.listener==u&&C.capture==!!h&&C.ha==_)return S}return-1}var li="closure_lm_"+(1e6*Math.random()|0),Tn={};function bn(a,u,h,_,S){if(Array.isArray(u)){for(var C=0;C<u.length;C++)bn(a,u[C],h,_,S);return null}return h=ju(h),a&&a[W]?a.K(u,h,d(_)?!!_.capture:!1,S):ui(a,u,h,!1,_,S)}function ui(a,u,h,_,S,C){if(!u)throw Error("Invalid event type");var B=d(S)?!!S.capture:!!S,pe=Wa(a);if(pe||(a[li]=pe=new Ve(a)),h=pe.add(u,h,_,B,C),h.proxy)return h;if(_=q_(),h.proxy=_,_.src=a,_.listener=h,a.addEventListener)Ga||(S=B),S===void 0&&(S=!1),a.addEventListener(u.toString(),_,S);else if(a.attachEvent)a.attachEvent($u(u.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return h}function q_(){function a(h){return u.call(a.src,a.listener,h)}const u=z_;return a}function Bu(a,u,h,_,S){if(Array.isArray(u))for(var C=0;C<u.length;C++)Bu(a,u[C],h,_,S);else _=d(_)?!!_.capture:!!_,h=ju(h),a&&a[W]?(a=a.i,u=String(u).toString(),u in a.g&&(C=a.g[u],h=ur(C,h,_,S),-1<h&&(me(C[h]),Array.prototype.splice.call(C,h,1),C.length==0&&(delete a.g[u],a.h--)))):a&&(a=Wa(a))&&(u=a.g[u.toString()],a=-1,u&&(a=ur(u,h,_,S)),(h=-1<a?u[a]:null)&&Ka(h))}function Ka(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[W])lr(u.i,a);else{var h=a.type,_=a.proxy;u.removeEventListener?u.removeEventListener(h,_,a.capture):u.detachEvent?u.detachEvent($u(h),_):u.addListener&&u.removeListener&&u.removeListener(_),(h=Wa(u))?(lr(h,a),h.h==0&&(h.src=null,u[li]=null)):me(a)}}}function $u(a){return a in Tn?Tn[a]:Tn[a]="on"+a}function z_(a,u){if(a.da)a=!0;else{u=new O(u,this);var h=a.listener,_=a.ha||a.src;a.fa&&Ka(a),a=h.call(_,u)}return a}function Wa(a){return a=a[li],a instanceof Ve?a:null}var Ha="__closure_events_fn_"+(1e9*Math.random()>>>0);function ju(a){return typeof a=="function"?a:(a[Ha]||(a[Ha]=function(u){return a.handleEvent(u)}),a[Ha])}function Fe(){ft.call(this),this.i=new Ve(this),this.M=this,this.F=null}k(Fe,ft),Fe.prototype[W]=!0,Fe.prototype.removeEventListener=function(a,u,h,_){Bu(this,a,u,h,_)};function Ge(a,u){var h,_=a.F;if(_)for(h=[];_;_=_.F)h.push(_);if(a=a.M,_=u.type||u,typeof u=="string")u=new Ne(u,a);else if(u instanceof Ne)u.target=u.target||a;else{var S=u;u=new Ne(_,a),I(u,S)}if(S=!0,h)for(var C=h.length-1;0<=C;C--){var B=u.g=h[C];S=Ns(B,_,!0,u)&&S}if(B=u.g=a,S=Ns(B,_,!0,u)&&S,S=Ns(B,_,!1,u)&&S,h)for(C=0;C<h.length;C++)B=u.g=h[C],S=Ns(B,_,!1,u)&&S}Fe.prototype.N=function(){if(Fe.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var h=a.g[u],_=0;_<h.length;_++)me(h[_]);delete a.g[u],a.h--}}this.F=null},Fe.prototype.K=function(a,u,h,_){return this.i.add(String(a),u,!1,h,_)},Fe.prototype.L=function(a,u,h,_){return this.i.add(String(a),u,!0,h,_)};function Ns(a,u,h,_){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var S=!0,C=0;C<u.length;++C){var B=u[C];if(B&&!B.da&&B.capture==h){var pe=B.listener,Le=B.ha||B.src;B.fa&&lr(a.i,B),S=pe.call(Le,_)!==!1&&S}}return S&&!_.defaultPrevented}function qu(a,u,h){if(typeof a=="function")h&&(a=T(a,h));else if(a&&typeof a.handleEvent=="function")a=T(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(a,u||0)}function zu(a){a.g=qu(()=>{a.g=null,a.i&&(a.i=!1,zu(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class G_ extends ft{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:zu(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function di(a){ft.call(this),this.h=a,this.g={}}k(di,ft);var Gu=[];function Ku(a){F(a.g,function(u,h){this.g.hasOwnProperty(h)&&Ka(u)},a),a.g={}}di.prototype.N=function(){di.aa.N.call(this),Ku(this)},di.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Qa=c.JSON.stringify,K_=c.JSON.parse,W_=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Ya(){}Ya.prototype.h=null;function Wu(a){return a.h||(a.h=a.i())}function Hu(){}var hi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ja(){Ne.call(this,"d")}k(Ja,Ne);function Xa(){Ne.call(this,"c")}k(Xa,Ne);var An={},Qu=null;function Vs(){return Qu=Qu||new Fe}An.La="serverreachability";function Yu(a){Ne.call(this,An.La,a)}k(Yu,Ne);function fi(a){const u=Vs();Ge(u,new Yu(u))}An.STAT_EVENT="statevent";function Ju(a,u){Ne.call(this,An.STAT_EVENT,a),this.stat=u}k(Ju,Ne);function Ke(a){const u=Vs();Ge(u,new Ju(u,a))}An.Ma="timingevent";function Xu(a,u){Ne.call(this,An.Ma,a),this.size=u}k(Xu,Ne);function pi(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},u)}function mi(){this.g=!0}mi.prototype.xa=function(){this.g=!1};function H_(a,u,h,_,S,C){a.info(function(){if(a.g)if(C)for(var B="",pe=C.split("&"),Le=0;Le<pe.length;Le++){var ce=pe[Le].split("=");if(1<ce.length){var Ue=ce[0];ce=ce[1];var Be=Ue.split("_");B=2<=Be.length&&Be[1]=="type"?B+(Ue+"="+ce+"&"):B+(Ue+"=redacted&")}}else B=null;else B=C;return"XMLHTTP REQ ("+_+") [attempt "+S+"]: "+u+`
`+h+`
`+B})}function Q_(a,u,h,_,S,C,B){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+S+"]: "+u+`
`+h+`
`+C+" "+B})}function dr(a,u,h,_){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+J_(a,h)+(_?" "+_:"")})}function Y_(a,u){a.info(function(){return"TIMEOUT: "+u})}mi.prototype.info=function(){};function J_(a,u){if(!a.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(a=0;a<h.length;a++)if(Array.isArray(h[a])){var _=h[a];if(!(2>_.length)){var S=_[1];if(Array.isArray(S)&&!(1>S.length)){var C=S[0];if(C!="noop"&&C!="stop"&&C!="close")for(var B=1;B<S.length;B++)S[B]=""}}}}return Qa(h)}catch{return u}}var Os={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Zu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Za;function Ls(){}k(Ls,Ya),Ls.prototype.g=function(){return new XMLHttpRequest},Ls.prototype.i=function(){return{}},Za=new Ls;function zt(a,u,h,_){this.j=a,this.i=u,this.l=h,this.R=_||1,this.U=new di(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ed}function ed(){this.i=null,this.g="",this.h=!1}var td={},ec={};function tc(a,u,h){a.L=1,a.v=Bs(St(u)),a.m=h,a.P=!0,nd(a,null)}function nd(a,u){a.F=Date.now(),Ms(a),a.A=St(a.v);var h=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),gd(h.i,"t",_),a.C=0,h=a.j.J,a.h=new ed,a.g=Vd(a.j,h?u:null,!a.m),0<a.O&&(a.M=new G_(T(a.Y,a,a.g),a.O)),u=a.U,h=a.g,_=a.ca;var S="readystatechange";Array.isArray(S)||(S&&(Gu[0]=S.toString()),S=Gu);for(var C=0;C<S.length;C++){var B=bn(h,S[C],_||u.handleEvent,!1,u.h||u);if(!B)break;u.g[B.key]=B}u=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),fi(),H_(a.i,a.u,a.A,a.l,a.R,a.m)}zt.prototype.ca=function(a){a=a.target;const u=this.M;u&&Pt(a)==3?u.j():this.Y(a)},zt.prototype.Y=function(a){try{if(a==this.g)e:{const Be=Pt(this.g);var u=this.g.Ba();const pr=this.g.Z();if(!(3>Be)&&(Be!=3||this.g&&(this.h.h||this.g.oa()||Td(this.g)))){this.J||Be!=4||u==7||(u==8||0>=pr?fi(3):fi(2)),nc(this);var h=this.g.Z();this.X=h;t:if(rd(this)){var _=Td(this.g);a="";var S=_.length,C=Pt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Rn(this),gi(this);var B="";break t}this.h.i=new c.TextDecoder}for(u=0;u<S;u++)this.h.h=!0,a+=this.h.i.decode(_[u],{stream:!(C&&u==S-1)});_.length=0,this.h.g+=a,this.C=0,B=this.h.g}else B=this.g.oa();if(this.o=h==200,Q_(this.i,this.u,this.A,this.l,this.R,Be,h),this.o){if(this.T&&!this.K){t:{if(this.g){var pe,Le=this.g;if((pe=Le.g?Le.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!V(pe)){var ce=pe;break t}}ce=null}if(h=ce)dr(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,rc(this,h);else{this.o=!1,this.s=3,Ke(12),Rn(this),gi(this);break e}}if(this.P){h=!0;let ct;for(;!this.J&&this.C<B.length;)if(ct=X_(this,B),ct==ec){Be==4&&(this.s=4,Ke(14),h=!1),dr(this.i,this.l,null,"[Incomplete Response]");break}else if(ct==td){this.s=4,Ke(15),dr(this.i,this.l,B,"[Invalid Chunk]"),h=!1;break}else dr(this.i,this.l,ct,null),rc(this,ct);if(rd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Be!=4||B.length!=0||this.h.h||(this.s=1,Ke(16),h=!1),this.o=this.o&&h,!h)dr(this.i,this.l,B,"[Invalid Chunked Response]"),Rn(this),gi(this);else if(0<B.length&&!this.W){this.W=!0;var Ue=this.j;Ue.g==this&&Ue.ba&&!Ue.M&&(Ue.j.info("Great, no buffering proxy detected. Bytes received: "+B.length),lc(Ue),Ue.M=!0,Ke(11))}}else dr(this.i,this.l,B,null),rc(this,B);Be==4&&Rn(this),this.o&&!this.J&&(Be==4?kd(this.j,this):(this.o=!1,Ms(this)))}else my(this.g),h==400&&0<B.indexOf("Unknown SID")?(this.s=3,Ke(12)):(this.s=0,Ke(13)),Rn(this),gi(this)}}}catch{}finally{}};function rd(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function X_(a,u){var h=a.C,_=u.indexOf(`
`,h);return _==-1?ec:(h=Number(u.substring(h,_)),isNaN(h)?td:(_+=1,_+h>u.length?ec:(u=u.slice(_,_+h),a.C=_+h,u)))}zt.prototype.cancel=function(){this.J=!0,Rn(this)};function Ms(a){a.S=Date.now()+a.I,id(a,a.I)}function id(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=pi(T(a.ba,a),u)}function nc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}zt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Y_(this.i,this.A),this.L!=2&&(fi(),Ke(17)),Rn(this),this.s=2,gi(this)):id(this,this.S-a)};function gi(a){a.j.G==0||a.J||kd(a.j,a)}function Rn(a){nc(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,Ku(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function rc(a,u){try{var h=a.j;if(h.G!=0&&(h.g==a||ic(h.h,a))){if(!a.K&&ic(h.h,a)&&h.G==3){try{var _=h.Da.g.parse(u)}catch{_=null}if(Array.isArray(_)&&_.length==3){var S=_;if(S[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<a.F)Ks(h),zs(h);else break e;cc(h),Ke(18)}}else h.za=S[1],0<h.za-h.T&&37500>S[2]&&h.F&&h.v==0&&!h.C&&(h.C=pi(T(h.Za,h),6e3));if(1>=ad(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Pn(h,11)}else if((a.K||h.g==a)&&Ks(h),!V(u))for(S=h.Da.g.parse(u),u=0;u<S.length;u++){let ce=S[u];if(h.T=ce[0],ce=ce[1],h.G==2)if(ce[0]=="c"){h.K=ce[1],h.ia=ce[2];const Ue=ce[3];Ue!=null&&(h.la=Ue,h.j.info("VER="+h.la));const Be=ce[4];Be!=null&&(h.Aa=Be,h.j.info("SVER="+h.Aa));const pr=ce[5];pr!=null&&typeof pr=="number"&&0<pr&&(_=1.5*pr,h.L=_,h.j.info("backChannelRequestTimeoutMs_="+_)),_=h;const ct=a.g;if(ct){const Hs=ct.g?ct.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Hs){var C=_.h;C.g||Hs.indexOf("spdy")==-1&&Hs.indexOf("quic")==-1&&Hs.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(sc(C,C.h),C.h=null))}if(_.D){const uc=ct.g?ct.g.getResponseHeader("X-HTTP-Session-Id"):null;uc&&(_.ya=uc,ge(_.I,_.D,uc))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-a.F,h.j.info("Handshake RTT: "+h.R+"ms")),_=h;var B=a;if(_.qa=Nd(_,_.J?_.ia:null,_.W),B.K){cd(_.h,B);var pe=B,Le=_.L;Le&&(pe.I=Le),pe.B&&(nc(pe),Ms(pe)),_.g=B}else Pd(_);0<h.i.length&&Gs(h)}else ce[0]!="stop"&&ce[0]!="close"||Pn(h,7);else h.G==3&&(ce[0]=="stop"||ce[0]=="close"?ce[0]=="stop"?Pn(h,7):ac(h):ce[0]!="noop"&&h.l&&h.l.ta(ce),h.v=0)}}fi(4)}catch{}}var Z_=class{constructor(a,u){this.g=a,this.map=u}};function sd(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function od(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function ad(a){return a.h?1:a.g?a.g.size:0}function ic(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function sc(a,u){a.g?a.g.add(u):a.h=u}function cd(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}sd.prototype.cancel=function(){if(this.i=ld(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function ld(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const h of a.g.values())u=u.concat(h.D);return u}return x(a.i)}function ey(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var u=[],h=a.length,_=0;_<h;_++)u.push(a[_]);return u}u=[],h=0;for(_ in a)u[h++]=a[_];return u}function ty(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var u=[];a=a.length;for(var h=0;h<a;h++)u.push(h);return u}u=[],h=0;for(const _ in a)u[h++]=_;return u}}}function ud(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var h=ty(a),_=ey(a),S=_.length,C=0;C<S;C++)u.call(void 0,_[C],h&&h[C],a)}var dd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ny(a,u){if(a){a=a.split("&");for(var h=0;h<a.length;h++){var _=a[h].indexOf("="),S=null;if(0<=_){var C=a[h].substring(0,_);S=a[h].substring(_+1)}else C=a[h];u(C,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function Sn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Sn){this.h=a.h,Fs(this,a.j),this.o=a.o,this.g=a.g,Us(this,a.s),this.l=a.l;var u=a.i,h=new vi;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),hd(this,h),this.m=a.m}else a&&(u=String(a).match(dd))?(this.h=!1,Fs(this,u[1]||"",!0),this.o=_i(u[2]||""),this.g=_i(u[3]||"",!0),Us(this,u[4]),this.l=_i(u[5]||"",!0),hd(this,u[6]||"",!0),this.m=_i(u[7]||"")):(this.h=!1,this.i=new vi(null,this.h))}Sn.prototype.toString=function(){var a=[],u=this.j;u&&a.push(yi(u,fd,!0),":");var h=this.g;return(h||u=="file")&&(a.push("//"),(u=this.o)&&a.push(yi(u,fd,!0),"@"),a.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&a.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&a.push("/"),a.push(yi(h,h.charAt(0)=="/"?sy:iy,!0))),(h=this.i.toString())&&a.push("?",h),(h=this.m)&&a.push("#",yi(h,ay)),a.join("")};function St(a){return new Sn(a)}function Fs(a,u,h){a.j=h?_i(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function Us(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function hd(a,u,h){u instanceof vi?(a.i=u,cy(a.i,a.h)):(h||(u=yi(u,oy)),a.i=new vi(u,a.h))}function ge(a,u,h){a.i.set(u,h)}function Bs(a){return ge(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function _i(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function yi(a,u,h){return typeof a=="string"?(a=encodeURI(a).replace(u,ry),h&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function ry(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var fd=/[#\/\?@]/g,iy=/[#\?:]/g,sy=/[#\?]/g,oy=/[#\?@]/g,ay=/#/g;function vi(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Gt(a){a.g||(a.g=new Map,a.h=0,a.i&&ny(a.i,function(u,h){a.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=vi.prototype,n.add=function(a,u){Gt(this),this.i=null,a=hr(this,a);var h=this.g.get(a);return h||this.g.set(a,h=[]),h.push(u),this.h+=1,this};function pd(a,u){Gt(a),u=hr(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function md(a,u){return Gt(a),u=hr(a,u),a.g.has(u)}n.forEach=function(a,u){Gt(this),this.g.forEach(function(h,_){h.forEach(function(S){a.call(u,S,_,this)},this)},this)},n.na=function(){Gt(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let _=0;_<u.length;_++){const S=a[_];for(let C=0;C<S.length;C++)h.push(u[_])}return h},n.V=function(a){Gt(this);let u=[];if(typeof a=="string")md(this,a)&&(u=u.concat(this.g.get(hr(this,a))));else{a=Array.from(this.g.values());for(let h=0;h<a.length;h++)u=u.concat(a[h])}return u},n.set=function(a,u){return Gt(this),this.i=null,a=hr(this,a),md(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function gd(a,u,h){pd(a,u),0<h.length&&(a.i=null,a.g.set(hr(a,u),x(h)),a.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var _=u[h];const C=encodeURIComponent(String(_)),B=this.V(_);for(_=0;_<B.length;_++){var S=C;B[_]!==""&&(S+="="+encodeURIComponent(String(B[_]))),a.push(S)}}return this.i=a.join("&")};function hr(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function cy(a,u){u&&!a.j&&(Gt(a),a.i=null,a.g.forEach(function(h,_){var S=_.toLowerCase();_!=S&&(pd(this,_),gd(this,S,h))},a)),a.j=u}function ly(a,u){const h=new mi;if(c.Image){const _=new Image;_.onload=A(Kt,h,"TestLoadImage: loaded",!0,u,_),_.onerror=A(Kt,h,"TestLoadImage: error",!1,u,_),_.onabort=A(Kt,h,"TestLoadImage: abort",!1,u,_),_.ontimeout=A(Kt,h,"TestLoadImage: timeout",!1,u,_),c.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else u(!1)}function uy(a,u){const h=new mi,_=new AbortController,S=setTimeout(()=>{_.abort(),Kt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:_.signal}).then(C=>{clearTimeout(S),C.ok?Kt(h,"TestPingServer: ok",!0,u):Kt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(S),Kt(h,"TestPingServer: error",!1,u)})}function Kt(a,u,h,_,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),_(h)}catch{}}function dy(){this.g=new W_}function hy(a,u,h){const _=h||"";try{ud(a,function(S,C){let B=S;d(S)&&(B=Qa(S)),u.push(_+C+"="+encodeURIComponent(B))})}catch(S){throw u.push(_+"type="+encodeURIComponent("_badmap")),S}}function $s(a){this.l=a.Ub||null,this.j=a.eb||!1}k($s,Ya),$s.prototype.g=function(){return new js(this.l,this.j)},$s.prototype.i=function(a){return function(){return a}}({});function js(a,u){Fe.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(js,Fe),n=js.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,wi(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ii(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,wi(this)),this.g&&(this.readyState=3,wi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;_d(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function _d(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?Ii(this):wi(this),this.readyState==3&&_d(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ii(this))},n.Qa=function(a){this.g&&(this.response=a,Ii(this))},n.ga=function(){this.g&&Ii(this)};function Ii(a){a.readyState=4,a.l=null,a.j=null,a.v=null,wi(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,a.push(h[0]+": "+h[1]),h=u.next();return a.join(`\r
`)};function wi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(js.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function yd(a){let u="";return F(a,function(h,_){u+=_,u+=":",u+=h,u+=`\r
`}),u}function oc(a,u,h){e:{for(_ in h){var _=!1;break e}_=!0}_||(h=yd(h),typeof a=="string"?h!=null&&encodeURIComponent(String(h)):ge(a,u,h))}function we(a){Fe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(we,Fe);var fy=/^https?$/i,py=["POST","PUT"];n=we.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,h,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Za.g(),this.v=this.o?Wu(this.o):Wu(Za),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(C){vd(this,C);return}if(a=h||"",h=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var S in _)h.set(S,_[S]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const C of _.keys())h.set(C,_.get(C));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(h.keys()).find(C=>C.toLowerCase()=="content-type"),S=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(py,u,void 0))||_||S||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,B]of h)this.g.setRequestHeader(C,B);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ed(this),this.u=!0,this.g.send(a),this.u=!1}catch(C){vd(this,C)}};function vd(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,Id(a),qs(a)}function Id(a){a.A||(a.A=!0,Ge(a,"complete"),Ge(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ge(this,"complete"),Ge(this,"abort"),qs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),qs(this,!0)),we.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?wd(this):this.bb())},n.bb=function(){wd(this)};function wd(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Pt(a)!=4||a.Z()!=2)){if(a.u&&Pt(a)==4)qu(a.Ea,0,a);else if(Ge(a,"readystatechange"),Pt(a)==4){a.h=!1;try{const B=a.Z();e:switch(B){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var _;if(_=B===0){var S=String(a.D).match(dd)[1]||null;!S&&c.self&&c.self.location&&(S=c.self.location.protocol.slice(0,-1)),_=!fy.test(S?S.toLowerCase():"")}h=_}if(h)Ge(a,"complete"),Ge(a,"success");else{a.m=6;try{var C=2<Pt(a)?a.g.statusText:""}catch{C=""}a.l=C+" ["+a.Z()+"]",Id(a)}}finally{qs(a)}}}}function qs(a,u){if(a.g){Ed(a);const h=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||Ge(a,"ready");try{h.onreadystatechange=_}catch{}}}function Ed(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Pt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Pt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),K_(u)}};function Td(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function my(a){const u={};a=(a.g&&2<=Pt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(V(a[_]))continue;var h=E(a[_]);const S=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const C=u[S]||[];u[S]=C,C.push(h)}v(u,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ei(a,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[a]||u}function bd(a){this.Aa=0,this.i=[],this.j=new mi,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ei("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ei("baseRetryDelayMs",5e3,a),this.cb=Ei("retryDelaySeedMs",1e4,a),this.Wa=Ei("forwardChannelMaxRetries",2,a),this.wa=Ei("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new sd(a&&a.concurrentRequestLimit),this.Da=new dy,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=bd.prototype,n.la=8,n.G=1,n.connect=function(a,u,h,_){Ke(0),this.W=a,this.H=u||{},h&&_!==void 0&&(this.H.OSID=h,this.H.OAID=_),this.F=this.X,this.I=Nd(this,null,this.W),Gs(this)};function ac(a){if(Ad(a),a.G==3){var u=a.U++,h=St(a.I);if(ge(h,"SID",a.K),ge(h,"RID",u),ge(h,"TYPE","terminate"),Ti(a,h),u=new zt(a,a.j,u),u.L=2,u.v=Bs(St(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=u.v,h=!0),h||(u.g=Vd(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ms(u)}xd(a)}function zs(a){a.g&&(lc(a),a.g.cancel(),a.g=null)}function Ad(a){zs(a),a.u&&(c.clearTimeout(a.u),a.u=null),Ks(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function Gs(a){if(!od(a.h)&&!a.s){a.s=!0;var u=a.Ga;et||cr(),At||(et(),At=!0),Rt.add(u,a),a.B=0}}function gy(a,u){return ad(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=pi(T(a.Ga,a,u),Dd(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const S=new zt(this,this.j,a);let C=this.o;if(this.S&&(C?(C=y(C),I(C,this.S)):C=this.S),this.m!==null||this.O||(S.H=C,C=null),this.P)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var _=this.i[h];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(u+=_,4096<u){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=Sd(this,S,u),h=St(this.I),ge(h,"RID",a),ge(h,"CVER",22),this.D&&ge(h,"X-HTTP-Session-Id",this.D),Ti(this,h),C&&(this.O?u="headers="+encodeURIComponent(String(yd(C)))+"&"+u:this.m&&oc(h,this.m,C)),sc(this.h,S),this.Ua&&ge(h,"TYPE","init"),this.P?(ge(h,"$req",u),ge(h,"SID","null"),S.T=!0,tc(S,h,null)):tc(S,h,u),this.G=2}}else this.G==3&&(a?Rd(this,a):this.i.length==0||od(this.h)||Rd(this))};function Rd(a,u){var h;u?h=u.l:h=a.U++;const _=St(a.I);ge(_,"SID",a.K),ge(_,"RID",h),ge(_,"AID",a.T),Ti(a,_),a.m&&a.o&&oc(_,a.m,a.o),h=new zt(a,a.j,h,a.B+1),a.m===null&&(h.H=a.o),u&&(a.i=u.D.concat(a.i)),u=Sd(a,h,1e3),h.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),sc(a.h,h),tc(h,_,u)}function Ti(a,u){a.H&&F(a.H,function(h,_){ge(u,_,h)}),a.l&&ud({},function(h,_){ge(u,_,h)})}function Sd(a,u,h){h=Math.min(a.i.length,h);var _=a.l?T(a.l.Na,a.l,a):null;e:{var S=a.i;let C=-1;for(;;){const B=["count="+h];C==-1?0<h?(C=S[0].g,B.push("ofs="+C)):C=0:B.push("ofs="+C);let pe=!0;for(let Le=0;Le<h;Le++){let ce=S[Le].g;const Ue=S[Le].map;if(ce-=C,0>ce)C=Math.max(0,S[Le].g-100),pe=!1;else try{hy(Ue,B,"req"+ce+"_")}catch{_&&_(Ue)}}if(pe){_=B.join("&");break e}}}return a=a.i.splice(0,h),u.D=a,_}function Pd(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;et||cr(),At||(et(),At=!0),Rt.add(u,a),a.v=0}}function cc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=pi(T(a.Fa,a),Dd(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Cd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=pi(T(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ke(10),zs(this),Cd(this))};function lc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Cd(a){a.g=new zt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=St(a.qa);ge(u,"RID","rpc"),ge(u,"SID",a.K),ge(u,"AID",a.T),ge(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&ge(u,"TO",a.ja),ge(u,"TYPE","xmlhttp"),Ti(a,u),a.m&&a.o&&oc(u,a.m,a.o),a.L&&(a.g.I=a.L);var h=a.g;a=a.ia,h.L=1,h.v=Bs(St(u)),h.m=null,h.P=!0,nd(h,a)}n.Za=function(){this.C!=null&&(this.C=null,zs(this),cc(this),Ke(19))};function Ks(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function kd(a,u){var h=null;if(a.g==u){Ks(a),lc(a),a.g=null;var _=2}else if(ic(a.h,u))h=u.D,cd(a.h,u),_=1;else return;if(a.G!=0){if(u.o)if(_==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var S=a.B;_=Vs(),Ge(_,new Xu(_,h)),Gs(a)}else Pd(a);else if(S=u.s,S==3||S==0&&0<u.X||!(_==1&&gy(a,u)||_==2&&cc(a)))switch(h&&0<h.length&&(u=a.h,u.i=u.i.concat(h)),S){case 1:Pn(a,5);break;case 4:Pn(a,10);break;case 3:Pn(a,6);break;default:Pn(a,2)}}}function Dd(a,u){let h=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(h*=2),h*u}function Pn(a,u){if(a.j.info("Error code "+u),u==2){var h=T(a.fb,a),_=a.Xa;const S=!_;_=new Sn(_||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Fs(_,"https"),Bs(_),S?ly(_.toString(),h):uy(_.toString(),h)}else Ke(2);a.G=0,a.l&&a.l.sa(u),xd(a),Ad(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ke(2)):(this.j.info("Failed to ping google.com"),Ke(1))};function xd(a){if(a.G=0,a.ka=[],a.l){const u=ld(a.h);(u.length!=0||a.i.length!=0)&&(P(a.ka,u),P(a.ka,a.i),a.h.i.length=0,x(a.i),a.i.length=0),a.l.ra()}}function Nd(a,u,h){var _=h instanceof Sn?St(h):new Sn(h);if(_.g!="")u&&(_.g=u+"."+_.g),Us(_,_.s);else{var S=c.location;_=S.protocol,u=u?u+"."+S.hostname:S.hostname,S=+S.port;var C=new Sn(null);_&&Fs(C,_),u&&(C.g=u),S&&Us(C,S),h&&(C.l=h),_=C}return h=a.D,u=a.ya,h&&u&&ge(_,h,u),ge(_,"VER",a.la),Ti(a,_),_}function Vd(a,u,h){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new we(new $s({eb:h})):new we(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Od(){}n=Od.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ws(){}Ws.prototype.g=function(a,u){return new tt(a,u)};function tt(a,u){Fe.call(this),this.g=new bd(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!V(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!V(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new fr(this)}k(tt,Fe),tt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},tt.prototype.close=function(){ac(this.g)},tt.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var h={};h.__data__=a,a=h}else this.u&&(h={},h.__data__=Qa(a),a=h);u.i.push(new Z_(u.Ya++,a)),u.G==3&&Gs(u)},tt.prototype.N=function(){this.g.l=null,delete this.j,ac(this.g),delete this.g,tt.aa.N.call(this)};function Ld(a){Ja.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const h in u){a=h;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}k(Ld,Ja);function Md(){Xa.call(this),this.status=1}k(Md,Xa);function fr(a){this.g=a}k(fr,Od),fr.prototype.ua=function(){Ge(this.g,"a")},fr.prototype.ta=function(a){Ge(this.g,new Ld(a))},fr.prototype.sa=function(a){Ge(this.g,new Md)},fr.prototype.ra=function(){Ge(this.g,"b")},Ws.prototype.createWebChannel=Ws.prototype.g,tt.prototype.send=tt.prototype.o,tt.prototype.open=tt.prototype.m,tt.prototype.close=tt.prototype.close,Zp=function(){return new Ws},Xp=function(){return Vs()},Jp=An,Fc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Os.NO_ERROR=0,Os.TIMEOUT=8,Os.HTTP_ERROR=6,po=Os,Zu.COMPLETE="complete",Yp=Zu,Hu.EventType=hi,hi.OPEN="a",hi.CLOSE="b",hi.ERROR="c",hi.MESSAGE="d",Fe.prototype.listen=Fe.prototype.K,Di=Hu,we.prototype.listenOnce=we.prototype.L,we.prototype.getLastError=we.prototype.Ka,we.prototype.getLastErrorCode=we.prototype.Ba,we.prototype.getStatus=we.prototype.Z,we.prototype.getResponseJson=we.prototype.Oa,we.prototype.getResponseText=we.prototype.oa,we.prototype.send=we.prototype.ea,we.prototype.setWithCredentials=we.prototype.Ha,Qp=we}).apply(typeof Ys<"u"?Ys:typeof self<"u"?self:typeof window<"u"?window:{});const mh="@firebase/firestore",gh="4.7.7";/**
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
 */class We{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}We.UNAUTHENTICATED=new We(null),We.GOOGLE_CREDENTIALS=new We("google-credentials-uid"),We.FIRST_PARTY=new We("first-party-uid"),We.MOCK_USER=new We("mock-user");/**
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
 */let si="11.3.0";/**
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
 */const Hn=new ca("@firebase/firestore");function wr(){return Hn.logLevel}function M(n,...e){if(Hn.logLevel<=ie.DEBUG){const t=e.map(Cl);Hn.debug(`Firestore (${si}): ${n}`,...t)}}function He(n,...e){if(Hn.logLevel<=ie.ERROR){const t=e.map(Cl);Hn.error(`Firestore (${si}): ${n}`,...t)}}function Ji(n,...e){if(Hn.logLevel<=ie.WARN){const t=e.map(Cl);Hn.warn(`Firestore (${si}): ${n}`,...t)}}function Cl(n){if(typeof n=="string")return n;try{/**
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
 */function K(n="Unexpected state"){const e=`FIRESTORE (${si}) INTERNAL ASSERTION FAILED: `+n;throw He(e),new Error(e)}function H(n,e){n||K()}function X(n,e){return n}/**
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
 */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends Bt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class vt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class fE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class pE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(We.UNAUTHENTICATED))}shutdown(){}}class mE{constructor(e){this.t=e,this.currentUser=We.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){H(this.o===void 0);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new vt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new vt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new vt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string"),new fE(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return H(e===null||typeof e=="string"),new We(e)}}class gE{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=We.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class _E{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new gE(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(We.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class _h{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class yE{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,ut(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){H(this.o===void 0);const r=s=>{s.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,M("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new _h(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(H(typeof t.token=="string"),this.R=t.token,new _h(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function vE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function Uc(){return new TextEncoder}/**
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
 */class em{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=vE(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function J(n,e){return n<e?-1:n>e?1:0}function Bc(n,e){const t=Uc().encode(n),r=Uc().encode(e);for(let i=0;i<Math.min(t.length,r.length);i++){const s=J(t[i],r[i]);if(s!==0)return s}return J(t.length,r.length)}function Mr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function tm(n){return n+"\0"}/**
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
 */const yh=-62135596800,vh=1e6;class Ie{static now(){return Ie.fromMillis(Date.now())}static fromDate(e){return Ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*vh);return new Ie(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<yh)throw new U(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/vh}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-yh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class Q{static fromTimestamp(e){return new Q(e)}static min(){return new Q(new Ie(0,0))}static max(){return new Q(new Ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Ih="__name__";class pt{constructor(e,t,r){t===void 0?t=0:t>e.length&&K(),r===void 0?r=e.length-t:r>e.length-t&&K(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return pt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof pt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=pt.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return J(e.length,t.length)}static compareSegments(e,t){const r=pt.isNumericId(e),i=pt.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?pt.extractNumericId(e).compare(pt.extractNumericId(t)):Bc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ln.fromString(e.substring(4,e.length-2))}}class le extends pt{construct(e,t,r){return new le(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(D.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new le(t)}static emptyPath(){return new le([])}}const IE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ve extends pt{construct(e,t,r){return new ve(e,t,r)}static isValidIdentifier(e){return IE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ve.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ih}static keyField(){return new ve([Ih])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new U(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new U(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new U(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new U(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ve(t)}static emptyPath(){return new ve([])}}/**
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
 */class z{constructor(e){this.path=e}static fromPath(e){return new z(le.fromString(e))}static fromName(e){return new z(le.fromString(e).popFirst(5))}static empty(){return new z(le.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&le.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return le.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new z(new le(e.slice()))}}/**
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
 */const Xi=-1;class Vo{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function $c(n){return n.fields.find(e=>e.kind===2)}function Nn(n){return n.fields.filter(e=>e.kind!==2)}Vo.UNKNOWN_ID=-1;class mo{constructor(e,t){this.fieldPath=e,this.kind=t}}class Zi{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Zi(0,it.min())}}function wE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=Q.fromTimestamp(r===1e9?new Ie(t+1,0):new Ie(t,r));return new it(i,z.empty(),e)}function nm(n){return new it(n.readTime,n.key,Xi)}class it{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new it(Q.min(),z.empty(),Xi)}static max(){return new it(Q.max(),z.empty(),Xi)}}function kl(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=z.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
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
 */const rm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class im{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function ir(n){if(n.code!==D.FAILED_PRECONDITION||n.message!==rm)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&K(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):R.reject(t)}static resolve(e){return new R((t,r)=>{t(e)})}static reject(e){return new R((t,r)=>{r(e)})}static waitFor(e){return new R((t,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},l=>r(l))}),o=!0,s===i&&t()})}static or(e){let t=R.resolve(!1);for(const r of e)t=t.next(i=>i?R.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new R((r,i)=>{const s=e.length,o=new Array(s);let c=0;for(let l=0;l<s;l++){const d=l;t(e[d]).next(p=>{o[d]=p,++c,c===s&&r(o)},p=>i(p))}})}static doWhile(e,t){return new R((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}/**
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
 */const nt="SimpleDb";class fa{static open(e,t,r,i){try{return new fa(t,e.transaction(i,r))}catch(s){throw new Fi(t,s)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new vt,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new Fi(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const i=Dl(r.target.error);this.m.reject(new Fi(e,i))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(M(nt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new TE(t)}}class un{static delete(e){return M(nt,"Removing database:",e),On(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!aa())return!1;if(un.v())return!0;const e=De(),t=un.C(e),r=0<t&&t<10,i=sm(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,un.C(De())===12.2&&He("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(M(nt,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new Fi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new U(D.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new U(D.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Fi(e,o))},i.onupgradeneeded=s=>{M(nt,'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.O.B(o,i.transaction,s.oldVersion,this.version).next(()=>{M(nt,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.N(e);const c=fa.open(this.db,e,s?"readonly":"readwrite",r),l=i(c).next(d=>(c.S(),d)).catch(d=>(c.abort(d),R.reject(d))).toPromise();return l.catch(()=>{}),await c.p,l}catch(c){const l=c,d=l.name!=="FirebaseError"&&o<3;if(M(nt,"Transaction failed with error:",l.message,"Retrying:",d),this.close(),!d)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function sm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class EE{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return On(this.q.delete())}}class Fi extends U{constructor(e,t){super(D.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function In(n){return n.name==="IndexedDbTransactionError"}class TE{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(M(nt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(M(nt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),On(r)}add(e){return M(nt,"ADD",this.store.name,e,e),On(this.store.add(e))}get(e){return On(this.store.get(e)).next(t=>(t===void 0&&(t=null),M(nt,"GET",this.store.name,e,t),t))}delete(e){return M(nt,"DELETE",this.store.name,e),On(this.store.delete(e))}count(){return M(nt,"COUNT",this.store.name),On(this.store.count())}G(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new R((o,c)=>{s.onerror=l=>{c(l.target.error)},s.onsuccess=l=>{o(l.target.result)}})}{const s=this.cursor(r),o=[];return this.j(s,(c,l)=>{o.push(l)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new R((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}J(e,t){M(nt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const i=this.cursor(r);return this.j(i,(s,o,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.j(i,t)}X(e){const t=this.cursor({});return new R((r,i)=>{t.onerror=s=>{const o=Dl(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}j(e,t){const r=[];return new R((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void i();const l=new EE(c),d=t(c.primaryKey,c.value,l);if(d instanceof R){const p=d.catch(g=>(l.done(),R.reject(g)));r.push(p)}l.isDone?i():l.K===null?c.continue():c.continue(l.K)}}).next(()=>R.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function On(n){return new R((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=Dl(r.target.error);t(i)}})}let wh=!1;function Dl(n){const e=un.C(De());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new U("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return wh||(wh=!0,setTimeout(()=>{throw r},0)),r}}return n}const Ui="IndexBackfiller";class bE{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){M(Ui,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();M(Ui,`Documents written: ${t}`)}catch(t){In(t)?M(Ui,"Ignoring IndexedDB error during index backfill: ",t):await ir(t)}await this.te(6e4)})}}class AE{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let i=t,s=!0;return R.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return M(Ui,`Processing collection: ${o}`),this.ie(e,o,i).next(c=>{i-=c,r.add(o)});s=!1})).next(()=>t-i)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.se(i,s)).next(c=>(M(Ui,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}se(e,t){let r=e;return t.changes.forEach((i,s)=>{const o=nm(s);kl(o,r)>0&&(r=o)}),new it(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class ot{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}ot.ae=-1;/**
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
 */const qn=-1;function pa(n){return n==null}function es(n){return n===0&&1/n==-1/0}function RE(n){return typeof n=="number"&&Number.isInteger(n)&&!es(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Oo="";function ze(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Eh(e)),e=SE(n.get(t),e);return Eh(e)}function SE(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case Oo:t+="";break;default:t+=s}}return t}function Eh(n){return n+Oo+""}function mt(n){const e=n.length;if(H(e>=2),e===2)return H(n.charAt(0)===Oo&&n.charAt(1)===""),le.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf(Oo,s);switch((o<0||o>t)&&K(),n.charAt(o+1)){case"":const c=n.substring(s,o);let l;i.length===0?l=c:(i+=c,l=i,i=""),r.push(l);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:K()}s=o+2}return new le(r)}/**
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
 */const Vn="remoteDocuments",ws="owner",mr="owner",ts="mutationQueues",PE="userId",lt="mutations",Th="batchId",Un="userMutationsIndex",bh=["userId","batchId"];/**
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
 */function go(n,e){return[n,ze(e)]}function om(n,e,t){return[n,ze(e),t]}const CE={},Fr="documentMutations",Lo="remoteDocumentsV14",kE=["prefixPath","collectionGroup","readTime","documentId"],_o="documentKeyIndex",DE=["prefixPath","collectionGroup","documentId"],am="collectionGroupIndex",xE=["collectionGroup","readTime","prefixPath","documentId"],ns="remoteDocumentGlobal",jc="remoteDocumentGlobalKey",Ur="targets",cm="queryTargetsIndex",NE=["canonicalId","targetId"],Br="targetDocuments",VE=["targetId","path"],xl="documentTargetsIndex",OE=["path","targetId"],Mo="targetGlobalKey",zn="targetGlobal",rs="collectionParents",LE=["collectionId","parent"],$r="clientMetadata",ME="clientId",ma="bundles",FE="bundleId",ga="namedQueries",UE="name",Nl="indexConfiguration",BE="indexId",qc="collectionGroupIndex",$E="collectionGroup",Fo="indexState",jE=["indexId","uid"],lm="sequenceNumberIndex",qE=["uid","sequenceNumber"],Uo="indexEntries",zE=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],um="documentKeyIndex",GE=["indexId","uid","orderedDocumentKey"],_a="documentOverlays",KE=["userId","collectionPath","documentId"],zc="collectionPathOverlayIndex",WE=["userId","collectionPath","largestBatchId"],dm="collectionGroupOverlayIndex",HE=["userId","collectionGroup","largestBatchId"],Vl="globals",QE="name",hm=[ts,lt,Fr,Vn,Ur,ws,zn,Br,$r,ns,rs,ma,ga],YE=[...hm,_a],fm=[ts,lt,Fr,Lo,Ur,ws,zn,Br,$r,ns,rs,ma,ga,_a],pm=fm,Ol=[...pm,Nl,Fo,Uo],JE=Ol,XE=[...Ol,Vl];/**
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
 */class Gc extends im{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function xe(n,e){const t=X(n);return un.M(t.ue,e)}/**
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
 */function Ah(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function wn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function mm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class ye{constructor(e,t){this.comparator=e,this.root=t||Me.EMPTY}insert(e,t){return new ye(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Me.BLACK,null,null))}remove(e){return new ye(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Me.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Js(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Js(this.root,e,this.comparator,!1)}getReverseIterator(){return new Js(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Js(this.root,e,this.comparator,!0)}}class Js{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Me{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Me.RED,this.left=i??Me.EMPTY,this.right=s??Me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Me(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Me.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw K();const e=this.left.check();if(e!==this.right.check())throw K();return e+(this.isRed()?0:1)}}Me.EMPTY=null,Me.RED=!0,Me.BLACK=!1;Me.EMPTY=new class{constructor(){this.size=0}get key(){throw K()}get value(){throw K()}get color(){throw K()}get left(){throw K()}get right(){throw K()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Me(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class fe{constructor(e){this.comparator=e,this.data=new ye(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Rh(this.data.getIterator())}getIteratorFrom(e){return new Rh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof fe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new fe(this.comparator);return t.data=e,t}}class Rh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function gr(n){return n.hasNext()?n.getNext():void 0}/**
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
 */class Je{constructor(e){this.fields=e,e.sort(ve.comparator)}static empty(){return new Je([])}unionWith(e){let t=new fe(ve.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Mr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class gm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Se{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new gm("Invalid base64 string: "+s):s}}(e);return new Se(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Se(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Se.EMPTY_BYTE_STRING=new Se("");const ZE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Mt(n){if(H(!!n),typeof n=="string"){let e=0;const t=ZE.exec(n);if(H(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:_e(n.seconds),nanos:_e(n.nanos)}}function _e(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ft(n){return typeof n=="string"?Se.fromBase64String(n):Se.fromUint8Array(n)}/**
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
 */const _m="server_timestamp",ym="__type__",vm="__previous_value__",Im="__local_write_time__";function ya(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[ym])===null||t===void 0?void 0:t.stringValue)===_m}function va(n){const e=n.mapValue.fields[vm];return ya(e)?va(e):e}function is(n){const e=Mt(n.mapValue.fields[Im].timestampValue);return new Ie(e.seconds,e.nanos)}/**
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
 */class eT{constructor(e,t,r,i,s,o,c,l,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d}}const Bo="(default)";class Qn{constructor(e,t){this.projectId=e,this.database=t||Bo}static empty(){return new Qn("","")}get isDefaultDatabase(){return this.database===Bo}isEqual(e){return e instanceof Qn&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Ll="__type__",wm="__max__",rn={mapValue:{fields:{__type__:{stringValue:wm}}}},Ml="__vector__",jr="value",yo={nullValue:"NULL_VALUE"};function pn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ya(n)?4:Em(n)?9007199254740991:Ia(n)?10:11:K()}function wt(n,e){if(n===e)return!0;const t=pn(n);if(t!==pn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return is(n).isEqual(is(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Mt(i.timestampValue),c=Mt(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Ft(i.bytesValue).isEqual(Ft(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return _e(i.geoPointValue.latitude)===_e(s.geoPointValue.latitude)&&_e(i.geoPointValue.longitude)===_e(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return _e(i.integerValue)===_e(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=_e(i.doubleValue),c=_e(s.doubleValue);return o===c?es(o)===es(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return Mr(n.arrayValue.values||[],e.arrayValue.values||[],wt);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Ah(o)!==Ah(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!wt(o[l],c[l])))return!1;return!0}(n,e);default:return K()}}function ss(n,e){return(n.values||[]).find(t=>wt(t,e))!==void 0}function mn(n,e){if(n===e)return 0;const t=pn(n),r=pn(e);if(t!==r)return J(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(s,o){const c=_e(s.integerValue||s.doubleValue),l=_e(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Sh(n.timestampValue,e.timestampValue);case 4:return Sh(is(n),is(e));case 5:return Bc(n.stringValue,e.stringValue);case 6:return function(s,o){const c=Ft(s),l=Ft(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),l=o.split("/");for(let d=0;d<c.length&&d<l.length;d++){const p=J(c[d],l[d]);if(p!==0)return p}return J(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const c=J(_e(s.latitude),_e(o.latitude));return c!==0?c:J(_e(s.longitude),_e(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ph(n.arrayValue,e.arrayValue);case 10:return function(s,o){var c,l,d,p;const g=s.fields||{},T=o.fields||{},A=(c=g[jr])===null||c===void 0?void 0:c.arrayValue,k=(l=T[jr])===null||l===void 0?void 0:l.arrayValue,x=J(((d=A?.values)===null||d===void 0?void 0:d.length)||0,((p=k?.values)===null||p===void 0?void 0:p.length)||0);return x!==0?x:Ph(A,k)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===rn.mapValue&&o===rn.mapValue)return 0;if(s===rn.mapValue)return 1;if(o===rn.mapValue)return-1;const c=s.fields||{},l=Object.keys(c),d=o.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let g=0;g<l.length&&g<p.length;++g){const T=Bc(l[g],p[g]);if(T!==0)return T;const A=mn(c[l[g]],d[p[g]]);if(A!==0)return A}return J(l.length,p.length)}(n.mapValue,e.mapValue);default:throw K()}}function Sh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=Mt(n),r=Mt(e),i=J(t.seconds,r.seconds);return i!==0?i:J(t.nanos,r.nanos)}function Ph(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=mn(t[i],r[i]);if(s)return s}return J(t.length,r.length)}function qr(n){return Kc(n)}function Kc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Mt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Ft(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return z.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Kc(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Kc(t.fields[o])}`;return i+"}"}(n.mapValue):K()}function vo(n){switch(pn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=va(n);return e?16+vo(e):16;case 5:return 2*n.stringValue.length;case 6:return Ft(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+vo(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return wn(r.fields,(s,o)=>{i+=s.length+vo(o)}),i}(n.mapValue);default:throw K()}}function Yn(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Wc(n){return!!n&&"integerValue"in n}function os(n){return!!n&&"arrayValue"in n}function Ch(n){return!!n&&"nullValue"in n}function kh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Io(n){return!!n&&"mapValue"in n}function Ia(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Ll])===null||t===void 0?void 0:t.stringValue)===Ml}function Bi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return wn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Bi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Bi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Em(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===wm}const Tm={mapValue:{fields:{[Ll]:{stringValue:Ml},[jr]:{arrayValue:{}}}}};function tT(n){return"nullValue"in n?yo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Yn(Qn.empty(),z.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?Ia(n)?Tm:{mapValue:{}}:K()}function nT(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Yn(Qn.empty(),z.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Tm:"mapValue"in n?Ia(n)?{mapValue:{}}:rn:K()}function Dh(n,e){const t=mn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function xh(n,e){const t=mn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
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
 */class qe{constructor(e){this.value=e}static empty(){return new qe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Io(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Bi(t)}setAll(e){let t=ve.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=Bi(o):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());Io(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return wt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Io(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){wn(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new qe(Bi(this.value))}}function bm(n){const e=[];return wn(n.fields,(t,r)=>{const i=new ve([t]);if(Io(r)){const s=bm(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Je(e)}/**
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
 */class Te{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Te(e,0,Q.min(),Q.min(),Q.min(),qe.empty(),0)}static newFoundDocument(e,t,r,i){return new Te(e,1,t,Q.min(),r,i,0)}static newNoDocument(e,t){return new Te(e,2,t,Q.min(),Q.min(),qe.empty(),0)}static newUnknownDocument(e,t){return new Te(e,3,t,Q.min(),Q.min(),qe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=qe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=qe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Te&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Te(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class gn{constructor(e,t){this.position=e,this.inclusive=t}}function Nh(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=z.comparator(z.fromName(o.referenceValue),t.key):r=mn(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Vh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!wt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class as{constructor(e,t="asc"){this.field=e,this.dir=t}}function rT(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Am{}class se extends Am{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new iT(e,t,r):t==="array-contains"?new aT(e,r):t==="in"?new Dm(e,r):t==="not-in"?new cT(e,r):t==="array-contains-any"?new lT(e,r):new se(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new sT(e,r):new oT(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(mn(t,this.value)):t!==null&&pn(this.value)===pn(t)&&this.matchesComparison(mn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class he extends Am{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new he(e,t)}matches(e){return zr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function zr(n){return n.op==="and"}function Hc(n){return n.op==="or"}function Fl(n){return Rm(n)&&zr(n)}function Rm(n){for(const e of n.filters)if(e instanceof he)return!1;return!0}function Qc(n){if(n instanceof se)return n.field.canonicalString()+n.op.toString()+qr(n.value);if(Fl(n))return n.filters.map(e=>Qc(e)).join(",");{const e=n.filters.map(t=>Qc(t)).join(",");return`${n.op}(${e})`}}function Sm(n,e){return n instanceof se?function(r,i){return i instanceof se&&r.op===i.op&&r.field.isEqual(i.field)&&wt(r.value,i.value)}(n,e):n instanceof he?function(r,i){return i instanceof he&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&Sm(o,i.filters[c]),!0):!1}(n,e):void K()}function Pm(n,e){const t=n.filters.concat(e);return he.create(t,n.op)}function Cm(n){return n instanceof se?function(t){return`${t.field.canonicalString()} ${t.op} ${qr(t.value)}`}(n):n instanceof he?function(t){return t.op.toString()+" {"+t.getFilters().map(Cm).join(" ,")+"}"}(n):"Filter"}class iT extends se{constructor(e,t,r){super(e,t,r),this.key=z.fromName(r.referenceValue)}matches(e){const t=z.comparator(e.key,this.key);return this.matchesComparison(t)}}class sT extends se{constructor(e,t){super(e,"in",t),this.keys=km("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class oT extends se{constructor(e,t){super(e,"not-in",t),this.keys=km("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function km(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>z.fromName(r.referenceValue))}class aT extends se{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return os(t)&&ss(t.arrayValue,this.value)}}class Dm extends se{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ss(this.value.arrayValue,t)}}class cT extends se{constructor(e,t){super(e,"not-in",t)}matches(e){if(ss(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!ss(this.value.arrayValue,t)}}class lT extends se{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!os(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>ss(this.value.arrayValue,r))}}/**
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
 */class uT{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.le=null}}function Yc(n,e=null,t=[],r=[],i=null,s=null,o=null){return new uT(n,e,t,r,i,s,o)}function Jn(n){const e=X(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Qc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),pa(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>qr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>qr(r)).join(",")),e.le=t}return e.le}function Es(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!rT(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Sm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Vh(n.startAt,e.startAt)&&Vh(n.endAt,e.endAt)}function $o(n){return z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function jo(n,e){return n.filters.filter(t=>t instanceof se&&t.field.isEqual(e))}function Oh(n,e,t){let r=yo,i=!0;for(const s of jo(n,e)){let o=yo,c=!0;switch(s.op){case"<":case"<=":o=tT(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=yo}Dh({value:r,inclusive:i},{value:o,inclusive:c})<0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];Dh({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function Lh(n,e,t){let r=rn,i=!0;for(const s of jo(n,e)){let o=rn,c=!0;switch(s.op){case">=":case">":o=nT(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=rn}xh({value:r,inclusive:i},{value:o,inclusive:c})>0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];xh({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
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
 */class sr{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=l,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function dT(n,e,t,r,i,s,o,c){return new sr(n,e,t,r,i,s,o,c)}function Ts(n){return new sr(n)}function Mh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ul(n){return n.collectionGroup!==null}function Dr(n){const e=X(n);if(e.he===null){e.he=[];const t=new Set;for(const s of e.explicitOrderBy)e.he.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new fe(ve.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.he.push(new as(s,r))}),t.has(ve.keyField().canonicalString())||e.he.push(new as(ve.keyField(),r))}return e.he}function at(n){const e=X(n);return e.Pe||(e.Pe=hT(e,Dr(n))),e.Pe}function hT(n,e){if(n.limitType==="F")return Yc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new as(i.field,s)});const t=n.endAt?new gn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new gn(n.startAt.position,n.startAt.inclusive):null;return Yc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Jc(n,e){const t=n.filters.concat([e]);return new sr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function qo(n,e,t){return new sr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function wa(n,e){return Es(at(n),at(e))&&n.limitType===e.limitType}function xm(n){return`${Jn(at(n))}|lt:${n.limitType}`}function Er(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Cm(i)).join(", ")}]`),pa(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>qr(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>qr(i)).join(",")),`Target(${r})`}(at(n))}; limitType=${n.limitType})`}function bs(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):z.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Dr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,l){const d=Nh(o,c,l);return o.inclusive?d<=0:d<0}(r.startAt,Dr(r),i)||r.endAt&&!function(o,c,l){const d=Nh(o,c,l);return o.inclusive?d>=0:d>0}(r.endAt,Dr(r),i))}(n,e)}function fT(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Nm(n){return(e,t)=>{let r=!1;for(const i of Dr(n)){const s=pT(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function pT(n,e,t){const r=n.field.isKeyField()?z.comparator(e.key,t.key):function(s,o,c){const l=o.data.field(s),d=c.data.field(s);return l!==null&&d!==null?mn(l,d):K()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return K()}}/**
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
 */class $t{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){wn(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return mm(this.inner)}size(){return this.innerSize}}/**
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
 */const mT=new ye(z.comparator);function rt(){return mT}const Vm=new ye(z.comparator);function xi(...n){let e=Vm;for(const t of n)e=e.insert(t.key,t);return e}function Om(n){let e=Vm;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function gt(){return $i()}function Lm(){return $i()}function $i(){return new $t(n=>n.toString(),(n,e)=>n.isEqual(e))}const gT=new ye(z.comparator),_T=new fe(z.comparator);function re(...n){let e=_T;for(const t of n)e=e.add(t);return e}const yT=new fe(J);function vT(){return yT}/**
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
 */function Bl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:es(e)?"-0":e}}function Mm(n){return{integerValue:""+n}}function Fm(n,e){return RE(e)?Mm(e):Bl(n,e)}/**
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
 */class Ea{constructor(){this._=void 0}}function IT(n,e,t){return n instanceof cs?function(i,s){const o={fields:{[ym]:{stringValue:_m},[Im]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&ya(s)&&(s=va(s)),s&&(o.fields[vm]=s),{mapValue:o}}(t,e):n instanceof Gr?Bm(n,e):n instanceof Kr?$m(n,e):function(i,s){const o=Um(i,s),c=Fh(o)+Fh(i.Ie);return Wc(o)&&Wc(i.Ie)?Mm(c):Bl(i.serializer,c)}(n,e)}function wT(n,e,t){return n instanceof Gr?Bm(n,e):n instanceof Kr?$m(n,e):t}function Um(n,e){return n instanceof Wr?function(r){return Wc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class cs extends Ea{}class Gr extends Ea{constructor(e){super(),this.elements=e}}function Bm(n,e){const t=jm(e);for(const r of n.elements)t.some(i=>wt(i,r))||t.push(r);return{arrayValue:{values:t}}}class Kr extends Ea{constructor(e){super(),this.elements=e}}function $m(n,e){let t=jm(e);for(const r of n.elements)t=t.filter(i=>!wt(i,r));return{arrayValue:{values:t}}}class Wr extends Ea{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Fh(n){return _e(n.integerValue||n.doubleValue)}function jm(n){return os(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class qm{constructor(e,t){this.field=e,this.transform=t}}function ET(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Gr&&i instanceof Gr||r instanceof Kr&&i instanceof Kr?Mr(r.elements,i.elements,wt):r instanceof Wr&&i instanceof Wr?wt(r.Ie,i.Ie):r instanceof cs&&i instanceof cs}(n.transform,e.transform)}class TT{constructor(e,t){this.version=e,this.transformResults=t}}class Xe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Xe}static exists(e){return new Xe(void 0,e)}static updateTime(e){return new Xe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function wo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ta{}function zm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new $l(n.key,Xe.none()):new oi(n.key,n.data,Xe.none());{const t=n.data,r=qe.empty();let i=new fe(ve.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new jt(n.key,r,new Je(i.toArray()),Xe.none())}}function bT(n,e,t){n instanceof oi?function(i,s,o){const c=i.value.clone(),l=Bh(i.fieldTransforms,s,o.transformResults);c.setAll(l),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof jt?function(i,s,o){if(!wo(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=Bh(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(Gm(i)),l.setAll(c),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function ji(n,e,t,r){return n instanceof oi?function(s,o,c,l){if(!wo(s.precondition,o))return c;const d=s.value.clone(),p=$h(s.fieldTransforms,l,o);return d.setAll(p),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof jt?function(s,o,c,l){if(!wo(s.precondition,o))return c;const d=$h(s.fieldTransforms,l,o),p=o.data;return p.setAll(Gm(s)),p.setAll(d),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(s,o,c){return wo(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function AT(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=Um(r.transform,i||null);s!=null&&(t===null&&(t=qe.empty()),t.set(r.field,s))}return t||null}function Uh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Mr(r,i,(s,o)=>ET(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class oi extends Ta{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class jt extends Ta{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Gm(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Bh(n,e,t){const r=new Map;H(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,wT(o,c,t[i]))}return r}function $h(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,IT(s,o,e))}return r}class $l extends Ta{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Km extends Ta{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class jl{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&bT(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=ji(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=ji(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Lm();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const l=zm(o,c);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(Q.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),re())}isEqual(e){return this.batchId===e.batchId&&Mr(this.mutations,e.mutations,(t,r)=>Uh(t,r))&&Mr(this.baseMutations,e.baseMutations,(t,r)=>Uh(t,r))}}class ql{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){H(e.mutations.length===r.length);let i=function(){return gT}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new ql(e,t,r,i)}}/**
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
 */class zl{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class RT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Re,oe;function ST(n){switch(n){case D.OK:return K();case D.CANCELLED:case D.UNKNOWN:case D.DEADLINE_EXCEEDED:case D.RESOURCE_EXHAUSTED:case D.INTERNAL:case D.UNAVAILABLE:case D.UNAUTHENTICATED:return!1;case D.INVALID_ARGUMENT:case D.NOT_FOUND:case D.ALREADY_EXISTS:case D.PERMISSION_DENIED:case D.FAILED_PRECONDITION:case D.ABORTED:case D.OUT_OF_RANGE:case D.UNIMPLEMENTED:case D.DATA_LOSS:return!0;default:return K()}}function Wm(n){if(n===void 0)return He("GRPC error has no .code"),D.UNKNOWN;switch(n){case Re.OK:return D.OK;case Re.CANCELLED:return D.CANCELLED;case Re.UNKNOWN:return D.UNKNOWN;case Re.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case Re.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case Re.INTERNAL:return D.INTERNAL;case Re.UNAVAILABLE:return D.UNAVAILABLE;case Re.UNAUTHENTICATED:return D.UNAUTHENTICATED;case Re.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case Re.NOT_FOUND:return D.NOT_FOUND;case Re.ALREADY_EXISTS:return D.ALREADY_EXISTS;case Re.PERMISSION_DENIED:return D.PERMISSION_DENIED;case Re.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case Re.ABORTED:return D.ABORTED;case Re.OUT_OF_RANGE:return D.OUT_OF_RANGE;case Re.UNIMPLEMENTED:return D.UNIMPLEMENTED;case Re.DATA_LOSS:return D.DATA_LOSS;default:return K()}}(oe=Re||(Re={}))[oe.OK=0]="OK",oe[oe.CANCELLED=1]="CANCELLED",oe[oe.UNKNOWN=2]="UNKNOWN",oe[oe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",oe[oe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",oe[oe.NOT_FOUND=5]="NOT_FOUND",oe[oe.ALREADY_EXISTS=6]="ALREADY_EXISTS",oe[oe.PERMISSION_DENIED=7]="PERMISSION_DENIED",oe[oe.UNAUTHENTICATED=16]="UNAUTHENTICATED",oe[oe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",oe[oe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",oe[oe.ABORTED=10]="ABORTED",oe[oe.OUT_OF_RANGE=11]="OUT_OF_RANGE",oe[oe.UNIMPLEMENTED=12]="UNIMPLEMENTED",oe[oe.INTERNAL=13]="INTERNAL",oe[oe.UNAVAILABLE=14]="UNAVAILABLE",oe[oe.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const PT=new ln([4294967295,4294967295],0);function jh(n){const e=Uc().encode(n),t=new Hp;return t.update(e),new Uint8Array(t.digest())}function qh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new ln([t,r],0),new ln([i,s],0)]}class Gl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ni(`Invalid padding: ${t}`);if(r<0)throw new Ni(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ni(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ni(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=ln.fromNumber(this.Ee)}Ae(e,t,r){let i=e.add(t.multiply(ln.fromNumber(r)));return i.compare(PT)===1&&(i=new ln([i.getBits(0),i.getBits(1)],0)),i.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=jh(e),[r,i]=qh(t);for(let s=0;s<this.hashCount;s++){const o=this.Ae(r,i,s);if(!this.Re(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Gl(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ee===0)return;const t=jh(e),[r,i]=qh(t);for(let s=0;s<this.hashCount;s++){const o=this.Ae(r,i,s);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ni extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ba{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,As.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ba(Q.min(),i,new ye(J),rt(),re())}}class As{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new As(r,t,re(),re(),re())}}/**
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
 */class Eo{constructor(e,t,r,i){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=i}}class Hm{constructor(e,t){this.targetId=e,this.ge=t}}class Qm{constructor(e,t,r=Se.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class zh{constructor(){this.pe=0,this.ye=Gh(),this.we=Se.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=re(),t=re(),r=re();return this.ye.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:K()}}),new As(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=Gh()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,H(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class CT{constructor(e){this.ke=e,this.qe=new Map,this.Qe=rt(),this.$e=Xs(),this.Ue=Xs(),this.Ke=new ye(J)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:K()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,i)=>{this.Je(i)&&t(i)})}Ze(e){const t=e.targetId,r=e.ge.count,i=this.Xe(t);if(i){const s=i.target;if($o(s))if(r===0){const o=new z(s.path);this.ze(t,o,Te.newNoDocument(o,Q.min()))}else H(r===1);else{const o=this.et(t);if(o!==r){const c=this.tt(e),l=c?this.nt(c,e,o):1;if(l!==0){this.Ye(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=Ft(r).toUint8Array()}catch(l){if(l instanceof gm)return Ji("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Gl(o,i,s)}catch(l){return Ji(l instanceof Ni?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.ke.it(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,s,null),i++)}),i}ot(e){const t=new Map;this.qe.forEach((s,o)=>{const c=this.Xe(o);if(c){if(s.current&&$o(c.target)){const l=new z(c.target.path);this._t(l).has(o)||this.ut(o,l)||this.ze(o,l,Te.newNoDocument(l,e))}s.ve&&(t.set(o,s.Fe()),s.Me())}});let r=re();this.Ue.forEach((s,o)=>{let c=!0;o.forEachWhile(l=>{const d=this.Xe(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.Qe.forEach((s,o)=>o.setReadTime(e));const i=new ba(e,t,this.Ke,this.Qe,r);return this.Qe=rt(),this.$e=Xs(),this.Ue=Xs(),this.Ke=new ye(J),i}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const i=this.He(e);this.ut(e,t)?i.xe(t,1):i.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new zh,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new fe(J),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new fe(J),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||M("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new zh),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function Xs(){return new ye(z.comparator)}function Gh(){return new ye(z.comparator)}const kT={asc:"ASCENDING",desc:"DESCENDING"},DT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},xT={and:"AND",or:"OR"};class NT{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Xc(n,e){return n.useProto3Json||pa(e)?e:{value:e}}function Hr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ym(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function VT(n,e){return Hr(n,e.toTimestamp())}function Qe(n){return H(!!n),Q.fromTimestamp(function(t){const r=Mt(t);return new Ie(r.seconds,r.nanos)}(n))}function Kl(n,e){return Zc(n,e).canonicalString()}function Zc(n,e){const t=function(i){return new le(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Jm(n){const e=le.fromString(n);return H(og(e)),e}function zo(n,e){return Kl(n.databaseId,e.path)}function Gn(n,e){const t=Jm(e);if(t.get(1)!==n.databaseId.projectId)throw new U(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new z(eg(t))}function Xm(n,e){return Kl(n.databaseId,e)}function Zm(n){const e=Jm(n);return e.length===4?le.emptyPath():eg(e)}function el(n){return new le(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function eg(n){return H(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Kh(n,e,t){return{name:zo(n,e),fields:t.value.mapValue.fields}}function OT(n,e,t){const r=Gn(n,e.name),i=Qe(e.updateTime),s=e.createTime?Qe(e.createTime):Q.min(),o=new qe({mapValue:{fields:e.fields}}),c=Te.newFoundDocument(r,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function LT(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:K()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,p){return d.useProto3Json?(H(p===void 0||typeof p=="string"),Se.fromBase64String(p||"")):(H(p===void 0||p instanceof Buffer||p instanceof Uint8Array),Se.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(d){const p=d.code===void 0?D.UNKNOWN:Wm(d.code);return new U(p,d.message||"")}(o);t=new Qm(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Gn(n,r.document.name),s=Qe(r.document.updateTime),o=r.document.createTime?Qe(r.document.createTime):Q.min(),c=new qe({mapValue:{fields:r.document.fields}}),l=Te.newFoundDocument(i,s,o,c),d=r.targetIds||[],p=r.removedTargetIds||[];t=new Eo(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Gn(n,r.document),s=r.readTime?Qe(r.readTime):Q.min(),o=Te.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Eo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Gn(n,r.document),s=r.removedTargetIds||[];t=new Eo([],s,i,null)}else{if(!("filter"in e))return K();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new RT(i,s),c=r.targetId;t=new Hm(c,o)}}return t}function Go(n,e){let t;if(e instanceof oi)t={update:Kh(n,e.key,e.value)};else if(e instanceof $l)t={delete:zo(n,e.key)};else if(e instanceof jt)t={update:Kh(n,e.key,e.data),updateMask:jT(e.fieldMask)};else{if(!(e instanceof Km))return K();t={verify:zo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const c=o.transform;if(c instanceof cs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Gr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Kr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Wr)return{fieldPath:o.field.canonicalString(),increment:c.Ie};throw K()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:VT(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:K()}(n,e.precondition)),t}function tl(n,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?Xe.updateTime(Qe(s.updateTime)):s.exists!==void 0?Xe.exists(s.exists):Xe.none()}(e.currentDocument):Xe.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let l=null;if("setToServerValue"in c)H(c.setToServerValue==="REQUEST_TIME"),l=new cs;else if("appendMissingElements"in c){const p=c.appendMissingElements.values||[];l=new Gr(p)}else if("removeAllFromArray"in c){const p=c.removeAllFromArray.values||[];l=new Kr(p)}else"increment"in c?l=new Wr(o,c.increment):K();const d=ve.fromServerFormat(c.fieldPath);return new qm(d,l)}(n,i)):[];if(e.update){e.update.name;const i=Gn(n,e.update.name),s=new qe({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const d=l.fieldPaths||[];return new Je(d.map(p=>ve.fromServerFormat(p)))}(e.updateMask);return new jt(i,s,o,t,r)}return new oi(i,s,t,r)}if(e.delete){const i=Gn(n,e.delete);return new $l(i,t)}if(e.verify){const i=Gn(n,e.verify);return new Km(i,t)}return K()}function MT(n,e){return n&&n.length>0?(H(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?Qe(i.updateTime):Qe(s);return o.isEqual(Q.min())&&(o=Qe(s)),new TT(o,i.transformResults||[])}(t,e))):[]}function tg(n,e){return{documents:[Xm(n,e.path)]}}function ng(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Xm(n,i);const s=function(d){if(d.length!==0)return sg(he.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(d){if(d.length!==0)return d.map(p=>function(T){return{field:Tr(T.field),direction:UT(T.dir)}}(p))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Xc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ht:t,parent:i}}function rg(n){let e=Zm(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){H(r===1);const p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(g){const T=ig(g);return T instanceof he&&Fl(T)?T.getFilters():[T]}(t.where));let o=[];t.orderBy&&(o=function(g){return g.map(T=>function(k){return new as(br(k.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(T))}(t.orderBy));let c=null;t.limit&&(c=function(g){let T;return T=typeof g=="object"?g.value:g,pa(T)?null:T}(t.limit));let l=null;t.startAt&&(l=function(g){const T=!!g.before,A=g.values||[];return new gn(A,T)}(t.startAt));let d=null;return t.endAt&&(d=function(g){const T=!g.before,A=g.values||[];return new gn(A,T)}(t.endAt)),dT(e,i,o,s,c,"F",l,d)}function FT(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return K()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ig(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=br(t.unaryFilter.field);return se.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=br(t.unaryFilter.field);return se.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=br(t.unaryFilter.field);return se.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=br(t.unaryFilter.field);return se.create(o,"!=",{nullValue:"NULL_VALUE"});default:return K()}}(n):n.fieldFilter!==void 0?function(t){return se.create(br(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return K()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return he.create(t.compositeFilter.filters.map(r=>ig(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return K()}}(t.compositeFilter.op))}(n):K()}function UT(n){return kT[n]}function BT(n){return DT[n]}function $T(n){return xT[n]}function Tr(n){return{fieldPath:n.canonicalString()}}function br(n){return ve.fromServerFormat(n.fieldPath)}function sg(n){return n instanceof se?function(t){if(t.op==="=="){if(kh(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NAN"}};if(Ch(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(kh(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NOT_NAN"}};if(Ch(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Tr(t.field),op:BT(t.op),value:t.value}}}(n):n instanceof he?function(t){const r=t.getFilters().map(i=>sg(i));return r.length===1?r[0]:{compositeFilter:{op:$T(t.op),filters:r}}}(n):K()}function jT(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function og(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class xt{constructor(e,t,r,i,s=Q.min(),o=Q.min(),c=Se.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new xt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class ag{constructor(e){this.Tt=e}}function qT(n,e){let t;if(e.document)t=OT(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=z.fromSegments(e.noDocument.path),i=Zn(e.noDocument.readTime);t=Te.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return K();{const r=z.fromSegments(e.unknownDocument.path),i=Zn(e.unknownDocument.version);t=Te.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){const s=new Ie(i[0],i[1]);return Q.fromTimestamp(s)}(e.readTime)),t}function Wh(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ko(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:zo(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Hr(s,o.version.toTimestamp()),createTime:Hr(s,o.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Xn(e.version)};else{if(!e.isUnknownDocument())return K();r.unknownDocument={path:t.path.toArray(),version:Xn(e.version)}}return r}function Ko(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Xn(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Zn(n){const e=new Ie(n.seconds,n.nanoseconds);return Q.fromTimestamp(e)}function Ln(n,e){const t=(e.baseMutations||[]).map(s=>tl(n.Tt,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>tl(n.Tt,s)),i=Ie.fromMillis(e.localWriteTimeMs);return new jl(e.batchId,i,t,r)}function Vi(n){const e=Zn(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Zn(n.lastLimboFreeSnapshotVersion):Q.min();let r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){return H(s.documents.length===1),at(Ts(Zm(s.documents[0])))}(n.query):function(s){return at(rg(s))}(n.query),new xt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Se.fromBase64String(n.resumeToken))}function cg(n,e){const t=Xn(e.snapshotVersion),r=Xn(e.lastLimboFreeSnapshotVersion);let i;i=$o(e.target)?tg(n.Tt,e.target):ng(n.Tt,e.target).ht;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Jn(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function lg(n){const e=rg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?qo(e,e.limit,"L"):e}function yc(n,e){return new zl(e.largestBatchId,tl(n.Tt,e.overlayMutation))}function Hh(n,e){const t=e.path.lastSegment();return[n,ze(e.path.popLast()),t]}function Qh(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Xn(r.readTime),documentKey:ze(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
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
 */class zT{getBundleMetadata(e,t){return Yh(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:Zn(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return Yh(e).put(function(i){return{bundleId:i.id,createTime:Xn(Qe(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return Jh(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:lg(s.bundledQuery),readTime:Zn(s.readTime)}}(r)})}saveNamedQuery(e,t){return Jh(e).put(function(i){return{name:i.name,readTime:Xn(Qe(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function Yh(n){return xe(n,ma)}function Jh(n){return xe(n,ga)}/**
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
 */class Aa{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new Aa(e,r)}getOverlay(e,t){return bi(e).get(Hh(this.userId,t)).next(r=>r?yc(this.serializer,r):null)}getOverlays(e,t){const r=gt();return R.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){const i=[];return r.forEach((s,o)=>{const c=new zl(t,o);i.push(this.Et(e,c))}),R.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach(o=>i.add(ze(o.getCollectionPath())));const s=[];return i.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(bi(e).J(zc,c))}),R.waitFor(s)}getOverlaysForCollection(e,t,r){const i=gt(),s=ze(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return bi(e).G(zc,o).next(c=>{for(const l of c){const d=yc(this.serializer,l);i.set(d.getKey(),d)}return i})}getOverlaysForCollectionGroup(e,t,r,i){const s=gt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return bi(e).Z({index:dm,range:c},(l,d,p)=>{const g=yc(this.serializer,d);s.size()<i||g.largestBatchId===o?(s.set(g.getKey(),g),o=g.largestBatchId):p.done()}).next(()=>s)}Et(e,t){return bi(e).put(function(i,s,o){const[c,l,d]=Hh(s,o.mutation.key);return{userId:s,collectionPath:l,documentId:d,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Go(i.Tt,o.mutation)}}(this.serializer,this.userId,t))}}function bi(n){return xe(n,_a)}/**
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
 */class GT{dt(e){return xe(e,Vl)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?Se.fromUint8Array(r):Se.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class Mn{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(_e(e.integerValue));else if("doubleValue"in e){const r=_e(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),es(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=Mt(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(Ft(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?Em(e)?this.ft(t,Number.MAX_SAFE_INTEGER):Ia(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):K()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const i of Object.keys(r))this.wt(i,t),this.Rt(r[i],t)}vt(e,t){var r,i;const s=e.fields||{};this.ft(t,53);const o=jr,c=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.ft(t,15),t.gt(_e(c)),this.wt(o,t),this.Rt(s[o],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const i of r)this.Rt(i,t)}Dt(e,t){this.ft(t,37),z.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}Mn.xt=new Mn;/**
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
 */const _r=255;function KT(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Xh(n){const e=64-function(r){let i=0;for(let s=0;s<8;++s){const o=KT(255&r[s]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}class WT{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const i=t.codePointAt(0);this.Nt(240|i>>>18),this.Nt(128|63&i>>>12),this.Nt(128|63&i>>>6),this.Nt(128|63&i)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const i=t.codePointAt(0);this.kt(240|i>>>18),this.kt(128|63&i>>>12),this.kt(128|63&i>>>6),this.kt(128|63&i)}}this.qt()}Ut(e){const t=this.Kt(e),r=Xh(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Gt(e){const t=this.Kt(e),r=Xh(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}zt(){this.jt(_r),this.jt(255)}Ht(){this.Jt(_r),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===_r?(this.jt(_r),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===_r?(this.Jt(_r),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class HT{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class QT{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class Ai{constructor(){this.Zt=new WT,this.Xt=new HT(this.Zt),this.en=new QT(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
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
 */class Fn{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new Fn(this.indexId,this.documentKey,this.arrayValue,r)}}function Ht(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=Zh(n.arrayValue,e.arrayValue),t!==0?t:(t=Zh(n.directionalValue,e.directionalValue),t!==0?t:z.comparator(n.documentKey,e.documentKey)))}function Zh(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class ef{constructor(e){this.rn=new fe((t,r)=>ve.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(H(e.collectionGroup===this.collectionId),this.an)return!1;const t=$c(e);if(t!==void 0&&!this.cn(t))return!1;const r=Nn(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.cn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!i.has(c.field.canonicalString())){const l=r[s];if(!this.ln(c,l)||!this.hn(this.sn[o++],l))return!1}++s}for(;s<r.length;++s){const c=r[s];if(o>=this.sn.length||!this.hn(this.sn[o++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new fe(ve.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new mo(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new mo(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new mo(r.field,r.dir==="asc"?0:1)));return new Vo(Vo.UNKNOWN_ID,this.collectionId,t,Zi.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function ug(n){var e,t;if(H(n instanceof se||n instanceof he),n instanceof se){if(n instanceof Dm){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>se.create(n.field,"==",s)))||[];return he.create(i,"or")}return n}const r=n.filters.map(i=>ug(i));return he.create(r,n.op)}function YT(n){if(n.getFilters().length===0)return[];const e=il(ug(n));return H(dg(e)),nl(e)||rl(e)?[e]:e.getFilters()}function nl(n){return n instanceof se}function rl(n){return n instanceof he&&Fl(n)}function dg(n){return nl(n)||rl(n)||function(t){if(t instanceof he&&Hc(t)){for(const r of t.getFilters())if(!nl(r)&&!rl(r))return!1;return!0}return!1}(n)}function il(n){if(H(n instanceof se||n instanceof he),n instanceof se)return n;if(n.filters.length===1)return il(n.filters[0]);const e=n.filters.map(r=>il(r));let t=he.create(e,n.op);return t=Wo(t),dg(t)?t:(H(t instanceof he),H(zr(t)),H(t.filters.length>1),t.filters.reduce((r,i)=>Wl(r,i)))}function Wl(n,e){let t;return H(n instanceof se||n instanceof he),H(e instanceof se||e instanceof he),t=n instanceof se?e instanceof se?function(i,s){return he.create([i,s],"and")}(n,e):tf(n,e):e instanceof se?tf(e,n):function(i,s){if(H(i.filters.length>0&&s.filters.length>0),zr(i)&&zr(s))return Pm(i,s.getFilters());const o=Hc(i)?i:s,c=Hc(i)?s:i,l=o.filters.map(d=>Wl(d,c));return he.create(l,"or")}(n,e),Wo(t)}function tf(n,e){if(zr(e))return Pm(e,n.getFilters());{const t=e.filters.map(r=>Wl(n,r));return he.create(t,"or")}}function Wo(n){if(H(n instanceof se||n instanceof he),n instanceof se)return n;const e=n.getFilters();if(e.length===1)return Wo(e[0]);if(Rm(n))return n;const t=e.map(i=>Wo(i)),r=[];return t.forEach(i=>{i instanceof se?r.push(i):i instanceof he&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:he.create(r,n.op)}/**
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
 */class JT{constructor(){this.Tn=new Hl}addToCollectionParentIndex(e,t){return this.Tn.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(it.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(it.min())}updateCollectionGroup(e,t,r){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class Hl{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new fe(le.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new fe(le.comparator)).toArray()}}/**
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
 */const nf="IndexedDbIndexManager",Zs=new Uint8Array(0);class XT{constructor(e,t){this.databaseId=t,this.In=new Hl,this.En=new $t(r=>Jn(r),(r,i)=>Es(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const s={collectionId:r,parent:ze(i)};return rf(e).put(s)}return R.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[tm(t),""],!1,!0);return rf(e).G(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;r.push(mt(o.parent))}return r})}addFieldIndex(e,t){const r=Ri(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=vr(e);return s.next(c=>{o.put(Qh(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const r=Ri(e),i=vr(e),s=yr(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Ri(e),r=yr(e),i=vr(e);return t.J().next(()=>r.J()).next(()=>i.J())}createTargetIndexes(e,t){return R.forEach(this.dn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){const s=new ef(r).Pn();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const r=yr(e);let i=!0;const s=new Map;return R.forEach(this.dn(t),o=>this.An(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=re();const c=[];return R.forEach(s,(l,d)=>{M(nf,`Using index ${function(L){return`id=${L.indexId}|cg=${L.collectionGroup}|f=${L.fields.map($=>`${$.fieldPath}:${$.kind}`).join(",")}`}(l)} to execute ${Jn(t)}`);const p=function(L,$){const N=$c($);if(N===void 0)return null;for(const F of jo(L,N.fieldPath))switch(F.op){case"array-contains-any":return F.value.arrayValue.values||[];case"array-contains":return[F.value]}return null}(d,l),g=function(L,$){const N=new Map;for(const F of Nn($))for(const v of jo(L,F.fieldPath))switch(v.op){case"==":case"in":N.set(F.fieldPath.canonicalString(),v.value);break;case"not-in":case"!=":return N.set(F.fieldPath.canonicalString(),v.value),Array.from(N.values())}return null}(d,l),T=function(L,$){const N=[];let F=!0;for(const v of Nn($)){const y=v.kind===0?Oh(L,v.fieldPath,L.startAt):Lh(L,v.fieldPath,L.startAt);N.push(y.value),F&&(F=y.inclusive)}return new gn(N,F)}(d,l),A=function(L,$){const N=[];let F=!0;for(const v of Nn($)){const y=v.kind===0?Lh(L,v.fieldPath,L.endAt):Oh(L,v.fieldPath,L.endAt);N.push(y.value),F&&(F=y.inclusive)}return new gn(N,F)}(d,l),k=this.Rn(l,d,T),x=this.Rn(l,d,A),P=this.Vn(l,d,g),q=this.mn(l.indexId,p,k,T.inclusive,x,A.inclusive,P);return R.forEach(q,V=>r.H(V,t.limit).next(L=>{L.forEach($=>{const N=z.fromSegments($.documentKey);o.has(N)||(o=o.add(N),c.push(N))})}))}).next(()=>c)}return R.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=YT(he.create(e.filters,"and")).map(r=>Yc(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,i,s,o,c){const l=(t!=null?t.length:1)*Math.max(r.length,s.length),d=l/(t!=null?t.length:1),p=[];for(let g=0;g<l;++g){const T=t?this.fn(t[g/d]):Zs,A=this.gn(e,T,r[g%d],i),k=this.pn(e,T,s[g%d],o),x=c.map(P=>this.gn(e,T,P,!0));p.push(...this.createRange(A,k,x))}return p}gn(e,t,r,i){const s=new Fn(e,z.empty(),t,r);return i?s:s.nn()}pn(e,t,r,i){const s=new Fn(e,z.empty(),t,r);return i?s.nn():s}An(e,t){const r=new ef(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const c of s)r.un(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const i=this.dn(t);return R.forEach(i,s=>this.An(e,s).next(o=>{o?r!==0&&o.fields.length<function(l){let d=new fe(ve.comparator),p=!1;for(const g of l.filters)for(const T of g.getFlattenedFilters())T.field.isKeyField()||(T.op==="array-contains"||T.op==="array-contains-any"?p=!0:d=d.add(T.field));for(const g of l.orderBy)g.field.isKeyField()||(d=d.add(g.field));return d.size+(p?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&r===2?1:r)}yn(e,t){const r=new Ai;for(const i of Nn(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.tn(i.kind);Mn.xt.At(s,o)}return r.Yt()}fn(e){const t=new Ai;return Mn.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new Ai;return Mn.xt.At(Yn(this.databaseId,t),r.tn(function(s){const o=Nn(s);return o.length===0?0:o[o.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let i=[];i.push(new Ai);let s=0;for(const o of Nn(e)){const c=r[s++];for(const l of i)if(this.Sn(t,o.fieldPath)&&os(c))i=this.bn(i,o,c);else{const d=l.tn(o.kind);Mn.xt.At(c,d)}}return this.Dn(i)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const c of i){const l=new Ai;l.seed(c.Yt()),Mn.xt.At(o,l.tn(t.kind)),s.push(l)}return s}Sn(e,t){return!!e.filters.find(r=>r instanceof se&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=Ri(e),i=vr(e);return(t?r.G(qc,IDBKeyRange.bound(t,t)):r.G()).next(s=>{const o=[];return R.forEach(s,c=>i.get([c.indexId,this.uid]).next(l=>{o.push(function(p,g){const T=g?new Zi(g.sequenceNumber,new it(Zn(g.readTime),new z(mt(g.documentKey)),g.largestBatchId)):Zi.empty(),A=p.fields.map(([k,x])=>new mo(ve.fromServerFormat(k),x));return new Vo(p.indexId,p.collectionGroup,A,T)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:J(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const i=Ri(e),s=vr(e);return this.vn(e).next(o=>i.G(qc,IDBKeyRange.bound(t,t)).next(c=>R.forEach(c,l=>s.put(Qh(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return R.forEach(t,(i,s)=>{const o=r.get(i.collectionGroup);return(o?R.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(r.set(i.collectionGroup,c),R.forEach(c,l=>this.Cn(e,i,l).next(d=>{const p=this.Fn(s,l);return d.isEqual(p)?R.resolve():this.Mn(e,s,l,d,p)}))))})}xn(e,t,r,i){return yr(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,i){return yr(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const i=yr(e);let s=new fe(Ht);return i.Z({index:um,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(o,c)=>{s=s.add(new Fn(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}Fn(e,t){let r=new fe(Ht);const i=this.yn(t,e);if(i==null)return r;const s=$c(t);if(s!=null){const o=e.data.field(s.fieldPath);if(os(o))for(const c of o.arrayValue.values||[])r=r.add(new Fn(t.indexId,e.key,this.fn(c),i))}else r=r.add(new Fn(t.indexId,e.key,Zs,i));return r}Mn(e,t,r,i,s){M(nf,"Updating index entries for document '%s'",t.key);const o=[];return function(l,d,p,g,T){const A=l.getIterator(),k=d.getIterator();let x=gr(A),P=gr(k);for(;x||P;){let q=!1,V=!1;if(x&&P){const L=p(x,P);L<0?V=!0:L>0&&(q=!0)}else x!=null?V=!0:q=!0;q?(g(P),P=gr(k)):V?(T(x),x=gr(A)):(x=gr(A),P=gr(k))}}(i,s,Ht,c=>{o.push(this.xn(e,t,r,c))},c=>{o.push(this.On(e,t,r,c))}),R.waitFor(o)}vn(e){let t=1;return vr(e).Z({index:lm,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>Ht(o,c)).filter((o,c,l)=>!c||Ht(o,l[c-1])!==0);const i=[];i.push(e);for(const o of r){const c=Ht(o,e),l=Ht(o,t);if(c===0)i[0]=e.nn();else if(c>0&&l<0)i.push(o),i.push(o.nn());else if(l>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Nn(i[o],i[o+1]))return[];const c=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Zs,[]],l=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Zs,[]];s.push(IDBKeyRange.bound(c,l))}return s}Nn(e,t){return Ht(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(sf)}getMinOffset(e,t){return R.mapArray(this.dn(t),r=>this.An(e,r).next(i=>i||K())).next(sf)}}function rf(n){return xe(n,rs)}function yr(n){return xe(n,Uo)}function Ri(n){return xe(n,Nl)}function vr(n){return xe(n,Fo)}function sf(n){H(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;kl(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new it(e.readTime,e.documentKey,t)}/**
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
 */const of={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},hg=41943040;class je{static withCacheSize(e){return new je(e,je.DEFAULT_COLLECTION_PERCENTILE,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */function fg(n,e,t){const r=n.store(lt),i=n.store(Fr),s=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=r.Z({range:o},(p,g,T)=>(c++,T.delete()));s.push(l.next(()=>{H(c===1)}));const d=[];for(const p of t.mutations){const g=om(e,p.key.path,t.batchId);s.push(i.delete(g)),d.push(p.key)}return R.waitFor(s).next(()=>d)}function Ho(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw K();e=n.noDocument}return JSON.stringify(e).length}/**
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
 */je.DEFAULT_COLLECTION_PERCENTILE=10,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,je.DEFAULT=new je(hg,je.DEFAULT_COLLECTION_PERCENTILE,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),je.DISABLED=new je(-1,0,0);class Ra{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Bn={}}static It(e,t,r,i){H(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Ra(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Qt(e).Z({index:Un,range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){const s=Ar(e),o=Qt(e);return o.add({}).next(c=>{H(typeof c=="number");const l=new jl(c,t,r,i),d=function(A,k,x){const P=x.baseMutations.map(V=>Go(A.Tt,V)),q=x.mutations.map(V=>Go(A.Tt,V));return{userId:k,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:P,mutations:q}}(this.serializer,this.userId,l),p=[];let g=new fe((T,A)=>J(T.canonicalString(),A.canonicalString()));for(const T of i){const A=om(this.userId,T.key.path,c);g=g.add(T.key.path.popLast()),p.push(o.put(d)),p.push(s.put(A,CE))}return g.forEach(T=>{p.push(this.indexManager.addToCollectionParentIndex(e,T))}),e.addOnCommittedListener(()=>{this.Bn[c]=l.keys()}),R.waitFor(p).next(()=>l)})}lookupMutationBatch(e,t){return Qt(e).get(t).next(r=>r?(H(r.userId===this.userId),Ln(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?R.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const i=r.keys();return this.Bn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return Qt(e).Z({index:Un,range:i},(o,c,l)=>{c.userId===this.userId&&(H(c.batchId>=r),s=Ln(this.serializer,c)),l.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=qn;return Qt(e).Z({index:Un,range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,qn],[this.userId,Number.POSITIVE_INFINITY]);return Qt(e).G(Un,t).next(r=>r.map(i=>Ln(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=go(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return Ar(e).Z({range:i},(o,c,l)=>{const[d,p,g]=o,T=mt(p);if(d===this.userId&&t.path.isEqual(T))return Qt(e).get(g).next(A=>{if(!A)throw K();H(A.userId===this.userId),s.push(Ln(this.serializer,A))});l.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new fe(J);const i=[];return t.forEach(s=>{const o=go(this.userId,s.path),c=IDBKeyRange.lowerBound(o),l=Ar(e).Z({range:c},(d,p,g)=>{const[T,A,k]=d,x=mt(A);T===this.userId&&s.path.isEqual(x)?r=r.add(k):g.done()});i.push(l)}),R.waitFor(i).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=go(this.userId,r),o=IDBKeyRange.lowerBound(s);let c=new fe(J);return Ar(e).Z({range:o},(l,d,p)=>{const[g,T,A]=l,k=mt(T);g===this.userId&&r.isPrefixOf(k)?k.length===i&&(c=c.add(A)):p.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],i=[];return t.forEach(s=>{i.push(Qt(e).get(s).next(o=>{if(o===null)throw K();H(o.userId===this.userId),r.push(Ln(this.serializer,o))}))}),R.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return fg(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),R.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return R.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return Ar(e).Z({range:r},(s,o,c)=>{if(s[0]===this.userId){const l=mt(s[1]);i.push(l)}else c.done()}).next(()=>{H(i.length===0)})})}containsKey(e,t){return pg(e,this.userId,t)}Qn(e){return mg(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:qn,lastStreamToken:""})}}function pg(n,e,t){const r=go(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Ar(n).Z({range:s,Y:!0},(c,l,d)=>{const[p,g,T]=c;p===e&&g===i&&(o=!0),d.done()}).next(()=>o)}function Qt(n){return xe(n,lt)}function Ar(n){return xe(n,Fr)}function mg(n){return xe(n,ts)}/**
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
 */class er{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new er(0)}static Kn(){return new er(-1)}}/**
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
 */class ZT{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new er(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>Q.fromTimestamp(new Ie(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Gn(e,i)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Ir(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(H(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let i=0;const s=[];return Ir(e).Z((o,c)=>{const l=Vi(c);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(i++,s.push(this.removeTargetData(e,l)))}).next(()=>R.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Ir(e).Z((r,i)=>{const s=Vi(i);t(s)})}Wn(e){return af(e).get(Mo).next(t=>(H(t!==null),t))}Gn(e,t){return af(e).put(Mo,t)}zn(e,t){return Ir(e).put(cg(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=Jn(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return Ir(e).Z({range:i,index:cm},(o,c,l)=>{const d=Vi(c);Es(t,d.target)&&(s=d,l.done())}).next(()=>s)}addMatchingKeys(e,t,r){const i=[],s=nn(e);return t.forEach(o=>{const c=ze(o.path);i.push(s.put({targetId:r,path:c})),i.push(this.referenceDelegate.addReference(e,r,o))}),R.waitFor(i)}removeMatchingKeys(e,t,r){const i=nn(e);return R.forEach(t,s=>{const o=ze(s.path);return R.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){const r=nn(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=nn(e);let s=re();return i.Z({range:r,Y:!0},(o,c,l)=>{const d=mt(o[1]),p=new z(d);s=s.add(p)}).next(()=>s)}containsKey(e,t){const r=ze(t.path),i=IDBKeyRange.bound([r],[tm(r)],!1,!0);let s=0;return nn(e).Z({index:xl,Y:!0,range:i},([o,c],l,d)=>{o!==0&&(s++,d.done())}).next(()=>s>0)}lt(e,t){return Ir(e).get(t).next(r=>r?Vi(r):null)}}function Ir(n){return xe(n,Ur)}function af(n){return xe(n,zn)}function nn(n){return xe(n,Br)}/**
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
 */const cf="LruGarbageCollector",gg=1048576;function lf([n,e],[t,r]){const i=J(n,t);return i===0?J(e,r):i}class eb{constructor(e){this.Hn=e,this.buffer=new fe(lf),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();lf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class _g{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){M(cf,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){In(t)?M(cf,"Ignoring IndexedDB error during garbage collection: ",t):await ir(t)}await this.er(3e5)})}}class tb{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return R.resolve(ot.ae);const r=new eb(t);return this.tr.forEachTarget(e,i=>r.Zn(i.sequenceNumber)).next(()=>this.tr.rr(e,i=>r.Zn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(M("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(of)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),of):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,i,s,o,c,l,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(M("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),i=this.params.maximumSequenceNumbersToCollect):i=g,o=Date.now(),this.nthSequenceNumber(e,i))).next(g=>(r=g,c=Date.now(),this.removeTargets(e,r,t))).next(g=>(s=g,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(d=Date.now(),wr()<=ie.DEBUG&&M("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${g} documents in `+(d-l)+`ms
Total Duration: ${d-p}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:g})))}}function yg(n,e){return new tb(n,e)}/**
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
 */class nb{constructor(e,t){this.db=e,this.garbageCollector=yg(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,i)=>t(i))}addReference(e,t,r){return eo(e,r)}removeReference(e,t,r){return eo(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return eo(e,t)}ar(e,t){return function(i,s){let o=!1;return mg(i).X(c=>pg(i,c,s).next(l=>(l&&(o=!0),R.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this._r(e,(o,c)=>{if(c<=t){const l=this.ar(e,o).next(d=>{if(!d)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,Q.min()),nn(e).delete(function(g){return[0,ze(g.path)]}(o))))});i.push(l)}}).next(()=>R.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return eo(e,t)}_r(e,t){const r=nn(e);let i,s=ot.ae;return r.Z({index:xl},([o,c],{path:l,sequenceNumber:d})=>{o===0?(s!==ot.ae&&t(new z(mt(i)),s),s=d,i=l):s=ot.ae}).next(()=>{s!==ot.ae&&t(new z(mt(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function eo(n,e){return nn(n).put(function(r,i){return{targetId:0,path:ze(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}/**
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
 */class vg{constructor(){this.changes=new $t(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Te.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?R.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class rb{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Cn(e).put(r)}removeEntry(e,t,r){return Cn(e).delete(function(s,o){const c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Ko(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=Te.newInvalidDocument(t);return Cn(e).Z({index:_o,range:IDBKeyRange.only(Si(t))},(i,s)=>{r=this.cr(t,s)}).next(()=>r)}lr(e,t){let r={size:0,document:Te.newInvalidDocument(t)};return Cn(e).Z({index:_o,range:IDBKeyRange.only(Si(t))},(i,s)=>{r={document:this.cr(t,s),size:Ho(s)}}).next(()=>r)}getEntries(e,t){let r=rt();return this.hr(e,t,(i,s)=>{const o=this.cr(i,s);r=r.insert(i,o)}).next(()=>r)}Pr(e,t){let r=rt(),i=new ye(z.comparator);return this.hr(e,t,(s,o)=>{const c=this.cr(s,o);r=r.insert(s,c),i=i.insert(s,Ho(o))}).next(()=>({documents:r,Tr:i}))}hr(e,t,r){if(t.isEmpty())return R.resolve();let i=new fe(hf);t.forEach(l=>i=i.add(l));const s=IDBKeyRange.bound(Si(i.first()),Si(i.last())),o=i.getIterator();let c=o.getNext();return Cn(e).Z({index:_o,range:s},(l,d,p)=>{const g=z.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;c&&hf(c,g)<0;)r(c,null),c=o.getNext();c&&c.isEqual(g)&&(r(c,d),c=o.hasNext()?o.getNext():null),c?p.W(Si(c)):p.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Ko(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Cn(e).G(IDBKeyRange.bound(c,l,!0)).next(d=>{s?.incrementDocumentReadCount(d.length);let p=rt();for(const g of d){const T=this.cr(z.fromSegments(g.prefixPath.concat(g.collectionGroup,g.documentId)),g);T.isFoundDocument()&&(bs(t,T)||i.has(T.key))&&(p=p.insert(T.key,T))}return p})}getAllFromCollectionGroup(e,t,r,i){let s=rt();const o=df(t,r),c=df(t,it.max());return Cn(e).Z({index:am,range:IDBKeyRange.bound(o,c,!0)},(l,d,p)=>{const g=this.cr(z.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);s=s.insert(g.key,g),s.size===i&&p.done()}).next(()=>s)}newChangeBuffer(e){return new ib(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return uf(e).get(jc).next(t=>(H(!!t),t))}ur(e,t){return uf(e).put(jc,t)}cr(e,t){if(t){const r=qT(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(Q.min())))return r}return Te.newInvalidDocument(e)}}function Ig(n){return new rb(n)}class ib extends vg{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new $t(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const t=[];let r=0,i=new fe((s,o)=>J(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const c=this.Er.get(s);if(t.push(this.Ir.removeEntry(e,s,c.readTime)),o.isValidDocument()){const l=Wh(this.Ir.serializer,o);i=i.add(s.path.popLast());const d=Ho(l);r+=d-c.size,t.push(this.Ir.addEntry(e,s,l))}else if(r-=c.size,this.trackRemovals){const l=Wh(this.Ir.serializer,o.convertToNoDocument(Q.min()));t.push(this.Ir.addEntry(e,s,l))}}),i.forEach(s=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.Ir.updateMetadata(e,r)),R.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:i})=>(i.forEach((s,o)=>{this.Er.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function uf(n){return xe(n,ns)}function Cn(n){return xe(n,Lo)}function Si(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function df(n,e){const t=e.documentKey.path.toArray();return[n,Ko(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function hf(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=J(t[s],r[s]),i)return i;return i=J(t.length,r.length),i||(i=J(t[t.length-2],r[r.length-2]),i||J(t[t.length-1],r[r.length-1]))}/**
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
 */class sb{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class wg{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&ji(r.mutation,i,Je.empty(),Ie.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,re()).next(()=>r))}getLocalViewOfDocuments(e,t,r=re()){const i=gt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=xi();return s.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=gt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,re()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=rt();const o=$i(),c=function(){return $i()}();return t.forEach((l,d)=>{const p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof jt)?s=s.insert(d.key,d):p!==void 0?(o.set(d.key,p.mutation.getFieldMask()),ji(p.mutation,d,p.mutation.getFieldMask(),Ie.now())):o.set(d.key,Je.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,p)=>o.set(d,p)),t.forEach((d,p)=>{var g;return c.set(d,new sb(p,(g=o.get(d))!==null&&g!==void 0?g:null))}),c))}recalculateAndSaveOverlays(e,t){const r=$i();let i=new ye((o,c)=>o-c),s=re();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let p=r.get(l)||Je.empty();p=c.applyToLocalView(d,p),r.set(l,p);const g=(i.get(c.batchId)||re()).add(l);i=i.insert(c.batchId,g)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),d=l.key,p=l.value,g=Lm();p.forEach(T=>{if(!s.has(T)){const A=zm(t.get(T),r.get(T));A!==null&&g.set(T,A),s=s.add(T)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,g))}return R.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return z.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ul(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):R.resolve(gt());let c=Xi,l=s;return o.next(d=>R.forEach(d,(p,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),s.get(p)?R.resolve():this.remoteDocumentCache.getEntry(e,p).next(T=>{l=l.insert(p,T)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,re())).next(p=>({batchId:c,changes:Om(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new z(t)).next(r=>{let i=xi();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=xi();return this.indexManager.getCollectionParents(e,s).next(c=>R.forEach(c,l=>{const d=function(g,T){return new sr(T,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((g,T)=>{o=o.insert(g,T)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((l,d)=>{const p=d.getKey();o.get(p)===null&&(o=o.insert(p,Te.newInvalidDocument(p)))});let c=xi();return o.forEach((l,d)=>{const p=s.get(l);p!==void 0&&ji(p.mutation,d,Je.empty(),Ie.now()),bs(t,d)&&(c=c.insert(l,d))}),c})}}/**
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
 */class ob{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return R.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Qe(i.createTime)}}(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(i){return{name:i.name,query:lg(i.bundledQuery),readTime:Qe(i.readTime)}}(t)),R.resolve()}}/**
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
 */class ab{constructor(){this.overlays=new ye(z.comparator),this.Rr=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const r=gt();return R.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.Et(e,t,s)}),R.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Rr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Rr.delete(r)),R.resolve()}getOverlaysForCollection(e,t,r){const i=gt(),s=t.length+1,o=new z(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return R.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new ye((d,p)=>d-p);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=s.get(d.largestBatchId);p===null&&(p=gt(),s=s.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=gt(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=i)););return R.resolve(c)}Et(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Rr.get(i.largestBatchId).delete(r.key);this.Rr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new zl(t,r));let s=this.Rr.get(t);s===void 0&&(s=re(),this.Rr.set(t,s)),this.Rr.set(t,s.add(r.key))}}/**
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
 */class cb{constructor(){this.sessionToken=Se.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
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
 */class Ql{constructor(){this.Vr=new fe(Oe.mr),this.gr=new fe(Oe.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new Oe(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new Oe(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new z(new le([])),r=new Oe(t,e),i=new Oe(t,e+1),s=[];return this.gr.forEachInRange([r,i],o=>{this.wr(o),s.push(o.key)}),s}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new z(new le([])),r=new Oe(t,e),i=new Oe(t,e+1);let s=re();return this.gr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new Oe(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Oe{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return z.comparator(e.key,t.key)||J(e.Cr,t.Cr)}static pr(e,t){return J(e.Cr,t.Cr)||z.comparator(e.key,t.key)}}/**
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
 */class lb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new fe(Oe.mr)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new jl(s,t,r,i);this.mutationQueue.push(o);for(const c of i)this.Mr=this.Mr.add(new Oe(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return R.resolve(o)}lookupMutationBatch(e,t){return R.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Nr(r),s=i<0?0:i;return R.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?qn:this.Fr-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Oe(t,0),i=new Oe(t,Number.POSITIVE_INFINITY),s=[];return this.Mr.forEachInRange([r,i],o=>{const c=this.Or(o.Cr);s.push(c)}),R.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new fe(J);return t.forEach(i=>{const s=new Oe(i,0),o=new Oe(i,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([s,o],c=>{r=r.add(c.Cr)})}),R.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;z.isDocumentKey(s)||(s=s.child(""));const o=new Oe(new z(s),0);let c=new fe(J);return this.Mr.forEachWhile(l=>{const d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(l.Cr)),!0)},o),R.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const i=this.Or(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){H(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return R.forEach(t.mutations,i=>{const s=new Oe(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new Oe(t,0),i=this.Mr.firstAfterOrEqual(r);return R.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class ub{constructor(e){this.kr=e,this.docs=function(){return new ye(z.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return R.resolve(r?r.document.mutableCopy():Te.newInvalidDocument(t))}getEntries(e,t){let r=rt();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Te.newInvalidDocument(i))}),R.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=rt();const o=t.path,c=new z(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:d,value:{document:p}}=l.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||kl(nm(p),r)<=0||(i.has(p.key)||bs(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return R.resolve(s)}getAllFromCollectionGroup(e,t,r,i){K()}qr(e,t){return R.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new db(this)}getSize(e){return R.resolve(this.size)}}class db extends vg{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Ir.addEntry(e,i)):this.Ir.removeEntry(r)}),R.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
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
 */class hb{constructor(e){this.persistence=e,this.Qr=new $t(t=>Jn(t),Es),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.$r=0,this.Ur=new Ql,this.targetCount=0,this.Kr=er.Un()}forEachTarget(e,t){return this.Qr.forEach((r,i)=>t(i)),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),R.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new er(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.zn(t),R.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Qr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),R.waitFor(s).next(()=>i)}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return R.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),R.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),R.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),R.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return R.resolve(r)}containsKey(e,t){return R.resolve(this.Ur.containsKey(t))}}/**
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
 */class Yl{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new ot(0),this.zr=!1,this.zr=!0,this.jr=new cb,this.referenceDelegate=e(this),this.Hr=new hb(this),this.indexManager=new JT,this.remoteDocumentCache=function(i){return new ub(i)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new ag(t),this.Yr=new ob(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new ab,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new lb(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);const i=new fb(this.Gr.next());return this.referenceDelegate.Zr(),r(i).next(s=>this.referenceDelegate.Xr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}ei(e,t){return R.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class fb extends im{constructor(e){super(),this.currentSequenceNumber=e}}class Sa{constructor(e){this.persistence=e,this.ti=new Ql,this.ni=null}static ri(e){return new Sa(e)}get ii(){if(this.ni)return this.ni;throw K()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),R.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),R.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(i=>this.ii.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.ii.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.ii,r=>{const i=z.fromPath(r);return this.si(e,i).next(s=>{s||t.removeEntry(i,Q.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return R.or([()=>R.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class Qo{constructor(e,t){this.persistence=e,this.oi=new $t(r=>ze(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=yg(this,t)}static ri(e,t){return new Qo(e,t)}Zr(){}Xr(e){return R.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return R.forEach(this.oi,(r,i)=>this.ar(e,r,i).next(s=>s?R.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.qr(e,o=>this.ar(e,o,t).next(c=>{c||(r++,s.removeEntry(o,Q.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),R.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),R.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),R.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),R.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=vo(e.data.value)),t}ar(e,t,r){return R.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.oi.get(t);return R.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class pb{constructor(e){this.serializer=e}B(e,t,r,i){const s=new fa("createOrUpgrade",t);r<1&&i>=1&&(function(l){l.createObjectStore(ws)}(e),function(l){l.createObjectStore(ts,{keyPath:PE}),l.createObjectStore(lt,{keyPath:Th,autoIncrement:!0}).createIndex(Un,bh,{unique:!0}),l.createObjectStore(Fr)}(e),ff(e),function(l){l.createObjectStore(Vn)}(e));let o=R.resolve();return r<3&&i>=3&&(r!==0&&(function(l){l.deleteObjectStore(Br),l.deleteObjectStore(Ur),l.deleteObjectStore(zn)}(e),ff(e)),o=o.next(()=>function(l){const d=l.store(zn),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:Q.min().toTimestamp(),targetCount:0};return d.put(Mo,p)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(l,d){return d.store(lt).G().next(g=>{l.deleteObjectStore(lt),l.createObjectStore(lt,{keyPath:Th,autoIncrement:!0}).createIndex(Un,bh,{unique:!0});const T=d.store(lt),A=g.map(k=>T.put(k));return R.waitFor(A)})}(e,s))),o=o.next(()=>{(function(l){l.createObjectStore($r,{keyPath:ME})})(e)})),r<5&&i>=5&&(o=o.next(()=>this._i(s))),r<6&&i>=6&&(o=o.next(()=>(function(l){l.createObjectStore(ns)}(e),this.ai(s)))),r<7&&i>=7&&(o=o.next(()=>this.ui(s))),r<8&&i>=8&&(o=o.next(()=>this.ci(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.li(s))),r<11&&i>=11&&(o=o.next(()=>{(function(l){l.createObjectStore(ma,{keyPath:FE})})(e),function(l){l.createObjectStore(ga,{keyPath:UE})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(l){const d=l.createObjectStore(_a,{keyPath:KE});d.createIndex(zc,WE,{unique:!1}),d.createIndex(dm,HE,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(l){const d=l.createObjectStore(Lo,{keyPath:kE});d.createIndex(_o,DE),d.createIndex(am,xE)}(e)).next(()=>this.hi(e,s)).next(()=>e.deleteObjectStore(Vn))),r<14&&i>=14&&(o=o.next(()=>this.Pi(e,s))),r<15&&i>=15&&(o=o.next(()=>function(l){l.createObjectStore(Nl,{keyPath:BE,autoIncrement:!0}).createIndex(qc,$E,{unique:!1}),l.createObjectStore(Fo,{keyPath:jE}).createIndex(lm,qE,{unique:!1}),l.createObjectStore(Uo,{keyPath:zE}).createIndex(um,GE,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{t.objectStore(Fo).clear()}).next(()=>{t.objectStore(Uo).clear()})),r<17&&i>=17&&(o=o.next(()=>{(function(l){l.createObjectStore(Vl,{keyPath:QE})})(e)})),o}ai(e){let t=0;return e.store(Vn).Z((r,i)=>{t+=Ho(i)}).next(()=>{const r={byteSize:t};return e.store(ns).put(jc,r)})}_i(e){const t=e.store(ts),r=e.store(lt);return t.G().next(i=>R.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,qn],[s.userId,s.lastAcknowledgedBatchId]);return r.G(Un,o).next(c=>R.forEach(c,l=>{H(l.userId===s.userId);const d=Ln(this.serializer,l);return fg(e,s.userId,d).next(()=>{})}))}))}ui(e){const t=e.store(Br),r=e.store(Vn);return e.store(zn).get(Mo).next(i=>{const s=[];return r.Z((o,c)=>{const l=new le(o),d=function(g){return[0,ze(g)]}(l);s.push(t.get(d).next(p=>p?R.resolve():(g=>t.put({targetId:0,path:ze(g),sequenceNumber:i.highestListenSequenceNumber}))(l)))}).next(()=>R.waitFor(s))})}ci(e,t){e.createObjectStore(rs,{keyPath:LE});const r=t.store(rs),i=new Hl,s=o=>{if(i.add(o)){const c=o.lastSegment(),l=o.popLast();return r.put({collectionId:c,parent:ze(l)})}};return t.store(Vn).Z({Y:!0},(o,c)=>{const l=new le(o);return s(l.popLast())}).next(()=>t.store(Fr).Z({Y:!0},([o,c,l],d)=>{const p=mt(c);return s(p.popLast())}))}li(e){const t=e.store(Ur);return t.Z((r,i)=>{const s=Vi(i),o=cg(this.serializer,s);return t.put(o)})}hi(e,t){const r=t.store(Vn),i=[];return r.Z((s,o)=>{const c=t.store(Lo),l=function(g){return g.document?new z(le.fromString(g.document.name).popFirst(5)):g.noDocument?z.fromSegments(g.noDocument.path):g.unknownDocument?z.fromSegments(g.unknownDocument.path):K()}(o).path.toArray(),d={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(d))}).next(()=>R.waitFor(i))}Pi(e,t){const r=t.store(lt),i=Ig(this.serializer),s=new Yl(Sa.ri,this.serializer.Tt);return r.G().next(o=>{const c=new Map;return o.forEach(l=>{var d;let p=(d=c.get(l.userId))!==null&&d!==void 0?d:re();Ln(this.serializer,l).keys().forEach(g=>p=p.add(g)),c.set(l.userId,p)}),R.forEach(c,(l,d)=>{const p=new We(d),g=Aa.It(this.serializer,p),T=s.getIndexManager(p),A=Ra.It(p,this.serializer,T,s.referenceDelegate);return new wg(i,A,g,T).recalculateAndSaveOverlaysForDocumentKeys(new Gc(t,ot.ae),l).next()})})}}function ff(n){n.createObjectStore(Br,{keyPath:VE}).createIndex(xl,OE,{unique:!0}),n.createObjectStore(Ur,{keyPath:"targetId"}).createIndex(cm,NE,{unique:!0}),n.createObjectStore(zn)}const Yt="IndexedDbPersistence",vc=18e5,Ic=5e3,wc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",mb="main";class Jl{constructor(e,t,r,i,s,o,c,l,d,p,g=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=s,this.window=o,this.document=c,this.Ii=d,this.Ei=p,this.di=g,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=T=>Promise.resolve(),!Jl.D())throw new U(D.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new nb(this,i),this.gi=t+mb,this.serializer=new ag(l),this.pi=new un(this.gi,this.di,new pb(this.serializer)),this.jr=new GT,this.Hr=new ZT(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Ig(this.serializer),this.Yr=new zT,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,p===!1&&He(Yt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new U(D.FAILED_PRECONDITION,wc);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new ot(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>to(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if(In(e))return M(Yt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return M(Yt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return Pi(e).get(mr).next(t=>R.resolve(this.Ni(t)))}Bi(e){return to(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,vc)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=xe(t,$r);return r.G().next(i=>{const s=this.qi(i,vc),o=i.filter(c=>s.indexOf(c)===-1);return R.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?R.resolve(!0):Pi(e).get(mr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Ic)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new U(D.FAILED_PRECONDITION,wc);return!1}}return!(!this.networkEnabled||!this.inForeground)||to(e).G().next(r=>this.qi(r,Ic).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&M(Yt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[ws,$r],e=>{const t=new Gc(e,ot.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>to(e).G().next(t=>this.qi(t,vc).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return Ra.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new XT(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return Aa.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){M(Yt,"Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(l){return l===17?XE:l===16?JE:l===15?Ol:l===14?pm:l===13?fm:l===12?YE:l===11?hm:void K()}(this.di);let o;return this.pi.runTransaction(e,i,s,c=>(o=new Gc(c,this.Gr?this.Gr.next():ot.ae),t==="readwrite-primary"?this.Fi(o).next(l=>!!l||this.Mi(o)).next(l=>{if(!l)throw He(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new U(D.FAILED_PRECONDITION,rm);return r(o)}).next(l=>this.Oi(o).next(()=>l)):this.ji(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ji(e){return Pi(e).get(mr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Ic)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new U(D.FAILED_PRECONDITION,wc)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Pi(e).put(mr,t)}static D(){return un.D()}xi(e){const t=Pi(e);return t.get(mr).next(r=>this.Ni(r)?(M(Yt,"Releasing primary lease."),t.delete(mr)):R.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(He(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;op()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return M(Yt,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return He(Yt,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){He("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Pi(n){return xe(n,ws)}function to(n){return xe(n,$r)}function gb(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class Xl{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=i}static Yi(e,t){let r=re(),i=re();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Xl(e,t.fromCache,r,i)}}/**
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
 */class _b{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Eg{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return op()?8:sm(De())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.rs(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ss(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new _b;return this._s(e,t,o).next(c=>{if(s.result=c,this.Xi)return this.us(e,t,o,c.size)})}).next(()=>s.result)}us(e,t,r,i){return r.documentReadCount<this.es?(wr()<=ie.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Er(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),R.resolve()):(wr()<=ie.DEBUG&&M("QueryEngine","Query:",Er(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ts*i?(wr()<=ie.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Er(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,at(t))):R.resolve())}rs(e,t){if(Mh(t))return R.resolve(null);let r=at(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=qo(t,null,"F"),r=at(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=re(...s);return this.ns.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const d=this.cs(t,c);return this.ls(t,d,o,l.readTime)?this.rs(e,qo(t,null,"F")):this.hs(e,d,t,l)}))})))}ss(e,t,r,i){return Mh(t)||i.isEqual(Q.min())?R.resolve(null):this.ns.getDocuments(e,r).next(s=>{const o=this.cs(t,s);return this.ls(t,o,r,i)?R.resolve(null):(wr()<=ie.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Er(t)),this.hs(e,o,t,wE(i,Xi)).next(c=>c))})}cs(e,t){let r=new fe(Nm(e));return t.forEach((i,s)=>{bs(e,s)&&(r=r.add(s))}),r}ls(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}_s(e,t,r){return wr()<=ie.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Er(t)),this.ns.getDocumentsMatchingQuery(e,t,it.min(),r)}hs(e,t,r,i){return this.ns.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
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
 */const Zl="LocalStore",yb=3e8;class vb{constructor(e,t,r,i){this.persistence=e,this.Ps=t,this.serializer=i,this.Ts=new ye(J),this.Is=new $t(s=>Jn(s),Es),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new wg(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function Tg(n,e,t,r){return new vb(n,e,t,r)}async function bg(n,e){const t=X(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],c=[];let l=re();for(const d of i){o.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}for(const d of s){c.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({Rs:d,removedBatchIds:o,addedBatchIds:c}))})})}function Ib(n,e){const t=X(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,l,d,p){const g=d.batch,T=g.keys();let A=R.resolve();return T.forEach(k=>{A=A.next(()=>p.getEntry(l,k)).next(x=>{const P=d.docVersions.get(k);H(P!==null),x.version.compareTo(P)<0&&(g.applyToRemoteDocument(x,d),x.isValidDocument()&&(x.setReadTime(d.commitVersion),p.addEntry(x)))})}),A.next(()=>c.mutationQueue.removeMutationBatch(l,g))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=re();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Ag(n){const e=X(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function wb(n,e){const t=X(n),r=e.snapshotVersion;let i=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});i=t.Ts;const c=[];e.targetChanges.forEach((p,g)=>{const T=i.get(g);if(!T)return;c.push(t.Hr.removeMatchingKeys(s,p.removedDocuments,g).next(()=>t.Hr.addMatchingKeys(s,p.addedDocuments,g)));let A=T.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(g)!==null?A=A.withResumeToken(Se.EMPTY_BYTE_STRING,Q.min()).withLastLimboFreeSnapshotVersion(Q.min()):p.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(p.resumeToken,r)),i=i.insert(g,A),function(x,P,q){return x.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=yb?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0}(T,A,p)&&c.push(t.Hr.updateTargetData(s,A))});let l=rt(),d=re();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push(Eb(s,o,e.documentUpdates).next(p=>{l=p.Vs,d=p.fs})),!r.isEqual(Q.min())){const p=t.Hr.getLastRemoteSnapshotVersion(s).next(g=>t.Hr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(p)}return R.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.Ts=i,s))}function Eb(n,e,t){let r=re(),i=re();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=rt();return t.forEach((c,l)=>{const d=s.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(Q.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):M(Zl,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{Vs:o,fs:i}})}function Tb(n,e){const t=X(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=qn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function bb(n,e){const t=X(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Hr.getTargetData(r,e).next(s=>s?(i=s,R.resolve(i)):t.Hr.allocateTargetId(r).next(o=>(i=new xt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Ts.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function sl(n,e,t){const r=X(n),i=r.Ts.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!In(o))throw o;M(Zl,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(i.target)}function pf(n,e,t){const r=X(n);let i=Q.min(),s=re();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,d,p){const g=X(l),T=g.Is.get(p);return T!==void 0?R.resolve(g.Ts.get(T)):g.Hr.getTargetData(d,p)}(r,o,at(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,c.targetId).next(l=>{s=l})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,t?i:Q.min(),t?s:re())).next(c=>(Ab(r,fT(e),c),{documents:c,gs:s})))}function Ab(n,e,t){let r=n.Es.get(e)||Q.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Es.set(e,r)}class mf{constructor(){this.activeTargetIds=vT()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Rg{constructor(){this.ho=new mf,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new mf,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Rb{To(e){}shutdown(){}}/**
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
 */const gf="ConnectivityMonitor";class _f{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){M(gf,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){M(gf,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let no=null;function ol(){return no===null?no=function(){return 268435456+Math.round(2147483648*Math.random())}():no++,"0x"+no.toString(16)}/**
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
 */const Ec="RestConnection",Sb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Pb{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${i}`,this.wo=this.databaseId.database===Bo?`project_id=${r}`:`project_id=${r}&database_id=${i}`}So(e,t,r,i,s){const o=ol(),c=this.bo(e,t.toUriEncodedString());M(Ec,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(l,i,s),this.vo(e,c,l,r).then(d=>(M(Ec,`Received RPC '${e}' ${o}: `,d),d),d=>{throw Ji(Ec,`RPC '${e}' ${o} failed with error: `,d,"url: ",c,"request:",r),d})}Co(e,t,r,i,s,o){return this.So(e,t,r,i,s)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+si}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}bo(e,t){const r=Sb[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
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
 */class Cb{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
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
 */const $e="WebChannelConnection";class kb extends Pb{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,i){const s=ol();return new Promise((o,c)=>{const l=new Qp;l.setWithCredentials(!0),l.listenOnce(Yp.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case po.NO_ERROR:const p=l.getResponseJson();M($e,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(p)),o(p);break;case po.TIMEOUT:M($e,`RPC '${e}' ${s} timed out`),c(new U(D.DEADLINE_EXCEEDED,"Request time out"));break;case po.HTTP_ERROR:const g=l.getStatus();if(M($e,`RPC '${e}' ${s} failed with status:`,g,"response text:",l.getResponseText()),g>0){let T=l.getResponseJson();Array.isArray(T)&&(T=T[0]);const A=T?.error;if(A&&A.status&&A.message){const k=function(P){const q=P.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(q)>=0?q:D.UNKNOWN}(A.status);c(new U(k,A.message))}else c(new U(D.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new U(D.UNAVAILABLE,"Connection failed."));break;default:K()}}finally{M($e,`RPC '${e}' ${s} completed.`)}});const d=JSON.stringify(i);M($e,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",d,r,15)})}Wo(e,t,r){const i=ol(),s=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Zp(),c=Xp(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Do(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const p=s.join("");M($e,`Creating RPC '${e}' stream ${i}: ${p}`,l);const g=o.createWebChannel(p,l);let T=!1,A=!1;const k=new Cb({Fo:P=>{A?M($e,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(T||(M($e,`Opening RPC '${e}' stream ${i} transport.`),g.open(),T=!0),M($e,`RPC '${e}' stream ${i} sending:`,P),g.send(P))},Mo:()=>g.close()}),x=(P,q,V)=>{P.listen(q,L=>{try{V(L)}catch($){setTimeout(()=>{throw $},0)}})};return x(g,Di.EventType.OPEN,()=>{A||(M($e,`RPC '${e}' stream ${i} transport opened.`),k.Qo())}),x(g,Di.EventType.CLOSE,()=>{A||(A=!0,M($e,`RPC '${e}' stream ${i} transport closed`),k.Uo())}),x(g,Di.EventType.ERROR,P=>{A||(A=!0,Ji($e,`RPC '${e}' stream ${i} transport errored:`,P),k.Uo(new U(D.UNAVAILABLE,"The operation could not be completed")))}),x(g,Di.EventType.MESSAGE,P=>{var q;if(!A){const V=P.data[0];H(!!V);const L=V,$=L?.error||((q=L[0])===null||q===void 0?void 0:q.error);if($){M($e,`RPC '${e}' stream ${i} received error:`,$);const N=$.status;let F=function(m){const I=Re[m];if(I!==void 0)return Wm(I)}(N),v=$.message;F===void 0&&(F=D.INTERNAL,v="Unknown error status: "+N+" with message "+$.message),A=!0,k.Uo(new U(F,v)),g.close()}else M($e,`RPC '${e}' stream ${i} received:`,V),k.Ko(V)}}),x(c,Jp.STAT_EVENT,P=>{P.stat===Fc.PROXY?M($e,`RPC '${e}' stream ${i} detected buffering proxy`):P.stat===Fc.NOPROXY&&M($e,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.$o()},0),k}}/**
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
 */function Db(){return typeof window<"u"?window:null}function To(){return typeof document<"u"?document:null}/**
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
 */function Pa(n){return new NT(n,!0)}/**
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
 */class Sg{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=i,this.jo=s,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),i=Math.max(0,t-r);i>0&&M("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,i,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
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
 */const yf="PersistentStream";class Pg{constructor(e,t,r,i,s,o,c,l){this.Ti=e,this.n_=r,this.r_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new Sg(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(He(t.toString()),He("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===D.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.i_===t&&this.V_(r,i)},r=>{e(()=>{const i=new U(D.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(i)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(i=>{r(()=>this.m_(i))}),this.stream.onMessage(i=>{r(()=>++this.__==1?this.g_(i):this.onNext(i))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return M(yf,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(M(yf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class xb extends Pg{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=LT(this.serializer,e),r=function(s){if(!("targetChange"in s))return Q.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Q.min():o.readTime?Qe(o.readTime):Q.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=el(this.serializer),t.addTarget=function(s,o){let c;const l=o.target;if(c=$o(l)?{documents:tg(s,l)}:{query:ng(s,l).ht},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Ym(s,o.resumeToken);const d=Xc(s,o.expectedCount);d!==null&&(c.expectedCount=d)}else if(o.snapshotVersion.compareTo(Q.min())>0){c.readTime=Hr(s,o.snapshotVersion.toTimestamp());const d=Xc(s,o.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=FT(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=el(this.serializer),t.removeTarget=e,this.I_(t)}}class Nb extends Pg{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return H(!!e.streamToken),this.lastStreamToken=e.streamToken,H(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){H(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=MT(e.writeResults,e.commitTime),r=Qe(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=el(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Go(this.serializer,r))};this.I_(t)}}/**
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
 */class Vb{}class Ob extends Vb{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.F_=!1}M_(){if(this.F_)throw new U(D.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.So(e,Zc(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new U(D.UNKNOWN,s.toString())})}Co(e,t,r,i,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Co(e,Zc(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new U(D.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class Lb{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(He(t),this.N_=!1):M("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
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
 */const tr="RemoteStore";class Mb{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=s,this.z_.To(o=>{r.enqueueAndForget(async()=>{or(this)&&(M(tr,"Restarting streams for network reachability change."),await async function(l){const d=X(l);d.W_.add(4),await Rs(d),d.j_.set("Unknown"),d.W_.delete(4),await Ca(d)}(this))})}),this.j_=new Lb(r,i)}}async function Ca(n){if(or(n))for(const e of n.G_)await e(!0)}async function Rs(n){for(const e of n.G_)await e(!1)}function Cg(n,e){const t=X(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),ru(t)?nu(t):ai(t).c_()&&tu(t,e))}function eu(n,e){const t=X(n),r=ai(t);t.K_.delete(e),r.c_()&&kg(t,e),t.K_.size===0&&(r.c_()?r.P_():or(t)&&t.j_.set("Unknown"))}function tu(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Q.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ai(n).y_(e)}function kg(n,e){n.H_.Ne(e),ai(n).w_(e)}function nu(n){n.H_=new CT({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),ai(n).start(),n.j_.B_()}function ru(n){return or(n)&&!ai(n).u_()&&n.K_.size>0}function or(n){return X(n).W_.size===0}function Dg(n){n.H_=void 0}async function Fb(n){n.j_.set("Online")}async function Ub(n){n.K_.forEach((e,t)=>{tu(n,e)})}async function Bb(n,e){Dg(n),ru(n)?(n.j_.q_(e),nu(n)):n.j_.set("Unknown")}async function $b(n,e,t){if(n.j_.set("Online"),e instanceof Qm&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.K_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.K_.delete(c),i.H_.removeTarget(c))}(n,e)}catch(r){M(tr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Yo(n,r)}else if(e instanceof Eo?n.H_.We(e):e instanceof Hm?n.H_.Ze(e):n.H_.je(e),!t.isEqual(Q.min()))try{const r=await Ag(n.localStore);t.compareTo(r)>=0&&await function(s,o){const c=s.H_.ot(o);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=s.K_.get(d);p&&s.K_.set(d,p.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,d)=>{const p=s.K_.get(l);if(!p)return;s.K_.set(l,p.withResumeToken(Se.EMPTY_BYTE_STRING,p.snapshotVersion)),kg(s,l);const g=new xt(p.target,l,d,p.sequenceNumber);tu(s,g)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){M(tr,"Failed to raise snapshot:",r),await Yo(n,r)}}async function Yo(n,e,t){if(!In(e))throw e;n.W_.add(1),await Rs(n),n.j_.set("Offline"),t||(t=()=>Ag(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M(tr,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await Ca(n)})}function xg(n,e){return e().catch(t=>Yo(n,t,e))}async function Ss(n){const e=X(n),t=_n(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:qn;for(;jb(e);)try{const i=await Tb(e.localStore,r);if(i===null){e.U_.length===0&&t.P_();break}r=i.batchId,qb(e,i)}catch(i){await Yo(e,i)}Ng(e)&&Vg(e)}function jb(n){return or(n)&&n.U_.length<10}function qb(n,e){n.U_.push(e);const t=_n(n);t.c_()&&t.S_&&t.b_(e.mutations)}function Ng(n){return or(n)&&!_n(n).u_()&&n.U_.length>0}function Vg(n){_n(n).start()}async function zb(n){_n(n).C_()}async function Gb(n){const e=_n(n);for(const t of n.U_)e.b_(t.mutations)}async function Kb(n,e,t){const r=n.U_.shift(),i=ql.from(r,e,t);await xg(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Ss(n)}async function Wb(n,e){e&&_n(n).S_&&await async function(r,i){if(function(o){return ST(o)&&o!==D.ABORTED}(i.code)){const s=r.U_.shift();_n(r).h_(),await xg(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Ss(r)}}(n,e),Ng(n)&&Vg(n)}async function vf(n,e){const t=X(n);t.asyncQueue.verifyOperationInProgress(),M(tr,"RemoteStore received new credentials");const r=or(t);t.W_.add(3),await Rs(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await Ca(t)}async function Hb(n,e){const t=X(n);e?(t.W_.delete(2),await Ca(t)):e||(t.W_.add(2),await Rs(t),t.j_.set("Unknown"))}function ai(n){return n.J_||(n.J_=function(t,r,i){const s=X(t);return s.M_(),new xb(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{xo:Fb.bind(null,n),No:Ub.bind(null,n),Lo:Bb.bind(null,n),p_:$b.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),ru(n)?nu(n):n.j_.set("Unknown")):(await n.J_.stop(),Dg(n))})),n.J_}function _n(n){return n.Y_||(n.Y_=function(t,r,i){const s=X(t);return s.M_(),new Nb(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:zb.bind(null,n),Lo:Wb.bind(null,n),D_:Gb.bind(null,n),v_:Kb.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await Ss(n)):(await n.Y_.stop(),n.U_.length>0&&(M(tr,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
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
 */class iu{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new vt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,c=new iu(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function su(n,e){if(He("AsyncQueue",`${e}: ${n}`),In(n))return new U(D.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class xr{static emptySet(e){return new xr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||z.comparator(t.key,r.key):(t,r)=>z.comparator(t.key,r.key),this.keyedMap=xi(),this.sortedSet=new ye(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof xr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new xr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class If{constructor(){this.Z_=new ye(z.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):K():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Qr{constructor(e,t,r,i,s,o,c,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Qr(e,t,xr.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&wa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class Qb{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class Yb{constructor(){this.queries=wf(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const i=X(t),s=i.queries;i.queries=wf(),s.forEach((o,c)=>{for(const l of c.ta)l.onError(r)})})(this,new U(D.ABORTED,"Firestore shutting down"))}}function wf(){return new $t(n=>xm(n),wa)}async function ou(n,e){const t=X(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.na()&&e.ra()&&(r=2):(s=new Qb,r=e.ra()?0:1);try{switch(r){case 0:s.ea=await t.onListen(i,!0);break;case 1:s.ea=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=su(o,`Initialization of query '${Er(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.ta.push(e),e.sa(t.onlineState),s.ea&&e.oa(s.ea)&&cu(t)}async function au(n,e){const t=X(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.ta.indexOf(e);o>=0&&(s.ta.splice(o,1),s.ta.length===0?i=e.ra()?0:1:!s.na()&&e.ra()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Jb(n,e){const t=X(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.ta)c.oa(i)&&(r=!0);o.ea=i}}r&&cu(t)}function Xb(n,e,t){const r=X(n),i=r.queries.get(e);if(i)for(const s of i.ta)s.onError(t);r.queries.delete(e)}function cu(n){n.ia.forEach(e=>{e.next()})}var al,Ef;(Ef=al||(al={}))._a="default",Ef.Cache="cache";class lu{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Qr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=Qr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==al.Cache}}/**
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
 */class Og{constructor(e){this.key=e}}class Lg{constructor(e){this.key=e}}class Zb{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=re(),this.mutatedKeys=re(),this.ya=Nm(e),this.wa=new xr(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new If,i=t?t.wa:this.wa;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,g)=>{const T=i.get(p),A=bs(this.query,g)?g:null,k=!!T&&this.mutatedKeys.has(T.key),x=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let P=!1;T&&A?T.data.isEqual(A.data)?k!==x&&(r.track({type:3,doc:A}),P=!0):this.va(T,A)||(r.track({type:2,doc:A}),P=!0,(l&&this.ya(A,l)>0||d&&this.ya(A,d)<0)&&(c=!0)):!T&&A?(r.track({type:0,doc:A}),P=!0):T&&!A&&(r.track({type:1,doc:T}),P=!0,(l||d)&&(c=!0)),P&&(A?(o=o.add(A),s=x?s.add(p):s.delete(p)):(o=o.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{wa:o,Da:r,ls:c,mutatedKeys:s}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((p,g)=>function(A,k){const x=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K()}};return x(A)-x(k)}(p.type,g.type)||this.ya(p.doc,g.doc)),this.Ca(r),i=i!=null&&i;const c=t&&!i?this.Fa():[],l=this.pa.size===0&&this.current&&!i?1:0,d=l!==this.ga;return this.ga=l,o.length!==0||d?{snapshot:new Qr(this.query,e.wa,s,o,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new If,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=re(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new Lg(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new Og(r))}),t}Oa(e){this.fa=e.gs,this.pa=re();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return Qr.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const uu="SyncEngine";class eA{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class tA{constructor(e){this.key=e,this.Ba=!1}}class nA{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new $t(c=>xm(c),wa),this.qa=new Map,this.Qa=new Set,this.$a=new ye(z.comparator),this.Ua=new Map,this.Ka=new Ql,this.Wa={},this.Ga=new Map,this.za=er.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function rA(n,e,t=!0){const r=jg(n);let i;const s=r.ka.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Na()):i=await Mg(r,e,t,!0),i}async function iA(n,e){const t=jg(n);await Mg(t,e,!0,!1)}async function Mg(n,e,t,r){const i=await bb(n.localStore,at(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await sA(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&Cg(n.remoteStore,i),c}async function sA(n,e,t,r,i){n.Ha=(g,T,A)=>async function(x,P,q,V){let L=P.view.ba(q);L.ls&&(L=await pf(x.localStore,P.query,!1).then(({documents:v})=>P.view.ba(v,L)));const $=V&&V.targetChanges.get(P.targetId),N=V&&V.targetMismatches.get(P.targetId)!=null,F=P.view.applyChanges(L,x.isPrimaryClient,$,N);return bf(x,P.targetId,F.Ma),F.snapshot}(n,g,T,A);const s=await pf(n.localStore,e,!0),o=new Zb(e,s.gs),c=o.ba(s.documents),l=As.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=o.applyChanges(c,n.isPrimaryClient,l);bf(n,t,d.Ma);const p=new eA(e,t,o);return n.ka.set(e,p),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),d.snapshot}async function oA(n,e,t){const r=X(n),i=r.ka.get(e),s=r.qa.get(i.targetId);if(s.length>1)return r.qa.set(i.targetId,s.filter(o=>!wa(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await sl(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&eu(r.remoteStore,i.targetId),cl(r,i.targetId)}).catch(ir)):(cl(r,i.targetId),await sl(r.localStore,i.targetId,!0))}async function aA(n,e){const t=X(n),r=t.ka.get(e),i=t.qa.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),eu(t.remoteStore,r.targetId))}async function cA(n,e,t){const r=qg(n);try{const i=await function(o,c){const l=X(o),d=Ie.now(),p=c.reduce((A,k)=>A.add(k.key),re());let g,T;return l.persistence.runTransaction("Locally write mutations","readwrite",A=>{let k=rt(),x=re();return l.ds.getEntries(A,p).next(P=>{k=P,k.forEach((q,V)=>{V.isValidDocument()||(x=x.add(q))})}).next(()=>l.localDocuments.getOverlayedDocuments(A,k)).next(P=>{g=P;const q=[];for(const V of c){const L=AT(V,g.get(V.key).overlayedDocument);L!=null&&q.push(new jt(V.key,L,bm(L.value.mapValue),Xe.exists(!0)))}return l.mutationQueue.addMutationBatch(A,d,q,c)}).next(P=>{T=P;const q=P.applyToLocalDocumentSet(g,x);return l.documentOverlayCache.saveOverlays(A,P.batchId,q)})}).then(()=>({batchId:T.batchId,changes:Om(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,l){let d=o.Wa[o.currentUser.toKey()];d||(d=new ye(J)),d=d.insert(c,l),o.Wa[o.currentUser.toKey()]=d}(r,i.batchId,t),await Ps(r,i.changes),await Ss(r.remoteStore)}catch(i){const s=su(i,"Failed to persist write");t.reject(s)}}async function Fg(n,e){const t=X(n);try{const r=await wb(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Ua.get(s);o&&(H(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.Ba=!0:i.modifiedDocuments.size>0?H(o.Ba):i.removedDocuments.size>0&&(H(o.Ba),o.Ba=!1))}),await Ps(t,r,e)}catch(r){await ir(r)}}function Tf(n,e,t){const r=X(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.ka.forEach((s,o)=>{const c=o.view.sa(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const l=X(o);l.onlineState=c;let d=!1;l.queries.forEach((p,g)=>{for(const T of g.ta)T.sa(c)&&(d=!0)}),d&&cu(l)}(r.eventManager,e),i.length&&r.La.p_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function lA(n,e,t){const r=X(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Ua.get(e),s=i&&i.key;if(s){let o=new ye(z.comparator);o=o.insert(s,Te.newNoDocument(s,Q.min()));const c=re().add(s),l=new ba(Q.min(),new Map,new ye(J),o,c);await Fg(r,l),r.$a=r.$a.remove(s),r.Ua.delete(e),du(r)}else await sl(r.localStore,e,!1).then(()=>cl(r,e,t)).catch(ir)}async function uA(n,e){const t=X(n),r=e.batch.batchId;try{const i=await Ib(t.localStore,e);Bg(t,r,null),Ug(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ps(t,i)}catch(i){await ir(i)}}async function dA(n,e,t){const r=X(n);try{const i=await function(o,c){const l=X(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,c).next(g=>(H(g!==null),p=g.keys(),l.mutationQueue.removeMutationBatch(d,g))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);Bg(r,e,t),Ug(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ps(r,i)}catch(i){await ir(i)}}function Ug(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function Bg(n,e,t){const r=X(n);let i=r.Wa[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Wa[r.currentUser.toKey()]=i}}function cl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||$g(n,r)})}function $g(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(eu(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),du(n))}function bf(n,e,t){for(const r of t)r instanceof Og?(n.Ka.addReference(r.key,e),hA(n,r)):r instanceof Lg?(M(uu,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||$g(n,r.key)):K()}function hA(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(M(uu,"New document in limbo: "+t),n.Qa.add(r),du(n))}function du(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new z(le.fromString(e)),r=n.za.next();n.Ua.set(r,new tA(t)),n.$a=n.$a.insert(t,r),Cg(n.remoteStore,new xt(at(Ts(t.path)),r,"TargetPurposeLimboResolution",ot.ae))}}async function Ps(n,e,t){const r=X(n),i=[],s=[],o=[];r.ka.isEmpty()||(r.ka.forEach((c,l)=>{o.push(r.Ha(l,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const g=d?!d.fromCache:(p=t?.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,g?"current":"not-current")}if(d){i.push(d);const g=Xl.Yi(l.targetId,d);s.push(g)}}))}),await Promise.all(o),r.La.p_(i),await async function(l,d){const p=X(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>R.forEach(d,T=>R.forEach(T.Hi,A=>p.persistence.referenceDelegate.addReference(g,T.targetId,A)).next(()=>R.forEach(T.Ji,A=>p.persistence.referenceDelegate.removeReference(g,T.targetId,A)))))}catch(g){if(!In(g))throw g;M(Zl,"Failed to update sequence numbers: "+g)}for(const g of d){const T=g.targetId;if(!g.fromCache){const A=p.Ts.get(T),k=A.snapshotVersion,x=A.withLastLimboFreeSnapshotVersion(k);p.Ts=p.Ts.insert(T,x)}}}(r.localStore,s))}async function fA(n,e){const t=X(n);if(!t.currentUser.isEqual(e)){M(uu,"User change. New user:",e.toKey());const r=await bg(t.localStore,e);t.currentUser=e,function(s,o){s.Ga.forEach(c=>{c.forEach(l=>{l.reject(new U(D.CANCELLED,o))})}),s.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ps(t,r.Rs)}}function pA(n,e){const t=X(n),r=t.Ua.get(e);if(r&&r.Ba)return re().add(r.key);{let i=re();const s=t.qa.get(e);if(!s)return i;for(const o of s){const c=t.ka.get(o);i=i.unionWith(c.view.Sa)}return i}}function jg(n){const e=X(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Fg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=pA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=lA.bind(null,e),e.La.p_=Jb.bind(null,e.eventManager),e.La.Ja=Xb.bind(null,e.eventManager),e}function qg(n){const e=X(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=uA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=dA.bind(null,e),e}class ls{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Pa(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return Tg(this.persistence,new Eg,e.initialUser,this.serializer)}Xa(e){return new Yl(Sa.ri,this.serializer)}Za(e){return new Rg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ls.provider={build:()=>new ls};class mA extends ls{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){H(this.persistence.referenceDelegate instanceof Qo);const r=this.persistence.referenceDelegate.garbageCollector;return new _g(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?je.withCacheSize(this.cacheSizeBytes):je.DEFAULT;return new Yl(r=>Qo.ri(r,t),this.serializer)}}class gA extends ls{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await qg(this.ru.syncEngine),await Ss(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return Tg(this.persistence,new Eg,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new _g(r,e.asyncQueue,t)}nu(e,t){const r=new AE(t,this.persistence);return new bE(e.asyncQueue,r)}Xa(e){const t=gb(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?je.withCacheSize(this.cacheSizeBytes):je.DEFAULT;return new Jl(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,Db(),To(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new Rg}}class Jo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Tf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=fA.bind(null,this.syncEngine),await Hb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Yb}()}createDatastore(e){const t=Pa(e.databaseInfo.databaseId),r=function(s){return new kb(s)}(e.databaseInfo);return function(s,o,c,l){return new Ob(s,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new Mb(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Tf(this.syncEngine,t,0),function(){return _f.D()?new _f:new Rb}())}createSyncEngine(e,t){return function(i,s,o,c,l,d,p){const g=new nA(i,s,o,c,l,d);return p&&(g.ja=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=X(i);M(tr,"RemoteStore shutting down."),s.W_.add(5),await Rs(s),s.z_.shutdown(),s.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Jo.provider={build:()=>new Jo};/**
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
 */class hu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):He("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const yn="FirestoreClient";class _A{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=We.UNAUTHENTICATED,this.clientId=em.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{M(yn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(M(yn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new vt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=su(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Tc(n,e){n.asyncQueue.verifyOperationInProgress(),M(yn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await bg(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Af(n,e){n.asyncQueue.verifyOperationInProgress();const t=await yA(n);M(yn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>vf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>vf(e.remoteStore,i)),n._onlineComponents=e}async function yA(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M(yn,"Using user provided OfflineComponentProvider");try{await Tc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===D.FAILED_PRECONDITION||i.code===D.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Ji("Error using user provided cache. Falling back to memory cache: "+t),await Tc(n,new ls)}}else M(yn,"Using default OfflineComponentProvider"),await Tc(n,new mA(void 0));return n._offlineComponents}async function zg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M(yn,"Using user provided OnlineComponentProvider"),await Af(n,n._uninitializedComponentsProvider._online)):(M(yn,"Using default OnlineComponentProvider"),await Af(n,new Jo))),n._onlineComponents}function vA(n){return zg(n).then(e=>e.syncEngine)}async function Xo(n){const e=await zg(n),t=e.eventManager;return t.onListen=rA.bind(null,e.syncEngine),t.onUnlisten=oA.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=iA.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=aA.bind(null,e.syncEngine),t}function IA(n,e,t={}){const r=new vt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,d){const p=new hu({next:T=>{p.su(),o.enqueueAndForget(()=>au(s,g));const A=T.docs.has(c);!A&&T.fromCache?d.reject(new U(D.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&T.fromCache&&l&&l.source==="server"?d.reject(new U(D.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),g=new lu(Ts(c.path),p,{includeMetadataChanges:!0,Ta:!0});return ou(s,g)}(await Xo(n),n.asyncQueue,e,t,r)),r.promise}function wA(n,e,t={}){const r=new vt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,d){const p=new hu({next:T=>{p.su(),o.enqueueAndForget(()=>au(s,g)),T.fromCache&&l.source==="server"?d.reject(new U(D.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(T)},error:T=>d.reject(T)}),g=new lu(c,p,{includeMetadataChanges:!0,Ta:!0});return ou(s,g)}(await Xo(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function Gg(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const Rf=new Map;/**
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
 */function Kg(n,e,t){if(!t)throw new U(D.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function EA(n,e,t,r){if(e===!0&&r===!0)throw new U(D.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Sf(n){if(!z.isDocumentKey(n))throw new U(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Pf(n){if(z.isDocumentKey(n))throw new U(D.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ka(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":K()}function It(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ka(n);throw new U(D.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function TA(n,e){if(e<=0)throw new U(D.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */const bA="firestore.googleapis.com",Cf=!0;class kf{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=bA,this.ssl=Cf}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Cf;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=hg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<gg)throw new U(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}EA("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Gg((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new U(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new U(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new U(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class fu{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new kf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new kf(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new pE;switch(r.type){case"firstParty":return new _E(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Rf.get(t);r&&(M("ComponentProvider","Removing Datastore"),Rf.delete(t),r.terminate())}(this),Promise.resolve()}}/**
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
 */class bt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new bt(this.firestore,e,this._query)}}class Ye{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new dn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ye(this.firestore,e,this._key)}}class dn extends bt{constructor(e,t,r){super(e,t,Ts(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ye(this.firestore,null,new z(e))}withConverter(e){return new dn(this.firestore,e,this._path)}}function Pe(n,e,...t){if(n=be(n),Kg("collection","path",e),n instanceof fu){const r=le.fromString(e,...t);return Pf(r),new dn(n,null,r)}{if(!(n instanceof Ye||n instanceof dn))throw new U(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(le.fromString(e,...t));return Pf(r),new dn(n.firestore,null,r)}}function ht(n,e,...t){if(n=be(n),arguments.length===1&&(e=em.newId()),Kg("doc","path",e),n instanceof fu){const r=le.fromString(e,...t);return Sf(r),new Ye(n,null,new z(r))}{if(!(n instanceof Ye||n instanceof dn))throw new U(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(le.fromString(e,...t));return Sf(r),new Ye(n.firestore,n instanceof dn?n.converter:null,new z(r))}}/**
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
 */const Df="AsyncQueue";class xf{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new Sg(this,"async_queue_retry"),this.Su=()=>{const r=To();r&&M(Df,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=To();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=To();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new vt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!In(e))throw e;M(Df,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw He("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const i=iu.createAndSchedule(this,e,t,r,s=>this.Fu(s));return this.fu.push(i),i}Du(){this.gu&&K()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function Nf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class nr extends fu{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new xf,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new xf(e),this._firestoreClient=void 0,await e}}}function AA(n,e,t){t||(t=Bo);const r=_s(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(Wi(s,e))return i;throw new U(D.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new U(D.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<gg)throw new U(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function Da(n){if(n._terminated)throw new U(D.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||RA(n),n._firestoreClient}function RA(n){var e,t,r;const i=n._freezeSettings(),s=function(c,l,d,p){return new eT(c,l,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Gg(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new _A(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){const l=c?._online.build();return{_offline:c?._offline.build(l),_online:l}}(n._componentsProvider))}/**
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
 */class Yr{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Yr(Se.fromBase64String(e))}catch(t){throw new U(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Yr(Se.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class xa{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Na{constructor(e){this._methodName=e}}/**
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
 */class pu{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}}/**
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
 */class mu{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
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
 */const SA=/^__.*__$/;class PA{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new jt(e,this.data,this.fieldMask,t,this.fieldTransforms):new oi(e,this.data,t,this.fieldTransforms)}}class Wg{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new jt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Hg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K()}}class gu{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Bu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new gu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ku({path:r,Qu:!1});return i.$u(e),i}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ku({path:r,Qu:!1});return i.Bu(),i}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return Zo(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(Hg(this.Lu)&&SA.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class CA{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Pa(e)}ju(e,t,r,i=!1){return new gu({Lu:e,methodName:t,zu:r,path:ve.emptyPath(),Qu:!1,Gu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Va(n){const e=n._freezeSettings(),t=Pa(n._databaseId);return new CA(n._databaseId,!!e.ignoreUndefinedProperties,t)}function kA(n,e,t,r,i,s={}){const o=n.ju(s.merge||s.mergeFields?2:0,e,t,i);yu("Data must be an object, but it was:",o,r);const c=Yg(r,o);let l,d;if(s.merge)l=new Je(o.fieldMask),d=o.fieldTransforms;else if(s.mergeFields){const p=[];for(const g of s.mergeFields){const T=ll(e,g,t);if(!o.contains(T))throw new U(D.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);Xg(p,T)||p.push(T)}l=new Je(p),d=o.fieldTransforms.filter(g=>l.covers(g.field))}else l=null,d=o.fieldTransforms;return new PA(new qe(c),l,d)}class Oa extends Na{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Oa}}class _u extends Na{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new Wr(e.serializer,Fm(e.serializer,this.Ju));return new qm(e.path,t)}isEqual(e){return e instanceof _u&&this.Ju===e.Ju}}function DA(n,e,t,r){const i=n.ju(1,e,t);yu("Data must be an object, but it was:",i,r);const s=[],o=qe.empty();wn(r,(l,d)=>{const p=vu(e,l,t);d=be(d);const g=i.Uu(p);if(d instanceof Oa)s.push(p);else{const T=Cs(d,g);T!=null&&(s.push(p),o.set(p,T))}});const c=new Je(s);return new Wg(o,c,i.fieldTransforms)}function xA(n,e,t,r,i,s){const o=n.ju(1,e,t),c=[ll(e,r,t)],l=[i];if(s.length%2!=0)throw new U(D.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<s.length;T+=2)c.push(ll(e,s[T])),l.push(s[T+1]);const d=[],p=qe.empty();for(let T=c.length-1;T>=0;--T)if(!Xg(d,c[T])){const A=c[T];let k=l[T];k=be(k);const x=o.Uu(A);if(k instanceof Oa)d.push(A);else{const P=Cs(k,x);P!=null&&(d.push(A),p.set(A,P))}}const g=new Je(d);return new Wg(p,g,o.fieldTransforms)}function Qg(n,e,t,r=!1){return Cs(t,n.ju(r?4:3,e))}function Cs(n,e){if(Jg(n=be(n)))return yu("Unsupported field value:",e,n),Yg(n,e);if(n instanceof Na)return function(r,i){if(!Hg(i.Lu))throw i.Wu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Wu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const c of r){let l=Cs(c,i.Ku(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=be(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Fm(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ie.fromDate(r);return{timestampValue:Hr(i.serializer,s)}}if(r instanceof Ie){const s=new Ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Hr(i.serializer,s)}}if(r instanceof pu)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Yr)return{bytesValue:Ym(i.serializer,r._byteString)};if(r instanceof Ye){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Kl(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof mu)return function(o,c){return{mapValue:{fields:{[Ll]:{stringValue:Ml},[jr]:{arrayValue:{values:o.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Bl(c.serializer,d)})}}}}}}(r,i);throw i.Wu(`Unsupported field value: ${ka(r)}`)}(n,e)}function Yg(n,e){const t={};return mm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):wn(n,(r,i)=>{const s=Cs(i,e.qu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Jg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ie||n instanceof pu||n instanceof Yr||n instanceof Ye||n instanceof Na||n instanceof mu)}function yu(n,e,t){if(!Jg(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=ka(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function ll(n,e,t){if((e=be(e))instanceof xa)return e._internalPath;if(typeof e=="string")return vu(n,e);throw Zo("Field path arguments must be of type string or ",n,!1,void 0,t)}const NA=new RegExp("[~\\*/\\[\\]]");function vu(n,e,t){if(e.search(NA)>=0)throw Zo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new xa(...e.split("."))._internalPath}catch{throw Zo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Zo(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new U(D.INVALID_ARGUMENT,c+n+l)}function Xg(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class Iu{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ye(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new VA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(La("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class VA extends Iu{data(){return super.data()}}function La(n,e){return typeof e=="string"?vu(n,e):e instanceof xa?e._internalPath:e._delegate._internalPath}/**
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
 */function Zg(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class wu{}class Ma extends wu{}function Et(n,e,...t){let r=[];e instanceof wu&&r.push(e),r=r.concat(t),function(s){const o=s.filter(l=>l instanceof Eu).length,c=s.filter(l=>l instanceof Fa).length;if(o>1||o>0&&c>0)throw new U(D.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Fa extends Ma{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Fa(e,t,r)}_apply(e){const t=this._parse(e);return e_(e._query,t),new bt(e.firestore,e.converter,Jc(e._query,t))}_parse(e){const t=Va(e.firestore);return function(s,o,c,l,d,p,g){let T;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new U(D.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Of(g,p);const k=[];for(const x of g)k.push(Vf(l,s,x));T={arrayValue:{values:k}}}else T=Vf(l,s,g)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Of(g,p),T=Qg(c,o,g,p==="in"||p==="not-in");return se.create(d,p,T)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function us(n,e,t){const r=e,i=La("where",n);return Fa._create(i,r,t)}class Eu extends wu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Eu(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:he.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const l of c)e_(o,l),o=Jc(o,l)}(e._query,t),new bt(e.firestore,e.converter,Jc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Tu extends Ma{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Tu(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new U(D.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new U(D.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new as(s,o)}(e._query,this._field,this._direction);return new bt(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new sr(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function Tt(n,e="asc"){const t=e,r=La("orderBy",n);return Tu._create(r,t)}class bu extends Ma{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new bu(e,t,r)}_apply(e){return new bt(e.firestore,e.converter,qo(e._query,this._limit,this._limitType))}}function Ut(n){return TA("limit",n),bu._create("limit",n,"F")}class Au extends Ma{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Au(e,t,r)}_apply(e){const t=LA(e,this.type,this._docOrFields,this._inclusive);return new bt(e.firestore,e.converter,function(i,s){return new sr(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function OA(...n){return Au._create("startAfter",n,!1)}function LA(n,e,t,r){if(t[0]=be(t[0]),t[0]instanceof Iu)return function(s,o,c,l,d){if(!l)throw new U(D.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const p=[];for(const g of Dr(s))if(g.field.isKeyField())p.push(Yn(o,l.key));else{const T=l.data.field(g.field);if(ya(T))throw new U(D.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+g.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(T===null){const A=g.field.canonicalString();throw new U(D.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${A}' (used as the orderBy) does not exist.`)}p.push(T)}return new gn(p,d)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=Va(n.firestore);return function(o,c,l,d,p,g){const T=o.explicitOrderBy;if(p.length>T.length)throw new U(D.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const A=[];for(let k=0;k<p.length;k++){const x=p[k];if(T[k].field.isKeyField()){if(typeof x!="string")throw new U(D.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof x}`);if(!Ul(o)&&x.indexOf("/")!==-1)throw new U(D.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${x}' contains a slash.`);const P=o.path.child(le.fromString(x));if(!z.isDocumentKey(P))throw new U(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${P}' is not because it contains an odd number of segments.`);const q=new z(P);A.push(Yn(c,q))}else{const P=Qg(l,d,x);A.push(P)}}return new gn(A,g)}(n._query,n.firestore._databaseId,i,e,t,r)}}function Vf(n,e,t){if(typeof(t=be(t))=="string"){if(t==="")throw new U(D.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ul(e)&&t.indexOf("/")!==-1)throw new U(D.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(le.fromString(t));if(!z.isDocumentKey(r))throw new U(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Yn(n,new z(r))}if(t instanceof Ye)return Yn(n,t._key);throw new U(D.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ka(t)}.`)}function Of(n,e){if(!Array.isArray(n)||n.length===0)throw new U(D.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function e_(n,e){const t=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(D.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(D.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class MA{convertValue(e,t="none"){switch(pn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return _e(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ft(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw K()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return wn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[jr].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>_e(o.doubleValue));return new mu(s)}convertGeoPoint(e){return new pu(_e(e.latitude),_e(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=va(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(is(e));default:return null}}convertTimestamp(e){const t=Mt(e);return new Ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=le.fromString(e);H(og(r));const i=new Qn(r.get(1),r.get(3)),s=new z(r.popFirst(5));return i.isEqual(t)||He(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function FA(n,e,t){let r;return r=n?n.toFirestore(e):e,r}/**
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
 */class Oi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class t_ extends Iu{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new bo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(La("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class bo extends t_{data(e={}){return super.data(e)}}class n_{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Oi(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new bo(this._firestore,this._userDataWriter,r.key,r,new Oi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const l=new bo(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Oi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const l=new bo(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Oi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return c.type!==0&&(d=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),p=o.indexOf(c.doc.key)),{type:UA(c.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function UA(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K()}}/**
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
 */function r_(n){n=It(n,Ye);const e=It(n.firestore,nr);return IA(Da(e),n._key).then(t=>s_(e,n,t))}class Ru extends MA{constructor(e){super(),this.firestore=e}convertBytes(e){return new Yr(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ye(this.firestore,null,t)}}function Jr(n){n=It(n,bt);const e=It(n.firestore,nr),t=Da(e),r=new Ru(e);return Zg(n._query),wA(t,n._query).then(i=>new n_(e,r,n,i))}function En(n,e,t,...r){n=It(n,Ye);const i=It(n.firestore,nr),s=Va(i);let o;return o=typeof(e=be(e))=="string"||e instanceof xa?xA(s,"updateDoc",n._key,e,t,r):DA(s,"updateDoc",n._key,e),i_(i,[o.toMutation(n._key,Xe.exists(!0))])}function qt(n,e){const t=It(n.firestore,nr),r=ht(n),i=FA(n.converter,e);return i_(t,[kA(Va(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Xe.exists(!1))]).then(()=>r)}function ks(n,...e){var t,r,i;n=be(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Nf(e[o])||(s=e[o],o++);const c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Nf(e[o])){const g=e[o];e[o]=(t=g.next)===null||t===void 0?void 0:t.bind(g),e[o+1]=(r=g.error)===null||r===void 0?void 0:r.bind(g),e[o+2]=(i=g.complete)===null||i===void 0?void 0:i.bind(g)}let l,d,p;if(n instanceof Ye)d=It(n.firestore,nr),p=Ts(n._key.path),l={next:g=>{e[o]&&e[o](s_(d,n,g))},error:e[o+1],complete:e[o+2]};else{const g=It(n,bt);d=It(g.firestore,nr),p=g._query;const T=new Ru(d);l={next:A=>{e[o]&&e[o](new n_(d,T,g,A))},error:e[o+1],complete:e[o+2]},Zg(n._query)}return function(T,A,k,x){const P=new hu(x),q=new lu(A,P,k);return T.asyncQueue.enqueueAndForget(async()=>ou(await Xo(T),q)),()=>{P.su(),T.asyncQueue.enqueueAndForget(async()=>au(await Xo(T),q))}}(Da(d),p,c,l)}function i_(n,e){return function(r,i){const s=new vt;return r.asyncQueue.enqueueAndForget(async()=>cA(await vA(r),i,s)),s.promise}(Da(n),e)}function s_(n,e,t){const r=t.docs.get(e._key),i=new Ru(n);return new t_(n,i,e._key,r,new Oi(t.hasPendingWrites,t.fromCache),e.converter)}class BA{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=o_(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function $A(n){return new BA(n)}class jA{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Jo.provider,this._offlineComponentProvider={build:t=>new gA(t,e?.cacheSizeBytes,this.forceOwnership)}}}function o_(n){return new jA(n?.forceOwnership)}function ar(n){return new _u("increment",n)}(function(e,t=!0){(function(i){si=i})(ni),fn(new Vt("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),c=new nr(new mE(r.getProvider("auth-internal")),new yE(o,r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new U(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Qn(d.options.projectId,p)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Nt(mh,gh,e),Nt(mh,gh,"esm2017")})();var qA="firebase",zA="11.3.0";/**
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
 */Nt(qA,zA,"app");/**
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
 */const ul=new Map,a_={activated:!1,tokenObservers:[]},GA={initialized:!1,enabled:!1};function ke(n){return ul.get(n)||Object.assign({},a_)}function KA(n,e){return ul.set(n,e),ul.get(n)}function Ua(){return GA}/**
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
 */const c_="https://content-firebaseappcheck.googleapis.com/v1",WA="exchangeRecaptchaV3Token",HA="exchangeDebugToken",Lf={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},QA=24*60*60*1e3;/**
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
 */class YA{constructor(e,t,r,i,s){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=i,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=i,i>s)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Ki,this.pending.promise.catch(t=>{}),await JA(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Ki,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function JA(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */const XA={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},Ze=new ti("appCheck","AppCheck",XA);/**
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
 */function Mf(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function Su(n){if(!ke(n).activated)throw Ze.create("use-before-activation",{appName:n.name})}function l_(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),i=Math.floor((e-t*3600*24-r*3600)/60),s=e-t*3600*24-r*3600-i*60;let o="";return t&&(o+=ro(t)+"d:"),r&&(o+=ro(r)+"h:"),o+=ro(i)+"m:"+ro(s)+"s",o}function ro(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
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
 */async function Pu({url:n,body:e},t){const r={"Content-Type":"application/json"},i=t.getImmediate({optional:!0});if(i){const g=await i.getHeartbeatsHeader();g&&(r["X-Firebase-Client"]=g)}const s={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,s)}catch(g){throw Ze.create("fetch-network-error",{originalErrorMessage:g?.message})}if(o.status!==200)throw Ze.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(g){throw Ze.create("fetch-parse-error",{originalErrorMessage:g?.message})}const l=c.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw Ze.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const d=Number(l[1])*1e3,p=Date.now();return{token:c.token,expireTimeMillis:p+d,issuedAtTimeMillis:p}}function ZA(n,e){const{projectId:t,appId:r,apiKey:i}=n.options;return{url:`${c_}/projects/${t}/apps/${r}:${WA}?key=${i}`,body:{recaptcha_v3_token:e}}}function u_(n,e){const{projectId:t,appId:r,apiKey:i}=n.options;return{url:`${c_}/projects/${t}/apps/${r}:${HA}?key=${i}`,body:{debug_token:e}}}/**
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
 */const e0="firebase-app-check-database",t0=1,ds="firebase-app-check-store",d_="debug-token";let io=null;function h_(){return io||(io=new Promise((n,e)=>{try{const t=indexedDB.open(e0,t0);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var i;e(Ze.create("storage-open",{originalErrorMessage:(i=r.target.error)===null||i===void 0?void 0:i.message}))},t.onupgradeneeded=r=>{const i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(ds,{keyPath:"compositeKey"})}}}catch(t){e(Ze.create("storage-open",{originalErrorMessage:t?.message}))}}),io)}function n0(n){return p_(m_(n))}function r0(n,e){return f_(m_(n),e)}function i0(n){return f_(d_,n)}function s0(){return p_(d_)}async function f_(n,e){const r=(await h_()).transaction(ds,"readwrite"),s=r.objectStore(ds).put({compositeKey:n,value:e});return new Promise((o,c)=>{s.onsuccess=l=>{o()},r.onerror=l=>{var d;c(Ze.create("storage-set",{originalErrorMessage:(d=l.target.error)===null||d===void 0?void 0:d.message}))}})}async function p_(n){const t=(await h_()).transaction(ds,"readonly"),i=t.objectStore(ds).get(n);return new Promise((s,o)=>{i.onsuccess=c=>{const l=c.target.result;s(l?l.value:void 0)},t.onerror=c=>{var l;o(Ze.create("storage-get",{originalErrorMessage:(l=c.target.error)===null||l===void 0?void 0:l.message}))}})}function m_(n){return`${n.options.appId}-${n.name}`}/**
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
 */const hs=new ca("@firebase/app-check");/**
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
 */async function o0(n){if(aa()){let e;try{e=await n0(n)}catch(t){hs.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function bc(n,e){return aa()?r0(n,e).catch(t=>{hs.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function a0(){let n;try{n=await s0()}catch{}if(n)return n;{const e=crypto.randomUUID();return i0(e).catch(t=>hs.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
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
 */function Cu(){return Ua().enabled}async function ku(){const n=Ua();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function c0(){const n=rp(),e=Ua();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new Ki;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(a0())}/**
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
 */const l0={error:"UNKNOWN_ERROR"};function u0(n){return yl.encodeString(JSON.stringify(n),!1)}async function dl(n,e=!1){const t=n.app;Su(t);const r=ke(t);let i=r.token,s;if(i&&!Sr(i)&&(r.token=void 0,i=void 0),!i){const l=await r.cachedTokenPromise;l&&(Sr(l)?i=l:await bc(t,void 0))}if(!e&&i&&Sr(i))return{token:i.token};let o=!1;if(Cu()){r.exchangeTokenPromise||(r.exchangeTokenPromise=Pu(u_(t,await ku()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),o=!0);const l=await r.exchangeTokenPromise;return await bc(t,l),r.token=l,{token:l.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),o=!0),i=await ke(t).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"?hs.warn(l.message):hs.error(l),s=l}let c;return i?s?Sr(i)?c={token:i.token,internalError:s}:c=Uf(s):(c={token:i.token},r.token=i,await bc(t,i)):c=Uf(s),o&&y_(t,c),c}async function d0(n){const e=n.app;Su(e);const{provider:t}=ke(e);if(Cu()){const r=await ku(),{token:i}=await Pu(u_(e,r),n.heartbeatServiceProvider);return{token:i}}else{const{token:r}=await t.getToken();return{token:r}}}function g_(n,e,t,r){const{app:i}=n,s=ke(i),o={next:t,error:r,type:e};if(s.tokenObservers=[...s.tokenObservers,o],s.token&&Sr(s.token)){const c=s.token;Promise.resolve().then(()=>{t({token:c.token}),Ff(n)}).catch(()=>{})}s.cachedTokenPromise.then(()=>Ff(n))}function __(n,e){const t=ke(n),r=t.tokenObservers.filter(i=>i.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function Ff(n){const{app:e}=n,t=ke(e);let r=t.tokenRefresher;r||(r=h0(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function h0(n){const{app:e}=n;return new YA(async()=>{const t=ke(e);let r;if(t.token?r=await dl(n,!0):r=await dl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=ke(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const i=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,i),Math.max(0,r-Date.now())}else return 0},Lf.RETRIAL_MIN_WAIT,Lf.RETRIAL_MAX_WAIT)}function y_(n,e){const t=ke(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Sr(n){return n.expireTimeMillis-Date.now()>0}function Uf(n){return{token:u0(l0),error:n}}/**
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
 */class f0{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=ke(this.app);for(const t of e)__(this.app,t.next);return Promise.resolve()}}function p0(n,e){return new f0(n,e)}function m0(n){return{getToken:e=>dl(n,e),getLimitedUseToken:()=>d0(n),addTokenListener:e=>g_(n,"INTERNAL",e),removeTokenListener:e=>__(n.app,e)}}const g0="@firebase/app-check",_0="0.8.11";/**
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
 */const y0="https://www.google.com/recaptcha/api.js";function v0(n,e){const t=new Ki,r=ke(n);r.reCAPTCHAState={initialized:t};const i=I0(n),s=Mf(!1);return s?Bf(n,e,s,i,t):T0(()=>{const o=Mf(!1);if(!o)throw new Error("no recaptcha");Bf(n,e,o,i,t)}),t.promise}function Bf(n,e,t,r,i){t.ready(()=>{E0(n,e,t,r),i.resolve(t)})}function I0(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function w0(n){Su(n);const t=await ke(n).reCAPTCHAState.initialized.promise;return new Promise((r,i)=>{const s=ke(n).reCAPTCHAState;t.ready(()=>{r(t.execute(s.widgetId,{action:"fire_app_check"}))})})}function E0(n,e,t,r){const i=t.render(r,{sitekey:e,size:"invisible",callback:()=>{ke(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{ke(n).reCAPTCHAState.succeeded=!1}}),s=ke(n);s.reCAPTCHAState=Object.assign(Object.assign({},s.reCAPTCHAState),{widgetId:i})}function T0(n){const e=document.createElement("script");e.src=y0,e.onload=n,document.head.appendChild(e)}/**
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
 */class Du{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;A0(this._throttleData);const i=await w0(this._app).catch(o=>{throw Ze.create("recaptcha-error")});if(!(!((e=ke(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw Ze.create("recaptcha-error");let s;try{s=await Pu(ZA(this._app,i),this._heartbeatServiceProvider)}catch(o){throw!((t=o.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=b0(Number((r=o.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),Ze.create("throttled",{time:l_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,s}initialize(e){this._app=e,this._heartbeatServiceProvider=_s(e,"heartbeat"),v0(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Du?this._siteKey===e._siteKey:!1}}function b0(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+QA,httpStatus:n};{const t=e?e.backoffCount:0,r=Gy(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function A0(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw Ze.create("throttled",{time:l_(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
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
 */function R0(n=up(),e){n=be(n);const t=_s(n,"app-check");if(Ua().initialized||c0(),Cu()&&ku().then(i=>console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(s.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&s.provider.isEqual(e.provider))return i;throw Ze.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return S0(n,e.provider,e.isTokenAutoRefreshEnabled),ke(n).isTokenAutoRefreshEnabled&&g_(r,"INTERNAL",()=>{}),r}function S0(n,e,t){const r=KA(n,Object.assign({},a_));r.activated=!0,r.provider=e,r.cachedTokenPromise=o0(n).then(i=>(i&&Sr(i)&&(r.token=i,y_(n,{token:i.token})),i)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const P0="app-check",$f="app-check-internal";function C0(){fn(new Vt(P0,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return p0(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider($f).initialize()})),fn(new Vt($f,n=>{const e=n.getProvider("app-check").getImmediate();return m0(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),Nt(g0,_0)}C0();const k0={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},D0="altorra-crm",xu=lp(k0,D0);R0(xu,{provider:new Du("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const ea=dE(xu),de=AA(xu,{localCache:$A({tabManager:o_({})})});function qi(n){const e=G.get().permissions||[];return e.includes("*")||e.includes(n)}function x0(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function N0(n){try{const e=await r_(ht(de,"usuarios",n.uid)),t=e.exists()?e.data():null;G.set({user:n,profile:t,permissions:x0(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),G.set({user:n,profile:null,permissions:[],ready:!0})}}function V0(){JI(ea,Up).catch(()=>{}),ew(ea,n=>{n?N0(n):G.set({user:null,profile:null,permissions:[],ready:!0})})}const O0={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function L0(n,e){G.set({authError:null});try{await YI(ea,String(n).trim(),e)}catch(t){const r=O0[t&&t.code]||"No se pudo iniciar sesión.";throw G.set({authError:r}),t}}async function M0(){if(G.get().mock){G.set({user:null,profile:null,permissions:[]});return}await tw(ea)}function Ac(){const{profile:n,user:e}=G.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function F0(){const{profile:n}=G.get();return n&&(n.cargo||n.roleName)||"Asesor"}const U0=["bandeja","pipeline","agenda","reportes","contactos"];function v_(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return U0.includes(e)?e:"bandeja"}function B0(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function $0(n){const e=()=>n(v_());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function f(n,e={},t=[]){const r=document.createElement(n);for(const[i,s]of Object.entries(e))s==null||s===!1||(i==="class"?r.className=s:i==="html"?r.innerHTML=s:i==="text"?r.textContent=s:i==="dataset"?Object.assign(r.dataset,s):i==="style"&&typeof s=="object"?Object.assign(r.style,s):i.startsWith("on")&&typeof s=="function"?r.addEventListener(i.slice(2).toLowerCase(),s):r.setAttribute(i,s===!0?"":String(s)));for(const i of[].concat(t))i==null||i===!1||i===""||r.append(i.nodeType?i:document.createTextNode(String(i)));return r}function ue(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let Nr=null;function I_(n){Nr&&!Nr.contains(n.target)&&ta()}function w_(n){n.key==="Escape"&&ta()}function ta(){Nr&&(Nr.remove(),Nr=null,document.removeEventListener("mousedown",I_,!0),window.removeEventListener("keydown",w_,!0))}function sn(n,e,t,r={}){ta();const i=f("div",{class:"popover",role:"menu"});r.title&&i.append(f("div",{class:"popover__title",text:r.title})),e.forEach(o=>{if(o.divider){i.append(f("div",{class:"popover__divider"}));return}const c=f("button",{class:"popover__item"+(o.active?" is-active":""),type:"button",role:"menuitem"},[o.icon?f("span",{class:"popover__icon",text:o.icon}):null,f("span",{class:"u-grow u-truncate",text:o.label}),o.hint?f("span",{class:"popover__hint u-caption",text:o.hint}):null]);c.addEventListener("click",l=>{l.stopPropagation(),ta(),t(o)}),i.append(c)}),document.body.append(i),j0(i,n),Nr=i,setTimeout(()=>{document.addEventListener("mousedown",I_,!0),window.addEventListener("keydown",w_,!0)},0);const s=i.querySelector(".popover__item");s&&s.focus()}function j0(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,i=n.offsetHeight;let s=t.bottom+6,o=t.right-r;o<8&&(o=8),o+r>window.innerWidth-8&&(o=window.innerWidth-r-8),s+i>window.innerHeight-8&&(s=t.top-i-6),n.style.top=`${Math.max(8,s)}px`,n.style.left=`${Math.max(8,o)}px`}function Ds(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function q0(n){return String(n||"").replace(/\D/g,"")}function E_(n,e){const t=q0(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function T_(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function Xr(n){const e=T_(n);return e===1/0?1/0:e/864e5}function Kn(n){const e=T_(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const i=Math.floor(r/24);return i===1?"ayer":i<7?`hace ${i} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function z0(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Rc(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),i=t%60;return i?`${r} h ${i} min`:`${r} h`}function Li(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function na(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const G0="0.4.1",K0=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0}],Sc={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos"};function W0(n){const e={},t=f("div",{class:"sidebar__brand"},[f("span",{class:"sidebar__logo",text:"ALTORRA"}),f("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=f("nav",{class:"sidebar__nav","aria-label":"Secciones"});K0.forEach(x=>{const P=f("button",{class:"navitem",type:"button",disabled:!x.ready},[f("span",{class:"navitem__icon","aria-hidden":"true",text:x.icon}),f("span",{class:"navitem__label",text:x.label}),x.ready?null:f("span",{class:"navitem__soon",text:"Pronto"})]);x.ready&&P.addEventListener("click",()=>B0(x.id)),e[x.id]=P,r.append(P)});const i=f("aside",{class:"sidebar"},[t,r,f("div",{class:"sidebar__foot u-caption u-faint"},[`v${G0} · Fase 4`])]),s=f("h1",{class:"topbar__h",text:Sc.bandeja}),o=f("span",{class:"topbar__crumb u-caption u-faint",text:G.get().mock?"modo demo":"tiempo real"}),c=f("div",{class:"topbar__title"},[s,o]),l=f("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[f("span",{"aria-hidden":"true",text:G.get().theme==="dark"?"☀️":"🌙"})]);l.addEventListener("click",()=>{const x=vy();l.firstChild.textContent=x==="dark"?"☀️":"🌙"});const d=f("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Ds(Ac())}),f("span",{class:"usermenu__meta"},[f("span",{class:"usermenu__name u-truncate",text:Ac()}),f("span",{class:"usermenu__role u-caption u-faint u-truncate",text:F0()})])]);d.addEventListener("click",()=>{sn(d,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],x=>{x.value==="logout"&&M0()},{title:Ac()})});const p=f("header",{class:"topbar"},[c,f("div",{class:"topbar__actions u-row"},[l,d])]),g=f("main",{class:"outlet",id:"outlet"}),T=f("div",{id:"detail-root"}),A=f("div",{class:"app-shell"},[i,f("div",{class:"app-main"},[p,g]),T]);ue(n),n.removeAttribute("aria-busy"),n.append(A);function k(x){Object.entries(e).forEach(([P,q])=>{const V=P===x;q.classList.toggle("is-active",V),V?q.setAttribute("aria-current","page"):q.removeAttribute("aria-current")}),s.textContent=Sc[x]||Sc.bandeja}return{outlet:g,detailRoot:T,setActive:k}}function H0(n){const e=f("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=f("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=f("div",{class:"login__error",role:"alert",hidden:!0}),i=f("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),s=f("form",{class:"login__form"},[f("label",{class:"field"},[f("span",{class:"field__label",text:"Correo"}),e]),f("label",{class:"field"},[f("span",{class:"field__label",text:"Contraseña"}),t]),r,i]);s.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,i.disabled=!0,i.textContent="Entrando…";try{await L0(e.value,t.value)}catch{r.textContent=G.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,i.disabled=!1,i.textContent="Entrar"}});const o=f("div",{class:"login surface"},[f("div",{class:"login__brand"},[f("span",{class:"login__logo",text:"ALTORRA"}),f("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),f("h1",{class:"login__title",text:"Bienvenido"}),f("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),s,f("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);ue(n),n.removeAttribute("aria-busy"),n.append(f("div",{class:"login-wrap"},[o])),setTimeout(()=>e.focus(),50)}const Q0=()=>document.getElementById("toast-root"),jf={ok:"✓",error:"⚠",info:"ℹ"};function ee(n,e="info",t=3200){const r=Q0();if(!r)return;const i=document.createElement("div");i.className=`toast toast--${e}`,i.setAttribute("role",e==="error"?"alert":"status");const s=document.createElement("span");s.setAttribute("aria-hidden","true"),s.textContent=jf[e]||jf.info;const o=document.createElement("span");o.className="u-grow",o.textContent=n,i.append(s,o),r.appendChild(i);const c=()=>{i.classList.add("is-leaving"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},l=setTimeout(c,t);i.addEventListener("click",()=>{clearTimeout(l),c()})}const Y0=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],J0=["cita","test_drive","test-drive","visita","agendar","peritaje"],X0=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],Z0=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],eR={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function Ba(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return Z0.some(i=>e.includes(i)||t.includes(i))?r="pqr":t.includes("cita")||J0.some(i=>e.includes(i))?r="cita":X0.some(i=>e.includes(i))&&(r="solicitud"),{type:r,...eR[r]}}function Nu(n){const e=String(n.sourceDetail||"").toLowerCase();return Y0.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const tR={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function fs(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...tR[t]}}const nR=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],rR=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],so={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function b_(n){const e=Zr(n.status),{type:t}=Ba(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(so[t]||so.lead));const i=r-Date.now(),s=so[t]||so.lead;let o="ok";return e?o="ok":i<=0?o="late":i<s*.25&&(o="warn"),{state:o,dueAt:r,remainingMs:i,closed:e}}const hl=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"calificado",label:"Calificado",badge:"ok"},{id:"no_calificado",label:"No calificado",badge:""},{id:"convertido",label:"Convertido",badge:"ok"},{id:"perdido",label:"Perdido",badge:"danger"}],iR=hl.reduce((n,e)=>(n[e.id]=e,n),{});function Ao(n){return iR[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function Zr(n){return n==="convertido"||n==="perdido"||n==="no_calificado"}function A_(n){return!n.status||n.status==="nuevo"}const fl={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},Bn=n=>Math.max(0,Math.min(1,n));function sR(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return Nu(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),Bn(t)}function oR(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const i=(r.match(/\d[\d.,]{5,}/g)||[]).map(s=>parseInt(s.replace(/\D/g,""),10)).filter(s=>s>0);i.length&&(e=Math.max(e,Math.max(...i)/5e7))}return Bn(e)}function aR(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(Xr(r)>30||e.add(String(r).slice(0,10)))}return Bn(e.size/8)}function R_(n,e=[],t=null){const r=Array.isArray(e)?e:[],i={intent:sR(n),interactions:Bn(r.length/6),recency:n.lastActivityAt?Bn(1-Xr(n.lastActivityAt)/30):0,frequency:aR(r),economic:oR(r),age:n.createdAt?Bn(Xr(n.createdAt)/60):0,engagement:t&&Number(t.score)?Bn(t.score/100):0};let s=0;for(const c of Object.keys(fl))s+=i[c]*fl[c];const o=Math.round(s*100);return{score:o,rating:cR(o),factors:i}}function cR(n){return n>=70?"hot":n>=40?"warm":"cold"}const Vr={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},qf={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},lR=fl;function S_(n,e={}){const t=Number(e.score)||0,{type:r}=Ba(n),i=Xr(n.createdAt),s=Xr(n.lastActivityAt),o=A_(n),c=Zr(n.status),l=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&o,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&o&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:Nu(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:o&&i<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&s>=2&&s<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:s>=30&&s!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],p=l.filter(g=>g.when).sort((g,T)=>T.priority-g.priority)[0]||l[l.length-1];return{id:p.id,label:p.label,reason:p.reason,icon:p.icon,priority:p.priority}}function P_(n,e=[]){const{score:t,rating:r,factors:i}=R_(n,e,null);return{...n,_score:t,_rating:r,_factors:i,_type:Ba(n),_channel:fs(n),_sla:b_(n),_nba:S_(n,{score:t})}}function oo(n){return n.map(e=>P_(e))}const pl=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function C_(n,e,t){switch(e){case"calientes":return A_(n)&&!Zr(n.status)&&(n._rating==="hot"||Nu(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!Zr(n.status);case"todo":default:return!0}}function uR(n,e){const t={};for(const r of pl)t[r.id]=0;for(const r of n)for(const i of pl)C_(r,i.id,e)&&t[i.id]++;return t}const ao={late:0,warn:1,ok:2};function dR(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return ao[t]!==ao[r]?ao[t]-ao[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function hR(n,{type:e,channel:t,status:r}){return n.filter(i=>!(e&&i._type.type!==e||t&&i._channel.key!==t||r&&(i.status||"nuevo")!==r))}function fR(n,e){const t=na(e).trim();return t?n.filter(r=>na([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function pR(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function mR(n,{queue:e,uid:t,filters:r,search:i,showClosed:s=!1}){let o=n.filter(l=>C_(l,e,t));o=hR(o,r),o=fR(o,i);let c=0;if(!s&&!r.status){const l=o.filter(d=>!Zr(d.status));c=o.length-l.length,o=l}return o.sort(dR),{rows:o,hiddenClosed:c}}const xs=()=>new Date().toISOString(),Vu=n=>({id:n.id,...n.data()});function gR({pageSize:n=40,onData:e,onError:t}){let r=null;const i=Et(Pe(de,"leads"),Tt("createdAt","desc"),Ut(n));return{unsubscribe:ks(i,o=>{const c=o.docs.map(Vu);r=o.docs[o.docs.length-1]||null,e(c,{hasMore:o.size>=n})},o=>{t&&t(o)}),getLastDoc:()=>r}}async function _R({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=Et(Pe(de,"leads"),Tt("createdAt","desc"),OA(e),Ut(n)),r=await Jr(t);return{rows:r.docs.map(Vu),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function yR(){const e=(await Jr(Pe(de,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return G.set({team:e}),e}async function vR(n,e){await En(ht(de,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:xs(),updatedBy:ei(),_version:ar(1)})}async function IR(n,e,t={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const r=xs();await En(ht(de,"leads",n),{status:e,lastActivityAt:r,updatedAt:r,updatedBy:ei(),_version:ar(1)}),await qt(Pe(de,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:ei(),createdAt:r,_version:1})}async function zf(n,{type:e="nota",subject:t="",body:r="",direction:i="outbound",name:s=""}){await qt(Pe(de,"activities"),{type:e,subject:t,body:r,status:"closed",direction:i,relatedTo:{type:"lead",id:n,name:s},ownerId:ei(),createdAt:xs(),_version:1})}async function wR(n,{subject:e,dueAt:t,name:r=""}){await qt(Pe(de,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:ei(),createdAt:xs(),_version:1})}async function ER(){const n=new Date;n.setHours(23,59,59,999);const e=Et(Pe(de,"activities"),us("dueAt","<=",n.toISOString()),Tt("dueAt","desc"),Ut(80));return(await Jr(e)).docs.map(Vu).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,i)=>String(r.dueAt).localeCompare(String(i.dueAt)))}async function TR(n){await En(ht(de,"activities",n),{status:"closed",closedAt:xs(),closedBy:ei()})}function ei(){const n=G.get().user;return n?n.uid:null}const bR="ventas",$a=[{id:"nuevo",label:"Nuevo",prob:.1},{id:"contactado",label:"Contactado",prob:.2},{id:"cita_agendada",label:"Cita agendada",prob:.35},{id:"visito",label:"Visitó",prob:.5},{id:"test_drive",label:"Test drive",prob:.65},{id:"negociacion",label:"Negociación",prob:.8},{id:"financiacion",label:"Financiación",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],AR={id:"perdido",label:"Perdido",prob:0,lost:!0},zi=$a.filter(n=>!n.won),k_=[...$a,AR].reduce((n,e)=>(n[e.id]=e,n),{});function D_(n){return k_[n]||$a[0]}function ra(n){const e=k_[n];return e?e.prob:0}function Ou(n){return Math.round((Number(n.amount)||0)*ra(n.stageId))}function x_(n){return n.reduce((e,t)=>e+(t.status==="open"?Ou(t):0),0)}function RR(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function SR(n,e=14){return n.status==="open"&&Xr(n.lastActivityAt)>e}function PR(n){const e={};for(const t of zi)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}function Lu(n){const e=n.vehicleOfInterestId||"",t=$a[0];return{name:(n.fullName||"Oportunidad")+(e?" · "+e:""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:e||null,vehicleName:e||"",pipelineId:bR,stageId:t.id,stageName:t.label,status:"open",amount:0,currency:"COP",probability:t.prob,weightedAmount:0,expectedCloseDate:null,ownerId:n.ownerId||null,ownerName:n.ownerName||null,source:n.source||"web",nextStep:""}}const ci=()=>new Date().toISOString(),CR=n=>({id:n.id,...n.data()}),hn=()=>G.get().user?G.get().user.uid:null;function ja(n,e,t){return qt(Pe(de,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:hn(),createdAt:ci(),_version:1})}function kR({pageSize:n=100,onData:e,onError:t}){const r=Et(Pe(de,"deals"),us("status","==","open"),Tt("lastActivityAt","desc"),Ut(n));return ks(r,i=>e(i.docs.map(CR)),i=>t&&t(i))}async function N_(n){const e=ci(),t=Lu(n),r=await qt(Pe(de,"deals"),{...t,weightedAmount:0,lastActivityAt:e,createdAt:e,updatedAt:e,createdBy:hn(),updatedBy:hn(),_version:1});return await En(ht(de,"leads",n.id),{status:"convertido",convertedTo:{dealId:r.id},lastActivityAt:e,updatedAt:e,updatedBy:hn(),_version:ar(1)}),await ja(r.id,t.contactName,"Oportunidad creada desde lead"),r.id}async function DR(n,e,t={}){const r=ci(),i=D_(e);await En(ht(de,"deals",n),{stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:r,updatedAt:r,updatedBy:hn(),_version:ar(1)}),await ja(n,t.contactName,"Etapa → "+i.label)}async function xR(n,e,t={}){const r=ci(),i=Math.max(0,Math.round(Number(e)||0));await En(ht(de,"deals",n),{amount:i,weightedAmount:Math.round(i*ra(t.stageId)),updatedAt:r,updatedBy:hn(),_version:ar(1)})}async function NR(n,e={}){const t=ci();await En(ht(de,"deals",n),{status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:t,updatedAt:t,updatedBy:hn(),_version:ar(1)}),await ja(n,e.contactName,"🎉 Venta GANADA")}async function VR(n,e,t={}){const r=ci();await En(ht(de,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"").trim()||"Sin motivo",lastActivityAt:r,updatedAt:r,updatedBy:hn(),_version:ar(1)}),await ja(n,t.contactName,"Perdido: "+(e||"sin motivo"))}async function OR(n){const e=G.get().user?G.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await qt(Pe(de,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const $n=n=>new Date(Date.now()-n*6e4).toISOString(),Ee=n=>$n(n*60),Z=n=>$n(n*60*24),LR=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],Mu=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:$n(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:$n(18),lastActivityAt:$n(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:$n(5),contactId:"email_casalcedo_outlook_com",createdAt:Ee(1),lastActivityAt:Ee(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Ee(-1),contactId:"email_diana_r_hotmail_com",createdAt:Ee(5),lastActivityAt:Ee(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Ee(-3),contactId:"phone_573044455667",createdAt:Ee(8),lastActivityAt:Ee(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:Z(-1),contactId:"email_lauraortiz_gmail_com",createdAt:Z(1),lastActivityAt:Ee(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Z(-1),contactId:"email_pnarango_empresa_co",createdAt:Z(2),lastActivityAt:Z(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Z(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:Z(4),lastActivityAt:Z(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Z(-2),contactId:"email_afcuesta_gmail_com",createdAt:Z(6),lastActivityAt:Z(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Z(-10),contactId:"email_cata_rios_gmail_com",createdAt:Z(12),lastActivityAt:Z(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Ee(-2),contactId:"email_glopa_gmail_com",createdAt:Ee(3),lastActivityAt:Ee(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Z(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:Z(10),lastActivityAt:Z(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:Z(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:Z(15),lastActivityAt:Z(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Z(19),contactId:"email_hdloaiza_gmail_com",createdAt:Z(20),lastActivityAt:Z(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:Z(24),contactId:"email_pasuarez_gmail_com",createdAt:Z(25),lastActivityAt:Z(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:Z(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:Z(22),lastActivityAt:Z(9),_version:4}],MR={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:$n(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Ee(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Ee(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Ee(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:Z(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:Ee(20),_version:1}]},ps={};Mu.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";ps[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});ps.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:Z(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:Z(3),lastActivityAt:Z(3),_version:1};const Ro={},ia=()=>Mu.map(n=>({...n})),V_=()=>LR.map(n=>({...n})),FR=n=>(MR[n]||[]).map(e=>({...e})),UR=n=>ps[n]?{...ps[n]}:null,BR=()=>Object.values(ps).map(n=>({...n})),Gf=n=>(Ro[n]||[]).map(e=>({...e}));function $R(n,e){Ro[n]||(Ro[n]=[]),Ro[n].unshift({id:"n"+Date.now(),...e})}let jR=100;const Gi=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"contactado",stageName:"Contactado",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:Ee(2),createdAt:Ee(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_agendada",stageName:"Cita agendada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:Ee(20),createdAt:Z(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"test_drive",stageName:"Test drive",status:"open",amount:68e6,currency:"COP",probability:.65,weightedAmount:442e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:Z(18),createdAt:Z(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.8,weightedAmount:108e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:Ee(6),createdAt:Z(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"nuevo",stageName:"Nuevo",status:"open",amount:0,currency:"COP",probability:.1,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:Ee(1),createdAt:Ee(1),_version:1},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:Z(3),createdAt:Z(10),_version:6},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:Z(5),createdAt:Z(15),_version:7},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:Z(9),createdAt:Z(22),_version:4}],O_=()=>Gi.map(n=>({...n}));function L_(n){const e="d"+ ++jR;return Gi.unshift({id:e,...n}),e}function qR(n,e){const t=Gi.findIndex(r=>r.id===n);t>=0&&(Gi[t]={...Gi[t],...e})}const kn=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},ml=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:kn(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:kn(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:kn(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:kn(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:kn(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:kn(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:kn(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],zR=()=>ml.map(n=>({...n}));function GR(n){ml.push({id:"ag"+(ml.length+1),...n})}let KR=100;function M_(n){const e="lm"+ ++KR,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),i=(n.prefijoPais||"+57").replace(/\D/g,""),s=r?"+"+(r.startsWith(i)?r:i+r):"",o=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:o,phone:s,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:o?"email_"+o.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return Mu.unshift(c),e}function WR(){const n={},e=(g,T,A)=>f("label",{class:"field"},[f("span",{class:"field__label",text:g}),T,null]);n.nombre=f("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=f("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=f("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=f("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=f("select",{class:"select"},nR.map(g=>f("option",{value:g.id},[`${g.icon} ${g.label}`]))),n.interes=f("select",{class:"select"},rR.map(g=>f("option",{value:g.id},[g.label]))),n.trafico=f("select",{class:"select"},[f("option",{value:""},["— Tráfico —"]),f("option",{value:"organico"},["Orgánico"]),f("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=f("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=f("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=f("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=f("input",{type:"checkbox",checked:!0});const t=f("div",{class:"login__error",role:"alert",hidden:!0}),r=f("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),i=f("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),s=f("form",{class:"nl-form"},[e("Nombre *",n.nombre),f("div",{class:"nl-row"},[f("label",{class:"field",style:{flex:"0 0 auto"}},[f("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),f("label",{class:"field u-grow"},[f("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),f("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),f("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),f("label",{class:"nl-consent"},[n.consent,f("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,f("div",{class:"nl-actions"},[r,i])]),o=f("div",{class:"modal"},[f("div",{class:"modal__head"},[f("h2",{class:"modal__title",text:"＋ Nuevo lead"}),f("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),s]),c=f("div",{class:"modal-overlay"},[o]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const l=()=>{c.remove(),window.removeEventListener("keydown",d)},d=g=>{g.key==="Escape"&&l()};window.addEventListener("keydown",d),c.addEventListener("mousedown",g=>{g.target===c&&l()}),r.addEventListener("click",l),s.addEventListener("submit",async g=>{g.preventDefault(),t.hidden=!0;const T={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!T.nombre)return p("Escribe el nombre del cliente.");if(!T.email&&!T.telefono)return p("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");i.disabled=!0,i.textContent="Guardando…";try{G.get().mock?(M_(T),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await OR(T),ee("✓ Lead agregado a la Bandeja","ok"),l()}catch{i.disabled=!1,i.textContent="Agregar lead",p("No se pudo agregar. Intenta de nuevo.")}});function p(g){return t.textContent=g,t.hidden=!1,!1}}const gl="altorra_friction_v1",HR=300;function F_(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),i=JSON.parse(localStorage.getItem(gl)||"[]");for(i.push({task:n,ms:r,at:new Date().toISOString(),...t});i.length>HR;)i.shift();localStorage.setItem(gl,JSON.stringify(i))}catch{}}function QR(){try{const n=JSON.parse(localStorage.getItem(gl)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,i]of Object.entries(e)){const s=[...i].sort((o,c)=>o-c);t[r]={n:i.length,mediana_s:+(s[Math.floor(s.length/2)]/1e3).toFixed(1),p90_s:+(s[Math.floor(s.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=QR);const YR=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],JR="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function XR(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=G.get().user||{},r=f("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),i=f("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),s=f("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),o=f("input",{type:"checkbox"}),c=f("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function l(){c.replaceChildren(...YR.map(L=>{const $=f("button",{class:"chip"+(e.fuente===L.id?" chip--active":""),type:"button"},[`${L.icon} ${L.label}`]);return $.addEventListener("click",()=>{e.fuente=L.id,l()}),$}))}l();const d=f("button",{class:"chip",type:"button"},["Orgánico"]);d.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",d.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const p=f("div",{class:"login__error",role:"alert",hidden:!0}),g=f("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),T=f("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),A=f("form",{class:"nl-form"},[f("label",{class:"field"},[f("span",{class:"field__label",text:"Nombre *"}),r]),f("label",{class:"field"},[f("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),i]),f("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,d]),f("label",{class:"field"},[f("span",{class:"field__label",text:"Nota"}),s]),f("label",{class:"nl-consent"},[o,f("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",f("em",{text:JR})])]),p,f("div",{class:"nl-actions"},[g,T])]),k=f("div",{class:"modal"},[f("div",{class:"modal__head"},[f("h2",{class:"modal__title",text:"⚡ Lead rápido"}),f("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),A]),x=f("div",{class:"modal-overlay"},[k]);document.body.appendChild(x),setTimeout(()=>r.focus(),30);const P=()=>{x.remove(),window.removeEventListener("keydown",q)},q=L=>{L.key==="Escape"&&P()};window.addEventListener("keydown",q),x.addEventListener("mousedown",L=>{L.target===x&&P()}),g.addEventListener("click",P),A.addEventListener("submit",L=>{L.preventDefault(),p.hidden=!0;const $={nombre:r.value.trim(),telefono:i.value.trim(),fuente:e.fuente,medio:e.medio,nota:s.value.trim(),consentVerbal:o.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!$.nombre)return V("Escribe el nombre.");if(!$.telefono||$.telefono.replace(/\D/g,"").length<7)return V("Escribe un teléfono válido.");if(!$.ownerId&&!G.get().mock)return V("Sesión sin usuario — recarga el portal.");if(G.get().mock){M_({nombre:$.nombre,telefono:$.telefono,canal:$.fuente,trafico:$.medio,consentGiven:$.consentVerbal,notas:$.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),ee("⚡ Lead registrado (mock)","ok"),P();return}qt(Pe(de,"lead_intake"),$).catch(N=>{console.error("[quick-lead] rechazo del servidor:",N),ee('El lead "'+$.nombre+'" fue RECHAZADO al sincronizar: '+(N.code||N.message),"error")}),ee(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),F_("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),P()});function V(L){return p.textContent=L,p.hidden=!1,!1}}const Dn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'};function ZR(){const n=(t,r)=>{const i=new Date;return i.setDate(i.getDate()+t),i.setHours(r,0,0,0),i.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function U_(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=qi("crm.edit"),r=G.get().user&&G.get().user.uid,i=f("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),s=f("label",{class:"search","aria-label":"Buscar"},[f("span",{html:Dn.search,"aria-hidden":"true"}),f("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),o=f("div",{class:"inbox__filters"}),c=t?f("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>XR());const l=t?f("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;l&&l.addEventListener("click",()=>WR());const d=f("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);d.addEventListener("click",()=>F());const p=f("div",{class:"inbox__pendientes",hidden:!0}),g=f("div",{class:"inbox__toolbar"},[s,o,c,l,d]),T=f("div",{class:"inbox__list",role:"list",tabindex:"-1"}),A=f("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),k=f("section",{class:"inbox"},[A,i,g,p,T]);ue(n),n.append(k);const x=s.querySelector("input");x.addEventListener("input",()=>{e.search=x.value,te()});async function P(O,j){if(I(O.id,{ownerId:j?j.uid:null,ownerName:j?j.nombre:null}),G.get().mock){ee(j?`Asignado a ${j.nombre}`:"Sin asignar","ok");return}try{await vR(O.id,j),ee(j?`Asignado a ${j.nombre}`:"Sin asignar","ok")}catch{ee("No se pudo asignar","error")}}async function q(O,j){if(I(O.id,{status:j,lastActivityAt:new Date().toISOString()}),G.get().mock){ee(`Estado → ${Ao(j).label}`,"ok");return}try{await IR(O.id,j,O),ee(`Estado → ${Ao(j).label}`,"ok")}catch{ee("No se pudo cambiar el estado","error")}}function V(O,j){const W=E_(O.phone,eS(O));if(!W){ee("Este lead no tiene teléfono","error");return}window.open(W,"_blank","noopener"),!G.get().mock&&t&&zf(O.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:O.fullName}).catch(()=>{}),$(O,j)}function L(O,j){!G.get().mock&&t&&zf(O.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:O.fullName}).catch(()=>{}),ee("📞 Llamada registrada","ok"),$(O,j)}function $(O,j){if(!t)return;const W=performance.now();sn(j||document.body,ZR(),ae=>{if(F_("proximo_paso",W,{preset:ae.label}),!!ae.value){if(ae.value==="abrir360"){Rt(O.id);return}if(G.get().mock){ee("Próximo paso anotado (mock)","ok");return}wR(O.id,{subject:ae.value.subject,dueAt:ae.value.dueAt,name:O.fullName}).then(()=>ee("✓ Próximo paso: "+ae.label,"ok")).catch(()=>ee("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(O.fullName||"el cliente").split(/\s+/)[0]+"?"})}let N=!1;async function F(){N=!N,p.hidden=!N,N&&await v()}async function v(){if(ue(p),G.get().mock){p.append(f("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}p.append(f("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let O=[];try{O=await ER()}catch{ue(p),p.append(f("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(ue(p),p.append(f("div",{class:"inbox__listhead"},[f("span",{class:"u-muted u-caption",text:`📋 ${O.length} pendiente${O.length===1?"":"s"} (hoy y vencidos)`})])),!O.length){p.append(f("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const j=Date.now();O.forEach(W=>{const ae=new Date(W.dueAt).getTime()<j,ne=f("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),me=f("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),Ve=f("div",{class:"lead-card",style:{alignItems:"center"}},[f("span",{class:`badge badge--${ae?"danger":"gold"}`,text:ae?"VENCIDO":"HOY"}),f("div",{class:"u-grow"},[f("div",{class:"lead-card__name",text:(W.type==="cita"?"📅 ":"")+W.subject}),f("div",{class:"u-caption u-muted",text:`${W.relatedTo&&W.relatedTo.name?W.relatedTo.name+" · ":""}${Kn(W.dueAt)}`})]),f("div",{class:"u-row u-row--tight"},[me,t?ne:null])]);me.addEventListener("click",()=>{W.relatedTo&&W.relatedTo.id&&Rt(W.relatedTo.id)}),ne.addEventListener("click",async()=>{ne.disabled=!0;try{await TR(W.id),ee("✓ Hecho","ok"),await v(),W.relatedTo&&W.relatedTo.id&&$({id:W.relatedTo.id,fullName:W.relatedTo.name||""},d)}catch{ne.disabled=!1,ee("No se pudo completar","error")}}),p.append(Ve)})}async function y(O){if(O.status==="convertido"){ee("Ya es una oportunidad","info");return}if(I(O.id,{status:"convertido"}),G.get().mock){L_(Lu(O)),ee("🎯 Convertido a oportunidad","ok");return}try{await N_(O),ee("🎯 Convertido a oportunidad","ok")}catch{ee("No se pudo convertir","error")}}function m(){G.set({leads:e.leads})}function I(O,j){const W=e.leads.findIndex(ae=>ae.id===O);W!==-1&&(e.leads[W]=P_({...e.leads[W],...j}),m(),E())}function E(){b(),w(),te()}function b(){const O=uR(e.leads,r);ue(i),pl.forEach(j=>{const W=e.queue===j.id,ae=f("button",{class:"chip"+(W?" chip--active":""),role:"tab","aria-selected":String(W),type:"button"},[f("span",{"aria-hidden":"true",text:j.icon}),f("span",{text:j.label}),f("span",{class:"chip__count",text:String(O[j.id]||0)})]);ae.addEventListener("click",()=>{e.queue=j.id,E()}),i.append(ae)})}function w(){if(ue(o),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...hl.map(j=>[j.id,j.label])]}].forEach(j=>{const W=e.filters[j.key],ae=W?(j.items.find(me=>me[0]===W)||[,j.label])[1]:j.label,ne=f("button",{class:"chip"+(W?" chip--active":""),type:"button","aria-haspopup":"menu"},[f("span",{text:ae}),f("span",{"aria-hidden":"true",text:"▾"})]);ne.addEventListener("click",()=>{sn(ne,j.items.map(([me,Ve])=>({value:me,label:Ve,active:me===W})),me=>{e.filters[j.key]=me.value,E()},{title:j.label})}),o.append(ne)}),e.filters.type||e.filters.channel||e.filters.status){const j=f("button",{class:"chip",type:"button"},["✕ Limpiar"]);j.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},E()}),o.append(j)}}function te(){if(e.loading)return ft();if(e.error)return za("⚠️","No se pudo cargar",e.error);const{rows:O,hiddenClosed:j}=mR(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(ue(T),!O.length&&!j){const ne=e.search||e.filters.type||e.filters.channel||e.filters.status;T.append(cr("🗂️",ne?"Sin resultados":"¡Bandeja al día!",ne?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const W=j||e.showClosed?f("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${j} ocultos · ver todos`]):null;W&&W.addEventListener("click",()=>{e.showClosed=!e.showClosed,te()});const ae=f("div",{class:"inbox__listhead"},[f("span",{class:"u-muted u-caption",text:`${O.length} ${O.length===1?"cliente":"clientes"} activos`}),f("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),W]);if(T.append(ae),!O.length&&j){T.append(cr("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${j} cerrados ocultos).`));return}if(O.forEach(ne=>T.append(Ae(ne))),e.hasMore&&e.queue==="todo"&&!e.search){const ne=f("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);ne.addEventListener("click",()=>Ne(ne)),T.append(f("div",{class:"inbox__more"},[ne]))}}function Ae(O){const j=Vr[O._rating],W=Ao(O.status),ae=!!(O.convertedTo&&O.convertedTo.dealId)||O.status==="convertido",ne=pR(O),me=ne&&ne.state!=="ok"?f("span",{class:`badge badge--${ne.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${ne.mins<120?ne.mins+" min":Rc(ne.mins*6e4)} sin contacto`]):null,Ve=O._sla,lr=`sla-dot sla-dot--${Ve.state}`,ur=Ve.closed?"Cerrado":Ve.state==="late"?`SLA vencido hace ${Rc(Ve.remainingMs)}`:`Responder en ${Rc(Ve.remainingMs)}`,li=[O._type.icon+" "+O._type.label,O.sourceDetail,O.vehicleOfInterestId?"🚗 "+O.vehicleOfInterestId:""].filter(Boolean).join(" · "),Tn=f("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":O.id,"aria-label":`${O.fullName}, ${j.label}`},[f("span",{class:lr,title:ur,"aria-label":ur}),f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Ds(O.fullName)}),f("div",{class:"lead-card__main u-grow"},[f("div",{class:"lead-card__top"},[f("span",{class:"lead-card__name u-truncate",text:O.fullName}),f("span",{class:`temp ${j.cls}`,title:`Score ${O._score}/100`},[`${j.icon} ${O._score}`])]),f("div",{class:"lead-card__what u-truncate u-muted",text:li}),f("div",{class:"lead-card__meta u-caption"},[f("span",{class:"lead-card__chan",text:`${O._channel.icon} ${O._channel.label}`}),f("span",{class:"lead-card__dot",text:"·"}),f("span",{text:Kn(O.createdAt)}),f("span",{class:"lead-card__dot",text:"·"}),ae?f("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},["🎯 Convertido → ver Pipeline"]):f("span",{class:`badge badge--${W.badge||""}`.trim(),text:W.label}),me?f("span",{class:"lead-card__dot",text:"·"}):null,me,O.ownerName?f("span",{class:"lead-card__dot",text:"·"}):null,O.ownerName?f("span",{class:"u-faint",text:"👤 "+O.ownerName}):null]),f("div",{class:"lead-card__nba"},[f("span",{"aria-hidden":"true",text:O._nba.icon}),f("span",{class:"u-muted",text:"Próx: "}),f("strong",{text:O._nba.label})])]),f("div",{class:"lead-card__actions"},[Ce("wa",Dn.wa,"WhatsApp","btn--wa"),t?Ce("call",Dn.call,"Registrar llamada"):null,t?Ce("assign",Dn.person,"Asignar"):null,t&&!ae?Ce("status",Dn.flag,"Cambiar estado"):null,t&&!ae?Ce("convert",Dn.convert,"Convertir a oportunidad"):null,Ce("open",Dn.expand,"Abrir 360")])]);return Tn.addEventListener("click",bn=>{const ui=bn.target.closest("[data-action]");if(ui){At(ui.dataset.action,O,ui);return}Rt(O.id)}),Tn.addEventListener("keydown",bn=>{bn.key==="Enter"?Rt(O.id):bn.key.toLowerCase()==="w"&&V(O)}),Tn}function Ce(O,j,W,ae=""){return f("button",{class:`icon-btn ${ae}`.trim(),type:"button","data-action":O,title:W,"aria-label":W},[f("span",{html:j,"aria-hidden":"true"})])}const et={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",calificado:"Va en serio: presupuesto e intención real",no_calificado:"No es un comprador (spam, curioso)",perdido:"Se enfrió antes de ser negocio"};function At(O,j,W){if(O==="open")return Rt(j.id);if(O==="wa")return V(j,W);if(O==="call")return L(j,W);if(O==="convert")return y(j);if(O==="pipeline"){window.location.hash="#/pipeline";return}if(O==="assign"){const ae=G.get().team||[],ne=[{value:null,label:"Sin asignar",icon:"⊘",active:!j.ownerId},...ae.map(me=>({value:me,label:me.nombre,hint:me.cargo,icon:"👤",active:j.ownerId===me.uid}))];return sn(W,ne,me=>P(j,me.value),{title:"Asignar a"})}if(O==="status"){if(j.convertedTo&&j.convertedTo.dealId){ee("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const ae=hl.filter(ne=>ne.id!=="convertido").map(ne=>({value:ne.id,label:ne.label,hint:et[ne.id]||"",active:(j.status||"nuevo")===ne.id}));return sn(W,ae,ne=>q(j,ne.value),{title:"Cambiar estado"})}}function Rt(O){G.set({detailLeadId:O})}function cr(O,j,W){return f("div",{class:"state"},[f("div",{class:"state__icon","aria-hidden":"true",text:O}),f("div",{class:"state__title",text:j}),f("div",{class:"state__msg",text:W})])}function za(O,j,W){ue(T),T.append(cr(O,j,W))}function ft(){ue(T);for(let O=0;O<6;O++)T.append(f("div",{class:"lead-card lead-card--skeleton"},[f("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),f("div",{class:"u-grow u-stack",style:{gap:"8px"}},[f("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),f("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function Ne(O){if(e.cursor){O.disabled=!0,O.textContent="Cargando…";try{const{rows:j,lastDoc:W,hasMore:ae}=await _R({after:e.cursor}),ne=oo(j),me=new Set(e.leads.map(Ve=>Ve.id));e.leads.push(...ne.filter(Ve=>!me.has(Ve.id))),e.cursor=W,e.hasMore=ae,m(),E()}catch{ee("No se pudo cargar más","error"),O.disabled=!1,O.textContent="Cargar más"}}}function Ga(){if(G.get().mock){G.set({team:V_()}),e.leads=oo(ia()),e.loading=!1,e.hasMore=!1,m(),E(),e.dirtyHandler=()=>{e.leads=oo(ia()),m(),E()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}yR().catch(()=>{}),e.sub=gR({pageSize:40,onData:(O,j)=>{e.leads=oo(O),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=j.hasMore,e.loading=!1,e.error=null,m(),E()},onError:O=>{console.error("[inbox] error de suscripción:",O),e.loading=!1,e.error=O&&O.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",E()}})}return E(),Ga(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function eS(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}const tS=["Precio / presupuesto","Financiación negada","Compró en otro lado","No responde","Cambió de opinión","Otro motivo"];function nS(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null},t=qi("crm.edit"),r=f("div",{class:"pipeline__bar"}),i=f("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),s=f("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),o=f("section",{class:"pipeline"},[s,r,i]);ue(n),n.append(o);function c(v,y){const m=e.deals.findIndex(I=>I.id===v);m!==-1&&(e.deals[m]={...e.deals[m],...y},G.get().mock&&qR(v,y),T())}async function l(v,y){if(v.stageId===y)return;const m=D_(y);if(c(v.id,{stageId:y,stageName:m.label,probability:m.prob,lastActivityAt:new Date().toISOString()}),G.get().mock){ee("Etapa → "+m.label,"ok");return}try{await DR(v.id,y,v)}catch{ee("No se pudo mover","error")}}async function d(v,y){if(c(v.id,{amount:y}),!G.get().mock)try{await xR(v.id,y,v)}catch{ee("No se pudo guardar el monto","error")}}async function p(v){if(c(v.id,{status:"won"}),G.get().mock){ee("🎉 ¡Venta ganada!","ok");return}try{await NR(v.id,v),ee("🎉 ¡Venta ganada!","ok")}catch{ee("Error","error")}}async function g(v,y){if(c(v.id,{status:"lost",lostReason:y}),G.get().mock){ee("Marcado perdido","info");return}try{await VR(v.id,y,v),ee("Marcado perdido","info")}catch{ee("Error","error")}}function T(){if(e.loading)return N();if(e.error)return $("⚠️","No se pudo cargar",e.error);const v=e.deals.filter(m=>m.status==="open");if(A(v),ue(i),!v.length){i.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🎯"}),f("div",{class:"state__title",text:"Embudo vacío"}),f("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const y=PR(v);zi.forEach(m=>{const I=y[m.id]||[],E=I.reduce((w,te)=>w+(Number(te.amount)||0),0),b=f("div",{class:"pcol","data-stage":m.id},[f("div",{class:"pcol__head"},[f("div",{class:"u-row u-row--tight"},[f("span",{class:"pcol__dot",style:{background:rS(m.id)}}),f("strong",{text:m.label}),f("span",{class:"pcol__count",text:String(I.length)})]),f("span",{class:"u-caption u-faint",text:`${Math.round(m.prob*100)}% · ${Li(E)||"$0"}`})]),f("div",{class:"pcol__drop","data-stage":m.id,role:"list"},I.map(x))]);L(b.querySelector(".pcol__drop"),m.id),i.append(b)})}function A(v){const y=x_(v),m=RR(v);ue(r),r.append(k("Oportunidades",String(v.length)),k("Valor del embudo",Li(m)||"$0"),k("Forecast ponderado",Li(y)||"$0",!0))}function k(v,y,m){return f("div",{class:"pstat"+(m?" pstat--hi":"")},[f("span",{class:"u-caption u-faint",text:v}),f("strong",{class:"pstat__v",text:y})])}function x(v){const y=SR(v),m=f("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[v.amount?Li(v.amount):"+ monto"]),I=f("article",{class:"deal-card"+(y?" is-rotting":""),draggable:"true",tabindex:"0","data-id":v.id,"data-stage":v.stageId,role:"listitem","aria-label":`${v.name}, ${Math.round(ra(v.stageId)*100)}%`},[f("div",{class:"deal-card__top"},[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Ds(v.contactName)}),f("span",{class:"deal-card__name u-grow u-truncate",text:v.name}),y?f("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),v.vehicleName?f("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+v.vehicleName}):null,f("div",{class:"deal-card__row"},[m,f("span",{class:"badge badge--gold",text:`${Math.round(ra(v.stageId)*100)}%`})]),f("div",{class:"deal-card__foot u-caption u-faint"},[f("span",{class:"u-grow u-truncate",text:v.ownerName?"👤 "+v.ownerName:"Sin asesor"}),f("span",{text:Kn(v.lastActivityAt)})]),f("div",{class:"deal-card__actions"},t?[P("stage","↔","Mover etapa"),P("won","✓","Marcar ganado"),P("lost","✕","Marcar perdido"),P("open","⤢","Abrir 360")]:[P("open","⤢","Abrir 360")])]);return I.addEventListener("dragstart",E=>{e.dragId=v.id,I.classList.add("is-dragging");try{E.dataTransfer.setData("text/plain",v.id),E.dataTransfer.effectAllowed="move"}catch{}}),I.addEventListener("dragend",()=>{e.dragId=null,I.classList.remove("is-dragging")}),I.addEventListener("click",E=>{const b=E.target.closest("[data-action]");if(b)return q(b.dataset.action,v,b)}),I}function P(v,y,m){return f("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":v,title:m,"aria-label":m,draggable:"false"},[y])}function q(v,y,m){if(v==="open")return G.set({detailLeadId:y.leadId});if(v==="amount")return V(y,m);if(v==="stage")return sn(m,zi.map(I=>({value:I.id,label:I.label,hint:Math.round(I.prob*100)+"%",active:I.id===y.stageId})),I=>l(y,I.value),{title:"Mover a etapa"});if(v==="won")return p(y);if(v==="lost")return sn(m,tS.map(I=>({value:I,label:I})),I=>g(y,I.value),{title:"Motivo de pérdida"})}function V(v,y){const m=f("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:v.amount||"","aria-label":"Monto en COP"});y.replaceWith(m),m.focus(),m.select();const I=()=>{const E=parseInt(String(m.value).replace(/\D/g,""),10)||0;d(v,E)};m.addEventListener("keydown",E=>{E.key==="Enter"?(E.preventDefault(),I()):E.key==="Escape"&&T()}),m.addEventListener("blur",I)}function L(v,y){v.addEventListener("dragover",m=>{m.preventDefault(),v.classList.add("is-over"),m.dataTransfer&&(m.dataTransfer.dropEffect="move")}),v.addEventListener("dragleave",()=>v.classList.remove("is-over")),v.addEventListener("drop",m=>{m.preventDefault(),v.classList.remove("is-over");const I=e.dragId||m.dataTransfer&&m.dataTransfer.getData("text/plain"),E=e.deals.find(b=>b.id===I);E&&l(E,y)})}function $(v,y,m){ue(i),i.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:v}),f("div",{class:"state__title",text:y}),f("div",{class:"state__msg",text:m})]))}function N(){ue(r),ue(i),zi.slice(0,5).forEach(()=>{i.append(f("div",{class:"pcol"},[f("div",{class:"pcol__head"},[f("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),f("div",{class:"pcol__drop"},[1,2].map(()=>f("div",{class:"deal-card",style:{pointerEvents:"none"}},[f("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function F(){if(G.get().mock){e.deals=O_(),e.loading=!1,T();return}e.sub=kR({pageSize:150,onData:v=>{e.deals=v,e.loading=!1,e.error=null,T()},onError:v=>{e.loading=!1,e.error=v&&v.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",T()}})}return T(),F(),function(){e.sub&&e.sub(),e.sub=null}}function rS(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const iS=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],Kf=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function ms(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function B_(n,e){const r=(new Date(n,e,1).getDay()+6)%7,i=new Date(n,e+1,0).getDate(),s=[];for(let c=0;c<r;c++)s.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=i;c++)s.push({date:new Date(n,e,c),inMonth:!0});for(;s.length%7!==0;){const c=s[s.length-1].date;s.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const o=[];for(let c=0;c<s.length;c+=7)o.push(s.slice(c,c+7));return o}function sS(n,e){const t=B_(n,e),r=t[0][0].date,s=t[t.length-1][6].date,o=new Date(s.getFullYear(),s.getMonth(),s.getDate()+1);return{startISO:r.toISOString(),endISO:o.toISOString()}}function oS(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=ms(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,i)=>new Date(r.dueAt)-new Date(i.dueAt));return e}function Wf(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function aS(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const cS=n=>({id:n.id,...n.data()}),lS=()=>G.get().user?G.get().user.uid:null;function uS(n,e,t,r){const i=Et(Pe(de,"activities"),us("dueAt",">=",n),us("dueAt","<",e),Tt("dueAt","asc"));return ks(i,s=>t(s.docs.map(cS)),s=>r&&r(s))}async function dS(n,e,t){return qt(Pe(de,"activities"),{type:"cita",subject:t||"Cita con "+(n.fullName||""),body:"",status:"open",direction:"outbound",dueAt:e,relatedTo:{type:"lead",id:n.id||null,name:n.fullName||""},ownerId:n.ownerId||lS(),createdAt:new Date().toISOString(),_version:1})}function hS(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=f("div",{class:"agenda__head"}),i=f("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["📌 Por ahora, las citas que los clientes piden desde la WEB se gestionan en el ",f("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario del panel clásico"}),". Aquí ves las citas agendadas desde el 360. (Se unifican en la épica E2.)"]),s=f("div",{class:"agenda__weekdays"},iS.map(P=>f("span",{class:"agenda__wd",text:P}))),o=f("div",{class:"agenda__grid"}),c=f("section",{class:"agenda"},[r,i,s,o]);ue(n),n.append(c);function l(P){let q=t.month+P,V=t.year;q<0?(q=11,V--):q>11&&(q=0,V++),t.year=V,t.month=q,x()}function d(){t.year=e.getFullYear(),t.month=e.getMonth(),x()}function p(){ue(r);const P=f("div",{class:"u-row u-row--tight"},[g("‹","Mes anterior",()=>l(-1)),f("button",{class:"btn btn--soft btn--sm",type:"button",onclick:d},["Hoy"]),g("›","Mes siguiente",()=>l(1))]);r.append(f("h2",{class:"agenda__title",text:`${Kf[t.month]} ${t.year}`}),P)}function g(P,q,V){const L=f("button",{class:"icon-btn",type:"button","aria-label":q},[P]);return L.addEventListener("click",V),L}function T(){if(p(),ue(o),t.error){o.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"⚠️"}),f("div",{class:"state__title",text:"No se pudo cargar la agenda"}),f("div",{class:"state__msg",text:t.error})]));return}const P=oS(t.events);B_(t.year,t.month).forEach(V=>{V.forEach(L=>{const $=ms(L.date),N=P[$]||[],F=aS(L.date,e),v=f("div",{class:"agenda__day"+(L.inMonth?"":" is-out")+(F?" is-today":""),role:"gridcell"},[f("div",{class:"agenda__daynum",text:String(L.date.getDate())})]),y=f("div",{class:"agenda__events"});if(N.slice(0,3).forEach(m=>y.append(A(m))),N.length>3){const m=f("button",{class:"agenda__more",type:"button"},[`+${N.length-3} más`]);m.addEventListener("click",()=>sn(m,N.map(I=>({value:I,label:`${Wf(I.dueAt)} · ${I.relatedTo?.name||I.subject||"Cita"}`})),I=>k(I.value),{title:`${L.date.getDate()} ${Kf[t.month]}`})),y.append(m)}v.append(y),o.append(v)})})}function A(P){const q=f("button",{class:"agenda__chip",type:"button",title:P.subject||"Cita"},[f("span",{class:"agenda__chip-time",text:Wf(P.dueAt)}),f("span",{class:"u-truncate",text:P.relatedTo?.name||P.subject||"Cita"})]);return q.addEventListener("click",()=>k(P)),q}function k(P){const q=P.relatedTo&&P.relatedTo.id;q&&G.set({detailLeadId:q})}function x(){if(T(),t.sub&&(t.sub(),t.sub=null),G.get().mock){t.events=zR(),t.loading=!1,T();return}const{startISO:P,endISO:q}=sS(t.year,t.month);t.sub=uS(P,q,V=>{t.events=V,t.loading=!1,t.error=null,T()},V=>{t.loading=!1,t.error=V&&V.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",T()})}return x(),function(){t.sub&&t.sub(),t.sub=null}}const fS=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},qa=n=>n.status==="won",$_=n=>n.status==="lost",Fu=n=>n.status==="open",Uu=n=>n.status==="convertido";function Hf(n,e){return e?n.filter(t=>fS(t.createdAt)>=e):n.slice()}function pS(n,e){const t=n.length,r=n.filter(Uu).length,i=e.filter(qa),s=e.filter($_),o=i.reduce((l,d)=>l+(Number(d.amount)||0),0),c=i.length+s.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:i.length,lost:s.length,winRate:c?i.length/c:0,wonValue:o}}function mS(n,e){const t=e.filter(Fu),r=n.filter(s=>!Zr(s.status)),i=r.filter(s=>{const o=b_(s);return!o.closed&&(o.state==="warn"||o.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:x_(t),slaRisk:i}}function gS(n,e){const t=new Set(e.filter(qa).map(d=>d.id)),r=n.filter(d=>d.status==="contactado"||d.status==="calificado"||d.status==="convertido"),i=n.filter(d=>d.status==="calificado"||d.status==="convertido"),s=n.filter(Uu),o=s.filter(d=>d.convertedTo&&t.has(d.convertedTo.dealId)),c=n.length||1,l=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:i.length},{key:"convertidos",label:"Convertidos",count:s.length},{key:"ganados",label:"Ganados",count:o.length}];return l.map((d,p)=>({...d,pctTop:d.count/c,convFromPrev:p===0?1:l[p-1].count?d.count/l[p-1].count:0}))}function _S(n,e){const t={},r=i=>t[i.key]||(t[i.key]={key:i.key,label:i.label,icon:i.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(i=>{const s=r(fs(i));s.leads++,Uu(i)&&s.convertidos++}),e.forEach(i=>{const s=r(fs(i));s.deals++,qa(i)&&(s.won++,s.revenue+=Number(i.amount)||0)}),Object.values(t).map(i=>({...i,convRate:i.leads?i.convertidos/i.leads:0})).sort((i,s)=>s.leads-i.leads||s.revenue-i.revenue)}function yS(n){const e=n.filter(Fu);return zi.map(t=>{const r=e.filter(i=>i.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((i,s)=>i+(Number(s.amount)||0),0),weighted:r.reduce((i,s)=>i+Ou(s),0)}})}function vS(n,e,t=[]){const r={},i=(s,o)=>r[s]||(r[s]={ownerId:s,ownerName:o,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(s=>i(s.uid,s.nombre)),n.forEach(s=>{const o=s.ownerId||"_none";i(o,s.ownerName||(o==="_none"?"Sin asignar":o)).leads++}),e.forEach(s=>{const o=s.ownerId||"_none",c=i(o,s.ownerName||(o==="_none"?"Sin asignar":o));c.deals++,qa(s)?c.won++:$_(s)?c.lost++:Fu(s)&&(c.pipelineWeighted+=Ou(s))}),Object.values(r).filter(s=>s.leads||s.deals).map(s=>({...s,winRate:s.won+s.lost?s.won/(s.won+s.lost):0})).sort((s,o)=>o.won-s.won||o.pipelineWeighted-s.pipelineWeighted||o.leads-s.leads)}function IS(n,e=30){const t=[],r={},i=new Date;for(let s=e-1;s>=0;s--){const o=new Date(i.getFullYear(),i.getMonth(),i.getDate()-s),c={key:ms(o),date:o,count:0};t.push(c),r[c.key]=c}return n.forEach(s=>{if(!s.createdAt)return;const o=r[ms(new Date(s.createdAt))];o&&o.count++}),t}const Qf=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function wS(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const ES=n=>({id:n.id,...n.data()});async function Yf(n,e){return(await Jr(Et(Pe(de,n),Tt("createdAt","desc"),Ut(e)))).docs.map(ES)}async function TS({pageSize:n=500}={}){if(G.get().mock)return{leads:ia(),deals:O_(),capped:!1};const[e,t]=await Promise.all([Yf("leads",n),Yf("deals",n)]);return{leads:e,deals:t,capped:e.length>=n||t.length>=n}}const bS="http://www.w3.org/2000/svg";function Pc(n,e={},t=[]){const r=document.createElementNS(bS,n);for(const[i,s]of Object.entries(e))s==null||s===!1||r.setAttribute(i,String(s));for(const i of[].concat(t))i==null||i===!1||i===""||r.append(i.nodeType?i:document.createTextNode(String(i)));return r}function AS(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(i=>Number(i.value)||0)),r=f("div",{class:"reportes__bars",role:"list"});return n.forEach(i=>{const s=i.pct!=null?i.pct:t?(Number(i.value)||0)/t:0,o=Math.max(0,Math.min(100,s*100));r.append(f("div",{class:"reportes__bar",role:"listitem"},[f("span",{class:"reportes__bar-label u-truncate",text:i.label}),f("span",{class:"reportes__bar-track","aria-hidden":"true"},[f("span",{class:"reportes__bar-fill",style:{width:o+"%",background:i.color||"var(--grad-gold)"}})]),f("span",{class:"reportes__bar-val u-mono",text:i.display!=null?i.display:String(i.value)})]))}),r}function RS(n){const i=n.map(k=>Number(k.value)||0),s=Math.max(...i,0),o=Math.max(1,s),c=n.length,l=k=>c<=1?600/2:6+k*(600-2*6)/(c-1),d=k=>134-k/o*(140-2*6),p=n.map((k,x)=>`${l(x).toFixed(1)},${d(i[x]).toFixed(1)}`).join(" "),g=`6,134 ${p} ${594 .toFixed(1)},134`,T=i.reduce((k,x)=>k+x,0),A=(n[i.indexOf(s)]||{}).label||"";return Pc("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${T} en total; pico de ${s}${A?" el "+A:""}.`},[Pc("polygon",{points:g,fill:"var(--gold-300)",opacity:"0.30"}),Pc("polyline",{points:p,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const st=n=>Math.round((n||0)*100)+"%",Jt=n=>Li(n)||"$0",Cc=n=>`${n.getDate()}/${n.getMonth()+1}`;function SS(n){const e={leads:[],deals:[],loading:!0,error:null,capped:!1,days:30};let t=!0;const r=f("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),i=f("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),s=f("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);i.addEventListener("click",y),s.addEventListener("click",v);const o=f("div",{class:"reportes__toolbar"},[r,f("div",{class:"u-row u-row--tight"},[i,s])]),c=f("div",{class:"reportes__body"}),l=f("section",{class:"reportes"},[o,c]);ue(n),n.append(l);function d(){ue(r),Qf.forEach(m=>{const I=e.days===m.value,E=f("button",{class:"chip",type:"button","aria-pressed":I?"true":"false"},[m.label]);E.addEventListener("click",()=>{e.days=m.value,g()}),r.append(E)})}function p(){const m=wS(e.days),I=Hf(e.leads,m),E=Hf(e.deals,m);return{pLeads:I,pDeals:E,pk:pS(I,E),ck:mS(e.leads,e.deals),fn:gS(I,e.deals),src:_S(I,E),stg:yS(e.deals),own:vS(I,E,G.get().mock?V_():G.get().team||[]),tr:IS(e.leads,30)}}function g(){if(d(),e.loading)return F();if(e.error)return N("⚠️","No se pudieron cargar los reportes",e.error);if(!e.leads.length&&!e.deals.length)return N("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const m=p();ue(c),e.capped&&c.append(f("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),c.append(T("Del período",[A("Leads nuevos",String(m.pk.leadsNew)),A("Tasa de conversión",st(m.pk.convRate),`${m.pk.convertidos} de ${m.pk.leadsNew}`),A("Win rate",st(m.pk.winRate),`${m.pk.won} ganadas · ${m.pk.lost} perdidas`),A("Valor ganado",Jt(m.pk.wonValue),null,!0)]),T("Estado actual",[A("Leads activos",String(m.ck.leadsActive)),A("Oportunidades abiertas",String(m.ck.dealsOpen)),A("Pipeline ponderado",Jt(m.ck.pipelineWeighted),null,!0),A("SLA en riesgo",String(m.ck.slaRisk),m.ck.slaRisk?"requieren atención":"al día")]),k(m.fn),x(m.src),P(m.stg),q(m.tr),V(m.own))}function T(m,I){return f("div",{class:"reportes__section"},[f("h2",{class:"reportes__sec-title",text:m}),f("div",{class:"reportes__kpis"},I)])}function A(m,I,E,b){return f("div",{class:"reportes__kpi"+(b?" reportes__kpi--hi":"")},[f("span",{class:"reportes__kpi-label u-caption u-faint",text:m}),f("strong",{class:"reportes__kpi-val",text:I}),E?f("span",{class:"reportes__kpi-sub u-caption u-faint",text:E}):null])}function k(m){const I=m.map((E,b)=>({label:E.label,value:E.count,pct:E.pctTop,display:b===0?String(E.count):`${E.count} · ${st(E.convFromPrev)}`,color:"var(--grad-gold)"}));return L("Embudo de ventas","De lead a venta — dónde se pierde el avance",AS(I,{max:m[0]?m[0].count:1}))}function x(m){const I=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],E=m.map(w=>[`${w.icon||""} ${w.label}`.trim(),String(w.leads),st(w.convRate),String(w.deals),String(w.won),Jt(w.revenue)]),b=m.length?null:"Sin leads en el período.";return L("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",$(I,E,b))}function P(m){const I=["Etapa","Prob.","Oport.","Valor","Ponderado"],E=m.map(te=>[te.label,st(te.prob),String(te.count),Jt(te.value),Jt(te.weighted)]),b=m.reduce((te,Ae)=>({count:te.count+Ae.count,value:te.value+Ae.value,weighted:te.weighted+Ae.weighted}),{count:0,value:0,weighted:0}),w=["Total","",String(b.count),Jt(b.value),Jt(b.weighted)];return L("Forecast por etapa","Pipeline abierto actual (no depende del período)",$(I,E,null,w))}function q(m){const I=m.reduce((te,Ae)=>te+Ae.count,0),E=m.map(te=>({label:Cc(te.date),value:te.count})),b=m.length?`${Cc(m[0].date)} – ${Cc(m[m.length-1].date)}`:"",w=f("div",{class:"reportes__chart"},[RS(E),f("div",{class:"reportes__axis u-caption u-faint"},[f("span",{text:b}),f("span",{text:`${I} leads`})])]);return L("Tendencia de captación","Nuevos leads · últimos 30 días",w)}function V(m){const I=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],E=m.map(w=>[w.ownerName,String(w.leads),String(w.deals),String(w.won),st(w.winRate),Jt(w.pipelineWeighted)]),b=m.length?null:"Sin actividad asignada en el período.";return L("Rendimiento del equipo","Por asesor, en el período seleccionado",$(I,E,b))}function L(m,I,E){return f("div",{class:"reportes__section"},[f("div",{class:"reportes__sec-head"},[f("h2",{class:"reportes__sec-title",text:m}),I?f("span",{class:"reportes__sec-cap u-caption u-faint",text:I}):null]),E])}function $(m,I,E,b){if(!I.length&&E)return f("div",{class:"reportes__empty u-caption u-faint",text:E});const w=f("thead",{},[f("tr",{},m.map((Ce,et)=>f("th",{class:et===0?"":"is-num",scope:"col",text:Ce})))]),te=f("tbody",{},I.map(Ce=>f("tr",{},Ce.map((et,At)=>f("td",{class:At===0?"":"is-num",text:et}))))),Ae=[w,te];return b&&Ae.push(f("tfoot",{},[f("tr",{},b.map((Ce,et)=>et===0?f("th",{scope:"row",text:Ce}):f("td",{class:"is-num",text:Ce})))])),f("div",{class:"reportes__tablewrap"},[f("table",{class:"reportes__table"},Ae)])}function N(m,I,E){ue(c),c.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:m}),f("div",{class:"state__title",text:I}),f("div",{class:"state__msg",text:E})]))}function F(){ue(c);const m=f("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>f("div",{class:"reportes__kpi"},[f("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));c.append(f("div",{class:"reportes__section"},[m])),c.append(f("div",{class:"reportes__section"},[f("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function v(){if(e.loading||e.error){ee("Aún no hay datos para exportar","info");return}const m=p(),I=(Qf.find(w=>w.value===e.days)||{}).label||"",E=[],b=w=>{E.push([]),E.push([w])};E.push(["Reporte Altorra CRM"]),E.push(["Período",I]),E.push(["Generado",new Date().toLocaleString("es-CO")]),b("KPIs del período"),E.push(["Métrica","Valor"]),E.push(["Leads nuevos",m.pk.leadsNew]),E.push(["Conversión",st(m.pk.convRate)]),E.push(["Win rate",st(m.pk.winRate)]),E.push(["Ganadas",m.pk.won]),E.push(["Perdidas",m.pk.lost]),E.push(["Valor ganado (COP)",m.pk.wonValue]),E.push(["Leads activos (ahora)",m.ck.leadsActive]),E.push(["Oportunidades abiertas (ahora)",m.ck.dealsOpen]),E.push(["Pipeline ponderado COP (ahora)",m.ck.pipelineWeighted]),E.push(["SLA en riesgo (ahora)",m.ck.slaRisk]),b("Embudo"),E.push(["Etapa","Cantidad","Conversión desde anterior"]),m.fn.forEach((w,te)=>E.push([w.label,w.count,te===0?"":st(w.convFromPrev)])),b("Rendimiento por canal"),E.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),m.src.forEach(w=>E.push([w.label,w.leads,st(w.convRate),w.deals,w.won,w.revenue])),b("Forecast por etapa (pipeline actual)"),E.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),m.stg.forEach(w=>E.push([w.label,st(w.prob),w.count,w.value,w.weighted])),b("Rendimiento del equipo"),E.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),m.own.forEach(w=>E.push([w.ownerName,w.leads,w.deals,w.won,st(w.winRate),w.pipelineWeighted])),kS(`altorra-reportes-${ms(new Date)}.csv`,CS(E)),ee("Reporte exportado","ok")}async function y(){e.loading=!0,e.error=null,g();try{const m=await TS();if(!t)return;e.leads=m.leads,e.deals=m.deals,e.capped=!!m.capped,e.loading=!1}catch(m){if(!t)return;e.loading=!1,e.error=m&&m.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}g()}return y(),function(){t=!1}}function PS(n){const e=n==null?"":String(n);return/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function CS(n){return"\uFEFF"+n.map(e=>e.map(PS).join(",")).join(`\r
`)}function kS(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),i=document.createElement("a");i.href=r,i.download=n,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}const sa=n=>({id:n.id,...n.data()});async function DS({pageSize:n=500}={}){if(G.get().mock)return{contacts:BR(),leads:ia()};const[e,t]=await Promise.all([Jr(Et(Pe(de,"contacts"),Tt("createdAt","desc"),Ut(n))).then(r=>r.docs.map(sa)),Jr(Et(Pe(de,"leads"),Tt("createdAt","desc"),Ut(n))).then(r=>r.docs.map(sa))]);return{contacts:e,leads:t}}async function xS(n){if(!n)return null;const e=await r_(ht(de,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function NS(n,e,t){const r=Et(Pe(de,"activities"),us("relatedTo.id","==",n),Tt("createdAt","desc"),Ut(50));return ks(r,i=>e(i.docs.map(sa)),i=>t&&t(i))}function VS(n,e,t){const r=Et(Pe(de,"contacts",n,"crmNotes"),Tt("createdAt","desc"),Ut(50));return ks(r,i=>e(i.docs.map(sa)),i=>t&&t(i))}async function OS(n,e){const t=G.get().user;await qt(Pe(de,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:G.get().profile&&G.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const LS=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],MS={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function Jf(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function FS(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=f("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,k()});const i=f("div",{class:"search"},[f("span",{"aria-hidden":"true",text:"🔎"}),r]),s={},o=f("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});LS.forEach(V=>{const L=f("button",{class:"chip",type:"button","aria-pressed":V.id===e.filter?"true":"false"},[V.label]);L.addEventListener("click",()=>{e.filter=V.id,Object.entries(s).forEach(([$,N])=>N.setAttribute("aria-pressed",$===V.id?"true":"false")),k()}),s[V.id]=L,o.append(L)});const c=f("span",{class:"contactos__count u-caption u-faint"}),l=f("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);l.addEventListener("click",q);const d=f("div",{class:"contactos__toolbar"},[i,o,f("div",{class:"u-row u-row--tight"},[c,l])]),p=f("div",{class:"contactos__list"}),g=f("section",{class:"contactos"},[d,p]);ue(n),n.append(g);function T(){const V={};for(const L of e.leads){if(!L.contactId)continue;const $=V[L.contactId];(!$||new Date(L.createdAt)>new Date($.createdAt))&&(V[L.contactId]=L)}return V}function A(V){G.set({leads:e.leads,detailLeadId:V.id})}function k(){if(e.loading)return P("⏳","Cargando contactos…","");if(e.error)return P("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return P("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const V=T(),L=na(e.q),$=e.contacts.filter(N=>e.filter!=="todos"&&Jf(N)!==e.filter?!1:L?na(`${N.fullName||""} ${N.email||""} ${N.phone||""}`).includes(L):!0);if(c.textContent=`${$.length} de ${e.contacts.length}`,ue(p),!$.length){p.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🔍"}),f("div",{class:"state__title",text:"Sin resultados"}),f("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}$.forEach(N=>p.append(x(N,V[N.id])))}function x(V,L){const $=Jf(V),N=MS[$],F=fs(V),v=Number(V.score)>0&&Vr[V.rating],y=f("div",{class:"contact-row__badges"},[f("span",{class:`badge badge--${N.badge}`,text:N.label}),f("span",{class:"badge",text:`${F.icon} ${F.label}`}),v?f("span",{class:`temp ${Vr[V.rating].cls}`,text:`${Vr[V.rating].icon} ${V.score}`}):null]),m=[V.email,V.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",I=Array.isArray(V.tags)&&V.tags.length?f("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+V.tags.join(", ")}):null,E=[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Ds(V.fullName)}),f("div",{class:"contact-row__main"},[f("span",{class:"contact-row__name u-truncate",text:V.fullName||"Sin nombre"}),f("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:m,text:m}),I]),y,f("span",{class:"contact-row__time u-caption u-faint",text:Kn(V.lastActivityAt)})];if(L){const b=f("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${V.fullName||"contacto"}`},E);return b.addEventListener("click",()=>A(L)),b}return f("div",{class:"contact-row contact-row--nolead"},E)}function P(V,L,$){c.textContent="",ue(p),p.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:V}),f("div",{class:"state__title",text:L}),$?f("div",{class:"state__msg",text:$}):null]))}async function q(){e.loading=!0,e.error=null,k();try{const V=await DS();if(!t)return;e.contacts=V.contacts,e.leads=V.leads,e.loading=!1}catch(V){if(!t)return;e.loading=!1,e.error=V&&V.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}k()}return q(),function(){t=!1}}const US={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function BS(n){let e=null,t=null,r=null,i="resumen",s={lead:null,contact:null,activities:[],notes:[]};const o=f("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=f("div",{class:"detail-overlay",hidden:!0},[o]);n.append(c),c.addEventListener("mousedown",N=>{N.target===c&&l()}),window.addEventListener("keydown",N=>{N.key==="Escape"&&e&&l()}),G.subscribe(N=>{N.detailLeadId!==e&&p(N.detailLeadId)});function l(){G.set({detailLeadId:null})}function d(){t&&(t(),t=null),r&&(r(),r=null)}function p(N){if(d(),e=N,!N){c.hidden=!0,document.body.classList.remove("has-detail"),ue(o);return}i="resumen",c.hidden=!1,document.body.classList.add("has-detail"),g(N)}function g(N){const F=(G.get().leads||[]).find(v=>v.id===N);s={lead:F||null,contact:null,activities:[],notes:[]},T(),F&&(G.get().mock?(s.contact=UR(F.contactId),s.activities=FR(N),s.notes=Gf(F.contactId),T()):(xS(F.contactId).then(v=>{s.contact=v,T()}).catch(()=>{}),t=NS(N,v=>{s.activities=v,T()},()=>{}),F.contactId&&(r=VS(F.contactId,v=>{s.notes=v,T()},()=>{}))))}function T(){ue(o);const N=s.lead;if(!N){o.append(A(null)),o.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🔍"}),f("div",{class:"state__title",text:"Lead no disponible"}),f("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}o.append(A(N)),o.append(k());const F=f("div",{class:"detail__body"});i==="resumen"?F.append(x(N)):i==="comms"?F.append(q()):i==="score"?F.append(V(N)):i==="notas"&&F.append(L(N)),o.append(F)}function A(N){const F=f("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(F.addEventListener("click",l),!N)return f("div",{class:"detail__header"},[f("div",{class:"u-grow"}),F]);const v=$(N),y=Vr[v.rating],m=Ao(N.status),I=Ba(N),E=fs(N),b=f("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);b.addEventListener("click",()=>{const Ce=E_(N.phone,`Hola ${String(N.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!Ce)return ee("Sin teléfono","error");window.open(Ce,"_blank","noopener")});const w=qi("crm.edit"),te=w&&N.status!=="convertido"?f("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;te&&te.addEventListener("click",async()=>{te.disabled=!0;try{G.get().mock?L_(Lu(N)):await N_(N),ee("🎯 Convertido a oportunidad","ok")}catch{ee("No se pudo convertir","error"),te.disabled=!1}});const Ae=w?f("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;return Ae&&Ae.addEventListener("click",()=>$S(N,Ae)),f("div",{class:"detail__header"},[f("div",{class:"u-row u-grow",style:{minWidth:"0"}},[f("span",{class:"avatar","aria-hidden":"true",text:Ds(N.fullName)}),f("div",{class:"u-grow",style:{minWidth:"0"}},[f("h2",{class:"detail__name u-truncate",text:N.fullName}),f("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[f("span",{class:`temp ${y.cls}`,text:`${y.icon} ${y.label} · ${v.score}`}),f("span",{class:`badge badge--${m.badge||""}`.trim(),text:m.label}),f("span",{class:"badge",text:`${I.icon} ${I.label}`}),f("span",{class:"badge",text:`${E.icon} ${E.label}`})])])]),f("div",{class:"u-row u-row--tight"},[te,Ae,b,F])])}function k(){const N=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],F=f("div",{class:"detail__tabs",role:"tablist"});return N.forEach(([v,y])=>{const m=f("button",{class:"detail__tab"+(i===v?" is-active":""),role:"tab","aria-selected":String(i===v),type:"button"},[y]);m.addEventListener("click",()=>{i=v,T()}),F.append(m)}),F}function x(N){const F=s.contact,v=F&&F.consent?F.consent:null,y=[["Correo",N.email||"—"],["Teléfono",N.phone||"—"],["Interés",N.sourceDetail||"—"],["Vehículo",N.vehicleOfInterestId||"—"],["Asesor",N.ownerName||"Sin asignar"],["Origen",N.source||"—"],["Capturado",z0(N.createdAt)],["Última actividad",Kn(N.lastActivityAt)]],m=S_(N,{score:$(N).score});return f("div",{class:"u-stack"},[f("div",{class:"detail-card detail-card--nba"},[f("span",{class:"detail-card__icon","aria-hidden":"true",text:m.icon}),f("div",{class:"u-grow"},[f("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),f("strong",{text:m.label}),f("div",{class:"u-caption u-faint",text:m.reason})])]),f("dl",{class:"kv"},y.flatMap(([I,E])=>[f("dt",{text:I}),f("dd",{class:"u-truncate",text:E})])),v?P(v):null])}function P(N){const F=v=>v?"✅":"⛔";return f("div",{class:"detail-card"},[f("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),f("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[f("span",{class:"u-caption",text:`${F(N.email)} Email`}),f("span",{class:"u-caption",text:`${F(N.whatsapp)} WhatsApp`}),f("span",{class:"u-caption",text:`${F(N.calls)} Llamadas`})]),f("div",{class:"u-caption u-faint",text:`Política ${N.policyVersion||"v1"} · origen ${N.source||"—"}`})])}function q(){if(!s.activities.length)return f("div",{class:"state"},[f("div",{class:"state__icon",text:"📭"}),f("div",{class:"state__title",text:"Sin comunicaciones"}),f("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const N=f("ol",{class:"timeline"});return s.activities.forEach(F=>{N.append(f("li",{class:"timeline__item timeline__item--"+(F.direction||"inbound")},[f("span",{class:"timeline__icon","aria-hidden":"true",text:US[F.type]||"•"}),f("div",{class:"u-grow"},[f("div",{class:"u-spread"},[f("strong",{class:"u-truncate",text:F.subject||F.type||"Actividad"}),f("span",{class:"u-caption u-faint",text:Kn(F.createdAt)})]),F.body?f("div",{class:"u-caption u-muted",text:F.body}):null])]))}),N}function V(N){const F=$(N),v=Vr[F.rating],y=Object.keys(qf).map(m=>{const I=Math.round((F.factors[m]||0)*100);return f("div",{class:"factor"},[f("div",{class:"u-spread u-caption"},[f("span",{text:qf[m]}),f("span",{class:"u-faint",text:`${I}% · peso ${Math.round(lR[m]*100)}%`})]),f("div",{class:"factor__track"},[f("div",{class:"factor__fill",style:{width:I+"%"}})])])});return f("div",{class:"u-stack"},[f("div",{class:"scorehero"},[f("div",{class:`scorehero__num ${v.cls}`,text:String(F.score)}),f("div",{class:"u-stack",style:{gap:"2px"}},[f("strong",{text:`${v.icon} ${v.label}`}),f("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),f("div",{class:"u-stack",style:{gap:"10px"}},y)])}function L(N){const F=qi("crm.edit")||qi("crm.create"),v=f("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),y=f("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);y.addEventListener("click",async()=>{const I=v.value.trim();if(!I)return;y.disabled=!0;const E={body:I,authorName:"Tú",createdAt:new Date().toISOString()};try{G.get().mock?($R(N.contactId,E),s.notes=Gf(N.contactId),T()):(await OS(N.contactId,I),v.value=""),ee("Nota agregada","ok")}catch{ee("No se pudo guardar la nota","error")}finally{y.disabled=!1}});const m=f("div",{class:"u-stack"});return s.notes.length||m.append(f("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),s.notes.forEach(I=>m.append(f("div",{class:"detail-card"},[f("div",{class:"u-caption u-muted",text:I.body}),f("div",{class:"u-caption u-faint",text:`${I.authorName||"Asesor"} · ${Kn(I.createdAt)}`})]))),f("div",{class:"u-stack"},[F?f("div",{class:"u-stack",style:{gap:"8px"}},[v,f("div",{class:"u-row",style:{justifyContent:"flex-end"}},[y])]):null,m])}function $(N){return R_(N,s.activities||[],s.contact)}}function $S(n,e){const t=A=>String(A).padStart(2,"0"),r=new Date;r.setDate(r.getDate()+1),r.setHours(10,0,0,0);const i=`${r.getFullYear()}-${t(r.getMonth()+1)}-${t(r.getDate())}T${t(r.getHours())}:${t(r.getMinutes())}`,s=f("input",{class:"input",type:"text",value:"Cita con "+(n.fullName||""),"aria-label":"Asunto"}),o=f("input",{class:"input",type:"datetime-local",value:i,"aria-label":"Fecha y hora"}),c=f("button",{class:"btn btn--gold btn--sm btn--block",type:"button"},["Agendar"]),l=f("div",{class:"popover",role:"dialog","aria-label":"Agendar cita",style:{width:"260px",gap:"8px"}},[f("div",{class:"popover__title",text:"Agendar cita"}),s,o,c]);document.body.append(l);const d=e.getBoundingClientRect();l.style.top=`${Math.min(window.innerHeight-l.offsetHeight-8,d.bottom+6)}px`,l.style.left=`${Math.max(8,d.right-l.offsetWidth)}px`,setTimeout(()=>o.focus(),0);const p=()=>{l.remove(),document.removeEventListener("mousedown",g,!0),window.removeEventListener("keydown",T,!0)},g=A=>{l.contains(A.target)||p()},T=A=>{A.key==="Escape"&&p()};setTimeout(()=>{document.addEventListener("mousedown",g,!0),window.addEventListener("keydown",T,!0)},0),c.addEventListener("click",async()=>{const A=o.value?new Date(o.value).toISOString():null;if(!A){ee("Elige fecha y hora","error");return}c.disabled=!0;try{G.get().mock?GR({type:"cita",subject:s.value,dueAt:A,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}):await dS(n,A,s.value),ee("📅 Cita agendada","ok"),p()}catch{ee("No se pudo agendar","error"),c.disabled=!1}})}const j_=document.getElementById("app");yy();const jS=new URLSearchParams(location.search).get("mock")==="1",qS={bandeja:U_,pipeline:nS,agenda:hS,reportes:SS,contactos:FS};let co=null,Or=null,jn=null,_l=null,So=null;function Xf(n){if(!Or||n===_l)return;jn&&(jn(),jn=null),G.get().detailLeadId&&G.set({detailLeadId:null}),jn=(qS[n]||U_)(Or.outlet)||null,Or.setActive(n),_l=n}function zS(){Or=W0(j_),BS(Or.detailRoot),Xf(v_()),So=$0(Xf)}function GS(){jn&&(jn(),jn=null),So&&(So(),So=null),Or=null,_l=null}function KS(n){n.ready&&(n.user&&co!=="app"?(co="app",zS()):!n.user&&co!=="login"&&(GS(),co="login",n.detailLeadId&&G.set({detailLeadId:null}),H0(j_)))}G.subscribe(KS);jS?G.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):V0();
