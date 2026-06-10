(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function pm(n){let e={...n};const t=new Set;function r(){return e}function s(a){const c=typeof a=="function"?a(e):a;c&&(e={...e,...c},t.forEach(u=>u(e)))}function i(a){return t.add(a),()=>t.delete(a)}return{get:r,set:s,subscribe:i}}const q=pm({ready:!1,authError:null,user:null,profile:null,permissions:[],team:[],theme:"light",mock:!1,detailLeadId:null}),Vh="altorra-crm-theme";function mm(){let n=localStorage.getItem(Vh);n!=="light"&&n!=="dark"&&(n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.dataset.theme=n,q.set({theme:n})}function gm(){const n=document.documentElement.dataset.theme==="dark"?"light":"dark";return document.documentElement.dataset.theme=n,localStorage.setItem(Vh,n),q.set({theme:n}),n}var ql={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},_m=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Da={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,g=i>>2,I=(i&3)<<4|c>>4;let T=(c&15)<<2|d>>6,R=d&63;u||(R=64,a||(T=64)),r.push(t[g],t[I],t[T],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Oh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):_m(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const I=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||I==null)throw new ym;const T=i<<2|c>>4;if(r.push(T),d!==64){const R=c<<4&240|d>>2;if(r.push(R),I!==64){const N=d<<6&192|I;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ym extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const vm=function(n){const e=Oh(n);return Da.encodeByteArray(e,!0)},ni=function(n){return vm(n).replace(/\./g,"")},Lh=function(n){try{return Da.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function xh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const wm=()=>xh().__FIREBASE_DEFAULTS__,Em=()=>{if(typeof process>"u"||typeof ql>"u")return;const n=ql.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Im=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Lh(n[1]);return e&&JSON.parse(e)},ki=()=>{try{return wm()||Em()||Im()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Mh=n=>{var e,t;return(t=(e=ki())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Tm=n=>{const e=Mh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Fh=()=>{var n;return(n=ki())===null||n===void 0?void 0:n.config},Uh=n=>{var e;return(e=ki())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Am(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ni(JSON.stringify(t)),ni(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Fe())}function Rm(){var n;const e=(n=ki())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Sm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Cm(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Pm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function km(){const n=Fe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Nm(){return!Rm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Va(){try{return typeof indexedDB=="object"}catch{return!1}}function Dm(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm="FirebaseError";class Tt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Vm,Object.setPrototypeOf(this,Tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,er.prototype.create)}}class er{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Om(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new Tt(s,c,r)}}function Om(n,e){return n.replace(Lm,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Lm=/\{\$([^}]+)}/g;function xm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ri(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(zl(i)&&zl(a)){if(!ri(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function zl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ts(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Tr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Ar(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Mm(n,e){const t=new Fm(n,e);return t.subscribe.bind(t)}class Fm{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Um(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=xo),s.error===void 0&&(s.error=xo),s.complete===void 0&&(s.complete=xo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Um(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function xo(){}/**
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
 */function ye(n){return n&&n._delegate?n._delegate:n}class gt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const sn="[DEFAULT]";/**
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
 */class Hm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Mr;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gm(e))try{this.getOrInitializeService({instanceIdentifier:sn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=sn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=sn){return this.instances.has(e)}getOptions(e=sn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Wm(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=sn){return this.component?this.component.multipleInstances?e:sn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Wm(n){return n===sn?void 0:n}function Gm(n){return n.instantiationMode==="EAGER"}/**
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
 */var Z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Z||(Z={}));const Qm={debug:Z.DEBUG,verbose:Z.VERBOSE,info:Z.INFO,warn:Z.WARN,error:Z.ERROR,silent:Z.SILENT},Ym=Z.INFO,Jm={[Z.DEBUG]:"log",[Z.VERBOSE]:"log",[Z.INFO]:"info",[Z.WARN]:"warn",[Z.ERROR]:"error"},Xm=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Jm[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ni{constructor(e){this.name=e,this._logLevel=Ym,this._logHandler=Xm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Qm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Z.DEBUG,...e),this._logHandler(this,Z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Z.VERBOSE,...e),this._logHandler(this,Z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Z.INFO,...e),this._logHandler(this,Z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Z.WARN,...e),this._logHandler(this,Z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Z.ERROR,...e),this._logHandler(this,Z.ERROR,...e)}}const Zm=(n,e)=>e.some(t=>n instanceof t);let Hl,Wl;function eg(){return Hl||(Hl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function tg(){return Wl||(Wl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const $h=new WeakMap,Zo=new WeakMap,Bh=new WeakMap,Mo=new WeakMap,Oa=new WeakMap;function ng(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(xt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&$h.set(t,n)}).catch(()=>{}),Oa.set(e,n),e}function rg(n){if(Zo.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Zo.set(n,e)}let ea={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Zo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Bh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return xt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function sg(n){ea=n(ea)}function ig(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Fo(this),e,...t);return Bh.set(r,e.sort?e.sort():[e]),xt(r)}:tg().includes(n)?function(...e){return n.apply(Fo(this),e),xt($h.get(this))}:function(...e){return xt(n.apply(Fo(this),e))}}function og(n){return typeof n=="function"?ig(n):(n instanceof IDBTransaction&&rg(n),Zm(n,eg())?new Proxy(n,ea):n)}function xt(n){if(n instanceof IDBRequest)return ng(n);if(Mo.has(n))return Mo.get(n);const e=og(n);return e!==n&&(Mo.set(n,e),Oa.set(e,n)),e}const Fo=n=>Oa.get(n);function ag(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=xt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(xt(a.result),u.oldVersion,u.newVersion,xt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const cg=["get","getKey","getAll","getAllKeys","count"],lg=["put","add","delete","clear"],Uo=new Map;function Gl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Uo.get(e))return Uo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=lg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||cg.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),s&&u.done]))[0]};return Uo.set(e,i),i}sg(n=>({...n,get:(e,t,r)=>Gl(e,t)||n.get(e,t,r),has:(e,t)=>!!Gl(e,t)||n.has(e,t)}));/**
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
 */class ug{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(hg(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function hg(n){const e=n.getComponent();return e?.type==="VERSION"}const ta="@firebase/app",Kl="0.11.0";/**
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
 */const _t=new Ni("@firebase/app"),dg="@firebase/app-compat",fg="@firebase/analytics-compat",pg="@firebase/analytics",mg="@firebase/app-check-compat",gg="@firebase/app-check",_g="@firebase/auth",yg="@firebase/auth-compat",vg="@firebase/database",wg="@firebase/data-connect",Eg="@firebase/database-compat",Ig="@firebase/functions",Tg="@firebase/functions-compat",Ag="@firebase/installations",bg="@firebase/installations-compat",Rg="@firebase/messaging",Sg="@firebase/messaging-compat",Cg="@firebase/performance",Pg="@firebase/performance-compat",kg="@firebase/remote-config",Ng="@firebase/remote-config-compat",Dg="@firebase/storage",Vg="@firebase/storage-compat",Og="@firebase/firestore",Lg="@firebase/vertexai",xg="@firebase/firestore-compat",Mg="firebase",Fg="11.3.0";/**
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
 */const na="[DEFAULT]",Ug={[ta]:"fire-core",[dg]:"fire-core-compat",[pg]:"fire-analytics",[fg]:"fire-analytics-compat",[gg]:"fire-app-check",[mg]:"fire-app-check-compat",[_g]:"fire-auth",[yg]:"fire-auth-compat",[vg]:"fire-rtdb",[wg]:"fire-data-connect",[Eg]:"fire-rtdb-compat",[Ig]:"fire-fn",[Tg]:"fire-fn-compat",[Ag]:"fire-iid",[bg]:"fire-iid-compat",[Rg]:"fire-fcm",[Sg]:"fire-fcm-compat",[Cg]:"fire-perf",[Pg]:"fire-perf-compat",[kg]:"fire-rc",[Ng]:"fire-rc-compat",[Dg]:"fire-gcs",[Vg]:"fire-gcs-compat",[Og]:"fire-fst",[xg]:"fire-fst-compat",[Lg]:"fire-vertex","fire-js":"fire-js",[Mg]:"fire-js-all"};/**
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
 */const si=new Map,$g=new Map,ra=new Map;function Ql(n,e){try{n.container.addComponent(e)}catch(t){_t.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function jt(n){const e=n.name;if(ra.has(e))return _t.debug(`There were multiple attempts to register component ${e}.`),!1;ra.set(e,n);for(const t of si.values())Ql(t,n);for(const t of $g.values())Ql(t,n);return!0}function ns(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ye(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Bg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Mt=new er("app","Firebase",Bg);/**
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
 */class jg{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new gt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Mt.create("app-deleted",{appName:this._name})}}/**
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
 */const tr=Fg;function jh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:na,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Mt.create("bad-app-name",{appName:String(s)});if(t||(t=Fh()),!t)throw Mt.create("no-options");const i=si.get(s);if(i){if(ri(t,i.options)&&ri(r,i.config))return i;throw Mt.create("duplicate-app",{appName:s})}const a=new Km(s);for(const u of ra.values())a.addComponent(u);const c=new jg(t,r,a);return si.set(s,c),c}function La(n=na){const e=si.get(n);if(!e&&n===na&&Fh())return jh();if(!e)throw Mt.create("no-app",{appName:n});return e}function pt(n,e,t){var r;let s=(r=Ug[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_t.warn(c.join(" "));return}jt(new gt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const qg="firebase-heartbeat-database",zg=1,Fr="firebase-heartbeat-store";let $o=null;function qh(){return $o||($o=ag(qg,zg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Fr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Mt.create("idb-open",{originalErrorMessage:n.message})})),$o}async function Hg(n){try{const t=(await qh()).transaction(Fr),r=await t.objectStore(Fr).get(zh(n));return await t.done,r}catch(e){if(e instanceof Tt)_t.warn(e.message);else{const t=Mt.create("idb-get",{originalErrorMessage:e?.message});_t.warn(t.message)}}}async function Yl(n,e){try{const r=(await qh()).transaction(Fr,"readwrite");await r.objectStore(Fr).put(e,zh(n)),await r.done}catch(t){if(t instanceof Tt)_t.warn(t.message);else{const r=Mt.create("idb-set",{originalErrorMessage:t?.message});_t.warn(r.message)}}}function zh(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Wg=1024,Gg=30;class Kg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Yg(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Jl();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Gg){const a=Jg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){_t.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Jl(),{heartbeatsToSend:r,unsentEntries:s}=Qg(this._heartbeatsCache.heartbeats),i=ni(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return _t.warn(t),""}}}function Jl(){return new Date().toISOString().substring(0,10)}function Qg(n,e=Wg){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Xl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Xl(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Yg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Va()?Dm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Hg(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Yl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Yl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Xl(n){return ni(JSON.stringify({version:2,heartbeats:n})).length}function Jg(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Xg(n){jt(new gt("platform-logger",e=>new ug(e),"PRIVATE")),jt(new gt("heartbeat",e=>new Kg(e),"PRIVATE")),pt(ta,Kl,n),pt(ta,Kl,"esm2017"),pt("fire-js","")}Xg("");function xa(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Hh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Zg=Hh,Wh=new er("auth","Firebase",Hh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ii=new Ni("@firebase/auth");function e_(n,...e){ii.logLevel<=Z.WARN&&ii.warn(`Auth (${tr}): ${n}`,...e)}function qs(n,...e){ii.logLevel<=Z.ERROR&&ii.error(`Auth (${tr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(n,...e){throw Ma(n,...e)}function tt(n,...e){return Ma(n,...e)}function Gh(n,e,t){const r=Object.assign(Object.assign({},Zg()),{[e]:t});return new er("auth","Firebase",r).create(e,{appName:n.name})}function Ft(n){return Gh(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ma(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Wh.create(n,...e)}function W(n,e,...t){if(!n)throw Ma(e,...t)}function ht(n){const e="INTERNAL ASSERTION FAILED: "+n;throw qs(e),new Error(e)}function yt(n,e){n||ht(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sa(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function t_(){return Zl()==="http:"||Zl()==="https:"}function Zl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class rs{constructor(e,t){this.shortDelay=e,this.longDelay=t,yt(t>e,"Short delay should be less than long delay!"),this.isMobile=bm()||Pm()}get(){return n_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fa(n,e){yt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const i_=new rs(3e4,6e4);function mn(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Yt(n,e,t,r,s={}){return Qh(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=ts(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},i);return Sm()||(d.referrerPolicy="no-referrer"),Kh.fetch()(Yh(n,n.config.apiHost,t,c),d)})}async function Qh(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},s_),e);try{const s=new a_(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Ns(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ns(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Ns(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Ns(n,"user-disabled",a);const g=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Gh(n,g,d);Xe(n,g)}}catch(s){if(s instanceof Tt)throw s;Xe(n,"network-request-failed",{message:String(s)})}}async function Di(n,e,t,r,s={}){const i=await Yt(n,e,t,r,s);return"mfaPendingCredential"in i&&Xe(n,"multi-factor-auth-required",{_serverResponse:i}),i}function Yh(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Fa(n.config,s):`${n.config.apiScheme}://${s}`}function o_(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class a_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(tt(this.auth,"network-request-failed")),i_.get())})}}function Ns(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=tt(n,e,r);return s.customData._tokenResponse=t,s}function eu(n){return n!==void 0&&n.enterprise!==void 0}class c_{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return o_(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function l_(n,e){return Yt(n,"GET","/v2/recaptchaConfig",mn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function u_(n,e){return Yt(n,"POST","/v1/accounts:delete",e)}async function Jh(n,e){return Yt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function h_(n,e=!1){const t=ye(n),r=await t.getIdToken(e),s=Ua(r);W(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:kr(Bo(s.auth_time)),issuedAtTime:kr(Bo(s.iat)),expirationTime:kr(Bo(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Bo(n){return Number(n)*1e3}function Ua(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return qs("JWT malformed, contained fewer than 3 sections"),null;try{const s=Lh(t);return s?JSON.parse(s):(qs("Failed to decode base64 JWT payload"),null)}catch(s){return qs("Caught error parsing JWT payload as JSON",s?.toString()),null}}function tu(n){const e=Ua(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ur(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Tt&&d_(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function d_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class ia{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=kr(this.lastLoginAt),this.creationTime=kr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function oi(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Ur(n,Jh(t,{idToken:r}));W(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Xh(i.providerUserInfo):[],c=m_(n.providerData,a),u=n.isAnonymous,d=!(n.email&&i.passwordHash)&&!c?.length,g=u?d:!1,I={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new ia(i.createdAt,i.lastLoginAt),isAnonymous:g};Object.assign(n,I)}async function p_(n){const e=ye(n);await oi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function m_(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Xh(n){return n.map(e=>{var{providerId:t}=e,r=xa(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function g_(n,e){const t=await Qh(n,{},async()=>{const r=ts({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=Yh(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Kh.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function __(n,e){return Yt(n,"POST","/v2/accounts:revokeToken",mn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):tu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=tu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await g_(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new On;return r&&(W(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(W(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(W(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new On,this.toJSON())}_performRefresh(){return ht("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class dt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=xa(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new f_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new ia(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Ur(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return h_(this,e)}reload(){return p_(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new dt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await oi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ye(this.auth.app))return Promise.reject(Ft(this.auth));const e=await this.getIdToken();return await Ur(this,u_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,c,u,d,g;const I=(r=t.displayName)!==null&&r!==void 0?r:void 0,T=(s=t.email)!==null&&s!==void 0?s:void 0,R=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,N=(a=t.photoURL)!==null&&a!==void 0?a:void 0,C=(c=t.tenantId)!==null&&c!==void 0?c:void 0,P=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,B=(d=t.createdAt)!==null&&d!==void 0?d:void 0,L=(g=t.lastLoginAt)!==null&&g!==void 0?g:void 0,{uid:$,emailVerified:H,isAnonymous:O,providerData:F,stsTokenManager:y}=t;W($&&y,e,"internal-error");const _=On.fromJSON(this.name,y);W(typeof $=="string",e,"internal-error"),Pt(I,e.name),Pt(T,e.name),W(typeof H=="boolean",e,"internal-error"),W(typeof O=="boolean",e,"internal-error"),Pt(R,e.name),Pt(N,e.name),Pt(C,e.name),Pt(P,e.name),Pt(B,e.name),Pt(L,e.name);const p=new dt({uid:$,auth:e,email:T,emailVerified:H,displayName:I,isAnonymous:O,photoURL:N,phoneNumber:R,tenantId:C,stsTokenManager:_,createdAt:B,lastLoginAt:L});return F&&Array.isArray(F)&&(p.providerData=F.map(w=>Object.assign({},w))),P&&(p._redirectEventId=P),p}static async _fromIdTokenResponse(e,t,r=!1){const s=new On;s.updateFromServerResponse(t);const i=new dt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await oi(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];W(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Xh(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new On;c.updateFromIdToken(r);const u=new dt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ia(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nu=new Map;function ft(n){yt(n instanceof Function,"Expected a class definition");let e=nu.get(n);return e?(yt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,nu.set(n,e),e)}/**
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
 */class Zh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Zh.type="NONE";const ru=Zh;/**
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
 */function zs(n,e,t){return`firebase:${n}:${e}:${t}`}class Ln{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=zs(this.userKey,s.apiKey,i),this.fullPersistenceKey=zs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?dt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Ln(ft(ru),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||ft(ru);const a=zs(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const g=await d._get(a);if(g){const I=dt._fromJSON(e,g);d!==i&&(c=I),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Ln(i,e,r):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new Ln(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function su(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(rd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ed(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(id(e))return"Blackberry";if(od(e))return"Webos";if(td(e))return"Safari";if((e.includes("chrome/")||nd(e))&&!e.includes("edge/"))return"Chrome";if(sd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function ed(n=Fe()){return/firefox\//i.test(n)}function td(n=Fe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function nd(n=Fe()){return/crios\//i.test(n)}function rd(n=Fe()){return/iemobile/i.test(n)}function sd(n=Fe()){return/android/i.test(n)}function id(n=Fe()){return/blackberry/i.test(n)}function od(n=Fe()){return/webos/i.test(n)}function $a(n=Fe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function y_(n=Fe()){var e;return $a(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function v_(){return km()&&document.documentMode===10}function ad(n=Fe()){return $a(n)||sd(n)||od(n)||id(n)||/windows phone/i.test(n)||rd(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cd(n,e=[]){let t;switch(n){case"Browser":t=su(Fe());break;case"Worker":t=`${su(Fe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${tr}/${r}`}/**
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
 */async function E_(n,e={}){return Yt(n,"GET","/v2/passwordPolicy",mn(n,e))}/**
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
 */class A_{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new iu(this),this.idTokenSubscription=new iu(this),this.beforeStateQueue=new w_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ft(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Ln.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Jh(this,{idToken:e}),r=await dt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ye(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&u?.user&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await oi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=r_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ye(this.app))return Promise.reject(Ft(this));const t=e?ye(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ye(this.app)?Promise.reject(Ft(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ye(this.app)?Promise.reject(Ft(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ft(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await E_(this),t=new T_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new er("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await __(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ft(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await Ln.create(this,[ft(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=cd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Ye(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&e_(`Error while retrieving App Check token: ${t.error}`),t?.token}}function nr(n){return ye(n)}class iu{constructor(e){this.auth=e,this.observer=null,this.addObserver=Mm(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function b_(n){Vi=n}function ld(n){return Vi.loadJS(n)}function R_(){return Vi.recaptchaEnterpriseScript}function S_(){return Vi.gapiScript}function C_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class P_{constructor(){this.enterprise=new k_}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class k_{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const N_="recaptcha-enterprise",ud="NO_RECAPTCHA";class D_{constructor(e){this.type=N_,this.auth=nr(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{l_(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new c_(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(u=>{c(u)})})}function s(i,a,c){const u=window.grecaptcha;eu(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(ud)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new P_().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&eu(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=R_();u.length!==0&&(u+=c),ld(u).then(()=>{s(c,i,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function ou(n,e,t,r=!1,s=!1){const i=new D_(n);let a;if(s)a=ud;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function au(n,e,t,r,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await ou(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await ou(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V_(n,e){const t=ns(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ri(i,e??{}))return s;Xe(s,"already-initialized")}return t.initialize({options:e})}function O_(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(ft);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function L_(n,e,t){const r=nr(n);W(r._canInitEmulator,r,"emulator-config-failed"),W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=hd(e),{host:a,port:c}=x_(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),M_()}function hd(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function x_(n){const e=hd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:cu(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:cu(a)}}}function cu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function M_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ht("not implemented")}_getIdTokenResponse(e){return ht("not implemented")}_linkToIdToken(e,t){return ht("not implemented")}_getReauthenticationResolver(e){return ht("not implemented")}}async function F_(n,e){return Yt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U_(n,e){return Di(n,"POST","/v1/accounts:signInWithPassword",mn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $_(n,e){return Di(n,"POST","/v1/accounts:signInWithEmailLink",mn(n,e))}async function B_(n,e){return Di(n,"POST","/v1/accounts:signInWithEmailLink",mn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r extends Ba{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new $r(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new $r(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return au(e,t,"signInWithPassword",U_);case"emailLink":return $_(e,{email:this._email,oobCode:this._password});default:Xe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return au(e,r,"signUpPassword",F_);case"emailLink":return B_(e,{idToken:t,email:this._email,oobCode:this._password});default:Xe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xn(n,e){return Di(n,"POST","/v1/accounts:signInWithIdp",mn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j_="http://localhost";class hn extends Ba{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new hn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Xe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=xa(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new hn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return xn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,xn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,xn(e,t)}buildRequest(){const e={requestUri:j_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ts(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q_(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function z_(n){const e=Tr(Ar(n)).link,t=e?Tr(Ar(e)).deep_link_id:null,r=Tr(Ar(n)).deep_link_id;return(r?Tr(Ar(r)).link:null)||r||t||e||n}class ja{constructor(e){var t,r,s,i,a,c;const u=Tr(Ar(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,g=(r=u.oobCode)!==null&&r!==void 0?r:null,I=q_((s=u.mode)!==null&&s!==void 0?s:null);W(d&&g&&I,"argument-error"),this.apiKey=d,this.operation=I,this.code=g,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(a=u.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=z_(e);try{return new ja(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(){this.providerId=rr.PROVIDER_ID}static credential(e,t){return $r._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=ja.parseLink(t);return W(r,"argument-error"),$r._fromEmailAndCode(e,r.code,r.tenantId)}}rr.PROVIDER_ID="password";rr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";rr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ss extends dd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt extends ss{constructor(){super("facebook.com")}static credential(e){return hn._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Nt.credential(e.oauthAccessToken)}catch{return null}}}Nt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Nt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends ss{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return hn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Dt.credential(t,r)}catch{return null}}}Dt.GOOGLE_SIGN_IN_METHOD="google.com";Dt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt extends ss{constructor(){super("github.com")}static credential(e){return hn._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.GITHUB_SIGN_IN_METHOD="github.com";Vt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends ss{constructor(){super("twitter.com")}static credential(e,t){return hn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ot.credential(t,r)}catch{return null}}}Ot.TWITTER_SIGN_IN_METHOD="twitter.com";Ot.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await dt._fromIdTokenResponse(e,r,s),a=lu(r);return new qn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=lu(r);return new qn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function lu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai extends Tt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ai.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ai(e,t,r,s)}}function fd(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ai._fromErrorAndOperation(n,i,e,r):i})}async function H_(n,e,t=!1){const r=await Ur(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return qn._forOperation(n,"link",r)}/**
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
 */async function W_(n,e,t=!1){const{auth:r}=n;if(Ye(r.app))return Promise.reject(Ft(r));const s="reauthenticate";try{const i=await Ur(n,fd(r,s,e,n),t);W(i.idToken,r,"internal-error");const a=Ua(i.idToken);W(a,r,"internal-error");const{sub:c}=a;return W(n.uid===c,r,"user-mismatch"),qn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Xe(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pd(n,e,t=!1){if(Ye(n.app))return Promise.reject(Ft(n));const r="signIn",s=await fd(n,r,e),i=await qn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function G_(n,e){return pd(nr(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K_(n){const e=nr(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Q_(n,e,t){return Ye(n.app)?Promise.reject(Ft(n)):G_(ye(n),rr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&K_(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y_(n,e){return ye(n).setPersistence(e)}function J_(n,e,t,r){return ye(n).onIdTokenChanged(e,t,r)}function X_(n,e,t){return ye(n).beforeAuthStateChanged(e,t)}function Z_(n,e,t,r){return ye(n).onAuthStateChanged(e,t,r)}function ey(n){return ye(n).signOut()}const ci="__sak";/**
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
 */class md{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ci,"1"),this.storage.removeItem(ci),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty=1e3,ny=10;class gd extends md{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ad(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);v_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ny):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},ty)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}gd.type="LOCAL";const _d=gd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd extends md{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}yd.type="SESSION";const vd=yd;/**
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
 */class Oi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Oi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async d=>d(t.origin,i)),u=await ry(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Oi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qa(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class sy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const d=qa("",20);s.port1.start();const g=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(I){const T=I;if(T.data.eventId===d)switch(T.data.status){case"ack":clearTimeout(g),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(T.data.response);break;default:clearTimeout(g),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(){return window}function iy(n){nt().location.href=n}/**
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
 */function wd(){return typeof nt().WorkerGlobalScope<"u"&&typeof nt().importScripts=="function"}async function oy(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ay(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function cy(){return wd()?self:null}/**
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
 */const Ed="firebaseLocalStorageDb",ly=1,li="firebaseLocalStorage",Id="fbase_key";class is{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Li(n,e){return n.transaction([li],e?"readwrite":"readonly").objectStore(li)}function uy(){const n=indexedDB.deleteDatabase(Ed);return new is(n).toPromise()}function oa(){const n=indexedDB.open(Ed,ly);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(li,{keyPath:Id})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(li)?e(r):(r.close(),await uy(),e(await oa()))})})}async function uu(n,e,t){const r=Li(n,!0).put({[Id]:e,value:t});return new is(r).toPromise()}async function hy(n,e){const t=Li(n,!1).get(e),r=await new is(t).toPromise();return r===void 0?null:r.value}function hu(n,e){const t=Li(n,!0).delete(e);return new is(t).toPromise()}const dy=800,fy=3;class Td{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await oa(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>fy)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return wd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Oi._getInstance(cy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await oy(),!this.activeServiceWorker)return;this.sender=new sy(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ay()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await oa();return await uu(e,ci,"1"),await hu(e,ci),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>uu(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>hy(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>hu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Li(s,!1).getAll();return new is(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),dy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Td.type="LOCAL";const py=Td;new rs(3e4,6e4);/**
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
 */function my(n,e){return e?ft(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class za extends Ba{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return xn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return xn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return xn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function gy(n){return pd(n.auth,new za(n),n.bypassAuthState)}function _y(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),W_(t,new za(n),n.bypassAuthState)}async function yy(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),H_(t,new za(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return gy;case"linkViaPopup":case"linkViaRedirect":return yy;case"reauthViaPopup":case"reauthViaRedirect":return _y;default:Xe(this.auth,"internal-error")}}resolve(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vy=new rs(2e3,1e4);class Dn extends Ad{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Dn.currentPopupAction&&Dn.currentPopupAction.cancel(),Dn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){yt(this.filter.length===1,"Popup operations only handle one event");const e=qa();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Dn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,vy.get())};e()}}Dn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wy="pendingRedirect",Hs=new Map;class Ey extends Ad{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Hs.get(this.auth._key());if(!e){try{const r=await Iy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Hs.set(this.auth._key(),e)}return this.bypassAuthState||Hs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Iy(n,e){const t=by(e),r=Ay(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Ty(n,e){Hs.set(n._key(),e)}function Ay(n){return ft(n._redirectPersistence)}function by(n){return zs(wy,n.config.apiKey,n.name)}async function Ry(n,e,t=!1){if(Ye(n.app))return Promise.reject(Ft(n));const r=nr(n),s=my(r,e),a=await new Ey(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sy=10*60*1e3;class Cy{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Py(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!bd(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(tt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Sy&&this.cachedEventUids.clear(),this.cachedEventUids.has(du(e))}saveEventToCache(e){this.cachedEventUids.add(du(e)),this.lastProcessedEventTime=Date.now()}}function du(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function bd({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Py(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return bd(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ky(n,e={}){return Yt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Dy=/^https?/;async function Vy(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ky(n);for(const t of e)try{if(Oy(t))return}catch{}Xe(n,"unauthorized-domain")}function Oy(n){const e=sa(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Dy.test(t))return!1;if(Ny.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Ly=new rs(3e4,6e4);function fu(){const n=nt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function xy(n){return new Promise((e,t)=>{var r,s,i;function a(){fu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{fu(),t(tt(n,"network-request-failed"))},timeout:Ly.get()})}if(!((s=(r=nt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=nt().gapi)===null||i===void 0)&&i.load)a();else{const c=C_("iframefcb");return nt()[c]=()=>{gapi.load?a():t(tt(n,"network-request-failed"))},ld(`${S_()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ws=null,e})}let Ws=null;function My(n){return Ws=Ws||xy(n),Ws}/**
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
 */const Fy=new rs(5e3,15e3),Uy="__/auth/iframe",$y="emulator/auth/iframe",By={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},jy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function qy(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Fa(e,$y):`https://${n.config.authDomain}/${Uy}`,r={apiKey:e.apiKey,appName:n.name,v:tr},s=jy.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ts(r).slice(1)}`}async function zy(n){const e=await My(n),t=nt().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:qy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:By,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=tt(n,"network-request-failed"),c=nt().setTimeout(()=>{i(a)},Fy.get());function u(){nt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const Hy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Wy=500,Gy=600,Ky="_blank",Qy="http://localhost";class pu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Yy(n,e,t,r=Wy,s=Gy){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},Hy),{width:r.toString(),height:s.toString(),top:i,left:a}),d=Fe().toLowerCase();t&&(c=nd(d)?Ky:t),ed(d)&&(e=e||Qy,u.scrollbars="yes");const g=Object.entries(u).reduce((T,[R,N])=>`${T}${R}=${N},`,"");if(y_(d)&&c!=="_self")return Jy(e||"",c),new pu(null);const I=window.open(e||"",c,g);W(I,n,"popup-blocked");try{I.focus()}catch{}return new pu(I)}function Jy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Xy="__/auth/handler",Zy="emulator/auth/handler",ev=encodeURIComponent("fac");async function mu(n,e,t,r,s,i){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:tr,eventId:s};if(e instanceof dd){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",xm(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[g,I]of Object.entries({}))a[g]=I}if(e instanceof ss){const g=e.getScopes().filter(I=>I!=="");g.length>0&&(a.scopes=g.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const g of Object.keys(c))c[g]===void 0&&delete c[g];const u=await n._getAppCheckToken(),d=u?`#${ev}=${encodeURIComponent(u)}`:"";return`${tv(n)}?${ts(c).slice(1)}${d}`}function tv({config:n}){return n.emulator?Fa(n,Zy):`https://${n.authDomain}/${Xy}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jo="webStorageSupport";class nv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=vd,this._completeRedirectFn=Ry,this._overrideRedirectResult=Ty}async _openPopup(e,t,r,s){var i;yt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await mu(e,t,r,sa(),s);return Yy(e,a,qa())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await mu(e,t,r,sa(),s);return iy(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(yt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await zy(e),r=new Cy(e);return t.register("authEvent",s=>(W(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(jo,{type:jo},s=>{var i;const a=(i=s?.[0])===null||i===void 0?void 0:i[jo];a!==void 0&&t(!!a),Xe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Vy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ad()||td()||$a()}}const rv=nv;var gu="@firebase/auth",_u="1.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ov(n){jt(new gt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;W(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:cd(n)},d=new A_(r,s,i,u);return O_(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),jt(new gt("auth-internal",e=>{const t=nr(e.getProvider("auth").getImmediate());return(r=>new sv(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),pt(gu,_u,iv(n)),pt(gu,_u,"esm2017")}/**
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
 */const av=5*60,cv=Uh("authIdTokenMaxAge")||av;let yu=null;const lv=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>cv)return;const s=t?.token;yu!==s&&(yu=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function uv(n=La()){const e=ns(n,"auth");if(e.isInitialized())return e.getImmediate();const t=V_(n,{popupRedirectResolver:rv,persistence:[py,_d,vd]}),r=Uh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=lv(i.toString());X_(t,a,()=>a(t.currentUser)),J_(t,c=>a(c))}}const s=Mh("auth");return s&&L_(t,`http://${s}`),t}function hv(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}b_({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=tt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",hv().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ov("Browser");var vu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ut,Rd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,_){function p(){}p.prototype=_.prototype,y.D=_.prototype,y.prototype=new p,y.prototype.constructor=y,y.C=function(w,E,A){for(var v=Array(arguments.length-2),J=2;J<arguments.length;J++)v[J-2]=arguments[J];return _.prototype[E].apply(w,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,_,p){p||(p=0);var w=Array(16);if(typeof _=="string")for(var E=0;16>E;++E)w[E]=_.charCodeAt(p++)|_.charCodeAt(p++)<<8|_.charCodeAt(p++)<<16|_.charCodeAt(p++)<<24;else for(E=0;16>E;++E)w[E]=_[p++]|_[p++]<<8|_[p++]<<16|_[p++]<<24;_=y.g[0],p=y.g[1],E=y.g[2];var A=y.g[3],v=_+(A^p&(E^A))+w[0]+3614090360&4294967295;_=p+(v<<7&4294967295|v>>>25),v=A+(E^_&(p^E))+w[1]+3905402710&4294967295,A=_+(v<<12&4294967295|v>>>20),v=E+(p^A&(_^p))+w[2]+606105819&4294967295,E=A+(v<<17&4294967295|v>>>15),v=p+(_^E&(A^_))+w[3]+3250441966&4294967295,p=E+(v<<22&4294967295|v>>>10),v=_+(A^p&(E^A))+w[4]+4118548399&4294967295,_=p+(v<<7&4294967295|v>>>25),v=A+(E^_&(p^E))+w[5]+1200080426&4294967295,A=_+(v<<12&4294967295|v>>>20),v=E+(p^A&(_^p))+w[6]+2821735955&4294967295,E=A+(v<<17&4294967295|v>>>15),v=p+(_^E&(A^_))+w[7]+4249261313&4294967295,p=E+(v<<22&4294967295|v>>>10),v=_+(A^p&(E^A))+w[8]+1770035416&4294967295,_=p+(v<<7&4294967295|v>>>25),v=A+(E^_&(p^E))+w[9]+2336552879&4294967295,A=_+(v<<12&4294967295|v>>>20),v=E+(p^A&(_^p))+w[10]+4294925233&4294967295,E=A+(v<<17&4294967295|v>>>15),v=p+(_^E&(A^_))+w[11]+2304563134&4294967295,p=E+(v<<22&4294967295|v>>>10),v=_+(A^p&(E^A))+w[12]+1804603682&4294967295,_=p+(v<<7&4294967295|v>>>25),v=A+(E^_&(p^E))+w[13]+4254626195&4294967295,A=_+(v<<12&4294967295|v>>>20),v=E+(p^A&(_^p))+w[14]+2792965006&4294967295,E=A+(v<<17&4294967295|v>>>15),v=p+(_^E&(A^_))+w[15]+1236535329&4294967295,p=E+(v<<22&4294967295|v>>>10),v=_+(E^A&(p^E))+w[1]+4129170786&4294967295,_=p+(v<<5&4294967295|v>>>27),v=A+(p^E&(_^p))+w[6]+3225465664&4294967295,A=_+(v<<9&4294967295|v>>>23),v=E+(_^p&(A^_))+w[11]+643717713&4294967295,E=A+(v<<14&4294967295|v>>>18),v=p+(A^_&(E^A))+w[0]+3921069994&4294967295,p=E+(v<<20&4294967295|v>>>12),v=_+(E^A&(p^E))+w[5]+3593408605&4294967295,_=p+(v<<5&4294967295|v>>>27),v=A+(p^E&(_^p))+w[10]+38016083&4294967295,A=_+(v<<9&4294967295|v>>>23),v=E+(_^p&(A^_))+w[15]+3634488961&4294967295,E=A+(v<<14&4294967295|v>>>18),v=p+(A^_&(E^A))+w[4]+3889429448&4294967295,p=E+(v<<20&4294967295|v>>>12),v=_+(E^A&(p^E))+w[9]+568446438&4294967295,_=p+(v<<5&4294967295|v>>>27),v=A+(p^E&(_^p))+w[14]+3275163606&4294967295,A=_+(v<<9&4294967295|v>>>23),v=E+(_^p&(A^_))+w[3]+4107603335&4294967295,E=A+(v<<14&4294967295|v>>>18),v=p+(A^_&(E^A))+w[8]+1163531501&4294967295,p=E+(v<<20&4294967295|v>>>12),v=_+(E^A&(p^E))+w[13]+2850285829&4294967295,_=p+(v<<5&4294967295|v>>>27),v=A+(p^E&(_^p))+w[2]+4243563512&4294967295,A=_+(v<<9&4294967295|v>>>23),v=E+(_^p&(A^_))+w[7]+1735328473&4294967295,E=A+(v<<14&4294967295|v>>>18),v=p+(A^_&(E^A))+w[12]+2368359562&4294967295,p=E+(v<<20&4294967295|v>>>12),v=_+(p^E^A)+w[5]+4294588738&4294967295,_=p+(v<<4&4294967295|v>>>28),v=A+(_^p^E)+w[8]+2272392833&4294967295,A=_+(v<<11&4294967295|v>>>21),v=E+(A^_^p)+w[11]+1839030562&4294967295,E=A+(v<<16&4294967295|v>>>16),v=p+(E^A^_)+w[14]+4259657740&4294967295,p=E+(v<<23&4294967295|v>>>9),v=_+(p^E^A)+w[1]+2763975236&4294967295,_=p+(v<<4&4294967295|v>>>28),v=A+(_^p^E)+w[4]+1272893353&4294967295,A=_+(v<<11&4294967295|v>>>21),v=E+(A^_^p)+w[7]+4139469664&4294967295,E=A+(v<<16&4294967295|v>>>16),v=p+(E^A^_)+w[10]+3200236656&4294967295,p=E+(v<<23&4294967295|v>>>9),v=_+(p^E^A)+w[13]+681279174&4294967295,_=p+(v<<4&4294967295|v>>>28),v=A+(_^p^E)+w[0]+3936430074&4294967295,A=_+(v<<11&4294967295|v>>>21),v=E+(A^_^p)+w[3]+3572445317&4294967295,E=A+(v<<16&4294967295|v>>>16),v=p+(E^A^_)+w[6]+76029189&4294967295,p=E+(v<<23&4294967295|v>>>9),v=_+(p^E^A)+w[9]+3654602809&4294967295,_=p+(v<<4&4294967295|v>>>28),v=A+(_^p^E)+w[12]+3873151461&4294967295,A=_+(v<<11&4294967295|v>>>21),v=E+(A^_^p)+w[15]+530742520&4294967295,E=A+(v<<16&4294967295|v>>>16),v=p+(E^A^_)+w[2]+3299628645&4294967295,p=E+(v<<23&4294967295|v>>>9),v=_+(E^(p|~A))+w[0]+4096336452&4294967295,_=p+(v<<6&4294967295|v>>>26),v=A+(p^(_|~E))+w[7]+1126891415&4294967295,A=_+(v<<10&4294967295|v>>>22),v=E+(_^(A|~p))+w[14]+2878612391&4294967295,E=A+(v<<15&4294967295|v>>>17),v=p+(A^(E|~_))+w[5]+4237533241&4294967295,p=E+(v<<21&4294967295|v>>>11),v=_+(E^(p|~A))+w[12]+1700485571&4294967295,_=p+(v<<6&4294967295|v>>>26),v=A+(p^(_|~E))+w[3]+2399980690&4294967295,A=_+(v<<10&4294967295|v>>>22),v=E+(_^(A|~p))+w[10]+4293915773&4294967295,E=A+(v<<15&4294967295|v>>>17),v=p+(A^(E|~_))+w[1]+2240044497&4294967295,p=E+(v<<21&4294967295|v>>>11),v=_+(E^(p|~A))+w[8]+1873313359&4294967295,_=p+(v<<6&4294967295|v>>>26),v=A+(p^(_|~E))+w[15]+4264355552&4294967295,A=_+(v<<10&4294967295|v>>>22),v=E+(_^(A|~p))+w[6]+2734768916&4294967295,E=A+(v<<15&4294967295|v>>>17),v=p+(A^(E|~_))+w[13]+1309151649&4294967295,p=E+(v<<21&4294967295|v>>>11),v=_+(E^(p|~A))+w[4]+4149444226&4294967295,_=p+(v<<6&4294967295|v>>>26),v=A+(p^(_|~E))+w[11]+3174756917&4294967295,A=_+(v<<10&4294967295|v>>>22),v=E+(_^(A|~p))+w[2]+718787259&4294967295,E=A+(v<<15&4294967295|v>>>17),v=p+(A^(E|~_))+w[9]+3951481745&4294967295,y.g[0]=y.g[0]+_&4294967295,y.g[1]=y.g[1]+(E+(v<<21&4294967295|v>>>11))&4294967295,y.g[2]=y.g[2]+E&4294967295,y.g[3]=y.g[3]+A&4294967295}r.prototype.u=function(y,_){_===void 0&&(_=y.length);for(var p=_-this.blockSize,w=this.B,E=this.h,A=0;A<_;){if(E==0)for(;A<=p;)s(this,y,A),A+=this.blockSize;if(typeof y=="string"){for(;A<_;)if(w[E++]=y.charCodeAt(A++),E==this.blockSize){s(this,w),E=0;break}}else for(;A<_;)if(w[E++]=y[A++],E==this.blockSize){s(this,w),E=0;break}}this.h=E,this.o+=_},r.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var _=1;_<y.length-8;++_)y[_]=0;var p=8*this.o;for(_=y.length-8;_<y.length;++_)y[_]=p&255,p/=256;for(this.u(y),y=Array(16),_=p=0;4>_;++_)for(var w=0;32>w;w+=8)y[p++]=this.g[_]>>>w&255;return y};function i(y,_){var p=c;return Object.prototype.hasOwnProperty.call(p,y)?p[y]:p[y]=_(y)}function a(y,_){this.h=_;for(var p=[],w=!0,E=y.length-1;0<=E;E--){var A=y[E]|0;w&&A==_||(p[E]=A,w=!1)}this.g=p}var c={};function u(y){return-128<=y&&128>y?i(y,function(_){return new a([_|0],0>_?-1:0)}):new a([y|0],0>y?-1:0)}function d(y){if(isNaN(y)||!isFinite(y))return I;if(0>y)return P(d(-y));for(var _=[],p=1,w=0;y>=p;w++)_[w]=y/p|0,p*=4294967296;return new a(_,0)}function g(y,_){if(y.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(y.charAt(0)=="-")return P(g(y.substring(1),_));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var p=d(Math.pow(_,8)),w=I,E=0;E<y.length;E+=8){var A=Math.min(8,y.length-E),v=parseInt(y.substring(E,E+A),_);8>A?(A=d(Math.pow(_,A)),w=w.j(A).add(d(v))):(w=w.j(p),w=w.add(d(v)))}return w}var I=u(0),T=u(1),R=u(16777216);n=a.prototype,n.m=function(){if(C(this))return-P(this).m();for(var y=0,_=1,p=0;p<this.g.length;p++){var w=this.i(p);y+=(0<=w?w:4294967296+w)*_,_*=4294967296}return y},n.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(N(this))return"0";if(C(this))return"-"+P(this).toString(y);for(var _=d(Math.pow(y,6)),p=this,w="";;){var E=H(p,_).g;p=B(p,E.j(_));var A=((0<p.g.length?p.g[0]:p.h)>>>0).toString(y);if(p=E,N(p))return A+w;for(;6>A.length;)A="0"+A;w=A+w}},n.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function N(y){if(y.h!=0)return!1;for(var _=0;_<y.g.length;_++)if(y.g[_]!=0)return!1;return!0}function C(y){return y.h==-1}n.l=function(y){return y=B(this,y),C(y)?-1:N(y)?0:1};function P(y){for(var _=y.g.length,p=[],w=0;w<_;w++)p[w]=~y.g[w];return new a(p,~y.h).add(T)}n.abs=function(){return C(this)?P(this):this},n.add=function(y){for(var _=Math.max(this.g.length,y.g.length),p=[],w=0,E=0;E<=_;E++){var A=w+(this.i(E)&65535)+(y.i(E)&65535),v=(A>>>16)+(this.i(E)>>>16)+(y.i(E)>>>16);w=v>>>16,A&=65535,v&=65535,p[E]=v<<16|A}return new a(p,p[p.length-1]&-2147483648?-1:0)};function B(y,_){return y.add(P(_))}n.j=function(y){if(N(this)||N(y))return I;if(C(this))return C(y)?P(this).j(P(y)):P(P(this).j(y));if(C(y))return P(this.j(P(y)));if(0>this.l(R)&&0>y.l(R))return d(this.m()*y.m());for(var _=this.g.length+y.g.length,p=[],w=0;w<2*_;w++)p[w]=0;for(w=0;w<this.g.length;w++)for(var E=0;E<y.g.length;E++){var A=this.i(w)>>>16,v=this.i(w)&65535,J=y.i(E)>>>16,ve=y.i(E)&65535;p[2*w+2*E]+=v*ve,L(p,2*w+2*E),p[2*w+2*E+1]+=A*ve,L(p,2*w+2*E+1),p[2*w+2*E+1]+=v*J,L(p,2*w+2*E+1),p[2*w+2*E+2]+=A*J,L(p,2*w+2*E+2)}for(w=0;w<_;w++)p[w]=p[2*w+1]<<16|p[2*w];for(w=_;w<2*_;w++)p[w]=0;return new a(p,0)};function L(y,_){for(;(y[_]&65535)!=y[_];)y[_+1]+=y[_]>>>16,y[_]&=65535,_++}function $(y,_){this.g=y,this.h=_}function H(y,_){if(N(_))throw Error("division by zero");if(N(y))return new $(I,I);if(C(y))return _=H(P(y),_),new $(P(_.g),P(_.h));if(C(_))return _=H(y,P(_)),new $(P(_.g),_.h);if(30<y.g.length){if(C(y)||C(_))throw Error("slowDivide_ only works with positive integers.");for(var p=T,w=_;0>=w.l(y);)p=O(p),w=O(w);var E=F(p,1),A=F(w,1);for(w=F(w,2),p=F(p,2);!N(w);){var v=A.add(w);0>=v.l(y)&&(E=E.add(p),A=v),w=F(w,1),p=F(p,1)}return _=B(y,E.j(_)),new $(E,_)}for(E=I;0<=y.l(_);){for(p=Math.max(1,Math.floor(y.m()/_.m())),w=Math.ceil(Math.log(p)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),A=d(p),v=A.j(_);C(v)||0<v.l(y);)p-=w,A=d(p),v=A.j(_);N(A)&&(A=T),E=E.add(A),y=B(y,v)}return new $(E,y)}n.A=function(y){return H(this,y).h},n.and=function(y){for(var _=Math.max(this.g.length,y.g.length),p=[],w=0;w<_;w++)p[w]=this.i(w)&y.i(w);return new a(p,this.h&y.h)},n.or=function(y){for(var _=Math.max(this.g.length,y.g.length),p=[],w=0;w<_;w++)p[w]=this.i(w)|y.i(w);return new a(p,this.h|y.h)},n.xor=function(y){for(var _=Math.max(this.g.length,y.g.length),p=[],w=0;w<_;w++)p[w]=this.i(w)^y.i(w);return new a(p,this.h^y.h)};function O(y){for(var _=y.g.length+1,p=[],w=0;w<_;w++)p[w]=y.i(w)<<1|y.i(w-1)>>>31;return new a(p,y.h)}function F(y,_){var p=_>>5;_%=32;for(var w=y.g.length-p,E=[],A=0;A<w;A++)E[A]=0<_?y.i(A+p)>>>_|y.i(A+p+1)<<32-_:y.i(A+p);return new a(E,y.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Rd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=g,Ut=a}).apply(typeof vu<"u"?vu:typeof self<"u"?self:typeof window<"u"?window:{});var Ds=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Sd,br,Cd,Gs,aa,Pd,kd,Nd;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,h){return o==Array.prototype||o==Object.prototype||(o[l]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ds=="object"&&Ds];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var h=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var b=o[m];if(!(b in h))break e;h=h[b]}o=o[o.length-1],m=h[o],l=l(m),l!=m&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}function i(o,l){o instanceof String&&(o+="");var h=0,m=!1,b={next:function(){if(!m&&h<o.length){var S=h++;return{value:l(S,o[S]),done:!1}}return m=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}s("Array.prototype.values",function(o){return o||function(){return i(this,function(l,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function d(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function g(o,l,h){return o.call.apply(o.bind,arguments)}function I(o,l,h){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,m),o.apply(l,b)}}return function(){return o.apply(l,arguments)}}function T(o,l,h){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?g:I,T.apply(null,arguments)}function R(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function N(o,l){function h(){}h.prototype=l.prototype,o.aa=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(m,b,S){for(var x=Array(arguments.length-2),le=2;le<arguments.length;le++)x[le-2]=arguments[le];return l.prototype[b].apply(m,x)}}function C(o){const l=o.length;if(0<l){const h=Array(l);for(let m=0;m<l;m++)h[m]=o[m];return h}return[]}function P(o,l){for(let h=1;h<arguments.length;h++){const m=arguments[h];if(u(m)){const b=o.length||0,S=m.length||0;o.length=b+S;for(let x=0;x<S;x++)o[b+x]=m[x]}else o.push(m)}}class B{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function L(o){return/^[\s\xa0]*$/.test(o)}function $(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function H(o){return H[" "](o),o}H[" "]=function(){};var O=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function F(o,l,h){for(const m in o)l.call(h,o[m],m,o)}function y(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function _(o){const l={};for(const h in o)l[h]=o[h];return l}const p="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,l){let h,m;for(let b=1;b<arguments.length;b++){m=arguments[b];for(h in m)o[h]=m[h];for(let S=0;S<p.length;S++)h=p[S],Object.prototype.hasOwnProperty.call(m,h)&&(o[h]=m[h])}}function E(o){var l=1;o=o.split(":");const h=[];for(;0<l&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function A(o){c.setTimeout(()=>{throw o},0)}function v(){var o=X;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class J{constructor(){this.h=this.g=null}add(l,h){const m=ve.get();m.set(l,h),this.h?this.h.next=m:this.g=m,this.h=m}}var ve=new B(()=>new je,o=>o.reset());class je{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let V,M=!1,X=new J,pe=()=>{const o=c.Promise.resolve(void 0);V=()=>{o.then(ne)}};var ne=()=>{for(var o;o=v();){try{o.h.call(o.g)}catch(h){A(h)}var l=ve;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}M=!1};function ce(){this.s=this.s,this.C=this.C}ce.prototype.s=!1,ce.prototype.ma=function(){this.s||(this.s=!0,this.N())},ce.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ae(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}ae.prototype.h=function(){this.defaultPrevented=!0};var uo=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};c.addEventListener("test",h,l),c.removeEventListener("test",h,l)}catch{}return o}();function At(o,l){if(ae.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(O){e:{try{H(l.nodeName);var b=!0;break e}catch{}b=!1}b||(l=null)}}else h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement);this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:ho[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&At.aa.h.call(this)}}N(At,ae);var ho={2:"touch",3:"pen",4:"mouse"};At.prototype.h=function(){At.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var bt="closure_listenable_"+(1e6*Math.random()|0),In=0;function lr(o,l,h,m,b){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!m,this.ha=b,this.key=++In,this.da=this.fa=!1}function fs(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ps(o){this.src=o,this.g={},this.h=0}ps.prototype.add=function(o,l,h,m,b){var S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);var x=po(o,l,m,b);return-1<x?(l=o[x],h||(l.fa=!1)):(l=new lr(l,this.src,S,!!m,b),l.fa=h,o.push(l)),l};function fo(o,l){var h=l.type;if(h in o.g){var m=o.g[h],b=Array.prototype.indexOf.call(m,l,void 0),S;(S=0<=b)&&Array.prototype.splice.call(m,b,1),S&&(fs(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function po(o,l,h,m){for(var b=0;b<o.length;++b){var S=o[b];if(!S.da&&S.listener==l&&S.capture==!!h&&S.ha==m)return b}return-1}var mo="closure_lm_"+(1e6*Math.random()|0),go={};function zc(o,l,h,m,b){if(Array.isArray(l)){for(var S=0;S<l.length;S++)zc(o,l[S],h,m,b);return null}return h=Gc(h),o&&o[bt]?o.K(l,h,d(m)?!!m.capture:!1,b):Up(o,l,h,!1,m,b)}function Up(o,l,h,m,b,S){if(!l)throw Error("Invalid event type");var x=d(b)?!!b.capture:!!b,le=yo(o);if(le||(o[mo]=le=new ps(o)),h=le.add(l,h,m,x,S),h.proxy)return h;if(m=$p(),h.proxy=m,m.src=o,m.listener=h,o.addEventListener)uo||(b=x),b===void 0&&(b=!1),o.addEventListener(l.toString(),m,b);else if(o.attachEvent)o.attachEvent(Wc(l.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function $p(){function o(h){return l.call(o.src,o.listener,h)}const l=Bp;return o}function Hc(o,l,h,m,b){if(Array.isArray(l))for(var S=0;S<l.length;S++)Hc(o,l[S],h,m,b);else m=d(m)?!!m.capture:!!m,h=Gc(h),o&&o[bt]?(o=o.i,l=String(l).toString(),l in o.g&&(S=o.g[l],h=po(S,h,m,b),-1<h&&(fs(S[h]),Array.prototype.splice.call(S,h,1),S.length==0&&(delete o.g[l],o.h--)))):o&&(o=yo(o))&&(l=o.g[l.toString()],o=-1,l&&(o=po(l,h,m,b)),(h=-1<o?l[o]:null)&&_o(h))}function _o(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[bt])fo(l.i,o);else{var h=o.type,m=o.proxy;l.removeEventListener?l.removeEventListener(h,m,o.capture):l.detachEvent?l.detachEvent(Wc(h),m):l.addListener&&l.removeListener&&l.removeListener(m),(h=yo(l))?(fo(h,o),h.h==0&&(h.src=null,l[mo]=null)):fs(o)}}}function Wc(o){return o in go?go[o]:go[o]="on"+o}function Bp(o,l){if(o.da)o=!0;else{l=new At(l,this);var h=o.listener,m=o.ha||o.src;o.fa&&_o(o),o=h.call(m,l)}return o}function yo(o){return o=o[mo],o instanceof ps?o:null}var vo="__closure_events_fn_"+(1e9*Math.random()>>>0);function Gc(o){return typeof o=="function"?o:(o[vo]||(o[vo]=function(l){return o.handleEvent(l)}),o[vo])}function De(){ce.call(this),this.i=new ps(this),this.M=this,this.F=null}N(De,ce),De.prototype[bt]=!0,De.prototype.removeEventListener=function(o,l,h,m){Hc(this,o,l,h,m)};function Ue(o,l){var h,m=o.F;if(m)for(h=[];m;m=m.F)h.push(m);if(o=o.M,m=l.type||l,typeof l=="string")l=new ae(l,o);else if(l instanceof ae)l.target=l.target||o;else{var b=l;l=new ae(m,o),w(l,b)}if(b=!0,h)for(var S=h.length-1;0<=S;S--){var x=l.g=h[S];b=ms(x,m,!0,l)&&b}if(x=l.g=o,b=ms(x,m,!0,l)&&b,b=ms(x,m,!1,l)&&b,h)for(S=0;S<h.length;S++)x=l.g=h[S],b=ms(x,m,!1,l)&&b}De.prototype.N=function(){if(De.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var h=o.g[l],m=0;m<h.length;m++)fs(h[m]);delete o.g[l],o.h--}}this.F=null},De.prototype.K=function(o,l,h,m){return this.i.add(String(o),l,!1,h,m)},De.prototype.L=function(o,l,h,m){return this.i.add(String(o),l,!0,h,m)};function ms(o,l,h,m){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var b=!0,S=0;S<l.length;++S){var x=l[S];if(x&&!x.da&&x.capture==h){var le=x.listener,Se=x.ha||x.src;x.fa&&fo(o.i,x),b=le.call(Se,m)!==!1&&b}}return b&&!m.defaultPrevented}function Kc(o,l,h){if(typeof o=="function")h&&(o=T(o,h));else if(o&&typeof o.handleEvent=="function")o=T(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(o,l||0)}function Qc(o){o.g=Kc(()=>{o.g=null,o.i&&(o.i=!1,Qc(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class jp extends ce{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Qc(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ur(o){ce.call(this),this.h=o,this.g={}}N(ur,ce);var Yc=[];function Jc(o){F(o.g,function(l,h){this.g.hasOwnProperty(h)&&_o(l)},o),o.g={}}ur.prototype.N=function(){ur.aa.N.call(this),Jc(this)},ur.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var wo=c.JSON.stringify,qp=c.JSON.parse,zp=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function Eo(){}Eo.prototype.h=null;function Xc(o){return o.h||(o.h=o.i())}function Zc(){}var hr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Io(){ae.call(this,"d")}N(Io,ae);function To(){ae.call(this,"c")}N(To,ae);var Zt={},el=null;function gs(){return el=el||new De}Zt.La="serverreachability";function tl(o){ae.call(this,Zt.La,o)}N(tl,ae);function dr(o){const l=gs();Ue(l,new tl(l))}Zt.STAT_EVENT="statevent";function nl(o,l){ae.call(this,Zt.STAT_EVENT,o),this.stat=l}N(nl,ae);function $e(o){const l=gs();Ue(l,new nl(l,o))}Zt.Ma="timingevent";function rl(o,l){ae.call(this,Zt.Ma,o),this.size=l}N(rl,ae);function fr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},l)}function pr(){this.g=!0}pr.prototype.xa=function(){this.g=!1};function Hp(o,l,h,m,b,S){o.info(function(){if(o.g)if(S)for(var x="",le=S.split("&"),Se=0;Se<le.length;Se++){var ie=le[Se].split("=");if(1<ie.length){var Ve=ie[0];ie=ie[1];var Oe=Ve.split("_");x=2<=Oe.length&&Oe[1]=="type"?x+(Ve+"="+ie+"&"):x+(Ve+"=redacted&")}}else x=null;else x=S;return"XMLHTTP REQ ("+m+") [attempt "+b+"]: "+l+`
`+h+`
`+x})}function Wp(o,l,h,m,b,S,x){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+b+"]: "+l+`
`+h+`
`+S+" "+x})}function Tn(o,l,h,m){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Kp(o,h)+(m?" "+m:"")})}function Gp(o,l){o.info(function(){return"TIMEOUT: "+l})}pr.prototype.info=function(){};function Kp(o,l){if(!o.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var m=h[o];if(!(2>m.length)){var b=m[1];if(Array.isArray(b)&&!(1>b.length)){var S=b[0];if(S!="noop"&&S!="stop"&&S!="close")for(var x=1;x<b.length;x++)b[x]=""}}}}return wo(h)}catch{return l}}var _s={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},sl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ao;function ys(){}N(ys,Eo),ys.prototype.g=function(){return new XMLHttpRequest},ys.prototype.i=function(){return{}},Ao=new ys;function Rt(o,l,h,m){this.j=o,this.i=l,this.l=h,this.R=m||1,this.U=new ur(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new il}function il(){this.i=null,this.g="",this.h=!1}var ol={},bo={};function Ro(o,l,h){o.L=1,o.v=Is(lt(l)),o.m=h,o.P=!0,al(o,null)}function al(o,l){o.F=Date.now(),vs(o),o.A=lt(o.v);var h=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),El(h.i,"t",m),o.C=0,h=o.j.J,o.h=new il,o.g=Ul(o.j,h?l:null,!o.m),0<o.O&&(o.M=new jp(T(o.Y,o,o.g),o.O)),l=o.U,h=o.g,m=o.ca;var b="readystatechange";Array.isArray(b)||(b&&(Yc[0]=b.toString()),b=Yc);for(var S=0;S<b.length;S++){var x=zc(h,b[S],m||l.handleEvent,!1,l.h||l);if(!x)break;l.g[x.key]=x}l=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),dr(),Hp(o.i,o.u,o.A,o.l,o.R,o.m)}Rt.prototype.ca=function(o){o=o.target;const l=this.M;l&&ut(o)==3?l.j():this.Y(o)},Rt.prototype.Y=function(o){try{if(o==this.g)e:{const Oe=ut(this.g);var l=this.g.Ba();const Rn=this.g.Z();if(!(3>Oe)&&(Oe!=3||this.g&&(this.h.h||this.g.oa()||Cl(this.g)))){this.J||Oe!=4||l==7||(l==8||0>=Rn?dr(3):dr(2)),So(this);var h=this.g.Z();this.X=h;t:if(cl(this)){var m=Cl(this.g);o="";var b=m.length,S=ut(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){en(this),mr(this);var x="";break t}this.h.i=new c.TextDecoder}for(l=0;l<b;l++)this.h.h=!0,o+=this.h.i.decode(m[l],{stream:!(S&&l==b-1)});m.length=0,this.h.g+=o,this.C=0,x=this.h.g}else x=this.g.oa();if(this.o=h==200,Wp(this.i,this.u,this.A,this.l,this.R,Oe,h),this.o){if(this.T&&!this.K){t:{if(this.g){var le,Se=this.g;if((le=Se.g?Se.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(le)){var ie=le;break t}}ie=null}if(h=ie)Tn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Co(this,h);else{this.o=!1,this.s=3,$e(12),en(this),mr(this);break e}}if(this.P){h=!0;let Qe;for(;!this.J&&this.C<x.length;)if(Qe=Qp(this,x),Qe==bo){Oe==4&&(this.s=4,$e(14),h=!1),Tn(this.i,this.l,null,"[Incomplete Response]");break}else if(Qe==ol){this.s=4,$e(15),Tn(this.i,this.l,x,"[Invalid Chunk]"),h=!1;break}else Tn(this.i,this.l,Qe,null),Co(this,Qe);if(cl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Oe!=4||x.length!=0||this.h.h||(this.s=1,$e(16),h=!1),this.o=this.o&&h,!h)Tn(this.i,this.l,x,"[Invalid Chunked Response]"),en(this),mr(this);else if(0<x.length&&!this.W){this.W=!0;var Ve=this.j;Ve.g==this&&Ve.ba&&!Ve.M&&(Ve.j.info("Great, no buffering proxy detected. Bytes received: "+x.length),Oo(Ve),Ve.M=!0,$e(11))}}else Tn(this.i,this.l,x,null),Co(this,x);Oe==4&&en(this),this.o&&!this.J&&(Oe==4?Ll(this.j,this):(this.o=!1,vs(this)))}else dm(this.g),h==400&&0<x.indexOf("Unknown SID")?(this.s=3,$e(12)):(this.s=0,$e(13)),en(this),mr(this)}}}catch{}finally{}};function cl(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Qp(o,l){var h=o.C,m=l.indexOf(`
`,h);return m==-1?bo:(h=Number(l.substring(h,m)),isNaN(h)?ol:(m+=1,m+h>l.length?bo:(l=l.slice(m,m+h),o.C=m+h,l)))}Rt.prototype.cancel=function(){this.J=!0,en(this)};function vs(o){o.S=Date.now()+o.I,ll(o,o.I)}function ll(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=fr(T(o.ba,o),l)}function So(o){o.B&&(c.clearTimeout(o.B),o.B=null)}Rt.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Gp(this.i,this.A),this.L!=2&&(dr(),$e(17)),en(this),this.s=2,mr(this)):ll(this,this.S-o)};function mr(o){o.j.G==0||o.J||Ll(o.j,o)}function en(o){So(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,Jc(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function Co(o,l){try{var h=o.j;if(h.G!=0&&(h.g==o||Po(h.h,o))){if(!o.K&&Po(h.h,o)&&h.G==3){try{var m=h.Da.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var b=m;if(b[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Cs(h),Rs(h);else break e;Vo(h),$e(18)}}else h.za=b[1],0<h.za-h.T&&37500>b[2]&&h.F&&h.v==0&&!h.C&&(h.C=fr(T(h.Za,h),6e3));if(1>=dl(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else nn(h,11)}else if((o.K||h.g==o)&&Cs(h),!L(l))for(b=h.Da.g.parse(l),l=0;l<b.length;l++){let ie=b[l];if(h.T=ie[0],ie=ie[1],h.G==2)if(ie[0]=="c"){h.K=ie[1],h.ia=ie[2];const Ve=ie[3];Ve!=null&&(h.la=Ve,h.j.info("VER="+h.la));const Oe=ie[4];Oe!=null&&(h.Aa=Oe,h.j.info("SVER="+h.Aa));const Rn=ie[5];Rn!=null&&typeof Rn=="number"&&0<Rn&&(m=1.5*Rn,h.L=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;const Qe=o.g;if(Qe){const ks=Qe.g?Qe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ks){var S=m.h;S.g||ks.indexOf("spdy")==-1&&ks.indexOf("quic")==-1&&ks.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(ko(S,S.h),S.h=null))}if(m.D){const Lo=Qe.g?Qe.g.getResponseHeader("X-HTTP-Session-Id"):null;Lo&&(m.ya=Lo,fe(m.I,m.D,Lo))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),m=h;var x=o;if(m.qa=Fl(m,m.J?m.ia:null,m.W),x.K){fl(m.h,x);var le=x,Se=m.L;Se&&(le.I=Se),le.B&&(So(le),vs(le)),m.g=x}else Vl(m);0<h.i.length&&Ss(h)}else ie[0]!="stop"&&ie[0]!="close"||nn(h,7);else h.G==3&&(ie[0]=="stop"||ie[0]=="close"?ie[0]=="stop"?nn(h,7):Do(h):ie[0]!="noop"&&h.l&&h.l.ta(ie),h.v=0)}}dr(4)}catch{}}var Yp=class{constructor(o,l){this.g=o,this.map=l}};function ul(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function hl(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function dl(o){return o.h?1:o.g?o.g.size:0}function Po(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function ko(o,l){o.g?o.g.add(l):o.h=l}function fl(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}ul.prototype.cancel=function(){if(this.i=pl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function pl(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.D);return l}return C(o.i)}function Jp(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var l=[],h=o.length,m=0;m<h;m++)l.push(o[m]);return l}l=[],h=0;for(m in o)l[h++]=o[m];return l}function Xp(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var l=[];o=o.length;for(var h=0;h<o;h++)l.push(h);return l}l=[],h=0;for(const m in o)l[h++]=m;return l}}}function ml(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var h=Xp(o),m=Jp(o),b=m.length,S=0;S<b;S++)l.call(void 0,m[S],h&&h[S],o)}var gl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Zp(o,l){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var m=o[h].indexOf("="),b=null;if(0<=m){var S=o[h].substring(0,m);b=o[h].substring(m+1)}else S=o[h];l(S,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function tn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof tn){this.h=o.h,ws(this,o.j),this.o=o.o,this.g=o.g,Es(this,o.s),this.l=o.l;var l=o.i,h=new yr;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),_l(this,h),this.m=o.m}else o&&(l=String(o).match(gl))?(this.h=!1,ws(this,l[1]||"",!0),this.o=gr(l[2]||""),this.g=gr(l[3]||"",!0),Es(this,l[4]),this.l=gr(l[5]||"",!0),_l(this,l[6]||"",!0),this.m=gr(l[7]||"")):(this.h=!1,this.i=new yr(null,this.h))}tn.prototype.toString=function(){var o=[],l=this.j;l&&o.push(_r(l,yl,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(_r(l,yl,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(_r(h,h.charAt(0)=="/"?nm:tm,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",_r(h,sm)),o.join("")};function lt(o){return new tn(o)}function ws(o,l,h){o.j=h?gr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Es(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function _l(o,l,h){l instanceof yr?(o.i=l,im(o.i,o.h)):(h||(l=_r(l,rm)),o.i=new yr(l,o.h))}function fe(o,l,h){o.i.set(l,h)}function Is(o){return fe(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function gr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function _r(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,em),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function em(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var yl=/[#\/\?@]/g,tm=/[#\?:]/g,nm=/[#\?]/g,rm=/[#\?@]/g,sm=/#/g;function yr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function St(o){o.g||(o.g=new Map,o.h=0,o.i&&Zp(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=yr.prototype,n.add=function(o,l){St(this),this.i=null,o=An(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function vl(o,l){St(o),l=An(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function wl(o,l){return St(o),l=An(o,l),o.g.has(l)}n.forEach=function(o,l){St(this),this.g.forEach(function(h,m){h.forEach(function(b){o.call(l,b,m,this)},this)},this)},n.na=function(){St(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let m=0;m<l.length;m++){const b=o[m];for(let S=0;S<b.length;S++)h.push(l[m])}return h},n.V=function(o){St(this);let l=[];if(typeof o=="string")wl(this,o)&&(l=l.concat(this.g.get(An(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)l=l.concat(o[h])}return l},n.set=function(o,l){return St(this),this.i=null,o=An(this,o),wl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function El(o,l,h){vl(o,l),0<h.length&&(o.i=null,o.g.set(An(o,l),C(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var m=l[h];const S=encodeURIComponent(String(m)),x=this.V(m);for(m=0;m<x.length;m++){var b=S;x[m]!==""&&(b+="="+encodeURIComponent(String(x[m]))),o.push(b)}}return this.i=o.join("&")};function An(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function im(o,l){l&&!o.j&&(St(o),o.i=null,o.g.forEach(function(h,m){var b=m.toLowerCase();m!=b&&(vl(this,m),El(this,b,h))},o)),o.j=l}function om(o,l){const h=new pr;if(c.Image){const m=new Image;m.onload=R(Ct,h,"TestLoadImage: loaded",!0,l,m),m.onerror=R(Ct,h,"TestLoadImage: error",!1,l,m),m.onabort=R(Ct,h,"TestLoadImage: abort",!1,l,m),m.ontimeout=R(Ct,h,"TestLoadImage: timeout",!1,l,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else l(!1)}function am(o,l){const h=new pr,m=new AbortController,b=setTimeout(()=>{m.abort(),Ct(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:m.signal}).then(S=>{clearTimeout(b),S.ok?Ct(h,"TestPingServer: ok",!0,l):Ct(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),Ct(h,"TestPingServer: error",!1,l)})}function Ct(o,l,h,m,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),m(h)}catch{}}function cm(){this.g=new zp}function lm(o,l,h){const m=h||"";try{ml(o,function(b,S){let x=b;d(b)&&(x=wo(b)),l.push(m+S+"="+encodeURIComponent(x))})}catch(b){throw l.push(m+"type="+encodeURIComponent("_badmap")),b}}function Ts(o){this.l=o.Ub||null,this.j=o.eb||!1}N(Ts,Eo),Ts.prototype.g=function(){return new As(this.l,this.j)},Ts.prototype.i=function(o){return function(){return o}}({});function As(o,l){De.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}N(As,De),n=As.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,wr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,vr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,wr(this)),this.g&&(this.readyState=3,wr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Il(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Il(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?vr(this):wr(this),this.readyState==3&&Il(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,vr(this))},n.Qa=function(o){this.g&&(this.response=o,vr(this))},n.ga=function(){this.g&&vr(this)};function vr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,wr(o)}n.setRequestHeader=function(o,l){this.u.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function wr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(As.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Tl(o){let l="";return F(o,function(h,m){l+=m,l+=":",l+=h,l+=`\r
`}),l}function No(o,l,h){e:{for(m in h){var m=!1;break e}m=!0}m||(h=Tl(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):fe(o,l,h))}function ge(o){De.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}N(ge,De);var um=/^https?$/i,hm=["POST","PUT"];n=ge.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,l,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ao.g(),this.v=this.o?Xc(this.o):Xc(Ao),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(S){Al(this,S);return}if(o=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var b in m)h.set(b,m[b]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const S of m.keys())h.set(S,m.get(S));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),b=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(hm,l,void 0))||m||b||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,x]of h)this.g.setRequestHeader(S,x);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Sl(this),this.u=!0,this.g.send(o),this.u=!1}catch(S){Al(this,S)}};function Al(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,bl(o),bs(o)}function bl(o){o.A||(o.A=!0,Ue(o,"complete"),Ue(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ue(this,"complete"),Ue(this,"abort"),bs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),bs(this,!0)),ge.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Rl(this):this.bb())},n.bb=function(){Rl(this)};function Rl(o){if(o.h&&typeof a<"u"&&(!o.v[1]||ut(o)!=4||o.Z()!=2)){if(o.u&&ut(o)==4)Kc(o.Ea,0,o);else if(Ue(o,"readystatechange"),ut(o)==4){o.h=!1;try{const x=o.Z();e:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var m;if(m=x===0){var b=String(o.D).match(gl)[1]||null;!b&&c.self&&c.self.location&&(b=c.self.location.protocol.slice(0,-1)),m=!um.test(b?b.toLowerCase():"")}h=m}if(h)Ue(o,"complete"),Ue(o,"success");else{o.m=6;try{var S=2<ut(o)?o.g.statusText:""}catch{S=""}o.l=S+" ["+o.Z()+"]",bl(o)}}finally{bs(o)}}}}function bs(o,l){if(o.g){Sl(o);const h=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Ue(o,"ready");try{h.onreadystatechange=m}catch{}}}function Sl(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function ut(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<ut(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),qp(l)}};function Cl(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function dm(o){const l={};o=(o.g&&2<=ut(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(L(o[m]))continue;var h=E(o[m]);const b=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const S=l[b]||[];l[b]=S,S.push(h)}y(l,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Er(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function Pl(o){this.Aa=0,this.i=[],this.j=new pr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Er("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Er("baseRetryDelayMs",5e3,o),this.cb=Er("retryDelaySeedMs",1e4,o),this.Wa=Er("forwardChannelMaxRetries",2,o),this.wa=Er("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new ul(o&&o.concurrentRequestLimit),this.Da=new cm,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Pl.prototype,n.la=8,n.G=1,n.connect=function(o,l,h,m){$e(0),this.W=o,this.H=l||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.I=Fl(this,null,this.W),Ss(this)};function Do(o){if(kl(o),o.G==3){var l=o.U++,h=lt(o.I);if(fe(h,"SID",o.K),fe(h,"RID",l),fe(h,"TYPE","terminate"),Ir(o,h),l=new Rt(o,o.j,l),l.L=2,l.v=Is(lt(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=l.v,h=!0),h||(l.g=Ul(l.j,null),l.g.ea(l.v)),l.F=Date.now(),vs(l)}Ml(o)}function Rs(o){o.g&&(Oo(o),o.g.cancel(),o.g=null)}function kl(o){Rs(o),o.u&&(c.clearTimeout(o.u),o.u=null),Cs(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Ss(o){if(!hl(o.h)&&!o.s){o.s=!0;var l=o.Ga;V||pe(),M||(V(),M=!0),X.add(l,o),o.B=0}}function fm(o,l){return dl(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=fr(T(o.Ga,o,l),xl(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const b=new Rt(this,this.j,o);let S=this.o;if(this.S&&(S?(S=_(S),w(S,this.S)):S=this.S),this.m!==null||this.O||(b.H=S,S=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=Dl(this,b,l),h=lt(this.I),fe(h,"RID",o),fe(h,"CVER",22),this.D&&fe(h,"X-HTTP-Session-Id",this.D),Ir(this,h),S&&(this.O?l="headers="+encodeURIComponent(String(Tl(S)))+"&"+l:this.m&&No(h,this.m,S)),ko(this.h,b),this.Ua&&fe(h,"TYPE","init"),this.P?(fe(h,"$req",l),fe(h,"SID","null"),b.T=!0,Ro(b,h,null)):Ro(b,h,l),this.G=2}}else this.G==3&&(o?Nl(this,o):this.i.length==0||hl(this.h)||Nl(this))};function Nl(o,l){var h;l?h=l.l:h=o.U++;const m=lt(o.I);fe(m,"SID",o.K),fe(m,"RID",h),fe(m,"AID",o.T),Ir(o,m),o.m&&o.o&&No(m,o.m,o.o),h=new Rt(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),l&&(o.i=l.D.concat(o.i)),l=Dl(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),ko(o.h,h),Ro(h,m,l)}function Ir(o,l){o.H&&F(o.H,function(h,m){fe(l,m,h)}),o.l&&ml({},function(h,m){fe(l,m,h)})}function Dl(o,l,h){h=Math.min(o.i.length,h);var m=o.l?T(o.l.Na,o.l,o):null;e:{var b=o.i;let S=-1;for(;;){const x=["count="+h];S==-1?0<h?(S=b[0].g,x.push("ofs="+S)):S=0:x.push("ofs="+S);let le=!0;for(let Se=0;Se<h;Se++){let ie=b[Se].g;const Ve=b[Se].map;if(ie-=S,0>ie)S=Math.max(0,b[Se].g-100),le=!1;else try{lm(Ve,x,"req"+ie+"_")}catch{m&&m(Ve)}}if(le){m=x.join("&");break e}}}return o=o.i.splice(0,h),l.D=o,m}function Vl(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;V||pe(),M||(V(),M=!0),X.add(l,o),o.v=0}}function Vo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=fr(T(o.Fa,o),xl(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Ol(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=fr(T(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,$e(10),Rs(this),Ol(this))};function Oo(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Ol(o){o.g=new Rt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=lt(o.qa);fe(l,"RID","rpc"),fe(l,"SID",o.K),fe(l,"AID",o.T),fe(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&fe(l,"TO",o.ja),fe(l,"TYPE","xmlhttp"),Ir(o,l),o.m&&o.o&&No(l,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Is(lt(l)),h.m=null,h.P=!0,al(h,o)}n.Za=function(){this.C!=null&&(this.C=null,Rs(this),Vo(this),$e(19))};function Cs(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Ll(o,l){var h=null;if(o.g==l){Cs(o),Oo(o),o.g=null;var m=2}else if(Po(o.h,l))h=l.D,fl(o.h,l),m=1;else return;if(o.G!=0){if(l.o)if(m==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var b=o.B;m=gs(),Ue(m,new rl(m,h)),Ss(o)}else Vl(o);else if(b=l.s,b==3||b==0&&0<l.X||!(m==1&&fm(o,l)||m==2&&Vo(o)))switch(h&&0<h.length&&(l=o.h,l.i=l.i.concat(h)),b){case 1:nn(o,5);break;case 4:nn(o,10);break;case 3:nn(o,6);break;default:nn(o,2)}}}function xl(o,l){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*l}function nn(o,l){if(o.j.info("Error code "+l),l==2){var h=T(o.fb,o),m=o.Xa;const b=!m;m=new tn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||ws(m,"https"),Is(m),b?om(m.toString(),h):am(m.toString(),h)}else $e(2);o.G=0,o.l&&o.l.sa(l),Ml(o),kl(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),$e(2)):(this.j.info("Failed to ping google.com"),$e(1))};function Ml(o){if(o.G=0,o.ka=[],o.l){const l=pl(o.h);(l.length!=0||o.i.length!=0)&&(P(o.ka,l),P(o.ka,o.i),o.h.i.length=0,C(o.i),o.i.length=0),o.l.ra()}}function Fl(o,l,h){var m=h instanceof tn?lt(h):new tn(h);if(m.g!="")l&&(m.g=l+"."+m.g),Es(m,m.s);else{var b=c.location;m=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;var S=new tn(null);m&&ws(S,m),l&&(S.g=l),b&&Es(S,b),h&&(S.l=h),m=S}return h=o.D,l=o.ya,h&&l&&fe(m,h,l),fe(m,"VER",o.la),Ir(o,m),m}function Ul(o,l,h){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new ge(new Ts({eb:h})):new ge(o.pa),l.Ha(o.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function $l(){}n=$l.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ps(){}Ps.prototype.g=function(o,l){return new We(o,l)};function We(o,l){De.call(this),this.g=new Pl(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!L(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!L(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new bn(this)}N(We,De),We.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},We.prototype.close=function(){Do(this.g)},We.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=wo(o),o=h);l.i.push(new Yp(l.Ya++,o)),l.G==3&&Ss(l)},We.prototype.N=function(){this.g.l=null,delete this.j,Do(this.g),delete this.g,We.aa.N.call(this)};function Bl(o){Io.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}N(Bl,Io);function jl(){To.call(this),this.status=1}N(jl,To);function bn(o){this.g=o}N(bn,$l),bn.prototype.ua=function(){Ue(this.g,"a")},bn.prototype.ta=function(o){Ue(this.g,new Bl(o))},bn.prototype.sa=function(o){Ue(this.g,new jl)},bn.prototype.ra=function(){Ue(this.g,"b")},Ps.prototype.createWebChannel=Ps.prototype.g,We.prototype.send=We.prototype.o,We.prototype.open=We.prototype.m,We.prototype.close=We.prototype.close,Nd=function(){return new Ps},kd=function(){return gs()},Pd=Zt,aa={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},_s.NO_ERROR=0,_s.TIMEOUT=8,_s.HTTP_ERROR=6,Gs=_s,sl.COMPLETE="complete",Cd=sl,Zc.EventType=hr,hr.OPEN="a",hr.CLOSE="b",hr.ERROR="c",hr.MESSAGE="d",De.prototype.listen=De.prototype.K,br=Zc,ge.prototype.listenOnce=ge.prototype.L,ge.prototype.getLastError=ge.prototype.Ka,ge.prototype.getLastErrorCode=ge.prototype.Ba,ge.prototype.getStatus=ge.prototype.Z,ge.prototype.getResponseJson=ge.prototype.Oa,ge.prototype.getResponseText=ge.prototype.oa,ge.prototype.send=ge.prototype.ea,ge.prototype.setWithCredentials=ge.prototype.Ha,Sd=ge}).apply(typeof Ds<"u"?Ds:typeof self<"u"?self:typeof window<"u"?window:{});const wu="@firebase/firestore",Eu="4.7.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}xe.UNAUTHENTICATED=new xe(null),xe.GOOGLE_CREDENTIALS=new xe("google-credentials-uid"),xe.FIRST_PARTY=new xe("first-party-uid"),xe.MOCK_USER=new xe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sr="11.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn=new Ni("@firebase/firestore");function Cn(){return dn.logLevel}function j(n,...e){if(dn.logLevel<=Z.DEBUG){const t=e.map(Ha);dn.debug(`Firestore (${sr}): ${n}`,...t)}}function vt(n,...e){if(dn.logLevel<=Z.ERROR){const t=e.map(Ha);dn.error(`Firestore (${sr}): ${n}`,...t)}}function zn(n,...e){if(dn.logLevel<=Z.WARN){const t=e.map(Ha);dn.warn(`Firestore (${sr}): ${n}`,...t)}}function Ha(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function G(n="Unexpected state"){const e=`FIRESTORE (${sr}) INTERNAL ASSERTION FAILED: `+n;throw vt(e),new Error(e)}function oe(n,e){n||G()}function Q(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends Tt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Dd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class dv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(xe.UNAUTHENTICATED))}shutdown(){}}class fv{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class pv{constructor(e){this.t=e,this.currentUser=xe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){oe(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new mt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new mt,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{j("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(j("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new mt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(j("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(oe(typeof r.accessToken=="string"),new Dd(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return oe(e===null||typeof e=="string"),new xe(e)}}class mv{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=xe.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class gv{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new mv(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(xe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Iu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class _v{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,Ye(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){oe(this.o===void 0);const r=i=>{i.error!=null&&j("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,j("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{j("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):j("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new Iu(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(oe(typeof t.token=="string"),this.R=t.token,new Iu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function ca(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=yv(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ee(n,e){return n<e?-1:n>e?1:0}function la(n,e){const t=ca().encode(n),r=ca().encode(e);for(let s=0;s<Math.min(t.length,r.length);s++){const i=ee(t[s],r[s]);if(i!==0)return i}return ee(t.length,r.length)}function Hn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tu=-62135596800,Au=1e6;class Te{static now(){return Te.fromMillis(Date.now())}static fromDate(e){return Te.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Au);return new Te(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Tu)throw new U(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Au}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-Tu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{static fromTimestamp(e){return new K(e)}static min(){return new K(new Te(0,0))}static max(){return new K(new Te(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bu="__name__";class et{constructor(e,t,r){t===void 0?t=0:t>e.length&&G(),r===void 0?r=e.length-t:r>e.length-t&&G(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return et.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof et?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=et.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ee(e.length,t.length)}static compareSegments(e,t){const r=et.isNumericId(e),s=et.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?et.extractNumericId(e).compare(et.extractNumericId(t)):la(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ut.fromString(e.substring(4,e.length-2))}}class he extends et{construct(e,t,r){return new he(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(k.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new he(t)}static emptyPath(){return new he([])}}const vv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Pe extends et{construct(e,t,r){return new Pe(e,t,r)}static isValidIdentifier(e){return vv.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Pe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===bu}static keyField(){return new Pe([bu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new U(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new U(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new U(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new U(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Pe(t)}static emptyPath(){return new Pe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.path=e}static fromPath(e){return new z(he.fromString(e))}static fromName(e){return new z(he.fromString(e).popFirst(5))}static empty(){return new z(he.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&he.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return he.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new z(new he(e.slice()))}}/**
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
 */const Br=-1;function wv(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=K.fromTimestamp(r===1e9?new Te(t+1,0):new Te(t,r));return new qt(s,z.empty(),e)}function Ev(n){return new qt(n.readTime,n.key,Br)}class qt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new qt(K.min(),z.empty(),Br)}static max(){return new qt(K.max(),z.empty(),Br)}}function Iv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=z.comparator(n.documentKey,e.documentKey),t!==0?t:ee(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */async function ir(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==Tv)throw n;j("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&G(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):D.reject(t)}static resolve(e){return new D((t,r)=>{t(e)})}static reject(e){return new D((t,r)=>{r(e)})}static waitFor(e){return new D((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next(s=>s?D.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new D((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(g=>{a[d]=g,++c,c===i&&r(a)},g=>s(g))}})}static doWhile(e,t){return new D((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function bv(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function or(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class xi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}xi.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa=-1;function Mi(n){return n==null}function ui(n){return n===0&&1/n==-1/0}function Rv(n){return typeof n=="number"&&Number.isInteger(n)&&!ui(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od="";function Sv(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Ru(e)),e=Cv(n.get(t),e);return Ru(e)}function Cv(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Od:t+="";break;default:t+=i}}return t}function Ru(n){return n+Od+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Su(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Jt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ld(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,t){this.comparator=e,this.root=t||Ce.EMPTY}insert(e,t){return new me(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ce.BLACK,null,null))}remove(e){return new me(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ce.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Vs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Vs(this.root,e,this.comparator,!1)}getReverseIterator(){return new Vs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Vs(this.root,e,this.comparator,!0)}}class Vs{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ce{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ce.RED,this.left=s??Ce.EMPTY,this.right=i??Ce.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ce(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ce.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ce.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ce.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ce.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw G();const e=this.left.check();if(e!==this.right.check())throw G();return e+(this.isRed()?0:1)}}Ce.EMPTY=null,Ce.RED=!0,Ce.BLACK=!1;Ce.EMPTY=new class{constructor(){this.size=0}get key(){throw G()}get value(){throw G()}get color(){throw G()}get left(){throw G()}get right(){throw G()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ce(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.comparator=e,this.data=new me(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Cu(this.data.getIterator())}getIteratorFrom(e){return new Cu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ae)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ae(this.comparator);return t.data=e,t}}class Cu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this.fields=e,e.sort(Pe.comparator)}static empty(){return new Ge([])}unionWith(e){let t=new Ae(Pe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ge(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Hn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class xd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new xd("Invalid base64 string: "+i):i}}(e);return new ke(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new ke(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ke.EMPTY_BYTE_STRING=new ke("");const Pv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function zt(n){if(oe(!!n),typeof n=="string"){let e=0;const t=Pv.exec(n);if(oe(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:we(n.seconds),nanos:we(n.nanos)}}function we(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ht(n){return typeof n=="string"?ke.fromBase64String(n):ke.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md="server_timestamp",Fd="__type__",Ud="__previous_value__",$d="__local_write_time__";function Fi(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Fd])===null||t===void 0?void 0:t.stringValue)===Md}function Ui(n){const e=n.mapValue.fields[Ud];return Fi(e)?Ui(e):e}function jr(n){const e=zt(n.mapValue.fields[$d].timestampValue);return new Te(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{constructor(e,t,r,s,i,a,c,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d}}const hi="(default)";class qr{constructor(e,t){this.projectId=e,this.database=t||hi}static empty(){return new qr("","")}get isDefaultDatabase(){return this.database===hi}isEqual(e){return e instanceof qr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bd="__type__",Nv="__max__",Os={mapValue:{}},jd="__vector__",di="value";function Wt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Fi(n)?4:Vv(n)?9007199254740991:Dv(n)?10:11:G()}function ot(n,e){if(n===e)return!0;const t=Wt(n);if(t!==Wt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return jr(n).isEqual(jr(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=zt(s.timestampValue),c=zt(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Ht(s.bytesValue).isEqual(Ht(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return we(s.geoPointValue.latitude)===we(i.geoPointValue.latitude)&&we(s.geoPointValue.longitude)===we(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return we(s.integerValue)===we(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=we(s.doubleValue),c=we(i.doubleValue);return a===c?ui(a)===ui(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Hn(n.arrayValue.values||[],e.arrayValue.values||[],ot);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Su(a)!==Su(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!ot(a[u],c[u])))return!1;return!0}(n,e);default:return G()}}function zr(n,e){return(n.values||[]).find(t=>ot(t,e))!==void 0}function Wn(n,e){if(n===e)return 0;const t=Wt(n),r=Wt(e);if(t!==r)return ee(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ee(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=we(i.integerValue||i.doubleValue),u=we(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return Pu(n.timestampValue,e.timestampValue);case 4:return Pu(jr(n),jr(e));case 5:return la(n.stringValue,e.stringValue);case 6:return function(i,a){const c=Ht(i),u=Ht(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const g=ee(c[d],u[d]);if(g!==0)return g}return ee(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=ee(we(i.latitude),we(a.latitude));return c!==0?c:ee(we(i.longitude),we(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return ku(n.arrayValue,e.arrayValue);case 10:return function(i,a){var c,u,d,g;const I=i.fields||{},T=a.fields||{},R=(c=I[di])===null||c===void 0?void 0:c.arrayValue,N=(u=T[di])===null||u===void 0?void 0:u.arrayValue,C=ee(((d=R?.values)===null||d===void 0?void 0:d.length)||0,((g=N?.values)===null||g===void 0?void 0:g.length)||0);return C!==0?C:ku(R,N)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Os.mapValue&&a===Os.mapValue)return 0;if(i===Os.mapValue)return 1;if(a===Os.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=a.fields||{},g=Object.keys(d);u.sort(),g.sort();for(let I=0;I<u.length&&I<g.length;++I){const T=la(u[I],g[I]);if(T!==0)return T;const R=Wn(c[u[I]],d[g[I]]);if(R!==0)return R}return ee(u.length,g.length)}(n.mapValue,e.mapValue);default:throw G()}}function Pu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ee(n,e);const t=zt(n),r=zt(e),s=ee(t.seconds,r.seconds);return s!==0?s:ee(t.nanos,r.nanos)}function ku(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Wn(t[s],r[s]);if(i)return i}return ee(t.length,r.length)}function Gn(n){return ua(n)}function ua(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=zt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Ht(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return z.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ua(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ua(t.fields[a])}`;return s+"}"}(n.mapValue):G()}function Ks(n){switch(Wt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ui(n);return e?16+Ks(e):16;case 5:return 2*n.stringValue.length;case 6:return Ht(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Ks(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Jt(r.fields,(i,a)=>{s+=i.length+Ks(a)}),s}(n.mapValue);default:throw G()}}function fi(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ha(n){return!!n&&"integerValue"in n}function Ga(n){return!!n&&"arrayValue"in n}function Nu(n){return!!n&&"nullValue"in n}function Du(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Qs(n){return!!n&&"mapValue"in n}function Dv(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Bd])===null||t===void 0?void 0:t.stringValue)===jd}function Nr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Jt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Nr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Nr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Vv(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Nv}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this.value=e}static empty(){return new ze({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Qs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Nr(t)}setAll(e){let t=Pe.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=Nr(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Qs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ot(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Qs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Jt(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new ze(Nr(this.value))}}function qd(n){const e=[];return Jt(n.fields,(t,r)=>{const s=new Pe([t]);if(Qs(r)){const i=qd(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Ge(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Me(e,0,K.min(),K.min(),K.min(),ze.empty(),0)}static newFoundDocument(e,t,r,s){return new Me(e,1,t,K.min(),r,s,0)}static newNoDocument(e,t){return new Me(e,2,t,K.min(),K.min(),ze.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,K.min(),K.min(),ze.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(K.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ze.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ze.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=K.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Kn{constructor(e,t){this.position=e,this.inclusive=t}}function Vu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=z.comparator(z.fromName(a.referenceValue),t.key):r=Wn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ou(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ot(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Hr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ov(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class zd{}class Ie extends zd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new xv(e,t,r):t==="array-contains"?new Uv(e,r):t==="in"?new $v(e,r):t==="not-in"?new Bv(e,r):t==="array-contains-any"?new jv(e,r):new Ie(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Mv(e,r):new Fv(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Wn(t,this.value)):t!==null&&Wt(this.value)===Wt(t)&&this.matchesComparison(Wn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return G()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ze extends zd{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new Ze(e,t)}matches(e){return Hd(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function Hd(n){return n.op==="and"}function Wd(n){return Lv(n)&&Hd(n)}function Lv(n){for(const e of n.filters)if(e instanceof Ze)return!1;return!0}function da(n){if(n instanceof Ie)return n.field.canonicalString()+n.op.toString()+Gn(n.value);if(Wd(n))return n.filters.map(e=>da(e)).join(",");{const e=n.filters.map(t=>da(t)).join(",");return`${n.op}(${e})`}}function Gd(n,e){return n instanceof Ie?function(r,s){return s instanceof Ie&&r.op===s.op&&r.field.isEqual(s.field)&&ot(r.value,s.value)}(n,e):n instanceof Ze?function(r,s){return s instanceof Ze&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&Gd(a,s.filters[c]),!0):!1}(n,e):void G()}function Kd(n){return n instanceof Ie?function(t){return`${t.field.canonicalString()} ${t.op} ${Gn(t.value)}`}(n):n instanceof Ze?function(t){return t.op.toString()+" {"+t.getFilters().map(Kd).join(" ,")+"}"}(n):"Filter"}class xv extends Ie{constructor(e,t,r){super(e,t,r),this.key=z.fromName(r.referenceValue)}matches(e){const t=z.comparator(e.key,this.key);return this.matchesComparison(t)}}class Mv extends Ie{constructor(e,t){super(e,"in",t),this.keys=Qd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Fv extends Ie{constructor(e,t){super(e,"not-in",t),this.keys=Qd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Qd(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>z.fromName(r.referenceValue))}class Uv extends Ie{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ga(t)&&zr(t.arrayValue,this.value)}}class $v extends Ie{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&zr(this.value.arrayValue,t)}}class Bv extends Ie{constructor(e,t){super(e,"not-in",t)}matches(e){if(zr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!zr(this.value.arrayValue,t)}}class jv extends Ie{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ga(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>zr(this.value.arrayValue,r))}}/**
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
 */class qv{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.le=null}}function Lu(n,e=null,t=[],r=[],s=null,i=null,a=null){return new qv(n,e,t,r,s,i,a)}function Ka(n){const e=Q(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>da(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Mi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Gn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Gn(r)).join(",")),e.le=t}return e.le}function Qa(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Ov(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Gd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ou(n.startAt,e.startAt)&&Ou(n.endAt,e.endAt)}function fa(n){return z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function zv(n,e,t,r,s,i,a,c){return new gn(n,e,t,r,s,i,a,c)}function $i(n){return new gn(n)}function xu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ya(n){return n.collectionGroup!==null}function Mn(n){const e=Q(n);if(e.he===null){e.he=[];const t=new Set;for(const i of e.explicitOrderBy)e.he.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Ae(Pe.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.he.push(new Hr(i,r))}),t.has(Pe.keyField().canonicalString())||e.he.push(new Hr(Pe.keyField(),r))}return e.he}function rt(n){const e=Q(n);return e.Pe||(e.Pe=Hv(e,Mn(n))),e.Pe}function Hv(n,e){if(n.limitType==="F")return Lu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Hr(s.field,i)});const t=n.endAt?new Kn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Kn(n.startAt.position,n.startAt.inclusive):null;return Lu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function pa(n,e){const t=n.filters.concat([e]);return new gn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function pi(n,e,t){return new gn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Bi(n,e){return Qa(rt(n),rt(e))&&n.limitType===e.limitType}function Yd(n){return`${Ka(rt(n))}|lt:${n.limitType}`}function Pn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Kd(s)).join(", ")}]`),Mi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Gn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Gn(s)).join(",")),`Target(${r})`}(rt(n))}; limitType=${n.limitType})`}function ji(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):z.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Mn(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,u){const d=Vu(a,c,u);return a.inclusive?d<=0:d<0}(r.startAt,Mn(r),s)||r.endAt&&!function(a,c,u){const d=Vu(a,c,u);return a.inclusive?d>=0:d>0}(r.endAt,Mn(r),s))}(n,e)}function Wv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Jd(n){return(e,t)=>{let r=!1;for(const s of Mn(n)){const i=Gv(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Gv(n,e,t){const r=n.field.isKeyField()?z.comparator(e.key,t.key):function(i,a,c){const u=a.data.field(i),d=c.data.field(i);return u!==null&&d!==null?Wn(u,d):G()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return G()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Jt(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Ld(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kv=new me(z.comparator);function wt(){return Kv}const Xd=new me(z.comparator);function Rr(...n){let e=Xd;for(const t of n)e=e.insert(t.key,t);return e}function Zd(n){let e=Xd;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function on(){return Dr()}function ef(){return Dr()}function Dr(){return new _n(n=>n.toString(),(n,e)=>n.isEqual(e))}const Qv=new me(z.comparator),Yv=new Ae(z.comparator);function te(...n){let e=Yv;for(const t of n)e=e.add(t);return e}const Jv=new Ae(ee);function Xv(){return Jv}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ja(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ui(e)?"-0":e}}function tf(n){return{integerValue:""+n}}function nf(n,e){return Rv(e)?tf(e):Ja(n,e)}/**
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
 */class qi{constructor(){this._=void 0}}function Zv(n,e,t){return n instanceof mi?function(s,i){const a={fields:{[Fd]:{stringValue:Md},[$d]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Fi(i)&&(i=Ui(i)),i&&(a.fields[Ud]=i),{mapValue:a}}(t,e):n instanceof Wr?sf(n,e):n instanceof Gr?of(n,e):function(s,i){const a=rf(s,i),c=Mu(a)+Mu(s.Ie);return ha(a)&&ha(s.Ie)?tf(c):Ja(s.serializer,c)}(n,e)}function ew(n,e,t){return n instanceof Wr?sf(n,e):n instanceof Gr?of(n,e):t}function rf(n,e){return n instanceof Kr?function(r){return ha(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class mi extends qi{}class Wr extends qi{constructor(e){super(),this.elements=e}}function sf(n,e){const t=af(e);for(const r of n.elements)t.some(s=>ot(s,r))||t.push(r);return{arrayValue:{values:t}}}class Gr extends qi{constructor(e){super(),this.elements=e}}function of(n,e){let t=af(e);for(const r of n.elements)t=t.filter(s=>!ot(s,r));return{arrayValue:{values:t}}}class Kr extends qi{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Mu(n){return we(n.integerValue||n.doubleValue)}function af(n){return Ga(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(e,t){this.field=e,this.transform=t}}function nw(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Wr&&s instanceof Wr||r instanceof Gr&&s instanceof Gr?Hn(r.elements,s.elements,ot):r instanceof Kr&&s instanceof Kr?ot(r.Ie,s.Ie):r instanceof mi&&s instanceof mi}(n.transform,e.transform)}class rw{constructor(e,t){this.version=e,this.transformResults=t}}class st{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new st}static exists(e){return new st(void 0,e)}static updateTime(e){return new st(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ys(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class zi{}function cf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new uf(n.key,st.none()):new os(n.key,n.data,st.none());{const t=n.data,r=ze.empty();let s=new Ae(Pe.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Xt(n.key,r,new Ge(s.toArray()),st.none())}}function sw(n,e,t){n instanceof os?function(s,i,a){const c=s.value.clone(),u=Uu(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Xt?function(s,i,a){if(!Ys(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Uu(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(lf(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Vr(n,e,t,r){return n instanceof os?function(i,a,c,u){if(!Ys(i.precondition,a))return c;const d=i.value.clone(),g=$u(i.fieldTransforms,u,a);return d.setAll(g),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Xt?function(i,a,c,u){if(!Ys(i.precondition,a))return c;const d=$u(i.fieldTransforms,u,a),g=a.data;return g.setAll(lf(i)),g.setAll(d),a.convertToFoundDocument(a.version,g).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(I=>I.field))}(n,e,t,r):function(i,a,c){return Ys(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function iw(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=rf(r.transform,s||null);i!=null&&(t===null&&(t=ze.empty()),t.set(r.field,i))}return t||null}function Fu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Hn(r,s,(i,a)=>nw(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class os extends zi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Xt extends zi{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function lf(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Uu(n,e,t){const r=new Map;oe(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,ew(a,c,t[s]))}return r}function $u(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Zv(i,a,e))}return r}class uf extends zi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ow extends zi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aw{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&sw(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Vr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Vr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=ef();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=cf(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(K.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),te())}isEqual(e){return this.batchId===e.batchId&&Hn(this.mutations,e.mutations,(t,r)=>Fu(t,r))&&Hn(this.baseMutations,e.baseMutations,(t,r)=>Fu(t,r))}}class Xa{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){oe(e.mutations.length===r.length);let s=function(){return Qv}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Xa(e,t,r,s)}}/**
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
 */var Ee,re;function uw(n){switch(n){case k.OK:return G();case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0;default:return G()}}function hf(n){if(n===void 0)return vt("GRPC error has no .code"),k.UNKNOWN;switch(n){case Ee.OK:return k.OK;case Ee.CANCELLED:return k.CANCELLED;case Ee.UNKNOWN:return k.UNKNOWN;case Ee.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case Ee.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case Ee.INTERNAL:return k.INTERNAL;case Ee.UNAVAILABLE:return k.UNAVAILABLE;case Ee.UNAUTHENTICATED:return k.UNAUTHENTICATED;case Ee.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case Ee.NOT_FOUND:return k.NOT_FOUND;case Ee.ALREADY_EXISTS:return k.ALREADY_EXISTS;case Ee.PERMISSION_DENIED:return k.PERMISSION_DENIED;case Ee.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case Ee.ABORTED:return k.ABORTED;case Ee.OUT_OF_RANGE:return k.OUT_OF_RANGE;case Ee.UNIMPLEMENTED:return k.UNIMPLEMENTED;case Ee.DATA_LOSS:return k.DATA_LOSS;default:return G()}}(re=Ee||(Ee={}))[re.OK=0]="OK",re[re.CANCELLED=1]="CANCELLED",re[re.UNKNOWN=2]="UNKNOWN",re[re.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",re[re.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",re[re.NOT_FOUND=5]="NOT_FOUND",re[re.ALREADY_EXISTS=6]="ALREADY_EXISTS",re[re.PERMISSION_DENIED=7]="PERMISSION_DENIED",re[re.UNAUTHENTICATED=16]="UNAUTHENTICATED",re[re.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",re[re.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",re[re.ABORTED=10]="ABORTED",re[re.OUT_OF_RANGE=11]="OUT_OF_RANGE",re[re.UNIMPLEMENTED=12]="UNIMPLEMENTED",re[re.INTERNAL=13]="INTERNAL",re[re.UNAVAILABLE=14]="UNAVAILABLE",re[re.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const hw=new Ut([4294967295,4294967295],0);function Bu(n){const e=ca().encode(n),t=new Rd;return t.update(e),new Uint8Array(t.digest())}function ju(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ut([t,r],0),new Ut([s,i],0)]}class Za{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Sr(`Invalid padding: ${t}`);if(r<0)throw new Sr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Sr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Sr(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=Ut.fromNumber(this.Ee)}Ae(e,t,r){let s=e.add(t.multiply(Ut.fromNumber(r)));return s.compare(hw)===1&&(s=new Ut([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=Bu(e),[r,s]=ju(t);for(let i=0;i<this.hashCount;i++){const a=this.Ae(r,s,i);if(!this.Re(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Za(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ee===0)return;const t=Bu(e),[r,s]=ju(t);for(let i=0;i<this.hashCount;i++){const a=this.Ae(r,s,i);this.Ve(a)}}Ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Sr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,as.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Hi(K.min(),s,new me(ee),wt(),te())}}class as{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new as(r,t,te(),te(),te())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e,t,r,s){this.me=e,this.removedTargetIds=t,this.key=r,this.fe=s}}class df{constructor(e,t){this.targetId=e,this.ge=t}}class ff{constructor(e,t,r=ke.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class qu{constructor(){this.pe=0,this.ye=zu(),this.we=ke.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=te(),t=te(),r=te();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:G()}}),new as(this.we,this.Se,e,t,r)}Me(){this.be=!1,this.ye=zu()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,oe(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class dw{constructor(e){this.ke=e,this.qe=new Map,this.Qe=wt(),this.$e=Ls(),this.Ue=Ls(),this.Ke=new me(ee)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(t);break;case 3:this.Je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Ce(e.resumeToken));break;default:G()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((r,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,r=e.ge.count,s=this.Xe(t);if(s){const i=s.target;if(fa(i))if(r===0){const a=new z(i.path);this.ze(t,a,Me.newNoDocument(a,K.min()))}else oe(r===1);else{const a=this.et(t);if(a!==r){const c=this.tt(e),u=c?this.nt(c,e,a):1;if(u!==0){this.Ye(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=Ht(r).toUint8Array()}catch(u){if(u instanceof xd)return zn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Za(a,s,i)}catch(u){return zn(u instanceof Sr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ee===0?null:c}nt(e,t,r){return t.ge.count===r-this.st(e,t.targetId)?0:2}st(e,t){const r=this.ke.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.ke.it(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ze(t,i,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((i,a)=>{const c=this.Xe(a);if(c){if(i.current&&fa(c.target)){const u=new z(c.target.path);this._t(u).has(a)||this.ut(a,u)||this.ze(a,u,Me.newNoDocument(u,e))}i.ve&&(t.set(a,i.Fe()),i.Me())}});let r=te();this.Ue.forEach((i,a)=>{let c=!0;a.forEachWhile(u=>{const d=this.Xe(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.Qe.forEach((i,a)=>a.setReadTime(e));const s=new Hi(e,t,this.Ke,this.Qe,r);return this.Qe=wt(),this.$e=Ls(),this.Ue=Ls(),this.Ke=new me(ee),s}Ge(e,t){if(!this.Je(e))return;const r=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,r),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),r&&(this.Qe=this.Qe.insert(t,r))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new qu,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new Ae(ee),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new Ae(ee),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||j("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new qu),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function Ls(){return new me(z.comparator)}function zu(){return new me(z.comparator)}const fw={asc:"ASCENDING",desc:"DESCENDING"},pw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},mw={and:"AND",or:"OR"};class gw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ma(n,e){return n.useProto3Json||Mi(e)?e:{value:e}}function gi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function pf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function _w(n,e){return gi(n,e.toTimestamp())}function it(n){return oe(!!n),K.fromTimestamp(function(t){const r=zt(t);return new Te(r.seconds,r.nanos)}(n))}function ec(n,e){return ga(n,e).canonicalString()}function ga(n,e){const t=function(s){return new he(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function mf(n){const e=he.fromString(n);return oe(wf(e)),e}function _a(n,e){return ec(n.databaseId,e.path)}function qo(n,e){const t=mf(e);if(t.get(1)!==n.databaseId.projectId)throw new U(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new z(_f(t))}function gf(n,e){return ec(n.databaseId,e)}function yw(n){const e=mf(n);return e.length===4?he.emptyPath():_f(e)}function ya(n){return new he(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function _f(n){return oe(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Hu(n,e,t){return{name:_a(n,e),fields:t.value.mapValue.fields}}function vw(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:G()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,g){return d.useProto3Json?(oe(g===void 0||typeof g=="string"),ke.fromBase64String(g||"")):(oe(g===void 0||g instanceof Buffer||g instanceof Uint8Array),ke.fromUint8Array(g||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const g=d.code===void 0?k.UNKNOWN:hf(d.code);return new U(g,d.message||"")}(a);t=new ff(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=qo(n,r.document.name),i=it(r.document.updateTime),a=r.document.createTime?it(r.document.createTime):K.min(),c=new ze({mapValue:{fields:r.document.fields}}),u=Me.newFoundDocument(s,i,a,c),d=r.targetIds||[],g=r.removedTargetIds||[];t=new Js(d,g,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=qo(n,r.document),i=r.readTime?it(r.readTime):K.min(),a=Me.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Js([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=qo(n,r.document),i=r.removedTargetIds||[];t=new Js([],i,s,null)}else{if(!("filter"in e))return G();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new lw(s,i),c=r.targetId;t=new df(c,a)}}return t}function ww(n,e){let t;if(e instanceof os)t={update:Hu(n,e.key,e.value)};else if(e instanceof uf)t={delete:_a(n,e.key)};else if(e instanceof Xt)t={update:Hu(n,e.key,e.data),updateMask:Pw(e.fieldMask)};else{if(!(e instanceof ow))return G();t={verify:_a(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof mi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Wr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Gr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Kr)return{fieldPath:a.field.canonicalString(),increment:c.Ie};throw G()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:_w(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:G()}(n,e.precondition)),t}function Ew(n,e){return n&&n.length>0?(oe(e!==void 0),n.map(t=>function(s,i){let a=s.updateTime?it(s.updateTime):it(i);return a.isEqual(K.min())&&(a=it(i)),new rw(a,s.transformResults||[])}(t,e))):[]}function Iw(n,e){return{documents:[gf(n,e.path)]}}function Tw(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=gf(n,s);const i=function(d){if(d.length!==0)return vf(Ze.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(g=>function(T){return{field:kn(T.field),direction:Rw(T.dir)}}(g))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=ma(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ht:t,parent:s}}function Aw(n){let e=yw(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){oe(r===1);const g=t.from[0];g.allDescendants?s=g.collectionId:e=e.child(g.collectionId)}let i=[];t.where&&(i=function(I){const T=yf(I);return T instanceof Ze&&Wd(T)?T.getFilters():[T]}(t.where));let a=[];t.orderBy&&(a=function(I){return I.map(T=>function(N){return new Hr(Nn(N.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(T))}(t.orderBy));let c=null;t.limit&&(c=function(I){let T;return T=typeof I=="object"?I.value:I,Mi(T)?null:T}(t.limit));let u=null;t.startAt&&(u=function(I){const T=!!I.before,R=I.values||[];return new Kn(R,T)}(t.startAt));let d=null;return t.endAt&&(d=function(I){const T=!I.before,R=I.values||[];return new Kn(R,T)}(t.endAt)),zv(e,s,a,i,c,"F",u,d)}function bw(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function yf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Nn(t.unaryFilter.field);return Ie.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Nn(t.unaryFilter.field);return Ie.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Nn(t.unaryFilter.field);return Ie.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Nn(t.unaryFilter.field);return Ie.create(a,"!=",{nullValue:"NULL_VALUE"});default:return G()}}(n):n.fieldFilter!==void 0?function(t){return Ie.create(Nn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return G()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ze.create(t.compositeFilter.filters.map(r=>yf(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return G()}}(t.compositeFilter.op))}(n):G()}function Rw(n){return fw[n]}function Sw(n){return pw[n]}function Cw(n){return mw[n]}function kn(n){return{fieldPath:n.canonicalString()}}function Nn(n){return Pe.fromServerFormat(n.fieldPath)}function vf(n){return n instanceof Ie?function(t){if(t.op==="=="){if(Du(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NAN"}};if(Nu(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Du(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NAN"}};if(Nu(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:kn(t.field),op:Sw(t.op),value:t.value}}}(n):n instanceof Ze?function(t){const r=t.getFilters().map(s=>vf(s));return r.length===1?r[0]:{compositeFilter:{op:Cw(t.op),filters:r}}}(n):G()}function Pw(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function wf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,t,r,s,i=K.min(),a=K.min(),c=ke.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Lt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(e){this.Tt=e}}function Nw(n){const e=Aw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?pi(e,e.limit,"L"):e}/**
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
 */class Dw{constructor(){this.Tn=new Vw}addToCollectionParentIndex(e,t){return this.Tn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(qt.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(qt.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class Vw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ae(he.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ae(he.comparator)).toArray()}}/**
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
 */const Wu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ef=41943040;class qe{static withCacheSize(e){return new qe(e,qe.DEFAULT_COLLECTION_PERCENTILE,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qe.DEFAULT_COLLECTION_PERCENTILE=10,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,qe.DEFAULT=new qe(Ef,qe.DEFAULT_COLLECTION_PERCENTILE,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),qe.DISABLED=new qe(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new Qn(0)}static Kn(){return new Qn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu="LruGarbageCollector",Ow=1048576;function Ku([n,e],[t,r]){const s=ee(n,t);return s===0?ee(e,r):s}class Lw{constructor(e){this.Hn=e,this.buffer=new Ae(Ku),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Ku(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class xw{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){j(Gu,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){or(t)?j(Gu,"Ignoring IndexedDB error during garbage collection: ",t):await ir(t)}await this.er(3e5)})}}class Mw{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return D.resolve(xi.ae);const r=new Lw(t);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.tr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(j("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(Wu)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(j("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Wu):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let r,s,i,a,c,u,d;const g=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(I=>(I>this.params.maximumSequenceNumbersToCollect?(j("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${I}`),s=this.params.maximumSequenceNumbersToCollect):s=I,a=Date.now(),this.nthSequenceNumber(e,s))).next(I=>(r=I,c=Date.now(),this.removeTargets(e,r,t))).next(I=>(i=I,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(I=>(d=Date.now(),Cn()<=Z.DEBUG&&j("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-g}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${I} documents in `+(d-u)+`ms
Total Duration: ${d-g}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:I})))}}function Fw(n,e){return new Mw(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(){this.changes=new _n(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Bw{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Vr(r.mutation,s,Ge.empty(),Te.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,te()).next(()=>r))}getLocalViewOfDocuments(e,t,r=te()){const s=on();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Rr();return i.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=on();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,te()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=wt();const a=Dr(),c=function(){return Dr()}();return t.forEach((u,d)=>{const g=r.get(d.key);s.has(d.key)&&(g===void 0||g.mutation instanceof Xt)?i=i.insert(d.key,d):g!==void 0?(a.set(d.key,g.mutation.getFieldMask()),Vr(g.mutation,d,g.mutation.getFieldMask(),Te.now())):a.set(d.key,Ge.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,g)=>a.set(d,g)),t.forEach((d,g)=>{var I;return c.set(d,new $w(g,(I=a.get(d))!==null&&I!==void 0?I:null))}),c))}recalculateAndSaveOverlays(e,t){const r=Dr();let s=new me((a,c)=>a-c),i=te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let g=r.get(u)||Ge.empty();g=c.applyToLocalView(d,g),r.set(u,g);const I=(s.get(c.batchId)||te()).add(u);s=s.insert(c.batchId,I)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,g=u.value,I=ef();g.forEach(T=>{if(!i.has(T)){const R=cf(t.get(T),r.get(T));R!==null&&I.set(T,R),i=i.add(T)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,I))}return D.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return z.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ya(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(on());let c=Br,u=i;return a.next(d=>D.forEach(d,(g,I)=>(c<I.largestBatchId&&(c=I.largestBatchId),i.get(g)?D.resolve():this.remoteDocumentCache.getEntry(e,g).next(T=>{u=u.insert(g,T)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,te())).next(g=>({batchId:c,changes:Zd(g)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new z(t)).next(r=>{let s=Rr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Rr();return this.indexManager.getCollectionParents(e,i).next(c=>D.forEach(c,u=>{const d=function(I,T){return new gn(T,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(g=>{g.forEach((I,T)=>{a=a.insert(I,T)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const g=d.getKey();a.get(g)===null&&(a=a.insert(g,Me.newInvalidDocument(g)))});let c=Rr();return a.forEach((u,d)=>{const g=i.get(u);g!==void 0&&Vr(g.mutation,d,Ge.empty(),Te.now()),ji(t,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return D.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:it(s.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:Nw(s.bundledQuery),readTime:it(s.readTime)}}(t)),D.resolve()}}/**
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
 */class qw{constructor(){this.overlays=new me(z.comparator),this.Rr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=on();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Et(e,t,i)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=on(),i=t.length+1,a=new z(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new me((d,g)=>d-g);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let g=i.get(d.largestBatchId);g===null&&(g=on(),i=i.insert(d.largestBatchId,g)),g.set(d.getKey(),d)}}const c=on(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,g)=>c.set(d,g)),!(c.size()>=s)););return D.resolve(c)}Et(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new cw(t,r));let i=this.Rr.get(t);i===void 0&&(i=te(),this.Rr.set(t,i)),this.Rr.set(t,i.add(r.key))}}/**
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
 */class zw{constructor(){this.sessionToken=ke.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(){this.Vr=new Ae(Re.mr),this.gr=new Ae(Re.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const r=new Re(e,t);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.wr(new Re(e,t))}Sr(e,t){e.forEach(r=>this.removeReference(r,t))}br(e){const t=new z(new he([])),r=new Re(t,e),s=new Re(t,e+1),i=[];return this.gr.forEachInRange([r,s],a=>{this.wr(a),i.push(a.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new z(new he([])),r=new Re(t,e),s=new Re(t,e+1);let i=te();return this.gr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new Re(e,0),r=this.Vr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Re{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return z.comparator(e.key,t.key)||ee(e.Cr,t.Cr)}static pr(e,t){return ee(e.Cr,t.Cr)||z.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new Ae(Re.mr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new aw(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Mr=this.Mr.add(new Re(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(a)}lookupMutationBatch(e,t){return D.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Nr(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?Wa:this.Fr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Re(t,0),s=new Re(t,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],a=>{const c=this.Or(a.Cr);i.push(c)}),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ae(ee);return t.forEach(s=>{const i=new Re(s,0),a=new Re(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,a],c=>{r=r.add(c.Cr)})}),D.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;z.isDocumentKey(i)||(i=i.child(""));const a=new Re(new z(i),0);let c=new Ae(ee);return this.Mr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(u.Cr)),!0)},a),D.resolve(this.Br(c))}Br(e){const t=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){oe(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return D.forEach(t.mutations,s=>{const i=new Re(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,t){const r=new Re(t,0),s=this.Mr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(e){this.kr=e,this.docs=function(){return new me(z.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.kr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let r=wt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Me.newInvalidDocument(s))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=wt();const a=t.path,c=new z(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:g}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Iv(Ev(g),r)<=0||(s.has(g.key)||ji(t,g))&&(i=i.insert(g.key,g.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){G()}qr(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Gw(this)}getSize(e){return D.resolve(this.size)}}class Gw extends Uw{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e){this.persistence=e,this.Qr=new _n(t=>Ka(t),Qa),this.lastRemoteSnapshotVersion=K.min(),this.highestTargetId=0,this.$r=0,this.Ur=new tc,this.targetCount=0,this.Kr=Qn.Un()}forEachTarget(e,t){return this.Qr.forEach((r,s)=>t(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.$r&&(this.$r=t),D.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new Qn(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.zn(t),D.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Qr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Qr.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),D.waitFor(i).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Qr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Ur.yr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Ur.Sr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Ur.vr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Ur.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new xi(0),this.zr=!1,this.zr=!0,this.jr=new zw,this.referenceDelegate=e(this),this.Hr=new Kw(this),this.indexManager=new Dw,this.remoteDocumentCache=function(s){return new Ww(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new kw(t),this.Yr=new jw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new qw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Wr[e.toKey()];return r||(r=new Hw(t,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,r){j("MemoryPersistence","Starting transaction:",e);const s=new Qw(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,t){return D.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,t)))}}class Qw extends Av{constructor(e){super(),this.currentSequenceNumber=e}}class nc{constructor(e){this.persistence=e,this.ti=new tc,this.ni=null}static ri(e){return new nc(e)}get ii(){if(this.ni)return this.ni;throw G()}addReference(e,t,r){return this.ti.addReference(r,t),this.ii.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.ti.removeReference(r,t),this.ii.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),D.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.ii,r=>{const s=z.fromPath(r);return this.si(e,s).next(i=>{i||t.removeEntry(s,K.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(r=>{r?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return D.or([()=>D.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class _i{constructor(e,t){this.persistence=e,this.oi=new _n(r=>Sv(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Fw(this,t)}static ri(e,t){return new _i(e,t)}Zr(){}Xr(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}sr(e){let t=0;return this.rr(e,r=>{t++}).next(()=>t)}rr(e,t){return D.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?D.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,a=>this.ar(e,a,t).next(c=>{c||(r++,i.removeEntry(a,K.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.oi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),D.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ks(e.data.value)),t}ar(e,t,r){return D.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Hi=r,this.Ji=s}static Yi(e,t){let r=te(),s=te();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new rc(e,t.fromCache,r,s)}}/**
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
 */class Jw{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return Nm()?8:bv(Fe())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.rs(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ss(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Yw;return this._s(e,t,a).next(c=>{if(i.result=c,this.Xi)return this.us(e,t,a,c.size)})}).next(()=>i.result)}us(e,t,r,s){return r.documentReadCount<this.es?(Cn()<=Z.DEBUG&&j("QueryEngine","SDK will not create cache indexes for query:",Pn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),D.resolve()):(Cn()<=Z.DEBUG&&j("QueryEngine","Query:",Pn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(Cn()<=Z.DEBUG&&j("QueryEngine","The SDK decides to create cache indexes for query:",Pn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,rt(t))):D.resolve())}rs(e,t){if(xu(t))return D.resolve(null);let r=rt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=pi(t,null,"F"),r=rt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=te(...i);return this.ns.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.cs(t,c);return this.ls(t,d,a,u.readTime)?this.rs(e,pi(t,null,"F")):this.hs(e,d,t,u)}))})))}ss(e,t,r,s){return xu(t)||s.isEqual(K.min())?D.resolve(null):this.ns.getDocuments(e,r).next(i=>{const a=this.cs(t,i);return this.ls(t,a,r,s)?D.resolve(null):(Cn()<=Z.DEBUG&&j("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Pn(t)),this.hs(e,a,t,wv(s,Br)).next(c=>c))})}cs(e,t){let r=new Ae(Jd(e));return t.forEach((s,i)=>{ji(e,i)&&(r=r.add(i))}),r}ls(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,t,r){return Cn()<=Z.DEBUG&&j("QueryEngine","Using full collection scan to execute query:",Pn(t)),this.ns.getDocumentsMatchingQuery(e,t,qt.min(),r)}hs(e,t,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sc="LocalStore",Xw=3e8;class Zw{constructor(e,t,r,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new me(ee),this.Is=new _n(i=>Ka(i),Qa),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Bw(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function eE(n,e,t,r){return new Zw(n,e,t,r)}async function Tf(n,e){const t=Q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.As(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let u=te();for(const d of s){a.push(d.batchId);for(const g of d.mutations)u=u.add(g.key)}for(const d of i){c.push(d.batchId);for(const g of d.mutations)u=u.add(g.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Rs:d,removedBatchIds:a,addedBatchIds:c}))})})}function tE(n,e){const t=Q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.ds.newChangeBuffer({trackRemovals:!0});return function(c,u,d,g){const I=d.batch,T=I.keys();let R=D.resolve();return T.forEach(N=>{R=R.next(()=>g.getEntry(u,N)).next(C=>{const P=d.docVersions.get(N);oe(P!==null),C.version.compareTo(P)<0&&(I.applyToRemoteDocument(C,d),C.isValidDocument()&&(C.setReadTime(d.commitVersion),g.addEntry(C)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(u,I))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=te();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Af(n){const e=Q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function nE(n,e){const t=Q(n),r=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const c=[];e.targetChanges.forEach((g,I)=>{const T=s.get(I);if(!T)return;c.push(t.Hr.removeMatchingKeys(i,g.removedDocuments,I).next(()=>t.Hr.addMatchingKeys(i,g.addedDocuments,I)));let R=T.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(I)!==null?R=R.withResumeToken(ke.EMPTY_BYTE_STRING,K.min()).withLastLimboFreeSnapshotVersion(K.min()):g.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(g.resumeToken,r)),s=s.insert(I,R),function(C,P,B){return C.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-C.snapshotVersion.toMicroseconds()>=Xw?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0}(T,R,g)&&c.push(t.Hr.updateTargetData(i,R))});let u=wt(),d=te();if(e.documentUpdates.forEach(g=>{e.resolvedLimboDocuments.has(g)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,g))}),c.push(rE(i,a,e.documentUpdates).next(g=>{u=g.Vs,d=g.fs})),!r.isEqual(K.min())){const g=t.Hr.getLastRemoteSnapshotVersion(i).next(I=>t.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(g)}return D.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ts=s,i))}function rE(n,e,t){let r=te(),s=te();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=wt();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(K.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):j(sc,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Vs:a,fs:s}})}function sE(n,e){const t=Q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Wa),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function iE(n,e){const t=Q(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Hr.getTargetData(r,e).next(i=>i?(s=i,D.resolve(s)):t.Hr.allocateTargetId(r).next(a=>(s=new Lt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(r.targetId,r),t.Is.set(e,r.targetId)),r})}async function va(n,e,t){const r=Q(n),s=r.Ts.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!or(a))throw a;j(sc,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function Qu(n,e,t){const r=Q(n);let s=K.min(),i=te();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,g){const I=Q(u),T=I.Is.get(g);return T!==void 0?D.resolve(I.Ts.get(T)):I.Hr.getTargetData(d,g)}(r,a,rt(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(a,c.targetId).next(u=>{i=u})}).next(()=>r.Ps.getDocumentsMatchingQuery(a,e,t?s:K.min(),t?i:te())).next(c=>(oE(r,Wv(e),c),{documents:c,gs:i})))}function oE(n,e,t){let r=n.Es.get(e)||K.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Es.set(e,r)}class Yu{constructor(){this.activeTargetIds=Xv()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class aE{constructor(){this.ho=new Yu,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,r){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new Yu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */const Ju="ConnectivityMonitor";class Xu{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){j(Ju,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){j(Ju,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let xs=null;function wa(){return xs===null?xs=function(){return 268435456+Math.round(2147483648*Math.random())}():xs++,"0x"+xs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo="RestConnection",lE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class uE{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===hi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,t,r,s,i){const a=wa(),c=this.bo(e,t.toUriEncodedString());j(zo,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(u,s,i),this.vo(e,c,u,r).then(d=>(j(zo,`Received RPC '${e}' ${a}: `,d),d),d=>{throw zn(zo,`RPC '${e}' ${a} failed with error: `,d,"url: ",c,"request:",r),d})}Co(e,t,r,s,i,a){return this.So(e,t,r,s,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+sr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,t){const r=lE[e];return`${this.po}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Le="WebChannelConnection";class dE extends uE{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,s){const i=wa();return new Promise((a,c)=>{const u=new Sd;u.setWithCredentials(!0),u.listenOnce(Cd.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Gs.NO_ERROR:const g=u.getResponseJson();j(Le,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(g)),a(g);break;case Gs.TIMEOUT:j(Le,`RPC '${e}' ${i} timed out`),c(new U(k.DEADLINE_EXCEEDED,"Request time out"));break;case Gs.HTTP_ERROR:const I=u.getStatus();if(j(Le,`RPC '${e}' ${i} failed with status:`,I,"response text:",u.getResponseText()),I>0){let T=u.getResponseJson();Array.isArray(T)&&(T=T[0]);const R=T?.error;if(R&&R.status&&R.message){const N=function(P){const B=P.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(B)>=0?B:k.UNKNOWN}(R.status);c(new U(N,R.message))}else c(new U(k.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new U(k.UNAVAILABLE,"Connection failed."));break;default:G()}}finally{j(Le,`RPC '${e}' ${i} completed.`)}});const d=JSON.stringify(s);j(Le,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",d,r,15)})}Wo(e,t,r){const s=wa(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Nd(),c=kd(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Do(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const g=i.join("");j(Le,`Creating RPC '${e}' stream ${s}: ${g}`,u);const I=a.createWebChannel(g,u);let T=!1,R=!1;const N=new hE({Fo:P=>{R?j(Le,`Not sending because RPC '${e}' stream ${s} is closed:`,P):(T||(j(Le,`Opening RPC '${e}' stream ${s} transport.`),I.open(),T=!0),j(Le,`RPC '${e}' stream ${s} sending:`,P),I.send(P))},Mo:()=>I.close()}),C=(P,B,L)=>{P.listen(B,$=>{try{L($)}catch(H){setTimeout(()=>{throw H},0)}})};return C(I,br.EventType.OPEN,()=>{R||(j(Le,`RPC '${e}' stream ${s} transport opened.`),N.Qo())}),C(I,br.EventType.CLOSE,()=>{R||(R=!0,j(Le,`RPC '${e}' stream ${s} transport closed`),N.Uo())}),C(I,br.EventType.ERROR,P=>{R||(R=!0,zn(Le,`RPC '${e}' stream ${s} transport errored:`,P),N.Uo(new U(k.UNAVAILABLE,"The operation could not be completed")))}),C(I,br.EventType.MESSAGE,P=>{var B;if(!R){const L=P.data[0];oe(!!L);const $=L,H=$?.error||((B=$[0])===null||B===void 0?void 0:B.error);if(H){j(Le,`RPC '${e}' stream ${s} received error:`,H);const O=H.status;let F=function(p){const w=Ee[p];if(w!==void 0)return hf(w)}(O),y=H.message;F===void 0&&(F=k.INTERNAL,y="Unknown error status: "+O+" with message "+H.message),R=!0,N.Uo(new U(F,y)),I.close()}else j(Le,`RPC '${e}' stream ${s} received:`,L),N.Ko(L)}}),C(c,Pd.STAT_EVENT,P=>{P.stat===aa.PROXY?j(Le,`RPC '${e}' stream ${s} detected buffering proxy`):P.stat===aa.NOPROXY&&j(Le,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{N.$o()},0),N}}function Ho(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(n){return new gw(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=t,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-r);s>0&&j("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zu="PersistentStream";class Rf{constructor(e,t,r,s,i,a,c,u){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new bf(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(vt(t.toString()),vt("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===t&&this.V_(r,s)},r=>{e(()=>{const s=new U(k.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,t){const r=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return j(Zu,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(j(Zu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class fE extends Rf{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=vw(this.serializer,e),r=function(i){if(!("targetChange"in i))return K.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?K.min():a.readTime?it(a.readTime):K.min()}(e);return this.listener.p_(t,r)}y_(e){const t={};t.database=ya(this.serializer),t.addTarget=function(i,a){let c;const u=a.target;if(c=fa(u)?{documents:Iw(i,u)}:{query:Tw(i,u).ht},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=pf(i,a.resumeToken);const d=ma(i,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(K.min())>0){c.readTime=gi(i,a.snapshotVersion.toTimestamp());const d=ma(i,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=bw(this.serializer,e);r&&(t.labels=r),this.I_(t)}w_(e){const t={};t.database=ya(this.serializer),t.removeTarget=e,this.I_(t)}}class pE extends Rf{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return oe(!!e.streamToken),this.lastStreamToken=e.streamToken,oe(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){oe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=Ew(e.writeResults,e.commitTime),r=it(e.commitTime);return this.listener.v_(r,t)}C_(){const e={};e.database=ya(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ww(this.serializer,r))};this.I_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mE{}class gE extends mE{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new U(k.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.So(e,ga(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(k.UNKNOWN,i.toString())})}Co(e,t,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Co(e,ga(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(k.UNKNOWN,a.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class _E{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(vt(t),this.N_=!1):j("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn="RemoteStore";class yE{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(a=>{r.enqueueAndForget(async()=>{yn(this)&&(j(fn,"Restarting streams for network reachability change."),await async function(u){const d=Q(u);d.W_.add(4),await cs(d),d.j_.set("Unknown"),d.W_.delete(4),await Gi(d)}(this))})}),this.j_=new _E(r,s)}}async function Gi(n){if(yn(n))for(const e of n.G_)await e(!0)}async function cs(n){for(const e of n.G_)await e(!1)}function Sf(n,e){const t=Q(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),cc(t)?ac(t):ar(t).c_()&&oc(t,e))}function ic(n,e){const t=Q(n),r=ar(t);t.K_.delete(e),r.c_()&&Cf(t,e),t.K_.size===0&&(r.c_()?r.P_():yn(t)&&t.j_.set("Unknown"))}function oc(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(K.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ar(n).y_(e)}function Cf(n,e){n.H_.Ne(e),ar(n).w_(e)}function ac(n){n.H_=new dw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),ar(n).start(),n.j_.B_()}function cc(n){return yn(n)&&!ar(n).u_()&&n.K_.size>0}function yn(n){return Q(n).W_.size===0}function Pf(n){n.H_=void 0}async function vE(n){n.j_.set("Online")}async function wE(n){n.K_.forEach((e,t)=>{oc(n,e)})}async function EE(n,e){Pf(n),cc(n)?(n.j_.q_(e),ac(n)):n.j_.set("Unknown")}async function IE(n,e,t){if(n.j_.set("Online"),e instanceof ff&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.K_.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.K_.delete(c),s.H_.removeTarget(c))}(n,e)}catch(r){j(fn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await yi(n,r)}else if(e instanceof Js?n.H_.We(e):e instanceof df?n.H_.Ze(e):n.H_.je(e),!t.isEqual(K.min()))try{const r=await Af(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.H_.ot(a);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const g=i.K_.get(d);g&&i.K_.set(d,g.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,d)=>{const g=i.K_.get(u);if(!g)return;i.K_.set(u,g.withResumeToken(ke.EMPTY_BYTE_STRING,g.snapshotVersion)),Cf(i,u);const I=new Lt(g.target,u,d,g.sequenceNumber);oc(i,I)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){j(fn,"Failed to raise snapshot:",r),await yi(n,r)}}async function yi(n,e,t){if(!or(e))throw e;n.W_.add(1),await cs(n),n.j_.set("Offline"),t||(t=()=>Af(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{j(fn,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await Gi(n)})}function kf(n,e){return e().catch(t=>yi(n,t,e))}async function Ki(n){const e=Q(n),t=Gt(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:Wa;for(;TE(e);)try{const s=await sE(e.localStore,r);if(s===null){e.U_.length===0&&t.P_();break}r=s.batchId,AE(e,s)}catch(s){await yi(e,s)}Nf(e)&&Df(e)}function TE(n){return yn(n)&&n.U_.length<10}function AE(n,e){n.U_.push(e);const t=Gt(n);t.c_()&&t.S_&&t.b_(e.mutations)}function Nf(n){return yn(n)&&!Gt(n).u_()&&n.U_.length>0}function Df(n){Gt(n).start()}async function bE(n){Gt(n).C_()}async function RE(n){const e=Gt(n);for(const t of n.U_)e.b_(t.mutations)}async function SE(n,e,t){const r=n.U_.shift(),s=Xa.from(r,e,t);await kf(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Ki(n)}async function CE(n,e){e&&Gt(n).S_&&await async function(r,s){if(function(a){return uw(a)&&a!==k.ABORTED}(s.code)){const i=r.U_.shift();Gt(r).h_(),await kf(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Ki(r)}}(n,e),Nf(n)&&Df(n)}async function eh(n,e){const t=Q(n);t.asyncQueue.verifyOperationInProgress(),j(fn,"RemoteStore received new credentials");const r=yn(t);t.W_.add(3),await cs(t),r&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await Gi(t)}async function PE(n,e){const t=Q(n);e?(t.W_.delete(2),await Gi(t)):e||(t.W_.add(2),await cs(t),t.j_.set("Unknown"))}function ar(n){return n.J_||(n.J_=function(t,r,s){const i=Q(t);return i.M_(),new fE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:vE.bind(null,n),No:wE.bind(null,n),Lo:EE.bind(null,n),p_:IE.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),cc(n)?ac(n):n.j_.set("Unknown")):(await n.J_.stop(),Pf(n))})),n.J_}function Gt(n){return n.Y_||(n.Y_=function(t,r,s){const i=Q(t);return i.M_(),new pE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:bE.bind(null,n),Lo:CE.bind(null,n),D_:RE.bind(null,n),v_:SE.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await Ki(n)):(await n.Y_.stop(),n.U_.length>0&&(j(fn,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new mt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new lc(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function uc(n,e){if(vt("AsyncQueue",`${e}: ${n}`),or(n))return new U(k.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{static emptySet(e){return new Fn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||z.comparator(t.key,r.key):(t,r)=>z.comparator(t.key,r.key),this.keyedMap=Rr(),this.sortedSet=new me(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Fn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Fn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(){this.Z_=new me(z.comparator)}track(e){const t=e.doc.key,r=this.Z_.get(t);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(t):e.type===1&&r.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):G():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Yn{constructor(e,t,r,s,i,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new Yn(e,t,Fn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Bi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class NE{constructor(){this.queries=nh(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,r){const s=Q(t),i=s.queries;s.queries=nh(),i.forEach((a,c)=>{for(const u of c.ta)u.onError(r)})})(this,new U(k.ABORTED,"Firestore shutting down"))}}function nh(){return new _n(n=>Yd(n),Bi)}async function hc(n,e){const t=Q(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new kE,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await t.onListen(s,!0);break;case 1:i.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=uc(a,`Initialization of query '${Pn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ta.push(e),e.sa(t.onlineState),i.ea&&e.oa(i.ea)&&fc(t)}async function dc(n,e){const t=Q(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.ta.indexOf(e);a>=0&&(i.ta.splice(a,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function DE(n,e){const t=Q(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.ta)c.oa(s)&&(r=!0);a.ea=s}}r&&fc(t)}function VE(n,e,t){const r=Q(n),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(t);r.queries.delete(e)}function fc(n){n.ia.forEach(e=>{e.next()})}var Ea,rh;(rh=Ea||(Ea={}))._a="default",rh.Cache="cache";class pc{constructor(e,t,r){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Yn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const r=t!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=Yn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==Ea.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(e){this.key=e}}class Of{constructor(e){this.key=e}}class OE{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=te(),this.mutatedKeys=te(),this.ya=Jd(e),this.wa=new Fn(this.ya)}get Sa(){return this.fa}ba(e,t){const r=t?t.Da:new th,s=t?t.wa:this.wa;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((g,I)=>{const T=s.get(g),R=ji(this.query,I)?I:null,N=!!T&&this.mutatedKeys.has(T.key),C=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let P=!1;T&&R?T.data.isEqual(R.data)?N!==C&&(r.track({type:3,doc:R}),P=!0):this.va(T,R)||(r.track({type:2,doc:R}),P=!0,(u&&this.ya(R,u)>0||d&&this.ya(R,d)<0)&&(c=!0)):!T&&R?(r.track({type:0,doc:R}),P=!0):T&&!R&&(r.track({type:1,doc:T}),P=!0,(u||d)&&(c=!0)),P&&(R?(a=a.add(R),i=C?i.add(g):i.delete(g)):(a=a.delete(g),i=i.delete(g)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const g=this.query.limitType==="F"?a.last():a.first();a=a.delete(g.key),i=i.delete(g.key),r.track({type:1,doc:g})}return{wa:a,Da:r,ls:c,mutatedKeys:i}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const a=e.Da.X_();a.sort((g,I)=>function(R,N){const C=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G()}};return C(R)-C(N)}(g.type,I.type)||this.ya(g.doc,I.doc)),this.Ca(r),s=s!=null&&s;const c=t&&!s?this.Fa():[],u=this.pa.size===0&&this.current&&!s?1:0,d=u!==this.ga;return this.ga=u,a.length!==0||d?{snapshot:new Yn(this.query,e.wa,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new th,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=te(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const t=[];return e.forEach(r=>{this.pa.has(r)||t.push(new Of(r))}),this.pa.forEach(r=>{e.has(r)||t.push(new Vf(r))}),t}Oa(e){this.fa=e.gs,this.pa=te();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return Yn.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const mc="SyncEngine";class LE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class xE{constructor(e){this.key=e,this.Ba=!1}}class ME{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.La={},this.ka=new _n(c=>Yd(c),Bi),this.qa=new Map,this.Qa=new Set,this.$a=new me(z.comparator),this.Ua=new Map,this.Ka=new tc,this.Wa={},this.Ga=new Map,this.za=Qn.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function FE(n,e,t=!0){const r=$f(n);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await Lf(r,e,t,!0),s}async function UE(n,e){const t=$f(n);await Lf(t,e,!0,!1)}async function Lf(n,e,t,r){const s=await iE(n.localStore,rt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await $E(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Sf(n.remoteStore,s),c}async function $E(n,e,t,r,s){n.Ha=(I,T,R)=>async function(C,P,B,L){let $=P.view.ba(B);$.ls&&($=await Qu(C.localStore,P.query,!1).then(({documents:y})=>P.view.ba(y,$)));const H=L&&L.targetChanges.get(P.targetId),O=L&&L.targetMismatches.get(P.targetId)!=null,F=P.view.applyChanges($,C.isPrimaryClient,H,O);return ih(C,P.targetId,F.Ma),F.snapshot}(n,I,T,R);const i=await Qu(n.localStore,e,!0),a=new OE(e,i.gs),c=a.ba(i.documents),u=as.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(c,n.isPrimaryClient,u);ih(n,t,d.Ma);const g=new LE(e,t,a);return n.ka.set(e,g),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),d.snapshot}async function BE(n,e,t){const r=Q(n),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(a=>!Bi(a,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await va(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ic(r.remoteStore,s.targetId),Ia(r,s.targetId)}).catch(ir)):(Ia(r,s.targetId),await va(r.localStore,s.targetId,!0))}async function jE(n,e){const t=Q(n),r=t.ka.get(e),s=t.qa.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ic(t.remoteStore,r.targetId))}async function qE(n,e,t){const r=YE(n);try{const s=await function(a,c){const u=Q(a),d=Te.now(),g=c.reduce((R,N)=>R.add(N.key),te());let I,T;return u.persistence.runTransaction("Locally write mutations","readwrite",R=>{let N=wt(),C=te();return u.ds.getEntries(R,g).next(P=>{N=P,N.forEach((B,L)=>{L.isValidDocument()||(C=C.add(B))})}).next(()=>u.localDocuments.getOverlayedDocuments(R,N)).next(P=>{I=P;const B=[];for(const L of c){const $=iw(L,I.get(L.key).overlayedDocument);$!=null&&B.push(new Xt(L.key,$,qd($.value.mapValue),st.exists(!0)))}return u.mutationQueue.addMutationBatch(R,d,B,c)}).next(P=>{T=P;const B=P.applyToLocalDocumentSet(I,C);return u.documentOverlayCache.saveOverlays(R,P.batchId,B)})}).then(()=>({batchId:T.batchId,changes:Zd(I)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,u){let d=a.Wa[a.currentUser.toKey()];d||(d=new me(ee)),d=d.insert(c,u),a.Wa[a.currentUser.toKey()]=d}(r,s.batchId,t),await ls(r,s.changes),await Ki(r.remoteStore)}catch(s){const i=uc(s,"Failed to persist write");t.reject(i)}}async function xf(n,e){const t=Q(n);try{const r=await nE(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Ua.get(i);a&&(oe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.Ba=!0:s.modifiedDocuments.size>0?oe(a.Ba):s.removedDocuments.size>0&&(oe(a.Ba),a.Ba=!1))}),await ls(t,r,e)}catch(r){await ir(r)}}function sh(n,e,t){const r=Q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ka.forEach((i,a)=>{const c=a.view.sa(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const u=Q(a);u.onlineState=c;let d=!1;u.queries.forEach((g,I)=>{for(const T of I.ta)T.sa(c)&&(d=!0)}),d&&fc(u)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function zE(n,e,t){const r=Q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ua.get(e),i=s&&s.key;if(i){let a=new me(z.comparator);a=a.insert(i,Me.newNoDocument(i,K.min()));const c=te().add(i),u=new Hi(K.min(),new Map,new me(ee),a,c);await xf(r,u),r.$a=r.$a.remove(i),r.Ua.delete(e),gc(r)}else await va(r.localStore,e,!1).then(()=>Ia(r,e,t)).catch(ir)}async function HE(n,e){const t=Q(n),r=e.batch.batchId;try{const s=await tE(t.localStore,e);Ff(t,r,null),Mf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ls(t,s)}catch(s){await ir(s)}}async function WE(n,e,t){const r=Q(n);try{const s=await function(a,c){const u=Q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let g;return u.mutationQueue.lookupMutationBatch(d,c).next(I=>(oe(I!==null),g=I.keys(),u.mutationQueue.removeMutationBatch(d,I))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,g,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,g)).next(()=>u.localDocuments.getDocuments(d,g))})}(r.localStore,e);Ff(r,e,t),Mf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ls(r,s)}catch(s){await ir(s)}}function Mf(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function Ff(n,e,t){const r=Q(n);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function Ia(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.qa.get(e))n.ka.delete(r),t&&n.La.Ja(r,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(r=>{n.Ka.containsKey(r)||Uf(n,r)})}function Uf(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(ic(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),gc(n))}function ih(n,e,t){for(const r of t)r instanceof Vf?(n.Ka.addReference(r.key,e),GE(n,r)):r instanceof Of?(j(mc,"Document no longer in limbo: "+r.key),n.Ka.removeReference(r.key,e),n.Ka.containsKey(r.key)||Uf(n,r.key)):G()}function GE(n,e){const t=e.key,r=t.path.canonicalString();n.$a.get(t)||n.Qa.has(r)||(j(mc,"New document in limbo: "+t),n.Qa.add(r),gc(n))}function gc(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new z(he.fromString(e)),r=n.za.next();n.Ua.set(r,new xE(t)),n.$a=n.$a.insert(t,r),Sf(n.remoteStore,new Lt(rt($i(t.path)),r,"TargetPurposeLimboResolution",xi.ae))}}async function ls(n,e,t){const r=Q(n),s=[],i=[],a=[];r.ka.isEmpty()||(r.ka.forEach((c,u)=>{a.push(r.Ha(u,e,t).then(d=>{var g;if((d||t)&&r.isPrimaryClient){const I=d?!d.fromCache:(g=t?.targetChanges.get(u.targetId))===null||g===void 0?void 0:g.current;r.sharedClientState.updateQueryState(u.targetId,I?"current":"not-current")}if(d){s.push(d);const I=rc.Yi(u.targetId,d);i.push(I)}}))}),await Promise.all(a),r.La.p_(s),await async function(u,d){const g=Q(u);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>D.forEach(d,T=>D.forEach(T.Hi,R=>g.persistence.referenceDelegate.addReference(I,T.targetId,R)).next(()=>D.forEach(T.Ji,R=>g.persistence.referenceDelegate.removeReference(I,T.targetId,R)))))}catch(I){if(!or(I))throw I;j(sc,"Failed to update sequence numbers: "+I)}for(const I of d){const T=I.targetId;if(!I.fromCache){const R=g.Ts.get(T),N=R.snapshotVersion,C=R.withLastLimboFreeSnapshotVersion(N);g.Ts=g.Ts.insert(T,C)}}}(r.localStore,i))}async function KE(n,e){const t=Q(n);if(!t.currentUser.isEqual(e)){j(mc,"User change. New user:",e.toKey());const r=await Tf(t.localStore,e);t.currentUser=e,function(i,a){i.Ga.forEach(c=>{c.forEach(u=>{u.reject(new U(k.CANCELLED,a))})}),i.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ls(t,r.Rs)}}function QE(n,e){const t=Q(n),r=t.Ua.get(e);if(r&&r.Ba)return te().add(r.key);{let s=te();const i=t.qa.get(e);if(!i)return s;for(const a of i){const c=t.ka.get(a);s=s.unionWith(c.view.Sa)}return s}}function $f(n){const e=Q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=xf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=QE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=zE.bind(null,e),e.La.p_=DE.bind(null,e.eventManager),e.La.Ja=VE.bind(null,e.eventManager),e}function YE(n){const e=Q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=HE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=WE.bind(null,e),e}class vi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Wi(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return eE(this.persistence,new Jw,e.initialUser,this.serializer)}Xa(e){return new If(nc.ri,this.serializer)}Za(e){return new aE}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}vi.provider={build:()=>new vi};class JE extends vi{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){oe(this.persistence.referenceDelegate instanceof _i);const r=this.persistence.referenceDelegate.garbageCollector;return new xw(r,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?qe.withCacheSize(this.cacheSizeBytes):qe.DEFAULT;return new If(r=>_i.ri(r,t),this.serializer)}}class Ta{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>sh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=KE.bind(null,this.syncEngine),await PE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new NE}()}createDatastore(e){const t=Wi(e.databaseInfo.databaseId),r=function(i){return new dE(i)}(e.databaseInfo);return function(i,a,c,u){return new gE(i,a,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new yE(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>sh(this.syncEngine,t,0),function(){return Xu.D()?new Xu:new cE}())}createSyncEngine(e,t){return function(s,i,a,c,u,d,g){const I=new ME(s,i,a,c,u,d);return g&&(I.ja=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=Q(s);j(fn,"RemoteStore shutting down."),i.W_.add(5),await cs(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ta.provider={build:()=>new Ta};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class _c{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):vt("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt="FirestoreClient";class XE{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=xe.UNAUTHENTICATED,this.clientId=Vd.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{j(Kt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(j(Kt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new mt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=uc(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Wo(n,e){n.asyncQueue.verifyOperationInProgress(),j(Kt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Tf(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function oh(n,e){n.asyncQueue.verifyOperationInProgress();const t=await ZE(n);j(Kt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>eh(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>eh(e.remoteStore,s)),n._onlineComponents=e}async function ZE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){j(Kt,"Using user provided OfflineComponentProvider");try{await Wo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===k.FAILED_PRECONDITION||s.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;zn("Error using user provided cache. Falling back to memory cache: "+t),await Wo(n,new vi)}}else j(Kt,"Using default OfflineComponentProvider"),await Wo(n,new JE(void 0));return n._offlineComponents}async function Bf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(j(Kt,"Using user provided OnlineComponentProvider"),await oh(n,n._uninitializedComponentsProvider._online)):(j(Kt,"Using default OnlineComponentProvider"),await oh(n,new Ta))),n._onlineComponents}function eI(n){return Bf(n).then(e=>e.syncEngine)}async function wi(n){const e=await Bf(n),t=e.eventManager;return t.onListen=FE.bind(null,e.syncEngine),t.onUnlisten=BE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=UE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=jE.bind(null,e.syncEngine),t}function tI(n,e,t={}){const r=new mt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const g=new _c({next:T=>{g.su(),a.enqueueAndForget(()=>dc(i,I));const R=T.docs.has(c);!R&&T.fromCache?d.reject(new U(k.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&T.fromCache&&u&&u.source==="server"?d.reject(new U(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),I=new pc($i(c.path),g,{includeMetadataChanges:!0,Ta:!0});return hc(i,I)}(await wi(n),n.asyncQueue,e,t,r)),r.promise}function nI(n,e,t={}){const r=new mt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const g=new _c({next:T=>{g.su(),a.enqueueAndForget(()=>dc(i,I)),T.fromCache&&u.source==="server"?d.reject(new U(k.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(T)},error:T=>d.reject(T)}),I=new pc(c,g,{includeMetadataChanges:!0,Ta:!0});return hc(i,I)}(await wi(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function jf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ah=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qf(n,e,t){if(!t)throw new U(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function rI(n,e,t,r){if(e===!0&&r===!0)throw new U(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ch(n){if(!z.isDocumentKey(n))throw new U(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function lh(n){if(z.isDocumentKey(n))throw new U(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Qi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":G()}function Je(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Qi(n);throw new U(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function sI(n,e){if(e<=0)throw new U(k.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zf="firestore.googleapis.com",uh=!0;class hh{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=zf,this.ssl=uh}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:uh;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ef;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ow)throw new U(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}rI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=jf((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new U(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new U(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new U(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Yi{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new hh({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new hh(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new dv;switch(r.type){case"firstParty":return new gv(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=ah.get(t);r&&(j("ComponentProvider","Removing Datastore"),ah.delete(t),r.terminate())}(this),Promise.resolve()}}function iI(n,e,t,r={}){var s;const i=(n=Je(n,Yi))._getSettings(),a=`${e}:${t}`;if(i.host!==zf&&i.host!==a&&zn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let c,u;if(typeof r.mockUserToken=="string")c=r.mockUserToken,u=xe.MOCK_USER;else{c=Am(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new U(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new xe(d)}n._authCredentials=new fv(new Dd(c,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new at(this.firestore,e,this._query)}}class Be{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new $t(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Be(this.firestore,e,this._key)}}class $t extends at{constructor(e,t,r){super(e,t,$i(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Be(this.firestore,null,new z(e))}withConverter(e){return new $t(this.firestore,e,this._path)}}function Ne(n,e,...t){if(n=ye(n),qf("collection","path",e),n instanceof Yi){const r=he.fromString(e,...t);return lh(r),new $t(n,null,r)}{if(!(n instanceof Be||n instanceof $t))throw new U(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(he.fromString(e,...t));return lh(r),new $t(n.firestore,null,r)}}function ct(n,e,...t){if(n=ye(n),arguments.length===1&&(e=Vd.newId()),qf("doc","path",e),n instanceof Yi){const r=he.fromString(e,...t);return ch(r),new Be(n,null,new z(r))}{if(!(n instanceof Be||n instanceof $t))throw new U(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(he.fromString(e,...t));return ch(r),new Be(n.firestore,n instanceof $t?n.converter:null,new z(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh="AsyncQueue";class fh{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new bf(this,"async_queue_retry"),this.Su=()=>{const r=Ho();r&&j(dh,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const t=Ho();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=Ho();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new mt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!or(e))throw e;j(dh,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw vt("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=t,t}enqueueAfterDelay(e,t,r){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=lc.createAndSchedule(this,e,t,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&G()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}function ph(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class pn extends Yi{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new fh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new fh(e),this._firestoreClient=void 0,await e}}}function oI(n,e){const t=typeof n=="object"?n:La(),r=typeof n=="string"?n:hi,s=ns(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Tm("firestore");i&&iI(s,...i)}return s}function Ji(n){if(n._terminated)throw new U(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||aI(n),n._firestoreClient}function aI(n){var e,t,r;const s=n._freezeSettings(),i=function(c,u,d,g){return new kv(c,u,d,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,jf(g.experimentalLongPollingOptions),g.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new XE(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const u=c?._online.build();return{_offline:c?._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Jn(ke.fromBase64String(e))}catch(t){throw new U(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Jn(ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}}/**
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
 */class vc{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cI=/^__.*__$/;class lI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Xt(e,this.data,this.fieldMask,t,this.fieldTransforms):new os(e,this.data,t,this.fieldTransforms)}}class Hf{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Xt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Wf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G()}}class wc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new wc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return Ei(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(Wf(this.Lu)&&cI.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class uI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Wi(e)}ju(e,t,r,s=!1){return new wc({Lu:e,methodName:t,zu:r,path:Pe.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function eo(n){const e=n._freezeSettings(),t=Wi(n._databaseId);return new uI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function hI(n,e,t,r,s,i={}){const a=n.ju(i.merge||i.mergeFields?2:0,e,t,s);Ic("Data must be an object, but it was:",a,r);const c=Kf(r,a);let u,d;if(i.merge)u=new Ge(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const g=[];for(const I of i.mergeFields){const T=Aa(e,I,t);if(!a.contains(T))throw new U(k.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);Yf(g,T)||g.push(T)}u=new Ge(g),d=a.fieldTransforms.filter(I=>u.covers(I.field))}else u=null,d=a.fieldTransforms;return new lI(new ze(c),u,d)}class to extends Zi{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof to}}class Ec extends Zi{constructor(e,t){super(e),this.Ju=t}_toFieldTransform(e){const t=new Kr(e.serializer,nf(e.serializer,this.Ju));return new tw(e.path,t)}isEqual(e){return e instanceof Ec&&this.Ju===e.Ju}}function dI(n,e,t,r){const s=n.ju(1,e,t);Ic("Data must be an object, but it was:",s,r);const i=[],a=ze.empty();Jt(r,(u,d)=>{const g=Tc(e,u,t);d=ye(d);const I=s.Uu(g);if(d instanceof to)i.push(g);else{const T=us(d,I);T!=null&&(i.push(g),a.set(g,T))}});const c=new Ge(i);return new Hf(a,c,s.fieldTransforms)}function fI(n,e,t,r,s,i){const a=n.ju(1,e,t),c=[Aa(e,r,t)],u=[s];if(i.length%2!=0)throw new U(k.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<i.length;T+=2)c.push(Aa(e,i[T])),u.push(i[T+1]);const d=[],g=ze.empty();for(let T=c.length-1;T>=0;--T)if(!Yf(d,c[T])){const R=c[T];let N=u[T];N=ye(N);const C=a.Uu(R);if(N instanceof to)d.push(R);else{const P=us(N,C);P!=null&&(d.push(R),g.set(R,P))}}const I=new Ge(d);return new Hf(g,I,a.fieldTransforms)}function Gf(n,e,t,r=!1){return us(t,n.ju(r?4:3,e))}function us(n,e){if(Qf(n=ye(n)))return Ic("Unsupported field value:",e,n),Kf(n,e);if(n instanceof Zi)return function(r,s){if(!Wf(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let u=us(c,s.Ku(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=ye(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return nf(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Te.fromDate(r);return{timestampValue:gi(s.serializer,i)}}if(r instanceof Te){const i=new Te(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:gi(s.serializer,i)}}if(r instanceof yc)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Jn)return{bytesValue:pf(s.serializer,r._byteString)};if(r instanceof Be){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Wu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ec(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof vc)return function(a,c){return{mapValue:{fields:{[Bd]:{stringValue:jd},[di]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Ja(c.serializer,d)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${Qi(r)}`)}(n,e)}function Kf(n,e){const t={};return Ld(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Jt(n,(r,s)=>{const i=us(s,e.qu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Qf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Te||n instanceof yc||n instanceof Jn||n instanceof Be||n instanceof Zi||n instanceof vc)}function Ic(n,e,t){if(!Qf(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=Qi(t);throw r==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+r)}}function Aa(n,e,t){if((e=ye(e))instanceof Xi)return e._internalPath;if(typeof e=="string")return Tc(n,e);throw Ei("Field path arguments must be of type string or ",n,!1,void 0,t)}const pI=new RegExp("[~\\*/\\[\\]]");function Tc(n,e,t){if(e.search(pI)>=0)throw Ei(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Xi(...e.split("."))._internalPath}catch{throw Ei(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ei(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new U(k.INVALID_ARGUMENT,c+n+u)}function Yf(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Be(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new mI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(no("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class mI extends Ac{data(){return super.data()}}function no(n,e){return typeof e=="string"?Tc(n,e):e instanceof Xi?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bc{}class ro extends bc{}function Et(n,e,...t){let r=[];e instanceof bc&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof Rc).length,c=i.filter(u=>u instanceof so).length;if(a>1||a>0&&c>0)throw new U(k.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class so extends ro{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new so(e,t,r)}_apply(e){const t=this._parse(e);return Xf(e._query,t),new at(e.firestore,e.converter,pa(e._query,t))}_parse(e){const t=eo(e.firestore);return function(i,a,c,u,d,g,I){let T;if(d.isKeyField()){if(g==="array-contains"||g==="array-contains-any")throw new U(k.INVALID_ARGUMENT,`Invalid Query. You can't perform '${g}' queries on documentId().`);if(g==="in"||g==="not-in"){gh(I,g);const N=[];for(const C of I)N.push(mh(u,i,C));T={arrayValue:{values:N}}}else T=mh(u,i,I)}else g!=="in"&&g!=="not-in"&&g!=="array-contains-any"||gh(I,g),T=Gf(c,a,I,g==="in"||g==="not-in");return Ie.create(d,g,T)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Ii(n,e,t){const r=e,s=no("where",n);return so._create(s,r,t)}class Rc extends bc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Rc(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ze.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const u of c)Xf(a,u),a=pa(a,u)}(e._query,t),new at(e.firestore,e.converter,pa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Sc extends ro{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Sc(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new U(k.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new U(k.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Hr(i,a)}(e._query,this._field,this._direction);return new at(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new gn(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function It(n,e="asc"){const t=e,r=no("orderBy",n);return Sc._create(r,t)}class Cc extends ro{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Cc(e,t,r)}_apply(e){return new at(e.firestore,e.converter,pi(e._query,this._limit,this._limitType))}}function Qt(n){return sI("limit",n),Cc._create("limit",n,"F")}class Pc extends ro{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Pc(e,t,r)}_apply(e){const t=_I(e,this.type,this._docOrFields,this._inclusive);return new at(e.firestore,e.converter,function(s,i){return new gn(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(e._query,t))}}function gI(...n){return Pc._create("startAfter",n,!1)}function _I(n,e,t,r){if(t[0]=ye(t[0]),t[0]instanceof Ac)return function(i,a,c,u,d){if(!u)throw new U(k.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const g=[];for(const I of Mn(i))if(I.field.isKeyField())g.push(fi(a,u.key));else{const T=u.data.field(I.field);if(Fi(T))throw new U(k.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+I.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(T===null){const R=I.field.canonicalString();throw new U(k.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${R}' (used as the orderBy) does not exist.`)}g.push(T)}return new Kn(g,d)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=eo(n.firestore);return function(a,c,u,d,g,I){const T=a.explicitOrderBy;if(g.length>T.length)throw new U(k.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const R=[];for(let N=0;N<g.length;N++){const C=g[N];if(T[N].field.isKeyField()){if(typeof C!="string")throw new U(k.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof C}`);if(!Ya(a)&&C.indexOf("/")!==-1)throw new U(k.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${C}' contains a slash.`);const P=a.path.child(he.fromString(C));if(!z.isDocumentKey(P))throw new U(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${P}' is not because it contains an odd number of segments.`);const B=new z(P);R.push(fi(c,B))}else{const P=Gf(u,d,C);R.push(P)}}return new Kn(R,I)}(n._query,n.firestore._databaseId,s,e,t,r)}}function mh(n,e,t){if(typeof(t=ye(t))=="string"){if(t==="")throw new U(k.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ya(e)&&t.indexOf("/")!==-1)throw new U(k.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(he.fromString(t));if(!z.isDocumentKey(r))throw new U(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return fi(n,new z(r))}if(t instanceof Be)return fi(n,t._key);throw new U(k.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Qi(t)}.`)}function gh(n,e){if(!Array.isArray(n)||n.length===0)throw new U(k.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Xf(n,e){const t=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(k.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(k.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class yI{convertValue(e,t="none"){switch(Wt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return we(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ht(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw G()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Jt(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[di].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>we(a.doubleValue));return new vc(i)}convertGeoPoint(e){return new yc(we(e.latitude),we(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Ui(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(jr(e));default:return null}}convertTimestamp(e){const t=zt(e);return new Te(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=he.fromString(e);oe(wf(r));const s=new qr(r.get(1),r.get(3)),i=new z(r.popFirst(5));return s.isEqual(t)||vt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Cr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Zf extends Ac{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Xs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(no("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Xs extends Zf{data(e={}){return super.data(e)}}class ep{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Cr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Xs(this._firestore,this._userDataWriter,r.key,r,new Cr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const u=new Xs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Cr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new Xs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Cr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,g=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),g=a.indexOf(c.doc.key)),{type:wI(c.type),doc:u,oldIndex:d,newIndex:g}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function wI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(n){n=Je(n,Be);const e=Je(n.firestore,pn);return tI(Ji(e),n._key).then(t=>rp(e,n,t))}class kc extends yI{constructor(e){super(),this.firestore=e}convertBytes(e){return new Jn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Be(this.firestore,null,t)}}function Qr(n){n=Je(n,at);const e=Je(n.firestore,pn),t=Ji(e),r=new kc(e);return Jf(n._query),nI(t,n._query).then(s=>new ep(e,r,n,s))}function vn(n,e,t,...r){n=Je(n,Be);const s=Je(n.firestore,pn),i=eo(s);let a;return a=typeof(e=ye(e))=="string"||e instanceof Xi?fI(i,"updateDoc",n._key,e,t,r):dI(i,"updateDoc",n._key,e),np(s,[a.toMutation(n._key,st.exists(!0))])}function wn(n,e){const t=Je(n.firestore,pn),r=ct(n),s=vI(n.converter,e);return np(t,[hI(eo(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,st.exists(!1))]).then(()=>r)}function hs(n,...e){var t,r,s;n=ye(n);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||ph(e[a])||(i=e[a],a++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(ph(e[a])){const I=e[a];e[a]=(t=I.next)===null||t===void 0?void 0:t.bind(I),e[a+1]=(r=I.error)===null||r===void 0?void 0:r.bind(I),e[a+2]=(s=I.complete)===null||s===void 0?void 0:s.bind(I)}let u,d,g;if(n instanceof Be)d=Je(n.firestore,pn),g=$i(n._key.path),u={next:I=>{e[a]&&e[a](rp(d,n,I))},error:e[a+1],complete:e[a+2]};else{const I=Je(n,at);d=Je(I.firestore,pn),g=I._query;const T=new kc(d);u={next:R=>{e[a]&&e[a](new ep(d,T,I,R))},error:e[a+1],complete:e[a+2]},Jf(n._query)}return function(T,R,N,C){const P=new _c(C),B=new pc(R,P,N);return T.asyncQueue.enqueueAndForget(async()=>hc(await wi(T),B)),()=>{P.su(),T.asyncQueue.enqueueAndForget(async()=>dc(await wi(T),B))}}(Ji(d),g,c,u)}function np(n,e){return function(r,s){const i=new mt;return r.asyncQueue.enqueueAndForget(async()=>qE(await eI(r),s,i)),i.promise}(Ji(n),e)}function rp(n,e,t){const r=t.docs.get(e._key),s=new kc(n);return new Zf(n,s,e._key,r,new Cr(t.hasPendingWrites,t.fromCache),e.converter)}function En(n){return new Ec("increment",n)}(function(e,t=!0){(function(s){sr=s})(tr),jt(new gt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new pn(new pv(r.getProvider("auth-internal")),new _v(a,r.getProvider("app-check-internal")),function(d,g){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new U(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new qr(d.options.projectId,g)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),pt(wu,Eu,e),pt(wu,Eu,"esm2017")})();var EI="firebase",II="11.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const ba=new Map,sp={activated:!1,tokenObservers:[]},TI={initialized:!1,enabled:!1};function be(n){return ba.get(n)||Object.assign({},sp)}function AI(n,e){return ba.set(n,e),ba.get(n)}function io(){return TI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip="https://content-firebaseappcheck.googleapis.com/v1",bI="exchangeRecaptchaV3Token",RI="exchangeDebugToken",_h={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},SI=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CI{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Mr,this.pending.promise.catch(t=>{}),await PI(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Mr,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function PI(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kI={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},He=new er("appCheck","AppCheck",kI);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yh(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function Nc(n){if(!be(n).activated)throw He.create("use-before-activation",{appName:n.name})}function op(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60;let a="";return t&&(a+=Ms(t)+"d:"),r&&(a+=Ms(r)+"h:"),a+=Ms(s)+"m:"+Ms(i)+"s",a}function Ms(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dc({url:n,body:e},t){const r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){const I=await s.getHeartbeatsHeader();I&&(r["X-Firebase-Client"]=I)}const i={method:"POST",body:JSON.stringify(e),headers:r};let a;try{a=await fetch(n,i)}catch(I){throw He.create("fetch-network-error",{originalErrorMessage:I?.message})}if(a.status!==200)throw He.create("fetch-status-error",{httpStatus:a.status});let c;try{c=await a.json()}catch(I){throw He.create("fetch-parse-error",{originalErrorMessage:I?.message})}const u=c.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw He.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});const d=Number(u[1])*1e3,g=Date.now();return{token:c.token,expireTimeMillis:g+d,issuedAtTimeMillis:g}}function NI(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${ip}/projects/${t}/apps/${r}:${bI}?key=${s}`,body:{recaptcha_v3_token:e}}}function ap(n,e){const{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${ip}/projects/${t}/apps/${r}:${RI}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DI="firebase-app-check-database",VI=1,Yr="firebase-app-check-store",cp="debug-token";let Fs=null;function lp(){return Fs||(Fs=new Promise((n,e)=>{try{const t=indexedDB.open(DI,VI);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var s;e(He.create("storage-open",{originalErrorMessage:(s=r.target.error)===null||s===void 0?void 0:s.message}))},t.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Yr,{keyPath:"compositeKey"})}}}catch(t){e(He.create("storage-open",{originalErrorMessage:t?.message}))}}),Fs)}function OI(n){return hp(dp(n))}function LI(n,e){return up(dp(n),e)}function xI(n){return up(cp,n)}function MI(){return hp(cp)}async function up(n,e){const r=(await lp()).transaction(Yr,"readwrite"),i=r.objectStore(Yr).put({compositeKey:n,value:e});return new Promise((a,c)=>{i.onsuccess=u=>{a()},r.onerror=u=>{var d;c(He.create("storage-set",{originalErrorMessage:(d=u.target.error)===null||d===void 0?void 0:d.message}))}})}async function hp(n){const t=(await lp()).transaction(Yr,"readonly"),s=t.objectStore(Yr).get(n);return new Promise((i,a)=>{s.onsuccess=c=>{const u=c.target.result;i(u?u.value:void 0)},t.onerror=c=>{var u;a(He.create("storage-get",{originalErrorMessage:(u=c.target.error)===null||u===void 0?void 0:u.message}))}})}function dp(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr=new Ni("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FI(n){if(Va()){let e;try{e=await OI(n)}catch(t){Jr.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function Go(n,e){return Va()?LI(n,e).catch(t=>{Jr.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function UI(){let n;try{n=await MI()}catch{}if(n)return n;{const e=crypto.randomUUID();return xI(e).catch(t=>Jr.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vc(){return io().enabled}async function Oc(){const n=io();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function $I(){const n=xh(),e=io();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new Mr;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(UI())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BI={error:"UNKNOWN_ERROR"};function jI(n){return Da.encodeString(JSON.stringify(n),!1)}async function Ra(n,e=!1){const t=n.app;Nc(t);const r=be(t);let s=r.token,i;if(s&&!Vn(s)&&(r.token=void 0,s=void 0),!s){const u=await r.cachedTokenPromise;u&&(Vn(u)?s=u:await Go(t,void 0))}if(!e&&s&&Vn(s))return{token:s.token};let a=!1;if(Vc()){r.exchangeTokenPromise||(r.exchangeTokenPromise=Dc(ap(t,await Oc()),n.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const u=await r.exchangeTokenPromise;return await Go(t,u),r.token=u,{token:u.token}}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),s=await be(t).exchangeTokenPromise}catch(u){u.code==="appCheck/throttled"?Jr.warn(u.message):Jr.error(u),i=u}let c;return s?i?Vn(s)?c={token:s.token,internalError:i}:c=wh(i):(c={token:s.token},r.token=s,await Go(t,s)):c=wh(i),a&&mp(t,c),c}async function qI(n){const e=n.app;Nc(e);const{provider:t}=be(e);if(Vc()){const r=await Oc(),{token:s}=await Dc(ap(e,r),n.heartbeatServiceProvider);return{token:s}}else{const{token:r}=await t.getToken();return{token:r}}}function fp(n,e,t,r){const{app:s}=n,i=be(s),a={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,a],i.token&&Vn(i.token)){const c=i.token;Promise.resolve().then(()=>{t({token:c.token}),vh(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>vh(n))}function pp(n,e){const t=be(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function vh(n){const{app:e}=n,t=be(e);let r=t.tokenRefresher;r||(r=zI(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function zI(n){const{app:e}=n;return new CI(async()=>{const t=be(e);let r;if(t.token?r=await Ra(n,!0):r=await Ra(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const t=be(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},_h.RETRIAL_MIN_WAIT,_h.RETRIAL_MAX_WAIT)}function mp(n,e){const t=be(n).tokenObservers;for(const r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Vn(n){return n.expireTimeMillis-Date.now()>0}function wh(n){return{token:jI(BI),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HI{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=be(this.app);for(const t of e)pp(this.app,t.next);return Promise.resolve()}}function WI(n,e){return new HI(n,e)}function GI(n){return{getToken:e=>Ra(n,e),getLimitedUseToken:()=>qI(n),addTokenListener:e=>fp(n,"INTERNAL",e),removeTokenListener:e=>pp(n.app,e)}}const KI="@firebase/app-check",QI="0.8.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YI="https://www.google.com/recaptcha/api.js";function JI(n,e){const t=new Mr,r=be(n);r.reCAPTCHAState={initialized:t};const s=XI(n),i=yh(!1);return i?Eh(n,e,i,s,t):tT(()=>{const a=yh(!1);if(!a)throw new Error("no recaptcha");Eh(n,e,a,s,t)}),t.promise}function Eh(n,e,t,r,s){t.ready(()=>{eT(n,e,t,r),s.resolve(t)})}function XI(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function ZI(n){Nc(n);const t=await be(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=be(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function eT(n,e,t,r){const s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{be(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{be(n).reCAPTCHAState.succeeded=!1}}),i=be(n);i.reCAPTCHAState=Object.assign(Object.assign({},i.reCAPTCHAState),{widgetId:s})}function tT(n){const e=document.createElement("script");e.src=YI,e.onload=n,document.head.appendChild(e)}/**
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
 */class Lc{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;rT(this._throttleData);const s=await ZI(this._app).catch(a=>{throw He.create("recaptcha-error")});if(!(!((e=be(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw He.create("recaptcha-error");let i;try{i=await Dc(NI(this._app,s),this._heartbeatServiceProvider)}catch(a){throw!((t=a.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=nT(Number((r=a.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),He.create("throttled",{time:op(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):a}return this._throttleData=null,i}initialize(e){this._app=e,this._heartbeatServiceProvider=ns(e,"heartbeat"),JI(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Lc?this._siteKey===e._siteKey:!1}}function nT(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+SI,httpStatus:n};{const t=e?e.backoffCount:0,r=zm(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function rT(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw He.create("throttled",{time:op(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sT(n=La(),e){n=ye(n);const t=ns(n,"app-check");if(io().initialized||$I(),Vc()&&Oc().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return s;throw He.create("already-initialized",{appName:n.name})}const r=t.initialize({options:e});return iT(n,e.provider,e.isTokenAutoRefreshEnabled),be(n).isTokenAutoRefreshEnabled&&fp(r,"INTERNAL",()=>{}),r}function iT(n,e,t){const r=AI(n,Object.assign({},sp));r.activated=!0,r.provider=e,r.cachedTokenPromise=FI(n).then(s=>(s&&Vn(s)&&(r.token=s,mp(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t===void 0?n.automaticDataCollectionEnabled:t,r.provider.initialize(n)}const oT="app-check",Ih="app-check-internal";function aT(){jt(new gt(oT,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return WI(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(Ih).initialize()})),jt(new gt(Ih,n=>{const e=n.getProvider("app-check").getImmediate();return GI(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),pt(KI,QI)}aT();const cT={apiKey:"AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",authDomain:"altorra-cars.firebaseapp.com",databaseURL:"https://altorra-cars-default-rtdb.firebaseio.com",projectId:"altorra-cars",storageBucket:"altorra-cars.firebasestorage.app",messagingSenderId:"235148219730",appId:"1:235148219730:web:ceabdbc52fdcbe8b85168b",measurementId:"G-ZGZ6CVTB73"},lT="altorra-crm",xc=jh(cT,lT);sT(xc,{provider:new Lc("6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS"),isTokenAutoRefreshEnabled:!0});const Ti=uv(xc),de=oI(xc);function Or(n){const e=q.get().permissions||[];return e.includes("*")||e.includes(n)}function uT(n){return n?n.rol==="super_admin"||n.roleId==="system_super_admin"?["*"]:Array.isArray(n.permissions)&&n.permissions.length?n.permissions.slice():[]:[]}async function hT(n){try{const e=await tp(ct(de,"usuarios",n.uid)),t=e.exists()?e.data():null;q.set({user:n,profile:t,permissions:uT(t),ready:!0,authError:null})}catch(e){console.warn("[auth] no se pudo hidratar el perfil:",e),q.set({user:n,profile:null,permissions:[],ready:!0})}}function dT(){Y_(Ti,_d).catch(()=>{}),Z_(Ti,n=>{n?hT(n):q.set({user:null,profile:null,permissions:[],ready:!0})})}const fT={"auth/invalid-email":"Correo inválido.","auth/user-disabled":"Esta cuenta está deshabilitada.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/wrong-password":"Contraseña incorrecta.","auth/invalid-credential":"Credenciales incorrectas.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet."};async function pT(n,e){q.set({authError:null});try{await Q_(Ti,String(n).trim(),e)}catch(t){const r=fT[t&&t.code]||"No se pudo iniciar sesión.";throw q.set({authError:r}),t}}async function mT(){if(q.get().mock){q.set({user:null,profile:null,permissions:[]});return}await ey(Ti)}function Ko(){const{profile:n,user:e}=q.get();return n&&(n.nombre||n.roleName)||e&&(e.displayName||e.email)||"Usuario"}function gT(){const{profile:n}=q.get();return n&&(n.cargo||n.roleName)||"Asesor"}const _T=["bandeja","pipeline","agenda","reportes","contactos"];function gp(){const n=(location.hash||"").replace(/^#\/?/,""),[e]=n.split("/");return _T.includes(e)?e:"bandeja"}function yT(n){location.hash!==`#/${n}`&&(location.hash=`#/${n}`)}function vT(n){const e=()=>n(gp());return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}function f(n,e={},t=[]){const r=document.createElement(n);for(const[s,i]of Object.entries(e))i==null||i===!1||(s==="class"?r.className=i:s==="html"?r.innerHTML=i:s==="text"?r.textContent=i:s==="dataset"?Object.assign(r.dataset,i):s==="style"&&typeof i=="object"?Object.assign(r.style,i):s.startsWith("on")&&typeof i=="function"?r.addEventListener(s.slice(2).toLowerCase(),i):r.setAttribute(s,i===!0?"":String(i)));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function ue(n){for(;n&&n.firstChild;)n.removeChild(n.firstChild);return n}let Un=null;function _p(n){Un&&!Un.contains(n.target)&&Ai()}function yp(n){n.key==="Escape"&&Ai()}function Ai(){Un&&(Un.remove(),Un=null,document.removeEventListener("mousedown",_p,!0),window.removeEventListener("keydown",yp,!0))}function un(n,e,t,r={}){Ai();const s=f("div",{class:"popover",role:"menu"});r.title&&s.append(f("div",{class:"popover__title",text:r.title})),e.forEach(a=>{if(a.divider){s.append(f("div",{class:"popover__divider"}));return}const c=f("button",{class:"popover__item"+(a.active?" is-active":""),type:"button",role:"menuitem"},[a.icon?f("span",{class:"popover__icon",text:a.icon}):null,f("span",{class:"u-grow u-truncate",text:a.label}),a.hint?f("span",{class:"popover__hint u-caption",text:a.hint}):null]);c.addEventListener("click",u=>{u.stopPropagation(),Ai(),t(a)}),s.append(c)}),document.body.append(s),wT(s,n),Un=s,setTimeout(()=>{document.addEventListener("mousedown",_p,!0),window.addEventListener("keydown",yp,!0)},0);const i=s.querySelector(".popover__item");i&&i.focus()}function wT(n,e){const t=e.getBoundingClientRect(),r=n.offsetWidth,s=n.offsetHeight;let i=t.bottom+6,a=t.right-r;a<8&&(a=8),a+r>window.innerWidth-8&&(a=window.innerWidth-r-8),i+s>window.innerHeight-8&&(i=t.top-s-6),n.style.top=`${Math.max(8,i)}px`,n.style.left=`${Math.max(8,a)}px`}function ds(n){const e=String(n||"").trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():"?"}function ET(n){return String(n||"").replace(/\D/g,"")}function vp(n,e){const t=ET(n);if(!t)return"";const r=e?"?text="+encodeURIComponent(e):"";return"https://wa.me/"+t+r}function wp(n){if(!n)return 1/0;const e=new Date(n).getTime();return Number.isNaN(e)?1/0:Date.now()-e}function Xn(n){const e=wp(n);return e===1/0?1/0:e/864e5}function $n(n){const e=wp(n);if(e===1/0)return"—";const t=Math.floor(e/6e4);if(t<1)return"ahora";if(t<60)return`hace ${t} min`;const r=Math.floor(t/60);if(r<24)return`hace ${r} h`;const s=Math.floor(r/24);return s===1?"ayer":s<7?`hace ${s} d`:new Date(n).toLocaleDateString("es-CO",{day:"numeric",month:"short"})}function IT(n){if(!n)return"—";const e=new Date(n);return Number.isNaN(e.getTime())?"—":e.toLocaleString("es-CO",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Qo(n){const e=Math.abs(n),t=Math.round(e/6e4);if(t<60)return`${t} min`;const r=Math.floor(t/60),s=t%60;return s?`${r} h ${s} min`:`${r} h`}function Pr(n){const e=Number(n)||0;if(!e)return"";if(e>=1e6){const t=e/1e6;return"$"+(t%1?t.toFixed(1).replace(".",","):t.toFixed(0))+" M"}return e>=1e3?"$"+Math.round(e/1e3)+" K":"$"+e}function bi(n){return String(n||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"")}const TT="0.4.1",AT=[{id:"bandeja",label:"Bandeja",icon:"📥",ready:!0},{id:"pipeline",label:"Pipeline",icon:"🎯",ready:!0},{id:"agenda",label:"Agenda",icon:"📅",ready:!0},{id:"reportes",label:"Reportes",icon:"📊",ready:!0},{id:"contactos",label:"Contactos",icon:"👤",ready:!0}],Yo={bandeja:"Bandeja Inteligente",pipeline:"Pipeline de ventas",agenda:"Agenda",reportes:"Reportes y KPIs",contactos:"Contactos"};function bT(n){const e={},t=f("div",{class:"sidebar__brand"},[f("span",{class:"sidebar__logo",text:"ALTORRA"}),f("span",{class:"sidebar__sub u-caption",text:"CRM"})]),r=f("nav",{class:"sidebar__nav","aria-label":"Secciones"});AT.forEach(C=>{const P=f("button",{class:"navitem",type:"button",disabled:!C.ready},[f("span",{class:"navitem__icon","aria-hidden":"true",text:C.icon}),f("span",{class:"navitem__label",text:C.label}),C.ready?null:f("span",{class:"navitem__soon",text:"Pronto"})]);C.ready&&P.addEventListener("click",()=>yT(C.id)),e[C.id]=P,r.append(P)});const s=f("aside",{class:"sidebar"},[t,r,f("div",{class:"sidebar__foot u-caption u-faint"},[`v${TT} · Fase 4`])]),i=f("h1",{class:"topbar__h",text:Yo.bandeja}),a=f("span",{class:"topbar__crumb u-caption u-faint",text:q.get().mock?"modo demo":"tiempo real"}),c=f("div",{class:"topbar__title"},[i,a]),u=f("button",{class:"icon-btn",type:"button","aria-label":"Cambiar tema"},[f("span",{"aria-hidden":"true",text:q.get().theme==="dark"?"☀️":"🌙"})]);u.addEventListener("click",()=>{const C=gm();u.firstChild.textContent=C==="dark"?"☀️":"🌙"});const d=f("button",{class:"usermenu",type:"button","aria-haspopup":"menu"},[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ds(Ko())}),f("span",{class:"usermenu__meta"},[f("span",{class:"usermenu__name u-truncate",text:Ko()}),f("span",{class:"usermenu__role u-caption u-faint u-truncate",text:gT()})])]);d.addEventListener("click",()=>{un(d,[{value:"logout",label:"Cerrar sesión",icon:"🚪"}],C=>{C.value==="logout"&&mT()},{title:Ko()})});const g=f("header",{class:"topbar"},[c,f("div",{class:"topbar__actions u-row"},[u,d])]),I=f("main",{class:"outlet",id:"outlet"}),T=f("div",{id:"detail-root"}),R=f("div",{class:"app-shell"},[s,f("div",{class:"app-main"},[g,I]),T]);ue(n),n.removeAttribute("aria-busy"),n.append(R);function N(C){Object.entries(e).forEach(([P,B])=>{const L=P===C;B.classList.toggle("is-active",L),L?B.setAttribute("aria-current","page"):B.removeAttribute("aria-current")}),i.textContent=Yo[C]||Yo.bandeja}return{outlet:I,detailRoot:T,setActive:N}}function RT(n){const e=f("input",{class:"input",type:"email",placeholder:"correo@altorracars.com",autocomplete:"username",required:!0,"aria-label":"Correo"}),t=f("input",{class:"input",type:"password",placeholder:"Contraseña",autocomplete:"current-password",required:!0,"aria-label":"Contraseña"}),r=f("div",{class:"login__error",role:"alert",hidden:!0}),s=f("button",{class:"btn btn--gold btn--block",type:"submit"},["Entrar"]),i=f("form",{class:"login__form"},[f("label",{class:"field"},[f("span",{class:"field__label",text:"Correo"}),e]),f("label",{class:"field"},[f("span",{class:"field__label",text:"Contraseña"}),t]),r,s]);i.addEventListener("submit",async c=>{c.preventDefault(),r.hidden=!0,s.disabled=!0,s.textContent="Entrando…";try{await pT(e.value,t.value)}catch{r.textContent=q.get().authError||"No se pudo iniciar sesión.",r.hidden=!1,s.disabled=!1,s.textContent="Entrar"}});const a=f("div",{class:"login surface"},[f("div",{class:"login__brand"},[f("span",{class:"login__logo",text:"ALTORRA"}),f("span",{class:"login__tag u-caption u-faint",text:"CRM · Bandeja Inteligente"})]),f("h1",{class:"login__title",text:"Bienvenido"}),f("p",{class:"login__lead u-muted",text:"Inicia sesión para gestionar tus clientes."}),i,f("div",{class:"login__foot u-caption u-faint",text:"Acceso restringido al equipo de Altorra Cars."})]);ue(n),n.removeAttribute("aria-busy"),n.append(f("div",{class:"login-wrap"},[a])),setTimeout(()=>e.focus(),50)}const ST=()=>document.getElementById("toast-root"),Th={ok:"✓",error:"⚠",info:"ℹ"};function se(n,e="info",t=3200){const r=ST();if(!r)return;const s=document.createElement("div");s.className=`toast toast--${e}`,s.setAttribute("role",e==="error"?"alert":"status");const i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.textContent=Th[e]||Th.info;const a=document.createElement("span");a.className="u-grow",a.textContent=n,s.append(i,a),r.appendChild(s);const c=()=>{s.classList.add("is-leaving"),s.addEventListener("animationend",()=>s.remove(),{once:!0})},u=setTimeout(c,t);s.addEventListener("click",()=>{clearTimeout(u),c()})}const CT=["financiacion","financiación","compra","test_drive","test-drive","cotizacion","cotización"],PT=["cita","test_drive","test-drive","visita","agendar","peritaje"],kT=["financiacion","financiación","consignacion","consignación","consignacion_venta","compra","venta","cotizacion","cotización"],NT=["pqr","reclamo","queja","peticion","petición","garantia","garantía","soporte"],DT={cita:{label:"Cita",icon:"📅",badge:"info"},solicitud:{label:"Solicitud",icon:"📝",badge:"gold"},pqr:{label:"PQR",icon:"⚠️",badge:"danger"},lead:{label:"Lead",icon:"✨",badge:""}};function oo(n){const e=String(n.sourceDetail||"").toLowerCase(),t=String(n.source||"").toLowerCase();let r="lead";return NT.some(s=>e.includes(s)||t.includes(s))?r="pqr":t.includes("cita")||PT.some(s=>e.includes(s))?r="cita":kT.some(s=>e.includes(s))&&(r="solicitud"),{type:r,...DT[r]}}function Mc(n){const e=String(n.sourceDetail||"").toLowerCase();return CT.some(t=>e.includes(t))||!!n.vehicleOfInterestId}const VT={whatsapp:{label:"WhatsApp",icon:"🟢"},facebook:{label:"Facebook",icon:"📘"},instagram:{label:"Instagram",icon:"📸"},tiktok:{label:"TikTok",icon:"🎵"},marketplace:{label:"Marketplace",icon:"🛒"},llamada:{label:"Llamada",icon:"📞"},presencial:{label:"Presencial",icon:"🏬"},referido:{label:"Referido",icon:"🤝"},bot:{label:"ALTOR Bot",icon:"🤖"},cuenta:{label:"Cuenta",icon:"👤"},newsletter:{label:"Newsletter",icon:"✉️"},cita:{label:"Cita web",icon:"📅"},web:{label:"Web",icon:"🌐"}};function Xr(n){const e=String(n.source||"").toLowerCase();let t="web";return e.includes("whatsapp")||e.includes("wsp")||e.includes("wa.me")?t="whatsapp":e.includes("facebook")||e.includes("meta")||e==="fb"?t="facebook":e.includes("instagram")||e==="ig"?t="instagram":e.includes("tiktok")||e==="tt"?t="tiktok":e.includes("marketplace")||e.includes("mercadolibre")||e.includes("tucarro")?t="marketplace":e.includes("llamada")||e.includes("telefono")||e.includes("teléfono")||e.includes("call")?t="llamada":e.includes("presencial")||e.includes("walk")||e.includes("showroom")||e.includes("local")?t="presencial":e.includes("referido")||e.includes("referral")||e.includes("recomendado")?t="referido":e.includes("bot")||e.includes("concierge")||e.includes("altor")?t="bot":e.includes("cuenta")||e.includes("registro")||e.includes("account")||e.includes("signup")?t="cuenta":e.includes("news")||e.includes("subscri")||e.includes("suscri")?t="newsletter":e.includes("cita")&&(t="cita"),{key:t,...VT[t]}}const OT=[{id:"whatsapp",label:"WhatsApp",icon:"🟢"},{id:"facebook",label:"Facebook (Meta)",icon:"📘"},{id:"instagram",label:"Instagram",icon:"📸"},{id:"tiktok",label:"TikTok",icon:"🎵"},{id:"marketplace",label:"Marketplace",icon:"🛒"},{id:"llamada",label:"Llamada",icon:"📞"},{id:"presencial",label:"Presencial / Showroom",icon:"🏬"},{id:"referido",label:"Referido",icon:"🤝"},{id:"web",label:"Web (otro)",icon:"🌐"}],LT=[{id:"compra",label:"Compra"},{id:"financiacion",label:"Financiación"},{id:"cita",label:"Cita / Test drive"},{id:"consignacion_venta",label:"Vende su carro"},{id:"peritaje",label:"Peritaje"},{id:"consulta",label:"Consulta general"}],Us={cita:30*60*1e3,pqr:60*60*1e3,solicitud:2*60*60*1e3,lead:24*60*60*1e3};function Ep(n){const e=Zn(n.status),{type:t}=oo(n);let r=n.slaDueAt?new Date(n.slaDueAt).getTime():null;r||(r=(n.createdAt?new Date(n.createdAt).getTime():Date.now())+(Us[t]||Us.lead));const s=r-Date.now(),i=Us[t]||Us.lead;let a="ok";return e?a="ok":s<=0?a="late":s<i*.25&&(a="warn"),{state:a,dueAt:r,remainingMs:s,closed:e}}const Sa=[{id:"nuevo",label:"Nuevo",badge:"gold"},{id:"contactado",label:"Contactado",badge:"info"},{id:"calificado",label:"Calificado",badge:"ok"},{id:"no_calificado",label:"No calificado",badge:""},{id:"convertido",label:"Convertido",badge:"ok"},{id:"perdido",label:"Perdido",badge:"danger"}],xT=Sa.reduce((n,e)=>(n[e.id]=e,n),{});function Zs(n){return xT[n]||{id:n||"nuevo",label:n||"Nuevo",badge:""}}function Zn(n){return n==="convertido"||n==="perdido"||n==="no_calificado"}function Ip(n){return!n.status||n.status==="nuevo"}const Ca={intent:.3,interactions:.18,recency:.22,frequency:.12,economic:.07,age:.06,engagement:.05},an=n=>Math.max(0,Math.min(1,n));function MT(n){const e=String(n.sourceDetail||"").toLowerCase();let t=.25;return Mc(n)?t=1:/(consignacion|consignación|peritaje|venta)/.test(e)?t=.6:(/(consulta|info|general)/.test(e)||!e)&&(t=.3),n.vehicleOfInterestId&&(t=Math.min(1,t+.15)),an(t)}function FT(n){let e=0;for(const t of n){const r=`${t.subject||""} ${t.body||""}`;if(!/financ/i.test(r))continue;const s=(r.match(/\d[\d.,]{5,}/g)||[]).map(i=>parseInt(i.replace(/\D/g,""),10)).filter(i=>i>0);s.length&&(e=Math.max(e,Math.max(...s)/5e7))}return an(e)}function UT(n){const e=new Set;for(const t of n){const r=t.createdAt;r&&(Xn(r)>30||e.add(String(r).slice(0,10)))}return an(e.size/8)}function Tp(n,e=[],t=null){const r=Array.isArray(e)?e:[],s={intent:MT(n),interactions:an(r.length/6),recency:n.lastActivityAt?an(1-Xn(n.lastActivityAt)/30):0,frequency:UT(r),economic:FT(r),age:n.createdAt?an(Xn(n.createdAt)/60):0,engagement:t&&Number(t.score)?an(t.score/100):0};let i=0;for(const c of Object.keys(Ca))i+=s[c]*Ca[c];const a=Math.round(i*100);return{score:a,rating:$T(a),factors:s}}function $T(n){return n>=70?"hot":n>=40?"warm":"cold"}const Bn={hot:{label:"Caliente",icon:"🔥",cls:"temp--hot"},warm:{label:"Tibio",icon:"🌤️",cls:"temp--warm"},cold:{label:"Frío",icon:"❄️",cls:"temp--cold"}},Ah={intent:"Intención",interactions:"Interacciones",recency:"Recencia",frequency:"Frecuencia",economic:"Capacidad econ.",age:"Antigüedad",engagement:"Engagement"},BT=Ca;function Ap(n,e={}){const t=Number(e.score)||0,{type:r}=oo(n),s=Xn(n.createdAt),i=Xn(n.lastActivityAt),a=Ip(n),c=Zn(n.status),u=[{id:"confirm_appointment",priority:95,when:r==="cita"&&!c&&a,label:"Confirmar cita",reason:"Cita pendiente de confirmación",icon:"📅"},{id:"reach_hot_lead",priority:90,when:t>=70&&a&&!c,label:"Contactar ya",reason:"Lead caliente sin respuesta",icon:"🔥"},{id:"send_quote",priority:88,when:Mc(n)&&t>=55&&!c,label:"Enviar cotización",reason:"Interés de compra/financiación",icon:"🧾"},{id:"assign_asesor",priority:85,when:!n.ownerId&&!c,label:"Asignar asesor",reason:"Sin asesor asignado",icon:"🙋"},{id:"first_touch",priority:70,when:a&&s<2&&!c,label:"Primer contacto",reason:"Lead nuevo sin trabajar",icon:"👋"},{id:"whatsapp_followup",priority:60,when:t>=40&&t<70&&i>=2&&i<30&&!c,label:"Seguimiento WhatsApp",reason:"Lead tibio enfriándose",icon:"💬"},{id:"reactivate",priority:50,when:i>=30&&i!==1/0&&!c,label:"Reactivar con oferta",reason:"Inactivo +30 días",icon:"🎯"},{id:"nurture",priority:15,when:!c,label:"Nutrir relación",reason:"Sin acción urgente",icon:"🌱"},{id:"archived",priority:5,when:c,label:"Cerrado",reason:"Lead cerrado",icon:"✅"}],g=u.filter(I=>I.when).sort((I,T)=>T.priority-I.priority)[0]||u[u.length-1];return{id:g.id,label:g.label,reason:g.reason,icon:g.icon,priority:g.priority}}function bp(n,e=[]){const{score:t,rating:r,factors:s}=Tp(n,e,null);return{...n,_score:t,_rating:r,_factors:s,_type:oo(n),_channel:Xr(n),_sla:Ep(n),_nba:Ap(n,{score:t})}}function $s(n){return n.map(e=>bp(e))}const Pa=[{id:"calientes",label:"Calientes sin contestar",icon:"🔥"},{id:"mios",label:"Mis asignados",icon:"👤"},{id:"sin_asignar",label:"Sin asignar",icon:"🆕"},{id:"todo",label:"Todo",icon:"📥"}];function Rp(n,e,t){switch(e){case"calientes":return Ip(n)&&!Zn(n.status)&&(n._rating==="hot"||Mc(n));case"mios":return n.ownerId===t;case"sin_asignar":return!n.ownerId&&!Zn(n.status);case"todo":default:return!0}}function jT(n,e){const t={};for(const r of Pa)t[r.id]=0;for(const r of n)for(const s of Pa)Rp(r,s.id,e)&&t[s.id]++;return t}const Bs={late:0,warn:1,ok:2};function qT(n,e){const t=n._sla&&n._sla.state||"ok",r=e._sla&&e._sla.state||"ok";return Bs[t]!==Bs[r]?Bs[t]-Bs[r]:e._score!==n._score?e._score-n._score:new Date(e.createdAt||0)-new Date(n.createdAt||0)}function zT(n,{type:e,channel:t,status:r}){return n.filter(s=>!(e&&s._type.type!==e||t&&s._channel.key!==t||r&&(s.status||"nuevo")!==r))}function HT(n,e){const t=bi(e).trim();return t?n.filter(r=>bi([r.fullName,r.email,r.phone,r.sourceDetail,r.source].join(" ")).includes(t)):n}function WT(n,e=Date.now()){if((n.status||"nuevo")!=="nuevo")return null;const t=new Date(n.createdAt||0).getTime();if(!t)return null;const r=Math.max(0,Math.floor((e-t)/6e4));return{mins:r,state:r>=60?"late":r>=45?"warn":"ok"}}function GT(n,{queue:e,uid:t,filters:r,search:s,showClosed:i=!1}){let a=n.filter(u=>Rp(u,e,t));a=zT(a,r),a=HT(a,s);let c=0;if(!i&&!r.status){const u=a.filter(d=>!Zn(d.status));c=a.length-u.length,a=u}return a.sort(qT),{rows:a,hiddenClosed:c}}const Fc=()=>new Date().toISOString(),Sp=n=>({id:n.id,...n.data()});function KT({pageSize:n=40,onData:e,onError:t}){let r=null;const s=Et(Ne(de,"leads"),It("createdAt","desc"),Qt(n));return{unsubscribe:hs(s,a=>{const c=a.docs.map(Sp);r=a.docs[a.docs.length-1]||null,e(c,{hasMore:a.size>=n})},a=>{t&&t(a)}),getLastDoc:()=>r}}async function QT({pageSize:n=40,after:e}){if(!e)return{rows:[],lastDoc:null,hasMore:!1};const t=Et(Ne(de,"leads"),It("createdAt","desc"),gI(e),Qt(n)),r=await Qr(t);return{rows:r.docs.map(Sp),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.size>=n}}async function YT(){const e=(await Qr(Ne(de,"usuarios"))).docs.map(t=>{const r=t.data();return{uid:t.id,nombre:r.nombre||r.email||"Usuario",cargo:r.cargo||r.roleName||""}}).sort((t,r)=>t.nombre.localeCompare(r.nombre,"es"));return q.set({team:e}),e}async function JT(n,e){await vn(ct(de,"leads",n),{ownerId:e?e.uid:null,ownerName:e?e.nombre:null,updatedAt:Fc(),updatedBy:Ri(),_version:En(1)})}async function XT(n,e,t={}){if(t&&t.convertedTo&&t.convertedTo.dealId)throw new Error("Este lead ya es un negocio: gestiónalo en el Pipeline.");const r=Fc();await vn(ct(de,"leads",n),{status:e,lastActivityAt:r,updatedAt:r,updatedBy:Ri(),_version:En(1)}),await wn(Ne(de,"activities"),{type:"status_change",subject:"Cambio de estado → "+e,body:"",status:"closed",direction:"outbound",relatedTo:{type:"lead",id:n,name:t.fullName||""},ownerId:Ri(),createdAt:r,_version:1})}async function ZT(n,{type:e="nota",subject:t="",body:r="",direction:s="outbound",name:i=""}){await wn(Ne(de,"activities"),{type:e,subject:t,body:r,status:"closed",direction:s,relatedTo:{type:"lead",id:n,name:i},ownerId:Ri(),createdAt:Fc(),_version:1})}function Ri(){const n=q.get().user;return n?n.uid:null}const eA="ventas",ao=[{id:"nuevo",label:"Nuevo",prob:.1},{id:"contactado",label:"Contactado",prob:.2},{id:"cita_agendada",label:"Cita agendada",prob:.35},{id:"visito",label:"Visitó",prob:.5},{id:"test_drive",label:"Test drive",prob:.65},{id:"negociacion",label:"Negociación",prob:.8},{id:"financiacion",label:"Financiación",prob:.9},{id:"vendido",label:"Vendido",prob:1,won:!0}],tA={id:"perdido",label:"Perdido",prob:0,lost:!0},Lr=ao.filter(n=>!n.won),Cp=[...ao,tA].reduce((n,e)=>(n[e.id]=e,n),{});function Pp(n){return Cp[n]||ao[0]}function Si(n){const e=Cp[n];return e?e.prob:0}function Uc(n){return Math.round((Number(n.amount)||0)*Si(n.stageId))}function kp(n){return n.reduce((e,t)=>e+(t.status==="open"?Uc(t):0),0)}function nA(n){return n.reduce((e,t)=>e+(t.status==="open"&&Number(t.amount)||0),0)}function rA(n,e=14){return n.status==="open"&&Xn(n.lastActivityAt)>e}function sA(n){const e={};for(const t of Lr)e[t.id]=[];for(const t of n)t.status==="open"&&(e[t.stageId]||(e[t.stageId]=[])).push(t);return e}function $c(n){const e=n.vehicleOfInterestId||"",t=ao[0];return{name:(n.fullName||"Oportunidad")+(e?" · "+e:""),contactId:n.contactId||null,contactName:n.fullName||"",leadId:n.id||null,vehicleId:e||null,vehicleName:e||"",pipelineId:eA,stageId:t.id,stageName:t.label,status:"open",amount:0,currency:"COP",probability:t.prob,weightedAmount:0,expectedCloseDate:null,ownerId:n.ownerId||null,ownerName:n.ownerName||null,source:n.source||"web",nextStep:""}}const cr=()=>new Date().toISOString(),iA=n=>({id:n.id,...n.data()}),Bt=()=>q.get().user?q.get().user.uid:null;function co(n,e,t){return wn(Ne(de,"activities"),{type:"deal",subject:t,body:"",status:"closed",direction:"outbound",relatedTo:{type:"deal",id:n,name:e||""},ownerId:Bt(),createdAt:cr(),_version:1})}function oA({pageSize:n=100,onData:e,onError:t}){const r=Et(Ne(de,"deals"),Ii("status","==","open"),It("lastActivityAt","desc"),Qt(n));return hs(r,s=>e(s.docs.map(iA)),s=>t&&t(s))}async function Np(n){const e=cr(),t=$c(n),r=await wn(Ne(de,"deals"),{...t,weightedAmount:0,lastActivityAt:e,createdAt:e,updatedAt:e,createdBy:Bt(),updatedBy:Bt(),_version:1});return await vn(ct(de,"leads",n.id),{status:"convertido",convertedTo:{dealId:r.id},lastActivityAt:e,updatedAt:e,updatedBy:Bt(),_version:En(1)}),await co(r.id,t.contactName,"Oportunidad creada desde lead"),r.id}async function aA(n,e,t={}){const r=cr(),s=Pp(e);await vn(ct(de,"deals",n),{stageId:e,stageName:s.label,probability:s.prob,weightedAmount:Math.round((Number(t.amount)||0)*s.prob),lastActivityAt:r,updatedAt:r,updatedBy:Bt(),_version:En(1)}),await co(n,t.contactName,"Etapa → "+s.label)}async function cA(n,e,t={}){const r=cr(),s=Math.max(0,Math.round(Number(e)||0));await vn(ct(de,"deals",n),{amount:s,weightedAmount:Math.round(s*Si(t.stageId)),updatedAt:r,updatedBy:Bt(),_version:En(1)})}async function lA(n,e={}){const t=cr();await vn(ct(de,"deals",n),{status:"won",stageId:"vendido",stageName:"Vendido",probability:1,weightedAmount:Number(e.amount)||0,lastActivityAt:t,updatedAt:t,updatedBy:Bt(),_version:En(1)}),await co(n,e.contactName,"🎉 Venta GANADA")}async function uA(n,e,t={}){const r=cr();await vn(ct(de,"deals",n),{status:"lost",stageId:"perdido",stageName:"Perdido",probability:0,weightedAmount:0,lostReason:String(e||"").trim()||"Sin motivo",lastActivityAt:r,updatedAt:r,updatedBy:Bt(),_version:En(1)}),await co(n,t.contactName,"Perdido: "+(e||"sin motivo"))}async function hA(n){const e=q.get().user?q.get().user.uid:null,t=["manual",n.trafico,n.campana].filter(Boolean);return(await wn(Ne(de,"solicitudes"),{nombre:n.nombre||"",email:(n.email||"").trim().toLowerCase(),telefono:n.telefono||"",prefijoPais:n.prefijoPais||"+57",origen:n.canal||"manual",tipo:n.interes||"consulta",vehiculoId:n.vehiculoId||null,kind:"lead",comentarios:n.notas||"",consentGiven:n.consentGiven===!0,tags:t,source:{page:"manual",campaign:n.campana||null,traffic:n.trafico||null},clientCategory:"manual",createdAt:new Date().toISOString(),_manual:!0,_createdByUid:e})).id}const cn=n=>new Date(Date.now()-n*6e4).toISOString(),_e=n=>cn(n*60),Y=n=>cn(n*60*24),dA=[{uid:"u_ceo",nombre:"Rodrigo (CEO)",cargo:"CEO"},{uid:"u_ana",nombre:"Ana Restrepo",cargo:"Asesora comercial"},{uid:"u_luis",nombre:"Luis Pérez",cargo:"Asesor comercial"}],Bc=[{id:"l1",fullName:"María Fernanda Gómez",email:"mafe.gomez@gmail.com",phone:"+573012345678",source:"financiacion",sourceDetail:"financiacion",vehicleOfInterestId:"mazda-cx5-2021",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:cn(-40),contactId:"email_mafe_gomez_gmail_com",createdAt:cn(18),lastActivityAt:cn(18),_version:1},{id:"l2",fullName:"Carlos Andrés Salcedo",email:"casalcedo@outlook.com",phone:"+573159876543",source:"cita",sourceDetail:"test_drive",vehicleOfInterestId:"toyota-corolla-2022",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:cn(5),contactId:"email_casalcedo_outlook_com",createdAt:_e(1),lastActivityAt:_e(1),_version:1},{id:"l3",fullName:"Diana Ramírez",email:"diana.r@hotmail.com",phone:"+573201112233",source:"web",sourceDetail:"compra",vehicleOfInterestId:"chevrolet-tracker-2023",status:"contactado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:_e(-1),contactId:"email_diana_r_hotmail_com",createdAt:_e(5),lastActivityAt:_e(2),_version:2},{id:"l4",fullName:"Jhon Jairo Mosquera",email:"",phone:"+573044455667",source:"whatsapp",sourceDetail:"consulta",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:_e(-3),contactId:"phone_573044455667",createdAt:_e(8),lastActivityAt:_e(8),_version:1},{id:"l5",fullName:"Laura Valentina Ortiz",email:"lauraortiz@gmail.com",phone:"+573186677889",source:"bot",sourceDetail:"financiacion",vehicleOfInterestId:"kia-sportage-2022",status:"contactado",rating:"cold",score:0,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:Y(-1),contactId:"email_lauraortiz_gmail_com",createdAt:Y(1),lastActivityAt:_e(20),_version:3},{id:"l6",fullName:"Pedro Nel Arango",email:"pnarango@empresa.co",phone:"+573017788990",source:"cuenta",sourceDetail:"registro",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Y(-1),contactId:"email_pnarango_empresa_co",createdAt:Y(2),lastActivityAt:Y(2),_version:1},{id:"l7",fullName:"Sofía Mejía",email:"sofia.mejia@gmail.com",phone:"+573123344556",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Y(-3),contactId:"email_sofia_mejia_gmail_com",createdAt:Y(4),lastActivityAt:Y(4),_version:1},{id:"l8",fullName:"Andrés Felipe Cuesta",email:"afcuesta@gmail.com",phone:"+573009988776",source:"web",sourceDetail:"consignacion_venta",vehicleOfInterestId:null,status:"calificado",rating:"cold",score:0,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Y(-2),contactId:"email_afcuesta_gmail_com",createdAt:Y(6),lastActivityAt:Y(1),_version:4},{id:"l9",fullName:"Catalina Ríos",email:"cata.rios@gmail.com",phone:"+573145566778",source:"web",sourceDetail:"peritaje",vehicleOfInterestId:"nissan-frontier-2020",status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:Y(-10),contactId:"email_cata_rios_gmail_com",createdAt:Y(12),lastActivityAt:Y(35),_version:1},{id:"l10",fullName:"Gloria Patiño",email:"glopa@gmail.com",phone:"+573162233445",source:"web",sourceDetail:"reclamo",vehicleOfInterestId:null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:_e(-2),contactId:"email_glopa_gmail_com",createdAt:_e(3),lastActivityAt:_e(3),_version:1},{id:"l11",fullName:"Mauricio Bedoya",email:"mbedoya@gmail.com",phone:"+573024455661",source:"facebook",sourceDetail:"compra",vehicleOfInterestId:"mazda-cx5-2021",status:"convertido",rating:"hot",score:78,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Y(9),contactId:"email_mbedoya_gmail_com",convertedTo:{dealId:"d6"},createdAt:Y(10),lastActivityAt:Y(3),_version:5},{id:"l12",fullName:"Yuliana Castaño",email:"yulycastano@gmail.com",phone:"+573135566779",source:"whatsapp",sourceDetail:"financiacion",vehicleOfInterestId:"toyota-hilux-2020",status:"convertido",rating:"hot",score:82,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:Y(14),contactId:"email_yulycastano_gmail_com",convertedTo:{dealId:"d7"},createdAt:Y(15),lastActivityAt:Y(5),_version:6},{id:"l13",fullName:"Hernán Darío Loaiza",email:"hdloaiza@gmail.com",phone:"+573017788123",source:"web",sourceDetail:"compra",vehicleOfInterestId:"renault-duster-2022",status:"perdido",rating:"warm",score:45,ownerId:"u_ana",ownerName:"Ana Restrepo",slaDueAt:Y(19),contactId:"email_hdloaiza_gmail_com",createdAt:Y(20),lastActivityAt:Y(8),_version:3},{id:"l14",fullName:"Paola Andrea Suárez",email:"pasuarez@gmail.com",phone:"+573156677001",source:"newsletter",sourceDetail:"suscripcion",vehicleOfInterestId:null,status:"no_calificado",rating:"cold",score:12,ownerId:null,ownerName:null,slaDueAt:Y(24),contactId:"email_pasuarez_gmail_com",createdAt:Y(25),lastActivityAt:Y(25),_version:2},{id:"l15",fullName:"Julián Marín",email:"julianmarin@gmail.com",phone:"+573008811223",source:"referido",sourceDetail:"compra",vehicleOfInterestId:"nissan-frontier-2020",status:"convertido",rating:"hot",score:74,ownerId:"u_luis",ownerName:"Luis Pérez",slaDueAt:Y(21),contactId:"email_julianmarin_gmail_com",convertedTo:{dealId:"d8"},createdAt:Y(22),lastActivityAt:Y(9),_version:4}],fA={l1:[{id:"a1",type:"solicitud_inbound",subject:"Nueva solicitud: financiacion",body:"Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},createdAt:cn(18),_version:1}],l3:[{id:"a2",type:"solicitud_inbound",subject:"Nueva solicitud: compra",body:"Interesada en la Chevrolet Tracker.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:_e(5),_version:1},{id:"a3",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:_e(2),_version:1},{id:"a4",type:"status_change",subject:"Cambio de estado → contactado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},createdAt:_e(2),_version:1}],l5:[{id:"a5",type:"solicitud_inbound",subject:"Nueva lead: financiacion",body:"Bot ALTOR: pregunta por financiación de la Kia Sportage.",direction:"inbound",status:"open",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:Y(1),_version:1},{id:"a6",type:"whatsapp",subject:"WhatsApp enviado",body:"",direction:"outbound",status:"closed",relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},createdAt:_e(20),_version:1}]},Zr={};Bc.forEach(n=>{const e=n.status==="convertido"?"customer":n.source==="newsletter"?"subscriber":"lead";Zr[n.contactId]={id:n.contactId,fullName:n.fullName,email:n.email,phone:n.phone,type:e==="customer"?"cliente":"lead",source:n.source,score:0,rating:"cold",lifecycleStage:e,clienteUid:null,consent:{email:n.source!=="web",whatsapp:n.source!=="web",calls:!1,askedAt:n.createdAt,source:n.source,policyVersion:"v1"},doNotContact:n.source==="web",tags:[],createdAt:n.createdAt,lastActivityAt:n.lastActivityAt,_version:1}});Zr.email_camila_lectora_gmail_com={id:"email_camila_lectora_gmail_com",fullName:"Camila Lectora",email:"camila.lectora@gmail.com",phone:"",type:"lead",source:"newsletter",score:0,rating:"cold",lifecycleStage:"subscriber",clienteUid:null,consent:{email:!0,whatsapp:!1,calls:!1,askedAt:Y(3),source:"newsletter",policyVersion:"v1"},doNotContact:!1,tags:["newsletter"],createdAt:Y(3),lastActivityAt:Y(3),_version:1};const ei={},Ci=()=>Bc.map(n=>({...n})),Dp=()=>dA.map(n=>({...n})),pA=n=>(fA[n]||[]).map(e=>({...e})),mA=n=>Zr[n]?{...Zr[n]}:null,gA=()=>Object.values(Zr).map(n=>({...n})),bh=n=>(ei[n]||[]).map(e=>({...e}));function _A(n,e){ei[n]||(ei[n]=[]),ei[n].unshift({id:"n"+Date.now(),...e})}let yA=100;const xr=[{id:"d1",name:"Diana Ramírez · Chevrolet Tracker 2023",contactName:"Diana Ramírez",contactId:"email_diana_r_hotmail_com",leadId:"l3",vehicleId:"chevrolet-tracker-2023",vehicleName:"Chevrolet Tracker 2023",pipelineId:"ventas",stageId:"contactado",stageName:"Contactado",status:"open",amount:82e6,currency:"COP",probability:.2,weightedAmount:164e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:_e(2),createdAt:_e(5),_version:2},{id:"d2",name:"Laura Valentina Ortiz · Kia Sportage 2022",contactName:"Laura Valentina Ortiz",contactId:"email_lauraortiz_gmail_com",leadId:"l5",vehicleId:"kia-sportage-2022",vehicleName:"Kia Sportage 2022",pipelineId:"ventas",stageId:"cita_agendada",stageName:"Cita agendada",status:"open",amount:95e6,currency:"COP",probability:.35,weightedAmount:3325e4,ownerId:"u_luis",ownerName:"Luis Pérez",source:"bot",lastActivityAt:_e(20),createdAt:Y(1),_version:3},{id:"d3",name:"Andrés Felipe Cuesta · Mazda 3 2021",contactName:"Andrés Felipe Cuesta",contactId:"email_afcuesta_gmail_com",leadId:"l8",vehicleId:"mazda-3-2021",vehicleName:"Mazda 3 2021",pipelineId:"ventas",stageId:"test_drive",stageName:"Test drive",status:"open",amount:68e6,currency:"COP",probability:.65,weightedAmount:442e5,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"web",lastActivityAt:Y(18),createdAt:Y(20),_version:5},{id:"d4",name:"Roberto Gómez · Toyota Hilux 2020",contactName:"Roberto Gómez",contactId:"phone_573001239876",leadId:null,vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"negociacion",stageName:"Negociación",status:"open",amount:135e6,currency:"COP",probability:.8,weightedAmount:108e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:_e(6),createdAt:Y(8),_version:7},{id:"d5",name:"Sandra Milena Vélez · Renault Duster 2022",contactName:"Sandra Milena Vélez",contactId:"email_smvelez_gmail_com",leadId:null,vehicleId:"renault-duster-2022",vehicleName:"Renault Duster 2022",pipelineId:"ventas",stageId:"nuevo",stageName:"Nuevo",status:"open",amount:0,currency:"COP",probability:.1,weightedAmount:0,ownerId:null,ownerName:null,source:"cuenta",lastActivityAt:_e(1),createdAt:_e(1),_version:1},{id:"d6",name:"Mauricio Bedoya · Mazda CX-5 2021",contactName:"Mauricio Bedoya",contactId:"email_mbedoya_gmail_com",leadId:"l11",vehicleId:"mazda-cx5-2021",vehicleName:"Mazda CX-5 2021",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:78e6,currency:"COP",probability:1,weightedAmount:78e6,ownerId:"u_ana",ownerName:"Ana Restrepo",source:"facebook",lastActivityAt:Y(3),createdAt:Y(10),_version:6},{id:"d7",name:"Yuliana Castaño · Toyota Hilux 2020",contactName:"Yuliana Castaño",contactId:"email_yulycastano_gmail_com",leadId:"l12",vehicleId:"toyota-hilux-2020",vehicleName:"Toyota Hilux 2020",pipelineId:"ventas",stageId:"vendido",stageName:"Vendido",status:"won",amount:112e6,currency:"COP",probability:1,weightedAmount:112e6,ownerId:"u_luis",ownerName:"Luis Pérez",source:"whatsapp",lastActivityAt:Y(5),createdAt:Y(15),_version:7},{id:"d8",name:"Julián Marín · Nissan Frontier 2020",contactName:"Julián Marín",contactId:"email_julianmarin_gmail_com",leadId:"l15",vehicleId:"nissan-frontier-2020",vehicleName:"Nissan Frontier 2020",pipelineId:"ventas",stageId:"perdido",stageName:"Perdido",status:"lost",amount:64e6,currency:"COP",probability:0,weightedAmount:0,lostReason:"Compró en otro lado",ownerId:"u_luis",ownerName:"Luis Pérez",source:"referido",lastActivityAt:Y(9),createdAt:Y(22),_version:4}],Vp=()=>xr.map(n=>({...n}));function Op(n){const e="d"+ ++yA;return xr.unshift({id:e,...n}),e}function vA(n,e){const t=xr.findIndex(r=>r.id===n);t>=0&&(xr[t]={...xr[t],...e})}const rn=(n,e=10,t=0)=>{const r=new Date;return r.setDate(r.getDate()+n),r.setHours(e,t,0,0),r.toISOString()},ka=[{id:"ag1",type:"cita",subject:"Test drive Toyota Corolla",dueAt:rn(1,10),relatedTo:{type:"lead",id:"l2",name:"Carlos Andrés Salcedo"},status:"open"},{id:"ag2",type:"cita",subject:"Visita showroom",dueAt:rn(1,12),relatedTo:{type:"lead",id:"l1",name:"María Fernanda Gómez"},status:"open"},{id:"ag3",type:"cita",subject:"Cierre financiación",dueAt:rn(1,15),relatedTo:{type:"lead",id:"l5",name:"Laura Valentina Ortiz"},status:"open"},{id:"ag4",type:"cita",subject:"Llamada de seguimiento",dueAt:rn(1,17),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"},{id:"ag5",type:"cita",subject:"Entrega de vehículo",dueAt:rn(3,9),relatedTo:{type:"lead",id:"l8",name:"Andrés Felipe Cuesta"},status:"open"},{id:"ag6",type:"cita",subject:"Peritaje",dueAt:rn(5,11),relatedTo:{type:"lead",id:"l9",name:"Catalina Ríos"},status:"open"},{id:"ag7",type:"cita",subject:"Negociación precio",dueAt:rn(-2,16),relatedTo:{type:"lead",id:"l3",name:"Diana Ramírez"},status:"open"}],wA=()=>ka.map(n=>({...n}));function EA(n){ka.push({id:"ag"+(ka.length+1),...n})}let IA=100;function TA(n){const e="lm"+ ++IA,t=new Date().toISOString(),r=(n.telefono||"").replace(/\D/g,""),s=(n.prefijoPais||"+57").replace(/\D/g,""),i=r?"+"+(r.startsWith(s)?r:s+r):"",a=(n.email||"").trim().toLowerCase(),c={id:e,fullName:n.nombre||"Sin nombre",email:a,phone:i,source:n.canal||"manual",sourceDetail:n.interes||"consulta",vehicleOfInterestId:n.vehiculoId||null,status:"nuevo",rating:"cold",score:0,ownerId:null,ownerName:null,slaDueAt:null,contactId:a?"email_"+a.replace(/[^a-z0-9]/gi,"_"):"phone_"+r,tags:["manual",n.trafico,n.campana].filter(Boolean),createdAt:t,lastActivityAt:t,_version:1};return Bc.unshift(c),e}function AA(){const n={},e=(I,T,R)=>f("label",{class:"field"},[f("span",{class:"field__label",text:I}),T,null]);n.nombre=f("input",{class:"input",type:"text",placeholder:"Nombre del cliente",autocomplete:"off"}),n.prefijo=f("input",{class:"input",type:"text",value:"+57",style:{width:"72px"}}),n.telefono=f("input",{class:"input",type:"tel",placeholder:"300 123 4567",autocomplete:"off"}),n.email=f("input",{class:"input",type:"email",placeholder:"correo@ejemplo.com (opcional)",autocomplete:"off"}),n.canal=f("select",{class:"select"},OT.map(I=>f("option",{value:I.id},[`${I.icon} ${I.label}`]))),n.interes=f("select",{class:"select"},LT.map(I=>f("option",{value:I.id},[I.label]))),n.trafico=f("select",{class:"select"},[f("option",{value:""},["— Tráfico —"]),f("option",{value:"organico"},["Orgánico"]),f("option",{value:"pauta"},["Pauta (pago)"])]),n.campana=f("input",{class:"input",type:"text",placeholder:"Campaña (opcional)",autocomplete:"off"}),n.vehiculo=f("input",{class:"input",type:"text",placeholder:"Vehículo de interés (opcional)",autocomplete:"off"}),n.notas=f("textarea",{class:"textarea",placeholder:"Notas / contexto del lead",rows:"2"}),n.consent=f("input",{type:"checkbox",checked:!0});const t=f("div",{class:"login__error",role:"alert",hidden:!0}),r=f("button",{class:"btn btn--ghost",type:"button"},["Cancelar"]),s=f("button",{class:"btn btn--gold",type:"submit"},["Agregar lead"]),i=f("form",{class:"nl-form"},[e("Nombre *",n.nombre),f("div",{class:"nl-row"},[f("label",{class:"field",style:{flex:"0 0 auto"}},[f("span",{class:"field__label",text:"Prefijo"}),n.prefijo]),f("label",{class:"field u-grow"},[f("span",{class:"field__label",text:"Teléfono"}),n.telefono])]),e("Correo",n.email),f("div",{class:"nl-row"},[e("Canal *",n.canal),e("Interés",n.interes)]),f("div",{class:"nl-row"},[e("Tráfico",n.trafico),e("Campaña",n.campana)]),e("Vehículo de interés",n.vehiculo),e("Notas",n.notas),f("label",{class:"nl-consent"},[n.consent,f("span",{class:"u-caption",text:"El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data)."})]),t,f("div",{class:"nl-actions"},[r,s])]),a=f("div",{class:"modal"},[f("div",{class:"modal__head"},[f("h2",{class:"modal__title",text:"＋ Nuevo lead"}),f("span",{class:"u-caption u-faint",text:"Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)"})]),i]),c=f("div",{class:"modal-overlay"},[a]);document.body.appendChild(c),setTimeout(()=>n.nombre.focus(),30);const u=()=>{c.remove(),window.removeEventListener("keydown",d)},d=I=>{I.key==="Escape"&&u()};window.addEventListener("keydown",d),c.addEventListener("mousedown",I=>{I.target===c&&u()}),r.addEventListener("click",u),i.addEventListener("submit",async I=>{I.preventDefault(),t.hidden=!0;const T={nombre:n.nombre.value.trim(),email:n.email.value.trim(),telefono:n.telefono.value.trim(),prefijoPais:n.prefijo.value.trim()||"+57",canal:n.canal.value,interes:n.interes.value,vehiculoId:n.vehiculo.value.trim()||null,trafico:n.trafico.value||null,campana:n.campana.value.trim()||null,consentGiven:n.consent.checked,notas:n.notas.value.trim()};if(!T.nombre)return g("Escribe el nombre del cliente.");if(!T.email&&!T.telefono)return g("Necesitas al menos un correo o un teléfono (para no duplicar el contacto).");s.disabled=!0,s.textContent="Guardando…";try{q.get().mock?(TA(T),window.dispatchEvent(new CustomEvent("altorra:leads-dirty"))):await hA(T),se("✓ Lead agregado a la Bandeja","ok"),u()}catch{s.disabled=!1,s.textContent="Agregar lead",g("No se pudo agregar. Intenta de nuevo.")}});function g(I){return t.textContent=I,t.hidden=!1,!1}}const Sn={wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',convert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>'};function Lp(n){const e={queue:"todo",filters:{type:"",channel:"",status:""},search:"",showClosed:!1,leads:[],loading:!0,error:null,hasMore:!1,cursor:null,sub:null},t=Or("crm.edit"),r=q.get().user&&q.get().user.uid,s=f("div",{class:"inbox__queues",role:"tablist","aria-label":"Colas"}),i=f("label",{class:"search","aria-label":"Buscar"},[f("span",{html:Sn.search,"aria-hidden":"true"}),f("input",{type:"search",placeholder:"Buscar nombre, correo, teléfono…",autocomplete:"off"})]),a=f("div",{class:"inbox__filters"}),c=t?f("button",{class:"btn btn--gold btn--sm",type:"button",style:{marginLeft:"auto"}},["＋ Nuevo lead"]):null;c&&c.addEventListener("click",()=>AA());const u=f("div",{class:"inbox__toolbar"},[i,a,c]),d=f("div",{class:"inbox__list",role:"list",tabindex:"-1"}),g=f("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline."]),I=f("section",{class:"inbox"},[g,s,u,d]);ue(n),n.append(I);const T=i.querySelector("input");T.addEventListener("input",()=>{e.search=T.value,F()});async function R(V,M){if(L(V.id,{ownerId:M?M.uid:null,ownerName:M?M.nombre:null}),q.get().mock){se(M?`Asignado a ${M.nombre}`:"Sin asignar","ok");return}try{await JT(V.id,M),se(M?`Asignado a ${M.nombre}`:"Sin asignar","ok")}catch{se("No se pudo asignar","error")}}async function N(V,M){if(L(V.id,{status:M,lastActivityAt:new Date().toISOString()}),q.get().mock){se(`Estado → ${Zs(M).label}`,"ok");return}try{await XT(V.id,M,V),se(`Estado → ${Zs(M).label}`,"ok")}catch{se("No se pudo cambiar el estado","error")}}function C(V){const M=vp(V.phone,bA(V));if(!M){se("Este lead no tiene teléfono","error");return}window.open(M,"_blank","noopener"),!q.get().mock&&t&&ZT(V.id,{type:"whatsapp",subject:"WhatsApp enviado",direction:"outbound",name:V.fullName}).catch(()=>{})}async function P(V){if(V.status==="convertido"){se("Ya es una oportunidad","info");return}if(L(V.id,{status:"convertido"}),q.get().mock){Op($c(V)),se("🎯 Convertido a oportunidad","ok");return}try{await Np(V),se("🎯 Convertido a oportunidad","ok")}catch{se("No se pudo convertir","error")}}function B(){q.set({leads:e.leads})}function L(V,M){const X=e.leads.findIndex(pe=>pe.id===V);X!==-1&&(e.leads[X]=bp({...e.leads[X],...M}),B(),$())}function $(){H(),O(),F()}function H(){const V=jT(e.leads,r);ue(s),Pa.forEach(M=>{const X=e.queue===M.id,pe=f("button",{class:"chip"+(X?" chip--active":""),role:"tab","aria-selected":String(X),type:"button"},[f("span",{"aria-hidden":"true",text:M.icon}),f("span",{text:M.label}),f("span",{class:"chip__count",text:String(V[M.id]||0)})]);pe.addEventListener("click",()=>{e.queue=M.id,$()}),s.append(pe)})}function O(){if(ue(a),[{key:"type",label:"Tipo",items:[["","Todos"],["lead","Lead"],["cita","Cita"],["solicitud","Solicitud"],["pqr","PQR"]]},{key:"channel",label:"Canal",items:[["","Todos"],["web","Web"],["whatsapp","WhatsApp"],["bot","ALTOR Bot"],["cuenta","Cuenta"],["newsletter","Newsletter"],["cita","Cita web"]]},{key:"status",label:"Estado",items:[["","Todos"],...Sa.map(M=>[M.id,M.label])]}].forEach(M=>{const X=e.filters[M.key],pe=X?(M.items.find(ce=>ce[0]===X)||[,M.label])[1]:M.label,ne=f("button",{class:"chip"+(X?" chip--active":""),type:"button","aria-haspopup":"menu"},[f("span",{text:pe}),f("span",{"aria-hidden":"true",text:"▾"})]);ne.addEventListener("click",()=>{un(ne,M.items.map(([ce,ae])=>({value:ce,label:ae,active:ce===X})),ce=>{e.filters[M.key]=ce.value,$()},{title:M.label})}),a.append(ne)}),e.filters.type||e.filters.channel||e.filters.status){const M=f("button",{class:"chip",type:"button"},["✕ Limpiar"]);M.addEventListener("click",()=>{e.filters={type:"",channel:"",status:""},$()}),a.append(M)}}function F(){if(e.loading)return J();if(e.error)return v("⚠️","No se pudo cargar",e.error);const{rows:V,hiddenClosed:M}=GT(e.leads,{queue:e.queue,uid:r,filters:e.filters,search:e.search,showClosed:e.showClosed});if(ue(d),!V.length&&!M){const ne=e.search||e.filters.type||e.filters.channel||e.filters.status;d.append(A("🗂️",ne?"Sin resultados":"¡Bandeja al día!",ne?"Ajusta la búsqueda o los filtros.":"No hay clientes en esta cola."));return}const X=M||e.showClosed?f("button",{class:"chip",type:"button",style:{marginLeft:"auto"}},[e.showClosed?"✕ Ocultar cerrados":`${M} ocultos · ver todos`]):null;X&&X.addEventListener("click",()=>{e.showClosed=!e.showClosed,F()});const pe=f("div",{class:"inbox__listhead"},[f("span",{class:"u-muted u-caption",text:`${V.length} ${V.length===1?"cliente":"clientes"} activos`}),f("span",{class:"u-faint u-caption",text:"Ordenado por urgencia"}),X]);if(d.append(pe),!V.length&&M){d.append(A("🗂️","¡Bandeja al día!",`No hay clientes activos en esta cola (${M} cerrados ocultos).`));return}if(V.forEach(ne=>d.append(y(ne))),e.hasMore&&e.queue==="todo"&&!e.search){const ne=f("button",{class:"btn btn--soft btn--block",type:"button"},["Cargar más"]);ne.addEventListener("click",()=>ve(ne)),d.append(f("div",{class:"inbox__more"},[ne]))}}function y(V){const M=Bn[V._rating],X=Zs(V.status),pe=!!(V.convertedTo&&V.convertedTo.dealId)||V.status==="convertido",ne=WT(V),ce=ne&&ne.state!=="ok"?f("span",{class:`badge badge--${ne.state==="late"?"danger":"gold"}`,title:"Tiempo sin primer contacto"},[`⏱ ${ne.mins<120?ne.mins+" min":Qo(ne.mins*6e4)} sin contacto`]):null,ae=V._sla,uo=`sla-dot sla-dot--${ae.state}`,At=ae.closed?"Cerrado":ae.state==="late"?`SLA vencido hace ${Qo(ae.remainingMs)}`:`Responder en ${Qo(ae.remainingMs)}`,ho=[V._type.icon+" "+V._type.label,V.sourceDetail,V.vehicleOfInterestId?"🚗 "+V.vehicleOfInterestId:""].filter(Boolean).join(" · "),bt=f("article",{class:"lead-card",role:"listitem",tabindex:"0","data-id":V.id,"aria-label":`${V.fullName}, ${M.label}`},[f("span",{class:uo,title:At,"aria-label":At}),f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ds(V.fullName)}),f("div",{class:"lead-card__main u-grow"},[f("div",{class:"lead-card__top"},[f("span",{class:"lead-card__name u-truncate",text:V.fullName}),f("span",{class:`temp ${M.cls}`,title:`Score ${V._score}/100`},[`${M.icon} ${V._score}`])]),f("div",{class:"lead-card__what u-truncate u-muted",text:ho}),f("div",{class:"lead-card__meta u-caption"},[f("span",{class:"lead-card__chan",text:`${V._channel.icon} ${V._channel.label}`}),f("span",{class:"lead-card__dot",text:"·"}),f("span",{text:$n(V.createdAt)}),f("span",{class:"lead-card__dot",text:"·"}),pe?f("button",{class:"badge badge--ok",type:"button","data-action":"pipeline",title:"Este lead ya es un negocio: gestiónalo en el Pipeline",style:{cursor:"pointer",border:"none"}},["🎯 Convertido → ver Pipeline"]):f("span",{class:`badge badge--${X.badge||""}`.trim(),text:X.label}),ce?f("span",{class:"lead-card__dot",text:"·"}):null,ce,V.ownerName?f("span",{class:"lead-card__dot",text:"·"}):null,V.ownerName?f("span",{class:"u-faint",text:"👤 "+V.ownerName}):null]),f("div",{class:"lead-card__nba"},[f("span",{"aria-hidden":"true",text:V._nba.icon}),f("span",{class:"u-muted",text:"Próx: "}),f("strong",{text:V._nba.label})])]),f("div",{class:"lead-card__actions"},[_("wa",Sn.wa,"WhatsApp","btn--wa"),t?_("assign",Sn.person,"Asignar"):null,t&&!pe?_("status",Sn.flag,"Cambiar estado"):null,t&&!pe?_("convert",Sn.convert,"Convertir a oportunidad"):null,_("open",Sn.expand,"Abrir 360")])]);return bt.addEventListener("click",In=>{const lr=In.target.closest("[data-action]");if(lr){w(lr.dataset.action,V,lr);return}E(V.id)}),bt.addEventListener("keydown",In=>{In.key==="Enter"?E(V.id):In.key.toLowerCase()==="w"&&C(V)}),bt}function _(V,M,X,pe=""){return f("button",{class:`icon-btn ${pe}`.trim(),type:"button","data-action":V,title:X,"aria-label":X},[f("span",{html:M,"aria-hidden":"true"})])}const p={nuevo:"Acaba de entrar, nadie le ha hablado",contactado:"Ya le escribiste o llamaste",calificado:"Va en serio: presupuesto e intención real",no_calificado:"No es un comprador (spam, curioso)",perdido:"Se enfrió antes de ser negocio"};function w(V,M,X){if(V==="open")return E(M.id);if(V==="wa")return C(M);if(V==="convert")return P(M);if(V==="pipeline"){window.location.hash="#/pipeline";return}if(V==="assign"){const pe=q.get().team||[],ne=[{value:null,label:"Sin asignar",icon:"⊘",active:!M.ownerId},...pe.map(ce=>({value:ce,label:ce.nombre,hint:ce.cargo,icon:"👤",active:M.ownerId===ce.uid}))];return un(X,ne,ce=>R(M,ce.value),{title:"Asignar a"})}if(V==="status"){if(M.convertedTo&&M.convertedTo.dealId){se("Este lead ya es un negocio: gestiónalo en el Pipeline.","info");return}const pe=Sa.filter(ne=>ne.id!=="convertido").map(ne=>({value:ne.id,label:ne.label,hint:p[ne.id]||"",active:(M.status||"nuevo")===ne.id}));return un(X,pe,ne=>N(M,ne.value),{title:"Cambiar estado"})}}function E(V){q.set({detailLeadId:V})}function A(V,M,X){return f("div",{class:"state"},[f("div",{class:"state__icon","aria-hidden":"true",text:V}),f("div",{class:"state__title",text:M}),f("div",{class:"state__msg",text:X})])}function v(V,M,X){ue(d),d.append(A(V,M,X))}function J(){ue(d);for(let V=0;V<6;V++)d.append(f("div",{class:"lead-card lead-card--skeleton"},[f("span",{class:"skeleton",style:{width:"30px",height:"30px",borderRadius:"50%"}}),f("div",{class:"u-grow u-stack",style:{gap:"8px"}},[f("span",{class:"skeleton",style:{width:"46%",height:"14px"}}),f("span",{class:"skeleton",style:{width:"70%",height:"12px"}})])]))}async function ve(V){if(e.cursor){V.disabled=!0,V.textContent="Cargando…";try{const{rows:M,lastDoc:X,hasMore:pe}=await QT({after:e.cursor}),ne=$s(M),ce=new Set(e.leads.map(ae=>ae.id));e.leads.push(...ne.filter(ae=>!ce.has(ae.id))),e.cursor=X,e.hasMore=pe,B(),$()}catch{se("No se pudo cargar más","error"),V.disabled=!1,V.textContent="Cargar más"}}}function je(){if(q.get().mock){q.set({team:Dp()}),e.leads=$s(Ci()),e.loading=!1,e.hasMore=!1,B(),$(),e.dirtyHandler=()=>{e.leads=$s(Ci()),B(),$()},window.addEventListener("altorra:leads-dirty",e.dirtyHandler);return}YT().catch(()=>{}),e.sub=KT({pageSize:40,onData:(V,M)=>{e.leads=$s(V),e.cursor=e.sub?e.sub.getLastDoc():null,e.hasMore=M.hasMore,e.loading=!1,e.error=null,B(),$()},onError:V=>{console.error("[inbox] error de suscripción:",V),e.loading=!1,e.error=V&&V.code==="permission-denied"?"Tu cuenta no tiene permiso para ver el CRM.":"Revisa tu conexión e inténtalo de nuevo.",$()}})}return $(),je(),function(){e.sub&&e.sub.unsubscribe&&e.sub.unsubscribe(),e.sub=null,e.dirtyHandler&&(window.removeEventListener("altorra:leads-dirty",e.dirtyHandler),e.dirtyHandler=null)}}function bA(n){const e=String(n.fullName||"").trim().split(/\s+/)[0]||"",t=n.vehicleOfInterestId?` por el vehículo ${n.vehicleOfInterestId}`:"";return`Hola ${e}, te saluda Altorra Cars 👋. Vimos tu interés${t}. ¿En qué te podemos ayudar?`}const RA=["Precio / presupuesto","Financiación negada","Compró en otro lado","No responde","Cambió de opinión","Otro motivo"];function SA(n){const e={deals:[],loading:!0,error:null,sub:null,dragId:null},t=Or("crm.edit"),r=f("div",{class:"pipeline__bar"}),s=f("div",{class:"pipeline__board",role:"list","aria-label":"Embudo de ventas"}),i=f("p",{class:"u-muted u-caption",style:{margin:"0"}},["Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja."]),a=f("section",{class:"pipeline"},[i,r,s]);ue(n),n.append(a);function c(y,_){const p=e.deals.findIndex(w=>w.id===y);p!==-1&&(e.deals[p]={...e.deals[p],..._},q.get().mock&&vA(y,_),T())}async function u(y,_){if(y.stageId===_)return;const p=Pp(_);if(c(y.id,{stageId:_,stageName:p.label,probability:p.prob,lastActivityAt:new Date().toISOString()}),q.get().mock){se("Etapa → "+p.label,"ok");return}try{await aA(y.id,_,y)}catch{se("No se pudo mover","error")}}async function d(y,_){if(c(y.id,{amount:_}),!q.get().mock)try{await cA(y.id,_,y)}catch{se("No se pudo guardar el monto","error")}}async function g(y){if(c(y.id,{status:"won"}),q.get().mock){se("🎉 ¡Venta ganada!","ok");return}try{await lA(y.id,y),se("🎉 ¡Venta ganada!","ok")}catch{se("Error","error")}}async function I(y,_){if(c(y.id,{status:"lost",lostReason:_}),q.get().mock){se("Marcado perdido","info");return}try{await uA(y.id,_,y),se("Marcado perdido","info")}catch{se("Error","error")}}function T(){if(e.loading)return O();if(e.error)return H("⚠️","No se pudo cargar",e.error);const y=e.deals.filter(p=>p.status==="open");if(R(y),ue(s),!y.length){s.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🎯"}),f("div",{class:"state__title",text:"Embudo vacío"}),f("div",{class:"state__msg",text:"Convierte un lead en oportunidad desde la Bandeja para empezar."})]));return}const _=sA(y);Lr.forEach(p=>{const w=_[p.id]||[],E=w.reduce((v,J)=>v+(Number(J.amount)||0),0),A=f("div",{class:"pcol","data-stage":p.id},[f("div",{class:"pcol__head"},[f("div",{class:"u-row u-row--tight"},[f("span",{class:"pcol__dot",style:{background:CA(p.id)}}),f("strong",{text:p.label}),f("span",{class:"pcol__count",text:String(w.length)})]),f("span",{class:"u-caption u-faint",text:`${Math.round(p.prob*100)}% · ${Pr(E)||"$0"}`})]),f("div",{class:"pcol__drop","data-stage":p.id,role:"list"},w.map(C))]);$(A.querySelector(".pcol__drop"),p.id),s.append(A)})}function R(y){const _=kp(y),p=nA(y);ue(r),r.append(N("Oportunidades",String(y.length)),N("Valor del embudo",Pr(p)||"$0"),N("Forecast ponderado",Pr(_)||"$0",!0))}function N(y,_,p){return f("div",{class:"pstat"+(p?" pstat--hi":"")},[f("span",{class:"u-caption u-faint",text:y}),f("strong",{class:"pstat__v",text:_})])}function C(y){const _=rA(y),p=f("button",{class:"deal-card__amount",type:"button","data-action":"amount",title:"Editar monto"},[y.amount?Pr(y.amount):"+ monto"]),w=f("article",{class:"deal-card"+(_?" is-rotting":""),draggable:"true",tabindex:"0","data-id":y.id,"data-stage":y.stageId,role:"listitem","aria-label":`${y.name}, ${Math.round(Si(y.stageId)*100)}%`},[f("div",{class:"deal-card__top"},[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ds(y.contactName)}),f("span",{class:"deal-card__name u-grow u-truncate",text:y.name}),_?f("span",{class:"deal-card__rot",title:"Estancado >14 días",text:"🐌"}):null]),y.vehicleName?f("div",{class:"u-caption u-muted u-truncate",text:"🚗 "+y.vehicleName}):null,f("div",{class:"deal-card__row"},[p,f("span",{class:"badge badge--gold",text:`${Math.round(Si(y.stageId)*100)}%`})]),f("div",{class:"deal-card__foot u-caption u-faint"},[f("span",{class:"u-grow u-truncate",text:y.ownerName?"👤 "+y.ownerName:"Sin asesor"}),f("span",{text:$n(y.lastActivityAt)})]),f("div",{class:"deal-card__actions"},t?[P("stage","↔","Mover etapa"),P("won","✓","Marcar ganado"),P("lost","✕","Marcar perdido"),P("open","⤢","Abrir 360")]:[P("open","⤢","Abrir 360")])]);return w.addEventListener("dragstart",E=>{e.dragId=y.id,w.classList.add("is-dragging");try{E.dataTransfer.setData("text/plain",y.id),E.dataTransfer.effectAllowed="move"}catch{}}),w.addEventListener("dragend",()=>{e.dragId=null,w.classList.remove("is-dragging")}),w.addEventListener("click",E=>{const A=E.target.closest("[data-action]");if(A)return B(A.dataset.action,y,A)}),w}function P(y,_,p){return f("button",{class:"icon-btn icon-btn--xs",type:"button","data-action":y,title:p,"aria-label":p,draggable:"false"},[_])}function B(y,_,p){if(y==="open")return q.set({detailLeadId:_.leadId});if(y==="amount")return L(_,p);if(y==="stage")return un(p,Lr.map(w=>({value:w.id,label:w.label,hint:Math.round(w.prob*100)+"%",active:w.id===_.stageId})),w=>u(_,w.value),{title:"Mover a etapa"});if(y==="won")return g(_);if(y==="lost")return un(p,RA.map(w=>({value:w,label:w})),w=>I(_,w.value),{title:"Motivo de pérdida"})}function L(y,_){const p=f("input",{class:"deal-card__amount-input",type:"text",inputmode:"numeric",value:y.amount||"","aria-label":"Monto en COP"});_.replaceWith(p),p.focus(),p.select();const w=()=>{const E=parseInt(String(p.value).replace(/\D/g,""),10)||0;d(y,E)};p.addEventListener("keydown",E=>{E.key==="Enter"?(E.preventDefault(),w()):E.key==="Escape"&&T()}),p.addEventListener("blur",w)}function $(y,_){y.addEventListener("dragover",p=>{p.preventDefault(),y.classList.add("is-over"),p.dataTransfer&&(p.dataTransfer.dropEffect="move")}),y.addEventListener("dragleave",()=>y.classList.remove("is-over")),y.addEventListener("drop",p=>{p.preventDefault(),y.classList.remove("is-over");const w=e.dragId||p.dataTransfer&&p.dataTransfer.getData("text/plain"),E=e.deals.find(A=>A.id===w);E&&u(E,_)})}function H(y,_,p){ue(s),s.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:y}),f("div",{class:"state__title",text:_}),f("div",{class:"state__msg",text:p})]))}function O(){ue(r),ue(s),Lr.slice(0,5).forEach(()=>{s.append(f("div",{class:"pcol"},[f("div",{class:"pcol__head"},[f("span",{class:"skeleton",style:{width:"60%",height:"14px"}})]),f("div",{class:"pcol__drop"},[1,2].map(()=>f("div",{class:"deal-card",style:{pointerEvents:"none"}},[f("span",{class:"skeleton",style:{width:"100%",height:"52px"}})])))]))})}function F(){if(q.get().mock){e.deals=Vp(),e.loading=!1,T();return}e.sub=oA({pageSize:150,onData:y=>{e.deals=y,e.loading=!1,e.error=null,T()},onError:y=>{e.loading=!1,e.error=y&&y.code==="permission-denied"?"Sin permiso para ver el pipeline.":"Revisa tu conexión.",T()}})}return T(),F(),function(){e.sub&&e.sub(),e.sub=null}}function CA(n){return{nuevo:"var(--temp-cold)",contactado:"var(--info)",cita_agendada:"#8A7CFF",visito:"var(--gold-500)",test_drive:"var(--gold-600)",negociacion:"var(--warning)",financiacion:"var(--success)"}[n]||"var(--ink-400)"}const PA=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],Rh=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function es(n){const e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function xp(n,e){const r=(new Date(n,e,1).getDay()+6)%7,s=new Date(n,e+1,0).getDate(),i=[];for(let c=0;c<r;c++)i.push({date:new Date(n,e,1-r+c),inMonth:!1});for(let c=1;c<=s;c++)i.push({date:new Date(n,e,c),inMonth:!0});for(;i.length%7!==0;){const c=i[i.length-1].date;i.push({date:new Date(c.getFullYear(),c.getMonth(),c.getDate()+1),inMonth:!1})}const a=[];for(let c=0;c<i.length;c+=7)a.push(i.slice(c,c+7));return a}function kA(n,e){const t=xp(n,e),r=t[0][0].date,i=t[t.length-1][6].date,a=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);return{startISO:r.toISOString(),endISO:a.toISOString()}}function NA(n){const e={};for(const t of n){if(!t.dueAt)continue;const r=es(new Date(t.dueAt));(e[r]||(e[r]=[])).push(t)}for(const t of Object.keys(e))e[t].sort((r,s)=>new Date(r.dueAt)-new Date(s.dueAt));return e}function Sh(n){const e=new Date(n);return Number.isNaN(e.getTime())?"":e.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}function DA(n,e){return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}const VA=n=>({id:n.id,...n.data()}),OA=()=>q.get().user?q.get().user.uid:null;function LA(n,e,t,r){const s=Et(Ne(de,"activities"),Ii("dueAt",">=",n),Ii("dueAt","<",e),It("dueAt","asc"));return hs(s,i=>t(i.docs.map(VA)),i=>r&&r(i))}async function xA(n,e,t){return wn(Ne(de,"activities"),{type:"cita",subject:t||"Cita con "+(n.fullName||""),body:"",status:"open",direction:"outbound",dueAt:e,relatedTo:{type:"lead",id:n.id||null,name:n.fullName||""},ownerId:n.ownerId||OA(),createdAt:new Date().toISOString(),_version:1})}function MA(n){const e=new Date,t={year:e.getFullYear(),month:e.getMonth(),events:[],loading:!0,error:null,sub:null},r=f("div",{class:"agenda__head"}),s=f("div",{class:"agenda__weekdays"},PA.map(C=>f("span",{class:"agenda__wd",text:C}))),i=f("div",{class:"agenda__grid"}),a=f("section",{class:"agenda"},[r,s,i]);ue(n),n.append(a);function c(C){let P=t.month+C,B=t.year;P<0?(P=11,B--):P>11&&(P=0,B++),t.year=B,t.month=P,N()}function u(){t.year=e.getFullYear(),t.month=e.getMonth(),N()}function d(){ue(r);const C=f("div",{class:"u-row u-row--tight"},[g("‹","Mes anterior",()=>c(-1)),f("button",{class:"btn btn--soft btn--sm",type:"button",onclick:u},["Hoy"]),g("›","Mes siguiente",()=>c(1))]);r.append(f("h2",{class:"agenda__title",text:`${Rh[t.month]} ${t.year}`}),C)}function g(C,P,B){const L=f("button",{class:"icon-btn",type:"button","aria-label":P},[C]);return L.addEventListener("click",B),L}function I(){if(d(),ue(i),t.error){i.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"⚠️"}),f("div",{class:"state__title",text:"No se pudo cargar la agenda"}),f("div",{class:"state__msg",text:t.error})]));return}const C=NA(t.events);xp(t.year,t.month).forEach(B=>{B.forEach(L=>{const $=es(L.date),H=C[$]||[],O=DA(L.date,e),F=f("div",{class:"agenda__day"+(L.inMonth?"":" is-out")+(O?" is-today":""),role:"gridcell"},[f("div",{class:"agenda__daynum",text:String(L.date.getDate())})]),y=f("div",{class:"agenda__events"});if(H.slice(0,3).forEach(_=>y.append(T(_))),H.length>3){const _=f("button",{class:"agenda__more",type:"button"},[`+${H.length-3} más`]);_.addEventListener("click",()=>un(_,H.map(p=>({value:p,label:`${Sh(p.dueAt)} · ${p.relatedTo?.name||p.subject||"Cita"}`})),p=>R(p.value),{title:`${L.date.getDate()} ${Rh[t.month]}`})),y.append(_)}F.append(y),i.append(F)})})}function T(C){const P=f("button",{class:"agenda__chip",type:"button",title:C.subject||"Cita"},[f("span",{class:"agenda__chip-time",text:Sh(C.dueAt)}),f("span",{class:"u-truncate",text:C.relatedTo?.name||C.subject||"Cita"})]);return P.addEventListener("click",()=>R(C)),P}function R(C){const P=C.relatedTo&&C.relatedTo.id;P&&q.set({detailLeadId:P})}function N(){if(I(),t.sub&&(t.sub(),t.sub=null),q.get().mock){t.events=wA(),t.loading=!1,I();return}const{startISO:C,endISO:P}=kA(t.year,t.month);t.sub=LA(C,P,B=>{t.events=B,t.loading=!1,t.error=null,I()},B=>{t.loading=!1,t.error=B&&B.code==="permission-denied"?"Sin permiso.":"Revisa tu conexión.",I()})}return N(),function(){t.sub&&t.sub(),t.sub=null}}const FA=n=>{const e=new Date(n).getTime();return Number.isNaN(e)?0:e},lo=n=>n.status==="won",Mp=n=>n.status==="lost",jc=n=>n.status==="open",qc=n=>n.status==="convertido";function Ch(n,e){return e?n.filter(t=>FA(t.createdAt)>=e):n.slice()}function UA(n,e){const t=n.length,r=n.filter(qc).length,s=e.filter(lo),i=e.filter(Mp),a=s.reduce((u,d)=>u+(Number(d.amount)||0),0),c=s.length+i.length;return{leadsNew:t,convertidos:r,convRate:t?r/t:0,won:s.length,lost:i.length,winRate:c?s.length/c:0,wonValue:a}}function $A(n,e){const t=e.filter(jc),r=n.filter(i=>!Zn(i.status)),s=r.filter(i=>{const a=Ep(i);return!a.closed&&(a.state==="warn"||a.state==="late")}).length;return{leadsActive:r.length,dealsOpen:t.length,pipelineWeighted:kp(t),slaRisk:s}}function BA(n,e){const t=new Set(e.filter(lo).map(d=>d.id)),r=n.filter(d=>d.status==="contactado"||d.status==="calificado"||d.status==="convertido"),s=n.filter(d=>d.status==="calificado"||d.status==="convertido"),i=n.filter(qc),a=i.filter(d=>d.convertedTo&&t.has(d.convertedTo.dealId)),c=n.length||1,u=[{key:"leads",label:"Leads",count:n.length},{key:"contactados",label:"Contactados",count:r.length},{key:"calificados",label:"Calificados",count:s.length},{key:"convertidos",label:"Convertidos",count:i.length},{key:"ganados",label:"Ganados",count:a.length}];return u.map((d,g)=>({...d,pctTop:d.count/c,convFromPrev:g===0?1:u[g-1].count?d.count/u[g-1].count:0}))}function jA(n,e){const t={},r=s=>t[s.key]||(t[s.key]={key:s.key,label:s.label,icon:s.icon,leads:0,convertidos:0,deals:0,won:0,revenue:0});return n.forEach(s=>{const i=r(Xr(s));i.leads++,qc(s)&&i.convertidos++}),e.forEach(s=>{const i=r(Xr(s));i.deals++,lo(s)&&(i.won++,i.revenue+=Number(s.amount)||0)}),Object.values(t).map(s=>({...s,convRate:s.leads?s.convertidos/s.leads:0})).sort((s,i)=>i.leads-s.leads||i.revenue-s.revenue)}function qA(n){const e=n.filter(jc);return Lr.map(t=>{const r=e.filter(s=>s.stageId===t.id);return{id:t.id,label:t.label,prob:t.prob,count:r.length,value:r.reduce((s,i)=>s+(Number(i.amount)||0),0),weighted:r.reduce((s,i)=>s+Uc(i),0)}})}function zA(n,e,t=[]){const r={},s=(i,a)=>r[i]||(r[i]={ownerId:i,ownerName:a,leads:0,deals:0,won:0,lost:0,pipelineWeighted:0});return t.forEach(i=>s(i.uid,i.nombre)),n.forEach(i=>{const a=i.ownerId||"_none";s(a,i.ownerName||(a==="_none"?"Sin asignar":a)).leads++}),e.forEach(i=>{const a=i.ownerId||"_none",c=s(a,i.ownerName||(a==="_none"?"Sin asignar":a));c.deals++,lo(i)?c.won++:Mp(i)?c.lost++:jc(i)&&(c.pipelineWeighted+=Uc(i))}),Object.values(r).filter(i=>i.leads||i.deals).map(i=>({...i,winRate:i.won+i.lost?i.won/(i.won+i.lost):0})).sort((i,a)=>a.won-i.won||a.pipelineWeighted-i.pipelineWeighted||a.leads-i.leads)}function HA(n,e=30){const t=[],r={},s=new Date;for(let i=e-1;i>=0;i--){const a=new Date(s.getFullYear(),s.getMonth(),s.getDate()-i),c={key:es(a),date:a,count:0};t.push(c),r[c.key]=c}return n.forEach(i=>{if(!i.createdAt)return;const a=r[es(new Date(i.createdAt))];a&&a.count++}),t}const Ph=[{value:0,label:"Hoy"},{value:7,label:"7 días"},{value:30,label:"30 días"},{value:90,label:"90 días"},{value:null,label:"Todo"}];function WA(n){if(n==null)return null;const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-n*864e5}const GA=n=>({id:n.id,...n.data()});async function kh(n,e){return(await Qr(Et(Ne(de,n),It("createdAt","desc"),Qt(e)))).docs.map(GA)}async function KA({pageSize:n=500}={}){if(q.get().mock)return{leads:Ci(),deals:Vp(),capped:!1};const[e,t]=await Promise.all([kh("leads",n),kh("deals",n)]);return{leads:e,deals:t,capped:e.length>=n||t.length>=n}}const QA="http://www.w3.org/2000/svg";function Jo(n,e={},t=[]){const r=document.createElementNS(QA,n);for(const[s,i]of Object.entries(e))i==null||i===!1||r.setAttribute(s,String(i));for(const s of[].concat(t))s==null||s===!1||s===""||r.append(s.nodeType?s:document.createTextNode(String(s)));return r}function YA(n,e={}){const t=e.max!=null?e.max:Math.max(1,...n.map(s=>Number(s.value)||0)),r=f("div",{class:"reportes__bars",role:"list"});return n.forEach(s=>{const i=s.pct!=null?s.pct:t?(Number(s.value)||0)/t:0,a=Math.max(0,Math.min(100,i*100));r.append(f("div",{class:"reportes__bar",role:"listitem"},[f("span",{class:"reportes__bar-label u-truncate",text:s.label}),f("span",{class:"reportes__bar-track","aria-hidden":"true"},[f("span",{class:"reportes__bar-fill",style:{width:a+"%",background:s.color||"var(--grad-gold)"}})]),f("span",{class:"reportes__bar-val u-mono",text:s.display!=null?s.display:String(s.value)})]))}),r}function JA(n){const s=n.map(N=>Number(N.value)||0),i=Math.max(...s,0),a=Math.max(1,i),c=n.length,u=N=>c<=1?600/2:6+N*(600-2*6)/(c-1),d=N=>134-N/a*(140-2*6),g=n.map((N,C)=>`${u(C).toFixed(1)},${d(s[C]).toFixed(1)}`).join(" "),I=`6,134 ${g} ${594 .toFixed(1)},134`,T=s.reduce((N,C)=>N+C,0),R=(n[s.indexOf(i)]||{}).label||"";return Jo("svg",{class:"reportes__spark",viewBox:"0 0 600 140",preserveAspectRatio:"none",role:"img","aria-label":`Tendencia: ${T} en total; pico de ${i}${R?" el "+R:""}.`},[Jo("polygon",{points:I,fill:"var(--gold-300)",opacity:"0.30"}),Jo("polyline",{points:g,fill:"none",stroke:"var(--gold-500)","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round","vector-effect":"non-scaling-stroke"})])}const Ke=n=>Math.round((n||0)*100)+"%",kt=n=>Pr(n)||"$0",Xo=n=>`${n.getDate()}/${n.getMonth()+1}`;function XA(n){const e={leads:[],deals:[],loading:!0,error:null,capped:!1,days:30};let t=!0;const r=f("div",{class:"reportes__chips",role:"group","aria-label":"Período"}),s=f("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]),i=f("button",{class:"btn btn--soft btn--sm",type:"button"},["⤓ CSV"]);s.addEventListener("click",_),i.addEventListener("click",y);const a=f("div",{class:"reportes__toolbar"},[r,f("div",{class:"u-row u-row--tight"},[s,i])]),c=f("div",{class:"reportes__body"}),u=f("section",{class:"reportes"},[a,c]);ue(n),n.append(u);function d(){ue(r),Ph.forEach(p=>{const w=e.days===p.value,E=f("button",{class:"chip",type:"button","aria-pressed":w?"true":"false"},[p.label]);E.addEventListener("click",()=>{e.days=p.value,I()}),r.append(E)})}function g(){const p=WA(e.days),w=Ch(e.leads,p),E=Ch(e.deals,p);return{pLeads:w,pDeals:E,pk:UA(w,E),ck:$A(e.leads,e.deals),fn:BA(w,e.deals),src:jA(w,E),stg:qA(e.deals),own:zA(w,E,q.get().mock?Dp():q.get().team||[]),tr:HA(e.leads,30)}}function I(){if(d(),e.loading)return F();if(e.error)return O("⚠️","No se pudieron cargar los reportes",e.error);if(!e.leads.length&&!e.deals.length)return O("📊","Aún no hay datos para reportar","Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.");const p=g();ue(c),e.capped&&c.append(f("div",{class:"reportes__notice u-caption"},["ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados."])),c.append(T("Del período",[R("Leads nuevos",String(p.pk.leadsNew)),R("Tasa de conversión",Ke(p.pk.convRate),`${p.pk.convertidos} de ${p.pk.leadsNew}`),R("Win rate",Ke(p.pk.winRate),`${p.pk.won} ganadas · ${p.pk.lost} perdidas`),R("Valor ganado",kt(p.pk.wonValue),null,!0)]),T("Estado actual",[R("Leads activos",String(p.ck.leadsActive)),R("Oportunidades abiertas",String(p.ck.dealsOpen)),R("Pipeline ponderado",kt(p.ck.pipelineWeighted),null,!0),R("SLA en riesgo",String(p.ck.slaRisk),p.ck.slaRisk?"requieren atención":"al día")]),N(p.fn),C(p.src),P(p.stg),B(p.tr),L(p.own))}function T(p,w){return f("div",{class:"reportes__section"},[f("h2",{class:"reportes__sec-title",text:p}),f("div",{class:"reportes__kpis"},w)])}function R(p,w,E,A){return f("div",{class:"reportes__kpi"+(A?" reportes__kpi--hi":"")},[f("span",{class:"reportes__kpi-label u-caption u-faint",text:p}),f("strong",{class:"reportes__kpi-val",text:w}),E?f("span",{class:"reportes__kpi-sub u-caption u-faint",text:E}):null])}function N(p){const w=p.map((E,A)=>({label:E.label,value:E.count,pct:E.pctTop,display:A===0?String(E.count):`${E.count} · ${Ke(E.convFromPrev)}`,color:"var(--grad-gold)"}));return $("Embudo de ventas","De lead a venta — dónde se pierde el avance",YA(w,{max:p[0]?p[0].count:1}))}function C(p){const w=["Canal","Leads","Conv.","Oport.","Ganados","Ingresos"],E=p.map(v=>[`${v.icon||""} ${v.label}`.trim(),String(v.leads),Ke(v.convRate),String(v.deals),String(v.won),kt(v.revenue)]),A=p.length?null:"Sin leads en el período.";return $("Rendimiento por canal","Atribución de fuente: de dónde vienen y cuánto rinden",H(w,E,A))}function P(p){const w=["Etapa","Prob.","Oport.","Valor","Ponderado"],E=p.map(J=>[J.label,Ke(J.prob),String(J.count),kt(J.value),kt(J.weighted)]),A=p.reduce((J,ve)=>({count:J.count+ve.count,value:J.value+ve.value,weighted:J.weighted+ve.weighted}),{count:0,value:0,weighted:0}),v=["Total","",String(A.count),kt(A.value),kt(A.weighted)];return $("Forecast por etapa","Pipeline abierto actual (no depende del período)",H(w,E,null,v))}function B(p){const w=p.reduce((J,ve)=>J+ve.count,0),E=p.map(J=>({label:Xo(J.date),value:J.count})),A=p.length?`${Xo(p[0].date)} – ${Xo(p[p.length-1].date)}`:"",v=f("div",{class:"reportes__chart"},[JA(E),f("div",{class:"reportes__axis u-caption u-faint"},[f("span",{text:A}),f("span",{text:`${w} leads`})])]);return $("Tendencia de captación","Nuevos leads · últimos 30 días",v)}function L(p){const w=["Asesor","Leads","Oport.","Ganados","Win rate","Pipeline pond."],E=p.map(v=>[v.ownerName,String(v.leads),String(v.deals),String(v.won),Ke(v.winRate),kt(v.pipelineWeighted)]),A=p.length?null:"Sin actividad asignada en el período.";return $("Rendimiento del equipo","Por asesor, en el período seleccionado",H(w,E,A))}function $(p,w,E){return f("div",{class:"reportes__section"},[f("div",{class:"reportes__sec-head"},[f("h2",{class:"reportes__sec-title",text:p}),w?f("span",{class:"reportes__sec-cap u-caption u-faint",text:w}):null]),E])}function H(p,w,E,A){if(!w.length&&E)return f("div",{class:"reportes__empty u-caption u-faint",text:E});const v=f("thead",{},[f("tr",{},p.map((je,V)=>f("th",{class:V===0?"":"is-num",scope:"col",text:je})))]),J=f("tbody",{},w.map(je=>f("tr",{},je.map((V,M)=>f("td",{class:M===0?"":"is-num",text:V}))))),ve=[v,J];return A&&ve.push(f("tfoot",{},[f("tr",{},A.map((je,V)=>V===0?f("th",{scope:"row",text:je}):f("td",{class:"is-num",text:je})))])),f("div",{class:"reportes__tablewrap"},[f("table",{class:"reportes__table"},ve)])}function O(p,w,E){ue(c),c.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:p}),f("div",{class:"state__title",text:w}),f("div",{class:"state__msg",text:E})]))}function F(){ue(c);const p=f("div",{class:"reportes__kpis"},[1,2,3,4].map(()=>f("div",{class:"reportes__kpi"},[f("span",{class:"skeleton",style:{width:"100%",height:"46px"}})])));c.append(f("div",{class:"reportes__section"},[p])),c.append(f("div",{class:"reportes__section"},[f("span",{class:"skeleton",style:{width:"100%",height:"160px"}})]))}function y(){if(e.loading||e.error){se("Aún no hay datos para exportar","info");return}const p=g(),w=(Ph.find(v=>v.value===e.days)||{}).label||"",E=[],A=v=>{E.push([]),E.push([v])};E.push(["Reporte Altorra CRM"]),E.push(["Período",w]),E.push(["Generado",new Date().toLocaleString("es-CO")]),A("KPIs del período"),E.push(["Métrica","Valor"]),E.push(["Leads nuevos",p.pk.leadsNew]),E.push(["Conversión",Ke(p.pk.convRate)]),E.push(["Win rate",Ke(p.pk.winRate)]),E.push(["Ganadas",p.pk.won]),E.push(["Perdidas",p.pk.lost]),E.push(["Valor ganado (COP)",p.pk.wonValue]),E.push(["Leads activos (ahora)",p.ck.leadsActive]),E.push(["Oportunidades abiertas (ahora)",p.ck.dealsOpen]),E.push(["Pipeline ponderado COP (ahora)",p.ck.pipelineWeighted]),E.push(["SLA en riesgo (ahora)",p.ck.slaRisk]),A("Embudo"),E.push(["Etapa","Cantidad","Conversión desde anterior"]),p.fn.forEach((v,J)=>E.push([v.label,v.count,J===0?"":Ke(v.convFromPrev)])),A("Rendimiento por canal"),E.push(["Canal","Leads","Conversión","Oportunidades","Ganados","Ingresos (COP)"]),p.src.forEach(v=>E.push([v.label,v.leads,Ke(v.convRate),v.deals,v.won,v.revenue])),A("Forecast por etapa (pipeline actual)"),E.push(["Etapa","Probabilidad","Oportunidades","Valor (COP)","Ponderado (COP)"]),p.stg.forEach(v=>E.push([v.label,Ke(v.prob),v.count,v.value,v.weighted])),A("Rendimiento del equipo"),E.push(["Asesor","Leads","Oportunidades","Ganados","Win rate","Pipeline ponderado (COP)"]),p.own.forEach(v=>E.push([v.ownerName,v.leads,v.deals,v.won,Ke(v.winRate),v.pipelineWeighted])),tb(`altorra-reportes-${es(new Date)}.csv`,eb(E)),se("Reporte exportado","ok")}async function _(){e.loading=!0,e.error=null,I();try{const p=await KA();if(!t)return;e.leads=p.leads,e.deals=p.deals,e.capped=!!p.capped,e.loading=!1}catch(p){if(!t)return;e.loading=!1,e.error=p&&p.code==="permission-denied"?"Sin permiso para ver los reportes.":"Revisa tu conexión e intenta de nuevo."}I()}return _(),function(){t=!1}}function ZA(n){const e=n==null?"":String(n);return/[",\n\r;]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function eb(n){return"\uFEFF"+n.map(e=>e.map(ZA).join(",")).join(`\r
`)}function tb(n,e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=n,document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}const Pi=n=>({id:n.id,...n.data()});async function nb({pageSize:n=500}={}){if(q.get().mock)return{contacts:gA(),leads:Ci()};const[e,t]=await Promise.all([Qr(Et(Ne(de,"contacts"),It("createdAt","desc"),Qt(n))).then(r=>r.docs.map(Pi)),Qr(Et(Ne(de,"leads"),It("createdAt","desc"),Qt(n))).then(r=>r.docs.map(Pi))]);return{contacts:e,leads:t}}async function rb(n){if(!n)return null;const e=await tp(ct(de,"contacts",n));return e.exists()?{id:e.id,...e.data()}:null}function sb(n,e,t){const r=Et(Ne(de,"activities"),Ii("relatedTo.id","==",n),It("createdAt","desc"),Qt(50));return hs(r,s=>e(s.docs.map(Pi)),s=>t&&t(s))}function ib(n,e,t){const r=Et(Ne(de,"contacts",n,"crmNotes"),It("createdAt","desc"),Qt(50));return hs(r,s=>e(s.docs.map(Pi)),s=>t&&t(s))}async function ob(n,e){const t=q.get().user;await wn(Ne(de,"contacts",n,"crmNotes"),{body:String(e||"").trim(),authorId:t?t.uid:null,authorName:q.get().profile&&q.get().profile.nombre||t&&t.email||"Asesor",createdAt:new Date().toISOString()})}const ab=[{id:"todos",label:"Todos"},{id:"lead",label:"Leads"},{id:"cliente",label:"Clientes"},{id:"suscriptor",label:"Suscriptores"}],cb={lead:{label:"Lead",badge:"gold"},cliente:{label:"Cliente",badge:"ok"},suscriptor:{label:"Suscriptor",badge:"info"}};function Nh(n){const e=String(n.lifecycleStage||n.type||"").toLowerCase();return e==="subscriber"||e==="suscriptor"?"suscriptor":e==="customer"||e==="cliente"?"cliente":"lead"}function lb(n){const e={contacts:[],leads:[],loading:!0,error:null,q:"",filter:"todos"};let t=!0;const r=f("input",{type:"search",placeholder:"Buscar por nombre, correo o teléfono…","aria-label":"Buscar contactos"});r.addEventListener("input",()=>{e.q=r.value,N()});const s=f("div",{class:"search"},[f("span",{"aria-hidden":"true",text:"🔎"}),r]),i={},a=f("div",{class:"contactos__chips",role:"group","aria-label":"Filtrar por tipo"});ab.forEach(L=>{const $=f("button",{class:"chip",type:"button","aria-pressed":L.id===e.filter?"true":"false"},[L.label]);$.addEventListener("click",()=>{e.filter=L.id,Object.entries(i).forEach(([H,O])=>O.setAttribute("aria-pressed",H===L.id?"true":"false")),N()}),i[L.id]=$,a.append($)});const c=f("span",{class:"contactos__count u-caption u-faint"}),u=f("button",{class:"btn btn--soft btn--sm",type:"button"},["↻ Actualizar"]);u.addEventListener("click",B);const d=f("div",{class:"contactos__toolbar"},[s,a,f("div",{class:"u-row u-row--tight"},[c,u])]),g=f("div",{class:"contactos__list"}),I=f("section",{class:"contactos"},[d,g]);ue(n),n.append(I);function T(){const L={};for(const $ of e.leads){if(!$.contactId)continue;const H=L[$.contactId];(!H||new Date($.createdAt)>new Date(H.createdAt))&&(L[$.contactId]=$)}return L}function R(L){q.set({leads:e.leads,detailLeadId:L.id})}function N(){if(e.loading)return P("⏳","Cargando contactos…","");if(e.error)return P("⚠️","No se pudieron cargar los contactos",e.error);if(!e.contacts.length)return P("👥","Aún no hay contactos","Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.");const L=T(),$=bi(e.q),H=e.contacts.filter(O=>e.filter!=="todos"&&Nh(O)!==e.filter?!1:$?bi(`${O.fullName||""} ${O.email||""} ${O.phone||""}`).includes($):!0);if(c.textContent=`${H.length} de ${e.contacts.length}`,ue(g),!H.length){g.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🔍"}),f("div",{class:"state__title",text:"Sin resultados"}),f("div",{class:"state__msg",text:"Prueba con otro término o filtro."})]));return}H.forEach(O=>g.append(C(O,L[O.id])))}function C(L,$){const H=Nh(L),O=cb[H],F=Xr(L),y=Number(L.score)>0&&Bn[L.rating],_=f("div",{class:"contact-row__badges"},[f("span",{class:`badge badge--${O.badge}`,text:O.label}),f("span",{class:"badge",text:`${F.icon} ${F.label}`}),y?f("span",{class:`temp ${Bn[L.rating].cls}`,text:`${Bn[L.rating].icon} ${L.score}`}):null]),p=[L.email,L.phone].filter(Boolean).join(" · ")||"Sin datos de contacto",w=Array.isArray(L.tags)&&L.tags.length?f("span",{class:"contact-row__tags u-caption u-faint u-truncate",text:"🏷️ "+L.tags.join(", ")}):null,E=[f("span",{class:"avatar avatar--sm","aria-hidden":"true",text:ds(L.fullName)}),f("div",{class:"contact-row__main"},[f("span",{class:"contact-row__name u-truncate",text:L.fullName||"Sin nombre"}),f("span",{class:"contact-row__sub u-caption u-faint u-truncate",title:p,text:p}),w]),_,f("span",{class:"contact-row__time u-caption u-faint",text:$n(L.lastActivityAt)})];if($){const A=f("button",{class:"contact-row",type:"button","aria-label":`Ver ficha de ${L.fullName||"contacto"}`},E);return A.addEventListener("click",()=>R($)),A}return f("div",{class:"contact-row contact-row--nolead"},E)}function P(L,$,H){c.textContent="",ue(g),g.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:L}),f("div",{class:"state__title",text:$}),H?f("div",{class:"state__msg",text:H}):null]))}async function B(){e.loading=!0,e.error=null,N();try{const L=await nb();if(!t)return;e.contacts=L.contacts,e.leads=L.leads,e.loading=!1}catch(L){if(!t)return;e.loading=!1,e.error=L&&L.code==="permission-denied"?"Sin permiso para ver los contactos.":"Revisa tu conexión e intenta de nuevo."}N()}return B(),function(){t=!1}}const ub={solicitud_inbound:"📥",whatsapp:"💬",status_change:"🔁",nota:"🗒️",email:"✉️",llamada:"📞"};function hb(n){let e=null,t=null,r=null,s="resumen",i={lead:null,contact:null,activities:[],notes:[]};const a=f("aside",{class:"detail",role:"dialog","aria-modal":"true","aria-label":"Ficha del cliente"}),c=f("div",{class:"detail-overlay",hidden:!0},[a]);n.append(c),c.addEventListener("mousedown",O=>{O.target===c&&u()}),window.addEventListener("keydown",O=>{O.key==="Escape"&&e&&u()}),q.subscribe(O=>{O.detailLeadId!==e&&g(O.detailLeadId)});function u(){q.set({detailLeadId:null})}function d(){t&&(t(),t=null),r&&(r(),r=null)}function g(O){if(d(),e=O,!O){c.hidden=!0,document.body.classList.remove("has-detail"),ue(a);return}s="resumen",c.hidden=!1,document.body.classList.add("has-detail"),I(O)}function I(O){const F=(q.get().leads||[]).find(y=>y.id===O);i={lead:F||null,contact:null,activities:[],notes:[]},T(),F&&(q.get().mock?(i.contact=mA(F.contactId),i.activities=pA(O),i.notes=bh(F.contactId),T()):(rb(F.contactId).then(y=>{i.contact=y,T()}).catch(()=>{}),t=sb(O,y=>{i.activities=y,T()},()=>{}),F.contactId&&(r=ib(F.contactId,y=>{i.notes=y,T()},()=>{}))))}function T(){ue(a);const O=i.lead;if(!O){a.append(R(null)),a.append(f("div",{class:"state"},[f("div",{class:"state__icon",text:"🔍"}),f("div",{class:"state__title",text:"Lead no disponible"}),f("div",{class:"state__msg",text:"Recarga la Bandeja e inténtalo otra vez."})]));return}a.append(R(O)),a.append(N());const F=f("div",{class:"detail__body"});s==="resumen"?F.append(C(O)):s==="comms"?F.append(B()):s==="score"?F.append(L(O)):s==="notas"&&F.append($(O)),a.append(F)}function R(O){const F=f("button",{class:"icon-btn",type:"button","aria-label":"Cerrar"},["✕"]);if(F.addEventListener("click",u),!O)return f("div",{class:"detail__header"},[f("div",{class:"u-grow"}),F]);const y=H(O),_=Bn[y.rating],p=Zs(O.status),w=oo(O),E=Xr(O),A=f("button",{class:"btn btn--wa btn--sm",type:"button"},["💬 WhatsApp"]);A.addEventListener("click",()=>{const je=vp(O.phone,`Hola ${String(O.fullName||"").split(" ")[0]||""}, te saluda Altorra Cars 👋`);if(!je)return se("Sin teléfono","error");window.open(je,"_blank","noopener")});const v=Or("crm.edit"),J=v&&O.status!=="convertido"?f("button",{class:"btn btn--soft btn--sm",type:"button"},["🎯 Convertir"]):null;J&&J.addEventListener("click",async()=>{J.disabled=!0;try{q.get().mock?Op($c(O)):await Np(O),se("🎯 Convertido a oportunidad","ok")}catch{se("No se pudo convertir","error"),J.disabled=!1}});const ve=v?f("button",{class:"icon-btn",type:"button","aria-label":"Agendar cita",title:"Agendar cita"},["📅"]):null;return ve&&ve.addEventListener("click",()=>db(O,ve)),f("div",{class:"detail__header"},[f("div",{class:"u-row u-grow",style:{minWidth:"0"}},[f("span",{class:"avatar","aria-hidden":"true",text:ds(O.fullName)}),f("div",{class:"u-grow",style:{minWidth:"0"}},[f("h2",{class:"detail__name u-truncate",text:O.fullName}),f("div",{class:"u-row u-row--tight",style:{flexWrap:"wrap"}},[f("span",{class:`temp ${_.cls}`,text:`${_.icon} ${_.label} · ${y.score}`}),f("span",{class:`badge badge--${p.badge||""}`.trim(),text:p.label}),f("span",{class:"badge",text:`${w.icon} ${w.label}`}),f("span",{class:"badge",text:`${E.icon} ${E.label}`})])])]),f("div",{class:"u-row u-row--tight"},[J,ve,A,F])])}function N(){const O=[["resumen","Resumen"],["comms","Comunicaciones"],["score","Score"],["notas","Notas"]],F=f("div",{class:"detail__tabs",role:"tablist"});return O.forEach(([y,_])=>{const p=f("button",{class:"detail__tab"+(s===y?" is-active":""),role:"tab","aria-selected":String(s===y),type:"button"},[_]);p.addEventListener("click",()=>{s=y,T()}),F.append(p)}),F}function C(O){const F=i.contact,y=F&&F.consent?F.consent:null,_=[["Correo",O.email||"—"],["Teléfono",O.phone||"—"],["Interés",O.sourceDetail||"—"],["Vehículo",O.vehicleOfInterestId||"—"],["Asesor",O.ownerName||"Sin asignar"],["Origen",O.source||"—"],["Capturado",IT(O.createdAt)],["Última actividad",$n(O.lastActivityAt)]],p=Ap(O,{score:H(O).score});return f("div",{class:"u-stack"},[f("div",{class:"detail-card detail-card--nba"},[f("span",{class:"detail-card__icon","aria-hidden":"true",text:p.icon}),f("div",{class:"u-grow"},[f("div",{class:"u-caption u-muted",text:"Próxima mejor acción"}),f("strong",{text:p.label}),f("div",{class:"u-caption u-faint",text:p.reason})])]),f("dl",{class:"kv"},_.flatMap(([w,E])=>[f("dt",{text:w}),f("dd",{class:"u-truncate",text:E})])),y?P(y):null])}function P(O){const F=y=>y?"✅":"⛔";return f("div",{class:"detail-card"},[f("div",{class:"u-caption u-muted",text:"Consentimiento (Ley 1581)"}),f("div",{class:"u-row",style:{flexWrap:"wrap",gap:"12px"}},[f("span",{class:"u-caption",text:`${F(O.email)} Email`}),f("span",{class:"u-caption",text:`${F(O.whatsapp)} WhatsApp`}),f("span",{class:"u-caption",text:`${F(O.calls)} Llamadas`})]),f("div",{class:"u-caption u-faint",text:`Política ${O.policyVersion||"v1"} · origen ${O.source||"—"}`})])}function B(){if(!i.activities.length)return f("div",{class:"state"},[f("div",{class:"state__icon",text:"📭"}),f("div",{class:"state__title",text:"Sin comunicaciones"}),f("div",{class:"state__msg",text:"Aún no hay actividades registradas para este lead."})]);const O=f("ol",{class:"timeline"});return i.activities.forEach(F=>{O.append(f("li",{class:"timeline__item timeline__item--"+(F.direction||"inbound")},[f("span",{class:"timeline__icon","aria-hidden":"true",text:ub[F.type]||"•"}),f("div",{class:"u-grow"},[f("div",{class:"u-spread"},[f("strong",{class:"u-truncate",text:F.subject||F.type||"Actividad"}),f("span",{class:"u-caption u-faint",text:$n(F.createdAt)})]),F.body?f("div",{class:"u-caption u-muted",text:F.body}):null])]))}),O}function L(O){const F=H(O),y=Bn[F.rating],_=Object.keys(Ah).map(p=>{const w=Math.round((F.factors[p]||0)*100);return f("div",{class:"factor"},[f("div",{class:"u-spread u-caption"},[f("span",{text:Ah[p]}),f("span",{class:"u-faint",text:`${w}% · peso ${Math.round(BT[p]*100)}%`})]),f("div",{class:"factor__track"},[f("div",{class:"factor__fill",style:{width:w+"%"}})])])});return f("div",{class:"u-stack"},[f("div",{class:"scorehero"},[f("div",{class:`scorehero__num ${y.cls}`,text:String(F.score)}),f("div",{class:"u-stack",style:{gap:"2px"}},[f("strong",{text:`${y.icon} ${y.label}`}),f("span",{class:"u-caption u-faint",text:"Heurística determinista (7 factores, sin IA)"})])]),f("div",{class:"u-stack",style:{gap:"10px"}},_)])}function $(O){const F=Or("crm.edit")||Or("crm.create"),y=f("textarea",{class:"textarea",placeholder:"Escribe una nota interna…",rows:"3"}),_=f("button",{class:"btn btn--gold btn--sm",type:"button"},["Agregar nota"]);_.addEventListener("click",async()=>{const w=y.value.trim();if(!w)return;_.disabled=!0;const E={body:w,authorName:"Tú",createdAt:new Date().toISOString()};try{q.get().mock?(_A(O.contactId,E),i.notes=bh(O.contactId),T()):(await ob(O.contactId,w),y.value=""),se("Nota agregada","ok")}catch{se("No se pudo guardar la nota","error")}finally{_.disabled=!1}});const p=f("div",{class:"u-stack"});return i.notes.length||p.append(f("div",{class:"u-caption u-faint",style:{padding:"8px 0"},text:"Aún no hay notas."})),i.notes.forEach(w=>p.append(f("div",{class:"detail-card"},[f("div",{class:"u-caption u-muted",text:w.body}),f("div",{class:"u-caption u-faint",text:`${w.authorName||"Asesor"} · ${$n(w.createdAt)}`})]))),f("div",{class:"u-stack"},[F?f("div",{class:"u-stack",style:{gap:"8px"}},[y,f("div",{class:"u-row",style:{justifyContent:"flex-end"}},[_])]):null,p])}function H(O){return Tp(O,i.activities||[],i.contact)}}function db(n,e){const t=R=>String(R).padStart(2,"0"),r=new Date;r.setDate(r.getDate()+1),r.setHours(10,0,0,0);const s=`${r.getFullYear()}-${t(r.getMonth()+1)}-${t(r.getDate())}T${t(r.getHours())}:${t(r.getMinutes())}`,i=f("input",{class:"input",type:"text",value:"Cita con "+(n.fullName||""),"aria-label":"Asunto"}),a=f("input",{class:"input",type:"datetime-local",value:s,"aria-label":"Fecha y hora"}),c=f("button",{class:"btn btn--gold btn--sm btn--block",type:"button"},["Agendar"]),u=f("div",{class:"popover",role:"dialog","aria-label":"Agendar cita",style:{width:"260px",gap:"8px"}},[f("div",{class:"popover__title",text:"Agendar cita"}),i,a,c]);document.body.append(u);const d=e.getBoundingClientRect();u.style.top=`${Math.min(window.innerHeight-u.offsetHeight-8,d.bottom+6)}px`,u.style.left=`${Math.max(8,d.right-u.offsetWidth)}px`,setTimeout(()=>a.focus(),0);const g=()=>{u.remove(),document.removeEventListener("mousedown",I,!0),window.removeEventListener("keydown",T,!0)},I=R=>{u.contains(R.target)||g()},T=R=>{R.key==="Escape"&&g()};setTimeout(()=>{document.addEventListener("mousedown",I,!0),window.addEventListener("keydown",T,!0)},0),c.addEventListener("click",async()=>{const R=a.value?new Date(a.value).toISOString():null;if(!R){se("Elige fecha y hora","error");return}c.disabled=!0;try{q.get().mock?EA({type:"cita",subject:i.value,dueAt:R,relatedTo:{type:"lead",id:n.id,name:n.fullName},status:"open"}):await xA(n,R,i.value),se("📅 Cita agendada","ok"),g()}catch{se("No se pudo agendar","error"),c.disabled=!1}})}const Fp=document.getElementById("app");mm();const fb=new URLSearchParams(location.search).get("mock")==="1",pb={bandeja:Lp,pipeline:SA,agenda:MA,reportes:XA,contactos:lb};let js=null,jn=null,ln=null,Na=null,ti=null;function Dh(n){if(!jn||n===Na)return;ln&&(ln(),ln=null),q.get().detailLeadId&&q.set({detailLeadId:null}),ln=(pb[n]||Lp)(jn.outlet)||null,jn.setActive(n),Na=n}function mb(){jn=bT(Fp),hb(jn.detailRoot),Dh(gp()),ti=vT(Dh)}function gb(){ln&&(ln(),ln=null),ti&&(ti(),ti=null),jn=null,Na=null}function _b(n){n.ready&&(n.user&&js!=="app"?(js="app",mb()):!n.user&&js!=="login"&&(gb(),js="login",n.detailLeadId&&q.set({detailLeadId:null}),RT(Fp)))}q.subscribe(_b);fb?q.set({mock:!0,ready:!0,user:{uid:"u_ceo",email:"demo@altorra.local"},profile:{nombre:"Rodrigo (CEO)",cargo:"CEO",rol:"super_admin"},permissions:["*"]}):dT();
