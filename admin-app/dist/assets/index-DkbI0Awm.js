(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function pm(n){let e={...n};const t=new Set;function r(){return e}function s(a){const c=typeof a=="function"?a(e):a;c&&(e={...e,...c},t.forEach(u=>u(e)))}function i(a){return t.add(a),()=>t.delete(a)}return{get:r,set:s,subscribe:i}}const q=pm({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),kh="altorra-crm-theme";function mm(){let n=localStorage.getItem(kh);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,q.set({theme:n})}function gm(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(kh,n),q.set({theme:n}),n}var Ul={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},_m=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Ca={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,g=i>>2,v=(i&3)<<4|c>>4;let T=(c&15)<<2|d>>6,R=d&63;u||(R=64,a||(T=64)),r.push(t[g],t[v],t[T],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Nh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):_m(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const v=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||v==null)throw new ym;const T=i<<2|c>>4;if(r.push(T),d!==64){const R=c<<4&240|d>>2;if(r.push(R),v!==64){const D=d<<6&192|v;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ym extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const vm=function(n){const e=Nh(n);return Ca.encodeByteArray(e,!0)},ti=function(n){return vm(n).replace(/\./g,"")},Dh=function(n){try{return Ca.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Vh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const wm=()=>Vh().__FIREBASE_DEFAULTS__,Em=()=>{if(typeof process>"u"||typeof Ul>"u")return;const n=Ul.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Im=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Dh(n[1]);return e&&JSON.parse(e)},Pi=()=>{try{return wm()||Em()||Im()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Oh=n=>{var e,t;return(t=(e=Pi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Tm=n=>{const e=Oh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Lh=()=>{var n;return(n=Pi())===null||n===void 0?void 0:n.config},xh=n=>{var e;return(e=Pi())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Am(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ti(JSON.stringify(t)),ti(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Me())}function Rm(){var n;const e=(n=Pi())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Sm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Cm(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Pm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function km(){const n=Me();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Nm(){return!Rm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Pa(){try{return typeof indexedDB=="object"}catch{return!1}}function Dm(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm="FirebaseError";class Tt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Vm,Object.setPrototypeOf(this,Tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Yn.prototype.create)}}class Yn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Om(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new Tt(s,c,r)}}function Om(n,e){return n.replace(Lm,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Lm=/\{\$([^}]+)}/g;function xm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ni(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if($l(i)&&$l(a)){if(!ni(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function $l(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function wr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Er(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Mm(n,e){const t=new Fm(n,e);return t.subscribe.bind(t)}class Fm{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Um(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Vo),s.error===void 0&&(s.error=Vo),s.complete===void 0&&(s.complete=Vo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Um(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Vo(){}/**
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
 */const $m=1e3,Bm=2,jm=4*60*60*1e3,qm=.5;function zm(n,e=$m,t=Bm){const r=e*Math.pow(t,n),s=Math.round(qm*r*(Math.random()-.5)*2);return Math.min(jm,r+s)}/**
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
 */function me(n){return n&&n._delegate?n._delegate:n}class gt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const nn="[DEFAULT]";/**
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
 */class Hm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Or;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gm(e))try{this.getOrInitializeService({instanceIdentifier:nn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=nn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=nn){return this.instances.has(e)}getOptions(e=nn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Wm(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=nn){return this.component?this.component.multipleInstances?e:nn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Wm(n){return n===nn?void 0:n}function Gm(n){return n.instantiationMode==="EAGER"}/**
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
 */class Km{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Hm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Z||(Z={}));const Qm={debug:Z.DEBUG,verbose:Z.VERBOSE,info:Z.INFO,warn:Z.WARN,error:Z.ERROR,silent:Z.SILENT},Ym=Z.INFO,Jm={[Z.DEBUG]:"log",[Z.VERBOSE]:"log",[Z.INFO]:"info",[Z.WARN]:"warn",[Z.ERROR]:"error"},Xm=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Jm[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ki{constructor(e){this.name=e,this._logLevel=Ym,this._logHandler=Xm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Qm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Z.DEBUG,...e),this._logHandler(this,Z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Z.VERBOSE,...e),this._logHandler(this,Z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Z.INFO,...e),this._logHandler(this,Z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Z.WARN,...e),this._logHandler(this,Z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Z.ERROR,...e),this._logHandler(this,Z.ERROR,...e)}}const Zm=(n,e)=>e.some(t=>n instanceof t);let Bl,jl;function eg(){return Bl||(Bl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function tg(){return jl||(jl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Mh=new WeakMap,Qo=new WeakMap,Fh=new WeakMap,Oo=new WeakMap,ka=new WeakMap;function ng(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Ot(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Mh.set(t,n)}).catch(()=>{}),ka.set(e,n),e}function rg(n){if(Qo.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Qo.set(n,e)}let Yo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Qo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Fh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ot(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function sg(n){Yo=n(Yo)}function ig(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Lo(this),e,...t);return Fh.set(r,e.sort?e.sort():[e]),Ot(r)}:tg().includes(n)?function(...e){return n.apply(Lo(this),e),Ot(Mh.get(this))}:function(...e){return Ot(n.apply(Lo(this),e))}}function og(n){return typeof n=="function"?ig(n):(n instanceof IDBTransaction&&rg(n),Zm(n,eg())?new Proxy(n,Yo):n)}function Ot(n){if(n instanceof IDBRequest)return ng(n);if(Oo.has(n))return Oo.get(n);const e=og(n);return e!==n&&(Oo.set(n,e),ka.set(e,n)),e}const Lo=n=>ka.get(n);function ag(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=Ot(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Ot(a.result),u.oldVersion,u.newVersion,Ot(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const cg=["get","getKey","getAll","getAllKeys","count"],lg=["put","add","delete","clear"],xo=new Map;function ql(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(xo.get(e))return xo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=lg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||cg.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),s&&u.done]))[0]};return xo.set(e,i),i}sg(n=>({...n,get:(e,t,r)=>ql(e,t)||n.get(e,t,r),has:(e,t)=>!!ql(e,t)||n.has(e,t)}));/**
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
 */class ug{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(hg(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function hg(n){const e=n.getComponent();return e?.type==="VERSION"}const Jo="@firebase/app",zl="0.11.0";/**
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
 */const _t=new ki("@firebase/app"),dg="@firebase/app-compat",fg="@firebase/analytics-compat",pg="@firebase/analytics",mg="@firebase/app-check-compat",gg="@firebase/app-check",_g="@firebase/auth",yg="@firebase/auth-compat",vg="@firebase/database",wg="@firebase/data-connect",Eg="@firebase/database-compat",Ig="@firebase/functions",Tg="@firebase/functions-compat",Ag="@firebase/installations",bg="@firebase/installations-compat",Rg="@firebase/messaging",Sg="@firebase/messaging-compat",Cg="@firebase/performance",Pg="@firebase/performance-compat",kg="@firebase/remote-config",Ng="@firebase/remote-config-compat",Dg="@firebase/storage",Vg="@firebase/storage-compat",Og="@firebase/firestore",Lg="@firebase/vertexai",xg="@firebase/firestore-compat",Mg="firebase",Fg="11.3.0";/**
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
 */const Xo="[DEFAULT]",Ug={[Jo]:"fire-core",[dg]:"fire-core-compat",[pg]:"fire-analytics",[fg]:"fire-analytics-compat",[gg]:"fire-app-check",[mg]:"fire-app-check-compat",[_g]:"fire-auth",[yg]:"fire-auth-compat",[vg]:"fire-rtdb",[wg]:"fire-data-connect",[Eg]:"fire-rtdb-compat",[Ig]:"fire-fn",[Tg]:"fire-fn-compat",[Ag]:"fire-iid",[bg]:"fire-iid-compat",[Rg]:"fire-fcm",[Sg]:"fire-fcm-compat",[Cg]:"fire-perf",[Pg]:"fire-perf-compat",[kg]:"fire-rc",[Ng]:"fire-rc-compat",[Dg]:"fire-gcs",[Vg]:"fire-gcs-compat",[Og]:"fire-fst",[xg]:"fire-fst-compat",[Lg]:"fire-vertex","fire-js":"fire-js",[Mg]:"fire-js-all"};/**
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
 */const ri=new Map,$g=new Map,Zo=new Map;function Hl(n,e){try{n.container.addComponent(e)}catch(t){_t.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function $t(n){const e=n.name;if(Zo.has(e))return _t.debug(`There were multiple attempts to register component ${e}.`),!1;Zo.set(e,n);for(const t of ri.values())Hl(t,n);for(const t of $g.values())Hl(t,n);return!0}function es(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Qe(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Bg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Lt=new Yn("app","Firebase",Bg);/**
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
 */class jg{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new gt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Lt.create("app-deleted",{appName:this._name})}}/**
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
 */const Jn=Fg;function Uh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Xo,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Lt.create("bad-app-name",{appName:String(s)});if(t||(t=Lh()),!t)throw Lt.create("no-options");const i=ri.get(s);if(i){if(ni(t,i.options)&&ni(r,i.config))return i;throw Lt.create("duplicate-app",{appName:s})}const a=new Km(s);for(const u of Zo.values())a.addComponent(u);const c=new jg(t,r,a);return ri.set(s,c),c}function Na(n=Xo){const e=ri.get(n);if(!e&&n===Xo&&Lh())return Uh();if(!e)throw Lt.create("no-app",{appName:n});return e}function pt(n,e,t){var r;let s=(r=Ug[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_t.warn(c.join(" "));return}$t(new gt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const qg="firebase-heartbeat-database",zg=1,Lr="firebase-heartbeat-store";let Mo=null;function $h(){return Mo||(Mo=ag(qg,zg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Lr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Lt.create("idb-open",{originalErrorMessage:n.message})})),Mo}async function Hg(n){try{const t=(await $h()).transaction(Lr),r=await t.objectStore(Lr).get(Bh(n));return await t.done,r}catch(e){if(e instanceof Tt)_t.warn(e.message);else{const t=Lt.create("idb-get",{originalErrorMessage:e?.message});_t.warn(t.message)}}}async function Wl(n,e){try{const r=(await $h()).transaction(Lr,"readwrite");await r.objectStore(Lr).put(e,Bh(n)),await r.done}catch(t){if(t instanceof Tt)_t.warn(t.message);else{const r=Lt.create("idb-set",{originalErrorMessage:t?.message});_t.warn(r.message)}}}function Bh(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Wg=1024,Gg=30;class Kg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Yg(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Gl();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Gg){const a=Jg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){_t.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Gl(),{heartbeatsToSend:r,unsentEntries:s}=Qg(this._heartbeatsCache.heartbeats),i=ti(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return _t.warn(t),""}}}function Gl(){return new Date().toISOString().substring(0,10)}function Qg(n,e=Wg){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Kl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Kl(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Yg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Pa()?Dm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Hg(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Kl(n){return ti(JSON.stringify({version:2,heartbeats:n})).length}function Jg(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Xg(n){$t(new gt("platform-logger",e=>new ug(e),"PRIVATE")),$t(new gt("heartbeat",e=>new Kg(e),"PRIVATE")),pt(Jo,zl,n),pt(Jo,zl,"esm2017"),pt("fire-js","")}Xg("");function Da(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function jh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Zg=jh,qh=new Yn("auth","Firebase",jh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si=new ki("@firebase/auth");function e_(n,...e){si.logLevel<=Z.WARN&&si.warn(`Auth (${Jn}): ${n}`,...e)}function js(n,...e){si.logLevel<=Z.ERROR&&si.error(`Auth (${Jn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(n,...e){throw Va(n,...e)}function et(n,...e){return Va(n,...e)}function zh(n,e,t){const r=Object.assign(Object.assign({},Zg()),{[e]:t});return new Yn("auth","Firebase",r).create(e,{appName:n.name})}function xt(n){return zh(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Va(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return qh.create(n,...e)}function G(n,e,...t){if(!n)throw Va(e,...t)}function ht(n){const e="INTERNAL ASSERTION FAILED: "+n;throw js(e),new Error(e)}function yt(n,e){n||ht(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ea(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function t_(){return Ql()==="http:"||Ql()==="https:"}function Ql(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(t_()||Cm()||"connection"in navigator)?navigator.onLine:!0}function r_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e,t){this.shortDelay=e,this.longDelay=t,yt(t>e,"Short delay should be less than long delay!"),this.isMobile=bm()||Pm()}get(){return n_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oa(n,e){yt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i_=new ts(3e4,6e4);function fn(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Kt(n,e,t,r,s={}){return Wh(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Zr(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},i);return Sm()||(d.referrerPolicy="no-referrer"),Hh.fetch()(Gh(n,n.config.apiHost,t,c),d)})}async function Wh(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},s_),e);try{const s=new a_(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw ks(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ks(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw ks(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw ks(n,"user-disabled",a);const g=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw zh(n,g,d);Je(n,g)}}catch(s){if(s instanceof Tt)throw s;Je(n,"network-request-failed",{message:String(s)})}}async function Ni(n,e,t,r,s={}){const i=await Kt(n,e,t,r,s);return"mfaPendingCredential"in i&&Je(n,"multi-factor-auth-required",{_serverResponse:i}),i}function Gh(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Oa(n.config,s):`${n.config.apiScheme}://${s}`}function o_(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class a_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(et(this.auth,"network-request-failed")),i_.get())})}}function ks(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=et(n,e,r);return s.customData._tokenResponse=t,s}function Yl(n){return n!==void 0&&n.enterprise!==void 0}class c_{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return o_(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function l_(n,e){return Kt(n,"GET","/v2/recaptchaConfig",fn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function u_(n,e){return Kt(n,"POST","/v1/accounts:delete",e)}async function Kh(n,e){return Kt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function h_(n,e=!1){const t=me(n),r=await t.getIdToken(e),s=La(r);G(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:Sr(Fo(s.auth_time)),issuedAtTime:Sr(Fo(s.iat)),expirationTime:Sr(Fo(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Fo(n){return Number(n)*1e3}function La(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return js("JWT malformed, contained fewer than 3 sections"),null;try{const s=Dh(t);return s?JSON.parse(s):(js("Failed to decode base64 JWT payload"),null)}catch(s){return js("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Jl(n){const e=La(n);return G(e,"internal-error"),G(typeof e.exp<"u","internal-error"),G(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Tt&&d_(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function d_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Sr(this.lastLoginAt),this.creationTime=Sr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ii(n){var e;const t=n.auth,r=await n.getIdToken(),s=await xr(n,Kh(t,{idToken:r}));G(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Qh(i.providerUserInfo):[],c=m_(n.providerData,a),u=n.isAnonymous,d=!(n.email&&i.passwordHash)&&!c?.length,g=u?d:!1,v={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new ta(i.createdAt,i.lastLoginAt),isAnonymous:g};Object.assign(n,v)}async function p_(n){const e=me(n);await ii(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function m_(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Qh(n){return n.map(e=>{var{providerId:t}=e,r=Da(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function g_(n,e){const t=await Wh(n,{},async()=>{const r=Zr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=Gh(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Hh.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function __(n,e){return Kt(n,"POST","/v2/accounts:revokeToken",fn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){G(e.idToken,"internal-error"),G(typeof e.idToken<"u","internal-error"),G(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Jl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){G(e.length!==0,"internal-error");const t=Jl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(G(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await g_(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Nn;return r&&(G(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(G(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(G(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Nn,this.toJSON())}_performRefresh(){return ht("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(n,e){G(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class dt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Da(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new f_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new ta(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await xr(this,this.stsTokenManager.getToken(this.auth,e));return G(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return h_(this,e)}reload(){return p_(this)}_assign(e){this!==e&&(G(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new dt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){G(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ii(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(xt(this.auth));const e=await this.getIdToken();return await xr(this,u_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,c,u,d,g;const v=(r=t.displayName)!==null&&r!==void 0?r:void 0,T=(s=t.email)!==null&&s!==void 0?s:void 0,R=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,D=(a=t.photoURL)!==null&&a!==void 0?a:void 0,P=(c=t.tenantId)!==null&&c!==void 0?c:void 0,k=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,B=(d=t.createdAt)!==null&&d!==void 0?d:void 0,L=(g=t.lastLoginAt)!==null&&g!==void 0?g:void 0,{uid:j,emailVerified:H,isAnonymous:x,providerData:S,stsTokenManager:w}=t;G(j&&w,e,"internal-error");const _=Nn.fromJSON(this.name,w);G(typeof j=="string",e,"internal-error"),St(v,e.name),St(T,e.name),G(typeof H=="boolean",e,"internal-error"),G(typeof x=="boolean",e,"internal-error"),St(R,e.name),St(D,e.name),St(P,e.name),St(k,e.name),St(B,e.name),St(L,e.name);const p=new dt({uid:j,auth:e,email:T,emailVerified:H,displayName:v,isAnonymous:x,photoURL:D,phoneNumber:R,tenantId:P,stsTokenManager:_,createdAt:B,lastLoginAt:L});return S&&Array.isArray(S)&&(p.providerData=S.map(I=>Object.assign({},I))),k&&(p._redirectEventId=k),p}static async _fromIdTokenResponse(e,t,r=!1){const s=new Nn;s.updateFromServerResponse(t);const i=new dt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ii(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];G(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Qh(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new Nn;c.updateFromIdToken(r);const u=new dt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ta(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl=new Map;function ft(n){yt(n instanceof Function,"Expected a class definition");let e=Xl.get(n);return e?(yt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Xl.set(n,e),e)}/**
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
 */class Yh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Yh.type="NONE";const Zl=Yh;/**
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
 */function qs(n,e,t){return`firebase:${n}:${e}:${t}`}class Dn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=qs(this.userKey,s.apiKey,i),this.fullPersistenceKey=qs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?dt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Dn(ft(Zl),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||ft(Zl);const a=qs(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const g=await d._get(a);if(g){const v=dt._fromJSON(e,g);d!==i&&(c=v),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Dn(i,e,r):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new Dn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ed(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Jh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(nd(e))return"Blackberry";if(rd(e))return"Webos";if(Xh(e))return"Safari";if((e.includes("chrome/")||Zh(e))&&!e.includes("edge/"))return"Chrome";if(td(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Jh(n=Me()){return/firefox\//i.test(n)}function Xh(n=Me()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Zh(n=Me()){return/crios\//i.test(n)}function ed(n=Me()){return/iemobile/i.test(n)}function td(n=Me()){return/android/i.test(n)}function nd(n=Me()){return/blackberry/i.test(n)}function rd(n=Me()){return/webos/i.test(n)}function xa(n=Me()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function y_(n=Me()){var e;return xa(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function v_(){return km()&&document.documentMode===10}function sd(n=Me()){return xa(n)||td(n)||rd(n)||nd(n)||/windows phone/i.test(n)||ed(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function id(n,e=[]){let t;switch(n){case"Browser":t=eu(Me());break;case"Worker":t=`${eu(Me())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Jn}/${r}`}/**
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
 */class w_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function E_(n,e={}){return Kt(n,"GET","/v2/passwordPolicy",fn(n,e))}/**
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
 */const I_=6;class T_{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:I_,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new tu(this),this.idTokenSubscription=new tu(this),this.beforeStateQueue=new w_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=qh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ft(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Dn.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Kh(this,{idToken:e}),r=await dt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Qe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&u?.user&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return G(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ii(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=r_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(xt(this));const t=e?me(e):null;return t&&G(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&G(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(xt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(xt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ft(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await E_(this),t=new T_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Yn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await __(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ft(e)||this._popupRedirectResolver;G(t,this,"argument-error"),this.redirectPersistenceManager=await Dn.create(this,[ft(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(G(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return G(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=id(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&e_(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Xn(n){return me(n)}class tu{constructor(e){this.auth=e,this.observer=null,this.addObserver=Mm(t=>this.observer=t)}get next(){return G(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Di={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function b_(n){Di=n}function od(n){return Di.loadJS(n)}function R_(){return Di.recaptchaEnterpriseScript}function S_(){return Di.gapiScript}function C_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class P_{constructor(){this.enterprise=new k_}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class k_{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const N_="recaptcha-enterprise",ad="NO_RECAPTCHA";class D_{constructor(e){this.type=N_,this.auth=Xn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{l_(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new c_(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(u=>{c(u)})})}function s(i,a,c){const u=window.grecaptcha;Yl(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(ad)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new P_().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&Yl(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=R_();u.length!==0&&(u+=c),od(u).then(()=>{s(c,i,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function nu(n,e,t,r=!1,s=!1){const i=new D_(n);let a;if(s)a=ad;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function ru(n,e,t,r,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await nu(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await nu(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V_(n,e){const t=es(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ni(i,e??{}))return s;Je(s,"already-initialized")}return t.initialize({options:e})}function O_(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(ft);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function L_(n,e,t){const r=Xn(n);G(r._canInitEmulator,r,"emulator-config-failed"),G(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=cd(e),{host:a,port:c}=x_(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),M_()}function cd(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function x_(n){const e=cd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:su(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:su(a)}}}function su(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function M_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ht("not implemented")}_getIdTokenResponse(e){return ht("not implemented")}_linkToIdToken(e,t){return ht("not implemented")}_getReauthenticationResolver(e){return ht("not implemented")}}async function F_(n,e){return Kt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U_(n,e){return Ni(n,"POST","/v1/accounts:signInWithPassword",fn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $_(n,e){return Ni(n,"POST","/v1/accounts:signInWithEmailLink",fn(n,e))}async function B_(n,e){return Ni(n,"POST","/v1/accounts:signInWithEmailLink",fn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr extends Ma{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Mr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Mr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ru(e,t,"signInWithPassword",U_);case"emailLink":return $_(e,{email:this._email,oobCode:this._password});default:Je(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ru(e,r,"signUpPassword",F_);case"emailLink":return B_(e,{idToken:t,email:this._email,oobCode:this._password});default:Je(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vn(n,e){return Ni(n,"POST","/v1/accounts:signInWithIdp",fn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j_="http://localhost";class ln extends Ma{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ln(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Da(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new ln(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Vn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Vn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Vn(e,t)}buildRequest(){const e={requestUri:j_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Zr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q_(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function z_(n){const e=wr(Er(n)).link,t=e?wr(Er(e)).deep_link_id:null,r=wr(Er(n)).deep_link_id;return(r?wr(Er(r)).link:null)||r||t||e||n}class Fa{constructor(e){var t,r,s,i,a,c;const u=wr(Er(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,g=(r=u.oobCode)!==null&&r!==void 0?r:null,v=q_((s=u.mode)!==null&&s!==void 0?s:null);G(d&&g&&v,"argument-error"),this.apiKey=d,this.operation=v,this.code=g,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(a=u.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=z_(e);try{return new Fa(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(){this.providerId=Zn.PROVIDER_ID}static credential(e,t){return Mr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Fa.parseLink(t);return G(r,"argument-error"),Mr._fromEmailAndCode(e,r.code,r.tenantId)}}Zn.PROVIDER_ID="password";Zn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Zn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ns extends ld{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt extends ns{constructor(){super("facebook.com")}static credential(e){return ln._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Pt.credential(e.oauthAccessToken)}catch{return null}}}Pt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Pt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt extends ns{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ln._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return kt.credential(t,r)}catch{return null}}}kt.GOOGLE_SIGN_IN_METHOD="google.com";kt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt extends ns{constructor(){super("github.com")}static credential(e){return ln._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Nt.credential(e.oauthAccessToken)}catch{return null}}}Nt.GITHUB_SIGN_IN_METHOD="github.com";Nt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends ns{constructor(){super("twitter.com")}static credential(e,t){return ln._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Dt.credential(t,r)}catch{return null}}}Dt.TWITTER_SIGN_IN_METHOD="twitter.com";Dt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await dt._fromIdTokenResponse(e,r,s),a=iu(r);return new $n({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=iu(r);return new $n({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function iu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi extends Tt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,oi.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new oi(e,t,r,s)}}function ud(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?oi._fromErrorAndOperation(n,i,e,r):i})}async function H_(n,e,t=!1){const r=await xr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return $n._forOperation(n,"link",r)}/**
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
 */async function W_(n,e,t=!1){const{auth:r}=n;if(Qe(r.app))return Promise.reject(xt(r));const s="reauthenticate";try{const i=await xr(n,ud(r,s,e,n),t);G(i.idToken,r,"internal-error");const a=La(i.idToken);G(a,r,"internal-error");const{sub:c}=a;return G(n.uid===c,r,"user-mismatch"),$n._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Je(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hd(n,e,t=!1){if(Qe(n.app))return Promise.reject(xt(n));const r="signIn",s=await ud(n,r,e),i=await $n._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function G_(n,e){return hd(Xn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K_(n){const e=Xn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Q_(n,e,t){return Qe(n.app)?Promise.reject(xt(n)):G_(me(n),Zn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&K_(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y_(n,e){return me(n).setPersistence(e)}function J_(n,e,t,r){return me(n).onIdTokenChanged(e,t,r)}function X_(n,e,t){return me(n).beforeAuthStateChanged(e,t)}function Z_(n,e,t,r){return me(n).onAuthStateChanged(e,t,r)}function ey(n){return me(n).signOut()}const ai="__sak";/**
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
 */class dd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ai,"1"),this.storage.removeItem(ai),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty=1e3,ny=10;class fd extends dd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=sd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);v_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ny):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},ty)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}fd.type="LOCAL";const pd=fd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md extends dd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}md.type="SESSION";const gd=md;/**
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
 */function ry(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Vi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Vi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async d=>d(t.origin,i)),u=await ry(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Vi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class sy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const d=Ua("",20);s.port1.start();const g=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(v){const T=v;if(T.data.eventId===d)switch(T.data.status){case"ack":clearTimeout(g),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(T.data.response);break;default:clearTimeout(g),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(){return window}function iy(n){tt().location.href=n}/**
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
 */function _d(){return typeof tt().WorkerGlobalScope<"u"&&typeof tt().importScripts=="function"}async function oy(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ay(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function cy(){return _d()?self:null}/**
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
 */const yd="firebaseLocalStorageDb",ly=1,ci="firebaseLocalStorage",vd="fbase_key";class rs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Oi(n,e){return n.transaction([ci],e?"readwrite":"readonly").objectStore(ci)}function uy(){const n=indexedDB.deleteDatabase(yd);return new rs(n).toPromise()}function na(){const n=indexedDB.open(yd,ly);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ci,{keyPath:vd})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ci)?e(r):(r.close(),await uy(),e(await na()))})})}async function ou(n,e,t){const r=Oi(n,!0).put({[vd]:e,value:t});return new rs(r).toPromise()}async function hy(n,e){const t=Oi(n,!1).get(e),r=await new rs(t).toPromise();return r===void 0?null:r.value}function au(n,e){const t=Oi(n,!0).delete(e);return new rs(t).toPromise()}const dy=800,fy=3;class wd{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await na(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>fy)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _d()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Vi._getInstance(cy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await oy(),!this.activeServiceWorker)return;this.sender=new sy(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ay()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await na();return await ou(e,ai,"1"),await au(e,ai),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ou(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>hy(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>au(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Oi(s,!1).getAll();return new rs(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),dy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}wd.type="LOCAL";const py=wd;new ts(3e4,6e4);/**
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
 */function my(n,e){return e?ft(e):(G(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class $a extends Ma{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function gy(n){return hd(n.auth,new $a(n),n.bypassAuthState)}function _y(n){const{auth:e,user:t}=n;return G(t,e,"internal-error"),W_(t,new $a(n),n.bypassAuthState)}async function yy(n){const{auth:e,user:t}=n;return G(t,e,"internal-error"),H_(t,new $a(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return gy;case"linkViaPopup":case"linkViaRedirect":return yy;case"reauthViaPopup":case"reauthViaRedirect":return _y;default:Je(this.auth,"internal-error")}}resolve(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vy=new ts(2e3,1e4);class Pn extends Ed{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Pn.currentPopupAction&&Pn.currentPopupAction.cancel(),Pn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return G(e,this.auth,"internal-error"),e}async onExecution(){yt(this.filter.length===1,"Popup operations only handle one event");const e=Ua();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(et(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(et(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Pn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(et(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,vy.get())};e()}}Pn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wy="pendingRedirect",zs=new Map;class Ey extends Ed{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=zs.get(this.auth._key());if(!e){try{const r=await Iy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}zs.set(this.auth._key(),e)}return this.bypassAuthState||zs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Iy(n,e){const t=by(e),r=Ay(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Ty(n,e){zs.set(n._key(),e)}function Ay(n){return ft(n._redirectPersistence)}function by(n){return qs(wy,n.config.apiKey,n.name)}async function Ry(n,e,t=!1){if(Qe(n.app))return Promise.reject(xt(n));const r=Xn(n),s=my(r,e),a=await new Ey(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sy=10*60*1e3;class Cy{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Py(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Id(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(et(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Sy&&this.cachedEventUids.clear(),this.cachedEventUids.has(cu(e))}saveEventToCache(e){this.cachedEventUids.add(cu(e)),this.lastProcessedEventTime=Date.now()}}function cu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Id({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Py(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Id(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ky(n,e={}){return Kt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Dy=/^https?/;async function Vy(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ky(n);for(const t of e)try{if(Oy(t))return}catch{}Je(n,"unauthorized-domain")}function Oy(n){const e=ea(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Dy.test(t))return!1;if(Ny.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Ly=new ts(3e4,6e4);function lu(){const n=tt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function xy(n){return new Promise((e,t)=>{var r,s,i;function a(){lu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{lu(),t(et(n,"network-request-failed"))},timeout:Ly.get()})}if(!((s=(r=tt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=tt().gapi)===null||i===void 0)&&i.load)a();else{const c=C_("iframefcb");return tt()[c]=()=>{gapi.load?a():t(et(n,"network-request-failed"))},od(`${S_()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Hs=null,e})}let Hs=null;function My(n){return Hs=Hs||xy(n),Hs}/**
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
 */const Fy=new ts(5e3,15e3),Uy="__/auth/iframe",$y="emulator/auth/iframe",By={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},jy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function qy(n){const e=n.config;G(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Oa(e,$y):`https://${n.config.authDomain}/${Uy}`,r={apiKey:e.apiKey,appName:n.name,v:Jn},s=jy.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Zr(r).slice(1)}`}async function zy(n){const e=await My(n),t=tt().gapi;return G(t,n,"internal-error"),e.open({where:document.body,url:qy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:By,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=et(n,"network-request-failed"),c=tt().setTimeout(()=>{i(a)},Fy.get());function u(){tt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const Hy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Wy=500,Gy=600,Ky="_blank",Qy="http://localhost";class uu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Yy(n,e,t,r=Wy,s=Gy){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},Hy),{width:r.toString(),height:s.toString(),top:i,left:a}),d=Me().toLowerCase();t&&(c=Zh(d)?Ky:t),Jh(d)&&(e=e||Qy,u.scrollbars="yes");const g=Object.entries(u).reduce((T,[R,D])=>`${T}${R}=${D},`,"");if(y_(d)&&c!=="_self")return Jy(e||"",c),new uu(null);const v=window.open(e||"",c,g);G(v,n,"popup-blocked");try{v.focus()}catch{}return new uu(v)}function Jy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Xy="__/auth/handler",Zy="emulator/auth/handler",ev=encodeURIComponent("fac");async function hu(n,e,t,r,s,i){G(n.config.authDomain,n,"auth-domain-config-required"),G(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Jn,eventId:s};if(e instanceof ld){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",xm(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[g,v]of Object.entries({}))a[g]=v}if(e instanceof ns){const g=e.getScopes().filter(v=>v!=="");g.length>0&&(a.scopes=g.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const g of Object.keys(c))c[g]===void 0&&delete c[g];const u=await n._getAppCheckToken(),d=u?`#${ev}=${encodeURIComponent(u)}`:"";return`${tv(n)}?${Zr(c).slice(1)}${d}`}function tv({config:n}){return n.emulator?Oa(n,Zy):`https://${n.authDomain}/${Xy}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo="webStorageSupport";class nv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=gd,this._completeRedirectFn=Ry,this._overrideRedirectResult=Ty}async _openPopup(e,t,r,s){var i;yt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await hu(e,t,r,ea(),s);return Yy(e,a,Ua())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await hu(e,t,r,ea(),s);return iy(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(yt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await zy(e),r=new Cy(e);return t.register("authEvent",s=>(G(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Uo,{type:Uo},s=>{var i;const a=(i=s?.[0])===null||i===void 0?void 0:i[Uo];a!==void 0&&t(!!a),Je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Vy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return sd()||Xh()||xa()}}const rv=nv;var du="@firebase/auth",fu="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){G(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ov(n){$t(new gt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;G(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:id(n)},d=new A_(r,s,i,u);return O_(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),$t(new gt("auth-internal",e=>{const t=Xn(e.getProvider("auth").getImmediate());return(r=>new sv(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),pt(du,fu,iv(n)),pt(du,fu,"esm2017")}/**
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
 */const av=5*60,cv=xh("authIdTokenMaxAge")||av;let pu=null;const lv=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>cv)return;const s=t?.token;pu!==s&&(pu=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function uv(n=Na()){const e=es(n,"auth");if(e.isInitialized())return e.getImmediate();const t=V_(n,{popupRedirectResolver:rv,persistence:[py,pd,gd]}),r=xh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=lv(i.toString());X_(t,a,()=>a(t.currentUser)),J_(t,c=>a(c))}}const s=Oh("auth");return s&&L_(t,`http://${s}`),t}function hv(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}b_({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=et("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",hv().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ov("Browser");var mu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Mt,Td;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,_){function p(){}p.prototype=_.prototype,w.D=_.prototype,w.prototype=new p,w.prototype.constructor=w,w.C=function(I,E,A){for(var y=Array(arguments.length-2),X=2;X<arguments.length;X++)y[X-2]=arguments[X];return _.prototype[E].apply(I,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,p){p||(p=0);var I=Array(16);if(typeof _=="string")for(var E=0;16>E;++E)I[E]=_.charCodeAt(p++)|_.charCodeAt(p++)<<8|_.charCodeAt(p++)<<16|_.charCodeAt(p++)<<24;else for(E=0;16>E;++E)I[E]=_[p++]|_[p++]<<8|_[p++]<<16|_[p++]<<24;_=w.g[0],p=w.g[1],E=w.g[2];var A=w.g[3],y=_+(A^p&(E^A))+I[0]+3614090360&4294967295;_=p+(y<<7&4294967295|y>>>25),y=A+(E^_&(p^E))+I[1]+3905402710&4294967295,A=_+(y<<12&4294967295|y>>>20),y=E+(p^A&(_^p))+I[2]+606105819&4294967295,E=A+(y<<17&4294967295|y>>>15),y=p+(_^E&(A^_))+I[3]+3250441966&4294967295,p=E+(y<<22&4294967295|y>>>10),y=_+(A^p&(E^A))+I[4]+4118548399&4294967295,_=p+(y<<7&4294967295|y>>>25),y=A+(E^_&(p^E))+I[5]+1200080426&4294967295,A=_+(y<<12&4294967295|y>>>20),y=E+(p^A&(_^p))+I[6]+2821735955&4294967295,E=A+(y<<17&4294967295|y>>>15),y=p+(_^E&(A^_))+I[7]+4249261313&4294967295,p=E+(y<<22&4294967295|y>>>10),y=_+(A^p&(E^A))+I[8]+1770035416&4294967295,_=p+(y<<7&4294967295|y>>>25),y=A+(E^_&(p^E))+I[9]+2336552879&4294967295,A=_+(y<<12&4294967295|y>>>20),y=E+(p^A&(_^p))+I[10]+4294925233&4294967295,E=A+(y<<17&4294967295|y>>>15),y=p+(_^E&(A^_))+I[11]+2304563134&4294967295,p=E+(y<<22&4294967295|y>>>10),y=_+(A^p&(E^A))+I[12]+1804603682&4294967295,_=p+(y<<7&4294967295|y>>>25),y=A+(E^_&(p^E))+I[13]+4254626195&4294967295,A=_+(y<<12&4294967295|y>>>20),y=E+(p^A&(_^p))+I[14]+2792965006&4294967295,E=A+(y<<17&4294967295|y>>>15),y=p+(_^E&(A^_))+I[15]+1236535329&4294967295,p=E+(y<<22&4294967295|y>>>10),y=_+(E^A&(p^E))+I[1]+4129170786&4294967295,_=p+(y<<5&4294967295|y>>>27),y=A+(p^E&(_^p))+I[6]+3225465664&4294967295,A=_+(y<<9&4294967295|y>>>23),y=E+(_^p&(A^_))+I[11]+643717713&4294967295,E=A+(y<<14&4294967295|y>>>18),y=p+(A^_&(E^A))+I[0]+3921069994&4294967295,p=E+(y<<20&4294967295|y>>>12),y=_+(E^A&(p^E))+I[5]+3593408605&4294967295,_=p+(y<<5&4294967295|y>>>27),y=A+(p^E&(_^p))+I[10]+38016083&4294967295,A=_+(y<<9&4294967295|y>>>23),y=E+(_^p&(A^_))+I[15]+3634488961&4294967295,E=A+(y<<14&4294967295|y>>>18),y=p+(A^_&(E^A))+I[4]+3889429448&4294967295,p=E+(y<<20&4294967295|y>>>12),y=_+(E^A&(p^E))+I[9]+568446438&4294967295,_=p+(y<<5&4294967295|y>>>27),y=A+(p^E&(_^p))+I[14]+3275163606&4294967295,A=_+(y<<9&4294967295|y>>>23),y=E+(_^p&(A^_))+I[3]+4107603335&4294967295,E=A+(y<<14&4294967295|y>>>18),y=p+(A^_&(E^A))+I[8]+1163531501&4294967295,p=E+(y<<20&4294967295|y>>>12),y=_+(E^A&(p^E))+I[13]+2850285829&4294967295,_=p+(y<<5&4294967295|y>>>27),y=A+(p^E&(_^p))+I[2]+4243563512&4294967295,A=_+(y<<9&4294967295|y>>>23),y=E+(_^p&(A^_))+I[7]+1735328473&4294967295,E=A+(y<<14&4294967295|y>>>18),y=p+(A^_&(E^A))+I[12]+2368359562&4294967295,p=E+(y<<20&4294967295|y>>>12),y=_+(p^E^A)+I[5]+4294588738&4294967295,_=p+(y<<4&4294967295|y>>>28),y=A+(_^p^E)+I[8]+2272392833&4294967295,A=_+(y<<11&4294967295|y>>>21),y=E+(A^_^p)+I[11]+1839030562&4294967295,E=A+(y<<16&4294967295|y>>>16),y=p+(E^A^_)+I[14]+4259657740&4294967295,p=E+(y<<23&4294967295|y>>>9),y=_+(p^E^A)+I[1]+2763975236&4294967295,_=p+(y<<4&4294967295|y>>>28),y=A+(_^p^E)+I[4]+1272893353&4294967295,A=_+(y<<11&4294967295|y>>>21),y=E+(A^_^p)+I[7]+4139469664&4294967295,E=A+(y<<16&4294967295|y>>>16),y=p+(E^A^_)+I[10]+3200236656&4294967295,p=E+(y<<23&4294967295|y>>>9),y=_+(p^E^A)+I[13]+681279174&4294967295,_=p+(y<<4&4294967295|y>>>28),y=A+(_^p^E)+I[0]+3936430074&4294967295,A=_+(y<<11&4294967295|y>>>21),y=E+(A^_^p)+I[3]+3572445317&4294967295,E=A+(y<<16&4294967295|y>>>16),y=p+(E^A^_)+I[6]+76029189&4294967295,p=E+(y<<23&4294967295|y>>>9),y=_+(p^E^A)+I[9]+3654602809&4294967295,_=p+(y<<4&4294967295|y>>>28),y=A+(_^p^E)+I[12]+3873151461&4294967295,A=_+(y<<11&4294967295|y>>>21),y=E+(A^_^p)+I[15]+530742520&4294967295,E=A+(y<<16&4294967295|y>>>16),y=p+(E^A^_)+I[2]+3299628645&4294967295,p=E+(y<<23&4294967295|y>>>9),y=_+(E^(p|~A))+I[0]+4096336452&4294967295,_=p+(y<<6&4294967295|y>>>26),y=A+(p^(_|~E))+I[7]+1126891415&4294967295,A=_+(y<<10&4294967295|y>>>22),y=E+(_^(A|~p))+I[14]+2878612391&4294967295,E=A+(y<<15&4294967295|y>>>17),y=p+(A^(E|~_))+I[5]+4237533241&4294967295,p=E+(y<<21&4294967295|y>>>11),y=_+(E^(p|~A))+I[12]+1700485571&4294967295,_=p+(y<<6&4294967295|y>>>26),y=A+(p^(_|~E))+I[3]+2399980690&4294967295,A=_+(y<<10&4294967295|y>>>22),y=E+(_^(A|~p))+I[10]+4293915773&4294967295,E=A+(y<<15&4294967295|y>>>17),y=p+(A^(E|~_))+I[1]+2240044497&4294967295,p=E+(y<<21&4294967295|y>>>11),y=_+(E^(p|~A))+I[8]+1873313359&4294967295,_=p+(y<<6&4294967295|y>>>26),y=A+(p^(_|~E))+I[15]+4264355552&4294967295,A=_+(y<<10&4294967295|y>>>22),y=E+(_^(A|~p))+I[6]+2734768916&4294967295,E=A+(y<<15&4294967295|y>>>17),y=p+(A^(E|~_))+I[13]+1309151649&4294967295,p=E+(y<<21&4294967295|y>>>11),y=_+(E^(p|~A))+I[4]+4149444226&4294967295,_=p+(y<<6&4294967295|y>>>26),y=A+(p^(_|~E))+I[11]+3174756917&4294967295,A=_+(y<<10&4294967295|y>>>22),y=E+(_^(A|~p))+I[2]+718787259&4294967295,E=A+(y<<15&4294967295|y>>>17),y=p+(A^(E|~_))+I[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,w.g[2]=w.g[2]+E&4294967295,w.g[3]=w.g[3]+A&4294967295}r.prototype.u=function(w,_){_===void 0&&(_=w.length);for(var p=_-this.blockSize,I=this.B,E=this.h,A=0;A<_;){if(E==0)for(;A<=p;)s(this,w,A),A+=this.blockSize;if(typeof w=="string"){for(;A<_;)if(I[E++]=w.charCodeAt(A++),E==this.blockSize){s(this,I),E=0;break}}else for(;A<_;)if(I[E++]=w[A++],E==this.blockSize){s(this,I),E=0;break}}this.h=E,this.o+=_},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;var p=8*this.o;for(_=w.length-8;_<w.length;++_)w[_]=p&255,p/=256;for(this.u(w),w=Array(16),_=p=0;4>_;++_)for(var I=0;32>I;I+=8)w[p++]=this.g[_]>>>I&255;return w};function i(w,_){var p=c;return Object.prototype.hasOwnProperty.call(p,w)?p[w]:p[w]=_(w)}function a(w,_){this.h=_;for(var p=[],I=!0,E=w.length-1;0<=E;E--){var A=w[E]|0;I&&A==_||(p[E]=A,I=!1)}this.g=p}var c={};function u(w){return-128<=w&&128>w?i(w,function(_){return new a([_|0],0>_?-1:0)}):new a([w|0],0>w?-1:0)}function d(w){if(isNaN(w)||!isFinite(w))return v;if(0>w)return k(d(-w));for(var _=[],p=1,I=0;w>=p;I++)_[I]=w/p|0,p*=4294967296;return new a(_,0)}function g(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return k(g(w.substring(1),_));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var p=d(Math.pow(_,8)),I=v,E=0;E<w.length;E+=8){var A=Math.min(8,w.length-E),y=parseInt(w.substring(E,E+A),_);8>A?(A=d(Math.pow(_,A)),I=I.j(A).add(d(y))):(I=I.j(p),I=I.add(d(y)))}return I}var v=u(0),T=u(1),R=u(16777216);n=a.prototype,n.m=function(){if(P(this))return-k(this).m();for(var w=0,_=1,p=0;p<this.g.length;p++){var I=this.i(p);w+=(0<=I?I:4294967296+I)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(D(this))return"0";if(P(this))return"-"+k(this).toString(w);for(var _=d(Math.pow(w,6)),p=this,I="";;){var E=H(p,_).g;p=B(p,E.j(_));var A=((0<p.g.length?p.g[0]:p.h)>>>0).toString(w);if(p=E,D(p))return A+I;for(;6>A.length;)A="0"+A;I=A+I}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function D(w){if(w.h!=0)return!1;for(var _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function P(w){return w.h==-1}n.l=function(w){return w=B(this,w),P(w)?-1:D(w)?0:1};function k(w){for(var _=w.g.length,p=[],I=0;I<_;I++)p[I]=~w.g[I];return new a(p,~w.h).add(T)}n.abs=function(){return P(this)?k(this):this},n.add=function(w){for(var _=Math.max(this.g.length,w.g.length),p=[],I=0,E=0;E<=_;E++){var A=I+(this.i(E)&65535)+(w.i(E)&65535),y=(A>>>16)+(this.i(E)>>>16)+(w.i(E)>>>16);I=y>>>16,A&=65535,y&=65535,p[E]=y<<16|A}return new a(p,p[p.length-1]&-2147483648?-1:0)};function B(w,_){return w.add(k(_))}n.j=function(w){if(D(this)||D(w))return v;if(P(this))return P(w)?k(this).j(k(w)):k(k(this).j(w));if(P(w))return k(this.j(k(w)));if(0>this.l(R)&&0>w.l(R))return d(this.m()*w.m());for(var _=this.g.length+w.g.length,p=[],I=0;I<2*_;I++)p[I]=0;for(I=0;I<this.g.length;I++)for(var E=0;E<w.g.length;E++){var A=this.i(I)>>>16,y=this.i(I)&65535,X=w.i(E)>>>16,O=w.i(E)&65535;p[2*I+2*E]+=y*O,L(p,2*I+2*E),p[2*I+2*E+1]+=A*O,L(p,2*I+2*E+1),p[2*I+2*E+1]+=y*X,L(p,2*I+2*E+1),p[2*I+2*E+2]+=A*X,L(p,2*I+2*E+2)}for(I=0;I<_;I++)p[I]=p[2*I+1]<<16|p[2*I];for(I=_;I<2*_;I++)p[I]=0;return new a(p,0)};function L(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function j(w,_){this.g=w,this.h=_}function H(w,_){if(D(_))throw Error("division by zero");if(D(w))return new j(v,v);if(P(w))return _=H(k(w),_),new j(k(_.g),k(_.h));if(P(_))return _=H(w,k(_)),new j(k(_.g),_.h);if(30<w.g.length){if(P(w)||P(_))throw Error("slowDivide_ only works with positive integers.");for(var p=T,I=_;0>=I.l(w);)p=x(p),I=x(I);var E=S(p,1),A=S(I,1);for(I=S(I,2),p=S(p,2);!D(I);){var y=A.add(I);0>=y.l(w)&&(E=E.add(p),A=y),I=S(I,1),p=S(p,1)}return _=B(w,E.j(_)),new j(E,_)}for(E=v;0<=w.l(_);){for(p=Math.max(1,Math.floor(w.m()/_.m())),I=Math.ceil(Math.log(p)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),A=d(p),y=A.j(_);P(y)||0<y.l(w);)p-=I,A=d(p),y=A.j(_);D(A)&&(A=T),E=E.add(A),w=B(w,y)}return new j(E,w)}n.A=function(w){return H(this,w).h},n.and=function(w){for(var _=Math.max(this.g.length,w.g.length),p=[],I=0;I<_;I++)p[I]=this.i(I)&w.i(I);return new a(p,this.h&w.h)},n.or=function(w){for(var _=Math.max(this.g.length,w.g.length),p=[],I=0;I<_;I++)p[I]=this.i(I)|w.i(I);return new a(p,this.h|w.h)},n.xor=function(w){for(var _=Math.max(this.g.length,w.g.length),p=[],I=0;I<_;I++)p[I]=this.i(I)^w.i(I);return new a(p,this.h^w.h)};function x(w){for(var _=w.g.length+1,p=[],I=0;I<_;I++)p[I]=w.i(I)<<1|w.i(I-1)>>>31;return new a(p,w.h)}function S(w,_){var p=_>>5;_%=32;for(var I=w.g.length-p,E=[],A=0;A<I;A++)E[A]=0<_?w.i(A+p)>>>_|w.i(A+p+1)<<32-_:w.i(A+p);return new a(E,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Td=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=g,Mt=a}).apply(typeof mu<"u"?mu:typeof self<"u"?self:typeof window<"u"?window:{});var Ns=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ad,Ir,bd,Ws,ra,Rd,Sd,Cd;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,h){return o==Array.prototype||o==Object.prototype||(o[l]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ns=="object"&&Ns];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var h=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var b=o[m];if(!(b in h))break e;h=h[b]}o=o[o.length-1],m=h[o],l=l(m),l!=m&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}function i(o,l){o instanceof String&&(o+="");var h=0,m=!1,b={next:function(){if(!m&&h<o.length){var C=h++;return{value:l(C,o[C]),done:!1}}return m=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}s("Array.prototype.values",function(o){return o||function(){return i(this,function(l,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function d(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function g(o,l,h){return o.call.apply(o.bind,arguments)}function v(o,l,h){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,m),o.apply(l,b)}}return function(){return o.apply(l,arguments)}}function T(o,l,h){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?g:v,T.apply(null,arguments)}function R(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function D(o,l){function h(){}h.prototype=l.prototype,o.aa=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(m,b,C){for(var M=Array(arguments.length-2),ae=2;ae<arguments.length;ae++)M[ae-2]=arguments[ae];return l.prototype[b].apply(m,M)}}function P(o){const l=o.length;if(0<l){const h=Array(l);for(let m=0;m<l;m++)h[m]=o[m];return h}return[]}function k(o,l){for(let h=1;h<arguments.length;h++){const m=arguments[h];if(u(m)){const b=o.length||0,C=m.length||0;o.length=b+C;for(let M=0;M<C;M++)o[b+M]=m[M]}else o.push(m)}}class B{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function L(o){return/^[\s\xa0]*$/.test(o)}function j(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function H(o){return H[" "](o),o}H[" "]=function(){};var x=j().indexOf("Gecko")!=-1&&!(j().toLowerCase().indexOf("webkit")!=-1&&j().indexOf("Edge")==-1)&&!(j().indexOf("Trident")!=-1||j().indexOf("MSIE")!=-1)&&j().indexOf("Edge")==-1;function S(o,l,h){for(const m in o)l.call(h,o[m],m,o)}function w(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function _(o){const l={};for(const h in o)l[h]=o[h];return l}const p="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,l){let h,m;for(let b=1;b<arguments.length;b++){m=arguments[b];for(h in m)o[h]=m[h];for(let C=0;C<p.length;C++)h=p[C],Object.prototype.hasOwnProperty.call(m,h)&&(o[h]=m[h])}}function E(o){var l=1;o=o.split(":");const h=[];for(;0<l&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function A(o){c.setTimeout(()=>{throw o},0)}function y(){var o=Ee;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class X{constructor(){this.h=this.g=null}add(l,h){const m=O.get();m.set(l,h),this.h?this.h.next=m:this.g=m,this.h=m}}var O=new B(()=>new F,o=>o.reset());class F{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let W,oe=!1,Ee=new X,ge=()=>{const o=c.Promise.resolve(void 0);W=()=>{o.then(ct)}};var ct=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(h){A(h)}var l=O;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}oe=!1};function We(){this.s=this.s,this.C=this.C}We.prototype.s=!1,We.prototype.ma=function(){this.s||(this.s=!0,this.N())},We.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function _e(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}_e.prototype.h=function(){this.defaultPrevented=!0};var ir=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};c.addEventListener("test",h,l),c.removeEventListener("test",h,l)}catch{}return o}();function or(o,l){if(_e.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(x){e:{try{H(l.nodeName);var b=!0;break e}catch{}b=!1}b||(l=null)}}else h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement);this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:xp[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&or.aa.h.call(this)}}D(or,_e);var xp={2:"touch",3:"pen",4:"mouse"};or.prototype.h=function(){or.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var hs="closure_listenable_"+(1e6*Math.random()|0),Mp=0;function Fp(o,l,h,m,b){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!m,this.ha=b,this.key=++Mp,this.da=this.fa=!1}function ds(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function fs(o){this.src=o,this.g={},this.h=0}fs.prototype.add=function(o,l,h,m,b){var C=o.toString();o=this.g[C],o||(o=this.g[C]=[],this.h++);var M=uo(o,l,m,b);return-1<M?(l=o[M],h||(l.fa=!1)):(l=new Fp(l,this.src,C,!!m,b),l.fa=h,o.push(l)),l};function lo(o,l){var h=l.type;if(h in o.g){var m=o.g[h],b=Array.prototype.indexOf.call(m,l,void 0),C;(C=0<=b)&&Array.prototype.splice.call(m,b,1),C&&(ds(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function uo(o,l,h,m){for(var b=0;b<o.length;++b){var C=o[b];if(!C.da&&C.listener==l&&C.capture==!!h&&C.ha==m)return b}return-1}var ho="closure_lm_"+(1e6*Math.random()|0),fo={};function $c(o,l,h,m,b){if(Array.isArray(l)){for(var C=0;C<l.length;C++)$c(o,l[C],h,m,b);return null}return h=qc(h),o&&o[hs]?o.K(l,h,d(m)?!!m.capture:!1,b):Up(o,l,h,!1,m,b)}function Up(o,l,h,m,b,C){if(!l)throw Error("Invalid event type");var M=d(b)?!!b.capture:!!b,ae=mo(o);if(ae||(o[ho]=ae=new fs(o)),h=ae.add(l,h,m,M,C),h.proxy)return h;if(m=$p(),h.proxy=m,m.src=o,m.listener=h,o.addEventListener)ir||(b=M),b===void 0&&(b=!1),o.addEventListener(l.toString(),m,b);else if(o.attachEvent)o.attachEvent(jc(l.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function $p(){function o(h){return l.call(o.src,o.listener,h)}const l=Bp;return o}function Bc(o,l,h,m,b){if(Array.isArray(l))for(var C=0;C<l.length;C++)Bc(o,l[C],h,m,b);else m=d(m)?!!m.capture:!!m,h=qc(h),o&&o[hs]?(o=o.i,l=String(l).toString(),l in o.g&&(C=o.g[l],h=uo(C,h,m,b),-1<h&&(ds(C[h]),Array.prototype.splice.call(C,h,1),C.length==0&&(delete o.g[l],o.h--)))):o&&(o=mo(o))&&(l=o.g[l.toString()],o=-1,l&&(o=uo(l,h,m,b)),(h=-1<o?l[o]:null)&&po(h))}function po(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[hs])lo(l.i,o);else{var h=o.type,m=o.proxy;l.removeEventListener?l.removeEventListener(h,m,o.capture):l.detachEvent?l.detachEvent(jc(h),m):l.addListener&&l.removeListener&&l.removeListener(m),(h=mo(l))?(lo(h,o),h.h==0&&(h.src=null,l[ho]=null)):ds(o)}}}function jc(o){return o in fo?fo[o]:fo[o]="on"+o}function Bp(o,l){if(o.da)o=!0;else{l=new or(l,this);var h=o.listener,m=o.ha||o.src;o.fa&&po(o),o=h.call(m,l)}return o}function mo(o){return o=o[ho],o instanceof fs?o:null}var go="__closure_events_fn_"+(1e9*Math.random()>>>0);function qc(o){return typeof o=="function"?o:(o[go]||(o[go]=function(l){return o.handleEvent(l)}),o[go])}function Ne(){We.call(this),this.i=new fs(this),this.M=this,this.F=null}D(Ne,We),Ne.prototype[hs]=!0,Ne.prototype.removeEventListener=function(o,l,h,m){Bc(this,o,l,h,m)};function Fe(o,l){var h,m=o.F;if(m)for(h=[];m;m=m.F)h.push(m);if(o=o.M,m=l.type||l,typeof l=="string")l=new _e(l,o);else if(l instanceof _e)l.target=l.target||o;else{var b=l;l=new _e(m,o),I(l,b)}if(b=!0,h)for(var C=h.length-1;0<=C;C--){var M=l.g=h[C];b=ps(M,m,!0,l)&&b}if(M=l.g=o,b=ps(M,m,!0,l)&&b,b=ps(M,m,!1,l)&&b,h)for(C=0;C<h.length;C++)M=l.g=h[C],b=ps(M,m,!1,l)&&b}Ne.prototype.N=function(){if(Ne.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var h=o.g[l],m=0;m<h.length;m++)ds(h[m]);delete o.g[l],o.h--}}this.F=null},Ne.prototype.K=function(o,l,h,m){return this.i.add(String(o),l,!1,h,m)},Ne.prototype.L=function(o,l,h,m){return this.i.add(String(o),l,!0,h,m)};function ps(o,l,h,m){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var b=!0,C=0;C<l.length;++C){var M=l[C];if(M&&!M.da&&M.capture==h){var ae=M.listener,Re=M.ha||M.src;M.fa&&lo(o.i,M),b=ae.call(Re,m)!==!1&&b}}return b&&!m.defaultPrevented}function zc(o,l,h){if(typeof o=="function")h&&(o=T(o,h));else if(o&&typeof o.handleEvent=="function")o=T(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(o,l||0)}function Hc(o){o.g=zc(()=>{o.g=null,o.i&&(o.i=!1,Hc(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class jp extends We{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Hc(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ar(o){We.call(this),this.h=o,this.g={}}D(ar,We);var Wc=[];function Gc(o){S(o.g,function(l,h){this.g.hasOwnProperty(h)&&po(l)},o),o.g={}}ar.prototype.N=function(){ar.aa.N.call(this),Gc(this)},ar.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var _o=c.JSON.stringify,qp=c.JSON.parse,zp=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function yo(){}yo.prototype.h=null;function Kc(o){return o.h||(o.h=o.i())}function Qc(){}var cr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function vo(){_e.call(this,"d")}D(vo,_e);function wo(){_e.call(this,"c")}D(wo,_e);var Jt={},Yc=null;function ms(){return Yc=Yc||new Ne}Jt.La="serverreachability";function Jc(o){_e.call(this,Jt.La,o)}D(Jc,_e);function lr(o){const l=ms();Fe(l,new Jc(l))}Jt.STAT_EVENT="statevent";function Xc(o,l){_e.call(this,Jt.STAT_EVENT,o),this.stat=l}D(Xc,_e);function Ue(o){const l=ms();Fe(l,new Xc(l,o))}Jt.Ma="timingevent";function Zc(o,l){_e.call(this,Jt.Ma,o),this.size=l}D(Zc,_e);function ur(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},l)}function hr(){this.g=!0}hr.prototype.xa=function(){this.g=!1};function Hp(o,l,h,m,b,C){o.info(function(){if(o.g)if(C)for(var M="",ae=C.split("&"),Re=0;Re<ae.length;Re++){var re=ae[Re].split("=");if(1<re.length){var De=re[0];re=re[1];var Ve=De.split("_");M=2<=Ve.length&&Ve[1]=="type"?M+(De+"="+re+"&"):M+(De+"=redacted&")}}else M=null;else M=C;return"XMLHTTP REQ ("+m+") [attempt "+b+"]: "+l+`
`+h+`
`+M})}function Wp(o,l,h,m,b,C,M){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+b+"]: "+l+`
`+h+`
`+C+" "+M})}function wn(o,l,h,m){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Kp(o,h)+(m?" "+m:"")})}function Gp(o,l){o.info(function(){return"TIMEOUT: "+l})}hr.prototype.info=function(){};function Kp(o,l){if(!o.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var m=h[o];if(!(2>m.length)){var b=m[1];if(Array.isArray(b)&&!(1>b.length)){var C=b[0];if(C!="noop"&&C!="stop"&&C!="close")for(var M=1;M<b.length;M++)b[M]=""}}}}return _o(h)}catch{return l}}var gs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},el={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Eo;function _s(){}D(_s,yo),_s.prototype.g=function(){return new XMLHttpRequest},_s.prototype.i=function(){return{}},Eo=new _s;function At(o,l,h,m){this.j=o,this.i=l,this.l=h,this.R=m||1,this.U=new ar(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new tl}function tl(){this.i=null,this.g="",this.h=!1}var nl={},Io={};function To(o,l,h){o.L=1,o.v=Es(lt(l)),o.m=h,o.P=!0,rl(o,null)}function rl(o,l){o.F=Date.now(),ys(o),o.A=lt(o.v);var h=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),_l(h.i,"t",m),o.C=0,h=o.j.J,o.h=new tl,o.g=Ll(o.j,h?l:null,!o.m),0<o.O&&(o.M=new jp(T(o.Y,o,o.g),o.O)),l=o.U,h=o.g,m=o.ca;var b="readystatechange";Array.isArray(b)||(b&&(Wc[0]=b.toString()),b=Wc);for(var C=0;C<b.length;C++){var M=$c(h,b[C],m||l.handleEvent,!1,l.h||l);if(!M)break;l.g[M.key]=M}l=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),lr(),Hp(o.i,o.u,o.A,o.l,o.R,o.m)}At.prototype.ca=function(o){o=o.target;const l=this.M;l&&ut(o)==3?l.j():this.Y(o)},At.prototype.Y=function(o){try{if(o==this.g)e:{const Ve=ut(this.g);var l=this.g.Ba();const Tn=this.g.Z();if(!(3>Ve)&&(Ve!=3||this.g&&(this.h.h||this.g.oa()||Al(this.g)))){this.J||Ve!=4||l==7||(l==8||0>=Tn?lr(3):lr(2)),Ao(this);var h=this.g.Z();this.X=h;t:if(sl(this)){var m=Al(this.g);o="";var b=m.length,C=ut(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Xt(this),dr(this);var M="";break t}this.h.i=new c.TextDecoder}for(l=0;l<b;l++)this.h.h=!0,o+=this.h.i.decode(m[l],{stream:!(C&&l==b-1)});m.length=0,this.h.g+=o,this.C=0,M=this.h.g}else M=this.g.oa();if(this.o=h==200,Wp(this.i,this.u,this.A,this.l,this.R,Ve,h),this.o){if(this.T&&!this.K){t:{if(this.g){var ae,Re=this.g;if((ae=Re.g?Re.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(ae)){var re=ae;break t}}re=null}if(h=re)wn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,bo(this,h);else{this.o=!1,this.s=3,Ue(12),Xt(this),dr(this);break e}}if(this.P){h=!0;let Ke;for(;!this.J&&this.C<M.length;)if(Ke=Qp(this,M),Ke==Io){Ve==4&&(this.s=4,Ue(14),h=!1),wn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ke==nl){this.s=4,Ue(15),wn(this.i,this.l,M,"[Invalid Chunk]"),h=!1;break}else wn(this.i,this.l,Ke,null),bo(this,Ke);if(sl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ve!=4||M.length!=0||this.h.h||(this.s=1,Ue(16),h=!1),this.o=this.o&&h,!h)wn(this.i,this.l,M,"[Invalid Chunked Response]"),Xt(this),dr(this);else if(0<M.length&&!this.W){this.W=!0;var De=this.j;De.g==this&&De.ba&&!De.M&&(De.j.info("Great, no buffering proxy detected. Bytes received: "+M.length),No(De),De.M=!0,Ue(11))}}else wn(this.i,this.l,M,null),bo(this,M);Ve==4&&Xt(this),this.o&&!this.J&&(Ve==4?Nl(this.j,this):(this.o=!1,ys(this)))}else dm(this.g),h==400&&0<M.indexOf("Unknown SID")?(this.s=3,Ue(12)):(this.s=0,Ue(13)),Xt(this),dr(this)}}}catch{}finally{}};function sl(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Qp(o,l){var h=o.C,m=l.indexOf(`
`,h);return m==-1?Io:(h=Number(l.substring(h,m)),isNaN(h)?nl:(m+=1,m+h>l.length?Io:(l=l.slice(m,m+h),o.C=m+h,l)))}At.prototype.cancel=function(){this.J=!0,Xt(this)};function ys(o){o.S=Date.now()+o.I,il(o,o.I)}function il(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=ur(T(o.ba,o),l)}function Ao(o){o.B&&(c.clearTimeout(o.B),o.B=null)}At.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Gp(this.i,this.A),this.L!=2&&(lr(),Ue(17)),Xt(this),this.s=2,dr(this)):il(this,this.S-o)};function dr(o){o.j.G==0||o.J||Nl(o.j,o)}function Xt(o){Ao(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,Gc(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function bo(o,l){try{var h=o.j;if(h.G!=0&&(h.g==o||Ro(h.h,o))){if(!o.K&&Ro(h.h,o)&&h.G==3){try{var m=h.Da.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var b=m;if(b[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Ss(h),bs(h);else break e;ko(h),Ue(18)}}else h.za=b[1],0<h.za-h.T&&37500>b[2]&&h.F&&h.v==0&&!h.C&&(h.C=ur(T(h.Za,h),6e3));if(1>=cl(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else en(h,11)}else if((o.K||h.g==o)&&Ss(h),!L(l))for(b=h.Da.g.parse(l),l=0;l<b.length;l++){let re=b[l];if(h.T=re[0],re=re[1],h.G==2)if(re[0]=="c"){h.K=re[1],h.ia=re[2];const De=re[3];De!=null&&(h.la=De,h.j.info("VER="+h.la));const Ve=re[4];Ve!=null&&(h.Aa=Ve,h.j.info("SVER="+h.Aa));const Tn=re[5];Tn!=null&&typeof Tn=="number"&&0<Tn&&(m=1.5*Tn,h.L=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;const Ke=o.g;if(Ke){const Ps=Ke.g?Ke.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ps){var C=m.h;C.g||Ps.indexOf("spdy")==-1&&Ps.indexOf("quic")==-1&&Ps.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(So(C,C.h),C.h=null))}if(m.D){const Do=Ke.g?Ke.g.getResponseHeader("X-HTTP-Session-Id"):null;Do&&(m.ya=Do,he(m.I,m.D,Do))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),m=h;var M=o;if(m.qa=Ol(m,m.J?m.ia:null,m.W),M.K){ll(m.h,M);var ae=M,Re=m.L;Re&&(ae.I=Re),ae.B&&(Ao(ae),ys(ae)),m.g=M}else Pl(m);0<h.i.length&&Rs(h)}else re[0]!="stop"&&re[0]!="close"||en(h,7);else h.G==3&&(re[0]=="stop"||re[0]=="close"?re[0]=="stop"?en(h,7):Po(h):re[0]!="noop"&&h.l&&h.l.ta(re),h.v=0)}}lr(4)}catch{}}var Yp=class{constructor(o,l){this.g=o,this.map=l}};function ol(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function al(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function cl(o){return o.h?1:o.g?o.g.size:0}function Ro(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function So(o,l){o.g?o.g.add(l):o.h=l}function ll(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}ol.prototype.cancel=function(){if(this.i=ul(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ul(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.D);return l}return P(o.i)}function Jp(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var l=[],h=o.length,m=0;m<h;m++)l.push(o[m]);return l}l=[],h=0;for(m in o)l[h++]=o[m];return l}function Xp(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var l=[];o=o.length;for(var h=0;h<o;h++)l.push(h);return l}l=[],h=0;for(const m in o)l[h++]=m;return l}}}function hl(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var h=Xp(o),m=Jp(o),b=m.length,C=0;C<b;C++)l.call(void 0,m[C],h&&h[C],o)}var dl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Zp(o,l){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var m=o[h].indexOf("="),b=null;if(0<=m){var C=o[h].substring(0,m);b=o[h].substring(m+1)}else C=o[h];l(C,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function Zt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Zt){this.h=o.h,vs(this,o.j),this.o=o.o,this.g=o.g,ws(this,o.s),this.l=o.l;var l=o.i,h=new mr;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),fl(this,h),this.m=o.m}else o&&(l=String(o).match(dl))?(this.h=!1,vs(this,l[1]||"",!0),this.o=fr(l[2]||""),this.g=fr(l[3]||"",!0),ws(this,l[4]),this.l=fr(l[5]||"",!0),fl(this,l[6]||"",!0),this.m=fr(l[7]||"")):(this.h=!1,this.i=new mr(null,this.h))}Zt.prototype.toString=function(){var o=[],l=this.j;l&&o.push(pr(l,pl,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(pr(l,pl,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(pr(h,h.charAt(0)=="/"?nm:tm,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",pr(h,sm)),o.join("")};function lt(o){return new Zt(o)}function vs(o,l,h){o.j=h?fr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function ws(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function fl(o,l,h){l instanceof mr?(o.i=l,im(o.i,o.h)):(h||(l=pr(l,rm)),o.i=new mr(l,o.h))}function he(o,l,h){o.i.set(l,h)}function Es(o){return he(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function fr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function pr(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,em),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function em(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var pl=/[#\/\?@]/g,tm=/[#\?:]/g,nm=/[#\?]/g,rm=/[#\?@]/g,sm=/#/g;function mr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function bt(o){o.g||(o.g=new Map,o.h=0,o.i&&Zp(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=mr.prototype,n.add=function(o,l){bt(this),this.i=null,o=En(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function ml(o,l){bt(o),l=En(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function gl(o,l){return bt(o),l=En(o,l),o.g.has(l)}n.forEach=function(o,l){bt(this),this.g.forEach(function(h,m){h.forEach(function(b){o.call(l,b,m,this)},this)},this)},n.na=function(){bt(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let m=0;m<l.length;m++){const b=o[m];for(let C=0;C<b.length;C++)h.push(l[m])}return h},n.V=function(o){bt(this);let l=[];if(typeof o=="string")gl(this,o)&&(l=l.concat(this.g.get(En(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)l=l.concat(o[h])}return l},n.set=function(o,l){return bt(this),this.i=null,o=En(this,o),gl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function _l(o,l,h){ml(o,l),0<h.length&&(o.i=null,o.g.set(En(o,l),P(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var m=l[h];const C=encodeURIComponent(String(m)),M=this.V(m);for(m=0;m<M.length;m++){var b=C;M[m]!==""&&(b+="="+encodeURIComponent(String(M[m]))),o.push(b)}}return this.i=o.join("&")};function En(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function im(o,l){l&&!o.j&&(bt(o),o.i=null,o.g.forEach(function(h,m){var b=m.toLowerCase();m!=b&&(ml(this,m),_l(this,b,h))},o)),o.j=l}function om(o,l){const h=new hr;if(c.Image){const m=new Image;m.onload=R(Rt,h,"TestLoadImage: loaded",!0,l,m),m.onerror=R(Rt,h,"TestLoadImage: error",!1,l,m),m.onabort=R(Rt,h,"TestLoadImage: abort",!1,l,m),m.ontimeout=R(Rt,h,"TestLoadImage: timeout",!1,l,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else l(!1)}function am(o,l){const h=new hr,m=new AbortController,b=setTimeout(()=>{m.abort(),Rt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:m.signal}).then(C=>{clearTimeout(b),C.ok?Rt(h,"TestPingServer: ok",!0,l):Rt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),Rt(h,"TestPingServer: error",!1,l)})}function Rt(o,l,h,m,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),m(h)}catch{}}function cm(){this.g=new zp}function lm(o,l,h){const m=h||"";try{hl(o,function(b,C){let M=b;d(b)&&(M=_o(b)),l.push(m+C+"="+encodeURIComponent(M))})}catch(b){throw l.push(m+"type="+encodeURIComponent("_badmap")),b}}function Is(o){this.l=o.Ub||null,this.j=o.eb||!1}D(Is,yo),Is.prototype.g=function(){return new Ts(this.l,this.j)},Is.prototype.i=function(o){return function(){return o}}({});function Ts(o,l){Ne.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(Ts,Ne),n=Ts.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,_r(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,gr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,_r(this)),this.g&&(this.readyState=3,_r(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;yl(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function yl(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?gr(this):_r(this),this.readyState==3&&yl(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,gr(this))},n.Qa=function(o){this.g&&(this.response=o,gr(this))},n.ga=function(){this.g&&gr(this)};function gr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,_r(o)}n.setRequestHeader=function(o,l){this.u.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function _r(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ts.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function vl(o){let l="";return S(o,function(h,m){l+=m,l+=":",l+=h,l+=`\r
`}),l}function Co(o,l,h){e:{for(m in h){var m=!1;break e}m=!0}m||(h=vl(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):he(o,l,h))}function fe(o){Ne.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(fe,Ne);var um=/^https?$/i,hm=["POST","PUT"];n=fe.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,l,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Eo.g(),this.v=this.o?Kc(this.o):Kc(Eo),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(C){wl(this,C);return}if(o=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var b in m)h.set(b,m[b]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const C of m.keys())h.set(C,m.get(C));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(C=>C.toLowerCase()=="content-type"),b=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(hm,l,void 0))||m||b||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,M]of h)this.g.setRequestHeader(C,M);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Tl(this),this.u=!0,this.g.send(o),this.u=!1}catch(C){wl(this,C)}};function wl(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,El(o),As(o)}function El(o){o.A||(o.A=!0,Fe(o,"complete"),Fe(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Fe(this,"complete"),Fe(this,"abort"),As(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),As(this,!0)),fe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Il(this):this.bb())},n.bb=function(){Il(this)};function Il(o){if(o.h&&typeof a<"u"&&(!o.v[1]||ut(o)!=4||o.Z()!=2)){if(o.u&&ut(o)==4)zc(o.Ea,0,o);else if(Fe(o,"readystatechange"),ut(o)==4){o.h=!1;try{const M=o.Z();e:switch(M){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var m;if(m=M===0){var b=String(o.D).match(dl)[1]||null;!b&&c.self&&c.self.location&&(b=c.self.location.protocol.slice(0,-1)),m=!um.test(b?b.toLowerCase():"")}h=m}if(h)Fe(o,"complete"),Fe(o,"success");else{o.m=6;try{var C=2<ut(o)?o.g.statusText:""}catch{C=""}o.l=C+" ["+o.Z()+"]",El(o)}}finally{As(o)}}}}function As(o,l){if(o.g){Tl(o);const h=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Fe(o,"ready");try{h.onreadystatechange=m}catch{}}}function Tl(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function ut(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<ut(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),qp(l)}};function Al(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function dm(o){const l={};o=(o.g&&2<=ut(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(L(o[m]))continue;var h=E(o[m]);const b=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const C=l[b]||[];l[b]=C,C.push(h)}w(l,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function yr(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function bl(o){this.Aa=0,this.i=[],this.j=new hr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=yr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=yr("baseRetryDelayMs",5e3,o),this.cb=yr("retryDelaySeedMs",1e4,o),this.Wa=yr("forwardChannelMaxRetries",2,o),this.wa=yr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new ol(o&&o.concurrentRequestLimit),this.Da=new cm,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=bl.prototype,n.la=8,n.G=1,n.connect=function(o,l,h,m){Ue(0),this.W=o,this.H=l||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.I=Ol(this,null,this.W),Rs(this)};function Po(o){if(Rl(o),o.G==3){var l=o.U++,h=lt(o.I);if(he(h,"SID",o.K),he(h,"RID",l),he(h,"TYPE","terminate"),vr(o,h),l=new At(o,o.j,l),l.L=2,l.v=Es(lt(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=l.v,h=!0),h||(l.g=Ll(l.j,null),l.g.ea(l.v)),l.F=Date.now(),ys(l)}Vl(o)}function bs(o){o.g&&(No(o),o.g.cancel(),o.g=null)}function Rl(o){bs(o),o.u&&(c.clearTimeout(o.u),o.u=null),Ss(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Rs(o){if(!al(o.h)&&!o.s){o.s=!0;var l=o.Ga;W||ge(),oe||(W(),oe=!0),Ee.add(l,o),o.B=0}}function fm(o,l){return cl(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=ur(T(o.Ga,o,l),Dl(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const b=new At(this,this.j,o);let C=this.o;if(this.S&&(C?(C=_(C),I(C,this.S)):C=this.S),this.m!==null||this.O||(b.H=C,C=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=Cl(this,b,l),h=lt(this.I),he(h,"RID",o),he(h,"CVER",22),this.D&&he(h,"X-HTTP-Session-Id",this.D),vr(this,h),C&&(this.O?l="headers="+encodeURIComponent(String(vl(C)))+"&"+l:this.m&&Co(h,this.m,C)),So(this.h,b),this.Ua&&he(h,"TYPE","init"),this.P?(he(h,"$req",l),he(h,"SID","null"),b.T=!0,To(b,h,null)):To(b,h,l),this.G=2}}else this.G==3&&(o?Sl(this,o):this.i.length==0||al(this.h)||Sl(this))};function Sl(o,l){var h;l?h=l.l:h=o.U++;const m=lt(o.I);he(m,"SID",o.K),he(m,"RID",h),he(m,"AID",o.T),vr(o,m),o.m&&o.o&&Co(m,o.m,o.o),h=new At(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),l&&(o.i=l.D.concat(o.i)),l=Cl(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),So(o.h,h),To(h,m,l)}function vr(o,l){o.H&&S(o.H,function(h,m){he(l,m,h)}),o.l&&hl({},function(h,m){he(l,m,h)})}function Cl(o,l,h){h=Math.min(o.i.length,h);var m=o.l?T(o.l.Na,o.l,o):null;e:{var b=o.i;let C=-1;for(;;){const M=["count="+h];C==-1?0<h?(C=b[0].g,M.push("ofs="+C)):C=0:M.push("ofs="+C);let ae=!0;for(let Re=0;Re<h;Re++){let re=b[Re].g;const De=b[Re].map;if(re-=C,0>re)C=Math.max(0,b[Re].g-100),ae=!1;else try{lm(De,M,"req"+re+"_")}catch{m&&m(De)}}if(ae){m=M.join("&");break e}}}return o=o.i.splice(0,h),l.D=o,m}function Pl(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;W||ge(),oe||(W(),oe=!0),Ee.add(l,o),o.v=0}}function ko(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=ur(T(o.Fa,o),Dl(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,kl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=ur(T(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ue(10),bs(this),kl(this))};function No(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function kl(o){o.g=new At(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=lt(o.qa);he(l,"RID","rpc"),he(l,"SID",o.K),he(l,"AID",o.T),he(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&he(l,"TO",o.ja),he(l,"TYPE","xmlhttp"),vr(o,l),o.m&&o.o&&Co(l,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Es(lt(l)),h.m=null,h.P=!0,rl(h,o)}n.Za=function(){this.C!=null&&(this.C=null,bs(this),ko(this),Ue(19))};function Ss(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Nl(o,l){var h=null;if(o.g==l){Ss(o),No(o),o.g=null;var m=2}else if(Ro(o.h,l))h=l.D,ll(o.h,l),m=1;else return;if(o.G!=0){if(l.o)if(m==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var b=o.B;m=ms(),Fe(m,new Zc(m,h)),Rs(o)}else Pl(o);else if(b=l.s,b==3||b==0&&0<l.X||!(m==1&&fm(o,l)||m==2&&ko(o)))switch(h&&0<h.length&&(l=o.h,l.i=l.i.concat(h)),b){case 1:en(o,5);break;case 4:en(o,10);break;case 3:en(o,6);break;default:en(o,2)}}}function Dl(o,l){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*l}function en(o,l){if(o.j.info("Error code "+l),l==2){var h=T(o.fb,o),m=o.Xa;const b=!m;m=new Zt(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||vs(m,"https"),Es(m),b?om(m.toString(),h):am(m.toString(),h)}else Ue(2);o.G=0,o.l&&o.l.sa(l),Vl(o),Rl(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Ue(2)):(this.j.info("Failed to ping google.com"),Ue(1))};function Vl(o){if(o.G=0,o.ka=[],o.l){const l=ul(o.h);(l.length!=0||o.i.length!=0)&&(k(o.ka,l),k(o.ka,o.i),o.h.i.length=0,P(o.i),o.i.length=0),o.l.ra()}}function Ol(o,l,h){var m=h instanceof Zt?lt(h):new Zt(h);if(m.g!="")l&&(m.g=l+"."+m.g),ws(m,m.s);else{var b=c.location;m=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;var C=new Zt(null);m&&vs(C,m),l&&(C.g=l),b&&ws(C,b),h&&(C.l=h),m=C}return h=o.D,l=o.ya,h&&l&&he(m,h,l),he(m,"VER",o.la),vr(o,m),m}function Ll(o,l,h){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new fe(new Is({eb:h})):new fe(o.pa),l.Ha(o.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function xl(){}n=xl.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Cs(){}Cs.prototype.g=function(o,l){return new ze(o,l)};function ze(o,l){Ne.call(this),this.g=new bl(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!L(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!L(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new In(this)}D(ze,Ne),ze.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ze.prototype.close=function(){Po(this.g)},ze.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=_o(o),o=h);l.i.push(new Yp(l.Ya++,o)),l.G==3&&Rs(l)},ze.prototype.N=function(){this.g.l=null,delete this.j,Po(this.g),delete this.g,ze.aa.N.call(this)};function Ml(o){vo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}D(Ml,vo);function Fl(){wo.call(this),this.status=1}D(Fl,wo);function In(o){this.g=o}D(In,xl),In.prototype.ua=function(){Fe(this.g,"a")},In.prototype.ta=function(o){Fe(this.g,new Ml(o))},In.prototype.sa=function(o){Fe(this.g,new Fl)},In.prototype.ra=function(){Fe(this.g,"b")},Cs.prototype.createWebChannel=Cs.prototype.g,ze.prototype.send=ze.prototype.o,ze.prototype.open=ze.prototype.m,ze.prototype.close=ze.prototype.close,Cd=function(){return new Cs},Sd=function(){return ms()},Rd=Jt,ra={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},gs.NO_ERROR=0,gs.TIMEOUT=8,gs.HTTP_ERROR=6,Ws=gs,el.COMPLETE="complete",bd=el,Qc.EventType=cr,cr.OPEN="a",cr.CLOSE="b",cr.ERROR="c",cr.MESSAGE="d",Ne.prototype.listen=Ne.prototype.K,Ir=Qc,fe.prototype.listenOnce=fe.prototype.L,fe.prototype.getLastError=fe.prototype.Ka,fe.prototype.getLastErrorCode=fe.prototype.Ba,fe.prototype.getStatus=fe.prototype.Z,fe.prototype.getResponseJson=fe.prototype.Oa,fe.prototype.getResponseText=fe.prototype.oa,fe.prototype.send=fe.prototype.ea,fe.prototype.setWithCredentials=fe.prototype.Ha,Ad=fe}).apply(typeof Ns<"u"?Ns:typeof self<"u"?self:typeof window<"u"?window:{});const gu="@firebase/firestore",_u="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Le.UNAUTHENTICATED=new Le(null),Le.GOOGLE_CREDENTIALS=new Le("google-credentials-uid"),Le.FIRST_PARTY=new Le("first-party-uid"),Le.MOCK_USER=new Le("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let er="11.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un=new ki("@firebase/firestore");function bn(){return un.logLevel}function $(n,...e){if(un.logLevel<=Z.DEBUG){const t=e.map(Ba);un.debug(`Firestore (${er}): ${n}`,...t)}}function vt(n,...e){if(un.logLevel<=Z.ERROR){const t=e.map(Ba);un.error(`Firestore (${er}): ${n}`,...t)}}function Bn(n,...e){if(un.logLevel<=Z.WARN){const t=e.map(Ba);un.warn(`Firestore (${er}): ${n}`,...t)}}function Ba(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function K(n="Unexpected state"){const e=`FIRESTORE (${er}) INTERNAL ASSERTION FAILED: `+n;throw vt(e),new Error(e)}function ie(n,e){n||K()}function Y(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends Tt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class dv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Le.UNAUTHENTICATED))}shutdown(){}}class fv{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class pv{constructor(e){this.t=e,this.currentUser=Le.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ie(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new mt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new mt,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new mt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ie(typeof r.accessToken=="string"),new Pd(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ie(e===null||typeof e=="string"),new Le(e)}}class mv{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Le.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class gv{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new mv(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Le.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class yu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class _v{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,Qe(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){ie(this.o===void 0);const r=i=>{i.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,$("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new yu(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ie(typeof t.token=="string"),this.R=t.token,new yu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yv(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function sa(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=yv(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ee(n,e){return n<e?-1:n>e?1:0}function ia(n,e){const t=sa().encode(n),r=sa().encode(e);for(let s=0;s<Math.min(t.length,r.length);s++){const i=ee(t[s],r[s]);if(i!==0)return i}return ee(t.length,r.length)}function jn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu=-62135596800,wu=1e6;class Ie{static now(){return Ie.fromMillis(Date.now())}static fromDate(e){return Ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*wu);return new Ie(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<vu)throw new U(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/wu}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-vu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Eu="__name__";class Ze{constructor(e,t,r){t===void 0?t=0:t>e.length&&K(),r===void 0?r=e.length-t:r>e.length-t&&K(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ze.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ze?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Ze.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ee(e.length,t.length)}static compareSegments(e,t){const r=Ze.isNumericId(e),s=Ze.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Ze.extractNumericId(e).compare(Ze.extractNumericId(t)):ia(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Mt.fromString(e.substring(4,e.length-2))}}class le extends Ze{construct(e,t,r){return new le(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(N.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new le(t)}static emptyPath(){return new le([])}}const vv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ce extends Ze{construct(e,t,r){return new Ce(e,t,r)}static isValidIdentifier(e){return vv.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ce.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Eu}static keyField(){return new Ce([Eu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new U(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new U(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new U(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new U(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ce(t)}static emptyPath(){return new Ce([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Fr=-1;function wv(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=Q.fromTimestamp(r===1e9?new Ie(t+1,0):new Ie(t,r));return new Bt(s,z.empty(),e)}function Ev(n){return new Bt(n.readTime,n.key,Fr)}class Bt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Bt(Q.min(),z.empty(),Fr)}static max(){return new Bt(Q.max(),z.empty(),Fr)}}function Iv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=z.comparator(n.documentKey,e.documentKey),t!==0?t:ee(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tv="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Av{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(n){if(n.code!==N.FAILED_PRECONDITION||n.message!==Tv)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&K(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new V((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof V?t:V.resolve(t)}catch(t){return V.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):V.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):V.reject(t)}static resolve(e){return new V((t,r)=>{t(e)})}static reject(e){return new V((t,r)=>{r(e)})}static waitFor(e){return new V((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=V.resolve(!1);for(const r of e)t=t.next(s=>s?V.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new V((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(g=>{a[d]=g,++c,c===i&&r(a)},g=>s(g))}})}static doWhile(e,t){return new V((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function bv(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function nr(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Li{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}Li.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja=-1;function xi(n){return n==null}function li(n){return n===0&&1/n==-1/0}function Rv(n){return typeof n=="number"&&Number.isInteger(n)&&!li(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd="";function Sv(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Iu(e)),e=Cv(n.get(t),e);return Iu(e)}function Cv(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Nd:t+="";break;default:t+=i}}return t}function Iu(n){return n+Nd+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Qt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Dd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e,t){this.comparator=e,this.root=t||Se.EMPTY}insert(e,t){return new de(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Se.BLACK,null,null))}remove(e){return new de(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Se.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ds(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ds(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ds(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ds(this.root,e,this.comparator,!0)}}class Ds{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Se{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Se.RED,this.left=s??Se.EMPTY,this.right=i??Se.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Se(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Se.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Se.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw K();const e=this.left.check();if(e!==this.right.check())throw K();return e+(this.isRed()?0:1)}}Se.EMPTY=null,Se.RED=!0,Se.BLACK=!1;Se.EMPTY=new class{constructor(){this.size=0}get key(){throw K()}get value(){throw K()}get color(){throw K()}get left(){throw K()}get right(){throw K()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Se(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.comparator=e,this.data=new de(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Au(this.data.getIterator())}getIteratorFrom(e){return new Au(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Te)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Te(this.comparator);return t.data=e,t}}class Au{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this.fields=e,e.sort(Ce.comparator)}static empty(){return new He([])}unionWith(e){let t=new Te(Ce.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new He(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return jn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Vd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Vd("Invalid base64 string: "+i):i}}(e);return new Pe(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Pe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Pe.EMPTY_BYTE_STRING=new Pe("");const Pv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function jt(n){if(ie(!!n),typeof n=="string"){let e=0;const t=Pv.exec(n);if(ie(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ye(n.seconds),nanos:ye(n.nanos)}}function ye(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function qt(n){return typeof n=="string"?Pe.fromBase64String(n):Pe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od="server_timestamp",Ld="__type__",xd="__previous_value__",Md="__local_write_time__";function Mi(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Ld])===null||t===void 0?void 0:t.stringValue)===Od}function Fi(n){const e=n.mapValue.fields[xd];return Mi(e)?Fi(e):e}function Ur(n){const e=jt(n.mapValue.fields[Md].timestampValue);return new Ie(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{constructor(e,t,r,s,i,a,c,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d}}const ui="(default)";class $r{constructor(e,t){this.projectId=e,this.database=t||ui}static empty(){return new $r("","")}get isDefaultDatabase(){return this.database===ui}isEqual(e){return e instanceof $r&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fd="__type__",Nv="__max__",Vs={mapValue:{}},Ud="__vector__",hi="value";function zt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Mi(n)?4:Vv(n)?9007199254740991:Dv(n)?10:11:K()}function it(n,e){if(n===e)return!0;const t=zt(n);if(t!==zt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ur(n).isEqual(Ur(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=jt(s.timestampValue),c=jt(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return qt(s.bytesValue).isEqual(qt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return ye(s.geoPointValue.latitude)===ye(i.geoPointValue.latitude)&&ye(s.geoPointValue.longitude)===ye(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ye(s.integerValue)===ye(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ye(s.doubleValue),c=ye(i.doubleValue);return a===c?li(a)===li(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return jn(n.arrayValue.values||[],e.arrayValue.values||[],it);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Tu(a)!==Tu(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!it(a[u],c[u])))return!1;return!0}(n,e);default:return K()}}function Br(n,e){return(n.values||[]).find(t=>it(t,e))!==void 0}function qn(n,e){if(n===e)return 0;const t=zt(n),r=zt(e);if(t!==r)return ee(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ee(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=ye(i.integerValue||i.doubleValue),u=ye(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return bu(n.timestampValue,e.timestampValue);case 4:return bu(Ur(n),Ur(e));case 5:return ia(n.stringValue,e.stringValue);case 6:return function(i,a){const c=qt(i),u=qt(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const g=ee(c[d],u[d]);if(g!==0)return g}return ee(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=ee(ye(i.latitude),ye(a.latitude));return c!==0?c:ee(ye(i.longitude),ye(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ru(n.arrayValue,e.arrayValue);case 10:return function(i,a){var c,u,d,g;const v=i.fields||{},T=a.fields||{},R=(c=v[hi])===null||c===void 0?void 0:c.arrayValue,D=(u=T[hi])===null||u===void 0?void 0:u.arrayValue,P=ee(((d=R?.values)===null||d===void 0?void 0:d.length)||0,((g=D?.values)===null||g===void 0?void 0:g.length)||0);return P!==0?P:Ru(R,D)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Vs.mapValue&&a===Vs.mapValue)return 0;if(i===Vs.mapValue)return 1;if(a===Vs.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=a.fields||{},g=Object.keys(d);u.sort(),g.sort();for(let v=0;v<u.length&&v<g.length;++v){const T=ia(u[v],g[v]);if(T!==0)return T;const R=qn(c[u[v]],d[g[v]]);if(R!==0)return R}return ee(u.length,g.length)}(n.mapValue,e.mapValue);default:throw K()}}function bu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ee(n,e);const t=jt(n),r=jt(e),s=ee(t.seconds,r.seconds);return s!==0?s:ee(t.nanos,r.nanos)}function Ru(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=qn(t[s],r[s]);if(i)return i}return ee(t.length,r.length)}function zn(n){return oa(n)}function oa(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=jt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return qt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return z.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=oa(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${oa(t.fields[a])}`;return s+"}"}(n.mapValue):K()}function Gs(n){switch(zt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Fi(n);return e?16+Gs(e):16;case 5:return 2*n.stringValue.length;case 6:return qt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Gs(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Qt(r.fields,(i,a)=>{s+=i.length+Gs(a)}),s}(n.mapValue);default:throw K()}}function di(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function aa(n){return!!n&&"integerValue"in n}function qa(n){return!!n&&"arrayValue"in n}function Su(n){return!!n&&"nullValue"in n}function Cu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ks(n){return!!n&&"mapValue"in n}function Dv(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Fd])===null||t===void 0?void 0:t.stringValue)===Ud}function Cr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Qt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Cr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Cr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Vv(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Nv}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.value=e}static empty(){return new je({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ks(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Cr(t)}setAll(e){let t=Ce.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=Cr(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Ks(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return it(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Ks(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Qt(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new je(Cr(this.value))}}function $d(n){const e=[];return Qt(n.fields,(t,r)=>{const s=new Ce([t]);if(Ks(r)){const i=$d(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new He(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new xe(e,0,Q.min(),Q.min(),Q.min(),je.empty(),0)}static newFoundDocument(e,t,r,s){return new xe(e,1,t,Q.min(),r,s,0)}static newNoDocument(e,t){return new xe(e,2,t,Q.min(),Q.min(),je.empty(),0)}static newUnknownDocument(e,t){return new xe(e,3,t,Q.min(),Q.min(),je.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=je.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=je.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof xe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new xe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Hn{constructor(e,t){this.position=e,this.inclusive=t}}function Pu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=z.comparator(z.fromName(a.referenceValue),t.key):r=qn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function ku(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!it(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class jr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ov(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Bd{}class we extends Bd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new xv(e,t,r):t==="array-contains"?new Uv(e,r):t==="in"?new $v(e,r):t==="not-in"?new Bv(e,r):t==="array-contains-any"?new jv(e,r):new we(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Mv(e,r):new Fv(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(qn(t,this.value)):t!==null&&zt(this.value)===zt(t)&&this.matchesComparison(qn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Xe extends Bd{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new Xe(e,t)}matches(e){return jd(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function jd(n){return n.op==="and"}function qd(n){return Lv(n)&&jd(n)}function Lv(n){for(const e of n.filters)if(e instanceof Xe)return!1;return!0}function ca(n){if(n instanceof we)return n.field.canonicalString()+n.op.toString()+zn(n.value);if(qd(n))return n.filters.map(e=>ca(e)).join(",");{const e=n.filters.map(t=>ca(t)).join(",");return`${n.op}(${e})`}}function zd(n,e){return n instanceof we?function(r,s){return s instanceof we&&r.op===s.op&&r.field.isEqual(s.field)&&it(r.value,s.value)}(n,e):n instanceof Xe?function(r,s){return s instanceof Xe&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&zd(a,s.filters[c]),!0):!1}(n,e):void K()}function Hd(n){return n instanceof we?function(t){return`${t.field.canonicalString()} ${t.op} ${zn(t.value)}`}(n):n instanceof Xe?function(t){return t.op.toString()+" {"+t.getFilters().map(Hd).join(" ,")+"}"}(n):"Filter"}class xv extends we{constructor(e,t,r){super(e,t,r),this.key=z.fromName(r.referenceValue)}matches(e){const t=z.comparator(e.key,this.key);return this.matchesComparison(t)}}class Mv extends we{constructor(e,t){super(e,"in",t),this.keys=Wd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Fv extends we{constructor(e,t){super(e,"not-in",t),this.keys=Wd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Wd(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>z.fromName(r.referenceValue))}class Uv extends we{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return qa(t)&&Br(t.arrayValue,this.value)}}class $v extends we{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Br(this.value.arrayValue,t)}}class Bv extends we{constructor(e,t){super(e,"not-in",t)}matches(e){if(Br(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Br(this.value.arrayValue,t)}}class jv extends we{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!qa(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Br(this.value.arrayValue,r))}}/**
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
 */class qv{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.le=null}}function Nu(n,e=null,t=[],r=[],s=null,i=null,a=null){return new qv(n,e,t,r,s,i,a)}function za(n){const e=Y(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ca(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),xi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>zn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>zn(r)).join(",")),e.le=t}return e.le}function Ha(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Ov(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!zd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ku(n.startAt,e.startAt)&&ku(n.endAt,e.endAt)}function la(n){return z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function zv(n,e,t,r,s,i,a,c){return new pn(n,e,t,r,s,i,a,c)}function Ui(n){return new pn(n)}function Du(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Wa(n){return n.collectionGroup!==null}function On(n){const e=Y(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Te(Ce.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new jr(i,r))}),t.has(Ce.keyField().canonicalString())||e.he.push(new jr(Ce.keyField(),r))}return e.he}function nt(n){const e=Y(n);return e.Pe||(e.Pe=Hv(e,On(n))),e.Pe}function Hv(n,e){if(n.limitType==="F")return Nu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new jr(s.field,i)});const t=n.endAt?new Hn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Hn(n.startAt.position,n.startAt.inclusive):null;return Nu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ua(n,e){const t=n.filters.concat([e]);return new pn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function fi(n,e,t){return new pn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function $i(n,e){return Ha(nt(n),nt(e))&&n.limitType===e.limitType}function Gd(n){return`${za(nt(n))}|lt:${n.limitType}`}function Rn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Hd(s)).join(", ")}]`),xi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>zn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>zn(s)).join(",")),`Target(${r})`}(nt(n))}; limitType=${n.limitType})`}function Bi(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):z.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of On(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,u){const d=Pu(a,c,u);return a.inclusive?d<=0:d<0}(r.startAt,On(r),s)||r.endAt&&!function(a,c,u){const d=Pu(a,c,u);return a.inclusive?d>=0:d>0}(r.endAt,On(r),s))}(n,e)}function Wv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Kd(n){return(e,t)=>{let r=!1;for(const s of On(n)){const i=Gv(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Gv(n,e,t){const r=n.field.isKeyField()?z.comparator(e.key,t.key):function(i,a,c){const u=a.data.field(i),d=c.data.field(i);return u!==null&&d!==null?qn(u,d):K()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return K()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Qt(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Dd(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kv=new de(z.comparator);function wt(){return Kv}const Qd=new de(z.comparator);function Tr(...n){let e=Qd;for(const t of n)e=e.insert(t.key,t);return e}function Yd(n){let e=Qd;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function rn(){return Pr()}function Jd(){return Pr()}function Pr(){return new mn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Qv=new de(z.comparator),Yv=new Te(z.comparator);function te(...n){let e=Yv;for(const t of n)e=e.add(t);return e}const Jv=new Te(ee);function Xv(){return Jv}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:li(e)?"-0":e}}function Xd(n){return{integerValue:""+n}}function Zd(n,e){return Rv(e)?Xd(e):Ga(n,e)}/**
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
 */class ji{constructor(){this._=void 0}}function Zv(n,e,t){return n instanceof pi?function(s,i){const a={fields:{[Ld]:{stringValue:Od},[Md]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Mi(i)&&(i=Fi(i)),i&&(a.fields[xd]=i),{mapValue:a}}(t,e):n instanceof qr?tf(n,e):n instanceof zr?nf(n,e):function(s,i){const a=ef(s,i),c=Vu(a)+Vu(s.Ie);return aa(a)&&aa(s.Ie)?Xd(c):Ga(s.serializer,c)}(n,e)}function ew(n,e,t){return n instanceof qr?tf(n,e):n instanceof zr?nf(n,e):t}function ef(n,e){return n instanceof Hr?function(r){return aa(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class pi extends ji{}class qr extends ji{constructor(e){super(),this.elements=e}}function tf(n,e){const t=rf(e);for(const r of n.elements)t.some(s=>it(s,r))||t.push(r);return{arrayValue:{values:t}}}class zr extends ji{constructor(e){super(),this.elements=e}}function nf(n,e){let t=rf(e);for(const r of n.elements)t=t.filter(s=>!it(s,r));return{arrayValue:{values:t}}}class Hr extends ji{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Vu(n){return ye(n.integerValue||n.doubleValue)}function rf(n){return qa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(e,t){this.field=e,this.transform=t}}function nw(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof qr&&s instanceof qr||r instanceof zr&&s instanceof zr?jn(r.elements,s.elements,it):r instanceof Hr&&s instanceof Hr?it(r.Ie,s.Ie):r instanceof pi&&s instanceof pi}(n.transform,e.transform)}class rw{constructor(e,t){this.version=e,this.transformResults=t}}class rt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new rt}static exists(e){return new rt(void 0,e)}static updateTime(e){return new rt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Qs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class qi{}function sf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new af(n.key,rt.none()):new ss(n.key,n.data,rt.none());{const t=n.data,r=je.empty();let s=new Te(Ce.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Yt(n.key,r,new He(s.toArray()),rt.none())}}function sw(n,e,t){n instanceof ss?function(s,i,a){const c=s.value.clone(),u=Lu(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Yt?function(s,i,a){if(!Qs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Lu(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(of(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function kr(n,e,t,r){return n instanceof ss?function(i,a,c,u){if(!Qs(i.precondition,a))return c;const d=i.value.clone(),g=xu(i.fieldTransforms,u,a);return d.setAll(g),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Yt?function(i,a,c,u){if(!Qs(i.precondition,a))return c;const d=xu(i.fieldTransforms,u,a),g=a.data;return g.setAll(of(i)),g.setAll(d),a.convertToFoundDocument(a.version,g).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(v=>v.field))}(n,e,t,r):function(i,a,c){return Qs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function iw(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=ef(r.transform,s||null);i!=null&&(t===null&&(t=je.empty()),t.set(r.field,i))}return t||null}function Ou(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&jn(r,s,(i,a)=>nw(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ss extends qi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Yt extends qi{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function of(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Lu(n,e,t){const r=new Map;ie(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,ew(a,c,t[s]))}return r}function xu(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Zv(i,a,e))}return r}class af extends qi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ow extends qi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aw{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&sw(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=kr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=kr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Jd();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=sf(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(Q.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),te())}isEqual(e){return this.batchId===e.batchId&&jn(this.mutations,e.mutations,(t,r)=>Ou(t,r))&&jn(this.baseMutations,e.baseMutations,(t,r)=>Ou(t,r))}}class Ka{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){ie(e.mutations.length===r.length);let s=function(){return Qv}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Ka(e,t,r,s)}}/**
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
 */class cw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class lw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ve,ne;function uw(n){switch(n){case N.OK:return K();case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0;default:return K()}}function cf(n){if(n===void 0)return vt("GRPC error has no .code"),N.UNKNOWN;switch(n){case ve.OK:return N.OK;case ve.CANCELLED:return N.CANCELLED;case ve.UNKNOWN:return N.UNKNOWN;case ve.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case ve.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case ve.INTERNAL:return N.INTERNAL;case ve.UNAVAILABLE:return N.UNAVAILABLE;case ve.UNAUTHENTICATED:return N.UNAUTHENTICATED;case ve.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case ve.NOT_FOUND:return N.NOT_FOUND;case ve.ALREADY_EXISTS:return N.ALREADY_EXISTS;case ve.PERMISSION_DENIED:return N.PERMISSION_DENIED;case ve.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case ve.ABORTED:return N.ABORTED;case ve.OUT_OF_RANGE:return N.OUT_OF_RANGE;case ve.UNIMPLEMENTED:return N.UNIMPLEMENTED;case ve.DATA_LOSS:return N.DATA_LOSS;default:return K()}}(ne=ve||(ve={}))[ne.OK=0]="OK",ne[ne.CANCELLED=1]="CANCELLED",ne[ne.UNKNOWN=2]="UNKNOWN",ne[ne.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ne[ne.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ne[ne.NOT_FOUND=5]="NOT_FOUND",ne[ne.ALREADY_EXISTS=6]="ALREADY_EXISTS",ne[ne.PERMISSION_DENIED=7]="PERMISSION_DENIED",ne[ne.UNAUTHENTICATED=16]="UNAUTHENTICATED",ne[ne.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ne[ne.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ne[ne.ABORTED=10]="ABORTED",ne[ne.OUT_OF_RANGE=11]="OUT_OF_RANGE",ne[ne.UNIMPLEMENTED=12]="UNIMPLEMENTED",ne[ne.INTERNAL=13]="INTERNAL",ne[ne.UNAVAILABLE=14]="UNAVAILABLE",ne[ne.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const hw=new Mt([4294967295,4294967295],0);function Mu(n){const e=sa().encode(n),t=new Td;return t.update(e),new Uint8Array(t.digest())}function Fu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Mt([t,r],0),new Mt([s,i],0)]}class Qa{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ar(`Invalid padding: ${t}`);if(r<0)throw new Ar(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ar(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ar(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=Mt.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(Mt.fromNumber(r)));return s.compare(hw)===1&&(s=new Mt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=Mu(e),[r,s]=Fu(t);for(let i=0;i<this.hashCount;i++){const a=this.Ae(r,s,i);if(!this.Re(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Qa(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ee===0)return;const t=Mu(e),[r,s]=Fu(t);for(let i=0;i<this.hashCount;i++){const a=this.Ae(r,s,i);this.Ve(a)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ar extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,is.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new zi(Q.min(),s,new de(ee),wt(),te())}}class is{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new is(r,t,te(),te(),te())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class lf{constructor(e,t){this.targetId=e,this.ge=t}}class uf{constructor(e,t,r=Pe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Uu{constructor(){this.pe=0,this.ye=$u(),this.we=Pe.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=te(),t=te(),r=te();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:K()}}),new is(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=$u()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,ie(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class dw{constructor(e){this.ke=e,this.qe=new Map,this.Qe=wt(),this.$e=Os(),this.Ue=Os(),this.Ke=new de(ee)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:K()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(la(i))if(r===0){const a=new z(i.path);this.ze(t,a,xe.newNoDocument(a,Q.min()))}else ie(r===1);else{const a=this.et(t);if(a!==r){const c=this.tt(e),u=c?this.nt(c,e,a):1;if(u!==0){this.Ye(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=qt(r).toUint8Array()}catch(u){if(u instanceof Vd)return Bn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Qa(a,s,i)}catch(u){return Bn(u instanceof Ar?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.ke.it(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,a)=>{const c=this.Xe(a);if(c){if(i.current&&la(c.target)){const u=new z(c.target.path);this._t(u).has(a)||this.ut(a,u)||this.ze(a,u,xe.newNoDocument(u,e))}i.ve&&(t.set(a,i.Fe()),i.Me())}});let r=te();this.Ue.forEach((i,a)=>{let c=!0;a.forEachWhile(u=>{const d=this.Xe(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.Qe.forEach((i,a)=>a.setReadTime(e));const s=new zi(e,t,this.Ke,this.Qe,r);return this.Qe=wt(),this.$e=Os(),this.Ue=Os(),this.Ke=new de(ee),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new Uu,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new Te(ee),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new Te(ee),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||$("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new Uu),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function Os(){return new de(z.comparator)}function $u(){return new de(z.comparator)}const fw={asc:"ASCENDING",desc:"DESCENDING"},pw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},mw={and:"AND",or:"OR"};class gw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ha(n,e){return n.useProto3Json||xi(e)?e:{value:e}}function mi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function hf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function _w(n,e){return mi(n,e.toTimestamp())}function st(n){return ie(!!n),Q.fromTimestamp(function(t){const r=jt(t);return new Ie(r.seconds,r.nanos)}(n))}function Ya(n,e){return da(n,e).canonicalString()}function da(n,e){const t=function(s){return new le(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function df(n){const e=le.fromString(n);return ie(_f(e)),e}function fa(n,e){return Ya(n.databaseId,e.path)}function $o(n,e){const t=df(e);if(t.get(1)!==n.databaseId.projectId)throw new U(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new z(pf(t))}function ff(n,e){return Ya(n.databaseId,e)}function yw(n){const e=df(n);return e.length===4?le.emptyPath():pf(e)}function pa(n){return new le(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function pf(n){return ie(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Bu(n,e,t){return{name:fa(n,e),fields:t.value.mapValue.fields}}function vw(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:K()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,g){return d.useProto3Json?(ie(g===void 0||typeof g=="string"),Pe.fromBase64String(g||"")):(ie(g===void 0||g instanceof Buffer||g instanceof Uint8Array),Pe.fromUint8Array(g||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const g=d.code===void 0?N.UNKNOWN:cf(d.code);return new U(g,d.message||"")}(a);t=new uf(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=$o(n,r.document.name),i=st(r.document.updateTime),a=r.document.createTime?st(r.document.createTime):Q.min(),c=new je({mapValue:{fields:r.document.fields}}),u=xe.newFoundDocument(s,i,a,c),d=r.targetIds||[],g=r.removedTargetIds||[];t=new Ys(d,g,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=$o(n,r.document),i=r.readTime?st(r.readTime):Q.min(),a=xe.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Ys([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=$o(n,r.document),i=r.removedTargetIds||[];t=new Ys([],i,s,null)}else{if(!("filter"in e))return K();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new lw(s,i),c=r.targetId;t=new lf(c,a)}}return t}function ww(n,e){let t;if(e instanceof ss)t={update:Bu(n,e.key,e.value)};else if(e instanceof af)t={delete:fa(n,e.key)};else if(e instanceof Yt)t={update:Bu(n,e.key,e.data),updateMask:Pw(e.fieldMask)};else{if(!(e instanceof ow))return K();t={verify:fa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof pi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof qr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof zr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Hr)return{fieldPath:a.field.canonicalString(),increment:c.Ie};throw K()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:_w(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:K()}(n,e.precondition)),t}function Ew(n,e){return n&&n.length>0?(ie(e!==void 0),n.map(t=>function(s,i){let a=s.updateTime?st(s.updateTime):st(i);return a.isEqual(Q.min())&&(a=st(i)),new rw(a,s.transformResults||[])}(t,e))):[]}function Iw(n,e){return{documents:[ff(n,e.path)]}}function Tw(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=ff(n,s);const i=function(d){if(d.length!==0)return gf(Xe.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(g=>function(T){return{field:Sn(T.field),direction:Rw(T.dir)}}(g))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=ha(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ht:t,parent:s}}function Aw(n){let e=yw(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ie(r===1);const g=t.from[0];g.allDescendants?s=g.collectionId:e=e.child(g.collectionId)}let i=[];t.where&&(i=function(v){const T=mf(v);return T instanceof Xe&&qd(T)?T.getFilters():[T]}(t.where));let a=[];t.orderBy&&(a=function(v){return v.map(T=>function(D){return new jr(Cn(D.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(T))}(t.orderBy));let c=null;t.limit&&(c=function(v){let T;return T=typeof v=="object"?v.value:v,xi(T)?null:T}(t.limit));let u=null;t.startAt&&(u=function(v){const T=!!v.before,R=v.values||[];return new Hn(R,T)}(t.startAt));let d=null;return t.endAt&&(d=function(v){const T=!v.before,R=v.values||[];return new Hn(R,T)}(t.endAt)),zv(e,s,a,i,c,"F",u,d)}function bw(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return K()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function mf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Cn(t.unaryFilter.field);return we.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Cn(t.unaryFilter.field);return we.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Cn(t.unaryFilter.field);return we.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Cn(t.unaryFilter.field);return we.create(a,"!=",{nullValue:"NULL_VALUE"});default:return K()}}(n):n.fieldFilter!==void 0?function(t){return we.create(Cn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return K()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Xe.create(t.compositeFilter.filters.map(r=>mf(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return K()}}(t.compositeFilter.op))}(n):K()}function Rw(n){return fw[n]}function Sw(n){return pw[n]}function Cw(n){return mw[n]}function Sn(n){return{fieldPath:n.canonicalString()}}function Cn(n){return Ce.fromServerFormat(n.fieldPath)}function gf(n){return n instanceof we?function(t){if(t.op==="=="){if(Cu(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NAN"}};if(Su(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Cu(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NOT_NAN"}};if(Su(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Sn(t.field),op:Sw(t.op),value:t.value}}}(n):n instanceof Xe?function(t){const r=t.getFilters().map(s=>gf(s));return r.length===1?r[0]:{compositeFilter:{op:Cw(t.op),filters:r}}}(n):K()}function Pw(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function _f(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e,t,r,s,i=Q.min(),a=Q.min(),c=Pe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Vt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Vt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Vt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Vt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(e){this.Tt=e}}function Nw(n){const e=Aw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?fi(e,e.limit,"L"):e}/**
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
 */class Dw{constructor(){this.Tn=new Vw}addToCollectionParentIndex(e,t){return this.Tn.add(t),V.resolve()}getCollectionParents(e,t){return V.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return V.resolve()}deleteFieldIndex(e,t){return V.resolve()}deleteAllFieldIndexes(e){return V.resolve()}createTargetIndexes(e,t){return V.resolve()}getDocumentsMatchingTarget(e,t){return V.resolve(null)}getIndexType(e,t){return V.resolve(0)}getFieldIndexes(e,t){return V.resolve([])}getNextCollectionGroupToUpdate(e){return V.resolve(null)}getMinOffset(e,t){return V.resolve(Bt.min())}getMinOffsetFromCollectionGroup(e,t){return V.resolve(Bt.min())}updateCollectionGroup(e,t,r){return V.resolve()}updateIndexEntries(e,t){return V.resolve()}}class Vw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Te(le.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Te(le.comparator)).toArray()}}/**
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
 */const ju={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},yf=41943040;class Be{static withCacheSize(e){return new Be(e,Be.DEFAULT_COLLECTION_PERCENTILE,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Be.DEFAULT_COLLECTION_PERCENTILE=10,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Be.DEFAULT=new Be(yf,Be.DEFAULT_COLLECTION_PERCENTILE,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Be.DISABLED=new Be(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new Wn(0)}static Kn(){return new Wn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu="LruGarbageCollector",Ow=1048576;function zu([n,e],[t,r]){const s=ee(n,t);return s===0?ee(e,r):s}class Lw{constructor(e){this.Hn=e,this.buffer=new Te(zu),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();zu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class xw{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){$(qu,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){nr(t)?$(qu,"Ignoring IndexedDB error during garbage collection: ",t):await tr(t)}await this.er(3e5)})}}class Mw{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return V.resolve(Li.ae);const r=new Lw(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(ju)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ju):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,a,c,u,d;const g=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(v=>(v>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${v}`),s=this.params.maximumSequenceNumbersToCollect):s=v,a=Date.now(),this.nthSequenceNumber(e,s))).next(v=>(r=v,c=Date.now(),this.removeTargets(e,r,t))).next(v=>(i=v,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(v=>(d=Date.now(),bn()<=Z.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-g}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${v} documents in `+(d-u)+`ms
Total Duration: ${d-g}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:v})))}}function Fw(n,e){return new Mw(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(){this.changes=new mn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,xe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?V.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class $w{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&kr(r.mutation,s,He.empty(),Ie.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,te()).next(()=>r))}getLocalViewOfDocuments(e,t,r=te()){const s=rn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Tr();return i.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=rn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,te()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=wt();const a=Pr(),c=function(){return Pr()}();return t.forEach((u,d)=>{const g=r.get(d.key);s.has(d.key)&&(g===void 0||g.mutation instanceof Yt)?i=i.insert(d.key,d):g!==void 0?(a.set(d.key,g.mutation.getFieldMask()),kr(g.mutation,d,g.mutation.getFieldMask(),Ie.now())):a.set(d.key,He.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,g)=>a.set(d,g)),t.forEach((d,g)=>{var v;return c.set(d,new $w(g,(v=a.get(d))!==null&&v!==void 0?v:null))}),c))}recalculateAndSaveOverlays(e,t){const r=Pr();let s=new de((a,c)=>a-c),i=te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let g=r.get(u)||He.empty();g=c.applyToLocalView(d,g),r.set(u,g);const v=(s.get(c.batchId)||te()).add(u);s=s.insert(c.batchId,v)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,g=u.value,v=Jd();g.forEach(T=>{if(!i.has(T)){const R=sf(t.get(T),r.get(T));R!==null&&v.set(T,R),i=i.add(T)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,v))}return V.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return z.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Wa(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):V.resolve(rn());let c=Fr,u=i;return a.next(d=>V.forEach(d,(g,v)=>(c<v.largestBatchId&&(c=v.largestBatchId),i.get(g)?V.resolve():this.remoteDocumentCache.getEntry(e,g).next(T=>{u=u.insert(g,T)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,te())).next(g=>({batchId:c,changes:Yd(g)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new z(t)).next(r=>{let s=Tr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Tr();return this.indexManager.getCollectionParents(e,i).next(c=>V.forEach(c,u=>{const d=function(v,T){return new pn(T,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(g=>{g.forEach((v,T)=>{a=a.insert(v,T)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const g=d.getKey();a.get(g)===null&&(a=a.insert(g,xe.newInvalidDocument(g)))});let c=Tr();return a.forEach((u,d)=>{const g=i.get(u);g!==void 0&&kr(g.mutation,d,He.empty(),Ie.now()),Bi(t,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return V.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:st(s.createTime)}}(t)),V.resolve()}getNamedQuery(e,t){return V.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:Nw(s.bundledQuery),readTime:st(s.readTime)}}(t)),V.resolve()}}/**
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
 */class qw{constructor(){this.overlays=new de(z.comparator),this.Rr=new Map}getOverlay(e,t){return V.resolve(this.overlays.get(t))}getOverlays(e,t){const r=rn();return V.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),V.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),V.resolve()}getOverlaysForCollection(e,t,r){const s=rn(),i=t.length+1,a=new z(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return V.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new de((d,g)=>d-g);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let g=i.get(d.largestBatchId);g===null&&(g=rn(),i=i.insert(d.largestBatchId,g)),g.set(d.getKey(),d)}}const c=rn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,g)=>c.set(d,g)),!(c.size()>=s)););return V.resolve(c)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new cw(t,r));let i=this.Rr.get(t);i===void 0&&(i=te(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
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
 */class zw{constructor(){this.sessionToken=Pe.EMPTY_BYTE_STRING}getSessionToken(e){return V.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(){this.Vr=new Te(be.mr),this.gr=new Te(be.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new be(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new be(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new z(new le([])),r=new be(t,e),s=new be(t,e+1),i=[];return this.gr.forEachInRange([r,s],a=>{this.wr(a),i.push(a.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new z(new le([])),r=new be(t,e),s=new be(t,e+1);let i=te();return this.gr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new be(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class be{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return z.comparator(e.key,t.key)||ee(e.Cr,t.Cr)}static pr(e,t){return ee(e.Cr,t.Cr)||z.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new Te(be.mr)}checkEmpty(e){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new aw(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Mr=this.Mr.add(new be(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return V.resolve(a)}lookupMutationBatch(e,t){return V.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return V.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?ja:this.Fr-1)}getAllMutationBatches(e){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new be(t,0),s=new be(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],a=>{const c=this.Or(a.Cr);i.push(c)}),V.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Te(ee);return t.forEach(s=>{const i=new be(s,0),a=new be(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,a],c=>{r=r.add(c.Cr)})}),V.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;z.isDocumentKey(i)||(i=i.child(""));const a=new be(new z(i),0);let c=new Te(ee);return this.Mr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(u.Cr)),!0)},a),V.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ie(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return V.forEach(t.mutations,s=>{const i=new be(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new be(t,0),s=this.Mr.firstAfterOrEqual(r);return V.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,V.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(e){this.kr=e,this.docs=function(){return new de(z.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return V.resolve(r?r.document.mutableCopy():xe.newInvalidDocument(t))}getEntries(e,t){let r=wt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():xe.newInvalidDocument(s))}),V.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=wt();const a=t.path,c=new z(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:g}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Iv(Ev(g),r)<=0||(s.has(g.key)||Bi(t,g))&&(i=i.insert(g.key,g.mutableCopy()))}return V.resolve(i)}getAllFromCollectionGroup(e,t,r,s){K()}qr(e,t){return V.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Gw(this)}getSize(e){return V.resolve(this.size)}}class Gw extends Uw{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),V.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e){this.persistence=e,this.Qr=new mn(t=>za(t),Ha),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.$r=0,this.Ur=new Ja,this.targetCount=0,this.Kr=Wn.Un()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),V.resolve()}getLastRemoteSnapshotVersion(e){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return V.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),V.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new Wn(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,V.resolve()}updateTargetData(e,t){return this.zn(t),V.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,V.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),V.waitFor(i).next(()=>s)}getTargetCount(e){return V.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return V.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),V.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),V.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),V.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return V.resolve(r)}containsKey(e,t){return V.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new Li(0),this.zr=!1,this.zr=!0,this.jr=new zw,this.referenceDelegate=e(this),this.Hr=new Kw(this),this.indexManager=new Dw,this.remoteDocumentCache=function(s){return new Ww(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new kw(t),this.Yr=new jw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new qw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new Hw(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){$("MemoryPersistence","Starting transaction:",e);const s=new Qw(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return V.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class Qw extends Av{constructor(e){super(),this.currentSequenceNumber=e}}class Xa{constructor(e){this.persistence=e,this.ti=new Ja,this.ni=null}static ri(e){return new Xa(e)}get ii(){if(this.ni)return this.ni;throw K()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),V.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),V.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),V.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.ii,r=>{const s=z.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,Q.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return V.or([()=>V.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class gi{constructor(e,t){this.persistence=e,this.oi=new mn(r=>Sv(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Fw(this,t)}static ri(e,t){return new gi(e,t)}Zr(){}Xr(e){return V.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return V.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?V.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,a=>this.ar(e,a,t).next(c=>{c||(r++,i.removeEntry(a,Q.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),V.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),V.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),V.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),V.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Gs(e.data.value)),t}ar(e,t,r){return V.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return V.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=te(),s=te();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Za(e,t.fromCache,r,s)}}/**
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
 */class Yw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Jw{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return Nm()?8:bv(Me())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Yw;return this._s(e,t,a).next(c=>{if(i.result=c,this.Xi)return this.us(e,t,a,c.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(bn()<=Z.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",Rn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),V.resolve()):(bn()<=Z.DEBUG&&$("QueryEngine","Query:",Rn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(bn()<=Z.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",Rn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,nt(t))):V.resolve())}rs(e,t){if(Du(t))return V.resolve(null);let r=nt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=fi(t,null,"F"),r=nt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=te(...i);return this.ns.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.cs(t,c);return this.ls(t,d,a,u.readTime)?this.rs(e,fi(t,null,"F")):this.hs(e,d,t,u)}))})))}ss(e,t,r,s){return Du(t)||s.isEqual(Q.min())?V.resolve(null):this.ns.getDocuments(e,r).next(i=>{const a=this.cs(t,i);return this.ls(t,a,r,s)?V.resolve(null):(bn()<=Z.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Rn(t)),this.hs(e,a,t,wv(s,Fr)).next(c=>c))})}cs(e,t){let r=new Te(Kd(e));return t.forEach((s,i)=>{Bi(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return bn()<=Z.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",Rn(t)),this.ns.getDocumentsMatchingQuery(e,t,Bt.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="LocalStore",Xw=3e8;class Zw{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new de(ee),this.Is=new mn(i=>za(i),Ha),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Bw(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function eE(n,e,t,r){return new Zw(n,e,t,r)}async function wf(n,e){const t=Y(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let u=te();for(const d of s){a.push(d.batchId);for(const g of d.mutations)u=u.add(g.key)}for(const d of i){c.push(d.batchId);for(const g of d.mutations)u=u.add(g.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Rs:d,removedBatchIds:a,addedBatchIds:c}))})})}function tE(n,e){const t=Y(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,u,d,g){const v=d.batch,T=v.keys();let R=V.resolve();return T.forEach(D=>{R=R.next(()=>g.getEntry(u,D)).next(P=>{const k=d.docVersions.get(D);ie(k!==null),P.version.compareTo(k)<0&&(v.applyToRemoteDocument(P,d),P.isValidDocument()&&(P.setReadTime(d.commitVersion),g.addEntry(P)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(u,v))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=te();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Ef(n){const e=Y(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function nE(n,e){const t=Y(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const c=[];e.targetChanges.forEach((g,v)=>{const T=s.get(v);if(!T)return;c.push(t.Hr.removeMatchingKeys(i,g.removedDocuments,v).next(()=>t.Hr.addMatchingKeys(i,g.addedDocuments,v)));let R=T.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(v)!==null?R=R.withResumeToken(Pe.EMPTY_BYTE_STRING,Q.min()).withLastLimboFreeSnapshotVersion(Q.min()):g.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(g.resumeToken,r)),s=s.insert(v,R),function(P,k,B){return P.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=Xw?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0}(T,R,g)&&c.push(t.Hr.updateTargetData(i,R))});let u=wt(),d=te();if(e.documentUpdates.forEach(g=>{e.resolvedLimboDocuments.has(g)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,g))}),c.push(rE(i,a,e.documentUpdates).next(g=>{u=g.Vs,d=g.fs})),!r.isEqual(Q.min())){const g=t.Hr.getLastRemoteSnapshotVersion(i).next(v=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(g)}return V.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ts=s,i))}function rE(n,e,t){let r=te(),s=te();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=wt();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(Q.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):$(ec,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Vs:a,fs:s}})}function sE(n,e){const t=Y(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=ja),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function iE(n,e){const t=Y(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,V.resolve(s)):t.Hr.allocateTargetId(r).next(a=>(s=new Vt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function ma(n,e,t){const r=Y(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!nr(a))throw a;$(ec,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function Hu(n,e,t){const r=Y(n);let s=Q.min(),i=te();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,g){const v=Y(u),T=v.Is.get(g);return T!==void 0?V.resolve(v.Ts.get(T)):v.Hr.getTargetData(d,g)}(r,a,nt(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(a,c.targetId).next(u=>{i=u})}).next(()=>r.Ps.getDocumentsMatchingQuery(a,e,t?s:Q.min(),t?i:te())).next(c=>(oE(r,Wv(e),c),{documents:c,gs:i})))}function oE(n,e,t){let r=n.Es.get(e)||Q.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class Wu{constructor(){this.activeTargetIds=Xv()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class aE{constructor(){this.ho=new Wu,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new Wu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class cE{To(e){}shutdown(){}}/**
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
 */const Gu="ConnectivityMonitor";class Ku{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){$(Gu,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){$(Gu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ls=null;function ga(){return Ls===null?Ls=function(){return 268435456+Math.round(2147483648*Math.random())}():Ls++,"0x"+Ls.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo="RestConnection",lE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class uE{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===ui?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const a=ga(),c=this.bo(e,t.toUriEncodedString());$(Bo,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(u,s,i),this.vo(e,c,u,r).then(d=>($(Bo,`Received RPC '${e}' ${a}: `,d),d),d=>{throw Bn(Bo,`RPC '${e}' ${a} failed with error: `,d,"url: ",c,"request:",r),d})}Co(e,t,r,s,i,a){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+er}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=lE[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hE{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe="WebChannelConnection";class dE extends uE{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=ga();return new Promise((a,c)=>{const u=new Ad;u.setWithCredentials(!0),u.listenOnce(bd.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Ws.NO_ERROR:const g=u.getResponseJson();$(Oe,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(g)),a(g);break;case Ws.TIMEOUT:$(Oe,`RPC '${e}' ${i} timed out`),c(new U(N.DEADLINE_EXCEEDED,"Request time out"));break;case Ws.HTTP_ERROR:const v=u.getStatus();if($(Oe,`RPC '${e}' ${i} failed with status:`,v,"response text:",u.getResponseText()),v>0){let T=u.getResponseJson();Array.isArray(T)&&(T=T[0]);const R=T?.error;if(R&&R.status&&R.message){const D=function(k){const B=k.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(B)>=0?B:N.UNKNOWN}(R.status);c(new U(D,R.message))}else c(new U(N.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new U(N.UNAVAILABLE,"Connection failed."));break;default:K()}}finally{$(Oe,`RPC '${e}' ${i} completed.`)}});const d=JSON.stringify(s);$(Oe,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",d,r,15)})}Wo(e,t,r){const s=ga(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Cd(),c=Sd(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Do(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const g=i.join("");$(Oe,`Creating RPC '${e}' stream ${s}: ${g}`,u);const v=a.createWebChannel(g,u);let T=!1,R=!1;const D=new hE({Fo:k=>{R?$(Oe,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(T||($(Oe,`Opening RPC '${e}' stream ${s} transport.`),v.open(),T=!0),$(Oe,`RPC '${e}' stream ${s} sending:`,k),v.send(k))},Mo:()=>v.close()}),P=(k,B,L)=>{k.listen(B,j=>{try{L(j)}catch(H){setTimeout(()=>{throw H},0)}})};return P(v,Ir.EventType.OPEN,()=>{R||($(Oe,`RPC '${e}' stream ${s} transport opened.`),D.Qo())}),P(v,Ir.EventType.CLOSE,()=>{R||(R=!0,$(Oe,`RPC '${e}' stream ${s} transport closed`),D.Uo())}),P(v,Ir.EventType.ERROR,k=>{R||(R=!0,Bn(Oe,`RPC '${e}' stream ${s} transport errored:`,k),D.Uo(new U(N.UNAVAILABLE,"The operation could not be completed")))}),P(v,Ir.EventType.MESSAGE,k=>{var B;if(!R){const L=k.data[0];ie(!!L);const j=L,H=j?.error||((B=j[0])===null||B===void 0?void 0:B.error);if(H){$(Oe,`RPC '${e}' stream ${s} received error:`,H);const x=H.status;let S=function(p){const I=ve[p];if(I!==void 0)return cf(I)}(x),w=H.message;S===void 0&&(S=N.INTERNAL,w="Unknown error status: "+x+" with message "+H.message),R=!0,D.Uo(new U(S,w)),v.close()}else $(Oe,`RPC '${e}' stream ${s} received:`,L),D.Ko(L)}}),P(c,Rd.STAT_EVENT,k=>{k.stat===ra.PROXY?$(Oe,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===ra.NOPROXY&&$(Oe,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{D.$o()},0),D}}function jo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hi(n){return new gw(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&$("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qu="PersistentStream";class Tf{constructor(e,t,r,s,i,a,c,u){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new If(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===N.RESOURCE_EXHAUSTED?(vt(t.toString()),vt("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===N.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new U(N.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return $(Qu,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():($(Qu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class fE extends Tf{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=vw(this.serializer,e),r=function(i){if(!("targetChange"in i))return Q.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?Q.min():a.readTime?st(a.readTime):Q.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=pa(this.serializer),t.addTarget=function(i,a){let c;const u=a.target;if(c=la(u)?{documents:Iw(i,u)}:{query:Tw(i,u).ht},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=hf(i,a.resumeToken);const d=ha(i,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(Q.min())>0){c.readTime=mi(i,a.snapshotVersion.toTimestamp());const d=ha(i,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=bw(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=pa(this.serializer),t.removeTarget=e,this.I_(t)}}class pE extends Tf{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return ie(!!e.streamToken),this.lastStreamToken=e.streamToken,ie(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){ie(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=Ew(e.writeResults,e.commitTime),r=st(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=pa(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ww(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mE{}class gE extends mE{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new U(N.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.So(e,da(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(N.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Co(e,da(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(N.UNKNOWN,a.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class _E{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(vt(t),this.N_=!1):$("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn="RemoteStore";class yE{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(a=>{r.enqueueAndForget(async()=>{gn(this)&&($(hn,"Restarting streams for network reachability change."),await async function(u){const d=Y(u);d.W_.add(4),await os(d),d.j_.set("Unknown"),d.W_.delete(4),await Wi(d)}(this))})}),this.j_=new _E(r,s)}}async function Wi(n){if(gn(n))for(const e of n.G_)await e(!0)}async function os(n){for(const e of n.G_)await e(!1)}function Af(n,e){const t=Y(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),sc(t)?rc(t):rr(t).c_()&&nc(t,e))}function tc(n,e){const t=Y(n),r=rr(t);t.K_.delete(e),r.c_()&&bf(t,e),t.K_.size===0&&(r.c_()?r.P_():gn(t)&&t.j_.set("Unknown"))}function nc(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Q.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}rr(n).y_(e)}function bf(n,e){n.H_.Ne(e),rr(n).w_(e)}function rc(n){n.H_=new dw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),rr(n).start(),n.j_.B_()}function sc(n){return gn(n)&&!rr(n).u_()&&n.K_.size>0}function gn(n){return Y(n).W_.size===0}function Rf(n){n.H_=void 0}async function vE(n){n.j_.set("Online")}async function wE(n){n.K_.forEach((e,t)=>{nc(n,e)})}async function EE(n,e){Rf(n),sc(n)?(n.j_.q_(e),rc(n)):n.j_.set("Unknown")}async function IE(n,e,t){if(n.j_.set("Online"),e instanceof uf&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.K_.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.K_.delete(c),s.H_.removeTarget(c))}(n,e)}catch(r){$(hn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await _i(n,r)}else if(e instanceof Ys?n.H_.We(e):e instanceof lf?n.H_.Ze(e):n.H_.je(e),!t.isEqual(Q.min()))try{const r=await Ef(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.H_.ot(a);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const g=i.K_.get(d);g&&i.K_.set(d,g.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,d)=>{const g=i.K_.get(u);if(!g)return;i.K_.set(u,g.withResumeToken(Pe.EMPTY_BYTE_STRING,g.snapshotVersion)),bf(i,u);const v=new Vt(g.target,u,d,g.sequenceNumber);nc(i,v)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){$(hn,"Failed to raise snapshot:",r),await _i(n,r)}}async function _i(n,e,t){if(!nr(e))throw e;n.W_.add(1),await os(n),n.j_.set("Offline"),t||(t=()=>Ef(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{$(hn,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await Wi(n)})}function Sf(n,e){return e().catch(t=>_i(n,t,e))}async function Gi(n){const e=Y(n),t=Ht(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:ja;for(;TE(e);)try{const s=await sE(e.localStore,r);if(s===null){e.U_.length===0&&t.P_();break}r=s.batchId,AE(e,s)}catch(s){await _i(e,s)}Cf(e)&&Pf(e)}function TE(n){return gn(n)&&n.U_.length<10}function AE(n,e){n.U_.push(e);const t=Ht(n);t.c_()&&t.S_&&t.b_(e.mutations)}function Cf(n){return gn(n)&&!Ht(n).u_()&&n.U_.length>0}function Pf(n){Ht(n).start()}async function bE(n){Ht(n).C_()}async function RE(n){const e=Ht(n);for(const t of n.U_)e.b_(t.mutations)}async function SE(n,e,t){const r=n.U_.shift(),s=Ka.from(r,e,t);await Sf(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Gi(n)}async function CE(n,e){e&&Ht(n).S_&&await async function(r,s){if(function(a){return uw(a)&&a!==N.ABORTED}(s.code)){const i=r.U_.shift();Ht(r).h_(),await Sf(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Gi(r)}}(n,e),Cf(n)&&Pf(n)}async function Yu(n,e){const t=Y(n);t.asyncQueue.verifyOperationInProgress(),$(hn,"RemoteStore received new credentials");const r=gn(t);t.W_.add(3),await os(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await Wi(t)}async function PE(n,e){const t=Y(n);e?(t.W_.delete(2),await Wi(t)):e||(t.W_.add(2),await os(t),t.j_.set("Unknown"))}function rr(n){return n.J_||(n.J_=function(t,r,s){const i=Y(t);return i.M_(),new fE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:vE.bind(null,n),No:wE.bind(null,n),Lo:EE.bind(null,n),p_:IE.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),sc(n)?rc(n):n.j_.set("Unknown")):(await n.J_.stop(),Rf(n))})),n.J_}function Ht(n){return n.Y_||(n.Y_=function(t,r,s){const i=Y(t);return i.M_(),new pE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:bE.bind(null,n),Lo:CE.bind(null,n),D_:RE.bind(null,n),v_:SE.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await Gi(n)):(await n.Y_.stop(),n.U_.length>0&&($(hn,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new mt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new ic(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function oc(n,e){if(vt("AsyncQueue",`${e}: ${n}`),nr(n))return new U(N.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{static emptySet(e){return new Ln(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||z.comparator(t.key,r.key):(t,r)=>z.comparator(t.key,r.key),this.keyedMap=Tr(),this.sortedSet=new de(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ln)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Ln;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(){this.Z_=new de(z.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):K():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Gn{constructor(e,t,r,s,i,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new Gn(e,t,Ln.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&$i(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class NE{constructor(){this.queries=Xu(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=Y(t),i=s.queries;s.queries=Xu(),i.forEach((a,c)=>{for(const u of c.ta)u.onError(r)})})(this,new U(N.ABORTED,"Firestore shutting down"))}}function Xu(){return new mn(n=>Gd(n),$i)}async function ac(n,e){const t=Y(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new kE,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=oc(a,`Initialization of query '${Rn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&lc(t)}async function cc(n,e){const t=Y(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.ta.indexOf(e);a>=0&&(i.ta.splice(a,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function DE(n,e){const t=Y(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.ta)c.oa(s)&&(r=!0);a.ea=s}}r&&lc(t)}function VE(n,e,t){const r=Y(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function lc(n){n.ia.forEach(e=>{e.next()})}var _a,Zu;(Zu=_a||(_a={}))._a="default",Zu.Cache="cache";class uc{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Gn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=Gn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==_a.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(e){this.key=e}}class Nf{constructor(e){this.key=e}}class OE{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=te(),this.mutatedKeys=te(),this.ya=Kd(e),this.wa=new Ln(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new Ju,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((g,v)=>{const T=s.get(g),R=Bi(this.query,v)?v:null,D=!!T&&this.mutatedKeys.has(T.key),P=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let k=!1;T&&R?T.data.isEqual(R.data)?D!==P&&(r.track({type:3,doc:R}),k=!0):this.va(T,R)||(r.track({type:2,doc:R}),k=!0,(u&&this.ya(R,u)>0||d&&this.ya(R,d)<0)&&(c=!0)):!T&&R?(r.track({type:0,doc:R}),k=!0):T&&!R&&(r.track({type:1,doc:T}),k=!0,(u||d)&&(c=!0)),k&&(R?(a=a.add(R),i=P?i.add(g):i.delete(g)):(a=a.delete(g),i=i.delete(g)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const g=this.query.limitType==="F"?a.last():a.first();a=a.delete(g.key),i=i.delete(g.key),r.track({type:1,doc:g})}return{wa:a,Da:r,ls:c,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const a=e.Da.X_();a.sort((g,v)=>function(R,D){const P=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K()}};return P(R)-P(D)}(g.type,v.type)||this.ya(g.doc,v.doc)),this.Ca(r),s=s!=null&&s;const c=t&&!s?this.Fa():[],u=this.pa.size===0&&this.current&&!s?1:0,d=u!==this.ga;return this.ga=u,a.length!==0||d?{snapshot:new Gn(this.query,e.wa,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new Ju,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=te(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new Nf(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new kf(r))}),t}Oa(e){this.fa=e.gs,this.pa=te();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return Gn.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const hc="SyncEngine";class LE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class xE{constructor(e){this.key=e,this.Ba=!1}}class ME{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.La={},this.ka=new mn(c=>Gd(c),$i),this.qa=new Map,this.Qa=new Set,this.$a=new de(z.comparator),this.Ua=new Map,this.Ka=new Ja,this.Wa={},this.Ga=new Map,this.za=Wn.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function FE(n,e,t=!0){const r=Mf(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await Df(r,e,t,!0),s}async function UE(n,e){const t=Mf(n);await Df(t,e,!0,!1)}async function Df(n,e,t,r){const s=await iE(n.localStore,nt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await $E(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Af(n.remoteStore,s),c}async function $E(n,e,t,r,s){n.Ha=(v,T,R)=>async function(P,k,B,L){let j=k.view.ba(B);j.ls&&(j=await Hu(P.localStore,k.query,!1).then(({documents:w})=>k.view.ba(w,j)));const H=L&&L.targetChanges.get(k.targetId),x=L&&L.targetMismatches.get(k.targetId)!=null,S=k.view.applyChanges(j,P.isPrimaryClient,H,x);return th(P,k.targetId,S.Ma),S.snapshot}(n,v,T,R);const i=await Hu(n.localStore,e,!0),a=new OE(e,i.gs),c=a.ba(i.documents),u=is.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(c,n.isPrimaryClient,u);th(n,t,d.Ma);const g=new LE(e,t,a);return n.ka.set(e,g),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),d.snapshot}async function BE(n,e,t){const r=Y(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(a=>!$i(a,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ma(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&tc(r.remoteStore,s.targetId),ya(r,s.targetId)}).catch(tr)):(ya(r,s.targetId),await ma(r.localStore,s.targetId,!0))}async function jE(n,e){const t=Y(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),tc(t.remoteStore,r.targetId))}async function qE(n,e,t){const r=YE(n);try{const s=await function(a,c){const u=Y(a),d=Ie.now(),g=c.reduce((R,D)=>R.add(D.key),te());let v,T;return u.persistence.runTransaction("Locally write mutations","readwrite",R=>{let D=wt(),P=te();return u.ds.getEntries(R,g).next(k=>{D=k,D.forEach((B,L)=>{L.isValidDocument()||(P=P.add(B))})}).next(()=>u.localDocuments.getOverlayedDocuments(R,D)).next(k=>{v=k;const B=[];for(const L of c){const j=iw(L,v.get(L.key).overlayedDocument);j!=null&&B.push(new Yt(L.key,j,$d(j.value.mapValue),rt.exists(!0)))}return u.mutationQueue.addMutationBatch(R,d,B,c)}).next(k=>{T=k;const B=k.applyToLocalDocumentSet(v,P);return u.documentOverlayCache.saveOverlays(R,k.batchId,B)})}).then(()=>({batchId:T.batchId,changes:Yd(v)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,u){let d=a.Wa[a.currentUser.toKey()];d||(d=new de(ee)),d=d.insert(c,u),a.Wa[a.currentUser.toKey()]=d}(r,s.batchId,t),await as(r,s.changes),await Gi(r.remoteStore)}catch(s){const i=oc(s,"Failed to persist write");t.reject(i)}}async function Vf(n,e){const t=Y(n);try{const r=await nE(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Ua.get(i);a&&(ie(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.Ba=!0:s.modifiedDocuments.size>0?ie(a.Ba):s.removedDocuments.size>0&&(ie(a.Ba),a.Ba=!1))}),await as(t,r,e)}catch(r){await tr(r)}}function eh(n,e,t){const r=Y(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,a)=>{const c=a.view.sa(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const u=Y(a);u.onlineState=c;let d=!1;u.queries.forEach((g,v)=>{for(const T of v.ta)T.sa(c)&&(d=!0)}),d&&lc(u)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function zE(n,e,t){const r=Y(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ua.get(e),i=s&&s.key;if(i){let a=new de(z.comparator);a=a.insert(i,xe.newNoDocument(i,Q.min()));const c=te().add(i),u=new zi(Q.min(),new Map,new de(ee),a,c);await Vf(r,u),r.$a=r.$a.remove(i),r.Ua.delete(e),dc(r)}else await ma(r.localStore,e,!1).then(()=>ya(r,e,t)).catch(tr)}async function HE(n,e){const t=Y(n),r=e.batch.batchId;try{const s=await tE(t.localStore,e);Lf(t,r,null),Of(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await as(t,s)}catch(s){await tr(s)}}async function WE(n,e,t){const r=Y(n);try{const s=await function(a,c){const u=Y(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let g;return u.mutationQueue.lookupMutationBatch(d,c).next(v=>(ie(v!==null),g=v.keys(),u.mutationQueue.removeMutationBatch(d,v))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,g,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,g)).next(()=>u.localDocuments.getDocuments(d,g))})}(r.localStore,e);Lf(r,e,t),Of(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await as(r,s)}catch(s){await tr(s)}}function Of(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function Lf(n,e,t){const r=Y(n);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function ya(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||xf(n,r)})}function xf(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(tc(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),dc(n))}function th(n,e,t){for(const r of t)r instanceof kf?(n.Ka.addReference(r.key,e),GE(n,r)):r instanceof Nf?($(hc,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||xf(n,r.key)):K()}function GE(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||($(hc,"New document in limbo: "+t),n.Qa.add(r),dc(n))}function dc(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new z(le.fromString(e)),r=n.za.next();n.Ua.set(r,new xE(t)),n.$a=n.$a.insert(t,r),Af(n.remoteStore,new Vt(nt(Ui(t.path)),r,"TargetPurposeLimboResolution",Li.ae))}}async function as(n,e,t){const r=Y(n),s=[],i=[],a=[];r.ka.isEmpty()||(r.ka.forEach((c,u)=>{a.push(r.Ha(u,e,t).then(d=>{var g;if((d||t)&&r.isPrimaryClient){const v=d?!d.fromCache:(g=t?.targetChanges.get(u.targetId))===null||g===void 0?void 0:g.current;r.sharedClientState.updateQueryState(u.targetId,v?"current":"not-current")}if(d){s.push(d);const v=Za.Yi(u.targetId,d);i.push(v)}}))}),await Promise.all(a),r.La.p_(s),await async function(u,d){const g=Y(u);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",v=>V.forEach(d,T=>V.forEach(T.Hi,R=>g.persistence.referenceDelegate.addReference(v,T.targetId,R)).next(()=>V.forEach(T.Ji,R=>g.persistence.referenceDelegate.removeReference(v,T.targetId,R)))))}catch(v){if(!nr(v))throw v;$(ec,"Failed to update sequence numbers: "+v)}for(const v of d){const T=v.targetId;if(!v.fromCache){const R=g.Ts.get(T),D=R.snapshotVersion,P=R.withLastLimboFreeSnapshotVersion(D);g.Ts=g.Ts.insert(T,P)}}}(r.localStore,i))}async function KE(n,e){const t=Y(n);if(!t.currentUser.isEqual(e)){$(hc,"User change. New user:",e.toKey());const r=await wf(t.localStore,e);t.currentUser=e,function(i,a){i.Ga.forEach(c=>{c.forEach(u=>{u.reject(new U(N.CANCELLED,a))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await as(t,r.Rs)}}function QE(n,e){const t=Y(n),r=t.Ua.get(e);if(r&&r.Ba)return te().add(r.key);{let s=te();const i=t.qa.get(e);if(!i)return s;for(const a of i){const c=t.ka.get(a);s=s.unionWith(c.view.Sa)}return s}}function Mf(n){const e=Y(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Vf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=QE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=zE.bind(null,e),e.La.p_=DE.bind(null,e.eventManager),e.La.Ja=VE.bind(null,e.eventManager),e}function YE(n){const e=Y(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=HE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=WE.bind(null,e),e}class yi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Hi(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return eE(this.persistence,new Jw,e.initialUser,this.serializer)}Xa(e){return new vf(Xa.ri,this.serializer)}Za(e){return new aE}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}yi.provider={build:()=>new yi};class JE extends yi{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){ie(this.persistence.referenceDelegate instanceof gi);const r=this.persistence.referenceDelegate.garbageCollector;return new xw(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?Be.withCacheSize(this.cacheSizeBytes):Be.DEFAULT;return new vf(r=>gi.ri(r,t),this.serializer)}}class va{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>eh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=KE.bind(null,this.syncEngine),await PE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new NE}()}createDatastore(e){const t=Hi(e.databaseInfo.databaseId),r=function(i){return new dE(i)}(e.databaseInfo);return function(i,a,c,u){return new gE(i,a,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new yE(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>eh(this.syncEngine,t,0),function(){return Ku.D()?new Ku:new cE}())}createSyncEngine(e,t){return function(s,i,a,c,u,d,g){const v=new ME(s,i,a,c,u,d);return g&&(v.ja=!0),v}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=Y(s);$(hn,"RemoteStore shutting down."),i.W_.add(5),await os(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}va.provider={build:()=>new va};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class fc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):vt("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt="FirestoreClient";class XE{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Le.UNAUTHENTICATED,this.clientId=kd.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{$(Wt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>($(Wt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new mt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=oc(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function qo(n,e){n.asyncQueue.verifyOperationInProgress(),$(Wt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await wf(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function nh(n,e){n.asyncQueue.verifyOperationInProgress();const t=await ZE(n);$(Wt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Yu(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Yu(e.remoteStore,s)),n._onlineComponents=e}async function ZE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$(Wt,"Using user provided OfflineComponentProvider");try{await qo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===N.FAILED_PRECONDITION||s.code===N.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Bn("Error using user provided cache. Falling back to memory cache: "+t),await qo(n,new yi)}}else $(Wt,"Using default OfflineComponentProvider"),await qo(n,new JE(void 0));return n._offlineComponents}async function Ff(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($(Wt,"Using user provided OnlineComponentProvider"),await nh(n,n._uninitializedComponentsProvider._online)):($(Wt,"Using default OnlineComponentProvider"),await nh(n,new va))),n._onlineComponents}function eI(n){return Ff(n).then(e=>e.syncEngine)}async function vi(n){const e=await Ff(n),t=e.eventManager;return t.onListen=FE.bind(null,e.syncEngine),t.onUnlisten=BE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=UE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=jE.bind(null,e.syncEngine),t}function tI(n,e,t={}){const r=new mt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const g=new fc({next:T=>{g.su(),a.enqueueAndForget(()=>cc(i,v));const R=T.docs.has(c);!R&&T.fromCache?d.reject(new U(N.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&T.fromCache&&u&&u.source==="server"?d.reject(new U(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),v=new uc(Ui(c.path),g,{includeMetadataChanges:!0,Ta:!0});return ac(i,v)}(await vi(n),n.asyncQueue,e,t,r)),r.promise}function nI(n,e,t={}){const r=new mt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const g=new fc({next:T=>{g.su(),a.enqueueAndForget(()=>cc(i,v)),T.fromCache&&u.source==="server"?d.reject(new U(N.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(T)},error:T=>d.reject(T)}),v=new uc(c,g,{includeMetadataChanges:!0,Ta:!0});return ac(i,v)}(await vi(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function Uf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $f(n,e,t){if(!t)throw new U(N.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function rI(n,e,t,r){if(e===!0&&r===!0)throw new U(N.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function sh(n){if(!z.isDocumentKey(n))throw new U(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ih(n){if(z.isDocumentKey(n))throw new U(N.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ki(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":K()}function Ye(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ki(n);throw new U(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function sI(n,e){if(e<=0)throw new U(N.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf="firestore.googleapis.com",oh=!0;class ah{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Bf,this.ssl=oh}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:oh;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=yf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ow)throw new U(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}rI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Uf((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new U(N.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new U(N.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new U(N.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Qi{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ah({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ah(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new dv;switch(r.type){case"firstParty":return new gv(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=rh.get(t);r&&($("ComponentProvider","Removing Datastore"),rh.delete(t),r.terminate())}(this),Promise.resolve()}}function iI(n,e,t,r={}){var s;const i=(n=Ye(n,Qi))._getSettings(),a=`${e}:${t}`;if(i.host!==Bf&&i.host!==a&&Bn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let c,u;if(typeof r.mockUserToken=="string")c=r.mockUserToken,u=Le.MOCK_USER;else{c=Am(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new U(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Le(d)}n._authCredentials=new fv(new Pd(c,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ot(this.firestore,e,this._query)}}class $e{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ft(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new $e(this.firestore,e,this._key)}}class Ft extends ot{constructor(e,t,r){super(e,t,Ui(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new $e(this.firestore,null,new z(e))}withConverter(e){return new Ft(this.firestore,e,this._path)}}function ke(n,e,...t){if(n=me(n),$f("collection","path",e),n instanceof Qi){const r=le.fromString(e,...t);return ih(r),new Ft(n,null,r)}{if(!(n instanceof $e||n instanceof Ft))throw new U(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(le.fromString(e,...t));return ih(r),new Ft(n.firestore,null,r)}}function at(n,e,...t){if(n=me(n),arguments.length===1&&(e=kd.newId()),$f("doc","path",e),n instanceof Qi){const r=le.fromString(e,...t);return sh(r),new $e(n,null,new z(r))}{if(!(n instanceof $e||n instanceof Ft))throw new U(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(le.fromString(e,...t));return sh(r),new $e(n.firestore,n instanceof Ft?n.converter:null,new z(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ch="AsyncQueue";class lh{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new If(this,"async_queue_retry"),this.Su=()=>{const r=jo();r&&$(ch,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=jo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=jo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new mt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!nr(e))throw e;$(ch,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw vt("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=ic.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&K()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function uh(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class dn extends Qi{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new lh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new lh(e),this._firestoreClient=void 0,await e}}}function oI(n,e){const t=typeof n=="object"?n:Na(),r=typeof n=="string"?n:ui,s=es(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Tm("firestore");i&&iI(s,...i)}return s}function Yi(n){if(n._terminated)throw new U(N.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||aI(n),n._firestoreClient}function aI(n){var e,t,r;const s=n._freezeSettings(),i=function(c,u,d,g){return new kv(c,u,d,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,Uf(g.experimentalLongPollingOptions),g.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new XE(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const u=c?._online.build();return{_offline:c?._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Kn(Pe.fromBase64String(e))}catch(t){throw new U(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Kn(Pe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ce(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}}/**
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
 */class mc{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cI=/^__.*__$/;class lI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Yt(e,this.data,this.fieldMask,t,this.fieldTransforms):new ss(e,this.data,t,this.fieldTransforms)}}class jf{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Yt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function qf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K()}}class gc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new gc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return wi(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(qf(this.Lu)&&cI.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class uI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Hi(e)}ju(e,t,r,s=!1){return new gc({Lu:e,methodName:t,zu:r,path:Ce.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Zi(n){const e=n._freezeSettings(),t=Hi(n._databaseId);return new uI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function hI(n,e,t,r,s,i={}){const a=n.ju(i.merge||i.mergeFields?2:0,e,t,s);yc("Data must be an object, but it was:",a,r);const c=Hf(r,a);let u,d;if(i.merge)u=new He(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const g=[];for(const v of i.mergeFields){const T=wa(e,v,t);if(!a.contains(T))throw new U(N.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);Gf(g,T)||g.push(T)}u=new He(g),d=a.fieldTransforms.filter(v=>u.covers(v.field))}else u=null,d=a.fieldTransforms;return new lI(new je(c),u,d)}class eo extends Xi{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof eo}}class _c extends Xi{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new Hr(e.serializer,Zd(e.serializer,this.Ju));return new tw(e.path,t)}isEqual(e){return e instanceof _c&&this.Ju===e.Ju}}function dI(n,e,t,r){const s=n.ju(1,e,t);yc("Data must be an object, but it was:",s,r);const i=[],a=je.empty();Qt(r,(u,d)=>{const g=vc(e,u,t);d=me(d);const v=s.Uu(g);if(d instanceof eo)i.push(g);else{const T=cs(d,v);T!=null&&(i.push(g),a.set(g,T))}});const c=new He(i);return new jf(a,c,s.fieldTransforms)}function fI(n,e,t,r,s,i){const a=n.ju(1,e,t),c=[wa(e,r,t)],u=[s];if(i.length%2!=0)throw new U(N.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<i.length;T+=2)c.push(wa(e,i[T])),u.push(i[T+1]);const d=[],g=je.empty();for(let T=c.length-1;T>=0;--T)if(!Gf(d,c[T])){const R=c[T];let D=u[T];D=me(D);const P=a.Uu(R);if(D instanceof eo)d.push(R);else{const k=cs(D,P);k!=null&&(d.push(R),g.set(R,k))}}const v=new He(d);return new jf(g,v,a.fieldTransforms)}function zf(n,e,t,r=!1){return cs(t,n.ju(r?4:3,e))}function cs(n,e){if(Wf(n=me(n)))return yc("Unsupported field value:",e,n),Hf(n,e);if(n instanceof Xi)return function(r,s){if(!qf(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let u=cs(c,s.Ku(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=me(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Zd(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ie.fromDate(r);return{timestampValue:mi(s.serializer,i)}}if(r instanceof Ie){const i=new Ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:mi(s.serializer,i)}}if(r instanceof pc)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Kn)return{bytesValue:hf(s.serializer,r._byteString)};if(r instanceof $e){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Wu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ya(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof mc)return function(a,c){return{mapValue:{fields:{[Fd]:{stringValue:Ud},[hi]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Ga(c.serializer,d)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${Ki(r)}`)}(n,e)}function Hf(n,e){const t={};return Dd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Qt(n,(r,s)=>{const i=cs(s,e.qu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Wf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ie||n instanceof pc||n instanceof Kn||n instanceof $e||n instanceof Xi||n instanceof mc)}function yc(n,e,t){if(!Wf(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=Ki(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function wa(n,e,t){if((e=me(e))instanceof Ji)return e._internalPath;if(typeof e=="string")return vc(n,e);throw wi("Field path arguments must be of type string or ",n,!1,void 0,t)}const pI=new RegExp("[~\\*/\\[\\]]");function vc(n,e,t){if(e.search(pI)>=0)throw wi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ji(...e.split("."))._internalPath}catch{throw wi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function wi(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new U(N.INVALID_ARGUMENT,c+n+u)}function Gf(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new $e(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new mI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(to("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class mI extends wc{data(){return super.data()}}function to(n,e){return typeof e=="string"?vc(n,e):e instanceof Ji?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(N.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ec{}class no extends Ec{}function Et(n,e,...t){let r=[];e instanceof Ec&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof Ic).length,c=i.filter(u=>u instanceof ro).length;if(a>1||a>0&&c>0)throw new U(N.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class ro extends no{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ro(e,t,r)}_apply(e){const t=this._parse(e);return Qf(e._query,t),new ot(e.firestore,e.converter,ua(e._query,t))}_parse(e){const t=Zi(e.firestore);return function(i,a,c,u,d,g,v){let T;if(d.isKeyField()){if(g==="array-contains"||g==="array-contains-any")throw new U(N.INVALID_ARGUMENT,`Invalid Query. You can't perform '${g}' queries on documentId().`);if(g==="in"||g==="not-in"){dh(v,g);const D=[];for(const P of v)D.push(hh(u,i,P));T={arrayValue:{values:D}}}else T=hh(u,i,v)}else g!=="in"&&g!=="not-in"&&g!=="array-contains-any"||dh(v,g),T=zf(c,a,v,g==="in"||g==="not-in");return we.create(d,g,T)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Ei(n,e,t){const r=e,s=to("where",n);return ro._create(s,r,t)}class Ic extends Ec{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ic(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Xe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const u of c)Qf(a,u),a=ua(a,u)}(e._query,t),new ot(e.firestore,e.converter,ua(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Tc extends no{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Tc(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new U(N.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new U(N.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new jr(i,a)}(e._query,this._field,this._direction);return new ot(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new pn(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function It(n,e="asc"){const t=e,r=to("orderBy",n);return Tc._create(r,t)}class Ac extends no{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Ac(e,t,r)}_apply(e){return new ot(e.firestore,e.converter,fi(e._query,this._limit,this._limitType))}}function Gt(n){return sI("limit",n),Ac._create("limit",n,"F")}class bc extends no{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new bc(e,t,r)}_apply(e){const t=_I(e,this.type,this._docOrFields,this._inclusive);return new ot(e.firestore,e.converter,function(s,i){return new pn(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function gI(...n){return bc._create("startAfter",n,!1)}function _I(n,e,t,r){if(t[0]=me(t[0]),t[0]instanceof wc)return function(i,a,c,u,d){if(!u)throw new U(N.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const g=[];for(const v of On(i))if(v.field.isKeyField())g.push(di(a,u.key));else{const T=u.data.field(v.field);if(Mi(T))throw new U(N.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+v.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(T===null){const R=v.field.canonicalString();throw new U(N.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${R}' (used as the orderBy) does not exist.`)}g.push(T)}return new Hn(g,d)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=Zi(n.firestore);return function(a,c,u,d,g,v){const T=a.explicitOrderBy;if(g.length>T.length)throw new U(N.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const R=[];for(let D=0;D<g.length;D++){const P=g[D];if(T[D].field.isKeyField()){if(typeof P!="string")throw new U(N.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof P}`);if(!Wa(a)&&P.indexOf("/")!==-1)throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${P}' contains a slash.`);const k=a.path.child(le.fromString(P));if(!z.isDocumentKey(k))throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${k}' is not because it contains an odd number of segments.`);const B=new z(k);R.push(di(c,B))}else{const k=zf(u,d,P);R.push(k)}}return new Hn(R,v)}(n._query,n.firestore._databaseId,s,e,t,r)}}function hh(n,e,t){if(typeof(t=me(t))=="string"){if(t==="")throw new U(N.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Wa(e)&&t.indexOf("/")!==-1)throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(le.fromString(t));if(!z.isDocumentKey(r))throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return di(n,new z(r))}if(t instanceof $e)return di(n,t._key);throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ki(t)}.`)}function dh(n,e){if(!Array.isArray(n)||n.length===0)throw new U(N.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Qf(n,e){const t=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(N.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(N.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class yI{convertValue(e,t="none"){switch(zt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ye(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(qt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw K()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Qt(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[hi].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>ye(a.doubleValue));return new mc(i)}convertGeoPoint(e){return new pc(ye(e.latitude),ye(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Fi(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ur(e));default:return null}}convertTimestamp(e){const t=jt(e);return new Ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=le.fromString(e);ie(_f(r));const s=new $r(r.get(1),r.get(3)),i=new z(r.popFirst(5));return s.isEqual(t)||vt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vI(n,e,t){let r;return r=n?n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Yf extends wc{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Js(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(to("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Js extends Yf{data(e={}){return super.data(e)}}class Jf{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new br(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Js(this._firestore,this._userDataWriter,r.key,r,new br(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const u=new Js(s._firestore,s._userDataWriter,c.doc.key,c.doc,new br(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new Js(s._firestore,s._userDataWriter,c.doc.key,c.doc,new br(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,g=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),g=a.indexOf(c.doc.key)),{type:wI(c.type),doc:u,oldIndex:d,newIndex:g}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function wI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(n){n=Ye(n,$e);const e=Ye(n.firestore,dn);return tI(Yi(e),n._key).then(t=>ep(e,n,t))}class Rc extends yI{constructor(e){super(),this.firestore=e}convertBytes(e){return new Kn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new $e(this.firestore,null,t)}}function Wr(n){n=Ye(n,ot);const e=Ye(n.firestore,dn),t=Yi(e),r=new Rc(e);return Kf(n._query),nI(t,n._query).then(s=>new Jf(e,r,n,s))}function _n(n,e,t,...r){n=Ye(n,$e);const s=Ye(n.firestore,dn),i=Zi(s);let a;return a=typeof(e=me(e))=="string"||e instanceof Ji?fI(i,"updateDoc",n._key,e,t,r):dI(i,"updateDoc",n._key,e),Zf(s,[a.toMutation(n._key,rt.exists(!0))])}function yn(n,e){const t=Ye(n.firestore,dn),r=at(n),s=vI(n.converter,e);return Zf(t,[hI(Zi(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,rt.exists(!1))]).then(()=>r)}function ls(n,...e){var t,r,s;n=me(n);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||uh(e[a])||(i=e[a],a++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(uh(e[a])){const v=e[a];e[a]=(t=v.next)===null||t===void 0?void 0:t.bind(v),e[a+1]=(r=v.error)===null||r===void 0?void 0:r.bind(v),e[a+2]=(s=v.complete)===null||s===void 0?void 0:s.bind(v)}let u,d,g;if(n instanceof $e)d=Ye(n.firestore,dn),g=Ui(n._key.path),u={next:v=>{e[a]&&e[a](ep(d,n,v))},error:e[a+1],complete:e[a+2]};else{const v=Ye(n,ot);d=Ye(v.firestore,dn),g=v._query;const T=new Rc(d);u={next:R=>{e[a]&&e[a](new Jf(d,T,v,R))},error:e[a+1],complete:e[a+2]},Kf(n._query)}return function(T,R,D,P){const k=new fc(P),B=new uc(R,k,D);return T.asyncQueue.enqueueAndForget(async()=>ac(await vi(T),B)),()=>{k.su(),T.asyncQueue.enqueueAndForget(async()=>cc(await vi(T),B))}}(Yi(d),g,c,u)}function Zf(n,e){return function(r,s){const i=new mt;return r.asyncQueue.enqueueAndForget(async()=>qE(await eI(r),s,i)),i.promise}(Yi(n),e)}function ep(n,e,t){const r=t.docs.get(e._key),s=new Rc(n);return new Yf(n,s,e._key,r,new br(t.hasPendingWrites,t.fromCache),e.converter)}function vn(n){return new _c("increment",n)}(function(e,t=!0){(function(s){er=s})(Jn),$t(new gt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new dn(new pv(r.getProvider("auth-internal")),new _v(a,r.getProvider("app-check-internal")),function(d,g){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new U(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new $r(d.options.projectId,g)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),pt(gu,_u,e),pt(gu,_u,"esm2017")})();var EI="firebase",II="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */pt(EI,II,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea=new Map,tp={activated:!1,tokenObservers:[]},TI={initialized:!1,enabled:!1};function Ae(n){return Ea.get(n)||Object.assign({},tp)}function AI(n,e){return Ea.set(n,e),Ea.get(n)}function so(){return TI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const np="https://content-firebaseappcheck.googleapis.com/v1",bI="exchangeRecaptchaV3Token",RI="exchangeDebugToken",fh={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},SI=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CI{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Or,this.pending.promise.catch(t=>{}),await PI(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Or,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function PI(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kI={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},qe=new Yn("appCheck","AppCheck",kI);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ph(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function Sc(n){if(!Ae(n).activated)throw qe.create("use-before-activation",{appName:n.name})}function rp(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let a="";return t&&(a+=xs(t)+"d:"),r&&(a+=xs(r)+"h:"),a+=xs(s)+"m:"+xs(i)+"s",a}function xs(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cc({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const v=await s.getHeartbeatsHeader();v&&(r["X-Firebase-Client"]=v)}const i={method:"POST",body:JSON.stringify(e),headers:r};let a;try{a=await fetch(n,i)}catch(v){throw qe.create("fetch-network-error",{originalErrorMessage:v?.message})}if(a.status!==200)throw qe.create("fetch-status-error",{httpStatus:a.status});let c;try{c=await a.json()}catch(v){throw qe.create("fetch-parse-error",{originalErrorMessage:v?.message})}const u=c.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw qe.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const d=Number(u[1])*1e3,g=Date.now();return{token:c.token,expireTimeMillis:g+d,issuedAtTimeMillis:g}}function NI(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${np}/projects/${t}/apps/${r}:${bI}?key=${s}`,body:{recaptcha_v3_token:e}}}function sp(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${np}/projects/${t}/apps/${r}:${RI}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DI="firebase-app-check-database",VI=1,Gr="firebase-app-check-store",ip="debug-token";let Ms=null;function op(){return Ms||(Ms=new Promise((n,e)=>{try{const t=indexedDB.open(DI,VI);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(qe.create("storage-open",{originalErrorMessage:(s=r.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Gr,{keyPath:"compositeKey"})}}}catch(t){e(qe.create("storage-open",{originalErrorMessage:t?.message}))}}),Ms)}function OI(n){return cp(lp(n))}function LI(n,e){return ap(lp(n),e)}function xI(n){return ap(ip,n)}function MI(){return cp(ip)}async function ap(n,e){const r=(await op()).transaction(Gr,"readwrite"),i=r.objectStore(Gr).put({compositeKey:n,value:e});return new Promise((a,c)=>{i.onsuccess=u=>{a()},r.onerror=u=>{var d;c(qe.create("storage-set",{originalErrorMessage:(d=u.target.error)===null||d===void 0?void 0:d.message}))}})}async function cp(n){const t=(await op()).transaction(Gr,"readonly"),s=t.objectStore(Gr).get(n);return new Promise((i,a)=>{s.onsuccess=c=>{const u=c.target.result;i(u?u.value:void 0)},t.onerror=c=>{var u;a(qe.create("storage-get",{originalErrorMessage:(u=c.target.error)===null||u===void 0?void 0:u.message}))}})}function lp(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kr=new ki("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FI(n){if(Pa()){let e;try{e=await OI(n)}catch(t){Kr.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function zo(n,e){return Pa()?LI(n,e).catch(t=>{Kr.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function UI(){let n;try{n=await MI()}catch{}if(n)return n;{const e=crypto.randomUUID();return xI(e).catch(t=>Kr.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pc(){return so().enabled}async function kc(){const n=so();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function $I(){const n=Vh(),e=so();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new Or;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(UI())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BI={error:"UNKNOWN_ERROR"};function jI(n){return Ca.encodeString(JSON.stringify(n),!1)}async function Ia(n,e=!1){const t=n.app;Sc(t);const r=Ae(t);let s=r.token,i;if(s&&!kn(s)&&(r.token=void 0,s=void 0),!s){const u=await r.cachedTokenPromise;u&&(kn(u)?s=u:await zo(t,void 0))}if(!e&&s&&kn(s))return{token:s.token};let a=!1;if(Pc()){r.exchangeTokenPromise||(r.exchangeTokenPromise=Cc(sp(t,await kc()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const u=await r.exchangeTokenPromise;return await zo(t,u),r.token=u,{token:u.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),s=await Ae(t).exchangeTokenPromise}catch(u){u.code==="appCheck/throttled"?Kr.warn(u.message):Kr.error(u),i=u}let c;return s?i?kn(s)?c={token:s.token,internalError:i}:c=gh(i):(c={token:s.token},r.token=s,await zo(t,s)):c=gh(i),a&&dp(t,c),c}async function qI(n){const e=n.app;Sc(e);const{provider:t}=Ae(e);if(Pc()){const r=await kc(),{token:s}=await Cc(sp(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function up(n,e,t,r){const{app:s}=n,i=Ae(s),a={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,a],i.token&&kn(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),mh(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>mh(n))}function hp(n,e){const t=Ae(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function mh(n){const{app:e}=n,t=Ae(e);let r=t.tokenRefresher;r||(r=zI(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function zI(n){const{app:e}=n;return new CI(async()=>{const t=Ae(e);let r;if(t.token?r=await Ia(n,!0):r=await Ia(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=Ae(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},fh.RETRIAL_MIN_WAIT,fh.RETRIAL_MAX_WAIT)}function dp(n,e){const t=Ae(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function kn(n){return n.expireTimeMillis-Date.now()>0}function gh(n){return{token:jI(BI),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HI{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=Ae(this.app);for(const t of e)hp(this.app,t.next);return Promise.resolve()}}function WI(n,e){return new HI(n,e)}function GI(n){return{getToken:e=>Ia(n,e),getLimitedUseToken:()=>qI(n),addTokenListener:e=>up(n,"INTERNAL",e),removeTokenListener:e=>hp(n.app,e)}}const KI="@firebase/app-check",QI="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YI="https://www.google.com/recaptcha/api.js";function JI(n,e){const t=new Or,r=Ae(n);r.reCAPTCHAState={initialized:t};const s=XI(n),i=ph(!1);return i?_h(n,e,i,s,t):tT(()=>{const a=ph(!1);if(!a)throw new Error("no recaptcha");_h(n,e,a,s,t)}),t.promise}function _h(n,e,t,r,s){t.ready(()=>{eT(n,e,t,r),s.resolve(t)})}function XI(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function ZI(n){Sc(n);const t=await Ae(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=Ae(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function eT(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{Ae(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Ae(n).reCAPTCHAState.succeeded=!1}}),i=Ae(n);i.reCAPTCHAState=Object.assign(Object.assign({},i.reCAPTCHAState),{widgetId:s})}function tT(n){const e=document.createElement("script");e.src=YI,e.onload=n,document.head.appendChild(e)}/**
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
 */class Nc{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;rT(this._throttleData);const s=await ZI(this._app).catch(a=>{throw qe.create("recaptcha-error")});if(!(!((e=Ae(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw qe.create("recaptcha-error");let i;try{i=await Cc(NI(this._app,s),this._heartbeatServiceProvider)}catch(a){throw!((t=a.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=nT(Number((r=a.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),qe.create("throttled",{time:rp(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):a}return this._throttleData=null,i}initialize(e){this._app=e,this._heartbeatServiceProvider=es(e,"heartbeat"),JI(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Nc?this._siteKey===e._siteKey:!1}}function nT(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+SI,httpStatus:n};{const t=e?e.backoffCount:0,r=zm(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function rT(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw qe.create("throttled",{time:rp(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sT(n=Na(),e){n=me(n);const t=es(n,"app-check");if(so().initialized||$I(),Pc()&&kc().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw qe.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return iT(n,e.provider,e.isTokenAutoRefreshEnabled),Ae(n).isTokenAutoRefreshEnabled&&up(r,"INTERNAL",()=>{}),r}function iT(n,e,t){const r=AI(n,Object.assign({},tp));r.activated=!0,r.provider=e,r.cachedTokenPromise=FI(n).then(s=>(s&&kn(s)&&(r.token=s,dp(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const oT="app-check",yh="app-check-internal";function aT(){$t(new gt(oT,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return WI(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(yh).initialize()})),$t(new gt(yh,n=>{const e=n.getProvider("app-check").getImmediate();return GI(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),pt(KI,QI)}aT();const cT={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},lT="altorra-crm",Dc=Uh(cT,lT);sT(Dc,{provider:new Nc("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const Ii=uv(Dc),ue=oI(Dc);function Nr(n){const e=q.get().permissions||[];return e.includes("*")||e.includes(n)}function uT(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function hT(n){try{const e=await Xf(at(ue,"usuarios",n.uid)),t=e.exists()?e.data():null;q.set({user:n,profile:t,permissions:uT(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),q.set({user:n,profile:null,permissions:[],ready:!0})}}function dT(){Y_(Ii,pd).catch(()=>{}),Z_(Ii,n=>{n?hT(n):q.set({user:null,profile:null,permissions:[],ready:!0})})}const fT={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function pT(n,e){q.set({authError:null});try{await Q_(Ii,String(n).trim(),e)}catch(t){const r=fT[t&&t.code]||"No se pudo iniciar sesión.";throw q.set({authError:r}),t}}async function mT(){if(q.get().mock){q.set({user:null,profile:null,permissions:[]});return}await ey(Ii)}function Ho(){const{profile:n,user:e}=q.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function gT(){const{profile:n}=q.get();return n&&(n.cargo||n.roleName)||"Asesor"}const _T=["bandeja","pipeline","agenda","reportes","contactos"];function fp(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return _T.includes(e)?e:"bandeja"}function yT(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function vT(n){const e=()=>n(fp());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function f(n,e={},t=[]){const r=document.createElement(n);for(const[s,i]of Object.entries(e))i==null||i===!1||(s==="class"?r.className=i:s==="html"?r.innerHTML=i:s==="text"?r.textContent=i:s==="dataset"?Object.assign(r.dataset,i):s==="style"&&typeof i=="object"?Object.assign(r.style,i):s.startsWith("on")&&typeof i=="function"?r.addEventListener(s.slice(2).toLowerCase(),i):r.setAttribute(s,i===!0?"":String(i)));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function ce(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let xn=null;function pp(n){xn&&!xn.contains(n.target)&&Ti()}function mp(n){n.key==="Escape"&&Ti()}function Ti(){xn&&(xn.remove(),xn=null,document.removeEventListener("mousedown",pp,!0),window.removeEventListener("keydown",mp,!0))}function cn(n,e,t,r={}){Ti();const s=f("div",{class:"popover",role:"menu"});r.title&&s.append(f("div",{class:"popover__title",text:r.title})),e.forEach(a=>{if(a.divider){s.append(f("div",{class:"popover__divider"}));return}const c=f("button",{class:"popover__item"+(a.active?" is-active":""),type:"button",role:"menuitem"},[a.icon?f("span",{class:"popover__icon",text:a.icon}):null,f("span",{class:"u-grow u-truncate",text:a.label}),a.hint?f("span",{class:"popover__hint u-caption",text:a.hint}):null]);c.addEventListener("click",u=>{u.stopPropagation(),Ti(),t(a)}),s.append(c)}),document.body.append(s),wT(s,n),xn=s,setTimeout(()=>{document.addEventListener("mousedown",pp,!0),window.addEventListener("keydown",mp,!0)},0);const i=s.querySelector(".popover__item");i&&i.focus()}function wT(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,s=n.offsetHeight;let i=t.bottom+6,a=t.right-r;a<8&&(a=8),a+r>window.innerWidth-8&&(a=window.innerWidth-r-8),i+s>window.innerHeight-8&&(i=t.top-s-6),n.style.top=`${Math.max(8,i)}px`,n.style.left=`${Math.max(8,a)}px`}function us(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function ET(n){return String(n||"").replace(/\D/g,"")}function gp(n,e){const t=ET(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function _p(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function Qn(n){const e=_p(n);return e===1/0?1/0:e/864e5}function Mn(n){const e=_p(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const s=Math.floor(r/24);return s===1?"ayer":s<7?`hace ${s} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function IT(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function vh(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),s=t%60;return s?`${r} h ${s} min`:`${r} h`}function Rr(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function Ai(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const TT="0.4.1",AT=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0}],Wo={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos"};function bT(n){const e={},t=f("div",{class:"sidebar__brand"},[f("span",{class:"sidebar__logo",text:"ALTORRA"}),f("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=f("nav",{class:"sidebar__nav","aria-label":"Secciones"});AT.forEach(P=>{const k=f("button",{class:"navitem",type:"button",disabled:!P.ready},[f("span",{class:"navitem__icon","aria-hidden":"true",text:P.icon}),f("span",{class:"navitem__label",text:P.label}),P.ready?null:f("span",{class:"navitem__soon",text:"Pronto"})]);P.ready&&k.addEventListener("click",()=>yT(P.id)),e[P.id]=k,r.append(k)});const s=f("aside",{class:"sidebar"},[t,r,f("div",{class:"sidebar__foot u-caption u-faint"},[`v${TT} · Fase 4`])]),i=f("h1",{class:"topbar__h",text:Wo.bandeja}),a=f("span",{class:"topbar__crumb u-caption u-faint",text:q.get().mock?"modo demo":"tiempo real"}),c=f("div",{class:"topbar__title"},[i,a]),u=f("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[f("span",{"aria-hidden":"true",text:q.get().theme==="dark"?"☀️":"🌙"})]);u.addEventListener("click",()=>{const P=gm();u.firstChild.textContent=P==="dark"?"☀️":"🌙"});const d=f("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:us(Ho())}),f("span",{class:"usermenu__meta"},[f("span",{class:"usermenu__name u-truncate",text:Ho()}),f("span",{class:"usermenu__role u-caption u-faint u-truncate",text:gT()})])]);d.addEventListener("click",()=>{cn(d,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],P=>{P.value==="logout"&&mT()},{title:Ho()})});const g=f("header",{class:"topbar"},[c,f("div",{class:"topbar__actions u-row"},[u,d])]),v=f("main",{class:"outlet",id:"outlet"}),T=f("div",{id:"detail-root"}),R=f("div",{class:"app-shell"},[s,f("div",{class:"app-main"},[g,v]),T]);ce(n),n.removeAttribute("aria-busy"),n.append(R);function D(P){Object.entries(e).forEach(([k,B])=>{const L=k===P;B.classList.toggle("is-active",L),L?B.setAttribute("aria-current","page"):B.removeAttribute("aria-current")}),i.textContent=Wo[P]||Wo.bandeja}return{outlet:v,detailRoot:T,setActive:D}}function RT(n){const e=f("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=f("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=f("div",{class:"login__error",role:"alert",hidden:!0}),s=f("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),i=f("form",{class:"login__form"},[f("label",{class:"field"},[f("span",{class:"field__label",text:"Correo"}),e]),f("label",{class:"field"},[f("span",{class:"field__label",text:"Contraseña"}),t]),r,s]);i.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,s.disabled=!0,s.textContent="Entrando…";try{await pT(e.value,t.value)}catch{r.textContent=q.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,s.disabled=!1,s.textContent="Entrar"}});const a=f("div",{class:"login surface"},[f("div",{class:"login__brand"},[f("span",{class:"login__logo",text:"ALTORRA"}),f("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),f("h1",{class:"login__title",text:"Bienvenido"}),f("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),i,f("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);ce(n),n.removeAttribute("aria-busy"),n.append(f("div",{class:"login-wrap"},[a])),setTimeout(()=>e.focus(),50)}const ST=()=>document.getElementById("toast-root"),wh={ok:"✓",error:"⚠",info:"ℹ"};function se(n,e="info",t=3200){const r=ST();if(!r)return;const s=document.createElement("div");s.className=`toast toast--${e}`,s.setAttribute("role",e==="error"?"alert":"status");const i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.textContent=wh[e]||wh.info;const a=document.createElement("span");a.className="u-grow",a.textContent=n,s.append(i,a),r.appendChild(s);const c=()=>{s.classList.add("is-leaving"),s.addEventListener("animationend",()=>s.remove(),{once:!0})},u=setTimeout(c,t);s.addEventListener("click",()=>{clearTimeout(u),c()})}const CT=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],PT=["cita","test_drive","test-drive","visita","agendar","peritaje"],kT=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],NT=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],DT={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function io(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return NT.some(s=>e.includes(s)||t.includes(s))?r="pqr":t.includes("cita")||PT.some(s=>e.includes(s))?r="cita":kT.some(s=>e.includes(s))&&(r="solicitud"),{type:r,...DT[r]}}function Vc(n){const e=String(n.sourceDetail||"").toLowerCase();return CT.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const VT={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function Qr(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...VT[t]}}const OT=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],LT=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],Fs={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function yp(n){const e=Yr(n.status),{type:t}=io(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(Fs[t]||Fs.lead));const s=r-Date.now(),i=Fs[t]||Fs.lead;let a="ok";return e?a="ok":s<=0?a="late":s<i*.25&&(a="warn"),{state:a,dueAt:r,remainingMs:s,closed:e}}const Ta=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"calificado",label:"Calificado",badge:"ok"},{id:"no_calificado",label:"No calificado",badge:""},{id:"convertido",label:"Convertido",badge:"ok"},{id:"perdido",label:"Perdido",badge:"danger"}],xT=Ta.reduce((n,e)=>(n[e.id]=e,n),{});function Xs(n){return xT[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function Yr(n){return n==="convertido"||n==="perdido"||n==="no_calificado"}function vp(n){return!n.status||n.status==="nuevo"}const Aa={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},sn=n=>Math.max(0,Math.min(1,n));function MT(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return Vc(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),sn(t)}function FT(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const s=(r.match(/\d[\d.,]{5,}/g)||[]).map(i=>parseInt(i.replace(/\D/g,""),10)).filter(i=>i>0);s.length&&(e=Math.max(e,Math.max(...s)/5e7))}return sn(e)}function UT(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(Qn(r)>30||e.add(String(r).slice(0,10)))}return sn(e.size/8)}function wp(n,e=[],t=null){const r=Array.isArray(e)?e:[],s={intent:MT(n),interactions:sn(r.length/6),recency:n.lastActivityAt?sn(1-Qn(n.lastActivityAt)/30):0,frequency:UT(r),economic:FT(r),age:n.createdAt?sn(Qn(n.createdAt)/60):0,engagement:t&&Number(t.score)?sn(t.score/100):0};let i=0;for(const c of Object.keys(Aa))i+=s[c]*Aa[c];const a=Math.round(i*100);return{score:a,rating:$T(a),factors:s}}function $T(n){return n>=70?"hot":n>=40?"warm":"cold"}const Fn={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},Eh={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},BT=Aa;function Ep(n,e={}){const t=Number(e.score)||0,{type:r}=io(n),s=Qn(n.createdAt),i=Qn(n.lastActivityAt),a=vp(n),c=Yr(n.status),u=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&a,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&a&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:Vc(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:a&&s<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&i>=2&&i<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:i>=30&&i!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],g=u.filter(v=>v.when).sort((v,T)=>T.priority-v.priority)[0]||u[u.length-1];return{id:g.id,label:g.label,reason:g.reason,icon:g.icon,priority:g.priority}}function Ip(n,e=[]){const{score:t,rating:r,factors:s}=wp(n,e,null);return{...n,_score:t,_rating:r,_factors:s,_type:io(n),_channel:Qr(n),_sla:yp(n),_nba:Ep(n,{score:t})}}function Us(n){return n.map(e=>Ip(e))}const ba=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function Tp(n,e,t){switch(e){case"calientes":return vp(n)&&!Yr(n.status)&&(n._rating==="hot"||Vc(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!Yr(n.status);case"todo":default:return!0}}function jT(n,e){const t={};for(const r of ba)t[r.id]=0;for(const r of n)for(const s of ba)Tp(r,s.id,e)&&t[s.id]++;return t}const $s={late:0,warn:1,ok:2};function qT(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return $s[t]!==$s[r]?$s[t]-$s[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function zT(n,{type:e,channel:t,status:r}){return n.filter(s=>!(e&&s._type.type!==e||t&&s._channel.key!==t||r&&(s.status||"nuevo")!==r))}function HT(n,e){const t=Ai(e).trim();return t?n.filter(r=>Ai([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function WT(n,{queue:e,uid:t,filters:r,search:s}){let i=n.filter(a=>Tp(a,e,t));return i=zT(i,r),i=HT(i,s),i.sort(qT),i}const Oc=()=>new Date().toISOString(),Ap=n=>({id:n.id,...n.data()});function GT({pageSize:n=40,onData:e,onError:t}){let r=null;const s=Et(ke(ue,"leads"),It("createdAt","desc"),Gt(n));return{unsubscribe:ls(s,a=>{const c=a.docs.map(Ap);r=a.docs[a.docs.length-1]||null,e(c,{hasMore:a.size>=n})},a=>{t&&t(a)}),getLastDoc:()=>r}}async function KT({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=Et(ke(ue,"leads"),It("createdAt","desc"),gI(e),Gt(n)),r=await Wr(t);return{rows:r.docs.map(Ap),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function QT(){const e=(await Wr(ke(ue,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return q.set({team:e}),e}async function YT(n,e){await _n(at(ue,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:Oc(),updatedBy:bi(),_version:vn(1)})}async function JT(n,e,t={}){const r=Oc();await _n(at(ue,"leads",n),{status:e,lastActivityAt:r,updatedAt:r,updatedBy:bi(),_version:vn(1)}),await yn(ke(ue,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:bi(),createdAt:r,_version:1})}async function XT(n,{type:e="nota",subject:t="",body:r="",direction:s="outbound",name:i=""}){await yn(ke(ue,"activities"),{type:e,subject:t,body:r,status:"closed",direction:s,relatedTo:{type:"lead",id:n,name:i},ownerId:bi(),createdAt:Oc(),_version:1})}function bi(){const n=q.get().user;return n?n.uid:null}const ZT="ventas",oo=[{id:"nuevo",label:"Nuevo",prob:.1},{id:"contactado",label:"Contactado",prob:.2},{id:"cita_agendada",label:"Cita agendada",prob:.35},{id:"visito",label:"Visitó",prob:.5},{id:"test_drive",label:"Test drive",prob:.65},{id:"negociacion",label:"Negociación",prob:.8},{id:"financiacion",label:"Financiación",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],eA={id:"perdido",label:"Perdido",prob:0,lost:!0},Dr=oo.filter(n=>!n.won),bp=[...oo,eA].reduce((n,e)=>(n[e.id]=e,n),{});function Rp(n){return bp[n]||oo[0]}function Ri(n){const e=bp[n];return e?e.prob:0}function Lc(n){return Math.round((Number(n.amount)||0)*Ri(n.stageId))}function Sp(n){return n.reduce((e,t)=>e+(t.status==="open"?Lc(t):0),0)}function tA(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function nA(n,e=14){return n.status==="open"&&Qn(n.lastActivityAt)>e}function rA(n){const e={};for(const t of Dr)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}function xc(n){const e=n.vehicleOfInterestId||"",t=oo[0];return{name:(n.fullName||"Oportunidad")+(e?" · "+e:""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:e||null,vehicleName:e||"",pipelineId:ZT,stageId:t.id,stageName:t.label,status:"open",amount:0,currency:"COP",probability:t.prob,weightedAmount:0,expectedCloseDate:null,ownerId:n.ownerId||null,ownerName:n.ownerName||null,source:n.source||"web",nextStep:""}}const sr=()=>new Date().toISOString(),sA=n=>({id:n.id,...n.data()}),Ut=()=>q.get().user?q.get().user.uid:null;function ao(n,e,t){return yn(ke(ue,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:Ut(),createdAt:sr(),_version:1})}function iA({pageSize:n=100,onData:e,onError:t}){const r=Et(ke(ue,"deals"),Ei("status","==","open"),It("lastActivityAt","desc"),Gt(n));return ls(r,s=>e(s.docs.map(sA)),s=>t&&t(s))}async function Cp(n){const e=sr(),t=xc(n),r=await yn(ke(ue,"deals"),{...t,weightedAmount:0,lastActivityAt:e,createdAt:e,updatedAt:e,createdBy:Ut(),updatedBy:Ut(),_version:1});return await _n(at(ue,"leads",n.id),{status:"convertido",convertedTo:{dealId:r.id},lastActivityAt:e,updatedAt:e,updatedBy:Ut(),_version:vn(1)}),await ao(r.id,t.contactName,"Oportunidad creada desde lead"),r.id}async function oA(n,e,t={}){const r=sr(),s=Rp(e);await _n(at(ue,"deals",n),{stageId:e,stageName:s.label,probability:s.prob,weightedAmount:Math.round((Number(t.amount)||0)*s.prob),lastActivityAt:r,updatedAt:r,updatedBy:Ut(),_version:vn(1)}),await ao(n,t.contactName,"Etapa → "+s.label)}async function aA(n,e,t={}){const r=sr(),s=Math.max(0,Math.round(Number(e)||0));await _n(at(ue,"deals",n),{amount:s,weightedAmount:Math.round(s*Ri(t.stageId)),updatedAt:r,updatedBy:Ut(),_version:vn(1)})}async function cA(n,e={}){const t=sr();await _n(at(ue,"deals",n),{status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:t,updatedAt:t,updatedBy:Ut(),_version:vn(1)}),await ao(n,e.contactName,"🎉 Venta GANADA")}async function lA(n,e,t={}){const r=sr();await _n(at(ue,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"").trim()||"Sin motivo",lastActivityAt:r,updatedAt:r,updatedBy:Ut(),_version:vn(1)}),await ao(n,t.contactName,"Perdido: "+(e||"sin motivo"))}async function uA(n){const e=q.get().user?q.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await yn(ke(ue,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const on=n=>new Date(Date.now()-n*6e4).toISOString(),pe=n=>on(n*60),J=n=>on(n*60*24),hA=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],Mc=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:on(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:on(18),lastActivityAt:on(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:on(5),contactId:"email_casalcedo_outlook_com",createdAt:pe(1),lastActivityAt:pe(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:pe(-1),contactId:"email_diana_r_hotmail_com",createdAt:pe(5),lastActivityAt:pe(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:pe(-3),contactId:"phone_573044455667",createdAt:pe(8),lastActivityAt:pe(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:J(-1),contactId:"email_lauraortiz_gmail_com",createdAt:J(1),lastActivityAt:pe(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:J(-1),contactId:"email_pnarango_empresa_co",createdAt:J(2),lastActivityAt:J(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:J(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:J(4),lastActivityAt:J(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:J(-2),contactId:"email_afcuesta_gmail_com",createdAt:J(6),lastActivityAt:J(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:J(-10),contactId:"email_cata_rios_gmail_com",createdAt:J(12),lastActivityAt:J(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:pe(-2),contactId:"email_glopa_gmail_com",createdAt:pe(3),lastActivityAt:pe(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:J(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:J(10),lastActivityAt:J(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:J(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:J(15),lastActivityAt:J(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:J(19),contactId:"email_hdloaiza_gmail_com",createdAt:J(20),lastActivityAt:J(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:J(24),contactId:"email_pasuarez_gmail_com",createdAt:J(25),lastActivityAt:J(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:J(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:J(22),lastActivityAt:J(9),_version:4}],dA={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:on(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:pe(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:pe(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:pe(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:J(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:pe(20),_version:1}]},Jr={};Mc.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";Jr[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});Jr.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:J(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:J(3),lastActivityAt:J(3),_version:1};const Zs={},Si=()=>Mc.map(n=>({...n})),Pp=()=>hA.map(n=>({...n})),fA=n=>(dA[n]||[]).map(e=>({...e})),pA=n=>Jr[n]?{...Jr[n]}:null,mA=()=>Object.values(Jr).map(n=>({...n})),Ih=n=>(Zs[n]||[]).map(e=>({...e}));function gA(n,e){Zs[n]||(Zs[n]=[]),Zs[n].unshift({id:"n"+Date.now(),...e})}let _A=100;const Vr=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"contactado",stageName:"Contactado",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:pe(2),createdAt:pe(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_agendada",stageName:"Cita agendada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:pe(20),createdAt:J(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"test_drive",stageName:"Test drive",status:"open",amount:68e6,currency:"COP",probability:.65,weightedAmount:442e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:J(18),createdAt:J(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.8,weightedAmount:108e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:pe(6),createdAt:J(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"nuevo",stageName:"Nuevo",status:"open",amount:0,currency:"COP",probability:.1,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:pe(1),createdAt:pe(1),_version:1},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:J(3),createdAt:J(10),_version:6},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:J(5),createdAt:J(15),_version:7},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:J(9),createdAt:J(22),_version:4}],kp=()=>Vr.map(n=>({...n}));function Np(n){const e="d"+ ++_A;return Vr.unshift({id:e,...n}),e}function yA(n,e){const t=Vr.findIndex(r=>r.id===n);t>=0&&(Vr[t]={...Vr[t],...e})}const tn=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},Ra=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:tn(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:tn(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:tn(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:tn(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:tn(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:tn(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:tn(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],vA=()=>Ra.map(n=>({...n}));function wA(n){Ra.push({id:"ag"+(Ra.length+1),...n})}let EA=100;function IA(n){const e="lm"+ ++EA,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),s=(n.prefijoPais||"+57").replace(/\D/g,""),i=r?"+"+(r.startsWith(s)?r:s+r):"",a=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:a,phone:i,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:a?"email_"+a.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return Mc.unshift(c),e}function TA(){const n={},e=(v,T,R)=>f("label",{class:"field"},[f("span",{class:"field__label",text:v}),T,null]);n.nombre=f("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=f("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=f("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=f("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=f("select",{class:"select"},OT.map(v=>f("option",{value:v.id},[`${v.icon} ${v.label}`]))),n.interes=f("select",{class:"select"},LT.map(v=>f("option",{value:v.id},[v.label]))),n.trafico=f("select",{class:"select"},[f("option",{value:""},["— Tráfico —"]),f("option",{value:"organico"},["Orgánico"]),f("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=f("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=f("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=f("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=f("input",{type:"checkbox",checked:!0});const t=f("div",{class:"login__error",role:"alert",hidden:!0}),r=f("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),s=f("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),i=f("form",{class:"nl-form"},[e("Nombre *",n.nombre),f("div",{class:"nl-row"},[f("label",{class:"field",style:{flex:"0 0 auto"}},[f("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),f("label",{class:"field u-grow"},[f("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),f("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),f("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),f("label",{class:"nl-consent"},[n.consent,f("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,f("div",{class:"nl-actions"},[r,s])]),a=f("div",{class:"modal"},[f("div",{class:"modal__head"},[f("h2",{class:"modal__title",text:"＋ Nuevo lead"}),f("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),i]),c=f("div",{class:"modal-overlay"},[a]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const u=()=>{c.remove(),window.removeEventListener("keydown",d)},d=v=>{v.key==="Escape"&&u()};window.addEventListener("keydown",d),c.addEventListener("mousedown",v=>{v.target===c&&u()}),r.addEventListener("click",u),i.addEventListener("submit",async v=>{v.preventDefault(),t.hidden=!0;const T={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!T.nombre)return g("Escribe el nombre del cliente.");if(!T.email&&!T.telefono)return g("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");s.disabled=!0,s.textContent="Guardando…";try{q.get().mock?(IA(T),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await uA(T),se("✓ Lead agregado a la Bandeja","ok"),u()}catch{s.disabled=!1,s.textContent="Agregar lead",g("No se pudo agregar. Intenta de nuevo.")}});function g(v){return t.textContent=v,t.hidden=!1,!1}}const An={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>'};function Dp(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=Nr("crm.edit"),r=q.get().user&&q.get().user.uid,s=f("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),i=f("label",{class:"search","aria-label":"Buscar"},[f("span",{html:An.search,"aria-hidden":"true"}),f("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),a=f("div",{class:"inbox__filters"}),c=t?f("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["＋ Nuevo lead"]):null;c&&c.addEventListener("click",()=>TA());const u=f("div",{class:"inbox__toolbar"},[i,a,c]),d=f("div",{class:"inbox__list",role:"list",tabindex:"-1"}),g=f("section",{class:"inbox"},[s,u,d]);ce(n),n.append(g);const v=i.querySelector("input");v.addEventListener("input",()=>{e.search=v.value,x()});async function T(O,F){if(B(O.id,{ownerId:F?F.uid:null,ownerName:F?F.nombre:null}),q.get().mock){se(F?`Asignado a ${F.nombre}`:"Sin asignar","ok");return}try{await YT(O.id,F),se(F?`Asignado a ${F.nombre}`:"Sin asignar","ok")}catch{se("No se pudo asignar","error")}}async function R(O,F){if(B(O.id,{status:F,lastActivityAt:new Date().toISOString()}),q.get().mock){se(`Estado → ${Xs(F).label}`,"ok");return}try{await JT(O.id,F,O),se(`Estado → ${Xs(F).label}`,"ok")}catch{se("No se pudo cambiar el estado","error")}}function D(O){const F=gp(O.phone,AA(O));if(!F){se("Este lead no tiene teléfono","error");return}window.open(F,"_blank","noopener"),!q.get().mock&&t&&XT(O.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:O.fullName}).catch(()=>{})}async function P(O){if(O.status==="convertido"){se("Ya es una oportunidad","info");return}if(B(O.id,{status:"convertido"}),q.get().mock){Np(xc(O)),se("🎯 Convertido a oportunidad","ok");return}try{await Cp(O),se("🎯 Convertido a oportunidad","ok")}catch{se("No se pudo convertir","error")}}function k(){q.set({leads:e.leads})}function B(O,F){const W=e.leads.findIndex(oe=>oe.id===O);W!==-1&&(e.leads[W]=Ip({...e.leads[W],...F}),k(),L())}function L(){j(),H(),x()}function j(){const O=jT(e.leads,r);ce(s),ba.forEach(F=>{const W=e.queue===F.id,oe=f("button",{class:"chip"+(W?" chip--active":""),role:"tab","aria-selected":String(W),type:"button"},[f("span",{"aria-hidden":"true",text:F.icon}),f("span",{text:F.label}),f("span",{class:"chip__count",text:String(O[F.id]||0)})]);oe.addEventListener("click",()=>{e.queue=F.id,L()}),s.append(oe)})}function H(){if(ce(a),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...Ta.map(F=>[F.id,F.label])]}].forEach(F=>{const W=e.filters[F.key],oe=W?(F.items.find(ge=>ge[0]===W)||[,F.label])[1]:F.label,Ee=f("button",{class:"chip"+(W?" chip--active":""),type:"button","aria-haspopup":"menu"},[f("span",{text:oe}),f("span",{"aria-hidden":"true",text:"▾"})]);Ee.addEventListener("click",()=>{cn(Ee,F.items.map(([ge,ct])=>({value:ge,label:ct,active:ge===W})),ge=>{e.filters[F.key]=ge.value,L()},{title:F.label})}),a.append(Ee)}),e.filters.type||e.filters.channel||e.filters.status){const F=f("button",{class:"chip",type:"button"},["✕ Limpiar"]);F.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},L()}),a.append(F)}}function x(){if(e.loading)return A();if(e.error)return E("⚠️","No se pudo cargar",e.error);const O=WT(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search});if(ce(d),!O.length){const W=e.search||e.filters.type||e.filters.channel||e.filters.status;d.append(I("🗂️",W?"Sin resultados":"¡Bandeja al día!",W?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const F=f("div",{class:"inbox__listhead"},[f("span",{class:"u-muted u-caption",text:`${O.length} ${O.length===1?"cliente":"clientes"}`}),f("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"})]);if(d.append(F),O.forEach(W=>d.append(S(W))),e.hasMore&&e.queue==="todo"&&!e.search){const W=f("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);W.addEventListener("click",()=>y(W)),d.append(f("div",{class:"inbox__more"},[W]))}}function S(O){const F=Fn[O._rating],W=Xs(O.status),oe=O._sla,Ee=`sla-dot sla-dot--${oe.state}`,ge=oe.closed?"Cerrado":oe.state==="late"?`SLA vencido hace ${vh(oe.remainingMs)}`:`Responder en ${vh(oe.remainingMs)}`,ct=[O._type.icon+" "+O._type.label,O.sourceDetail,O.vehicleOfInterestId?"🚗 "+O.vehicleOfInterestId:""].filter(Boolean).join(" · "),We=f("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":O.id,"aria-label":`${O.fullName}, ${F.label}`},[f("span",{class:Ee,title:ge,"aria-label":ge}),f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:us(O.fullName)}),f("div",{class:"lead-card__main u-grow"},[f("div",{class:"lead-card__top"},[f("span",{class:"lead-card__name u-truncate",text:O.fullName}),f("span",{class:`temp ${F.cls}`,title:`Score ${O._score}/100`},[`${F.icon} ${O._score}`])]),f("div",{class:"lead-card__what u-truncate u-muted",text:ct}),f("div",{class:"lead-card__meta u-caption"},[f("span",{class:"lead-card__chan",text:`${O._channel.icon} ${O._channel.label}`}),f("span",{class:"lead-card__dot",text:"·"}),f("span",{text:Mn(O.createdAt)}),f("span",{class:"lead-card__dot",text:"·"}),f("span",{class:`badge badge--${W.badge||""}`.trim(),text:W.label}),O.ownerName?f("span",{class:"lead-card__dot",text:"·"}):null,O.ownerName?f("span",{class:"u-faint",text:"👤 "+O.ownerName}):null]),f("div",{class:"lead-card__nba"},[f("span",{"aria-hidden":"true",text:O._nba.icon}),f("span",{class:"u-muted",text:"Próx: "}),f("strong",{text:O._nba.label})])]),f("div",{class:"lead-card__actions"},[w("wa",An.wa,"WhatsApp","btn--wa"),t?w("assign",An.person,"Asignar"):null,t?w("status",An.flag,"Cambiar estado"):null,t?w("convert",An.convert,"Convertir a oportunidad"):null,w("open",An.expand,"Abrir 360")])]);return We.addEventListener("click",_e=>{const ir=_e.target.closest("[data-action]");if(ir){_(ir.dataset.action,O,ir);return}p(O.id)}),We.addEventListener("keydown",_e=>{_e.key==="Enter"?p(O.id):_e.key.toLowerCase()==="w"&&D(O)}),We}function w(O,F,W,oe=""){return f("button",{class:`icon-btn ${oe}`.trim(),type:"button","data-action":O,title:W,"aria-label":W},[f("span",{html:F,"aria-hidden":"true"})])}function _(O,F,W){if(O==="open")return p(F.id);if(O==="wa")return D(F);if(O==="convert")return P(F);if(O==="assign"){const oe=q.get().team||[],Ee=[{value:null,label:"Sin asignar",icon:"⊘",active:!F.ownerId},...oe.map(ge=>({value:ge,label:ge.nombre,hint:ge.cargo,icon:"👤",active:F.ownerId===ge.uid}))];return cn(W,Ee,ge=>T(F,ge.value),{title:"Asignar a"})}if(O==="status"){const oe=Ta.map(Ee=>({value:Ee.id,label:Ee.label,active:(F.status||"nuevo")===Ee.id}));return cn(W,oe,Ee=>R(F,Ee.value),{title:"Cambiar estado"})}}function p(O){q.set({detailLeadId:O})}function I(O,F,W){return f("div",{class:"state"},[f("div",{class:"state__icon","aria-hidden":"true",text:O}),f("div",{class:"state__title",text:F}),f("div",{class:"state__msg",text:W})])}function E(O,F,W){ce(d),d.append(I(O,F,W))}function A(){ce(d);for(let O=0;O<6;O++)d.append(f("div",{class:"lead-card lead-card--skeleton"},[f("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),f("div",{class:"u-grow u-stack",style:{gap:"8px"}},[f("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),f("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function y(O){if(e.cursor){O.disabled=!0,O.textContent="Cargando…";try{const{rows:F,lastDoc:W,hasMore:oe}=await KT({after:e.cursor}),Ee=Us(F),ge=new Set(e.leads.map(ct=>ct.id));e.leads.push(...Ee.filter(ct=>!ge.has(ct.id))),e.cursor=W,e.hasMore=oe,k(),L()}catch{se("No se pudo cargar más","error"),O.disabled=!1,O.textContent="Cargar más"}}}function X(){if(q.get().mock){q.set({team:Pp()}),e.leads=Us(Si()),e.loading=!1,e.hasMore=!1,k(),L(),e.dirtyHandler=()=>{e.leads=Us(Si()),k(),L()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}QT().catch(()=>{}),e.sub=GT({pageSize:40,onData:(O,F)=>{e.leads=Us(O),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=F.hasMore,e.loading=!1,e.error=null,k(),L()},onError:O=>{console.error("[inbox] error de suscripción:",O),e.loading=!1,e.error=O&&O.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",L()}})}return L(),X(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function AA(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}const bA=["Precio / presupuesto","Financiación negada","Compró en otro lado","No responde","Cambió de opinión","Otro motivo"];function RA(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null},t=Nr("crm.edit"),r=f("div",{class:"pipeline__bar"}),s=f("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),i=f("section",{class:"pipeline"},[r,s]);ce(n),n.append(i);function a(S,w){const _=e.deals.findIndex(p=>p.id===S);_!==-1&&(e.deals[_]={...e.deals[_],...w},q.get().mock&&yA(S,w),v())}async function c(S,w){if(S.stageId===w)return;const _=Rp(w);if(a(S.id,{stageId:w,stageName:_.label,probability:_.prob,lastActivityAt:new Date().toISOString()}),q.get().mock){se("Etapa → "+_.label,"ok");return}try{await oA(S.id,w,S)}catch{se("No se pudo mover","error")}}async function u(S,w){if(a(S.id,{amount:w}),!q.get().mock)try{await aA(S.id,w,S)}catch{se("No se pudo guardar el monto","error")}}async function d(S){if(a(S.id,{status:"won"}),q.get().mock){se("🎉 ¡Venta ganada!","ok");return}try{await cA(S.id,S),se("🎉 ¡Venta ganada!","ok")}catch{se("Error","error")}}async function g(S,w){if(a(S.id,{status:"lost",lostReason:w}),q.get().mock){se("Marcado perdido","info");return}try{await lA(S.id,w,S),se("Marcado perdido","info")}catch{se("Error","error")}}function v(){if(e.loading)return H();if(e.error)return j("⚠️","No se pudo cargar",e.error);const S=e.deals.filter(_=>_.status==="open");if(T(S),ce(s),!S.length){s.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🎯"}),f("div",{class:"state__title",text:"Embudo vacío"}),f("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const w=rA(S);Dr.forEach(_=>{const p=w[_.id]||[],I=p.reduce((A,y)=>A+(Number(y.amount)||0),0),E=f("div",{class:"pcol","data-stage":_.id},[f("div",{class:"pcol__head"},[f("div",{class:"u-row u-row--tight"},[f("span",{class:"pcol__dot",style:{background:SA(_.id)}}),f("strong",{text:_.label}),f("span",{class:"pcol__count",text:String(p.length)})]),f("span",{class:"u-caption u-faint",text:`${Math.round(_.prob*100)}% · ${Rr(I)||"$0"}`})]),f("div",{class:"pcol__drop","data-stage":_.id,role:"list"},p.map(D))]);L(E.querySelector(".pcol__drop"),_.id),s.append(E)})}function T(S){const w=Sp(S),_=tA(S);ce(r),r.append(R("Oportunidades",String(S.length)),R("Valor del embudo",Rr(_)||"$0"),R("Forecast ponderado",Rr(w)||"$0",!0))}function R(S,w,_){return f("div",{class:"pstat"+(_?" pstat--hi":"")},[f("span",{class:"u-caption u-faint",text:S}),f("strong",{class:"pstat__v",text:w})])}function D(S){const w=nA(S),_=f("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[S.amount?Rr(S.amount):"+ monto"]),p=f("article",{class:"deal-card"+(w?" is-rotting":""),draggable:"true",tabindex:"0","data-id":S.id,"data-stage":S.stageId,role:"listitem","aria-label":`${S.name}, ${Math.round(Ri(S.stageId)*100)}%`},[f("div",{class:"deal-card__top"},[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:us(S.contactName)}),f("span",{class:"deal-card__name u-grow u-truncate",text:S.name}),w?f("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),S.vehicleName?f("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+S.vehicleName}):null,f("div",{class:"deal-card__row"},[_,f("span",{class:"badge badge--gold",text:`${Math.round(Ri(S.stageId)*100)}%`})]),f("div",{class:"deal-card__foot u-caption u-faint"},[f("span",{class:"u-grow u-truncate",text:S.ownerName?"👤 "+S.ownerName:"Sin asesor"}),f("span",{text:Mn(S.lastActivityAt)})]),f("div",{class:"deal-card__actions"},t?[P("stage","↔","Mover etapa"),P("won","✓","Marcar ganado"),P("lost","✕","Marcar perdido"),P("open","⤢","Abrir 360")]:[P("open","⤢","Abrir 360")])]);return p.addEventListener("dragstart",I=>{e.dragId=S.id,p.classList.add("is-dragging");try{I.dataTransfer.setData("text/plain",S.id),I.dataTransfer.effectAllowed="move"}catch{}}),p.addEventListener("dragend",()=>{e.dragId=null,p.classList.remove("is-dragging")}),p.addEventListener("click",I=>{const E=I.target.closest("[data-action]");if(E)return k(E.dataset.action,S,E)}),p}function P(S,w,_){return f("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":S,title:_,"aria-label":_,draggable:"false"},[w])}function k(S,w,_){if(S==="open")return q.set({detailLeadId:w.leadId});if(S==="amount")return B(w,_);if(S==="stage")return cn(_,Dr.map(p=>({value:p.id,label:p.label,hint:Math.round(p.prob*100)+"%",active:p.id===w.stageId})),p=>c(w,p.value),{title:"Mover a etapa"});if(S==="won")return d(w);if(S==="lost")return cn(_,bA.map(p=>({value:p,label:p})),p=>g(w,p.value),{title:"Motivo de pérdida"})}function B(S,w){const _=f("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:S.amount||"","aria-label":"Monto en COP"});w.replaceWith(_),_.focus(),_.select();const p=()=>{const I=parseInt(String(_.value).replace(/\D/g,""),10)||0;u(S,I)};_.addEventListener("keydown",I=>{I.key==="Enter"?(I.preventDefault(),p()):I.key==="Escape"&&v()}),_.addEventListener("blur",p)}function L(S,w){S.addEventListener("dragover",_=>{_.preventDefault(),S.classList.add("is-over"),_.dataTransfer&&(_.dataTransfer.dropEffect="move")}),S.addEventListener("dragleave",()=>S.classList.remove("is-over")),S.addEventListener("drop",_=>{_.preventDefault(),S.classList.remove("is-over");const p=e.dragId||_.dataTransfer&&_.dataTransfer.getData("text/plain"),I=e.deals.find(E=>E.id===p);I&&c(I,w)})}function j(S,w,_){ce(s),s.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:S}),f("div",{class:"state__title",text:w}),f("div",{class:"state__msg",text:_})]))}function H(){ce(r),ce(s),Dr.slice(0,5).forEach(()=>{s.append(f("div",{class:"pcol"},[f("div",{class:"pcol__head"},[f("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),f("div",{class:"pcol__drop"},[1,2].map(()=>f("div",{class:"deal-card",style:{pointerEvents:"none"}},[f("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function x(){if(q.get().mock){e.deals=kp(),e.loading=!1,v();return}e.sub=iA({pageSize:150,onData:S=>{e.deals=S,e.loading=!1,e.error=null,v()},onError:S=>{e.loading=!1,e.error=S&&S.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",v()}})}return v(),x(),function(){e.sub&&e.sub(),e.sub=null}}function SA(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const CA=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],Th=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function Xr(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function Vp(n,e){const r=(new Date(n,e,1).getDay()+6)%7,s=new Date(n,e+1,0).getDate(),i=[];for(let c=0;c<r;c++)i.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=s;c++)i.push({date:new Date(n,e,c),inMonth:!0});for(;i.length%7!==0;){const c=i[i.length-1].date;i.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const a=[];for(let c=0;c<i.length;c+=7)a.push(i.slice(c,c+7));return a}function PA(n,e){const t=Vp(n,e),r=t[0][0].date,i=t[t.length-1][6].date,a=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);return{startISO:r.toISOString(),endISO:a.toISOString()}}function kA(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=Xr(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,s)=>new Date(r.dueAt)-new Date(s.dueAt));return e}function Ah(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function NA(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const DA=n=>({id:n.id,...n.data()}),VA=()=>q.get().user?q.get().user.uid:null;function OA(n,e,t,r){const s=Et(ke(ue,"activities"),Ei("dueAt",">=",n),Ei("dueAt","<",e),It("dueAt","asc"));return ls(s,i=>t(i.docs.map(DA)),i=>r&&r(i))}async function LA(n,e,t){return yn(ke(ue,"activities"),{type:"cita",subject:t||"Cita con "+(n.fullName||""),body:"",status:"open",direction:"outbound",dueAt:e,relatedTo:{type:"lead",id:n.id||null,name:n.fullName||""},ownerId:n.ownerId||VA(),createdAt:new Date().toISOString(),_version:1})}function xA(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=f("div",{class:"agenda__head"}),s=f("div",{class:"agenda__weekdays"},CA.map(P=>f("span",{class:"agenda__wd",text:P}))),i=f("div",{class:"agenda__grid"}),a=f("section",{class:"agenda"},[r,s,i]);ce(n),n.append(a);function c(P){let k=t.month+P,B=t.year;k<0?(k=11,B--):k>11&&(k=0,B++),t.year=B,t.month=k,D()}function u(){t.year=e.getFullYear(),t.month=e.getMonth(),D()}function d(){ce(r);const P=f("div",{class:"u-row u-row--tight"},[g("‹","Mes anterior",()=>c(-1)),f("button",{class:"btn btn--soft btn--sm",type:"button",onclick:u},["Hoy"]),g("›","Mes siguiente",()=>c(1))]);r.append(f("h2",{class:"agenda__title",text:`${Th[t.month]} ${t.year}`}),P)}function g(P,k,B){const L=f("button",{class:"icon-btn",type:"button","aria-label":k},[P]);return L.addEventListener("click",B),L}function v(){if(d(),ce(i),t.error){i.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"⚠️"}),f("div",{class:"state__title",text:"No se pudo cargar la agenda"}),f("div",{class:"state__msg",text:t.error})]));return}const P=kA(t.events);Vp(t.year,t.month).forEach(B=>{B.forEach(L=>{const j=Xr(L.date),H=P[j]||[],x=NA(L.date,e),S=f("div",{class:"agenda__day"+(L.inMonth?"":" is-out")+(x?" is-today":""),role:"gridcell"},[f("div",{class:"agenda__daynum",text:String(L.date.getDate())})]),w=f("div",{class:"agenda__events"});if(H.slice(0,3).forEach(_=>w.append(T(_))),H.length>3){const _=f("button",{class:"agenda__more",type:"button"},[`+${H.length-3} más`]);_.addEventListener("click",()=>cn(_,H.map(p=>({value:p,label:`${Ah(p.dueAt)} · ${p.relatedTo?.name||p.subject||"Cita"}`})),p=>R(p.value),{title:`${L.date.getDate()} ${Th[t.month]}`})),w.append(_)}S.append(w),i.append(S)})})}function T(P){const k=f("button",{class:"agenda__chip",type:"button",title:P.subject||"Cita"},[f("span",{class:"agenda__chip-time",text:Ah(P.dueAt)}),f("span",{class:"u-truncate",text:P.relatedTo?.name||P.subject||"Cita"})]);return k.addEventListener("click",()=>R(P)),k}function R(P){const k=P.relatedTo&&P.relatedTo.id;k&&q.set({detailLeadId:k})}function D(){if(v(),t.sub&&(t.sub(),t.sub=null),q.get().mock){t.events=vA(),t.loading=!1,v();return}const{startISO:P,endISO:k}=PA(t.year,t.month);t.sub=OA(P,k,B=>{t.events=B,t.loading=!1,t.error=null,v()},B=>{t.loading=!1,t.error=B&&B.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",v()})}return D(),function(){t.sub&&t.sub(),t.sub=null}}const MA=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},co=n=>n.status==="won",Op=n=>n.status==="lost",Fc=n=>n.status==="open",Uc=n=>n.status==="convertido";function bh(n,e){return e?n.filter(t=>MA(t.createdAt)>=e):n.slice()}function FA(n,e){const t=n.length,r=n.filter(Uc).length,s=e.filter(co),i=e.filter(Op),a=s.reduce((u,d)=>u+(Number(d.amount)||0),0),c=s.length+i.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:s.length,lost:i.length,winRate:c?s.length/c:0,wonValue:a}}function UA(n,e){const t=e.filter(Fc),r=n.filter(i=>!Yr(i.status)),s=r.filter(i=>{const a=yp(i);return!a.closed&&(a.state==="warn"||a.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:Sp(t),slaRisk:s}}function $A(n,e){const t=new Set(e.filter(co).map(d=>d.id)),r=n.filter(d=>d.status==="contactado"||d.status==="calificado"||d.status==="convertido"),s=n.filter(d=>d.status==="calificado"||d.status==="convertido"),i=n.filter(Uc),a=i.filter(d=>d.convertedTo&&t.has(d.convertedTo.dealId)),c=n.length||1,u=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:s.length},{key:"convertidos",label:"Convertidos",count:i.length},{key:"ganados",label:"Ganados",count:a.length}];return u.map((d,g)=>({...d,pctTop:d.count/c,convFromPrev:g===0?1:u[g-1].count?d.count/u[g-1].count:0}))}function BA(n,e){const t={},r=s=>t[s.key]||(t[s.key]={key:s.key,label:s.label,icon:s.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(s=>{const i=r(Qr(s));i.leads++,Uc(s)&&i.convertidos++}),e.forEach(s=>{const i=r(Qr(s));i.deals++,co(s)&&(i.won++,i.revenue+=Number(s.amount)||0)}),Object.values(t).map(s=>({...s,convRate:s.leads?s.convertidos/s.leads:0})).sort((s,i)=>i.leads-s.leads||i.revenue-s.revenue)}function jA(n){const e=n.filter(Fc);return Dr.map(t=>{const r=e.filter(s=>s.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((s,i)=>s+(Number(i.amount)||0),0),weighted:r.reduce((s,i)=>s+Lc(i),0)}})}function qA(n,e,t=[]){const r={},s=(i,a)=>r[i]||(r[i]={ownerId:i,ownerName:a,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(i=>s(i.uid,i.nombre)),n.forEach(i=>{const a=i.ownerId||"_none";s(a,i.ownerName||(a==="_none"?"Sin asignar":a)).leads++}),e.forEach(i=>{const a=i.ownerId||"_none",c=s(a,i.ownerName||(a==="_none"?"Sin asignar":a));c.deals++,co(i)?c.won++:Op(i)?c.lost++:Fc(i)&&(c.pipelineWeighted+=Lc(i))}),Object.values(r).filter(i=>i.leads||i.deals).map(i=>({...i,winRate:i.won+i.lost?i.won/(i.won+i.lost):0})).sort((i,a)=>a.won-i.won||a.pipelineWeighted-i.pipelineWeighted||a.leads-i.leads)}function zA(n,e=30){const t=[],r={},s=new Date;for(let i=e-1;i>=0;i--){const a=new Date(s.getFullYear(),s.getMonth(),s.getDate()-i),c={key:Xr(a),date:a,count:0};t.push(c),r[c.key]=c}return n.forEach(i=>{if(!i.createdAt)return;const a=r[Xr(new Date(i.createdAt))];a&&a.count++}),t}const Rh=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function HA(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const WA=n=>({id:n.id,...n.data()});async function Sh(n,e){return(await Wr(Et(ke(ue,n),It("createdAt","desc"),Gt(e)))).docs.map(WA)}async function GA({pageSize:n=500}={}){if(q.get().mock)return{leads:Si(),deals:kp(),capped:!1};const[e,t]=await Promise.all([Sh("leads",n),Sh("deals",n)]);return{leads:e,deals:t,capped:e.length>=n||t.length>=n}}const KA="http://www.w3.org/2000/svg";function Go(n,e={},t=[]){const r=document.createElementNS(KA,n);for(const[s,i]of Object.entries(e))i==null||i===!1||r.setAttribute(s,String(i));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function QA(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(s=>Number(s.value)||0)),r=f("div",{class:"reportes__bars",role:"list"});return n.forEach(s=>{const i=s.pct!=null?s.pct:t?(Number(s.value)||0)/t:0,a=Math.max(0,Math.min(100,i*100));r.append(f("div",{class:"reportes__bar",role:"listitem"},[f("span",{class:"reportes__bar-label u-truncate",text:s.label}),f("span",{class:"reportes__bar-track","aria-hidden":"true"},[f("span",{class:"reportes__bar-fill",style:{width:a+"%",background:s.color||"var(--grad-gold)"}})]),f("span",{class:"reportes__bar-val u-mono",text:s.display!=null?s.display:String(s.value)})]))}),r}function YA(n){const s=n.map(D=>Number(D.value)||0),i=Math.max(...s,0),a=Math.max(1,i),c=n.length,u=D=>c<=1?600/2:6+D*(600-2*6)/(c-1),d=D=>134-D/a*(140-2*6),g=n.map((D,P)=>`${u(P).toFixed(1)},${d(s[P]).toFixed(1)}`).join(" "),v=`6,134 ${g} ${594 .toFixed(1)},134`,T=s.reduce((D,P)=>D+P,0),R=(n[s.indexOf(i)]||{}).label||"";return Go("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${T} en total; pico de ${i}${R?" el "+R:""}.`},[Go("polygon",{points:v,fill:"var(--gold-300)",opacity:"0.30"}),Go("polyline",{points:g,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const Ge=n=>Math.round((n||0)*100)+"%",Ct=n=>Rr(n)||"$0",Ko=n=>`${n.getDate()}/${n.getMonth()+1}`;function JA(n){const e={leads:[],deals:[],loading:!0,error:null,capped:!1,days:30};let t=!0;const r=f("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),s=f("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),i=f("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);s.addEventListener("click",_),i.addEventListener("click",w);const a=f("div",{class:"reportes__toolbar"},[r,f("div",{class:"u-row u-row--tight"},[s,i])]),c=f("div",{class:"reportes__body"}),u=f("section",{class:"reportes"},[a,c]);ce(n),n.append(u);function d(){ce(r),Rh.forEach(p=>{const I=e.days===p.value,E=f("button",{class:"chip",type:"button","aria-pressed":I?"true":"false"},[p.label]);E.addEventListener("click",()=>{e.days=p.value,v()}),r.append(E)})}function g(){const p=HA(e.days),I=bh(e.leads,p),E=bh(e.deals,p);return{pLeads:I,pDeals:E,pk:FA(I,E),ck:UA(e.leads,e.deals),fn:$A(I,e.deals),src:BA(I,E),stg:jA(e.deals),own:qA(I,E,q.get().mock?Pp():q.get().team||[]),tr:zA(e.leads,30)}}function v(){if(d(),e.loading)return S();if(e.error)return x("⚠️","No se pudieron cargar los reportes",e.error);if(!e.leads.length&&!e.deals.length)return x("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const p=g();ce(c),e.capped&&c.append(f("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),c.append(T("Del período",[R("Leads nuevos",String(p.pk.leadsNew)),R("Tasa de conversión",Ge(p.pk.convRate),`${p.pk.convertidos} de ${p.pk.leadsNew}`),R("Win rate",Ge(p.pk.winRate),`${p.pk.won} ganadas · ${p.pk.lost} perdidas`),R("Valor ganado",Ct(p.pk.wonValue),null,!0)]),T("Estado actual",[R("Leads activos",String(p.ck.leadsActive)),R("Oportunidades abiertas",String(p.ck.dealsOpen)),R("Pipeline ponderado",Ct(p.ck.pipelineWeighted),null,!0),R("SLA en riesgo",String(p.ck.slaRisk),p.ck.slaRisk?"requieren atención":"al día")]),D(p.fn),P(p.src),k(p.stg),B(p.tr),L(p.own))}function T(p,I){return f("div",{class:"reportes__section"},[f("h2",{class:"reportes__sec-title",text:p}),f("div",{class:"reportes__kpis"},I)])}function R(p,I,E,A){return f("div",{class:"reportes__kpi"+(A?" reportes__kpi--hi":"")},[f("span",{class:"reportes__kpi-label u-caption u-faint",text:p}),f("strong",{class:"reportes__kpi-val",text:I}),E?f("span",{class:"reportes__kpi-sub u-caption u-faint",text:E}):null])}function D(p){const I=p.map((E,A)=>({label:E.label,value:E.count,pct:E.pctTop,display:A===0?String(E.count):`${E.count} · ${Ge(E.convFromPrev)}`,color:"var(--grad-gold)"}));return j("Embudo de ventas","De lead a venta — dónde se pierde el avance",QA(I,{max:p[0]?p[0].count:1}))}function P(p){const I=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],E=p.map(y=>[`${y.icon||""} ${y.label}`.trim(),String(y.leads),Ge(y.convRate),String(y.deals),String(y.won),Ct(y.revenue)]),A=p.length?null:"Sin leads en el período.";return j("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",H(I,E,A))}function k(p){const I=["Etapa","Prob.","Oport.","Valor","Ponderado"],E=p.map(X=>[X.label,Ge(X.prob),String(X.count),Ct(X.value),Ct(X.weighted)]),A=p.reduce((X,O)=>({count:X.count+O.count,value:X.value+O.value,weighted:X.weighted+O.weighted}),{count:0,value:0,weighted:0}),y=["Total","",String(A.count),Ct(A.value),Ct(A.weighted)];return j("Forecast por etapa","Pipeline abierto actual (no depende del período)",H(I,E,null,y))}function B(p){const I=p.reduce((X,O)=>X+O.count,0),E=p.map(X=>({label:Ko(X.date),value:X.count})),A=p.length?`${Ko(p[0].date)} – ${Ko(p[p.length-1].date)}`:"",y=f("div",{class:"reportes__chart"},[YA(E),f("div",{class:"reportes__axis u-caption u-faint"},[f("span",{text:A}),f("span",{text:`${I} leads`})])]);return j("Tendencia de captación","Nuevos leads · últimos 30 días",y)}function L(p){const I=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],E=p.map(y=>[y.ownerName,String(y.leads),String(y.deals),String(y.won),Ge(y.winRate),Ct(y.pipelineWeighted)]),A=p.length?null:"Sin actividad asignada en el período.";return j("Rendimiento del equipo","Por asesor, en el período seleccionado",H(I,E,A))}function j(p,I,E){return f("div",{class:"reportes__section"},[f("div",{class:"reportes__sec-head"},[f("h2",{class:"reportes__sec-title",text:p}),I?f("span",{class:"reportes__sec-cap u-caption u-faint",text:I}):null]),E])}function H(p,I,E,A){if(!I.length&&E)return f("div",{class:"reportes__empty u-caption u-faint",text:E});const y=f("thead",{},[f("tr",{},p.map((F,W)=>f("th",{class:W===0?"":"is-num",scope:"col",text:F})))]),X=f("tbody",{},I.map(F=>f("tr",{},F.map((W,oe)=>f("td",{class:oe===0?"":"is-num",text:W}))))),O=[y,X];return A&&O.push(f("tfoot",{},[f("tr",{},A.map((F,W)=>W===0?f("th",{scope:"row",text:F}):f("td",{class:"is-num",text:F})))])),f("div",{class:"reportes__tablewrap"},[f("table",{class:"reportes__table"},O)])}function x(p,I,E){ce(c),c.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:p}),f("div",{class:"state__title",text:I}),f("div",{class:"state__msg",text:E})]))}function S(){ce(c);const p=f("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>f("div",{class:"reportes__kpi"},[f("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));c.append(f("div",{class:"reportes__section"},[p])),c.append(f("div",{class:"reportes__section"},[f("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function w(){if(e.loading||e.error){se("Aún no hay datos para exportar","info");return}const p=g(),I=(Rh.find(y=>y.value===e.days)||{}).label||"",E=[],A=y=>{E.push([]),E.push([y])};E.push(["Reporte Altorra CRM"]),E.push(["Período",I]),E.push(["Generado",new Date().toLocaleString("es-CO")]),A("KPIs del período"),E.push(["Métrica","Valor"]),E.push(["Leads nuevos",p.pk.leadsNew]),E.push(["Conversión",Ge(p.pk.convRate)]),E.push(["Win rate",Ge(p.pk.winRate)]),E.push(["Ganadas",p.pk.won]),E.push(["Perdidas",p.pk.lost]),E.push(["Valor ganado (COP)",p.pk.wonValue]),E.push(["Leads activos (ahora)",p.ck.leadsActive]),E.push(["Oportunidades abiertas (ahora)",p.ck.dealsOpen]),E.push(["Pipeline ponderado COP (ahora)",p.ck.pipelineWeighted]),E.push(["SLA en riesgo (ahora)",p.ck.slaRisk]),A("Embudo"),E.push(["Etapa","Cantidad","Conversión desde anterior"]),p.fn.forEach((y,X)=>E.push([y.label,y.count,X===0?"":Ge(y.convFromPrev)])),A("Rendimiento por canal"),E.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),p.src.forEach(y=>E.push([y.label,y.leads,Ge(y.convRate),y.deals,y.won,y.revenue])),A("Forecast por etapa (pipeline actual)"),E.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),p.stg.forEach(y=>E.push([y.label,Ge(y.prob),y.count,y.value,y.weighted])),A("Rendimiento del equipo"),E.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),p.own.forEach(y=>E.push([y.ownerName,y.leads,y.deals,y.won,Ge(y.winRate),y.pipelineWeighted])),eb(`altorra-reportes-${Xr(new Date)}.csv`,ZA(E)),se("Reporte exportado","ok")}async function _(){e.loading=!0,e.error=null,v();try{const p=await GA();if(!t)return;e.leads=p.leads,e.deals=p.deals,e.capped=!!p.capped,e.loading=!1}catch(p){if(!t)return;e.loading=!1,e.error=p&&p.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}v()}return _(),function(){t=!1}}function XA(n){const e=n==null?"":String(n);return/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function ZA(n){return"\uFEFF"+n.map(e=>e.map(XA).join(",")).join(`\r
`)}function eb(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=n,document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}const Ci=n=>({id:n.id,...n.data()});async function tb({pageSize:n=500}={}){if(q.get().mock)return{contacts:mA(),leads:Si()};const[e,t]=await Promise.all([Wr(Et(ke(ue,"contacts"),It("createdAt","desc"),Gt(n))).then(r=>r.docs.map(Ci)),Wr(Et(ke(ue,"leads"),It("createdAt","desc"),Gt(n))).then(r=>r.docs.map(Ci))]);return{contacts:e,leads:t}}async function nb(n){if(!n)return null;const e=await Xf(at(ue,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function rb(n,e,t){const r=Et(ke(ue,"activities"),Ei("relatedTo.id","==",n),It("createdAt","desc"),Gt(50));return ls(r,s=>e(s.docs.map(Ci)),s=>t&&t(s))}function sb(n,e,t){const r=Et(ke(ue,"contacts",n,"crmNotes"),It("createdAt","desc"),Gt(50));return ls(r,s=>e(s.docs.map(Ci)),s=>t&&t(s))}async function ib(n,e){const t=q.get().user;await yn(ke(ue,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:q.get().profile&&q.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const ob=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],ab={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function Ch(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function cb(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=f("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,D()});const s=f("div",{class:"search"},[f("span",{"aria-hidden":"true",text:"🔎"}),r]),i={},a=f("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});ob.forEach(L=>{const j=f("button",{class:"chip",type:"button","aria-pressed":L.id===e.filter?"true":"false"},[L.label]);j.addEventListener("click",()=>{e.filter=L.id,Object.entries(i).forEach(([H,x])=>x.setAttribute("aria-pressed",H===L.id?"true":"false")),D()}),i[L.id]=j,a.append(j)});const c=f("span",{class:"contactos__count u-caption u-faint"}),u=f("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);u.addEventListener("click",B);const d=f("div",{class:"contactos__toolbar"},[s,a,f("div",{class:"u-row u-row--tight"},[c,u])]),g=f("div",{class:"contactos__list"}),v=f("section",{class:"contactos"},[d,g]);ce(n),n.append(v);function T(){const L={};for(const j of e.leads){if(!j.contactId)continue;const H=L[j.contactId];(!H||new Date(j.createdAt)>new Date(H.createdAt))&&(L[j.contactId]=j)}return L}function R(L){q.set({leads:e.leads,detailLeadId:L.id})}function D(){if(e.loading)return k("⏳","Cargando contactos…","");if(e.error)return k("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return k("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const L=T(),j=Ai(e.q),H=e.contacts.filter(x=>e.filter!=="todos"&&Ch(x)!==e.filter?!1:j?Ai(`${x.fullName||""} ${x.email||""} ${x.phone||""}`).includes(j):!0);if(c.textContent=`${H.length} de ${e.contacts.length}`,ce(g),!H.length){g.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🔍"}),f("div",{class:"state__title",text:"Sin resultados"}),f("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}H.forEach(x=>g.append(P(x,L[x.id])))}function P(L,j){const H=Ch(L),x=ab[H],S=Qr(L),w=Number(L.score)>0&&Fn[L.rating],_=f("div",{class:"contact-row__badges"},[f("span",{class:`badge badge--${x.badge}`,text:x.label}),f("span",{class:"badge",text:`${S.icon} ${S.label}`}),w?f("span",{class:`temp ${Fn[L.rating].cls}`,text:`${Fn[L.rating].icon} ${L.score}`}):null]),p=[L.email,L.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",I=Array.isArray(L.tags)&&L.tags.length?f("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+L.tags.join(", ")}):null,E=[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:us(L.fullName)}),f("div",{class:"contact-row__main"},[f("span",{class:"contact-row__name u-truncate",text:L.fullName||"Sin nombre"}),f("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:p,text:p}),I]),_,f("span",{class:"contact-row__time u-caption u-faint",text:Mn(L.lastActivityAt)})];if(j){const A=f("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${L.fullName||"contacto"}`},E);return A.addEventListener("click",()=>R(j)),A}return f("div",{class:"contact-row contact-row--nolead"},E)}function k(L,j,H){c.textContent="",ce(g),g.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:L}),f("div",{class:"state__title",text:j}),H?f("div",{class:"state__msg",text:H}):null]))}async function B(){e.loading=!0,e.error=null,D();try{const L=await tb();if(!t)return;e.contacts=L.contacts,e.leads=L.leads,e.loading=!1}catch(L){if(!t)return;e.loading=!1,e.error=L&&L.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}D()}return B(),function(){t=!1}}const lb={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function ub(n){let e=null,t=null,r=null,s="resumen",i={lead:null,contact:null,activities:[],notes:[]};const a=f("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=f("div",{class:"detail-overlay",hidden:!0},[a]);n.append(c),c.addEventListener("mousedown",x=>{x.target===c&&u()}),window.addEventListener("keydown",x=>{x.key==="Escape"&&e&&u()}),q.subscribe(x=>{x.detailLeadId!==e&&g(x.detailLeadId)});function u(){q.set({detailLeadId:null})}function d(){t&&(t(),t=null),r&&(r(),r=null)}function g(x){if(d(),e=x,!x){c.hidden=!0,document.body.classList.remove("has-detail"),ce(a);return}s="resumen",c.hidden=!1,document.body.classList.add("has-detail"),v(x)}function v(x){const S=(q.get().leads||[]).find(w=>w.id===x);i={lead:S||null,contact:null,activities:[],notes:[]},T(),S&&(q.get().mock?(i.contact=pA(S.contactId),i.activities=fA(x),i.notes=Ih(S.contactId),T()):(nb(S.contactId).then(w=>{i.contact=w,T()}).catch(()=>{}),t=rb(x,w=>{i.activities=w,T()},()=>{}),S.contactId&&(r=sb(S.contactId,w=>{i.notes=w,T()},()=>{}))))}function T(){ce(a);const x=i.lead;if(!x){a.append(R(null)),a.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🔍"}),f("div",{class:"state__title",text:"Lead no disponible"}),f("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}a.append(R(x)),a.append(D());const S=f("div",{class:"detail__body"});s==="resumen"?S.append(P(x)):s==="comms"?S.append(B()):s==="score"?S.append(L(x)):s==="notas"&&S.append(j(x)),a.append(S)}function R(x){const S=f("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(S.addEventListener("click",u),!x)return f("div",{class:"detail__header"},[f("div",{class:"u-grow"}),S]);const w=H(x),_=Fn[w.rating],p=Xs(x.status),I=io(x),E=Qr(x),A=f("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);A.addEventListener("click",()=>{const F=gp(x.phone,`Hola ${String(x.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!F)return se("Sin teléfono","error");window.open(F,"_blank","noopener")});const y=Nr("crm.edit"),X=y&&x.status!=="convertido"?f("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;X&&X.addEventListener("click",async()=>{X.disabled=!0;try{q.get().mock?Np(xc(x)):await Cp(x),se("🎯 Convertido a oportunidad","ok")}catch{se("No se pudo convertir","error"),X.disabled=!1}});const O=y?f("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;return O&&O.addEventListener("click",()=>hb(x,O)),f("div",{class:"detail__header"},[f("div",{class:"u-row u-grow",style:{minWidth:"0"}},[f("span",{class:"avatar","aria-hidden":"true",text:us(x.fullName)}),f("div",{class:"u-grow",style:{minWidth:"0"}},[f("h2",{class:"detail__name u-truncate",text:x.fullName}),f("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[f("span",{class:`temp ${_.cls}`,text:`${_.icon} ${_.label} · ${w.score}`}),f("span",{class:`badge badge--${p.badge||""}`.trim(),text:p.label}),f("span",{class:"badge",text:`${I.icon} ${I.label}`}),f("span",{class:"badge",text:`${E.icon} ${E.label}`})])])]),f("div",{class:"u-row u-row--tight"},[X,O,A,S])])}function D(){const x=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],S=f("div",{class:"detail__tabs",role:"tablist"});return x.forEach(([w,_])=>{const p=f("button",{class:"detail__tab"+(s===w?" is-active":""),role:"tab","aria-selected":String(s===w),type:"button"},[_]);p.addEventListener("click",()=>{s=w,T()}),S.append(p)}),S}function P(x){const S=i.contact,w=S&&S.consent?S.consent:null,_=[["Correo",x.email||"—"],["Teléfono",x.phone||"—"],["Interés",x.sourceDetail||"—"],["Vehículo",x.vehicleOfInterestId||"—"],["Asesor",x.ownerName||"Sin asignar"],["Origen",x.source||"—"],["Capturado",IT(x.createdAt)],["Última actividad",Mn(x.lastActivityAt)]],p=Ep(x,{score:H(x).score});return f("div",{class:"u-stack"},[f("div",{class:"detail-card detail-card--nba"},[f("span",{class:"detail-card__icon","aria-hidden":"true",text:p.icon}),f("div",{class:"u-grow"},[f("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),f("strong",{text:p.label}),f("div",{class:"u-caption u-faint",text:p.reason})])]),f("dl",{class:"kv"},_.flatMap(([I,E])=>[f("dt",{text:I}),f("dd",{class:"u-truncate",text:E})])),w?k(w):null])}function k(x){const S=w=>w?"✅":"⛔";return f("div",{class:"detail-card"},[f("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),f("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[f("span",{class:"u-caption",text:`${S(x.email)} Email`}),f("span",{class:"u-caption",text:`${S(x.whatsapp)} WhatsApp`}),f("span",{class:"u-caption",text:`${S(x.calls)} Llamadas`})]),f("div",{class:"u-caption u-faint",text:`Política ${x.policyVersion||"v1"} · origen ${x.source||"—"}`})])}function B(){if(!i.activities.length)return f("div",{class:"state"},[f("div",{class:"state__icon",text:"📭"}),f("div",{class:"state__title",text:"Sin comunicaciones"}),f("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const x=f("ol",{class:"timeline"});return i.activities.forEach(S=>{x.append(f("li",{class:"timeline__item timeline__item--"+(S.direction||"inbound")},[f("span",{class:"timeline__icon","aria-hidden":"true",text:lb[S.type]||"•"}),f("div",{class:"u-grow"},[f("div",{class:"u-spread"},[f("strong",{class:"u-truncate",text:S.subject||S.type||"Actividad"}),f("span",{class:"u-caption u-faint",text:Mn(S.createdAt)})]),S.body?f("div",{class:"u-caption u-muted",text:S.body}):null])]))}),x}function L(x){const S=H(x),w=Fn[S.rating],_=Object.keys(Eh).map(p=>{const I=Math.round((S.factors[p]||0)*100);return f("div",{class:"factor"},[f("div",{class:"u-spread u-caption"},[f("span",{text:Eh[p]}),f("span",{class:"u-faint",text:`${I}% · peso ${Math.round(BT[p]*100)}%`})]),f("div",{class:"factor__track"},[f("div",{class:"factor__fill",style:{width:I+"%"}})])])});return f("div",{class:"u-stack"},[f("div",{class:"scorehero"},[f("div",{class:`scorehero__num ${w.cls}`,text:String(S.score)}),f("div",{class:"u-stack",style:{gap:"2px"}},[f("strong",{text:`${w.icon} ${w.label}`}),f("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),f("div",{class:"u-stack",style:{gap:"10px"}},_)])}function j(x){const S=Nr("crm.edit")||Nr("crm.create"),w=f("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),_=f("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);_.addEventListener("click",async()=>{const I=w.value.trim();if(!I)return;_.disabled=!0;const E={body:I,authorName:"Tú",createdAt:new Date().toISOString()};try{q.get().mock?(gA(x.contactId,E),i.notes=Ih(x.contactId),T()):(await ib(x.contactId,I),w.value=""),se("Nota agregada","ok")}catch{se("No se pudo guardar la nota","error")}finally{_.disabled=!1}});const p=f("div",{class:"u-stack"});return i.notes.length||p.append(f("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),i.notes.forEach(I=>p.append(f("div",{class:"detail-card"},[f("div",{class:"u-caption u-muted",text:I.body}),f("div",{class:"u-caption u-faint",text:`${I.authorName||"Asesor"} · ${Mn(I.createdAt)}`})]))),f("div",{class:"u-stack"},[S?f("div",{class:"u-stack",style:{gap:"8px"}},[w,f("div",{class:"u-row",style:{justifyContent:"flex-end"}},[_])]):null,p])}function H(x){return wp(x,i.activities||[],i.contact)}}function hb(n,e){const t=R=>String(R).padStart(2,"0"),r=new Date;r.setDate(r.getDate()+1),r.setHours(10,0,0,0);const s=`${r.getFullYear()}-${t(r.getMonth()+1)}-${t(r.getDate())}T${t(r.getHours())}:${t(r.getMinutes())}`,i=f("input",{class:"input",type:"text",value:"Cita con "+(n.fullName||""),"aria-label":"Asunto"}),a=f("input",{class:"input",type:"datetime-local",value:s,"aria-label":"Fecha y hora"}),c=f("button",{class:"btn btn--gold btn--sm btn--block",type:"button"},["Agendar"]),u=f("div",{class:"popover",role:"dialog","aria-label":"Agendar cita",style:{width:"260px",gap:"8px"}},[f("div",{class:"popover__title",text:"Agendar cita"}),i,a,c]);document.body.append(u);const d=e.getBoundingClientRect();u.style.top=`${Math.min(window.innerHeight-u.offsetHeight-8,d.bottom+6)}px`,u.style.left=`${Math.max(8,d.right-u.offsetWidth)}px`,setTimeout(()=>a.focus(),0);const g=()=>{u.remove(),document.removeEventListener("mousedown",v,!0),window.removeEventListener("keydown",T,!0)},v=R=>{u.contains(R.target)||g()},T=R=>{R.key==="Escape"&&g()};setTimeout(()=>{document.addEventListener("mousedown",v,!0),window.addEventListener("keydown",T,!0)},0),c.addEventListener("click",async()=>{const R=a.value?new Date(a.value).toISOString():null;if(!R){se("Elige fecha y hora","error");return}c.disabled=!0;try{q.get().mock?wA({type:"cita",subject:i.value,dueAt:R,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}):await LA(n,R,i.value),se("📅 Cita agendada","ok"),g()}catch{se("No se pudo agendar","error"),c.disabled=!1}})}const Lp=document.getElementById("app");mm();const db=new URLSearchParams(location.search).get("mock")==="1",fb={bandeja:Dp,pipeline:RA,agenda:xA,reportes:JA,contactos:cb};let Bs=null,Un=null,an=null,Sa=null,ei=null;function Ph(n){if(!Un||n===Sa)return;an&&(an(),an=null),q.get().detailLeadId&&q.set({detailLeadId:null}),an=(fb[n]||Dp)(Un.outlet)||null,Un.setActive(n),Sa=n}function pb(){Un=bT(Lp),ub(Un.detailRoot),Ph(fp()),ei=vT(Ph)}function mb(){an&&(an(),an=null),ei&&(ei(),ei=null),Un=null,Sa=null}function gb(n){n.ready&&(n.user&&Bs!=="app"?(Bs="app",pb()):!n.user&&Bs!=="login"&&(mb(),Bs="login",n.detailLeadId&&q.set({detailLeadId:null}),RT(Lp)))}q.subscribe(gb);db?q.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):dT();
