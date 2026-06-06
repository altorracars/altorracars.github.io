(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function fp(n){let e={...n};const t=new Set;function r(){return e}function i(a){const c=typeof a=="function"?a(e):a;c&&(e={...e,...c},t.forEach(u=>u(e)))}function s(a){return t.add(a),()=>t.delete(a)}return{get:r,set:i,subscribe:s}}const $=fp({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),Fu="altorra-crm-theme";function pp(){let n=localStorage.getItem(Fu);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,$.set({theme:n})}function mp(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(Fu,n),$.set({theme:n}),n}var nl={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uu=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},gp=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],a=n[t++],c=n[t++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},Bu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],a=i+1<n.length,c=a?n[i+1]:0,u=i+2<n.length,d=u?n[i+2]:0,m=s>>2,v=(s&3)<<4|c>>4;let T=(c&15)<<2|d>>6,S=d&63;u||(S=64,a||(T=64)),r.push(t[m],t[v],t[T],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Uu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):gp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const v=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||v==null)throw new _p;const T=s<<2|c>>4;if(r.push(T),d!==64){const S=c<<4&240|d>>2;if(r.push(S),v!==64){const O=d<<6&192|v;r.push(O)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class _p extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const yp=function(n){const e=Uu(n);return Bu.encodeByteArray(e,!0)},Li=function(n){return yp(n).replace(/\./g,"")},$u=function(n){try{return Bu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function vp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ep=()=>vp().__FIREBASE_DEFAULTS__,Ip=()=>{if(typeof process>"u"||typeof nl>"u")return;const n=nl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},wp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&$u(n[1]);return e&&JSON.parse(e)},as=()=>{try{return Ep()||Ip()||wp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ju=n=>{var e,t;return(t=(e=as())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Tp=n=>{const e=ju(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},qu=()=>{var n;return(n=as())===null||n===void 0?void 0:n.config},zu=n=>{var e;return(e=as())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ap{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function bp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Li(JSON.stringify(t)),Li(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Rp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Oe())}function Sp(){var n;const e=(n=as())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Cp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Pp(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function kp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Np(){const n=Oe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Dp(){return!Sp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Vp(){try{return typeof indexedDB=="object"}catch{return!1}}function Op(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lp="FirebaseError";class mt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Lp,Object.setPrototypeOf(this,mt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Or.prototype.create)}}class Or{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?Mp(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new mt(i,c,r)}}function Mp(n,e){return n.replace(xp,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const xp=/\{\$([^}]+)}/g;function Fp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Mi(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],a=e[i];if(rl(s)&&rl(a)){if(!Mi(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function rl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ur(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function hr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Up(n,e){const t=new Bp(n,e);return t.subscribe.bind(t)}class Bp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");$p(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=co),i.error===void 0&&(i.error=co),i.complete===void 0&&(i.complete=co);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function $p(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function co(){}/**
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
 */function me(n){return n&&n._delegate?n._delegate:n}class Xt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Wt="[DEFAULT]";/**
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
 */class jp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Ap;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(zp(e))try{this.getOrInitializeService({instanceIdentifier:Wt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Wt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Wt){return this.instances.has(e)}getOptions(e=Wt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:qp(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Wt){return this.component?this.component.multipleInstances?e:Wt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qp(n){return n===Wt?void 0:n}function zp(n){return n.instantiationMode==="EAGER"}/**
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
 */class Hp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new jp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const Wp={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},Gp=Y.INFO,Kp={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},Qp=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Kp[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class na{constructor(e){this.name=e,this._logLevel=Gp,this._logHandler=Qp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Wp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const Yp=(n,e)=>e.some(t=>n instanceof t);let il,sl;function Jp(){return il||(il=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xp(){return sl||(sl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Hu=new WeakMap,To=new WeakMap,Wu=new WeakMap,lo=new WeakMap,ra=new WeakMap;function Zp(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(bt(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Hu.set(t,n)}).catch(()=>{}),ra.set(e,n),e}function em(n){if(To.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});To.set(n,e)}let Ao={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return To.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Wu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return bt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function tm(n){Ao=n(Ao)}function nm(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(uo(this),e,...t);return Wu.set(r,e.sort?e.sort():[e]),bt(r)}:Xp().includes(n)?function(...e){return n.apply(uo(this),e),bt(Hu.get(this))}:function(...e){return bt(n.apply(uo(this),e))}}function rm(n){return typeof n=="function"?nm(n):(n instanceof IDBTransaction&&em(n),Yp(n,Jp())?new Proxy(n,Ao):n)}function bt(n){if(n instanceof IDBRequest)return Zp(n);if(lo.has(n))return lo.get(n);const e=rm(n);return e!==n&&(lo.set(n,e),ra.set(e,n)),e}const uo=n=>ra.get(n);function im(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(n,e),c=bt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(bt(a.result),u.oldVersion,u.newVersion,bt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const sm=["get","getKey","getAll","getAllKeys","count"],om=["put","add","delete","clear"],ho=new Map;function ol(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ho.get(e))return ho.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=om.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||sm.includes(t)))return;const s=async function(a,...c){const u=this.transaction(a,i?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&u.done]))[0]};return ho.set(e,s),s}tm(n=>({...n,get:(e,t,r)=>ol(e,t)||n.get(e,t,r),has:(e,t)=>!!ol(e,t)||n.has(e,t)}));/**
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
 */class am{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(cm(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function cm(n){const e=n.getComponent();return e?.type==="VERSION"}const bo="@firebase/app",al="0.11.0";/**
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
 */const ht=new na("@firebase/app"),lm="@firebase/app-compat",um="@firebase/analytics-compat",hm="@firebase/analytics",dm="@firebase/app-check-compat",fm="@firebase/app-check",pm="@firebase/auth",mm="@firebase/auth-compat",gm="@firebase/database",_m="@firebase/data-connect",ym="@firebase/database-compat",vm="@firebase/functions",Em="@firebase/functions-compat",Im="@firebase/installations",wm="@firebase/installations-compat",Tm="@firebase/messaging",Am="@firebase/messaging-compat",bm="@firebase/performance",Rm="@firebase/performance-compat",Sm="@firebase/remote-config",Cm="@firebase/remote-config-compat",Pm="@firebase/storage",km="@firebase/storage-compat",Nm="@firebase/firestore",Dm="@firebase/vertexai",Vm="@firebase/firestore-compat",Om="firebase",Lm="11.3.0";/**
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
 */const Ro="[DEFAULT]",Mm={[bo]:"fire-core",[lm]:"fire-core-compat",[hm]:"fire-analytics",[um]:"fire-analytics-compat",[fm]:"fire-app-check",[dm]:"fire-app-check-compat",[pm]:"fire-auth",[mm]:"fire-auth-compat",[gm]:"fire-rtdb",[_m]:"fire-data-connect",[ym]:"fire-rtdb-compat",[vm]:"fire-fn",[Em]:"fire-fn-compat",[Im]:"fire-iid",[wm]:"fire-iid-compat",[Tm]:"fire-fcm",[Am]:"fire-fcm-compat",[bm]:"fire-perf",[Rm]:"fire-perf-compat",[Sm]:"fire-rc",[Cm]:"fire-rc-compat",[Pm]:"fire-gcs",[km]:"fire-gcs-compat",[Nm]:"fire-fst",[Vm]:"fire-fst-compat",[Dm]:"fire-vertex","fire-js":"fire-js",[Om]:"fire-js-all"};/**
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
 */const xi=new Map,xm=new Map,So=new Map;function cl(n,e){try{n.container.addComponent(e)}catch(t){ht.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Sn(n){const e=n.name;if(So.has(e))return ht.debug(`There were multiple attempts to register component ${e}.`),!1;So.set(e,n);for(const t of xi.values())cl(t,n);for(const t of xm.values())cl(t,n);return!0}function ia(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function He(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Fm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Rt=new Or("app","Firebase",Fm);/**
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
 */class Um{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Xt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Rt.create("app-deleted",{appName:this._name})}}/**
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
 */const Fn=Lm;function Gu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ro,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Rt.create("bad-app-name",{appName:String(i)});if(t||(t=qu()),!t)throw Rt.create("no-options");const s=xi.get(i);if(s){if(Mi(t,s.options)&&Mi(r,s.config))return s;throw Rt.create("duplicate-app",{appName:i})}const a=new Hp(i);for(const u of So.values())a.addComponent(u);const c=new Um(t,r,a);return xi.set(i,c),c}function Ku(n=Ro){const e=xi.get(n);if(!e&&n===Ro&&qu())return Gu();if(!e)throw Rt.create("no-app",{appName:n});return e}function St(n,e,t){var r;let i=(r=Mm[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ht.warn(c.join(" "));return}Sn(new Xt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Bm="firebase-heartbeat-database",$m=1,Tr="firebase-heartbeat-store";let fo=null;function Qu(){return fo||(fo=im(Bm,$m,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Tr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Rt.create("idb-open",{originalErrorMessage:n.message})})),fo}async function jm(n){try{const t=(await Qu()).transaction(Tr),r=await t.objectStore(Tr).get(Yu(n));return await t.done,r}catch(e){if(e instanceof mt)ht.warn(e.message);else{const t=Rt.create("idb-get",{originalErrorMessage:e?.message});ht.warn(t.message)}}}async function ll(n,e){try{const r=(await Qu()).transaction(Tr,"readwrite");await r.objectStore(Tr).put(e,Yu(n)),await r.done}catch(t){if(t instanceof mt)ht.warn(t.message);else{const r=Rt.create("idb-set",{originalErrorMessage:t?.message});ht.warn(r.message)}}}function Yu(n){return`${n.name}!${n.options.appId}`}/**
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
 */const qm=1024,zm=30;class Hm{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Gm(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ul();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>zm){const a=Km(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ht.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ul(),{heartbeatsToSend:r,unsentEntries:i}=Wm(this._heartbeatsCache.heartbeats),s=Li(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return ht.warn(t),""}}}function ul(){return new Date().toISOString().substring(0,10)}function Wm(n,e=qm){const t=[];let r=n.slice();for(const i of n){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),hl(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),hl(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Gm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Vp()?Op().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await jm(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return ll(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return ll(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function hl(n){return Li(JSON.stringify({version:2,heartbeats:n})).length}function Km(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Qm(n){Sn(new Xt("platform-logger",e=>new am(e),"PRIVATE")),Sn(new Xt("heartbeat",e=>new Hm(e),"PRIVATE")),St(bo,al,n),St(bo,al,"esm2017"),St("fire-js","")}Qm("");function sa(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Ju(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ym=Ju,Xu=new Or("auth","Firebase",Ju());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fi=new na("@firebase/auth");function Jm(n,...e){Fi.logLevel<=Y.WARN&&Fi.warn(`Auth (${Fn}): ${n}`,...e)}function Ii(n,...e){Fi.logLevel<=Y.ERROR&&Fi.error(`Auth (${Fn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(n,...e){throw oa(n,...e)}function Je(n,...e){return oa(n,...e)}function Zu(n,e,t){const r=Object.assign(Object.assign({},Ym()),{[e]:t});return new Or("auth","Firebase",r).create(e,{appName:n.name})}function Ct(n){return Zu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function oa(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Xu.create(n,...e)}function z(n,e,...t){if(!n)throw oa(e,...t)}function at(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ii(e),new Error(e)}function dt(n,e){n||at(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Co(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Xm(){return dl()==="http:"||dl()==="https:"}function dl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xm()||Pp()||"connection"in navigator)?navigator.onLine:!0}function eg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,t){this.shortDelay=e,this.longDelay=t,dt(t>e,"Short delay should be less than long delay!"),this.isMobile=Rp()||kp()}get(){return Zm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(n,e){dt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;at("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;at("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;at("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ng=new Mr(3e4,6e4);function rn(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ft(n,e,t,r,i={}){return th(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const c=Lr(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},s);return Cp()||(d.referrerPolicy="no-referrer"),eh.fetch()(nh(n,n.config.apiHost,t,c),d)})}async function th(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},tg),e);try{const i=new ig(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw hi(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw hi(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw hi(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw hi(n,"user-disabled",a);const m=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Zu(n,m,d);Ge(n,m)}}catch(i){if(i instanceof mt)throw i;Ge(n,"network-request-failed",{message:String(i)})}}async function cs(n,e,t,r,i={}){const s=await Ft(n,e,t,r,i);return"mfaPendingCredential"in s&&Ge(n,"multi-factor-auth-required",{_serverResponse:s}),s}function nh(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?aa(n.config,i):`${n.config.apiScheme}://${i}`}function rg(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ig{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Je(this.auth,"network-request-failed")),ng.get())})}}function hi(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Je(n,e,r);return i.customData._tokenResponse=t,i}function fl(n){return n!==void 0&&n.enterprise!==void 0}class sg{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return rg(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function og(n,e){return Ft(n,"GET","/v2/recaptchaConfig",rn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ag(n,e){return Ft(n,"POST","/v1/accounts:delete",e)}async function rh(n,e){return Ft(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function cg(n,e=!1){const t=me(n),r=await t.getIdToken(e),i=ca(r);z(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s?.sign_in_provider;return{claims:i,token:r,authTime:gr(po(i.auth_time)),issuedAtTime:gr(po(i.iat)),expirationTime:gr(po(i.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function po(n){return Number(n)*1e3}function ca(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ii("JWT malformed, contained fewer than 3 sections"),null;try{const i=$u(t);return i?JSON.parse(i):(Ii("Failed to decode base64 JWT payload"),null)}catch(i){return Ii("Caught error parsing JWT payload as JSON",i?.toString()),null}}function pl(n){const e=ca(n);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ar(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof mt&&lg(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function lg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=gr(this.lastLoginAt),this.creationTime=gr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ui(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Ar(n,rh(t,{idToken:r}));z(i?.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?ih(s.providerUserInfo):[],c=dg(n.providerData,a),u=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!c?.length,m=u?d:!1,v={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new Po(s.createdAt,s.lastLoginAt),isAnonymous:m};Object.assign(n,v)}async function hg(n){const e=me(n);await Ui(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function dg(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ih(n){return n.map(e=>{var{providerId:t}=e,r=sa(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fg(n,e){const t=await th(n,{},async()=>{const r=Lr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=nh(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",eh.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function pg(n,e){return Ft(n,"POST","/v2/accounts:revokeToken",rn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):pl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=pl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await fg(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new En;return r&&(z(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(z(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(z(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new En,this.toJSON())}_performRefresh(){return at("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(n,e){z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ct{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=sa(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ug(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Po(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Ar(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return cg(this,e)}reload(){return hg(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ct(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ui(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(He(this.auth.app))return Promise.reject(Ct(this.auth));const e=await this.getIdToken();return await Ar(this,ag(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,c,u,d,m;const v=(r=t.displayName)!==null&&r!==void 0?r:void 0,T=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,O=(a=t.photoURL)!==null&&a!==void 0?a:void 0,k=(c=t.tenantId)!==null&&c!==void 0?c:void 0,N=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,B=(d=t.createdAt)!==null&&d!==void 0?d:void 0,q=(m=t.lastLoginAt)!==null&&m!==void 0?m:void 0,{uid:Q,emailVerified:Z,isAnonymous:L,providerData:R,stsTokenManager:y}=t;z(Q&&y,e,"internal-error");const p=En.fromJSON(this.name,y);z(typeof Q=="string",e,"internal-error"),vt(v,e.name),vt(T,e.name),z(typeof Z=="boolean",e,"internal-error"),z(typeof L=="boolean",e,"internal-error"),vt(S,e.name),vt(O,e.name),vt(k,e.name),vt(N,e.name),vt(B,e.name),vt(q,e.name);const g=new ct({uid:Q,auth:e,email:T,emailVerified:Z,displayName:v,isAnonymous:L,photoURL:O,phoneNumber:S,tenantId:k,stsTokenManager:p,createdAt:B,lastLoginAt:q});return R&&Array.isArray(R)&&(g.providerData=R.map(I=>Object.assign({},I))),N&&(g._redirectEventId=N),g}static async _fromIdTokenResponse(e,t,r=!1){const i=new En;i.updateFromServerResponse(t);const s=new ct({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ui(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];z(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?ih(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!s?.length,c=new En;c.updateFromIdToken(r);const u=new ct({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Po(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml=new Map;function lt(n){dt(n instanceof Function,"Expected a class definition");let e=ml.get(n);return e?(dt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ml.set(n,e),e)}/**
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
 */class sh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}sh.type="NONE";const gl=sh;/**
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
 */function wi(n,e,t){return`firebase:${n}:${e}:${t}`}class In{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=wi(this.userKey,i.apiKey,s),this.fullPersistenceKey=wi("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ct._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new In(lt(gl),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||lt(gl);const a=wi(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const m=await d._get(a);if(m){const v=ct._fromJSON(e,m);d!==s&&(c=v),s=d;break}}catch{}const u=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new In(s,e,r):(s=u[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new In(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _l(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(lh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(oh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(hh(e))return"Blackberry";if(dh(e))return"Webos";if(ah(e))return"Safari";if((e.includes("chrome/")||ch(e))&&!e.includes("edge/"))return"Chrome";if(uh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function oh(n=Oe()){return/firefox\//i.test(n)}function ah(n=Oe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ch(n=Oe()){return/crios\//i.test(n)}function lh(n=Oe()){return/iemobile/i.test(n)}function uh(n=Oe()){return/android/i.test(n)}function hh(n=Oe()){return/blackberry/i.test(n)}function dh(n=Oe()){return/webos/i.test(n)}function la(n=Oe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function mg(n=Oe()){var e;return la(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function gg(){return Np()&&document.documentMode===10}function fh(n=Oe()){return la(n)||uh(n)||dh(n)||hh(n)||/windows phone/i.test(n)||lh(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ph(n,e=[]){let t;switch(n){case"Browser":t=_l(Oe());break;case"Worker":t=`${_l(Oe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Fn}/${r}`}/**
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
 */class _g{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,c)=>{try{const u=e(s);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function yg(n,e={}){return Ft(n,"GET","/v2/passwordPolicy",rn(n,e))}/**
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
 */const vg=6;class Eg{constructor(e){var t,r,i,s;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:vg,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new yl(this),this.idTokenSubscription=new yl(this),this.beforeStateQueue=new _g(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Xu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=lt(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await In.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await rh(this,{idToken:e}),r=await ct._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(He(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&u?.user&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ui(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=eg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(He(this.app))return Promise.reject(Ct(this));const t=e?me(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return He(this.app)?Promise.reject(Ct(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return He(this.app)?Promise.reject(Ct(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await yg(this),t=new Eg(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Or("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await pg(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&lt(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await In.create(this,[lt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,i);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ph(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(He(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Jm(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Un(n){return me(n)}class yl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Up(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ls={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function wg(n){ls=n}function mh(n){return ls.loadJS(n)}function Tg(){return ls.recaptchaEnterpriseScript}function Ag(){return ls.gapiScript}function bg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Rg{constructor(){this.enterprise=new Sg}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Sg{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Cg="recaptcha-enterprise",gh="NO_RECAPTCHA";class Pg{constructor(e){this.type=Cg,this.auth=Un(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{og(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new sg(u);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(u=>{c(u)})})}function i(s,a,c){const u=window.grecaptcha;fl(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(gh)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Rg().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&fl(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=Tg();u.length!==0&&(u+=c),mh(u).then(()=>{i(c,s,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function vl(n,e,t,r=!1,i=!1){const s=new Pg(n);let a;if(i)a=gh;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function El(n,e,t,r,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await vl(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await vl(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kg(n,e){const t=ia(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Mi(s,e??{}))return i;Ge(i,"already-initialized")}return t.initialize({options:e})}function Ng(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(lt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Dg(n,e,t){const r=Un(n);z(r._canInitEmulator,r,"emulator-config-failed"),z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=_h(e),{host:a,port:c}=Vg(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),Og()}function _h(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Vg(n){const e=_h(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Il(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:Il(a)}}}function Il(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Og(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return at("not implemented")}_getIdTokenResponse(e){return at("not implemented")}_linkToIdToken(e,t){return at("not implemented")}_getReauthenticationResolver(e){return at("not implemented")}}async function Lg(n,e){return Ft(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mg(n,e){return cs(n,"POST","/v1/accounts:signInWithPassword",rn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xg(n,e){return cs(n,"POST","/v1/accounts:signInWithEmailLink",rn(n,e))}async function Fg(n,e){return cs(n,"POST","/v1/accounts:signInWithEmailLink",rn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br extends ua{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new br(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new br(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return El(e,t,"signInWithPassword",Mg);case"emailLink":return xg(e,{email:this._email,oobCode:this._password});default:Ge(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return El(e,r,"signUpPassword",Lg);case"emailLink":return Fg(e,{idToken:t,email:this._email,oobCode:this._password});default:Ge(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wn(n,e){return cs(n,"POST","/v1/accounts:signInWithIdp",rn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ug="http://localhost";class Zt extends ua{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Zt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ge("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=sa(t,["providerId","signInMethod"]);if(!r||!i)return null;const a=new Zt(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return wn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,wn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,wn(e,t)}buildRequest(){const e={requestUri:Ug,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Lr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bg(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function $g(n){const e=ur(hr(n)).link,t=e?ur(hr(e)).deep_link_id:null,r=ur(hr(n)).deep_link_id;return(r?ur(hr(r)).link:null)||r||t||e||n}class ha{constructor(e){var t,r,i,s,a,c;const u=ur(hr(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,m=(r=u.oobCode)!==null&&r!==void 0?r:null,v=Bg((i=u.mode)!==null&&i!==void 0?i:null);z(d&&m&&v,"argument-error"),this.apiKey=d,this.operation=v,this.code=m,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=u.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=$g(e);try{return new ha(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(){this.providerId=Bn.PROVIDER_ID}static credential(e,t){return br._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=ha.parseLink(t);return z(r,"argument-error"),br._fromEmailAndCode(e,r.code,r.tenantId)}}Bn.PROVIDER_ID="password";Bn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Bn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class xr extends yh{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et extends xr{constructor(){super("facebook.com")}static credential(e){return Zt._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Et.credential(e.oauthAccessToken)}catch{return null}}}Et.FACEBOOK_SIGN_IN_METHOD="facebook.com";Et.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It extends xr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Zt._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return It.credential(t,r)}catch{return null}}}It.GOOGLE_SIGN_IN_METHOD="google.com";It.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt extends xr{constructor(){super("github.com")}static credential(e){return Zt._fromParams({providerId:wt.PROVIDER_ID,signInMethod:wt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wt.credentialFromTaggedObject(e)}static credentialFromError(e){return wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wt.credential(e.oauthAccessToken)}catch{return null}}}wt.GITHUB_SIGN_IN_METHOD="github.com";wt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt extends xr{constructor(){super("twitter.com")}static credential(e,t){return Zt._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Tt.credential(t,r)}catch{return null}}}Tt.TWITTER_SIGN_IN_METHOD="twitter.com";Tt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await ct._fromIdTokenResponse(e,r,i),a=wl(r);return new Cn({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=wl(r);return new Cn({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function wl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi extends mt{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Bi.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Bi(e,t,r,i)}}function vh(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Bi._fromErrorAndOperation(n,s,e,r):s})}async function jg(n,e,t=!1){const r=await Ar(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Cn._forOperation(n,"link",r)}/**
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
 */async function qg(n,e,t=!1){const{auth:r}=n;if(He(r.app))return Promise.reject(Ct(r));const i="reauthenticate";try{const s=await Ar(n,vh(r,i,e,n),t);z(s.idToken,r,"internal-error");const a=ca(s.idToken);z(a,r,"internal-error");const{sub:c}=a;return z(n.uid===c,r,"user-mismatch"),Cn._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&Ge(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Eh(n,e,t=!1){if(He(n.app))return Promise.reject(Ct(n));const r="signIn",i=await vh(n,r,e),s=await Cn._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function zg(n,e){return Eh(Un(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hg(n){const e=Un(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Wg(n,e,t){return He(n.app)?Promise.reject(Ct(n)):zg(me(n),Bn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Hg(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gg(n,e){return me(n).setPersistence(e)}function Kg(n,e,t,r){return me(n).onIdTokenChanged(e,t,r)}function Qg(n,e,t){return me(n).beforeAuthStateChanged(e,t)}function Yg(n,e,t,r){return me(n).onAuthStateChanged(e,t,r)}function Jg(n){return me(n).signOut()}const $i="__sak";/**
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
 */class Ih{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem($i,"1"),this.storage.removeItem($i),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xg=1e3,Zg=10;class wh extends Ih{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);gg()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Zg):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Xg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}wh.type="LOCAL";const Th=wh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah extends Ih{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ah.type="SESSION";const bh=Ah;/**
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
 */function e_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class us{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new us(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(a).map(async d=>d(t.origin,s)),u=await e_(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}us.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class t_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,u)=>{const d=da("",20);i.port1.start();const m=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(v){const T=v;if(T.data.eventId===d)switch(T.data.status){case"ack":clearTimeout(m),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(T.data.response);break;default:clearTimeout(m),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(){return window}function n_(n){Xe().location.href=n}/**
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
 */function Rh(){return typeof Xe().WorkerGlobalScope<"u"&&typeof Xe().importScripts=="function"}async function r_(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function i_(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function s_(){return Rh()?self:null}/**
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
 */const Sh="firebaseLocalStorageDb",o_=1,ji="firebaseLocalStorage",Ch="fbase_key";class Fr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function hs(n,e){return n.transaction([ji],e?"readwrite":"readonly").objectStore(ji)}function a_(){const n=indexedDB.deleteDatabase(Sh);return new Fr(n).toPromise()}function ko(){const n=indexedDB.open(Sh,o_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ji,{keyPath:Ch})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ji)?e(r):(r.close(),await a_(),e(await ko()))})})}async function Tl(n,e,t){const r=hs(n,!0).put({[Ch]:e,value:t});return new Fr(r).toPromise()}async function c_(n,e){const t=hs(n,!1).get(e),r=await new Fr(t).toPromise();return r===void 0?null:r.value}function Al(n,e){const t=hs(n,!0).delete(e);return new Fr(t).toPromise()}const l_=800,u_=3;class Ph{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ko(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>u_)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Rh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=us._getInstance(s_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await r_(),!this.activeServiceWorker)return;this.sender=new t_(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||i_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ko();return await Tl(e,$i,"1"),await Al(e,$i),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Tl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>c_(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Al(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=hs(i,!1).getAll();return new Fr(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),l_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ph.type="LOCAL";const h_=Ph;new Mr(3e4,6e4);/**
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
 */function d_(n,e){return e?lt(e):(z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class fa extends ua{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return wn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return wn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return wn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function f_(n){return Eh(n.auth,new fa(n),n.bypassAuthState)}function p_(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),qg(t,new fa(n),n.bypassAuthState)}async function m_(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),jg(t,new fa(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return f_;case"linkViaPopup":case"linkViaRedirect":return m_;case"reauthViaPopup":case"reauthViaRedirect":return p_;default:Ge(this.auth,"internal-error")}}resolve(e){dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_=new Mr(2e3,1e4);class vn extends kh{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,vn.currentPopupAction&&vn.currentPopupAction.cancel(),vn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){dt(this.filter.length===1,"Popup operations only handle one event");const e=da();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Je(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Je(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,vn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Je(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,g_.get())};e()}}vn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const __="pendingRedirect",Ti=new Map;class y_ extends kh{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ti.get(this.auth._key());if(!e){try{const r=await v_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ti.set(this.auth._key(),e)}return this.bypassAuthState||Ti.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function v_(n,e){const t=w_(e),r=I_(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function E_(n,e){Ti.set(n._key(),e)}function I_(n){return lt(n._redirectPersistence)}function w_(n){return wi(__,n.config.apiKey,n.name)}async function T_(n,e,t=!1){if(He(n.app))return Promise.reject(Ct(n));const r=Un(n),i=d_(r,e),a=await new y_(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A_=10*60*1e3;class b_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!R_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Nh(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Je(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=A_&&this.cachedEventUids.clear(),this.cachedEventUids.has(bl(e))}saveEventToCache(e){this.cachedEventUids.add(bl(e)),this.lastProcessedEventTime=Date.now()}}function bl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Nh({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function R_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Nh(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function S_(n,e={}){return Ft(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,P_=/^https?/;async function k_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await S_(n);for(const t of e)try{if(N_(t))return}catch{}Ge(n,"unauthorized-domain")}function N_(n){const e=Co(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!P_.test(t))return!1;if(C_.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const D_=new Mr(3e4,6e4);function Rl(){const n=Xe().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function V_(n){return new Promise((e,t)=>{var r,i,s;function a(){Rl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Rl(),t(Je(n,"network-request-failed"))},timeout:D_.get()})}if(!((i=(r=Xe().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Xe().gapi)===null||s===void 0)&&s.load)a();else{const c=bg("iframefcb");return Xe()[c]=()=>{gapi.load?a():t(Je(n,"network-request-failed"))},mh(`${Ag()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ai=null,e})}let Ai=null;function O_(n){return Ai=Ai||V_(n),Ai}/**
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
 */const L_=new Mr(5e3,15e3),M_="__/auth/iframe",x_="emulator/auth/iframe",F_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},U_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function B_(n){const e=n.config;z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?aa(e,x_):`https://${n.config.authDomain}/${M_}`,r={apiKey:e.apiKey,appName:n.name,v:Fn},i=U_.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Lr(r).slice(1)}`}async function $_(n){const e=await O_(n),t=Xe().gapi;return z(t,n,"internal-error"),e.open({where:document.body,url:B_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:F_,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=Je(n,"network-request-failed"),c=Xe().setTimeout(()=>{s(a)},L_.get());function u(){Xe().clearTimeout(c),i(r)}r.ping(u).then(u,()=>{s(a)})}))}/**
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
 */const j_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},q_=500,z_=600,H_="_blank",W_="http://localhost";class Sl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function G_(n,e,t,r=q_,i=z_){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},j_),{width:r.toString(),height:i.toString(),top:s,left:a}),d=Oe().toLowerCase();t&&(c=ch(d)?H_:t),oh(d)&&(e=e||W_,u.scrollbars="yes");const m=Object.entries(u).reduce((T,[S,O])=>`${T}${S}=${O},`,"");if(mg(d)&&c!=="_self")return K_(e||"",c),new Sl(null);const v=window.open(e||"",c,m);z(v,n,"popup-blocked");try{v.focus()}catch{}return new Sl(v)}function K_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Q_="__/auth/handler",Y_="emulator/auth/handler",J_=encodeURIComponent("fac");async function Cl(n,e,t,r,i,s){z(n.config.authDomain,n,"auth-domain-config-required"),z(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Fn,eventId:i};if(e instanceof yh){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Fp(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[m,v]of Object.entries({}))a[m]=v}if(e instanceof xr){const m=e.getScopes().filter(v=>v!=="");m.length>0&&(a.scopes=m.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const m of Object.keys(c))c[m]===void 0&&delete c[m];const u=await n._getAppCheckToken(),d=u?`#${J_}=${encodeURIComponent(u)}`:"";return`${X_(n)}?${Lr(c).slice(1)}${d}`}function X_({config:n}){return n.emulator?aa(n,Y_):`https://${n.authDomain}/${Q_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mo="webStorageSupport";class Z_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=bh,this._completeRedirectFn=T_,this._overrideRedirectResult=E_}async _openPopup(e,t,r,i){var s;dt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await Cl(e,t,r,Co(),i);return G_(e,a,da())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Cl(e,t,r,Co(),i);return n_(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(dt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await $_(e),r=new b_(e);return t.register("authEvent",i=>(z(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(mo,{type:mo},i=>{var s;const a=(s=i?.[0])===null||s===void 0?void 0:s[mo];a!==void 0&&t(!!a),Ge(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=k_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return fh()||ah()||la()}}const ey=Z_;var Pl="@firebase/auth",kl="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ny(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ry(n){Sn(new Xt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;z(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ph(n)},d=new Ig(r,i,s,u);return Ng(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Sn(new Xt("auth-internal",e=>{const t=Un(e.getProvider("auth").getImmediate());return(r=>new ty(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),St(Pl,kl,ny(n)),St(Pl,kl,"esm2017")}/**
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
 */const iy=5*60,sy=zu("authIdTokenMaxAge")||iy;let Nl=null;const oy=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>sy)return;const i=t?.token;Nl!==i&&(Nl=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function ay(n=Ku()){const e=ia(n,"auth");if(e.isInitialized())return e.getImmediate();const t=kg(n,{popupRedirectResolver:ey,persistence:[h_,Th,bh]}),r=zu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=oy(s.toString());Qg(t,a,()=>a(t.currentUser)),Kg(t,c=>a(c))}}const i=ju("auth");return i&&Dg(t,`http://${i}`),t}function cy(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}wg({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Je("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",cy().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ry("Browser");var Dl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Pt,Dh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,p){function g(){}g.prototype=p.prototype,y.D=p.prototype,y.prototype=new g,y.prototype.constructor=y,y.C=function(I,w,A){for(var E=Array(arguments.length-2),V=2;V<arguments.length;V++)E[V-2]=arguments[V];return p.prototype[w].apply(I,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(y,p,g){g||(g=0);var I=Array(16);if(typeof p=="string")for(var w=0;16>w;++w)I[w]=p.charCodeAt(g++)|p.charCodeAt(g++)<<8|p.charCodeAt(g++)<<16|p.charCodeAt(g++)<<24;else for(w=0;16>w;++w)I[w]=p[g++]|p[g++]<<8|p[g++]<<16|p[g++]<<24;p=y.g[0],g=y.g[1],w=y.g[2];var A=y.g[3],E=p+(A^g&(w^A))+I[0]+3614090360&4294967295;p=g+(E<<7&4294967295|E>>>25),E=A+(w^p&(g^w))+I[1]+3905402710&4294967295,A=p+(E<<12&4294967295|E>>>20),E=w+(g^A&(p^g))+I[2]+606105819&4294967295,w=A+(E<<17&4294967295|E>>>15),E=g+(p^w&(A^p))+I[3]+3250441966&4294967295,g=w+(E<<22&4294967295|E>>>10),E=p+(A^g&(w^A))+I[4]+4118548399&4294967295,p=g+(E<<7&4294967295|E>>>25),E=A+(w^p&(g^w))+I[5]+1200080426&4294967295,A=p+(E<<12&4294967295|E>>>20),E=w+(g^A&(p^g))+I[6]+2821735955&4294967295,w=A+(E<<17&4294967295|E>>>15),E=g+(p^w&(A^p))+I[7]+4249261313&4294967295,g=w+(E<<22&4294967295|E>>>10),E=p+(A^g&(w^A))+I[8]+1770035416&4294967295,p=g+(E<<7&4294967295|E>>>25),E=A+(w^p&(g^w))+I[9]+2336552879&4294967295,A=p+(E<<12&4294967295|E>>>20),E=w+(g^A&(p^g))+I[10]+4294925233&4294967295,w=A+(E<<17&4294967295|E>>>15),E=g+(p^w&(A^p))+I[11]+2304563134&4294967295,g=w+(E<<22&4294967295|E>>>10),E=p+(A^g&(w^A))+I[12]+1804603682&4294967295,p=g+(E<<7&4294967295|E>>>25),E=A+(w^p&(g^w))+I[13]+4254626195&4294967295,A=p+(E<<12&4294967295|E>>>20),E=w+(g^A&(p^g))+I[14]+2792965006&4294967295,w=A+(E<<17&4294967295|E>>>15),E=g+(p^w&(A^p))+I[15]+1236535329&4294967295,g=w+(E<<22&4294967295|E>>>10),E=p+(w^A&(g^w))+I[1]+4129170786&4294967295,p=g+(E<<5&4294967295|E>>>27),E=A+(g^w&(p^g))+I[6]+3225465664&4294967295,A=p+(E<<9&4294967295|E>>>23),E=w+(p^g&(A^p))+I[11]+643717713&4294967295,w=A+(E<<14&4294967295|E>>>18),E=g+(A^p&(w^A))+I[0]+3921069994&4294967295,g=w+(E<<20&4294967295|E>>>12),E=p+(w^A&(g^w))+I[5]+3593408605&4294967295,p=g+(E<<5&4294967295|E>>>27),E=A+(g^w&(p^g))+I[10]+38016083&4294967295,A=p+(E<<9&4294967295|E>>>23),E=w+(p^g&(A^p))+I[15]+3634488961&4294967295,w=A+(E<<14&4294967295|E>>>18),E=g+(A^p&(w^A))+I[4]+3889429448&4294967295,g=w+(E<<20&4294967295|E>>>12),E=p+(w^A&(g^w))+I[9]+568446438&4294967295,p=g+(E<<5&4294967295|E>>>27),E=A+(g^w&(p^g))+I[14]+3275163606&4294967295,A=p+(E<<9&4294967295|E>>>23),E=w+(p^g&(A^p))+I[3]+4107603335&4294967295,w=A+(E<<14&4294967295|E>>>18),E=g+(A^p&(w^A))+I[8]+1163531501&4294967295,g=w+(E<<20&4294967295|E>>>12),E=p+(w^A&(g^w))+I[13]+2850285829&4294967295,p=g+(E<<5&4294967295|E>>>27),E=A+(g^w&(p^g))+I[2]+4243563512&4294967295,A=p+(E<<9&4294967295|E>>>23),E=w+(p^g&(A^p))+I[7]+1735328473&4294967295,w=A+(E<<14&4294967295|E>>>18),E=g+(A^p&(w^A))+I[12]+2368359562&4294967295,g=w+(E<<20&4294967295|E>>>12),E=p+(g^w^A)+I[5]+4294588738&4294967295,p=g+(E<<4&4294967295|E>>>28),E=A+(p^g^w)+I[8]+2272392833&4294967295,A=p+(E<<11&4294967295|E>>>21),E=w+(A^p^g)+I[11]+1839030562&4294967295,w=A+(E<<16&4294967295|E>>>16),E=g+(w^A^p)+I[14]+4259657740&4294967295,g=w+(E<<23&4294967295|E>>>9),E=p+(g^w^A)+I[1]+2763975236&4294967295,p=g+(E<<4&4294967295|E>>>28),E=A+(p^g^w)+I[4]+1272893353&4294967295,A=p+(E<<11&4294967295|E>>>21),E=w+(A^p^g)+I[7]+4139469664&4294967295,w=A+(E<<16&4294967295|E>>>16),E=g+(w^A^p)+I[10]+3200236656&4294967295,g=w+(E<<23&4294967295|E>>>9),E=p+(g^w^A)+I[13]+681279174&4294967295,p=g+(E<<4&4294967295|E>>>28),E=A+(p^g^w)+I[0]+3936430074&4294967295,A=p+(E<<11&4294967295|E>>>21),E=w+(A^p^g)+I[3]+3572445317&4294967295,w=A+(E<<16&4294967295|E>>>16),E=g+(w^A^p)+I[6]+76029189&4294967295,g=w+(E<<23&4294967295|E>>>9),E=p+(g^w^A)+I[9]+3654602809&4294967295,p=g+(E<<4&4294967295|E>>>28),E=A+(p^g^w)+I[12]+3873151461&4294967295,A=p+(E<<11&4294967295|E>>>21),E=w+(A^p^g)+I[15]+530742520&4294967295,w=A+(E<<16&4294967295|E>>>16),E=g+(w^A^p)+I[2]+3299628645&4294967295,g=w+(E<<23&4294967295|E>>>9),E=p+(w^(g|~A))+I[0]+4096336452&4294967295,p=g+(E<<6&4294967295|E>>>26),E=A+(g^(p|~w))+I[7]+1126891415&4294967295,A=p+(E<<10&4294967295|E>>>22),E=w+(p^(A|~g))+I[14]+2878612391&4294967295,w=A+(E<<15&4294967295|E>>>17),E=g+(A^(w|~p))+I[5]+4237533241&4294967295,g=w+(E<<21&4294967295|E>>>11),E=p+(w^(g|~A))+I[12]+1700485571&4294967295,p=g+(E<<6&4294967295|E>>>26),E=A+(g^(p|~w))+I[3]+2399980690&4294967295,A=p+(E<<10&4294967295|E>>>22),E=w+(p^(A|~g))+I[10]+4293915773&4294967295,w=A+(E<<15&4294967295|E>>>17),E=g+(A^(w|~p))+I[1]+2240044497&4294967295,g=w+(E<<21&4294967295|E>>>11),E=p+(w^(g|~A))+I[8]+1873313359&4294967295,p=g+(E<<6&4294967295|E>>>26),E=A+(g^(p|~w))+I[15]+4264355552&4294967295,A=p+(E<<10&4294967295|E>>>22),E=w+(p^(A|~g))+I[6]+2734768916&4294967295,w=A+(E<<15&4294967295|E>>>17),E=g+(A^(w|~p))+I[13]+1309151649&4294967295,g=w+(E<<21&4294967295|E>>>11),E=p+(w^(g|~A))+I[4]+4149444226&4294967295,p=g+(E<<6&4294967295|E>>>26),E=A+(g^(p|~w))+I[11]+3174756917&4294967295,A=p+(E<<10&4294967295|E>>>22),E=w+(p^(A|~g))+I[2]+718787259&4294967295,w=A+(E<<15&4294967295|E>>>17),E=g+(A^(w|~p))+I[9]+3951481745&4294967295,y.g[0]=y.g[0]+p&4294967295,y.g[1]=y.g[1]+(w+(E<<21&4294967295|E>>>11))&4294967295,y.g[2]=y.g[2]+w&4294967295,y.g[3]=y.g[3]+A&4294967295}r.prototype.u=function(y,p){p===void 0&&(p=y.length);for(var g=p-this.blockSize,I=this.B,w=this.h,A=0;A<p;){if(w==0)for(;A<=g;)i(this,y,A),A+=this.blockSize;if(typeof y=="string"){for(;A<p;)if(I[w++]=y.charCodeAt(A++),w==this.blockSize){i(this,I),w=0;break}}else for(;A<p;)if(I[w++]=y[A++],w==this.blockSize){i(this,I),w=0;break}}this.h=w,this.o+=p},r.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var p=1;p<y.length-8;++p)y[p]=0;var g=8*this.o;for(p=y.length-8;p<y.length;++p)y[p]=g&255,g/=256;for(this.u(y),y=Array(16),p=g=0;4>p;++p)for(var I=0;32>I;I+=8)y[g++]=this.g[p]>>>I&255;return y};function s(y,p){var g=c;return Object.prototype.hasOwnProperty.call(g,y)?g[y]:g[y]=p(y)}function a(y,p){this.h=p;for(var g=[],I=!0,w=y.length-1;0<=w;w--){var A=y[w]|0;I&&A==p||(g[w]=A,I=!1)}this.g=g}var c={};function u(y){return-128<=y&&128>y?s(y,function(p){return new a([p|0],0>p?-1:0)}):new a([y|0],0>y?-1:0)}function d(y){if(isNaN(y)||!isFinite(y))return v;if(0>y)return N(d(-y));for(var p=[],g=1,I=0;y>=g;I++)p[I]=y/g|0,g*=4294967296;return new a(p,0)}function m(y,p){if(y.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(y.charAt(0)=="-")return N(m(y.substring(1),p));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=d(Math.pow(p,8)),I=v,w=0;w<y.length;w+=8){var A=Math.min(8,y.length-w),E=parseInt(y.substring(w,w+A),p);8>A?(A=d(Math.pow(p,A)),I=I.j(A).add(d(E))):(I=I.j(g),I=I.add(d(E)))}return I}var v=u(0),T=u(1),S=u(16777216);n=a.prototype,n.m=function(){if(k(this))return-N(this).m();for(var y=0,p=1,g=0;g<this.g.length;g++){var I=this.i(g);y+=(0<=I?I:4294967296+I)*p,p*=4294967296}return y},n.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(O(this))return"0";if(k(this))return"-"+N(this).toString(y);for(var p=d(Math.pow(y,6)),g=this,I="";;){var w=Z(g,p).g;g=B(g,w.j(p));var A=((0<g.g.length?g.g[0]:g.h)>>>0).toString(y);if(g=w,O(g))return A+I;for(;6>A.length;)A="0"+A;I=A+I}},n.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function O(y){if(y.h!=0)return!1;for(var p=0;p<y.g.length;p++)if(y.g[p]!=0)return!1;return!0}function k(y){return y.h==-1}n.l=function(y){return y=B(this,y),k(y)?-1:O(y)?0:1};function N(y){for(var p=y.g.length,g=[],I=0;I<p;I++)g[I]=~y.g[I];return new a(g,~y.h).add(T)}n.abs=function(){return k(this)?N(this):this},n.add=function(y){for(var p=Math.max(this.g.length,y.g.length),g=[],I=0,w=0;w<=p;w++){var A=I+(this.i(w)&65535)+(y.i(w)&65535),E=(A>>>16)+(this.i(w)>>>16)+(y.i(w)>>>16);I=E>>>16,A&=65535,E&=65535,g[w]=E<<16|A}return new a(g,g[g.length-1]&-2147483648?-1:0)};function B(y,p){return y.add(N(p))}n.j=function(y){if(O(this)||O(y))return v;if(k(this))return k(y)?N(this).j(N(y)):N(N(this).j(y));if(k(y))return N(this.j(N(y)));if(0>this.l(S)&&0>y.l(S))return d(this.m()*y.m());for(var p=this.g.length+y.g.length,g=[],I=0;I<2*p;I++)g[I]=0;for(I=0;I<this.g.length;I++)for(var w=0;w<y.g.length;w++){var A=this.i(I)>>>16,E=this.i(I)&65535,V=y.i(w)>>>16,x=y.i(w)&65535;g[2*I+2*w]+=E*x,q(g,2*I+2*w),g[2*I+2*w+1]+=A*x,q(g,2*I+2*w+1),g[2*I+2*w+1]+=E*V,q(g,2*I+2*w+1),g[2*I+2*w+2]+=A*V,q(g,2*I+2*w+2)}for(I=0;I<p;I++)g[I]=g[2*I+1]<<16|g[2*I];for(I=p;I<2*p;I++)g[I]=0;return new a(g,0)};function q(y,p){for(;(y[p]&65535)!=y[p];)y[p+1]+=y[p]>>>16,y[p]&=65535,p++}function Q(y,p){this.g=y,this.h=p}function Z(y,p){if(O(p))throw Error("division by zero");if(O(y))return new Q(v,v);if(k(y))return p=Z(N(y),p),new Q(N(p.g),N(p.h));if(k(p))return p=Z(y,N(p)),new Q(N(p.g),p.h);if(30<y.g.length){if(k(y)||k(p))throw Error("slowDivide_ only works with positive integers.");for(var g=T,I=p;0>=I.l(y);)g=L(g),I=L(I);var w=R(g,1),A=R(I,1);for(I=R(I,2),g=R(g,2);!O(I);){var E=A.add(I);0>=E.l(y)&&(w=w.add(g),A=E),I=R(I,1),g=R(g,1)}return p=B(y,w.j(p)),new Q(w,p)}for(w=v;0<=y.l(p);){for(g=Math.max(1,Math.floor(y.m()/p.m())),I=Math.ceil(Math.log(g)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),A=d(g),E=A.j(p);k(E)||0<E.l(y);)g-=I,A=d(g),E=A.j(p);O(A)&&(A=T),w=w.add(A),y=B(y,E)}return new Q(w,y)}n.A=function(y){return Z(this,y).h},n.and=function(y){for(var p=Math.max(this.g.length,y.g.length),g=[],I=0;I<p;I++)g[I]=this.i(I)&y.i(I);return new a(g,this.h&y.h)},n.or=function(y){for(var p=Math.max(this.g.length,y.g.length),g=[],I=0;I<p;I++)g[I]=this.i(I)|y.i(I);return new a(g,this.h|y.h)},n.xor=function(y){for(var p=Math.max(this.g.length,y.g.length),g=[],I=0;I<p;I++)g[I]=this.i(I)^y.i(I);return new a(g,this.h^y.h)};function L(y){for(var p=y.g.length+1,g=[],I=0;I<p;I++)g[I]=y.i(I)<<1|y.i(I-1)>>>31;return new a(g,y.h)}function R(y,p){var g=p>>5;p%=32;for(var I=y.g.length-g,w=[],A=0;A<I;A++)w[A]=0<p?y.i(A+g)>>>p|y.i(A+g+1)<<32-p:y.i(A+g);return new a(w,y.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Dh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,Pt=a}).apply(typeof Dl<"u"?Dl:typeof self<"u"?self:typeof window<"u"?window:{});var di=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Vh,dr,Oh,bi,No,Lh,Mh,xh;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,h){return o==Array.prototype||o==Object.prototype||(o[l]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof di=="object"&&di];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,l){if(l)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var b=o[f];if(!(b in h))break e;h=h[b]}o=o[o.length-1],f=h[o],l=l(f),l!=f&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}function s(o,l){o instanceof String&&(o+="");var h=0,f=!1,b={next:function(){if(!f&&h<o.length){var C=h++;return{value:l(C,o[C]),done:!1}}return f=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}i("Array.prototype.values",function(o){return o||function(){return s(this,function(l,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function d(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function m(o,l,h){return o.call.apply(o.bind,arguments)}function v(o,l,h){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,f),o.apply(l,b)}}return function(){return o.apply(l,arguments)}}function T(o,l,h){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:v,T.apply(null,arguments)}function S(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function O(o,l){function h(){}h.prototype=l.prototype,o.aa=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(f,b,C){for(var M=Array(arguments.length-2),ie=2;ie<arguments.length;ie++)M[ie-2]=arguments[ie];return l.prototype[b].apply(f,M)}}function k(o){const l=o.length;if(0<l){const h=Array(l);for(let f=0;f<l;f++)h[f]=o[f];return h}return[]}function N(o,l){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(u(f)){const b=o.length||0,C=f.length||0;o.length=b+C;for(let M=0;M<C;M++)o[b+M]=f[M]}else o.push(f)}}class B{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function q(o){return/^[\s\xa0]*$/.test(o)}function Q(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function Z(o){return Z[" "](o),o}Z[" "]=function(){};var L=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function R(o,l,h){for(const f in o)l.call(h,o[f],f,o)}function y(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function p(o){const l={};for(const h in o)l[h]=o[h];return l}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,l){let h,f;for(let b=1;b<arguments.length;b++){f=arguments[b];for(h in f)o[h]=f[h];for(let C=0;C<g.length;C++)h=g[C],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function w(o){var l=1;o=o.split(":");const h=[];for(;0<l&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function A(o){c.setTimeout(()=>{throw o},0)}function E(){var o=le;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class V{constructor(){this.h=this.g=null}add(l,h){const f=x.get();f.set(l,h),this.h?this.h.next=f:this.g=f,this.h=f}}var x=new B(()=>new K,o=>o.reset());class K{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let se,fe=!1,le=new V,Qe=()=>{const o=c.Promise.resolve(void 0);se=()=>{o.then(Qn)}};var Qn=()=>{for(var o;o=E();){try{o.h.call(o.g)}catch(h){A(h)}var l=x;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}fe=!1};function Be(){this.s=this.s,this.C=this.C}Be.prototype.s=!1,Be.prototype.ma=function(){this.s||(this.s=!0,this.N())},Be.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ge(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}ge.prototype.h=function(){this.defaultPrevented=!0};var Of=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};c.addEventListener("test",h,l),c.removeEventListener("test",h,l)}catch{}return o}();function Yn(o,l){if(ge.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(L){e:{try{Z(l.nodeName);var b=!0;break e}catch{}b=!1}b||(l=null)}}else h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Lf[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Yn.aa.h.call(this)}}O(Yn,ge);var Lf={2:"touch",3:"pen",4:"mouse"};Yn.prototype.h=function(){Yn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Wr="closure_listenable_"+(1e6*Math.random()|0),Mf=0;function xf(o,l,h,f,b){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!f,this.ha=b,this.key=++Mf,this.da=this.fa=!1}function Gr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Kr(o){this.src=o,this.g={},this.h=0}Kr.prototype.add=function(o,l,h,f,b){var C=o.toString();o=this.g[C],o||(o=this.g[C]=[],this.h++);var M=Bs(o,l,f,b);return-1<M?(l=o[M],h||(l.fa=!1)):(l=new xf(l,this.src,C,!!f,b),l.fa=h,o.push(l)),l};function Us(o,l){var h=l.type;if(h in o.g){var f=o.g[h],b=Array.prototype.indexOf.call(f,l,void 0),C;(C=0<=b)&&Array.prototype.splice.call(f,b,1),C&&(Gr(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Bs(o,l,h,f){for(var b=0;b<o.length;++b){var C=o[b];if(!C.da&&C.listener==l&&C.capture==!!h&&C.ha==f)return b}return-1}var $s="closure_lm_"+(1e6*Math.random()|0),js={};function rc(o,l,h,f,b){if(Array.isArray(l)){for(var C=0;C<l.length;C++)rc(o,l[C],h,f,b);return null}return h=oc(h),o&&o[Wr]?o.K(l,h,d(f)?!!f.capture:!1,b):Ff(o,l,h,!1,f,b)}function Ff(o,l,h,f,b,C){if(!l)throw Error("Invalid event type");var M=d(b)?!!b.capture:!!b,ie=zs(o);if(ie||(o[$s]=ie=new Kr(o)),h=ie.add(l,h,f,M,C),h.proxy)return h;if(f=Uf(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)Of||(b=M),b===void 0&&(b=!1),o.addEventListener(l.toString(),f,b);else if(o.attachEvent)o.attachEvent(sc(l.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Uf(){function o(h){return l.call(o.src,o.listener,h)}const l=Bf;return o}function ic(o,l,h,f,b){if(Array.isArray(l))for(var C=0;C<l.length;C++)ic(o,l[C],h,f,b);else f=d(f)?!!f.capture:!!f,h=oc(h),o&&o[Wr]?(o=o.i,l=String(l).toString(),l in o.g&&(C=o.g[l],h=Bs(C,h,f,b),-1<h&&(Gr(C[h]),Array.prototype.splice.call(C,h,1),C.length==0&&(delete o.g[l],o.h--)))):o&&(o=zs(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Bs(l,h,f,b)),(h=-1<o?l[o]:null)&&qs(h))}function qs(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[Wr])Us(l.i,o);else{var h=o.type,f=o.proxy;l.removeEventListener?l.removeEventListener(h,f,o.capture):l.detachEvent?l.detachEvent(sc(h),f):l.addListener&&l.removeListener&&l.removeListener(f),(h=zs(l))?(Us(h,o),h.h==0&&(h.src=null,l[$s]=null)):Gr(o)}}}function sc(o){return o in js?js[o]:js[o]="on"+o}function Bf(o,l){if(o.da)o=!0;else{l=new Yn(l,this);var h=o.listener,f=o.ha||o.src;o.fa&&qs(o),o=h.call(f,l)}return o}function zs(o){return o=o[$s],o instanceof Kr?o:null}var Hs="__closure_events_fn_"+(1e9*Math.random()>>>0);function oc(o){return typeof o=="function"?o:(o[Hs]||(o[Hs]=function(l){return o.handleEvent(l)}),o[Hs])}function Ce(){Be.call(this),this.i=new Kr(this),this.M=this,this.F=null}O(Ce,Be),Ce.prototype[Wr]=!0,Ce.prototype.removeEventListener=function(o,l,h,f){ic(this,o,l,h,f)};function Le(o,l){var h,f=o.F;if(f)for(h=[];f;f=f.F)h.push(f);if(o=o.M,f=l.type||l,typeof l=="string")l=new ge(l,o);else if(l instanceof ge)l.target=l.target||o;else{var b=l;l=new ge(f,o),I(l,b)}if(b=!0,h)for(var C=h.length-1;0<=C;C--){var M=l.g=h[C];b=Qr(M,f,!0,l)&&b}if(M=l.g=o,b=Qr(M,f,!0,l)&&b,b=Qr(M,f,!1,l)&&b,h)for(C=0;C<h.length;C++)M=l.g=h[C],b=Qr(M,f,!1,l)&&b}Ce.prototype.N=function(){if(Ce.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var h=o.g[l],f=0;f<h.length;f++)Gr(h[f]);delete o.g[l],o.h--}}this.F=null},Ce.prototype.K=function(o,l,h,f){return this.i.add(String(o),l,!1,h,f)},Ce.prototype.L=function(o,l,h,f){return this.i.add(String(o),l,!0,h,f)};function Qr(o,l,h,f){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var b=!0,C=0;C<l.length;++C){var M=l[C];if(M&&!M.da&&M.capture==h){var ie=M.listener,Ae=M.ha||M.src;M.fa&&Us(o.i,M),b=ie.call(Ae,f)!==!1&&b}}return b&&!f.defaultPrevented}function ac(o,l,h){if(typeof o=="function")h&&(o=T(o,h));else if(o&&typeof o.handleEvent=="function")o=T(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(o,l||0)}function cc(o){o.g=ac(()=>{o.g=null,o.i&&(o.i=!1,cc(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class $f extends Be{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:cc(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Jn(o){Be.call(this),this.h=o,this.g={}}O(Jn,Be);var lc=[];function uc(o){R(o.g,function(l,h){this.g.hasOwnProperty(h)&&qs(l)},o),o.g={}}Jn.prototype.N=function(){Jn.aa.N.call(this),uc(this)},Jn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ws=c.JSON.stringify,jf=c.JSON.parse,qf=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function Gs(){}Gs.prototype.h=null;function hc(o){return o.h||(o.h=o.i())}function dc(){}var Xn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ks(){ge.call(this,"d")}O(Ks,ge);function Qs(){ge.call(this,"c")}O(Qs,ge);var $t={},fc=null;function Yr(){return fc=fc||new Ce}$t.La="serverreachability";function pc(o){ge.call(this,$t.La,o)}O(pc,ge);function Zn(o){const l=Yr();Le(l,new pc(l))}$t.STAT_EVENT="statevent";function mc(o,l){ge.call(this,$t.STAT_EVENT,o),this.stat=l}O(mc,ge);function Me(o){const l=Yr();Le(l,new mc(l,o))}$t.Ma="timingevent";function gc(o,l){ge.call(this,$t.Ma,o),this.size=l}O(gc,ge);function er(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},l)}function tr(){this.g=!0}tr.prototype.xa=function(){this.g=!1};function zf(o,l,h,f,b,C){o.info(function(){if(o.g)if(C)for(var M="",ie=C.split("&"),Ae=0;Ae<ie.length;Ae++){var te=ie[Ae].split("=");if(1<te.length){var Pe=te[0];te=te[1];var ke=Pe.split("_");M=2<=ke.length&&ke[1]=="type"?M+(Pe+"="+te+"&"):M+(Pe+"=redacted&")}}else M=null;else M=C;return"XMLHTTP REQ ("+f+") [attempt "+b+"]: "+l+`
`+h+`
`+M})}function Hf(o,l,h,f,b,C,M){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+b+"]: "+l+`
`+h+`
`+C+" "+M})}function un(o,l,h,f){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Gf(o,h)+(f?" "+f:"")})}function Wf(o,l){o.info(function(){return"TIMEOUT: "+l})}tr.prototype.info=function(){};function Gf(o,l){if(!o.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var f=h[o];if(!(2>f.length)){var b=f[1];if(Array.isArray(b)&&!(1>b.length)){var C=b[0];if(C!="noop"&&C!="stop"&&C!="close")for(var M=1;M<b.length;M++)b[M]=""}}}}return Ws(h)}catch{return l}}var Jr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},_c={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ys;function Xr(){}O(Xr,Gs),Xr.prototype.g=function(){return new XMLHttpRequest},Xr.prototype.i=function(){return{}},Ys=new Xr;function gt(o,l,h,f){this.j=o,this.i=l,this.l=h,this.R=f||1,this.U=new Jn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new yc}function yc(){this.i=null,this.g="",this.h=!1}var vc={},Js={};function Xs(o,l,h){o.L=1,o.v=ni(st(l)),o.m=h,o.P=!0,Ec(o,null)}function Ec(o,l){o.F=Date.now(),Zr(o),o.A=st(o.v);var h=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),Oc(h.i,"t",f),o.C=0,h=o.j.J,o.h=new yc,o.g=Xc(o.j,h?l:null,!o.m),0<o.O&&(o.M=new $f(T(o.Y,o,o.g),o.O)),l=o.U,h=o.g,f=o.ca;var b="readystatechange";Array.isArray(b)||(b&&(lc[0]=b.toString()),b=lc);for(var C=0;C<b.length;C++){var M=rc(h,b[C],f||l.handleEvent,!1,l.h||l);if(!M)break;l.g[M.key]=M}l=o.H?p(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),Zn(),zf(o.i,o.u,o.A,o.l,o.R,o.m)}gt.prototype.ca=function(o){o=o.target;const l=this.M;l&&ot(o)==3?l.j():this.Y(o)},gt.prototype.Y=function(o){try{if(o==this.g)e:{const ke=ot(this.g);var l=this.g.Ba();const fn=this.g.Z();if(!(3>ke)&&(ke!=3||this.g&&(this.h.h||this.g.oa()||$c(this.g)))){this.J||ke!=4||l==7||(l==8||0>=fn?Zn(3):Zn(2)),Zs(this);var h=this.g.Z();this.X=h;t:if(Ic(this)){var f=$c(this.g);o="";var b=f.length,C=ot(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){jt(this),nr(this);var M="";break t}this.h.i=new c.TextDecoder}for(l=0;l<b;l++)this.h.h=!0,o+=this.h.i.decode(f[l],{stream:!(C&&l==b-1)});f.length=0,this.h.g+=o,this.C=0,M=this.h.g}else M=this.g.oa();if(this.o=h==200,Hf(this.i,this.u,this.A,this.l,this.R,ke,h),this.o){if(this.T&&!this.K){t:{if(this.g){var ie,Ae=this.g;if((ie=Ae.g?Ae.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(ie)){var te=ie;break t}}te=null}if(h=te)un(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,eo(this,h);else{this.o=!1,this.s=3,Me(12),jt(this),nr(this);break e}}if(this.P){h=!0;let ze;for(;!this.J&&this.C<M.length;)if(ze=Kf(this,M),ze==Js){ke==4&&(this.s=4,Me(14),h=!1),un(this.i,this.l,null,"[Incomplete Response]");break}else if(ze==vc){this.s=4,Me(15),un(this.i,this.l,M,"[Invalid Chunk]"),h=!1;break}else un(this.i,this.l,ze,null),eo(this,ze);if(Ic(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ke!=4||M.length!=0||this.h.h||(this.s=1,Me(16),h=!1),this.o=this.o&&h,!h)un(this.i,this.l,M,"[Invalid Chunked Response]"),jt(this),nr(this);else if(0<M.length&&!this.W){this.W=!0;var Pe=this.j;Pe.g==this&&Pe.ba&&!Pe.M&&(Pe.j.info("Great, no buffering proxy detected. Bytes received: "+M.length),oo(Pe),Pe.M=!0,Me(11))}}else un(this.i,this.l,M,null),eo(this,M);ke==4&&jt(this),this.o&&!this.J&&(ke==4?Kc(this.j,this):(this.o=!1,Zr(this)))}else hp(this.g),h==400&&0<M.indexOf("Unknown SID")?(this.s=3,Me(12)):(this.s=0,Me(13)),jt(this),nr(this)}}}catch{}finally{}};function Ic(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Kf(o,l){var h=o.C,f=l.indexOf(`
`,h);return f==-1?Js:(h=Number(l.substring(h,f)),isNaN(h)?vc:(f+=1,f+h>l.length?Js:(l=l.slice(f,f+h),o.C=f+h,l)))}gt.prototype.cancel=function(){this.J=!0,jt(this)};function Zr(o){o.S=Date.now()+o.I,wc(o,o.I)}function wc(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=er(T(o.ba,o),l)}function Zs(o){o.B&&(c.clearTimeout(o.B),o.B=null)}gt.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Wf(this.i,this.A),this.L!=2&&(Zn(),Me(17)),jt(this),this.s=2,nr(this)):wc(this,this.S-o)};function nr(o){o.j.G==0||o.J||Kc(o.j,o)}function jt(o){Zs(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,uc(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function eo(o,l){try{var h=o.j;if(h.G!=0&&(h.g==o||to(h.h,o))){if(!o.K&&to(h.h,o)&&h.G==3){try{var f=h.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var b=f;if(b[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)ci(h),oi(h);else break e;so(h),Me(18)}}else h.za=b[1],0<h.za-h.T&&37500>b[2]&&h.F&&h.v==0&&!h.C&&(h.C=er(T(h.Za,h),6e3));if(1>=bc(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else zt(h,11)}else if((o.K||h.g==o)&&ci(h),!q(l))for(b=h.Da.g.parse(l),l=0;l<b.length;l++){let te=b[l];if(h.T=te[0],te=te[1],h.G==2)if(te[0]=="c"){h.K=te[1],h.ia=te[2];const Pe=te[3];Pe!=null&&(h.la=Pe,h.j.info("VER="+h.la));const ke=te[4];ke!=null&&(h.Aa=ke,h.j.info("SVER="+h.Aa));const fn=te[5];fn!=null&&typeof fn=="number"&&0<fn&&(f=1.5*fn,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const ze=o.g;if(ze){const ui=ze.g?ze.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ui){var C=f.h;C.g||ui.indexOf("spdy")==-1&&ui.indexOf("quic")==-1&&ui.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(no(C,C.h),C.h=null))}if(f.D){const ao=ze.g?ze.g.getResponseHeader("X-HTTP-Session-Id"):null;ao&&(f.ya=ao,ae(f.I,f.D,ao))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var M=o;if(f.qa=Jc(f,f.J?f.ia:null,f.W),M.K){Rc(f.h,M);var ie=M,Ae=f.L;Ae&&(ie.I=Ae),ie.B&&(Zs(ie),Zr(ie)),f.g=M}else Wc(f);0<h.i.length&&ai(h)}else te[0]!="stop"&&te[0]!="close"||zt(h,7);else h.G==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?zt(h,7):io(h):te[0]!="noop"&&h.l&&h.l.ta(te),h.v=0)}}Zn(4)}catch{}}var Qf=class{constructor(o,l){this.g=o,this.map=l}};function Tc(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ac(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function bc(o){return o.h?1:o.g?o.g.size:0}function to(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function no(o,l){o.g?o.g.add(l):o.h=l}function Rc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Tc.prototype.cancel=function(){if(this.i=Sc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Sc(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.D);return l}return k(o.i)}function Yf(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var l=[],h=o.length,f=0;f<h;f++)l.push(o[f]);return l}l=[],h=0;for(f in o)l[h++]=o[f];return l}function Jf(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var l=[];o=o.length;for(var h=0;h<o;h++)l.push(h);return l}l=[],h=0;for(const f in o)l[h++]=f;return l}}}function Cc(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var h=Jf(o),f=Yf(o),b=f.length,C=0;C<b;C++)l.call(void 0,f[C],h&&h[C],o)}var Pc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xf(o,l){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var f=o[h].indexOf("="),b=null;if(0<=f){var C=o[h].substring(0,f);b=o[h].substring(f+1)}else C=o[h];l(C,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function qt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof qt){this.h=o.h,ei(this,o.j),this.o=o.o,this.g=o.g,ti(this,o.s),this.l=o.l;var l=o.i,h=new sr;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),kc(this,h),this.m=o.m}else o&&(l=String(o).match(Pc))?(this.h=!1,ei(this,l[1]||"",!0),this.o=rr(l[2]||""),this.g=rr(l[3]||"",!0),ti(this,l[4]),this.l=rr(l[5]||"",!0),kc(this,l[6]||"",!0),this.m=rr(l[7]||"")):(this.h=!1,this.i=new sr(null,this.h))}qt.prototype.toString=function(){var o=[],l=this.j;l&&o.push(ir(l,Nc,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(ir(l,Nc,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(ir(h,h.charAt(0)=="/"?tp:ep,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",ir(h,rp)),o.join("")};function st(o){return new qt(o)}function ei(o,l,h){o.j=h?rr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function ti(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function kc(o,l,h){l instanceof sr?(o.i=l,ip(o.i,o.h)):(h||(l=ir(l,np)),o.i=new sr(l,o.h))}function ae(o,l,h){o.i.set(l,h)}function ni(o){return ae(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function rr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ir(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,Zf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Zf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Nc=/[#\/\?@]/g,ep=/[#\?:]/g,tp=/[#\?]/g,np=/[#\?@]/g,rp=/#/g;function sr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function _t(o){o.g||(o.g=new Map,o.h=0,o.i&&Xf(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=sr.prototype,n.add=function(o,l){_t(this),this.i=null,o=hn(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function Dc(o,l){_t(o),l=hn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Vc(o,l){return _t(o),l=hn(o,l),o.g.has(l)}n.forEach=function(o,l){_t(this),this.g.forEach(function(h,f){h.forEach(function(b){o.call(l,b,f,this)},this)},this)},n.na=function(){_t(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let f=0;f<l.length;f++){const b=o[f];for(let C=0;C<b.length;C++)h.push(l[f])}return h},n.V=function(o){_t(this);let l=[];if(typeof o=="string")Vc(this,o)&&(l=l.concat(this.g.get(hn(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)l=l.concat(o[h])}return l},n.set=function(o,l){return _t(this),this.i=null,o=hn(this,o),Vc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function Oc(o,l,h){Dc(o,l),0<h.length&&(o.i=null,o.g.set(hn(o,l),k(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var f=l[h];const C=encodeURIComponent(String(f)),M=this.V(f);for(f=0;f<M.length;f++){var b=C;M[f]!==""&&(b+="="+encodeURIComponent(String(M[f]))),o.push(b)}}return this.i=o.join("&")};function hn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function ip(o,l){l&&!o.j&&(_t(o),o.i=null,o.g.forEach(function(h,f){var b=f.toLowerCase();f!=b&&(Dc(this,f),Oc(this,b,h))},o)),o.j=l}function sp(o,l){const h=new tr;if(c.Image){const f=new Image;f.onload=S(yt,h,"TestLoadImage: loaded",!0,l,f),f.onerror=S(yt,h,"TestLoadImage: error",!1,l,f),f.onabort=S(yt,h,"TestLoadImage: abort",!1,l,f),f.ontimeout=S(yt,h,"TestLoadImage: timeout",!1,l,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else l(!1)}function op(o,l){const h=new tr,f=new AbortController,b=setTimeout(()=>{f.abort(),yt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:f.signal}).then(C=>{clearTimeout(b),C.ok?yt(h,"TestPingServer: ok",!0,l):yt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),yt(h,"TestPingServer: error",!1,l)})}function yt(o,l,h,f,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),f(h)}catch{}}function ap(){this.g=new qf}function cp(o,l,h){const f=h||"";try{Cc(o,function(b,C){let M=b;d(b)&&(M=Ws(b)),l.push(f+C+"="+encodeURIComponent(M))})}catch(b){throw l.push(f+"type="+encodeURIComponent("_badmap")),b}}function ri(o){this.l=o.Ub||null,this.j=o.eb||!1}O(ri,Gs),ri.prototype.g=function(){return new ii(this.l,this.j)},ri.prototype.i=function(o){return function(){return o}}({});function ii(o,l){Ce.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}O(ii,Ce),n=ii.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,ar(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,or(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ar(this)),this.g&&(this.readyState=3,ar(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Lc(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Lc(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?or(this):ar(this),this.readyState==3&&Lc(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,or(this))},n.Qa=function(o){this.g&&(this.response=o,or(this))},n.ga=function(){this.g&&or(this)};function or(o){o.readyState=4,o.l=null,o.j=null,o.v=null,ar(o)}n.setRequestHeader=function(o,l){this.u.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function ar(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ii.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Mc(o){let l="";return R(o,function(h,f){l+=f,l+=":",l+=h,l+=`\r
`}),l}function ro(o,l,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Mc(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):ae(o,l,h))}function ue(o){Ce.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}O(ue,Ce);var lp=/^https?$/i,up=["POST","PUT"];n=ue.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,l,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ys.g(),this.v=this.o?hc(this.o):hc(Ys),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(C){xc(this,C);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var b in f)h.set(b,f[b]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const C of f.keys())h.set(C,f.get(C));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(C=>C.toLowerCase()=="content-type"),b=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(up,l,void 0))||f||b||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,M]of h)this.g.setRequestHeader(C,M);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Bc(this),this.u=!0,this.g.send(o),this.u=!1}catch(C){xc(this,C)}};function xc(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,Fc(o),si(o)}function Fc(o){o.A||(o.A=!0,Le(o,"complete"),Le(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Le(this,"complete"),Le(this,"abort"),si(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),si(this,!0)),ue.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Uc(this):this.bb())},n.bb=function(){Uc(this)};function Uc(o){if(o.h&&typeof a<"u"&&(!o.v[1]||ot(o)!=4||o.Z()!=2)){if(o.u&&ot(o)==4)ac(o.Ea,0,o);else if(Le(o,"readystatechange"),ot(o)==4){o.h=!1;try{const M=o.Z();e:switch(M){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var f;if(f=M===0){var b=String(o.D).match(Pc)[1]||null;!b&&c.self&&c.self.location&&(b=c.self.location.protocol.slice(0,-1)),f=!lp.test(b?b.toLowerCase():"")}h=f}if(h)Le(o,"complete"),Le(o,"success");else{o.m=6;try{var C=2<ot(o)?o.g.statusText:""}catch{C=""}o.l=C+" ["+o.Z()+"]",Fc(o)}}finally{si(o)}}}}function si(o,l){if(o.g){Bc(o);const h=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Le(o,"ready");try{h.onreadystatechange=f}catch{}}}function Bc(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function ot(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<ot(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),jf(l)}};function $c(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function hp(o){const l={};o=(o.g&&2<=ot(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(q(o[f]))continue;var h=w(o[f]);const b=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const C=l[b]||[];l[b]=C,C.push(h)}y(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function cr(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function jc(o){this.Aa=0,this.i=[],this.j=new tr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=cr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=cr("baseRetryDelayMs",5e3,o),this.cb=cr("retryDelaySeedMs",1e4,o),this.Wa=cr("forwardChannelMaxRetries",2,o),this.wa=cr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Tc(o&&o.concurrentRequestLimit),this.Da=new ap,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=jc.prototype,n.la=8,n.G=1,n.connect=function(o,l,h,f){Me(0),this.W=o,this.H=l||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=Jc(this,null,this.W),ai(this)};function io(o){if(qc(o),o.G==3){var l=o.U++,h=st(o.I);if(ae(h,"SID",o.K),ae(h,"RID",l),ae(h,"TYPE","terminate"),lr(o,h),l=new gt(o,o.j,l),l.L=2,l.v=ni(st(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=l.v,h=!0),h||(l.g=Xc(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Zr(l)}Yc(o)}function oi(o){o.g&&(oo(o),o.g.cancel(),o.g=null)}function qc(o){oi(o),o.u&&(c.clearTimeout(o.u),o.u=null),ci(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function ai(o){if(!Ac(o.h)&&!o.s){o.s=!0;var l=o.Ga;se||Qe(),fe||(se(),fe=!0),le.add(l,o),o.B=0}}function dp(o,l){return bc(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=er(T(o.Ga,o,l),Qc(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const b=new gt(this,this.j,o);let C=this.o;if(this.S&&(C?(C=p(C),I(C,this.S)):C=this.S),this.m!==null||this.O||(b.H=C,C=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=Hc(this,b,l),h=st(this.I),ae(h,"RID",o),ae(h,"CVER",22),this.D&&ae(h,"X-HTTP-Session-Id",this.D),lr(this,h),C&&(this.O?l="headers="+encodeURIComponent(String(Mc(C)))+"&"+l:this.m&&ro(h,this.m,C)),no(this.h,b),this.Ua&&ae(h,"TYPE","init"),this.P?(ae(h,"$req",l),ae(h,"SID","null"),b.T=!0,Xs(b,h,null)):Xs(b,h,l),this.G=2}}else this.G==3&&(o?zc(this,o):this.i.length==0||Ac(this.h)||zc(this))};function zc(o,l){var h;l?h=l.l:h=o.U++;const f=st(o.I);ae(f,"SID",o.K),ae(f,"RID",h),ae(f,"AID",o.T),lr(o,f),o.m&&o.o&&ro(f,o.m,o.o),h=new gt(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),l&&(o.i=l.D.concat(o.i)),l=Hc(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),no(o.h,h),Xs(h,f,l)}function lr(o,l){o.H&&R(o.H,function(h,f){ae(l,f,h)}),o.l&&Cc({},function(h,f){ae(l,f,h)})}function Hc(o,l,h){h=Math.min(o.i.length,h);var f=o.l?T(o.l.Na,o.l,o):null;e:{var b=o.i;let C=-1;for(;;){const M=["count="+h];C==-1?0<h?(C=b[0].g,M.push("ofs="+C)):C=0:M.push("ofs="+C);let ie=!0;for(let Ae=0;Ae<h;Ae++){let te=b[Ae].g;const Pe=b[Ae].map;if(te-=C,0>te)C=Math.max(0,b[Ae].g-100),ie=!1;else try{cp(Pe,M,"req"+te+"_")}catch{f&&f(Pe)}}if(ie){f=M.join("&");break e}}}return o=o.i.splice(0,h),l.D=o,f}function Wc(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;se||Qe(),fe||(se(),fe=!0),le.add(l,o),o.v=0}}function so(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=er(T(o.Fa,o),Qc(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Gc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=er(T(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Me(10),oi(this),Gc(this))};function oo(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Gc(o){o.g=new gt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=st(o.qa);ae(l,"RID","rpc"),ae(l,"SID",o.K),ae(l,"AID",o.T),ae(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&ae(l,"TO",o.ja),ae(l,"TYPE","xmlhttp"),lr(o,l),o.m&&o.o&&ro(l,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=ni(st(l)),h.m=null,h.P=!0,Ec(h,o)}n.Za=function(){this.C!=null&&(this.C=null,oi(this),so(this),Me(19))};function ci(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Kc(o,l){var h=null;if(o.g==l){ci(o),oo(o),o.g=null;var f=2}else if(to(o.h,l))h=l.D,Rc(o.h,l),f=1;else return;if(o.G!=0){if(l.o)if(f==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var b=o.B;f=Yr(),Le(f,new gc(f,h)),ai(o)}else Wc(o);else if(b=l.s,b==3||b==0&&0<l.X||!(f==1&&dp(o,l)||f==2&&so(o)))switch(h&&0<h.length&&(l=o.h,l.i=l.i.concat(h)),b){case 1:zt(o,5);break;case 4:zt(o,10);break;case 3:zt(o,6);break;default:zt(o,2)}}}function Qc(o,l){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*l}function zt(o,l){if(o.j.info("Error code "+l),l==2){var h=T(o.fb,o),f=o.Xa;const b=!f;f=new qt(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||ei(f,"https"),ni(f),b?sp(f.toString(),h):op(f.toString(),h)}else Me(2);o.G=0,o.l&&o.l.sa(l),Yc(o),qc(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Me(2)):(this.j.info("Failed to ping google.com"),Me(1))};function Yc(o){if(o.G=0,o.ka=[],o.l){const l=Sc(o.h);(l.length!=0||o.i.length!=0)&&(N(o.ka,l),N(o.ka,o.i),o.h.i.length=0,k(o.i),o.i.length=0),o.l.ra()}}function Jc(o,l,h){var f=h instanceof qt?st(h):new qt(h);if(f.g!="")l&&(f.g=l+"."+f.g),ti(f,f.s);else{var b=c.location;f=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;var C=new qt(null);f&&ei(C,f),l&&(C.g=l),b&&ti(C,b),h&&(C.l=h),f=C}return h=o.D,l=o.ya,h&&l&&ae(f,h,l),ae(f,"VER",o.la),lr(o,f),f}function Xc(o,l,h){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new ue(new ri({eb:h})):new ue(o.pa),l.Ha(o.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Zc(){}n=Zc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function li(){}li.prototype.g=function(o,l){return new $e(o,l)};function $e(o,l){Ce.call(this),this.g=new jc(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!q(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!q(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new dn(this)}O($e,Ce),$e.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},$e.prototype.close=function(){io(this.g)},$e.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Ws(o),o=h);l.i.push(new Qf(l.Ya++,o)),l.G==3&&ai(l)},$e.prototype.N=function(){this.g.l=null,delete this.j,io(this.g),delete this.g,$e.aa.N.call(this)};function el(o){Ks.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}O(el,Ks);function tl(){Qs.call(this),this.status=1}O(tl,Qs);function dn(o){this.g=o}O(dn,Zc),dn.prototype.ua=function(){Le(this.g,"a")},dn.prototype.ta=function(o){Le(this.g,new el(o))},dn.prototype.sa=function(o){Le(this.g,new tl)},dn.prototype.ra=function(){Le(this.g,"b")},li.prototype.createWebChannel=li.prototype.g,$e.prototype.send=$e.prototype.o,$e.prototype.open=$e.prototype.m,$e.prototype.close=$e.prototype.close,xh=function(){return new li},Mh=function(){return Yr()},Lh=$t,No={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Jr.NO_ERROR=0,Jr.TIMEOUT=8,Jr.HTTP_ERROR=6,bi=Jr,_c.COMPLETE="complete",Oh=_c,dc.EventType=Xn,Xn.OPEN="a",Xn.CLOSE="b",Xn.ERROR="c",Xn.MESSAGE="d",Ce.prototype.listen=Ce.prototype.K,dr=dc,ue.prototype.listenOnce=ue.prototype.L,ue.prototype.getLastError=ue.prototype.Ka,ue.prototype.getLastErrorCode=ue.prototype.Ba,ue.prototype.getStatus=ue.prototype.Z,ue.prototype.getResponseJson=ue.prototype.Oa,ue.prototype.getResponseText=ue.prototype.oa,ue.prototype.send=ue.prototype.ea,ue.prototype.setWithCredentials=ue.prototype.Ha,Vh=ue}).apply(typeof di<"u"?di:typeof self<"u"?self:typeof window<"u"?window:{});const Vl="@firebase/firestore",Ol="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}De.UNAUTHENTICATED=new De(null),De.GOOGLE_CREDENTIALS=new De("google-credentials-uid"),De.FIRST_PARTY=new De("first-party-uid"),De.MOCK_USER=new De("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $n="11.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en=new na("@firebase/firestore");function mn(){return en.logLevel}function U(n,...e){if(en.logLevel<=Y.DEBUG){const t=e.map(pa);en.debug(`Firestore (${$n}): ${n}`,...t)}}function ft(n,...e){if(en.logLevel<=Y.ERROR){const t=e.map(pa);en.error(`Firestore (${$n}): ${n}`,...t)}}function Pn(n,...e){if(en.logLevel<=Y.WARN){const t=e.map(pa);en.warn(`Firestore (${$n}): ${n}`,...t)}}function pa(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function H(n="Unexpected state"){const e=`FIRESTORE (${$n}) INTERNAL ASSERTION FAILED: `+n;throw ft(e),new Error(e)}function ne(n,e){n||H()}function G(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class F extends mt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ly{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(De.UNAUTHENTICATED))}shutdown(){}}class uy{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class hy{constructor(e){this.t=e,this.currentUser=De.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ne(this.o===void 0);let r=this.i;const i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let s=new ut;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new ut,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new ut)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ne(typeof r.accessToken=="string"),new Fh(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ne(e===null||typeof e=="string"),new De(e)}}class dy{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=De.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class fy{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new dy(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(De.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ll{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class py{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,He(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){ne(this.o===void 0);const r=s=>{s.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.R;return this.R=s.token,U("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new Ll(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ne(typeof t.token=="string"),this.R=t.token,new Ll(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function my(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function Do(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uh{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=my(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function J(n,e){return n<e?-1:n>e?1:0}function Vo(n,e){const t=Do().encode(n),r=Do().encode(e);for(let i=0;i<Math.min(t.length,r.length);i++){const s=J(t[i],r[i]);if(s!==0)return s}return J(t.length,r.length)}function kn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml=-62135596800,xl=1e6;class Ie{static now(){return Ie.fromMillis(Date.now())}static fromDate(e){return Ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*xl);return new Ie(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new F(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new F(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Ml)throw new F(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/xl}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-Ml;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{static fromTimestamp(e){return new W(e)}static min(){return new W(new Ie(0,0))}static max(){return new W(new Ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl="__name__";class Ye{constructor(e,t,r){t===void 0?t=0:t>e.length&&H(),r===void 0?r=e.length-t:r>e.length-t&&H(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ye.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ye?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=Ye.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return J(e.length,t.length)}static compareSegments(e,t){const r=Ye.isNumericId(e),i=Ye.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?Ye.extractNumericId(e).compare(Ye.extractNumericId(t)):Vo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Pt.fromString(e.substring(4,e.length-2))}}class oe extends Ye{construct(e,t,r){return new oe(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new F(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new oe(t)}static emptyPath(){return new oe([])}}const gy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Re extends Ye{construct(e,t,r){return new Re(e,t,r)}static isValidIdentifier(e){return gy.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Re.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Fl}static keyField(){return new Re([Fl])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new F(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new F(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new F(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new F(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Re(t)}static emptyPath(){return new Re([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.path=e}static fromPath(e){return new j(oe.fromString(e))}static fromName(e){return new j(oe.fromString(e).popFirst(5))}static empty(){return new j(oe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&oe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return oe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new j(new oe(e.slice()))}}/**
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
 */const Rr=-1;function _y(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=W.fromTimestamp(r===1e9?new Ie(t+1,0):new Ie(t,r));return new Dt(i,j.empty(),e)}function yy(n){return new Dt(n.readTime,n.key,Rr)}class Dt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Dt(W.min(),j.empty(),Rr)}static max(){return new Dt(W.max(),j.empty(),Rr)}}function vy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=j.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Iy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jn(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Ey)throw n;U("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&H(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):D.reject(t)}static resolve(e){return new D((t,r)=>{t(e)})}static reject(e){return new D((t,r)=>{r(e)})}static waitFor(e){return new D((t,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},u=>r(u))}),a=!0,s===i&&t()})}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next(i=>i?D.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new D((r,i)=>{const s=e.length,a=new Array(s);let c=0;for(let u=0;u<s;u++){const d=u;t(e[d]).next(m=>{a[d]=m,++c,c===s&&r(a)},m=>i(m))}})}static doWhile(e,t){return new D((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function wy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function qn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ds{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}ds.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma=-1;function fs(n){return n==null}function qi(n){return n===0&&1/n==-1/0}function Ty(n){return typeof n=="number"&&Number.isInteger(n)&&!qi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bh="";function Ay(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Ul(e)),e=by(n.get(t),e);return Ul(e)}function by(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case Bh:t+="";break;default:t+=s}}return t}function Ul(n){return n+Bh+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ut(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function $h(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){this.comparator=e,this.root=t||be.EMPTY}insert(e,t){return new ce(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,be.BLACK,null,null))}remove(e){return new ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,be.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new fi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new fi(this.root,e,this.comparator,!1)}getReverseIterator(){return new fi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new fi(this.root,e,this.comparator,!0)}}class fi{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class be{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??be.RED,this.left=i??be.EMPTY,this.right=s??be.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new be(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return be.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return be.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,be.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,be.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw H();const e=this.left.check();if(e!==this.right.check())throw H();return e+(this.isRed()?0:1)}}be.EMPTY=null,be.RED=!0,be.BLACK=!1;be.EMPTY=new class{constructor(){this.size=0}get key(){throw H()}get value(){throw H()}get color(){throw H()}get left(){throw H()}get right(){throw H()}copy(e,t,r,i,s){return this}insert(e,t,r){return new be(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new $l(this.data.getIterator())}getIteratorFrom(e){return new $l(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof we)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new we(this.comparator);return t.data=e,t}}class $l{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.fields=e,e.sort(Re.comparator)}static empty(){return new je([])}unionWith(e){let t=new we(Re.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return kn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class jh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new jh("Invalid base64 string: "+s):s}}(e);return new Se(t)}static fromUint8Array(e){const t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new Se(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Se.EMPTY_BYTE_STRING=new Se("");const Ry=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Vt(n){if(ne(!!n),typeof n=="string"){let e=0;const t=Ry.exec(n);if(ne(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:pe(n.seconds),nanos:pe(n.nanos)}}function pe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ot(n){return typeof n=="string"?Se.fromBase64String(n):Se.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh="server_timestamp",zh="__type__",Hh="__previous_value__",Wh="__local_write_time__";function ps(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[zh])===null||t===void 0?void 0:t.stringValue)===qh}function ms(n){const e=n.mapValue.fields[Hh];return ps(e)?ms(e):e}function Sr(n){const e=Vt(n.mapValue.fields[Wh].timestampValue);return new Ie(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sy{constructor(e,t,r,i,s,a,c,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d}}const zi="(default)";class Cr{constructor(e,t){this.projectId=e,this.database=t||zi}static empty(){return new Cr("","")}get isDefaultDatabase(){return this.database===zi}isEqual(e){return e instanceof Cr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh="__type__",Cy="__max__",pi={mapValue:{}},Kh="__vector__",Hi="value";function Lt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ps(n)?4:ky(n)?9007199254740991:Py(n)?10:11:H()}function nt(n,e){if(n===e)return!0;const t=Lt(n);if(t!==Lt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Sr(n).isEqual(Sr(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=Vt(i.timestampValue),c=Vt(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Ot(i.bytesValue).isEqual(Ot(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return pe(i.geoPointValue.latitude)===pe(s.geoPointValue.latitude)&&pe(i.geoPointValue.longitude)===pe(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return pe(i.integerValue)===pe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=pe(i.doubleValue),c=pe(s.doubleValue);return a===c?qi(a)===qi(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return kn(n.arrayValue.values||[],e.arrayValue.values||[],nt);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Bl(a)!==Bl(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!nt(a[u],c[u])))return!1;return!0}(n,e);default:return H()}}function Pr(n,e){return(n.values||[]).find(t=>nt(t,e))!==void 0}function Nn(n,e){if(n===e)return 0;const t=Lt(n),r=Lt(e);if(t!==r)return J(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(s,a){const c=pe(s.integerValue||s.doubleValue),u=pe(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return jl(n.timestampValue,e.timestampValue);case 4:return jl(Sr(n),Sr(e));case 5:return Vo(n.stringValue,e.stringValue);case 6:return function(s,a){const c=Ot(s),u=Ot(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){const c=s.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const m=J(c[d],u[d]);if(m!==0)return m}return J(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){const c=J(pe(s.latitude),pe(a.latitude));return c!==0?c:J(pe(s.longitude),pe(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return ql(n.arrayValue,e.arrayValue);case 10:return function(s,a){var c,u,d,m;const v=s.fields||{},T=a.fields||{},S=(c=v[Hi])===null||c===void 0?void 0:c.arrayValue,O=(u=T[Hi])===null||u===void 0?void 0:u.arrayValue,k=J(((d=S?.values)===null||d===void 0?void 0:d.length)||0,((m=O?.values)===null||m===void 0?void 0:m.length)||0);return k!==0?k:ql(S,O)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===pi.mapValue&&a===pi.mapValue)return 0;if(s===pi.mapValue)return 1;if(a===pi.mapValue)return-1;const c=s.fields||{},u=Object.keys(c),d=a.fields||{},m=Object.keys(d);u.sort(),m.sort();for(let v=0;v<u.length&&v<m.length;++v){const T=Vo(u[v],m[v]);if(T!==0)return T;const S=Nn(c[u[v]],d[m[v]]);if(S!==0)return S}return J(u.length,m.length)}(n.mapValue,e.mapValue);default:throw H()}}function jl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=Vt(n),r=Vt(e),i=J(t.seconds,r.seconds);return i!==0?i:J(t.nanos,r.nanos)}function ql(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Nn(t[i],r[i]);if(s)return s}return J(t.length,r.length)}function Dn(n){return Oo(n)}function Oo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Vt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Ot(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return j.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Oo(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${Oo(t.fields[a])}`;return i+"}"}(n.mapValue):H()}function Ri(n){switch(Lt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ms(n);return e?16+Ri(e):16;case 5:return 2*n.stringValue.length;case 6:return Ot(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Ri(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Ut(r.fields,(s,a)=>{i+=s.length+Ri(a)}),i}(n.mapValue);default:throw H()}}function Wi(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Lo(n){return!!n&&"integerValue"in n}function ga(n){return!!n&&"arrayValue"in n}function zl(n){return!!n&&"nullValue"in n}function Hl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Si(n){return!!n&&"mapValue"in n}function Py(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Gh])===null||t===void 0?void 0:t.stringValue)===Kh}function _r(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Ut(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=_r(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=_r(n.arrayValue.values[t]);return e}return Object.assign({},n)}function ky(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Cy}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.value=e}static empty(){return new Ue({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Si(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=_r(t)}setAll(e){let t=Re.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=_r(a):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());Si(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return nt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Si(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Ut(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Ue(_r(this.value))}}function Qh(n){const e=[];return Ut(n.fields,(t,r)=>{const i=new Re([t]);if(Si(r)){const s=Qh(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new je(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ve(e,0,W.min(),W.min(),W.min(),Ue.empty(),0)}static newFoundDocument(e,t,r,i){return new Ve(e,1,t,W.min(),r,i,0)}static newNoDocument(e,t){return new Ve(e,2,t,W.min(),W.min(),Ue.empty(),0)}static newUnknownDocument(e,t){return new Ve(e,3,t,W.min(),W.min(),Ue.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ue.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ue.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ve&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ve(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Vn{constructor(e,t){this.position=e,this.inclusive=t}}function Wl(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],a=n.position[i];if(s.field.isKeyField()?r=j.comparator(j.fromName(a.referenceValue),t.key):r=Nn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Gl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!nt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class kr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ny(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Yh{}class ye extends Yh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Vy(e,t,r):t==="array-contains"?new My(e,r):t==="in"?new xy(e,r):t==="not-in"?new Fy(e,r):t==="array-contains-any"?new Uy(e,r):new ye(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Oy(e,r):new Ly(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Nn(t,this.value)):t!==null&&Lt(this.value)===Lt(t)&&this.matchesComparison(Nn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return H()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ke extends Yh{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new Ke(e,t)}matches(e){return Jh(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function Jh(n){return n.op==="and"}function Xh(n){return Dy(n)&&Jh(n)}function Dy(n){for(const e of n.filters)if(e instanceof Ke)return!1;return!0}function Mo(n){if(n instanceof ye)return n.field.canonicalString()+n.op.toString()+Dn(n.value);if(Xh(n))return n.filters.map(e=>Mo(e)).join(",");{const e=n.filters.map(t=>Mo(t)).join(",");return`${n.op}(${e})`}}function Zh(n,e){return n instanceof ye?function(r,i){return i instanceof ye&&r.op===i.op&&r.field.isEqual(i.field)&&nt(r.value,i.value)}(n,e):n instanceof Ke?function(r,i){return i instanceof Ke&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&Zh(a,i.filters[c]),!0):!1}(n,e):void H()}function ed(n){return n instanceof ye?function(t){return`${t.field.canonicalString()} ${t.op} ${Dn(t.value)}`}(n):n instanceof Ke?function(t){return t.op.toString()+" {"+t.getFilters().map(ed).join(" ,")+"}"}(n):"Filter"}class Vy extends ye{constructor(e,t,r){super(e,t,r),this.key=j.fromName(r.referenceValue)}matches(e){const t=j.comparator(e.key,this.key);return this.matchesComparison(t)}}class Oy extends ye{constructor(e,t){super(e,"in",t),this.keys=td("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Ly extends ye{constructor(e,t){super(e,"not-in",t),this.keys=td("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function td(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>j.fromName(r.referenceValue))}class My extends ye{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ga(t)&&Pr(t.arrayValue,this.value)}}class xy extends ye{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Pr(this.value.arrayValue,t)}}class Fy extends ye{constructor(e,t){super(e,"not-in",t)}matches(e){if(Pr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Pr(this.value.arrayValue,t)}}class Uy extends ye{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ga(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Pr(this.value.arrayValue,r))}}/**
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
 */class By{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.le=null}}function Kl(n,e=null,t=[],r=[],i=null,s=null,a=null){return new By(n,e,t,r,i,s,a)}function _a(n){const e=G(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Mo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),fs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Dn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Dn(r)).join(",")),e.le=t}return e.le}function ya(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Ny(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Zh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Gl(n.startAt,e.startAt)&&Gl(n.endAt,e.endAt)}function xo(n){return j.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=u,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function $y(n,e,t,r,i,s,a,c){return new sn(n,e,t,r,i,s,a,c)}function gs(n){return new sn(n)}function Ql(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function va(n){return n.collectionGroup!==null}function Tn(n){const e=G(n);if(e.he===null){e.he=[];const t=new Set;for(const s of e.explicitOrderBy)e.he.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new we(Re.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.he.push(new kr(s,r))}),t.has(Re.keyField().canonicalString())||e.he.push(new kr(Re.keyField(),r))}return e.he}function Ze(n){const e=G(n);return e.Pe||(e.Pe=jy(e,Tn(n))),e.Pe}function jy(n,e){if(n.limitType==="F")return Kl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new kr(i.field,s)});const t=n.endAt?new Vn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Vn(n.startAt.position,n.startAt.inclusive):null;return Kl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Fo(n,e){const t=n.filters.concat([e]);return new sn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Gi(n,e,t){return new sn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function _s(n,e){return ya(Ze(n),Ze(e))&&n.limitType===e.limitType}function nd(n){return`${_a(Ze(n))}|lt:${n.limitType}`}function gn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>ed(i)).join(", ")}]`),fs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Dn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Dn(i)).join(",")),`Target(${r})`}(Ze(n))}; limitType=${n.limitType})`}function ys(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):j.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Tn(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,u){const d=Wl(a,c,u);return a.inclusive?d<=0:d<0}(r.startAt,Tn(r),i)||r.endAt&&!function(a,c,u){const d=Wl(a,c,u);return a.inclusive?d>=0:d>0}(r.endAt,Tn(r),i))}(n,e)}function qy(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function rd(n){return(e,t)=>{let r=!1;for(const i of Tn(n)){const s=zy(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function zy(n,e,t){const r=n.field.isKeyField()?j.comparator(e.key,t.key):function(s,a,c){const u=a.data.field(s),d=c.data.field(s);return u!==null&&d!==null?Nn(u,d):H()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return H()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Ut(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return $h(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hy=new ce(j.comparator);function pt(){return Hy}const id=new ce(j.comparator);function fr(...n){let e=id;for(const t of n)e=e.insert(t.key,t);return e}function sd(n){let e=id;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Gt(){return yr()}function od(){return yr()}function yr(){return new on(n=>n.toString(),(n,e)=>n.isEqual(e))}const Wy=new ce(j.comparator),Gy=new we(j.comparator);function X(...n){let e=Gy;for(const t of n)e=e.add(t);return e}const Ky=new we(J);function Qy(){return Ky}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ea(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qi(e)?"-0":e}}function ad(n){return{integerValue:""+n}}function cd(n,e){return Ty(e)?ad(e):Ea(n,e)}/**
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
 */class vs{constructor(){this._=void 0}}function Yy(n,e,t){return n instanceof Ki?function(i,s){const a={fields:{[zh]:{stringValue:qh},[Wh]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&ps(s)&&(s=ms(s)),s&&(a.fields[Hh]=s),{mapValue:a}}(t,e):n instanceof Nr?ud(n,e):n instanceof Dr?hd(n,e):function(i,s){const a=ld(i,s),c=Yl(a)+Yl(i.Ie);return Lo(a)&&Lo(i.Ie)?ad(c):Ea(i.serializer,c)}(n,e)}function Jy(n,e,t){return n instanceof Nr?ud(n,e):n instanceof Dr?hd(n,e):t}function ld(n,e){return n instanceof Vr?function(r){return Lo(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Ki extends vs{}class Nr extends vs{constructor(e){super(),this.elements=e}}function ud(n,e){const t=dd(e);for(const r of n.elements)t.some(i=>nt(i,r))||t.push(r);return{arrayValue:{values:t}}}class Dr extends vs{constructor(e){super(),this.elements=e}}function hd(n,e){let t=dd(e);for(const r of n.elements)t=t.filter(i=>!nt(i,r));return{arrayValue:{values:t}}}class Vr extends vs{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Yl(n){return pe(n.integerValue||n.doubleValue)}function dd(n){return ga(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(e,t){this.field=e,this.transform=t}}function Zy(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Nr&&i instanceof Nr||r instanceof Dr&&i instanceof Dr?kn(r.elements,i.elements,nt):r instanceof Vr&&i instanceof Vr?nt(r.Ie,i.Ie):r instanceof Ki&&i instanceof Ki}(n.transform,e.transform)}class ev{constructor(e,t){this.version=e,this.transformResults=t}}class et{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new et}static exists(e){return new et(void 0,e)}static updateTime(e){return new et(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ci(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Es{}function fd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new md(n.key,et.none()):new Ur(n.key,n.data,et.none());{const t=n.data,r=Ue.empty();let i=new we(Re.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Bt(n.key,r,new je(i.toArray()),et.none())}}function tv(n,e,t){n instanceof Ur?function(i,s,a){const c=i.value.clone(),u=Xl(i.fieldTransforms,s,a.transformResults);c.setAll(u),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Bt?function(i,s,a){if(!Ci(i.precondition,s))return void s.convertToUnknownDocument(a.version);const c=Xl(i.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(pd(i)),u.setAll(c),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function vr(n,e,t,r){return n instanceof Ur?function(s,a,c,u){if(!Ci(s.precondition,a))return c;const d=s.value.clone(),m=Zl(s.fieldTransforms,u,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Bt?function(s,a,c,u){if(!Ci(s.precondition,a))return c;const d=Zl(s.fieldTransforms,u,a),m=a.data;return m.setAll(pd(s)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(v=>v.field))}(n,e,t,r):function(s,a,c){return Ci(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function nv(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=ld(r.transform,i||null);s!=null&&(t===null&&(t=Ue.empty()),t.set(r.field,s))}return t||null}function Jl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&kn(r,i,(s,a)=>Zy(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ur extends Es{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Bt extends Es{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function pd(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Xl(n,e,t){const r=new Map;ne(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,Jy(a,c,t[i]))}return r}function Zl(n,e,t){const r=new Map;for(const i of n){const s=i.transform,a=t.data.field(i.field);r.set(i.field,Yy(s,a,e))}return r}class md extends Es{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class rv extends Es{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&tv(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=vr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=vr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=od();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;const u=fd(a,c);u!==null&&r.set(i.key,u),a.isValidDocument()||a.convertToNoDocument(W.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),X())}isEqual(e){return this.batchId===e.batchId&&kn(this.mutations,e.mutations,(t,r)=>Jl(t,r))&&kn(this.baseMutations,e.baseMutations,(t,r)=>Jl(t,r))}}class Ia{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){ne(e.mutations.length===r.length);let i=function(){return Wy}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new Ia(e,t,r,i)}}/**
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
 */class sv{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class ov{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _e,ee;function av(n){switch(n){case P.OK:return H();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return H()}}function gd(n){if(n===void 0)return ft("GRPC error has no .code"),P.UNKNOWN;switch(n){case _e.OK:return P.OK;case _e.CANCELLED:return P.CANCELLED;case _e.UNKNOWN:return P.UNKNOWN;case _e.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case _e.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case _e.INTERNAL:return P.INTERNAL;case _e.UNAVAILABLE:return P.UNAVAILABLE;case _e.UNAUTHENTICATED:return P.UNAUTHENTICATED;case _e.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case _e.NOT_FOUND:return P.NOT_FOUND;case _e.ALREADY_EXISTS:return P.ALREADY_EXISTS;case _e.PERMISSION_DENIED:return P.PERMISSION_DENIED;case _e.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case _e.ABORTED:return P.ABORTED;case _e.OUT_OF_RANGE:return P.OUT_OF_RANGE;case _e.UNIMPLEMENTED:return P.UNIMPLEMENTED;case _e.DATA_LOSS:return P.DATA_LOSS;default:return H()}}(ee=_e||(_e={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const cv=new Pt([4294967295,4294967295],0);function eu(n){const e=Do().encode(n),t=new Dh;return t.update(e),new Uint8Array(t.digest())}function tu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Pt([t,r],0),new Pt([i,s],0)]}class wa{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new pr(`Invalid padding: ${t}`);if(r<0)throw new pr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new pr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new pr(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=Pt.fromNumber(this.Ee)}Ae(e,t,r){let i=e.add(t.multiply(Pt.fromNumber(r)));return i.compare(cv)===1&&(i=new Pt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=eu(e),[r,i]=tu(t);for(let s=0;s<this.hashCount;s++){const a=this.Ae(r,i,s);if(!this.Re(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new wa(s,i,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ee===0)return;const t=eu(e),[r,i]=tu(t);for(let s=0;s<this.hashCount;s++){const a=this.Ae(r,i,s);this.Ve(a)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class pr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Br.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Is(W.min(),i,new ce(J),pt(),X())}}class Br{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Br(r,t,X(),X(),X())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(e,t,r,i){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=i}}class _d{constructor(e,t){this.targetId=e,this.ge=t}}class yd{constructor(e,t,r=Se.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class nu{constructor(){this.pe=0,this.ye=ru(),this.we=Se.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=X(),t=X(),r=X();return this.ye.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:H()}}),new Br(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=ru()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,ne(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class lv{constructor(e){this.ke=e,this.qe=new Map,this.Qe=pt(),this.$e=mi(),this.Ue=mi(),this.Ke=new ce(J)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:H()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,i)=>{this.Je(i)&&t(i)})}Ze(e){const t=e.targetId,r=e.ge.count,i=this.Xe(t);if(i){const s=i.target;if(xo(s))if(r===0){const a=new j(s.path);this.ze(t,a,Ve.newNoDocument(a,W.min()))}else ne(r===1);else{const a=this.et(t);if(a!==r){const c=this.tt(e),u=c?this.nt(c,e,a):1;if(u!==0){this.Ye(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let a,c;try{a=Ot(r).toUint8Array()}catch(u){if(u instanceof jh)return Pn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new wa(a,i,s)}catch(u){return Pn(u instanceof pr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const a=this.ke.it(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,s,null),i++)}),i}ot(e){const t=new Map;this.qe.forEach((s,a)=>{const c=this.Xe(a);if(c){if(s.current&&xo(c.target)){const u=new j(c.target.path);this._t(u).has(a)||this.ut(a,u)||this.ze(a,u,Ve.newNoDocument(u,e))}s.ve&&(t.set(a,s.Fe()),s.Me())}});let r=X();this.Ue.forEach((s,a)=>{let c=!0;a.forEachWhile(u=>{const d=this.Xe(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.Qe.forEach((s,a)=>a.setReadTime(e));const i=new Is(e,t,this.Ke,this.Qe,r);return this.Qe=pt(),this.$e=mi(),this.Ue=mi(),this.Ke=new ce(J),i}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const i=this.He(e);this.ut(e,t)?i.xe(t,1):i.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new nu,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new we(J),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new we(J),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||U("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new nu),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function mi(){return new ce(j.comparator)}function ru(){return new ce(j.comparator)}const uv={asc:"ASCENDING",desc:"DESCENDING"},hv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},dv={and:"AND",or:"OR"};class fv{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Uo(n,e){return n.useProto3Json||fs(e)?e:{value:e}}function Qi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function vd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function pv(n,e){return Qi(n,e.toTimestamp())}function tt(n){return ne(!!n),W.fromTimestamp(function(t){const r=Vt(t);return new Ie(r.seconds,r.nanos)}(n))}function Ta(n,e){return Bo(n,e).canonicalString()}function Bo(n,e){const t=function(i){return new oe(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Ed(n){const e=oe.fromString(n);return ne(bd(e)),e}function $o(n,e){return Ta(n.databaseId,e.path)}function go(n,e){const t=Ed(e);if(t.get(1)!==n.databaseId.projectId)throw new F(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new F(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new j(wd(t))}function Id(n,e){return Ta(n.databaseId,e)}function mv(n){const e=Ed(n);return e.length===4?oe.emptyPath():wd(e)}function jo(n){return new oe(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function wd(n){return ne(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function iu(n,e,t){return{name:$o(n,e),fields:t.value.mapValue.fields}}function gv(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:H()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,m){return d.useProto3Json?(ne(m===void 0||typeof m=="string"),Se.fromBase64String(m||"")):(ne(m===void 0||m instanceof Buffer||m instanceof Uint8Array),Se.fromUint8Array(m||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const m=d.code===void 0?P.UNKNOWN:gd(d.code);return new F(m,d.message||"")}(a);t=new yd(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=go(n,r.document.name),s=tt(r.document.updateTime),a=r.document.createTime?tt(r.document.createTime):W.min(),c=new Ue({mapValue:{fields:r.document.fields}}),u=Ve.newFoundDocument(i,s,a,c),d=r.targetIds||[],m=r.removedTargetIds||[];t=new Pi(d,m,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=go(n,r.document),s=r.readTime?tt(r.readTime):W.min(),a=Ve.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Pi([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=go(n,r.document),s=r.removedTargetIds||[];t=new Pi([],s,i,null)}else{if(!("filter"in e))return H();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new ov(i,s),c=r.targetId;t=new _d(c,a)}}return t}function _v(n,e){let t;if(e instanceof Ur)t={update:iu(n,e.key,e.value)};else if(e instanceof md)t={delete:$o(n,e.key)};else if(e instanceof Bt)t={update:iu(n,e.key,e.data),updateMask:Rv(e.fieldMask)};else{if(!(e instanceof rv))return H();t={verify:$o(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const c=a.transform;if(c instanceof Ki)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Nr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Dr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Vr)return{fieldPath:a.field.canonicalString(),increment:c.Ie};throw H()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:pv(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:H()}(n,e.precondition)),t}function yv(n,e){return n&&n.length>0?(ne(e!==void 0),n.map(t=>function(i,s){let a=i.updateTime?tt(i.updateTime):tt(s);return a.isEqual(W.min())&&(a=tt(s)),new ev(a,i.transformResults||[])}(t,e))):[]}function vv(n,e){return{documents:[Id(n,e.path)]}}function Ev(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Id(n,i);const s=function(d){if(d.length!==0)return Ad(Ke.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const a=function(d){if(d.length!==0)return d.map(m=>function(T){return{field:_n(T.field),direction:Tv(T.dir)}}(m))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Uo(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ht:t,parent:i}}function Iv(n){let e=mv(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){ne(r===1);const m=t.from[0];m.allDescendants?i=m.collectionId:e=e.child(m.collectionId)}let s=[];t.where&&(s=function(v){const T=Td(v);return T instanceof Ke&&Xh(T)?T.getFilters():[T]}(t.where));let a=[];t.orderBy&&(a=function(v){return v.map(T=>function(O){return new kr(yn(O.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(O.direction))}(T))}(t.orderBy));let c=null;t.limit&&(c=function(v){let T;return T=typeof v=="object"?v.value:v,fs(T)?null:T}(t.limit));let u=null;t.startAt&&(u=function(v){const T=!!v.before,S=v.values||[];return new Vn(S,T)}(t.startAt));let d=null;return t.endAt&&(d=function(v){const T=!v.before,S=v.values||[];return new Vn(S,T)}(t.endAt)),$y(e,i,a,s,c,"F",u,d)}function wv(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return H()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Td(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=yn(t.unaryFilter.field);return ye.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=yn(t.unaryFilter.field);return ye.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=yn(t.unaryFilter.field);return ye.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=yn(t.unaryFilter.field);return ye.create(a,"!=",{nullValue:"NULL_VALUE"});default:return H()}}(n):n.fieldFilter!==void 0?function(t){return ye.create(yn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return H()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ke.create(t.compositeFilter.filters.map(r=>Td(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return H()}}(t.compositeFilter.op))}(n):H()}function Tv(n){return uv[n]}function Av(n){return hv[n]}function bv(n){return dv[n]}function _n(n){return{fieldPath:n.canonicalString()}}function yn(n){return Re.fromServerFormat(n.fieldPath)}function Ad(n){return n instanceof ye?function(t){if(t.op==="=="){if(Hl(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NAN"}};if(zl(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Hl(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NOT_NAN"}};if(zl(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_n(t.field),op:Av(t.op),value:t.value}}}(n):n instanceof Ke?function(t){const r=t.getFilters().map(i=>Ad(i));return r.length===1?r[0]:{compositeFilter:{op:bv(t.op),filters:r}}}(n):H()}function Rv(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function bd(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e,t,r,i,s=W.min(),a=W.min(),c=Se.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new At(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new At(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new At(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new At(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sv{constructor(e){this.Tt=e}}function Cv(n){const e=Iv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Gi(e,e.limit,"L"):e}/**
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
 */class Pv{constructor(){this.Tn=new kv}addToCollectionParentIndex(e,t){return this.Tn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(Dt.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(Dt.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class kv{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new we(oe.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new we(oe.comparator)).toArray()}}/**
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
 */const su={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Rd=41943040;class Fe{static withCacheSize(e){return new Fe(e,Fe.DEFAULT_COLLECTION_PERCENTILE,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Fe.DEFAULT_COLLECTION_PERCENTILE=10,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Fe.DEFAULT=new Fe(Rd,Fe.DEFAULT_COLLECTION_PERCENTILE,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Fe.DISABLED=new Fe(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new On(0)}static Kn(){return new On(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou="LruGarbageCollector",Nv=1048576;function au([n,e],[t,r]){const i=J(n,t);return i===0?J(e,r):i}class Dv{constructor(e){this.Hn=e,this.buffer=new we(au),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();au(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Vv{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){U(ou,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){qn(t)?U(ou,"Ignoring IndexedDB error during garbage collection: ",t):await jn(t)}await this.er(3e5)})}}class Ov{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return D.resolve(ds.ae);const r=new Dv(t);return this.tr.forEachTarget(e,i=>r.Zn(i.sequenceNumber)).next(()=>this.tr.rr(e,i=>r.Zn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(U("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(su)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(U("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),su):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,i,s,a,c,u,d;const m=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(v=>(v>this.params.maximumSequenceNumbersToCollect?(U("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${v}`),i=this.params.maximumSequenceNumbersToCollect):i=v,a=Date.now(),this.nthSequenceNumber(e,i))).next(v=>(r=v,c=Date.now(),this.removeTargets(e,r,t))).next(v=>(s=v,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(v=>(d=Date.now(),mn()<=Y.DEBUG&&U("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${v} documents in `+(d-u)+`ms
Total Duration: ${d-m}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:v})))}}function Lv(n,e){return new Ov(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mv{constructor(){this.changes=new on(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ve.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class xv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fv{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&vr(r.mutation,i,je.empty(),Ie.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,X()).next(()=>r))}getLocalViewOfDocuments(e,t,r=X()){const i=Gt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=fr();return s.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Gt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,X()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let s=pt();const a=yr(),c=function(){return yr()}();return t.forEach((u,d)=>{const m=r.get(d.key);i.has(d.key)&&(m===void 0||m.mutation instanceof Bt)?s=s.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),vr(m.mutation,d,m.mutation.getFieldMask(),Ie.now())):a.set(d.key,je.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((d,m)=>a.set(d,m)),t.forEach((d,m)=>{var v;return c.set(d,new xv(m,(v=a.get(d))!==null&&v!==void 0?v:null))}),c))}recalculateAndSaveOverlays(e,t){const r=yr();let i=new ce((a,c)=>a-c),s=X();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let m=r.get(u)||je.empty();m=c.applyToLocalView(d,m),r.set(u,m);const v=(i.get(c.batchId)||X()).add(u);i=i.insert(c.batchId,v)})}).next(()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,m=u.value,v=od();m.forEach(T=>{if(!s.has(T)){const S=fd(t.get(T),r.get(T));S!==null&&v.set(T,S),s=s.add(T)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,v))}return D.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return j.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):va(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):D.resolve(Gt());let c=Rr,u=s;return a.next(d=>D.forEach(d,(m,v)=>(c<v.largestBatchId&&(c=v.largestBatchId),s.get(m)?D.resolve():this.remoteDocumentCache.getEntry(e,m).next(T=>{u=u.insert(m,T)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,u,d,X())).next(m=>({batchId:c,changes:sd(m)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new j(t)).next(r=>{let i=fr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let a=fr();return this.indexManager.getCollectionParents(e,s).next(c=>D.forEach(c,u=>{const d=function(v,T){return new sn(T,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(m=>{m.forEach((v,T)=>{a=a.insert(v,T)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((u,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,Ve.newInvalidDocument(m)))});let c=fr();return a.forEach((u,d)=>{const m=s.get(u);m!==void 0&&vr(m.mutation,d,je.empty(),Ie.now()),ys(t,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uv{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return D.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:tt(i.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(i){return{name:i.name,query:Cv(i.bundledQuery),readTime:tt(i.readTime)}}(t)),D.resolve()}}/**
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
 */class Bv{constructor(){this.overlays=new ce(j.comparator),this.Rr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Gt();return D.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.Et(e,t,s)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Rr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Rr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const i=Gt(),s=t.length+1,a=new j(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return D.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new ce((d,m)=>d-m);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let m=s.get(d.largestBatchId);m===null&&(m=Gt(),s=s.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const c=Gt(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,m)=>c.set(d,m)),!(c.size()>=i)););return D.resolve(c)}Et(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.Rr.get(i.largestBatchId).delete(r.key);this.Rr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new sv(t,r));let s=this.Rr.get(t);s===void 0&&(s=X(),this.Rr.set(t,s)),this.Rr.set(t,s.add(r.key))}}/**
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
 */class $v{constructor(){this.sessionToken=Se.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(){this.Vr=new we(Te.mr),this.gr=new we(Te.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new Te(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new Te(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new j(new oe([])),r=new Te(t,e),i=new Te(t,e+1),s=[];return this.gr.forEachInRange([r,i],a=>{this.wr(a),s.push(a.key)}),s}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new j(new oe([])),r=new Te(t,e),i=new Te(t,e+1);let s=X();return this.gr.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){const t=new Te(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Te{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return j.comparator(e.key,t.key)||J(e.Cr,t.Cr)}static pr(e,t){return J(e.Cr,t.Cr)||j.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new we(Te.mr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new iv(s,t,r,i);this.mutationQueue.push(a);for(const c of i)this.Mr=this.Mr.add(new Te(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(a)}lookupMutationBatch(e,t){return D.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Nr(r),s=i<0?0:i;return D.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?ma:this.Fr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Te(t,0),i=new Te(t,Number.POSITIVE_INFINITY),s=[];return this.Mr.forEachInRange([r,i],a=>{const c=this.Or(a.Cr);s.push(c)}),D.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new we(J);return t.forEach(i=>{const s=new Te(i,0),a=new Te(i,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([s,a],c=>{r=r.add(c.Cr)})}),D.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;j.isDocumentKey(s)||(s=s.child(""));const a=new Te(new j(s),0);let c=new we(J);return this.Mr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(u.Cr)),!0)},a),D.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const i=this.Or(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){ne(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return D.forEach(t.mutations,i=>{const s=new Te(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new Te(t,0),i=this.Mr.firstAfterOrEqual(r);return D.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qv{constructor(e){this.kr=e,this.docs=function(){return new ce(j.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Ve.newInvalidDocument(t))}getEntries(e,t){let r=pt();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ve.newInvalidDocument(i))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=pt();const a=t.path,c=new j(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:m}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||vy(yy(m),r)<=0||(i.has(m.key)||ys(t,m))&&(s=s.insert(m.key,m.mutableCopy()))}return D.resolve(s)}getAllFromCollectionGroup(e,t,r,i){H()}qr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new zv(this)}getSize(e){return D.resolve(this.size)}}class zv extends Mv{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Ir.addEntry(e,i)):this.Ir.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hv{constructor(e){this.persistence=e,this.Qr=new on(t=>_a(t),ya),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.$r=0,this.Ur=new Aa,this.targetCount=0,this.Kr=On.Un()}forEachTarget(e,t){return this.Qr.forEach((r,i)=>t(i)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),D.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new On(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.zn(t),D.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Qr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),D.waitFor(s).next(()=>i)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),D.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new ds(0),this.zr=!1,this.zr=!0,this.jr=new $v,this.referenceDelegate=e(this),this.Hr=new Hv(this),this.indexManager=new Pv,this.remoteDocumentCache=function(i){return new qv(i)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new Sv(t),this.Yr=new Uv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Bv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new jv(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){U("MemoryPersistence","Starting transaction:",e);const i=new Wv(this.Gr.next());return this.referenceDelegate.Zr(),r(i).next(s=>this.referenceDelegate.Xr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}ei(e,t){return D.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class Wv extends Iy{constructor(e){super(),this.currentSequenceNumber=e}}class ba{constructor(e){this.persistence=e,this.ti=new Aa,this.ni=null}static ri(e){return new ba(e)}get ii(){if(this.ni)return this.ni;throw H()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),D.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(i=>this.ii.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.ii.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.ii,r=>{const i=j.fromPath(r);return this.si(e,i).next(s=>{s||t.removeEntry(i,W.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return D.or([()=>D.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class Yi{constructor(e,t){this.persistence=e,this.oi=new on(r=>Ay(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Lv(this,t)}static ri(e,t){return new Yi(e,t)}Zr(){}Xr(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return D.forEach(this.oi,(r,i)=>this.ar(e,r,i).next(s=>s?D.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.qr(e,a=>this.ar(e,a,t).next(c=>{c||(r++,s.removeEntry(a,W.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ri(e.data.value)),t}ar(e,t,r){return D.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.oi.get(t);return D.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=i}static Yi(e,t){let r=X(),i=X();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Ra(e,t.fromCache,r,i)}}/**
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
 */class Gv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Kv{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return Dp()?8:wy(Oe())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.rs(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ss(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new Gv;return this._s(e,t,a).next(c=>{if(s.result=c,this.Xi)return this.us(e,t,a,c.size)})}).next(()=>s.result)}us(e,t,r,i){return r.documentReadCount<this.es?(mn()<=Y.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",gn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),D.resolve()):(mn()<=Y.DEBUG&&U("QueryEngine","Query:",gn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ts*i?(mn()<=Y.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",gn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ze(t))):D.resolve())}rs(e,t){if(Ql(t))return D.resolve(null);let r=Ze(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Gi(t,null,"F"),r=Ze(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=X(...s);return this.ns.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.cs(t,c);return this.ls(t,d,a,u.readTime)?this.rs(e,Gi(t,null,"F")):this.hs(e,d,t,u)}))})))}ss(e,t,r,i){return Ql(t)||i.isEqual(W.min())?D.resolve(null):this.ns.getDocuments(e,r).next(s=>{const a=this.cs(t,s);return this.ls(t,a,r,i)?D.resolve(null):(mn()<=Y.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),gn(t)),this.hs(e,a,t,_y(i,Rr)).next(c=>c))})}cs(e,t){let r=new we(rd(e));return t.forEach((i,s)=>{ys(e,s)&&(r=r.add(s))}),r}ls(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}_s(e,t,r){return mn()<=Y.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",gn(t)),this.ns.getDocumentsMatchingQuery(e,t,Dt.min(),r)}hs(e,t,r,i){return this.ns.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa="LocalStore",Qv=3e8;class Yv{constructor(e,t,r,i){this.persistence=e,this.Ps=t,this.serializer=i,this.Ts=new ce(J),this.Is=new on(s=>_a(s),ya),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Fv(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function Jv(n,e,t,r){return new Yv(n,e,t,r)}async function Cd(n,e){const t=G(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],c=[];let u=X();for(const d of i){a.push(d.batchId);for(const m of d.mutations)u=u.add(m.key)}for(const d of s){c.push(d.batchId);for(const m of d.mutations)u=u.add(m.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Rs:d,removedBatchIds:a,addedBatchIds:c}))})})}function Xv(n,e){const t=G(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,u,d,m){const v=d.batch,T=v.keys();let S=D.resolve();return T.forEach(O=>{S=S.next(()=>m.getEntry(u,O)).next(k=>{const N=d.docVersions.get(O);ne(N!==null),k.version.compareTo(N)<0&&(v.applyToRemoteDocument(k,d),k.isValidDocument()&&(k.setReadTime(d.commitVersion),m.addEntry(k)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(u,v))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=X();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Pd(n){const e=G(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function Zv(n,e){const t=G(n),r=e.snapshotVersion;let i=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=t.ds.newChangeBuffer({trackRemovals:!0});i=t.Ts;const c=[];e.targetChanges.forEach((m,v)=>{const T=i.get(v);if(!T)return;c.push(t.Hr.removeMatchingKeys(s,m.removedDocuments,v).next(()=>t.Hr.addMatchingKeys(s,m.addedDocuments,v)));let S=T.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(v)!==null?S=S.withResumeToken(Se.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()):m.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(m.resumeToken,r)),i=i.insert(v,S),function(k,N,B){return k.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=Qv?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0}(T,S,m)&&c.push(t.Hr.updateTargetData(s,S))});let u=pt(),d=X();if(e.documentUpdates.forEach(m=>{e.resolvedLimboDocuments.has(m)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,m))}),c.push(eE(s,a,e.documentUpdates).next(m=>{u=m.Vs,d=m.fs})),!r.isEqual(W.min())){const m=t.Hr.getLastRemoteSnapshotVersion(s).next(v=>t.Hr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(m)}return D.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,d)).next(()=>u)}).then(s=>(t.Ts=i,s))}function eE(n,e,t){let r=X(),i=X();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=pt();return t.forEach((c,u)=>{const d=s.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(W.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):U(Sa,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Vs:a,fs:i}})}function tE(n,e){const t=G(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=ma),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function nE(n,e){const t=G(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Hr.getTargetData(r,e).next(s=>s?(i=s,D.resolve(i)):t.Hr.allocateTargetId(r).next(a=>(i=new At(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Ts.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function qo(n,e,t){const r=G(n),i=r.Ts.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!qn(a))throw a;U(Sa,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ts=r.Ts.remove(e),r.Is.delete(i.target)}function cu(n,e,t){const r=G(n);let i=W.min(),s=X();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,m){const v=G(u),T=v.Is.get(m);return T!==void 0?D.resolve(v.Ts.get(T)):v.Hr.getTargetData(d,m)}(r,a,Ze(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(a,c.targetId).next(u=>{s=u})}).next(()=>r.Ps.getDocumentsMatchingQuery(a,e,t?i:W.min(),t?s:X())).next(c=>(rE(r,qy(e),c),{documents:c,gs:s})))}function rE(n,e,t){let r=n.Es.get(e)||W.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Es.set(e,r)}class lu{constructor(){this.activeTargetIds=Qy()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class iE{constructor(){this.ho=new lu,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new lu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class sE{To(e){}shutdown(){}}/**
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
 */const uu="ConnectivityMonitor";class hu{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){U(uu,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){U(uu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let gi=null;function zo(){return gi===null?gi=function(){return 268435456+Math.round(2147483648*Math.random())}():gi++,"0x"+gi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _o="RestConnection",oE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class aE{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${i}`,this.wo=this.databaseId.database===zi?`project_id=${r}`:`project_id=${r}&database_id=${i}`}So(e,t,r,i,s){const a=zo(),c=this.bo(e,t.toUriEncodedString());U(_o,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(u,i,s),this.vo(e,c,u,r).then(d=>(U(_o,`Received RPC '${e}' ${a}: `,d),d),d=>{throw Pn(_o,`RPC '${e}' ${a} failed with error: `,d,"url: ",c,"request:",r),d})}Co(e,t,r,i,s,a){return this.So(e,t,r,i,s)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+$n}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}bo(e,t){const r=oE[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cE{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne="WebChannelConnection";class lE extends aE{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,i){const s=zo();return new Promise((a,c)=>{const u=new Vh;u.setWithCredentials(!0),u.listenOnce(Oh.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case bi.NO_ERROR:const m=u.getResponseJson();U(Ne,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(m)),a(m);break;case bi.TIMEOUT:U(Ne,`RPC '${e}' ${s} timed out`),c(new F(P.DEADLINE_EXCEEDED,"Request time out"));break;case bi.HTTP_ERROR:const v=u.getStatus();if(U(Ne,`RPC '${e}' ${s} failed with status:`,v,"response text:",u.getResponseText()),v>0){let T=u.getResponseJson();Array.isArray(T)&&(T=T[0]);const S=T?.error;if(S&&S.status&&S.message){const O=function(N){const B=N.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(B)>=0?B:P.UNKNOWN}(S.status);c(new F(O,S.message))}else c(new F(P.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new F(P.UNAVAILABLE,"Connection failed."));break;default:H()}}finally{U(Ne,`RPC '${e}' ${s} completed.`)}});const d=JSON.stringify(i);U(Ne,`RPC '${e}' ${s} sending request:`,i),u.send(t,"POST",d,r,15)})}Wo(e,t,r){const i=zo(),s=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=xh(),c=Mh(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Do(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const m=s.join("");U(Ne,`Creating RPC '${e}' stream ${i}: ${m}`,u);const v=a.createWebChannel(m,u);let T=!1,S=!1;const O=new cE({Fo:N=>{S?U(Ne,`Not sending because RPC '${e}' stream ${i} is closed:`,N):(T||(U(Ne,`Opening RPC '${e}' stream ${i} transport.`),v.open(),T=!0),U(Ne,`RPC '${e}' stream ${i} sending:`,N),v.send(N))},Mo:()=>v.close()}),k=(N,B,q)=>{N.listen(B,Q=>{try{q(Q)}catch(Z){setTimeout(()=>{throw Z},0)}})};return k(v,dr.EventType.OPEN,()=>{S||(U(Ne,`RPC '${e}' stream ${i} transport opened.`),O.Qo())}),k(v,dr.EventType.CLOSE,()=>{S||(S=!0,U(Ne,`RPC '${e}' stream ${i} transport closed`),O.Uo())}),k(v,dr.EventType.ERROR,N=>{S||(S=!0,Pn(Ne,`RPC '${e}' stream ${i} transport errored:`,N),O.Uo(new F(P.UNAVAILABLE,"The operation could not be completed")))}),k(v,dr.EventType.MESSAGE,N=>{var B;if(!S){const q=N.data[0];ne(!!q);const Q=q,Z=Q?.error||((B=Q[0])===null||B===void 0?void 0:B.error);if(Z){U(Ne,`RPC '${e}' stream ${i} received error:`,Z);const L=Z.status;let R=function(g){const I=_e[g];if(I!==void 0)return gd(I)}(L),y=Z.message;R===void 0&&(R=P.INTERNAL,y="Unknown error status: "+L+" with message "+Z.message),S=!0,O.Uo(new F(R,y)),v.close()}else U(Ne,`RPC '${e}' stream ${i} received:`,q),O.Ko(q)}}),k(c,Lh.STAT_EVENT,N=>{N.stat===No.PROXY?U(Ne,`RPC '${e}' stream ${i} detected buffering proxy`):N.stat===No.NOPROXY&&U(Ne,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{O.$o()},0),O}}function yo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ws(n){return new fv(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=i,this.jo=s,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),i=Math.max(0,t-r);i>0&&U("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,i,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du="PersistentStream";class Nd{constructor(e,t,r,i,s,a,c,u){this.Ti=e,this.n_=r,this.r_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new kd(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(ft(t.toString()),ft("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.i_===t&&this.V_(r,i)},r=>{e(()=>{const i=new F(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(i)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(i=>{r(()=>this.m_(i))}),this.stream.onMessage(i=>{r(()=>++this.__==1?this.g_(i):this.onNext(i))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return U(du,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(U(du,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class uE extends Nd{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=gv(this.serializer,e),r=function(s){if(!("targetChange"in s))return W.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?W.min():a.readTime?tt(a.readTime):W.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=jo(this.serializer),t.addTarget=function(s,a){let c;const u=a.target;if(c=xo(u)?{documents:vv(s,u)}:{query:Ev(s,u).ht},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=vd(s,a.resumeToken);const d=Uo(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(W.min())>0){c.readTime=Qi(s,a.snapshotVersion.toTimestamp());const d=Uo(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=wv(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=jo(this.serializer),t.removeTarget=e,this.I_(t)}}class hE extends Nd{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return ne(!!e.streamToken),this.lastStreamToken=e.streamToken,ne(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){ne(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=yv(e.writeResults,e.commitTime),r=tt(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=jo(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>_v(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{}class fE extends dE{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.F_=!1}M_(){if(this.F_)throw new F(P.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.So(e,Bo(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new F(P.UNKNOWN,s.toString())})}Co(e,t,r,i,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Co(e,Bo(t,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new F(P.UNKNOWN,a.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class pE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(ft(t),this.N_=!1):U("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn="RemoteStore";class mE{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=s,this.z_.To(a=>{r.enqueueAndForget(async()=>{an(this)&&(U(tn,"Restarting streams for network reachability change."),await async function(u){const d=G(u);d.W_.add(4),await $r(d),d.j_.set("Unknown"),d.W_.delete(4),await Ts(d)}(this))})}),this.j_=new pE(r,i)}}async function Ts(n){if(an(n))for(const e of n.G_)await e(!0)}async function $r(n){for(const e of n.G_)await e(!1)}function Dd(n,e){const t=G(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),Na(t)?ka(t):zn(t).c_()&&Pa(t,e))}function Ca(n,e){const t=G(n),r=zn(t);t.K_.delete(e),r.c_()&&Vd(t,e),t.K_.size===0&&(r.c_()?r.P_():an(t)&&t.j_.set("Unknown"))}function Pa(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(W.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}zn(n).y_(e)}function Vd(n,e){n.H_.Ne(e),zn(n).w_(e)}function ka(n){n.H_=new lv({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),zn(n).start(),n.j_.B_()}function Na(n){return an(n)&&!zn(n).u_()&&n.K_.size>0}function an(n){return G(n).W_.size===0}function Od(n){n.H_=void 0}async function gE(n){n.j_.set("Online")}async function _E(n){n.K_.forEach((e,t)=>{Pa(n,e)})}async function yE(n,e){Od(n),Na(n)?(n.j_.q_(e),ka(n)):n.j_.set("Unknown")}async function vE(n,e,t){if(n.j_.set("Online"),e instanceof yd&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const c of s.targetIds)i.K_.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.K_.delete(c),i.H_.removeTarget(c))}(n,e)}catch(r){U(tn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ji(n,r)}else if(e instanceof Pi?n.H_.We(e):e instanceof _d?n.H_.Ze(e):n.H_.je(e),!t.isEqual(W.min()))try{const r=await Pd(n.localStore);t.compareTo(r)>=0&&await function(s,a){const c=s.H_.ot(a);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const m=s.K_.get(d);m&&s.K_.set(d,m.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,d)=>{const m=s.K_.get(u);if(!m)return;s.K_.set(u,m.withResumeToken(Se.EMPTY_BYTE_STRING,m.snapshotVersion)),Vd(s,u);const v=new At(m.target,u,d,m.sequenceNumber);Pa(s,v)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){U(tn,"Failed to raise snapshot:",r),await Ji(n,r)}}async function Ji(n,e,t){if(!qn(e))throw e;n.W_.add(1),await $r(n),n.j_.set("Offline"),t||(t=()=>Pd(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{U(tn,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await Ts(n)})}function Ld(n,e){return e().catch(t=>Ji(n,t,e))}async function As(n){const e=G(n),t=Mt(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:ma;for(;EE(e);)try{const i=await tE(e.localStore,r);if(i===null){e.U_.length===0&&t.P_();break}r=i.batchId,IE(e,i)}catch(i){await Ji(e,i)}Md(e)&&xd(e)}function EE(n){return an(n)&&n.U_.length<10}function IE(n,e){n.U_.push(e);const t=Mt(n);t.c_()&&t.S_&&t.b_(e.mutations)}function Md(n){return an(n)&&!Mt(n).u_()&&n.U_.length>0}function xd(n){Mt(n).start()}async function wE(n){Mt(n).C_()}async function TE(n){const e=Mt(n);for(const t of n.U_)e.b_(t.mutations)}async function AE(n,e,t){const r=n.U_.shift(),i=Ia.from(r,e,t);await Ld(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await As(n)}async function bE(n,e){e&&Mt(n).S_&&await async function(r,i){if(function(a){return av(a)&&a!==P.ABORTED}(i.code)){const s=r.U_.shift();Mt(r).h_(),await Ld(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await As(r)}}(n,e),Md(n)&&xd(n)}async function fu(n,e){const t=G(n);t.asyncQueue.verifyOperationInProgress(),U(tn,"RemoteStore received new credentials");const r=an(t);t.W_.add(3),await $r(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await Ts(t)}async function RE(n,e){const t=G(n);e?(t.W_.delete(2),await Ts(t)):e||(t.W_.add(2),await $r(t),t.j_.set("Unknown"))}function zn(n){return n.J_||(n.J_=function(t,r,i){const s=G(t);return s.M_(),new uE(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{xo:gE.bind(null,n),No:_E.bind(null,n),Lo:yE.bind(null,n),p_:vE.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),Na(n)?ka(n):n.j_.set("Unknown")):(await n.J_.stop(),Od(n))})),n.J_}function Mt(n){return n.Y_||(n.Y_=function(t,r,i){const s=G(t);return s.M_(),new hE(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:wE.bind(null,n),Lo:bE.bind(null,n),D_:TE.bind(null,n),v_:AE.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await As(n)):(await n.Y_.stop(),n.U_.length>0&&(U(tn,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new ut,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const a=Date.now()+r,c=new Da(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Va(n,e){if(ft("AsyncQueue",`${e}: ${n}`),qn(n))return new F(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{static emptySet(e){return new An(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||j.comparator(t.key,r.key):(t,r)=>j.comparator(t.key,r.key),this.keyedMap=fr(),this.sortedSet=new ce(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof An)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new An;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu{constructor(){this.Z_=new ce(j.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):H():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Ln{constructor(e,t,r,i,s,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new Ln(e,t,An.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&_s(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class CE{constructor(){this.queries=mu(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const i=G(t),s=i.queries;i.queries=mu(),s.forEach((a,c)=>{for(const u of c.ta)u.onError(r)})})(this,new F(P.ABORTED,"Firestore shutting down"))}}function mu(){return new on(n=>nd(n),_s)}async function Oa(n,e){const t=G(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.na()&&e.ra()&&(r=2):(s=new SE,r=e.ra()?0:1);try{switch(r){case 0:s.ea=await t.onListen(i,!0);break;case 1:s.ea=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const c=Va(a,`Initialization of query '${gn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.ta.push(e),e.sa(t.onlineState),s.ea&&e.oa(s.ea)&&Ma(t)}async function La(n,e){const t=G(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const a=s.ta.indexOf(e);a>=0&&(s.ta.splice(a,1),s.ta.length===0?i=e.ra()?0:1:!s.na()&&e.ra()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function PE(n,e){const t=G(n);let r=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const c of a.ta)c.oa(i)&&(r=!0);a.ea=i}}r&&Ma(t)}function kE(n,e,t){const r=G(n),i=r.queries.get(e);if(i)for(const s of i.ta)s.onError(t);r.queries.delete(e)}function Ma(n){n.ia.forEach(e=>{e.next()})}var Ho,gu;(gu=Ho||(Ho={}))._a="default",gu.Cache="cache";class xa{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Ln(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=Ln.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==Ho.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(e){this.key=e}}class Ud{constructor(e){this.key=e}}class NE{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=X(),this.mutatedKeys=X(),this.ya=rd(e),this.wa=new An(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new pu,i=t?t.wa:this.wa;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((m,v)=>{const T=i.get(m),S=ys(this.query,v)?v:null,O=!!T&&this.mutatedKeys.has(T.key),k=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let N=!1;T&&S?T.data.isEqual(S.data)?O!==k&&(r.track({type:3,doc:S}),N=!0):this.va(T,S)||(r.track({type:2,doc:S}),N=!0,(u&&this.ya(S,u)>0||d&&this.ya(S,d)<0)&&(c=!0)):!T&&S?(r.track({type:0,doc:S}),N=!0):T&&!S&&(r.track({type:1,doc:T}),N=!0,(u||d)&&(c=!0)),N&&(S?(a=a.add(S),s=k?s.add(m):s.delete(m)):(a=a.delete(m),s=s.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),s=s.delete(m.key),r.track({type:1,doc:m})}return{wa:a,Da:r,ls:c,mutatedKeys:s}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const a=e.Da.X_();a.sort((m,v)=>function(S,O){const k=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return H()}};return k(S)-k(O)}(m.type,v.type)||this.ya(m.doc,v.doc)),this.Ca(r),i=i!=null&&i;const c=t&&!i?this.Fa():[],u=this.pa.size===0&&this.current&&!i?1:0,d=u!==this.ga;return this.ga=u,a.length!==0||d?{snapshot:new Ln(this.query,e.wa,s,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new pu,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=X(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new Ud(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new Fd(r))}),t}Oa(e){this.fa=e.gs,this.pa=X();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return Ln.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const Fa="SyncEngine";class DE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class VE{constructor(e){this.key=e,this.Ba=!1}}class OE{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.La={},this.ka=new on(c=>nd(c),_s),this.qa=new Map,this.Qa=new Set,this.$a=new ce(j.comparator),this.Ua=new Map,this.Ka=new Aa,this.Wa={},this.Ga=new Map,this.za=On.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function LE(n,e,t=!0){const r=Hd(n);let i;const s=r.ka.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Na()):i=await Bd(r,e,t,!0),i}async function ME(n,e){const t=Hd(n);await Bd(t,e,!0,!1)}async function Bd(n,e,t,r){const i=await nE(n.localStore,Ze(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await xE(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&Dd(n.remoteStore,i),c}async function xE(n,e,t,r,i){n.Ha=(v,T,S)=>async function(k,N,B,q){let Q=N.view.ba(B);Q.ls&&(Q=await cu(k.localStore,N.query,!1).then(({documents:y})=>N.view.ba(y,Q)));const Z=q&&q.targetChanges.get(N.targetId),L=q&&q.targetMismatches.get(N.targetId)!=null,R=N.view.applyChanges(Q,k.isPrimaryClient,Z,L);return yu(k,N.targetId,R.Ma),R.snapshot}(n,v,T,S);const s=await cu(n.localStore,e,!0),a=new NE(e,s.gs),c=a.ba(s.documents),u=Br.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,u);yu(n,t,d.Ma);const m=new DE(e,t,a);return n.ka.set(e,m),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),d.snapshot}async function FE(n,e,t){const r=G(n),i=r.ka.get(e),s=r.qa.get(i.targetId);if(s.length>1)return r.qa.set(i.targetId,s.filter(a=>!_s(a,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await qo(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Ca(r.remoteStore,i.targetId),Wo(r,i.targetId)}).catch(jn)):(Wo(r,i.targetId),await qo(r.localStore,i.targetId,!0))}async function UE(n,e){const t=G(n),r=t.ka.get(e),i=t.qa.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ca(t.remoteStore,r.targetId))}async function BE(n,e,t){const r=GE(n);try{const i=await function(a,c){const u=G(a),d=Ie.now(),m=c.reduce((S,O)=>S.add(O.key),X());let v,T;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let O=pt(),k=X();return u.ds.getEntries(S,m).next(N=>{O=N,O.forEach((B,q)=>{q.isValidDocument()||(k=k.add(B))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,O)).next(N=>{v=N;const B=[];for(const q of c){const Q=nv(q,v.get(q.key).overlayedDocument);Q!=null&&B.push(new Bt(q.key,Q,Qh(Q.value.mapValue),et.exists(!0)))}return u.mutationQueue.addMutationBatch(S,d,B,c)}).next(N=>{T=N;const B=N.applyToLocalDocumentSet(v,k);return u.documentOverlayCache.saveOverlays(S,N.batchId,B)})}).then(()=>({batchId:T.batchId,changes:sd(v)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,u){let d=a.Wa[a.currentUser.toKey()];d||(d=new ce(J)),d=d.insert(c,u),a.Wa[a.currentUser.toKey()]=d}(r,i.batchId,t),await jr(r,i.changes),await As(r.remoteStore)}catch(i){const s=Va(i,"Failed to persist write");t.reject(s)}}async function $d(n,e){const t=G(n);try{const r=await Zv(t.localStore,e);e.targetChanges.forEach((i,s)=>{const a=t.Ua.get(s);a&&(ne(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.Ba=!0:i.modifiedDocuments.size>0?ne(a.Ba):i.removedDocuments.size>0&&(ne(a.Ba),a.Ba=!1))}),await jr(t,r,e)}catch(r){await jn(r)}}function _u(n,e,t){const r=G(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.ka.forEach((s,a)=>{const c=a.view.sa(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){const u=G(a);u.onlineState=c;let d=!1;u.queries.forEach((m,v)=>{for(const T of v.ta)T.sa(c)&&(d=!0)}),d&&Ma(u)}(r.eventManager,e),i.length&&r.La.p_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function $E(n,e,t){const r=G(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Ua.get(e),s=i&&i.key;if(s){let a=new ce(j.comparator);a=a.insert(s,Ve.newNoDocument(s,W.min()));const c=X().add(s),u=new Is(W.min(),new Map,new ce(J),a,c);await $d(r,u),r.$a=r.$a.remove(s),r.Ua.delete(e),Ua(r)}else await qo(r.localStore,e,!1).then(()=>Wo(r,e,t)).catch(jn)}async function jE(n,e){const t=G(n),r=e.batch.batchId;try{const i=await Xv(t.localStore,e);qd(t,r,null),jd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await jr(t,i)}catch(i){await jn(i)}}async function qE(n,e,t){const r=G(n);try{const i=await function(a,c){const u=G(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return u.mutationQueue.lookupMutationBatch(d,c).next(v=>(ne(v!==null),m=v.keys(),u.mutationQueue.removeMutationBatch(d,v))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,m,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>u.localDocuments.getDocuments(d,m))})}(r.localStore,e);qd(r,e,t),jd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await jr(r,i)}catch(i){await jn(i)}}function jd(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function qd(n,e,t){const r=G(n);let i=r.Wa[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Wa[r.currentUser.toKey()]=i}}function Wo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||zd(n,r)})}function zd(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(Ca(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),Ua(n))}function yu(n,e,t){for(const r of t)r instanceof Fd?(n.Ka.addReference(r.key,e),zE(n,r)):r instanceof Ud?(U(Fa,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||zd(n,r.key)):H()}function zE(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(U(Fa,"New document in limbo: "+t),n.Qa.add(r),Ua(n))}function Ua(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new j(oe.fromString(e)),r=n.za.next();n.Ua.set(r,new VE(t)),n.$a=n.$a.insert(t,r),Dd(n.remoteStore,new At(Ze(gs(t.path)),r,"TargetPurposeLimboResolution",ds.ae))}}async function jr(n,e,t){const r=G(n),i=[],s=[],a=[];r.ka.isEmpty()||(r.ka.forEach((c,u)=>{a.push(r.Ha(u,e,t).then(d=>{var m;if((d||t)&&r.isPrimaryClient){const v=d?!d.fromCache:(m=t?.targetChanges.get(u.targetId))===null||m===void 0?void 0:m.current;r.sharedClientState.updateQueryState(u.targetId,v?"current":"not-current")}if(d){i.push(d);const v=Ra.Yi(u.targetId,d);s.push(v)}}))}),await Promise.all(a),r.La.p_(i),await async function(u,d){const m=G(u);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",v=>D.forEach(d,T=>D.forEach(T.Hi,S=>m.persistence.referenceDelegate.addReference(v,T.targetId,S)).next(()=>D.forEach(T.Ji,S=>m.persistence.referenceDelegate.removeReference(v,T.targetId,S)))))}catch(v){if(!qn(v))throw v;U(Sa,"Failed to update sequence numbers: "+v)}for(const v of d){const T=v.targetId;if(!v.fromCache){const S=m.Ts.get(T),O=S.snapshotVersion,k=S.withLastLimboFreeSnapshotVersion(O);m.Ts=m.Ts.insert(T,k)}}}(r.localStore,s))}async function HE(n,e){const t=G(n);if(!t.currentUser.isEqual(e)){U(Fa,"User change. New user:",e.toKey());const r=await Cd(t.localStore,e);t.currentUser=e,function(s,a){s.Ga.forEach(c=>{c.forEach(u=>{u.reject(new F(P.CANCELLED,a))})}),s.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await jr(t,r.Rs)}}function WE(n,e){const t=G(n),r=t.Ua.get(e);if(r&&r.Ba)return X().add(r.key);{let i=X();const s=t.qa.get(e);if(!s)return i;for(const a of s){const c=t.ka.get(a);i=i.unionWith(c.view.Sa)}return i}}function Hd(n){const e=G(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=$d.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=WE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=$E.bind(null,e),e.La.p_=PE.bind(null,e.eventManager),e.La.Ja=kE.bind(null,e.eventManager),e}function GE(n){const e=G(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=jE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=qE.bind(null,e),e}class Xi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ws(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return Jv(this.persistence,new Kv,e.initialUser,this.serializer)}Xa(e){return new Sd(ba.ri,this.serializer)}Za(e){return new iE}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Xi.provider={build:()=>new Xi};class KE extends Xi{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){ne(this.persistence.referenceDelegate instanceof Yi);const r=this.persistence.referenceDelegate.garbageCollector;return new Vv(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?Fe.withCacheSize(this.cacheSizeBytes):Fe.DEFAULT;return new Sd(r=>Yi.ri(r,t),this.serializer)}}class Go{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>_u(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=HE.bind(null,this.syncEngine),await RE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new CE}()}createDatastore(e){const t=ws(e.databaseInfo.databaseId),r=function(s){return new lE(s)}(e.databaseInfo);return function(s,a,c,u){return new fE(s,a,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,c){return new mE(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>_u(this.syncEngine,t,0),function(){return hu.D()?new hu:new sE}())}createSyncEngine(e,t){return function(i,s,a,c,u,d,m){const v=new OE(i,s,a,c,u,d);return m&&(v.ja=!0),v}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=G(i);U(tn,"RemoteStore shutting down."),s.W_.add(5),await $r(s),s.z_.shutdown(),s.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Go.provider={build:()=>new Go};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ba{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):ft("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="FirestoreClient";class QE{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=De.UNAUTHENTICATED,this.clientId=Uh.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{U(xt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(U(xt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ut;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Va(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function vo(n,e){n.asyncQueue.verifyOperationInProgress(),U(xt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Cd(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function vu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await YE(n);U(xt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>fu(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>fu(e.remoteStore,i)),n._onlineComponents=e}async function YE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){U(xt,"Using user provided OfflineComponentProvider");try{await vo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Pn("Error using user provided cache. Falling back to memory cache: "+t),await vo(n,new Xi)}}else U(xt,"Using default OfflineComponentProvider"),await vo(n,new KE(void 0));return n._offlineComponents}async function Wd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(U(xt,"Using user provided OnlineComponentProvider"),await vu(n,n._uninitializedComponentsProvider._online)):(U(xt,"Using default OnlineComponentProvider"),await vu(n,new Go))),n._onlineComponents}function JE(n){return Wd(n).then(e=>e.syncEngine)}async function Zi(n){const e=await Wd(n),t=e.eventManager;return t.onListen=LE.bind(null,e.syncEngine),t.onUnlisten=FE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=ME.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=UE.bind(null,e.syncEngine),t}function XE(n,e,t={}){const r=new ut;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,u,d){const m=new Ba({next:T=>{m.su(),a.enqueueAndForget(()=>La(s,v));const S=T.docs.has(c);!S&&T.fromCache?d.reject(new F(P.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&T.fromCache&&u&&u.source==="server"?d.reject(new F(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),v=new xa(gs(c.path),m,{includeMetadataChanges:!0,Ta:!0});return Oa(s,v)}(await Zi(n),n.asyncQueue,e,t,r)),r.promise}function ZE(n,e,t={}){const r=new ut;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,u,d){const m=new Ba({next:T=>{m.su(),a.enqueueAndForget(()=>La(s,v)),T.fromCache&&u.source==="server"?d.reject(new F(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(T)},error:T=>d.reject(T)}),v=new xa(c,m,{includeMetadataChanges:!0,Ta:!0});return Oa(s,v)}(await Zi(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function Gd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eu=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kd(n,e,t){if(!t)throw new F(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function eI(n,e,t,r){if(e===!0&&r===!0)throw new F(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Iu(n){if(!j.isDocumentKey(n))throw new F(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function wu(n){if(j.isDocumentKey(n))throw new F(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function bs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":H()}function We(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new F(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=bs(n);throw new F(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function tI(n,e){if(e<=0)throw new F(P.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qd="firestore.googleapis.com",Tu=!0;class Au{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new F(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Qd,this.ssl=Tu}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Tu;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Rd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Nv)throw new F(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}eI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Gd((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Rs{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Au({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Au(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ly;switch(r.type){case"firstParty":return new fy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new F(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Eu.get(t);r&&(U("ComponentProvider","Removing Datastore"),Eu.delete(t),r.terminate())}(this),Promise.resolve()}}function nI(n,e,t,r={}){var i;const s=(n=We(n,Rs))._getSettings(),a=`${e}:${t}`;if(s.host!==Qd&&s.host!==a&&Pn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),r.mockUserToken){let c,u;if(typeof r.mockUserToken=="string")c=r.mockUserToken,u=De.MOCK_USER;else{c=bp(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new F(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new De(d)}n._authCredentials=new uy(new Fh(c,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new rt(this.firestore,e,this._query)}}class xe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new kt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new xe(this.firestore,e,this._key)}}class kt extends rt{constructor(e,t,r){super(e,t,gs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new xe(this.firestore,null,new j(e))}withConverter(e){return new kt(this.firestore,e,this._path)}}function qe(n,e,...t){if(n=me(n),Kd("collection","path",e),n instanceof Rs){const r=oe.fromString(e,...t);return wu(r),new kt(n,null,r)}{if(!(n instanceof xe||n instanceof kt))throw new F(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(oe.fromString(e,...t));return wu(r),new kt(n.firestore,null,r)}}function it(n,e,...t){if(n=me(n),arguments.length===1&&(e=Uh.newId()),Kd("doc","path",e),n instanceof Rs){const r=oe.fromString(e,...t);return Iu(r),new xe(n,null,new j(r))}{if(!(n instanceof xe||n instanceof kt))throw new F(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(oe.fromString(e,...t));return Iu(r),new xe(n.firestore,n instanceof kt?n.converter:null,new j(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bu="AsyncQueue";class Ru{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new kd(this,"async_queue_retry"),this.Su=()=>{const r=yo();r&&U(bu,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=yo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=yo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new ut;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!qn(e))throw e;U(bu,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const i=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw ft("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const i=Da.createAndSchedule(this,e,t,r,s=>this.Fu(s));return this.fu.push(i),i}Du(){this.gu&&H()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function Su(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class nn extends Rs{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Ru,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ru(e),this._firestoreClient=void 0,await e}}}function rI(n,e){const t=typeof n=="object"?n:Ku(),r=typeof n=="string"?n:zi,i=ia(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Tp("firestore");s&&nI(i,...s)}return i}function Ss(n){if(n._terminated)throw new F(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||iI(n),n._firestoreClient}function iI(n){var e,t,r;const i=n._freezeSettings(),s=function(c,u,d,m){return new Sy(c,u,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,Gd(m.experimentalLongPollingOptions),m.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new QE(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){const u=c?._online.build();return{_offline:c?._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Mn(Se.fromBase64String(e))}catch(t){throw new F(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Mn(Se.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new F(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Re(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new F(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new F(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}}/**
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
 */class ja{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sI=/^__.*__$/;class oI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Bt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ur(e,this.data,t,this.fieldTransforms)}}class Yd{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Bt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Jd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw H()}}class qa{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Bu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new qa(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ku({path:r,Qu:!1});return i.$u(e),i}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ku({path:r,Qu:!1});return i.Bu(),i}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return es(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(Jd(this.Lu)&&sI.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class aI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ws(e)}ju(e,t,r,i=!1){return new qa({Lu:e,methodName:t,zu:r,path:Re.emptyPath(),Qu:!1,Gu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ks(n){const e=n._freezeSettings(),t=ws(n._databaseId);return new aI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function cI(n,e,t,r,i,s={}){const a=n.ju(s.merge||s.mergeFields?2:0,e,t,i);Ha("Data must be an object, but it was:",a,r);const c=Zd(r,a);let u,d;if(s.merge)u=new je(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){const m=[];for(const v of s.mergeFields){const T=Ko(e,v,t);if(!a.contains(T))throw new F(P.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);tf(m,T)||m.push(T)}u=new je(m),d=a.fieldTransforms.filter(v=>u.covers(v.field))}else u=null,d=a.fieldTransforms;return new oI(new Ue(c),u,d)}class Ns extends Ps{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ns}}class za extends Ps{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new Vr(e.serializer,cd(e.serializer,this.Ju));return new Xy(e.path,t)}isEqual(e){return e instanceof za&&this.Ju===e.Ju}}function lI(n,e,t,r){const i=n.ju(1,e,t);Ha("Data must be an object, but it was:",i,r);const s=[],a=Ue.empty();Ut(r,(u,d)=>{const m=Wa(e,u,t);d=me(d);const v=i.Uu(m);if(d instanceof Ns)s.push(m);else{const T=qr(d,v);T!=null&&(s.push(m),a.set(m,T))}});const c=new je(s);return new Yd(a,c,i.fieldTransforms)}function uI(n,e,t,r,i,s){const a=n.ju(1,e,t),c=[Ko(e,r,t)],u=[i];if(s.length%2!=0)throw new F(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<s.length;T+=2)c.push(Ko(e,s[T])),u.push(s[T+1]);const d=[],m=Ue.empty();for(let T=c.length-1;T>=0;--T)if(!tf(d,c[T])){const S=c[T];let O=u[T];O=me(O);const k=a.Uu(S);if(O instanceof Ns)d.push(S);else{const N=qr(O,k);N!=null&&(d.push(S),m.set(S,N))}}const v=new je(d);return new Yd(m,v,a.fieldTransforms)}function Xd(n,e,t,r=!1){return qr(t,n.ju(r?4:3,e))}function qr(n,e){if(ef(n=me(n)))return Ha("Unsupported field value:",e,n),Zd(n,e);if(n instanceof Ps)return function(r,i){if(!Jd(i.Lu))throw i.Wu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Wu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,i){const s=[];let a=0;for(const c of r){let u=qr(c,i.Ku(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=me(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return cd(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ie.fromDate(r);return{timestampValue:Qi(i.serializer,s)}}if(r instanceof Ie){const s=new Ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Qi(i.serializer,s)}}if(r instanceof $a)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Mn)return{bytesValue:vd(i.serializer,r._byteString)};if(r instanceof xe){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.Wu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Ta(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof ja)return function(a,c){return{mapValue:{fields:{[Gh]:{stringValue:Kh},[Hi]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Ea(c.serializer,d)})}}}}}}(r,i);throw i.Wu(`Unsupported field value: ${bs(r)}`)}(n,e)}function Zd(n,e){const t={};return $h(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ut(n,(r,i)=>{const s=qr(i,e.qu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function ef(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ie||n instanceof $a||n instanceof Mn||n instanceof xe||n instanceof Ps||n instanceof ja)}function Ha(n,e,t){if(!ef(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=bs(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function Ko(n,e,t){if((e=me(e))instanceof Cs)return e._internalPath;if(typeof e=="string")return Wa(n,e);throw es("Field path arguments must be of type string or ",n,!1,void 0,t)}const hI=new RegExp("[~\\*/\\[\\]]");function Wa(n,e,t){if(e.search(hI)>=0)throw es(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Cs(...e.split("."))._internalPath}catch{throw es(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function es(n,e,t,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new F(P.INVALID_ARGUMENT,c+n+u)}function tf(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new xe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new dI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ds("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class dI extends Ga{data(){return super.data()}}function Ds(n,e){return typeof e=="string"?Wa(n,e):e instanceof Cs?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new F(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ka{}class Vs extends Ka{}function Hn(n,e,...t){let r=[];e instanceof Ka&&r.push(e),r=r.concat(t),function(s){const a=s.filter(u=>u instanceof Qa).length,c=s.filter(u=>u instanceof Os).length;if(a>1||a>0&&c>0)throw new F(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Os extends Vs{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Os(e,t,r)}_apply(e){const t=this._parse(e);return rf(e._query,t),new rt(e.firestore,e.converter,Fo(e._query,t))}_parse(e){const t=ks(e.firestore);return function(s,a,c,u,d,m,v){let T;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new F(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){Pu(v,m);const O=[];for(const k of v)O.push(Cu(u,s,k));T={arrayValue:{values:O}}}else T=Cu(u,s,v)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||Pu(v,m),T=Xd(c,a,v,m==="in"||m==="not-in");return ye.create(d,m,T)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ts(n,e,t){const r=e,i=Ds("where",n);return Os._create(i,r,t)}class Qa extends Ka{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Qa(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ke.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i;const c=s.getFlattenedFilters();for(const u of c)rf(a,u),a=Fo(a,u)}(e._query,t),new rt(e.firestore,e.converter,Fo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ya extends Vs{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ya(e,t)}_apply(e){const t=function(i,s,a){if(i.startAt!==null)throw new F(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new F(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new kr(s,a)}(e._query,this._field,this._direction);return new rt(e.firestore,e.converter,function(i,s){const a=i.explicitOrderBy.concat([s]);return new sn(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function Wn(n,e="asc"){const t=e,r=Ds("orderBy",n);return Ya._create(r,t)}class Ja extends Vs{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Ja(e,t,r)}_apply(e){return new rt(e.firestore,e.converter,Gi(e._query,this._limit,this._limitType))}}function zr(n){return tI("limit",n),Ja._create("limit",n,"F")}class Xa extends Vs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Xa(e,t,r)}_apply(e){const t=pI(e,this.type,this._docOrFields,this._inclusive);return new rt(e.firestore,e.converter,function(i,s){return new sn(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function fI(...n){return Xa._create("startAfter",n,!1)}function pI(n,e,t,r){if(t[0]=me(t[0]),t[0]instanceof Ga)return function(s,a,c,u,d){if(!u)throw new F(P.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const m=[];for(const v of Tn(s))if(v.field.isKeyField())m.push(Wi(a,u.key));else{const T=u.data.field(v.field);if(ps(T))throw new F(P.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+v.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(T===null){const S=v.field.canonicalString();throw new F(P.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${S}' (used as the orderBy) does not exist.`)}m.push(T)}return new Vn(m,d)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=ks(n.firestore);return function(a,c,u,d,m,v){const T=a.explicitOrderBy;if(m.length>T.length)throw new F(P.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const S=[];for(let O=0;O<m.length;O++){const k=m[O];if(T[O].field.isKeyField()){if(typeof k!="string")throw new F(P.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof k}`);if(!va(a)&&k.indexOf("/")!==-1)throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${k}' contains a slash.`);const N=a.path.child(oe.fromString(k));if(!j.isDocumentKey(N))throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${N}' is not because it contains an odd number of segments.`);const B=new j(N);S.push(Wi(c,B))}else{const N=Xd(u,d,k);S.push(N)}}return new Vn(S,v)}(n._query,n.firestore._databaseId,i,e,t,r)}}function Cu(n,e,t){if(typeof(t=me(t))=="string"){if(t==="")throw new F(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!va(e)&&t.indexOf("/")!==-1)throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(oe.fromString(t));if(!j.isDocumentKey(r))throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Wi(n,new j(r))}if(t instanceof xe)return Wi(n,t._key);throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${bs(t)}.`)}function Pu(n,e){if(!Array.isArray(n)||n.length===0)throw new F(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function rf(n,e){const t=function(i,s){for(const a of i)for(const c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new F(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new F(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class mI{convertValue(e,t="none"){switch(Lt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ot(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw H()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Ut(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[Hi].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>pe(a.doubleValue));return new ja(s)}convertGeoPoint(e){return new $a(pe(e.latitude),pe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ms(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Sr(e));default:return null}}convertTimestamp(e){const t=Vt(e);return new Ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=oe.fromString(e);ne(bd(r));const i=new Cr(r.get(1),r.get(3)),s=new j(r.popFirst(5));return i.isEqual(t)||ft(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gI(n,e,t){let r;return r=n?n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class sf extends Ga{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ki(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ds("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class ki extends sf{data(e={}){return super.data(e)}}class of{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new mr(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new ki(this._firestore,this._userDataWriter,r.key,r,new mr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new F(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{const u=new ki(i._firestore,i._userDataWriter,c.doc.key,c.doc,new mr(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const u=new ki(i._firestore,i._userDataWriter,c.doc.key,c.doc,new mr(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,m=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),m=a.indexOf(c.doc.key)),{type:_I(c.type),doc:u,oldIndex:d,newIndex:m}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function _I(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return H()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(n){n=We(n,xe);const e=We(n.firestore,nn);return XE(Ss(e),n._key).then(t=>uf(e,n,t))}class Za extends mI{constructor(e){super(),this.firestore=e}convertBytes(e){return new Mn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new xe(this.firestore,null,t)}}function cf(n){n=We(n,rt);const e=We(n.firestore,nn),t=Ss(e),r=new Za(e);return nf(n._query),ZE(t,n._query).then(i=>new of(e,r,n,i))}function cn(n,e,t,...r){n=We(n,xe);const i=We(n.firestore,nn),s=ks(i);let a;return a=typeof(e=me(e))=="string"||e instanceof Cs?uI(s,"updateDoc",n._key,e,t,r):lI(s,"updateDoc",n._key,e),lf(i,[a.toMutation(n._key,et.exists(!0))])}function Gn(n,e){const t=We(n.firestore,nn),r=it(n),i=gI(n.converter,e);return lf(t,[cI(ks(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,et.exists(!1))]).then(()=>r)}function Hr(n,...e){var t,r,i;n=me(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Su(e[a])||(s=e[a],a++);const c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Su(e[a])){const v=e[a];e[a]=(t=v.next)===null||t===void 0?void 0:t.bind(v),e[a+1]=(r=v.error)===null||r===void 0?void 0:r.bind(v),e[a+2]=(i=v.complete)===null||i===void 0?void 0:i.bind(v)}let u,d,m;if(n instanceof xe)d=We(n.firestore,nn),m=gs(n._key.path),u={next:v=>{e[a]&&e[a](uf(d,n,v))},error:e[a+1],complete:e[a+2]};else{const v=We(n,rt);d=We(v.firestore,nn),m=v._query;const T=new Za(d);u={next:S=>{e[a]&&e[a](new of(d,T,v,S))},error:e[a+1],complete:e[a+2]},nf(n._query)}return function(T,S,O,k){const N=new Ba(k),B=new xa(S,N,O);return T.asyncQueue.enqueueAndForget(async()=>Oa(await Zi(T),B)),()=>{N.su(),T.asyncQueue.enqueueAndForget(async()=>La(await Zi(T),B))}}(Ss(d),m,c,u)}function lf(n,e){return function(r,i){const s=new ut;return r.asyncQueue.enqueueAndForget(async()=>BE(await JE(r),i,s)),s.promise}(Ss(n),e)}function uf(n,e,t){const r=t.docs.get(e._key),i=new Za(n);return new sf(n,i,e._key,r,new mr(t.hasPendingWrites,t.fromCache),e.converter)}function ln(n){return new za("increment",n)}(function(e,t=!0){(function(i){$n=i})(Fn),Sn(new Xt("firestore",(r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),c=new nn(new hy(r.getProvider("auth-internal")),new py(a,r.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new F(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Cr(d.options.projectId,m)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),St(Vl,Ol,e),St(Vl,Ol,"esm2017")})();var yI="firebase",vI="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */St(yI,vI,"app");const EI={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},II="altorra-crm",hf=Gu(EI,II),ns=ay(hf),de=rI(hf);function Er(n){const e=$.get().permissions||[];return e.includes("*")||e.includes(n)}function wI(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function TI(n){try{const e=await af(it(de,"usuarios",n.uid)),t=e.exists()?e.data():null;$.set({user:n,profile:t,permissions:wI(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),$.set({user:n,profile:null,permissions:[],ready:!0})}}function AI(){Gg(ns,Th).catch(()=>{}),Yg(ns,n=>{n?TI(n):$.set({user:null,profile:null,permissions:[],ready:!0})})}const bI={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function RI(n,e){$.set({authError:null});try{await Wg(ns,String(n).trim(),e)}catch(t){const r=bI[t&&t.code]||"No se pudo iniciar sesión.";throw $.set({authError:r}),t}}async function SI(){if($.get().mock){$.set({user:null,profile:null,permissions:[]});return}await Jg(ns)}function Eo(){const{profile:n,user:e}=$.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function CI(){const{profile:n}=$.get();return n&&(n.cargo||n.roleName)||"Asesor"}const PI=["bandeja","pipeline","agenda"];function df(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return PI.includes(e)?e:"bandeja"}function kI(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function NI(n){const e=()=>n(df());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function _(n,e={},t=[]){const r=document.createElement(n);for(const[i,s]of Object.entries(e))s==null||s===!1||(i==="class"?r.className=s:i==="html"?r.innerHTML=s:i==="text"?r.textContent=s:i==="dataset"?Object.assign(r.dataset,s):i==="style"&&typeof s=="object"?Object.assign(r.style,s):i.startsWith("on")&&typeof s=="function"?r.addEventListener(i.slice(2).toLowerCase(),s):r.setAttribute(i,s===!0?"":String(s)));for(const i of[].concat(t))i==null||i===!1||i===""||r.append(i.nodeType?i:document.createTextNode(String(i)));return r}function Ee(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let bn=null;function ff(n){bn&&!bn.contains(n.target)&&rs()}function pf(n){n.key==="Escape"&&rs()}function rs(){bn&&(bn.remove(),bn=null,document.removeEventListener("mousedown",ff,!0),window.removeEventListener("keydown",pf,!0))}function Jt(n,e,t,r={}){rs();const i=_("div",{class:"popover",role:"menu"});r.title&&i.append(_("div",{class:"popover__title",text:r.title})),e.forEach(a=>{if(a.divider){i.append(_("div",{class:"popover__divider"}));return}const c=_("button",{class:"popover__item"+(a.active?" is-active":""),type:"button",role:"menuitem"},[a.icon?_("span",{class:"popover__icon",text:a.icon}):null,_("span",{class:"u-grow u-truncate",text:a.label}),a.hint?_("span",{class:"popover__hint u-caption",text:a.hint}):null]);c.addEventListener("click",u=>{u.stopPropagation(),rs(),t(a)}),i.append(c)}),document.body.append(i),DI(i,n),bn=i,setTimeout(()=>{document.addEventListener("mousedown",ff,!0),window.addEventListener("keydown",pf,!0)},0);const s=i.querySelector(".popover__item");s&&s.focus()}function DI(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,i=n.offsetHeight;let s=t.bottom+6,a=t.right-r;a<8&&(a=8),a+r>window.innerWidth-8&&(a=window.innerWidth-r-8),s+i>window.innerHeight-8&&(s=t.top-i-6),n.style.top=`${Math.max(8,s)}px`,n.style.left=`${Math.max(8,a)}px`}function Ls(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function VI(n){return String(n||"").replace(/\D/g,"")}function mf(n,e){const t=VI(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function gf(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function xn(n){const e=gf(n);return e===1/0?1/0:e/864e5}function Ir(n){const e=gf(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const i=Math.floor(r/24);return i===1?"ayer":i<7?`hace ${i} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function OI(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function ku(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),i=t%60;return i?`${r} h ${i} min`:`${r} h`}function _i(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function Nu(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const LI="0.3.0",MI=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!1},{id:"reportes",label:"Reportes",icon:"📊",ready:!1}],Io={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda"};function xI(n){const e={},t=_("div",{class:"sidebar__brand"},[_("span",{class:"sidebar__logo",text:"ALTORRA"}),_("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=_("nav",{class:"sidebar__nav","aria-label":"Secciones"});MI.forEach(k=>{const N=_("button",{class:"navitem",type:"button",disabled:!k.ready},[_("span",{class:"navitem__icon","aria-hidden":"true",text:k.icon}),_("span",{class:"navitem__label",text:k.label}),k.ready?null:_("span",{class:"navitem__soon",text:"Pronto"})]);k.ready&&N.addEventListener("click",()=>kI(k.id)),e[k.id]=N,r.append(N)});const i=_("aside",{class:"sidebar"},[t,r,_("div",{class:"sidebar__foot u-caption u-faint"},[`v${LI} · Fase 3`])]),s=_("h1",{class:"topbar__h",text:Io.bandeja}),a=_("span",{class:"topbar__crumb u-caption u-faint",text:$.get().mock?"modo demo":"tiempo real"}),c=_("div",{class:"topbar__title"},[s,a]),u=_("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[_("span",{"aria-hidden":"true",text:$.get().theme==="dark"?"☀️":"🌙"})]);u.addEventListener("click",()=>{const k=mp();u.firstChild.textContent=k==="dark"?"☀️":"🌙"});const d=_("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[_("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Ls(Eo())}),_("span",{class:"usermenu__meta"},[_("span",{class:"usermenu__name u-truncate",text:Eo()}),_("span",{class:"usermenu__role u-caption u-faint u-truncate",text:CI()})])]);d.addEventListener("click",()=>{Jt(d,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],k=>{k.value==="logout"&&SI()},{title:Eo()})});const m=_("header",{class:"topbar"},[c,_("div",{class:"topbar__actions u-row"},[u,d])]),v=_("main",{class:"outlet",id:"outlet"}),T=_("div",{id:"detail-root"}),S=_("div",{class:"app-shell"},[i,_("div",{class:"app-main"},[m,v]),T]);Ee(n),n.removeAttribute("aria-busy"),n.append(S);function O(k){Object.entries(e).forEach(([N,B])=>{const q=N===k;B.classList.toggle("is-active",q),q?B.setAttribute("aria-current","page"):B.removeAttribute("aria-current")}),s.textContent=Io[k]||Io.bandeja}return{outlet:v,detailRoot:T,setActive:O}}function FI(n){const e=_("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=_("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=_("div",{class:"login__error",role:"alert",hidden:!0}),i=_("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),s=_("form",{class:"login__form"},[_("label",{class:"field"},[_("span",{class:"field__label",text:"Correo"}),e]),_("label",{class:"field"},[_("span",{class:"field__label",text:"Contraseña"}),t]),r,i]);s.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,i.disabled=!0,i.textContent="Entrando…";try{await RI(e.value,t.value)}catch{r.textContent=$.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,i.disabled=!1,i.textContent="Entrar"}});const a=_("div",{class:"login surface"},[_("div",{class:"login__brand"},[_("span",{class:"login__logo",text:"ALTORRA"}),_("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),_("h1",{class:"login__title",text:"Bienvenido"}),_("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),s,_("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);Ee(n),n.removeAttribute("aria-busy"),n.append(_("div",{class:"login-wrap"},[a])),setTimeout(()=>e.focus(),50)}const UI=()=>document.getElementById("toast-root"),Du={ok:"✓",error:"⚠",info:"ℹ"};function re(n,e="info",t=3200){const r=UI();if(!r)return;const i=document.createElement("div");i.className=`toast toast--${e}`,i.setAttribute("role",e==="error"?"alert":"status");const s=document.createElement("span");s.setAttribute("aria-hidden","true"),s.textContent=Du[e]||Du.info;const a=document.createElement("span");a.className="u-grow",a.textContent=n,i.append(s,a),r.appendChild(i);const c=()=>{i.classList.add("is-leaving"),i.addEventListener("animationend",()=>i.remove(),{once:!0})},u=setTimeout(c,t);i.addEventListener("click",()=>{clearTimeout(u),c()})}const BI=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],$I=["cita","test_drive","test-drive","visita","agendar","peritaje"],jI=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],qI=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],zI={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function Ms(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return qI.some(i=>e.includes(i)||t.includes(i))?r="pqr":t.includes("cita")||$I.some(i=>e.includes(i))?r="cita":jI.some(i=>e.includes(i))&&(r="solicitud"),{type:r,...zI[r]}}function ec(n){const e=String(n.sourceDetail||"").toLowerCase();return BI.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const HI={whatsapp:{label:"WhatsApp",icon:"🟢",varName:"--ch-whatsapp"},bot:{label:"ALTOR Bot",icon:"🤖",varName:"--ch-bot"},cuenta:{label:"Cuenta",icon:"👤",varName:"--ch-cuenta"},newsletter:{label:"Newsletter",icon:"✉️",varName:"--ch-newsletter"},cita:{label:"Cita web",icon:"📅",varName:"--ch-cita"},web:{label:"Web",icon:"🌐",varName:"--ch-web"}};function _f(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wa")?t="whatsapp":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...HI[t]}}const yi={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function WI(n){const e=is(n.status),{type:t}=Ms(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(yi[t]||yi.lead));const i=r-Date.now(),s=yi[t]||yi.lead;let a="ok";return e?a="ok":i<=0?a="late":i<s*.25&&(a="warn"),{state:a,dueAt:r,remainingMs:i,closed:e}}const Qo=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"calificado",label:"Calificado",badge:"ok"},{id:"no_calificado",label:"No calificado",badge:""},{id:"convertido",label:"Convertido",badge:"ok"},{id:"perdido",label:"Perdido",badge:"danger"}],GI=Qo.reduce((n,e)=>(n[e.id]=e,n),{});function Ni(n){return GI[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function is(n){return n==="convertido"||n==="perdido"||n==="no_calificado"}function yf(n){return!n.status||n.status==="nuevo"}const Yo={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},Kt=n=>Math.max(0,Math.min(1,n));function KI(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return ec(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),Kt(t)}function QI(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const i=(r.match(/\d[\d.,]{5,}/g)||[]).map(s=>parseInt(s.replace(/\D/g,""),10)).filter(s=>s>0);i.length&&(e=Math.max(e,Math.max(...i)/5e7))}return Kt(e)}function YI(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(xn(r)>30||e.add(String(r).slice(0,10)))}return Kt(e.size/8)}function vf(n,e=[],t=null){const r=Array.isArray(e)?e:[],i={intent:KI(n),interactions:Kt(r.length/6),recency:n.lastActivityAt?Kt(1-xn(n.lastActivityAt)/30):0,frequency:YI(r),economic:QI(r),age:n.createdAt?Kt(xn(n.createdAt)/60):0,engagement:t&&Number(t.score)?Kt(t.score/100):0};let s=0;for(const c of Object.keys(Yo))s+=i[c]*Yo[c];const a=Math.round(s*100);return{score:a,rating:JI(a),factors:i}}function JI(n){return n>=70?"hot":n>=40?"warm":"cold"}const Jo={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},Vu={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},XI=Yo;function Ef(n,e={}){const t=Number(e.score)||0,{type:r}=Ms(n),i=xn(n.createdAt),s=xn(n.lastActivityAt),a=yf(n),c=is(n.status),u=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&a,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&a&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:ec(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:a&&i<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&s>=2&&s<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:s>=30&&s!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],m=u.filter(v=>v.when).sort((v,T)=>T.priority-v.priority)[0]||u[u.length-1];return{id:m.id,label:m.label,reason:m.reason,icon:m.icon,priority:m.priority}}function If(n,e=[]){const{score:t,rating:r,factors:i}=vf(n,e,null);return{...n,_score:t,_rating:r,_factors:i,_type:Ms(n),_channel:_f(n),_sla:WI(n),_nba:Ef(n,{score:t})}}function wo(n){return n.map(e=>If(e))}const Xo=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function wf(n,e,t){switch(e){case"calientes":return yf(n)&&!is(n.status)&&(n._rating==="hot"||ec(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!is(n.status);case"todo":default:return!0}}function ZI(n,e){const t={};for(const r of Xo)t[r.id]=0;for(const r of n)for(const i of Xo)wf(r,i.id,e)&&t[i.id]++;return t}const vi={late:0,warn:1,ok:2};function ew(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return vi[t]!==vi[r]?vi[t]-vi[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function tw(n,{type:e,channel:t,status:r}){return n.filter(i=>!(e&&i._type.type!==e||t&&i._channel.key!==t||r&&(i.status||"nuevo")!==r))}function nw(n,e){const t=Nu(e).trim();return t?n.filter(r=>Nu([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function rw(n,{queue:e,uid:t,filters:r,search:i}){let s=n.filter(a=>wf(a,e,t));return s=tw(s,r),s=nw(s,i),s.sort(ew),s}const tc=()=>new Date().toISOString(),Tf=n=>({id:n.id,...n.data()});function iw({pageSize:n=40,onData:e,onError:t}){let r=null;const i=Hn(qe(de,"leads"),Wn("createdAt","desc"),zr(n));return{unsubscribe:Hr(i,a=>{const c=a.docs.map(Tf);r=a.docs[a.docs.length-1]||null,e(c,{hasMore:a.size>=n})},a=>{t&&t(a)}),getLastDoc:()=>r}}async function sw({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=Hn(qe(de,"leads"),Wn("createdAt","desc"),fI(e),zr(n)),r=await cf(t);return{rows:r.docs.map(Tf),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function ow(){const e=(await cf(qe(de,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return $.set({team:e}),e}async function aw(n,e){await cn(it(de,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:tc(),updatedBy:ss(),_version:ln(1)})}async function cw(n,e,t={}){const r=tc();await cn(it(de,"leads",n),{status:e,lastActivityAt:r,updatedAt:r,updatedBy:ss(),_version:ln(1)}),await Gn(qe(de,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:ss(),createdAt:r,_version:1})}async function lw(n,{type:e="nota",subject:t="",body:r="",direction:i="outbound",name:s=""}){await Gn(qe(de,"activities"),{type:e,subject:t,body:r,status:"closed",direction:i,relatedTo:{type:"lead",id:n,name:s},ownerId:ss(),createdAt:tc(),_version:1})}function ss(){const n=$.get().user;return n?n.uid:null}const uw="ventas",xs=[{id:"nuevo",label:"Nuevo",prob:.1},{id:"contactado",label:"Contactado",prob:.2},{id:"cita_agendada",label:"Cita agendada",prob:.35},{id:"visito",label:"Visitó",prob:.5},{id:"test_drive",label:"Test drive",prob:.65},{id:"negociacion",label:"Negociación",prob:.8},{id:"financiacion",label:"Financiación",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],hw={id:"perdido",label:"Perdido",prob:0,lost:!0},Di=xs.filter(n=>!n.won),Af=[...xs,hw].reduce((n,e)=>(n[e.id]=e,n),{});function bf(n){return Af[n]||xs[0]}function os(n){const e=Af[n];return e?e.prob:0}function dw(n){return Math.round((Number(n.amount)||0)*os(n.stageId))}function fw(n){return n.reduce((e,t)=>e+(t.status==="open"?dw(t):0),0)}function pw(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function mw(n,e=14){return n.status==="open"&&xn(n.lastActivityAt)>e}function gw(n){const e={};for(const t of Di)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}function nc(n){const e=n.vehicleOfInterestId||"",t=xs[0];return{name:(n.fullName||"Oportunidad")+(e?" · "+e:""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:e||null,vehicleName:e||"",pipelineId:uw,stageId:t.id,stageName:t.label,status:"open",amount:0,currency:"COP",probability:t.prob,weightedAmount:0,expectedCloseDate:null,ownerId:n.ownerId||null,ownerName:n.ownerName||null,source:n.source||"web",nextStep:""}}const Kn=()=>new Date().toISOString(),_w=n=>({id:n.id,...n.data()}),Nt=()=>$.get().user?$.get().user.uid:null;function Fs(n,e,t){return Gn(qe(de,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:Nt(),createdAt:Kn(),_version:1})}function yw({pageSize:n=100,onData:e,onError:t}){const r=Hn(qe(de,"deals"),ts("status","==","open"),Wn("lastActivityAt","desc"),zr(n));return Hr(r,i=>e(i.docs.map(_w)),i=>t&&t(i))}async function Rf(n){const e=Kn(),t=nc(n),r=await Gn(qe(de,"deals"),{...t,weightedAmount:0,lastActivityAt:e,createdAt:e,updatedAt:e,createdBy:Nt(),updatedBy:Nt(),_version:1});return await cn(it(de,"leads",n.id),{status:"convertido",convertedTo:{dealId:r.id},lastActivityAt:e,updatedAt:e,updatedBy:Nt(),_version:ln(1)}),await Fs(r.id,t.contactName,"Oportunidad creada desde lead"),r.id}async function vw(n,e,t={}){const r=Kn(),i=bf(e);await cn(it(de,"deals",n),{stageId:e,stageName:i.label,probability:i.prob,weightedAmount:Math.round((Number(t.amount)||0)*i.prob),lastActivityAt:r,updatedAt:r,updatedBy:Nt(),_version:ln(1)}),await Fs(n,t.contactName,"Etapa → "+i.label)}async function Ew(n,e,t={}){const r=Kn(),i=Math.max(0,Math.round(Number(e)||0));await cn(it(de,"deals",n),{amount:i,weightedAmount:Math.round(i*os(t.stageId)),updatedAt:r,updatedBy:Nt(),_version:ln(1)})}async function Iw(n,e={}){const t=Kn();await cn(it(de,"deals",n),{status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:t,updatedAt:t,updatedBy:Nt(),_version:ln(1)}),await Fs(n,e.contactName,"🎉 Venta GANADA")}async function ww(n,e,t={}){const r=Kn();await cn(it(de,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"").trim()||"Sin motivo",lastActivityAt:r,updatedAt:r,updatedBy:Nt(),_version:ln(1)}),await Fs(n,t.contactName,"Perdido: "+(e||"sin motivo"))}const Qt=n=>new Date(Date.now()-n*6e4).toISOString(),he=n=>Qt(n*60),ve=n=>Qt(n*60*24),Tw=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],Sf=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Qt(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:Qt(18),lastActivityAt:Qt(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Qt(5),contactId:"email_casalcedo_outlook_com",createdAt:he(1),lastActivityAt:he(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:he(-1),contactId:"email_diana_r_hotmail_com",createdAt:he(5),lastActivityAt:he(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:he(-3),contactId:"phone_573044455667",createdAt:he(8),lastActivityAt:he(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:ve(-1),contactId:"email_lauraortiz_gmail_com",createdAt:ve(1),lastActivityAt:he(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ve(-1),contactId:"email_pnarango_empresa_co",createdAt:ve(2),lastActivityAt:ve(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ve(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:ve(4),lastActivityAt:ve(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:ve(-2),contactId:"email_afcuesta_gmail_com",createdAt:ve(6),lastActivityAt:ve(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:ve(-10),contactId:"email_cata_rios_gmail_com",createdAt:ve(12),lastActivityAt:ve(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:he(-2),contactId:"email_glopa_gmail_com",createdAt:he(3),lastActivityAt:he(3),_version:1}],Aw={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:Qt(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:he(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:he(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:he(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:ve(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:he(20),_version:1}]},Zo={};Sf.forEach(n=>{Zo[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:"lead",source:n.source,score:0,rating:"cold",lifecycleStage:"lead",clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});const Vi={},bw=()=>Sf.map(n=>({...n})),Rw=()=>Tw.map(n=>({...n})),Sw=n=>(Aw[n]||[]).map(e=>({...e})),Cw=n=>Zo[n]?{...Zo[n]}:null,Ou=n=>(Vi[n]||[]).map(e=>({...e}));function Pw(n,e){Vi[n]||(Vi[n]=[]),Vi[n].unshift({id:"n"+Date.now(),...e})}let kw=100;const wr=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"contactado",stageName:"Contactado",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:he(2),createdAt:he(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_agendada",stageName:"Cita agendada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:he(20),createdAt:ve(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"test_drive",stageName:"Test drive",status:"open",amount:68e6,currency:"COP",probability:.65,weightedAmount:442e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:ve(18),createdAt:ve(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.8,weightedAmount:108e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:he(6),createdAt:ve(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"nuevo",stageName:"Nuevo",status:"open",amount:0,currency:"COP",probability:.1,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:he(1),createdAt:he(1),_version:1}],Nw=()=>wr.map(n=>({...n}));function Cf(n){const e="d"+ ++kw;return wr.unshift({id:e,...n}),e}function Dw(n,e){const t=wr.findIndex(r=>r.id===n);t>=0&&(wr[t]={...wr[t],...e})}const Ht=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},ea=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:Ht(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:Ht(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:Ht(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:Ht(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:Ht(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:Ht(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:Ht(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],Vw=()=>ea.map(n=>({...n}));function Ow(n){ea.push({id:"ag"+(ea.length+1),...n})}const pn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>'};function Pf(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=Er("crm.edit"),r=$.get().user&&$.get().user.uid,i=_("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),s=_("label",{class:"search","aria-label":"Buscar"},[_("span",{html:pn.search,"aria-hidden":"true"}),_("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),a=_("div",{class:"inbox__filters"}),c=_("div",{class:"inbox__toolbar"},[s,a]),u=_("div",{class:"inbox__list",role:"list",tabindex:"-1"}),d=_("section",{class:"inbox"},[i,c,u]);Ee(n),n.append(d);const m=s.querySelector("input");m.addEventListener("input",()=>{e.search=m.value,Z()});async function v(V,x){if(N(V.id,{ownerId:x?x.uid:null,ownerName:x?x.nombre:null}),$.get().mock){re(x?`Asignado a ${x.nombre}`:"Sin asignar","ok");return}try{await aw(V.id,x),re(x?`Asignado a ${x.nombre}`:"Sin asignar","ok")}catch{re("No se pudo asignar","error")}}async function T(V,x){if(N(V.id,{status:x,lastActivityAt:new Date().toISOString()}),$.get().mock){re(`Estado → ${Ni(x).label}`,"ok");return}try{await cw(V.id,x,V),re(`Estado → ${Ni(x).label}`,"ok")}catch{re("No se pudo cambiar el estado","error")}}function S(V){const x=mf(V.phone,Lw(V));if(!x){re("Este lead no tiene teléfono","error");return}window.open(x,"_blank","noopener"),!$.get().mock&&t&&lw(V.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:V.fullName}).catch(()=>{})}async function O(V){if(V.status==="convertido"){re("Ya es una oportunidad","info");return}if(N(V.id,{status:"convertido"}),$.get().mock){Cf(nc(V)),re("🎯 Convertido a oportunidad","ok");return}try{await Rf(V),re("🎯 Convertido a oportunidad","ok")}catch{re("No se pudo convertir","error")}}function k(){$.set({leads:e.leads})}function N(V,x){const K=e.leads.findIndex(se=>se.id===V);K!==-1&&(e.leads[K]=If({...e.leads[K],...x}),k(),B())}function B(){q(),Q(),Z()}function q(){const V=ZI(e.leads,r);Ee(i),Xo.forEach(x=>{const K=e.queue===x.id,se=_("button",{class:"chip"+(K?" chip--active":""),role:"tab","aria-selected":String(K),type:"button"},[_("span",{"aria-hidden":"true",text:x.icon}),_("span",{text:x.label}),_("span",{class:"chip__count",text:String(V[x.id]||0)})]);se.addEventListener("click",()=>{e.queue=x.id,B()}),i.append(se)})}function Q(){if(Ee(a),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...Qo.map(x=>[x.id,x.label])]}].forEach(x=>{const K=e.filters[x.key],se=K?(x.items.find(le=>le[0]===K)||[,x.label])[1]:x.label,fe=_("button",{class:"chip"+(K?" chip--active":""),type:"button","aria-haspopup":"menu"},[_("span",{text:se}),_("span",{"aria-hidden":"true",text:"▾"})]);fe.addEventListener("click",()=>{Jt(fe,x.items.map(([le,Qe])=>({value:le,label:Qe,active:le===K})),le=>{e.filters[x.key]=le.value,B()},{title:x.label})}),a.append(fe)}),e.filters.type||e.filters.channel||e.filters.status){const x=_("button",{class:"chip",type:"button"},["✕ Limpiar"]);x.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},B()}),a.append(x)}}function Z(){if(e.loading)return w();if(e.error)return I("⚠️","No se pudo cargar",e.error);const V=rw(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search});if(Ee(u),!V.length){const K=e.search||e.filters.type||e.filters.channel||e.filters.status;u.append(g("🗂️",K?"Sin resultados":"¡Bandeja al día!",K?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const x=_("div",{class:"inbox__listhead"},[_("span",{class:"u-muted u-caption",text:`${V.length} ${V.length===1?"cliente":"clientes"}`}),_("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"})]);if(u.append(x),V.forEach(K=>u.append(L(K))),e.hasMore&&e.queue==="todo"&&!e.search){const K=_("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);K.addEventListener("click",()=>A(K)),u.append(_("div",{class:"inbox__more"},[K]))}}function L(V){const x=Jo[V._rating],K=Ni(V.status),se=V._sla,fe=`sla-dot sla-dot--${se.state}`,le=se.closed?"Cerrado":se.state==="late"?`SLA vencido hace ${ku(se.remainingMs)}`:`Responder en ${ku(se.remainingMs)}`,Qe=[V._type.icon+" "+V._type.label,V.sourceDetail,V.vehicleOfInterestId?"🚗 "+V.vehicleOfInterestId:""].filter(Boolean).join(" · "),Qn=_("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":V.id,"aria-label":`${V.fullName}, ${x.label}`},[_("span",{class:fe,title:le,"aria-label":le}),_("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Ls(V.fullName)}),_("div",{class:"lead-card__main u-grow"},[_("div",{class:"lead-card__top"},[_("span",{class:"lead-card__name u-truncate",text:V.fullName}),_("span",{class:`temp ${x.cls}`,title:`Score ${V._score}/100`},[`${x.icon} ${V._score}`])]),_("div",{class:"lead-card__what u-truncate u-muted",text:Qe}),_("div",{class:"lead-card__meta u-caption"},[_("span",{class:"lead-card__chan",text:`${V._channel.icon} ${V._channel.label}`}),_("span",{class:"lead-card__dot",text:"·"}),_("span",{text:Ir(V.createdAt)}),_("span",{class:"lead-card__dot",text:"·"}),_("span",{class:`badge badge--${K.badge||""}`.trim(),text:K.label}),V.ownerName?_("span",{class:"lead-card__dot",text:"·"}):null,V.ownerName?_("span",{class:"u-faint",text:"👤 "+V.ownerName}):null]),_("div",{class:"lead-card__nba"},[_("span",{"aria-hidden":"true",text:V._nba.icon}),_("span",{class:"u-muted",text:"Próx: "}),_("strong",{text:V._nba.label})])]),_("div",{class:"lead-card__actions"},[R("wa",pn.wa,"WhatsApp","btn--wa"),t?R("assign",pn.person,"Asignar"):null,t?R("status",pn.flag,"Cambiar estado"):null,t?R("convert",pn.convert,"Convertir a oportunidad"):null,R("open",pn.expand,"Abrir 360")])]);return Qn.addEventListener("click",Be=>{const ge=Be.target.closest("[data-action]");if(ge){y(ge.dataset.action,V,ge);return}p(V.id)}),Qn.addEventListener("keydown",Be=>{Be.key==="Enter"?p(V.id):Be.key.toLowerCase()==="w"&&S(V)}),Qn}function R(V,x,K,se=""){return _("button",{class:`icon-btn ${se}`.trim(),type:"button","data-action":V,title:K,"aria-label":K},[_("span",{html:x,"aria-hidden":"true"})])}function y(V,x,K){if(V==="open")return p(x.id);if(V==="wa")return S(x);if(V==="convert")return O(x);if(V==="assign"){const se=$.get().team||[],fe=[{value:null,label:"Sin asignar",icon:"⊘",active:!x.ownerId},...se.map(le=>({value:le,label:le.nombre,hint:le.cargo,icon:"👤",active:x.ownerId===le.uid}))];return Jt(K,fe,le=>v(x,le.value),{title:"Asignar a"})}if(V==="status"){const se=Qo.map(fe=>({value:fe.id,label:fe.label,active:(x.status||"nuevo")===fe.id}));return Jt(K,se,fe=>T(x,fe.value),{title:"Cambiar estado"})}}function p(V){$.set({detailLeadId:V})}function g(V,x,K){return _("div",{class:"state"},[_("div",{class:"state__icon","aria-hidden":"true",text:V}),_("div",{class:"state__title",text:x}),_("div",{class:"state__msg",text:K})])}function I(V,x,K){Ee(u),u.append(g(V,x,K))}function w(){Ee(u);for(let V=0;V<6;V++)u.append(_("div",{class:"lead-card lead-card--skeleton"},[_("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),_("div",{class:"u-grow u-stack",style:{gap:"8px"}},[_("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),_("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function A(V){if(e.cursor){V.disabled=!0,V.textContent="Cargando…";try{const{rows:x,lastDoc:K,hasMore:se}=await sw({after:e.cursor}),fe=wo(x),le=new Set(e.leads.map(Qe=>Qe.id));e.leads.push(...fe.filter(Qe=>!le.has(Qe.id))),e.cursor=K,e.hasMore=se,k(),B()}catch{re("No se pudo cargar más","error"),V.disabled=!1,V.textContent="Cargar más"}}}function E(){if($.get().mock){$.set({team:Rw()}),e.leads=wo(bw()),e.loading=!1,e.hasMore=!1,k(),B();return}ow().catch(()=>{}),e.sub=iw({pageSize:40,onData:(V,x)=>{e.leads=wo(V),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=x.hasMore,e.loading=!1,e.error=null,k(),B()},onError:V=>{console.error("[inbox] error de suscripción:",V),e.loading=!1,e.error=V&&V.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",B()}})}return B(),E(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null}}function Lw(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}const Mw=["Precio / presupuesto","Financiación negada","Compró en otro lado","No responde","Cambió de opinión","Otro motivo"];function xw(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null},t=Er("crm.edit"),r=_("div",{class:"pipeline__bar"}),i=_("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),s=_("section",{class:"pipeline"},[r,i]);Ee(n),n.append(s);function a(R,y){const p=e.deals.findIndex(g=>g.id===R);p!==-1&&(e.deals[p]={...e.deals[p],...y},$.get().mock&&Dw(R,y),v())}async function c(R,y){if(R.stageId===y)return;const p=bf(y);if(a(R.id,{stageId:y,stageName:p.label,probability:p.prob,lastActivityAt:new Date().toISOString()}),$.get().mock){re("Etapa → "+p.label,"ok");return}try{await vw(R.id,y,R)}catch{re("No se pudo mover","error")}}async function u(R,y){if(a(R.id,{amount:y}),!$.get().mock)try{await Ew(R.id,y,R)}catch{re("No se pudo guardar el monto","error")}}async function d(R){if(a(R.id,{status:"won"}),$.get().mock){re("🎉 ¡Venta ganada!","ok");return}try{await Iw(R.id,R),re("🎉 ¡Venta ganada!","ok")}catch{re("Error","error")}}async function m(R,y){if(a(R.id,{status:"lost",lostReason:y}),$.get().mock){re("Marcado perdido","info");return}try{await ww(R.id,y,R),re("Marcado perdido","info")}catch{re("Error","error")}}function v(){if(e.loading)return Z();if(e.error)return Q("⚠️","No se pudo cargar",e.error);const R=e.deals.filter(p=>p.status==="open");if(T(R),Ee(i),!R.length){i.append(_("div",{class:"state"},[_("div",{class:"state__icon",text:"🎯"}),_("div",{class:"state__title",text:"Embudo vacío"}),_("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const y=gw(R);Di.forEach(p=>{const g=y[p.id]||[],I=g.reduce((A,E)=>A+(Number(E.amount)||0),0),w=_("div",{class:"pcol","data-stage":p.id},[_("div",{class:"pcol__head"},[_("div",{class:"u-row u-row--tight"},[_("span",{class:"pcol__dot",style:{background:Fw(p.id)}}),_("strong",{text:p.label}),_("span",{class:"pcol__count",text:String(g.length)})]),_("span",{class:"u-caption u-faint",text:`${Math.round(p.prob*100)}% · ${_i(I)||"$0"}`})]),_("div",{class:"pcol__drop","data-stage":p.id,role:"list"},g.map(O))]);q(w.querySelector(".pcol__drop"),p.id),i.append(w)})}function T(R){const y=fw(R),p=pw(R);Ee(r),r.append(S("Oportunidades",String(R.length)),S("Valor del embudo",_i(p)||"$0"),S("Forecast ponderado",_i(y)||"$0",!0))}function S(R,y,p){return _("div",{class:"pstat"+(p?" pstat--hi":"")},[_("span",{class:"u-caption u-faint",text:R}),_("strong",{class:"pstat__v",text:y})])}function O(R){const y=mw(R),p=_("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[R.amount?_i(R.amount):"+ monto"]),g=_("article",{class:"deal-card"+(y?" is-rotting":""),draggable:"true",tabindex:"0","data-id":R.id,"data-stage":R.stageId,role:"listitem","aria-label":`${R.name}, ${Math.round(os(R.stageId)*100)}%`},[_("div",{class:"deal-card__top"},[_("span",{class:"avatar avatar--sm","aria-hidden":"true",text:Ls(R.contactName)}),_("span",{class:"deal-card__name u-grow u-truncate",text:R.name}),y?_("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),R.vehicleName?_("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+R.vehicleName}):null,_("div",{class:"deal-card__row"},[p,_("span",{class:"badge badge--gold",text:`${Math.round(os(R.stageId)*100)}%`})]),_("div",{class:"deal-card__foot u-caption u-faint"},[_("span",{class:"u-grow u-truncate",text:R.ownerName?"👤 "+R.ownerName:"Sin asesor"}),_("span",{text:Ir(R.lastActivityAt)})]),_("div",{class:"deal-card__actions"},t?[k("stage","↔","Mover etapa"),k("won","✓","Marcar ganado"),k("lost","✕","Marcar perdido"),k("open","⤢","Abrir 360")]:[k("open","⤢","Abrir 360")])]);return g.addEventListener("dragstart",I=>{e.dragId=R.id,g.classList.add("is-dragging");try{I.dataTransfer.setData("text/plain",R.id),I.dataTransfer.effectAllowed="move"}catch{}}),g.addEventListener("dragend",()=>{e.dragId=null,g.classList.remove("is-dragging")}),g.addEventListener("click",I=>{const w=I.target.closest("[data-action]");if(w)return N(w.dataset.action,R,w)}),g}function k(R,y,p){return _("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":R,title:p,"aria-label":p,draggable:"false"},[y])}function N(R,y,p){if(R==="open")return $.set({detailLeadId:y.leadId});if(R==="amount")return B(y,p);if(R==="stage")return Jt(p,Di.map(g=>({value:g.id,label:g.label,hint:Math.round(g.prob*100)+"%",active:g.id===y.stageId})),g=>c(y,g.value),{title:"Mover a etapa"});if(R==="won")return d(y);if(R==="lost")return Jt(p,Mw.map(g=>({value:g,label:g})),g=>m(y,g.value),{title:"Motivo de pérdida"})}function B(R,y){const p=_("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:R.amount||"","aria-label":"Monto en COP"});y.replaceWith(p),p.focus(),p.select();const g=()=>{const I=parseInt(String(p.value).replace(/\D/g,""),10)||0;u(R,I)};p.addEventListener("keydown",I=>{I.key==="Enter"?(I.preventDefault(),g()):I.key==="Escape"&&v()}),p.addEventListener("blur",g)}function q(R,y){R.addEventListener("dragover",p=>{p.preventDefault(),R.classList.add("is-over"),p.dataTransfer&&(p.dataTransfer.dropEffect="move")}),R.addEventListener("dragleave",()=>R.classList.remove("is-over")),R.addEventListener("drop",p=>{p.preventDefault(),R.classList.remove("is-over");const g=e.dragId||p.dataTransfer&&p.dataTransfer.getData("text/plain"),I=e.deals.find(w=>w.id===g);I&&c(I,y)})}function Q(R,y,p){Ee(i),i.append(_("div",{class:"state"},[_("div",{class:"state__icon",text:R}),_("div",{class:"state__title",text:y}),_("div",{class:"state__msg",text:p})]))}function Z(){Ee(r),Ee(i),Di.slice(0,5).forEach(()=>{i.append(_("div",{class:"pcol"},[_("div",{class:"pcol__head"},[_("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),_("div",{class:"pcol__drop"},[1,2].map(()=>_("div",{class:"deal-card",style:{pointerEvents:"none"}},[_("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function L(){if($.get().mock){e.deals=Nw(),e.loading=!1,v();return}e.sub=yw({pageSize:150,onData:R=>{e.deals=R,e.loading=!1,e.error=null,v()},onError:R=>{e.loading=!1,e.error=R&&R.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",v()}})}return v(),L(),function(){e.sub&&e.sub(),e.sub=null}}function Fw(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const Uw=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],Lu=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function kf(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function Nf(n,e){const r=(new Date(n,e,1).getDay()+6)%7,i=new Date(n,e+1,0).getDate(),s=[];for(let c=0;c<r;c++)s.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=i;c++)s.push({date:new Date(n,e,c),inMonth:!0});for(;s.length%7!==0;){const c=s[s.length-1].date;s.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const a=[];for(let c=0;c<s.length;c+=7)a.push(s.slice(c,c+7));return a}function Bw(n,e){const t=Nf(n,e),r=t[0][0].date,s=t[t.length-1][6].date,a=new Date(s.getFullYear(),s.getMonth(),s.getDate()+1);return{startISO:r.toISOString(),endISO:a.toISOString()}}function $w(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=kf(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,i)=>new Date(r.dueAt)-new Date(i.dueAt));return e}function Mu(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function jw(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const qw=n=>({id:n.id,...n.data()}),zw=()=>$.get().user?$.get().user.uid:null;function Hw(n,e,t,r){const i=Hn(qe(de,"activities"),ts("dueAt",">=",n),ts("dueAt","<",e),Wn("dueAt","asc"));return Hr(i,s=>t(s.docs.map(qw)),s=>r&&r(s))}async function Ww(n,e,t){return Gn(qe(de,"activities"),{type:"cita",subject:t||"Cita con "+(n.fullName||""),body:"",status:"open",direction:"outbound",dueAt:e,relatedTo:{type:"lead",id:n.id||null,name:n.fullName||""},ownerId:n.ownerId||zw(),createdAt:new Date().toISOString(),_version:1})}function Gw(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=_("div",{class:"agenda__head"}),i=_("div",{class:"agenda__weekdays"},Uw.map(k=>_("span",{class:"agenda__wd",text:k}))),s=_("div",{class:"agenda__grid"}),a=_("section",{class:"agenda"},[r,i,s]);Ee(n),n.append(a);function c(k){let N=t.month+k,B=t.year;N<0?(N=11,B--):N>11&&(N=0,B++),t.year=B,t.month=N,O()}function u(){t.year=e.getFullYear(),t.month=e.getMonth(),O()}function d(){Ee(r);const k=_("div",{class:"u-row u-row--tight"},[m("‹","Mes anterior",()=>c(-1)),_("button",{class:"btn btn--soft btn--sm",type:"button",onclick:u},["Hoy"]),m("›","Mes siguiente",()=>c(1))]);r.append(_("h2",{class:"agenda__title",text:`${Lu[t.month]} ${t.year}`}),k)}function m(k,N,B){const q=_("button",{class:"icon-btn",type:"button","aria-label":N},[k]);return q.addEventListener("click",B),q}function v(){if(d(),Ee(s),t.error){s.append(_("div",{class:"state"},[_("div",{class:"state__icon",text:"⚠️"}),_("div",{class:"state__title",text:"No se pudo cargar la agenda"}),_("div",{class:"state__msg",text:t.error})]));return}const k=$w(t.events);Nf(t.year,t.month).forEach(B=>{B.forEach(q=>{const Q=kf(q.date),Z=k[Q]||[],L=jw(q.date,e),R=_("div",{class:"agenda__day"+(q.inMonth?"":" is-out")+(L?" is-today":""),role:"gridcell"},[_("div",{class:"agenda__daynum",text:String(q.date.getDate())})]),y=_("div",{class:"agenda__events"});if(Z.slice(0,3).forEach(p=>y.append(T(p))),Z.length>3){const p=_("button",{class:"agenda__more",type:"button"},[`+${Z.length-3} más`]);p.addEventListener("click",()=>Jt(p,Z.map(g=>({value:g,label:`${Mu(g.dueAt)} · ${g.relatedTo?.name||g.subject||"Cita"}`})),g=>S(g.value),{title:`${q.date.getDate()} ${Lu[t.month]}`})),y.append(p)}R.append(y),s.append(R)})})}function T(k){const N=_("button",{class:"agenda__chip",type:"button",title:k.subject||"Cita"},[_("span",{class:"agenda__chip-time",text:Mu(k.dueAt)}),_("span",{class:"u-truncate",text:k.relatedTo?.name||k.subject||"Cita"})]);return N.addEventListener("click",()=>S(k)),N}function S(k){const N=k.relatedTo&&k.relatedTo.id;N&&$.set({detailLeadId:N})}function O(){if(v(),t.sub&&(t.sub(),t.sub=null),$.get().mock){t.events=Vw(),t.loading=!1,v();return}const{startISO:k,endISO:N}=Bw(t.year,t.month);t.sub=Hw(k,N,B=>{t.events=B,t.loading=!1,t.error=null,v()},B=>{t.loading=!1,t.error=B&&B.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",v()})}return O(),function(){t.sub&&t.sub(),t.sub=null}}const Df=n=>({id:n.id,...n.data()});async function Kw(n){if(!n)return null;const e=await af(it(de,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function Qw(n,e,t){const r=Hn(qe(de,"activities"),ts("relatedTo.id","==",n),Wn("createdAt","desc"),zr(50));return Hr(r,i=>e(i.docs.map(Df)),i=>t&&t(i))}function Yw(n,e,t){const r=Hn(qe(de,"contacts",n,"crmNotes"),Wn("createdAt","desc"),zr(50));return Hr(r,i=>e(i.docs.map(Df)),i=>t&&t(i))}async function Jw(n,e){const t=$.get().user;await Gn(qe(de,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:$.get().profile&&$.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const Xw={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function Zw(n){let e=null,t=null,r=null,i="resumen",s={lead:null,contact:null,activities:[],notes:[]};const a=_("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=_("div",{class:"detail-overlay",hidden:!0},[a]);n.append(c),c.addEventListener("mousedown",L=>{L.target===c&&u()}),window.addEventListener("keydown",L=>{L.key==="Escape"&&e&&u()}),$.subscribe(L=>{L.detailLeadId!==e&&m(L.detailLeadId)});function u(){$.set({detailLeadId:null})}function d(){t&&(t(),t=null),r&&(r(),r=null)}function m(L){if(d(),e=L,!L){c.hidden=!0,document.body.classList.remove("has-detail"),Ee(a);return}i="resumen",c.hidden=!1,document.body.classList.add("has-detail"),v(L)}function v(L){const R=($.get().leads||[]).find(y=>y.id===L);s={lead:R||null,contact:null,activities:[],notes:[]},T(),R&&($.get().mock?(s.contact=Cw(R.contactId),s.activities=Sw(L),s.notes=Ou(R.contactId),T()):(Kw(R.contactId).then(y=>{s.contact=y,T()}).catch(()=>{}),t=Qw(L,y=>{s.activities=y,T()},()=>{}),R.contactId&&(r=Yw(R.contactId,y=>{s.notes=y,T()},()=>{}))))}function T(){Ee(a);const L=s.lead;if(!L){a.append(S(null)),a.append(_("div",{class:"state"},[_("div",{class:"state__icon",text:"🔍"}),_("div",{class:"state__title",text:"Lead no disponible"}),_("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}a.append(S(L)),a.append(O());const R=_("div",{class:"detail__body"});i==="resumen"?R.append(k(L)):i==="comms"?R.append(B()):i==="score"?R.append(q(L)):i==="notas"&&R.append(Q(L)),a.append(R)}function S(L){const R=_("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(R.addEventListener("click",u),!L)return _("div",{class:"detail__header"},[_("div",{class:"u-grow"}),R]);const y=Z(L),p=Jo[y.rating],g=Ni(L.status),I=Ms(L),w=_f(L),A=_("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);A.addEventListener("click",()=>{const K=mf(L.phone,`Hola ${String(L.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!K)return re("Sin teléfono","error");window.open(K,"_blank","noopener")});const E=Er("crm.edit"),V=E&&L.status!=="convertido"?_("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;V&&V.addEventListener("click",async()=>{V.disabled=!0;try{$.get().mock?Cf(nc(L)):await Rf(L),re("🎯 Convertido a oportunidad","ok")}catch{re("No se pudo convertir","error"),V.disabled=!1}});const x=E?_("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;return x&&x.addEventListener("click",()=>eT(L,x)),_("div",{class:"detail__header"},[_("div",{class:"u-row u-grow",style:{minWidth:"0"}},[_("span",{class:"avatar","aria-hidden":"true",text:Ls(L.fullName)}),_("div",{class:"u-grow",style:{minWidth:"0"}},[_("h2",{class:"detail__name u-truncate",text:L.fullName}),_("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[_("span",{class:`temp ${p.cls}`,text:`${p.icon} ${p.label} · ${y.score}`}),_("span",{class:`badge badge--${g.badge||""}`.trim(),text:g.label}),_("span",{class:"badge",text:`${I.icon} ${I.label}`}),_("span",{class:"badge",text:`${w.icon} ${w.label}`})])])]),_("div",{class:"u-row u-row--tight"},[V,x,A,R])])}function O(){const L=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],R=_("div",{class:"detail__tabs",role:"tablist"});return L.forEach(([y,p])=>{const g=_("button",{class:"detail__tab"+(i===y?" is-active":""),role:"tab","aria-selected":String(i===y),type:"button"},[p]);g.addEventListener("click",()=>{i=y,T()}),R.append(g)}),R}function k(L){const R=s.contact,y=R&&R.consent?R.consent:null,p=[["Correo",L.email||"—"],["Teléfono",L.phone||"—"],["Interés",L.sourceDetail||"—"],["Vehículo",L.vehicleOfInterestId||"—"],["Asesor",L.ownerName||"Sin asignar"],["Origen",L.source||"—"],["Capturado",OI(L.createdAt)],["Última actividad",Ir(L.lastActivityAt)]],g=Ef(L,{score:Z(L).score});return _("div",{class:"u-stack"},[_("div",{class:"detail-card detail-card--nba"},[_("span",{class:"detail-card__icon","aria-hidden":"true",text:g.icon}),_("div",{class:"u-grow"},[_("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),_("strong",{text:g.label}),_("div",{class:"u-caption u-faint",text:g.reason})])]),_("dl",{class:"kv"},p.flatMap(([I,w])=>[_("dt",{text:I}),_("dd",{class:"u-truncate",text:w})])),y?N(y):null])}function N(L){const R=y=>y?"✅":"⛔";return _("div",{class:"detail-card"},[_("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),_("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[_("span",{class:"u-caption",text:`${R(L.email)} Email`}),_("span",{class:"u-caption",text:`${R(L.whatsapp)} WhatsApp`}),_("span",{class:"u-caption",text:`${R(L.calls)} Llamadas`})]),_("div",{class:"u-caption u-faint",text:`Política ${L.policyVersion||"v1"} · origen ${L.source||"—"}`})])}function B(){if(!s.activities.length)return _("div",{class:"state"},[_("div",{class:"state__icon",text:"📭"}),_("div",{class:"state__title",text:"Sin comunicaciones"}),_("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const L=_("ol",{class:"timeline"});return s.activities.forEach(R=>{L.append(_("li",{class:"timeline__item timeline__item--"+(R.direction||"inbound")},[_("span",{class:"timeline__icon","aria-hidden":"true",text:Xw[R.type]||"•"}),_("div",{class:"u-grow"},[_("div",{class:"u-spread"},[_("strong",{class:"u-truncate",text:R.subject||R.type||"Actividad"}),_("span",{class:"u-caption u-faint",text:Ir(R.createdAt)})]),R.body?_("div",{class:"u-caption u-muted",text:R.body}):null])]))}),L}function q(L){const R=Z(L),y=Jo[R.rating],p=Object.keys(Vu).map(g=>{const I=Math.round((R.factors[g]||0)*100);return _("div",{class:"factor"},[_("div",{class:"u-spread u-caption"},[_("span",{text:Vu[g]}),_("span",{class:"u-faint",text:`${I}% · peso ${Math.round(XI[g]*100)}%`})]),_("div",{class:"factor__track"},[_("div",{class:"factor__fill",style:{width:I+"%"}})])])});return _("div",{class:"u-stack"},[_("div",{class:"scorehero"},[_("div",{class:`scorehero__num ${y.cls}`,text:String(R.score)}),_("div",{class:"u-stack",style:{gap:"2px"}},[_("strong",{text:`${y.icon} ${y.label}`}),_("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),_("div",{class:"u-stack",style:{gap:"10px"}},p)])}function Q(L){const R=Er("crm.edit")||Er("crm.create"),y=_("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),p=_("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);p.addEventListener("click",async()=>{const I=y.value.trim();if(!I)return;p.disabled=!0;const w={body:I,authorName:"Tú",createdAt:new Date().toISOString()};try{$.get().mock?(Pw(L.contactId,w),s.notes=Ou(L.contactId),T()):(await Jw(L.contactId,I),y.value=""),re("Nota agregada","ok")}catch{re("No se pudo guardar la nota","error")}finally{p.disabled=!1}});const g=_("div",{class:"u-stack"});return s.notes.length||g.append(_("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),s.notes.forEach(I=>g.append(_("div",{class:"detail-card"},[_("div",{class:"u-caption u-muted",text:I.body}),_("div",{class:"u-caption u-faint",text:`${I.authorName||"Asesor"} · ${Ir(I.createdAt)}`})]))),_("div",{class:"u-stack"},[R?_("div",{class:"u-stack",style:{gap:"8px"}},[y,_("div",{class:"u-row",style:{justifyContent:"flex-end"}},[p])]):null,g])}function Z(L){return vf(L,s.activities||[],s.contact)}}function eT(n,e){const t=S=>String(S).padStart(2,"0"),r=new Date;r.setDate(r.getDate()+1),r.setHours(10,0,0,0);const i=`${r.getFullYear()}-${t(r.getMonth()+1)}-${t(r.getDate())}T${t(r.getHours())}:${t(r.getMinutes())}`,s=_("input",{class:"input",type:"text",value:"Cita con "+(n.fullName||""),"aria-label":"Asunto"}),a=_("input",{class:"input",type:"datetime-local",value:i,"aria-label":"Fecha y hora"}),c=_("button",{class:"btn btn--gold btn--sm btn--block",type:"button"},["Agendar"]),u=_("div",{class:"popover",role:"dialog","aria-label":"Agendar cita",style:{width:"260px",gap:"8px"}},[_("div",{class:"popover__title",text:"Agendar cita"}),s,a,c]);document.body.append(u);const d=e.getBoundingClientRect();u.style.top=`${Math.min(window.innerHeight-u.offsetHeight-8,d.bottom+6)}px`,u.style.left=`${Math.max(8,d.right-u.offsetWidth)}px`,setTimeout(()=>a.focus(),0);const m=()=>{u.remove(),document.removeEventListener("mousedown",v,!0),window.removeEventListener("keydown",T,!0)},v=S=>{u.contains(S.target)||m()},T=S=>{S.key==="Escape"&&m()};setTimeout(()=>{document.addEventListener("mousedown",v,!0),window.addEventListener("keydown",T,!0)},0),c.addEventListener("click",async()=>{const S=a.value?new Date(a.value).toISOString():null;if(!S){re("Elige fecha y hora","error");return}c.disabled=!0;try{$.get().mock?Ow({type:"cita",subject:s.value,dueAt:S,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}):await Ww(n,S,s.value),re("📅 Cita agendada","ok"),m()}catch{re("No se pudo agendar","error"),c.disabled=!1}})}const Vf=document.getElementById("app");pp();const tT=new URLSearchParams(location.search).get("mock")==="1",nT={bandeja:Pf,pipeline:xw,agenda:Gw};let Ei=null,Rn=null,Yt=null,ta=null,Oi=null;function xu(n){if(!Rn||n===ta)return;Yt&&(Yt(),Yt=null),$.get().detailLeadId&&$.set({detailLeadId:null}),Yt=(nT[n]||Pf)(Rn.outlet)||null,Rn.setActive(n),ta=n}function rT(){Rn=xI(Vf),Zw(Rn.detailRoot),xu(df()),Oi=NI(xu)}function iT(){Yt&&(Yt(),Yt=null),Oi&&(Oi(),Oi=null),Rn=null,ta=null}function sT(n){n.ready&&(n.user&&Ei!=="app"?(Ei="app",rT()):!n.user&&Ei!=="login"&&(iT(),Ei="login",n.detailLeadId&&$.set({detailLeadId:null}),FI(Vf)))}$.subscribe(sT);tT?$.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):AI();
