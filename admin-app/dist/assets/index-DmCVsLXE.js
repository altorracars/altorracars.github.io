(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function Cy(n){let e={...n};const t=new Set;function r(){return e}function i(o){const c=typeof o=="function"?o(e):o;c&&(e={...e,...c},t.forEach(l=>l(e)))}function s(o){return t.add(o),()=>t.delete(o)}return{get:r,set:i,subscribe:s}}const G=Cy({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),lp="altorra-crm-theme";function ky(){let n=localStorage.getItem(lp);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,G.set({theme:n})}function Dy(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(lp,n),G.set({theme:n}),n}var Gd={};/**
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
 */const up=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Ny=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},bl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,c=o?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,p=s>>2,g=(s&3)<<4|c>>4;let w=(c&15)<<2|d>>6,A=d&63;l||(A=64,o||(w=64)),r.push(t[p],t[g],t[w],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(up(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ny(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const g=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||g==null)throw new xy;const w=s<<2|c>>4;if(r.push(w),d!==64){const A=c<<4&240|d>>2;if(r.push(A),g!==64){const C=d<<6&192|g;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class xy extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Vy=function(n){const e=up(n);return bl.encodeByteArray(e,!0)},dp=function(n){return Vy(n).replace(/\./g,"")},hp=function(n){try{return bl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function fp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Oy=()=>fp().__FIREBASE_DEFAULTS__,Ly=()=>{if(typeof process>"u"||typeof Gd>"u")return;const n=Gd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},My=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&hp(n[1]);return e&&JSON.parse(e)},ua=()=>{try{return Oy()||Ly()||My()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},pp=n=>{var e,t;return(t=(e=ua())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Fy=n=>{const e=pp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},mp=()=>{var n;return(n=ua())===null||n===void 0?void 0:n.config},gp=n=>{var e;return(e=ua())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Yi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Ne(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Uy(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ne())}function By(){var n;const e=(n=ua())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function $y(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function jy(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function qy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function zy(){const n=Ne();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function _p(){return!By()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function da(){try{return typeof indexedDB=="object"}catch{return!1}}function Gy(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
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
 */const Ky="FirebaseError";class St extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Ky,Object.setPrototypeOf(this,St.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,si.prototype.create)}}class si{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Hy(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new St(i,c,r)}}function Hy(n,e){return n.replace(Wy,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Wy=/\{\$([^}]+)}/g;function Qy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ji(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Kd(s)&&Kd(o)){if(!Ji(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Kd(n){return n!==null&&typeof n=="object"}/**
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
 */function Is(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Vi(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Oi(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Yy(n,e){const t=new Jy(n,e);return t.subscribe.bind(t)}class Jy{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Xy(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=gc),i.error===void 0&&(i.error=gc),i.complete===void 0&&(i.complete=gc);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Xy(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function gc(){}/**
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
 */const Zy=1e3,ev=2,tv=4*60*60*1e3,nv=.5;function rv(n,e=Zy,t=ev){const r=e*Math.pow(t,n),i=Math.round(nv*r*(Math.random()-.5)*2);return Math.min(tv,r+i)}/**
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
 */function _e(n){return n&&n._delegate?n._delegate:n}class Tt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Vn="[DEFAULT]";/**
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
 */class iv{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Yi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ov(e))try{this.getOrInitializeService({instanceIdentifier:Vn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Vn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Vn){return this.instances.has(e)}getOptions(e=Vn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:sv(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Vn){return this.component?this.component.multipleInstances?e:Vn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function sv(n){return n===Vn?void 0:n}function ov(n){return n.instantiationMode==="EAGER"}/**
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
 */class av{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new iv(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var se;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(se||(se={}));const cv={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},lv=se.INFO,uv={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},dv=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=uv[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ha{constructor(e){this.name=e,this._logLevel=lv,this._logHandler=dv,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?cv[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}const hv=(n,e)=>e.some(t=>n instanceof t);let Hd,Wd;function fv(){return Hd||(Hd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function pv(){return Wd||(Wd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const yp=new WeakMap,Oc=new WeakMap,vp=new WeakMap,_c=new WeakMap,Al=new WeakMap;function mv(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(un(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&yp.set(t,n)}).catch(()=>{}),Al.set(e,n),e}function gv(n){if(Oc.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Oc.set(n,e)}let Lc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Oc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||vp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return un(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function _v(n){Lc=n(Lc)}function yv(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(yc(this),e,...t);return vp.set(r,e.sort?e.sort():[e]),un(r)}:pv().includes(n)?function(...e){return n.apply(yc(this),e),un(yp.get(this))}:function(...e){return un(n.apply(yc(this),e))}}function vv(n){return typeof n=="function"?yv(n):(n instanceof IDBTransaction&&gv(n),hv(n,fv())?new Proxy(n,Lc):n)}function un(n){if(n instanceof IDBRequest)return mv(n);if(_c.has(n))return _c.get(n);const e=vv(n);return e!==n&&(_c.set(n,e),Al.set(e,n)),e}const yc=n=>Al.get(n);function Iv(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),c=un(o);return r&&o.addEventListener("upgradeneeded",l=>{r(un(o.result),l.oldVersion,l.newVersion,un(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const wv=["get","getKey","getAll","getAllKeys","count"],Ev=["put","add","delete","clear"],vc=new Map;function Qd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(vc.get(e))return vc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Ev.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||wv.includes(t)))return;const s=async function(o,...c){const l=this.transaction(o,i?"readwrite":"readonly");let d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return vc.set(e,s),s}_v(n=>({...n,get:(e,t,r)=>Qd(e,t)||n.get(e,t,r),has:(e,t)=>!!Qd(e,t)||n.has(e,t)}));/**
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
 */class Tv{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(bv(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function bv(n){const e=n.getComponent();return e?.type==="VERSION"}const Mc="@firebase/app",Yd="0.11.0";/**
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
 */const Ft=new ha("@firebase/app"),Av="@firebase/app-compat",Rv="@firebase/analytics-compat",Sv="@firebase/analytics",Pv="@firebase/app-check-compat",Cv="@firebase/app-check",kv="@firebase/auth",Dv="@firebase/auth-compat",Nv="@firebase/database",xv="@firebase/data-connect",Vv="@firebase/database-compat",Ov="@firebase/functions",Lv="@firebase/functions-compat",Mv="@firebase/installations",Fv="@firebase/installations-compat",Uv="@firebase/messaging",Bv="@firebase/messaging-compat",$v="@firebase/performance",jv="@firebase/performance-compat",qv="@firebase/remote-config",zv="@firebase/remote-config-compat",Gv="@firebase/storage",Kv="@firebase/storage-compat",Hv="@firebase/firestore",Wv="@firebase/vertexai",Qv="@firebase/firestore-compat",Yv="firebase",Jv="11.3.0";/**
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
 */const Fc="[DEFAULT]",Xv={[Mc]:"fire-core",[Av]:"fire-core-compat",[Sv]:"fire-analytics",[Rv]:"fire-analytics-compat",[Cv]:"fire-app-check",[Pv]:"fire-app-check-compat",[kv]:"fire-auth",[Dv]:"fire-auth-compat",[Nv]:"fire-rtdb",[xv]:"fire-data-connect",[Vv]:"fire-rtdb-compat",[Ov]:"fire-fn",[Lv]:"fire-fn-compat",[Mv]:"fire-iid",[Fv]:"fire-iid-compat",[Uv]:"fire-fcm",[Bv]:"fire-fcm-compat",[$v]:"fire-perf",[jv]:"fire-perf-compat",[qv]:"fire-rc",[zv]:"fire-rc-compat",[Gv]:"fire-gcs",[Kv]:"fire-gcs-compat",[Hv]:"fire-fst",[Qv]:"fire-fst-compat",[Wv]:"fire-vertex","fire-js":"fire-js",[Yv]:"fire-js-all"};/**
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
 */const ko=new Map,Zv=new Map,Uc=new Map;function Jd(n,e){try{n.container.addComponent(e)}catch(t){Ft.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ut(n){const e=n.name;if(Uc.has(e))return Ft.debug(`There were multiple attempts to register component ${e}.`),!1;Uc.set(e,n);for(const t of ko.values())Jd(t,n);for(const t of Zv.values())Jd(t,n);return!0}function oi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function at(n){return n==null?!1:n.settings!==void 0}/**
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
 */const eI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},dn=new si("app","Firebase",eI);/**
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
 */class tI{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Tt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw dn.create("app-deleted",{appName:this._name})}}/**
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
 */const ai=Jv;function Ip(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Fc,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw dn.create("bad-app-name",{appName:String(i)});if(t||(t=mp()),!t)throw dn.create("no-options");const s=ko.get(i);if(s){if(Ji(t,s.options)&&Ji(r,s.config))return s;throw dn.create("duplicate-app",{appName:i})}const o=new av(i);for(const l of Uc.values())o.addComponent(l);const c=new tI(t,r,o);return ko.set(i,c),c}function Rl(n=Fc){const e=ko.get(n);if(!e&&n===Fc&&mp())return Ip();if(!e)throw dn.create("no-app",{appName:n});return e}function ft(n,e,t){var r;let i=(r=Xv[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ft.warn(c.join(" "));return}Ut(new Tt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const nI="firebase-heartbeat-database",rI=1,Xi="firebase-heartbeat-store";let Ic=null;function wp(){return Ic||(Ic=Iv(nI,rI,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Xi)}catch(t){console.warn(t)}}}}).catch(n=>{throw dn.create("idb-open",{originalErrorMessage:n.message})})),Ic}async function iI(n){try{const t=(await wp()).transaction(Xi),r=await t.objectStore(Xi).get(Ep(n));return await t.done,r}catch(e){if(e instanceof St)Ft.warn(e.message);else{const t=dn.create("idb-get",{originalErrorMessage:e?.message});Ft.warn(t.message)}}}async function Xd(n,e){try{const r=(await wp()).transaction(Xi,"readwrite");await r.objectStore(Xi).put(e,Ep(n)),await r.done}catch(t){if(t instanceof St)Ft.warn(t.message);else{const r=dn.create("idb-set",{originalErrorMessage:t?.message});Ft.warn(r.message)}}}function Ep(n){return`${n.name}!${n.options.appId}`}/**
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
 */const sI=1024,oI=30;class aI{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new lI(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Zd();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>oI){const o=uI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ft.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Zd(),{heartbeatsToSend:r,unsentEntries:i}=cI(this._heartbeatsCache.heartbeats),s=dp(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Ft.warn(t),""}}}function Zd(){return new Date().toISOString().substring(0,10)}function cI(n,e=sI){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),eh(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),eh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class lI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return da()?Gy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await iI(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Xd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Xd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function eh(n){return dp(JSON.stringify({version:2,heartbeats:n})).length}function uI(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function dI(n){Ut(new Tt("platform-logger",e=>new Tv(e),"PRIVATE")),Ut(new Tt("heartbeat",e=>new aI(e),"PRIVATE")),ft(Mc,Yd,n),ft(Mc,Yd,"esm2017"),ft("fire-js","")}dI("");function Sl(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Tp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const hI=Tp,bp=new si("auth","Firebase",Tp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do=new ha("@firebase/auth");function fI(n,...e){Do.logLevel<=se.WARN&&Do.warn(`Auth (${ai}): ${n}`,...e)}function ho(n,...e){Do.logLevel<=se.ERROR&&Do.error(`Auth (${ai}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(n,...e){throw Pl(n,...e)}function vt(n,...e){return Pl(n,...e)}function Ap(n,e,t){const r=Object.assign(Object.assign({},hI()),{[e]:t});return new si("auth","Firebase",r).create(e,{appName:n.name})}function hn(n){return Ap(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Pl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return bp.create(n,...e)}function J(n,e,...t){if(!n)throw Pl(e,...t)}function Vt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ho(e),new Error(e)}function Bt(n,e){n||Vt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function pI(){return th()==="http:"||th()==="https:"}function th(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(pI()||jy()||"connection"in navigator)?navigator.onLine:!0}function gI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e,t){this.shortDelay=e,this.longDelay=t,Bt(t>e,"Short delay should be less than long delay!"),this.isMobile=Uy()||qy()}get(){return mI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(n,e){Bt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Vt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Vt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Vt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI=new ws(3e4,6e4);function ar(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function En(n,e,t,r,i={}){return Sp(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const c=Is(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:l},s);return $y()||(d.referrerPolicy="no-referrer"),Rp.fetch()(Pp(n,n.config.apiHost,t,c),d)})}async function Sp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},_I),e);try{const i=new II(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Js(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Js(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Js(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Js(n,"user-disabled",o);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Ap(n,p,d);pt(n,p)}}catch(i){if(i instanceof St)throw i;pt(n,"network-request-failed",{message:String(i)})}}async function fa(n,e,t,r,i={}){const s=await En(n,e,t,r,i);return"mfaPendingCredential"in s&&pt(n,"multi-factor-auth-required",{_serverResponse:s}),s}function Pp(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?Cl(n.config,i):`${n.config.apiScheme}://${i}`}function vI(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class II{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(vt(this.auth,"network-request-failed")),yI.get())})}}function Js(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=vt(n,e,r);return i.customData._tokenResponse=t,i}function nh(n){return n!==void 0&&n.enterprise!==void 0}class wI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return vI(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function EI(n,e){return En(n,"GET","/v2/recaptchaConfig",ar(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TI(n,e){return En(n,"POST","/v1/accounts:delete",e)}async function Cp(n,e){return En(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function bI(n,e=!1){const t=_e(n),r=await t.getIdToken(e),i=kl(r);J(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:ji(wc(i.auth_time)),issuedAtTime:ji(wc(i.iat)),expirationTime:ji(wc(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function wc(n){return Number(n)*1e3}function kl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ho("JWT malformed, contained fewer than 3 sections"),null;try{const i=hp(t);return i?JSON.parse(i):(ho("Failed to decode base64 JWT payload"),null)}catch(i){return ho("Caught error parsing JWT payload as JSON",i?.toString()),null}}function rh(n){const e=kl(n);return J(e,"internal-error"),J(typeof e.exp<"u","internal-error"),J(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof St&&AI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function AI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ji(this.lastLoginAt),this.creationTime=ji(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function No(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Zi(n,Cp(t,{idToken:r}));J(i?.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?kp(s.providerUserInfo):[],c=PI(n.providerData,o),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!c?.length,p=l?d:!1,g={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new $c(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(n,g)}async function SI(n){const e=_e(n);await No(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function PI(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function kp(n){return n.map(e=>{var{providerId:t}=e,r=Sl(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CI(n,e){const t=await Sp(n,{},async()=>{const r=Is({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=Pp(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Rp.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function kI(n,e){return En(n,"POST","/v2/accounts:revokeToken",ar(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){J(e.idToken,"internal-error"),J(typeof e.idToken<"u","internal-error"),J(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):rh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){J(e.length!==0,"internal-error");const t=rh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(J(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await CI(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new Dr;return r&&(J(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(J(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(J(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Dr,this.toJSON())}_performRefresh(){return Vt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(n,e){J(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ot{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Sl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new RI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new $c(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Zi(this,this.stsTokenManager.getToken(this.auth,e));return J(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return bI(this,e)}reload(){return SI(this)}_assign(e){this!==e&&(J(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ot(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){J(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await No(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(at(this.auth.app))return Promise.reject(hn(this.auth));const e=await this.getIdToken();return await Zi(this,TI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,c,l,d,p;const g=(r=t.displayName)!==null&&r!==void 0?r:void 0,w=(i=t.email)!==null&&i!==void 0?i:void 0,A=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,C=(o=t.photoURL)!==null&&o!==void 0?o:void 0,D=(c=t.tenantId)!==null&&c!==void 0?c:void 0,P=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,q=(d=t.createdAt)!==null&&d!==void 0?d:void 0,V=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:L,emailVerified:j,isAnonymous:x,providerData:F,stsTokenManager:v}=t;J(L&&v,e,"internal-error");const y=Dr.fromJSON(this.name,v);J(typeof L=="string",e,"internal-error"),Jt(g,e.name),Jt(w,e.name),J(typeof j=="boolean",e,"internal-error"),J(typeof x=="boolean",e,"internal-error"),Jt(A,e.name),Jt(C,e.name),Jt(D,e.name),Jt(P,e.name),Jt(q,e.name),Jt(V,e.name);const m=new Ot({uid:L,auth:e,email:w,emailVerified:j,displayName:g,isAnonymous:x,photoURL:C,phoneNumber:A,tenantId:D,stsTokenManager:y,createdAt:q,lastLoginAt:V});return F&&Array.isArray(F)&&(m.providerData=F.map(I=>Object.assign({},I))),P&&(m._redirectEventId=P),m}static async _fromIdTokenResponse(e,t,r=!1){const i=new Dr;i.updateFromServerResponse(t);const s=new Ot({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await No(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];J(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?kp(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,c=new Dr;c.updateFromIdToken(r);const l=new Ot({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new $c(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih=new Map;function Lt(n){Bt(n instanceof Function,"Expected a class definition");let e=ih.get(n);return e?(Bt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ih.set(n,e),e)}/**
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
 */class Dp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Dp.type="NONE";const sh=Dp;/**
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
 */function fo(n,e,t){return`firebase:${n}:${e}:${t}`}class Nr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=fo(this.userKey,i.apiKey,s),this.fullPersistenceKey=fo("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ot._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Nr(Lt(sh),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||Lt(sh);const o=fo(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const p=await d._get(o);if(p){const g=Ot._fromJSON(e,p);d!==s&&(c=g),s=d;break}}catch{}const l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Nr(s,e,r):(s=l[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(o)}catch{}})),new Nr(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Op(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Np(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Mp(e))return"Blackberry";if(Fp(e))return"Webos";if(xp(e))return"Safari";if((e.includes("chrome/")||Vp(e))&&!e.includes("edge/"))return"Chrome";if(Lp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Np(n=Ne()){return/firefox\//i.test(n)}function xp(n=Ne()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Vp(n=Ne()){return/crios\//i.test(n)}function Op(n=Ne()){return/iemobile/i.test(n)}function Lp(n=Ne()){return/android/i.test(n)}function Mp(n=Ne()){return/blackberry/i.test(n)}function Fp(n=Ne()){return/webos/i.test(n)}function Dl(n=Ne()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function DI(n=Ne()){var e;return Dl(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function NI(){return zy()&&document.documentMode===10}function Up(n=Ne()){return Dl(n)||Lp(n)||Fp(n)||Mp(n)||/windows phone/i.test(n)||Op(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bp(n,e=[]){let t;switch(n){case"Browser":t=oh(Ne());break;case"Worker":t=`${oh(Ne())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ai}/${r}`}/**
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
 */class xI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,c)=>{try{const l=e(s);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function VI(n,e={}){return En(n,"GET","/v2/passwordPolicy",ar(n,e))}/**
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
 */const OI=6;class LI{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:OI,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MI{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ah(this),this.idTokenSubscription=new ah(this),this.beforeStateQueue=new xI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=bp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Lt(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Nr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Cp(this,{idToken:e}),r=await Ot._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(at(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&l?.user&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return J(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await No(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=gI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(at(this.app))return Promise.reject(hn(this));const t=e?_e(e):null;return t&&J(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&J(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return at(this.app)?Promise.reject(hn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return at(this.app)?Promise.reject(hn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await VI(this),t=new LI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new si("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await kI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Lt(e)||this._popupRedirectResolver;J(t,this,"argument-error"),this.redirectPersistenceManager=await Nr.create(this,[Lt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(J(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return J(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Bp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(at(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&fI(`Error while retrieving App Check token: ${t.error}`),t?.token}}function ci(n){return _e(n)}class ah{constructor(e){this.auth=e,this.observer=null,this.addObserver=Yy(t=>this.observer=t)}get next(){return J(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function FI(n){pa=n}function $p(n){return pa.loadJS(n)}function UI(){return pa.recaptchaEnterpriseScript}function BI(){return pa.gapiScript}function $I(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class jI{constructor(){this.enterprise=new qI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class qI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const zI="recaptcha-enterprise",jp="NO_RECAPTCHA";class GI{constructor(e){this.type=zI,this.auth=ci(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{EI(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new wI(l);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,o(d.siteKey)}}).catch(l=>{c(l)})})}function i(s,o,c){const l=window.grecaptcha;nh(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(d=>{o(d)}).catch(()=>{o(jp)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new jI().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(c=>{if(!t&&nh(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=UI();l.length!==0&&(l+=c),$p(l).then(()=>{i(c,s,o)}).catch(d=>{o(d)})}}).catch(c=>{o(c)})})}}async function ch(n,e,t,r=!1,i=!1){const s=new GI(n);let o;if(i)o=jp;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function lh(n,e,t,r,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await ch(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await ch(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KI(n,e){const t=oi(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Ji(s,e??{}))return i;pt(i,"already-initialized")}return t.initialize({options:e})}function HI(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Lt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function WI(n,e,t){const r=ci(n);J(r._canInitEmulator,r,"emulator-config-failed"),J(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=qp(e),{host:o,port:c}=QI(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),YI()}function qp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function QI(n){const e=qp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:uh(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:uh(o)}}}function uh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function YI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Vt("not implemented")}_getIdTokenResponse(e){return Vt("not implemented")}_linkToIdToken(e,t){return Vt("not implemented")}_getReauthenticationResolver(e){return Vt("not implemented")}}async function JI(n,e){return En(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XI(n,e){return fa(n,"POST","/v1/accounts:signInWithPassword",ar(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ZI(n,e){return fa(n,"POST","/v1/accounts:signInWithEmailLink",ar(n,e))}async function ew(n,e){return fa(n,"POST","/v1/accounts:signInWithEmailLink",ar(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es extends Nl{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new es(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new es(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return lh(e,t,"signInWithPassword",XI);case"emailLink":return ZI(e,{email:this._email,oobCode:this._password});default:pt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return lh(e,r,"signUpPassword",JI);case"emailLink":return ew(e,{idToken:t,email:this._email,oobCode:this._password});default:pt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xr(n,e){return fa(n,"POST","/v1/accounts:signInWithIdp",ar(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tw="http://localhost";class Qn extends Nl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Qn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):pt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Sl(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Qn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return xr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,xr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,xr(e,t)}buildRequest(){const e={requestUri:tw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Is(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nw(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function rw(n){const e=Vi(Oi(n)).link,t=e?Vi(Oi(e)).deep_link_id:null,r=Vi(Oi(n)).deep_link_id;return(r?Vi(Oi(r)).link:null)||r||t||e||n}class xl{constructor(e){var t,r,i,s,o,c;const l=Vi(Oi(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,g=nw((i=l.mode)!==null&&i!==void 0?i:null);J(d&&p&&g,"argument-error"),this.apiKey=d,this.operation=g,this.code=p,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=rw(e);try{return new xl(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(){this.providerId=li.PROVIDER_ID}static credential(e,t){return es._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=xl.parseLink(t);return J(r,"argument-error"),es._fromEmailAndCode(e,r.code,r.tenantId)}}li.PROVIDER_ID="password";li.EMAIL_PASSWORD_SIGN_IN_METHOD="password";li.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Es extends zp{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends Es{constructor(){super("facebook.com")}static credential(e){return Qn._fromParams({providerId:rn.PROVIDER_ID,signInMethod:rn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return rn.credentialFromTaggedObject(e)}static credentialFromError(e){return rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return rn.credential(e.oauthAccessToken)}catch{return null}}}rn.FACEBOOK_SIGN_IN_METHOD="facebook.com";rn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn extends Es{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Qn._fromParams({providerId:sn.PROVIDER_ID,signInMethod:sn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return sn.credentialFromTaggedObject(e)}static credentialFromError(e){return sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return sn.credential(t,r)}catch{return null}}}sn.GOOGLE_SIGN_IN_METHOD="google.com";sn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on extends Es{constructor(){super("github.com")}static credential(e){return Qn._fromParams({providerId:on.PROVIDER_ID,signInMethod:on.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return on.credentialFromTaggedObject(e)}static credentialFromError(e){return on.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return on.credential(e.oauthAccessToken)}catch{return null}}}on.GITHUB_SIGN_IN_METHOD="github.com";on.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an extends Es{constructor(){super("twitter.com")}static credential(e,t){return Qn._fromParams({providerId:an.PROVIDER_ID,signInMethod:an.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return an.credentialFromTaggedObject(e)}static credentialFromError(e){return an.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return an.credential(t,r)}catch{return null}}}an.TWITTER_SIGN_IN_METHOD="twitter.com";an.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await Ot._fromIdTokenResponse(e,r,i),o=dh(r);return new Br({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=dh(r);return new Br({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function dh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo extends St{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,xo.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new xo(e,t,r,i)}}function Gp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?xo._fromErrorAndOperation(n,s,e,r):s})}async function iw(n,e,t=!1){const r=await Zi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Br._forOperation(n,"link",r)}/**
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
 */async function sw(n,e,t=!1){const{auth:r}=n;if(at(r.app))return Promise.reject(hn(r));const i="reauthenticate";try{const s=await Zi(n,Gp(r,i,e,n),t);J(s.idToken,r,"internal-error");const o=kl(s.idToken);J(o,r,"internal-error");const{sub:c}=o;return J(n.uid===c,r,"user-mismatch"),Br._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&pt(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kp(n,e,t=!1){if(at(n.app))return Promise.reject(hn(n));const r="signIn",i=await Gp(n,r,e),s=await Br._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function ow(n,e){return Kp(ci(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aw(n){const e=ci(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function cw(n,e,t){return at(n.app)?Promise.reject(hn(n)):ow(_e(n),li.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&aw(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lw(n,e){return _e(n).setPersistence(e)}function uw(n,e,t,r){return _e(n).onIdTokenChanged(e,t,r)}function dw(n,e,t){return _e(n).beforeAuthStateChanged(e,t)}function hw(n,e,t,r){return _e(n).onAuthStateChanged(e,t,r)}function fw(n){return _e(n).signOut()}const Vo="__sak";/**
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
 */class Hp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Vo,"1"),this.storage.removeItem(Vo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pw=1e3,mw=10;class Wp extends Hp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Up(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);NI()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,mw):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},pw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Wp.type="LOCAL";const Qp=Wp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp extends Hp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Yp.type="SESSION";const Jp=Yp;/**
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
 */function gw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ma{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new ma(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async d=>d(t.origin,s)),l=await gw(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ma.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class _w{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,l)=>{const d=Vl("",20);i.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(g){const w=g;if(w.data.eventId===d)switch(w.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(w.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(){return window}function yw(n){It().location.href=n}/**
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
 */function Xp(){return typeof It().WorkerGlobalScope<"u"&&typeof It().importScripts=="function"}async function vw(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Iw(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function ww(){return Xp()?self:null}/**
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
 */const Zp="firebaseLocalStorageDb",Ew=1,Oo="firebaseLocalStorage",em="fbase_key";class Ts{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ga(n,e){return n.transaction([Oo],e?"readwrite":"readonly").objectStore(Oo)}function Tw(){const n=indexedDB.deleteDatabase(Zp);return new Ts(n).toPromise()}function jc(){const n=indexedDB.open(Zp,Ew);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Oo,{keyPath:em})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Oo)?e(r):(r.close(),await Tw(),e(await jc()))})})}async function hh(n,e,t){const r=ga(n,!0).put({[em]:e,value:t});return new Ts(r).toPromise()}async function bw(n,e){const t=ga(n,!1).get(e),r=await new Ts(t).toPromise();return r===void 0?null:r.value}function fh(n,e){const t=ga(n,!0).delete(e);return new Ts(t).toPromise()}const Aw=800,Rw=3;class tm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await jc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Rw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Xp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ma._getInstance(ww()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await vw(),!this.activeServiceWorker)return;this.sender=new _w(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Iw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await jc();return await hh(e,Vo,"1"),await fh(e,Vo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>hh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>bw(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>fh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=ga(i,!1).getAll();return new Ts(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Aw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}tm.type="LOCAL";const Sw=tm;new ws(3e4,6e4);/**
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
 */function Pw(n,e){return e?Lt(e):(J(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Ol extends Nl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return xr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return xr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return xr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Cw(n){return Kp(n.auth,new Ol(n),n.bypassAuthState)}function kw(n){const{auth:e,user:t}=n;return J(t,e,"internal-error"),sw(t,new Ol(n),n.bypassAuthState)}async function Dw(n){const{auth:e,user:t}=n;return J(t,e,"internal-error"),iw(t,new Ol(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Cw;case"linkViaPopup":case"linkViaRedirect":return Dw;case"reauthViaPopup":case"reauthViaRedirect":return kw;default:pt(this.auth,"internal-error")}}resolve(e){Bt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Bt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nw=new ws(2e3,1e4);class Cr extends nm{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Cr.currentPopupAction&&Cr.currentPopupAction.cancel(),Cr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return J(e,this.auth,"internal-error"),e}async onExecution(){Bt(this.filter.length===1,"Popup operations only handle one event");const e=Vl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(vt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(vt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Cr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(vt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Nw.get())};e()}}Cr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xw="pendingRedirect",po=new Map;class Vw extends nm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=po.get(this.auth._key());if(!e){try{const r=await Ow(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}po.set(this.auth._key(),e)}return this.bypassAuthState||po.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ow(n,e){const t=Fw(e),r=Mw(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function Lw(n,e){po.set(n._key(),e)}function Mw(n){return Lt(n._redirectPersistence)}function Fw(n){return fo(xw,n.config.apiKey,n.name)}async function Uw(n,e,t=!1){if(at(n.app))return Promise.reject(hn(n));const r=ci(n),i=Pw(r,e),o=await new Vw(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bw=10*60*1e3;class $w{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!jw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!rm(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(vt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Bw&&this.cachedEventUids.clear(),this.cachedEventUids.has(ph(e))}saveEventToCache(e){this.cachedEventUids.add(ph(e)),this.lastProcessedEventTime=Date.now()}}function ph(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function rm({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function jw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return rm(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qw(n,e={}){return En(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Gw=/^https?/;async function Kw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await qw(n);for(const t of e)try{if(Hw(t))return}catch{}pt(n,"unauthorized-domain")}function Hw(n){const e=Bc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Gw.test(t))return!1;if(zw.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const Ww=new ws(3e4,6e4);function mh(){const n=It().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Qw(n){return new Promise((e,t)=>{var r,i,s;function o(){mh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{mh(),t(vt(n,"network-request-failed"))},timeout:Ww.get()})}if(!((i=(r=It().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=It().gapi)===null||s===void 0)&&s.load)o();else{const c=$I("iframefcb");return It()[c]=()=>{gapi.load?o():t(vt(n,"network-request-failed"))},$p(`${BI()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw mo=null,e})}let mo=null;function Yw(n){return mo=mo||Qw(n),mo}/**
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
 */const Jw=new ws(5e3,15e3),Xw="__/auth/iframe",Zw="emulator/auth/iframe",eE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},tE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function nE(n){const e=n.config;J(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Cl(e,Zw):`https://${n.config.authDomain}/${Xw}`,r={apiKey:e.apiKey,appName:n.name,v:ai},i=tE.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Is(r).slice(1)}`}async function rE(n){const e=await Yw(n),t=It().gapi;return J(t,n,"internal-error"),e.open({where:document.body,url:nE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:eE,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=vt(n,"network-request-failed"),c=It().setTimeout(()=>{s(o)},Jw.get());function l(){It().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
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
 */const iE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},sE=500,oE=600,aE="_blank",cE="http://localhost";class gh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function lE(n,e,t,r=sE,i=oE){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},iE),{width:r.toString(),height:i.toString(),top:s,left:o}),d=Ne().toLowerCase();t&&(c=Vp(d)?aE:t),Np(d)&&(e=e||cE,l.scrollbars="yes");const p=Object.entries(l).reduce((w,[A,C])=>`${w}${A}=${C},`,"");if(DI(d)&&c!=="_self")return uE(e||"",c),new gh(null);const g=window.open(e||"",c,p);J(g,n,"popup-blocked");try{g.focus()}catch{}return new gh(g)}function uE(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const dE="__/auth/handler",hE="emulator/auth/handler",fE=encodeURIComponent("fac");async function _h(n,e,t,r,i,s){J(n.config.authDomain,n,"auth-domain-config-required"),J(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ai,eventId:i};if(e instanceof zp){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Qy(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,g]of Object.entries({}))o[p]=g}if(e instanceof Es){const p=e.getScopes().filter(g=>g!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),d=l?`#${fE}=${encodeURIComponent(l)}`:"";return`${pE(n)}?${Is(c).slice(1)}${d}`}function pE({config:n}){return n.emulator?Cl(n,hE):`https://${n.authDomain}/${dE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ec="webStorageSupport";class mE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jp,this._completeRedirectFn=Uw,this._overrideRedirectResult=Lw}async _openPopup(e,t,r,i){var s;Bt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await _h(e,t,r,Bc(),i);return lE(e,o,Vl())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await _h(e,t,r,Bc(),i);return yw(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Bt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await rE(e),r=new $w(e);return t.register("authEvent",i=>(J(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ec,{type:Ec},i=>{var s;const o=(s=i?.[0])===null||s===void 0?void 0:s[Ec];o!==void 0&&t(!!o),pt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Kw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Up()||xp()||Dl()}}const gE=mE;var yh="@firebase/auth",vh="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _E{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){J(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function vE(n){Ut(new Tt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;J(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Bp(n)},d=new MI(r,i,s,l);return HI(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ut(new Tt("auth-internal",e=>{const t=ci(e.getProvider("auth").getImmediate());return(r=>new _E(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ft(yh,vh,yE(n)),ft(yh,vh,"esm2017")}/**
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
 */const IE=5*60,wE=gp("authIdTokenMaxAge")||IE;let Ih=null;const EE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>wE)return;const i=t?.token;Ih!==i&&(Ih=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function TE(n=Rl()){const e=oi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=KI(n,{popupRedirectResolver:gE,persistence:[Sw,Qp,Jp]}),r=gp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=EE(s.toString());dw(t,o,()=>o(t.currentUser)),uw(t,c=>o(c))}}const i=pp("auth");return i&&WI(t,`http://${i}`),t}function bE(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}FI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=vt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",bE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});vE("Browser");var wh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var fn,im;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,y){function m(){}m.prototype=y.prototype,v.D=y.prototype,v.prototype=new m,v.prototype.constructor=v,v.C=function(I,T,b){for(var E=Array(arguments.length-2),re=2;re<arguments.length;re++)E[re-2]=arguments[re];return y.prototype[T].apply(I,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,y,m){m||(m=0);var I=Array(16);if(typeof y=="string")for(var T=0;16>T;++T)I[T]=y.charCodeAt(m++)|y.charCodeAt(m++)<<8|y.charCodeAt(m++)<<16|y.charCodeAt(m++)<<24;else for(T=0;16>T;++T)I[T]=y[m++]|y[m++]<<8|y[m++]<<16|y[m++]<<24;y=v.g[0],m=v.g[1],T=v.g[2];var b=v.g[3],E=y+(b^m&(T^b))+I[0]+3614090360&4294967295;y=m+(E<<7&4294967295|E>>>25),E=b+(T^y&(m^T))+I[1]+3905402710&4294967295,b=y+(E<<12&4294967295|E>>>20),E=T+(m^b&(y^m))+I[2]+606105819&4294967295,T=b+(E<<17&4294967295|E>>>15),E=m+(y^T&(b^y))+I[3]+3250441966&4294967295,m=T+(E<<22&4294967295|E>>>10),E=y+(b^m&(T^b))+I[4]+4118548399&4294967295,y=m+(E<<7&4294967295|E>>>25),E=b+(T^y&(m^T))+I[5]+1200080426&4294967295,b=y+(E<<12&4294967295|E>>>20),E=T+(m^b&(y^m))+I[6]+2821735955&4294967295,T=b+(E<<17&4294967295|E>>>15),E=m+(y^T&(b^y))+I[7]+4249261313&4294967295,m=T+(E<<22&4294967295|E>>>10),E=y+(b^m&(T^b))+I[8]+1770035416&4294967295,y=m+(E<<7&4294967295|E>>>25),E=b+(T^y&(m^T))+I[9]+2336552879&4294967295,b=y+(E<<12&4294967295|E>>>20),E=T+(m^b&(y^m))+I[10]+4294925233&4294967295,T=b+(E<<17&4294967295|E>>>15),E=m+(y^T&(b^y))+I[11]+2304563134&4294967295,m=T+(E<<22&4294967295|E>>>10),E=y+(b^m&(T^b))+I[12]+1804603682&4294967295,y=m+(E<<7&4294967295|E>>>25),E=b+(T^y&(m^T))+I[13]+4254626195&4294967295,b=y+(E<<12&4294967295|E>>>20),E=T+(m^b&(y^m))+I[14]+2792965006&4294967295,T=b+(E<<17&4294967295|E>>>15),E=m+(y^T&(b^y))+I[15]+1236535329&4294967295,m=T+(E<<22&4294967295|E>>>10),E=y+(T^b&(m^T))+I[1]+4129170786&4294967295,y=m+(E<<5&4294967295|E>>>27),E=b+(m^T&(y^m))+I[6]+3225465664&4294967295,b=y+(E<<9&4294967295|E>>>23),E=T+(y^m&(b^y))+I[11]+643717713&4294967295,T=b+(E<<14&4294967295|E>>>18),E=m+(b^y&(T^b))+I[0]+3921069994&4294967295,m=T+(E<<20&4294967295|E>>>12),E=y+(T^b&(m^T))+I[5]+3593408605&4294967295,y=m+(E<<5&4294967295|E>>>27),E=b+(m^T&(y^m))+I[10]+38016083&4294967295,b=y+(E<<9&4294967295|E>>>23),E=T+(y^m&(b^y))+I[15]+3634488961&4294967295,T=b+(E<<14&4294967295|E>>>18),E=m+(b^y&(T^b))+I[4]+3889429448&4294967295,m=T+(E<<20&4294967295|E>>>12),E=y+(T^b&(m^T))+I[9]+568446438&4294967295,y=m+(E<<5&4294967295|E>>>27),E=b+(m^T&(y^m))+I[14]+3275163606&4294967295,b=y+(E<<9&4294967295|E>>>23),E=T+(y^m&(b^y))+I[3]+4107603335&4294967295,T=b+(E<<14&4294967295|E>>>18),E=m+(b^y&(T^b))+I[8]+1163531501&4294967295,m=T+(E<<20&4294967295|E>>>12),E=y+(T^b&(m^T))+I[13]+2850285829&4294967295,y=m+(E<<5&4294967295|E>>>27),E=b+(m^T&(y^m))+I[2]+4243563512&4294967295,b=y+(E<<9&4294967295|E>>>23),E=T+(y^m&(b^y))+I[7]+1735328473&4294967295,T=b+(E<<14&4294967295|E>>>18),E=m+(b^y&(T^b))+I[12]+2368359562&4294967295,m=T+(E<<20&4294967295|E>>>12),E=y+(m^T^b)+I[5]+4294588738&4294967295,y=m+(E<<4&4294967295|E>>>28),E=b+(y^m^T)+I[8]+2272392833&4294967295,b=y+(E<<11&4294967295|E>>>21),E=T+(b^y^m)+I[11]+1839030562&4294967295,T=b+(E<<16&4294967295|E>>>16),E=m+(T^b^y)+I[14]+4259657740&4294967295,m=T+(E<<23&4294967295|E>>>9),E=y+(m^T^b)+I[1]+2763975236&4294967295,y=m+(E<<4&4294967295|E>>>28),E=b+(y^m^T)+I[4]+1272893353&4294967295,b=y+(E<<11&4294967295|E>>>21),E=T+(b^y^m)+I[7]+4139469664&4294967295,T=b+(E<<16&4294967295|E>>>16),E=m+(T^b^y)+I[10]+3200236656&4294967295,m=T+(E<<23&4294967295|E>>>9),E=y+(m^T^b)+I[13]+681279174&4294967295,y=m+(E<<4&4294967295|E>>>28),E=b+(y^m^T)+I[0]+3936430074&4294967295,b=y+(E<<11&4294967295|E>>>21),E=T+(b^y^m)+I[3]+3572445317&4294967295,T=b+(E<<16&4294967295|E>>>16),E=m+(T^b^y)+I[6]+76029189&4294967295,m=T+(E<<23&4294967295|E>>>9),E=y+(m^T^b)+I[9]+3654602809&4294967295,y=m+(E<<4&4294967295|E>>>28),E=b+(y^m^T)+I[12]+3873151461&4294967295,b=y+(E<<11&4294967295|E>>>21),E=T+(b^y^m)+I[15]+530742520&4294967295,T=b+(E<<16&4294967295|E>>>16),E=m+(T^b^y)+I[2]+3299628645&4294967295,m=T+(E<<23&4294967295|E>>>9),E=y+(T^(m|~b))+I[0]+4096336452&4294967295,y=m+(E<<6&4294967295|E>>>26),E=b+(m^(y|~T))+I[7]+1126891415&4294967295,b=y+(E<<10&4294967295|E>>>22),E=T+(y^(b|~m))+I[14]+2878612391&4294967295,T=b+(E<<15&4294967295|E>>>17),E=m+(b^(T|~y))+I[5]+4237533241&4294967295,m=T+(E<<21&4294967295|E>>>11),E=y+(T^(m|~b))+I[12]+1700485571&4294967295,y=m+(E<<6&4294967295|E>>>26),E=b+(m^(y|~T))+I[3]+2399980690&4294967295,b=y+(E<<10&4294967295|E>>>22),E=T+(y^(b|~m))+I[10]+4293915773&4294967295,T=b+(E<<15&4294967295|E>>>17),E=m+(b^(T|~y))+I[1]+2240044497&4294967295,m=T+(E<<21&4294967295|E>>>11),E=y+(T^(m|~b))+I[8]+1873313359&4294967295,y=m+(E<<6&4294967295|E>>>26),E=b+(m^(y|~T))+I[15]+4264355552&4294967295,b=y+(E<<10&4294967295|E>>>22),E=T+(y^(b|~m))+I[6]+2734768916&4294967295,T=b+(E<<15&4294967295|E>>>17),E=m+(b^(T|~y))+I[13]+1309151649&4294967295,m=T+(E<<21&4294967295|E>>>11),E=y+(T^(m|~b))+I[4]+4149444226&4294967295,y=m+(E<<6&4294967295|E>>>26),E=b+(m^(y|~T))+I[11]+3174756917&4294967295,b=y+(E<<10&4294967295|E>>>22),E=T+(y^(b|~m))+I[2]+718787259&4294967295,T=b+(E<<15&4294967295|E>>>17),E=m+(b^(T|~y))+I[9]+3951481745&4294967295,v.g[0]=v.g[0]+y&4294967295,v.g[1]=v.g[1]+(T+(E<<21&4294967295|E>>>11))&4294967295,v.g[2]=v.g[2]+T&4294967295,v.g[3]=v.g[3]+b&4294967295}r.prototype.u=function(v,y){y===void 0&&(y=v.length);for(var m=y-this.blockSize,I=this.B,T=this.h,b=0;b<y;){if(T==0)for(;b<=m;)i(this,v,b),b+=this.blockSize;if(typeof v=="string"){for(;b<y;)if(I[T++]=v.charCodeAt(b++),T==this.blockSize){i(this,I),T=0;break}}else for(;b<y;)if(I[T++]=v[b++],T==this.blockSize){i(this,I),T=0;break}}this.h=T,this.o+=y},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var y=1;y<v.length-8;++y)v[y]=0;var m=8*this.o;for(y=v.length-8;y<v.length;++y)v[y]=m&255,m/=256;for(this.u(v),v=Array(16),y=m=0;4>y;++y)for(var I=0;32>I;I+=8)v[m++]=this.g[y]>>>I&255;return v};function s(v,y){var m=c;return Object.prototype.hasOwnProperty.call(m,v)?m[v]:m[v]=y(v)}function o(v,y){this.h=y;for(var m=[],I=!0,T=v.length-1;0<=T;T--){var b=v[T]|0;I&&b==y||(m[T]=b,I=!1)}this.g=m}var c={};function l(v){return-128<=v&&128>v?s(v,function(y){return new o([y|0],0>y?-1:0)}):new o([v|0],0>v?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return g;if(0>v)return P(d(-v));for(var y=[],m=1,I=0;v>=m;I++)y[I]=v/m|0,m*=4294967296;return new o(y,0)}function p(v,y){if(v.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(v.charAt(0)=="-")return P(p(v.substring(1),y));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var m=d(Math.pow(y,8)),I=g,T=0;T<v.length;T+=8){var b=Math.min(8,v.length-T),E=parseInt(v.substring(T,T+b),y);8>b?(b=d(Math.pow(y,b)),I=I.j(b).add(d(E))):(I=I.j(m),I=I.add(d(E)))}return I}var g=l(0),w=l(1),A=l(16777216);n=o.prototype,n.m=function(){if(D(this))return-P(this).m();for(var v=0,y=1,m=0;m<this.g.length;m++){var I=this.i(m);v+=(0<=I?I:4294967296+I)*y,y*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(C(this))return"0";if(D(this))return"-"+P(this).toString(v);for(var y=d(Math.pow(v,6)),m=this,I="";;){var T=j(m,y).g;m=q(m,T.j(y));var b=((0<m.g.length?m.g[0]:m.h)>>>0).toString(v);if(m=T,C(m))return b+I;for(;6>b.length;)b="0"+b;I=b+I}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function C(v){if(v.h!=0)return!1;for(var y=0;y<v.g.length;y++)if(v.g[y]!=0)return!1;return!0}function D(v){return v.h==-1}n.l=function(v){return v=q(this,v),D(v)?-1:C(v)?0:1};function P(v){for(var y=v.g.length,m=[],I=0;I<y;I++)m[I]=~v.g[I];return new o(m,~v.h).add(w)}n.abs=function(){return D(this)?P(this):this},n.add=function(v){for(var y=Math.max(this.g.length,v.g.length),m=[],I=0,T=0;T<=y;T++){var b=I+(this.i(T)&65535)+(v.i(T)&65535),E=(b>>>16)+(this.i(T)>>>16)+(v.i(T)>>>16);I=E>>>16,b&=65535,E&=65535,m[T]=E<<16|b}return new o(m,m[m.length-1]&-2147483648?-1:0)};function q(v,y){return v.add(P(y))}n.j=function(v){if(C(this)||C(v))return g;if(D(this))return D(v)?P(this).j(P(v)):P(P(this).j(v));if(D(v))return P(this.j(P(v)));if(0>this.l(A)&&0>v.l(A))return d(this.m()*v.m());for(var y=this.g.length+v.g.length,m=[],I=0;I<2*y;I++)m[I]=0;for(I=0;I<this.g.length;I++)for(var T=0;T<v.g.length;T++){var b=this.i(I)>>>16,E=this.i(I)&65535,re=v.i(T)>>>16,Ae=v.i(T)&65535;m[2*I+2*T]+=E*Ae,V(m,2*I+2*T),m[2*I+2*T+1]+=b*Ae,V(m,2*I+2*T+1),m[2*I+2*T+1]+=E*re,V(m,2*I+2*T+1),m[2*I+2*T+2]+=b*re,V(m,2*I+2*T+2)}for(I=0;I<y;I++)m[I]=m[2*I+1]<<16|m[2*I];for(I=y;I<2*y;I++)m[I]=0;return new o(m,0)};function V(v,y){for(;(v[y]&65535)!=v[y];)v[y+1]+=v[y]>>>16,v[y]&=65535,y++}function L(v,y){this.g=v,this.h=y}function j(v,y){if(C(y))throw Error("division by zero");if(C(v))return new L(g,g);if(D(v))return y=j(P(v),y),new L(P(y.g),P(y.h));if(D(y))return y=j(v,P(y)),new L(P(y.g),y.h);if(30<v.g.length){if(D(v)||D(y))throw Error("slowDivide_ only works with positive integers.");for(var m=w,I=y;0>=I.l(v);)m=x(m),I=x(I);var T=F(m,1),b=F(I,1);for(I=F(I,2),m=F(m,2);!C(I);){var E=b.add(I);0>=E.l(v)&&(T=T.add(m),b=E),I=F(I,1),m=F(m,1)}return y=q(v,T.j(y)),new L(T,y)}for(T=g;0<=v.l(y);){for(m=Math.max(1,Math.floor(v.m()/y.m())),I=Math.ceil(Math.log(m)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),b=d(m),E=b.j(y);D(E)||0<E.l(v);)m-=I,b=d(m),E=b.j(y);C(b)&&(b=w),T=T.add(b),v=q(v,E)}return new L(T,v)}n.A=function(v){return j(this,v).h},n.and=function(v){for(var y=Math.max(this.g.length,v.g.length),m=[],I=0;I<y;I++)m[I]=this.i(I)&v.i(I);return new o(m,this.h&v.h)},n.or=function(v){for(var y=Math.max(this.g.length,v.g.length),m=[],I=0;I<y;I++)m[I]=this.i(I)|v.i(I);return new o(m,this.h|v.h)},n.xor=function(v){for(var y=Math.max(this.g.length,v.g.length),m=[],I=0;I<y;I++)m[I]=this.i(I)^v.i(I);return new o(m,this.h^v.h)};function x(v){for(var y=v.g.length+1,m=[],I=0;I<y;I++)m[I]=v.i(I)<<1|v.i(I-1)>>>31;return new o(m,v.h)}function F(v,y){var m=y>>5;y%=32;for(var I=v.g.length-m,T=[],b=0;b<I;b++)T[b]=0<y?v.i(b+m)>>>y|v.i(b+m+1)<<32-y:v.i(b+m);return new o(T,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,im=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=p,fn=o}).apply(typeof wh<"u"?wh:typeof self<"u"?self:typeof window<"u"?window:{});var Xs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var sm,Li,om,go,qc,am,cm,lm;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,h){return a==Array.prototype||a==Object.prototype||(a[u]=h.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Xs=="object"&&Xs];for(var u=0;u<a.length;++u){var h=a[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(a,u){if(u)e:{var h=r;a=a.split(".");for(var _=0;_<a.length-1;_++){var S=a[_];if(!(S in h))break e;h=h[S]}a=a[a.length-1],_=h[a],u=u(_),u!=_&&u!=null&&e(h,a,{configurable:!0,writable:!0,value:u})}}function s(a,u){a instanceof String&&(a+="");var h=0,_=!1,S={next:function(){if(!_&&h<a.length){var k=h++;return{value:u(k,a[k]),done:!1}}return _=!0,{done:!0,value:void 0}}};return S[Symbol.iterator]=function(){return S},S}i("Array.prototype.values",function(a){return a||function(){return s(this,function(u,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function d(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function p(a,u,h){return a.call.apply(a.bind,arguments)}function g(a,u,h){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var S=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(S,_),a.apply(u,S)}}return function(){return a.apply(u,arguments)}}function w(a,u,h){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:g,w.apply(null,arguments)}function A(a,u){var h=Array.prototype.slice.call(arguments,1);return function(){var _=h.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function C(a,u){function h(){}h.prototype=u.prototype,a.aa=u.prototype,a.prototype=new h,a.prototype.constructor=a,a.Qb=function(_,S,k){for(var $=Array(arguments.length-2),me=2;me<arguments.length;me++)$[me-2]=arguments[me];return u.prototype[S].apply(_,$)}}function D(a){const u=a.length;if(0<u){const h=Array(u);for(let _=0;_<u;_++)h[_]=a[_];return h}return[]}function P(a,u){for(let h=1;h<arguments.length;h++){const _=arguments[h];if(l(_)){const S=a.length||0,k=_.length||0;a.length=S+k;for(let $=0;$<k;$++)a[S+$]=_[$]}else a.push(_)}}class q{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function V(a){return/^[\s\xa0]*$/.test(a)}function L(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function j(a){return j[" "](a),a}j[" "]=function(){};var x=L().indexOf("Gecko")!=-1&&!(L().toLowerCase().indexOf("webkit")!=-1&&L().indexOf("Edge")==-1)&&!(L().indexOf("Trident")!=-1||L().indexOf("MSIE")!=-1)&&L().indexOf("Edge")==-1;function F(a,u,h){for(const _ in a)u.call(h,a[_],_,a)}function v(a,u){for(const h in a)u.call(void 0,a[h],h,a)}function y(a){const u={};for(const h in a)u[h]=a[h];return u}const m="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(a,u){let h,_;for(let S=1;S<arguments.length;S++){_=arguments[S];for(h in _)a[h]=_[h];for(let k=0;k<m.length;k++)h=m[k],Object.prototype.hasOwnProperty.call(_,h)&&(a[h]=_[h])}}function T(a){var u=1;a=a.split(":");const h=[];for(;0<u&&a.length;)h.push(a.shift()),u--;return a.length&&h.push(a.join(":")),h}function b(a){c.setTimeout(()=>{throw a},0)}function E(){var a=kt;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class re{constructor(){this.h=this.g=null}add(u,h){const _=Ae.get();_.set(u,h),this.h?this.h.next=_:this.g=_,this.h=_}}var Ae=new q(()=>new Re,a=>a.reset());class Re{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let tt,Ct=!1,kt=new re,dr=()=>{const a=c.Promise.resolve(void 0);tt=()=>{a.then(Qa)}};var Qa=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(h){b(h)}var u=Ae;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}Ct=!1};function mt(){this.s=this.s,this.C=this.C}mt.prototype.s=!1,mt.prototype.ma=function(){this.s||(this.s=!0,this.N())},mt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ve(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}Ve.prototype.h=function(){this.defaultPrevented=!0};var Ya=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const h=()=>{};c.addEventListener("test",h,u),c.removeEventListener("test",h,u)}catch{}return a}();function O(a,u){if(Ve.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var h=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(x){e:{try{j(u.nodeName);var S=!0;break e}catch{}S=!1}S||(u=null)}}else h=="mouseover"?u=a.fromElement:h=="mouseout"&&(u=a.toElement);this.relatedTarget=u,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:B[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&O.aa.h.call(this)}}C(O,Ve);var B={2:"touch",3:"pen",4:"mouse"};O.prototype.h=function(){O.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var H="closure_listenable_"+(1e6*Math.random()|0),ae=0;function ee(a,u,h,_,S){this.listener=a,this.proxy=null,this.src=u,this.type=h,this.capture=!!_,this.ha=S,this.key=++ae,this.da=this.fa=!1}function ne(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ke(a){this.src=a,this.g={},this.h=0}ke.prototype.add=function(a,u,h,_,S){var k=a.toString();a=this.g[k],a||(a=this.g[k]=[],this.h++);var $=fr(a,u,_,S);return-1<$?(u=a[$],h||(u.fa=!1)):(u=new ee(u,this.src,k,!!_,S),u.fa=h,a.push(u)),u};function hr(a,u){var h=u.type;if(h in a.g){var _=a.g[h],S=Array.prototype.indexOf.call(_,u,void 0),k;(k=0<=S)&&Array.prototype.splice.call(_,S,1),k&&(ne(u),a.g[h].length==0&&(delete a.g[h],a.h--))}}function fr(a,u,h,_){for(var S=0;S<a.length;++S){var k=a[S];if(!k.da&&k.listener==u&&k.capture==!!h&&k.ha==_)return S}return-1}var pi="closure_lm_"+(1e6*Math.random()|0),Rn={};function Sn(a,u,h,_,S){if(Array.isArray(u)){for(var k=0;k<u.length;k++)Sn(a,u[k],h,_,S);return null}return h=Qu(h),a&&a[H]?a.K(u,h,d(_)?!!_.capture:!1,S):mi(a,u,h,!1,_,S)}function mi(a,u,h,_,S,k){if(!u)throw Error("Invalid event type");var $=d(S)?!!S.capture:!!S,me=Xa(a);if(me||(a[pi]=me=new ke(a)),h=me.add(u,h,_,$,k),h.proxy)return h;if(_=ty(),h.proxy=_,_.src=a,_.listener=h,a.addEventListener)Ya||(S=$),S===void 0&&(S=!1),a.addEventListener(u.toString(),_,S);else if(a.attachEvent)a.attachEvent(Wu(u.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return h}function ty(){function a(h){return u.call(a.src,a.listener,h)}const u=ny;return a}function Hu(a,u,h,_,S){if(Array.isArray(u))for(var k=0;k<u.length;k++)Hu(a,u[k],h,_,S);else _=d(_)?!!_.capture:!!_,h=Qu(h),a&&a[H]?(a=a.i,u=String(u).toString(),u in a.g&&(k=a.g[u],h=fr(k,h,_,S),-1<h&&(ne(k[h]),Array.prototype.splice.call(k,h,1),k.length==0&&(delete a.g[u],a.h--)))):a&&(a=Xa(a))&&(u=a.g[u.toString()],a=-1,u&&(a=fr(u,h,_,S)),(h=-1<a?u[a]:null)&&Ja(h))}function Ja(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[H])hr(u.i,a);else{var h=a.type,_=a.proxy;u.removeEventListener?u.removeEventListener(h,_,a.capture):u.detachEvent?u.detachEvent(Wu(h),_):u.addListener&&u.removeListener&&u.removeListener(_),(h=Xa(u))?(hr(h,a),h.h==0&&(h.src=null,u[pi]=null)):ne(a)}}}function Wu(a){return a in Rn?Rn[a]:Rn[a]="on"+a}function ny(a,u){if(a.da)a=!0;else{u=new O(u,this);var h=a.listener,_=a.ha||a.src;a.fa&&Ja(a),a=h.call(_,u)}return a}function Xa(a){return a=a[pi],a instanceof ke?a:null}var Za="__closure_events_fn_"+(1e9*Math.random()>>>0);function Qu(a){return typeof a=="function"?a:(a[Za]||(a[Za]=function(u){return a.handleEvent(u)}),a[Za])}function Fe(){mt.call(this),this.i=new ke(this),this.M=this,this.F=null}C(Fe,mt),Fe.prototype[H]=!0,Fe.prototype.removeEventListener=function(a,u,h,_){Hu(this,a,u,h,_)};function Ge(a,u){var h,_=a.F;if(_)for(h=[];_;_=_.F)h.push(_);if(a=a.M,_=u.type||u,typeof u=="string")u=new Ve(u,a);else if(u instanceof Ve)u.target=u.target||a;else{var S=u;u=new Ve(_,a),I(u,S)}if(S=!0,h)for(var k=h.length-1;0<=k;k--){var $=u.g=h[k];S=Os($,_,!0,u)&&S}if($=u.g=a,S=Os($,_,!0,u)&&S,S=Os($,_,!1,u)&&S,h)for(k=0;k<h.length;k++)$=u.g=h[k],S=Os($,_,!1,u)&&S}Fe.prototype.N=function(){if(Fe.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var h=a.g[u],_=0;_<h.length;_++)ne(h[_]);delete a.g[u],a.h--}}this.F=null},Fe.prototype.K=function(a,u,h,_){return this.i.add(String(a),u,!1,h,_)},Fe.prototype.L=function(a,u,h,_){return this.i.add(String(a),u,!0,h,_)};function Os(a,u,h,_){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var S=!0,k=0;k<u.length;++k){var $=u[k];if($&&!$.da&&$.capture==h){var me=$.listener,Le=$.ha||$.src;$.fa&&hr(a.i,$),S=me.call(Le,_)!==!1&&S}}return S&&!_.defaultPrevented}function Yu(a,u,h){if(typeof a=="function")h&&(a=w(a,h));else if(a&&typeof a.handleEvent=="function")a=w(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(a,u||0)}function Ju(a){a.g=Yu(()=>{a.g=null,a.i&&(a.i=!1,Ju(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class ry extends mt{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Ju(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function gi(a){mt.call(this),this.h=a,this.g={}}C(gi,mt);var Xu=[];function Zu(a){F(a.g,function(u,h){this.g.hasOwnProperty(h)&&Ja(u)},a),a.g={}}gi.prototype.N=function(){gi.aa.N.call(this),Zu(this)},gi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ec=c.JSON.stringify,iy=c.JSON.parse,sy=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function tc(){}tc.prototype.h=null;function ed(a){return a.h||(a.h=a.i())}function td(){}var _i={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function nc(){Ve.call(this,"d")}C(nc,Ve);function rc(){Ve.call(this,"c")}C(rc,Ve);var Pn={},nd=null;function Ls(){return nd=nd||new Fe}Pn.La="serverreachability";function rd(a){Ve.call(this,Pn.La,a)}C(rd,Ve);function yi(a){const u=Ls();Ge(u,new rd(u))}Pn.STAT_EVENT="statevent";function id(a,u){Ve.call(this,Pn.STAT_EVENT,a),this.stat=u}C(id,Ve);function Ke(a){const u=Ls();Ge(u,new id(u,a))}Pn.Ma="timingevent";function sd(a,u){Ve.call(this,Pn.Ma,a),this.size=u}C(sd,Ve);function vi(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},u)}function Ii(){this.g=!0}Ii.prototype.xa=function(){this.g=!1};function oy(a,u,h,_,S,k){a.info(function(){if(a.g)if(k)for(var $="",me=k.split("&"),Le=0;Le<me.length;Le++){var le=me[Le].split("=");if(1<le.length){var Ue=le[0];le=le[1];var Be=Ue.split("_");$=2<=Be.length&&Be[1]=="type"?$+(Ue+"="+le+"&"):$+(Ue+"=redacted&")}}else $=null;else $=k;return"XMLHTTP REQ ("+_+") [attempt "+S+"]: "+u+`
`+h+`
`+$})}function ay(a,u,h,_,S,k,$){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+S+"]: "+u+`
`+h+`
`+k+" "+$})}function pr(a,u,h,_){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+ly(a,h)+(_?" "+_:"")})}function cy(a,u){a.info(function(){return"TIMEOUT: "+u})}Ii.prototype.info=function(){};function ly(a,u){if(!a.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(a=0;a<h.length;a++)if(Array.isArray(h[a])){var _=h[a];if(!(2>_.length)){var S=_[1];if(Array.isArray(S)&&!(1>S.length)){var k=S[0];if(k!="noop"&&k!="stop"&&k!="close")for(var $=1;$<S.length;$++)S[$]=""}}}}return ec(h)}catch{return u}}var Ms={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},od={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ic;function Fs(){}C(Fs,tc),Fs.prototype.g=function(){return new XMLHttpRequest},Fs.prototype.i=function(){return{}},ic=new Fs;function Wt(a,u,h,_){this.j=a,this.i=u,this.l=h,this.R=_||1,this.U=new gi(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ad}function ad(){this.i=null,this.g="",this.h=!1}var cd={},sc={};function oc(a,u,h){a.L=1,a.v=js(Dt(u)),a.m=h,a.P=!0,ld(a,null)}function ld(a,u){a.F=Date.now(),Us(a),a.A=Dt(a.v);var h=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),Td(h.i,"t",_),a.C=0,h=a.j.J,a.h=new ad,a.g=$d(a.j,h?u:null,!a.m),0<a.O&&(a.M=new ry(w(a.Y,a,a.g),a.O)),u=a.U,h=a.g,_=a.ca;var S="readystatechange";Array.isArray(S)||(S&&(Xu[0]=S.toString()),S=Xu);for(var k=0;k<S.length;k++){var $=Sn(h,S[k],_||u.handleEvent,!1,u.h||u);if(!$)break;u.g[$.key]=$}u=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),yi(),oy(a.i,a.u,a.A,a.l,a.R,a.m)}Wt.prototype.ca=function(a){a=a.target;const u=this.M;u&&Nt(a)==3?u.j():this.Y(a)},Wt.prototype.Y=function(a){try{if(a==this.g)e:{const Be=Nt(this.g);var u=this.g.Ba();const _r=this.g.Z();if(!(3>Be)&&(Be!=3||this.g&&(this.h.h||this.g.oa()||kd(this.g)))){this.J||Be!=4||u==7||(u==8||0>=_r?yi(3):yi(2)),ac(this);var h=this.g.Z();this.X=h;t:if(ud(this)){var _=kd(this.g);a="";var S=_.length,k=Nt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Cn(this),wi(this);var $="";break t}this.h.i=new c.TextDecoder}for(u=0;u<S;u++)this.h.h=!0,a+=this.h.i.decode(_[u],{stream:!(k&&u==S-1)});_.length=0,this.h.g+=a,this.C=0,$=this.h.g}else $=this.g.oa();if(this.o=h==200,ay(this.i,this.u,this.A,this.l,this.R,Be,h),this.o){if(this.T&&!this.K){t:{if(this.g){var me,Le=this.g;if((me=Le.g?Le.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!V(me)){var le=me;break t}}le=null}if(h=le)pr(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,cc(this,h);else{this.o=!1,this.s=3,Ke(12),Cn(this),wi(this);break e}}if(this.P){h=!0;let dt;for(;!this.J&&this.C<$.length;)if(dt=uy(this,$),dt==sc){Be==4&&(this.s=4,Ke(14),h=!1),pr(this.i,this.l,null,"[Incomplete Response]");break}else if(dt==cd){this.s=4,Ke(15),pr(this.i,this.l,$,"[Invalid Chunk]"),h=!1;break}else pr(this.i,this.l,dt,null),cc(this,dt);if(ud(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Be!=4||$.length!=0||this.h.h||(this.s=1,Ke(16),h=!1),this.o=this.o&&h,!h)pr(this.i,this.l,$,"[Invalid Chunked Response]"),Cn(this),wi(this);else if(0<$.length&&!this.W){this.W=!0;var Ue=this.j;Ue.g==this&&Ue.ba&&!Ue.M&&(Ue.j.info("Great, no buffering proxy detected. Bytes received: "+$.length),pc(Ue),Ue.M=!0,Ke(11))}}else pr(this.i,this.l,$,null),cc(this,$);Be==4&&Cn(this),this.o&&!this.J&&(Be==4?Md(this.j,this):(this.o=!1,Us(this)))}else Sy(this.g),h==400&&0<$.indexOf("Unknown SID")?(this.s=3,Ke(12)):(this.s=0,Ke(13)),Cn(this),wi(this)}}}catch{}finally{}};function ud(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function uy(a,u){var h=a.C,_=u.indexOf(`
`,h);return _==-1?sc:(h=Number(u.substring(h,_)),isNaN(h)?cd:(_+=1,_+h>u.length?sc:(u=u.slice(_,_+h),a.C=_+h,u)))}Wt.prototype.cancel=function(){this.J=!0,Cn(this)};function Us(a){a.S=Date.now()+a.I,dd(a,a.I)}function dd(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=vi(w(a.ba,a),u)}function ac(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Wt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(cy(this.i,this.A),this.L!=2&&(yi(),Ke(17)),Cn(this),this.s=2,wi(this)):dd(this,this.S-a)};function wi(a){a.j.G==0||a.J||Md(a.j,a)}function Cn(a){ac(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,Zu(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function cc(a,u){try{var h=a.j;if(h.G!=0&&(h.g==a||lc(h.h,a))){if(!a.K&&lc(h.h,a)&&h.G==3){try{var _=h.Da.g.parse(u)}catch{_=null}if(Array.isArray(_)&&_.length==3){var S=_;if(S[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<a.F)Ws(h),Ks(h);else break e;fc(h),Ke(18)}}else h.za=S[1],0<h.za-h.T&&37500>S[2]&&h.F&&h.v==0&&!h.C&&(h.C=vi(w(h.Za,h),6e3));if(1>=pd(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Dn(h,11)}else if((a.K||h.g==a)&&Ws(h),!V(u))for(S=h.Da.g.parse(u),u=0;u<S.length;u++){let le=S[u];if(h.T=le[0],le=le[1],h.G==2)if(le[0]=="c"){h.K=le[1],h.ia=le[2];const Ue=le[3];Ue!=null&&(h.la=Ue,h.j.info("VER="+h.la));const Be=le[4];Be!=null&&(h.Aa=Be,h.j.info("SVER="+h.Aa));const _r=le[5];_r!=null&&typeof _r=="number"&&0<_r&&(_=1.5*_r,h.L=_,h.j.info("backChannelRequestTimeoutMs_="+_)),_=h;const dt=a.g;if(dt){const Ys=dt.g?dt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ys){var k=_.h;k.g||Ys.indexOf("spdy")==-1&&Ys.indexOf("quic")==-1&&Ys.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(uc(k,k.h),k.h=null))}if(_.D){const mc=dt.g?dt.g.getResponseHeader("X-HTTP-Session-Id"):null;mc&&(_.ya=mc,ge(_.I,_.D,mc))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-a.F,h.j.info("Handshake RTT: "+h.R+"ms")),_=h;var $=a;if(_.qa=Bd(_,_.J?_.ia:null,_.W),$.K){md(_.h,$);var me=$,Le=_.L;Le&&(me.I=Le),me.B&&(ac(me),Us(me)),_.g=$}else Od(_);0<h.i.length&&Hs(h)}else le[0]!="stop"&&le[0]!="close"||Dn(h,7);else h.G==3&&(le[0]=="stop"||le[0]=="close"?le[0]=="stop"?Dn(h,7):hc(h):le[0]!="noop"&&h.l&&h.l.ta(le),h.v=0)}}yi(4)}catch{}}var dy=class{constructor(a,u){this.g=a,this.map=u}};function hd(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function fd(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function pd(a){return a.h?1:a.g?a.g.size:0}function lc(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function uc(a,u){a.g?a.g.add(u):a.h=u}function md(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}hd.prototype.cancel=function(){if(this.i=gd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function gd(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const h of a.g.values())u=u.concat(h.D);return u}return D(a.i)}function hy(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var u=[],h=a.length,_=0;_<h;_++)u.push(a[_]);return u}u=[],h=0;for(_ in a)u[h++]=a[_];return u}function fy(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var u=[];a=a.length;for(var h=0;h<a;h++)u.push(h);return u}u=[],h=0;for(const _ in a)u[h++]=_;return u}}}function _d(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var h=fy(a),_=hy(a),S=_.length,k=0;k<S;k++)u.call(void 0,_[k],h&&h[k],a)}var yd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function py(a,u){if(a){a=a.split("&");for(var h=0;h<a.length;h++){var _=a[h].indexOf("="),S=null;if(0<=_){var k=a[h].substring(0,_);S=a[h].substring(_+1)}else k=a[h];u(k,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function kn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof kn){this.h=a.h,Bs(this,a.j),this.o=a.o,this.g=a.g,$s(this,a.s),this.l=a.l;var u=a.i,h=new bi;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),vd(this,h),this.m=a.m}else a&&(u=String(a).match(yd))?(this.h=!1,Bs(this,u[1]||"",!0),this.o=Ei(u[2]||""),this.g=Ei(u[3]||"",!0),$s(this,u[4]),this.l=Ei(u[5]||"",!0),vd(this,u[6]||"",!0),this.m=Ei(u[7]||"")):(this.h=!1,this.i=new bi(null,this.h))}kn.prototype.toString=function(){var a=[],u=this.j;u&&a.push(Ti(u,Id,!0),":");var h=this.g;return(h||u=="file")&&(a.push("//"),(u=this.o)&&a.push(Ti(u,Id,!0),"@"),a.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&a.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&a.push("/"),a.push(Ti(h,h.charAt(0)=="/"?_y:gy,!0))),(h=this.i.toString())&&a.push("?",h),(h=this.m)&&a.push("#",Ti(h,vy)),a.join("")};function Dt(a){return new kn(a)}function Bs(a,u,h){a.j=h?Ei(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function $s(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function vd(a,u,h){u instanceof bi?(a.i=u,Iy(a.i,a.h)):(h||(u=Ti(u,yy)),a.i=new bi(u,a.h))}function ge(a,u,h){a.i.set(u,h)}function js(a){return ge(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ei(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ti(a,u,h){return typeof a=="string"?(a=encodeURI(a).replace(u,my),h&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function my(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Id=/[#\/\?@]/g,gy=/[#\?:]/g,_y=/[#\?]/g,yy=/[#\?@]/g,vy=/#/g;function bi(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Qt(a){a.g||(a.g=new Map,a.h=0,a.i&&py(a.i,function(u,h){a.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=bi.prototype,n.add=function(a,u){Qt(this),this.i=null,a=mr(this,a);var h=this.g.get(a);return h||this.g.set(a,h=[]),h.push(u),this.h+=1,this};function wd(a,u){Qt(a),u=mr(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function Ed(a,u){return Qt(a),u=mr(a,u),a.g.has(u)}n.forEach=function(a,u){Qt(this),this.g.forEach(function(h,_){h.forEach(function(S){a.call(u,S,_,this)},this)},this)},n.na=function(){Qt(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let _=0;_<u.length;_++){const S=a[_];for(let k=0;k<S.length;k++)h.push(u[_])}return h},n.V=function(a){Qt(this);let u=[];if(typeof a=="string")Ed(this,a)&&(u=u.concat(this.g.get(mr(this,a))));else{a=Array.from(this.g.values());for(let h=0;h<a.length;h++)u=u.concat(a[h])}return u},n.set=function(a,u){return Qt(this),this.i=null,a=mr(this,a),Ed(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function Td(a,u,h){wd(a,u),0<h.length&&(a.i=null,a.g.set(mr(a,u),D(h)),a.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var _=u[h];const k=encodeURIComponent(String(_)),$=this.V(_);for(_=0;_<$.length;_++){var S=k;$[_]!==""&&(S+="="+encodeURIComponent(String($[_]))),a.push(S)}}return this.i=a.join("&")};function mr(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function Iy(a,u){u&&!a.j&&(Qt(a),a.i=null,a.g.forEach(function(h,_){var S=_.toLowerCase();_!=S&&(wd(this,_),Td(this,S,h))},a)),a.j=u}function wy(a,u){const h=new Ii;if(c.Image){const _=new Image;_.onload=A(Yt,h,"TestLoadImage: loaded",!0,u,_),_.onerror=A(Yt,h,"TestLoadImage: error",!1,u,_),_.onabort=A(Yt,h,"TestLoadImage: abort",!1,u,_),_.ontimeout=A(Yt,h,"TestLoadImage: timeout",!1,u,_),c.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else u(!1)}function Ey(a,u){const h=new Ii,_=new AbortController,S=setTimeout(()=>{_.abort(),Yt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:_.signal}).then(k=>{clearTimeout(S),k.ok?Yt(h,"TestPingServer: ok",!0,u):Yt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(S),Yt(h,"TestPingServer: error",!1,u)})}function Yt(a,u,h,_,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),_(h)}catch{}}function Ty(){this.g=new sy}function by(a,u,h){const _=h||"";try{_d(a,function(S,k){let $=S;d(S)&&($=ec(S)),u.push(_+k+"="+encodeURIComponent($))})}catch(S){throw u.push(_+"type="+encodeURIComponent("_badmap")),S}}function qs(a){this.l=a.Ub||null,this.j=a.eb||!1}C(qs,tc),qs.prototype.g=function(){return new zs(this.l,this.j)},qs.prototype.i=function(a){return function(){return a}}({});function zs(a,u){Fe.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(zs,Fe),n=zs.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,Ri(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ai(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ri(this)),this.g&&(this.readyState=3,Ri(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;bd(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function bd(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?Ai(this):Ri(this),this.readyState==3&&bd(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ai(this))},n.Qa=function(a){this.g&&(this.response=a,Ai(this))},n.ga=function(){this.g&&Ai(this)};function Ai(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ri(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,a.push(h[0]+": "+h[1]),h=u.next();return a.join(`\r
`)};function Ri(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(zs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Ad(a){let u="";return F(a,function(h,_){u+=_,u+=":",u+=h,u+=`\r
`}),u}function dc(a,u,h){e:{for(_ in h){var _=!1;break e}_=!0}_||(h=Ad(h),typeof a=="string"?h!=null&&encodeURIComponent(String(h)):ge(a,u,h))}function Ee(a){Fe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(Ee,Fe);var Ay=/^https?$/i,Ry=["POST","PUT"];n=Ee.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,h,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ic.g(),this.v=this.o?ed(this.o):ed(ic),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(k){Rd(this,k);return}if(a=h||"",h=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var S in _)h.set(S,_[S]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const k of _.keys())h.set(k,_.get(k));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(h.keys()).find(k=>k.toLowerCase()=="content-type"),S=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Ry,u,void 0))||_||S||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,$]of h)this.g.setRequestHeader(k,$);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Cd(this),this.u=!0,this.g.send(a),this.u=!1}catch(k){Rd(this,k)}};function Rd(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,Sd(a),Gs(a)}function Sd(a){a.A||(a.A=!0,Ge(a,"complete"),Ge(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ge(this,"complete"),Ge(this,"abort"),Gs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Gs(this,!0)),Ee.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Pd(this):this.bb())},n.bb=function(){Pd(this)};function Pd(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Nt(a)!=4||a.Z()!=2)){if(a.u&&Nt(a)==4)Yu(a.Ea,0,a);else if(Ge(a,"readystatechange"),Nt(a)==4){a.h=!1;try{const $=a.Z();e:switch($){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var _;if(_=$===0){var S=String(a.D).match(yd)[1]||null;!S&&c.self&&c.self.location&&(S=c.self.location.protocol.slice(0,-1)),_=!Ay.test(S?S.toLowerCase():"")}h=_}if(h)Ge(a,"complete"),Ge(a,"success");else{a.m=6;try{var k=2<Nt(a)?a.g.statusText:""}catch{k=""}a.l=k+" ["+a.Z()+"]",Sd(a)}}finally{Gs(a)}}}}function Gs(a,u){if(a.g){Cd(a);const h=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||Ge(a,"ready");try{h.onreadystatechange=_}catch{}}}function Cd(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Nt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Nt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),iy(u)}};function kd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Sy(a){const u={};a=(a.g&&2<=Nt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(V(a[_]))continue;var h=T(a[_]);const S=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const k=u[S]||[];u[S]=k,k.push(h)}v(u,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Si(a,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[a]||u}function Dd(a){this.Aa=0,this.i=[],this.j=new Ii,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Si("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Si("baseRetryDelayMs",5e3,a),this.cb=Si("retryDelaySeedMs",1e4,a),this.Wa=Si("forwardChannelMaxRetries",2,a),this.wa=Si("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new hd(a&&a.concurrentRequestLimit),this.Da=new Ty,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Dd.prototype,n.la=8,n.G=1,n.connect=function(a,u,h,_){Ke(0),this.W=a,this.H=u||{},h&&_!==void 0&&(this.H.OSID=h,this.H.OAID=_),this.F=this.X,this.I=Bd(this,null,this.W),Hs(this)};function hc(a){if(Nd(a),a.G==3){var u=a.U++,h=Dt(a.I);if(ge(h,"SID",a.K),ge(h,"RID",u),ge(h,"TYPE","terminate"),Pi(a,h),u=new Wt(a,a.j,u),u.L=2,u.v=js(Dt(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=u.v,h=!0),h||(u.g=$d(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Us(u)}Ud(a)}function Ks(a){a.g&&(pc(a),a.g.cancel(),a.g=null)}function Nd(a){Ks(a),a.u&&(c.clearTimeout(a.u),a.u=null),Ws(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function Hs(a){if(!fd(a.h)&&!a.s){a.s=!0;var u=a.Ga;tt||dr(),Ct||(tt(),Ct=!0),kt.add(u,a),a.B=0}}function Py(a,u){return pd(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=vi(w(a.Ga,a,u),Fd(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const S=new Wt(this,this.j,a);let k=this.o;if(this.S&&(k?(k=y(k),I(k,this.S)):k=this.S),this.m!==null||this.O||(S.H=k,k=null),this.P)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var _=this.i[h];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(u+=_,4096<u){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=Vd(this,S,u),h=Dt(this.I),ge(h,"RID",a),ge(h,"CVER",22),this.D&&ge(h,"X-HTTP-Session-Id",this.D),Pi(this,h),k&&(this.O?u="headers="+encodeURIComponent(String(Ad(k)))+"&"+u:this.m&&dc(h,this.m,k)),uc(this.h,S),this.Ua&&ge(h,"TYPE","init"),this.P?(ge(h,"$req",u),ge(h,"SID","null"),S.T=!0,oc(S,h,null)):oc(S,h,u),this.G=2}}else this.G==3&&(a?xd(this,a):this.i.length==0||fd(this.h)||xd(this))};function xd(a,u){var h;u?h=u.l:h=a.U++;const _=Dt(a.I);ge(_,"SID",a.K),ge(_,"RID",h),ge(_,"AID",a.T),Pi(a,_),a.m&&a.o&&dc(_,a.m,a.o),h=new Wt(a,a.j,h,a.B+1),a.m===null&&(h.H=a.o),u&&(a.i=u.D.concat(a.i)),u=Vd(a,h,1e3),h.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),uc(a.h,h),oc(h,_,u)}function Pi(a,u){a.H&&F(a.H,function(h,_){ge(u,_,h)}),a.l&&_d({},function(h,_){ge(u,_,h)})}function Vd(a,u,h){h=Math.min(a.i.length,h);var _=a.l?w(a.l.Na,a.l,a):null;e:{var S=a.i;let k=-1;for(;;){const $=["count="+h];k==-1?0<h?(k=S[0].g,$.push("ofs="+k)):k=0:$.push("ofs="+k);let me=!0;for(let Le=0;Le<h;Le++){let le=S[Le].g;const Ue=S[Le].map;if(le-=k,0>le)k=Math.max(0,S[Le].g-100),me=!1;else try{by(Ue,$,"req"+le+"_")}catch{_&&_(Ue)}}if(me){_=$.join("&");break e}}}return a=a.i.splice(0,h),u.D=a,_}function Od(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;tt||dr(),Ct||(tt(),Ct=!0),kt.add(u,a),a.v=0}}function fc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=vi(w(a.Fa,a),Fd(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Ld(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=vi(w(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ke(10),Ks(this),Ld(this))};function pc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Ld(a){a.g=new Wt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=Dt(a.qa);ge(u,"RID","rpc"),ge(u,"SID",a.K),ge(u,"AID",a.T),ge(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&ge(u,"TO",a.ja),ge(u,"TYPE","xmlhttp"),Pi(a,u),a.m&&a.o&&dc(u,a.m,a.o),a.L&&(a.g.I=a.L);var h=a.g;a=a.ia,h.L=1,h.v=js(Dt(u)),h.m=null,h.P=!0,ld(h,a)}n.Za=function(){this.C!=null&&(this.C=null,Ks(this),fc(this),Ke(19))};function Ws(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Md(a,u){var h=null;if(a.g==u){Ws(a),pc(a),a.g=null;var _=2}else if(lc(a.h,u))h=u.D,md(a.h,u),_=1;else return;if(a.G!=0){if(u.o)if(_==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var S=a.B;_=Ls(),Ge(_,new sd(_,h)),Hs(a)}else Od(a);else if(S=u.s,S==3||S==0&&0<u.X||!(_==1&&Py(a,u)||_==2&&fc(a)))switch(h&&0<h.length&&(u=a.h,u.i=u.i.concat(h)),S){case 1:Dn(a,5);break;case 4:Dn(a,10);break;case 3:Dn(a,6);break;default:Dn(a,2)}}}function Fd(a,u){let h=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(h*=2),h*u}function Dn(a,u){if(a.j.info("Error code "+u),u==2){var h=w(a.fb,a),_=a.Xa;const S=!_;_=new kn(_||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Bs(_,"https"),js(_),S?wy(_.toString(),h):Ey(_.toString(),h)}else Ke(2);a.G=0,a.l&&a.l.sa(u),Ud(a),Nd(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ke(2)):(this.j.info("Failed to ping google.com"),Ke(1))};function Ud(a){if(a.G=0,a.ka=[],a.l){const u=gd(a.h);(u.length!=0||a.i.length!=0)&&(P(a.ka,u),P(a.ka,a.i),a.h.i.length=0,D(a.i),a.i.length=0),a.l.ra()}}function Bd(a,u,h){var _=h instanceof kn?Dt(h):new kn(h);if(_.g!="")u&&(_.g=u+"."+_.g),$s(_,_.s);else{var S=c.location;_=S.protocol,u=u?u+"."+S.hostname:S.hostname,S=+S.port;var k=new kn(null);_&&Bs(k,_),u&&(k.g=u),S&&$s(k,S),h&&(k.l=h),_=k}return h=a.D,u=a.ya,h&&u&&ge(_,h,u),ge(_,"VER",a.la),Pi(a,_),_}function $d(a,u,h){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new Ee(new qs({eb:h})):new Ee(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function jd(){}n=jd.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Qs(){}Qs.prototype.g=function(a,u){return new nt(a,u)};function nt(a,u){Fe.call(this),this.g=new Dd(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!V(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!V(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new gr(this)}C(nt,Fe),nt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},nt.prototype.close=function(){hc(this.g)},nt.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var h={};h.__data__=a,a=h}else this.u&&(h={},h.__data__=ec(a),a=h);u.i.push(new dy(u.Ya++,a)),u.G==3&&Hs(u)},nt.prototype.N=function(){this.g.l=null,delete this.j,hc(this.g),delete this.g,nt.aa.N.call(this)};function qd(a){nc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const h in u){a=h;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}C(qd,nc);function zd(){rc.call(this),this.status=1}C(zd,rc);function gr(a){this.g=a}C(gr,jd),gr.prototype.ua=function(){Ge(this.g,"a")},gr.prototype.ta=function(a){Ge(this.g,new qd(a))},gr.prototype.sa=function(a){Ge(this.g,new zd)},gr.prototype.ra=function(){Ge(this.g,"b")},Qs.prototype.createWebChannel=Qs.prototype.g,nt.prototype.send=nt.prototype.o,nt.prototype.open=nt.prototype.m,nt.prototype.close=nt.prototype.close,lm=function(){return new Qs},cm=function(){return Ls()},am=Pn,qc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ms.NO_ERROR=0,Ms.TIMEOUT=8,Ms.HTTP_ERROR=6,go=Ms,od.COMPLETE="complete",om=od,td.EventType=_i,_i.OPEN="a",_i.CLOSE="b",_i.ERROR="c",_i.MESSAGE="d",Fe.prototype.listen=Fe.prototype.K,Li=td,Ee.prototype.listenOnce=Ee.prototype.L,Ee.prototype.getLastError=Ee.prototype.Ka,Ee.prototype.getLastErrorCode=Ee.prototype.Ba,Ee.prototype.getStatus=Ee.prototype.Z,Ee.prototype.getResponseJson=Ee.prototype.Oa,Ee.prototype.getResponseText=Ee.prototype.oa,Ee.prototype.send=Ee.prototype.ea,Ee.prototype.setWithCredentials=Ee.prototype.Ha,sm=Ee}).apply(typeof Xs<"u"?Xs:typeof self<"u"?self:typeof window<"u"?window:{});const Eh="@firebase/firestore",Th="4.7.7";/**
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
 */class He{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}He.UNAUTHENTICATED=new He(null),He.GOOGLE_CREDENTIALS=new He("google-credentials-uid"),He.FIRST_PARTY=new He("first-party-uid"),He.MOCK_USER=new He("mock-user");/**
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
 */let ui="11.3.0";/**
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
 */const Yn=new ha("@firebase/firestore");function br(){return Yn.logLevel}function M(n,...e){if(Yn.logLevel<=se.DEBUG){const t=e.map(Ll);Yn.debug(`Firestore (${ui}): ${n}`,...t)}}function We(n,...e){if(Yn.logLevel<=se.ERROR){const t=e.map(Ll);Yn.error(`Firestore (${ui}): ${n}`,...t)}}function ts(n,...e){if(Yn.logLevel<=se.WARN){const t=e.map(Ll);Yn.warn(`Firestore (${ui}): ${n}`,...t)}}function Ll(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function K(n="Unexpected state"){const e=`FIRESTORE (${ui}) INTERNAL ASSERTION FAILED: `+n;throw We(e),new Error(e)}function W(n,e){n||K()}function Z(n,e){return n}/**
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
 */const N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends St{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class wt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class AE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class RE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(He.UNAUTHENTICATED))}shutdown(){}}class SE{constructor(e){this.t=e,this.currentUser=He.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){W(this.o===void 0);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new wt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new wt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new wt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(W(typeof r.accessToken=="string"),new AE(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return W(e===null||typeof e=="string"),new He(e)}}class PE{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=He.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class CE{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new PE(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(He.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class bh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class kE{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,at(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){W(this.o===void 0);const r=s=>{s.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,M("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new bh(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(W(typeof t.token=="string"),this.R=t.token,new bh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function zc(){return new TextEncoder}/**
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
 */class um{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=DE(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function X(n,e){return n<e?-1:n>e?1:0}function Gc(n,e){const t=zc().encode(n),r=zc().encode(e);for(let i=0;i<Math.min(t.length,r.length);i++){const s=X(t[i],r[i]);if(s!==0)return s}return X(t.length,r.length)}function $r(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function dm(n){return n+"\0"}/**
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
 */const Ah=-62135596800,Rh=1e6;class we{static now(){return we.fromMillis(Date.now())}static fromDate(e){return we.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Rh);return new we(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Ah)throw new U(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Rh}_compareTo(e){return this.seconds===e.seconds?X(this.nanoseconds,e.nanoseconds):X(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-Ah;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class Q{static fromTimestamp(e){return new Q(e)}static min(){return new Q(new we(0,0))}static max(){return new Q(new we(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Sh="__name__";class gt{constructor(e,t,r){t===void 0?t=0:t>e.length&&K(),r===void 0?r=e.length-t:r>e.length-t&&K(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return gt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof gt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=gt.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return X(e.length,t.length)}static compareSegments(e,t){const r=gt.isNumericId(e),i=gt.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?gt.extractNumericId(e).compare(gt.extractNumericId(t)):Gc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return fn.fromString(e.substring(4,e.length-2))}}class ue extends gt{construct(e,t,r){return new ue(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(N.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new ue(t)}static emptyPath(){return new ue([])}}const NE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ie extends gt{construct(e,t,r){return new Ie(e,t,r)}static isValidIdentifier(e){return NE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ie.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Sh}static keyField(){return new Ie([Sh])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new U(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new U(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new U(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new U(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ie(t)}static emptyPath(){return new Ie([])}}/**
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
 */class z{constructor(e){this.path=e}static fromPath(e){return new z(ue.fromString(e))}static fromName(e){return new z(ue.fromString(e).popFirst(5))}static empty(){return new z(ue.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ue.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ue.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new z(new ue(e.slice()))}}/**
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
 */const ns=-1;class Lo{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function Kc(n){return n.fields.find(e=>e.kind===2)}function On(n){return n.fields.filter(e=>e.kind!==2)}Lo.UNKNOWN_ID=-1;class _o{constructor(e,t){this.fieldPath=e,this.kind=t}}class rs{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new rs(0,st.min())}}function xE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=Q.fromTimestamp(r===1e9?new we(t+1,0):new we(t,r));return new st(i,z.empty(),e)}function hm(n){return new st(n.readTime,n.key,ns)}class st{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new st(Q.min(),z.empty(),ns)}static max(){return new st(Q.max(),z.empty(),ns)}}function Ml(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=z.comparator(n.documentKey,e.documentKey),t!==0?t:X(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class pm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function cr(n){if(n.code!==N.FAILED_PRECONDITION||n.message!==fm)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
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
 */const rt="SimpleDb";class _a{static open(e,t,r,i){try{return new _a(t,e.transaction(i,r))}catch(s){throw new qi(t,s)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new wt,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new qi(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const i=Fl(r.target.error);this.m.reject(new qi(e,i))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(M(rt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new OE(t)}}class pn{static delete(e){return M(rt,"Removing database:",e),Mn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!da())return!1;if(pn.v())return!0;const e=Ne(),t=pn.C(e),r=0<t&&t<10,i=mm(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,pn.C(Ne())===12.2&&We("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(M(rt,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new qi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new U(N.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new U(N.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new qi(e,o))},i.onupgradeneeded=s=>{M(rt,'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.O.B(o,i.transaction,s.oldVersion,this.version).next(()=>{M(rt,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.N(e);const c=_a.open(this.db,e,s?"readonly":"readwrite",r),l=i(c).next(d=>(c.S(),d)).catch(d=>(c.abort(d),R.reject(d))).toPromise();return l.catch(()=>{}),await c.p,l}catch(c){const l=c,d=l.name!=="FirebaseError"&&o<3;if(M(rt,"Transaction failed with error:",l.message,"Retrying:",d),this.close(),!d)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function mm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class VE{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return Mn(this.q.delete())}}class qi extends U{constructor(e,t){super(N.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Tn(n){return n.name==="IndexedDbTransactionError"}class OE{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(M(rt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(M(rt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Mn(r)}add(e){return M(rt,"ADD",this.store.name,e,e),Mn(this.store.add(e))}get(e){return Mn(this.store.get(e)).next(t=>(t===void 0&&(t=null),M(rt,"GET",this.store.name,e,t),t))}delete(e){return M(rt,"DELETE",this.store.name,e),Mn(this.store.delete(e))}count(){return M(rt,"COUNT",this.store.name),Mn(this.store.count())}G(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new R((o,c)=>{s.onerror=l=>{c(l.target.error)},s.onsuccess=l=>{o(l.target.result)}})}{const s=this.cursor(r),o=[];return this.j(s,(c,l)=>{o.push(l)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new R((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}J(e,t){M(rt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const i=this.cursor(r);return this.j(i,(s,o,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.j(i,t)}X(e){const t=this.cursor({});return new R((r,i)=>{t.onerror=s=>{const o=Fl(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}j(e,t){const r=[];return new R((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void i();const l=new VE(c),d=t(c.primaryKey,c.value,l);if(d instanceof R){const p=d.catch(g=>(l.done(),R.reject(g)));r.push(p)}l.isDone?i():l.K===null?c.continue():c.continue(l.K)}}).next(()=>R.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Mn(n){return new R((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=Fl(r.target.error);t(i)}})}let Ph=!1;function Fl(n){const e=pn.C(Ne());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new U("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Ph||(Ph=!0,setTimeout(()=>{throw r},0)),r}}return n}const zi="IndexBackfiller";class LE{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){M(zi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();M(zi,`Documents written: ${t}`)}catch(t){Tn(t)?M(zi,"Ignoring IndexedDB error during index backfill: ",t):await cr(t)}await this.te(6e4)})}}class ME{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let i=t,s=!0;return R.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return M(zi,`Processing collection: ${o}`),this.ie(e,o,i).next(c=>{i-=c,r.add(o)});s=!1})).next(()=>t-i)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.se(i,s)).next(c=>(M(zi,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}se(e,t){let r=e;return t.changes.forEach((i,s)=>{const o=hm(s);Ml(o,r)>0&&(r=o)}),new st(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class ct{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}ct.ae=-1;/**
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
 */const Gn=-1;function ya(n){return n==null}function is(n){return n===0&&1/n==-1/0}function FE(n){return typeof n=="number"&&Number.isInteger(n)&&!is(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Mo="";function ze(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Ch(e)),e=UE(n.get(t),e);return Ch(e)}function UE(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case Mo:t+="";break;default:t+=s}}return t}function Ch(n){return n+Mo+""}function _t(n){const e=n.length;if(W(e>=2),e===2)return W(n.charAt(0)===Mo&&n.charAt(1)===""),ue.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf(Mo,s);switch((o<0||o>t)&&K(),n.charAt(o+1)){case"":const c=n.substring(s,o);let l;i.length===0?l=c:(i+=c,l=i,i=""),r.push(l);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:K()}s=o+2}return new ue(r)}/**
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
 */const Ln="remoteDocuments",bs="owner",yr="owner",ss="mutationQueues",BE="userId",ht="mutations",kh="batchId",$n="userMutationsIndex",Dh=["userId","batchId"];/**
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
 */function yo(n,e){return[n,ze(e)]}function gm(n,e,t){return[n,ze(e),t]}const $E={},jr="documentMutations",Fo="remoteDocumentsV14",jE=["prefixPath","collectionGroup","readTime","documentId"],vo="documentKeyIndex",qE=["prefixPath","collectionGroup","documentId"],_m="collectionGroupIndex",zE=["collectionGroup","readTime","prefixPath","documentId"],os="remoteDocumentGlobal",Hc="remoteDocumentGlobalKey",qr="targets",ym="queryTargetsIndex",GE=["canonicalId","targetId"],zr="targetDocuments",KE=["targetId","path"],Ul="documentTargetsIndex",HE=["path","targetId"],Uo="targetGlobalKey",Kn="targetGlobal",as="collectionParents",WE=["collectionId","parent"],Gr="clientMetadata",QE="clientId",va="bundles",YE="bundleId",Ia="namedQueries",JE="name",Bl="indexConfiguration",XE="indexId",Wc="collectionGroupIndex",ZE="collectionGroup",Bo="indexState",eT=["indexId","uid"],vm="sequenceNumberIndex",tT=["uid","sequenceNumber"],$o="indexEntries",nT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Im="documentKeyIndex",rT=["indexId","uid","orderedDocumentKey"],wa="documentOverlays",iT=["userId","collectionPath","documentId"],Qc="collectionPathOverlayIndex",sT=["userId","collectionPath","largestBatchId"],wm="collectionGroupOverlayIndex",oT=["userId","collectionGroup","largestBatchId"],$l="globals",aT="name",Em=[ss,ht,jr,Ln,qr,bs,Kn,zr,Gr,os,as,va,Ia],cT=[...Em,wa],Tm=[ss,ht,jr,Fo,qr,bs,Kn,zr,Gr,os,as,va,Ia,wa],bm=Tm,jl=[...bm,Bl,Bo,$o],lT=jl,uT=[...jl,$l];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc extends pm{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function xe(n,e){const t=Z(n);return pn.M(t.ue,e)}/**
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
 */function Nh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function bn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Am(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class ve{constructor(e,t){this.comparator=e,this.root=t||Me.EMPTY}insert(e,t){return new ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Me.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Me.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Zs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Zs(this.root,e,this.comparator,!1)}getReverseIterator(){return new Zs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Zs(this.root,e,this.comparator,!0)}}class Zs{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Me{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Me.RED,this.left=i??Me.EMPTY,this.right=s??Me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Me(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Me.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw K();const e=this.left.check();if(e!==this.right.check())throw K();return e+(this.isRed()?0:1)}}Me.EMPTY=null,Me.RED=!0,Me.BLACK=!1;Me.EMPTY=new class{constructor(){this.size=0}get key(){throw K()}get value(){throw K()}get color(){throw K()}get left(){throw K()}get right(){throw K()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Me(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class pe{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new xh(this.data.getIterator())}getIteratorFrom(e){return new xh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof pe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new pe(this.comparator);return t.data=e,t}}class xh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function vr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.fields=e,e.sort(Ie.comparator)}static empty(){return new Je([])}unionWith(e){let t=new pe(Ie.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return $r(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Rm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Rm("Invalid base64 string: "+s):s}}(e);return new Pe(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Pe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return X(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Pe.EMPTY_BYTE_STRING=new Pe("");const dT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function $t(n){if(W(!!n),typeof n=="string"){let e=0;const t=dT.exec(n);if(W(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ye(n.seconds),nanos:ye(n.nanos)}}function ye(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function jt(n){return typeof n=="string"?Pe.fromBase64String(n):Pe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sm="server_timestamp",Pm="__type__",Cm="__previous_value__",km="__local_write_time__";function Ea(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Pm])===null||t===void 0?void 0:t.stringValue)===Sm}function Ta(n){const e=n.mapValue.fields[Cm];return Ea(e)?Ta(e):e}function cs(n){const e=$t(n.mapValue.fields[km].timestampValue);return new we(e.seconds,e.nanos)}/**
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
 */class hT{constructor(e,t,r,i,s,o,c,l,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d}}const jo="(default)";class Jn{constructor(e,t){this.projectId=e,this.database=t||jo}static empty(){return new Jn("","")}get isDefaultDatabase(){return this.database===jo}isEqual(e){return e instanceof Jn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ql="__type__",Dm="__max__",ln={mapValue:{fields:{__type__:{stringValue:Dm}}}},zl="__vector__",Kr="value",Io={nullValue:"NULL_VALUE"};function _n(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ea(n)?4:Nm(n)?9007199254740991:ba(n)?10:11:K()}function bt(n,e){if(n===e)return!0;const t=_n(n);if(t!==_n(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return cs(n).isEqual(cs(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=$t(i.timestampValue),c=$t(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return jt(i.bytesValue).isEqual(jt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ye(i.geoPointValue.latitude)===ye(s.geoPointValue.latitude)&&ye(i.geoPointValue.longitude)===ye(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ye(i.integerValue)===ye(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=ye(i.doubleValue),c=ye(s.doubleValue);return o===c?is(o)===is(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return $r(n.arrayValue.values||[],e.arrayValue.values||[],bt);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Nh(o)!==Nh(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!bt(o[l],c[l])))return!1;return!0}(n,e);default:return K()}}function ls(n,e){return(n.values||[]).find(t=>bt(t,e))!==void 0}function yn(n,e){if(n===e)return 0;const t=_n(n),r=_n(e);if(t!==r)return X(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return X(n.booleanValue,e.booleanValue);case 2:return function(s,o){const c=ye(s.integerValue||s.doubleValue),l=ye(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Vh(n.timestampValue,e.timestampValue);case 4:return Vh(cs(n),cs(e));case 5:return Gc(n.stringValue,e.stringValue);case 6:return function(s,o){const c=jt(s),l=jt(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),l=o.split("/");for(let d=0;d<c.length&&d<l.length;d++){const p=X(c[d],l[d]);if(p!==0)return p}return X(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const c=X(ye(s.latitude),ye(o.latitude));return c!==0?c:X(ye(s.longitude),ye(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Oh(n.arrayValue,e.arrayValue);case 10:return function(s,o){var c,l,d,p;const g=s.fields||{},w=o.fields||{},A=(c=g[Kr])===null||c===void 0?void 0:c.arrayValue,C=(l=w[Kr])===null||l===void 0?void 0:l.arrayValue,D=X(((d=A?.values)===null||d===void 0?void 0:d.length)||0,((p=C?.values)===null||p===void 0?void 0:p.length)||0);return D!==0?D:Oh(A,C)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===ln.mapValue&&o===ln.mapValue)return 0;if(s===ln.mapValue)return 1;if(o===ln.mapValue)return-1;const c=s.fields||{},l=Object.keys(c),d=o.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let g=0;g<l.length&&g<p.length;++g){const w=Gc(l[g],p[g]);if(w!==0)return w;const A=yn(c[l[g]],d[p[g]]);if(A!==0)return A}return X(l.length,p.length)}(n.mapValue,e.mapValue);default:throw K()}}function Vh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return X(n,e);const t=$t(n),r=$t(e),i=X(t.seconds,r.seconds);return i!==0?i:X(t.nanos,r.nanos)}function Oh(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=yn(t[i],r[i]);if(s)return s}return X(t.length,r.length)}function Hr(n){return Jc(n)}function Jc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=$t(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return jt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return z.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Jc(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Jc(t.fields[o])}`;return i+"}"}(n.mapValue):K()}function wo(n){switch(_n(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ta(n);return e?16+wo(e):16;case 5:return 2*n.stringValue.length;case 6:return jt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+wo(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return bn(r.fields,(s,o)=>{i+=s.length+wo(o)}),i}(n.mapValue);default:throw K()}}function Xn(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Xc(n){return!!n&&"integerValue"in n}function us(n){return!!n&&"arrayValue"in n}function Lh(n){return!!n&&"nullValue"in n}function Mh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Eo(n){return!!n&&"mapValue"in n}function ba(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[ql])===null||t===void 0?void 0:t.stringValue)===zl}function Gi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return bn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Gi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Gi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Nm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Dm}const xm={mapValue:{fields:{[ql]:{stringValue:zl},[Kr]:{arrayValue:{}}}}};function fT(n){return"nullValue"in n?Io:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Xn(Jn.empty(),z.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ba(n)?xm:{mapValue:{}}:K()}function pT(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Xn(Jn.empty(),z.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?xm:"mapValue"in n?ba(n)?{mapValue:{}}:ln:K()}function Fh(n,e){const t=yn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Uh(n,e){const t=yn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
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
 */class qe{constructor(e){this.value=e}static empty(){return new qe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Eo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Gi(t)}setAll(e){let t=Ie.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=Gi(o):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());Eo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return bt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Eo(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){bn(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new qe(Gi(this.value))}}function Vm(n){const e=[];return bn(n.fields,(t,r)=>{const i=new Ie([t]);if(Eo(r)){const s=Vm(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Je(e)}/**
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
 */class be{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new be(e,0,Q.min(),Q.min(),Q.min(),qe.empty(),0)}static newFoundDocument(e,t,r,i){return new be(e,1,t,Q.min(),r,i,0)}static newNoDocument(e,t){return new be(e,2,t,Q.min(),Q.min(),qe.empty(),0)}static newUnknownDocument(e,t){return new be(e,3,t,Q.min(),Q.min(),qe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=qe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=qe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof be&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new be(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class vn{constructor(e,t){this.position=e,this.inclusive=t}}function Bh(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=z.comparator(z.fromName(o.referenceValue),t.key):r=yn(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function $h(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!bt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class ds{constructor(e,t="asc"){this.field=e,this.dir=t}}function mT(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Om{}class oe extends Om{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new gT(e,t,r):t==="array-contains"?new vT(e,r):t==="in"?new $m(e,r):t==="not-in"?new IT(e,r):t==="array-contains-any"?new wT(e,r):new oe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new _T(e,r):new yT(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(yn(t,this.value)):t!==null&&_n(this.value)===_n(t)&&this.matchesComparison(yn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class fe extends Om{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new fe(e,t)}matches(e){return Wr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function Wr(n){return n.op==="and"}function Zc(n){return n.op==="or"}function Gl(n){return Lm(n)&&Wr(n)}function Lm(n){for(const e of n.filters)if(e instanceof fe)return!1;return!0}function el(n){if(n instanceof oe)return n.field.canonicalString()+n.op.toString()+Hr(n.value);if(Gl(n))return n.filters.map(e=>el(e)).join(",");{const e=n.filters.map(t=>el(t)).join(",");return`${n.op}(${e})`}}function Mm(n,e){return n instanceof oe?function(r,i){return i instanceof oe&&r.op===i.op&&r.field.isEqual(i.field)&&bt(r.value,i.value)}(n,e):n instanceof fe?function(r,i){return i instanceof fe&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&Mm(o,i.filters[c]),!0):!1}(n,e):void K()}function Fm(n,e){const t=n.filters.concat(e);return fe.create(t,n.op)}function Um(n){return n instanceof oe?function(t){return`${t.field.canonicalString()} ${t.op} ${Hr(t.value)}`}(n):n instanceof fe?function(t){return t.op.toString()+" {"+t.getFilters().map(Um).join(" ,")+"}"}(n):"Filter"}class gT extends oe{constructor(e,t,r){super(e,t,r),this.key=z.fromName(r.referenceValue)}matches(e){const t=z.comparator(e.key,this.key);return this.matchesComparison(t)}}class _T extends oe{constructor(e,t){super(e,"in",t),this.keys=Bm("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class yT extends oe{constructor(e,t){super(e,"not-in",t),this.keys=Bm("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Bm(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>z.fromName(r.referenceValue))}class vT extends oe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return us(t)&&ls(t.arrayValue,this.value)}}class $m extends oe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ls(this.value.arrayValue,t)}}class IT extends oe{constructor(e,t){super(e,"not-in",t)}matches(e){if(ls(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!ls(this.value.arrayValue,t)}}class wT extends oe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!us(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>ls(this.value.arrayValue,r))}}/**
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
 */class ET{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.le=null}}function tl(n,e=null,t=[],r=[],i=null,s=null,o=null){return new ET(n,e,t,r,i,s,o)}function Zn(n){const e=Z(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>el(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),ya(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Hr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Hr(r)).join(",")),e.le=t}return e.le}function As(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!mT(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Mm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!$h(n.startAt,e.startAt)&&$h(n.endAt,e.endAt)}function qo(n){return z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function zo(n,e){return n.filters.filter(t=>t instanceof oe&&t.field.isEqual(e))}function jh(n,e,t){let r=Io,i=!0;for(const s of zo(n,e)){let o=Io,c=!0;switch(s.op){case"<":case"<=":o=fT(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=Io}Fh({value:r,inclusive:i},{value:o,inclusive:c})<0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];Fh({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function qh(n,e,t){let r=ln,i=!0;for(const s of zo(n,e)){let o=ln,c=!0;switch(s.op){case">=":case">":o=pT(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=ln}Uh({value:r,inclusive:i},{value:o,inclusive:c})>0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];Uh({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
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
 */class lr{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=l,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function TT(n,e,t,r,i,s,o,c){return new lr(n,e,t,r,i,s,o,c)}function Rs(n){return new lr(n)}function zh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Kl(n){return n.collectionGroup!==null}function Vr(n){const e=Z(n);if(e.he===null){e.he=[];const t=new Set;for(const s of e.explicitOrderBy)e.he.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new pe(Ie.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.he.push(new ds(s,r))}),t.has(Ie.keyField().canonicalString())||e.he.push(new ds(Ie.keyField(),r))}return e.he}function lt(n){const e=Z(n);return e.Pe||(e.Pe=bT(e,Vr(n))),e.Pe}function bT(n,e){if(n.limitType==="F")return tl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new ds(i.field,s)});const t=n.endAt?new vn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new vn(n.startAt.position,n.startAt.inclusive):null;return tl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function nl(n,e){const t=n.filters.concat([e]);return new lr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Go(n,e,t){return new lr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Aa(n,e){return As(lt(n),lt(e))&&n.limitType===e.limitType}function jm(n){return`${Zn(lt(n))}|lt:${n.limitType}`}function Ar(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Um(i)).join(", ")}]`),ya(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Hr(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Hr(i)).join(",")),`Target(${r})`}(lt(n))}; limitType=${n.limitType})`}function Ss(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):z.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Vr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,l){const d=Bh(o,c,l);return o.inclusive?d<=0:d<0}(r.startAt,Vr(r),i)||r.endAt&&!function(o,c,l){const d=Bh(o,c,l);return o.inclusive?d>=0:d>0}(r.endAt,Vr(r),i))}(n,e)}function AT(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function qm(n){return(e,t)=>{let r=!1;for(const i of Vr(n)){const s=RT(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function RT(n,e,t){const r=n.field.isKeyField()?z.comparator(e.key,t.key):function(s,o,c){const l=o.data.field(s),d=c.data.field(s);return l!==null&&d!==null?yn(l,d):K()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return K()}}/**
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
 */class zt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){bn(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return Am(this.inner)}size(){return this.innerSize}}/**
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
 */const ST=new ve(z.comparator);function it(){return ST}const zm=new ve(z.comparator);function Mi(...n){let e=zm;for(const t of n)e=e.insert(t.key,t);return e}function Gm(n){let e=zm;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function yt(){return Ki()}function Km(){return Ki()}function Ki(){return new zt(n=>n.toString(),(n,e)=>n.isEqual(e))}const PT=new ve(z.comparator),CT=new pe(z.comparator);function ie(...n){let e=CT;for(const t of n)e=e.add(t);return e}const kT=new pe(X);function DT(){return kT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:is(e)?"-0":e}}function Hm(n){return{integerValue:""+n}}function Wm(n,e){return FE(e)?Hm(e):Hl(n,e)}/**
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
 */class Ra{constructor(){this._=void 0}}function NT(n,e,t){return n instanceof hs?function(i,s){const o={fields:{[Pm]:{stringValue:Sm},[km]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Ea(s)&&(s=Ta(s)),s&&(o.fields[Cm]=s),{mapValue:o}}(t,e):n instanceof Qr?Ym(n,e):n instanceof Yr?Jm(n,e):function(i,s){const o=Qm(i,s),c=Gh(o)+Gh(i.Ie);return Xc(o)&&Xc(i.Ie)?Hm(c):Hl(i.serializer,c)}(n,e)}function xT(n,e,t){return n instanceof Qr?Ym(n,e):n instanceof Yr?Jm(n,e):t}function Qm(n,e){return n instanceof Jr?function(r){return Xc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class hs extends Ra{}class Qr extends Ra{constructor(e){super(),this.elements=e}}function Ym(n,e){const t=Xm(e);for(const r of n.elements)t.some(i=>bt(i,r))||t.push(r);return{arrayValue:{values:t}}}class Yr extends Ra{constructor(e){super(),this.elements=e}}function Jm(n,e){let t=Xm(e);for(const r of n.elements)t=t.filter(i=>!bt(i,r));return{arrayValue:{values:t}}}class Jr extends Ra{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Gh(n){return ye(n.integerValue||n.doubleValue)}function Xm(n){return us(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Zm{constructor(e,t){this.field=e,this.transform=t}}function VT(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Qr&&i instanceof Qr||r instanceof Yr&&i instanceof Yr?$r(r.elements,i.elements,bt):r instanceof Jr&&i instanceof Jr?bt(r.Ie,i.Ie):r instanceof hs&&i instanceof hs}(n.transform,e.transform)}class OT{constructor(e,t){this.version=e,this.transformResults=t}}class Xe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Xe}static exists(e){return new Xe(void 0,e)}static updateTime(e){return new Xe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function To(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Sa{}function eg(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Wl(n.key,Xe.none()):new di(n.key,n.data,Xe.none());{const t=n.data,r=qe.empty();let i=new pe(Ie.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Gt(n.key,r,new Je(i.toArray()),Xe.none())}}function LT(n,e,t){n instanceof di?function(i,s,o){const c=i.value.clone(),l=Hh(i.fieldTransforms,s,o.transformResults);c.setAll(l),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Gt?function(i,s,o){if(!To(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=Hh(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(tg(i)),l.setAll(c),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Hi(n,e,t,r){return n instanceof di?function(s,o,c,l){if(!To(s.precondition,o))return c;const d=s.value.clone(),p=Wh(s.fieldTransforms,l,o);return d.setAll(p),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Gt?function(s,o,c,l){if(!To(s.precondition,o))return c;const d=Wh(s.fieldTransforms,l,o),p=o.data;return p.setAll(tg(s)),p.setAll(d),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(s,o,c){return To(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function MT(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=Qm(r.transform,i||null);s!=null&&(t===null&&(t=qe.empty()),t.set(r.field,s))}return t||null}function Kh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&$r(r,i,(s,o)=>VT(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class di extends Sa{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Gt extends Sa{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function tg(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Hh(n,e,t){const r=new Map;W(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,xT(o,c,t[i]))}return r}function Wh(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,NT(s,o,e))}return r}class Wl extends Sa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ng extends Sa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Ql{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&LT(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Hi(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Hi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Km();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const l=eg(o,c);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(Q.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ie())}isEqual(e){return this.batchId===e.batchId&&$r(this.mutations,e.mutations,(t,r)=>Kh(t,r))&&$r(this.baseMutations,e.baseMutations,(t,r)=>Kh(t,r))}}class Yl{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){W(e.mutations.length===r.length);let i=function(){return PT}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Yl(e,t,r,i)}}/**
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
 */class Jl{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class FT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Se,ce;function UT(n){switch(n){case N.OK:return K();case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0;default:return K()}}function rg(n){if(n===void 0)return We("GRPC error has no .code"),N.UNKNOWN;switch(n){case Se.OK:return N.OK;case Se.CANCELLED:return N.CANCELLED;case Se.UNKNOWN:return N.UNKNOWN;case Se.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case Se.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case Se.INTERNAL:return N.INTERNAL;case Se.UNAVAILABLE:return N.UNAVAILABLE;case Se.UNAUTHENTICATED:return N.UNAUTHENTICATED;case Se.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case Se.NOT_FOUND:return N.NOT_FOUND;case Se.ALREADY_EXISTS:return N.ALREADY_EXISTS;case Se.PERMISSION_DENIED:return N.PERMISSION_DENIED;case Se.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case Se.ABORTED:return N.ABORTED;case Se.OUT_OF_RANGE:return N.OUT_OF_RANGE;case Se.UNIMPLEMENTED:return N.UNIMPLEMENTED;case Se.DATA_LOSS:return N.DATA_LOSS;default:return K()}}(ce=Se||(Se={}))[ce.OK=0]="OK",ce[ce.CANCELLED=1]="CANCELLED",ce[ce.UNKNOWN=2]="UNKNOWN",ce[ce.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ce[ce.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ce[ce.NOT_FOUND=5]="NOT_FOUND",ce[ce.ALREADY_EXISTS=6]="ALREADY_EXISTS",ce[ce.PERMISSION_DENIED=7]="PERMISSION_DENIED",ce[ce.UNAUTHENTICATED=16]="UNAUTHENTICATED",ce[ce.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ce[ce.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ce[ce.ABORTED=10]="ABORTED",ce[ce.OUT_OF_RANGE=11]="OUT_OF_RANGE",ce[ce.UNIMPLEMENTED=12]="UNIMPLEMENTED",ce[ce.INTERNAL=13]="INTERNAL",ce[ce.UNAVAILABLE=14]="UNAVAILABLE",ce[ce.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const BT=new fn([4294967295,4294967295],0);function Qh(n){const e=zc().encode(n),t=new im;return t.update(e),new Uint8Array(t.digest())}function Yh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new fn([t,r],0),new fn([i,s],0)]}class Xl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Fi(`Invalid padding: ${t}`);if(r<0)throw new Fi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Fi(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Fi(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=fn.fromNumber(this.Ee)}Ae(e,t,r){let i=e.add(t.multiply(fn.fromNumber(r)));return i.compare(BT)===1&&(i=new fn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=Qh(e),[r,i]=Yh(t);for(let s=0;s<this.hashCount;s++){const o=this.Ae(r,i,s);if(!this.Re(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Xl(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ee===0)return;const t=Qh(e),[r,i]=Yh(t);for(let s=0;s<this.hashCount;s++){const o=this.Ae(r,i,s);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Fi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Pa{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Ps.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Pa(Q.min(),i,new ve(X),it(),ie())}}class Ps{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ps(r,t,ie(),ie(),ie())}}/**
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
 */class bo{constructor(e,t,r,i){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=i}}class ig{constructor(e,t){this.targetId=e,this.ge=t}}class sg{constructor(e,t,r=Pe.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Jh{constructor(){this.pe=0,this.ye=Xh(),this.we=Pe.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=ie(),t=ie(),r=ie();return this.ye.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:K()}}),new Ps(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=Xh()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,W(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class $T{constructor(e){this.ke=e,this.qe=new Map,this.Qe=it(),this.$e=eo(),this.Ue=eo(),this.Ke=new ve(X)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:K()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,i)=>{this.Je(i)&&t(i)})}Ze(e){const t=e.targetId,r=e.ge.count,i=this.Xe(t);if(i){const s=i.target;if(qo(s))if(r===0){const o=new z(s.path);this.ze(t,o,be.newNoDocument(o,Q.min()))}else W(r===1);else{const o=this.et(t);if(o!==r){const c=this.tt(e),l=c?this.nt(c,e,o):1;if(l!==0){this.Ye(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=jt(r).toUint8Array()}catch(l){if(l instanceof Rm)return ts("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Xl(o,i,s)}catch(l){return ts(l instanceof Fi?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.ke.it(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,s,null),i++)}),i}ot(e){const t=new Map;this.qe.forEach((s,o)=>{const c=this.Xe(o);if(c){if(s.current&&qo(c.target)){const l=new z(c.target.path);this._t(l).has(o)||this.ut(o,l)||this.ze(o,l,be.newNoDocument(l,e))}s.ve&&(t.set(o,s.Fe()),s.Me())}});let r=ie();this.Ue.forEach((s,o)=>{let c=!0;o.forEachWhile(l=>{const d=this.Xe(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.Qe.forEach((s,o)=>o.setReadTime(e));const i=new Pa(e,t,this.Ke,this.Qe,r);return this.Qe=it(),this.$e=eo(),this.Ue=eo(),this.Ke=new ve(X),i}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const i=this.He(e);this.ut(e,t)?i.xe(t,1):i.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new Jh,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new pe(X),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new pe(X),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||M("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new Jh),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function eo(){return new ve(z.comparator)}function Xh(){return new ve(z.comparator)}const jT={asc:"ASCENDING",desc:"DESCENDING"},qT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},zT={and:"AND",or:"OR"};class GT{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function rl(n,e){return n.useProto3Json||ya(e)?e:{value:e}}function Xr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function og(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function KT(n,e){return Xr(n,e.toTimestamp())}function Qe(n){return W(!!n),Q.fromTimestamp(function(t){const r=$t(t);return new we(r.seconds,r.nanos)}(n))}function Zl(n,e){return il(n,e).canonicalString()}function il(n,e){const t=function(i){return new ue(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function ag(n){const e=ue.fromString(n);return W(gg(e)),e}function Ko(n,e){return Zl(n.databaseId,e.path)}function Hn(n,e){const t=ag(e);if(t.get(1)!==n.databaseId.projectId)throw new U(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new z(ug(t))}function cg(n,e){return Zl(n.databaseId,e)}function lg(n){const e=ag(n);return e.length===4?ue.emptyPath():ug(e)}function sl(n){return new ue(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ug(n){return W(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Zh(n,e,t){return{name:Ko(n,e),fields:t.value.mapValue.fields}}function HT(n,e,t){const r=Hn(n,e.name),i=Qe(e.updateTime),s=e.createTime?Qe(e.createTime):Q.min(),o=new qe({mapValue:{fields:e.fields}}),c=be.newFoundDocument(r,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function WT(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:K()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,p){return d.useProto3Json?(W(p===void 0||typeof p=="string"),Pe.fromBase64String(p||"")):(W(p===void 0||p instanceof Buffer||p instanceof Uint8Array),Pe.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(d){const p=d.code===void 0?N.UNKNOWN:rg(d.code);return new U(p,d.message||"")}(o);t=new sg(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Hn(n,r.document.name),s=Qe(r.document.updateTime),o=r.document.createTime?Qe(r.document.createTime):Q.min(),c=new qe({mapValue:{fields:r.document.fields}}),l=be.newFoundDocument(i,s,o,c),d=r.targetIds||[],p=r.removedTargetIds||[];t=new bo(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Hn(n,r.document),s=r.readTime?Qe(r.readTime):Q.min(),o=be.newNoDocument(i,s),c=r.removedTargetIds||[];t=new bo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Hn(n,r.document),s=r.removedTargetIds||[];t=new bo([],s,i,null)}else{if(!("filter"in e))return K();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new FT(i,s),c=r.targetId;t=new ig(c,o)}}return t}function Ho(n,e){let t;if(e instanceof di)t={update:Zh(n,e.key,e.value)};else if(e instanceof Wl)t={delete:Ko(n,e.key)};else if(e instanceof Gt)t={update:Zh(n,e.key,e.data),updateMask:eb(e.fieldMask)};else{if(!(e instanceof ng))return K();t={verify:Ko(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const c=o.transform;if(c instanceof hs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Qr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Yr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Jr)return{fieldPath:o.field.canonicalString(),increment:c.Ie};throw K()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:KT(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:K()}(n,e.precondition)),t}function ol(n,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?Xe.updateTime(Qe(s.updateTime)):s.exists!==void 0?Xe.exists(s.exists):Xe.none()}(e.currentDocument):Xe.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let l=null;if("setToServerValue"in c)W(c.setToServerValue==="REQUEST_TIME"),l=new hs;else if("appendMissingElements"in c){const p=c.appendMissingElements.values||[];l=new Qr(p)}else if("removeAllFromArray"in c){const p=c.removeAllFromArray.values||[];l=new Yr(p)}else"increment"in c?l=new Jr(o,c.increment):K();const d=Ie.fromServerFormat(c.fieldPath);return new Zm(d,l)}(n,i)):[];if(e.update){e.update.name;const i=Hn(n,e.update.name),s=new qe({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const d=l.fieldPaths||[];return new Je(d.map(p=>Ie.fromServerFormat(p)))}(e.updateMask);return new Gt(i,s,o,t,r)}return new di(i,s,t,r)}if(e.delete){const i=Hn(n,e.delete);return new Wl(i,t)}if(e.verify){const i=Hn(n,e.verify);return new ng(i,t)}return K()}function QT(n,e){return n&&n.length>0?(W(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?Qe(i.updateTime):Qe(s);return o.isEqual(Q.min())&&(o=Qe(s)),new OT(o,i.transformResults||[])}(t,e))):[]}function dg(n,e){return{documents:[cg(n,e.path)]}}function hg(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=cg(n,i);const s=function(d){if(d.length!==0)return mg(fe.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(d){if(d.length!==0)return d.map(p=>function(w){return{field:Rr(w.field),direction:JT(w.dir)}}(p))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=rl(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ht:t,parent:i}}function fg(n){let e=lg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){W(r===1);const p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(g){const w=pg(g);return w instanceof fe&&Gl(w)?w.getFilters():[w]}(t.where));let o=[];t.orderBy&&(o=function(g){return g.map(w=>function(C){return new ds(Sr(C.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(w))}(t.orderBy));let c=null;t.limit&&(c=function(g){let w;return w=typeof g=="object"?g.value:g,ya(w)?null:w}(t.limit));let l=null;t.startAt&&(l=function(g){const w=!!g.before,A=g.values||[];return new vn(A,w)}(t.startAt));let d=null;return t.endAt&&(d=function(g){const w=!g.before,A=g.values||[];return new vn(A,w)}(t.endAt)),TT(e,i,o,s,c,"F",l,d)}function YT(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return K()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function pg(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Sr(t.unaryFilter.field);return oe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Sr(t.unaryFilter.field);return oe.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Sr(t.unaryFilter.field);return oe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Sr(t.unaryFilter.field);return oe.create(o,"!=",{nullValue:"NULL_VALUE"});default:return K()}}(n):n.fieldFilter!==void 0?function(t){return oe.create(Sr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return K()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return fe.create(t.compositeFilter.filters.map(r=>pg(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return K()}}(t.compositeFilter.op))}(n):K()}function JT(n){return jT[n]}function XT(n){return qT[n]}function ZT(n){return zT[n]}function Rr(n){return{fieldPath:n.canonicalString()}}function Sr(n){return Ie.fromServerFormat(n.fieldPath)}function mg(n){return n instanceof oe?function(t){if(t.op==="=="){if(Mh(t.value))return{unaryFilter:{field:Rr(t.field),op:"IS_NAN"}};if(Lh(t.value))return{unaryFilter:{field:Rr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Mh(t.value))return{unaryFilter:{field:Rr(t.field),op:"IS_NOT_NAN"}};if(Lh(t.value))return{unaryFilter:{field:Rr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Rr(t.field),op:XT(t.op),value:t.value}}}(n):n instanceof fe?function(t){const r=t.getFilters().map(i=>mg(i));return r.length===1?r[0]:{compositeFilter:{op:ZT(t.op),filters:r}}}(n):K()}function eb(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function gg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Mt{constructor(e,t,r,i,s=Q.min(),o=Q.min(),c=Pe.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Mt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Mt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Mt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Mt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class _g{constructor(e){this.Tt=e}}function tb(n,e){let t;if(e.document)t=HT(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=z.fromSegments(e.noDocument.path),i=tr(e.noDocument.readTime);t=be.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return K();{const r=z.fromSegments(e.unknownDocument.path),i=tr(e.unknownDocument.version);t=be.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){const s=new we(i[0],i[1]);return Q.fromTimestamp(s)}(e.readTime)),t}function ef(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Wo(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:Ko(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Xr(s,o.version.toTimestamp()),createTime:Xr(s,o.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:er(e.version)};else{if(!e.isUnknownDocument())return K();r.unknownDocument={path:t.path.toArray(),version:er(e.version)}}return r}function Wo(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function er(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function tr(n){const e=new we(n.seconds,n.nanoseconds);return Q.fromTimestamp(e)}function Fn(n,e){const t=(e.baseMutations||[]).map(s=>ol(n.Tt,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>ol(n.Tt,s)),i=we.fromMillis(e.localWriteTimeMs);return new Ql(e.batchId,i,t,r)}function Ui(n){const e=tr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?tr(n.lastLimboFreeSnapshotVersion):Q.min();let r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){return W(s.documents.length===1),lt(Rs(lg(s.documents[0])))}(n.query):function(s){return lt(fg(s))}(n.query),new Mt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Pe.fromBase64String(n.resumeToken))}function yg(n,e){const t=er(e.snapshotVersion),r=er(e.lastLimboFreeSnapshotVersion);let i;i=qo(e.target)?dg(n.Tt,e.target):hg(n.Tt,e.target).ht;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Zn(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function vg(n){const e=fg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Go(e,e.limit,"L"):e}function Tc(n,e){return new Jl(e.largestBatchId,ol(n.Tt,e.overlayMutation))}function tf(n,e){const t=e.path.lastSegment();return[n,ze(e.path.popLast()),t]}function nf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:er(r.readTime),documentKey:ze(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nb{getBundleMetadata(e,t){return rf(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:tr(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return rf(e).put(function(i){return{bundleId:i.id,createTime:er(Qe(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return sf(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:vg(s.bundledQuery),readTime:tr(s.readTime)}}(r)})}saveNamedQuery(e,t){return sf(e).put(function(i){return{name:i.name,readTime:er(Qe(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function rf(n){return xe(n,va)}function sf(n){return xe(n,Ia)}/**
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
 */class Ca{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new Ca(e,r)}getOverlay(e,t){return Ci(e).get(tf(this.userId,t)).next(r=>r?Tc(this.serializer,r):null)}getOverlays(e,t){const r=yt();return R.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){const i=[];return r.forEach((s,o)=>{const c=new Jl(t,o);i.push(this.Et(e,c))}),R.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach(o=>i.add(ze(o.getCollectionPath())));const s=[];return i.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Ci(e).J(Qc,c))}),R.waitFor(s)}getOverlaysForCollection(e,t,r){const i=yt(),s=ze(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Ci(e).G(Qc,o).next(c=>{for(const l of c){const d=Tc(this.serializer,l);i.set(d.getKey(),d)}return i})}getOverlaysForCollectionGroup(e,t,r,i){const s=yt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Ci(e).Z({index:wm,range:c},(l,d,p)=>{const g=Tc(this.serializer,d);s.size()<i||g.largestBatchId===o?(s.set(g.getKey(),g),o=g.largestBatchId):p.done()}).next(()=>s)}Et(e,t){return Ci(e).put(function(i,s,o){const[c,l,d]=tf(s,o.mutation.key);return{userId:s,collectionPath:l,documentId:d,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ho(i.Tt,o.mutation)}}(this.serializer,this.userId,t))}}function Ci(n){return xe(n,wa)}/**
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
 */class rb{dt(e){return xe(e,$l)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?Pe.fromUint8Array(r):Pe.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class Un{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(ye(e.integerValue));else if("doubleValue"in e){const r=ye(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),is(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=$t(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(jt(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?Nm(e)?this.ft(t,Number.MAX_SAFE_INTEGER):ba(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):K()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const i of Object.keys(r))this.wt(i,t),this.Rt(r[i],t)}vt(e,t){var r,i;const s=e.fields||{};this.ft(t,53);const o=Kr,c=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.ft(t,15),t.gt(ye(c)),this.wt(o,t),this.Rt(s[o],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const i of r)this.Rt(i,t)}Dt(e,t){this.ft(t,37),z.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}Un.xt=new Un;/**
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
 */const Ir=255;function ib(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function of(n){const e=64-function(r){let i=0;for(let s=0;s<8;++s){const o=ib(255&r[s]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}class sb{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const i=t.codePointAt(0);this.Nt(240|i>>>18),this.Nt(128|63&i>>>12),this.Nt(128|63&i>>>6),this.Nt(128|63&i)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const i=t.codePointAt(0);this.kt(240|i>>>18),this.kt(128|63&i>>>12),this.kt(128|63&i>>>6),this.kt(128|63&i)}}this.qt()}Ut(e){const t=this.Kt(e),r=of(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Gt(e){const t=this.Kt(e),r=of(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}zt(){this.jt(Ir),this.jt(255)}Ht(){this.Jt(Ir),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===Ir?(this.jt(Ir),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===Ir?(this.Jt(Ir),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class ob{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class ab{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class ki{constructor(){this.Zt=new sb,this.Xt=new ob(this.Zt),this.en=new ab(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
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
 */class Bn{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new Bn(this.indexId,this.documentKey,this.arrayValue,r)}}function Xt(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=af(n.arrayValue,e.arrayValue),t!==0?t:(t=af(n.directionalValue,e.directionalValue),t!==0?t:z.comparator(n.documentKey,e.documentKey)))}function af(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class cf{constructor(e){this.rn=new pe((t,r)=>Ie.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(W(e.collectionGroup===this.collectionId),this.an)return!1;const t=Kc(e);if(t!==void 0&&!this.cn(t))return!1;const r=On(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.cn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!i.has(c.field.canonicalString())){const l=r[s];if(!this.ln(c,l)||!this.hn(this.sn[o++],l))return!1}++s}for(;s<r.length;++s){const c=r[s];if(o>=this.sn.length||!this.hn(this.sn[o++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new pe(Ie.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new _o(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new _o(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new _o(r.field,r.dir==="asc"?0:1)));return new Lo(Lo.UNKNOWN_ID,this.collectionId,t,rs.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function Ig(n){var e,t;if(W(n instanceof oe||n instanceof fe),n instanceof oe){if(n instanceof $m){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>oe.create(n.field,"==",s)))||[];return fe.create(i,"or")}return n}const r=n.filters.map(i=>Ig(i));return fe.create(r,n.op)}function cb(n){if(n.getFilters().length===0)return[];const e=ll(Ig(n));return W(wg(e)),al(e)||cl(e)?[e]:e.getFilters()}function al(n){return n instanceof oe}function cl(n){return n instanceof fe&&Gl(n)}function wg(n){return al(n)||cl(n)||function(t){if(t instanceof fe&&Zc(t)){for(const r of t.getFilters())if(!al(r)&&!cl(r))return!1;return!0}return!1}(n)}function ll(n){if(W(n instanceof oe||n instanceof fe),n instanceof oe)return n;if(n.filters.length===1)return ll(n.filters[0]);const e=n.filters.map(r=>ll(r));let t=fe.create(e,n.op);return t=Qo(t),wg(t)?t:(W(t instanceof fe),W(Wr(t)),W(t.filters.length>1),t.filters.reduce((r,i)=>eu(r,i)))}function eu(n,e){let t;return W(n instanceof oe||n instanceof fe),W(e instanceof oe||e instanceof fe),t=n instanceof oe?e instanceof oe?function(i,s){return fe.create([i,s],"and")}(n,e):lf(n,e):e instanceof oe?lf(e,n):function(i,s){if(W(i.filters.length>0&&s.filters.length>0),Wr(i)&&Wr(s))return Fm(i,s.getFilters());const o=Zc(i)?i:s,c=Zc(i)?s:i,l=o.filters.map(d=>eu(d,c));return fe.create(l,"or")}(n,e),Qo(t)}function lf(n,e){if(Wr(e))return Fm(e,n.getFilters());{const t=e.filters.map(r=>eu(n,r));return fe.create(t,"or")}}function Qo(n){if(W(n instanceof oe||n instanceof fe),n instanceof oe)return n;const e=n.getFilters();if(e.length===1)return Qo(e[0]);if(Lm(n))return n;const t=e.map(i=>Qo(i)),r=[];return t.forEach(i=>{i instanceof oe?r.push(i):i instanceof fe&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:fe.create(r,n.op)}/**
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
 */class lb{constructor(){this.Tn=new tu}addToCollectionParentIndex(e,t){return this.Tn.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(st.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(st.min())}updateCollectionGroup(e,t,r){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class tu{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new pe(ue.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new pe(ue.comparator)).toArray()}}/**
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
 */const uf="IndexedDbIndexManager",to=new Uint8Array(0);class ub{constructor(e,t){this.databaseId=t,this.In=new tu,this.En=new zt(r=>Zn(r),(r,i)=>As(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const s={collectionId:r,parent:ze(i)};return df(e).put(s)}return R.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[dm(t),""],!1,!0);return df(e).G(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;r.push(_t(o.parent))}return r})}addFieldIndex(e,t){const r=Di(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=Er(e);return s.next(c=>{o.put(nf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const r=Di(e),i=Er(e),s=wr(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Di(e),r=wr(e),i=Er(e);return t.J().next(()=>r.J()).next(()=>i.J())}createTargetIndexes(e,t){return R.forEach(this.dn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){const s=new cf(r).Pn();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const r=wr(e);let i=!0;const s=new Map;return R.forEach(this.dn(t),o=>this.An(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=ie();const c=[];return R.forEach(s,(l,d)=>{M(uf,`Using index ${function(L){return`id=${L.indexId}|cg=${L.collectionGroup}|f=${L.fields.map(j=>`${j.fieldPath}:${j.kind}`).join(",")}`}(l)} to execute ${Zn(t)}`);const p=function(L,j){const x=Kc(j);if(x===void 0)return null;for(const F of zo(L,x.fieldPath))switch(F.op){case"array-contains-any":return F.value.arrayValue.values||[];case"array-contains":return[F.value]}return null}(d,l),g=function(L,j){const x=new Map;for(const F of On(j))for(const v of zo(L,F.fieldPath))switch(v.op){case"==":case"in":x.set(F.fieldPath.canonicalString(),v.value);break;case"not-in":case"!=":return x.set(F.fieldPath.canonicalString(),v.value),Array.from(x.values())}return null}(d,l),w=function(L,j){const x=[];let F=!0;for(const v of On(j)){const y=v.kind===0?jh(L,v.fieldPath,L.startAt):qh(L,v.fieldPath,L.startAt);x.push(y.value),F&&(F=y.inclusive)}return new vn(x,F)}(d,l),A=function(L,j){const x=[];let F=!0;for(const v of On(j)){const y=v.kind===0?qh(L,v.fieldPath,L.endAt):jh(L,v.fieldPath,L.endAt);x.push(y.value),F&&(F=y.inclusive)}return new vn(x,F)}(d,l),C=this.Rn(l,d,w),D=this.Rn(l,d,A),P=this.Vn(l,d,g),q=this.mn(l.indexId,p,C,w.inclusive,D,A.inclusive,P);return R.forEach(q,V=>r.H(V,t.limit).next(L=>{L.forEach(j=>{const x=z.fromSegments(j.documentKey);o.has(x)||(o=o.add(x),c.push(x))})}))}).next(()=>c)}return R.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=cb(fe.create(e.filters,"and")).map(r=>tl(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,i,s,o,c){const l=(t!=null?t.length:1)*Math.max(r.length,s.length),d=l/(t!=null?t.length:1),p=[];for(let g=0;g<l;++g){const w=t?this.fn(t[g/d]):to,A=this.gn(e,w,r[g%d],i),C=this.pn(e,w,s[g%d],o),D=c.map(P=>this.gn(e,w,P,!0));p.push(...this.createRange(A,C,D))}return p}gn(e,t,r,i){const s=new Bn(e,z.empty(),t,r);return i?s:s.nn()}pn(e,t,r,i){const s=new Bn(e,z.empty(),t,r);return i?s.nn():s}An(e,t){const r=new cf(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const c of s)r.un(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const i=this.dn(t);return R.forEach(i,s=>this.An(e,s).next(o=>{o?r!==0&&o.fields.length<function(l){let d=new pe(Ie.comparator),p=!1;for(const g of l.filters)for(const w of g.getFlattenedFilters())w.field.isKeyField()||(w.op==="array-contains"||w.op==="array-contains-any"?p=!0:d=d.add(w.field));for(const g of l.orderBy)g.field.isKeyField()||(d=d.add(g.field));return d.size+(p?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&r===2?1:r)}yn(e,t){const r=new ki;for(const i of On(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.tn(i.kind);Un.xt.At(s,o)}return r.Yt()}fn(e){const t=new ki;return Un.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new ki;return Un.xt.At(Xn(this.databaseId,t),r.tn(function(s){const o=On(s);return o.length===0?0:o[o.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let i=[];i.push(new ki);let s=0;for(const o of On(e)){const c=r[s++];for(const l of i)if(this.Sn(t,o.fieldPath)&&us(c))i=this.bn(i,o,c);else{const d=l.tn(o.kind);Un.xt.At(c,d)}}return this.Dn(i)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const c of i){const l=new ki;l.seed(c.Yt()),Un.xt.At(o,l.tn(t.kind)),s.push(l)}return s}Sn(e,t){return!!e.filters.find(r=>r instanceof oe&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=Di(e),i=Er(e);return(t?r.G(Wc,IDBKeyRange.bound(t,t)):r.G()).next(s=>{const o=[];return R.forEach(s,c=>i.get([c.indexId,this.uid]).next(l=>{o.push(function(p,g){const w=g?new rs(g.sequenceNumber,new st(tr(g.readTime),new z(_t(g.documentKey)),g.largestBatchId)):rs.empty(),A=p.fields.map(([C,D])=>new _o(Ie.fromServerFormat(C),D));return new Lo(p.indexId,p.collectionGroup,A,w)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:X(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const i=Di(e),s=Er(e);return this.vn(e).next(o=>i.G(Wc,IDBKeyRange.bound(t,t)).next(c=>R.forEach(c,l=>s.put(nf(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return R.forEach(t,(i,s)=>{const o=r.get(i.collectionGroup);return(o?R.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(r.set(i.collectionGroup,c),R.forEach(c,l=>this.Cn(e,i,l).next(d=>{const p=this.Fn(s,l);return d.isEqual(p)?R.resolve():this.Mn(e,s,l,d,p)}))))})}xn(e,t,r,i){return wr(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,i){return wr(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const i=wr(e);let s=new pe(Xt);return i.Z({index:Im,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(o,c)=>{s=s.add(new Bn(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}Fn(e,t){let r=new pe(Xt);const i=this.yn(t,e);if(i==null)return r;const s=Kc(t);if(s!=null){const o=e.data.field(s.fieldPath);if(us(o))for(const c of o.arrayValue.values||[])r=r.add(new Bn(t.indexId,e.key,this.fn(c),i))}else r=r.add(new Bn(t.indexId,e.key,to,i));return r}Mn(e,t,r,i,s){M(uf,"Updating index entries for document '%s'",t.key);const o=[];return function(l,d,p,g,w){const A=l.getIterator(),C=d.getIterator();let D=vr(A),P=vr(C);for(;D||P;){let q=!1,V=!1;if(D&&P){const L=p(D,P);L<0?V=!0:L>0&&(q=!0)}else D!=null?V=!0:q=!0;q?(g(P),P=vr(C)):V?(w(D),D=vr(A)):(D=vr(A),P=vr(C))}}(i,s,Xt,c=>{o.push(this.xn(e,t,r,c))},c=>{o.push(this.On(e,t,r,c))}),R.waitFor(o)}vn(e){let t=1;return Er(e).Z({index:vm,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>Xt(o,c)).filter((o,c,l)=>!c||Xt(o,l[c-1])!==0);const i=[];i.push(e);for(const o of r){const c=Xt(o,e),l=Xt(o,t);if(c===0)i[0]=e.nn();else if(c>0&&l<0)i.push(o),i.push(o.nn());else if(l>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Nn(i[o],i[o+1]))return[];const c=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,to,[]],l=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,to,[]];s.push(IDBKeyRange.bound(c,l))}return s}Nn(e,t){return Xt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(hf)}getMinOffset(e,t){return R.mapArray(this.dn(t),r=>this.An(e,r).next(i=>i||K())).next(hf)}}function df(n){return xe(n,as)}function wr(n){return xe(n,$o)}function Di(n){return xe(n,Bl)}function Er(n){return xe(n,Bo)}function hf(n){W(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;Ml(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new st(e.readTime,e.documentKey,t)}/**
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
 */const ff={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Eg=41943040;class je{static withCacheSize(e){return new je(e,je.DEFAULT_COLLECTION_PERCENTILE,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tg(n,e,t){const r=n.store(ht),i=n.store(jr),s=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=r.Z({range:o},(p,g,w)=>(c++,w.delete()));s.push(l.next(()=>{W(c===1)}));const d=[];for(const p of t.mutations){const g=gm(e,p.key.path,t.batchId);s.push(i.delete(g)),d.push(p.key)}return R.waitFor(s).next(()=>d)}function Yo(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw K();e=n.noDocument}return JSON.stringify(e).length}/**
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
 */je.DEFAULT_COLLECTION_PERCENTILE=10,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,je.DEFAULT=new je(Eg,je.DEFAULT_COLLECTION_PERCENTILE,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),je.DISABLED=new je(-1,0,0);class ka{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Bn={}}static It(e,t,r,i){W(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new ka(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Zt(e).Z({index:$n,range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){const s=Pr(e),o=Zt(e);return o.add({}).next(c=>{W(typeof c=="number");const l=new Ql(c,t,r,i),d=function(A,C,D){const P=D.baseMutations.map(V=>Ho(A.Tt,V)),q=D.mutations.map(V=>Ho(A.Tt,V));return{userId:C,batchId:D.batchId,localWriteTimeMs:D.localWriteTime.toMillis(),baseMutations:P,mutations:q}}(this.serializer,this.userId,l),p=[];let g=new pe((w,A)=>X(w.canonicalString(),A.canonicalString()));for(const w of i){const A=gm(this.userId,w.key.path,c);g=g.add(w.key.path.popLast()),p.push(o.put(d)),p.push(s.put(A,$E))}return g.forEach(w=>{p.push(this.indexManager.addToCollectionParentIndex(e,w))}),e.addOnCommittedListener(()=>{this.Bn[c]=l.keys()}),R.waitFor(p).next(()=>l)})}lookupMutationBatch(e,t){return Zt(e).get(t).next(r=>r?(W(r.userId===this.userId),Fn(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?R.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const i=r.keys();return this.Bn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return Zt(e).Z({index:$n,range:i},(o,c,l)=>{c.userId===this.userId&&(W(c.batchId>=r),s=Fn(this.serializer,c)),l.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Gn;return Zt(e).Z({index:$n,range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Gn],[this.userId,Number.POSITIVE_INFINITY]);return Zt(e).G($n,t).next(r=>r.map(i=>Fn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=yo(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return Pr(e).Z({range:i},(o,c,l)=>{const[d,p,g]=o,w=_t(p);if(d===this.userId&&t.path.isEqual(w))return Zt(e).get(g).next(A=>{if(!A)throw K();W(A.userId===this.userId),s.push(Fn(this.serializer,A))});l.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new pe(X);const i=[];return t.forEach(s=>{const o=yo(this.userId,s.path),c=IDBKeyRange.lowerBound(o),l=Pr(e).Z({range:c},(d,p,g)=>{const[w,A,C]=d,D=_t(A);w===this.userId&&s.path.isEqual(D)?r=r.add(C):g.done()});i.push(l)}),R.waitFor(i).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=yo(this.userId,r),o=IDBKeyRange.lowerBound(s);let c=new pe(X);return Pr(e).Z({range:o},(l,d,p)=>{const[g,w,A]=l,C=_t(w);g===this.userId&&r.isPrefixOf(C)?C.length===i&&(c=c.add(A)):p.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],i=[];return t.forEach(s=>{i.push(Zt(e).get(s).next(o=>{if(o===null)throw K();W(o.userId===this.userId),r.push(Fn(this.serializer,o))}))}),R.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return Tg(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),R.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return R.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return Pr(e).Z({range:r},(s,o,c)=>{if(s[0]===this.userId){const l=_t(s[1]);i.push(l)}else c.done()}).next(()=>{W(i.length===0)})})}containsKey(e,t){return bg(e,this.userId,t)}Qn(e){return Ag(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Gn,lastStreamToken:""})}}function bg(n,e,t){const r=yo(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Pr(n).Z({range:s,Y:!0},(c,l,d)=>{const[p,g,w]=c;p===e&&g===i&&(o=!0),d.done()}).next(()=>o)}function Zt(n){return xe(n,ht)}function Pr(n){return xe(n,jr)}function Ag(n){return xe(n,ss)}/**
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
 */class nr{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new nr(0)}static Kn(){return new nr(-1)}}/**
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
 */class db{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new nr(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>Q.fromTimestamp(new we(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Gn(e,i)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Tr(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(W(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let i=0;const s=[];return Tr(e).Z((o,c)=>{const l=Ui(c);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(i++,s.push(this.removeTargetData(e,l)))}).next(()=>R.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Tr(e).Z((r,i)=>{const s=Ui(i);t(s)})}Wn(e){return pf(e).get(Uo).next(t=>(W(t!==null),t))}Gn(e,t){return pf(e).put(Uo,t)}zn(e,t){return Tr(e).put(yg(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=Zn(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return Tr(e).Z({range:i,index:ym},(o,c,l)=>{const d=Ui(c);As(t,d.target)&&(s=d,l.done())}).next(()=>s)}addMatchingKeys(e,t,r){const i=[],s=cn(e);return t.forEach(o=>{const c=ze(o.path);i.push(s.put({targetId:r,path:c})),i.push(this.referenceDelegate.addReference(e,r,o))}),R.waitFor(i)}removeMatchingKeys(e,t,r){const i=cn(e);return R.forEach(t,s=>{const o=ze(s.path);return R.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){const r=cn(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=cn(e);let s=ie();return i.Z({range:r,Y:!0},(o,c,l)=>{const d=_t(o[1]),p=new z(d);s=s.add(p)}).next(()=>s)}containsKey(e,t){const r=ze(t.path),i=IDBKeyRange.bound([r],[dm(r)],!1,!0);let s=0;return cn(e).Z({index:Ul,Y:!0,range:i},([o,c],l,d)=>{o!==0&&(s++,d.done())}).next(()=>s>0)}lt(e,t){return Tr(e).get(t).next(r=>r?Ui(r):null)}}function Tr(n){return xe(n,qr)}function pf(n){return xe(n,Kn)}function cn(n){return xe(n,zr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf="LruGarbageCollector",Rg=1048576;function gf([n,e],[t,r]){const i=X(n,t);return i===0?X(e,r):i}class hb{constructor(e){this.Hn=e,this.buffer=new pe(gf),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();gf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Sg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){M(mf,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Tn(t)?M(mf,"Ignoring IndexedDB error during garbage collection: ",t):await cr(t)}await this.er(3e5)})}}class fb{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return R.resolve(ct.ae);const r=new hb(t);return this.tr.forEachTarget(e,i=>r.Zn(i.sequenceNumber)).next(()=>this.tr.rr(e,i=>r.Zn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(M("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(ff)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ff):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,i,s,o,c,l,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(M("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),i=this.params.maximumSequenceNumbersToCollect):i=g,o=Date.now(),this.nthSequenceNumber(e,i))).next(g=>(r=g,c=Date.now(),this.removeTargets(e,r,t))).next(g=>(s=g,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(d=Date.now(),br()<=se.DEBUG&&M("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${g} documents in `+(d-l)+`ms
Total Duration: ${d-p}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:g})))}}function Pg(n,e){return new fb(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pb{constructor(e,t){this.db=e,this.garbageCollector=Pg(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,i)=>t(i))}addReference(e,t,r){return no(e,r)}removeReference(e,t,r){return no(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return no(e,t)}ar(e,t){return function(i,s){let o=!1;return Ag(i).X(c=>bg(i,c,s).next(l=>(l&&(o=!0),R.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this._r(e,(o,c)=>{if(c<=t){const l=this.ar(e,o).next(d=>{if(!d)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,Q.min()),cn(e).delete(function(g){return[0,ze(g.path)]}(o))))});i.push(l)}}).next(()=>R.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return no(e,t)}_r(e,t){const r=cn(e);let i,s=ct.ae;return r.Z({index:Ul},([o,c],{path:l,sequenceNumber:d})=>{o===0?(s!==ct.ae&&t(new z(_t(i)),s),s=d,i=l):s=ct.ae}).next(()=>{s!==ct.ae&&t(new z(_t(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function no(n,e){return cn(n).put(function(r,i){return{targetId:0,path:ze(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}/**
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
 */class Cg{constructor(){this.changes=new zt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,be.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?R.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class mb{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Nn(e).put(r)}removeEntry(e,t,r){return Nn(e).delete(function(s,o){const c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Wo(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=be.newInvalidDocument(t);return Nn(e).Z({index:vo,range:IDBKeyRange.only(Ni(t))},(i,s)=>{r=this.cr(t,s)}).next(()=>r)}lr(e,t){let r={size:0,document:be.newInvalidDocument(t)};return Nn(e).Z({index:vo,range:IDBKeyRange.only(Ni(t))},(i,s)=>{r={document:this.cr(t,s),size:Yo(s)}}).next(()=>r)}getEntries(e,t){let r=it();return this.hr(e,t,(i,s)=>{const o=this.cr(i,s);r=r.insert(i,o)}).next(()=>r)}Pr(e,t){let r=it(),i=new ve(z.comparator);return this.hr(e,t,(s,o)=>{const c=this.cr(s,o);r=r.insert(s,c),i=i.insert(s,Yo(o))}).next(()=>({documents:r,Tr:i}))}hr(e,t,r){if(t.isEmpty())return R.resolve();let i=new pe(vf);t.forEach(l=>i=i.add(l));const s=IDBKeyRange.bound(Ni(i.first()),Ni(i.last())),o=i.getIterator();let c=o.getNext();return Nn(e).Z({index:vo,range:s},(l,d,p)=>{const g=z.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;c&&vf(c,g)<0;)r(c,null),c=o.getNext();c&&c.isEqual(g)&&(r(c,d),c=o.hasNext()?o.getNext():null),c?p.W(Ni(c)):p.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Wo(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Nn(e).G(IDBKeyRange.bound(c,l,!0)).next(d=>{s?.incrementDocumentReadCount(d.length);let p=it();for(const g of d){const w=this.cr(z.fromSegments(g.prefixPath.concat(g.collectionGroup,g.documentId)),g);w.isFoundDocument()&&(Ss(t,w)||i.has(w.key))&&(p=p.insert(w.key,w))}return p})}getAllFromCollectionGroup(e,t,r,i){let s=it();const o=yf(t,r),c=yf(t,st.max());return Nn(e).Z({index:_m,range:IDBKeyRange.bound(o,c,!0)},(l,d,p)=>{const g=this.cr(z.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);s=s.insert(g.key,g),s.size===i&&p.done()}).next(()=>s)}newChangeBuffer(e){return new gb(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return _f(e).get(Hc).next(t=>(W(!!t),t))}ur(e,t){return _f(e).put(Hc,t)}cr(e,t){if(t){const r=tb(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(Q.min())))return r}return be.newInvalidDocument(e)}}function kg(n){return new mb(n)}class gb extends Cg{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new zt(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const t=[];let r=0,i=new pe((s,o)=>X(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const c=this.Er.get(s);if(t.push(this.Ir.removeEntry(e,s,c.readTime)),o.isValidDocument()){const l=ef(this.Ir.serializer,o);i=i.add(s.path.popLast());const d=Yo(l);r+=d-c.size,t.push(this.Ir.addEntry(e,s,l))}else if(r-=c.size,this.trackRemovals){const l=ef(this.Ir.serializer,o.convertToNoDocument(Q.min()));t.push(this.Ir.addEntry(e,s,l))}}),i.forEach(s=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.Ir.updateMetadata(e,r)),R.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:i})=>(i.forEach((s,o)=>{this.Er.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function _f(n){return xe(n,os)}function Nn(n){return xe(n,Fo)}function Ni(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function yf(n,e){const t=e.documentKey.path.toArray();return[n,Wo(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function vf(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=X(t[s],r[s]),i)return i;return i=X(t.length,r.length),i||(i=X(t[t.length-2],r[r.length-2]),i||X(t[t.length-1],r[r.length-1]))}/**
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
 */class _b{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Dg{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Hi(r.mutation,i,Je.empty(),we.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,ie()).next(()=>r))}getLocalViewOfDocuments(e,t,r=ie()){const i=yt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=Mi();return s.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=yt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,ie()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=it();const o=Ki(),c=function(){return Ki()}();return t.forEach((l,d)=>{const p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof Gt)?s=s.insert(d.key,d):p!==void 0?(o.set(d.key,p.mutation.getFieldMask()),Hi(p.mutation,d,p.mutation.getFieldMask(),we.now())):o.set(d.key,Je.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,p)=>o.set(d,p)),t.forEach((d,p)=>{var g;return c.set(d,new _b(p,(g=o.get(d))!==null&&g!==void 0?g:null))}),c))}recalculateAndSaveOverlays(e,t){const r=Ki();let i=new ve((o,c)=>o-c),s=ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let p=r.get(l)||Je.empty();p=c.applyToLocalView(d,p),r.set(l,p);const g=(i.get(c.batchId)||ie()).add(l);i=i.insert(c.batchId,g)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),d=l.key,p=l.value,g=Km();p.forEach(w=>{if(!s.has(w)){const A=eg(t.get(w),r.get(w));A!==null&&g.set(w,A),s=s.add(w)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,g))}return R.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return z.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Kl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):R.resolve(yt());let c=ns,l=s;return o.next(d=>R.forEach(d,(p,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),s.get(p)?R.resolve():this.remoteDocumentCache.getEntry(e,p).next(w=>{l=l.insert(p,w)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,ie())).next(p=>({batchId:c,changes:Gm(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new z(t)).next(r=>{let i=Mi();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=Mi();return this.indexManager.getCollectionParents(e,s).next(c=>R.forEach(c,l=>{const d=function(g,w){return new lr(w,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((g,w)=>{o=o.insert(g,w)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((l,d)=>{const p=d.getKey();o.get(p)===null&&(o=o.insert(p,be.newInvalidDocument(p)))});let c=Mi();return o.forEach((l,d)=>{const p=s.get(l);p!==void 0&&Hi(p.mutation,d,Je.empty(),we.now()),Ss(t,d)&&(c=c.insert(l,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yb{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return R.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Qe(i.createTime)}}(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(i){return{name:i.name,query:vg(i.bundledQuery),readTime:Qe(i.readTime)}}(t)),R.resolve()}}/**
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
 */class vb{constructor(){this.overlays=new ve(z.comparator),this.Rr=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const r=yt();return R.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.Et(e,t,s)}),R.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Rr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Rr.delete(r)),R.resolve()}getOverlaysForCollection(e,t,r){const i=yt(),s=t.length+1,o=new z(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return R.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new ve((d,p)=>d-p);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=s.get(d.largestBatchId);p===null&&(p=yt(),s=s.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=yt(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=i)););return R.resolve(c)}Et(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Rr.get(i.largestBatchId).delete(r.key);this.Rr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Jl(t,r));let s=this.Rr.get(t);s===void 0&&(s=ie(),this.Rr.set(t,s)),this.Rr.set(t,s.add(r.key))}}/**
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
 */class Ib{constructor(){this.sessionToken=Pe.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
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
 */class nu{constructor(){this.Vr=new pe(Oe.mr),this.gr=new pe(Oe.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new Oe(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new Oe(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new z(new ue([])),r=new Oe(t,e),i=new Oe(t,e+1),s=[];return this.gr.forEachInRange([r,i],o=>{this.wr(o),s.push(o.key)}),s}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new z(new ue([])),r=new Oe(t,e),i=new Oe(t,e+1);let s=ie();return this.gr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new Oe(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Oe{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return z.comparator(e.key,t.key)||X(e.Cr,t.Cr)}static pr(e,t){return X(e.Cr,t.Cr)||z.comparator(e.key,t.key)}}/**
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
 */class wb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new pe(Oe.mr)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Ql(s,t,r,i);this.mutationQueue.push(o);for(const c of i)this.Mr=this.Mr.add(new Oe(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return R.resolve(o)}lookupMutationBatch(e,t){return R.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Nr(r),s=i<0?0:i;return R.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?Gn:this.Fr-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Oe(t,0),i=new Oe(t,Number.POSITIVE_INFINITY),s=[];return this.Mr.forEachInRange([r,i],o=>{const c=this.Or(o.Cr);s.push(c)}),R.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new pe(X);return t.forEach(i=>{const s=new Oe(i,0),o=new Oe(i,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([s,o],c=>{r=r.add(c.Cr)})}),R.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;z.isDocumentKey(s)||(s=s.child(""));const o=new Oe(new z(s),0);let c=new pe(X);return this.Mr.forEachWhile(l=>{const d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(l.Cr)),!0)},o),R.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const i=this.Or(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){W(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return R.forEach(t.mutations,i=>{const s=new Oe(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new Oe(t,0),i=this.Mr.firstAfterOrEqual(r);return R.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Eb{constructor(e){this.kr=e,this.docs=function(){return new ve(z.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return R.resolve(r?r.document.mutableCopy():be.newInvalidDocument(t))}getEntries(e,t){let r=it();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():be.newInvalidDocument(i))}),R.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=it();const o=t.path,c=new z(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:d,value:{document:p}}=l.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||Ml(hm(p),r)<=0||(i.has(p.key)||Ss(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return R.resolve(s)}getAllFromCollectionGroup(e,t,r,i){K()}qr(e,t){return R.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Tb(this)}getSize(e){return R.resolve(this.size)}}class Tb extends Cg{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Ir.addEntry(e,i)):this.Ir.removeEntry(r)}),R.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
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
 */class bb{constructor(e){this.persistence=e,this.Qr=new zt(t=>Zn(t),As),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.$r=0,this.Ur=new nu,this.targetCount=0,this.Kr=nr.Un()}forEachTarget(e,t){return this.Qr.forEach((r,i)=>t(i)),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),R.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new nr(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.zn(t),R.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Qr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),R.waitFor(s).next(()=>i)}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return R.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),R.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),R.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),R.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return R.resolve(r)}containsKey(e,t){return R.resolve(this.Ur.containsKey(t))}}/**
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
 */class ru{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new ct(0),this.zr=!1,this.zr=!0,this.jr=new Ib,this.referenceDelegate=e(this),this.Hr=new bb(this),this.indexManager=new lb,this.remoteDocumentCache=function(i){return new Eb(i)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new _g(t),this.Yr=new yb(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new vb,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new wb(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);const i=new Ab(this.Gr.next());return this.referenceDelegate.Zr(),r(i).next(s=>this.referenceDelegate.Xr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}ei(e,t){return R.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class Ab extends pm{constructor(e){super(),this.currentSequenceNumber=e}}class Da{constructor(e){this.persistence=e,this.ti=new nu,this.ni=null}static ri(e){return new Da(e)}get ii(){if(this.ni)return this.ni;throw K()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),R.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),R.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(i=>this.ii.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.ii.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.ii,r=>{const i=z.fromPath(r);return this.si(e,i).next(s=>{s||t.removeEntry(i,Q.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return R.or([()=>R.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class Jo{constructor(e,t){this.persistence=e,this.oi=new zt(r=>ze(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Pg(this,t)}static ri(e,t){return new Jo(e,t)}Zr(){}Xr(e){return R.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return R.forEach(this.oi,(r,i)=>this.ar(e,r,i).next(s=>s?R.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.qr(e,o=>this.ar(e,o,t).next(c=>{c||(r++,s.removeEntry(o,Q.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),R.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),R.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),R.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),R.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=wo(e.data.value)),t}ar(e,t,r){return R.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.oi.get(t);return R.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rb{constructor(e){this.serializer=e}B(e,t,r,i){const s=new _a("createOrUpgrade",t);r<1&&i>=1&&(function(l){l.createObjectStore(bs)}(e),function(l){l.createObjectStore(ss,{keyPath:BE}),l.createObjectStore(ht,{keyPath:kh,autoIncrement:!0}).createIndex($n,Dh,{unique:!0}),l.createObjectStore(jr)}(e),If(e),function(l){l.createObjectStore(Ln)}(e));let o=R.resolve();return r<3&&i>=3&&(r!==0&&(function(l){l.deleteObjectStore(zr),l.deleteObjectStore(qr),l.deleteObjectStore(Kn)}(e),If(e)),o=o.next(()=>function(l){const d=l.store(Kn),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:Q.min().toTimestamp(),targetCount:0};return d.put(Uo,p)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(l,d){return d.store(ht).G().next(g=>{l.deleteObjectStore(ht),l.createObjectStore(ht,{keyPath:kh,autoIncrement:!0}).createIndex($n,Dh,{unique:!0});const w=d.store(ht),A=g.map(C=>w.put(C));return R.waitFor(A)})}(e,s))),o=o.next(()=>{(function(l){l.createObjectStore(Gr,{keyPath:QE})})(e)})),r<5&&i>=5&&(o=o.next(()=>this._i(s))),r<6&&i>=6&&(o=o.next(()=>(function(l){l.createObjectStore(os)}(e),this.ai(s)))),r<7&&i>=7&&(o=o.next(()=>this.ui(s))),r<8&&i>=8&&(o=o.next(()=>this.ci(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.li(s))),r<11&&i>=11&&(o=o.next(()=>{(function(l){l.createObjectStore(va,{keyPath:YE})})(e),function(l){l.createObjectStore(Ia,{keyPath:JE})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(l){const d=l.createObjectStore(wa,{keyPath:iT});d.createIndex(Qc,sT,{unique:!1}),d.createIndex(wm,oT,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(l){const d=l.createObjectStore(Fo,{keyPath:jE});d.createIndex(vo,qE),d.createIndex(_m,zE)}(e)).next(()=>this.hi(e,s)).next(()=>e.deleteObjectStore(Ln))),r<14&&i>=14&&(o=o.next(()=>this.Pi(e,s))),r<15&&i>=15&&(o=o.next(()=>function(l){l.createObjectStore(Bl,{keyPath:XE,autoIncrement:!0}).createIndex(Wc,ZE,{unique:!1}),l.createObjectStore(Bo,{keyPath:eT}).createIndex(vm,tT,{unique:!1}),l.createObjectStore($o,{keyPath:nT}).createIndex(Im,rT,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{t.objectStore(Bo).clear()}).next(()=>{t.objectStore($o).clear()})),r<17&&i>=17&&(o=o.next(()=>{(function(l){l.createObjectStore($l,{keyPath:aT})})(e)})),o}ai(e){let t=0;return e.store(Ln).Z((r,i)=>{t+=Yo(i)}).next(()=>{const r={byteSize:t};return e.store(os).put(Hc,r)})}_i(e){const t=e.store(ss),r=e.store(ht);return t.G().next(i=>R.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,Gn],[s.userId,s.lastAcknowledgedBatchId]);return r.G($n,o).next(c=>R.forEach(c,l=>{W(l.userId===s.userId);const d=Fn(this.serializer,l);return Tg(e,s.userId,d).next(()=>{})}))}))}ui(e){const t=e.store(zr),r=e.store(Ln);return e.store(Kn).get(Uo).next(i=>{const s=[];return r.Z((o,c)=>{const l=new ue(o),d=function(g){return[0,ze(g)]}(l);s.push(t.get(d).next(p=>p?R.resolve():(g=>t.put({targetId:0,path:ze(g),sequenceNumber:i.highestListenSequenceNumber}))(l)))}).next(()=>R.waitFor(s))})}ci(e,t){e.createObjectStore(as,{keyPath:WE});const r=t.store(as),i=new tu,s=o=>{if(i.add(o)){const c=o.lastSegment(),l=o.popLast();return r.put({collectionId:c,parent:ze(l)})}};return t.store(Ln).Z({Y:!0},(o,c)=>{const l=new ue(o);return s(l.popLast())}).next(()=>t.store(jr).Z({Y:!0},([o,c,l],d)=>{const p=_t(c);return s(p.popLast())}))}li(e){const t=e.store(qr);return t.Z((r,i)=>{const s=Ui(i),o=yg(this.serializer,s);return t.put(o)})}hi(e,t){const r=t.store(Ln),i=[];return r.Z((s,o)=>{const c=t.store(Fo),l=function(g){return g.document?new z(ue.fromString(g.document.name).popFirst(5)):g.noDocument?z.fromSegments(g.noDocument.path):g.unknownDocument?z.fromSegments(g.unknownDocument.path):K()}(o).path.toArray(),d={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(d))}).next(()=>R.waitFor(i))}Pi(e,t){const r=t.store(ht),i=kg(this.serializer),s=new ru(Da.ri,this.serializer.Tt);return r.G().next(o=>{const c=new Map;return o.forEach(l=>{var d;let p=(d=c.get(l.userId))!==null&&d!==void 0?d:ie();Fn(this.serializer,l).keys().forEach(g=>p=p.add(g)),c.set(l.userId,p)}),R.forEach(c,(l,d)=>{const p=new He(d),g=Ca.It(this.serializer,p),w=s.getIndexManager(p),A=ka.It(p,this.serializer,w,s.referenceDelegate);return new Dg(i,A,g,w).recalculateAndSaveOverlaysForDocumentKeys(new Yc(t,ct.ae),l).next()})})}}function If(n){n.createObjectStore(zr,{keyPath:KE}).createIndex(Ul,HE,{unique:!0}),n.createObjectStore(qr,{keyPath:"targetId"}).createIndex(ym,GE,{unique:!0}),n.createObjectStore(Kn)}const en="IndexedDbPersistence",bc=18e5,Ac=5e3,Rc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Sb="main";class iu{constructor(e,t,r,i,s,o,c,l,d,p,g=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=s,this.window=o,this.document=c,this.Ii=d,this.Ei=p,this.di=g,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=w=>Promise.resolve(),!iu.D())throw new U(N.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new pb(this,i),this.gi=t+Sb,this.serializer=new _g(l),this.pi=new pn(this.gi,this.di,new Rb(this.serializer)),this.jr=new rb,this.Hr=new db(this.referenceDelegate,this.serializer),this.remoteDocumentCache=kg(this.serializer),this.Yr=new nb,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,p===!1&&We(en,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new U(N.FAILED_PRECONDITION,Rc);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new ct(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>ro(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if(Tn(e))return M(en,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return M(en,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return xi(e).get(yr).next(t=>R.resolve(this.Ni(t)))}Bi(e){return ro(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,bc)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=xe(t,Gr);return r.G().next(i=>{const s=this.qi(i,bc),o=i.filter(c=>s.indexOf(c)===-1);return R.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?R.resolve(!0):xi(e).get(yr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Ac)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new U(N.FAILED_PRECONDITION,Rc);return!1}}return!(!this.networkEnabled||!this.inForeground)||ro(e).G().next(r=>this.qi(r,Ac).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&M(en,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[bs,Gr],e=>{const t=new Yc(e,ct.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>ro(e).G().next(t=>this.qi(t,bc).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return ka.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new ub(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return Ca.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){M(en,"Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(l){return l===17?uT:l===16?lT:l===15?jl:l===14?bm:l===13?Tm:l===12?cT:l===11?Em:void K()}(this.di);let o;return this.pi.runTransaction(e,i,s,c=>(o=new Yc(c,this.Gr?this.Gr.next():ct.ae),t==="readwrite-primary"?this.Fi(o).next(l=>!!l||this.Mi(o)).next(l=>{if(!l)throw We(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new U(N.FAILED_PRECONDITION,fm);return r(o)}).next(l=>this.Oi(o).next(()=>l)):this.ji(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ji(e){return xi(e).get(yr).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Ac)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new U(N.FAILED_PRECONDITION,Rc)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return xi(e).put(yr,t)}static D(){return pn.D()}xi(e){const t=xi(e);return t.get(yr).next(r=>this.Ni(r)?(M(en,"Releasing primary lease."),t.delete(yr)):R.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(We(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;_p()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return M(en,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return We(en,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){We("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function xi(n){return xe(n,bs)}function ro(n){return xe(n,Gr)}function Pb(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class su{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=i}static Yi(e,t){let r=ie(),i=ie();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new su(e,t.fromCache,r,i)}}/**
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
 */class Cb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Ng{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return _p()?8:mm(Ne())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.rs(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ss(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new Cb;return this._s(e,t,o).next(c=>{if(s.result=c,this.Xi)return this.us(e,t,o,c.size)})}).next(()=>s.result)}us(e,t,r,i){return r.documentReadCount<this.es?(br()<=se.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Ar(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),R.resolve()):(br()<=se.DEBUG&&M("QueryEngine","Query:",Ar(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ts*i?(br()<=se.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Ar(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,lt(t))):R.resolve())}rs(e,t){if(zh(t))return R.resolve(null);let r=lt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Go(t,null,"F"),r=lt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=ie(...s);return this.ns.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const d=this.cs(t,c);return this.ls(t,d,o,l.readTime)?this.rs(e,Go(t,null,"F")):this.hs(e,d,t,l)}))})))}ss(e,t,r,i){return zh(t)||i.isEqual(Q.min())?R.resolve(null):this.ns.getDocuments(e,r).next(s=>{const o=this.cs(t,s);return this.ls(t,o,r,i)?R.resolve(null):(br()<=se.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ar(t)),this.hs(e,o,t,xE(i,ns)).next(c=>c))})}cs(e,t){let r=new pe(qm(e));return t.forEach((i,s)=>{Ss(e,s)&&(r=r.add(s))}),r}ls(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}_s(e,t,r){return br()<=se.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Ar(t)),this.ns.getDocumentsMatchingQuery(e,t,st.min(),r)}hs(e,t,r,i){return this.ns.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou="LocalStore",kb=3e8;class Db{constructor(e,t,r,i){this.persistence=e,this.Ps=t,this.serializer=i,this.Ts=new ve(X),this.Is=new zt(s=>Zn(s),As),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Dg(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function xg(n,e,t,r){return new Db(n,e,t,r)}async function Vg(n,e){const t=Z(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],c=[];let l=ie();for(const d of i){o.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}for(const d of s){c.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({Rs:d,removedBatchIds:o,addedBatchIds:c}))})})}function Nb(n,e){const t=Z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,l,d,p){const g=d.batch,w=g.keys();let A=R.resolve();return w.forEach(C=>{A=A.next(()=>p.getEntry(l,C)).next(D=>{const P=d.docVersions.get(C);W(P!==null),D.version.compareTo(P)<0&&(g.applyToRemoteDocument(D,d),D.isValidDocument()&&(D.setReadTime(d.commitVersion),p.addEntry(D)))})}),A.next(()=>c.mutationQueue.removeMutationBatch(l,g))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=ie();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Og(n){const e=Z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function xb(n,e){const t=Z(n),r=e.snapshotVersion;let i=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});i=t.Ts;const c=[];e.targetChanges.forEach((p,g)=>{const w=i.get(g);if(!w)return;c.push(t.Hr.removeMatchingKeys(s,p.removedDocuments,g).next(()=>t.Hr.addMatchingKeys(s,p.addedDocuments,g)));let A=w.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(g)!==null?A=A.withResumeToken(Pe.EMPTY_BYTE_STRING,Q.min()).withLastLimboFreeSnapshotVersion(Q.min()):p.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(p.resumeToken,r)),i=i.insert(g,A),function(D,P,q){return D.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=kb?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0}(w,A,p)&&c.push(t.Hr.updateTargetData(s,A))});let l=it(),d=ie();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push(Vb(s,o,e.documentUpdates).next(p=>{l=p.Vs,d=p.fs})),!r.isEqual(Q.min())){const p=t.Hr.getLastRemoteSnapshotVersion(s).next(g=>t.Hr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(p)}return R.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.Ts=i,s))}function Vb(n,e,t){let r=ie(),i=ie();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=it();return t.forEach((c,l)=>{const d=s.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(Q.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):M(ou,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{Vs:o,fs:i}})}function Ob(n,e){const t=Z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Gn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Lb(n,e){const t=Z(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Hr.getTargetData(r,e).next(s=>s?(i=s,R.resolve(i)):t.Hr.allocateTargetId(r).next(o=>(i=new Mt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Ts.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function ul(n,e,t){const r=Z(n),i=r.Ts.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Tn(o))throw o;M(ou,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(i.target)}function wf(n,e,t){const r=Z(n);let i=Q.min(),s=ie();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,d,p){const g=Z(l),w=g.Is.get(p);return w!==void 0?R.resolve(g.Ts.get(w)):g.Hr.getTargetData(d,p)}(r,o,lt(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,c.targetId).next(l=>{s=l})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,t?i:Q.min(),t?s:ie())).next(c=>(Mb(r,AT(e),c),{documents:c,gs:s})))}function Mb(n,e,t){let r=n.Es.get(e)||Q.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Es.set(e,r)}class Ef{constructor(){this.activeTargetIds=DT()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Lg{constructor(){this.ho=new Ef,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new Ef,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Fb{To(e){}shutdown(){}}/**
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
 */const Tf="ConnectivityMonitor";class bf{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){M(Tf,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){M(Tf,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let io=null;function dl(){return io===null?io=function(){return 268435456+Math.round(2147483648*Math.random())}():io++,"0x"+io.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sc="RestConnection",Ub={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Bb{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${i}`,this.wo=this.databaseId.database===jo?`project_id=${r}`:`project_id=${r}&database_id=${i}`}So(e,t,r,i,s){const o=dl(),c=this.bo(e,t.toUriEncodedString());M(Sc,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(l,i,s),this.vo(e,c,l,r).then(d=>(M(Sc,`Received RPC '${e}' ${o}: `,d),d),d=>{throw ts(Sc,`RPC '${e}' ${o} failed with error: `,d,"url: ",c,"request:",r),d})}Co(e,t,r,i,s,o){return this.So(e,t,r,i,s)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ui}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}bo(e,t){const r=Ub[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
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
 */class $b{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
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
 */const $e="WebChannelConnection";class jb extends Bb{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,i){const s=dl();return new Promise((o,c)=>{const l=new sm;l.setWithCredentials(!0),l.listenOnce(om.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case go.NO_ERROR:const p=l.getResponseJson();M($e,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(p)),o(p);break;case go.TIMEOUT:M($e,`RPC '${e}' ${s} timed out`),c(new U(N.DEADLINE_EXCEEDED,"Request time out"));break;case go.HTTP_ERROR:const g=l.getStatus();if(M($e,`RPC '${e}' ${s} failed with status:`,g,"response text:",l.getResponseText()),g>0){let w=l.getResponseJson();Array.isArray(w)&&(w=w[0]);const A=w?.error;if(A&&A.status&&A.message){const C=function(P){const q=P.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(q)>=0?q:N.UNKNOWN}(A.status);c(new U(C,A.message))}else c(new U(N.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new U(N.UNAVAILABLE,"Connection failed."));break;default:K()}}finally{M($e,`RPC '${e}' ${s} completed.`)}});const d=JSON.stringify(i);M($e,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",d,r,15)})}Wo(e,t,r){const i=dl(),s=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=lm(),c=cm(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Do(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const p=s.join("");M($e,`Creating RPC '${e}' stream ${i}: ${p}`,l);const g=o.createWebChannel(p,l);let w=!1,A=!1;const C=new $b({Fo:P=>{A?M($e,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(w||(M($e,`Opening RPC '${e}' stream ${i} transport.`),g.open(),w=!0),M($e,`RPC '${e}' stream ${i} sending:`,P),g.send(P))},Mo:()=>g.close()}),D=(P,q,V)=>{P.listen(q,L=>{try{V(L)}catch(j){setTimeout(()=>{throw j},0)}})};return D(g,Li.EventType.OPEN,()=>{A||(M($e,`RPC '${e}' stream ${i} transport opened.`),C.Qo())}),D(g,Li.EventType.CLOSE,()=>{A||(A=!0,M($e,`RPC '${e}' stream ${i} transport closed`),C.Uo())}),D(g,Li.EventType.ERROR,P=>{A||(A=!0,ts($e,`RPC '${e}' stream ${i} transport errored:`,P),C.Uo(new U(N.UNAVAILABLE,"The operation could not be completed")))}),D(g,Li.EventType.MESSAGE,P=>{var q;if(!A){const V=P.data[0];W(!!V);const L=V,j=L?.error||((q=L[0])===null||q===void 0?void 0:q.error);if(j){M($e,`RPC '${e}' stream ${i} received error:`,j);const x=j.status;let F=function(m){const I=Se[m];if(I!==void 0)return rg(I)}(x),v=j.message;F===void 0&&(F=N.INTERNAL,v="Unknown error status: "+x+" with message "+j.message),A=!0,C.Uo(new U(F,v)),g.close()}else M($e,`RPC '${e}' stream ${i} received:`,V),C.Ko(V)}}),D(c,am.STAT_EVENT,P=>{P.stat===qc.PROXY?M($e,`RPC '${e}' stream ${i} detected buffering proxy`):P.stat===qc.NOPROXY&&M($e,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.$o()},0),C}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function qb(){return typeof window<"u"?window:null}function Ao(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Na(n){return new GT(n,!0)}/**
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
 */class Mg{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=i,this.jo=s,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),i=Math.max(0,t-r);i>0&&M("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,i,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
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
 */const Af="PersistentStream";class Fg{constructor(e,t,r,i,s,o,c,l){this.Ti=e,this.n_=r,this.r_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new Mg(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===N.RESOURCE_EXHAUSTED?(We(t.toString()),We("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===N.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.i_===t&&this.V_(r,i)},r=>{e(()=>{const i=new U(N.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(i)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(i=>{r(()=>this.m_(i))}),this.stream.onMessage(i=>{r(()=>++this.__==1?this.g_(i):this.onNext(i))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return M(Af,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(M(Af,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class zb extends Fg{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=WT(this.serializer,e),r=function(s){if(!("targetChange"in s))return Q.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Q.min():o.readTime?Qe(o.readTime):Q.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=sl(this.serializer),t.addTarget=function(s,o){let c;const l=o.target;if(c=qo(l)?{documents:dg(s,l)}:{query:hg(s,l).ht},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=og(s,o.resumeToken);const d=rl(s,o.expectedCount);d!==null&&(c.expectedCount=d)}else if(o.snapshotVersion.compareTo(Q.min())>0){c.readTime=Xr(s,o.snapshotVersion.toTimestamp());const d=rl(s,o.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=YT(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=sl(this.serializer),t.removeTarget=e,this.I_(t)}}class Gb extends Fg{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return W(!!e.streamToken),this.lastStreamToken=e.streamToken,W(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){W(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=QT(e.writeResults,e.commitTime),r=Qe(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=sl(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Ho(this.serializer,r))};this.I_(t)}}/**
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
 */class Kb{}class Hb extends Kb{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.F_=!1}M_(){if(this.F_)throw new U(N.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.So(e,il(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new U(N.UNKNOWN,s.toString())})}Co(e,t,r,i,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Co(e,il(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new U(N.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class Wb{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(We(t),this.N_=!1):M("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
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
 */const rr="RemoteStore";class Qb{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=s,this.z_.To(o=>{r.enqueueAndForget(async()=>{ur(this)&&(M(rr,"Restarting streams for network reachability change."),await async function(l){const d=Z(l);d.W_.add(4),await Cs(d),d.j_.set("Unknown"),d.W_.delete(4),await xa(d)}(this))})}),this.j_=new Wb(r,i)}}async function xa(n){if(ur(n))for(const e of n.G_)await e(!0)}async function Cs(n){for(const e of n.G_)await e(!1)}function Ug(n,e){const t=Z(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),uu(t)?lu(t):hi(t).c_()&&cu(t,e))}function au(n,e){const t=Z(n),r=hi(t);t.K_.delete(e),r.c_()&&Bg(t,e),t.K_.size===0&&(r.c_()?r.P_():ur(t)&&t.j_.set("Unknown"))}function cu(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Q.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}hi(n).y_(e)}function Bg(n,e){n.H_.Ne(e),hi(n).w_(e)}function lu(n){n.H_=new $T({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),hi(n).start(),n.j_.B_()}function uu(n){return ur(n)&&!hi(n).u_()&&n.K_.size>0}function ur(n){return Z(n).W_.size===0}function $g(n){n.H_=void 0}async function Yb(n){n.j_.set("Online")}async function Jb(n){n.K_.forEach((e,t)=>{cu(n,e)})}async function Xb(n,e){$g(n),uu(n)?(n.j_.q_(e),lu(n)):n.j_.set("Unknown")}async function Zb(n,e,t){if(n.j_.set("Online"),e instanceof sg&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.K_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.K_.delete(c),i.H_.removeTarget(c))}(n,e)}catch(r){M(rr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Xo(n,r)}else if(e instanceof bo?n.H_.We(e):e instanceof ig?n.H_.Ze(e):n.H_.je(e),!t.isEqual(Q.min()))try{const r=await Og(n.localStore);t.compareTo(r)>=0&&await function(s,o){const c=s.H_.ot(o);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=s.K_.get(d);p&&s.K_.set(d,p.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,d)=>{const p=s.K_.get(l);if(!p)return;s.K_.set(l,p.withResumeToken(Pe.EMPTY_BYTE_STRING,p.snapshotVersion)),Bg(s,l);const g=new Mt(p.target,l,d,p.sequenceNumber);cu(s,g)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){M(rr,"Failed to raise snapshot:",r),await Xo(n,r)}}async function Xo(n,e,t){if(!Tn(e))throw e;n.W_.add(1),await Cs(n),n.j_.set("Offline"),t||(t=()=>Og(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M(rr,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await xa(n)})}function jg(n,e){return e().catch(t=>Xo(n,t,e))}async function ks(n){const e=Z(n),t=In(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:Gn;for(;eA(e);)try{const i=await Ob(e.localStore,r);if(i===null){e.U_.length===0&&t.P_();break}r=i.batchId,tA(e,i)}catch(i){await Xo(e,i)}qg(e)&&zg(e)}function eA(n){return ur(n)&&n.U_.length<10}function tA(n,e){n.U_.push(e);const t=In(n);t.c_()&&t.S_&&t.b_(e.mutations)}function qg(n){return ur(n)&&!In(n).u_()&&n.U_.length>0}function zg(n){In(n).start()}async function nA(n){In(n).C_()}async function rA(n){const e=In(n);for(const t of n.U_)e.b_(t.mutations)}async function iA(n,e,t){const r=n.U_.shift(),i=Yl.from(r,e,t);await jg(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await ks(n)}async function sA(n,e){e&&In(n).S_&&await async function(r,i){if(function(o){return UT(o)&&o!==N.ABORTED}(i.code)){const s=r.U_.shift();In(r).h_(),await jg(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await ks(r)}}(n,e),qg(n)&&zg(n)}async function Rf(n,e){const t=Z(n);t.asyncQueue.verifyOperationInProgress(),M(rr,"RemoteStore received new credentials");const r=ur(t);t.W_.add(3),await Cs(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await xa(t)}async function oA(n,e){const t=Z(n);e?(t.W_.delete(2),await xa(t)):e||(t.W_.add(2),await Cs(t),t.j_.set("Unknown"))}function hi(n){return n.J_||(n.J_=function(t,r,i){const s=Z(t);return s.M_(),new zb(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{xo:Yb.bind(null,n),No:Jb.bind(null,n),Lo:Xb.bind(null,n),p_:Zb.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),uu(n)?lu(n):n.j_.set("Unknown")):(await n.J_.stop(),$g(n))})),n.J_}function In(n){return n.Y_||(n.Y_=function(t,r,i){const s=Z(t);return s.M_(),new Gb(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:nA.bind(null,n),Lo:sA.bind(null,n),D_:rA.bind(null,n),v_:iA.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await ks(n)):(await n.Y_.stop(),n.U_.length>0&&(M(rr,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
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
 */class du{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,c=new du(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function hu(n,e){if(We("AsyncQueue",`${e}: ${n}`),Tn(n))return new U(N.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Or{static emptySet(e){return new Or(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||z.comparator(t.key,r.key):(t,r)=>z.comparator(t.key,r.key),this.keyedMap=Mi(),this.sortedSet=new ve(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Or)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Or;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Sf{constructor(){this.Z_=new ve(z.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):K():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Zr{constructor(e,t,r,i,s,o,c,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Zr(e,t,Or.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Aa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class aA{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class cA{constructor(){this.queries=Pf(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const i=Z(t),s=i.queries;i.queries=Pf(),s.forEach((o,c)=>{for(const l of c.ta)l.onError(r)})})(this,new U(N.ABORTED,"Firestore shutting down"))}}function Pf(){return new zt(n=>jm(n),Aa)}async function fu(n,e){const t=Z(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.na()&&e.ra()&&(r=2):(s=new aA,r=e.ra()?0:1);try{switch(r){case 0:s.ea=await t.onListen(i,!0);break;case 1:s.ea=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=hu(o,`Initialization of query '${Ar(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.ta.push(e),e.sa(t.onlineState),s.ea&&e.oa(s.ea)&&mu(t)}async function pu(n,e){const t=Z(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.ta.indexOf(e);o>=0&&(s.ta.splice(o,1),s.ta.length===0?i=e.ra()?0:1:!s.na()&&e.ra()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function lA(n,e){const t=Z(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.ta)c.oa(i)&&(r=!0);o.ea=i}}r&&mu(t)}function uA(n,e,t){const r=Z(n),i=r.queries.get(e);if(i)for(const s of i.ta)s.onError(t);r.queries.delete(e)}function mu(n){n.ia.forEach(e=>{e.next()})}var hl,Cf;(Cf=hl||(hl={}))._a="default",Cf.Cache="cache";class gu{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Zr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=Zr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==hl.Cache}}/**
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
 */class Gg{constructor(e){this.key=e}}class Kg{constructor(e){this.key=e}}class dA{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=ie(),this.mutatedKeys=ie(),this.ya=qm(e),this.wa=new Or(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new Sf,i=t?t.wa:this.wa;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,g)=>{const w=i.get(p),A=Ss(this.query,g)?g:null,C=!!w&&this.mutatedKeys.has(w.key),D=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let P=!1;w&&A?w.data.isEqual(A.data)?C!==D&&(r.track({type:3,doc:A}),P=!0):this.va(w,A)||(r.track({type:2,doc:A}),P=!0,(l&&this.ya(A,l)>0||d&&this.ya(A,d)<0)&&(c=!0)):!w&&A?(r.track({type:0,doc:A}),P=!0):w&&!A&&(r.track({type:1,doc:w}),P=!0,(l||d)&&(c=!0)),P&&(A?(o=o.add(A),s=D?s.add(p):s.delete(p)):(o=o.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{wa:o,Da:r,ls:c,mutatedKeys:s}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((p,g)=>function(A,C){const D=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K()}};return D(A)-D(C)}(p.type,g.type)||this.ya(p.doc,g.doc)),this.Ca(r),i=i!=null&&i;const c=t&&!i?this.Fa():[],l=this.pa.size===0&&this.current&&!i?1:0,d=l!==this.ga;return this.ga=l,o.length!==0||d?{snapshot:new Zr(this.query,e.wa,s,o,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new Sf,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=ie(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new Kg(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new Gg(r))}),t}Oa(e){this.fa=e.gs,this.pa=ie();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return Zr.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const _u="SyncEngine";class hA{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class fA{constructor(e){this.key=e,this.Ba=!1}}class pA{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new zt(c=>jm(c),Aa),this.qa=new Map,this.Qa=new Set,this.$a=new ve(z.comparator),this.Ua=new Map,this.Ka=new nu,this.Wa={},this.Ga=new Map,this.za=nr.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function mA(n,e,t=!0){const r=Xg(n);let i;const s=r.ka.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Na()):i=await Hg(r,e,t,!0),i}async function gA(n,e){const t=Xg(n);await Hg(t,e,!0,!1)}async function Hg(n,e,t,r){const i=await Lb(n.localStore,lt(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await _A(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&Ug(n.remoteStore,i),c}async function _A(n,e,t,r,i){n.Ha=(g,w,A)=>async function(D,P,q,V){let L=P.view.ba(q);L.ls&&(L=await wf(D.localStore,P.query,!1).then(({documents:v})=>P.view.ba(v,L)));const j=V&&V.targetChanges.get(P.targetId),x=V&&V.targetMismatches.get(P.targetId)!=null,F=P.view.applyChanges(L,D.isPrimaryClient,j,x);return Df(D,P.targetId,F.Ma),F.snapshot}(n,g,w,A);const s=await wf(n.localStore,e,!0),o=new dA(e,s.gs),c=o.ba(s.documents),l=Ps.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=o.applyChanges(c,n.isPrimaryClient,l);Df(n,t,d.Ma);const p=new hA(e,t,o);return n.ka.set(e,p),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),d.snapshot}async function yA(n,e,t){const r=Z(n),i=r.ka.get(e),s=r.qa.get(i.targetId);if(s.length>1)return r.qa.set(i.targetId,s.filter(o=>!Aa(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await ul(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&au(r.remoteStore,i.targetId),fl(r,i.targetId)}).catch(cr)):(fl(r,i.targetId),await ul(r.localStore,i.targetId,!0))}async function vA(n,e){const t=Z(n),r=t.ka.get(e),i=t.qa.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),au(t.remoteStore,r.targetId))}async function IA(n,e,t){const r=Zg(n);try{const i=await function(o,c){const l=Z(o),d=we.now(),p=c.reduce((A,C)=>A.add(C.key),ie());let g,w;return l.persistence.runTransaction("Locally write mutations","readwrite",A=>{let C=it(),D=ie();return l.ds.getEntries(A,p).next(P=>{C=P,C.forEach((q,V)=>{V.isValidDocument()||(D=D.add(q))})}).next(()=>l.localDocuments.getOverlayedDocuments(A,C)).next(P=>{g=P;const q=[];for(const V of c){const L=MT(V,g.get(V.key).overlayedDocument);L!=null&&q.push(new Gt(V.key,L,Vm(L.value.mapValue),Xe.exists(!0)))}return l.mutationQueue.addMutationBatch(A,d,q,c)}).next(P=>{w=P;const q=P.applyToLocalDocumentSet(g,D);return l.documentOverlayCache.saveOverlays(A,P.batchId,q)})}).then(()=>({batchId:w.batchId,changes:Gm(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,l){let d=o.Wa[o.currentUser.toKey()];d||(d=new ve(X)),d=d.insert(c,l),o.Wa[o.currentUser.toKey()]=d}(r,i.batchId,t),await Ds(r,i.changes),await ks(r.remoteStore)}catch(i){const s=hu(i,"Failed to persist write");t.reject(s)}}async function Wg(n,e){const t=Z(n);try{const r=await xb(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Ua.get(s);o&&(W(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.Ba=!0:i.modifiedDocuments.size>0?W(o.Ba):i.removedDocuments.size>0&&(W(o.Ba),o.Ba=!1))}),await Ds(t,r,e)}catch(r){await cr(r)}}function kf(n,e,t){const r=Z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.ka.forEach((s,o)=>{const c=o.view.sa(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const l=Z(o);l.onlineState=c;let d=!1;l.queries.forEach((p,g)=>{for(const w of g.ta)w.sa(c)&&(d=!0)}),d&&mu(l)}(r.eventManager,e),i.length&&r.La.p_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function wA(n,e,t){const r=Z(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Ua.get(e),s=i&&i.key;if(s){let o=new ve(z.comparator);o=o.insert(s,be.newNoDocument(s,Q.min()));const c=ie().add(s),l=new Pa(Q.min(),new Map,new ve(X),o,c);await Wg(r,l),r.$a=r.$a.remove(s),r.Ua.delete(e),yu(r)}else await ul(r.localStore,e,!1).then(()=>fl(r,e,t)).catch(cr)}async function EA(n,e){const t=Z(n),r=e.batch.batchId;try{const i=await Nb(t.localStore,e);Yg(t,r,null),Qg(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ds(t,i)}catch(i){await cr(i)}}async function TA(n,e,t){const r=Z(n);try{const i=await function(o,c){const l=Z(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,c).next(g=>(W(g!==null),p=g.keys(),l.mutationQueue.removeMutationBatch(d,g))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);Yg(r,e,t),Qg(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ds(r,i)}catch(i){await cr(i)}}function Qg(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function Yg(n,e,t){const r=Z(n);let i=r.Wa[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Wa[r.currentUser.toKey()]=i}}function fl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||Jg(n,r)})}function Jg(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(au(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),yu(n))}function Df(n,e,t){for(const r of t)r instanceof Gg?(n.Ka.addReference(r.key,e),bA(n,r)):r instanceof Kg?(M(_u,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||Jg(n,r.key)):K()}function bA(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(M(_u,"New document in limbo: "+t),n.Qa.add(r),yu(n))}function yu(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new z(ue.fromString(e)),r=n.za.next();n.Ua.set(r,new fA(t)),n.$a=n.$a.insert(t,r),Ug(n.remoteStore,new Mt(lt(Rs(t.path)),r,"TargetPurposeLimboResolution",ct.ae))}}async function Ds(n,e,t){const r=Z(n),i=[],s=[],o=[];r.ka.isEmpty()||(r.ka.forEach((c,l)=>{o.push(r.Ha(l,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const g=d?!d.fromCache:(p=t?.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,g?"current":"not-current")}if(d){i.push(d);const g=su.Yi(l.targetId,d);s.push(g)}}))}),await Promise.all(o),r.La.p_(i),await async function(l,d){const p=Z(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>R.forEach(d,w=>R.forEach(w.Hi,A=>p.persistence.referenceDelegate.addReference(g,w.targetId,A)).next(()=>R.forEach(w.Ji,A=>p.persistence.referenceDelegate.removeReference(g,w.targetId,A)))))}catch(g){if(!Tn(g))throw g;M(ou,"Failed to update sequence numbers: "+g)}for(const g of d){const w=g.targetId;if(!g.fromCache){const A=p.Ts.get(w),C=A.snapshotVersion,D=A.withLastLimboFreeSnapshotVersion(C);p.Ts=p.Ts.insert(w,D)}}}(r.localStore,s))}async function AA(n,e){const t=Z(n);if(!t.currentUser.isEqual(e)){M(_u,"User change. New user:",e.toKey());const r=await Vg(t.localStore,e);t.currentUser=e,function(s,o){s.Ga.forEach(c=>{c.forEach(l=>{l.reject(new U(N.CANCELLED,o))})}),s.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ds(t,r.Rs)}}function RA(n,e){const t=Z(n),r=t.Ua.get(e);if(r&&r.Ba)return ie().add(r.key);{let i=ie();const s=t.qa.get(e);if(!s)return i;for(const o of s){const c=t.ka.get(o);i=i.unionWith(c.view.Sa)}return i}}function Xg(n){const e=Z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Wg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=RA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=wA.bind(null,e),e.La.p_=lA.bind(null,e.eventManager),e.La.Ja=uA.bind(null,e.eventManager),e}function Zg(n){const e=Z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=EA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=TA.bind(null,e),e}class fs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Na(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return xg(this.persistence,new Ng,e.initialUser,this.serializer)}Xa(e){return new ru(Da.ri,this.serializer)}Za(e){return new Lg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}fs.provider={build:()=>new fs};class SA extends fs{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){W(this.persistence.referenceDelegate instanceof Jo);const r=this.persistence.referenceDelegate.garbageCollector;return new Sg(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?je.withCacheSize(this.cacheSizeBytes):je.DEFAULT;return new ru(r=>Jo.ri(r,t),this.serializer)}}class PA extends fs{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await Zg(this.ru.syncEngine),await ks(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return xg(this.persistence,new Ng,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new Sg(r,e.asyncQueue,t)}nu(e,t){const r=new ME(t,this.persistence);return new LE(e.asyncQueue,r)}Xa(e){const t=Pb(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?je.withCacheSize(this.cacheSizeBytes):je.DEFAULT;return new iu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,qb(),Ao(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new Lg}}class Zo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>kf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=AA.bind(null,this.syncEngine),await oA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new cA}()}createDatastore(e){const t=Na(e.databaseInfo.databaseId),r=function(s){return new jb(s)}(e.databaseInfo);return function(s,o,c,l){return new Hb(s,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new Qb(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>kf(this.syncEngine,t,0),function(){return bf.D()?new bf:new Fb}())}createSyncEngine(e,t){return function(i,s,o,c,l,d,p){const g=new pA(i,s,o,c,l,d);return p&&(g.ja=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=Z(i);M(rr,"RemoteStore shutting down."),s.W_.add(5),await Cs(s),s.z_.shutdown(),s.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Zo.provider={build:()=>new Zo};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class vu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):We("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const wn="FirestoreClient";class CA{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=He.UNAUTHENTICATED,this.clientId=um.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{M(wn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(M(wn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=hu(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Pc(n,e){n.asyncQueue.verifyOperationInProgress(),M(wn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Vg(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Nf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await kA(n);M(wn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Rf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Rf(e.remoteStore,i)),n._onlineComponents=e}async function kA(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M(wn,"Using user provided OfflineComponentProvider");try{await Pc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===N.FAILED_PRECONDITION||i.code===N.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;ts("Error using user provided cache. Falling back to memory cache: "+t),await Pc(n,new fs)}}else M(wn,"Using default OfflineComponentProvider"),await Pc(n,new SA(void 0));return n._offlineComponents}async function e_(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M(wn,"Using user provided OnlineComponentProvider"),await Nf(n,n._uninitializedComponentsProvider._online)):(M(wn,"Using default OnlineComponentProvider"),await Nf(n,new Zo))),n._onlineComponents}function DA(n){return e_(n).then(e=>e.syncEngine)}async function ea(n){const e=await e_(n),t=e.eventManager;return t.onListen=mA.bind(null,e.syncEngine),t.onUnlisten=yA.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=gA.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=vA.bind(null,e.syncEngine),t}function NA(n,e,t={}){const r=new wt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,d){const p=new vu({next:w=>{p.su(),o.enqueueAndForget(()=>pu(s,g));const A=w.docs.has(c);!A&&w.fromCache?d.reject(new U(N.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&w.fromCache&&l&&l.source==="server"?d.reject(new U(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(w)},error:w=>d.reject(w)}),g=new gu(Rs(c.path),p,{includeMetadataChanges:!0,Ta:!0});return fu(s,g)}(await ea(n),n.asyncQueue,e,t,r)),r.promise}function xA(n,e,t={}){const r=new wt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,d){const p=new vu({next:w=>{p.su(),o.enqueueAndForget(()=>pu(s,g)),w.fromCache&&l.source==="server"?d.reject(new U(N.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(w)},error:w=>d.reject(w)}),g=new gu(c,p,{includeMetadataChanges:!0,Ta:!0});return fu(s,g)}(await ea(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function t_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xf=new Map;/**
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
 */function n_(n,e,t){if(!t)throw new U(N.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function VA(n,e,t,r){if(e===!0&&r===!0)throw new U(N.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Vf(n){if(!z.isDocumentKey(n))throw new U(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Of(n){if(z.isDocumentKey(n))throw new U(N.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Va(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":K()}function Et(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Va(n);throw new U(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function OA(n,e){if(e<=0)throw new U(N.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA="firestore.googleapis.com",Lf=!0;class Mf{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=LA,this.ssl=Lf}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Lf;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Eg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Rg)throw new U(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}VA("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=t_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new U(N.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new U(N.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new U(N.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Iu{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Mf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Mf(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new RE;switch(r.type){case"firstParty":return new CE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=xf.get(t);r&&(M("ComponentProvider","Removing Datastore"),xf.delete(t),r.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Pt(this.firestore,e,this._query)}}class Ye{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new mn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ye(this.firestore,e,this._key)}}class mn extends Pt{constructor(e,t,r){super(e,t,Rs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ye(this.firestore,null,new z(e))}withConverter(e){return new mn(this.firestore,e,this._path)}}function Ce(n,e,...t){if(n=_e(n),n_("collection","path",e),n instanceof Iu){const r=ue.fromString(e,...t);return Of(r),new mn(n,null,r)}{if(!(n instanceof Ye||n instanceof mn))throw new U(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ue.fromString(e,...t));return Of(r),new mn(n.firestore,null,r)}}function ut(n,e,...t){if(n=_e(n),arguments.length===1&&(e=um.newId()),n_("doc","path",e),n instanceof Iu){const r=ue.fromString(e,...t);return Vf(r),new Ye(n,null,new z(r))}{if(!(n instanceof Ye||n instanceof mn))throw new U(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ue.fromString(e,...t));return Vf(r),new Ye(n.firestore,n instanceof mn?n.converter:null,new z(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff="AsyncQueue";class Uf{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new Mg(this,"async_queue_retry"),this.Su=()=>{const r=Ao();r&&M(Ff,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=Ao();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=Ao();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new wt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!Tn(e))throw e;M(Ff,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw We("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const i=du.createAndSchedule(this,e,t,r,s=>this.Fu(s));return this.fu.push(i),i}Du(){this.gu&&K()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function Bf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class ir extends Iu{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Uf,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Uf(e),this._firestoreClient=void 0,await e}}}function MA(n,e,t){t||(t=jo);const r=oi(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(Ji(s,e))return i;throw new U(N.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new U(N.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Rg)throw new U(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function Oa(n){if(n._terminated)throw new U(N.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||FA(n),n._firestoreClient}function FA(n){var e,t,r;const i=n._freezeSettings(),s=function(c,l,d,p){return new hT(c,l,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,t_(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new CA(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){const l=c?._online.build();return{_offline:c?._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ei(Pe.fromBase64String(e))}catch(t){throw new U(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ei(Pe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ie(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e){this._methodName=e}}/**
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
 */class wu{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return X(this._lat,e._lat)||X(this._long,e._long)}}/**
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
 */class Eu{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
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
 */const UA=/^__.*__$/;class BA{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Gt(e,this.data,this.fieldMask,t,this.fieldTransforms):new di(e,this.data,t,this.fieldTransforms)}}class r_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Gt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function i_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K()}}class Tu{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Bu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new Tu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ku({path:r,Qu:!1});return i.$u(e),i}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ku({path:r,Qu:!1});return i.Bu(),i}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return ta(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(i_(this.Lu)&&UA.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class $A{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Na(e)}ju(e,t,r,i=!1){return new Tu({Lu:e,methodName:t,zu:r,path:Ie.emptyPath(),Qu:!1,Gu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Fa(n){const e=n._freezeSettings(),t=Na(n._databaseId);return new $A(n._databaseId,!!e.ignoreUndefinedProperties,t)}function jA(n,e,t,r,i,s={}){const o=n.ju(s.merge||s.mergeFields?2:0,e,t,i);Au("Data must be an object, but it was:",o,r);const c=o_(r,o);let l,d;if(s.merge)l=new Je(o.fieldMask),d=o.fieldTransforms;else if(s.mergeFields){const p=[];for(const g of s.mergeFields){const w=pl(e,g,t);if(!o.contains(w))throw new U(N.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);c_(p,w)||p.push(w)}l=new Je(p),d=o.fieldTransforms.filter(g=>l.covers(g.field))}else l=null,d=o.fieldTransforms;return new BA(new qe(c),l,d)}class Ua extends Ma{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ua}}class bu extends Ma{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new Jr(e.serializer,Wm(e.serializer,this.Ju));return new Zm(e.path,t)}isEqual(e){return e instanceof bu&&this.Ju===e.Ju}}function qA(n,e,t,r){const i=n.ju(1,e,t);Au("Data must be an object, but it was:",i,r);const s=[],o=qe.empty();bn(r,(l,d)=>{const p=Ru(e,l,t);d=_e(d);const g=i.Uu(p);if(d instanceof Ua)s.push(p);else{const w=Ns(d,g);w!=null&&(s.push(p),o.set(p,w))}});const c=new Je(s);return new r_(o,c,i.fieldTransforms)}function zA(n,e,t,r,i,s){const o=n.ju(1,e,t),c=[pl(e,r,t)],l=[i];if(s.length%2!=0)throw new U(N.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<s.length;w+=2)c.push(pl(e,s[w])),l.push(s[w+1]);const d=[],p=qe.empty();for(let w=c.length-1;w>=0;--w)if(!c_(d,c[w])){const A=c[w];let C=l[w];C=_e(C);const D=o.Uu(A);if(C instanceof Ua)d.push(A);else{const P=Ns(C,D);P!=null&&(d.push(A),p.set(A,P))}}const g=new Je(d);return new r_(p,g,o.fieldTransforms)}function s_(n,e,t,r=!1){return Ns(t,n.ju(r?4:3,e))}function Ns(n,e){if(a_(n=_e(n)))return Au("Unsupported field value:",e,n),o_(n,e);if(n instanceof Ma)return function(r,i){if(!i_(i.Lu))throw i.Wu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Wu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const c of r){let l=Ns(c,i.Ku(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=_e(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Wm(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=we.fromDate(r);return{timestampValue:Xr(i.serializer,s)}}if(r instanceof we){const s=new we(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Xr(i.serializer,s)}}if(r instanceof wu)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ei)return{bytesValue:og(i.serializer,r._byteString)};if(r instanceof Ye){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Zl(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Eu)return function(o,c){return{mapValue:{fields:{[ql]:{stringValue:zl},[Kr]:{arrayValue:{values:o.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Hl(c.serializer,d)})}}}}}}(r,i);throw i.Wu(`Unsupported field value: ${Va(r)}`)}(n,e)}function o_(n,e){const t={};return Am(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):bn(n,(r,i)=>{const s=Ns(i,e.qu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function a_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof we||n instanceof wu||n instanceof ei||n instanceof Ye||n instanceof Ma||n instanceof Eu)}function Au(n,e,t){if(!a_(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=Va(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function pl(n,e,t){if((e=_e(e))instanceof La)return e._internalPath;if(typeof e=="string")return Ru(n,e);throw ta("Field path arguments must be of type string or ",n,!1,void 0,t)}const GA=new RegExp("[~\\*/\\[\\]]");function Ru(n,e,t){if(e.search(GA)>=0)throw ta(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new La(...e.split("."))._internalPath}catch{throw ta(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ta(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new U(N.INVALID_ARGUMENT,c+n+l)}function c_(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ye(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new KA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ba("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class KA extends Su{data(){return super.data()}}function Ba(n,e){return typeof e=="string"?Ru(n,e):e instanceof La?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(N.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Pu{}class $a extends Pu{}function At(n,e,...t){let r=[];e instanceof Pu&&r.push(e),r=r.concat(t),function(s){const o=s.filter(l=>l instanceof Cu).length,c=s.filter(l=>l instanceof ja).length;if(o>1||o>0&&c>0)throw new U(N.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class ja extends $a{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ja(e,t,r)}_apply(e){const t=this._parse(e);return u_(e._query,t),new Pt(e.firestore,e.converter,nl(e._query,t))}_parse(e){const t=Fa(e.firestore);return function(s,o,c,l,d,p,g){let w;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new U(N.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){jf(g,p);const C=[];for(const D of g)C.push($f(l,s,D));w={arrayValue:{values:C}}}else w=$f(l,s,g)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||jf(g,p),w=s_(c,o,g,p==="in"||p==="not-in");return oe.create(d,p,w)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ps(n,e,t){const r=e,i=Ba("where",n);return ja._create(i,r,t)}class Cu extends Pu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Cu(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:fe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const l of c)u_(o,l),o=nl(o,l)}(e._query,t),new Pt(e.firestore,e.converter,nl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ku extends $a{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ku(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new U(N.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new U(N.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ds(s,o)}(e._query,this._field,this._direction);return new Pt(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new lr(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function Rt(n,e="asc"){const t=e,r=Ba("orderBy",n);return ku._create(r,t)}class Du extends $a{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Du(e,t,r)}_apply(e){return new Pt(e.firestore,e.converter,Go(e._query,this._limit,this._limitType))}}function qt(n){return OA("limit",n),Du._create("limit",n,"F")}class Nu extends $a{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Nu(e,t,r)}_apply(e){const t=WA(e,this.type,this._docOrFields,this._inclusive);return new Pt(e.firestore,e.converter,function(i,s){return new lr(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function HA(...n){return Nu._create("startAfter",n,!1)}function WA(n,e,t,r){if(t[0]=_e(t[0]),t[0]instanceof Su)return function(s,o,c,l,d){if(!l)throw new U(N.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const p=[];for(const g of Vr(s))if(g.field.isKeyField())p.push(Xn(o,l.key));else{const w=l.data.field(g.field);if(Ea(w))throw new U(N.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+g.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(w===null){const A=g.field.canonicalString();throw new U(N.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${A}' (used as the orderBy) does not exist.`)}p.push(w)}return new vn(p,d)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=Fa(n.firestore);return function(o,c,l,d,p,g){const w=o.explicitOrderBy;if(p.length>w.length)throw new U(N.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const A=[];for(let C=0;C<p.length;C++){const D=p[C];if(w[C].field.isKeyField()){if(typeof D!="string")throw new U(N.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof D}`);if(!Kl(o)&&D.indexOf("/")!==-1)throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${D}' contains a slash.`);const P=o.path.child(ue.fromString(D));if(!z.isDocumentKey(P))throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${P}' is not because it contains an odd number of segments.`);const q=new z(P);A.push(Xn(c,q))}else{const P=s_(l,d,D);A.push(P)}}return new vn(A,g)}(n._query,n.firestore._databaseId,i,e,t,r)}}function $f(n,e,t){if(typeof(t=_e(t))=="string"){if(t==="")throw new U(N.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Kl(e)&&t.indexOf("/")!==-1)throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ue.fromString(t));if(!z.isDocumentKey(r))throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Xn(n,new z(r))}if(t instanceof Ye)return Xn(n,t._key);throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Va(t)}.`)}function jf(n,e){if(!Array.isArray(n)||n.length===0)throw new U(N.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function u_(n,e){const t=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(N.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(N.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class QA{convertValue(e,t="none"){switch(_n(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ye(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(jt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw K()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return bn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[Kr].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>ye(o.doubleValue));return new Eu(s)}convertGeoPoint(e){return new wu(ye(e.latitude),ye(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Ta(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(cs(e));default:return null}}convertTimestamp(e){const t=$t(e);return new we(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ue.fromString(e);W(gg(r));const i=new Jn(r.get(1),r.get(3)),s=new z(r.popFirst(5));return i.isEqual(t)||We(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YA(n,e,t){let r;return r=n?n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class d_ extends Su{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ro(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ba("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Ro extends d_{data(e={}){return super.data(e)}}class h_{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Bi(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ro(this._firestore,this._userDataWriter,r.key,r,new Bi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const l=new Ro(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Bi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const l=new Ro(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Bi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return c.type!==0&&(d=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),p=o.indexOf(c.doc.key)),{type:JA(c.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function JA(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f_(n){n=Et(n,Ye);const e=Et(n.firestore,ir);return NA(Oa(e),n._key).then(t=>m_(e,n,t))}class xu extends QA{constructor(e){super(),this.firestore=e}convertBytes(e){return new ei(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ye(this.firestore,null,t)}}function ti(n){n=Et(n,Pt);const e=Et(n.firestore,ir),t=Oa(e),r=new xu(e);return l_(n._query),xA(t,n._query).then(i=>new h_(e,r,n,i))}function Kt(n,e,t,...r){n=Et(n,Ye);const i=Et(n.firestore,ir),s=Fa(i);let o;return o=typeof(e=_e(e))=="string"||e instanceof La?zA(s,"updateDoc",n._key,e,t,r):qA(s,"updateDoc",n._key,e),p_(i,[o.toMutation(n._key,Xe.exists(!0))])}function Ht(n,e){const t=Et(n.firestore,ir),r=ut(n),i=YA(n.converter,e);return p_(t,[jA(Fa(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Xe.exists(!1))]).then(()=>r)}function xs(n,...e){var t,r,i;n=_e(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Bf(e[o])||(s=e[o],o++);const c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Bf(e[o])){const g=e[o];e[o]=(t=g.next)===null||t===void 0?void 0:t.bind(g),e[o+1]=(r=g.error)===null||r===void 0?void 0:r.bind(g),e[o+2]=(i=g.complete)===null||i===void 0?void 0:i.bind(g)}let l,d,p;if(n instanceof Ye)d=Et(n.firestore,ir),p=Rs(n._key.path),l={next:g=>{e[o]&&e[o](m_(d,n,g))},error:e[o+1],complete:e[o+2]};else{const g=Et(n,Pt);d=Et(g.firestore,ir),p=g._query;const w=new xu(d);l={next:A=>{e[o]&&e[o](new h_(d,w,g,A))},error:e[o+1],complete:e[o+2]},l_(n._query)}return function(w,A,C,D){const P=new vu(D),q=new gu(A,P,C);return w.asyncQueue.enqueueAndForget(async()=>fu(await ea(w),q)),()=>{P.su(),w.asyncQueue.enqueueAndForget(async()=>pu(await ea(w),q))}}(Oa(d),p,c,l)}function p_(n,e){return function(r,i){const s=new wt;return r.asyncQueue.enqueueAndForget(async()=>IA(await DA(r),i,s)),s.promise}(Oa(n),e)}function m_(n,e,t){const r=t.docs.get(e._key),i=new xu(n);return new d_(n,i,e._key,r,new Bi(t.hasPendingWrites,t.fromCache),e.converter)}class XA{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=g_(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function ZA(n){return new XA(n)}class e0{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Zo.provider,this._offlineComponentProvider={build:t=>new PA(t,e?.cacheSizeBytes,this.forceOwnership)}}}function g_(n){return new e0(n?.forceOwnership)}function An(n){return new bu("increment",n)}(function(e,t=!0){(function(i){ui=i})(ai),Ut(new Tt("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),c=new ir(new SE(r.getProvider("auth-internal")),new kE(o,r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new U(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Jn(d.options.projectId,p)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),ft(Eh,Th,e),ft(Eh,Th,"esm2017")})();var t0="firebase",n0="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ft(t0,n0,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml=new Map,__={activated:!1,tokenObservers:[]},r0={initialized:!1,enabled:!1};function De(n){return ml.get(n)||Object.assign({},__)}function i0(n,e){return ml.set(n,e),ml.get(n)}function qa(){return r0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y_="https://content-firebaseappcheck.googleapis.com/v1",s0="exchangeRecaptchaV3Token",o0="exchangeDebugToken",qf={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},a0=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c0{constructor(e,t,r,i,s){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=i,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=i,i>s)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Yi,this.pending.promise.catch(t=>{}),await l0(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Yi,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function l0(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u0={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},Ze=new si("appCheck","AppCheck",u0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zf(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function Vu(n){if(!De(n).activated)throw Ze.create("use-before-activation",{appName:n.name})}function v_(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),i=Math.floor((e-t*3600*24-r*3600)/60),s=e-t*3600*24-r*3600-i*60;let o="";return t&&(o+=so(t)+"d:"),r&&(o+=so(r)+"h:"),o+=so(i)+"m:"+so(s)+"s",o}function so(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ou({url:n,body:e},t){const r={"Content-Type":"application/json"},i=t.getImmediate({optional:!0});if(i){const g=await i.getHeartbeatsHeader();g&&(r["X-Firebase-Client"]=g)}const s={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,s)}catch(g){throw Ze.create("fetch-network-error",{originalErrorMessage:g?.message})}if(o.status!==200)throw Ze.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(g){throw Ze.create("fetch-parse-error",{originalErrorMessage:g?.message})}const l=c.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw Ze.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const d=Number(l[1])*1e3,p=Date.now();return{token:c.token,expireTimeMillis:p+d,issuedAtTimeMillis:p}}function d0(n,e){const{projectId:t,appId:r,apiKey:i}=n.options;return{url:`${y_}/projects/${t}/apps/${r}:${s0}?key=${i}`,body:{recaptcha_v3_token:e}}}function I_(n,e){const{projectId:t,appId:r,apiKey:i}=n.options;return{url:`${y_}/projects/${t}/apps/${r}:${o0}?key=${i}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h0="firebase-app-check-database",f0=1,ms="firebase-app-check-store",w_="debug-token";let oo=null;function E_(){return oo||(oo=new Promise((n,e)=>{try{const t=indexedDB.open(h0,f0);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var i;e(Ze.create("storage-open",{originalErrorMessage:(i=r.target.error)===null||i===void 0?void 0:i.message}))},t.onupgradeneeded=r=>{const i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(ms,{keyPath:"compositeKey"})}}}catch(t){e(Ze.create("storage-open",{originalErrorMessage:t?.message}))}}),oo)}function p0(n){return b_(A_(n))}function m0(n,e){return T_(A_(n),e)}function g0(n){return T_(w_,n)}function _0(){return b_(w_)}async function T_(n,e){const r=(await E_()).transaction(ms,"readwrite"),s=r.objectStore(ms).put({compositeKey:n,value:e});return new Promise((o,c)=>{s.onsuccess=l=>{o()},r.onerror=l=>{var d;c(Ze.create("storage-set",{originalErrorMessage:(d=l.target.error)===null||d===void 0?void 0:d.message}))}})}async function b_(n){const t=(await E_()).transaction(ms,"readonly"),i=t.objectStore(ms).get(n);return new Promise((s,o)=>{i.onsuccess=c=>{const l=c.target.result;s(l?l.value:void 0)},t.onerror=c=>{var l;o(Ze.create("storage-get",{originalErrorMessage:(l=c.target.error)===null||l===void 0?void 0:l.message}))}})}function A_(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs=new ha("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function y0(n){if(da()){let e;try{e=await p0(n)}catch(t){gs.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function Cc(n,e){return da()?m0(n,e).catch(t=>{gs.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function v0(){let n;try{n=await _0()}catch{}if(n)return n;{const e=crypto.randomUUID();return g0(e).catch(t=>gs.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lu(){return qa().enabled}async function Mu(){const n=qa();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function I0(){const n=fp(),e=qa();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new Yi;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(v0())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w0={error:"UNKNOWN_ERROR"};function E0(n){return bl.encodeString(JSON.stringify(n),!1)}async function gl(n,e=!1){const t=n.app;Vu(t);const r=De(t);let i=r.token,s;if(i&&!kr(i)&&(r.token=void 0,i=void 0),!i){const l=await r.cachedTokenPromise;l&&(kr(l)?i=l:await Cc(t,void 0))}if(!e&&i&&kr(i))return{token:i.token};let o=!1;if(Lu()){r.exchangeTokenPromise||(r.exchangeTokenPromise=Ou(I_(t,await Mu()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),o=!0);const l=await r.exchangeTokenPromise;return await Cc(t,l),r.token=l,{token:l.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),o=!0),i=await De(t).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"?gs.warn(l.message):gs.error(l),s=l}let c;return i?s?kr(i)?c={token:i.token,internalError:s}:c=Kf(s):(c={token:i.token},r.token=i,await Cc(t,i)):c=Kf(s),o&&P_(t,c),c}async function T0(n){const e=n.app;Vu(e);const{provider:t}=De(e);if(Lu()){const r=await Mu(),{token:i}=await Ou(I_(e,r),n.heartbeatServiceProvider);return{token:i}}else{const{token:r}=await t.getToken();return{token:r}}}function R_(n,e,t,r){const{app:i}=n,s=De(i),o={next:t,error:r,type:e};if(s.tokenObservers=[...s.tokenObservers,o],s.token&&kr(s.token)){const c=s.token;Promise.resolve().then(()=>{t({token:c.token}),Gf(n)}).catch(()=>{})}s.cachedTokenPromise.then(()=>Gf(n))}function S_(n,e){const t=De(n),r=t.tokenObservers.filter(i=>i.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function Gf(n){const{app:e}=n,t=De(e);let r=t.tokenRefresher;r||(r=b0(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function b0(n){const{app:e}=n;return new c0(async()=>{const t=De(e);let r;if(t.token?r=await gl(n,!0):r=await gl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=De(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const i=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,i),Math.max(0,r-Date.now())}else return 0},qf.RETRIAL_MIN_WAIT,qf.RETRIAL_MAX_WAIT)}function P_(n,e){const t=De(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function kr(n){return n.expireTimeMillis-Date.now()>0}function Kf(n){return{token:E0(w0),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A0{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=De(this.app);for(const t of e)S_(this.app,t.next);return Promise.resolve()}}function R0(n,e){return new A0(n,e)}function S0(n){return{getToken:e=>gl(n,e),getLimitedUseToken:()=>T0(n),addTokenListener:e=>R_(n,"INTERNAL",e),removeTokenListener:e=>S_(n.app,e)}}const P0="@firebase/app-check",C0="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k0="https://www.google.com/recaptcha/api.js";function D0(n,e){const t=new Yi,r=De(n);r.reCAPTCHAState={initialized:t};const i=N0(n),s=zf(!1);return s?Hf(n,e,s,i,t):O0(()=>{const o=zf(!1);if(!o)throw new Error("no recaptcha");Hf(n,e,o,i,t)}),t.promise}function Hf(n,e,t,r,i){t.ready(()=>{V0(n,e,t,r),i.resolve(t)})}function N0(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function x0(n){Vu(n);const t=await De(n).reCAPTCHAState.initialized.promise;return new Promise((r,i)=>{const s=De(n).reCAPTCHAState;t.ready(()=>{r(t.execute(s.widgetId,{action:"fire_app_check"}))})})}function V0(n,e,t,r){const i=t.render(r,{sitekey:e,size:"invisible",callback:()=>{De(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{De(n).reCAPTCHAState.succeeded=!1}}),s=De(n);s.reCAPTCHAState=Object.assign(Object.assign({},s.reCAPTCHAState),{widgetId:i})}function O0(n){const e=document.createElement("script");e.src=k0,e.onload=n,document.head.appendChild(e)}/**
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
 */class Fu{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;M0(this._throttleData);const i=await x0(this._app).catch(o=>{throw Ze.create("recaptcha-error")});if(!(!((e=De(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw Ze.create("recaptcha-error");let s;try{s=await Ou(d0(this._app,i),this._heartbeatServiceProvider)}catch(o){throw!((t=o.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=L0(Number((r=o.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),Ze.create("throttled",{time:v_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,s}initialize(e){this._app=e,this._heartbeatServiceProvider=oi(e,"heartbeat"),D0(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Fu?this._siteKey===e._siteKey:!1}}function L0(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+a0,httpStatus:n};{const t=e?e.backoffCount:0,r=rv(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function M0(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw Ze.create("throttled",{time:v_(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F0(n=Rl(),e){n=_e(n);const t=oi(n,"app-check");if(qa().initialized||I0(),Lu()&&Mu().then(i=>console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(s.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&s.provider.isEqual(e.provider))return i;throw Ze.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return U0(n,e.provider,e.isTokenAutoRefreshEnabled),De(n).isTokenAutoRefreshEnabled&&R_(r,"INTERNAL",()=>{}),r}function U0(n,e,t){const r=i0(n,Object.assign({},__));r.activated=!0,r.provider=e,r.cachedTokenPromise=y0(n).then(i=>(i&&kr(i)&&(r.token=i,P_(n,{token:i.token})),i)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const B0="app-check",Wf="app-check-internal";function $0(){Ut(new Tt(B0,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return R0(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(Wf).initialize()})),Ut(new Tt(Wf,n=>{const e=n.getProvider("app-check").getImmediate();return S0(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ft(P0,C0)}$0();/**
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
 */const j0="type.googleapis.com/google.protobuf.Int64Value",q0="type.googleapis.com/google.protobuf.UInt64Value";function C_(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function na(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>na(e));if(typeof n=="function"||typeof n=="object")return C_(n,e=>na(e));throw new Error("Data cannot be encoded in JSON: "+n)}function ni(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case j0:case q0:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>ni(e)):typeof n=="function"||typeof n=="object"?C_(n,e=>ni(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uu="functions";/**
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
 */const Qf={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class et extends St{constructor(e,t,r){super(`${Uu}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,et.prototype)}}function z0(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function ra(n,e){let t=z0(n),r=t,i;try{const s=e&&e.error;if(s){const o=s.status;if(typeof o=="string"){if(!Qf[o])return new et("internal","internal");t=Qf[o],r=o}const c=s.message;typeof c=="string"&&(r=c),i=s.details,i!==void 0&&(i=ni(i))}}catch{}return t==="ok"?null:new et(t,r,i)}/**
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
 */class G0{constructor(e,t,r,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,at(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(s=>this.auth=s,()=>{}),this.messaging||r.get().then(s=>this.messaging=s,()=>{}),this.appCheck||i?.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),i=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:i}}}/**
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
 */const _l="us-central1",K0=/^data: (.*?)(?:\n|$)/;function H0(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new et("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class W0{constructor(e,t,r,i,s=_l,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new G0(e,t,r,i),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(s);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=_l}catch{this.customDomain=null,this.region=s}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function Q0(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function Y0(n,e,t){const r=i=>X0(n,e,i,{});return r.stream=(i,s)=>eR(n,e,i,s),r}async function J0(n,e,t,r){t["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let s=null;try{s=await i.json()}catch{}return{status:i.status,json:s}}async function k_(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function X0(n,e,t,r){const i=n._url(e);return Z0(n,i,t,r)}async function Z0(n,e,t,r){t=na(t);const i={data:t},s=await k_(n,r),o=r.timeout||7e4,c=H0(o),l=await Promise.race([J0(e,i,s,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!l)throw new et("cancelled","Firebase Functions instance was deleted.");const d=ra(l.status,l.json);if(d)throw d;if(!l.json)throw new et("internal","Response is not valid JSON object.");let p=l.json.data;if(typeof p>"u"&&(p=l.json.result),typeof p>"u")throw new et("internal","Response is missing data field.");return{data:ni(p)}}function eR(n,e,t,r){const i=n._url(e);return tR(n,i,t,r||{})}async function tR(n,e,t,r){var i;t=na(t);const s={data:t},o=await k_(n,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(s),headers:o,signal:r?.signal})}catch(A){if(A instanceof Error&&A.name==="AbortError"){const D=new et("cancelled","Request was cancelled.");return{data:Promise.reject(D),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(D)}}}}}}const C=ra(0,null);return{data:Promise.reject(C),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(C)}}}}}}let l,d;const p=new Promise((A,C)=>{l=A,d=C});(i=r?.signal)===null||i===void 0||i.addEventListener("abort",()=>{const A=new et("cancelled","Request was cancelled.");d(A)});const g=c.body.getReader(),w=nR(g,l,d,r?.signal);return{stream:{[Symbol.asyncIterator](){const A=w.getReader();return{async next(){const{value:C,done:D}=await A.read();return{value:C,done:D}},async return(){return await A.cancel(),{done:!0,value:void 0}}}}},data:p}}function nR(n,e,t,r){const i=(o,c)=>{const l=o.match(K0);if(!l)return;const d=l[1];try{const p=JSON.parse(d);if("result"in p){e(ni(p.result));return}if("message"in p){c.enqueue(ni(p.message));return}if("error"in p){const g=ra(0,p);c.error(g),t(g);return}}catch(p){if(p instanceof et){c.error(p),t(p);return}}},s=new TextDecoder;return new ReadableStream({start(o){let c="";return l();async function l(){if(r?.aborted){const d=new et("cancelled","Request was cancelled");return o.error(d),t(d),Promise.resolve()}try{const{value:d,done:p}=await n.read();if(p){c.trim()&&i(c.trim(),o),o.close();return}if(r?.aborted){const w=new et("cancelled","Request was cancelled");o.error(w),t(w),await n.cancel();return}c+=s.decode(d,{stream:!0});const g=c.split(`
`);c=g.pop()||"";for(const w of g)w.trim()&&i(w.trim(),o);return l()}catch(d){const p=d instanceof et?d:ra(0,null);o.error(p),t(p)}}},cancel(){return n.cancel()}})}const Yf="@firebase/functions",Jf="0.12.2";/**
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
 */const rR="auth-internal",iR="app-check-internal",sR="messaging-internal";function oR(n){const e=(t,{instanceIdentifier:r})=>{const i=t.getProvider("app").getImmediate(),s=t.getProvider(rR),o=t.getProvider(sR),c=t.getProvider(iR);return new W0(i,s,o,c,r)};Ut(new Tt(Uu,e,"PUBLIC").setMultipleInstances(!0)),ft(Yf,Jf,n),ft(Yf,Jf,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aR(n=Rl(),e=_l){const r=oi(_e(n),Uu).getImmediate({identifier:e}),i=Fy("functions");return i&&cR(r,...i),r}function cR(n,e,t){Q0(_e(n),e,t)}function lR(n,e,t){return Y0(_e(n),e)}oR();const uR={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},dR="altorra-crm",za=Ip(uR,dR);F0(za,{provider:new Fu("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const ia=TE(za),de=MA(za,{localCache:ZA({tabManager:g_({})})}),hR=aR(za,"us-central1");function Lr(n){const e=G.get().permissions||[];return e.includes("*")||e.includes(n)}function fR(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function pR(n){try{const e=await f_(ut(de,"usuarios",n.uid)),t=e.exists()?e.data():null;G.set({user:n,profile:t,permissions:fR(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),G.set({user:n,profile:null,permissions:[],ready:!0})}}function mR(){lw(ia,Qp).catch(()=>{}),hw(ia,n=>{n?pR(n):G.set({user:null,profile:null,permissions:[],ready:!0})})}const gR={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function _R(n,e){G.set({authError:null});try{await cw(ia,String(n).trim(),e)}catch(t){const r=gR[t&&t.code]||"No se pudo iniciar sesión.";throw G.set({authError:r}),t}}async function yR(){if(G.get().mock){G.set({user:null,profile:null,permissions:[]});return}await fw(ia)}function kc(){const{profile:n,user:e}=G.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function vR(){const{profile:n}=G.get();return n&&(n.cargo||n.roleName)||"Asesor"}const IR=["bandeja","pipeline","agenda","reportes","contactos"];function D_(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return IR.includes(e)?e:"bandeja"}function wR(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function ER(n){const e=()=>n(D_());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function f(n,e={},t=[]){const r=document.createElement(n);for(const[i,s]of Object.entries(e))s==null||s===!1||(i==="class"?r.className=s:i==="html"?r.innerHTML=s:i==="text"?r.textContent=s:i==="dataset"?Object.assign(r.dataset,s):i==="style"&&typeof s=="object"?Object.assign(r.style,s):i.startsWith("on")&&typeof s=="function"?r.addEventListener(i.slice(2).toLowerCase(),s):r.setAttribute(i,s===!0?"":String(s)));for(const i of[].concat(t))i==null||i===!1||i===""||r.append(i.nodeType?i:document.createTextNode(String(i)));return r}function he(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let Mr=null;function N_(n){Mr&&!Mr.contains(n.target)&&sa()}function x_(n){n.key==="Escape"&&sa()}function sa(){Mr&&(Mr.remove(),Mr=null,document.removeEventListener("mousedown",N_,!0),window.removeEventListener("keydown",x_,!0))}function xt(n,e,t,r={}){sa();const i=f("div",{class:"popover",role:"menu"});r.title&&i.append(f("div",{class:"popover__title",text:r.title})),e.forEach(o=>{if(o.divider){i.append(f("div",{class:"popover__divider"}));return}const c=f("button",{class:"popover__item"+(o.active?" is-active":""),type:"button",role:"menuitem"},[o.icon?f("span",{class:"popover__icon",text:o.icon}):null,f("span",{class:"u-grow u-truncate",text:o.label}),o.hint?f("span",{class:"popover__hint u-caption",text:o.hint}):null]);c.addEventListener("click",l=>{l.stopPropagation(),sa(),t(o)}),i.append(c)}),document.body.append(i),TR(i,n),Mr=i,setTimeout(()=>{document.addEventListener("mousedown",N_,!0),window.addEventListener("keydown",x_,!0)},0);const s=i.querySelector(".popover__item");s&&s.focus()}function TR(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,i=n.offsetHeight;let s=t.bottom+6,o=t.right-r;o<8&&(o=8),o+r>window.innerWidth-8&&(o=window.innerWidth-r-8),s+i>window.innerHeight-8&&(s=t.top-i-6),n.style.top=`${Math.max(8,s)}px`,n.style.left=`${Math.max(8,o)}px`}function Vs(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function bR(n){return String(n||"").replace(/\D/g,"")}function V_(n,e){const t=bR(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function O_(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function ri(n){const e=O_(n);return e===1/0?1/0:e/864e5}function Wn(n){const e=O_(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const i=Math.floor(r/24);return i===1?"ayer":i<7?`hace ${i} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function AR(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Dc(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),i=t%60;return i?`${r} h ${i} min`:`${r} h`}function $i(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function oa(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const RR="0.4.1",SR=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0}],Nc={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos"};function PR(n){const e={},t=f("div",{class:"sidebar__brand"},[f("span",{class:"sidebar__logo",text:"ALTORRA"}),f("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=f("nav",{class:"sidebar__nav","aria-label":"Secciones"});SR.forEach(D=>{const P=f("button",{class:"navitem",type:"button",disabled:!D.ready},[f("span",{class:"navitem__icon","aria-hidden":"true",text:D.icon}),f("span",{class:"navitem__label",text:D.label}),D.ready?null:f("span",{class:"navitem__soon",text:"Pronto"})]);D.ready&&P.addEventListener("click",()=>wR(D.id)),e[D.id]=P,r.append(P)});const i=f("aside",{class:"sidebar"},[t,r,f("div",{class:"sidebar__foot u-caption u-faint"},[`v${RR} · Fase 4`])]),s=f("h1",{class:"topbar__h",text:Nc.bandeja}),o=f("span",{class:"topbar__crumb u-caption u-faint",text:G.get().mock?"modo demo":"tiempo real"}),c=f("div",{class:"topbar__title"},[s,o]),l=f("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[f("span",{"aria-hidden":"true",text:G.get().theme==="dark"?"☀️":"🌙"})]);l.addEventListener("click",()=>{const D=Dy();l.firstChild.textContent=D==="dark"?"☀️":"🌙"});const d=f("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Vs(kc())}),f("span",{class:"usermenu__meta"},[f("span",{class:"usermenu__name u-truncate",text:kc()}),f("span",{class:"usermenu__role u-caption u-faint u-truncate",text:vR()})])]);d.addEventListener("click",()=>{xt(d,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],D=>{D.value==="logout"&&yR()},{title:kc()})});const p=f("header",{class:"topbar"},[c,f("div",{class:"topbar__actions u-row"},[l,d])]),g=f("main",{class:"outlet",id:"outlet"}),w=f("div",{id:"detail-root"}),A=f("div",{class:"app-shell"},[i,f("div",{class:"app-main"},[p,g]),w]);he(n),n.removeAttribute("aria-busy"),n.append(A);function C(D){Object.entries(e).forEach(([P,q])=>{const V=P===D;q.classList.toggle("is-active",V),V?q.setAttribute("aria-current","page"):q.removeAttribute("aria-current")}),s.textContent=Nc[D]||Nc.bandeja}return{outlet:g,detailRoot:w,setActive:C}}function CR(n){const e=f("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=f("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=f("div",{class:"login__error",role:"alert",hidden:!0}),i=f("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),s=f("form",{class:"login__form"},[f("label",{class:"field"},[f("span",{class:"field__label",text:"Correo"}),e]),f("label",{class:"field"},[f("span",{class:"field__label",text:"Contraseña"}),t]),r,i]);s.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,i.disabled=!0,i.textContent="Entrando…";try{await _R(e.value,t.value)}catch{r.textContent=G.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,i.disabled=!1,i.textContent="Entrar"}});const o=f("div",{class:"login surface"},[f("div",{class:"login__brand"},[f("span",{class:"login__logo",text:"ALTORRA"}),f("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),f("h1",{class:"login__title",text:"Bienvenido"}),f("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),s,f("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);he(n),n.removeAttribute("aria-busy"),n.append(f("div",{class:"login-wrap"},[o])),setTimeout(()=>e.focus(),50)}const kR=()=>document.getElementById("toast-root"),Xf={ok:"✓",error:"⚠",info:"ℹ"};function Y(n,e="info",t=3200){const r=kR();if(!r)return;const i=document.createElement("div");i.className=`toast toast--${e}`,i.setAttribute("role",e==="error"?"alert":"status");const s=document.createElement("span");s.setAttribute("aria-hidden","true"),s.textContent=Xf[e]||Xf.info;const o=document.createElement("span");o.className="u-grow",o.textContent=n,i.append(s,o),r.appendChild(i);const c=()=>{i.classList.add("is-leaving"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},l=setTimeout(c,t);i.addEventListener("click",()=>{clearTimeout(l),c()})}const DR=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],NR=["cita","test_drive","test-drive","visita","agendar","peritaje"],xR=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],VR=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],OR={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function Ga(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return VR.some(i=>e.includes(i)||t.includes(i))?r="pqr":t.includes("cita")||NR.some(i=>e.includes(i))?r="cita":xR.some(i=>e.includes(i))&&(r="solicitud"),{type:r,...OR[r]}}function Bu(n){const e=String(n.sourceDetail||"").toLowerCase();return DR.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const LR={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function _s(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...LR[t]}}const MR=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],FR=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],ao={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function L_(n){const e=ii(n.status),{type:t}=Ga(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(ao[t]||ao.lead));const i=r-Date.now(),s=ao[t]||ao.lead;let o="ok";return e?o="ok":i<=0?o="late":i<s*.25&&(o="warn"),{state:o,dueAt:r,remainingMs:i,closed:e}}const yl=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"calificado",label:"Calificado",badge:"ok"},{id:"no_calificado",label:"No calificado",badge:""},{id:"convertido",label:"Convertido",badge:"ok"},{id:"perdido",label:"Perdido",badge:"danger"}],UR=yl.reduce((n,e)=>(n[e.id]=e,n),{});function So(n){return UR[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function ii(n){return n==="convertido"||n==="perdido"||n==="no_calificado"}function M_(n){return!n.status||n.status==="nuevo"}const vl={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},jn=n=>Math.max(0,Math.min(1,n));function BR(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return Bu(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),jn(t)}function $R(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const i=(r.match(/\d[\d.,]{5,}/g)||[]).map(s=>parseInt(s.replace(/\D/g,""),10)).filter(s=>s>0);i.length&&(e=Math.max(e,Math.max(...i)/5e7))}return jn(e)}function jR(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(ri(r)>30||e.add(String(r).slice(0,10)))}return jn(e.size/8)}function F_(n,e=[],t=null){const r=Array.isArray(e)?e:[],i={intent:BR(n),interactions:jn(r.length/6),recency:n.lastActivityAt?jn(1-ri(n.lastActivityAt)/30):0,frequency:jR(r),economic:$R(r),age:n.createdAt?jn(ri(n.createdAt)/60):0,engagement:t&&Number(t.score)?jn(t.score/100):0};let s=0;for(const c of Object.keys(vl))s+=i[c]*vl[c];const o=Math.round(s*100);return{score:o,rating:qR(o),factors:i}}function qR(n){return n>=70?"hot":n>=40?"warm":"cold"}const Fr={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},Zf={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},zR=vl;function U_(n,e={}){const t=Number(e.score)||0,{type:r}=Ga(n),i=ri(n.createdAt),s=ri(n.lastActivityAt),o=M_(n),c=ii(n.status),l=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&o,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&o&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:Bu(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:o&&i<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&s>=2&&s<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:s>=30&&s!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],p=l.filter(g=>g.when).sort((g,w)=>w.priority-g.priority)[0]||l[l.length-1];return{id:p.id,label:p.label,reason:p.reason,icon:p.icon,priority:p.priority}}function B_(n,e=[]){const{score:t,rating:r,factors:i}=F_(n,e,null);return{...n,_score:t,_rating:r,_factors:i,_type:Ga(n),_channel:_s(n),_sla:L_(n),_nba:U_(n,{score:t})}}function co(n){return n.map(e=>B_(e))}const Il=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function $_(n,e,t){switch(e){case"calientes":return M_(n)&&!ii(n.status)&&(n._rating==="hot"||Bu(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!ii(n.status);case"todo":default:return!0}}function GR(n,e){const t={};for(const r of Il)t[r.id]=0;for(const r of n)for(const i of Il)$_(r,i.id,e)&&t[i.id]++;return t}const lo={late:0,warn:1,ok:2};function KR(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return lo[t]!==lo[r]?lo[t]-lo[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function HR(n,{type:e,channel:t,status:r}){return n.filter(i=>!(e&&i._type.type!==e||t&&i._channel.key!==t||r&&(i.status||"nuevo")!==r))}function WR(n,e){const t=oa(e).trim();return t?n.filter(r=>oa([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function QR(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function YR(n,{queue:e,uid:t,filters:r,search:i,showClosed:s=!1}){let o=n.filter(l=>$_(l,e,t));o=HR(o,r),o=WR(o,i);let c=0;if(!s&&!r.status){const l=o.filter(d=>!ii(d.status)&&!d.archived);c=o.length-l.length,o=l}return o.sort(KR),{rows:o,hiddenClosed:c}}const sr=()=>new Date().toISOString(),$u=n=>({id:n.id,...n.data()});function JR({pageSize:n=40,onData:e,onError:t}){let r=null;const i=At(Ce(de,"leads"),Rt("createdAt","desc"),qt(n));return{unsubscribe:xs(i,o=>{const c=o.docs.map($u);r=o.docs[o.docs.length-1]||null,e(c,{hasMore:o.size>=n})},o=>{t&&t(o)}),getLastDoc:()=>r}}async function XR({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=At(Ce(de,"leads"),Rt("createdAt","desc"),HA(e),qt(n)),r=await ti(t);return{rows:r.docs.map($u),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function ZR(){const e=(await ti(Ce(de,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return G.set({team:e}),e}async function eS(n,e){await Kt(ut(de,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:sr(),updatedBy:or(),_version:An(1)})}async function tS(n,e,t={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const r=sr();await Kt(ut(de,"leads",n),{status:e,lastActivityAt:r,updatedAt:r,updatedBy:or(),_version:An(1)}),await Ht(Ce(de,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:or(),createdAt:r,_version:1})}async function ep(n,{type:e="nota",subject:t="",body:r="",direction:i="outbound",name:s=""}){await Ht(Ce(de,"activities"),{type:e,subject:t,body:r,status:"closed",direction:i,relatedTo:{type:"lead",id:n,name:s},ownerId:or(),createdAt:sr(),_version:1})}async function nS(n,{subject:e,dueAt:t,name:r=""}){await Ht(Ce(de,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:or(),createdAt:sr(),_version:1})}async function rS(){const n=new Date;n.setHours(23,59,59,999);const e=At(Ce(de,"activities"),ps("dueAt","<=",n.toISOString()),Rt("dueAt","desc"),qt(80));return(await ti(e)).docs.map($u).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,i)=>String(r.dueAt).localeCompare(String(i.dueAt)))}async function iS(n){await Kt(ut(de,"activities",n),{status:"closed",closedAt:sr(),closedBy:or()})}async function sS(n,e=!0){await Kt(ut(de,"leads",n),{archived:e,archivedAt:e?sr():null,updatedAt:sr(),updatedBy:or(),_version:An(1)})}async function oS(n){return(await lR(hR,"crmPurgeLead")({leadId:n})).data}function or(){const n=G.get().user;return n?n.uid:null}const aS="ventas",Ka=[{id:"nuevo",label:"Nuevo",prob:.1},{id:"contactado",label:"Contactado",prob:.2},{id:"cita_agendada",label:"Cita agendada",prob:.35},{id:"visito",label:"Visitó",prob:.5},{id:"test_drive",label:"Test drive",prob:.65},{id:"negociacion",label:"Negociación",prob:.8},{id:"financiacion",label:"Financiación",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],cS={id:"perdido",label:"Perdido",prob:0,lost:!0},Wi=Ka.filter(n=>!n.won),j_=[...Ka,cS].reduce((n,e)=>(n[e.id]=e,n),{});function q_(n){return j_[n]||Ka[0]}function aa(n){const e=j_[n];return e?e.prob:0}function ju(n){return Math.round((Number(n.amount)||0)*aa(n.stageId))}function z_(n){return n.reduce((e,t)=>e+(t.status==="open"?ju(t):0),0)}function lS(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function uS(n,e=14){return n.status==="open"&&ri(n.lastActivityAt)>e}function dS(n){const e={};for(const t of Wi)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}function qu(n){const e=n.vehicleOfInterestId||"",t=Ka[0];return{name:(n.fullName||"Oportunidad")+(e?" · "+e:""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:e||null,vehicleName:e||"",pipelineId:aS,stageId:t.id,stageName:t.label,status:"open",amount:0,currency:"COP",probability:t.prob,weightedAmount:0,expectedCloseDate:null,ownerId:n.ownerId||null,ownerName:n.ownerName||null,source:n.source||"web",nextStep:""}}const fi=()=>new Date().toISOString(),hS=n=>({id:n.id,...n.data()}),gn=()=>G.get().user?G.get().user.uid:null;function Ha(n,e,t){return Ht(Ce(de,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:gn(),createdAt:fi(),_version:1})}function fS({pageSize:n=100,onData:e,onError:t}){const r=At(Ce(de,"deals"),ps("status","==","open"),Rt("lastActivityAt","desc"),qt(n));return xs(r,i=>e(i.docs.map(hS)),i=>t&&t(i))}async function G_(n){const e=fi(),t=qu(n),r=await Ht(Ce(de,"deals"),{...t,weightedAmount:0,lastActivityAt:e,createdAt:e,updatedAt:e,createdBy:gn(),updatedBy:gn(),_version:1});return await Kt(ut(de,"leads",n.id),{status:"convertido",convertedTo:{dealId:r.id},lastActivityAt:e,updatedAt:e,updatedBy:gn(),_version:An(1)}),await Ha(r.id,t.contactName,"Oportunidad creada desde lead"),r.id}async function pS(n,e,t={}){const r=fi(),i=q_(e);await Kt(ut(de,"deals",n),{stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:r,updatedAt:r,updatedBy:gn(),_version:An(1)}),await Ha(n,t.contactName,"Etapa → "+i.label)}async function mS(n,e,t={}){const r=fi(),i=Math.max(0,Math.round(Number(e)||0));await Kt(ut(de,"deals",n),{amount:i,weightedAmount:Math.round(i*aa(t.stageId)),updatedAt:r,updatedBy:gn(),_version:An(1)})}async function gS(n,e={}){const t=fi();await Kt(ut(de,"deals",n),{status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:t,updatedAt:t,updatedBy:gn(),_version:An(1)}),await Ha(n,e.contactName,"🎉 Venta GANADA")}async function _S(n,e,t={}){const r=fi();await Kt(ut(de,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"").trim()||"Sin motivo",lastActivityAt:r,updatedAt:r,updatedBy:gn(),_version:An(1)}),await Ha(n,t.contactName,"Perdido: "+(e||"sin motivo"))}async function yS(n){const e=G.get().user?G.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await Ht(Ce(de,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const qn=n=>new Date(Date.now()-n*6e4).toISOString(),Te=n=>qn(n*60),te=n=>qn(n*60*24),vS=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],zu=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:qn(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:qn(18),lastActivityAt:qn(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:qn(5),contactId:"email_casalcedo_outlook_com",createdAt:Te(1),lastActivityAt:Te(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Te(-1),contactId:"email_diana_r_hotmail_com",createdAt:Te(5),lastActivityAt:Te(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Te(-3),contactId:"phone_573044455667",createdAt:Te(8),lastActivityAt:Te(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:te(-1),contactId:"email_lauraortiz_gmail_com",createdAt:te(1),lastActivityAt:Te(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:te(-1),contactId:"email_pnarango_empresa_co",createdAt:te(2),lastActivityAt:te(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:te(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:te(4),lastActivityAt:te(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:te(-2),contactId:"email_afcuesta_gmail_com",createdAt:te(6),lastActivityAt:te(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:te(-10),contactId:"email_cata_rios_gmail_com",createdAt:te(12),lastActivityAt:te(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Te(-2),contactId:"email_glopa_gmail_com",createdAt:Te(3),lastActivityAt:Te(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:te(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:te(10),lastActivityAt:te(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:te(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:te(15),lastActivityAt:te(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:te(19),contactId:"email_hdloaiza_gmail_com",createdAt:te(20),lastActivityAt:te(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:te(24),contactId:"email_pasuarez_gmail_com",createdAt:te(25),lastActivityAt:te(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:te(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:te(22),lastActivityAt:te(9),_version:4}],IS={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:qn(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Te(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Te(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Te(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:te(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:Te(20),_version:1}]},ys={};zu.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";ys[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});ys.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:te(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:te(3),lastActivityAt:te(3),_version:1};const Po={},ca=()=>zu.map(n=>({...n})),K_=()=>vS.map(n=>({...n})),wS=n=>(IS[n]||[]).map(e=>({...e})),ES=n=>ys[n]?{...ys[n]}:null,TS=()=>Object.values(ys).map(n=>({...n})),tp=n=>(Po[n]||[]).map(e=>({...e}));function bS(n,e){Po[n]||(Po[n]=[]),Po[n].unshift({id:"n"+Date.now(),...e})}let AS=100;const Qi=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"contactado",stageName:"Contactado",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:Te(2),createdAt:Te(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_agendada",stageName:"Cita agendada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:Te(20),createdAt:te(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"test_drive",stageName:"Test drive",status:"open",amount:68e6,currency:"COP",probability:.65,weightedAmount:442e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:te(18),createdAt:te(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.8,weightedAmount:108e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:Te(6),createdAt:te(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"nuevo",stageName:"Nuevo",status:"open",amount:0,currency:"COP",probability:.1,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:Te(1),createdAt:Te(1),_version:1},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:te(3),createdAt:te(10),_version:6},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:te(5),createdAt:te(15),_version:7},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:te(9),createdAt:te(22),_version:4}],H_=()=>Qi.map(n=>({...n}));function W_(n){const e="d"+ ++AS;return Qi.unshift({id:e,...n}),e}function RS(n,e){const t=Qi.findIndex(r=>r.id===n);t>=0&&(Qi[t]={...Qi[t],...e})}const xn=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},wl=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:xn(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:xn(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:xn(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:xn(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:xn(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:xn(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:xn(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],SS=()=>wl.map(n=>({...n}));function PS(n){wl.push({id:"ag"+(wl.length+1),...n})}let CS=100;function Q_(n){const e="lm"+ ++CS,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),i=(n.prefijoPais||"+57").replace(/\D/g,""),s=r?"+"+(r.startsWith(i)?r:i+r):"",o=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:o,phone:s,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:o?"email_"+o.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return zu.unshift(c),e}function kS(){const n={},e=(g,w,A)=>f("label",{class:"field"},[f("span",{class:"field__label",text:g}),w,null]);n.nombre=f("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=f("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=f("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=f("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=f("select",{class:"select"},MR.map(g=>f("option",{value:g.id},[`${g.icon} ${g.label}`]))),n.interes=f("select",{class:"select"},FR.map(g=>f("option",{value:g.id},[g.label]))),n.trafico=f("select",{class:"select"},[f("option",{value:""},["— Tráfico —"]),f("option",{value:"organico"},["Orgánico"]),f("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=f("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=f("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=f("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=f("input",{type:"checkbox",checked:!0});const t=f("div",{class:"login__error",role:"alert",hidden:!0}),r=f("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),i=f("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),s=f("form",{class:"nl-form"},[e("Nombre *",n.nombre),f("div",{class:"nl-row"},[f("label",{class:"field",style:{flex:"0 0 auto"}},[f("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),f("label",{class:"field u-grow"},[f("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),f("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),f("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),f("label",{class:"nl-consent"},[n.consent,f("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,f("div",{class:"nl-actions"},[r,i])]),o=f("div",{class:"modal"},[f("div",{class:"modal__head"},[f("h2",{class:"modal__title",text:"＋ Nuevo lead"}),f("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),s]),c=f("div",{class:"modal-overlay"},[o]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const l=()=>{c.remove(),window.removeEventListener("keydown",d)},d=g=>{g.key==="Escape"&&l()};window.addEventListener("keydown",d),c.addEventListener("mousedown",g=>{g.target===c&&l()}),r.addEventListener("click",l),s.addEventListener("submit",async g=>{g.preventDefault(),t.hidden=!0;const w={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!w.nombre)return p("Escribe el nombre del cliente.");if(!w.email&&!w.telefono)return p("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");i.disabled=!0,i.textContent="Guardando…";try{G.get().mock?(Q_(w),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await yS(w),Y("✓ Lead agregado a la Bandeja","ok"),l()}catch{i.disabled=!1,i.textContent="Agregar lead",p("No se pudo agregar. Intenta de nuevo.")}});function p(g){return t.textContent=g,t.hidden=!1,!1}}const El="altorra_friction_v1",DS=300;function Y_(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),i=JSON.parse(localStorage.getItem(El)||"[]");for(i.push({task:n,ms:r,at:new Date().toISOString(),...t});i.length>DS;)i.shift();localStorage.setItem(El,JSON.stringify(i))}catch{}}function NS(){try{const n=JSON.parse(localStorage.getItem(El)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,i]of Object.entries(e)){const s=[...i].sort((o,c)=>o-c);t[r]={n:i.length,mediana_s:+(s[Math.floor(s.length/2)]/1e3).toFixed(1),p90_s:+(s[Math.floor(s.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=NS);const xS=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],VS="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function OS(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=G.get().user||{},r=f("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),i=f("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),s=f("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),o=f("input",{type:"checkbox"}),c=f("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function l(){c.replaceChildren(...xS.map(L=>{const j=f("button",{class:"chip"+(e.fuente===L.id?" chip--active":""),type:"button"},[`${L.icon} ${L.label}`]);return j.addEventListener("click",()=>{e.fuente=L.id,l()}),j}))}l();const d=f("button",{class:"chip",type:"button"},["Orgánico"]);d.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",d.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const p=f("div",{class:"login__error",role:"alert",hidden:!0}),g=f("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),w=f("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),A=f("form",{class:"nl-form"},[f("label",{class:"field"},[f("span",{class:"field__label",text:"Nombre *"}),r]),f("label",{class:"field"},[f("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),i]),f("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,d]),f("label",{class:"field"},[f("span",{class:"field__label",text:"Nota"}),s]),f("label",{class:"nl-consent"},[o,f("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",f("em",{text:VS})])]),p,f("div",{class:"nl-actions"},[g,w])]),C=f("div",{class:"modal"},[f("div",{class:"modal__head"},[f("h2",{class:"modal__title",text:"⚡ Lead rápido"}),f("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),A]),D=f("div",{class:"modal-overlay"},[C]);document.body.appendChild(D),setTimeout(()=>r.focus(),30);const P=()=>{D.remove(),window.removeEventListener("keydown",q)},q=L=>{L.key==="Escape"&&P()};window.addEventListener("keydown",q),D.addEventListener("mousedown",L=>{L.target===D&&P()}),g.addEventListener("click",P),A.addEventListener("submit",L=>{L.preventDefault(),p.hidden=!0;const j={nombre:r.value.trim(),telefono:i.value.trim(),fuente:e.fuente,medio:e.medio,nota:s.value.trim(),consentVerbal:o.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!j.nombre)return V("Escribe el nombre.");if(!j.telefono||j.telefono.replace(/\D/g,"").length<7)return V("Escribe un teléfono válido.");if(!j.ownerId&&!G.get().mock)return V("Sesión sin usuario — recarga el portal.");if(G.get().mock){Q_({nombre:j.nombre,telefono:j.telefono,canal:j.fuente,trafico:j.medio,consentGiven:j.consentVerbal,notas:j.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),Y("⚡ Lead registrado (mock)","ok"),P();return}Ht(Ce(de,"lead_intake"),j).catch(x=>{console.error("[quick-lead] rechazo del servidor:",x),Y('El lead "'+j.nombre+'" fue RECHAZADO al sincronizar: '+(x.code||x.message),"error")}),Y(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),Y_("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),P()});function V(L){return p.textContent=L,p.hidden=!1,!1}}const tn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'};function LS(){const n=(t,r)=>{const i=new Date;return i.setDate(i.getDate()+t),i.setHours(r,0,0,0),i.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function J_(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=Lr("crm.edit"),r=G.get().user&&G.get().user.uid,i=f("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),s=f("label",{class:"search","aria-label":"Buscar"},[f("span",{html:tn.search,"aria-hidden":"true"}),f("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),o=f("div",{class:"inbox__filters"}),c=t?f("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>OS());const l=t?f("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;l&&l.addEventListener("click",()=>kS());const d=f("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);d.addEventListener("click",()=>F());const p=f("div",{class:"inbox__pendientes",hidden:!0}),g=f("div",{class:"inbox__toolbar"},[s,o,c,l,d]),w=f("div",{class:"inbox__list",role:"list",tabindex:"-1"}),A=f("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),C=f("section",{class:"inbox"},[A,i,g,p,w]);he(n),n.append(C);const D=s.querySelector("input");D.addEventListener("input",()=>{e.search=D.value,re()});async function P(O,B){if(I(O.id,{ownerId:B?B.uid:null,ownerName:B?B.nombre:null}),G.get().mock){Y(B?`Asignado a ${B.nombre}`:"Sin asignar","ok");return}try{await eS(O.id,B),Y(B?`Asignado a ${B.nombre}`:"Sin asignar","ok")}catch{Y("No se pudo asignar","error")}}async function q(O,B){if(I(O.id,{status:B,lastActivityAt:new Date().toISOString()}),G.get().mock){Y(`Estado → ${So(B).label}`,"ok");return}try{await tS(O.id,B,O),Y(`Estado → ${So(B).label}`,"ok")}catch{Y("No se pudo cambiar el estado","error")}}function V(O,B){const H=V_(O.phone,MS(O));if(!H){Y("Este lead no tiene teléfono","error");return}window.open(H,"_blank","noopener"),!G.get().mock&&t&&ep(O.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:O.fullName}).catch(()=>{}),j(O,B)}function L(O,B){!G.get().mock&&t&&ep(O.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:O.fullName}).catch(()=>{}),Y("📞 Llamada registrada","ok"),j(O,B)}function j(O,B){if(!t)return;const H=performance.now();xt(B||document.body,LS(),ae=>{if(Y_("proximo_paso",H,{preset:ae.label}),!!ae.value){if(ae.value==="abrir360"){kt(O.id);return}if(G.get().mock){Y("Próximo paso anotado (mock)","ok");return}nS(O.id,{subject:ae.value.subject,dueAt:ae.value.dueAt,name:O.fullName}).then(()=>Y("✓ Próximo paso: "+ae.label,"ok")).catch(()=>Y("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(O.fullName||"el cliente").split(/\s+/)[0]+"?"})}let x=!1;async function F(){x=!x,p.hidden=!x,x&&await v()}async function v(){if(he(p),G.get().mock){p.append(f("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}p.append(f("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let O=[];try{O=await rS()}catch{he(p),p.append(f("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(he(p),p.append(f("div",{class:"inbox__listhead"},[f("span",{class:"u-muted u-caption",text:`📋 ${O.length} pendiente${O.length===1?"":"s"} (hoy y vencidos)`})])),!O.length){p.append(f("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const B=Date.now();O.forEach(H=>{const ae=new Date(H.dueAt).getTime()<B,ee=f("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),ne=f("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),ke=f("div",{class:"lead-card",style:{alignItems:"center"}},[f("span",{class:`badge badge--${ae?"danger":"gold"}`,text:ae?"VENCIDO":"HOY"}),f("div",{class:"u-grow"},[f("div",{class:"lead-card__name",text:(H.type==="cita"?"📅 ":"")+H.subject}),f("div",{class:"u-caption u-muted",text:`${H.relatedTo&&H.relatedTo.name?H.relatedTo.name+" · ":""}${Wn(H.dueAt)}`})]),f("div",{class:"u-row u-row--tight"},[ne,t?ee:null])]);ne.addEventListener("click",()=>{H.relatedTo&&H.relatedTo.id&&kt(H.relatedTo.id)}),ee.addEventListener("click",async()=>{ee.disabled=!0;try{await iS(H.id),Y("✓ Hecho","ok"),await v(),H.relatedTo&&H.relatedTo.id&&j({id:H.relatedTo.id,fullName:H.relatedTo.name||""},d)}catch{ee.disabled=!1,Y("No se pudo completar","error")}}),p.append(ke)})}async function y(O){if(O.status==="convertido"){Y("Ya es una oportunidad","info");return}if(I(O.id,{status:"convertido"}),G.get().mock){W_(qu(O)),Y("🎯 Convertido a oportunidad","ok");return}try{await G_(O),Y("🎯 Convertido a oportunidad","ok")}catch{Y("No se pudo convertir","error")}}function m(){G.set({leads:e.leads})}function I(O,B){const H=e.leads.findIndex(ae=>ae.id===O);H!==-1&&(e.leads[H]=B_({...e.leads[H],...B}),m(),T())}function T(){b(),E(),re()}function b(){const O=GR(e.leads,r);he(i),Il.forEach(B=>{const H=e.queue===B.id,ae=f("button",{class:"chip"+(H?" chip--active":""),role:"tab","aria-selected":String(H),type:"button"},[f("span",{"aria-hidden":"true",text:B.icon}),f("span",{text:B.label}),f("span",{class:"chip__count",text:String(O[B.id]||0)})]);ae.addEventListener("click",()=>{e.queue=B.id,T()}),i.append(ae)})}function E(){if(he(o),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...yl.map(B=>[B.id,B.label])]}].forEach(B=>{const H=e.filters[B.key],ae=H?(B.items.find(ne=>ne[0]===H)||[,B.label])[1]:B.label,ee=f("button",{class:"chip"+(H?" chip--active":""),type:"button","aria-haspopup":"menu"},[f("span",{text:ae}),f("span",{"aria-hidden":"true",text:"▾"})]);ee.addEventListener("click",()=>{xt(ee,B.items.map(([ne,ke])=>({value:ne,label:ke,active:ne===H})),ne=>{e.filters[B.key]=ne.value,T()},{title:B.label})}),o.append(ee)}),e.filters.type||e.filters.channel||e.filters.status){const B=f("button",{class:"chip",type:"button"},["✕ Limpiar"]);B.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},T()}),o.append(B)}}function re(){if(e.loading)return mt();if(e.error)return Qa("⚠️","No se pudo cargar",e.error);const{rows:O,hiddenClosed:B}=YR(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(he(w),!O.length&&!B){const ee=e.search||e.filters.type||e.filters.channel||e.filters.status;w.append(dr("🗂️",ee?"Sin resultados":"¡Bandeja al día!",ee?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const H=B||e.showClosed?f("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${B} ocultos · ver todos`]):null;H&&H.addEventListener("click",()=>{e.showClosed=!e.showClosed,re()});const ae=f("div",{class:"inbox__listhead"},[f("span",{class:"u-muted u-caption",text:`${O.length} ${O.length===1?"cliente":"clientes"} activos`}),f("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),H]);if(w.append(ae),!O.length&&B){w.append(dr("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${B} cerrados ocultos).`));return}if(O.forEach(ee=>w.append(Ae(ee))),e.hasMore&&e.queue==="todo"&&!e.search){const ee=f("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);ee.addEventListener("click",()=>Ve(ee)),w.append(f("div",{class:"inbox__more"},[ee]))}}function Ae(O){const B=Fr[O._rating],H=So(O.status),ae=!!(O.convertedTo&&O.convertedTo.dealId)||O.status==="convertido",ee=QR(O),ne=ee&&ee.state!=="ok"?f("span",{class:`badge badge--${ee.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${ee.mins<120?ee.mins+" min":Dc(ee.mins*6e4)} sin contacto`]):null,ke=O._sla,hr=`sla-dot sla-dot--${ke.state}`,fr=ke.closed?"Cerrado":ke.state==="late"?`SLA vencido hace ${Dc(ke.remainingMs)}`:`Responder en ${Dc(ke.remainingMs)}`,pi=[O._type.icon+" "+O._type.label,O.sourceDetail,O.vehicleOfInterestId?"🚗 "+O.vehicleOfInterestId:""].filter(Boolean).join(" · "),Rn=f("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":O.id,"aria-label":`${O.fullName}, ${B.label}`},[f("span",{class:hr,title:fr,"aria-label":fr}),f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Vs(O.fullName)}),f("div",{class:"lead-card__main u-grow"},[f("div",{class:"lead-card__top"},[f("span",{class:"lead-card__name u-truncate",text:O.fullName}),f("span",{class:`temp ${B.cls}`,title:`Score ${O._score}/100`},[`${B.icon} ${O._score}`])]),f("div",{class:"lead-card__what u-truncate u-muted",text:pi}),f("div",{class:"lead-card__meta u-caption"},[f("span",{class:"lead-card__chan",text:`${O._channel.icon} ${O._channel.label}`}),f("span",{class:"lead-card__dot",text:"·"}),f("span",{text:Wn(O.createdAt)}),f("span",{class:"lead-card__dot",text:"·"}),ae?f("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},["🎯 Convertido → ver Pipeline"]):f("span",{class:`badge badge--${H.badge||""}`.trim(),text:H.label}),O.archived?f("span",{class:"badge",text:"🗄 Archivado"}):null,ne?f("span",{class:"lead-card__dot",text:"·"}):null,ne,O.ownerName?f("span",{class:"lead-card__dot",text:"·"}):null,O.ownerName?f("span",{class:"u-faint",text:"👤 "+O.ownerName}):null]),f("div",{class:"lead-card__nba"},[f("span",{"aria-hidden":"true",text:O._nba.icon}),f("span",{class:"u-muted",text:"Próx: "}),f("strong",{text:O._nba.label})])]),f("div",{class:"lead-card__actions"},[Re("wa",tn.wa,"WhatsApp","btn--wa"),t?Re("call",tn.call,"Registrar llamada"):null,t?Re("assign",tn.person,"Asignar"):null,t&&!ae?Re("status",tn.flag,"Cambiar estado"):null,t&&!ae?Re("convert",tn.convert,"Convertir a oportunidad"):null,t?Re("more",tn.more,"Más acciones"):null,Re("open",tn.expand,"Abrir 360")])]);return Rn.addEventListener("click",Sn=>{const mi=Sn.target.closest("[data-action]");if(mi){Ct(mi.dataset.action,O,mi);return}kt(O.id)}),Rn.addEventListener("keydown",Sn=>{Sn.key==="Enter"?kt(O.id):Sn.key.toLowerCase()==="w"&&V(O)}),Rn}function Re(O,B,H,ae=""){return f("button",{class:`icon-btn ${ae}`.trim(),type:"button","data-action":O,title:H,"aria-label":H},[f("span",{html:B,"aria-hidden":"true"})])}const tt={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",calificado:"Va en serio: presupuesto e intención real",no_calificado:"No es un comprador (spam, curioso)",perdido:"Se enfrió antes de ser negocio"};function Ct(O,B,H){if(O==="open")return kt(B.id);if(O==="wa")return V(B,H);if(O==="call")return L(B,H);if(O==="convert")return y(B);if(O==="pipeline"){window.location.hash="#/pipeline";return}if(O==="assign"){const ae=G.get().team||[],ee=[{value:null,label:"Sin asignar",icon:"⊘",active:!B.ownerId},...ae.map(ne=>({value:ne,label:ne.nombre,hint:ne.cargo,icon:"👤",active:B.ownerId===ne.uid}))];return xt(H,ee,ne=>P(B,ne.value),{title:"Asignar a"})}if(O==="status"){if(B.convertedTo&&B.convertedTo.dealId){Y("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const ae=yl.filter(ee=>ee.id!=="convertido").map(ee=>({value:ee.id,label:ee.label,hint:tt[ee.id]||"",active:(B.status||"nuevo")===ee.id}));return xt(H,ae,ee=>q(B,ee.value),{title:"Cambiar estado"})}if(O==="more"){const ae=[B.archived?{value:"unarchive",label:"Restaurar de archivados",icon:"↩️"}:{value:"archive",label:"Archivar",icon:"🗄",hint:"Sale de las vistas; reversible"},Lr("crm.delete")?{value:"purge",label:"Eliminar definitivo",icon:"🗑",hint:"Solo pruebas/spam — borra TODO su rastro"}:null].filter(Boolean);return xt(H,ae,async ee=>{if(ee.value==="archive"||ee.value==="unarchive"){const ne=ee.value==="archive";if(I(B.id,{archived:ne}),G.get().mock){Y(ne?"🗄 Archivado":"↩️ Restaurado","ok");return}try{await sS(B.id,ne),Y(ne?"🗄 Archivado":"↩️ Restaurado","ok")}catch{I(B.id,{archived:!ne}),Y("No se pudo archivar","error")}return}if(ee.value==="purge"){if(!navigator.onLine){Y("Eliminar definitivo necesita señal.","error");return}if(!window.confirm('🗑 ¿Eliminar DEFINITIVAMENTE a "'+B.fullName+`"?

Borra el lead, sus actividades, negocios y su contacto si queda huérfano. Esto es SOLO para pruebas/spam — un cliente real se ARCHIVA.`)||!window.confirm("Última confirmación: esta acción NO se puede deshacer. ¿Eliminar?"))return;if(G.get().mock){Y("Eliminado (mock)","ok");return}try{const ne=await oS(B.id);Y(`🗑 Eliminado: ${ne.activities} actividades, ${ne.deals} negocios${ne.contactDeleted?", contacto":""}`,"ok")}catch(ne){Y(ne.message&&ne.message.includes("Super Admin")?"Solo el Super Admin puede eliminar.":"No se pudo eliminar: "+(ne.message||ne.code),"error")}}},{title:"Más acciones"})}}function kt(O){G.set({detailLeadId:O})}function dr(O,B,H){return f("div",{class:"state"},[f("div",{class:"state__icon","aria-hidden":"true",text:O}),f("div",{class:"state__title",text:B}),f("div",{class:"state__msg",text:H})])}function Qa(O,B,H){he(w),w.append(dr(O,B,H))}function mt(){he(w);for(let O=0;O<6;O++)w.append(f("div",{class:"lead-card lead-card--skeleton"},[f("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),f("div",{class:"u-grow u-stack",style:{gap:"8px"}},[f("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),f("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function Ve(O){if(e.cursor){O.disabled=!0,O.textContent="Cargando…";try{const{rows:B,lastDoc:H,hasMore:ae}=await XR({after:e.cursor}),ee=co(B),ne=new Set(e.leads.map(ke=>ke.id));e.leads.push(...ee.filter(ke=>!ne.has(ke.id))),e.cursor=H,e.hasMore=ae,m(),T()}catch{Y("No se pudo cargar más","error"),O.disabled=!1,O.textContent="Cargar más"}}}function Ya(){if(G.get().mock){G.set({team:K_()}),e.leads=co(ca()),e.loading=!1,e.hasMore=!1,m(),T(),e.dirtyHandler=()=>{e.leads=co(ca()),m(),T()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}ZR().catch(()=>{}),e.sub=JR({pageSize:40,onData:(O,B)=>{e.leads=co(O),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=B.hasMore,e.loading=!1,e.error=null,m(),T()},onError:O=>{console.error("[inbox] error de suscripción:",O),e.loading=!1,e.error=O&&O.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",T()}})}return T(),Ya(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function MS(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}const FS=["Precio / presupuesto","Financiación negada","Compró en otro lado","No responde","Cambió de opinión","Otro motivo"];function US(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null},t=Lr("crm.edit"),r=f("div",{class:"pipeline__bar"}),i=f("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),s=f("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),o=f("section",{class:"pipeline"},[s,r,i]);he(n),n.append(o);function c(v,y){const m=e.deals.findIndex(I=>I.id===v);m!==-1&&(e.deals[m]={...e.deals[m],...y},G.get().mock&&RS(v,y),w())}async function l(v,y){if(v.stageId===y)return;const m=q_(y);if(c(v.id,{stageId:y,stageName:m.label,probability:m.prob,lastActivityAt:new Date().toISOString()}),G.get().mock){Y("Etapa → "+m.label,"ok");return}try{await pS(v.id,y,v)}catch{Y("No se pudo mover","error")}}async function d(v,y){if(c(v.id,{amount:y}),!G.get().mock)try{await mS(v.id,y,v)}catch{Y("No se pudo guardar el monto","error")}}async function p(v){if(c(v.id,{status:"won"}),G.get().mock){Y("🎉 ¡Venta ganada!","ok");return}try{await gS(v.id,v),Y("🎉 ¡Venta ganada!","ok")}catch{Y("Error","error")}}async function g(v,y){if(c(v.id,{status:"lost",lostReason:y}),G.get().mock){Y("Marcado perdido","info");return}try{await _S(v.id,y,v),Y("Marcado perdido","info")}catch{Y("Error","error")}}function w(){if(e.loading)return x();if(e.error)return j("⚠️","No se pudo cargar",e.error);const v=e.deals.filter(m=>m.status==="open");if(A(v),he(i),!v.length){i.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🎯"}),f("div",{class:"state__title",text:"Embudo vacío"}),f("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const y=dS(v);Wi.forEach(m=>{const I=y[m.id]||[],T=I.reduce((E,re)=>E+(Number(re.amount)||0),0),b=f("div",{class:"pcol","data-stage":m.id},[f("div",{class:"pcol__head"},[f("div",{class:"u-row u-row--tight"},[f("span",{class:"pcol__dot",style:{background:BS(m.id)}}),f("strong",{text:m.label}),f("span",{class:"pcol__count",text:String(I.length)})]),f("span",{class:"u-caption u-faint",text:`${Math.round(m.prob*100)}% · ${$i(T)||"$0"}`})]),f("div",{class:"pcol__drop","data-stage":m.id,role:"list"},I.map(D))]);L(b.querySelector(".pcol__drop"),m.id),i.append(b)})}function A(v){const y=z_(v),m=lS(v);he(r),r.append(C("Oportunidades",String(v.length)),C("Valor del embudo",$i(m)||"$0"),C("Forecast ponderado",$i(y)||"$0",!0))}function C(v,y,m){return f("div",{class:"pstat"+(m?" pstat--hi":"")},[f("span",{class:"u-caption u-faint",text:v}),f("strong",{class:"pstat__v",text:y})])}function D(v){const y=uS(v),m=f("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[v.amount?$i(v.amount):"+ monto"]),I=f("article",{class:"deal-card"+(y?" is-rotting":""),draggable:"true",tabindex:"0","data-id":v.id,"data-stage":v.stageId,role:"listitem","aria-label":`${v.name}, ${Math.round(aa(v.stageId)*100)}%`},[f("div",{class:"deal-card__top"},[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Vs(v.contactName)}),f("span",{class:"deal-card__name u-grow u-truncate",text:v.name}),y?f("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),v.vehicleName?f("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+v.vehicleName}):null,f("div",{class:"deal-card__row"},[m,f("span",{class:"badge badge--gold",text:`${Math.round(aa(v.stageId)*100)}%`})]),f("div",{class:"deal-card__foot u-caption u-faint"},[f("span",{class:"u-grow u-truncate",text:v.ownerName?"👤 "+v.ownerName:"Sin asesor"}),f("span",{text:Wn(v.lastActivityAt)})]),f("div",{class:"deal-card__actions"},t?[P("stage","↔","Mover etapa"),P("won","✓","Marcar ganado"),P("lost","✕","Marcar perdido"),P("open","⤢","Abrir 360")]:[P("open","⤢","Abrir 360")])]);return I.addEventListener("dragstart",T=>{e.dragId=v.id,I.classList.add("is-dragging");try{T.dataTransfer.setData("text/plain",v.id),T.dataTransfer.effectAllowed="move"}catch{}}),I.addEventListener("dragend",()=>{e.dragId=null,I.classList.remove("is-dragging")}),I.addEventListener("click",T=>{const b=T.target.closest("[data-action]");if(b)return q(b.dataset.action,v,b)}),I}function P(v,y,m){return f("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":v,title:m,"aria-label":m,draggable:"false"},[y])}function q(v,y,m){if(v==="open")return G.set({detailLeadId:y.leadId});if(v==="amount")return V(y,m);if(v==="stage")return xt(m,Wi.map(I=>({value:I.id,label:I.label,hint:Math.round(I.prob*100)+"%",active:I.id===y.stageId})),I=>l(y,I.value),{title:"Mover a etapa"});if(v==="won")return p(y);if(v==="lost")return xt(m,FS.map(I=>({value:I,label:I})),I=>g(y,I.value),{title:"Motivo de pérdida"})}function V(v,y){const m=f("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:v.amount||"","aria-label":"Monto en COP"});y.replaceWith(m),m.focus(),m.select();const I=()=>{const T=parseInt(String(m.value).replace(/\D/g,""),10)||0;d(v,T)};m.addEventListener("keydown",T=>{T.key==="Enter"?(T.preventDefault(),I()):T.key==="Escape"&&w()}),m.addEventListener("blur",I)}function L(v,y){v.addEventListener("dragover",m=>{m.preventDefault(),v.classList.add("is-over"),m.dataTransfer&&(m.dataTransfer.dropEffect="move")}),v.addEventListener("dragleave",()=>v.classList.remove("is-over")),v.addEventListener("drop",m=>{m.preventDefault(),v.classList.remove("is-over");const I=e.dragId||m.dataTransfer&&m.dataTransfer.getData("text/plain"),T=e.deals.find(b=>b.id===I);T&&l(T,y)})}function j(v,y,m){he(i),i.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:v}),f("div",{class:"state__title",text:y}),f("div",{class:"state__msg",text:m})]))}function x(){he(r),he(i),Wi.slice(0,5).forEach(()=>{i.append(f("div",{class:"pcol"},[f("div",{class:"pcol__head"},[f("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),f("div",{class:"pcol__drop"},[1,2].map(()=>f("div",{class:"deal-card",style:{pointerEvents:"none"}},[f("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function F(){if(G.get().mock){e.deals=H_(),e.loading=!1,w();return}e.sub=fS({pageSize:150,onData:v=>{e.deals=v,e.loading=!1,e.error=null,w()},onError:v=>{e.loading=!1,e.error=v&&v.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",w()}})}return w(),F(),function(){e.sub&&e.sub(),e.sub=null}}function BS(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const $S=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],np=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function vs(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function X_(n,e){const r=(new Date(n,e,1).getDay()+6)%7,i=new Date(n,e+1,0).getDate(),s=[];for(let c=0;c<r;c++)s.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=i;c++)s.push({date:new Date(n,e,c),inMonth:!0});for(;s.length%7!==0;){const c=s[s.length-1].date;s.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const o=[];for(let c=0;c<s.length;c+=7)o.push(s.slice(c,c+7));return o}function jS(n,e){const t=X_(n,e),r=t[0][0].date,s=t[t.length-1][6].date,o=new Date(s.getFullYear(),s.getMonth(),s.getDate()+1);return{startISO:r.toISOString(),endISO:o.toISOString()}}function qS(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=vs(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,i)=>new Date(r.dueAt)-new Date(i.dueAt));return e}function rp(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function zS(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const GS=n=>({id:n.id,...n.data()}),KS=()=>G.get().user?G.get().user.uid:null;function HS(n,e,t,r){const i=At(Ce(de,"activities"),ps("dueAt",">=",n),ps("dueAt","<",e),Rt("dueAt","asc"));return xs(i,s=>t(s.docs.map(GS)),s=>r&&r(s))}async function WS(n,e,t){return Ht(Ce(de,"activities"),{type:"cita",subject:t||"Cita con "+(n.fullName||""),body:"",status:"open",direction:"outbound",dueAt:e,relatedTo:{type:"lead",id:n.id||null,name:n.fullName||""},ownerId:n.ownerId||KS(),createdAt:new Date().toISOString(),_version:1})}function QS(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=f("div",{class:"agenda__head"}),i=f("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["📌 Por ahora, las citas que los clientes piden desde la WEB se gestionan en el ",f("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario del panel clásico"}),". Aquí ves las citas agendadas desde el 360. (Se unifican en la épica E2.)"]),s=f("div",{class:"agenda__weekdays"},$S.map(P=>f("span",{class:"agenda__wd",text:P}))),o=f("div",{class:"agenda__grid"}),c=f("section",{class:"agenda"},[r,i,s,o]);he(n),n.append(c);function l(P){let q=t.month+P,V=t.year;q<0?(q=11,V--):q>11&&(q=0,V++),t.year=V,t.month=q,D()}function d(){t.year=e.getFullYear(),t.month=e.getMonth(),D()}function p(){he(r);const P=f("div",{class:"u-row u-row--tight"},[g("‹","Mes anterior",()=>l(-1)),f("button",{class:"btn btn--soft btn--sm",type:"button",onclick:d},["Hoy"]),g("›","Mes siguiente",()=>l(1))]);r.append(f("h2",{class:"agenda__title",text:`${np[t.month]} ${t.year}`}),P)}function g(P,q,V){const L=f("button",{class:"icon-btn",type:"button","aria-label":q},[P]);return L.addEventListener("click",V),L}function w(){if(p(),he(o),t.error){o.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"⚠️"}),f("div",{class:"state__title",text:"No se pudo cargar la agenda"}),f("div",{class:"state__msg",text:t.error})]));return}const P=qS(t.events);X_(t.year,t.month).forEach(V=>{V.forEach(L=>{const j=vs(L.date),x=P[j]||[],F=zS(L.date,e),v=f("div",{class:"agenda__day"+(L.inMonth?"":" is-out")+(F?" is-today":""),role:"gridcell"},[f("div",{class:"agenda__daynum",text:String(L.date.getDate())})]),y=f("div",{class:"agenda__events"});if(x.slice(0,3).forEach(m=>y.append(A(m))),x.length>3){const m=f("button",{class:"agenda__more",type:"button"},[`+${x.length-3} más`]);m.addEventListener("click",()=>xt(m,x.map(I=>({value:I,label:`${rp(I.dueAt)} · ${I.relatedTo?.name||I.subject||"Cita"}`})),I=>C(I.value),{title:`${L.date.getDate()} ${np[t.month]}`})),y.append(m)}v.append(y),o.append(v)})})}function A(P){const q=f("button",{class:"agenda__chip",type:"button",title:P.subject||"Cita"},[f("span",{class:"agenda__chip-time",text:rp(P.dueAt)}),f("span",{class:"u-truncate",text:P.relatedTo?.name||P.subject||"Cita"})]);return q.addEventListener("click",()=>C(P)),q}function C(P){const q=P.relatedTo&&P.relatedTo.id;q&&G.set({detailLeadId:q})}function D(){if(w(),t.sub&&(t.sub(),t.sub=null),G.get().mock){t.events=SS(),t.loading=!1,w();return}const{startISO:P,endISO:q}=jS(t.year,t.month);t.sub=HS(P,q,V=>{t.events=V,t.loading=!1,t.error=null,w()},V=>{t.loading=!1,t.error=V&&V.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",w()})}return D(),function(){t.sub&&t.sub(),t.sub=null}}const YS=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},Wa=n=>n.status==="won",Z_=n=>n.status==="lost",Gu=n=>n.status==="open",Ku=n=>n.status==="convertido";function ip(n,e){return e?n.filter(t=>YS(t.createdAt)>=e):n.slice()}function JS(n,e){const t=n.length,r=n.filter(Ku).length,i=e.filter(Wa),s=e.filter(Z_),o=i.reduce((l,d)=>l+(Number(d.amount)||0),0),c=i.length+s.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:i.length,lost:s.length,winRate:c?i.length/c:0,wonValue:o}}function XS(n,e){const t=e.filter(Gu),r=n.filter(s=>!ii(s.status)),i=r.filter(s=>{const o=L_(s);return!o.closed&&(o.state==="warn"||o.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:z_(t),slaRisk:i}}function ZS(n,e){const t=new Set(e.filter(Wa).map(d=>d.id)),r=n.filter(d=>d.status==="contactado"||d.status==="calificado"||d.status==="convertido"),i=n.filter(d=>d.status==="calificado"||d.status==="convertido"),s=n.filter(Ku),o=s.filter(d=>d.convertedTo&&t.has(d.convertedTo.dealId)),c=n.length||1,l=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:i.length},{key:"convertidos",label:"Convertidos",count:s.length},{key:"ganados",label:"Ganados",count:o.length}];return l.map((d,p)=>({...d,pctTop:d.count/c,convFromPrev:p===0?1:l[p-1].count?d.count/l[p-1].count:0}))}function eP(n,e){const t={},r=i=>t[i.key]||(t[i.key]={key:i.key,label:i.label,icon:i.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(i=>{const s=r(_s(i));s.leads++,Ku(i)&&s.convertidos++}),e.forEach(i=>{const s=r(_s(i));s.deals++,Wa(i)&&(s.won++,s.revenue+=Number(i.amount)||0)}),Object.values(t).map(i=>({...i,convRate:i.leads?i.convertidos/i.leads:0})).sort((i,s)=>s.leads-i.leads||s.revenue-i.revenue)}function tP(n){const e=n.filter(Gu);return Wi.map(t=>{const r=e.filter(i=>i.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((i,s)=>i+(Number(s.amount)||0),0),weighted:r.reduce((i,s)=>i+ju(s),0)}})}function nP(n,e,t=[]){const r={},i=(s,o)=>r[s]||(r[s]={ownerId:s,ownerName:o,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(s=>i(s.uid,s.nombre)),n.forEach(s=>{const o=s.ownerId||"_none";i(o,s.ownerName||(o==="_none"?"Sin asignar":o)).leads++}),e.forEach(s=>{const o=s.ownerId||"_none",c=i(o,s.ownerName||(o==="_none"?"Sin asignar":o));c.deals++,Wa(s)?c.won++:Z_(s)?c.lost++:Gu(s)&&(c.pipelineWeighted+=ju(s))}),Object.values(r).filter(s=>s.leads||s.deals).map(s=>({...s,winRate:s.won+s.lost?s.won/(s.won+s.lost):0})).sort((s,o)=>o.won-s.won||o.pipelineWeighted-s.pipelineWeighted||o.leads-s.leads)}function rP(n,e=30){const t=[],r={},i=new Date;for(let s=e-1;s>=0;s--){const o=new Date(i.getFullYear(),i.getMonth(),i.getDate()-s),c={key:vs(o),date:o,count:0};t.push(c),r[c.key]=c}return n.forEach(s=>{if(!s.createdAt)return;const o=r[vs(new Date(s.createdAt))];o&&o.count++}),t}const sp=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function iP(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const sP=n=>({id:n.id,...n.data()});async function op(n,e){return(await ti(At(Ce(de,n),Rt("createdAt","desc"),qt(e)))).docs.map(sP)}async function oP({pageSize:n=500}={}){if(G.get().mock)return{leads:ca(),deals:H_(),capped:!1};const[e,t]=await Promise.all([op("leads",n),op("deals",n)]);return{leads:e.filter(i=>!i.archived),deals:t,capped:e.length>=n||t.length>=n}}const aP="http://www.w3.org/2000/svg";function xc(n,e={},t=[]){const r=document.createElementNS(aP,n);for(const[i,s]of Object.entries(e))s==null||s===!1||r.setAttribute(i,String(s));for(const i of[].concat(t))i==null||i===!1||i===""||r.append(i.nodeType?i:document.createTextNode(String(i)));return r}function cP(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(i=>Number(i.value)||0)),r=f("div",{class:"reportes__bars",role:"list"});return n.forEach(i=>{const s=i.pct!=null?i.pct:t?(Number(i.value)||0)/t:0,o=Math.max(0,Math.min(100,s*100));r.append(f("div",{class:"reportes__bar",role:"listitem"},[f("span",{class:"reportes__bar-label u-truncate",text:i.label}),f("span",{class:"reportes__bar-track","aria-hidden":"true"},[f("span",{class:"reportes__bar-fill",style:{width:o+"%",background:i.color||"var(--grad-gold)"}})]),f("span",{class:"reportes__bar-val u-mono",text:i.display!=null?i.display:String(i.value)})]))}),r}function lP(n){const i=n.map(C=>Number(C.value)||0),s=Math.max(...i,0),o=Math.max(1,s),c=n.length,l=C=>c<=1?600/2:6+C*(600-2*6)/(c-1),d=C=>134-C/o*(140-2*6),p=n.map((C,D)=>`${l(D).toFixed(1)},${d(i[D]).toFixed(1)}`).join(" "),g=`6,134 ${p} ${594 .toFixed(1)},134`,w=i.reduce((C,D)=>C+D,0),A=(n[i.indexOf(s)]||{}).label||"";return xc("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${w} en total; pico de ${s}${A?" el "+A:""}.`},[xc("polygon",{points:g,fill:"var(--gold-300)",opacity:"0.30"}),xc("polyline",{points:p,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const ot=n=>Math.round((n||0)*100)+"%",nn=n=>$i(n)||"$0",Vc=n=>`${n.getDate()}/${n.getMonth()+1}`;function uP(n){const e={leads:[],deals:[],loading:!0,error:null,capped:!1,days:30};let t=!0;const r=f("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),i=f("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),s=f("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);i.addEventListener("click",y),s.addEventListener("click",v);const o=f("div",{class:"reportes__toolbar"},[r,f("div",{class:"u-row u-row--tight"},[i,s])]),c=f("div",{class:"reportes__body"}),l=f("section",{class:"reportes"},[o,c]);he(n),n.append(l);function d(){he(r),sp.forEach(m=>{const I=e.days===m.value,T=f("button",{class:"chip",type:"button","aria-pressed":I?"true":"false"},[m.label]);T.addEventListener("click",()=>{e.days=m.value,g()}),r.append(T)})}function p(){const m=iP(e.days),I=ip(e.leads,m),T=ip(e.deals,m);return{pLeads:I,pDeals:T,pk:JS(I,T),ck:XS(e.leads,e.deals),fn:ZS(I,e.deals),src:eP(I,T),stg:tP(e.deals),own:nP(I,T,G.get().mock?K_():G.get().team||[]),tr:rP(e.leads,30)}}function g(){if(d(),e.loading)return F();if(e.error)return x("⚠️","No se pudieron cargar los reportes",e.error);if(!e.leads.length&&!e.deals.length)return x("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const m=p();he(c),e.capped&&c.append(f("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),c.append(w("Del período",[A("Leads nuevos",String(m.pk.leadsNew)),A("Tasa de conversión",ot(m.pk.convRate),`${m.pk.convertidos} de ${m.pk.leadsNew}`),A("Win rate",ot(m.pk.winRate),`${m.pk.won} ganadas · ${m.pk.lost} perdidas`),A("Valor ganado",nn(m.pk.wonValue),null,!0)]),w("Estado actual",[A("Leads activos",String(m.ck.leadsActive)),A("Oportunidades abiertas",String(m.ck.dealsOpen)),A("Pipeline ponderado",nn(m.ck.pipelineWeighted),null,!0),A("SLA en riesgo",String(m.ck.slaRisk),m.ck.slaRisk?"requieren atención":"al día")]),C(m.fn),D(m.src),P(m.stg),q(m.tr),V(m.own))}function w(m,I){return f("div",{class:"reportes__section"},[f("h2",{class:"reportes__sec-title",text:m}),f("div",{class:"reportes__kpis"},I)])}function A(m,I,T,b){return f("div",{class:"reportes__kpi"+(b?" reportes__kpi--hi":"")},[f("span",{class:"reportes__kpi-label u-caption u-faint",text:m}),f("strong",{class:"reportes__kpi-val",text:I}),T?f("span",{class:"reportes__kpi-sub u-caption u-faint",text:T}):null])}function C(m){const I=m.map((T,b)=>({label:T.label,value:T.count,pct:T.pctTop,display:b===0?String(T.count):`${T.count} · ${ot(T.convFromPrev)}`,color:"var(--grad-gold)"}));return L("Embudo de ventas","De lead a venta — dónde se pierde el avance",cP(I,{max:m[0]?m[0].count:1}))}function D(m){const I=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],T=m.map(E=>[`${E.icon||""} ${E.label}`.trim(),String(E.leads),ot(E.convRate),String(E.deals),String(E.won),nn(E.revenue)]),b=m.length?null:"Sin leads en el período.";return L("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",j(I,T,b))}function P(m){const I=["Etapa","Prob.","Oport.","Valor","Ponderado"],T=m.map(re=>[re.label,ot(re.prob),String(re.count),nn(re.value),nn(re.weighted)]),b=m.reduce((re,Ae)=>({count:re.count+Ae.count,value:re.value+Ae.value,weighted:re.weighted+Ae.weighted}),{count:0,value:0,weighted:0}),E=["Total","",String(b.count),nn(b.value),nn(b.weighted)];return L("Forecast por etapa","Pipeline abierto actual (no depende del período)",j(I,T,null,E))}function q(m){const I=m.reduce((re,Ae)=>re+Ae.count,0),T=m.map(re=>({label:Vc(re.date),value:re.count})),b=m.length?`${Vc(m[0].date)} – ${Vc(m[m.length-1].date)}`:"",E=f("div",{class:"reportes__chart"},[lP(T),f("div",{class:"reportes__axis u-caption u-faint"},[f("span",{text:b}),f("span",{text:`${I} leads`})])]);return L("Tendencia de captación","Nuevos leads · últimos 30 días",E)}function V(m){const I=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],T=m.map(E=>[E.ownerName,String(E.leads),String(E.deals),String(E.won),ot(E.winRate),nn(E.pipelineWeighted)]),b=m.length?null:"Sin actividad asignada en el período.";return L("Rendimiento del equipo","Por asesor, en el período seleccionado",j(I,T,b))}function L(m,I,T){return f("div",{class:"reportes__section"},[f("div",{class:"reportes__sec-head"},[f("h2",{class:"reportes__sec-title",text:m}),I?f("span",{class:"reportes__sec-cap u-caption u-faint",text:I}):null]),T])}function j(m,I,T,b){if(!I.length&&T)return f("div",{class:"reportes__empty u-caption u-faint",text:T});const E=f("thead",{},[f("tr",{},m.map((Re,tt)=>f("th",{class:tt===0?"":"is-num",scope:"col",text:Re})))]),re=f("tbody",{},I.map(Re=>f("tr",{},Re.map((tt,Ct)=>f("td",{class:Ct===0?"":"is-num",text:tt}))))),Ae=[E,re];return b&&Ae.push(f("tfoot",{},[f("tr",{},b.map((Re,tt)=>tt===0?f("th",{scope:"row",text:Re}):f("td",{class:"is-num",text:Re})))])),f("div",{class:"reportes__tablewrap"},[f("table",{class:"reportes__table"},Ae)])}function x(m,I,T){he(c),c.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:m}),f("div",{class:"state__title",text:I}),f("div",{class:"state__msg",text:T})]))}function F(){he(c);const m=f("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>f("div",{class:"reportes__kpi"},[f("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));c.append(f("div",{class:"reportes__section"},[m])),c.append(f("div",{class:"reportes__section"},[f("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function v(){if(e.loading||e.error){Y("Aún no hay datos para exportar","info");return}const m=p(),I=(sp.find(E=>E.value===e.days)||{}).label||"",T=[],b=E=>{T.push([]),T.push([E])};T.push(["Reporte Altorra CRM"]),T.push(["Período",I]),T.push(["Generado",new Date().toLocaleString("es-CO")]),b("KPIs del período"),T.push(["Métrica","Valor"]),T.push(["Leads nuevos",m.pk.leadsNew]),T.push(["Conversión",ot(m.pk.convRate)]),T.push(["Win rate",ot(m.pk.winRate)]),T.push(["Ganadas",m.pk.won]),T.push(["Perdidas",m.pk.lost]),T.push(["Valor ganado (COP)",m.pk.wonValue]),T.push(["Leads activos (ahora)",m.ck.leadsActive]),T.push(["Oportunidades abiertas (ahora)",m.ck.dealsOpen]),T.push(["Pipeline ponderado COP (ahora)",m.ck.pipelineWeighted]),T.push(["SLA en riesgo (ahora)",m.ck.slaRisk]),b("Embudo"),T.push(["Etapa","Cantidad","Conversión desde anterior"]),m.fn.forEach((E,re)=>T.push([E.label,E.count,re===0?"":ot(E.convFromPrev)])),b("Rendimiento por canal"),T.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),m.src.forEach(E=>T.push([E.label,E.leads,ot(E.convRate),E.deals,E.won,E.revenue])),b("Forecast por etapa (pipeline actual)"),T.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),m.stg.forEach(E=>T.push([E.label,ot(E.prob),E.count,E.value,E.weighted])),b("Rendimiento del equipo"),T.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),m.own.forEach(E=>T.push([E.ownerName,E.leads,E.deals,E.won,ot(E.winRate),E.pipelineWeighted])),fP(`altorra-reportes-${vs(new Date)}.csv`,hP(T)),Y("Reporte exportado","ok")}async function y(){e.loading=!0,e.error=null,g();try{const m=await oP();if(!t)return;e.leads=m.leads,e.deals=m.deals,e.capped=!!m.capped,e.loading=!1}catch(m){if(!t)return;e.loading=!1,e.error=m&&m.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}g()}return y(),function(){t=!1}}function dP(n){const e=n==null?"":String(n);return/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function hP(n){return"\uFEFF"+n.map(e=>e.map(dP).join(",")).join(`\r
`)}function fP(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),i=document.createElement("a");i.href=r,i.download=n,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}const la=n=>({id:n.id,...n.data()});async function pP({pageSize:n=500}={}){if(G.get().mock)return{contacts:TS(),leads:ca()};const[e,t]=await Promise.all([ti(At(Ce(de,"contacts"),Rt("createdAt","desc"),qt(n))).then(r=>r.docs.map(la)),ti(At(Ce(de,"leads"),Rt("createdAt","desc"),qt(n))).then(r=>r.docs.map(la))]);return{contacts:e,leads:t}}async function mP(n){if(!n)return null;const e=await f_(ut(de,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function gP(n,e,t){const r=At(Ce(de,"activities"),ps("relatedTo.id","==",n),Rt("createdAt","desc"),qt(50));return xs(r,i=>e(i.docs.map(la)),i=>t&&t(i))}function _P(n,e,t){const r=At(Ce(de,"contacts",n,"crmNotes"),Rt("createdAt","desc"),qt(50));return xs(r,i=>e(i.docs.map(la)),i=>t&&t(i))}async function yP(n,e){const t=G.get().user;await Ht(Ce(de,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:G.get().profile&&G.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const vP=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],IP={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function ap(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function wP(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=f("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,C()});const i=f("div",{class:"search"},[f("span",{"aria-hidden":"true",text:"🔎"}),r]),s={},o=f("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});vP.forEach(V=>{const L=f("button",{class:"chip",type:"button","aria-pressed":V.id===e.filter?"true":"false"},[V.label]);L.addEventListener("click",()=>{e.filter=V.id,Object.entries(s).forEach(([j,x])=>x.setAttribute("aria-pressed",j===V.id?"true":"false")),C()}),s[V.id]=L,o.append(L)});const c=f("span",{class:"contactos__count u-caption u-faint"}),l=f("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);l.addEventListener("click",q);const d=f("div",{class:"contactos__toolbar"},[i,o,f("div",{class:"u-row u-row--tight"},[c,l])]),p=f("div",{class:"contactos__list"}),g=f("section",{class:"contactos"},[d,p]);he(n),n.append(g);function w(){const V={};for(const L of e.leads){if(!L.contactId)continue;const j=V[L.contactId];(!j||new Date(L.createdAt)>new Date(j.createdAt))&&(V[L.contactId]=L)}return V}function A(V){G.set({leads:e.leads,detailLeadId:V.id})}function C(){if(e.loading)return P("⏳","Cargando contactos…","");if(e.error)return P("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return P("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const V=w(),L=oa(e.q),j=e.contacts.filter(x=>e.filter!=="todos"&&ap(x)!==e.filter?!1:L?oa(`${x.fullName||""} ${x.email||""} ${x.phone||""}`).includes(L):!0);if(c.textContent=`${j.length} de ${e.contacts.length}`,he(p),!j.length){p.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🔍"}),f("div",{class:"state__title",text:"Sin resultados"}),f("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}j.forEach(x=>p.append(D(x,V[x.id])))}function D(V,L){const j=ap(V),x=IP[j],F=_s(V),v=Number(V.score)>0&&Fr[V.rating],y=f("div",{class:"contact-row__badges"},[f("span",{class:`badge badge--${x.badge}`,text:x.label}),f("span",{class:"badge",text:`${F.icon} ${F.label}`}),v?f("span",{class:`temp ${Fr[V.rating].cls}`,text:`${Fr[V.rating].icon} ${V.score}`}):null]),m=[V.email,V.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",I=Array.isArray(V.tags)&&V.tags.length?f("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+V.tags.join(", ")}):null,T=[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Vs(V.fullName)}),f("div",{class:"contact-row__main"},[f("span",{class:"contact-row__name u-truncate",text:V.fullName||"Sin nombre"}),f("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:m,text:m}),I]),y,f("span",{class:"contact-row__time u-caption u-faint",text:Wn(V.lastActivityAt)})];if(L){const b=f("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${V.fullName||"contacto"}`},T);return b.addEventListener("click",()=>A(L)),b}return f("div",{class:"contact-row contact-row--nolead"},T)}function P(V,L,j){c.textContent="",he(p),p.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:V}),f("div",{class:"state__title",text:L}),j?f("div",{class:"state__msg",text:j}):null]))}async function q(){e.loading=!0,e.error=null,C();try{const V=await pP();if(!t)return;e.contacts=V.contacts,e.leads=V.leads,e.loading=!1}catch(V){if(!t)return;e.loading=!1,e.error=V&&V.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}C()}return q(),function(){t=!1}}const EP={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function TP(n){let e=null,t=null,r=null,i="resumen",s={lead:null,contact:null,activities:[],notes:[]};const o=f("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=f("div",{class:"detail-overlay",hidden:!0},[o]);n.append(c),c.addEventListener("mousedown",x=>{x.target===c&&l()}),window.addEventListener("keydown",x=>{x.key==="Escape"&&e&&l()}),G.subscribe(x=>{x.detailLeadId!==e&&p(x.detailLeadId)});function l(){G.set({detailLeadId:null})}function d(){t&&(t(),t=null),r&&(r(),r=null)}function p(x){if(d(),e=x,!x){c.hidden=!0,document.body.classList.remove("has-detail"),he(o);return}i="resumen",c.hidden=!1,document.body.classList.add("has-detail"),g(x)}function g(x){const F=(G.get().leads||[]).find(v=>v.id===x);s={lead:F||null,contact:null,activities:[],notes:[]},w(),F&&(G.get().mock?(s.contact=ES(F.contactId),s.activities=wS(x),s.notes=tp(F.contactId),w()):(mP(F.contactId).then(v=>{s.contact=v,w()}).catch(()=>{}),t=gP(x,v=>{s.activities=v,w()},()=>{}),F.contactId&&(r=_P(F.contactId,v=>{s.notes=v,w()},()=>{}))))}function w(){he(o);const x=s.lead;if(!x){o.append(A(null)),o.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🔍"}),f("div",{class:"state__title",text:"Lead no disponible"}),f("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}o.append(A(x)),o.append(C());const F=f("div",{class:"detail__body"});i==="resumen"?F.append(D(x)):i==="comms"?F.append(q()):i==="score"?F.append(V(x)):i==="notas"&&F.append(L(x)),o.append(F)}function A(x){const F=f("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(F.addEventListener("click",l),!x)return f("div",{class:"detail__header"},[f("div",{class:"u-grow"}),F]);const v=j(x),y=Fr[v.rating],m=So(x.status),I=Ga(x),T=_s(x),b=f("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);b.addEventListener("click",()=>{const Re=V_(x.phone,`Hola ${String(x.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!Re)return Y("Sin teléfono","error");window.open(Re,"_blank","noopener")});const E=Lr("crm.edit"),re=E&&x.status!=="convertido"?f("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;re&&re.addEventListener("click",async()=>{re.disabled=!0;try{G.get().mock?W_(qu(x)):await G_(x),Y("🎯 Convertido a oportunidad","ok")}catch{Y("No se pudo convertir","error"),re.disabled=!1}});const Ae=E?f("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;return Ae&&Ae.addEventListener("click",()=>bP(x,Ae)),f("div",{class:"detail__header"},[f("div",{class:"u-row u-grow",style:{minWidth:"0"}},[f("span",{class:"avatar","aria-hidden":"true",text:Vs(x.fullName)}),f("div",{class:"u-grow",style:{minWidth:"0"}},[f("h2",{class:"detail__name u-truncate",text:x.fullName}),f("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[f("span",{class:`temp ${y.cls}`,text:`${y.icon} ${y.label} · ${v.score}`}),f("span",{class:`badge badge--${m.badge||""}`.trim(),text:m.label}),f("span",{class:"badge",text:`${I.icon} ${I.label}`}),f("span",{class:"badge",text:`${T.icon} ${T.label}`})])])]),f("div",{class:"u-row u-row--tight"},[re,Ae,b,F])])}function C(){const x=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],F=f("div",{class:"detail__tabs",role:"tablist"});return x.forEach(([v,y])=>{const m=f("button",{class:"detail__tab"+(i===v?" is-active":""),role:"tab","aria-selected":String(i===v),type:"button"},[y]);m.addEventListener("click",()=>{i=v,w()}),F.append(m)}),F}function D(x){const F=s.contact,v=F&&F.consent?F.consent:null,y=[["Correo",x.email||"—"],["Teléfono",x.phone||"—"],["Interés",x.sourceDetail||"—"],["Vehículo",x.vehicleOfInterestId||"—"],["Asesor",x.ownerName||"Sin asignar"],["Origen",x.source||"—"],["Capturado",AR(x.createdAt)],["Última actividad",Wn(x.lastActivityAt)]],m=U_(x,{score:j(x).score});return f("div",{class:"u-stack"},[f("div",{class:"detail-card detail-card--nba"},[f("span",{class:"detail-card__icon","aria-hidden":"true",text:m.icon}),f("div",{class:"u-grow"},[f("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),f("strong",{text:m.label}),f("div",{class:"u-caption u-faint",text:m.reason})])]),f("dl",{class:"kv"},y.flatMap(([I,T])=>[f("dt",{text:I}),f("dd",{class:"u-truncate",text:T})])),v?P(v):null])}function P(x){const F=v=>v?"✅":"⛔";return f("div",{class:"detail-card"},[f("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),f("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[f("span",{class:"u-caption",text:`${F(x.email)} Email`}),f("span",{class:"u-caption",text:`${F(x.whatsapp)} WhatsApp`}),f("span",{class:"u-caption",text:`${F(x.calls)} Llamadas`})]),f("div",{class:"u-caption u-faint",text:`Política ${x.policyVersion||"v1"} · origen ${x.source||"—"}`})])}function q(){if(!s.activities.length)return f("div",{class:"state"},[f("div",{class:"state__icon",text:"📭"}),f("div",{class:"state__title",text:"Sin comunicaciones"}),f("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const x=f("ol",{class:"timeline"});return s.activities.forEach(F=>{x.append(f("li",{class:"timeline__item timeline__item--"+(F.direction||"inbound")},[f("span",{class:"timeline__icon","aria-hidden":"true",text:EP[F.type]||"•"}),f("div",{class:"u-grow"},[f("div",{class:"u-spread"},[f("strong",{class:"u-truncate",text:F.subject||F.type||"Actividad"}),f("span",{class:"u-caption u-faint",text:Wn(F.createdAt)})]),F.body?f("div",{class:"u-caption u-muted",text:F.body}):null])]))}),x}function V(x){const F=j(x),v=Fr[F.rating],y=Object.keys(Zf).map(m=>{const I=Math.round((F.factors[m]||0)*100);return f("div",{class:"factor"},[f("div",{class:"u-spread u-caption"},[f("span",{text:Zf[m]}),f("span",{class:"u-faint",text:`${I}% · peso ${Math.round(zR[m]*100)}%`})]),f("div",{class:"factor__track"},[f("div",{class:"factor__fill",style:{width:I+"%"}})])])});return f("div",{class:"u-stack"},[f("div",{class:"scorehero"},[f("div",{class:`scorehero__num ${v.cls}`,text:String(F.score)}),f("div",{class:"u-stack",style:{gap:"2px"}},[f("strong",{text:`${v.icon} ${v.label}`}),f("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),f("div",{class:"u-stack",style:{gap:"10px"}},y)])}function L(x){const F=Lr("crm.edit")||Lr("crm.create"),v=f("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),y=f("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);y.addEventListener("click",async()=>{const I=v.value.trim();if(!I)return;y.disabled=!0;const T={body:I,authorName:"Tú",createdAt:new Date().toISOString()};try{G.get().mock?(bS(x.contactId,T),s.notes=tp(x.contactId),w()):(await yP(x.contactId,I),v.value=""),Y("Nota agregada","ok")}catch{Y("No se pudo guardar la nota","error")}finally{y.disabled=!1}});const m=f("div",{class:"u-stack"});return s.notes.length||m.append(f("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),s.notes.forEach(I=>m.append(f("div",{class:"detail-card"},[f("div",{class:"u-caption u-muted",text:I.body}),f("div",{class:"u-caption u-faint",text:`${I.authorName||"Asesor"} · ${Wn(I.createdAt)}`})]))),f("div",{class:"u-stack"},[F?f("div",{class:"u-stack",style:{gap:"8px"}},[v,f("div",{class:"u-row",style:{justifyContent:"flex-end"}},[y])]):null,m])}function j(x){return F_(x,s.activities||[],s.contact)}}function bP(n,e){const t=A=>String(A).padStart(2,"0"),r=new Date;r.setDate(r.getDate()+1),r.setHours(10,0,0,0);const i=`${r.getFullYear()}-${t(r.getMonth()+1)}-${t(r.getDate())}T${t(r.getHours())}:${t(r.getMinutes())}`,s=f("input",{class:"input",type:"text",value:"Cita con "+(n.fullName||""),"aria-label":"Asunto"}),o=f("input",{class:"input",type:"datetime-local",value:i,"aria-label":"Fecha y hora"}),c=f("button",{class:"btn btn--gold btn--sm btn--block",type:"button"},["Agendar"]),l=f("div",{class:"popover",role:"dialog","aria-label":"Agendar cita",style:{width:"260px",gap:"8px"}},[f("div",{class:"popover__title",text:"Agendar cita"}),s,o,c]);document.body.append(l);const d=e.getBoundingClientRect();l.style.top=`${Math.min(window.innerHeight-l.offsetHeight-8,d.bottom+6)}px`,l.style.left=`${Math.max(8,d.right-l.offsetWidth)}px`,setTimeout(()=>o.focus(),0);const p=()=>{l.remove(),document.removeEventListener("mousedown",g,!0),window.removeEventListener("keydown",w,!0)},g=A=>{l.contains(A.target)||p()},w=A=>{A.key==="Escape"&&p()};setTimeout(()=>{document.addEventListener("mousedown",g,!0),window.addEventListener("keydown",w,!0)},0),c.addEventListener("click",async()=>{const A=o.value?new Date(o.value).toISOString():null;if(!A){Y("Elige fecha y hora","error");return}c.disabled=!0;try{G.get().mock?PS({type:"cita",subject:s.value,dueAt:A,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}):await WS(n,A,s.value),Y("📅 Cita agendada","ok"),p()}catch{Y("No se pudo agendar","error"),c.disabled=!1}})}const ey=document.getElementById("app");ky();const AP=new URLSearchParams(location.search).get("mock")==="1",RP={bandeja:J_,pipeline:US,agenda:QS,reportes:uP,contactos:wP};let uo=null,Ur=null,zn=null,Tl=null,Co=null;function cp(n){if(!Ur||n===Tl)return;zn&&(zn(),zn=null),G.get().detailLeadId&&G.set({detailLeadId:null}),zn=(RP[n]||J_)(Ur.outlet)||null,Ur.setActive(n),Tl=n}function SP(){Ur=PR(ey),TP(Ur.detailRoot),cp(D_()),Co=ER(cp)}function PP(){zn&&(zn(),zn=null),Co&&(Co(),Co=null),Ur=null,Tl=null}function CP(n){n.ready&&(n.user&&uo!=="app"?(uo="app",SP()):!n.user&&uo!=="login"&&(PP(),uo="login",n.detailLeadId&&G.set({detailLeadId:null}),CR(ey)))}G.subscribe(CP);AP?G.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):mR();
