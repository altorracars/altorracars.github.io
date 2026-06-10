(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function tv(n){let e={...n};const t=new Set;function r(){return e}function s(o){const c=typeof o=="function"?o(e):o;c&&(e={...e,...c},t.forEach(l=>l(e)))}function i(o){return t.add(o),()=>t.delete(o)}return{get:r,set:s,subscribe:i}}const z=tv({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),Ap="altorra-crm-theme";function nv(){let n=localStorage.getItem(Ap);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,z.set({theme:n})}function rv(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(Ap,n),z.set({theme:n}),n}var rh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},sv=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Vl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,p=i>>2,m=(i&3)<<4|c>>4;let I=(c&15)<<2|h>>6,A=h&63;l||(A=64,o||(I=64)),r.push(t[p],t[m],t[I],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Sp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):sv(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new iv;const I=i<<2|c>>4;if(r.push(I),h!==64){const A=c<<4&240|h>>2;if(r.push(A),m!==64){const S=h<<6&192|m;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class iv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ov=function(n){const e=Sp(n);return Vl.encodeByteArray(e,!0)},Rp=function(n){return ov(n).replace(/\./g,"")},Cp=function(n){try{return Vl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Pp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const av=()=>Pp().__FIREBASE_DEFAULTS__,cv=()=>{if(typeof process>"u"||typeof rh>"u")return;const n=rh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},lv=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Cp(n[1]);return e&&JSON.parse(e)},Aa=()=>{try{return av()||cv()||lv()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},kp=n=>{var e,t;return(t=(e=Aa())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},uv=n=>{const e=kp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},xp=()=>{var n;return(n=Aa())===null||n===void 0?void 0:n.config},Dp=n=>{var e;return(e=Aa())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function dv(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ve())}function hv(){var n;const e=(n=Aa())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function fv(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function pv(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function mv(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function gv(){const n=Ve();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Np(){return!hv()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Sa(){try{return typeof indexedDB=="object"}catch{return!1}}function _v(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yv="FirebaseError";class Dt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=yv,Object.setPrototypeOf(this,Dt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,hs.prototype.create)}}class hs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?vv(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Dt(s,c,r)}}function vv(n,e){return n.replace(Iv,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Iv=/\{\$([^}]+)}/g;function bv(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ai(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(sh(i)&&sh(o)){if(!ai(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function sh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function js(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function zs(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function wv(n,e){const t=new Ev(n,e);return t.subscribe.bind(t)}class Ev{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Tv(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ac),s.error===void 0&&(s.error=Ac),s.complete===void 0&&(s.complete=Ac);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Tv(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ac(){}/**
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
 */const Av=1e3,Sv=2,Rv=4*60*60*1e3,Cv=.5;function Pv(n,e=Av,t=Sv){const r=e*Math.pow(t,n),s=Math.round(Cv*r*(Math.random()-.5)*2);return Math.min(Rv,r+s)}/**
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
 */function be(n){return n&&n._delegate?n._delegate:n}class Pt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const $n="[DEFAULT]";/**
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
 */class kv{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new oi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dv(e))try{this.getOrInitializeService({instanceIdentifier:$n})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=$n){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$n){return this.instances.has(e)}getOptions(e=$n){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:xv(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$n){return this.component?this.component.multipleInstances?e:$n:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function xv(n){return n===$n?void 0:n}function Dv(n){return n.instantiationMode==="EAGER"}/**
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
 */class Nv{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new kv(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ce||(ce={}));const Vv={debug:ce.DEBUG,verbose:ce.VERBOSE,info:ce.INFO,warn:ce.WARN,error:ce.ERROR,silent:ce.SILENT},Ov=ce.INFO,Lv={[ce.DEBUG]:"log",[ce.VERBOSE]:"log",[ce.INFO]:"info",[ce.WARN]:"warn",[ce.ERROR]:"error"},Mv=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Lv[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ra{constructor(e){this.name=e,this._logLevel=Ov,this._logHandler=Mv,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Vv[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ce.DEBUG,...e),this._logHandler(this,ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ce.VERBOSE,...e),this._logHandler(this,ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ce.INFO,...e),this._logHandler(this,ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ce.WARN,...e),this._logHandler(this,ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ce.ERROR,...e),this._logHandler(this,ce.ERROR,...e)}}const Fv=(n,e)=>e.some(t=>n instanceof t);let ih,oh;function Uv(){return ih||(ih=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Bv(){return oh||(oh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Vp=new WeakMap,Gc=new WeakMap,Op=new WeakMap,Sc=new WeakMap,Ol=new WeakMap;function $v(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(fn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Vp.set(t,n)}).catch(()=>{}),Ol.set(e,n),e}function qv(n){if(Gc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Gc.set(n,e)}let Hc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Gc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Op.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return fn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function jv(n){Hc=n(Hc)}function zv(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Rc(this),e,...t);return Op.set(r,e.sort?e.sort():[e]),fn(r)}:Bv().includes(n)?function(...e){return n.apply(Rc(this),e),fn(Vp.get(this))}:function(...e){return fn(n.apply(Rc(this),e))}}function Gv(n){return typeof n=="function"?zv(n):(n instanceof IDBTransaction&&qv(n),Fv(n,Uv())?new Proxy(n,Hc):n)}function fn(n){if(n instanceof IDBRequest)return $v(n);if(Sc.has(n))return Sc.get(n);const e=Gv(n);return e!==n&&(Sc.set(n,e),Ol.set(e,n)),e}const Rc=n=>Ol.get(n);function Hv(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=fn(o);return r&&o.addEventListener("upgradeneeded",l=>{r(fn(o.result),l.oldVersion,l.newVersion,fn(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Kv=["get","getKey","getAll","getAllKeys","count"],Wv=["put","add","delete","clear"],Cc=new Map;function ah(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Cc.get(e))return Cc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Wv.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Kv.includes(t)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return Cc.set(e,i),i}jv(n=>({...n,get:(e,t,r)=>ah(e,t)||n.get(e,t,r),has:(e,t)=>!!ah(e,t)||n.has(e,t)}));/**
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
 */class Qv{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Yv(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Yv(n){const e=n.getComponent();return e?.type==="VERSION"}const Kc="@firebase/app",ch="0.11.0";/**
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
 */const qt=new Ra("@firebase/app"),Jv="@firebase/app-compat",Xv="@firebase/analytics-compat",Zv="@firebase/analytics",eI="@firebase/app-check-compat",tI="@firebase/app-check",nI="@firebase/auth",rI="@firebase/auth-compat",sI="@firebase/database",iI="@firebase/data-connect",oI="@firebase/database-compat",aI="@firebase/functions",cI="@firebase/functions-compat",lI="@firebase/installations",uI="@firebase/installations-compat",dI="@firebase/messaging",hI="@firebase/messaging-compat",fI="@firebase/performance",pI="@firebase/performance-compat",mI="@firebase/remote-config",gI="@firebase/remote-config-compat",_I="@firebase/storage",yI="@firebase/storage-compat",vI="@firebase/firestore",II="@firebase/vertexai",bI="@firebase/firestore-compat",wI="firebase",EI="11.3.0";/**
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
 */const Wc="[DEFAULT]",TI={[Kc]:"fire-core",[Jv]:"fire-core-compat",[Zv]:"fire-analytics",[Xv]:"fire-analytics-compat",[tI]:"fire-app-check",[eI]:"fire-app-check-compat",[nI]:"fire-auth",[rI]:"fire-auth-compat",[sI]:"fire-rtdb",[iI]:"fire-data-connect",[oI]:"fire-rtdb-compat",[aI]:"fire-fn",[cI]:"fire-fn-compat",[lI]:"fire-iid",[uI]:"fire-iid-compat",[dI]:"fire-fcm",[hI]:"fire-fcm-compat",[fI]:"fire-perf",[pI]:"fire-perf-compat",[mI]:"fire-rc",[gI]:"fire-rc-compat",[_I]:"fire-gcs",[yI]:"fire-gcs-compat",[vI]:"fire-fst",[bI]:"fire-fst-compat",[II]:"fire-vertex","fire-js":"fire-js",[wI]:"fire-js-all"};/**
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
 */const Go=new Map,AI=new Map,Qc=new Map;function lh(n,e){try{n.container.addComponent(e)}catch(t){qt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function jt(n){const e=n.name;if(Qc.has(e))return qt.debug(`There were multiple attempts to register component ${e}.`),!1;Qc.set(e,n);for(const t of Go.values())lh(t,n);for(const t of AI.values())lh(t,n);return!0}function fs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function dt(n){return n==null?!1:n.settings!==void 0}/**
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
 */const SI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},pn=new hs("app","Firebase",SI);/**
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
 */class RI{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Pt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw pn.create("app-deleted",{appName:this._name})}}/**
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
 */const ps=EI;function Lp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Wc,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw pn.create("bad-app-name",{appName:String(s)});if(t||(t=xp()),!t)throw pn.create("no-options");const i=Go.get(s);if(i){if(ai(t,i.options)&&ai(r,i.config))return i;throw pn.create("duplicate-app",{appName:s})}const o=new Nv(s);for(const l of Qc.values())o.addComponent(l);const c=new RI(t,r,o);return Go.set(s,c),c}function Ll(n=Wc){const e=Go.get(n);if(!e&&n===Wc&&xp())return Lp();if(!e)throw pn.create("no-app",{appName:n});return e}function vt(n,e,t){var r;let s=(r=TI[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),qt.warn(c.join(" "));return}jt(new Pt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const CI="firebase-heartbeat-database",PI=1,ci="firebase-heartbeat-store";let Pc=null;function Mp(){return Pc||(Pc=Hv(CI,PI,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ci)}catch(t){console.warn(t)}}}}).catch(n=>{throw pn.create("idb-open",{originalErrorMessage:n.message})})),Pc}async function kI(n){try{const t=(await Mp()).transaction(ci),r=await t.objectStore(ci).get(Fp(n));return await t.done,r}catch(e){if(e instanceof Dt)qt.warn(e.message);else{const t=pn.create("idb-get",{originalErrorMessage:e?.message});qt.warn(t.message)}}}async function uh(n,e){try{const r=(await Mp()).transaction(ci,"readwrite");await r.objectStore(ci).put(e,Fp(n)),await r.done}catch(t){if(t instanceof Dt)qt.warn(t.message);else{const r=pn.create("idb-set",{originalErrorMessage:t?.message});qt.warn(r.message)}}}function Fp(n){return`${n.name}!${n.options.appId}`}/**
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
 */const xI=1024,DI=30;class NI{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new OI(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=dh();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>DI){const o=LI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){qt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=dh(),{heartbeatsToSend:r,unsentEntries:s}=VI(this._heartbeatsCache.heartbeats),i=Rp(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return qt.warn(t),""}}}function dh(){return new Date().toISOString().substring(0,10)}function VI(n,e=xI){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),hh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),hh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class OI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Sa()?_v().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await kI(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return uh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return uh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function hh(n){return Rp(JSON.stringify({version:2,heartbeats:n})).length}function LI(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function MI(n){jt(new Pt("platform-logger",e=>new Qv(e),"PRIVATE")),jt(new Pt("heartbeat",e=>new NI(e),"PRIVATE")),vt(Kc,ch,n),vt(Kc,ch,"esm2017"),vt("fire-js","")}MI("");function Ml(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Up(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const FI=Up,Bp=new hs("auth","Firebase",Up());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho=new Ra("@firebase/auth");function UI(n,...e){Ho.logLevel<=ce.WARN&&Ho.warn(`Auth (${ps}): ${n}`,...e)}function So(n,...e){Ho.logLevel<=ce.ERROR&&Ho.error(`Auth (${ps}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(n,...e){throw Fl(n,...e)}function St(n,...e){return Fl(n,...e)}function $p(n,e,t){const r=Object.assign(Object.assign({},FI()),{[e]:t});return new hs("auth","Firebase",r).create(e,{appName:n.name})}function mn(n){return $p(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Fl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Bp.create(n,...e)}function X(n,e,...t){if(!n)throw Fl(e,...t)}function Mt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw So(e),new Error(e)}function zt(n,e){n||Mt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function BI(){return fh()==="http:"||fh()==="https:"}function fh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $I(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(BI()||pv()||"connection"in navigator)?navigator.onLine:!0}function qI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e,t){this.shortDelay=e,this.longDelay=t,zt(t>e,"Short delay should be less than long delay!"),this.isMobile=dv()||mv()}get(){return $I()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(n,e){zt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Mt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Mt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Mt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zI=new ki(3e4,6e4);function pr(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Rn(n,e,t,r,s={}){return jp(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Pi(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:l},i);return fv()||(h.referrerPolicy="no-referrer"),qp.fetch()(zp(n,n.config.apiHost,t,c),h)})}async function jp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},jI),e);try{const s=new HI(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw co(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw co(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw co(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw co(n,"user-disabled",o);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw $p(n,p,h);It(n,p)}}catch(s){if(s instanceof Dt)throw s;It(n,"network-request-failed",{message:String(s)})}}async function Ca(n,e,t,r,s={}){const i=await Rn(n,e,t,r,s);return"mfaPendingCredential"in i&&It(n,"multi-factor-auth-required",{_serverResponse:i}),i}function zp(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Ul(n.config,s):`${n.config.apiScheme}://${s}`}function GI(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class HI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(St(this.auth,"network-request-failed")),zI.get())})}}function co(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=St(n,e,r);return s.customData._tokenResponse=t,s}function ph(n){return n!==void 0&&n.enterprise!==void 0}class KI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return GI(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function WI(n,e){return Rn(n,"GET","/v2/recaptchaConfig",pr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QI(n,e){return Rn(n,"POST","/v1/accounts:delete",e)}async function Gp(n,e){return Rn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Js(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function YI(n,e=!1){const t=be(n),r=await t.getIdToken(e),s=Bl(r);X(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Js(kc(s.auth_time)),issuedAtTime:Js(kc(s.iat)),expirationTime:Js(kc(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function kc(n){return Number(n)*1e3}function Bl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return So("JWT malformed, contained fewer than 3 sections"),null;try{const s=Cp(t);return s?JSON.parse(s):(So("Failed to decode base64 JWT payload"),null)}catch(s){return So("Caught error parsing JWT payload as JSON",s?.toString()),null}}function mh(n){const e=Bl(n);return X(e,"internal-error"),X(typeof e.exp<"u","internal-error"),X(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function li(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Dt&&JI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function JI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Js(this.lastLoginAt),this.creationTime=Js(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ko(n){var e;const t=n.auth,r=await n.getIdToken(),s=await li(n,Gp(t,{idToken:r}));X(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Hp(i.providerUserInfo):[],c=eb(n.providerData,o),l=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!c?.length,p=l?h:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new Jc(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(n,m)}async function ZI(n){const e=be(n);await Ko(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function eb(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Hp(n){return n.map(e=>{var{providerId:t}=e,r=Ml(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tb(n,e){const t=await jp(n,{},async()=>{const r=Pi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=zp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",qp.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function nb(n,e){return Rn(n,"POST","/v2/accounts:revokeToken",pr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){X(e.idToken,"internal-error"),X(typeof e.idToken<"u","internal-error"),X(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):mh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){X(e.length!==0,"internal-error");const t=mh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(X(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await tb(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Ur;return r&&(X(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(X(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(X(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ur,this.toJSON())}_performRefresh(){return Mt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(n,e){X(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ft{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Ml(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new XI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Jc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await li(this,this.stsTokenManager.getToken(this.auth,e));return X(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return YI(this,e)}reload(){return ZI(this)}_assign(e){this!==e&&(X(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ft(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){X(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ko(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(dt(this.auth.app))return Promise.reject(mn(this.auth));const e=await this.getIdToken();return await li(this,QI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,c,l,h,p;const m=(r=t.displayName)!==null&&r!==void 0?r:void 0,I=(s=t.email)!==null&&s!==void 0?s:void 0,A=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,S=(o=t.photoURL)!==null&&o!==void 0?o:void 0,P=(c=t.tenantId)!==null&&c!==void 0?c:void 0,C=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,U=(h=t.createdAt)!==null&&h!==void 0?h:void 0,R=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:k,emailVerified:F,isAnonymous:x,providerData:M,stsTokenManager:E}=t;X(k&&E,e,"internal-error");const w=Ur.fromJSON(this.name,E);X(typeof k=="string",e,"internal-error"),en(m,e.name),en(I,e.name),X(typeof F=="boolean",e,"internal-error"),X(typeof x=="boolean",e,"internal-error"),en(A,e.name),en(S,e.name),en(P,e.name),en(C,e.name),en(U,e.name),en(R,e.name);const g=new Ft({uid:k,auth:e,email:I,emailVerified:F,displayName:m,isAnonymous:x,photoURL:S,phoneNumber:A,tenantId:P,stsTokenManager:w,createdAt:U,lastLoginAt:R});return M&&Array.isArray(M)&&(g.providerData=M.map(_=>Object.assign({},_))),C&&(g._redirectEventId=C),g}static async _fromIdTokenResponse(e,t,r=!1){const s=new Ur;s.updateFromServerResponse(t);const i=new Ft({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ko(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];X(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Hp(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Ur;c.updateFromIdToken(r);const l=new Ft({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Jc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh=new Map;function Ut(n){zt(n instanceof Function,"Expected a class definition");let e=gh.get(n);return e?(zt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,gh.set(n,e),e)}/**
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
 */class Kp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Kp.type="NONE";const _h=Kp;/**
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
 */function Ro(n,e,t){return`firebase:${n}:${e}:${t}`}class Br{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ro(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ro("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ft._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Br(Ut(_h),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Ut(_h);const o=Ro(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const p=await h._get(o);if(p){const m=Ft._fromJSON(e,p);h!==i&&(c=m),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Br(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Br(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Jp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Wp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Zp(e))return"Blackberry";if(em(e))return"Webos";if(Qp(e))return"Safari";if((e.includes("chrome/")||Yp(e))&&!e.includes("edge/"))return"Chrome";if(Xp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Wp(n=Ve()){return/firefox\//i.test(n)}function Qp(n=Ve()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Yp(n=Ve()){return/crios\//i.test(n)}function Jp(n=Ve()){return/iemobile/i.test(n)}function Xp(n=Ve()){return/android/i.test(n)}function Zp(n=Ve()){return/blackberry/i.test(n)}function em(n=Ve()){return/webos/i.test(n)}function $l(n=Ve()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function rb(n=Ve()){var e;return $l(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function sb(){return gv()&&document.documentMode===10}function tm(n=Ve()){return $l(n)||Xp(n)||em(n)||Zp(n)||/windows phone/i.test(n)||Jp(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nm(n,e=[]){let t;switch(n){case"Browser":t=yh(Ve());break;case"Worker":t=`${yh(Ve())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ps}/${r}`}/**
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
 */class ib{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function ob(n,e={}){return Rn(n,"GET","/v2/passwordPolicy",pr(n,e))}/**
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
 */const ab=6;class cb{constructor(e){var t,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:ab,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lb{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new vh(this),this.idTokenSubscription=new vh(this),this.beforeStateQueue=new ib(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Bp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ut(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Br.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Gp(this,{idToken:e}),r=await Ft._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(dt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&l?.user&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return X(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ko(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=qI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(dt(this.app))return Promise.reject(mn(this));const t=e?be(e):null;return t&&X(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&X(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return dt(this.app)?Promise.reject(mn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return dt(this.app)?Promise.reject(mn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ut(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ob(this),t=new cb(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new hs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await nb(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ut(e)||this._popupRedirectResolver;X(t,this,"argument-error"),this.redirectPersistenceManager=await Br.create(this,[Ut(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(X(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return X(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=nm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(dt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&UI(`Error while retrieving App Check token: ${t.error}`),t?.token}}function ms(n){return be(n)}class vh{constructor(e){this.auth=e,this.observer=null,this.addObserver=wv(t=>this.observer=t)}get next(){return X(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ub(n){Pa=n}function rm(n){return Pa.loadJS(n)}function db(){return Pa.recaptchaEnterpriseScript}function hb(){return Pa.gapiScript}function fb(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class pb{constructor(){this.enterprise=new mb}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class mb{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const gb="recaptcha-enterprise",sm="NO_RECAPTCHA";class _b{constructor(e){this.type=gb,this.auth=ms(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{WI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new KI(l);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(l=>{c(l)})})}function s(i,o,c){const l=window.grecaptcha;ph(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(sm)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new pb().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&ph(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=db();l.length!==0&&(l+=c),rm(l).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function Ih(n,e,t,r=!1,s=!1){const i=new _b(n);let o;if(s)o=sm;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function bh(n,e,t,r,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Ih(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Ih(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yb(n,e){const t=fs(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ai(i,e??{}))return s;It(s,"already-initialized")}return t.initialize({options:e})}function vb(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Ut);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Ib(n,e,t){const r=ms(n);X(r._canInitEmulator,r,"emulator-config-failed"),X(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=im(e),{host:o,port:c}=bb(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),wb()}function im(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function bb(n){const e=im(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:wh(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:wh(o)}}}function wh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function wb(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Mt("not implemented")}_getIdTokenResponse(e){return Mt("not implemented")}_linkToIdToken(e,t){return Mt("not implemented")}_getReauthenticationResolver(e){return Mt("not implemented")}}async function Eb(n,e){return Rn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tb(n,e){return Ca(n,"POST","/v1/accounts:signInWithPassword",pr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ab(n,e){return Ca(n,"POST","/v1/accounts:signInWithEmailLink",pr(n,e))}async function Sb(n,e){return Ca(n,"POST","/v1/accounts:signInWithEmailLink",pr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui extends ql{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new ui(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ui(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return bh(e,t,"signInWithPassword",Tb);case"emailLink":return Ab(e,{email:this._email,oobCode:this._password});default:It(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return bh(e,r,"signUpPassword",Eb);case"emailLink":return Sb(e,{idToken:t,email:this._email,oobCode:this._password});default:It(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $r(n,e){return Ca(n,"POST","/v1/accounts:signInWithIdp",pr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rb="http://localhost";class rr extends ql{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new rr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):It("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Ml(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new rr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return $r(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,$r(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,$r(e,t)}buildRequest(){const e={requestUri:Rb,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Pi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cb(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Pb(n){const e=js(zs(n)).link,t=e?js(zs(e)).deep_link_id:null,r=js(zs(n)).deep_link_id;return(r?js(zs(r)).link:null)||r||t||e||n}class jl{constructor(e){var t,r,s,i,o,c;const l=js(zs(e)),h=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,m=Cb((s=l.mode)!==null&&s!==void 0?s:null);X(h&&p&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=p,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Pb(e);try{return new jl(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(){this.providerId=gs.PROVIDER_ID}static credential(e,t){return ui._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=jl.parseLink(t);return X(r,"argument-error"),ui._fromEmailAndCode(e,r.code,r.tenantId)}}gs.PROVIDER_ID="password";gs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";gs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class xi extends om{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an extends xi{constructor(){super("facebook.com")}static credential(e){return rr._fromParams({providerId:an.PROVIDER_ID,signInMethod:an.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return an.credentialFromTaggedObject(e)}static credentialFromError(e){return an.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return an.credential(e.oauthAccessToken)}catch{return null}}}an.FACEBOOK_SIGN_IN_METHOD="facebook.com";an.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn extends xi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return rr._fromParams({providerId:cn.PROVIDER_ID,signInMethod:cn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return cn.credentialFromTaggedObject(e)}static credentialFromError(e){return cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return cn.credential(t,r)}catch{return null}}}cn.GOOGLE_SIGN_IN_METHOD="google.com";cn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln extends xi{constructor(){super("github.com")}static credential(e){return rr._fromParams({providerId:ln.PROVIDER_ID,signInMethod:ln.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ln.credentialFromTaggedObject(e)}static credentialFromError(e){return ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ln.credential(e.oauthAccessToken)}catch{return null}}}ln.GITHUB_SIGN_IN_METHOD="github.com";ln.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un extends xi{constructor(){super("twitter.com")}static credential(e,t){return rr._fromParams({providerId:un.PROVIDER_ID,signInMethod:un.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return un.credentialFromTaggedObject(e)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return un.credential(t,r)}catch{return null}}}un.TWITTER_SIGN_IN_METHOD="twitter.com";un.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Ft._fromIdTokenResponse(e,r,s),o=Eh(r);return new Kr({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Eh(r);return new Kr({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Eh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo extends Dt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Wo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Wo(e,t,r,s)}}function am(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Wo._fromErrorAndOperation(n,i,e,r):i})}async function kb(n,e,t=!1){const r=await li(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Kr._forOperation(n,"link",r)}/**
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
 */async function xb(n,e,t=!1){const{auth:r}=n;if(dt(r.app))return Promise.reject(mn(r));const s="reauthenticate";try{const i=await li(n,am(r,s,e,n),t);X(i.idToken,r,"internal-error");const o=Bl(i.idToken);X(o,r,"internal-error");const{sub:c}=o;return X(n.uid===c,r,"user-mismatch"),Kr._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&It(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cm(n,e,t=!1){if(dt(n.app))return Promise.reject(mn(n));const r="signIn",s=await am(n,r,e),i=await Kr._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Db(n,e){return cm(ms(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nb(n){const e=ms(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Vb(n,e,t){return dt(n.app)?Promise.reject(mn(n)):Db(be(n),gs.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Nb(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ob(n,e){return be(n).setPersistence(e)}function Lb(n,e,t,r){return be(n).onIdTokenChanged(e,t,r)}function Mb(n,e,t){return be(n).beforeAuthStateChanged(e,t)}function Fb(n,e,t,r){return be(n).onAuthStateChanged(e,t,r)}function Ub(n){return be(n).signOut()}const Qo="__sak";/**
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
 */class lm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Qo,"1"),this.storage.removeItem(Qo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bb=1e3,$b=10;class um extends lm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=tm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);sb()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,$b):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Bb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}um.type="LOCAL";const dm=um;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm extends lm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}hm.type="SESSION";const fm=hm;/**
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
 */function qb(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ka{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ka(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),l=await qb(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ka.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class jb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const h=zl("",20);s.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const I=m;if(I.data.eventId===h)switch(I.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(I.data.response);break;default:clearTimeout(p),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(){return window}function zb(n){Rt().location.href=n}/**
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
 */function pm(){return typeof Rt().WorkerGlobalScope<"u"&&typeof Rt().importScripts=="function"}async function Gb(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Hb(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Kb(){return pm()?self:null}/**
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
 */const mm="firebaseLocalStorageDb",Wb=1,Yo="firebaseLocalStorage",gm="fbase_key";class Di{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function xa(n,e){return n.transaction([Yo],e?"readwrite":"readonly").objectStore(Yo)}function Qb(){const n=indexedDB.deleteDatabase(mm);return new Di(n).toPromise()}function Xc(){const n=indexedDB.open(mm,Wb);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Yo,{keyPath:gm})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Yo)?e(r):(r.close(),await Qb(),e(await Xc()))})})}async function Th(n,e,t){const r=xa(n,!0).put({[gm]:e,value:t});return new Di(r).toPromise()}async function Yb(n,e){const t=xa(n,!1).get(e),r=await new Di(t).toPromise();return r===void 0?null:r.value}function Ah(n,e){const t=xa(n,!0).delete(e);return new Di(t).toPromise()}const Jb=800,Xb=3;class _m{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Xc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Xb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return pm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ka._getInstance(Kb()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Gb(),!this.activeServiceWorker)return;this.sender=new jb(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Hb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Xc();return await Th(e,Qo,"1"),await Ah(e,Qo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Th(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Yb(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ah(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=xa(s,!1).getAll();return new Di(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Jb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}_m.type="LOCAL";const Zb=_m;new ki(3e4,6e4);/**
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
 */function ew(n,e){return e?Ut(e):(X(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Gl extends ql{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return $r(e,this._buildIdpRequest())}_linkToIdToken(e,t){return $r(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return $r(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function tw(n){return cm(n.auth,new Gl(n),n.bypassAuthState)}function nw(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),xb(t,new Gl(n),n.bypassAuthState)}async function rw(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),kb(t,new Gl(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tw;case"linkViaPopup":case"linkViaRedirect":return rw;case"reauthViaPopup":case"reauthViaRedirect":return nw;default:It(this.auth,"internal-error")}}resolve(e){zt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){zt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sw=new ki(2e3,1e4);class Mr extends ym{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Mr.currentPopupAction&&Mr.currentPopupAction.cancel(),Mr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return X(e,this.auth,"internal-error"),e}async onExecution(){zt(this.filter.length===1,"Popup operations only handle one event");const e=zl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(St(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(St(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Mr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(St(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,sw.get())};e()}}Mr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iw="pendingRedirect",Co=new Map;class ow extends ym{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Co.get(this.auth._key());if(!e){try{const r=await aw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Co.set(this.auth._key(),e)}return this.bypassAuthState||Co.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function aw(n,e){const t=uw(e),r=lw(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function cw(n,e){Co.set(n._key(),e)}function lw(n){return Ut(n._redirectPersistence)}function uw(n){return Ro(iw,n.config.apiKey,n.name)}async function dw(n,e,t=!1){if(dt(n.app))return Promise.reject(mn(n));const r=ms(n),s=ew(r,e),o=await new ow(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hw=10*60*1e3;class fw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!pw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!vm(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(St(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=hw&&this.cachedEventUids.clear(),this.cachedEventUids.has(Sh(e))}saveEventToCache(e){this.cachedEventUids.add(Sh(e)),this.lastProcessedEventTime=Date.now()}}function Sh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function vm({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function pw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return vm(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mw(n,e={}){return Rn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,_w=/^https?/;async function yw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await mw(n);for(const t of e)try{if(vw(t))return}catch{}It(n,"unauthorized-domain")}function vw(n){const e=Yc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!_w.test(t))return!1;if(gw.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Iw=new ki(3e4,6e4);function Rh(){const n=Rt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function bw(n){return new Promise((e,t)=>{var r,s,i;function o(){Rh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Rh(),t(St(n,"network-request-failed"))},timeout:Iw.get()})}if(!((s=(r=Rt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Rt().gapi)===null||i===void 0)&&i.load)o();else{const c=fb("iframefcb");return Rt()[c]=()=>{gapi.load?o():t(St(n,"network-request-failed"))},rm(`${hb()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Po=null,e})}let Po=null;function ww(n){return Po=Po||bw(n),Po}/**
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
 */const Ew=new ki(5e3,15e3),Tw="__/auth/iframe",Aw="emulator/auth/iframe",Sw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Rw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Cw(n){const e=n.config;X(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ul(e,Aw):`https://${n.config.authDomain}/${Tw}`,r={apiKey:e.apiKey,appName:n.name,v:ps},s=Rw.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Pi(r).slice(1)}`}async function Pw(n){const e=await ww(n),t=Rt().gapi;return X(t,n,"internal-error"),e.open({where:document.body,url:Cw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Sw,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=St(n,"network-request-failed"),c=Rt().setTimeout(()=>{i(o)},Ew.get());function l(){Rt().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
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
 */const kw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},xw=500,Dw=600,Nw="_blank",Vw="http://localhost";class Ch{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Ow(n,e,t,r=xw,s=Dw){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},kw),{width:r.toString(),height:s.toString(),top:i,left:o}),h=Ve().toLowerCase();t&&(c=Yp(h)?Nw:t),Wp(h)&&(e=e||Vw,l.scrollbars="yes");const p=Object.entries(l).reduce((I,[A,S])=>`${I}${A}=${S},`,"");if(rb(h)&&c!=="_self")return Lw(e||"",c),new Ch(null);const m=window.open(e||"",c,p);X(m,n,"popup-blocked");try{m.focus()}catch{}return new Ch(m)}function Lw(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Mw="__/auth/handler",Fw="emulator/auth/handler",Uw=encodeURIComponent("fac");async function Ph(n,e,t,r,s,i){X(n.config.authDomain,n,"auth-domain-config-required"),X(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ps,eventId:s};if(e instanceof om){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",bv(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))o[p]=m}if(e instanceof xi){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),h=l?`#${Uw}=${encodeURIComponent(l)}`:"";return`${Bw(n)}?${Pi(c).slice(1)}${h}`}function Bw({config:n}){return n.emulator?Ul(n,Fw):`https://${n.authDomain}/${Mw}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc="webStorageSupport";class $w{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=fm,this._completeRedirectFn=dw,this._overrideRedirectResult=cw}async _openPopup(e,t,r,s){var i;zt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Ph(e,t,r,Yc(),s);return Ow(e,o,zl())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Ph(e,t,r,Yc(),s);return zb(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(zt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Pw(e),r=new fw(e);return t.register("authEvent",s=>(X(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(xc,{type:xc},s=>{var i;const o=(i=s?.[0])===null||i===void 0?void 0:i[xc];o!==void 0&&t(!!o),It(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=yw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return tm()||Qp()||$l()}}const qw=$w;var kh="@firebase/auth",xh="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Gw(n){jt(new Pt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;X(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:nm(n)},h=new lb(r,s,i,l);return vb(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),jt(new Pt("auth-internal",e=>{const t=ms(e.getProvider("auth").getImmediate());return(r=>new jw(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),vt(kh,xh,zw(n)),vt(kh,xh,"esm2017")}/**
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
 */const Hw=5*60,Kw=Dp("authIdTokenMaxAge")||Hw;let Dh=null;const Ww=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Kw)return;const s=t?.token;Dh!==s&&(Dh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Qw(n=Ll()){const e=fs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=yb(n,{popupRedirectResolver:qw,persistence:[Zb,dm,fm]}),r=Dp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=Ww(i.toString());Mb(t,o,()=>o(t.currentUser)),Lb(t,c=>o(c))}}const s=kp("auth");return s&&Ib(t,`http://${s}`),t}function Yw(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}ub({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=St("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Yw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Gw("Browser");var Nh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var gn,Im;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,w){function g(){}g.prototype=w.prototype,E.D=w.prototype,E.prototype=new g,E.prototype.constructor=E,E.C=function(_,b,T){for(var v=Array(arguments.length-2),$=2;$<arguments.length;$++)v[$-2]=arguments[$];return w.prototype[b].apply(_,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,w,g){g||(g=0);var _=Array(16);if(typeof w=="string")for(var b=0;16>b;++b)_[b]=w.charCodeAt(g++)|w.charCodeAt(g++)<<8|w.charCodeAt(g++)<<16|w.charCodeAt(g++)<<24;else for(b=0;16>b;++b)_[b]=w[g++]|w[g++]<<8|w[g++]<<16|w[g++]<<24;w=E.g[0],g=E.g[1],b=E.g[2];var T=E.g[3],v=w+(T^g&(b^T))+_[0]+3614090360&4294967295;w=g+(v<<7&4294967295|v>>>25),v=T+(b^w&(g^b))+_[1]+3905402710&4294967295,T=w+(v<<12&4294967295|v>>>20),v=b+(g^T&(w^g))+_[2]+606105819&4294967295,b=T+(v<<17&4294967295|v>>>15),v=g+(w^b&(T^w))+_[3]+3250441966&4294967295,g=b+(v<<22&4294967295|v>>>10),v=w+(T^g&(b^T))+_[4]+4118548399&4294967295,w=g+(v<<7&4294967295|v>>>25),v=T+(b^w&(g^b))+_[5]+1200080426&4294967295,T=w+(v<<12&4294967295|v>>>20),v=b+(g^T&(w^g))+_[6]+2821735955&4294967295,b=T+(v<<17&4294967295|v>>>15),v=g+(w^b&(T^w))+_[7]+4249261313&4294967295,g=b+(v<<22&4294967295|v>>>10),v=w+(T^g&(b^T))+_[8]+1770035416&4294967295,w=g+(v<<7&4294967295|v>>>25),v=T+(b^w&(g^b))+_[9]+2336552879&4294967295,T=w+(v<<12&4294967295|v>>>20),v=b+(g^T&(w^g))+_[10]+4294925233&4294967295,b=T+(v<<17&4294967295|v>>>15),v=g+(w^b&(T^w))+_[11]+2304563134&4294967295,g=b+(v<<22&4294967295|v>>>10),v=w+(T^g&(b^T))+_[12]+1804603682&4294967295,w=g+(v<<7&4294967295|v>>>25),v=T+(b^w&(g^b))+_[13]+4254626195&4294967295,T=w+(v<<12&4294967295|v>>>20),v=b+(g^T&(w^g))+_[14]+2792965006&4294967295,b=T+(v<<17&4294967295|v>>>15),v=g+(w^b&(T^w))+_[15]+1236535329&4294967295,g=b+(v<<22&4294967295|v>>>10),v=w+(b^T&(g^b))+_[1]+4129170786&4294967295,w=g+(v<<5&4294967295|v>>>27),v=T+(g^b&(w^g))+_[6]+3225465664&4294967295,T=w+(v<<9&4294967295|v>>>23),v=b+(w^g&(T^w))+_[11]+643717713&4294967295,b=T+(v<<14&4294967295|v>>>18),v=g+(T^w&(b^T))+_[0]+3921069994&4294967295,g=b+(v<<20&4294967295|v>>>12),v=w+(b^T&(g^b))+_[5]+3593408605&4294967295,w=g+(v<<5&4294967295|v>>>27),v=T+(g^b&(w^g))+_[10]+38016083&4294967295,T=w+(v<<9&4294967295|v>>>23),v=b+(w^g&(T^w))+_[15]+3634488961&4294967295,b=T+(v<<14&4294967295|v>>>18),v=g+(T^w&(b^T))+_[4]+3889429448&4294967295,g=b+(v<<20&4294967295|v>>>12),v=w+(b^T&(g^b))+_[9]+568446438&4294967295,w=g+(v<<5&4294967295|v>>>27),v=T+(g^b&(w^g))+_[14]+3275163606&4294967295,T=w+(v<<9&4294967295|v>>>23),v=b+(w^g&(T^w))+_[3]+4107603335&4294967295,b=T+(v<<14&4294967295|v>>>18),v=g+(T^w&(b^T))+_[8]+1163531501&4294967295,g=b+(v<<20&4294967295|v>>>12),v=w+(b^T&(g^b))+_[13]+2850285829&4294967295,w=g+(v<<5&4294967295|v>>>27),v=T+(g^b&(w^g))+_[2]+4243563512&4294967295,T=w+(v<<9&4294967295|v>>>23),v=b+(w^g&(T^w))+_[7]+1735328473&4294967295,b=T+(v<<14&4294967295|v>>>18),v=g+(T^w&(b^T))+_[12]+2368359562&4294967295,g=b+(v<<20&4294967295|v>>>12),v=w+(g^b^T)+_[5]+4294588738&4294967295,w=g+(v<<4&4294967295|v>>>28),v=T+(w^g^b)+_[8]+2272392833&4294967295,T=w+(v<<11&4294967295|v>>>21),v=b+(T^w^g)+_[11]+1839030562&4294967295,b=T+(v<<16&4294967295|v>>>16),v=g+(b^T^w)+_[14]+4259657740&4294967295,g=b+(v<<23&4294967295|v>>>9),v=w+(g^b^T)+_[1]+2763975236&4294967295,w=g+(v<<4&4294967295|v>>>28),v=T+(w^g^b)+_[4]+1272893353&4294967295,T=w+(v<<11&4294967295|v>>>21),v=b+(T^w^g)+_[7]+4139469664&4294967295,b=T+(v<<16&4294967295|v>>>16),v=g+(b^T^w)+_[10]+3200236656&4294967295,g=b+(v<<23&4294967295|v>>>9),v=w+(g^b^T)+_[13]+681279174&4294967295,w=g+(v<<4&4294967295|v>>>28),v=T+(w^g^b)+_[0]+3936430074&4294967295,T=w+(v<<11&4294967295|v>>>21),v=b+(T^w^g)+_[3]+3572445317&4294967295,b=T+(v<<16&4294967295|v>>>16),v=g+(b^T^w)+_[6]+76029189&4294967295,g=b+(v<<23&4294967295|v>>>9),v=w+(g^b^T)+_[9]+3654602809&4294967295,w=g+(v<<4&4294967295|v>>>28),v=T+(w^g^b)+_[12]+3873151461&4294967295,T=w+(v<<11&4294967295|v>>>21),v=b+(T^w^g)+_[15]+530742520&4294967295,b=T+(v<<16&4294967295|v>>>16),v=g+(b^T^w)+_[2]+3299628645&4294967295,g=b+(v<<23&4294967295|v>>>9),v=w+(b^(g|~T))+_[0]+4096336452&4294967295,w=g+(v<<6&4294967295|v>>>26),v=T+(g^(w|~b))+_[7]+1126891415&4294967295,T=w+(v<<10&4294967295|v>>>22),v=b+(w^(T|~g))+_[14]+2878612391&4294967295,b=T+(v<<15&4294967295|v>>>17),v=g+(T^(b|~w))+_[5]+4237533241&4294967295,g=b+(v<<21&4294967295|v>>>11),v=w+(b^(g|~T))+_[12]+1700485571&4294967295,w=g+(v<<6&4294967295|v>>>26),v=T+(g^(w|~b))+_[3]+2399980690&4294967295,T=w+(v<<10&4294967295|v>>>22),v=b+(w^(T|~g))+_[10]+4293915773&4294967295,b=T+(v<<15&4294967295|v>>>17),v=g+(T^(b|~w))+_[1]+2240044497&4294967295,g=b+(v<<21&4294967295|v>>>11),v=w+(b^(g|~T))+_[8]+1873313359&4294967295,w=g+(v<<6&4294967295|v>>>26),v=T+(g^(w|~b))+_[15]+4264355552&4294967295,T=w+(v<<10&4294967295|v>>>22),v=b+(w^(T|~g))+_[6]+2734768916&4294967295,b=T+(v<<15&4294967295|v>>>17),v=g+(T^(b|~w))+_[13]+1309151649&4294967295,g=b+(v<<21&4294967295|v>>>11),v=w+(b^(g|~T))+_[4]+4149444226&4294967295,w=g+(v<<6&4294967295|v>>>26),v=T+(g^(w|~b))+_[11]+3174756917&4294967295,T=w+(v<<10&4294967295|v>>>22),v=b+(w^(T|~g))+_[2]+718787259&4294967295,b=T+(v<<15&4294967295|v>>>17),v=g+(T^(b|~w))+_[9]+3951481745&4294967295,E.g[0]=E.g[0]+w&4294967295,E.g[1]=E.g[1]+(b+(v<<21&4294967295|v>>>11))&4294967295,E.g[2]=E.g[2]+b&4294967295,E.g[3]=E.g[3]+T&4294967295}r.prototype.u=function(E,w){w===void 0&&(w=E.length);for(var g=w-this.blockSize,_=this.B,b=this.h,T=0;T<w;){if(b==0)for(;T<=g;)s(this,E,T),T+=this.blockSize;if(typeof E=="string"){for(;T<w;)if(_[b++]=E.charCodeAt(T++),b==this.blockSize){s(this,_),b=0;break}}else for(;T<w;)if(_[b++]=E[T++],b==this.blockSize){s(this,_),b=0;break}}this.h=b,this.o+=w},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var w=1;w<E.length-8;++w)E[w]=0;var g=8*this.o;for(w=E.length-8;w<E.length;++w)E[w]=g&255,g/=256;for(this.u(E),E=Array(16),w=g=0;4>w;++w)for(var _=0;32>_;_+=8)E[g++]=this.g[w]>>>_&255;return E};function i(E,w){var g=c;return Object.prototype.hasOwnProperty.call(g,E)?g[E]:g[E]=w(E)}function o(E,w){this.h=w;for(var g=[],_=!0,b=E.length-1;0<=b;b--){var T=E[b]|0;_&&T==w||(g[b]=T,_=!1)}this.g=g}var c={};function l(E){return-128<=E&&128>E?i(E,function(w){return new o([w|0],0>w?-1:0)}):new o([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return m;if(0>E)return C(h(-E));for(var w=[],g=1,_=0;E>=g;_++)w[_]=E/g|0,g*=4294967296;return new o(w,0)}function p(E,w){if(E.length==0)throw Error("number format error: empty string");if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(E.charAt(0)=="-")return C(p(E.substring(1),w));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=h(Math.pow(w,8)),_=m,b=0;b<E.length;b+=8){var T=Math.min(8,E.length-b),v=parseInt(E.substring(b,b+T),w);8>T?(T=h(Math.pow(w,T)),_=_.j(T).add(h(v))):(_=_.j(g),_=_.add(h(v)))}return _}var m=l(0),I=l(1),A=l(16777216);n=o.prototype,n.m=function(){if(P(this))return-C(this).m();for(var E=0,w=1,g=0;g<this.g.length;g++){var _=this.i(g);E+=(0<=_?_:4294967296+_)*w,w*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(S(this))return"0";if(P(this))return"-"+C(this).toString(E);for(var w=h(Math.pow(E,6)),g=this,_="";;){var b=F(g,w).g;g=U(g,b.j(w));var T=((0<g.g.length?g.g[0]:g.h)>>>0).toString(E);if(g=b,S(g))return T+_;for(;6>T.length;)T="0"+T;_=T+_}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function S(E){if(E.h!=0)return!1;for(var w=0;w<E.g.length;w++)if(E.g[w]!=0)return!1;return!0}function P(E){return E.h==-1}n.l=function(E){return E=U(this,E),P(E)?-1:S(E)?0:1};function C(E){for(var w=E.g.length,g=[],_=0;_<w;_++)g[_]=~E.g[_];return new o(g,~E.h).add(I)}n.abs=function(){return P(this)?C(this):this},n.add=function(E){for(var w=Math.max(this.g.length,E.g.length),g=[],_=0,b=0;b<=w;b++){var T=_+(this.i(b)&65535)+(E.i(b)&65535),v=(T>>>16)+(this.i(b)>>>16)+(E.i(b)>>>16);_=v>>>16,T&=65535,v&=65535,g[b]=v<<16|T}return new o(g,g[g.length-1]&-2147483648?-1:0)};function U(E,w){return E.add(C(w))}n.j=function(E){if(S(this)||S(E))return m;if(P(this))return P(E)?C(this).j(C(E)):C(C(this).j(E));if(P(E))return C(this.j(C(E)));if(0>this.l(A)&&0>E.l(A))return h(this.m()*E.m());for(var w=this.g.length+E.g.length,g=[],_=0;_<2*w;_++)g[_]=0;for(_=0;_<this.g.length;_++)for(var b=0;b<E.g.length;b++){var T=this.i(_)>>>16,v=this.i(_)&65535,$=E.i(b)>>>16,se=E.i(b)&65535;g[2*_+2*b]+=v*se,R(g,2*_+2*b),g[2*_+2*b+1]+=T*se,R(g,2*_+2*b+1),g[2*_+2*b+1]+=v*$,R(g,2*_+2*b+1),g[2*_+2*b+2]+=T*$,R(g,2*_+2*b+2)}for(_=0;_<w;_++)g[_]=g[2*_+1]<<16|g[2*_];for(_=w;_<2*w;_++)g[_]=0;return new o(g,0)};function R(E,w){for(;(E[w]&65535)!=E[w];)E[w+1]+=E[w]>>>16,E[w]&=65535,w++}function k(E,w){this.g=E,this.h=w}function F(E,w){if(S(w))throw Error("division by zero");if(S(E))return new k(m,m);if(P(E))return w=F(C(E),w),new k(C(w.g),C(w.h));if(P(w))return w=F(E,C(w)),new k(C(w.g),w.h);if(30<E.g.length){if(P(E)||P(w))throw Error("slowDivide_ only works with positive integers.");for(var g=I,_=w;0>=_.l(E);)g=x(g),_=x(_);var b=M(g,1),T=M(_,1);for(_=M(_,2),g=M(g,2);!S(_);){var v=T.add(_);0>=v.l(E)&&(b=b.add(g),T=v),_=M(_,1),g=M(g,1)}return w=U(E,b.j(w)),new k(b,w)}for(b=m;0<=E.l(w);){for(g=Math.max(1,Math.floor(E.m()/w.m())),_=Math.ceil(Math.log(g)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),T=h(g),v=T.j(w);P(v)||0<v.l(E);)g-=_,T=h(g),v=T.j(w);S(T)&&(T=I),b=b.add(T),E=U(E,v)}return new k(b,E)}n.A=function(E){return F(this,E).h},n.and=function(E){for(var w=Math.max(this.g.length,E.g.length),g=[],_=0;_<w;_++)g[_]=this.i(_)&E.i(_);return new o(g,this.h&E.h)},n.or=function(E){for(var w=Math.max(this.g.length,E.g.length),g=[],_=0;_<w;_++)g[_]=this.i(_)|E.i(_);return new o(g,this.h|E.h)},n.xor=function(E){for(var w=Math.max(this.g.length,E.g.length),g=[],_=0;_<w;_++)g[_]=this.i(_)^E.i(_);return new o(g,this.h^E.h)};function x(E){for(var w=E.g.length+1,g=[],_=0;_<w;_++)g[_]=E.i(_)<<1|E.i(_-1)>>>31;return new o(g,E.h)}function M(E,w){var g=w>>5;w%=32;for(var _=E.g.length-g,b=[],T=0;T<_;T++)b[T]=0<w?E.i(T+g)>>>w|E.i(T+g+1)<<32-w:E.i(T+g);return new o(b,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Im=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,gn=o}).apply(typeof Nh<"u"?Nh:typeof self<"u"?self:typeof window<"u"?window:{});var lo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var bm,Gs,wm,ko,Zc,Em,Tm,Am;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,f){return a==Array.prototype||a==Object.prototype||(a[d]=f.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof lo=="object"&&lo];for(var d=0;d<a.length;++d){var f=a[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(a,d){if(d)e:{var f=r;a=a.split(".");for(var y=0;y<a.length-1;y++){var N=a[y];if(!(N in f))break e;f=f[N]}a=a[a.length-1],y=f[a],d=d(y),d!=y&&d!=null&&e(f,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var f=0,y=!1,N={next:function(){if(!y&&f<a.length){var V=f++;return{value:d(V,a[V]),done:!1}}return y=!0,{done:!0,value:void 0}}};return N[Symbol.iterator]=function(){return N},N}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function h(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function p(a,d,f){return a.call.apply(a.bind,arguments)}function m(a,d,f){if(!a)throw Error();if(2<arguments.length){var y=Array.prototype.slice.call(arguments,2);return function(){var N=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(N,y),a.apply(d,N)}}return function(){return a.apply(d,arguments)}}function I(a,d,f){return I=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:m,I.apply(null,arguments)}function A(a,d){var f=Array.prototype.slice.call(arguments,1);return function(){var y=f.slice();return y.push.apply(y,arguments),a.apply(this,y)}}function S(a,d){function f(){}f.prototype=d.prototype,a.aa=d.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(y,N,V){for(var G=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)G[ve-2]=arguments[ve];return d.prototype[N].apply(y,G)}}function P(a){const d=a.length;if(0<d){const f=Array(d);for(let y=0;y<d;y++)f[y]=a[y];return f}return[]}function C(a,d){for(let f=1;f<arguments.length;f++){const y=arguments[f];if(l(y)){const N=a.length||0,V=y.length||0;a.length=N+V;for(let G=0;G<V;G++)a[N+G]=y[G]}else a.push(y)}}class U{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function R(a){return/^[\s\xa0]*$/.test(a)}function k(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function F(a){return F[" "](a),a}F[" "]=function(){};var x=k().indexOf("Gecko")!=-1&&!(k().toLowerCase().indexOf("webkit")!=-1&&k().indexOf("Edge")==-1)&&!(k().indexOf("Trident")!=-1||k().indexOf("MSIE")!=-1)&&k().indexOf("Edge")==-1;function M(a,d,f){for(const y in a)d.call(f,a[y],y,a)}function E(a,d){for(const f in a)d.call(void 0,a[f],f,a)}function w(a){const d={};for(const f in a)d[f]=a[f];return d}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(a,d){let f,y;for(let N=1;N<arguments.length;N++){y=arguments[N];for(f in y)a[f]=y[f];for(let V=0;V<g.length;V++)f=g[V],Object.prototype.hasOwnProperty.call(y,f)&&(a[f]=y[f])}}function b(a){var d=1;a=a.split(":");const f=[];for(;0<d&&a.length;)f.push(a.shift()),d--;return a.length&&f.push(a.join(":")),f}function T(a){c.setTimeout(()=>{throw a},0)}function v(){var a=gt;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class ${constructor(){this.h=this.g=null}add(d,f){const y=se.get();y.set(d,f),this.h?this.h.next=y:this.g=y,this.h=y}}var se=new U(()=>new ae,a=>a.reset());class ae{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,We=!1,gt=new $,Vt=()=>{const a=c.Promise.resolve(void 0);ye=()=>{a.then(Yt)}};var Yt=()=>{for(var a;a=v();){try{a.h.call(a.g)}catch(f){T(f)}var d=se;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}We=!1};function tt(){this.s=this.s,this.C=this.C}tt.prototype.s=!1,tt.prototype.ma=function(){this.s||(this.s=!0,this.N())},tt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function me(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}me.prototype.h=function(){this.defaultPrevented=!0};var nt=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};c.addEventListener("test",f,d),c.removeEventListener("test",f,d)}catch{}return a}();function L(a,d){if(me.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,y=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(x){e:{try{F(d.nodeName);var N=!0;break e}catch{}N=!1}N||(d=null)}}else f=="mouseover"?d=a.fromElement:f=="mouseout"&&(d=a.toElement);this.relatedTarget=d,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:j[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&L.aa.h.call(this)}}S(L,me);var j={2:"touch",3:"pen",4:"mouse"};L.prototype.h=function(){L.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var W="closure_listenable_"+(1e6*Math.random()|0),ue=0;function ee(a,d,f,y,N){this.listener=a,this.proxy=null,this.src=d,this.type=f,this.capture=!!y,this.ha=N,this.key=++ue,this.da=this.fa=!1}function Z(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function De(a){this.src=a,this.g={},this.h=0}De.prototype.add=function(a,d,f,y,N){var V=a.toString();a=this.g[V],a||(a=this.g[V]=[],this.h++);var G=Ir(a,d,y,N);return-1<G?(d=a[G],f||(d.fa=!1)):(d=new ee(d,this.src,V,!!y,N),d.fa=f,a.push(d)),d};function vr(a,d){var f=d.type;if(f in a.g){var y=a.g[f],N=Array.prototype.indexOf.call(y,d,void 0),V;(V=0<=N)&&Array.prototype.splice.call(y,N,1),V&&(Z(d),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Ir(a,d,f,y){for(var N=0;N<a.length;++N){var V=a[N];if(!V.da&&V.listener==d&&V.capture==!!f&&V.ha==y)return N}return-1}var ws="closure_lm_"+(1e6*Math.random()|0),Dn={};function Nn(a,d,f,y,N){if(Array.isArray(d)){for(var V=0;V<d.length;V++)Nn(a,d[V],f,y,N);return null}return f=ad(f),a&&a[W]?a.K(d,f,h(y)?!!y.capture:!1,N):Es(a,d,f,!1,y,N)}function Es(a,d,f,y,N,V){if(!d)throw Error("Invalid event type");var G=h(N)?!!N.capture:!!N,ve=ac(a);if(ve||(a[ws]=ve=new De(a)),f=ve.add(d,f,y,G,V),f.proxy)return f;if(y=Ry(),f.proxy=y,y.src=a,y.listener=f,a.addEventListener)nt||(N=G),N===void 0&&(N=!1),a.addEventListener(d.toString(),y,N);else if(a.attachEvent)a.attachEvent(od(d.toString()),y);else if(a.addListener&&a.removeListener)a.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Ry(){function a(f){return d.call(a.src,a.listener,f)}const d=Cy;return a}function id(a,d,f,y,N){if(Array.isArray(d))for(var V=0;V<d.length;V++)id(a,d[V],f,y,N);else y=h(y)?!!y.capture:!!y,f=ad(f),a&&a[W]?(a=a.i,d=String(d).toString(),d in a.g&&(V=a.g[d],f=Ir(V,f,y,N),-1<f&&(Z(V[f]),Array.prototype.splice.call(V,f,1),V.length==0&&(delete a.g[d],a.h--)))):a&&(a=ac(a))&&(d=a.g[d.toString()],a=-1,d&&(a=Ir(d,f,y,N)),(f=-1<a?d[a]:null)&&oc(f))}function oc(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[W])vr(d.i,a);else{var f=a.type,y=a.proxy;d.removeEventListener?d.removeEventListener(f,y,a.capture):d.detachEvent?d.detachEvent(od(f),y):d.addListener&&d.removeListener&&d.removeListener(y),(f=ac(d))?(vr(f,a),f.h==0&&(f.src=null,d[ws]=null)):Z(a)}}}function od(a){return a in Dn?Dn[a]:Dn[a]="on"+a}function Cy(a,d){if(a.da)a=!0;else{d=new L(d,this);var f=a.listener,y=a.ha||a.src;a.fa&&oc(a),a=f.call(y,d)}return a}function ac(a){return a=a[ws],a instanceof De?a:null}var cc="__closure_events_fn_"+(1e9*Math.random()>>>0);function ad(a){return typeof a=="function"?a:(a[cc]||(a[cc]=function(d){return a.handleEvent(d)}),a[cc])}function Be(){tt.call(this),this.i=new De(this),this.M=this,this.F=null}S(Be,tt),Be.prototype[W]=!0,Be.prototype.removeEventListener=function(a,d,f,y){id(this,a,d,f,y)};function Qe(a,d){var f,y=a.F;if(y)for(f=[];y;y=y.F)f.push(y);if(a=a.M,y=d.type||d,typeof d=="string")d=new me(d,a);else if(d instanceof me)d.target=d.target||a;else{var N=d;d=new me(y,a),_(d,N)}if(N=!0,f)for(var V=f.length-1;0<=V;V--){var G=d.g=f[V];N=Hi(G,y,!0,d)&&N}if(G=d.g=a,N=Hi(G,y,!0,d)&&N,N=Hi(G,y,!1,d)&&N,f)for(V=0;V<f.length;V++)G=d.g=f[V],N=Hi(G,y,!1,d)&&N}Be.prototype.N=function(){if(Be.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var f=a.g[d],y=0;y<f.length;y++)Z(f[y]);delete a.g[d],a.h--}}this.F=null},Be.prototype.K=function(a,d,f,y){return this.i.add(String(a),d,!1,f,y)},Be.prototype.L=function(a,d,f,y){return this.i.add(String(a),d,!0,f,y)};function Hi(a,d,f,y){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var N=!0,V=0;V<d.length;++V){var G=d[V];if(G&&!G.da&&G.capture==f){var ve=G.listener,Fe=G.ha||G.src;G.fa&&vr(a.i,G),N=ve.call(Fe,y)!==!1&&N}}return N&&!y.defaultPrevented}function cd(a,d,f){if(typeof a=="function")f&&(a=I(a,f));else if(a&&typeof a.handleEvent=="function")a=I(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:c.setTimeout(a,d||0)}function ld(a){a.g=cd(()=>{a.g=null,a.i&&(a.i=!1,ld(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class Py extends tt{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:ld(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ts(a){tt.call(this),this.h=a,this.g={}}S(Ts,tt);var ud=[];function dd(a){M(a.g,function(d,f){this.g.hasOwnProperty(f)&&oc(d)},a),a.g={}}Ts.prototype.N=function(){Ts.aa.N.call(this),dd(this)},Ts.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var lc=c.JSON.stringify,ky=c.JSON.parse,xy=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function uc(){}uc.prototype.h=null;function hd(a){return a.h||(a.h=a.i())}function fd(){}var As={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function dc(){me.call(this,"d")}S(dc,me);function hc(){me.call(this,"c")}S(hc,me);var Vn={},pd=null;function Ki(){return pd=pd||new Be}Vn.La="serverreachability";function md(a){me.call(this,Vn.La,a)}S(md,me);function Ss(a){const d=Ki();Qe(d,new md(d))}Vn.STAT_EVENT="statevent";function gd(a,d){me.call(this,Vn.STAT_EVENT,a),this.stat=d}S(gd,me);function Ye(a){const d=Ki();Qe(d,new gd(d,a))}Vn.Ma="timingevent";function _d(a,d){me.call(this,Vn.Ma,a),this.size=d}S(_d,me);function Rs(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},d)}function Cs(){this.g=!0}Cs.prototype.xa=function(){this.g=!1};function Dy(a,d,f,y,N,V){a.info(function(){if(a.g)if(V)for(var G="",ve=V.split("&"),Fe=0;Fe<ve.length;Fe++){var he=ve[Fe].split("=");if(1<he.length){var $e=he[0];he=he[1];var qe=$e.split("_");G=2<=qe.length&&qe[1]=="type"?G+($e+"="+he+"&"):G+($e+"=redacted&")}}else G=null;else G=V;return"XMLHTTP REQ ("+y+") [attempt "+N+"]: "+d+`
`+f+`
`+G})}function Ny(a,d,f,y,N,V,G){a.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+N+"]: "+d+`
`+f+`
`+V+" "+G})}function br(a,d,f,y){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+Oy(a,f)+(y?" "+y:"")})}function Vy(a,d){a.info(function(){return"TIMEOUT: "+d})}Cs.prototype.info=function(){};function Oy(a,d){if(!a.g)return d;if(!d)return null;try{var f=JSON.parse(d);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var y=f[a];if(!(2>y.length)){var N=y[1];if(Array.isArray(N)&&!(1>N.length)){var V=N[0];if(V!="noop"&&V!="stop"&&V!="close")for(var G=1;G<N.length;G++)N[G]=""}}}}return lc(f)}catch{return d}}var Wi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},yd={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},fc;function Qi(){}S(Qi,uc),Qi.prototype.g=function(){return new XMLHttpRequest},Qi.prototype.i=function(){return{}},fc=new Qi;function Jt(a,d,f,y){this.j=a,this.i=d,this.l=f,this.R=y||1,this.U=new Ts(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new vd}function vd(){this.i=null,this.g="",this.h=!1}var Id={},pc={};function mc(a,d,f){a.L=1,a.v=Zi(Ot(d)),a.m=f,a.P=!0,bd(a,null)}function bd(a,d){a.F=Date.now(),Yi(a),a.A=Ot(a.v);var f=a.A,y=a.R;Array.isArray(y)||(y=[String(y)]),Od(f.i,"t",y),a.C=0,f=a.j.J,a.h=new vd,a.g=Zd(a.j,f?d:null,!a.m),0<a.O&&(a.M=new Py(I(a.Y,a,a.g),a.O)),d=a.U,f=a.g,y=a.ca;var N="readystatechange";Array.isArray(N)||(N&&(ud[0]=N.toString()),N=ud);for(var V=0;V<N.length;V++){var G=Nn(f,N[V],y||d.handleEvent,!1,d.h||d);if(!G)break;d.g[G.key]=G}d=a.H?w(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),Ss(),Dy(a.i,a.u,a.A,a.l,a.R,a.m)}Jt.prototype.ca=function(a){a=a.target;const d=this.M;d&&Lt(a)==3?d.j():this.Y(a)},Jt.prototype.Y=function(a){try{if(a==this.g)e:{const qe=Lt(this.g);var d=this.g.Ba();const Tr=this.g.Z();if(!(3>qe)&&(qe!=3||this.g&&(this.h.h||this.g.oa()||qd(this.g)))){this.J||qe!=4||d==7||(d==8||0>=Tr?Ss(3):Ss(2)),gc(this);var f=this.g.Z();this.X=f;t:if(wd(this)){var y=qd(this.g);a="";var N=y.length,V=Lt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){On(this),Ps(this);var G="";break t}this.h.i=new c.TextDecoder}for(d=0;d<N;d++)this.h.h=!0,a+=this.h.i.decode(y[d],{stream:!(V&&d==N-1)});y.length=0,this.h.g+=a,this.C=0,G=this.h.g}else G=this.g.oa();if(this.o=f==200,Ny(this.i,this.u,this.A,this.l,this.R,qe,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ve,Fe=this.g;if((ve=Fe.g?Fe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!R(ve)){var he=ve;break t}}he=null}if(f=he)br(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,_c(this,f);else{this.o=!1,this.s=3,Ye(12),On(this),Ps(this);break e}}if(this.P){f=!0;let _t;for(;!this.J&&this.C<G.length;)if(_t=Ly(this,G),_t==pc){qe==4&&(this.s=4,Ye(14),f=!1),br(this.i,this.l,null,"[Incomplete Response]");break}else if(_t==Id){this.s=4,Ye(15),br(this.i,this.l,G,"[Invalid Chunk]"),f=!1;break}else br(this.i,this.l,_t,null),_c(this,_t);if(wd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),qe!=4||G.length!=0||this.h.h||(this.s=1,Ye(16),f=!1),this.o=this.o&&f,!f)br(this.i,this.l,G,"[Invalid Chunked Response]"),On(this),Ps(this);else if(0<G.length&&!this.W){this.W=!0;var $e=this.j;$e.g==this&&$e.ba&&!$e.M&&($e.j.info("Great, no buffering proxy detected. Bytes received: "+G.length),Ec($e),$e.M=!0,Ye(11))}}else br(this.i,this.l,G,null),_c(this,G);qe==4&&On(this),this.o&&!this.J&&(qe==4?Qd(this.j,this):(this.o=!1,Yi(this)))}else Zy(this.g),f==400&&0<G.indexOf("Unknown SID")?(this.s=3,Ye(12)):(this.s=0,Ye(13)),On(this),Ps(this)}}}catch{}finally{}};function wd(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Ly(a,d){var f=a.C,y=d.indexOf(`
`,f);return y==-1?pc:(f=Number(d.substring(f,y)),isNaN(f)?Id:(y+=1,y+f>d.length?pc:(d=d.slice(y,y+f),a.C=y+f,d)))}Jt.prototype.cancel=function(){this.J=!0,On(this)};function Yi(a){a.S=Date.now()+a.I,Ed(a,a.I)}function Ed(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Rs(I(a.ba,a),d)}function gc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Jt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Vy(this.i,this.A),this.L!=2&&(Ss(),Ye(17)),On(this),this.s=2,Ps(this)):Ed(this,this.S-a)};function Ps(a){a.j.G==0||a.J||Qd(a.j,a)}function On(a){gc(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,dd(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function _c(a,d){try{var f=a.j;if(f.G!=0&&(f.g==a||yc(f.h,a))){if(!a.K&&yc(f.h,a)&&f.G==3){try{var y=f.Da.g.parse(d)}catch{y=null}if(Array.isArray(y)&&y.length==3){var N=y;if(N[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)io(f),ro(f);else break e;wc(f),Ye(18)}}else f.za=N[1],0<f.za-f.T&&37500>N[2]&&f.F&&f.v==0&&!f.C&&(f.C=Rs(I(f.Za,f),6e3));if(1>=Sd(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Mn(f,11)}else if((a.K||f.g==a)&&io(f),!R(d))for(N=f.Da.g.parse(d),d=0;d<N.length;d++){let he=N[d];if(f.T=he[0],he=he[1],f.G==2)if(he[0]=="c"){f.K=he[1],f.ia=he[2];const $e=he[3];$e!=null&&(f.la=$e,f.j.info("VER="+f.la));const qe=he[4];qe!=null&&(f.Aa=qe,f.j.info("SVER="+f.Aa));const Tr=he[5];Tr!=null&&typeof Tr=="number"&&0<Tr&&(y=1.5*Tr,f.L=y,f.j.info("backChannelRequestTimeoutMs_="+y)),y=f;const _t=a.g;if(_t){const ao=_t.g?_t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ao){var V=y.h;V.g||ao.indexOf("spdy")==-1&&ao.indexOf("quic")==-1&&ao.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(vc(V,V.h),V.h=null))}if(y.D){const Tc=_t.g?_t.g.getResponseHeader("X-HTTP-Session-Id"):null;Tc&&(y.ya=Tc,Ie(y.I,y.D,Tc))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),y=f;var G=a;if(y.qa=Xd(y,y.J?y.ia:null,y.W),G.K){Rd(y.h,G);var ve=G,Fe=y.L;Fe&&(ve.I=Fe),ve.B&&(gc(ve),Yi(ve)),y.g=G}else Kd(y);0<f.i.length&&so(f)}else he[0]!="stop"&&he[0]!="close"||Mn(f,7);else f.G==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?Mn(f,7):bc(f):he[0]!="noop"&&f.l&&f.l.ta(he),f.v=0)}}Ss(4)}catch{}}var My=class{constructor(a,d){this.g=a,this.map=d}};function Td(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ad(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Sd(a){return a.h?1:a.g?a.g.size:0}function yc(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function vc(a,d){a.g?a.g.add(d):a.h=d}function Rd(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Td.prototype.cancel=function(){if(this.i=Cd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Cd(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const f of a.g.values())d=d.concat(f.D);return d}return P(a.i)}function Fy(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var d=[],f=a.length,y=0;y<f;y++)d.push(a[y]);return d}d=[],f=0;for(y in a)d[f++]=a[y];return d}function Uy(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var d=[];a=a.length;for(var f=0;f<a;f++)d.push(f);return d}d=[],f=0;for(const y in a)d[f++]=y;return d}}}function Pd(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var f=Uy(a),y=Fy(a),N=y.length,V=0;V<N;V++)d.call(void 0,y[V],f&&f[V],a)}var kd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function By(a,d){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var y=a[f].indexOf("="),N=null;if(0<=y){var V=a[f].substring(0,y);N=a[f].substring(y+1)}else V=a[f];d(V,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function Ln(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Ln){this.h=a.h,Ji(this,a.j),this.o=a.o,this.g=a.g,Xi(this,a.s),this.l=a.l;var d=a.i,f=new Ds;f.i=d.i,d.g&&(f.g=new Map(d.g),f.h=d.h),xd(this,f),this.m=a.m}else a&&(d=String(a).match(kd))?(this.h=!1,Ji(this,d[1]||"",!0),this.o=ks(d[2]||""),this.g=ks(d[3]||"",!0),Xi(this,d[4]),this.l=ks(d[5]||"",!0),xd(this,d[6]||"",!0),this.m=ks(d[7]||"")):(this.h=!1,this.i=new Ds(null,this.h))}Ln.prototype.toString=function(){var a=[],d=this.j;d&&a.push(xs(d,Dd,!0),":");var f=this.g;return(f||d=="file")&&(a.push("//"),(d=this.o)&&a.push(xs(d,Dd,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(xs(f,f.charAt(0)=="/"?jy:qy,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",xs(f,Gy)),a.join("")};function Ot(a){return new Ln(a)}function Ji(a,d,f){a.j=f?ks(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function Xi(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function xd(a,d,f){d instanceof Ds?(a.i=d,Hy(a.i,a.h)):(f||(d=xs(d,zy)),a.i=new Ds(d,a.h))}function Ie(a,d,f){a.i.set(d,f)}function Zi(a){return Ie(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function ks(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function xs(a,d,f){return typeof a=="string"?(a=encodeURI(a).replace(d,$y),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function $y(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Dd=/[#\/\?@]/g,qy=/[#\?:]/g,jy=/[#\?]/g,zy=/[#\?@]/g,Gy=/#/g;function Ds(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function Xt(a){a.g||(a.g=new Map,a.h=0,a.i&&By(a.i,function(d,f){a.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}n=Ds.prototype,n.add=function(a,d){Xt(this),this.i=null,a=wr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(d),this.h+=1,this};function Nd(a,d){Xt(a),d=wr(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function Vd(a,d){return Xt(a),d=wr(a,d),a.g.has(d)}n.forEach=function(a,d){Xt(this),this.g.forEach(function(f,y){f.forEach(function(N){a.call(d,N,y,this)},this)},this)},n.na=function(){Xt(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),f=[];for(let y=0;y<d.length;y++){const N=a[y];for(let V=0;V<N.length;V++)f.push(d[y])}return f},n.V=function(a){Xt(this);let d=[];if(typeof a=="string")Vd(this,a)&&(d=d.concat(this.g.get(wr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)d=d.concat(a[f])}return d},n.set=function(a,d){return Xt(this),this.i=null,a=wr(this,a),Vd(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},n.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function Od(a,d,f){Nd(a,d),0<f.length&&(a.i=null,a.g.set(wr(a,d),P(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var f=0;f<d.length;f++){var y=d[f];const V=encodeURIComponent(String(y)),G=this.V(y);for(y=0;y<G.length;y++){var N=V;G[y]!==""&&(N+="="+encodeURIComponent(String(G[y]))),a.push(N)}}return this.i=a.join("&")};function wr(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function Hy(a,d){d&&!a.j&&(Xt(a),a.i=null,a.g.forEach(function(f,y){var N=y.toLowerCase();y!=N&&(Nd(this,y),Od(this,N,f))},a)),a.j=d}function Ky(a,d){const f=new Cs;if(c.Image){const y=new Image;y.onload=A(Zt,f,"TestLoadImage: loaded",!0,d,y),y.onerror=A(Zt,f,"TestLoadImage: error",!1,d,y),y.onabort=A(Zt,f,"TestLoadImage: abort",!1,d,y),y.ontimeout=A(Zt,f,"TestLoadImage: timeout",!1,d,y),c.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=a}else d(!1)}function Wy(a,d){const f=new Cs,y=new AbortController,N=setTimeout(()=>{y.abort(),Zt(f,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:y.signal}).then(V=>{clearTimeout(N),V.ok?Zt(f,"TestPingServer: ok",!0,d):Zt(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(N),Zt(f,"TestPingServer: error",!1,d)})}function Zt(a,d,f,y,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),y(f)}catch{}}function Qy(){this.g=new xy}function Yy(a,d,f){const y=f||"";try{Pd(a,function(N,V){let G=N;h(N)&&(G=lc(N)),d.push(y+V+"="+encodeURIComponent(G))})}catch(N){throw d.push(y+"type="+encodeURIComponent("_badmap")),N}}function eo(a){this.l=a.Ub||null,this.j=a.eb||!1}S(eo,uc),eo.prototype.g=function(){return new to(this.l,this.j)},eo.prototype.i=function(a){return function(){return a}}({});function to(a,d){Be.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(to,Be),n=to.prototype,n.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,Vs(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||c).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ns(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Vs(this)),this.g&&(this.readyState=3,Vs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ld(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ld(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?Ns(this):Vs(this),this.readyState==3&&Ld(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ns(this))},n.Qa=function(a){this.g&&(this.response=a,Ns(this))},n.ga=function(){this.g&&Ns(this)};function Ns(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Vs(a)}n.setRequestHeader=function(a,d){this.u.append(a,d)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=d.next();return a.join(`\r
`)};function Vs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(to.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Md(a){let d="";return M(a,function(f,y){d+=y,d+=":",d+=f,d+=`\r
`}),d}function Ic(a,d,f){e:{for(y in f){var y=!1;break e}y=!0}y||(f=Md(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):Ie(a,d,f))}function Se(a){Be.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(Se,Be);var Jy=/^https?$/i,Xy=["POST","PUT"];n=Se.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,d,f,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():fc.g(),this.v=this.o?hd(this.o):hd(fc),this.g.onreadystatechange=I(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(V){Fd(this,V);return}if(a=f||"",f=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var N in y)f.set(N,y[N]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const V of y.keys())f.set(V,y.get(V));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(f.keys()).find(V=>V.toLowerCase()=="content-type"),N=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Xy,d,void 0))||y||N||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,G]of f)this.g.setRequestHeader(V,G);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{$d(this),this.u=!0,this.g.send(a),this.u=!1}catch(V){Fd(this,V)}};function Fd(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,Ud(a),no(a)}function Ud(a){a.A||(a.A=!0,Qe(a,"complete"),Qe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Qe(this,"complete"),Qe(this,"abort"),no(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),no(this,!0)),Se.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Bd(this):this.bb())},n.bb=function(){Bd(this)};function Bd(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Lt(a)!=4||a.Z()!=2)){if(a.u&&Lt(a)==4)cd(a.Ea,0,a);else if(Qe(a,"readystatechange"),Lt(a)==4){a.h=!1;try{const G=a.Z();e:switch(G){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var y;if(y=G===0){var N=String(a.D).match(kd)[1]||null;!N&&c.self&&c.self.location&&(N=c.self.location.protocol.slice(0,-1)),y=!Jy.test(N?N.toLowerCase():"")}f=y}if(f)Qe(a,"complete"),Qe(a,"success");else{a.m=6;try{var V=2<Lt(a)?a.g.statusText:""}catch{V=""}a.l=V+" ["+a.Z()+"]",Ud(a)}}finally{no(a)}}}}function no(a,d){if(a.g){$d(a);const f=a.g,y=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||Qe(a,"ready");try{f.onreadystatechange=y}catch{}}}function $d(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Lt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Lt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),ky(d)}};function qd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Zy(a){const d={};a=(a.g&&2<=Lt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<a.length;y++){if(R(a[y]))continue;var f=b(a[y]);const N=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const V=d[N]||[];d[N]=V,V.push(f)}E(d,function(y){return y.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Os(a,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||d}function jd(a){this.Aa=0,this.i=[],this.j=new Cs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Os("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Os("baseRetryDelayMs",5e3,a),this.cb=Os("retryDelaySeedMs",1e4,a),this.Wa=Os("forwardChannelMaxRetries",2,a),this.wa=Os("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Td(a&&a.concurrentRequestLimit),this.Da=new Qy,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=jd.prototype,n.la=8,n.G=1,n.connect=function(a,d,f,y){Ye(0),this.W=a,this.H=d||{},f&&y!==void 0&&(this.H.OSID=f,this.H.OAID=y),this.F=this.X,this.I=Xd(this,null,this.W),so(this)};function bc(a){if(zd(a),a.G==3){var d=a.U++,f=Ot(a.I);if(Ie(f,"SID",a.K),Ie(f,"RID",d),Ie(f,"TYPE","terminate"),Ls(a,f),d=new Jt(a,a.j,d),d.L=2,d.v=Zi(Ot(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(d.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=d.v,f=!0),f||(d.g=Zd(d.j,null),d.g.ea(d.v)),d.F=Date.now(),Yi(d)}Jd(a)}function ro(a){a.g&&(Ec(a),a.g.cancel(),a.g=null)}function zd(a){ro(a),a.u&&(c.clearTimeout(a.u),a.u=null),io(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function so(a){if(!Ad(a.h)&&!a.s){a.s=!0;var d=a.Ga;ye||Vt(),We||(ye(),We=!0),gt.add(d,a),a.B=0}}function ev(a,d){return Sd(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Rs(I(a.Ga,a,d),Yd(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const N=new Jt(this,this.j,a);let V=this.o;if(this.S&&(V?(V=w(V),_(V,this.S)):V=this.S),this.m!==null||this.O||(N.H=V,V=null),this.P)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var y=this.i[f];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(d+=y,4096<d){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=Hd(this,N,d),f=Ot(this.I),Ie(f,"RID",a),Ie(f,"CVER",22),this.D&&Ie(f,"X-HTTP-Session-Id",this.D),Ls(this,f),V&&(this.O?d="headers="+encodeURIComponent(String(Md(V)))+"&"+d:this.m&&Ic(f,this.m,V)),vc(this.h,N),this.Ua&&Ie(f,"TYPE","init"),this.P?(Ie(f,"$req",d),Ie(f,"SID","null"),N.T=!0,mc(N,f,null)):mc(N,f,d),this.G=2}}else this.G==3&&(a?Gd(this,a):this.i.length==0||Ad(this.h)||Gd(this))};function Gd(a,d){var f;d?f=d.l:f=a.U++;const y=Ot(a.I);Ie(y,"SID",a.K),Ie(y,"RID",f),Ie(y,"AID",a.T),Ls(a,y),a.m&&a.o&&Ic(y,a.m,a.o),f=new Jt(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),d&&(a.i=d.D.concat(a.i)),d=Hd(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),vc(a.h,f),mc(f,y,d)}function Ls(a,d){a.H&&M(a.H,function(f,y){Ie(d,y,f)}),a.l&&Pd({},function(f,y){Ie(d,y,f)})}function Hd(a,d,f){f=Math.min(a.i.length,f);var y=a.l?I(a.l.Na,a.l,a):null;e:{var N=a.i;let V=-1;for(;;){const G=["count="+f];V==-1?0<f?(V=N[0].g,G.push("ofs="+V)):V=0:G.push("ofs="+V);let ve=!0;for(let Fe=0;Fe<f;Fe++){let he=N[Fe].g;const $e=N[Fe].map;if(he-=V,0>he)V=Math.max(0,N[Fe].g-100),ve=!1;else try{Yy($e,G,"req"+he+"_")}catch{y&&y($e)}}if(ve){y=G.join("&");break e}}}return a=a.i.splice(0,f),d.D=a,y}function Kd(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;ye||Vt(),We||(ye(),We=!0),gt.add(d,a),a.v=0}}function wc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Rs(I(a.Fa,a),Yd(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Wd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Rs(I(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ye(10),ro(this),Wd(this))};function Ec(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Wd(a){a.g=new Jt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=Ot(a.qa);Ie(d,"RID","rpc"),Ie(d,"SID",a.K),Ie(d,"AID",a.T),Ie(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&Ie(d,"TO",a.ja),Ie(d,"TYPE","xmlhttp"),Ls(a,d),a.m&&a.o&&Ic(d,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=Zi(Ot(d)),f.m=null,f.P=!0,bd(f,a)}n.Za=function(){this.C!=null&&(this.C=null,ro(this),wc(this),Ye(19))};function io(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Qd(a,d){var f=null;if(a.g==d){io(a),Ec(a),a.g=null;var y=2}else if(yc(a.h,d))f=d.D,Rd(a.h,d),y=1;else return;if(a.G!=0){if(d.o)if(y==1){f=d.m?d.m.length:0,d=Date.now()-d.F;var N=a.B;y=Ki(),Qe(y,new _d(y,f)),so(a)}else Kd(a);else if(N=d.s,N==3||N==0&&0<d.X||!(y==1&&ev(a,d)||y==2&&wc(a)))switch(f&&0<f.length&&(d=a.h,d.i=d.i.concat(f)),N){case 1:Mn(a,5);break;case 4:Mn(a,10);break;case 3:Mn(a,6);break;default:Mn(a,2)}}}function Yd(a,d){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*d}function Mn(a,d){if(a.j.info("Error code "+d),d==2){var f=I(a.fb,a),y=a.Xa;const N=!y;y=new Ln(y||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ji(y,"https"),Zi(y),N?Ky(y.toString(),f):Wy(y.toString(),f)}else Ye(2);a.G=0,a.l&&a.l.sa(d),Jd(a),zd(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ye(2)):(this.j.info("Failed to ping google.com"),Ye(1))};function Jd(a){if(a.G=0,a.ka=[],a.l){const d=Cd(a.h);(d.length!=0||a.i.length!=0)&&(C(a.ka,d),C(a.ka,a.i),a.h.i.length=0,P(a.i),a.i.length=0),a.l.ra()}}function Xd(a,d,f){var y=f instanceof Ln?Ot(f):new Ln(f);if(y.g!="")d&&(y.g=d+"."+y.g),Xi(y,y.s);else{var N=c.location;y=N.protocol,d=d?d+"."+N.hostname:N.hostname,N=+N.port;var V=new Ln(null);y&&Ji(V,y),d&&(V.g=d),N&&Xi(V,N),f&&(V.l=f),y=V}return f=a.D,d=a.ya,f&&d&&Ie(y,f,d),Ie(y,"VER",a.la),Ls(a,y),y}function Zd(a,d,f){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Se(new eo({eb:f})):new Se(a.pa),d.Ha(a.J),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function eh(){}n=eh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function oo(){}oo.prototype.g=function(a,d){return new ot(a,d)};function ot(a,d){Be.call(this),this.g=new jd(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!R(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!R(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new Er(this)}S(ot,Be),ot.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ot.prototype.close=function(){bc(this.g)},ot.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=lc(a),a=f);d.i.push(new My(d.Ya++,a)),d.G==3&&so(d)},ot.prototype.N=function(){this.g.l=null,delete this.j,bc(this.g),delete this.g,ot.aa.N.call(this)};function th(a){dc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const f in d){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}S(th,dc);function nh(){hc.call(this),this.status=1}S(nh,hc);function Er(a){this.g=a}S(Er,eh),Er.prototype.ua=function(){Qe(this.g,"a")},Er.prototype.ta=function(a){Qe(this.g,new th(a))},Er.prototype.sa=function(a){Qe(this.g,new nh)},Er.prototype.ra=function(){Qe(this.g,"b")},oo.prototype.createWebChannel=oo.prototype.g,ot.prototype.send=ot.prototype.o,ot.prototype.open=ot.prototype.m,ot.prototype.close=ot.prototype.close,Am=function(){return new oo},Tm=function(){return Ki()},Em=Vn,Zc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Wi.NO_ERROR=0,Wi.TIMEOUT=8,Wi.HTTP_ERROR=6,ko=Wi,yd.COMPLETE="complete",wm=yd,fd.EventType=As,As.OPEN="a",As.CLOSE="b",As.ERROR="c",As.MESSAGE="d",Be.prototype.listen=Be.prototype.K,Gs=fd,Se.prototype.listenOnce=Se.prototype.L,Se.prototype.getLastError=Se.prototype.Ka,Se.prototype.getLastErrorCode=Se.prototype.Ba,Se.prototype.getStatus=Se.prototype.Z,Se.prototype.getResponseJson=Se.prototype.Oa,Se.prototype.getResponseText=Se.prototype.oa,Se.prototype.send=Se.prototype.ea,Se.prototype.setWithCredentials=Se.prototype.Ha,bm=Se}).apply(typeof lo<"u"?lo:typeof self<"u"?self:typeof window<"u"?window:{});const Vh="@firebase/firestore",Oh="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Je.UNAUTHENTICATED=new Je(null),Je.GOOGLE_CREDENTIALS=new Je("google-credentials-uid"),Je.FIRST_PARTY=new Je("first-party-uid"),Je.MOCK_USER=new Je("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _s="11.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr=new Ra("@firebase/firestore");function xr(){return sr.logLevel}function B(n,...e){if(sr.logLevel<=ce.DEBUG){const t=e.map(Hl);sr.debug(`Firestore (${_s}): ${n}`,...t)}}function Xe(n,...e){if(sr.logLevel<=ce.ERROR){const t=e.map(Hl);sr.error(`Firestore (${_s}): ${n}`,...t)}}function di(n,...e){if(sr.logLevel<=ce.WARN){const t=e.map(Hl);sr.warn(`Firestore (${_s}): ${n}`,...t)}}function Hl(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function Q(n="Unexpected state"){const e=`FIRESTORE (${_s}) INTERNAL ASSERTION FAILED: `+n;throw Xe(e),new Error(e)}function Y(n,e){n||Q()}function ne(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class q extends Dt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Xw{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Je.UNAUTHENTICATED))}shutdown(){}}class Zw{constructor(e){this.t=e,this.currentUser=Je.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Y(this.o===void 0);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new Ct;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ct,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{B("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(B("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ct)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(B("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Y(typeof r.accessToken=="string"),new Jw(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Y(e===null||typeof e=="string"),new Je(e)}}class eE{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Je.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class tE{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new eE(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Je.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Lh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class nE{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,dt(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){Y(this.o===void 0);const r=i=>{i.error!=null&&B("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,B("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{B("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):B("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new Lh(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Y(typeof t.token=="string"),this.R=t.token,new Lh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function el(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=rE(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function te(n,e){return n<e?-1:n>e?1:0}function tl(n,e){const t=el().encode(n),r=el().encode(e);for(let s=0;s<Math.min(t.length,r.length);s++){const i=te(t[s],r[s]);if(i!==0)return i}return te(t.length,r.length)}function Wr(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function Rm(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh=-62135596800,Fh=1e6;class Ae{static now(){return Ae.fromMillis(Date.now())}static fromDate(e){return Ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Fh);return new Ae(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new q(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new q(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Mh)throw new q(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new q(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Fh}_compareTo(e){return this.seconds===e.seconds?te(this.nanoseconds,e.nanoseconds):te(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-Mh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{static fromTimestamp(e){return new J(e)}static min(){return new J(new Ae(0,0))}static max(){return new J(new Ae(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh="__name__";class wt{constructor(e,t,r){t===void 0?t=0:t>e.length&&Q(),r===void 0?r=e.length-t:r>e.length-t&&Q(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return wt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof wt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=wt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return te(e.length,t.length)}static compareSegments(e,t){const r=wt.isNumericId(e),s=wt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?wt.extractNumericId(e).compare(wt.extractNumericId(t)):tl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return gn.fromString(e.substring(4,e.length-2))}}class pe extends wt{construct(e,t,r){return new pe(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new q(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new pe(t)}static emptyPath(){return new pe([])}}const sE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Te extends wt{construct(e,t,r){return new Te(e,t,r)}static isValidIdentifier(e){return sE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Te.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Uh}static keyField(){return new Te([Uh])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new q(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new q(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new q(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new q(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Te(t)}static emptyPath(){return new Te([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e){this.path=e}static fromPath(e){return new H(pe.fromString(e))}static fromName(e){return new H(pe.fromString(e).popFirst(5))}static empty(){return new H(pe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&pe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return pe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new H(new pe(e.slice()))}}/**
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
 */const hi=-1;class Jo{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function nl(n){return n.fields.find(e=>e.kind===2)}function qn(n){return n.fields.filter(e=>e.kind!==2)}Jo.UNKNOWN_ID=-1;class xo{constructor(e,t){this.fieldPath=e,this.kind=t}}class fi{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new fi(0,lt.min())}}function iE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=J.fromTimestamp(r===1e9?new Ae(t+1,0):new Ae(t,r));return new lt(s,H.empty(),e)}function Cm(n){return new lt(n.readTime,n.key,hi)}class lt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new lt(J.min(),H.empty(),hi)}static max(){return new lt(J.max(),H.empty(),hi)}}function Kl(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=H.comparator(n.documentKey,e.documentKey),t!==0?t:te(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class km{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mr(n){if(n.code!==O.FAILED_PRECONDITION||n.message!==Pm)throw n;B("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Q(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):D.reject(t)}static resolve(e){return new D((t,r)=>{t(e)})}static reject(e){return new D((t,r)=>{r(e)})}static waitFor(e){return new D((t,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},l=>r(l))}),o=!0,i===s&&t()})}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next(s=>s?D.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new D((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next(p=>{o[h]=p,++c,c===i&&r(o)},p=>s(p))}})}static doWhile(e,t){return new D((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at="SimpleDb";class Da{static open(e,t,r,s){try{return new Da(t,e.transaction(s,r))}catch(i){throw new Xs(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.m=new Ct,this.transaction.oncomplete=()=>{this.m.resolve()},this.transaction.onabort=()=>{t.error?this.m.reject(new Xs(e,t.error)):this.m.resolve()},this.transaction.onerror=r=>{const s=Wl(r.target.error);this.m.reject(new Xs(e,s))}}get p(){return this.m.promise}abort(e){e&&this.m.reject(e),this.aborted||(B(at,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}S(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new aE(t)}}class _n{static delete(e){return B(at,"Removing database:",e),Gn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Sa())return!1;if(_n.v())return!0;const e=Ve(),t=_n.C(e),r=0<t&&t<10,s=xm(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.F)==="YES"}static M(e,t){return e.store(t)}static C(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.O=r,_n.C(Ve())===12.2&&Xe("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async N(e){return this.db||(B(at,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new Xs(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new q(O.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new q(O.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Xs(e,o))},s.onupgradeneeded=i=>{B(at,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.O.B(o,s.transaction,i.oldVersion,this.version).next(()=>{B(at,"Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=t=>this.L(t)),this.db}k(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.N(e);const c=Da.open(this.db,e,i?"readonly":"readwrite",r),l=s(c).next(h=>(c.S(),h)).catch(h=>(c.abort(h),D.reject(h))).toPromise();return l.catch(()=>{}),await c.p,l}catch(c){const l=c,h=l.name!=="FirebaseError"&&o<3;if(B(at,"Transaction failed with error:",l.message,"Retrying:",h),this.close(),!h)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function xm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class oE{constructor(e){this.q=e,this.$=!1,this.U=null}get isDone(){return this.$}get K(){return this.U}set cursor(e){this.q=e}done(){this.$=!0}W(e){this.U=e}delete(){return Gn(this.q.delete())}}class Xs extends q{constructor(e,t){super(O.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Cn(n){return n.name==="IndexedDbTransactionError"}class aE{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(B(at,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(B(at,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Gn(r)}add(e){return B(at,"ADD",this.store.name,e,e),Gn(this.store.add(e))}get(e){return Gn(this.store.get(e)).next(t=>(t===void 0&&(t=null),B(at,"GET",this.store.name,e,t),t))}delete(e){return B(at,"DELETE",this.store.name,e),Gn(this.store.delete(e))}count(){return B(at,"COUNT",this.store.name),Gn(this.store.count())}G(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new D((o,c)=>{i.onerror=l=>{c(l.target.error)},i.onsuccess=l=>{o(l.target.result)}})}{const i=this.cursor(r),o=[];return this.j(i,(c,l)=>{o.push(l)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new D((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}J(e,t){B(at,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.j(s,(i,o,c)=>c.delete())}Z(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.j(s,t)}X(e){const t=this.cursor({});return new D((r,s)=>{t.onerror=i=>{const o=Wl(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}j(e,t){const r=[];return new D((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const l=new oE(c),h=t(c.primaryKey,c.value,l);if(h instanceof D){const p=h.catch(m=>(l.done(),D.reject(m)));r.push(p)}l.isDone?s():l.K===null?c.continue():c.continue(l.K)}}).next(()=>D.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Gn(n){return new D((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=Wl(r.target.error);t(s)}})}let Bh=!1;function Wl(n){const e=_n.C(Ve());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new q("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Bh||(Bh=!0,setTimeout(()=>{throw r},0)),r}}return n}const Zs="IndexBackfiller";class cE{constructor(e,t){this.asyncQueue=e,this.ee=t,this.task=null}start(){this.te(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}te(e){B(Zs,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ee.ne();B(Zs,`Documents written: ${t}`)}catch(t){Cn(t)?B(Zs,"Ignoring IndexedDB error during index backfill: ",t):await mr(t)}await this.te(6e4)})}}class lE{constructor(e,t){this.localStore=e,this.persistence=t}async ne(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.re(t,e))}re(e,t){const r=new Set;let s=t,i=!0;return D.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return B(Zs,`Processing collection: ${o}`),this.ie(e,o,s).next(c=>{s-=c,r.add(o)});i=!1})).next(()=>t-s)}ie(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.se(s,i)).next(c=>(B(Zs,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}se(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=Cm(i);Kl(o,r)>0&&(r=o)}),new lt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class ht{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}ht.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn=-1;function Na(n){return n==null}function pi(n){return n===0&&1/n==-1/0}function uE(n){return typeof n=="number"&&Number.isInteger(n)&&!pi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xo="";function He(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=$h(e)),e=dE(n.get(t),e);return $h(e)}function dE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Xo:t+="";break;default:t+=i}}return t}function $h(n){return n+Xo+""}function Tt(n){const e=n.length;if(Y(e>=2),e===2)return Y(n.charAt(0)===Xo&&n.charAt(1)===""),pe.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(Xo,i);switch((o<0||o>t)&&Q(),n.charAt(o+1)){case"":const c=n.substring(i,o);let l;s.length===0?l=c:(s+=c,l=s,s=""),r.push(l);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:Q()}i=o+2}return new pe(r)}/**
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
 */const jn="remoteDocuments",Ni="owner",Ar="owner",mi="mutationQueues",hE="userId",yt="mutations",qh="batchId",Qn="userMutationsIndex",jh=["userId","batchId"];/**
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
 */function Do(n,e){return[n,He(e)]}function Dm(n,e,t){return[n,He(e),t]}const fE={},Qr="documentMutations",Zo="remoteDocumentsV14",pE=["prefixPath","collectionGroup","readTime","documentId"],No="documentKeyIndex",mE=["prefixPath","collectionGroup","documentId"],Nm="collectionGroupIndex",gE=["collectionGroup","readTime","prefixPath","documentId"],gi="remoteDocumentGlobal",rl="remoteDocumentGlobalKey",Yr="targets",Vm="queryTargetsIndex",_E=["canonicalId","targetId"],Jr="targetDocuments",yE=["targetId","path"],Ql="documentTargetsIndex",vE=["path","targetId"],ea="targetGlobalKey",er="targetGlobal",_i="collectionParents",IE=["collectionId","parent"],Xr="clientMetadata",bE="clientId",Va="bundles",wE="bundleId",Oa="namedQueries",EE="name",Yl="indexConfiguration",TE="indexId",sl="collectionGroupIndex",AE="collectionGroup",ta="indexState",SE=["indexId","uid"],Om="sequenceNumberIndex",RE=["uid","sequenceNumber"],na="indexEntries",CE=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Lm="documentKeyIndex",PE=["indexId","uid","orderedDocumentKey"],La="documentOverlays",kE=["userId","collectionPath","documentId"],il="collectionPathOverlayIndex",xE=["userId","collectionPath","largestBatchId"],Mm="collectionGroupOverlayIndex",DE=["userId","collectionGroup","largestBatchId"],Jl="globals",NE="name",Fm=[mi,yt,Qr,jn,Yr,Ni,er,Jr,Xr,gi,_i,Va,Oa],VE=[...Fm,La],Um=[mi,yt,Qr,Zo,Yr,Ni,er,Jr,Xr,gi,_i,Va,Oa,La],Bm=Um,Xl=[...Bm,Yl,ta,na],OE=Xl,LE=[...Xl,Jl];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol extends km{constructor(e,t){super(),this.ue=e,this.currentSequenceNumber=t}}function Oe(n,e){const t=ne(n);return _n.M(t.ue,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Pn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function $m(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e,t){this.comparator=e,this.root=t||Ue.EMPTY}insert(e,t){return new Ee(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ue.BLACK,null,null))}remove(e){return new Ee(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ue.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new uo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new uo(this.root,e,this.comparator,!1)}getReverseIterator(){return new uo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new uo(this.root,e,this.comparator,!0)}}class uo{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ue{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ue.RED,this.left=s??Ue.EMPTY,this.right=i??Ue.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ue(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ue.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ue.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ue.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ue.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw Q();const e=this.left.check();if(e!==this.right.check())throw Q();return e+(this.isRed()?0:1)}}Ue.EMPTY=null,Ue.RED=!0,Ue.BLACK=!1;Ue.EMPTY=new class{constructor(){this.size=0}get key(){throw Q()}get value(){throw Q()}get color(){throw Q()}get left(){throw Q()}get right(){throw Q()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ue(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.comparator=e,this.data=new Ee(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Gh(this.data.getIterator())}getIteratorFrom(e){return new Gh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof _e)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new _e(this.comparator);return t.data=e,t}}class Gh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Sr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.fields=e,e.sort(Te.comparator)}static empty(){return new rt([])}unionWith(e){let t=new _e(Te.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new rt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Wr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class qm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new qm("Invalid base64 string: "+i):i}}(e);return new xe(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new xe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return te(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}xe.EMPTY_BYTE_STRING=new xe("");const ME=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Gt(n){if(Y(!!n),typeof n=="string"){let e=0;const t=ME.exec(n);if(Y(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:we(n.seconds),nanos:we(n.nanos)}}function we(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ht(n){return typeof n=="string"?xe.fromBase64String(n):xe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jm="server_timestamp",zm="__type__",Gm="__previous_value__",Hm="__local_write_time__";function Ma(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[zm])===null||t===void 0?void 0:t.stringValue)===jm}function Fa(n){const e=n.mapValue.fields[Gm];return Ma(e)?Fa(e):e}function yi(n){const e=Gt(n.mapValue.fields[Hm].timestampValue);return new Ae(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FE{constructor(e,t,r,s,i,o,c,l,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h}}const ra="(default)";class ir{constructor(e,t){this.projectId=e,this.database=t||ra}static empty(){return new ir("","")}get isDefaultDatabase(){return this.database===ra}isEqual(e){return e instanceof ir&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl="__type__",Km="__max__",hn={mapValue:{fields:{__type__:{stringValue:Km}}}},eu="__vector__",Zr="value",Vo={nullValue:"NULL_VALUE"};function In(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ma(n)?4:Wm(n)?9007199254740991:Ua(n)?10:11:Q()}function kt(n,e){if(n===e)return!0;const t=In(n);if(t!==In(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return yi(n).isEqual(yi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Gt(s.timestampValue),c=Gt(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Ht(s.bytesValue).isEqual(Ht(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return we(s.geoPointValue.latitude)===we(i.geoPointValue.latitude)&&we(s.geoPointValue.longitude)===we(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return we(s.integerValue)===we(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=we(s.doubleValue),c=we(i.doubleValue);return o===c?pi(o)===pi(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return Wr(n.arrayValue.values||[],e.arrayValue.values||[],kt);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(zh(o)!==zh(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!kt(o[l],c[l])))return!1;return!0}(n,e);default:return Q()}}function vi(n,e){return(n.values||[]).find(t=>kt(t,e))!==void 0}function bn(n,e){if(n===e)return 0;const t=In(n),r=In(e);if(t!==r)return te(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return te(n.booleanValue,e.booleanValue);case 2:return function(i,o){const c=we(i.integerValue||i.doubleValue),l=we(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Hh(n.timestampValue,e.timestampValue);case 4:return Hh(yi(n),yi(e));case 5:return tl(n.stringValue,e.stringValue);case 6:return function(i,o){const c=Ht(i),l=Ht(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),l=o.split("/");for(let h=0;h<c.length&&h<l.length;h++){const p=te(c[h],l[h]);if(p!==0)return p}return te(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,o){const c=te(we(i.latitude),we(o.latitude));return c!==0?c:te(we(i.longitude),we(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Kh(n.arrayValue,e.arrayValue);case 10:return function(i,o){var c,l,h,p;const m=i.fields||{},I=o.fields||{},A=(c=m[Zr])===null||c===void 0?void 0:c.arrayValue,S=(l=I[Zr])===null||l===void 0?void 0:l.arrayValue,P=te(((h=A?.values)===null||h===void 0?void 0:h.length)||0,((p=S?.values)===null||p===void 0?void 0:p.length)||0);return P!==0?P:Kh(A,S)}(n.mapValue,e.mapValue);case 11:return function(i,o){if(i===hn.mapValue&&o===hn.mapValue)return 0;if(i===hn.mapValue)return 1;if(o===hn.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=o.fields||{},p=Object.keys(h);l.sort(),p.sort();for(let m=0;m<l.length&&m<p.length;++m){const I=tl(l[m],p[m]);if(I!==0)return I;const A=bn(c[l[m]],h[p[m]]);if(A!==0)return A}return te(l.length,p.length)}(n.mapValue,e.mapValue);default:throw Q()}}function Hh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return te(n,e);const t=Gt(n),r=Gt(e),s=te(t.seconds,r.seconds);return s!==0?s:te(t.nanos,r.nanos)}function Kh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=bn(t[s],r[s]);if(i)return i}return te(t.length,r.length)}function es(n){return al(n)}function al(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Gt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Ht(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return H.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=al(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${al(t.fields[o])}`;return s+"}"}(n.mapValue):Q()}function Oo(n){switch(In(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Fa(n);return e?16+Oo(e):16;case 5:return 2*n.stringValue.length;case 6:return Ht(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Oo(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Pn(r.fields,(i,o)=>{s+=i.length+Oo(o)}),s}(n.mapValue);default:throw Q()}}function or(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function cl(n){return!!n&&"integerValue"in n}function Ii(n){return!!n&&"arrayValue"in n}function Wh(n){return!!n&&"nullValue"in n}function Qh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Lo(n){return!!n&&"mapValue"in n}function Ua(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Zl])===null||t===void 0?void 0:t.stringValue)===eu}function ei(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Pn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ei(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ei(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Wm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Km}const Qm={mapValue:{fields:{[Zl]:{stringValue:eu},[Zr]:{arrayValue:{}}}}};function UE(n){return"nullValue"in n?Vo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?or(ir.empty(),H.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?Ua(n)?Qm:{mapValue:{}}:Q()}function BE(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?or(ir.empty(),H.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Qm:"mapValue"in n?Ua(n)?{mapValue:{}}:hn:Q()}function Yh(n,e){const t=bn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Jh(n,e){const t=bn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this.value=e}static empty(){return new Ge({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Lo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ei(t)}setAll(e){let t=Te.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=ei(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Lo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return kt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Lo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Pn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ge(ei(this.value))}}function Ym(n){const e=[];return Pn(n.fields,(t,r)=>{const s=new Te([t]);if(Lo(r)){const i=Ym(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new rt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Ce(e,0,J.min(),J.min(),J.min(),Ge.empty(),0)}static newFoundDocument(e,t,r,s){return new Ce(e,1,t,J.min(),r,s,0)}static newNoDocument(e,t){return new Ce(e,2,t,J.min(),J.min(),Ge.empty(),0)}static newUnknownDocument(e,t){return new Ce(e,3,t,J.min(),J.min(),Ge.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(J.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ge.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ge.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ce&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ce(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class wn{constructor(e,t){this.position=e,this.inclusive=t}}function Xh(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=H.comparator(H.fromName(o.referenceValue),t.key):r=bn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Zh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!kt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class bi{constructor(e,t="asc"){this.field=e,this.dir=t}}function $E(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Jm{}class le extends Jm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new qE(e,t,r):t==="array-contains"?new GE(e,r):t==="in"?new rg(e,r):t==="not-in"?new HE(e,r):t==="array-contains-any"?new KE(e,r):new le(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new jE(e,r):new zE(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(bn(t,this.value)):t!==null&&In(this.value)===In(t)&&this.matchesComparison(bn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Q()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ge extends Jm{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new ge(e,t)}matches(e){return ts(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function ts(n){return n.op==="and"}function ll(n){return n.op==="or"}function tu(n){return Xm(n)&&ts(n)}function Xm(n){for(const e of n.filters)if(e instanceof ge)return!1;return!0}function ul(n){if(n instanceof le)return n.field.canonicalString()+n.op.toString()+es(n.value);if(tu(n))return n.filters.map(e=>ul(e)).join(",");{const e=n.filters.map(t=>ul(t)).join(",");return`${n.op}(${e})`}}function Zm(n,e){return n instanceof le?function(r,s){return s instanceof le&&r.op===s.op&&r.field.isEqual(s.field)&&kt(r.value,s.value)}(n,e):n instanceof ge?function(r,s){return s instanceof ge&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&Zm(o,s.filters[c]),!0):!1}(n,e):void Q()}function eg(n,e){const t=n.filters.concat(e);return ge.create(t,n.op)}function tg(n){return n instanceof le?function(t){return`${t.field.canonicalString()} ${t.op} ${es(t.value)}`}(n):n instanceof ge?function(t){return t.op.toString()+" {"+t.getFilters().map(tg).join(" ,")+"}"}(n):"Filter"}class qE extends le{constructor(e,t,r){super(e,t,r),this.key=H.fromName(r.referenceValue)}matches(e){const t=H.comparator(e.key,this.key);return this.matchesComparison(t)}}class jE extends le{constructor(e,t){super(e,"in",t),this.keys=ng("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class zE extends le{constructor(e,t){super(e,"not-in",t),this.keys=ng("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function ng(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>H.fromName(r.referenceValue))}class GE extends le{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ii(t)&&vi(t.arrayValue,this.value)}}class rg extends le{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&vi(this.value.arrayValue,t)}}class HE extends le{constructor(e,t){super(e,"not-in",t)}matches(e){if(vi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!vi(this.value.arrayValue,t)}}class KE extends le{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ii(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>vi(this.value.arrayValue,r))}}/**
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
 */class WE{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.le=null}}function dl(n,e=null,t=[],r=[],s=null,i=null,o=null){return new WE(n,e,t,r,s,i,o)}function ar(n){const e=ne(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ul(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Na(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>es(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>es(r)).join(",")),e.le=t}return e.le}function Vi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!$E(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Zm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Zh(n.startAt,e.startAt)&&Zh(n.endAt,e.endAt)}function sa(n){return H.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function ia(n,e){return n.filters.filter(t=>t instanceof le&&t.field.isEqual(e))}function ef(n,e,t){let r=Vo,s=!0;for(const i of ia(n,e)){let o=Vo,c=!0;switch(i.op){case"<":case"<=":o=UE(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Vo}Yh({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Yh({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function tf(n,e,t){let r=hn,s=!0;for(const i of ia(n,e)){let o=hn,c=!0;switch(i.op){case">=":case">":o=BE(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=hn}Jh({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Jh({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function QE(n,e,t,r,s,i,o,c){return new gr(n,e,t,r,s,i,o,c)}function Oi(n){return new gr(n)}function nf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function nu(n){return n.collectionGroup!==null}function qr(n){const e=ne(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new _e(Te.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new bi(i,r))}),t.has(Te.keyField().canonicalString())||e.he.push(new bi(Te.keyField(),r))}return e.he}function ft(n){const e=ne(n);return e.Pe||(e.Pe=YE(e,qr(n))),e.Pe}function YE(n,e){if(n.limitType==="F")return dl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new bi(s.field,i)});const t=n.endAt?new wn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new wn(n.startAt.position,n.startAt.inclusive):null;return dl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function hl(n,e){const t=n.filters.concat([e]);return new gr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function oa(n,e,t){return new gr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ba(n,e){return Vi(ft(n),ft(e))&&n.limitType===e.limitType}function sg(n){return`${ar(ft(n))}|lt:${n.limitType}`}function Dr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>tg(s)).join(", ")}]`),Na(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>es(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>es(s)).join(",")),`Target(${r})`}(ft(n))}; limitType=${n.limitType})`}function Li(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):H.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of qr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,l){const h=Xh(o,c,l);return o.inclusive?h<=0:h<0}(r.startAt,qr(r),s)||r.endAt&&!function(o,c,l){const h=Xh(o,c,l);return o.inclusive?h>=0:h>0}(r.endAt,qr(r),s))}(n,e)}function JE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function ig(n){return(e,t)=>{let r=!1;for(const s of qr(n)){const i=XE(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function XE(n,e,t){const r=n.field.isKeyField()?H.comparator(e.key,t.key):function(i,o,c){const l=o.data.field(i),h=c.data.field(i);return l!==null&&h!==null?bn(l,h):Q()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return Q()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Pn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return $m(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZE=new Ee(H.comparator);function ct(){return ZE}const og=new Ee(H.comparator);function Hs(...n){let e=og;for(const t of n)e=e.insert(t.key,t);return e}function ag(n){let e=og;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function At(){return ti()}function cg(){return ti()}function ti(){return new Kt(n=>n.toString(),(n,e)=>n.isEqual(e))}const eT=new Ee(H.comparator),tT=new _e(H.comparator);function ie(...n){let e=tT;for(const t of n)e=e.add(t);return e}const nT=new _e(te);function rT(){return nT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ru(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:pi(e)?"-0":e}}function lg(n){return{integerValue:""+n}}function ug(n,e){return uE(e)?lg(e):ru(n,e)}/**
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
 */class $a{constructor(){this._=void 0}}function sT(n,e,t){return n instanceof wi?function(s,i){const o={fields:{[zm]:{stringValue:jm},[Hm]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ma(i)&&(i=Fa(i)),i&&(o.fields[Gm]=i),{mapValue:o}}(t,e):n instanceof ns?hg(n,e):n instanceof rs?fg(n,e):function(s,i){const o=dg(s,i),c=rf(o)+rf(s.Ie);return cl(o)&&cl(s.Ie)?lg(c):ru(s.serializer,c)}(n,e)}function iT(n,e,t){return n instanceof ns?hg(n,e):n instanceof rs?fg(n,e):t}function dg(n,e){return n instanceof ss?function(r){return cl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class wi extends $a{}class ns extends $a{constructor(e){super(),this.elements=e}}function hg(n,e){const t=pg(e);for(const r of n.elements)t.some(s=>kt(s,r))||t.push(r);return{arrayValue:{values:t}}}class rs extends $a{constructor(e){super(),this.elements=e}}function fg(n,e){let t=pg(e);for(const r of n.elements)t=t.filter(s=>!kt(s,r));return{arrayValue:{values:t}}}class ss extends $a{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function rf(n){return we(n.integerValue||n.doubleValue)}function pg(n){return Ii(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e,t){this.field=e,this.transform=t}}function oT(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof ns&&s instanceof ns||r instanceof rs&&s instanceof rs?Wr(r.elements,s.elements,kt):r instanceof ss&&s instanceof ss?kt(r.Ie,s.Ie):r instanceof wi&&s instanceof wi}(n.transform,e.transform)}class aT{constructor(e,t){this.version=e,this.transformResults=t}}class Ze{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ze}static exists(e){return new Ze(void 0,e)}static updateTime(e){return new Ze(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Mo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class qa{}function gg(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new su(n.key,Ze.none()):new ys(n.key,n.data,Ze.none());{const t=n.data,r=Ge.empty();let s=new _e(Te.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Wt(n.key,r,new rt(s.toArray()),Ze.none())}}function cT(n,e,t){n instanceof ys?function(s,i,o){const c=s.value.clone(),l=of(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Wt?function(s,i,o){if(!Mo(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=of(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(_g(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function ni(n,e,t,r){return n instanceof ys?function(i,o,c,l){if(!Mo(i.precondition,o))return c;const h=i.value.clone(),p=af(i.fieldTransforms,l,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Wt?function(i,o,c,l){if(!Mo(i.precondition,o))return c;const h=af(i.fieldTransforms,l,o),p=o.data;return p.setAll(_g(i)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(i,o,c){return Mo(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function lT(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=dg(r.transform,s||null);i!=null&&(t===null&&(t=Ge.empty()),t.set(r.field,i))}return t||null}function sf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Wr(r,s,(i,o)=>oT(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ys extends qa{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Wt extends qa{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function _g(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function of(n,e,t){const r=new Map;Y(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,iT(o,c,t[s]))}return r}function af(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,sT(i,o,e))}return r}class su extends qa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class yg extends qa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&cT(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=ni(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=ni(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=cg();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const l=gg(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(J.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ie())}isEqual(e){return this.batchId===e.batchId&&Wr(this.mutations,e.mutations,(t,r)=>sf(t,r))&&Wr(this.baseMutations,e.baseMutations,(t,r)=>sf(t,r))}}class ou{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Y(e.mutations.length===r.length);let s=function(){return eT}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new ou(e,t,r,s)}}/**
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
 */class au{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class uT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ke,de;function dT(n){switch(n){case O.OK:return Q();case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0;default:return Q()}}function vg(n){if(n===void 0)return Xe("GRPC error has no .code"),O.UNKNOWN;switch(n){case ke.OK:return O.OK;case ke.CANCELLED:return O.CANCELLED;case ke.UNKNOWN:return O.UNKNOWN;case ke.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case ke.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case ke.INTERNAL:return O.INTERNAL;case ke.UNAVAILABLE:return O.UNAVAILABLE;case ke.UNAUTHENTICATED:return O.UNAUTHENTICATED;case ke.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case ke.NOT_FOUND:return O.NOT_FOUND;case ke.ALREADY_EXISTS:return O.ALREADY_EXISTS;case ke.PERMISSION_DENIED:return O.PERMISSION_DENIED;case ke.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case ke.ABORTED:return O.ABORTED;case ke.OUT_OF_RANGE:return O.OUT_OF_RANGE;case ke.UNIMPLEMENTED:return O.UNIMPLEMENTED;case ke.DATA_LOSS:return O.DATA_LOSS;default:return Q()}}(de=ke||(ke={}))[de.OK=0]="OK",de[de.CANCELLED=1]="CANCELLED",de[de.UNKNOWN=2]="UNKNOWN",de[de.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",de[de.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",de[de.NOT_FOUND=5]="NOT_FOUND",de[de.ALREADY_EXISTS=6]="ALREADY_EXISTS",de[de.PERMISSION_DENIED=7]="PERMISSION_DENIED",de[de.UNAUTHENTICATED=16]="UNAUTHENTICATED",de[de.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",de[de.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",de[de.ABORTED=10]="ABORTED",de[de.OUT_OF_RANGE=11]="OUT_OF_RANGE",de[de.UNIMPLEMENTED=12]="UNIMPLEMENTED",de[de.INTERNAL=13]="INTERNAL",de[de.UNAVAILABLE=14]="UNAVAILABLE",de[de.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const hT=new gn([4294967295,4294967295],0);function cf(n){const e=el().encode(n),t=new Im;return t.update(e),new Uint8Array(t.digest())}function lf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new gn([t,r],0),new gn([s,i],0)]}class cu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ks(`Invalid padding: ${t}`);if(r<0)throw new Ks(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ks(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ks(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=gn.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(gn.fromNumber(r)));return s.compare(hT)===1&&(s=new gn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=cf(e),[r,s]=lf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);if(!this.Re(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new cu(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ee===0)return;const t=cf(e),[r,s]=lf(t);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ks extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Mi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ja(J.min(),s,new Ee(te),ct(),ie())}}class Mi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Mi(r,t,ie(),ie(),ie())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class Ig{constructor(e,t){this.targetId=e,this.ge=t}}class bg{constructor(e,t,r=xe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class uf{constructor(){this.pe=0,this.ye=df(),this.we=xe.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=ie(),t=ie(),r=ie();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:Q()}}),new Mi(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=df()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,Y(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class fT{constructor(e){this.ke=e,this.qe=new Map,this.Qe=ct(),this.$e=ho(),this.Ue=ho(),this.Ke=new Ee(te)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:Q()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(sa(i))if(r===0){const o=new H(i.path);this.ze(t,o,Ce.newNoDocument(o,J.min()))}else Y(r===1);else{const o=this.et(t);if(o!==r){const c=this.tt(e),l=c?this.nt(c,e,o):1;if(l!==0){this.Ye(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,h)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Ht(r).toUint8Array()}catch(l){if(l instanceof qm)return di("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new cu(o,s,i)}catch(l){return di(l instanceof Ks?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const o=this.ke.it(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,o)=>{const c=this.Xe(o);if(c){if(i.current&&sa(c.target)){const l=new H(c.target.path);this._t(l).has(o)||this.ut(o,l)||this.ze(o,l,Ce.newNoDocument(l,e))}i.ve&&(t.set(o,i.Fe()),i.Me())}});let r=ie();this.Ue.forEach((i,o)=>{let c=!0;o.forEachWhile(l=>{const h=this.Xe(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.Qe.forEach((i,o)=>o.setReadTime(e));const s=new ja(e,t,this.Ke,this.Qe,r);return this.Qe=ct(),this.$e=ho(),this.Ue=ho(),this.Ke=new Ee(te),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new uf,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new _e(te),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new _e(te),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||B("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new uf),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function ho(){return new Ee(H.comparator)}function df(){return new Ee(H.comparator)}const pT={asc:"ASCENDING",desc:"DESCENDING"},mT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},gT={and:"AND",or:"OR"};class _T{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function fl(n,e){return n.useProto3Json||Na(e)?e:{value:e}}function is(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function wg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function yT(n,e){return is(n,e.toTimestamp())}function et(n){return Y(!!n),J.fromTimestamp(function(t){const r=Gt(t);return new Ae(r.seconds,r.nanos)}(n))}function lu(n,e){return pl(n,e).canonicalString()}function pl(n,e){const t=function(s){return new pe(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Eg(n){const e=pe.fromString(n);return Y(Dg(e)),e}function aa(n,e){return lu(n.databaseId,e.path)}function tr(n,e){const t=Eg(e);if(t.get(1)!==n.databaseId.projectId)throw new q(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new q(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new H(Sg(t))}function Tg(n,e){return lu(n.databaseId,e)}function Ag(n){const e=Eg(n);return e.length===4?pe.emptyPath():Sg(e)}function ml(n){return new pe(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Sg(n){return Y(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function hf(n,e,t){return{name:aa(n,e),fields:t.value.mapValue.fields}}function vT(n,e,t){const r=tr(n,e.name),s=et(e.updateTime),i=e.createTime?et(e.createTime):J.min(),o=new Ge({mapValue:{fields:e.fields}}),c=Ce.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function IT(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:Q()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,p){return h.useProto3Json?(Y(p===void 0||typeof p=="string"),xe.fromBase64String(p||"")):(Y(p===void 0||p instanceof Buffer||p instanceof Uint8Array),xe.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){const p=h.code===void 0?O.UNKNOWN:vg(h.code);return new q(p,h.message||"")}(o);t=new bg(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=tr(n,r.document.name),i=et(r.document.updateTime),o=r.document.createTime?et(r.document.createTime):J.min(),c=new Ge({mapValue:{fields:r.document.fields}}),l=Ce.newFoundDocument(s,i,o,c),h=r.targetIds||[],p=r.removedTargetIds||[];t=new Fo(h,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=tr(n,r.document),i=r.readTime?et(r.readTime):J.min(),o=Ce.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Fo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=tr(n,r.document),i=r.removedTargetIds||[];t=new Fo([],i,s,null)}else{if(!("filter"in e))return Q();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new uT(s,i),c=r.targetId;t=new Ig(c,o)}}return t}function ca(n,e){let t;if(e instanceof ys)t={update:hf(n,e.key,e.value)};else if(e instanceof su)t={delete:aa(n,e.key)};else if(e instanceof Wt)t={update:hf(n,e.key,e.data),updateMask:ST(e.fieldMask)};else{if(!(e instanceof yg))return Q();t={verify:aa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof wi)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ns)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof rs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ss)return{fieldPath:o.field.canonicalString(),increment:c.Ie};throw Q()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:yT(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Q()}(n,e.precondition)),t}function gl(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?Ze.updateTime(et(i.updateTime)):i.exists!==void 0?Ze.exists(i.exists):Ze.none()}(e.currentDocument):Ze.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let l=null;if("setToServerValue"in c)Y(c.setToServerValue==="REQUEST_TIME"),l=new wi;else if("appendMissingElements"in c){const p=c.appendMissingElements.values||[];l=new ns(p)}else if("removeAllFromArray"in c){const p=c.removeAllFromArray.values||[];l=new rs(p)}else"increment"in c?l=new ss(o,c.increment):Q();const h=Te.fromServerFormat(c.fieldPath);return new mg(h,l)}(n,s)):[];if(e.update){e.update.name;const s=tr(n,e.update.name),i=new Ge({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const h=l.fieldPaths||[];return new rt(h.map(p=>Te.fromServerFormat(p)))}(e.updateMask);return new Wt(s,i,o,t,r)}return new ys(s,i,t,r)}if(e.delete){const s=tr(n,e.delete);return new su(s,t)}if(e.verify){const s=tr(n,e.verify);return new yg(s,t)}return Q()}function bT(n,e){return n&&n.length>0?(Y(e!==void 0),n.map(t=>function(s,i){let o=s.updateTime?et(s.updateTime):et(i);return o.isEqual(J.min())&&(o=et(i)),new aT(o,s.transformResults||[])}(t,e))):[]}function Rg(n,e){return{documents:[Tg(n,e.path)]}}function Cg(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Tg(n,s);const i=function(h){if(h.length!==0)return xg(ge.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(p=>function(I){return{field:Nr(I.field),direction:ET(I.dir)}}(p))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=fl(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ht:t,parent:s}}function Pg(n){let e=Ag(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Y(r===1);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=function(m){const I=kg(m);return I instanceof ge&&tu(I)?I.getFilters():[I]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(I=>function(S){return new bi(Vr(S.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(I))}(t.orderBy));let c=null;t.limit&&(c=function(m){let I;return I=typeof m=="object"?m.value:m,Na(I)?null:I}(t.limit));let l=null;t.startAt&&(l=function(m){const I=!!m.before,A=m.values||[];return new wn(A,I)}(t.startAt));let h=null;return t.endAt&&(h=function(m){const I=!m.before,A=m.values||[];return new wn(A,I)}(t.endAt)),QE(e,s,o,i,c,"F",l,h)}function wT(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Q()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function kg(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Vr(t.unaryFilter.field);return le.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Vr(t.unaryFilter.field);return le.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Vr(t.unaryFilter.field);return le.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Vr(t.unaryFilter.field);return le.create(o,"!=",{nullValue:"NULL_VALUE"});default:return Q()}}(n):n.fieldFilter!==void 0?function(t){return le.create(Vr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Q()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ge.create(t.compositeFilter.filters.map(r=>kg(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return Q()}}(t.compositeFilter.op))}(n):Q()}function ET(n){return pT[n]}function TT(n){return mT[n]}function AT(n){return gT[n]}function Nr(n){return{fieldPath:n.canonicalString()}}function Vr(n){return Te.fromServerFormat(n.fieldPath)}function xg(n){return n instanceof le?function(t){if(t.op==="=="){if(Qh(t.value))return{unaryFilter:{field:Nr(t.field),op:"IS_NAN"}};if(Wh(t.value))return{unaryFilter:{field:Nr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Qh(t.value))return{unaryFilter:{field:Nr(t.field),op:"IS_NOT_NAN"}};if(Wh(t.value))return{unaryFilter:{field:Nr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Nr(t.field),op:TT(t.op),value:t.value}}}(n):n instanceof ge?function(t){const r=t.getFilters().map(s=>xg(s));return r.length===1?r[0]:{compositeFilter:{op:AT(t.op),filters:r}}}(n):Q()}function ST(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Dg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t,r,s,i=J.min(),o=J.min(),c=xe.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Bt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Bt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Bt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Bt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng{constructor(e){this.Tt=e}}function RT(n,e){let t;if(e.document)t=vT(n.Tt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=H.fromSegments(e.noDocument.path),s=lr(e.noDocument.readTime);t=Ce.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return Q();{const r=H.fromSegments(e.unknownDocument.path),s=lr(e.unknownDocument.version);t=Ce.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(s){const i=new Ae(s[0],s[1]);return J.fromTimestamp(i)}(e.readTime)),t}function ff(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:la(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,o){return{name:aa(i,o.key),fields:o.data.value.mapValue.fields,updateTime:is(i,o.version.toTimestamp()),createTime:is(i,o.createTime.toTimestamp())}}(n.Tt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:cr(e.version)};else{if(!e.isUnknownDocument())return Q();r.unknownDocument={path:t.path.toArray(),version:cr(e.version)}}return r}function la(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function cr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function lr(n){const e=new Ae(n.seconds,n.nanoseconds);return J.fromTimestamp(e)}function Hn(n,e){const t=(e.baseMutations||[]).map(i=>gl(n.Tt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>gl(n.Tt,i)),s=Ae.fromMillis(e.localWriteTimeMs);return new iu(e.batchId,s,t,r)}function Ws(n){const e=lr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?lr(n.lastLimboFreeSnapshotVersion):J.min();let r;return r=function(i){return i.documents!==void 0}(n.query)?function(i){return Y(i.documents.length===1),ft(Oi(Ag(i.documents[0])))}(n.query):function(i){return ft(Pg(i))}(n.query),new Bt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,xe.fromBase64String(n.resumeToken))}function Vg(n,e){const t=cr(e.snapshotVersion),r=cr(e.lastLimboFreeSnapshotVersion);let s;s=sa(e.target)?Rg(n.Tt,e.target):Cg(n.Tt,e.target).ht;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:ar(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function Og(n){const e=Pg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?oa(e,e.limit,"L"):e}function Dc(n,e){return new au(e.largestBatchId,gl(n.Tt,e.overlayMutation))}function pf(n,e){const t=e.path.lastSegment();return[n,He(e.path.popLast()),t]}function mf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:cr(r.readTime),documentKey:He(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{getBundleMetadata(e,t){return gf(e).get(t).next(r=>{if(r)return function(i){return{id:i.bundleId,createTime:lr(i.createTime),version:i.version}}(r)})}saveBundleMetadata(e,t){return gf(e).put(function(s){return{bundleId:s.id,createTime:cr(et(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return _f(e).get(t).next(r=>{if(r)return function(i){return{name:i.name,query:Og(i.bundledQuery),readTime:lr(i.readTime)}}(r)})}saveNamedQuery(e,t){return _f(e).put(function(s){return{name:s.name,readTime:cr(et(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function gf(n){return Oe(n,Va)}function _f(n){return Oe(n,Oa)}/**
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
 */class za{constructor(e,t){this.serializer=e,this.userId=t}static It(e,t){const r=t.uid||"";return new za(e,r)}getOverlay(e,t){return Ms(e).get(pf(this.userId,t)).next(r=>r?Dc(this.serializer,r):null)}getOverlays(e,t){const r=At();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const c=new au(t,o);s.push(this.Et(e,c))}),D.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(He(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(Ms(e).J(il,c))}),D.waitFor(i)}getOverlaysForCollection(e,t,r){const s=At(),i=He(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Ms(e).G(il,o).next(c=>{for(const l of c){const h=Dc(this.serializer,l);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=At();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Ms(e).Z({index:Mm,range:c},(l,h,p)=>{const m=Dc(this.serializer,h);i.size()<s||m.largestBatchId===o?(i.set(m.getKey(),m),o=m.largestBatchId):p.done()}).next(()=>i)}Et(e,t){return Ms(e).put(function(s,i,o){const[c,l,h]=pf(i,o.mutation.key);return{userId:i,collectionPath:l,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:ca(s.Tt,o.mutation)}}(this.serializer,this.userId,t))}}function Ms(n){return Oe(n,La)}/**
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
 */class PT{dt(e){return Oe(e,Jl)}getSessionToken(e){return this.dt(e).get("sessionToken").next(t=>{const r=t?.value;return r?xe.fromUint8Array(r):xe.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class Kn{constructor(){}At(e,t){this.Rt(e,t),t.Vt()}Rt(e,t){if("nullValue"in e)this.ft(t,5);else if("booleanValue"in e)this.ft(t,10),t.gt(e.booleanValue?1:0);else if("integerValue"in e)this.ft(t,15),t.gt(we(e.integerValue));else if("doubleValue"in e){const r=we(e.doubleValue);isNaN(r)?this.ft(t,13):(this.ft(t,15),pi(r)?t.gt(0):t.gt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ft(t,20),typeof r=="string"&&(r=Gt(r)),t.yt(`${r.seconds||""}`),t.gt(r.nanos||0)}else if("stringValue"in e)this.wt(e.stringValue,t),this.St(t);else if("bytesValue"in e)this.ft(t,30),t.bt(Ht(e.bytesValue)),this.St(t);else if("referenceValue"in e)this.Dt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ft(t,45),t.gt(r.latitude||0),t.gt(r.longitude||0)}else"mapValue"in e?Wm(e)?this.ft(t,Number.MAX_SAFE_INTEGER):Ua(e)?this.vt(e.mapValue,t):(this.Ct(e.mapValue,t),this.St(t)):"arrayValue"in e?(this.Ft(e.arrayValue,t),this.St(t)):Q()}wt(e,t){this.ft(t,25),this.Mt(e,t)}Mt(e,t){t.yt(e)}Ct(e,t){const r=e.fields||{};this.ft(t,55);for(const s of Object.keys(r))this.wt(s,t),this.Rt(r[s],t)}vt(e,t){var r,s;const i=e.fields||{};this.ft(t,53);const o=Zr,c=((s=(r=i[o].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.length)||0;this.ft(t,15),t.gt(we(c)),this.wt(o,t),this.Rt(i[o],t)}Ft(e,t){const r=e.values||[];this.ft(t,50);for(const s of r)this.Rt(s,t)}Dt(e,t){this.ft(t,37),H.fromName(e).path.forEach(r=>{this.ft(t,60),this.Mt(r,t)})}ft(e,t){e.gt(t)}St(e){e.gt(2)}}Kn.xt=new Kn;/**
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
 */const Rr=255;function kT(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function yf(n){const e=64-function(r){let s=0;for(let i=0;i<8;++i){const o=kT(255&r[i]);if(s+=o,o!==8)break}return s}(n);return Math.ceil(e/8)}class xT{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ot(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Nt(r.value),r=t.next();this.Bt()}Lt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.kt(r.value),r=t.next();this.qt()}Qt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Nt(r);else if(r<2048)this.Nt(960|r>>>6),this.Nt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Nt(480|r>>>12),this.Nt(128|63&r>>>6),this.Nt(128|63&r);else{const s=t.codePointAt(0);this.Nt(240|s>>>18),this.Nt(128|63&s>>>12),this.Nt(128|63&s>>>6),this.Nt(128|63&s)}}this.Bt()}$t(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.kt(r);else if(r<2048)this.kt(960|r>>>6),this.kt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.kt(480|r>>>12),this.kt(128|63&r>>>6),this.kt(128|63&r);else{const s=t.codePointAt(0);this.kt(240|s>>>18),this.kt(128|63&s>>>12),this.kt(128|63&s>>>6),this.kt(128|63&s)}}this.qt()}Ut(e){const t=this.Kt(e),r=yf(t);this.Wt(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Gt(e){const t=this.Kt(e),r=yf(t);this.Wt(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}zt(){this.jt(Rr),this.jt(255)}Ht(){this.Jt(Rr),this.Jt(255)}reset(){this.position=0}seed(e){this.Wt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Yt(){return this.buffer.slice(0,this.position)}Kt(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Nt(e){const t=255&e;t===0?(this.jt(0),this.jt(255)):t===Rr?(this.jt(Rr),this.jt(0)):this.jt(t)}kt(e){const t=255&e;t===0?(this.Jt(0),this.Jt(255)):t===Rr?(this.Jt(Rr),this.Jt(0)):this.Jt(e)}Bt(){this.jt(0),this.jt(1)}qt(){this.Jt(0),this.Jt(1)}jt(e){this.Wt(1),this.buffer[this.position++]=e}Jt(e){this.Wt(1),this.buffer[this.position++]=~e}Wt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class DT{constructor(e){this.Zt=e}bt(e){this.Zt.Ot(e)}yt(e){this.Zt.Qt(e)}gt(e){this.Zt.Ut(e)}Vt(){this.Zt.zt()}}class NT{constructor(e){this.Zt=e}bt(e){this.Zt.Lt(e)}yt(e){this.Zt.$t(e)}gt(e){this.Zt.Gt(e)}Vt(){this.Zt.Ht()}}class Fs{constructor(){this.Zt=new xT,this.Xt=new DT(this.Zt),this.en=new NT(this.Zt)}seed(e){this.Zt.seed(e)}tn(e){return e===0?this.Xt:this.en}Yt(){return this.Zt.Yt()}reset(){this.Zt.reset()}}/**
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
 */class Wn{constructor(e,t,r,s){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=s}nn(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new Wn(this.indexId,this.documentKey,this.arrayValue,r)}}function tn(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=vf(n.arrayValue,e.arrayValue),t!==0?t:(t=vf(n.directionalValue,e.directionalValue),t!==0?t:H.comparator(n.documentKey,e.documentKey)))}function vf(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class If{constructor(e){this.rn=new _e((t,r)=>Te.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.sn=e.orderBy,this._n=[];for(const t of e.filters){const r=t;r.isInequality()?this.rn=this.rn.add(r):this._n.push(r)}}get an(){return this.rn.size>1}un(e){if(Y(e.collectionGroup===this.collectionId),this.an)return!1;const t=nl(e);if(t!==void 0&&!this.cn(t))return!1;const r=qn(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.cn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.rn.size>0){const c=this.rn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const l=r[i];if(!this.ln(c,l)||!this.hn(this.sn[o++],l))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.sn.length||!this.hn(this.sn[o++],c))return!1}return!0}Pn(){if(this.an)return null;let e=new _e(Te.comparator);const t=[];for(const r of this._n)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new xo(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new xo(r.field,0))}for(const r of this.sn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new xo(r.field,r.dir==="asc"?0:1)));return new Jo(Jo.UNKNOWN_ID,this.collectionId,t,fi.empty())}cn(e){for(const t of this._n)if(this.ln(t,e))return!0;return!1}ln(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}hn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function Lg(n){var e,t;if(Y(n instanceof le||n instanceof ge),n instanceof le){if(n instanceof rg){const s=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>le.create(n.field,"==",i)))||[];return ge.create(s,"or")}return n}const r=n.filters.map(s=>Lg(s));return ge.create(r,n.op)}function VT(n){if(n.getFilters().length===0)return[];const e=vl(Lg(n));return Y(Mg(e)),_l(e)||yl(e)?[e]:e.getFilters()}function _l(n){return n instanceof le}function yl(n){return n instanceof ge&&tu(n)}function Mg(n){return _l(n)||yl(n)||function(t){if(t instanceof ge&&ll(t)){for(const r of t.getFilters())if(!_l(r)&&!yl(r))return!1;return!0}return!1}(n)}function vl(n){if(Y(n instanceof le||n instanceof ge),n instanceof le)return n;if(n.filters.length===1)return vl(n.filters[0]);const e=n.filters.map(r=>vl(r));let t=ge.create(e,n.op);return t=ua(t),Mg(t)?t:(Y(t instanceof ge),Y(ts(t)),Y(t.filters.length>1),t.filters.reduce((r,s)=>uu(r,s)))}function uu(n,e){let t;return Y(n instanceof le||n instanceof ge),Y(e instanceof le||e instanceof ge),t=n instanceof le?e instanceof le?function(s,i){return ge.create([s,i],"and")}(n,e):bf(n,e):e instanceof le?bf(e,n):function(s,i){if(Y(s.filters.length>0&&i.filters.length>0),ts(s)&&ts(i))return eg(s,i.getFilters());const o=ll(s)?s:i,c=ll(s)?i:s,l=o.filters.map(h=>uu(h,c));return ge.create(l,"or")}(n,e),ua(t)}function bf(n,e){if(ts(e))return eg(e,n.getFilters());{const t=e.filters.map(r=>uu(n,r));return ge.create(t,"or")}}function ua(n){if(Y(n instanceof le||n instanceof ge),n instanceof le)return n;const e=n.getFilters();if(e.length===1)return ua(e[0]);if(Xm(n))return n;const t=e.map(s=>ua(s)),r=[];return t.forEach(s=>{s instanceof le?r.push(s):s instanceof ge&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:ge.create(r,n.op)}/**
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
 */class OT{constructor(){this.Tn=new du}addToCollectionParentIndex(e,t){return this.Tn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(lt.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(lt.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class du{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new _e(pe.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new _e(pe.comparator)).toArray()}}/**
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
 */const wf="IndexedDbIndexManager",fo=new Uint8Array(0);class LT{constructor(e,t){this.databaseId=t,this.In=new du,this.En=new Kt(r=>ar(r),(r,s)=>Vi(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.In.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.In.add(t)});const i={collectionId:r,parent:He(s)};return Ef(e).put(i)}return D.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[Rm(t),""],!1,!0);return Ef(e).G(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push(Tt(o.parent))}return r})}addFieldIndex(e,t){const r=Us(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Pr(e);return i.next(c=>{o.put(mf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=Us(e),s=Pr(e),i=Cr(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Us(e),r=Cr(e),s=Pr(e);return t.J().next(()=>r.J()).next(()=>s.J())}createTargetIndexes(e,t){return D.forEach(this.dn(t),r=>this.getIndexType(e,r).next(s=>{if(s===0||s===1){const i=new If(r).Pn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const r=Cr(e);let s=!0;const i=new Map;return D.forEach(this.dn(t),o=>this.An(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=ie();const c=[];return D.forEach(i,(l,h)=>{B(wf,`Using index ${function(k){return`id=${k.indexId}|cg=${k.collectionGroup}|f=${k.fields.map(F=>`${F.fieldPath}:${F.kind}`).join(",")}`}(l)} to execute ${ar(t)}`);const p=function(k,F){const x=nl(F);if(x===void 0)return null;for(const M of ia(k,x.fieldPath))switch(M.op){case"array-contains-any":return M.value.arrayValue.values||[];case"array-contains":return[M.value]}return null}(h,l),m=function(k,F){const x=new Map;for(const M of qn(F))for(const E of ia(k,M.fieldPath))switch(E.op){case"==":case"in":x.set(M.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return x.set(M.fieldPath.canonicalString(),E.value),Array.from(x.values())}return null}(h,l),I=function(k,F){const x=[];let M=!0;for(const E of qn(F)){const w=E.kind===0?ef(k,E.fieldPath,k.startAt):tf(k,E.fieldPath,k.startAt);x.push(w.value),M&&(M=w.inclusive)}return new wn(x,M)}(h,l),A=function(k,F){const x=[];let M=!0;for(const E of qn(F)){const w=E.kind===0?tf(k,E.fieldPath,k.endAt):ef(k,E.fieldPath,k.endAt);x.push(w.value),M&&(M=w.inclusive)}return new wn(x,M)}(h,l),S=this.Rn(l,h,I),P=this.Rn(l,h,A),C=this.Vn(l,h,m),U=this.mn(l.indexId,p,S,I.inclusive,P,A.inclusive,C);return D.forEach(U,R=>r.H(R,t.limit).next(k=>{k.forEach(F=>{const x=H.fromSegments(F.documentKey);o.has(x)||(o=o.add(x),c.push(x))})}))}).next(()=>c)}return D.resolve(null)})}dn(e){let t=this.En.get(e);return t||(e.filters.length===0?t=[e]:t=VT(ge.create(e.filters,"and")).map(r=>dl(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.En.set(e,t),t)}mn(e,t,r,s,i,o,c){const l=(t!=null?t.length:1)*Math.max(r.length,i.length),h=l/(t!=null?t.length:1),p=[];for(let m=0;m<l;++m){const I=t?this.fn(t[m/h]):fo,A=this.gn(e,I,r[m%h],s),S=this.pn(e,I,i[m%h],o),P=c.map(C=>this.gn(e,I,C,!0));p.push(...this.createRange(A,S,P))}return p}gn(e,t,r,s){const i=new Wn(e,H.empty(),t,r);return s?i:i.nn()}pn(e,t,r,s){const i=new Wn(e,H.empty(),t,r);return s?i.nn():i}An(e,t){const r=new If(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)r.un(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const s=this.dn(t);return D.forEach(s,i=>this.An(e,i).next(o=>{o?r!==0&&o.fields.length<function(l){let h=new _e(Te.comparator),p=!1;for(const m of l.filters)for(const I of m.getFlattenedFilters())I.field.isKeyField()||(I.op==="array-contains"||I.op==="array-contains-any"?p=!0:h=h.add(I.field));for(const m of l.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(p?1:0)}(i)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&r===2?1:r)}yn(e,t){const r=new Fs;for(const s of qn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.tn(s.kind);Kn.xt.At(i,o)}return r.Yt()}fn(e){const t=new Fs;return Kn.xt.At(e,t.tn(0)),t.Yt()}wn(e,t){const r=new Fs;return Kn.xt.At(or(this.databaseId,t),r.tn(function(i){const o=qn(i);return o.length===0?0:o[o.length-1].kind}(e))),r.Yt()}Vn(e,t,r){if(r===null)return[];let s=[];s.push(new Fs);let i=0;for(const o of qn(e)){const c=r[i++];for(const l of s)if(this.Sn(t,o.fieldPath)&&Ii(c))s=this.bn(s,o,c);else{const h=l.tn(o.kind);Kn.xt.At(c,h)}}return this.Dn(s)}Rn(e,t,r){return this.Vn(e,t,r.position)}Dn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Yt();return t}bn(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const l=new Fs;l.seed(c.Yt()),Kn.xt.At(o,l.tn(t.kind)),i.push(l)}return i}Sn(e,t){return!!e.filters.find(r=>r instanceof le&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=Us(e),s=Pr(e);return(t?r.G(sl,IDBKeyRange.bound(t,t)):r.G()).next(i=>{const o=[];return D.forEach(i,c=>s.get([c.indexId,this.uid]).next(l=>{o.push(function(p,m){const I=m?new fi(m.sequenceNumber,new lt(lr(m.readTime),new H(Tt(m.documentKey)),m.largestBatchId)):fi.empty(),A=p.fields.map(([S,P])=>new xo(Te.fromServerFormat(S),P));return new Jo(p.indexId,p.collectionGroup,A,I)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:te(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=Us(e),i=Pr(e);return this.vn(e).next(o=>s.G(sl,IDBKeyRange.bound(t,t)).next(c=>D.forEach(c,l=>i.put(mf(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return D.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?D.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(r.set(s.collectionGroup,c),D.forEach(c,l=>this.Cn(e,s,l).next(h=>{const p=this.Fn(i,l);return h.isEqual(p)?D.resolve():this.Mn(e,i,l,h,p)}))))})}xn(e,t,r,s){return Cr(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.wn(r,t.key),documentKey:t.key.path.toArray()})}On(e,t,r,s){return Cr(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.wn(r,t.key),t.key.path.toArray()])}Cn(e,t,r){const s=Cr(e);let i=new _e(tn);return s.Z({index:Lm,range:IDBKeyRange.only([r.indexId,this.uid,this.wn(r,t)])},(o,c)=>{i=i.add(new Wn(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>i)}Fn(e,t){let r=new _e(tn);const s=this.yn(t,e);if(s==null)return r;const i=nl(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Ii(o))for(const c of o.arrayValue.values||[])r=r.add(new Wn(t.indexId,e.key,this.fn(c),s))}else r=r.add(new Wn(t.indexId,e.key,fo,s));return r}Mn(e,t,r,s,i){B(wf,"Updating index entries for document '%s'",t.key);const o=[];return function(l,h,p,m,I){const A=l.getIterator(),S=h.getIterator();let P=Sr(A),C=Sr(S);for(;P||C;){let U=!1,R=!1;if(P&&C){const k=p(P,C);k<0?R=!0:k>0&&(U=!0)}else P!=null?R=!0:U=!0;U?(m(C),C=Sr(S)):R?(I(P),P=Sr(A)):(P=Sr(A),C=Sr(S))}}(s,i,tn,c=>{o.push(this.xn(e,t,r,c))},c=>{o.push(this.On(e,t,r,c))}),D.waitFor(o)}vn(e){let t=1;return Pr(e).Z({index:Om,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>tn(o,c)).filter((o,c,l)=>!c||tn(o,l[c-1])!==0);const s=[];s.push(e);for(const o of r){const c=tn(o,e),l=tn(o,t);if(c===0)s[0]=e.nn();else if(c>0&&l<0)s.push(o),s.push(o.nn());else if(l>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Nn(s[o],s[o+1]))return[];const c=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,fo,[]],l=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,fo,[]];i.push(IDBKeyRange.bound(c,l))}return i}Nn(e,t){return tn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Tf)}getMinOffset(e,t){return D.mapArray(this.dn(t),r=>this.An(e,r).next(s=>s||Q())).next(Tf)}}function Ef(n){return Oe(n,_i)}function Cr(n){return Oe(n,na)}function Us(n){return Oe(n,Yl)}function Pr(n){return Oe(n,ta)}function Tf(n){Y(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;Kl(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new lt(e.readTime,e.documentKey,t)}/**
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
 */const Af={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Fg=41943040;class ze{static withCacheSize(e){return new ze(e,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ug(n,e,t){const r=n.store(yt),s=n.store(Qr),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=r.Z({range:o},(p,m,I)=>(c++,I.delete()));i.push(l.next(()=>{Y(c===1)}));const h=[];for(const p of t.mutations){const m=Dm(e,p.key.path,t.batchId);i.push(s.delete(m)),h.push(p.key)}return D.waitFor(i).next(()=>h)}function da(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw Q();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ze.DEFAULT_COLLECTION_PERCENTILE=10,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ze.DEFAULT=new ze(Fg,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ze.DISABLED=new ze(-1,0,0);class Ga{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Bn={}}static It(e,t,r,s){Y(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new Ga(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return nn(e).Z({index:Qn,range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=Or(e),o=nn(e);return o.add({}).next(c=>{Y(typeof c=="number");const l=new iu(c,t,r,s),h=function(A,S,P){const C=P.baseMutations.map(R=>ca(A.Tt,R)),U=P.mutations.map(R=>ca(A.Tt,R));return{userId:S,batchId:P.batchId,localWriteTimeMs:P.localWriteTime.toMillis(),baseMutations:C,mutations:U}}(this.serializer,this.userId,l),p=[];let m=new _e((I,A)=>te(I.canonicalString(),A.canonicalString()));for(const I of s){const A=Dm(this.userId,I.key.path,c);m=m.add(I.key.path.popLast()),p.push(o.put(h)),p.push(i.put(A,fE))}return m.forEach(I=>{p.push(this.indexManager.addToCollectionParentIndex(e,I))}),e.addOnCommittedListener(()=>{this.Bn[c]=l.keys()}),D.waitFor(p).next(()=>l)})}lookupMutationBatch(e,t){return nn(e).get(t).next(r=>r?(Y(r.userId===this.userId),Hn(this.serializer,r)):null)}Ln(e,t){return this.Bn[t]?D.resolve(this.Bn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Bn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return nn(e).Z({index:Qn,range:s},(o,c,l)=>{c.userId===this.userId&&(Y(c.batchId>=r),i=Hn(this.serializer,c)),l.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Zn;return nn(e).Z({index:Qn,range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Zn],[this.userId,Number.POSITIVE_INFINITY]);return nn(e).G(Qn,t).next(r=>r.map(s=>Hn(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Do(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return Or(e).Z({range:s},(o,c,l)=>{const[h,p,m]=o,I=Tt(p);if(h===this.userId&&t.path.isEqual(I))return nn(e).get(m).next(A=>{if(!A)throw Q();Y(A.userId===this.userId),i.push(Hn(this.serializer,A))});l.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new _e(te);const s=[];return t.forEach(i=>{const o=Do(this.userId,i.path),c=IDBKeyRange.lowerBound(o),l=Or(e).Z({range:c},(h,p,m)=>{const[I,A,S]=h,P=Tt(A);I===this.userId&&i.path.isEqual(P)?r=r.add(S):m.done()});s.push(l)}),D.waitFor(s).next(()=>this.kn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Do(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new _e(te);return Or(e).Z({range:o},(l,h,p)=>{const[m,I,A]=l,S=Tt(I);m===this.userId&&r.isPrefixOf(S)?S.length===s&&(c=c.add(A)):p.done()}).next(()=>this.kn(e,c))}kn(e,t){const r=[],s=[];return t.forEach(i=>{s.push(nn(e).get(i).next(o=>{if(o===null)throw Q();Y(o.userId===this.userId),r.push(Hn(this.serializer,o))}))}),D.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return Ug(e.ue,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.qn(t.batchId)}),D.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}qn(e){delete this.Bn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return D.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return Or(e).Z({range:r},(i,o,c)=>{if(i[0]===this.userId){const l=Tt(i[1]);s.push(l)}else c.done()}).next(()=>{Y(s.length===0)})})}containsKey(e,t){return Bg(e,this.userId,t)}Qn(e){return $g(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Zn,lastStreamToken:""})}}function Bg(n,e,t){const r=Do(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Or(n).Z({range:i,Y:!0},(c,l,h)=>{const[p,m,I]=c;p===e&&m===s&&(o=!0),h.done()}).next(()=>o)}function nn(n){return Oe(n,yt)}function Or(n){return Oe(n,Qr)}function $g(n){return Oe(n,mi)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new ur(0)}static Kn(){return new ur(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MT{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Wn(e).next(t=>{const r=new ur(t.highestTargetId);return t.highestTargetId=r.next(),this.Gn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Wn(e).next(t=>J.fromTimestamp(new Ae(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Wn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Wn(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Gn(e,s)))}addTargetData(e,t){return this.zn(e,t).next(()=>this.Wn(e).next(r=>(r.targetCount+=1,this.jn(t,r),this.Gn(e,r))))}updateTargetData(e,t){return this.zn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>kr(e).delete(t.targetId)).next(()=>this.Wn(e)).next(r=>(Y(r.targetCount>0),r.targetCount-=1,this.Gn(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return kr(e).Z((o,c)=>{const l=Ws(c);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(e,l)))}).next(()=>D.waitFor(i)).next(()=>s)}forEachTarget(e,t){return kr(e).Z((r,s)=>{const i=Ws(s);t(i)})}Wn(e){return Sf(e).get(ea).next(t=>(Y(t!==null),t))}Gn(e,t){return Sf(e).put(ea,t)}zn(e,t){return kr(e).put(Vg(this.serializer,t))}jn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Wn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=ar(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return kr(e).Z({range:s,index:Vm},(o,c,l)=>{const h=Ws(c);Vi(t,h.target)&&(i=h,l.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=dn(e);return t.forEach(o=>{const c=He(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))}),D.waitFor(s)}removeMatchingKeys(e,t,r){const s=dn(e);return D.forEach(t,i=>{const o=He(i.path);return D.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=dn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=dn(e);let i=ie();return s.Z({range:r,Y:!0},(o,c,l)=>{const h=Tt(o[1]),p=new H(h);i=i.add(p)}).next(()=>i)}containsKey(e,t){const r=He(t.path),s=IDBKeyRange.bound([r],[Rm(r)],!1,!0);let i=0;return dn(e).Z({index:Ql,Y:!0,range:s},([o,c],l,h)=>{o!==0&&(i++,h.done())}).next(()=>i>0)}lt(e,t){return kr(e).get(t).next(r=>r?Ws(r):null)}}function kr(n){return Oe(n,Yr)}function Sf(n){return Oe(n,er)}function dn(n){return Oe(n,Jr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="LruGarbageCollector",qg=1048576;function Cf([n,e],[t,r]){const s=te(n,t);return s===0?te(e,r):s}class FT{constructor(e){this.Hn=e,this.buffer=new _e(Cf),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Cf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class jg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){B(Rf,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Cn(t)?B(Rf,"Ignoring IndexedDB error during garbage collection: ",t):await mr(t)}await this.er(3e5)})}}class UT{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return D.resolve(ht.ae);const r=new FT(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(B("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(Af)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(B("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Af):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,o,c,l,h;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(B("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(i=m,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(h=Date.now(),xr()<=ce.DEBUG&&B("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(h-l)+`ms
Total Duration: ${h-p}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function zg(n,e){return new UT(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(e,t){this.db=e,this.garbageCollector=zg(this,t)}nr(e){const t=this.sr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}rr(e,t){return this._r(e,(r,s)=>t(s))}addReference(e,t,r){return po(e,r)}removeReference(e,t,r){return po(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return po(e,t)}ar(e,t){return function(s,i){let o=!1;return $g(s).X(c=>Bg(s,c,i).next(l=>(l&&(o=!0),D.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this._r(e,(o,c)=>{if(c<=t){const l=this.ar(e,o).next(h=>{if(!h)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,J.min()),dn(e).delete(function(m){return[0,He(m.path)]}(o))))});s.push(l)}}).next(()=>D.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return po(e,t)}_r(e,t){const r=dn(e);let s,i=ht.ae;return r.Z({index:Ql},([o,c],{path:l,sequenceNumber:h})=>{o===0?(i!==ht.ae&&t(new H(Tt(s)),i),i=h,s=l):i=ht.ae}).next(()=>{i!==ht.ae&&t(new H(Tt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function po(n,e){return dn(n).put(function(r,s){return{targetId:0,path:He(r.path),sequenceNumber:s}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gg{constructor(){this.changes=new Kt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ce.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $T{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Fn(e).put(r)}removeEntry(e,t,r){return Fn(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],la(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.ur(e,r)))}getEntry(e,t){let r=Ce.newInvalidDocument(t);return Fn(e).Z({index:No,range:IDBKeyRange.only(Bs(t))},(s,i)=>{r=this.cr(t,i)}).next(()=>r)}lr(e,t){let r={size:0,document:Ce.newInvalidDocument(t)};return Fn(e).Z({index:No,range:IDBKeyRange.only(Bs(t))},(s,i)=>{r={document:this.cr(t,i),size:da(i)}}).next(()=>r)}getEntries(e,t){let r=ct();return this.hr(e,t,(s,i)=>{const o=this.cr(s,i);r=r.insert(s,o)}).next(()=>r)}Pr(e,t){let r=ct(),s=new Ee(H.comparator);return this.hr(e,t,(i,o)=>{const c=this.cr(i,o);r=r.insert(i,c),s=s.insert(i,da(o))}).next(()=>({documents:r,Tr:s}))}hr(e,t,r){if(t.isEmpty())return D.resolve();let s=new _e(xf);t.forEach(l=>s=s.add(l));const i=IDBKeyRange.bound(Bs(s.first()),Bs(s.last())),o=s.getIterator();let c=o.getNext();return Fn(e).Z({index:No,range:i},(l,h,p)=>{const m=H.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&xf(c,m)<0;)r(c,null),c=o.getNext();c&&c.isEqual(m)&&(r(c,h),c=o.hasNext()?o.getNext():null),c?p.W(Bs(c)):p.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),la(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Fn(e).G(IDBKeyRange.bound(c,l,!0)).next(h=>{i?.incrementDocumentReadCount(h.length);let p=ct();for(const m of h){const I=this.cr(H.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);I.isFoundDocument()&&(Li(t,I)||s.has(I.key))&&(p=p.insert(I.key,I))}return p})}getAllFromCollectionGroup(e,t,r,s){let i=ct();const o=kf(t,r),c=kf(t,lt.max());return Fn(e).Z({index:Nm,range:IDBKeyRange.bound(o,c,!0)},(l,h,p)=>{const m=this.cr(H.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&p.done()}).next(()=>i)}newChangeBuffer(e){return new qT(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Pf(e).get(rl).next(t=>(Y(!!t),t))}ur(e,t){return Pf(e).put(rl,t)}cr(e,t){if(t){const r=RT(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(J.min())))return r}return Ce.newInvalidDocument(e)}}function Hg(n){return new $T(n)}class qT extends Gg{constructor(e,t){super(),this.Ir=e,this.trackRemovals=t,this.Er=new Kt(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new _e((i,o)=>te(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Er.get(i);if(t.push(this.Ir.removeEntry(e,i,c.readTime)),o.isValidDocument()){const l=ff(this.Ir.serializer,o);s=s.add(i.path.popLast());const h=da(l);r+=h-c.size,t.push(this.Ir.addEntry(e,i,l))}else if(r-=c.size,this.trackRemovals){const l=ff(this.Ir.serializer,o.convertToNoDocument(J.min()));t.push(this.Ir.addEntry(e,i,l))}}),s.forEach(i=>{t.push(this.Ir.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Ir.updateMetadata(e,r)),D.waitFor(t)}getFromCache(e,t){return this.Ir.lr(e,t).next(r=>(this.Er.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Ir.Pr(e,t).next(({documents:r,Tr:s})=>(s.forEach((i,o)=>{this.Er.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function Pf(n){return Oe(n,gi)}function Fn(n){return Oe(n,Zo)}function Bs(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function kf(n,e){const t=e.documentKey.path.toArray();return[n,la(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function xf(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=te(t[i],r[i]),s)return s;return s=te(t.length,r.length),s||(s=te(t[t.length-2],r[r.length-2]),s||te(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class jT{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kg{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&ni(r.mutation,s,rt.empty(),Ae.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,ie()).next(()=>r))}getLocalViewOfDocuments(e,t,r=ie()){const s=At();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=Hs();return i.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=At();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,ie()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=ct();const o=ti(),c=function(){return ti()}();return t.forEach((l,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof Wt)?i=i.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),ni(p.mutation,h,p.mutation.getFieldMask(),Ae.now())):o.set(h.key,rt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((h,p)=>o.set(h,p)),t.forEach((h,p)=>{var m;return c.set(h,new jT(p,(m=o.get(h))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){const r=ti();let s=new Ee((o,c)=>o-c),i=ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const h=t.get(l);if(h===null)return;let p=r.get(l)||rt.empty();p=c.applyToLocalView(h,p),r.set(l,p);const m=(s.get(c.batchId)||ie()).add(l);s=s.insert(c.batchId,m)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,p=l.value,m=cg();p.forEach(I=>{if(!i.has(I)){const A=gg(t.get(I),r.get(I));A!==null&&m.set(I,A),i=i.add(I)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return D.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(o){return H.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):nu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(At());let c=hi,l=i;return o.next(h=>D.forEach(h,(p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(p)?D.resolve():this.remoteDocumentCache.getEntry(e,p).next(I=>{l=l.insert(p,I)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,l,h,ie())).next(p=>({batchId:c,changes:ag(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new H(t)).next(r=>{let s=Hs();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=Hs();return this.indexManager.getCollectionParents(e,i).next(c=>D.forEach(c,l=>{const h=function(m,I){return new gr(I,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(p=>{p.forEach((m,I)=>{o=o.insert(m,I)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>{i.forEach((l,h)=>{const p=h.getKey();o.get(p)===null&&(o=o.insert(p,Ce.newInvalidDocument(p)))});let c=Hs();return o.forEach((l,h)=>{const p=i.get(l);p!==void 0&&ni(p.mutation,h,rt.empty(),Ae.now()),Li(t,h)&&(c=c.insert(l,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return D.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:et(s.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:Og(s.bundledQuery),readTime:et(s.readTime)}}(t)),D.resolve()}}/**
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
 */class GT{constructor(){this.overlays=new Ee(H.comparator),this.Rr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=At();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=At(),i=t.length+1,o=new H(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Ee((h,p)=>h-p);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=At(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const c=At(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,p)=>c.set(h,p)),!(c.size()>=s)););return D.resolve(c)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new au(t,r));let i=this.Rr.get(t);i===void 0&&(i=ie(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
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
 */class HT{constructor(){this.sessionToken=xe.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(){this.Vr=new _e(Le.mr),this.gr=new _e(Le.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new Le(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new Le(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new H(new pe([])),r=new Le(t,e),s=new Le(t,e+1),i=[];return this.gr.forEachInRange([r,s],o=>{this.wr(o),i.push(o.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new H(new pe([])),r=new Le(t,e),s=new Le(t,e+1);let i=ie();return this.gr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Le(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Le{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return H.comparator(e.key,t.key)||te(e.Cr,t.Cr)}static pr(e,t){return te(e.Cr,t.Cr)||H.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KT{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new _e(Le.mr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new iu(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Mr=this.Mr.add(new Le(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(o)}lookupMutationBatch(e,t){return D.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?Zn:this.Fr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Le(t,0),s=new Le(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],o=>{const c=this.Or(o.Cr);i.push(c)}),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new _e(te);return t.forEach(s=>{const i=new Le(s,0),o=new Le(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,o],c=>{r=r.add(c.Cr)})}),D.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;H.isDocumentKey(i)||(i=i.child(""));const o=new Le(new H(i),0);let c=new _e(te);return this.Mr.forEachWhile(l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Cr)),!0)},o),D.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){Y(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return D.forEach(t.mutations,s=>{const i=new Le(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new Le(t,0),s=this.Mr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e){this.kr=e,this.docs=function(){return new Ee(H.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Ce.newInvalidDocument(t))}getEntries(e,t){let r=ct();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ce.newInvalidDocument(s))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=ct();const o=t.path,c=new H(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:p}}=l.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Kl(Cm(p),r)<=0||(s.has(p.key)||Li(t,p))&&(i=i.insert(p.key,p.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){Q()}qr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new QT(this)}getSize(e){return D.resolve(this.size)}}class QT extends Gg{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e){this.persistence=e,this.Qr=new Kt(t=>ar(t),Vi),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.$r=0,this.Ur=new hu,this.targetCount=0,this.Kr=ur.Un()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),D.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new ur(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.zn(t),D.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),D.waitFor(i).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new ht(0),this.zr=!1,this.zr=!0,this.jr=new HT,this.referenceDelegate=e(this),this.Hr=new YT(this),this.indexManager=new OT,this.remoteDocumentCache=function(s){return new WT(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new Ng(t),this.Yr=new zT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new GT,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new KT(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){B("MemoryPersistence","Starting transaction:",e);const s=new JT(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return D.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class JT extends km{constructor(e){super(),this.currentSequenceNumber=e}}class Ha{constructor(e){this.persistence=e,this.ti=new hu,this.ni=null}static ri(e){return new Ha(e)}get ii(){if(this.ni)return this.ni;throw Q()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),D.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.ii,r=>{const s=H.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,J.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return D.or([()=>D.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class ha{constructor(e,t){this.persistence=e,this.oi=new Kt(r=>He(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=zg(this,t)}static ri(e,t){return new ha(e,t)}Zr(){}Xr(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return D.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?D.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,o=>this.ar(e,o,t).next(c=>{c||(r++,i.removeEntry(o,J.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Oo(e.data.value)),t}ar(e,t,r){return D.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XT{constructor(e){this.serializer=e}B(e,t,r,s){const i=new Da("createOrUpgrade",t);r<1&&s>=1&&(function(l){l.createObjectStore(Ni)}(e),function(l){l.createObjectStore(mi,{keyPath:hE}),l.createObjectStore(yt,{keyPath:qh,autoIncrement:!0}).createIndex(Qn,jh,{unique:!0}),l.createObjectStore(Qr)}(e),Df(e),function(l){l.createObjectStore(jn)}(e));let o=D.resolve();return r<3&&s>=3&&(r!==0&&(function(l){l.deleteObjectStore(Jr),l.deleteObjectStore(Yr),l.deleteObjectStore(er)}(e),Df(e)),o=o.next(()=>function(l){const h=l.store(er),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:J.min().toTimestamp(),targetCount:0};return h.put(ea,p)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(l,h){return h.store(yt).G().next(m=>{l.deleteObjectStore(yt),l.createObjectStore(yt,{keyPath:qh,autoIncrement:!0}).createIndex(Qn,jh,{unique:!0});const I=h.store(yt),A=m.map(S=>I.put(S));return D.waitFor(A)})}(e,i))),o=o.next(()=>{(function(l){l.createObjectStore(Xr,{keyPath:bE})})(e)})),r<5&&s>=5&&(o=o.next(()=>this._i(i))),r<6&&s>=6&&(o=o.next(()=>(function(l){l.createObjectStore(gi)}(e),this.ai(i)))),r<7&&s>=7&&(o=o.next(()=>this.ui(i))),r<8&&s>=8&&(o=o.next(()=>this.ci(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.li(i))),r<11&&s>=11&&(o=o.next(()=>{(function(l){l.createObjectStore(Va,{keyPath:wE})})(e),function(l){l.createObjectStore(Oa,{keyPath:EE})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(l){const h=l.createObjectStore(La,{keyPath:kE});h.createIndex(il,xE,{unique:!1}),h.createIndex(Mm,DE,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(l){const h=l.createObjectStore(Zo,{keyPath:pE});h.createIndex(No,mE),h.createIndex(Nm,gE)}(e)).next(()=>this.hi(e,i)).next(()=>e.deleteObjectStore(jn))),r<14&&s>=14&&(o=o.next(()=>this.Pi(e,i))),r<15&&s>=15&&(o=o.next(()=>function(l){l.createObjectStore(Yl,{keyPath:TE,autoIncrement:!0}).createIndex(sl,AE,{unique:!1}),l.createObjectStore(ta,{keyPath:SE}).createIndex(Om,RE,{unique:!1}),l.createObjectStore(na,{keyPath:CE}).createIndex(Lm,PE,{unique:!1})}(e))),r<16&&s>=16&&(o=o.next(()=>{t.objectStore(ta).clear()}).next(()=>{t.objectStore(na).clear()})),r<17&&s>=17&&(o=o.next(()=>{(function(l){l.createObjectStore(Jl,{keyPath:NE})})(e)})),o}ai(e){let t=0;return e.store(jn).Z((r,s)=>{t+=da(s)}).next(()=>{const r={byteSize:t};return e.store(gi).put(rl,r)})}_i(e){const t=e.store(mi),r=e.store(yt);return t.G().next(s=>D.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,Zn],[i.userId,i.lastAcknowledgedBatchId]);return r.G(Qn,o).next(c=>D.forEach(c,l=>{Y(l.userId===i.userId);const h=Hn(this.serializer,l);return Ug(e,i.userId,h).next(()=>{})}))}))}ui(e){const t=e.store(Jr),r=e.store(jn);return e.store(er).get(ea).next(s=>{const i=[];return r.Z((o,c)=>{const l=new pe(o),h=function(m){return[0,He(m)]}(l);i.push(t.get(h).next(p=>p?D.resolve():(m=>t.put({targetId:0,path:He(m),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>D.waitFor(i))})}ci(e,t){e.createObjectStore(_i,{keyPath:IE});const r=t.store(_i),s=new du,i=o=>{if(s.add(o)){const c=o.lastSegment(),l=o.popLast();return r.put({collectionId:c,parent:He(l)})}};return t.store(jn).Z({Y:!0},(o,c)=>{const l=new pe(o);return i(l.popLast())}).next(()=>t.store(Qr).Z({Y:!0},([o,c,l],h)=>{const p=Tt(c);return i(p.popLast())}))}li(e){const t=e.store(Yr);return t.Z((r,s)=>{const i=Ws(s),o=Vg(this.serializer,i);return t.put(o)})}hi(e,t){const r=t.store(jn),s=[];return r.Z((i,o)=>{const c=t.store(Zo),l=function(m){return m.document?new H(pe.fromString(m.document.name).popFirst(5)):m.noDocument?H.fromSegments(m.noDocument.path):m.unknownDocument?H.fromSegments(m.unknownDocument.path):Q()}(o).path.toArray(),h={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))}).next(()=>D.waitFor(s))}Pi(e,t){const r=t.store(yt),s=Hg(this.serializer),i=new fu(Ha.ri,this.serializer.Tt);return r.G().next(o=>{const c=new Map;return o.forEach(l=>{var h;let p=(h=c.get(l.userId))!==null&&h!==void 0?h:ie();Hn(this.serializer,l).keys().forEach(m=>p=p.add(m)),c.set(l.userId,p)}),D.forEach(c,(l,h)=>{const p=new Je(h),m=za.It(this.serializer,p),I=i.getIndexManager(p),A=Ga.It(p,this.serializer,I,i.referenceDelegate);return new Kg(s,A,m,I).recalculateAndSaveOverlaysForDocumentKeys(new ol(t,ht.ae),l).next()})})}}function Df(n){n.createObjectStore(Jr,{keyPath:yE}).createIndex(Ql,vE,{unique:!0}),n.createObjectStore(Yr,{keyPath:"targetId"}).createIndex(Vm,_E,{unique:!0}),n.createObjectStore(er)}const rn="IndexedDbPersistence",Nc=18e5,Vc=5e3,Oc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",ZT="main";class pu{constructor(e,t,r,s,i,o,c,l,h,p,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ti=i,this.window=o,this.document=c,this.Ii=h,this.Ei=p,this.di=m,this.Gr=null,this.zr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ai=null,this.inForeground=!1,this.Ri=null,this.Vi=null,this.mi=Number.NEGATIVE_INFINITY,this.fi=I=>Promise.resolve(),!pu.D())throw new q(O.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new BT(this,s),this.gi=t+ZT,this.serializer=new Ng(l),this.pi=new _n(this.gi,this.di,new XT(this.serializer)),this.jr=new PT,this.Hr=new MT(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Hg(this.serializer),this.Yr=new CT,this.window&&this.window.localStorage?this.yi=this.window.localStorage:(this.yi=null,p===!1&&Xe(rn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new q(O.FAILED_PRECONDITION,Oc);return this.Si(),this.bi(),this.Di(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Hr.getHighestSequenceNumber(e))}).then(e=>{this.Gr=new ht(e,this.Ii)}).then(()=>{this.zr=!0}).catch(e=>(this.pi&&this.pi.close(),Promise.reject(e)))}Ci(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.pi.k(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ti.enqueueAndForget(async()=>{this.started&&await this.wi()}))}wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>mo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Fi(e).next(t=>{t||(this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Mi(e)).next(t=>this.isPrimary&&!t?this.xi(e).next(()=>!1):!!t&&this.Oi(e).next(()=>!0))).catch(e=>{if(Cn(e))return B(rn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return B(rn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ti.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Fi(e){return $s(e).get(Ar).next(t=>D.resolve(this.Ni(t)))}Bi(e){return mo(e).delete(this.clientId)}async Li(){if(this.isPrimary&&!this.ki(this.mi,Nc)){this.mi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=Oe(t,Xr);return r.G().next(s=>{const i=this.qi(s,Nc),o=s.filter(c=>i.indexOf(c)===-1);return D.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.yi)for(const t of e)this.yi.removeItem(this.Qi(t.clientId))}}Di(){this.Vi=this.Ti.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.wi().then(()=>this.Li()).then(()=>this.Di()))}Ni(e){return!!e&&e.ownerId===this.clientId}Mi(e){return this.Ei?D.resolve(!0):$s(e).get(Ar).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Vc)&&!this.$i(t.ownerId)){if(this.Ni(t)&&this.networkEnabled)return!0;if(!this.Ni(t)){if(!t.allowTabSynchronization)throw new q(O.FAILED_PRECONDITION,Oc);return!1}}return!(!this.networkEnabled||!this.inForeground)||mo(e).G().next(r=>this.qi(r,Vc).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&B(rn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.zr=!1,this.Ui(),this.Vi&&(this.Vi.cancel(),this.Vi=null),this.Ki(),this.Wi(),await this.pi.runTransaction("shutdown","readwrite",[Ni,Xr],e=>{const t=new ol(e,ht.ae);return this.xi(t).next(()=>this.Bi(t))}),this.pi.close(),this.Gi()}qi(e,t){return e.filter(r=>this.ki(r.updateTimeMs,t)&&!this.$i(r.clientId))}zi(){return this.runTransaction("getActiveClients","readonly",e=>mo(e).G().next(t=>this.qi(t,Nc).map(r=>r.clientId)))}get started(){return this.zr}getGlobalsCache(){return this.jr}getMutationQueue(e,t){return Ga.It(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new LT(e,this.serializer.Tt.databaseId)}getDocumentOverlayCache(e){return za.It(this.serializer,e)}getBundleCache(){return this.Yr}runTransaction(e,t,r){B(rn,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(l){return l===17?LE:l===16?OE:l===15?Xl:l===14?Bm:l===13?Um:l===12?VE:l===11?Fm:void Q()}(this.di);let o;return this.pi.runTransaction(e,s,i,c=>(o=new ol(c,this.Gr?this.Gr.next():ht.ae),t==="readwrite-primary"?this.Fi(o).next(l=>!!l||this.Mi(o)).next(l=>{if(!l)throw Xe(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ti.enqueueRetryable(()=>this.fi(!1)),new q(O.FAILED_PRECONDITION,Pm);return r(o)}).next(l=>this.Oi(o).next(()=>l)):this.ji(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ji(e){return $s(e).get(Ar).next(t=>{if(t!==null&&this.ki(t.leaseTimestampMs,Vc)&&!this.$i(t.ownerId)&&!this.Ni(t)&&!(this.Ei||this.allowTabSynchronization&&t.allowTabSynchronization))throw new q(O.FAILED_PRECONDITION,Oc)})}Oi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return $s(e).put(Ar,t)}static D(){return _n.D()}xi(e){const t=$s(e);return t.get(Ar).next(r=>this.Ni(r)?(B(rn,"Releasing primary lease."),t.delete(Ar)):D.resolve())}ki(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Xe(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Si(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ri=()=>{this.Ti.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.wi()))},this.document.addEventListener("visibilitychange",this.Ri),this.inForeground=this.document.visibilityState==="visible")}Ki(){this.Ri&&(this.document.removeEventListener("visibilitychange",this.Ri),this.Ri=null)}bi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ai=()=>{this.Ui();const t=/(?:Version|Mobile)\/1[456]/;Np()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ti.enterRestrictedMode(!0),this.Ti.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ai))}Wi(){this.Ai&&(this.window.removeEventListener("pagehide",this.Ai),this.Ai=null)}$i(e){var t;try{const r=((t=this.yi)===null||t===void 0?void 0:t.getItem(this.Qi(e)))!==null;return B(rn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Xe(rn,"Failed to get zombied client id.",r),!1}}Ui(){if(this.yi)try{this.yi.setItem(this.Qi(this.clientId),String(Date.now()))}catch(e){Xe("Failed to set zombie client id.",e)}}Gi(){if(this.yi)try{this.yi.removeItem(this.Qi(this.clientId))}catch{}}Qi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function $s(n){return Oe(n,Ni)}function mo(n){return Oe(n,Xr)}function eA(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=ie(),s=ie();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new mu(e,t.fromCache,r,s)}}/**
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
 */class tA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Wg{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return Np()?8:xm(Ve())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new tA;return this._s(e,t,o).next(c=>{if(i.result=c,this.Xi)return this.us(e,t,o,c.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(xr()<=ce.DEBUG&&B("QueryEngine","SDK will not create cache indexes for query:",Dr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),D.resolve()):(xr()<=ce.DEBUG&&B("QueryEngine","Query:",Dr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(xr()<=ce.DEBUG&&B("QueryEngine","The SDK decides to create cache indexes for query:",Dr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ft(t))):D.resolve())}rs(e,t){if(nf(t))return D.resolve(null);let r=ft(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=oa(t,null,"F"),r=ft(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=ie(...i);return this.ns.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const h=this.cs(t,c);return this.ls(t,h,o,l.readTime)?this.rs(e,oa(t,null,"F")):this.hs(e,h,t,l)}))})))}ss(e,t,r,s){return nf(t)||s.isEqual(J.min())?D.resolve(null):this.ns.getDocuments(e,r).next(i=>{const o=this.cs(t,i);return this.ls(t,o,r,s)?D.resolve(null):(xr()<=ce.DEBUG&&B("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Dr(t)),this.hs(e,o,t,iE(s,hi)).next(c=>c))})}cs(e,t){let r=new _e(ig(e));return t.forEach((s,i)=>{Li(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return xr()<=ce.DEBUG&&B("QueryEngine","Using full collection scan to execute query:",Dr(t)),this.ns.getDocumentsMatchingQuery(e,t,lt.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu="LocalStore",nA=3e8;class rA{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new Ee(te),this.Is=new Kt(i=>ar(i),Vi),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Kg(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function Qg(n,e,t,r){return new rA(n,e,t,r)}async function Yg(n,e){const t=ne(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let l=ie();for(const h of s){o.push(h.batchId);for(const p of h.mutations)l=l.add(p.key)}for(const h of i){c.push(h.batchId);for(const p of h.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(h=>({Rs:h,removedBatchIds:o,addedBatchIds:c}))})})}function sA(n,e){const t=ne(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,l,h,p){const m=h.batch,I=m.keys();let A=D.resolve();return I.forEach(S=>{A=A.next(()=>p.getEntry(l,S)).next(P=>{const C=h.docVersions.get(S);Y(C!==null),P.version.compareTo(C)<0&&(m.applyToRemoteDocument(P,h),P.isValidDocument()&&(P.setReadTime(h.commitVersion),p.addEntry(P)))})}),A.next(()=>c.mutationQueue.removeMutationBatch(l,m))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=ie();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Jg(n){const e=ne(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function iA(n,e){const t=ne(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const c=[];e.targetChanges.forEach((p,m)=>{const I=s.get(m);if(!I)return;c.push(t.Hr.removeMatchingKeys(i,p.removedDocuments,m).next(()=>t.Hr.addMatchingKeys(i,p.addedDocuments,m)));let A=I.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?A=A.withResumeToken(xe.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):p.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(p.resumeToken,r)),s=s.insert(m,A),function(P,C,U){return P.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=nA?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0}(I,A,p)&&c.push(t.Hr.updateTargetData(i,A))});let l=ct(),h=ie();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))}),c.push(oA(i,o,e.documentUpdates).next(p=>{l=p.Vs,h=p.fs})),!r.isEqual(J.min())){const p=t.Hr.getLastRemoteSnapshotVersion(i).next(m=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(p)}return D.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(t.Ts=s,i))}function oA(n,e,t){let r=ie(),s=ie();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=ct();return t.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(J.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):B(gu,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{Vs:o,fs:s}})}function aA(n,e){const t=ne(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Zn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function cA(n,e){const t=ne(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,D.resolve(s)):t.Hr.allocateTargetId(r).next(o=>(s=new Bt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function Il(n,e,t){const r=ne(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Cn(o))throw o;B(gu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function Nf(n,e,t){const r=ne(n);let s=J.min(),i=ie();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,h,p){const m=ne(l),I=m.Is.get(p);return I!==void 0?D.resolve(m.Ts.get(I)):m.Hr.getTargetData(h,p)}(r,o,ft(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,c.targetId).next(l=>{i=l})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,t?s:J.min(),t?i:ie())).next(c=>(lA(r,JE(e),c),{documents:c,gs:i})))}function lA(n,e,t){let r=n.Es.get(e)||J.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class Vf{constructor(){this.activeTargetIds=rT()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Xg{constructor(){this.ho=new Vf,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new Vf,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class uA{To(e){}shutdown(){}}/**
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
 */const Of="ConnectivityMonitor";class Lf{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){B(Of,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){B(Of,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let go=null;function bl(){return go===null?go=function(){return 268435456+Math.round(2147483648*Math.random())}():go++,"0x"+go.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc="RestConnection",dA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class hA{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===ra?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const o=bl(),c=this.bo(e,t.toUriEncodedString());B(Lc,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(l,s,i),this.vo(e,c,l,r).then(h=>(B(Lc,`Received RPC '${e}' ${o}: `,h),h),h=>{throw di(Lc,`RPC '${e}' ${o} failed with error: `,h,"url: ",c,"request:",r),h})}Co(e,t,r,s,i,o){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+_s}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=dA[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fA{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const je="WebChannelConnection";class pA extends hA{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=bl();return new Promise((o,c)=>{const l=new bm;l.setWithCredentials(!0),l.listenOnce(wm.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case ko.NO_ERROR:const p=l.getResponseJson();B(je,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(p)),o(p);break;case ko.TIMEOUT:B(je,`RPC '${e}' ${i} timed out`),c(new q(O.DEADLINE_EXCEEDED,"Request time out"));break;case ko.HTTP_ERROR:const m=l.getStatus();if(B(je,`RPC '${e}' ${i} failed with status:`,m,"response text:",l.getResponseText()),m>0){let I=l.getResponseJson();Array.isArray(I)&&(I=I[0]);const A=I?.error;if(A&&A.status&&A.message){const S=function(C){const U=C.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(U)>=0?U:O.UNKNOWN}(A.status);c(new q(S,A.message))}else c(new q(O.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new q(O.UNAVAILABLE,"Connection failed."));break;default:Q()}}finally{B(je,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);B(je,`RPC '${e}' ${i} sending request:`,s),l.send(t,"POST",h,r,15)})}Wo(e,t,r){const s=bl(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Am(),c=Tm(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Do(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const p=i.join("");B(je,`Creating RPC '${e}' stream ${s}: ${p}`,l);const m=o.createWebChannel(p,l);let I=!1,A=!1;const S=new fA({Fo:C=>{A?B(je,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(I||(B(je,`Opening RPC '${e}' stream ${s} transport.`),m.open(),I=!0),B(je,`RPC '${e}' stream ${s} sending:`,C),m.send(C))},Mo:()=>m.close()}),P=(C,U,R)=>{C.listen(U,k=>{try{R(k)}catch(F){setTimeout(()=>{throw F},0)}})};return P(m,Gs.EventType.OPEN,()=>{A||(B(je,`RPC '${e}' stream ${s} transport opened.`),S.Qo())}),P(m,Gs.EventType.CLOSE,()=>{A||(A=!0,B(je,`RPC '${e}' stream ${s} transport closed`),S.Uo())}),P(m,Gs.EventType.ERROR,C=>{A||(A=!0,di(je,`RPC '${e}' stream ${s} transport errored:`,C),S.Uo(new q(O.UNAVAILABLE,"The operation could not be completed")))}),P(m,Gs.EventType.MESSAGE,C=>{var U;if(!A){const R=C.data[0];Y(!!R);const k=R,F=k?.error||((U=k[0])===null||U===void 0?void 0:U.error);if(F){B(je,`RPC '${e}' stream ${s} received error:`,F);const x=F.status;let M=function(g){const _=ke[g];if(_!==void 0)return vg(_)}(x),E=F.message;M===void 0&&(M=O.INTERNAL,E="Unknown error status: "+x+" with message "+F.message),A=!0,S.Uo(new q(M,E)),m.close()}else B(je,`RPC '${e}' stream ${s} received:`,R),S.Ko(R)}}),P(c,Em.STAT_EVENT,C=>{C.stat===Zc.PROXY?B(je,`RPC '${e}' stream ${s} detected buffering proxy`):C.stat===Zc.NOPROXY&&B(je,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.$o()},0),S}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function mA(){return typeof window<"u"?window:null}function Uo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ka(n){return new _T(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&B("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mf="PersistentStream";class e_{constructor(e,t,r,s,i,o,c,l){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new Zg(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===O.RESOURCE_EXHAUSTED?(Xe(t.toString()),Xe("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new q(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return B(Mf,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(B(Mf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class gA extends e_{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=IT(this.serializer,e),r=function(i){if(!("targetChange"in i))return J.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?J.min():o.readTime?et(o.readTime):J.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=ml(this.serializer),t.addTarget=function(i,o){let c;const l=o.target;if(c=sa(l)?{documents:Rg(i,l)}:{query:Cg(i,l).ht},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=wg(i,o.resumeToken);const h=fl(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(J.min())>0){c.readTime=is(i,o.snapshotVersion.toTimestamp());const h=fl(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=wT(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=ml(this.serializer),t.removeTarget=e,this.I_(t)}}class _A extends e_{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return Y(!!e.streamToken),this.lastStreamToken=e.streamToken,Y(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){Y(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=bT(e.writeResults,e.commitTime),r=et(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=ml(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ca(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yA{}class vA extends yA{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new q(O.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.So(e,pl(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new q(O.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Co(e,pl(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new q(O.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class IA{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(Xe(t),this.N_=!1):B("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr="RemoteStore";class bA{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(o=>{r.enqueueAndForget(async()=>{_r(this)&&(B(dr,"Restarting streams for network reachability change."),await async function(l){const h=ne(l);h.W_.add(4),await Fi(h),h.j_.set("Unknown"),h.W_.delete(4),await Wa(h)}(this))})}),this.j_=new IA(r,s)}}async function Wa(n){if(_r(n))for(const e of n.G_)await e(!0)}async function Fi(n){for(const e of n.G_)await e(!1)}function t_(n,e){const t=ne(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),Iu(t)?vu(t):vs(t).c_()&&yu(t,e))}function _u(n,e){const t=ne(n),r=vs(t);t.K_.delete(e),r.c_()&&n_(t,e),t.K_.size===0&&(r.c_()?r.P_():_r(t)&&t.j_.set("Unknown"))}function yu(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(J.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}vs(n).y_(e)}function n_(n,e){n.H_.Ne(e),vs(n).w_(e)}function vu(n){n.H_=new fT({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),vs(n).start(),n.j_.B_()}function Iu(n){return _r(n)&&!vs(n).u_()&&n.K_.size>0}function _r(n){return ne(n).W_.size===0}function r_(n){n.H_=void 0}async function wA(n){n.j_.set("Online")}async function EA(n){n.K_.forEach((e,t)=>{yu(n,e)})}async function TA(n,e){r_(n),Iu(n)?(n.j_.q_(e),vu(n)):n.j_.set("Unknown")}async function AA(n,e,t){if(n.j_.set("Online"),e instanceof bg&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.K_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.K_.delete(c),s.H_.removeTarget(c))}(n,e)}catch(r){B(dr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await fa(n,r)}else if(e instanceof Fo?n.H_.We(e):e instanceof Ig?n.H_.Ze(e):n.H_.je(e),!t.isEqual(J.min()))try{const r=await Jg(n.localStore);t.compareTo(r)>=0&&await function(i,o){const c=i.H_.ot(o);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const p=i.K_.get(h);p&&i.K_.set(h,p.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,h)=>{const p=i.K_.get(l);if(!p)return;i.K_.set(l,p.withResumeToken(xe.EMPTY_BYTE_STRING,p.snapshotVersion)),n_(i,l);const m=new Bt(p.target,l,h,p.sequenceNumber);yu(i,m)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){B(dr,"Failed to raise snapshot:",r),await fa(n,r)}}async function fa(n,e,t){if(!Cn(e))throw e;n.W_.add(1),await Fi(n),n.j_.set("Offline"),t||(t=()=>Jg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{B(dr,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await Wa(n)})}function s_(n,e){return e().catch(t=>fa(n,t,e))}async function Ui(n){const e=ne(n),t=En(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:Zn;for(;SA(e);)try{const s=await aA(e.localStore,r);if(s===null){e.U_.length===0&&t.P_();break}r=s.batchId,RA(e,s)}catch(s){await fa(e,s)}i_(e)&&o_(e)}function SA(n){return _r(n)&&n.U_.length<10}function RA(n,e){n.U_.push(e);const t=En(n);t.c_()&&t.S_&&t.b_(e.mutations)}function i_(n){return _r(n)&&!En(n).u_()&&n.U_.length>0}function o_(n){En(n).start()}async function CA(n){En(n).C_()}async function PA(n){const e=En(n);for(const t of n.U_)e.b_(t.mutations)}async function kA(n,e,t){const r=n.U_.shift(),s=ou.from(r,e,t);await s_(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Ui(n)}async function xA(n,e){e&&En(n).S_&&await async function(r,s){if(function(o){return dT(o)&&o!==O.ABORTED}(s.code)){const i=r.U_.shift();En(r).h_(),await s_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Ui(r)}}(n,e),i_(n)&&o_(n)}async function Ff(n,e){const t=ne(n);t.asyncQueue.verifyOperationInProgress(),B(dr,"RemoteStore received new credentials");const r=_r(t);t.W_.add(3),await Fi(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await Wa(t)}async function DA(n,e){const t=ne(n);e?(t.W_.delete(2),await Wa(t)):e||(t.W_.add(2),await Fi(t),t.j_.set("Unknown"))}function vs(n){return n.J_||(n.J_=function(t,r,s){const i=ne(t);return i.M_(),new gA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:wA.bind(null,n),No:EA.bind(null,n),Lo:TA.bind(null,n),p_:AA.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),Iu(n)?vu(n):n.j_.set("Unknown")):(await n.J_.stop(),r_(n))})),n.J_}function En(n){return n.Y_||(n.Y_=function(t,r,s){const i=ne(t);return i.M_(),new _A(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:CA.bind(null,n),Lo:xA.bind(null,n),D_:PA.bind(null,n),v_:kA.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await Ui(n)):(await n.Y_.stop(),n.U_.length>0&&(B(dr,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ct,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new bu(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new q(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function wu(n,e){if(Xe("AsyncQueue",`${e}: ${n}`),Cn(n))return new q(O.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{static emptySet(e){return new jr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||H.comparator(t.key,r.key):(t,r)=>H.comparator(t.key,r.key),this.keyedMap=Hs(),this.sortedSet=new Ee(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof jr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new jr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(){this.Z_=new Ee(H.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):Q():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class os{constructor(e,t,r,s,i,o,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new os(e,t,jr.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ba(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NA{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class VA{constructor(){this.queries=Bf(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=ne(t),i=s.queries;s.queries=Bf(),i.forEach((o,c)=>{for(const l of c.ta)l.onError(r)})})(this,new q(O.ABORTED,"Firestore shutting down"))}}function Bf(){return new Kt(n=>sg(n),Ba)}async function Eu(n,e){const t=ne(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new NA,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=wu(o,`Initialization of query '${Dr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&Au(t)}async function Tu(n,e){const t=ne(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.ta.indexOf(e);o>=0&&(i.ta.splice(o,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function OA(n,e){const t=ne(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.ta)c.oa(s)&&(r=!0);o.ea=s}}r&&Au(t)}function LA(n,e,t){const r=ne(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function Au(n){n.ia.forEach(e=>{e.next()})}var wl,$f;($f=wl||(wl={}))._a="default",$f.Cache="cache";class Su{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new os(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=os.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==wl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a_{constructor(e){this.key=e}}class c_{constructor(e){this.key=e}}class MA{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=ie(),this.mutatedKeys=ie(),this.ya=ig(e),this.wa=new jr(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new Uf,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,m)=>{const I=s.get(p),A=Li(this.query,m)?m:null,S=!!I&&this.mutatedKeys.has(I.key),P=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let C=!1;I&&A?I.data.isEqual(A.data)?S!==P&&(r.track({type:3,doc:A}),C=!0):this.va(I,A)||(r.track({type:2,doc:A}),C=!0,(l&&this.ya(A,l)>0||h&&this.ya(A,h)<0)&&(c=!0)):!I&&A?(r.track({type:0,doc:A}),C=!0):I&&!A&&(r.track({type:1,doc:I}),C=!0,(l||h)&&(c=!0)),C&&(A?(o=o.add(A),i=P?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{wa:o,Da:r,ls:c,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((p,m)=>function(A,S){const P=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Q()}};return P(A)-P(S)}(p.type,m.type)||this.ya(p.doc,m.doc)),this.Ca(r),s=s!=null&&s;const c=t&&!s?this.Fa():[],l=this.pa.size===0&&this.current&&!s?1:0,h=l!==this.ga;return this.ga=l,o.length!==0||h?{snapshot:new os(this.query,e.wa,i,o,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new Uf,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=ie(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new c_(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new a_(r))}),t}Oa(e){this.fa=e.gs,this.pa=ie();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return os.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const Ru="SyncEngine";class FA{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class UA{constructor(e){this.key=e,this.Ba=!1}}class BA{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new Kt(c=>sg(c),Ba),this.qa=new Map,this.Qa=new Set,this.$a=new Ee(H.comparator),this.Ua=new Map,this.Ka=new hu,this.Wa={},this.Ga=new Map,this.za=ur.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function $A(n,e,t=!0){const r=p_(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await l_(r,e,t,!0),s}async function qA(n,e){const t=p_(n);await l_(t,e,!0,!1)}async function l_(n,e,t,r){const s=await cA(n.localStore,ft(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await jA(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&t_(n.remoteStore,s),c}async function jA(n,e,t,r,s){n.Ha=(m,I,A)=>async function(P,C,U,R){let k=C.view.ba(U);k.ls&&(k=await Nf(P.localStore,C.query,!1).then(({documents:E})=>C.view.ba(E,k)));const F=R&&R.targetChanges.get(C.targetId),x=R&&R.targetMismatches.get(C.targetId)!=null,M=C.view.applyChanges(k,P.isPrimaryClient,F,x);return jf(P,C.targetId,M.Ma),M.snapshot}(n,m,I,A);const i=await Nf(n.localStore,e,!0),o=new MA(e,i.gs),c=o.ba(i.documents),l=Mi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,l);jf(n,t,h.Ma);const p=new FA(e,t,o);return n.ka.set(e,p),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),h.snapshot}async function zA(n,e,t){const r=ne(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(o=>!Ba(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Il(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&_u(r.remoteStore,s.targetId),El(r,s.targetId)}).catch(mr)):(El(r,s.targetId),await Il(r.localStore,s.targetId,!0))}async function GA(n,e){const t=ne(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),_u(t.remoteStore,r.targetId))}async function HA(n,e,t){const r=m_(n);try{const s=await function(o,c){const l=ne(o),h=Ae.now(),p=c.reduce((A,S)=>A.add(S.key),ie());let m,I;return l.persistence.runTransaction("Locally write mutations","readwrite",A=>{let S=ct(),P=ie();return l.ds.getEntries(A,p).next(C=>{S=C,S.forEach((U,R)=>{R.isValidDocument()||(P=P.add(U))})}).next(()=>l.localDocuments.getOverlayedDocuments(A,S)).next(C=>{m=C;const U=[];for(const R of c){const k=lT(R,m.get(R.key).overlayedDocument);k!=null&&U.push(new Wt(R.key,k,Ym(k.value.mapValue),Ze.exists(!0)))}return l.mutationQueue.addMutationBatch(A,h,U,c)}).next(C=>{I=C;const U=C.applyToLocalDocumentSet(m,P);return l.documentOverlayCache.saveOverlays(A,C.batchId,U)})}).then(()=>({batchId:I.batchId,changes:ag(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,l){let h=o.Wa[o.currentUser.toKey()];h||(h=new Ee(te)),h=h.insert(c,l),o.Wa[o.currentUser.toKey()]=h}(r,s.batchId,t),await Bi(r,s.changes),await Ui(r.remoteStore)}catch(s){const i=wu(s,"Failed to persist write");t.reject(i)}}async function u_(n,e){const t=ne(n);try{const r=await iA(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Ua.get(i);o&&(Y(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Ba=!0:s.modifiedDocuments.size>0?Y(o.Ba):s.removedDocuments.size>0&&(Y(o.Ba),o.Ba=!1))}),await Bi(t,r,e)}catch(r){await mr(r)}}function qf(n,e,t){const r=ne(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,o)=>{const c=o.view.sa(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const l=ne(o);l.onlineState=c;let h=!1;l.queries.forEach((p,m)=>{for(const I of m.ta)I.sa(c)&&(h=!0)}),h&&Au(l)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function KA(n,e,t){const r=ne(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ua.get(e),i=s&&s.key;if(i){let o=new Ee(H.comparator);o=o.insert(i,Ce.newNoDocument(i,J.min()));const c=ie().add(i),l=new ja(J.min(),new Map,new Ee(te),o,c);await u_(r,l),r.$a=r.$a.remove(i),r.Ua.delete(e),Cu(r)}else await Il(r.localStore,e,!1).then(()=>El(r,e,t)).catch(mr)}async function WA(n,e){const t=ne(n),r=e.batch.batchId;try{const s=await sA(t.localStore,e);h_(t,r,null),d_(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Bi(t,s)}catch(s){await mr(s)}}async function QA(n,e,t){const r=ne(n);try{const s=await function(o,c){const l=ne(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let p;return l.mutationQueue.lookupMutationBatch(h,c).next(m=>(Y(m!==null),p=m.keys(),l.mutationQueue.removeMutationBatch(h,m))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p)).next(()=>l.localDocuments.getDocuments(h,p))})}(r.localStore,e);h_(r,e,t),d_(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Bi(r,s)}catch(s){await mr(s)}}function d_(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function h_(n,e,t){const r=ne(n);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function El(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||f_(n,r)})}function f_(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(_u(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),Cu(n))}function jf(n,e,t){for(const r of t)r instanceof a_?(n.Ka.addReference(r.key,e),YA(n,r)):r instanceof c_?(B(Ru,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||f_(n,r.key)):Q()}function YA(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(B(Ru,"New document in limbo: "+t),n.Qa.add(r),Cu(n))}function Cu(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new H(pe.fromString(e)),r=n.za.next();n.Ua.set(r,new UA(t)),n.$a=n.$a.insert(t,r),t_(n.remoteStore,new Bt(ft(Oi(t.path)),r,"TargetPurposeLimboResolution",ht.ae))}}async function Bi(n,e,t){const r=ne(n),s=[],i=[],o=[];r.ka.isEmpty()||(r.ka.forEach((c,l)=>{o.push(r.Ha(l,e,t).then(h=>{var p;if((h||t)&&r.isPrimaryClient){const m=h?!h.fromCache:(p=t?.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(h){s.push(h);const m=mu.Yi(l.targetId,h);i.push(m)}}))}),await Promise.all(o),r.La.p_(s),await async function(l,h){const p=ne(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>D.forEach(h,I=>D.forEach(I.Hi,A=>p.persistence.referenceDelegate.addReference(m,I.targetId,A)).next(()=>D.forEach(I.Ji,A=>p.persistence.referenceDelegate.removeReference(m,I.targetId,A)))))}catch(m){if(!Cn(m))throw m;B(gu,"Failed to update sequence numbers: "+m)}for(const m of h){const I=m.targetId;if(!m.fromCache){const A=p.Ts.get(I),S=A.snapshotVersion,P=A.withLastLimboFreeSnapshotVersion(S);p.Ts=p.Ts.insert(I,P)}}}(r.localStore,i))}async function JA(n,e){const t=ne(n);if(!t.currentUser.isEqual(e)){B(Ru,"User change. New user:",e.toKey());const r=await Yg(t.localStore,e);t.currentUser=e,function(i,o){i.Ga.forEach(c=>{c.forEach(l=>{l.reject(new q(O.CANCELLED,o))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Bi(t,r.Rs)}}function XA(n,e){const t=ne(n),r=t.Ua.get(e);if(r&&r.Ba)return ie().add(r.key);{let s=ie();const i=t.qa.get(e);if(!i)return s;for(const o of i){const c=t.ka.get(o);s=s.unionWith(c.view.Sa)}return s}}function p_(n){const e=ne(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=u_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=XA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=KA.bind(null,e),e.La.p_=OA.bind(null,e.eventManager),e.La.Ja=LA.bind(null,e.eventManager),e}function m_(n){const e=ne(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=WA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=QA.bind(null,e),e}class Ei{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ka(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return Qg(this.persistence,new Wg,e.initialUser,this.serializer)}Xa(e){return new fu(Ha.ri,this.serializer)}Za(e){return new Xg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ei.provider={build:()=>new Ei};class ZA extends Ei{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){Y(this.persistence.referenceDelegate instanceof ha);const r=this.persistence.referenceDelegate.garbageCollector;return new jg(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?ze.withCacheSize(this.cacheSizeBytes):ze.DEFAULT;return new fu(r=>ha.ri(r,t),this.serializer)}}class e0 extends Ei{constructor(e,t,r){super(),this.ru=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.ru.initialize(this,e),await m_(this.ru.syncEngine),await Ui(this.ru.remoteStore),await this.persistence.Ci(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}eu(e){return Qg(this.persistence,new Wg,e.initialUser,this.serializer)}tu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new jg(r,e.asyncQueue,t)}nu(e,t){const r=new lE(t,this.persistence);return new cE(e.asyncQueue,r)}Xa(e){const t=eA(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?ze.withCacheSize(this.cacheSizeBytes):ze.DEFAULT;return new pu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,mA(),Uo(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Za(e){return new Xg}}class pa{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>qf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=JA.bind(null,this.syncEngine),await DA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new VA}()}createDatastore(e){const t=Ka(e.databaseInfo.databaseId),r=function(i){return new pA(i)}(e.databaseInfo);return function(i,o,c,l){return new vA(i,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new bA(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>qf(this.syncEngine,t,0),function(){return Lf.D()?new Lf:new uA}())}createSyncEngine(e,t){return function(s,i,o,c,l,h,p){const m=new BA(s,i,o,c,l,h);return p&&(m.ja=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=ne(s);B(dr,"RemoteStore shutting down."),i.W_.add(5),await Fi(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}pa.provider={build:()=>new pa};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Pu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):Xe("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn="FirestoreClient";class t0{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Je.UNAUTHENTICATED,this.clientId=Sm.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{B(Tn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(B(Tn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ct;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=wu(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Mc(n,e){n.asyncQueue.verifyOperationInProgress(),B(Tn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Yg(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function zf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await n0(n);B(Tn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Ff(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Ff(e.remoteStore,s)),n._onlineComponents=e}async function n0(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){B(Tn,"Using user provided OfflineComponentProvider");try{await Mc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===O.FAILED_PRECONDITION||s.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;di("Error using user provided cache. Falling back to memory cache: "+t),await Mc(n,new Ei)}}else B(Tn,"Using default OfflineComponentProvider"),await Mc(n,new ZA(void 0));return n._offlineComponents}async function g_(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(B(Tn,"Using user provided OnlineComponentProvider"),await zf(n,n._uninitializedComponentsProvider._online)):(B(Tn,"Using default OnlineComponentProvider"),await zf(n,new pa))),n._onlineComponents}function r0(n){return g_(n).then(e=>e.syncEngine)}async function ma(n){const e=await g_(n),t=e.eventManager;return t.onListen=$A.bind(null,e.syncEngine),t.onUnlisten=zA.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=qA.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=GA.bind(null,e.syncEngine),t}function s0(n,e,t={}){const r=new Ct;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,h){const p=new Pu({next:I=>{p.su(),o.enqueueAndForget(()=>Tu(i,m));const A=I.docs.has(c);!A&&I.fromCache?h.reject(new q(O.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&I.fromCache&&l&&l.source==="server"?h.reject(new q(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(I)},error:I=>h.reject(I)}),m=new Su(Oi(c.path),p,{includeMetadataChanges:!0,Ta:!0});return Eu(i,m)}(await ma(n),n.asyncQueue,e,t,r)),r.promise}function i0(n,e,t={}){const r=new Ct;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,h){const p=new Pu({next:I=>{p.su(),o.enqueueAndForget(()=>Tu(i,m)),I.fromCache&&l.source==="server"?h.reject(new q(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(I)},error:I=>h.reject(I)}),m=new Su(c,p,{includeMetadataChanges:!0,Ta:!0});return Eu(i,m)}(await ma(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function __(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y_(n,e,t){if(!t)throw new q(O.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function o0(n,e,t,r){if(e===!0&&r===!0)throw new q(O.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Hf(n){if(!H.isDocumentKey(n))throw new q(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Kf(n){if(H.isDocumentKey(n))throw new q(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Qa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Q()}function pt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new q(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Qa(n);throw new q(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function a0(n,e){if(e<=0)throw new q(O.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c0="firestore.googleapis.com",Wf=!0;class Qf{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new q(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=c0,this.ssl=Wf}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Wf;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Fg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<qg)throw new q(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}o0("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=__((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new q(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new q(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new q(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ku{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Qf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new q(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new q(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Qf(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Xw;switch(r.type){case"firstParty":return new tE(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new q(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Gf.get(t);r&&(B("ComponentProvider","Removing Datastore"),Gf.delete(t),r.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Nt(this.firestore,e,this._query)}}class Ke{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new yn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ke(this.firestore,e,this._key)}}class yn extends Nt{constructor(e,t,r){super(e,t,Oi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ke(this.firestore,null,new H(e))}withConverter(e){return new yn(this.firestore,e,this._path)}}function Pe(n,e,...t){if(n=be(n),y_("collection","path",e),n instanceof ku){const r=pe.fromString(e,...t);return Kf(r),new yn(n,null,r)}{if(!(n instanceof Ke||n instanceof yn))throw new q(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(pe.fromString(e,...t));return Kf(r),new yn(n.firestore,null,r)}}function Me(n,e,...t){if(n=be(n),arguments.length===1&&(e=Sm.newId()),y_("doc","path",e),n instanceof ku){const r=pe.fromString(e,...t);return Hf(r),new Ke(n,null,new H(r))}{if(!(n instanceof Ke||n instanceof yn))throw new q(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(pe.fromString(e,...t));return Hf(r),new Ke(n.firestore,n instanceof yn?n.converter:null,new H(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yf="AsyncQueue";class Jf{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new Zg(this,"async_queue_retry"),this.Su=()=>{const r=Uo();r&&B(Yf,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=Uo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=Uo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new Ct;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!Cn(e))throw e;B(Yf,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw Xe("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=bu.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&Q()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function Xf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class An extends ku{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Jf,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Jf(e),this._firestoreClient=void 0,await e}}}function l0(n,e,t){t||(t=ra);const r=fs(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(ai(i,e))return s;throw new q(O.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new q(O.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<qg)throw new q(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function Ya(n){if(n._terminated)throw new q(O.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||u0(n),n._firestoreClient}function u0(n){var e,t,r;const s=n._freezeSettings(),i=function(c,l,h,p){return new FE(c,l,h,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,__(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new t0(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const l=c?._online.build();return{_offline:c?._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(e){this._byteString=e}static fromBase64String(e){try{return new as(xe.fromBase64String(e))}catch(t){throw new q(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new as(xe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new q(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Te(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xa{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new q(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new q(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return te(this._lat,e._lat)||te(this._long,e._long)}}/**
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
 */class Du{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d0=/^__.*__$/;class h0{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Wt(e,this.data,this.fieldMask,t,this.fieldTransforms):new ys(e,this.data,t,this.fieldTransforms)}}class v_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Wt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function I_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Q()}}class Nu{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new Nu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return ga(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(I_(this.Lu)&&d0.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class f0{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ka(e)}ju(e,t,r,s=!1){return new Nu({Lu:e,methodName:t,zu:r,path:Te.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function $i(n){const e=n._freezeSettings(),t=Ka(n._databaseId);return new f0(n._databaseId,!!e.ignoreUndefinedProperties,t)}function b_(n,e,t,r,s,i={}){const o=n.ju(i.merge||i.mergeFields?2:0,e,t,s);Ou("Data must be an object, but it was:",o,r);const c=E_(r,o);let l,h;if(i.merge)l=new rt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const I=Tl(e,m,t);if(!o.contains(I))throw new q(O.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);A_(p,I)||p.push(I)}l=new rt(p),h=o.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,h=o.fieldTransforms;return new h0(new Ge(c),l,h)}class qi extends Xa{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof qi}}class Vu extends Xa{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new ss(e.serializer,ug(e.serializer,this.Ju));return new mg(e.path,t)}isEqual(e){return e instanceof Vu&&this.Ju===e.Ju}}function p0(n,e,t,r){const s=n.ju(1,e,t);Ou("Data must be an object, but it was:",s,r);const i=[],o=Ge.empty();Pn(r,(l,h)=>{const p=Lu(e,l,t);h=be(h);const m=s.Uu(p);if(h instanceof qi)i.push(p);else{const I=ji(h,m);I!=null&&(i.push(p),o.set(p,I))}});const c=new rt(i);return new v_(o,c,s.fieldTransforms)}function m0(n,e,t,r,s,i){const o=n.ju(1,e,t),c=[Tl(e,r,t)],l=[s];if(i.length%2!=0)throw new q(O.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<i.length;I+=2)c.push(Tl(e,i[I])),l.push(i[I+1]);const h=[],p=Ge.empty();for(let I=c.length-1;I>=0;--I)if(!A_(h,c[I])){const A=c[I];let S=l[I];S=be(S);const P=o.Uu(A);if(S instanceof qi)h.push(A);else{const C=ji(S,P);C!=null&&(h.push(A),p.set(A,C))}}const m=new rt(h);return new v_(p,m,o.fieldTransforms)}function w_(n,e,t,r=!1){return ji(t,n.ju(r?4:3,e))}function ji(n,e){if(T_(n=be(n)))return Ou("Unsupported field value:",e,n),E_(n,e);if(n instanceof Xa)return function(r,s){if(!I_(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let l=ji(c,s.Ku(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=be(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ug(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ae.fromDate(r);return{timestampValue:is(s.serializer,i)}}if(r instanceof Ae){const i=new Ae(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:is(s.serializer,i)}}if(r instanceof xu)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof as)return{bytesValue:wg(s.serializer,r._byteString)};if(r instanceof Ke){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:lu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Du)return function(o,c){return{mapValue:{fields:{[Zl]:{stringValue:eu},[Zr]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw c.Wu("VectorValues must only contain numeric values.");return ru(c.serializer,h)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${Qa(r)}`)}(n,e)}function E_(n,e){const t={};return $m(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Pn(n,(r,s)=>{const i=ji(s,e.qu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function T_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ae||n instanceof xu||n instanceof as||n instanceof Ke||n instanceof Xa||n instanceof Du)}function Ou(n,e,t){if(!T_(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=Qa(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function Tl(n,e,t){if((e=be(e))instanceof Ja)return e._internalPath;if(typeof e=="string")return Lu(n,e);throw ga("Field path arguments must be of type string or ",n,!1,void 0,t)}const g0=new RegExp("[~\\*/\\[\\]]");function Lu(n,e,t){if(e.search(g0)>=0)throw ga(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ja(...e.split("."))._internalPath}catch{throw ga(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ga(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new q(O.INVALID_ARGUMENT,c+n+l)}function A_(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new _0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Za("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class _0 extends Mu{data(){return super.data()}}function Za(n,e){return typeof e=="string"?Lu(n,e):e instanceof Ja?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new q(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Fu{}class ec extends Fu{}function mt(n,e,...t){let r=[];e instanceof Fu&&r.push(e),r=r.concat(t),function(i){const o=i.filter(l=>l instanceof Uu).length,c=i.filter(l=>l instanceof tc).length;if(o>1||o>0&&c>0)throw new q(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class tc extends ec{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new tc(e,t,r)}_apply(e){const t=this._parse(e);return R_(e._query,t),new Nt(e.firestore,e.converter,hl(e._query,t))}_parse(e){const t=$i(e.firestore);return function(i,o,c,l,h,p,m){let I;if(h.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new q(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){ep(m,p);const S=[];for(const P of m)S.push(Zf(l,i,P));I={arrayValue:{values:S}}}else I=Zf(l,i,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||ep(m,p),I=w_(c,o,m,p==="in"||p==="not-in");return le.create(h,p,I)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function cs(n,e,t){const r=e,s=Za("where",n);return tc._create(s,r,t)}class Uu extends Fu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Uu(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:ge.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)R_(o,l),o=hl(o,l)}(e._query,t),new Nt(e.firestore,e.converter,hl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Bu extends ec{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Bu(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new q(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new q(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new bi(i,o)}(e._query,this._field,this._direction);return new Nt(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new gr(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function xt(n,e="asc"){const t=e,r=Za("orderBy",n);return Bu._create(r,t)}class $u extends ec{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new $u(e,t,r)}_apply(e){return new Nt(e.firestore,e.converter,oa(e._query,this._limit,this._limitType))}}function bt(n){return a0("limit",n),$u._create("limit",n,"F")}class qu extends ec{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new qu(e,t,r)}_apply(e){const t=v0(e,this.type,this._docOrFields,this._inclusive);return new Nt(e.firestore,e.converter,function(s,i){return new gr(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function y0(...n){return qu._create("startAfter",n,!1)}function v0(n,e,t,r){if(t[0]=be(t[0]),t[0]instanceof Mu)return function(i,o,c,l,h){if(!l)throw new q(O.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const p=[];for(const m of qr(i))if(m.field.isKeyField())p.push(or(o,l.key));else{const I=l.data.field(m.field);if(Ma(I))throw new q(O.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(I===null){const A=m.field.canonicalString();throw new q(O.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${A}' (used as the orderBy) does not exist.`)}p.push(I)}return new wn(p,h)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=$i(n.firestore);return function(o,c,l,h,p,m){const I=o.explicitOrderBy;if(p.length>I.length)throw new q(O.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const A=[];for(let S=0;S<p.length;S++){const P=p[S];if(I[S].field.isKeyField()){if(typeof P!="string")throw new q(O.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof P}`);if(!nu(o)&&P.indexOf("/")!==-1)throw new q(O.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${P}' contains a slash.`);const C=o.path.child(pe.fromString(P));if(!H.isDocumentKey(C))throw new q(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${C}' is not because it contains an odd number of segments.`);const U=new H(C);A.push(or(c,U))}else{const C=w_(l,h,P);A.push(C)}}return new wn(A,m)}(n._query,n.firestore._databaseId,s,e,t,r)}}function Zf(n,e,t){if(typeof(t=be(t))=="string"){if(t==="")throw new q(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!nu(e)&&t.indexOf("/")!==-1)throw new q(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(pe.fromString(t));if(!H.isDocumentKey(r))throw new q(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return or(n,new H(r))}if(t instanceof Ke)return or(n,t._key);throw new q(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Qa(t)}.`)}function ep(n,e){if(!Array.isArray(n)||n.length===0)throw new q(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function R_(n,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new q(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new q(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class I0{convertValue(e,t="none"){switch(In(e)){case 0:return null;case 1:return e.booleanValue;case 2:return we(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ht(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Q()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Pn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[Zr].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>we(o.doubleValue));return new Du(i)}convertGeoPoint(e){return new xu(we(e.latitude),we(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Fa(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(yi(e));default:return null}}convertTimestamp(e){const t=Gt(e);return new Ae(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=pe.fromString(e);Y(Dg(r));const s=new ir(r.get(1),r.get(3)),i=new H(r.popFirst(5));return s.isEqual(t)||Xe(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C_(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class P_ extends Mu{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Bo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Za("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Bo extends P_{data(e={}){return super.data(e)}}class k_{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Qs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Bo(this._firestore,this._userDataWriter,r.key,r,new Qs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new q(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const l=new Bo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Qs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new Bo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Qs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),p=o.indexOf(c.doc.key)),{type:b0(c.type),doc:l,oldIndex:h,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function b0(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Q()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Is(n){n=pt(n,Ke);const e=pt(n.firestore,An);return s0(Ya(e),n._key).then(t=>D_(e,n,t))}class ju extends I0{constructor(e){super(),this.firestore=e}convertBytes(e){return new as(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ke(this.firestore,null,t)}}function Sn(n){n=pt(n,Nt);const e=pt(n.firestore,An),t=Ya(e),r=new ju(e);return S_(n._query),i0(t,n._query).then(s=>new k_(e,r,n,s))}function x_(n,e,t){n=pt(n,Ke);const r=pt(n.firestore,An),s=C_(n.converter,e,t);return zu(r,[b_($i(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Ze.none())])}function Qt(n,e,t,...r){n=pt(n,Ke);const s=pt(n.firestore,An),i=$i(s);let o;return o=typeof(e=be(e))=="string"||e instanceof Ja?m0(i,"updateDoc",n._key,e,t,r):p0(i,"updateDoc",n._key,e),zu(s,[o.toMutation(n._key,Ze.exists(!0))])}function kn(n,e){const t=pt(n.firestore,An),r=Me(n),s=C_(n.converter,e);return zu(t,[b_($i(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Ze.exists(!1))]).then(()=>r)}function yr(n,...e){var t,r,s;n=be(n);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Xf(e[o])||(i=e[o],o++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Xf(e[o])){const m=e[o];e[o]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let l,h,p;if(n instanceof Ke)h=pt(n.firestore,An),p=Oi(n._key.path),l={next:m=>{e[o]&&e[o](D_(h,n,m))},error:e[o+1],complete:e[o+2]};else{const m=pt(n,Nt);h=pt(m.firestore,An),p=m._query;const I=new ju(h);l={next:A=>{e[o]&&e[o](new k_(h,I,m,A))},error:e[o+1],complete:e[o+2]},S_(n._query)}return function(I,A,S,P){const C=new Pu(P),U=new Su(A,C,S);return I.asyncQueue.enqueueAndForget(async()=>Eu(await ma(I),U)),()=>{C.su(),I.asyncQueue.enqueueAndForget(async()=>Tu(await ma(I),U))}}(Ya(h),p,c,l)}function zu(n,e){return function(r,s){const i=new Ct;return r.asyncQueue.enqueueAndForget(async()=>HA(await r0(r),s,i)),i.promise}(Ya(n),e)}function D_(n,e,t){const r=t.docs.get(e._key),s=new ju(n);return new P_(n,s,e._key,r,new Qs(t.hasPendingWrites,t.fromCache),e.converter)}class w0{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=N_(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function E0(n){return new w0(n)}class T0{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=pa.provider,this._offlineComponentProvider={build:t=>new e0(t,e?.cacheSizeBytes,this.forceOwnership)}}}function N_(n){return new T0(n?.forceOwnership)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(){return new qi("deleteField")}function xn(n){return new Vu("increment",n)}(function(e,t=!0){(function(s){_s=s})(ps),jt(new Pt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new An(new Zw(r.getProvider("auth-internal")),new nE(o,r.getProvider("app-check-internal")),function(h,p){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new q(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ir(h.options.projectId,p)}(o,s),o);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),vt(Vh,Oh,e),vt(Vh,Oh,"esm2017")})();var A0="firebase",S0="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt(A0,S0,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Al=new Map,V_={activated:!1,tokenObservers:[]},R0={initialized:!1,enabled:!1};function Ne(n){return Al.get(n)||Object.assign({},V_)}function C0(n,e){return Al.set(n,e),Al.get(n)}function nc(){return R0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_="https://content-firebaseappcheck.googleapis.com/v1",P0="exchangeRecaptchaV3Token",k0="exchangeDebugToken",np={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},x0=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D0{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new oi,this.pending.promise.catch(t=>{}),await N0(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new oi,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function N0(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V0={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},st=new hs("appCheck","AppCheck",V0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rp(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function Gu(n){if(!Ne(n).activated)throw st.create("use-before-activation",{appName:n.name})}function L_(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let o="";return t&&(o+=_o(t)+"d:"),r&&(o+=_o(r)+"h:"),o+=_o(s)+"m:"+_o(i)+"s",o}function _o(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hu({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const m=await s.getHeartbeatsHeader();m&&(r["X-Firebase-Client"]=m)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(n,i)}catch(m){throw st.create("fetch-network-error",{originalErrorMessage:m?.message})}if(o.status!==200)throw st.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(m){throw st.create("fetch-parse-error",{originalErrorMessage:m?.message})}const l=c.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw st.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const h=Number(l[1])*1e3,p=Date.now();return{token:c.token,expireTimeMillis:p+h,issuedAtTimeMillis:p}}function O0(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${O_}/projects/${t}/apps/${r}:${P0}?key=${s}`,body:{recaptcha_v3_token:e}}}function M_(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${O_}/projects/${t}/apps/${r}:${k0}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L0="firebase-app-check-database",M0=1,Ti="firebase-app-check-store",F_="debug-token";let yo=null;function U_(){return yo||(yo=new Promise((n,e)=>{try{const t=indexedDB.open(L0,M0);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(st.create("storage-open",{originalErrorMessage:(s=r.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Ti,{keyPath:"compositeKey"})}}}catch(t){e(st.create("storage-open",{originalErrorMessage:t?.message}))}}),yo)}function F0(n){return $_(q_(n))}function U0(n,e){return B_(q_(n),e)}function B0(n){return B_(F_,n)}function $0(){return $_(F_)}async function B_(n,e){const r=(await U_()).transaction(Ti,"readwrite"),i=r.objectStore(Ti).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=l=>{o()},r.onerror=l=>{var h;c(st.create("storage-set",{originalErrorMessage:(h=l.target.error)===null||h===void 0?void 0:h.message}))}})}async function $_(n){const t=(await U_()).transaction(Ti,"readonly"),s=t.objectStore(Ti).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{const l=c.target.result;i(l?l.value:void 0)},t.onerror=c=>{var l;o(st.create("storage-get",{originalErrorMessage:(l=c.target.error)===null||l===void 0?void 0:l.message}))}})}function q_(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ai=new Ra("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function q0(n){if(Sa()){let e;try{e=await F0(n)}catch(t){Ai.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function Fc(n,e){return Sa()?U0(n,e).catch(t=>{Ai.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function j0(){let n;try{n=await $0()}catch{}if(n)return n;{const e=crypto.randomUUID();return B0(e).catch(t=>Ai.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ku(){return nc().enabled}async function Wu(){const n=nc();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function z0(){const n=Pp(),e=nc();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new oi;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(j0())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G0={error:"UNKNOWN_ERROR"};function H0(n){return Vl.encodeString(JSON.stringify(n),!1)}async function Sl(n,e=!1){const t=n.app;Gu(t);const r=Ne(t);let s=r.token,i;if(s&&!Fr(s)&&(r.token=void 0,s=void 0),!s){const l=await r.cachedTokenPromise;l&&(Fr(l)?s=l:await Fc(t,void 0))}if(!e&&s&&Fr(s))return{token:s.token};let o=!1;if(Ku()){r.exchangeTokenPromise||(r.exchangeTokenPromise=Hu(M_(t,await Wu()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),o=!0);const l=await r.exchangeTokenPromise;return await Fc(t,l),r.token=l,{token:l.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),o=!0),s=await Ne(t).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"?Ai.warn(l.message):Ai.error(l),i=l}let c;return s?i?Fr(s)?c={token:s.token,internalError:i}:c=ip(i):(c={token:s.token},r.token=s,await Fc(t,s)):c=ip(i),o&&G_(t,c),c}async function K0(n){const e=n.app;Gu(e);const{provider:t}=Ne(e);if(Ku()){const r=await Wu(),{token:s}=await Hu(M_(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function j_(n,e,t,r){const{app:s}=n,i=Ne(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&Fr(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),sp(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>sp(n))}function z_(n,e){const t=Ne(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function sp(n){const{app:e}=n,t=Ne(e);let r=t.tokenRefresher;r||(r=W0(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function W0(n){const{app:e}=n;return new D0(async()=>{const t=Ne(e);let r;if(t.token?r=await Sl(n,!0):r=await Sl(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=Ne(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},np.RETRIAL_MIN_WAIT,np.RETRIAL_MAX_WAIT)}function G_(n,e){const t=Ne(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Fr(n){return n.expireTimeMillis-Date.now()>0}function ip(n){return{token:H0(G0),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q0{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=Ne(this.app);for(const t of e)z_(this.app,t.next);return Promise.resolve()}}function Y0(n,e){return new Q0(n,e)}function J0(n){return{getToken:e=>Sl(n,e),getLimitedUseToken:()=>K0(n),addTokenListener:e=>j_(n,"INTERNAL",e),removeTokenListener:e=>z_(n.app,e)}}const X0="@firebase/app-check",Z0="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eS="https://www.google.com/recaptcha/api.js";function tS(n,e){const t=new oi,r=Ne(n);r.reCAPTCHAState={initialized:t};const s=nS(n),i=rp(!1);return i?op(n,e,i,s,t):iS(()=>{const o=rp(!1);if(!o)throw new Error("no recaptcha");op(n,e,o,s,t)}),t.promise}function op(n,e,t,r,s){t.ready(()=>{sS(n,e,t,r),s.resolve(t)})}function nS(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function rS(n){Gu(n);const t=await Ne(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=Ne(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function sS(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{Ne(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Ne(n).reCAPTCHAState.succeeded=!1}}),i=Ne(n);i.reCAPTCHAState=Object.assign(Object.assign({},i.reCAPTCHAState),{widgetId:s})}function iS(n){const e=document.createElement("script");e.src=eS,e.onload=n,document.head.appendChild(e)}/**
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
 */class Qu{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;aS(this._throttleData);const s=await rS(this._app).catch(o=>{throw st.create("recaptcha-error")});if(!(!((e=Ne(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw st.create("recaptcha-error");let i;try{i=await Hu(O0(this._app,s),this._heartbeatServiceProvider)}catch(o){throw!((t=o.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=oS(Number((r=o.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),st.create("throttled",{time:L_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,i}initialize(e){this._app=e,this._heartbeatServiceProvider=fs(e,"heartbeat"),tS(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Qu?this._siteKey===e._siteKey:!1}}function oS(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+x0,httpStatus:n};{const t=e?e.backoffCount:0,r=Pv(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function aS(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw st.create("throttled",{time:L_(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cS(n=Ll(),e){n=be(n);const t=fs(n,"app-check");if(nc().initialized||z0(),Ku()&&Wu().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw st.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return lS(n,e.provider,e.isTokenAutoRefreshEnabled),Ne(n).isTokenAutoRefreshEnabled&&j_(r,"INTERNAL",()=>{}),r}function lS(n,e,t){const r=C0(n,Object.assign({},V_));r.activated=!0,r.provider=e,r.cachedTokenPromise=q0(n).then(s=>(s&&Fr(s)&&(r.token=s,G_(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const uS="app-check",ap="app-check-internal";function dS(){jt(new Pt(uS,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return Y0(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(ap).initialize()})),jt(new Pt(ap,n=>{const e=n.getProvider("app-check").getImmediate();return J0(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),vt(X0,Z0)}dS();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hS="type.googleapis.com/google.protobuf.Int64Value",fS="type.googleapis.com/google.protobuf.UInt64Value";function H_(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function _a(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>_a(e));if(typeof n=="function"||typeof n=="object")return H_(n,e=>_a(e));throw new Error("Data cannot be encoded in JSON: "+n)}function ls(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case hS:case fS:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>ls(e)):typeof n=="function"||typeof n=="object"?H_(n,e=>ls(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class it extends Dt{constructor(e,t,r){super(`${Yu}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,it.prototype)}}function pS(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function ya(n,e){let t=pS(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!cp[o])return new it("internal","internal");t=cp[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=ls(s))}}catch{}return t==="ok"?null:new it(t,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mS{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,dt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl="us-central1",gS=/^data: (.*?)(?:\n|$)/;function _S(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new it("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class yS{constructor(e,t,r,s,i=Rl,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new mS(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=Rl}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function vS(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function IS(n,e,t){const r=s=>wS(n,e,s,{});return r.stream=(s,i)=>TS(n,e,s,i),r}async function bS(n,e,t,r){t["Content-Type"]="application/json";let s;try{s=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}async function K_(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function wS(n,e,t,r){const s=n._url(e);return ES(n,s,t,r)}async function ES(n,e,t,r){t=_a(t);const s={data:t},i=await K_(n,r),o=r.timeout||7e4,c=_S(o),l=await Promise.race([bS(e,s,i,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!l)throw new it("cancelled","Firebase Functions instance was deleted.");const h=ya(l.status,l.json);if(h)throw h;if(!l.json)throw new it("internal","Response is not valid JSON object.");let p=l.json.data;if(typeof p>"u"&&(p=l.json.result),typeof p>"u")throw new it("internal","Response is missing data field.");return{data:ls(p)}}function TS(n,e,t,r){const s=n._url(e);return AS(n,s,t,r||{})}async function AS(n,e,t,r){var s;t=_a(t);const i={data:t},o=await K_(n,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:o,signal:r?.signal})}catch(A){if(A instanceof Error&&A.name==="AbortError"){const P=new it("cancelled","Request was cancelled.");return{data:Promise.reject(P),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(P)}}}}}}const S=ya(0,null);return{data:Promise.reject(S),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(S)}}}}}}let l,h;const p=new Promise((A,S)=>{l=A,h=S});(s=r?.signal)===null||s===void 0||s.addEventListener("abort",()=>{const A=new it("cancelled","Request was cancelled.");h(A)});const m=c.body.getReader(),I=SS(m,l,h,r?.signal);return{stream:{[Symbol.asyncIterator](){const A=I.getReader();return{async next(){const{value:S,done:P}=await A.read();return{value:S,done:P}},async return(){return await A.cancel(),{done:!0,value:void 0}}}}},data:p}}function SS(n,e,t,r){const s=(o,c)=>{const l=o.match(gS);if(!l)return;const h=l[1];try{const p=JSON.parse(h);if("result"in p){e(ls(p.result));return}if("message"in p){c.enqueue(ls(p.message));return}if("error"in p){const m=ya(0,p);c.error(m),t(m);return}}catch(p){if(p instanceof it){c.error(p),t(p);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return l();async function l(){if(r?.aborted){const h=new it("cancelled","Request was cancelled");return o.error(h),t(h),Promise.resolve()}try{const{value:h,done:p}=await n.read();if(p){c.trim()&&s(c.trim(),o),o.close();return}if(r?.aborted){const I=new it("cancelled","Request was cancelled");o.error(I),t(I),await n.cancel();return}c+=i.decode(h,{stream:!0});const m=c.split(`
`);c=m.pop()||"";for(const I of m)I.trim()&&s(I.trim(),o);return l()}catch(h){const p=h instanceof it?h:ya(0,null);o.error(p),t(p)}}},cancel(){return n.cancel()}})}const lp="@firebase/functions",up="0.12.2";/**
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
 */const RS="auth-internal",CS="app-check-internal",PS="messaging-internal";function kS(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(RS),o=t.getProvider(PS),c=t.getProvider(CS);return new yS(s,i,o,c,r)};jt(new Pt(Yu,e,"PUBLIC").setMultipleInstances(!0)),vt(lp,up,n),vt(lp,up,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xS(n=Ll(),e=Rl){const r=fs(be(n),Yu).getImmediate({identifier:e}),s=uv("functions");return s&&DS(r,...s),r}function DS(n,e,t){vS(be(n),e,t)}function Ju(n,e,t){return IS(be(n),e)}kS();const NS={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},VS="altorra-crm",rc=Lp(NS,VS);cS(rc,{provider:new Qu("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const va=Qw(rc),oe=l0(rc,{localCache:E0({tabManager:N_({})})}),Xu=xS(rc,"us-central1");function $t(n){const e=z.get().permissions||[];return e.includes("*")||e.includes(n)}function OS(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function LS(n){try{const e=await Is(Me(oe,"usuarios",n.uid)),t=e.exists()?e.data():null;z.set({user:n,profile:t,permissions:OS(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),z.set({user:n,profile:null,permissions:[],ready:!0})}}function MS(){Ob(va,dm).catch(()=>{}),Fb(va,n=>{n?LS(n):z.set({user:null,profile:null,permissions:[],ready:!0})})}const FS={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function US(n,e){z.set({authError:null});try{await Vb(va,String(n).trim(),e)}catch(t){const r=FS[t&&t.code]||"No se pudo iniciar sesión.";throw z.set({authError:r}),t}}async function BS(){if(z.get().mock){z.set({user:null,profile:null,permissions:[]});return}await Ub(va)}function Uc(){const{profile:n,user:e}=z.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function $S(){const{profile:n}=z.get();return n&&(n.cargo||n.roleName)||"Asesor"}const qS=["bandeja","pipeline","agenda","reportes","contactos","config"];function W_(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return qS.includes(e)?e:"bandeja"}function jS(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function zS(n){const e=()=>n(W_());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function u(n,e={},t=[]){const r=document.createElement(n);for(const[s,i]of Object.entries(e))i==null||i===!1||(s==="class"?r.className=i:s==="html"?r.innerHTML=i:s==="text"?r.textContent=i:s==="dataset"?Object.assign(r.dataset,i):s==="style"&&typeof i=="object"?Object.assign(r.style,i):s.startsWith("on")&&typeof i=="function"?r.addEventListener(s.slice(2).toLowerCase(),i):r.setAttribute(s,i===!0?"":String(i)));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function fe(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let zr=null;function Q_(n){zr&&!zr.contains(n.target)&&Ia()}function Y_(n){n.key==="Escape"&&Ia()}function Ia(){zr&&(zr.remove(),zr=null,document.removeEventListener("mousedown",Q_,!0),window.removeEventListener("keydown",Y_,!0))}function Et(n,e,t,r={}){Ia();const s=u("div",{class:"popover",role:"menu"});r.title&&s.append(u("div",{class:"popover__title",text:r.title})),e.forEach(o=>{if(o.divider){s.append(u("div",{class:"popover__divider"}));return}const c=u("button",{class:"popover__item"+(o.active?" is-active":""),type:"button",role:"menuitem"},[o.icon?u("span",{class:"popover__icon",text:o.icon}):null,u("span",{class:"u-grow u-truncate",text:o.label}),o.hint?u("span",{class:"popover__hint u-caption",text:o.hint}):null]);c.addEventListener("click",l=>{l.stopPropagation(),Ia(),t(o)}),s.append(c)}),document.body.append(s),GS(s,n),zr=s,setTimeout(()=>{document.addEventListener("mousedown",Q_,!0),window.addEventListener("keydown",Y_,!0)},0);const i=s.querySelector(".popover__item");i&&i.focus()}function GS(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,s=n.offsetHeight;let i=t.bottom+6,o=t.right-r;o<8&&(o=8),o+r>window.innerWidth-8&&(o=window.innerWidth-r-8),i+s>window.innerHeight-8&&(i=t.top-s-6),n.style.top=`${Math.max(8,i)}px`,n.style.left=`${Math.max(8,o)}px`}function zi(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function HS(n){return String(n||"").replace(/\D/g,"")}function J_(n,e){const t=HS(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function X_(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function us(n){const e=X_(n);return e===1/0?1/0:e/864e5}function nr(n){const e=X_(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const s=Math.floor(r/24);return s===1?"ayer":s<7?`hace ${s} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function KS(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Bc(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),s=t%60;return s?`${r} h ${s} min`:`${r} h`}function Ys(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function ba(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const WS="0.4.1",QS=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0},{id:"config",label:"Disponibilidad",icon:"⚙️",ready:!0,perm:"calendar.config"}],$c={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos",config:"Disponibilidad de citas"};function YS(n){const e={},t=u("div",{class:"sidebar__brand"},[u("span",{class:"sidebar__logo",text:"ALTORRA"}),u("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=u("nav",{class:"sidebar__nav","aria-label":"Secciones"});QS.filter(P=>!P.perm||$t(P.perm)).forEach(P=>{const C=u("button",{class:"navitem",type:"button",disabled:!P.ready},[u("span",{class:"navitem__icon","aria-hidden":"true",text:P.icon}),u("span",{class:"navitem__label",text:P.label}),P.ready?null:u("span",{class:"navitem__soon",text:"Pronto"})]);P.ready&&C.addEventListener("click",()=>jS(P.id)),e[P.id]=C,r.append(C)});const s=u("aside",{class:"sidebar"},[t,r,u("div",{class:"sidebar__foot u-caption u-faint"},[`v${WS} · Fase 4`])]),i=u("h1",{class:"topbar__h",text:$c.bandeja}),o=u("span",{class:"topbar__crumb u-caption u-faint",text:z.get().mock?"modo demo":"tiempo real"}),c=u("div",{class:"topbar__title"},[i,o]),l=u("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[u("span",{"aria-hidden":"true",text:z.get().theme==="dark"?"☀️":"🌙"})]);l.addEventListener("click",()=>{const P=rv();l.firstChild.textContent=P==="dark"?"☀️":"🌙"});const h=u("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:zi(Uc())}),u("span",{class:"usermenu__meta"},[u("span",{class:"usermenu__name u-truncate",text:Uc()}),u("span",{class:"usermenu__role u-caption u-faint u-truncate",text:$S()})])]);h.addEventListener("click",()=>{Et(h,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],P=>{P.value==="logout"&&BS()},{title:Uc()})});const p=u("header",{class:"topbar"},[c,u("div",{class:"topbar__actions u-row"},[l,h])]),m=u("main",{class:"outlet",id:"outlet"}),I=u("div",{id:"detail-root"}),A=u("div",{class:"app-shell"},[s,u("div",{class:"app-main"},[p,m]),I]);fe(n),n.removeAttribute("aria-busy"),n.append(A);function S(P){Object.entries(e).forEach(([C,U])=>{const R=C===P;U.classList.toggle("is-active",R),R?U.setAttribute("aria-current","page"):U.removeAttribute("aria-current")}),i.textContent=$c[P]||$c.bandeja}return{outlet:m,detailRoot:I,setActive:S}}function JS(n){const e=u("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=u("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=u("div",{class:"login__error",role:"alert",hidden:!0}),s=u("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),i=u("form",{class:"login__form"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Correo"}),e]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Contraseña"}),t]),r,s]);i.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,s.disabled=!0,s.textContent="Entrando…";try{await US(e.value,t.value)}catch{r.textContent=z.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,s.disabled=!1,s.textContent="Entrar"}});const o=u("div",{class:"login surface"},[u("div",{class:"login__brand"},[u("span",{class:"login__logo",text:"ALTORRA"}),u("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),u("h1",{class:"login__title",text:"Bienvenido"}),u("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),i,u("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);fe(n),n.removeAttribute("aria-busy"),n.append(u("div",{class:"login-wrap"},[o])),setTimeout(()=>e.focus(),50)}const XS=()=>document.getElementById("toast-root"),dp={ok:"✓",error:"⚠",info:"ℹ"};function K(n,e="info",t=3200){const r=XS();if(!r)return;const s=document.createElement("div");s.className=`toast toast--${e}`,s.setAttribute("role",e==="error"?"alert":"status");const i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.textContent=dp[e]||dp.info;const o=document.createElement("span");o.className="u-grow",o.textContent=n,s.append(i,o),r.appendChild(s);const c=()=>{s.classList.add("is-leaving"),s.addEventListener("animationend",()=>s.remove(),{once:!0})},l=setTimeout(c,t);s.addEventListener("click",()=>{clearTimeout(l),c()})}const ZS=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],eR=["cita","test_drive","test-drive","visita","agendar","peritaje"],tR=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],nR=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],rR={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function sc(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return nR.some(s=>e.includes(s)||t.includes(s))?r="pqr":t.includes("cita")||eR.some(s=>e.includes(s))?r="cita":tR.some(s=>e.includes(s))&&(r="solicitud"),{type:r,...rR[r]}}function Zu(n){const e=String(n.sourceDetail||"").toLowerCase();return ZS.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const sR={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function Si(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...sR[t]}}const iR=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],oR=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],vo={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function Z_(n){const e=ds(n.status),{type:t}=sc(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(vo[t]||vo.lead));const s=r-Date.now(),i=vo[t]||vo.lead;let o="ok";return e?o="ok":s<=0?o="late":s<i*.25&&(o="warn"),{state:o,dueAt:r,remainingMs:s,closed:e}}const Cl=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"convertido",label:"Convertido",badge:"ok"},{id:"descartado",label:"Descartado",badge:""}],aR=[{id:"inalcanzable",label:"Inalcanzable (no responde)"},{id:"no_califica",label:"No califica (sin presupuesto/intención)"},{id:"duplicado",label:"Duplicado"},{id:"ya_compro_en_otra_parte",label:"Ya compró en otra parte"},{id:"spam_prueba",label:"Spam / prueba"}],cR={calificado:{id:"calificado",label:"Calificado (v2)",badge:"ok"},no_calificado:{id:"no_calificado",label:"No calificado (v2)",badge:""},perdido:{id:"perdido",label:"Perdido (v2)",badge:"danger"}},lR=Cl.reduce((n,e)=>(n[e.id]=e,n),{});function $o(n){return lR[n]||cR[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function ds(n){return n==="convertido"||n==="descartado"||n==="perdido"||n==="no_calificado"}function ey(n){return!n.status||n.status==="nuevo"}const Pl={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},Yn=n=>Math.max(0,Math.min(1,n));function uR(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return Zu(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),Yn(t)}function dR(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const s=(r.match(/\d[\d.,]{5,}/g)||[]).map(i=>parseInt(i.replace(/\D/g,""),10)).filter(i=>i>0);s.length&&(e=Math.max(e,Math.max(...s)/5e7))}return Yn(e)}function hR(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(us(r)>30||e.add(String(r).slice(0,10)))}return Yn(e.size/8)}function ty(n,e=[],t=null){const r=Array.isArray(e)?e:[],s={intent:uR(n),interactions:Yn(r.length/6),recency:n.lastActivityAt?Yn(1-us(n.lastActivityAt)/30):0,frequency:hR(r),economic:dR(r),age:n.createdAt?Yn(us(n.createdAt)/60):0,engagement:t&&Number(t.score)?Yn(t.score/100):0};let i=0;for(const c of Object.keys(Pl))i+=s[c]*Pl[c];const o=Math.round(i*100);return{score:o,rating:fR(o),factors:s}}function fR(n){return n>=70?"hot":n>=40?"warm":"cold"}const Gr={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},hp={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},pR=Pl;function ny(n,e={}){const t=Number(e.score)||0,{type:r}=sc(n),s=us(n.createdAt),i=us(n.lastActivityAt),o=ey(n),c=ds(n.status),l=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&o,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&o&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:Zu(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:o&&s<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&i>=2&&i<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:i>=30&&i!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],p=l.filter(m=>m.when).sort((m,I)=>I.priority-m.priority)[0]||l[l.length-1];return{id:p.id,label:p.label,reason:p.reason,icon:p.icon,priority:p.priority}}function ry(n,e=[]){const{score:t,rating:r,factors:s}=ty(n,e,null);return{...n,_score:t,_rating:r,_factors:s,_type:sc(n),_channel:Si(n),_sla:Z_(n),_nba:ny(n,{score:t})}}function Io(n){return n.map(e=>ry(e))}const kl=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function sy(n,e,t){switch(e){case"calientes":return ey(n)&&!ds(n.status)&&(n._rating==="hot"||Zu(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!ds(n.status);case"todo":default:return!0}}function mR(n,e){const t={};for(const r of kl)t[r.id]=0;for(const r of n)for(const s of kl)sy(r,s.id,e)&&t[s.id]++;return t}const bo={late:0,warn:1,ok:2};function gR(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return bo[t]!==bo[r]?bo[t]-bo[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function _R(n,{type:e,channel:t,status:r}){return n.filter(s=>!(e&&s._type.type!==e||t&&s._channel.key!==t||r&&(s.status||"nuevo")!==r))}function yR(n,e){const t=ba(e).trim();return t?n.filter(r=>ba([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function vR(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function IR(n,{queue:e,uid:t,filters:r,search:s,showClosed:i=!1}){let o=n.filter(l=>sy(l,e,t));o=_R(o,r),o=yR(o,s);let c=0;if(!i&&!r.status){const l=o.filter(h=>!ds(h.status)&&!h.archived);c=o.length-l.length,o=l}return o.sort(gR),{rows:o,hiddenClosed:c}}const hr=()=>new Date().toISOString(),ed=n=>({id:n.id,...n.data()});function bR({pageSize:n=40,onData:e,onError:t}){let r=null;const s=mt(Pe(oe,"leads"),xt("createdAt","desc"),bt(n));return{unsubscribe:yr(s,o=>{const c=o.docs.map(ed);r=o.docs[o.docs.length-1]||null,e(c,{hasMore:o.size>=n})},o=>{t&&t(o)}),getLastDoc:()=>r}}async function wR({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=mt(Pe(oe,"leads"),xt("createdAt","desc"),y0(e),bt(n)),r=await Sn(t);return{rows:r.docs.map(ed),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function ER(){const e=(await Sn(Pe(oe,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return z.set({team:e}),e}async function TR(n,e){await Qt(Me(oe,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:hr(),updatedBy:fr(),_version:xn(1)})}async function AR(n,e,t={},r={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const s=hr();await Qt(Me(oe,"leads",n),{...r,status:e,lastActivityAt:s,updatedAt:s,updatedBy:fr(),_version:xn(1)}),await kn(Pe(oe,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:fr(),createdAt:s,_version:1})}async function fp(n,{type:e="nota",subject:t="",body:r="",direction:s="outbound",name:i=""}){await kn(Pe(oe,"activities"),{type:e,subject:t,body:r,status:"closed",direction:s,relatedTo:{type:"lead",id:n,name:i},ownerId:fr(),createdAt:hr(),_version:1})}async function SR(n,{subject:e,dueAt:t,name:r=""}){await kn(Pe(oe,"activities"),{type:"tarea",subject:e,body:"",status:"open",direction:"outbound",dueAt:t,relatedTo:{type:"lead",id:n,name:r},ownerId:fr(),createdAt:hr(),_version:1})}async function RR(){const n=new Date;n.setHours(23,59,59,999);const e=mt(Pe(oe,"activities"),cs("dueAt","<=",n.toISOString()),xt("dueAt","desc"),bt(80));return(await Sn(e)).docs.map(ed).filter(r=>r.status==="open"&&(r.type==="tarea"||r.type==="cita")).sort((r,s)=>String(r.dueAt).localeCompare(String(s.dueAt)))}async function CR(n){await Qt(Me(oe,"activities",n),{status:"closed",closedAt:hr(),closedBy:fr()})}async function PR(n,e=!0){await Qt(Me(oe,"leads",n),{archived:e,archivedAt:e?hr():null,updatedAt:hr(),updatedBy:fr(),_version:xn(1)})}async function kR(n){return(await Ju(Xu,"crmPurgeLead")({leadId:n})).data}function fr(){const n=z.get().user;return n?n.uid:null}async function xR(n){const e=z.get().user?z.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await kn(Pe(oe,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const Jn=n=>new Date(Date.now()-n*6e4).toISOString(),Re=n=>Jn(n*60),re=n=>Jn(n*60*24),DR=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],td=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Jn(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:Jn(18),lastActivityAt:Jn(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Jn(5),contactId:"email_casalcedo_outlook_com",createdAt:Re(1),lastActivityAt:Re(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Re(-1),contactId:"email_diana_r_hotmail_com",createdAt:Re(5),lastActivityAt:Re(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Re(-3),contactId:"phone_573044455667",createdAt:Re(8),lastActivityAt:Re(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:re(-1),contactId:"email_lauraortiz_gmail_com",createdAt:re(1),lastActivityAt:Re(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:re(-1),contactId:"email_pnarango_empresa_co",createdAt:re(2),lastActivityAt:re(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:re(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:re(4),lastActivityAt:re(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:re(-2),contactId:"email_afcuesta_gmail_com",createdAt:re(6),lastActivityAt:re(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:re(-10),contactId:"email_cata_rios_gmail_com",createdAt:re(12),lastActivityAt:re(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Re(-2),contactId:"email_glopa_gmail_com",createdAt:Re(3),lastActivityAt:Re(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:re(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:re(10),lastActivityAt:re(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:re(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:re(15),lastActivityAt:re(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:re(19),contactId:"email_hdloaiza_gmail_com",createdAt:re(20),lastActivityAt:re(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:re(24),contactId:"email_pasuarez_gmail_com",createdAt:re(25),lastActivityAt:re(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:re(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:re(22),lastActivityAt:re(9),_version:4}],NR={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:Jn(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Re(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Re(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:Re(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:re(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:Re(20),_version:1}]},Ri={};td.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";Ri[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});Ri.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:re(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:re(3),lastActivityAt:re(3),_version:1};const qo={},wa=()=>td.map(n=>({...n})),iy=()=>DR.map(n=>({...n})),VR=n=>(NR[n]||[]).map(e=>({...e})),OR=n=>Ri[n]?{...Ri[n]}:null,LR=()=>Object.values(Ri).map(n=>({...n})),pp=n=>(qo[n]||[]).map(e=>({...e}));function MR(n,e){qo[n]||(qo[n]=[]),qo[n].unshift({id:"n"+Date.now(),...e})}let FR=100;const ri=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:Re(2),createdAt:Re(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_fijada",stageName:"Cita fijada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:Re(20),createdAt:re(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"visita_test_drive",stageName:"Visita / Test drive",status:"open",amount:68e6,currency:"COP",probability:.5,weightedAmount:34e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:re(18),createdAt:re(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.7,weightedAmount:945e5,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:Re(6),createdAt:re(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"cuadrando_cita",stageName:"Cuadrando cita",status:"open",amount:0,currency:"COP",probability:.2,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:Re(1),createdAt:Re(1),_version:1},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:re(3),createdAt:re(10),_version:6},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:re(5),createdAt:re(15),_version:7},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:re(9),createdAt:re(22),_version:4}],oy=()=>ri.map(n=>({...n}));function UR(n){const e="d"+ ++FR;return ri.unshift({id:e,...n}),e}function BR(n,e){const t=ri.findIndex(r=>r.id===n);t>=0&&(ri[t]={...ri[t],...e})}const Un=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},xl=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:Un(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:Un(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:Un(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:Un(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:Un(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:Un(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:Un(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],$R=()=>xl.map(n=>({...n}));function qR(n){xl.push({id:"ag"+(xl.length+1),...n})}let jR=100;function ay(n){const e="lm"+ ++jR,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),s=(n.prefijoPais||"+57").replace(/\D/g,""),i=r?"+"+(r.startsWith(s)?r:s+r):"",o=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:o,phone:i,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:o?"email_"+o.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return td.unshift(c),e}function zR(){const n={},e=(m,I,A)=>u("label",{class:"field"},[u("span",{class:"field__label",text:m}),I,null]);n.nombre=u("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=u("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=u("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=u("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=u("select",{class:"select"},iR.map(m=>u("option",{value:m.id},[`${m.icon} ${m.label}`]))),n.interes=u("select",{class:"select"},oR.map(m=>u("option",{value:m.id},[m.label]))),n.trafico=u("select",{class:"select"},[u("option",{value:""},["— Tráfico —"]),u("option",{value:"organico"},["Orgánico"]),u("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=u("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=u("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=u("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=u("input",{type:"checkbox",checked:!0});const t=u("div",{class:"login__error",role:"alert",hidden:!0}),r=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),s=u("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),i=u("form",{class:"nl-form"},[e("Nombre *",n.nombre),u("div",{class:"nl-row"},[u("label",{class:"field",style:{flex:"0 0 auto"}},[u("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),u("label",{class:"field u-grow"},[u("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),u("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),u("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),u("label",{class:"nl-consent"},[n.consent,u("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,u("div",{class:"nl-actions"},[r,s])]),o=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"＋ Nuevo lead"}),u("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),i]),c=u("div",{class:"modal-overlay"},[o]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const l=()=>{c.remove(),window.removeEventListener("keydown",h)},h=m=>{m.key==="Escape"&&l()};window.addEventListener("keydown",h),c.addEventListener("mousedown",m=>{m.target===c&&l()}),r.addEventListener("click",l),i.addEventListener("submit",async m=>{m.preventDefault(),t.hidden=!0;const I={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!I.nombre)return p("Escribe el nombre del cliente.");if(!I.email&&!I.telefono)return p("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");s.disabled=!0,s.textContent="Guardando…";try{z.get().mock?(ay(I),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await xR(I),K("✓ Lead agregado a la Bandeja","ok"),l()}catch{s.disabled=!1,s.textContent="Agregar lead",p("No se pudo agregar. Intenta de nuevo.")}});function p(m){return t.textContent=m,t.hidden=!1,!1}}const Dl="altorra_friction_v1",GR=300;function Ea(n,e,t={}){try{const r=Math.max(0,Math.round(performance.now()-e)),s=JSON.parse(localStorage.getItem(Dl)||"[]");for(s.push({task:n,ms:r,at:new Date().toISOString(),...t});s.length>GR;)s.shift();localStorage.setItem(Dl,JSON.stringify(s))}catch{}}function HR(){try{const n=JSON.parse(localStorage.getItem(Dl)||"[]"),e={};for(const r of n)(e[r.task]=e[r.task]||[]).push(r.ms);const t={};for(const[r,s]of Object.entries(e)){const i=[...s].sort((o,c)=>o-c);t[r]={n:s.length,mediana_s:+(i[Math.floor(i.length/2)]/1e3).toFixed(1),p90_s:+(i[Math.floor(i.length*.9)]/1e3).toFixed(1)}}return t}catch{return{}}}typeof window<"u"&&(window.__friccion=HR);const KR=[{id:"whatsapp",label:"WhatsApp",icon:"💬"},{id:"walkin",label:"Walk-in",icon:"🚶"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"referido",label:"Referido",icon:"🤝"}],WR="“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”";function QR(){const n=performance.now(),e={fuente:"whatsapp",medio:"organico"},t=z.get().user||{},r=u("input",{class:"input",type:"text",placeholder:"Nombre",autocomplete:"off"}),s=u("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off",inputmode:"tel"}),i=u("input",{class:"input",type:"text",placeholder:'Nota corta (opcional): "busca SUV blanca"',autocomplete:"off"}),o=u("input",{type:"checkbox"}),c=u("div",{class:"u-row",style:{flexWrap:"wrap",gap:"6px"}});function l(){c.replaceChildren(...KR.map(k=>{const F=u("button",{class:"chip"+(e.fuente===k.id?" chip--active":""),type:"button"},[`${k.icon} ${k.label}`]);return F.addEventListener("click",()=>{e.fuente=k.id,l()}),F}))}l();const h=u("button",{class:"chip",type:"button"},["Orgánico"]);h.addEventListener("click",()=>{e.medio=e.medio==="organico"?"pauta":"organico",h.textContent=e.medio==="organico"?"Orgánico":"Pauta (pago)"});const p=u("div",{class:"login__error",role:"alert",hidden:!0}),m=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),I=u("button",{class:"btn btn--gold",type:"submit"},["⚡ Registrar"]),A=u("form",{class:"nl-form"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Nombre *"}),r]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Teléfono / WhatsApp *"}),s]),u("div",{class:"u-row",style:{gap:"8px",alignItems:"center"}},[c,h]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Nota"}),i]),u("label",{class:"nl-consent"},[o,u("span",{class:"u-caption"},["Leí el guion y el cliente AUTORIZÓ de palabra: ",u("em",{text:WR})])]),p,u("div",{class:"nl-actions"},[m,I])]),S=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"⚡ Lead rápido"}),u("span",{class:"u-caption u-faint",text:navigator.onLine?"El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.":"📴 Sin señal: se guardará y sincronizará solo al volver la conexión."})]),A]),P=u("div",{class:"modal-overlay"},[S]);document.body.appendChild(P),setTimeout(()=>r.focus(),30);const C=()=>{P.remove(),window.removeEventListener("keydown",U)},U=k=>{k.key==="Escape"&&C()};window.addEventListener("keydown",U),P.addEventListener("mousedown",k=>{k.target===P&&C()}),m.addEventListener("click",C),A.addEventListener("submit",k=>{k.preventDefault(),p.hidden=!0;const F={nombre:r.value.trim(),telefono:s.value.trim(),fuente:e.fuente,medio:e.medio,nota:i.value.trim(),consentVerbal:o.checked,ownerId:t.uid||null,ownerName:t.nombre||t.email||null,createdAt:new Date().toISOString()};if(!F.nombre)return R("Escribe el nombre.");if(!F.telefono||F.telefono.replace(/\D/g,"").length<7)return R("Escribe un teléfono válido.");if(!F.ownerId&&!z.get().mock)return R("Sesión sin usuario — recarga el portal.");if(z.get().mock){ay({nombre:F.nombre,telefono:F.telefono,canal:F.fuente,trafico:F.medio,consentGiven:F.consentVerbal,notas:F.nota}),window.dispatchEvent(new CustomEvent("altorra:leads-dirty")),K("⚡ Lead registrado (mock)","ok"),C();return}kn(Pe(oe,"lead_intake"),F).catch(x=>{console.error("[quick-lead] rechazo del servidor:",x),K('El lead "'+F.nombre+'" fue RECHAZADO al sincronizar: '+(x.code||x.message),"error")}),K(navigator.onLine?"⚡ Lead registrado — aparecerá en la Bandeja en segundos":"📴 Guardado local — se enviará al volver la señal","ok"),Ea("lead_rapido",n,{fuente:e.fuente,online:navigator.onLine}),C()});function R(k){return p.textContent=k,p.hidden=!1,!1}}const YR="ventas",Gi=[{id:"cuadrando_cita",label:"Cuadrando cita",prob:.2},{id:"cita_fijada",label:"Cita fijada",prob:.35},{id:"visita_test_drive",label:"Visita / Test drive",prob:.5},{id:"negociacion",label:"Negociación",prob:.7},{id:"apartado",label:"Apartado",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],jo={id:"perdido",label:"Perdido",prob:0,lost:!0},wo={_exit_visita_test_drive:["huboTestDrive"],apartado:["montoApartado","venceEl"],vendido:["tipoPago"],perdido:["lostReason"]},qs=Gi.map(n=>n.id);function mp(n,e){if(n===e)return{ok:!0,needsReason:!1,gates:[]};const t=i=>i===jo.id||qs.includes(i);if(!t(n)||!t(e))return{ok:!1,error:"etapa_desconocida"};if(n==="vendido")return{ok:!1,error:"vendido_es_terminal"};if(e===jo.id)return{ok:!0,needsReason:!1,gates:wo.perdido.slice()};if(n===jo.id)return{ok:!0,needsReason:!0,gates:[]};const r=qs.indexOf(n),s=qs.indexOf(e);if(s>r){const i=[];for(let o=r;o<s;o++){qs[o]==="visita_test_drive"&&i.push(...wo._exit_visita_test_drive);const c=qs[o+1];wo[c]&&i.push(...wo[c])}return{ok:!0,needsReason:!1,gates:[...new Set(i)]}}return{ok:!0,needsReason:!0,gates:[],recalcVehicle:n==="apartado"}}const gp=[{id:"precio",label:"Precio"},{id:"financiacion_negada",label:"Financiación negada"},{id:"compro_en_otro_lado",label:"Compró en otro lado"},{id:"no_responde",label:"No responde"},{id:"cambio_de_opinion",label:"Cambió de opinión"},{id:"error_de_registro",label:"Error de registro"},{id:"otro",label:"Otro motivo"}],si=Gi.filter(n=>!n.won),cy=[...Gi,jo].reduce((n,e)=>(n[e.id]=e,n),{});function Lr(n){return cy[n]||Gi[0]}function ii(n){const e=cy[n];return e?e.prob:0}function nd(n){return Math.round((Number(n.amount)||0)*ii(n.stageId))}function ly(n){return n.reduce((e,t)=>e+(t.status==="open"?nd(t):0),0)}function JR(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function XR(n,e=14){return n.status==="open"&&us(n.lastActivityAt)>e}function ZR(n){const e={};for(const t of si)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}function uy(n,e={}){const t=e.vehicleId!==void 0?e.vehicleId||"":n.vehicleOfInterestId||"",r=Gi[0];return{name:(n.fullName||"Oportunidad")+(t?" · "+(e.vehicleName||t):""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:t||null,vehicleName:e.vehicleName||t||"",sinVehiculoAun:!t,pipelineId:YR,stageId:r.id,stageName:r.label,status:"open",amount:Number(e.amount)||0,currency:"COP",probability:r.prob,weightedAmount:Math.round((Number(e.amount)||0)*r.prob),expectedCloseDate:null,ownerId:e.ownerId!==void 0?e.ownerId:n.ownerId||null,ownerName:e.ownerName!==void 0?e.ownerName:n.ownerName||null,source:n.source||"web",nextStep:e.nota||""}}const bs=()=>new Date().toISOString(),eC=n=>({id:n.id,...n.data()}),vn=()=>z.get().user?z.get().user.uid:null;function tC(n,e,t){return kn(Pe(oe,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:vn(),createdAt:bs(),_version:1})}function nC({pageSize:n=100,onData:e,onError:t}){const r=mt(Pe(oe,"deals"),cs("status","==","open"),xt("lastActivityAt","desc"),bt(n));return yr(r,s=>e(s.docs.map(eC)),s=>t&&t(s))}async function rC(n,e={}){const t=bs(),r=uy(n,e),s=await kn(Pe(oe,"deals"),{...r,lastActivityAt:t,createdAt:t,updatedAt:t,createdBy:vn(),updatedBy:vn(),_version:1});return await Qt(Me(oe,"leads",n.id),{status:"convertido",convertedTo:{dealId:s.id,prevStatus:n.status||"contactado"},lastActivityAt:t,updatedAt:t,updatedBy:vn(),_version:xn(1)}),await tC(s.id,r.contactName,"Oportunidad creada desde lead"),s.id}async function sC(n){return(await Ju(Xu,"anularConversion")({dealId:n})).data}async function dy(){return(await Sn(mt(Pe(oe,"vehiculos"),cs("estado","==","disponible"),bt(60)))).docs.map(e=>{const t=e.data();return{id:e.id,label:[t.marca,t.modelo,t.year].filter(Boolean).join(" "),precio:Number(t.precioOferta||t.precio)||0}}).sort((e,t)=>e.label.localeCompare(t.label,"es"))}async function _p(n,e,t={},r={}){const s=bs(),i=Lr(e);await Qt(Me(oe,"deals",n),{...r,stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:s,updatedAt:s,updatedBy:vn(),_version:xn(1)})}async function iC(n,e,t={}){const r=bs(),s=Math.max(0,Math.round(Number(e)||0));await Qt(Me(oe,"deals",n),{amount:s,weightedAmount:Math.round(s*ii(t.stageId)),updatedAt:r,updatedBy:vn(),_version:xn(1)})}async function oC(n,e={},t={}){const r=bs();await Qt(Me(oe,"deals",n),{...t,status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:r,updatedAt:r,updatedBy:vn(),_version:xn(1)})}async function aC(n,e,t={}){const r=bs();await Qt(Me(oe,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"otro"),lastActivityAt:r,updatedAt:r,updatedBy:vn(),_version:xn(1)})}const qc="__sin_vehiculo__";function hy(n,{onDone:e}={}){const t=performance.now(),r=z.get().team||[],s=u("select",{class:"select"},[u("option",{value:""},["Cargando inventario…"])]),i=u("input",{class:"input",type:"number",min:"0",step:"100000",placeholder:"Valor estimado (COP) *"}),o=u("select",{class:"select"},r.length?r.map(R=>u("option",{value:R.uid,selected:R.uid===n.ownerId?"":void 0},[R.nombre])):[u("option",{value:n.ownerId||""},[n.ownerName||"Yo"])]),c=u("input",{class:"input",type:"text",placeholder:"Nota de contexto (opcional)"}),l=u("div",{class:"login__error",role:"alert",hidden:!0}),h=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),p=u("button",{class:"btn btn--gold",type:"submit"},["🎯 Crear negocio"]),m=u("form",{class:"nl-form"},[u("p",{class:"u-caption u-muted",style:{margin:"0"}},["✓ Hablaste con él · ✓ tiene presupuesto o forma de pago en mente · ✓ busca un carro concreto o una categoría"]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo *"}),s]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Valor estimado (COP) *"}),i]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor responsable *"}),o]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Nota"}),c]),l,u("div",{class:"nl-actions"},[h,p])]),I=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:"Calificar → crear negocio"}),u("span",{class:"u-caption u-faint",text:(n.fullName||"Cliente")+" pasa al Pipeline; el lead queda congelado como histórico."})]),m]),A=u("div",{class:"modal-overlay"},[I]);document.body.appendChild(A);const S=()=>{A.remove(),window.removeEventListener("keydown",P)},P=R=>{R.key==="Escape"&&S()};window.addEventListener("keydown",P),A.addEventListener("mousedown",R=>{R.target===A&&S()}),h.addEventListener("click",S);let C=[];(z.get().mock?Promise.resolve([]):dy()).then(R=>{C=R,s.replaceChildren(u("option",{value:""},["— Elige un vehículo —"]),...R.map(k=>u("option",{value:k.id},[k.label+(k.precio?" · $"+k.precio.toLocaleString("es-CO"):"")])),u("option",{value:qc},["Sin vehículo aún (buscando / retoma)"]))}).catch(()=>{s.replaceChildren(u("option",{value:qc},["Sin vehículo aún"]))}),s.addEventListener("change",()=>{const R=C.find(k=>k.id===s.value);R&&R.precio&&!i.value&&(i.value=String(R.precio))}),m.addEventListener("submit",async R=>{R.preventDefault(),l.hidden=!0;const k=s.value,F=Math.round(Number(i.value)||0);if(!k)return U('Elige un vehículo o marca "Sin vehículo aún".');if(!(F>0))return U("El valor estimado es obligatorio (alimenta el pronóstico).");const x=o.value||n.ownerId;if(!x)return U("El negocio necesita un asesor responsable.");const M=r.find(g=>g.uid===x)?.nombre||n.ownerName||null,E=C.find(g=>g.id===k),w={vehicleId:k===qc?null:k,vehicleName:E?E.label:"",amount:F,ownerId:x,ownerName:M,nota:c.value.trim()};p.disabled=!0,p.textContent="Creando…";try{if(z.get().mock){UR(uy(n,w)),K("🎯 Negocio creado (mock)","ok"),Ea("conversion",t,{mock:!0}),S(),e&&e({mock:!0});return}const g=await rC(n,w);Ea("conversion",t,{}),S(),cC(g,n),e&&e({dealId:g})}catch(g){p.disabled=!1,p.textContent="🎯 Crear negocio",U(g&&g.code==="permission-denied"?"Recarga el portal: tu versión está desactualizada.":"No se pudo crear el negocio. Intenta de nuevo.")}});function U(R){return l.textContent=R,l.hidden=!1,!1}}function cC(n,e){const t=u("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),r=u("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[u("span",{text:`🎯 Negocio creado para ${(e.fullName||"el cliente").split(/\s+/)[0]}`}),t]);document.body.appendChild(r);const s=setTimeout(()=>r.remove(),1e4);t.addEventListener("click",async()=>{clearTimeout(s),t.disabled=!0,t.textContent="Anulando…";try{await sC(n),K("↩ Conversión anulada — el lead volvió a la Bandeja","ok")}catch(i){K("No se pudo anular: "+(i&&i.message||""),"error")}r.remove()})}const sn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',call:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'};function lC(){const n=(t,r)=>{const s=new Date;return s.setDate(s.getDate()+t),s.setHours(r,0,0,0),s.toISOString()},e=new Date(Date.now()+72e5).toISOString();return[{value:{subject:"Llamar al cliente",dueAt:n(1,9)},label:"Llamar mañana 9 am",icon:"📞"},{value:{subject:"Escribir por WhatsApp",dueAt:e},label:"WhatsApp en 2 horas",icon:"💬"},{value:{subject:"Hacer seguimiento",dueAt:n(3,9)},label:"Seguimiento en 3 días",icon:"🔁"},{value:"abrir360",label:"Agendar cita (abrir 360)",icon:"📅"},{value:null,label:"Sin próximo paso",icon:"⊘"}]}function fy(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=$t("crm.edit"),r=z.get().user&&z.get().user.uid,s=u("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),i=u("label",{class:"search","aria-label":"Buscar"},[u("span",{html:sn.search,"aria-hidden":"true"}),u("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),o=u("div",{class:"inbox__filters"}),c=t?u("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["⚡ Lead rápido"]):null;c&&c.addEventListener("click",()=>QR());const l=t?u("button",{class:"btn btn--soft btn--sm",type:"button"},["＋ Completo"]):null;l&&l.addEventListener("click",()=>zR());const h=u("button",{class:"btn btn--soft btn--sm",type:"button"},["📋 Pendientes hoy"]);h.addEventListener("click",()=>M());const p=u("div",{class:"inbox__pendientes",hidden:!0}),m=u("div",{class:"inbox__toolbar"},[i,o,c,l,h]),I=u("div",{class:"inbox__list",role:"list",tabindex:"-1"}),A=u("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),S=u("section",{class:"inbox"},[A,s,m,p,I]);fe(n),n.append(S);const P=i.querySelector("input");P.addEventListener("input",()=>{e.search=P.value,$()});async function C(L,j){if(_(L.id,{ownerId:j?j.uid:null,ownerName:j?j.nombre:null}),z.get().mock){K(j?`Asignado a ${j.nombre}`:"Sin asignar","ok");return}try{await TR(L.id,j),K(j?`Asignado a ${j.nombre}`:"Sin asignar","ok")}catch{K("No se pudo asignar","error")}}async function U(L,j,W={}){if(_(L.id,{status:j,...W,lastActivityAt:new Date().toISOString()}),z.get().mock){K(`Estado → ${$o(j).label}`,"ok");return}try{await AR(L.id,j,L,W),K(`Estado → ${$o(j).label}`,"ok")}catch{K("No se pudo cambiar el estado","error")}}function R(L,j){const W=J_(L.phone,uC(L));if(!W){K("Este lead no tiene teléfono","error");return}window.open(W,"_blank","noopener"),!z.get().mock&&t&&fp(L.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:L.fullName}).catch(()=>{}),F(L,j)}function k(L,j){!z.get().mock&&t&&fp(L.id,{type:"llamada",subject:"Llamada registrada",direction:"outbound",name:L.fullName}).catch(()=>{}),K("📞 Llamada registrada","ok"),F(L,j)}function F(L,j){if(!t)return;const W=performance.now();Et(j||document.body,lC(),ue=>{if(Ea("proximo_paso",W,{preset:ue.label}),!!ue.value){if(ue.value==="abrir360"){gt(L.id);return}if(z.get().mock){K("Próximo paso anotado (mock)","ok");return}SR(L.id,{subject:ue.value.subject,dueAt:ue.value.dueAt,name:L.fullName}).then(()=>K("✓ Próximo paso: "+ue.label,"ok")).catch(()=>K("No se pudo guardar el próximo paso","error"))}},{title:"¿Próximo paso con "+(L.fullName||"el cliente").split(/\s+/)[0]+"?"})}let x=!1;async function M(){x=!x,p.hidden=!x,x&&await E()}async function E(){if(fe(p),z.get().mock){p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Pendientes no disponible en modo demo."}));return}p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"Cargando pendientes…"}));let L=[];try{L=await RR()}catch{fe(p),p.append(u("div",{class:"u-muted u-caption",style:{padding:"10px"},text:"No se pudieron cargar los pendientes."}));return}if(fe(p),p.append(u("div",{class:"inbox__listhead"},[u("span",{class:"u-muted u-caption",text:`📋 ${L.length} pendiente${L.length===1?"":"s"} (hoy y vencidos)`})])),!L.length){p.append(u("div",{class:"u-muted u-caption",style:{padding:"0 10px 10px"},text:"¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí."}));return}const j=Date.now();L.forEach(W=>{const ue=new Date(W.dueAt).getTime()<j,ee=u("button",{class:"btn btn--soft btn--sm",type:"button",title:"Marcar hecho"},["✓ Hecho"]),Z=u("button",{class:"btn btn--ghost btn--sm",type:"button"},["Abrir 360"]),De=u("div",{class:"lead-card",style:{alignItems:"center"}},[u("span",{class:`badge badge--${ue?"danger":"gold"}`,text:ue?"VENCIDO":"HOY"}),u("div",{class:"u-grow"},[u("div",{class:"lead-card__name",text:(W.type==="cita"?"📅 ":"")+W.subject}),u("div",{class:"u-caption u-muted",text:`${W.relatedTo&&W.relatedTo.name?W.relatedTo.name+" · ":""}${nr(W.dueAt)}`})]),u("div",{class:"u-row u-row--tight"},[Z,t?ee:null])]);Z.addEventListener("click",()=>{W.relatedTo&&W.relatedTo.id&&gt(W.relatedTo.id)}),ee.addEventListener("click",async()=>{ee.disabled=!0;try{await CR(W.id),K("✓ Hecho","ok"),await E(),W.relatedTo&&W.relatedTo.id&&F({id:W.relatedTo.id,fullName:W.relatedTo.name||""},h)}catch{ee.disabled=!1,K("No se pudo completar","error")}}),p.append(De)})}function w(L){if(L.status==="convertido"){K("Ya es un negocio: gestiónalo en el Pipeline","info");return}hy(L,{onDone:()=>_(L.id,{status:"convertido"})})}function g(){z.set({leads:e.leads})}function _(L,j){const W=e.leads.findIndex(ue=>ue.id===L);W!==-1&&(e.leads[W]=ry({...e.leads[W],...j}),g(),b())}function b(){T(),v(),$()}function T(){const L=mR(e.leads,r);fe(s),kl.forEach(j=>{const W=e.queue===j.id,ue=u("button",{class:"chip"+(W?" chip--active":""),role:"tab","aria-selected":String(W),type:"button"},[u("span",{"aria-hidden":"true",text:j.icon}),u("span",{text:j.label}),u("span",{class:"chip__count",text:String(L[j.id]||0)})]);ue.addEventListener("click",()=>{e.queue=j.id,b()}),s.append(ue)})}function v(){if(fe(o),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...Cl.map(j=>[j.id,j.label])]}].forEach(j=>{const W=e.filters[j.key],ue=W?(j.items.find(Z=>Z[0]===W)||[,j.label])[1]:j.label,ee=u("button",{class:"chip"+(W?" chip--active":""),type:"button","aria-haspopup":"menu"},[u("span",{text:ue}),u("span",{"aria-hidden":"true",text:"▾"})]);ee.addEventListener("click",()=>{Et(ee,j.items.map(([Z,De])=>({value:Z,label:De,active:Z===W})),Z=>{e.filters[j.key]=Z.value,b()},{title:j.label})}),o.append(ee)}),e.filters.type||e.filters.channel||e.filters.status){const j=u("button",{class:"chip",type:"button"},["✕ Limpiar"]);j.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},b()}),o.append(j)}}function $(){if(e.loading)return tt();if(e.error)return Yt("⚠️","No se pudo cargar",e.error);const{rows:L,hiddenClosed:j}=IR(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(fe(I),!L.length&&!j){const ee=e.search||e.filters.type||e.filters.channel||e.filters.status;I.append(Vt("🗂️",ee?"Sin resultados":"¡Bandeja al día!",ee?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const W=j||e.showClosed?u("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${j} ocultos · ver todos`]):null;W&&W.addEventListener("click",()=>{e.showClosed=!e.showClosed,$()});const ue=u("div",{class:"inbox__listhead"},[u("span",{class:"u-muted u-caption",text:`${L.length} ${L.length===1?"cliente":"clientes"} activos`}),u("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),W]);if(I.append(ue),!L.length&&j){I.append(Vt("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${j} cerrados ocultos).`));return}if(L.forEach(ee=>I.append(se(ee))),e.hasMore&&e.queue==="todo"&&!e.search){const ee=u("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);ee.addEventListener("click",()=>me(ee)),I.append(u("div",{class:"inbox__more"},[ee]))}}function se(L){const j=Gr[L._rating],W=$o(L.status),ue=!!(L.convertedTo&&L.convertedTo.dealId)||L.status==="convertido",ee=vR(L),Z=ee&&ee.state!=="ok"?u("span",{class:`badge badge--${ee.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${ee.mins<120?ee.mins+" min":Bc(ee.mins*6e4)} sin contacto`]):null,De=L._sla,vr=`sla-dot sla-dot--${De.state}`,Ir=De.closed?"Cerrado":De.state==="late"?`SLA vencido hace ${Bc(De.remainingMs)}`:`Responder en ${Bc(De.remainingMs)}`,ws=[L._type.icon+" "+L._type.label,L.sourceDetail,L.vehicleOfInterestId?"🚗 "+L.vehicleOfInterestId:""].filter(Boolean).join(" · "),Dn=u("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":L.id,"aria-label":`${L.fullName}, ${j.label}`},[u("span",{class:vr,title:Ir,"aria-label":Ir}),u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:zi(L.fullName)}),u("div",{class:"lead-card__main u-grow"},[u("div",{class:"lead-card__top"},[u("span",{class:"lead-card__name u-truncate",text:L.fullName}),u("span",{class:`temp ${j.cls}`,title:`Score ${L._score}/100`},[`${j.icon} ${L._score}`])]),u("div",{class:"lead-card__what u-truncate u-muted",text:ws}),u("div",{class:"lead-card__meta u-caption"},[u("span",{class:"lead-card__chan",text:`${L._channel.icon} ${L._channel.label}`}),u("span",{class:"lead-card__dot",text:"·"}),u("span",{text:nr(L.createdAt)}),u("span",{class:"lead-card__dot",text:"·"}),ue?u("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},[L.convertedTo&&L.convertedTo.outcome==="perdido"?"✖ Negocio perdido → Pipeline":L.convertedTo&&L.convertedTo.outcome==="vendido"?"🏆 VENDIDO":`🎯 ${L.convertedTo&&L.convertedTo.stageName||"Convertido"} → Pipeline`]):u("span",{class:`badge badge--${W.badge||""}`.trim(),text:W.label}),L.archived?u("span",{class:"badge",text:"🗄 Archivado"}):null,Z?u("span",{class:"lead-card__dot",text:"·"}):null,Z,L.ownerName?u("span",{class:"lead-card__dot",text:"·"}):null,L.ownerName?u("span",{class:"u-faint",text:"👤 "+L.ownerName}):null]),u("div",{class:"lead-card__nba"},[u("span",{"aria-hidden":"true",text:L._nba.icon}),u("span",{class:"u-muted",text:"Próx: "}),u("strong",{text:L._nba.label})])]),u("div",{class:"lead-card__actions"},[ae("wa",sn.wa,"WhatsApp","btn--wa"),t?ae("call",sn.call,"Registrar llamada"):null,t?ae("assign",sn.person,"Asignar"):null,t&&!ue?ae("status",sn.flag,"Cambiar estado"):null,t&&!ue?ae("convert",sn.convert,"Convertir a oportunidad"):null,t?ae("more",sn.more,"Más acciones"):null,ae("open",sn.expand,"Abrir 360")])]);return Dn.addEventListener("click",Nn=>{const Es=Nn.target.closest("[data-action]");if(Es){We(Es.dataset.action,L,Es);return}gt(L.id)}),Dn.addEventListener("keydown",Nn=>{Nn.key==="Enter"?gt(L.id):Nn.key.toLowerCase()==="w"&&R(L)}),Dn}function ae(L,j,W,ue=""){return u("button",{class:`icon-btn ${ue}`.trim(),type:"button","data-action":L,title:W,"aria-label":W},[u("span",{html:j,"aria-hidden":"true"})])}const ye={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",descartado:"No va: inalcanzable, no califica, spam… (pide la razón)"};function We(L,j,W){if(L==="open")return gt(j.id);if(L==="wa")return R(j,W);if(L==="call")return k(j,W);if(L==="convert")return w(j);if(L==="pipeline"){window.location.hash="#/pipeline";return}if(L==="assign"){const ue=z.get().team||[],ee=[{value:null,label:"Sin asignar",icon:"⊘",active:!j.ownerId},...ue.map(Z=>({value:Z,label:Z.nombre,hint:Z.cargo,icon:"👤",active:j.ownerId===Z.uid}))];return Et(W,ee,Z=>C(j,Z.value),{title:"Asignar a"})}if(L==="status"){if(j.convertedTo&&j.convertedTo.dealId){K("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const ue=Cl.filter(ee=>ee.id!=="convertido").map(ee=>({value:ee.id,label:ee.label,hint:ye[ee.id]||"",active:(j.status||"nuevo")===ee.id}));return Et(W,ue,ee=>{if(ee.value==="descartado"){Et(W,aR.map(Z=>({value:Z.id,label:Z.label})),Z=>U(j,"descartado",{discardReason:Z.value}),{title:"¿Por qué se descarta?"});return}U(j,ee.value)},{title:"Cambiar estado"})}if(L==="more"){const ue=[j.archived?{value:"unarchive",label:"Restaurar de archivados",icon:"↩️"}:{value:"archive",label:"Archivar",icon:"🗄",hint:"Sale de las vistas; reversible"},$t("crm.delete")?{value:"purge",label:"Eliminar definitivo",icon:"🗑",hint:"Solo pruebas/spam — borra TODO su rastro"}:null].filter(Boolean);return Et(W,ue,async ee=>{if(ee.value==="archive"||ee.value==="unarchive"){const Z=ee.value==="archive";if(_(j.id,{archived:Z}),z.get().mock){K(Z?"🗄 Archivado":"↩️ Restaurado","ok");return}try{await PR(j.id,Z),K(Z?"🗄 Archivado":"↩️ Restaurado","ok")}catch{_(j.id,{archived:!Z}),K("No se pudo archivar","error")}return}if(ee.value==="purge"){if(!navigator.onLine){K("Eliminar definitivo necesita señal.","error");return}if(!window.confirm('🗑 ¿Eliminar DEFINITIVAMENTE a "'+j.fullName+`"?

Borra el lead, sus actividades, negocios y su contacto si queda huérfano. Esto es SOLO para pruebas/spam — un cliente real se ARCHIVA.`)||!window.confirm("Última confirmación: esta acción NO se puede deshacer. ¿Eliminar?"))return;if(z.get().mock){K("Eliminado (mock)","ok");return}try{const Z=await kR(j.id);K(`🗑 Eliminado: ${Z.activities} actividades, ${Z.deals} negocios${Z.contactDeleted?", contacto":""}`,"ok")}catch(Z){K(Z.message&&Z.message.includes("Super Admin")?"Solo el Super Admin puede eliminar.":"No se pudo eliminar: "+(Z.message||Z.code),"error")}}},{title:"Más acciones"})}}function gt(L){z.set({detailLeadId:L})}function Vt(L,j,W){return u("div",{class:"state"},[u("div",{class:"state__icon","aria-hidden":"true",text:L}),u("div",{class:"state__title",text:j}),u("div",{class:"state__msg",text:W})])}function Yt(L,j,W){fe(I),I.append(Vt(L,j,W))}function tt(){fe(I);for(let L=0;L<6;L++)I.append(u("div",{class:"lead-card lead-card--skeleton"},[u("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),u("div",{class:"u-grow u-stack",style:{gap:"8px"}},[u("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),u("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function me(L){if(e.cursor){L.disabled=!0,L.textContent="Cargando…";try{const{rows:j,lastDoc:W,hasMore:ue}=await wR({after:e.cursor}),ee=Io(j),Z=new Set(e.leads.map(De=>De.id));e.leads.push(...ee.filter(De=>!Z.has(De.id))),e.cursor=W,e.hasMore=ue,g(),b()}catch{K("No se pudo cargar más","error"),L.disabled=!1,L.textContent="Cargar más"}}}function nt(){if(z.get().mock){z.set({team:iy()}),e.leads=Io(wa()),e.loading=!1,e.hasMore=!1,g(),b(),e.dirtyHandler=()=>{e.leads=Io(wa()),g(),b()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}ER().catch(()=>{}),e.sub=bR({pageSize:40,onData:(L,j)=>{e.leads=Io(L),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=j.hasMore,e.loading=!1,e.error=null,g(),b()},onError:L=>{console.error("[inbox] error de suscripción:",L),e.loading=!1,e.error=L&&L.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",b()}})}return b(),nt(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function uC(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}function dC(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null},t=$t("crm.edit"),r=u("div",{class:"pipeline__bar"}),s=u("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),i=u("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),o=u("section",{class:"pipeline"},[i,r,s]);fe(n),n.append(o);function c(_,b){const T=e.deals.findIndex(v=>v.id===_);T!==-1&&(e.deals[T]={...e.deals[T],...b},z.get().mock&&BR(_,b),P())}async function l(_,b){if(_.stageId===b)return;const T=mp(_.stageId,b);if(!T.ok){K(T.error==="vendido_es_terminal"?"Un negocio vendido no se mueve (anulación = admin).":"Movimiento no válido","error");return}const v=[...T.gates];T.needsReason&&v.push("regressReason");const $=async se=>{const ae=Lr(b),ye=_.stageId;if(c(_.id,{stageId:b,stageName:ae.label,probability:ae.prob,...se,lastActivityAt:new Date().toISOString()}),z.get().mock){K("Etapa → "+ae.label,"ok");return}try{await _p(_.id,b,_,se),p(_,ye,ae.label)}catch(We){c(_.id,{stageId:ye,stageName:Lr(ye).label,probability:ii(ye)}),K(We&&We.code==="permission-denied"?"Movimiento rechazado por las reglas — recarga el portal si tu versión es vieja.":"No se pudo mover","error")}};if(!v.length)return $({});m(_,b,v,$)}let h=null;function p(_,b,T){h&&h.remove();const v=u("button",{class:"btn btn--soft btn--sm",type:"button"},["Deshacer"]),$=u("div",{role:"status",style:{position:"fixed",bottom:"18px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",alignItems:"center",zIndex:"99",padding:"10px 14px",borderRadius:"10px",background:"var(--bg-elev, #1c1a17)",border:"1px solid var(--line, #444)",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}},[u("span",{text:`${(_.contactName||_.name||"Negocio").split(" · ")[0]} → ${T}`}),v]);document.body.appendChild($),h=$;const se=setTimeout(()=>{$.remove(),h===$&&(h=null)},1e4);v.addEventListener("click",async()=>{clearTimeout(se),$.remove(),h===$&&(h=null);const ae=Lr(b);if(c(_.id,{stageId:b,stageName:ae.label,probability:ae.prob}),!z.get().mock)try{await _p(_.id,b,_,{regressReason:"Deshacer (arrastre accidental)"})}catch{K("No se pudo deshacer","error")}})}function m(_,b,T,v){const $={},se=[],ae=(me,nt)=>u("label",{class:"field"},[u("span",{class:"field__label",text:me}),nt]);if(T.includes("huboTestDrive")&&($.huboTestDrive=u("select",{class:"select"},[u("option",{value:"si"},["Sí, hubo test drive"]),u("option",{value:"no"},["No alcanzó a probarlo"])]),se.push(ae("¿Hubo test drive?",$.huboTestDrive))),T.includes("montoApartado")){$.montoApartado=u("input",{class:"input",type:"number",min:"0",step:"50000",placeholder:"500000"});const me=new Date(Date.now()+72*3600*1e3);$.venceEl=u("input",{class:"input",type:"date",value:me.toISOString().slice(0,10)}),se.push(ae("Monto del apartado (COP) *",$.montoApartado),ae("Vence el (default 72h)",$.venceEl))}T.includes("tipoPago")&&($.tipoPago=u("select",{class:"select"},[u("option",{value:"contado"},["De contado"]),u("option",{value:"financiado"},["Financiado"])]),$.estadoCredito=u("select",{class:"select"},[u("option",{value:""},["— Estado del crédito —"]),u("option",{value:"pre_aprobado"},["Pre-aprobado"]),u("option",{value:"en_estudio"},["En estudio"]),u("option",{value:"aprobado"},["Aprobado"]),u("option",{value:"rechazado"},["Rechazado"])]),se.push(ae("Forma de pago *",$.tipoPago),ae("Crédito (si aplica)",$.estadoCredito))),T.includes("lostReason")&&($.lostReason=u("select",{class:"select"},gp.map(me=>u("option",{value:me.id},[me.label]))),se.push(ae("¿Por qué se perdió? *",$.lostReason))),T.includes("regressReason")&&($.regressReason=u("input",{class:"input",type:"text",placeholder:"¿Qué pasó? (obligatorio al retroceder)"}),se.push(ae("Razón del retroceso *",$.regressReason)));const ye=u("div",{class:"login__error",role:"alert",hidden:!0}),We=u("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),gt=u("button",{class:"btn btn--gold",type:"submit"},["Mover a "+Lr(b).label]),Vt=u("form",{class:"nl-form"},[...se,ye,u("div",{class:"nl-actions"},[We,gt])]),Yt=u("div",{class:"modal-overlay"},[u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:Lr(b).label})]),Vt])]);document.body.appendChild(Yt);const tt=()=>Yt.remove();We.addEventListener("click",tt),Yt.addEventListener("mousedown",me=>{me.target===Yt&&tt()}),Vt.addEventListener("submit",me=>{me.preventDefault();const nt={};if($.huboTestDrive&&(nt.huboTestDrive=$.huboTestDrive.value==="si"),$.montoApartado){const L=Math.round(Number($.montoApartado.value)||0);if(!(L>0)){ye.textContent="El monto del apartado es obligatorio.",ye.hidden=!1;return}nt.montoApartado=L,nt.venceEl=new Date(($.venceEl.value||new Date().toISOString().slice(0,10))+"T18:00:00-05:00").toISOString()}if($.tipoPago&&(nt.tipoPago=$.tipoPago.value,$.estadoCredito&&$.estadoCredito.value&&(nt.estadoCredito=$.estadoCredito.value)),$.lostReason&&(nt.lostReason=$.lostReason.value),$.regressReason){const L=$.regressReason.value.trim();if(!L){ye.textContent="Escribe la razón del retroceso.",ye.hidden=!1;return}nt.regressReason=L}tt(),v(nt)})}async function I(_,b){if(c(_.id,{amount:b}),!z.get().mock)try{await iC(_.id,b,_)}catch{K("No se pudo guardar el monto","error")}}async function A(_){const b=mp(_.stageId,"vendido");if(!b.ok){K("Movimiento no válido","error");return}const T=async v=>{if(c(_.id,{status:"won",...v}),z.get().mock){K("🎉 ¡Venta ganada!","ok");return}try{await oC(_.id,_,v),K("🎉 ¡Venta ganada!","ok")}catch{K("No se pudo marcar — revisa los datos requeridos","error")}};if(!b.gates.length)return T({});m(_,"vendido",b.gates,T)}async function S(_,b){if(c(_.id,{status:"lost",lostReason:b}),z.get().mock){K("Marcado perdido","info");return}try{await aC(_.id,b,_),K("Marcado perdido","info")}catch{K("Error","error")}}function P(){if(e.loading)return w();if(e.error)return E("⚠️","No se pudo cargar",e.error);const _=e.deals.filter(T=>T.status==="open");if(C(_),fe(s),!_.length){s.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🎯"}),u("div",{class:"state__title",text:"Embudo vacío"}),u("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const b=ZR(_);si.forEach(T=>{const v=b[T.id]||[],$=v.reduce((ae,ye)=>ae+(Number(ye.amount)||0),0),se=u("div",{class:"pcol","data-stage":T.id},[u("div",{class:"pcol__head"},[u("div",{class:"u-row u-row--tight"},[u("span",{class:"pcol__dot",style:{background:hC(T.id)}}),u("strong",{text:T.label}),u("span",{class:"pcol__count",text:String(v.length)})]),u("span",{class:"u-caption u-faint",text:`${Math.round(T.prob*100)}% · ${Ys($)||"$0"}`})]),u("div",{class:"pcol__drop","data-stage":T.id,role:"list"},v.map(R))]);M(se.querySelector(".pcol__drop"),T.id),s.append(se)})}function C(_){const b=ly(_),T=JR(_);fe(r),r.append(U("Oportunidades",String(_.length)),U("Valor del embudo",Ys(T)||"$0"),U("Forecast ponderado",Ys(b)||"$0",!0))}function U(_,b,T){return u("div",{class:"pstat"+(T?" pstat--hi":"")},[u("span",{class:"u-caption u-faint",text:_}),u("strong",{class:"pstat__v",text:b})])}function R(_){const b=XR(_),T=u("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[_.amount?Ys(_.amount):"+ monto"]),v=u("article",{class:"deal-card"+(b?" is-rotting":""),draggable:"true",tabindex:"0","data-id":_.id,"data-stage":_.stageId,role:"listitem","aria-label":`${_.name}, ${Math.round(ii(_.stageId)*100)}%`},[u("div",{class:"deal-card__top"},[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:zi(_.contactName)}),u("span",{class:"deal-card__name u-grow u-truncate",text:_.name}),b?u("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),_.vehicleName?u("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+_.vehicleName}):null,u("div",{class:"deal-card__row"},[T,u("span",{class:"badge badge--gold",text:`${Math.round(ii(_.stageId)*100)}%`})]),u("div",{class:"deal-card__foot u-caption u-faint"},[u("span",{class:"u-grow u-truncate",text:_.ownerName?"👤 "+_.ownerName:"Sin asesor"}),u("span",{text:nr(_.lastActivityAt)})]),u("div",{class:"deal-card__actions"},t?[k("stage","↔","Mover etapa"),k("won","✓","Marcar ganado"),k("lost","✕","Marcar perdido"),k("open","⤢","Abrir 360")]:[k("open","⤢","Abrir 360")])]);return v.addEventListener("dragstart",$=>{e.dragId=_.id,v.classList.add("is-dragging");try{$.dataTransfer.setData("text/plain",_.id),$.dataTransfer.effectAllowed="move"}catch{}}),v.addEventListener("dragend",()=>{e.dragId=null,v.classList.remove("is-dragging")}),v.addEventListener("click",$=>{const se=$.target.closest("[data-action]");if(se)return F(se.dataset.action,_,se)}),v}function k(_,b,T){return u("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":_,title:T,"aria-label":T,draggable:"false"},[b])}function F(_,b,T){if(_==="open")return z.set({detailLeadId:b.leadId});if(_==="amount")return x(b,T);if(_==="stage")return Et(T,si.map(v=>({value:v.id,label:v.label,hint:Math.round(v.prob*100)+"%",active:v.id===b.stageId})),v=>l(b,v.value),{title:"Mover a etapa"});if(_==="won")return A(b);if(_==="lost")return Et(T,gp.map(v=>({value:v.id,label:v.label})),v=>S(b,v.value),{title:"Motivo de pérdida"})}function x(_,b){const T=u("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:_.amount||"","aria-label":"Monto en COP"});b.replaceWith(T),T.focus(),T.select();const v=()=>{const $=parseInt(String(T.value).replace(/\D/g,""),10)||0;I(_,$)};T.addEventListener("keydown",$=>{$.key==="Enter"?($.preventDefault(),v()):$.key==="Escape"&&P()}),T.addEventListener("blur",v)}function M(_,b){_.addEventListener("dragover",T=>{T.preventDefault(),_.classList.add("is-over"),T.dataTransfer&&(T.dataTransfer.dropEffect="move")}),_.addEventListener("dragleave",()=>_.classList.remove("is-over")),_.addEventListener("drop",T=>{T.preventDefault(),_.classList.remove("is-over");const v=e.dragId||T.dataTransfer&&T.dataTransfer.getData("text/plain"),$=e.deals.find(se=>se.id===v);$&&l($,b)})}function E(_,b,T){fe(s),s.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:_}),u("div",{class:"state__title",text:b}),u("div",{class:"state__msg",text:T})]))}function w(){fe(r),fe(s),si.slice(0,5).forEach(()=>{s.append(u("div",{class:"pcol"},[u("div",{class:"pcol__head"},[u("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),u("div",{class:"pcol__drop"},[1,2].map(()=>u("div",{class:"deal-card",style:{pointerEvents:"none"}},[u("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function g(){if(z.get().mock){e.deals=oy(),e.loading=!1,P();return}e.sub=nC({pageSize:150,onData:_=>{e.deals=_,e.loading=!1,e.error=null,P()},onError:_=>{e.loading=!1,e.error=_&&_.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",P()}})}return P(),g(),function(){e.sub&&e.sub(),e.sub=null}}function hC(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const fC=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],yp=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function Ci(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function py(n,e){const r=(new Date(n,e,1).getDay()+6)%7,s=new Date(n,e+1,0).getDate(),i=[];for(let c=0;c<r;c++)i.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=s;c++)i.push({date:new Date(n,e,c),inMonth:!0});for(;i.length%7!==0;){const c=i[i.length-1].date;i.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const o=[];for(let c=0;c<i.length;c+=7)o.push(i.slice(c,c+7));return o}function pC(n,e){const t=py(n,e),r=t[0][0].date,i=t[t.length-1][6].date,o=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);return{startISO:r.toISOString(),endISO:o.toISOString()}}function mC(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=Ci(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,s)=>new Date(r.dueAt)-new Date(s.dueAt));return e}function vp(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function gC(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const _C=n=>({id:n.id,...n.data()});function yC(n,e,t,r){const s=mt(Pe(oe,"activities"),cs("dueAt",">=",n),cs("dueAt","<",e),xt("dueAt","asc"));return yr(s,i=>t(i.docs.map(_C)),i=>r&&r(i))}async function zn(n,e,t){return(await Ju(Xu,"crmCitaAction")({action:n,solicitudId:e||null,payload:t||{}})).data}async function vC(n){const e=await Is(Me(oe,"solicitudes",n));return e.exists()?{id:e.id,...e.data()}:null}async function my(){const n=await Is(Me(oe,"config","availability"));return n.exists()?n.data():{}}async function gy(){const n=await Is(Me(oe,"config","bookedSlots"));return n.exists()?n.data():{}}const IC=["super_admin","admin","editor","asesor","moderator"];let Eo=null;async function _y(){if(Eo)return Eo;const n=z.get(),e=new Map;try{(await Sn(mt(Pe(oe,"usuarios"),bt(50)))).docs.forEach(r=>{const s=r.data();s.bloqueado!==!0&&(!IC.includes(s.rol)&&!s.roleId||e.set(r.id,{uid:r.id,nombre:s.nombre||s.email||r.id,rol:s.rol||s.roleId||""}))})}catch{try{const r=await Is(Me(oe,"config","crmIntake"));(r.exists()&&Array.isArray(r.data().rotation)?r.data().rotation:[]).forEach(i=>{const o=typeof i=="string"?i:i.uid;o&&e.set(o,{uid:o,nombre:typeof i=="object"&&i.nombre||o,rol:""})})}catch{}}return n.user&&!e.has(n.user.uid)&&e.set(n.user.uid,{uid:n.user.uid,nombre:n.profile&&n.profile.nombre||n.user.email||"Yo",rol:n.profile&&n.profile.rol||""}),Eo=Array.from(e.values()),Eo}const bC={pendiente:"🕐 Pendiente (sin confirmar)",confirmada:"✅ Confirmada",reprogramada:"🔁 Reprogramada (re-confirmar)",completada:"🏁 Completada",cancelada:"✖ Cancelada",no_show:"🚫 No asistió",caducada:"⏳ Caducada (no confirmó)"},wC=["pendiente","confirmada","reprogramada"],EC="";function TC(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function yy(n,e,t){const r=u("div",{class:"modal"},[u("div",{class:"modal__head"},[u("h2",{class:"modal__title",text:n}),e?u("span",{class:"u-caption u-faint",text:e}):null]),...t]),s=u("div",{class:"modal-overlay"},[r]);document.body.appendChild(s);const i=()=>{s.remove(),window.removeEventListener("keydown",o)},o=c=>{c.key==="Escape"&&i()};return window.addEventListener("keydown",o),s.addEventListener("mousedown",c=>{c.target===s&&i()}),{overlay:s,card:r,close:i}}function Bn(n,e){return e?u("div",{class:"cita-row"},[u("span",{class:"cita-row__k u-caption u-muted",text:n}),u("span",{class:"cita-row__v",text:String(e)})]):null}function AC(n,e,t){if(!t)return[];if(Array.isArray(n.blockedDates)&&n.blockedDates.includes(t))return[];const r=new Date(t+"T12:00:00Z").getUTCDay();if(!(Array.isArray(n.days)?n.days:[1,2,3,4,5,6]).includes(r))return[];const s=Array.isArray(e[t])?e[t]:[],i=n.blockedHours&&n.blockedHours[t]||[],o=[],c=n.interval||60;for(let l=(n.startHour??9)*60;l<(n.endHour??17)*60;l+=c){const h=`${String(Math.floor(l/60)).padStart(2,"0")}:${String(l%60).padStart(2,"0")}`;!s.includes(h)&&!i.includes(h)&&o.push(h)}return o}function vy(n,e,{fecha:t,hora:r}={}){const s=u("input",{class:"input",type:"date",min:TC(),value:t||""}),i=u("select",{class:"select"},[u("option",{value:"",text:"— hora —"})]);function o(){const c=AC(n,e,s.value);i.replaceChildren(u("option",{value:"",text:c.length?"— hora —":"Sin horarios ese día"}),...c.map(l=>u("option",{value:l,text:l}))),r&&c.includes(r)&&(i.value=r)}return s.addEventListener("change",o),t&&o(),{dateIn:s,hourSel:i,value:()=>({fecha:s.value,hora:i.value})}}async function Iy(n){const e=u("select",{class:"select"},[u("option",{value:"",text:"Cargando…"})]),t=await _y();e.replaceChildren(u("option",{value:"",text:"— asesor —"}),...t.map(s=>u("option",{value:s.uid,text:s.nombre})));const r=z.get().user;return e.value=n&&t.some(s=>s.uid===n)?n:r&&t.some(s=>s.uid===r.uid)?r.uid:"",e._advisors=t,e}async function by(n){const e=u("select",{class:"select"},[u("option",{value:EC,text:"Sin vehículo asignado"})]);try{const t=await dy();e.append(...t.map(r=>u("option",{value:r.id,text:r.label}))),n&&(e.value=n),e._vehicles=t}catch{e._vehicles=[]}return e}function SC(n,e){const t=String(n.whatsapp||n.telefono||"").replace(/\D/g,"");if(!t)return null;const r=t.length===10&&t.startsWith("3")?"57"+t:t.startsWith("57")?t:String(n.prefijoPais||"57").replace(/\D/g,"")+t,s=`Hola ${n.nombre||""}! Te escribo de ALTORRA CARS por tu cita del ${n.fecha||""} a las ${n.hora||""}`+(n.vehiculo?` para ver el ${n.vehiculo}`:"")+`. Confírmala aquí 👉 ${e}`;return`https://wa.me/${r}?text=${encodeURIComponent(s)}`}async function RC(n,{onLead:e}={}){const t=n.sourceSolicitudId;if(!t)return;if(z.get().mock){K("En demo las citas web no tienen acciones.","info");return}let r;try{r=await vC(t)}catch{r=null}if(!r){K("No se pudo cargar la cita.","error");return}const s=$t("crm.edit"),i=wC.includes(r.estado),o=u("div",{class:"nl-form"}),c=u("div",{class:"login__error",role:"alert",hidden:!0}),l=A=>{c.textContent=A,c.hidden=!1},{close:h}=yy("Cita · "+(r.nombre||"Cliente"),bC[r.estado]||r.estado,[o]);function p(){return u("div",{class:"cita-info"},[Bn("Cuándo",(r.fecha||"")+(r.hora?" · "+r.hora:"")),Bn("Tipo",r.tipo),Bn("Vehículo",r.vehiculo),Bn("Teléfono",(r.prefijoPais||"")+" "+(r.whatsapp||r.telefono||"")),Bn("Asesor",r.assignedToName||r.assignedTo),r.confirmedAt?Bn("Confirmó",(r.confirmedVia||"")+" · "+String(r.confirmedAt).slice(0,16).replace("T"," ")):null,r._tupleConflict?u("div",{class:"cita-conflict",text:"⚠️ El cliente confirmó pero el horario CHOCA con otra cita del asesor — reprograma una de las dos."}):null,r._requiereReagendar?u("div",{class:"cita-conflict",text:"🚗 El carro de esta cita ya no está disponible — ofrece otro o reagenda."}):null,Bn("Notas",r.comentarios||r.mensaje)])}async function m(A,S){c.hidden=!0;try{await S(),K(A,"ok"),h(),e&&r._leadId&&e(r._leadId)}catch(P){l(P&&P.message||"No se pudo completar la acción.")}}async function I(){if(o.replaceChildren(p(),c),!s||!i){if(r._leadId){const R=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Ver cliente (360)"});R.addEventListener("click",()=>{h(),z.set({detailLeadId:r._leadId})}),o.append(R)}return}const A=u("div",{class:"cita-actions"}),S=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"📲 Pedir confirmación por WhatsApp"});S.addEventListener("click",async()=>{S.disabled=!0;try{const R=await zn("getConfirmLink",r.id),k=SC(r,R.url);if(!k){l("La cita no tiene teléfono."),S.disabled=!1;return}window.open(k,"_blank","noopener"),K("Mensaje listo en WhatsApp — el cliente confirma tocando el link.","ok"),S.disabled=!1}catch(R){l(R&&R.message||"No se pudo generar el link."),S.disabled=!1}});const P=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"✓ Confirmar (asignar asesor)"});P.addEventListener("click",async()=>{o.replaceChildren(p(),c,u("p",{class:"u-caption u-muted",text:"Confirmar reserva el bloque del asesor (y del carro si aplica)."}));const R=await Iy(r.assignedTo),k=await by(r.vehicleAssignedId||r.vehiculoId),F=u("select",{class:"select"},[u("option",{value:"manual",text:"El cliente confirmó (llamada/persona)"}),u("option",{value:"whatsapp",text:"El cliente confirmó por WhatsApp"}),u("option",{value:"email",text:"El cliente confirmó por email"})]),x=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"✓ Confirmar cita"}),M=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",I),x.addEventListener("click",()=>{if(!R.value){l("Elige el asesor.");return}const E=(R._advisors||[]).find(g=>g.uid===R.value)?.nombre||null,w=(k._vehicles||[]).find(g=>g.id===k.value);m("✅ Cita confirmada",()=>zn("confirm",r.id,{asesorId:R.value,asesorName:E,canal:F.value,vehicleId:k.value||null,vehicleName:w?w.label:null}))}),o.append(u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor *"}),R]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo"}),k]),u("label",{class:"field"},[u("span",{class:"field__label",text:"¿Cómo confirmó?"}),F]),u("div",{class:"nl-actions"},[M,x]))});const C=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🔁 Reprogramar"});C.addEventListener("click",async()=>{o.replaceChildren(p(),c,u("p",{class:"u-caption u-muted",text:"Al reprogramar, el link viejo de confirmación deja de servir y el cliente debe re-confirmar."}));const[R,k]=await Promise.all([my(),gy()]),F=vy(R,k,{}),x=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"🔁 Mover cita"}),M=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});M.addEventListener("click",I),x.addEventListener("click",()=>{const{fecha:E,hora:w}=F.value();if(!E||!w){l("Elige fecha y hora.");return}m("🔁 Cita reprogramada — pídele re-confirmar por WhatsApp",()=>zn("reschedule",r.id,{fecha:E,hora:w}))}),o.append(u("div",{class:"cfg-row"},[F.dateIn,F.hourSel]),u("div",{class:"nl-actions"},[M,x]))});const U=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"✖ Cancelar cita"});if(U.addEventListener("click",()=>{o.replaceChildren(p(),c);const R=u("input",{class:"input",type:"text",placeholder:"Motivo (le llega al cliente por email)"}),k=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Confirmar cancelación"}),F=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"‹ Volver"});F.addEventListener("click",I),k.addEventListener("click",()=>m("✖ Cita cancelada (cupo liberado)",()=>zn("cancel",r.id,{motivo:R.value.trim()}))),o.append(R,u("div",{class:"nl-actions"},[F,k]))}),A.append(S,P,C,U),r.estado!=="pendiente"){const R=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🏁 Completada"});R.addEventListener("click",()=>m("🏁 Cita completada",()=>zn("complete",r.id)));const k=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🚫 No asistió"});k.addEventListener("click",()=>m("🚫 No-show registrado — mañana 9am te recuerda llamarlo",()=>zn("no_show",r.id))),A.append(R,k)}if(r._leadId){const R=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"👤 Ver cliente (360)"});R.addEventListener("click",()=>{h(),z.set({detailLeadId:r._leadId})}),A.append(R)}o.append(A)}await I()}async function CC(n,{onDone:e}={}){if(z.get().mock){const C=new Date(Date.now()+864e5).toISOString();qR({type:"cita",subject:"Cita con "+(n.fullName||""),dueAt:C,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}),K("📅 Cita agendada (demo)","ok");return}const t=u("div",{class:"login__error",role:"alert",hidden:!0}),r=C=>{t.textContent=C,t.hidden=!1},s=u("div",{class:"nl-form"},[u("p",{class:"u-caption u-muted",text:"La cita manual nace CONFIRMADA y reserva el bloque del asesor (y del carro). Necesitas señal."})]),{close:i}=yy("📅 Agendar cita",n.fullName||"Cliente",[s]),[o,c,l,h]=await Promise.all([my(),gy(),Iy(n.ownerId),by(n.vehicleOfInterestId)]),p=vy(o,c,{}),m=u("select",{class:"select"},[u("option",{value:"visita",text:"Visita al concesionario"}),u("option",{value:"test_drive",text:"Test drive"}),u("option",{value:"llamada",text:"Llamada agendada"})]),I=u("select",{class:"select"},[u("option",{value:"30",text:"30 min"}),u("option",{value:"60",text:"1 hora",selected:""}),u("option",{value:"90",text:"1h 30"})]),A=u("input",{class:"input",type:"text",placeholder:"Nota (opcional)"}),S=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"📅 Crear cita confirmada"}),P=u("button",{class:"btn btn--ghost btn--sm",type:"button",text:"Cancelar"});P.addEventListener("click",i),S.addEventListener("click",async()=>{t.hidden=!0;const{fecha:C,hora:U}=p.value();if(!C||!U)return r("Elige fecha y hora.");if(!l.value)return r("Elige el asesor que atiende.");S.disabled=!0,S.textContent="Creando…";const R=(l._advisors||[]).find(F=>F.uid===l.value)?.nombre||null,k=(h._vehicles||[]).find(F=>F.id===h.value);try{await zn("create",null,{leadId:n.id||null,contactId:n.contactId||null,nombre:n.fullName||"Cliente",telefono:n.phone||null,email:n.email||null,fecha:C,hora:U,duracionMin:parseInt(I.value,10)||60,asesorId:l.value,asesorName:R,vehicleId:h.value||null,vehicleName:k?k.label:null,tipo:m.value,nota:A.value.trim()}),K("📅 Cita creada y confirmada — ya está en la Agenda","ok"),i(),e&&e()}catch(F){S.disabled=!1,S.textContent="📅 Crear cita confirmada",r(F&&F.message||"No se pudo crear la cita.")}}),s.append(u("div",{class:"cfg-row"},[p.dateIn,p.hourSel]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Asesor *"}),l]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Vehículo"}),h]),u("div",{class:"cfg-row"},[m,I]),A,t,u("div",{class:"nl-actions"},[P,S]))}function PC(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=u("div",{class:"agenda__head"}),s=u("p",{class:"u-muted u-caption",style:{margin:"0",padding:"8px 10px",border:"1px dashed var(--line, #444)",borderRadius:"8px"}},["✅ Toca una cita para confirmarla (asignando asesor), pedir confirmación por WhatsApp, reprogramarla o cancelarla. ","Si el cliente no confirma, caduca sola 3h antes y libera el cupo. El ",u("a",{href:"/admin.html#solicitudes",target:"_blank",rel:"noopener",text:"calendario clásico"})," sigue de respaldo hasta el cambio definitivo."]),i=u("div",{class:"agenda__weekdays"},fC.map(C=>u("span",{class:"agenda__wd",text:C}))),o=u("div",{class:"agenda__grid"}),c=u("section",{class:"agenda"},[r,s,i,o]);fe(n),n.append(c);function l(C){let U=t.month+C,R=t.year;U<0?(U=11,R--):U>11&&(U=0,R++),t.year=R,t.month=U,P()}function h(){t.year=e.getFullYear(),t.month=e.getMonth(),P()}function p(){fe(r);const C=u("div",{class:"u-row u-row--tight"},[m("‹","Mes anterior",()=>l(-1)),u("button",{class:"btn btn--soft btn--sm",type:"button",onclick:h},["Hoy"]),m("›","Mes siguiente",()=>l(1))]);r.append(u("h2",{class:"agenda__title",text:`${yp[t.month]} ${t.year}`}),C)}function m(C,U,R){const k=u("button",{class:"icon-btn",type:"button","aria-label":U},[C]);return k.addEventListener("click",R),k}function I(){if(p(),fe(o),t.error){o.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"⚠️"}),u("div",{class:"state__title",text:"No se pudo cargar la agenda"}),u("div",{class:"state__msg",text:t.error})]));return}const C=mC(t.events);py(t.year,t.month).forEach(R=>{R.forEach(k=>{const F=Ci(k.date),x=C[F]||[],M=gC(k.date,e),E=u("div",{class:"agenda__day"+(k.inMonth?"":" is-out")+(M?" is-today":""),role:"gridcell"},[u("div",{class:"agenda__daynum",text:String(k.date.getDate())})]),w=u("div",{class:"agenda__events"});if(x.slice(0,3).forEach(g=>w.append(A(g))),x.length>3){const g=u("button",{class:"agenda__more",type:"button"},[`+${x.length-3} más`]);g.addEventListener("click",()=>Et(g,x.map(_=>({value:_,label:`${vp(_.dueAt)} · ${_.relatedTo?.name||_.subject||"Cita"}`})),_=>S(_.value),{title:`${k.date.getDate()} ${yp[t.month]}`})),w.append(g)}E.append(w),o.append(E)})})}function A(C){const U=C.type==="cita"?C.estadoCita||"pendiente":null,R="agenda__chip"+(U?" agenda__chip--"+U:"")+(C.status==="closed"?" is-closed":""),k=u("button",{class:R,type:"button",title:C.subject||"Cita"},[u("span",{class:"agenda__chip-time",text:vp(C.dueAt)}),u("span",{class:"u-truncate",text:C.relatedTo?.name||C.subject||"Cita"})]);return k.addEventListener("click",()=>S(C)),k}function S(C){if(C.type==="cita"&&C.sourceSolicitudId){RC(C,{onLead:R=>z.set({detailLeadId:R})});return}const U=C.relatedTo&&C.relatedTo.id;U&&z.set({detailLeadId:U})}function P(){if(I(),t.sub&&(t.sub(),t.sub=null),z.get().mock){t.events=$R(),t.loading=!1,I();return}const{startISO:C,endISO:U}=pC(t.year,t.month);t.sub=yC(C,U,R=>{t.events=R,t.loading=!1,t.error=null,I()},R=>{t.loading=!1,t.error=R&&R.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",I()})}return P(),function(){t.sub&&t.sub(),t.sub=null}}const kC=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},ic=n=>n.status==="won",wy=n=>n.status==="lost",rd=n=>n.status==="open",sd=n=>n.status==="convertido";function Ip(n,e){return e?n.filter(t=>kC(t.createdAt)>=e):n.slice()}function xC(n,e){const t=n.length,r=n.filter(sd).length,s=e.filter(ic),i=e.filter(wy),o=s.reduce((l,h)=>l+(Number(h.amount)||0),0),c=s.length+i.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:s.length,lost:i.length,winRate:c?s.length/c:0,wonValue:o}}function DC(n,e){const t=e.filter(rd),r=n.filter(i=>!ds(i.status)),s=r.filter(i=>{const o=Z_(i);return!o.closed&&(o.state==="warn"||o.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:ly(t),slaRisk:s}}function NC(n,e){const t=new Set(e.filter(ic).map(h=>h.id)),r=n.filter(h=>h.status==="contactado"||h.status==="calificado"||h.status==="convertido"),s=n.filter(h=>h.status==="calificado"||h.status==="convertido"),i=n.filter(sd),o=i.filter(h=>h.convertedTo&&t.has(h.convertedTo.dealId)),c=n.length||1,l=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:s.length},{key:"convertidos",label:"Convertidos",count:i.length},{key:"ganados",label:"Ganados",count:o.length}];return l.map((h,p)=>({...h,pctTop:h.count/c,convFromPrev:p===0?1:l[p-1].count?h.count/l[p-1].count:0}))}function VC(n,e){const t={},r=s=>t[s.key]||(t[s.key]={key:s.key,label:s.label,icon:s.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(s=>{const i=r(Si(s));i.leads++,sd(s)&&i.convertidos++}),e.forEach(s=>{const i=r(Si(s));i.deals++,ic(s)&&(i.won++,i.revenue+=Number(s.amount)||0)}),Object.values(t).map(s=>({...s,convRate:s.leads?s.convertidos/s.leads:0})).sort((s,i)=>i.leads-s.leads||i.revenue-s.revenue)}function OC(n){const e=n.filter(rd);return si.map(t=>{const r=e.filter(s=>s.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((s,i)=>s+(Number(i.amount)||0),0),weighted:r.reduce((s,i)=>s+nd(i),0)}})}function LC(n,e,t=[]){const r={},s=(i,o)=>r[i]||(r[i]={ownerId:i,ownerName:o,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(i=>s(i.uid,i.nombre)),n.forEach(i=>{const o=i.ownerId||"_none";s(o,i.ownerName||(o==="_none"?"Sin asignar":o)).leads++}),e.forEach(i=>{const o=i.ownerId||"_none",c=s(o,i.ownerName||(o==="_none"?"Sin asignar":o));c.deals++,ic(i)?c.won++:wy(i)?c.lost++:rd(i)&&(c.pipelineWeighted+=nd(i))}),Object.values(r).filter(i=>i.leads||i.deals).map(i=>({...i,winRate:i.won+i.lost?i.won/(i.won+i.lost):0})).sort((i,o)=>o.won-i.won||o.pipelineWeighted-i.pipelineWeighted||o.leads-i.leads)}function MC(n,e=30){const t=[],r={},s=new Date;for(let i=e-1;i>=0;i--){const o=new Date(s.getFullYear(),s.getMonth(),s.getDate()-i),c={key:Ci(o),date:o,count:0};t.push(c),r[c.key]=c}return n.forEach(i=>{if(!i.createdAt)return;const o=r[Ci(new Date(i.createdAt))];o&&o.count++}),t}const bp=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function FC(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const UC=n=>({id:n.id,...n.data()});async function wp(n,e){return(await Sn(mt(Pe(oe,n),xt("createdAt","desc"),bt(e)))).docs.map(UC)}async function BC({pageSize:n=500}={}){if(z.get().mock)return{leads:wa(),deals:oy(),capped:!1};const[e,t]=await Promise.all([wp("leads",n),wp("deals",n)]);return{leads:e.filter(s=>!s.archived),deals:t,capped:e.length>=n||t.length>=n}}const $C="http://www.w3.org/2000/svg";function jc(n,e={},t=[]){const r=document.createElementNS($C,n);for(const[s,i]of Object.entries(e))i==null||i===!1||r.setAttribute(s,String(i));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function qC(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(s=>Number(s.value)||0)),r=u("div",{class:"reportes__bars",role:"list"});return n.forEach(s=>{const i=s.pct!=null?s.pct:t?(Number(s.value)||0)/t:0,o=Math.max(0,Math.min(100,i*100));r.append(u("div",{class:"reportes__bar",role:"listitem"},[u("span",{class:"reportes__bar-label u-truncate",text:s.label}),u("span",{class:"reportes__bar-track","aria-hidden":"true"},[u("span",{class:"reportes__bar-fill",style:{width:o+"%",background:s.color||"var(--grad-gold)"}})]),u("span",{class:"reportes__bar-val u-mono",text:s.display!=null?s.display:String(s.value)})]))}),r}function jC(n){const s=n.map(S=>Number(S.value)||0),i=Math.max(...s,0),o=Math.max(1,i),c=n.length,l=S=>c<=1?600/2:6+S*(600-2*6)/(c-1),h=S=>134-S/o*(140-2*6),p=n.map((S,P)=>`${l(P).toFixed(1)},${h(s[P]).toFixed(1)}`).join(" "),m=`6,134 ${p} ${594 .toFixed(1)},134`,I=s.reduce((S,P)=>S+P,0),A=(n[s.indexOf(i)]||{}).label||"";return jc("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${I} en total; pico de ${i}${A?" el "+A:""}.`},[jc("polygon",{points:m,fill:"var(--gold-300)",opacity:"0.30"}),jc("polyline",{points:p,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const ut=n=>Math.round((n||0)*100)+"%",on=n=>Ys(n)||"$0",zc=n=>`${n.getDate()}/${n.getMonth()+1}`;function zC(n){const e={leads:[],deals:[],loading:!0,error:null,capped:!1,days:30};let t=!0;const r=u("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),s=u("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),i=u("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);s.addEventListener("click",w),i.addEventListener("click",E);const o=u("div",{class:"reportes__toolbar"},[r,u("div",{class:"u-row u-row--tight"},[s,i])]),c=u("div",{class:"reportes__body"}),l=u("section",{class:"reportes"},[o,c]);fe(n),n.append(l);function h(){fe(r),bp.forEach(g=>{const _=e.days===g.value,b=u("button",{class:"chip",type:"button","aria-pressed":_?"true":"false"},[g.label]);b.addEventListener("click",()=>{e.days=g.value,m()}),r.append(b)})}function p(){const g=FC(e.days),_=Ip(e.leads,g),b=Ip(e.deals,g);return{pLeads:_,pDeals:b,pk:xC(_,b),ck:DC(e.leads,e.deals),fn:NC(_,e.deals),src:VC(_,b),stg:OC(e.deals),own:LC(_,b,z.get().mock?iy():z.get().team||[]),tr:MC(e.leads,30)}}function m(){if(h(),e.loading)return M();if(e.error)return x("⚠️","No se pudieron cargar los reportes",e.error);if(!e.leads.length&&!e.deals.length)return x("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const g=p();fe(c),e.capped&&c.append(u("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),c.append(I("Del período",[A("Leads nuevos",String(g.pk.leadsNew)),A("Tasa de conversión",ut(g.pk.convRate),`${g.pk.convertidos} de ${g.pk.leadsNew}`),A("Win rate",ut(g.pk.winRate),`${g.pk.won} ganadas · ${g.pk.lost} perdidas`),A("Valor ganado",on(g.pk.wonValue),null,!0)]),I("Estado actual",[A("Leads activos",String(g.ck.leadsActive)),A("Oportunidades abiertas",String(g.ck.dealsOpen)),A("Pipeline ponderado",on(g.ck.pipelineWeighted),null,!0),A("SLA en riesgo",String(g.ck.slaRisk),g.ck.slaRisk?"requieren atención":"al día")]),S(g.fn),P(g.src),C(g.stg),U(g.tr),R(g.own))}function I(g,_){return u("div",{class:"reportes__section"},[u("h2",{class:"reportes__sec-title",text:g}),u("div",{class:"reportes__kpis"},_)])}function A(g,_,b,T){return u("div",{class:"reportes__kpi"+(T?" reportes__kpi--hi":"")},[u("span",{class:"reportes__kpi-label u-caption u-faint",text:g}),u("strong",{class:"reportes__kpi-val",text:_}),b?u("span",{class:"reportes__kpi-sub u-caption u-faint",text:b}):null])}function S(g){const _=g.map((b,T)=>({label:b.label,value:b.count,pct:b.pctTop,display:T===0?String(b.count):`${b.count} · ${ut(b.convFromPrev)}`,color:"var(--grad-gold)"}));return k("Embudo de ventas","De lead a venta — dónde se pierde el avance",qC(_,{max:g[0]?g[0].count:1}))}function P(g){const _=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],b=g.map(v=>[`${v.icon||""} ${v.label}`.trim(),String(v.leads),ut(v.convRate),String(v.deals),String(v.won),on(v.revenue)]),T=g.length?null:"Sin leads en el período.";return k("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",F(_,b,T))}function C(g){const _=["Etapa","Prob.","Oport.","Valor","Ponderado"],b=g.map($=>[$.label,ut($.prob),String($.count),on($.value),on($.weighted)]),T=g.reduce(($,se)=>({count:$.count+se.count,value:$.value+se.value,weighted:$.weighted+se.weighted}),{count:0,value:0,weighted:0}),v=["Total","",String(T.count),on(T.value),on(T.weighted)];return k("Forecast por etapa","Pipeline abierto actual (no depende del período)",F(_,b,null,v))}function U(g){const _=g.reduce(($,se)=>$+se.count,0),b=g.map($=>({label:zc($.date),value:$.count})),T=g.length?`${zc(g[0].date)} – ${zc(g[g.length-1].date)}`:"",v=u("div",{class:"reportes__chart"},[jC(b),u("div",{class:"reportes__axis u-caption u-faint"},[u("span",{text:T}),u("span",{text:`${_} leads`})])]);return k("Tendencia de captación","Nuevos leads · últimos 30 días",v)}function R(g){const _=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],b=g.map(v=>[v.ownerName,String(v.leads),String(v.deals),String(v.won),ut(v.winRate),on(v.pipelineWeighted)]),T=g.length?null:"Sin actividad asignada en el período.";return k("Rendimiento del equipo","Por asesor, en el período seleccionado",F(_,b,T))}function k(g,_,b){return u("div",{class:"reportes__section"},[u("div",{class:"reportes__sec-head"},[u("h2",{class:"reportes__sec-title",text:g}),_?u("span",{class:"reportes__sec-cap u-caption u-faint",text:_}):null]),b])}function F(g,_,b,T){if(!_.length&&b)return u("div",{class:"reportes__empty u-caption u-faint",text:b});const v=u("thead",{},[u("tr",{},g.map((ae,ye)=>u("th",{class:ye===0?"":"is-num",scope:"col",text:ae})))]),$=u("tbody",{},_.map(ae=>u("tr",{},ae.map((ye,We)=>u("td",{class:We===0?"":"is-num",text:ye}))))),se=[v,$];return T&&se.push(u("tfoot",{},[u("tr",{},T.map((ae,ye)=>ye===0?u("th",{scope:"row",text:ae}):u("td",{class:"is-num",text:ae})))])),u("div",{class:"reportes__tablewrap"},[u("table",{class:"reportes__table"},se)])}function x(g,_,b){fe(c),c.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:g}),u("div",{class:"state__title",text:_}),u("div",{class:"state__msg",text:b})]))}function M(){fe(c);const g=u("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>u("div",{class:"reportes__kpi"},[u("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));c.append(u("div",{class:"reportes__section"},[g])),c.append(u("div",{class:"reportes__section"},[u("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function E(){if(e.loading||e.error){K("Aún no hay datos para exportar","info");return}const g=p(),_=(bp.find(v=>v.value===e.days)||{}).label||"",b=[],T=v=>{b.push([]),b.push([v])};b.push(["Reporte Altorra CRM"]),b.push(["Período",_]),b.push(["Generado",new Date().toLocaleString("es-CO")]),T("KPIs del período"),b.push(["Métrica","Valor"]),b.push(["Leads nuevos",g.pk.leadsNew]),b.push(["Conversión",ut(g.pk.convRate)]),b.push(["Win rate",ut(g.pk.winRate)]),b.push(["Ganadas",g.pk.won]),b.push(["Perdidas",g.pk.lost]),b.push(["Valor ganado (COP)",g.pk.wonValue]),b.push(["Leads activos (ahora)",g.ck.leadsActive]),b.push(["Oportunidades abiertas (ahora)",g.ck.dealsOpen]),b.push(["Pipeline ponderado COP (ahora)",g.ck.pipelineWeighted]),b.push(["SLA en riesgo (ahora)",g.ck.slaRisk]),T("Embudo"),b.push(["Etapa","Cantidad","Conversión desde anterior"]),g.fn.forEach((v,$)=>b.push([v.label,v.count,$===0?"":ut(v.convFromPrev)])),T("Rendimiento por canal"),b.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),g.src.forEach(v=>b.push([v.label,v.leads,ut(v.convRate),v.deals,v.won,v.revenue])),T("Forecast por etapa (pipeline actual)"),b.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),g.stg.forEach(v=>b.push([v.label,ut(v.prob),v.count,v.value,v.weighted])),T("Rendimiento del equipo"),b.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),g.own.forEach(v=>b.push([v.ownerName,v.leads,v.deals,v.won,ut(v.winRate),v.pipelineWeighted])),KC(`altorra-reportes-${Ci(new Date)}.csv`,HC(b)),K("Reporte exportado","ok")}async function w(){e.loading=!0,e.error=null,m();try{const g=await BC();if(!t)return;e.leads=g.leads,e.deals=g.deals,e.capped=!!g.capped,e.loading=!1}catch(g){if(!t)return;e.loading=!1,e.error=g&&g.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}m()}return w(),function(){t=!1}}function GC(n){const e=n==null?"":String(n);return/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function HC(n){return"\uFEFF"+n.map(e=>e.map(GC).join(",")).join(`\r
`)}function KC(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=n,document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}const Ta=n=>({id:n.id,...n.data()});async function WC({pageSize:n=500}={}){if(z.get().mock)return{contacts:LR(),leads:wa()};const[e,t]=await Promise.all([Sn(mt(Pe(oe,"contacts"),xt("createdAt","desc"),bt(n))).then(r=>r.docs.map(Ta)),Sn(mt(Pe(oe,"leads"),xt("createdAt","desc"),bt(n))).then(r=>r.docs.map(Ta))]);return{contacts:e,leads:t}}async function QC(n){if(!n)return null;const e=await Is(Me(oe,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function YC(n,e,t){const r=mt(Pe(oe,"activities"),cs("relatedTo.id","==",n),xt("createdAt","desc"),bt(50));return yr(r,s=>e(s.docs.map(Ta)),s=>t&&t(s))}function JC(n,e,t){const r=mt(Pe(oe,"contacts",n,"crmNotes"),xt("createdAt","desc"),bt(50));return yr(r,s=>e(s.docs.map(Ta)),s=>t&&t(s))}async function XC(n,e){const t=z.get().user;await kn(Pe(oe,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:z.get().profile&&z.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const ZC=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],eP={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function Ep(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function tP(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=u("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,S()});const s=u("div",{class:"search"},[u("span",{"aria-hidden":"true",text:"🔎"}),r]),i={},o=u("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});ZC.forEach(R=>{const k=u("button",{class:"chip",type:"button","aria-pressed":R.id===e.filter?"true":"false"},[R.label]);k.addEventListener("click",()=>{e.filter=R.id,Object.entries(i).forEach(([F,x])=>x.setAttribute("aria-pressed",F===R.id?"true":"false")),S()}),i[R.id]=k,o.append(k)});const c=u("span",{class:"contactos__count u-caption u-faint"}),l=u("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);l.addEventListener("click",U);const h=u("div",{class:"contactos__toolbar"},[s,o,u("div",{class:"u-row u-row--tight"},[c,l])]),p=u("div",{class:"contactos__list"}),m=u("section",{class:"contactos"},[h,p]);fe(n),n.append(m);function I(){const R={};for(const k of e.leads){if(!k.contactId)continue;const F=R[k.contactId];(!F||new Date(k.createdAt)>new Date(F.createdAt))&&(R[k.contactId]=k)}return R}function A(R){z.set({leads:e.leads,detailLeadId:R.id})}function S(){if(e.loading)return C("⏳","Cargando contactos…","");if(e.error)return C("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return C("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const R=I(),k=ba(e.q),F=e.contacts.filter(x=>e.filter!=="todos"&&Ep(x)!==e.filter?!1:k?ba(`${x.fullName||""} ${x.email||""} ${x.phone||""}`).includes(k):!0);if(c.textContent=`${F.length} de ${e.contacts.length}`,fe(p),!F.length){p.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔍"}),u("div",{class:"state__title",text:"Sin resultados"}),u("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}F.forEach(x=>p.append(P(x,R[x.id])))}function P(R,k){const F=Ep(R),x=eP[F],M=Si(R),E=Number(R.score)>0&&Gr[R.rating],w=u("div",{class:"contact-row__badges"},[u("span",{class:`badge badge--${x.badge}`,text:x.label}),u("span",{class:"badge",text:`${M.icon} ${M.label}`}),E?u("span",{class:`temp ${Gr[R.rating].cls}`,text:`${Gr[R.rating].icon} ${R.score}`}):null]),g=[R.email,R.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",_=Array.isArray(R.tags)&&R.tags.length?u("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+R.tags.join(", ")}):null,b=[u("span",{class:"avatar avatar--sm","aria-hidden":"true",text:zi(R.fullName)}),u("div",{class:"contact-row__main"},[u("span",{class:"contact-row__name u-truncate",text:R.fullName||"Sin nombre"}),u("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:g,text:g}),_]),w,u("span",{class:"contact-row__time u-caption u-faint",text:nr(R.lastActivityAt)})];if(k){const T=u("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${R.fullName||"contacto"}`},b);return T.addEventListener("click",()=>A(k)),T}return u("div",{class:"contact-row contact-row--nolead"},b)}function C(R,k,F){c.textContent="",fe(p),p.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:R}),u("div",{class:"state__title",text:k}),F?u("div",{class:"state__msg",text:F}):null]))}async function U(){e.loading=!0,e.error=null,S();try{const R=await WC();if(!t)return;e.contacts=R.contacts,e.leads=R.leads,e.loading=!1}catch(R){if(!t)return;e.loading=!1,e.error=R&&R.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}S()}return U(),function(){t=!1}}const nP={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function rP(n){let e=null,t=null,r=null,s="resumen",i={lead:null,contact:null,activities:[],notes:[]};const o=u("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=u("div",{class:"detail-overlay",hidden:!0},[o]);n.append(c),c.addEventListener("mousedown",x=>{x.target===c&&l()}),window.addEventListener("keydown",x=>{x.key==="Escape"&&e&&l()}),z.subscribe(x=>{x.detailLeadId!==e&&p(x.detailLeadId)});function l(){z.set({detailLeadId:null})}function h(){t&&(t(),t=null),r&&(r(),r=null)}function p(x){if(h(),e=x,!x){c.hidden=!0,document.body.classList.remove("has-detail"),fe(o);return}s="resumen",c.hidden=!1,document.body.classList.add("has-detail"),m(x)}function m(x){const M=(z.get().leads||[]).find(E=>E.id===x);i={lead:M||null,contact:null,activities:[],notes:[]},I(),M&&(z.get().mock?(i.contact=OR(M.contactId),i.activities=VR(x),i.notes=pp(M.contactId),I()):(QC(M.contactId).then(E=>{i.contact=E,I()}).catch(()=>{}),t=YC(x,E=>{i.activities=E,I()},()=>{}),M.contactId&&(r=JC(M.contactId,E=>{i.notes=E,I()},()=>{}))))}function I(){fe(o);const x=i.lead;if(!x){o.append(A(null)),o.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔍"}),u("div",{class:"state__title",text:"Lead no disponible"}),u("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}o.append(A(x)),o.append(S());const M=u("div",{class:"detail__body"});s==="resumen"?M.append(P(x)):s==="comms"?M.append(U()):s==="score"?M.append(R(x)):s==="notas"&&M.append(k(x)),o.append(M)}function A(x){const M=u("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(M.addEventListener("click",l),!x)return u("div",{class:"detail__header"},[u("div",{class:"u-grow"}),M]);const E=F(x),w=Gr[E.rating],g=$o(x.status),_=sc(x),b=Si(x),T=u("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);T.addEventListener("click",()=>{const ae=J_(x.phone,`Hola ${String(x.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!ae)return K("Sin teléfono","error");window.open(ae,"_blank","noopener")});const v=$t("crm.edit"),$=v&&x.status!=="convertido"?u("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;$&&$.addEventListener("click",()=>hy(x,{}));const se=v?u("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;return se&&se.addEventListener("click",()=>CC(x,{})),u("div",{class:"detail__header"},[u("div",{class:"u-row u-grow",style:{minWidth:"0"}},[u("span",{class:"avatar","aria-hidden":"true",text:zi(x.fullName)}),u("div",{class:"u-grow",style:{minWidth:"0"}},[u("h2",{class:"detail__name u-truncate",text:x.fullName}),u("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[u("span",{class:`temp ${w.cls}`,text:`${w.icon} ${w.label} · ${E.score}`}),u("span",{class:`badge badge--${g.badge||""}`.trim(),text:g.label}),u("span",{class:"badge",text:`${_.icon} ${_.label}`}),u("span",{class:"badge",text:`${b.icon} ${b.label}`})])])]),u("div",{class:"u-row u-row--tight"},[$,se,T,M])])}function S(){const x=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],M=u("div",{class:"detail__tabs",role:"tablist"});return x.forEach(([E,w])=>{const g=u("button",{class:"detail__tab"+(s===E?" is-active":""),role:"tab","aria-selected":String(s===E),type:"button"},[w]);g.addEventListener("click",()=>{s=E,I()}),M.append(g)}),M}function P(x){const M=i.contact,E=M&&M.consent?M.consent:null,w=[["Correo",x.email||"—"],["Teléfono",x.phone||"—"],["Interés",x.sourceDetail||"—"],["Vehículo",x.vehicleOfInterestId||"—"],["Asesor",x.ownerName||"Sin asignar"],["Origen",x.source||"—"],["Capturado",KS(x.createdAt)],["Última actividad",nr(x.lastActivityAt)]],g=ny(x,{score:F(x).score});return u("div",{class:"u-stack"},[u("div",{class:"detail-card detail-card--nba"},[u("span",{class:"detail-card__icon","aria-hidden":"true",text:g.icon}),u("div",{class:"u-grow"},[u("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),u("strong",{text:g.label}),u("div",{class:"u-caption u-faint",text:g.reason})])]),u("dl",{class:"kv"},w.flatMap(([_,b])=>[u("dt",{text:_}),u("dd",{class:"u-truncate",text:b})])),E?C(E):null])}function C(x){const M=E=>E?"✅":"⛔";return u("div",{class:"detail-card"},[u("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),u("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[u("span",{class:"u-caption",text:`${M(x.email)} Email`}),u("span",{class:"u-caption",text:`${M(x.whatsapp)} WhatsApp`}),u("span",{class:"u-caption",text:`${M(x.calls)} Llamadas`})]),u("div",{class:"u-caption u-faint",text:`Política ${x.policyVersion||"v1"} · origen ${x.source||"—"}`})])}function U(){if(!i.activities.length)return u("div",{class:"state"},[u("div",{class:"state__icon",text:"📭"}),u("div",{class:"state__title",text:"Sin comunicaciones"}),u("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const x=u("ol",{class:"timeline"});return i.activities.forEach(M=>{x.append(u("li",{class:"timeline__item timeline__item--"+(M.direction||"inbound")},[u("span",{class:"timeline__icon","aria-hidden":"true",text:nP[M.type]||"•"}),u("div",{class:"u-grow"},[u("div",{class:"u-spread"},[u("strong",{class:"u-truncate",text:M.subject||M.type||"Actividad"}),u("span",{class:"u-caption u-faint",text:nr(M.createdAt)})]),M.body?u("div",{class:"u-caption u-muted",text:M.body}):null])]))}),x}function R(x){const M=F(x),E=Gr[M.rating],w=Object.keys(hp).map(g=>{const _=Math.round((M.factors[g]||0)*100);return u("div",{class:"factor"},[u("div",{class:"u-spread u-caption"},[u("span",{text:hp[g]}),u("span",{class:"u-faint",text:`${_}% · peso ${Math.round(pR[g]*100)}%`})]),u("div",{class:"factor__track"},[u("div",{class:"factor__fill",style:{width:_+"%"}})])])});return u("div",{class:"u-stack"},[u("div",{class:"scorehero"},[u("div",{class:`scorehero__num ${E.cls}`,text:String(M.score)}),u("div",{class:"u-stack",style:{gap:"2px"}},[u("strong",{text:`${E.icon} ${E.label}`}),u("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),u("div",{class:"u-stack",style:{gap:"10px"}},w)])}function k(x){const M=$t("crm.edit")||$t("crm.create"),E=u("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),w=u("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);w.addEventListener("click",async()=>{const _=E.value.trim();if(!_)return;w.disabled=!0;const b={body:_,authorName:"Tú",createdAt:new Date().toISOString()};try{z.get().mock?(MR(x.contactId,b),i.notes=pp(x.contactId),I()):(await XC(x.contactId,_),E.value=""),K("Nota agregada","ok")}catch{K("No se pudo guardar la nota","error")}finally{w.disabled=!1}});const g=u("div",{class:"u-stack"});return i.notes.length||g.append(u("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),i.notes.forEach(_=>g.append(u("div",{class:"detail-card"},[u("div",{class:"u-caption u-muted",text:_.body}),u("div",{class:"u-caption u-faint",text:`${_.authorName||"Asesor"} · ${nr(_.createdAt)}`})]))),u("div",{class:"u-stack"},[M?u("div",{class:"u-stack",style:{gap:"8px"}},[E,u("div",{class:"u-row",style:{justifyContent:"flex-end"}},[w])]):null,g])}function F(x){return ty(x,i.activities||[],i.contact)}}const Ey={days:[1,2,3,4,5,6],startHour:9,endHour:17,interval:60,maxPerSlot:1,bufferMin:15,blockedDates:[],blockedDateLabels:{},blockedHours:{}},sP=[["2026-01-01","Año Nuevo"],["2026-01-12","Reyes Magos"],["2026-03-23","San José"],["2026-04-02","Jueves Santo"],["2026-04-03","Viernes Santo"],["2026-05-01","Día del Trabajo"],["2026-05-18","Ascensión"],["2026-06-08","Corpus Christi"],["2026-06-15","Sagrado Corazón"],["2026-06-29","San Pedro y San Pablo"],["2026-07-20","Independencia"],["2026-08-07","Batalla de Boyacá"],["2026-08-17","Asunción de la Virgen"],["2026-10-12","Día de la Raza"],["2026-11-02","Todos los Santos"],["2026-11-16","Independencia de Cartagena"],["2026-12-08","Inmaculada Concepción"],["2026-12-25","Navidad"]],Ty=()=>Me(oe,"config","availability"),Ay=()=>Me(oe,"crm_config","advisorOverrides");function iP(n,e){return yr(Ty(),t=>{n({...Ey,...t.exists()?t.data():{}})},t=>e&&e(t))}async function oP(n,e){await x_(Ty(),{...n,updatedAt:new Date().toISOString(),updatedBy:e||null},{merge:!0})}function aP(n,e){return yr(Ay(),t=>{n(t.exists()&&t.data().overrides||{})},t=>e&&e(t))}async function cP(n,e){await x_(Ay(),{overrides:n,updatedAt:new Date().toISOString(),updatedBy:e||null})}const lP=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],To=()=>{const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function uP(n){const e={av:{...Ey},overrides:{},advisors:[],sub:null,subOv:null,loaded:!1},t=$t("calendar.config"),r=u("section",{class:"cfg"});if(fe(n),n.append(r),!t){r.append(u("div",{class:"state"},[u("div",{class:"state__icon",text:"🔒"}),u("div",{class:"state__title",text:"Sin permiso"}),u("div",{class:"state__msg",text:"Solo quien administra la disponibilidad (permiso calendar.config) puede editar esto."})]));return}async function s(I,A){if(z.get().mock){Object.assign(e.av,I),m(),K(A+" (demo)","ok");return}try{await oP(I,z.get().user&&z.get().user.uid),K(A,"ok")}catch(S){K("No se pudo guardar: "+(S.message||S.code),"error")}}function i(){const I=e.av,A=lP.map((x,M)=>{const E=u("input",{type:"checkbox"});return E.checked=(I.days||[]).includes(M),E.dataset.dow=String(M),u("label",{class:"cfg-day"},[E,u("span",{text:x})])}),S=(x,M,E)=>{const w=u("select",{class:"select"});for(let g=M;g<=E;g++)w.append(u("option",{value:String(g),text:String(g).padStart(2,"0")+":00"}));return w.value=String(x),w},P=S(I.startHour,6,20),C=S(I.endHour,7,21),U=u("select",{class:"select"},[u("option",{value:"30",text:"Cada 30 min"}),u("option",{value:"60",text:"Cada hora"})]);U.value=String(I.interval||60);const R=u("input",{class:"input",type:"number",min:"1",max:"5",value:String(I.maxPerSlot||1)}),k=u("input",{class:"input",type:"number",min:"0",max:"60",step:"5",value:String(I.bufferMin!=null?I.bufferMin:15)}),F=u("button",{class:"btn btn--gold btn--sm",type:"button",text:"Guardar horario"});return F.addEventListener("click",()=>{const x=A.map(w=>w.querySelector("input")).filter(w=>w.checked).map(w=>parseInt(w.dataset.dow,10)).sort(),M=parseInt(P.value,10),E=parseInt(C.value,10);if(!x.length){K("Elige al menos un día.","error");return}if(M>=E){K("La hora de cierre debe ser mayor que la de apertura.","error");return}s({days:x,startHour:M,endHour:E,interval:parseInt(U.value,10)||60,maxPerSlot:Math.max(1,parseInt(R.value,10)||1),bufferMin:Math.max(0,parseInt(k.value,10)||0)},"✓ Horario guardado")}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"🕘 Horario de atención"}),u("p",{class:"u-caption u-muted",text:"Esto es lo que el cliente ve en la web al pedir cita — los cambios aplican al instante."}),u("div",{class:"cfg-days"},A),u("div",{class:"cfg-grid"},[u("label",{class:"field"},[u("span",{class:"field__label",text:"Abre"}),P]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Cierra"}),C]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Citas web"}),U]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Citas por horario"}),R]),u("label",{class:"field"},[u("span",{class:"field__label",text:"Colchón (min)"}),k])]),F])}function o(){const I=e.av,A=I.blockedDateLabels||{},S=To(),P=u("div",{class:"cfg-chips"}),C=(I.blockedDates||[]).slice().sort();C.length||P.append(u("span",{class:"u-caption u-muted",text:"Sin fechas bloqueadas — la web ofrece todos los días laborales."})),C.forEach(x=>{const M=x<S,E=u("button",{class:"cfg-chip__x",type:"button","aria-label":"Quitar",text:"✕"});E.addEventListener("click",()=>{const w=C.filter(g=>g!==x);s({blockedDates:w,blockedDateLabels:{[x]:tp()}},"✓ Fecha desbloqueada: "+x)}),P.append(u("span",{class:"cfg-chip"+(M?" is-past":"")},[u("span",{text:x+(A[x]?" · "+A[x]:"")}),E]))});const U=u("input",{class:"input",type:"date",min:S}),R=u("input",{class:"input",type:"text",placeholder:"Motivo (opcional)",maxlength:"40"}),k=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear fecha"});k.addEventListener("click",()=>{const x=U.value;if(!x){K("Elige una fecha.","error");return}if(C.includes(x)){K("Esa fecha ya está bloqueada.","error");return}const M={...A};R.value.trim()&&(M[x]=R.value.trim()),s({blockedDates:[...C,x].sort(),blockedDateLabels:M},"✓ Fecha bloqueada: "+x)});const F=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"🇨🇴 Cargar festivos de Colombia 2026"});return F.addEventListener("click",()=>{const x=sP.filter(([E])=>E>=S&&!C.includes(E));if(!x.length){K("Los festivos que faltan de 2026 ya están cargados.","ok");return}const M={...A};x.forEach(([E,w])=>{M[E]=w}),s({blockedDates:[...C,...x.map(([E])=>E)].sort(),blockedDateLabels:M},`✓ ${x.length} festivo(s) bloqueados`)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"📅 Fechas bloqueadas (festivos y cierres)"}),u("p",{class:"u-caption u-muted",text:"En estas fechas la web NO ofrece citas. Las fechas pasadas se limpian solas cada madrugada."}),P,u("div",{class:"cfg-row"},[U,R,k]),F])}function c(){const I=e.av,A=[],S=I.interval||60;for(let P=I.startHour*60;P<I.endHour*60;P+=S)A.push(String(Math.floor(P/60)).padStart(2,"0")+":"+String(P%60).padStart(2,"0"));return A}function l(){const A=e.av.blockedHours||{},S=u("div",{class:"cfg-bh"}),P=Object.entries(A).sort(([k],[F])=>k.localeCompare(F));P.length||S.append(u("span",{class:"u-caption u-muted",text:"Sin horas bloqueadas."})),P.forEach(([k,F])=>{const x=(F||[]).slice().sort().map(M=>{const E=u("button",{class:"cfg-chip__x",type:"button",text:"✕"});return E.addEventListener("click",()=>{const w=(A[k]||[]).filter(g=>g!==M);s({blockedHours:{[k]:w.length?w:tp()}},`✓ ${k} ${M} desbloqueada`)}),u("span",{class:"cfg-chip"},[u("span",{text:M}),E])});S.append(u("div",{class:"cfg-bh__day"},[u("strong",{text:k}),u("div",{class:"cfg-chips"},x)]))});const C=u("input",{class:"input",type:"date",min:To()}),U=u("select",{class:"select"},c().map(k=>u("option",{value:k,text:k}))),R=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Bloquear hora"});return R.addEventListener("click",()=>{const k=C.value,F=U.value;if(!k){K("Elige una fecha.","error");return}const x=A[k]||[];if(x.includes(F)){K("Esa hora ya está bloqueada.","error");return}s({blockedHours:{...A,[k]:[...x,F].sort()}},`✓ ${k} ${F} bloqueada`)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"⏰ Horas bloqueadas (un horario puntual)"}),S,u("div",{class:"cfg-row"},[C,U,R])])}async function h(I,A){if(z.get().mock){e.overrides=I,m(),K(A+" (demo)","ok");return}try{await cP(I,z.get().user&&z.get().user.uid),K(A,"ok")}catch(S){K("No se pudo guardar: "+(S.message||S.code),"error")}}function p(){const I=e.overrides||{},A=u("div",{class:"cfg-advisors"});return e.advisors.length||A.append(u("span",{class:"u-caption u-muted",text:"Cargando asesores…"})),e.advisors.forEach(S=>{const P=I[S.uid],C=u("div",{class:"cfg-advisor"});if(C.append(u("div",{class:"cfg-advisor__name"},[u("strong",{text:S.nombre}),P?u("span",{class:"cfg-advisor__badge is-off",text:`🏖 ${P.reason||"ausente"} · ${P.from} → ${P.to}`}):u("span",{class:"cfg-advisor__badge",text:"✅ disponible"})])),P){const U=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Quitar ausencia"});U.addEventListener("click",()=>{const R={...I};delete R[S.uid],h(R,`✓ ${S.nombre} disponible de nuevo`)}),C.append(U)}else{const U=u("input",{class:"input",type:"date",min:To()}),R=u("input",{class:"input",type:"date",min:To()}),k=u("select",{class:"select"},[u("option",{value:"vacaciones",text:"Vacaciones"}),u("option",{value:"incapacidad",text:"Incapacidad"}),u("option",{value:"otro",text:"Otro"})]),F=u("button",{class:"btn btn--soft btn--sm",type:"button",text:"Marcar ausencia"});F.addEventListener("click",()=>{if(!U.value||!R.value||U.value>R.value){K("Revisa el rango de fechas.","error");return}h({...I,[S.uid]:{name:S.nombre,from:U.value,to:R.value,reason:k.value}},`✓ Ausencia de ${S.nombre} registrada`)}),C.append(u("div",{class:"cfg-row"},[U,R,k,F]))}A.append(C)}),u("div",{class:"cfg-card"},[u("h3",{class:"cfg-card__title",text:"👤 Excepciones por asesor"}),u("p",{class:"u-caption u-muted",text:"Un asesor ausente no recibe leads de la rotación ni citas confirmadas a su nombre en esas fechas."}),A])}function m(){fe(r),r.append(u("div",{class:"cfg-cols"},[i(),o()]),u("div",{class:"cfg-cols"},[l(),p()]))}return z.get().mock?(e.loaded=!0,m()):(e.sub=iP(I=>{e.av=I,e.loaded=!0,m()},()=>{K("No se pudo cargar la configuración.","error")}),e.subOv=aP(I=>{e.overrides=I,e.loaded&&m()},()=>{})),_y().then(I=>{e.advisors=I,e.loaded&&m()}),function(){e.sub&&e.sub(),e.sub=null,e.subOv&&e.subOv(),e.subOv=null}}const Sy=document.getElementById("app");nv();const dP=new URLSearchParams(location.search).get("mock")==="1",hP={bandeja:fy,pipeline:dC,agenda:PC,reportes:zC,contactos:tP,config:uP};let Ao=null,Hr=null,Xn=null,Nl=null,zo=null;function Tp(n){if(!Hr||n===Nl)return;Xn&&(Xn(),Xn=null),z.get().detailLeadId&&z.set({detailLeadId:null}),Xn=(hP[n]||fy)(Hr.outlet)||null,Hr.setActive(n),Nl=n}function fP(){Hr=YS(Sy),rP(Hr.detailRoot),Tp(W_()),zo=zS(Tp)}function pP(){Xn&&(Xn(),Xn=null),zo&&(zo(),zo=null),Hr=null,Nl=null}function mP(n){n.ready&&(n.user&&Ao!=="app"?(Ao="app",fP()):!n.user&&Ao!=="login"&&(pP(),Ao="login",n.detailLeadId&&z.set({detailLeadId:null}),JS(Sy)))}z.subscribe(mP);dP?z.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):MS();
